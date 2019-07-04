/*describe('Examining the syntax of Jest tests', () => {
  
 it('sums numbers', () => {
     expect(1 + 2).toEqual(3);
     expect(2 + 2).toEqual(4);
  });
});*/

import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('First React component test with Enzyme', () => {
   it('renders without crashing', () => {
    const wrapper = shallow(<App />);
    const incrementBtn = wrapper.find('button.increment');
    incrementBtn.simulate('click');
    const text = wrapper.find('p').text();
    expect(text).toEqual('Count: 1');
    });
});

/*
import React from 'react';
import { shallow } from 'enzyme';
import Home from './components/Home';

describe('First React component test with Enzyme', () => {
   it('renders without crashing', () => {
      shallow(<Home />);
    });
});
*/