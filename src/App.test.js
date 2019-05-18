import React from 'react';
import { mount } from 'enzyme'
import ReactDOM from 'react-dom';
import App from './App';


describe('<App /> Component rendering', ()=> {
  let mountedAppComponent
  let props

  const appComponent = () => {
    if(!mountedAppComponent){
      mountedAppComponent = mount(<App {...props} />)
    }
    return mountedAppComponent;
  }

  beforeEach(() => {
    props = {}
    mountedAppComponent = undefined;
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render( <App /> , div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should display people when the `Toggle People` button is clicked', ()=> {
    appComponent().find("#persons").simulate('click')
    expect(appComponent().state().showPersons).toBe(true)
    expect(appComponent().find("div.Person").length).toBeGreaterThan(0)
  });

  it('show hide people when the `Toggle People` button is clicked twice', ()=> {
    const spyToggle = jest.spyOn(appComponent().instance(), 'togglePersonsHandler');
    appComponent().find("#persons").simulate('click')
    appComponent().find("#persons").simulate('click')

    expect(appComponent().state().showPersons).toBe(false)
    expect(appComponent().find("div.Person").length).toBe(0)
    expect(spyToggle).toHaveBeenCalledTimes(1)
  })



})




