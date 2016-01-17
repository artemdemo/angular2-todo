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
        <p>{{selectedTask.description}}</p>
        <button class="pure-button button-success"
                (click)="toggleTaskDone()"
                [ngClass]="{'button-success': selectedTask.done == false}">
            <span *ngIf="selectedTask.done == false">Mark Done</span>
            <span *ngIf="selectedTask.done == true">Undone</span>
        </button>
        <button class="pure-button button-error"
                (click)="removeSelectedTask()">Remove</button>
    </div>
    `
})
export class TaskView {
    selectedTask:ITask;

    constructor(@Inject(TasksService) private TasksService) {
        TasksService.selectedTask.subscribe(newSelectedTask => this.selectedTask = newSelectedTask);
        TasksService.fetchTasks();
    }

    removeSelectedTask() {
        this.TasksService.removeTask(this.selectedTask.id);
        this.selectedTask = null;
    }

    toggleTaskDone() {
        this.TasksService.toggleDone(this.selectedTask.id);
    }
}
