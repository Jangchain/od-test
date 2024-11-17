## 题目描述

从一个 N * M（N ≤ M）的矩阵中选出 N 个数，任意两个数字不能在同一行或同一列，求选出来的 N 个数中第 K 大的数字的最小值是多少。

## 输入描述

输入矩阵要求：1 ≤ K ≤ N ≤ M ≤ 150

输入格式：

> N M K
>
> N*M矩阵

## 输出描述

N*M 的矩阵中可以选出 M! / N! 种组合数组，每个组合数组种第 K 大的数中的最小值。无需考虑重复数字，直接取字典排序结果即可。

注意：结果是第 K 大的数字的最小值

## 用例

输入

    
    
    3 4 2
    1 5 6 6
    8 3 4 3
    6 8 6 3
    

输出

    
    
    3
    

> N*M的矩阵中可以选出 M！/ N！种组合数组，每个组合数组种第 K 大的数中的最小值；  
>  上述输入中选出数组组合为：  
>  1,3,6;  
>  1,3,3;  
>  1,4,8;  
>  1,4,3;  
>  …  
>  上述输入样例中选出的组合数组有24种，最小数组为1,3,3，则第2大的最小值为3

## 解题思路

## C++

    
    
    #include <iostream>
    #include <vector>
    #include <algorithm>
    #include <climits>
    using namespace std;
    
    int n, m, k;  // n、m、k 分别表示矩阵的行数、列数和要求的第K大数
    vector<vector<int>> matrix;  // matrix 用于存储输入的矩阵
    vector<int> match;  // match 数组用于存储匹配信息，match[j] = i 表示第j列与第i行匹配
    vector<bool> vis;  // vis 数组用于标记每一列在当前增广路中是否被访问过
    
    // 深度优先搜索寻找增广路径
    bool dfs(int i, int currentVal) {
        for (int j = 0; j < m; j++) {
            // 检查列j是否未被访问过且第i行第j列的值小于等于currentVal
            if (!vis[j] && matrix[i][j] <= currentVal) {
                vis[j] = true;  // 标记列j为已访问
                // 如果列j未匹配或者列j的匹配行可以匹配到其他列
                if (match[j] == -1 || dfs(match[j], currentVal)) {
                    match[j] = i;  // 将列j与行i匹配
                    return true;  // 找到增广路径
                }
            }
        }
        return false;  // 没有找到增广路径
    }
    
    // 检查当前值是否满足条件
    bool check(int currentVal) {
        match.assign(m, -1);  // 初始化匹配数组
        vis.assign(m, false);  // 初始化访问标记数组
        int smallerCount = 0;  // 统计满足条件的数量
        for (int i = 0; i < n; i++) {
            fill(vis.begin(), vis.end(), false);  // 每次搜索前重置访问标记
            if (dfs(i, currentVal)) {
                smallerCount++;  // 如果找到增广路径，则计数增加
            }
        }
        return smallerCount >= n - k + 1;  // 检查是否有足够的小于等于currentVal的数
    }
    
    int main() {
        cin >> n >> m >> k;  // 读取行数、列数和k值
    
        int min = 1, maxT = INT_MIN;  // 初始化二分查找的上下界
        matrix.assign(n, vector<int>(m));  // 初始化矩阵
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                cin >> matrix[i][j];  // 读取矩阵元素
                maxT = max(maxT, matrix[i][j]);  // 更新矩阵元素的最大值，作为二分查找的上界
            }
        }
    
        // 二分查找确定第K大的数的最小可能值
        while (min <= maxT) {
            int mid = (min + maxT) / 2;  // 取中间值
            if (check(mid)) {
                maxT = mid - 1;  // 如果当前中间值满足条件，则尝试寻找更小的值
            } else {
                min = mid + 1;  // 如果不满足条件，则尝试寻找更大的值
            }
        }
        cout << min << endl;  // 输出最终结果
        return 0;
    }
    

## Java

    
    
    import java.util.Arrays;
    import java.util.Scanner;
    
    public class Main {
        static int n, m, k;  // n、m、k 分别表示矩阵的行数、列数和要求的第K大数
        static int[][] matrix;  // matrix 用于存储输入的矩阵
        static int[] match;  // match 数组用于存储匹配信息，match[j] = i 表示第j列与第i行匹配
        static boolean[] vis;  // vis 数组用于标记每一列在当前增广路中是否被访问过
    
        public static void main(String[] args) {
            Scanner sc = new Scanner(System.in);
            n = sc.nextInt();  // 读取行数
            m = sc.nextInt();  // 读取列数
            k = sc.nextInt();  // 读取k值
    
            int min = 1, max = Integer.MIN_VALUE;  // 初始化二分查找的上下界
            matrix = new int[n][m];  // 初始化矩阵
            for (int i = 0; i < n; i++) {
                for (int j = 0; j < m; j++) {
                    matrix[i][j] = sc.nextInt();  // 读取矩阵元素
                    max = Math.max(max, matrix[i][j]);  // 更新矩阵元素的最大值，作为二分查找的上界
                }
            }
    
            // 二分查找确定第K大的数的最小可能值
            while (min <= max) {
                int mid = (min + max) / 2;  // 取中间值
                if (check(mid)) {
                    max = mid - 1;  // 如果当前中间值满足条件，则尝试寻找更小的值
                } else {
                    min = mid + 1;  // 如果不满足条件，则尝试寻找更大的值
                }
            }
            System.out.println(min);  // 输出最终结果
        }
    
        // 检查当前值是否满足条件
        public static boolean check(int currentVal) {
            match = new int[m];  // 初始化匹配数组
            Arrays.fill(match, -1);  // 将所有列初始化为未匹配状态
            vis = new boolean[m];  // 初始化访问标记数组
            int smallerCount = 0;  // 统计满足条件的数量
            for (int i = 0; i < n; i++) {
                Arrays.fill(vis, false);  // 每次搜索前重置访问标记
                if (dfs(i, currentVal)) {
                    smallerCount++;  // 如果找到增广路径，则计数增加
                }
            }
            return smallerCount >= n - k + 1;  // 检查是否有足够的小于等于currentVal的数
        }
    
        // 深度优先搜索寻找增广路径
        public static boolean dfs(int i, int currentVal) {
            for (int j = 0; j < m; j++) {
                // 检查列j是否未被访问过且第i行第j列的值小于等于currentVal
                if (!vis[j] && matrix[i][j] <= currentVal) {
                    vis[j] = true;  // 标记列j为已访问
                    // 如果列j未匹配或者列j的匹配行可以匹配到其他列
                    if (match[j] == -1 || dfs(match[j], currentVal)) {
                        match[j] = i;  // 将列j与行i匹配
                        return true;  // 找到增广路径
                    }
                }
            }
            return false;  // 没有找到增广路径
        }
    }
    

## javaScript

    
    
    const readline = require('readline');
    
    // 创建 readline 接口实例
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    let n, m, k;
    let matrix = [];
    let match, vis;
    
    // 深度优先搜索寻找增广路径
    const dfs = (i, currentVal) => {
        for (let j = 0; j < m; j++) {
            if (!vis[j] && matrix[i][j] <= currentVal) {
                vis[j] = true;  // 标记第j列为已访问
                if (match[j] === -1 || dfs(match[j], currentVal)) {
                    match[j] = i;  // 将第j列与第i行匹配
                    return true;
                }
            }
        }
        return false;
    };
    
    // 检查当前值是否满足条件
    const check = (currentVal) => {
        match = Array(m).fill(-1);  // 初始化匹配数组
        let smallerCount = 0;  // 统计满足条件的数量
    
        for (let i = 0; i < n; i++) {
            vis = Array(m).fill(false);  // 每次搜索前重置访问标记
            if (dfs(i, currentVal)) {
                smallerCount++;  // 如果找到增广路径，则计数增加
            }
        }
    
        return smallerCount >= n - k + 1;
    };
    
    // 从标准输入读取数据
    rl.on('line', (line) => {
        if (!n) {
            [n, m, k] = line.split(' ').map(Number);
        } else {
            matrix.push(line.split(' ').map(Number));
            if (matrix.length === n) {
                rl.close();
            }
        }
    }).on('close', () => {
        // 初始化二分查找的上下界
        let minVal = 1, maxVal = -Number.MAX_SAFE_INTEGER;
        
        // 更新矩阵元素的最大值
        matrix.forEach(row => {
            maxVal = Math.max(maxVal, ...row);
        });
    
        // 二分查找确定第K大的数的最小可能值
        while (minVal <= maxVal) {
            let mid = Math.floor((minVal + maxVal) / 2);
            if (check(mid)) {
                maxVal = mid - 1;
            } else {
                minVal = mid + 1;
            }
        }
    
        // 输出最终结果
        console.log(minVal);
    });
    

## Python

    
    
    import sys
    
    def dfs(i, current_val):
        """
        深度优先搜索寻找增广路径
        :param i: 当前正在处理的行索引
        :param current_val: 当前考虑的值
        :return: 如果找到增广路径，返回True；否则返回False
        """
        for j in range(m):
            # 检查第j列是否未被访问过且第i行第j列的值小于等于current_val
            if not vis[j] and matrix[i][j] <= current_val:
                vis[j] = True  # 标记第j列为已访问
                # 如果第j列未匹配或其匹配的行可以找到其他匹配列
                if match[j] == -1 or dfs(match[j], current_val):
                    match[j] = i  # 将第j列与第i行匹配
                    return True
        return False
    
    def check(current_val):
        """
        检查当前值是否满足条件
        :param current_val: 当前考虑的值
        :return: 如果满足条件，返回True；否则返回False
        """
        global match, vis
        match = [-1] * m  # 初始化匹配数组，所有列都标记为未匹配
        vis = [False] * m  # 初始化访问标记数组
        smaller_count = 0  # 统计满足条件的数量
    
        for i in range(n):
            vis = [False] * m  # 每次搜索前重置访问标记
            if dfs(i, current_val):
                smaller_count += 1  # 如果找到增广路径，则计数增加
    
        return smaller_count >= n - k + 1  # 检查是否有足够的小于等于current_val的数
    
    # 读取输入
    n, m, k = map(int, input().split())  # 读取行数、列数和k值
    
    # 初始化矩阵
    matrix = []
    for _ in range(n):
        matrix.append(list(map(int, input().split())))
    
    # 初始化二分查找的上下界
    min_val, max_val = 1, -sys.maxsize
    
    # 更新矩阵元素的最大值，作为二分查找的上界
    for row in matrix:
        max_val = max(max_val, max(row))
    
    # 二分查找确定第K大的数的最小可能值
    while min_val <= max_val:
        mid = (min_val + max_val) // 2
        if check(mid):
            max_val = mid - 1
        else:
            min_val = mid + 1
    
    # 输出最终结果
    print(min_val)
    

## C语言

    
    
    #include <stdio.h>
    #include <stdbool.h>
    #include <limits.h>
    
    #define MAX_N 200  
    #define MAX_M 200  
    
    int n, m, k;  // n、m、k 分别表示矩阵的行数、列数和要求的第K大数
    int matrix[MAX_N][MAX_M];  // matrix 用于存储输入的矩阵
    int match[MAX_M];  // match 数组用于存储匹配信息
    bool vis[MAX_M];  // vis 数组用于标记每一列在当前增广路中是否被访问过
    
    bool dfs(int i, int current_val) {
        for (int j = 0; j < m; j++) {
            if (!vis[j] && matrix[i][j] <= current_val) {
                vis[j] = true;
                if (match[j] == -1 || dfs(match[j], current_val)) {
                    match[j] = i;
                    return true;
                }
            }
        }
        return false;
    }
    
    bool check(int current_val) {
        for (int j = 0; j < m; j++) {
            match[j] = -1;  // 初始化匹配数组
        }
    
        int smaller_count = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                vis[j] = false;  // 初始化访问标记数组
            }
            if (dfs(i, current_val)) {
                smaller_count++;
            }
        }
        return smaller_count >= n - k + 1;
    }
    
    int main() {
        scanf("%d %d %d", &n, &m, &k);  // 读取行数、列数和k值
    
        // 初始化矩阵
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                scanf("%d", &matrix[i][j]);
            }
        }
    
        // 初始化二分查找的上下界
        int min_val = 1, max_val = INT_MIN;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (matrix[i][j] > max_val) {
                    max_val = matrix[i][j];  // 更新矩阵元素的最大值
                }
            }
        }
    
        // 二分查找确定第K大的数的最小可能值
        while (min_val <= max_val) {
            int mid = (min_val + max_val) / 2;
            if (check(mid)) {
                max_val = mid - 1;
            } else {
                min_val = mid + 1;
            }
        }
    
        // 输出最终结果
        printf("%d\n", min_val);
    
        return 0;
    }
    

## 完整用例

### 用例1

    
    
    3 3 1
    1 2 3
    4 5 6
    7 8 9
    

### 用例2

    
    
    4 5 2
    10 10 10 10 10
    20 20 20 20 20
    30 30 30 30 30
    40 40 40 40 40
    

### 用例3

    
    
    10 12 10
    100 101 102 103 104 105 106 107 108 109 110 111
    200 201 202 203 204 205 206 207 208 209 210 211
    300 301 302 303 304 305 306 307 308 309 310 311
    400 401 402 403 404 405 406 407 408 409 410 411
    500 501 502 503 504 505 506 507 508 509 510 511
    600 601 602 603 604 605 606 607 608 609 610 611
    700 701 702 703 704 705 706 707 708 709 710 711
    800 801 802 803 804 805 806 807 808 809 810 811
    900 901 902 903 904 905 906 907 908 909 910 911
    1000 1001 1002 1003 1004 1005 1006 1007 1008 1009 1010 1011
    

### 用例4

    
    
    9 11 9
    1 2 3 4 5 6 7 8 9 10 11
    12 13 14 15 16 17 18 19 20 21 22
    23 24 25 26 27 28 29 30 31 32 33
    34 35 36 37 38 39 40 41 42 43 44
    45 46 47 48 49 50 51 52 53 54 55
    56 57 58 59 60 61 62 63 64 65 66
    67 68 69 70 71 72 73 74 75 76 77
    78 79 80 81 82 83 84 85 86 87 88
    89 90 91 92 93 94 95 96 97 98 99
    

### 用例5

    
    
    5 7 3
    1 1 1 1 1 1 1
    2 2 2 2 2 2 2
    3 3 3 3 3 3 3
    4 4 4 4 4 4 4
    5 5 5 5 5 5 5
    

### 用例6

    
    
    2 5 1
    1 3 5 7 9
    2 4 6 8 10
    

### 用例7

    
    
    8 10 8
    100 90 80 70 60 50 40 30 20 10
    110 100 90 80 70 60 50 40 30 20
    120 110 100 90 80 70 60 50 40 30
    130 120 110 100 90 80 70 60 50 40
    140 130 120 110 100 90 80 70 60 50
    150 140 130 120 110 100 90 80 70 60
    160 150 140 130 120 110 100 90 80 70
    170 160 150 140 130 120 110 100 90 80
    

### 用例8

    
    
    5 8 2
    5 7 5 4 3 2 9 4
    8 4 7 6 4 9 9 9
    6 1 1 5 6 1 3 4
    2 7 8 7 9 2 5 6
    6 7 2 5 2 2 3 7
    

### 用例9

    
    
    7 8 3
    6 7 6 7 3 6 7 5
    5 4 3 3 3 9 9 4
    5 3 4 7 1 7 6 6
    3 3 9 1 8 2 2 5
    8 4 2 2 1 9 8 6
    6 9 4 2 5 6 1 7
    5 5 7 7 1 1 8 1
    

### 用例10

    
    
    4 6 1
    2 8 1 7 8 9
    2 2 6 8 3 7
    9 4 4 6 9 5
    1 6 5 1 1 6
    

![fengmian](https://i-blog.csdnimg.cn/blog_migrate/abbca76e53b80ec78908ec95f87fd1a9.png)

