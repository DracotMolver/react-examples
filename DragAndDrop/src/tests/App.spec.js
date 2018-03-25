import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';

// Own compoentns
import App from '../components/App';
import data from '../helpers/mockup';

describe('Testing the App component', () => {
    'use strict';

    it('App state `items` is an array of size 8', () => {
        const app = mount(<App />);

        expect(app.state(['items']))
            .to.be.an('array')
            .to.be.length(8);
    });

    it('App state `itemsInitPosition` is an array of size 8 with values from 1 to 8', () => {
        const app = mount(<App />);

        expect(app.state(['itemsInitPosition']))
            .to.be.an('array')
            .to.be.length(8)
            .to.include.members([1, 2, 3, 4, 5, 6, 7, 8]);
    });

    it('App state `itemsActualPosition` is an array of size 8 filled with 0 as values', () => {
        const app = mount(<App />);

        expect(app.state(['itemsActualPosition']))
            .to.be.an('array')
            .to.be.length(8)
            .to.include.members([0, 0, 0, 0, 0, 0, 0, 0]);
    });

    it('App state `initDrag` is false', () => {
        const app = mount(<App />);

        expect(app.state(['initDrag']))
            .to.be.an('boolean')
            .to.be.equal(false);
    });

    it('Should renders Item', () => {
        const app = mount(<App />);
        expect(app.contains('Item'));
    });
});