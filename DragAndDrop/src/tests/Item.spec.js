import React from 'react';
import { mount, configure } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';

// Own components
import Item from '../components/Item';
import data from '../helpers/mockup';

configure({ adapter: new Adapter() });

describe('Testing the Item component', () => {
    'use strict';

    it('Item component allows us to set props', () => {
        const mockProps = {
            key: 'item-0',
            title: data[0].title,
            content: data[0].content,
            initPosition: 1,
            actualPosition: 0,
            onMouseDown: () => { },
            onMouseUp: () => { }
        };

        const item = mount(<Item />);
        item.setProps(mockProps);

        expect(item.props().title).to.be.equal(data[0].title);
        expect(item.props().content).to.be.equal(data[0].content);
        expect(item.props().initPosition).to.be.equal(1);
        expect(item.props().actualPosition).to.be.equal(0);
        expect(item.props().onMouseDown).to.be.a('function');
        expect(item.props().onMouseUp).to.be.a('function');
    });

});
