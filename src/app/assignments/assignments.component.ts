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
import {
  Assignment,
  Employee,
  Vehicle
} from '../_interfaces';
import {
  AssignmentService,
  EmployeeService,
  VehicleService
} from '../services';
import { SelectOption } from '../_components/select/select-option.interface';
import { Subscription } from 'rxjs/Subscription';
import { VehicleTypePipe } from '../_pipes/vehicle-type.pipe';

@Component({
  selector: 'transports-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.scss'],
  animations: [
    trigger(
      'assignments',
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
  ],
  providers: [ VehicleTypePipe ]
})
export class AssignmentsComponent implements OnInit, OnDestroy {

  @ViewChild(AlertViewComponent) addAssignmentAlertView: AlertViewComponent;
  currentAssignment: Assignment = undefined;
  assignments: Array<Assignment> = [];
  assignmentForm: FormGroup;
  employees: Array<SelectOption> = [];
  loading = true;
  newAssignment: Assignment = undefined;
  displayAssignment: Assignment = undefined;
  subscriptions: Array<Subscription> = [];
  vehicles: Array<SelectOption> = [];

  constructor(
    private _employeeService: EmployeeService,
    private _assignmentService: AssignmentService,
    private _vehicleService: VehicleService,
    private _vehicleTypePipe: VehicleTypePipe
  ) { }

  ngOnInit() {
    this.clearCurrentAssignment();
    this.getEmployees(() => {
      this.getVehicles(() => {
        this.getAssignments();
      });
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  clearCurrentAssignment() {
    this.currentAssignment = {
      _id: undefined,
      employee: '',
      vehicle: '',
      active: false,
      // ToDo: implement gMaps
      startGeoPoint: [99.556764, -44.98],
      endGeoPoint: [99.456764, -44.88]
    };
  }

  getAssignments(cb?: Function) {
    this.loading = true;
    this.assignments = [];
    this.subscriptions.push(
      this._assignmentService.getAssignments()
        .subscribe(
          assignments => {
            console.log(assignments);
            this.loading = false;
            // Use populate un backend to return
            // employee and vehicle details
            this.assignments = assignments.map((assignment: Assignment) => {
              assignment.vehicle = this.vehicles.find(v => assignment.vehicle + '' === v.value + '');
              assignment.employee = this.employees.find(e => assignment.employee + '' === e.value + '');
              return assignment;
            });
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

  getEmployees(cb?: Function) {
    this.loading = true;
    this.employees = [];
    this.subscriptions.push(
      this._employeeService.getEmployees()
        .subscribe(
          employees => {
            console.log(employees);
            this.loading = false;
            this.employees = employees.map(employee => (
              {
                label: [
                  employee.name,
                  employee.fLastName,
                  employee.mLastName
                ].join(' '),
                value: employee._id
              }
            ));
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

  getVehicles(cb?: Function) {
    this.loading = true;
    this.vehicles = [];
    this.subscriptions.push(
      this._vehicleService.getVehicles()
        .subscribe(
          vehicles => {
            console.log(vehicles);
            this.loading = false;
            this.vehicles = vehicles.map((vehicle: Vehicle) => (
              {
                label: [
                  this._vehicleTypePipe.transform(vehicle.vehicleType - 1),
                  vehicle.licensePlate
                ].join(' '),
                value: vehicle._id
              }
            ));
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

  handleError(err) {
    console.log(err);
    this.loading = false;
    const errName = JSON.parse(err._body).error.name;
    console.log(errName);
    const message = errName === 'EmployeeAlreadyAssignedError'
      ? 'El conductor ya tiene una asignación activa'
      :  errName === 'VehicleAlreadyAssignedError'
        ? 'El vehículo ya tiene una asignación activa'
        : 'Ocurrió un error recarga la pagina e intenta de nuevo';
    alert(message);
  }

  hideAddAssignmentAlertView() {
    this.addAssignmentAlertView.dismiss();
  }

  onChangeEmployee(selectedEmployee) {
    console.log(selectedEmployee);
    this.currentAssignment.employee = selectedEmployee.value;
  }

  onChangeStatus(status) {
    console.log(status);
    this.currentAssignment.active = status;
  }

  onChangeVehicle(selectedVehicle) {
    console.log(selectedVehicle);
    this.currentAssignment.vehicle = selectedVehicle.value;
  }

  deleteAssignment(_id: string) {
    this.subscriptions.push(
      this._assignmentService
        .deleteAssignment(_id)
        .subscribe(
          res => {
            console.log('res: ', res);
            // this.vehicles.splice(i, 1);
            this.getAssignments();
          },
          err => console.log('err: ', err)
        )
      );
  }

  showAddAssignmentAlertView() {
    this.clearCurrentAssignment();
    this.addAssignmentAlertView.show();
  }

  saveAssignment() {
    this.loading = true;
    console.log(this.currentAssignment);

    if (this.currentAssignment._id) {
      this.subscriptions.push(
        this._assignmentService
          .updateAssignment(
            this.currentAssignment._id,
           this.currentAssignment
          )
          .subscribe(
            vehicle => {
              this.getAssignments(() => {
                this.loading = false;
                this.clearCurrentAssignment();
                this.addAssignmentAlertView.dismiss();
                // this.
              });
            },
            err => this.handleError(err)
          )
      );
    } else {
      this.subscriptions.push(
        this._assignmentService
          .createAssignment(this.currentAssignment)
          .subscribe(
            vehicle => {
              this.getAssignments(() => {
                this.loading = false;
                this.clearCurrentAssignment();
                this.addAssignmentAlertView.dismiss();
                // this.
              });
            },
            err => this.handleError(err)
          )
      );
    }
  }

  showAssignmentDetail(vehicleId) {
    this.subscriptions.push(
      this._assignmentService.getAssignment(vehicleId)
        .subscribe(
          vehicle => {
            console.log(vehicle);
            this.currentAssignment = vehicle;
            this.displayAssignment = vehicle;
            this.addAssignmentAlertView.show();
          },
          err => console.log(err)
        )
      );
  }
}
