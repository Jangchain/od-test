## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

给定一个由若干整数组成的数组nums
，可以在数组内的任意位置进行分割，将该数组分割成两个非空子数组（即左数组和右数组），分别对子数组求和得到两个值，计算这两个值的差值，请输出所有分割方案中，差值最大的值。

## 输入描述

第一行输入数组中元素个数n，1 < n ≤ 100000  
第二行输入数字序列，以空格进行分隔，数字取值为4字节整数

## 输出描述

输出差值的最大取值

## 示例1

输入

    
    
    6
    1 -2 3 4 -9 7
    

输出

    
    
    10
    

说明

> 将数组 nums 划分为两个非空数组的可行方案有:
>
> 左数组 = [1] 且 右数组 = [-2,3,4,-9,7]，和的差值 = | 1 - 3 | = 2  
>  左数组 = [1,-2] 且 右数组 = [3,4,-9,7]，和的差值 = | -1 - 5 | =6  
>  左数组 = [1,-2,3] 且 右数组 = [4,-9,7]，和的差值 = | 2 - 2 | = 0  
>  左数组 = [1,-2,3,4] 且右数组=[-9,7]，和的差值 = | 6 - (-2) | = 8，

## 解题思路

首先，定义两个变量`leftSum`和`rightSum`，分别表示左数组的和和右数组的和。初始化时，`leftSum`为0，`rightSum`为整个数组的和。

然后，定义一个变量`maxDiff`，表示差值的最大取值，初始化为0。

接下来，使用一个循环遍历数组，从第一个元素开始到倒数第二个元素。在每次循环中，更新`leftSum`和`rightSum`的值，并计算当前分割方案的差值。

具体的步骤如下：

  1. 将当前元素加到`leftSum`中。
  2. 将当前元素从`rightSum`中减去。
  3. 计算当前分割方案的差值，即`Math.abs(leftSum - rightSum)`。
  4. 更新`maxDiff`的值，取当前差值和`maxDiff`中的较大值。

最后，输出`maxDiff`的值。

## Java

    
    
    import java.util.Arrays;
    import java.util.Scanner;
    
    public class Main {
      public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
    
        // 输入数组长度
        int length = Integer.parseInt(scanner.nextLine());
        
        // 输入数字序列
        long[] numbers = Arrays.stream(scanner.nextLine().split(" ")).mapToLong(Long::parseLong).toArray();
    
        // 计算前缀和
        long[] prefixSum = new long[length];
        prefixSum[0] = numbers[0];
        for (int i = 1; i < length; i++) {
          prefixSum[i] = prefixSum[i-1] + numbers[i];
        }
    
        // 差值的最大取值
        long maxDifference = 0;
        
        // 计算差值的最大取值
        for (int i = 0; i < length - 1; i++) {
          long leftSum = prefixSum[i];
          long rightSum = prefixSum[length-1] - prefixSum[i];
          long difference = Math.abs(leftSum - rightSum);
          maxDifference = Math.max(maxDifference, difference);
        }
    
        // 输出差值的最大取值
        System.out.println(maxDifference);
      }
    }
    
    

## Python

    
    
    import sys
    
    # 输入数组长度
    length = int(sys.stdin.readline())
    
    # 输入数字序列
    numbers = list(map(int, sys.stdin.readline().split()))
    
    # 计算前缀和
    prefixSum = [0] * length
    prefixSum[0] = numbers[0]
    for i in range(1, length):
      prefixSum[i] = prefixSum[i-1] + numbers[i]
    
    # 差值的最大取值
    maxDifference = 0
    
    # 计算差值的最大取值
    for i in range(length - 1):
      leftSum = prefixSum[i]
      rightSum = prefixSum[length-1] - prefixSum[i]
      difference = abs(leftSum - rightSum)
      maxDifference = max(maxDifference, difference)
    
    # 输出差值的最大取值
    print(maxDifference)
    
    

## JavaScript

    
    
     
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.on('line', (length) => {
      rl.on('line', (numbers) => {
        numbers = numbers.split(' ').map(Number);
    
        // 计算前缀和
        let prefixSum = new Array(length);
        prefixSum[0] = numbers[0];
        for (let i = 1; i < length; i++) {
          prefixSum[i] = prefixSum[i-1] + numbers[i];
        }
    
        // 差值的最大取值
        let maxDifference = 0;
    
        // 计算差值的最大取值
        for (let i = 0; i < length - 1; i++) {
          let leftSum = prefixSum[i];
          let rightSum = prefixSum[length-1] - prefixSum[i];
          let difference = Math.abs(leftSum - rightSum);
          maxDifference = Math.max(maxDifference, difference);
        }
    
        // 输出差值的最大取值
        console.log(maxDifference);
    
        rl.close();
      });
    });
    
    

## C++

    
    
    #include <iostream>
    #include <sstream>
    #include <algorithm>
    #include <vector>
    using namespace std;
    
    int main() {
      string input;
      getline(cin, input);
      int length = stoi(input);
    
      getline(cin, input);
      istringstream iss(input);
      vector<long long> numbers(length);
      for (int i = 0; i < length; i++) {
        iss >> numbers[i];
      }
    
      vector<long long> prefixSum(length);
      prefixSum[0] = numbers[0];
      for (int i = 1; i < length; i++) {
        prefixSum[i] = prefixSum[i-1] + numbers[i];
      }
    
      long long maxDifference = 0;
      for (int i = 0; i < length - 1; i++) {
        long long leftSum = prefixSum[i];
        long long rightSum = prefixSum[length-1] - prefixSum[i];
        long long difference = abs(leftSum - rightSum);
        maxDifference = max(maxDifference, difference);
      }
    
      cout << maxDifference << endl;
    
      return 0;
    }
    
    
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    #include <math.h>
    
    int main() {
        // 输入数组长度
        int length;
        scanf("%d", &length);
    
        // 输入数字序列
        long long *numbers = (long long *)malloc(length * sizeof(long long));
        for (int i = 0; i < length; i++) {
            scanf("%lld", &numbers[i]);
        }
    
        // 计算前缀和数组
        long long *prefixSum = (long long *)malloc(length * sizeof(long long));
        prefixSum[0] = numbers[0];  // 第一个元素的前缀和即为其自身
        for (int i = 1; i < length; i++) {
            prefixSum[i] = prefixSum[i - 1] + numbers[i];  // 计算每个位置的前缀和
        }
    
        // 记录差值的最大取值
        long long maxDifference = 0;
    
        // 遍历所有的分割点，计算左右子数组和的差值
        for (int i = 0; i < length - 1; i++) {
            long long leftSum = prefixSum[i];  // 左子数组的和
            long long rightSum = prefixSum[length - 1] - prefixSum[i];  // 右子数组的和
            long long difference = llabs(leftSum - rightSum);  // 计算差值的绝对值
            if (difference > maxDifference) {
                maxDifference = difference;  // 更新最大差值
            }
        }
    
        // 输出差值的最大取值
        printf("%lld\n", maxDifference);
    
        // 释放动态分配的内存
        free(numbers);
        free(prefixSum);
    
        return 0;
    }
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

#### 完整用例

##### 用例1

6  
1 -2 3 4 -9 7

##### 用例2

3  
1 2 3

##### 用例3

5  
-1 -2 -3 -4 -5

##### 用例4

4  
10 20 30 40

##### 用例5

7  
-10 -5 0 5 10 15 20

##### 用例6

8  
1 1 1 1 1 1 1 1

##### 用例7

6  
-1 -2 -3 4 5 6

##### 用例8

9  
1 2 3 4 5 6 7 8 9

##### 用例9

10  
-1 -2 -3 -4 -5 -6 -7 -8 -9 -10

##### 用例10

2  
1000000000 -1000000000

