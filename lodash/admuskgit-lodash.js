var admuskgit = function() {
  function chunk(array, size) {
    var result = []
    for (var i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size))
    }
    return result
  }
  
  return {
    chunk: chunk
  }
}()