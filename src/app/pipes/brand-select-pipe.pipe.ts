import { Pipe, PipeTransform } from '@angular/core';
import { Brand } from '../models/brand';

@Pipe({
  name: 'brandSelectPipe'
})
export class BrandSelectPipePipe implements PipeTransform {

  transform(value: Brand[], brandFilterText: string): Brand[] {
    brandFilterText = brandFilterText?brandFilterText.toLocaleLowerCase():""
    return brandFilterText?value.filter((b:Brand)=>b.name.toLocaleLowerCase().indexOf(brandFilterText)!==-1):value;
  }

}
