function Component(name) {
  this.name = name;
}

Component.prototype.attach = function(parent) {
  this.parent = parent;
};

Component.prototype.getParent = function() {
  if (this.parent == null) {
    throw new Error('parent requested, but component has not been attached');
  }

  return this.parent;
};

module.exports = Component;
