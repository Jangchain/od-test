## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

小明每周上班都会拿到自己的工作清单，工作清单内包含 n 项工作，每项工作都有对应的耗时时间（单位
h）和报酬，工作的总报酬为所有已完成工作的报酬之和，那么请你帮小明安排一下工作，保证小明在指定的工作时间内工作收入最大化。

## 输入描述

T 代表工作时长（单位 h， 0 < T < 1000000），  
n 代表工作数量（ 1 < n ≤ 3000）。  
接下来是 n 行，每行包含两个整数 t，w。  
t 代表该工作消耗的时长（单位 h， t > 0），w 代表该项工作的报酬。

## 输出描述

输出小明指定工作时长内工作可获得的最大报酬。

## 示例1

输入

    
    
    40 3
    20 10
    20 20
    20 5
    

输出

    
    
    30
    

> ## 解题思路

本题是典型的01背包问题，其中：

  * 工作时长 ( T ) 相当于背包的承重。
  * 每一项工作相当于每件物品。
  * 工作消耗的时长相当于物品的重量。
  * 工作的报酬相当于物品的价值。

#### 思路

  1. **初始化与输入：**

     * 首先读入工作时间 ( T ) 和工作数量。
     * 读入每项工作的耗时和报酬，存储在二维数组中。
  2. **动态规划：**

     * 确定所有工作中耗时最短的那个 ( \text{min_time} )，以便从该时间开始计算dp数组。
     * 初始化一个二维dp数组 ( \text{dp}[i][j] )，其中 ( \text{dp}[i][j] ) 表示前 ( i ) 项工作在 ( j ) 时间内能获得的最大报酬。
  3. **动态规划执行：**

     * 使用两个嵌套的for循环遍历工作项 ( i ) 和时间 ( j )。
     * 对于第 ( i ) 项工作： 
       * 如果耗时 ( \text{tasks}[i-1][0] ) 大于 ( j )，则无法完成该项工作，此时最大报酬为 0。
       * 否则，能完成该项工作，最大报酬为 ( \text{tasks}[i-1][1] ) 加上前 ( i-1 ) 项工作在 ( j-\text{tasks}[i-1][0] ) 时间内能获得的最大报酬。
     * 更新dp数组，( \text{dp}[i][j] = \max(\text{dp}[i-1][j], \text{current}) )，其中 (\text{current}) 是如果包含当前工作所得到的报酬。
  4. **输出结果：**

     * 输出 ( \text{dp}[n][T] )，表示前 ( n ) 项工作在 ( T ) 时间内能获得的最大报酬。

## Java

    
    
    import java.util.Scanner;
    import java.util.*;
    
    class Main {
        
    	public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            int T = scanner.nextInt(); // 工作时长
            int n = scanner.nextInt(); // 工作数量
            int[][] works = new int[n][2]; // 工作清单，每个工作包含耗时和报酬
            for (int i = 0; i < n; i++) {
                works[i][0] = scanner.nextInt(); // 耗时
                works[i][1] = scanner.nextInt(); // 报酬
            }
     
            int minTime = Integer.MAX_VALUE; // 记录工作清单中最小的耗时
            for (int[] work : works) {
                minTime = Math.min(minTime, work[0]);
            }
     
            int[][] dp = new int[n + 1][T + 1]; // 动态规划数组
            for (int i = 1; i <= n; i++) {
                for (int j = minTime; j <= T; j++) {
                    int last = dp[i - 1][j]; // 不选当前工作
                    int current = works[i - 1][0] > j ? 0 : works[i - 1][1] + dp[i - 1][j - works[i - 1][0]]; // 选当前工作
                    dp[i][j] = Math.max(last, current); // 取最大值
                }
            }
            System.out.print(dp[n][T]); // 输出最大报酬
            
        }
     
    }
    
    
    

## Python

    
    
    import sys
    input = sys.stdin.readline
    
    work_time, n = map(int, input().split()) # 工作时间和工作数量
    tasks = [] # 存储每项工作的耗时时间和报酬
    for i in range(n):
        tasks.append(list(map(int, input().split())))
    
    min_time = float('inf') # 找到所有工作中耗时最短的那个min_time
    for task in tasks:
        min_time = min(min_time, task[0])
    
    dp = [[0] * (work_time + 1) for _ in range(n + 1)] # 初始化dp数组
    for i in range(1, n + 1):
        for j in range(min_time, work_time + 1):
            last = dp[i - 1][j] # 上一项工作在j时间内能获得的最大报酬
            current = 0 if tasks[i - 1][0] > j else tasks[i - 1][1] + dp[i - 1][j - tasks[i - 1][0]] # 当前工作在j时间内能获得的最大报酬
            dp[i][j] = max(last, current) # 取上一项工作和当前工作在j时间内能获得的最大报酬的最大值
    
    print(dp[n][work_time]) # 输出前n项工作在T时间内能获得的最大报酬
    
    

## JavaScript

    
    
    const readline = require('readline');
    // 创建 readline 接口实例
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    // 用于存储输入的数据
    const lines = [];
    let workTime, n;
    // 监听每行输入的数据
    rl.on("line", (line) => {
      // 将输入的数据存入 lines 数组中
      lines.push(line);
      // 当 lines 数组长度为 1 时，表示输入的是工作时长和工作数量
      if (lines.length === 1) {
        [workTime, n] = lines[0].split(" ").map(Number);
      }
      // 当 lines 数组长度为 n + 1 时，表示输入的是 n 个工作的耗时时间和报酬
      if (n && lines.length === n + 1) {
        // 删除 lines 数组中的第一个元素，即工作耗时时间和报酬的数量
        lines.shift();
        // 将每个工作的耗时时间和报酬存入 tasks 数组中
        const tasks = lines.map((line) => line.split(" ").map(Number));
        // 找出所有工作中的最小耗时时间
        let minTime = Infinity;
        for (const task of tasks) {
          minTime = Math.min(minTime, task[0]);
        }
        // 创建 dp 数组，用于存储不同工作在不同时间下的最大报酬
        const dp = new Array(n + 1).fill().map(() => new Array(workTime + 1).fill(0));
        // 遍历所有工作，计算在不同时间下的最大报酬
        for (let i = 1; i <= n; i++) {
          for (let j = minTime; j <= workTime; j++) {
            // 当前工作不在可用时间内，无法完成，报酬为 0
            if (tasks[i - 1][0] > j) {
              dp[i][j] = dp[i - 1][j];
            } else {
              // 当前工作在可用时间内，可完成，计算完成后的总报酬
              const last = dp[i - 1][j];
              const current = tasks[i - 1][1] + dp[i - 1][j - tasks[i - 1][0]];
              dp[i][j] = Math.max(last, current);
            }
          }
        }
        // 输出在指定工作时间内的最大报酬
        console.log(dp[n][workTime]);
      }
    });
    
    

## C++

    
    
    #include <iostream>
    #include <vector>
    #include <climits>
    #include <algorithm>
    using namespace std;
    
    int main() {
        int work_time, n; // 工作时间和工作数量
        cin >> work_time >> n;
        vector<vector<int>> tasks(n, vector<int>(2)); // 存储每项工作的耗时时间和报酬
        for (int i = 0; i < n; i++) {
            cin >> tasks[i][0] >> tasks[i][1];
        }
    
        int min_time = INT_MAX; // 找到所有工作中耗时最短的那个min_time
        for (auto task : tasks) {
            min_time = min(min_time, task[0]);
        }
    
        vector<vector<int>> dp(n + 1, vector<int>(work_time + 1)); // 初始化dp数组
        for (int i = 1; i <= n; i++) {
            for (int j = min_time; j <= work_time; j++) {
                int last = dp[i - 1][j]; // 上一项工作在j时间内能获得的最大报酬
                int current = tasks[i - 1][0] > j ? 0 : tasks[i - 1][1] + dp[i - 1][j - tasks[i - 1][0]]; // 当前工作在j时间内能获得的最大报酬
                dp[i][j] = max(last, current); // 取上一项工作和当前工作在j时间内能获得的最大报酬的最大值
            }
        }
        cout << dp[n][work_time] << endl; // 输出前n项工作在T时间内能获得的最大报酬
        return 0;
    }
    
    

## C语言

    
    
    #include <stdio.h>
    #include <limits.h>
    #include <stdlib.h>
    
    int main() {
        int work_time, n; // 工作时间和工作数量
        scanf("%d %d", &work_time, &n);
        int tasks[n][2]; // 存储每项工作的耗时时间和报酬
    
        for (int i = 0; i < n; i++) {
            scanf("%d %d", &tasks[i][0], &tasks[i][1]);
        }
    
        int min_time = INT_MAX; // 找到所有工作中耗时最短的那个min_time
        for (int i = 0; i < n; i++) {
            if (tasks[i][0] < min_time) {
                min_time = tasks[i][0];
            }
        }
    
        // 动态规划数组
        int **dp = (int**) malloc((n + 1) * sizeof(int*));
        for (int i = 0; i <= n; i++) {
            dp[i] = (int*) malloc((work_time + 1) * sizeof(int));
            for (int j = 0; j <= work_time; j++) {
                dp[i][j] = 0;
            }
        }
    
        for (int i = 1; i <= n; i++) {
            for (int j = min_time; j <= work_time; j++) {
                int last = dp[i - 1][j]; // 上一项工作在j时间内能获得的最大报酬
                int current = tasks[i - 1][0] > j ? 0 : tasks[i - 1][1] + dp[i - 1][j - tasks[i - 1][0]]; // 当前工作在j时间内能获得的最大报酬
                dp[i][j] = (last > current) ? last : current; // 取上一项工作和当前工作在j时间内能获得的最大报酬的最大值
            }
        }
    
        printf("%d\n", dp[n][work_time]); // 输出前n项工作在T时间内能获得的最大报酬
    
        // 释放动态分配的内存
        for (int i = 0; i <= n; i++) {
            free(dp[i]);
        }
        free(dp);
    
        return 0;
    }
    
    

![fengmian](https://i-blog.csdnimg.cn/blog_migrate/1af98ca3018c29467379f91026977055.png)

## 完整用例

### 用例1

    
    
    40 3
    20 10
    20 20
    20 5
    

### 用例2

    
    
    10 2
    5 10
    5 15
    

### 用例3

    
    
    20 3
    10 20
    5 10
    15 30
    

### 用例4

    
    
    15 4
    5 10
    5 15
    5 20
    5 25
    

### 用例5

    
    
    30 3
    10 10
    20 30
    30 40
    

### 用例6

    
    
    50 5
    10 20
    20 40
    30 60
    40 80
    50 100
    

### 用例7

    
    
    10 3
    3 5
    4 10
    5 15
    

### 用例8

    
    
    25 4
    5 10
    10 20
    15 30
    20 40
    

### 用例9

    
    
    40 5
    8 16
    10 20
    12 24
    14 28
    16 32
    

### 用例10

    
    
    35 3
    10 30
    15 45
    20 60
    

