import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";
import {TodoService} from "../todo.service";
import {TodoItemComponent} from "./todo-item.component";
import {MaterialModule} from "../../../material-module/material.module";


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
      MaterialModule
    ],
    declarations: [
        TodoItemComponent
    ],
    providers: [
        TodoService
    ],
    exports: [
        TodoItemComponent
    ]
})

export class TodoItemModule {
}
