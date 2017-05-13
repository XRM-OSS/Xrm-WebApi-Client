(function(undefined) {
    "use strict";

    var BatchResponse = function (parameters) {
        var params = parameters || {};

        this.name = params.name;
        this.changeSetResponses = params.changeSetResponses || [];
        this.batchResponses = params.batchResponses || [];
        this.isFaulted = params.isFaulted || false;
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

            for (var j = 0; j < batchResponsesRaw.length; j++) {
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
