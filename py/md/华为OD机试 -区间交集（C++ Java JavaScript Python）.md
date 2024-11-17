#### 题目描述

给定一组闭区间，其中部分区间存在交集。

任意两个给定区间的交集，称为公共区间(如:[1,2],[2,3]的公共区间为[2,2]，[3,5],[3,6]的公共区间为[3,5])。

公共区间之间若存在交集，则需要合并(如:[1,3],[3,5]区间存在交集[3,3]，需合并为[1,5])。

按[升序排列](https://so.csdn.net/so/search?q=%E5%8D%87%E5%BA%8F%E6%8E%92%E5%88%97&spm=1001.2101.3001.7020)输出合并后的区间列表。

#### 输入描述

一组区间列表，

区间数为 N: 0<=N<=1000;

区间元素为 X: -10000<=X<=10000。

#### 输出描述

升序排列的合并区间列表

**备注:**

1、区间元素均为数字，不考虑字母、符号等异常输入。

2、单个区间认定为无公共区间。

#### 用例1

输入

    
    
    4
    0 3
    1 3
    3 5
    3 6
    

输出

    
    
    1 5
    

说明

> [0,3]和[1,3]的公共区间为[1,3]，  
>  [0,3]和[3,5]的公共区间为[3,3]，  
>  [0,3]和[3,6]的公共区间为[3,3]，  
>  [1,3]和[3,5]的公共区间为[3,3]，  
>  [1,3]和[3,6]的公共区间为[3,3]，  
>  [3,5]和[3,6]的公共区间为[3,5]，  
>  公共区间列表为[[1,3],[3,3],[3,5]]；  
>  [1,3],[3,3],[3,5]存在交集，须合并为[1,5]。

#### 用例2

输入

    
    
    4
    0 3
    1 4
    4 7
    5 8
    

输出

    
    
    1 3
    4 4 
    5 7
    

#### C++

    
    
    #include <iostream>
    #include <vector>
    #include <algorithm>
    using namespace std;
    
    void mergeIntervals(vector<vector<int>>& intervals) {
        // intersections用于保存交集
        vector<vector<int>> intersections;
     
        // 任意两区间的交集
        for (int i = 0; i < intervals.size(); i++) {
            for (int j = i + 1; j < intervals.size(); j++) {
                int start1 = intervals[i][0], end1 = intervals[i][1];
                int start2 = intervals[j][0], end2 = intervals[j][1];
                int left = max(start1, start2), right = min(end1, end2);
                if (left <= right) {
                    intersections.push_back({left, right}); // 将交集加入intersections
                }
            }
        }
     
        if (intersections.empty()) { // 如果没有交集
            cout << "None" << endl;
            return;
        }
     
        // 合并交集
        sort(intersections.begin(), intersections.end(), [](vector<int>& a, vector<int>& b) {
            return a[0] < b[0]; // 按照左端点从小到大排序
        });
        vector<int> mergeRes = intersections[0]; // 初始化mergeRes为第一个交集
        for (int i = 1; i < intersections.size(); i++) {
            int start1 = mergeRes[0], end1 = mergeRes[1];
            int start2 = intersections[i][0], end2 = intersections[i][1];
            if (end1 >= start2) { // 如果有重叠，合并两个区间
                mergeRes[1] = max(end1, end2);
            } else { // 如果没有重叠，输出当前合并后的区间，更新mergeRes
                cout << mergeRes[0] << " " << mergeRes[1] << endl;
                mergeRes = intersections[i];
            }
        }
        cout << mergeRes[0] << " " << mergeRes[1] << endl; // 输出最终合并后的区间
    }
    
    int main() {
        int n;
        vector<vector<int>> intervals;
        cin >> n;
        for (int i = 0; i < n; i++) {
            int start, end;
            cin >> start >> end;
            intervals.push_back({start, end}); // 将输入的区间加入intervals
        }
        mergeIntervals(intervals); // 合并区间
        return 0;
    }
    

####

#### java

    
    
    import java.util.*;
    
    public class Main {
        public static void main(String[] args) {
            Scanner input = new Scanner(System.in);
            int n = input.nextInt(); // 输入区间数
            List<List<Integer>> intervals = new ArrayList<>(); // 保存区间列表
            for (int i = 0; i < n; i++) {
                int start = input.nextInt(); // 输入区间起始值
                int end = input.nextInt(); // 输入区间结束值
                List<Integer> interval = new ArrayList<>(); // 创建区间
                interval.add(start); // 添加起始值
                interval.add(end); // 添加结束值
                intervals.add(interval); // 将区间添加到列表中
            }
            mergeIntervals(intervals); // 调用合并区间的方法
        }
    
        public static void mergeIntervals(List<List<Integer>> intervals) {
            List<List<Integer>> intersections = new ArrayList<>(); // 保存交集的列表
            for (int i = 0; i < intervals.size(); i++) {
                for (int j = i + 1; j < intervals.size(); j++) {
                    int start1 = intervals.get(i).get(0), end1 = intervals.get(i).get(1);
                    int start2 = intervals.get(j).get(0), end2 = intervals.get(j).get(1);
                    int left = Math.max(start1, start2), right = Math.min(end1, end2);
                    if (left <= right) {
                        List<Integer> intersection = new ArrayList<>(); // 创建交集
                        intersection.add(left); // 添加交集起始值
                        intersection.add(right); // 添加交集结束值
                        intersections.add(intersection); // 将交集添加到列表中
                    }
                }
            }
            if (intersections.isEmpty()) {
                System.out.println("None"); // 如果交集列表为空，则输出"None"
                return;
            }
            Collections.sort(intersections, new Comparator<List<Integer>>() {
                @Override
                public int compare(List<Integer> a, List<Integer> b) {
                    return a.get(0) - b.get(0); // 按照交集起始值升序排序
                }
            });
            List<Integer> mergeRes = intersections.get(0); // 初始化合并结果为第一个交集
            for (int i = 1; i < intersections.size(); i++) {
                int start1 = mergeRes.get(0), end1 = mergeRes.get(1);
                int start2 = intersections.get(i).get(0), end2 = intersections.get(i).get(1);
                if (end1 >= start2) {
                    mergeRes.set(1, Math.max(end1, end2)); // 合并交集
                } else {
                    System.out.println(mergeRes.get(0) + " " + mergeRes.get(1)); // 输出合并结果的起始值和结束值
                    mergeRes = intersections.get(i); // 更新合并结果为当前交集
                }
            }
            System.out.println(mergeRes.get(0) + " " + mergeRes.get(1)); // 输出最终的合并结果的起始值和结束值
        }
    }
    

#### javascript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    function mergeIntervals(intervals) {
      // intersections用于保存交集
      let intersections = [];
    
      // 任意两区间的交集
      for (let i = 0; i < intervals.length; i++) {
        for (let j = i + 1; j < intervals.length; j++) {
          let start1 = intervals[i][0], end1 = intervals[i][1];
          let start2 = intervals[j][0], end2 = intervals[j][1];
          let left = Math.max(start1, start2), right = Math.min(end1, end2);
          if (left <= right) {
            intersections.push([left, right]); // 将交集加入intersections
          }
        }
      }
    
      if (intersections.length === 0) { // 如果没有交集
        console.log("None");
        return;
      }
    
      // 合并交集
      intersections.sort((a, b) => a[0] - b[0]); // 按照左端点从小到大排序
      let mergeRes = intersections[0]; // 初始化mergeRes为第一个交集
      for (let i = 1; i < intersections.length; i++) {
        let start1 = mergeRes[0], end1 = mergeRes[1];
        let start2 = intersections[i][0], end2 = intersections[i][1];
        if (end1 >= start2) { // 如果有重叠，合并两个区间
          mergeRes[1] = Math.max(end1, end2);
        } else { // 如果没有重叠，输出当前合并后的区间，更新mergeRes
          console.log(mergeRes[0] + " " + mergeRes[1]);
          mergeRes = intersections[i];
        }
      }
      console.log(mergeRes[0] + " " + mergeRes[1]); // 输出最终合并后的区间
    }
    
    let n;
    let intervals = [];
    
    rl.on('line', (input) => {
      if (!n) {
        n = parseInt(input);
      } else {
        let [start, end] = input.split(" ").map(Number);
        intervals.push([start, end]); // 将输入的区间加入intervals
        if (intervals.length === n) {
          mergeIntervals(intervals); // 合并区间
          rl.close();
        }
      }
    });
    

#### python

    
    
    def mergeIntervals(intervals):
        # intersections用于保存交集
        intersections = []
        
        # 任意两区间的交集
        for i in range(len(intervals)):
            for j in range(i + 1, len(intervals)):
                start1, end1 = intervals[i][0], intervals[i][1]
                start2, end2 = intervals[j][0], intervals[j][1]
                left, right = max(start1, start2), min(end1, end2)
                if left <= right:
                    intersections.append([left, right]) # 将交集加入intersections
        
        if not intersections: # 如果没有交集
            print("None")
            return
        
        # 合并交集
        intersections.sort(key=lambda x: x[0]) # 按照左端点从小到大排序
        mergeRes = intersections[0] # 初始化mergeRes为第一个交集
        for i in range(1, len(intersections)):
            start1, end1 = mergeRes[0], mergeRes[1]
            start2, end2 = intersections[i][0], intersections[i][1]
            if end1 >= start2: # 如果有重叠，合并两个区间
                mergeRes[1] = max(end1, end2)
            else: # 如果没有重叠，输出当前合并后的区间，更新mergeRes
                print(mergeRes[0], mergeRes[1])
                mergeRes = intersections[i]
        print(mergeRes[0], mergeRes[1]) # 输出最终合并后的区间
    
    n = int(input())
    intervals = []
    for i in range(n):
        start, end = map(int, input().split())
        intervals.append([start, end]) # 将输入的区间加入intervals
    mergeIntervals(intervals) # 合并区间
    

> #### 文章目录
>
>   *     *       * 题目描述
>       * 输入描述
>       * 输出描述
>       * 用例1
>       * 用例2
>       * C++
>       *       * java
>       * javascript
>       * python
>       * 完整用例
>       *         * 用例1
>         * 用例2
>         * 用例3
>         * 用例4
>         * 用例5
>         * 用例6
>         * 用例7
>         * 用例8
>         * 用例9
>         * 用例10
>

![fengmian](https://img-
blog.csdnimg.cn/img_convert/1d2f33ed8cf2fb1b9a4fe09513f7aa94.png)

#### 完整用例

##### 用例1

    
    
    2
    1 3
    2 4
    

##### 用例2

    
    
    3
    1 2
    2 3
    3 4
    

##### 用例3

    
    
    3
    1 5
    2 4
    3 6
    

##### 用例4

    
    
    4
    1 3
    2 4
    3 5
    4 6
    

##### 用例5

    
    
    4
    0 3
    1 4
    4 7
    5 8
    

##### 用例6

    
    
    6
    1 2
    2 3
    3 4
    4 5
    5 6
    6 7
    

##### 用例7

    
    
    5
    1 3
    2 4
    3 5
    4 6
    5 7
    

##### 用例8

    
    
    4
    1 4
    2 5
    3 6
    4 7
    

##### 用例9

    
    
    3
    2 4
    1 3
    3 5
    

##### 用例10

    
    
    4
    1 3
    1 4
    3 5
    4 6
    

