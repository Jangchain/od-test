## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

周末小明准备去爬山锻炼，0代表平地，山的高度使用1到9来表示，小明每次爬山或下山高度只能相差k及k以内，每次只能上下左右一个方向上移动一格，小明从左上角(0,0)位置出发

## 输入描述

第一行输入m n k(空格分隔)

  * 代表m*n的二维山地图，k为小明每次爬山或下山高度差的最大值，

然后接下来输入山地图，一共m行n列，均以空格分隔。取值范围：

  * 0 < m ≤ 500
  * 0< n ≤ 500
  * 0 < k < 5

## 备注

所有用例输入均为正确格式，且在取值范围内，考生不需要考虑不合法的输入格式。

## 输出描述

请问小明能爬到的最高峰多高，到该最高峰的最短步数，输出以空格分隔。

同高度的山峰输出较短步数。

如果没有可以爬的山峰，则高度和步数都返回0。

## 示例1

输入

    
    
    5 4 1
    0 1 2 0
    1 0 0 0
    1 0 1 2
    1 3 1 0
    0 0 0 9
    

输出

    
    
    2 2
    

说明

> 根据山地图可知，能爬到的最高峰在(0,2)位置，高度为2，最短路径为(0,0)-(0,1)-(0,2)，最短步数为2。

## 示例2

输入

    
    
    5 4 3
    0 0 0 0
    0 0 0 0
    0 9 0 0
    0 0 0 0
    0 0 0 9
    

输出

    
    
    0 0
    

说明

> 根据山地图可知，每次爬山距离3，无法爬到山峰上，步数为0。

> ## 解题思路

这个问题的解题思路是使用深度优先搜索（DFS）算法来解决小明爬山的问题。

  1. 定义一个常量数组 OFFSETS，表示上下左右四个方向的偏移量。这将帮助我们在搜索过程中遍历相邻的位置。

  2. 实现一个深度优先搜索函数 dfs，它接收以下参数：当前位置的坐标 (x, y)，当前步数 step，一个哈希表 min_step_to_height 用于存储到达不同高度的最短步数，山地图矩阵 matrix，矩阵的行数 m 和列数 n，允许的最大高度差 k，一个记忆化数组 memo 用于记录已经访问过的位置和步数，以及一个布尔数组 visited 用于记录已经访问过的位置。

  3. 在 dfs 函数中，首先获取当前位置的高度。

  4. 遍历四个方向（上下左右），计算新的位置，并检查新位置是否在矩阵范围内。

  5. 获取新位置的高度，并检查两个位置的高度差是否在 k 以内。如果高度差在 k 以内，执行以下操作：

a. 增加步数。

b. 更新到达新高度的最短步数。如果当前高度不在 min_step_to_height 中，或者当前步数小于已记录的最短步数，更新
min_step_to_height。

c. 检查记忆化数组，避免重复计算。如果当前位置没有被访问过，或者已访问过但当前步数小于已记录的步数，执行以下操作：

i. 更新记忆化数组。

ii. 标记当前位置为已访问。

iii. 递归调用 dfs 函数，继续搜索。

iv. 回溯时，将当前位置标记为未访问。

d. 减少步数。

## Java

    
    
    import java.util.HashMap;
    import java.util.Scanner;
    
    public class Main {
        // 定义一个常量数组，表示上下左右四个方向的偏移量
        private static final int[][] OFFSETS = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};
    
        public static void main(String[] args) {
            Scanner sc = new Scanner(System.in);
    
            // 读取输入的m, n, k
            int m = sc.nextInt();
            int n = sc.nextInt();
            int k = sc.nextInt();
    
            // 初始化山地图矩阵
            int[][] matrix = new int[m][n];
            for (int i = 0; i < m; i++) {
                for (int j = 0; j < n; j++) {
                    matrix[i][j] = sc.nextInt();
                }
            }
    
            // 初始化一个哈希表，用于存储到达不同高度的最短步数
            HashMap<Integer, Integer> minStepToHeight = new HashMap<>();
            minStepToHeight.put(matrix[0][0], 0);
    
            // 初始化一个记忆化数组，用于记录已经访问过的位置和步数
            int[][] memo = new int[m][n];
            // 初始化一个布尔数组，用于记录已经访问过的位置
            boolean[][] visited = new boolean[m][n];
            // 调用深度优先搜索函数
            dfs(0, 0, 0, minStepToHeight, matrix, m, n, k, memo, visited);
    
            // 计算最高峰的高度和最短步数
            int maxHeight = minStepToHeight.keySet().stream().max((a, b) -> a - b).orElse(0);
            int minStep = minStepToHeight.get(maxHeight);
    
            // 输出结果
            System.out.println(maxHeight + " " + minStep);
        }
    
        // 深度优先搜索函数
        public static void dfs(int x, int y, int step, HashMap<Integer, Integer> minStepToHeight, int[][] matrix, int m, int n, int k, int[][] memo, boolean[][] visited) {
            // 获取当前位置的高度
            int lastHeight = matrix[x][y];
    
            // 遍历四个方向
            for (int[] offset : OFFSETS) {
                // 计算新的位置
                int newX = x + offset[0];
                int newY = y + offset[1];
    
                // 检查新位置是否在矩阵范围内
                if (newX < 0 || newX >= m || newY < 0 || newY >= n) continue;
    
                // 获取新位置的高度
                int curHeight = matrix[newX][newY];
    
                // 检查两个位置的高度差是否在k以内
                if (Math.abs(curHeight - lastHeight) <= k) {
                    // 增加步数
                    step++;
    
                    // 更新到达新高度的最短步数
                    if (!minStepToHeight.containsKey(curHeight) || minStepToHeight.get(curHeight) > step) {
                        minStepToHeight.put(curHeight, step);
                    }
    
                    // 检查记忆化数组，避免重复计算
                    if (memo[newX][newY] == 0 || memo[newX][newY] > step) {
                        // 更新记忆化数组
                        memo[newX][newY] = step;
                        // 标记当前位置为已访问
                        visited[x][y] = true;
    
                        // 递归调用深度优先搜索
                        dfs(newX, newY, step, minStepToHeight, matrix, m, n, k, memo, visited);
    
                        // 回溯时，将当前位置标记为未访问
                        visited[x][y] = false;
                    }
    
                    // 减少步数
                    step--;
                }
            }
        }
    }
    
    
    

## Python

    
    
    from collections import defaultdict
    
    # 定义一个常量数组，表示上下左右四个方向的偏移量
    OFFSETS = [
        (-1, 0),
        (1, 0),
        (0, -1),
        (0, 1),
    ]
    
    # 深度优先搜索函数
    def dfs(x, y, step, min_step_to_height, matrix, m, n, k, memo, visited):
        # 获取当前位置的高度
        last_height = matrix[x][y]
    
        # 遍历四个方向
        for offset in OFFSETS:
            # 计算新的位置
            new_x = x + offset[0]
            new_y = y + offset[1]
    
            # 检查新位置是否在矩阵范围内
            if new_x < 0 or new_x >= m or new_y < 0 or new_y >= n:
                continue
    
            # 获取新位置的高度
            cur_height = matrix[new_x][new_y]
    
            # 检查两个位置的高度差是否在k以内
            if abs(cur_height - last_height) <= k:
                # 增加步数
                step += 1
    
                # 更新到达新高度的最短步数
                if cur_height not in min_step_to_height or min_step_to_height[cur_height] > step:
                    min_step_to_height[cur_height] = step
    
                # 检查记忆化数组，避免重复计算
                if memo[new_x][new_y] == 0 or memo[new_x][new_y] > step:
                    # 更新记忆化数组
                    memo[new_x][new_y] = step
                    # 标记当前位置为已访问
                    visited[x][y] = True
    
                    # 递归调用深度优先搜索
                    dfs(new_x, new_y, step, min_step_to_height, matrix, m, n, k, memo, visited)
    
                    # 回溯时，将当前位置标记为未访问
                    visited[x][y] = False
    
                # 减少步数
                step -= 1
    
    # 主函数
    def main():
        # 读取输入的m, n, k
        m, n, k = map(int, input().split())
        # 初始化山地图矩阵
        matrix = [list(map(int, input().split())) for _ in range(m)]
    
        # 初始化一个哈希表，用于存储到达不同高度的最短步数
        min_step_to_height = {matrix[0][0]: 0}
        # 初始化一个记忆化数组，用于记录已经访问过的位置和步数
        memo = [[0] * n for _ in range(m)]
        # 初始化一个布尔数组，用于记录已经访问过的位置
        visited = [[False] * n for _ in range(m)]
    
        # 调用深度优先搜索函数
        dfs(0, 0, 0, min_step_to_height, matrix, m, n, k, memo, visited)
    
        # 计算最高峰的高度和最短步数
        max_height = max(min_step_to_height.keys())
        min_step = min_step_to_height[max_height]
    
        # 输出结果
        print(max_height, min_step)
    
    # 程序入口
    if __name__ == "__main__":
        main()
    
    
    

## JavaScript

    
    
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    // 定义一个常量数组，表示上下左右四个方向的偏移量
    const OFFSETS = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
    ];
    
    // 深度优先搜索函数
    function dfs(x, y, step, minStepToHeight, matrix, m, n, k, memo, visited) {
        // 获取当前位置的高度
        const lastHeight = matrix[x][y];
    
        // 遍历四个方向
        for (const offset of OFFSETS) {
            // 计算新的位置
            const newX = x + offset[0];
            const newY = y + offset[1];
    
            // 检查新位置是否在矩阵范围内
            if (newX < 0 || newX >= m || newY < 0 || newY >= n) {
                continue;
            }
    
            // 获取新位置的高度
            const curHeight = matrix[newX][newY];
    
            // 检查两个位置的高度差是否在k以内
            if (Math.abs(curHeight - lastHeight) <= k) {
                // 增加步数
                step += 1;
    
                // 更新到达新高度的最短步数
                if (!(curHeight in minStepToHeight) || minStepToHeight[curHeight] > step) {
                    minStepToHeight[curHeight] = step;
                }
    
                // 检查记忆化数组，避免重复计算
                if (memo[newX][newY] === 0 || memo[newX][newY] > step) {
                    // 更新记忆化数组
                    memo[newX][newY] = step;
                    // 标记当前位置为已访问
                    visited[x][y] = true;
    
                    // 递归调用深度优先搜索
                    dfs(newX, newY, step, minStepToHeight, matrix, m, n, k, memo, visited);
    
                    // 回溯时，将当前位置标记为未访问
                    visited[x][y] = false;
                }
    
                // 减少步数
                step -= 1;
            }
        }
    }
    const inputLines = [];
    
    rl.on('line', input => {
        inputLines.push(input);
        if (inputLines.length === parseInt(inputLines[0].split(' ')[0], 10) + 1) {
            rl.close();
            const [m, n, k] = inputLines[0].split(' ').map(Number);
            const matrix = inputLines.slice(1).map(line => line.split(' ').map(Number));
    
    
            // 初始化一个哈希表，用于存储到达不同高度的最短步数
            const minStepToHeight = { [matrix[0][0]]: 0 };
            // 初始化一个记忆化数组，用于记录已经访问过的位置和步数
            const memo = Array.from({ length: m }, () => Array(n).fill(0));
            // 初始化一个布尔数组，用于记录已经访问过的位置
            const visited = Array.from({ length: m }, () => Array(n).fill(false));
    
            // 调用深度优先搜索函数
            dfs(0, 0, 0, minStepToHeight, matrix, m, n, k, memo, visited);
    
            // 计算最高峰的高度和最短步数
            const max_height = Math.max(...Object.keys(minStepToHeight).map(Number));
            const min_step = minStepToHeight[max_height];
    
            // 输出结果
            console.log(max_height, min_step);
    
            rl.close();
        }
    })
    
    
    
    
    

## C++

    
    
    #include <iostream>
    #include <vector>
    #include <unordered_map>
    #include <algorithm>
    
    using namespace std;
    
    // 定义一个常量数组，表示上下左右四个方向的偏移量
    const vector<vector<int>> OFFSETS = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};
    
    // 深度优先搜索函数
    void dfs(int x, int y, int step, unordered_map<int, int> &minStepToHeight, vector<vector<int>> &matrix, int m, int n, int k, vector<vector<int>> &memo, vector<vector<bool>> &visited) {
        // 获取当前位置的高度
        int lastHeight = matrix[x][y];
    
        // 遍历四个方向
        for (const auto &offset : OFFSETS) {
            // 计算新的位置
            int newX = x + offset[0];
            int newY = y + offset[1];
    
            // 检查新位置是否在矩阵范围内
            if (newX < 0 || newX >= m || newY < 0 || newY >= n) continue;
    
            // 获取新位置的高度
            int curHeight = matrix[newX][newY];
    
            // 检查两个位置的高度差是否在k以内
            if (abs(curHeight - lastHeight) <= k) {
                // 增加步数
                step++;
    
                // 更新到达新高度的最短步数
                if (minStepToHeight.find(curHeight) == minStepToHeight.end() || minStepToHeight[curHeight] > step) {
                    minStepToHeight[curHeight] = step;
                }
    
                // 检查记忆化数组，避免重复计算
                if (memo[newX][newY] == 0 || memo[newX][newY] > step) {
                    // 更新记忆化数组
                    memo[newX][newY] = step;
                    // 标记当前位置为已访问
                    visited[x][y] = true;
    
                    // 递归调用深度优先搜索
                    dfs(newX, newY, step, minStepToHeight, matrix, m, n, k, memo, visited);
    
                    // 回溯时，将当前位置标记为未访问
                    visited[x][y] = false;
                }
    
                // 减少步数
                step--;
            }
        }
    }
    
    int main() {
        int m, n, k;
        cin >> m >> n >> k;
    
        // 初始化山地图矩阵
        vector<vector<int>> matrix(m, vector<int>(n));
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                cin >> matrix[i][j];
            }
        }
    
        // 初始化一个哈希表，用于存储到达不同高度的最短步数
        unordered_map<int, int> minStepToHeight;
        minStepToHeight[matrix[0][0]] = 0;
    
        // 初始化一个记忆化数组，用于记录已经访问过的位置和步数
        vector<vector<int>> memo(m, vector<int>(n));
        // 初始化一个布尔数组，用于记录已经访问过的位置
        vector<vector<bool>> visited(m, vector<bool>(n));
        // 调用深度优先搜索函数
        dfs(0, 0, 0, minStepToHeight, matrix, m, n, k, memo, visited);
    
        // 计算最高峰的高度和最短步数
        int maxHeight = 0;
        int minStep = 0;
        for (const auto &entry : minStepToHeight) {
            if (entry.first > maxHeight) {
                maxHeight = entry.first;
                minStep = entry.second;
            }
        }
    
        // 输出结果
        cout << maxHeight << " " << minStep << endl;
    
        return 0;
    }
    
    
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    #include <stdbool.h>
    #include <math.h>
    
    // 定义四个方向的偏移量：上、下、左、右
    int OFFSETS[4][2] = {
        {-1, 0},  // 上
        {1, 0},   // 下
        {0, -1},  // 左
        {0, 1}    // 右
    };
    
    // 深度优先搜索函数
    void dfs(int x, int y, int step, int **minStepToHeight, int **matrix, int m, int n, int k, int **memo, bool **visited) {
        // 获取当前位置的高度
        int lastHeight = matrix[x][y];
    
        // 遍历四个方向
        for (int i = 0; i < 4; i++) {
            int newX = x + OFFSETS[i][0];  // 新位置的行坐标
            int newY = y + OFFSETS[i][1];  // 新位置的列坐标
    
            // 检查新位置是否在地图范围内
            if (newX < 0 || newX >= m || newY < 0 || newY >= n) {
                continue;
            }
    
            // 获取新位置的高度
            int curHeight = matrix[newX][newY];
    
            // 检查高度差是否在k以内
            if (abs(curHeight - lastHeight) <= k) {
                step++;  // 增加步数
    
                // 更新到达新高度的最短步数
                if (minStepToHeight[curHeight][0] == 0 || minStepToHeight[curHeight][0] > step) {
                    minStepToHeight[curHeight][0] = step;
                }
    
                // 检查记忆数组，避免重复计算
                if (memo[newX][newY] == 0 || memo[newX][newY] > step) {
                    memo[newX][newY] = step;    // 更新记忆化数组
                    visited[x][y] = true;       // 标记当前位置为已访问
    
                    // 递归调用深度优先搜索
                    dfs(newX, newY, step, minStepToHeight, matrix, m, n, k, memo, visited);
    
                    visited[x][y] = false;      // 回溯时标记当前位置为未访问
                }
    
                step--;  // 回溯时步数减少
            }
        }
    }
    
    int main() {
        int m, n, k;
        scanf("%d %d %d", &m, &n, &k);  // 输入m, n, k的值
    
        // 动态分配二维数组用于存储山地图
        int **matrix = (int **)malloc(m * sizeof(int *));
        for (int i = 0; i < m; i++) {
            matrix[i] = (int *)malloc(n * sizeof(int));
            for (int j = 0; j < n; j++) {
                scanf("%d", &matrix[i][j]);  // 读取山地图
            }
        }
    
        // 初始化用于存储到达不同高度的最短步数数组
        int **minStepToHeight = (int **)malloc(10 * sizeof(int *));
        for (int i = 0; i < 10; i++) {
            minStepToHeight[i] = (int *)calloc(1, sizeof(int));  // 初始最短步数为0
        }
    
        // 初始化记忆化数组，用于记录已经访问过的位置和步数
        int **memo = (int **)malloc(m * sizeof(int *));
        for (int i = 0; i < m; i++) {
            memo[i] = (int *)calloc(n, sizeof(int));
        }
    
        // 初始化访问数组，记录已访问位置
        bool **visited = (bool **)malloc(m * sizeof(bool *));
        for (int i = 0; i < m; i++) {
            visited[i] = (bool *)calloc(n, sizeof(bool));
        }
    
        // 初始化时从起点 (0,0) 开始
        minStepToHeight[matrix[0][0]][0] = 0;
    
        // 调用深度优先搜索
        dfs(0, 0, 0, minStepToHeight, matrix, m, n, k, memo, visited);
    
        // 查找能够到达的最高峰及其最短步数
        int max_height = 0;
        int min_step = 0;
    
        for (int i = 0; i < 10; i++) {
            if (minStepToHeight[i][0] != 0) {
                max_height = i;      // 更新最高峰高度
                min_step = minStepToHeight[i][0];  // 获取最短步数
            }
        }
    
        // 输出结果，如果无法到达任何峰值，输出0 0
        if (max_height == 0) {
            printf("0 0\n");
        } else {
            printf("%d %d\n", max_height, min_step);
        }
    
        // 释放动态分配的内存
        for (int i = 0; i < m; i++) {
            free(matrix[i]);
            free(memo[i]);
            free(visited[i]);
        }
        free(matrix);
        free(memo);
        free(visited);
    
        for (int i = 0; i < 10; i++) {
            free(minStepToHeight[i]);
        }
        free(minStepToHeight);
    
        return 0;
    }
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b0d8ff6d53693bfcf6e1605b507f3ae3.png)

