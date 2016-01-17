import {Component, View, Inject} from 'angular2/core';
import {NgIf} from 'angular2/common';

import {TasksService, ITask} from '../services/TasksService';

@Component({
    selector: 'task-view'
})
@View({
    directives: [NgIf],
    template: `
    <div *ngIf="selectedTask">
        <h4>{{selectedTask.name}}</h4>
        <button class="pure-button button-success"
                *ngIf="selectedTask.done == false">Mark Done</button>
        <button class="pure-button"
                *ngIf="selectedTask.done == true">Undone</button>
        <button class="pure-button button-error"
                (click)="removeTask(selectedTask)">Remove</button>
    </div>
    `
})
export class TaskView {
    selectedTask:ITask;

    constructor(@Inject(TasksService) private TasksService) {
        TasksService.selectedTask.subscribe(newSelectedTask => this.selectedTask = newSelectedTask);
    }
}
