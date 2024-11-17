## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

一群大雁往南飞，给定一个字符串记录地面上的游客听到的大雁叫声，请给出叫声最少由几只大雁发出。

具体的:

​ 1.大雁发出的完整叫声为”quack“，因为有多只大雁同一时间嘎嘎作响，所以字符串中可能会混合多个”quack”。

​ 2.大雁会依次完整发出”quack”，即字符串中’q’ ,‘u’, ‘a’, ‘c’, ‘k’
这5个字母按顺序完整存在才能计数为一只大雁。如果不完整或者没有按顺序则不予计数。

​ 3.如果字符串不是由’q’, ‘u’, ‘a’, ‘c’, ‘k’ 字符组合而成，或者没有找到一只大雁，请返回-1。

## 输入描述

一个字符串，包含大雁quack的叫声。1 <= 字符串长度 <= 1000，字符串中的字符只有’q’, ‘u’, ‘a’, ‘c’, ‘k’。

## 输出描述

大雁的数量

## 示例1

输入

    
    
    quackquack
    

输出

    
    
    1
    

说明

> 无

## 示例2

输入：

    
    
    qaauucqcaa
    

输出：

    
    
    -1
    

说明

> 无

## 示例3

输入：

    
    
    quacqkuackquack
    

输出：

    
    
    2
    

说明

> 无

## 示例4

输入：

    
    
    qququaauqccauqkkcauqqkcauuqkcaaukccakkck
    

输出：

    
    
    5
    

说明

> 无

## 示例5

输入：

    
    
    quacqkuquacqkacuqkackuack
    

输出：

    
    
    3
    

说明

> 无

## 解题思路

### 题目理解

这个题目要求根据地面上的游客听到的大雁叫声（由字符串表示），判断至少有几只大雁在发出叫声。题目假设大雁的完整叫声为“quack”，并且同一时间可能有多只大雁发出这样的叫声。

### 题目要求的关键点：

  1. **完整性** ：一个大雁的叫声必须按顺序完整地发出“quack”。这意味着字符串中的字符必须严格按照顺序出现：q -> u -> a -> c -> k。

  2. **多只大雁的情况** ：多个大雁可以同时发出叫声，造成“quack”片段在字符串中交错出现。例如，字符串“quqacuackk”表示两只大雁在同时发出叫声。

  3. **输入约束** ：字符串长度在1到1000之间，字符只能是q, u, a, c, k。如果字符串中存在不符合规则的部分，或者字符串无法组合成至少一个完整的“quack”，就需要返回-1。

### 示例分析

  * 输入“quackquack”：两个连续完整的“quack”，输出为1，最少只需要一只大雁连续叫两声。
  * 输入“quqacuackk”：“quack”的片段交错出现，但可以还原为两个完整的“quack”， 输出为2，因为是交替进行的，一只大雁不能完成。
  * 输入“qaauucqcaa”：“quac”不完整，无法形成大雁的叫声，输出应为-1。

## Java

    
    
    import java.util.Scanner;
    import java.util.ArrayList;
    import java.util.Arrays;
    import java.util.Collections;
    
    public class Main{
        public static void main(String[] args) {
            // 创建Scanner对象用于读取输入
            Scanner scanner = new Scanner(System.in);
            // 读取输入的字符串
            String chars = scanner.nextLine();
            // 定义大雁叫声的字符串
            String quack = "quack";
            // 定义一个数组，用于存储每个字符的状态
            int[] states = new int[quack.length()];
            // 定义一个ArrayList，用于存储每只大雁的叫声数量
            ArrayList<Integer> dp = new ArrayList<>();
            // 初始化最大值为0
            int max_ = 0;
    
            // 遍历输入的字符串
            for (int i = 0; i < chars.length(); i++) {
                // 获取当前字符在"quack"中的索引
                int index = quack.indexOf(chars.charAt(i));
                // 如果索引为-1，表示输入的字符串包含非法字符，输出-1并退出程序
                if (index == -1) {
                    System.out.println(-1);
                    System.exit(0);
                }
    
                // 如果索引为0，表示当前字符是'q'，更新状态数组
                if (index == 0) {
                    states[index] += 1;
                } else {
                    // 如果当前字符的前一个字符的状态大于0，更新状态数组
                    if (states[index - 1] > 0) {
                        states[index - 1] -= 1;
                        states[index] += 1;
                    }
    
                    // 如果当前字符是'k'，表示一个完整的"quack"叫声已经结束
                    if (quack.charAt(quack.length() - 1) == chars.charAt(i)) {
                        // 如果状态数组的最后一个元素不为0，表示有大雁正在叫
                        if (states[states.length - 1] != 0) {
                            // 创建一个临时数组，用于计算当前大雁的叫声数量
                            int[] temp = Arrays.copyOf(states, states.length);
                            temp[states.length - 1] = 0;
                            max_ = Math.max(max_, Arrays.stream(temp).sum());
                            // 遍历剩余的字符，更新临时数组
                            for (int j = i; j < chars.length(); j++) {
                                index = quack.indexOf(chars.charAt(j));
                                if (index > 0 && temp[index - 1] > 0) {
                                    temp[index - 1] -= 1;
                                    temp[index] += 1;
                                }
                                if (temp[states.length - 1] == max_) {
                                    break;
                                }
                            }
                            // 将当前大雁的叫声数量添加到ArrayList中
                            dp.add(temp[states.length - 1] + 1);
                            // 更新状态数组
                            states[states.length - 1] -= 1;
                        }
                    }
                }
            }
    
            // 输出结果，如果dp为空，表示没有找到一只大雁，输出-1；否则输出最大值
            System.out.println(dp.isEmpty() ? -1 : (int) Collections.max(dp));
        }
    }
    
    
    
    

## Python

    
    
    import sys
     
     
    # 读取输入的字符串
    chars = input().strip()
    # 定义大雁叫声的字符串
    quack = "quack"
    # 定义一个数组，用于存储每个字符的状态
    states = [0] * len(quack)
    # 定义一个列表，用于存储每只大雁的叫声数量
    dp = []
    # 初始化最大值为0
    max_ = 0
    
    # 遍历输入的字符串
    for i in range(len(chars)):
        # 获取当前字符在"quack"中的索引
        index = quack.find(chars[i])
        # 如果索引为-1，表示输入的字符串包含非法字符，输出-1并退出程序
        if index == -1:
            print(-1)
            sys.exit(0)
    
        # 如果索引为0，表示当前字符是'q'，更新状态数组
        if index == 0:
            states[index] += 1
        else:
            # 如果当前字符的前一个字符的状态大于0，更新状态数组
            if states[index - 1] > 0:
                states[index - 1] -= 1
                states[index] += 1
    
            # 如果当前字符是'k'，表示一个完整的"quack"叫声已经结束
            if quack[-1] == chars[i]:
                # 如果状态数组的最后一个元素不为0，表示有大雁正在叫
                if states[-1] != 0:
                    # 创建一个临时数组，用于计算当前大雁的叫声数量
                    temp = states[:]
                    temp[-1] = 0
                    max_ = max(max_, sum(temp))
                    # 遍历剩余的字符，更新临时数组
                    for j in range(i, len(chars)):
                        index = quack.find(chars[j])
                        if index > 0 and temp[index - 1] > 0:
                            temp[index - 1] -= 1
                            temp[index] += 1
                        if temp[-1] == max_:
                            break
                    # 将当前大雁的叫声数量添加到列表中
                    dp.append(temp[-1] + 1)
                    # 更新状态数组
                    states[-1] -= 1
    
    # 输出结果，如果dp为空，表示没有找到一只大雁，输出-1；否则输出最大值
    print(-1 if not dp else max(dp))
    
    
    
    
    

## JavaScript

    
    
    // 引入 readline 模块并创建接口用于读取来自标准输入（stdin）的数据
    const rl = require("readline").createInterface({ input: process.stdin });
    
    // 创建异步迭代器，用于按行读取输入
    var iter = rl[Symbol.asyncIterator]();
    
    // 定义一个异步函数用于读取一行输入
    const readline = async () => (await iter.next()).value;
    
    // 立即执行的异步函数，主逻辑在此执行
    void (async function () {
        const chars = await readline();  // 读取一行输入数据（假设为大雁叫声的字符串）
        const quack = "quack";  // 定义标准的“大雁叫声”顺序
        const states = new Array(quack.length).fill(0);  // 初始化状态数组，用于跟踪每个字符的出现次数
        const dp = [];  // 动态规划数组，用于记录完成“quack”时大雁的数量
        let max_ = 0;  // 记录同时发出叫声的大雁的最大数量
    
        // 遍历输入的每一个字符
        for (let i = 0; i < chars.length; i++) {
            const index = quack.indexOf(chars[i]);  // 查找当前字符在“quack”中的位置
            if (index === -1) {  // 如果字符不在“quack”中，表示无效输入
                console.log(-1);  // 输出-1表示错误
                process.exit();  // 终止程序
            }
    
            if (index === 0) {  // 如果是“q”，表示一个新的大雁叫声的开始
                states[index] += 1;  // 更新状态数组，记录一个新“q”的出现
            } else {
                if (states[index - 1]) {  // 如果前一个字符的状态有效
                    states[index - 1] -= 1;  // 前一个字符状态减1
                    states[index] += 1;  // 当前字符状态加1
                }
    
                // 如果当前字符是“k”，表示一个完整的“quack”结束
                if (quack[quack.length - 1] === chars[i]) {
                    if (states[states.length - 1] !== 0) {  // 确保有一个完整的“quack”
                        const temp = [...states];  // 复制当前状态数组
                        temp[states.length - 1] = 0;  // 重置最后一个字符的状态
                        max_ = Math.max(max_, temp.reduce((a, b) => a + b));  // 更新最大大雁数量
    
                        // 检查剩余的字符，尝试找到更多的完整“quack”
                        for (let j = i; j < chars.length; j++) {
                            const index = quack.indexOf(chars[j]);  // 查找字符位置
                            if (temp[index - 1]) {  // 如果前一个字符状态有效
                                temp[index - 1] -= 1;  // 前一个字符状态减1
                                temp[index] += 1;  // 当前字符状态加1
                            }
                            if (temp[temp.length - 1] === max_) {  // 如果达到最大大雁数量
                                break;  // 停止搜索
                            }
                        }
                        dp.push(temp[temp.length - 1] + 1);  // 记录当前的最大大雁数量
                        states[states.length - 1] -= 1;  // 减少完成的“quack”计数
                    }
                }
            }
        }
    
        // 输出最大的大雁数量，如果没有找到有效的“quack”，则返回-1
        console.log(dp.length ? Math.max(...dp) : -1);
    })();
    

## C++

    
    
    #include <iostream>    
    #include <vector>      
    #include <algorithm>    
    #include <numeric>       
    
    using namespace std;
    
    int main() {
        string chars;  // 定义输入字符串，用于存储游客听到的大雁叫声
        cin >> chars;  // 从标准输入中读取字符串
        string quack = "quack";  // 定义标准的大雁叫声顺序
        vector<int> states(quack.size(), 0);  // 定义一个状态数组，用于跟踪每个字符的出现次数
        vector<int> dp;  // 动态规划数组，用于记录完成“quack”时大雁的数量
        int max_ = 0;  // 用于记录同时发出叫声的大雁的最大数量
    
        // 遍历输入字符串中的每一个字符
        for (int i = 0; i < chars.size(); i++) {
            int index = quack.find(chars[i]);  // 找到当前字符在“quack”中的位置
            if (index == -1) {  // 如果字符不在“quack”中，输出-1并结束程序
                cout << -1 << endl;
                exit(0);
            }
    
            if (index == 0) {  // 如果是“q”，表示一个新的大雁叫声的开始
                states[index] += 1;  // 更新状态数组，表示一个新“q”的开始
            }
            else {
                if (states[index - 1]) {  // 检查前一个字符的状态是否有效
                    states[index - 1] -= 1;  // 前一个字符的状态减1
                    states[index] += 1;  // 当前字符的状态加1
                }
    
                if (quack[quack.size() - 1] == chars[i]) {  // 如果当前字符是“k”，表示一个完整的“quack”结束
                    if (states[states.size() - 1] != 0) {  // 确保有一个完整的“quack”存在
                        vector<int> temp(states);  // 复制当前状态数组
                        temp[states.size() - 1] = 0;  // 重置最后一个字符的状态
                        max_ = max(max_, accumulate(temp.begin(), temp.end(), 0));  // 更新最大大雁数量
    
                        // 检查剩余的字符，尝试找到更多的完整“quack”
                        for (int j = i; j < chars.size(); j++) {
                            index = quack.find(chars[j]);
                            if (temp[index - 1]) {  // 检查前一个字符的状态是否有效
                                temp[index - 1] -= 1;  // 前一个字符的状态减1
                                temp[index] += 1;  // 当前字符的状态加1
                            }
                            if (temp[states.size() - 1] == max_) {  // 如果达到最大大雁数量，停止循环
                                break;
                            }
                        }
                        dp.push_back(temp[states.size() - 1] + 1);  // 记录当前的最大大雁数量
                        states[states.size() - 1] -= 1;  // 减少完成的“quack”计数
                    }
                }
            }
        }
    
        // 输出最大的大雁数量，如果没有找到有效的“quack”，则返回-1
        cout << (dp.empty() ? -1 : *max_element(dp.begin(), dp.end())) << endl;
    
        return 0;
    }
    

## C语言

    
    
    #include <stdio.h>   // 标准输入输出库
    #include <stdlib.h>  // 包含 exit 函数
    #include <string.h>  // 字符串处理库
    
    #define MAX_LEN 1000  // 定义输入字符串的最大长度
    
    int main() {
        char chars[MAX_LEN];  // 定义输入字符串数组，用于存储游客听到的大雁叫声
        scanf("%s", chars);  // 从标准输入中读取字符串
        char quack[] = "quack";  // 定义标准的大雁叫声顺序
        int states[5] = {0};  // 定义一个状态数组，用于跟踪每个字符的出现次数
        int dp[MAX_LEN] = {0};  // 动态规划数组，用于记录完成“quack”时大雁的数量
        int max_ = 0;  // 用于记录同时发出叫声的大雁的最大数量
        int dp_index = 0;  // 动态规划数组的索引
    
        // 遍历输入字符串中的每一个字符
        for (int i = 0; i < strlen(chars); i++) {
            int index = -1;  // 用于存储当前字符在“quack”中的位置
            for (int k = 0; k < strlen(quack); k++) {  // 手动查找当前字符在“quack”中的位置
                if (chars[i] == quack[k]) {
                    index = k;
                    break;
                }
            }
            if (index == -1) {  // 如果字符不在“quack”中，输出-1并结束程序
                printf("-1\n");
                exit(0);
            }
    
            if (index == 0) {  // 如果是“q”，表示一个新的大雁叫声的开始
                states[index] += 1;  // 更新状态数组，表示一个新“q”的开始
            }
            else {
                if (states[index - 1]) {  // 检查前一个字符的状态是否有效
                    states[index - 1] -= 1;  // 前一个字符的状态减1
                    states[index] += 1;  // 当前字符的状态加1
                }
    
                if (quack[strlen(quack) - 1] == chars[i]) {  // 如果当前字符是“k”，表示一个完整的“quack”结束
                    if (states[strlen(quack) - 1] != 0) {  // 确保有一个完整的“quack”存在
                        int temp[5];  // 定义临时状态数组
                        for (int t = 0; t < 5; t++) {
                            temp[t] = states[t];  // 复制当前状态数组
                        }
                        temp[strlen(quack) - 1] = 0;  // 重置最后一个字符的状态
                        int temp_sum = 0;  // 计算当前状态数组的和
                        for (int t = 0; t < 5; t++) {
                            temp_sum += temp[t];
                        }
                        if (temp_sum > max_) {  // 更新最大大雁数量
                            max_ = temp_sum;
                        }
    
                        // 检查剩余的字符，尝试找到更多的完整“quack”
                        for (int j = i; j < strlen(chars); j++) {
                            int inner_index = -1;
                            for (int k = 0; k < strlen(quack); k++) {
                                if (chars[j] == quack[k]) {
                                    inner_index = k;
                                    break;
                                }
                            }
                            if (temp[inner_index - 1]) {  // 检查前一个字符的状态是否有效
                                temp[inner_index - 1] -= 1;  // 前一个字符的状态减1
                                temp[inner_index] += 1;  // 当前字符的状态加1
                            }
                            if (temp[strlen(quack) - 1] == max_) {  // 如果达到最大大雁数量，停止循环
                                break;
                            }
                        }
                        dp[dp_index++] = temp[strlen(quack) - 1] + 1;  // 记录当前的最大大雁数量
                        states[strlen(quack) - 1] -= 1;  // 减少完成的“quack”计数
                    }
                }
            }
        }
    
        // 输出最大的大雁数量，如果没有找到有效的“quack”，则返回-1
        if (dp_index == 0) {
            printf("-1\n");
        } else {
            int result = dp[0];
            for (int i = 1; i < dp_index; i++) {
                if (dp[i] > result) {
                    result = dp[i];
                }
            }
            printf("%d\n", result);
        }
    
        return 0;
    }
    

## 新解法

    
    
     
    quacks = list(input())
     
    def find():
        isFind = False
    
        index = 0
        quack_index = [-1, -1, -1, -1, -1]
    
        for i in range(len(quacks)):
            if quacks[i] == "quack"[index]:
                quack_index[index] = i
                index += 1
    
            if index == 5:
                isFind = True
    
                for j in quack_index:
                    quacks[j] = ' '
    
                index = 0
    
        return isFind
    
    # 算法入口
    count = 0
    
    while find():
        count += 1
    
    # 输出结果
    print(-1 if count == 0 else count)
    
    
    
     import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            // 输入获取
            Scanner scanner = new Scanner(System.in);
            char[] quacks = scanner.nextLine().toCharArray();
    
            // 算法入口
            int count = 0;
            while (find(quacks)) {
                count++;
            }
    
            // 输出结果
            System.out.println(count == 0 ? -1 : count);
        }
    
        // 一轮找出一只大雁的所有叫声
        public static boolean find(char[] quacks) {
            boolean isFind = false;
            int index = 0; // 当前 "quack" 的索引
            int[] quackIndex = new int[5]; // 存储每个 "quack" 的字符位置
            for (int i = 0; i < quacks.length; i++) {
                if (quacks[i] == "quack".charAt(index)) {
                    quackIndex[index] = i; // 标记该字符位置
                    index++;
                }
                if (index == 5) {
                    isFind = true; // 完成一个 "quack"
                    for (int j : quackIndex) {
                        quacks[j] = ' '; // 清空已经处理的字符
                    }
                    index = 0; // 重置索引，继续寻找
                }
            }
            return isFind;
        }
    }
    
    
    
    // 输入获取
    const readline = require("readline");
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    rl.on("line", (input) => {
        const quacks = input.split(""); // 将输入字符串转为字符数组
    
        // 一轮找出一只大雁的所有叫声
        function find() {
            let isFind = false;
            let index = 0;
            const quackIndex = Array(5).fill(-1); // 存储 "quack" 的字符位置
            for (let i = 0; i < quacks.length; i++) {
                if (quacks[i] === "quack"[index]) {
                    quackIndex[index] = i; // 标记字符位置
                    index++;
                }
                if (index === 5) {
                    isFind = true; // 完成一个 "quack"
                    for (const j of quackIndex) {
                        quacks[j] = " "; // 清空已经处理的字符
                    }
                    index = 0; // 重置索引，继续寻找
                }
            }
            return isFind;
        }
    
        // 算法入口
        let count = 0;
        while (find()) {
            count++;
        }
    
        // 输出结果
        console.log(count === 0 ? -1 : count);
        rl.close();
    });
    
    
    
    
    #include <iostream>
    #include <string>
    #include <vector>
    using namespace std;
    
    // 一轮找出一只大雁的所有叫声
    bool find(vector<char> &quacks) {
        bool isFind = false;
        int index = 0; // 当前 "quack" 的索引
        int quackIndex[5] = {-1, -1, -1, -1, -1}; // 存储每个 "quack" 的字符位置
    
        for (int i = 0; i < quacks.size(); i++) {
            if (quacks[i] == "quack"[index]) {
                quackIndex[index] = i; // 标记字符位置
                index++;
            }
            if (index == 5) {
                isFind = true; // 完成一个 "quack"
                for (int j = 0; j < 5; j++) {
                    quacks[quackIndex[j]] = ' '; // 清空已经处理的字符
                }
                index = 0; // 重置索引，继续寻找
            }
        }
        return isFind;
    }
    
    int main() {
        // 输入获取
        string input;
        cin >> input;
        vector<char> quacks(input.begin(), input.end());
    
        // 算法入口
        int count = 0;
        while (find(quacks)) {
            count++;
        }
    
        // 输出结果
        cout << (count == 0 ? -1 : count) << endl;
    
        return 0;
    }
    
    
    
    #include <stdio.h>
    #include <string.h>
    #include <stdbool.h>
    
    #define MAX_LENGTH 10000
    
    // 一轮找出一只大雁的所有叫声
    bool find(char quacks[], int length) {
        bool isFind = false;
        int index = 0; // 当前 "quack" 的索引
        int quackIndex[5] = {-1, -1, -1, -1, -1}; // 存储每个 "quack" 的字符位置
    
        for (int i = 0; i < length; i++) {
            if (quacks[i] == "quack"[index]) {
                quackIndex[index] = i; // 标记字符位置
                index++;
            }
            if (index == 5) {
                isFind = true; // 完成一个 "quack"
                for (int j = 0; j < 5; j++) {
                    quacks[quackIndex[j]] = ' '; // 清空已经处理的字符
                }
                index = 0; // 重置索引，继续寻找
            }
        }
        return isFind;
    }
    
    int main() {
        // 输入获取
        char quacks[MAX_LENGTH];
        scanf("%s", quacks);
        int length = strlen(quacks);
    
        // 算法入口
        int count = 0;
        while (find(quacks, length)) {
            count++;
        }
    
        // 输出结果
        printf("%d\n", count == 0 ? -1 : count);
    
        return 0;
    }
    

![fengmian](https://i-blog.csdnimg.cn/blog_migrate/83c8b1166777fd98d2ab42c4a27966bf.png)

## 完整用例

### 用例1

    
    
    quackquack
    

### 用例2

    
    
    quac
    

### 用例3

    
    
    quacqkuackquack
    

### 用例4

    
    
    qququaauqccauqkkcauqqkcauuqkcaaukccakkck
    

### 用例5

    
    
    quackquuackqquackac
    

### 用例6

    
    
    quackqauckquack
    

### 用例7

    
    
    qquuaaccckk
    

### 用例8

    
    
    kkkcccuaaq
    

### 用例9

    
    
    quacqkuquacqkacuqkackuack
    

### 用例10

    
    
    q
    

