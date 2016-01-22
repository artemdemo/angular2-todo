import 'zone.js/lib/browser/zone-microtask';
import 'reflect-metadata';
// import 'es6-shim';

import {bootstrap} from 'angular2/platform/browser';
import {provide, enableProdMode} from 'angular2/core';

import {TodoApp} from './TodoApp';
import {TasksService} from './services/TasksService';

// Uncomment following line in order to enable Production Mode
// enableProdMode();

bootstrap(TodoApp, [
    TasksService
]);
