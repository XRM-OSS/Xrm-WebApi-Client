describe("WebApiClient", function() {
    var account;
    
    beforeEach(function() {
        account = { 
            Name: "Adventure Works"
        };
    });
    
    describe("Operations", function() {
        it("should know the create operation", function() {
            expect(WebApiClient.Create).not.toBe(undefined);
        }); 
      
        it("should know the delete operation", function() {
            expect(WebApiClient.Delete).not.toBe(undefined);
        });
    });
    
    describe("SetNames", function() {
        it("should append s if no special ending", function() {
            expect(WebApiClient.GetSetName("account")).toBe("accounts");
        }); 
        
        it("should append ies if ends in y", function() {
            expect(WebApiClient.GetSetName("city")).toBe("cities");
        });
        
        it("should append es if ends in s", function() {
            // I know that this is grammatically incorrect, WebApi does this however
            expect(WebApiClient.GetSetName("settings")).toBe("settingses");
        });
    });
    
    describe("Create", function() {
        it("should create records properly", function(){
            //expect(WebApiClient.Create({entityName: "account", entity: account})).not.toBe(null);
        });
    });
});