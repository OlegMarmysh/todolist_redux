const ADD_TODO = 'ADD_TODO';
const ADD_TASK= 'ADD_TASK';
const CHANGE_TASK= 'CHANGE_TASK';
const DELETE_TODO= 'DELETE_TODO';
const DELETE_TASK = 'DELETE_TASK';
const SET_TODOLIST = 'SET_TODOLIST';
const SET_TASKS = 'SET_TASKS';


const initialState = {
    todoLists: [
    /*{id: 0, title: 'React', tasks: [{id: 0, title: 'ss', isDone: false, priority: 'low'}]},
    {id: 1, title: 'JS', tasks: [{id: 1, title: 'aa', isDone: true, priority: 'high'}]}*/
]
};

const reducer = (state=initialState, action) => {
    switch (action.type){
        case ADD_TODO:{
            return {
                ...state,
                todoLists: [action.todoList, ...state.todoLists]
            }
        }
        case ADD_TASK: {
            return {
                ...state,
                todoLists: state.todoLists.map(el=>{
                    if (el.id === action.todolistId){
                        return {...el,
                            tasks: [...el.tasks, action.task]
                        }
                    }else {
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
                            tasks: t.tasks.map (task => {
                                if (task.id === action.taskid){
                                    return {...task, ...action.obj}
                                }else {
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
                todoLists: state.todoLists.filter(t=> t.id !== action.todoListId)
                /* todoLists: this.state.todoLists.filter(t => t.id !== id)*/
            }
        }
        case DELETE_TASK: {
            return  {
                ...state,
                todoLists: state.todoLists.map(t=>{
                    if(t.id === action.todoListId){
                        return {
                            ...t,
                            tasks: t.tasks.filter(task => task.id !== action.taskId)
                        }
                    }else {
                        return t
                    }
                })
            }
        }
        case SET_TODOLIST:{
            return {
                ...state,
                todoLists: action.todoList.map(tl => ({...tl, tasks: []}))
            }
        }
        case SET_TASKS: {
            return  {
                ...state,
                todoLists: state.todoLists.map( tl => {
                    if(tl.id === action.todolistId){
                        return {
                            ...tl,
                            tasks: action.tasks
                        }
                    }else {
                        return tl
                    }
                })
            }
        }
        default: return state
    }
    return state;
}

export const addTodoAC = (todoList) => {
    return {
        type: ADD_TODO,
        todoList
    }
};

export const deleteTodoAC = (todoListId) => {
    return {
        type: DELETE_TODO,
        todoListId
    }
};

export const addTaskAC = (todolistId, task) => {
    return {
        type: ADD_TASK,
        todolistId,
        task
    }
};

export const deleteTaskAC = (todoListId, taskId) => {
    return {
        type: DELETE_TASK,
        todoListId,
        taskId
    }
};

export const changeTaskAC = (todolistId, taskid, obj) => {
    return {
        type: CHANGE_TASK,
        todolistId,
        taskid,
        obj
    }
};

export const setTodoAC = (todoList) => {
    return {
        type: SET_TODOLIST,
        todoList
    }
};

export const setTasksAC = (todolistId, tasks) => {
    return {
        type: SET_TASKS,
        todolistId,
        tasks
    }
};

export default reducer;