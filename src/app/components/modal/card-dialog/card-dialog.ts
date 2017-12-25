import {Component, Inject, Optional} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AlertConfirmDeleting} from "../alert-confirm/alert-confirm-deleting";
import {Card} from "../../cards/card";
import {CardService} from "../../../services/card.service";

@Component({
  selector: 'card-dialog',
  templateUrl: 'card-dialog.template.html',
  styleUrls: ['card-dialog.less',  '../../../styles/alert.less']
})
export class CardDialog {
  titleForm: FormGroup;
  cardTitle: boolean = false;
  cardDescription: boolean = false;

  constructor(private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<CardDialog>,
              private dialog: MatDialog,
              private cardService: CardService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.titleForm = this.formBuilder.group({
      title: [this.data.title ? this.data.title : '',
        [Validators.required,
          Validators.maxLength(40)
        ]],
      description: [this.data.card ? this.data.card.description : '',
        [Validators.required,
          Validators.minLength(10),
          Validators.maxLength(500)
        ]]
    });
  }


  changeCardTitle() {
    this.cardTitle = true;
  }

  changeCardDescription() {
    this.cardTitle = true;
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
  deleteCard(card:Card){
    this.cardService.deleteCard(card)
    this.dialogRef.close();
  }

  openDialog() {
    let dialogRef = this.dialog.open(AlertConfirmDeleting);
    dialogRef.afterClosed().subscribe((res: any) => {
      if (res && res.delete) {
        this.deleteCard(this.data.card)
      }
    })
  }

}
