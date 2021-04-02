import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'find'
})
export class FindPipe implements PipeTransform {
  transform(items: any, term: any): any {    
    if (term === undefined) return items;
    let item = items.find(x => x.refundDocumentFieldType.description.toLowerCase() === term.toLowerCase());
    return item != null?item.value:'-';
  }
}