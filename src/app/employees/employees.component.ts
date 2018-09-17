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
import { DOCUMENT_TYPES } from '../_constants';
import { Employee } from '../_interfaces/';
import { EmployeeService } from '../services';
import { SelectOption } from '../_components/select/select-option.interface';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'transports-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
  animations: [
    trigger(
      'employees',
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
export class EmployeesComponent implements OnInit, OnDestroy {

  @ViewChild(AlertViewComponent) addEmployeeAlertView: AlertViewComponent;
  currentEmployee: Employee = undefined;
  documentTypes: Array<SelectOption> = [];
  employees: any = [];
  employeeForm: FormGroup;
  loading = true;
  newEmployee: Employee = undefined;
  displayEmployee: Employee = undefined;
  subscriptions: Array<Subscription> = [];

  constructor(
    private _employeeService: EmployeeService,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.clearCurrentEmployee();
    this.documentTypes = DOCUMENT_TYPES.map((label, index) => (
      {
        label,
        value: index + 1
      }
    ));
    this.employeeForm = this._formBuilder.group({
      name: ['', Validators.required],
      fLastName: ['', Validators.required],
      mLastName: [''],
      documentNumber: ['', Validators.required]
    });
    this.getEmployees();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  clearCurrentEmployee() {
    this.currentEmployee = {
      _id: undefined,
      name: '',
      fLastname: '',
      mLastName: '',
      documentNumber: '',
      documentType: undefined
    };
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
            this.employees = employees;
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

  hideAddEmployeeAlertView() {
    this.addEmployeeAlertView.dismiss();
  }

  onChangeDocumentType(selectedDType) {
    console.log(selectedDType);
    this.currentEmployee.documentType = selectedDType.value;
  }

  deleteEmployee(_id: string) {
    this.subscriptions.push(
      this._employeeService
        .deleteEmployee(_id)
        .subscribe(
          res => {
            console.log('res: ', res);
            // this.employees.splice(i, 1);
            this.getEmployees();
          },
          err => console.log('err: ', err)
        )
      );
  }

  showAddEmployeeAlertView() {
    this.clearCurrentEmployee();
    this.addEmployeeAlertView.show();
  }

  saveEmployee() {
    this.loading = true;
    console.log(this.currentEmployee);

    if (this.currentEmployee._id) {
      this.subscriptions.push(
        this._employeeService
          .updateEmployee(
            this.currentEmployee._id,
           this.currentEmployee
          )
          .subscribe(
            employee => {
              this.getEmployees(() => {
                this.loading = false;
                this.clearCurrentEmployee();
                this.addEmployeeAlertView.dismiss();
                // this.
              });
            },
            err => console.log(err)
          )
      );
    } else {
      this.subscriptions.push(
        this._employeeService
          .createEmployee(this.currentEmployee)
          .subscribe(
            employee => {
              this.getEmployees(() => {
                this.loading = false;
                this.clearCurrentEmployee();
                this.addEmployeeAlertView.dismiss();
                // this.
              });
            },
            err => console.log(err)
          )
      );
    }
  }

  showEmployeeDetail(employeeId) {
    this.subscriptions.push(
      this._employeeService.getEmployee(employeeId)
        .subscribe(
          employee => {
            console.log(employee);
            this.currentEmployee = employee;
            this.displayEmployee = employee;
            this.addEmployeeAlertView.show();
          },
          err => console.log(err)
        )
      );
  }
}
