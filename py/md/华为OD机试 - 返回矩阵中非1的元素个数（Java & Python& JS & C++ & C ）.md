## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

存在一个m*n的二维数组，其成员取值范围为0，1，2。

其中值为1的元素具备同化特性，每经过1S，将上下左右值为0的元素同化为1。

而值为2的元素，免疫同化。

将数组所有成员随机初始化为0或2，再将矩阵的[0, 0]元素修改成1，在经过足够长的时间后求矩阵中有多少个元素是0或2（即0和2数量之和）。

## 输入描述

输入的前两个数字是矩阵大小。后面是数字矩阵内容。

## 输出描述

返回矩阵中非1的元素个数。

## 示例1

输入

    
    
    4 4
    0 0 0 0
    0 2 2 2
    0 2 0 0
    0 2 0 0
    

输出

    
    
    4 4
    0 0 0 0
    0 2 2 2
    0 2 0 0
    0 2 0 0
    

说明

> 输入数字前两个数字是矩阵大小。后面的数字是矩阵内容。
>
> 起始位置(0,0)被修改为1后，最终只能同化矩阵为：
>
> 1 1 1 1
>
> 1 2 2 2
>
> 1 2 0 0
>
> 1 2 0 0
>
> 所以矩阵中非1的元素个数为9

## 解题思路

题目的要求是模拟一个在二维数组中进行的“同化”过程。

  1. **二维数组的初始化** ：

     * 给定一个大小为  m × n m \times n m×n 的二维数组，每个元素的取值范围为 `0`、`1` 或 `2`。
     * 值为 `1` 的元素表示同化源，会将相邻的 `0` 元素同化为 `1`。
     * 值为 `2` 的元素对同化免疫，无法被同化。
  2. **同化过程** ：

     * 从矩阵的左上角元素 `[0, 0]` 开始，将其设为 `1`，作为初始同化源。
     * 在接下来的每秒钟内，所有为 `1` 的元素会尝试同化它的上、下、左、右相邻的 `0` 元素，将其变为 `1`。
     * `2` 元素则不会被同化，也不会对周围元素产生影响。
  3. **目标** ：

     * 经过足够长时间的同化过程后，矩阵中会有一部分元素被同化成 `1`，无法被同化的 `0` 和 `2` 元素将保持原状。
     * 最后，计算矩阵中非 `1` 元素的个数（即 `0` 和 `2` 的数量）。

## Java

    
    
    import java.util.Scanner;
    
    public class MatrixAssimilationDFS {
      public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
    
        // 输入矩阵大小
        int rows = scanner.nextInt();
        int cols = scanner.nextInt();
    
        // 创建并初始化矩阵
        int[][] matrix = new int[rows][cols];
        for (int i = 0; i < rows; i++) {
          for (int j = 0; j < cols; j++) {
            matrix[i][j] = scanner.nextInt();
          }
        }
    
        // 使用 DFS 从 (0, 0) 开始同化区域
        matrix[0][0] = 1; // 将起始点设为 1
        int assimilatedCount = dfs(matrix, 0, 0, rows, cols);
    
        // 计算非 1 元素的个数
        int nonAssimilatedCount = rows * cols - assimilatedCount;
        System.out.println(nonAssimilatedCount);
      }
    
      // DFS 方法
      private static int dfs(int[][] matrix, int x, int y, int rows, int cols) {
        int count = 1; // 当前坐标已被同化为 1
    
        // 定义四个方向偏移量
        int[][] directions = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};
    
        for (int[] direction : directions) {
          int newX = x + direction[0];
          int newY = y + direction[1];
    
          // 检查新坐标是否在范围内并且值为 0
          if (isValid(newX, newY, rows, cols, matrix)) {
            matrix[newX][newY] = 1; // 同化新坐标
            count += dfs(matrix, newX, newY, rows, cols); // 递归同化相连区域
          }
        }
        return count;
      }
    
      // 辅助方法：检查坐标是否合法且矩阵值为 0
      private static boolean isValid(int x, int y, int rows, int cols, int[][] matrix) {
        return x >= 0 && x < rows && y >= 0 && y < cols && matrix[x][y] == 0;
      }
    }
    

## Python

    
    
    # 检查坐标是否合法且矩阵值为 0
    def is_valid(x, y, rows, cols, matrix):
        return 0 <= x < rows and 0 <= y < cols and matrix[x][y] == 0
    
    # DFS 方法
    def dfs(matrix, x, y, rows, cols):
        count = 1  # 当前坐标已被同化为 1
    
        # 定义四个方向偏移量
        directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]
    
        # 遍历四个方向
        for dx, dy in directions:
            new_x, new_y = x + dx, y + dy
    
            # 检查新坐标是否在范围内并且值为 0
            if is_valid(new_x, new_y, rows, cols, matrix):
                matrix[new_x][new_y] = 1  # 同化新坐标
                count += dfs(matrix, new_x, new_y, rows, cols)  # 递归同化相连区域
    
        return count
    
    # 主函数
    rows, cols = map(int, input().split())
    
    # 创建并初始化矩阵
    matrix = []
    for _ in range(rows):
        matrix.append(list(map(int, input().split())))
    
    matrix[0][0] = 1  # 将起始点设为 1
    assimilated_count = dfs(matrix, 0, 0, rows, cols)
    
    # 计算非 1 元素的个数
    non_assimilated_count = rows * cols - assimilated_count
    print(non_assimilated_count)
    

## JavaScript

    
    
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    let m = 0, n = 0;
    const matrix = [];
    
    // 检查坐标是否合法且矩阵值为 0
    function isValid(x, y, rows, cols, matrix) {
      return x >= 0 && x < rows && y >= 0 && y < cols && matrix[x][y] === 0;
    }
    
    // DFS 方法
    function dfs(matrix, x, y, rows, cols) {
      let count = 1; // 当前坐标已被同化为 1
    
      // 定义四个方向偏移量
      const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    
      // 遍历四个方向
      for (const [dx, dy] of directions) {
        const newX = x + dx;
        const newY = y + dy;
    
        // 检查新坐标是否在范围内并且值为 0
        if (isValid(newX, newY, rows, cols, matrix)) {
          matrix[newX][newY] = 1; // 同化新坐标
          count += dfs(matrix, newX, newY, rows, cols); // 递归同化相连区域
        }
      }
      return count;
    }
    
    // 逐行读取输入
    rl.on('line', (line) => {
      if (!m && !n) {
        // 第一行获取矩阵大小
        [m, n] = line.trim().split(' ').map(Number);
      } else if (matrix.length < m) {
        // 后续行填充矩阵
        matrix.push(line.split(' ').map(Number));
        if (matrix.length === m) {
          // 当矩阵填充完毕时，开始处理数据
          matrix[0][0] = 1; // 将起始点设为 1
          const assimilatedCount = dfs(matrix, 0, 0, m, n);
    
          // 计算非 1 元素的个数
          const nonAssimilatedCount = m * n - assimilatedCount;
          console.log(nonAssimilatedCount);
    
          // 关闭输入流
          rl.close();
        }
      }
    });
    

## C++

    
    
    #include <iostream>
    #include <vector>
    using namespace std;
    
    // 检查坐标是否合法且矩阵值为 0
    bool isValid(int x, int y, int rows, int cols, vector<vector<int>>& matrix) {
        return x >= 0 && x < rows && y >= 0 && y < cols && matrix[x][y] == 0;
    }
    
    // DFS 方法
    int dfs(vector<vector<int>>& matrix, int x, int y, int rows, int cols) {
        int count = 1; // 当前坐标已被同化为 1
    
        // 定义四个方向偏移量
        int directions[4][2] = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};
    
        // 遍历四个方向
        for (auto& direction : directions) {
            int newX = x + direction[0];
            int newY = y + direction[1];
    
            // 检查新坐标是否在范围内并且值为 0
            if (isValid(newX, newY, rows, cols, matrix)) {
                matrix[newX][newY] = 1; // 同化新坐标
                count += dfs(matrix, newX, newY, rows, cols); // 递归同化相连区域
            }
        }
        return count;
    }
    
    int main() {
        int rows, cols;
        // 输入矩阵大小
        cin >> rows >> cols;
    
        // 创建并初始化矩阵
        vector<vector<int>> matrix(rows, vector<int>(cols));
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                cin >> matrix[i][j];
            }
        }
    
        // 使用 DFS 从 (0, 0) 开始同化区域
        matrix[0][0] = 1; // 将起始点设为 1
        int assimilatedCount = dfs(matrix, 0, 0, rows, cols);
    
        // 计算非 1 元素的个数
        int nonAssimilatedCount = rows * cols - assimilatedCount;
        cout << nonAssimilatedCount << endl;
    
        return 0;
    }
    

## C语言

    
    
    #include <stdio.h>
    
    #define MAX_SIZE 100
    
    // 检查坐标是否合法且矩阵值为 0
    int isValid(int x, int y, int rows, int cols, int matrix[MAX_SIZE][MAX_SIZE]) {
        return x >= 0 && x < rows && y >= 0 && y < cols && matrix[x][y] == 0;
    }
    
    // DFS 方法
    int dfs(int matrix[MAX_SIZE][MAX_SIZE], int x, int y, int rows, int cols) {
        int count = 1; // 当前坐标已被同化为 1
    
        // 定义四个方向偏移量
        int directions[4][2] = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};
    
        // 遍历四个方向
        for (int i = 0; i < 4; i++) {
            int newX = x + directions[i][0];
            int newY = y + directions[i][1];
    
            // 检查新坐标是否在范围内并且值为 0
            if (isValid(newX, newY, rows, cols, matrix)) {
                matrix[newX][newY] = 1; // 同化新坐标
                count += dfs(matrix, newX, newY, rows, cols); // 递归同化相连区域
            }
        }
        return count;
    }
    
    int main() {
        int rows, cols;
        int matrix[MAX_SIZE][MAX_SIZE];
    
        // 输入矩阵大小
        scanf("%d %d", &rows, &cols);
    
        // 创建并初始化矩阵
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                scanf("%d", &matrix[i][j]);
            }
        }
    
        // 使用 DFS 从 (0, 0) 开始同化区域
        matrix[0][0] = 1; // 将起始点设为 1
        int assimilatedCount = dfs(matrix, 0, 0, rows, cols);
    
        // 计算非 1 元素的个数
        int nonAssimilatedCount = rows * cols - assimilatedCount;
        printf("%d\n", nonAssimilatedCount);
    
        return 0;
    }
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/4fec7c37c086de4a3dec65dec800fb2d.png)

