var admuskgit = {
  chunk(array, size) {
    var result = []
    for (var i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size))
    }
    return result
  },
  compact(array) {
    var result = []
    for (var i = 0; i < array.length; i++) {
      if (array[i]) {
        result.push(array[i])
      }
    }
    return result
  },
  difference(array) {
    var res = []
    var values = []
    for (var i = 1; i < arguments.length; i++) {
      var arr = arguments[i]
      for (var j = 0; j < arr.length; j++) {
        values.push(arr[j])
      }
    }
    for (var i = 0; i < array.length; i++) {
      var f = false
      for (var j = 0; j < values.length; j++) {
        if (array[i] === values[j]) {
          f = true
          break
        }
      }
      if (!f) {
        res.push(array[i])
      }
    }
    return res
  },
  fill(array, value, start = 0, end = array.length) {
    for (let i = start; i < end; i++) {
      array[i] = value
    }
    return array
  },
  drop(array, n=1) {
    let res = []
    for (let i = n; i < array.length; i++) {
      res.push(array[i])
    }
    return res
  },
  iteratee(predicate) {
    if (typeof predicate === "function") {
      return predicate
    }
    if (Array.isArray(predicate)) {
      let key = predicate[0];
      let val = predicate[1];
      return function(obj) {
        return obj[key] === val
      }
    }
    if (typeof predicate === "object" && predicate !== null) {
      let entries = Object.entries(predicate);
      return function(obj) {
        return entries.every(function([k, v]) {
          return obj[k] === v
        })
      }
    }
    if (typeof predicate === "string") {
      return function(obj) {
        return obj[predicate]
      }
    }
    return function(obj) {
      return obj
    }
  },
  findIndex(array, predicate = identity, fromIndex = 0) {
    predicate = this.iteratee(predicate)
    for (let i = fromIndex; i < array.length; i++) {
      if (predicate(array[i])) {
        return i
      }
    }
    return -1
  },
  findLastIndex(array, predicate = identity, fromIndex = array.length-1) {
    predicate = this.iteratee(predicate)
    for (let i = fromIndex; i >= 0; i--) {
      if (predicate(array[i])) {
        return i
      }
    }
    return -1
  },
  flatten(array) {
    let res = []
    for(let i = 0; i < array.length; i++) {
      let item = array[i]
      if(Array.isArray(item)) {
        res.push(...item)
      } else {
        res.push(item)
      }
    }
    return res
  },
  flattenDeep(array) {
    let res = []
    for(let i = 0; i < array.length; i++) {
      let item = array[i]
      if(Array.isArray(item)) {
        res.push(...this.flattenDeep(item))
      } else {
        res.push(item)
      }
    }
    return res
  },
  flattenDepth(array, depth = 1) {
    let res = []
    for(let i = 0; i < array.length; i++) {
      let item = array[i]
      if(Array.isArray(item) && depth > 0) {
        res.push(...this.flattenDepth(item, depth - 1))
      } else {
        res.push(item)
      }
    }
    return res
  },
  fromPairs(pairs) {
    let obj = {}
    for(let i = 0; i < pairs.length; i++) {
      let pair = pairs[i]
      let key = pair[0]
      let val = pair[1]
      obj[key] = val
    }
    return obj
  },
  head(array) {
    if(!Array.isArray(array)) return undefined
    return array[0]
  },
  indexOf(array, value, fromIndex=0) {
    for(let i = fromIndex; i < array.length; i++) {
      if(array[i] === value) {
        return i
      }
    }
  },
  lastIndexOf(array, value, fromIndex=array.length-1) {
    for(let i = fromIndex; i >= 0; i--) {
      if(array[i] === value) {
        return i
      }
    }
    return -1
  },
  initial(array) {
    let res = []
    for(let i = 0; i < array.length - 1; i++) {
      res.push(array[i])
    }
    return res
  },
  join(array, separator=',') {
    let res = ''
    for(let i = 0; i < array.length; i++) {
      res += array[i]
      if(i !== array.length - 1) {
        res += separator
      }
    }
    return res
  },
  last(array) {
    return array.length ? array[array.length - 1] : undefined
  },
  pull(array, values) {
    for(let i = 0; i < array.length; i++) {
      for(let j = 1; j < arguments.length; j++) {
        if(array[i] === arguments[j]) {
          array.splice(i, 1) 
          i--
          break
        }
      }
    }
    return array
  },
  reverse(array) {
    let left = 0
    let right = array.length - 1
    while(left < right) {
      let temp = array[left]
      array[left] = array[right]
      array[right] = temp
      left++
      right--
    }
    return array
  },
  every(collection, predicate = identity) {
    predicate = this.iteratee(predicate)
    if(collection === null) {
      return true
    }
    if(Array.isArray(collection)) {
      for(let i = 0; i < collection.length; i++) {
        if(!predicate(collection[i], i, collection)) {
          return false
        }
      }
    } else {
      for(let key in collection) {
        if(!predicate(collection[key], key, collection)) {
          return false
        }
      }
    }
    return true
  },
  some(collection, predicate = identity) {
    predicate = this.iteratee(predicate)
    if(collection === null) {
      return true
    }
    if(Array.isArray(collection)) {
      for(let i = 0; i < collection.length; i++) {
        if(predicate(collection[i], i, collection)) {
          return true
        }
      }
    } else {
      for(let key in collection) {
        if(predicate(collection[key], key, collection)) {
          return true
        }
      }
    }
    return false
  },
  countBy(collection, iteratee = identity) {
    iteratee = this.iteratee(iteratee)
    let obj = {}
    if(Array.isArray(collection)) {
      for(let i = 0; i < collection.length; i++) {
        let k = iteratee(collection[i], i, collection)
        if(obj[k]) {
           obj[k]++
        } else {
          obj[k] = 1
        }
      }
    } else {
      for(let key in collection) {
        let k = iteratee(collection[key], key, collection)
        if(obj[k]) {
           obj[k]++
        } else {
          obj[k] = 1
        }
      }
    }
    return obj
  },
  groupBy(collection, iteratee = identity) {
    iteratee = this.iteratee(iteratee)
    let obj = {}
    if(Array.isArray(collection)) {
      for(let i = 0; i < collection.length; i++) {
        let key = iteratee(collection[i], i, collection)
        if(!obj[key]){
          obj[key] = []
        }
        obj[key].push(collection[i])
      }
    } else {
      for(let key in collection) {
        let key = iteratee(collection[key], key, collection)
        if(!obj[key]){
          obj[key] = []
        }
        obj[key].push(collection[i])
      }
    }
    return obj
  },
  keyBy(collection, iteratee = identity) {
    iteratee = this.iteratee(iteratee)
    let obj = {}
    if(Array.isArray(collection)) {
      for(let i = 0; i < collection.length; i++) {
        let key = iteratee(collection[i], i, collection)
        obj[key] = collection[i]
      }
    } else {
      for(let key in collection) {
        let key = iteratee(collection[key], key, collection)
        obj[key] = collection[key]
      }
    }
    return obj
  },
  forEach(collection, iteratee = identity) {
    iteratee = this.iteratee(iteratee)
    if(Array.isArray(collection)) {
      for(let i = 0; i < collection.length; i++) {
        iteratee(collection[i], i, collection)
      }
    } else {
      for(let key in collection) {
        iteratee(collection[key], key, collection)
      }
    }
    return collection
  },
  map(collection, iteratee = identity) {

  },
  filter(collection, [predicate = identity]) {

  },
  reduce(collection, iteratee = identity, accumulator) {

  },
  reduceRight(collection, iteratee = identity, accumulator) {

  },
  size(collection) {

  },
  sortBy(collection, iteratees= identity) {

  },
}