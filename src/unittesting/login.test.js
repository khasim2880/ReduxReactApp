import React from 'react';
import { shallow } from 'enzyme';
import Login from '../components/Login';
global.config = require('../config');

describe('Login component unit testing', () => {
    it('Login', async () => {
        const wrapper = shallow(<Login />);       
        const btnLogin = wrapper.find('Button.btnLogin');
        const inputUsername = wrapper.find('[type="text"]');
        inputUsername.simulate('focus');    
        inputUsername.simulate('change', { target: { value: 'khasimali' } });
        const inputPassword = wrapper.find('[type="password"]');
        inputPassword.simulate('focus');    
        inputPassword.simulate('change', { target: { value: 'test123' } });
        //btnLogin.simulate('click'); 
        const result = await wrapper.instance().Login({preventDefault: () => {}});   
        expect(result.error).toEqual(false);
    });
});