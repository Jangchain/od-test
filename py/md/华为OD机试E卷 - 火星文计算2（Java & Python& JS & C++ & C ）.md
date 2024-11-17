## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

已知火星人使用的运算符为#、$，其与地球人的等价公式如下：

  * x#y = 4 _x+3_ y+2
  * x$y = 2*x+y+3

  1. 其中 x、y 是无符号整数
  2. 地球人公式按C语言规则计算
  3. 火星人公式中，#的优先级高于$，相同的运算符，按从左到右的顺序计算

现有一段火星人的字符串报文，请你来翻译并计算结果。

## 输入描述

火星人字符串表达式（结尾不带回车换行）

输入的字符串说明： 字符串为仅由无符号整数和操作符（#、$）组成的计算表达式。例如：

> 123#4$5#67$78

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

根据输入的火星人字符串输出计算结果（结尾不带回车换行）

## 用例

输入

    
    
    7#6$5#12
    

输出

    
    
    157
    

说明

> 7#6$5#12  
>  =(4 _7+3_ 6+2)$5#12  
>  =48KaTeX parse error: Expected 'EOF', got '#' at position 2: 5#̲12 =48(4
> _5+3_ 12+2)  
>  =48$58  
>  =2*48+58+3  
>  =157

## 解题思路

## C++

    
    
    #include <iostream>
    #include <string>
    #include <regex>
    using namespace std;
    // 处理字符串中的指定操作符
    string processOperations(string input, const string& operatorRegex) {
        regex pattern("(\\d+)" + operatorRegex + "(\\d+)");
        smatch match;
    
        // 循环处理字符串中所有匹配的操作符
        while (regex_search(input, match, pattern)) {
            // 从匹配结果中提取两个操作数
            long long a = stoll(match[1].str());
            long long b = stoll(match[2].str());
            // 根据操作符计算结果
            long long result = operatorRegex == "#" ? 4 * a + 3 * b + 2 : 2 * a + b + 3;
            // 将匹配到的表达式替换为计算结果
            input.replace(match.position(0), match.length(0), to_string(result));
        }
    
        // 返回处理后的字符串
        return input;
    }
    
    // 计算火星文本表达式的值
    long long calculate(string input) {
        // 处理所有的 '#' 操作
        input = processOperations(input, "#");
        // 处理所有的 '$' 操作
        input = processOperations(input, "\\$");
        // 将最终的字符串转换为长整型数字并返回
        return stoll(input);
    }
    
    
    // 主函数
    int main() {
        // 提示用户输入数据
        string input;
        cin >> input;
        // 计算并输出结果
        cout << calculate(input) << endl;
        return 0;
    }
    

## Java

    
    
    import java.util.regex.Matcher;
    import java.util.regex.Pattern;
    import java.util.Scanner;
    
    // 主类
    public class Main {
        // 主函数
        public static void main(String[] args) {
            // 创建扫描器对象，用于接收控制台输入
            Scanner sc = new Scanner(System.in);
            // 读取一行输入作为字符串
            String str = sc.next();
            // 计算并输出结果
            System.out.println(calculate(str));
        }
    
        // 计算火星文本表达式的值
        private static long calculate(String input) {
            // 处理所有的 '#' 操作
            input = processOperations(input, "#");
            // 处理所有的 '$' 操作
            input = processOperations(input, "\\$");
            // 将最终的字符串转换为长整型数字并返回
            return Long.parseLong(input);
        }
    
        // 处理字符串中的指定操作符
        private static String processOperations(String input, String operator) {
            // 创建正则表达式模式，匹配操作符及其两侧的数字
            Pattern pattern = Pattern.compile("(\\d+)" + operator + "(\\d+)");
            Matcher matcher;
    
            // 循环处理字符串中所有匹配的操作符
            while ((matcher = pattern.matcher(input)).find()) {
                // 从匹配结果中提取两个操作数
                long a = Long.parseLong(matcher.group(1));
                long b = Long.parseLong(matcher.group(2));
                // 根据操作符计算结果
                long result = operator.equals("#") ? 4 * a + 3 * b + 2 : 2 * a + b + 3;
                // 将匹配到的表达式替换为计算结果
                input = input.replaceFirst("(\\d+)" + operator + "(\\d+)", String.valueOf(result));
            }
    
            // 返回处理后的字符串
            return input;
        }
    }
    

## javaScript

    
    
     
    const readline = require('readline');
     
    const rl = readline.createInterface({
      input: process.stdin,  
      output: process.stdout 
    });
     
    rl.on('line', (input) => {
     
      console.log(calculate(input));
    });
    
    // 计算火星文本表达式的值的函数
    function calculate(input) {
      // 首先处理所有的 '#' 操作
      input = processOperations(input, '#');
      // 然后处理所有的 '$' 操作
      input = processOperations(input, '\\$');
      // 将最终的字符串转换为长整型数字并返回
      return BigInt(input);
    }
    
    // 处理特定操作符的函数
    function processOperations(input, operator) {
      // 创建正则表达式对象，用于匹配操作符和它周围的数字
      let pattern = new RegExp('(\\d+)' + operator + '(\\d+)', 'g');
      let match;
      let prevInput;
    
      do {
        // 保存当前输入字符串，用于后面的比较
        prevInput = input;
        // 使用正则表达式匹配并处理所有相应的操作
        while ((match = pattern.exec(input)) !== null) {
          // 将匹配到的数字转换为 BigInt 类型
          const a = BigInt(match[1]);
          const b = BigInt(match[2]);
          // 根据操作符计算结果
          const result = operator === '#' ? 4n * a + 3n * b + 2n : 2n * a + b + 3n;
          // 构造新的字符串
          input = input.substring(0, match.index) + result.toString() + input.substring(match.index + match[0].length);
          // 重置 pattern 的 lastIndex，以便重新开始新的匹配
          pattern.lastIndex = 0;
        }
        // 如果当前输入字符串改变了，则继续循环处理
      } while (prevInput !== input);
    
      // 返回处理后的字符串
      return input;
    }
    

## Python

    
    
    import re
    
    # 计算火星文本表达式的值
    def calculate(input):
        # 处理所有的 '#' 操作
        input = process_operations(input, '#')
        # 处理所有的 '$' 操作
        input = process_operations(input, r'\$')
        # 将最终的字符串转换为长整型数字并返回
        return int(input)
    
    # 处理字符串中的指定操作符
    def process_operations(input, operator):
        # 创建正则表达式模式，匹配操作符及其两侧的数字
        pattern = re.compile(r'(\d+)' + operator + r'(\d+)')
    
        # 循环处理字符串中所有匹配的操作符
        while True:
            match = pattern.search(input)
            if not match:
                break
            # 从匹配结果中提取两个操作数
            a = int(match.group(1))
            b = int(match.group(2))
            # 根据操作符计算结果
            result = 4 * a + 3 * b + 2 if operator == '#' else 2 * a + b + 3
            # 将匹配到的表达式替换为计算结果
            input = input[:match.start()] + str(result) + input[match.end():]
    
        # 返回处理后的字符串
        return input
    # 提示用户输入数据
    input_str = input()
    # 计算并输出结果
    print(calculate(input_str))
    

## C语言

    
    
    
    #include <stdio.h>
    #include <stdlib.h>
    #include <string.h>
    #include <stdbool.h>
    
    // 定义火星运算符的函数
    long long marsHash(long long x, long long y) {
        return 4 * x + 3 * y + 2; // 实现 x#y = 4*x + 3*y + 2
    }
    
    long long marsDollar(long long x, long long y) {
        return 2 * x + y + 3; // 实现 x$y = 2*x + y + 3
    }
    
    int main() {
        char expression[10000]; // 输入表达式的缓冲区
        scanf("%s", expression); // 读取火星表达式
    
        long long nums[5000]; // 存储数字的数组
        int numIndex = 0; // 数字数组的索引
        char ops[5000]; // 存储操作符的数组
        int opIndex = 0; // 操作符数组的索引
        unsigned long long num = 0; // 用于累积当前数字的变量，使用 unsigned long long
        bool readingNumber = false; // 标志，指示我们当前是否正在读取数字
    
        // 解析输入的火星表达式
        for (int i = 0; expression[i] != '\0'; ++i) {
            if (expression[i] >= '0' && expression[i] <= '9') { // 如果是数字
                num = num * 10 + (expression[i] - '0'); // 累积数字
                readingNumber = true; // 我们正在读取数字
            } else { // 如果不是数字，那么它必须是一个操作符
                if (readingNumber) {
                    nums[numIndex++] = num; // 存储累积的数字
                    num = 0; // 为下一个数字重置 num
                }
                readingNumber = false;
                ops[opIndex++] = expression[i]; // 存储操作符
            }
        }
        if (readingNumber) { // 如果字符串以数字结束
            nums[numIndex++] = num; // 存储最后一个数字
        }
    
        // 首先处理所有 '#' 操作，因为它们的优先级更高
        for (int i = 0; i < opIndex; ++i) {
            if (ops[i] == '#') {
                nums[i] = marsHash(nums[i], nums[i + 1]); // 执行 '#' 操作
                // 将剩余的数字和操作符向左移动
                for (int j = i + 1; j < numIndex - 1; ++j) {
                    nums[j] = nums[j + 1];
                }
                for (int j = i; j < opIndex - 1; ++j) {
                    ops[j] = ops[j + 1];
                }
                numIndex--; // 减少数字索引
                opIndex--; // 减少操作符索引
                i--; // 重新评估当前位置
            }
        }
    
        // 接下来处理所有 '$' 操作
        long long result = nums[0]; // 用第一个数字初始化结果
        for (int i = 0; i < opIndex; ++i) {
            if (ops[i] == '$') {
                result = marsDollar(result, nums[i + 1]); // 执行 '$' 操作
            }
        }
    
        printf("%lld\n", result); // 输出结果
        return 0;
    }
    

![fengmian](https://i-blog.csdnimg.cn/blog_migrate/fa0220c4ecc155c6333721190973667f.png)

## 完整用例

### 用例1

    
    
    1$2#3$4#5$6#7$8#9$10
    

### 用例3

    
    
    6#7$8#9$10#11$12#13
    

### 用例4

    
    
    2#3$4#5
    

### 用例5

    
    
    10$20#30$40#50
    

### 用例6

    
    
    100$200#300$400
    

### 用例7

    
    
    50$60$70$80
    

### 用例8

    
    
    123#456$789
    

### 用例9

    
    
    1#2
    

### 用例10

    
    
    17$13$10#19
    

