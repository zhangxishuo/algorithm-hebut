self.Good = function(weight, value) {
    this.weight = weight;
    this.value = value;
};

self.init = function() {
    self.capacity = 10;
    self.goods = [
        new Good(2, 6),
        new Good(2, 3),
        new Good(6, 5),
        new Good(5, 4),
        new Good(4, 6)
    ];
    self.values = [];
    for (let i = 0; i <= self.goods.length; i ++) {
        let value = [];
        for (let j = 0; j <= self.capacity; j ++) {
            value.push(0);
        }
        self.values.push(value);
    }
};

self.calculator = function() {
    for (let i = 1; i <= self.goods.length; i ++) {
        for (let j = 1; j <= self.capacity; j ++) {
            let good = self.goods[i - 1];
            if (j < good.weight) {
                self.values[i][j] = self.values[i - 1][j];
            } else {
                let notPutValue = self.values[i - 1][j - good.weight] + good.value;
                let putValue  = self.values[i - 1][j];
                self.values[i][j] = Math.max(notPutValue, putValue);
            }
        }
    }
};

self.getPutGoods = function() {
    let currentCapacity = self.capacity;
    for (let i = self.goods.length; i >= 1; i --) {
        if (self.values[i][currentCapacity] !== self.values[i - 1][currentCapacity]) {
            console.log('物品: 重量: ' + self.goods[i - 1].weight + '价值: ' + self.goods[i - 1].value);
            currentCapacity -= self.goods[i - 1].weight;
        }
    }
};

self.run = function() {
    self.init();
    self.calculator();
    self.getPutGoods();
};

self.run();
