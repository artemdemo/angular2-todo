import {Component, Inject} from 'angular2/core';

import {TasksService, ITask} from '../services/TasksService';

@Component({
    selector: 'todo-view',
    template: `
        <div *ngIf="selectedTask">
            <h3>{{ selectedTask.name }}</h3>
            <p>{{ selectedTask.description }}</p>
            <button type="button"
                    class="btn"
                    [ngClass]="{'btn-success': selectedTask.done == false,
                                'btn-default': selectedTask.done == true}"
                    (click)="toggleTaskDone(selectedTask)">
                    <span *ngIf="selectedTask.done == false">Done</span>
                    <span *ngIf="selectedTask.done == true">UnDone</span>
            </button>
            <button type="button"
                    class="btn btn-danger"
                    (click)="removeSelectedTask(selectedTask)">Delete</button>
        </div>
    `
})
export class TodoView {
    private selectedTask;

    constructor(@Inject(TasksService) private TasksService) {
        TasksService.selectedTask.subscribe(newSelectedTask => this.selectedTask = newSelectedTask)
    }

    toggleTaskDone(task: ITask) {
        this.TasksService.toggleDone(task.id);
    }

    removeSelectedTask(task: ITask) {
        this.TasksService.removeTask(task.id);
        this.selectedTask = null;
    }
}
