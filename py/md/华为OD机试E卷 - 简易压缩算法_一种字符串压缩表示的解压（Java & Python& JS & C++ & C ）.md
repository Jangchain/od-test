## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

有一种简易压缩算法：针对全部为小写英文字母组成的字符串， 将其中连续超过两个相同字母的部分压缩为连续个数加该字母 其他部分保持原样不变.

例如字符串aaabbccccd 经过压缩变成字符串 3abb4cd

请您编写解压函数,根据输入的字符串,判断其是否为合法压缩过的字符串

  * 若输入合法则输出解压缩后的字符串
  * 否则输出字符串`!error`来报告错误

## 输入描述

输入一行，为一个 ASCII 字符串

长度不超过`100`字符

用例保证输出的字符串长度也不会超过`100`字符串

## 输出描述

若判断输入为合法的经过压缩后的字符串

则输出压缩前的字符串

若输入不合法 则输出字符串`!error`

## 示例1

输入

    
    
    4dff
    

输出

    
    
    ddddff
    

说明

> 4d 扩展为 4 个 d ，故解压后的字符串为 ddddff

## 示例2

输入

    
    
    2dff
    

输出

    
    
    !error
    

说明

> 2 个 d 不需要压缩 故输入不合法

## 示例3

输入

    
    
    4d@A
    

输出

    
    
    !error
    

说明

> 全部由小写英文字母做成的字符串，压缩后不会出现特殊字符@和大写字母 A  
>  故输入不合法

## 解题思路

题目要求我们编写一个函数来判断一个字符串是否是经过合法压缩后的字符串，并且能够解压缩这个字符串。如果字符串不合法，则返回`!error`。

#### 压缩规则总结：

  * 连续超过两个相同的字母，将它们压缩为`数字 + 字母`的形式。例如，`aaa`压缩为`3a`，`cccc`压缩为`4c`。
  * 字符串中的其他部分保持原样。

#### 合法性检查：

  1. 字符串中只允许包含小写字母和数字，不允许出现其他字符。
  2. 数字必须大于2，因为两个或更少个相同字母不应该压缩。
  3. 数字后面必须跟随一个小写字母，且该数字应扩展为对应数量的字母。

#### 示例分析：

  * 输入`4dff`：`4d`扩展为`dddd`，合法字符串，输出为`ddddff`。
  * 输入`2dff`：数字`2`不应出现，因为两个字母不需要压缩，输入不合法，输出`!error`。
  * 输入`4d@A`：包含非法字符`@`和大写字母`A`，输入不合法，输出`!error`。

## Java

    
    
    import java.util.Scanner;
    import java.util.regex.Pattern;
    import java.util.regex.Matcher;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            
            // 读取输入字符串
            String s = scanner.nextLine();
            
            // 定义匹配非法字符的正则表达式（非数字和小写字母的字符）
            String pat = "[^0-9a-z]";
            
            // 用于存储数字部分的字符串
            String num = "";
            
            // 用于存储最终解压缩的结果
            String res = "";
            
            // 编译正则表达式
            Pattern pattern = Pattern.compile(pat);
            Matcher matcher = pattern.matcher(s);
            
            // 如果找到非法字符，则直接输出 "!error"
            if (matcher.find()) {
                res = "!error";
            }else if (Character.isDigit(s.charAt(s.length() - 1))) {
                res = "!error";
            
            
            } else {
                // 遍历输入字符串的每一个字符
                for (int i = 0; i < s.length(); i++) {
                    char c = s.charAt(i);
                    
                    // 如果当前字符是数字，则将其追加到 num 中
                    if (Character.isDigit(c)) {
                        num += c;
                    } 
                    // 如果 num 不为空，表示之前有数字，需要进行解压操作
                    else if (!num.equals("")) {
                        // 判断数字是否小于等于2，如果是则输入不合法
                        if (Integer.parseInt(num) <= 2) {
                            res = "!error";
                            break;
                        } else {
                            // 将对应数量的字母添加到结果中
                            for (int j = 0; j < Integer.parseInt(num); j++) {
                                res += c;
                            }
                            // 重置 num 为空
                            num = "";
                        }
                    } 
                    // 如果当前字符是字母，且前面没有数字，则直接添加到结果中
                    else {
                        res += c;
                    }
                }
            }
            
            // 输出最终结果
            System.out.println(res);
        }
    }
    

## Python

    
    
    import re
    
    # 读取输入字符串
    s = input()
    
    # 定义匹配非法字符的正则表达式（非数字和小写字母的字符）
    pat = "[^0-9a-z]"
    
    # 用于存储数字部分的字符串
    num = ""
    
    # 用于存储最终解压缩的结果
    res = ""
    
    # 编译正则表达式并查找非法字符
    pattern = re.compile(pat)
    matcher = pattern.search(s)
    
    # 如果找到非法字符，则直接输出 "!error"
    if matcher:
        res = "!error"
    # 最后一位是数组也不符合
    elif s[len(s) - 1].isdigit():
        res = "!error"
    else:
        # 遍历输入字符串的每一个字符
        for i in range(len(s)):
            c = s[i]
             
            
            # 如果当前字符是数字，则将其追加到 num 中
            if c.isdigit():
                num += c
                 
            # 如果 num 不为空，表示之前有数字，需要进行解压操作
            elif num != "":
                # 判断数字是否小于等于2，如果是则输入不合法
                if int(num) <= 2:
                    res = "!error"
                    break
                else:
                    # 将对应数量的字母添加到结果中
                    for j in range(int(num)):
                        res += c
                    # 重置 num 为空
                    num = ""
            # 如果当前字符是字母，且前面没有数字，则直接添加到结果中
            else:
                res += c
    
    # 输出最终结果
    print(res)
    
    

## JavaScript

    
    
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.on('line', (s) => {
      // 定义匹配非法字符的正则表达式（非数字和小写字母的字符）
      const pat = '[^0-9a-z]';
      
      // 用于存储数字部分的字符串
      let num = "";
      
      // 用于存储最终解压缩的结果
      let res = "";
    
      // 如果字符串包含非法字符，则输出 "!error"
      if (s.match(pat) !== null) {
        res = "!error";
      } // 检查最后一位是否是数字
     else if (!isNaN(s[s.length - 1])) {
        res = "!error";
    }
    else {
        // 遍历输入字符串的每一个字符
        for (let i = 0; i < s.length; i++) {
          const c = s[i];
          
          // 如果当前字符是数字，则将其追加到 num 中
          if (c.match(/[0-9]/)) {
            num += c;
          } 
          // 如果 num 不为空，表示之前有数字，需要进行解压操作
          else if (num !== "") {
            // 判断数字是否小于等于2，如果是则输入不合法
            if (parseInt(num) <= 2) {
              res = "!error";
              break;
            } else {
              // 将对应数量的字母添加到结果中
              res += c.repeat(parseInt(num));
              // 重置 num 为空
              num = "";
            }
          } 
          // 如果当前字符是字母，且前面没有数字，则直接添加到结果中
          else {
            res += c;
          }
        }
      }
      
      // 输出最终结果
      console.log(res);
      rl.close();
    });
    

## C++

    
    
    #include <iostream>
    #include <regex>
    using namespace std;
    
    int main() {
        // 读取输入字符串
        string s;
        cin >> s;
    
        // 定义匹配非法字符的正则表达式（非数字和小写字母的字符）
        string pat = "[^0-9a-z]";
        
        // 用于存储数字部分的字符串
        string num = "";
        
        // 用于存储最终解压缩的结果
        string res = "";
        
        // 如果字符串包含非法字符，则输出 "!error"
        if (regex_search(s, regex(pat))) {
            res = "!error";
        }// 检查最后一位是否是数字
        else if (isdigit(s[s.length() - 1])) {
            res = "!error";
        } else {
            // 遍历输入字符串的每一个字符
            for (char c : s) {
                // 如果当前字符是数字，则将其追加到 num 中
                if (isdigit(c)) {
                    num += c;
                } 
                // 如果 num 不为空，表示之前有数字，需要进行解压操作
                else if (num != "") {
                    // 判断数字是否小于等于2，如果是则输入不合法
                    if (stoi(num) <= 2) {
                        res = "!error";
                        break;
                    } else {
                        // 将对应数量的字母添加到结果中
                        res += string(stoi(num), c);
                        // 重置 num 为空
                        num = "";
                    }
                } 
                // 如果当前字符是字母，且前面没有数字，则直接添加到结果中
                else {
                    res += c;
                }
            }
        }
    
        // 输出最终结果
        cout << res << endl;
        return 0;
    }
    

## C语言

    
    
    #include <stdio.h>
    #include <string.h>
    #include <ctype.h>
    #include <stdlib.h>
    #include <stdbool.h>
    
    // 定义一个函数，用于检查字符串中是否包含非法字符
    bool contains_invalid_characters(const char *s) {
        while (*s) {
            // 如果字符不是数字或小写字母，则认为是非法字符
            if (!isdigit(*s) && !islower(*s)) {
                return true;
            }
            s++;
        }
        return false;
    }
    
    int main() {
        // 定义存储输入字符串的数组
        char s[1000];
        
        // 读取输入字符串
        scanf("%s", s);
    
        // 用于存储数字部分的字符串
        char num[100] = "";
        
        // 用于存储最终解压缩的结果
        char res[1000] = "";
        
        // 如果字符串包含非法字符，则输出 "!error"
        if (contains_invalid_characters(s)) {
            strcpy(res, "!error");
        }// 检查最后一位是否是数字
    	 else if (isdigit(s[strlen(s) - 1])) {
    	        strcpy(res, "!error");
    	    }
    	 else {
            // 遍历输入字符串的每一个字符
            for (int i = 0; s[i] != '\0'; i++) {
                char c = s[i];
                
                // 如果当前字符是数字，则将其追加到 num 中
                if (isdigit(c)) {
                    strncat(num, &c, 1);
                } 
                // 如果 num 不为空，表示之前有数字，需要进行解压操作
                else if (strlen(num) > 0) {
                    // 判断数字是否小于等于2，如果是则输入不合法
                    int repeat_count = atoi(num);
                    if (repeat_count <= 2) {
                        strcpy(res, "!error");
                        break;
                    } else {
                        // 将对应数量的字母添加到结果中
                        for (int j = 0; j < repeat_count; j++) {
                            strncat(res, &c, 1);
                        }
                        // 重置 num 为空
                        num[0] = '\0';
                    }
                } 
                // 如果当前字符是字母，且前面没有数字，则直接添加到结果中
                else {
                    strncat(res, &c, 1);
                }
            }
        }
    
        // 输出最终结果
        printf("%s\n", res);
        return 0;
    }
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/58a148304560220c8dc0adfb15a06d1e.png)

#### 完整用例

##### 用例1

4dff

##### 用例2

2dff

##### 用例3

4d@A

##### 用例4

3abb4cd

##### 用例5

2a3b4c

##### 用例6

1p

##### 用例7

aabbccdd

##### 用例8

3a4b5c6d7e#8f

##### 用例9

1a3c4d5e

##### 用例10

12p

