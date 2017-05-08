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
/** @preserve
 * WebApiClient build version v0.0.0
*/
(function (undefined) {
    "use strict";
    var WebApiClient = {};

    var batchName = "batch_UrlLimitExeedingRequest";

	/// <summary>The API version that will be used when sending requests. Default is "8.0"</summary>
    WebApiClient.ApiVersion = "8.0";

    /// <summary>Checks for more pages when retrieving results. If set to true, all pages will be retrieved, if set to false, only the first page will be retrieved.</summary>
    WebApiClient.ReturnAllPages = false;

    /// <summary>Set to true for retrieving formatted error in style 'xhr.statusText: xhr.error.Message'. If set to false, error json will be returned.</summary>
    WebApiClient.PrettifyErrors = true;

    /// <summary>Set to false for sending all requests synchronously. True by default</summary>
    WebApiClient.Async = true;

    // This is for ensuring that we use bluebird internally, so that calls to WebApiClient have no differing set of
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

    function MergeResults (firstResponse, secondResponse) {
        if (!firstResponse && !secondResponse) {
            return null;
        }

        if (firstResponse && !secondResponse) {
            return firstResponse;
        }

        if (!firstResponse && secondResponse) {
            return secondResponse;
        }

        firstResponse.value = firstResponse.value.concat(secondResponse.value);

        delete firstResponse["@odata.nextLink"];
        delete firstResponse["@Microsoft.Dynamics.CRM.fetchxmlpagingcookie"];

        return firstResponse;
    }

    function RemoveIdBrackets (id) {
        if (!id) {
            return id;
        }

        return id.replace("{", "").replace("}", "");
    }

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

            VerifyHeader(argument);

            DefaultHeaders.push(argument);
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

        if ((!params.entityName && !params.overriddenSetName) || (!params.entityId && !params.alternateKey)) {
            throw new Error("Need entity name or overridden set name and entity id or alternate key for getting record url!");
        }

        var url = WebApiClient.GetApiUrl() + WebApiClient.GetSetName(params.entityName, params.overriddenSetName);

        if (params.alternateKey) {
            url += BuildAlternateKeyUrl(params);
        } else {
            url += "(" + RemoveIdBrackets(params.entityId) + ")";
        }

        return url;
    }

    function FormatError (xhr) {
        if (xhr && xhr.response) {
            var json = JSON.parse(xhr.response);

            if (!WebApiClient.PrettifyErrors) {
                json.xhrStatusText = xhr.statusText;

                return JSON.stringify(json);
            } else {
                var error = "";

                if (json.error) {
                    error = json.error.message;
                }

                return xhr.statusText + ": " + error;
            }
        }

        return "";
    }

    function GetNextLink (response) {
        return response["@odata.nextLink"];
    }

    function GetPagingCookie(response) {
        return response["@Microsoft.Dynamics.CRM.fetchxmlpagingcookie"];
    }

    function SetCookie (pagingCookie, parameters) {
        var unescapedCookie = unescape(pagingCookie);

        // Parse cookie that we retrieved with response
        var parser = new DOMParser();
        var cookieXml = parser.parseFromString(unescapedCookie, "text/xml");

        var cookie = cookieXml.documentElement;

        var cookieValue = unescape(cookie.getAttribute("pagingcookie"));
        var pageNumber = parseInt(/<cookie page="([\d]+)">/.exec(cookieValue)[1]) + 1;

        // Parse our original fetch XML, we will inject the paging information in here
        var fetchXml = parser.parseFromString(parameters.fetchXml, "text/xml");
        var fetch = fetchXml.documentElement;

        fetch.setAttribute("page", pageNumber);
        fetch.setAttribute("paging-cookie", cookieValue);

        // Serialize modified fetch with paging information
        var serializer = new XMLSerializer();
        return serializer.serializeToString(fetchXml);
    }

    function SetPreviousResponse (parameters, response) {
        // Set previous response
        parameters._previousResponse = response;
    }

    function MergeHeaders() {
        var headers = [];

        if (!arguments) {
            return headers;
        }

        for(var i = 0; i < arguments.length; i++) {
            var headersToAdd = arguments[i];

            if (!headersToAdd || !Array.isArray(headersToAdd)) {
                continue;
            }

            for (var j = 0; j < headersToAdd.length; j++) {
                var header = headersToAdd[j];
                VerifyHeader(header);

                var addHeader = true;

                for (var k = 0; k < headers.length; k++) {
                  if (headers[k].key === header.key) {
                      addHeader = false;
                      break;
                  }
                }

                if (addHeader) {
                    headers.push(header);
                }
            }
        }

        return headers;
    }

    function IsBatch(responseText) {
        return responseText && /^--batchresponse_[a-fA-F0-9\-]+$/m.test(responseText);
    }

    function ParseResponse(xhr) {
        var responseText = xhr.responseText;

        // Check if it is a batch response
        if (IsBatch(responseText)) {
            var responseContentType = xhr.getResponseHeader("Content-Type");
            var batchResponseName = responseContentType.substring(responseContentType.indexOf("boundary=")).replace("boundary=", "");

            var changeSetBoundaries = responseText.match(/boundary=changesetresponse.*/);
            var changeSetResponses = [];

            for (var i = 0; changeSetBoundaries && i < changeSetBoundaries.length; i++) {
                var changeSetName = changeSetBoundaries[i].replace("boundary=", "");

                // Find all change set responses in responseText
                var changeSetRegex = new RegExp("--" + changeSetName + "[\\S\\s]*?(?=--" + changeSetName + ")", "gm");

                var changeSetResponse = {
                    name: changeSetName,
                    responses: []
                };

                var changeSets = responseText.match(changeSetRegex);

                for (var k = 0; k < changeSets.length; k++) {
                    changeSetResponse.responses.push(new WebApiClient.Response({
                        rawData: changeSets[k]
                    }));
                }

                changeSetResponses.push(changeSetResponse);
            }

            // Find all batch responses in responseText
            var batchRegex = new RegExp("--" + batchResponseName + "\\r\\nContent-Type: application\\/http[\\S\\s]*?(?=--" + batchResponseName + ")", "gm");
            var batchResponsesRaw = responseText.match(batchRegex) || [];
            var batchResponses = [];

            for (var j = 0; j < batchResponsesRaw.length; j++) {
                batchResponses.push(new WebApiClient.Response({
                    rawData: batchResponsesRaw[j]
                }));
            }


            return new WebApiClient.BatchResponse({ name: batchResponseName, batchResponses: batchResponses, changeSetResponses: changeSetResponses });
        }
        else {
            return JSON.parse(xhr.responseText);
        }
    }

    function CreateBatchPayload (batchName, method, url) {
        return "--" + batchName + "\n" +
          "Content-Type: application/http\n" +
          "Content-Transfer-Encoding: binary\n\n" +
          method + " " + url + " HTTP/1.1\n" +
          "Content-Type: application/json\n" +
          "OData-Version: 4.0\n" +
          "OData-MaxVersion: 4.0\n\n" +
          "--" + batchName + "--";
    }

    function IsOverlengthGet (method, url) {
        return method && method.toLowerCase() === "get" && url && url.length > 2048;
    }

    function SendAsync(method, url, payload, parameters) {
        var xhr = new XMLHttpRequest();

        var promise = new Promise(function(resolve, reject) {
            xhr.onload = function() {
                if(xhr.readyState !== 4) {
                    return;
                }

                if(xhr.status === 200){
                    var response = ParseResponse(xhr);

                    if (response instanceof WebApiClient.BatchResponse) {
                        // If it was an overlength fetchXml, that was sent as batch automatically, we don't want it to behave as a batch
                        if (parameters.fetchXml) {
                            response = response.batchResponses[0].payload;
                        }
                        // If we received multiple responses, but not from overlength get, it was a custom batch. Just resolve all matches
                        else {
                            resolve(response);
                        }
                    }

                    var nextLink = GetNextLink(response);
                    var pagingCookie = GetPagingCookie(response);

                    response = MergeResults(parameters._previousResponse, response);

                    // Results are paged, we don't have all results at this point
                    if (nextLink && (WebApiClient.ReturnAllPages || parameters.returnAllPages)) {
                        SetPreviousResponse(parameters, response);

                        resolve(SendAsync("GET", nextLink, null, parameters));
                    }
                    else if (pagingCookie && (WebApiClient.ReturnAllPages || parameters.returnAllPages)) {
                        var nextPageFetch = SetCookie(pagingCookie, parameters);

                        SetPreviousResponse(parameters, response);

                        parameters.fetchXml = nextPageFetch;

                        resolve(WebApiClient.Retrieve(parameters));
                    }
                    else {
                        resolve(response);
                    }
                }
                else if (xhr.status === 201) {
                    resolve(ParseResponse(xhr));
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
                    reject(new Error(FormatError(xhr)));
                }
            };
            xhr.onerror = function() {
                reject(new Error(FormatError(xhr)));
            };
        });

        var headers = [];

        if (IsOverlengthGet(method, url)) {
            payload = CreateBatchPayload(batchName, method, url);

            url = WebApiClient.GetApiUrl() + "$batch";
            method = "POST";

            headers.push({key: "Content-Type", value: "multipart/mixed;boundary=" + batchName});
        }

        xhr.open(method, url, true);

        headers = MergeHeaders(headers, parameters.headers, DefaultHeaders);

        AppendHeaders(xhr, headers);

        // Bugfix for IE. If payload is undefined, IE would send "undefined" as request body
        if (payload) {
            // For batch requests, we just want to send a string body
            if (typeof(payload) === "string") {
                xhr.send(payload);
            }
            else {
              xhr.send(JSON.stringify(payload));
            }
        } else {
            xhr.send();
        }

        return promise;
    }

    function SendSync(method, url, payload, parameters) {
        var xhr = new XMLHttpRequest();
        var response;

        xhr.onload = function() {
            if(xhr.readyState !== 4) {
                return;
            }

            if(xhr.status === 200){
                response = ParseResponse(xhr);

                // If we received multiple responses, it was a custom batch. Just resolve all matches
                if (response instanceof WebApiClient.BatchResponse) {
                  // If it was an overlength fetchXml, that was sent as batch automatically, we don't want it to behave as a batch
                  if (parameters.fetchXml) {
                        response = response.batchResponses[0].payload;
                    } else {
                        return;
                    }
                }

                var nextLink = GetNextLink(response);
                var pagingCookie = GetPagingCookie(response);

                response = MergeResults(parameters._previousResponse, response);

                // Results are paged, we don't have all results at this point
                if (nextLink && (WebApiClient.ReturnAllPages || parameters.returnAllPages)) {
                    SetPreviousResponse(parameters, response);

                    SendSync("GET", nextLink, null, parameters);
                }
                else if (pagingCookie && (WebApiClient.ReturnAllPages || parameters.returnAllPages)) {
                    var nextPageFetch = SetCookie(pagingCookie, parameters);

                    SetPreviousResponse(parameters, response);

                    parameters.fetchXml = nextPageFetch;

                    WebApiClient.Retrieve(parameters);
                }
            }
            else if (xhr.status === 201) {
                response = ParseResponse(xhr);
            }
            else if (xhr.status === 204) {
                if (method.toLowerCase() === "post") {
                    response = xhr.getResponseHeader("OData-EntityId");
                }
                // No content returned for delete, update, ...
                else {
                    response = xhr.statusText;
                }
            }
            else {
                throw new Error(FormatError(xhr));
            }
        };
        xhr.onerror = function() {
            throw new Error(FormatError(xhr));
        };

        var headers = [];

        if (IsOverlengthGet(method, url)) {
            payload = CreateBatchPayload(batchName, method, url);

            url = WebApiClient.GetApiUrl() + "$batch";
            method = "POST";

            headers.push({key: "Content-Type", value: "multipart/mixed;boundary=" + batchName});
        }

        xhr.open(method, url, false);

        headers = MergeHeaders(headers, parameters.headers, DefaultHeaders);

        AppendHeaders(xhr, headers);

        // Bugfix for IE. If payload is undefined, IE would send "undefined" as request body
        if (payload) {
            // For batch requests, we just want to send a string body
            if (typeof(payload) === "string") {
                xhr.send(payload);
            }
            else {
              xhr.send(JSON.stringify(payload));
            }
        } else {
            xhr.send();
        }

        return response;
    }

    function GetAsync (parameters) {
      if (typeof(parameters.async) !== "undefined") {
          return parameters.async;
      }

      return WebApiClient.Async;
    }

    function BuildAlternateKeyUrl (params) {
        if (!params || !params.alternateKey) {
            return "";
        }

        var url = "(";

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

        return url;
    }

    WebApiClient.SendRequest = function (method, url, payload, parameters) {
      /// <summary>Sends request using given method, url, payload and additional per-request headers.</summary>
      /// <param name="method" type="String">Method type of request to send, such as "GET".</param>
      /// <param name="url" type="String">URL target for request.</param>
      /// <param name="payload" type="Object">Payload for request.</param>
      /// <param name="requestHeaders" type="Array">Array of headers that consist of objects with key and value property.</param>
      /// <returns>Promise for sent request or result if sync.</returns>
      var params = parameters || {};

      // Fallback for request headers array as fourth parameter
      if (Array.isArray(params)) {
          params = {
              headers: params
          };
      }

      if (params.asBatch) {
          return new WebApiClient.BatchRequest({method: method, url: url, payload: payload, parameters: parameters});
      }

      var asynchronous = GetAsync(params);

      if (asynchronous) {
          return SendAsync(method, url, payload, params);
      } else {
          return SendSync(method, url, payload, params);
      }
    };

    WebApiClient.Configure = function (configuration) {
        for (var property in configuration) {
            if (!configuration.hasOwnProperty(property)) {
                continue;
            }

            WebApiClient[property] = configuration[property];
        }
    };

    WebApiClient.GetApiUrl = function() {
    	/// <summary>Gets the current base API url that is used.</summary>
	    /// <returns>Base  URL that is currently used.</returns>
        return GetClientUrl() + "/api/data/v" + WebApiClient.ApiVersion + "/";
    };

    WebApiClient.Create = function(parameters) {
    	/// <summary>Creates a given record in CRM.</summary>
	    /// <param name="parameters" type="Object">Object that contains 'entityName' or 'overriddenSetName', 'entity' (record) and optional 'headers'.</param>
	    /// <returns>Promise for sent request or result if sync.</returns>
        var params = parameters || {};

        if ((!params.entityName && !params.overriddenSetName) || !params.entity) {
            throw new Error("Entity name and entity object have to be passed!");
        }

        var url = WebApiClient.GetApiUrl() + WebApiClient.GetSetName(params.entityName, params.overriddenSetName);

        return WebApiClient.SendRequest("POST", url, params.entity, params);
    };

    WebApiClient.Retrieve = function(parameters) {
    	/// <summary>Retrieves records from CRM.</summary>
	    /// <param name="parameters" type="Object">Object that contains 'entityName' or 'overriddenSetName', one of 'entityId', 'alternateKey', 'fetchXml' or 'queryParams' and optional 'headers'.</param>
	    /// <returns>Promise for sent request or result if sync.</returns>
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
            url += BuildAlternateKeyUrl(params);
        }

        if (params.queryParams) {
            url += params.queryParams;
        }

        return WebApiClient.SendRequest("GET", url, null, params);
    };

    WebApiClient.Update = function(parameters) {
    	/// <summary>Updates a given record in CRM.</summary>
	    /// <param name="parameters" type="Object">Object that contains 'entityName' or 'overriddenSetName', 'entityId', 'entity' (record) and optional 'headers'.</param>
	    /// <returns>Promise for sent request or result if sync.</returns>
        var params = parameters || {};

        if (!params.entity) {
            throw new Error("Update object has to be passed!");
        }

        var url = GetRecordUrl(params);

        return WebApiClient.SendRequest("PATCH", url, params.entity, params);
    };

    WebApiClient.Delete = function(parameters) {
    	/// <summary>Deletes a given record in CRM.</summary>
	    /// <param name="parameters" type="Object">Object that contains 'entityName' or 'overriddenSetName', 'entityId' and optional 'headers'.</param>
	    /// <returns>Promise for sent request or result if sync.</returns>
        var params = parameters || {};
        var url = GetRecordUrl(params);

        return WebApiClient.SendRequest("DELETE", url, null, params);
    };

    WebApiClient.Associate = function(parameters) {
    	/// <summary>Associates two given records in CRM.</summary>
	    /// <param name="parameters" type="Object">Object that contains 'relationShip' name, 'source' and 'target' that both have 'entityName' or 'overriddenSetName' and 'entityId' set. Optional 'headers'.</param>
	    /// <returns>Promise for sent request or result if sync.</returns>
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

        return WebApiClient.SendRequest("POST", url, payload, params);
    };

    WebApiClient.Disassociate = function(parameters) {
    	/// <summary>Disassociates two given records in CRM.</summary>
	    /// <param name="parameters" type="Object">Object that contains 'relationShip' name, 'source' and 'target' that both have 'entityName' or 'overriddenSetName' and 'entityId' set. Optional 'headers'.</param>
	    /// <returns>Promise for sent request or result if sync.</returns>
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

        return WebApiClient.SendRequest("DELETE", url, null, params);
    };

    WebApiClient.Execute = function(request) {
    /// <summary>Executes the passed request</summary>
    /// <param name="request" type="Object">Request object that inherits from WebApiClient.Requests.Request</param>
    /// <returns>Promise for sent request or result if sync</returns>
        if (!request) {
            throw new Error("You need to pass a request!");
        }

        if (!(request instanceof WebApiClient.Requests.Request)) {
            throw new Error("Request for execution must be in prototype chain of WebApiClient.Request");
        }

        return WebApiClient.SendRequest(request.method, request.buildUrl(), request.payload, request);
    };

    WebApiClient.SendBatch = function(batch) {
    /// <summary>Executes the passed request</summary>
    /// <param name="request" type="Object">Request object that inherits from WebApiClient.Requests.Request</param>
    /// <returns>Promise for sent request or result if sync</returns>
        if (!batch) {
            throw new Error("You need to pass a batch!");
        }

        if (!(batch instanceof WebApiClient.Batch)) {
            throw new Error("Batch for execution must be a WebApiClient.Batch object");
        }

        var url = WebApiClient.GetApiUrl() + "$batch";

        if (!batch.name) {
            throw new Error("You need to set a batchName on your batch");
        }

        if (!batch.headers) {
            batch.headers = [];
        }

        batch.headers.push({key: "Content-Type", value: "multipart/mixed;boundary=" + batch.name});

        var payload = batch.buildPayload();

        return WebApiClient.SendRequest("POST", url, payload, batch);
    };

    WebApiClient.Expand = function (parameters) {
    /// <summary>Expands all odata.nextLink / deferred properties for an array of records</summary>
    /// <param name="parameters" type="Object">Object that contains 'records' array or object. Optional 'headers'.</param>
    /// <returns>Promise for sent request or result if sync.</returns>
        var params = parameters || {};
        var records = params.records;

        var requests = [];
        var asynchronous = GetAsync(parameters);

        for (var i = 0; i < records.length; i++) {
            var record = records[i];

            for (var attribute in record) {
                if (!record.hasOwnProperty(attribute)) {
                    continue;
                }

                var name = attribute.replace("@odata.nextLink", "");

                // If nothing changed, this was not a deferred attribute
                if (!name || name === attribute) {
                    continue;
                }

                record[name] = WebApiClient.SendRequest("GET", record[attribute], null, params);

                // Delete @odata.nextLink property
                delete record[attribute];
            }

            if (asynchronous) {
                requests.push(Promise.props(record));
            }
        }

        if (asynchronous) {
            return Promise.all(requests);
        } else {
            return records;
        }
    };

    module.exports = WebApiClient;
} ());
