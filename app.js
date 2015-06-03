/// <reference path="typings/angular2/angular2.d.ts" />
if (typeof __decorate !== "function") __decorate = function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
if (typeof __metadata !== "function") __metadata = function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require('angular2/angular2');
/**
 * Main tasks object.
 * Case it's global - it will allow model update it in all components
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
var TasksService = (function () {
    function TasksService() {
        this.tasks = tasks;
    }
    TasksService.prototype.getTasks = function () {
        return this.tasks;
    };
    TasksService.prototype.deleteTaskById = function (id) {
        for (var i = 0, len = tasks.length; i < len; i++) {
            if (tasks[i].id == id) {
                tasks.splice(i, 1);
                break;
            }
        }
    };
    TasksService.prototype.addToDo = function (todo) {
        tasks.push({
            id: this.UUID(),
            name: todo,
            done: false
        });
        this.tasks = tasks;
    };
    TasksService.prototype.UUID = function () {
        // Otherwise, just use Math.random
        // http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/2117523#2117523
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
    return TasksService;
})();
/**
 * Add to-do component
 * Child of main
 */
var AddtodoComponent = (function () {
    function AddtodoComponent(tasksService) {
        this.tasksService = tasksService;
    }
    // Add to-do to the list
    AddtodoComponent.prototype.addToDo = function (newtodo) {
        this.tasksService.addToDo(newtodo.value);
        newtodo.value = '';
    };
    AddtodoComponent = __decorate([
        angular2_1.Component({
            selector: 'addtodo',
            injectables: [TasksService]
        }),
        angular2_1.View({
            template: "\n    <p class=\"input-group\">\n        <!--\n         Creating input with new variable #new_todo that will contain reference to input\n         -->\n        <input #newtodo type=\"text\" class=\"form-control\" placeholder=\"Add new task\">\n        <span class=\"input-group-btn\">\n            <button class=\"btn btn-default\" type=\"button\" (click)=\"addToDo( newtodo )\">Add!</button>\n        </span>\n    </p>\n    "
        }), 
        __metadata('design:paramtypes', [TasksService])
    ], AddtodoComponent);
    return AddtodoComponent;
})();
/**
 * Main Component
 */
var ToDoComponent = (function () {
    function ToDoComponent(tasksService) {
        this.tasksService = tasksService;
        this.tasks = this.tasksService.getTasks();
    }
    ToDoComponent.prototype.markDone = function (item) {
        console.log(item);
    };
    ToDoComponent.prototype.remove = function (item) {
        this.tasksService.deleteTaskById(item.id);
    };
    ToDoComponent = __decorate([
        angular2_1.Component({
            selector: 'todo',
            injectables: [TasksService]
        }),
        angular2_1.View({
            template: "\n    <addtodo></addtodo>\n    <p>Tasks:</p>\n    <ul class=\"tasks-list\">\n     <li class=\"task-item\" *for=\"#item of tasks \">\n        {{ item.name }}\n        <button type=\"button\" class=\"btn btn-primary btn-xs\" (click)=\"markDone( item )\">Mark done</button>\n        <button type=\"button\" class=\"btn btn-danger btn-xs\" (click)=\"remove( item )\">Remove!</button>\n     </li>\n    </ul>\n    ",
            directives: [angular2_1.For, AddtodoComponent]
        }), 
        __metadata('design:paramtypes', [TasksService])
    ], ToDoComponent);
    return ToDoComponent;
})();
angular2_1.bootstrap(ToDoComponent);
