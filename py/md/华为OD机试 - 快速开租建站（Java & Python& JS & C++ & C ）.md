## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

当前IT部门支撑了子公司颗粒化业务，该部门需要实现为子公司快速开租建站的能力，建站是指在一个全新的环境部署一套IT服务。

  * 每个站点开站会由一系列部署任务项构成，每个任务项部署完成时间都是固定和相等的，设为1。
  * 部署任务项之间可能存在依赖，假如任务2依赖任务1，那么等任务1部署完，任务2才能部署。
  * 任务有多个依赖任务则需要等所有依赖任务都部署完该任务才能部署。
  * 没有依赖的任务可以并行部署，优秀的员工们会做到完全并行无等待的部署。

给定一个站点部署任务项和它们之间的依赖关系，请给出一个站点的最短开站时间。

## 输入描述

第一行是任务数taskNum,第二行是任务的依赖关系数relationsNum

接下来 relationsNum 行，每行包含两个id，描述一个依赖关系，格式为：IDi IDj，表示部署任务i部署完成了，部署任务j才能部署，IDi 和
IDj 值的范围为：[0, taskNum)

注：输入保证部署任务之间的依赖不会存在环。

#### 备注

  * 1 ＜ taskNum ≤ 100
  * 1 ≤ relationsNum ≤ 5000

## 输出描述

一个整数，表示一个站点的最短开站时间。

## 示例1

输入

    
    
    5
    5
    0 4
    1 2
    1 3
    2 3
    2 4
    

输出

    
    
    3
    

说明

> 有5个部署任务项，3个依赖关系。我们可以先同时部署任务项0和任务项1，然后部署任务项2，最后同时部署任务型3和任务型4.最短开战时间为3。

## 示例2

输入

    
    
    5
    3
    0 3
    0 4
    1 3
    

输出

    
    
    2
    

> 有5个部署任务项，3个依赖关系。我们可以先同时部署任务型0，任务型1，任务项2。然后再同时部署任务型4.最短开站时间为2。

## 解题思路

题目要求是计算完成所有部署任务所需的最短时间。每个任务的部署时间是1个单位时间，但任务之间有依赖关系。只有在依赖的任务完成后，后续任务才能开始。因此，任务的顺序和是否能并行部署需要考虑任务之间的依赖关系。

#### 题意解析

  * **任务数 (`taskNum`)**: 表示需要部署的任务总数，范围为 [0, `taskNum` \- 1]。
  * **依赖关系数 (`relationsNum`)**: 描述任务之间的依赖关系的数量。
  * 每个依赖关系由两个任务编号 `IDi IDj` 表示，表示 `IDi` 必须在 `IDj` 之前完成。
  * **目标** : 找出完成所有任务的最短时间。

#### 问题的特点

  * 任务之间的依赖关系构成一个**有向无环图 (DAG)** 。
  * 需要找到DAG的**拓扑排序** ，并基于拓扑排序计算任务的最早完成时间。
  * 可以并行部署没有相互依赖的任务。

#### 示例分析

##### 示例1

**输入** :

    
    
    5
    5
    0 4
    1 2
    1 3
    2 3
    2 4
    

**解释** :

  * 任务0和任务1可以在第1个单位时间内同时部署（没有依赖）。
  * 任务2必须等任务1完成后在第2个单位时间进行部署。
  * 任务3依赖任务1和任务2，在第3个单位时间部署。
  * 任务4依赖任务0和任务2，也在第3个单位时间部署。

**输出** :

    
    
    3
    

##### 示例2

**输入** :

    
    
    5
    3
    0 3
    0 4
    1 3
    

**解释** :

  * 任务0、1和2可以在第1个单位时间同时部署。
  * 任务3依赖任务0和任务1，任务4依赖任务0，在第2个单位时间部署。

**输出** :

    
    
    2
    

#### 解题思路

  1. **建图** : 将任务及其依赖关系表示为图结构。

  2. **拓扑排序** : 使用拓扑排序算法找出任务的执行顺序。

## Java

    
    
    import java.util.*;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
    
            int taskNum = scanner.nextInt(); // 任务数量
            int relationsNum = scanner.nextInt(); // 任务之间的依赖关系数量
    
            int[][] relations = new int[relationsNum][2]; // 依赖关系数组
            for (int i = 0; i < relationsNum; i++) {
                relations[i][0] = scanner.nextInt(); // 前置任务
                relations[i][1] = scanner.nextInt(); // 后继任务
            }
    
            // 合并后的 getMinimumBuildTime 逻辑
            Map<Integer, List<Integer>> adjList = new HashMap<>(); // 任务的后继任务表
            int[] inDegrees = new int[taskNum]; // 每个任务的入度
            int[] taskTime = new int[taskNum]; // 每个任务的完成时间
    
            // 构建图的邻接表和入度数组
            for (int[] relation : relations) {
                int preTask = relation[0];
                int nextTask = relation[1];
    
                adjList.computeIfAbsent(preTask, k -> new ArrayList<>()).add(nextTask);
                inDegrees[nextTask]++;
            }
    
            Queue<Integer> queue = new LinkedList<>();
            
            // 初始化队列，将所有入度为0的任务入队，开始时间为1
            for (int i = 0; i < taskNum; i++) {
                if (inDegrees[i] == 0) {
                    queue.add(i);
                    taskTime[i] = 1; // 入度为0的任务最早时间为1
                }
            }
    
            int minBuildTime = 1;
    
            // 处理拓扑排序
            while (!queue.isEmpty()) {
                int task = queue.poll();
                int currentTime = taskTime[task];
    
                if (adjList.containsKey(task)) {
                    for (int nextTask : adjList.get(task)) {
                        inDegrees[nextTask]--;
    
                        // 更新后继任务的时间
                        taskTime[nextTask] = Math.max(taskTime[nextTask], currentTime + 1);
    
                        if (inDegrees[nextTask] == 0) {
                            queue.add(nextTask);
                        }
                    }
                }
    
                // 更新总时间为当前的最大完成时间
                minBuildTime = Math.max(minBuildTime, currentTime);
            }
    
            System.out.println(minBuildTime); // 输出最短建站时间
        }
    }
    

## Python

    
    
    from collections import defaultdict, deque
    
    # 读取输入的任务数量和依赖关系数量
    task_num = int(input())  # 任务数量
    relations_num = int(input())  # 依赖关系数量
    
    # 读取依赖关系
    relations = []
    for _ in range(relations_num):
        pre_task , next_task = list(map(int, input().split()))
        relations.append((pre_task, next_task))
    
    # 构建图的邻接表和入度数组
    adj_list = defaultdict(list)  # 任务的后继任务表
    in_degrees = [0] * task_num  # 每个任务的入度
    task_time = [0] * task_num  # 每个任务的完成时间
    
    for pre_task, next_task in relations:
        adj_list[pre_task].append(next_task)  # 添加后继任务
        in_degrees[next_task] += 1  # 增加后继任务的入度
    
    # 初始化队列，将所有入度为0的任务入队，开始时间为1
    queue = deque()
    for i in range(task_num):
        if in_degrees[i] == 0:
            queue.append(i)
            task_time[i] = 1  # 入度为0的任务最早时间为1
    
    min_build_time = 1
    
    # 处理拓扑排序
    while queue:
        task = queue.popleft()
        current_time = task_time[task]
    
        if task in adj_list:
            for next_task in adj_list[task]:
                in_degrees[next_task] -= 1  # 减少后继任务的入度
    
                # 更新后继任务的时间
                task_time[next_task] = max(task_time[next_task], current_time + 1)
    
                if in_degrees[next_task] == 0:
                    queue.append(next_task)
    
        # 更新总时间为当前的最大完成时间
        min_build_time = max(min_build_time, current_time)
    
    print(min_build_time)  # 输出最短建站时间
    

## JavaScript

    
    
    const readline = require("readline");
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    
    const inputLines = []; // 存储输入的所有行
    let taskNum, relationsNum; // 任务数和依赖关系数
    
    // 监听输入流的每一行
    rl.on("line", (line) => {
      inputLines.push(line);
    
      if (inputLines.length === 2) {
        // 获取任务数和依赖关系数
        taskNum = Number(inputLines[0]);
        relationsNum = Number(inputLines[1]);
      }
    
      if (relationsNum && inputLines.length === relationsNum + 2) {
        // 将依赖关系转换为二维数组
        const relations = inputLines.slice(2).map((line) =>
          line.split(" ").map(Number)
        );
        console.log(getMinBuildTime(relations, taskNum)); // 输出最短建站时间
        inputLines.length = 0; // 清空 inputLines
      }
    });
    
    // getMinBuildTime 函数用于计算最短建站时间
    function getMinBuildTime(relations, taskNum) {
      const adjList = new Map(); // 邻接表
      const inDegrees = Array(taskNum).fill(0); // 入度数组
      const taskTime = Array(taskNum).fill(0); // 每个任务的完成时间
    
      // 构建邻接表和入度数组
      relations.forEach(([preTask, nextTask]) => {
        if (!adjList.has(preTask)) adjList.set(preTask, []);
        adjList.get(preTask).push(nextTask);
        inDegrees[nextTask]++;
      });
    
      const queue = []; // 队列，存储所有入度为 0 的任务
      for (let i = 0; i < taskNum; i++) {
        if (inDegrees[i] === 0) {
          queue.push(i);
          taskTime[i] = 1; // 入度为 0 的任务最早开始时间为 1
        }
      }
    
      let minBuildTime = 1; // 初始化最短建站时间
    
      // 处理拓扑排序
      while (queue.length > 0) {
        const task = queue.shift();
        const currentTime = taskTime[task];
    
        if (adjList.has(task)) {
          adjList.get(task).forEach((nextTask) => {
            inDegrees[nextTask]--; // 减少后继任务的入度
    
            // 更新后继任务的时间
            taskTime[nextTask] = Math.max(taskTime[nextTask], currentTime + 1);
    
            if (inDegrees[nextTask] === 0) {
              queue.push(nextTask);
            }
          });
        }
    
        // 更新总时间为当前的最大完成时间
        minBuildTime = Math.max(minBuildTime, currentTime);
      }
    
      return minBuildTime;
    }
    

## C++

    
    
    #include <iostream>
    #include <vector>
    #include <queue>
    #include <unordered_map>
    
    using namespace std;
    
    int main() {
        int taskNum, relationsNum;
        cin >> taskNum >> relationsNum; // 输入任务数量和依赖关系数量
    
        vector<pair<int, int>> relations(relationsNum); // 依赖关系数组
        for (int i = 0; i < relationsNum; ++i) {
            cin >> relations[i].first >> relations[i].second; // 输入每个依赖关系的前置和后继任务
        }
    
        unordered_map<int, vector<int>> adjList; // 任务的后继任务表
        vector<int> inDegrees(taskNum, 0); // 每个任务的入度
        vector<int> taskTime(taskNum, 0); // 每个任务的完成时间
    
        // 构建图的邻接表和入度数组
        for (auto relation : relations) {
            int preTask = relation.first;
            int nextTask = relation.second;
            adjList[preTask].push_back(nextTask); // 添加后继任务
            inDegrees[nextTask]++; // 增加后继任务的入度
        }
    
        queue<int> q;
        for (int i = 0; i < taskNum; ++i) {
            if (inDegrees[i] == 0) {
                q.push(i); 
                taskTime[i] = 1; // 入度为0的任务最早时间为1
            }
        }
    
        int minBuildTime = 1;
    
        // 处理拓扑排序
        while (!q.empty()) {
            int task = q.front();
            q.pop();
            int currentTime = taskTime[task];
    
            if (adjList.count(task)) {
                for (int nextTask : adjList[task]) {
                    inDegrees[nextTask]--; // 减少后继任务的入度
    
                    // 更新后继任务的时间
                    taskTime[nextTask] = max(taskTime[nextTask], currentTime + 1);
    
                    if (inDegrees[nextTask] == 0) {
                        q.push(nextTask);
                    }
                }
            }
    
            minBuildTime = max(minBuildTime, currentTime);
        }
    
        cout << minBuildTime << endl; // 输出最短建站时间
        return 0;
    }
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    
    #define MAX_TASKS 1000
    
    int main() {
        int taskNum, relationsNum;
        scanf("%d %d", &taskNum, &relationsNum); // 输入任务数量和依赖关系数量
    
        int adjList[MAX_TASKS][MAX_TASKS] = {0}; // 任务的后继任务表
        int inDegrees[MAX_TASKS] = {0}; // 每个任务的入度
        int taskTime[MAX_TASKS] = {0}; // 每个任务的完成时间
        int queue[MAX_TASKS]; // 队列
        int front = 0, rear = 0;
    
        // 读取并构建依赖关系图
        for (int i = 0; i < relationsNum; i++) {
            int preTask, nextTask;
            scanf("%d %d", &preTask, &nextTask); // 输入前置任务和后继任务
            adjList[preTask][nextTask] = 1; // 添加后继任务
            inDegrees[nextTask]++; // 增加后继任务的入度
        }
    
        for (int i = 0; i < taskNum; i++) {
            if (inDegrees[i] == 0) {
                queue[rear++] = i; // 入度为0的任务入队
                taskTime[i] = 1; // 入度为0的任务最早时间为1
            }
        }
    
        int minBuildTime = 1;
    
        // 处理拓扑排序
        while (front < rear) {
            int task = queue[front++];
            int currentTime = taskTime[task];
    
            for (int nextTask = 0; nextTask < taskNum; nextTask++) {
                if (adjList[task][nextTask]) {
                    inDegrees[nextTask]--; // 减少后继任务的入度
    
                    // 更新后继任务的时间
                    if (taskTime[nextTask] < currentTime + 1) {
                        taskTime[nextTask] = currentTime + 1;
                    }
    
                    if (inDegrees[nextTask] == 0) {
                        queue[rear++] = nextTask;
                    }
                }
            }
    
            minBuildTime =
     (minBuildTime < currentTime) ? currentTime : minBuildTime;
        }
    
        printf("%d\n", minBuildTime); // 输出最短建站时间
        return 0;
    }
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/1900d86e997c8861f5e0c02113a605a3.png)

