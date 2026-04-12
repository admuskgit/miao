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
      return obj => obj[predicate[0]] === predicate[1]
    }
    if (typeof predicate === "object" && predicate !== null) {
      return obj => Object.keys(predicate).every(key => obj[key] === predicate[key])
    }
    if (typeof predicate === "string") {
      return obj => !!obj[predicate]
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
  },
}