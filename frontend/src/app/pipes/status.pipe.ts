import { Pipe, PipeTransform } from '@angular/core';
import { status_data } from '../../data/status-priority-data';
import { Status } from '../models/status';

@Pipe({
  name: 'statusPipe',
})
export class StatusPipe implements PipeTransform {
  statuses: Status[] = status_data;

  transform(value: number, ...args: unknown[]): string {
    let status = this.statuses.find((s) => s.id === value)?.status;
    return status ? status : 'NA';
  }
}
