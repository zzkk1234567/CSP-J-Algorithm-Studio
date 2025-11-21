// 增强版图算法可视化系统 - 带详细中文解释
// 为每个算法步骤添加详细的中文文字说明

/**
 * 带详细解释的图算法可视化器
 * 提供完整的中文步骤说明和计算过程解释
 */
class DetailedGraphVisualizer extends AlgorithmVisualizer {
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
        this.stepCounter = 0;
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
        this.stepCounter = 0;
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

    // 添加步骤计数器
    addStepExplanation(text) {
        this.stepCounter++;
        this.animationQueue.push({
            type: 'explain',
            text: `📍 步骤 ${this.stepCounter}: ${text}`
        });
    }

    prepareGraphAnimations() {
        this.animationQueue = [];
        this.stepCounter = 0;
        
        switch (this.algorithm) {
            case 'dfs':
                this.prepareDFSWithExplanations('A');
                break;
            case 'bfs':
                this.prepareBFSWithExplanations('A');
                break;
            case 'dijkstra':
                this.prepareDijkstraWithExplanations('A');
                break;
            default:
                this.prepareDFSWithExplanations('A');
        }
    }

    /**
     * 深度优先搜索 - 带详细中文解释
     */
    prepareDFSWithExplanations(startNode) {
        this.updateComplexity('O(V+E)', 'O(V+E)', 'O(V+E)');
        
        // 算法开始说明
        this.animationQueue.push({
            type: 'explain',
            text: `🚀 开始深度优先搜索(DFS)算法演示`
        });
        
        this.addStepExplanation(`选择起始节点 ${startNode}，DFS使用栈数据结构来记录访问路径`);
        
        const visited = new Set();
        const stack = [startNode];
        const visitOrder = [];
        
        this.addStepExplanation(`初始化栈，将起始节点 ${startNode} 压入栈中`);
        this.animationQueue.push({
            type: 'explain',
            text: `📚 当前栈状态: [${stack.join(', ')}] | 已访问节点: []`
        });
        
        while (stack.length > 0) {
            const current = stack.pop();
            
            if (!visited.has(current)) {
                visited.add(current);
                visitOrder.push(current);
                
                this.addStepExplanation(`从栈顶弹出节点 ${current}，标记为已访问`);
                
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
                    text: `✅ 访问节点 ${current} | 访问顺序: [${visitOrder.join(' → ')}]`
                });
                
                // 获取邻居节点
                const neighbors = this.adjacencyList[current] || [];
                const unvisitedNeighbors = neighbors
                    .map(n => n.node)
                    .filter(neighbor => !visited.has(neighbor) && !stack.includes(neighbor))
                    .reverse(); // 反转以保持正确的DFS顺序
                
                if (unvisitedNeighbors.length > 0) {
                    this.addStepExplanation(`检查节点 ${current} 的邻居节点: [${neighbors.map(n => n.node).join(', ')}]`);
                    
                    this.animationQueue.push({
                        type: 'explain',
                        text: `🔍 发现未访问的邻居节点: [${unvisitedNeighbors.join(', ')}]`
                    });
                    
                    // 将未访问的邻居加入栈
                    stack.push(...unvisitedNeighbors);
                    
                    this.addStepExplanation(`将未访问邻居按DFS顺序压入栈中`);
                    this.animationQueue.push({
                        type: 'explain',
                        text: `📚 更新栈状态: [${stack.join(', ')}]`
                    });
                    
                    // 高亮连接边
                    unvisitedNeighbors.forEach(neighbor => {
                        this.animationQueue.push({
                            type: 'custom',
                            action: () => this.highlightEdge(current, neighbor, '#fbbf24')
                        });
                    });
                    
                    this.animationQueue.push({
                        type: 'explain',
                        text: `🔗 高亮显示从 ${current} 到邻居节点的连接边`
                    });
                } else {
                    this.addStepExplanation(`节点 ${current} 没有未访问的邻居节点，继续处理栈中的下一个节点`);
                }
            } else {
                this.addStepExplanation(`节点 ${current} 已经访问过，跳过处理`);
            }
        }
        
        this.addStepExplanation(`栈为空，DFS遍历完成`);
        this.animationQueue.push({
            type: 'explain',
            text: `🎉 DFS遍历完成！最终访问顺序: [${visitOrder.join(' → ')}]`
        });
        
        this.animationQueue.push({
            type: 'explain',
            text: `📊 算法总结: 共访问了 ${visitOrder.length} 个节点，使用栈实现深度优先策略`
        });
    }

    /**
     * 广度优先搜索 - 带详细中文解释
     */
    prepareBFSWithExplanations(startNode) {
        this.updateComplexity('O(V+E)', 'O(V+E)', 'O(V+E)');
        
        // 算法开始说明
        this.animationQueue.push({
            type: 'explain',
            text: `🚀 开始广度优先搜索(BFS)算法演示`
        });
        
        this.addStepExplanation(`选择起始节点 ${startNode}，BFS使用队列数据结构来实现层次遍历`);
        
        const visited = new Set();
        const queue = [startNode];
        const visitOrder = [];
        
        visited.add(startNode);
        
        this.addStepExplanation(`初始化队列，将起始节点 ${startNode} 加入队列并标记为已访问`);
        this.animationQueue.push({
            type: 'explain',
            text: `📋 当前队列状态: [${queue.join(', ')}] | 已访问节点: [${startNode}]`
        });
        
        while (queue.length > 0) {
            const current = queue.shift();
            visitOrder.push(current);
            
            this.addStepExplanation(`从队列头部取出节点 ${current} 进行处理`);
            
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
                text: `✅ 处理节点 ${current} | 处理顺序: [${visitOrder.join(' → ')}]`
            });
            
            // 获取未访问的邻居节点
            const neighbors = this.adjacencyList[current] || [];
            const allNeighbors = neighbors.map(n => n.node);
            const unvisitedNeighbors = allNeighbors.filter(neighbor => !visited.has(neighbor));
            
            if (allNeighbors.length > 0) {
                this.addStepExplanation(`检查节点 ${current} 的所有邻居: [${allNeighbors.join(', ')}]`);
            }
            
            if (unvisitedNeighbors.length > 0) {
                this.animationQueue.push({
                    type: 'explain',
                    text: `🔍 发现未访问的邻居节点: [${unvisitedNeighbors.join(', ')}]`
                });
                
                unvisitedNeighbors.forEach(neighbor => {
                    if (!visited.has(neighbor)) {
                        visited.add(neighbor);
                        queue.push(neighbor);
                        
                        this.addStepExplanation(`将邻居节点 ${neighbor} 标记为已访问并加入队列`);
                        
                        // 高亮边
                        this.animationQueue.push({
                            type: 'custom',
                            action: () => this.highlightEdge(current, neighbor, '#22d3ee')
                        });
                    }
                });
                
                this.animationQueue.push({
                    type: 'explain',
                    text: `📋 更新队列状态: [${queue.join(', ')}] | 已访问: [${Array.from(visited).join(', ')}]`
                });
                
                this.animationQueue.push({
                    type: 'explain',
                    text: `🔗 高亮显示新发现的连接边，体现BFS的层次扩展特性`
                });
            } else {
                this.addStepExplanation(`节点 ${current} 的所有邻居都已访问过`);
            }
        }
        
        this.addStepExplanation(`队列为空，BFS遍历完成`);
        this.animationQueue.push({
            type: 'explain',
            text: `🎉 BFS遍历完成！最终访问顺序: [${visitOrder.join(' → ')}]`
        });
        
        this.animationQueue.push({
            type: 'explain',
            text: `📊 算法总结: 共访问了 ${visitOrder.length} 个节点，使用队列实现广度优先策略，保证了层次遍历的特性`
        });
    }

    /**
     * Dijkstra最短路径算法 - 带详细中文解释
     */
    prepareDijkstraWithExplanations(startNode) {
        this.updateComplexity('O((V+E)log V)', 'O((V+E)log V)', 'O((V+E)log V)');
        
        // 算法开始说明
        this.animationQueue.push({
            type: 'explain',
            text: `🚀 开始Dijkstra最短路径算法演示`
        });
        
        this.addStepExplanation(`Dijkstra算法用于计算从源点到所有其他节点的最短路径`);
        
        // 初始化距离和前驱节点
        const distances = {};
        const previous = {};
        const unvisited = new Set();
        
        this.graph.nodes.forEach(node => {
            distances[node.id] = node.id === startNode ? 0 : Infinity;
            previous[node.id] = null;
            unvisited.add(node.id);
        });
        
        this.addStepExplanation(`初始化所有节点的距离值`);
        this.animationQueue.push({
            type: 'explain',
            text: `📊 初始距离设置: ${startNode}=0，其他节点=∞(无穷大)`
        });
        
        // 显示初始距离
        Object.keys(distances).forEach(nodeId => {
            this.animationQueue.push({
                type: 'update',
                index: nodeId,
                value: distances[nodeId]
            });
        });
        
        this.animationQueue.push({
            type: 'explain',
            text: `💡 算法原理: 每次选择距离最小的未访问节点，更新其邻居的距离（松弛操作）`
        });
        
        let iteration = 0;
        
        while (unvisited.size > 0) {
            iteration++;
            
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
                this.addStepExplanation(`剩余节点都不可达，算法结束`);
                break;
            }
            
            unvisited.delete(current);
            
            this.addStepExplanation(`第 ${iteration} 轮迭代: 选择距离最小的未访问节点`);
            
            this.animationQueue.push({
                type: 'explain',
                text: `🎯 在未访问节点 [${Array.from(unvisited).join(', ')}, ${current}] 中选择距离最小的节点 ${current}`
            });
            
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
                text: `✅ 确定节点 ${current} 的最短距离为 ${distances[current]}，标记为已访问`
            });
            
            // 更新邻居节点的距离
            const neighbors = this.adjacencyList[current] || [];
            
            if (neighbors.length > 0) {
                this.addStepExplanation(`检查节点 ${current} 的所有邻居，进行松弛操作`);
                
                this.animationQueue.push({
                    type: 'explain',
                    text: `🔍 检查节点 ${current} 的邻居: [${neighbors.map(n => n.node).join(', ')}]`
                });
            }
            
            neighbors.forEach((neighbor, index) => {
                if (unvisited.has(neighbor.node)) {
                    const newDistance = distances[current] + neighbor.weight;
                    
                    this.addStepExplanation(`松弛操作: 检查通过 ${current} 到达 ${neighbor.node} 的路径`);
                    
                    this.animationQueue.push({
                        type: 'explain',
                        text: `🧮 计算新距离: ${distances[current]} + ${neighbor.weight} = ${newDistance}`
                    });
                    
                    this.animationQueue.push({
                        type: 'explain',
                        text: `📏 节点 ${neighbor.node} 当前最短距离: ${distances[neighbor.node] === Infinity ? '∞' : distances[neighbor.node]}`
                    });
                    
                    // 高亮正在检查的边
                    this.animationQueue.push({
                        type: 'custom',
                        action: () => this.highlightEdge(current, neighbor.node, '#f59e0b')
                    });
                    
                    if (newDistance < distances[neighbor.node]) {
                        const oldDistance = distances[neighbor.node];
                        distances[neighbor.node] = newDistance;
                        previous[neighbor.node] = current;
                        
                        this.addStepExplanation(`发现更短路径! 更新 ${neighbor.node} 的最短距离`);
                        
                        this.animationQueue.push({
                            type: 'update',
                            index: neighbor.node,
                            value: newDistance
                        });
                        
                        this.animationQueue.push({
                            type: 'explain',
                            text: `✅ 更新成功: ${neighbor.node} 的距离从 ${oldDistance === Infinity ? '∞' : oldDistance} 更新为 ${newDistance}`
                        });
                        
                        this.animationQueue.push({
                            type: 'explain',
                            text: `🔗 记录最短路径: ${neighbor.node} 的前驱节点设为 ${current}`
                        });
                        
                        // 高亮更新的路径
                        this.animationQueue.push({
                            type: 'custom',
                            action: () => this.highlightEdge(current, neighbor.node, '#22c55e')
                        });
                    } else {
                        this.addStepExplanation(`当前路径不是更短路径，保持原有距离`);
                        
                        this.animationQueue.push({
                            type: 'explain',
                            text: `❌ 新距离 ${newDistance} ≥ 当前距离 ${distances[neighbor.node]}，不更新`
                        });
                    }
                } else {
                    this.animationQueue.push({
                        type: 'explain',
                        text: `⏭️ 节点 ${neighbor.node} 已访问，跳过`
                    });
                }
            });
            
            if (neighbors.length > 0) {
                this.animationQueue.push({
                    type: 'explain',
                    text: `📋 第 ${iteration} 轮完成，剩余未访问节点: [${Array.from(unvisited).join(', ')}]`
                });
            }
        }
        
        // 显示最终结果
        const results = Object.keys(distances)
            .filter(node => node !== startNode)
            .map(node => `${node}:${distances[node] === Infinity ? '∞' : distances[node]}`)
            .join(', ');
        
        this.addStepExplanation(`算法完成，所有节点的最短距离已确定`);
        
        this.animationQueue.push({
            type: 'explain',
            text: `🎉 Dijkstra算法完成！从 ${startNode} 到各节点的最短距离:`
        });
        
        this.animationQueue.push({
            type: 'explain',
            text: `📊 最终结果: ${results}`
        });
        
        // 构建最短路径树的说明
        const pathExplanations = Object.keys(previous)
            .filter(node => node !== startNode && previous[node] !== null)
            .map(node => {
                const path = this.buildPath(previous, startNode, node);
                return `${startNode}→${node}: [${path.join(' → ')}] (距离: ${distances[node]})`;
            });
        
        if (pathExplanations.length > 0) {
            this.animationQueue.push({
                type: 'explain',
                text: `🛤️ 最短路径详情:`
            });
            
            pathExplanations.forEach(pathExp => {
                this.animationQueue.push({
                    type: 'explain',
                    text: `   ${pathExp}`
                });
            });
        }
        
        this.animationQueue.push({
            type: 'explain',
            text: `💡 算法总结: Dijkstra使用贪心策略，每次选择距离最小的节点，保证了最优解的正确性`
        });
        
        // 存储结果供后续使用
        this.distances = distances;
        this.previous = previous;
    }

    /**
     * 构建从源点到目标点的路径
     */
    buildPath(previous, start, end) {
        const path = [];
        let current = end;
        
        while (current !== null) {
            path.unshift(current);
            current = previous[current];
        }
        
        return path;
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

// 导出带详细解释的图算法可视化器
window.DetailedGraphVisualizer = DetailedGraphVisualizer;