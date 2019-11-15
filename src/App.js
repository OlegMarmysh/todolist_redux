import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {addTodoAC, deleteTodoAC, setTodoAC} from "./reducer";
import axios from 'axios';

class App extends React.Component {

    constructor(props){
        super(props)
    }
    restoreState = () => {
        axios.get('https://social-network.samuraijs.com/api/1.0/todo-lists',
            {withCredentials: true}
            ). then ((response)=> {
            this.props.setTodoList(response.data)
        })
    };

    componentDidMount() {
        this.restoreState();
    }
    addTodoList = (title) => {
        axios.post('https://social-network.samuraijs.com/api/1.0/todo-lists', {title:title},
            {
                withCredentials: true,
                headers: {'API-KEY': 'd86dd583-34ff-4cbe-aea1-a92f5af984f6'}
            }
            ).then(response => {
            this.props.adTodo(response.data.data.item);
        })
        /*let newTodoList = {
            id: this.nextTodoListId,
            title: title,
            tasks: []
        };
        this.props.adTodo(newTodoList)
        this.nextTodoListId++;*/
    };
    deleteTodoList = (id) => {
        axios.delete(`https://social-network.samuraijs.com/api/1.0/todo-lists/${id}`,
            {
                withCredentials: true,
                headers: {'API-KEY': 'd86dd583-34ff-4cbe-aea1-a92f5af984f6'}
            }
            ).then(response => {
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

