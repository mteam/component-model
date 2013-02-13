var Component = require('./component');

function Container(name) {
  Component.call(this, name);

  this.components = [];
  this._cache = null;
};

Container.prototype = Object.create(Component.prototype);

Container.prototype.add = function(component) {
  this.components.push(component);
  this._cache = null;
  
  if (component instanceof Component) {
    component.attach(this);
  }
};

Container.prototype.get = function(name, needed) {
  if (needed === undefined)
    needed = true;

  var cache = this._getCache();

  if (cache[name] == null && needed) {
    throw new Error('Component with name ' + name + ' has not been found');
  }

  return cache[name] || false;
};

Container.prototype._getCache = function() {
  if (this._cache == null) {
    this._createCache();
  }

  return this._cache;
};

Container.prototype._createCache = function() {
  this._cache = {};

  for (var i = 0, c; i < this.components.length; i++) {
    c = this.components[i];
    this._cache[c.name] = c;
  }
};

module.exports = Container;
