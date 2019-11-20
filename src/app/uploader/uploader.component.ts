import {Component, ViewChild} from '@angular/core';

import {NormalizerService} from '../services/normalizer.service';

import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.sass']
})

export class UploaderComponent {

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  //files to normalize
  private files: any = [];
  private txtArea: string = '';

  //file reader instance
  private fileReader: FileReader = new FileReader();

  //current normalized content
  private normalizedContentHeaders: string[] = [];
  private normalizedContent = new MatTableDataSource();

  //constructor, create private instance of the normalizer service and handler for the reading operation ended
  constructor(private _normalizerService: NormalizerService) {

    //handler for the reading operation ended
    this.fileReader.onloadend = this.readedFile.bind(this);
  }

  //called on drop event or on input file change
  uploadFile(event) {
    //iterate in case of more than one file included
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      if (element.type == 'text/plain') {
        //add in list of files to normalize
        this.files.push(element)
      } else {
        console.log(`Cannot process files with type: "${element.type}"`);
      }
    }
  }

  readedFile() {
    //get file reader result as string
    let stringContent = this.fileReader.result as string;
    this.callNormalizer(stringContent);
  }

  normalizeAttachment(index) {
    //read file as plain text file
    this.fileReader.readAsText(this.files[index]);
  }

  deleteAttachment(index) {
    //remove item from list of files to normalize
    this.files.splice(index, 1)
  }

  updateTxtArea(value) {
    this.txtArea = value;
  }

  uploadTxtArea() {
    this.callNormalizer(this.txtArea);
  }

  uploadClear() {
    this.callNormalizer('');
  }

  callNormalizer(stringContent='') {
    //normalize the result using the normalizer service
    let result = this._normalizerService.normalize(stringContent);
    this.normalizedContentHeaders = Object.keys(result[0] || {});
    this.normalizedContent = new MatTableDataSource(result);

    //sort the normalized value
    this.normalizedContent.sort = this.sort;
  }

}
