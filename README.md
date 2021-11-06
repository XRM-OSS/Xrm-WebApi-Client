# Dynamics CRM JavaScript Web API Client
[![Run Tests](https://github.com/XRM-OSS/Xrm-WebApi-Client/actions/workflows/npm-test.yml/badge.svg)](https://github.com/XRM-OSS/Xrm-WebApi-Client/actions/workflows/npm-test.yml) [![Coverage Status](https://coveralls.io/repos/github/XRM-OSS/Xrm-WebApi-Client/badge.svg?branch=master)](https://coveralls.io/github/XRM-OSS/Xrm-WebApi-Client?branch=master) [![Package Quality](http://npm.packagequality.com/shield/xrm-webapi-client.svg)](http://packagequality.com/#?package=xrm-webapi-client) [![npm downloads](https://img.shields.io/npm/dt/xrm-webapi-client.svg)](http://npm-stats.org/#/xrm-webapi-client) [![Join the chat at https://gitter.im/DigitalFlow/Xrm-WebApi-Client](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/DigitalFlow/Xrm-WebApi-Client?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

This is a framework for easing working with the Dynamics CRM WebApi using JavaScript.
It uses the awesome [BlueBird](https://github.com/petkaantonov/bluebird) framework for handling requests asynchronously based on promises.
The framework is supposed to be executed on CRM forms or on CRM web ressources, where the CRM context is available.
In addition to that, usage for single page applications outside of CRM is also possible.
For running from custom web resources, be sure that the GetGlobalContext function is available, as the client will try to retrieve the context on its own.

# Index

- [Dynamics CRM JavaScript Web API Client](#dynamics-crm-javascript-web-api-client)
  * [Requirements](#requirements)
    + [CRM](#crm)
    + [Browser](#browser)
  * [How to obtain it](#how-to-obtain-it)
    + [NPM](#npm)
    + [GitHub Release](#github-release)
  * [How to build it](#how-to-build-it)
  * [Import](#import)
  * [Operations](#operations)
    + [Synchronous vs Asynchronous](#synchronous-vs-asynchronous)
    + [Create](#create)
      - [Return created record in create response](#return-created-record-in-create-response)
    + [Retrieve](#retrieve)
      - [Retrieve single records](#retrieve-single-records)
        * [Retrieve by ID](#retrieve-by-id)
        * [Retrieve by alternate key](#retrieve-by-alternate-key)
      - [Retrieve multiple records](#retrieve-multiple-records)
        * [Retrieve by query expression](#retrieve-by-query-expression)
        * [Retrieve by FetchXml](#retrieve-by-fetchxml)
      - [Auto expand collection-valued navigation properties](#auto-expand-collection-valued-navigation-properties)
    + [Update](#update)
      - [Update by alternate key](#update-by-alternate-key)
      - [Return updated record in update response](#return-updated-record-in-update-response)
      - [Clear lookup value](#clear-lookup-value)
    + [Delete](#delete)
      - [Delete by alternate key](#delete-by-alternate-key)
      - [Delete single property](#delete-single-property)
    + [Associate](#associate)
    + [Disassociate](#disassociate)
    + [Execute](#execute)
      - [No parameter request](#no-parameter-request)
      - [Parametrized request](#parametrized-request)
    + [Send Batch](#send-batch)
      - [How to create batch requests](#how-to-create-batch-requests)
      - [Batch Responses](#batch-responses)
      - [Request failures](#request-failures)
    + [Configuration](#configuration)
    + [Errors](#errors)
    + [Set Names](#set-names)
    + [Not yet implemented requests](#not-yet-implemented-requests)
    + [Promises](#promises)
  * [External Access](#external-access)
    + [Single Page Application](#single-page-application)
  * [Headers](#headers)
    + [Header Format](#header-format)
    + [Default Headers](#default-headers)
    + [Request Headers](#request-headers)
      - [Page size](#page-size)
    + [API Version](#api-version)
  * [Remarks](#remarks)
    + [CRM App](#crm-app)
  * [FAQ](#faq)
    + [Payloads](#payloads)
    + [Logical Names](#logical-names)

## Requirements
### CRM
This framework targets the Dynamics CRM WebApi, therefore CRM 2016 (>= v8.0) is needed.

### Browser
Although using Promises, some legacy browsers are still supported, since bluebird is used as Promise polyfill.
Bluebird is automatically included in the bundled release, no additional steps required.
For a list of supported browsers, check the bluebird [platform support](http://bluebirdjs.com/docs/install.html#supported-platforms).

## How to obtain it
### NPM
This framework is on npm as UMD, thanks to the standalone option of browserify.

The package name is xrm-webapi-client, check it out:

[![NPM version](https://img.shields.io/npm/v/xrm-webapi-client.svg?style=flat)](https://www.npmjs.com/package/xrm-webapi-client)

When using it in TypeScript, import it using this line:
`import * as WebApiClient from "xrm-webapi-client";`

In your tsconfig.json, `module` should be `es6` and `moduleResolution` should be `node`.

### GitHub Release
You can always download the browserified version of this framework by downloading the release.zip file from the latest [release](https://github.com/DigitalFlow/Xrm-WebApi-Client/releases).

## How to build it
You'll have to install [npm](https://www.npmjs.com/) on your machine.

For bootstrapping, simply run ```npm install``` once initially.
For every build, you can just call ```npm run build```. You'll find the build output in the Publish directory.

## Import
You can import this library inside your code like this:
```JS
import * as WebApiClient from "xrm-webapi-client";
```

## Operations
### Synchronous vs Asynchronous
Per default, all requests are sent asynchronously.
This is the suggested way of sending requests, however, sometimes there is the need for using synchronous requests.



Be sure to avoid synchronous requests if it is possible and use asynchronous requests instead.

For sending requests synchronously, you can either set ```WebApiClient.Async``` to false, which will configure the WebApiClient to send all requests synchronously, or pass an ```async``` property in your request, like so:

```JavaScript
var request = {
    entityName: "account",
    entity: {name: "Adventure Works"},
    async: false
};

try {
    var response = WebApiClient.Create(request);

    // Process response
}
catch (error) {
    // Handle error
}
```

### Create
The client supports creation of records. You have to pass the entity logical name, and a data object:

```JavaScript
var request = {
    entityName: "account",
    entity: {name: "Adventure Works"}
};

WebApiClient.Create(request)
    .then(function(response){
        // Process response
    })
    .catch(function(error) {
        // Handle error
    });
```

#### Return created record in create response
This feature is available from Dynamics365 v8.2 upwards.
For returning the full record that was created from your request, set an appropriate Prefer header as follows:

```JavaScript
var request = {
    entityName: "account",
    entity: {name: "Adventure Works"},
    headers: [{key: "Prefer", value: "return=representation"}]
};

WebApiClient.Create(request)
    .then(function(response){
        // Process response
    })
    .catch(function(error) {
        // Handle error
    });
```

### Retrieve
The client supports retrieving of records by Id, by alternate key, fetchXml and query expressions.
For retrieving by alternate key, pass an array of objects that each have a property and a value property.
You have to pass at least the entity logical name.
You can always pass query parameters which will be appended to your retrieve requests.

#### Retrieve single records
##### Retrieve by ID

```JavaScript
var request = {
    entityName: "account",
    entityId: "00000000-0000-0000-0000-000000000001"
};

WebApiClient.Retrieve(request)
    .then(function(response){
        // Process response
    })
    .catch(function(error) {
        // Handle error
    });
```

##### Retrieve by alternate key

```JavaScript
var request = {
    entityName: "contact",
    alternateKey:
        [
            { property: "firstname", value: "Joe" },
            { property: "emailaddress1", value: "abc@example.com"}
        ]
};

WebApiClient.Retrieve(request)
    .then(function(response){
        // Process response
    })
    .catch(function(error) {
        // Handle error
    });
```

#### Retrieve multiple records
Retrieve of multiple records uses paging. Per default you can set a [page size on your requests](#page-size), however this is limited to 5000 records.
If you want to really retrieve all records, set WebApiClient.ReturnAllPages to true, as it is by default false, like this:

``` JavaScript
WebApiClient.ReturnAllPages = true;
```

By setting this to true, each retrieve multiple request will check for an @odata.nextLink property inside the response, call the next page and concatenate the results, until all records have been retrieved.

You can also pass this option per-request, like this:

```JavaScript
var request = {
    entityName: "account",
    queryParams: "?$select=name,revenue,&$orderby=revenue asc,name desc&$filter=revenue ne null",
    returnAllPages: true
};
```

##### Retrieve by query expression

```JavaScript
var request = {
    entityName: "account",
    queryParams: "?$select=name,revenue,&$orderby=revenue asc,name desc&$filter=revenue ne null"
};

WebApiClient.Retrieve(request)
    .then(function(response){
        // Process response
    })
    .catch(function(error) {
        // Handle error
    });
```

##### Retrieve by FetchXml
FetchXml requests have some special behaviour implemented. Short fetchXml will be sent as GET request using a fetchXml URL query parameter.
There is however an URL length limit of 2048 chars, so large fetchXml requests would fail, since they exceed this limit.
Since release v3.1.0, the request will automatically be sent as POST batch request, so that large fetchXml can be executed as well.
You don't have to do anything for this to happen, the URL length is checked automatically before sending the request.

```JavaScript
var request = {
    entityName: "account",
    fetchXml: "<fetch mapping='logical'>" +
                "<entity name='account'>" +
                    "<attribute name='accountid'/>" +
                    "<attribute name='name'/>" +
                "</entity>" +
              "</fetch>"
};

WebApiClient.Retrieve(request)
    .then(function(response){
        // Process response
    })
    .catch(function(error) {
        // Handle error
    });
```

#### Auto expand collection-valued navigation properties
When retrieving collection-valued navigation properties, the expand is being deferred, i.e. you don't retrieve immediate results, but a property ending in "@odata.nextLink" that contains an URL to the results for this expand. You can read more about this [here](https://msdn.microsoft.com/en-us/library/gg334767.aspx#bkmk_expandRelated).
For easing to retrieve these, we can use the `WebApiClient.Expand` function. It takes an array of records and expands all properties, that end in "@odata.nextLink".
You can additionally pass headers to the request, that will be appended to each retrieve request for properties.

```JavaScript
WebApiClient.Retrieve({
    entityName: "account",
    queryParams: "?$expand=contact_customer_accounts"
})
.then(function(response){
    return WebApiClient.Expand({
        records: response.value
    });
})
.then(function(response){        
    // Process response
})
.catch(function(error) {
    // Handle error
});
```

### Update
Update requests are supported. You have to pass the entity logical name, the ID of the record to update and an update object:

```JavaScript
var request = {
    entityName: "account",
    entityId: "00000000-0000-0000-0000-000000000001",
    entity: { name: "Contoso" }
};

WebApiClient.Update(request)
    .then(function(response){
        // Process response
    })
    .catch(function(error) {
        // Handle error
    });
```

#### Update by alternate key

```JavaScript
var request = {
    entityName: "contact",
    alternateKey:
        [
            { property: "firstname", value: "Joe" },
            { property: "emailaddress1", value: "abc@example.com"}
        ],
    entity: { lastname: "Doe" }
};

WebApiClient.Update(request)
    .then(function(response){
        // Process response
    })
    .catch(function(error) {
        // Handle error
    });
```

#### Return updated record in update response
This feature is available from Dynamics365 v8.2 upwards.
For returning the full record after applying the updates from your request, set an appropriate Prefer header as follows:

```JavaScript
var request = {
    entityName: "account",
    entityId: "00000000-0000-0000-0000-000000000001",
    entity: { name: "Contoso" },
    headers: [{key: "Prefer", value: "return=representation"}]
};

WebApiClient.Update(request)
    .then(function(response){
        // Process response
    })
    .catch(function(error) {
        // Handle error
    });
```

#### Clear Lookup value
If you're trying to clear a lookup value using an update with a null value, it might very well be, that it simply does nothing, or fails with an error such as `Property _pub_field_value cannot be updated to null. The reference property can only be deleted`.
In this case, you can not use an update request for clearing the lookup.

Take a look at the [delete single property](#delete-single-property) section.

### Delete
Delete requests are supported. You have to pass the entity logical name, and ID of the record to delete:

```JavaScript
var request = {
    entityName: "account",
    entityId: "00000000-0000-0000-0000-000000000001"
};

WebApiClient.Delete(request)
    .then(function(response){
        // Process response
    })
    .catch(function(error) {
        // Handle error
    });
```

#### Delete by alternate key

```JavaScript
var request = {
    entityName: "contact",
    alternateKey:
        [
            { property: "firstname", value: "Joe" },
            { property: "emailaddress1", value: "abc@example.com"}
        ]
};

WebApiClient.Delete(request)
    .then(function(response){
        // Process response
    })
    .catch(function(error) {
        // Handle error
    });
```

#### Delete single property
You can delete single properties by passing the field to clear as queryParams with a preceding slash, like "/telephone1".
If it is a lookup, you'll have to prepend "/$ref", such as "/primarycontactid/$ref".

```JavaScript
var request = {
    entityName: "account",
    entityId: "00000000-0000-0000-0000-000000000001",
    queryParams: "/primarycontactid/$ref"
};

WebApiClient.Delete(request)
    .then(function(response){
        // Process response
    })
    .catch(function(error) {
        // Handle error
    });
```

### Associate
Associate requests are supported. You have to pass the relationship name, a source and a target entity.
This example associates an opportuntiy to an account:

```JavaScript
var request = {
    relationShip: "opportunity_customer_accounts",
    source:
        {
            entityName: "opportunity",
            entityId: "00000000-0000-0000-0000-000000000001"
        },
    target:
        {
            entityName: "account",
            entityId: "00000000-0000-0000-0000-000000000002"
        }
};

WebApiClient.Associate(request)
    .then(function(response){
        // Process response
    })
    .catch(function(error) {
        // Handle error
    });
```

### Disassociate
Disassociate requests are supported. You have to pass the relationship name, a source and a target entity.
This example disassociates an opportuntiy from an account:

```JavaScript
var request = {
    relationShip: "opportunity_customer_accounts",
    source:
        {
            entityName: "opportunity",
            entityId: "00000000-0000-0000-0000-000000000001"
        },
    target:
        {
            entityName: "account",
            entityId: "00000000-0000-0000-0000-000000000002"
        }
};

WebApiClient.Disassociate(request)
    .then(function(response){
        // Process response
    })
    .catch(function(error) {
        // Handle error
    });
```

### Execute
There is support for executing actions / functions without having to use SendRequest.
The WebApiClient has a function WebApiClient.Execute, which takes a request as parameter.
Requests are objects that base on the WebApiClient.Requests.Request base request.
When wanting to send an already implemented request using Execute, you can either use the blank request (such as the WhoAmIRequest, that does not need any parameters), or in case it needs parameters, extend an existing request.

Missing or custom action requests can be implemented as described [here](#not-yet-implemented-requests).

Check the [wiki](https://github.com/DigitalFlow/Xrm-WebApi-Client/wiki) for a list of requests that are implemented in the current release and examples on how to send them!

#### No parameter request
The WhoAmI request does not need any parameters, therefore we can just pass the blank request:

```JavaScript
var request = WebApiClient.Requests.WhoAmIRequest;

WebApiClient.Execute(request)
    .then(function(response){
        // Process response
    })
    .catch(function(error) {
        // Handle error
    });
```

#### Parametrized request
Most requests need further parameters for being sent.
When needing to send those requests, start with the blank request and call the function "with" on it, passing the needed parameters as object to it. Your passed-in parameters override possibly existing parameters with the same name.

The following parameters are supported:
- method - HTTP method for request (Required, but defined by request)
- name - Name of the request as used for the URL (Required, but defined by request)
- bound - Pass true if request is bound to a record, false if not. Has consequences for automatic URL building. By default false and defined by request.
- entityName - Name of the request's target entity. Defined by request if always the same.
- entityId - ID of the request's target record
- payload - Object that is sent as payload for the request
- headers - Headers that should be set on the request
- urlParams - Any parameters that have to be embedded in the request URL, as described [here](https://msdn.microsoft.com/en-us/library/gg309638.aspx#Anchor_2). Pass an object with parameter names as keys and the corresponding values.

Sample request for AddToQueue:
```JavaScript
var request = WebApiClient.Requests.AddToQueueRequest
    .with({
        entityId: "56ae8258-4878-e511-80d4-00155d2a68d1",
        payload: {
            Target: {
                activityid: "59ae8258-4878-e511-80d4-00155d2a68d1",
                "@odata.type": "Microsoft.Dynamics.CRM.letter"
            }
        }
    });

WebApiClient.Execute(request)
    .then(function(response){
        // Process response
    })
    .catch(function(error) {
        // Handle error
    });
```

### Send Batch
There is support for sending multiple requests as a batch. Batch requests can contain retrieve requests and change sets. Change sets can contain requests themselves, however they must not contain other change sets.

Requests directly attached to batch requests have to be GET requests, they must not be added to change sets, since those have to contain requests, that change data.
Batch requests provide transactional functionality, so all operations contained in one change set will roll back, if any of them fails.
You can read more about batch requests in general [here](https://msdn.microsoft.com/en-us/library/mt607719.aspx).
There is also a useful [OData Reference](http://www.odata.org/documentation/odata-version-3-0/batch-processing/) covering this topic (albeit v3.0).

#### How to create batch requests
For creating requests for usage inside batches, you can either create a `WebApiClient.BatchRequest` object using its constructor, or easier, call one of the WebApiClient functions and pass `asBatch: true` as parameter.

All functions, such as CRUD, Execute and so on support this parameter. The only exception to it is the Expand function.

Below is an example for creating two tasks attached to an account in one change set, while returning the records created.
Afterwards, the account they were attached to is returned:

```JavaScript
WebApiClient.Create({entityName: "account", entity: { name: "Test" }})
    .then(function (account) {
        var accountId = account.substring(account.indexOf("(")).replace("(", "").replace(")","");

        var batch = new WebApiClient.Batch({
            changeSets: [
                new WebApiClient.ChangeSet({
                    requests: [
                        WebApiClient.Create({
                           entityName: "task",
                           entity: {
                             subject: "Task 1 in batch",
                             "regardingobjectid_account_task@odata.bind": "/accounts(" + accountId + ")"
                           },
                           headers: [{key: "Prefer", value:"return=representation"}],
                           asBatch: true
                        }),
                        WebApiClient.Create({
                           entityName: "task",
                           entity: {
                             subject: "Task 2 in batch",
                             "regardingobjectid_account_task@odata.bind": "/accounts(" + accountId + ")"
                           },
                           headers: [{key: "Prefer", value:"return=representation"}],
                           asBatch: true
                        })
                 ]
             })],
            requests: [
                WebApiClient.Retrieve({
                    entityName: "account",
                    entityId: accountId,
                    asBatch: true
                })
            ]
        });
        
        return WebApiClient.SendBatch(batch);
    })
    .then(function(result) {
        if(result.isFaulted) {
            console.log(result.errors);
        }
        
        // Logs BatchResponse with name, batchResponses array and changeSetResponses array
        console.log(result);
    })
    .catch(function(error) {
        // Handle network error or similar
    });
```
Note: Above code is only an example, you could also create your batch and change sets separately and add the change sets to `batch.changeSets`, requests inside the change sets to `changeSet.requests` and plain batch requests to `batch.requests`, which are all arrays.

#### Batch Responses
Calls to `WebApiClient.SendBatch` will return a BatchResponse.
A batch response consist of an array `batchResponses`, that contains all responses for GET requests, that were directly attached to the batch and an array `changeSetResponses`, that contains one change set response for each change set that was sent.
Each change set response contains its own `responses` array, with responses for each request inside the changset.

At the top level, each batch response also has a `name`, an `isFaulted` property that evaluates to true, if any of the requests failed and an `errors` array that contains all responses for failed requests.

The lowest level responses all contain a `headers` object, so you can access headers easier (e.g. headers["OData-EntityId"]), a `payload` object, a `status` (such as "200") and a `contentId`, if the requests inside the change set had one set.

Scheme of a batch response:
- batchResponses (array)
    - Response (WebApiClient.Response)
        - contentId (string)
        - headers (array of string * string)
        - payload (object)
        - status (string)
    - ...
- changeSetResponses (array)
    - changeSetResponse (object)
        - name (string)
        - responses (array)
            - Response (WebApiClient.Response)
                - contentId (string)
                - headers (array of string * string)
                - payload (object)
                - status (string)
            - ...
- errors (array of WebApiClient.Response)
- isFaulted (bool)
- name (string)
  

#### Request failures
If a request inside the batch requests or a change set fails, the batch response property `isFaulted` will have the value `true`.
You can get a collection of all errors using the response property `errors`.

This is all inside the `then` handler, remember that you should still configure a `catch` handler, as this will be needed if a requests fails due to network errors or similar.

### Configuration
When having to set multiple configuration settings for the WebApiClient, you can use the ```Configure``` function, which gets an object passed with keys and values, that get projected onto the WebApiClient:

```JavaScript
WebApiClient.Configure({
    ApiVersion: "8.2",
    ReturnAllPages: true,
    PrettifyErrors: false
});
```

### Errors
If errors occur during processing of requests, the WebAPI client by default throws an error with the text that follows this format: xhr.statusText: xhr.response.message, i.e. "Internal Server Error: The function parameter 'EntityMoniker' cannot be found.Parameter name: parameterName".

For returning the whole stringified JSON response including a custom xhrStatusText property, set

```JavaScript
WebApiClient.PrettifyErrors = false;
```

### Set Names
Set names are automatically generated according to WebApi rules and based on the entityName parameter in your request.
However there are some set names, that are not generated according to naming rules, for example ContactLeads becomes contactleadscollection. For handling those corner cases, each request allows to pass an overriddenSetName instead of the entity name, so that you can directly pass those set names that break naming rules. This should happen very rarely.
Example of passing overriddenSetName:

```JavaScript
var request = {
    overriddenSetName: "contactleadscollection",
    entity: {name: "Contoso"}
};

WebApiClient.Create(request)
    .then(function(response){
        // Process response
    })
    .catch(function(error) {
        // Handle error
    });
```

### Not yet implemented requests
If you need to use requests, that are not yet implemented (such as custom actions), you can create an executor for the missing request and append it to the WebApiClient.Requests object (if you want to reuse it). Be sure to create your missing request by calling Object.create on the base request object.
This might look something like this:

```JavaScript
WebApiClient.Requests.AddToQueueRequest = WebApiClient.Requests.Request.prototype.with({
    method: "POST",
    name: "AddToQueue",
    bound: true,
    entityName: "queue"
});

```
For further explanations regarding these requests, please check [here](#execute).
All requests should be implemented basically by now, in case of any errors in the implementations, you can override any property using the ```with``` function as described [here](#execute).

Alternatively, you can use the ```WebApiClient.SendRequest``` function.
In combination with ```WebApiClient.GetApiUrl``` and ```WebApiClient.GetSetName``` you can easily build up your request url, set your HTTP method and attach additional payload or headers.

An example of a custom implementation of the WinOpportunity request:
```Javascript
var url = WebApiClient.GetApiUrl() + "WinOpportunity";
var opportunityId = "00000000-0000-0000-0000-000000000001";
var payload = {
    "Status": 3,
    "OpportunityClose": {
        "subject": "Won Opportunity",
        "opportunityid@odata.bind": "/" + WebApiClient.GetSetName("opportunity") + "(" + opportunityId + ")"
    }
};

WebApiClient.SendRequest("POST", url, payload)
    .then(function(response){
        // Process response
    })
    .catch(function(error) {
        // Handle error
    });
```

### Promises
This client uses bluebird internally for handling promises in a cross-browser compliant way.
Therefore the promises returned by all asynchronous requests are also bluebird promises.
Bluebird itself is not exported globally anymore as of v3.0.0, but can be accessed by using ```WebApiClient.Promise```.
This decision was made for not causing issues with other scripts.

Using promises you can do something like this, too:
```Javascript
var requests = [];

for (var i = 0; i < 5; i++) {
    var request = {
        entityName: "account",
        entity: {name: "Adventure Works Nr. " + i}
    };
    requests.push(WebApiClient.Create(request));
}

WebApiClient.Promise.all(requests)
    .then(function(response){
        // Process response
    })
    .catch(function(error) {
        // Handle error
    });
```

## External Access
External access to CRM, that is accessing CRM without being on a CRM form or having a ClientGlobalContext.aspx is supported.
As OAuth is required for authenticating, only CRM online and CRM On-Premises with IFD and Azure AD are supported.

You'll have to register the WebApiClient as App in Azure AD, which is described in [MSDN](https://msdn.microsoft.com/en-us/library/mt595797.aspx).

### Single Page Application
There is support for using the client inside external single page applications.

There is a minimal working example in the [sample folder](https://github.com/DigitalFlow/Xrm-WebApi-Client/blob/master/src/sample/SinglePageApp.html).

## Headers
There is a defined set of default headers, which are sent on each request, as well as per-request headers.
Per-request headers override possibly existing default headers with the same key value.

### Header Format
Headers are represented as objects containing a key and a value property:

```JavaScript
var header = { key: "headerKey", value: "headerValue" };
```

### Default Headers
By default there is a defined set of default headers, that will be sent with each request.
The default headers can be retrieved using the WebApiClient.GetDefaultHeaders function.
You can however add own default headers by using the WebApiClient.AppendToDefaultHeaders function, which takes as much headers as dynamic arguments as you like.

Example:
```JavaScript
var header = {key: "newHeader", value: "newValue"};
WebApiClient.AppendToDefaultHeaders (header);
```

### Request Headers
You can also attach headers per request, all request parameters have a headers property, that can be used for passing per-request headers.

This could look something like this:
``` JavaScript
// Parameters for create request
var request = {
    entityName: "account",
    entity: {name: "Adventure Works"},
    headers: [ { key: "headerKey", value: "headerValue" }]
};
```

#### Page size
If you want to set a max page size for your request (supported are up to 5000 records per page), you can pass the following header:

``` JavaScript
headers: [ { key: "Prefer", value: "odata.maxpagesize=5000" }]
```

### API Version
The default API version is 8.0.
You can however change it to 8.1 if needed by using

```JavaScript
WebApiClient.ApiVersion = "8.1";
```

## Remarks
### CRM App
For using WebApiClient with the CRM App, you'll have to use the normal (= not uglified) version.
When using uglified JS in the CRM App, you might receive invalid character errors. This is not only valid for the WebApiClient, but also for some other uglified code.

## FAQ
### Payloads
When sending data for entity records, there often arise questions, on how to pass specific values.
Some attributes can be directly set, some need a special format for the Web API to recognize them.

Simple Attributes (Just use native values in payload):
- Single Line of Text
- Multiple Lines of Text
- Number
- Decimal
- Float
- Boolean
- OptionSet (Just use the option set value)
- DateTime

Complex Attributes:
- Lookups: When setting lookups, you use the attribute logical name, followed by "@odata.bind". As value, you need to pass a special format of the id, which is "/entityListName(id)".
So for setting the parent account of an account, the payload would look like this:

```JavaScript
var update = {
 "parentaccountid@odata.bind": "/accounts(4acc8857-fbb8-42d1-a5c5-24d83c9d1380)"
};
```
For getting the entity list name, you can use `WebApiClient.GetSetName`.

Special case: 
A special case are lookups, which target multiple entities, such as customer lookups or regarding object ids.
Those apply the same rules as plain lookups, but in addition to that, the entity logical name of the target related entity is appended to the field name, preceeded by an underscore.
For example to set the regardingobject of an appointment to our previous parent account, we would have to use the following payload:

```JavaScript
var update = {
 "regardingobjectid_account@odata.bind": "/accounts(4acc8857-fbb8-42d1-a5c5-24d83c9d1380)"
};
```

### Logical Names
Sometimes requests fail, due to the Web API not finding the attributes you included in your payload in the entity definition.
Most often this is because you got the name wrong.
For finding the proper names, you can head to Settings > Customizations > Developer Resources and click on the "Download OData Metadata" link. You will be provided with a XML file, which contains all entities that are exposed in the Web API, with their set names and all of their attributes.
