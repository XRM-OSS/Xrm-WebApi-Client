(function(undefined) {
    "use strict";

    function ParseContentId (rawData) {
        return "";
    }

    function ParsePayload (rawData) {
        var payloadRaw = (/^{[\s\S]*?(?=^}$)^}$/m).exec(rawData);

        if (payloadRaw && payloadRaw.length > 0) {
            return JSON.parse(payloadRaw[0]);
        }

        return null;
    }

    function ParseStatusText (rawData) {
        return "";
    }

    function ParseHeaders (rawData) {
        return "";
    }

    var Response = function (parameters) {
        var params = parameters || {};

        if (!params.rawData) {
            this.contentId = params.contentId;
            this.payload = params.payload;
            this.statusText = params.statusText;
            this.headers = params.headers;
        } else {
            var rawData = params.rawData;

            this.contentId = ParseContentId(rawData);
            this.payload = ParsePayload(rawData);
            this.statusStext = ParseStatusText(rawData);
            this.headers = ParseHeaders(rawData);
        }
    };

    module.exports = Response;
} ());
