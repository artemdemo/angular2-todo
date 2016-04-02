import {Component} from 'angular2/core';
import {TodoList} from './components/TodoList';
import {TodoView} from './components/TodoView';

@Component({
    selector: 'todo-app',
    directives: [TodoList, TodoView],
    template: `
        <div class="row">
            <div class="col-sm-6">
                <todo-list></todo-list>
            </div>
            <div class="col-sm-6">
                <todo-view></todo-view>
            </div>
        </div>
    `
})
export class TodoApp {
    constructor() {}
}
