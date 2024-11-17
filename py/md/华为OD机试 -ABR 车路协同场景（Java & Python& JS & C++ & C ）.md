## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

数轴×有两个点的序列 A={A1， A2, …, Am}和 B={B1, B2, …, Bn}， Ai 和 Bj 均为正整数， A、 B
已经从小到大排好序， A、 B 均肯定不为空，

给定一个距离 R（正整数），列出同时满足如下条件的所有（Ai， Bj）数对

**条件：**

  1. Ai <= Bj
  2. Ai,Bj 距离小于等于 R，但如果 Ai 找不到 R 范围内的 Bj，则列出距它最近的 1 个 Bj，当然此种情况仍然要满足 1，

但如果仍然找不到，就丢弃 Ai。

**原型：**

车路协同场景，一条路上发生了有很多事件（ A），要通过很多路测设备（ B）广播给路上的车，需要给每个事件找到一个合适的路测设备去发送广播消息。

## 输入描述

按照**人易读** 的格式输入一行数据，参见输入样例，其中“ ABR={， }”中的每个字符都是关键分割符，输入中无空格，其他均为任意正整数，

输入 A 和 B 已经排好序， A 和 B 的大小不超过 50，正整数范围不会超过 65535。

## 输出描述

(Ai,Bj）数对序列，排列顺序满足序列中前面的 Ax<=后面的 Ay，前面的 Bx<=后面的 By，

因为输入 A 和 B 已经排好序，所以实际上输出结果不用特意排序，排序不是考察点。

## 示例1

输入

    
    
    A={1,3,5},B={2,4,6},R=1
    

输出

    
    
    (1,2)(3,4)(5,6)
    

说明

> ## 解题思路

**这道题目纯纯考察阅读理解以及输入输出。**

#### 条件描述

  1. **序列说明：**

     * `A` 和 `B` 是两个从小到大排列的正整数序列，且都不为空。
     * 每个 `Ai` 和 `Bj` 都是正整数，并且给定的数列大小（`m` 和 `n`）不超过 50。
  2. **条件1：** `Ai <= Bj`

     * 每个 `Ai` 都需要满足小于等于 `Bj`，才能组成数对 `(Ai, Bj)`。
  3. **条件2：** 距离限制

     * 两个数 `Ai` 和 `Bj` 之间的距离小于等于给定的正整数 `R`，即 `|Ai - Bj| <= R`。
     * 如果找不到满足距离要求的 `Bj`，需要选取距离 `Ai` 最近的 `Bj`，前提是仍然满足 `Ai <= Bj`。
     * 如果 `Ai` 无法找到任何符合条件的 `Bj`，则丢弃这个 `Ai`。

#### 题目背景

这个问题可以理解为一个车路协同的场景：有一系列事件 `A` 需要被广播，而这些广播通过分布在路上的设备 `B` 进行。每个事件 `Ai`
需要选择一个合适的设备 `Bj` 来发送广播，选择的原则是：

  * 尽量选取与事件距离接近的设备。
  * 如果找不到设备，选取最近的符合条件的设备。

#### 示例解释

**输入示例：**

    
    
    A={1,3,5},B={2,4,6},R=1
    

**输出示例：**

    
    
    (1,2)(3,4)(5,6)
    

**说明：**

  * 对于 `A1 = 1`：找到 `B1 = 2`，满足 `1 <= 2` 且 `|1 - 2| <= 1`，所以匹配 `(1, 2)`。
  * 对于 `A2 = 3`：找到 `B2 = 4`，满足 `3 <= 4` 且 `|3 - 4| <= 1`，所以匹配 `(3, 4)`。
  * 对于 `A3 = 5`：找到 `B3 = 6`，满足 `5 <= 6` 且 `|5 - 6| <= 1`，所以匹配 `(5, 6)`。

**总结：** 题目的核心是为每个 `Ai` 找到一个合适的 `Bj`，以满足距离和大小关系的要求，如果找不到满足距离的 `Bj`，则选择最近的满足 `Ai
<= Bj` 的 `Bj`，否则丢弃 `Ai`。

## Java

    
    
    import java.util.ArrayList;
    import java.util.List;
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            // 创建一个Scanner对象来读取输入
            Scanner scanner = new Scanner(System.in);
    
            // 读取下一行输入
            String input = scanner.nextLine();
    
            // 手动解析 A 数组
            // 找到 A 数组的起始位置 "A={" 并加上 3 得到起始索引
            int startA = input.indexOf("A={") + 3;
            // 找到 A 数组的结束位置 "}" 的索引
            int endA = input.indexOf("}", startA);
            // 提取 A 数组的字符串内容
            String aStr = input.substring(startA, endA);
            // 创建一个 List 来存储解析后的事件数据
            List<Integer> events = new ArrayList<>();
            // 按逗号分割 A 数组的字符串，并将每个元素转换为整数
            for (String s : aStr.split(",")) {
                events.add(Integer.parseInt(s.trim())); // 将元素去除空格后转换为整数并添加到列表中
            }
    
            // 手动解析 B 数组
            // 找到 B 数组的起始位置 "B={" 并加上 3 得到起始索引
            int startB = input.indexOf("B={") + 3;
            // 找到 B 数组的结束位置 "}" 的索引
            int endB = input.indexOf("}", startB);
            // 提取 B 数组的字符串内容
            String bStr = input.substring(startB, endB);
            // 创建一个 List 来存储解析后的设备数据
            List<Integer> devices = new ArrayList<>();
            // 按逗号分割 B 数组的字符串，并将每个元素转换为整数
            for (String s : bStr.split(",")) {
                devices.add(Integer.parseInt(s.trim())); // 将元素去除空格后转换为整数并添加到列表中
            }
    
            // 手动解析 R 值
            // 找到 R 值的起始位置 "R=" 并加上 2 得到起始索引
            int startR = input.indexOf("R=") + 2;
            // 提取 R 值字符串，去除空格后转换为整数
            int range = Integer.parseInt(input.substring(startR).trim());
    
            // 创建一个 StringBuilder 对象，用于存储最终的结果对
            StringBuilder resultPairs = new StringBuilder();
    
            // 遍历每个事件
            for (int event : events) {
                int count = 0; // 用于记录当前已找到的设备数量
    
                // 遍历每个设备
                for (int device : devices) {
                    // 如果设备小于事件，则继续下一个设备
                    if (device < event) continue;
    
                    // 如果设备与事件的距离小于等于范围，或这是第一个找到的设备
                    if (device - event <= range || count == 0) {
                        // 将事件和设备的配对添加到结果中
                        resultPairs.append("(").append(event).append(",").append(device).append(")");
                        count++; // 计数器加一
                    } else {
                        // 如果不满足条件，跳出内循环检查下一个事件
                        break;
                    }
                }
            }
    
            // 输出最终结果
            System.out.println(resultPairs.toString());
        }
    }
    
    

## Python

    
    
    # 导入正则表达式模块和系统输入输出模块
    import re
    
    # 从标准输入读取一行
    input_line = input()
    
    # 手动解析 A 数组
    # 使用正则表达式找到 A 数组的内容
    a_match = re.search(r"A=\{([0-9, ]+)\}", input_line)
    a_str = a_match.group(1) if a_match else ""
    # 将 A 数组的字符串按逗号分割并转换为整数
    events = [int(x.strip()) for x in a_str.split(",")]
    
    # 手动解析 B 数组
    # 使用正则表达式找到 B 数组的内容
    b_match = re.search(r"B=\{([0-9, ]+)\}", input_line)
    b_str = b_match.group(1) if b_match else ""
    # 将 B 数组的字符串按逗号分割并转换为整数
    devices = [int(x.strip()) for x in b_str.split(",")]
    
    # 手动解析 R 值
    # 使用正则表达式找到 R 的值
    r_match = re.search(r"R=([0-9]+)", input_line)
    range_value = int(r_match.group(1)) if r_match else 0
    
    # 创建一个用于存储结果的字符串
    result_pairs = ""
    
    # 遍历每个事件
    for event in events:
        count = 0  # 用于记录找到的匹配设备数量
        for device in devices:
            if device < event:
                continue
            if device - event <= range_value or count == 0:
                result_pairs += f"({event},{device})"
                count += 1
            else:
                break
    
    # 输出最终结果
    print(result_pairs)
    
    

## JavaScript

    
    
    // 引入 readline 模块，用于从命令行读取输入
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    // 从命令行读取输入
    rl.on("line", (input) => {
        // 手动解析 A 数组
        const aMatch = input.match(/A=\{([0-9, ]+)\}/);
        const events = aMatch ? aMatch[1].split(',').map(x => parseInt(x.trim())) : [];
    
        // 手动解析 B 数组
        const bMatch = input.match(/B=\{([0-9, ]+)\}/);
        const devices = bMatch ? bMatch[1].split(',').map(x => parseInt(x.trim())) : [];
    
        // 手动解析 R 值
        const rMatch = input.match(/R=([0-9]+)/);
        const range = rMatch ? parseInt(rMatch[1]) : 0;
    
        // 用于存储结果
        let resultPairs = "";
    
        // 遍历每个事件
        events.forEach(event => {
            let count = 0;
            for (const device of devices) {
                if (device < event) continue;
                if (device - event <= range || count === 0) {
                    resultPairs += `(${event},${device})`;
                    count++;
                } else {
                    break;
                }
            }
        });
    
        // 输出最终结果
        console.log(resultPairs);
    
        rl.close();
    });
    
    

## C++

    
    
    #include <iostream>
    #include <vector>
    #include <sstream>
    #include <regex>
    using namespace std;
    
    // 解析字符串并返回整数数组
    vector<int> parseArray(const string &input, const string &pattern) {
        vector<int> result;
        regex reg(pattern);
        smatch match;
        if (regex_search(input, match, reg)) {
            stringstream ss(match[1]);
            string item;
            while (getline(ss, item, ',')) {
                result.push_back(stoi(item));
            }
        }
        return result;
    }
    
    // 主函数
    int main() {
        // 输入格式化字符串
        string input;
     
        getline(cin, input);
    
        // 解析 A 数组
        vector<int> events = parseArray(input, "A=\\{([0-9, ]+)\\}");
    
        // 解析 B 数组
        vector<int> devices = parseArray(input, "B=\\{([0-9, ]+)\\}");
    
        // 解析 R 值
        int range = 0;
        regex rReg("R=([0-9]+)");
        smatch rMatch;
        if (regex_search(input, rMatch, rReg)) {
            range = stoi(rMatch[1]);
        }
    
        // 存储结果
        string resultPairs = "";
    
        // 遍历每个事件
        for (int event : events) {
            int count = 0;
            for (int device : devices) {
                if (device < event) continue;
                if (device - event <= range || count == 0) {
                    resultPairs += "(" + to_string(event) + "," + to_string(device) + ")";
                    count++;
                } else {
                    break;
                }
            }
        }
    
        // 输出最终结果
        cout << resultPairs << endl;
    
        return 0;
    }
    
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    #include <string.h>
    
    // 解析数组并将结果存储在整数数组中
    void parseArray(const char *input, const char *pattern, int *arr, int *len) {
        const char *start = strstr(input, pattern);
        if (start) {
            start += strlen(pattern);
            char *end = strchr(start, '}');
            if (end) {
                char temp[256];
                strncpy(temp, start, end - start);
                temp[end - start] = '\0'; // 添加字符串结束符
    
                char *token = strtok(temp, ", ");
                while (token != NULL && *len < 100) { // 确保数组不会溢出
                    arr[(*len)++] = atoi(token); // 转换为整数并存入数组
                    token = strtok(NULL, ", ");
                }
            }
        }
    }
    
    // 主函数
    int main() {
        char input[512];
        int events[100], devices[100];
        int events_len = 0, devices_len = 0;
        int range = 0;
    
        // 提示用户输入数据并读取输入
     
        fgets(input, sizeof(input), stdin);
        
        // 解析 A 数组
        parseArray(input, "A={", events, &events_len);
    
        // 解析 B 数组
        parseArray(input, "B={", devices, &devices_len);
    
        // 解析 R 值
        char *rStart = strstr(input, "R=");
        if (rStart) {
            range = atoi(rStart + 2); // 转换为整数
        }
    
        // 存储结果的字符串
        char resultPairs[1024] = "";
        
        // 遍历每个事件
        for (int i = 0; i < events_len; i++) {
            int count = 0;
            for (int j = 0; j < devices_len; j++) {
                if (devices[j] < events[i]) continue; // 设备小于事件时，跳过此设备
                if (devices[j] - events[i] <= range || count == 0) { // 检查是否在范围内或是否是第一个匹配
                    char pair[20];
                    snprintf(pair, sizeof(pair), "(%d,%d)", events[i], devices[j]); // 格式化成 (事件,设备) 对
                    strcat(resultPairs, pair); // 将结果对添加到结果字符串中
                    count++;
                } else {
                    break; // 跳出内层循环，处理下一个事件
                }
            }
        }
    
        // 输出最终结果
        printf("%s\n", resultPairs);
    
        return 0;
    }
    
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

#### 完整用例

##### 用例1

    
    
    A={1,2,3},B={2,3,4},R=1
    

##### 用例2

    
    
    A={1,3,5},B={2,4,6},R=1
    

##### 用例3

    
    
    A={1,2,3},B={4,5,6},R=2
    

##### 用例4

    
    
    A={1,2,3},B={4,5,6},R=3
    

##### 用例5

    
    
    A={1,2,3},B={1,2,3},R=0
    

##### 用例6

    
    
    A={1,2,3},B={3,4,5},R=1
    

##### 用例7

    
    
    A={1,2,3},B={2,3,4},R=2
    

##### 用例8

    
    
    A={1,2,3},B={3,4,5},R=0
    

##### 用例9

    
    
    A={1,2,3},B={1,2,3},R=1
    

##### 用例10

    
    
    A={1,2,3},B={4,5,6},R=0
    

