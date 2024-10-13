import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css'],
})
export class CreateEmployeeComponent {
  employeeForm: any = {
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
    salary: null,
    photo: null,
  };

  constructor(private service: EmployeesService, private router: Router) {}

  onFileChange(event: any): void {
    if (event.target.files && event.target.files.length) {
      this.employeeForm.photo = event.target.files[0];
    }
  }

  onSubmit(): void {
    const formdata = new FormData();
    formdata.append('firstName', this.employeeForm.firstName);
    formdata.append('lastName', this.employeeForm.lastName);
    formdata.append('mobile', this.employeeForm.mobile);
    formdata.append('email', this.employeeForm.email);
    formdata.append('salary', this.employeeForm.salary);
    formdata.append('photo', this.employeeForm.photo);

    this.service.createEmployee(formdata).subscribe(
      (response) => {
        console.log('Employee created Successfully', response);
        this.router.navigate(['']);
      },
      (error) => {
        console.error('Error creting employee', error);
      }
    );
  }
}
