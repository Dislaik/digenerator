import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CopyMessageComponent } from './copy-message/copy-message.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    FooterComponent,
    CopyMessageComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    FooterComponent,
    CopyMessageComponent
  ]
})

export class ComponentModule { }
