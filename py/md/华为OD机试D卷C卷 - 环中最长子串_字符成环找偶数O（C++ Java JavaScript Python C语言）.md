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
    

说明：  
最长子字符串之一是 “alolob”，它包含’o’ 2个。

## 示例2

输入

    
    
    looxdolx
    

输出

    
    
    7
    

说明：  
最长子字符串是 “oxdolxl”，由于是首尾连接在一起的，所以最后一个 ‘x’ 和开头的 ‘l’是连接在一起的，此字符串包含 2 个’o’ 。

## 示例3

输入

    
    
    bcbcbc
    

输出

    
    
    6
    

说明：  
这个示例中，字符串 “bcbcbc” 本身就是最长的，因为 ‘o’ 都出现了 0 次。

## 解题思路

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
    

## javaScript

    
    
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

#### 文章目录

  * 题目描述
  * 输入描述
  *     * 备注
  * 输出描述
  * 示例1
  * 示例2
  * 示例3
  * 解题思路
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

![fengmian](https://i-blog.csdnimg.cn/blog_migrate/967e0cdd928cc9b566bc953a420c4dc2.png)

