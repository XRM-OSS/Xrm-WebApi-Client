(function(undefined) {
    "use strict";

    function ParseContentId (rawData) {
        var contentIdRaw = (/^Content-ID: ([0-9]+)$/m).exec(rawData);

        if (contentIdRaw && contentIdRaw.length > 1) {
            return contentIdRaw[1];
        }

        return null;
    }

    function ParsePayload (rawData) {
        var payloadRaw = (/^{[\s\S]*?(?=^}$)^}$/m).exec(rawData);

        if (payloadRaw && payloadRaw.length > 0) {
            return JSON.parse(payloadRaw[0]);
        }

        return null;
    }

    function ParseStatus (rawData) {
        var statusRaw = (/^HTTP\/1\.1 ([0-9]{3,3}).*$/m).exec(rawData);

        if (statusRaw && statusRaw.length > 1) {
            return statusRaw[1];
        }

        return null;
    }

    function ParseHeaders (rawData) {
        var headersRaw = (/HTTP\/1.1.*[\r\n]+([\S\s]*)?(?={|$)/g).exec(rawData);

        if (headersRaw && headersRaw.length > 1) {
            var headers = {};

            var headersSplit = headersRaw[1].split(/[\r\n]/);

            for (var i = 0; i < headersSplit.length; i++) {
                var line = headersSplit[i];

                var delimiterIndex = line.indexOf(": ");

                var key = line.substring(0, delimiterIndex);

                if (!key) {
                    continue;
                }

                // Start after delimiterIndex (which is two chars long)
                var value = line.substring(delimiterIndex + 2);

                headers[key] = value;
            }

            return headers;
        }

        return null;
    }

    var Response = function (parameters) {
        var params = parameters || {};

        if (!params.rawData) {
            this.contentId = params.contentId;
            this.payload = params.payload;
            this.status = params.status;
            this.headers = params.headers;
        } else {
            var rawData = params.rawData;

            this.contentId = ParseContentId(rawData);
            this.payload = ParsePayload(rawData);
            this.status = ParseStatus(rawData);
            this.headers = ParseHeaders(rawData);
        }
    };

    module.exports = Response;
} ());
