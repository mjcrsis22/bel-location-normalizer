import {Component, ViewChild} from '@angular/core';

import {NormalizerService} from '../services/normalizer.service';

import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss']
})

export class UploaderComponent {

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  //files to normalize
  private files: any = [];
  //input value to normalize
  private txtArea: string = '';

  //file reader instance
  private fileReader: FileReader = new FileReader();

  //current normalized content
  private normalizedContentHeaders: string[] = [];
  private normalizedContent = new MatTableDataSource();

  //constructor, get and create private instance of the normalizer service and set handler for the reading operation ended
  constructor(private _normalizerService: NormalizerService) {

    //set handler for the reading operation ended
    this.fileReader.onloadend = this.readedFile.bind(this);
  }

  //called on drop event or on input file change
  uploadFile(files) {
    //iterate in case of more than one file included
    for (let index = 0; index < files.length; index++) {
      const element = files[index];

      //only can process text/plain files
      if (element.type == 'text/plain') {

        //add in list of files to normalize
        this.files.push(element);

      } else {
        console.log(`Cannot process files with type: "${element.type}"`);
      }
    }
  }

  readedFile() {
    //get file reader result as string
    let stringContent = this.fileReader.result as string;

    //call normalizer operation with file content
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
    //update input value to normalize
    this.txtArea = value;
  }

  uploadTxtArea() {
    //call normalizer operation with input value
    this.callNormalizer(this.txtArea);
  }

  uploadClear() {
    //call normalizer operation without value (clear)
    this.callNormalizer('');
  }

  callNormalizer(stringContent='') {
    //normalize received string
    let result = this._normalizerService.normalize(stringContent);

    //get result headers before set it on the data source
    this.normalizedContentHeaders = Object.keys(result[0] || {});
    this.normalizedContent = new MatTableDataSource(result);

    //set sort behavior on the new data source
    this.normalizedContent.sort = this.sort;
  }

}
