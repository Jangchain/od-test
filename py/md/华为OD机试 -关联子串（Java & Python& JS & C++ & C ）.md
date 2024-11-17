## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

给定两个字符串str1和str2，如果字符串str1中的字符，经过排列组合后的字符串中，只要有一个字符串是str2的子串，则认为str1是str2的关联子串。

若str1是str2的关联子串，请返回子串在str2的起始位置；

若不是关联子串，则返回-1。

## 输入描述

输入两个字符串，分别为题目中描述的str1、str2。

### 备注

输入的字符串只包含小写字母；  
两个字符串的长度范围[1, 100000]之间；

## 输出描述

若str1是str2的关联子串，请返回子串在str2的起始位置；

若不是关联子串，则返回-1。

若str2中有多个str1的组合子串，请返回最小的起始位置。

## 示例1

输入

    
    
    abc efghicbaiii
    

输出

    
    
    5
    

说明

> str2包含str1的一种排列组合（“cab”)，此组合在str2的字符串起始位置为5（从0开始计数）

## 示例2

输入

    
    
    abc efghiccaiii
    

输出

    
    
    -1
    

说明

> “abc”字符串中三个字母的各种组合（abc、acb、bac、bca、cab、cba），str2中均不包含，因此返回-1

## 解题思路

给定两个字符串 `str1` 和 `str2`，需要判断 `str1` 的任意排列组合是否是 `str2` 的子串。如果是，则返回这个子串在 `str2`
中的**起始位置** ；如果不是，则返回 `-1`。

  1. **排列组合** ： 
     * `str1` 的排列组合是指 `str1` 的所有字符按不同顺序排列所形成的字符串。比如，如果 `str1 = "abc"`，它的排列组合包括 `abc`, `acb`, `bac`, `bca`, `cab`, `cba` 等。
  2. **关联子串** ： 
     * 如果 `str2` 包含 `str1` 的某个排列组合作为其子串，则称 `str1` 是 `str2` 的关联子串。例如： 
       * 如果 `str1 = "abc"`，而 `str2 = "efghicbaiii"`，`str2` 包含 `"cab"` 这个子串（`"cab"` 是 `str1 = "abc"` 的一个排列组合），因此 `str1` 是 `str2` 的关联子串。
  3. **起始位置** ： 
     * 如果 `str1` 是 `str2` 的关联子串，需要返回这个排列组合在 `str2` 中的起始位置，**从 0 开始计数** 。
     * 如果有多个排列组合出现在 `str2` 中，需要返回**最小的起始位置** 。

### 示例解析：

##### 示例1：

  * **输入** ：
    
        abc efghicbaiii
    

  * **解释** ：

    * `str1 = "abc"`，它的排列组合包括 `abc, acb, bac, bca, cab, cba`。
    * `str2 = "efghicbaiii"` 中包含 `"cab"` 这个子串，它是 `str1` 的一个排列组合。
    * `"cab"` 的起始位置是 `5`，因此输出 `5`。
  * **输出** ：
    
        5
    

### 总结：

#### 1\. **问题核心：**

我们需要找到 `str1` 的某个排列是否是 `str2` 的子串。由于 `str1` 的所有排列组合数量是
`n!`，当字符串长度比较大时，生成和匹配所有的排列组合非常耗时。因此，直接生成所有排列并依次匹配不是一个高效的方法。

#### 2\. **优化思路：**

通过**字符频率统计** 的方法，将复杂的排列匹配问题转化为**子串字符频率匹配** 问题。具体来说：

  * 两个字符串是排列关系，意味着它们的字符组成相同（即每个字符出现的次数相同，但顺序可能不同）。
  * 因此，只要找到 `str2` 中长度为 `n1` 的子串（`n1` 是 `str1` 的长度），其字符频率与 `str1` 的字符频率一致，那么这个子串就可以被认为是 `str1` 的一个排列组合。

## Java

    
    
    import java.util.Scanner;
    
    public class Main {
    
        public static void main(String[] args) {
    
            Scanner sc = new Scanner(System.in);
    
            // 输入两个字符串
            String[] strings = sc.nextLine().split(" ");
    
            String str1 = strings[0];
            String str2 = strings[1];
            int n1 = str1.length();
            int n2 = str2.length();
            int index = -1;
    
            // 遍历str2，判断是否存在str1的排列组合子串
            for (int i = 0; i <= n2 - n1; i++) {
                if (isSubstring(str1, str2, i, n1)) {
                    index = i;
                    break;
                }
            }
    
            System.out.println(index);
    
        }
    
        // 判断str1是否是str2的子串
        public static boolean isSubstring(String str1, String str2, int start, int len) {
    
            int count = 0;
            int[] freq = new int[26];
    
            // 统计str2中子串的字符频次
            for (int i = 0; i < len; i++) {
                freq[str2.charAt(start + i) - 'a']++;
            }
    
            // 检查str1中的字符是否在str2的子串中出现
            for (int i = 0; i < len; i++) {
                if (freq[str1.charAt(i) - 'a'] > 0) {
                    freq[str1.charAt(i) - 'a']--;
                    count++;
                }
            }
    
            // 如果str1的字符都在str2的子串中出现，则返回true
            return count == len;
        }
    }
    
    

## Python

    
    
    import sys
    
    def is_substring(str1, str2, start, len):
        count = 0
        freq = [0] * 26
    
        for i in range(len):
            freq[ord(str2[start + i]) - ord('a')] += 1
    
        for i in range(len):
            if freq[ord(str1[i]) - ord('a')] > 0:
                freq[ord(str1[i]) - ord('a')] -= 1
                count += 1
    
        return count == len
    
    if __name__ == "__main__":
        strings = input().split(" ")
        str1 = strings[0]
        str2 = strings[1]
        n1 = len(str1)
        n2 = len(str2)
        index = -1
    
        for i in range(n2 - n1 + 1):
            if is_substring(str1, str2, i, n1):
                index = i
                break
    
        print(index)
    
    

## JavaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.on('line', (input) => {
      // 输入两个字符串
      const strings = input.split(" ");
    
      const str1 = strings[0];
      const str2 = strings[1];
      const n1 = str1.length;
      const n2 = str2.length;
      let index = -1;
    
      // 遍历str2，判断是否存在str1的排列组合子串
      for (let i = 0; i <= n2 - n1; i++) {
        if (isSubstring(str1, str2, i, n1)) {
          index = i;
          break;
        }
      }
    
      console.log(index);
    
      rl.close();
    });
    
    // 判断str1是否是str2的子串
    function isSubstring(str1, str2, start, len) {
      let count = 0;
      const freq = new Array(26).fill(0);
    
      // 统计str2中子串的字符频次
      for (let i = 0; i < len; i++) {
        freq[str2.charCodeAt(start + i) - 'a'.charCodeAt(0)]++;
      }
    
      // 检查str1中的字符是否在str2的子串中出现
      for (let i = 0; i < len; i++) {
        if (freq[str1.charCodeAt(i) - 'a'.charCodeAt(0)] > 0) {
          freq[str1.charCodeAt(i) - 'a'.charCodeAt(0)]--;
          count++;
        }
      }
    
      // 如果str1的字符都在str2的子串中出现，则返回true
      return count === len;
    }
    
    

## C++

    
    
    #include <iostream>
    #include <string>
    using namespace std;
    
    bool isSubstring(string str1, string str2, int start, int len) {
        int count = 0;
        int freq[26] = {0};
    
        for (int i = 0; i < len; i++) {
            freq[str2[start + i] - 'a']++;
        }
    
        for (int i = 0; i < len; i++) {
            if (freq[str1[i] - 'a'] > 0) {
                freq[str1[i] - 'a']--;
                count++;
            }
        }
    
        return count == len;
    }
    
    int main() {
        string str1, str2;
        cin >> str1 >> str2;
        int n1 = str1.length();
        int n2 = str2.length();
        int index = -1;
    
        for (int i = 0; i <= n2 - n1; i++) {
            if (isSubstring(str1, str2, i, n1)) {
                index = i;
                break;
            }
        }
    
        cout << index << endl;
    
        return 0;
    }
    
    

## C语言

    
    
    #include <stdio.h>
    #include <string.h>
    #include <stdbool.h>
    
    // 判断 str1 是否是 str2 在位置 start 处的排列子串
    bool isSubstring(const char* str1, const char* str2, int start, int len) {
        int count = 0;
        int freq[26] = {0};  // 字符频率数组，针对 a-z 的小写字母
    
        // 统计 str2 在 start 位置开始 len 长度内的字符频率
        for (int i = 0; i < len; i++) {
            freq[str2[start + i] - 'a']++;
        }
    
        // 遍历 str1，减少相应字符的频率并统计匹配的字符数
        for (int i = 0; i < len; i++) {
            if (freq[str1[i] - 'a'] > 0) {
                freq[str1[i] - 'a']--;
                count++;
            }
        }
    
        // 如果匹配字符数等于 len，则返回 true
        return count == len;
    }
    
    int main() {
        char str1[100001], str2[100001];
        
        // 读取两个字符串
        scanf("%s %s", str1, str2);
    
        int n1 = strlen(str1);  // 获取 str1 的长度
        int n2 = strlen(str2);  // 获取 str2 的长度
        int index = -1;
    
        // 遍历 str2，检查从每个可能的起始位置开始的子串是否是 str1 的排列组合
        for (int i = 0; i <= n2 - n1; i++) {
            if (isSubstring(str1, str2, i, n1)) {
                index = i;  // 找到第一个匹配的位置
                break;      // 直接跳出循环
            }
        }
    
        // 输出结果：找到则输出起始位置，未找到则输出 -1
        printf("%d\n", index);
    
        return 0;
    }
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

#### 完整用例

##### 用例1

    
    
    abc efghicbaiii
    

##### 用例2

    
    
    abc efghiccaiii
    

##### 用例3

    
    
    a abcdefg
    

##### 用例4

    
    
    aaaaaaabbbbbbbcccccc abcdefghicbaaaaaaabbbbbbbcccccc
    

##### 用例5

    
    
    acde fghicbaaaabcdeaaaabbbbbbbcccccc
    

##### 用例6

    
    
    aaabbbbbbbcccccc abcdefghicbaaaaaaabbbbbbbcccccc
    

##### 用例7

    
    
    a abcdefghicbaiii
    

##### 用例8

    
    
    abab baaababa
    

##### 用例9

    
    
    xyz xyyzzxyzxyz
    

##### 用例10

    
    
    abcd defghijklmnopqrsabcdtuvwxyz
    

