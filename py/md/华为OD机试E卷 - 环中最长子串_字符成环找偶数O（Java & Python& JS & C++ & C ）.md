## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

给你一个字符串 s，字符串s首尾相连成一个环形 ，请你在环中找出 ‘o’ 字符出现了偶数次最长子字符串的长度。

## 输入描述

输入是一串小写字母组成的字符串

### 备注

1 <= s.length <= 5 x 10^5  
s 只包含小写英文字母

## 输出描述

输出是一个整数

## 示例1

输入

    
    
    alolobo
    

输出

    
    
    6
    

说明

> 最长子字符串之一是 “alolob”，它包含’o’ 2个。

## 示例2

输入

    
    
    looxdolx
    

输出

    
    
    7
    

说明

> 最长子字符串是 “oxdolxl”，由于是首尾连接在一起的，所以最后一个 ‘x’ 和开头的 ‘l’是连接在一起的，此字符串包含 2 个’o’ 。

## 示例3

输入

    
    
    bcbcbc
    

输出

    
    
    6
    

说明

> 这个示例中，字符串 “bcbcbc” 本身就是最长的，因为 ‘o’ 都出现了 0 次。

## 解题思路

#### 核心代码

    
    
            // 如果'o'字符出现的次数是偶数，则输出字符串的长度
            if (num % 2 == 0) {
                System.out.println(len);
            } else {
                // 如果'o'字符出现的次数是奇数，则输出字符串长度减1
                System.out.println(len - 1);
            }
    

  * 如果 ‘o’ 出现的次数为偶数，那么整个字符串就符合题目的要求：即包含偶数次的 ‘o’。
  * 如果 ‘o’ 出现的次数为奇数，则只能通过去掉一个字符（任意字符）来使得剩下的子字符串中的 ‘o’ 出现次数变为偶数。去掉一个字符后，最长的可能子字符串的长度就是 `len - 1`。

#### 为什么这样的方法有效？

  1. **偶数情况** ：

     * 如果总共的 ‘o’ 个数已经是偶数，那么从字符串的任意位置开始到任意位置结束的子字符串，也一定能找到包含偶数次 ‘o’ 的最长子串，这个子串就是原字符串本身。
  2. **奇数情况** ：

     * 如果 ‘o’ 的总数是奇数，那么无论如何，我们至少要移除一个字符才能使 ‘o’ 的数量变为偶数。因此，只需要输出 `len - 1` 即可。

## Java

    
    
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            // 创建一个Scanner对象，用于读取用户输入
            Scanner in = new Scanner(System.in);
            // 读取用户输入的字符串
            String input = in.nextLine();
            // 将输入的字符串转换为字符数组
            char[] chrs = input.toCharArray();
            // 获取字符串的长度
            int len = chrs.length;
            // 初始化'o'字符的计数器
            int num = 0;
            // 遍历字符数组，统计'o'字符的数量
            for (char chr : chrs) {
                if (chr == 'o') {
                    num += 1;
                }
            }
            // 如果'o'字符出现的次数是偶数，则输出字符串的长度
            if (num % 2 == 0) {
                System.out.println(len);
            } else {
                // 如果'o'字符出现的次数是奇数，则输出字符串长度减1
                System.out.println(len - 1);
            }
        }
    }
    
    

## Python

    
    
    # 读取用户输入的字符串
    input_str = input("")
    # 获取字符串的长度
    len_str = len(input_str)
    # 初始化'o'字符的计数器
    num = 0
    # 遍历字符串，统计'o'字符的数量
    for chr in input_str:
        if chr == 'o':
            num += 1
    # 如果'o'字符出现的次数是偶数，则输出字符串的长度
    if num % 2 == 0:
        print(len_str)
    else:
        # 如果'o'字符出现的次数是奇数，则输出字符串长度减1
        print(len_str - 1)
    
    

## JavaScript

    
    
    // 引入readline模块，用于读取用户输入
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    // 询问用户输入字符串
    readline.on('line', (input) => {
      // 获取字符串的长度
      const len = input.length;
      // 初始化'o'字符的计数器
      let num = 0;
      // 遍历字符串，统计'o'字符的数量
      for (let chr of input) {
        if (chr === 'o') {
          num += 1;
        }
      }
      // 如果'o'字符出现的次数是偶数，则输出字符串的长度
      if (num % 2 === 0) {
        console.log(len);
      } else {
        // 如果'o'字符出现的次数是奇数，则输出字符串长度减1
        console.log(len - 1);
      }
      readline.close();
    });
    
    

## C++

    
    
    #include <iostream>
    #include <string>
    using namespace std;
    
    int main() {
        // 创建一个字符串变量，用于存储用户输入
        string input;
        // 读取用户输入的字符串
        getline(cin, input);
        // 获取字符串的长度
        int len = input.size();
        // 初始化'o'字符的计数器
        int num = 0;
        // 遍历字符串，统计'o'字符的数量
        for (char chr : input) {
            if (chr == 'o') {
                num += 1;
            }
        }
        // 如果'o'字符出现的次数是偶数，则输出字符串的长度
        if (num % 2 == 0) {
            cout << len << endl;
        } else {
            // 如果'o'字符出现的次数是奇数，则输出字符串长度减1
            cout << len - 1 << endl;
        }
        return 0;
    }
    
    

## C语言

    
    
    #include <stdio.h>
    #include <string.h>
    
    int main() {
        char input[500001]; // 创建一个字符数组，用于存储用户输入的字符串，最大长度500000
        scanf("%s", input); // 读取用户输入的字符串
    
        int len = strlen(input); // 获取字符串的长度
        int num = 0; // 初始化'o'字符的计数器
    
        // 遍历字符串，统计'o'字符的数量
        for (int i = 0; i < len; i++) {
            if (input[i] == 'o') {
                num++;
            }
        }
    
        // 如果'o'字符出现的次数是偶数，则输出字符串的长度
        if (num % 2 == 0) {
            printf("%d\n", len);
        } else {
            // 如果'o'字符出现的次数是奇数，则输出字符串长度减1
            printf("%d\n", len - 1);
        }
    
        return 0;
    }
    
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b0d8ff6d53693bfcf6e1605b507f3ae3.png)

## 完整用例

### 用例1

looxdolx

### 用例2

alolobo

### 用例3

bcbcbc

### 用例4

o

### 用例5

oooooo

### 用例6

abcdefg

### 用例7

ooabcd

### 用例8

oabcd

### 用例9

oooabcd

### 用例10

oooabcdoo

