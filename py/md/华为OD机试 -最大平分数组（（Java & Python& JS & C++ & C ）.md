## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

给定一个数组nums，可以将元素分为若干个组，使得每组和相等，求出满足条件的所有分组中，最大的平分组个数。

## 输入描述

第一行输入 m  
接着输入m个数，表示此数组  
数据范围:1<=M<=50, 1<=nums[i]<=50

## 输出描述

最大的平分组数个数

## 示例1

输入

    
    
    7
    4 3 2 3 5 2 1
    

输出

    
    
    4
    

说明

> 可以等分的情况有：
>
> 4 个子集（5），（1,4），（2,3），（2,3）
>
> 2 个子集（5, 1, 4），（2,3, 2,3）
>
> 最大的平分组数个数为4个。

## 示例2

输入

    
    
    9
    5 2 1 5 2 1 5 2 1
    

输出

    
    
    4
    

> 可以等分的情况有：
>
> 4 个子集（5，1），（5，1），（5，1），（2，2，2）
>
> 2 个子集（5, 1, 5,1），（2,2, 2,5,1）
>
> 最大的平分组数个数为4个。

## 解题思路

父子题：<https://blog.csdn.net/banxia_frontend/article/details/129413003>

## Java

    
    
    import java.util.Arrays;
    import java.util.Scanner;
    
    class Main {
        public static void main(String[] args) {
            Scanner sc = new Scanner(System.in);
            int n = sc.nextInt();
            sc.nextLine(); // 消耗掉换行符
    
            int[] arr = new int[n];
            int total = 0;
    
            // 读取一整行并分割成整数
            String[] inputs = sc.nextLine().split(" ");
            for (int i = 0; i < n; i++) {
                arr[i] = Integer.parseInt(inputs[i]);
                total += arr[i];
            }
    
            int maxK = findMaxK(arr, total);
            System.out.println(maxK);
        }
    
        public static int findMaxK(int[] arr, int total) {
            Arrays.sort(arr); // 对数组进行升序排序
            for (int k = arr.length; k > 0; k--) {
                if (total % k == 0 && canPartition(arr, new boolean[arr.length], k, 0, 0, total / k)) {
                    return k;
                }
            }
            return 0;
        }
    
        public static boolean canPartition(int[] arr, boolean[] used, int k, int start, int currSum, int target) {
            if (k == 0) return true; // 如果k为0，说明成功分成k个子集
            if (currSum == target) // 当前子集和达到目标和，开始下一个子集
                return canPartition(arr, used, k - 1, 0, 0, target);
    
            for (int i = start; i < arr.length; i++) {
                if (!used[i] && currSum + arr[i] <= target) { // 如果当前元素未被使用且加入后不超过目标和
                    used[i] = true; // 标记当前元素已使用
                    if (canPartition(arr, used, k, i + 1, currSum + arr[i], target)) {
                        return true;
                    }
                    used[i] = false; // 回溯，撤销选择
                }
            }
            return false; // 无法分成k个子集
        }
    }
    

## Python

    
    
    # 导入必要的模块
    import itertools
    
    def find_max_k(arr, total):
        # 对数组进行升序排序
        arr.sort()
        # 从最大可能的子集数量开始检查
        for k in range(len(arr), 0, -1):
            # 如果总和能够整除 k 并且可以分成 k 个子集
            if total % k == 0 and can_partition(arr, [False] * len(arr), k, 0, 0, total // k):
                return k
        return 0
    
    def can_partition(arr, used, k, start, curr_sum, target):
        # 如果 k 为 0，说明成功分成 k 个子集
        if k == 0:
            return True
        # 当前子集和达到目标和，开始下一个子集
        if curr_sum == target:
            return can_partition(arr, used, k - 1, 0, 0, target)
        
        # 遍历数组中的元素
        for i in range(start, len(arr)):
            # 如果当前元素未被使用且加入后不超过目标和
            if not used[i] and curr_sum + arr[i] <= target:
                used[i] = True  # 标记当前元素已使用
                if can_partition(arr, used, k, i + 1, curr_sum + arr[i], target):
                    return True
                used[i] = False  # 回溯，撤销选择
        return False  # 无法分成 k 个子集
    
    # 主函数
    def main():
        # 读取整数个数
        n = int(input())
        # 读取一整行并分割成整数
        arr = list(map(int, input().split()))
        # 计算总和
        total = sum(arr)
        # 调用查找函数并输出结果
        max_k = find_max_k(arr, total)
        print(max_k)
    
    # 程序入口
    if __name__ == "__main__":
        main()
    

## JavaScript

    
    
    // 导入 readline 模块用于处理用户输入
    const readline = require("readline");
    
    // 创建 readline 接口实例
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    function findMaxK(arr, total) {
        // 对数组进行升序排序
        arr.sort((a, b) => a - b);
        for (let k = arr.length; k > 0; k--) {
            if (total % k === 0 && canPartition(arr, new Array(arr.length).fill(false), k, 0, 0, total / k)) {
                return k;
            }
        }
        return 0;
    }
    
    function canPartition(arr, used, k, start, currSum, target) {
        if (k === 0) return true; // 如果 k 为 0，说明成功分成 k 个子集
        if (currSum === target) // 当前子集和达到目标和，开始下一个子集
            return canPartition(arr, used, k - 1, 0, 0, target);
    
        for (let i = start; i < arr.length; i++) {
            if (!used[i] && currSum + arr[i] <= target) { // 如果当前元素未被使用且加入后不超过目标和
                used[i] = true; // 标记当前元素已使用
                if (canPartition(arr, used, k, i + 1, currSum + arr[i], target)) {
                    return true;
                }
                used[i] = false; // 回溯，撤销选择
            }
        }
        return false; // 无法分成 k 个子集
    }
    
     
    rl.on("line", (n) => {
        rl.on("line", (input) => {
            const arr = input.split(" ").map(Number);
            const total = arr.reduce((a, b) => a + b, 0);
            const maxK = findMaxK(arr, total);
            console.log(maxK);
            rl.close();
        });
    });
    

## C++

    
    
    #include <iostream>
    #include <vector>
    #include <algorithm>
    using namespace std;
    
    bool canPartition(vector<int>& arr, vector<bool>& used, int k, int start, int currSum, int target) {
        if (k == 0) return true; // 如果 k 为 0，说明成功分成 k 个子集
        if (currSum == target) // 当前子集和达到目标和，开始下一个子集
            return canPartition(arr, used, k - 1, 0, 0, target);
    
        for (int i = start; i < arr.size(); i++) {
            if (!used[i] && currSum + arr[i] <= target) { // 如果当前元素未被使用且加入后不超过目标和
                used[i] = true; // 标记当前元素已使用
                if (canPartition(arr, used, k, i + 1, currSum + arr[i], target)) {
                    return true;
                }
                used[i] = false; // 回溯，撤销选择
            }
        }
        return false; // 无法分成 k 个子集
    }
    
    int findMaxK(vector<int>& arr, int total) {
        sort(arr.begin(), arr.end()); // 对数组进行升序排序
        for (int k = arr.size(); k > 0; k--) {
            vector<bool> used(arr.size(), false); // 创建一个用于标记的 vector
            if (total % k == 0 && canPartition(arr, used, k, 0, 0, total / k)) {
                return k;
            }
        }
        return 0;
    }
    
    int main() {
        int n;
        cin >> n;
        vector<int> arr(n);
        int total = 0;
    
        for (int i = 0; i < n; i++) {
            cin >> arr[i];
            total += arr[i];
        }
    
        int maxK = findMaxK(arr, total);
        cout << maxK << endl;
    
        return 0;
    }
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    
    int compare(const void* a, const void* b) {
        return (*(int*)a - *(int*)b);
    }
    
    int canPartition(int* arr, int* used, int n, int k, int start, int currSum, int target) {
        if (k == 0) return 1; // 如果 k 为 0，说明成功分成 k 个子集
        if (currSum == target) // 当前子集和达到目标和，开始下一个子集
            return canPartition(arr, used, n, k - 1, 0, 0, target);
    
        for (int i = start; i < n; i++) {
            if (!used[i] && currSum + arr[i] <= target) { // 如果当前元素未被使用且加入后不超过目标和
                used[i] = 1; // 标记当前元素已使用
                if (canPartition(arr, used, n, k, i + 1, currSum + arr[i], target)) {
                    return 1;
                }
                used[i] = 0; // 回溯，撤销选择
            }
        }
        return 0; // 无法分成 k 个子集
    }
    
    int findMaxK(int* arr, int n, int total) {
        qsort(arr, n, sizeof(int), compare); // 对数组进行升序排序
        for (int k = n; k > 0; k--) {
            int* used = (int*)calloc(n, sizeof(int));
            if (total % k == 0 && canPartition(arr, used, n, k, 0, 0, total / k)) {
                free(used);
                return k;
            }
            free(used);
        }
        return 0;
    }
    
    int main() {
        int n;
        scanf("%d", &n);
        int* arr = (int*)malloc(n * sizeof(int));
        int total = 0;
    
        for (int i = 0; i < n; i++) {
            scanf("%d", &arr[i]);
            total += arr[i];
        }
    
        int maxK = findMaxK(arr, n, total);
        printf("%d\n", maxK);
    
        free(arr);
        return 0;
    }
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/1d38648933e1f5953b674a0781e94414.png)

