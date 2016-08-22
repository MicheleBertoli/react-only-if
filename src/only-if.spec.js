/* eslint react/no-multi-comp: 0 */

import assert from 'assert';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import React, { Component } from 'react';
import onlyIf from './only-if';

class ExtendsComponentDummy extends Component {
  render() {
    return <div>Dummy</div>;
  }
}
ExtendsComponentDummy.contextTypes = {
  test: React.PropTypes.bool,
};

const CreateClassDummy = React.createClass({
  contextTypes: {
    test: React.PropTypes.bool,
  },
  render() {
    return <div>Dummy</div>;
  },
});

const StatelessDummy = () => (
  <div>Stateless Dummy</div>
);
StatelessDummy.contextTypes = {
  test: React.PropTypes.bool,
};

const Placeholder = () => <div>Placeholder</div>;

const runTest = (Dummy, description) => {
  describe(description, () => {
    it('calls the condition function with the props', () => {
      const callback = sinon.spy();
      const props = { test: true };
      const DummyOnlyIf = onlyIf(Dummy, callback);
      shallow(<DummyOnlyIf {...props} />);
      assert(callback.calledWith(props));
    });

    it('calls the condition function with the state', () => {
      const callback = sinon.spy();
      const state = { test: true };
      const DummyOnlyIf = onlyIf(Dummy, callback);
      const wrapper = shallow(<DummyOnlyIf />);
      wrapper.setState(state);
      assert(callback.calledWith({}, state));
    });

    it('calls the condition function with the context', () => {
      const callback = sinon.spy();
      const context = { test: true };
      const DummyOnlyIf = onlyIf(Dummy, callback);
      shallow(<DummyOnlyIf />, { context });
      assert(callback.calledWith({}, null, context));
    });

    it('renders the component if the condition is true', () => {
      const DummyOnlyIf = onlyIf(Dummy, () => true);
      const wrapper = shallow(<DummyOnlyIf />);
      assert(wrapper.containsMatchingElement(Dummy));
    });

    it('renders the placeholder if the condition is false', () => {
      const DummyOnlyIf = onlyIf(Dummy, () => false, Placeholder);
      const wrapper = shallow(<DummyOnlyIf />);
      assert(wrapper.contains(<Placeholder />));
    });

    it('renders null if the placeholder does not exist', () => {
      const DummyOnlyIf = onlyIf(Dummy, () => false);
      const wrapper = shallow(<DummyOnlyIf />);
      assert.equal(wrapper.type(), null);
    });
  });
};


describe('onlyIf', () => {
  runTest(ExtendsComponentDummy, '`extends Component` component');
  runTest(CreateClassDummy, '`createClass` component');
  runTest(StatelessDummy, 'stateless component');
});
