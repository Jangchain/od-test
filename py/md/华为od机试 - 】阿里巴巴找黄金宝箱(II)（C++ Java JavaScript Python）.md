## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

一贫如洗的樵夫阿里巴巴在去砍柴的路上，无意中发现了强盗集团的藏宝地，藏宝地有编号从0-N的箱子，每个箱子上面贴有箱子中藏有[金币](https://so.csdn.net/so/search?q=%E9%87%91%E5%B8%81&spm=1001.2101.3001.7020)的数量。

从金币数量中选出一个数字集合，并销毁贴有这些数字的每个箱子，如果能销毁一半及以上的箱子，则返回这个数字集合的最小大小

## 输入描述

一个数字字串，数字之间使用逗号分隔，例如：6,6,6,6,3,3,3,1,1,5

字串中数字的个数为偶数，并且

  * 1 ≤ 字串中数字的个数 ≤ 100000
  * 1 ≤ 每个数字 ≤ 100000

## 输出描述

一个数字字串，数字之间使用逗号分隔，例如：6,6,6,6,3,3,3,1,1,5

字串中数字的个数为偶数，并且

  * 1 ≤ 字串中数字的个数 ≤ 100000
  * 1 ≤ 每个数字 ≤ 100000

## 示例1

输入

    
    
     1,1,1,1,3,3,3,6,6,8
    

输出

    
    
    2
    

说明

> 选择集合{1,8}，销毁后的结果数组为[3,3,3,6,6]，长度为5，长度为原数组的一半。
>
> 大小为 2 的可行集合还有{1,3},{1,6},{3,6}。  
>  选择 {6,8} 集合是不可行的，它销后的结果数组为[1,1,1,1,3,3,3]，新数组长度大于原数组的二分之一。

## 示例2

输入

    
    
    2,2,2,2
    

输出

    
    
    1
    

说明

> 我们只能选择集合{2}，销毁后的结果数组为空。

## 解题思路

**目标**
：在给定的一串用逗号分隔的数字中，从中选出若干个不同的数字，这些选出的数字代表要销毁的箱子上的标签。销毁这些数字的所有箱子后，如果剩余的箱子数量**不超过原数组的一半**
，则返回所选数字的最小个数。

这道题的核心是**贪心算法** ：我们总是优先选择出现次数最多的数字进行销毁，以最快地减少剩余箱子的数量。通过这种方法，可以确保以最小的选择数量达到要求。

#### 思路分析

  * **输入** 是一个逗号分隔的数字字符串，例如 `6,6,6,6,3,3,3,1,1,5`。
  * 我们需要选择尽可能少的数字集合，使得销毁包含这些数字的所有箱子后，剩下的箱子数小于等于**原数组的一半** 。
  * 输出结果是选出的数字集合的**最小大小** 。

#### 解题步骤

  1. **统计每个数字的出现频次** ：我们首先统计输入字符串中每个数字出现的次数。
  2. **排序频次** ：将这些频次按从大到小排序，优先销毁出现次数最多的数字。
  3. **选择数字** ： 
     * 从频次最大的数字开始依次选择，逐步销毁这些数字对应的箱子。
     * 累加被销毁的箱子数量，直到被销毁的箱子数量达到或超过原数组长度的一半。
  4. **输出结果** ：一旦销毁的箱子数量达到或超过一半，返回所选择的数字集合的大小。

#### 示例讲解

**示例 1** ：

  * 输入：`1,1,1,1,3,3,3,6,6,8`
  * 统计频次： 
    * `1` 出现 4 次
    * `3` 出现 3 次
    * `6` 出现 2 次
    * `8` 出现 1 次
  * 总共有 10 个数字，需要销毁 **5 个或更多** 才能满足条件。
  * 按频次排序选择： 
    * 选择 `1`，销毁 4 个箱子（剩余 6 个）
    * 再选择 `3`，销毁 3 个箱子（剩余 3 个）
  * 选择 `1` 和 `3` 一共销毁 7 个箱子，剩余的 3 个箱子小于原数组长度的一半。
  * 所以最少选择 **2** 个数字即可满足条件，输出 `2`。

**示例 2** ：

  * 输入：`2,2,2,2`
  * 统计频次： 
    * `2` 出现 4 次
  * 总共有 4 个数字，需要销毁 **2 个或更多** 才能满足条件。
  * 只能选择 `2`，销毁全部 4 个箱子。
  * 所以只需要选择 **1** 个数字即可满足条件，输出 `1`。

####

####

## Java

    
    
    import java.util.*;
    
    public class MinSetSize {
        public static int minSetSize(int[] nums) {
            // 统计每个数字的出现频次
            Map<Integer, Integer> freq = new HashMap<>();
            for (int num : nums) {
                freq.put(num, freq.getOrDefault(num, 0) + 1);
            }
    
            // 将频次按降序排列
            List<Integer> sortedFreq = new ArrayList<>(freq.values());
            Collections.sort(sortedFreq, Collections.reverseOrder());
    
            // 初始化销毁的箱子计数和选择的数字数量
            int destroyed = 0;
            int count = 0;
            int halfLength = nums.length / 2;
    
            // 逐步选择数字销毁，直到销毁的箱子数量达到一半
            for (int f : sortedFreq) {
                destroyed += f;
                count++;
                if (destroyed >= halfLength) {
                    return count;
                }
            }
            return count;
        }
    
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
             String[] input = scanner.nextLine().split(",");
            int[] nums = Arrays.stream(input).mapToInt(Integer::parseInt).toArray();
            System.out.println(minSetSize(nums));
        }
    }
    

## Python

    
    
    from collections import Counter
    
    def min_set_size(nums):
        # 统计每个数字的出现频次
        freq = Counter(nums)
        
        # 将频次按降序排列
        sorted_freq = sorted(freq.values(), reverse=True)
        
        # 初始化销毁的箱子计数和选择的数字数量
        destroyed = 0
        count = 0
        half_length = len(nums) // 2
        
        # 逐步选择数字销毁，直到销毁的箱子数量达到一半
        for f in sorted_freq:
            destroyed += f
            count += 1
            if destroyed >= half_length:
                return count
    
    # 示例测试
    nums = list(map(int, input("").split(',')))
    print(min_set_size(nums))
    

## JavaScript

    
    
    const readline = require('readline');
    
    // 函数：计算最小选择集合的大小
    function minSetSize(nums) {
        // 统计每个数字的出现频次
        const freq = {};
        nums.forEach(num => {
            freq[num] = (freq[num] || 0) + 1;
        });
    
        // 将频次按降序排列
        const sortedFreq = Object.values(freq).sort((a, b) => b - a);
    
        // 初始化销毁的箱子计数和选择的数字数量
        let destroyed = 0;
        let count = 0;
        const halfLength = Math.floor(nums.length / 2);
    
        // 逐步选择数字销毁，直到销毁的箱子数量达到一半
        for (let f of sortedFreq) {
            destroyed += f;
            count++;
            if (destroyed >= halfLength) {
                return count;
            }
        }
    }
    
    // 读取输入并处理
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.on("line", (input) => {
        const nums = input.split(',').map(Number);
        console.log(minSetSize(nums));
        rl.close();
    });
    

## C++

    
    
    #include <iostream>
    #include <vector>
    #include <unordered_map>
    #include <algorithm>
    
    using namespace std;
    
    int minSetSize(vector<int>& nums) {
        // 统计每个数字的出现频次
        unordered_map<int, int> freq;
        for (int num : nums) {
            freq[num]++;
        }
    
        // 将频次按降序排列
        vector<int> sortedFreq;
        for (const auto& entry : freq) {
            sortedFreq.push_back(entry.second);
        }
        sort(sortedFreq.rbegin(), sortedFreq.rend());
    
        // 初始化销毁的箱子计数和选择的数字数量
        int destroyed = 0;
        int count = 0;
        int halfLength = nums.size() / 2;
    
        // 逐步选择数字销毁，直到销毁的箱子数量达到一半
        for (int f : sortedFreq) {
            destroyed += f;
            count++;
            if (destroyed >= halfLength) {
                return count;
            }
        }
        return count;
    }
    
    int main() {
        
        string input;
        getline(cin, input);
        
        // 将输入转为整数数组
        vector<int> nums;
        size_t pos = 0;
        while ((pos = input.find(',')) != string::npos) {
            nums.push_back(stoi(input.substr(0, pos)));
            input.erase(0, pos + 1);
        }
        nums.push_back(stoi(input)); // 添加最后一个数字
    
        cout << minSetSize(nums) << endl;
        return 0;
    }
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    
    typedef struct {
        int num;
        int freq;
    } Pair;
    
    // 比较函数，用于降序排序频次
    int compare(const void* a, const void* b) {
        return ((Pair*)b)->freq - ((Pair*)a)->freq;
    }
    
    // 查找或插入数字频次
    void addFrequency(Pair* pairs, int* pairCount, int num) {
        for (int i = 0; i < *pairCount; i++) {
            if (pairs[i].num == num) {
                pairs[i].freq++;
                return;
            }
        }
        pairs[*pairCount].num = num;
        pairs[*pairCount].freq = 1;
        (*pairCount)++;
    }
    
    // 计算最小选择集合的大小
    int minSetSize(int* nums, int size) {
        // 统计每个数字的出现频次
        Pair pairs[size];
        int pairCount = 0;
        for (int i = 0; i < size; i++) {
            addFrequency(pairs, &pairCount, nums[i]);
        }
    
        // 将频次按降序排列
        qsort(pairs, pairCount, sizeof(Pair), compare);
    
        // 初始化销毁的箱子计数和选择的数字数量
        int destroyed = 0;
        int count = 0;
        int halfLength = size / 2;
    
        // 逐步选择数字销毁，直到销毁的箱子数量达到一半
        for (int i = 0; i < pairCount; i++) {
            destroyed += pairs[i].freq;
            count++;
            if (destroyed >= halfLength) {
                return count;
            }
        }
        return count;
    }
    
    int main() {
        char input[100000];
       
        fgets(input, 100000, stdin);
    
        // 将输入转为整数数组
        int nums[100000];
        int size = 0;
        char* token = strtok(input, ",\n");
        while (token != NULL) {
            nums[size++] = atoi(token);
            token = strtok(NULL, ",\n");
        }
    
        printf("%d\n", minSetSize(nums, size));
        return 0;
    }
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/e640e87904d369564ae0e3059b2264be.png)

#### 完整用例

##### 用例1

    
    
    1,1,1,1,3,3,3,6,6,8
    

##### 用例2

    
    
    6,6,6,6,3,3,3,1,1,5
    

##### 用例3

    
    
    2,2,2,4,4,4,6,6,6,8
    

##### 用例4

    
    
    1,1,2,2,3,3,4,4,5,5
    

##### 用例5

    
    
    3,3,3,3,3,3,3,3,3,3
    

##### 用例6

    
    
    1,2,3,4,5,6,7,8,9,10
    

##### 用例7

    
    
    1,1,1,1,1,2,2,2,2,2
    

##### 用例8

    
    
    1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20
    

##### 用例9

    
    
    1,2,3,4,5,5,5,5,5,5
    

##### 用例10

    
    
    1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4
    

