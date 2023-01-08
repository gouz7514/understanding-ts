class Department {
  name: string
  private employees: string[] = []

  constructor(n: string) {
    this.name = n
  }

  describe(this: Department) {
    console.log('Depaartment : ' + this.name)
  }

  addEmployee(employee: string) {
    this.employees.push(employee)
  }

  printEmployeeInformation() {
    console.log(this.employees.length)
    console.log(this.employees)
  }
}

const accounting = new Department('accounting')
accounting.addEmployee('Kim')
accounting.addEmployee('Lee')
// accounting.employees[2] = 'Park'
accounting.describe()
accounting.printEmployeeInformation()

// const accountingCopy = {
//   name: 's',
//   describe: accounting.describe
// }

// accountingCopy.describe()