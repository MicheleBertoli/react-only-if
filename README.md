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
const UserContainerOnlyIf = onlyIf(UserContainer, props => props.user, Spinner);
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

## Api

Parameter   | Type    | Description
----------- | ------- | -----------
Target      | element | The component to render when the condition is true.
condition   | func    | The condition function. It receives props, state and context.
Placeholder | element | (optional) The component to render when the condition is false.

## Test

```bash∏
$ npm test
```
