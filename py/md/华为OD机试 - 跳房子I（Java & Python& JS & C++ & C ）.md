## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

跳房子，也叫跳飞机，是一种世界性的儿童游戏。

游戏参与者需要分多个回合按顺序跳到第1格直到房子的最后一格。

跳房子的过程中，可以向前跳，也可以向后跳。

假设房子的总格数是count，小红每回合可能连续跳的步教都放在数组steps中，请问数组中是否有一种步数的组合，可以让小红两个回合跳到量后一格?

如果有，请输出索引和最小的步数组合。

注意：

  * 数组中的步数可以重复，但数组中的元素不能重复使用。
  * 提供的数据保证存在满足题目要求的组合，且索引和最小的步数组合是唯一的。

## 输入描述

第一行输入为每回合可能连续跳的步数，它是int整数数组类型。

第二行输入为房子总格数count，它是int整数类型。

### 备注

  * count ≤ 1000
  * 0 ≤ steps.length ≤ 5000
  * -100000000 ≤ steps ≤ 100000000

## 输出描述

返回索引和最小的满足要求的步数组合（顺序保持steps中原有顺序）

## 示例1

输入

    
    
    [1,4,5,2,2]
    7
    

输出

    
    
    [5, 2]
    

说明

> ## 示例2

输入

    
    
    [-1,2,4,9,6]
    8
    

输出

    
    
    [-1, 9]
    

说明

>
> 此样例有多种组合满足两回合跳到最后，譬如：[-1,9]，[2,6]，其中[-1,9]的索引和为0+3=3，[2,6]的索和为1+4=5，所以索引和最小的步数组合[-1,9]

## 解题思路

### 题意

这道题目要求从一个给定的步数数组中找到一个步数组合，使得小红能够通过两次跳跃从第1格跳到第`count`格，并且这个组合在原数组中的索引和是最小的。输出是该步数组合中的两个步数，顺序保持与`steps`数组中的顺序一致。

**再说的明白一点，在`steps`数组中选两个数，使其之和等于`count`，并且这两个数在原数组中的索引和是最小的**

与下面这题基本一致：

https://leetcode.cn/problems/two-sum/description/

### 示例解释

  * **示例1** ：

    * 输入 `[1, 4, 5, 2, 2]` 和 `7`：

    * 一共有7个格子。步数组合中 `[5, 2]`（5 + 2 =7） 是满足条件的组合。

  * **示例2** ：

    * 输入 `[-1, 2, 4, 9, 6]` 和 `8`：
    * 一共有8个格子。步数组合中 `[-1, 9]` 和 `[2, 6]` 都满足条件。
    * 但是，`[-1, 9]`的索引和为0 + 3 = 3，而 `[2, 6]`的索引和为1 + 4 = 5，所以选择 `[-1, 9]`。

## Java

    
    
    import java.util.Arrays;
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            // 创建Scanner对象用于读取输入
            Scanner sc = new Scanner(System.in);
    
            // 读取一行输入，将其转换为int数组steps
            String tmp = sc.nextLine();
            int[] steps =
                    Arrays.stream(tmp.substring(1, tmp.length() - 1).split(","))
                            .mapToInt(Integer::parseInt)
                            .toArray();
    
            // 读取房子总格数count
            int count = Integer.parseInt(sc.nextLine());
    
            // 初始化最小索引和为最大整数值
            int minIdxSum = Integer.MAX_VALUE;
            // 初始化答案为空字符串
            String ans = "";
    
            // 使用两层循环遍历数组中的所有可能的组合
            for (int idx1 = 0; idx1 < steps.length; idx1++) {
                for (int idx2 = idx1 + 1; idx2 < steps.length; idx2++) {
                    // 获取两个步数
                    int step1 = steps[idx1];
                    int step2 = steps[idx2];
    
                    // 如果两个步数之和等于count
                    if (step1 + step2 == count) {
                        // 计算当前组合的索引和
                        int idxSum = idx1 + idx2;
                        // 如果当前组合的索引和小于已找到的最小索引和
                        if (idxSum < minIdxSum) {
                            // 更新最小索引和
                            minIdxSum = idxSum;
                            // 更新答案
                            ans = "[" + step1 + ", " + step2 + "]";
                        }
                        // 找到满足条件的组合后，跳出内层循环
                        break;
                    }
                }
            }
    
            // 输出结果
            System.out.println(ans);
        }
    }
    

## Python

    
    
    def main():
        # 读取一行输入，将其转换为 int 列表 steps
        steps = list(map(int, input()[1:-1].split(',')))
    
        # 读取房子总格数 count
        count = int(input())
    
        # 初始化最小索引和为最大整数值
        min_idx_sum = float('inf')
        # 初始化答案为空字符串
        ans = ""
    
        # 使用两层循环遍历数组中的所有可能的组合
        for idx1 in range(len(steps)):
            for idx2 in range(idx1 + 1, len(steps)):
                # 获取两个步数
                step1 = steps[idx1]
                step2 = steps[idx2]
    
                # 如果两个步数之和等于 count
                if step1 + step2 == count:
                    # 计算当前组合的索引和
                    idx_sum = idx1 + idx2
                    # 如果当前组合的索引和小于已找到的最小索引和
                    if idx_sum < min_idx_sum:
                        # 更新最小索引和
                        min_idx_sum = idx_sum
                        # 更新答案
                        ans = [step1, step2]
                    # 找到满足条件的组合后，跳出内层循环
                    break
    
        # 输出结果
        print(ans)
    
    
    if __name__ == "__main__":
        main()
    
    
    

## JavaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    const inputLines = [];
    
    // 读取输入行
    rl.on('line', (line) => {
      inputLines.push(line);
      if (inputLines.length === 2) {
        rl.close();
      }
    });
    
    rl.on('close', () => {
      // 解析输入的步数数组和房子总格数
      const steps = JSON.parse(inputLines[0]);
      const count = parseInt(inputLines[1], 10);
    
      let minIdxSum = Number.MAX_VALUE;
      let ans = '';
    
      // 遍历数组中的所有可能的组合
      for (let idx1 = 0; idx1 < steps.length; idx1++) {
        for (let idx2 = idx1 + 1; idx2 < steps.length; idx2++) {
          const step1 = steps[idx1];
          const step2 = steps[idx2];
    
          // 如果两个步数之和等于房子总格数
          if (step1 + step2 === count) {
            const idxSum = idx1 + idx2;
            // 如果当前组合的索引和小于已找到的最小索引和
            if (idxSum < minIdxSum) {
              // 更新最小索引和
              minIdxSum = idxSum;
              // 更新答案
              ans = `[${step1}, ${step2}]`;
            }
            // 找到满足条件的组合后，跳出内层循环
            break;
          }
        }
      }
    
      // 输出结果
      console.log(ans);
    });
    
    
    

## C++

    
    
    #include <iostream>
    #include <sstream>
    #include <vector>
    #include <string>
    #include <limits>
    #include <algorithm>
    using namespace std;
    int main() {
        // 读取一行输入，将其转换为 int 数组 steps
        string tmp;
        getline(cin, tmp);
        tmp = tmp.substr(1, tmp.length() - 2);
        istringstream iss(tmp);
        vector<int> steps;
        string token;
        while (getline(iss, token, ',')) {
            steps.push_back(stoi(token));
        }
    
        // 读取房子总格数 count
        int count;
        cin >> count;
    
        // 初始化最小索引和为最大整数值
        int minIdxSum = numeric_limits<int>::max();
        // 初始化答案为空字符串
        string ans = "";
    
        // 使用两层循环遍历数组中的所有可能的组合
        for (size_t idx1 = 0; idx1 < steps.size(); idx1++) {
            for (size_t idx2 = idx1 + 1; idx2 < steps.size(); idx2++) {
                // 获取两个步数
                int step1 = steps[idx1];
                int step2 = steps[idx2];
    
                // 如果两个步数之和等于 count
                if (step1 + step2 == count) {
                    // 计算当前组合的索引和
                    int idxSum = static_cast<int>(idx1 + idx2);
                    // 如果当前组合的索引和小于已找到的最小索引和
                    if (idxSum < minIdxSum) {
                        // 更新最小索引和
                        minIdxSum = idxSum;
                        // 更新答案
                        ans = "[" + to_string(step1) + ", " + to_string(step2) + "]";
                    }
                    // 找到满足条件的组合后，跳出内层循环
                    break;
                }
            }
        }
    
        // 输出结果
        cout << ans << endl;
    
        return 0;
    }
    
    
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    #include <string.h>
    #include <limits.h>
    
    int main() {
        // 定义一个字符数组用于存储输入的步数
        char tmp[10000];
        
        // 读取一行输入，将其存储在tmp中
        fgets(tmp, 10000, stdin);
    
        // 去掉首尾的方括号，并通过逗号分隔输入，转换为整数数组steps
        int steps[5000];  // 假设步数的最大长度不会超过5000
        int stepCount = 0; // 实际步数的数量
        char *token = strtok(tmp + 1, ","); // 从第二个字符开始（跳过左方括号）
        while (token != NULL && *token != ']') {
            steps[stepCount++] = atoi(token); // 将分割出的每个字符串转换为整数并存入steps数组
            token = strtok(NULL, ",");
        }
    
        // 读取房子总格数count
        int count;
        scanf("%d", &count);
    
        // 初始化最小索引和为最大整数值
        int minIdxSum = INT_MAX;
        // 初始化答案为两个步数的值
        int ans1 = 0, ans2 = 0;
    
        // 使用两层循环遍历数组中的所有可能的组合
        for (int idx1 = 0; idx1 < stepCount; idx1++) {
            for (int idx2 = idx1 + 1; idx2 < stepCount; idx2++) {
                // 获取两个步数
                int step1 = steps[idx1];
                int step2 = steps[idx2];
    
                // 如果两个步数之和等于count
                if (step1 + step2 == count) {
                    // 计算当前组合的索引和
                    int idxSum = idx1 + idx2;
                    // 如果当前组合的索引和小于已找到的最小索引和
                    if (idxSum < minIdxSum) {
                        // 更新最小索引和
                        minIdxSum = idxSum;
                        // 更新答案步数
                        ans1 = step1;
                        ans2 = step2;
                    }
                    // 找到满足条件的组合后，跳出内层循环
                    break;
                }
            }
        }
    
        // 输出结果，格式为"[step1, step2]"
        printf("[%d, %d]\n", ans1, ans2);
    
        return 0;
    }
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b0d8ff6d53693bfcf6e1605b507f3ae3.png)

## 完整用例

### 用例1

    
    
    [1,4,5,2,2]
    7
    

### 用例2

    
    
    [-1,2,4,9,6]
    8
    

### 用例3

    
    
    [1,2]
    3
    

### 用例4

    
    
    [5,3,9,6,2]
    12
    

### 用例5

    
    
    [10,5,15,2,8]
    20
    

### 用例6

    
    
    [4,1,5,3,6]
    9
    

### 用例7

    
    
    [7,2,4,1,9,7,5,5]
    14
    

### 用例8

    
    
    [6,3,5,2,4]
    11
    

### 用例9

    
    
    [4,1,3,2,5]
    8
    

### 用例10

    
    
    [6,2,7,4,9]
    13
    

