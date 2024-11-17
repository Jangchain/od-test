## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

某个充电站，可提供 n 个充电设备，每个充电设备均有对应的输出功率。

任意个充电设备组合的输出功率总和，均构成功率集合 P 的 1 个元素。

功率集合 P 的最优元素，表示最接近充电站最大输出功率 p_max 的元素。

## 输入描述

输入为 3 行：

  * 第 1 行为充电设备个数 n
  * 第 2 行为每个充电设备的输出功率
  * 第 3 行为充电站最大输出功率 p_max

##### 备注

  * 充电设备个数 n > 0
  * 最优元素必须**小于或等于** 充电站最大输出功率 p_max

## 输出描述

功率集合 P 的最优元素

## 示例1

输入

    
    
    4
    50 20 20 60
    90
    

输出

    
    
    90
    

说明

> 当充电设备输出功率50、20、20组合时，其输出功率总和为90，最接近充电站最大充电输出功率，因此最优元素为90。

## 示例2

输入

    
    
    2
    50 40
    30
    

输出

    
    
    0
    

说明

> 所有充电设备的输出功率组合，均大于充电站最大充电输出功率30，此时最优元素值为0。

## 示例3

输入

    
    
    3
    2 3 10
    9
    

输出

    
    
    5
    

说明

> 选择功率为2，3的设备构成功率集合，总功率为5，最接近最大功率9。不能选择设备10，因为已经超过了最大功率9。

## 示例3

输入

    
    
    3
    1 2 3
    5
    

输出

    
    
    5
    

说明

> 无

## 解题思路

这是一道01背包的题目。题目要求任意个充电设备组合的输出功率总和，均构成功率集合P的1个元素。因此，我们可以将问题转化为求解最接近充电站最大输出功率p_max的元素。

  * 第3行中的充电站最大输出功率p_max可以看作是背包的最大承重；

  * 第2行中每个充电设备的输出功率可以看作是不同物品的重量和价值，即重量=价值。

因此，现在需要求出在背包承重下能够装入的最大价值。

我们可以使用一个二维数组dp[i][j]表示前i个充电设备中，总功率不超过j时的最大功率。其中，i表示前i个充电设备，j表示总功率不超过j。

对于每个充电设备，我们可以选择选或不选。如果当前充电设备的功率大于当前总功率j，那么不能选，我们就不选当前充电设备。如果当前充电设备的功率小于等于当前总功率j，那么我们可以选择选或不选当前充电设备。如果选当前充电设备，那么当前总功率就是当前充电设备的功率加上前i-1个充电设备中总功率不超过j-
当前充电设备功率的最大值，即dp[i-1][j-power[i-1]]+power[i-1]；如果不选当前充电设备，那么当前总功率就是前i-1个充电设备中总功率不超过j的最大值，即dp[i-1][j]。因此，我们可以得到状态转移方程：dp[i][j]
= max(dp[i-1][j], dp[i-1][j-power[i-1]]+power[i-1])。

最终，dp[n][p_max]就是最大功率，即功率集合P的最优元素。

## Java

    
    
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            // 创建Scanner对象
            Scanner scanner = new Scanner(System.in);
            // 读取输入的整数
            int n = scanner.nextInt();
    
            // 创建一个长度为n的整型数组
            int[] power = new int[n];
            // 循环读取n个整数，存入数组中
            for (int i = 0; i < n; i++) {
                power[i] = scanner.nextInt();
            }
    
            // 读取输入的整数
            int p_max = scanner.nextInt();
    
            // 创建一个n+1行，p_max+1列的二维整型数组
            int[][] dp = new int[n + 1][p_max + 1];
    
            // 循环计算dp数组的每个元素
            for (int i = 1; i <= n; i++) {
                for (int j = 1; j <= p_max; j++) {
                    // 如果当前能量值大于当前承受的伤害值，则不受伤
                    if (power[i - 1] > j) {
                        dp[i][j] = dp[i - 1][j];
                    } else { // 否则需要扣除相应的能量值
                        dp[i][j] = Math.max(dp[i - 1][j], power[i - 1] + dp[i - 1][j - power[i - 1]]);
                    }
                }
            }
    
            // 输出结果
            System.out.println(dp[n][p_max]);
        }
    }
    
    
    

## Python

    
    
    n = int(input()) # 充电设备个数
    power = list(map(int, input().split())) # 每个充电设备的输出功率
    p_max = int(input()) # 充电站最大输出功率
    
    dp = [[0] * (p_max + 1) for _ in range(n + 1)] # 初始化为0
    
    for i in range(1, n + 1):
        for j in range(1, p_max + 1):
            if power[i - 1] > j: # 当前充电设备的功率大于当前总功率j，不能选
                dp[i][j] = dp[i - 1][j] # 不选当前充电设备
            else:
                dp[i][j] = max(dp[i - 1][j], power[i - 1] + dp[i - 1][j - power[i - 1]]) # 选或不选当前充电设备
    
    print(dp[n][p_max]) # 输出最大功率
    
    

## JavaScript

    
    
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    let n, power, p_max;
    let dp = [];
    
    // 监听输入流中的每一行数据
    rl.on('line', (line) => {
      // 如果n还未赋值，则将输入的第一行数据赋值给n
      if (!n) {
        n = parseInt(line.trim());
      } 
      // 如果power还未赋值，则将输入的第二行数据转化为数组赋值给power
      else if (!power) {
        power = line.trim().split(' ').map(Number);
      } 
      // 如果p_max还未赋值，则将输入的第三行数据赋值给p_max，并进行动态规划
      else if (!p_max) {
        p_max = parseInt(line.trim());
        // 初始化dp数组
        dp = new Array(n + 1).fill().map(() => new Array(p_max + 1).fill(0));
        // 进行动态规划
        for (let i = 1; i <= n; i++) {
          for (let j = 1; j <= p_max; j++) {
            if (power[i - 1] > j) {
              dp[i][j] = dp[i - 1][j];
            } else {
              dp[i][j] = Math.max(dp[i - 1][j], power[i - 1] + dp[i - 1][j - power[i - 1]]);
            }
          }
        }
        // 输出结果
        console.log(dp[n][p_max]);
        // 关闭接口实例
        rl.close();
      }
    });
    
    

## C++

    
    
     
    #include <iostream>
    using namespace std;
    
    int main() {
        int n; // 充电设备个数
        cin >> n;
    
        int power[n]; // 每个充电设备的输出功率
        for (int i = 0; i < n; i++) {
            cin >> power[i];
        }
    
        int p_max; // 充电站最大输出功率
        cin >> p_max;
    
        int dp[n + 1][p_max + 1] = {}; // 初始化为0
    
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= p_max; j++) {
                if (power[i - 1] > j) { // 当前充电设备的功率大于当前总功率j，不能选
                    dp[i][j] = dp[i - 1][j]; // 不选当前充电设备
                } else {
                    dp[i][j] = max(dp[i - 1][j], power[i - 1] + dp[i - 1][j - power[i - 1]]); // 选或不选当前充电设备
                }
            }
        }
    
        cout << dp[n][p_max] << endl; // 输出最大功率
    
        return 0;
    }
    
    

## C语言

    
    
    #include <stdio.h>
    #include <string.h> // 用于memset函数
    
    int max(int a, int b) {
        return (a > b) ? a : b; // 返回两个整数中的较大值
    }
    
    int main() {
        int n; // 充电设备个数
        scanf("%d", &n); // 输入充电设备的个数
    
        int power[n]; // 每个充电设备的输出功率
        for (int i = 0; i < n; i++) {
            scanf("%d", &power[i]); // 输入每个充电设备的输出功率
        }
    
        int p_max; // 充电站最大输出功率
        scanf("%d", &p_max); // 输入充电站的最大输出功率
    
        // 定义一个二维数组dp，初始化为0
        int dp[n + 1][p_max + 1];
        memset(dp, 0, sizeof(dp)); // 使用memset将数组dp初始化为0
    
        // 动态规划计算最大输出功率
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= p_max; j++) {
                if (power[i - 1] > j) { // 如果当前充电设备的功率大于当前总功率j，不能选择这个设备
                    dp[i][j] = dp[i - 1][j]; // 不选择当前充电设备，最大功率为上一个状态的值
                } else {
                    // 选择当前充电设备与不选择当前充电设备的最大值
                    dp[i][j] = max(dp[i - 1][j], power[i - 1] + dp[i - 1][j - power[i - 1]]);
                }
            }
        }
    
        // 输出结果，即充电站可以达到的最大输出功率
        printf("%d\n", dp[n][p_max]);
    
        return 0;
    }
    
    

![fengmian](https://i-blog.csdnimg.cn/blog_migrate/044ad7b23df272a94dfd988cab88324d.png)

