import React from "react";
import Enzyme, {shallow, render, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16"
import  { Todos }  from "../components/Todos"
import Auth from "../auth/Auth"


beforeAll(()=>{
    Enzyme.configure({ adapter: new Adapter() });
});


describe("Todos", () => {

    const todoProps = {
        todos: [],
        newTodoName: '',
        loadingTodos: false
      }


    const todoAuth = new Auth("123")
/*
    test("New Todo button creates a new todo item", () => {   
        const wrapper = mount(<Todos />, {{...todoProps} auth={todoAuth}});    
        const grid = wrapper.find(".gridTest")                      // Todo grid
        const button = wrapper.find("Input.buttonTest")             // New Todo buttom
        button.simulate("click", {target: {action}})                // simulate a click event
        expect(wrapper.state("todos").length).toEqual(1)
    })
*/
    test("Grid starts with 0 Todos", () => {
        const wrapper = shallow(<Todos />)
        expect(wrapper.state("todos").length).toEqual(0)
    })
/*
    test("Delete button should remove 1 item", ()=> {
        const wrapper = shallow(<Todos />);
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