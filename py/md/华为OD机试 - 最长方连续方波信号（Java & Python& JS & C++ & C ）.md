## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

输入一串方波信号，求取最长的完全连续交替方波信号，并将其输出，如果有相同长度的交替方波信号，输出任一即可。方波信号高位用1标识，低位用0标识
。![请添加图片描述](https://i-blog.csdnimg.cn/direct/1bc955ac18f74be0943bfc6f9f082b71.png)

说明：

  1. 一个完整的信号一定以0开始然后以0结尾，即010是一个完整信号，但101，1010，0101不是
  2. 输入的一串方波信号是由一个或多个完整信号组成
  3. 两个相邻信号之间可能有0个或多个低位，如0110010，011000010
  4. 同一个信号中可以有连续的高位，如01110101011110001010，前14位是一个具有连续高位的信号
  5. 完全连续交替方波是指10交替，如01010是完全连续交替方波，0110不是

## 输入

输入信号字符串（长度 >= 3 且 <= 1024）：

例如：0010101010110000101000010

注：输入总是合法的，不用考虑异常情况

## 输出

输出最长的完全连续交替方波信号串

例如：01010

若不存在完全连续交替方波信号串，输出 -1。

## 示例一

输入

    
    
    00101010101100001010010
    

输出

    
    
    01010
    

说明

> 输入信号串中有三个信号：
>
> 0 010101010110(第一个信号段)
>
> 00 01010(第二个信号段)
>
> 010(第三个信号段)
>
> 第一个信号虽然有交替的方波信号段，但出现了11部分的连续高位，不算完全连续交替方波，  
>  在剩下的连续方波信号串中01010最长

## 解题思路

题目要求处理一串由`0`和`1`组成的方波信号字符串，从中找出最长的“完全连续交替方波”信号，并输出该信号。如果有多个相同长度的完全连续交替方波信号，则输出任意一个。如果不存在符合要求的信号串，则输出`-1`。

**完全连续交替方波的定义** ：

  * 必须以`0`开头，以`0`结尾。
  * 中间部分必须是`1`和`0`严格交替的形式（例如`010`，`01010`等）。
  * 例如：`01010`是一个完全连续交替方波，而`0110`和`101`则不是。

## Java

    
    
    import java.util.Scanner;
    import java.util.regex.Matcher;
    import java.util.regex.Pattern;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            String signal = scanner.nextLine(); // 输入信号字符串
    
            Pattern pattern = Pattern.compile("^(01)+0$"); // 定义正则表达式匹配完全连续交替方波信号
    
            int maxLength = 0; // 最长完全连续交替方波信号的长度
            String result = "-1"; // 最长完全连续交替方波信号的字符串
    
            StringBuilder sb = new StringBuilder(); // 用于存储当前处理的信号
            for (char c : signal.toCharArray()) {
                if (c == '0' && sb.length() > 0 && sb.charAt(sb.length() - 1) == '0') { // 当前字符是0，且前一个字符也是0，说明一个完整信号结束
                    Matcher matcher = pattern.matcher(sb.toString()); // 对当前信号进行匹配
                    if (matcher.find() && sb.length() > maxLength) { // 如果匹配到完全连续交替方波信号，并且长度大于之前的最大长度
                        maxLength = sb.length(); // 更新最大长度
                        result = sb.toString(); // 更新最大长度对应的字符串
                    }
                    sb.setLength(0); // 清空当前信号
                }
                sb.append(c); // 将当前字符加入当前信号
            }
    
            Matcher matcher = pattern.matcher(sb.toString()); // 对最后一个信号进行匹配
            if (matcher.find() && sb.length() > maxLength) { // 如果匹配到完全连续交替方波信号，并且长度大于之前的最大长度
                result = sb.toString(); // 更新最大长度对应的字符串
            }
    
            System.out.println(result); // 输出最长的完全连续交替方波信号串
        }
    }
    
    
    

## Python

    
    
    import re
    
    signal = input() # 输入信号字符串
    
    pattern = re.compile("^(01)+0$") # 定义正则表达式匹配完全连续交替方波信号
    
    maxLength = 0 # 最长完全连续交替方波信号的长度
    result = "-1" # 最长完全连续交替方波信号的字符串
    
    sb = "" # 用于存储当前处理的信号
    for c in signal:
        if c == '0' and len(sb) > 0 and sb[-1] == '0': # 当前字符是0，且前一个字符也是0，说明一个完整信号结束
            matcher = pattern.match(sb) # 对当前信号进行匹配
            if matcher and len(sb) > maxLength: # 如果匹配到完全连续交替方波信号，并且长度大于之前的最大长度
                maxLength = len(sb) # 更新最大长度
                result = sb # 更新最大长度对应的字符串
            sb = "" # 清空当前信号
    
        sb += c # 将当前字符加入当前信号
    
    matcher = pattern.match(sb) # 对最后一个信号进行匹配
    if matcher and len(sb) > maxLength: # 如果匹配到完全连续交替方波信号，并且长度大于之前的最大长度
        result = sb # 更新最大长度对应的字符串
    
    print(result) # 输出最长的完全连续交替方波信号串
    
    

## JavaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.on('line', (signal) => {
      const pattern = /^(01)+0$/; // 定义正则表达式匹配完全连续交替方波信号
    
      let maxLength = 0; // 最长完全连续交替方波信号的长度
      let result = '-1'; // 最长完全连续交替方波信号的字符串
    
      let sb = ''; // 用于存储当前处理的信号
      for (let i = 0; i < signal.length; i++) {
        const c = signal.charAt(i);
    
        if (c === '0' && sb.length > 0 && sb.charAt(sb.length - 1) === '0') { // 当前字符是0，且前一个字符也是0，说明一个完整信号结束
          const matcher = sb.match(pattern); // 对当前信号进行匹配
          if (matcher && sb.length > maxLength) { // 如果匹配到完全连续交替方波信号，并且长度大于之前的最大长度
            maxLength = sb.length; // 更新最大长度
            result = sb; // 更新最大长度对应的字符串
          }
          sb = ''; // 清空当前信号
        }
    
        sb += c; // 将当前字符加入当前信号
      }
    
      const matcher = sb.match(pattern); // 对最后一个信号进行匹配
      if (matcher && sb.length > maxLength) { // 如果匹配到完全连续交替方波信号，并且长度大于之前的最大长度
        result = sb; // 更新最大长度对应的字符串
      }
    
      console.log(result); // 输出最长的完全连续交替方波信号串
    
      rl.close();
    });
    
    

## C++

    
    
    #include <iostream>
    #include <string>
    #include <regex>
    using namespace std;
    
    int main() {
        string signal;
        getline(cin, signal); // 输入信号字符串
    
        regex pattern("^(01)+0$"); // 定义正则表达式匹配完全连续交替方波信号
    
        int maxLength = 0; // 最长完全连续交替方波信号的长度
        string result = "-1"; // 最长完全连续交替方波信号的字符串
    
        string sb; // 用于存储当前处理的信号
        for (int i = 0; i < signal.length(); i++) {
            char c = signal[i];
    
            if (c == '0' && sb.length() > 0 && sb[sb.length() - 1] == '0') { // 当前字符是0，且前一个字符也是0，说明一个完整信号结束
                smatch matcher; // 定义匹配结果
                if (regex_match(sb, matcher, pattern) && sb.length() > maxLength) { // 对当前信号进行匹配，如果匹配到完全连续交替方波信号，并且长度大于之前的最大长度
                    maxLength = sb.length(); // 更新最大长度
                    result = sb; // 更新最大长度对应的字符串
                }
                sb = ""; // 清空当前信号
            }
    
            sb += c; // 将当前字符加入当前信号
        }
    
        smatch matcher; // 对最后一个信号进行匹配
        if (regex_match(sb, matcher, pattern) && sb.length() > maxLength) { // 如果匹配到完全连续交替方波信号，并且长度大于之前的最大长度
            result = sb; // 更新最大长度对应的字符串
        }
    
        cout << result << endl; // 输出最长的完全连续交替方波信号串
    
        return 0;
    }
    
    

## C语言

    
    
    #include <stdio.h>
    #include <string.h>
    #include <stdbool.h>
    
    // 检查字符串是否匹配"^(01)+0$"的模式
    bool is_alternating_wave(const char *str) {
        int len = strlen(str);
        
        // 如果字符串长度小于3，直接返回false
        if (len < 3) {
            return false;
        }
        
        // 检查字符串是否以"01"开头，并以"0"结尾，中间部分要严格交替
        if (str[0] != '0' || str[len-1] != '0') {
            return false;
        }
        
        // 遍历字符串中间部分，检查是否严格交替 "01"
        for (int i = 1; i < len - 1; i++) {
            if (str[i] == str[i-1]) {
                return false;
            }
        }
        
        return true;
    }
    
    int main() {
        char signal[1025]; // 输入信号字符串，长度最大为1024
        fgets(signal, sizeof(signal), stdin); // 从标准输入读取信号字符串
        
        int maxLength = 0; // 最长的完全连续交替方波信号的长度
        char result[1025] = "-1"; // 最长的完全连续交替方波信号的字符串，默认值为 "-1"
        
        char sb[1025] = ""; // 用于存储当前处理的信号
        int sb_len = 0; // 当前信号的长度
        
        int signal_len = strlen(signal);
        
        // 遍历输入的信号字符串
        for (int i = 0; i < signal_len; i++) {
            char c = signal[i];
    
            // 如果遇到两个连续的"0"，说明一个完整信号段结束
            if (c == '0' && sb_len > 0 && sb[sb_len - 1] == '0') {
                if (is_alternating_wave(sb) && sb_len > maxLength) { // 如果当前信号是完全连续交替方波，并且长度大于之前的最大长度
                    maxLength = sb_len; // 更新最大长度
                    strcpy(result, sb); // 更新最大长度对应的信号串
                }
                sb[0] = '\0'; // 清空当前信号串
                sb_len = 0; // 重置当前信号长度
            }
            
            // 将当前字符加入当前信号串
            sb[sb_len++] = c;
            sb[sb_len] = '\0';
        }
        
        // 处理最后一个信号段
        if (is_alternating_wave(sb) && sb_len > maxLength) {
            strcpy(result, sb); // 更新最大长度对应的信号串
        }
        
        printf("%s\n", result); // 输出最长的完全连续交替方波信号串
    
        return 0; // 程序结束
    }
    
    

![fengmian](https://i-blog.csdnimg.cn/blog_migrate/173395927a0cbaa36617fad0da16bb64.png)

#### 完整用例

##### 用例1

    
    
    00101010101100001010010
    

##### 用例2

    
    
    01101010101011000101000010
    

##### 用例3

    
    
    0010101010101010101000010
    

##### 用例4

    
    
    01010101010101010101010010
    

##### 用例5

    
    
    0010101010101010101000001
    

##### 用例6

    
    
    0110010101010110000101000010
    

##### 用例7

    
    
    001010101011000010100001001010101010110000101000010
    

##### 用例8

    
    
    0110101010101100010100001001010101010110000101000010
    

##### 用例9

    
    
    0010101010101010101000010010101010101010101010101010100010
    

##### 用例10

    
    
    0101010101010101010101001001010101010101010101010101010001
    

