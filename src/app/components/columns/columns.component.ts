import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ColumnService} from "../../services/column.service";
import {Column} from "./column";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-columns',
  templateUrl: './columns.component.html',
  styleUrls: ['./columns.component.less', '../../styles/btn.less', '../../styles/alert.less']
})
export class ColumnsComponent {
  columns: any;
  boardId: any;
  newColumn: boolean = false;
  titleForm: FormGroup ;

  constructor(private route: ActivatedRoute,
              private columnService: ColumnService,
              private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.route.params
      .subscribe((params) => {
        this.boardId = params.id
        console.log('Params.Id', params.id);
        this.columnService.getId(params.id);
      });
    this.columnService.getUserColumns().subscribe(columns => {
      this.columns = columns
      console.log(columns)
    });

    this.titleForm = this.formBuilder.group({
      title: ['',
        [
          Validators.maxLength(40)
        ]]
    });

  }

  createColumn() {
    let column: Column = {
      id: '',
      date: new Date,
      title: 'new column'
    }
    this.columnService.addColumn(column)
  }

  showCreateColumn() {
    this.newColumn = true;
  }

  createColumnTitle() {
    let column: Column = {
      id:'',
      date: new Date,
      title: this.titleForm.value.title
    }
    this.columnService.addColumn(column)
    this.newColumn = false;
  }

  clearCardTitle() {
    this.newColumn = false;
  }

}
