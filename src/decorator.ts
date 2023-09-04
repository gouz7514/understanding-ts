function Logger(logString: string) {
  console.log('LOGGER FACTORY')
  return function(constructor: Function) {
    console.log(logString)
    console.log(constructor)
  }
}

function WithTemplate(template: string, hookId: string) {
  console.log('TEMPLATE FACTORY')
  return function<T extends {new(...args: any[]): {name: string}}>(originalConstructor: T) {
    return class extends originalConstructor {
      constructor(..._: any[]) {
        super()
        console.log('Rendering template')
        const hookEl = document.getElementById(hookId)
        if (hookEl) {
          hookEl.innerHTML = template
          hookEl.querySelector('h1')!.textContent = this.name
        }
      }
    }
  }
}

@Logger('LOGGING - PERSON')
@WithTemplate('<h1>My Person Object</h1>', 'app')
class Person {
  name = 'Kim'

  constructor() {
    console.log('Creating person object...')
  }
}

const person = new Person()


function Log(target: any, propertyName: string | Symbol) {
  console.log('Property decorator!')
  console.log(target, propertyName)
}

function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log('Accessor decorator!')
  console.log(target)
  console.log(name)
  console.log(descriptor)
}

function Log3(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
  console.log('Method decorator!')
  console.log(target)
  console.log(name)
  console.log(descriptor)
}

function Log4(target: any, name: string | Symbol, position: number) {
  console.log('Parameter decorator!')
  console.log(target)
  console.log(name)
  console.log(position)
}

class Product {
  @Log
  title: string
  private _price: number

  @Log2
  set price(val: number) {
    if (val > 0) {
      this.price = val
    } else {
      throw new Error('Invalid price - should be positive!')
    }
  }

  constructor(t: string, p: number) {
    this.title = t
    this._price = p
  }

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax)
  }
}

// tind this to class
function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    // 여기서 this는 getter를 호출하는 객체를 가리킨다.
    get() {
      const boundFn = originalMethod.bind(this)
      return boundFn
    }
  }
  return adjDescriptor
}

class Printer {
  message = 'This works!'

  @Autobind
  showMessage() {
    console.log(this.message)
  }
}

const p = new Printer()
p.showMessage()

const button = document.querySelector('button')!
button.addEventListener('click', p.showMessage)

// validation
interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[]
  }
}

const registeredValidators: ValidatorConfig = {}

function Required(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [...(registeredValidators[target.constructor.name]?.[propName] ?? []), 'required']
  }
}

function PositiveNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [...(registeredValidators[target.constructor.name]?.[propName] ?? []), 'positive']
  }
}

function Validate(obj: any) {
  const objValidatorConfig = registeredValidators[obj.constructor.name]
  if (!objValidatorConfig) {
    return true
  }
  let isValid = true
  // 응용
  // let validTitle = true
  // let validPrice = true
  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case 'required':
          isValid = isValid && !!obj[prop]
          // validTitle = validTitle && !!obj[prop]
          break
        case 'positive':
          isValid = isValid && obj[prop] > 0
          // validPrice = validPrice && obj[prop] > 0
          break
      }
    }
  }
  return isValid
  // return validTitle && validPrice
}

class Course {
  @Required
  title: string

  @PositiveNumber
  price: number

  constructor(t: string, p: number) {
    this.title = t
    this.price = p
  }
}

const courseFor = document.querySelector('form')!
courseFor.addEventListener('submit', event => {
  event.preventDefault()
  const titleEl = document.getElementById('title') as HTMLInputElement
  const priceEl = document.getElementById('price') as HTMLInputElement

  const title = titleEl.value
  const price = +priceEl.value

  const createdCourse = new Course(title, price)

  // const [validTitle, validPrice] = Validate(createdCourse) as [boolean, boolean]
  // if (!validTitle) {
  //   alert('Invalid title, please try again!')
  //   return
  // }
  // if (!validPrice) {
  //   alert('Invalid price, please try again!')
  //   return
  // }
  if (!Validate(createdCourse)) {
    alert('Invalid input, please try again!')
    return
  }
})