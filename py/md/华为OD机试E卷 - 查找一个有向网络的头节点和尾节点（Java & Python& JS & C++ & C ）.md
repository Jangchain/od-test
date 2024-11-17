## 题目描述

给定一个有向图，图中可能包含有环，图使用二维矩阵表示，每一行的第一列表示起始节点，第二列表示终止节点，如 [0, 1] 表示从 0 到 1 的路径。

每个节点用正整数表示。求这个数据的首节点与尾节点，题目给的用例会是一个首节点，但可能存在多个尾节点。同时图中可能含有环。如果图中含有环，返回 [-1]。

说明：入度为0是首节点，出度为0是尾节点。

![image-20240121210316419](https://i-blog.csdnimg.cn/blog_migrate/03a9b32046af0c1a330a3bd43353da74.png)

## 输入描述

第一行为后续输入的键值对数量N（N ≥ 0）

第二行为2N个数字。每两个为一个起点，一个终点.

## 输出描述

输出一行头节点和尾节点。如果有多个尾节点，按从小到大的顺序输出

##### 备注

  * 如果图有环，输出为 -1
  * 所有输入均合法，不会出现不配对的数据

## 用例1

输入

    
    
    4
    0 1 0 2 1 2 2 3
    

输出

    
    
    0 3
    

说明

![image-20240121210602591](https://i-blog.csdnimg.cn/blog_migrate/542b36af701ab5773d7c03503e93f77f.png)

## 用例2

输入

    
    
    2
    0 1 0 2
    

输出

    
    
    0 1 2
    

说明

![image-20240121210613459](https://i-blog.csdnimg.cn/blog_migrate/56a4e0be85a4eb74c8b441816aa96740.png)

## 解题思路

#### 环的检测

  1. **DFS实现** :

     * 为了进行DFS，首先构建了图的邻接表表示。这是通过将边信息转换成每个节点的邻接节点列表来完成的。
     * 然后，对每个节点进行DFS遍历。
     * 在遍历过程中，维护两个集合：`visited`和`recStack`。 
       * `visited`用于记录已经访问过的节点。
       * `recStack`用于记录当前递归调用栈中的节点。
  2. **检测环的逻辑** :

     * 在DFS遍历中，如果当前节点已在`recStack`中，则表示找到了一个环，因为这意味着在遍历过程中回到了正在访问的节点。
     * 如果节点在`visited`中但不在`recStack`中，这意味着节点已被访问且没有形成环。
     * 对每个邻接节点重复这个过程。
  3. **结束条件** :

     * 如果在任何节点的DFS遍历中检测到环，立即返回`true`，表示图中存在环。
     * 如果所有节点都被遍历过，且没有检测到环，则返回`false`。

#### 确定起点和终点

  1. **起点和终点的定义** :

     * 起点是指没有入度的节点，即没有其他节点指向它的节点。
     * 终点是指没有出度的节点，即它不指向任何其他节点的节点。
  2. **查找方法** :

     * 遍历所有节点，检查它们的入度和出度。
     * 对于每个节点，如果它在`inDegree`映射中没有记录，那么它就是起点。
     * 如果它在`outDegree`映射中没有记录，那么它就是终点。
  3. **存储结果** :

     * 结果数组首先存储起点，然后是所有终点。
     * 这个数组最后返回作为方法的输出。

## C++

    
    
    #include <iostream>
    #include <string>
    #include <sstream>
    #include <vector>
    #include <map>
    #include <set>
    // 递归检测图中是否有环
    bool detectCycle(const std::map<int, std::vector<int>>& graph, int node, std::set<int>& visited, std::set<int>& recStack) {
        if (recStack.find(node) != recStack.end()) {
            return true;
        }
        if (visited.find(node) != visited.end()) {
            return false;
        }
    
        visited.insert(node);
        recStack.insert(node);
    
        const std::vector<int>& neighbors = graph.at(node);
        for (int neighbor : neighbors) {
            if (detectCycle(graph, neighbor, visited, recStack)) {
                return true;
            }
        }
    
        recStack.erase(node);
        return false;
    }
    // 检测图中是否有环
    bool hasCycle(const std::set<int>& nodes, const std::vector<int>& edges) {
        std::map<int, std::vector<int>> graph;
        for (int node : nodes) {
            graph[node] = std::vector<int>();
        }
    
        for (size_t i = 0; i < edges.size(); i += 2) {
            graph[edges[i]].push_back(edges[i + 1]);
        }
    
        std::set<int> visited;
        std::set<int> recStack;
    
        for (int node : nodes) {
            if (detectCycle(graph, node, visited, recStack)) {
                return true;
            }
        }
    
        return false;
    }
    // 寻找起点和终点节点
    std::vector<int> findStartAndEndNodes(const std::vector<int>& edges) {
        std::map<int, int> inDegree, outDegree;
        std::set<int> nodes;
    
        // 构建入度和出度的映射
        for (size_t i = 0; i < edges.size(); i += 2) {
            int start = edges[i];
            int end = edges[i + 1];
            nodes.insert(start);
            nodes.insert(end);
            inDegree[end]++;
            outDegree[start]++;
        }
    
        // 检测是否有环
        if (hasCycle(nodes, edges)) {
            return {-1};
        }
    
        // 寻找起点和终点
        std::vector<int> endNodes;
        int startNode = -1;
        for (int node : nodes) {
            if (inDegree.find(node) == inDegree.end()) {
                startNode = node;
            }
            if (outDegree.find(node) == outDegree.end()) {
                endNodes.push_back(node);
            }
        }
    
        std::vector<int> result = {startNode};
        result.insert(result.end(), endNodes.begin(), endNodes.end());
        return result;
    }
    
    
    
    
    
    // 主函数
    int main() {
        std::string line;
        std::getline(std::cin, line); // 读取N，但在这个程序中不使用
        std::getline(std::cin, line); // 读取边的数据
    
        std::istringstream iss(line);
        std::vector<int> edges;
        int edge;
        while (iss >> edge) {
            edges.push_back(edge);
        }
    
        std::vector<int> result = findStartAndEndNodes(edges);
        for (int num : result) {
            std::cout << num << ' ';
        }
        std::cout << std::endl;
    
        return 0;
    }
    

## Java

    
    
    import java.util.*;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            // 读取边的数量
            int N = scanner.nextInt();
            // 存储所有边的数组
            int[] edges = new int[2 * N];
            for (int i = 0; i < 2 * N; i++) {
                // 读取每条边的起点和终点
                edges[i] = scanner.nextInt();
            }
    
            // 找出起点和终点
            int[] result = findStartAndEndNodes(edges);
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < result.length; i++) {
                // 构建输出字符串
                sb.append(result[i]);
                if (i < result.length - 1) {
                    sb.append(" ");
                }
            }
            // 打印结果
            System.out.println(sb.toString());
        }
    
        // 方法：找出起点和终点
        private static int[] findStartAndEndNodes(int[] edges) {
            // 存储每个节点的入度
            Map<Integer, Integer> inDegree = new HashMap<>();
            // 存储每个节点的出度
            Map<Integer, Integer> outDegree = new HashMap<>();
            // 存储所有节点
            Set<Integer> nodes = new HashSet<>();
    
            for (int i = 0; i < edges.length; i += 2) {
                int start = edges[i];
                int end = edges[i + 1];
    
                // 添加节点
                nodes.add(start);
                nodes.add(end);
    
                // 计算入度和出度
                inDegree.put(end, inDegree.getOrDefault(end, 0) + 1);
                outDegree.put(start, outDegree.getOrDefault(start, 0) + 1);
            }
    
            // 检查是否有环
            if (hasCycle(nodes, edges)) {
                return new int[]{-1};
            }
    
            // 找出终点
            List<Integer> endNodes = new ArrayList<>();
            // 起点
            int startNode = -1;
            for (int node : nodes) {
                // 如果一个节点没有入度，它是起点
                if (!inDegree.containsKey(node)) {
                    startNode = node;
                }
                // 如果一个节点没有出度，它是终点
                if (!outDegree.containsKey(node)) {
                    endNodes.add(node);
                }
            }
    
            // 构建结果数组
            int[] result = new int[endNodes.size() + 1];
            result[0] = startNode;
            for (int i = 0; i < endNodes.size(); i++) {
                result[i + 1] = endNodes.get(i);
            }
    
            return result;
        }
    
        // 方法：检查是否有环
        private static boolean hasCycle(Set<Integer> nodes, int[] edges) {
            // 构建图
            Map<Integer, List<Integer>> graph = new HashMap<>();
            for (int node : nodes) {
                graph.put(node, new ArrayList<>());
            }
            for (int i = 0; i < edges.length; i += 2) {
                graph.get(edges[i]).add(edges[i + 1]);
            }
    
            // 记录已访问和回溯栈的节点
            Set<Integer> visited = new HashSet<>();
            Set<Integer> recStack = new HashSet<>();
    
            // 检查每个节点是否有环
            for (int node : nodes) {
                if (detectCycle(graph, node, visited, recStack)) {
                    return true;
                }
            }
    
            return false;
        }
    
        // 辅助方法：递归检查环
        private static boolean detectCycle(Map<Integer, List<Integer>> graph, int node, 
                                           Set<Integer> visited, Set<Integer> recStack) {
            // 如果节点在回溯栈中，表示有环
            if (recStack.contains(node)) {
                return true;
            }
            // 如果已经访问过，不需要再次访问
            if (visited.contains(node)) {
                return false;
            }
    
            // 标记节点为已访问，并加入回溯栈
            visited.add(node);
            recStack.add(node);
    
            // 检查相邻节点
            List<Integer> neighbors = graph.get(node);
            for (int neighbor : neighbors) {
                if (detectCycle(graph, neighbor, visited, recStack)) {
                    return true;
                }
            }
    
            // 从回溯栈中移除节点
            recStack.remove(node);
            return false;
        }
    }
    

## javaScript

    
    
    // 导入必要的模块
    const readline = require('readline');
    
    // 创建读取行的接口
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
     
    rl.on('line', (N) => {
        rl.on('line', (edgesString) => {
            const edges = edgesString.split(' ').map(Number);
            const result = findStartAndEndNodes(edges);
            console.log(result.join(' '));
            rl.close();
        });
    });
    
    
    // 寻找起点和终点节点
    function findStartAndEndNodes(edges) {
        // 存储入度和出度
        let inDegree = new Map();
        let outDegree = new Map();
        let nodes = new Set();
    
        // 构建入度和出度的映射
        for (let i = 0; i < edges.length; i += 2) {
            let start = edges[i];
            let end = edges[i + 1];
            nodes.add(start);
            nodes.add(end);
            inDegree.set(end, (inDegree.get(end) || 0) + 1);
            outDegree.set(start, (outDegree.get(start) || 0) + 1);
        }
    
        // 检测是否有环
        if (hasCycle(nodes, edges)) {
            return [-1];
        }
    
        // 寻找起点和终点
        let endNodes = [];
        let startNode = -1;
        for (let node of nodes) {
            if (!inDegree.has(node)) {
                startNode = node;
            }
            if (!outDegree.has(node)) {
                endNodes.push(node);
            }
        }
    
        return [startNode, ...endNodes];
    }
    
    // 检测图中是否有环
    function hasCycle(nodes, edges) {
        let graph = new Map();
        nodes.forEach(node => graph.set(node, []));
    
        for (let i = 0; i < edges.length; i += 2) {
            graph.get(edges[i]).push(edges[i + 1]);
        }
    
        let visited = new Set();
        let recStack = new Set();
    
        for (let node of nodes) {
            if (detectCycle(graph, node, visited, recStack)) {
                return true;
            }
        }
    
        return false;
    }
    
    // 递归检测图中是否有环
    function detectCycle(graph, node, visited, recStack) {
        if (recStack.has(node)) {
            return true;
        }
        if (visited.has(node)) {
            return false;
        }
    
        visited.add(node);
        recStack.add(node);
    
        let neighbors = graph.get(node);
        for (let neighbor of neighbors) {
            if (detectCycle(graph, neighbor, visited, recStack)) {
                return true;
            }
        }
    
        recStack.delete(node);
        return false;
    }
     
    

## Python

    
    
    def find_start_and_end_nodes(edges):
        """
        寻找起点和终点节点。
    
        参数:
        edges - 边的数组。
    
        返回:
        起点和所有终点的数组。
        """
        in_degree = {}  # 用于存储每个节点的入度
        out_degree = {}  # 用于存储每个节点的出度
        nodes = set()  # 存储所有节点
    
        # 遍历边，构建入度和出度的映射
        for i in range(0, len(edges), 2):
            start, end = edges[i], edges[i + 1]
            nodes.add(start)
            nodes.add(end)
            in_degree[end] = in_degree.get(end, 0) + 1
            out_degree[start] = out_degree.get(start, 0) + 1
    
        # 检测是否有环
        if has_cycle(nodes, edges):
            return [-1]
    
        # 寻找起点和终点
        end_nodes = []
        start_node = -1
        for node in nodes:
            if node not in in_degree:
                start_node = node
            if node not in out_degree:
                end_nodes.append(node)
    
        return [start_node] + end_nodes
    
    def has_cycle(nodes, edges):
        """
        检测图中是否有环。
    
        参数:
        nodes - 节点集合。
        edges - 边的数组。
    
        返回:
        布尔值，表示图中是否有环。
        """
        graph = {node: [] for node in nodes}
        for i in range(0, len(edges), 2):
            graph[edges[i]].append(edges[i + 1])
    
        visited = set()
        rec_stack = set()
    
        for node in nodes:
            if detect_cycle(graph, node, visited, rec_stack):
                return True
    
        return False
    
    def detect_cycle(graph, node, visited, rec_stack):
        """
        递归检测图中是否有环。
    
        参数:
        graph - 图的邻接表表示。
        node - 当前检测的节点。
        visited - 访问过的节点集合。
        rec_stack - 递归栈。
    
        返回:
        布尔值，表示从当前节点开始是否有环。
        """
        if node in rec_stack:
            return True
        if node in visited:
            return False
    
        visited.add(node)
        rec_stack.add(node)
    
        for neighbor in graph[node]:
            if detect_cycle(graph, neighbor, visited, rec_stack):
                return True
    
        rec_stack.remove(node)
        return False
    
    # 主函数
    def main():
        N = int(input())
        edges =  list(map(int, input().split()))
    
        result = find_start_and_end_nodes(edges)
        print(" ".join(map(str, result)))
    
    if __name__ == "__main__":
        main()
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    #include <string.h>
    
    #define MAX_EDGES 1000 // 定义最大边数
    
    // 图的结构体定义
    typedef struct {
        int node; // 节点编号
        int neighbors[MAX_EDGES]; // 邻接节点数组
        int neighbor_count; // 邻接节点的数量
    } Graph;
    
    // 集合的结构体定义
    typedef struct {
        int items[MAX_EDGES]; // 集合中的元素数组
        int size; // 集合中元素的数量
    } Set;
    
    // 向集合中插入元素
    void set_insert(Set *set, int item) {
        for (int i = 0; i < set->size; i++) {
            if (set->items[i] == item) {
                return; // 如果元素已存在，直接返回
            }
        }
        set->items[set->size++] = item; // 插入元素到集合中
    }
    
    // 检查集合中是否包含某元素
    int set_contains(Set *set, int item) {
        for (int i = 0; i < set->size; i++) {
            if (set->items[i] == item) {
                return 1; // 如果找到元素，返回1
            }
        }
        return 0; // 未找到元素，返回0
    }
    
    // 从集合中删除元素
    void set_erase(Set *set, int item) {
        for (int i = 0; i < set->size; i++) {
            if (set->items[i] == item) {
                set->items[i] = set->items[--set->size]; // 删除元素，通过将最后一个元素移动到删除位置
                return;
            }
        }
    }
    
    // 检测图中是否存在环
    int detectCycle(Graph *graph, int node, Set *visited, Set *recStack) {
        if (set_contains(recStack, node)) {
            return 1; // 如果节点在递归栈中，表示找到环
        }
        if (set_contains(visited, node)) {
            return 0; // 如果节点已访问，跳过
        }
    
        set_insert(visited, node); // 标记节点为已访问
        set_insert(recStack, node); // 将节点加入递归栈
    
        for (int i = 0; i < graph[node].neighbor_count; i++) {
            if (detectCycle(graph, graph[node].neighbors[i], visited, recStack)) {
                return 1; // 递归检测邻接节点，如果找到环，返回1
            }
        }
    
        set_erase(recStack, node); // 从递归栈中移除节点
        return 0; // 未找到环，返回0
    }
    
    // 检测图中是否有环的主函数
    int hasCycle(Graph *graph, Set *nodes) {
        Set visited = {0}, recStack = {0};
    
        for (int i = 0; i < nodes->size; i++) {
            if (detectCycle(graph, nodes->items[i], &visited, &recStack)) {
                return 1; // 如果检测到环，返回1
            }
        }
    
        return 0; // 未检测到环，返回0
    }
    
    // 寻找起点和终点节点
    int findStartAndEndNodes(Graph *graph, Set *nodes, int *edges, int edge_count, int *startNode, Set *endNodes) {
        int inDegree[MAX_EDGES] = {0}, outDegree[MAX_EDGES] = {0}; // 入度和出度数组
    
        // 构建图的邻接表，计算每个节点的入度和出度
        for (int i = 0; i < edge_count; i += 2) {
            int start = edges[i];
            int end = edges[i + 1];
            set_insert(nodes, start);
            set_insert(nodes, end);
            inDegree[end]++;
            outDegree[start]++;
            graph[start].neighbors[graph[start].neighbor_count++] = end;
        }
    
        // 如果图中有环，返回-1
        if (hasCycle(graph, nodes)) {
            return -1;
        }
    
        // 寻找起点和终点
        *startNode = -1;
        for (int i = 0; i < nodes->size; i++) {
            int node = nodes->items[i];
            if (inDegree[node] == 0) {
                *startNode = node; // 找到入度为0的节点作为起点
            }
            if (outDegree[node] == 0) {
                set_insert(endNodes, node); // 找到出度为0的节点作为终点
            }
        }
    
        return 0;
    }
    
    // 主函数
    int main() {
        char line[1024];
        fgets(line, sizeof(line), stdin); // 读取N，但在这个程序中不使用
        fgets(line, sizeof(line), stdin); // 读取边的数据
    
        int edges[MAX_EDGES], edge_count = 0;
        char *token = strtok(line, " ");
        while (token != NULL) {
            edges[edge_count++] = atoi(token); // 解析边数据
            token = strtok(NULL, " ");
        }
    
        Graph graph[MAX_EDGES] = {0};
        Set nodes = {0}, endNodes = {0};
        int startNode = -1;
    
        // 寻找起点和终点
        if (findStartAndEndNodes(graph, &nodes, edges, edge_count, &startNode, &endNodes) == -1) {
            printf("-1\n"); // 如果有环，输出-1
        } else {
            printf("%d ", startNode); // 输出起点
            for (int i = 0; i < endNodes.size; i++) {
                printf("%d ", endNodes.items[i]); // 输出终点
            }
            printf("\n");
        }
    
        return 0;
    }
    

## 完整用例

### 用例1

    
    
    3
    0 1 1 2 2 3
    

### 用例2

    
    
    3
    0 1 1 2 2 0
    

### 用例3

    
    
    4
    0 1 0 2 0 3 1 4
    

### 用例4

    
    
    3
    1 2 2 4 4 3
    

### 用例5

    
    
    6
    0 1 0 2 1 3 2 3 3 4 4 2
    

### 用例6

    
    
    4
    0 1 1 0 1 2 2 3
    

### 用例7

    
    
    3
    0 1 0 2 1 3
    

### 用例8

    
    
    7
    1 2 2 3 2 4 2 5 3 6 4 6 4 7
    

### 用例9

    
    
    4
    1 2 2 4 4 3 2 3
    

### 用例10

    
    
    4
    0 1 1 0 2 3 3 2
    

#### 文章目录

  * 题目描述
  * 输入描述
  * 输出描述
  *     *       *         * 备注
  * 用例1
  * 用例2
  * 解题思路
  *     *       * 环的检测
      * 确定起点和终点
  * C++
  * Java
  * javaScript
  * Python
  * C语言
  * 完整用例
  *     * 用例1
    * 用例2
    * 用例3
    * 用例4
    * 用例5
    * 用例6
    * 用例7
    * 用例8
    * 用例9
    * 用例10

![fengmian](https://i-blog.csdnimg.cn/blog_migrate/356cfd6fba0b1cdb14e4a3e5328dccad.png)

