## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

按照环保公司要求，小明需要在沙化严重的地区进行植树防沙工作，初步目标是种植一条直线的树带。由于有些区域目前不适合种植树木，所以只能在一些可以种植的点来种植树木。

在树苗有限的情况下，要达到最佳效果，就要尽量散开种植，不同树苗之间的最小间距要尽量大。给你一个适合种情树木的点坐标和一个树苗的数量，请帮小明选择一个最佳的最小种植间距。

例如，适合种植树木的位置分别为1,3,5,6,7,10,13
树苗数量是3，种植位置在1,7,13，树苗之间的间距都是6，均匀分开，就达到了散开种植的目的，最佳的最小种植间距是6

​

## 输入描述

第1行表示适合种树的坐标数量  
第2行是适合种树的坐标位置  
第3行是树苗的数量

例如：

    
    
    7  
    1 5 3 6 10 7 13  
    3
    

#### 备注

  * 位置范围为1~10000000
  * 种植树苗的数量范围2~10000000
  * 用例确保种桔的树苗数量不会超过有效种桔坐标数量

## 输出描述

最佳的最小种植间距

## 示例1

输入

    
    
    7
    1 5 3 6 10 7 13
    3
    

输出

    
    
    6
    

说明

> 3棵树苗分别种植在1，7，13位置时，树苗种植的最均匀，最小间距为6

## 解题思路

####

小明需要在一条直线上的某些可用位置种植树苗，目标是种植尽量均匀，最大化不同树苗之间的最小间距。问题是给定可用种树的点的坐标和树苗的数量，要求找到一个**最佳的最小间距**
，使得种植的树苗之间尽量分开。

#### 题目解读步骤：

  1. **适合种树的坐标数量** ：表示有多少个点可以种树。
  2. **适合种树的坐标位置** ：给出了一组适合种树的坐标（无序）。
  3. **树苗数量** ：表示要种植的树苗数量。

目标是选择种植点，使得所有树苗之间的最小间距尽可能大。

#### 问题的性质：

  * 间距越大，种植的树苗越分散，防沙效果越好。为了达到这种效果，我们需要确定一个**最小间距** ，在满足这个最小间距的情况下，种植尽量均匀。

#### 示例解析：

输入：

    
    
    7
    1 5 3 6 10 7 13
    3
    

说明：适合种植的位置是 `1, 5, 3, 6, 10, 7, 13`，共有 7 个可种植点，但我们只种 3 棵树。种植的目标是尽量使树苗分布均匀。

通过选择种植在坐标 `1, 7, 13` 时，树苗之间的最小间距是 6（7-1 = 6，13-7 = 6），这达到了最均匀分布的效果。所以最佳的最小间距为
`6`。

#### 思路：

  1. **排序坐标** ：首先，将适合种树的坐标进行排序，因为只有在排序后的坐标中，我们才能准确计算相邻点之间的距离。

  2. 二分查找最小间距

：通过二分查找的方式，尝试去确定一个最小间距，然后验证是否能种下所有树苗。

     * 使用一个二分查找算法来搜索最佳的最小间距。
     * 在每次尝试中，检查能否以当前的最小间距成功种下所有树苗。
     * 如果能种下，则尝试增大最小间距，反之缩小间距。

## Java

    
    
    import java.util.Arrays;
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
    
            // 输入适合种树的坐标数量
            int n = scanner.nextInt();
    
            // 输入适合种树的坐标位置
            int[] positions = new int[n];
            for (int i = 0; i < n; i++) {
                positions[i] = scanner.nextInt();
            }
    
            // 输入树苗的数量
            int m = scanner.nextInt();
    
            // 将坐标位置排序
            Arrays.sort(positions);
    
            // 初始化最小种植间距的最小值和最大值
            int minDistanceMin = 1, minDistanceMax = positions[n - 1] - positions[0];
    
            int ans = 0;
    
            //  最佳的最小种植间距
            for (int minDistance = minDistanceMin; minDistance <= minDistanceMax; minDistance++) {
                int count = 1;
                int curPos = positions[0];
    
                // 计算当前种植间距下可以种植的树苗数量
                for (int i = 1; i < n; i++) {
                    if (positions[i] - curPos >= minDistance) {
                        count++;
                        curPos = positions[i];
                    }
                }
    
                // 如果当前种植间距下可以种植的树苗数量大于等于目标树苗数量，更新答案并继续搜索更大的种植间距
                if (count >= m) {
                    ans = minDistance;
                    minDistanceMin = minDistance + 1;
                } else {
                    minDistanceMax = minDistance - 1;
                }
            }
    
            // 输出最佳的最小种植间距
            System.out.println(ans);
        }
    }
    
    

## Python

    
    
    import sys
    
    # 输入适合种树的坐标数量
    n = int(input())
    
    # 输入适合种树的坐标位置
    positions = list(map(int, input().split()))
    
    # 输入树苗的数量
    m = int(input())
    
    # 将坐标位置排序
    positions.sort()
    
    # 初始化最小种植间距的最小值和最大值
    minDistanceMin = 1
    minDistanceMax = positions[n - 1] - positions[0]
    
    ans = 0
    
    # 二分查找最佳的最小种植间距
    for minDistance in range(minDistanceMin, minDistanceMax + 1):
        count = 1
        curPos = positions[0]
    
        # 计算当前种植间距下可以种植的树苗数量
        for i in range(1, n):
            if positions[i] - curPos >= minDistance:
                count += 1
                curPos = positions[i]
    
        # 如果当前种植间距下可以种植的树苗数量大于等于目标树苗数量，更新答案并继续搜索更大的种植间距
        if count >= m:
            ans = minDistance
            minDistanceMin = minDistance + 1
        else:
            minDistanceMax = minDistance - 1
    
    # 输出最佳的最小种植间距
    print(ans)
    
    

## JavaScript

    
    
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    let n, positions, m;
    
    // 逐行读取输入
    rl.on('line', (line) => {
      // 第一行输入为适合种树的坐标数量
      if (!n) {
        n = parseInt(line);
      } 
      // 第二行输入为适合种树的坐标位置
      else if (!positions) {
        positions = line.split(' ').map(x => parseInt(x));
      } 
      // 第三行输入为树苗的数量
      else if (!m) {
        m = parseInt(line);
    
        // 将适合种树的坐标位置排序
    	positions.sort((a, b) => a - b);
        // 计算最佳的最小种植间距
        let minDistanceMin = 1; // 最小种植间距的最小值
        let minDistanceMax = positions[n - 1] - positions[0]; // 最小种植间距的最大值
        let ans = 0; // 最佳的最小种植间距
    
        // 通过二分查找确定最佳的最小种植间距
        for (let minDistance = minDistanceMin; minDistance <= minDistanceMax; minDistance++) {
          let count = 1; // 当前种植间距下的树苗数量
          let curPos = positions[0]; // 当前种植的位置
    
          // 遍历适合种树的坐标位置，计算当前种植间距下的树苗数量
          for (let i = 1; i < n; i++) {
            if (positions[i] - curPos >= minDistance) {
              count++;
              curPos = positions[i];
            }
          }
    
          // 如果当前种植间距下的树苗数量大于等于目标树苗数量m，则更新最佳的最小种植间距
          if (count >= m) {
            ans = minDistance;
            minDistanceMin = minDistance + 1;
          } else {
            minDistanceMax = minDistance - 1;
          }
        }
    
        // 输出最佳的最小种植间距
        console.log(ans);
      }
    });
    
    

## C++

    
    
    #include <iostream>
    #include <algorithm>
    using namespace std;
    
    int main() {
        int n;
        cin >> n;
    
        int positions[n];
        for (int i = 0; i < n; i++) {
            cin >> positions[i];
        }
    
        int m;
        cin >> m;
    
        sort(positions, positions + n);
    
        int minDistanceMin = 1, minDistanceMax = positions[n - 1] - positions[0];
    
        int ans = 0;
    
        for (int minDistance = minDistanceMin; minDistance <= minDistanceMax; minDistance++) {
            int count = 1;
            int curPos = positions[0];
    
            for (int i = 1; i < n; i++) {
                if (positions[i] - curPos >= minDistance) {
                    count++;
                    curPos = positions[i];
                }
            }
    
            if (count >= m) {
                ans = minDistance;
                minDistanceMin = minDistance + 1;
            } else {
                minDistanceMax = minDistance - 1;
            }
        }
    
        cout << ans << endl;
    
        return 0;
    }
    
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    
    // 比较函数，用于qsort排序
    int compare(const void *a, const void *b) {
        return (*(int *)a - *(int *)b);
    }
    
    int main() {
        int n, m;
    
        // 输入适合种树的坐标数量
        scanf("%d", &n);
    
        // 输入适合种树的坐标位置
        int *positions = (int *)malloc(n * sizeof(int));
        for (int i = 0; i < n; i++) {
            scanf("%d", &positions[i]);
        }
    
        // 输入树苗的数量
        scanf("%d", &m);
    
        // 将坐标位置排序
        qsort(positions, n, sizeof(int), compare);
    
        // 初始化最小种植间距的最小值和最大值
        int minDistanceMin = 1;
        int minDistanceMax = positions[n - 1] - positions[0];
        int ans = 0;
    
        // 通过二分查找寻找最佳的最小种植间距
        while (minDistanceMin <= minDistanceMax) {
            int minDistance = (minDistanceMin + minDistanceMax) / 2;
            int count = 1;
            int curPos = positions[0];
    
            // 计算当前种植间距下可以种植的树苗数量
            for (int i = 1; i < n; i++) {
                if (positions[i] - curPos >= minDistance) {
                    count++;
                    curPos = positions[i];
                }
            }
    
            // 如果当前种植间距下可以种植的树苗数量大于等于目标树苗数量，更新答案
            if (count >= m) {
                ans = minDistance;
                minDistanceMin = minDistance + 1;
            } else {
                minDistanceMax = minDistance - 1;
            }
        }
    
        // 输出最佳的最小种植间距
        printf("%d\n", ans);
    
        // 释放动态内存
        free(positions);
    
        return 0;
    }
    
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

#### 完整用例

##### 用例1

    
    
    7
    1 5 3 6 10 7 13
    3
    

##### 用例2

    
    
    6
    1 2 3 4 5 6
    2
    

##### 用例3

    
    
    10
    1 2 3 4 5 6 7 8 9 10
    4
    

##### 用例4

    
    
    10
    1 2 3 4 5 6 7 8 9 10
    5
    

##### 用例5

    
    
    10
    1 2 3 4 5 6 7 8 9 10
    5
    

##### 用例6

    
    
    10
    1 2 3 4 5 6 7 8 9 10
    6
    

##### 用例7

    
    
    10
    1 3 5 7 9 11 13 15 17 19
    5
    

##### 用例8

    
    
    10
    1 3 5 7 9 11 13 15 17 19
    4
    

##### 用例9

    
    
    10
    1 3 5 7 9 11 13 15 17 19
    3
    

##### 用例10

    
    
    10
    1 3 5 7 9 11 13 15 17 19
    2
    

