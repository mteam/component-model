var expect = require('expect.js'),
    Component = require('./component'),
    Container = require('./container');

describe('component-model', function() {

  describe('Component', function() {

    it('attaches to container', function() {
      var component = new Component('foo'),
          container = new Container;

      expect(function() {
        component.getParent();
      }).to.throwError(/not been attached/);

      component.attach(container);

      expect(component.getParent()).to.be(container);
    });    

  });

  describe('Container', function() {

    it('adds component to it', function() {
      var component = new Component,
          container = new Container;

      container.add(component);
      expect(container.components).to.contain(component);
    });

    it('gets component by name', function() {
      var component = new Component('foo'),
          container = new Container;

      container.add(component);
      expect(container.get('foo')).to.be(component);
    });

  });

});
