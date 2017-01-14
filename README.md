# Dynamics CRM JavaScript Web API Client

## Purpose
This is a framework for easing working with the Dynamics CRM WebApi using JavaScript.
It uses the awesome [BlueBird](https://github.com/petkaantonov/bluebird) framework for handling requests asynchronously based on promises.
The framework is supposed to be executed on CRM forms or on CRM web ressources, where the CRM context is available.
For running from custom web resources, be sure that the GetGlobalContext function is available, as the client will try to retrieve the context on its own.

## How to obtain it
You can always download the browserified version of this framework by downloading the release.zip file from the latest release.

## Build Status
[![Build Status](https://travis-ci.org/DigitalFlow/Xrm-WebApi-Client.svg?branch=master)](https://travis-ci.org/DigitalFlow/Xrm-WebApi-Client)

## Operations

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

### Retrieve
The client supports retrieving of records by Id, by alternate key, fetchXml and query expressions.
For retrieving by alternate key, pass an array of objects that each have a property and a value property.
You have to pass at least the entity logical name.
You can always pass query parameters which will be appended to your retrieve requests.

#### Retrieve single records
##### Retrieve by ID:

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

##### Retrieve by alternate key:

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
Retrieve of multiple records uses paging. Per default you can set a [page size on your requests] (#page-size), however this is limited to 5000 records.
If you want to really retrieve all records, set WebApiClient.ReturnAllPages to true, as it is by default false.
By setting this to true, each retrieve multiple request will check for an @odata.nextLink property inside the response, call the next page and concatenate the results, until all records have been retrieved.

Retrieve by query expression:

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

Retrieve by FetchXml:

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
If you need to use requests, that are not yet implemented, you can use the ```WebApiClient.SendRequest``` function.
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
This client uses bluebird for handling promises in a cross-browser compliant way.
For this reason bluebird is exported as global implementation of promises (and also overrides browser native Promises).
The decision to override native Promises was made to give you a constant usage experience across all browsers.

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

Promise.all(requests)
    .then(function(response){
        // Process response
    })
    .catch(function(error) {
        // Handle error
    });
```

## Headers

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
Note: Currently your request headers are simply added after the default headers. Watch out for interferences.

#### Page size
If you want to set a max page size for your request (supported are up to 5000 records per rage), you can pass the following header:

``` JavaScript
headers: [ { key: "Prefer", value: "odata.maxpagesize=5000" }]
```

### API Version
The default API version is 8.0.
You can however change it to 8.1 if needed by using 

```JavaScript
WebApiClient.ApiVersion = "8.1";
```
