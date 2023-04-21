import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {DataModule} from '../data/data.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    DataModule
  ]
})
export class CoreModule { }
