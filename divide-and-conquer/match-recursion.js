/**
 * 递归方式实现循环赛赛程
 */
self.match = function(size) {
    if (size === 2) {
        return new Array([1, 2], [2, 1]);
    }
    let halfSize = size / 2;
    let halfArray = self.match(halfSize);
    let array = self.createArray(size);
    return self.copy(halfArray, array);
};

self.copy = function(halfArray, array) {
    let size = halfArray.length;
    for (var i = 0; i < size; i ++) {
        for (var j = 0; j < size; j ++) {
            array[i       ][j       ] = halfArray[i][j];
            array[i       ][j + size] = halfArray[i][j] + size;
            array[i + size][j       ] = halfArray[i][j] + size;
            array[i + size][j + size] = halfArray[i][j];
        }
    }
    return array;
};

self.createArray = function(size) {
    let array = new Array(size);
    for (var i = 0; i < size; i ++) {
        array[i] = new Array(size);
    }
    return array;
};
