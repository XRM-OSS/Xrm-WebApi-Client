describe("WebApiClient", function() {
    var fakeUrl = "http://unit-test.local";
    var account;
    var xhr;
    
    Xrm = {};
    Xrm.Page = {};
    Xrm.Page.context = {};
    Xrm.Page.context.getClientUrl = function() {
        return fakeUrl;
    }
    
    RegExp.escape= function(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}   ;
    
    beforeEach(function() {
        account = { 
            Name: "Adventure Works"
        };

        xhr = sinon.fakeServer.create();
        
        // Respond to Create Request for account with No-Content response and created entity url in header
        var createAccountUrl = new RegExp(RegExp.escape(fakeUrl + "/api/data/v8\.0/accounts", "g"));
        xhr.respondWith("POST", createAccountUrl,
            [204, { "Content-Type": "application/json", "OData-EntityId": "Fake-Account-Url" }, "{}"]
        );
        
        // Respond to Delete Request for account 
        var retrieveAccountUrl = RegExp.escape(fakeUrl + "/api/data/v8.0/accounts(00000000-0000-0000-0000-000000000001)");
        xhr.respondWith("GET", new RegExp(retrieveAccountUrl, "g"),
            [200, { "Content-Type": "application/json" }, JSON.stringify(account)]
        );
        
        // Respond to Delete Request for account 
        var updateAccountUrl = RegExp.escape(fakeUrl + "/api/data/v8.0/accounts(00000000-0000-0000-0000-000000000001)");
        xhr.respondWith("PATCH", new RegExp(updateAccountUrl, "g"),
            [204, { "Content-Type": "application/json" }, "{}"]
        );
        
        // Respond to Delete Request for account 
        var deleteAccountUrl = RegExp.escape(fakeUrl + "/api/data/v8.0/accounts(00000000-0000-0000-0000-000000000001)");
        xhr.respondWith("DELETE", new RegExp(deleteAccountUrl, "g"),
            [204, { "Content-Type": "application/json" }, "{}"]
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
    });
});