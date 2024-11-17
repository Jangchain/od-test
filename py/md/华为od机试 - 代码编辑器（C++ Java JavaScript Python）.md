## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

某公司为了更高效的编写代码，邀请你开发一款代码编辑器程序。

程序的输入为 已有的代码文本和指令序列，程序需输出编辑后的最终文本。指针初始位置位于文本的开头。  
支持的指令(X为大于等于0的整数, word 为无空格的字符串)：

  * FORWARD X 指针向前(右)移动X,如果指针移动位置超过了文本末尾，则将指针移动到文本末尾
  * BACKWARD X 指针向后(左)移动X,如果指针移动位置超过了文本开头，则将指针移动到文本开头
  * SEARCH-FORWARD word 从指针当前位置向前查找 word 并将指针移动到word的起始位置，如果未找到则保持不变
  * SEARCH-BACKWARD word 在文本中向后查我 word 并将指针移动到word的起始位置，如果未找到则保持不变
  * INSERT word 在指针当前位置前插入word，并将指针移动到word的结尾
  * REPLACE word 在指针当前位置替换并插入字符(删除原有字符，并增加新的字符)
  * DELETE X 在指针位置删除X个字符

## 输入描述

输入的第一行为命令列表的长度K

输入的第二行为文件中的原始文本

接下来的K行，每行为一个指令

文本最长长度不超过 256K

## 输出描述

编辑后的最终结果

##### 备注

告警ID之间以单个空格分隔

## 示例1

输入

    
    
    1
    ello
    INSERT h
    

输出

    
    
    hello
    

说明

> 在文本开头插入

## 示例2

输入

    
    
    2
    hllo
    FORWARD 1
    INSERT e
    

输出

    
    
    hello
    

说明

> 在文本的第一个位置插入

## 示例3

输入

    
    
    2
    hell
    FORWARD 1000
    INSERT o
    

输出

    
    
    hello
    

说明

> 在文本的结尾插入

## 示例4

输入

    
    
    1
    hello
    REPLACE HELLO
    

输出

    
    
    HELLO
    

说明

> 替换

## 示例5

输入

    
    
    1
    hello
    REPLACE HELLO_WORLD
    

输出

    
    
    HELLO_WORLD
    

说明

> 超过文本长度替换

## 示例6

输入

    
    
    2
    hell
    FORWARD 10000
    REPLACE O
    

输出

    
    
    hellO
    

说明

> 超出文本长度替换

## 解题思路

#### 题目解析

  * **编辑器初始化** ：编辑器的输入包括一个已有的文本（即文件内容）和一系列指令序列。指针初始位置位于文本的开头（第一个字符之前）。
  * **指令列表** ：指令有多种类型，可以操作指针位置、插入文本、替换内容、删除文本等。
  * **处理指令的行为** ： 
    * 指针的移动只能在文本的开头和结尾之间进行，不能超出边界。
    * 查找和替换操作仅从指针当前所在的位置开始。
    * 需要特别处理指令中涉及的边界情况，如向前或向后超出文本范围的情况。

#### 支持的指令说明

  1. **FORWARD X** ：指针向右移动X个字符，如果X超过文本末尾，指针移动到文本末尾。
  2. **BACKWARD X** ：指针向左移动X个字符，如果X超过文本开头，指针移动到文本开头。
  3. **SEARCH-FORWARD word** ：从指针当前位置向前查找指定的`word`，找到后将指针移动到该单词的起始位置。如果找不到，指针位置不变。
  4. **SEARCH-BACKWARD word** ：从指针当前位置向后查找指定的`word`，找到后将指针移动到该单词的起始位置。如果找不到，指针位置不变。
  5. **INSERT word** ：在指针当前位置插入`word`，指针移动到插入后`word`的结尾。
  6. **REPLACE word** ：将指针当前位置的内容替换为`word`，指针移动到`word`的结尾位置。
  7. **DELETE X** ：从指针位置开始删除接下来的X个字符，若X超过文本结尾，则删除至文本末尾。

#### 示例分析

  1. **示例1** ：初始文本为`ello`，执行`INSERT h`，在开头插入`h`，结果是`hello`。
  2. **示例2** ：初始文本为`hllo`，指针先向右移动1位，然后插入`e`，形成`hello`。
  3. **示例3** ：尝试向右移动1000位，超出文本范围，指针直接移动到文本结尾，然后插入`o`。
  4. **示例4** ：用`HELLO`替换当前文本，最终结果为`HELLO`。
  5. **示例5** ：用较长的`HELLO_WORLD`替换当前文本。
  6. **示例6** ：向右移动超出范围，然后用`O`替换文本结尾。

#### 关键实现细节

  * **指针移动** ：确保指针在每次移动后不会超出文本范围。
  * **查找和替换** ：要考虑从指针位置开始查找，并确保替换操作适配文本长度。
  * **插入和删除** ：插入操作增加文本长度，删除操作减少文本长度，需动态调整文本。

## Java

    
    
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            Scanner sc = new Scanner(System.in);
    
            // 读取指令序列长度
            int commandCount = sc.nextInt();
            sc.nextLine();
    
            // 读取原始文本
            StringBuilder text = new StringBuilder(sc.nextLine());
    
            // 读取指令序列
            String[][] commands = new String[commandCount][2];
            for (int i = 0; i < commandCount; i++) {
                commands[i] = sc.nextLine().split(" ");
            }
    
            // 初始化指针位置
            int pointer = 0;
    
            // 处理指令序列
            for (String[] command : commands) {
                String action = command[0];
                String argument = command.length > 1 ? command[1] : null;
    
                switch (action) {
                    case "FORWARD":
                        // 向前移动指针
                        pointer = Math.min(pointer + Integer.parseInt(argument), text.length());
                        break;
    
                    case "BACKWARD":
                        // 向后移动指针
                        pointer = Math.max(pointer - Integer.parseInt(argument), 0);
                        break;
    
                    case "SEARCH-FORWARD":
                        // 从当前位置向前查找指定单词
                        int foundPosForward = text.indexOf(argument, pointer);
                        if (foundPosForward != -1) {
                            pointer = foundPosForward;
                        }
                        break;
    
                    case "SEARCH-BACKWARD":
                        // 从当前位置向后查找指定单词
                        int foundPosBackward = text.lastIndexOf(argument, pointer);
                        if (foundPosBackward != -1) {
                            pointer = foundPosBackward;
                        }
                        break;
    
                    case "INSERT":
                        // 在当前位置插入指定单词
                        text.insert(pointer, argument);
                        // 将指针移动到插入内容的结尾
                        pointer += argument.length();
                        break;
    
                    case "REPLACE":
                        // 替换当前位置开始的字符（边界检查）
                        int replaceEnd = Math.min(pointer + argument.length(), text.length());
                        text.replace(pointer, replaceEnd, argument);
                        // 更新指针到替换内容的结尾
                        pointer = replaceEnd;
                        break;
    
                    case "DELETE":
                        // 删除当前位置开始的指定长度的字符（边界检查）
                        int deleteLength = Integer.parseInt(argument);
                        int deleteEnd = Math.min(pointer + deleteLength, text.length());
                        text.delete(pointer, deleteEnd);
                        break;
                }
            }
    
            // 输出最终文本
            System.out.println(text);
        }
    }
    
    

## Python

    
    
    # 导入标准输入模块
    import sys
    
    # 读取输入
    input = sys.stdin.read
    data = input().splitlines()
    
    # 读取指令序列长度
    command_count = int(data[0])
    
    # 读取原始文本
    text = list(data[1])  # 使用列表处理字符串以便修改
    
    # 读取指令序列
    commands = [line.split(" ", 1) for line in data[2:]]
    
    # 初始化指针位置
    pointer = 0
    
    # 处理指令序列
    for command in commands:
        action = command[0]
        argument = command[1] if len(command) > 1 else None
    
        if action == "FORWARD":
            # 向前移动指针，确保不超过文本长度
            pointer = min(pointer + int(argument), len(text))
        
        elif action == "BACKWARD":
            # 向后移动指针，确保不低于文本开头
            pointer = max(pointer - int(argument), 0)
        
        elif action == "SEARCH-FORWARD":
            # 从当前位置向前查找指定单词
            found_pos = "".join(text).find(argument, pointer)
            if found_pos != -1:
                pointer = found_pos
    
        elif action == "SEARCH-BACKWARD":
            # 从当前位置向后查找指定单词
            found_pos = "".join(text).rfind(argument, 0, pointer)
            if found_pos != -1:
                pointer = found_pos
    
        elif action == "INSERT":
            # 在当前位置插入指定单词
            text[pointer:pointer] = list(argument)
            pointer += len(argument)
    
        elif action == "REPLACE":
            # 替换当前位置的字符（边界检查）
            replace_end = min(pointer + len(argument), len(text))
            text[pointer:replace_end] = list(argument)
            pointer = replace_end
    
        elif action == "DELETE":
            # 删除当前位置的指定长度的字符
            delete_length = int(argument)
            delete_end = min(pointer + delete_length, len(text))
            del text[pointer:delete_end]
    
    # 输出最终文本
    print("".join(text))
    
    

## JavaScript

    
    
    const readline = require('readline');
    
    // 设置输入读取
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    let input = [];
    rl.on('line', (line) => input.push(line));
    rl.on('close', () => {
      // 解析指令数量
      const commandCount = parseInt(input[0]);
    
      // 原始文本
      let text = input[1].split('');
    
      // 指令序列
      const commands = input.slice(2).map(line => line.split(" ", 2));
    
      // 指针位置初始化
      let pointer = 0;
    
      // 处理每条指令
      for (const [action, argument] of commands) {
        switch (action) {
          case "FORWARD":
            // 向前移动指针
            pointer = Math.min(pointer + parseInt(argument), text.length);
            break;
    
          case "BACKWARD":
            // 向后移动指针
            pointer = Math.max(pointer - parseInt(argument), 0);
            break;
    
          case "SEARCH-FORWARD":
            // 从当前位置向前查找指定单词
            const forwardIndex = text.join('').indexOf(argument, pointer);
            if (forwardIndex !== -1) pointer = forwardIndex;
            break;
    
          case "SEARCH-BACKWARD":
            // 从当前位置向后查找指定单词
            const backwardIndex = text.join('').lastIndexOf(argument, pointer);
            if (backwardIndex !== -1) pointer = backwardIndex;
            break;
    
          case "INSERT":
            // 在当前位置插入指定单词
            text.splice(pointer, 0, ...argument);
            pointer += argument.length;
            break;
    
          case "REPLACE":
            // 替换当前位置的字符（边界检查）
            const replaceEnd = Math.min(pointer + argument.length, text.length);
            text.splice(pointer, replaceEnd - pointer, ...argument);
            pointer = replaceEnd;
            break;
    
          case "DELETE":
            // 删除当前位置的指定长度字符
            const deleteEnd = Math.min(pointer + parseInt(argument), text.length);
            text.splice(pointer, deleteEnd - pointer);
            break;
        }
      }
    
      // 输出最终文本
      console.log(text.join(''));
    });
    
    

## C++

    
    
    #include <iostream>
    #include <vector>
    #include <string>
    #include <algorithm>
    
    using namespace std;
    
    int main() {
        int commandCount;
        cin >> commandCount;
        cin.ignore();
    
        // 读取原始文本
        string text;
        getline(cin, text);
    
        // 初始化指针位置
        int pointer = 0;
    
        // 处理每个命令
        for (int i = 0; i < commandCount; i++) {
            string command;
            getline(cin, command);
    
            string action = command.substr(0, command.find(" "));
            string argument = command.size() > action.size() ? command.substr(command.find(" ") + 1) : "";
    
            if (action == "FORWARD") {
                // 向前移动指针
                pointer = min(pointer + stoi(argument), (int)text.size());
            } else if (action == "BACKWARD") {
                // 向后移动指针
                pointer = max(pointer - stoi(argument), 0);
            } else if (action == "SEARCH-FORWARD") {
                // 从当前位置向前查找指定单词
                size_t foundPos = text.find(argument, pointer);
                if (foundPos != string::npos) {
                    pointer = foundPos;
                }
            } else if (action == "SEARCH-BACKWARD") {
                // 从当前位置向后查找指定单词
                size_t foundPos = text.rfind(argument, pointer);
                if (foundPos != string::npos) {
                    pointer = foundPos;
                }
            } else if (action == "INSERT") {
                // 在当前位置插入指定单词
                text.insert(pointer, argument);
                pointer += argument.size();
            } else if (action == "REPLACE") {
                // 替换当前位置的字符（边界检查）
                int replaceEnd = min(pointer + (int)argument.size(), (int)text.size());
                text.replace(pointer, replaceEnd - pointer, argument);
                pointer = replaceEnd;
            } else if (action == "DELETE") {
                // 删除当前位置的指定长度字符
                int deleteLength = stoi(argument);
                int deleteEnd = min(pointer + deleteLength, (int)text.size());
                text.erase(pointer, deleteEnd - pointer);
            }
        }
    
        // 输出最终文本
        cout << text << endl;
        return 0;
    }
    
    

## C语言

    
    
    #include <stdio.h>
    #include <string.h>
    #include <stdlib.h>
    
    #define MAX_TEXT_SIZE 256000
    
    int main() {
        int commandCount;
        scanf("%d\n", &commandCount);
    
        // 读取原始文本
        char text[MAX_TEXT_SIZE];
        fgets(text, MAX_TEXT_SIZE, stdin);
        text[strcspn(text, "\n")] = 0;  // 去掉换行符
    
        // 初始化指针位置
        int pointer = 0;
    
        // 处理每个命令
        for (int i = 0; i < commandCount; i++) {
            char command[30];
            fgets(command, sizeof(command), stdin);
    
            char *action = strtok(command, " ");
            char *argument = strtok(NULL, "\n");
    
            if (strcmp(action, "FORWARD") == 0) {
                // 向前移动指针
                pointer += atoi(argument);
                if (pointer > strlen(text)) pointer = strlen(text);
            } else if (strcmp(action, "BACKWARD") == 0) {
                // 向后移动指针
                pointer -= atoi(argument);
                if (pointer < 0) pointer = 0;
            } else if (strcmp(action, "SEARCH-FORWARD") == 0) {
                // 从当前位置向前查找指定单词
                char *found = strstr(text + pointer, argument);
                if (found) pointer = found - text;
            } else if (strcmp(action, "SEARCH-BACKWARD") == 0) {
                // 从当前位置向后查找指定单词
                for (int j = pointer; j >= 0; j--) {
                    if (strncmp(text + j, argument, strlen(argument)) == 0) {
                        pointer = j;
                        break;
                    }
                }
            } else if (strcmp(action, "INSERT") == 0) {
                // 在当前位置插入指定单词
                char temp[MAX_TEXT_SIZE];
                strncpy(temp, text, pointer);
                temp[pointer] = '\0';
                strcat(temp, argument);
                strcat(temp, text + pointer);
                strcpy(text, temp);
                pointer += strlen(argument);
            } else if (strcmp(action, "REPLACE") == 0) {
                // 替换当前位置的字符（边界检查）
                int len = strlen(argument);
                for (int j = 0; j < len && pointer + j < strlen(text); j++) {
                    text[pointer + j] = argument[j];
                }
                pointer += len;
            } else if (strcmp(action,
     "DELETE") == 0) {
                // 删除当前位置的指定长度字符
                int deleteLength = atoi(argument);
                memmove(text + pointer, text + pointer + deleteLength, strlen(text) - pointer - deleteLength + 1);
            }
        }
    
        // 输出最终文本
        printf("%s\n", text);
        return 0;
    }
    
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

#### 完整用例

##### 用例1

    
    
    1
    ello
    INSERT h
    

##### 用例2

    
    
    2
    hllo
    FORWARD 1
    INSERT e
    

##### 用例3

    
    
    2
    hell
    FORWARD 1000
    INSERT o
    

##### 用例4

    
    
    1
    hello
    REPLACE HELLO
    

##### 用例5

    
    
    1
    hello
    REPLACE HELLO_WORLD
    

##### 用例6

    
    
    2
    hello
    FORWARD 10000
    REPLACE O
    

##### 用例7

    
    
    3
    hello
    FORWARD 2
    SEARCH-FORWARD l
    INSERT o
    

##### 用例8

    
    
    3
    hello
    FORWARD 2
    SEARCH-BACKWARD l
    INSERT o
    

##### 用例9

    
    
    3
    hello
    BACKWARD 2
    SEARCH-FORWARD l
    DELETE 2
    

##### 用例10

    
    
    3
    hello
    FORWARD 1
    SEARCH-BACKWARD x
    INSERT o
    

