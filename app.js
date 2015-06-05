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
var TasksService_1 = require('TasksService');
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
        if (!!newtodo.value)
            this.tasksService.addToDo(newtodo.value);
        newtodo.value = '';
    };
    AddtodoComponent = __decorate([
        angular2_1.Component({
            selector: 'addtodo',
            injectables: [TasksService_1.TasksService]
        }),
        angular2_1.View({
            template: "\n    <p class=\"input-group\">\n        <!--\n         Creating input with new variable #new_todo that will contain reference to input\n         -->\n        <input #newtodo type=\"text\" class=\"form-control\" placeholder=\"Add new task\">\n        <span class=\"input-group-btn\">\n            <button class=\"btn btn-default\" type=\"button\" (click)=\"addToDo( newtodo )\">Add!</button>\n        </span>\n    </p>\n    "
        }), 
        __metadata('design:paramtypes', [TasksService_1.TasksService])
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
    ToDoComponent.prototype.toggleDone = function (item) {
        this.tasksService.toggleDone(item.id);
    };
    ToDoComponent.prototype.remove = function (item) {
        this.tasksService.deleteTaskById(item.id);
    };
    ToDoComponent = __decorate([
        angular2_1.Component({
            selector: 'todo',
            injectables: [TasksService_1.TasksService]
        }),
        angular2_1.View({
            template: "\n    <addtodo></addtodo>\n    <p>Tasks:</p>\n    <ul class=\"tasks-list\">\n     <li class=\"task-item\" *for=\"#item of tasks; #i = index\" [class.done]=\" item.done == true \">\n         <span class=\"text\">\n            {{ i }}.\n            {{ item.name }}\n         </span>\n         <!--\n            Pay attention to caret sign before click -  (^click)\n            That means we don't attach the handler directly to the DOM node, rather we let it bubble and be handled at the document level.\n            In other words without caret click will be stuck on <span> tag and wouldn't reach toggleDone() function\n         -->\n        <button type=\"button\" class=\"btn btn-primary btn-xs\" (^click)=\"toggleDone( item )\">\n            <span [hidden] = \" item.done == true \">Mark done</span>\n            <span [hidden] = \" item.done != true \">Undone</span>\n        </button>\n        <button type=\"button\" class=\"btn btn-danger btn-xs\" (click)=\"remove( item )\">Remove!</button>\n     </li>\n    </ul>\n    ",
            directives: [angular2_1.For, AddtodoComponent]
        }), 
        __metadata('design:paramtypes', [TasksService_1.TasksService])
    ], ToDoComponent);
    return ToDoComponent;
})();
angular2_1.bootstrap(ToDoComponent);
