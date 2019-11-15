import React from 'react';
import './App.css';
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import TodoListTitle from "./TodoListTitle";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {addTaskAC, changeTaskAC, changeTodoListTitleAC, deleteTaskAC, setTasksAC} from "./reducer";
import axios from 'axios'
import {api} from "./api";


class TodoList extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.restoreState()
    }

    state = {
        filterValue: "All"
    };

    restoreState = () => {
        api.createTasks(this.props.id)
            .then(response => {
                this.props.setTasks(this.props.id, response.data.items);
            })
    };

    addTask = (newText) => {
        api.addTask(this.props.id, newText)
            .then(response => {
                this.props.addTask(this.props.id, response.data.data.item)
            })
    };

    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        });
    };

    changeTask = (taskId, obj) => {
        let task = this.props.tasks.find(t => {
            if (t.id === taskId) {
                return t
            }
        });
        let newTask = {...task, ...obj};
        api.changeTask(newTask).then(response => {
            this.props.changeTask(this.props.id, taskId, obj)
        })
    };
    changeStatus = (taskId, status) => {
        this.changeTask(taskId, {status: status});
    };
    changeTitle = (taskId, title) => {
        this.changeTask(taskId, {title: title});
    };
    deleteTask = (taskId) => {
        api.deleteTask(taskId).then(response => {
            this.props.deleteTask(this.props.id, taskId)
        })
    };
    changeTodoListTitle = (title) => {
        api.changeTitleTodoList(this.props.id, title).then(response => {
            this.props.changeTodoListTitle(this.props.id, title)
        })
    };

    render = () => {
        let {tasks = []} = this.props;
        return (
            <div className="todoList">
                <div className="todoList-header">
                    <TodoListTitle id={this.props.id} title={this.props.title}
                                   deleteTodoList={this.props.deleteTodoList}
                                   changeTodoListTitle={this.changeTodoListTitle}
                    />
                    <AddNewItemForm addItem={this.addTask}/>
                </div>

                <TodoListTasks changeStatus={this.changeStatus}
                               changeTitle={this.changeTitle}
                               deleteTask={this.deleteTask}
                               tasks={tasks.filter(t => {
                                   if (this.state.filterValue === "All") {
                                       return true;
                                   }
                                   if (this.state.filterValue === "Active") {
                                       return t.status === 0;
                                   }
                                   if (this.state.filterValue === "Completed") {
                                       return t.status === 2;
                                   }
                               })}/>
                <TodoListFooter changeFilter={this.changeFilter} filterValue={this.state.filterValue}/>
            </div>

        );
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        setTasks: (todolistId, tasks) => {
            const action = setTasksAC(todolistId, tasks)
            dispatch(action)
        },
        addTask: (todolistId, task) => {
            const action = addTaskAC(todolistId, task);
            dispatch(action)
        },
        changeTask: (todolistId, taskid, obj) => {
            const action = changeTaskAC(todolistId, taskid, obj);
            dispatch(action)
        },
        deleteTask: (todoListId, taskId) => {
            const action = deleteTaskAC(todoListId, taskId);
            dispatch(action)
        },
        changeTodoListTitle: (todolistId, title) =>{
            const action = changeTodoListTitleAC(todolistId, title)
            dispatch(action)
        }
    }
}

const ConnectedTodoList = connect(null, mapDispatchToProps)(TodoList)

export default ConnectedTodoList;

