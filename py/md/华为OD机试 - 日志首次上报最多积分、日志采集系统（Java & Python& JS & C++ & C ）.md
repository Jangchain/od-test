## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

日志采集是运维系统的的核心组件。日志是按行生成，每行记做一条，由采集系统分批上报。

  * 如果上报太频繁，会对服务端造成压力;
  * 如果上报太晚，会降低用户的体验；
  * 如果一次上报的条数太多，会导致超时失败。

为此，项目组设计了如下的上报策略：

  1. 每成功上报一条日志，奖励1分
  2. 每条日志每延迟上报1秒，扣1分
  3. 积累日志达到100条，必须立即上报

给出日志序列，根据该规则，计算首次上报能获得的最多积分数。

## 输入描述

按时序产生的日志条数 T1,T2…Tn，其中 1<=n<=1000，0<=Ti<=100

## 输出描述

首次上报最多能获得的积分数

## 示例1

输入

    
    
    1 98 1
    

输出

    
    
    98
    

说明

> T1 时刻上报得 1 分  
>  T2 时刻上报得98分，最大  
>  T3 时刻上报得 0 分

## 示例2

输入

    
    
    50 60 1
    

输出

    
    
    50
    

说明

> 如果第1个时刻上报，获得积分50。如果第2个时刻上报，最多上报100条，前50条延迟上报1s，每条扣除1分，共获得积分为 100-50=50

## 示例3

输入

    
    
    3 7 40 10 60
    

输出

    
    
    37
    

说明

> T1时刻上报得3分
>
> T2时刻上报得7分
>
> T3时刻上报得37分，最大
>
> T4时刻上报得-3分
>
> T5时刻上报，因为已经超了100条限制，所以只能上报100条，得-23分

## 解题思路

### **上报策略** ：

  * **积分奖励** ：每成功上报一条日志，可以获得 1 分。
  * **延迟扣分** ：每条日志每延迟 1 秒上报，会扣除 1 分。
  * **强制上报** ：当积累的日志数量达到 100 条时，必须立即上报，无法再继续等待更多日志。

### 例子解析

  1. **输入：`1 98 1`，输出：`98`**

     * 在第1时刻，上报1条日志，获得1分。
     * 在第2时刻，累计生成99条日志（1+98），上报这99条日志，获得99 -1 = 98分（因为第1条日志延迟1秒扣1分，其余98条按时上报不扣分）。
     * 在第3时刻，累计生成100条日志（99+1），必须立即上报，获得100 -2 - 98= 0分。
     * 最大积分出现在第2时刻，为98分。
  2. **输入：`50 60 1`，输出：`50`**

     * 在第1时刻，上报50条日志，获得50分。
     * 在第2时刻，累计生成110条日志（50+60），强制上报100条。前50条日志延迟1秒，每条扣1分，最终得分为50分（100 - 50）。
  3. **输入：`3 7 40 10 60`，输出：`37`**

     * 在第3时刻上报，当前为40条，加上前两秒的，总共50条，上报得50分，但是T2的 7条超时了1秒，减7分，T1的3条超时了2秒，减6分，最后得37分。

## Java

    
    
    import java.util.Scanner;
    
    public class LogCollection {
        public static void main(String[] args) {
            Scanner in = new Scanner(System.in);
            // 读取输入的日志序列
            String input = in.nextLine();
            // 将日志序列按空格分割成数组
            String[] logs = input.split(" ");
    
            int totalCount = 0; // 总日志条数
            int maxScore = 0; // 最大积分数
            for (int i = 0; i < logs.length; i++) {
                int logCount = Integer.valueOf(logs[i]); // 当前时间点的日志条数
                if (logCount == 0) {
                    continue; // 如果当前时间点没有日志条数，则跳过
                }
    
                totalCount += logCount; // 更新总日志条数
    
                int score = 0; // 当前时间点的积分数
                for (int j = 0; j <= i; j++) {
                    if (totalCount > 100 && i == j) {
                        // 如果总日志条数超过100，并且当前时间点是最后一个时间点
                        score += logCount - (totalCount - 100); // 计算得分
                    } else {
                        score += Integer.valueOf(logs[j]) - (i - j) * Integer.valueOf(logs[j]); // 计算得分
                    }
                }
    
                if (score > maxScore) {
                    maxScore = score; // 更新最大积分数
                }
    
                if (totalCount >= 100) {
                    break; // 如果总日志条数达到100条以上，则退出循环
                }
            }
    
            System.out.println(maxScore); // 输出最大积分数
        }
    }
    

## Python

    
    
    import sys
    
    # 读取输入的日志序列
    input = sys.stdin.readline().strip()
    # 将日志序列按空格分割成数组
    logs = input.split(" ")
    
    totalCount = 0  # 总日志条数
    maxScore = 0  # 最大积分数
    for i in range(len(logs)):
        logCount = int(logs[i])  # 当前时间点的日志条数
        if logCount == 0:
            continue  # 如果当前时间点没有日志条数，则跳过
    
        totalCount += logCount  # 更新总日志条数
    
        score = 0  # 当前时间点的积分数
        for j in range(i+1):
            if totalCount > 100 and i == j:
                # 如果总日志条数超过100，并且当前时间点是最后一个时间点
                score += logCount - (totalCount - 100)  # 计算得分
            else:
                score += int(logs[j]) - (i - j) * int(logs[j])  # 计算得分
    
        if score > maxScore:
            maxScore = score  # 更新最大积分数
    
        if totalCount >= 100:
            break  # 如果总日志条数达到100条以上，则退出循环
    
    print(maxScore)  # 输出最大积分数
    

## JavaScript

    
    
    var readline = require('readline');
    
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    rl.on('line', function (input) {
        var logs = input.split(" ");
    
        var totalCount = 0; // 总日志条数
        var maxScore = 0; // 最大积分数
        for (var i = 0; i < logs.length; i++) {
            var logCount = parseInt(logs[i]); // 当前时间点的日志条数
            if (logCount === 0) {
                continue; // 如果当前时间点没有日志条数，则跳过
            }
    
            totalCount += logCount; // 更新总日志条数
    
            var score = 0; // 当前时间点的积分数
            for (var j = 0; j <= i; j++) {
                if (totalCount > 100 && i === j) {
                    // 如果总日志条数超过100，并且当前时间点是最后一个时间点
                    score += logCount - (totalCount - 100); // 计算得分
                } else {
                    score += parseInt(logs[j]) - (i - j) * parseInt(logs[j]); // 计算得分
                }
            }
    
            if (score > maxScore) {
                maxScore = score; // 更新最大积分数
            }
    
            if (totalCount >= 100) {
                break; // 如果总日志条数达到100条以上，则退出循环
            }
        }
    
        console.log(maxScore); // 输出最大积分数
    
        rl.close();
    });
    
    

## C++

    
    
    #include <iostream>  // 包含输入输出流库
    #include <vector>    // 包含向量容器库
    using namespace std;
    
    int main() {
        string input;
        getline(cin, input);  // 从标准输入读取整行数据
        vector<string> logs;  // 用于存储日志条数的字符串向量
        string temp = "";     // 临时字符串变量，用于逐字符拼接日志条数
        for (int i = 0; i < input.length(); i++) {  // 遍历输入的每一个字符
            if (input[i] == ' ') {  // 遇到空格时，表示一个日志条数的结束
                logs.push_back(temp);  // 将当前拼接的字符串加入日志向量
                temp = "";  // 重置临时字符串变量
            } else {
                temp += input[i];  // 拼接字符
            }
        }
        logs.push_back(temp);  // 将最后一个日志条数加入日志向量
    
        int totalCount = 0;  // 累计日志总条数
        int maxScore = 0;    // 记录最大积分数
        for (int i = 0; i < logs.size(); i++) {  // 遍历每个时间点的日志
            int logCount = stoi(logs[i]);  // 将当前日志条数从字符串转换为整数
            if (logCount == 0) {  // 如果当前时间点日志条数为0，跳过该时间点
                continue;
            }
    
            totalCount += logCount;  // 累加日志总条数
    
            int score = 0;  // 当前时间点的积分
            for (int j = 0; j <= i; j++) {  // 计算当前时间点的积分
                if (totalCount > 100 && i == j) {  // 如果总日志条数超过100且当前为最后一个时间点
                    score += logCount - (totalCount - 100);  // 计算积分，考虑超出100条的部分
                } else {
                    score += stoi(logs[j]) - (i - j) * stoi(logs[j]);  // 正常积分计算，考虑延迟扣分
                }
            }
    
            if (score > maxScore) {  // 更新最大积分数
                maxScore = score;
            }
    
            if (totalCount >= 100) {  // 如果总日志条数达到或超过100，提前结束循环
                break;
            }
        }
    
        cout << maxScore << endl;  // 输出最大积分数
    
        return 0;
    }
    

## C语言

    
    
    #include <stdio.h>    
    #include <string.h>  
    #include <stdlib.h> 
    
    int main() {
        char input[1000];  // 定义一个字符数组用于存储输入
        fgets(input, 1000, stdin);  // 从标准输入读取一行数据
    
        char logs[100][10];  // 定义一个二维字符数组存储日志条数，每条日志最长为10个字符
        int logCount = 0;    // 日志条数计数器
        char *token = strtok(input, " ");  // 使用空格分割输入字符串，获取第一个日志条数
    
        while (token != NULL) {  // 逐个分割字符串，直到没有更多的分割部分
            strcpy(logs[logCount], token);  // 将当前日志条数复制到日志数组中
            logCount++;  // 增加日志条数计数
            token = strtok(NULL, " ");  // 获取下一个日志条数
        }
    
        int totalCount = 0;  // 累积日志总条数
        int maxScore = 0;    // 记录最大积分数
        for (int i = 0; i < logCount; i++) {  // 遍历每个时间点的日志
            int logNum = atoi(logs[i]);  // 将当前日志条数从字符串转换为整数
            if (logNum == 0) {  // 如果当前时间点日志条数为0，跳过该时间点
                continue;
            }
    
            totalCount += logNum;  // 累加日志总条数
    
            int score = 0;  // 当前时间点的积分
            for (int j = 0; j <= i; j++) {  // 计算当前时间点的积分
                int logAtJ = atoi(logs[j]);  // 将日志条数从字符串转换为整数
                if (totalCount > 100 && i == j) {  // 如果总日志条数超过100且当前为最后一个时间点
                    score += logNum - (totalCount - 100);  // 计算积分，考虑超出100条的部分
                } else {
                    score += logAtJ - (i - j) * logAtJ;  // 正常积分计算，考虑延迟扣分
                }
            }
    
            if (score > maxScore) {  // 更新最大积分数
                maxScore = score;
            }
    
            if (totalCount >= 100) {  // 如果总日志条数达到或超过100，提前结束循环
                break;
            }
        }
    
        printf("%d\n", maxScore);  // 输出最大积分数
    
        return 0;
    }
    

![fengmian](https://i-blog.csdnimg.cn/blog_migrate/9b5c790a7db934fee4c21e0b5b2e2334.png)

