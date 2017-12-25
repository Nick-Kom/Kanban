import {NgModule} from '@angular/core';
import {MatButtonModule, MatInputModule, MatFormFieldModule, MatCardModule, MatToolbarModule,
  MatMenuModule, MatIconModule,MatTooltipModule,MatDialogModule} from '@angular/material';


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
    MatDialogModule],
  exports: [MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatDialogModule],
})
export class MaterialModule {
}
