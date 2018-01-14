import {NgModule} from '@angular/core';
import {
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatCardModule,
  MatToolbarModule,
  MatMenuModule,
  MatIconModule,
  MatTooltipModule,
  MatDialogModule,
  MatCheckboxModule,
  MatProgressBarModule,
  MatProgressSpinnerModule
} from '@angular/material';


@NgModule({
  imports: [MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatDialogModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatProgressSpinnerModule],

  exports: [MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatDialogModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatProgressSpinnerModule],
})
export class MaterialModule {
}
