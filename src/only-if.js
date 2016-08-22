import React, { Component } from 'react';

const isStateless = (Target) => (
  !(Target.prototype && Target.prototype.isReactComponent)
);

const wrapStateless = (Stateless) => {
  class WrapperComponent extends Component {
    render() {
      return React.createElement(Stateless, this.props);
    }
  }
  WrapperComponent.contextTypes = Stateless.contextTypes;
  return WrapperComponent;
};

export default (Target, condition, Placeholder) => {
  const Super = isStateless(Target) ? wrapStateless(Target) : Target;
  class Enhanced extends Super {
    render() {
      if (condition(this.props, this.state, this.context)) {
        return super.render();
      }
      return Placeholder ? React.createElement(Placeholder) : null;
    }
  }
  return Enhanced;
};
