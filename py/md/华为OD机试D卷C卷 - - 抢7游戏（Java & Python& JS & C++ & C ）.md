## 题目描述

A、B两个人玩抢7游戏，游戏规则为：

A先报一个起始数字 X（10 ≤ 起始数字 ≤ 10000），B报下一个数字 Y （X - Y < 3），A再报一个数字 Z（Y - Z <
3），以此类推，直到其中一个抢到7，抢到7即为胜者；

在B赢得比赛的情况下，一共有多少种组合？

## 输入描述

起始数字 M

  * 10 ≤ M ≤ 10000

## 输出描述

B能赢得比赛的组合次数

## 用例

输入

    
    
    10
    

输出

    
    
    1
    

说明

> 只有一种赢的组合，A起始选择10，B接着选择9，A接着选择8，B接着选择7赢得胜利。

## 解题思路

#### 规则解析

  * 游戏由两位玩家A和B进行，其中A先报数，B跟报数，以此类推，直到某一方报出数字7为止。
  * 报数的规则是，每一次报出的数字必须比前一次报出的数字小，且两数之差小于3（即每次至少减1，最多减2）。

#### 解题步骤

  1. **初始化动态规划数组** ：

     * 创建两个数组`dpA`和`dpB`，长度为`M+2`。这两个数组分别用于存储在每个可能的游戏状态下，A和B赢得游戏的方式的数量。数组长度之所以选择`M+2`，是为了处理边界条件，避免在计算时数组越界。
  2. **基础状态设定** ：

     * `dpA[M]`被初始化为1，意味着如果游戏从`M`开始，且轮到A报数，A有一种方式直接赢得游戏 ，直接喊。
  3. **动态规划递推关系** ：

     * 从`M-1`开始递减至6，迭代计算每个状态下A和B赢得游戏的方式的数量。这个迭代过程基于游戏的规则：每次报数至少减1，最多减2。
     * 对于玩家B，在状态`i`下赢得游戏的方式的数量等于A玩家在状态`i+1`和`i+2`下赢得游戏的方式的数量之和。这表示，如果B要赢，A在接下来的两个状态（B的可能报数）中必须无法赢得游戏。
     * 同理，对于玩家A，在状态`i`下赢得游戏的方式的数量等于B玩家在状态`i+1`和`i+2`下赢得游戏方式的数量之和。这表示，A的胜利依赖于B在接下来的两个状态中的报数。

当用例输入为10时，我们可以通过模拟计算过程来理解动态规划数组如何更新。下面是详细的步骤：

#### 初始状态

  * 输入`M = 10`。
  * 初始化`dpA`和`dpB`数组，每个数组的大小为`M+2 = 12`，以便能访问到`dpA[10+1]`和`dpA[10+2]`而不越界。
  * 初始时，`dpA[10] = 1`，因为A玩家从10开始并且直接结束游戏（这里的游戏规则简化处理，实际上如果M不是7，A并不能在起始步骤赢得游戏，但这是按照代码逻辑的初始化）。

#### 计算过程

我们从`M-1=9`开始向下计算到7，更新`dpB`和`dpA`数组。

  1. **i = 9** ：

     * `dpB[9] = dpA[10] + dpA[11] = 1 + 0 = 1`。这表示B在9的状态下赢得游戏的方式有1种，即A在下一步选择10或11（实际上不可能选择11，但按初始化条件）。
     * `dpA[9] = dpB[10] + dpB[11] = 0 + 0 = 0`。因为B不能直接从10或11状态赢得游戏，所以A在9状态的胜利方式为0。
  2. **i = 8** ：

     * `dpB[8] = dpA[9] + dpA[10] = 0 + 1 = 1`。B在8的状态下赢得游戏的方式有1种，即A在下一步选择9或10。
     * `dpA[8] = dpB[9] + dpB[10] = 1 + 0 = 1`。A在8状态的胜利方式有1种，即B在下一步选择9或10。
  3. **i = 7** ：

     * `dpB[7] = dpA[8] + dpA[9] = 1 + 0 = 1`。B在7的状态下赢得游戏的方式有1种，即A在下一步选择8或9。

#### 结果

最终，`dpB[7]`的值为1，这意味着在起始数字为10的情况下，B能赢得比赛的组合次数为1种。

## C++

    
    
    #include <iostream>
    #include <string>
    #include <vector>
    #include <algorithm>
    
    using namespace std;
    
    // 字符串表示的大数加法函数
    // 参数a和b分别为两个大数的字符串表示
    string addBigNumbers(const string &a, const string &b) {
        string result; // 用于存储加法结果的字符串
        int carry = 0; // 进位，初始为0
        int i = a.size() - 1, j = b.size() - 1; // 分别设置两个指针指向a和b的最后一个字符（即最低位）
        while (i >= 0 || j >= 0 || carry) { // 当任一字符串未遍历完或存在进位时循环
            int sum = carry; // 当前位的和，初始为进位值
            if (i >= 0) sum += a[i--] - '0'; // 如果a未遍历完，加上a当前位的值，并将指针i向前移动
            if (j >= 0) sum += b[j--] - '0'; // 如果b未遍历完，加上b当前位的值，并将指针j向前移动
            result.push_back(sum % 10 + '0'); // 将当前位的和模10的结果转为字符后加到结果字符串中
            carry = sum / 10; // 计算新的进位
        }
        reverse(result.begin(), result.end()); // 将结果字符串反转，因为加法是从低位到高位进行的
        return result;
    }
    
    int main() {
        int M; // 用于存储输入的整数M
        
        cin >> M; // 从标准输入读取整数M
    
        // 使用vector<string>动态数组存储玩家A和B在每个可能的游戏状态下赢得游戏的方式的数量
        // 初始值设为"0"，数组大小为M+2以避免在计算过程中出现越界
        vector<string> dpA(M + 2, "0"), dpB(M + 2, "0");
        dpA[M] = "1"; // 初始化dpA[M]为1，表示当游戏处于初始状态M时，玩家A有一种方式赢得游戏
    
        // 从M-1开始递减至6，逐个计算每个可能的游戏状态下，玩家B和A赢得游戏的方式的数量
        for (int i = M - 1; i >= 6; --i) {
            dpB[i] = addBigNumbers(dpA[i + 1], dpA[i + 2]); // 计算玩家B在状态i下赢得游戏的方式的数量
            dpA[i] = addBigNumbers(dpB[i + 1], dpB[i + 2]); // 计算玩家A在状态i下赢得游戏的方式的数量
        }
    
        cout << dpB[7] << endl; // 最后，打印出玩家B在游戏状态7下赢得游戏的方式的数量
    
        return 0;
    }
    

## Java

    
    
    import java.math.BigInteger;
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            // 创建一个Scanner对象用于接收用户输入
            Scanner scanner = new Scanner(System.in);
    
            // 从用户输入中接收一个整数M，表示游戏的起始或初始条件
            int M = scanner.nextInt();
    
            // 初始化两个BigInteger数组dpA和dpB，分别用来存储玩家A和B在每个可能的游戏状态下赢得游戏的方式的数量
            // 数组大小为M+2，是因为在迭代过程中需要访问当前状态之后的两个状态，这样可以避免数组越界错误
            BigInteger[] dpA = new BigInteger[M + 2];
            BigInteger[] dpB = new BigInteger[M + 2];
    
            // 使用BigInteger.ZERO初始化数组
            for (int i = 0; i < M + 2; i++) {
                dpA[i] = BigInteger.ZERO;
                dpB[i] = BigInteger.ZERO;
            }
    
            // 初始化dpA[M]为1，表示当游戏处于初始状态M时，玩家A有一种方式赢得游戏
            dpA[M] = BigInteger.ONE;
    
            // 从M-1开始递减至6，逐个计算每个可能的游戏状态下，玩家B和A赢得游戏的方式的数量
            for (int i = M - 1; i > 6; i--) {
                // 计算玩家B在状态i下赢得游戏的方式的数量
                dpB[i] = dpA[i + 1].add(dpA[i + 2]);
    
                // 计算玩家A在状态i下赢得游戏的方式的数量
                dpA[i] = dpB[i + 1].add(dpB[i + 2]);
            }
    
            // 最后，打印出玩家B在游戏状态7下赢得游戏的方式的数量
            System.out.println(dpB[7]);
        }
    }
    

## javaScript

    
    
    const readline = require('readline');
    
    // 创建readline接口，用于从标准输入读取数据
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
     
    
    rl.on('line', (input) => {
      const M = parseInt(input); // 将用户输入的字符串转换为整数
    
      // 初始化两个BigInt数组dpA和dpB，分别用来存储玩家A和B在每个可能的游戏状态下赢得游戏的方式的数量
      // 数组大小为M+2，是因为在迭代过程中需要访问当前状态之后的两个状态，以避免数组越界错误
      const dpA = Array(M + 2).fill(BigInt(0));
      const dpB = Array(M + 2).fill(BigInt(0));
    
      // 初始化dpA[M]为1，表示当游戏处于初始状态M时，玩家A有一种方式赢得游戏
      dpA[M] = BigInt(1);
    
      // 从M-1开始递减至6，逐个计算每个可能的游戏状态下，玩家B和A赢得游戏的方式的数量
      for (let i = M - 1; i > 5; i--) {
        // 计算玩家B在状态i下赢得游戏的方式的数量
        // B玩家赢得方式的数量等于A玩家在状态i+1和i+2下赢得游戏方式的数量之和
        dpB[i] = dpA[i + 1] + dpA[i + 2];
    
        // 计算玩家A在状态i下赢得游戏的方式的数量
        // A玩家赢得方式的数量等于B玩家在状态i+1和i+2下赢得游戏方式的数量之和
        dpA[i] = dpB[i + 1] + dpB[i + 2];
      }
    
      // 最后，打印出玩家B在游戏状态7下赢得游戏的方式的数量
      console.log( dpB[7].toString());
      rl.close();
    });
    

## Python

    
    
    # 从用户输入中接收一个整数M，表示游戏的起始或初始条件
    M = int(input())
    
    # 初始化两个数组dpA和dpB，分别用来存储玩家A和B在每个可能的游戏状态下赢得游戏的方式的数量
    # 数组大小为M+2，是因为在迭代过程中需要访问当前状态之后的两个状态，这样可以避免数组越界错误
    dpA = [0] * (M+2)
    dpB = [0] * (M+2)
    
    # 初始化dpA[M]为1，表示当游戏处于初始状态M时，玩家A有一种方式赢得游戏,因为：A先叫可以直接叫M。
    dpA[M] = 1
    
    # 从M-1开始递减至6，逐个计算每个可能的游戏状态下，玩家B和A赢得游戏的方式的数量
    # 这里的循环范围和步长说明了游戏状态是逐步递减的，直到达到某个终止状态（这里为6）
    for i in range(M-1, 6, -1):
        # 计算玩家B在状态i下赢得游戏的方式的数量
        # B玩家赢得方式的数量等于A玩家在状态i+1和i+2下赢得游戏方式的数量之和
        # 这反映了游戏的某种规则，即玩家B的胜利依赖于接下来两个状态下玩家A的可能行为
        dpB[i] = dpA[i+1] + dpA[i+2]
    
        # 计算玩家A在状态i下赢得游戏的方式的数量
        # A玩家赢得方式的数量等于B玩家在状态i+1和i+2下赢得游戏方式的数量之和
        # 类似地，这也反映了游戏规则中的互动性，即玩家A的胜利依赖于接下来两个状态下玩家B的可能行为
        dpA[i] = dpB[i+1] + dpB[i+2]
    
    # 最后，打印出玩家B在游戏状态7下赢得游戏的方式的数量
    print(dpB[7])
    

## C语言

当输入为999，会报错，正在解决！！！

    
    
    #include <stdio.h>
    #include <string.h>
    #include <stdlib.h>
    
    // 将两个大数字符串相加的函数
    // 参数a和b分别为两个大数的字符串表示，result为存储结果的字符串数组
    void addBigNumbers(const char *a, const char *b, char *result) {
        int lenA = strlen(a); // a的长度
        int lenB = strlen(b); // b的长度
        int carry = 0; // 进位，初始为0
        int i = lenA - 1, j = lenB - 1, k = 0; // 分别设置两个指针指向a和b的最后一个字符，以及结果数组的当前位置
        int sum; // 用于存储当前位的和
        while (i >= 0 || j >= 0 || carry) {
            sum = carry; // 当前位的和，初始为进位值
            if (i >= 0) sum += a[i--] - '0'; // 如果a未遍历完，加上a当前位的值
            if (j >= 0) sum += b[j--] - '0'; // 如果b未遍历完，加上b当前位的值
            result[k++] = (sum % 10) + '0'; // 将当前位的和模10的结果转为字符后存储到结果数组中
            carry = sum / 10; // 更新进位
        }
        result[k] = '\0'; // 字符串结束符
        // 将结果字符串反转
        for (int start = 0, end = k - 1; start < end; start++, end--) {
            char temp = result[start];
            result[start] = result[end];
            result[end] = temp;
        }
    }
    
    int main() {
        int M;
        scanf("%d", &M); // 从标准输入读取整数M
    
        // 动态分配内存以存储每个可能的游戏状态下玩家A和B赢得游戏的方式的数量
        char **dpA = (char **)malloc((M + 2) * sizeof(char *));
        char **dpB = (char **)malloc((M + 2) * sizeof(char *));
        for (int i = 0; i < M + 2; i++) {
            dpA[i] = (char *)malloc(100); // 假设每个数字不超过100位
            dpB[i] = (char *)malloc(100);
            strcpy(dpA[i], "0"); // 初始化为"0"
            strcpy(dpB[i], "0");
        }
        strcpy(dpA[M], "1"); // 初始化dpA[M]为1
    
        char result[100]; // 用于存储加法结果的临时数组
        for (int i = M - 1; i >= 6; i--) {
            addBigNumbers(dpA[i + 1], dpA[i + 2], result);
            strcpy(dpB[i], result);
            addBigNumbers(dpB[i + 1], dpB[i + 2], result);
            strcpy(dpA[i], result);
        }
    
        printf("%s\n", dpB[7]); // 打印玩家B在游戏状态7下赢得游戏的方式的数量
    
        // 释放动态分配的内存
        for (int i = 0; i < M + 2; i++) {
            free(dpA[i]);
            free(dpB[i]);
        }
        free(dpA);
        free(dpB);
    
        return 0;
    }
    

## 完整用例

### 用例1

    
    
    10
    

### 用例2

    
    
    17
    

### 用例3

    
    
    18
    

### 用例4

    
    
    20
    

### 用例5

    
    
    15
    

### 用例6

    
    
    99
    

### 用例7

    
    
    88
    

### 用例8

    
    
    77
    

### 用例9

    
    
    66
    

### 用例10

    
    
    9999
    

#### 文章目录

  * 题目描述
  * 输入描述
  * 输出描述
  * 用例
  * 解题思路
  *     *       * 规则解析
      * 解题步骤
      * 初始状态
      * 计算过程
      * 结果
  * C++
  * Java
  * javaScript
  * Python
  * C语言
  * 完整用例
  *     * 用例1
    * 用例2
    * 用例3
    * 用例4
    * 用例5
    * 用例6
    * 用例7
    * 用例8
    * 用例9
    * 用例10

![fengmian](https://i-blog.csdnimg.cn/blog_migrate/5daec6f580fd54b5f8b8a1220f41f9cf.png)

