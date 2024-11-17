## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

游乐场里增加了一批摇摇车，非常受小朋友欢迎，但是每辆摇摇车同时只能有一个小朋友使用，如果没有空余的摇摇车需要排队等候，或者直接离开，最后没有玩上的小朋友会非常不开心。  
请根据今天小朋友的来去情况，统计不开心的小朋友数量

  1. 摇摇车数量为N，范围是: 1 <= N < 10;
  2. 每个小朋友都对应一个编码，编码是不重复的数字，今天小朋友的来去情况，可以使用编码表示为:1 1 2 3 2 3。(若小朋友离去之前有空闲的摇摇车，则代表玩耍后离开;不考虑小朋友多次玩的情况)。小朋友数量≤ 100
  3. 题目保证所有输入数据无异常且范围满足上述说明

## 输入描述

第一行: 摇摇车数量

第二行: 小朋友来去情况

## 输出描述

返回不开心的小朋友数量

## 示例1

输入

    
    
    1  
    1 2 1 2  
    

输出

    
    
    0 
    

说明

> 第一行，1个摇摇车第二行，1号来 2号来(排队) 1号走 2号走(1号走后摇摇车已有空闲，所以玩后离开)

## 示例2

输入

    
    
     1
     1 2 2 3 1 3  
    

输出

    
    
     1
    

说明

> 第一行，1个摇摇车第二行，1号来 2号来(排队) 2号走(不开心离开) 3号来(排队)1号走 3号走(1号走后摇摇车已有空闲，所以玩后离)

## 解题思路

题目要求计算在游乐场排队等候摇摇车的小朋友中，最终没有玩上摇摇车、感到“不开心”的小朋友数量。

#### 解题思路

  1. **摇摇车数量** ：

     * 第一行输入是摇摇车的数量 `N`，代表同时可以被 `N` 个小朋友使用。
  2. **小朋友的来去情况** ：

     * 第二行是小朋友的来去编码。相同编码出现两次表示该小朋友先到达游乐场，再离开游乐场。
     * 小朋友到达时： 
       * 若有空余的摇摇车，则该小朋友直接使用摇摇车。
       * 若摇摇车已满，则该小朋友需要排队等候。
     * 小朋友离开时： 
       * 如果小朋友排在队列中但未能玩上摇摇车，则该小朋友直接离开，记为“不开心”。
       * 如果小朋友在使用摇摇车，则该小朋友直接释放摇摇车，且此时若有排队小朋友，则队首小朋友开始使用摇摇车。
  3. **不开心小朋友数量统计** ：

     * 若一个小朋友排队后没有等到空闲摇摇车就离开，那么统计为不开心小朋友。

#### 示例分析

  * **示例 1**  
输入：

    
        1  
    1 2 1 2  
    

输出：

    
        0  
    

说明：摇摇车数量为 1。

    * `1`号到达，有空余摇摇车，直接上车。
    * `2`号到达，摇摇车已满，进入排队。
    * `1`号离开，`2`号可以上车。
    * `2`号离开时已玩上摇摇车，没有不开心的小朋友。
  * **示例 2**  
输入：

    
        1  
    1 2 2 3 1 3  
    

输出：

    
        1  
    

说明：摇摇车数量为 1。

    * `1`号到达，有空余摇摇车，直接上车。
    * `2`号到达，摇摇车已满，进入排队。
    * `2`号离开，未能玩上摇摇车，记为不开心。
    * `3`号到达，摇摇车已满，进入排队。
    * `1`号离开，`3`号可以上车。
    * `3`号离开时已玩上摇摇车，最终有 1 名不开心的小朋友。

#### 具体步骤

    * 初始化 `N` 个摇摇车的状态、一个用于排队的小朋友队列、和一个计数器来统计不开心的小朋友数量。
    * 遍历第二行的编码： 
      * **若小朋友是到达** ： 
        * 检查当前是否有空闲摇摇车： 
          * 若有空闲，则分配摇摇车。
          * 若没有空闲，则加入排队队列。
      * **若小朋友是离开** ： 
        * 若在排队队列中，但尚未玩上，则从排队队列移除并将该小朋友计为不开心。
        * 若小朋友正在使用摇摇车，则释放摇摇车，并检查排队队列是否有小朋友等待，若有则让队首小朋友上车。

## Java

    
    
    import java.util.*;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            
            int rideCount = Integer.parseInt(scanner.nextLine()); // 摇摇车数量
            String[] events = scanner.nextLine().split(" "); // 小朋友的来去事件
            
            int unhappyCount = 0; // 不开心的小朋友计数
            HashSet<String> onRide = new HashSet<>(); // 正在使用摇摇车的小朋友
            Queue<String> queue = new LinkedList<>(); // 等待的小朋友队列
    
            for (String kid : events) {
                if (onRide.contains(kid)) {
                    // 小朋友离开摇摇车
                    onRide.remove(kid);
                    // 若有等待队列，则让队首小朋友上车
                    if (!queue.isEmpty()) {
                        onRide.add(queue.poll());
                    }
                } else {
                    // 小朋友到达
                    if (onRide.size() < rideCount) {
                        // 有空闲摇摇车
                        onRide.add(kid);
                    } else {
                        // 没有空闲摇摇车，检查是否已经排队
                        if (queue.contains(kid)) {
                            // 排队中离开，记为不开心
                            unhappyCount++;
                            queue.remove(kid); // 离开队列
                        } else {
                            // 加入排队队列
                            queue.offer(kid);
                        }
                    }
                }
            }
    
            // 输出不开心的小朋友数量
            System.out.println(unhappyCount);
            scanner.close();
        }
    }
    
    

## Python

    
    
    from collections import deque
    
    # 读取输入
    ride_count = int(input().strip())  # 摇摇车数量
    events = input().strip().split()  # 小朋友的来去事件
    
    unhappy_count = 0  # 不开心的小朋友计数
    on_ride = set()  # 正在使用摇摇车的小朋友
    queue = deque()  # 等待的小朋友队列
    
    for kid in events:
        if kid in on_ride:
            # 小朋友离开摇摇车
            on_ride.remove(kid)
            # 若有等待队列，则让队首小朋友上车
            if queue:
                on_ride.add(queue.popleft())
        else:
            # 小朋友到达
            if len(on_ride) < ride_count:
                # 有空闲摇摇车
                on_ride.add(kid)
            else:
                # 没有空闲摇摇车，检查是否已经排队
                if kid in queue:
                    # 排队中离开，记为不开心
                    unhappy_count += 1
                    queue.remove(kid)  # 离开队列
                else:
                    # 加入排队队列
                    queue.append(kid)
    
    # 输出不开心的小朋友数量
    print(unhappy_count)
    
    

## JavaScript

    
    
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    let inputLines = [];
    rl.on('line', (line) => {
        inputLines.push(line);
    }).on('close', () => {
        // 获取摇摇车数量
        const rideCount = parseInt(inputLines[0].trim());
        // 获取小朋友的来去事件
        const events = inputLines[1].trim().split(" ");
    
        let unhappyCount = 0; // 不开心的小朋友计数
        const onRide = new Set(); // 正在使用摇摇车的小朋友
        const queue = []; // 等待的小朋友队列
    
        events.forEach((kid) => {
            if (onRide.has(kid)) {
                // 小朋友离开摇摇车
                onRide.delete(kid);
                // 若有等待队列，则让队首小朋友上车
                if (queue.length > 0) {
                    onRide.add(queue.shift());
                }
            } else {
                // 小朋友到达
                if (onRide.size < rideCount) {
                    // 有空闲摇摇车
                    onRide.add(kid);
                } else {
                    // 没有空闲摇摇车，检查是否已经排队
                    if (queue.includes(kid)) {
                        // 排队中离开，记为不开心
                        unhappyCount++;
                        queue.splice(queue.indexOf(kid), 1); // 离开队列
                    } else {
                        // 加入排队队列
                        queue.push(kid);
                    }
                }
            }
        });
    
        // 输出不开心的小朋友数量
        console.log(unhappyCount);
    });
    
    

## C++

    
    
    #include <iostream>
    #include <unordered_set>
    #include <queue>
    #include <vector>
    #include <string>
    #include <sstream>
    
    int main() {
        int rideCount; // 摇摇车数量
        std::cin >> rideCount;
        std::cin.ignore(); // 忽略换行符
    
        std::string line;
        std::getline(std::cin, line); // 小朋友的来去事件
        std::istringstream iss(line);
        std::vector<std::string> events;
        std::string kid;
        
        // 读取事件序列
        while (iss >> kid) {
            events.push_back(kid);
        }
    
        int unhappyCount = 0; // 不开心的小朋友计数
        std::unordered_set<std::string> onRide; // 正在使用摇摇车的小朋友
        std::queue<std::string> queue; // 等待的小朋友队列
    
        for (const auto& kid : events) {
            if (onRide.count(kid)) {
                // 小朋友离开摇摇车
                onRide.erase(kid);
                // 若有等待队列，则让队首小朋友上车
                if (!queue.empty()) {
                    onRide.insert(queue.front());
                    queue.pop();
                }
            } else {
                // 小朋友到达
                if (onRide.size() < rideCount) {
                    // 有空闲摇摇车
                    onRide.insert(kid);
                } else {
                    // 没有空闲摇摇车，检查是否已经排队
                    bool inQueue = false;
                    std::queue<std::string> tempQueue = queue;
                    while (!tempQueue.empty()) {
                        if (tempQueue.front() == kid) {
                            inQueue = true;
                            break;
                        }
                        tempQueue.pop();
                    }
                    
                    if (inQueue) {
                        // 排队中离开，记为不开心
                        unhappyCount++;
                        // 移除队列中的该小朋友
                        std::queue<std::string> newQueue;
                        while (!queue.empty()) {
                            if (queue.front() != kid) {
                                newQueue.push(queue.front());
                            }
                            queue.pop();
                        }
                        queue = newQueue;
                    } else {
                        // 加入排队队列
                        queue.push(kid);
                    }
                }
            }
        }
    
        // 输出不开心的小朋友数量
        std::cout << unhappyCount << std::endl;
    
        return 0;
    }
    
    

## C语言

    
    
    #include <stdio.h>
    #include <string.h>
    
    #define MAX_KIDS 1000  // 最大小朋友数量
    #define MAX_NAME_LENGTH 20 // 小朋友名字的最大长度
    
    // 判断一个小朋友是否在 onRide 数组中
    int isInOnRide(char onRide[][MAX_NAME_LENGTH], int onRideCount, char *kid) {
        for (int i = 0; i < onRideCount; i++) {
            if (strcmp(onRide[i], kid) == 0) {
                return 1; // 找到该小朋友
            }
        }
        return 0; // 未找到
    }
    
    // 从 onRide 数组中移除小朋友
    void removeFromOnRide(char onRide[][MAX_NAME_LENGTH], int *onRideCount, char *kid) {
        for (int i = 0; i < *onRideCount; i++) {
            if (strcmp(onRide[i], kid) == 0) {
                // 将最后一个元素移到当前位置，减少数组大小
                strcpy(onRide[i], onRide[*onRideCount - 1]);
                (*onRideCount)--;
                break;
            }
        }
    }
    
    // 判断一个小朋友是否在 queue 数组中
    int isInQueue(char queue[][MAX_NAME_LENGTH], int queueCount, char *kid) {
        for (int i = 0; i < queueCount; i++) {
            if (strcmp(queue[i], kid) == 0) {
                return 1; // 找到该小朋友
            }
        }
        return 0; // 未找到
    }
    
    // 从 queue 数组中移除小朋友
    void removeFromQueue(char queue[][MAX_NAME_LENGTH], int *queueCount, char *kid) {
        for (int i = 0; i < *queueCount; i++) {
            if (strcmp(queue[i], kid) == 0) {
                // 将后面的元素往前移
                for (int j = i; j < *queueCount - 1; j++) {
                    strcpy(queue[j], queue[j + 1]);
                }
                (*queueCount)--;
                break;
            }
        }
    }
    
    // 主函数
    int main() {
        int rideCount; // 摇摇车数量
        scanf("%d", &rideCount);
        getchar(); // 读取换行符
    
        char line[MAX_KIDS * MAX_NAME_LENGTH];
        fgets(line, sizeof(line), stdin); // 读取事件输入行
    
        // 将事件分割成数组
        char events[MAX_KIDS][MAX_NAME_LENGTH];
        int eventCount = 0;
        char *token = strtok(line, " ");
        while (token != NULL) {
            strcpy(events[eventCount++], token);
            token = strtok(NULL, " ");
        }
    
        int unhappyCount = 0; // 不开心的小朋友计数
        char onRide[MAX_KIDS][MAX_NAME_LENGTH]; // 正在使用摇摇车的小朋友
        int onRideCount = 0;
    
        char queue[MAX_KIDS][MAX_NAME_LENGTH]; // 等待的小朋友队列
        int queueCount = 0;
    
        // 遍历每个事件
        for (int i = 0; i < eventCount; i++) {
            char *kid = events[i];
            // 移除换行符
            kid[strcspn(kid, "\n")] = '\0';
    
            if (isInOnRide(onRide, onRideCount, kid)) {
                // 如果小朋友正在使用摇摇车，则让他离开
                removeFromOnRide(onRide, &onRideCount, kid);
                // 若队列不为空，让队首小朋友上车
                if (queueCount > 0) {
                    strcpy(onRide[onRideCount++], queue[0]);
                    removeFromQueue(queue, &queueCount, queue[0]);
                }
            } else {
                // 小朋友到达
                if (onRideCount < rideCount) {
                    // 若有空闲摇摇车，则上车
                    strcpy(onRide[onRideCount++], kid);
                } else {
                    // 没有空闲摇摇车
                    if (isInQueue(queue, queueCount, kid)) {
                        // 如果小朋友已经在队列中，再次出现则不开心
                        unhappyCount++;
                        removeFromQueue(queue, &queueCount, kid);
                    } else {
                        // 加入等待队列
                        strcpy(queue[queueCount++], kid);
                    }
                }
            }
        }
    
        // 输出不开心的小朋友数量
        printf("%d\n", unhappyCount);
    
        return 0;
    }
    
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

#### 完整用例

##### 用例1

    
    
    1
    1 2 1 2
    

##### 用例2

    
    
    1
    1 2 2 3 1 3
    

##### 用例3

    
    
    2
    1 2 3 1 2 3
    

##### 用例4

    
    
    3
    1 2 3 4 5 6
    

##### 用例5

    
    
    4
    1 2 3 4 1 2 3 4
    

##### 用例6

    
    
    5
    1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20
    

##### 用例7

    
    
    3
    1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20
    

##### 用例8

    
    
    3
    1 2 1 2 3 4 3 4 5 5
    

##### 用例9

    
    
    1
    1 2 2 3 1 3
    

##### 用例10

    
    
    2
    1 2 1 2 3 4 3 4 5 6 5 6
    

