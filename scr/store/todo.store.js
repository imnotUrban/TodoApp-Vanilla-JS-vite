import { Todo } from "../todos/models/todo.model";

const Filters = {
    All: 'all',
    Completed: 'Completed',
    Pending: 'Pending'
}


const state = {
    todos: [
        new Todo('Piedra del alma'),
        new Todo('Piedra del infinito'),
        new Todo('Piedra del tiempo'),
        new Todo('Piedra del xd'),
    ],
    filter: Filters.All,
}

const initStore = () => {
    console.log(state);
    console.log('InitStore');
}

const loadStore = () =>{
    throw new Error('Not implemented');
}
/**
 * 
 * @param {string} description Agrega un todo a la lista
 */
const addTodo = (description) => {

    if(!description) throw new Error('Description is required');
    state.todos.push(new Todo(description));
}
const getTodo = (filter = Filters.All) => {
    switch(filter){
        case Filters.All:
            return [...state.todos];
        case Filters.Completed:
            return state.todos.filter(todo => todo.done);
        case Filters.Pending:
            return state.todos.filter(todo => !todo.done);
        default:
            throw new Error(`Option ${ filter } is not valid`);
        }

}
/**
 * cambia los todos de completado o no
 * @param {string} todoId  
 */
const toggleTodo = (todoId) => {
    state.todos = state.todos.map(todo => {
        if(todo.id === todoId){
            todo.done =! todo.done;
        }
        return todo;
    });
}
const deleteTodo = (todoId) => {
    state.todos = state.todos.filter(todo => todo.id !== todoId);
}

const deleteCompleted = (todoId) => {
    state.todos = state.todos.filter(todo => todo.done);
}
/**
 * 
 * @param {Filters} newFilter 
 */
const setFliter = (newFilter = Filters.All) => {
    state.filter = newFilter();
}

const getCurrentFilter = () => {
    return state.filter;
}

export default {
    addTodo,
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    initStore,
    loadStore,
    setFliter,
    getTodo,
    toggleTodo,
}