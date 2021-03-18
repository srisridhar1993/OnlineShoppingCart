import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';

import EmployeeService from '../shared/api/employee.service';
import M_Employee from '../shared/models/Employee';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit, OnDestroy  {
  employee: M_Employee = new M_Employee();
  sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params.id;
      if (id) {
        this.employeeService.getEmployeeById(id).subscribe((emp: any) => {
          if (emp) {
            this.employee = emp[0];
            /*this.employee.measuredAt = new Date(
              this.employee.CreatedDate
            ).toISOString();*/
          } else {
            console.log(
              `Sugar Level with id '${id}' not found, returning to list`
            );
            this.gotoList();
          }
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  gotoList() {
    this.router.navigate(['/employee-list']);
  }

  save(form: any) {
    this.employeeService.save(form).subscribe(
      result => {
        this.gotoList();
      },
      error => console.error(error)
    );
  }

  remove(id: number) {
    this.employeeService.remove(id).subscribe(
      result => {
        this.gotoList();
      },
      error => console.error(error)
    );
  }
}
