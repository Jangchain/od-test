## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

公司创新实验室正在研究如何最小化资源成本，最大化资源利用率，请你设计算法帮他们解决一个任务混部问题：

有taskNum项任务，每个任务有开始时间（startTime），结束时间（endTime），并行度（parallelism）三个属性，

并行度是指这个任务运行时将会占用的[服务器](https://so.csdn.net/so/search?q=%E6%9C%8D%E5%8A%A1%E5%99%A8&spm=1001.2101.3001.7020)数量，一个服务器在每个时刻可以被任意任务使用但最多被一个任务占用，任务运行完成立即释放（结束时刻不占用）。

任务混部问题是指给定一批任务，让这批任务由同一批服务器承载运行，

请你计算完成这批任务混部最少需要多少服务器，从而最大化控制资源成本。

## 输入描述

第一行输入为taskNum，表示有taskNum项任务  
接下来taskNum行，每行三个整数，表示每个任务的

开始时间（startTime ），结束时间（endTime ），并行度（parallelism）

##### 备注

  * `1 <= taskNum <= 100000`
  * `0 <= startTime < endTime <= 50000`
  * `1 <= parallelism <= 100`

## 输出描述

一个整数，表示最少需要的服务器数量

## 示例1

输入

    
    
    3
    2 3 1
    6 9 2
    0 5 1
    

输出

    
    
    2
    

说明

> 一共有三个任务，
>
> 第一个任务在时间区间[2, 3]运行，占用1个服务器，  
>  第二个任务在时间区间[6, 9]运行，占用2个服务器，  
>  第三个任务在时间区间[0, 5]运行，占用1个服务器，  
>  需要最多服务器的时间区间为[2, 3]和[6, 9]，需要2个服务器。

## 示例2

输入

    
    
    2
    3 9 2
    4 7 3
    

输出

    
    
    5
    

说明

> 一共两个任务，
>
> 第一个任务在时间区间[3, 9]运行，占用2个服务器，  
>  第二个任务在时间区间[4, 7]运行，占用3个服务器，  
>  需要最多服务器的时间区间为[4, 7]，需要5个服务器。

## 解题思路

公司希望在完成任务的同时尽可能节省服务器资源。每个任务有三项属性：

  1. **开始时间 (startTime)** ：任务开始运行的时刻。
  2. **结束时间 (endTime)** ：任务停止运行的时刻（任务结束时不再占用资源）。
  3. **并行度 (parallelism)** ：任务运行时所需的服务器数量。

题目要求找出在任务运行的某一时刻服务器需求量的峰值，即所有任务运行过程中需要的最少服务器数量。

#### 分析：

  * 我们有`taskNum`项任务。每个任务在其指定的时间区间内占用一定数量的服务器。
  * 要完成所有任务，整个过程中需要的服务器数量取决于各任务的重叠情况。服务器需求量最大的那个时刻决定了最小需要的服务器数量。

#### 解题思路：

利用扫描线算法（差分数组或事件驱动法）求解各时间点的服务器需求量并找出最高峰。

## Java

    
    
    import java.util.Scanner;
    import java.util.ArrayList;
    import java.util.Collections;
    import java.util.List;
    
    class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            int taskNum = Integer.parseInt(scanner.nextLine().trim());
            List<int[]> events = new ArrayList<>();
    
            // 读取输入，并创建开始和结束的事件
            for (int i = 0; i < taskNum; i++) {
                String[] task = scanner.nextLine().split(" ");
                int start = Integer.parseInt(task[0]);
                int end = Integer.parseInt(task[1]);
                int parallelism = Integer.parseInt(task[2]);
                
                // 添加开始事件 (增加服务器需求)
                events.add(new int[]{start, parallelism});
                // 添加结束事件 (减少服务器需求)
                events.add(new int[]{end, -parallelism});
            }
    
            // 按时间排序，若时间相同，先处理增加服务器的事件
            Collections.sort(events, (a, b) -> a[0] == b[0] ? b[1] - a[1] : a[0] - b[0]);
    
            int maxServers = 0, currentServers = 0;
            // 处理每一个事件
            for (int[] event : events) {
                currentServers += event[1];
                maxServers = Math.max(maxServers, currentServers);
            }
    
            System.out.println(maxServers);
        }
    }
    

## Python

    
    
    # 导入 sys 模块以便读取输入
    import sys
    
    # 读取任务数量
    task_num = int(sys.stdin.readline().strip())
    events = []
    
    # 读取每个任务，并创建开始和结束的事件
    for _ in range(task_num):
        # 读取一行输入并分割为三个值
        start, end, parallelism = map(int, sys.stdin.readline().strip().split())
        
        # 添加开始事件 (增加服务器需求)
        events.append((start, parallelism))
        # 添加结束事件 (减少服务器需求)
        events.append((end, -parallelism))
    
    # 按时间排序，若时间相同，优先处理增加服务器的事件
    events.sort(key=lambda x: (x[0], -x[1]))
    
    max_servers = 0  # 记录最大服务器需求
    current_servers = 0  # 当前的服务器需求量
    
    # 处理每个事件
    for time, change in events:
        current_servers += change  # 更新当前的服务器需求
        max_servers = max(max_servers, current_servers)  # 更新最大需求
    
    # 输出最终所需的最大服务器数量
    print(max_servers)
    

## JavaScript

    
    
    // 读取输入
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    let input = [];
    rl.on('line', (line) => input.push(line));
    rl.on('close', () => {
        // 读取任务数量
        const taskNum = parseInt(input[0].trim());
        let events = [];
    
        // 读取每个任务，创建开始和结束事件
        for (let i = 1; i <= taskNum; i++) {
            let [start, end, parallelism] = input[i].trim().split(' ').map(Number);
            
            // 添加开始事件 (增加服务器需求)
            events.push([start, parallelism]);
            // 添加结束事件 (减少服务器需求)
            events.push([end, -parallelism]);
        }
    
        // 按时间排序，如果时间相同，优先处理增加服务器的事件
        events.sort((a, b) => a[0] === b[0] ? b[1] - a[1] : a[0] - b[0]);
    
        let maxServers = 0; // 最大服务器需求
        let currentServers = 0; // 当前服务器需求
    
        // 处理每个事件
        for (let [time, change] of events) {
            currentServers += change; // 更新当前服务器需求
            maxServers = Math.max(maxServers, currentServers); // 更新最大需求
        }
    
        // 输出最大服务器数量
        console.log(maxServers);
    });
    

## C++

    
    
    #include <iostream>
    #include <vector>
    #include <algorithm>
    using namespace std;
    
    int main() {
        int taskNum;
        cin >> taskNum; // 读取任务数量
        vector<pair<int, int>> events;
    
        // 读取每个任务，创建开始和结束事件
        for (int i = 0; i < taskNum; ++i) {
            int start, end, parallelism;
            cin >> start >> end >> parallelism;
    
            // 添加开始事件 (增加服务器需求)
            events.push_back({start, parallelism});
            // 添加结束事件 (减少服务器需求)
            events.push_back({end, -parallelism});
        }
    
        // 按时间排序，如果时间相同，优先处理增加服务器的事件
        sort(events.begin(), events.end(), [](const pair<int, int>& a, const pair<int, int>& b) {
            return a.first == b.first ? a.second > b.second : a.first < b.first;
        });
    
        int maxServers = 0; // 最大服务器需求
        int currentServers = 0; // 当前服务器需求
    
        // 处理每个事件
        for (auto& event : events) {
            currentServers += event.second; // 更新当前服务器需求
            maxServers = max(maxServers, currentServers); // 更新最大需求
        }
    
        // 输出最大服务器数量
        cout << maxServers << endl;
    
        return 0;
    }
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    
    typedef struct {
        int time;
        int change;
    } Event;
    
    // 比较函数，用于按时间排序事件，若时间相同则先处理增加服务器事件
    int compare(const void* a, const void* b) {
        Event* ea = (Event*)a;
        Event* eb = (Event*)b;
        if (ea->time == eb->time)
            return eb->change - ea->change;
        return ea->time - eb->time;
    }
    
    int main() {
        int taskNum;
        scanf("%d", &taskNum); // 读取任务数量
        Event events[taskNum * 2]; // 每个任务包含两个事件，开始和结束
    
        // 读取每个任务并创建事件
        for (int i = 0; i < taskNum; i++) {
            int start, end, parallelism;
            scanf("%d %d %d", &start, &end, &parallelism);
    
            // 添加开始事件 (增加服务器需求)
            events[i * 2].time = start;
            events[i * 2].change = parallelism;
    
            // 添加结束事件 (减少服务器需求)
            events[i * 2 + 1].time = end;
            events[i * 2 + 1].change = -parallelism;
        }
    
        // 对所有事件按时间排序
        qsort(events, taskNum * 2, sizeof(Event), compare);
    
        int maxServers = 0; // 记录最大服务器需求
        int currentServers = 0; // 当前的服务器需求
    
        // 处理每个事件
        for (int i = 0; i < taskNum * 2; i++) {
            currentServers += events[i].change; // 更新当前服务器需求
            if (currentServers > maxServers) {
                maxServers = currentServers; // 更新最大需求
            }
        }
    
        // 输出最大服务器数量
        printf("%d\n", maxServers);
    
        return 0;
    }
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/cbc09e5164cea8bd60bca7b299fbc985.png)

