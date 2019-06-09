self.init = function() {
    self.number = 5;
    self.matrix = [
        [0, 3, 3, 2, 6],
        [3, 0, 7, 3, 2],
        [3, 7, 0, 2, 5],
        [2, 3, 2, 0, 3],
        [6, 2, 5, 3, 0]
    ];
    self.start = 0;
};

self.calculator = function() {
    self.currentIndex = self.start;
    self.exclude = [self.currentIndex];
    self.message = '路径: ' + self.start;
    for (let i = self.number - 1; i >= 0; i --) {
        if (i > 0) {
            let minIndex = self.minIndex(self.matrix[self.currentIndex], self.exclude);
            self.currentIndex = minIndex;
            self.exclude.push(minIndex);
            self.message += '--->' + self.currentIndex;
        } else {
            self.currentIndex = 0;
            self.message += '--->' + self.start;
        }
    }
    return self.message;
};

self.minIndex = function(array, exclude) {
    let minIndex = 0;
    while (exclude.includes(minIndex)) {
        minIndex ++;
    }
    array.forEach((value, index) => {
        if (value < array[minIndex] && !exclude.includes(index)) {
            minIndex = index;
        }
    });
    return minIndex;
};

self.run = function() {
    self.init();
    let route = self.calculator();
    console.log(route);
};

self.run();
