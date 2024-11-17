#### 题目描述

给定两个数组a，b，若a[i] == b[j] 则称 [i, j] 为一个二元组，求在给定的两个数组中，二元组的个数。

#### 输入描述

第一行输入 m  
第二行输入m个数，表示第一个数组

第三行输入 n  
第四行输入n个数，表示第二个数组

#### 输出描述

二元组个数。

#### 用例

输入| 4  
1 2 3 4  
1  
1  
---|---  
输出| 1  
说明| 二元组个数为 1个  
输入| 6  
1 1 2 2 4 5  
3  
2 2 4  
---|---  
输出| 5  
说明| 二元组个数为 5 个。  
  
#### 题目解析

简单题，用双重for循环，就可以得到结果，复杂度是O(n*m)。但是在如果数组的数量特别大的话，可能会超时。

可以采用空间换时间。定义一个字典存储元素以及元素出现的次数。

#### C++

    
    
    #include <iostream>
    #include <vector>
    #include <unordered_map>
    
    int main() {
        int m, n;
        std::cin >> m;
    
        // 初始化第一个数组
        std::vector<int> arrayA(m);
        // 读取第一个数组的元素
        for (int i = 0; i < m; i++) {
            std::cin >> arrayA[i];
        }
    
        std::cin >> n;
    
        // 初始化第二个数组
        std::vector<int> arrayB(n);
        // 读取第二个数组的元素
        for (int i = 0; i < n; i++) {
            std::cin >> arrayB[i];
        }
    
        // 使用unordered_map统计第一个数组中元素的出现次数
        std::unordered_map<int, int> countA;
        for (int num : arrayA) {
            countA[num]++;
        }
    
        // 使用unordered_map统计第二个数组中元素的出现次数
        std::unordered_map<int, int> countB;
        for (int num : arrayB) {
            countB[num]++;
        }
    
        // 初始化二元组的个数为0
        int count = 0;
        // 遍历第一个数组的元素计数
        for (const auto& entry : countA) {
            // 获取元素值
            int key = entry.first;
            // 获取第一个数组中元素的出现次数
            int valueA = entry.second;
            // 获取第二个数组中元素的出现次数
            int valueB = countB[key];
            // 计算二元组的个数并累加
            count += valueA * valueB;
        }
    
        // 输出二元组的个数
        std::cout << count << std::endl;
    
        return 0;
    }
    
    

#### JavaScript

    
    
    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    const inputLines = [];
    rl.on('line', (line) => {
      inputLines.push(line);
      if (inputLines.length === 4) {
        processInput();
        rl.close();
      }
    });
    
    function processInput() {
      const m = parseInt(inputLines[0]);
      const arrayA = inputLines[1].split(' ').map(Number);
    
      const n = parseInt(inputLines[2]);
      const arrayB = inputLines[3].split(' ').map(Number);
    
      // 使用字典统计第一个数组中元素的出现次数
      const countA = {};
      for (const num of arrayA) {
        countA[num] = (countA[num] || 0) + 1;
      }
    
      // 使用字典统计第二个数组中元素的出现次数
      const countB = {};
      for (const num of arrayB) {
        countB[num] = (countB[num] || 0) + 1;
      }
    
      // 初始化二元组的个数为0
      let count = 0;
      // 遍历第一个数组的元素计数
      for (const key in countA) {
        // 获取第二个数组中元素的出现次数
        const valueB = countB[key] || 0;
        // 计算二元组的个数并累加
        count += countA[key] * valueB;
      }
    
      // 输出二元组的个数
      console.log(count);
    }
    
    
    

#### Java

    
    
    import java.util.*;
    
    public class Main {
        public static void main(String[] args) {
            Scanner sc = new Scanner(System.in);
    
            int m = sc.nextInt();
            int[] arrayA = new int[m];
            for (int i = 0; i < m; i++) {
                arrayA[i] = sc.nextInt();
            }
    
            int n = sc.nextInt();
            int[] arrayB = new int[n];
            for (int i = 0; i < n; i++) {
                arrayB[i] = sc.nextInt();
            }
    
            // 使用HashMap统计第一个数组中元素的出现次数
            Map<Integer, Integer> countA = new HashMap<>();
            for (int num : arrayA) {
                countA.put(num, countA.getOrDefault(num, 0) + 1);
            }
    
            // 使用HashMap统计第二个数组中元素的出现次数
            Map<Integer, Integer> countB = new HashMap<>();
            for (int num : arrayB) {
                countB.put(num, countB.getOrDefault(num, 0) + 1);
            }
    
            // 初始化二元组的个数为0
            int count = 0;
            // 遍历第一个数组的元素计数
            for (Map.Entry<Integer, Integer> entry : countA.entrySet()) {
                // 获取元素值
                int key = entry.getKey();
                // 获取第一个数组中元素的出现次数
                int valueA = entry.getValue();
                // 获取第二个数组中元素的出现次数
                int valueB = countB.getOrDefault(key, 0);
                // 计算二元组的个数并累加
                count += valueA * valueB;
            }
    
            // 输出二元组的个数
            System.out.println(count);
        }
    }
    
    
    

#### Python

    
    
    # 读取输入
    m = int(input())
    arrayA = list(map(int, input().split()))
    
    n = int(input())
    arrayB = list(map(int, input().split()))
    
     
    # 输出二元组的个数
    countA = {}
    for num in arrayA:
        countA[num] = countA.get(num, 0) + 1
    
    # 使用字典统计第二个数组中元素的出现次数
    countB = {}
    for num in arrayB:
        countB[num] = countB.get(num, 0) + 1
    
    # 初始化二元组的个数为0
    count = 0
    # 遍历第一个数组的元素计数
    for key, valueA in countA.items():
        # 获取第二个数组中元素的出现次数
        valueB = countB.get(key, 0)
        # 计算二元组的个数并累加
        count += valueA * valueB
     
    print(count)
    
     
    

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

