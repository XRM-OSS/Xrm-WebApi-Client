(function(undefined) {
    "use strict";

    var instanceCount = 1;

    var ChangeSet = function (parameters) {
        var params = parameters || {};

        this.name = params.name || "changeset_" + instanceCount++;
        this.requests = params.requests || [];
    };

    ChangeSet.prototype.stringify = function () {
        var payload = "";
        var contentId = 1;

        for (var i = 0; i < this.requests.length; i++) {
            payload += "--" + this.name + "\n";

            payload += "Content-Type: application/http\n";
            payload += "Content-Transfer-Encoding:binary\n";

            var request = this.requests[i];
            request.contentId = request.contentId || contentId++;

            payload += request.stringify() + "\n";

            // When all requests are stringified, we need a closing changeSet tag
            if (i === this.requests.length - 1) {
                payload += "--" + this.name + "--\n\n";
            }
        }

        return payload;
    };

    module.exports = ChangeSet;
} ());
