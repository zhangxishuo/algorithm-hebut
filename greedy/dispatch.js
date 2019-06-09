self.init = function() {
    self.tasks = [2, 14, 4, 16, 6, 5, 3];
    self.number = 3;
    self.machines = [];
};

self.calculator = function() {
    self.tasks.sort((task1, task2) => {
        return task2 - task1;
    });
    for (let i = 0; i < self.number && i < self.tasks.length; i ++) {
        console.log('任务' + self.tasks[i] + '分配给机器' + i);
        self.machines.push(self.tasks[i]);
    }
    for (let i = self.number; i < self.tasks.length; i ++) {
        let minIndex = self.minIndex(self.machines);
        console.log('任务' + self.tasks[i] + '分配给机器' + minIndex);
        self.machines[minIndex] += self.tasks[i];
    }
    console.log('最终任务分配: ', self.machines);
};

self.minIndex = function(array) {
    let minIndex = 0;
    array.forEach((value, index) => {
        if (value < array[minIndex]) {
            minIndex = index;
        }
    });
    return minIndex;
};

self.run = function() {
    self.init();
    self.calculator();
};

self.run();
