import { NgModule } from '@angular/core';
import { SpinnerComponent } from './spinner/spinner.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [SpinnerComponent],
  imports: [CommonModule],
  exports: [CommonModule, SpinnerComponent],
})
export class SharedModule {}
