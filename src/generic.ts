// const names: Array<string> = [] // string[]
// names[0].split(' ')

// const promise: Promise<number> = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(10)
//   }, 2000)
// })

// promise.then(data => {
//   // data.split(' ')
// })

function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB)
}

const mergedObj = merge({ name: 'Kim', hobbies: ['Sports'] }, { age: 29 })
console.log(mergedObj)

interface Lengthy {
  length: number
}

function countAndDescribet<T extends Lengthy>(element: T): [T, string] {
  let descriptionText = 'Got no value.'
  if (element.length === 1) {
    descriptionText = 'Got 1 element.'
  } else if (element.length > 1) {
    descriptionText = 'Got ' + element.length + ' elements.'
  }
  return [element, descriptionText]
}

console.log(countAndDescribet([]))

function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
  return 'Value: ' + obj[key]
}

console.log(extractAndConvert({ name: 'Max' }, 'name'))

class DataStorage<T extends string | number | boolean> {
  private data: T[] = []

  addItem(item: T) {
    this.data.push(item)
  }

  removeItem(item: T) {
    if (this.data.indexOf(item) === -1) return
    this.data.splice(this.data.indexOf(item), 1)
  }

  getItems() {
    return [...this.data]
  }
}

const textStorage = new DataStorage<string>()
textStorage.addItem('Kim')
textStorage.addItem('Lee')
textStorage.removeItem('Kim')
console.log(textStorage.getItems())

const numberStorage = new DataStorage<number>()

// const objStorage = new DataStorage<object>()
// objStorage.addItem({ name: 'Kim' })
// objStorage.addItem({ name: 'Lee' })
// objStorage.removeItem({ name: 'Kim' })
// // 아래 코드는 제대로 동작하지 않는다.
// // 새로운 객체이기 때문에 indexOf로 찾을 수 없다.
// // 따라서, removeItem에서 indexOf가 -1을 반환하고, 마지막 원소를 삭제한다.
// console.log(objStorage.getItems()) // [{ name: 'Kim' }]

interface CourseGoal {
  title: string
  description: string
  completeUntil: Date
}

function createCourseGoal(title: string, description: string, date: Date): CourseGoal {
  let couseGoal: Partial<CourseGoal> = {}
  couseGoal.title = title
  couseGoal.description = description
  couseGoal.completeUntil = date

  return couseGoal as CourseGoal
}

const names: Readonly<string[]> = ['Kim', 'Lee']
// names.push('Park')