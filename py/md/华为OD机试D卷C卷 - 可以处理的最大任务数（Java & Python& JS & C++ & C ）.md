## 题目描述

在某个项目中有多个任务(用tasks数组表示)需要您进行处理，其中tasks[i]=[si,ei],你可以在si <= day <=
ei中的任意一天处理该任务，请返回你可以处理的最大任务数

## 输入描述

第一行为任务数量n，1 <=n<= 100000。后面n行表示各个任务的开始时间和终止时间，使用si,ei表示,1 <= si <= ei <=
100000

## 输出描述

输出为一个整数，表示可以处理的最大任务数。

## 用例

输入

    
    
    3
    1 1
    1 2
    1 3
    

输出

    
    
    3
    

## 解题思路

  1. **贪心算法原则** ：每一步选择当前情况下最优的选择（这里是选择结束时间最早的任务），以达到全局最优解。这种方法适用于任务调度问题，因为优先完成结束时间早的任务可以为后续任务腾出更多时间。

  2. **使用优先队列** ：

     * **优先队列特性** ：自动根据任务的结束时间进行排序，保证每次取出的都是结束时间最早的任务。
     * **应用** ：在处理任务时，将所有任务按开始时间存入列表（数组的每个元素是一个列表，对应于该开始时间的所有任务）。然后，遍历每个时间点，将该时间点开始的所有任务加入优先队列。这样，优先队列总是包含当前可执行的任务，且队首是最优先执行的任务。
  3. **任务调度** ：

     * **移除过期任务** ：在每个时间点，首先检查优先队列中是否有已经结束的任务（即结束时间小于当前时间的任务），将这些任务从队列中移除。这一步确保队列中的任务都是未完成且可执行的。
     * **加入新任务** ：将当前时间点开始的所有任务加入优先队列。这些任务现在是候选任务，准备被执行。
     * **执行任务** ：如果优先队列不为空，说明有可执行的任务。从队列中取出（移除）一个任务执行，即完成一个任务，完成任务的计数加一。按照贪心原则，这个任务是当前所有可执行任务中结束时间最早的。
  4. **总结** ：通过贪心算法选择每一步的最优解（结束时间最早的任务），并利用优先队列自动维护任务的执行顺序，可以有效地解决任务调度问题，最大化完成的任务数量。

## C++

    
    
    #include <iostream>
    #include <vector>
    #include <queue>
    #include <functional>
    
    using namespace std;
    // 定义一个Task结构体来存储每个任务的开始时间和结束时间
    struct Task {
        int startTime;  // 任务开始时间
        int endTime;    // 任务结束时间
    
        // Task结构体的构造函数，用于初始化任务的开始时间和结束时间
        Task(int start, int end) : startTime(start), endTime(end) {}
    };
    
    // 比较函数，用于优先队列根据任务的结束时间进行排序
    struct compare {
        bool operator()(const Task& a, const Task& b) {
            return a.endTime > b.endTime;
        }
    };
    
    int main() {
        int n;
        cin >> n; // 读取任务的总数
    
        // 使用vector来动态存储任务列表，每个时间点对应一个任务列表
        vector<vector<Task>> tasks(100001);
    
        // 读取每个任务的开始时间和结束时间，并将其添加到对应的任务列表中
        for (int i = 0; i < n; i++) {
            int startTime, endTime;
            cin >> startTime >> endTime;
            tasks[startTime].emplace_back(startTime, endTime);
        }
    
        priority_queue<Task, vector<Task>, compare> pq; // 创建一个优先队列
    
        int ans = 0; // 用于记录能完成的任务数量
    
        // 遍历每个时间点
        for (int i = 0; i < 100001; i++) {
            // 如果优先队列不为空且队列顶部的任务结束时间小于当前时间，则将其移除
            while (!pq.empty() && pq.top().endTime < i) {
                pq.pop();
            }
    
            // 将当前时间点的所有任务加入优先队列
            for (const auto& task : tasks[i]) {
                pq.push(task);
            }
    
            // 如果优先队列不为空，则从队列中移除一个任务，并将完成任务的数量加一
            if (!pq.empty()) {
                ans++;
                pq.pop();
            }
        }
    
        cout << ans << endl; // 输出能完成的任务数量
        return 0;
    }
    

## Java

    
    
    import java.util.*;
    
    class Main {
        // 定义一个Task类来存储每个任务的开始时间和结束时间
        static class Task {
            int startTime;  // 任务开始时间
            int endTime;    // 任务结束时间
    
            // Task类的构造函数，用于初始化任务的开始时间和结束时间
            Task(int startTime, int endTime) {
                this.startTime = startTime;
                this.endTime = endTime;
            }
        }
    
        // 创建一个List数组，用于存储所有的任务，每个时间点对应一个任务列表
        static List<Task>[] a = new List[100001];
    
        public static void main(String[] args) {
            Scanner sc = new Scanner(System.in);
            int n = sc.nextInt(); // 读取任务的总数
            
            // 初始化任务列表数组
            for (int i = 0; i < 100001; i++) {
                a[i] = new ArrayList<>();
            }
    
            // 读取每个任务的开始时间和结束时间，并将其添加到对应的任务列表中
            for (int i = 0; i < n; i++) { 
                int x = sc.nextInt(); // 任务开始时间
                int y = sc.nextInt(); // 任务结束时间
                a[x].add(new Task(x, y)); // 创建任务并添加到任务列表中
            }
    
             
            int ans = 0; // 用于记录能完成的任务数量
            // 创建一个优先队列，根据任务的结束时间进行排序，确保每次都处理结束时间最早的任务
            PriorityQueue<Task> pq = new PriorityQueue<>(Comparator.comparingInt(t -> t.endTime));
    
            // 遍历每个时间点
            for (int i = 0; i < 100001; i++) {
                // 如果优先队列不为空且队列顶部的任务结束时间小于当前时间，则将其移除
                while (!pq.isEmpty() && pq.peek().endTime < i) {
                    pq.poll();
                }
    
                // 如果当前时间点有任务
                if (a[i] != null) {
                    // 将当前时间点的所有任务加入优先队列
                    for (Task task : a[i]) {
                        pq.add(task);
                    }
                }
    
                // 如果优先队列不为空，则从队列中移除一个任务，并将完成任务的数量加一
                if (!pq.isEmpty()) {
                    ans++;
                    pq.poll();
                }
            }
    
            // 输出能完成的任务数量
            System.out.println(ans);
        }
    }
    

## javaScript

    
    
    // 引入readline模块以从标准输入读取数据
    const readline = require('readline');
    // 创建readline接口实例
    const rl = readline.createInterface({
      input: process.stdin, // 标准输入流
      output: process.stdout // 标准输出流
    });
    
    // 用于存储输入行的数组
    let lines = [];
    // 监听输入行，每当接收到一行输入，就将其添加到lines数组中
    rl.on('line', (line) => {
      lines.push(line);
    }).on('close', () => { // 当输入流关闭时，执行以下代码
      // 初始化一个长度为100001的数组，每个元素都是一个空数组，用于存储任务
      const tasks = Array.from({ length: 100001 }, () => []);
      // 解析第一行输入为整数n，表示任务总数
      const n = parseInt(lines[0], 10);
    
      // 遍历输入的每个任务
      for (let i = 1; i <= n; i++) {
        // 将每行输入的两个数字（开始时间和结束时间）解析为整数
        const [x, y] = lines[i].split(' ').map(Number);
        // 将任务添加到对应开始时间的数组中
        tasks[x].push({ startTime: x, endTime: y });
      }
    
      // 初始化完成任务的数量为0
      let ans = 0;
      // 初始化一个空数组作为优先队列，用于存储任务
      const pq = [];
      // 遍历每个可能的时间点
      for (let i = 0; i < 100001; i++) {
        // 如果优先队列中有任务，并且队首任务的结束时间小于当前时间，则将其移除
        while (pq.length > 0 && pq[0].endTime < i) {
          pq.shift(); // 模拟优先队列的poll操作
        }
    
        // 如果当前时间点有任务
        if (tasks[i]) {
          // 将所有当前时间点的任务加入优先队列，并按结束时间排序
          tasks[i].forEach(task => {
            pq.push(task);
            pq.sort((a, b) => a.endTime - b.endTime); // 保持优先队列按结束时间排序
          });
        }
    
        // 如果优先队列中有任务，则完成一个任务，并将完成任务的数量加一
        if (pq.length > 0) {
          ans++;
          pq.shift(); // 模拟优先队列的poll操作
        }
      }
    
      // 输出能完成的任务数量
      console.log(ans);
    });
    

## Python

    
    
    import heapq  # 导入heapq模块用于实现优先队列
    
    # 定义一个Task类来存储每个任务的开始时间和结束时间
    class Task:
        def __init__(self, startTime, endTime):
            self.startTime = startTime  # 任务开始时间
            self.endTime = endTime      # 任务结束时间
    
        def __lt__(self, other):
            # 定义小于操作，用于优先队列中比较Task对象，根据结束时间进行排序
            return self.endTime < other.endTime
    
    # 创建一个列表，用于存储所有的任务，每个时间点对应一个任务列表
    a = [[] for _ in range(100001)]
    
    # 读取任务的总数
    n = int(input())
    
    # 读取每个任务的开始时间和结束时间，并将其添加到对应的任务列表中
    for _ in range(n):
        x, y = map(int, input().split())  # 读取任务开始时间和结束时间
        a[x].append(Task(x, y))  # 创建任务并添加到任务列表中
    
    ans = 0  # 用于记录能完成的任务数量
    # 创建一个优先队列，根据任务的结束时间进行排序，确保每次都处理结束时间最早的任务
    pq = []
    
    # 遍历每个时间点
    for i in range(100001):
        # 如果优先队列不为空且队列顶部的任务结束时间小于当前时间，则将其移除
        while pq and pq[0].endTime < i:
            heapq.heappop(pq)
    
        # 如果当前时间点有任务
        for task in a[i]:
            # 将当前时间点的所有任务加入优先队列
            heapq.heappush(pq, task)
    
        # 如果优先队列不为空，则从队列中移除一个任务，并将完成任务的数量加一
        if pq:
            ans += 1
            heapq.heappop(pq)
    
    # 输出能完成的任务数量
    print(ans)
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    
    // 定义任务结构体，用于存储每个任务的开始时间和结束时间
    typedef struct {
        int startTime;  // 任务开始时间
        int endTime;    // 任务结束时间
    } Task;
    
    // 优先队列的比较函数，用于比较两个任务的结束时间
    int cmp(const void *a, const void *b) {
        Task *taskA = (Task *)a;
        Task *taskB = (Task *)b;
        return taskA->endTime - taskB->endTime;
    }
    
    // 定义任务列表，每个时间点对应一个任务列表
    Task *tasks[100001];
    int taskCounts[100001] = {0}; // 存储每个时间点任务的数量
    
    int main() {
        int n; // 任务总数
        scanf("%d", &n);
    
        // 读取每个任务的开始时间和结束时间，并将其添加到对应的任务列表中
        for (int i = 0; i < n; i++) {
            int x, y; // 任务开始时间和结束时间
            scanf("%d %d", &x, &y);
            Task newTask = {x, y}; // 创建新任务
            tasks[x] = (Task *)realloc(tasks[x], (taskCounts[x] + 1) * sizeof(Task)); // 为新任务分配空间
            tasks[x][taskCounts[x]] = newTask; // 将新任务添加到列表中
            taskCounts[x]++; // 更新任务数量
        }
    
        int ans = 0; // 用于记录能完成的任务数量
        Task pq[100001]; // 创建一个优先队列
        int pqSize = 0; // 优先队列的大小
    
        // 遍历每个时间点
        for (int i = 0; i < 100001; i++) {
            // 如果优先队列不为空且队列顶部的任务结束时间小于当前时间，则将其移除
            while (pqSize > 0 && pq[0].endTime < i) {
                pq[0] = pq[--pqSize]; // 移除队列顶部的任务
                qsort(pq, pqSize, sizeof(Task), cmp); // 重新排序优先队列
            }
    
            // 如果当前时间点有任务
            if (taskCounts[i] > 0) {
                // 将当前时间点的所有任务加入优先队列
                for (int j = 0; j < taskCounts[i]; j++) {
                    pq[pqSize++] = tasks[i][j];
                    qsort(pq, pqSize, sizeof(Task), cmp); // 重新排序优先队列
                }
            }
    
            // 如果优先队列不为空，则从队列中移除一个任务，并将完成任务的数量加一
            if (pqSize > 0) {
                ans++;
                pq[0] = pq[--pqSize]; // 移除队列顶部的任务
                qsort(pq, pqSize, sizeof(Task), cmp); // 重新排序优先队列
            }
        }
    
        // 输出能完成的任务数量
        printf("%d\n", ans);
    
        return 0;
    }
    

## 完整用例

### 用例1

    
    
    2
    1 2
    2 3
    

### 用例2

    
    
    3
    1 3
    2 4
    3 5
    

### 用例3

    
    
    4
    1 10
    2 9
    3 8
    4 7
    

### 用例4

    
    
    5
    1 5
    6 10
    11 15
    16 20
    21 25
    

### 用例5

    
    
    3
    1 3
    2 2
    3 5
    

### 用例6

    
    
    2
    1 100000
    1 100000
    

### 用例7

    
    
    3
    1 2
    3 4
    5 6
    

### 用例8

    
    
    6
    1 3
    4 6
    7 9
    10 12
    13 15
    16 18
    

### 用例9

    
    
    2
    1 50
    51 100
    

### 用例10

    
    
    3
    1 100
    50 150
    100 200
    

![fengmian](https://i-blog.csdnimg.cn/blog_migrate/688fe371ffe1a8b4885c1f8dfe095763.png)

