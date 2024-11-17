## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

给定坐标轴上的一组线段，线段的起点和终点均为整数并且长度不小于1，请你从中找到最少数量的线段，这些线段可以覆盖柱所有线段。

## 输入描述

第一行输入为所有线段的数量，不超过10000，后面每行表示一条线段，格式为"x,y"，x和y分别表示起点和终点，取值范围是[-105，105]。

## 输出描述

最少线段数量，为正整数

## 示例1

输入

    
    
    3
    1,4
    2,5
    3,6
    

输出

    
    
    2
    

说明

> ## 解题思路

题目的意思是要你找到一组线段，使得这些线段的数量最少，但能够完全覆盖给定的所有线段。每条线段由两个整数表示，分别为起点和终点，且保证长度不小于1（即起点小于终点）。

#### 示例分析

对于输入：

    
    
    3
    1,4
    2,5
    3,6
    

  * 线段1: 从1到4
  * 线段2: 从2到5
  * 线段3: 从3到6

可以看到，线段1覆盖了部分线段2，线段2又覆盖了部分线段3。实际上，你可以用两条线段来覆盖所有的线段，比如：

  1. 从1到6（覆盖所有线段）
  2. 从2到5（覆盖线段1和线段2）

但最优解是使用线段1（1到4）和线段3（3到6），因此输出为2。

## Java

    
    
    import java.util.Arrays;
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
    
            int n = Integer.parseInt(scanner.nextLine());
    
            int[][] ranges = new int[n][2];
            for (int i = 0; i < n; i++) {
                String[] input = scanner.nextLine().split(",");
                ranges[i][0] = Integer.parseInt(input[0]);
                ranges[i][1] = Integer.parseInt(input[1]);
            }
    
            // 按照线段起点从小到大排序
            Arrays.sort(ranges, (a, b) -> a[0] - b[0]);
    
            int[] dp = new int[n];
            Arrays.fill(dp, 1);
    
            for (int i = 1; i < n; i++) {
                for (int j = 0; j < i; j++) {
                    if (ranges[j][1] < ranges[i][0]) {
                        dp[i] = Math.max(dp[i], dp[j] + 1);
                    }
                }
            }
    
            int maxCovered = Arrays.stream(dp).max().getAsInt();
            int minSegments = n - maxCovered;
    
            System.out.println(minSegments);
        }
    }
    
    

## Python

    
    
    import sys
    
    def main():
        n = int(input().strip())
    
        ranges = []
        for _ in range(n):
            start, end = map(int, input().strip().split(','))
            ranges.append((start, end))
    
        # 按照线段起点从小到大排序
        ranges.sort(key=lambda x: x[0])
    
        dp = [1] * n
    
        for i in range(1, n):
            for j in range(i):
                if ranges[j][1] < ranges[i][0]:
                    dp[i] = max(dp[i], dp[j] + 1)
    
        max_covered = max(dp)
        min_segments = n - max_covered
    
        print(min_segments)
    
    if __name__ == "__main__":
        main()
    
    

## JavaScript

    
    
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    
    let inputCount = 0;
    let n = 0;
    const ranges = [];
    
    rl.on('line', (line) => {
      if (inputCount === 0) {
        n = parseInt(line, 10);
      } else {
        const input = line.split(',');
        ranges.push([parseInt(input[0], 10), parseInt(input[1], 10)]);
      }
    
      inputCount++;
    
      if (inputCount === n + 1) {
        main(n, ranges);
      }
    });
    
    function main(n, ranges) {
     
      ranges.sort((a, b) => a[0] - b[0]);
    
      const dp = new Array(n).fill(1);
    
      for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
          if (ranges[j][1] < ranges[i][0]) {
            dp[i] = Math.max(dp[i], dp[j] + 1);
          }
        }
      }
    
      const maxCovered = Math.max(...dp);
      const minSegments = n - maxCovered;
    
      console.log(minSegments);
    }
    
    

## C++

    
    
    #include <iostream>
    #include <vector>
    #include <sstream>
    #include <algorithm>
    using namespace std;
    int main() {
        int n;
        cin >> n;
        cin.ignore();
    
        vector<pair<int, int>> ranges(n);
        for (int i = 0; i < n; i++) {
            string input;
            getline(cin, input);
            istringstream iss(input);
            char comma;
            iss >> ranges[i].first >> comma >> ranges[i].second;
        }
    
        // 按照线段起点从小到大排序
        sort(ranges.begin(), ranges.end());
    
        vector<int> dp(n, 1);
    
        for (int i = 1; i < n; i++) {
            for (int j = 0; j < i; j++) {
                if (ranges[j].second < ranges[i].first) {
                    dp[i] = max(dp[i], dp[j] + 1);
                }
            }
        }
    
        int maxCovered = *max_element(dp.begin(), dp.end());
        int minSegments = n - maxCovered;
    
        cout << minSegments << endl;
    
        return 0;
    }
    
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    
    typedef struct {
        int first;
        int second;
    } Range;
    
    // 用于排序的比较函数
    int cmp(const void *a, const void *b) {
        Range *rangeA = (Range *)a;
        Range *rangeB = (Range *)b;
        return rangeA->first - rangeB->first;
    }
    
    int main() {
        int n;
        scanf("%d", &n);
        getchar();  // 吸收换行符
    
        Range *ranges = (Range *)malloc(n * sizeof(Range));  // 动态分配范围数组
    
        for (int i = 0; i < n; i++) {
            char comma;
            scanf("%d %c %d", &ranges[i].first, &comma, &ranges[i].second);
        }
    
        // 按照线段起点从小到大排序
        qsort(ranges, n, sizeof(Range), cmp);
    
        int *dp = (int *)malloc(n * sizeof(int));  // 动态分配DP数组
        for (int i = 0; i < n; i++) {
            dp[i] = 1;  // 初始化每个线段的最大覆盖数
        }
    
        for (int i = 1; i < n; i++) {
            for (int j = 0; j < i; j++) {
                if (ranges[j].second < ranges[i].first) {
                    if (dp[i] < dp[j] + 1) {
                        dp[i] = dp[j] + 1;  // 更新最大覆盖数
                    }
                }
            }
        }
    
        int maxCovered = 0;  // 最大覆盖数
        for (int i = 0; i < n; i++) {
            if (dp[i] > maxCovered) {
                maxCovered = dp[i];  // 计算最大覆盖数
            }
        }
    
        int minSegments = n - maxCovered;  // 最小线段数
        printf("%d\n", minSegments);  // 输出结果
    
        free(ranges);  // 释放动态分配的内存
        free(dp);  // 释放动态分配的内存
    
        return 0;
    }
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/caff9739150c9de3a3a9819625c5285b.png)

