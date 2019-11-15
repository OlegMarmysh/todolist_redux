import React from 'react';
import './App.css';

class TodoListTitle extends React.Component {
    deleteTodoList = () => {
        this.props.deleteTodoList(this.props.id)
    };
    render = () => {
        return (
            <div className='todoListTitle'>
                <h3 className="todoList-header__title">{this.props.title}</h3>
                <button onClick={this.deleteTodoList} className='todoListTitle button'>X</button>
            </div>
        );
    }
}

export default TodoListTitle;

