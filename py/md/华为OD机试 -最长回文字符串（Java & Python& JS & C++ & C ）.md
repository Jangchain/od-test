## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

如果一个字符串正读和反渎都一样（大小写敏感），则称它为一个「[回文串](https://so.csdn.net/so/search?q=%E5%9B%9E%E6%96%87%E4%B8%B2&spm=1001.2101.3001.7020)」，例如：

  * leVel是一个「回文串」，因为它的正读和反读都是leVel；同理a也是「回文串」
  * art不是一个「回文串」，因为它的反读tra与正读不同
  * Level不是一个「回文串」，因为它的反读leveL与正读不同（因大小写敏感）

给你一个仅包含大小写字母的字符串，请用这些字母构造出一个最长的回文串，若有多个最长的，返回其中[字典序](https://so.csdn.net/so/search?q=%E5%AD%97%E5%85%B8%E5%BA%8F&spm=1001.2101.3001.7020)最小的回文串。

字符串中的每个位置的字母最多备用一次，也可以不用。

## 输入描述

无

## 输出描述

无

## 示例1

输入

    
    
    abczcccddzz
    

输出

    
    
    ccdzazdcc
    

说明

> ## 示例2

输入

    
    
    ABabBabA
    

输出

    
    
    ABabbaBA
    

## 解题思路

#### 题目理解

题目要求是，从给定的字符串中选取字符，构造一个**最长的回文串** ，并且在有多个最长回文串的情况下，返回其中**字典序最小** 的那个。注意：

  1. **回文串** 是指正读和反读都相同的字符串（本题大小写敏感）。
  2. 字符串中的**每个字母最多只能使用一次** ，也可以不使用。
  3. **字典序最小** 的回文串，是指在多个相同长度的回文串中，按字母顺序排列最靠前的那个。

#### 解题思路

  1. **字符统计** ：首先统计每个字符在字符串中的出现次数。
  2. **构造回文串** ：基于字符出现次数，将偶数个字符放在回文串的两侧。对于出现次数为奇数的字符，将其“去掉一个”后变成偶数放入两侧。
  3. **选择中心字符** ：对于所有出现次数为奇数的字符，可以选择其中“字典序最小”的字符作为回文串的中心。
  4. **形成回文串** ：将左右对称部分和中心字符组合成回文串。
  5. **字典序调整** ：由于按字母排序选择左右部分和中心字符，最终回文串自动满足字典序最小的要求。

## Java

    
    
    import java.util.Scanner;
    import java.util.Map;
    import java.util.HashMap;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            String input = scanner.next();
            scanner.close();
    
            // 统计各字母个数
            Map<Character, Integer> charCount = new HashMap<>();
            for (char c : input.toCharArray()) {
                charCount.put(c, charCount.getOrDefault(c, 0) + 1);
            }
    
            StringBuilder halfChars = new StringBuilder();
            Character midChar = null;
    
            // 遍历所有可能的字符，确保字典序
            for (char c = 'A'; c <= 'z'; c++) {
                Integer count = charCount.get(c);
                if (count != null) {
                    // 添加一半的字符到回文串的左半部分
                    int halfCount = count / 2;
                    for (int i = 0; i < halfCount; i++) {
                        halfChars.append(c);
                    }
                    // 选择字典序最小的奇数次字符作为中间字符
                    if (count % 2 != 0 && (midChar == null || c < midChar)) {
                        midChar = c;
                    }
                }
            }
    
            // 构造回文串
            String leftHalf = halfChars.toString();
            StringBuilder result = new StringBuilder(leftHalf);
            if (midChar != null) {
                result.append(midChar);
            }
            result.append(halfChars.reverse());
    
            System.out.println(result);
        }
    }
    

## Python

    
    
    # 导入Counter用于统计字符频率
    from collections import Counter
    
    # 读取输入字符串
    input_str = input().strip()
    
    # 统计各字符的出现次数
    char_count = Counter(input_str)
    
    half_chars = []  # 用于存储回文左半部分
    mid_char = None  # 用于存储回文中间的单个字符
    
    # 按字典序遍历可能的字符
    for c in range(ord('A'), ord('z') + 1):
        char = chr(c)  # 将ASCII码转换为字符
        count = char_count.get(char, 0)  # 获取字符的出现次数，若无则默认为0
        if count > 0:
            # 将字符的一半次数加入左半部分
            half_chars.extend([char] * (count // 2))
            # 若次数为奇数且当前中间字符为空或字典序更小，则设置为中间字符
            if count % 2 != 0 and (mid_char is None or char < mid_char):
                mid_char = char
    
    # 构造回文字符串
    left_half = ''.join(half_chars)
    result = left_half + (mid_char if mid_char else '') + left_half[::-1]
    
    print(result)
    

## JavaScript

    
    
    const readline = require('readline');
    
    // 创建输入读取接口
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.on('line', (input) => {
      const charCount = {};  // 用于记录字符频率
      for (const c of input) {
        charCount[c] = (charCount[c] || 0) + 1;
      }
    
      const halfChars = [];  // 存储回文左半部分字符
      let midChar = null;    // 存储回文中间字符
    
      // 遍历所有可能字符，确保按字典序
      for (let c = 'A'.charCodeAt(0); c <= 'z'.charCodeAt(0); c++) {
        const char = String.fromCharCode(c);
        const count = charCount[char] || 0;
        if (count > 0) {
          // 将字符的数量一半放入左半部分
          halfChars.push(...Array(Math.floor(count / 2)).fill(char));
          // 如果出现奇数次且字典序较小，则设置为中间字符
          if (count % 2 !== 0 && (!midChar || char < midChar)) {
            midChar = char;
          }
        }
      }
    
      // 构造回文字符串
      const leftHalf = halfChars.join('');
      const result = leftHalf + (midChar ? midChar : '') + leftHalf.split('').reverse().join('');
    
      console.log(result);
      rl.close();
    });
    

## C++

    
    
    #include <iostream>
    #include <unordered_map>
    #include <vector>
    #include <algorithm>
    
    int main() {
        std::string input;
        std::cin >> input;
    
        // 统计字符频率
        std::unordered_map<char, int> charCount;
        for (char c : input) {
            charCount[c]++;
        }
    
        std::vector<char> halfChars; // 用于存储左半部分字符
        char midChar = '\0'; // 用于存储中间字符
    
        // 遍历所有可能的字符（字典序）
        for (char c = 'A'; c <= 'z'; ++c) {
            int count = charCount[c];
            if (count > 0) {
                // 将字符一半加入左半部分
                for (int i = 0; i < count / 2; ++i) {
                    halfChars.push_back(c);
                }
                // 如果出现奇数次且字典序较小，则设置为中间字符
                if (count % 2 != 0 && (midChar == '\0' || c < midChar)) {
                    midChar = c;
                }
            }
        }
    
        // 构造回文字符串
        std::string leftHalf(halfChars.begin(), halfChars.end());
        std::string result = leftHalf;
        if (midChar != '\0') {
            result += midChar;
        }
        std::reverse(halfChars.begin(), halfChars.end());
        result += std::string(halfChars.begin(), halfChars.end());
    
        std::cout << result << std::endl;
    
        return 0;
    }
    

## C语言

    
    
    #include <stdio.h>
    #include <string.h>
    
    #define MAX_CHAR 128
    
    int main() {
        char input[1000];
        scanf("%s", input);
    
        int charCount[MAX_CHAR] = {0}; // 统计字符出现次数
        int len = strlen(input);
        for (int i = 0; i < len; i++) {
            charCount[(int)input[i]]++;
        }
    
        char halfChars[500]; // 用于存储回文左半部分字符
        int halfIndex = 0;
        char midChar = '\0'; // 用于存储回文中间字符
    
        // 按字典序遍历可能字符
        for (int c = 'A'; c <= 'z'; c++) {
            int count = charCount[c];
            if (count > 0) {
                // 将字符一半加入左半部分
                for (int i = 0; i < count / 2; i++) {
                    halfChars[halfIndex++] = (char)c;
                }
                // 若为奇数次且当前字典序较小，设置为中间字符
                if (count % 2 != 0 && (midChar == '\0' || c < midChar)) {
                    midChar = (char)c;
                }
            }
        }
    
        halfChars[halfIndex] = '\0'; // 结束符
    
        // 构造回文字符串
        printf("%s", halfChars);
        if (midChar != '\0') {
            printf("%c", midChar);
        }
        for (int i = halfIndex - 1; i >= 0; i--) {
            printf("%c", halfChars[i]);
        }
        
    
        return 0;
    }
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/3326ab69d45ea6d4389a1bcb61bf2b5f.png)

