describe("WebApiClient", function() {
    // Use loaded lib for tests in browser, require for node
    if (typeof(require) !== "undefined") {
        WebApiClient = require('../js/WebApiClient.js');
        sinon = require('sinon');
   }

    var fakeUrl = "http://unit-test.local";
    var account;
    var contact;
    var xhr;
    var successMock = {
        result: "Success"
    };

    var errorJson = "{\r\n  \"error\":{\r\n    \"code\":\"\",\"message\":\"The function parameter 'EntityMoniker' cannot be found.\\r\\nParameter name: parameterName\",\"innererror\":{\r\n      \"message\":\"The function parameter 'EntityMoniker' cannot be found.\\r\\nParameter name: parameterName\",\"type\":\"System.ArgumentException\",\"stacktrace\":\"   at System.Web.OData.Routing.UnboundFunctionPathSegment.GetParameterValue(String parameterName)\\r\\n   at Microsoft.Crm.Extensibility.OData.CrmODataRouteDataProvider.FillUnboundFunctionData(UnboundFunctionPathSegment unboundFunctionPathSegment, HttpControllerContext controllerContext)\\r\\n   at Microsoft.Crm.Extensibility.OData.CrmODataRoutingConvention.SelectAction(ODataPath odataPath, HttpControllerContext controllerContext, ILookup`2 actionMap)\\r\\n   at System.Web.OData.Routing.ODataActionSelector.SelectAction(HttpControllerContext controllerContext)\\r\\n   at System.Web.Http.ApiController.ExecuteAsync(HttpControllerContext controllerContext, CancellationToken cancellationToken)\\r\\n   at System.Web.Http.Dispatcher.HttpControllerDispatcher.<SendAsync>d__1.MoveNext()\"\r\n    }\r\n  }\r\n}";

    Xrm = {};
    Xrm.Page = {};
    Xrm.Page.context = {};
    Xrm.Page.context.getClientUrl = function() {
        return fakeUrl;
    }

    RegExp.escape= function(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    };

    var defaults = {
        ApiVersion: WebApiClient.ApiVersion,
        ReturnAllPages: WebApiClient.ReturnAllPages,
        PrettifyErrors: WebApiClient.PrettifyErrors,
        Async: WebApiClient.Async
    };

    beforeEach(function() {
        account = {
            Name: "Adventure Works"
        };

        contact = {
            FirstName: "Joe"
        };

        WebApiClient.Configure(defaults);

        xhr = sinon.fakeServer.create();
        xhr.autoRespond = true;

        // Respond to Create Request for account with No-Content response and created entity url in header
        var createAccountUrl = new RegExp(RegExp.escape(fakeUrl + "/api/data/v8.0/accounts"));
        xhr.respondWith("POST", createAccountUrl,
            [204, { "Content-Type": "application/json", "OData-EntityId": "Fake-Account-Url" }, JSON.stringify(successMock)]
        );

        // Respond to create request with return=representation
        var createLeadUrlRepresentation = new RegExp(RegExp.escape(fakeUrl + "/api/data/v8.0/leads"));
        xhr.respondWith("POST", createLeadUrlRepresentation,
            [201, { "Content-Type": "application/json" }, JSON.stringify(account)]
        );

        // Respond to Retrieve by id Request for account
        var retrieveAccountByIdUrl = RegExp.escape(fakeUrl + "/api/data/v8.0/accounts(00000000-0000-0000-0000-000000000001)");
        xhr.respondWith("GET", new RegExp(retrieveAccountByIdUrl),
            [200, { "Content-Type": "application/json" }, JSON.stringify(account)]
        );

        // Respond to Retrieve by fetchXml Request for account
        var accountFetch = "%3Cfetch%20mapping%3D%27logical%27%3E%3Centity%20name%3D%27account%27%3E%3Cattribute%20name%3D%27accountid%27/%3E%3Cattribute%20name%3D%27name%27/%3E%3C/entity%3E%3C/fetch%3E";
        var retrieveAccountByFetchUrl = RegExp.escape(fakeUrl + "/api/data/v8.0/accounts?fetchXml=" + accountFetch);
        xhr.respondWith("GET", new RegExp(retrieveAccountByFetchUrl),
            [200, { "Content-Type": "application/json" }, JSON.stringify(account)]
        );

        // Respond to Retrieve by id Request for account
        var retrieveAccountUrl = RegExp.escape(fakeUrl + "/api/data/v8.0/accounts?$select=name,revenue,&$orderby=revenue asc,name desc&$filter=revenue ne null");
        xhr.respondWith("GET", new RegExp(retrieveAccountUrl),
            [200, { "Content-Type": "application/json" }, JSON.stringify([account])]
        );

        // Respond to Retrieve with only first page
        var retrieveAccountUrlFirstPage = RegExp.escape(fakeUrl + "/api/data/v8.0/accounts?$select=pagingtestfirst");
        xhr.respondWith("GET", new RegExp(retrieveAccountUrlFirstPage),
            [200, { "Content-Type": "application/json" }, JSON.stringify({
                value: [ { Name: "Adventure Works1" } ],
                "@odata.nextLink": fakeUrl + "/api/data/v8.0/accounts?$select=pagingtestsecond"
            })]
        );

        // Second page for retrieve
        var retrieveAccountUrlSecondPage = RegExp.escape(fakeUrl + "/api/data/v8.0/accounts?$select=pagingtestsecond");
        xhr.respondWith("GET", new RegExp(retrieveAccountUrlSecondPage),
            [200, { "Content-Type": "application/json" }, JSON.stringify({
                value: [ { Name: "Adventure Works2" } ]
            })]
        );

        // Respond with paging cookie in results
        var retrieveAccountUrlFirstPageCookie = RegExp.escape(fakeUrl + '/api/data/v8.0/accounts?fetchXml='
        + escape('<fetch count="11" version="1.0" output-format="xml-platform" mapping="logical" distinct="false">  <entity name="account">    <attribute name="name" />    <attribute name="primarycontactid" />    <attribute name="telephone1" />    <attribute name="accountid" />    <order attribute="name" descending="false" />  </entity></fetch>'));
        xhr.respondWith("GET", new RegExp(retrieveAccountUrlFirstPageCookie),
            [200, { "Content-Type": "application/json" }, JSON.stringify({
                value: [ { Name: "Adventure Works1" } ],
                "@Microsoft.Dynamics.CRM.fetchxmlpagingcookie": '<cookie pagenumber="2" pagingcookie="%253ccookie%2520page%253d%25221%2522%253e%253cname%2520last%253d%2522Test1%2522%2520first%253d%2522Adventure%2520GmbH%2520%2528Beispiel%2529%2522%2520%252f%253e%253caccountid%2520last%253d%2522%257bD91966C7-511D-E711-80FC-5065F38B0361%257d%2522%2520first%253d%2522%257bE3753E98-511D-E711-80FB-5065F38ABA91%257d%2522%2520%252f%253e%253c%252fcookie%253e" istracking="False" />'
            })]
        );

        // Respond to paged fetchXml request
        var retrieveAccountUrlSecondPageCookie = RegExp.escape(fakeUrl + '/api/data/v8.0/accounts?fetchXml='
        + escape('<fetch count="11" version="1.0" output-format="xml-platform" mapping="logical" distinct="false" page="2" paging-cookie="&lt;cookie page=&quot;1&quot;&gt;&lt;name last=&quot;Test1&quot; first=&quot;Adventure GmbH (Beispiel)&quot; /&gt;&lt;accountid last=&quot;{D91966C7-511D-E711-80FC-5065F38B0361}&quot; first=&quot;{E3753E98-511D-E711-80FB-5065F38ABA91}&quot; /&gt;&lt;/cookie&gt;">  <entity name="account">    <attribute name="name"/>    <attribute name="primarycontactid"/>    <attribute name="telephone1"/>    <attribute name="accountid"/>    <order attribute="name" descending="false"/>  </entity></fetch>'));
        xhr.respondWith("GET", new RegExp(retrieveAccountUrlSecondPageCookie),
            [200, { "Content-Type": "application/json" }, JSON.stringify({
                value: [ { Name: "Adventure Works2" } ]
            })]
        );

        // Respond to Retrieve Request for contact with alternate key
        var retrieveByAlternateKeyUrl = RegExp.escape(fakeUrl + "/api/data/v8.0/contacts(firstname='Joe',emailaddress1='abc@example.com')");
        xhr.respondWith("GET", new RegExp(retrieveByAlternateKeyUrl),
            [200, { "Content-Type": "application/json" }, JSON.stringify(contact)]
        );

        // Respond to update Request for contact with alternate key
        xhr.respondWith("PATCH", new RegExp(retrieveByAlternateKeyUrl),
            [204, { "Content-Type": "application/json" }, JSON.stringify(successMock)]
        );

        // Respond to delete Request for contact with alternate key
        xhr.respondWith("DELETE", new RegExp(retrieveByAlternateKeyUrl),
            [204, { "Content-Type": "application/json" }, JSON.stringify(successMock)]
        );

        // Respond to update Request for account
        var updateAccountUrl = RegExp.escape(fakeUrl + "/api/data/v8.0/accounts(00000000-0000-0000-0000-000000000001)");
        xhr.respondWith("PATCH", new RegExp(updateAccountUrl),
            [204, { "Content-Type": "application/json" }, JSON.stringify(successMock)]
        );

        // Respond to update request with return=representation
        var updateLeadUrlRepresentation = RegExp.escape(fakeUrl + "/api/data/v8.0/leads(00000000-0000-0000-0000-000000000001)");
        xhr.respondWith("PATCH", new RegExp(updateLeadUrlRepresentation),
            [201, { "Content-Type": "application/json" }, JSON.stringify(account)]
        );

        // Respond to Delete Request for account
        var deleteAccountUrl = RegExp.escape(fakeUrl + "/api/data/v8.0/accounts(00000000-0000-0000-0000-000000000001)");
        xhr.respondWith("DELETE", new RegExp(deleteAccountUrl),
            [204, { "Content-Type": "application/json" }, JSON.stringify(successMock)]
        );

        // Respond to Associate Request for account
        var associateAccountUrl = RegExp.escape(fakeUrl + "/api/data/v8.0/accounts(00000000-0000-0000-0000-000000000002)/opportunity_customer_accounts/$ref");
        xhr.respondWith("POST", new RegExp(associateAccountUrl),
            [204, { "Content-Type": "application/json" }, JSON.stringify(successMock)]
        );

        // Respond to Delete Request for account
        var disassociateAccountUrl = RegExp.escape(fakeUrl + "/api/data/v8.0/accounts(00000000-0000-0000-0000-000000000002)/opportunity_customer_accounts(00000000-0000-0000-0000-000000000001)/$ref");
        xhr.respondWith("DELETE", new RegExp(disassociateAccountUrl),
            [204, { "Content-Type": "application/json" }, JSON.stringify(successMock)]
        );

        // Respond to overridden set name requests
        var boundOverriddenSetUrl = fakeUrl + "/api/data/v8.0/contactleadscollection(00000000-0000-0000-0000-000000000003)";
        var unboundOverriddenSetUrl = fakeUrl + "/api/data/v8.0/contactleadscollection";

        xhr.respondWith("GET", boundOverriddenSetUrl,
            [200, { "Content-Type": "application/json" }, JSON.stringify(successMock)]
        );

        xhr.respondWith("POST", boundOverriddenSetUrl,
            [204, { "Content-Type": "application/json" }, JSON.stringify(successMock)]
        );

        xhr.respondWith("POST", unboundOverriddenSetUrl,
            [204, { "Content-Type": "application/json" }, JSON.stringify(successMock)]
        );

        xhr.respondWith("PATCH", boundOverriddenSetUrl,
            [204, { "Content-Type": "application/json" }, JSON.stringify(successMock)]
        );

        xhr.respondWith("DELETE", boundOverriddenSetUrl,
            [204, { "Content-Type": "application/json" }, JSON.stringify(successMock)]
        );

        // Respond to Associate Request for account
        var associateOverriddenUrl = RegExp.escape(fakeUrl + "/api/data/v8.0/contactleadscollection(00000000-0000-0000-0000-000000000003)/opportunity_customer_accounts/$ref");
        xhr.respondWith("POST", new RegExp(associateOverriddenUrl),
            [204, { "Content-Type": "application/json" }, JSON.stringify(successMock)]
        );

        // Respond to Delete Request for account
        var disassociateOverriddenUrl = RegExp.escape(fakeUrl + "/api/data/v8.0/contactleadscollection(00000000-0000-0000-0000-000000000003)/opportunity_customer_accounts(00000000-0000-0000-0000-000000000003)/$ref");
        xhr.respondWith("DELETE", new RegExp(disassociateOverriddenUrl),
            [204, { "Content-Type": "application/json" }, JSON.stringify(successMock)]
        );

        // Respond to expand urls
        var accountContactsUrl = RegExp.escape(fakeUrl + "/api/data/v8.0/account(someid)/contact_customer_accounts");
        xhr.respondWith("GET", new RegExp(accountContactsUrl),
            [200, { "Content-Type": "application/json" }, JSON.stringify([{contactid: "firstContactid"}, {contactid: "secondContactid"}])]
        );

        var accountTasksUrl = RegExp.escape(fakeUrl + "/api/data/v8.0/account(someid)/Account_Tasks");
        xhr.respondWith("GET", new RegExp(accountTasksUrl),
            [200, { "Content-Type": "application/json" }, JSON.stringify([{taskid: "firstTaskid"}, {taskid: "secondTaskid"}])]
        );

        // Respond with error
        var errorUrl = RegExp.escape(fakeUrl + "/api/data/v8.0/errors");
        xhr.respondWith("GET", new RegExp(errorUrl),
            [500, { "Content-Type": "application/json" }, errorJson]
        );

        var whoAmI = RegExp.escape(fakeUrl + "/api/data/v8.0/WhoAmI()");
        xhr.respondWith("GET", new RegExp(whoAmI),
            [200, { "Content-Type": "application/json" }, JSON.stringify({UserId: "1234"})]
        );

        var addToQueue = RegExp.escape(fakeUrl + "/api/data/v8.0/queues(56ae8258-4878-e511-80d4-00155d2a68d1)/Microsoft.Dynamics.CRM.AddToQueue()");
        xhr.respondWith("POST", new RegExp(addToQueue),
            [200, { "Content-Type": "application/json" }, JSON.stringify({ QueueItemId: "5aae8258-4878-e511-80d4-00155d2a68d1"})]
        );

        var retrieveLocLabels = RegExp.escape(fakeUrl + "/api/data/v8.0/RetrieveLocLabels(EntityMoniker=@p1,AttributeName=@p2,IncludeUnpublished=@p3)?@p1={'@odata.id':'savedqueries(31089fd8-596a-47be-9c9c-3ff82c7a8f8c)'}&@p2='name'&@p3=true");
        xhr.respondWith("GET", new RegExp(retrieveLocLabels),
            [200, { "Content-Type": "application/json" }, JSON.stringify({Labels: "Here be labels"})]
        );

        var setLocLabels = RegExp.escape(fakeUrl + "/api/data/v8.0/SetLocLabels()");
        xhr.respondWith("POST", new RegExp(setLocLabels),
            [204, { "Content-Type": "application/json" }, JSON.stringify(successMock)]
        );

        var publishXml = RegExp.escape(fakeUrl + "/api/data/v8.0/PublishXml()");
        xhr.respondWith("POST", new RegExp(publishXml),
            [204, { "Content-Type": "application/json" }, JSON.stringify(successMock)]
        );

        // fetchXml Batch
        var fetchXmlBatch = RegExp.escape(fakeUrl + "/api/data/v8.0/$batch");

        var batchResponse = '--batchresponse_a41f8ebb-a8c5-4723-9afa-27a673952fd9\n' +
                            'Content-Type: application/http\n' +
                            'Content-Transfer-Encoding: binary\n' +
                            '\n' +
                            'HTTP/1.1 200 OK\n' +
                            'Content-Type: application/json; odata.metadata=minimal\n' +
                            'OData-Version: 4.0\n' +
                            '\n' +
                            '{\n' +
                            '  "@odata.context":"https://org/api/data/v8.0/$metadata#accounts(name,accountid)","value":[\n' +
                            '    {\n' +
                            '      "@odata.etag":"W633807","name":"Adventure GmbH (Beispiel)","accountid":"e3753e98-511d-e711-80fb-5065f38aba91"\n' +
                            '    },{\n' +
                            '      "@odata.etag":"W633809","name":"Blue Airlines (Beispiel)","accountid":"e7753e98-511d-e711-80fb-5065f38aba91"\n' +
                            '    },{\n' +
                            '      "@odata.etag":"W633811","name":"Contoso Pharma (Beispiel)","accountid":"eb753e98-511d-e711-80fb-5065f38aba91"\n' +
                            '    },{\n' +
                            '      "@odata.etag":"W633814","name":"Ein-Datum-Unternehmen (Beispiel)","accountid":"ef753e98-511d-e711-80fb-5065f38aba91"\n' +
                            '    },{\n' +
                            '      "@odata.etag":"W633808","name":"Fabrikam KG (Beispiel)","accountid":"e5753e98-511d-e711-80fb-5065f38aba91"\n' +
                            '    },{\n' +
                            '      "@odata.etag":"W633815","name":"Hanno Starker (Beispiel)","accountid":"f1753e98-511d-e711-80fb-5065f38aba91"\n' +
                            '    },{\n' +
                            '      "@odata.etag":"W633805","name":"Kaffee Viersen (Beispiel)","accountid":"df753e98-511d-e711-80fb-5065f38aba91"\n' +
                            '    },{\n' +
                            '      "@odata.etag":"W633806","name":"Litware KG (Beispiel)","accountid":"e1753e98-511d-e711-80fb-5065f38aba91"\n' +
                            '    },{\n' +
                            '      "@odata.etag":"W633812","name":"Ski und Sport (Beispiel)","accountid":"ed753e98-511d-e711-80fb-5065f38aba91"\n' +
                            '    },{\n' +
                            '      "@odata.etag":"W633810","name":"Stadtwerke (Beispiel)","accountid":"e9753e98-511d-e711-80fb-5065f38aba91"\n' +
                            '    },{\n' +
                            '      "@odata.etag":"W633816","name":"Test1","accountid":"d91966c7-511d-e711-80fc-5065f38b0361"\n' +
                            '    },{\n' +
                            '      "@odata.etag":"W633817","name":"Test2","accountid":"95fb99d5-511d-e711-80fc-5065f38b0361"\n' +
                            '    }\n' +
                            '  ]\n' +
                            '}\n' +
                            '--batchresponse_a41f8ebb-a8c5-4723-9afa-27a673952fd9--\n';

        xhr.respondWith("POST", new RegExp(fetchXmlBatch),
            [200, { "Content-Type": "multipart/mixed; boundary=batchresponse_a41f8ebb-a8c5-4723-9afa-27a673952fd9" }, batchResponse]
        );
    });

    afterEach(function() {
       xhr.restore();
    });

    describe("Operations", function() {
        it("should know the create operation", function() {
            expect(WebApiClient.Create).toBeDefined();
        });

        it("should know the retrieve operation", function() {
            expect(WebApiClient.Retrieve).toBeDefined();
        });

        it("should know the update operation", function() {
            expect(WebApiClient.Update).toBeDefined();
        });

        it("should know the delete operation", function() {
            expect(WebApiClient.Delete).toBeDefined();
        });

        it("should know the associate operation", function() {
            expect(WebApiClient.Associate).toBeDefined();
        });

        it("should know the disassociate operation", function() {
            expect(WebApiClient.Disassociate).toBeDefined();
        });
    });

    describe("SetNames", function() {
        it("should append s if no special ending", function() {
            var accountSet = WebApiClient.GetSetName("account");
            expect(accountSet).toEqual("accounts");
        });

        it("should append ies if ends in y", function() {
            var citySet = WebApiClient.GetSetName("city");
            expect(citySet).toEqual("cities");
        });

        it("should append es if ends in s", function() {
            // I know that this is grammatically incorrect, WebApi does this however
            var settingsSet = WebApiClient.GetSetName("settings");
            expect(settingsSet).toEqual("settingses");
        });

        it("should allow to override set names for all requests", function(done) {
            var requests = [];

            var createRequest = {
                overriddenSetName: "contactleadscollection",
                entity: {name: "Contoso"}
            };
            requests.push(WebApiClient.Create(createRequest));

            var retrieveRequest = {
                overriddenSetName: "contactleadscollection",
                entityId: "00000000-0000-0000-0000-000000000003"
            };
            requests.push(WebApiClient.Retrieve(retrieveRequest));

            var updateRequest = {
                overriddenSetName: "contactleadscollection",
                entityId: "00000000-0000-0000-0000-000000000003",
                entity: {name: "Contoso"}
            };
            requests.push(WebApiClient.Update(updateRequest));

            var deleteRequest = {
                overriddenSetName: "contactleadscollection",
                entityId: "00000000-0000-0000-0000-000000000003"
            };
            requests.push(WebApiClient.Delete(deleteRequest));

            var associateRequest = {
                relationShip: "opportunity_customer_accounts",
                source:
                    {
                        overriddenSetName: "contactleadscollection",
                        entityId: "00000000-0000-0000-0000-000000000003"
                    },
                target:
                    {
                        overriddenSetName: "contactleadscollection",
                        entityId: "00000000-0000-0000-0000-000000000003"
                    }
            };
            requests.push(WebApiClient.Associate(associateRequest));

            var disassociateRequest = {
                relationShip: "opportunity_customer_accounts",
                source:
                    {
                        overriddenSetName: "contactleadscollection",
                        entityId: "00000000-0000-0000-0000-000000000003"
                    },
                target:
                    {
                        overriddenSetName: "contactleadscollection",
                        entityId: "00000000-0000-0000-0000-000000000003"
                    }
            };
            requests.push(WebApiClient.Disassociate(disassociateRequest));

            WebApiClient.Promise.all(requests)
            .then(function (results){
                expect(results).toBeDefined();
            })
            .catch(function (error) {
                expect(error).toBeUndefined();
            })
            .finally(done);

            xhr.respond();
        });
    });

    describe("Create", function() {
        it("should fail if no entity name passed", function(){
            expect(function() {
                WebApiClient.Create({entity: account});
            }).toThrow();
        });

        it("should fail if no update entity passed", function(){
            expect(function() {
                WebApiClient.Create({entityName: "account"});
            }).toThrow();
        });

        it("should create record and return record URL", function(done){
            WebApiClient.Create({entityName: "account", entity: account})
                .then(function(response){
                    expect(response).toEqual("Fake-Account-Url");
                })
                .catch(function(error) {
                    expect(error).toBeUndefined();
                })
                // Wait for promise
                .finally(done);

            xhr.respond();
        });

        it("should create record and parse returned record if http 201", function(done){
            WebApiClient.Create({entityName: "lead", entity: account, headers: [{key: "Prefer", value: "return=representation"}]})
                .then(function(response){
                    expect(response).toEqual(account);
                })
                .catch(function(error) {
                    expect(error).toBeUndefined();
                })
                // Wait for promise
                .finally(done);

            xhr.respond();
        });
    });

    describe("Retrieve", function() {
        it("should fail if no entity name passed", function(){
            expect(function() {
                WebApiClient.Retrieve({});
            }).toThrow();
        });

        it("should retrieve by id", function(done){
            WebApiClient.Retrieve({entityName: "account", entityId: "00000000-0000-0000-0000-000000000001"})
                .then(function(response){
                    expect(response).toEqual(account);
                })
                .catch(function(error) {
                    expect(error).toBeUndefined();
                })
                // Wait for promise
                .finally(done);

            xhr.respond();
        });

        it("should retrieve multiple with query params", function(done){
            var request = {
                entityName: "account",
                queryParams: "?$select=name,revenue,&$orderby=revenue asc,name desc&$filter=revenue ne null"
            };

            WebApiClient.Retrieve(request)
                .then(function(response){
                    expect(response).toEqual([account]);
                })
                .catch(function(error) {
                    expect(error).toBeUndefined();
                })
                // Wait for promise
                .finally(done);

            xhr.respond();
        });

        it("should per default only retrieve first page", function(done){
            var request = {
                entityName: "account",
                queryParams: "?$select=pagingtestfirst"
            };

            WebApiClient.Retrieve(request)
                .then(function(response){
                    expect(response.value.length).toEqual(1);
                })
                .catch(function(error) {
                    expect(error).toBeUndefined();
                })
                // Wait for promise
                .finally(done);

            xhr.respond();
        });

        it("should retrieve all pages if wanted", function(done){
            WebApiClient.ReturnAllPages = true;

            var request = {
                entityName: "account",
                queryParams: "?$select=pagingtestfirst"
            };

            WebApiClient.Retrieve(request)
                .then(function(response){
                    expect(response.value.length).toEqual(2);
                })
                .catch(function(error) {
                    expect(error).toBeUndefined();
                })
                // Wait for promise
                .finally(done);

            xhr.respond();
        });

        it("should retrieve all pages with fetchXml cookies async", function(done){
            var request = {
                entityName: "account",
                fetchXml: '<fetch count="11" version="1.0" output-format="xml-platform" mapping="logical" distinct="false">  <entity name="account">    <attribute name="name" />    <attribute name="primarycontactid" />    <attribute name="telephone1" />    <attribute name="accountid" />    <order attribute="name" descending="false" />  </entity></fetch>',
                returnAllPages: true
            };

            WebApiClient.Retrieve(request)
                .then(function(response){
                    expect(response.value.length).toEqual(2);
                })
                .catch(function(error) {
                    expect(error).toBeUndefined();
                })
                // Wait for promise
                .finally(done);

            xhr.respond();
        });

        it("should retrieve by alternative key", function(done){
            WebApiClient.Retrieve(
            {
                entityName: "contact",
                alternateKey:
                    [
                        { property: "firstname", value: "Joe" },
                        { property: "emailaddress1", value: "abc@example.com"}
                    ]
            })
            .then(function(response){
                expect(response).toEqual(contact);
            })
            .catch(function(error) {
                expect(error).toBeUndefined();
            })
            // Wait for promise
            .finally(done);

            xhr.respond();
        });

        it("should retrieve by fetch", function(done){
        	var fetchXml = "<fetch mapping='logical'>" +
        						"<entity name='account'>" +
      								"<attribute name='accountid'/>" +
      								"<attribute name='name'/>" +
								"</entity>" +
						   "</fetch>";

            WebApiClient.Retrieve({entityName: "account", fetchXml: fetchXml})
                .then(function(response){
                    expect(response).toEqual(account);
                })
                .catch(function(error) {
                    expect(error).toBeUndefined();
                })
                // Wait for promise
                .finally(done);

            xhr.respond();
        });

        it("should send batch for long fetchXml", function(done){
        	var fetchXml = "<fetch version=\"1.0\" output-format=\"xml-platform\" mapping=\"logical\" distinct=\"false\"><entity name=\"account\"><attribute name=\"name\" /><order attribute=\"name\" descending=\"false\" /><filter type=\"and\"><condition attribute=\"name\" operator=\"like\" value=\"%\"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         /></filter></entity></fetch>";
            WebApiClient.Retrieve({entityName: "account", fetchXml: fetchXml})
                .then(function(response){
                    expect(response.value.length).toBe(12);
                })
                .catch(function(error) {
                    expect(error).toBeUndefined();
                })
                // Wait for promise
                .finally(done);

            xhr.respond();
        });
    });

    describe("Update", function() {
        it("should fail if no entity Id passed", function(){
            expect(function() {
                WebApiClient.Update({entityName: "account", entity: account});
            }).toThrow();
        });

        it("should fail if no entity name passed", function(){
            expect(function() {
                WebApiClient.Update({entityId: "00000000-0000-0000-0000-000000000001", entity: account});
            }).toThrow();
        });

        it("should fail if no update entity passed", function(){
            expect(function() {
                WebApiClient.Update({entityName: "account", entityId: "00000000-0000-0000-0000-000000000001"});
            }).toThrow();
        });

        it("should update record and return", function(done){
            WebApiClient.Update({entityName: "account", entityId: "00000000-0000-0000-0000-000000000001",  entity: account})
                .then(function(response){
                    expect(response).toBeDefined();
                })
                .catch(function(error) {
                    expect(error).toBeUndefined();
                })
                // Wait for promise
                .finally(done);

            xhr.respond();
        });

        it("should update record by alternate key and return", function(done){
            WebApiClient.Update({
                entityName: "contact",
                alternateKey: [
                    { property: "firstname", value: "Joe" },
                    { property: "emailaddress1", value: "abc@example.com"}
                ],
                entity: account
            })
            .then(function(response){
                expect(response).toBeDefined();
            })
            .catch(function(error) {
                expect(error).toBeUndefined();
            })
            // Wait for promise
            .finally(done);

            xhr.respond();
        });

        it("should update record and return record representation if http 201", function(done){
            WebApiClient.Update({entityName: "lead", entityId: "00000000-0000-0000-0000-000000000001",  entity: account, headers: [{key: "Prefer", value: "return=representation"}]})
                .then(function(response){
                    expect(response).toEqual(account);
                })
                .catch(function(error) {
                    expect(error).toBeUndefined();
                })
                // Wait for promise
                .finally(done);

            xhr.respond();
        });
    });

    describe("Delete", function() {
        it("should fail if no entity Id passed", function(){
            expect(function() {
                WebApiClient.Delete({entityName: "account"});
            }).toThrow();
        });

        it("should fail if no entity name passed", function(){
            expect(function() {
                WebApiClient.Delete({entityId: "00000000-0000-0000-0000-000000000001"});
            }).toThrow();
        });

        it("should delete record and return", function(done){
            WebApiClient.Delete({entityName: "account", entityId: "00000000-0000-0000-0000-000000000001"})
                .then(function(response){
                    expect(response).toBeDefined();
                })
                .catch(function(error) {
                    expect(error).toBeUndefined();
                })
                // Wait for promise
                .finally(done);

            xhr.respond();
        });

        it("should delete record by alternate key and return", function(done){
            WebApiClient.Delete({
                entityName: "contact",
                alternateKey: [
                    { property: "firstname", value: "Joe" },
                    { property: "emailaddress1", value: "abc@example.com"}
                ]
            })
            .then(function(response){
                expect(response).toBeDefined();
            })
            .catch(function(error) {
                expect(error).toBeUndefined();
            })
            // Wait for promise
            .finally(done);

            xhr.respond();
        });
    });

    describe("Execute", function() {
        it("should fail if no valid request is passed", function(){
            expect(function() {
                WebApiClient.Execute({});
            }).toThrow();
        });

        it("should allow overwriting of all attributes", function(){
            expect(function() {
                var request = WebApiClient.Requests.WhoAmIRequest
                    .with({
                        method: "method",
                        name: "name"
                    });

                expect(request.method).toBe("method");
                expect(request.name).toBe("name");
            }).toThrow();
        });

        it("should use full name for bound requests", function(){
            var bound = Object.create(WebApiClient.Requests.Request.prototype, {
                method: {
                    value: "POST"
                },
                name: {
                    value: "BoundRequest"
                },
                bound: {
                    value: true
                },
                entityName: {
                    value: "queue"
                }
            });

            var boundRequest = bound.with({
                entityId: "56ae8258-4878-e511-80d4-00155d2a68d1"
            });

            expect(boundRequest.buildUrl()).toBe(fakeUrl + "/api/data/v8.0/queues(56ae8258-4878-e511-80d4-00155d2a68d1)/Microsoft.Dynamics.CRM.BoundRequest()");
        });

        it("should not use full name for unbound requests", function(){
            var unbound = Object.create(WebApiClient.Requests.Request.prototype, {
                method: {
                    value: "POST"
                },
                name: {
                    value: "UnboundRequest"
                },
                bound: {
                    value: false
                }
            });

            expect(unbound.buildUrl()).toBe(fakeUrl + "/api/data/v8.0/UnboundRequest()");
        });

        it("should execute AddToQueueRequest", function(done){
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
                    expect(response).toBeDefined();
                    expect(response.QueueItemId).toBe("5aae8258-4878-e511-80d4-00155d2a68d1");
                })
                .catch(function(error) {
                    expect(error).toBeUndefined();
                })
                // Wait for promise
                .finally(done);

            xhr.respond();
        });

        it("should execute PublishXmlRequest", function(done){
            var viewId = "31089fd8-596a-47be-9c9c-3ff82c7a8f8c";
            var request = WebApiClient.Requests.PublishXmlRequest
                .with({
                    payload: {
                        ParameterXml: "SomeXML"
                    }
                });

            WebApiClient.Execute(request)
                .then(function(response){
                    expect(response).toBeDefined();
                })
                .catch(function(error) {
                    expect(error).toBeUndefined();
                })
                // Wait for promise
                .finally(done);

            xhr.respond();
        });

        it("should execute RetrieveLocLabelsRequest", function(done){
            var viewId = "31089fd8-596a-47be-9c9c-3ff82c7a8f8c";
            var request = WebApiClient.Requests.RetrieveLocLabelsRequest
                .with({
                    urlParams: {
                        EntityMoniker: "{'@odata.id':'savedqueries(" + viewId + ")'}",
                        AttributeName: "'name'",
                        IncludeUnpublished: true
                    }
                });

            WebApiClient.Execute(request)
                .then(function(response){
                    expect(response).toBeDefined();
                    expect(response.Labels).toBe("Here be labels");
                })
                .catch(function(error) {
                    expect(error).toBeUndefined();
                })
                // Wait for promise
                .finally(done);

            xhr.respond();
        });

        it("should execute SetLocLabelsRequest", function(done){
            var viewId = "31089fd8-596a-47be-9c9c-3ff82c7a8f8c";
            var request = WebApiClient.Requests.SetLocLabelsRequest
                .with({
                    payload: {
                        Labels: [],
                        EntityMoniker: {
                            "@odata.type": "Microsoft.Dynamics.CRM.savedquery",
                            savedqueryid: viewId
                        },
                        AttributeName: "name"
                    }
                });

            WebApiClient.Execute(request)
                .then(function(response){
                    expect(response).toBeDefined();
                })
                .catch(function(error) {
                    expect(error).toBeUndefined();
                })
                // Wait for promise
                .finally(done);

            xhr.respond();
        });

        it("should execute WhoAmIRequest", function(done){
            var request = WebApiClient.Requests.WhoAmIRequest;

            WebApiClient.Execute(request)
                .then(function(response){
                    expect(response).toBeDefined();
                    expect(response.UserId).toBe("1234");
                })
                .catch(function(error) {
                    expect(error).toBeUndefined();
                })
                // Wait for promise
                .finally(done);

            xhr.respond();
        });
    });

    describe("Associate", function() {
        it("should fail if no target passed", function(){
            expect(function() {
                WebApiClient.Associate(
                {
                    relationShip: "opportunity_customer_accounts",
                    source:
                        {
                            entityName: "opportunity",
                            entityId: "00000000-0000-0000-0000-000000000001"
                        }
                });
            }).toThrow();
        });

        it("should fail if no source passed", function(){
            expect(function() {
                WebApiClient.Associate(
                {
                    relationShip: "opportunity_customer_accounts",
                    target:
                        {
                            entityName: "account",
                            entityId: "00000000-0000-0000-0000-000000000002"
                        }
                });
            }).toThrow();
        });

        it("should fail if no relationShip passed", function(){
            expect(function() {
                WebApiClient.Associate(
                {
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
                });
            }).toThrow();
        });

        it("should associate record and return", function(done){
            WebApiClient.Associate(
                {
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
                })
                .then(function(response){
                    expect(response).toBeDefined();
                })
                .catch(function(error) {
                    expect(error).toBeUndefined();
                })
                // Wait for promise
                .finally(done);

            xhr.respond();
        });
    });

    describe("Disassociate", function() {
        it("should fail if no target passed", function(){
            expect(function() {
                WebApiClient.Disassociate(
                {
                    relationShip: "opportunity_customer_accounts",
                    source:
                        {
                            entityName: "opportunity",
                            entityId: "00000000-0000-0000-0000-000000000001"
                        }
                });
            }).toThrow();
        });

        it("should fail if no source passed", function(){
            expect(function() {
                WebApiClient.Disassociate(
                {
                    relationShip: "opportunity_customer_accounts",
                    target:
                        {
                            entityName: "account",
                            entityId: "00000000-0000-0000-0000-000000000002"
                        }
                });
            }).toThrow();
        });

        it("should fail if no relationShip passed", function(){
            expect(function() {
                WebApiClient.Disassociate(
                {
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
                });
            }).toThrow();
        });

        it("should disassociate record and return", function(done){
            WebApiClient.Disassociate(
                {
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
                })
                .then(function(response){
                    expect(response).toBeDefined();
                })
                .catch(function(error) {
                    expect(error).toBeUndefined();
                })
                // Wait for promise
                .finally(done);

            xhr.respond();
        });
    });

    describe("Expand", function() {
        it("should expand all deferred properties for single record", function(done){
            var account = {
                accountid: "someid",
                "contact_customer_accounts@odata.nextLink": fakeUrl + "/api/data/v8.0/account(someid)/contact_customer_accounts",
                "Account_Tasks@odata.nextLink": fakeUrl + "/api/data/v8.0/account(someid)/Account_Tasks",
                name: "Adventure Works"
            };

            WebApiClient.Expand({records: [account]})
                .then(function(response){
                    expect(response[0].accountid).toEqual(account.accountid);
                    expect(response[0].name).toEqual(account.name);
                    expect(response[0].contact_customer_accounts).toEqual([{contactid: "firstContactid"}, {contactid: "secondContactid"}]);
                    expect(response[0].Account_Tasks).toEqual([{taskid: "firstTaskid"}, {taskid: "secondTaskid"}]);
                    expect(response[0]["contact_customer_accounts@odata.nextLink"]).toBeUndefined();
                    expect(response[0]["Account_Tasks@odata.nextLink"]).toBeUndefined();
                })
                .catch(function(error) {
                    expect(error).toBeUndefined();
                })
                // Wait for promise
                .finally(done);

            xhr.respond();
        });

        it("should expand all deferred properties for records array", function(done){
            var account = {
                accountid: "someid",
                "contact_customer_accounts@odata.nextLink": fakeUrl + "/api/data/v8.0/account(someid)/contact_customer_accounts",
                "Account_Tasks@odata.nextLink": fakeUrl + "/api/data/v8.0/account(someid)/Account_Tasks",
                name: "Adventure Works"
            };

            var account2 = {
                accountid: "someid",
                "contact_customer_accounts@odata.nextLink": fakeUrl + "/api/data/v8.0/account(someid)/contact_customer_accounts",
                "Account_Tasks@odata.nextLink": fakeUrl + "/api/data/v8.0/account(someid)/Account_Tasks",
                name: "Contoso"
            };

            WebApiClient.Expand({records: [account, account2]})
                .then(function(response){
                    expect(response.length).toBe(2);

                    expect(response[0].accountid).toEqual(account.accountid);
                    expect(response[0].name).toEqual(account.name);
                    expect(response[0].contact_customer_accounts).toEqual([{contactid: "firstContactid"}, {contactid: "secondContactid"}]);
                    expect(response[0].Account_Tasks).toEqual([{taskid: "firstTaskid"}, {taskid: "secondTaskid"}]);
                    expect(response[0]["contact_customer_accounts@odata.nextLink"]).toBeUndefined();
                    expect(response[0]["Account_Tasks@odata.nextLink"]).toBeUndefined();

                    expect(response[1].accountid).toEqual(account2.accountid);
                    expect(response[1].name).toEqual(account2.name);
                    expect(response[1].contact_customer_accounts).toEqual([{contactid: "firstContactid"}, {contactid: "secondContactid"}]);
                    expect(response[1].Account_Tasks).toEqual([{taskid: "firstTaskid"}, {taskid: "secondTaskid"}]);
                    expect(response[1]["contact_customer_accounts@odata.nextLink"]).toBeUndefined();
                    expect(response[1]["Account_Tasks@odata.nextLink"]).toBeUndefined();
                })
                .catch(function(error) {
                    expect(error).toBeUndefined();
                })
                // Wait for promise
                .finally(done);

            xhr.respond();
        });

        it("should not expand paging links", function(done){
            var account = {
                accountid: "someid",
                "@odata.nextLink": fakeUrl + "/api/data/v8.0/account(someid)",
                name: "Adventure Works"
            };

            spyOn(XMLHttpRequest.prototype, 'send').and.callThrough();

            WebApiClient.Expand({records: [account]})
                .then(function (result) {
                    expect(XMLHttpRequest.prototype.send.calls.count()).toBe(0);
                })
                .catch(function(error) {
                    expect(error).toBeUndefined();
                })
                // Wait for promise
                .finally(done);

            xhr.respond();
        });

    });

    describe("Synchronous requests", function() {
        // We only test retrieve. If this works, all other requests should also work like the async ones
        it("should retrieve by id with global sync flag", function(){
            WebApiClient.Async = false;
            var response = WebApiClient.Retrieve({entityName: "account", entityId: "00000000-0000-0000-0000-000000000001"});
            expect(response).toEqual(account);
        });

        // We only test retrieve. If this works, all other requests should also work like the async ones
        it("should retrieve by id with per request sync flag", function(){
            var response = WebApiClient.Retrieve({entityName: "account", entityId: "00000000-0000-0000-0000-000000000001", async: false});
            expect(response).toEqual(account);
        });

        it("should retrieve multiple with query params", function(){
            var request = {
                entityName: "account",
                queryParams: "?$select=name,revenue,&$orderby=revenue asc,name desc&$filter=revenue ne null",
                async: false
            };

            var response = WebApiClient.Retrieve(request);
            expect(response).toEqual([account]);
        });

        it("should per default only retrieve first page", function(){
            var request = {
                entityName: "account",
                queryParams: "?$select=pagingtestfirst",
                async: false
            };

            var response = WebApiClient.Retrieve(request);
            expect(response.value.length).toEqual(1);
        });

        it("should retrieve all pages if wanted", function(){
            var request = {
                entityName: "account",
                queryParams: "?$select=pagingtestfirst",
                async: false,
                returnAllPages: true
            };

            var response = WebApiClient.Retrieve(request);
            expect(response.value.length).toEqual(2);
        });

        it("should retrieve all pages with fetchXml cookies sync", function(){
            var request = {
                entityName: "account",
                fetchXml: '<fetch count="11" version="1.0" output-format="xml-platform" mapping="logical" distinct="false">  <entity name="account">    <attribute name="name" />    <attribute name="primarycontactid" />    <attribute name="telephone1" />    <attribute name="accountid" />    <order attribute="name" descending="false" />  </entity></fetch>',
                returnAllPages: true,
                async: false
            };

            var response = WebApiClient.Retrieve(request);
            expect(response.value.length).toEqual(2);
        });

        it("should send batch for long fetchXml sync", function(){
          var fetchXml = "<fetch version=\"1.0\" output-format=\"xml-platform\" mapping=\"logical\" distinct=\"false\"><entity name=\"account\"><attribute name=\"name\" /><order attribute=\"name\" descending=\"false\" /><filter type=\"and\"><condition attribute=\"name\" operator=\"like\" value=\"%\"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         /></filter></entity></fetch>";
          var response = WebApiClient.Retrieve({entityName: "account", fetchXml: fetchXml, async: false});
          expect(response.value.length).toBe(12);
        });

        it("should expand all deferred properties for single record", function(){
            var account = {
                accountid: "someid",
                "contact_customer_accounts@odata.nextLink": fakeUrl + "/api/data/v8.0/account(someid)/contact_customer_accounts",
                "Account_Tasks@odata.nextLink": fakeUrl + "/api/data/v8.0/account(someid)/Account_Tasks",
                name: "Adventure Works"
            };

            var response = WebApiClient.Expand({records: [account], async: false});
            expect(response[0].accountid).toEqual(account.accountid);
            expect(response[0].name).toEqual(account.name);
            expect(response[0].contact_customer_accounts).toEqual([{contactid: "firstContactid"}, {contactid: "secondContactid"}]);
            expect(response[0].Account_Tasks).toEqual([{taskid: "firstTaskid"}, {taskid: "secondTaskid"}]);
            expect(response[0]["contact_customer_accounts@odata.nextLink"]).toBeUndefined();
            expect(response[0]["Account_Tasks@odata.nextLink"]).toBeUndefined();
        });

        it("should create record and return record representation if http 201", function(){
            var response = WebApiClient.Create({entityName: "lead", entity: account, headers: [{key: "Prefer", value: "return=representation"}], async: false});
            expect(response).toEqual(account);
        });

        it("should update record and return record representation if http 201", function(){
            var response = WebApiClient.Update({entityName: "lead", entityId: "00000000-0000-0000-0000-000000000001",  entity: account, headers: [{key: "Prefer", value: "return=representation"}], async: false});
            expect(response).toEqual(account);
        });
    });

    describe("Send Request", function() {
        it("should handle legacy headers array as fourth parameter", function(done){
            spyOn(XMLHttpRequest.prototype, 'setRequestHeader').and.callThrough();

            WebApiClient.SendRequest("POST", WebApiClient.GetApiUrl() + "accounts", {}, [{key: "MSCRM.MergeLabels", value: "true"}])
            .then(function (result) {
                expect(XMLHttpRequest.prototype.setRequestHeader).toHaveBeenCalledWith("MSCRM.MergeLabels", "true");
            })
            .catch(function(error) {
                expect(error).toBeUndefined();
            })
            .finally(done);
        });

        it("should not fail if parameters are ommitted", function(done){
            WebApiClient.SendRequest("POST", WebApiClient.GetApiUrl() + "accounts")
            .then(function (result) {
                expect(result).toBeDefined();
            })
            .catch(function(error) {
                expect(error).toBeUndefined();
            })
            .finally(done);
        });
    });

    describe("Errors", function() {
        it("should be prettified by default", function(done){
            WebApiClient.PrettifyErrors = true;

            WebApiClient.Retrieve({entityName: "error"})
                .then(function(response){
                    expect(response).toBeUndefined();
                })
                .catch(function(error) {
                    expect(error).replace("\r", "").replace("\n", "")
                        .toBe("Internal Server Error: The function parameter 'EntityMoniker' cannot be found.Parameter name: parameterName");
                })
                // Wait for promise
                .finally(done);

            xhr.respond();
        });

        it("should return the response json as error when prettifying is deactivated", function(done){
            WebApiClient.PrettifyErrors = false;

            WebApiClient.Retrieve({entityName: "error"})
                .then(function(response){
                    expect(response).toBeUndefined();
                })
                .catch(function(error) {
                    var json = JSON.parse(errorJson);
                    json.xhrStatusText = "Internal Server Error";

                    var expectedError = JSON.stringify(json);

                    expect(error.replace("\r\n", "")).toBe(expectedError.replace("\r\n", ""));
                })
                // Wait for promise
                .finally(done);

            xhr.respond();
        });
    });

    describe("Configure", function() {
        it("should apply values", function(){
            WebApiClient.Configure({
                ApiVersion: "8.2",
                ReturnAllPages: true,
                PrettifyErrors: false
            });

            expect(WebApiClient.ApiVersion).toBe("8.2");
            expect(WebApiClient.ReturnAllPages).toBe(true);
            expect(WebApiClient.PrettifyErrors).toBe(false);
        });
    });

    describe("Headers", function() {
        it("should set default headers", function(){
            expect(WebApiClient.GetDefaultHeaders()).toBeDefined();
        });

        it("should allow to add own default headers", function(){
            var testHeader = {key: "newHeader", value: "newValue"};
            WebApiClient.AppendToDefaultHeaders (testHeader);

            var defaultHeaders = WebApiClient.GetDefaultHeaders();

            expect(defaultHeaders[defaultHeaders.length - 1]).toEqual(testHeader);
        });
    });

    describe("API Version", function() {
        it("should default to 8.0", function() {
            expect(WebApiClient.ApiVersion).toEqual("8.0");
        });

        it("should be editable", function() {
            WebApiClient.ApiVersion = "8.1";

            expect(WebApiClient.ApiVersion).toEqual("8.1");
        });
    });
});
