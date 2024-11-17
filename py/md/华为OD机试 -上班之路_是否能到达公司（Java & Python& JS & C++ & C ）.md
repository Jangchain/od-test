## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

_Jungle_ 生活在美丽的蓝鲸城，大马路都是方方正正，但是每天马路的封闭情况都不一样。  
地图由以下元素组成：

  * `.` — 空地，可以达到;

  * `*`— 路障，不可达到;

  * `S` — Jungle的家;

  * `T` — 公司;

其中我们会限制 _Jungle_ 拐弯的次数，同时 _Jungle_ 可以清除给定个数的路障，现在你的任务是计算 _Jungle_
是否可以从家里出发到达公司。

## 输入描述

输入的第一行为两个整数t,c（0 ≤ t,c ≤ 100）,t代表可以拐弯的次数，c代表可以清除的路障个数。

输入的第二行为两个整数n,m（1 ≤ n,m ≤ 100）,代表地图的大小。

接下来是n行包含m个字符的地图。n和m可能不一样大。

我们保证地图里有S和T。

## 输出描述

输出是否可以从家里出发到达公司，是则输出YES，不能则输出NO。

## 示例1

输入

    
    
    2 0
    5 5
    ..S..
    ****.
    T....
    ****.
    .....
    

输出

    
    
    YES
    

说明

> ## 示例2

输入

    
    
    1 2
    5 5
    .*S*.
    *****
    ..*..
    *****
    T....
    

输出

    
    
    NO
    

说明

> 该用例中，至少需要拐弯1次，清除3个路障，所以无法到达

## 解题思路

#### 题目解析

题目描述了一种网格图路径问题，目的是判断从起点 `S` 到目标点 `T` 是否存在一条路径，该路径需要满足以下限制条件：

  1. **拐弯次数限制** ：路径不能超过给定的最大拐弯次数 `t`。
  2. **路障清除限制** ：路径最多可以清除给定数量的路障 `c`。

同时，网格中包含以下元素：

  * `.`：空地，可以直接通行；
  * `*`：路障，可以清除，但受到次数限制；
  * `S`：起点；
  * `T`：目标点。

* * *

#### 问题细化

  1. **路径限制** ：

     * 需要考虑拐弯次数： 
       * 拐弯次数是指路径方向的改变，比如从向右转为向下。
     * 路障清除次数： 
       * 路障清除有次数限制，即最多可以清除 `c` 个 `*`。
  2. **地图的特点** ：

     * 图是一个二维矩阵。
     * 从起点到终点，路径可以向上下左右四个方向移动。
  3. **算法实现关键** ：

     * **状态表示** ： 
       * 路径的状态包括： 
         * 当前所在位置；
         * 当前的拐弯次数；
         * 已清除的路障个数；
         * 当前的移动方向。
     * **搜索方法** ： 
       * 采用 **广度优先搜索 (BFS)** 或 **深度优先搜索 (DFS)** ，尝试所有可能的路径。
       * 通过记录状态避免重复访问。
  4. **边界条件** ：

     * 超出地图范围时终止路径；
     * 如果清除的路障数超过 `c`，或者拐弯次数超过 `t`，路径无效。

* * *

* * *

#### 解题思路总结

  1. **搜索算法选择** ：

     * 采用 BFS（广度优先搜索），因为 BFS 能够优先找到最短路径，适合处理带约束条件的路径问题。
     * DFS 也可以，但需要注意剪枝优化。
  2. **状态表示** ：

     * 每个状态需要记录： 
       * 当前坐标；
       * 当前方向；
       * 当前已用的拐弯次数；
       * 当前已清除的路障个数。
  3. **剪枝优化** ：

     * 如果某个状态的拐弯次数或清除路障个数超过限制，则剪枝。
  4. **实现框架** ：

     * 初始化 BFS 队列，将起点状态入队；
     * 使用方向数组模拟移动；
     * 每次移动更新状态，检查是否达到目标点；
     * 输出结果。

## Java

    
    
    import java.util.Scanner;
    
    public class Main {
        // 定义全局变量
        static int maxTurns, maxBreaks, rows, cols;
        static char[][] matrix;
        static int[][] offsets = {{-1, 0, 1}, {1, 0, 2}, {0, -1, 3}, {0, 1, 4}};
        static int targetRow, targetCol;
        static boolean[][] visited;
    
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
    
            maxTurns = scanner.nextInt();
            maxBreaks = scanner.nextInt();
            rows = scanner.nextInt();
            cols = scanner.nextInt();
    
            // 初始化地图矩阵
            matrix = new char[rows][cols];
            visited = new boolean[rows][cols];
    
            // 读取地图数据，找到起点 S 和终点 T
            int startRow = -1, startCol = -1;
            for (int i = 0; i < rows; i++) {
                String line = scanner.next();
                for (int j = 0; j < cols; j++) {
                    matrix[i][j] = line.charAt(j);
                    if (matrix[i][j] == 'S') {
                        startRow = i;
                        startCol = j;
                    } else if (matrix[i][j] == 'T') {
                        targetRow = i;
                        targetCol = j;
                    }
                }
            }
    
            // 调用深度优先搜索方法，输出结果
            System.out.println(dfs(startRow, startCol, 0, 0, -1) ? "YES" : "NO");
        }
    
        // 深度优先搜索方法
        public static boolean dfs(int row, int col, int turnCount, int breakCount, int lastDirect) {
            // 如果当前位置是终点，返回 true
            if (row == targetRow && col == targetCol) {
                return true;
            }
    
            // 将当前位置标记为已访问
            visited[row][col] = true;
    
            // 遍历四个方向
            for (int[] offset : offsets) {
                int newRow = row + offset[0];
                int newCol = col + offset[1];
                int direct = offset[2];
    
                // 检查新的行和列是否在地图范围内且未访问
                if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && !visited[newRow][newCol]) {
                    boolean isTurn = (lastDirect != -1 && lastDirect != direct); // 是否拐弯
                    boolean isObstacle = (matrix[newRow][newCol] == '*'); // 是否遇到路障
    
                    // 如果拐弯次数或清除路障次数超过限制，跳过
                    if ((isTurn && turnCount + 1 > maxTurns) || (isObstacle && breakCount + 1 > maxBreaks)) continue;
    
                    // 递归调用深度优先搜索方法
                    if (dfs(newRow, newCol, turnCount + (isTurn ? 1 : 0), breakCount + (isObstacle ? 1 : 0), direct)) {
                        return true;
                    }
                }
            }
    
            // 回溯：将当前位置标记为未访问
            visited[row][col] = false;
            return false;
        }
    }
    

## Python

    
    
    # 读取输入数据
    max_turns, max_breaks = map(int, input().split())
    rows, cols = map(int, input().split())
    
    # 初始化地图矩阵
    matrix = [list(input().strip()) for _ in range(rows)]
    visited = [[False] * cols for _ in range(rows)]
    
    # 偏移量和方向定义
    offsets = [(-1, 0, 1), (1, 0, 2), (0, -1, 3), (0, 1, 4)]
    
    # 找到起点 S 和终点 T 的位置
    start_row, start_col = -1, -1
    target_row, target_col = -1, -1
    for i in range(rows):
        for j in range(cols):
            if matrix[i][j] == 'S':
                start_row, start_col = i, j
            elif matrix[i][j] == 'T':
                target_row, target_col = i, j
    
    # 深度优先搜索方法
    def dfs(row, col, turn_count, break_count, last_direct):
        # 如果当前位置是终点，返回 True
        if row == target_row and col == target_col:
            return True
    
        # 将当前位置标记为已访问
        visited[row][col] = True
    
        # 遍历四个方向
        for offset in offsets:
            new_row = row + offset[0]
            new_col = col + offset[1]
            direct = offset[2]
    
            # 检查新的行和列是否在地图范围内且未访问
            if 0 <= new_row < rows and 0 <= new_col < cols and not visited[new_row][new_col]:
                is_turn = (last_direct != -1 and last_direct != direct)  # 是否拐弯
                is_obstacle = (matrix[new_row][new_col] == '*')  # 是否遇到路障
    
                # 如果拐弯次数或清除路障次数超过限制，跳过
                if (is_turn and turn_count + 1 > max_turns) or (is_obstacle and break_count + 1 > max_breaks):
                    continue
    
                # 递归调用深度优先搜索方法
                if dfs(new_row, new_col, turn_count + (1 if is_turn else 0), break_count + (1 if is_obstacle else 0), direct):
                    return True
    
        # 回溯：将当前位置标记为未访问
        visited[row][col] = False
        return False
    
    # 调用深度优先搜索方法并输出结果
    if dfs(start_row, start_col, 0, 0, -1):
        print("YES")
    else:
        print("NO")
    

## JavaScript

    
    
    // 引入 Node.js 内置的 readline 模块，用于读取标准输入（用户输入）
    const readline = require('readline');
    
    // 创建 readline 接口，用于从标准输入读取数据
    const rl = readline.createInterface({
      input: process.stdin, // 输入流为标准输入（通常是键盘输入）
      output: process.stdout // 输出流为标准输出（通常是屏幕输出）
    });
    
    let inputLines = []; // 用于存储所有输入的行
    let maxTurns, maxBreaks, rows, cols, matrix; // 定义变量：最大拐弯数、最大破坏障碍物数、行数、列数、地图矩阵
    
    // 当接收到输入行时触发的事件
    rl.on('line', (line) => {
      // 将输入的每一行存入数组
      inputLines.push(line);
    
      // 如果已读取到前两行，解析最大拐弯数和破坏障碍物数，以及地图的行数和列数
      if (inputLines.length === 2) {
        [maxTurns, maxBreaks] = inputLines[0].split(" ").map(Number); // 第1行：最大拐弯数和最大破坏数
        [rows, cols] = inputLines[1].split(" ").map(Number); // 第2行：地图的行数和列数
      }
    
      // 当读取完所有地图行数时，构建地图矩阵
      if (rows && inputLines.length === rows + 2) {
        matrix = inputLines.slice(2).map((line) => line.split("")); // 从第3行开始读取地图数据，转换为矩阵
        rl.close(); // 输入读取完成，关闭输入流
      }
    });
    
    // 当输入流关闭时触发的事件
    rl.on('close', () => {
      // 初始化一个二维数组，表示地图的访问状态，初始值为 false（未访问）
      const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
    
      // 定义移动的四个方向：[行偏移量, 列偏移量, 方向编号]
      const offsets = [[-1, 0, 1], [1, 0, 2], [0, -1, 3], [0, 1, 4]];
    
      // 查找起点 ('S') 和终点 ('T') 的坐标
      let startRow, startCol, targetRow, targetCol;
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          if (matrix[i][j] === 'S') {
            startRow = i; // 记录起点的行
            startCol = j; // 记录起点的列
          } else if (matrix[i][j] === 'T') {
            targetRow = i; // 记录终点的行
            targetCol = j; // 记录终点的列
          }
        }
      }
    
      /**
       * 深度优先搜索 (DFS) 函数
       * @param {number} row 当前所在的行
       * @param {number} col 当前所在的列
       * @param {number} turnCount 当前的拐弯次数
       * @param {number} breakCount 当前破坏障碍物的次数
       * @param {number} lastDirect 上一次的移动方向
       * @returns {boolean} 是否能成功到达终点
       */
      function dfs(row, col, turnCount, breakCount, lastDirect) {
        // 基础情况：如果当前到达终点，则返回 true
        if (row === targetRow && col === targetCol) {
          return true;
        }
    
        // 将当前位置标记为已访问
        visited[row][col] = true;
    
        // 遍历所有可能的方向
        for (const [dRow, dCol, direct] of offsets) {
          const newRow = row + dRow; // 新的行
          const newCol = col + dCol; // 新的列
    
          // 检查新的位置是否在地图范围内，且未被访问过
          if (
            newRow >= 0 && newRow < rows &&
            newCol >= 0 && newCol < cols &&
            !visited[newRow][newCol]
          ) {
            const isTurn = lastDirect !== -1 && lastDirect !== direct; // 判断是否拐弯
            const isObstacle = matrix[newRow][newCol] === '*'; // 判断是否遇到障碍物
    
            // 如果拐弯次数或破坏障碍物次数超过限制，则跳过
            if ((isTurn && turnCount + 1 > maxTurns) || (isObstacle && breakCount + 1 > maxBreaks)) {
              continue; // 超过限制则跳过此方向
            }
    
            // 递归调用 DFS 进行深度搜索
            if (dfs(
              newRow, newCol,
              turnCount + (isTurn ? 1 : 0), // 如果拐弯则增加拐弯次数
              breakCount + (isObstacle ? 1 : 0), // 如果遇到障碍物则增加破坏次数
              direct // 更新当前方向
            )) {
              return true; // 如果找到路径则返回 true
            }
          }
        }
    
        // 回溯：将当前位置标记为未访问，以便其他路径尝试
        visited[row][col] = false;
        return false; // 未找到路径则返回 false
      }
    
      // 调用 DFS 函数从起点开始搜索，输出结果
      const result = dfs(startRow, startCol, 0, 0, -1) ? "YES" : "NO";
      console.log(result); // 输出 "YES" 或 "NO"
    });
    

## C++

    
    
    #include <iostream>
    #include <vector>
    #include <string>
    
    using namespace std;
    
    // 定义全局变量
    int maxTurns, maxBreaks, rows, cols;
    vector<vector<char>> matrix;
    vector<vector<bool>> visited;
    int offsets[4][3] = {{-1, 0, 1}, {1, 0, 2}, {0, -1, 3}, {0, 1, 4}};
    int targetRow, targetCol;
    
    // 深度优先搜索方法
    bool dfs(int row, int col, int turnCount, int breakCount, int lastDirect) {
        // 如果当前位置是终点，返回 true
        if (row == targetRow && col == targetCol) {
            return true;
        }
    
        // 将当前位置标记为已访问
        visited[row][col] = true;
    
        // 遍历四个方向
        for (auto& offset : offsets) {
            int newRow = row + offset[0];
            int newCol = col + offset[1];
            int direct = offset[2];
    
            // 检查新的行和列是否在地图范围内且未访问
            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && !visited[newRow][newCol]) {
                bool isTurn = (lastDirect != -1 && lastDirect != direct); // 是否拐弯
                bool isObstacle = (matrix[newRow][newCol] == '*'); // 是否遇到路障
    
                // 如果拐弯次数或清除路障次数超过限制，跳过
                if ((isTurn && turnCount + 1 > maxTurns) || (isObstacle && breakCount + 1 > maxBreaks)) continue;
    
                // 递归调用深度优先搜索方法
                if (dfs(newRow, newCol, turnCount + (isTurn ? 1 : 0), breakCount + (isObstacle ? 1 : 0), direct)) {
                    return true;
                }
            }
        }
    
        // 回溯：将当前位置标记为未访问
        visited[row][col] = false;
        return false;
    }
    
    int main() {
        // 读取输入数据
        cin >> maxTurns >> maxBreaks;
        cin >> rows >> cols;
    
        // 初始化地图矩阵
        matrix.resize(rows, vector<char>(cols));
        visited.resize(rows, vector<bool>(cols, false));
    
        // 找到起点 S 和终点 T 的位置
        int startRow = -1, startCol = -1;
        for (int i = 0; i < rows; ++i) {
            string line;
            cin >> line;
            for (int j = 0; j < cols; ++j) {
                matrix[i][j] = line[j];
                if (matrix[i][j] == 'S') {
                    startRow = i;
                    startCol = j;
                } else if (matrix[i][j] == 'T') {
                    targetRow = i;
                    targetCol = j;
                }
            }
        }
    
        // 调用深度优先搜索方法并输出结果
        cout << (dfs(startRow, startCol, 0, 0, -1) ? "YES" : "NO") << endl;
    
        return 0;
    }
    

## C语言

    
    
    #include <stdio.h>
    #include <stdbool.h>
    
    #define MAX_ROWS 100
    #define MAX_COLS 100
    
    // 定义全局变量
    int maxTurns, maxBreaks, rows, cols;
    char matrix[MAX_ROWS][MAX_COLS];
    bool visited[MAX_ROWS][MAX_COLS];
    int offsets[4][3] = {{-1, 0, 1}, {1, 0, 2}, {0, -1, 3}, {0, 1, 4}};
    int targetRow, targetCol;
    
    // 深度优先搜索方法
    bool dfs(int row, int col, int turnCount, int breakCount, int lastDirect) {
        // 如果当前位置是终点，返回 true
        if (row == targetRow && col == targetCol) {
            return true;
        }
    
        // 将当前位置标记为已访问
        visited[row][col] = true;
    
        // 遍历四个方向
        for (int i = 0; i < 4; ++i) {
            int newRow = row + offsets[i][0];
            int newCol = col + offsets[i][1];
            int direct = offsets[i][2];
    
            // 检查新的行和列是否在地图范围内且未访问
            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && !visited[newRow][newCol]) {
                bool isTurn = (lastDirect != -1 && lastDirect != direct); // 是否拐弯
                bool isObstacle = (matrix[newRow][newCol] == '*'); // 是否遇到路障
    
                // 如果拐弯次数或清除路障次数超过限制，跳过
                if ((isTurn && turnCount + 1 > maxTurns) || (isObstacle && breakCount + 1 > maxBreaks)) continue;
    
                // 递归调用深度优先搜索方法
                if (dfs(newRow, newCol, turnCount + (isTurn ? 1 : 0), breakCount + (isObstacle ? 1 : 0), direct)) {
                    return true;
                }
            }
        }
    
        // 回溯：将当前位置标记为未访问
        visited[row][col] = false;
        return false;
    }
    
    int main() {
        // 读取输入数据
        scanf("%d %d", &maxTurns, &maxBreaks);
        scanf("%d %d", &rows, &cols);
    
        // 初始化地图矩阵
        int startRow = -1, startCol = -1;
        for (int i = 0; i < rows; ++i) {
            scanf("%s", matrix[i]);
            for (int j = 0; j < cols; ++j) {
                if (matrix[i][j] == 'S') {
                    startRow = i;
                    startCol = j;
                } else if (matrix[i][j] == 'T') {
                    targetRow = i;
                    targetCol = j;
                }
            }
        }
    
        // 调用深度优先搜索方法并输出结果
        if (dfs(startRow, startCol, 0, 0, -1)) {
            printf("YES\n");
        } else {
            printf("NO\n");
        }
    
        return 0;
    }
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/cd3a32d1b7e233faa0e980df6fb9fa05.png)

