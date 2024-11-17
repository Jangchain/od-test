## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

## 输入描述

## 输出描述

## 示例1

输入

    
    
    

输出

    
    
    

说明

> ## 示例2

输入

    
    
    

输出

    
    
    

## 示例3

输入

    
    
    

输出

    
    
    

说明

> ## 解题思路

题目的目标是找到一个二维整数矩阵中的“和最大子矩阵”，即在这个矩阵中找到一个相互连续的矩形区域，使该区域内所有数字的和最大。

#### 题目理解

  1. **矩阵的输入格式** ：

     * 第一行有两个整数 ( n ) 和 ( m )，表示矩阵的行数和列数。
     * 接下来 ( n ) 行，每行有 ( m ) 个整数，表示矩阵的具体数值。
  2. **子矩阵的定义** ：

     * 子矩阵是原矩阵中相互连续的矩形区域，可以包含任意数量的行和列，只要这些行列是相邻的即可。
     * 目标是找到一个子矩阵，使其内部的元素和最大。
  3. **输出** ：

     * 输出一行一个整数，表示和最大的子矩阵内元素之和。

#### 输入输出示例

  * 输入：
    
        3 4
    -3 5 -1 5
    2 4 -2 4
    -1 3 -1 3
    

  * 输出：
    
        20
    

  * 解释： 
    * 在这个例子中，选择后面三列的一个子矩阵，其和为 20，是该矩阵中元素和最大的子矩阵。

#### 解题思路

  1. **暴力方法** ：

     * 遍历所有可能的子矩阵，计算每个子矩阵的和并比较，找到和最大的子矩阵。
     * 由于 ( n ) 和 ( m ) 都较小（最多为 10），暴力解法是可行的。
  2. **优化方法（前缀和 + 动态规划）** ：

     * 使用前缀和优化子矩阵的求和过程，以减少重复计算。
     * 使用类似“最大子数组和”的算法在二维情况下求解。

## Java

    
    
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            Scanner sc = new Scanner(System.in);
            
            // 读取矩阵的行数和列数
            int rows = sc.nextInt();
            int cols = sc.nextInt();
            
            // 初始化一个二维数组来存储矩阵的元素
            int[][] matrix = new int[rows][cols];
    
            // 读入矩阵的每个元素
            for (int i = 0; i < rows; i++) {
                for (int j = 0; j < cols; j++) {
                    matrix[i][j] = sc.nextInt();
                }
            }
    
            // 初始化最大子矩阵和为最小整数值，确保能够正确比较和更新
            int maxSum = Integer.MIN_VALUE;
    
            // 枚举子矩阵的上边界
            for (int top = 0; top < rows; top++) {
                // 初始化每列的累积和数组
                int[] colSum = new int[cols]; // colSum[k]表示从top行到bottom行的第k列的和
    
                // 枚举子矩阵的下边界
                for (int bottom = top; bottom < rows; bottom++) {
                    // 累加每列的和，更新colSum数组
                    for (int col = 0; col < cols; col++) {
                        colSum[col] += matrix[bottom][col];
                    }
    
                    // 使用 Kadane's 算法在一维数组 colSum 中寻找最大子数组和
                    int maxSubSum = Integer.MIN_VALUE; // 存储当前最大子数组和
                    int curSum = 0; // 当前子数组的和
    
                    // 遍历 colSum 数组，求取最大子数组和
                    for (int num : colSum) {
                        curSum = Math.max(curSum + num, num); // 更新当前子数组的和
                        maxSubSum = Math.max(maxSubSum, curSum); // 更新最大子数组和
                    }
    
                    // 更新最大子矩阵和
                    maxSum = Math.max(maxSum, maxSubSum);
                }
            }
    
            // 输出最大子矩阵和
            System.out.println(maxSum);
        }
    }
    

## Python

    
    
    # 导入标准输入模块
    import sys
    
    # 读取矩阵的行数和列数
    rows , cols = map(int, input().split())
    
    # 初始化一个二维数组来存储矩阵的元素
    matrix = []
    for _ in range(rows):
        # 每行从输入读取并转换为整数列表
        matrix.append(list(map(int, input().split())))
    
    # 初始化最大子矩阵和为一个非常小的值
    max_sum = float('-inf')
    
    # 枚举子矩阵的上边界
    for top in range(rows):
        # 初始化每列的累积和数组
        col_sum = [0] * cols  # col_sum[k] 表示从 top 行到 bottom 行第 k 列的和
        
        # 枚举子矩阵的下边界
        for bottom in range(top, rows):
            # 累加每列的和，更新 col_sum 数组
            for col in range(cols):
                col_sum[col] += matrix[bottom][col]
            
            # 使用 Kadane's 算法在 col_sum 中寻找最大子数组和
            max_sub_sum = float('-inf')  # 当前最大子数组和
            cur_sum = 0  # 当前子数组的和
            
            # 遍历 col_sum 数组，求取最大子数组和
            for num in col_sum:
                cur_sum = max(cur_sum + num, num)  # 更新当前子数组的和
                max_sub_sum = max(max_sub_sum, cur_sum)  # 更新最大子数组和
            
            # 更新最大子矩阵和
            max_sum = max(max_sum, max_sub_sum)
    
    # 输出最大子矩阵和
    print(max_sum)
    

## JavaScript

    
    
    // 导入 readline 模块以便从标准输入读取数据
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    let inputLines = [];
    let rows, cols;
    
    // 从标准输入读取所有行
    rl.on('line', (line) => {
        inputLines.push(line.trim());
    }).on('close', () => {
        // 读取矩阵的行数和列数
        [rows, cols] = inputLines[0].split(' ').map(Number);
    
        // 初始化一个二维数组来存储矩阵的元素
        let matrix = [];
        for (let i = 1; i <= rows; i++) {
            matrix.push(inputLines[i].split(' ').map(Number));
        }
    
        // 初始化最大子矩阵和为最小的整数值
        let maxSum = -Infinity;
    
        // 枚举子矩阵的上边界
        for (let top = 0; top < rows; top++) {
            // 初始化每列的累积和数组
            let colSum = new Array(cols).fill(0);
    
            // 枚举子矩阵的下边界
            for (let bottom = top; bottom < rows; bottom++) {
                // 累加每列的和，更新 colSum 数组
                for (let col = 0; col < cols; col++) {
                    colSum[col] += matrix[bottom][col];
                }
    
                // 使用 Kadane's 算法在 colSum 中寻找最大子数组和
                let maxSubSum = -Infinity;
                let curSum = 0;
    
                // 遍历 colSum 数组，求取最大子数组和
                for (let num of colSum) {
                    curSum = Math.max(curSum + num, num);
                    maxSubSum = Math.max(maxSubSum, curSum);
                }
    
                // 更新最大子矩阵和
                maxSum = Math.max(maxSum, maxSubSum);
            }
        }
    
        // 输出最大子矩阵和
        console.log(maxSum);
    });
    

## C++

    
    
    #include <iostream>
    #include <vector>
    #include <climits>
    
    using namespace std;
    
    int main() {
        int rows, cols;
        cin >> rows >> cols;
    
        // 初始化一个二维数组来存储矩阵的元素
        vector<vector<int>> matrix(rows, vector<int>(cols));
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                cin >> matrix[i][j];
            }
        }
    
        // 初始化最大子矩阵和为最小整数值
        int maxSum = INT_MIN;
    
        // 枚举子矩阵的上边界
        for (int top = 0; top < rows; top++) {
            // 初始化每列的累积和数组
            vector<int> colSum(cols, 0);
    
            // 枚举子矩阵的下边界
            for (int bottom = top; bottom < rows; bottom++) {
                // 累加每列的和，更新 colSum 数组
                for (int col = 0; col < cols; col++) {
                    colSum[col] += matrix[bottom][col];
                }
    
                // 使用 Kadane's 算法在 colSum 中寻找最大子数组和
                int maxSubSum = INT_MIN, curSum = 0;
    
                // 遍历 colSum 数组，求取最大子数组和
                for (int num : colSum) {
                    curSum = max(curSum + num, num);
                    maxSubSum = max(maxSubSum, curSum);
                }
    
                // 更新最大子矩阵和
                maxSum = max(maxSum, maxSubSum);
            }
        }
    
        // 输出最大子矩阵和
        cout << maxSum << endl;
        return 0;
    }
    

## C语言

    
    
    #include <stdio.h>
    #include <limits.h>
    
    int main() {
        int rows, cols;
        scanf("%d %d", &rows, &cols);
    
        // 初始化一个二维数组来存储矩阵的元素
        int matrix[rows][cols];
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                scanf("%d", &matrix[i][j]);
            }
        }
    
        // 初始化最大子矩阵和为最小整数值
        int maxSum = INT_MIN;
    
        // 枚举子矩阵的上边界
        for (int top = 0; top < rows; top++) {
            // 初始化每列的累积和数组
            int colSum[cols];
            for (int i = 0; i < cols; i++) colSum[i] = 0;
    
            // 枚举子矩阵的下边界
            for (int bottom = top; bottom < rows; bottom++) {
                // 累加每列的和，更新 colSum 数组
                for (int col = 0; col < cols; col++) {
                    colSum[col] += matrix[bottom][col];
                }
    
                // 使用 Kadane's 算法在 colSum 中寻找最大子数组和
                int maxSubSum = INT_MIN, curSum = 0;
    
                // 遍历 colSum 数组，求取最大子数组和
                for (int i = 0; i < cols; i++) {
                    curSum = (curSum + colSum[i] > colSum[i]) ? curSum + colSum[i] : colSum[i];
                    maxSubSum = (maxSubSum > curSum) ? maxSubSum : curSum;
                }
    
                // 更新最大子矩阵和
                maxSum = (maxSum > maxSubSum) ? maxSum : maxSubSum;
            }
        }
    
        // 输出最大子矩阵和
        printf("%d\n", maxSum);
        return 0;
    }
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/cb1dca93e30e7f859d2cd6d6684ee8e9.png)

#### 完整用例

##### 用例1

    
    
    3 4
    -3 5 -1 5
    2 4 -2 4
    -1 3 -1 3
    

##### 用例2

    
    
    3 3
    1 2 3
    4 5 6
    7 8 9
    

##### 用例3

    
    
    2 2
    -1 -2
    -3 -4
    

##### 用例4

    
    
    4 4
    1 2 3 4
    5 6 7 8
    9 10 11 12
    13 14 15 16
    

##### 用例5

    
    
    2 3
    -1 2 -3
    4 -5 6
    

##### 用例6

    
    
    5 5
    1 2 -3 4 5
    -6 7 8 -9 10
    11 -12 13 14 -15
    16 17 18 -19 20
    -21 22 23 24 25
    

##### 用例7

    
    
    3 4
    -1 -2 -3 -4
    -5 -6 -7 -8
    -9 -10 -11 -12
    

##### 用例8

    
    
    3 3
    -1 -2 -3
    -4 -5 -6
    -7 -8 -9
    

##### 用例9

    
    
    4 4
    -1 -2 1 -4
    -5 -6 7 -8
    -9 -10 11 -12
    -13 -14 15 -16
    

##### 用例10

    
    
    2 2
    1 -2
    -3 4
    

