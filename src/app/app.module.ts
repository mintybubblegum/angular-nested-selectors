import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule //lo importamos aqui para que sea de escala global y se pueda usar desde cualquier servicio
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
