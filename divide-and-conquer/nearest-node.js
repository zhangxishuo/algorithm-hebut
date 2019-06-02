self.Node = function(x, y) {
    this.x = x;
    this.y = y;
};

self.Line = function(startNode, endNode) {
    this.startNode = startNode;
    this.endNode = endNode;
};

self.Line.prototype.distance = function() {
    let x = this.endNode.x - this.startNode.x;
    let y = this.endNode.y - this.startNode.y;
    return Math.sqrt(x * x + y * y);
};

self.init = function() {
    self.chart = echarts.init(document.getElementById('main'));
};

self.render = function(nodes) {
    let data = [];
    nodes.forEach((node) => {
        data.push([node.x, node.y]);
    });
    self.option = {
        title: {
            text: '最近点对问题'
        },
        tooltip: {
            formatter: '({c})'
        },
        xAxis: {
            min: 0,
            max: 10
        },
        yAxis: {
            min: 0,
            max: 10
        },
        series: {
            type: 'scatter',
            data: data
        }
    };

    self.chart.setOption(self.option);
};

self.getMaxLine = function() {
    return new Line(new Node(0, 0), new Node(10, 10));
};

self.calculate = function() {
    self.init();
    let nodes = self.generateNodes(30);
    self.render(nodes);
    let minLine = self.calNearNode(nodes);
    document.getElementById('title').innerHTML = '最近点为' + '(' + minLine.startNode.x + ',' + minLine.startNode.y + ') 和 (' + minLine.endNode.x + ',' + minLine.endNode.y + ')';
};

self.calNearNode = function(nodes) {
    if (nodes.length === 2) {
        return new Line(nodes[0], nodes[1]);
    } else if (nodes.length < 2) {
        return self.getMaxLine();
    }
    let average    = self.getAverage(nodes);
    let length     = nodes.length;
    let halfLength = length / 2;
    let frontNodes = nodes.slice(0, halfLength);
    let afterNodes = nodes.slice(halfLength, length);
    let leftLine   = self.calNearNode(frontNodes);
    let rightLine  = self.calNearNode(afterNodes);
    let minLine    = leftLine.distance() < rightLine.distance() ? leftLine : rightLine;
    let middle     = nodes.filter((node) => {
        return Math.abs(node.x - average) <= minLine.distance();
    });
    let result     = self.calMinLength(middle);
    return result.distance() < minLine.distance() ? result : minLine;
};

self.calMinLength = function(nodes) {
    if (nodes.length === 2) {
        return new Line(nodes[0], nodes[1]);
    } else if (nodes.length < 2) {
        return self.getMaxLine();
    }
    let array = [];
    nodes.forEach((firstNode) => {
        nodes.forEach((lastNode) => {
            if (firstNode.x !== lastNode.x && firstNode.y !== lastNode.y) {
                array.push(new Line(firstNode, lastNode));
            }
        });
    });
    let minValue = array[0].distance();
    let minLine  = array[0];
    array.forEach((line) => {
        if (line.distance() < minValue) {
            minValue = line.distance();
            minLine = line;
        }
    });
    return minLine;
};

self.getAverage = function(nodes) {
    let avg = 0;
    nodes.forEach((node) => {
        avg += node.x;
    });
    return avg / nodes.length;
};

self.generateNodes = function(num) {
    let array = [];
    for (let i = 0; i < num; i ++) {
        let node = new Node(Math.floor(Math.random() * 1000) / 100, Math.floor(Math.random() * 1000) / 100);
        array.push(node);
    }
    array.sort((node1, node2) => {
        return node1.x - node2.x;
    });
    return array;
};

self.calculate();
