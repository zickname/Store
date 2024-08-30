import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'digitsCurrency',
  standalone: true,
})
export class DigitsCurrencyPipe implements PipeTransform {
  transform(value: number, curruencySymbol = '$'): string {
    if (!value) {
      return '';
    }

    const formattedValue = value.toLocaleString('ru-KZ', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });

    return `${formattedValue.replace(',', ' ')} ${curruencySymbol}`;
  }
}
