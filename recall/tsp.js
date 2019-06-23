self.init = function() {
    self.number = 4;
    self.matrix = [
        [0, 3, 6, 7],
        [5, 0, 2, 3],
        [6, 4, 0, 2],
        [3, 7, 5, 0]
    ];
    self.x = [];
    for (let i = 0; i < self.number; i ++) {
        self.x.push(i);
    }
    self.currentValue = 0;
    self.bestValue = Infinity;
    self.bestX = [];
};

self.tsp = function(deep) {
    if (deep === self.number - 1) {
        if (self.matrix[x[self.number - 2]][x[self.number - 1]] !== 0 && self.matrix[x[self.number - 1]][0] !== 0) {
            let currentValue = self.currentValue + self.matrix[x[self.number - 2]][x[self.number - 1]] + self.matrix[x[self.number - 1]][0];
            if (currentValue < self.bestValue) {
                bestValue = currentValue;
                for (let i = 0; i < self.number; i ++) {
                    self.bestX[i] = self.x[i];
                }
            }
        }
    } else {
        for (let i = deep; i < self.number; i ++) {
            if (self.matrix[x[deep - 1]][x[i]] !== 0 && self.currentValue + self.matrix[x[deep - 1]][x[i]] < self.bestValue) {
                self.swap(self.x, deep, i);
                self.currentValue += self.matrix[x[deep - 1]][x[deep]];
                self.tsp(deep + 1);
                self.currentValue -= self.matrix[x[deep - 1]][x[deep]];
                self.swap(self.x, deep, i);
            }
        }
    }
};

self.swap = function(array, i, j) {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
};

self.run = function() {
    self.init();
    self.tsp(1);
    console.log(self.bestX);
};

self.run();
