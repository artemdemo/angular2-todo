import {Component, Inject} from 'angular2/core';
import {NewTodo} from './NewTodo';

import {TasksService} from '../services/TasksService';

@Component({
    selector: 'todo-list',
    directives: [NewTodo],
    template: `
        <ul class="nav nav-pills nav-stacked">
            <li role="presentation" *ngFor="#task of todos">
                <a href="#"
                   (click)="selectNewTask(task)"
                   [ngClass]="{'task-done': task.done}">
                    {{ task.name }}
                </a>
            </li>
        </ul>

        <new-todo></new-todo>
    `
})
export class TodoList {

    private todos = [];

    constructor(@Inject(TasksService) private TasksService) {
        TasksService.tasks.subscribe(newTasks => this.todos = newTasks);
        TasksService.fetchTasks();
    }

    selectNewTask(task) {
        this.TasksService.selectTask(task);
    }
}
