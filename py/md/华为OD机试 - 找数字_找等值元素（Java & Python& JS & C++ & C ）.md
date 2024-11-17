## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

给一个[二维数组](https://so.csdn.net/so/search?q=%E4%BA%8C%E7%BB%B4%E6%95%B0%E7%BB%84&spm=1001.2101.3001.7020)
nums，对于每一个元素 nums[i]，找出距离最近的且值相等的元素，

输出横纵坐标差值的绝对值之和，如果没有等值元素，则输出-1。

## 输入描述

输入第一行为二维数组的行

输入第二行为二维数组的列

输入的数字以空格隔开。

##### 备注

  * 针对数组 nums[i][j]，满足 0 < i ≤ 100，0 < j ≤ 100
  * 对于每个数字，最多存在 100 个与其相等的数字

## 输出描述

数组形式返回所有坐标值。

## 示例1

输入

    
    
    3
    5
    0 3 5 4 2
    2 5 7 8 3
    2 5 4 2 4
    

输出

    
    
    [[-1, 4, 2, 3, 3], [1, 1, -1, -1, 4], [1, 1, 2, 3, 2]]
    

说明

> ## 解题思路

##### 题目描述：

给定一个二维数组 `nums`，对于数组中的每个元素 `nums[i][j]`，需要找到距离最近的、与其值相等的另一个元素
`nums[x][y]`，并计算这两个元素之间的“曼哈顿距离”（即横纵坐标差值的绝对值之和）。  
如果找不到其他等值的元素，则返回 `-1`。

##### 用例解释：

###### 输入：

    
    
    3
    5
    0 3 5 4 2
    2 5 7 8 3
    2 5 4 2 4
    

  1. **输入格式解释** ：

     * 第一行表示二维数组有 `3` 行。
     * 第二行表示二维数组有 `5` 列。
     * 接下来的 `3` 行是具体的二维数组内容：
        
                0 3 5 4 2
        2 5 7 8 3
        2 5 4 2 4
        

  2. **输出格式解释** ：

     * 输出的结果为一个二维数组，格式如下：
        
                [[-1, 4, 2, 3, 3], [1, 1, -1, -1, 4], [1, 1, 2, 3, 2]]
        

###### 计算步骤：

  * 对于每个元素，计算与其值相等的其他元素的曼哈顿距离，选择最小的距离。 
    * **示例计算** ： 
      * 对于 `nums[0][0] = 0`，没有其他值为 `0` 的元素，因此输出 `-1`。
      * 对于 `nums[0][1] = 3`，最近的等值元素是 `nums[1][4]`，距离为 `|0-1| + |1-4| = 4`。
      * 对于 `nums[0][2] = 5`，最近的等值元素是 `nums[1][1]`，距离为 `|0-1| + |2-1| = 2`。
      * 以此类推，计算其他元素的距离。

## Java

    
    
    import java.util.*;
    
    public class Main {
        public static void main(String[] args) {
            Scanner sc = new Scanner(System.in);
    
            // 读取输入的行数和列数
            int rows = sc.nextInt(); // 输入行数
            int cols = sc.nextInt(); // 输入列数
    
            // 创建一个二维数组来存储输入的矩阵
            int[][] mat = new int[rows][cols];
            // 创建一个哈希表来记录每个数字在矩阵中的所有位置
            Map<Integer, List<int[]>> posMap = new HashMap<>();
    
            // 读取输入的矩阵数据并同时记录每个数字出现的位置
            for (int r = 0; r < rows; r++) { // 遍历每一行
                for (int c = 0; c < cols; c++) { // 遍历每一列
                    int val = sc.nextInt(); // 读取当前元素
                    mat[r][c] = val; // 将元素存入矩阵
                    // 如果哈希表中还没有这个数字，则初始化一个列表来存储位置
                    posMap.putIfAbsent(val, new ArrayList<>());
                    // 将当前元素的坐标 (r, c) 加入到数字对应的列表中
                    posMap.get(val).add(new int[]{r, c});
                }
            }
    
            // 用来存放最终输出的结果矩阵
            int[][] res = new int[rows][cols];
    
            // 遍历矩阵中的每个元素，计算到最近的相同元素的距离
            for (int r = 0; r < rows; r++) { // 遍历每一行
                for (int c = 0; c < cols; c++) { // 遍历每一列
                    int val = mat[r][c]; // 获取当前元素的值
                    // 如果这个数字只出现一次，即只有一个位置，则没有相同元素，输出 -1
                    if (posMap.get(val).size() == 1) {
                        res[r][c] = -1; // 该位置没有相同元素，返回 -1
                    } else {
                        // 否则调用 bfs 函数，计算到最近的相同元素的距离
                        res[r][c] = bfs(mat, posMap.get(val), r, c);
                    }
                }
            }
    
            // 将结果矩阵转换为字符串并输出
             String[] resultStrings = new String[res.length];
            for (int i = 0; i < res.length; i++) {
                resultStrings[i] = Arrays.toString(res[i]);
            }
            System.out.println(Arrays.toString(resultStrings));
            
        }
    
        //  搜索函数，用于找到与 (x, y) 坐标最近的相同元素
        private static int bfs(int[][] mat, List<int[]> positions, int x, int y) {
            int minDist = Integer.MAX_VALUE; // 初始化最小距离为最大值
            // 遍历所有相同数字的坐标
            for (int[] p : positions) {
                int px = p[0]; // 相同数字的行坐标
                int py = p[1]; // 相同数字的列坐标
                // 如果这个相同数字的位置与当前坐标不同
                if (px != x || py != y) {
                    // 计算当前元素与相同数字的曼哈顿距离
                    int dist = Math.abs(px - x) + Math.abs(py - y);
                    // 更新最小距离
                    minDist = Math.min(minDist, dist);
                }
            }
            return minDist; // 返回最小的距离
        }
    }
    

## Python

    
    
    import sys
    from collections import defaultdict
    
    # 读取输入的行数和列数
    n = int(input())
    m = int(input())
    
    # 读取矩阵数据
    matrix = [list(map(int, input().split())) for _ in range(n)]
    
    # 用字典记录每个数字出现的位置
    posMap = defaultdict(list)
    
    # 遍历矩阵，记录每个数字的位置
    for i in range(n):
        for j in range(m):
            num = matrix[i][j]
            posMap[num].append((i, j))
    
    # 初始化结果矩阵
    result = [[-1] * m for _ in range(n)]
    
    # 遍历矩阵中的每个元素，计算到最近的相同元素的距离
    for i in range(n):
        for j in range(m):
            num = matrix[i][j]
            minDist = float('inf')
            
            # 如果该数字只出现一次，则返回 -1
            if len(posMap[num]) == 1:
                result[i][j] = -1
            else:
                # 遍历相同数字的所有位置，计算曼哈顿距离
                for (x, y) in posMap[num]:
                    if (x, y) != (i, j):
                        dist = abs(x - i) + abs(y - j)
                        minDist = min(minDist, dist)
                
                result[i][j] = minDist
    print(result)
       
    
    
     
    

## JavaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    const lines = [];
    let n, m;
    
    rl.on('line', (line) => {
      lines.push(line);
    
      if (lines.length === 2) {
        n = parseInt(lines[0]);
        m = parseInt(lines[1]);
      }
    
      if (n && lines.length === n + 2) {
        const matrix = lines.slice(2).map(line => line.split(' ').map(Number));
        const posMap = {};
    
        // 记录每个数字出现的位置
        for (let i = 0; i < n; i++) {
          for (let j = 0; j < m; j++) {
            const num = matrix[i][j];
            if (!posMap[num]) posMap[num] = [];
            posMap[num].push([i, j]);
          }
        }
    
        const result = Array.from({ length: n }, () => Array(m).fill(-1));
    
        // 遍历矩阵，计算最近的相同元素的距离
        for (let i = 0; i < n; i++) {
          for (let j = 0; j < m; j++) {
            const num = matrix[i][j];
            const positions = posMap[num];
    
            if (positions.length > 1) {
              result[i][j] = findMinDistance(positions, i, j);
            }
          }
        }
    
        
        console.log(JSON.stringify(result).replace(/,/g, ", "));
        rl.close();
      }
    });
    
    // 计算当前位置到相同数字最近元素的曼哈顿距离
    function findMinDistance(positions, x, y) {
      let minDist = Infinity;
      for (const [px, py] of positions) {
        if (px !== x || py !== y) {
          const dist = Math.abs(px - x) + Math.abs(py - y);
          minDist = Math.min(minDist, dist);
        }
      }
      return minDist;
    }
    
    

## C++

    
    
    #include <iostream>
    #include <vector>
    #include <unordered_map>
    #include <climits>
    #include <cmath>
    using namespace std;
    
    int main() {
        int rows, cols;
        cin >> rows >> cols;
    
        vector<vector<int>> matrix(rows, vector<int>(cols));
        unordered_map<int, vector<pair<int, int>>> posMap;
    
        // 读取输入的矩阵数据并记录每个数字出现的位置
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                cin >> matrix[i][j];
                posMap[matrix[i][j]].emplace_back(i, j);
            }
        }
    
        vector<vector<int>> result(rows, vector<int>(cols, -1));
    
        // 遍历矩阵中的每个元素，计算到最近的相同元素的距离
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                int num = matrix[i][j];
                int minDist = INT_MAX;
                
                // 如果该数字只出现一次，则直接设为 -1
                if (posMap[num].size() > 1) {
                    // 遍历相同数字的所有位置，计算曼哈顿距离
                    for (const auto& pos : posMap[num]) {
                        int x = pos.first;
                        int y = pos.second;
                        if (x != i || y != j) {
                            int dist = abs(x - i) + abs(y - j);
                            minDist = min(minDist, dist);
                        }
                    }
                    result[i][j] = minDist;
                }
            }
        }
        cout << "[";
        // 输出结果矩阵
        for (int i = 0; i < rows; i++) {
            cout << "[";
            for (int j = 0; j < cols; j++) {
                cout << result[i][j];
                if (j != cols - 1) {
                    cout << ", ";
                }
            }
            cout << "]" ;
            if (i != rows - 1) {
                    cout << ", ";
            }
        }  
        cout << "]" ;
    
        return 0;
    }
    

## C语言

    
    
    #include <stdio.h>
    #include <limits.h>
    #include <stdlib.h>
    
    // 定义最大数字值及矩阵大小的上限
    #define MAX_NUM 101
    #define MAX_SIZE 100
    
    // 定义二维数组，用于记录数字出现的坐标
    int posMap[MAX_NUM][MAX_SIZE][2];
    int posCount[MAX_NUM];  // 记录每个数字出现的次数
    
    int main() {
        int rows, cols;
        
        // 输入矩阵的行数和列数
        scanf("%d %d", &rows, &cols);
        
        int matrix[MAX_SIZE][MAX_SIZE];   // 定义一个二维数组来存储输入的矩阵
        int result[MAX_SIZE][MAX_SIZE];   // 定义一个二维数组来存储结果
        
        // 初始化 posMap 数组的计数
        for (int i = 0; i < MAX_NUM; i++) {
            posCount[i] = 0;
        }
        
        // 读取输入的矩阵数据并记录每个数字出现的位置
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                scanf("%d", &matrix[i][j]);  // 输入矩阵的元素
                int num = matrix[i][j];
                // 记录数字的位置
                posMap[num][posCount[num]][0] = i;
                posMap[num][posCount[num]][1] = j;
                posCount[num]++;  // 计数加一
            }
        }
    
        // 初始化结果矩阵为 -1
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                result[i][j] = -1;
            }
        }
    
        // 遍历矩阵中的每个元素，计算到最近的相同元素的距离
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                int num = matrix[i][j];  // 获取当前元素的值
                int minDist = INT_MAX;   // 初始化最小距离为最大值
                
                // 如果该数字出现多次，计算到最近的相同数字的距离
                if (posCount[num] > 1) {
                    for (int k = 0; k < posCount[num]; k++) {
                        int x = posMap[num][k][0];
                        int y = posMap[num][k][1];
                        if (x != i || y != j) {  // 排除当前位置
                            // 计算曼哈顿距离
                            int dist = abs(x - i) + abs(y - j);
                            if (dist < minDist) {
                                minDist = dist;  // 更新最小距离
                            }
                        }
                    }
                    result[i][j] = minDist;  // 记录结果
                }
            }
        }
    
        // 输出结果矩阵
        printf("[");
        for (int i = 0; i < rows; i++) {
            printf("[");
            for (int j = 0; j < cols; j++) {
                printf("%d", result[i][j]);
                if (j != cols - 1) {
                    printf(", ");
                }
            }
            printf("]");
            if (i != rows - 1) {
                printf(", ");
            }
        }
        printf("]\n");
    
        return 0;
    }
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

