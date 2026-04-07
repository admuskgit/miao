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
  difference(array, arr) {
    var res = []
    for (var i = 0; i < array.length; i++) {
      var f = false
      for (var j = 0; j < arr.length; j++) {
        if (array[i] === arr[j]) {
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
}