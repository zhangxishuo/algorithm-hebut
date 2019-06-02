self.Line = function(distance, point) {
    this.distance = distance;
    this.point = point;
};

self.init = function() {
    self.number = 4;
    self.matrix = [
        [0, 3, 6, 7],
        [5, 0, 2, 3],
        [6, 4, 0, 2],
        [3, 7, 5, 0]
    ];
    self.nullKey = [].toString();
    self.values = [];
    for (let i = 0; i < self.number; i ++) {
        self.values.push(new Map());
    }
    self.initArray = [];
    for (let i = 1; i < self.number; i ++) {
        self.initArray.push(i);
    }
};

self.calculator = function() {
    for (let i = 1; i < self.number; i ++) {
        self.values[i].set(nullKey, new Line(self.matrix[i][0], 0));
    }
    self.calValues(0, self.initArray);
};

self.calValues = function(start, array) {
    if (array.length === 0) {
        return;
    }
    let distances = [];
    array.forEach((value, index) => {
        let clone = array.slice();
        clone.splice(index, 1);
        self.calValues(value, clone);
        let length = self.matrix[start][value] + self.values[value].get(clone.toString()).distance;
        distances.push(new Line(length, value));
    });
    self.values[start].set(array.toString(), self.min(distances));
};

self.getOrder = function(start, array) {
    let point = self.values[start].get(array.toString()).point;
    if (array.length === 0) {
        return " ---> " + point;
    }
    let clone = array.slice();
    clone.splice(clone.indexOf(point), 1);
    let result = "";
    if (start === 0) {
        result = start + " ---> " + point;
    } else {
        result = " ---> " + point;
    }
    return result + self.getOrder(point, clone);
};

self.min = function(array) {
    if (array.length === 1) {
        return array[0];
    }
    let min = array[0];
    array.forEach((value) => {
        if (value.distance < min.distance) {
            min = value;
        }
    });
    return min;
};

self.run = function() {
    self.init();
    self.calculator();
    let order = self.getOrder(0, self.initArray);
    console.log('最佳路径是: ' + order);
};

self.run();
