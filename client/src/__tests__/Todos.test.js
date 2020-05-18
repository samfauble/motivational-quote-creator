import React from "react";
import Enzyme, {shallow, render, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16"
import  { Quotes }  from "../components/Quotes"
import Auth from "../auth/Auth"


beforeAll(()=>{
    Enzyme.configure({ adapter: new Adapter() });
});


describe("Quotes", () => {

    const todoProps = {
        todos: [],
        newQuoteName: '',
        loadingQuotes: false
      }


    const todoAuth = new Auth("123")
/*
    test("New Quote button creates a new todo item", () => {   
        const wrapper = mount(<Quotes />, {{...todoProps} auth={todoAuth}});    
        const grid = wrapper.find(".gridTest")                      // Quote grid
        const button = wrapper.find("Input.buttonTest")             // New Quote buttom
        button.simulate("click", {target: {action}})                // simulate a click event
        expect(wrapper.state("todos").length).toEqual(1)
    })
*/
    test("Grid starts with 0 Quotes", () => {
        const wrapper = shallow(<Quotes />)
        expect(wrapper.state("todos").length).toEqual(0)
    })
/*
    test("Delete button should remove 1 item", ()=> {
        const wrapper = shallow(<Quotes />);
        const deleteTest = wrapper.find(".deleteTest")
        const button = wrapper.find(".buttonTest")
        const grid = wrapper.find(".gridTest")
        button.simulate("click")
        expect(grid.children.length).toEqual(1)
        deleteTest.simulate("click")
        expect(grid.children.length).toEqual(0)
    })
*/
})