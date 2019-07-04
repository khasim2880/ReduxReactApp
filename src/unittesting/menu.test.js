import React from 'react';
import { shallow } from 'enzyme';
import { Menu } from '../components/Menu';
import sinon from 'sinon';

global.config = require('../config');

describe('Menu component unit testing', () => {
    it('Categories', async (done) => {
        const wrapper = shallow(<Menu />);
        wrapper
        .instance()
        .componentDidMount()
        .then((data) => {
          //console.log(data);
          //expect(axios.get).toHaveBeenCalled();
          //expect(axios.get).toHaveBeenCalledWith(global.config.apiUrl+'/categories');
          //expect(wrapper.state().categories.length).toBeGreaterThanOrEqual(1);
          expect(data).toEqual(false);         
          /*window.location.assign = jest.fn();
          expect(window.location.assign).toHaveBeenCalledWith('http://localhost:1330/');
          window.location.assign.mockRestore();  */        
          done();
        });
    });
});