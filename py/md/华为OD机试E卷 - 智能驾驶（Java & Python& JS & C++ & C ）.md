## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

有一辆汽车需要从 m * n 的地图左上角（起点）开往地图的右下角（终点），去往每一个地区都需要消耗一定的油量，加油站可进行加油。

请你计算汽车确保从从起点到达终点时所需的最少初始油量。

说明：

  1. 智能汽车可以上下左右四个方向移动
  2. 地图上的数字取值是 0 或 -1 或 正整数： 
     * -1 ：表示加油站，可以加满油，汽车的油箱容量最大为100；
     * 0 ：表示这个地区是障碍物，汽车不能通过
     * 正整数：表示汽车走过这个地区的耗油量
  3. 如果汽车无论如何都无法到达终点，则返回 -1

## 输入描述

第一行为两个数字，M，N，表示地图的大小为 M * N

  * 0 < M,N ≤ 200

后面一个 M * N 的矩阵，其中的值是 0 或 -1 或正整数，加油站的总数不超过 200 个

## 输出描述

如果汽车无论如何都无法到达终点，则返回 -1

如果汽车可以到达终点，则返回最少的初始油量

## 示例1

输入

    
    
    2,2
    10,20
    30,40
    

输出

    
    
    70
    

说明

> 行走的路线为：右→下

## 示例2

输入

    
    
    4,4
    10,30,30,20
    30,30,-1,10
    0,20,20,40
    10,-1,30,40
    

输出

    
    
    70
    

说明

> 行走的路线为：右→右→下→下→下→右

## 示例3

输入

    
    
    4,5
    10,0,30,-1,10
    30,0,20,0,20
    10,0,10,0,30
    10,-1,30,0,10
    

输出

    
    
    60
    

说明

> 行走的路线为：下→下→下→右→右→上→上→上→右→右→下→下→下

## 示例4

输入

    
    
    4,4
    10,30,30,20
    30,30,20,10
    10,20,10,40
    10,20,30,40
    

输出

    
    
    -1
    

说明

> 无论如何都无法到达终点

## 解题思路

## Java

    
    
    import java.util.*;
    
    public class Main {
        // 定义常量，表示汽车油箱的最大容量
        private static final int MAX_FUEL = 100; 
    
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in).useDelimiter(",|\\s+");
            // 读取地图的行数和列数
            int numRows = scanner.nextInt();
            int numCols = scanner.nextInt();
            // 创建地图数组
            int[][] map = new int[numRows][numCols];
    
            // 填充地图数组，读取每个单元的值
            for (int i = 0; i < numRows; i++) {
                for (int j = 0; j < numCols; j++) {
                    map[i][j] = scanner.nextInt();
                }
            }
    
            // 计算并获取最小初始油量
            int minFuel = findMinimumInitialFuel(map, numRows, numCols);
            // 输出计算结果
            System.out.println(minFuel);
        }
    
        // 使用二分查找方法确定从起点到终点所需的最小初始油量
        private static int findMinimumInitialFuel(int[][] map, int numRows, int numCols) {
            int low = 0, high = MAX_FUEL, optimalFuel = -1; // 初始化二分查找的上下界及结果
    
            while (low <= high) {
                int mid = (low + high) / 2;
                // 判断当前中值油量是否足以到达终点
                if (canReachDestination(map, mid, numRows, numCols)) {
                    optimalFuel = mid; // 更新找到的可行油量
                    high = mid - 1; // 尝试寻找更小的可行油量
                } else {
                    low = mid + 1; // 增加油量尝试
                }
            }
            return optimalFuel; // 返回最小初始油量，如果无法到达则返回-1
        }
    
        // 检查给定起始油量是否足以从起点到达终点
        private static boolean canReachDestination(int[][] map, int startFuel, int numRows, int numCols) {
            if (map[0][0] == 0) return false; // 起点如果是障碍物，则无法出发
    
            // 初始化每个位置的剩余油量数组
            int[][] remainingFuel = new int[numRows][numCols];
            for (int[] row : remainingFuel) {
                Arrays.fill(row, -1);
            }
            // 设置起点的初始油量
            remainingFuel[0][0] = map[0][0] == -1 ? MAX_FUEL : startFuel - map[0][0];
            if (remainingFuel[0][0] < 0) return false; // 如果起始油量不足以离开起点，返回false
    
            // 使用优先队列按照油量从大到小进行搜索
            PriorityQueue<int[]> priorityQueue = new PriorityQueue<>((a, b) -> b[2] - a[2]);
            priorityQueue.offer(new int[]{0, 0, remainingFuel[0][0]});
            int[] dx = {0, 1, 0, -1}; // 搜索方向数组x
            int[] dy = {1, 0, -1, 0}; // 搜索方向数组y
    
            // BFS搜索
            while (!priorityQueue.isEmpty()) {
                int[] current = priorityQueue.poll();
                int currentRow = current[0], currentCol = current[1], fuel = current[2];
    
                if (currentRow == numRows - 1 && currentCol == numCols - 1) return true; // 如果到达终点，则返回true
    
                // 检查四个方向
                for (int direction = 0; direction < 4; direction++) {
                    int newRow = currentRow + dx[direction], newCol = currentCol + dy[direction];
                    if (isValid(newRow, newCol, numRows, numCols, map)) { // 检查新位置是否有效
                        int newFuel = map[newRow][newCol] == -1 ? MAX_FUEL : fuel - map[newRow][newCol];
                        if (newFuel > remainingFuel[newRow][newCol]) {
                            remainingFuel[newRow][newCol] = newFuel;
                            priorityQueue.offer(new int[]{newRow, newCol, newFuel});
                        }
                    }
                }
            }
            return false; // 如果无法到达终点，则返回false
        }
    
        // 判断指定位置是否有效（不越界，非障碍物）
        private static boolean isValid(int row, int col, int numRows, int numCols, int[][] map) {
            return row >= 0 && row < numRows && col >= 0 && col < numCols && map[row][col] != 0;
        }
    }
    
    

## Python

    
    
    import heapq
    
    # 定义常量，表示汽车油箱的最大容量
    MAX_FUEL = 100
    
    def main():
        # 从标准输入读取行数和列数，并以逗号分隔
        numRows, numCols = map(int, input().split(","))
        # 读取地图数据，每一行通过逗号分隔，对于每行输入，读取numRows行
        map_data = [list(map(int, input().split(","))) for _ in range(numRows)]
    
        # 计算并获取最小初始油量
        min_fuel = find_minimum_initial_fuel(map_data, numRows, numCols)
        # 输出计算得到的最小初始油量
        print(min_fuel)
    
    def find_minimum_initial_fuel(map_data, numRows, numCols):
        # 初始化二分查找的边界
        low, high = 0, MAX_FUEL
        optimal_fuel = -1  # 最优的油量值，默认为-1表示未找到
    
        # 二分查找确定合适的起始油量
        while low <= high:
            mid = (low + high) // 2
            # 检查中值油量是否可以从起点到达终点
            if can_reach_destination(map_data, mid, numRows, numCols):
                optimal_fuel = mid  # 更新找到的最小可行油量
                high = mid - 1  # 尝试更小的油量
            else:
                low = mid + 1  # 增加油量尝试
        
        return optimal_fuel
    
    def can_reach_destination(map_data, start_fuel, numRows, numCols):
        # 如果起点是障碍物，则无法出发
        if map_data[0][0] == 0:
            return False
    
        # 初始化存储每个单元格剩余油量的二维列表
        remaining_fuel = [[-1 for _ in range(numCols)] for _ in range(numRows)]
        # 设置起点的初始油量，考虑起点可能为负值消耗的情况
        remaining_fuel[0][0] = MAX_FUEL if map_data[0][0] == -1 else start_fuel - map_data[0][0]
        if remaining_fuel[0][0] < 0:
            return False  # 起始油量不足以离开起点
    
        # 使用优先队列，以最大剩余油量优先处理
        priority_queue = []
        heapq.heappush(priority_queue, (-remaining_fuel[0][0], 0, 0))
        directions = [(0, 1), (1, 0), (0, -1), (-1, 0)]  # 定义上下左右四个方向
    
        # 使用优先队列执行BFS
        while priority_queue:
            current_fuel, current_row, current_col = heapq.heappop(priority_queue)
            current_fuel = -current_fuel  # 因为用了负值来实现最大堆
            
            # 到达终点检查
            if current_row == numRows - 1 and current_col == numCols - 1:
                return True
            
            # 检查四个可能的移动方向
            for dx, dy in directions:
                new_row, new_col = current_row + dx, current_col + dy
                if is_valid(new_row, new_col, numRows, numCols, map_data):
                    new_fuel = MAX_FUEL if map_data[new_row][new_col] == -1 else current_fuel - map_data[new_row][new_col]
                    if new_fuel > remaining_fuel[new_row][new_col]:
                        remaining_fuel[new_row][new_col] = new_fuel
                        heapq.heappush(priority_queue, (-new_fuel, new_row, new_col))
                        
        return False  # 如果没有找到到达终点的路径则返回False
    
    def is_valid(row, col, numRows, numCols, map_data):
        # 检查位置是否有效（不越界且不是障碍物）
        return 0 <= row < numRows and 0 <= col < numCols and map_data[row][col] != 0
    
    if __name__ == "__main__":
        main()
    
    

## JavaScript

    
    
    const readline = require('readline');
     
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false 
    });
    const MAX_FUEL = 100; // 设置最大油量常量
    const lines = []; // 创建一个数组来存储从控制台读取的每行数据
    // 当读取到一行数据时触发，将数据存入 lines 数组
    rl.on('line', function(line) {
      lines.push(line);
    });
    
    // 当所有输入都读取完毕时触发
    rl.on('close', function() {
      // 解析第一行数据为地图的行数和列数
      const [numRows, numCols] = lines[0].split(",").map(Number);
      const map = []; // 初始化地图数组
      // 根据行数解析后续输入数据填充地图
      for (let i = 1; i <= numRows; i++) {
        map.push(lines[i].split(",").map(Number));
      }
      // 计算最小初始油量
      const minFuel = findMinimumInitialFuel(map, numRows, numCols);
      // 输出结果
      console.log(minFuel);
    });
    
    // 判断是否可以到达目的地的函数
    function canReachDestination(map, startFuel, numRows, numCols) {
      if (map[0][0] === 0) return false; // 如果起点是不可通行的，则直接返回 false
    
      // 初始化剩余油量的二维数组
      const remainingFuel = Array.from({ length: numRows }, () => Array(numCols).fill(-1));
      // 设置起点的初始油量
      remainingFuel[0][0] = map[0][0] === -1 ? MAX_FUEL : startFuel - map[0][0];
      if (remainingFuel[0][0] < 0) return false; // 如果起点油量不足，返回 false
    
      // 初始化队列并将起点加入队列
      const queue = [[0, 0, remainingFuel[0][0]]];
      // 定义移动方向的数组
      const dx = [0, 1, 0, -1];
      const dy = [1, 0, -1, 0];
    
      // 广度优先搜索遍历地图
      while (queue.length > 0) {
        const [currentRow, currentCol, fuel] = queue.shift();
    
        // 判断是否到达终点
        if (currentRow === numRows - 1 && currentCol === numCols - 1) return true;
    
        // 遍历四个可能的移动方向
        for (let direction = 0; direction < 4; direction++) {
          const newRow = currentRow + dx[direction];
          const newCol = currentCol + dy[direction];
          // 检查新位置是否有效
          if (isValid(newRow, newCol, numRows, numCols, map)) {
            // 计算新位置的剩余油量
            const newFuel = map[newRow][newCol] === -1 ? MAX_FUEL : fuel - map[newRow][newCol];
            // 如果新位置的剩余油量大于之前记录的值，更新并将其加入队列
            if (newFuel > remainingFuel[newRow][newCol]) {
              remainingFuel[newRow][newCol] = newFuel;
              queue.push([newRow, newCol, newFuel]);
            }
          }
        }
      }
    
      return false; // 如果没有到达终点，则返回 false
    }
    
    // 检查指定位置是否有效
    function isValid(row, col, numRows, numCols, map) {
      return row >= 0 && row < numRows && col >= 0 && col < numCols && map[row][col] !== 0;
    }
    
    // 使用二分搜索确定最小的初始油量的函数
    function findMinimumInitialFuel(map, numRows, numCols) {
      let low = 0, high = MAX_FUEL, optimalFuel = -1;
      while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        // 判断中间值油量是否足够
        if (canReachDestination(map, mid, numRows, numCols)) {
          optimalFuel = mid;
          high = mid - 1;
        } else {
          low = mid + 1;
        }
      }
      return optimalFuel; // 返回找到的最小初始油量
    }
    
    
    
    

## C++

    
    
    #include <iostream>
    #include <vector>
    #include <queue>
    #include <tuple>
    #include <algorithm>
    
    using namespace std;
    
    // 定义常量，表示汽车油箱的最大容量
    const int MAX_FUEL = 100;
    
    // 函数声明
    bool canReachDestination(const vector<vector<int>>& mapData, int startFuel, int numRows, int numCols);
    bool isValid(int row, int col, int numRows, int numCols, const vector<vector<int>>& mapData);
    
    // 寻找从起点到终点所需要的最小初始油量的函数
    int findMinimumInitialFuel(const vector<vector<int>>& mapData, int numRows, int numCols) {
        int low = 0, high = MAX_FUEL, optimalFuel = -1;  // 初始化二分查找的上下界和最优解变量
    
        while (low <= high) {  // 进行二分查找
            int mid = (low + high) / 2;
            if (canReachDestination(mapData, mid, numRows, numCols)) {
                optimalFuel = mid;  // 如果可以到达终点，更新最优解
                high = mid - 1;     // 尝试寻找更小的初始油量
            } else {
                low = mid + 1;      // 如果不可以到达终点，增加初始油量的下限
            }
        }
    
        return optimalFuel;  // 返回找到的最小初始油量
    }
    
    // 判断给定起始油量能否从起点到达终点的函数
    bool canReachDestination(const vector<vector<int>>& mapData, int startFuel, int numRows, int numCols) {
        if (mapData[0][0] == 0) return false;  // 如果起点是障碍物，直接返回false
    
        vector<vector<int>> remainingFuel(numRows, vector<int>(numCols, -1));  // 初始化每个点的剩余油量数组
        remainingFuel[0][0] = (mapData[0][0] == -1) ? MAX_FUEL : startFuel - mapData[0][0];  // 设置起点的初始油量
        if (remainingFuel[0][0] < 0) return false;  // 如果起点的初始油量就不足，返回false
    
        priority_queue<tuple<int, int, int>> priorityQueue;  // 使用优先队列存储待处理的点
        priorityQueue.push({remainingFuel[0][0], 0, 0});
        vector<pair<int, int>> directions = {{0, 1}, {1, 0}, {0, -1}, {-1, 0}};  // 可以移动的四个方向
    
        while (!priorityQueue.empty()) {
            auto [currentFuel, currentRow, currentCol] = priorityQueue.top();  // 取出当前油量最大的点
            priorityQueue.pop();
    
            if (currentRow == numRows - 1 && currentCol == numCols - 1) return true;  // 如果到达终点，返回true
    
            // 遍历四个可能的方向
            for (auto& dir : directions) {
                int newRow = currentRow + dir.first;
                int newCol = currentCol + dir.second;
                if (isValid(newRow, newCol, numRows, numCols, mapData)) {  // 检查新位置是否有效
                    int newFuel = (mapData[newRow][newCol] == -1) ? MAX_FUEL : currentFuel - mapData[newRow][newCol];
                    if (newFuel > remainingFuel[newRow][newCol]) {
                        remainingFuel[newRow][newCol] = newFuel;  // 更新剩余油量
                        priorityQueue.push({newFuel, newRow, newCol});  // 将新点加入优先队列
                    }
                }
            }
        }
    
        return false;  // 如果遍历完成后没有找到可到达终点的路径，返回false
    }
    
    // 检查位置是否有效的函数
    bool isValid(int row, int col, int numRows, int numCols, const vector<vector<int>>& mapData) {
        return row >= 0 && row < numRows && col >= 0 && col < numCols && mapData[row][col] != 0;  // 确保不越界且不是障碍物
    }
    
    int main() {
        int numRows, numCols;
        char comma;
    
        cin >> numRows >> comma >> numCols;  // 读取行数和列数
        vector<vector<int>> mapData(numRows, vector<int>(numCols));
    
        for (int i = 0; i < numRows; ++i) {  // 读取地图数据
            for (int j = 0; j < numCols; ++j) {
                if (j < numCols - 1) {
                    cin >> mapData[i][j] >> comma;  // 读取每一行的数据，并处理逗号
                } else {
                    cin >> mapData[i][j];
                }
            }
        }
    
        int minFuel = findMinimumInitialFuel(mapData, numRows, numCols);  // 计算最小初始油量
        cout << minFuel << endl;  // 输出结果
    
        return 0;
    }
    
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    
    #define MAX_FUEL 100  // 定义最大油量常量
    
    // 函数声明
    int canReachDestination(int **map, int startFuel, int numRows, int numCols);
    int isValid(int row, int col, int numRows, int numCols, int **map);
    int findMinimumInitialFuel(int **map, int numRows, int numCols);
    
    int main() {
        int numRows, numCols;  // 定义行数和列数变量
        int **map;  // 定义一个二维数组指针，用于存储地图数据
        int i, j;
    
        // 从标准输入读取地图的行数和列数
        scanf("%d,%d", &numRows, &numCols);
    
        // 为地图分配内存空间
        map = (int **)malloc(numRows * sizeof(int *));
        for (i = 0; i < numRows; i++) {
            map[i] = (int *)malloc(numCols * sizeof(int));
        }
    
        // 从标准输入读取地图数据
        for (i = 0; i < numRows; i++) {
            for (j = 0; j < numCols; j++) {
                if (j < numCols - 1)
                    scanf("%d,", &map[i][j]);  // 读取每行中间的数值
                else
                    scanf("%d", &map[i][j]);  // 读取每行最后一个数值
            }
        }
    
        // 计算并返回最小初始油量
        int minFuel = findMinimumInitialFuel(map, numRows, numCols);
        printf("%d\n", minFuel);  // 输出计算结果
    
        // 释放地图内存空间
        for (i = 0; i < numRows; i++) {
            free(map[i]);
        }
        free(map);
    
        return 0;
    }
    
    // 判断是否可以到达终点的函数
    int canReachDestination(int **map, int startFuel, int numRows, int numCols) {
        if (map[0][0] == 0) return 0;  // 起点不可通行则返回0
    
        // 初始化剩余油量的二维数组
        int **remainingFuel = (int **)malloc(numRows * sizeof(int *));
        for (int i = 0; i < numRows; i++) {
            remainingFuel[i] = (int *)malloc(numCols * sizeof(int));
            for (int j = 0; j < numCols; j++) {
                remainingFuel[i][j] = -1;  // 初始化为-1
            }
        }
        remainingFuel[0][0] = (map[0][0] == -1) ? MAX_FUEL : startFuel - map[0][0];
        if (remainingFuel[0][0] < 0) return 0;  // 起点油量不足返回0
    
        // 使用队列进行广度优先搜索
        int queue[10000][3], front = 0, rear = 0;  // 定义队列及其指针
        queue[rear][0] = 0;
        queue[rear][1] = 0;
        queue[rear][2] = remainingFuel[0][0];
        rear++;
    
        int dx[4] = {0, 1, 0, -1};
        int dy[4] = {1, 0, -1, 0};
    
        // 遍历队列中的元素
        while (front < rear) {
            int currentRow = queue[front][0];
            int currentCol = queue[front][1];
            int fuel = queue[front][2];
            front++;
    
            // 到达终点检查
            if (currentRow == numRows - 1 && currentCol == numCols - 1) return 1;
    
            // 检查四个方向的可行性
            for (int direction = 0; direction < 4; direction++) {
                int newRow = currentRow + dx[direction];
                int newCol = currentCol + dy[direction];
                if (isValid(newRow, newCol, numRows, numCols, map)) {
                    int newFuel = (map[newRow][newCol] == -1) ? MAX_FUEL : fuel - map[newRow][newCol];
                    if (newFuel > remainingFuel[newRow][newCol]) {
                        remainingFuel[newRow][newCol] = newFuel;
                        queue[rear][0] = newRow;
                        queue[rear][1] = newCol;
                        queue[rear][2] = newFuel;
                        rear++;
                    }
                }
            }
        }
    
        // 释放剩余油量数组内存空间
        for (int i = 0; i < numRows; i++) {
            free(remainingFuel[i]);
        }
        free(remainingFuel);
    
        return 0;  // 无法到达终点返回0
    }
    
    // 检查指定位置是否有效的函数
    int isValid(int row, int col, int numRows, int numCols, int **map) {
        return row >= 0 && row < numRows && col >= 0 && col < numCols && map[row][col] != 0;
    }
    
    // 使用二分搜索确定最小初始油量的函数
    int findMinimumInitialFuel(int **map, int numRows, numCols) {
        int low = 0, high = MAX_FUEL, optimalFuel = -1;  // 初始化二分搜索边界和结果
        while (low <= high) {
            int mid = (low + high) / 2;  // 计算中点
            if (canReachDestination(map, mid, numRows, numCols)) {
                optimalFuel = mid;  // 更新找到的最小油量
                high = mid - 1;  // 继续在更低的范围内搜索
            } else {
                low = mid + 1;  // 在更高的范围内搜索
            }
        }
        return optimalFuel;  // 返回找到的最小初始油量
    }
    
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b0d8ff6d53693bfcf6e1605b507f3ae3.png)

