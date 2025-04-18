import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appCustomMasking]'
})

export class CustomMaskingDirective {

  @Input('appCustomMasking') maskPattern:string='';

  constructor(private el :ElementRef) { }
  
  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const input = this.el.nativeElement;
    let value = input.value.replace(/\D/g, ''); 
    let masked = '';
    let index = 0;

    for (let char of this.maskPattern) {
      if (char === 'X') {
        if (value[index]) {
          masked += value[index++];
        } else {
          break;
        }
      } else {
        masked += char;
      }
    }

    input.value = masked;
  }

}
