/// <reference path="typings/angular2/angular2.d.ts" />

import {Component, View, bootstrap, For} from 'angular2/angular2';

/**
 * Main tasks object.
 * Case it's global - it will allow model update in all components
 * @type {}
 */
var tasks = [
    {
        id: "76c8f4c0-3646-4e3c-b4de-7edde798fe3f",
        name: "Went to ECMAScript 6 conference",
        done: false
    },
    {
        id: "84468e23-4fca-4400-8670-09f7a8755959",
        name: "Learn Angular 2",
        done: false
    },
    {
        id: "08c6f368-cd8b-45a5-b85f-e2a9bc106587",
        name: "Buy book about TypeScript",
        done: false
    }
];

/**
 * Tasks service
 */
class TasksService {
    private tasks;

    constructor() {
        this.tasks = tasks;
    }

    getTasks() {
        return this.tasks;
    }

    addToDo( todo: string ) {
        console.log( this.UUID() );
        tasks.push({
            id: this.UUID(),
            name: todo,
            done: false
        });
        this.tasks = tasks;
    }

    private UUID() {
        // Otherwise, just use Math.random
        // http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/2117523#2117523
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
    });
}
}


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
            <button class="btn btn-default" type="button" (click)="addToDo( newtodo.value )">Add!</button>
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
    addToDo( todo ) {
        this.tasksService.addToDo( todo );

        console.log( this.tasksService.getTasks() );
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
    <ul>
     <li *for="#item of tasksService.getTasks() ">
        {{ item.name }} <button type="button" class="btn btn-primary btn-xs" (click)="markDone()">Mark done</button>
     </li>
    </ul>
    `,
    directives: [For, AddtodoComponent]
})
class ToDoComponent {
    tasksService: TasksService;

    constructor( tasksService: TasksService ) {
        this.tasksService = tasksService;
    }

    markDone() {

    }
}


bootstrap(ToDoComponent);
