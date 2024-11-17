## 题目描述

给定一段“密文”字符串 s，其中字符都是经过“密码本”映射的，现需要将“密文”解密并输出。

映射的规则（‘a’ ~ ‘i’）分别用（‘1’ ~ ‘9’）表示；（‘j’ ~ ‘z’）分别用（“10*” ~ “26*”）表示。

约束：映射始终唯一。

## 输入描述

“密文”字符串

## 输出描述

明文字符串

备注：翻译后的文本长度在100以内

## 用例

输入| 20*19*20*  
---|---  
输出| tst  
说明| 无  
  
## 解题思路

暴力替换，需要注释的是先从"10*" ~ "26*开始映射替换

    
    
    s=s.replace("10*","j")
    s=s.replace("11*","k")
    s=s.replace("12*","l")
    s=s.replace("13*","m")
    s=s.replace("14*","n")
    s=s.replace("15*","o")
    s=s.replace("16*","p")
    s=s.replace("17*","q")
    s=s.replace("18*","r")
    s=s.replace("19*","s")
    s=s.replace("20*","t")
    s=s.replace("21*","u")
    s=s.replace("22*","v")
    s=s.replace("23*","w")
    s=s.replace("24*","x")
    s=s.replace("25*","y")
    s=s.replace("26*","z")
    s=s.replace("1","a")
    s=s.replace("2","b")
    s=s.replace("3","c")
    s=s.replace("4","d")
    s=s.replace("5","e")
    s=s.replace("6","f")
    s=s.replace("7","g")
    s=s.replace("8","h")
    s=s.replace("9","i")
    

## C++

    
    
    #include <iostream>
    #include <string>
    #include <regex>
    
    using namespace std;
    int main() {
     
    
        // 定义字符串变量s，用于存储用户输入的密文
        string s;
        // 从标准输入读取一行数据存入s
        getline(cin, s);
    
        // 从26开始递减到1，创建映射并立即使用正则表达式进行全局替换
        for (int i = 26; i >= 1; --i) {
            // 构造映射的键：对于10到26，添加'*'；否则使用数字本身
            string key = to_string(i) + (i >= 10 ? "\\*" : "");
            // 构造映射的值：ASCII码97对应'a'，因此96+i对应的字符
            char value = static_cast<char>(96 + i);
    
            // 使用正则表达式和regex_replace方法，将密文中的每个加密字符（键）替换为对应的字母（值）
            s = regex_replace(s, regex(key), string(1, value));
        }
    
        // 打印解密后的明文字符串
        cout   << s << endl;
    
        // 主函数结束
        return 0;
    }
    

## Java

    
    
    import java.util.HashMap;
    import java.util.Map;
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            // 从用户输入接收密文字符串
            String s = scanner.nextLine();
    
            // 创建一个映射HashMap，用于将加密的'10*'到'26*'映射到对应的字母'j'到'z'
            Map<String, Character> mapping = new HashMap<>();
            for (int i = 10; i <= 26; i++) {
                // 将数字和'*'组合成字符串作为键，将ASCII码转换得到的字母作为值
                mapping.put(i + "*", (char) (96 + i));
            }
    
            // 更新映射HashMap，将'1'到'9'映射到'a'到'i'
            for (int i = 1; i <= 9; i++) {
                // 将数字转换成字符串作为键，将ASCII码转换得到的字母作为值
                mapping.put(String.valueOf(i), (char) (96 + i));
            }
    
            // 遍历映射HashMap中的每一对键值对
            for (Map.Entry<String, Character> entry : mapping.entrySet()) {
                // 获取键和值
                String key = entry.getKey();
                Character value = entry.getValue();
                // 使用字符串的replace方法，将密文中的每个加密字符（键）替换为对应的字母（值）
                s = s.replace(key, value.toString());
            }
    
            // 打印解密后的明文字符串
            System.out.println(s);
    
            // 关闭扫描器
            scanner.close();
        }
    }
    

## javaScript

    
    
    // 引入readline模块，用于从命令行读取输入
    const readline = require('readline');
    
    // 创建readline.Interface实例，用于读取标准输入
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    // 提示用户输入密文字符串
    rl.on('line', (s) => {
      // 从26开始递减到1，创建映射并立即使用正则表达式进行全局替换
      for (let i = 26; i >= 1; i--) {
        // 构造映射的键：对于10到26，添加'*'；否则使用数字本身
        const key = i + (i >= 10 ? '*' : '');
        // 构造映射的值：ASCII码97对应'a'，因此96+i对应的字符
        const value = String.fromCharCode(96 + i );
        // 使用字符串的replace方法，将密文中的每个加密字符（键）替换为对应的字母（值）
        s = s.replaceAll(key, value);
      }
    
      // 打印解密后的明文字符串
      console.log(s);
    
      // 关闭readline.Interface实例
      rl.close();
    });
    

## Python

    
    
    # 从用户输入接收密文字符串
    s = input()
    
    # 创建一个映射字典，用于将'1'到'9'映射到'a'到'i'，以及'10*'到'26*'映射到'j'到'z'
    # 对于26到1之间的每个数字i，如果i小于10，则键是字符串形式的i；
    # 如果i大于等于10，则键是字符串形式的i加上'*'；
    # 对应的值是通过ASCII码转换得到的字母（ASCII码97是'a'，所以96+i就是对应的字母）
    mapping = {str(i) + ('*' if i >= 10 else ''): chr(96 + i) for i in range(26, 0, -1)}
    
    # 遍历映射字典中的每一对键值对
    for key, value in mapping.items():
        # 使用字符串的replace方法，将密文中的每个加密字符（键）替换为对应的字母（值）
        s = s.replace(key, value)
    
    # 打印解密后的明文字符串
    print(s)
    
    
    上面代码等同下
     
    s=input()
    s=s.replace("10*","j")
    s=s.replace("11*","k")
    s=s.replace("12*","l")
    s=s.replace("13*","m")
    s=s.replace("14*","n")
    s=s.replace("15*","o")
    s=s.replace("16*","p")
    s=s.replace("17*","q")
    s=s.replace("18*","r")
    s=s.replace("19*","s")
    s=s.replace("20*","t")
    s=s.replace("21*","u")
    s=s.replace("22*","v")
    s=s.replace("23*","w")
    s=s.replace("24*","x")
    s=s.replace("25*","y")
    s=s.replace("26*","z")
    s=s.replace("1","a")
    s=s.replace("2","b")
    s=s.replace("3","c")
    s=s.replace("4","d")
    s=s.replace("5","e")
    s=s.replace("6","f")
    s=s.replace("7","g")
    s=s.replace("8","h")
    s=s.replace("9","i")
    print(s)
    

## C语言

    
    
    #include <stdio.h>
    #include <string.h>
    #include <stdlib.h>
    
    // 定义一个函数来替换字符串中的所有匹配项
    char* replace_all(char *str, const char *old, const char *new_str) {
        char *result; 
        int i, cnt = 0; 
        int new_len = strlen(new_str); 
        int old_len = strlen(old); 
      
        // 计算替换后的字符串长度
        for (i = 0; str[i] != '\0'; i++) { 
            if (strstr(&str[i], old) == &str[i]) { 
                cnt++; 
                i += old_len - 1; 
            } 
        } 
      
        result = (char *)malloc(i + cnt * (new_len - old_len) + 1); 
      
        i = 0; 
        while (*str) { 
            if (strstr(str, old) == str) { 
                strcpy(&result[i], new_str); 
                i += new_len; 
                str += old_len; 
            } 
            else
                result[i++] = *str++; 
        } 
      
        result[i] = '\0'; 
        return result; 
    }
    
    int main() {
        char s[1000]; // 定义字符数组s，用于存储用户输入的密文
     
        scanf("%[^\n]%*c", s); // 从标准输入读取一行数据存入s
    
        // 创建映射，将加密的'10*'到'26*'映射到对应的字母'j'到'z'
        for (int i = 10; i <= 26; i++) {
            char key[4]; // 定义一个字符串来存储键
            sprintf(key, "%d*", i); // 将数字和'*'组合成字符串作为键
            char value[2] = {96 + i, '\0'}; // 将ASCII码转换得到的字母作为值
    
            char *new_s = replace_all(s, key, value); // 替换字符串中的匹配项
            strcpy(s, new_s); // 将替换后的字符串复制回s
            free(new_s); // 释放临时字符串
        }
    
        // 更新映射，将'1'到'9'映射到'a'到'i'
        for (int i = 1; i <= 9; i++) {
            char key[2] = {i + '0', '\0'}; // 将数字转换成字符串作为键
            char value[2] = {96 + i, '\0'}; // 将ASCII码转换得到的字母作为值
    
            char *new_s = replace_all(s, key, value); // 替换字符串中的匹配项
            strcpy(s, new_s); // 将替换后的字符串复制回s
            free(new_s); // 释放临时字符串
        }
    
        printf("%s\n", s); // 打印解密后的明文字符串
    
        return 0;
    }
    

## 完整用例

### 用例1

    
    
    1
    

### 用例2

    
    
    10*
    

### 用例3

    
    
    123456789
    

### 用例4

    
    
    10*11*12*13*14*15*16*17*18*19*
    

### 用例5

    
    
    20*15*23*5*18*6*21*12
    

### 用例6

    
    
    26*1*26*1
    

### 用例7

    
    
    20*8*5 17*21*9*3*11 2*18*15*23*14 6*15*24
    

### 用例8

    
    
    9192891918512
    

### 用例9

    
    
    11212251521182119518525121514720*1521*19
    

### 用例10

    
    
    10*1*22*119*3*18*9*16*209*196*21*14
    

#### 文章目录

  * 题目描述
  * 输入描述
  * 输出描述
  * 用例
  * 解题思路
  * C++
  * Java
  * javaScript
  * Python
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

![fengmian](https://i-blog.csdnimg.cn/blog_migrate/bf72ae4c5bcf02bc6e0c37ffa882d1c3.png)

