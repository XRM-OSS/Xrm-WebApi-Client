(function(undefined) {
    "use strict";

    // Get WebApiClient core
    var WebApiClient = require("./WebApiClient.Core.js");

    /**
     * This is the bundled version of bluebird for usage as polyfill in browsers that don't support promises natively
     * @class
     * @see https://github.com/petkaantonov/bluebird
     * @memberof module:WebApiClient
     * @alias WebApiClient.Promise
     */
    WebApiClient.Promise = require("bluebird").noConflict();

    // Attach requests to core
    WebApiClient.Requests = require("./WebApiClient.Requests.js");

    // Attach batch to core
    WebApiClient.Batch = require("./WebApiClient.Batch.js");

    // Attach changeSet to core
    WebApiClient.ChangeSet = require("./WebApiClient.ChangeSet.js");

    // Attach batchRequest to core
    WebApiClient.BatchRequest = require("./WebApiClient.BatchRequest.js");

    // Attach batchResponse to core
    WebApiClient.BatchResponse = require("./WebApiClient.BatchResponse.js");

    // Attach response to core
    WebApiClient.Response = require("./WebApiClient.Response.js");

    // Export complete WebApiClient
    module.exports = WebApiClient;
} ());
