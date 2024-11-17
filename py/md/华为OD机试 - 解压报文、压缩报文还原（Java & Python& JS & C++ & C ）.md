## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

为了提升数据传输的效率，会对传输的报文进行压缩处理。

输入一个压缩后的报文，请返回它解压后的原始报文。

压缩规则：n[str]，表示方括号内部的 str 正好重复 n 次。

注意 n 为正整数（0 < n <= 100），str只包含小写英文字母，不考虑异常情况。

## 输入描述

输入压缩后的报文：

1）不考虑无效的输入，报文没有额外的空格，方括号总是符合格式要求的；

2）原始报文不包含数字，所有的数字只表示重复的次数 n ，例如不会出现像 5b 或 3[8] 的输入；

## 输出描述

解压后的原始报文

注：原始报文长度不会超过1000，不考虑异常的情况

## 示例1

输入

    
    
    3[k]2[mn]
    

输出

    
    
    kkkmnmn
    

说明

> k 重复3次，mn 重复2次，最终得到 kkkmnmn

## 示例2

输入

    
    
    3[m2[c]]
    

输出

    
    
    mccmccmcc
    

说明

> m2[c] 解压缩后为 mcc，重复三次为 mccmccmcc

## 解题思路

压缩报文的格式为：`n[str]`，其中 `n` 是一个表示重复次数的正整数，`str` 是需要重复的字符串部分，且 `str`
只包含小写字母。题目要求我们将这种格式的报文解压，得到原始报文。

#### 具体规则：

  1. 报文中的 `n[str]` 表示 `str` 字符串需要重复 `n` 次。例如： 
     * `3[k]` 表示字符串 `k` 需要重复 3 次，解压后为 `kkk`。
     * `2[mn]` 表示字符串 `mn` 需要重复 2 次，解压后为 `mnmn`。

#### 解题思路：

  1. **栈的使用** ：这是一个经典的用栈解决的题目。我们可以用栈来处理嵌套的结构，比如 `n[str]` 这样的结构，先解压括号内部的内容，然后再处理外部的结构。

  2. **主要步骤** ：

     * 遍历字符串，如果遇到数字（表示重复次数 `n`），将数字读取出来。
     * 遇到 `[` 时，开始记录括号内的字符串，直到遇到对应的 `]`，此时将前面的字符串部分和数字进行拼接。
     * 将结果拼接到最终的解压字符串中。

#### 示例解析（3[m2[c]]）：

  * 初始字符串为 `3[m2[c]]`。
  * 第一步：遇到 `3`，表示后面 `[...]` 内的内容重复 3 次。
  * 第二步：遇到 `m`，开始记录字符串部分 `m`。
  * 第三步：遇到 `2`，表示后面 `[c]` 内的内容重复 2 次。
  * 第四步：遇到 `c`，记录字符串 `c`。
  * 第五步：遇到 `]`，表示 `2[c]` 解压为 `cc`。
  * 第六步：`mcc` 需要重复 3 次，解压后为 `mccmccmcc`。

因此输出结果为 `mccmccmcc`。

## Java

    
    
    import java.util.Scanner;
    import java.util.Stack;
    import java.util.ArrayList;
    import java.util.List;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            String compressed_string = scanner.next();
    
            Stack<List<String>> stack = new Stack<>();
            stack.push(new ArrayList<>(List.of("", "1", ""))); // 使用栈来存储解压后的字符串和重复次数
    
            String current_str = ""; // 当前字符
            String current_num = ""; // 当前重复次数
    
            for (char c : compressed_string.toCharArray()) {
                if (Character.isLetter(c)) { // 如果是字母
                    current_str += c;
                } else if (Character.isDigit(c)) { // 如果是数字
                    current_num += c;
                } else if (c == '[') { // 如果是左括号
                    stack.push(new ArrayList<>(List.of(current_str, current_num, ""))); // 将当前字符和重复次数入栈
                    current_str = current_num = ""; // 重置当前字符和重复次数
                } else { // 如果是右括号
                    List<String> prev = stack.pop();
                    String prev_str = prev.get(0);
                    int times = Integer.parseInt(prev.get(1));
                    String prev_result = prev.get(2);
    
                    String repeated_str = "";
                    for (int i = 0; i < times; i++) {
                        repeated_str += prev_result + current_str;
                    }
    
                    stack.peek().set(2, stack.peek().get(2) + prev_str + repeated_str); // 更新栈顶元素的结果
                    current_str = ""; // 重置当前字符
                }
            }
    
            String result = stack.peek().get(2) + current_str; // 返回最终的结果
            System.out.println(result);
        }
    }
    
    

## Python

    
    
    compressed_string = input()
    stack = [['', 1, '']]  # 使用栈来存储解压后的字符串和重复次数
    current_str = ''  # 当前字符
    current_num = ''  # 当前重复次数
    for c in compressed_string:
        if c.isalpha():  # 如果是字母
            current_str += c
        elif c.isdigit():  # 如果是数字
            current_num += c
        elif c == '[':  # 如果是左括号
            stack.append([current_str, int(current_num), ''])  # 将当前字符和重复次数入栈
            current_str = current_num = ''  # 重置当前字符和重复次数
        else:  # 如果是右括号
            prev_str, times, prev_result = stack.pop()  # 弹出栈顶元素
            stack[-1][-1] += prev_str + times * (prev_result + current_str)  # 更新栈顶元素的结果
            current_str = ''  # 重置当前字符
    result = stack.pop()[-1] + current_str  # 返回最终的结果
    print(result)
    
    

## JavaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    let compressed_string = "";
    
    rl.on("line", (input) => {
      compressed_string = input;
    
      const stack = [];
      stack.push(["", "1", ""]); // 使用数组来模拟栈，存储解压后的字符串和重复次数
    
      let current_str = ""; // 当前字符
      let current_num = ""; // 当前重复次数
    
      for (const c of compressed_string) {
        if (/[a-zA-Z]/.test(c)) { // 如果是字母
          current_str += c;
        } else if (/[0-9]/.test(c)) { // 如果是数字
          current_num += c;
        } else if (c === '[') { // 如果是左括号
          stack.push([current_str, current_num, ""]); // 将当前字符和重复次数入栈
          current_str = current_num = ""; // 重置当前字符和重复次数
        } else { // 如果是右括号
          const prev = stack.pop();
          const prev_str = prev[0];
          const times = parseInt(prev[1]);
          const prev_result = prev[2];
    
          let repeated_str = "";
          for (let i = 0; i < times; i++) {
            repeated_str += prev_result + current_str;
          }
    
          stack[stack.length - 1][2] += prev_str + repeated_str; // 更新栈顶元素的结果
          current_str = ""; // 重置当前字符
        }
      }
    
      const result = stack[stack.length - 1][2] + current_str; // 返回最终的结果
      console.log(result);
    
      rl.close();
    });
    
    
    

## C++

    
    
    #include <iostream>
    #include <stack>
    #include <string>
    #include <vector>
    
    int main() {
        std::string compressed_string;
        std::cin >> compressed_string;
    
        std::stack<std::vector<std::string>> stack;
        stack.push({"", "1", ""}); // 使用栈来存储解压后的字符串和重复次数
    
        std::string current_str = ""; // 当前字符
        std::string current_num = ""; // 当前重复次数
    
        for (char c : compressed_string) {
            if (isalpha(c)) { // 如果是字母
                current_str += c;
            } else if (isdigit(c)) { // 如果是数字
                current_num += c;
            } else if (c == '[') { // 如果是左括号
                stack.push({current_str, current_num, ""}); // 将当前字符和重复次数入栈
                current_str = current_num = ""; // 重置当前字符和重复次数
            } else { // 如果是右括号
                std::vector<std::string> prev = stack.top();
                stack.pop();
                std::string prev_str = prev[0];
                int times = std::stoi(prev[1]);
                std::string prev_result = prev[2];
    
                std::string repeated_str = "";
                for (int i = 0; i < times; i++) {
                    repeated_str += prev_result + current_str;
                }
    
                stack.top()[2] += prev_str + repeated_str; // 更新栈顶元素的结果
                current_str = ""; // 重置当前字符
            }
        }
    
        std::string result = stack.top()[2] + current_str; // 返回最终的结果
        std::cout << result << std::endl;
    
        return 0;
    }
    
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    #include <string.h>
    #include <ctype.h>
    
    #define MAX 1000 // 栈的最大长度
    #define MAX_STR_LEN 1000 // 每个字符串的最大长度
    
    // 模拟栈的结构
    typedef struct {
        char str[MAX][MAX_STR_LEN]; // 字符串
        int num[MAX];               // 重复次数
        char result[MAX][MAX_STR_LEN]; // 解压后的字符串
        int top;                    // 栈顶指针
    } Stack;
    
    // 初始化栈
    void initStack(Stack *stack) {
        stack->top = -1;
    }
    
    // 压栈
    void push(Stack *stack, const char *str, const char *num, const char *result) {
        if (stack->top + 1 < MAX) {
            stack->top++;
            strcpy(stack->str[stack->top], str);
            stack->num[stack->top] = atoi(num); // 将字符串数字转换为整数
            strcpy(stack->result[stack->top], result);
        }
    }
    
    // 出栈
    void pop(Stack *stack, char *str, int *num, char *result) {
        if (stack->top >= 0) {
            strcpy(str, stack->str[stack->top]);
            *num = stack->num[stack->top];
            strcpy(result, stack->result[stack->top]);
            stack->top--;
        }
    }
    
    int main() {
        char compressed_string[MAX_STR_LEN];
     
        scanf("%s", compressed_string);
    
        Stack stack;
        initStack(&stack);
        push(&stack, "", "1", ""); // 初始化栈，使用空字符串和默认重复次数1
    
        char current_str[MAX_STR_LEN] = ""; // 当前的解压字符串
        char current_num[MAX_STR_LEN] = ""; // 当前的重复次数
    
        for (int i = 0; i < strlen(compressed_string); i++) {
            char c = compressed_string[i];
    
            if (isalpha(c)) { // 如果是字母
                int len = strlen(current_str);
                current_str[len] = c;
                current_str[len + 1] = '\0';
            } else if (isdigit(c)) { // 如果是数字
                int len = strlen(current_num);
                current_num[len] = c;
                current_num[len + 1] = '\0';
            } else if (c == '[') { // 如果是左括号
                push(&stack, current_str, current_num, ""); // 将当前字符串和重复次数压栈
                strcpy(current_str, ""); // 重置当前字符串
                strcpy(current_num, ""); // 重置当前次数
            } else if (c == ']') { // 如果是右括号
                char prev_str[MAX_STR_LEN];
                int times;
                char prev_result[MAX_STR_LEN];
    
                pop(&stack, prev_str, &times, prev_result); // 弹出栈顶元素
    
                char repeated_str[MAX_STR_LEN] = "";
                for (int j = 0; j < times; j++) { // 根据次数生成重复的字符串
                    strcat(repeated_str, prev_result);
                    strcat(repeated_str, current_str);
                }
    
                strcpy(current_str, prev_str); // 拼接上先前的字符串
                strcat(current_str, repeated_str); // 拼接重复的结果
            }
        }
    
        printf("%s\n", current_str);
    
        return 0;
    }
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

#### 完整用例

##### 用例1

    
    
    2[a]
    

##### 用例2

    
    
    4[b]
    

##### 用例3

    
    
    1[c]
    

##### 用例4

    
    
    5[d]
    

##### 用例5

    
    
    2[e3[f]]
    

##### 用例6

    
    
    10[a10[b]5[c]]
    

##### 用例7

    
    
    3[2[a]4[b]]
    

##### 用例8

    
    
    2[3[a]2[b]3[c]]
    

##### 用例9

    
    
    4[2[3[a]2[b]]]
    

##### 用例10

    
    
    5[4[3[a]2[b]]]
    

