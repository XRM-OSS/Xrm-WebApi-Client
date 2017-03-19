(function(undefined) {
    "use strict";

    // Get WebApiClient core
    var WebApiClient = require("./WebApiClient.Core.js");

    // Attach bluebird to WebApiClient
    WebApiClient.Promise = require("bluebird");

    // Attach requests to core
    WebApiClient.Requests = require("./WebApiClient.Requests.js");

    // Export complete WebApiClient
    module.exports = WebApiClient;
} ());
