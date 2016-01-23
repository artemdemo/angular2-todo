import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';

export interface ITask {
    id: string;
    name: string;
    description: string;
    done: boolean;
}

@Injectable()
export class TasksService {

    public tasks: Observable<ITask>;
    private _tasksObserver: any;
    private _tasks: ITask[];

    public selectedTask: Observable<ITask>;
    private _selectedTaskObserver: any;

    constructor() {
        this.setDefaultTask();

        this.selectedTask = new Observable(observer =>
            this._selectedTaskObserver = observer);

        this.tasks = new Observable(observer =>
            this._tasksObserver = observer);
    }

    addTask(taskName: string, description: string = '') {
        this._tasks.push({
            id: this.UUID(),
            name: taskName,
            description: description,
            done: false
        });
        this._tasksObserver.next(this._tasks);
    }

    toggleDone(taskId: string) {
        this._tasks.forEach((task: ITask, i) => {
            if(task.id == taskId) {
                this._tasks[i].done = ! task.done;
            }
        });
        this._tasksObserver.next(this._tasks);
    }

    selectTask(task) {
        this._selectedTaskObserver.next(task);
    }

    removeTask(taskId: string) {
        this._tasks = this._tasks.filter(task => task.id != taskId);
        this._tasksObserver.next(this._tasks);
    }

    fetchTasks() {
        this._tasksObserver.next(this._tasks);
    }

    private setDefaultTask() {
        this._tasks = [
            {
                id: "47665aae-4079-45ee-a789-e8145e1cde1e",
                name: "Went to ECMAScript 6 conference",
                description: "Great intro to ES6 features. The problem that still remains though is tooling. I find it pretty hard to decide on what to use, even though there are not many. I tried 6to5 and got pretty good results but Traceur is maintained by Google which makes the way to go hard to choose. I would be happy to hear some opinions on this.",
                done: false
            },
            {
                id: "bd3cd2f3-1889-4877-afa2-81fcea66c089",
                name: "Learn Angular 2",
                description: "Angular 2 is the next version of Google's massively popular MV* framework for building complex applications in the browser (and beyond).",
                done: false
            },
            {
                id: "256866d3-551c-431e-82bb-34cb65f59596",
                name: "Buy book about TypeScript",
                description: "TypeScript Revealed is a quick 100-page guide to Anders Hejlsberg's new take on JavaScript. With this brief, fast-paced introduction to TypeScript, .NET, Web and Windows 8 application developers who are already familiar with JavaScript will easily get up to speed with TypeScript",
                done: true
            }
        ];
    }

    private UUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
            /[xy]/g,
            (c) => {
                let r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
                return v.toString(16);
            });
    }
}
