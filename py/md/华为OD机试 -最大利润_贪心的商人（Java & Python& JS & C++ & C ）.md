## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

商人经营一家店铺，有`number`种商品，由于仓库限制每件商品的最大持有数量是`item[index]`，每种商品的价格是`item-
price[item_index][day]`

通过对商品的买进和卖出获取利润，请给出商人在`days`天内能获取的最大的利润  
注：同一件商品可以反复买进和卖出

## 输入描述

  * 第一行输入商品的数量`number`，比如3

  * 第二行输入商品售货天数 `days`，比如3

  * 第三行输入仓库限制每件商品的最大持有数量是`item[index]`，比如`4 5 6`

后面继续输入`number`行`days`列，含义如下：

  * 第一件商品每天的价格，比如`1 2 3`

  * 第二件商品每天的价格，比如`4 3 2`

  * 第三件商品每天的价格，比如`1 5 3`

## 输出描述

输出商人在这段时间内的最大利润。

## 示例1

输入

    
    
    3
    3
    4 5 6
    1 2 3
    4 3 2
    1 5 2
    

输出

    
    
    32
    

说明

> ## 示例2

输入

    
    
    1
    1
    1
    1
    

输出

    
    
    0
    

说明

> ## 解题思路

我们只要找到商品价格走势的上升区段，然后低价买入，高价卖出即可求得最大利润。

和lettcode上的这题差不多！

[122\. 买卖股票的最佳时机 II - 力扣（LeetCode）](https://leetcode.cn/problems/best-time-to-
buy-and-sell-stock-ii/)

使用贪心算法来计算每天售卖商品能够获得的最大利润。

## Java

    
    
    import java.util.Scanner;
    import java.util.ArrayList;
    import java.util.List;
    
    class Main {
        public static void main(String[] args) {
            // 处理输入
            Scanner in = new Scanner(System.in);
            int itemNumber = in.nextInt(); // 商品数量
            int days = in.nextInt(); // 售货天数
            int[] maxItems = new int[itemNumber]; // 每件商品最大持有数量
            for (int i = 0; i < itemNumber; i++) {
                maxItems[i] = in.nextInt();
            }
            int[][] prices = new int[itemNumber][days]; // 商品价格列表
            for (int i = 0; i < itemNumber; i++) {
                for (int j = 0; j < days; j++) {
                    prices[i][j] = in.nextInt();
                }
            }
    
            // 贪心算法
            int maxProfit = 0;
            for (int i = 0; i < itemNumber; i++) { // 遍历每件商品
                for (int j = 1; j < days; j++) { // 遍历商品价格列表，求出每天的利润
                    int profit = Math.max(0, prices[i][j] - prices[i][j - 1]);
                    // 当前价格减去前一天价格，如果为负数则代表亏本，不计入利润
                    maxProfit += profit * maxItems[i]; // 求出当前商品能够获取的最大利润
                }
            }
    
            System.out.println(maxProfit); // 输出最大利润
        }
    }
    
    
    

## Python

    
    
    # 处理输入
    itemNumber = int(input())  # 商品数量
    days = int(input())  # 售货天数
    
    maxItems = list(map(int, input().split()))  # 每件商品最大持有数量
    
    prices = [list(map(int, input().split())) for _ in range(itemNumber)]  # 商品价格列表
    
    # 贪心算法
    maxProfit = 0
    for i in range(itemNumber):  # 遍历每件商品
        for j in range(1, days):  # 遍历商品价格列表，求出每天的利润
            profit = max(0, prices[i][j] - prices[i][j - 1])
            # 当前价格减去前一天价格，如果为负数则代表亏本，不计入利润
            maxProfit += profit * maxItems[i]  # 求出当前商品能够获取的最大利润
    
    print(maxProfit)  # 输出最大利润
    
    
    

## JavaScript

    
    
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    
    // 处理输入
    let input = [];
    readline.on('line', (line) => {
      input.push(line);
    });
    
    readline.on('close', () => {
      const itemNumber = parseInt(input[0])
      const days = parseInt(input[1]); // 商品数量和售货天数
    
      const maxItems = input[2].split(' ').map(Number); // 每件商品最大持有数量
    
      const prices = input.slice(3).map((line) => line.split(' ').map(Number)); // 商品价格列表
     
      let maxProfit = 0;
      for (let i = 0; i < itemNumber; i++) { // 遍历每件商品
        for (let j = 1; j < days; j++) { // 遍历商品价格列表，求出每天的利润
          const profit = Math.max(0, prices[i][j] - prices[i][j - 1]);
          // 当前价格减去前一天价格，如果为负数则代表亏本，不计入利润
          maxProfit += profit * maxItems[i]; // 求出当前商品能够获取的最大利润
        }
      }
    
      console.log(maxProfit); // 输出最大利润
    });
    
    
    
    

## C++

    
    
    #include <iostream>
    #include <vector>
    using namespace std;
    
    int main() {
        // 处理输入
        int itemNumber, days;
        cin >> itemNumber >> days;
    
        vector<int> maxItems(itemNumber); // 每件商品最大持有数量
        for (int i = 0; i < itemNumber; i++) {
            cin >> maxItems[i];
        }
    
        vector<vector<int>> prices(itemNumber, vector<int>(days)); // 商品价格列表
        for (int i = 0; i < itemNumber; i++) {
            for (int j = 0; j < days; j++) {
                cin >> prices[i][j];
            }
        }
    
        // 贪心算法
        int maxProfit = 0;
        for (int i = 0; i < itemNumber; i++) { // 遍历每件商品
            for (int j = 1; j < days; j++) { // 遍历商品价格列表，求出每天的利润
                int profit = max(0, prices[i][j] - prices[i][j - 1]);
                // 当前价格减去前一天价格，如果为负数则代表亏本，不计入利润
                maxProfit += profit * maxItems[i]; // 求出当前商品能够获取的最大利润
            }
        }
    
        cout << maxProfit << endl; // 输出最大利润
        return 0;
    }
    
    
    

## C语言

    
    
    #include <stdio.h>
    
    int max(int a, int b) {
        return (a > b) ? a : b; // 返回两个整数中的较大值
    }
    
    int main() {
        // 处理输入
        int itemNumber; // 商品数量
        int days; // 售货天数
    
        // 从标准输入读取商品数量和售货天数
        scanf("%d %d", &itemNumber, &days);
    
        int maxItems[itemNumber]; // 每件商品的最大持有数量
        for (int i = 0; i < itemNumber; i++) {
            scanf("%d", &maxItems[i]); // 读取每件商品的最大持有数量
        }
    
        int prices[itemNumber][days]; // 商品价格列表，二维数组存储
        for (int i = 0; i < itemNumber; i++) {
            for (int j = 0; j < days; j++) {
                scanf("%d", &prices[i][j]); // 读取每件商品在每一天的价格
            }
        }
    
        // 贪心算法计算最大利润
        int maxProfit = 0; // 初始化最大利润为0
        for (int i = 0; i < itemNumber; i++) { // 遍历每件商品
            for (int j = 1; j < days; j++) { // 遍历每一天的价格
                // 当前价格减去前一天的价格，计算利润
                int profit = max(0, prices[i][j] - prices[i][j - 1]);
                // 如果利润为正，则将其乘以该商品的最大持有量，加到总利润中
                maxProfit += profit * maxItems[i];
            }
        }
    
        // 输出最大利润
        printf("%d\n", maxProfit);
    
        return 0;
    }
    
    

![fengmian](https://i-blog.csdnimg.cn/blog_migrate/e316da25b9114e17ed4a5e7c5a832008.png)

## 完整用例

### 用例1

    
    
    3
    3
    4 5 6
    1 2 3
    4 3 2
    1 5 2
    

### 用例2

    
    
    1
    2
    5
    3 5
    

### 用例3

    
    
    2
    3
    3 4
    2 3 1
    5 4 6
    

### 用例4

    
    
    3
    4
    2 3 1
    1 3 2 4
    4 2 5 1
    6 5 3 7
    

### 用例5

    
    
    1
    1
    10
    5
    

### 用例6

    
    
    2
    2
    5 3
    1 4
    3 1
    

### 用例7

    
    
    3
    3
    3 2 1
    1 2 3
    3 2 1
    2 3 1
    

### 用例8

    
    
    2
    4
    4 5
    1 3 2 4
    4 3 5 2
    

### 用例9

    
    
    1
    5
    6
    1 2 3 4 5
    

### 用例10

    
    
    2
    2
    1 1
    1 2
    2 1
    

