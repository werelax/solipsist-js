(function (exports) {

  // Helpers

  function extend(receiver, giver, options) {
    options || (options = {});
    var overwrite = options.overwrite || false;

    for (var prop in giver) if (giver.hasOwnProperty(prop)) {
      if (overwrite || receiver[prop] === undefined) {
        receiver[prop] = giver[prop];
      }
    }
    return receiver;
  }

  // Fix values of variable loops
  function fix(value) {
    return value;
  }

  // Factories

  exports['Factory'] = (function() {

    var PropertyFactory = {

      // Numeric
      int_between: function(min, max) {
        var dif = max - min;
        return function() {
          return Math.floor(Math.random() * dif) + min;
        };
      },

      int_sequence: function(start) {
        start  || (start = 0);
        return function() {
          return start++;
        };
      }

      // Strings

      // Collections

      // Sequences

      // Complex properties (callbacks)

    };

    var FactoryConstructor = function(blueprint) {

      var generate_object = function() {
        var generated = {},
            blue_property;
        for (property in blueprint) if (blueprint.hasOwnProperty(property)) {
          blue_property = blueprint[property];
          if (typeof blue_property == 'function') {
            generated[property] = blueprint[property]();
          } else {
            generated[property] = fix(blue_property);
          }
        }
        return generated;
      }

      return function (override_values) {
        var generated = generate_object();
        return extend(generated, override_values, {override: true});
      }
    };

    extend(FactoryConstructor, PropertyFactory);

    return function(description_function) {
      return description_function(FactoryConstructor);
    }

  })();

})(this.Solipsist || (this.Solipsist = {}))
