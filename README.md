[![Build Status](https://travis-ci.org/MicheleBertoli/react-only-if.svg?branch=master)](https://travis-ci.org/MicheleBertoli/react-only-if)

# React Only If

Sometimes we want to check if the right data has been loaded into the props, the state or the context before rendering our [React.js](https://facebook.github.io/react/)
components. In the meanwhile, we usually show a loading indicator.

React Only If is a [higher order component](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750#.euq910vh3)
that simplifies the process and makes it more declarative.

Before:

```jsx
const UserContainer = props => {
  if (!props.user) {
    return <Spinner />;
  }
  return <User user={props.user} />;
};
```

After:

```jsx
const UserContainer = props => <User user={props.user} />;
const UserContainerOnlyIf = onlyIf(props => props.user, Spinner)(UserContainer);
```

## Installation

### Npm

```bash
$ npm install react-only-if --save
```

### Umd

```html
<script src="https://npmcdn.com/react-only-if/umd/only-if.min.js"></script>
```

## API

Parameter   | Type    | Description
----------- | ------- | -----------
condition   | func    | The condition function. It receives props, context and state.
Placeholder | element | (optional) The component to render when the condition is false.

### Note for version 0.x users

Following a discussion in [#2](https://github.com/MicheleBertoli/react-only-if/pull/2#issuecomment-241388231),
the library has been recently rewritten (thanks [Frederik](https://github.com/m90)).

The version 1.x introduces some breaking changes in order to enforce consistency for stateless functional components
and to make the library play nicely when using functional composition on multiple higher order components.

```javascript
// v0.x
const ComponentOnlyIf = onlyIf(Component, (props, state, context) => {...}, Placeholder);

// v1.x
const ComponentOnlyIf = onlyIf((props, context, state) => {...}, Placeholder)(Component);
```

## Test

```bash∏
$ npm test
```
