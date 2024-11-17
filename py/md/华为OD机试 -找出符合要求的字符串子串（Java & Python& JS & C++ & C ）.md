## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

给定两个字符串，从字符串2中找出字符串1中的所有字符，去重并按照ASCII值从小到大排序。

输入字符串1：长度不超过1024

输入字符串2：长度不超过1000000

字符范围满足ASCII编码要求，按照ASCII的值由小到大排序

## 输入描述

bach  
bbaaccedfg

## 输出描述

abc

## 备注

输入字符串1 为给定字符串bach，输入字符串2 bbaaccedfg

从字符串2中找出字符串1的字符，去除重复的字符，并且按照ASCII值从小到大排序，得到输出的结果为abc。

字符串1中的字符h在字符串2中找不到不输出。

## 示例1

输入

    
    
    fach
    bbaaccedfg
    

输出

    
    
    acf
    

说明

## 解题思路

###

题目要求从一个较长的字符串2中找到字符串1中的所有字符，去除重复后并按ASCII值从小到大排序输出。

#### 要求分解

  1. **匹配字符** ：从字符串2中找出字符串1中出现的所有字符。
  2. **去重** ：对于找到的字符，去除重复的字符，只保留唯一字符。
  3. **ASCII排序** ：将所有找到的唯一字符按ASCII值从小到大排序输出。

  * 

#### 示例解析

**示例输入** ：

    
    
    fach
    bbaaccedfg
    

**示例输出** ：

    
    
    acf
    

**说明** ：

  * 字符串1是 `fach`，字符串2是 `bbaaccedfg`。
  * 从字符串2中寻找字符串1中的字符，出现的有 `a`、`c` 和 `f`。
  * 去除重复后并按ASCII从小到大排序，结果为 `acf`。

#### 解题思路

  1. 使用一个集合来保存字符串1中的字符，方便判断字符串2中的字符是否是我们需要的。
  2. 遍历字符串2，将在字符串1中存在的字符加入另一个集合，以便去重。
  3. 将找到的字符集合转换为数组或字符串后进行排序，最后输出结果。

## C++

    
    
    #include <iostream>
    #include <set>
    
    using namespace std;
    int main() {
        string s1, s2;
        getline(cin, s1);
        getline(cin, s2);
    
        bool chars_in_s1[128] = {false};
        for (char c : s1) {
            chars_in_s1[c] = true; // 标记字符串1中的字符
        }
    
        set<char> result; // 自动去重和排序
        for (char c : s2) {
            if (chars_in_s1[c]) { // 判断字符是否在字符串1中
                result.insert(c);
            }
        }
    
        for (char c : result) {
            cout << c;
        }
        cout << endl;
    
        return 0;
    }
    
    

## java

    
    
    import java.util.Scanner;
    import java.util.Set;
    import java.util.TreeSet;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            String s1 = scanner.nextLine();
            String s2 = scanner.nextLine();
            scanner.close();
    
            // 用布尔数组记录s1中的字符
            boolean[] charsInS1 = new boolean[128];
            for (char c : s1.toCharArray()) {
                charsInS1[c] = true;
            }
    
            // 用TreeSet自动排序和去重
            Set<Character> result = new TreeSet<>();
            for (char c : s2.toCharArray()) {
                if (charsInS1[c]) {
                    result.add(c);
                }
            }
    
            // 输出结果
            for (char c : result) {
                System.out.print(c);
            }
            System.out.println();
        }
    }
    
    

## javaScript

    
    
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    let input = [];
    
    readline.on('line', (line) => {
      input.push(line);
      if (input.length === 2) {
        const charsInS1 = Array(128).fill(false);
        for (const char of input[0]) {
          charsInS1[char.charCodeAt(0)] = true;
        }
    
        const resultSet = new Set();
        for (const char of input[1]) {
          if (charsInS1[char.charCodeAt(0)]) {
            resultSet.add(char);
          }
        }
    
        console.log(Array.from(resultSet).sort().join(''));
        readline.close();
      }
    });
    
    

## python

    
    
    str1 = input()
    str2 = input()
    
    # 使用布尔数组记录字符串1中的字符
    chars_in_str1 = [False] * 128  # 假设ASCII字符集
    for char in str1:
        chars_in_str1[ord(char)] = True
    
    # 使用集合记录字符串2中也在字符串1中的字符，自动去重
    result_set = set()
    for char in str2:
        if chars_in_str1[ord(char)]:
            result_set.add(char)
    
    # 将集合排序并拼接输出
    print(''.join(sorted(result_set)))
    
    

## C语言

    
    
    #include <stdio.h>
    #include <string.h>
    #include <stdbool.h>
    
    int main() {
        char s1[1000], s2[1000];
        
        // 读取两行输入
        fgets(s1, sizeof(s1), stdin);
        fgets(s2, sizeof(s2), stdin);
    
        // 去除换行符
        s1[strcspn(s1, "\n")] = '\0';
        s2[strcspn(s2, "\n")] = '\0';
    
        bool chars_in_s1[128] = {false};
        
        // 标记字符串1中的字符
        for (int i = 0; s1[i] != '\0'; i++) {
            chars_in_s1[(unsigned char)s1[i]] = true;
        }
    
        char result[128];
        int result_count = 0;
    
        // 检查字符串2的字符是否在字符串1中，且去重
        for (int i = 0; s2[i] != '\0'; i++) {
            unsigned char c = s2[i];
            if (chars_in_s1[c]) {
                bool already_in_result = false;
                // 检查result中是否已存在字符c
                for (int j = 0; j < result_count; j++) {
                    if (result[j] == c) {
                        already_in_result = true;
                        break;
                    }
                }
                // 如果字符c不在result中，则添加
                if (!already_in_result) {
                    result[result_count++] = c;
                }
            }
        }
    
        // 对结果进行排序
        for (int i = 0; i < result_count - 1; i++) {
            for (int j = i + 1; j < result_count; j++) {
                if (result[i] > result[j]) {
                    char temp = result[i];
                    result[i] = result[j];
                    result[j] = temp;
                }
            }
        }
    
        // 输出结果
        for (int i = 0; i < result_count; i++) {
            printf("%c", result[i]);
        }
        printf("\n");
    
        return 0;
    }
    
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

