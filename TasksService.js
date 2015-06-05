/**
 * Main tasks object.
 * Case it's global - it will allow model update it in all components
 * @type []
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
        done: true
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
    /**
     * Delete user by it's ID
     * @param id {string}
     * @returns {boolean}
     */
    TasksService.prototype.deleteTaskById = function (id) {
        for (var i = 0, len = tasks.length; i < len; i++) {
            if (tasks[i].id == id) {
                tasks.splice(i, 1);
                return true;
            }
        }
        return false;
    };
    /**
     * Mark item as done
     * @param id
     * @returns {boolean}
     */
    TasksService.prototype.toggleDone = function (id) {
        for (var i = 0, len = tasks.length; i < len; i++) {
            if (tasks[i].id == id) {
                tasks[i].done = !tasks[i].done;
                return true;
            }
        }
        return false;
    };
    TasksService.prototype.addToDo = function (todo) {
        tasks.push({
            id: this.UUID(),
            name: todo,
            done: false
        });
        this.tasks = tasks;
    };
    /**
     * Generate UUID
     * @returns {string}
     */
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
exports.TasksService = TasksService;
