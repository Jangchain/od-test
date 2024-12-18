## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

A、B两个人把苹果分为两堆，A希望按照他的计算规则等分苹果，他的计算规则是按照二进制加法计算，并且不计算进位  
12+5=9（1100 + 0101 = 9），B的计算规则是十进制加法，包括正常进位，B希望在满足A的情况下获取苹果重量最多。

输入苹果的数量和每个苹果重量，输出满足A的情况下B获取的苹果总重量。

如果无法满足A的要求，输出-1。

**数据范围**

  * 1 <= 总苹果数量 <= 20000
  * 1 <= 每个苹果重量 <= 10000

## 输入描述

输入第一行是苹果数量：3

输入第二行是每个苹果重量：3 5 6

## 输出描述

输出第一行是B获取的苹果总重量：11

## 示例1

输入

    
    
    3
    3 5 6
    

输出

    
    
    11
    

说明

> ## 示例2

输入

    
    
    8
    7258 6579 2602 6716 3050 3564 5396 1773
    

输出

    
    
    35165
    

说明

> ## 解题思路

这道题目要求你在给定的条件下计算A和B两个人分苹果的结果。A的要求是按照二进制加法（不进位）等分苹果，而B希望在满足A的要求下获取苹果总重量的最大值。如果无法满足A的要求，则输出-1。

### 题目分析

  1. **二进制加法不进位** ：

     * 二进制加法不进位的意思是直接对每一位进行相加，但不进行进位处理。
     * 比如：12（1100）和5（0101）相加的结果是9（1001），因为在二进制表示中： 
       * 1+0 = 1
       * 1+1 = 0（不进位）
       * 0+0 = 0
       * 0+1 = 1
  2. **题目要求** ：

     * 你需要找到一个办法，把苹果分成两堆，使得两堆苹果的总重量按二进制加法（不进位）结果相等。
     * 在满足这个条件的前提下，让B获取的苹果总重量最大。

### 示例分析

**示例 1**

  * 输入：
    
        3
    3 5 6
    

  * 分析： 
    * 可能的分法有： 
      * 3, 5 | 6
      * 3, 6 | 5
      * 5, 6 | 3
    * 根据二进制加法规则（不进位），3 + 5 = 6，3 + 6 = 5，5 + 6 = 3。
    * 通过手动验证，发现其中一堆可以是{5, 6}，另一堆是{3}，此时B获取的总重量最大为11。

**示例 2：**

    
    
    8
    7258 6579 2602 6716 3050 3564 5396 1773
    

  1. **计算总异或和：**  
首先计算所有苹果重量的异或和。如果总异或和不为 0，那么就不可能按照 A 的规则将苹果分成两堆，此时输出 `-1`。  
XOR sum = 7258 ⊕ 6579 ⊕ 2602 ⊕ 6716 ⊕ 3050 ⊕ 3564 ⊕ 5396 ⊕ 1773 \text{XOR sum}
= 7258 \oplus 6579 \oplus 2602 \oplus 6716 \oplus 3050 \oplus 3564 \oplus 5396
\oplus 1773 XOR sum=7258⊕6579⊕2602⊕6716⊕3050⊕3564⊕5396⊕1773

通过逐个异或，可以计算出：

XOR sum = 0 \text{XOR sum} = 0 XOR sum=0

因为总异或和为 0，所以有可能按照 A 的规则分堆。

  2. **找出 B 的最大重量：**  
因为 XOR 总和为 0，我们可以找到一种分法，使得两个堆的异或结果为 0。我们将总重量计算出来：

Total Sum = 7258 \+ 6579 \+ 2602 \+ 6716 \+ 3050 \+ 3564 \+ 5396 \+ 1773 =
36838 \text{Total Sum} = 7258 + 6579 + 2602 + 6716 + 3050 + 3564 + 5396 + 1773
= 36838 Total Sum=7258+6579+2602+6716+3050+3564+5396+1773=36838  
然后我们考虑两堆的分配，使得其中一个堆的重量最大。因为总异或和为 0，我们可以选择总重量中最小的那个数，从总和中减去，这样可以最大化 B 的重量：

Minimum Weight = min ⁡ ( 7258 , 6579 , 2602 , 6716 , 3050 , 3564 , 5396 , 1773
) = 1773 \text{Minimum Weight} = \min(7258, 6579, 2602, 6716, 3050, 3564,
5396, 1773) = 1773 Minimum
Weight=min(7258,6579,2602,6716,3050,3564,5396,1773)=1773

因此，B 可以获得的最大重量是：

Max Weight for B = Total Sum − Minimum Weight = 36838 − 1773 = 35165 \text{Max
Weight for B} = \text{Total Sum} - \text{Minimum Weight} = 36838 - 1773 =
35165 Max Weight for B=Total Sum−Minimum Weight=36838−1773=35165

  3. **输出结果：**

最终，输出 B 可以获取的最大苹果重量：

    
    
    35165
    

### 结论

  * 如果总异或和为 0，找到最小的重量，将其分给 A，B 的最大重量是总和减去这个最小重量。
  * 如果总异或和不为 0，则输出 `-1`。

## Java

    
    
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            // 创建一个扫描器对象，用于读取输入
            Scanner scanner = new Scanner(System.in);
            // 读取苹果的数量 n
            int n = scanner.nextInt();
            // 创建一个大小为 n 的数组，用于存储每个苹果的重量
            int[] a = new int[n];
            // 循环读取每个苹果的重量，并存储到数组中
            for (int i = 0; i < n; i++) {
                a[i] = scanner.nextInt();
            }
            // 初始化异或总和变量
            int sums = 0;
            // 初始化最小值变量为整型的最大值
            int min = Integer.MAX_VALUE;
            // 遍历所有苹果的重量
            for (int x : a) {
                // 按位异或操作，更新异或总和
                sums = sums ^ x;
                // 找到当前最小的苹果重量
                if (x < min) {
                    min = x;
                }
            }
            // 如果异或总和不为 0，则无法按 A 的规则分堆，输出 -1
            if (sums != 0) {
                System.out.println(-1);
            } else {
                // 计算所有苹果重量的总和
                int sum = 0;
                for (int x : a) {
                    sum += x;
                }
                // 输出 B 可以获取的最大苹果重量（总和减去最小的苹果重量）
                System.out.println(sum - min);
            }
        }
    }
    

## Python

    
    
    import sys
    
    # 读取苹果的数量 n
    n = int(input())
    # 读取每个苹果的重量并存储到列表 a 中
    a = list(map(int, input().split()))
    
    # 初始化异或总和
    sums = 0
    # 初始化最小值为系统的最大整数
    min_val = sys.maxsize
    # 遍历所有苹果的重量
    for x in a:
        # 按位异或操作，更新异或总和
        sums = sums ^ x
        # 找到当前最小的苹果重量
        if x < min_val:
            min_val = x
    
    # 如果异或总和不为 0，则无法按 A 的规则分堆，输出 -1
    if sums != 0:
        print(-1)
    else:
        # 计算所有苹果重量的总和
        total_sum = sum(a)
        # 输出 B 可以获取的最大苹果重量（总和减去最小的苹果重量）
        print(total_sum - min_val)
    

## JavaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    let n;  // 苹果数量
    let a;  // 每个苹果的重量数组
    
    // 读取输入的第一行，苹果数量 n
    rl.on('line', (inputN) => {
      n = parseInt(inputN);
      
      // 读取输入的第二行，苹果的重量列表
      rl.on('line', (inputA) => {
        a = inputA.split(' ').map(Number);
        
        // 初始化异或总和
        let sums = 0;
        // 初始化最小值为 JavaScript 中安全的最大整数
        let min_val = Number.MAX_SAFE_INTEGER;
        
        // 遍历所有苹果的重量
        a.forEach((x) => {
          // 按位异或操作，更新异或总和
          sums = sums ^ x;
          // 找到当前最小的苹果重量
          if (x < min_val) {
            min_val = x;
          }
        });
        
        // 如果异或总和不为 0，则无法按 A 的规则分堆，输出 -1
        if (sums !== 0) {
          console.log(-1);
        } else {
          // 计算所有苹果重量的总和
          const total_sum = a.reduce((sum, x) => sum + x, 0);
          // 输出 B 可以获取的最大苹果重量（总和减去最小的苹果重量）
          console.log(total_sum - min_val);
        }
        
        rl.close();  // 关闭读取接口
      });
    });
    

## C++

    
    
    #include <iostream>
    #include <vector>
    #include <limits>
    
    int main() {
        int n;
        // 读取苹果的数量 n
        std::cin >> n;
        // 创建一个大小为 n 的向量，用于存储每个苹果的重量
        std::vector<int> a(n);
        // 循环读取每个苹果的重量，并存储到向量中
        for (int i = 0; i < n; i++) {
            std::cin >> a[i];
        }
        // 初始化异或总和变量
        int sums = 0;
        // 初始化最小值变量为整型的最大值
        int min = std::numeric_limits<int>::max();
        // 遍历所有苹果的重量
        for (int x : a) {
            // 按位异或操作，更新异或总和
            sums = sums ^ x;
            // 找到当前最小的苹果重量
            if (x < min) {
                min = x;
            }
        }
        // 如果异或总和不为 0，则无法按 A 的规则分堆，输出 -1
        if (sums != 0) {
            std::cout << -1 << std::endl;
        } else {
            // 计算所有苹果重量的总和
            int sum = 0;
            for (int x : a) {
                sum += x;
            }
            // 输出 B 可以获取的最大苹果重量（总和减去最小的苹果重量）
            std::cout << sum - min << std::endl;
        }
        return 0;
    }
    

## C语言

    
    
    #include <stdio.h>
    #include <limits.h>  // 用于定义整型的最大值 INT_MAX
    
    int main() {
        int n;
        // 读取苹果的数量 n
        scanf("%d", &n);
        
        // 创建一个大小为 n 的数组，用于存储每个苹果的重量
        int a[n];
        
        // 循环读取每个苹果的重量，并存储到数组中
        for (int i = 0; i < n; i++) {
            scanf("%d", &a[i]);
        }
        
        // 初始化异或总和变量
        int sums = 0;
        // 初始化最小值变量为整型的最大值
        int min = INT_MAX;
        
        // 遍历所有苹果的重量
        for (int i = 0; i < n; i++) {
            // 按位异或操作，更新异或总和
            sums = sums ^ a[i];
            // 找到当前最小的苹果重量
            if (a[i] < min) {
                min = a[i];
            }
        }
        
        // 如果异或总和不为 0，则无法按 A 的规则分堆，输出 -1
        if (sums != 0) {
            printf("-1\n");
        } else {
            // 计算所有苹果重量的总和
            int sum = 0;
            for (int i = 0; i < n; i++) {
                sum += a[i];
            }
            // 输出 B 可以获取的最大苹果重量（总和减去最小的苹果重量）
            printf("%d\n", sum - min);
        }
        
        return 0;
    }
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b0d8ff6d53693bfcf6e1605b507f3ae3.png)

#### 完整用例

##### 用例1

    
    
    3
    3 5 6
    

##### 用例2

    
    
    5
    1 2 3 4 5
    

##### 用例3

    
    
    8
    7258 6579 2602 6716 3050 3564 5396 1773
    

##### 用例4

    
    
    12
    1 1 1 1 1 1 1 1 1 1 1 1
    

##### 用例5

    
    
    7
    10000 5000 2500 1250 625 312 156
    

##### 用例6

    
    
    12
    1 3 5 7 9 11 13 15 17 19 21 23
    

##### 用例7

    
    
    6
    2 2 2 2 2 2
    

##### 用例8

    
    
    4
    4 5 6 7
    

##### 用例9

    
    
    5
    4 5 6 7 8
    

##### 用例10

    
    
    2
    10000 10000
    

