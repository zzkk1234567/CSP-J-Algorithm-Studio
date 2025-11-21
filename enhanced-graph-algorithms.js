// 增强版图算法可视化系统
// 完善DFS、BFS和Dijkstra算法的动画演示

/**
 * 增强版图算法可视化器
 * 提供完整的图算法动画演示
 */
class EnhancedGraphVisualizer extends AlgorithmVisualizer {
    constructor(containerId, algorithm = 'dfs', options = {}) {
        super(containerId, options);
        this.algorithm = algorithm;
        this.graph = null;
        this.nodes = [];
        this.edges = [];
        this.visited = new Set();
        this.distances = {};
        this.previous = {};
        this.edgeElements = [];
    }

    setGraph(nodes, edges) {
        this.graph = { nodes, edges };
        this.adjacencyList = this.buildAdjacencyList(nodes, edges);
        
        // 为边添加权重（如果没有的话）
        this.weightedEdges = edges.map(edge => ({
            ...edge,
            weight: edge.weight || Math.floor(Math.random() * 10) + 1
        }));
    }

    buildAdjacencyList(nodes, edges) {
        const list = {};
        nodes.forEach(node => {
            list[node.id] = [];
        });
        
        edges.forEach(edge => {
            const weight = edge.weight || Math.floor(Math.random() * 10) + 1;
            list[edge.from].push({ node: edge.to, weight });
            if (!edge.directed) {
                list[edge.to].push({ node: edge.from, weight });
            }
        });
        return list;
    }

    initVisualization() {
        const vizContent = document.getElementById('viz-content');
        vizContent.innerHTML = '';
        
        // 创建SVG容器
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '500');
        svg.style.cssText = 'background: #1e293b; border-radius: 8px;';
        
        // 绘制边
        this.edgeElements = this.weightedEdges.map(edge => {
            const fromNode = this.graph.nodes.find(n => n.id === edge.from);
            const toNode = this.graph.nodes.find(n => n.id === edge.to);
            
            const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            
            // 边线
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', fromNode.x);
            line.setAttribute('y1', fromNode.y);
            line.setAttribute('x2', toNode.x);
            line.setAttribute('y2', toNode.y);
            line.setAttribute('stroke', '#6b7280');
            line.setAttribute('stroke-width', '3');
            line.setAttribute('id', `edge-${edge.from}-${edge.to}`);
            
            // 权重标签
            const midX = (fromNode.x + toNode.x) / 2;
            const midY = (fromNode.y + toNode.y) / 2;
            
            const weightBg = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            weightBg.setAttribute('cx', midX);
            weightBg.setAttribute('cy', midY);
            weightBg.setAttribute('r', '12');
            weightBg.setAttribute('fill', '#374151');
            weightBg.setAttribute('stroke', '#6b7280');
            weightBg.setAttribute('stroke-width', '1');
            
            const weightText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            weightText.setAttribute('x', midX);
            weightText.setAttribute('y', midY + 4);
            weightText.setAttribute('text-anchor', 'middle');
            weightText.setAttribute('fill', 'white');
            weightText.setAttribute('font-size', '12');
            weightText.setAttribute('font-weight', 'bold');
            weightText.textContent = edge.weight || Math.floor(Math.random() * 10) + 1;
            
            g.appendChild(line);
            g.appendChild(weightBg);
            g.appendChild(weightText);
            svg.appendChild(g);
            
            return { element: line, from: edge.from, to: edge.to, weight: edge.weight };
        });
        
        // 绘制节点
        this.nodes = this.graph.nodes.map(node => {
            const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            
            // 节点圆圈
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', node.x);
            circle.setAttribute('cy', node.y);
            circle.setAttribute('r', '30');
            circle.setAttribute('fill', this.options.colors.default);
            circle.setAttribute('stroke', 'white');
            circle.setAttribute('stroke-width', '3');
            circle.setAttribute('id', `node-${node.id}`);
            
            // 节点标签
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', node.x);
            text.setAttribute('y', node.y + 5);
            text.setAttribute('text-anchor', 'middle');
            text.setAttribute('fill', 'white');
            text.setAttribute('font-weight', 'bold');
            text.setAttribute('font-size', '18');
            text.textContent = node.label || node.id;
            
            // 距离标签（用于Dijkstra算法）
            const distanceText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            distanceText.setAttribute('x', node.x);
            distanceText.setAttribute('y', node.y - 40);
            distanceText.setAttribute('text-anchor', 'middle');
            distanceText.setAttribute('fill', '#fbbf24');
            distanceText.setAttribute('font-weight', 'bold');
            distanceText.setAttribute('font-size', '14');
            distanceText.setAttribute('id', `distance-${node.id}`);
            distanceText.textContent = '';
            
            g.appendChild(circle);
            g.appendChild(text);
            g.appendChild(distanceText);
            svg.appendChild(g);
            
            return { 
                element: circle, 
                id: node.id, 
                x: node.x, 
                y: node.y,
                distanceElement: distanceText
            };
        });
        
        vizContent.appendChild(svg);
        
        // 准备图算法动画
        this.prepareGraphAnimations();
    }

    clearVisualization() {
        const vizContent = document.getElementById('viz-content');
        vizContent.innerHTML = '';
        this.nodes = [];
        this.edges = [];
        this.visited.clear();
        this.distances = {};
        this.previous = {};
    }

    animateCompare(indices) {
        indices.forEach(nodeId => {
            const node = this.nodes.find(n => n.id === nodeId);
            if (node) {
                node.element.setAttribute('fill', this.options.colors.comparing);
                node.element.setAttribute('r', '35');
            }
        });
        
        setTimeout(() => {
            indices.forEach(nodeId => {
                const node = this.nodes.find(n => n.id === nodeId);
                if (node) {
                    node.element.setAttribute('r', '30');
                }
            });
        }, this.options.speed * 0.5);
    }

    animateSwap() {
        // 图算法不需要交换
    }

    animateHighlight(indices, color) {
        indices.forEach(nodeId => {
            const node = this.nodes.find(n => n.id === nodeId);
            if (node) {
                node.element.setAttribute('fill', color || this.options.colors.completed);
                this.visited.add(nodeId);
            }
        });
    }

    animateUpdate(nodeId, distance) {
        const node = this.nodes.find(n => n.id === nodeId);
        if (node && node.distanceElement) {
            node.distanceElement.textContent = distance === Infinity ? '∞' : distance;
            this.distances[nodeId] = distance;
        }
    }

    // 高亮边
    highlightEdge(from, to, color = '#22c55e') {
        const edge = this.edgeElements.find(e => 
            (e.from === from && e.to === to) || (e.from === to && e.to === from)
        );
        if (edge) {
            edge.element.setAttribute('stroke', color);
            edge.element.setAttribute('stroke-width', '5');
        }
    }

    prepareGraphAnimations() {
        this.animationQueue = [];
        
        switch (this.algorithm) {
            case 'dfs':
                this.prepareDFS('A');
                break;
            case 'bfs':
                this.prepareBFS('A');
                break;
            case 'dijkstra':
                this.prepareDijkstra('A');
                break;
            default:
                this.prepareDFS('A');
        }
    }

    /**
     * 深度优先搜索 - 增强版
     */
    prepareDFS(startNode) {
        this.updateComplexity('O(V+E)', 'O(V+E)', 'O(V+E)');
        
        this.animationQueue.push({
            type: 'explain',
            text: `深度优先搜索(DFS)：从节点 ${startNode} 开始，使用栈结构`
        });
        
        const visited = new Set();
        const stack = [startNode];
        const visitOrder = [];
        
        this.animationQueue.push({
            type: 'explain',
            text: `初始化：栈 = [${startNode}]`
        });
        
        while (stack.length > 0) {
            const current = stack.pop();
            
            if (!visited.has(current)) {
                visited.add(current);
                visitOrder.push(current);
                
                this.animationQueue.push({
                    type: 'compare',
                    indices: [current]
                });
                
                this.animationQueue.push({
                    type: 'highlight',
                    indices: [current],
                    color: this.options.colors.completed
                });
                
                this.animationQueue.push({
                    type: 'explain',
                    text: `访问节点 ${current}，已访问: [${visitOrder.join(', ')}]`
                });
                
                // 获取邻居节点并添加到栈中
                const neighbors = this.adjacencyList[current] || [];
                const unvisitedNeighbors = neighbors
                    .map(n => n.node)
                    .filter(neighbor => !visited.has(neighbor))
                    .reverse(); // 反转以保持正确的DFS顺序
                
                if (unvisitedNeighbors.length > 0) {
                    stack.push(...unvisitedNeighbors);
                    
                    this.animationQueue.push({
                        type: 'explain',
                        text: `将邻居节点 [${unvisitedNeighbors.join(', ')}] 加入栈，栈 = [${stack.join(', ')}]`
                    });
                    
                    // 高亮边
                    unvisitedNeighbors.forEach(neighbor => {
                        this.animationQueue.push({
                            type: 'custom',
                            action: () => this.highlightEdge(current, neighbor, '#fbbf24')
                        });
                    });
                }
            }
        }
        
        this.animationQueue.push({
            type: 'explain',
            text: `✅ DFS遍历完成！访问顺序: [${visitOrder.join(' → ')}]`
        });
    }

    /**
     * 广度优先搜索 - 增强版
     */
    prepareBFS(startNode) {
        this.updateComplexity('O(V+E)', 'O(V+E)', 'O(V+E)');
        
        this.animationQueue.push({
            type: 'explain',
            text: `广度优先搜索(BFS)：从节点 ${startNode} 开始，使用队列结构`
        });
        
        const visited = new Set();
        const queue = [startNode];
        const visitOrder = [];
        
        visited.add(startNode);
        
        this.animationQueue.push({
            type: 'explain',
            text: `初始化：队列 = [${startNode}]，标记 ${startNode} 为已访问`
        });
        
        while (queue.length > 0) {
            const current = queue.shift();
            visitOrder.push(current);
            
            this.animationQueue.push({
                type: 'compare',
                indices: [current]
            });
            
            this.animationQueue.push({
                type: 'highlight',
                indices: [current],
                color: this.options.colors.completed
            });
            
            this.animationQueue.push({
                type: 'explain',
                text: `处理节点 ${current}，队列 = [${queue.join(', ')}]`
            });
            
            // 获取未访问的邻居节点
            const neighbors = this.adjacencyList[current] || [];
            const unvisitedNeighbors = neighbors
                .map(n => n.node)
                .filter(neighbor => !visited.has(neighbor));
            
            unvisitedNeighbors.forEach(neighbor => {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    queue.push(neighbor);
                    
                    this.animationQueue.push({
                        type: 'explain',
                        text: `发现邻居 ${neighbor}，加入队列`
                    });
                    
                    // 高亮边
                    this.animationQueue.push({
                        type: 'custom',
                        action: () => this.highlightEdge(current, neighbor, '#22d3ee')
                    });
                }
            });
            
            if (unvisitedNeighbors.length > 0) {
                this.animationQueue.push({
                    type: 'explain',
                    text: `更新队列 = [${queue.join(', ')}]`
                });
            }
        }
        
        this.animationQueue.push({
            type: 'explain',
            text: `✅ BFS遍历完成！访问顺序: [${visitOrder.join(' → ')}]`
        });
    }

    /**
     * Dijkstra最短路径算法 - 完整实现
     */
    prepareDijkstra(startNode) {
        this.updateComplexity('O((V+E)log V)', 'O((V+E)log V)', 'O((V+E)log V)');
        
        this.animationQueue.push({
            type: 'explain',
            text: `Dijkstra最短路径算法：从节点 ${startNode} 开始计算到所有节点的最短距离`
        });
        
        // 初始化距离和前驱节点
        const distances = {};
        const previous = {};
        const unvisited = new Set();
        
        this.graph.nodes.forEach(node => {
            distances[node.id] = node.id === startNode ? 0 : Infinity;
            previous[node.id] = null;
            unvisited.add(node.id);
        });
        
        // 显示初始距离
        this.animationQueue.push({
            type: 'explain',
            text: `初始化距离：${startNode}=0，其他节点=∞`
        });
        
        Object.keys(distances).forEach(nodeId => {
            this.animationQueue.push({
                type: 'update',
                index: nodeId,
                value: distances[nodeId]
            });
        });
        
        while (unvisited.size > 0) {
            // 找到未访问节点中距离最小的
            let current = null;
            let minDistance = Infinity;
            
            for (const node of unvisited) {
                if (distances[node] < minDistance) {
                    minDistance = distances[node];
                    current = node;
                }
            }
            
            if (current === null || distances[current] === Infinity) {
                break;
            }
            
            unvisited.delete(current);
            
            this.animationQueue.push({
                type: 'compare',
                indices: [current]
            });
            
            this.animationQueue.push({
                type: 'highlight',
                indices: [current],
                color: this.options.colors.completed
            });
            
            this.animationQueue.push({
                type: 'explain',
                text: `选择距离最小的未访问节点 ${current}，距离=${distances[current]}`
            });
            
            // 更新邻居节点的距离
            const neighbors = this.adjacencyList[current] || [];
            
            neighbors.forEach(neighbor => {
                if (unvisited.has(neighbor.node)) {
                    const newDistance = distances[current] + neighbor.weight;
                    
                    this.animationQueue.push({
                        type: 'explain',
                        text: `检查邻居 ${neighbor.node}：当前距离=${distances[neighbor.node]}，新距离=${newDistance}`
                    });
                    
                    // 高亮正在检查的边
                    this.animationQueue.push({
                        type: 'custom',
                        action: () => this.highlightEdge(current, neighbor.node, '#f59e0b')
                    });
                    
                    if (newDistance < distances[neighbor.node]) {
                        distances[neighbor.node] = newDistance;
                        previous[neighbor.node] = current;
                        
                        this.animationQueue.push({
                            type: 'update',
                            index: neighbor.node,
                            value: newDistance
                        });
                        
                        this.animationQueue.push({
                            type: 'explain',
                            text: `✅ 更新 ${neighbor.node} 的最短距离为 ${newDistance}，前驱节点为 ${current}`
                        });
                        
                        // 高亮更新的路径
                        this.animationQueue.push({
                            type: 'custom',
                            action: () => this.highlightEdge(current, neighbor.node, '#22c55e')
                        });
                    } else {
                        this.animationQueue.push({
                            type: 'explain',
                            text: `❌ 不更新 ${neighbor.node}，当前路径更短`
                        });
                    }
                }
            });
        }
        
        // 显示最终结果
        const results = Object.keys(distances)
            .filter(node => node !== startNode)
            .map(node => `${node}:${distances[node] === Infinity ? '∞' : distances[node]}`)
            .join(', ');
        
        this.animationQueue.push({
            type: 'explain',
            text: `✅ Dijkstra算法完成！从 ${startNode} 到各节点的最短距离：${results}`
        });
        
        // 存储结果供后续使用
        this.distances = distances;
        this.previous = previous;
    }

    /**
     * 执行自定义动画
     */
    executeAnimation(animation) {
        if (animation.type === 'custom' && animation.action) {
            animation.action();
        } else {
            super.executeAnimation(animation);
        }
    }
}

// 导出增强版图算法可视化器
window.EnhancedGraphVisualizer = EnhancedGraphVisualizer;