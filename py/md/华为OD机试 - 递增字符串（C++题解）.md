## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

定义字符串完全由 ‘A’ 和 ‘B’组成，当然也可以全是’A’或全是’B’。如果字符串从前往后都是以字典序排列的，那么我们称之为严格递增字符串。  
给出一个字符串s，允许修改字符串中的任意字符，即可以将任何的’A’修改成’B’，也可以将任何的’B’修改成’A’，  
求可以使s满足严格递增的最小修改次数。

0 < s的长度 < 100000。

## 输入描述

输入一个字符串： “AABBA”

## 输出描述

输出：1

## 示例1

输入

    
    
    AABBA
    

输出

    
    
    1
    

说明

> 修改最后一位得到AABBB。

## 解题思路

题目的核心要求是将一个由 `'A'` 和 `'B'` 组成的字符串修改为一个严格递增的字符串，即字符串中 `'A'` 必须全部出现在 `'B'`
之前。这意味着字符串应该呈现以下结构：

  * 所有 `'A'` 位于左侧（如果存在）。
  * 所有 `'B'` 位于右侧（如果存在）。

题目要求计算**最少的修改次数** ，以使给定的字符串满足这个严格递增的要求。

#### 题解思路

  1. **字符串拆分要求** ：字符串左侧尽量都是 `'A'`，右侧尽量都是 `'B'`。
  2. **思路** ： 
     * 遍历字符串的每一个可能的分割点，将左侧部分全是 `'A'`，右侧部分全是 `'B'`。
     * 对每个分割点，计算修改字符的次数。
  3. **如何计算最少修改次数** ： 
     * 对于每个分割点，记录左侧需要将 `'B'` 改为 `'A'` 的数量和右侧需要将 `'A'` 改为 `'B'` 的数量。
     * 最小化这些修改次数的和。

## Java

    
    
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            Scanner sc = new Scanner(System.in);
            String s = sc.next();
            int n = s.length();
    
            // 统计字符串中 'A' 的总数
            int count_A = 0;
            for (int i = 0; i < n; i++) {
                if (s.charAt(i) == 'A') count_A++;
            }
    
            // 如果字符串没有 'A' 或全是 'A'，则已满足条件，输出0
            if (count_A == 0 || count_A == n) {
                System.out.println(0);
                return;
            }
    
            // 初始化最小修改次数
            int ans = count_A;
            int left_A = 0;
    
            // 遍历字符串，计算分割点的最小修改次数
            for (int i = 0; i < n; i++) {
                if (s.charAt(i) == 'A') left_A++;
                // 更新最小修改次数
                ans = Math.min(ans, i + 1 - left_A + count_A - left_A);
            }
    
            System.out.println(ans);
        }
    }
    

## Python

    
    
    # 导入标准输入模块
    s = input()  # 从输入中读取字符串
    n = len(s)   # 获取字符串的长度
    
    # 统计字符串中 'A' 的总数
    count_A = s.count('A')
    
    # 如果字符串没有 'A' 或全是 'A'，则已满足条件，输出0
    if count_A == 0 or count_A == n:
        print(0)
    else:
        # 初始化最小修改次数
        ans = count_A
        left_A = 0  # 初始化左侧 'A' 的计数器
    
        # 遍历字符串，计算分割点的最小修改次数
        for i in range(n):
            if s[i] == 'A':  # 如果当前字符是 'A'，则左侧 'A' 计数器增加
                left_A += 1
            # 更新最小修改次数
            ans = min(ans, i + 1 - left_A + count_A - left_A)
    
        print(ans)  # 输出最小修改次数
    

## JavaScript

    
    
    const readline = require('readline');
    
    // 读取输入
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    rl.on('line', (s) => {
        const n = s.length; // 获取字符串的长度
    
        // 统计字符串中 'A' 的总数
        let count_A = 0;
        for (let i = 0; i < n; i++) {
            if (s[i] === 'A') count_A++;
        }
    
        // 如果字符串没有 'A' 或全是 'A'，则已满足条件，输出0
        if (count_A === 0 || count_A === n) {
            console.log(0);
        } else {
            let ans = count_A; // 初始化最小修改次数
            let left_A = 0;    // 初始化左侧 'A' 的计数器
    
            // 遍历字符串，计算分割点的最小修改次数
            for (let i = 0; i < n; i++) {
                if (s[i] === 'A') left_A++; // 如果当前字符是 'A'，则左侧 'A' 计数器增加
                ans = Math.min(ans, i + 1 - left_A + count_A - left_A); // 更新最小修改次数
            }
    
            console.log(ans); // 输出最小修改次数
        }
    
        rl.close();
    });
    

## C++

    
    
    #include <iostream>
    #include <string>
    #include <algorithm> // 引入算法库以使用 min 函数
    
    using namespace std;
    
    int main() {
        string s;
        cin >> s; // 读取输入字符串
        int n = s.length(); // 获取字符串长度
    
        // 统计字符串中 'A' 的总数
        int count_A = 0;
        for (char c : s) {
            if (c == 'A') count_A++;
        }
    
        // 如果字符串没有 'A' 或全是 'A'，则已满足条件，输出0
        if (count_A == 0 || count_A == n) {
            cout << 0 << endl;
            return 0;
        }
    
        int ans = count_A; // 初始化最小修改次数
        int left_A = 0;    // 初始化左侧 'A' 的计数器
    
        // 遍历字符串，计算分割点的最小修改次数
        for (int i = 0; i < n; i++) {
            if (s[i] == 'A') left_A++; // 如果当前字符是 'A'，左侧 'A' 计数器增加
            ans = min(ans, i + 1 - left_A + count_A - left_A); // 更新最小修改次数
        }
    
        cout << ans << endl; // 输出最小修改次数
        return 0;
    }
    

## C语言

    
    
    #include <stdio.h>
    #include <string.h>
    
    int main() {
        char s[1001]; // 假设输入字符串不超过1000字符
        scanf("%s", s); // 读取输入字符串
        int n = strlen(s); // 获取字符串长度
    
        // 统计字符串中 'A' 的总数
        int count_A = 0;
        for (int i = 0; i < n; i++) {
            if (s[i] == 'A') count_A++;
        }
    
        // 如果字符串没有 'A' 或全是 'A'，则已满足条件，输出0
        if (count_A == 0 || count_A == n) {
            printf("0\n");
            return 0;
        }
    
        int ans = count_A; // 初始化最小修改次数
        int left_A = 0;    // 初始化左侧 'A' 的计数器
    
        // 遍历字符串，计算分割点的最小修改次数
        for (int i = 0; i < n; i++) {
            if (s[i] == 'A') left_A++; // 如果当前字符是 'A'，左侧 'A' 计数器增加
            ans = ans < (i + 1 - left_A + count_A - left_A) ? ans : (i + 1 - left_A + count_A - left_A); // 更新最小修改次数
        }
    
        printf("%d\n", ans); // 输出最小修改次数
        return 0;
    }
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/de58225fadbebcc703b04c87556686e4.png)

