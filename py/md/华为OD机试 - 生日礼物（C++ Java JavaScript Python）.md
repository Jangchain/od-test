## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

小牛的孩子生日快要到了，他打算给孩子买蛋糕和小礼物，蛋糕和小礼物各买一个，他的预算不超过x元。蛋糕cake和小礼物gift都有多种价位的可供选择。

请返回小牛共有多少种购买方案。

## 输入描述

第一行表示cake的单价，以逗号分隔

第二行表示gift的单价，以逗号分隔

第三行表示x预算

#### 备注

  * 1 ≤ cake.length ≤ 10^5
  * 1 ≤ gift.length ≤10^5
  * 1 ≤ cake[i]，gift[i] ≤ 10^5
  * 1 ≤ X ≤ 2*10^5

## 输出描述

输出数字表示购买方案的总数

## 示例1

输入

    
    
    10,20,5
    5,5,2
    15
    

输出

    
    
    6
    

说明

> 解释: 小牛有6种购买方案，所选蛋糕与所选礼物在数组中对应的下标分别是：
>
> 第1种方案: cake [0] + gift [0] = 10 + 5 = 15;  
>  第2种方案: cake [0] + gift [1]= 10 + 5 = 15;  
>  第3种方案: cake [0] + gift [2] = 10 + 2 = 12;
>
> 第4种方案: cake [2] + gift [0] = 5 + 5 = 10;
>
> 第5种方案: cake [2] + gift [1]= 5 + 5 = 10;  
>  第6种方案: cake [2] + gift [2] = 5 + 2 = 7。

> ## 解题思路

题目要求在给定预算 `x` 元的限制下，找到所有可以购买一个蛋糕和一个礼物的组合，使得它们的总价不超过 `x`。我们需要输出符合预算的所有组合数量。

#### 题目解析

  1. **输入内容** ：

     * 第一行是蛋糕的价格数组，多个价格以逗号分隔。
     * 第二行是礼物的价格数组，多个价格以逗号分隔。
     * 第三行是预算 `x`，一个整数。
  2. **输出** ：

     * 输出一个整数，表示所有符合预算的蛋糕和礼物组合数量。
  3. **示例说明** ：

     * 示例中有 `cake = [10, 20, 5]` 和 `gift = [5, 5, 2]`，预算 `x = 15`。
     * 可以找到满足总价不超过 15 元的组合，共有 6 种购买方案。

#### 思路

  1. **遍历组合** ：遍历 `cake` 和 `gift` 两个数组，找到所有符合条件的组合。对于每个 `cake[i]`，尝试与每个 `gift[j]` 组合，如果 `cake[i] + gift[j] <= x`，则该组合符合要求。

  2. **双指针优化（若数据量较大时考虑）** ：

     * 首先将两个数组排序。
     * 使用双指针的方法，固定一个数组的指针位置，在另一个数组中寻找符合条件的范围，可以有效减少不必要的遍历次数，提高效率。
  3. **输出结果** ：统计符合条件的组合数量，输出该数值。

这种解法适用于较大数据量场景，避免了双重循环的暴力解法带来的性能问题。

## Java

    
    
    import java.util.Arrays;
    import java.util.Scanner;
    
    public class Main {
      public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
    
        // 输入cake的单价，以逗号分隔
        int[] cakePrices = Arrays.stream(sc.nextLine().split(",")).mapToInt(Integer::parseInt).toArray();
        // 输入gift的单价，以逗号分隔
        int[] giftPrices = Arrays.stream(sc.nextLine().split(",")).mapToInt(Integer::parseInt).toArray();
        // 输入预算x
        int budget = Integer.parseInt(sc.nextLine());
    
        // 将cake的单价从小到大排序
        Arrays.sort(cakePrices);
    
        long totalSolutions = 0;
        for (int giftPrice : giftPrices) {
          // 如果礼物的价格大于等于预算，则跳过
          if (giftPrice >= budget) continue;
    
          // 计算最大的蛋糕价格
          int maxCakePrice = budget - giftPrice;
    
          // 二分查找蛋糕价格数组中最后一个小于等于maxCakePrice的位置
          int low = 0;
          int high = cakePrices.length - 1;
          while (low <= high) {
            int mid = (low + high) / 2;
            
            if (cakePrices[mid] <= maxCakePrice) {
              low = mid + 1; // 尝试找到更大的值
            } else {
              high = mid - 1;
            }
          }
          
          // high 指向的是最后一个小于等于 maxCakePrice 的位置
          totalSolutions += high + 1;
        }
    
        System.out.println(totalSolutions);
      }
    }
    

## Python

    
    
    import sys
    
    # 获取用户输入
    cake_prices = list(map(int, input().split(",")))
    gift_prices = list(map(int, input().split(",")))
    budget = int(input())
    
    # 将蛋糕价格数组从小到大排序
    cake_prices.sort()
    
    total_solutions = 0
    
    # 遍历每个礼物价格
    for gift_price in gift_prices:
        # 如果礼物价格超过或等于预算，跳过该礼物
        if gift_price >= budget:
            continue
    
        # 计算能够购买的最大蛋糕价格
        max_cake_price = budget - gift_price
    
        # 二分查找最后一个小于等于maxCakePrice的位置
        low, high = 0, len(cake_prices) - 1
        while low <= high:
            mid = (low + high) // 2
            if cake_prices[mid] <= max_cake_price:
                low = mid + 1  # 尝试找到更大的值
            else:
                high = mid - 1
    
        # high指向的是最后一个小于等于 maxCakePrice 的位置
        total_solutions += high + 1
    
    # 输出满足条件的方案总数
    print(total_solutions)
    

## JavaScript

    
    
    // 引入 readline 模块，用于获取用户输入
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    // 获取并处理用户输入
    readline.on('line', cakeInput => {
      readline.on('line', giftInput => {
        readline.on('line', budgetInput => {
          
          // 将输入转为整数数组
          const cakePrices = cakeInput.split(',').map(Number).sort((a, b) => a - b);
          const giftPrices = giftInput.split(',').map(Number);
          const budget = parseInt(budgetInput);
    
          let totalSolutions = 0;
    
          // 遍历每个礼物价格
          giftPrices.forEach(giftPrice => {
            // 如果礼物价格超过或等于预算，跳过该礼物
            if (giftPrice >= budget) return;
    
            // 计算最大蛋糕价格
            const maxCakePrice = budget - giftPrice;
    
            // 二分查找最后一个小于等于 maxCakePrice 的蛋糕价格位置
            let low = 0, high = cakePrices.length - 1;
            while (low <= high) {
              const mid = Math.floor((low + high) / 2);
              if (cakePrices[mid] <= maxCakePrice) {
                low = mid + 1; // 尝试找到更大的值
              } else {
                high = mid - 1;
              }
            }
    
            // high 指向的是最后一个小于等于 maxCakePrice 的位置
            totalSolutions += high + 1;
          });
    
          // 输出满足条件的方案总数
          console.log(totalSolutions);
          readline.close();
        });
      });
    });
    

## C++

    
    
    #include <iostream>
    #include <vector>
    #include <algorithm>
    #include <sstream>
    
    using namespace std;
    
    int main() {
        string cakeInput, giftInput;
        int budget;
    
        // 输入蛋糕价格
        getline(cin, cakeInput);
    
        // 输入礼物价格
        getline(cin, giftInput);
    
        // 输入预算
        cin >> budget;
    
        // 解析输入并排序蛋糕价格
        vector<int> cakePrices;
        stringstream ssCake(cakeInput);
        string temp;
        while (getline(ssCake, temp, ',')) {
            cakePrices.push_back(stoi(temp));
        }
        sort(cakePrices.begin(), cakePrices.end());
    
        // 解析礼物价格
        vector<int> giftPrices;
        stringstream ssGift(giftInput);
        while (getline(ssGift, temp, ',')) {
            giftPrices.push_back(stoi(temp));
        }
    
        long totalSolutions = 0;
    
        // 遍历每个礼物价格
        for (int giftPrice : giftPrices) {
            // 如果礼物价格超过或等于预算，跳过该礼物
            if (giftPrice >= budget) continue;
    
            // 计算最大允许的蛋糕价格
            int maxCakePrice = budget - giftPrice;
    
            // 二分查找最后一个小于等于 maxCakePrice 的位置
            int low = 0, high = cakePrices.size() - 1;
            while (low <= high) {
                int mid = (low + high) / 2;
                if (cakePrices[mid] <= maxCakePrice) {
                    low = mid + 1; // 尝试找到更大的值
                } else {
                    high = mid - 1;
                }
            }
    
            // high 指向的是最后一个小于等于 maxCakePrice 的位置
            totalSolutions += high + 1;
        }
    
        // 输出满足条件的方案总数
        cout << totalSolutions << endl;
        return 0;
    }
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    #include <string.h> 
    // 比较函数，用于qsort对数组排序
    int compare(const void *a, const void *b) {
        return (*(int *)a - *(int *)b);
    }
    
    int main() {
        // 输入和数据处理
        char cakeInput[100], giftInput[100];
        int budget;
    
        fgets(cakeInput, sizeof(cakeInput), stdin);
    
        fgets(giftInput, sizeof(giftInput), stdin);
    
        scanf("%d", &budget);
    
        // 解析和处理蛋糕价格
        int cakePrices[100], cakeCount = 0;
        char *token = strtok(cakeInput, ",");
        while (token != NULL) {
            cakePrices[cakeCount++] = atoi(token);
            token = strtok(NULL, ",");
        }
        qsort(cakePrices, cakeCount, sizeof(int), compare);
    
        // 解析和处理礼物价格
        int giftPrices[100], giftCount = 0;
        token = strtok(giftInput, ",");
        while (token != NULL) {
            giftPrices[giftCount++] = atoi(token);
            token = strtok(NULL, ",");
        }
    
        long totalSolutions = 0;
    
        // 遍历每个礼物价格
        for (int i = 0; i < giftCount; i++) {
            int giftPrice = giftPrices[i];
            
            // 如果礼物价格超过或等于预算，跳过该礼物
            if (giftPrice >= budget) continue;
    
            // 计算最大允许的蛋糕价格
            int maxCakePrice = budget - giftPrice;
    
            // 二分查找最后一个小于等于 maxCakePrice 的位置
            int low = 0, high = cakeCount - 1;
            while (low <= high) {
                int mid = (low + high) / 2;
                if (cakePrices[mid] <= maxCakePrice) {
                    low = mid + 1; // 尝试找到更大的值
                } else {
                    high = mid - 1;
                }
            }
    
            // high 指向的是最后一个小于等于 maxCakePrice 的位置
            totalSolutions += high + 1;
        }
    
        // 输出满足条件的方案总数
        printf("%ld\n", totalSolutions);
    
        return 0;
    }
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/daab56c7491e833eb6ea3cb75d3cd2ec.png)

#### 完整用例

##### 用例1

    
    
    10,20,5
    5,5,2
    15
    

##### 用例2

    
    
    1,2,3,4,5
    1,2,3,4,5
    5
    

##### 用例3

    
    
    100,200,300
    50,100,150
    250
    

##### 用例4

    
    
    1,2,3,4,5
    1,2,3,4,5
    10
    

##### 用例5

    
    
    10,20,30
    5,10,15
    35
    

##### 用例6

    
    
    1,3,5,7,9
    2,4,6,8,10
    10
    

##### 用例7

    
    
    100,200,300,400,500
    50,100,150,200,250
    450
    

##### 用例8

    
    
    1,2,3,4,5,6,7,8,9
    1,2,3,4,5,6,7,8,9
    9
    

##### 用例9

    
    
    10,20,30,40,50
    5,10,15,20,25
    60
    

##### 用例10

    
    
    1,2,3,4,5,6,7,8,9,10
    1,2,3,4,5,6,7,8,9,10
    20
    

