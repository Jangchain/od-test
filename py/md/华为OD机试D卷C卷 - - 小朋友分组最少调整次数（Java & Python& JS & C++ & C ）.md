## 题目描述

n (3≤n≤90000 且可以整除 3 )个学生排成一排，学生编号分别是 1 到 n，n 为 3 的整倍数，老师随机抽签决定将所有学生分成 m 个 3
人的小组（n == 3 * m） 。

为了便于同组学生交流，老师决定将小组成员安排到一起，也就是同组成员彼此相连，同组任意两个成员之间无其它组的成员。

因此老师决定调整队伍，老师每次可以调整任何一名学生到队伍的任意位置，计为调整了一次， 请计算最少调整多少次可以达到目标。

注意：对于小组之间没有顺序要求，同组学生之间没有顺序要求。

## 输入描述

第一行输入初始排队顺序序列

第二行输入分组排队顺序序列

## 输出描述

输出一个整数x，表示至少调整x次站位

## 用例

输入

    
    
    4 2 8 5 3 6 1 9 7
    6 3 1 2 4 8 7 9 5
    

输出

    
    
    1
    

说明

> 分组分别为：6,3,1一组，2,4,8一组，7,9,5一组
>
> 初始排队顺序中，只要将5移动到1后面，变为：
>
> 4 2 8 3 6 1 5 9 7
>
> 即可满足分组排队顺序要求。
>
> 因此至少需要调整1次站位。

## 用例2

输入

    
    
    8 9 7 5 6 3 2 1 4
    7 8 9 4 2 1 3 5 6
    

输出

    
    
    0
    

## 用例3

输入

    
    
    7 9 8 5 6 4 2 1 3
    7 8 9 4 2 1 3 5 6
    

输出

    
    
    1
    

## 解题思路

为了计算给定输入序列的最少调整次数，我们需要遵循以下步骤：

  1. **映射学生到组号** ：根据第二行的分组排队序列，将每个学生映射到一个组号上。每3个学生属于同一组。

  2. **转换初始序列为组号序列** ：根据映射，将初始排队序列转换为对应的组号序列。

  3. **记录组号的出现位置** ：为每个组创建一个列表，记录该组学生在初始序列中的位置。

  4. **分析并计算调整次数** ：

     * 对于每个组，检查其成员在初始序列中的位置是否连续。如果不连续，则需要进行调整。
     * 特别地，如果组内成员已经是连续的，则不需要调整。
     * 考虑到不需要关心组间的顺序，只需关注组内成员的连续性，我们可以通过计算每个组内成员的间隔来确定是否需要调整。
  5. **输出最少调整次数** 。

根据以上思路，下面是对应的模拟计算过程：

  * 输入序列是`4 2 8 5 3 6 1 9 7`，分组序列是`6 3 1 2 4 8 7 9 5`。
  * 分组为：`{6,3,1}`，`{2,4,8}`，`{7,9,5}`。
  * 初始序列转换为组号序列：`[1, 1, 1, 2, 0, 0, 0, 2, 2]`。
  * 组号`0`的出现位置为`[4, 5, 6]`，组号`1`的出现位置为`[0, 1, 2]`，组号`2`的出现位置为`[3, 7, 8]`。
  * 分析发现，组号`0`和`1`的成员在初始序列中不是完全连续，但只需进行一次调整（将数字`5`移动到`1`后面），即可使所有组内成员连续。
  * 因此，最少调整次数为`1`。

## C++

    
    
    #include <iostream>
    #include <vector>
    #include <sstream>
    #include <algorithm>
    #include <set>
    
    using namespace std;
    int main() {
        string line;
        vector<int> nums, line2;
    
        // 读取第一行并转换为整型数组
        getline(cin, line);
        istringstream iss(line);
        int num;
        while (iss >> num) {
            nums.push_back(num);
        }
    
        // 读取第二行并转换为整型数组
        getline(cin, line);
        istringstream iss2(line);
        while (iss2 >> num) {
            line2.push_back(num);
        }
    
        int n = nums.size(); // 排队的总人数
    
        // 创建一个映射数组，用于将序号映射到组号（每3个人为一组）
        vector<int> map(n + 1, 0);
        for (int i = 0; i < n; i++) {
            map[line2[i]] = i / 3; // 计算并存储每个序号对应的组号
        }
    
        // 将初始序号数组转换为对应的组号数组
        for (int i = 0; i < n; i++) {
            nums[i] = map[nums[i]];
        }
    
        // 创建一个数组列表的数组，用于存储每个组号出现的位置
        vector<vector<int>> positions(n / 3);
        for (int i = 0; i < n; i++) {
            positions[nums[i]].push_back(i); // 将当前位置添加到对应组号的位置列表中
        }
    
        // 初始化调整位置次数为0
        int movedCount = 0;
    
        // 遍历每个组的位置列表，检查是否需要调整位置
        for (auto &posList : positions) {
            if (posList.size() == 3) {
                // 如果一个组有3个成员，检查他们是否连续
                if (posList[1] - posList[0] > 1 || posList[2] - posList[1] > 1) {
                    movedCount++; // 如果不连续，至少需要一次调整
                }
            } else if (posList.size() == 2) {
                // 如果一个组有2个成员，检查他们之间的间隔
                if (posList[1] - posList[0] > 2) {
                    movedCount++; // 如果间隔超过2，需要一次调整
                }
            } else if (posList.size() == 1) {
                // 如果一个组只有1个成员，最坏情况需要两次调整
                movedCount += 2;
            }
        }
    
        // 为了避免过度计算，通过计算组间的交错来可能减少调整次数
        set<int> seenGroups; // 用于记录已经遇到的组号
        int adjustments = 0; // 记录因组间交错导致的调整次数
        for (int num : nums) {
            if (seenGroups.find(num) == seenGroups.end()) {
                // 如果是首次遇到这个组号，添加到已遇到组号的集合中
                seenGroups.insert(num);
            } else {
                // 如果之前已经遇到过这个组号，说明存在交错，可能需要调整
                adjustments++;
            }
        }
    
        // 最终的调整次数是之前计算的调整次数和因交错导致的调整次数中的较小值
        movedCount = min(movedCount, adjustments);
    
        // 输出最小调整次数
        cout << movedCount << endl;
    
        return 0;
    }
    

## Java

    
    
    import java.util.*;
    
    public class Main {
        public static void main(String[] args) {
            Scanner sc = new Scanner(System.in);
    
           
            // 读取第一行并转换为整型数组
            int[] nums = Arrays.stream(sc.nextLine().split(" ")).mapToInt(Integer::parseInt).toArray();
            // 读取第二行并转换为整型数组
            int[] line2 = Arrays.stream(sc.nextLine().split(" ")).mapToInt(Integer::parseInt).toArray();
            
            int n = nums.length; // 排队的总人数
    
            // 创建一个映射数组，用于将序号映射到组号（每3个人为一组）
            int[] map = new int[n + 1];
            for (int i = 0; i < n; i++) {
                
                map[line2[i]] = i / 3; // 计算并存储每个序号对应的组号
            }
    
            // 将初始序号数组转换为对应的组号数组
            nums = Arrays.stream(nums).map(num -> map[num]).toArray();
    
            // 创建一个数组列表的数组，用于存储每个组号出现的位置
            ArrayList<Integer>[] positions = new ArrayList[n / 3];
            for (int i = 0; i < n / 3; i++) {
                positions[i] = new ArrayList<>(); // 初始化每个组的位置列表
            }
    
            // 遍历组号数组，记录每个组号出现的位置
            for (int i = 0; i < nums.length; i++) {
                positions[nums[i]].add(i); // 将当前位置添加到对应组号的位置列表中
            }
    
            // 初始化调整位置次数为0
            int movedCount = 0;
    
            // 遍历每个组的位置列表，检查是否需要调整位置
            for (ArrayList<Integer> posList : positions) {
                if (posList.size() == 3) {
                    // 如果一个组有3个成员，检查他们是否连续
                    if (posList.get(1) - posList.get(0) > 1 || posList.get(2) - posList.get(1) > 1) {
                        movedCount++; // 如果不连续，至少需要一次调整
                    }
                } else if (posList.size() == 2) {
                    // 如果一个组有2个成员，检查他们之间的间隔
                    if (posList.get(1) - posList.get(0) > 2) {
                        movedCount++; // 如果间隔超过2，需要一次调整
                    }
                } else if (posList.size() == 1) {
                    // 如果一个组只有1个成员，最坏情况需要两次调整
                    movedCount += 2;
                }
            }
    
            // 为了避免过度计算，通过计算组间的交错来可能减少调整次数
            HashSet<Integer> seenGroups = new HashSet<>(); // 用于记录已经遇到的组号
            int adjustments = 0; // 记录因组间交错导致的调整次数
            for (int num : nums) {
                if (!seenGroups.contains(num)) {
                    // 如果是首次遇到这个组号，添加到已遇到组号的集合中
                    seenGroups.add(num);
                } else {
                    // 如果之前已经遇到过这个组号，说明存在交错，可能需要调整
                    adjustments++;
                }
            }
    
            // 最终的调整次数是之前计算的调整次数和因交错导致的调整次数中的较小值
            movedCount = Math.min(movedCount, adjustments);
    
            // 输出最小调整次数
            System.out.println(movedCount);
        }
    }
    

## javaScript

    
    
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    // 准备读取输入数据
    rl.on('line', (line) => {
      // 以空格分割输入字符串，将其转换为整数数组
      const nums = line.split(' ').map(num => parseInt(num, 10));
      
      // 读取第二行输入
      rl.on('line', (line2) => {
        const line2Nums = line2.split(' ').map(num => parseInt(num, 10));
        const n = nums.length; // 排队的总人数
    
        // 创建映射数组，将序号映射到组号（每3个人为一组）
        let map = new Array(n + 1);
        for (let i = 0; i < n; i++) {
          map[line2Nums[i]] = Math.floor(i / 3);
        }
    
        // 将初始序号数组转换为对应的组号数组
        let groupNums = nums.map(num => map[num]);
    
        // 创建数组列表的数组，用于存储每个组号出现的位置
        let positions = new Array(Math.ceil(n / 3)).fill(null).map(() => []);
    
        // 遍历组号数组，记录每个组号出现的位置
        groupNums.forEach((num, i) => positions[num].push(i));
    
        // 初始化调整位置次数为0
        let movedCount = 0;
    
        // 遍历每个组的位置列表，检查是否需要调整位置
        positions.forEach(posList => {
          if (posList.length === 3) {
            // 如果一个组有3个成员，检查他们是否连续
            if (posList[1] - posList[0] > 1 || posList[2] - posList[1] > 1) {
              movedCount++; // 如果不连续，至少需要一次调整
            }
          } else if (posList.length === 2) {
            // 如果一个组有2个成员，检查他们之间的间隔
            if (posList[1] - posList[0] > 2) {
              movedCount++; // 如果间隔超过2，需要一次调整
            }
          } else if (posList.length === 1) {
            // 如果一个组只有1个成员，最坏情况需要两次调整
            movedCount += 2;
          }
        });
    
        // 为了避免过度计算，通过计算组间的交错来可能减少调整次数
        let seenGroups = new Set(); // 用于记录已经遇到的组号
        let adjustments = 0; // 记录因组间交错导致的调整次数
        groupNums.forEach(num => {
          if (!seenGroups.has(num)) {
            seenGroups.add(num);
          } else {
            adjustments++;
          }
        });
    
        // 最终的调整次数是之前计算的调整次数和因交错导致的调整次数中的较小值
        movedCount = Math.min(movedCount, adjustments);
    
        // 输出最小调整次数
        console.log(movedCount);
        
        // 关闭读取行的接口
        rl.close();
      });
    });
    

## Python

    
    
    # 导入 sys 库以读取标准输入
    import sys
    
    # 读取第一行并转换为整型数组
    nums = list(map(int, input().split()))
    # 读取第二行并转换为整型数组
    line2 = list(map(int, input().split()))
    
    n = len(nums)  # 排队的总人数
    
    # 创建一个映射数组，用于将序号映射到组号（每3个人为一组）
    map = [0] * (n + 1)
    for i in range(n):
        map[line2[i]] = i // 3
    
    # 将初始序号数组转换为对应的组号数组
    nums = [map[num] for num in nums]
    
    # 创建一个列表的列表，用于存储每个组号出现的位置
    positions = [[] for _ in range((n + 2) // 3)]
    
    # 遍历组号数组，记录每个组号出现的位置
    for i, num in enumerate(nums):
        positions[num].append(i)
    
    # 初始化调整位置次数为0
    movedCount = 0
    
    # 遍历每个组的位置列表，检查是否需要调整位置
    for posList in positions:
        if len(posList) == 3:
            # 如果一个组有3个成员，检查他们是否连续
            if posList[1] - posList[0] > 1 or posList[2] - posList[1] > 1:
                movedCount += 1  # 如果不连续，至少需要一次调整
        elif len(posList) == 2:
            # 如果一个组有2个成员，检查他们之间的间隔
            if posList[1] - posList[0] > 2:
                movedCount += 1  # 如果间隔超过2，需要一次调整
        elif len(posList) == 1:
            # 如果一个组只有1个成员，最坏情况需要两次调整
            movedCount += 2
    
    # 为了避免过度计算，通过计算组间的交错来可能减少调整次数
    seenGroups = set()  # 用于记录已经遇到的组号
    adjustments = 0  # 记录因组间交错导致的调整次数
    for num in nums:
        if num not in seenGroups:
            seenGroups.add(num)
        else:
            adjustments += 1
    
    # 最终的调整次数是之前计算的调整次数和因交错导致的调整次数中的较小值
    movedCount = min(movedCount, adjustments)
    
    # 输出最小调整次数
    print(movedCount)
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    #include <string.h>
    
    #define MAX_SIZE 1000 // 假设最大输入长度
    
    int main() {
        char line[MAX_SIZE];
        int nums[MAX_SIZE], line2[MAX_SIZE], map[MAX_SIZE + 1];
        int n = 0, num, movedCount = 0, adjustments = 0;
        int positions[MAX_SIZE][3] = {0}; // 存储每个组号出现的位置
        int groupSize[MAX_SIZE] = {0}; // 记录每个组的成员数量
    
        // 读取第一行并转换为整型数组
        fgets(line, MAX_SIZE, stdin);
        char *token = strtok(line, " ");
        while (token != NULL) {
            nums[n++] = atoi(token);
            token = strtok(NULL, " ");
        }
    
        // 读取第二行并转换为整型数组
        fgets(line, MAX_SIZE, stdin);
        token = strtok(line, " ");
        int i = 0;
        while (token != NULL) {
            line2[i++] = atoi(token);
            token = strtok(NULL, " ");
        }
    
        // 创建映射数组，将序号映射到组号（每3个人为一组）
        for (i = 0; i < n; i++) {
            map[line2[i]] = i / 3;
        }
    
        // 将初始序号数组转换为对应的组号数组
        for (i = 0; i < n; i++) {
            nums[i] = map[nums[i]];
            positions[nums[i]][groupSize[nums[i]]++] = i;
        }
    
        // 遍历每个组的位置列表，检查是否需要调整位置
        for (i = 0; i < n / 3; i++) {
            if (groupSize[i] == 3) {
                if (positions[i][1] - positions[i][0] > 1 || positions[i][2] - positions[i][1] > 1) {
                    movedCount++;
                }
            } else if (groupSize[i] == 2) {
                if (positions[i][1] - positions[i][0] > 2) {
                    movedCount++;
                }
            } else if (groupSize[i] == 1) {
                movedCount += 2;
            }
        }
    
        // 为了避免过度计算，通过计算组间的交错来可能减少调整次数
        int seenGroups[MAX_SIZE] = {0}; // 用于记录已经遇到的组号
        for (i = 0; i < n; i++) {
            if (!seenGroups[nums[i]]) {
                seenGroups[nums[i]] = 1;
            } else {
                adjustments++;
            }
        }
    
        // 最终的调整次数是之前计算的调整次数和因交错导致的调整次数中的较小值
        movedCount = movedCount < adjustments ? movedCount : adjustments;
    
        // 输出最小调整次数
        printf("%d\n", movedCount);
    
        return 0;
    }
    

## 完整用例

### 用例1

    
    
    4 2 8 5 3 6 1 9 7
    6 3 1 2 4 8 7 9 5
    

### 用例2

    
    
    8 9 7 5 6 3 2 1 4
    7 8 9 4 2 1 3 5 6
    

### 用例3

    
    
    7 9 8 5 6 4 2 1 3
    7 8 9 4 2 1 3 5 6
    

### 用例4

    
    
    1 4 7 8 9 2 3 5 6
    1 2 3 4 5 6 7 8 9
    

### 用例5

    
    
    4 1 5 7 3 6 8 9 2
    1 2 3 4 5 6 7 8 9
    

### 用例6

    
    
    1 2 3 4 5 6 7 8 9
    1 2 3 4 5 6 7 8 9
    

### 用例7

    
    
    1 2 3 6 5 4 7 8 9
    1 2 3 4 5 6 7 8 9
    

### 用例8

    
    
    3 1 2 6 4 5 9 7 8
    1 2 3 4 5 6 7 8 9
    

### 用例9

    
    
    1 2 3 6 5 4 9 8 7
    1 8 3 4 5 6 7 2 9
    

### 用例10

    
    
    3 1 2 6 4 5 9 7 8
    1 2 3 4 5 6 7 8 9
    

![fengmian](https://i-blog.csdnimg.cn/blog_migrate/148488a84313d18c5bc0638a9edefd8d.png)

