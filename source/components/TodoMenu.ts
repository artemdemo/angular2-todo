import {Component, View, Inject} from 'angular2/core';
import {NgFor} from 'angular2/common';

import {TasksService, ITask} from '../services/TasksService';

@Component({
    selector: 'todo-menu'
})
@View({
    directives: [NgFor],
    template: `
    <div class="pure-menu">
        <span class="pure-menu-heading">ToDo List</span>

        <ul class="pure-menu-list">
            <li class="pure-menu-item"
                *ngFor="#task of todoList">
                <span
                   class="pure-menu-link"
                   (click)="selectNewTask(task)">
                {{task.name}}
                </span>
            </li>
        </ul>
    </div>
    <form class="pure-form add-task-form">

        <fieldset class="pure-group">
            <legend>Add new task</legend>
            <input type="text" class="pure-input-1-2" placeholder="Name">
            <textarea class="pure-input-1-2" placeholder="Description"></textarea>
        </fieldset>

        <button type="submit"
                class="pure-button pure-input-1-2 pure-button-primary">
                Add task
        </button>
    </form>
    `
})
export class TodoMenu {
    todoList:ITask[] = [];

    constructor(@Inject(TasksService) private TasksService) {
        this.todoList = TasksService.getTasks();
    }

    selectNewTask(task:ITask) {
        this.TasksService.selectTask(task.id);
    }

    addNewTask() {
        this.TasksService.addTask('Task Example');
    }

}
