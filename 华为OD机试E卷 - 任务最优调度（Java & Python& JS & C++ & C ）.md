## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

给定一个正整数数组表示待系统执行的任务列表，数组的每一个元素代表一个任务，元素的值表示该任务的类型。

请计算执行完所有任务所需的最短时间。

任务执行规则如下:

  * 任务可以按任意顺序执行，且每个任务执行耗时间均为1个时间单位。
  * 两个同类型的任务之间必须有长度为N个单位的冷却时间，比如N为2时，在时间K执行了类型3的任务，那么K+1和K+2两个时间不能执行类型3任务。
  * 系统在任何一个单位时间内都可以执行一个任务，或者等待状态。

说明：数组最大长度为1000，速度最大值1000。

## 输入描述

第一行记录一个用半角逗号分隔的数组，数组长度不超过1000，数组元素的值不超过1000，

第二行记录任务冷却时间，N为正整数，N<=100。

## 输出描述

输出为执行完所有任务所需的最短时间。

## 示例1

输入

    
    
    2,2,2,3
    2
    

输出

    
    
    7
    

说明

> 时间1：执行类型2任务。  
>  时间2：执行类型3的任务（因为冷却时间为2，所以时间2不能执行类型2的任务）。  
>  时间3：系统等待（仍然在类型2的冷却时间）。  
>  时间4：执行类型2任务。  
>  时间5：系统等待。  
>  时间6：系统等待。  
>  时间7：执行类型2任务。  
>  因此总共耗时7。

## 解题思路

  1. **任务类型** ：输入的数组表示任务列表，每个元素表示一种任务类型，相同的数字表示同一类型的任务。例如，数组 `[2, 2, 2, 3]` 表示三个类型为 `2` 的任务和一个类型为 `3` 的任务。

  2. **冷却时间** ：在相同类型的任务之间必须间隔 `N` 个时间单位。比如，如果 `N = 2`，在某个时间执行了类型 `2` 的任务，那么接下来的 `2` 个时间单位内，不能再次执行类型 `2` 的任务。

  3. **任务执行或等待** ：系统每个时间单位要么执行任务，要么进入等待状态。即使系统没有可以执行的任务（因为冷却时间的限制），它也会进入等待，直到可以执行下一个任务。

#### 思路

  1. **优先执行任务** : 
     * 通过排序，使数量最多的任务优先执行，尽可能减少等待时间的数量。
     * 在每个时间单位内，尝试执行一个任务（如果没有任务可以执行，则进入等待状态）。
  2. **冷却机制** : 
     * 对于每个任务，在执行后会设置冷却时间，在此期间不能再次执行同类型的任务。
     * 在每个时间单位内，所有任务的冷却时间都会减少，直到冷却期结束。
  3. **时间计算** : 
     * 通过增加 `time` 变量，逐步模拟时间的流逝。每次执行任务或等待，`time` 都会增加。

## Java

    
    
    import java.util.*;
    import java.util.stream.Collectors;
    
    public class Main {
        public static void main(String[] args) {
            // 创建一个 Scanner 对象来获取用户输入
            Scanner scanner = new Scanner(System.in);
            
            // 读取第一行输入，将其转换为一个整数列表
            String input = scanner.nextLine();
            List<Integer> tasks = Arrays.stream(input.split(","))
                                        .map(Integer::parseInt)
                                        .collect(Collectors.toList());
    
            // 读取第二行输入，获取任务间的冷却时间
            int waitTime = scanner.nextInt();
    
            // 创建一个哈希映射来存储每种任务的数量
            Map<Integer, Integer> count = new HashMap<>();
            for (int t : tasks) {
                count.put(t, count.getOrDefault(t, 0) + 1);
            }
    
            // 创建一个列表来存储每种任务的数量和冷却时间
            List<int[]> taskList = new ArrayList<>();
            for (Map.Entry<Integer, Integer> entry : count.entrySet()) {
                taskList.add(new int[]{entry.getValue(), 0});
            }
    
            // 按任务数量对任务列表进行排序，数量多的任务排在前面
            Collections.sort(taskList, new Comparator<int[]>() {
                @Override
                public int compare(int[] a, int[] b) {
                    return b[0] - a[0];
                }
            });
    
            // 记录总任务数
            int total = tasks.size();
    
            // 初始化时间
            int time = 0;
    
            // 当还有任务未执行时，继续执行任务
            while (total > 0) {
                time++;
                boolean flag = true;
                for (int[] task : taskList) {
                    if (flag && task[0] > 0 && task[1] == 0) {
                        // 如果当前任务可以执行，则执行任务，并更新任务数量和冷却时间
                        flag = false;
                        task[0]--;
                        total--;
                        task[1] = waitTime;
                    } else {
                        // 如果当前任务不能执行，则减少冷却时间
                        if (task[1] > 0) {
                            task[1]--;
                        }
                    }
                }
            }
    
            // 打印执行所有任务所需的最短时间
            System.out.println(time);
        }
    }
    
    
    

## Python

    
    
    import sys
    
    input = sys.stdin.readline().strip() # 输入任务序列，以逗号分隔
    tasks = [] # 定义任务列表
    num = ""
    for c in input: # 遍历输入字符串
        if c == ',': # 如果遇到逗号
            tasks.append(int(num)) # 将当前数字字符串转换为整数并加入任务列表
            num = "" # 清空数字字符串
        else:
            num += c # 否则将当前字符加入数字字符串
    if num != "": # 如果数字字符串不为空
        tasks.append(int(num)) # 将其转换为整数并加入任务列表
    waitTime = int(sys.stdin.readline()) # 输入等待时间
    count = {} # 定义字典，用于统计每个任务出现的次数
    for t in tasks:
        if t in count:
            count[t] += 1 # 统计任务出现次数
        else:
            count[t] = 1
    taskList = [] # 定义任务列表，每个任务用一个列表表示，第一个元素为剩余次数，第二个元素为等待时间
    for t, c in count.items(): # 遍历字典
        taskList.append([c, 0]) # 将每个任务的出现次数加入任务列表
    taskList.sort(key=lambda x: x[0], reverse=True) # 按照任务出现次数从大到小排序
    total = len(tasks) # 总任务数
    time = 0 # 当前时间
    while total > 0: # 当还有任务未完成时
        time += 1 # 时间加一
        flag = True # 标记是否已经有任务开始执行
        for task in taskList: # 遍历任务列表
            if flag and task[0] > 0 and task[1] == 0: # 如果当前任务未执行且等待时间为零且还未有任务开始执行
                flag = False # 将标记设为false，表示已经有任务开始执行
                task[0] -= 1 # 当前任务剩余次数减一
                total -= 1 # 总任务数减一
                task[1] = waitTime # 将当前任务的等待时间设为输入的等待时间
            else:
                if task[1] > 0: # 如果当前任务正在等待
                    task[1] -= 1 # 等待时间减一
    print(time) # 输出完成所有任务所需的最短时间
    
    

## JavaScript

    
    
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    let tasks;
    readline.on('line', (line) => {
        if (!tasks) {
            // 读取任务列表
            tasks = line.split(',').map(Number);
        } else {
            // 读取冷却时间
            waitTime = Number(line);
            readline.close();
    
            // 创建一个映射来存储每种任务的数量
            let count = {};
            for (let t of tasks) {
                count[t] = (count[t] || 0) + 1;
            }
    
            // 创建一个列表来存储每种任务的数量和冷却时间
            let taskList = Object.entries(count).map(([k, v]) => [v, 0]);
    
            // 按任务数量对任务列表进行排序，数量多的任务排在前面
            taskList.sort((a, b) => b[0] - a[0]);
    
            // 记录总任务数
            let total = tasks.length;
    
            // 初始化时间
            let time = 0;
    
            // 当还有任务未执行时，继续执行任务
            while (total > 0) {
                time++;
                let flag = true;
                for (let task of taskList) {
                    if (flag && task[0] > 0 && task[1] === 0) {
                        // 如果当前任务可以执行，则执行任务，并更新任务数量和冷却时间
                        flag = false;
                        task[0]--;
                        total--;
                        task[1] = waitTime;
                    } else {
                        // 如果当前任务不能执行，则减少冷却时间
                        if (task[1] > 0) {
                            task[1]--;
                        }
                    }
                }
            }
    
            // 打印执行所有任务所需的最短时间
            console.log(time);
        }
    });
    
    
    

## C++

    
    
    #include <iostream>
    #include <vector>
    #include <sstream>
    #include <algorithm>
    #include <map>
    using namespace std;
    
    int main() {
        // 读取任务列表
        vector<int> tasks;
        string line;
        getline(cin, line);
        stringstream ss(line);
        for (int t; ss >> t;) {
            tasks.push_back(t);
            if (ss.peek() == ',') ss.ignore();
        }
    
        // 读取冷却时间
        int waitTime;
        cin >> waitTime;
    
        // 创建一个映射来存储每种任务的数量
        map<int, int> count;
        for (int t : tasks) {
            count[t]++;
        }
    
        // 创建一个列表来存储每种任务的数量和冷却时间
        vector<pair<int, int>> taskList;
        for (auto &entry : count) {
            taskList.push_back({entry.second, 0});
        }
    
        // 按任务数量对任务列表进行排序，数量多的任务排在前面
        sort(taskList.begin(), taskList.end(), greater<pair<int, int>>());
    
        // 记录总任务数
        int total = tasks.size();
    
        // 初始化时间
        int time = 0;
    
        // 当还有任务未执行时，继续执行任务
        while (total > 0) {
            time++;
            bool flag = true;
            for (auto &task : taskList) {
                if (flag && task.first > 0 && task.second == 0) {
                    // 如果当前任务可以执行，则执行任务，并更新任务数量和冷却时间
                    flag = false;
                    task.first--;
                    total--;
                    task.second = waitTime;
                } else {
                    // 如果当前任务不能执行，则减少冷却时间
                    if (task.second > 0) {
                        task.second--;
                    }
                }
            }
        }
    
        // 打印执行所有任务所需的最短时间
        cout << time << endl;
    
        return 0;
    }
    
    
    
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    #include <string.h>   
    
    // 比较函数，用于排序任务列表
    int compare(const void* a, const void* b) {
        return ((int*)b)[0] - ((int*)a)[0];
    }
    
    int main() {
        // 输入任务列表
        char input[1000];
        fgets(input, sizeof(input), stdin);
    
        // 创建任务数组
        int tasks[100], task_count = 0;
        char* token = strtok(input, ",");
        while (token != NULL) {
            tasks[task_count++] = atoi(token);
            token = strtok(NULL, ",");
        }
    
        // 输入冷却时间
        int waitTime;
        scanf("%d", &waitTime);
    
        // 统计每种任务的数量
        int count[1000] = {0};  // 假设任务编号最大为999
        for (int i = 0; i < task_count; i++) {
            count[tasks[i]]++;
        }
    
        // 创建任务列表
        int taskList[100][2], taskList_count = 0;
        for (int i = 0; i < 1000; i++) {
            if (count[i] > 0) {
                taskList[taskList_count][0] = count[i];  // 任务数量
                taskList[taskList_count][1] = 0;         // 冷却时间
                taskList_count++;
            }
        }
    
        // 按任务数量排序，数量多的任务排在前面
        qsort(taskList, taskList_count, sizeof(taskList[0]), compare);
    
        // 总任务数
        int total = task_count;
        int time = 0;
    
        // 执行任务
        while (total > 0) {
            time++;
            int flag = 1;  // 标志位，确保每个时间单位只执行一个任务
            for (int i = 0; i < taskList_count; i++) {
                if (flag && taskList[i][0] > 0 && taskList[i][1] == 0) {
                    // 执行任务
                    flag = 0;
                    taskList[i][0]--;
                    total--;
                    taskList[i][1] = waitTime;
                } else {
                    // 减少冷却时间
                    if (taskList[i][1] > 0) {
                        taskList[i][1]--;
                    }
                }
            }
        }
    
        // 输出总时间
        printf("%d\n", time);
    
        return 0;
    }
    
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

#### 完整用例

##### 用例1

    
    
    1,2,3
    1
    

##### 用例2

    
    
    4,4,4
    2
    

##### 用例3

    
    
    1,1,2,2,3
    1
    

##### 用例4

    
    
    1,1,1,2,2,2
    2
    

##### 用例5

    
    
    2,2,2,3
    2
    

##### 用例6

    
    
    3,1,2,3,2,1
    2
    

##### 用例7

    
    
    1,1,2,2,3,3
    4
    

##### 用例8

    
    
    1,1,2,2,3,3
    3
    

##### 用例9

    
    
    1, 1, 1, 1, 1
    5
    

##### 用例10

    
    
    1,1,2,2,2,3,3,3,3
    2
    

