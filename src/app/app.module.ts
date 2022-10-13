import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from '@core';
import { HttpClientModule } from '@angular/common/http';
import { ModalErrorComponent } from '@shared/components';
import { SessionService } from '@services';

@NgModule({
  declarations: [
    AppComponent,
    ModalErrorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule
  ],
  providers: [SessionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
