## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

现在有n个容器服务，服务的启动可能有一定的依赖性（有些服务启动没有依赖），其次服务自身启动加载会消耗一些时间。

给你一个 n x n 的二维矩阵useTime，其中

  * useTime[i][i]=10 表示服务i自身启动加载需要消耗10s
  * useTime[i][j] = 1 表示服务i启动依赖服务j启动完成
  * useTime[i][k]=0 表示服务i启动不依赖服务k

其实 0<= i，j，k < n。

服务之间启动没有循环依赖（不会出现环），若想对任意一个服务i进行集成测试（服务i自身也需要加载），求最少需要等待多少时间。

## 输入描述

第一行输入服务总量 n，  
之后的 n 行表示服务启动的依赖关系以及自身启动加载耗时  
最后输入 k 表示计算需要等待多少时间后可以对服务 k 进行集成测试

其中 1 <= k <=n，1<=n<=100

## 输出描述

最少需要等待多少时间(s)后可以对服务 k 进行集成测试

## 示例1

输入

    
    
    3
    5 0 0
    1 5 0
    0 1 5
    3
    

输出

    
    
    服务3启动依赖服务2，服务2启动依赖服务1，由于服务1，2，3自身加载需要消耗5s，所以5+5+5=15，需要等待15s后可以对服务3进行集成测试
    

说明

> 连续键入3个a，故屏幕上字母的长度为3。

## 示例2

输入

    
    
    3
    5 0 0
    1 10 1
    1 0 11
    2
    

输出

    
    
    26
    

说明

>
> 务2启动依赖服务1和服务3，服务3启动需要依赖服务1，服务1，2，3自身加载需要消耗5s，10s，11s，所以5+10+11=26s，需要等待26s后可以对服务2进行集成测试。

## 示例3

输入

    
    
    4
    2 0 0 0
    0 3 0 0
    1 1 4 0
    1 1 1 5
    4
    

输出

    
    
    12
    

说明

>
> 服务3启动依赖服务1和服务2，服务4启动需要依赖服务1，2，3，服务1，2，3自身加载需要消耗2s,3s,4s,5s，所以3+4+5=12s（因为服务1和服务2可以同时启动），要等待12s后可以对服务4进行集成测试。

## 示例4

输入

    
    
    5
    1 0 0 0 0
    0 2 0 0 0
    1 1 3 0 0
    1 1 0 4 0
    0 0 1 1 5
    5
    

输出

    
    
    11
    

说明

>
> 服务3启动依赖服务1和服务2，服务4启动需要依赖服务1，2，服务5启动需要依赖服务3，5，服务1，2，3，4，5自身加载需要消耗1s,2s,3s,4s,5s，所以2+4+5=11s（因为服务1和服务2可以同时启动，服务3和服务4可以同时启动），要等待11s后可以对服务5进行集成测试。

## 解题思路

#### 题意解析

  1. **服务的启动耗时** ：

     * 给定一个 `n x n` 的矩阵 `useTime`，表示各服务的启动耗时和依赖关系： 
       * `useTime[i][i]` 表示服务 `i` 自身的启动耗时，比如 `useTime[1][1] = 10` 表示服务 `1` 启动自身耗时 `10s`。
       * `useTime[i][j] = 1` 表示服务 `i` 的启动依赖于服务 `j` 先启动。
       * `useTime[i][k] = 0` 表示服务 `i` 启动不依赖服务 `k`。
  2. **无循环依赖** ：

     * 各服务之间的依赖关系是无环的，即不会出现服务启动循环依赖的情况。这意味着依赖关系是一个有向无环图（DAG）。
  3. **计算目标** ：

     * 最终需要计算：若希望对服务 `k` 进行集成测试（包括其自身启动），则最少需要等待多少时间才能完成所有依赖的启动过程。

#### 解题思路

  1. **动态规划或递归计算最短等待时间** ：

     * 使用动态规划或者深度优先搜索（DFS）递归计算每个服务启动的最短时间。对于每个服务 `i`，其启动时间为自身启动耗时加上所有依赖服务完成启动所需的时间的最大值（因为依赖服务可以并行启动）。
  2. **计算示例** ：

     * 比如，若服务 `k` 依赖服务 `j`，而 `j` 依赖 `i`，则 `k` 的启动时间为 `k` 的自身启动时间 + `j` 的启动时间（包含其依赖） + `i` 的启动时间。

## Java

    
    
    import java.util.Arrays;
    import java.util.Scanner;
    
    public class Main {
        static int[] cache; // 缓存每个服务所需的时间
    
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            int n = Integer.parseInt(scanner.nextLine().trim()); // 服务数量
    
            cache = new int[n];
            Arrays.fill(cache, -1); // 初始化缓存
    
            int[][] matrix = new int[n][n];
    
            // 使用 split 方法读取矩阵数据
            for (int i = 0; i < n; i++) {
                String[] line = scanner.nextLine().split(" ");
                for (int j = 0; j < n; j++) {
                    matrix[i][j] = Integer.parseInt(line[j]);
                }
            }
    
            int k = Integer.parseInt(scanner.nextLine().trim()); // 需要查询的服务编号
            // 计算并输出结果
            System.out.println(calculateStartupTime(matrix, k - 1));
        }
    
    
        // 计算服务启动时间
        private static int calculateStartupTime(int[][] matrix, int service) {
            // 如果缓存中已有计算结果，直接返回
            if (cache[service] != -1) {
                return cache[service];
            }
    
            int maxDependencyTime = 0; // 存储依赖服务的最大启动时间
    
            // 遍历当前服务的依赖
            int[] dependencies = matrix[service];
            for (int i = 0; i < dependencies.length; i++) {
                if (i != service && dependencies[i] != 0) {
                    maxDependencyTime = Math.max(maxDependencyTime, calculateStartupTime(matrix, i));
                }
            }
    
            // 计算当前服务的启动时间（包括自身启动时间）
            cache[service] = dependencies[service] + maxDependencyTime;
            return cache[service];
        }
     
    }
    
    

## Python

    
    
    import sys
    
    # 缓存每个服务所需的启动时间
    cache = []
    
    def calculate_startup_time(matrix, service):
        # 如果缓存中已有该服务的计算结果，直接返回
        if cache[service] != -1:
            return cache[service]
    
        max_dependency_time = 0  # 存储依赖服务的最大启动时间
    
        # 遍历当前服务的依赖关系
        dependencies = matrix[service]
        for i in range(len(dependencies)):
            if i != service and dependencies[i] != 0:
                # 递归计算依赖服务的启动时间，并取最大值
                max_dependency_time = max(max_dependency_time, calculate_startup_time(matrix, i))
    
        # 计算当前服务的启动时间（包括自身启动时间）
        cache[service] = dependencies[service] + max_dependency_time
        return cache[service]
    
    def main():
        n = int(input().strip())  # 服务数量
        global cache
        cache = [-1] * n  # 初始化缓存
        matrix = []
    
        # 使用split方法读取矩阵数据
        for _ in range(n):
            line = list(map(int, input().strip().split()))
            matrix.append(line)
    
        k = int(input().strip())  # 需要查询的服务编号
    
        # 计算并输出结果
        print(calculate_startup_time(matrix, k - 1))
    
    if __name__ == "__main__":
        main()
    
    

## JavaScript

    
    
    const readline = require('readline');
    
    // 缓存每个服务所需的启动时间
    let cache = [];
    
    function calculateStartupTime(matrix, service) {
        // 如果缓存中已有该服务的计算结果，直接返回
        if (cache[service] !== -1) {
            return cache[service];
        }
    
        let maxDependencyTime = 0; // 存储依赖服务的最大启动时间
        let dependencies = matrix[service]; // 获取当前服务的依赖关系
    
        // 遍历依赖关系
        for (let i = 0; i < dependencies.length; i++) {
            if (i !== service && dependencies[i] !== 0) {
                maxDependencyTime = Math.max(maxDependencyTime, calculateStartupTime(matrix, i));
            }
        }
    
        // 计算当前服务的启动时间（包括自身启动时间）
        cache[service] = dependencies[service] + maxDependencyTime;
        return cache[service];
    }
    
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    let input = [];
    rl.on('line', (line) => {
        input.push(line);
    }).on('close', () => {
        const n = parseInt(input[0].trim()); // 服务数量
        cache = Array(n).fill(-1); // 初始化缓存
    
        let matrix = [];
        for (let i = 1; i <= n; i++) {
            matrix.push(input[i].trim().split(' ').map(Number));
        }
    
        const k = parseInt(input[n + 1].trim()); // 需要查询的服务编号
    
        // 计算并输出结果
        console.log(calculateStartupTime(matrix, k - 1));
    });
    
    

## C++

    
    
    #include <iostream>
    #include <vector>
    #include <algorithm>
    
    using namespace std;
    
    // 缓存每个服务所需的启动时间
    vector<int> cache;
    
    // 计算服务启动时间
    int calculateStartupTime(const vector<vector<int>>& matrix, int service) {
        // 如果缓存中已有该服务的计算结果，直接返回
        if (cache[service] != -1) {
            return cache[service];
        }
    
        int maxDependencyTime = 0; // 存储依赖服务的最大启动时间
        const vector<int>& dependencies = matrix[service]; // 获取当前服务的依赖关系
    
        // 遍历依赖关系
        for (int i = 0; i < dependencies.size(); i++) {
            if (i != service && dependencies[i] != 0) {
                maxDependencyTime = max(maxDependencyTime, calculateStartupTime(matrix, i));
            }
        }
    
        // 计算当前服务的启动时间（包括自身启动时间）
        cache[service] = dependencies[service] + maxDependencyTime;
        return cache[service];
    }
    
    int main() {
        int n;
        cin >> n; // 服务数量
        cache.resize(n, -1); // 初始化缓存
    
        vector<vector<int>> matrix(n, vector<int>(n));
    
        // 读取矩阵数据
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                cin >> matrix[i][j];
            }
        }
    
        int k;
        cin >> k; // 需要查询的服务编号
    
        // 计算并输出结果
        cout << calculateStartupTime(matrix, k - 1) << endl;
        return 0;
    }
    
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    
    // 缓存每个服务所需的启动时间
    int *cache;
    
    // 计算服务启动时间
    int calculateStartupTime(int **matrix, int service, int n) {
        // 如果缓存中已有该服务的计算结果，直接返回
        if (cache[service] != -1) {
            return cache[service];
        }
    
        int maxDependencyTime = 0; // 存储依赖服务的最大启动时间
        int *dependencies = matrix[service]; // 获取当前服务的依赖关系
    
        // 遍历依赖关系
        for (int i = 0; i < n; i++) {
            if (i != service && dependencies[i] != 0) {
                maxDependencyTime = (maxDependencyTime > calculateStartupTime(matrix, i, n)) ?
                                     maxDependencyTime : calculateStartupTime(matrix, i, n);
            }
        }
    
        // 计算当前服务的启动时间（包括自身启动时间）
        cache[service] = dependencies[service] + maxDependencyTime;
        return cache[service];
    }
    
    int main() {
        int n;
        scanf("%d", &n); // 服务数量
    
        cache = (int *)malloc(n * sizeof(int)); // 动态分配缓存数组
        for (int i = 0; i < n; i++) {
            cache[i] = -1; // 初始化缓存
        }
    
        int **matrix = (int **)malloc(n * sizeof(int *)); // 动态分配矩阵
        for (int i = 0; i < n; i++) {
            matrix[i] = (int *)malloc(n * sizeof(int));
            for (int j = 0; j < n; j++) {
                scanf("%d", &matrix[i][j]); // 读取矩阵数据
            }
        }
    
        int k;
        scanf("%d", &k); // 需要查询的服务编号
    
        // 计算并输出结果
        printf("%d\n", calculateStartupTime(matrix, k - 1, n));
    
        // 释放动态分配的内存
        for (int i = 0; i < n; i++) {
            free(matrix[i]);
        }
        free(matrix);
        free(cache);
    
        return 0;
    }
    
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

