# Dynamics CRM JavaScript Web API Client

## Purpose
This is a framework for easing working with the Dynamics CRM WebApi using JavaScript.
It uses the awesome [BlueBird](https://github.com/petkaantonov/bluebird) framework for handling requests asynchronously based on promises.
The framework is supposed to be executed on CRM forms or on CRM web ressources, where the CRM context is available.
For running from custom web resources, be sure that the GetGlobalContext function is available, as the client will try to retrieve the context on its own.

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
The client supports retrieving of records by Id or also retrieve multiple.
You have to pass at least the entity logical name.
You can always pass query parameters which will be appended to your retrieve requests.

Retrieve:

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

Retrieve Multiple:

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
