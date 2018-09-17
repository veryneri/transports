import {
  trigger,
  style,
  transition,
  animate,
  keyframes,
  query,
  stagger
} from '@angular/animations';
import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {
 FormBuilder,
 FormGroup,
 Validators
} from '@angular/forms';

import { AlertViewComponent } from '../_components';
import { Vehicle } from '../_interfaces';
import { VehicleService } from '../services';
import { SelectOption } from '../_components/select/select-option.interface';
import { Subscription } from 'rxjs/Subscription';
import { VEHICLE_TYPES } from '../_constants';

@Component({
  selector: 'transports-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss'],
  animations: [
    trigger(
      'vehicles',
      [
        transition(
          '* => *',
          [
            query(
              ':enter',
              style({ opacity: 0 }),
              { optional: true }
            ),
            query(
              ':enter',
              stagger(
                '300ms',
                [
                  animate(
                    '0.6s ease-in',
                    keyframes(
                      [
                        style(
                          {
                            opacity: 0,
                            transform: 'translateY(-75%)',
                            offset: 0
                          }
                        ),
                        style(
                          {
                            opacity: 0.5,
                            transform: 'translateY(35px)',
                            offset: 0.5
                          }
                        ),
                        style(
                          {
                            opacity: 1,
                            transform: 'translateY(0)',
                            offset: 1
                          }
                        )
                      ]
                    )
                  )
                ]
              ),
              { optional: true }
            )/*,
            query(
              ':leave',
              stagger(
                '300ms',
                [
                  animate(
                    '0.6s ease-in',
                    keyframes(
                      [
                        style(
                          {
                            opacity: 1,
                            transform: 'translateY(0)',
                            offset: 0
                          }
                        ),
                        style(
                          {
                            opacity: 0.5,
                            transform: 'translateY(35px)',
                            offset: 0.5
                          }
                        ),
                        style(
                          {
                            opacity: 0,
                            transform: 'translateY(-75%)',
                            offset: 1
                          }
                        )
                      ]
                    )
                  )
                ]
              ),
              { optional: true }
            )*/
          ]
        ),
      ]
    )
  ]
})
export class VehiclesComponent implements OnInit, OnDestroy {

  @ViewChild(AlertViewComponent) addVehicleAlertView: AlertViewComponent;
  currentVehicle: Vehicle = undefined;
  vehicleTypes: Array<SelectOption> = [];
  vehicles: any = [];
  vehicleForm: FormGroup;
  loading = true;
  newVehicle: Vehicle = undefined;
  displayVehicle: Vehicle = undefined;
  subscriptions: Array<Subscription> = [];

  constructor(
    private _vehicleService: VehicleService,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.clearCurrentVehicle();
    this.vehicleTypes = VEHICLE_TYPES.map((label, index) => (
      {
        label,
        value: index + 1
      }
    ));
    this.vehicleForm = this._formBuilder.group({
      licensePlate: ['', Validators.required]
    });
    this.getVehicles();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  clearCurrentVehicle() {
    this.currentVehicle = {
      _id: undefined,
      licensePlate: '',
      vehicleType: undefined
    };
  }

  getVehicles(cb?: Function) {
    this.loading = true;
    this.vehicles = [];
    this.subscriptions.push(
      this._vehicleService.getVehicles()
        .subscribe(
          vehicles => {
            console.log(vehicles);
            this.loading = false;
            this.vehicles = vehicles;
            if (cb) {
              cb();
            }
          },
          err => {
            console.log(err);
            if (cb) {
              cb();
            }
          }
        )
      );
  }

  hideAddVehicleAlertView() {
    this.addVehicleAlertView.dismiss();
  }

  onChangeVehicleType(selectedVType) {
    console.log(selectedVType);
    this.currentVehicle.vehicleType = selectedVType.value;
  }

  deleteVehicle(_id: string) {
    this.subscriptions.push(
      this._vehicleService
        .deleteVehicle(_id)
        .subscribe(
          res => {
            console.log('res: ', res);
            // this.vehicles.splice(i, 1);
            this.getVehicles();
          },
          err => console.log('err: ', err)
        )
      );
  }

  showAddVehicleAlertView() {
    this.clearCurrentVehicle();
    this.addVehicleAlertView.show();
  }

  saveVehicle() {
    this.loading = true;
    console.log(this.currentVehicle);

    if (this.currentVehicle._id) {
      this.subscriptions.push(
        this._vehicleService
          .updateVehicle(
            this.currentVehicle._id,
           this.currentVehicle
          )
          .subscribe(
            vehicle => {
              this.getVehicles(() => {
                this.loading = false;
                this.clearCurrentVehicle();
                this.addVehicleAlertView.dismiss();
                // this.
              });
            },
            err => console.log(err)
          )
      );
    } else {
      this.subscriptions.push(
        this._vehicleService
          .createVehicle(this.currentVehicle)
          .subscribe(
            vehicle => {
              this.getVehicles(() => {
                this.loading = false;
                this.clearCurrentVehicle();
                this.addVehicleAlertView.dismiss();
                // this.
              });
            },
            err => console.log(err)
          )
      );
    }
  }

  showVehicleDetail(vehicleId) {
    this.subscriptions.push(
      this._vehicleService.getVehicle(vehicleId)
        .subscribe(
          vehicle => {
            console.log(vehicle);
            this.currentVehicle = vehicle;
            this.displayVehicle = vehicle;
            this.addVehicleAlertView.show();
          },
          err => console.log(err)
        )
      );
  }
}
