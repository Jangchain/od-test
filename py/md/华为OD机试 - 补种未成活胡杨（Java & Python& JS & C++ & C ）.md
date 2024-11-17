## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

近些年来，我国防沙治沙取得显著成果。某沙漠新种植N棵胡杨（编号1-N），排成一排。

一个月后，有M棵胡杨未能成活。

现可补种胡杨K棵，请问如何补种（只能补种，不能新种），可以得到最多的连续胡杨树？

## 输入描述

N 总种植数量，1 <= N <= 100000

M 未成活胡杨数量，M 个空格分隔的数，按编号从小到大排列，1 <= M <= N

K 最多可以补种的数量，0 <= K <= M

## 输出描述

最多的连续胡杨棵树

## 示例1

输入

    
    
    5
    2
    2 4
    1
    

输出

    
    
    3
    

说明

> 补种到2或4结果一样，最多的连续胡杨棵树都是3。

## 示例2

输入

    
    
    10
    3
    2 4 7
    1
    

输出

    
    
    6
    

说明

> 种第7棵树，最多连续胡杨树棵数位6（5，6，7，8，9，10）

## 解题思路

这道题目主要是考察如何通过补种胡杨树，使得胡杨树形成【最长的连续序列】。

### 示例解释

#### 示例1

输入：

    
    
    5
    2
    2 4
    1
    

解释：

  * 胡杨树总共有 5 棵，编号分别是 1, 2, 3, 4, 5。
  * 未成活的胡杨树编号是 2 和 4。
  * 只能补种 1 棵树。

选择补种位置：

  * 可以补种编号为2的树，得到序列 `1, 2, 3`，最多连续 3 棵树。
  * 或者补种编号为4的树，得到序列 `3, 4, 5`，同样可以得到最多连续 3 棵树。

因此，输出结果为 `3`。

#### 示例2

输入：

    
    
    10
    3
    2 4 7
    1
    

解释：

  * 胡杨树总共有 10 棵，编号分别是 1 到 10。
  * 未成活的胡杨树编号是 2, 4, 7。
  * 只能补种 1 棵树。

选择补种位置：

  * 如果补种编号为7的树，可以形成最长连续序列 `5, 6, 7, 8, 9, 10`，连续的胡杨树棵数为 `6`。
  * 其他补种选择（如2或4）得到的最长连续胡杨树棵数较少。

因此，输出结果为 `6`。

### 代码思路

基本与下题一致：

[1004\. 最大连续1的个数 III](https://leetcode.cn/problems/max-consecutive-ones-iii/)

参考题解：https://leetcode.cn/problems/max-consecutive-ones-
iii/solutions/608931/zui-da-lian-xu-1de-ge-shu-iii-by-leetcod-hw12/

## 双指针解法，容易理解

## Java

    
    
    import java.util.*;
    
    public class Main {
        public static void main(String[] args) {
            // 创建一个扫描器对象，用于读取输入
            Scanner scanner = new Scanner(System.in);
            
            // 读取总共的胡杨树数量
            int total = scanner.nextInt();
            
            // 读取未成活的胡杨树数量
            int deadCount = scanner.nextInt();
            
            // 创建一个数组来表示每棵树是否成活，0表示成活，1表示未成活
            int[] nums = new int[total];
            
            // 初始化数组，所有元素设为0，表示所有树最初都是成活的
            Arrays.fill(nums, 0);
     
            // 根据输入，将未成活的树的位置标记为1
            for (int i = 0; i < deadCount; i++) {
                int num = scanner.nextInt();
                nums[num - 1] = 1; // 树的编号从1开始，因此需要减1
            }
            
            // 读取可以补种的树的数量
            int supplementCount = scanner.nextInt();
            
            // 初始化滑动窗口的左右边界
            int left = 0;
            int maxLen = 0; // 用于存储最大连续成活区域的长度
            int sumLeft = 0; // 滑动窗口左边界的未成活树数量
            int sumRight = 0; // 滑动窗口右边界的未成活树数量
            
            // 遍历所有的树，right代表滑动窗口的右边界
            for (int right = 0; right < total; right++) {
                sumRight += nums[right]; // 更新右边界的未成活树数量
                
                // 如果窗口内的未成活树数量大于可以补种的数量
                while (sumRight - sumLeft > supplementCount) {
                    sumLeft += nums[left]; // 缩小窗口，左边界右移
                    left++;
                }
                
                // 更新最大成活区域的长度
                maxLen = Math.max(maxLen, right - left + 1);
            }
            
            // 输出最大连续成活区域的长度
            System.out.println(maxLen);
        }
    }
    

## Python

    
    
    # 读取胡杨树的总数N
    total = int(input())
    
    # 读取未成活胡杨树的数量M
    dead_count = int(input())
    
    # 读取未成活胡杨树的编号列表
    dead_list = list(map(int, input().split()))
    
    # 读取可以补种的胡杨树数量K
    supplement_count = int(input())
    
    # 初始化数组，所有树最初都是成活的，0表示成活，1表示未成活
    nums = [0] * total
    
    # 根据输入，将未成活的树的位置标记为1
    for num in dead_list:
        nums[num - 1] = 1  # 树的编号从1开始，因此需要减1
    
    # 初始化滑动窗口的左右边界
    left = 0
    max_len = 0  # 用于存储最大连续成活区域的长度
    sum_left = 0  # 滑动窗口左边界的未成活树数量
    sum_right = 0  # 滑动窗口右边界的未成活树数量
    
    # 遍历所有的树，right代表滑动窗口的右边界
    for right in range(total):
        sum_right += nums[right]  # 更新右边界的未成活树数量
        
        # 如果窗口内的未成活树数量大于可以补种的数量
        while sum_right - sum_left > supplement_count:
            sum_left += nums[left]  # 缩小窗口，左边界右移
            left += 1
        
        # 更新最大成活区域的长度
        max_len = max(max_len, right - left + 1)
    
    # 输出最大连续成活区域的长度
    print(max_len)
    

## JavaScript

    
    
    const readline = require('readline');
    
    
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    const inputLines = [];
    rl.on('line', (input) => {
        inputLines.push(input);
    });
    
    rl.on('close', () => {
        // 读取胡杨树的总数N
        const total = parseInt(inputLines[0]);
    
        // 读取未成活胡杨树的数量M
        const deadCount = parseInt(inputLines[1]);
    
        // 读取未成活胡杨树的编号列表
        const deadList = inputLines[2].split(' ').map(Number);
    
        // 读取可以补种的胡杨树数量K
        const supplementCount = parseInt(inputLines[3]);
    
        // 初始化数组，所有树最初都是成活的，0表示成活，1表示未成活
        const nums = new Array(total).fill(0);
    
        // 根据输入，将未成活的树的位置标记为1
        deadList.forEach(num => {
            nums[num - 1] = 1; // 树的编号从1开始，因此需要减1
        });
    
        // 初始化滑动窗口的左右边界
        let left = 0;
        let maxLen = 0; // 用于存储最大连续成活区域的长度
        let sumLeft = 0; // 滑动窗口左边界的未成活树数量
        let sumRight = 0; // 滑动窗口右边界的未成活树数量
    
        // 遍历所有的树，right代表滑动窗口的右边界
        for (let right = 0; right < total; right++) {
            sumRight += nums[right]; // 更新右边界的未成活树数量
            
            // 如果窗口内的未成活树数量大于可以补种的数量
            while (sumRight - sumLeft > supplementCount) {
                sumLeft += nums[left]; // 缩小窗口，左边界右移
                left++;
            }
            
            // 更新最大成活区域的长度
            maxLen = Math.max(maxLen, right - left + 1);
        }
    
        // 输出最大连续成活区域的长度
        console.log(maxLen);
    });
    

## C++

    
    
    #include <iostream>
    #include <vector>
    #include <algorithm> 
    
    using namespace std;
    
    int main() {
        int total, deadCount;
        cin >> total >> deadCount;
    
        // 初始化数组，所有树最初都是成活的，0表示成活，1表示未成活
        vector<int> nums(total, 0);
    
        // 根据输入，将未成活的树的位置标记为1
        for (int i = 0; i < deadCount; i++) {
            int num;
            cin >> num;
            nums[num - 1] = 1; // 树的编号从1开始，因此需要减1
        }
    
        // 读取可以补种的树的数量
        int supplementCount;
        cin >> supplementCount;
    
        // 初始化滑动窗口的左右边界
        int left = 0, maxLen = 0, sumLeft = 0, sumRight = 0;
    
        // 遍历所有的树，right代表滑动窗口的右边界
        for (int right = 0; right < total; right++) {
            sumRight += nums[right]; // 更新右边界的未成活树数量
    
            // 如果窗口内的未成活树数量大于可以补种的数量
            while (sumRight - sumLeft > supplementCount) {
                sumLeft += nums[left]; // 缩小窗口，左边界右移
                left++;
            }
    
            // 更新最大成活区域的长度
            maxLen = max(maxLen, right - left + 1);
        }
    
        // 输出最大连续成活区域的长度
        cout << maxLen << endl;
    
        return 0;
    }
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    
    // 定义一个max函数，用于求两个数中的最大值
    int max(int a, int b) {
        return (a > b) ? a : b;
    }
    
    int main() {
        int total, deadCount;
    
        scanf("%d %d", &total, &deadCount);
    
        // 初始化数组，所有树最初都是成活的，0表示成活，1表示未成活
        int *nums = (int *)calloc(total, sizeof(int));
    
        // 根据输入，将未成活的树的位置标记为1
        for (int i = 0; i < deadCount; i++) {
            int num;
            scanf("%d", &num);
            nums[num - 1] = 1; // 树的编号从1开始，因此需要减1
        }
    
        // 读取可以补种的树的数量
        int supplementCount;
        scanf("%d", &supplementCount);
    
        // 初始化滑动窗口的左右边界
        int left = 0, maxLen = 0, sumLeft = 0, sumRight = 0;
    
        // 遍历所有的树，right代表滑动窗口的右边界
        for (int right = 0; right < total; right++) {
            sumRight += nums[right]; // 更新右边界的未成活树数量
    
            // 如果窗口内的未成活树数量大于可以补种的数量
            while (sumRight - sumLeft > supplementCount) {
                sumLeft += nums[left]; // 缩小窗口，左边界右移
                left++;
            }
    
            // 更新最大成活区域的长度
            maxLen = max(maxLen, right - left + 1);
        }
    
        // 输出最大连续成活区域的长度
        printf("%d\n", maxLen);
    
        // 释放动态分配的内存
        free(nums);
    
        return 0;
    }
    

## 单指针解法，比较难理解

## Java

    
    
    import java.util.Scanner;
    import java.util.ArrayList;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            
            // 读取胡杨树的总数N
            int total = scanner.nextInt();
            
            // 读取未成活胡杨树的数量M
            int deadCount = scanner.nextInt();
    
            // 存储未成活胡杨树编号的列表
            ArrayList<Integer> deadList = new ArrayList<>();
            
            // 读取未成活胡杨树的编号
            for (int i = 0; i < deadCount; i++) {
                int num = scanner.nextInt();
                deadList.add(num);
            }
    
            // 读取可以补种的胡杨树数量K
            int supplementCount = scanner.nextInt();
            
            // 初始化最大连续胡杨树的长度
            int maxLen = 0;
            
            // 遍历可能的补种位置，寻找最长连续胡杨树的长度
            for (int i = supplementCount - 1; i < deadCount; i++) {
                if (i == supplementCount - 1) {
                    // 考虑补种后，从开头到第一个无法成活的区域
                    maxLen = Math.max(maxLen, supplementCount == deadCount ? total : deadList.get(supplementCount) - 1);
                } else if (i == deadCount - 1) {
                    // 考虑补种后，从最后一个无法成活的区域到结尾
                    maxLen = Math.max(maxLen, total - deadList.get(i - supplementCount));
                } else {
                    // 计算补种后的最大连续胡杨树
                    maxLen = Math.max(maxLen, deadList.get(i + 1) - deadList.get(i - supplementCount) - 1);
                }
            }
    
            // 输出结果
            System.out.println(maxLen);
        }
    }
    

## Python

    
    
    # 读取胡杨树的总数N
    total = int(input())
    
    # 读取未成活胡杨树的数量M
    deadCount = int(input())
    
    # 读取未成活胡杨树的编号列表
    deadList = list(map(int, input().split()))
    
    # 读取可以补种的胡杨树数量K
    supplementCount = int(input())
    
    # 初始化最大连续胡杨树的长度
    maxLen = 0
    
    # 遍历可能的补种位置，寻找最长连续胡杨树的长度
    for i in range(supplementCount-1, deadCount):
        if i == supplementCount-1:
            # 考虑补种后，从开头到第一个无法成活的区域
            maxLen = max(maxLen, total if supplementCount == deadCount else deadList[supplementCount]-1)
        elif i == deadCount-1:
            # 考虑补种后，从最后一个无法成活的区域到结尾
            maxLen = max(maxLen, total - deadList[i-supplementCount])
        else:
            # 计算补种后的最大连续胡杨树
            maxLen = max(maxLen, deadList[i+1]-deadList[i-supplementCount]-1)
    
    # 输出结果
    print(maxLen)
    

## JavaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    let totalNum, deadNum, deadIdx, maxReplantNum;
    
    rl.on('line', (input) => {
      if (!totalNum) {
        // 读取胡杨树的总数N
        totalNum = parseInt(input);
      } else if (!deadNum) {
        // 读取未成活胡杨树的数量M
        deadNum = parseInt(input);
      } else if (!deadIdx) {
        // 读取未成活胡杨树的编号列表
        deadIdx = input.split(' ').map(Number);
      } else {
        // 读取可以补种的胡杨树数量K
        maxReplantNum = parseInt(input);
        
        let max = 0;
        
        // 遍历可能的补种位置，寻找最长连续胡杨树的长度
        for (let i = maxReplantNum - 1; i < deadNum; i++) {
          if (i === maxReplantNum - 1) {
            // 考虑补种后，从开头到第一个无法成活的区域
            max = Math.max(max, maxReplantNum === deadNum ? totalNum : deadIdx[maxReplantNum] - 1);
          } else if (i === deadNum - 1) {
            // 考虑补种后，从最后一个无法成活的区域到结尾
            max = Math.max(max, totalNum - deadIdx[i - maxReplantNum]);
          } else {
            // 计算补种后的最大连续胡杨树
            max = Math.max(max, deadIdx[i + 1] - deadIdx[i - maxReplantNum] - 1);
          }
        }
        
        // 输出结果
        console.log(max);
        rl.close();
      }
    });
    

## C++

    
    
    #include <iostream>
    #include <vector>
    #include <algorithm>
    
    using namespace std;
    
    int main() {
        // 读取胡杨树的总数N
        int total;
        int deadCount;
        cin >> total >> deadCount;
    
        // 存储未成活胡杨树编号的列表
        vector<int> deadList;
        for (int i = 0; i < deadCount; i++) {
            int num;
            cin >> num;
            deadList.push_back(num);
        }
    
        // 读取可以补种的胡杨树数量K
        int supplementCount;
        cin >> supplementCount;
    
        // 初始化最大连续胡杨树的长度
        int maxLen = 0;
    
        // 遍历可能的补种位置，寻找最长连续胡杨树的长度
        for (int i = supplementCount - 1; i < deadCount; i++) {
            if (i == supplementCount - 1) {
                // 考虑补种后，从开头到第一个无法成活的区域
                maxLen = max(maxLen, supplementCount == deadCount ? total : deadList[supplementCount-1] - 1);
            } else if (i == deadCount - 1) {
                // 考虑补种后，从最后一个无法成活的区域到结尾
                maxLen = max(maxLen, total - deadList[i - supplementCount]);
            } else {
                // 计算补种后的最大连续胡杨树
                maxLen = max(maxLen, deadList[i + 1] - deadList[i - supplementCount] - 1);
            }
        }
    
        // 输出结果
        cout << maxLen << endl;
    
        return 0;
    }
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    
    int main() {
        // 读取胡杨树的总数N
        int total, deadCount;
        scanf("%d %d", &total, &deadCount);
    
        // 分配内存用于存储未成活胡杨树的编号
        int* deadList = (int*)malloc(deadCount * sizeof(int));
        for (int i = 0; i < deadCount; i++) {
            scanf("%d", &deadList[i]);
        }
    
        // 读取可以补种的胡杨树数量K
        int supplementCount;
        scanf("%d", &supplementCount);
    
        // 初始化最大连续胡杨树的长度
        int maxLen = 0;
    
        // 遍历可能的补种位置，寻找最长连续胡杨树的长度
        for (int i = supplementCount - 1; i < deadCount; i++) {
            if (i == supplementCount - 1) {
                // 考虑补种后，从开头到第一个无法成活的区域
                maxLen = maxLen > (supplementCount == deadCount ? total : deadList[supplementCount] - 1) 
                         ? maxLen : (supplementCount == deadCount ? total : deadList[supplementCount] - 1);
            } else if (i == deadCount - 1) {
                // 考虑补种后，从最后一个无法成活的区域到结尾
                maxLen = maxLen > (total - deadList[i - supplementCount]) 
                         ? maxLen : (total - deadList[i - supplementCount]);
            } else {
                // 计算补种后的最大连续胡杨树
                maxLen = maxLen > (deadList[i + 1] - deadList[i - supplementCount] - 1) 
                         ? maxLen : (deadList[i + 1] - deadList[i - supplementCount] - 1);
            }
        }
    
        // 输出结果
        printf("%d\n", maxLen);
    
        // 释放分配的内存
        free(deadList);
    
        return 0;
    }
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b0d8ff6d53693bfcf6e1605b507f3ae3.png)

#### 完整用例

##### 用例1

    
    
    5
    2
    2 4
    1
    

##### 用例2

    
    
    10
    3
    2 4 7
    1
    

##### 用例3

    
    
    6
    1
    3
    0
    

##### 用例4

    
    
    7
    3
    1 2 5
    2
    

##### 用例5

    
    
    8
    4
    2 4 6 8
    2
    

##### 用例6

    
    
    6
    1
    3
    0
    

##### 用例7

    
    
    10
    3
    2 4 7
    1
    

##### 用例8

    
    
    7
    4
    1 2 5 6
    3
    

##### 用例9

    
    
    7
    2
    4 6
    1
    

##### 用例10

    
    
    8
    4
    2 4 6 8
    4
    

