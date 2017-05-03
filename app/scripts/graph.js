/**
 * Created by Dawid on 03.05.2017.
 */
class Graph {
    constructor(n) {
        this.nodesCount = n;
        this.adjacencyMatrix = new Array(n);
        for(let i = 0; i < n; i++) {
            this.adjacencyMatrix[i] = new Array(n);
        }
    }

    getNodesCount() {
        return this.nodesCount;
    }

    getNodeDegree(a) {
        let degree = 0;

        for(let i = 0; i < this.nodesCount; i++) {
            if(this.getAdjacency(a, i) === true)
                degree += 1;
        }
        return degree;
    }

    isEulerGraph() {
        let oddNodesCount = 0;
        for(let i = 0; i < this.nodesCount; i++) {
            let nodeDegree = this.getNodeDegree(i)

            if(nodeDegree == 0)
                return false;
            else if(nodeDegree % 2 == 1) {
                oddNodesCount += 1;

                if(oddNodesCount == 2)
                    return false;
            }
        }
        return true;
    }

    setAdjacency(a, b, adjacencyState) {
        this.adjacencyMatrix[a][b] = adjacencyState;
        this.adjacencyMatrix[b][a] = adjacencyState;
    }

    getAdjacency(a, b) {
        return this.adjacencyMatrix[a][b];
    }
}