import React from 'react';

export default (Target, condition, Placeholder) => {
  class Component extends Target {
    render() {
      if (condition(this.props, this.state, this.context)) {
        return super.render();
      }
      return Placeholder ? React.createElement(Placeholder) : null;
    }
  }
  return Component;
};
