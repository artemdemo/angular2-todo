import {Component, View, Inject} from 'angular2/core';

import {TasksService, ITask} from '../services/TasksService';
import {NewTask} from "./NewTask";

@Component({
    selector: 'todo-menu'
})
@View({
    directives: [NewTask],
    template: `
    <div class="pure-menu">
        <span class="pure-menu-heading">ToDo List</span>

        <ul class="pure-menu-list">
            <li class="pure-menu-item"
                *ngFor="#task of todoList"
                [ngClass]="{done: task.done == true}">
                <span
                   class="pure-menu-link"
                   (click)="selectNewTask(task)">
                {{task.name}}
                </span>
            </li>
        </ul>
    </div>
    <new-task></new-task>
    `
})
export class TodoMenu {
    todoList:ITask[] = [];

    constructor(@Inject(TasksService) private TasksService) {
        TasksService.tasks.subscribe(newTasks => this.todoList = newTasks);
    }

    selectNewTask(task:ITask) {
        this.TasksService.selectTask(task.id);
    }

    addNewTask() {
        this.TasksService.addTask('Task Example');
    }

}
