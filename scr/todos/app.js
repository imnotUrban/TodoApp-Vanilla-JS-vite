import todoStore from '../store/todo.store';
import html from './app.html?raw';
import { renderTodos } from './use-cases';
/**
 * 
 * @param {String} elementId elemento que renderiza la app 
 */

const ElementIDs = {
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input'
}

export const App = (elementId) =>{

    const displayTodos = () =>{
        const todos = todoStore.getTodo(todoStore.getCurrentFilter());
        renderTodos(ElementIDs.TodoList, todos);
    }


    //Cuando la App() se llama [función autoinvocada]
    (()=>{
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();
    })();

    //Referencias HTML -> Aca ya que antes no se habian creado

    const newDescriptionInput = document.querySelector(ElementIDs.NewTodoInput);

    //Listener
    newDescriptionInput.addEventListener('keyup', (event)=> {
        if(event.keyCode !== 13) return; //Cualquier tecla de precione no continuará la ejecucion a menos que sea Enter (13)
        if(event.target.value.trim().length === 0) return; //Si esta vacio no hará nada
        todoStore.addTodo(event.target.value);
        displayTodos();
        event.target.value = '';
    });



}