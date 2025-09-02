
class HardMan {
  constructor(name) {
    this.name = name
    this.stack = []
    this.stack.push(() => {
      console.log(`i am ${this.name}`)
    })
    Promise.resolve().then(async () => {
      for (let i = 0; i < this.stack.length; i++) {
        const fn = this.stack[i]
        const res = await fn()
        // console.log('---res', res)
      }
    })
  }
  resetFunc (time) {
    return () => new Promise(resolve => {
      // console.log('执行了这一行')
      setTimeout(() => {
        resolve(10)
        // console.log('几时结束')
      }, time * 1000)
    })
  }
  rest(time) {
    this.stack.push(this.resetFunc(time))
    this.stack.push(() => {
      console.log(`wait ${time}s`)
    })
    return this
  }
  learn(skill) {
    this.stack.push(() => {
      console.log(`learn ${skill}`)
    })
    return this
  }
  restFirst(time) {
    this.stack.unshift(this.resetFunc(time))
    this.stack.push(() => {
      console.log(`wait ${time}s`)
    })
    return this
  }
}

function hardman(name) {
  return new HardMan(name)
}

// hardman('tom')
// 输出 i am tom

// hardman('tom').rest(10).learn('ch')
// 先输出i am tom，等10s后输出wait 10s，然后紧接着输出learn ch

hardman('tom').restFirst(5).learn('ch')
// 先等5s后输出i am tom，然后输出wait 5s，然后紧接着输出learn ch
