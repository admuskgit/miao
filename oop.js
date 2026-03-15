class Vector {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
  plus(params) {
    return new Vector(this.x + params.x , this.y + params.y)
  }
  minus(params) {
    return new Vector(this.x - params.x , this.y - params.y)
  }
  get length(){
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }
}
class Complex {
  constructor(real, imag) {
    this.real = real
    this.imag = imag
  }
  plus (params) {
    return new Complex(this.real + params.real , this.imag +  params.imag)
  }
  minus (params) {
    return new Complex(this.real - params.real , this.imag -  params.imag)
  }
  multiple (params) {
    let a = this.real
    let b = this.imag
    let c = params.real
    let d = params.imag
    return new Complex(
        a * c - b * d, // 实部：ac - bd
        a * d + b * c  // 虚部：ad + bc
    )
  }
  div (params) {
    let helper = new Complex(params.real, -params.imag)
    let fenmu = params.multiple(helper).real
    let fenzi = this.multiple(helper)
    let real = fenzi.real / fenmu
    let imag = fenzi.imag / fenmu
  return new Complex(real, imag)
  }
  toString (params) {
    return this.real + (this.imag > 0 ? " + "  : '')+ this.imag + "i "
  }
}
class Node {
  constructor(val) {
    this.val = val
    this.next = null
  }
}
class LinkedList {
  constructor() {
  this.head = null
  this.length = 0
  }
  at (idx) {
    if (idx < 0 || idx >= this.length) return undefined
    let p = this.head
    for (let i = 0; i < idx; i++) {
      p = p.next
    }
    return p.val
  }
  set (idx, val) {
    if (idx < 0 || idx >= this.length) return undefined
    let p = this.head
    for (let i = 0; i < idx; i++) {
      p = p.next
    }
    p.val = val
    return true
  }
  append (val) {
    let node = new Node(val)
    if (!this.head) {
      this.head = node
      this.length++
      return true
    }
    let p = this.head
    while (p.next) {
      p = p.next
    }
    p.next = node 
    this.length++
    return true
  } 
  pop () {
    if (!this.head) {
      return undefined
    }
    if (!this.head.next) {
      let val = this.head.val
      this.head = null
      return val
    }
    let p = this.head
    while (p.next.next) {
      p = p.next
    }
    let val = p.next.val
    p.next = null
    this.length-- 
    return val
  }
  prepend (val) {
    let node = new Node(val)
    node.next = this.head
    this.head = node
    this.length++ 
    return true
  }
  shift() {
    if (!this.head) {
      return undefined
    }
    let val = this.head.val
    this.head = this.head.next
    this.length--
    return val
  }
  toArray() {
    let res = []
    let current = this.head
    while (current) {
      res.push(current.val)
      current = current.next
    }
    return res
  }
  get size() {
    return this.length
  }
}
class MySet {
  constructor(arr = []) {
    this.items = []
    for(let v of arr) {
    if (!this.items.includes(v)) {
      this.items.push(v)
    }
    }
  }
  add (item) {
  if (!this.items.includes(item)) {
    this.items.push(item)
  }
  }
  delete (item) {
  let idx = this.items.indexOf(item)
  if (idx !== -1) {
    this.items.splice(idx, 1)
    return true
  }
  return false
  }
  get size() {
    return this.items.length
  }
  clear () {
  this.items = []
  }
  has (item) {
  let idx = this.items.indexOf(item)
  if (idx !== -1) {
    return true
  }
  return false
  }
  forEach (callback) {
  for (let i = 0; i < this.items.length; i++) {
    callback(this.items[i], i)
  }
  }
}
class MyMap {
  constructor(arr = []) {
    this.items = []
  }
  set(key, val) {
  for(let i = 0; i < this.items.length; i+=2) {
    if (this.items[i] === key) {
      this.items[i + 1] = val
      return this
    }
  }
  this.items.push(key, val)
  return this
  }
  get(key) {
  for (let i = 0; i < this.items.length; i += 2) {
    if (this.items[i] === key) {
      return this.items[i + 1]
    }
  }
  return undefined
  }
  has(key) {
  for (let i = 0; i < this.items.length; i += 2) {
    if (this.items[i] === key) {
      return true
    }
  }
  return false
  }
  clear() {
    this.items = []
  }
  delete(key) {
  for (let i = 0; i < this.items.length; i += 2) {
    if (this.items[i] === key) {
      this.items.splice(i,2)
      return true
    }
  }
  return false
  }
  get size() {
    return this.items.length / 2
  }
  forEach(callback) {
    for(let i = 0; i < this.items.length; i += 2) {
      let val = this.items[i + 1]
       let key = this.items[i]
       callback(val,key)
    }
  }
}
class Stack {
  constructor() {
    this.items = []
  }
  push (val) {
  this.items.push(val)
  }
  pop () {
  if (this.items.length === 0) {
    return undefined
  }
  return this.items.pop()
  }
  peek () {
    return this.items[this.items.length - 1]
  }
  get size() {
    return this.items.length
  }

}
class Queue {
  constructor() {
    this.head = null
    this.tail = null
    this.length = 0
  }
  add (val) {
  let node = new Node(val)
  if(!this.tail) {
    this.head = this.tail = node
    this.length++
    return this
  } else {
    this.tail.next = node
    this.tail = node
    this.length++
    return this
  }
  }
  pop () {
  if(!this.head) {
    return undefined
  } else if(this.tail === this.head){
    let res = this.head.val
    this.head = this.tail = null
    this.length--
    return res
  } else {
    let res = this.head.val
    this.head = this.head.next
    this.length--
    return res
  }
  }
  peek () {
  if(!this.head) {
    return undefined
  } else {
    return this.head
  }
  }
  get size() {
    return this.length
  }
}
