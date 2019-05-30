/**
 * 非递归方式实现循环赛赛程
 */
self.match = function(size) {
    let power = self.power(size);
    let initSize = 2;
    let initArray = new Array([1, 2], [2, 1]);
    for (let i = 1; i < power; i ++) {
        let array = self.createArray(initSize * 2);
        self.copy(initArray, array);
        initSize *= 2;
        initArray = array;
    }
    return initArray;
};

self.power = function(num) {
    let power = 0;
    while (num > 1) {
        num = num / 2;
        power ++;
    }
    return power;
};

self.copy = function(halfArray, array) {
    let size = halfArray.length;
    for (let i = 0; i < size; i ++) {
        for (let j = 0; j < size; j ++) {
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
    for (let i = 0; i < size; i ++) {
        array[i] = new Array(size);
    }
    return array;
};
