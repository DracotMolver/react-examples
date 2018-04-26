import React from 'react';

/**
 * It will render a loading
 * 
 * @param {object|array} propname - Value to use to check if the component
 *                                  is ready to be rendered.
 * @param {component} WrapperComponent - The component to render when the
 *                                       validation returns true.
 */
const videoLoader = propname => WrapperComponent =>
    class VideoLoader extends React.PureComponent {
        render() {
            const { props } = this;

            // Check if the prop to validate is an object or an array
            return (typeof props[propname] === 'object'
                ? Object.keys(props[propname]).length
                : !!props[propname].length)
                ? <WrapperComponent {...props} />
                : <div className="spinner"></div>;
        }
    };

export default videoLoader;
