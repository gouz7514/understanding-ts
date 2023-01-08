class Department {
  name: string

  constructor(n: string) {
    this.name = n
  }

  describe(this: Department) {
    console.log('Depaartment : ' + this.name)
  }
}

const accounting = new Department('accounting')
accounting.describe()

const accountingCopy = {
  name: 's',
  describe: accounting.describe
}

accountingCopy.describe()