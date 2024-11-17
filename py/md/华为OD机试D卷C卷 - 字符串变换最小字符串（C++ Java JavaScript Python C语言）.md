## 题目描述

给定一个字符串s，最多只能进行一次变换，返回变换后能得到的最小字符串（按照字典序进行比较）。

变换规则：交换字符串中任意两个不同位置的字符。

## 输入描述

一串小写字母组成的字符串s

## 输出描述

按照要求进行变换得到的最小字符串。

## 用例

输入| abcdef  
---|---  
输出| abcdef  
说明| abcdef已经是最小字符串，不需要交换。  
输入| bcdefa  
---|---  
输出| acdefb  
说明| a和b进行位置交换，可以得到最小字符串。  
  
## 备注

s是都是小写字符组成

1<=s.length<=1000

## c++

    
    
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
    
    
    

## javaScript

    
    
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
    
    

## python

    
    
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

#### 文章目录

  * 题目描述
  * 输入描述
  * 输出描述
  * 用例
  * 备注
  * c++
  * javaScript
  * Java
  * python
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

![fengmian](https://i-blog.csdnimg.cn/blog_migrate/169f277a87c29b8ff13d65ef9e7eeec7.png)

