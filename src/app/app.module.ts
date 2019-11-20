import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NormalizerService } from './services/normalizer.service';
import { DndDirective } from './directives/dnd.directive';
import { UploaderComponent } from './uploader/uploader.component';
import { ReadmeComponent } from './readme/readme.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    AppComponent,
    DndDirective,
    UploaderComponent,
    ReadmeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatInputModule,
    MatFormFieldModule
  ],
  providers: [NormalizerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
