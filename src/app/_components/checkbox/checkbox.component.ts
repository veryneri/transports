import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output
} from '@angular/core';

@Component({
  selector: 'transports-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit, OnChanges {
  @Input() defaultValue = false;
  @Input() label = 'checkbox';
  @Output() onChange = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
    console.log(this.defaultValue);
  }

  ngOnChanges(changes) {
    console.log('ngOnChanges defaultValue: ', changes);

    this.defaultValue = changes.defaultValue.currentValue;
  }

  toggle() {
    console.log('---emitted: ', this.defaultValue);
    this.onChange.emit(!this.defaultValue);
  }
}
