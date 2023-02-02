import './style.css'
import { App } from './scr/todos/app';

import todoStore from './scr/store/todo.store';

todoStore.initStore();


App('#app');