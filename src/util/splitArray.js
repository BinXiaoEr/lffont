const splitArray = function (array, size) {
  let temp = [];
  let len = Math.floor(array.length / size);
  if (len >= 1) {
    for (let i = 0; i < len; i++) {
      temp.push(array.splice(0, size))
    }
    return temp;
  }
  else {
    temp.push(array.splice(0, array.length));
    return temp
  }

}
export default splitArray;
