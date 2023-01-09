class Department {
  static fiscalYear = 2023
  // private id: string
  // private name: string
  protected employees: string[] = []

  constructor(private readonly id: string, public name: string) {
    // this.id = id
    // this.name = n
  }

  static createEmployee(name: string) {
    return {
      name: name
    }
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
  private lastReport: string

  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport
    }
    throw new Error('No report found')
  }

  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error('Please pass in a value')
    }
    this.addReport(value)
  }

  constructor(id: string, private reports: string[]) {
    super(id, 'Accounting')
    this.lastReport = reports[0]
  }

  addEmployee(name: string) {
    if (name === 'Kim') return
    this.employees.push(name)
  }

  addReport(text: string) {
    this.reports.push(text)
    this.lastReport = text
  }

  getReports() {
    console.log(this.reports)
  }
}

const employee1 = Department.createEmployee('Park')
console.log(employee1, Department.fiscalYear)

const it = new ITDepartment('d1', ['Kim'])
it.addEmployee('Kim')
it.addEmployee('Lee')
// accounting.employees[2] = 'Park'
it.describe()
it.printEmployeeInformation()

console.log(it)

const accounting = new AccountingDepartment('d2', [])

accounting.mostRecentReport = 'Year end report' // setter
accounting.addReport('something went wrong')
console.log(accounting.mostRecentReport) // getter
accounting.getReports()

accounting.addEmployee('Kim')
accounting.addEmployee('Lee')

accounting.printEmployeeInformation()

// const accountingCopy = {
//   name: 's',
//   describe: accounting.describe
// }

// accountingCopy.describe()