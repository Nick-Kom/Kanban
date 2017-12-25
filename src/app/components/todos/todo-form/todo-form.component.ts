import {Component, Output, EventEmitter} from '@angular/core'
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'todo-form',
    templateUrl: 'todo-form.component.html',
    styleUrls: ['todo-form.component.less', '../../../styles/alert.less']
})
export class TodoFormComponent {
    title: string = '';
    titleForm: FormGroup;
    @Output() create: EventEmitter<string> = new EventEmitter();


    constructor(private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.titleForm = this.formBuilder.group({
            title: ['',
                [
                    Validators.minLength(3),
                    Validators.maxLength(40)
                ]]
        });
    }

    onSubmit() {
        this.create.emit(this.titleForm.value.title);
    }
}