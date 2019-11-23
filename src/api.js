import axios from 'axios'

const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0/todo-lists`,
    withCredentials: true,
    headers: {'API-KEY': 'f886d0ad-c005-4c6a-95be-b337dfab64f4'}
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