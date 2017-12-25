import {Component, Optional} from "@angular/core";
import {MatDialogRef} from "@angular/material";

@Component({
    template: `
        <div class="alert-body">
            <h2 class="alert-heading">Do you realy want to delete this item?</h2>
            <button class="btn-delete"
                    mat-raised-button
                    (click)="dialogRef.close({delete: true})">
                Delete
            </button>
            <button class="btn-close"
                    mat-raised-button (click)="dialogRef.close()">
                Close
            </button>
        </div>
    `,
    styleUrls: ['./alert.less']
})

export class AlertConfirmDeleting {
    constructor(@Optional() public dialogRef: MatDialogRef<AlertConfirmDeleting>) {
    }
}
