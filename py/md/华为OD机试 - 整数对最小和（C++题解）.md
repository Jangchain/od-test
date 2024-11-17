## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

给定两个整数数组array1、array2，数组元素按升序排列。

假设从array1、array2中分别取出一个元素可构成一对元素，现在需要取出k对元素，

并对取出的所有元素求和，计算和的最小值。

注意：

两对元素如果对应于array1、array2中的两个下标均相同，则视为同一对元素。

## 输入描述

输入两行数组array1、array2，每行首个数字为数组大小size(0 < size <= 100);

0 < array1[i] <= 1000

0 < array2[i] <= 1000

接下来一行为正整数k

0 < k <= array1.size() * array2.size()

## 输出描述

满足要求的最小和

## 示例1

输入

    
    
    3 1 1 2
    3 1 2 3
    2
    

输出

    
    
    3 1 1 2
    3 1 2 3
    2
    

说明

> 用例中，需要取2对元素
>
> 取第一个数组第0个元素与第二个数组第0个元素组成1对元素[1,1];
>
> 取第一个数组第1个元素与第二个数组第0个元素组成1对元素[1,1];
>
> 求和为1+1+1+1=4，为满足要求的最小和。

## 解题思路

## Java

    
    
    import java.util.ArrayList;
    import java.util.Collections;
    import java.util.List;
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
    
            // 输入第一个数组
            int size1 = scanner.nextInt();
            List<Integer> array1 = new ArrayList<>();
            for (int i = 0; i < size1; i++) {
                array1.add(scanner.nextInt());
            }
    
            // 输入第二个数组
            int size2 = scanner.nextInt();
            List<Integer> array2 = new ArrayList<>();
            for (int i = 0; i < size2; i++) {
                array2.add(scanner.nextInt());
            }
    
            // 输入需要取出的元素对数
            int k = scanner.nextInt();
    
            // 存储所有可能的元素对的和
            List<Integer> pairsSum = new ArrayList<>();
            for (int value1 : array1) {
                for (int value2 : array2) {
                    pairsSum.add(value1 + value2);
                }
            }
    
            // 对和进行排序
            Collections.sort(pairsSum);
    
            // 取前k个元素进行求和
            int minSum = 0;
            for (int i = 0; i < k; i++) {
                minSum += pairsSum.get(i);
            }
    
            System.out.println(minSum);
        }
    }
    
    
    
    

## Python

    
    
    # 从输入中获取数组array1，使用map函数将输入的字符串转换为整数，并使用列表切片[1:]去除第一个元素
    array1 = list(map(int, input().split()))[1:]
    
    # 从输入中获取数组array2，使用map函数将输入的字符串转换为整数，并使用列表切片[1:]去除第一个元素
    array2 = list(map(int, input().split()))[1:]
    
    # 从输入中获取k的值，将其转换为整数
    k = int(input())
    
    # 存储所有可能的元素对的和
    pairsSum = []
    for value1 in array1:
        for value2 in array2:
            pairsSum.append(value1 + value2)
    
    # 对和进行排序
    pairsSum.sort()
    
    # 取前k个元素进行求和
    minSum = sum(pairsSum[:k])
    
    # 输出最小和
    print(minSum)
    
    
    
    

## JavaScript

    
    
    const readline = require('readline');
    
    // 创建readline接口实例
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
     rl.on('line', (array1Input) => {
      // 将输入的字符串按空格分割为数组，并将每个元素转换为数字，然后去除第一个元素
      const array1 = array1Input.split(' ').map(Number).slice(1);
    
       rl.on('line', (array2Input) => {
        // 将输入的字符串按空格分割为数组，并将每个元素转换为数字，然后去除第一个元素
        const array2 = array2Input.split(' ').map(Number).slice(1);
    
         rl.on('line', (kInput) => {
          // 将输入的字符串转换为整数
          const k = parseInt(kInput);
    
          // 创建一个空数组pairsSum
          const pairsSum = [];
    
          // 嵌套循环，将array1和array2中的元素两两相加，并将结果存储到pairsSum中
          for (const value1 of array1) {
            for (const value2 of array2) {
              pairsSum.push(value1 + value2);
            }
          }
    
          // 对pairsSum中的元素进行排序
          pairsSum.sort();
    
          // 取出pairsSum中前k个元素，并使用reduce方法计算它们的和
          const minSum = pairsSum.slice(0, k).reduce((sum, value) => sum + value, 0);
    
          // 输出最小和
          console.log(minSum);
    
          // 关闭readline接口，结束程序的执行
          rl.close();
        });
      });
    });
    
    
    

## C++

    
    
    #include <iostream>
    #include <vector>
    #include <algorithm>
    
    int main() {
        // 输入数组array1的大小
        int size1;
        std::cin >> size1;
    
        // 创建大小为size1的vector来存储array1的元素
        std::vector<int> array1(size1);
        for (int i = 0; i < size1; i++) {
            // 逐个读取array1的元素并存储到vector中
            std::cin >> array1[i];
        }
    
        // 输入数组array2的大小
        int size2;
        std::cin >> size2;
    
        // 创建大小为size2的vector来存储array2的元素
        std::vector<int> array2(size2);
        for (int i = 0; i < size2; i++) {
            // 逐个读取array2的元素并存储到vector中
            std::cin >> array2[i];
        }
    
        // 输入k的值
        int k;
        std::cin >> k;
    
        // 创建一个vector来存储所有可能的元素对的和
        std::vector<int> pairsSum;
        for (int value1 : array1) {
            for (int value2 : array2) {
                // 将array1和array2中的元素两两相加，并将结果存储到pairsSum中
                pairsSum.push_back(value1 + value2);
            }
        }
    
        // 对pairsSum中的元素进行排序
        std::sort(pairsSum.begin(), pairsSum.end());
    
        // 计算前k个元素的和
        int minSum = 0;
        for (int i = 0; i < k; i++) {
            minSum += pairsSum[i];
        }
    
        // 输出最小和
        std::cout << minSum << std::endl;
    
        return 0;
    }
    
    
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    
    // 比较函数，用于qsort
    int compare(const void *a, const void *b) {
        return (*(int*)a - *(int*)b);
    }
    
    int main() {
        int size1, size2, k;
        // 输入数组array1和array2的大小
        scanf("%d", &size1);
        int array1[size1];
        for (int i = 0; i < size1; i++) {
            scanf("%d", &array1[i]);
        }
    
        scanf("%d", &size2);
        int array2[size2];
        for (int i = 0; i < size2; i++) {
            scanf("%d", &array2[i]);
        }
    
        // 输入k的值
        scanf("%d", &k);
    
        // 创建数组来存储所有可能的元素对的和
        int pairsSum[size1 * size2];
        int count = 0;
        for (int i = 0; i < size1; i++) {
            for (int j = 0; j < size2; j++) {
                // 将array1和array2中的元素两两相加，并将结果存储到pairsSum中
                pairsSum[count++] = array1[i] + array2[j];
            }
        }
    
        // 对pairsSum中的元素进行排序
        qsort(pairsSum, count, sizeof(int), compare);
    
        // 计算前k个元素的和
        int minSum = 0;
        for (int i = 0; i < k; i++) {
            minSum += pairsSum[i];
        }
    
        // 输出最小和
        printf("%d\n", minSum);
    
        return 0;
    }
    
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/6a7d61f29bd7cef8357349d1fd8c56e5.png)

#### 完整用例

##### 用例1

    
    
    1 1
    1 1
    1
    

##### 用例2

    
    
    3 1 1 1
    3 1 1 1
    3
    

##### 用例3

    
    
    3 1 2 3
    3 4 5 6
    2
    

##### 用例4

    
    
    3 3 2 1
    3 6 5 4
    3
    

##### 用例5

    
    
    4 1 1 1 1
    4 2 3 4 5
    4
    

##### 用例6

    
    
    3 1 2 3
    3 4 5 6
    9
    

##### 用例7

    
    
    3 1 2 3
    3 4 5 6
    3
    

##### 用例8

    
    
    3 1 2 3
    3 4 5 6
    1
    

##### 用例9

    
    
    3 1 2 3
    3 4 5 6
    6
    

##### 用例10

    
    
    3 1 2 3
    3 4 5 6
    7
    

