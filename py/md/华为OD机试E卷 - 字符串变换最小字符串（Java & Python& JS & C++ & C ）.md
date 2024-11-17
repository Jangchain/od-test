## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

给定一个字符串s，最多只能进行一次变换，返回变换后能得到的最小字符串（按照字典序进行比较）。

变换规则：交换字符串中任意两个不同位置的字符。

## 输入描述

一串小写字母组成的字符串s

### 备注

s是都是小写字符组成

1<=s.length<=1000

## 输出描述

一串小写字母组成的字符串s

## 示例1

输入

    
    
    abcdef
    

输出

    
    
    abcdef
    

说明

> abcdef已经是最小字符串，不需要交换。

## 示例2

输入

    
    
    bcdefa
    

输出

    
    
    acdefb
    

说明

> a和b进行位置交换，可以得到最小字符串。

## 解题思路

题目要求给定一个字符串`s`，通过最多进行一次字符交换，找到能够得到的按字典序排序最小的字符串。

### **题目的关键点：**

  1. 只能进行一次变换（交换两个不同位置的字符），或者不变换。
  2. 目标是找到最小的可能字符串，即字典序最小。
  3. 字典序是按照字母顺序进行排列的顺序，例如`"abc"` < `"acb"`。在字典序中，前面的字符越小，整个字符串的字典序就越小。

### **思路分析：**

  1. 首先，我们需要检查字符串当前是否已经是字典序最小的（即字符串已经是按字典序排好序的）。如果是，那么直接输出原字符串即可。
  2. 如果不是，我们需要找到如何通过交换两个字符使字符串变得更小。

### 代码解释

代码使用了贪心算法的思想。

**核心在于：**

  1. **逐字符比较** ：从字符串的最左边开始，逐字符比较原字符串与排序后的字符串，寻找第一个不匹配的字符。确保此位置的字符是尽可能的最小值。

  2. 如果存在多个字典序最小的字符，则选择尽可能靠后的。

**最小化的关键：**

代码接下来通过逐字符比较原字符串和排序后的字符串：

  * 当找到第一个不同的字符时，例如在`"dcab"`中，原字符串的第一个字符`'d'`与排序后字符串的第一个字符`'a'`不同。
  * 这个差异表明，如果将原字符串中的`'d'`换成`'a'`，字典序会变得更小。

**为什么第一次交换就足够（贪心）：**  
当我们找到第一个不同字符并进行交换后：

  * 我们确保了字符串的第一个字符已经是可能的最小字符。
  * 由于字典序的排列原则，最左边的字符影响最大。只要第一个字符已经是最小的，接下来的字符顺序无需再调整，因为再调整也不会得到更小的字典序。

### 示例

假设输入字符串是 `"bcaacd"`：

  1. **排序后的字符串** ：`"aabccd"`

  2. 逐字符比较

     * 第一个字符 `'b'` 不匹配，候选字符为两个 `'a'`。
  3. 选择最优候选

     * 查找并在两个 `'a'` 中选择靠后 的一个 `'a'` 进行交换，得到 `"acabcd"`。

## Java

    
    
    import java.util.Arrays;
    import java.util.Scanner;
    
    public class Main {
      public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine();
        
        // 对字符串进行排序
        char[] sortedArr = s.toCharArray();
        Arrays.sort(sortedArr);
    
        // 如果排序后的字符串与原字符串相同，则说明已经是最小字符串，直接输出
        if (new String(sortedArr).equals(s)) {
            System.out.println(s);
            return;
        }
    
        // 遍历原字符串
        StringBuilder sb = new StringBuilder(s);
        for (int i = 0; i < s.length(); i++) {
          // 如果当前字符与排序后的字符不相同，则进行交换
          if (s.charAt(i) != sortedArr[i]) {
            char tmp = sb.charAt(i);
            int swapIndex = -1;
            // 找到排序后的字符在原字符串中的位置
            for (int j = i + 1; j < s.length(); j++) {
              if (sb.charAt(j) == sortedArr[i]) {
                swapIndex = j;
              }
            }
            // 将原字符与排序后的字符交换
            sb.setCharAt(i, sortedArr[i]);
            sb.setCharAt(swapIndex, tmp);
            break;
          }
        }
    
        // 输出最小字符串
        System.out.println(sb.toString());
      }
    }
    
    
    

## Python

    
    
    s = input()
    
    # 对字符串进行排序
    sortedArr = sorted(s)
    
    # 如果排序后的字符串与原字符串相同，则说明已经是最小字符串，直接输出
    if ''.join(sortedArr) == s:
        print(s)
        exit()
    
    # 遍历原字符串
    sb = list(s)
    for i in range(len(s)):
        # 如果当前字符与排序后的字符不相同，则进行交换
        if s[i] != sortedArr[i]:
            tmp = sb[i]
            swapIndex = -1
            # 找到排序后的字符在原字符串中的位置
            for j in range(i + 1, len(s)):
                if sb[j] == sortedArr[i]:
                    swapIndex = j
            # 将原字符与排序后的字符交换
            sb[i] = sortedArr[i]
            sb[swapIndex] = tmp
            break
    
    # 输出最小字符串
    print(''.join(sb))
    
    
    
    

## JavaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.on('line', (s) => {
      // 对字符串进行排序
      const sortedArr = s.split('').sort();
    
      // 如果排序后的字符串与原字符串相同，则说明已经是最小字符串，直接输出
      if (sortedArr.join('') === s) {
        console.log(s);
        rl.close();
        return;
      }
    
      // 遍历原字符串
      let sb = s.split('');
      for (let i = 0; i < s.length; i++) {
        // 如果当前字符与排序后的字符不相同，则进行交换
        if (s.charAt(i) !== sortedArr[i]) {
          const tmp = sb[i];
          let swapIndex = -1;
          // 找到排序后的字符在原字符串中的位置
          for (let j = i + 1; j < s.length; j++) {
            if (sb[j] === sortedArr[i]) {
              swapIndex = j;
            }
          }
          // 将原字符与排序后的字符交换
          sb[i] = sortedArr[i];
          sb[swapIndex] = tmp;
          break;
        }
      }
    
      // 输出最小字符串
      console.log(sb.join(''));
      rl.close();
    });
    
    

## C++

    
    
    #include <iostream>
    #include <algorithm>
    #include <string>
    
    int main() {
        std::string s;
        std::cin >> s;
    
        // 对字符串进行排序
        std::string sortedArr = s;
        std::sort(sortedArr.begin(), sortedArr.end());
    
        // 如果排序后的字符串与原字符串相同，则说明已经是最小字符串，直接输出
        if (sortedArr == s) {
            std::cout << s << std::endl;
            return 0;
        }
    
        // 遍历原字符串
        std::string sb = s;
        for (int i = 0; i < s.length(); i++) {
            // 如果当前字符与排序后的字符不相同，则进行交换
            if (s[i] != sortedArr[i]) {
                char tmp = sb[i];
                int swapIndex = -1;
                // 找到排序后的字符在原字符串中的位置
                for (int j = i + 1; j < s.length(); j++) {
                    if (sb[j] == sortedArr[i]) {
                        swapIndex = j;
                    }
                }
                // 将原字符与排序后的字符交换
                sb[i] = sortedArr[i];
                sb[swapIndex] = tmp;
                break;
            }
        }
    
        // 输出最小字符串
        std::cout << sb << std::endl;
    
        return 0;
    }
    
    
    
    

## C语言

    
    
    #include <stdio.h>
    #include <string.h>
    #include <stdlib.h>
    
    #define MAX_STR_LEN 1000
    
    // 定义比较函数，用于 qsort 函数
    int cmp(const void *a, const void *b) {
        return *(char *)a - *(char *)b;
    }
    
    int main() {
        char s[MAX_STR_LEN], sortedArr[MAX_STR_LEN];
        scanf("%s", s);
    
        // 对字符串进行排序
        strcpy(sortedArr, s);
        qsort(sortedArr, strlen(sortedArr), sizeof(char), cmp);
    
        // 如果排序后的字符串与原字符串相同，则说明已经是最小字符串，直接输出
        if (strcmp(sortedArr, s) == 0) {
            printf("%s\n", s);
            return 0;
        }
    
        // 遍历原字符串
        for (int i = 0; i < strlen(s); i++) {
            // 如果当前字符与排序后的字符不相同，则进行交换
            if (s[i] != sortedArr[i]) {
                char tmp = s[i];
                int swapIndex = -1;
                // 找到排序后的字符在原字符串中的位置
                for (int j = i + 1; j < strlen(s); j++) {
                    if (s[j] == sortedArr[i]) {
                        swapIndex = j;
                    }
                }
                // 将原字符与排序后的字符交换
                s[i] = sortedArr[i];
                s[swapIndex] = tmp;
                break;
            }
        }
    
        // 输出最小字符串
        printf("%s\n", s);
    
        return 0;
    }
    
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/97c25bd04bdecc9388e1c02e729bdabe.png)

## 完整用例

### 用例1

abcdef

### 用例2

bcdefa

### 用例3

aaa

### 用例4

cba

### 用例5

dcba

### 用例6

abccba

### 用例7

abacaba

### 用例8

abcde

### 用例9

aaaaaa

### 用例10

dcbaabc

