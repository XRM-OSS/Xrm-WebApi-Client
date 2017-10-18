(function(undefined) {
    "use strict";

    /**
     * Batch to send using WebApiClient.SendBatch.
     * Batches can be used for sending multiple requests at once.
     * All requests inside a change set will be executed as a transaction, i.e. fail or succeed together.
     * @constructor
     * @see https://msdn.microsoft.com/en-us/library/mt607719.aspx#bkmk_BatchRequests
     * @param {Object} parameters
     * @param {String} [parameters.name] Name to set for this batch. Will be set to a default name if ommitted
     * @param {Array<ChangeSet>} [parameters.changeSets] Change Sets to include in this batch. Defaults to an empty array
     * @param {Array<Request>} [parameters.requests] GET requests to include in this batch. GET requests must be contained in here and are forbidden in change sets. Defaults to an empty array 
     * @param {Array<{key:string,value:string}>} [parameters.headers] Headers to append to the batch.
     * @param {bool} [parameters.async] True for sending async, false for sending sync. WebApiClient default is async
     * @param {bool} [parameters.isOverLengthGet] Used internally for flagging a GET request that was originally not a batch but had to be transformed to a batch request automatically since the url was too long
     * @memberof module:WebApiClient
     */
    var Batch = function (parameters) {
        var params = parameters || {};

        /**
         * @property {String} name - Name of the batch
         * @this {Batch}
         */
        this.name = params.name || "batch_AAA123";

        /**
         * @property {Array<ChangeSet>} changeSets - Change sets included in this batch. Only non GET requests may be included here. Each change set will execute as a separate transaction
         * @this {Batch}
         */
        this.changeSets = params.changeSets || [];

        /**
         * @property {Array<Request>} requests - GET Requests included in this batch. GET request may only be included in here
         * @this {Batch}
         */
        this.requests = params.requests || [];

        /**
         * @property {Array<{key:string,value:string}>} headers - Headers for the batch
         * @this {Batch}
         */
        this.headers = params.headers || [];

        /**
         * @property {bool} async - False for executing the batch synchronously, defaults to async
         * @this {Batch}
         */
        this.async = params.async;

        /**
         * @property {bool} isOverLengthGet - Used internally for flagging a GET request that was originally not a batch but had to be transformed to a batch request automatically since the url was too long
         * @this {Batch}
         */
        this.isOverLengthGet = params.isOverLengthGet;
    };

    /**
     * @description Creates a text representation of the whole batch for sending as message body
     * @return {String}
     * @this {Batch}
     */
    Batch.prototype.buildPayload = function() {
        var payload = "";

        for (var i = 0; i < this.changeSets.length; i++) {
            payload += "--" + this.name + "\n";
            payload += "Content-Type: multipart/mixed;boundary=" + this.changeSets[i].name + "\n\n";
            var changeSet = this.changeSets[i];

            payload += changeSet.stringify();
        }

        for (var j = 0; j < this.requests.length; j++) {
            payload += "--" + this.name + "\n";

            payload += "Content-Type: application/http\n";
            payload += "Content-Transfer-Encoding:binary\n\n";

            var request = this.requests[j];

            payload += request.stringify();

            // When all requests are stringified, we need a closing batch tag
            if (j === this.requests.length - 1) {
                payload += "--" + this.name + "--\n";
            }
        }

        return payload;
    };

    module.exports = Batch;
} ());
