import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {createTodoList,getTodoList, removeTodoList} from "./reducer";

class App extends React.Component {

    constructor(props){
        super(props)
    }

    componentDidMount() {
        this.restoreState();
    }
    restoreState = () => {
        this.props.createTodoList()
    };
    addTodoList = (title) => {
       this.props.getTodoList(title)
    };
    deleteTodoList = (id) => {
        this.props.removeTodoList(id)
    };

    render = () => {
        const todoLists = this.props.todoLists.map(tl => {
                return  <TodoList id={tl.id} title={tl.title} tasks={tl.tasks} deleteTodoList={this.deleteTodoList}/>
            });
        return (
            <>
                <div>
                   <AddNewItemForm addItem={this.addTodoList}/>
                </div>
                <div className="App">
                    {todoLists}
                </div>
            </>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        todoLists: state.todoLists
    }
};

const ConnectedApp = connect(mapStateToProps, {createTodoList,removeTodoList,getTodoList})(App);

export default ConnectedApp;

