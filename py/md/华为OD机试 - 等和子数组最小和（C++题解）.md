## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

给定一个数组nums，将元素分为若干个组，使得每组和相等，求出满足条件的所有分组中，组内元素和的最小值。

## 输入描述

第一行输入 m  
接着输入m个数，表示此数组nums  
数据范围：1<=m<=50, 1<=nums[i]<=50

## 输出描述

最小拆分数组和

## 示例1

输入

    
    
    7
    4 3 2 3 5 2 1
    

输出

    
    
    5
    

说明

> 可以等分的情况有：
>
> 4 个子集（5），（1,4），（2,3），（2,3）
>
> 2 个子集（5, 1, 4），（2,3, 2,3）
>
> 但最小的为5。

## 解题思路

题目的意思是，将给定的数组 `nums` 分成若干个子集，使得每个子集的元素和相等，要求找出所有满足条件的分组中，每个子集的和的最小值。

#### 解题思路：

  1. **分组和相等** ：如果数组 `nums` 可以分成若干个组，使得每个组的和都相等，那么这些组的和会是某个值 `k`。在题目中，`k` 即为我们要找的最小值。
  2. **查找可能的分组方式** ：根据数组的元素和，尝试将数组划分为不同的组数，计算满足分组条件时的每组和 `k`，并记录可能的 `k` 中的最小值。
  3. **输出最小值** ：找到满足条件的最小 `k`，输出它作为结果。

## Java

    
    
    import java.util.Scanner;
    import java.util.Arrays;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            int arrayLength = scanner.nextInt(); // 输入数组长度
            int[] numbers = new int[arrayLength];
            int totalSum = 0;
    
            // 读入数组并计算总和
            for (int i = 0; i < arrayLength; i++) {
                numbers[i] = scanner.nextInt();
                totalSum += numbers[i];
            }
    
            // 从小组数量 arrayLength 开始尝试分组
            for (int groupCount = arrayLength; groupCount > 0; groupCount--) {
                if (totalSum % groupCount == 0) { // 剪枝：只有总和能被整除时才尝试
                    int groupSumTarget = totalSum / groupCount; // 每组的目标和
                    if (canPartitionIntoKSubsets(numbers, groupCount, groupSumTarget)) {
                        System.out.println(groupSumTarget); // 输出最小组和
                        break;
                    }
                }
            }
        }
    
        public static boolean canPartitionIntoKSubsets(int[] numbers, int groupCount, int groupSumTarget) {
            Arrays.sort(numbers); // 排序，优先放大数，减少递归深度
            int arrayLength = numbers.length;
            if (numbers[arrayLength - 1] > groupSumTarget) { // 剪枝：如果最大元素大于目标值，直接返回
                return false;
            }
    
            // 回溯辅助数组，用于标记元素是否被使用
            boolean[] isUsed = new boolean[arrayLength];
            return attemptPartition(numbers, isUsed, arrayLength - 1, 0, groupSumTarget, groupCount);
        }
    
        private static boolean attemptPartition(int[] numbers, boolean[] isUsed, int currentIndex, int currentSum, int groupSumTarget, int remainingGroups) {
            if (remainingGroups == 0) { // 当所有子集划分完成时返回 true
                return true;
            }
            if (currentSum == groupSumTarget) { // 当前子集已达目标和，开始下一子集的划分
                return attemptPartition(numbers, isUsed, numbers.length - 1, 0, groupSumTarget, remainingGroups - 1);
            }
    
            for (int i = currentIndex; i >= 0; i--) {
                if (isUsed[i]) { // 剪枝：当前元素已被使用
                    continue;
                }
                if (currentSum + numbers[i] > groupSumTarget) { // 剪枝：当前和超出目标值
                    break;
                }
    
                isUsed[i] = true; // 标记元素已使用
                if (attemptPartition(numbers, isUsed, i - 1, currentSum + numbers[i], groupSumTarget, remainingGroups)) { // 递归尝试
                    return true;
                }
                isUsed[i] = false; // 回溯，撤销标记
            }
            return false; // 无法划分返回 false
        }
    }
    

## Python

    
    
    def can_partition_into_k_subsets(numbers, group_count, group_sum_target):
        # 排序，优先放大数，减少递归深度
        numbers.sort()
        if numbers[-1] > group_sum_target:  # 剪枝：如果最大元素大于目标值，直接返回 False
            return False
    
        # 回溯辅助数组，用于标记元素是否被使用
        is_used = [False] * len(numbers)
        return attempt_partition(numbers, is_used, len(numbers) - 1, 0, group_sum_target, group_count)
    
    
    def attempt_partition(numbers, is_used, current_index, current_sum, group_sum_target, remaining_groups):
        if remaining_groups == 0:  # 当所有子集划分完成时返回 True
            return True
        if current_sum == group_sum_target:  # 当前子集已达目标和，开始下一子集的划分
            return attempt_partition(numbers, is_used, len(numbers) - 1, 0, group_sum_target, remaining_groups - 1)
    
        for i in range(current_index, -1, -1):
            if is_used[i]:  # 剪枝：当前元素已被使用
                continue
            if current_sum + numbers[i] > group_sum_target:  # 剪枝：当前和超出目标值
                break
    
            is_used[i] = True  # 标记元素已使用
            if attempt_partition(numbers, is_used, i - 1, current_sum + numbers[i], group_sum_target, remaining_groups):  # 递归尝试
                return True
            is_used[i] = False  # 回溯，撤销标记
    
        return False  # 无法划分返回 False
    
    
    def main():
        array_length = int(input())  # 输入数组长度
        numbers = list(map(int, input().split())) # 创建数组
        total_sum = sum(numbers)  # 计算总和
    
        # 从小组数量 array_length 开始尝试分组
        for group_count in range(array_length, 0, -1):
            if total_sum % group_count == 0:  # 剪枝：只有总和能被整除时才尝试
                group_sum_target = total_sum // group_count  # 每组的目标和
                if can_partition_into_k_subsets(numbers, group_count, group_sum_target):
                    print(group_sum_target)  # 输出最小组和
                    break
    
    
    if __name__ == "__main__":
        main()
    

## JavaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    // 声明 nums 数组和 sum 变量
    let nums = [];
    let sum = 0;
    
    function canPartitionKSubsets(numbers, groupCount, groupSumTarget) {
        numbers.sort((a, b) => a - b);
        if (numbers[numbers.length - 1] > groupSumTarget) return false;
    
        const isUsed = new Array(numbers.length).fill(false);
        return attemptPartition(numbers, isUsed, numbers.length - 1, 0, groupSumTarget, groupCount);
    }
    
    function attemptPartition(numbers, isUsed, currentIndex, currentSum, groupSumTarget, remainingGroups) {
        if (remainingGroups === 0) return true;
        if (currentSum === groupSumTarget) {
            return attemptPartition(numbers, isUsed, numbers.length - 1, 0, groupSumTarget, remainingGroups - 1);
        }
    
        for (let i = currentIndex; i >= 0; i--) {
            if (isUsed[i]) continue;
            if (currentSum + numbers[i] > groupSumTarget) break;
    
            isUsed[i] = true;
            if (attemptPartition(numbers, isUsed, i - 1, currentSum + numbers[i], groupSumTarget, remainingGroups)) {
                return true;
            }
            isUsed[i] = false;
        }
    
        return false;
    }
    
    // 监听第一行输入，用于读取数组大小
    rl.on('line', (line) => {
        const n = parseInt(line);
        
        // 再次监听'line'事件，用于读取数组元素
        rl.on('line', (line) => {
            nums = line.split(' ').map(num => parseInt(num));
            sum = nums.reduce((acc, cur) => acc + cur, 0);
            
            // 从 n 开始递减，寻找可以将数组分为 m 个子集的最小和
            for (let m = n; m > 0; m--) {
                if (sum % m === 0) {  // 检查能否整除
                    const groupSumTarget = sum / m;
                    if (canPartitionKSubsets(nums, m, groupSumTarget)) {
                        console.log(groupSumTarget);
                        break;
                    }
                }
            }
            rl.close(); // 关闭 readline
        });
    });
    

## C++

    
    
    #include <iostream>
    #include <vector>
    #include <algorithm>
    
    using namespace std;
    
    bool attemptPartition(vector<int>& numbers, vector<bool>& isUsed, int currentIndex, int currentSum, int groupSumTarget, int remainingGroups) {
        if (remainingGroups == 0) return true; // 当所有子集划分完成时返回 true
        if (currentSum == groupSumTarget) // 当前子集已达目标和，开始下一子集的划分
            return attemptPartition(numbers, isUsed, numbers.size() - 1, 0, groupSumTarget, remainingGroups - 1);
    
        for (int i = currentIndex; i >= 0; --i) {
            if (isUsed[i]) continue; // 剪枝：当前元素已被使用
            if (currentSum + numbers[i] > groupSumTarget) break; // 剪枝：当前和超出目标值
    
            isUsed[i] = true; // 标记元素已使用
            if (attemptPartition(numbers, isUsed, i - 1, currentSum + numbers[i], groupSumTarget, remainingGroups))
                return true;
            isUsed[i] = false; // 回溯，撤销标记
        }
        return false;
    }
    
    bool canPartitionIntoKSubsets(vector<int>& numbers, int groupCount, int groupSumTarget) {
        sort(numbers.begin(), numbers.end()); // 排序，优先放大数，减少递归深度
        if (numbers.back() > groupSumTarget) return false; // 剪枝：如果最大元素大于目标值，直接返回
    
        vector<bool> isUsed(numbers.size(), false);
        return attemptPartition(numbers, isUsed, numbers.size() - 1, 0, groupSumTarget, groupCount);
    }
    
    int main() {
        int arrayLength;
     
        cin >> arrayLength;
    
        vector<int> numbers(arrayLength);
        int totalSum = 0;
        for (int i = 0; i < arrayLength; i++) {
            cin >> numbers[i];
            totalSum += numbers[i];
        }
    
        for (int groupCount = arrayLength; groupCount > 0; groupCount--) {
            if (totalSum % groupCount == 0) {
                int groupSumTarget = totalSum / groupCount;
                if (canPartitionIntoKSubsets(numbers, groupCount, groupSumTarget)) {
                    cout <<  groupSumTarget << endl;
                    break;
                }
            }
        }
    
        return 0;
    }
    

## C语言

    
    
    #include <stdio.h>
    #include <stdbool.h>
    #include <stdlib.h>
    
    int compare(const void* a, const void* b) {
        return (*(int*)a - *(int*)b);
    }
    
    bool attemptPartition(int* numbers, bool* isUsed, int currentIndex, int currentSum, int groupSumTarget, int remainingGroups, int arrayLength) {
        if (remainingGroups == 0) return true;
        if (currentSum == groupSumTarget) 
            return attemptPartition(numbers, isUsed, arrayLength - 1, 0, groupSumTarget, remainingGroups - 1, arrayLength);
    
        for (int i = currentIndex; i >= 0; --i) {
            if (isUsed[i]) continue;
            if (currentSum + numbers[i] > groupSumTarget) break;
    
            isUsed[i] = true;
            if (attemptPartition(numbers, isUsed, i - 1, currentSum + numbers[i], groupSumTarget, remainingGroups, arrayLength)) {
                return true;
            }
            isUsed[i] = false;
        }
        return false;
    }
    
    bool canPartitionIntoKSubsets(int* numbers, int groupCount, int groupSumTarget, int arrayLength) {
        qsort(numbers, arrayLength, sizeof(int), compare);
        if (numbers[arrayLength - 1] > groupSumTarget) return false;
    
        bool isUsed[arrayLength];
        for (int i = 0; i < arrayLength; i++) isUsed[i] = false;
        return attemptPartition(numbers, isUsed, arrayLength - 1, 0, groupSumTarget, groupCount, arrayLength);
    }
    
    int main() {
        int arrayLength;
     
        scanf("%d", &arrayLength);
    
        int numbers[arrayLength];
        int totalSum = 0;
        for (int i = 0; i < arrayLength; i++) {
            scanf("%d", &numbers[i]);
            totalSum += numbers[i];
        }
    
        for (int groupCount = arrayLength; groupCount > 0; groupCount--) {
            if (totalSum % groupCount == 0) {
                int groupSumTarget = totalSum / groupCount;
                if (canPartitionIntoKSubsets(numbers, groupCount, groupSumTarget, arrayLength)) {
                    printf("%d\n", groupSumTarget);
                    break;
                }
            }
        }
    
        return 0;
    }
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/c6c870323fcc4aae2a901b142d7e96e3.png)

#### 完整用例

##### 用例1

    
    
    6
    1 2 3 4 5 6
    

##### 用例2

    
    
    5
    3 1 4 2 2
    

##### 用例3

    
    
    8
    1 1 1 2 2 2 3 3
    

##### 用例4

    
    
    4
    4 4 4 4
    

##### 用例5

    
    
    10
    1 1 1 1 1 1 1 1 1 9
    

##### 用例6

    
    
    9
    3 3 3 3 3 3 3 3 3
    

##### 用例7

    
    
    5
    5 5 5 5 5
    

##### 用例8

    
    
    7
    2 2 2 2 2 2 2
    

##### 用例9

    
    
    6
    6 6 6 6 6 6
    

##### 用例10

    
    
    8
    1 1 2 2 2 2 3 3
    

