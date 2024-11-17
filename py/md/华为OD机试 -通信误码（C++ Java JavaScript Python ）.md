#### 题目描述

信号传播过程中会出现一些误码，不同的数字表示不同的误码ID，取值范围为1~65535，用一个数组记录误码出现的情况，  
每个误码出现的次数代表误码频度，请找出记录中包含频度最高误码的最小子数组长度。

#### 输入描述

误码总数目：取值范围为0~255，取值为0表示没有误码的情况。  
误码出现频率数组：误码ID范围为165535，数组长度为11000。

#### 输出描述

包含频率最高的误码最小子数组长度

#### 用例

输入| 5  
1 2 2 4 1  
---|---  
输出| 2  
说明| 频度最高的有1和2，频度是2（出现的次数都是2）。  
可以包含频度最高的记录数组是[2 2]和[1 2 2 4 1]，  
最短是[2 2]，最小长度为2。  
输入| 7  
1 2 2 4 2 1 1  
---|---  
输出| 4  
说明| 频度最高的是1和2，最短的是[2 2 4 2]  
  
#### 题目解析

简单的排序题。

#### C++

    
    
    #include <iostream>
    #include <vector>
    #include <unordered_map>
    
    using namespace std;
    
    int main() {
        int n;
        cin >> n;
    
        vector<int> nums(n);
        unordered_map<int, int> count;
    
        for (int i = 0; i < n; i++) {
            cin >> nums[i];
            count[nums[i]]++;
        }
    
        int max_count = 0;
        for (auto& p : count) {
            max_count = max(max_count, p.second);
        }
    
        int result = n;
        for (auto& p : count) {
            if (p.second == max_count) {
                int first = -1, last = -1;
                for (int i = 0; i < n; i++) {
                    if (nums[i] == p.first) {
                        if (first == -1) {
                            first = i;
                        }
                        last = i;
                    }
                }
                result = min(result, last - first + 1);
            }
        }
    
        cout << result << endl;
    
        return 0;
    }
    
    

#### JavaScript

    
    
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    let n;
    let nums = [];
    
    rl.on('line', (line) => {
      if (!n) {
        n = parseInt(line);
      } else {
        nums = line.split(" ").map(x => parseInt(x));
        let count = {};
        for (let i = 0; i < n; i++) {
          if (nums[i] in count) {
            count[nums[i]] += 1;
          } else {
            count[nums[i]] = 1;
          }
        }
        let max_count = 0;
        for (let key in count) {
          max_count = Math.max(max_count, count[key]);
        }
        let result = n;
        for (let key in count) {
          if (count[key] === max_count) {
            let first = -1;
            let last = -1;
            for (let i = 0; i < n; i++) {
              if (nums[i] === parseInt(key)) {
                if (first === -1) {
                  first = i;
                }
                last = i;
              }
            }
            result = Math.min(result, last - first + 1);
          }
        }
        console.log(result);
        rl.close();
      }
    });
    
    

#### Java

    
    
    import java.util.*;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            int n = scanner.nextInt();
            int[] nums = new int[n];
            for (int i = 0; i < n; i++) {
                nums[i] = scanner.nextInt();
            }
            Map<Integer, Integer> count = new HashMap<>();
            for (int i = 0; i < n; i++) {
                if (count.containsKey(nums[i])) {
                    count.put(nums[i], count.get(nums[i]) + 1);
                } else {
                    count.put(nums[i], 1);
                }
            }
            int maxCount = 0;
            for (int key : count.keySet()) {
                maxCount = Math.max(maxCount, count.get(key));
            }
            int result = n;
            for (int key : count.keySet()) {
                if (count.get(key) == maxCount) {
                    int first = -1;
                    int last = -1;
                    for (int i = 0; i < n; i++) {
                        if (nums[i] == key) {
                            if (first == -1) {
                                first = i;
                            }
                            last = i;
                        }
                    }
                    result = Math.min(result, last - first + 1);
                }
            }
            System.out.println(result);
        }
    }
    

#### Python

    
    
    n = int(input())
     
    nums = [int(x) for x in input().split(" ")]
    
    
    count = {}
    
    for i in range(n):
     
        if nums[i] in count:
            count[nums[i]] += 1
        else:
            count[nums[i]] = 1
    
    max_count = 0
    for key in count:
        max_count = max(max_count, count[key])
    
    result = n
    for key in count:
        if count[key] == max_count:
            first = -1
            last = -1
            for i in range(n):
                if nums[i] == key:
                    if first == -1:
                        first = i
                    last = i
            result = min(result, last - first + 1)
    
    print(result)
    

#### 文章目录

  *     *       * 题目描述
      * 输入描述
      * 输出描述
      * 用例
      * 题目解析
      * C++
      * JavaScript
      * Java
      * Python

![fengmian](https://img-
blog.csdnimg.cn/img_convert/1d2f33ed8cf2fb1b9a4fe09513f7aa94.png)

