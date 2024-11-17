## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

"吃货"和"馋嘴"两人到披萨店点了一份铁盘（圆形）披萨，并嘱咐店员将披萨按放射状切成大小相同的偶数个小块。但是粗心的服务员将披萨切成了每块大小都完全不同奇数块，且肉眼能分辨出大小。

由于两人都想吃到最多的披萨，他们商量了一个他们认为公平的分法：从"吃货"开始，轮流取披萨。除了第一块披萨可以任意选取外，其他都必须从缺口开始选。

他俩选披萨的思路不同。"馋嘴"每次都会选最大块的披萨，而且"吃货"知道"馋嘴"的想法。

已知披萨小块的数量以及每块的大小，求"吃货"能分得的最大的披萨大小的总和。

## 输入描述

第 1 行为一个正整数奇数 N，表示披萨小块数量。

  * 3 ≤ N < 500

接下来的第 2 行到第 N + 1 行（共 N 行），每行为一个正整数，表示第 i 块披萨的大小

  * 1 ≤ i ≤ N

披萨小块从某一块开始，按照一个方向次序顺序编号为 1 ~ N

  * 每块披萨的大小范围为 [1, 2147483647]

## 输出描述

"吃货"能分得到的最大的披萨大小的总和。

## 用例

输入

    
    
    5
    8
    2
    10
    5
    7
    

输出

    
    
    19
    

说明：

> 此例子中，有 5 块披萨。每块大小依次为 8、2、10、5、7。  
>  按照如下顺序拿披萨，可以使"吃货"拿到最多披萨：  
>  “吃货” 拿大小为 10 的披萨  
>  “馋嘴” 拿大小为 5 的披萨  
>  “吃货” 拿大小为 7 的披萨  
>  “馋嘴” 拿大小为 8 的披萨  
>  “吃货” 拿大小为 2 的披萨  
>  至此，披萨瓜分完毕，"吃货"拿到的披萨总大小为 10 + 7 + 2 = 19  
>  可能存在多种拿法，以上只是其中一种。

## 解题思路

给定一个环形排列的披萨数组，每块披萨有一个美味值，需要计算出从任意位置开始，能够获得的最大美味值总和。

  1. **环形处理** ：由于披萨是环形排列的，所以在选择披萨时需要考虑边界情况，即当选择了最左边或最右边的披萨后，如何循环到另一端。

  2. **动态规划** ：使用一个二维数组 `dp` 作为记忆化存储，其中 `dp[L][R]` 表示从左边界 `L` 到右边界 `R` 能够获得的最大美味值。如果 `dp[L][R]` 已经被计算过，则直接返回该值。

  3. **递归计算** ：定义一个递归函数来计算 `dp[L][R]`。如果 `a[L]`（左边界的披萨美味值）大于 `a[R]`（右边界的披萨美味值），则选择 `L` 并将 `L` 向右移动一位；否则选择 `R` 并将 `R` 向左移动一位。这样递归地选择下一步，直到只剩下一块披萨。

  4. **递归基** ：当左右边界相遇时（即 `L == R`），说明只剩下一块披萨，直接返回这块披萨的美味值作为递归基。

  5. **状态转移** ：在递归过程中，`dp[L][R]` 的值是通过比较选择左边界披萨和右边界披萨后，剩下披萨的最大美味值之和来确定的。

## C++

    
    
    #include <iostream>
    #include <vector>
    #include <algorithm> // 用于 std::max 函数
    
    using namespace std;
    
    int n; // 披萨的数量
    vector<int> a; // 每块披萨的美味值
    vector<vector<int>> dp; // 记忆化数组，用于存储已计算过的状态
    
    // 计算最大美味值的函数
    int allocation(int L, int R) {
        if (dp[L][R] != -1) {
            return dp[L][R]; // 如果已计算过，直接返回结果
        }
        if (a[L] > a[R]) {
            L = (L + 1) % n; // 左边披萨更美味，吃掉左边的
        } else {
            R = (R + n - 1) % n; // 右边披萨更美味，吃掉右边的
        }
        if (L == R) {
            dp[L][R] = a[L]; // 只剩一块披萨时，返回其美味值
        } else {
            // 否则，递归计算剩下披萨的最大美味值，并更新记忆化数组
            dp[L][R] = max(a[L] + allocation((L + 1) % n, R), a[R] + allocation(L, (R + n - 1) % n));
        }
        return dp[L][R]; // 返回当前状态下的最大美味值
    }
    
    int main() {
        cin >> n; // 输入披萨的数量
        a.resize(n); // 调整数组大小以存储每块披萨的美味值
        for (int i = 0; i < n; ++i) {
            cin >> a[i]; // 输入每块披萨的美味值
        }
        dp.assign(n, vector<int>(n, -1)); // 初始化记忆化数组
    
        int ans = 0; // 初始化最大美味值为 0
        for (int i = 0; i < n; ++i) {
            // 更新最大美味值，allocation函数计算从当前披萨开始的最大美味值
            ans = max(ans, allocation((i + 1) % n, (i + n - 1) % n) + a[i]);
        }
    
        cout << ans << endl;  // 输出最多能吃到的披萨的美味值
        return 0;
    }
    

## Java

    
    
    import java.util.*;
    
    public class Main {
        static int n;  // 披萨的数量
        static int[] a;  // 每块披萨的美味值
        static int[][] dp;  // 记忆化数组，用于存储已计算过的状态
    
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            n = scanner.nextInt();  // 输入披萨的数量
            a = new int[n];  // 初始化存储每块披萨美味值的数组
            for (int i = 0; i < n; i++) {
                a[i] = scanner.nextInt();  // 输入每块披萨的美味值
            }
            dp = new int[n][n];  // 初始化记忆化数组，其维度为披萨数量的平方
            for (int[] row : dp) {
                Arrays.fill(row, -1);  // 初始化记忆化数组，将所有值设为-1，表示未计算
            }
    
            int ans = 0;  // 初始化最大美味值为0
            // 遍历每块披萨，尝试以每块披萨作为起点计算最大美味值
            for (int i = 0; i < n; i++) {
                // 更新最大美味值，allocation函数计算从当前披萨开始的最大美味值
                ans = Math.max(ans, allocation((i + 1) % n, (i + n - 1) % n) + a[i]);
            }
    
            System.out.println(ans);  // 输出最多能吃到的披萨的美味值总和
        }
    
        static int allocation(int L, int R) {
            // 如果当前状态已经计算过，则直接返回结果
            if (dp[L][R] != -1) {
                return dp[L][R];
            }
            // 根据贪心策略，选择当前美味值较大的披萨
            if (a[L] > a[R]) {
                L = (L + 1) % n;  // 如果左边的披萨更美味，则吃掉左边的披萨
            } else {
                R = (R + n - 1) % n;  // 如果右边的披萨更美味，则吃掉右边的披萨
            }
            // 如果只剩下一块披萨，则直接返回这块披萨的美味值
            if (L == R) {
                dp[L][R] = a[L];
            } else {
                // 否则，递归计算剩下披萨的最大美味值，并更新记忆化数组
                dp[L][R] = Math.max(a[L] + allocation((L + 1) % n, R), a[R] + allocation(L, (R + n - 1) % n));
            }
            return dp[L][R];  // 返回当前状态下的最大美味值
        }
    }
    

## javaScript

    
    
    const readline = require('readline');
    
    // 创建 readline 接口
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    let lines = []; // 用于存储输入行的数组
    let n; // 披萨的数量
    let a; // 每块披萨的美味值
    let dp; // 记忆化数组，用于存储已计算过的状态
    
    // 处理输入
    rl.on('line', (line) => {
      lines.push(line);
    }).on('close', () => {
      // 处理 lines 中的数据
      [n, ...a] = lines.map(Number); // 第一行是披萨的数量，接下来的行是每块披萨的美味值
      a = a.slice(0, n); // 截取前 n 个数字作为美味值数组
      dp = Array.from({ length: n }, () => Array(n).fill(-1)); // 初始化记忆化数组
    
      let ans = 0; // 初始化最大美味值为 0
      for (let i = 0; i < n; i++) {
        ans = Math.max(ans, allocation((i + 1) % n, (i + n - 1) % n) + a[i]);
      }
    
      console.log(ans); // 输出最多能吃到的披萨的美味值总和
    });
    
    // 计算最大美味值的函数
    function allocation(L, R) {
      if (dp[L][R] !== -1) {
        return dp[L][R]; // 如果已计算过，直接返回结果
      }
      if (a[L] > a[R]) {
        L = (L + 1) % n; // 左边披萨更美味，吃掉左边的
      } else {
        R = (R + n - 1) % n; // 右边披萨更美味，吃掉右边的
      }
      if (L == R) {
        dp[L][R] = a[L]; // 只剩一块披萨时，返回其美味值
      } else {
        dp[L][R] = Math.max(a[L] + allocation((L + 1) % n, R), a[R] + allocation(L, (R + n - 1) % n));
      }
      return dp[L][R]; // 返回当前状态下的最大美味值
    }
    

## Python

    
    
    # 用于读取输入的标准库
    import sys
    
    # 用于存储输入行的数组
    lines = []
    # 读取标准输入
    for line in sys.stdin:
        lines.append(line.strip())
    
    # 披萨的数量
    n = int(lines[0])
    # 每块披萨的美味值
    a = list(map(int, lines[1:1 + n]))
    # 记忆化数组，用于存储已计算过的状态
    dp = [[-1 for _ in range(n)] for _ in range(n)]
    
    # 计算最大美味值的函数
    def allocation(L, R):
        # 如果已计算过，直接返回结果
        if dp[L][R] != -1:
            return dp[L][R]
        # 根据美味值选择吃掉左边或右边的披萨
        if a[L] > a[R]:
            L = (L + 1) % n
        else:
            R = (R + n - 1) % n
        # 如果只剩一块披萨，返回其美味值
        if L == R:
            dp[L][R] = a[L]
        else:
            dp[L][R] = max(a[L] + allocation((L + 1) % n, R), a[R] + allocation(L, (R + n - 1) % n))
        return dp[L][R]
    
    # 初始化最大美味值为 0
    ans = 0
    # 计算并更新最大美味值
    for i in range(n):
        ans = max(ans, allocation((i + 1) % n, (i + n - 1) % n) + a[i])
    
    # 输出最多能吃到的披萨的美味值总和
    print(ans)
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    
    int main() {
        int n;  // 披萨的数量
        int *a; // 存储每块披萨美味值的数组
        int **dp; // 记忆化数组，用于存储已计算过的状态
    
        // 读取披萨的数量
        scanf("%d", &n);
        a = (int *)malloc(n * sizeof(int));
    
        // 读取每块披萨的美味值
        for (int i = 0; i < n; i++) {
            scanf("%d", &a[i]);
        }
    
        // 初始化记忆化数组
        dp = (int **)malloc(n * sizeof(int *));
        for (int i = 0; i < n; i++) {
            dp[i] = (int *)malloc(n * sizeof(int));
            for (int j = 0; j < n; j++) {
                dp[i][j] = -1;
            }
        }
    
        // 计算最大美味值的函数声明
        int allocation(int, int, int, int *, int **);
    
        int ans = 0; // 初始化最大美味值为 0
        for (int i = 0; i < n; i++) {
            ans = (ans > allocation((i + 1) % n, (i + n - 1) % n, n, a, dp) + a[i]) ? ans : allocation((i + 1) % n, (i + n - 1) % n, n, a, dp) + a[i];
        }
    
        // 输出最多能吃到的披萨的美味值总和
        printf("%d\n", ans);
    
        // 释放分配的内存
        for (int i = 0; i < n; i++) {
            free(dp[i]);
        }
        free(dp);
        free(a);
    
        return 0;
    }
    
    // 计算最大美味值的函数
    int allocation(int L, int R, int n, int *a, int **dp) {
        if (dp[L][R] != -1) {
            return dp[L][R]; // 如果已计算过，直接返回结果
        }
        if (a[L] > a[R]) {
            L = (L + 1) % n; // 左边披萨更美味，吃掉左边的
        } else {
            R = (R + n - 1) % n; // 右边披萨更美味，吃掉右边的
        }
        if (L == R) {
            dp[L][R] = a[L]; // 只剩一块披萨时，返回其美味值
        } else {
            dp[L][R] = (a[L] + allocation((L + 1) % n, R, n, a, dp)) > (a[R] + allocation(L, (R + n - 1) % n, n, a, dp)) ? (a[L] + allocation((L + 1) % n, R, n, a, dp)) : (a[R] + allocation(L, (R + n - 1) % n, n, a, dp));
        }
        return dp[L][R]; // 返回当前状态下的最大美味值
    }
    

![fengmian](https://i-blog.csdnimg.cn/blog_migrate/02dcc483f48c97eba3f1c0a0957ba270.png)

## 完整用例

### 用例1

    
    
    3
    1
    2
    3
    

### 用例2

    
    
    5
    1
    2
    3
    4
    5
    

### 用例3

    
    
    7
    10
    1
    3
    5
    7
    9
    2
    

### 用例4

    
    
    9
    8
    7
    6
    5
    4
    3
    2
    1
    9
    

### 用例5

    
    
    5
    1
    3
    5
    7
    9
    

### 用例6

    
    
    3
    5
    5
    5
    

### 用例7

    
    
    5
    21412
    100
    200
    300
    400
    

### 用例8

    
    
    5
    1
    10
    2
    9
    3
    

### 用例9

    
    
    7
    2
    4
    6
    8
    10
    12
    14
    

### 用例10

    
    
    5
    2
    3
    6
    7
    9
    

