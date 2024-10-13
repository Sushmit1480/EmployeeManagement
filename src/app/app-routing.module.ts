import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { CreateEmployeeComponent } from './components/create-employee/create-employee.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { UpdateEmployeeComponent } from './components/update-employee/update-employee.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeeListComponent,
    pathMatch: 'full',
  },
  {
    path: 'create',
    component: CreateEmployeeComponent,
    pathMatch: 'full',
  },
  {
    path: 'employee-detail/:id',
    component: EmployeeDetailsComponent,
    pathMatch: 'full',
  },
  {
    path: 'update-employee/:id',
    component: UpdateEmployeeComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
