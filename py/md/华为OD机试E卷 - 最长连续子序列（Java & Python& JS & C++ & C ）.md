## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

有N个正整数组成的一个序列。给定整数sum，求长度最长的连续[子序列](https://so.csdn.net/so/search?q=%E5%AD%90%E5%BA%8F%E5%88%97&spm=1001.2101.3001.7020)，使他们的和等于sum，返回此子序列的长度，

如果没有满足要求的序列，返回-1。

## 输入描述

第一行输入是：N个正整数组成的一个序列

第二行输入是：给定整数sum

## 输出描述

最长的连续子序列的长度

#### 备注

  * 输入序列仅由数字和英文逗号构成，数字之间采用英文逗号分隔
  * 序列长度：1 <= N <= 200
  * 输入序列不考虑异常情况

## 示例1

输入

    
    
    1,2,3,4,2
    6
    

输出

    
    
    3
    

说明

> 1,2,3和4,2两个序列均能满足要求，所以最长的连续序列为1,2,3，因此结果为3。

## 示例2

输入

    
    
    1,2,3,4,2
    20
    

输出

    
    
    -1
    

说明

> 没有满足要求的子序列，返回-1

## 解题思路

使用滑动窗口的方式来解决这个问题

  * 通过 `left` 和 `right` 这两个指针维护一个滑动窗口，`sum` 用于跟踪当前窗口内的元素和。
  * 当 `sum` 大于 `target` 时，代码缩小窗口，通过移动左指针并减少 `sum` 来调整窗口。
  * 一旦 `sum` 等于 `target`，更新最大长度 `maxLen`。

## Java

    
    
    import java.util.Arrays;
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            Scanner sc = new Scanner(System.in);
    
            int[] nums = Arrays.stream(sc.nextLine().split(",")).mapToInt(Integer::parseInt).toArray();
            int target = Integer.parseInt(sc.nextLine());
    
            int n = nums.length;
            int left = 0, right = 0, sum = 0, maxLen = -1;
    
            while (right < n) {
                // 不断扩大窗口，增加右边界
                sum += nums[right];
                right++;
    
                // 如果当前窗口内的和大于目标值，收缩左边界
                while (sum > target && left < right) {
                    sum -= nums[left];
                    left++;
                }
    
                // 检查是否等于目标值，并更新最大长度
                if (sum == target) {
                    maxLen = Math.max(maxLen, right - left);
                }
            }
    
            System.out.println(maxLen);
        }
    }
    

## Python

    
    
    nums = list(map(int, input().split(',')))
    target = int(input())
    
    n = len(nums)
    left, right, sum_, max_len = 0, 0, 0, -1
    
    while right < n:
        # 不断扩大窗口，增加右边界
        sum_ += nums[right]
        right += 1
    
        # 如果当前窗口内的和大于目标值，收缩左边界
        while sum_ > target and left < right:
            sum_ -= nums[left]
            left += 1
    
        # 检查是否等于目标值，并更新最大长度
        if sum_ == target:
            max_len = max(max_len, right - left)
    
    # 输出结果
    print(max_len)
    

## JavaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    // 读取用户输入的序列和目标值
    rl.on('line', (line1) => {
        rl.on('line', (line2) => {
            
            const nums = line1.split(',').map(Number);
            const target = parseInt(line2);
            rl.close();
    
            let n = nums.length;
            let left = 0, right = 0, sum = 0, maxLen = -1;
    
            while (right < n) {
                // 不断扩大窗口，增加右边界
                sum += nums[right];
                right++;
    
                // 如果当前窗口内的和大于目标值，收缩左边界
                while (sum > target && left < right) {
                    sum -= nums[left];
                    left++;
                }
    
                // 检查是否等于目标值，并更新最大长度
                if (sum === target) {
                    maxLen = Math.max(maxLen, right - left);
                }
            }
    
            // 输出结果
            console.log(maxLen);
        });
    });
    

## C++

    
    
    #include <iostream>
    #include <sstream>
    #include <vector>
    #include <string>
    #include <algorithm>
    using namespace std;
    
    int main() {
        string line1, line2;
        getline(cin, line1);  // 读取序列输入
        getline(cin, line2);  // 读取目标值输入
    
        // 解析输入的序列
        vector<int> nums;
        stringstream ss(line1);
        string token;
        while (getline(ss, token, ',')) {
            nums.push_back(stoi(token));
        }
    
        int target = stoi(line2);
        int n = nums.size();
        int left = 0, right = 0, sum = 0, maxLen = -1;
    
        while (right < n) {
            // 不断扩大窗口，增加右边界
            sum += nums[right];
            right++;
    
            // 如果当前窗口内的和大于目标值，收缩左边界
            while (sum > target && left < right) {
                sum -= nums[left];
                left++;
            }
    
            // 检查是否等于目标值，并更新最大长度
            if (sum == target) {
                maxLen = max(maxLen, right - left);
            }
        }
    
        // 输出结果
        cout << maxLen << endl;
        return 0;
    }
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    #include <string.h>
    
    int main() {
        char line1[1000], line2[10];
        fgets(line1, 1000, stdin);  // 读取序列输入
        fgets(line2, 10, stdin);    // 读取目标值输入
    
        // 解析输入的序列
        int nums[200], n = 0;
        char *token = strtok(line1, ",");
        while (token != NULL) {
            nums[n++] = atoi(token);
            token = strtok(NULL, ",");
        }
    
        int target = atoi(line2);
        int left = 0, right = 0, sum = 0, maxLen = -1;
    
        while (right < n) {
            // 不断扩大窗口，增加右边界
            sum += nums[right++];
            
            // 如果当前窗口内的和大于目标值，收缩左边界
            while (sum > target && left < right) {
                sum -= nums[left++];
            }
    
            // 检查是否等于目标值，并更新最大长度
            if (sum == target) {
                int len = right - left;
                if (len > maxLen) {
                    maxLen = len;
                }
            }
        }
    
        // 输出结果
        printf("%d\n", maxLen);
        return 0;
    }
    

![fengmian](https://i-blog.csdnimg.cn/blog_migrate/78fb1009326991beba9e378831f63681.png)

## 完整用例

### 用例1

    
    
    1,2,3,4,2
    6
    

### 用例2

    
    
    1,2,3,4,2
    20
    

### 用例3

    
    
    10,20,30,40,50
    90
    

### 用例4

    
    
    5,1,3,2,4,7
    8
    

### 用例5

    
    
    3,3,3,3,3
    9
    

### 用例6

    
    
    1,2,1,2,1
    4
    

### 用例7

    
    
    5,6,7,8,9
    15
    

### 用例8

    
    
    3,3,3,3,3,3,3
    21
    

### 用例9

    
    
    2,4,6,8,10,12
    22
    

### 用例10

    
    
    1,2,3,4,5,6,7
    28
    

