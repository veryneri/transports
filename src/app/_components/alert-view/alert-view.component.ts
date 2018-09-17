import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';

@Component({
  selector: 'transports-alert-view',
  templateUrl: './alert-view.component.html',
  styleUrls: ['./alert-view.component.scss']
})
export class AlertViewComponent implements OnInit {
  @Output() onDismiss = new EventEmitter<void>();
  public visible: boolean;

  constructor() { }

  ngOnInit() {
  }

  public dismiss() {
    this.visible = false;
    this.onDismiss.emit();
  }

  public show() {
    this.visible = true;
  }

}
