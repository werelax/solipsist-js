# Solipsist.js

Solipsist is (will be) a library that allows you to develop JavaScript applications without worrying about the backend by providing a simple way to define object factories and mocking ajax requests.

The idea is to provide an isolated environment that mimics the behaviour of the server so you can focus completely on the frontend until it's ready to talk to the real world, avoiding the painful context-switching between client-server code.

### Status of the Library

Just a proof of concept.

## Factories

With `Solipsist.Factory` you can define 'blueprints' for your data objects and then generate as many of them as you need:

```javascript

// Define some factory with six silly properties

var MyFactory = Solipsist.Factory(function(f) {
  return f({
    prop_one:    f.int_between(10, 20),
    prop_two:    f.int_between(0, 100),
    prop_three:  f.int_sequence(),
    prop_four:   f.int_sequence(1000),
    prop_five:   "Just a plain, static string",
    prop_six:    function() { return new Date; }
  });
});

// Then, use it to generate data objects

var my_obj = MyFactory();
console.log(my_obj.prop_one);   // 13
console.log(my_obj.prop_three); // 0
console.log(my_obj.prop_four);  // 1000
console.log(my_obj.prop_five);  // "Just a plain, static string"

var other_obj = MyFactory({prop_five: "Another String"});
console.log(other_obj.prop_one);   // 17
console.log(other_obj.prop_three); // 1
console.log(other_obj.prop_four);  // 1001
console.log(other_obj.prop_five);  // "Another String"

````

You can use the object constructed by the factory to populate more complex models

```javascript

// Using backbone.js

var MyModel = Backbone.Model.extend({
  method_one: function() {
    return this.get('prop_one');
  },
  method_two: function() {
    return this.get('prop_two');
  }
});

var MyFactory = Solipsist.Factory(function(f) {
  return f({
    prop_one: f.int_between(10, 100),
    prop_two: f.int_sequence(50)
  });
}, function (data) {
  return new MyModel(data);
});

var instance = MyFactory();
console.log(instance.method_one());    // 34
console.log(instance.get('prop_two')); // 50

```
