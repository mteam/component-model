var Component = require('./component');

function Container(name) {
  Component.call(this, name);

  this.components = [];
  this.map = {}
};

Container.prototype = Object.create(Component.prototype);

Container.prototype.add = function(component) {
  this.components.push(component);

  if (component.name != null) {
    this.map[component.name] = component;
  }
  
  if (component instanceof Component) {
    component.attach(this);
  }
};

Container.prototype.get = function(name, needed) {
  if (needed == null)
    needed = true;

  if (this.map[name] == null && needed) {
    throw Error('Component with name ' + name + ' has not been found');
  }

  return this.map[name] || null;
};

module.exports = Container;
