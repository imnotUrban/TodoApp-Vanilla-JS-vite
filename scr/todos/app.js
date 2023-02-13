import html from './app.html?raw';
import todoStore, { Filters } from '../store/todo.store';
import { renderTodos, renderPending} from './use-cases';


/**
 * 
 * @param {String} elementId elemento que renderiza la app 
 */

const ElementIDs = {
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    completed: '.clear-completed',
    TodoFilters: '.filtro',
    PendingCountLabel: '#pending-count',
}


export const App = (elementId) =>{

    const displayTodos = () =>{
        const todos = todoStore.getTodo(todoStore.getCurrentFilter());
        renderTodos(ElementIDs.TodoList, todos);
        updatePendingCount();
    }

    const updatePendingCount = () =>{
        renderPending(ElementIDs.PendingCountLabel);
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
    const todoListUl = document.querySelector(ElementIDs.TodoList);
    const clearCompletedButton = document.querySelector(ElementIDs.completed);
    const filtersLi = document.querySelectorAll(ElementIDs.TodoFilters);

    //Listener
    newDescriptionInput.addEventListener('keyup', (event)=> {
        if(event.keyCode !== 13) return; //Cualquier tecla de precione no continuará la ejecucion a menos que sea Enter (13)
        if(event.target.value.trim().length === 0) return; //Si esta vacio no hará nada
        todoStore.addTodo(event.target.value);
        displayTodos();
        event.target.value = '';
    });


    todoListUl.addEventListener('click', (event)=>{
        const elementName = event.target.className; //Padre ma cercano
        const element = event.target.closest('[data-id]') //Padre ma cercano
        if(elementName !== 'destroy'){
            todoStore.toggleTodo(element.getAttribute('data-id'));
            displayTodos();
        }else{
            todoStore.deleteTodo(element.getAttribute('data-id'));
            displayTodos();
        }
    });
    
    clearCompletedButton.addEventListener('click', () =>{
        todoStore.deleteCompleted();
        displayTodos();
    });
    

    filtersLi.forEach(element => {
        element.addEventListener('click', (element) => {
            filtersLi.forEach( el => el.classList.remove('selected'));
            element.target.classList.add('selected');

            switch( element.target.text ){
                case 'Todos':
                    todoStore.setFilter( Filters.All )
                break;
                case 'Pendientes':
                    todoStore.setFilter( Filters.Pending )
                break;
                case 'Completados':
                    todoStore.setFilter( Filters.Completed )
                break;
            }
            displayTodos();
        });
    });
}