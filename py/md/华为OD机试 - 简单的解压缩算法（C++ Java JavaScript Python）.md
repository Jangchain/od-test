## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

现需要实现一种算法，能将一组压缩字符串还原成原始字符串，**还原规则** 如下：

1、字符后面加数字N，表示重复字符N次。例如：压缩内容为A3，表示原始字符串为AAA。  
2、花括号中的字符串加数字N，表示花括号中的字符重复N次。例如压缩内容为{AB}3，表示原始字符串为ABABAB。  
3、字符加N和花括号后面加N，支持**任意的嵌套** ，包括**互相嵌套** ，例如：压缩内容可以{A3B1{C}3}3

## 输入描述

输入一行压缩后的字符串

#### 备注

  * 输入保证，数字不会为0，花括号中的内容不会为空，保证输入的都是合法有效的压缩字符串
  * 输入输出字符串区分大小写
  * 输入的字符串长度范围为[1, 10000]
  * 输出的字符串长度范围为[1, 100000]
  * 数字N范围为[1, 10000]

## 输出描述

输出压缩前的字符串

## 示例1

输入

    
    
    {A3B1{C}3}3
    

输出

    
    
    AAABCCCAAABCCCAAABCCC
    

说明

> {A3B1{C}3}3代表A字符重复3次，B字符重复1次，花括号中的C字符重复3次，最外层花括号中的AAABCCC重复3次。

## 解题思路

题目要求实现一种算法，将一组按照特定规则压缩的字符串解压还原成原始字符串。具体的还原规则如下：

#### 还原规则

  1. **字符 + 数字N** ：字符后面加数字N，表示这个字符重复N次。例如：压缩内容`A3`表示原始字符串为`AAA`。

  2. **花括号 + 数字N** ：花括号中的字符串后加数字N，表示花括号内的内容重复N次。例如：压缩内容`{AB}3`表示原始字符串为`ABABAB`。

  3. **任意嵌套支持** ：字符加数字和花括号加数字支持任意嵌套，且嵌套可以互相包含。例如，`{A3B1{C}3}3`表示一个更复杂的嵌套，应该按规则逐层解压。

#### 输入输出示例

##### 示例 1

**输入：**

    
    
    {A3B1{C}3}3
    

**输出：**

    
    
    AAABCCCAAABCCCAAABCCC
    

**解释：**

  * `{A3B1{C}3}3` 表示：外层花括号内的内容 `{A3B1{C}3}` 重复3次。
  * 内部内容逐步展开： 
    * `A3` 展开为 `AAA`
    * `B1` 展开为 `B`
    * `{C}3` 展开为 `CCC`
    * 整体内容 `{A3B1{C}3}` 解压为 `AAABCCC`
  * 最外层的 `{AAABCCC}3` 解压为 `AAABCCCAAABCCCAAABCCC`。

#### 总结题目要点

  * **嵌套解压规则** ：需要递归或使用栈的结构处理嵌套结构。
  * **按顺序解压** ：外层包含的结构需要等内部内容完全解压后，按重复次数展开。
  * **字符区分大小写** ：大写、小写字符会被视为不同字符。

## Java

    
    
    import java.util.*;
    
    public class Main {
        // 重复操作函数，优化为使用 StringBuilder
        public static void repeatOperation(Stack<String> stack, int pos, int repeatCount) {
            StringBuilder tempStr = new StringBuilder();
            // 拼接栈中 pos 位置到栈顶的内容
            for (int i = pos; i < stack.size(); i++) {
                tempStr.append(stack.get(i));
            }
            // 重复拼接指定次数
            StringBuilder result = new StringBuilder();
            for (int i = 0; i < repeatCount; i++) {
                result.append(tempStr);
            }
            // 将栈 pos 之后的元素全部移除
            while (stack.size() > pos) {
                stack.pop();
            }
            // 将结果压入栈
            stack.push(result.toString());
        }
    
        public static void main(String[] args) {
            // 输入处理
            Scanner scanner = new Scanner(System.in);
            String inputStr = scanner.nextLine();
            inputStr = inputStr + " "; // 添加空格以确保最后一段数字能被处理
            Stack<String> stack = new Stack<>(); // 使用 Stack
            Stack<Integer> bracketPos = new Stack<>(); // 保存所有花括号的位置
            StringBuilder numberStr = new StringBuilder(); // 保存数字字符串
    
            for (int i = 0; i < inputStr.length(); i++) {
                char c = inputStr.charAt(i);
    
                // 处理数字
                if (Character.isDigit(c)) {
                    numberStr.append(c);
                    continue;
                }
    
                // 如果 numberStr 中有数字，进行处理
                if (numberStr.length() > 0) {
                    int repeatCount = Integer.parseInt(numberStr.toString());
                    numberStr.setLength(0); // 清空数字字符串
    
                    // 若栈顶是 '}'，处理嵌套的花括号
                    if (!stack.isEmpty() && "}".equals(stack.peek())) {
                        int pos = bracketPos.pop();
                        stack.pop(); // 移除 '}'
                        stack.remove(pos); // 移除 '{'
                        repeatOperation(stack, pos, repeatCount);
                    } else {
                        // 栈顶不是 '}'，直接重复栈顶字符
                        repeatOperation(stack, stack.size() - 1, repeatCount);
                    }
                }
    
                // 处理 '{'
                if (c == '{') {
                    bracketPos.push(stack.size());
                }
    
                // 其他字符 (字母 + '}')
                if (c != ' ') {
                    stack.push(String.valueOf(c));
                }
            }
    
            // 输出结果
            StringBuilder result = new StringBuilder();
            for (String x : stack) {
                result.append(x);
            }
            System.out.println(result);
        }
    }
    

## Python

    
    
    def repeat_operation(stack, pos, repeat_count):
        # 拼接栈中 pos 位置到栈顶的内容
        temp_str = "".join(stack[pos:])
        # 重复拼接指定次数
        result = temp_str * repeat_count
        # 移除栈 pos 之后的所有元素
        stack[pos:] = []
        # 将结果压入栈
        stack.append(result)
    
    
    def main():
        # 输入处理
        input_str = input() + " "  # 添加空格确保最后一个数字可以被处理
        stack = []  # 使用列表作为栈
        bracket_pos = []  # 保存所有花括号的位置
        number_str = ""  # 保存数字字符串
    
        for c in input_str:
            # 处理数字
            if c.isdigit():
                number_str += c
                continue
    
            # 如果 number_str 中有数字，进行处理
            if number_str:
                repeat_count = int(number_str)
                number_str = ""  # 清空数字字符串
    
                # 若栈顶是 '}'，处理嵌套的花括号
                if stack and stack[-1] == "}":
                    pos = bracket_pos.pop()
                    stack.pop()  # 移除 '}'
                    stack.pop(pos)  # 移除 '{'
                    repeat_operation(stack, pos, repeat_count)
                else:
                    # 栈顶不是 '}'，直接重复栈顶字符
                    repeat_operation(stack, len(stack) - 1, repeat_count)
    
            # 处理 '{'
            if c == '{':
                bracket_pos.append(len(stack))
    
            # 其他字符 (字母 + '}')
            if c != ' ':
                stack.append(c)
    
        # 输出结果
        result = "".join(stack)
        print(result)
    
    
    if __name__ == "__main__":
        main()
    

## JavaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    function repeatOperation(stack, pos, repeatCount) {
      // 拼接栈中 pos 位置到栈顶的内容
      let tempStr = stack.slice(pos).join('');
      // 重复拼接指定次数
      let result = tempStr.repeat(repeatCount);
      // 移除栈 pos 之后的所有元素
      stack.splice(pos);
      // 将结果压入栈
      stack.push(result);
    }
    
    function processInput(inputStr) {
      const stack = []; // 使用数组作为栈
      const bracketPos = []; // 保存所有花括号的位置
      let numberStr = ""; // 保存数字字符串
    
      inputStr += " "; // 添加空格以确保最后一个数字可以被处理
    
      for (let c of inputStr) {
        // 处理数字
        if (/\d/.test(c)) {
          numberStr += c;
          continue;
        }
    
        // 如果 numberStr 中有数字，进行处理
        if (numberStr) {
          const repeatCount = parseInt(numberStr);
          numberStr = ""; // 清空数字字符串
    
          // 若栈顶是 '}'，处理嵌套的花括号
          if (stack.length > 0 && stack[stack.length - 1] === '}') {
            const pos = bracketPos.pop();
            stack.pop(); // 移除 '}'
            stack.splice(pos, 1); // 移除 '{'
            repeatOperation(stack, pos, repeatCount);
          } else {
            // 栈顶不是 '}'，直接重复栈顶字符
            repeatOperation(stack, stack.length - 1, repeatCount);
          }
        }
    
        // 处理 '{'
        if (c === '{') {
          bracketPos.push(stack.length);
        }
    
        // 其他字符 (字母 + '}')
        if (c !== ' ') {
          stack.push(c);
        }
      }
    
      // 输出结果
      console.log(stack.join(''));
    }
    
    // 从控制台获取输入并处理
    rl.on("line", (inputStr) => {
      processInput(inputStr);
      rl.close();
    });
    

## C++

    
    
    #include <iostream>
    #include <stack>
    #include <vector>
    using namespace std;
    
    // 重复操作函数
    void repeatOperation(vector<string> &stack, int pos, int repeatCount) {
        string tempStr;
        // 拼接栈中 pos 位置到栈顶的内容
        for (int i = pos; i < stack.size(); i++) {
            tempStr += stack[i];
        }
        // 重复拼接指定次数
        string result;
        for (int i = 0; i < repeatCount; i++) {
            result += tempStr;
        }
        // 移除栈 pos 之后的所有元素
        stack.resize(pos);
        // 将结果压入栈
        stack.push_back(result);
    }
    
    int main() {
        string inputStr;
        getline(cin, inputStr);
        inputStr += " "; // 添加空格以确保最后一个数字可以被处理
    
        vector<string> stack;
        vector<int> bracketPos;
        string numberStr;
    
        for (char c : inputStr) {
            // 处理数字
            if (isdigit(c)) {
                numberStr += c;
                continue;
            }
    
            // 如果 numberStr 中有数字，进行处理
            if (!numberStr.empty()) {
                int repeatCount = stoi(numberStr);
                numberStr.clear();
    
                // 若栈顶是 '}'，处理嵌套的花括号
                if (!stack.empty() && stack.back() == "}") {
                    int pos = bracketPos.back();
                    bracketPos.pop_back();
                    stack.pop_back(); // 移除 '}'
                    stack.erase(stack.begin() + pos); // 移除 '{'
                    repeatOperation(stack, pos, repeatCount);
                } else {
                    repeatOperation(stack, stack.size() - 1, repeatCount);
                }
            }
    
            // 处理 '{'
            if (c == '{') {
                bracketPos.push_back(stack.size());
            }
    
            // 其他字符 (字母 + '}')
            if (c != ' ') {
                stack.push_back(string(1, c));
            }
        }
    
        // 输出结果
        for (const auto &s : stack) {
            cout << s;
        }
        cout << endl;
        return 0;
    }
    

## C语言

    
    
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/291d829a77c928ae964988ef3e0b4c37.png)

