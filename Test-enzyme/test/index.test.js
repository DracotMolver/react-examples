import chai from 'chai';
import React from 'react';
import Hello from '../client/dev/components/Hello.js';
import { shallow } from 'enzyme';

let expect = chai.expect;

describe('<Hello />', () => {
    'use strict';

    const wrapper = shallow(<Hello />);
    it('renders one <h1> tag', () => {
        expect(wrapper.find('h1')).to.have.length(1);
    });

    it('contains text HOLA (uppercase)', () => {
        expect(wrapper.find('p').text()).to.equal('HOLA');
    });
});