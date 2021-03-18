import { Component, OnInit, ViewChild, NgModule } from '@angular/core';
import EmployeeService from '../shared/api/employee.service';
import { MatTableDataSource, MatPaginator, MatButtonModule, MatTableModule, MatSort } from '@angular/material';
import M_Employee from '../shared/models/Employee';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})

export class EmployeeListComponent implements OnInit {
  employee: M_Employee[];
  displayedColumns: string[] = ['select', 'FirstName', 'LastName', 'Mobile', 'Email', 'Address', 'Action'];
  dataSource = new MatTableDataSource<M_Employee>(this.employee);
  selection = new SelectionModel<M_Employee>(true, []);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employeeService.getAllEmployee().subscribe(data => {
      this.employee = data as M_Employee[];
      this.dataSource = new MatTableDataSource<M_Employee>(this.employee);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: M_Employee): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.EmployeeId + 1}`;
  }
}

