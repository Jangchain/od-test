## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

小明负责公司年会，想出一个趣味游戏：

屏幕给出 1 ~ 9 中任意 4 个不重复的数字，大家以最快时间给出这几个数字可拼成的数字从小到大排列位于第 N 位置的数字，其中 N
为给出数字中最大的（如果不到这么多数字则给出最后一个即可）。

注意：

  * 2 可以当作 5 来使用，5 也可以当作 2 来使用进行数字拼接，且屏幕不能同时给出 2 和 5；
  * 6 可以当作 9 来使用，9 也可以当作 6 来使用进行数字拼接，且屏幕不能同时给出 6 和 9。

如给出：1，4，8，7，则可以拼接的数字为：

> 1，4，7，8，14，17，18，41，47，48，71，74，78，81，84，87，147，148，178 … (省略后面的数字)

那么第 N （即8）个的数字为 41。

## 输入描述

输入以逗号分隔的 4 个 int 类型整数的字符串。

## 输出描述

输出为这几个数字可拼成的数字从小大大排列位于第 N （N为输入数字中最大的数字）位置的数字，

如果输入的数字不在范围内或者有重复，则输出-1。

## 示例1

输入

    
    
    1,4,8,7
    

输出

    
    
    41
    

说明

> 可以构成的数字按从小到大排序为：
>
> 1，4，7，8，14，17，18，41，47，48，71，74，78，81，84，87，147，148，178 … （省略后面的数字），
>
> 故第8个为41

## 示例2

输入

    
    
    2,5,1
    

输出

    
    
    -1
    

说明

> 2和5不能同时出现

## 示例3

输入

    
    
    3,0,9
    

输出

    
    
    -1
    

说明

> 0不在1到9范围内

## 示例4

输入

    
    
    3,9,7,8
    

输出

    
    
    39
    

说明

> 注意9可以当6使用，所以可以构成的数字按从小到大排序为：3，6，7，8，9，36，37，38，39，63，67，68，73，76，78，79，83 …
> （省略后面的数字），
>
> 故第9个为39

## 解题思路

#### 题目解析

小明的游戏需要从给定的4个不同的数字中，找到所有可以拼接出来的数字，按从小到大的顺序排列，最后取出第 **N** 个数字输出，**N**
是给定4个数字中最大的那个数字。

  * 数字只能从1到9中选择。
  * 数字2和5互相可以替代，6和9互相可以替代，但不能同时出现（例如，2和5不能同时出现在输入中，6和9也不能同时出现）。
  * 输入数字必须是4个且无重复。
  * 如果输入的数字不符合上述要求（比如含有重复数字、包含不在范围内的数字，或同时包含了2和5、6和9），则输出`-1`。
  * **取出第N个排列的数字** ： 
    * 找到这些排列中第 **N** 个位置的数字（**N** 是输入中最大的数字）。
    * 如果排列数量不够N个，则取最后一个数字。

#### 方法

  1. **检查输入的合法性** ：

     * 检查输入数字的数量是否为4个。
     * 检查数字是否都在1到9之间。
     * 检查是否有重复数字。
     * 检查是否同时包含2和5，或同时包含6和9，如果有则直接输出`-1`。
  2. **生成所有排列** ：因为本题数量级不大，可以考虑生成所有数字的排列组合，并将结果按从小到大的顺序排列。

#### 示例解析

##### 示例1

输入：`1,4,8,7`

  * 输入数字为1, 4, 8, 7。没有冲突的数字。
  * 最大的数字是8，所以我们需要找第8个排列的数字。
  * 按从小到大的顺序排列为：1, 4, 7, 8, 14, 17, 18, 41, 47, 48, 71, 74, 78, 81, 84, 87, …
  * 第8个数字为 **41** ，所以输出 **41** 。

##### 示例4

输入：`3,9,7,8`

  * 输入数字为3, 9, 7, 8。9可以作为6使用，没有冲突。
  * 最大的数字是9，所以我们需要找第9个排列的数字。
  * 按从小到大的顺序排列为：3, 6, 7, 8, 9, 36, 37, 38, 39, 63, 67, 68, …
  * 第9个数字为 **39** ，所以输出 **39** 。

## Java

    
    
    import java.util.*;
    
    public class Main {
        public static void main(String[] args) {
            Scanner sc = new Scanner(System.in);
    
            // 读取输入的一行字符串，将逗号分隔的数字转换为整数数组
            int[] nums = Arrays.stream(sc.nextLine().split(","))
                               .mapToInt(Integer::parseInt)
                               .toArray();
    
            // 使用HashSet来记录输入的数字，避免重复，同时用于后续的检查
            HashSet<Integer> set = new HashSet<>();
            // 记录输入数字中的最大值，用于后续决定输出的排列结果
            int n = Integer.MIN_VALUE;
    
            // 遍历输入的每一个数字，进行合法性检查和找出最大值
            for (int num : nums) {
                // 检查数字是否在1到9的范围内，且是否重复
                if (num < 1 || num > 9 || !set.add(num)) {
                    // 如果数字不在范围内或者重复，则输出-1并结束程序
                    System.out.println(-1);
                    return;
                }
                // 更新当前的最大值
                n = Math.max(n, num);
            }
    
            // 检查是否输入了4个数字，并且不允许2和5同时出现，或6和9同时出现
            if (set.size() != 4 || (set.contains(2) && set.contains(5)) || (set.contains(6) && set.contains(9))) {
                // 如果条件不满足，输出-1并结束程序
                System.out.println(-1);
                return;
            }
    
            // 创建一个映射数组，用于定义数字替代规则，例如2替代5，5替代2，6替代9，9替代6
            int[] map = new int[10];
            map[2] = 5;
            map[5] = 2;
            map[6] = 9;
            map[9] = 6;
    
            // 创建一个列表用于存储生成的所有可能的排列结果
            ArrayList<Integer> resList = new ArrayList<>();
    
            // 调用递归函数，生成所有排列组合，并将结果存储到resList中
            dfs(nums, new HashSet<>(), "", map, resList);
    
            // 如果没有生成任何有效的排列结果，输出-1
            if (resList.isEmpty()) {
                System.out.println(-1);
                return;
            }
    
            // 对结果列表进行自然顺序排序（升序）
            resList.sort(Comparator.naturalOrder());
    
            // 确定要输出的第n个数字，其中n为输入的最大值，如果结果集数量不足，则输出最后一个
            int nth = Math.min(n, resList.size());
            // 输出排序后的第nth个数字（因为索引从0开始，所以为nth - 1）
            System.out.println(resList.get(nth - 1));
        }
    
       
        public static void dfs(int[] nums, Set<Integer> used, String path, int[] map, List<Integer> res) {
            // 如果当前路径不为空，将路径转换为整数并加入结果集中
            if (!path.isEmpty()) {
                res.add(Integer.parseInt(path));
            }
    
            // 如果当前路径的长度已经等于输入的数字数量，返回（递归结束条件）
            if (path.length() == nums.length) {
                return;
            }
    
            // 遍历所有输入的数字，尝试将每个数字放入当前路径中
            for (int num : nums) {
                // 如果当前数字已经在路径中使用，跳过此数字
                if (used.contains(num)) continue;
    
                // 标记当前数字为使用中
                used.add(num);
    
                // 递归调用，将当前数字加入路径中
                dfs(nums, used, path + num, map, res);
    
                // 如果当前数字有替代规则，且替代数字未被使用，则尝试使用替代数字
                if (map[num] != 0 && !used.contains(map[num])) {
                    dfs(nums, used, path + map[num], map, res);
                }
    
                // 回溯，取消当前数字的使用标记
                used.remove(num);
            }
        }
    }
    

## Python

    
    
    # 导入所需模块
    from itertools import permutations
    
    def main():
        # 读取输入的一行字符串，并将其转换为整数列表
        nums = list(map(int, input().split(',')))
    
        # 使用集合来记录输入的数字，避免重复，并进行后续检查
        num_set = set()
        # 记录输入数字中的最大值，用于后续输出
        n = float('-inf')
    
        # 遍历输入的每一个数字，进行合法性检查并找出最大值
        for num in nums:
            # 检查数字是否在1到9的范围内，且是否重复
            if num < 1 or num > 9 or num in num_set:
                print(-1)
                return
            num_set.add(num)
            n = max(n, num)
        
        # 检查是否输入了4个数字，并且不允许2和5同时出现，或6和9同时出现
        if len(num_set) != 4 or (2 in num_set and 5 in num_set) or (6 in num_set and 9 in num_set):
            print(-1)
            return
    
        # 定义替换规则
        replace_map = {2: 5, 5: 2, 6: 9, 9: 6}
    
        # 初始化结果列表
        res_list = []
    
        # 调用递归函数，生成所有排列组合
        dfs(nums, set(), "", replace_map, res_list)
    
        # 如果没有生成任何有效的排列结果，输出-1
        if not res_list:
            print(-1)
            return
    
        # 对结果列表进行升序排序
        res_list.sort()
    
        # 确定要输出的第n个数字，n为输入的最大值
        nth = min(n, len(res_list))
    
        # 输出排序后的第nth个数字
        print(res_list[nth - 1])
    
    def dfs(nums, used, path, replace_map, res):
        # 如果当前路径不为空，将路径转换为整数并加入结果集中
        if path:
            res.append(int(path))
    
        # 如果当前路径的长度已经等于输入的数字数量，返回（递归结束条件）
        if len(path) == len(nums):
            return
    
        # 遍历所有输入的数字，尝试将每个数字放入当前路径中
        for num in nums:
            if num in used:
                continue
    
            used.add(num)
    
            # 递归调用，将当前数字加入路径中
            dfs(nums, used, path + str(num), replace_map, res)
    
            # 如果当前数字有替代规则且替代数字未被使用，则尝试使用替代数字
            if num in replace_map and replace_map[num] not in used:
                dfs(nums, used, path + str(replace_map[num]), replace_map, res)
    
            # 回溯
            used.remove(num)
    
    if __name__ == "__main__":
        main()
    

## JavaScript

    
    
     
    const readline = require('readline');
     
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
     
    rl.on("line", (input) => {
        // 将输入的字符串转换为整数数组
        const nums = input.split(',').map(Number);
    
        // 使用Set来记录输入的数字，避免重复
        let numSet = new Set();
        let n = Number.MIN_SAFE_INTEGER;
    
        // 遍历每个数字，进行合法性检查并找出最大值
        for (let num of nums) {
            if (num < 1 || num > 9 || numSet.has(num)) {
                console.log(-1);
                rl.close();
                return;
            }
            numSet.add(num);
            n = Math.max(n, num);
        }
    
        // 检查条件
        if (numSet.size !== 4 || (numSet.has(2) && numSet.has(5)) || (numSet.has(6) && numSet.has(9))) {
            console.log(-1);
            rl.close();
            return;
        }
    
        // 定义替换规则
        const replaceMap = { 2: 5, 5: 2, 6: 9, 9: 6 };
    
        // 存储结果的数组
        let resList = [];
    
        // 调用递归函数
        dfs(nums, new Set(), "", replaceMap, resList);
    
        // 如果没有结果，输出-1
        if (resList.length === 0) {
            console.log(-1);
            rl.close();
            return;
        }
    
        // 排序
        resList.sort((a, b) => a - b);
    
        // 输出第n个结果
        let nth = Math.min(n, resList.length);
        console.log(resList[nth - 1]);
        rl.close();
    });
     
    
    // 递归函数
    function dfs(nums, used, path, replaceMap, res) {
        if (path !== "") res.push(parseInt(path));
    
        if (path.length === nums.length) return;
    
        for (let num of nums) {
            if (used.has(num)) continue;
    
            used.add(num);
            dfs(nums, used, path + num, replaceMap, res);
    
            if (replaceMap[num] && !used.has(replaceMap[num])) {
                dfs(nums, used, path + replaceMap[num], replaceMap, res);
            }
    
            used.delete(num);
        }
    }
    
     
    

## C++

    
    
    #include <iostream>
    #include <vector>
    #include <set>
    #include <algorithm>
    #include <string>
    #include <climits>
    using namespace std;
    
    // 递归函数，用于生成所有的排列组合
    void dfs(const vector<int>& nums, set<int>& used, string path, int map[], vector<int>& res) {
        // 如果当前路径不为空，将路径转换为整数并加入结果集
        if (!path.empty()) {
            res.push_back(stoi(path));
        }
    
        // 如果当前路径的长度已经等于输入的数字数量，递归结束
        if (path.length() == nums.size()) {
            return;
        }
    
        // 遍历所有输入的数字，尝试将每个数字放入当前路径中
        for (int num : nums) {
            // 如果当前数字已经在路径中使用，跳过此数字
            if (used.count(num)) continue;
    
            // 标记当前数字为使用中
            used.insert(num);
            // 递归调用，将当前数字加入路径中
            dfs(nums, used, path + to_string(num), map, res);
            // 如果当前数字有替代规则且替代数字未被使用，则尝试使用替代数字
            if (map[num] != 0 && !used.count(map[num])) {
                dfs(nums, used, path + to_string(map[num]), map, res);
            }
            // 回溯，取消当前数字的使用标记
            used.erase(num);
        }
    }
    
    int main() {
        string input;
        // 读取输入的一行字符串
        getline(cin, input);
    
        vector<int> nums;
        set<int> numSet;
        int n = INT_MIN;
    
        // 将逗号分隔的字符串转换为整数数组
        size_t pos = 0;
        while ((pos = input.find(',')) != string::npos) {
            int num = stoi(input.substr(0, pos));
            nums.push_back(num);
            input.erase(0, pos + 1);
        }
        nums.push_back(stoi(input));
    
        // 遍历输入的每一个数字，进行合法性检查和找出最大值
        for (int num : nums) {
            // 检查数字是否在1到9的范围内，且是否重复
            if (num < 1 || num > 9 || !numSet.insert(num).second) {
                // 如果数字不在范围内或者重复，则输出-1并结束程序
                cout << -1 << endl;
                return 0;
            }
            // 更新当前的最大值
            n = max(n, num);
        }
    
        // 检查是否输入了4个数字，并且不允许2和5同时出现，或6和9同时出现
        if (numSet.size() != 4 || (numSet.count(2) && numSet.count(5)) || (numSet.count(6) && numSet.count(9))) {
            // 如果条件不满足，输出-1并结束程序
            cout << -1 << endl;
            return 0;
        }
    
        // 创建一个映射数组，用于定义数字替代规则
        int map[10] = {0};
        map[2] = 5;
        map[5] = 2;
        map[6] = 9;
        map[9] = 6;
    
        // 创建一个列表用于存储生成的所有可能的排列结果
        vector<int> resList;
    
        // 调用递归函数，生成所有排列组合，并将结果存储到resList中
        set<int> used;
        dfs(nums, used, "", map, resList);
    
        // 如果没有生成任何有效的排列结果，输出-1
        if (resList.empty()) {
            cout << -1 << endl;
            return 0;
        }
    
        // 对结果列表进行自然顺序排序（升序）
        sort(resList.begin(), resList.end());
    
        // 确定要输出的第n个数字，其中n为输入的最大值，如果结果集数量不足，则输出最后一个
        int nth = min(n, (int)resList.size());
        // 输出排序后的第nth个数字（因为索引从0开始，所以为nth - 1）
        cout << resList[nth - 1] << endl;
    
        return 0;
    }
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    #include <string.h>
    #include <stdbool.h>
    
    #define MAX_NUMS 4
    
    // Helper function to check if a number is in the array
    bool contains(int *array, int size, int value) {
        for (int i = 0; i < size; i++) {
            if (array[i] == value) return true;
        }
        return false;
    }
    
    // Helper function for sorting integers in ascending order
    int compare(const void *a, const void *b) {
        return (*(int *)a - *(int *)b);
    }
    
    // DFS function to generate all permutations
    void dfs(int *nums, bool *used, int numsSize, int depth, int *result, int *resultSize, int *path, int replaceMap[10]) {
        if (depth > 0) {
            int number = 0;
            for (int i = 0; i < depth; i++) {
                number = number * 10 + path[i];
            }
            result[(*resultSize)++] = number;
        }
    
        if (depth == numsSize) return;
    
        for (int i = 0; i < numsSize; i++) {
            if (used[i]) continue;
    
            used[i] = true;
            path[depth] = nums[i];
            dfs(nums, used, numsSize, depth + 1, result, resultSize, path, replaceMap);
    
            if (replaceMap[nums[i]] != 0 && !contains(nums, numsSize, replaceMap[nums[i]])) {
                path[depth] = replaceMap[nums[i]];
                dfs(nums, used, numsSize, depth + 1, result, resultSize, path, replaceMap);
            }
    
            used[i] = false;
        }
    }
    
    int main() {
        char input[20];
        fgets(input, 20, stdin);
    
        // Parse input and convert to integers
        int nums[MAX_NUMS];
        int numsSize = 0;
        char *token = strtok(input, ",");
        while (token != NULL) {
            nums[numsSize++] = atoi(token);
            token = strtok(NULL, ",");
        }
    
        // Validate input
        if (numsSize != MAX_NUMS) {
            printf("-1\n");
            return 0;
        }
    
        bool numCheck[10] = {false};
        int maxN = 0;
        for (int i = 0; i < numsSize; i++) {
            if (nums[i] < 1 || nums[i] > 9 || numCheck[nums[i]]) {
                printf("-1\n");
                return 0;
            }
            numCheck[nums[i]] = true;
            if (nums[i] > maxN) maxN = nums[i];
        }
    
        if ((numCheck[2] && numCheck[5]) || (numCheck[6] && numCheck[9])) {
            printf("-1\n");
            return 0;
        }
    
        // Define replacement map
        int replaceMap[10] = {0};
        replaceMap[2] = 5;
        replaceMap[5] = 2;
        replaceMap[6] = 9;
        replaceMap[9] = 6;
    
        // Generate all possible permutations
        int result[10000];  // Large enough for storing results
        int resultSize = 0;
        bool used[MAX_NUMS] = {false};
        int path[MAX_NUMS];
    
        dfs(nums, used, numsSize, 0, result, &resultSize, path, replaceMap);
    
        if (resultSize == 0) {
            printf("-1\n");
            return 0;
        }
    
        // Sort results
        qsort(result, resultSize, sizeof(int), compare);
    
        // Output the N-th smallest number, or the last one if N exceeds the size
        int nth = maxN <= resultSize ? maxN : resultSize;
        printf("%d\n", result[nth - 1]);
    
        return 0;
    }
    

## 完整用例

### 用例1

    
    
    1,2,3,4
    

### 用例2

    
    
    5,6,7,8
    

### 用例3

    
    
    1,5,7,8
    

### 用例4

    
    
    9,1,6,2
    

### 用例5

    
    
    3,4,7,8
    

### 用例6

    
    
    2,5,6,9
    

### 用例7

    
    
    9,7,4,3
    

### 用例8

    
    
    1,6,7,8
    

### 用例9

    
    
    2,7,8,9
    

### 用例10

    
    
    2,5,6,9
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/8884bb6f62d1c3d789d4431e411ca204.png)

