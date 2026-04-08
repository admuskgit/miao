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
  fill(array, value, start=0, end=array.length) {
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
  findIndex(array, predicate=_.identity, fromIndex=0) {
    
  }
}