import 'zone.js/lib/browser/zone-microtask';
import 'reflect-metadata';

import {bootstrap} from 'angular2/platform/browser';
import {provide} from 'angular2/core';

import {TodoApp} from './TodoApp';
import {TasksService} from './services/TasksService';

bootstrap(TodoApp, [
    TasksService
]);
