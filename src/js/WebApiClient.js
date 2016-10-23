/* @preserve
 * MIT License
 *
 * Copyright (c) 2016 Florian Krönert
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
*/
(function (WebApiClient, undefined) {
    "use strict";
       
    var ApiVersion = "8.0";
    
    // Override promise locally. This is for ensuring that we use bluebird internally, so that calls to WebApiClient have no differing set of 
    // functions that can be applied to the Promise. For example Promise.finally would not be available without Bluebird.
    var Promise = require("bluebird");
    
    function GetCrmContext() {
        if (typeof (GetGlobalContext) !== "undefined") {
            return GetGlobalContext();
        }
        
        if (typeof (Xrm) !== "undefined"){
            return Xrm.Page.context;
        }
        
        throw new Error("Failed to retrieve context");
    }
    
    function GetClientUrl () {
        var context = GetCrmContext();
        
        return context.getClientUrl();
    }
    
    function RemoveIdBrackets (id) {
        if (!id) {
            return id;
        }
        
        return id.replace("{", "").replace("}", "");
    }
    
    WebApiClient.GetApiVersion = function() {
        return ApiVersion;
    };
    
    WebApiClient.SetApiVersion = function(version) {
        ApiVersion = version;
    };
    
    WebApiClient.GetSetName = function (entityName) {
        var ending = entityName.slice(-1);
        
        switch(ending)
        {
            case 's':
                return entityName + "es";
            case 'y':
                return entityName.substring(0, entityName.length - 1) + "ies";
            default:
                return entityName + "s";
        }
    };
    
    var DefaultHeaders = [
        { key: "Accept", value: "application/json" },
        { key: "OData-Version", value: "4.0" },
        { key: "OData-MaxVersion", value: "4.0" },
        // Prevent caching since it sometimes sends old data as unmodified
        { key: "If-None-Match", value: null },
        { key: "Content-Type", value: "application/json; charset=utf-8" }
    ];
    
    WebApiClient.GetDefaultHeaders = function() {
        return DefaultHeaders;
    };
    
    function VerifyHeader(header) {
        if (!header.key || typeof(header.value) === "undefined") {
            throw new Error("Each request header needs a key and a value!");
        }
    }
    
    WebApiClient.AppendToDefaultHeaders = function () {
        if (!arguments) {
            return;
        }
        
        for(var i = 0; i < arguments.length; i++) {
            var argument = arguments[i];
            
            DefaultHeaders.push(arguments[i]);
        }
    };
    
    function AppendHeaders(xhr, headers) {
        if (headers) {
            for (var i = 0; i < headers.length; i++) {
                var header = headers[i];
                
                VerifyHeader(header);
                
                xhr.setRequestHeader(header.key, header.value);
            }
        }
    }
    
    function GetRecordUrl (entityName, entityId) {
        return WebApiClient.GetApiUrl() + WebApiClient.GetSetName(entityName) + "(" + RemoveIdBrackets(entityId) + ")";
    }
    
    // Private function
    WebApiClient.SendRequest = function (method, url, payload, requestHeaders) {
        var xhr = new XMLHttpRequest();
      
        var promise = new Promise(function(resolve, reject) {
            xhr.onload = function() {
                if(xhr.readyState !== 4) { 
                    return;
                }

                if(xhr.status === 200){
                    resolve(JSON.parse(xhr.responseText));
                }
                else if (xhr.status === 204) {
                    if (method.toLowerCase() === "post") {
                        resolve(xhr.getResponseHeader("OData-EntityId"));
                    }
                    // No content returned for delete, update, ...
                    else {
                        resolve(xhr.statusText);
                    }
                }
                else { 
                    reject(new Error(xhr.statusText));
                }
            };
            xhr.onerror = function() {
                reject(new Error(xhr.statusText));
            };
        });

        xhr.open(method, url, true);
        
        AppendHeaders(xhr, DefaultHeaders);
        AppendHeaders(xhr, requestHeaders);
        
        xhr.send(JSON.stringify(payload));
        
        return promise;
    };
    
    WebApiClient.GetApiUrl = function() {
        return GetClientUrl() + "/api/data/v" + ApiVersion + "/";
    };
    
    WebApiClient.Create = function(parameters) {
        var params = parameters || {};
        
        if (!params.entityName || !params.entity) {
            throw new Error("Entity name and entity object have to be passed!");
        }
        
        var url = WebApiClient.GetApiUrl() + WebApiClient.GetSetName(params.entityName);
        
        return WebApiClient.SendRequest("POST", url, params.entity, params.headers);
    };
    
    WebApiClient.Retrieve = function(parameters) {
        var params = parameters || {};
        
        if (!params.entityName) {
            throw new Error("Entity name has to be passed!");
        }
        
        var url = WebApiClient.GetApiUrl() + WebApiClient.GetSetName(params.entityName);

        if (params.entityId) {
            url += "(" + RemoveIdBrackets(params.entityId) + ")";
        }
        
        if (params.queryParams) {
            url += params.queryParams;
        }
        
        return WebApiClient.SendRequest("GET", url, null, params.headers);
    };
    
    WebApiClient.Update = function(parameters) {
        var params = parameters || {};
        
        if (!params.entityName || !params.entity || !params.entityId) {
            throw new Error("Entity name, ID and entity update object have to be passed!");
        }
        
        var url = GetRecordUrl(params.entityName, params.entityId);
        
        return WebApiClient.SendRequest("PATCH", url, params.entity, params.headers);
    };
    
    WebApiClient.Delete = function(parameters) {   
        var params = parameters || {};
        
        if (!params.entityName || !params.entityId) {
            throw new Error("Entity name and entity id have to be passed!");
        }
        
        var url = GetRecordUrl(params.entityName, params.entityId);
        
        return WebApiClient.SendRequest("DELETE", url, null, params.headers);
    };
    
    WebApiClient.Associate = function(parameters) {
        var params = parameters || {};
        
        if (!params.relationShip) {
            throw new Error("Relationship has to be passed!");
        }
        
        if (!params.source || !params.target) {
            throw new Error("Source and target have to be passed!");
        }
        
        if (!params.source.entityName || !params.target.entityName || !params.source.entityId || !params.target.entityId) {
            throw new Error("Source and target both need to have entityName and entityId set!");
        }
        
        var targetUrl = GetRecordUrl(params.target.entityName, params.target.entityId);
        var relationShip = "/" + params.relationShip + "/$ref";
        
        var url = targetUrl + relationShip;
        
        var payload = { "@odata.id": GetRecordUrl(params.source.entityName, params.source.entityId) };

        return WebApiClient.SendRequest("POST", url, payload, params.headers);
    };
    
    WebApiClient.Disassociate = function(parameters) {
        var params = parameters || {};
        
        if (!params.relationShip) {
            throw new Error("Relationship has to be passed!");
        }
        
        if (!params.source || !params.target) {
            throw new Error("Source and target have to be passed!");
        }
        
        if (!params.source.entityName || !params.target.entityName || !params.source.entityId || !params.target.entityId) {
            throw new Error("Source and target both need to have entityName and entityId set!");
        }
        
        var targetUrl = GetRecordUrl(params.target.entityName, params.target.entityId);
        var relationShip = "/" + params.relationShip + "(" + RemoveIdBrackets(params.source.entityId) + ")/$ref";
        
        var url = targetUrl + relationShip;

        return WebApiClient.SendRequest("DELETE", url, null, params.headers);
    };
} (window.WebApiClient = window.WebApiClient || {}));