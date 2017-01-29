(function (WebApiClient, undefined) {
    "use strict";
    
    function AppendRequestParams(url, params) {
        url += "(";
        var paramCount = 1;
        
        for (var parameter in params) {
            if (!params.hasOwnProperty(parameter)) {
                continue;
            }
            
            if (paramCount !== 1) {
                url += ",";
            }
            
            url += parameter + "=@p" + paramCount++;
        }
            
        url += ")";
        
        return url;
    }
    
    function AppendParamValues (url, params) {
        var paramCount = 1;
        
        for (var parameter in params) {
            if (!params.hasOwnProperty(parameter)) {
                continue;
            }
            
            if (paramCount === 1) {
                url += "?@p1=";
            }
            else {
                url += "&@p" + paramCount + "=";
            }
            paramCount++;
            
            url += params[parameter];
        }
        
        return url;
    }
    
    WebApiClient.Requests = WebApiClient.Requests || {};
    
    WebApiClient.Requests.Request = function () {
        this.method = "";
        this.name = "";
        this.bound = false;
        this.entityName = "";
        this.entityId = "";
        this.payload = null;
        this.headers = null;
        this.urlParams = null;
    };
    
    WebApiClient.Requests.Request.prototype.with = function (parameters) {
        var request = Object.create(this);
        
        for (var parameter in parameters) {
            if (!parameters.hasOwnProperty(parameter)) {
                continue;
            }
            
            request[parameter] = parameters[parameter];
        }
        
        return request;
    };
    
    WebApiClient.Requests.Request.prototype.buildUrl = function() {
        var baseUrl = WebApiClient.GetApiUrl();
        var url = "";
        
        if (this.bound) {
            var entityId = this.entityId.replace("{", "").replace("}", "");
            url = baseUrl + WebApiClient.GetSetName(this.entityName) + "(" + entityId + ")/" + this.name; 
        } else {
            url = baseUrl + this.name;
        }
        
        if (this.urlParams) {
            url = AppendRequestParams(url, this.urlParams);
            url = AppendParamValues(url, this.urlParams);
        } else {
            url += "()";
        }
        
        return url;
    };
    
    WebApiClient.Requests.AddToQueueRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "Microsoft.Dynamics.CRM.AddToQueue"
        },
        bound: {
            value: true
        },
        entityName: {
            value: "queue"
        }
    });
    
    WebApiClient.Requests.PublishXmlRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "PublishXml"
        }
    });
    
    WebApiClient.Requests.RetrieveLocLabelsRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RetrieveLocLabels"
        }
    });
    
    WebApiClient.Requests.SetLocLabelsRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "SetLocLabels"
        }
    });
    
    WebApiClient.Requests.WhoAmIRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "WhoAmI"
        }
    });
    
} (window.WebApiClient = window.WebApiClient || {}));