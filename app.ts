/// <reference path="typings/angular2/angular2.d.ts" />

import {Component, View, bootstrap, For} from 'angular2/angular2';

import {TasksService} from 'TasksService';

/**
 * Add to-do component
 * Child of main
 */
@Component({
    selector: 'addtodo',
    injectables: [TasksService]
})
@View({
    template: `
    <p class="input-group">
        <!--
         Creating input with new variable #new_todo that will contain reference to input
         -->
        <input #newtodo type="text" class="form-control" placeholder="Add new task">
        <span class="input-group-btn">
            <button class="btn btn-default" type="button" (click)="addToDo( newtodo )">Add!</button>
        </span>
    </p>
    `
})
class AddtodoComponent {

    // This variable will contain injected service
    tasksService: TasksService;

    constructor( tasksService: TasksService ) {
        this.tasksService = tasksService;
    }

    // Add to-do to the list
    addToDo( newtodo: HTMLInputElement ) {
        if ( !! newtodo.value )
            this.tasksService.addToDo( newtodo.value );
        newtodo.value = '';
    }
}



/**
 * Main Component
 */
@Component({
    selector: 'todo',
    injectables: [TasksService]
})
@View({
    template: `
    <addtodo></addtodo>
    <p>Tasks:</p>
    <ul class="tasks-list">
     <li class="task-item" *for="#item of tasks; #i = index" [class.done]=" item.done == true ">
         <span class="text">
            {{ i }}.
            {{ item.name }}
         </span>
         <!--
            Pay attention to caret sign before click -  (^click)
            That means we don't attach the handler directly to the DOM node, rather we let it bubble and be handled at the document level.
            In other words without caret click will be stuck on <span> tag and wouldn't reach toggleDone() function
         -->
        <button type="button" class="btn btn-primary btn-xs" (^click)="toggleDone( item )">
            <span [hidden] = " item.done == true ">Mark done</span>
            <span [hidden] = " item.done != true ">Undone</span>
        </button>
        <button type="button" class="btn btn-danger btn-xs" (click)="remove( item )">Remove!</button>
     </li>
    </ul>
    `,
    directives: [For, AddtodoComponent]
})
class ToDoComponent {
    tasksService: TasksService;
    tasks;

    constructor( tasksService: TasksService ) {
        this.tasksService = tasksService;
        this.tasks = this.tasksService.getTasks();
    }

    toggleDone( item ) {
        this.tasksService.toggleDone( item.id );
    }

    remove( item ) {
        this.tasksService.deleteTaskById( item.id );
    }
}


bootstrap(ToDoComponent);
