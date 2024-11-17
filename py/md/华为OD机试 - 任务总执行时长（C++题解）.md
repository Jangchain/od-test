## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

任务编排服务负责对任务进行组合调度。

参与编排的任务有两种类型，其中一种执行时长为taskA，另一种执行时长为taskB。

任务一旦开始执行不能被打断，且任务可连续执行。

服务每次可以编排num个任务。

请编写一个方法，生成每次编排后的任务所有可能的总执行时长。

## 输入描述

第1行输入分别为

  * 第1种任务执行时长taskA
  * 第2种任务执行时长taskB
  * 这次要编排的任务个数num

以逗号分隔。

##### 备注

注：每种任务的数量都大于本次可以编排的任务数量

  * 0 < taskA
  * 0 < taskB
  * 0 ≤ num ≤ 100000

## 输出描述

数组形式返回所有总执行时时长，需要按从小到大排列。

## 示例1

输入

    
    
    1,2,3
    

输出

    
    
    [3, 4, 5, 6]
    

说明

> 可以执行 3 次 taskA，得到结果 3；执行 2 次 taskA和 1 次 taskB，得到结果 4 。以此类推，得到最终结果。

## 解题思路

  1. **任务类型** ：

     * 有两种任务类型：一种任务的执行时长为 `taskA`，另一种任务的执行时长为 `taskB`。
  2. **任务编排** ：

     * 每次可以编排 `num` 个任务。
     * 任务可以是任意组合的 `taskA` 和 `taskB`，但总数不能超过 `num`。
  3. **计算总执行时长** ：

     * 我们需要计算所有可能的任务组合的总执行时长。
     * 例如，如果 `num` 为 3，则可能的组合有： 
       * 3 个 `taskA`
       * 2 个 `taskA` 和 1 个 `taskB`
       * 1 个 `taskA` 和 2 个 `taskB`
       * 3 个 `taskB`
  4. **输出要求** ：

     * 输出所有可能的总执行时长，并按从小到大的顺序排列。
     * 输出结果以数组形式呈现。
  5. **示例解释** ：

     * 输入 `1,2,3` 表示 `taskA` 的执行时长为 1，`taskB` 的执行时长为 2，`num` 为 3。
     * 可能的组合及其对应的总执行时长为： 
       * 3 个 `taskA`：总时长为 `3 * 1 = 3`
       * 2 个 `taskA` 和 1 个 `taskB`：总时长为 `2 * 1 + 1 * 2 = 4`
       * 1 个 `taskA` 和 2 个 `taskB`：总时长为 `1 * 1 + 2 * 2 = 5`
       * 3 个 `taskB`：总时长为 `3 * 2 = 6`
     * 输出 `[3, 4, 5, 6]`。

通过这个方法，我们可以生成所有可能的总执行时长，并按要求输出。

## Java

    
    
    import java.util.Scanner;
    import java.util.TreeSet;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
    
            // 读入输入的任务执行时长和任务个数
            String input = scanner.nextLine();
            String[] parts = input.split(",");
            int a = Integer.parseInt(parts[0]);
            int b = Integer.parseInt(parts[1]);
            int n = Integer.parseInt(parts[2]);
    
            // 计算和输出每次编排后的任务所有可能的总执行时长
            if (n == 0) {
                System.out.println("[]");
                return;
            }
    
            if (a == b) {
                System.out.println("[" + (a * n) + "]");
                return;
            }
    
            TreeSet<Integer> durations = new TreeSet<>();
            for (int i = 0; i <= n; i++) {
                durations.add(a * i + b * (n - i));
            }
    
            StringBuilder result = new StringBuilder("[");
            for (Integer duration : durations) {
                if (result.length() > 1) {
                    result.append(", ");
                }
                result.append(duration);
            }
            result.append("]");
    
            System.out.println(result.toString());
        }
    }
    

## Python

    
    
    # 从标准输入读取一行输入
    input_line = input().strip()
    
    # 将输入字符串按逗号分割，并转换为整数
    a, b, n = map(int, input_line.split(','))
    
    # 如果任务个数为0，直接输出空列表
    if n == 0:
        print("[]")
    else:
        # 如果两个任务的执行时长相同，直接输出总时长
        if a == b:
            print(f"[{a * n}]")
        else:
            # 使用集合来存储所有可能的总时长
            durations = set()
            for i in range(n + 1):
                durations.add(a * i + b * (n - i))
            
            # 将集合转换为排序后的列表，并格式化输出
            result = "[" + ", ".join(map(str, sorted(durations))) + "]"
            print(result)
    

## JavaScript

    
    
    // 从标准输入读取数据
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    rl.on('line', (line) => {
        // 将输入字符串按逗号分割，并转换为整数
        const parts = line.trim().split(',').map(Number);
        const a = parts[0];
        const b = parts[1];
        const n = parts[2];
    
        // 如果任务个数为0，直接输出空数组
        if (n === 0) {
            console.log("[]");
        } else {
            // 如果两个任务的执行时长相同，直接输出总时长
            if (a === b) {
                console.log(`[${a * n}]`);
            } else {
                // 使用集合来存储所有可能的总时长
                const durations = new Set();
                for (let i = 0; i <= n; i++) {
                    durations.add(a * i + b * (n - i));
                }
    
                // 将集合转换为排序后的数组，并格式化输出
                const result = "[" + Array.from(durations).sort((x, y) => x - y).join(", ") + "]";
                console.log(result);
            }
        }
    
        rl.close();
    });
    

## C++

    
    
    #include <iostream>
    #include <set>
    #include <vector>
    #include <sstream>
    #include <string>
    #include <algorithm>
    
    int main() {
        std::string input;
        std::getline(std::cin, input);
    
        // 使用字符串流解析输入
        std::stringstream ss(input);
        std::string part;
        std::vector<int> parts;
    
        // 将输入字符串按逗号分割，并转换为整数
        while (std::getline(ss, part, ',')) {
            parts.push_back(std::stoi(part));
        }
    
        int a = parts[0];
        int b = parts[1];
        int n = parts[2];
    
        // 如果任务个数为0，直接输出空数组
        if (n == 0) {
            std::cout << "[]" << std::endl;
        } else {
            // 如果两个任务的执行时长相同，直接输出总时长
            if (a == b) {
                std::cout << "[" << (a * n) << "]" << std::endl;
            } else {
                // 使用集合来存储所有可能的总时长
                std::set<int> durations;
                for (int i = 0; i <= n; ++i) {
                    durations.insert(a * i + b * (n - i));
                }
    
                // 将集合转换为排序后的数组，并格式化输出
                std::cout << "[";
                for (auto it = durations.begin(); it != durations.end(); ++it) {
                    if (it != durations.begin()) {
                        std::cout << ", ";
                    }
                    std::cout << *it;
                }
                std::cout << "]" << std::endl;
            }
        }
    
        return 0;
    }
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    
    // 比较函数用于排序
    int compare(const void *a, const void *b) {
        return (*(int *)a - *(int *)b);
    }
    
    int main() {
        char input[100];
        fgets(input, sizeof(input), stdin);
    
        int a, b, n;
        // 解析输入字符串
        sscanf(input, "%d,%d,%d", &a, &b, &n);
    
        // 如果任务个数为0，直接输出空数组
        if (n == 0) {
            printf("[]\n");
        } else {
            // 如果两个任务的执行时长相同，直接输出总时长
            if (a == b) {
                printf("[%d]\n", a * n);
            } else {
                // 使用数组来存储所有可能的总时长
                int *durations = (int *)malloc((n + 1) * sizeof(int));
                int count = 0;
    
                for (int i = 0; i <= n; ++i) {
                    durations[count++] = a * i + b * (n - i);
                }
    
                // 排序数组
                qsort(durations, count, sizeof(int), compare);
    
                // 输出结果
                printf("[");
                for (int i = 0; i < count; ++i) {
                    if (i > 0) {
                        printf(", ");
                    }
                    printf("%d", durations[i]);
                }
                printf("]\n");
    
                // 释放动态分配的内存
                free(durations);
            }
        }
    
        return 0;
    }
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/708d521b9433c28936aca981303b6edf.png)

