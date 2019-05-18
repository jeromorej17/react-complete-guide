import React from 'react'
import { mount } from 'enzyme'
import Person from '../Person'
import ReactDOM from 'react-dom'

describe('<Person /> Component', ()=> {
    let mountedPerson, props, globalProps

    const personComponent = () => {
        if(!mountedPerson){
            mountedPerson = mount(<Person {...props} />)
        }
        return mountedPerson
    }

    beforeEach(()=> {
        globalProps = {
            name: 'Sylvia',
            age: 60,
            click: jest.fn(),
            changeName: jest.fn(),
            children: [
                '<div />',
                '<input />'
            ]
        }
        mountedPerson = undefined;
    })

    it('renders without crashing', ()=> {
        const div = document.createElement('div')
        ReactDOM.render(<Person />, div)
        ReactDOM.unmountComponentAtNode(div)
    })

    it('should know its name and age when provided', () => {
        props = {
            ...globalProps,
            name: "Rochelle",
            age: 26
        }

        expect(personComponent().props().name).toBe("Rochelle")
        expect(personComponent().props().age).toBe(26)
    })

    it("Should trigger the click event and call the click handler when the components' para1 is clicked", ()=> {
         props = {
             ...globalProps,
             name: "Maxwell",
             age: 36,
             click: jest.fn()
         }
        personComponent().find("p#para1").simulate('click');
        expect(props.click).toHaveBeenCalledTimes(1)
    })

    it('Should display children properties when children is passed down to the child component', ()=> {
        props = {
            ...globalProps, 
            name: 'Sinclare',
            age: 30,
            children: [
                "<p></p>",
                "<input />",
                "<div />"
            ]
        }
       
        expect(personComponent().props().children.length).toBeGreaterThan(0)
    })

    it('Should trigger the change event and call the change handler when para2 is clicked', ()=> {
        props ={
            ...globalProps,
            name: 'Elizabeth',
            age: 13,
            changeName: jest.fn()
        }  
        const event = {target: {name: "test", value: "Susan"}}
        personComponent().find("input#inputName").simulate('change', event)
        expect(props.changeName).toHaveBeenCalledTimes(1)
    })


})