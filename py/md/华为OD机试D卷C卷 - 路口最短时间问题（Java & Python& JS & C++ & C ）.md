## 题目描述

假定街道是棋盘型的，每格距离相等，车辆通过每格街道需要时间均为 timePerRoad；

街道的街口（交叉点）有交通灯，灯的周期 T（=lights[row][col]）各不相同；

车辆可直行、左转和右转，其中直行和左转需要等相应 T 时间的交通灯才可通行，右转无需等待。

现给出 n * m 个街口的交通灯周期，以及起止街口的坐标，计算车辆经过两个街口的最短时间。

其中：

  1. 起点和终点的交通灯不计入时间，且可以在任意方向经过街口
  2. 不可超出 n * m 个街口，不可跳跃，但边线也是道路（即：lights[0][0] -> lights[0][1] 是有效路径）

入口函数定义：

    
    
    /**
     * @param lights：n*m个街口每个交通灯的周期，值范围[0, 120]，n和m的范围为[1,9]
     * @param timePreRoad：相邻两个街口之间街道的通行时间，范围为[0,600]
     * @param rowStart：起点的行号
     * @param colStart：起点的列号
     * @param rowEnd：终点的行号
     * @param colEnd：终点的列号
     * @return lights[rowStart][colStart] 与 lights[rowEnd][colEnd] 两个街口之间的最短通行时间
     */
    int calcTime(int[][] lights, int timePreRoad, int rowStart, int colStart, int rowEnd, int colEnd)
    

## 输入描述

第一行输入 n 和 m，以空格分隔

之后 n 行输入 lights矩阵，矩阵每行m个整数，以空格分隔

之后一行输入 timePerRoad

之后一行输入 rowStart colStart，以空格分隔

最后一行输入 rowEnd colEnd，以空格分隔

## 输出描述

lights[rowStart][colStart] 与 lights[rowEnd][colEnd] 两个街口之间的最短通行时间

## 用例

输入

    
    
    3 3
    1 2 3
    4 5 6
    7 8 9
    60
    0 0
    2 2
    

输出

    
    
    245
    

说明

> 行走路线为 (0,0) -> (0,1) -> (1,1) -> (1,2) -> (2,2) 走了4格路，2个右转，1个左转，共耗时
> 60+0+60+5+60+0+60=245

## 解题思路

此题目的核心解法涉及到使用图的搜索算法，具体是利用Dijkstra算法来找出从起点到终点的最短路径时间。Dijkstra算法用于在加权图中找到某一节点到其他节点的最短路径。此题中加权图的节点是街口，权重是通过街道的时间加上等待红绿灯的时间。

解题思路和算法详解如下：

  1. **优先队列** ：使用一个优先队列 `pq`（最小堆）来保持待访问节点的顺序，优先访问总成本（通行时间加等待时间）最小的节点。

  2. **遍历** ：从起始点开始，按照Dijkstra算法的策略，每次从优先队列中取出一个节点，然后探索该节点能够直接到达的邻接节点（考虑上、下、左、右四个方向），更新这些邻接节点到起始点的最短时间，并将更新后的邻接节点加入优先队列。

  3. **成本计算** ：在遍历过程中，对每个节点考虑直行或左转的情况（因为这两种情况需要等待红绿灯），如果是右转，则不需要等待红绿灯。每通过一个街口（非起点和终点），都需要加上通行时间 `timePerRoad` 和可能的等待时间。

  4. **寻找最短路径** ：在所有可能的路径中，选择耗时最短的路径作为结果。因为每个街口都可以从四个方向到达，所以需要从到达终点的四个方向的最短时间中选择最小的一个。

## C++

    
    
    #include <iostream>
    #include <vector>
    #include <queue>
    #include <climits>
    #include <algorithm>
    
    using namespace std;
    
    // 定义四个方向的偏移量：上、右、下、左
    const int offsets[4][2] = {{-1, 0}, {0, 1}, {1, 0}, {0, -1}};
    
    int calcTime(vector<vector<int>>& lights, int timePerRoad, int rowStart, int colStart, int rowEnd, int colEnd) {
        int n = lights.size(), m = lights[0].size();
        
        // 初始化距离数组
        vector<vector<vector<int>>> dist(n, vector<vector<int>>(m, vector<int>(4, INT_MAX)));
        for (int k = 0; k < 4; ++k) {
            dist[rowStart][colStart][k] = 0;
        }
    
        // 使用优先队列
        priority_queue<tuple<int, int, int, int, int, int>, vector<tuple<int, int, int, int, int, int>>, greater<>> pq;
        for (int k = 0; k < 4; ++k) {
            pq.push({0, rowStart, colStart, -1, -1, k});
        }
        
        while (!pq.empty()) {
            auto [v, x, y, px, py, direction] = pq.top();
            pq.pop();
            
            for (int k = 0; k < 4; ++k) {
                int new_x = x + offsets[k][0];
                int new_y = y + offsets[k][1];
                
                if (new_x < 0 || new_x >= n || new_y < 0 || new_y >= m || (new_x == px && new_y == py)) continue;
                
                int new_cost = v + timePerRoad;
                if ((direction + 1) % 4 != k)  // 如果不是右转
                    new_cost += lights[x][y];
                    
                if (new_cost < dist[new_x][new_y][k]) {
                    dist[new_x][new_y][k] = new_cost;
                    pq.push({new_cost, new_x, new_y, x, y, k});
                }
            }
        }
    
        return *min_element(dist[rowEnd][colEnd].begin(), dist[rowEnd][colEnd].end());
    }
    
    int main() {
        int n, m;
        cin >> n >> m;
        vector<vector<int>> lights(n, vector<int>(m));
        for (int i = 0; i < n; ++i) {
            for (int j = 0; j < m; ++j) {
                cin >> lights[i][j];
            }
        }
        
        int timePerRoad;
        cin >> timePerRoad;
        
        int rowStart, colStart, rowEnd, colEnd;
        cin >> rowStart >> colStart >> rowEnd >> colEnd;
    
        cout << calcTime(lights, timePerRoad, rowStart, colStart, rowEnd, colEnd) << endl;
    
        return 0;
    }
    

## Java

    
    
    import java.util.PriorityQueue;
    import java.util.Scanner;
    
    class Solution {
        // 定义四个方向的偏移量：上、右、下、左
        static int[][] offsets = {{-1, 0}, {0, 1}, {1, 0}, {0, -1}};
    
        // 计算从起点到终点的最短时间
        static int calcTime(int[][] lights, int timePerRoad, int rowStart, int colStart, int rowEnd, int colEnd) {
            int n = lights.length; // 行数
            int m = lights[0].length; // 列数
    
            // dist数组存储到每个点的最短时间，考虑四个方向
            int[][][] dist = new int[n][m][4];
            for (int i = 0; i < n; i++) {
                for (int j = 0; j < m; j++) {
                    for (int k = 0; k < 4; k++) {
                        dist[i][j][k] = Integer.MAX_VALUE;
                    }
                }
            }
    
            // 优先队列，用于存储和选择下一个访问的节点
            PriorityQueue<Node> pq = new PriorityQueue<>();
            for (int k = 0; k < 4; k++) {
                dist[rowStart][colStart][k] = 0;
                pq.add(new Node(rowStart, colStart, -1, -1, 0, k));
            }
    
            // 主循环，直到优先队列为空
            while (!pq.isEmpty()) {
                Node current = pq.poll();
    
                for (int k = 0; k < 4; k++) {
                    int newX = current.x + offsets[k][0];
                    int newY = current.y + offsets[k][1];
    
                    // 检查新坐标是否有效
                    if (newX < 0 || newX >= n || newY < 0 || newY >= m) continue;
                    // 避免回到上一个节点
                    if (newX == current.px && newY == current.py) continue;
    
                    // 计算新的成本
                    int newCost = current.v + timePerRoad;
                    // 如果不是右转，则可能需要等红绿灯
                    if (!((current.direction + 1) % 4 == k)) { // 不是右转
                        newCost += lights[current.x][current.y];
                    }
    
                    // 更新最短路径和添加新节点到队列
                    if (newCost < dist[newX][newY][k]) {
                        dist[newX][newY][k] = newCost;
                        pq.add(new Node(newX, newY, current.x, current.y, newCost, k));
                    }
                }
            }
    
            // 从四个方向中找到最短的时间
            int ans = Integer.MAX_VALUE;
            for (int k = 0; k < 4; k++) {
                ans = Math.min(ans, dist[rowEnd][colEnd][k]);
            }
    
            return ans;
        }
    
        // 节点类，用于优先队列
        static class Node implements Comparable<Node> {
            int x, y, px, py, v, direction;
    
            public Node(int x, int y, int px, int py, int v, int direction) {
                this.x = x;
                this.y = y;
                this.px = px;
                this.py = py;
                this.v = v;
                this.direction = direction;
            }
    
            @Override
            public int compareTo(Node b) {
                return Integer.compare(this.v, b.v);
            }
        }
    
        public static void main(String[] args) {
           Scanner scanner = new Scanner(System.in);
            
            // 读取输入
            String[] firstLine = scanner.nextLine().split(" ");
            int n = Integer.parseInt(firstLine[0]);
            int m = Integer.parseInt(firstLine[1]);
            int[][] lights = new int[n][m];
            for (int i = 0; i < n; i++) {
                String[] line = scanner.nextLine().split(" ");
                for (int j = 0; j < m; j++) {
                    lights[i][j] = Integer.parseInt(line[j]);
                }
            }
            int timePerRoad = Integer.parseInt(scanner.nextLine());
            String[] start = scanner.nextLine().split(" ");
            int rowStart = Integer.parseInt(start[0]);
            int colStart = Integer.parseInt(start[1]);
            String[] end = scanner.nextLine().split(" ");
            int rowEnd = Integer.parseInt(end[0]);
            int colEnd = Integer.parseInt(end[1]);
    
            // 输出从起点到终点的最短时间
            System.out.println(Solution.calcTime(lights, timePerRoad, rowStart, colStart, rowEnd, colEnd));
        }
    }
    
    

## javaScript

    
    
    // 引入Node.js的内置模块readline用于读取输入
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    // 定义节点类，包含坐标、前驱坐标、当前路径成本和前进方向
    class Node {
        constructor(x, y, px, py, cost, direction) {
            this.x = x; // 当前节点坐标
            this.y = y; // 当前节点坐标
            this.px = px; // 前驱节点坐标
            this.py = py; // 前驱节点坐标
            this.cost = cost; // 到达当前节点的成本
            this.direction = direction; // 前进方向
        }
    }
    
    // 节点比较函数，用于优先队列的排序
    function compare(nodeA, nodeB) {
        return nodeA.cost - nodeB.cost;
    }
    
    // 计算从起点到终点的最短时间
    function calcTime(lights, n, m, timePerRoad, rowStart, colStart, rowEnd, colEnd) {
        let dist = Array.from({ length: n }, () => Array.from({ length: m }, () => Array(4).fill(Infinity)));
    
        // 初始化优先队列
        let pq = [];
    
        // 设置起点四个方向的成本为0
        for (let k = 0; k < 4; k++) {
            dist[rowStart][colStart][k] = 0;
            pq.push(new Node(rowStart, colStart, -1, -1, 0, k));
        }
    
        // 定义四个方向的偏移量：上、右、下、左
        let offsets = [[-1, 0], [0, 1], [1, 0], [0, -1]];
    
        // 主循环
        while (pq.length > 0) {
            // 弹出成本最小的节点
            pq.sort(compare);
            let current = pq.pop();
    
            // 尝试四个方向移动
            for (let k = 0; k < 4; k++) {
                let newX = current.x + offsets[k][0];
                let newY = current.y + offsets[k][1];
    
                // 检查边界条件
                if (newX < 0 || newX >= n || newY < 0 || newY >= m) continue;
                // 避免回到上一个节点
                if (newX === current.px && newY === current.py) continue;
    
                // 计算新的成本
                let newCost = current.cost + timePerRoad;
                // 不是右转时，需要加上红绿灯等待时间
                if (!((current.direction + 1) % 4 === k)) {
                    newCost += lights[current.x][current.y];
                }
    
                // 更新最短路径并添加到队列
                if (newCost < dist[newX][newY][k]) {
                    dist[newX][newY][k] = newCost;
                    pq.push(new Node(newX, newY, current.x, current.y, newCost, k));
                }
            }
        }
    
        // 从四个方向找到最短时间
        let ans = Infinity;
        for (let k = 0; k < 4; k++) {
            if (dist[rowEnd][colEnd][k] < ans) {
                ans = dist[rowEnd][colEnd][k];
            }
        }
    
        return ans;
    }
    
    let lines = [];
    rl.on('line', (line) => {
        lines.push(line);
    }).on('close', () => {
        // 第一行包含 n 和 m
        let [n, m] = lines[0].split(' ').map(Number);
        let lights = [];
    
        // 接下来的 n 行包含灯的信息
        for (let i = 1; i <= n; i++) {
            lights.push(lines[i].split(' ').map(Number));
        }
    
        timePerRoad = parseInt(lines[n + 1]);
     
     
        let [rowStart, colStart] = lines[n + 2].split(' ').map(Number);
         
        let [rowEnd, colEnd] = lines[n + 3].split(' ').map(Number);
        
    
        console.log(calcTime(lights, n, m, timePerRoad, rowStart, colStart, rowEnd, colEnd));
    });
    

## Python

    
    
    import heapq
    
    # 定义四个方向的偏移量：上、右、下、左
    offsets = [(-1, 0), (0, 1), (1, 0), (0, -1)]
    
    def calc_time(lights, time_per_road, row_start, col_start, row_end, col_end):
        n, m = len(lights), len(lights[0])
        
        # 初始化距离数组
        dist = [[[float('inf') for _ in range(4)] for _ in range(m)] for _ in range(n)]
        for k in range(4):
            dist[row_start][col_start][k] = 0
    
        # 使用heapq实现的优先队列
        pq = []
        for k in range(4):
            heapq.heappush(pq, (0, row_start, col_start, -1, -1, k))
        
        while pq:
            v, x, y, px, py, direction = heapq.heappop(pq)
            
            for k, (dx, dy) in enumerate(offsets):
                new_x, new_y = x + dx, y + dy
                
                if not (0 <= new_x < n and 0 <= new_y < m) or (new_x == px and new_y == py):
                    continue
                
                new_cost = v + time_per_road
                if (direction + 1) % 4 != k:  # 如果不是右转
                    new_cost += lights[x][y]
                    
                if new_cost < dist[new_x][new_y][k]:
                    dist[new_x][new_y][k] = new_cost
                    heapq.heappush(pq, (new_cost, new_x, new_y, x, y, k))
        
        return min(dist[row_end][col_end])
    
    # 读取输入
    n, m = map(int, input().split())
    lights = [list(map(int, input().split())) for _ in range(n)]
    time_per_road = int(input())
    row_start, col_start = map(int, input().split())
    row_end, col_end = map(int, input().split())
    
    # 计算并输出结果
    print(calc_time(lights, time_per_road, row_start, col_start, row_end, col_end))
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    #include <limits.h>
    
    // 定义节点结构，包含坐标、前驱坐标、当前路径成本和前进方向
    typedef struct {
        int x, y; // 当前节点坐标
        int px, py; // 前驱节点坐标
        int cost; // 到达当前节点的成本
        int direction; // 前进方向
    } Node;
    
    // 节点比较函数，用于优先队列的排序
    int compare(const void *a, const void *b) {
        Node *nodeA = (Node *)a;
        Node *nodeB = (Node *)b;
        return nodeA->cost - nodeB->cost;
    }
    
    // 计算从起点到终点的最短时间
    int calcTime(int lights[9][9], int n, int m, int timePerRoad, int rowStart, int colStart, int rowEnd, int colEnd) {
        int dist[n][m][4]; // 存储到每个点的最短时间，考虑四个方向
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                for (int k = 0; k < 4; k++) {
                    dist[i][j][k] = INT_MAX;
                }
            }
        }
    
        // 初始化优先队列
        Node pq[1000];
        int pqSize = 0;
    
        // 设置起点四个方向的成本为0
        for (int k = 0; k < 4; k++) {
            dist[rowStart][colStart][k] = 0;
            pq[pqSize++] = (Node){rowStart, colStart, -1, -1, 0, k};
        }
    
        // 定义四个方向的偏移量：上、右、下、左
        int offsets[4][2] = {{-1, 0}, {0, 1}, {1, 0}, {0, -1}};
    
        // 主循环
        while (pqSize > 0) {
            // 弹出成本最小的节点
            qsort(pq, pqSize, sizeof(Node), compare);
            Node current = pq[--pqSize];
    
            // 尝试四个方向移动
            for (int k = 0; k < 4; k++) {
                int newX = current.x + offsets[k][0];
                int newY = current.y + offsets[k][1];
    
                // 检查边界条件
                if (newX < 0 || newX >= n || newY < 0 || newY >= m) continue;
                // 避免回到上一个节点
                if (newX == current.px && newY == current.py) continue;
    
                // 计算新的成本
                int newCost = current.cost + timePerRoad;
                // 不是右转时，需要加上红绿灯等待时间
                if (!((current.direction + 1) % 4 == k)) {
                    newCost += lights[current.x][current.y];
                }
    
                // 更新最短路径并添加到队列
                if (newCost < dist[newX][newY][k]) {
                    dist[newX][newY][k] = newCost;
                    pq[pqSize++] = (Node){newX, newY, current.x, current.y, newCost, k};
                }
            }
        }
    
        // 从四个方向找到最短时间
        int ans = INT_MAX;
        for (int k = 0; k < 4; k++) {
            if (dist[rowEnd][colEnd][k] < ans) {
                ans = dist[rowEnd][colEnd][k];
            }
        }
    
        return ans;
    }
    
    int main() {
        int n, m;
        scanf("%d %d", &n, &m);
    
        int lights[9][9];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                scanf("%d", &lights[i][j]);
            }
        }
    
        int timePerRoad, rowStart, colStart, rowEnd, colEnd;
        scanf("%d %d %d %d %d", &timePerRoad, &rowStart, &colStart, &rowEnd, &colEnd);
    
        printf("%d\n",calcTime(lights, n, m, timePerRoad, rowStart, colStart, rowEnd, colEnd));
    
        return 0;
    }
     
    

## 完整用例

### 用例1

    
    
    2 2
    0 0
    0 0
    1
    0 0
    1 1
    

### 用例2

    
    
    3 3
    1 1 1
    1 1 1
    1 1 1
    10
    0 0
    2 2
    

### 用例3

    
    
    4 4
    10 10 10 10
    10 10 10 10
    10 10 10 10
    10 10 10 10
    20
    0 0
    3 3
    

### 用例4

    
    
    4 4
    5 10 15 20
    25 30 35 40
    45 50 55 60
    65 70 75 80
    25
    0 0
    3 3
    

### 用例5

    
    
    3 3
    0 0 0
    0 120 0
    0 0 0
    30
    1 1
    2 2
    

### 用例6

    
    
    6 6
    1 2 3 4 5 6
    7 8 9 10 11 12
    13 14 15 16 17 18
    19 20 21 22 23 24
    25 26 27 28 29 30
    31 32 33 34 35 36
    60
    0 0
    5 5
    

### 用例7

    
    
    3 4
    1 2 3 4
    5 6 7 8
    9 10 11 12
    15
    1 1
    2 2
    

### 用例8

    
    
    9 1
    1
    2
    3
    4
    5
    6
    7
    8
    9
    30
    0 0
    8 0
    

### 用例9

    
    
    4 4
    120 0 0 120
    0 0 0 0
    0 0 0 0
    120 0 0 120
    30
    0 0
    3 3
    

### 用例10

    
    
    3 3
    1 2 3
    4 5 6
    7 8 9
    60
    0 0
    2 2
    

#### 文章目录

  * 题目描述
  * 输入描述
  * 输出描述
  * 用例
  * 解题思路
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

![fengmian](https://i-blog.csdnimg.cn/blog_migrate/fec6aaf7611e12f1ec4b4ece5ab531e1.png)

