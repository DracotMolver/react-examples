import React from 'react';

const shouldRender = props => condition => (WrapperComponent, AlternativeComponent = null) => {
    class ShouldRender extends React.PureComponent {
        render() {
            return condition
                ? <WrapperComponent {...props} />
                : AlternativeComponent === null
                    ? null
                    : <AlternativeComponent />;
        }
    }
};

export default shouldRender;
