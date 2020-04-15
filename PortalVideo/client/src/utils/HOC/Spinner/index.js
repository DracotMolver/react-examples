import React from "react";

const Spinner = (propName) => (WrapperComponent) =>
  class _Loader extends React.PureComponent {
    render() {
      const { props } = this;
console.log(props, propName)
      // Check if the prop to validate is an object or an array
      return (
        typeof props[propName] === "object"
          ? Object.keys(props[propName]).length
          : !!props[propName].length
      ) ? (
        <WrapperComponent {...props} />
      ) : (
        <div className="spinner"></div>
      );
    }
  };

export default Spinner;
