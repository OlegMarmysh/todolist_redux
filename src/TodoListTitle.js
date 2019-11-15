import React from 'react';
import './App.css';

class TodoListTitle extends React.Component {
    state ={
        editMode: false,
        title: this.props.title
    }
    deleteTodoList = () => {
        this.props.deleteTodoList(this.props.id)
    };
    activateEditMode =() => {
        this.setState({editMode: true})
    };
    deactivateEditMode =() => {
        this.setState({editMode: false})
        this.props.changeTodoListTitle(this.state.title)
    };
    onTitleChanged = (e) => {
        this.setState({title: e.currentTarget.value})
    }
    render = () => {
        return (
            <div className='todoListTitle'>
                {this.state.editMode ? <input onBlur={this.deactivateEditMode} onChange={this.onTitleChanged} autoFocus={true} value={this.state.title}/>
                    :<h3 onClick={this.activateEditMode} className="todoList-header__title">{this.state.title}</h3>}
                <button onClick={this.deleteTodoList} className='todoListTitle button'>X</button>
            </div>
        );
    }
}

export default TodoListTitle;

