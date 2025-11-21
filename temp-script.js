        // Minimal algorithm database (ASCII only to avoid encoding issues)
        const algorithmsDatabase = {
            'bubble-sort': {
                id: 'bubble-sort',
                name: 'Bubble Sort',
                category: 'sorting',
                difficulty: 'easy',
                icon: 'B',
                shortDesc: 'Simple comparison-based sorting by swapping adjacent elements.',
                description: 'Bubble sort repeatedly scans the array, swapping adjacent elements that are out of order. ' +
                    'After each pass, the largest unsorted element "bubbles" to the end. It is easy to implement but slow on large inputs.',
                applications: ['Teaching and demos', 'Very small arrays', 'Nearly sorted arrays'],
                features: {
                    'Stability': 'Stable (keeps equal elements in order).',
                    'In-place': 'Yes, only constant extra memory.',
                    'Idea': 'Repeatedly compare and swap adjacent elements.',
                    'Notes': 'Mainly useful for learning; rarely used in production.'
                },
                complexity: {
                    best: 'O(n)',
                    average: 'O(n^2)',
                    worst: 'O(n^2)',
                    space: 'O(1)',
                    explanation: 'Best case when the array is already sorted; otherwise needs about n^2/2 comparisons.'
                },
                code: `void bubbleSort(int a[], int n) {
    for (int i = 0; i < n - 1; ++i) {
        bool swapped = false;
        for (int j = 0; j < n - 1 - i; ++j) {
            if (a[j] > a[j + 1]) {
                swap(a[j], a[j + 1]);
                swapped = true;
            }
        }
        if (!swapped) break;
    }
}`
            },
            'quick-sort': {
                id: 'quick-sort',
                name: 'Quick Sort',
                category: 'sorting',
                difficulty: 'medium',
                icon: 'Q',
                shortDesc: 'Divide-and-conquer sorting with a pivot element.',
                description: 'Quick sort picks a pivot, partitions elements into those less than and greater than the pivot, ' +
                    'and recursively sorts the two parts. With good pivots it is very fast on large inputs.',
                applications: ['General-purpose sorting', 'Large arrays', 'Often used in library sort implementations'],
                features: {
                    'Stability': 'Not stable in typical in-place implementations.',
                    'In-place': 'Yes, in the common partition scheme.',
                    'Idea': 'Partition around a pivot and recurse.',
                    'Notes': 'Worst case can be O(n^2), but can be mitigated with better pivot choices.'
                },
                complexity: {
                    best: 'O(n log n)',
                    average: 'O(n log n)',
                    worst: 'O(n^2)',
                    space: 'O(log n)',
                    explanation: 'Average depth of recursion is about log n; worst case happens when partitioning is very unbalanced.'
                },
                code: `int partition(int a[], int l, int r) {
    int pivot = a[r];
    int i = l - 1;
    for (int j = l; j < r; ++j) {
        if (a[j] <= pivot) {
            ++i;
            swap(a[i], a[j]);
        }
    }
    swap(a[i + 1], a[r]);
    return i + 1;
}

void quickSort(int a[], int l, int r) {
    if (l >= r) return;
    int p = partition(a, l, r);
    quickSort(a, l, p - 1);
    quickSort(a, p + 1, r);
}`
            },
            'binary-search': {
                id: 'binary-search',
                name: 'Binary Search',
                category: 'searching',
                difficulty: 'easy',
                icon: 'S',
                shortDesc: 'Search in a sorted array by repeatedly halving the range.',
                description: 'Binary search works on sorted arrays. It compares the target with the middle element ' +
                    'and discards half of the remaining elements each step.',
                applications: ['Lookup in sorted arrays', 'Finding bounds (lower/upper bound)', 'Searching in answer space'],
                features: {
                    'Precondition': 'Input must be sorted.',
                    'Time efficiency': 'Very fast for large arrays.',
                    'Idea': 'Always jump to the middle of the current interval.',
                    'Notes': 'Implementation must carefully handle indices and overflow.'
                },
                complexity: {
                    best: 'O(1)',
                    average: 'O(log n)',
                    worst: 'O(log n)',
                    space: 'O(1)',
                    explanation: 'Each comparison halves the remaining search space, so about log2(n) steps.'
                },
                code: `int binarySearch(int a[], int n, int target) {
    int l = 0, r = n - 1;
    while (l <= r) {
        int mid = l + (r - l) / 2;
        if (a[mid] == target) return mid;
        else if (a[mid] < target) l = mid + 1;
        else r = mid - 1;
    }
    return -1;
}`
            },
            'dfs': {
                id: 'dfs',
                name: 'Depth-First Search (DFS)',
                category: 'graph',
                difficulty: 'medium',
                icon: 'G',
                shortDesc: 'Graph traversal that explores as deep as possible before backtracking.',
                description: 'DFS is used to traverse graphs and trees. It follows one path as far as it can, ' +
                    'then backtracks and explores alternative branches.',
                applications: ['Connectivity checks', 'Finding connected components', 'Topological sort', 'Maze and path search'],
                features: {
                    'Traversal order': 'Prioritizes depth over breadth.',
                    'Typical implementation': 'Recursive or using an explicit stack.',
                    'Space usage': 'Proportional to recursion depth (up to number of vertices).',
                    'Notes': 'Can be adapted for many problems such as cycle detection.'
                },
                complexity: {
                    best: 'O(V + E)',
                    average: 'O(V + E)',
                    worst: 'O(V + E)',
                    space: 'O(V)',
                    explanation: 'Each vertex and edge is processed a constant number of times.'
                },
                code: `void dfs(int v, vector<vector<int>>& g, vector<bool>& vis) {
    vis[v] = true;
    for (int u : g[v]) {
        if (!vis[u]) dfs(u, g, vis);
    }
}`
            }
        };

        let currentAlgorithmId = null;
        let seenAlgorithms = new Set();
        let visualizerInstance = null;

        function switchTab(name) {
            document.querySelectorAll('.tab-content').forEach(el => {
                el.classList.remove('active');
            });
            document.querySelectorAll('.tab-button').forEach(el => {
                el.classList.remove('active');
            });
            const content = document.getElementById('content-' + name);
            const tab = document.getElementById('tab-' + name);
            if (content && tab) {
                content.classList.add('active');
                tab.classList.add('active');
                localStorage.setItem('cspj-current-tab', name);
            }
        }

        function createAlgorithmCard(algo) {
            const difficultyClass = {
                easy: 'badge-easy',
                medium: 'badge-medium',
                hard: 'badge-hard'
            }[algo.difficulty] || 'badge-easy';

            const difficultyText = {
                easy: 'Easy',
                medium: 'Medium',
                hard: 'Hard'
            }[algo.difficulty] || 'Easy';

            return `
                <div class="algo-card rounded-lg bg-white px-3 py-2 flex items-center gap-3"
                     onclick="showAlgorithmDetail('${algo.id}')"
                     data-id="${algo.id}"
                     data-category="${algo.category}"
                     data-difficulty="${algo.difficulty}">
                    <div class="text-2xl">${algo.icon}</div>
                    <div class="flex-1 min-w-0">
                        <div class="text-sm font-semibold text-gray-800 truncate">${algo.name}</div>
                        <div class="text-xs text-gray-500 truncate">${algo.shortDesc}</div>
                    </div>
                    <span class="badge ${difficultyClass}">${difficultyText}</span>
                </div>
            `;
        }

        function renderAlgorithmList() {
            const list = document.getElementById('algorithm-list');
            if (!list) return;

            const keyword = (document.getElementById('search-input')?.value || '').trim().toLowerCase();
            const category = localStorage.getItem('cspj-category-filter') || 'all';

            const items = Object.values(algorithmsDatabase).filter(algo => {
                if (category !== 'all' && algo.category !== category) return false;
                if (!keyword) return true;
                const text = `${algo.name} ${algo.shortDesc} ${algo.category}`.toLowerCase();
                return text.includes(keyword);
            });

            if (!items.length) {
                list.innerHTML = '<p class="text-xs text-gray-500">No algorithms match the filter.</p>';
                return;
            }

            list.innerHTML = items.map(createAlgorithmCard).join('');
        }

        function filterAlgorithmList() {
            renderAlgorithmList();
        }

        function setCategoryFilter(category) {
            localStorage.setItem('cspj-category-filter', category);
            renderAlgorithmList();
        }

        function showAlgorithmDetail(id) {
            const algo = algorithmsDatabase[id];
            if (!algo) return;

            currentAlgorithmId = id;
            seenAlgorithms.add(id);

            const defaultPrompt = document.getElementById('default-prompt');
            const detailContent = document.getElementById('detail-content');
            if (defaultPrompt && detailContent) {
                defaultPrompt.classList.add('hidden');
                detailContent.classList.remove('hidden');
            }

            document.querySelectorAll('#algorithm-list .algo-card').forEach(card => {
                if (card.dataset.id === id) {
                    card.classList.add('ring-2', 'ring-indigo-500', 'ring-offset-1');
                } else {
                    card.classList.remove('ring-2', 'ring-indigo-500', 'ring-offset-1');
                }
            });

            document.getElementById('detail-icon').textContent = algo.icon;
            document.getElementById('detail-name').textContent = algo.name;

            const difficultyMap = {
                easy: { text: 'Easy', cls: 'badge badge-easy' },
                medium: { text: 'Medium', cls: 'badge badge-medium' },
                hard: { text: 'Hard', cls: 'badge badge-hard' }
            };
            const diff = difficultyMap[algo.difficulty] || difficultyMap.easy;
            const diffEl = document.getElementById('detail-difficulty');
            diffEl.className = diff.cls;
            diffEl.textContent = diff.text;

            const categoryText = {
                sorting: 'Sorting',
                searching: 'Searching',
                graph: 'Graph'
            }[algo.category] || 'Algorithm';
            document.getElementById('detail-category').textContent = categoryText;

            document.getElementById('detail-description').textContent = algo.description;
            document.getElementById('detail-applications').innerHTML =
                algo.applications.map(a => `<li>${a}</li>`).join('');

            const featuresHtml = Object.entries(algo.features).map(([k, v]) => `
                <div class="bg-white border rounded px-2 py-1.5">
                    <div class="text-xs text-gray-500 mb-0.5">${k}</div>
                    <div class="text-xs text-gray-800">${v}</div>
                </div>
            `).join('');
            document.getElementById('detail-features').innerHTML = featuresHtml;

            document.getElementById('code-content').textContent = algo.code;

            document.getElementById('complexity-best').textContent = algo.complexity.best;
            document.getElementById('complexity-average').textContent = algo.complexity.average;
            document.getElementById('complexity-worst').textContent = algo.complexity.worst;
            document.getElementById('complexity-space').textContent = algo.complexity.space;
            document.getElementById('complexity-explanation').textContent = algo.complexity.explanation;

            updateProgressDisplay();
        }

        function startVisualization() {
            if (!currentAlgorithmId) {
                alert('Please select an algorithm first.');
                return;
            }

            switchTab('visualizer');

            try {
                const containerId = 'visualizer-container';
                const container = document.getElementById(containerId);
                if (!container) return;

                if (visualizerInstance && typeof visualizerInstance.destroy === 'function') {
                    visualizerInstance.destroy();
                }
                container.innerHTML = '';

                const algo = algorithmsDatabase[currentAlgorithmId];
                let category = algo.category;

                if (category === 'sorting') {
                    const variant = currentAlgorithmId === 'bubble-sort' ? 'bubble' : 'quick';
                    visualizerInstance = new SortingVisualizer(containerId, variant, { speed: 500 });
                } else if (category === 'searching') {
                    visualizerInstance = new SearchVisualizer(containerId, 'binary', { speed: 500 });
                } else if (category === 'graph') {
                    visualizerInstance = new GraphVisualizer(containerId, 'dfs', { speed: 500 });
                }

                if (!visualizerInstance) {
                    console.warn('No visualizer configured for algorithm:', currentAlgorithmId);
                    document.getElementById('visualizer-info').textContent =
                        'No visualizer is configured for this algorithm.';
                    return;
                }

                if (typeof visualizerInstance.init === 'function') {
                    visualizerInstance.init();
                }

                document.getElementById('visualizer-info').textContent =
                    'Showing a demo visualization for: ' + algo.name + '.';
            } catch (error) {
                console.error('Failed to start visualization:', error);
                if (window.ErrorHandler && typeof window.ErrorHandler.handle === 'function') {
                    window.ErrorHandler.handle(error, 'startVisualization');
                } else {
                    alert('Failed to start visualization: ' + error.message);
                }
            }
        }

        function updateProgressDisplay() {
            const completed = seenAlgorithms.size;
            document.getElementById('completed-algorithms').textContent = completed;
            document.getElementById('study-time').textContent = completed * 5;
            document.getElementById('badges-count').textContent = Math.floor(completed / 2);
        }

        window.addEventListener('DOMContentLoaded', () => {
            try {
                console.log('AlgorithmVisualizer type:', typeof AlgorithmVisualizer);
                console.log('SortingVisualizer type:', typeof SortingVisualizer);

                const tab = localStorage.getItem('cspj-current-tab') || 'algorithms';
                switchTab(tab);
                renderAlgorithmList();
                updateProgressDisplay();
            } catch (e) {
                console.error('Error while initialising optimized page:', e);
            }
        });
    </script>
</body>
