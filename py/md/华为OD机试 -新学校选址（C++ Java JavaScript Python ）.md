## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

为了解新学期学生暴涨的问题,小乐村要建立所新学校，  
考虑到学生上学安全问题,需要所有学生家到学校的距离最短。  
假设学校和所有学生家都走在一条直线之上,请问学校建立在什么位置，  
能使得到学校到各个学生家的距离和最短。

## 输入描述

第一行: 整数 n 取值范围 [1 ,1000 ],表示有 n户家庭。  
第二行: 一组整数 m 取值范围 [0, 10000 ] ，表示每户家庭的位置，所有家庭的位置都不相同。

## 输出描述

一个整数，确定的学校的位置。  
如果有多个位置，则输出最小的。

## 示例1

输入

    
    
    5
    0 20 40 10 30
    

输出

    
    
    20
    

说明

> 20到各个家庭的距离分别为20 0 20 10 10，总和为60，最小

## 示例2

输入

    
    
    1
    20
    

输出

    
    
    20
    

> 只有一组数据，20到20距离最小，为0

## 示例3

输入

    
    
    2
    0 20
    

输出

    
    
    0
    

说明

> 有多个地方可选，但是0数值最小

## 解题思路

题目要求确定一个最优的位置建学校，使得所有学生家到学校的距离和最小。家庭和学校都在一条直线上，且给定了每个家庭的位置。关键在于如何找到那个使总距离最小的位置。

在一维空间上，如果要最小化一个点到一组点的距离和，最佳位置是这些点的**中位数** 。中位数位置到其他点的距离和会比任何其他位置的距离和更小。

  * **偶数个点** 时，有两个中位数，取其中较小的即可。
  * **奇数个点** 时，中位数就是排序后的中间位置。

## Java

    
    
    import java.util.*;
    
    public class Main {
        public static void main(String[] args) {
            try (Scanner sc = new Scanner(System.in)) {
                int n = sc.nextInt();
                int[] positions = new int[n];
                
                // 输入每个家庭的位置
                for (int i = 0; i < n; i++) {
                    positions[i] = sc.nextInt();
                }
    
                // 排序位置数组
                Arrays.sort(positions);
    
                // 确定中位数位置并输出
                int medianIndex = (n % 2 == 0) ? (n / 2) - 1 : n / 2;
                System.out.println(positions[medianIndex]);
            }
        }
    }
    

## Python

    
    
     
    import sys
    
    # 从标准输入读取数据
    n = int(input())  # 读取家庭数量
    positions = list(map(int, input().split(" ")))  # 读取每个家庭的位置并转换为整数列表
    
    # 对位置数组进行排序
    positions.sort()
    
    # 根据家庭数量的奇偶性选择中位数位置
    median_index = (n // 2) - 1 if n % 2 == 0 else n // 2
    
    # 输出中位数位置的家庭位置
    print(positions[median_index])
    

## JavaScript

    
    
    // 引入 readline 模块用于从标准输入读取数据
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    let inputLines = [];
    
    // 读取输入
    rl.on('line', (line) => {
      inputLines.push(line);
    }).on('close', () => {
      const n = parseInt(inputLines[0]);  // 读取家庭数量
      const positions = inputLines[1].split(' ').map(Number);  // 读取每个家庭的位置并转换为整数数组
    
      // 对位置数组进行排序
      positions.sort((a, b) => a - b);
    
      // 根据家庭数量的奇偶性选择中位数位置
      const medianIndex = (n % 2 === 0) ? (n / 2) - 1 : Math.floor(n / 2);
    
      // 输出中位数位置的家庭位置
      console.log(positions[medianIndex]);
    });
    

## C++

    
    
    #include <iostream>
    #include <vector>
    #include <algorithm>
    using namespace std;
    
    int main() {
        int n;
        cin >> n;  // 读取家庭数量
        vector<int> positions(n);  // 定义一个数组用于存储家庭位置
    
        // 输入每个家庭的位置
        for (int i = 0; i < n; i++) {
            cin >> positions[i];
        }
    
        // 对位置数组进行排序
        sort(positions.begin(), positions.end());
    
        // 根据家庭数量的奇偶性选择中位数位置
        int medianIndex = (n % 2 == 0) ? (n / 2) - 1 : n / 2;
    
        // 输出中位数位置的家庭位置
        cout << positions[medianIndex] << endl;
    
        return 0;
    }
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    
    // 比较函数，用于排序
    int compare(const void *a, const void *b) {
        return (*(int *)a - *(int *)b);
    }
    
    int main() {
        int n;
        scanf("%d", &n);  // 读取家庭数量
        int positions[n];  // 定义一个数组用于存储家庭位置
    
        // 输入每个家庭的位置
        for (int i = 0; i < n; i++) {
            scanf("%d", &positions[i]);
        }
    
        // 使用 qsort 函数对位置数组进行排序
        qsort(positions, n, sizeof(int), compare);
    
        // 根据家庭数量的奇偶性选择中位数位置
        int medianIndex = (n % 2 == 0) ? (n / 2) - 1 : n / 2;
    
        // 输出中位数位置的家庭位置
        printf("%d\n", positions[medianIndex]);
    
        return 0;
    }
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/801cec0a98b3ae8c9c2e87bed0225447.png)

