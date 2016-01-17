import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';

export interface ITask {
    id: string;
    name: string;
    done: boolean
}

@Injectable()
export class TasksService {
    private tasks:ITask[] = null;

    selectedTask:Observable<ITask>;
    private _selectedTaskObserver: any;


    constructor() {
        this.setDefaultTasks();

        // Create Observable Stream to output our data
        this.selectedTask = new Observable(observer =>
            this._selectedTaskObserver = observer);
    }

    /**
     * Return tasks
     * @returns ITask[]
     */
    getTasks() {
        return this.tasks;
    };

    /**
     * Mark task as done
     * @param taskId
     */
    toggleDone(taskId: string) {
        this.tasks.forEach((task, i) => {if(task.id == taskId){
            this.tasks[i].done = ! task.done;
        }});
    }

    /**
     * Add task to the list of tasks
     * @param taskName
     */
    addTask(taskName: string) {
        this.tasks.push({
            id: this.UUID(),
            name: taskName,
            done: false
        });
        return this.tasks;
    }

    selectTask(taskId: string) {
        this.tasks.forEach((task) => {if(task.id == taskId){
            this._selectedTaskObserver.next(task);
        }});
    }

    /**
     * Set default tasks
     */
    private setDefaultTasks() {
        this.tasks = [
            {
                id: "47665aae-4079-45ee-a789-e8145e1cde1e",
                name: "Went to ECMAScript 6 conference",
                done: false
            },
            {
                id: "bd3cd2f3-1889-4877-afa2-81fcea66c089",
                name: "Learn Angular 2",
                done: false
            },
            {
                id: "256866d3-551c-431e-82bb-34cb65f59596",
                name: "Buy book about TypeScript",
                done: true
            }
        ]
    }

    /**
     * Generate UUID
     * @source http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/2117523#2117523
     * @returns {string}
     */
    private UUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
            /[xy]/g,
            (c) => {
                let r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
                return v.toString(16);
            });
    }

}
