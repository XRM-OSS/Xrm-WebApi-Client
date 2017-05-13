(function(undefined) {
    "use strict";

    var Batch = function (parameters) {
        var params = parameters || {};

        this.name = params.name || "batch_AAA123";
        this.changeSets = params.changeSets || [];
        this.requests = params.requests || [];
        this.headers = params.headers || [];
        this.async = params.async;
        this.isOverLengthGet = params.isOverLengthGet;
    };

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
