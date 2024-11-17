## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

给定一个N行M列的二维矩阵，矩阵中每个位置的数字取值为0或1。矩阵示例如：

    
    
    1 1 0 0 
    0 0 0 1 
    0 0 1 1 
    1 1 1 1
    

现需要将矩阵中所有的1进行反转为0，规则如下：

  * 当点击一个1时，该1便被反转为0，同时相邻的上、下、左、右，以及左上、左下、右上、右下8 个方向的1（如果存在1）均会自动反转为0；
  * 进一步地，一个位置上的1被反转为0时，与其相邻的8个方向的1（如果存在1）均会自动反转为0；

按照上述规则示例中的矩阵只最少需要点击2次后，所有值均为0。

请问，给定一个矩阵，最少需要点击几次后，所有数字均为0？

## 输入描述

第一行为两个整数，分别表示句子的行数 N 和列数 M，取值范围均为 [1, 100]

接下来 N 行表示矩阵的初始值，每行均为 M 个数，取值范围 [0, 1]

## 输出描述

输出一个整数，表示最少需要点击的次数

## 示例1

输入

    
    
    4 4
    1 1 0 0
    0 0 0 1
    0 0 1 1
    1 1 1 1
    

输出

    
    
    2
    

## 示例2

输入

    
    
    3 3
    1 0 1
    0 1 0
    1 0 1
    

输出

    
    
    1
    

说明

> 上述样例中，四个角上的 1 均在中间的 1 的相邻 8 个方向上，因此只需要点击一次即可

## 解题思路

本题的原型题：<https://leetcode.cn/problems/number-of-islands/description/>

给定一个二维矩阵，矩阵中的每个元素取值为0或1。题目要求我们通过点击矩阵中的1，将其反转为0，并且它周围8个方向上的1也会被自动反转为0，直到所有的1都被反转成0。我们需要找到最少点击次数，使得所有的1都变为0。

这个问题可以看作是一个**联通区域**
的统计问题。每次点击一个1，它不仅自身变为0，它所在的整个联通的1的区域（包括上下左右以及四个对角线上的方向）都会变为0。因此，求最少点击次数相当于求矩阵中有多少个**1的联通区域**
。

每个联通区域内的1可以通过一次点击全部变为0，因此我们只需找到有多少个这样的联通区域，就能得出最少的点击次数。

#### 示例分析：

##### 示例1：

    
    
    输入：
    4 4
    1 1 0 0
    0 0 0 1
    0 0 1 1
    1 1 1 1
    

  1. 第一次点击可以选中矩阵的左上角的1，覆盖该联通区域，第一行的两个1变为0。
  2. 第二次点击可以选择矩阵右下角的1，这个联通区域包括右下的所有1。

最终，只需点击两次就可以使所有的1变为0，输出为 `2`。

##### 示例2：

    
    
    输入：
    3 3
    1 0 1
    0 1 0
    1 0 1
    

这里四个角的1都相邻于中间的1，因此只需点击中间的1，四个角的1都会自动变为0。因此输出为 `1`。

## Java

    
    
    import java.util.Scanner;
    
    class Main {
        public static void main(String[] args) {
            // 处理输入
            Scanner in = new Scanner(System.in);
            int rows = in.nextInt(); // 输入矩阵的行数
            int cols = in.nextInt(); // 输入矩阵的列数
            int[][] matrix = new int[rows][cols]; // 定义一个rows行cols列的矩阵
            for (int i = 0; i < rows; i++) { // 遍历矩阵的每一行
                for (int j = 0; j < cols; j++) { // 遍历矩阵的每一列
                    matrix[i][j] = in.nextInt(); // 读入矩阵的每一个元素
                }
            }
    
            int result = 0; // 定义结果变量，表示矩阵中1的连通块数量
            for (int i = 0; i < rows; i++) { // 遍历矩阵的每一行
                for (int j = 0; j < cols; j++) { // 遍历矩阵的每一列
                    // 从任意一个位置的1开始遍历
                    if (matrix[i][j] == 1) { // 如果当前位置是1
                        result++; // 连通块数量加1
                        dfs(matrix, i, j); // 对以当前位置为起点的连通块进行深度优先遍历
                    }
                }
            }
            System.out.println(result); // 输出矩阵中1的连通块数量
        }
    
        public static void dfs(int[][] matrix, int x, int y) {
            matrix[x][y] = 0; // 将当前位置的值设为0，表示已经遍历过
            int rows = matrix.length; // 矩阵的行数
            int cols = matrix[0].length; // 矩阵的列数
            int[][] directions = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}, {-1, -1}, {-1, 1}, {1, -1}, {1, 1}}; // 定义8个方向的偏移量
            for (int[] dir : directions) { // 遍历8个方向
                int nextX = x + dir[0]; // 计算下一个位置的行坐标
                int nextY = y + dir[1]; // 计算下一个位置的列坐标
                if (nextX >= 0 && nextX < rows && nextY >= 0 && nextY < cols && matrix[nextX][nextY] == 1) { // 如果下一个位置在矩阵范围内且值为1
                    dfs(matrix, nextX, nextY); // 对下一个位置进行深度优先遍历
                }
            }
        }
    }
    

## Python

    
    
    def dfs(matrix, x, y):
        matrix[x][y] = 0 # 将当前位置的值设为0，表示已经遍历过
        rows, cols = len(matrix), len(matrix[0]) # 矩阵的行数和列数
        directions = [(-1, 0), (1, 0), (0, -1), (0, 1), (-1, -1), (-1, 1), (1, -1), (1, 1)] # 定义8个方向的偏移量
        for dir in directions: # 遍历8个方向
            nextX, nextY = x + dir[0], y + dir[1] # 计算下一个位置的行坐标和列坐标
            if 0 <= nextX < rows and 0 <= nextY < cols and matrix[nextX][nextY] == 1: # 如果下一个位置在矩阵范围内且值为1
                dfs(matrix, nextX, nextY) # 对下一个位置进行深度优先遍历
    rows, cols = map(int, input().split()) # 输入矩阵的行数和列数
    matrix = [] # 定义一个空列表存放矩阵
    for i in range(rows): # 遍历矩阵的每一行
        row = list(map(int, input().split())) # 读入矩阵的每一行
        matrix.append(row) # 将每一行添加到矩阵中
    
    result = 0 # 定义结果变量，表示矩阵中1的连通块数量
    for i in range(rows): # 遍历矩阵的每一行
        for j in range(cols): # 遍历矩阵的每一列
            # 从任意一个位置的1开始遍历
            if matrix[i][j] == 1: # 如果当前位置是1
                result += 1 # 连通块数量加1
                dfs(matrix, i, j) # 对以当前位置为起点的连通块进行深度优先遍历
    
    print(result) # 输出矩阵中1的连通块数量
    
    

## JavaScript

    
    
    function dfs(matrix, x, y) {
      matrix[x][y] = 0; // 将当前位置的值设为0，表示已经遍历过
      const rows = matrix.length;
      const cols = matrix[0].length; // 矩阵的行数和列数
      const directions = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
        [-1, -1],
        [-1, 1],
        [1, -1],
        [1, 1],
      ]; // 定义8个方向的偏移量
      for (let dir of directions) {
        // 遍历8个方向
        const nextX = x + dir[0];
        const nextY = y + dir[1]; // 计算下一个位置的行坐标和列坐标
        if (
          nextX >= 0 &&
          nextX < rows &&
          nextY >= 0 &&
          nextY < cols &&
          matrix[nextX][nextY] === 1
        ) {
          // 如果下一个位置在矩阵范围内且值为1
          dfs(matrix, nextX, nextY); // 对下一个位置进行深度优先遍历
        }
      }
    }
    
    const readline = require("readline");
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    
    let rows, cols;
    let matrix = []; // 定义一个空列表存放矩阵
    
    rl.on("line", (line) => {
      if (!rows && !cols) {
        [rows, cols] = line.split(" ").map(Number); // 输入矩阵的行数和列数
      } else {
        const row = line.split(" ").map(Number); // 读入矩阵的每一行
        matrix.push(row); // 将每一行添加到矩阵中
        if (matrix.length === rows) {
          let result = 0; // 定义结果变量，表示矩阵中1的连通块数量
          for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
              // 从任意一个位置的1开始遍历
              if (matrix[i][j] === 1) {
                // 如果当前位置是1
                result += 1; // 连通块数量加1
                dfs(matrix, i, j); // 对以当前位置为起点的连通块进行深度优先遍历
              }
            }
          }
          console.log(result); // 输出矩阵中1的连通块数量
          rl.close();
        }
      }
    });
    

## C++

    
    
    #include <iostream>
    #include <vector>
    using namespace std;
    
    void dfs(vector<vector<int>>& matrix, int x, int y) {
        matrix[x][y] = 0; // 将当前位置的值设为0，表示已经遍历过
        int rows = matrix.size(); // 矩阵的行数
        int cols = matrix[0].size(); // 矩阵的列数
        vector<vector<int>> directions = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}, {-1, -1}, {-1, 1}, {1, -1}, {1, 1}}; // 定义8个方向的偏移量
        for (auto dir : directions) { // 遍历8个方向
            int nextX = x + dir[0]; // 计算下一个位置的行坐标
            int nextY = y + dir[1]; // 计算下一个位置的列坐标
            if (nextX >= 0 && nextX < rows && nextY >= 0 && nextY < cols && matrix[nextX][nextY] == 1) { // 如果下一个位置在矩阵范围内且值为1
                dfs(matrix, nextX, nextY); // 对下一个位置进行深度优先遍历
            }
        }
    }
    
    int main() {
        // 处理输入
        int rows, cols;
        cin >> rows >> cols; // 输入矩阵的行数和列数
        vector<vector<int>> matrix(rows, vector<int>(cols)); // 定义一个rows行cols列的矩阵
        for (int i = 0; i < rows; i++) { // 遍历矩阵的每一行
            for (int j = 0; j < cols; j++) { // 遍历矩阵的每一列
                cin >> matrix[i][j]; // 读入矩阵的每一个元素
            }
        }
    
        int result = 0; // 定义结果变量，表示矩阵中1的连通块数量
        for (int i = 0; i < rows; i++) { // 遍历矩阵的每一行
            for (int j = 0; j < cols; j++) { // 遍历矩阵的每一列
                // 从任意一个位置的1开始遍历
                if (matrix[i][j] == 1) { // 如果当前位置是1
                    result++; // 连通块数量加1
                    dfs(matrix, i, j); // 对以当前位置为起点的连通块进行深度优先遍历
                }
            }
        }
        cout << result << endl; // 输出矩阵中1的连通块数量
        return 0;
    }
    

## C语言

    
    
    #include <stdio.h>
    #include <string.h>
    
    #define MAXN 100
    
    int matrix[MAXN][MAXN];
    int rows, cols;
    
    // 8个方向的移动向量
    int directions[8][2] = {
        {-1, 0}, {1, 0}, {0, -1}, {0, 1}, 
        {-1, -1}, {-1, 1}, {1, -1}, {1, 1}
    };
    
    // 深度优先搜索
    void dfs(int x, int y) {
        // 将当前位置的值设为0，表示已经遍历过
        matrix[x][y] = 0;
    
        // 遍历8个方向
        for (int i = 0; i < 8; i++) {
            int nextX = x + directions[i][0];
            int nextY = y + directions[i][1];
    
            // 判断下一个位置是否在矩阵范围内且值为1
            if (nextX >= 0 && nextX < rows && nextY >= 0 && nextY < cols && matrix[nextX][nextY] == 1) {
                dfs(nextX, nextY);
            }
        }
    }
    
    int main() {
        // 处理输入
        scanf("%d %d", &rows, &cols);
    
        // 读入矩阵的每一个元素
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                scanf("%d", &matrix[i][j]);
            }
        }
    
        int result = 0; // 定义结果变量，表示矩阵中1的连通块数量
    
        // 遍历矩阵的每一个元素
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                // 从任意一个位置的1开始遍历
                if (matrix[i][j] == 1) {
                    result++; // 连通块数量加1
                    dfs(i, j); // 对以当前位置为起点的连通块进行深度优先遍历
                }
            }
        }
    
        // 输出结果
        printf("%d\n", result);
        
        return 0;
    }
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/254ee5f4b850147bfd12895ab6a35090.png)

