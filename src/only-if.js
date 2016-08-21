import React from 'react';

export default (Target, condition, Placeholder) => {
  const renderedPlaceholder = Placeholder
    ? React.createElement(Placeholder)
    : null;

  if (!Target.prototype.isReactComponent) {
    const StatelessComponent = (props, context) => (
      condition(props, context)
        ? React.createElement(Target, props)
        : renderedPlaceholder
    );
    StatelessComponent.contextTypes = Target.contextTypes;
    return StatelessComponent;
  }

  class Component extends Target {
    render() {
      if (condition(this.props, this.state, this.context)) {
        return super.render();
      }
      return renderedPlaceholder;
    }
  }
  return Component;
};
