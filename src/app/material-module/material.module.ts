import {NgModule} from '@angular/core';
import {MatButtonModule, MatInputModule, MatFormFieldModule, MatCardModule, MatToolbarModule,
  MatMenuModule, MatIconModule,MatTooltipModule,MatDialogModule,MatCheckboxModule} from '@angular/material';


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
    MatCheckboxModule],
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
    MatCheckboxModule],
})
export class MaterialModule {
}
