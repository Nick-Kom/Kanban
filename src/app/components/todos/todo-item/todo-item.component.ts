import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Todo} from "../todo";

@Component({
    selector: 'todo-item',
    templateUrl: 'todo-item.component.html',
    styleUrls: ['todo-item.component.less']
})
export class TodoItemComponent {
    @Input() todo: Todo;
    @Output() delete = new EventEmitter();
    @Output() toggle = new EventEmitter();

    onToggle() {
        this.todo.completed = !this.todo.completed
        this.toggle.emit(this.todo);
    } ;

    onDelete() {
        this.delete.emit(this.todo)
    }
}