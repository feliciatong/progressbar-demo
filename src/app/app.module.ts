import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ProgressbarService } from './progressbar.service';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, HttpModule, BrowserAnimationsModule
  ],
  providers: [
    ProgressbarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
