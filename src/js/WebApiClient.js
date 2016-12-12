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
	    /// <summary>Returns the API version that is currently set.</summary>
	    /// <returns>String containing API version, such as "8.0".</returns>
        return ApiVersion;
    };
    
    WebApiClient.SetApiVersion = function(version) {
	    /// <summary>Sets the API version that will be used when sending requests.</summary>
	    /// <param name="version" type="String">The version that should be used when sending requests, such as "8.0"</param>
	    /// <returns>Void.</returns>
        ApiVersion = version;
    };
    
    WebApiClient.GetSetName = function (entityName, overriddenSetName) {
    	/// <summary>Gets the set name for the given entity name that is used for requests.</summary>
	    /// <param name="entityName" type="String">The name of the entity for which the set name is desired, such as "account".</param>
	    /// <param name="overriddenSetName" type="String">Override set name for entities that don't follow the rules, such as "contactleadscollection".</param>
	    /// <returns>Returns the overridden set name if passed, or the appropriate set name otherwise, such as "accounts".</returns>
        if (overriddenSetName) {
            return overriddenSetName;
        }
        
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
    	/// <summary>Gets the default headers which are currently used.</summary>
	    /// <returns>Returns the array of default headers that are currently used.</returns>
        return DefaultHeaders;
    };
    
    function VerifyHeader(header) {
        if (!header.key || typeof(header.value) === "undefined") {
            throw new Error("Each request header needs a key and a value!");
        }
    }
    
    WebApiClient.AppendToDefaultHeaders = function () {
    	/// <summary>Appends the given headers to the default headers, where headers are passed as dynamic parameters.</summary>
	    /// <param name="params" type="Key-Value Object">Pass an object with key property set to your key and value property set to your value.</param>
	    /// <returns>Void.</returns>
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
    
    function GetRecordUrl (parameters) {
        var params = parameters || {};
        
        if ((!params.entityName && !params.overriddenSetName) || !params.entityId) {
            throw new Error("Need entity name or overridden set name and entity id for getting record url!");
        }
        
        return WebApiClient.GetApiUrl() + WebApiClient.GetSetName(params.entityName, params.overriddenSetName) + "(" + RemoveIdBrackets(params.entityId) + ")";
    }

    WebApiClient.SendRequest = function (method, url, payload, requestHeaders) {
    	/// <summary>Sends request using given method, url, payload and additional per-request headers.</summary>
	    /// <param name="method" type="String">Method type of request to send, such as "GET".</param>
	    /// <param name="url" type="String">URL target for request.</param>
	    /// <param name="payload" type="Object">Payload for request.</param>
	    /// <param name="requestHeaders" type="Array">Array of headers that consist of objects with key and value property.</param>
	    /// <returns>Promise for sent request.</returns>
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
    	/// <summary>Gets the current base API url that is used.</summary>
	    /// <returns>Base  URL that is currently used.</returns>
        return GetClientUrl() + "/api/data/v" + ApiVersion + "/";
    };
    
    WebApiClient.Create = function(parameters) {
    	/// <summary>Creates a given record in CRM.</summary>
	    /// <param name="parameters" type="Object">Object that contains 'entityName' or 'overriddenSetName', 'entity' (record) and optional 'headers'.</param>
	    /// <returns>Promise for sent request.</returns>
        var params = parameters || {};
        
        if ((!params.entityName && !params.overriddenSetName) || !params.entity) {
            throw new Error("Entity name and entity object have to be passed!");
        }
        
        var url = WebApiClient.GetApiUrl() + WebApiClient.GetSetName(params.entityName, params.overriddenSetName);
        
        return WebApiClient.SendRequest("POST", url, params.entity, params.headers);
    };
    
    WebApiClient.Retrieve = function(parameters) {
    	/// <summary>Retrieves records from CRM.</summary>
	    /// <param name="parameters" type="Object">Object that contains 'entityName' or 'overriddenSetName', one of 'entityId', 'alternateKey', 'fetchXml' or 'queryParams' and optional 'headers'.</param>
	    /// <returns>Promise for sent request.</returns>
        var params = parameters || {};
        
        if (!params.entityName && !params.overriddenSetName) {
            throw new Error("Entity name has to be passed!");
        }
        
        var url = WebApiClient.GetApiUrl() + WebApiClient.GetSetName(params.entityName, params.overriddenSetName);

        if (params.entityId) {
            url += "(" + RemoveIdBrackets(params.entityId) + ")";
        }
        else if (params.fetchXml) {
        	url += "?fetchXml=" + escape(params.fetchXml);
        }
        else if (params.alternateKey) {
            url += "(";
            
            for (var i = 0; i < params.alternateKey.length; i++) {
                var key = params.alternateKey[i];
                
                url += key.property + "='" + key.value + "'";
                
                if (i + 1 === params.alternateKey.length) {
                    url += ")";
                }
                else {
                    url += ",";
                }
            }
        }
        
        if (params.queryParams) {
            url += params.queryParams;
        }
        
        return WebApiClient.SendRequest("GET", url, null, params.headers);
    };
    
    WebApiClient.Update = function(parameters) {
    	/// <summary>Updates a given record in CRM.</summary>
	    /// <param name="parameters" type="Object">Object that contains 'entityName' or 'overriddenSetName', 'entityId', 'entity' (record) and optional 'headers'.</param>
	    /// <returns>Promise for sent request.</returns>
        var params = parameters || {};
        
        if (!params.entity) {
            throw new Error("Update object has to be passed!");
        }
        
        var url = GetRecordUrl(params);
        
        return WebApiClient.SendRequest("PATCH", url, params.entity, params.headers);
    };
    
    WebApiClient.Delete = function(parameters) {
    	/// <summary>Deletes a given record in CRM.</summary>
	    /// <param name="parameters" type="Object">Object that contains 'entityName' or 'overriddenSetName', 'entityId' and optional 'headers'.</param>
	    /// <returns>Promise for sent request.</returns>   
        var params = parameters || {};
        var url = GetRecordUrl(params);
        
        return WebApiClient.SendRequest("DELETE", url, null, params.headers);
    };
    
    WebApiClient.Associate = function(parameters) {
    	/// <summary>Associates two given records in CRM.</summary>
	    /// <param name="parameters" type="Object">Object that contains 'relationShip' name, 'source' and 'target' that both have 'entityName' or 'overriddenSetName' and 'entityId' set. Optional 'headers'.</param>
	    /// <returns>Promise for sent request.</returns>
        var params = parameters || {};
        
        if (!params.relationShip) {
            throw new Error("Relationship has to be passed!");
        }
        
        if (!params.source || !params.target) {
            throw new Error("Source and target have to be passed!");
        }
        
        var targetUrl = GetRecordUrl(params.target);
        var relationShip = "/" + params.relationShip + "/$ref";
        
        var url = targetUrl + relationShip;
        
        var payload = { "@odata.id": GetRecordUrl(params.source) };

        return WebApiClient.SendRequest("POST", url, payload, params.headers);
    };
    
    WebApiClient.Disassociate = function(parameters) {
    	/// <summary>Disassociates two given records in CRM.</summary>
	    /// <param name="parameters" type="Object">Object that contains 'relationShip' name, 'source' and 'target' that both have 'entityName' or 'overriddenSetName' and 'entityId' set. Optional 'headers'.</param>
	    /// <returns>Promise for sent request.</returns>
        var params = parameters || {};
        
        if (!params.relationShip) {
            throw new Error("Relationship has to be passed!");
        }
        
        if (!params.source || !params.target) {
            throw new Error("Source and target have to be passed!");
        }
        
        if (!params.source.entityId) {
            throw new Error("Source needs entityId set!");
        }
        
        var targetUrl = GetRecordUrl(params.target);
        var relationShip = "/" + params.relationShip + "(" + RemoveIdBrackets(params.source.entityId) + ")/$ref";
        
        var url = targetUrl + relationShip;

        return WebApiClient.SendRequest("DELETE", url, null, params.headers);
    };
} (window.WebApiClient = window.WebApiClient || {}));