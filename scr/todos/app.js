import html from './app.html?raw';
/**
 * 
 * @param {String} elementId elemento que renderiza la app 
 */

export const App = (elementId) =>{

    //Cuando la App() se llama [función autoinvocada]
    (()=>{
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
    })();

}