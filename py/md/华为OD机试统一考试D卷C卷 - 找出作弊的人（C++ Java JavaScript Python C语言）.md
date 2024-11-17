## 题目描述

公司组织了一次考试,现在考试结果出来了，想看一下有没人存在作弊行为,但是员工太多了,需要先对员工进行一次过滤,再进一步确定是否存在作弊行为。

过滤的规则为:找到分差最小的员工ID对(p1,p2)列表,要求p1<p2

员工个数取值范国:O<n<100000

员工ID为整数,取值范围:0<=n<=100000

考试成绩为整数,取值范围:0<=score<=300

## 输入描述

员工的ID及考试分数

## 输出描述

分差最小的员工ID对(p1,p2)列表,要求p1<p2。每一行代表一个集合,每个集合内的员工ID按顺序排列,多行结果也以员工对中p1值大小升序排列(如果p1相同则p2升序)。

## 样例1

输入：

    
    
    5
    1 90
    2 91
    3 95
    4 96
    5 100
    

输出:

    
    
    1 2
    3 4
    

解释:

> 输入：第一行为员工个数n，后续的n行第一个数值为员工ID,第二个数值为员工考试分数
>
> 输出:员工1和员工2的分差为1,员工3和员工4的分差也为1,因此最终结果为
>
> 1 2
>
> 3 4

## 样例2

输入：

    
    
    5
    1 90
    2 91
    3 92
    4 85
    5 86
    

输出：

    
    
    1 2
    2 3
    4 5 
    

## 解题思路

## C++

    
    
    #include <iostream>
    #include <vector>
    #include <algorithm>
    #include <climits>
    
    using namespace std;
    
    int main() {
        // 读取员工数量
        int n;
        cin >> n;
    
        // 创建一个vector来存储员工的ID和分数
        vector<pair<int, int>> scoreList;
        for (int i = 0; i < n; i++) {
            int id, score;
            cin >> id >> score;
            scoreList.push_back({id, score});
        }
    
        // 按分数升序对员工进行排序
        sort(scoreList.begin(), scoreList.end(), [](const pair<int, int>& a, const pair<int, int>& b) {
            return a.second < b.second;
        });
    
        int minDiff = INT_MAX;
        vector<pair<int, int>> pairs;
    
        // 比较每对员工的分数差
        for (int i = 0; i < n - 1; i++) {
            for (int j = i + 1; j < n; j++) {
                int curDiff = scoreList[j].second - scoreList[i].second;
                if (curDiff < minDiff) {
                    pairs.clear();
                    minDiff = curDiff;
                    pairs.push_back({min(scoreList[i].first, scoreList[j].first), max(scoreList[i].first, scoreList[j].first)});
                } else if (curDiff == minDiff) {
                    pairs.push_back({min(scoreList[i].first, scoreList[j].first), max(scoreList[i].first, scoreList[j].first)});
                } else {
                    break;
                }
            }
        }
    
        // 对ID对进行排序
        sort(pairs.begin(), pairs.end());
    
        // 输出ID对
        for (auto &pair : pairs) {
            cout << pair.first << " " << pair.second << endl;
        }
    
        return 0;
    }
    

## Java

    
    
    import java.util.ArrayList;
    import java.util.Comparator;
    import java.util.List;
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            // 创建Scanner对象，用于从控制台读取数据
            Scanner scanner = new Scanner(System.in);
            // 读取员工个数n
            int n = scanner.nextInt();
    
            // 创建一个List来存储员工的ID和分数，每个员工的信息存储在一个长度为2的int数组中
            List<int[]> scoreList = new ArrayList<>();
            for (int i = 0; i < n; i++) {
                // 对于每个员工，读取他们的ID和分数，并将它们作为一个数组添加到scoreList中
                scoreList.add(new int[]{scanner.nextInt(), scanner.nextInt()});
            }
    
            // 关闭Scanner对象
            scanner.close();
    
            // 按照分数(scoreList中每个数组的第二个元素)对scoreList进行升序排序
            scoreList.sort(Comparator.comparingInt(a -> a[1]));
    
            // 初始化最小分差为Integer的最大值，用于后续寻找最小分差
            int minDiff = Integer.MAX_VALUE;
            // 创建一个List来存储分差最小的员工ID对
            List<int[]> pairs = new ArrayList<>();
    
            // 双重循环，比较每对员工的分数差
            for (int i = 0; i < n - 1; i++) {
                for (int j = i + 1; j < n; j++) {
                    // 计算当前遍历到的两个员工的分数差
                    int curDiff = scoreList.get(j)[1] - scoreList.get(i)[1];
    
                    // 如果当前分差小于已记录的最小分差
                    if (curDiff < minDiff) {
                        // 清空pairs列表，因为我们找到了更小的分差
                        pairs.clear();
                        // 更新最小分差
                        minDiff = curDiff;
                        // 将当前的员工ID对添加到pairs中，注意保证ID较小的在前
                        pairs.add(new int[]{Math.min(scoreList.get(i)[0], scoreList.get(j)[0]), Math.max(scoreList.get(i)[0], scoreList.get(j)[0])});
                    } else if (curDiff == minDiff) {
                        // 如果当前分差等于已记录的最小分差，则直接将该员工ID对添加到pairs中
                        pairs.add(new int[]{Math.min(scoreList.get(i)[0], scoreList.get(j)[0]), Math.max(scoreList.get(i)[0], scoreList.get(j)[0])});
                    } else {
                        // 由于scoreList已按分数升序排序，如果当前分差大于最小分差，则后续不会再有更小的分差，直接跳出内层循环
                        break;
                    }
                }
            }
    
            // 对找到的员工ID对进行排序，首先按第一个ID(p1)升序排序，如果第一个ID相同，则按第二个ID(p2)升序排序
            pairs.sort(Comparator.<int[]>comparingInt(a -> a[0]).thenComparingInt(a -> a[1]));
    
            // 遍历pairs，按题目要求格式输出每对员工ID
            for (int[] pair : pairs) {
                System.out.println(pair[0] + " " + pair[1]);
            }
        }
    }
    

## javaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    let input = [];
    
    rl.on('line', (line) => {
        input.push(line.trim());
    }).on('close', () => {
        // 读取员工的数量
        const n = parseInt(input.shift());
        // 创建一个数组用于存储员工的ID和分数
        const employees = input.map(line => line.split(' ').map(Number));
    
        // 按分数排序
        employees.sort((a, b) => a[1] - b[1]);
    
        let minDiff = Number.MAX_SAFE_INTEGER;
        const pairs = [];
    
        for (let i = 0; i < n - 1; i++) {
            for (let j = i + 1; j < n; j++) {
                const curDiff = employees[j][1] - employees[i][1];
                if (curDiff < minDiff) {
                    pairs.length = 0; // 清空数组
                    minDiff = curDiff;
                    pairs.push({ id1: Math.min(employees[i][0], employees[j][0]), id2: Math.max(employees[i][0], employees[j][0]) });
                } else if (curDiff === minDiff) {
                    pairs.push({ id1: Math.min(employees[i][0], employees[j][0]), id2: Math.max(employees[i][0], employees[j][0]) });
                } else {
                    break;
                }
            }
        }
    
        // 对ID对进行排序
        pairs.sort((a, b) => a.id1 - b.id1 || a.id2 - b.id2);
    
        // 输出结果
        pairs.forEach(pair => {
            console.log(`${pair.id1} ${pair.id2}`);
        });
    });
    
     
    

## Python

    
    
    # 从标准输入读取员工数量
    n = int(input())
    
    # 创建一个列表来存储员工的ID和分数
    score_list = []
    for _ in range(n):
        id_score = input().split()
        id, score = int(id_score[0]), int(id_score[1])
        score_list.append((id, score))
    
    # 按分数升序对员工进行排序
    score_list.sort(key=lambda x: x[1])
    
    min_diff = float('inf')
    pairs = []
    
    # 比较每对员工的分数差
    for i in range(n - 1):
        for j in range(i + 1, n):
            cur_diff = score_list[j][1] - score_list[i][1]
            if cur_diff < min_diff:
                pairs.clear()
                min_diff = cur_diff
                pairs.append((min(score_list[i][0], score_list[j][0]), max(score_list[i][0], score_list[j][0])))
            elif cur_diff == min_diff:
                pairs.append((min(score_list[i][0], score_list[j][0]), max(score_list[i][0], score_list[j][0])))
            else:
                break
    
    # 对ID对进行排序
    pairs.sort()
    
    # 输出ID对
    for pair in pairs:
        print(pair[0], pair[1])
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    #include <limits.h>
    // 定义一个结构体用于存储员工的ID和分数
    typedef struct {
        int id;
        int score;
    } Employee;
    
    // 用于比较两个员工分数的函数，便于后续排序
    int compareScore(const void* a, const void* b) {
        Employee *employeeA = (Employee *)a;
        Employee *employeeB = (Employee *)b;
        return employeeA->score - employeeB->score;
    }
    
    // 用于比较两个员工ID的函数，便于后续排序ID对
    int compareId(const void* a, const void* b) {
        Employee *employeeA = (Employee *)a;
        Employee *employeeB = (Employee *)b;
        if (employeeA->id != employeeB->id) return employeeA->id - employeeB->id;
        return employeeA->score - employeeB->score; // 如果ID相同，则按分数排序（虽然场景中可能不会发生）
    }
    
    int main() {
        // 读取员工数量
        int n;
         scanf("%d", &n);
    
        // 动态分配数组空间来存储员工的ID和分数
        Employee* scoreList = (Employee*)malloc(n * sizeof(Employee));
        for (int i = 0; i < n; i++) {
            // 读取每个员工的ID和分数
             scanf("%d %d", &scoreList[i].id, &scoreList[i].score);
        }
    
        // 使用qsort对员工进行按分数的升序排序
        qsort(scoreList, n, sizeof(Employee), compareScore);
    
        int minDiff = INT_MAX;
        Employee* pairs = (Employee*)malloc(n * sizeof(Employee)); // 存储分数差最小的员工ID对
        int pairCount = 0;
    
        // 比较每对员工的分数差
        for (int i = 0; i < n - 1; i++) {
            for (int j = i + 1; j < n; j++) {
                int curDiff = scoreList[j].score - scoreList[i].score;
                if (curDiff < minDiff) {
                    // 发现更小的分数差，重置数组并更新最小差值
                    pairCount = 0;
                    minDiff = curDiff;
                    pairs[pairCount].id = scoreList[i].id < scoreList[j].id ? scoreList[i].id : scoreList[j].id;
                    pairs[pairCount++].score = scoreList[i].id < scoreList[j].id ? scoreList[j].id : scoreList[i].id;
                } else if (curDiff == minDiff) {
                    // 相同的分数差，添加到数组中
                    pairs[pairCount].id = scoreList[i].id < scoreList[j].id ? scoreList[i].id : scoreList[j].id;
                    pairs[pairCount++].score = scoreList[i].id < scoreList[j].id ? scoreList[j].id : scoreList[i].id;
                } else {
                    break; // 因为是升序排序，后续的差值只会更大，所以可以提前结束循环
                }
            }
        }
    
        // 使用qsort对ID对进行排序
        qsort(pairs, pairCount, sizeof(Employee), compareId);
    
        // 输出ID对
         for (int i = 0; i < pairCount; i++) {
            printf("%d %d\n", pairs[i].id, pairs[i].score);
        }
    
        // 释放动态分配的内存
        free(scoreList);
        free(pairs);
    
        return 0;
    }
    

## 完整用例

### 用例1

    
    
    5
    1 90
    2 91
    3 95
    4 96
    5 100
    

### 用例2

    
    
    3
    1 100
    2 101
    3 102
    

### 用例3

    
    
    4
    1 80
    2 85
    3 90
    4 95
    

### 用例4

    
    
    5
    1 60
    2 65
    3 70
    4 75
    5 85
    

### 用例5

    
    
    6
    1 50
    2 55
    3 60
    4 65
    5 65
    6 65
    

### 用例6

    
    
    2
    1 40
    2 38
    

### 用例7

    
    
    5
    1 90
    2 91
    3 95
    4 96
    5 100
    

### 用例8

    
    
    5
    1 100
    2 90
    3 95
    4 91
    5 96
    

### 用例9

    
    
    5
    3 95
    1 90
    5 100
    2 91
    4 96
    

### 用例10

    
    
    3
    1 300
    2 300
    3 300
    

#### 文章目录

  * 题目描述
  * 输入描述
  * 输出描述
  * 样例1
  * 样例2
  * 解题思路
  * C++
  * Java
  * javaScript
  * Python
  * C语言
  * 完整用例
  *     * 用例1
    * 用例2
    * 用例3
    * 用例4
    * 用例5
    * 用例6
    * 用例7
    * 用例8
    * 用例9
    * 用例10

![fengmian](https://i-blog.csdnimg.cn/blog_migrate/169f277a87c29b8ff13d65ef9e7eeec7.png)

