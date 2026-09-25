import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

@Injectable()
export class EmployeesService {
  private readonly logger = new Logger(EmployeesService.name);

  getEmployees() {
    try {
    } catch (error) {
      this.logger.error(
        'Failed to fetch employees',
        error instanceof Error ? error.stack : String(error),
      );

      throw new InternalServerErrorException(
        'Unable to fetch employees',
      );
    }
  }

  getEmployee(id: number) {
    try {
      const employees = [
        {
          id: 1,
          name: 'Rahul',
          department: 'IT',
          salary: 50000,
        },
        {
          id: 2,
          name: 'Priya',
          department: 'HR',
          salary: 45000,
        },
        {
          id: 3,
          name: 'Arjun',
          department: 'Finance',
          salary: 55000,
        },
      ];

      const employee = employees.find((emp) => emp.id === id);

      if (!employee) {
        throw new NotFoundException('Employee not found');
      }

      return employee;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      this.logger.error(
        'Failed to fetch employee',
        error instanceof Error ? error.stack : String(error),
      );

      throw new InternalServerErrorException(
        'Unable to fetch employee',
      );
    }
  }
}