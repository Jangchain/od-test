## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

现在有多组整数数组,需要将他们合并成一个新的数组。

合并规则：

  * 从每个数组里按顺序取出固定长度的内容合并到新的数组中,取完的内容会删除掉,
  * 如果该行不足固定长度或者已经为空, 则直接取出剩余部分的内容放到新的数组中,继续下一行。

如样例1,获得长度3,先遍历第一行,获得2,5,6；再遍历第二行,获得1,7,4；再循环回到第一行,获得7,9,5；再遍历第二行,获得3,4；  
再回到第一行,获得7,按顺序拼接成最终结果。

## 输入描述

第一行是每次读取的固定长度,0<长度<10；第二行是整数数组的数目0<数目<1000,

第3~n行是需要合并的数组,不同的数组用回车换行分隔,数组内部用逗号分隔。最大不超过100个元素

###

## 输出描述

输出一个新的数组,用逗号分隔。

## 示例1

输入

    
    
    3
    2
    2,5,6,7,9,5,7
    1,7,4,3,4
    

输出

    
    
    2,5,6,1,7,4,7,9,5,3,4,7
    

## 示例2

输入

    
    
    4
    3
    1,2,3,4,5,6
    1,2,3
    1,2,3,4
    

输出

    
    
    1,2,3,4,1,2,3,1,2,3,4,5,6
    

说明

> ## 解题思路

## Java

    
    
    import java.util.ArrayList;  
    import java.util.LinkedList;  
    import java.util.List;  
    import java.util.Scanner; 
    
    public class Main {
    
        public static void main(String[] args) {
       
            Scanner scanner = new Scanner(System.in);
            int k = scanner.nextInt(); // 读取固定长度，表示从每个数组中取出的元素数量
            int n = scanner.nextInt(); // 读取数组的数目
            scanner.nextLine(); // 跳过行末，准备读取下一行数据
    
            // 初始化链表数组存储所有整数数组
            List<LinkedList<Integer>> numArrays = new ArrayList<>();
            for (int i = 0; i < n; i++) {
                LinkedList<Integer> numArray = new LinkedList<>();
                String[] nums = scanner.nextLine().split(","); // 分割字符串得到数字数组
                for (String num : nums) {
                    numArray.add(Integer.parseInt(num)); // 解析字符串为整数并添加到链表中
                }
                numArrays.add(numArray); // 将链表添加到列表中
            }
    
            // 使用StringBuilder构建最终的合并结果字符串
            StringBuilder builder = new StringBuilder();
            int index = 0; // 设置当前数组的索引
            // 循环遍历链表数组，直到所有链表都被处理完
            while (!numArrays.isEmpty()) {
                LinkedList<Integer> singleArray = numArrays.get(index);
                // 每次尝试取出k个元素，如果不足k个，则取出所有剩余的元素
                for (int i = 0; i < k && !singleArray.isEmpty(); i++) {
                    builder.append(singleArray.pop()).append(","); // 移除并获取第一个元素，拼接到结果字符串
                }
                if (singleArray.isEmpty()) { // 如果当前链表为空，则从列表中移除
                    numArrays.remove(index);
                    index--; // 调整索引以保持在当前位置检查下一个链表
                }
                index++; // 移动到下一个链表
                if (index >= numArrays.size()) { // 如果索引超出范围，则重置为0
                    index = 0;
                }
            }
    
            // 输出合并后的数组，移除字符串最后一个逗号
            if (builder.length() > 0) {
                System.out.println(builder.substring(0, builder.length() - 1));
            }
        }
    }
    
    

## Python

    
    
    import sys
    
    # 处理输入
    k = int(input())
    
    n = int(input())
    
    # 初始化数组
    numArrays = []
    for i in range(n):
        numArray = []
        line = input().strip()
        nums = line.split(",")
        for num in nums:
            numArray.append(int(num))
        numArrays.append(numArray)
    
    # 拼接字符串
    builder = ""
    index = 0
    while len(numArrays) > 0:
        singleArray = numArrays[index]
        # 取出前k个
        for i in range(k):
            if len(singleArray) == 0:
                numArrays.pop(index)
                index -= 1
                break
            builder += str(singleArray[0]) + ","
            singleArray.pop(0)
        index += 1
        if index >= len(numArrays):
            index = 0
    
    result = builder[:-1] # 去掉最后一个逗号
    print(result)
    

## JavaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    
    let k = 0;
    let n = 0;
    const numArrays = [];
    
    let inputCount = 0;
    
    rl.on('line', (line) => {
      inputCount++;
    
      if (inputCount === 1) {
        k = parseInt(line.trim());
      } else if (inputCount === 2) {
        n = parseInt(line.trim());
      } else {
        const numArray = line
          .trim()
          .split(',')
          .map((num) => parseInt(num));
        numArrays.push(numArray);
    
        if (numArrays.length === n) {
            let builder = '';
      let index = 0;
    
      while (numArrays.length > 0) {
        const singleArray = numArrays[index];
    
        for (let i = 0; i < k; i++) {
          if (singleArray.length === 0) {
            numArrays.splice(index, 1);
            index -= 1;
            break;
          }
          builder += `${singleArray[0]},`;
          singleArray.shift();
        }
    
        index += 1;
        if (index >= numArrays.length) {
          index = 0;
        }
      }
    
      const result = builder.slice(0, -1);
      console.log(result);
        }
      }
    });
    
    

## C++

    
    
    #include <iostream>
    #include <vector>
    #include <list>
    #include <string>
    #include <sstream> // 引入stringstream类
    
    using namespace std;
    
    int main() {
        // 处理输入
        int k, n;
        cin >> k >> n;
        cin.ignore(); // 忽略掉换行符
    
        // 初始化数组
        vector<list<int>> numArrays;
        for (int i = 0; i < n; i++) {
            list<int> numArray;
            string line;
            getline(cin, line); // 读取一行
            stringstream ss(line); // 将读取的字符串转换为stringstream对象
            string num;
            while (getline(ss, num, ',')) { // 以逗号为分隔符读取每个数字
                numArray.push_back(stoi(num)); // 将数字转换为整数并添加到list中
            }
            numArrays.push_back(numArray); // 将list添加到vector中
        }
    
        // 拼接字符串
        stringstream builder;
        int index = 0;
        while (numArrays.size() > 0) {
            list<int>& singleArray = numArrays[index];
            // 取出前k个
            for (int i = 0; i < k; i++) {
                if (singleArray.empty()) {
                    numArrays.erase(numArrays.begin() + index);
                    index--;
                    break;
                }
                builder << singleArray.front() << ",";
                singleArray.pop_front();
            }
            index++;
            if (index >= numArrays.size()) {
                index = 0;
            }
        }
    
        string result = builder.str(); // 将stringstream转换为string
        cout << result.substr(0, result.length() - 1) << endl; // 输出拼接好的字符串，去掉最后一个逗号
    
        ret
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    #include <string.h>
    
    #define MAX_ARRAYS 1000  // 假设最大数组数目为1000
    #define MAX_LENGTH 100   // 每个数组的最大长度为100
    
    int main() {
        int k, n;
        scanf("%d %d", &k, &n);  // 读取k和n
        getchar();  // 忽略掉换行符
    
        int numArrays[MAX_ARRAYS][MAX_LENGTH];
        int arrayLengths[MAX_ARRAYS] = {0};  // 存储每个数组的实际长度
    
        // 初始化数组
        char line[1024];
        for (int i = 0; i < n; i++) {
            fgets(line, sizeof(line), stdin);  // 读取一行
            line[strcspn(line, "\n")] = 0;  // 去掉换行符
    
            // 解析每个数字并存入数组
            char* num = strtok(line, ",");
            int j = 0;
            while (num != NULL) {
                numArrays[i][j++] = atoi(num);
                num = strtok(NULL, ",");
            }
            arrayLengths[i] = j;
        }
    
        // 拼接字符串
        char result[10000] = {0};  // 存储最终结果
        int index = 0;
        while (1) {
            int finished = 1;
            for (int i = 0; i < n; i++) {
                if (arrayLengths[i] > 0) {
                    finished = 0;
                    int count = (arrayLengths[i] < k) ? arrayLengths[i] : k;
                    for (int j = 0; j < count; j++) {
                        char temp[12];
                        sprintf(temp, "%d,", numArrays[i][j]);
                        strcat(result, temp);
                    }
                    // 更新数组和其长度
                    memmove(numArrays[i], numArrays[i] + count, (arrayLengths[i] - count) * sizeof(int));
                    arrayLengths[i] -= count;
                }
            }
            if (finished) {
                break;
            }
        }
    
        // 输出结果，移除最后一个逗号
        if (strlen(result) > 0) {
            result[strlen(result) - 1] = '\0';
        }
        printf("%s\n", result);
    
        return 0;
    }
    
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

