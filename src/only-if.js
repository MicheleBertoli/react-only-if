import React from 'react';

const getDisplayName = (Component) => (
  Component.displayName || Component.name || 'Component'
);

const isStateless = (Target) => (
  !(Target.prototype && Target.prototype.isReactComponent)
);

const wrapStateless = (stateless) => {
  class Wrapped extends React.Component {
    render() {
      return stateless(this.props, this.context);
    }
  }
  Wrapped.contextTypes = stateless.contextTypes;
  Wrapped.propTypes = stateless.propTypes;
  return Wrapped;
};

export default (condition, Placeholder) => (Target) => {
  const Super = isStateless(Target) ? wrapStateless(Target) : Target;
  class Enhanced extends Super {
    render() {
      if (condition(this.props, this.context, this.state)) {
        return super.render();
      }
      return Placeholder ? React.createElement(Placeholder) : null;
    }
  }
  Enhanced.displayName = `OnlyIf(${getDisplayName(Target)})`;

  return Enhanced;
};
