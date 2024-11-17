## 题目描述：密码输入检测（本题分值100）

给定用户密码输入流input，输入流中字符’<'表示退格，可以清除前一个输入的字符，请你编写程序，输出最终得到的密码字符，并判断密码是否满足如下的密码安全要求。  
​  
密码安全要求如下：  
​  
1.密码长度>=8;  
​  
2.密码至少需要包含1个大写字母;  
​  
3.密码至少需要包含1个小写字母;  
​  
4.密码至少需要包含1个数字;  
​  
5.密码至少需要包含1个字母和数字以外的非空白特殊字符  
​  
注意空串退格后仍然为空串，且用户输入的字符串不包含‘<’字符和空白字符。  
​

## 输入描述

用一行字符串表示输入的用户数据，输入的字符串中‘<’字符标识退格，用户输入的字符串不包含空白字符，例如：`ABC<c89%000<`

## 输出描述

输出经过程序处理后，输出的实际密码字符串，并输出改密码字符串是否满足密码安全要求。两者间由‘,’分隔， 例如：`ABc89%00,true`

## 示例1

输入

    
    
    ABC<c89%000<
    

输出

    
    
    ABc89%00,true
    

说明

> 解释：多余的C和0由于退格被去除,最终用户输入的密码为ABc89%00，且满足密码安全要求，输出true

## 解题思路

  1. 始化了五个变量：`result`（一个空字符串用于存储处理后的输入），`is_big`，`is_small`，`is_num`和`is_spec`（四个布尔变量，用于检查处理后的字符串是否包含大写字母、小写字母、数字和特殊字符）。

  2. 接下来，代码遍历输入的字符串中的每一个字符。对于每一个字符，代码首先检查它是否是’<'。如果是，那么代码将删除`result`字符串的最后一个字符（如果存在的话）。否则，代码将执行以下操作：

     * 将字符添加到`result`字符串中。
     * 如果字符是数字，并且`is_num`当前为False，那么将`is_num`设置为True。
     * 如果字符是小写字母，并且`is_small`当前为False，那么将`is_small`设置为True。
     * 如果字符是大写字母，并且`is_big`当前为False，那么将`is_big`设置为True。
     * 如果字符是特殊字符（即，它不是数字、小写字母、大写字母或空格），并且`is_spec`当前为False，那么将`is_spec`设置为True。
  3. 在遍历完输入的字符串后，代码将检查`result`字符串是否满足以下条件：长度大于等于8，并且包含大写字母、小写字母、数字和特殊字符。如果满足这些条件，那么`flag_res`将被设置为True，否则，它将被设置为False。

  4. 最后，代码将输出`result`字符串和`flag_res`的值。这两个值之间用逗号分隔，`flag_res`的值被转换为字符串格式。

总的来说，这段代码的主要目标是对用户的输入进行处理，并检查处理后的结果是否满足特定的条件。

## C++

    
    
    #include <iostream>
    #include <string>
    #include <cctype>
    
    int main() {
        // 创建一个字符串来读取用户的输入
        std::string input;
        std::getline(std::cin, input);
    
        // 创建一个字符串来构建结果字符串
        std::string result = "";
    
        // 创建四个布尔变量来检查输入字符串中是否包含大写字母、小写字母、数字和特殊字符
        bool isBig = false;
        bool isSmall = false;
        bool isNum = false;
        bool isSpec = false;
    
        // 遍历输入字符串中的每一个字符
        for (char c : input) {
            // 如果字符是'<', 则删除结果字符串的最后一个字符
            if (c == '<') {
                if (!result.empty()) {
                    result.pop_back();
                }
            } else {
                // 否则，将字符添加到结果字符串中
                result.push_back(c);
            }
        }
    
        // 遍历输入字符串中的每一个字符
        for (char c : result) {
            // 检查字符是否是数字
            if (isdigit(c)) {
                isNum = true;
            }
            // 检查字符是否是小写字母
            else if (islower(c)) {
                isSmall = true;
            }
            // 检查字符是否是大写字母
            else if (isupper(c)) {
                isBig = true;
            }
            // 检查字符是否是特殊字符
            else {
                isSpec = true;
            }
        }
    
        // 检查结果字符串是否满足长度大于等于8，并且包含大写字母、小写字母、数字和特殊字符
        bool flagRes = result.size() >= 8 && isNum && isSmall && isBig && isSpec;
    
        // 输出结果字符串和检查结果
        std::cout << result << "," << std::boolalpha << flagRes << std::endl;
    
        return 0;
    }
    

## Java

    
    
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            // 创建一个Scanner对象来读取用户的输入
            Scanner scanner = new Scanner(System.in);
            // 读取一行输入
            String input = scanner.nextLine();
            // 创建一个StringBuilder对象来构建结果字符串
            StringBuilder result = new StringBuilder();
            // 创建四个布尔变量来检查输入字符串中是否包含大写字母、小写字母、数字和特殊字符
            boolean isBig = false;
            boolean isSmall = false;
            boolean isNum = false;
            boolean isSpec = false;
    
            // 遍历输入字符串中的每一个字符
            for (char c : input.toCharArray()) {
                // 如果字符是'<', 则删除结果字符串的最后一个字符
                if (c == '<') {
                    if (result.length() > 0) {
                        result.deleteCharAt(result.length() - 1);
                    }
                } else {
                    // 否则，将字符添加到结果字符串中
                    result.append(c);
                   
                }
            }
     
            // 遍历输入字符串中的每一个字符
            for (int i = 0; i < result.length(); i++) {
                    char c = result.charAt(i);
    
                // 检查字符是否是数字
                    if (  Character.isDigit(c)) {
                        isNum = true;
                    }
                    // 检查字符是否是小写字母
                    else if (  Character.isLowerCase(c)) {
                        isSmall = true;
                    }
                    // 检查字符是否是大写字母
                    else if ( Character.isUpperCase(c)) {
                        isBig = true;
                    }
                    // 检查字符是否是特殊字符
                    else  {
                        isSpec = true;
                    }
            }
    
            // 检查结果字符串是否满足长度大于等于8，并且包含大写字母、小写字母、数字和特殊字符
            boolean flagRes = result.length() >= 8 && isNum && isSmall && isBig && isSpec;
    
            // 输出结果字符串和检查结果
            System.out.println(result + "," + flagRes);
        }
    }
    
    

## javaScript

    
    
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    readline.on('line', input => {
      let result = '';
      let isBig = false;
      let isSmall = false;
      let isNum = false;
      let isSpec = false;
    
      for (let c of input) {
        if (c === '<') {
          result = result.slice(0, -1);
        } else {
          result += c;
        }
      }
    
      for (let c of result) {
        if (/[0-9]/.test(c)) {
          isNum = true;
        } else if (/[a-z]/.test(c)) {
          isSmall = true;
        } else if (/[A-Z]/.test(c)) {
          isBig = true;
        } else {
          isSpec = true;
        }
      }
    
      let flagRes = result.length >= 8 && isNum && isSmall && isBig && isSpec;
    
      console.log(result + "," + flagRes);
    
      readline.close();
    });
    

## Python

    
    
    # 读取用户的输入
    input_str = input()
    
    # 创建一个字符串来构建结果字符串
    result = ""
    
    # 创建四个布尔变量来检查输入字符串中是否包含大写字母、小写字母、数字和特殊字符
    is_big = False
    is_small = False
    is_num = False
    is_spec = False
    
    # 遍历输入字符串中的每一个字符
    for c in input_str:
        # 如果字符是'<', 则删除结果字符串的最后一个字符
        if c == '<':
            result = result[:-1]
        else:
            # 否则，将字符添加到结果字符串中
            result += c
    
    # 遍历输入字符串中的每一个字符
    for c in result:
        # 检查字符是否是数字
        if c.isdigit():
            is_num = True
        # 检查字符是否是小写字母
        elif c.islower():
            is_small = True
        # 检查字符是否是大写字母
        elif c.isupper():
            is_big = True
        # 检查字符是否是特殊字符
        else:
            is_spec = True
    
    # 检查结果字符串是否满足长度大于等于8，并且包含大写字母、小写字母、数字和特殊字符
    flag_res = len(result) >= 8 and is_num and is_small and is_big and is_spec
    
    # 输出结果字符串和检查结果
    print(result + "," + str(flag_res).lower())
    

## C语言

    
    
    #include <stdio.h>
    #include <string.h>
    #include <ctype.h> // 包含字符处理函数
    
    #define MAX_LEN 1000 // 定义最大输入长度
    
    int main() {
        char input[MAX_LEN];
        gets(input);
    
    
        // 定义用于构建最终密码的字符串数组
        char result[MAX_LEN];
        int length = 0; // 结果字符串的当前长度
    
        // 定义四个布尔变量，分别用来标记是否含有大写字母、小写字母、数字和特殊字符
        int hasUpper = 0;
        int hasLower = 0;
        int hasDigit = 0;
        int hasSpecial = 0;
    
        // 遍历输入字符串
        for (int i = 0; input[i] != '\0'; ++i) {
            if (input[i] == '<') {
                // 如果是退格符号，且结果字符串长度大于0，则删除最后一个字符
                if (length > 0) {
                    length--;
                }
            } else {
                // 否则添加字符到结果字符串
                result[length++] = input[i];
            }
        }
        result[length] = '\0'; // 字符串结束标志
    
        // 再次遍历结果字符串，检查密码安全要求
        for (int i = 0; i < length; ++i) {
            if (isupper(result[i])) hasUpper = 1; // 检查大写字母
            else if (islower(result[i])) hasLower = 1; // 检查小写字母
            else if (isdigit(result[i])) hasDigit = 1; // 检查数字
            else hasSpecial = 1; // 检查特殊字符
        }
    
        // 判断是否满足密码安全要求
        int isValid = length >= 8 && hasUpper && hasLower && hasDigit && hasSpecial;
    
        // 输出处理后的密码及其是否符合安全要求
        printf("%s,%s\n", result, isValid ? "true" : "false");
    
        return 0;
    }
    

## 完整用例

### 用例1

Aa1<2#<3$

### 用例2

abcde<FGH1!

### 用例3

aB1#<2$<3%

### 用例4

Aa1#<2$<3%<

### 用例5

aaaaaaA1!

### 用例6

AAAAAAa1!

### 用例7

AaBbCcDd!

### 用例8

Aa1Bb2Cc3

### 用例9

Aa1#Bb2$Cc3%

### 用例10

Aa1#<Bb2$<Cc3%<  

#### 文章目录

  * 题目描述：密码输入检测（本题分值100）
  * 输入描述
  * 输出描述
  * 示例1
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

![doutub_gif](https://i-blog.csdnimg.cn/blog_migrate/c642ba4672eeb69de0000eccb5a8d9b7.png)

