(function(undefined) {
    "use strict";
    
    var WebApiClient = require("./WebApiClient.Core.js");

    /**
     * Response returned from WebApiClient.SendBatch method. You will usually not instantiate this yourself.
     * @constructor
     * @see https://msdn.microsoft.com/en-us/library/mt607719.aspx#bkmk_Example
     * @param {Object} [parameters]
     * @param {String} [parameters.name] The name of the batch response
     * @param {Array<{name:string, responses:Array<Response>}>} [parameters.changeSetResponses] Array of responses for change sets, each change set has a separate response
     * @param {Array<Response>} [parameters.batchResponses] Array of responses for GET batch requests
     * @param {bool} [parameters.isFaulted] Indicates whether any of the requests failed
     * @param {Array<string>} [parameters.errors] List of error messages if requests failed
     * @param {XMLHttpRequest} [parameters.xhr] XMLHttpRequest to use for parsing the results and filling the other properties
     * @memberof module:WebApiClient
     */
    var BatchResponse = function (parameters) {
        var params = parameters || {};

        /**
         * @property {String} name - Name of the batch response
         * @this {BatchResponse}
         */
        this.name = params.name;

        /**
         * @property {Array<{name:string, responses:Array<Response>}>} changeSetResponses - Array of responses for change sets, each change set has a separate response
         * @this {BatchResponse}
         */
        this.changeSetResponses = params.changeSetResponses || [];

        /**
         * @property {Array<Response>} batchResponses - Array of responses for GET batch requests
         * @this {BatchResponse}
         */
        this.batchResponses = params.batchResponses || [];

        /**
         * @property {bool} isFaulted - Indicates whether any of the requests failed
         * @this {BatchResponse}
         */
        this.isFaulted = params.isFaulted || false;

        /**
         * @property {Array<string>} errors - List of error messages if requests failed
         * @this {BatchResponse}
         */
        this.errors = params.errors || [];

        if (params.xhr) {
            var xhr = params.xhr;
            var responseText = xhr.responseText;

            var responseContentType = xhr.getResponseHeader("Content-Type");
            this.name = responseContentType.substring(responseContentType.indexOf("boundary=")).replace("boundary=", "");

            var changeSetBoundaries = responseText.match(/boundary=changesetresponse.*/g);

            for (var i = 0; changeSetBoundaries && i < changeSetBoundaries.length; i++) {
                var changeSetName = changeSetBoundaries[i].replace("boundary=", "");

                // Find all change set responses in responseText
                var changeSetRegex = new RegExp("--" + changeSetName + "[\\S\\s]*?(?=--" + changeSetName + ")", "gm");

                var changeSetResponse = {
                    name: changeSetName,
                    responses: []
                };

                var changeSets = responseText.match(changeSetRegex);

                for (var k = 0; k < changeSets.length; k++) {
                    var response = new WebApiClient.Response({
                        rawData: changeSets[k]
                    });

                    if (response.payload && response.payload.error) {
                        this.isFaulted = true;
                        this.errors.push(response.payload.error);
                    }

                    changeSetResponse.responses.push(response);
                }

                this.changeSetResponses.push(changeSetResponse);
            }

            // Find all batch responses in responseText
            var batchRegex = new RegExp("--" + this.name + "[\\r\\n]+Content-Type: application\\/http[\\S\\s]*?(?=--" + this.name + ")", "gm");
            var batchResponsesRaw = responseText.match(batchRegex);

            for (var j = 0; batchResponsesRaw && j < batchResponsesRaw.length; j++) {
                var batchResponse = new WebApiClient.Response({
                    rawData: batchResponsesRaw[j]
                });

                if (batchResponse.payload && batchResponse.payload.error) {
                    this.isFaulted = true;
                    this.errors.push(batchResponse.payload.error);
                }

                this.batchResponses.push(batchResponse);
            }
        }
    };

    module.exports = BatchResponse;
} ());
