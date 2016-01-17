import {Component, View, Inject} from 'angular2/core';

import {TasksService, ITask} from '../services/TasksService';
import {Task} from '../Task';

@Component({
    selector: 'new-task'
})
@View({
    template: `
    <form class="pure-form add-task-form"
          (ngSubmit)="addNewTask()">

        <fieldset class="pure-group">
            <legend>Add new task</legend>
            <input type="text"
                   class="pure-input-1-2"
                   placeholder="Name"
                   [(ngModel)]="task.name"
                   required>
            <textarea class="pure-input-1-2"
                      placeholder="Description"
                      [(ngModel)]="task.description"></textarea>
        </fieldset>

        <button type="submit"
                class="pure-button pure-input-1-2 pure-button-primary">
                Add task
        </button>
    </form>
    `
})
export class NewTask {
    public task = new Task('','',false);

    constructor(@Inject(TasksService) private TasksService) {}

    addNewTask() {
        this.TasksService.addTask(this.task.name, this.task.description);
        this.clearTask();
    }

    clearTask() {
        this.task.name = '';
        this.task.description = '';
        this.task.done = false;
    }
}
