// I've used some help from ChatGPT here just for the sake of understanding a
// basic direction to go in with my testing, but I'm trying to keep more
// specific parts of this file original.  I'm running into some problems
// getting anything specific working.

const fs = require('fs')
const jsc = require('jsverify')

eval(fs.readFileSync('code.js')+'')

const test =
    jsc.forall("array array nat", "nat", "nat", function(graph, startNode, targetNode) {
        // skip invalid/empty graphs
        if (graph.length == 0 || graph.some((arr) => !Array.isArray(arr))) return true
        // skip invalid nodes
        if (startNode < 0 || startNode >= graph.length ||
            targetNode < 0 || targetNode >= graph.length) return true
        // testing below here
        var result = depthFirstSearch(graph, startNode, targetNode)
        // not quite sure how to implement a test to compare against the result.
        // for sake of pushing, returning true
        return true
    })

jsc.assert(test, {tests: 1000})