import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

export interface Employee {
  id: number;
  name: string;
  department: string;
  salary: number;
}

@Injectable()
export class EmployeesService {
  private readonly logger = new Logger(EmployeesService.name);

  private employees: Employee[] = [
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

  getEmployees(
    page: number = 1,
    limit: number = 10,
    department?: string,
    name?: string,
  ) {
    try {
      let filteredEmployees = this.employees;

      // Department filter
      if (department) {
        filteredEmployees = filteredEmployees.filter(
          (employee) =>
            employee.department.toLowerCase() ===
            department.toLowerCase(),
        );
      }

      // Name filter
      if (name) {
        filteredEmployees = filteredEmployees.filter(
          (employee) =>
            employee.name
              .toLowerCase()
              .includes(name.toLowerCase()),
        );
      }

      // Pagination
      const total = filteredEmployees.length;
      const totalPages =
        limit > 0 ? Math.ceil(total / limit) : 0;

      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;

      const data =
        limit > 0
          ? filteredEmployees.slice(startIndex, endIndex)
          : [];

      return {
        data,
        pagination: {
          page,
          limit,
          total,
          totalPages,
        },
      };
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
      const employee = this.employees.find(
        (emp) => emp.id === id,
      );

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

  createEmployee(employeeData: {
    name: string;
    department: string;
    salary: number;
  }) {
    try {
      const newEmployee: Employee = {
        id: this.employees.length + 1,
        ...employeeData,
      };

      this.employees.push(newEmployee);

      return newEmployee;
    } catch (error) {
      this.logger.error(
        'Failed to create employee',
        error instanceof Error ? error.stack : String(error),
      );

      throw new InternalServerErrorException(
        'Unable to create employee',
      );
    }
  }
}