import { Controller, Get, Param } from '@nestjs/common';
import { EmployeesService } from './employees.service.js';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  getEmployees() {
    return this.employeesService.getEmployees();
  }

  @Get(':id')
  getEmployee(@Param('id') id: string) {
    return this.employeesService.getEmployee(Number(id));
  }
}