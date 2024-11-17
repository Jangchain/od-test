## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

实现一个支持优先级的队列，高优先级先出队列；同优先级时先进先出。

如果两个输入数据和优先级都相同，则后一个数据不入队列被丢弃。

队列存储的数据内容是一个整数。

## 输入描述

一组待存入队列的数据 (包含内容和优先级)

##### 备注

不用考虑输入数据不合法的情况，[测试数据](https://so.csdn.net/so/search?q=%E6%B5%8B%E8%AF%95%E6%95%B0%E6%8D%AE&spm=1001.2101.3001.7020)不超过100个

## 输出描述

#####

队列的数据内容(优先级信息输出时不再体现)

## 示例1

输入

    
    
    (10,1),(20,1),(30,2),(40,3)
    

输出

    
    
    40,30,10,20
    

说明

> 输入样例中，向队列写入了4个数据，每个数据由数据内容和优先级组成。  
>  输入和输出内容都不含空格。  
>  数据40的优先级最高，所以最先输出，其次是30;
>
> 10和20优先级相同，所以按输入顺序输出。

## 示例2

输入

    
    
    (10,1),(10,1),(30,2),(40,3)
    

输出

    
    
    40,30,10
    

说明

> 输入样例中，向队列写入了4个数据，每个数据由数据内容和优先级组成。  
>  输入和输出内容都不含空格。  
>  数据40的优先级最高，所以最先输出，其次是30;
>
> 两个10和10构成重复数据，被丢弃一个。

## 解题思路

题目描述要求我们实现一个**优先级队列** ，该队列具有以下特性：

  1. **优先级排序** ：当元素入队后，输出时会按照优先级从高到低排序。优先级高的元素先出队。

  2. **先进先出** ：当优先级相同的元素出现时，它们按照进入队列的顺序出队。

  3. **去重** ：如果两个元素的数据内容和优先级都相同，则后一个重复的元素不会进入队列，而是被丢弃。

#### 示例分析

##### 示例1

输入：

    
    
    (10,1),(20,1),(30,2),(40,3)
    

  * 将四个数据依次入队。其优先级分别是 `1,1,2,3`。
  * 输出顺序按优先级排序：`40`（优先级3），`30`（优先级2），`10`和`20`（优先级1，按输入顺序）。
  * 输出结果：`40,30,10,20`

##### 示例2

输入：

    
    
    (10,1),(10,1),(30,2),(40,3)
    

  * 将数据入队时，发现两个 `(10,1)` 内容和优先级都相同，丢弃后一个。
  * 按优先级排序后：`40`（优先级3），`30`（优先级2），`10`（优先级1）。
  * 输出结果：`40,30,10`

  3. 

## Java

    
    
    import java.util.*;
    
    public class Main {
      public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String input = scanner.nextLine();
    
        // 将输入数据分割并解析
        String[] taskStrings = input.substring(1, input.length() - 1).split("\\),\\(");
        TreeMap<Integer, LinkedHashSet<Integer>> priorityMap = new TreeMap<>(Collections.reverseOrder());
    
        for (String taskString : taskStrings) {
            String[] taskValues = taskString.split(",");
            int data = Integer.parseInt(taskValues[0]);
            int priority = Integer.parseInt(taskValues[1]);
    
            // 将数据按优先级存入 map，按插入顺序去重
            priorityMap.computeIfAbsent(priority, k -> new LinkedHashSet<>()).add(data);
        }
    
        // 输出结果拼接
        StringBuilder sb = new StringBuilder();
        for (LinkedHashSet<Integer> set : priorityMap.values()) {
            for (int data : set) {
                sb.append(data).append(",");
            }
        }
    
        // 去掉最后一个多余的逗号
        if (sb.length() > 0) {
            sb.setLength(sb.length() - 1);
        }
    
        System.out.println(sb.toString());
      }
    }
    
    

## Python

    
    
    from collections import defaultdict
    from collections import OrderedDict
    
    # 输入读取
    input_str = input().strip()
    
    # 解析输入字符串，去除外围括号并分割各任务
    task_strings = input_str[1:-1].split("),(")
    
    # 使用字典按优先级从高到低排序，并去重
    priority_map = defaultdict(OrderedDict)  # 使用 OrderedDict 保持插入顺序
    
    for task_string in task_strings:
        # 拆分每个任务的内容和优先级
        data, priority = map(int, task_string.split(","))
        # 根据优先级插入，并去重
        if data not in priority_map[priority]:
            priority_map[priority][data] = None
    
    # 按优先级从高到低排序输出
    result = []
    for priority in sorted(priority_map.keys(), reverse=True):
        result.extend(priority_map[priority].keys())
    
    # 输出结果
    print(",".join(map(str, result)))
    
    

## JavaScript

    
    
    const readline = require("readline");
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    rl.on("line", (input) => {
        // 去除输入的外围括号，并分割任务
        const taskStrings = input.slice(1, -1).split("),(");
        
        // 使用 Map 存储优先级，并保证插入顺序和去重
        const priorityMap = new Map();
    
        taskStrings.forEach(taskString => {
            const [data, priority] = taskString.split(",").map(Number);
            
            if (!priorityMap.has(priority)) {
                priorityMap.set(priority, new Set());
            }
            priorityMap.get(priority).add(data);
        });
    
        // 拼接输出结果
        const result = [];
        Array.from(priorityMap.keys()).sort((a, b) => b - a).forEach(priority => {
            result.push(...priorityMap.get(priority));
        });
    
        console.log(result.join(","));
        rl.close();
    });
    
    

## C++

    
    
    #include <iostream>
    #include <map>
    #include <set>
    #include <sstream>
    #include <string>
    
    using namespace std;
    
    int main() {
        string input_str;
        getline(cin, input_str);  // 读取输入字符串
    
        // 去掉外围括号
        input_str = input_str.substr(1, input_str.size() - 2);
    
        // 定义一个 map，其中 key 是优先级，value 是按插入顺序存储数据的 set
        map<int, set<int>, greater<int>> priority_map;
    
        // 分割字符串以获得各个任务
        stringstream ss(input_str);
        string task_string;
        
        while (getline(ss, task_string, ')')) {
            if (task_string[0] == ',') {
                task_string = task_string.substr(2);  // 去掉前导逗号和空格
            }
            if (task_string[0] == '(') {
                task_string = task_string.substr(1);  // 去掉开头的括号
            }
    
            // 解析数据和优先级
            int data, priority;
            char comma;
            stringstream task_ss(task_string);
            task_ss >> data >> comma >> priority;
    
            // 检查解析是否成功
            if (task_ss && comma == ',') {
                // 将数据插入到对应优先级的集合中（set 自动去重）
                priority_map[priority].insert(data);
            }
        }
    
        // 输出结果拼接
        string result;
        for (const auto& [priority, data_set] : priority_map) {
            for (int data : data_set) {
                result += to_string(data) + ",";
            }
        }
        
        // 移除最后一个多余的逗号
        if (!result.empty()) {
            result.pop_back();
        }
    
        cout << result << endl;
    
        return 0;
    }
    
    

## C语言

    
    
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

#### 完整用例

##### 用例1

    
    
    (10,1),(20,1),(30,2),(40,3)
    

##### 用例2

    
    
    (1,1),(2,1),(3,1),(4,1),(5,1),(6,1),(7,1),(8,1),(9,1),(10,1)
    

##### 用例3

    
    
    (100,2),(200,2),(300,2),(400,2),(500,2),(600,2),(700,2),(800,2),(900,2),(1000,2)
    

##### 用例4

    
    
    (1,3),(2,2),(3,1),(4,2),(5,3),(6,1),(7,2),(8,3),(9,1),(10,2)
    

##### 用例5

    
    
    (1,1),(1,1),(1,1),(1,1),(1,1),(1,1),(1,1),(1,1),(1,1),(1,1)
    

##### 用例6

    
    
    (1,1),(2,2),(3,3),(4,4),(5,5),(6,6),(7,7),(8,8),(9,9),(10,10)
    

##### 用例7

    
    
    (1,3),(2,2),(3,1),(4,2),(5,3),(6,1),(7,2),(8,3),(9,1),(10,1)
    

##### 用例8

    
    
    (1,10),(2,9),(3,8),(4,7),(5,6),(6,5),(7,4),(8,3),(9,2),(10,1)
    

##### 用例9

    
    
    (1,1),(2,3),(3,2),(4,1),(5,2)
    

##### 用例10

    
    
    (10,1),(20,1),(30,2),(40,2)
    

