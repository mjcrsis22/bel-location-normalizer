import { Injectable } from '@angular/core';

@Injectable()

export class NormalizerService {

  normalize(file:any) {
    let fileReader = new FileReader();

    return new Promise(function (resolve, reject) {
      fileReader.onerror = function() {
        reject("Error");
      };

      fileReader.onloadend = function() {
        resolve(fileReader.result);
      };

      fileReader.readAsText(file);
    });
  }

}
