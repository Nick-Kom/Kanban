import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {TodoListComponent} from "./todo-list.component";
import {TodoService} from "../todo.service";
import {TodoItemModule} from "../todo-item/todo-Item.module";

@NgModule({
    imports: [
        BrowserModule,
        TodoItemModule
    ],
    declarations: [
        TodoListComponent
    ],
    providers: [
        TodoService
    ],
    exports: [
        TodoListComponent
    ]
})

export class TodoListModule { }
