import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output
} from '@angular/core';

import { SelectOption } from './select-option.interface';

@Component({
  selector: 'transports-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit, OnChanges {
  @Input() defaultValue: any;
  @Input() name = 'select';
  @Input() placeholder = 'select';
  @Input() options: Array<SelectOption> = [];
  @Output() onChange = new EventEmitter<SelectOption>();
  active = false;
  label = '';

  constructor() { }

  ngOnInit() {
    this.label = this.placeholder;
    console.log(this.defaultValue);
    if (this.defaultValue) {
      this.setDefaultOrSelectedOption(this.defaultValue + '');
    }
  }

  ngOnChanges() {
    console.log('ngOnChanges defaultValue: ', this.defaultValue);
    if (this.defaultValue) {
      this.setDefaultOrSelectedOption(this.defaultValue + '');
    } else {
      this.label = this.placeholder;
    }
  }

  setDefaultOrSelectedOption(selectedOptionValue: string) {
    this.options.forEach(opt => {
      opt.selected = false;
      if (opt.value + '' === selectedOptionValue) {
        this.label = opt.label;
        opt.selected = true;
      }
    });
  }

  selected(selectedOption: SelectOption) {
    console.log('selected: ', selectedOption.value);
    this.setDefaultOrSelectedOption(selectedOption.value);
    this.onChange.emit(selectedOption);
  }

  toggle() {
    this.active = !this.active;
  }
}
