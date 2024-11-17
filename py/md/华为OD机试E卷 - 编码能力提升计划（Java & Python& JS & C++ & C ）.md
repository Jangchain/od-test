## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

为了提升软件编码能力，小王制定了刷题计划，他选了题库中的n道题，编号从0到n-1，并计划在m天内按照题目编号顺序刷完所有的题目（注意，小王不能用多天完成同一题）。

在小王刷题计划中，小王需要用tme[i]的时间完成编号 i 的题目。

此外，小王还可以查看答案，可以省去该题的做题时间。为了真正达到刷题效果，小王每天最多直接看一次答案。

我们定义m天中做题时间最多的一天耗时为T（直接看答案的题目不计入做题总时间)。

请你帮小王求出最小的T是多少。

​

## 输入描述

第一行输入为time，time[i]的时间完成编号 i 的题目

第二行输入为m，m表示几天内完成所有题目，1 ≤ m ≤ 180

## 输出描述

最小耗时整数T

## 示例1

输入

    
    
    999,999,999
    4
    

输出

    
    
    0
    

说明

> 在前三天中，小王每天都直接看答案，这样他可以在三天内完成所有的题目并不花任何时间

## 示例2

输入

    
    
    1,2,2,3,5,4,6,7,8
    5
    

输出

    
    
    4
    

说明

> 第一天完成前3题，第3题看答案;  
>  第二天完成第4题和第5题，第5题看答案；  
>  第三天完成第6和第7题，第7提看答案;  
>  第四天完成第8题，直接看答案:  
>  第五天完成第9题，直接看答案

## 解题思路

#### 解释

在示例2中，输入如下：

    
    
    1,2,2,3,5,4,6,7,8
    5
    

这意味着小王有9道题目，每道题目的完成时间分别是1, 2, 2, 3, 5, 4, 6, 7,
8，且他需要在5天内完成这些题目。目标是使得这5天中最繁忙的一天（耗时最长的一天）的耗时T尽可能小。

##### 解释如何安排：

  1. **第一天** ：

     * 完成题目0 (1分钟), 题目1 (2分钟) 和题目2 (2分钟)。
     * 可选择题目2作为查看**的题目，因为它不是最耗时的。
     * 实际耗时：1 + 2 = 3分钟
  2. **第二天** ：

     * 完成题目3 (3分钟) 和题目4 (5分钟)。
     * 可选择题目4作为查看**的题目，因为它是这两题中较耗时的。
     * 实际耗时：3分钟
  3. **第三天** ：

     * 完成题目5 (4分钟) 和题目6 (6分钟)。
     * 可选择题目6作为查看**的题目，因为它是这两题中较耗时的。
     * 实际耗时：4分钟
  4. **第四天** ：

     * 只完成题目7 (7分钟)。
     * 选择查看**的题目。
     * 实际耗时：0分钟
  5. **第五天** ：

     * 只完成题目8 (8分钟)。
     * 选择查看**的题目。
     * 实际耗时：0分钟

#### 解题思路

这个问题可以通过**二分搜索** 和**贪心策略** 来解决。我们要找的是最小的最大单日工作时间 T，可以通过以下步骤来寻找：

  1. **初始化二分搜索的边界** ：

     * `low = 0`（理论上的最低耗时，假设每天都能看答案）。
     * `high = sum(times) - max(times)`（如果最耗时的题目使用了看答案的机会，剩余的总时间是理论上的最高耗时）。
  2. **二分搜索过程** ：

     * 计算中点 `mid` 作为假设的最大单日工作时间。
     * 使用贪心策略模拟小王的刷题过程，看是否可以在 m 天内完成所有题目，且每天的工作时间不超过 `mid`。
     * 维护当前累计的工作时间 `currentSum` 和当前天数 `currentDay`。
     * 遍历题目数组 `times`，对于每一题： 
       * 尝试添加到当前天的工作时间。
       * 如果加上这题的时间后超过了 `mid`，使用看答案机会（如果当天还未使用），然后尝试将这题放入下一天。
       * 如果当天已使用看答案机会，需要新开一天，并重置当前天的时间累计和看答案机会。
     * 检查在假设的最大单日工作时间 `mid` 下，是否能在 m 天内完成所有题目。
  3. **调整搜索范围** ：

     * 如果可以完成，说明 `mid` 可能还不是最小的，尝试减小 `high`。
     * 如果不可以完成，增加 `low`。
  4. **输出结果** ：

     * 当 `low` 超过 `high`，循环结束，此时 `low` 将是满足条件的最小的最大单日工作时间 T。

这个方法结合了二分搜索的高效查找和贪心策略的局部最优解法，能够有效找到解决问题的最小 T 值。

## Java

    
    
    import java.util.Arrays;
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            // 创建扫描器对象，用于获取用户输入
            Scanner sc = new Scanner(System.in);
    
            // 读取一行输入，分割字符串并转换为整数数组，表示每项任务所需的时间
            int[] times = Arrays.stream(sc.nextLine().split(",")).mapToInt(Integer::parseInt).toArray();
            // 读取下一行输入，转换为整数，表示最大允许的天数
            int maxDays = Integer.parseInt(sc.nextLine());
    
            // 初始化总时间和最大单个时间
            int totalTime = 0;
            int maxTime = 0;
            // 遍历时间数组，计算总时间和最大时间
            for (int time : times) {
                totalTime += time;
                maxTime = Math.max(time, maxTime);
            }
    
            // 初始化二分搜索的范围
            int low = 0;
            int high = totalTime - maxTime;
    
            // 使用二分搜索确定最小的可行时间限制
            while (low <= high) {
                int mid = (low + high) >> 1; // 计算中点
                int currentSum = 0; // 当前段的时间总和
                boolean canAdjust = true; // 标记是否可以调整当前任务到前一天
                int currentDay = 1; // 当前天数计数
                int i = 0; // 时间数组的索引
    
                // 遍历时间数组，试图按照每天不超过 mid 的限制来分配任务
                while (i < times.length) {
                    currentSum += times[i];
    
                    if (currentSum > mid) {
                        if (canAdjust) {
                            // 如果当前和超过了 mid，尝试不计入当前任务，继续下一任务
                            currentSum -= times[i];
                            canAdjust = false; // 标记当天已经进行过调整
                            i++;
                        } else {
                            // 如果不能再调整，增加天数，重置当前和和调整标记
                            currentDay++;
                            if (currentDay > maxDays) {
                                // 如果天数超过最大允许值，中断内部循环
                                break;
                            }
                            currentSum = 0;
                            canAdjust = true;
                        }
                    } else {
                        // 如果当前和未超过 mid，继续累加下一个任务
                        i++;
                    }
                }
    
                // 判断是否所有任务都能在 maxDays 天内完成
                if (i == times.length && currentDay <= maxDays) {
                    // 如果可以，尝试更小的 mid
                    high = mid - 1;
                } else {
                    // 如果不可以，尝试更大的 mid
                    low = mid + 1;
                }
            }
    
            // 输出找到的最小的满足条件的最大每日工作时间
            System.out.println(low);
        }
    }
    
    

## Python

    
    
    # 读取一行输入，分割字符串并转换为整数列表，表示每项任务所需的时间
    times = list(map(int, input().split(',')))
    
    # 读取并转换为整数，表示最大允许的天数
    max_days = int(input())
    
    
    # 初始化总时间和最大单个时间
    total_time = sum(times)
    max_time = max(times)
    
    # 初始化二分搜索的范围
    low = 0
    high = total_time - max_time
    
    # 使用二分搜索确定最小的可行时间限制
    while low <= high:
        mid = (low + high) >> 1  # 计算中点
        current_sum = 0  # 当前段的时间总和
        can_adjust = True  # 标记是否可以调整当前任务到前一天
        current_day = 1  # 当前天数计数
        i = 0  # 时间数组的索引
    
        # 遍历时间数组，试图按照每天不超过 mid 的限制来分配任务
        while i < len(times):
            current_sum += times[i]
    
            if current_sum > mid:
                if can_adjust:
                    # 如果当前和超过了 mid，尝试不计入当前任务，继续下一任务
                    current_sum -= times[i]
                    can_adjust = False  # 标记当天已经进行过调整
                    i += 1
                else:
                    # 如果不能再调整，增加天数，重置当前和和调整标记
                    current_day += 1
                    if current_day > max_days:
                        # 如果天数超过最大允许值，中断内部循环
                        break
                    current_sum = 0
                    can_adjust = True
            else:
                # 如果当前和未超过 mid，继续累加下一个任务
                i += 1
    
        # 判断是否所有任务都能在 max_days 天内完成
        if i == len(times) and current_day <= max_days:
            # 如果可以，尝试更小的 mid
            high = mid - 1
        else:
            # 如果不可以，尝试更大的 mid
            low = mid + 1
    
    # 输出找到的最小的满足条件的最大每日工作时间
    print(low)
    
     
    

## JavaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    rl.on('line', (inputTimes) => {
        let times = inputTimes.split(',').map(Number);  // 将输入字符串按逗号分割并转为整数数组
     
    
        rl.on('line', (inputMaxDays) => {
            let maxDays = parseInt(inputMaxDays);  // 将输入的最大天数转换为整数
     
    
            // 初始化总时间和最大单个时间
            let totalTime = times.reduce((a, b) => a + b, 0);  // 计算所有任务的总时间
            let maxTime = Math.max(...times);  // 计算任务所需的最大时间
    
            // 初始化二分搜索的范围
            let low = 0;
            let high = totalTime - maxTime;
    
            // 二分搜索，找到最小的最大日耗时
            while (low <= high) {
                let mid = Math.floor((low + high) / 2);  // 计算中点
                let currentSum = 0;  // 当前时间段的总和
                let canAdjust = true;  // 是否可以调整任务到前一天
                let currentDay = 1;  // 当前使用的天数计数
                let i = 0;  // 数组索引
    
                // 分配任务，确保每天不超过 mid 的限制
                while (i < times.length) {
                    currentSum += times[i];
    
                    if (currentSum > mid) {
                        if (canAdjust) {
                            // 如果超过了 mid，尝试不计入当前任务
                            currentSum -= times[i];
                            canAdjust = false;  // 当天已进行过调整
                            i++;
                        } else {
                            // 需要增加天数
                            currentDay++;
                            if (currentDay > maxDays) break;  // 天数超出最大允许值时退出
                            currentSum = 0;
                            canAdjust = true;  // 重置调整标记
                        }
                    } else {
                        i++;  // 继续累加下一个任务
                    }
                }
    
                // 判断是否可以在 maxDays 天内完成
                if (i == times.length && currentDay <= maxDays) {
                    high = mid - 1;  // 可以完成，尝试更小的 mid
                } else {
                    low = mid + 1;  // 不能完成，尝试更大的 mid
                }
            }
    
            // 输出找到的最小最大日耗时
            console.log(low);
            rl.close();
        });
    });
    
    
    

## C++

    
    
    #include <iostream>
    #include <vector>
    #include <sstream>
    #include <algorithm>
    
    using namespace std;
    
    // 主函数
    int main() {
        string input;
        
        // 读取第一行输入，表示任务时间列表
         
        getline(cin, input);
        stringstream ss(input);
        string temp;
        vector<int> times;
    
        // 将输入字符串按逗号分割并转换为整数列表
        while (getline(ss, temp, ',')) {
            times.push_back(stoi(temp));
        }
    
       
        int max_days;
        cin >> max_days;  // 读取最大天数
      
    
        // 计算总时间和最大单个任务时间
        int total_time = 0, max_time = 0;
        for (int time : times) {
            total_time += time;
            max_time = max(max_time, time);
        }
    
        // 初始化二分搜索的范围
        int low = 0, high = total_time - max_time;
    
        // 二分搜索确定最小的可行时间
        while (low <= high) {
            int mid = (low + high) / 2;  // 计算中间值
            int current_sum = 0;  // 当前段的时间和
            bool can_adjust = true;  // 是否可以调整任务到前一天
            int current_day = 1;  // 当前天数
            int i = 0;  // 任务索引
    
            // 遍历任务时间数组
            while (i < times.size()) {
                current_sum += times[i];
    
                if (current_sum > mid) {
                    if (can_adjust) {
                        // 超出 mid 时尝试调整
                        current_sum -= times[i];
                        can_adjust = false;  // 当天已调整
                        i++;
                    } else {
                        // 增加一天
                        current_day++;
                        if (current_day > max_days) break;  // 如果超出天数限制则退出
                        current_sum = 0;
                        can_adjust = true;  // 重置调整标志
                    }
                } else {
                    i++;  // 未超出限制则继续
                }
            }
    
            // 判断是否可以在 max_days 内完成任务
            if (i == times.size() && current_day <= max_days) {
                high = mid - 1;  // 尝试更小的 mid
            } else {
                low = mid + 1;  // 尝试更大的 mid
            }
        }
    
        // 输出最小最大日耗时
        cout << low << endl;
        return 0;
    }
    
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    #include <string.h>
    
    // 辅助函数，将输入字符串分割为整数数组
    void split(char *input, int *times, int *len) {
        char *token = strtok(input, ",");
        while (token != NULL) {
            times[(*len)++] = atoi(token);  // 将字符串转换为整数并存储
            token = strtok(NULL, ",");
        }
    }
    
    int main() {
        char input[1000];
        int times[100], len = 0;
    
        // 读取第一行输入，表示任务时间列表
     
        fgets(input, sizeof(input), stdin);
        input[strlen(input) - 1] = '\0';  // 去掉换行符
        split(input, times, &len);  // 将输入的字符串分割为整数数组
    
        // 读取第二行输入，表示最大允许天数
        int max_days;
        
        scanf("%d", &max_days);
    
        // 初始化总时间和最大单个时间
        int total_time = 0, max_time = 0;
        for (int i = 0; i < len; i++) {
            total_time += times[i];
            if (times[i] > max_time) max_time = times[i];  // 计算最大任务时间
        }
    
        // 初始化二分搜索的范围
        int low = 0, high = total_time - max_time;
    
        // 二分搜索，找到最小的最大日耗时
        while (low <= high) {
            int mid = (low + high) / 2;
            int current_sum = 0, current_day = 1, can_adjust = 1;
            int i = 0;
    
            // 遍历任务时间数组，进行分配
            while (i < len) {
                current_sum += times[i];
                if (current_sum > mid) {
                    if (can_adjust) {
                        current_sum -= times[i];
                        can_adjust = 0;
                        i++;
                    } else {
                        current_day++;
                        if (current_day > max_days) break;
                        current_sum = 0;
                        can_adjust = 1;
                    }
                } else {
                    i++;
                }
            }
    
            // 判断是否可以在 max_days 内完成任务
            if (i == len && current_day <= max_days) {
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
    
        // 输出最小最大日耗时
        printf("%d\n", low);
        return 0;
    }
    
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

