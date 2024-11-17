## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

对于一个连续正整数组成的序列，可以将其拼接成一个字符串，再将字符串里的部分字符打乱顺序。如序列8 9 10 11
12，拼接成的字符串为89101112，打乱一部分字符后得到90811211，原来的正整数10就被拆成了0和1。

现给定一个按如上规则得到的打乱字符的字符串，请将其还原成连续正整数序列，并输出序列中最小的数字。

## 输入描述

输入一行，为打乱字符的字符串和正整数序列的长度，两者间用空格分隔，字符串长度不超过200，正整数不超过1000，保证输入可以还原成唯一序列。

## 输出描述

输出一个数字，为序列中最小的数字。

## 示例1

输入

    
    
    19801211 5
    

输出

    
    
    8
    

说明

> ## 示例2

输入

    
    
    432111111111 4
    

输出

    
    
    111
    

说明

> ## 解题思路

题目要求从一个打乱了部分字符的字符串中还原出一个连续的正整数序列，找出其中最小的数字。

##### 题目流程和解释：

  1. **输入内容** ： 
     * **字符串部分** ：表示将某个连续正整数序列拼接后、打乱部分字符得到的字符串。
     * **序列长度部分** ：表示原来的连续正整数序列中有多少个数字。
  2. **任务** ： 
     * 根据打乱后的字符串和给定的序列长度，找出原来连续正整数序列的最小数字。
     * **注意** ：输入字符串是由原来的一些连续正整数组成的，但某些数字可能被拆分成了单个字符，且这些字符被打乱后可能不再连贯。因此，需要将这些打乱的字符重新组合成连续的正整数。
  3. **关键点** ： 
     * **字符打乱** ：原本连续的数字可能在字符串中被拆分并打乱顺序，因此需要将它们重新组合成完整的数字。
     * **唯一还原性** ：题目保证每一个输入都能还原成唯一的连续正整数序列，这意味着不存在多个可能的解。

#### 示例解析

**示例 1** ：

    
    
    输入：19801211 5
    输出：8
    

解释：

  * 打乱后的字符串是 `19801211`，序列长度是 `5`。
  * 还原成的连续正整数序列为 `8 9 10 11 12`，最小的数字是 `8`。

**示例 2** ：

    
    
    输入：432111111111 4
    输出：111
    

解释：

  * 打乱后的字符串是 `432111111111`，序列长度是 `4`。
  * 还原成的连续正整数序列为 `111 112 113 114`，最小的数字是 `111`。

#### 总结

题目的核心是通过排列组合字符找到能组成连续正整数序列的方案，并返回其中最小的数字。
统计打乱字符的字符串中各字符的数量。然后遍历所有可能的连续整数序列，对于每个序列，检查序列中的字符数量是否与打乱字符的字符串中各字符数量一致。如果找到一个匹配的序列，输出序列中最小的数字并结束循环。

## Java

    
    
    import java.util.HashMap;
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            // 创建一个Scanner对象，用于读取输入
            Scanner sc = new Scanner(System.in);
    
            // 读取输入的打乱字符的字符串
            String s = sc.next();
            // 读取输入的正整数序列的长度
            int k = sc.nextInt();
    
            // 创建一个HashMap，用于统计打乱字符的字符串中各字符的数量
            HashMap<Character, Integer> base = new HashMap<>();
            // 遍历打乱字符的字符串
            for (int i = 0; i < s.length(); i++) {
                // 获取字符串中的字符
                char c = s.charAt(i);
                // 将字符及其数量存入HashMap
                base.put(c, base.getOrDefault(c, 0) + 1);
            }
    
            // 初始化滑动窗口的起始位置
            int i = 1;
            // 当滑动窗口的起始位置小于等于1000减去序列长度加1时，继续循环
            while (i <= 1000 - k + 1) {
                // 创建一个HashMap，用于计算滑动窗口内各字符的数量
                HashMap<Character, Integer> count = new HashMap<>();
                // 遍历滑动窗口内的正整数
                for (int j = i; j < i + k; j++) {
                    // 将正整数转换为字符串
                    String num = String.valueOf(j);
                    // 遍历正整数字符串中的字符
                    for (int m = 0; m < num.length(); m++) {
                        // 获取正整数字符串中的字符
                        char c = num.charAt(m);
                        // 将字符及其数量存入HashMap
                        count.put(c, count.getOrDefault(c, 0) + 1);
                    }
                }
    
                // 初始化一个布尔变量，用于判断滑动窗口内各字符数量是否与打乱字符的字符串中各字符数量一致
                boolean isMatch = true;
                // 遍历打乱字符的字符串中的字符
                for (Character c : base.keySet()) {
                    // 如果滑动窗口内的字符数量与打乱字符的字符串中的字符数量不一致，将isMatch设为false并跳出循环
                    if (!count.containsKey(c) || count.get(c) - base.get(c) != 0) {
                        isMatch = false;
                        break;
                    }
                }
    
                // 如果滑动窗口内各字符数量与打乱字符的字符串中各字符数量一致，则输出滑动窗口的起始位置并返回
                if (isMatch) {
                    System.out.println(i);
                    return;
                }
    
                // 更新滑动窗口的起始位置
                i++;
            }
        }
    }
    
    

## Python

    
    
    import sys
    from collections import defaultdict
    
    # 读取输入的打乱字符的字符串和正整数序列的长度
    s, k = input().strip().split()
    k = int(k)
    
    # 创建一个字典，用于统计打乱字符的字符串中各字符的数量
    base = defaultdict(int)
    for c in s:
        base[c] += 1
    
    # 初始化滑动窗口的起始位置
    i = 1
    # 当滑动窗口的起始位置小于等于1000减去序列长度加1时，继续循环
    while i <= 1000 - k + 1:
        # 创建一个字典，用于计算滑动窗口内各字符的数量
        count = defaultdict(int)
        # 遍历滑动窗口内的正整数
        for j in range(i, i + k):
            # 将正整数转换为字符串
            num = str(j)
            # 遍历正整数字符串中的字符
            for c in num:
                # 将字符及其数量存入字典
                count[c] += 1
    
        # 初始化一个布尔变量，用于判断滑动窗口内各字符数量是否与打乱字符的字符串中各字符数量一致
        is_match = True
        # 遍历打乱字符的字符串中的字符
        for c in base:
            # 如果滑动窗口内的字符数量与打乱字符的字符串中的字符数量不一致，将is_match设为False并跳出循环
            if count[c] != base[c]:
                is_match = False
                break
    
        # 如果滑动窗口内各字符数量与打乱字符的字符串中各字符数量一致，则输出滑动窗口的起始位置并退出循环
        if is_match:
            print(i)
            break
    
        # 更新滑动窗口的起始位置
        i += 1
    

## JavaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.on('line', (input) => {
      // 输入打乱字符的字符串和正整数序列的长度
      const s = input.split(' ')[0];
      const k = parseInt(input.split(' ')[1]);
    
      // 创建一个Map，用于统计打乱字符的字符串中各字符的数量
      const base = new Map();
      for (const c of s) {
        base.set(c, (base.get(c) || 0) + 1);
      }
    
      // 初始化滑动窗口的起始位置
      let i = 1;
      // 当滑动窗口的起始位置小于等于1000减去序列长度加1时，继续循环
      while (i <= 1000 - k + 1) {
        // 创建一个Map，用于计算滑动窗口内各字符的数量
        const count = new Map();
        // 遍历滑动窗口内的正整数
        for (let j = i; j < i + k; j++) {
          // 将正整数转换为字符串
          const num = String(j);
          // 遍历正整数字符串中的字符
          for (const c of num) {
            // 将字符及其数量存入Map
            count.set(c, (count.get(c) || 0) + 1);
          }
        }
    
        // 初始化一个布尔变量，用于判断滑动窗口内各字符数量是否与打乱字符的字符串中各字符数量一致
        let isMatch = true;
        // 遍历打乱字符的字符串中的字符
        for (const c of base.keys()) {
          // 如果滑动窗口内的字符数量与打乱字符的字符串中的字符数量不一致，将isMatch设为false并跳出循环
          if (!count.has(c) || count.get(c) - base.get(c) !== 0) {
            isMatch = false;
            break;
          }
        }
    
        // 如果滑动窗口内各字符数量与打乱字符的字符串中各字符数量一致，则输出滑动窗口的起始位置并返回
        if (isMatch) {
          console.log(i);
          return;
        }
    
        // 更新滑动窗口的起始位置
        i++;
      }
    });
    

## C++

    
    
    #include <iostream>
    #include <string>
    #include <unordered_map>
    
    int main() {
        // 创建一个字符串变量，用于读取输入的打乱字符的字符串
        std::string s;
        // 创建一个整数变量，用于读取输入的正整数序列的长度
        int k;
    
        // 读取输入
        std::cin >> s >> k;
    
        // 创建一个unordered_map，用于统计打乱字符的字符串中各字符的数量
        std::unordered_map<char, int> base;
        // 遍历打乱字符的字符串
        for (char c : s) {
            // 将字符及其数量存入unordered_map
            base[c]++;
        }
    
        // 初始化滑动窗口的起始位置
        int i = 1;
        // 当滑动窗口的起始位置小于等于1000减去序列长度加1时，继续循环
        while (i <= 1000 - k + 1) {
            // 创建一个unordered_map，用于计算滑动窗口内各字符的数量
            std::unordered_map<char, int> count;
            // 遍历滑动窗口内的正整数
            for (int j = i; j < i + k; j++) {
                // 将正整数转换为字符串
                std::string num = std::to_string(j);
                // 遍历正整数字符串中的字符
                for (char c : num) {
                    // 将字符及其数量存入unordered_map
                    count[c]++;
                }
            }
    
            // 初始化一个布尔变量，用于判断滑动窗口内各字符数量是否与打乱字符的字符串中各字符数量一致
            bool isMatch = true;
            // 遍历打乱字符的字符串中的字符
            for (const auto& p : base) {
                char c = p.first;
                // 如果滑动窗口内的字符数量与打乱字符的字符串中的字符数量不一致，将isMatch设为false并跳出循环
                if (count[c] != base[c]) {
                    isMatch = false;
                    break;
                }
            }
    
            // 如果滑动窗口内各字符数量与打乱字符的字符串中各字符数量一致，则输出滑动窗口的起始位置并返回
            if (isMatch) {
                std::cout << i << std::endl;
                return 0;
            }
    
            // 更新滑动窗口的起始位置
            i++;
        }
    
        return 0;
    }
    

## C语言

    
    
    #include <stdio.h>
    #include <string.h>
    #include <stdbool.h>
    
    int main() {
        char s[201]; // 输入的打乱字符的字符串，长度不超过200
        int k;       // 正整数序列的长度
    
        // 读取输入
        scanf("%s %d", s, &k);
    
        int base[10] = {0}; // 用于统计打乱字符的字符串中各数字字符的数量
    
        // 遍历打乱字符的字符串，统计各字符的数量
        for (int i = 0; i < strlen(s); i++) {
            base[s[i] - '0']++; // 将字符数字转为整型进行统计
        }
    
        // 初始化滑动窗口的起始位置
        int i = 1;
        
        // 当滑动窗口的起始位置小于等于1000减去序列长度加1时，继续循环
        while (i <= 1000 - k + 1) {
            int count[10] = {0}; // 用于计算滑动窗口内各字符的数量
    
            // 遍历滑动窗口内的正整数
            for (int j = i; j < i + k; j++) {
                char num[6];
                sprintf(num, "%d", j); // 将正整数转换为字符串
                
                // 遍历正整数字符串中的字符，统计各字符数量
                for (int x = 0; x < strlen(num); x++) {
                    count[num[x] - '0']++; // 将字符数字转为整型进行统计
                }
            }
    
            // 判断滑动窗口内各字符数量是否与打乱字符的字符串中各字符数量一致
            bool isMatch = true;
            for (int c = 0; c < 10; c++) {
                if (count[c] != base[c]) {
                    isMatch = false;
                    break;
                }
            }
    
            // 如果滑动窗口内各字符数量一致，输出滑动窗口的起始位置并退出程序
            if (isMatch) {
                printf("%d\n", i);
                return 0;
            }
    
            // 更新滑动窗口的起始位置
            i++;
        }
    
        return 0;
    }
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

## 完整用例

### 用例1

    
    
    19801211 5
    

### 用例2

    
    
    432111111111 4
    

### 用例3

    
    
    123 3
    

### 用例4

    
    
    2431 4
    

### 用例5

    
    
    910111213 5
    

### 用例6

    
    
    123456666666 6
    

### 用例7

    
    
    65777877 4
    

### 用例8

    
    
    87901 4
    

### 用例9

    
    
    98011121 5
    

### 用例10

    
    
    1410111213 5
    

