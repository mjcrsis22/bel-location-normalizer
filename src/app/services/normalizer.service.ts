import { Injectable } from '@angular/core';

@Injectable()

export class NormalizerService {

  //characters for array split
  private profile: any = {
    rowSeparator: '\n',
    recordSeparator: '/',
    recordDataSeparator: ' '
  };

  //main function
  normalize(fileContent:string) {
    //get rows from file content
    return this.getRows(fileContent)
                //apply row join policy in new array
                .reduce(this.reduceRows.bind(this), []);
  }

  private getRows(fileContent) {
    //clean spaces from file content, then split it by its separator in profile
    return fileContent.trim().split(this.profile.rowSeparator);
  }

  private reduceRows(acc, rowContent) {
    //get records from row content
    let recs = this.getRecords(rowContent)
                    //apply record join policy in new array
                    .reduce(this.reduceRecords.bind(this), [])
                    //filter looking for unique records
                    .filter(function (rec) {
                      return !this.some(function (item) {
                        //validate equality in depth, code and description
                        return item.depth == this.depth &&
                                item.code == this.code &&
                                item.description == this.description;
                      }, rec);
                    }, acc);

    //join new records with accumulated ones
    return acc.concat(recs);
  }

  private getRecords(rowContent) {
    //clean spaces from row content, then split it by its separator in profile
    return rowContent.trim().split(this.profile.recordSeparator);
  }

  private reduceRecords(acc, recordContent, idx) {
    //destructure the code and description from record data
    let [
      code = '',
      description = ''

    ] = this.getRecordData(recordContent);

    //destructure the code and description (parental info) from previous record data
    //if root case, the value will be '-'
    let {
      code: parentCode = '-',
      description: parentDescription = '-'

    } = acc[idx-1] || {};

    //validate the code and description have value
    if (code != '' || description != '') {

      //add record data in preliminar array
      acc.push({
        depth: idx+1,
        code: code,
        description: description,
        parentCode: parentCode,
        parentDescription: parentDescription
      });

    }

    return acc;
  }

  private getRecordData(recordContent) {
    //clean spaces from record content, then split it by its separator in profile
    let data = recordContent.trim().split(this.profile.recordDataSeparator);
    //return a new array with 1st data (code) and the rest joined (description)
    return [data.shift().trim(), data.join(this.profile.recordDataSeparator).trim()];
  }

}
