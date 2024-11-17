## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

有一组区间[a0，b0]，[a1，b1]，…（a，b表示起点，终点），区间有可能重叠、相邻，重叠或相邻则可以合并为更大的区间；

给定一组连接器[x1，x2，x3，…]（x表示连接器的最大可连接长度，即x>=[gap](https://so.csdn.net/so/search?q=gap&spm=1001.2101.3001.7020)），可用于将分离的区间连接起来，但两个分离区间之间只能使用1个连接器；

请编程实现使用连接器后，最少的区间数结果。

  * 区间数量<10000，a,b均 <=10000
  * 连接器梳理<10000；x <= 10000

## 输入描述

区间组：[1,10],[15,20],[18,30],[33，40]  
连接器组：[5,4,3,2]

## 输出描述

`1`

**说明：**

合并后：[1,10],[15,30],[33,40]，使用5, 3两个连接器连接后只剩下 [1, 40]。

## 示例1

输入

    
    
    [1,10],[15,20],[18,30],[33,40]
    [5,4,3,2]
    

输出

    
    
    1
    

说明

> 合并后：[1,10], [15,30], [33,40]，使用5, 3两个连接器连接后只剩下[1,40]

## 示例2

输入

    
    
    [1,2],[3,5],[7,10],[15,20],[30,100]
    [5,4,3,2,1]
    

输出

    
    
    2
    

说明

> 无重叠和相邻，使用1，2，5三个连接器连接后只剩下[1,20]，[30,100]

## 解题思路

  1. **区间合并** ：

     * 首先，我们有一组区间，每个区间由起点和终点表示。
     * 这些区间可能存在**重叠** 或**相邻** 关系，如果存在，可以将它们直接合并成一个更大的区间。
     * **重叠** 指两个区间部分重叠（如 `[15, 20]` 和 `[18, 30]`）。
     * **相邻** 指一个区间的终点刚好是另一个区间的起点（如 `[1, 5]` 和 `[5, 10]`）。
  2. **连接器作用** ：

     * 对于相互**分离** 的区间（即它们既不重叠也不相邻），可以使用连接器来连接它们。
     * 每个连接器有一个最大可连接长度 `x`，如果两个区间间隔的距离小于等于 `x`，则该连接器可以将它们连接起来，使它们成为一个更大的区间。
     * 每个分离的区间对之间只能使用**一个连接器** 。
  3. **目标** ：

     * 在使用尽可能多的连接器后，使剩余的区间数尽可能少。
     * 最终输出使用连接器后得到的最小区间数。

#### 示例解析

  * **示例 1** ：
    
        输入：
    [1,10],[15,20],[18,30],[33,40]
    连接器：[5,4,3,2]
    

    * 步骤： 
      1. 先合并重叠或相邻的区间，得到三个区间 `[1, 10]`, `[15, 30]`, `[33, 40]`。
      2. 然后使用连接器： 
         * `5` 可以连接 `[1,10]` 和 `[15,30]`（因为间隔为 `15 - 10 = 5`），得到 `[1, 30]`。
         * `3` 可以连接 `[1, 30]` 和 `[33, 40]`（间隔为 `33 - 30 = 3`），得到 `[1, 40]`。
      3. 最终只剩下一个区间 `[1, 40]`。
    * 输出：`1`
  * **示例 2** ：
    
        输入：
    [1,2],[3,5],[7,10],[15,20],[30,100]
    连接器：[5,4,3,2,1]
    

    * 步骤： 
      1. 先合并没有重叠的区间，保持五个分开的区间 `[1, 2]`, `[3, 5]`, `[7, 10]`, `[15, 20]`, `[30, 100]`。
      2. 然后使用连接器： 
         * `1` 可以连接 `[1,2]` 和 `[3,5]`，得到 `[1,5]`。
         * `2` 可以连接 `[1,5]` 和 `[7,10]`，得到 `[1,10]`。
         * `5` 可以连接 `[1,10]` 和 `[15,20]`，得到 `[1,20]`。
      3. 剩下 `[1, 20]` 和 `[30, 100]` 两个区间，无法再用连接器连接。
    * 输出：`2`

## Java

    
    
    import java.util.*;
    
    public class Main {
        public static void main(String[] args) {
            Scanner input = new Scanner(System.in);
            
            // 解析区间组：去除括号并按逗号分隔，然后将每两个值解析为一个区间
            String rangeStr = input.next().replaceAll("\\[|\\]", "");
            String[] tempRanges = rangeStr.split(",");
            List<int[]> ranges = new ArrayList<>();
            for (int i = 0; i < tempRanges.length; i += 2) {
                ranges.add(new int[]{Integer.parseInt(tempRanges[i]), Integer.parseInt(tempRanges[i + 1])});
            }
            
            // 解析连接器组：去除括号并按逗号分隔，然后将每个值解析为一个连接器长度
            String connectorStr = input.next().replaceAll("\\[|\\]", "");
            String[] tempConnectors = connectorStr.split(",");
            List<Integer> connectors = new ArrayList<>();
            for (String tempConnector : tempConnectors) {
                connectors.add(Integer.parseInt(tempConnector));
            }
            
            // 按区间起点排序，确保处理顺序从左到右，方便后续合并
            ranges.sort(Comparator.comparingInt(a -> a[0]));
    
            // 合并区间：创建合并后的区间列表和存储区间间隙的列表
            List<int[]> mergedRanges = new ArrayList<>();
            mergedRanges.add(ranges.get(0)); // 将第一个区间加入合并列表
            List<Integer> rangeGaps = new ArrayList<>();
            
            // 遍历每个区间，合并重叠或相邻的区间，并记录间隙
            for (int i = 1; i < ranges.size(); i++) {
                int[] lastRange = mergedRanges.get(mergedRanges.size() - 1); // 上一个合并区间
                int[] currentRange = ranges.get(i); // 当前区间
                if (currentRange[0] <= lastRange[1]) {
                    // 合并重叠或相邻的区间：更新最后一个区间的终点
                    lastRange[1] = Math.max(lastRange[1], currentRange[1]);
                } else {
                    // 若不相邻且无重叠，记录当前区间与上一个区间的间隙
                    rangeGaps.add(currentRange[0] - lastRange[1]);
                    mergedRanges.add(currentRange); // 将当前区间加入合并列表
                }
            }
            
            // 对区间间隙和连接器长度分别排序，以便最小连接器连接最小间隙
            rangeGaps.sort(Integer::compareTo);
            connectors.sort(Integer::compareTo);
    
            // 使用连接器尽量减少区间数
            int result = mergedRanges.size(); // 初始为合并后的区间数量
            int idx = 0; // 指向当前待处理的间隙索引
            for (int connector : connectors) {
                // 如果连接器足够大以填补当前间隙，则使用连接器连接区间，减少区间数量
                if (idx < rangeGaps.size() && connector >= rangeGaps.get(idx)) {
                    idx++; // 移动到下一个间隙
                    result--; // 成功连接后减少一个区间
                }
            }
            
            // 输出最终的最小区间数
            System.out.println(result);
        }
    }
    

## Python

    
    
    # 导入所需的模块
    import re
    
    # 解析输入字符串，将区间和连接器分别解析成列表
    range_str = input().replace("[", "").replace("]", "")
    temp_ranges = list(map(int, range_str.split(',')))
    ranges = [[temp_ranges[i], temp_ranges[i + 1]] for i in range(0, len(temp_ranges), 2)]
    
    connector_str = input().replace("[", "").replace("]", "")
    connectors = list(map(int, connector_str.split(',')))
    
    # 按区间的起点进行排序，便于之后合并区间
    ranges.sort(key=lambda x: x[0])
    
    # 合并区间，创建合并后的区间列表以及间隙列表
    merged_ranges = [ranges[0]]  # 将第一个区间添加到合并后的区间列表中
    range_gaps = []
    
    # 遍历区间列表，合并重叠或相邻的区间，并记录区间之间的间隙
    for i in range(1, len(ranges)):
        last_range = merged_ranges[-1]  # 获取最后一个合并区间
        current_range = ranges[i]       # 当前区间
    
        if current_range[0] <= last_range[1]:  # 判断当前区间是否与上一个区间重叠或相邻
            # 更新上一个区间的终点，实现合并
            last_range[1] = max(last_range[1], current_range[1])
        else:
            # 记录上一个区间与当前区间之间的间隙
            range_gaps.append(current_range[0] - last_range[1])
            merged_ranges.append(current_range)  # 将当前区间添加到合并列表中
    
    # 将间隙和连接器分别排序，以便最小连接器连接最小间隙
    range_gaps.sort()
    connectors.sort()
    
    # 使用连接器尽量减少区间数量
    result = len(merged_ranges)  # 初始值为合并后的区间数量
    idx = 0  # 指向当前处理的间隙索引
    
    # 尝试用连接器填充间隙
    for connector in connectors:
        if idx < len(range_gaps) and connector >= range_gaps[idx]:
            idx += 1    # 移动到下一个间隙
            result -= 1 # 成功填充后减少一个区间
    
    # 输出最终结果
    print(result)
    

## JavaScript

    
    
    // 使用 readline 模块读取输入
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    // 读取区间和连接器输入
    readline.on("line", (rangeInput) => {
      const ranges = rangeInput.replace(/\[|\]/g, "").split(",").map(Number);
      const parsedRanges = [];
      for (let i = 0; i < ranges.length; i += 2) {
        parsedRanges.push([ranges[i], ranges[i + 1]]);
      }
    
      readline.on("line", (connectorInput) => {
        const connectors = connectorInput.replace(/\[|\]/g, "").split(",").map(Number);
    
        // 排序区间，确保按起点排序
        parsedRanges.sort((a, b) => a[0] - b[0]);
    
        // 合并区间并记录间隙
        const mergedRanges = [parsedRanges[0]];
        const rangeGaps = [];
    
        for (let i = 1; i < parsedRanges.length; i++) {
          const lastRange = mergedRanges[mergedRanges.length - 1];
          const currentRange = parsedRanges[i];
    
          if (currentRange[0] <= lastRange[1]) {
            lastRange[1] = Math.max(lastRange[1], currentRange[1]);
          } else {
            rangeGaps.push(currentRange[0] - lastRange[1]);
            mergedRanges.push(currentRange);
          }
        }
    
        // 排序间隙和连接器以优化连接
        rangeGaps.sort((a, b) => a - b);
        connectors.sort((a, b) => a - b);
    
        // 使用连接器减少区间数量
        let result = mergedRanges.length;
        let idx = 0;
    
        for (let connector of connectors) {
          if (idx < rangeGaps.length && connector >= rangeGaps[idx]) {
            idx++;
            result--;
          }
        }
    
        console.log(result);
        readline.close();
      });
    });
    

## C++

    
    
    #include <iostream>
    #include <vector>
    #include <algorithm>
    #include <string>
    #include <sstream>
    using namespace std;
    
    // 分割字符串的辅助函数
    vector<int> parseStringToIntArray(const string& input) {
        vector<int> result;
        stringstream ss(input);
        string item;
        while (getline(ss, item, ',')) {
            result.push_back(stoi(item));
        }
        return result;
    }
    
    int main() {
        string rangeInput, connectorInput;
     
        getline(cin, rangeInput);
        rangeInput.erase(remove(rangeInput.begin(), rangeInput.end(), '['), rangeInput.end());
        rangeInput.erase(remove(rangeInput.begin(), rangeInput.end(), ']'), rangeInput.end());
        vector<int> tempRanges = parseStringToIntArray(rangeInput);
    
        // 将临时区间转换为区间列表
        vector<pair<int, int>> ranges;
        for (size_t i = 0; i < tempRanges.size(); i += 2) {
            ranges.emplace_back(tempRanges[i], tempRanges[i + 1]);
        }
    
      
        getline(cin, connectorInput);
        connectorInput.erase(remove(connectorInput.begin(), connectorInput.end(), '['), connectorInput.end());
        connectorInput.erase(remove(connectorInput.begin(), connectorInput.end(), ']'), connectorInput.end());
        vector<int> connectors = parseStringToIntArray(connectorInput);
    
        // 排序区间并合并
        sort(ranges.begin(), ranges.end());
        vector<pair<int, int>> mergedRanges;
        vector<int> rangeGaps;
        mergedRanges.push_back(ranges[0]);
    
        for (size_t i = 1; i < ranges.size(); ++i) {
            auto& lastRange = mergedRanges.back();
            auto& currentRange = ranges[i];
            
            if (currentRange.first <= lastRange.second) {
                lastRange.second = max(lastRange.second, currentRange.second);
            } else {
                rangeGaps.push_back(currentRange.first - lastRange.second);
                mergedRanges.push_back(currentRange);
            }
        }
    
        // 排序间隙和连接器
        sort(rangeGaps.begin(), rangeGaps.end());
        sort(connectors.begin(), connectors.end());
    
        int result = mergedRanges.size();
        size_t idx = 0;
        
        for (int connector : connectors) {
            if (idx < rangeGaps.size() && connector >= rangeGaps[idx]) {
                ++idx;
                --result;
            }
        }
        
        cout << result << endl;
        return 0;
    }
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    
    int cmp(const void *a, const void *b) {
        return (*(int *)a - *(int *)b);
    }
    
    int main() {
        int ranges[100][2], connectors[100];
        int range_count = 0, connector_count = 0;
    
     
        scanf("%d", &range_count);
     
        for (int i = 0; i < range_count; i++) {
            scanf("%d %d", &ranges[i][0], &ranges[i][1]);
        }
     
        scanf("%d", &connector_count);
     
        for (int i = 0; i < connector_count; i++) {
            scanf("%d", &connectors[i]);
        }
    
        // 排序区间起点
        qsort(ranges, range_count, sizeof(ranges[0]), cmp);
    
        int merged_ranges[100][2], merged_count = 0;
        int gaps[100], gap_count = 0;
    
        merged_ranges[merged_count][0] = ranges[0][0];
        merged_ranges[merged_count][1] = ranges[0][1];
        merged_count++;
    
        for (int i = 1; i < range_count; i++) {
            int *last = merged_ranges[merged_count - 1];
            if (ranges[i][0] <= last[1]) {
                last[1] = ranges[i][1] > last[1] ? ranges[i][1] : last[1];
            } else {
                gaps[gap_count++] = ranges[i][0] - last[1];
                merged_ranges[merged_count][0] = ranges[i][0];
                merged_ranges[merged_count++][1] = ranges[i][1];
            }
        }
    
        qsort(gaps, gap_count, sizeof(int), cmp);
        qsort(connectors, connector_count, sizeof(int), cmp);
    
        int result = merged_count, idx = 0;
    
        for (int i= 0; i < connector_count; i++) {
            if (idx < gap_count && connectors[i] >= gaps[idx]) {
                idx++;
                result--;
            }
        }
    
        printf("%d\n", result);
        return 0;
    }
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/a8bcad1db69d7fc5cc6a165271478fb0.png)

