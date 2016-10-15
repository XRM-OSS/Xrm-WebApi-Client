describe("WebApiClient", function() {
    var account;
    
    beforeEach(function() {
        account = { 
            Name: "Adventure Works"
        };
    });
    
    describe("Operations", function() {
        it("should know the create operation", function() {
            expect(WebApiClient.Create).toBeDefined();
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
        it("should create records properly", function(){
            //expect(WebApiClient.Create({entityName: "account", entity: account})).not.toBe(null);
        });
    });
});