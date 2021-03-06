import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'voteCount'
})
export class VoteCountPipe implements PipeTransform {

  transform(value: any, args?: any): string {
    return `(${value}/${args || 'Total'})`;
  }

}
