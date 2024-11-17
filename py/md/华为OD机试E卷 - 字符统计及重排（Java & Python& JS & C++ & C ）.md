## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

给出一个仅包含字母的字符串，不包含空格，统计字符串中各个字母（区分大小写）出现的次数，

并按照字母出现次数从大到小的顺序。输出各个字母及其出现次数。

如果次数相同，按照自然顺序进行排序，且小写字母在大写字母之前。

## 输入描述

输入一行，为一个仅包含字母的字符串。

## 输出描述

按照字母出现次数从大到小的顺序输出各个字母和字母次数，用英文分号分隔，注意末尾的分号；

字母和次数间用英文冒号分隔。

## 示例1

输入

    
    
    xyxyXX
    

输出

    
    
    x:2;y:2;X:2;
    

说明

> 无

## 示例2

输入

    
    
    abababb
    

输出

    
    
    b:4;a:3;
    

说明

> b的出现个数比a多，故b排在a之前

## 解题思路

本题要求对给定的字符串中的字母进行统计，并根据字母的出现次数进行排序，输出格式为 `字母:出现次数`，并用分号分隔每组结果。需要注意以下几点关键要求：

  1. **区分大小写** ：小写字母和大写字母被视为不同的字母。例如，`a` 和 `A` 是不同的字符。
  2. **按照字母出现次数排序** ：首先，输出出现次数最多的字母。如果多个字母的出现次数相同，则需要进一步排序。
  3. **自然顺序排序** ： 
     * 如果出现次数相同，按照字母的自然顺序进行排序。这里的“自然顺序”指的是 ASCII 顺序。
     * 小写字母的 ASCII 值比大写字母的 ASCII 值大，因此需要对同一出现次数的字母进行特殊处理，即 **小写字母在同等出现次数的情况下要排在大写字母之前** 。

## Java

    
    
    import java.util.*;
    
    public class Main {
        public static void main(String[] args) {
            Scanner sc = new Scanner(System.in);
            String str = sc.nextLine(); //读入字符串
    
            int[] count = new int[256]; //用一个数组记录每个字符出现的次数
            for (char ch : str.toCharArray()) {
                count[ch]++;
            }
    
            int max_count = Arrays.stream(count).max().getAsInt(); //获取出现次数最多的字符的出现次数
            StringBuilder result = new StringBuilder();
            for (int i = max_count; i > 0; i--) { //从出现次数最多的开始遍历
                for (int j = 'a'; j <= 'z'; j++) { //先输出小写字母
                    if (count[j] == i) {
                        result.append((char)j);
                        result.append(":");
                        result.append(i);
                        result.append(";");
                    }
                }
                for (int j = 'A'; j <= 'Z'; j++) { //再输出大写字母
                    if (count[j] == i) {
                        result.append((char)j);
                        result.append(":");
                        result.append(i);
                        result.append(";");
                    }
                }
            }
            System.out.println(result.toString());
        }
    }
    
    
    

## Python

    
    
    import sys
    
    str1 = input() #读入字符串
    
    count = [0] * 256 #用一个数组记录每个字符出现的次数
    for ch in str1:
        count[ord(ch)] += 1
    
    max_count = max(count) #获取出现次数最多的字符的出现次数
    result = ""
    for i in range(max_count, 0, -1): #从出现次数最多的开始遍历
        for j in range(ord('a'), ord('z')+1): #先输出小写字母
            if count[j] == i:
                result += chr(j)
                result += ":"
                result += str(i)
                result += ";"
        for j in range(ord('A'), ord('Z')+1): #再输出大写字母
            if count[j] == i:
                result += chr(j)
                result += ":"
                result += str(i)
                result += ";"
    
    print(result)
    
    
    

## JavaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.on('line', (input) => {
      let str = input.trim();
      let count = new Array(256).fill(0);
      for (let i = 0; i < str.length; i++) {
        let ch = str.charCodeAt(i);
        count[ch]++;
      }
      let max_count = Math.max(...count);
      let result = '';
      for (let i = max_count; i > 0; i--) {
        for (let j = 97; j <= 122; j++) {
          if (count[j] === i) {
            result += String.fromCharCode(j) + ':' + i + ';';
          }
        }
        for (let j = 65; j <= 90; j++) {
          if (count[j] === i) {
            result += String.fromCharCode(j) + ':' + i + ';';
          }
        }
      }
      console.log(result);
    });
    
    

## C++

    
    
    #include <bits/stdc++.h>
    using namespace std;
    
    int main()
    {
        string str;
        getline(cin, str); //读入字符串
    
        vector<int> count(256, 0); //用一个容器记录每个字符出现的次数
        for (char ch : str) {
            count[ch]++;
        }
    
        int max_count = *max_element(count.begin(), count.end()); //获取出现次数最多的字符的出现次数
        string result;
        for (int i = max_count; i > 0; i--) { //从出现次数最多的开始遍历
            for (int j = 'a'; j <= 'z'; j++) { //先输出小写字母
                if (count[j] == i) {
                    result.push_back(j);
                    result.append(":");
                    result.append(to_string(i));
                    result.append(";");
                }
            }
            for (int j = 'A'; j <= 'Z'; j++) { //再输出大写字母
                if (count[j] == i) {
                    result.push_back(j);
                    result.append(":");
                    result.append(to_string(i));
                    result.append(";");
                }
            }
        }
        cout << result << endl;
        return 0;
    }
    
    
    

## C语言

    
    
    #include <stdio.h>
    #include <string.h>
    
    int main() {
        char str[1000];  // 定义字符串，最大长度为1000
        fgets(str, 1000, stdin);  // 从输入中读取一行字符串
    
        int count[256] = {0};  // 定义一个数组，记录每个字符出现的次数，初始化为0
    
        // 遍历输入的字符串，统计每个字符出现的次数
        for (int i = 0; i < strlen(str); i++) {
            count[(unsigned char)str[i]]++;
        }
    
        // 找到出现次数最多的字符的出现次数
        int max_count = 0;
        for (int i = 0; i < 256; i++) {
            if (count[i] > max_count) {
                max_count = count[i];
            }
        }
    
        // 输出结果，按照出现次数从大到小的顺序
        for (int i = max_count; i > 0; i--) {
            // 输出小写字母
            for (int j = 'a'; j <= 'z'; j++) {
                if (count[j] == i) {
                    printf("%c:%d;", j, i);  // 输出字符及其出现次数
                }
            }
    
            // 输出大写字母
            for (int j = 'A'; j <= 'Z'; j++) {
                if (count[j] == i) {
                    printf("%c:%d;", j, i);  // 输出字符及其出现次数
                }
            }
        }
    
        printf("\n");  // 输出换行符，表示结束
        return 0;
    }
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/2909ad233d33d3b9c16ea864638a3197.png)

#### 完整用例

##### 用例1

    
    
    xyxyXX
    

##### 用例2

    
    
    abababb
    

##### 用例3

    
    
    abcdabcd
    

##### 用例4

    
    
    AaBBb
    

##### 用例5

    
    
    zzzzz
    

##### 用例6

    
    
    aAAABBBccc
    

##### 用例7

    
    
    qwertyuiopasdfghjklzxcvbnm
    

##### 用例8

    
    
    abAB
    

##### 用例9

    
    
    AAAaaa
    

##### 用例10

    
    
    aabbccddAABBCCDD
    

