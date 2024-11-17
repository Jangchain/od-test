## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/6e7a73f0404e4c65a2d80024274cd970.png)

## 题目描述

流浪地球计划在赤道上均匀部署了N个转向发动机，按位置顺序编号为0~N-1。

  1. 初始状态下所有的发动机都是未启动状态;
  2. 发动机启动的方式分为”手动启动"和”关联启动"两种方式;
  3. 如果在时刻1一个发动机被启动，下一个时刻2与之相邻的两个发动机就会被”关联启动”;
  4. 如果准备启动某个发动机时，它已经被启动了，则什么都不用做;
  5. 发动机0与发动机N-1是相邻的;

地球联合政府准备挑选某些发动机在某些时刻进行“手动启动”。当然最终所有的发动机都会被启动。

哪些发动机最晚被启动呢?

## 输入描述

  * 第一行两个数字N和E，中间有空格  
N代表部署发动机的总个数，E代表计划手动启动的发动机总个数  
1<N<=1000,1<=E<=1000,E<=N

  * 接下来共E行，每行都是两个数字T和P，中间有空格  
T代表发动机的手动启动时刻，P代表此发动机的位置编号。  
0<=T<=N.0<=P<N

## 输出描述

  * 第一行一个数字N，以回车结束  
N代表最后被启动的发动机个数

  * 第二行N个数字，中间有空格，以回车结束  
每个数字代表发动机的位置编号，从小到大排序

## 示例1

输入

    
    
    8 2
    0 2
    0 6
    

输出

    
    
    2
    0 4
    

说明

> 8个发动机，时刻0启动2和6号发动机

## 示例2

输入：

    
    
    8 2
    0 0
    1 7
    

输出：

    
    
    1
    4
    

说明

> 8个发动机，时刻0手动启动0，时刻1手动启动7.

## 解题思路

### 题目解析

  1. **初始状态** ：所有的发动机都是未启动状态。

  2. **启动方式** ：

     * **手动启动** ：你可以在某个时刻手动启动指定位置的发动机。
     * **关联启动** ：如果一个发动机在时刻1被启动，那么它的相邻发动机（左右两个，位置编号上相邻）会在下一时刻（时刻2）被自动启动。
  3. **循环关系** ：发动机0和N-1是相邻的，这意味着整个发动机的排列是环形的。

  4. **发动机启动规则** ：

     * 如果准备启动的发动机已经被启动，那么就不需要做任何操作。
     * 需要根据手动启动的时刻和位置，推算出所有发动机何时被启动，并确定哪些发动机在最后一个时刻被启动。

### 用例图解

如图所示：

  * 在时刻0，发动机2和6被手动启动。
  * 在时刻1，发动机1、3、5、7将被关联启动。
  * 到了时刻2，发动机0和4将被关联启动。
  * 因此，发动机0和4是最后一批被启动的。

![image-20240817105929077](https://i-blog.csdnimg.cn/blog_migrate/5ef1889e88f63dcdaf6ca3e13c719e67.png)

## Java

    
    
    import java.util.*;
    
    public class  Main{
        public static void main(String[] args) {
            Scanner sc = new Scanner(System.in);
    
            int n = sc.nextInt(); // 发动机的总个数
            int e = sc.nextInt(); // 计划手动启动的发动机总个数
    
            int[] launches = new int[n]; // 记录每个发动机的最终启动时刻
            Arrays.fill(launches, 1001); // 初始化为极大值
    
            Queue<int[]> queue = new LinkedList<>(); // 用于BFS的队列
    
            for (int i = 0; i < e; i++) {
                int t = sc.nextInt(); // 手动启动时刻
                int p = sc.nextInt(); // 发动机的位置编号
                launches[p] = t; // 手动启动时刻
                queue.offer(new int[]{p, t}); // 将手动启动的发动机加入队列
            }
    
            // 进行BFS，计算所有发动机的最早启动时间
            while (!queue.isEmpty()) {
                int[] current = queue.poll();
                int pos = current[0];
                int time = current[1];
    
                // 计算相邻的发动机位置
                int[] neighbors = {(pos - 1 + n) % n, (pos + 1) % n}; // 考虑环状结构
    
                for (int neighbor : neighbors) {
                    if (launches[neighbor] > time + 1) { // 更新更早的启动时刻
                        launches[neighbor] = time + 1;
                        queue.offer(new int[]{neighbor, time + 1});
                    }
                }
            }
    
            int maxT = 0; // 最晚启动时刻
            ArrayList<Integer> lastEngines = new ArrayList<>(); // 最晚启动的发动机集合
    
            for (int i = 0; i < n; i++) {
                if (launches[i] > maxT) { // 找到更晚启动的时刻
                    maxT = launches[i];
                    lastEngines.clear();
                    lastEngines.add(i);
                } else if (launches[i] == maxT) { // 相同的最晚启动时刻
                    lastEngines.add(i);
                }
            }
    
            // 输出结果
            System.out.println(lastEngines.size());
            Collections.sort(lastEngines); // 排序发动机编号
            for (int engine : lastEngines) {
                System.out.print(engine + " ");
            }
        }
    }
    

## Python

    
    
    from collections import deque
    
    # 读取输入
    n, e = map(int, input().split()) # 发动机总数和手动启动数
    launches = [1001] * n # 初始化为极大值
    
    queue = deque() # BFS队列
    
    # 读取手动启动的发动机
    for _ in range(e):
        t, p = map(int, input().split()) # 手动启动时刻和位置编号
        launches[p] = t
        queue.append((p, t)) # 将手动启动的发动机加入队列
    
    # 进行BFS，计算所有发动机的最早启动时间
    while queue:
        pos, time = queue.popleft() # 当前处理的发动机位置和时间
    
        # 计算相邻发动机，考虑环状结构
        neighbors = [(pos - 1 + n) % n, (pos + 1) % n]
    
        for neighbor in neighbors:
            if launches[neighbor] > time + 1: # 更新更早的启动时刻
                launches[neighbor] = time + 1
                queue.append((neighbor, time + 1)) # 加入队列
    
    maxT = 0 # 最晚启动时刻
    lastEngines = [] # 最晚启动的发动机集合
    
    # 查找最晚启动的发动机
    for i in range(n):
        if launches[i] > maxT:
            maxT = launches[i]
            lastEngines = [i] # 清空并添加
        elif launches[i] == maxT:
            lastEngines.append(i)
    
    # 输出结果
    print(len(lastEngines))
    print(' '.join(map(str, sorted(lastEngines))))
    

## JavaScript

    
    
    const readline = require('readline');
    
    // 创建读取接口
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    // 读取输入
    rl.on('line', (input) => {
        let inputs = input.split('\n');
        let [n, e] = inputs[0].split(' ').map(Number); // 解析发动机的总个数和手动启动的总个数
    
        let launches = new Array(n).fill(1001); // 初始化每个发动机的启动时刻为极大值
    
        let queue = []; // 用于BFS的队列
    
        for (let i = 1; i <= e; i++) {
            let [t, p] = inputs[i].split(' ').map(Number); // 读取手动启动时刻和位置编号
            launches[p] = t; // 设置发动机的启动时刻
            queue.push([p, t]); // 将手动启动的发动机加入队列
        }
    
        // 进行BFS，计算每个发动机的最早启动时间
        while (queue.length > 0) {
            let [pos, time] = queue.shift(); // 取出当前处理的发动机位置和启动时间
    
            // 计算相邻的发动机位置，考虑环状结构
            let neighbors = [(pos - 1 + n) % n, (pos + 1) % n];
    
            neighbors.forEach(neighbor => {
                if (launches[neighbor] > time + 1) { // 更新更早的启动时刻
                    launches[neighbor] = time + 1;
                    queue.push([neighbor, time + 1]); // 将更新后的发动机加入队列
                }
            });
        }
    
        let maxT = 0; // 最晚启动时刻
        let lastEngines = []; // 最晚启动的发动机集合
    
        for (let i = 0; i < n; i++) {
            if (launches[i] > maxT) { // 找到更晚启动的时刻
                maxT = launches[i];
                lastEngines = [i]; // 更新最晚启动发动机集合
            } else if (launches[i] === maxT) {
                lastEngines.push(i); // 相同的最晚启动时刻
            }
        }
    
        // 输出结果
        console.log(lastEngines.length);
        console.log(lastEngines.sort((a, b) => a - b).join(' ')); // 按顺序输出
        rl.close();
    });
    

## C++

    
    
    #include <iostream>
    #include <vector>
    #include <queue>
    #include <algorithm>
    using namespace std;
    
    int main() {
        int n, e;
        cin >> n >> e; // 发动机的总个数和手动启动数
        vector<int> launches(n, 1001); // 初始化启动时刻为极大值
    
        queue<pair<int, int>> q; // BFS队列
    
        // 读取手动启动的发动机
        for (int i = 0; i < e; ++i) {
            int t, p;
            cin >> t >> p; // 手动启动时刻和位置编号
            launches[p] = t;
            q.push({p, t}); // 将手动启动的发动机加入队列
        }
    
        // 进行BFS，计算所有发动机的最早启动时间
        while (!q.empty()) {
            int pos = q.front().first;
            int time = q.front().second;
            q.pop();
    
            // 计算相邻的发动机位置，考虑环状结构
            int neighbors[2] = {(pos - 1 + n) % n, (pos + 1) % n};
    
            for (int neighbor : neighbors) {
                if (launches[neighbor] > time + 1) { // 更新更早的启动时刻
                    launches[neighbor] = time + 1;
                    q.push({neighbor, time + 1}); // 将更新的发动机加入队列
                }
            }
        }
    
        int maxT = 0; // 最晚启动时刻
        vector<int> lastEngines; // 最晚启动的发动机集合
    
        // 查找最晚启动的发动机
        for (int i = 0; i < n; ++i) {
            if (launches[i] > maxT) {
                maxT = launches[i];
                lastEngines.clear();
                lastEngines.push_back(i);
            } else if (launches[i] == maxT) {
                lastEngines.push_back(i);
            }
        }
    
        // 输出结果
        cout << lastEngines.size() << endl;
        sort(lastEngines.begin(), lastEngines.end());
        for (int engine : lastEngines) {
            cout << engine << " ";
        }
        cout << endl;
    
        return 0;
    }
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    
    #define MAX_N 1000
    #define INF 1001
    
    int launches[MAX_N]; // 记录发动机启动时刻
    int bfsArray[MAX_N * 2]; // 用来存储待处理的发动机位置
    int bfsTime[MAX_N * 2]; // 存储对应发动机的启动时间
    
    int main() {
        int n, e;
        scanf("%d %d", &n, &e); // 发动机总数和手动启动数
    
        // 初始化所有发动机的启动时刻为极大值
        for (int i = 0; i < n; i++) {
            launches[i] = INF;
        }
    
        int front = 0, rear = 0; // front为当前处理的元素位置，rear为新加入元素的位置
    
        // 读取手动启动的发动机
        for (int i = 0; i < e; i++) {
            int t, p;
            scanf("%d %d", &t, &p); // 手动启动时刻和位置编号
            launches[p] = t;
            bfsArray[rear] = p;     // 将发动机位置加入数组
            bfsTime[rear] = t;      // 对应的启动时刻
            rear++;
        }
    
        // 进行BFS，计算所有发动机的最早启动时间
        while (front < rear) {
            int pos = bfsArray[front]; // 当前处理的发动机位置
            int time = bfsTime[front]; // 当前发动机的启动时间
            front++;
    
            // 计算相邻的发动机位置，考虑环状结构
            int neighbors[2] = {(pos - 1 + n) % n, (pos + 1) % n};
    
            for (int i = 0; i < 2; i++) {
                int neighbor = neighbors[i];
                if (launches[neighbor] > time + 1) { // 更新更早的启动时刻
                    launches[neighbor] = time + 1;
                    bfsArray[rear] = neighbor;   // 将相邻发动机加入待处理的数组
                    bfsTime[rear] = time + 1;    // 对应的启动时间
                    rear++;
                }
            }
        }
    
        int maxT = 0; // 最晚启动时刻
        int lastEngines[MAX_N]; // 最晚启动的发动机集合
        int lastCount = 0;
    
        // 查找最晚启动的发动机
        for (int i = 0; i < n; i++) {
            if (launches[i] > maxT) {
                maxT = launches[i];
                lastCount = 0; // 重置计数
                lastEngines[lastCount++] = i;
            } else if (launches[i] == maxT) {
                lastEngines[lastCount++] = i;
            }
        }
    
        // 输出结果
        printf("%d\n", lastCount);
        for (int i = 0; i < lastCount; i++) {
            printf("%d ", lastEngines[i]);
        }
        
    
        return 0;
    }
    

![fengmian](https://i-blog.csdnimg.cn/blog_migrate/5939025e75b8807d509cbdd3ccf33d14.png)

## 完整用例

#### 用例1

    
    
    8 2
    0 2
    0 6
    

#### 用例2

    
    
    8 2
    0 0
    1 7
    

#### 用例3

    
    
    10 3
    0 1
    2 4
    3 9
    

#### 用例4

    
    
    12 4
    0 3
    1 0
    2 6
    3 9
    

#### 用例5

    
    
    15 5
    0 0
    1 5
    2 10
    3 13
    4 7
    

#### 用例6

    
    
    6 1
    0 2
    

#### 用例7

输入：

    
    
    20 3
    0 2
    2 10
    4 18
    

#### 用例8

    
    
    30 5
    0 0
    1 10
    3 20
    5 25
    6 15
    

#### 用例9

    
    
    50 4
    0 0
    1 25
    2 40
    4 10
    

#### 用例10

    
    
    100 10
    0 5
    1 20
    2 35
    3 50
    4 65
    5 80
    6 90
    7 95
    8 0
    9 45
    

