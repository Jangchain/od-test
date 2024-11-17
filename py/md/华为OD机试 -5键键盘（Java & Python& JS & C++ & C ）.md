## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

有一个特殊的5键键盘，上面有a，ctrl-c，ctrl-x，ctrl-v，ctrl-a五个键。

a键在屏幕上输出一个字母a；

ctrl-c将当前选择的字母复制到剪贴板；

ctrl-x将当前选择的字母复制到剪贴板，并清空选择的字母；

ctrl-v将当前剪贴板里的字母输出到屏幕；

ctrl-a选择当前屏幕上的所有字母。

**注意：**

  1. 剪贴板初始为空，新的内容被复制到剪贴板时会覆盖原来的内容
  2. 当屏幕上没有字母时，ctrl-a无效
  3. 当没有选择字母时，ctrl-c和ctrl-x无效
  4. 当有字母被选择时，a和ctrl-v这两个有输出功能的键会先清空选择的字母，再进行输出

给定一系列键盘输入，输出最终屏幕上字母的数量。

## 输入描述

输入为一行，为简化解析，用数字1 2 3 4 5代表a，ctrl-c，ctrl-x，ctrl-v，ctrl-a五个键的输入，数字用空格分隔。。

## 输出描述

输出一个数字，为最终屏幕上字母的数量。

## 示例1

输入

    
    
    1 1 1
    

输出

    
    
    3
    

说明

> 连续键入3个a，故屏幕上字母的长度为3。

## 示例2

输入

    
    
    1 1 5 1 5 2 4 4
    

输出

    
    
    2
    

说明

> 输入两个a后ctrl-a选择这两个a，再输入a时选择的两个a先被清空，所以此时屏幕只有一个a，
>
> 后续的ctrl-a，ctrl-c选择并复制了这一个a，最后两个ctrl-v在屏幕上输出两个a，
>
> 故屏幕上字母的长度为2（第一个ctrl-v清空了屏幕上的那个a）。

## 解题思路

示例解释：

**示例1** ：

  * 输入：`1 1 1`
  * 解释：连续按下`1`键三次，在屏幕上依次输出`a`，最终屏幕上有`3`个字母`a`。
  * 输出：`3`

**示例2** ：

  * 输入：`1 1 5 1 5 2 4 4`
  * 解释： 
    1. `1 1`：连续按下两次`a`键，屏幕上有`aa`。
    2. `5`：按下`ctrl-a`，选中屏幕上的所有字母`aa`。
    3. `1`：按下`a`，先清空选中的字母，再输出一个`a`，屏幕上只剩下`a`。
    4. `5`：按下`ctrl-a`，选中屏幕上的字母`a`。
    5. `2`：按下`ctrl-c`，复制选中的`a`到剪贴板。
    6. `4 4`：连续两次按下`ctrl-v`，每次粘贴前会清空选中内容，输出剪贴板中的`a`。最终屏幕上为`aa`。
  * 输出：`2`

## Java

    
    
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            String line = scanner.nextLine();
            String[] inputs = line.split(" ");
            System.out.println(getFinalLetterCount(inputs));
        }
    
        public static int getFinalLetterCount(String[] inputs) {
            int screenCount = 0; // 屏幕上的字母数量
            int clipBoardCount = 0; // 剪贴板上的字母数量
            boolean isSelecting = false; // 是否正在选择
    
            for (String input : inputs) {
                switch (input) {
                    case "1": // a键
                        if (isSelecting) {
                            screenCount = 0; // 清空已选择的字母
                        }
                        screenCount++; // 输出一个a
                        isSelecting = false;
                        break;
                    case "2": // ctrl-c
                        if (isSelecting) {
                            clipBoardCount = screenCount; // 将屏幕内容复制到剪贴板
                        }
                        break;
                    case "3": // ctrl-x
                        if (isSelecting) {
                            clipBoardCount = screenCount; // 剪切屏幕内容到剪贴板
                            screenCount = 0; // 清空屏幕内容
                            isSelecting = false;
                        }
                        break;
                    case "4": // ctrl-v
                        if (isSelecting) {
                            screenCount = 0; // 清空已选择的字母
                        }
                        screenCount += clipBoardCount; // 粘贴剪贴板内容
                        isSelecting = false;
                        break;
                    case "5": // ctrl-a
                        if (screenCount > 0) {
                            isSelecting = true; // 选择屏幕上的所有字母
                        }
                        break;
                }
            }
    
            return screenCount;
        }
    }
    
    

## Python

    
    
    # 获取最终屏幕上字母数量的函数
    def get_final_letter_count(inputs):
        screen_count = 0  # 屏幕上的字母数量
        clip_board_count = 0  # 剪贴板上的字母数量
        is_selecting = False  # 是否正在选择
    
        # 遍历每个输入命令
        for input_key in inputs:
            if input_key == "1":  # a键
                if is_selecting:
                    screen_count = 0  # 清空已选择的字母
                screen_count += 1  # 输出一个a
                is_selecting = False
            elif input_key == "2":  # ctrl-c
                if is_selecting:
                    clip_board_count = screen_count  # 将屏幕内容复制到剪贴板
            elif input_key == "3":  # ctrl-x
                if is_selecting:
                    clip_board_count = screen_count  # 剪切屏幕内容到剪贴板
                    screen_count = 0  # 清空屏幕内容
                    is_selecting = False
            elif input_key == "4":  # ctrl-v
                if is_selecting:
                    screen_count = 0  # 清空已选择的字母
                screen_count += clip_board_count  # 粘贴剪贴板内容
                is_selecting = False
            elif input_key == "5":  # ctrl-a
                if screen_count > 0:
                    is_selecting = True  # 选择屏幕上的所有字母
    
        return screen_count  # 返回屏幕上的字母数量
    
    # 获取输入并运行函数
    inputs = input().strip().split()
    print(get_final_letter_count(inputs))
    
    

## JavaScript

    
    
    // 获取最终屏幕上字母数量的函数
    function getFinalLetterCount(inputs) {
        let screenCount = 0; // 屏幕上的字母数量
        let clipBoardCount = 0; // 剪贴板上的字母数量
        let isSelecting = false; // 是否正在选择
    
        // 遍历每个输入命令
        for (let inputKey of inputs) {
            switch (inputKey) {
                case "1": // a键
                    if (isSelecting) {
                        screenCount = 0; // 清空已选择的字母
                    }
                    screenCount += 1; // 输出一个a
                    isSelecting = false;
                    break;
                case "2": // ctrl-c
                    if (isSelecting) {
                        clipBoardCount = screenCount; // 将屏幕内容复制到剪贴板
                    }
                    break;
                case "3": // ctrl-x
                    if (isSelecting) {
                        clipBoardCount = screenCount; // 剪切屏幕内容到剪贴板
                        screenCount = 0; // 清空屏幕内容
                        isSelecting = false;
                    }
                    break;
                case "4": // ctrl-v
                    if (isSelecting) {
                        screenCount = 0; // 清空已选择的字母
                    }
                    screenCount += clipBoardCount; // 粘贴剪贴板内容
                    isSelecting = false;
                    break;
                case "5": // ctrl-a
                    if (screenCount > 0) {
                        isSelecting = true; // 选择屏幕上的所有字母
                    }
                    break;
            }
        }
    
        return screenCount; // 返回屏幕上的字母数量
    }
    const readline = require("readline");
     
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    
    rl.on("line", (line) => {
        const inputs = line.split(" ");
        console.log(getFinalLetterCount(inputs))
    })
    
    

## C++

    
    
    #include <iostream>
    #include <vector>
    #include <string>
    #include <sstream>
    using namespace std;
    
    // 获取最终屏幕上字母数量的函数
    int getFinalLetterCount(const vector<string>& inputs) {
        int screenCount = 0; // 屏幕上的字母数量
        int clipBoardCount = 0; // 剪贴板上的字母数量
        bool isSelecting = false; // 是否正在选择
    
        // 遍历每个输入命令
        for (const string& inputKey : inputs) {
            if (inputKey == "1") { // a键
                if (isSelecting) {
                    screenCount = 0; // 清空已选择的字母
                }
                screenCount += 1; // 输出一个a
                isSelecting = false;
            } else if (inputKey == "2") { // ctrl-c
                if (isSelecting) {
                    clipBoardCount = screenCount; // 将屏幕内容复制到剪贴板
                }
            } else if (inputKey == "3") { // ctrl-x
                if (isSelecting) {
                    clipBoardCount = screenCount; // 剪切屏幕内容到剪贴板
                    screenCount = 0; // 清空屏幕内容
                    isSelecting = false;
                }
            } else if (inputKey == "4") { // ctrl-v
                if (isSelecting) {
                    screenCount = 0; // 清空已选择的字母
                }
                screenCount += clipBoardCount; // 粘贴剪贴板内容
                isSelecting = false;
            } else if (inputKey == "5") { // ctrl-a
                if (screenCount > 0) {
                    isSelecting = true; // 选择屏幕上的所有字母
                }
            }
        }
    
        return screenCount; // 返回屏幕上的字母数量
    }
    
    int main() {
        string line;
        getline(cin, line);
        stringstream ss(line);
        vector<string> inputs;
        string inputKey;
    
        // 读取输入并分割成向量
        while (ss >> inputKey) {
            inputs.push_back(inputKey);
        }
    
        cout << getFinalLetterCount(inputs) << endl; // 输出结果
        return 0;
    }
    
    

## C语言

    
    
    #include <stdio.h>
    #include <string.h>
    
    // 获取最终屏幕上字母数量的函数
    int getFinalLetterCount(char inputs[][3], int length) {
        int screenCount = 0; // 屏幕上的字母数量
        int clipBoardCount = 0; // 剪贴板上的字母数量
        int isSelecting = 0; // 是否正在选择
    
        // 遍历每个输入命令
        for (int i = 0; i < length; i++) {
            if (strcmp(inputs[i], "1") == 0) { // a键
                if (isSelecting) {
                    screenCount = 0; // 清空已选择的字母
                }
                screenCount += 1; // 输出一个a
                isSelecting = 0;
            } else if (strcmp(inputs[i], "2") == 0) { // ctrl-c
                if (isSelecting) {
                    clipBoardCount = screenCount; // 将屏幕内容复制到剪贴板
                }
            } else if (strcmp(inputs[i], "3") == 0) { // ctrl-x
                if (isSelecting) {
                    clipBoardCount = screenCount; // 剪切屏幕内容到剪贴板
                    screenCount = 0; // 清空屏幕内容
                    isSelecting = 0;
                }
            } else if (strcmp(inputs[i], "4") == 0) { // ctrl-v
                if (isSelecting) {
                    screenCount = 0; // 清空已选择的字母
                }
                screenCount += clipBoardCount; // 粘贴剪贴板内容
                isSelecting = 0;
            } else if (strcmp(inputs[i], "5") == 0) { // ctrl-a
                if (screenCount > 0) {
                    isSelecting = 1; // 选择屏幕上的所有字母
                }
            }
        }
    
        return screenCount; // 返回屏幕上的字母数量
    }
    
    int main() {
        char line[100];
        fgets(line, sizeof(line), stdin); // 获取输入行
    
        char inputs[50][3];
        int count = 0;
        char *token = strtok(line, " \n");
    
        // 分割输入并存入数组
        while (token != NULL) {
            strcpy(inputs[count++], token);
            token = strtok(NULL, " \n");
        }
    
        printf("%d\n", getFinalLetterCount(inputs, count)); // 输出结果
        return 0;
    }
    
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

