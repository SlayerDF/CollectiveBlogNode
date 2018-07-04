function arrayToObject(arr, keyField, bodyField) {
    var rv = {};
    for (var i = 0; i < arr.length; ++i)
      rv[getNestedObject(arr[i], keyField.split('.'))] = arr[i][bodyField];
    return rv;
}

function getNestedObject(nestedObj, pathArr) {
    return pathArr.reduce((obj, key) =>
        (obj && obj[key] !== 'undefined') ? obj[key] : undefined, nestedObj);
}

module.exports = {
    arrayToObject,
    getNestedObject
}