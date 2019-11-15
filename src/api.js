import axios from 'axios'

const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0/todo-lists`,
    withCredentials: true,
    headers: {'API-KEY': '9acf6311-6475-4225-b542-39795cfac323'}
});


export const api = {
    createTodoList() {
        return instance.get('')
    },
    addTodoList(title) {
        return instance.post('', {title: title})
    },
    deleteTodoList(id){
        return instance.delete(`/${id}`)
    },
    createTasks(id){
        return instance.get(`/${id}/tasks`)
    },
    addTask(id, newText){
        return instance.post(`/${id}/tasks`, {title: newText})
    },
    changeTask(newTask){
        return instance.put(`/tasks/`, newTask)
    },
    deleteTask(taskId){
        return instance.delete(`/tasks/${taskId}`)
    },
    changeTitleTodoList(id,title){
        return instance.put(`/${id}`, {title})
    }
};