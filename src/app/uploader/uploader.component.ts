import { Component } from '@angular/core';
import { NormalizerService } from '../services/normalizer.service';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.sass']
})

export class UploaderComponent {

  //files to normalize
  private files: any = [];

  //current normalized content
  private normalizedContent: any = [];

  //file reader instance
  private fileReader: FileReader = new FileReader();

  //constructor, create private instance of the normalizer service and handler for the reading operation ended
  constructor(private _normalizerService: NormalizerService) {

    //handler for the reading operation ended
    this.fileReader.onloadend = function() {
      //get file reader result as string
      let stringContent = this.fileReader.result as string;
      //normalize the result using the normalizer service
      this.normalizedContent = this._normalizerService.normalize(stringContent);
      //sort the normalized value
      this.normalizedContent = this.normalizedContent.sort((a,b)=>a.depth>b.depth?1:-1);
    }.bind(this);
  }

  //called on drop event or on input file change
  uploadFile(event) {
    //iterate in case of more than one file included
    for (let index = 0; index < event.length; index++) {
      const element = event[index];

      //add in list of files to normalize
      this.files.push(element)
    }  
  }

  normalizeAttachment(index) {
    //read file as plain text file
    this.fileReader.readAsText(this.files[index]);
  }

  deleteAttachment(index) {
    //remove item from list of files to normalize
    this.files.splice(index, 1)
  }

}
