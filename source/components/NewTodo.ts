import {Component, Inject} from 'angular2/core';

import {TasksService, ITask} from '../services/TasksService';
import {Task} from '../Task';

@Component({
    selector: 'new-todo',
    template: `
        <form class="form-horizontal"
              (ngSubmit)="addNewTask()">
            <div class="form-group">
                <input type="text"
                       class="form-control"
                       placeholder="Text input"
                       [(ngModel)]="task.name"
                       required>
            </div>
            <div class="form-group">
                <textarea class="form-control"
                          rows="3"
                          [(ngModel)]="task.description"></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Add</button>
        </form>
    `
})
export class NewTodo {

    public task = new Task('', '', false);

    constructor(@Inject(TasksService) private TasksService) {}

    addNewTask() {
        this.TasksService.addTask(this.task.name, this.task.description);
        this.task.name = '';
        this.task.description = '';
    }
}
