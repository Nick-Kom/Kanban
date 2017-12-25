import {Component, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Column} from "../column";
import {ColumnService} from "../../../services/column.service";
import {CardService} from "../../../services/card.service";
import {Card} from "../../cards/card";
import {AlertConfirmDeleting} from "../../modal/alert-confirm/alert-confirm-deleting";
import {MatDialog} from "@angular/material";

@Component({
  selector: 'column-item',
  templateUrl: 'column-item.template.html',
  styleUrls: ['column-item.less', '../../../styles/alert.less']
})
export class ColumnItemComponent {
  @Input() column: Column;
  changeColumn: boolean = false;
  titleForm: FormGroup;

  constructor(private cardService: CardService,
              private formBuilder: FormBuilder,
              private dialog: MatDialog,
              private columnService: ColumnService) {
  }

  /*@HostListener('drop', ['$event'])
  onDrop($event) {

    console.log(this.column.id)
    this.cardService.getColumnId(this.column.id);
  }

  @HostListener('dragover', ['$event'])
  onDragOver($event) {
    //console.log($event)
    event.preventDefault();
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave($event) {
    //console.log($event)
  }*/

  ngOnInit() {
    this.titleForm = this.formBuilder.group({
      title: [this.column ? this.column.title : '',
        [Validators.required,
          Validators.maxLength(40)
        ]]
    });

    this.cardService.getColumnId(this.column.id);
  }


  changeColumnTitle() {
    let column: Column = {
      id: this.column.id,
      date: this.column.date,
      title: this.titleForm.value.title
    };
    this.columnService.changeColumnTitle(column);
  }

  editColumnTitle() {
    this.changeColumn = true;
  }

  clearCardTitle() {
    this.changeColumn = false;
  }

  deleteColumn(column: Column) {
    this.columnService.deleteColumn(column)
  }


  openDialog() {
    let dialogRef = this.dialog.open(AlertConfirmDeleting);
    dialogRef.afterClosed().subscribe((res: any) => {
      if (res && res.delete) {
        this.deleteColumn(this.column)
      }
    })
  }


}
