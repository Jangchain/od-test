## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

你有 n 台机器，编号为 1~n，每台都需要完成一项工作，机器经过配置后都能完成独立完成一项工作。

假设第 i 台机器你需要花 B 分钟进行设置，然后开始运行，J 分钟后完成任务。

现在，你需要选择布置工作的顺序，使得用最短的时间完成所有工作。

注意，不能同时对两台进行配置，但配置完成的机器们可以同时执行他们各自的工作。

## 输入描述

第一行输入代表总共有 M 组任务数据（1<M<=10）。

每组数第一行为一个整数指定机器的数量 N（0<N<=1000）。

随后的 N 行每行两个整数，第一个表示 B（0<=B<=10000），第二个表示 J（0<=J<=10000）。

每组数据连续输入，不会用空行分隔。各组任务单独计时。

## 输出描述

对于每组任务，输出最短完成时间，且每组的结果独占一行。例如，两组任务就应该有两行输出。

## 示例1

输入

    
    
    1
    1
    2 2
    

输出

    
    
    4
    

说明

> 输入共3行数据，  
>  第一行代表只有1组任务；  
>  第二行代表本组任务只有1台机器；  
>  第三行代表本机器：配置需要2分钟，执行任务需要2分钟，  
>  输出共一行数据，代表执行结果为4分钟

## 示例2

输入

    
    
    2
    2
    1 1
    2 2
    3
    1 1
    2 2
    3 3
    

输出

    
    
    4
    7
    

说明

> 第1行 2代表有2组任务；  
>  2~4行代表第1组数据，为2台机器的配置、执行信息  
>  第1台：配置1分钟，执行1分钟  
>  第2台：配置2分钟，执行2分钟  
>  5~8行代表第2组数据，为3台机器的配置、执行信息  
>  第1台：配置1分钟，执行1分钟  
>  第2台：配置2分钟，执行2分钟  
>  第3台：配置3分钟，执行3分钟
>
> 输出共2行，分别代表第1组任务共需要4分钟和第2组任务共需要7分钟  
>  先配置3，再配置2，再配置1，执行1分钟，共7分钟

## 解题思路

  1. **机器的配置和执行** ：

     * 每台机器需要先花费 B 分钟配置，配置完成后再花费 J 分钟执行任务。
     * 机器的配置是串行的，即在某一时刻只能配置一台机器，但已配置完成的机器可以同时执行任务。
  2. **求最短完成时间** ：

     * 需要找到一个机器的配置顺序，使得所有机器完成任务的总时间最短。
  3. **优化策略** ：

     * 将执行时间较长的机器优先配置。这样可以尽早开始长时间的任务执行，从而减少整体的等待时间。
     * 具体操作：将机器按执行时间（J）从高到低排序，再按顺序配置每台机器。

## Java

    
    
    import java.util.Arrays;
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            Scanner sc = new Scanner(System.in);
    
            // 读取测试用例数量
            int testCases = sc.nextInt();
            StringBuilder result = new StringBuilder();
    
            // 遍历每组任务
            for (int t = 0; t < testCases; t++) {
                // 读取当前任务组的机器数量
                int machineCount = sc.nextInt();
    
                if (machineCount == 0) {
                    // 如果没有机器，直接输出 0
                    result.append(0).append("\n");
                    continue;
                }
    
                // 初始化机器任务数组
                int[][] machineTasks = new int[machineCount][2];
                for (int i = 0; i < machineCount; i++) {
                    machineTasks[i][0] = sc.nextInt(); // 配置时间
                    machineTasks[i][1] = sc.nextInt(); // 运行时间
                }
    
                // 根据运行时间降序排序
                Arrays.sort(machineTasks, (a, b) -> Integer.compare(b[1], a[1]));
    
                // 初始化时间变量
                int configEndTime = 0; // 当前配置结束时间
                int minCompletionTime = 0; // 最短完成时间
    
                // 遍历每台机器，计算完成时间
                for (int[] task : machineTasks) {
                    configEndTime += task[0]; // 配置结束时间累加配置时间
                    minCompletionTime = Math.max(minCompletionTime, configEndTime + task[1]);
                }
    
                // 记录结果
                result.append(minCompletionTime).append("\n");
            }
    
            // 输出所有结果
            System.out.print(result.toString());
        }
    }
    

## Python

    
    
    # 导入系统模块
    import sys
    
    # 读取输入
    input = sys.stdin.read
    data = input().split()
    
    # 读取测试用例数量
    test_cases = int(data[0])
    index = 1
    results = []
    
    # 遍历每组任务
    for _ in range(test_cases):
        # 读取当前任务组的机器数量
        machine_count = int(data[index])
        index += 1
    
        if machine_count == 0:
            # 如果没有机器，直接记录结果 0
            results.append("0")
            continue
    
        # 初始化机器任务列表
        machine_tasks = []
        for _ in range(machine_count):
            config_time = int(data[index])  # 配置时间
            run_time = int(data[index + 1]) # 运行时间
            machine_tasks.append((config_time, run_time))
            index += 2
    
        # 根据运行时间降序排序
        machine_tasks.sort(key=lambda x: x[1], reverse=True)
    
        # 初始化时间变量
        config_end_time = 0  # 当前配置结束时间
        min_completion_time = 0  # 最短完成时间
    
        # 遍历每台机器，计算完成时间
        for config_time, run_time in machine_tasks:
            config_end_time += config_time  # 配置结束时间累加配置时间
            min_completion_time = max(min_completion_time, config_end_time + run_time)
    
        # 记录结果
        results.append(str(min_completion_time))
    
    # 输出所有结果
    print("\n".join(results))
    

## JavaScript

    
    
    const readline = require('readline');
    
    // 创建接口实例
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    let input = [];
    
    rl.on('line', (line) => {
        input.push(line); // 将输入的每一行添加到输入数组中
    }).on('close', () => {
        const testCases = parseInt(input.shift()); // 获取测试用例数量
        const results = [];
    
        // 遍历每个测试用例
        for (let i = 0; i < testCases; i++) {
            const machines = parseInt(input.shift()); // 获取机器数量
            const tasks = [];
    
            // 收集每台机器的配置时间和运行时间
            for (let j = 0; j < machines; j++) {
                const [configTime, runTime] = input.shift().split(' ').map(Number);
                tasks.push([configTime, runTime]);
            }
    
            // 根据运行时间降序排序
            tasks.sort((a, b) => b[1] - a[1]);
    
            let configEndTime = 0; // 当前配置结束时间
            let minCompletionTime = 0; // 最短完成时间
    
            // 遍历每台机器，计算完成时间
            for (const [configTime, runTime] of tasks) {
                configEndTime += configTime; // 累加配置时间
                minCompletionTime = Math.max(minCompletionTime, configEndTime + runTime);
            }
    
            // 存储结果
            results.push(minCompletionTime);
        }
    
        // 输出所有结果
        console.log(results.join('\n'));
    });
    

## C++

    
    
    #include <iostream>
    #include <vector>
    #include <algorithm>
    
    using namespace std;
    
    int main() {
        int testCases;
        cin >> testCases;
    
        vector<int> results;
    
        // 遍历每组任务
        for (int t = 0; t < testCases; ++t) {
            int machineCount;
            cin >> machineCount;
    
            if (machineCount == 0) {
                // 如果没有机器，直接记录结果 0
                results.push_back(0);
                continue;
            }
    
            // 初始化机器任务数组
            vector<pair<int, int>> machineTasks(machineCount);
            for (int i = 0; i < machineCount; ++i) {
                int configTime, runTime;
                cin >> configTime >> runTime;
                machineTasks[i] = {configTime, runTime};
            }
    
            // 根据运行时间降序排序
            sort(machineTasks.begin(), machineTasks.end(), [](auto &a, auto &b) {
                return b.second < a.second;
            });
    
            // 初始化时间变量
            int configEndTime = 0;  // 当前配置结束时间
            int minCompletionTime = 0;  // 最短完成时间
    
            // 遍历每台机器，计算完成时间
            for (auto &task : machineTasks) {
                configEndTime += task.first;  // 配置结束时间累加配置时间
                minCompletionTime = max(minCompletionTime, configEndTime + task.second);
            }
    
            // 记录结果
            results.push_back(minCompletionTime);
        }
    
        // 输出所有结果
        for (int result : results) {
            cout << result << "\n";
        }
    
        return 0;
    }
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    
    // 比较函数，用于根据运行时间降序排序
    int compare(const void *a, const void *b) {
        int runTimeA = ((int *)b)[1];
        int runTimeB = ((int *)a)[1];
        return runTimeA - runTimeB;
    }
    
    int main() {
        int testCases;
        scanf("%d", &testCases);
    
        int results[testCases];
        int resultIndex = 0;
    
        // 遍历每组任务
        for (int t = 0; t < testCases; t++) {
            int machineCount;
            scanf("%d", &machineCount);
    
            if (machineCount == 0) {
                // 如果没有机器，直接记录结果 0
                results[resultIndex++] = 0;
                continue;
            }
    
            // 初始化机器任务数组
            int machineTasks[machineCount][2];
            for (int i = 0; i < machineCount; i++) {
                scanf("%d %d", &machineTasks[i][0], &machineTasks[i][1]);  // 配置时间和运行时间
            }
    
            // 根据运行时间降序排序
            qsort(machineTasks, machineCount, sizeof(machineTasks[0]), compare);
    
            // 初始化时间变量
            int configEndTime = 0;  // 当前配置结束时间
            int minCompletionTime = 0;  // 最短完成时间
    
            // 遍历每台机器，计算完成时间
            for (int i = 0; i < machineCount; i++) {
                configEndTime += machineTasks[i][0];  // 配置结束时间累加配置时间
                int completionTime = configEndTime + machineTasks[i][1];
                if (completionTime > minCompletionTime) {
                    minCompletionTime = completionTime;
                }
            }
    
            // 记录结果
            results[resultIndex++] = minCompletionTime;
        }
    
        // 输出所有结果
        for (int i = 0; i < resultIndex; i++) {
            printf("%d\n", results[i]);
        }
    
        return 0;
    }
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b37b85819e80cc269f260e8ea13882f5.png)

#### 完整用例

##### 用例1

    
    
    1
    1
    2 2
    

##### 用例2

    
    
    2
    2
    1 1
    2 2
    3
    1 1
    2 2
    3 3
    

##### 用例3

    
    
    1
    3
    1 6
    2 5
    3 4
    

##### 用例4

    
    
    1
    4
    4 8
    3 7
    2 6
    1 5
    

##### 用例5

    
    
    1
    3
    5 10
    4 8
    3 6
    

##### 用例6

    
    
    1
    5
    1 10
    2 9
    3 8
    4 7
    5 6
    

##### 用例7

    
    
    1
    2
    10 20
    5 15
    

##### 用例8

    
    
    1
    3
    6 12
    4 8
    2 4
    

##### 用例9

    
    
    1
    4
    8 16
    6 12
    4 8
    2 4
    

##### 用例10

    
    
    1
    5
    10 20
    8 16
    6 12
    4 8
    2 4
    

