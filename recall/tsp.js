self.init = function() {
    self.number = 4;
    self.matrix = [
        [0, 3, 6, 7],
        [5, 0, 2, 3],
        [6, 4, 0, 2],
        [3, 7, 5, 0]
    ];
};

self.tsp = function(deep) {
    if (deep !== self.number) {
        for (let i = deep; i < self.number; i ++) {
            //
        }
    }
};

self.run = function() {
    self.init();
};

self.run();
