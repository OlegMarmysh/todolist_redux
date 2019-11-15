import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {addTodoAC, deleteTodoAC, setTodoAC} from "./reducer";
import {api} from "./api";

class App extends React.Component {

    constructor(props){
        super(props)
    }

    componentDidMount() {
        this.restoreState();
    }
    restoreState = () => {
        api.createTodoList()
            .then ((response)=> {
            this.props.setTodoList(response.data)
        })
    };
    addTodoList = (title) => {
        api.addTodoList(title)
            .then(response => {
            this.props.adTodo(response.data.data.item);
        })
    };
    deleteTodoList = (id) => {
        api.deleteTodoList(id)
            .then(response => {
            this.props.deleteTodo (id)
        })
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
}

let mapDispatchToProps = (dispatch) => {
    return {
        setTodoList: (todoList) => {
            const action = setTodoAC(todoList);
            dispatch(action)
        },
        adTodo: (todoList) => {
            const action = addTodoAC(todoList);
            dispatch(action)
        },
        deleteTodo: (todoListId) => {
            const action = deleteTodoAC(todoListId);
            dispatch(action)
        }
    }
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default ConnectedApp;

