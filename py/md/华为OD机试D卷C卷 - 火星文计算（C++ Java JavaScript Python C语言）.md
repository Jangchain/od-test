## 题目描述

已知火星人使用的运算符为#、$，其与地球人的等价公式如下：

x#y = 2*x+3*y+4

x$y = 3*x+y+2

  1. 其中x、y是无符号整数
  2. 地球人公式按C语言规则计算
  3. 火星人公式中，$的优先级高于#，相同的运算符，按从左到右的顺序计算

现有一段火星人的字符串报文，请你来翻译并计算结果。

## 输入描述

火星人字符串表达式（结尾不带回车换行）

输入的字符串说明：字符串为仅由无符号整数和操作符（#、$）组成的计算表达式。

例如：123#4$5#67$78。

  1. 用例保证字符串中，操作数与操作符之间没有任何分隔符。
  2. 用例保证操作数取值范围为32位无符号整数。
  3. 保证输入以及计算结果不会出现整型溢出。
  4. 保证输入的字符串为合法的求值报文，例如：123#4$5#67$78
  5. 保证不会出现非法的求值报文，例如类似这样字符串：

#4$5 //缺少操作数

4$5# //缺少操作数

4#$5 //缺少操作数

4 $5 //有空格

3+4-5*6/7 //有其它操作符

12345678987654321$54321 //32位整数计算溢出

## 输出描述

根据输入的火星人字符串输出计算结果（结尾不带回车换行）。

## 用例

输入| 7#6$5#12  
---|---  
输出| 226  
说明| 7#6$5#12=7#(3*6+5+2)#12=7#25#12=(2*7+3*25+4)#12=93#12=2*93+3*12+4=226  
  
## 解题思路 ：

  1. **处理输入** ：首先，读取用户输入的火星人字符串表达式。

  2. **遍历字符串** ：遍历输入的字符串，根据字符类型（数字或运算符）执行相应的操作。

  3. **处理数字** ：当遇到数字字符时，提取完整的数字并将其转换为长整型。然后将数字压入栈中。这样可以确保在处理运算符时，操作数已经准备好。

  4. **处理运算符** ：当遇到运算符时，根据运算符类型执行相应的操作：

     * 如果遇到 `$` 运算符，首先弹出栈顶元素作为 `y`，然后提取紧跟在 `$` 后面的数字作为 `x`。接着计算 `x$y` 的值（`3 * y + x + 2`），并将结果压入栈中。这样可以确保 `$` 运算符的优先级高于 `#` 运算符。
     * 如果遇到 `#` 运算符，不执行任何操作，只将索引向后移动一位。这是因为在最后处理 `#` 运算符时，我们会按照从左到右的顺序计算。
  5. **反转栈** ：遍历字符串完成后，将栈中的元素反转。这是为了确保从栈底部开始计算 `#` 运算符。

  6. **计算结果** ：从反转后的栈底部开始计算 `x#y` 的值。首先弹出栈底元素作为初始结果。然后，当栈不为空时，弹出栈顶元素作为 `x`，并计算 `x#y` 的值（`2 * result + 3 * x + 4`），更新结果。最后返回计算结果。

## C++

    
    
    #include <iostream> // 导入 iostream 库，用于输入输出
    #include <stack> // 导入 stack 库，用于存储操作数
    #include <string> // 导入 string 库，用于处理字符串
    #include <cctype> // 导入 cctype 库，用于处理字符
    
    long operate(const std::string& str) {
        std::stack<long> stack; // 创建一个栈用于存储操作数
        int i = 0; // 初始化遍历字符串的索引
        while (i < str.length()) { // 遍历输入的字符串
            char ch = str[i]; // 获取当前字符
            if (isdigit(ch)) { // 如果当前字符是数字
                int start = i; // 记录数字的起始位置
                while (i < str.length() && isdigit(str[i])) { // 提取完整的数字
                    i++;
                }
                long num = std::stol(str.substr(start, i - start)); // 将提取到的数字字符串转换为长整型
                stack.push(num); // 将数字压入栈中
            } else {
                if (ch == '$') { // 如果当前字符是 $ 运算符
                    long y = stack.top(); // 弹出栈顶元素作为 y
                    stack.pop();
                    i++; // 索引向后移动一位
                    int start = i; // 记录数字的起始位置
                    while (i < str.length() && isdigit(str[i])) { // 提取完整的数字
                        i++;
                    }
                    long x = std::stol(str.substr(start, i - start)); // 将提取到的数字字符串转换为长整型
                    stack.push(3 * y + x + 2); // 计算 x$y 的值并压入栈中
                } else if (ch == '#') { // 如果当前字符是 # 运算符
                    i++; // 索引向后移动一位
                }
            }
        }
    
        std::stack<long> reversedStack; // 创建一个新的栈，用于反转操作数栈中的元素
        while (!stack.empty()) { // 当操作数栈不为空时
            reversedStack.push(stack.top()); // 将操作数栈的元素弹出并压入新栈中
            stack.pop();
        }
    
        long result = reversedStack.top(); // 弹出新栈的栈顶元素作为初始结果
        reversedStack.pop();
    
        while (!reversedStack.empty()) { // 当新栈不为空时
            long x = reversedStack.top(); // 弹出新栈的栈顶元素作为 x
            reversedStack.pop();
            result = 2 * result + 3 * x + 4; // 计算 x#y 的值并更新结果
        }
    
        return result; // 返回计算结果
    }
    
    int main() {
        std::string str; // 创建一个字符串变量，用于存储输入的火星人字符串表达式
        std::cin >> str; // 读取输入的火星人字符串表达式
        std::cout << operate(str) << std::endl; // 计算并输出结果
        return 0;
    }
    
    
    

## JavaScript

    
    
    const readline = require('readline'); // 导入 readline 模块，用于读取输入
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    
    // 读取输入的火星人字符串表达式
    rl.on('line', (str) => {
      console.log(operate(str)); // 计算并输出结果
      rl.close();
    });
    
    function operate(str) {
      const stack = []; // 创建一个栈用于存储操作数
      let i = 0; // 初始化遍历字符串的索引
    
      while (i < str.length) { // 遍历输入的字符串
        const ch = str.charAt(i); // 获取当前字符
    
        if (/\d/.test(ch)) { // 如果当前字符是数字
          const start = i; // 记录数字的起始位置
          while (i < str.length && /\d/.test(str.charAt(i))) { // 提取完整的数字
            i++;
          }
          const num = parseInt(str.substring(start, i), 10); // 将提取到的数字字符串转换为整型
          stack.push(num); // 将数字压入栈中
        } else {
          if (ch === '$') { // 如果当前字符是 $ 运算符
            const y = stack.pop(); // 弹出栈顶元素作为 y
            i++; // 索引向后移动一位
            const start = i; // 记录数字的起始位置
            while (i < str.length && /\d/.test(str.charAt(i))) { // 提取完整的数字
              i++;
            }
            const x = parseInt(str.substring(start, i), 10); // 将提取到的数字字符串转换为整型
            stack.push(3 * y + x + 2); // 计算 x$y 的值并压入栈中
          } else if (ch === '#') { // 如果当前字符是 # 运算符
            i++; // 索引向后移动一位
          }
        }
      }
    
      const reversedStack = []; // 创建一个新的栈，用于反转操作数栈中的元素
      while (stack.length > 0) { // 当操作数栈不为空时
        reversedStack.push(stack.pop()); // 将操作数栈的元素弹出并压入新栈中
      }
    
      let result = reversedStack.pop(); // 弹出新栈的栈顶元素作为初始结果
    
      while (reversedStack.length > 0) { // 当新栈不为空时
        const x = reversedStack.pop(); // 弹出新栈的栈顶元素作为 x
        result = 2 * result + 3 * x + 4; // 计算 x#y 的值并更新结果
      }
    
      return result; // 返回计算结果
    }
    
    
    
    

## Java

    
    
    import java.util.Scanner;  
    import java.util.Stack;  
    
    public class Main {
        public static void main(String[] args) {
            Scanner sc = new Scanner(System.in); // 创建 Scanner 对象，用于读取输入
            String str = sc.next(); // 读取输入的火星人字符串表达式
            System.out.println(operate(str)); // 计算并输出结果
        }
    
        public static long operate(String str) {
            Stack<Long> stack = new Stack<>(); // 创建一个栈用于存储操作数
            int i = 0; // 初始化遍历字符串的索引
            while (i < str.length()) { // 遍历输入的字符串
                char ch = str.charAt(i); // 获取当前字符
                if (Character.isDigit(ch)) { // 如果当前字符是数字
                    int start = i; // 记录数字的起始位置
                    while (i < str.length() && Character.isDigit(str.charAt(i))) { // 提取完整的数字
                        i++;
                    }
                    long num = Long.parseLong(str.substring(start, i)); // 将提取到的数字字符串转换为长整型
                    stack.push(num); // 将数字压入栈中
                } else {
                    if (ch == '$') { // 如果当前字符是 $ 运算符
                        long y = stack.pop(); // 弹出栈顶元素作为 y
                        i++; // 索引向后移动一位
                        int start = i; // 记录数字的起始位置
                        while (i < str.length() && Character.isDigit(str.charAt(i))) { // 提取完整的数字
                            i++;
                        }
                        long x = Long.parseLong(str.substring(start, i)); // 将提取到的数字字符串转换为长整型
                        stack.push(3 * y + x + 2); // 计算 x$y 的值并压入栈中
                    } else if (ch == '#') { // 如果当前字符是 # 运算符
                        i++; // 索引向后移动一位
                    }
                }
            }
    
            Stack<Long> reversedStack = new Stack<>(); // 创建一个新的栈，用于反转操作数栈中的元素
            while (!stack.isEmpty()) { // 当操作数栈不为空时
                reversedStack.push(stack.pop()); // 将操作数栈的元素弹出并压入新栈中
            }
    
            long result = reversedStack.pop(); // 弹出新栈的栈顶元素作为初始结果
    
            while (!reversedStack.isEmpty()) { // 当新栈不为空时
                long x = reversedStack.pop(); // 弹出新栈的栈顶元素作为 x
                result = 2 * result + 3 * x + 4; // 计算 x#y 的值并更新结果
            }
    
            return result; // 返回计算结果
        }
    }
    
    
    
    
    

## Python

    
    
    def operate(s):
        stack = []  # 创建一个栈用于存储操作数
        i = 0  # 初始化遍历字符串的索引
        while i < len(s):  # 遍历输入的字符串
            ch = s[i]  # 获取当前字符
            if ch.isdigit():  # 如果当前字符是数字
                start = i  # 记录数字的起始位置
                while i < len(s) and s[i].isdigit():  # 提取完整的数字
                    i += 1
                num = int(s[start:i])  # 将提取到的数字字符串转换为整型
                stack.append(num)  # 将数字压入栈中
            else:
                if ch == '$':  # 如果当前字符是 $ 运算符
                    y = stack.pop()  # 弹出栈顶元素作为 y
                    i += 1  # 索引向后移动一位
                    start = i  # 记录数字的起始位置
                    while i < len(s) and s[i].isdigit():  # 提取完整的数字
                        i += 1
                    x = int(s[start:i])  # 将提取到的数字字符串转换为整型
                    stack.append(3 * y + x + 2)  # 计算 x$y 的值并压入栈中
                elif ch == '#':  # 如果当前字符是 # 运算符
                    i += 1  # 索引向后移动一位
    
        reversed_stack = []  # 创建一个新的栈，用于反转操作数栈中的元素
        while stack:  # 当操作数栈不为空时
            reversed_stack.append(stack.pop())  # 将操作数栈的元素弹出并压入新栈中
    
        result = reversed_stack.pop()  # 弹出新栈的栈顶元素作为初始结果
    
        while reversed_stack:  # 当新栈不为空时
            x = reversed_stack.pop()  # 弹出新栈的栈顶元素作为 x
            result = 2 * result + 3 * x + 4  # 计算 x#y 的值并更新结果
    
        return result  # 返回计算结果
    
    
    # 读取输入的火星人字符串表达式
    input_str = input()
    # 计算并输出结果
    print(operate(input_str))
    
    
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    #include <string.h>
    #include <stdbool.h> 
    
    // 定义火星运算符的运算函数
    int marsDollar(int x, int y) {
        return 3 * x + y + 2; // 实现$x$y = 3*x+y+2
    }
    
    int marsHash(int x, int y) {
        return 2 * x + 3 * y + 4; // 实现x#y = 2*x+3*y+4
    }
    
    int main() {
        char expression[2000];
        fgets(expression, 2000, stdin); // 读取火星表达式
        int nums[1000], numIndex = 0; // 存储数字
        char ops[1000], opIndex = 0; // 存储操作符
        int num = 0;
        bool readingNumber = false; // 是否正在读取数字
    
        // 解析输入的火星表达式
        for (int i = 0; expression[i]; ++i) {
            if (expression[i] >= '0' && expression[i] <= '9') { // 是数字
                num = num * 10 + (expression[i] - '0');
                readingNumber = true;
            } else {
                if (readingNumber) {
                    nums[numIndex++] = num; // 存储已读取的数字
                    num = 0; // 重置num为下一个数字准备
                }
                readingNumber = false;
                if (expression[i] == '#' || expression[i] == '$') {
                    ops[opIndex++] = expression[i]; // 存储操作符
                }
            }
        }
        if (readingNumber) { // 如果字符串以数字结尾
            nums[numIndex++] = num;
        }
    
        // 先计算所有的$操作
        for (int i = 0; i < opIndex; ++i) {
            if (ops[i] == '$') {
                nums[i] = marsDollar(nums[i], nums[i + 1]); // 执行$操作
                // 移除已计算的数和操作符
                for (int j = i + 1; j < numIndex - 1; ++j) {
                    nums[j] = nums[j + 1];
                }
                for (int j = i; j < opIndex - 1; ++j) {
                    ops[j] = ops[j + 1];
                }
                numIndex--; opIndex--; i--;
            }
        }
    
        // 计算所有的#操作
        int result = nums[0];
        for (int i = 0; i < opIndex; ++i) {
            if (ops[i] == '#') {
                result = marsHash(result, nums[i + 1]); // 执行#操作
            }
        }
    
        printf("%d", result); // 输出结果
        return 0;
    }
    

## 完整用例

### 用例1

    
    
    7#6$5#12
    

### 用例2

    
    
    1$2#3$4
    

### 用例3

    
    
    5#6$7#8$9
    

### 用例4

    
    
    10$11#12$13#14$15
    

### 用例5

    
    
    16#17$18#19$20$21
    

### 用例6

    
    
    22$23#24$25#26$27
    

### 用例7

    
    
    28#29$30#31$32$33
    

### 用例8

    
    
    34$35#36$37#38$39
    

### 用例9

    
    
    40#41$42#43$44$45
    

### 用例10

    
    
    46$47#48$49#50$51
    

#### 文章目录

  * 题目描述
  * 输入描述
  * 输出描述
  * 用例
  * 解题思路 ：
  * C++
  * JavaScript
  * Java
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

![fengmian](https://i-blog.csdnimg.cn/blog_migrate/169f277a87c29b8ff13d65ef9e7eeec7.png)

