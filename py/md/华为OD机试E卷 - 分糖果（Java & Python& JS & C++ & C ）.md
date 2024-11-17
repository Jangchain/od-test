## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

小明从糖果盒中随意抓一把糖果，每次小明会取出一半的糖果分给同学们。

当糖果不能平均分配时，小明可以选择从糖果盒中（假设盒中糖果足够）取出一个糖果或放回一个糖果。

小明最少需要多少次（取出、放回和平均分配均记一次），能将手中糖果分至只剩一颗。

## 输入描述

抓取的糖果数（<10000000000）：15

## 输出描述

最少分至一颗糖果的次数：5

## 示例1

输入

    
    
    15
    

输出

    
    
    5
    

说明

> 15+1=16;16/2=8;8/2=4;4/2=2;2/2=1;

## 示例2

输入

    
    
    6
    

输出

    
    
    3
    

说明

> 6/2=3,3-1=2,2/2=1

## 解题思路

题目要求的是找出最少的操作次数，使得手中的糖果数从给定数量减少至仅剩一颗。每次操作包括取出糖果、放回糖果以及平分糖果。这个问题实质上是一个贪心算法的应用，目标是尽快将糖果数量减至1。

  * 循环直到糖果数为1。

在循环中，检查当前糖果数是否为奇数。

    * 如果是奇数，检查加1后的数或减1后的数哪一个更适合下一步操作（即哪个能被2整除）。这里的贪心选择基于加1后能否被4整除，因为如果能被4整除，说明下一步可以继续平分两次。
  * 特殊处理当糖果数为3的情况，因为这是最快减至1的路径。

  * 每进行一次操作（不管是加1、减1还是分配），计数器加1。

## Java

    
    
     
    
    import java.util.Scanner;
    
    public class Main {
      public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        long x = scanner.nextLong();
        
        int count = 0;
    
        // 循环直到只剩一颗糖果
        for (long i = x; i != 1; i /= 2, count++) {
          // 当剩余糖果数量为3时，需要特殊处理
          if (i == 3) {
            count += 2; // 取出一个糖果，分给同学们，再放回一个糖果
            break;
          }
          // 当剩余糖果数量为奇数时，需要进行调整
          if (i % 2 != 0) {
            // 如果将剩余糖果数量加1再除以2后是偶数，则取出一个糖果
            if ((i + 1) / 2 % 2 == 0) {
              i++;
            } else { // 否则放回一个糖果
              i--;
            }
            count++;
          }
        }
    
        System.out.print(count);
      }
    }
    
    

## Python

    
    
    import math
    
    # 从标准输入读取糖果的初始数量
    x = int(input())
    # 初始化操作计数器
    count = 0
    
    # 当糖果数量不为1时，继续操作
    while x != 1:
        # 特殊情况，当糖果数为3时，直接通过两步操作减至1
        if x == 3:
            count += 2  # 直接加2到计数器（3-1=2，然后2/2=1）
            break
        # 如果当前糖果数是奇数，需要调整糖果数使其成为偶数
        if x % 2 != 0:
            # 选择加1还是减1：如果当前数加1后的一半是偶数，则加1
            if (x + 1) // 2 % 2 == 0:
                x += 1
            else:
                x -= 1  # 否则减1
            count += 1  # 调整操作也算一次操作
        # 糖果数除以2，模拟小明分糖果的过程
        x //= 2
        count += 1  # 分糖果的操作
    
    # 打印总的操作次数
    print(count)
    
    

## JavaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.on('line', (x) => {
      let count = 0;
    
      // 循环直到只剩一颗糖果
      for (let i = x; i !== 1; i /= 2, count++) {
         // 当剩余糖果数量为3时，需要特殊处理
        if (i === 3) {
          count += 2; // 取出一个糖果，分给同学们，再放回一个糖果
          break;
        }
        // 当剩余糖果数量为奇数时，需要进行调整
        if (i % 2 !== 0) {
          // 如果将剩余糖果数量加1再除以2后是偶数，则取出一个糖果
     
          let T = ((Number(i) + 1) / 2) % 2;
    
     
          if (T === 0) {
            i++;
          } else { // 否则放回一个糖果
            i--;
          }
          count++;
        }
      }
    
      console.log(count);
    
      rl.close();
    });
    
    
    

## C++

    
    
    #include <iostream>
    
    int main() {
      long long x;
      std::cin >> x;
      
      int count = 0;
    
      // 循环直到只剩一颗糖果
      for (long long i = x; i != 1; i /= 2, count++) {
        // 当剩余糖果数量为3时，需要特殊处理
        if (i == 3) {
          count += 2; // 取出一个糖果，分给同学们，再放回一个糖果
          break;
        }
        // 当剩余糖果数量为奇数时，需要进行调整
        if (i % 2 != 0) {
          // 如果将剩余糖果数量加1再除以2后是偶数，则取出一个糖果
          if ((i + 1) / 2 % 2 == 0) {
            i++;
          } else { // 否则放回一个糖果
            i--;
          }
          count++;
        }
      }
    
      std::cout << count;
    
      return 0;
    }
    
    

## C语言

    
    
    #include <stdio.h>
    
    int main() {
        long long x;
        scanf("%lld", &x); // 从标准输入读取糖果的初始数量
    
        int count = 0;
    
        // 循环直到只剩一颗糖果
        for (long long i = x; i != 1; i /= 2, count++) {
            // 当剩余糖果数量为3时，需要特殊处理
            if (i == 3) {
                count += 2; // 直接进行两次操作，将3减到1
                break;
            }
            // 当剩余糖果数量为奇数时，需要进行调整
            if (i % 2 != 0) {
                // 判断增加1后的数除以2是否为偶数，决定是加1还是减1
                if ((i + 1) / 2 % 2 == 0) {
                    i++;  // 如果加1后的数可以被2整除，则增加1
                } else {
                    i--;  // 否则减1
                }
                count++; // 对糖果数的调整也算作一次操作
            }
        }
    
        printf("%d", count); // 打印出执行的最小操作次数
    
        return 0;
    }
    
    

![fengmian](https://i-blog.csdnimg.cn/blog_migrate/c77072babe388e3cdff56d3275631de6.png)

#### 完整用例

##### 用例1

2

##### 用例2

6

##### 用例3

8

##### 用例4

10

##### 用例5

15

##### 用例6

100

##### 用例7

1234

##### 用例8

987654321

##### 用例9

9999999999

##### 用例10

1234567890

