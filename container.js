var Events = require('events');
    Component = require('./component');

function Container(name) {
  Component.call(this, name);
  Events.extend(this);

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

  this.trigger('add', component);
};

Container.prototype.remove = function(component) {
  var index = this.components.indexOf(component);

  if (index == -1) {
    throw Error('Component not found');
  }

  this.components.splice(index, 1);

  if (component.name != null) {
    delete this.map[component.name];
  }

  this.trigger('remove', component);
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
