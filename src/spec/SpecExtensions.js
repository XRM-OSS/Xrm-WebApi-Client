beforeEach(function () {
  jasmine.addMatchers({
    demoExtension: function () {
      return {
        compare: function (actual, expected) {
          var component = actual;

          return {
            pass: typeof(component) !== "undefined"
          };
        }
      };
    }
  });
});