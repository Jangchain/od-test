## 题目描述：最长合法表达式（本题分值200）

提取字符串中的最长合法简单数学表达式字符串长度最长的，并计算表达式的值。如果没有返回 0  
简单数学表达式只能包含以下内容  
0-9 数字，符号±*  
说明:  
1.所有数字，计算结果都不超过 long

2.如果有多个长度一样的，请返回第一个表达式的结果

3.数学表达式，必须是最长的，合法的  
4.操作符不能连续出现，如 ±-+1 是不合法的

**输入描述**  
字符串  
**输出描述**  
表达式值  
**示例一**  
输入  
1-2abcd  
输出

-1

## 输入描述

字符串

## 输出描述

表达式值

## 用例

输入

    
    
    1-2abcd
    

输出

    
    
    -1
    

## 提示,必看！！！

本题存在各种歧义，不同的考友给了很多反馈。

  1. 首先本题是100分值的题目，如果按照大多数人的想法，提取出最长的表达式，例如：`1+2*33+44+55+abc`,应该提取出`1+2*33+44+55`,那么这题的分值应该是200分。但是根据题意啊，**提取字符串中的最长合法简单数学表达式 **以及结合考友的反馈这题应该是只含有两个操作数以及操作符的表达式，也就是形如a + b，a - b，a * b的表达式，但是a前面有没有正负号不清楚。**对应解法2**
  2. 但是作者查看了很多宣称有100%通过率的题解，发现他们的解法与笔者最开始的解法一致，也就是找最长的，而且默认题意中的说明4：操作符不能连续出现，如 ±-+1 是不合法的，也就是官方用例不会出现`1+-1`类似这样的用例。**对应解法1**

根据上面两种情况，笔者提供了两种解法，大家机考的时候都可以试试，哪种通过率高就用那种！！！

## 解法1

  1. 首先，我们需要从输入的字符串中提取出所有的合法数学表达式。在这里，一个合法的数学表达式是指由数字和操作符（+、-、*）组成的字符串，且操作符不能连续出现。我们通过遍历输入字符串的每个字符，并使用一个变量`start`来记录当前表达式的开始索引，来实现这一步。当我们遇到一个数字字符时，如果`start`为-1（表示我们还没有开始记录一个新的表达式），我们就将`start`设置为当前索引；当我们遇到一个操作符字符时，如果前一个字符不是操作符，我们就将当前索引加1；否则，我们就提取从`start`到当前索引的子字符串作为一个表达式，并将`start`重置为-1。如果我们遇到一个既不是数字也不是操作符的字符，并且`start`不为-1，我们也会提取从`start`到当前索引的子字符串作为一个表达式，并将`start`重置为-1。最后，如果`start`不为-1，我们会提取从`start`到字符串末尾的子字符串作为一个表达式。

  2. 然后，我们需要对提取出的所有表达式按长度进行排序，并选择长度最长的表达式。我们使用Python的`sorted`函数来实现这一步，其中`key=len`表示按长度排序，`reverse=True`表示按降序排序。

  3. 接下来，我们需要计算选出的表达式的结果。我们首先使用正则表达式来分割表达式，得到一个由数字和操作符组成的列表。然后，我们遍历这个列表，先进行所有的乘法操作，然后进行所有的加法和减法操作。在这个过程中，我们使用一个变量`result`来记录当前的计算结果。

  4. 最后，我们打印出计算结果。如果没有提取出任何表达式，我们就打印0。

## C++解法1

    
    
    #include <iostream>
    #include <string>
    #include <vector>
    #include <algorithm>
    #include <cctype>
    using namespace std;
    // 提取合法表达式的函数
    vector<string> extractExpressions(const string &line) {
        vector<string> expressions;
        int start = -1;
    
        for (size_t i = 0; i < line.length(); ++i) {
            char cur = line[i];
    
            // 如果当前字符是数字
            if (isdigit(cur)) {
                // 如果开始索引为-1，设置开始索引为当前索引
                if (start == -1) {
                    start = i;
                }
            } else if (start != -1 && (cur == '+' || cur == '-' || cur == '*')) {
                // 如果当前字符是操作符，并且前一个字符不是操作符
                // 则将当前索引加1
                if (i == 0 || !(line[i - 1] == '+' || line[i - 1] == '-' || line[i - 1] == '*')) {
                    ++i;
                } else {
                    // 否则，提取从开始索引到当前索引的子字符串作为一个表达式
                    // 并将开始索引重置为-1
                    expressions.push_back(line.substr(start, i - start));
                    start = -1;
                }
            } else {
                // 如果当前字符既不是数字也不是操作符
                // 并且开始索引不为-1，则提取从开始索引到当前索引的子字符串作为一个表达式
                // 并将开始索引重置为-1
                if (start != -1) {
                    expressions.push_back(line.substr(start, i - start));
                    start = -1;
                }
            }
        }
    
        // 如果开始索引不为-1，则提取从开始索引到字符串末尾的子字符串作为一个表达式
        if (start != -1) {
            expressions.push_back(line.substr(start));
        }
    
        // 返回提取的表达式列表
        return expressions;
    }
    
    // 计算表达式结果的函数
    int calc(const string &str) {
        vector<string> tokens;
        string number;
    
        for (char ch : str) {
            // 如果当前字符是数字，则将其添加到当前数字的末尾
            if (isdigit(ch)) {
                number += ch;
            } else {
                // 否则，将当前数字和当前操作符添加到元素列表中
                // 并开始构建新的数字
                tokens.push_back(number);
                tokens.push_back(string(1, ch));
                number.clear();
            }
        }
        // 将最后一个数字添加到元素列表中
        tokens.push_back(number);
    
        // 遍历元素列表，先进行所有的乘法操作
        for (size_t i = 0; i < tokens.size(); ++i) {
            if (tokens[i] == "*") {
                int result = stoi(tokens[i - 1]) * stoi(tokens[i + 1]);
                tokens[i - 1] = to_string(result);
                tokens.erase(tokens.begin() + i, tokens.begin() + i + 2);
                --i;
            }
        }
    
        // 初始化结果为元素列表的第一个数字
        int result = stoi(tokens[0]);
        // 遍历元素列表，进行所有的加法和减法操作
        for (size_t i = 1; i < tokens.size(); i += 2) {
            if (tokens[i] == "+") {
                result += stoi(tokens[i + 1]);
            } else {
                result -= stoi(tokens[i + 1]);
            }
        }
    
        // 返回计算结果
        return result;
    }
    
    int main() {
        // 创建一个字符串来处理输入
        string line;
        // 读取一行输入
        getline(cin, line);
    
        // 调用extractExpressions函数提取输入中的合法表达式
        vector<string> expressions = extractExpressions(line);
    
        // 使用C++的sort函数对表达式按长度进行排序
        sort(expressions.begin(), expressions.end(), [](const string &s1, const string &s2) {
            return s2.length() < s1.length();
        });
    
        // 如果表达式列表不为空，则计算并打印最长表达式的结果
        // 否则，打印0
        if (!expressions.empty()) {
            cout << calc(expressions[0]) << endl;
        } else {
            cout << 0 << endl;
        }
    
        return 0;
    }
    

## Java解法1

    
    
    import java.util.ArrayList;
    import java.util.List;
    import java.util.Scanner;
    
    class Main {
        public static void main(String[] args) {
            // 创建一个Scanner对象来处理输入
            Scanner in = new Scanner(System.in);
            // 读取一行输入
            String line = in.nextLine();
            // 关闭Scanner对象
            in.close();
    
            // 调用extractExpressions方法提取输入中的合法表达式
            List<String> expressions = extractExpressions(line);
    
            // 使用Java 8的Lambda表达式对表达式按长度进行排序
            expressions.sort((s1, s2) -> Integer.compare(s2.length(), s1.length()));
    
            // 如果表达式列表不为空，则计算并打印最长表达式的结果
            // 否则，打印0
            if (!expressions.isEmpty()) {
                System.out.println(calc(expressions.get(0)));
            } else {
                System.out.println(0);
            }
        }
    
        // 提取合法表达式的方法
        public static List<String> extractExpressions(String line) {
            // 创建一个列表来存储提取的表达式
            List<String> expressions = new ArrayList<>();
            // 初始化开始索引为-1
            int start = -1;
    
            // 遍历输入字符串的每个字符
            for (int i = 0; i < line.length(); i++) {
                char cur = line.charAt(i);
    
                // 如果当前字符是数字
                if (Character.isDigit(cur)) {
                    // 如果开始索引为-1，设置开始索引为当前索引
                    if (start == -1) {
                        start = i;
                    }
                } else if (start != -1 && "+-*".contains(String.valueOf(cur))) {
                    // 如果当前字符是操作符，并且前一个字符不是操作符
                    // 则将当前索引加1
                    if (!"+-*".contains(String.valueOf(line.charAt(i - 1)))) {
                        i++;
                    } else {
                        // 否则，提取从开始索引到当前索引的子字符串作为一个表达式
                        // 并将开始索引重置为-1
                        expressions.add(line.substring(start, i));
                        start = -1;
                    }
                } else {
                    // 如果当前字符既不是数字也不是操作符
                    // 并且开始索引不为-1，则提取从开始索引到当前索引的子字符串作为一个表达式
                    // 并将开始索引重置为-1
                    if (start != -1) {
                        expressions.add(line.substring(start, i));
                        start = -1;
                    }
                }
            }
    
            // 如果开始索引不为-1，则提取从开始索引到字符串末尾的子字符串作为一个表达式
            if (start != -1) {
                expressions.add(line.substring(start));
            }
    
            // 返回提取的表达式列表
            return expressions;
        }
    
        // 计算表达式结果的方法
        public static int calc(String str) {
            // 创建一个列表来存储表达式的每个元素（数字或操作符）
            List<String> tokens = new ArrayList<>();
            // 创建一个StringBuilder对象来构建数字
            StringBuilder sb = new StringBuilder();
    
            // 遍历表达式的每个字符
            for (char ch : str.toCharArray()) {
                // 如果当前字符是数字，则将其添加到当前数字的末尾
                if (Character.isDigit(ch)) {
                    sb.append(ch);
                } else {
                    // 否则，将当前数字和当前操作符添加到元素列表中
                    // 并开始构建新的数字
                    tokens.add(sb.toString());
                    tokens.add(String.valueOf(ch));
                    sb.setLength(0);
                }
            }
            // 将最后一个数字添加到元素列表中
            tokens.add(sb.toString());
    
            // 遍历元素列表，先进行所有的乘法操作
            for (int i = 0; i < tokens.size(); i++) {
                if ("*".equals(tokens.get(i))) {
                    int result = Integer.parseInt(tokens.get(i - 1)) * Integer.parseInt(tokens.get(i + 1));
                    tokens.set(i - 1, String.valueOf(result));
                    tokens.remove(i);
                    tokens.remove(i);
                    i--;
                }
            }
    
            // 初始化结果为元素列表的第一个数字
            int result = Integer.parseInt(tokens.get(0));
            // 遍历元素列表，进行所有的加法和减法操作
            for (int i = 1; i < tokens.size(); i += 2) {
                if ("+".equals(tokens.get(i))) {
                    result += Integer.parseInt(tokens.get(i + 1));
                } else {
                    result -= Integer.parseInt(tokens.get(i + 1));
                }
            }
    
            // 返回计算结果
            return result;
        }
    }
    

## javaScript解法1

    
    
    const readline = require('readline');
    
    // 创建一个readline.Interface实例来处理输入
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    rl.on('line', (line) => {
        // 调用extractExpressions函数提取输入中的合法表达式
        let expressions = extractExpressions(line);
    
        // 使用JavaScript的sort函数对表达式按长度进行排序
        expressions.sort((s1, s2) => s2.length - s1.length);
    
        // 如果表达式列表不为空，则计算并打印最长表达式的结果
        // 否则，打印0
        if (expressions.length > 0) {
            console.log(calc(expressions[0]));
        } else {
            console.log(0);
        }
    
        rl.close();
    });
    
    // 提取合法表达式的函数
    function extractExpressions(line) {
        let expressions = [];
        let start = -1;
    
        for (let i = 0; i < line.length; i++) {
            let cur = line.charAt(i);
    
            // 如果当前字符是数字
            if (!isNaN(cur)) {
                // 如果开始索引为-1，设置开始索引为当前索引
                if (start === -1) {
                    start = i;
                }
            } else if (start !== -1 && "+-*".includes(cur)) {
                // 如果当前字符是操作符，并且前一个字符不是操作符
                // 则将当前索引加1
                if (!"+-*".includes(line.charAt(i - 1))) {
                    i++;
                } else {
                    // 否则，提取从开始索引到当前索引的子字符串作为一个表达式
                    // 并将开始索引重置为-1
                    expressions.push(line.substring(start, i));
                    start = -1;
                }
            } else {
                // 如果当前字符既不是数字也不是操作符
                // 并且开始索引不为-1，则提取从开始索引到当前索引的子字符串作为一个表达式
                // 并将开始索引重置为-1
                if (start !== -1) {
                    expressions.push(line.substring(start, i));
                    start = -1;
                }
            }
        }
    
        // 如果开始索引不为-1，则提取从开始索引到字符串末尾的子字符串作为一个表达式
        if (start !== -1) {
            expressions.push(line.substring(start));
        }
    
        // 返回提取的表达式列表
        return expressions;
    }
    
    // 计算表达式结果的函数
    function calc(str) {
        let tokens = [];
        let number = '';
    
        for (let ch of str) {
            // 如果当前字符是数字，则将其添加到当前数字的末尾
            if (!isNaN(ch)) {
                number += ch;
            } else {
                // 否则，将当前数字和当前操作符添加到元素列表中
                // 并开始构建新的数字
                tokens.push(number);
                tokens.push(ch);
                number = '';
            }
        }
        // 将最后一个数字添加到元素列表中
        tokens.push(number);
    
        // 遍历元素列表，先进行所有的乘法操作
        for (let i = 0; i < tokens.length; i++) {
            if (tokens[i] === "*") {
                let result = parseInt(tokens[i - 1]) * parseInt(tokens[i + 1]);
                tokens[i - 1] = String(result);
                tokens.splice(i, 2);
                i--;
            }
        }
    
        // 初始化结果为元素列表的第一个数字
        let result = parseInt(tokens[0]);
        // 遍历元素列表，进行所有的加法和减法操作
        for (let i = 1; i < tokens.length; i += 2) {
            if (tokens[i] === "+") {
                result += parseInt(tokens[i + 1]);
            } else {
                result -= parseInt(tokens[i + 1]);
            }
        }
    
        // 返回计算结果
        return result;
    }
    

## Python解法1

    
    
    # 导入需要的模块
    import re
    
    # 提取合法表达式的函数
    def extract_expressions(line):
        # 创建一个列表来存储提取的表达式
        expressions = []
        # 初始化开始索引为-1
        start = -1
    
        # 遍历输入字符串的每个字符
        for i in range(len(line)):
            cur = line[i]
    
            # 如果当前字符是数字
            if cur.isdigit():
                # 如果开始索引为-1，设置开始索引为当前索引
                if start == -1:
                    start = i
            elif start != -1 and cur in "+-*":
                # 如果当前字符是操作符，并且前一个字符不是操作符
                # 则将当前索引加1
                if line[i - 1] not in "+-*":
                    i += 1
                else:
                    # 否则，提取从开始索引到当前索引的子字符串作为一个表达式
                    # 并将开始索引重置为-1
                    expressions.append(line[start:i])
                    start = -1
            else:
                # 如果当前字符既不是数字也不是操作符
                # 并且开始索引不为-1，则提取从开始索引到当前索引的子字符串作为一个表达式
                # 并将开始索引重置为-1
                if start != -1:
                    expressions.append(line[start:i])
                    start = -1
    
        # 如果开始索引不为-1，则提取从开始索引到字符串末尾的子字符串作为一个表达式
        if start != -1:
            expressions.append(line[start:])
    
        # 返回提取的表达式列表
        return expressions
    
    # 计算表达式结果的函数
    def calc(expression):
        # 使用正则表达式分割字符串，得到数字和操作符
        tokens = re.split('([-+*])', expression)
        tokens = [token for token in tokens if token]
    
        # 遍历元素列表，先进行所有的乘法操作
        while '*' in tokens:
            index = tokens.index('*')
            result = int(tokens[index - 1]) * int(tokens[index + 1])
            tokens = tokens[:index - 1] + [str(result)] + tokens[index + 2:]
    
        # 初始化结果为元素列表的第一个数字
        result = int(tokens[0])
        # 遍历元素列表，进行所有的加法和减法操作
        for i in range(1, len(tokens), 2):
            if tokens[i] == '+':
                result += int(tokens[i + 1])
            else:
                result -= int(tokens[i + 1])
    
        # 返回计算结果
        return result
    
    # 读取一行输入
    line = input()
    
    # 调用extract_expressions函数提取输入中的合法表达式
    expressions = extract_expressions(line)
    
    # 使用Python的sorted函数对表达式按长度进行排序
    expressions = sorted(expressions, key=len, reverse=True)
    
    # 如果表达式列表不为空，则计算并打印最长表达式的结果
    # 否则，打印0
    if expressions:
        print(calc(expressions[0]))
    else:
        print(0)
    

## C语言解法1

    
    
    #include <stdio.h>
    #include <stdlib.h>
    #include <string.h>
    #include <ctype.h>
    
    // 定义最大表达式数量和最大表达式长度
    #define MAX_EXPRESSIONS 100
    #define MAX_EXPRESSION_LENGTH 100
    
    // 提取合法表达式的函数
    int extractExpressions(const char *line, char expressions[MAX_EXPRESSIONS][MAX_EXPRESSION_LENGTH]) {
        int expressionsCount = 0;
        int start = -1;
        int length = strlen(line);
    
        for (int i = 0; i < length; ++i) {
            char cur = line[i];
    
            // 如果当前字符是数字
            if (isdigit(cur)) {
                if (start == -1) {
                    start = i;
                }
            } else if (start != -1 && (cur == '+' || cur == '-' || cur == '*')) {
                if (i == 0 || !(line[i - 1] == '+' || line[i - 1] == '-' || line[i - 1] == '*')) {
                    ++i;
                } else {
                    strncpy(expressions[expressionsCount++], line + start, i - start);
                    start = -1;
                }
            } else {
                if (start != -1) {
                    strncpy(expressions[expressionsCount++], line + start, i - start);
                    start = -1;
                }
            }
        }
    
        if (start != -1) {
            strcpy(expressions[expressionsCount++], line + start);
        }
    
        return expressionsCount;
    }
    
    // 计算表达式结果的函数
    int calc(const char *str) {
        char tokens[MAX_EXPRESSIONS][MAX_EXPRESSION_LENGTH];
        int tokensCount = 0;
        char number[MAX_EXPRESSION_LENGTH] = {0};
        int length = strlen(str);
    
        for (int i = 0; i < length; ++i) {
            if (isdigit(str[i])) {
                strncat(number, &str[i], 1);
            } else {
                strcpy(tokens[tokensCount++], number);
                char operator[2] = {str[i], '\0'};
                strcpy(tokens[tokensCount++], operator);
                memset(number, 0, sizeof(number));
            }
        }
        strcpy(tokens[tokensCount++], number);
    
        for (int i = 0; i < tokensCount; ++i) {
            if (strcmp(tokens[i], "*") == 0) {
                int result = atoi(tokens[i - 1]) * atoi(tokens[i + 1]);
                sprintf(tokens[i - 1], "%d", result);
                for (int j = i; j < tokensCount - 2; ++j) {
                    strcpy(tokens[j], tokens[j + 2]);
                }
                tokensCount -= 2;
                --i;
            }
        }
    
        int result = atoi(tokens[0]);
        for (int i = 1; i < tokensCount; i += 2) {
            if (strcmp(tokens[i], "+") == 0) {
                result += atoi(tokens[i + 1]);
            } else {
                result -= atoi(tokens[i + 1]);
            }
        }
    
        return result;
    }
    
    int main() {
        char line[1000];
        fgets(line, sizeof(line), stdin);
        line[strcspn(line, "\n")] = 0; // Remove newline character
    
        char expressions[MAX_EXPRESSIONS][MAX_EXPRESSION_LENGTH];
        int expressionsCount = extractExpressions(line, expressions);
    
        // 对表达式按长度进行排序
        for (int i = 0; i < expressionsCount - 1; ++i) {
            for (int j = i + 1; j < expressionsCount; ++j) {
                if (strlen(expressions[j]) > strlen(expressions[i])) {
                    char temp[MAX_EXPRESSION_LENGTH];
                    strcpy(temp, expressions[i]);
                    strcpy(expressions[i], expressions[j]);
                    strcpy(expressions[j], temp);
                }
            }
        }
    
        if (expressionsCount > 0) {
            printf("%d\n",  calc(expressions[0]));
        } else {
            printf("0\n");
        }
    
        return 0;
    }
    

## 以下是另一个角度的解法2

## C++解法2

    
    
    #include <iostream>
    #include <string>
    
    // 检查表达式是否有效
    bool isExpressionValid(const std::string& expression) {
        // 获取表达式的第一个字符
        char firstChar = expression[0];
        // 检查第一个字符是否为运算符或数字，如果不是，则返回false
        if (!(firstChar == '+' || firstChar == '-' || std::isdigit(firstChar))) {
            return false;
        }
    
        // 用于记录运算符的位置
        int operatorIndex = -1;
        for (int i = 1; i < expression.length(); i++) {
            char currentChar = expression[i];
    
            // 判断当前字符是否为运算符
            bool isOperator = currentChar == '+' || currentChar == '-' || currentChar == '*';
            // 判断当前字符是否为数字
            bool isDigit = std::isdigit(currentChar);
            // 如果当前字符既不是运算符也不是数字，则表达式无效
            if (!isOperator && !isDigit) {
                return false;
            }
    
            // 如果找到运算符，并且之前已经记录过运算符的位置，则表达式无效（不允许有多个运算符）
            if (isOperator) {
                if (operatorIndex != -1) {
                    return false;
                } else {
                    operatorIndex = i;
                }
            }
        }
    
        // 防止表达式以双加号或双减号开头，以及表达式以运算符结尾
        if ((firstChar == '+' || firstChar == '-') && operatorIndex == 1) return false;
        if (operatorIndex == expression.length() - 1) return false;
    
        // 确保表达式中至少包含一个运算符
        return operatorIndex != -1;
    }
    
    // 计算有效表达式的结果
    long calculateExpressionResult(const std::string& validExpression) {
        // 找到运算符的位置
        size_t operatorIndex = validExpression.find_first_of("+-*", 1); // 从索引1开始查找
    
        // 获取运算符左边的数和右边的数
        long leftNumber = std::stol(validExpression.substr(0, operatorIndex));
        long rightNumber = std::stol(validExpression.substr(operatorIndex + 1));
    
        // 根据运算符执行相应的计算
        switch (validExpression[operatorIndex]) {
            case '+': return leftNumber + rightNumber;
            case '-': return leftNumber - rightNumber;
            case '*': return leftNumber * rightNumber;
            default: throw std::invalid_argument("0");
        }
    }
    
    int main() {
        std::string input;
        std::getline(std::cin, input);
    
        long maximumResult = 0;
        int maxLength = 0;
    
        // 遍历输入字符串的所有子串
        for (size_t start = 0; start < input.length(); start++) {
            for (size_t end = start; end < input.length(); end++) {
                std::string subExpression = input.substr(start, end - start + 1);
    
                // 如果子串是有效的表达式，并且长度大于当前记录的最长长度，则计算结果
                if (isExpressionValid(subExpression) && subExpression.length() > maxLength) {
                    maxLength = subExpression.length();
                    maximumResult = calculateExpressionResult(subExpression);
                }
            }
        }
    
        // 打印最大计算结果
        std::cout << maximumResult << std::endl;
        return 0;
    }
    

## Java解法2

    
    
    import java.util.Scanner;
    
    public class Main {
    
        // 检查表达式是否有效
        private static boolean isExpressionValid(String expression) {
            // 获取表达式的第一个字符
            char firstChar = expression.charAt(0);
            // 检查第一个字符是否为运算符或数字，如果不是，则返回false
            if (!(firstChar == '+' || firstChar == '-' ||Character.isDigit(firstChar))) {
                return false;
            }
    
            // 用于记录运算符的位置
            int operatorIndex = -1;
            for (int i = 1; i < expression.length(); i++) {
                char currentChar = expression.charAt(i);
    
                // 判断当前字符是否为运算符
                boolean isOperator = currentChar == '+' || currentChar == '-' || currentChar == '*';
                // 判断当前字符是否为数字
                boolean isDigit = Character.isDigit(currentChar);
                // 如果当前字符既不是运算符也不是数字，则表达式无效
                if (!isOperator && !isDigit) {
                    return false;
                }
    
                // 如果找到运算符，并且之前已经记录过运算符的位置，则表达式无效（不允许有多个运算符）
                if (isOperator) {
                    if (operatorIndex != -1) {
                        return false;
                    } else {
                        operatorIndex = i;
                    }
                }
            }
    
            // 防止表达式以双加号或双减号开头，以及表达式以运算符结尾
            if ((firstChar == '+' || firstChar == '-') && operatorIndex == 1) return false;
            if (operatorIndex == expression.length() - 1) return false;
    
            // 确保表达式中至少包含一个运算符
            return operatorIndex != -1;
        }
    
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            String input = scanner.nextLine();
    
            // 存储最大的计算结果
            long maximumResult = 0;
            // 存储最长的有效表达式长度
            int maxLength = 0;
    
            // 遍历输入字符串的所有子串
            for (int start = 0; start < input.length(); start++) {
                for (int end = start; end < input.length(); end++) {
                    // 获取子串
                    String subExpression = input.substring(start, end + 1);
    
                    // 如果子串是有效的表达式，并且长度大于当前记录的最长长度，则计算结果
                    if (isExpressionValid(subExpression) && subExpression.length() > maxLength) {
                        maxLength = subExpression.length();
                        maximumResult = calculateExpressionResult(subExpression);
                    }
                }
            }
    
            // 打印最大计算结果
            System.out.println(maximumResult);
            scanner.close();
        }
    
        // 计算有效表达式的结果
        private static long calculateExpressionResult(String validExpression) {
            // 找到运算符的位置
            int operatorIndex = findOperatorIndex(validExpression);
    
            // 获取运算符左边的数
            String leftOperand = validExpression.substring(0, operatorIndex);
            // 获取运算符
            char operator = validExpression.charAt(operatorIndex);
            // 获取运算符右边的数
            String rightOperand = validExpression.substring(operatorIndex + 1);
    
            // 将字符串转换为数字
            long leftNumber = Long.parseLong(leftOperand);
            long rightNumber = Long.parseLong(rightOperand);
    
            // 根据运算符执行相应的计算
            switch (operator) {
                case '+': return leftNumber + rightNumber;
                case '-': return leftNumber - rightNumber;
                case '*': return leftNumber * rightNumber;
                // 如果运算符不是预期的，抛出异常
                default: throw new IllegalArgumentException("0");
            }
        }
    
        // 寻找运算符的位置
        private static int findOperatorIndex(String expression) {
            for (int i = 1; i < expression.length(); i++) {
                if (expression.charAt(i) == '+' || expression.charAt(i) == '-' || expression.charAt(i) == '*') {
                    return i;
                }
            }
            // 如果表达式有效，这里不应该到达
            return -1;
        }
    }
    

## javaScript解法2

    
    
    const readline = require('readline');
    
    // 创建readline接口实例
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    // 检查表达式是否有效
    function isExpressionValid(expression) {
      // 获取表达式的第一个字符
      const firstChar = expression.charAt(0);
      // 检查第一个字符是否为运算符或数字，如果不是，则返回false
      if (!(firstChar === '+' || firstChar === '-' || !isNaN(firstChar))) {
        return false;
      }
    
      // 用于记录运算符的位置
      let operatorIndex = -1;
      for (let i = 1; i < expression.length; i++) {
        const currentChar = expression[i];
    
        // 判断当前字符是否为运算符
        const isOperator = currentChar === '+' || currentChar === '-' || currentChar === '*';
        // 判断当前字符是否为数字
        const isDigit = !isNaN(currentChar);
        // 如果当前字符既不是运算符也不是数字，则表达式无效
        if (!isOperator && !isDigit) {
          return false;
        }
    
        // 如果找到运算符，并且之前已经记录过运算符的位置，则表达式无效（不允许有多个运算符）
        if (isOperator) {
          if (operatorIndex !== -1) {
            return false;
          } else {
            operatorIndex = i;
          }
        }
      }
    
      // 防止表达式以双加号或双减号开头，以及表达式以运算符结尾
      if ((firstChar === '+' || firstChar === '-') && operatorIndex === 1) return false;
      if (operatorIndex === expression.length - 1) return false;
    
      // 确保表达式中至少包含一个运算符
      return operatorIndex !== -1;
    }
    
    // 计算有效表达式的结果
    function calculateExpressionResult(validExpression) {
      // 找到运算符的位置
      const operatorIndex = findOperatorIndex(validExpression);
    
      // 获取运算符左边的数和右边的数
      const leftNumber = parseInt(validExpression.substring(0, operatorIndex));
      const rightNumber = parseInt(validExpression.substring(operatorIndex + 1));
    
      // 获取运算符
      const operator = validExpression[operatorIndex];
    
      // 根据运算符执行相应的计算
      switch (operator) {
        case '+': return leftNumber + rightNumber;
        case '-': return leftNumber - rightNumber;
        case '*': return leftNumber * rightNumber;
        default: throw new Error("0");
      }
    }
    
    // 寻找运算符的位置
    function findOperatorIndex(expression) {
      for (let i = 1; i < expression.length; i++) {
        if (['+', '-', '*'].includes(expression[i])) {
          return i;
        }
      }
      // 如果表达式有效，这里不应该到达
      return -1;
    }
    
    rl.on('line', (input) => {
      let maximumResult = 0;
      let maxLength = 0;
    
      // 遍历输入字符串的所有子串
      for (let start = 0; start < input.length; start++) {
        for (let end = start; end < input.length; end++) {
          // 获取子串
          const subExpression = input.substring(start, end + 1);
    
          // 如果子串是有效的表达式，并且长度大于当前记录的最长长度，则计算结果
          if (isExpressionValid(subExpression) && subExpression.length > maxLength) {
            maxLength = subExpression.length;
            maximumResult = calculateExpressionResult(subExpression);
          }
        }
      }
    
      // 打印最大计算结果
      console.log(maximumResult);
      rl.close();
    });
    

## Python解法2

    
    
    def is_expression_valid(expression):
        """
        检查表达式是否有效
        :param expression: 表达式字符串
        :return: 布尔值，表达式是否有效
        """
        # 获取表达式的第一个字符
        first_char = expression[0]
        # 检查第一个字符是否为运算符或数字，如果不是，则返回False
        if first_char not in ['+', '-'] and not first_char.isdigit():
            return False
    
        # 用于记录运算符的位置
        operator_index = -1
        for i in range(1, len(expression)):
            current_char = expression[i]
    
            # 判断当前字符是否为运算符
            is_operator = current_char in ['+', '-', '*']
            # 判断当前字符是否为数字
            is_digit = current_char.isdigit()
            # 如果当前字符既不是运算符也不是数字，则表达式无效
            if not is_operator and not is_digit:
                return False
    
            # 如果找到运算符，并且之前已经记录过运算符的位置，则表达式无效（不允许有多个运算符）
            if is_operator:
                if operator_index != -1:
                    return False
                else:
                    operator_index = i
    
        # 防止表达式以双加号或双减号开头，以及表达式以运算符结尾
        if first_char in ['+', '-'] and operator_index == 1:
            return False
        if operator_index == len(expression) - 1:
            return False
    
        # 确保表达式中至少包含一个运算符
        return operator_index != -1
    
    def calculate_expression_result(valid_expression):
        """
        计算有效表达式的结果
        :param valid_expression: 有效的表达式字符串
        :return: 计算结果
        """
        # 找到运算符的位置
        operator_index = find_operator_index(valid_expression)
    
        # 获取运算符左边的数和右边的数
        left_operand = valid_expression[:operator_index]
        right_operand = valid_expression[operator_index + 1:]
    
        # 将字符串转换为数字
        left_number = int(left_operand)
        right_number = int(right_operand)
    
        # 获取运算符
        operator = valid_expression[operator_index]
    
        # 根据运算符执行相应的计算
        if operator == '+':
            return left_number + right_number
        elif operator == '-':
            return left_number - right_number
        elif operator == '*':
            return left_number * right_number
        else:
            raise ValueError("Unexpected operator: " + operator)
    
    def find_operator_index(expression):
        """
        寻找运算符的位置
        :param expression: 表达式字符串
        :return: 运算符的位置索引
        """
        for i in range(1, len(expression)):
            if expression[i] in ['+', '-', '*']:
                return i
        # 如果表达式有效，这里不应该到达
        return -1
    
    if __name__ == '__main__':
        # 读取输入
        input_expression = input()
    
        maximum_result = 0
        max_length = 0
    
        # 遍历输入字符串的所有子串
        for start in range(len(input_expression)):
            for end in range(start, len(input_expression)):
                # 获取子串
                sub_expression = input_expression[start:end+1]
    
                # 如果子串是有效的表达式，并且长度大于当前记录的最长长度，则计算结果
                if is_expression_valid(sub_expression) and len(sub_expression) > max_length:
                    max_length = len(sub_expression)
                    maximum_result = calculate_expression_result(sub_expression)
    
        # 打印最大计算结果
        print(maximum_result)
    

## C语言解法2

    
    
    #include <stdio.h>
    #include <stdlib.h>
    #include <ctype.h>
    #include <string.h>
    
    // 检查给定的字符串表达式是否为有效的算术表达式
    int isExpressionValid(const char* expression) {
        // 检查表达式的第一个字符是否为正负号或数字
        char firstChar = expression[0];
        if (!(firstChar == '+' || firstChar == '-' || isdigit(firstChar))) {
            return 0; // 如果不是，则表达式无效
        }
    
        // 记录找到的运算符位置，初始值为-1，表示未找到
        int operatorIndex = -1;
        for (int i = 1; expression[i] != '\0'; i++) {
            char currentChar = expression[i];
            // 检查当前字符是否为运算符
            int isOperator = currentChar == '+' || currentChar == '-' || currentChar == '*';
            // 检查当前字符是否为数字
            int isDigit = isdigit(currentChar);
            // 如果当前字符既不是运算符也不是数字，则表达式无效
            if (!isOperator && !isDigit) {
                return 0;
            }
            // 如果当前字符是运算符，并且之前已经找到过运算符，则表达式无效
            if (isOperator) {
                if (operatorIndex != -1) return 0;
                operatorIndex = i;
            }
        }
    
        // 防止表达式以运算符开头但紧接着又是一个运算符，或以运算符结尾
        if ((firstChar == '+' || firstChar == '-') && operatorIndex == 1) return 0;
        if (operatorIndex == strlen(expression) - 1) return 0;
        // 如果至少找到一个运算符，则表达式有效
        return operatorIndex != -1;
    }
    
    // 计算有效表达式的结果
    long calculateExpressionResult(const char* validExpression) {
        // 查找运算符位置
        char* operatorPos = strpbrk(validExpression + 1, "+-*");
    
        // 分离出运算符左边的数字
        char leftStr[256] = {0};
        strncpy(leftStr, validExpression, operatorPos - validExpression);
        long leftNum = strtol(leftStr, NULL, 10); // 将字符串转换为长整型数字
    
        // 运算符右边的数字
        long rightNum = strtol(operatorPos + 1, NULL, 10);
    
        // 根据运算符类型计算结果
        switch (*operatorPos) {
            case '+': return leftNum + rightNum;
            case '-': return leftNum - rightNum;
            case '*': return leftNum * rightNum;
            default: exit(1); // 如果运算符不是预期的，程序异常终止
        }
    }
    
    int main() {
        char input[1024];
        fgets(input, 1024, stdin); // 读取一行输入到input数组中
    
        long maximumResult = 0; // 存储最大结果
        int maxLength = 0; // 存储最长有效表达式的长度
    
        // 遍历所有可能的子串
        for (size_t start = 0; start < strlen(input); ++start) {
            for (size_t end = start + 1; end <= strlen(input); ++end) {
                char subExpr[1024] = {0};
                // 从输入中提取子表达式
                strncpy(subExpr, input + start, end - start);
                // 检查子表达式是否有效，并计算结果
                if (isExpressionValid(subExpr) && (int)(end - start) > maxLength) {
                    long result = calculateExpressionResult(subExpr);
                    // 更新最大结果和最长有效表达式长度
                    if (maxLength == 0 || (int)(end - start) >= maxLength) {
                        maxLength = end - start;
                        maximumResult = result;
                    }
                }
            }
        }
    
        printf("%ld\n", maximumResult); // 打印最大结果
        return 0;
    }
    

## 完整用例

### 用例1

    
    
    123+456*789
    

### 用例2

    
    
    5*6-3+2abcd
    

### 用例3

    
    
    abc-5*6+3*2
    

### 用例4

    
    
    1+2*3-4/0abc
    

### 用例6

    
    
    1-2*3+4*5-6*7+8*9
    

### 用例7

    
    
    1-2*3+4*5-6*7+8*9abcd
    

### 用例8

    
    
    1+1+1+1+1
    

### 用例9

    
    
    abcdefghijklmnopqrstuvwxyz
    

### 用例10

    
    
    0-1+2-3+4-5+6-7+8-9
    

#### 文章目录

  * 题目描述：最长合法表达式（本题分值200）
  * 输入描述
  * 输出描述
  * 用例
  * 提示,必看！！！
  * 解法1
  * C++解法1
  * Java解法1
  * javaScript解法1
  * Python解法1
  * C语言解法1
  * 以下是另一个角度的解法2
  * C++解法2
  * Java解法2
  * javaScript解法2
  * Python解法2
  * C语言解法2
  * 完整用例
  *     * 用例1
    * 用例2
    * 用例3
    * 用例4
    * 用例6
    * 用例7
    * 用例8
    * 用例9
    * 用例10

![fengmian](https://i-blog.csdnimg.cn/blog_migrate/169f277a87c29b8ff13d65ef9e7eeec7.png)

