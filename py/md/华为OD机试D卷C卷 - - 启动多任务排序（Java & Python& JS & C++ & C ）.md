## 题目描述

一个应用启动时，会有多个初始化任务需要执行，并且任务之间有依赖关系，例如A任务依赖B任务，那么必须在B任务执行完成之后，才能开始执行A任务。

现在给出多条任务依赖关系的规则，请输入任务的顺序执行序列，规则采用贪婪策略，即一个任务如果没有依赖的任务，则立刻开始执行，如果同时有多个任务要执行，则根据任务名称字母顺序排序。

例如：B任务依赖A任务，C任务依赖A任务，D任务依赖B任务和C任务，同时，D任务还依赖E任务。那么执行任务的顺序由先到后是：

    
    
    A任务，E任务，B任务，C任务，D任务
    

这里A和E任务都是没有依赖的，立即执行。

## 输入描述

输入参数每个元素都表示任意两个任务之间的依赖关系，输入参数中符号"->"表示依赖方向，例如：

> A->B：表示A依赖B

多个依赖之间用单个空格分隔

## 输出描述

输出排序后的启动任务列表，多个任务之间用单个空格分隔

## 用例

输入

    
    
    A->B C->B
    

输出

    
    
    B A C
    

## 解题思路

  1. 构建图的邻接表和计算每个任务的入度。邻接表`graph`用于表示任务间的依赖关系，而入度表`inDegree`用于记录每个任务依赖的任务数量。
  2. 遍历输入的依赖关系，更新邻接表和入度表。对于每个依赖`A->B`，将`B`添加到`A`的邻接列表中，并将`B`的入度加1。同时，确保每个任务至少在入度表中出现一次，如果任务没有依赖，则其入度为0。
  3. 使用一个队列（或列表）来收集入度为0的任务，即可以立即执行的任务。
  4. 按照字母顺序执行入度为0的任务，并在执行过程中更新其它任务的入度。对于每个执行的任务，检查它的所有后继任务，将每个后继任务的入度减1。如果后继任务的入度减为0，则将其加入到下一轮执行的队列中。
  5. 重复步骤4，直到没有任务可以执行。

用例`A->B C->B`模拟计算过程：

  * 输入：`A->B C->B`
  * 分割输入，得到依赖关系：`A`依赖于`B`，`C`依赖于`B`。
  * 构建邻接表和入度表： 
    * 邻接表：`B -> [A, C]`（`B`完成后，可以执行`A`和`C`）
    * 入度表：`A: 1, C: 1, B: 0`（`A`和`C`各有1个依赖，`B`没有依赖）
  * 由于`B`的入度为0，它可以立即执行。执行`B`，更新队列。
  * 执行`B`后，更新`A`和`C`的入度，它们的入度都变为0，可以执行。将`A`和`C`加入执行队列。
  * 根据字母顺序，先执行`A`，然后执行`C`。
  * 最终输出的执行顺序为：`B A C`。

## C++

    
    
    #include <iostream>
    #include <string>
    #include <sstream>
    #include <map>
    #include <vector>
    #include <queue>
    #include <algorithm>
    
    using namespace std;
    // 使用map和queue实现拓扑排序
    
    string findOrder(const vector<string>& dependencies) {
        map<string, vector<string>> graph; // 任务图，映射每个任务到它依赖的任务列表
        map<string, int> inDegree; // 存储每个任务的入度（依赖它的任务数量）
        
        // 构建图和计算入度
        for (const auto& dep : dependencies) {
            auto pos = dep.find("->");
            string from = dep.substr(pos + 2), to = dep.substr(0, pos);
            graph[from].push_back(to); // 添加边
            inDegree[to]++;
            if (inDegree.find(from) == inDegree.end()) inDegree[from] = 0; // 确保每个任务都在入度表中
        }
    
        // 使用queue替代ArrayList存储可以立即执行的任务（入度为0）
        queue<string> queue;
        for (const auto& pair : inDegree) {
            if (pair.second == 0) queue.push(pair.first);
        }
    
        vector<string> order; // 存储任务执行顺序
        while (!queue.empty()) {
            string current = queue.front();
            queue.pop();
            order.push_back(current);
    
            // 遍历当前任务的所有后继任务，并更新它们的入度
            for (const auto& next : graph[current]) {
                if (--inDegree[next] == 0) {
                    queue.push(next);
                }
            }
        }
    
     
    
        // 使用ostringstream组装返回的字符串
        ostringstream joinedOrder;
        for (const auto& task : order) {
            if (&task != &order[0]) joinedOrder << " ";
            joinedOrder << task;
        }
    
        return joinedOrder.str();
    }
    
    int main() {
        string input;
        getline(cin, input); // 读取一行输入
        istringstream iss(input);
        vector<string> dependencies;
        string dep;
    
        // 根据空格分割字符串
        while (getline(iss, dep, ' ')) {
            dependencies.push_back(dep);
        }
    
        // 打印任务执行的顺序
        cout << findOrder(dependencies) << endl;
    
        return 0;
    }
    

## Java

    
    
    import java.util.*;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
    
            // 读取一行输入并按空格分割，每个部分代表一个依赖关系
            String input = scanner.nextLine();
            String[] dependencies = input.split("\\s+"); // 根据空格分割输入字符串
            System.out.println(findOrder(dependencies)); // 打印任务执行的顺序
        }
    
        private static String findOrder(String[] dependencies) {
            // 用于存储图的邻接表表示，键是任务，值是依赖于键的任务列表
            Map<String, List<String>> graph = new HashMap<>();
            // 存储每个任务的入度（依赖于它的其他任务的数量）
            Map<String, Integer> inDegree = new HashMap<>();
            for (String dep : dependencies) {
                // 分割每个依赖关系为两部分，parts[1] -> parts[0]
                String[] parts = dep.split("->");
                String from = parts[1], to = parts[0]; // 注意：这里与通常的表示相反，表示to依赖于from
                // 如果from不存在于图中，则添加from并初始化其任务列表
                graph.putIfAbsent(from, new ArrayList<>());
                // 在from的任务列表中添加to，表示from完成后，可以进行to
                graph.get(from).add(to);
                // 增加to的入度
                inDegree.put(to, inDegree.getOrDefault(to, 0) + 1);
                // 确保每个任务都在入度表中，如果没有其他任务依赖于它，则入度为0
                inDegree.putIfAbsent(from, 0);
            }
    
            // 使用ArrayList代替优先队列，以便在每次循环中排序
            ArrayList<String> queue = new ArrayList<>();
            for (String task : inDegree.keySet()) {
                // 收集入度为0的任务，即可以立即执行的任务
                if (inDegree.get(task) == 0) {
                    queue.add(task);
                }
            }
    
            // 使用StringJoiner构建最终的任务执行顺序字符串
            StringJoiner order = new StringJoiner(" ");
            while (!queue.isEmpty()) {
                // 准备新队列，用于存储下一轮入度变为0的任务
                ArrayList<String> newQueue = new ArrayList<>();
    
                for (String current : queue) {
                    // 添加当前任务到执行顺序中
                    order.add(current);
                    // 遍历当前任务的所有后继任务
                    for (String next : graph.getOrDefault(current, new ArrayList<>())) {
                        // 减少后继任务的入度
                        inDegree.put(next, inDegree.get(next) - 1);
                        // 如果后继任务的入度为0，则添加到新队列中
                        if (inDegree.get(next) == 0) {
                            newQueue.add(next);
                        }
                    }
                }
    
                // 更新队列为新队列，并对其排序以保证字母顺序
                queue = newQueue;
                Collections.sort(queue);
            }
    
            // 返回构建的任务执行顺序字符串
            return order.toString();
        }
    }
    

## javaScript

    
    
    const readline = require('readline');
    
    // 创建 readline 接口实例
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
     
    rl.on("line", (input) => {
      // 根据空格分割输入字符串，得到依赖关系数组
      const dependencies = input.split(/\s+/);
      console.log(findOrder(dependencies)); // 打印任务执行的顺序
      rl.close(); // 关闭 readline 接口
    });
    
    function findOrder(dependencies) {
      // 用于存储图的邻接表表示，键是任务，值是依赖于该任务的任务列表
      const graph = {};
      // 存储每个任务的入度（依赖于它的其他任务的数量）
      const inDegree = {};
    
      dependencies.forEach(dep => {
        // 分割每个依赖关系为两部分，parts[1] -> parts[0]
        const parts = dep.split('->');
        const from = parts[1], to = parts[0]; // 注意：这里与通常的表示相反，表示 to 依赖于 from
        // 如果 from 不存在于图中，则添加 from 并初始化其任务列表
        if (!graph[from]) graph[from] = [];
        // 在 from 的任务列表中添加 to，表示 from 完成后，可以进行 to
        graph[from].push(to);
        // 增加 to 的入度
        inDegree[to] = (inDegree[to] || 0) + 1;
        // 确保每个任务都在入度表中，如果没有其他任务依赖于它，则入度为 0
        if (inDegree[from] === undefined) inDegree[from] = 0;
      });
    
      // 收集入度为 0 的任务，即可以立即执行的任务
      let queue = Object.keys(inDegree).filter(task => inDegree[task] === 0);
    
      let order = []; // 存储最终的任务执行顺序
    
      while (queue.length > 0) {
        // 对当前可执行的任务按字典序排序
        queue.sort();
        const newQueue = [];
    
        queue.forEach(current => {
          order.push(current);
          // 遍历当前任务的所有后继任务，减少它们的入度
          (graph[current] || []).forEach(next => {
            inDegree[next] -= 1;
            // 如果后继任务的入度为 0，则加入新队列
            if (inDegree[next] === 0) {
              newQueue.push(next);
            }
          });
        });
    
        // 更新队列为新队列
        queue = newQueue;
      }
    
      // 返回构建的任务执行顺序字符串
      return order.join(' ');
    }
    

## Python

    
    
    def find_order(dependencies):
        """
        根据依赖关系计算任务执行的顺序。
        
        参数:
        dependencies - 依赖关系列表，每个元素形式为 "A->B" 表示 A 依赖于 B。
        
        返回:
        任务执行的顺序，以空格分隔的字符串形式。
        """
        # 用于存储图的邻接表表示，键是任务，值是依赖于键的任务列表
        graph = {}
        # 存储每个任务的入度（依赖于它的其他任务的数量）
        in_degree = {}
    
        # 构建图和计算入度
        for dep in dependencies:
            # 分割每个依赖关系为两部分
            parts = dep.split("->")
            from_task, to_task = parts[1], parts[0]  # 注意：这里与通常的表示相反
            # 如果 from_task 不存在于图中，则添加 from_task 并初始化其任务列表
            if from_task not in graph:
                graph[from_task] = []
            # 在 from_task 的任务列表中添加 to_task
            graph[from_task].append(to_task)
            # 增加 to_task 的入度
            in_degree[to_task] = in_degree.get(to_task, 0) + 1
            # 确保每个任务都在入度表中，如果没有其他任务依赖于它，则入度为 0
            in_degree[from_task] = in_degree.get(from_task, 0)
    
        # 收集入度为 0 的任务，即可以立即执行的任务
        queue = [task for task, degree in in_degree.items() if degree == 0]
    
        order = []  # 存储最终的任务执行顺序
    
        while queue:
            # 对当前可执行的任务按字典序排序
            queue.sort()
            new_queue = []
            for current in queue:
                order.append(current)
                # 遍历当前任务的所有后继任务，减少它们的入度
                for next_task in graph.get(current, []):
                    in_degree[next_task] -= 1
                    # 如果后继任务的入度为 0，则加入新队列
                    if in_degree[next_task] == 0:
                        new_queue.append(next_task)
            queue = new_queue
    
        # 返回构建的任务执行顺序字符串
        return " ".join(order)
    
    # 主函数，读取输入并处理
    if __name__ == "__main__":
        input_str = input()
        dependencies = input_str.split()
        print(find_order(dependencies))
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    #include <string.h>
    
    #define MAX_TASKS 100
    #define MAX_DEPENDENCIES 200
    #define MAX_LEN 10
    
    // 任务结构体，包括任务名称和依赖此任务的后继任务列表
    typedef struct {
        char name[MAX_LEN];
        int inDegree; // 入度，即依赖此任务的其他任务数量
        int nextTasks[MAX_DEPENDENCIES]; // 存储后继任务的索引
        int nextCount; // 后继任务的数量
    } Task;
    
    Task tasks[MAX_TASKS]; // 所有任务的数组
    int taskCount = 0; // 任务总数
    
    // 查找或添加任务到任务数组中，并返回任务的索引
    int findOrAddTask(char* name) {
        for (int i = 0; i < taskCount; i++) {
            if (strcmp(tasks[i].name, name) == 0) return i;
        }
        strcpy(tasks[taskCount].name, name);
        tasks[taskCount].inDegree = 0;
        tasks[taskCount].nextCount = 0;
        return taskCount++;
    }
    
    // 添加依赖关系
    void addDependency(char* from, char* to) {
        int fromIndex = findOrAddTask(from);
        int toIndex = findOrAddTask(to);
        tasks[fromIndex].nextTasks[tasks[fromIndex].nextCount++] = toIndex;
        tasks[toIndex].inDegree++;
    }
    
    // 执行拓扑排序，并打印任务执行顺序
    void findOrder() {
        int queue[MAX_TASKS], start = 0, end = 0;
    
        // 找出所有入度为0的任务
        for (int i = 0; i < taskCount; i++) {
            if (tasks[i].inDegree == 0) {
                queue[end++] = i;
            }
        }
    
        // 拓扑排序主循环
        while (start < end) {
            int current = queue[start++];
            printf("%s ", tasks[current].name);
    
            // 遍历当前任务的所有后继任务
            for (int i = 0; i < tasks[current].nextCount; i++) {
                int next = tasks[current].nextTasks[i];
                // 减少后继任务的入度，并在入度变为0时加入队列
                if (--tasks[next].inDegree == 0) {
                    queue[end++] = next;
                }
            }
        }
    }
    
    int main() {
        char input[1000];
        fgets(input, sizeof(input), stdin); // 读取一行输入
    
        char* token = strtok(input, " ");
        while (token != NULL) {
            char from[MAX_LEN], to[MAX_LEN];
            sscanf(token, "%[^-]->%s", to, from); // 分割每个依赖关系
            addDependency(from, to); // 添加依赖关系
            token = strtok(NULL, " ");
        }
    
        findOrder(); // 执行拓扑排序并打印结果
    
        return 0;
    }
    

## 完整用例

### 用例1

    
    
    A->B B->C C->D D->E
    

### 用例2

    
    
    A->B
    

### 用例3

    
    
    A->B B->C C->D
    

### 用例4

    
    
    A->B C->B D->A D->C
    

### 用例5

    
    
    A->B C->D E->F
    

### 用例6

    
    
    A->B B->C C->D D->E E->F F->G
    

### 用例7

    
    
    B->A C->B D->C E->C F->A
    

### 用例8

    
    
    B->A C->A E->A C->D E->D F->D
    

### 用例9

    
    
    B->A B->D D->C A->D
    

### 用例10

    
    
    P->Q P->R Q->S R->S S->T
    

![fengmian](https://i-blog.csdnimg.cn/blog_migrate/5962ead6967cc2202f3ea846a654a634.png)

