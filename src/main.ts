import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { enableProdMode } from '@angular/core';



bootstrapApplication(AppComponent, {
  providers: []
}).catch(err => console.log(err))
