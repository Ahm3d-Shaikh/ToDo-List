import { NgModule, enableProdMode} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],

  providers: [],
})
export class AppModule { }

