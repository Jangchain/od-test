## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

跳房子，也叫跳飞机，是一种世界性的儿童游戏。游戏参与者需要分多个回合按顺序跳到第1格直到房子的最后一格，然后获得一次选房子的机会，直到所有房子被选完，房子最多的人获胜。跳房子的过程中，如果有踩线等违规行为，会结束当前回合，甚至可能倒退几步。

假设房子的总格数是count，小红每回合可能连续跳的步数都放在数组steps中，请问数组中是否有一种步数的组合，可以让小红三个回合跳到最后一格?

如果有，请输出索引和最小的步数组合（数据保证索引和最小的步数组合是唯一的）。

注意：数组中的步数可以重复，但数组中的元素不能重复使用。

## 输入描述

第一行输入为房子总格数count，它是int整数类型。  
第二行输入为每回合可能连续跳的步数，它是int整数数组类型

## 备注

  * count ≤ 10000
  * 3 ≤ steps.length ≤ 10000
  * -100000 ≤ steps[i] ≤ 100000

## 输出描述

返回索引和最小的满足要求的步数组合（顺序保持steps中原有顺序）

## 示例1

输入

    
    
    [1,4,5,2,0,2]
    9
    

输出

    
    
    [4,5,0]
    

说明

> ## 示例2

输入

    
    
    [1,5,2,0,2,4]
    9
    

输出

    
    
    [5,2,2]
    

## 示例3

输入

    
    
    [-1,2,4,9]
    12
    

输出

    
    
    [-1,4,9]
    

说明

> ## 解题思路

#### 题目分析

这道题的核心目标是找到一种跳步组合，使小红可以在 **三个回合内正好跳到最后一格** 。

具体要求如下：

  1. **总格数 count** ：这是小红需要跳到的最后一格位置。小红必须在三个回合内跳到第 `count` 格。

  2. **跳步数组 steps** ：其中包含小红每回合可能跳的步数。注意：

     * 数组中的步数可以重复使用，即每回合可以选择同一个数。
     * 每个元素只能被选择一次（不能将同一个元素用于两个或多个回合）。
  3. **输出要求** ：输出一种步数组合的索引，使得在三个回合内小红可以跳到 `count`。如果存在多种满足条件的组合，返回索引和最小的步数组合，且保持 `steps` 中的原有顺序。

#### 解题思路

  1. **问题转换** ：实际上是在 `steps` 中找到三个数，这三个数的和正好等于 `count`。

  2. **组合搜索** ：遍历 `steps` 中的三元组，找到满足条件的组合。由于题目要求输出满足条件的最小索引组合，因此找到第一个满足条件的组合后就可以返回。

  3. **条件限制** ：

     * 数组中元素取值范围较大（包括负数）。
     * 需要保证在三轮内完成。

#### 示例讲解

  * 示例1：

    * 输入：`steps = [1, 4, 5, 2, 0, 2]`，`count = 9`
    * 解释：小红可以选择 `steps[4] = 2`、`steps[5] = 2` 和 `steps[0] = 5`，正好跳到 9。
    * 输出：`[4, 5, 0]`
  * 示例2：

    * 输入：`steps = [1, 5, 2, 0, 2, 4]`，`count = 9`
    * 输出：`[5, 2, 2]`
  * 示例3：

    * 输入：`steps = [-1, 2, 4, 9]`，`count = 12`
    * 输出：`[-1, 4, 9]`

#### 总结

这道题要求找到 `steps` 中三个数的组合，和等于 `count`。

## Java

    
    
    import java.util.Arrays;
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
    
            // 读取输入的步数数组
            String inputSteps = scanner.nextLine();
            int[] stepSizes =
                    Arrays.stream(inputSteps.substring(1, inputSteps.length() - 1).split(","))
                            .mapToInt(Integer::parseInt)
                            .toArray();
    
            // 读取房子的总格数
            int totalHouses = Integer.parseInt(scanner.nextLine());
    
            int stepCount = stepSizes.length;
    
            // 创建一个新的二维数组，其中每个元素包含步数和其在原数组中的索引
            int[][] stepsWithIndex = new int[stepCount][2];
            for (int i = 0; i < stepCount; i++) {
                stepsWithIndex[i][0] = stepSizes[i];
                stepsWithIndex[i][1] = i;
            }
    
            // 对新数组按步数排序，步数相同时按索引排序
            Arrays.sort(stepsWithIndex, (a, b) -> a[0] != b[0] ? a[0] - b[0] : a[1] - b[1]);
    
            int minStepIndexSum = Integer.MAX_VALUE;
            String resultSteps = "";
    
            // 遍历排序后的数组，尝试找到满足条件的三元组
            for (int i = 0; i < stepCount; i++) {
                // 如果当前步数大于总格数，跳过
                if (stepsWithIndex[i][0] > totalHouses) break;
    
                int leftPointer = i + 1;
                int rightPointer = stepCount - 1;
    
                // 双指针法寻找剩余的两个数
                while (leftPointer < rightPointer) {
                    int stepSum = stepsWithIndex[i][0] +
                            stepsWithIndex[leftPointer][0] +
                            stepsWithIndex[rightPointer][0];
    
                    if (stepSum < totalHouses) {
                        leftPointer++; // 总和太小，左指针右移
                    } else if (stepSum > totalHouses) {
                        rightPointer--; // 总和太大，右指针左移
                    } else {
                        // 找到满足条件的三元组
                        int currentIndexSum = stepsWithIndex[i][1] +
                                stepsWithIndex[leftPointer][1] +
                                stepsWithIndex[rightPointer][1];
    
                        // 更新最优解
                        if (currentIndexSum < minStepIndexSum) {
                            minStepIndexSum = currentIndexSum;
    
                            // 按索引排序并构造结果
                            int[][] triplet = {
                                    stepsWithIndex[i],
                                    stepsWithIndex[leftPointer],
                                    stepsWithIndex[rightPointer]
                            };
                            Arrays.sort(triplet, (a, b) -> a[1] - b[1]);
    
                            StringBuilder sb = new StringBuilder("[");
                            sb.append(triplet[0][0]).append(",")
                                    .append(triplet[1][0]).append(",")
                                    .append(triplet[2][0]).append("]");
                            resultSteps = sb.toString();
                        }
    
                        // 移动指针，跳过重复值
                        while (leftPointer < rightPointer &&
                                stepsWithIndex[leftPointer][0] == stepsWithIndex[leftPointer + 1][0]) {
                            leftPointer++;
                        }
                        while (leftPointer < rightPointer &&
                                stepsWithIndex[rightPointer][0] == stepsWithIndex[rightPointer - 1][0]) {
                            rightPointer--;
                        }
    
                        leftPointer++;
                        rightPointer--;
                    }
                }
            }
    
            // 输出结果
            System.out.println(resultSteps);
        }
    }
    

## Python

    
    
    # 导入必要的模块
    import sys
    
    # 读取输入的步数数组
    input_steps = input().strip()[1:-1]  # 去掉输入字符串的首尾括号
    step_sizes = list(map(int, input_steps.split(',')))  # 转换为整数列表
    
    # 读取房子的总格数
    total_houses = int(input().strip())
    
    step_count = len(step_sizes)
    
    # 创建一个新的二维数组，其中每个元素包含步数和其在原数组中的索引
    steps_with_index = [[step_sizes[i], i] for i in range(step_count)]
    
    # 按步数排序，如果步数相同则按索引排序
    steps_with_index.sort(key=lambda x: (x[0], x[1]))
    
    min_step_index_sum = sys.maxsize  # 初始为最大值
    result_steps = ""
    
    # 遍历排序后的数组，尝试找到满足条件的三元组
    for i in range(step_count):
        # 如果当前步数大于总格数，跳过
        if steps_with_index[i][0] > total_houses:
            break
    
        left_pointer, right_pointer = i + 1, step_count - 1
    
        # 双指针法寻找剩余的两个数
        while left_pointer < right_pointer:
            step_sum = steps_with_index[i][0] + steps_with_index[left_pointer][0] + steps_with_index[right_pointer][0]
    
            if step_sum < total_houses:
                left_pointer += 1  # 总和太小，左指针右移
            elif step_sum > total_houses:
                right_pointer -= 1  # 总和太大，右指针左移
            else:
                current_index_sum = steps_with_index[i][1] + steps_with_index[left_pointer][1] + steps_with_index[right_pointer][1]
    
                # 更新最优解
                if current_index_sum < min_step_index_sum:
                    min_step_index_sum = current_index_sum
                    triplet = sorted([steps_with_index[i], steps_with_index[left_pointer], steps_with_index[right_pointer]], key=lambda x: x[1])
                    result_steps = f"[{triplet[0][0]},{triplet[1][0]},{triplet[2][0]}]"
    
                # 移动指针，跳过重复值
                while left_pointer < right_pointer and steps_with_index[left_pointer][0] == steps_with_index[left_pointer + 1][0]:
                    left_pointer += 1
                while left_pointer < right_pointer and steps_with_index[right_pointer][0] == steps_with_index[right_pointer - 1][0]:
                    right_pointer -= 1
    
                left_pointer += 1
                right_pointer -= 1
    
    # 输出结果
    print(result_steps)
    

## JavaScript

    
    
    const readline = require("readline");
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    
    rl.on("line", (inputSteps) => {
      rl.on("line", (totalHousesStr) => {
        // 将字符串转换为步数数组
        const stepSizes = inputSteps
          .slice(1, -1)
          .split(",")
          .map(Number);
    
        const totalHouses = parseInt(totalHousesStr);
        const stepCount = stepSizes.length;
    
        // 创建一个新的二维数组，每个元素包含步数和其索引
        let stepsWithIndex = stepSizes.map((step, index) => [step, index]);
    
        // 按步数排序，如果步数相同则按索引排序
        stepsWithIndex.sort((a, b) => (a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1]));
    
        let minStepIndexSum = Number.MAX_SAFE_INTEGER;
        let resultSteps = "";
    
        // 遍历数组寻找三元组
        for (let i = 0; i < stepCount; i++) {
          if (stepsWithIndex[i][0] > totalHouses) break;
    
          let leftPointer = i + 1;
          let rightPointer = stepCount - 1;
    
          // 双指针法寻找剩余的两个数
          while (leftPointer < rightPointer) {
            const stepSum =
              stepsWithIndex[i][0] +
              stepsWithIndex[leftPointer][0] +
              stepsWithIndex[rightPointer][0];
    
            if (stepSum < totalHouses) {
              leftPointer++;
            } else if (stepSum > totalHouses) {
              rightPointer--;
            } else {
              const currentIndexSum =
                stepsWithIndex[i][1] +
                stepsWithIndex[leftPointer][1] +
                stepsWithIndex[rightPointer][1];
    
              if (currentIndexSum < minStepIndexSum) {
                minStepIndexSum = currentIndexSum;
                const triplet = [
                  stepsWithIndex[i],
                  stepsWithIndex[leftPointer],
                  stepsWithIndex[rightPointer],
                ].sort((a, b) => a[1] - b[1]);
                resultSteps = `[${triplet[0][0]},${triplet[1][0]},${triplet[2][0]}]`;
              }
    
              while (
                leftPointer < rightPointer &&
                stepsWithIndex[leftPointer][0] === stepsWithIndex[leftPointer + 1][0]
              ) {
                leftPointer++;
              }
              while (
                leftPointer < rightPointer &&
                stepsWithIndex[rightPointer][0] === stepsWithIndex[rightPointer - 1][0]
              ) {
                rightPointer--;
              }
    
              leftPointer++;
              rightPointer--;
            }
          }
        }
    
        console.log(resultSteps);
        rl.close();
      });
    });
    

## C++

    
    
    #include <iostream>
    #include <vector>
    #include <algorithm>
    #include <string>
    #include <climits>
    
    using namespace std;
    
    int main() {
        string inputSteps;
        getline(cin, inputSteps); // 读取输入的步数数组
        inputSteps = inputSteps.substr(1, inputSteps.size() - 2);
    
        vector<int> stepSizes;
        int totalHouses;
        size_t pos = 0;
    
        // 解析步数数组
        while ((pos = inputSteps.find(',')) != string::npos) {
            stepSizes.push_back(stoi(inputSteps.substr(0, pos)));
            inputSteps.erase(0, pos + 1);
        }
        stepSizes.push_back(stoi(inputSteps));
    
        cin >> totalHouses;  // 读取总格数
        int stepCount = stepSizes.size();
    
        // 创建一个二维数组，其中每个元素包含步数和索引
        vector<pair<int, int>> stepsWithIndex;
        for (int i = 0; i < stepCount; i++) {
            stepsWithIndex.emplace_back(stepSizes[i], i);
        }
    
        // 按步数排序，步数相同时按索引排序
        sort(stepsWithIndex.begin(), stepsWithIndex.end());
    
        int minStepIndexSum = INT_MAX;
        string resultSteps = "";
    
        // 遍历数组查找满足条件的三元组
        for (int i = 0; i < stepCount; i++) {
            if (stepsWithIndex[i].first > totalHouses) break;
    
            int leftPointer = i + 1;
            int rightPointer = stepCount - 1;
    
            // 使用双指针法查找另外两个数
            while (leftPointer < rightPointer) {
                int stepSum = stepsWithIndex[i].first + stepsWithIndex[leftPointer].first + stepsWithIndex[rightPointer].first;
    
                if (stepSum < totalHouses) {
                    leftPointer++;
                } else if (stepSum > totalHouses) {
                    rightPointer--;
                } else {
                    int currentIndexSum = stepsWithIndex[i].second + stepsWithIndex[leftPointer].second + stepsWithIndex[rightPointer].second;
    
                    // 更新最优解
                    if (currentIndexSum < minStepIndexSum) {
                        minStepIndexSum = currentIndexSum;
    
                        // 按索引排序并构建结果字符串
                        vector<pair<int, int>> triplet = {stepsWithIndex[i], stepsWithIndex[leftPointer], stepsWithIndex[rightPointer]};
                        sort(triplet.begin(), triplet.end(), [](pair<int, int> &a, pair<int, int> &b) { return a.second < b.second; });
                        resultSteps = "[" + to_string(triplet[0].first) + "," + to_string(triplet[1].first) + "," + to_string(triplet[2].first) + "]";
                    }
    
                    // 移动指针，跳过重复值
                    while (leftPointer < rightPointer && stepsWithIndex[leftPointer].first == stepsWithIndex[leftPointer + 1].first) {
                        leftPointer++;
                    }
                    while (leftPointer < rightPointer && stepsWithIndex[rightPointer].first == stepsWithIndex[rightPointer - 1].first) {
                        rightPointer--;
                    }
    
                    leftPointer++;
                    rightPointer--;
                }
            }
        }
    
        // 输出结果
        cout << resultSteps << endl;
        return 0;
    }
    

## C语言

    
    
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/41eeb0646af79da83904835df5628896.png)

