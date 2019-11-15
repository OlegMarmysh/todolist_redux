import React from 'react';
import './App.css';

class TodoListTask extends React.Component {

    onIsDoneChanged = (e) => {
        this.props.changeStatus(this.props.task.id, e.currentTarget.checked ? 2: 0);
    }

    onTitleChanged = (e) => {
        this.setState({title: e.currentTarget.value})
    }

    state = {
        editMode: false,
        title: this.props.task.title
    }

    activateEditMode = () => {
        this.setState({editMode: true});
    }

    deactivateEditMode = () => {
        this.setState({editMode: false});
        this.props.changeTitle(this.props.task.id, this.state.title);
    }
    deleteTask = () => {
        this.props.deleteTask(this.props.task.id)
    }


    render = () => {
        let containerCssClass = this.props.task.status === 2 ? "done" : "";
        let priotityTitle = "";
        switch (this.props.task.priority) {
            case 0: priotityTitle = "Low"; break;
            case 1: priotityTitle = "Middle"; break;
            case 2: priotityTitle = "High"; break;
            case 3: priotityTitle = "Urgently"; break;
            case 4: priotityTitle = "Later"; break;
        }
        return (
            <div className='todoList-task'>
                <div className='todoList-wrapper'>
                    <div className={containerCssClass}>
                        <input type="checkbox" checked={this.props.task.status}
                               onChange={this.onIsDoneChanged}/>
                        {this.state.editMode
                            ? <input onBlur={this.deactivateEditMode} onChange={this.onTitleChanged} autoFocus={true}
                                     value={this.state.title}/>
                            :
                            <span onClick={this.activateEditMode}>{this.state.title}</span>
                        }, priority: {priotityTitle}
                    </div>
                </div>
                <div>
                    <button onClick={this.deleteTask} className='todoList-header button'>X</button>
                </div>
            </div>
        );
    }
}

export default TodoListTask;

