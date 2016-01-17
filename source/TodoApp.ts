import {Component, View, Inject} from 'angular2/core';

import {TodoMenu} from './components/TodoMenu';
import {TaskView} from './components/TaskView';

@Component({
    selector: 'todo-app'
})
@View({
    directives: [TodoMenu, TaskView],
    template: `
    <div class="container">
        <div class="pure-g">
            <div class="pure-u-2-5">
                <todo-menu></todo-menu>
            </div>
            <div class="pure-u-3-5">
                <task-view></task-view>
            </div>
        </div>
    </div>
    `
})
export class TodoApp {
    constructor() {
    }
}
