import {api} from "./api";

const ADD_TODO = 'ADD_TODO';
const ADD_TASK = 'ADD_TASK';
const CHANGE_TASK = 'CHANGE_TASK';
const DELETE_TODO = 'DELETE_TODO';
const DELETE_TASK = 'DELETE_TASK';
const SET_TODOLIST = 'SET_TODOLIST';
const SET_TASKS = 'SET_TASKS';
const CHANGE_TITLE_TODOLIST = 'CHANGE_TITLE_TODOLIST';


const initialState = {
    todoLists: [
        /*{id: 0, title: 'React', tasks: [{id: 0, title: 'ss', isDone: false, priority: 'low'}]},
        {id: 1, title: 'JS', tasks: [{id: 1, title: 'aa', isDone: true, priority: 'high'}]}*/
    ]
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TODO: {
            return {
                ...state,
                todoLists: [...state.todoLists, action.todoList]
            }
        }
        case ADD_TASK: {
            return {
                ...state,
                todoLists: state.todoLists.map(el => {
                    if (el.id === action.todolistId) {
                        return {
                            ...el,
                            tasks: [...el.tasks, action.task]
                        }
                    } else {
                        return el
                    }
                })
            }
        }
        case CHANGE_TASK: {
            return {
                ...state,
                todoLists: state.todoLists.map(t => {
                    if (t.id === action.todolistId) {
                        return {
                            ...t,
                            tasks: t.tasks.map(task => {
                                if (task.id === action.taskid) {
                                    return {...task, ...action.obj}
                                } else {
                                    return task;
                                }
                            })

                        };
                    } else {
                        return t;
                    }
                })
            }
        }
        case DELETE_TODO: {
            return {
                ...state,
                todoLists: state.todoLists.filter(t => t.id !== action.todoListId)
                /* todoLists: this.state.todoLists.filter(t => t.id !== id)*/
            }
        }
        case DELETE_TASK: {
            return {
                ...state,
                todoLists: state.todoLists.map(t => {
                    if (t.id === action.todoListId) {
                        return {
                            ...t,
                            tasks: t.tasks.filter(task => task.id !== action.taskId)
                        }
                    } else {
                        return t
                    }
                })
            }
        }
        case SET_TODOLIST: {
            return {
                ...state,
                todoLists: action.todoList.map(tl => ({...tl, tasks: []}))
            }
        }
        case SET_TASKS: {
            return {
                ...state,
                todoLists: state.todoLists.map(tl => {
                    if (tl.id === action.todolistId) {
                        return {
                            ...tl,
                            tasks: action.tasks
                        }
                    } else {
                        return tl
                    }
                })
            }
        }
        case CHANGE_TITLE_TODOLIST: {
            return {
                ...state,
                todoLists: state.todoLists.map(tl => {
                    if (tl.id === action.todolistId) {
                        return {
                            ...tl,
                            title: action.title
                        }
                    } else {
                        return tl
                    }
                })
            }
        }
        default:
            return state
    }
};

export const addTodoList = (todoList) => ({
        type: ADD_TODO,
        todoList
});
export const deleteTodoList = (todoListId) => ({
        type: DELETE_TODO,
        todoListId
});
export const addTask = (todolistId, task) => ({
            type: ADD_TASK,
        todolistId,
        task
});
export const deleteTask = (todoListId, taskId) => ({
        type: DELETE_TASK,
        todoListId,
        taskId
});
export const changeTask = (todolistId, taskid, obj) => ({
        type: CHANGE_TASK,
        todolistId,
        taskid,
        obj
});
export const setTodoList = (todoList) => ({
        type: SET_TODOLIST,
        todoList
});
export const setTasks = (todolistId, tasks) => ({
    type: SET_TASKS,
    todolistId,
    tasks
});
export const changeTodoListTitle = (todolistId, title) => ({
    type: CHANGE_TITLE_TODOLIST,
    todolistId,
    title
});

export const createTodoList = () => dispatch => {
    api.createTodoList()
        .then((response) => {
            dispatch(setTodoList(response.data))
        })
};
export const getTodoList = (title) => dispatch => {
    api.addTodoList(title)
        .then(response => {
            dispatch(addTodoList(response.data.data.item));
        })
};
export const removeTodoList = (id) => dispatch => {
    api.deleteTodoList(id)
        .then(response => {
            dispatch(deleteTodoList (id))
        })
};
export const createTasks = (id) => dispatch => {
    api.createTasks(id)
        .then(response => {
            dispatch(setTasks(id, response.data.items));
        })
};
export const getTasks = (id, newText) => dispatch => {
    api.addTask(id, newText)
        .then(response => {
            dispatch(addTask(id, response.data.data.item))
        })
};
export const removeTask = (taskId) => dispatch => {
    api.deleteTask(taskId).then(response => {
        dispatch(deleteTask(this.props.id, taskId))
    })
};
export const updateTask = (newTask, id, taskId, obj) => dispatch => {
    api.changeTask(newTask).then(response => {
        dispatch(changeTask(id, taskId, obj))
    })
};
export const updateTodoListTitle = (id, title) => dispatch => {
    api.changeTitleTodoList(id, title).then(response => {
        dispatch(changeTodoListTitle(id, title))
    })
}


export default reducer;