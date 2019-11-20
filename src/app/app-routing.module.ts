import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReadmeComponent } from './readme/readme.component';
import { UploaderComponent } from './uploader/uploader.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', component: ReadmeComponent },
  { path: 'app', component: UploaderComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
