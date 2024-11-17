## 最新华为OD机试+OJ刷题

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
在线OJ：[点击立即在线刷题 ](https://hydro.ac/d/hwod/p)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

又到了一年的末尾，项目组让小明负责新年晚会的小礼品发放工作。

为使得参加晚会的同事所获得的小礼品价值相对平衡，需要把小礼品根据价格进行分组，但每组最多只能包括两件小礼品，并且每个分组的价格总和不能超过一个价格上限。

为了保证发放小礼品的效率，小明需要找到分组数目最少的方案。

你的任务是写一个程序，找出分组数最少的分组方案，并输出 最少的分组数目 。

## 输入描述

第一行数据为分组礼品价格之和的上限

第二行数据为每个小礼品的价格，按照空格隔开，每个礼品价格不超过分组价格和的上限

## 输出描述

输出最小分组数量

## 示例1

输入

    
    
    5
    1 2 5
    

输出

    
    
    2
    

说明

> ## 解题思路

  1. 贪心策略 
     * 为了尽可能减少分组数量，我们希望每组尽量装满，且尽量选择价格较大的礼品与价格较小的礼品进行配对。
     * 我们可以**将礼品按价格从小到大排序** ，然后从价格最大的礼品开始尝试将其与最小的礼品配对。
     * 如果当前最大价格的礼品无法与任何其他礼品配对而不超过上限，则单独放入一组。
  2. 双指针算法 
     * 我们先对礼品数组按价格从小到大排序。
     * 使用两个指针：一个指向价格最小的礼品（`left`），一个指向价格最大的礼品（`right`）。
     * 从右向左遍历，尝试将`right`指向的礼品与`left`指向的礼品配对。
     * 如果配对成功，则将这两个礼品放入同一组，同时移动两个指针。
     * 如果无法配对，则将`right`指向的礼品单独分为一组，并只移动`right`指针。
     * 重复上述步骤，直到所有礼品都被分组。

## Java

    
    
    import java.util.ArrayList;
    import java.util.Collections;
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            int maxPrice = scanner.nextInt(); // 每组的价格上限
    
            ArrayList<Integer> prices = new ArrayList<>(); // 存储每个礼品的价格
            while (scanner.hasNextInt()) { // 输入每个礼品的价格
                prices.add(scanner.nextInt());
            }
    
            // 对礼品价格从小到大排序
            Collections.sort(prices);
    
            int groupCount = 0; // 记录最少的分组数
            int left = 0; // 左指针
            int right = prices.size() - 1; // 右指针
    
            // 使用双指针法进行分组
            while (left <= right) {
                if (prices.get(left) + prices.get(right) <= maxPrice) {
                    left++; // 左指针右移
                }
                right--; // 右指针左移
                groupCount++; // 形成一组
            }
    
            System.out.println(groupCount); // 输出最少的分组数量
            scanner.close();
        }
    }
    

## Python

    
    
    # 输入分组礼品价格之和的上限
    max_price = int(input())
    
    # 输入每个小礼品的价格，存入列表prices
    prices = list(map(int, input().split()))
    
    # 对礼品价格从小到大排序
    prices.sort()
    
    group_count = 0 # 记录最少的分组数
    left = 0 # 左指针
    right = len(prices) - 1 # 右指针
    
    # 使用双指针法进行分组
    while left <= right:
        if prices[left] + prices[right] <= max_price:
            left += 1 # 左指针右移
        right -= 1 # 右指针左移
        group_count += 1 # 形成一组
    
    print(group_count) # 输出最少的分组数量
    

## JavaScript

    
    
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    let maxPrice;
    let prices = [];
    
    // 读取输入
    rl.on('line', (input) => {
        if (maxPrice === undefined) {
            maxPrice = parseInt(input); // 每组的价格上限
        } else {
            prices = input.split(" ").map(Number); // 存储每个礼品的价格
        }
    }).on('close', () => {
        // 对礼品价格从小到大排序
        prices.sort((a, b) => a - b);
    
        let groupCount = 0; // 记录最少的分组数
        let left = 0; // 左指针
        let right = prices.length - 1; // 右指针
    
        // 使用双指针法进行分组
        while (left <= right) {
            if (prices[left] + prices[right] <= maxPrice) {
                left++; // 左指针右移
            }
            right--; // 右指针左移
            groupCount++; // 形成一组
        }
    
        console.log(groupCount); // 输出最少的分组数量
    });
    

## C++

    
    
    #include <iostream>
    #include <vector>
    #include <algorithm>
    using namespace std;
    
    int main() {
        int maxPrice; // 每组的价格上限
        cin >> maxPrice;
    
        vector<int> prices; // 存储每个礼品的价格
        int price;
        while (cin >> price) { // 输入每个礼品的价格
            prices.push_back(price);
        }
    
        // 对礼品价格从小到大排序，方便后续使用双指针匹配
        sort(prices.begin(), prices.end());
    
        int groupCount = 0; // 记录最少的分组数
        int left = 0; // 左指针指向价格最小的礼品
        int right = prices.size() - 1; // 右指针指向价格最大的礼品
    
        // 使用双指针法，从价格最低和最高的礼品开始尝试配对
        while (left <= right) { // 当左右指针未交叉时继续循环
            // 如果左右指针对应的礼品价格之和不超过上限
            if (prices[left] + prices[right] <= maxPrice) {
                left++; // 左指针右移，将较便宜的礼品与较贵的礼品配对
            }
            right--; // 无论是否配对成功，右指针都左移，将最贵的礼品放入当前组
            groupCount++; // 每次形成一组时计数加一
        }
    
        cout << groupCount << endl; // 输出最少的分组数量
        return 0;
    }
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    
    int compare(const void *a, const void *b) {
        return (*(int*)a - *(int*)b);
    }
    
    int main() {
        int maxPrice; // 每组的价格上限
        scanf("%d", &maxPrice);
    
        int prices[1000]; // 假设最多有1000个礼品
        int n = 0;
    
        // 读取礼品价格
        while (scanf("%d", &prices[n]) != EOF) {
            n++;
        }
    
        // 对礼品价格从小到大排序
        qsort(prices, n, sizeof(int), compare);
    
        int groupCount = 0; // 记录最少的分组数
        int left = 0; // 左指针
        int right = n - 1; // 右指针
    
        // 使用双指针法进行分组
        while (left <= right) {
            if (prices[left] + prices[right] <= maxPrice) {
                left++; // 左指针右移
            }
            right--; // 右指针左移
            groupCount++; // 形成一组
        }
    
        printf("%d\n", groupCount); // 输出最少的分组数量
        return 0;
    }
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/1282debf19451b6cdd5c627e7d8c65ef.png)

