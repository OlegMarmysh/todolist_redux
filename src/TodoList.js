import React from 'react';
import './App.css';
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import TodoListTitle from "./TodoListTitle";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {addTaskAC, changeTaskAC, deleteTaskAC, setTasksAC} from "./reducer";
import axios from 'axios'


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
        axios.get(`https://social-network.samuraijs.com/api/1.0/todo-lists/${this.props.id}/tasks`,
            {
                withCredentials: true,
                headers: {'API-KEY': 'd86dd583-34ff-4cbe-aea1-a92f5af984f6'}
            }
            ).then(response => {
                this.props.setTasks(this.props.id, response.data.items);
        })
    };

    addTask = (newText) => {
        axios.post(`https://social-network.samuraijs.com/api/1.0/todo-lists/${this.props.id}/tasks`, {title: newText},
            {
                withCredentials: true,
                headers: {'API-KEY': 'd86dd583-34ff-4cbe-aea1-a92f5af984f6'}
            }
        ).then (response => {
            this.props.addTask(this.props.id, response.data.data.item)
        })
        /*let newTask = {
            id: this.nextTaskId,
            title: newText,
            isDone: false,
            priority: "low"
        };
        this.nextTaskId++;
        this.props.addTask(this.props.id, newTask)*/
    };

    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        });
    };

    changeTask = (taskId, obj) => {
        let task = this.props.tasks.find( t => {
            if(t.id === taskId){
                return t
            }
        });
        let newTask ={...task, ...obj}
        axios.put(`https://social-network.samuraijs.com/api/1.0/todo-lists/tasks/`, newTask,
            {
                withCredentials: true,
                headers: {'API-KEY': 'd86dd583-34ff-4cbe-aea1-a92f5af984f6'}
            }
            ).then( response => {
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
        axios.delete(`https://social-network.samuraijs.com/api/1.0/todo-lists/tasks/${taskId}`,
            {
                withCredentials: true,
                headers: {'API-KEY': 'd86dd583-34ff-4cbe-aea1-a92f5af984f6'}
            }
            ).then ( response => {
            this.props.deleteTask(this.props.id, taskId)
        })

    }

    render = () => {
        let {tasks = []} = this.props;
        return (
            <div className="todoList">
                <div className="todoList-header">
                    <TodoListTitle id={this.props.id} title={this.props.title}
                                   deleteTodoList={this.props.deleteTodoList}/>
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
                                       return t.isDone === false;
                                   }
                                   if (this.state.filterValue === "Completed") {
                                       return t.isDone === true;
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
        }
    }
}

const ConnectedTodoList = connect(null, mapDispatchToProps)(TodoList)

export default ConnectedTodoList;

