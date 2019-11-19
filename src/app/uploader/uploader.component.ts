import { Component } from '@angular/core';
import { NormalizerService } from '../services/normalizer.service';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.sass']
})

export class UploaderComponent {

  files: any = [];

  constructor(private ns: NormalizerService) {

  }

  uploadFile(event) {
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      this.files.push(element)
    }  
  }

  normalizeAttachment(index) {
    let file = this.files[index];
    this.ns.normalize(file).then(function (res) {
      console.log(res);
    })
  }

  deleteAttachment(index) {
    this.files.splice(index, 1)
  }

}
