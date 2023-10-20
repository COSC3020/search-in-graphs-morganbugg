function depthFirstSearch(graph, startNode, targetNode) {
    var stack = [startNode]
    var visited = []
    while (stack.length > 0) {
        var currentPath = stack.pop()
        var node = currentPath[currentPath.length - 1]
        if (node == targetNode) return currentPath
        // .includes may need to be changed for time complexity analysis
        if (!visited.includes(node)) visited.push(node)
        for (var neighbor of graph[node]) {
            var newPath = currentPath.slice()
            newPath.push(neighbor)
            stack.push(newPath)
        }
    }
    return [];
}
