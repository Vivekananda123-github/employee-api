import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';

import { EmployeesService } from './employees.service.js';

@Controller('employees')
export class EmployeesController {
  constructor(
    private readonly employeesService: EmployeesService,
  ) {}

  @Get()
  getEmployees(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('department') department?: string,
    @Query('name') name?: string,
  ) {
    return this.employeesService.getEmployees(
      page ? Number(page) : 1,
      limit ? Number(limit) : 10,
      department,
      name,
    );
  }

  @Get(':id')
  getEmployee(@Param('id') id: string) {
    return this.employeesService.getEmployee(Number(id));
  }

  @Post('/CreateEmployee')
  createEmployee(
    @Body()
    employeeData: {
      name: string;
      department: string;
      salary: number;
    },
  ) {
    return this.employeesService.createEmployee(
      employeeData,
    );
  }
}