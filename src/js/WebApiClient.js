// Get WebApiClient core
var WebApiClient = require("./WebApiClient.Core.js");

/* @preserve
 * The Bluebird license is included below as Terser keeps removing it (https://github.com/terser/terser/issues/575)
 */

/* @preserve
 * The MIT License (MIT)
 * 
 * Copyright (c) 2013-2018 Petka Antonov
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 */
/**
 * This is the bundled version of bluebird for usage as polyfill in browsers that don't support promises natively
 * @class
 * @see https://github.com/petkaantonov/bluebird
 * @memberof module:WebApiClient
 * @alias WebApiClient.Promise
 */
WebApiClient.Promise = require("bluebird").noConflict();

// Attach requests to core
WebApiClient.Requests = require("./WebApiClient.Requests.js");

// Attach batch to core
WebApiClient.Batch = require("./WebApiClient.Batch.js");

// Attach changeSet to core
WebApiClient.ChangeSet = require("./WebApiClient.ChangeSet.js");

// Attach batchRequest to core
WebApiClient.BatchRequest = require("./WebApiClient.BatchRequest.js");

// Attach batchResponse to core
WebApiClient.BatchResponse = require("./WebApiClient.BatchResponse.js");

// Attach response to core
WebApiClient.Response = require("./WebApiClient.Response.js");

// Export complete WebApiClient
module.exports = WebApiClient;
window.WebApiClient = window.WebApiClient || WebApiClient;