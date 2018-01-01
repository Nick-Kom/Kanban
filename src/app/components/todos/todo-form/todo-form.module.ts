import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {TodoService} from "../todo.service";
import {TodoFormComponent} from "./todo-form.component";
import {ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../../../material-module/material.module";

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
      MaterialModule
    ],
    declarations: [
        TodoFormComponent
    ],
    providers: [
        TodoService
    ],
    exports: [
        TodoFormComponent
    ]
})

export class TodoFormModule {
}
