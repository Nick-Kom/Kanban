import {Component, Input} from '@angular/core';
import {Todo} from './todo';
import {TodoService} from './todo.service'
import {Card} from "../cards/card";

@Component({
  selector: 'todo',
  templateUrl: 'todo.template.html'
})
export class TodoComponent {
  @Input() card: Card;
  todos: Todo[];

  constructor(private todoService: TodoService) {
  }

  ngOnInit() {
    this.todoService.getTodos().subscribe((todos: Todo[]) => {
      this.todos = todos.filter(todo => todo.cardId == this.card.id);
      console.log(todos)
    });
  }


  deleteToDo(todo: Todo) {
    this.todoService.deleteTodo(todo)
  }

  togglel(todo: Todo) {
    this.todoService.toggleTodo(todo)
  }
  createTodoTitle(event) {
    let todo: Todo = {
      id: '',
      completed: false,
      title: event,
      cardId: this.card.id
    }
    console.log(todo)
    this.todoService.createTodo(todo)
  }

}
