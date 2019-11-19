import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NormalizerService } from './services/normalizer.service';
import { DndDirective } from './directives/dnd.directive';
import { UploaderComponent } from './uploader/uploader.component';

@NgModule({
  declarations: [
    AppComponent,
    DndDirective,
    UploaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [NormalizerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
