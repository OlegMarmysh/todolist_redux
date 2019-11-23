import React from 'react';
import './App.css';
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import TodoListTitle from "./TodoListTitle";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {
    createTasks,
    getTasks,
    removeTask,
    updateTask,
    updateTodoListTitle,
} from "./reducer";

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
        this.props.createTasks(this.props.id)
    };

    addTask = (newText) => {
       this.props.getTasks(this.props.id, newText)
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
        this.props.updateTask(newTask, this.props.id, taskId, obj)
    };
    changeStatus = (taskId, status) => {
        this.changeTask(taskId, {status: status});
    };
    changeTitle = (taskId, title) => {
        this.changeTask(taskId, {title: title});
    };
    deleteTask = (taskId) => {
        this.props.removeTask(taskId)
    };
    changeTodoListTitle = (title) => {
        this.props.updateTodoListTitle(this.props.id, title)
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

const ConnectedTodoList = connect(null, {createTasks, getTasks, updateTask, removeTask, updateTodoListTitle})(TodoList);

export default ConnectedTodoList;

