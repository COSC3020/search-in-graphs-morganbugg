const fs = require('fs')
const jsc = require('jsverify')

eval(fs.readFileSync('code.js')+'')

function dfsTest(graph, startNode, endNode) {
    var visited = new Set();
    var stack = [];
    stack.push(startNode);
    var cameFrom = {};
    cameFrom[startNode] = undefined;
    while (stack.length > 0) {
        var currentCity = stack.pop();
        var adjacentCities = graph[currentCity] || [];
        if (currentCity === endNode) {
            var pathFromSrcToDest = [];
            pathFromSrcToDest.unshift(endNode);
            var previousCity = cameFrom[endNode]
        }
        while (previousCity != undefined) {
            pathFromSrcToDest.unshift(previousCity);
            previousCity = cameFrom[previousCity];
        }
        return pathFromSrcToDest;
    }
    for (nextCity of adjacentCities) {
        if (!visited.has(nextCity)) {
            cameFrom[nextCity] = currentCity;
            stack.push(nextCity);
            visited.add(nextCity);
        }
    }
    return [];
}


function isValidGraph(graph) {
    return Array.isArray(graph) && graph.every(isValidArray);
}

function isValidArray(arr) {
    return Array.isArray(arr) && arr.every(isValidNumber);
}

function isValidNumber(x) {return typeof x == "nat"}


const test =
    jsc.forall("array nearray nat", "nat", "nat", function(graph, startNode, targetNode) {
        // skip invalid graphs
        if (!isValidGraph(graph)) return true
        // skip invalid nodes
        if (startNode >= graph.length || targetNode >= graph.length) return true
        // testing below here
        var result = depthFirstSearch(graph, startNode, targetNode)
        var expected = dfsTest(graph, startNode, targetNode)
        return JSON.stringify(result) == JSON.stringify(expected)
    })

jsc.assert(test, {tests: 1000})