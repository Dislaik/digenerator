import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainLayoutRoutes } from './main-layout.routing';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../../page/home/home.component';
import { ComponentModule } from '../../component/component.module';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    RouterModule.forChild(MainLayoutRoutes),
    ComponentModule,
    CommonModule
  ]
})
export class MainLayoutModule { }
