(function(undefined) {
    "use strict";

    // Get WebApiClient core
    var WebApiClient = require("./WebApiClient.Core.js");

    // Attach bluebird to WebApiClient
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
