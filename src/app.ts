class Department {
  // private id: string
  // private name: string
  private employees: string[] = []

  constructor(private readonly id: string, public name: string) {
    // this.id = id
    // this.name = n
  }

  describe(this: Department) {
    console.log(`Department (${this.id}) : `, this.name)
  }

  addEmployee(employee: string) {
    this.employees.push(employee)
  }

  printEmployeeInformation() {
    console.log(this.employees.length)
    console.log(this.employees)
  }
}

class ITDepartment extends Department {
  admins: string[]

  constructor(id: string, admins: string[]) {
    super(id, 'IT')
    this.admins = admins
  }
}

class AccountingDepartment extends Department {
  constructor(id: string, private reports: string[]) {
    super(id, 'Accounting')
  }

  addReport(text: string) {
    this.reports.push(text)
  }

  getReports() {
    console.log(this.reports)
  }
}

const it = new ITDepartment('d1', ['Kim'])
it.addEmployee('Kim')
it.addEmployee('Lee')
// accounting.employees[2] = 'Park'
it.describe()
it.printEmployeeInformation()

console.log(it)

const accounting = new AccountingDepartment('d2', [])
accounting.addReport('something went wrong')
accounting.getReports()

// const accountingCopy = {
//   name: 's',
//   describe: accounting.describe
// }

// accountingCopy.describe()