(function(undefined) {
    "use strict";

    // Get WebApiClient core
    var WebApiClient = require("./WebApiClient.Core.js");

    // Attach requests to core
    WebApiClient.Requests = require("./WebApiClient.Requests.js");

    // Export complete WebApiClient
    module.exports = WebApiClient;
} ());
