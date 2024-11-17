## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

现在有多组整数数组，需要将它们合并成一个新的数组。

合并规则，从每个数组里按顺序取出固定长度的内容合并到新的数组中，取完的内容会删除掉，

如果该行不足固定长度或者已经为空，则直接取出剩余部分的内容放到新的数组中，继续下一行。

## 输入描述

第一行是每次读取的固定长度，0<长度<10

第二行是整数数组的数目，0<数目<1000

第3-n行是需要合并的数组，不同的数组用回车换行分隔，数组内部用逗号分隔，最大不超过100个元素。

## 输出描述

输出一个新的数组，用逗号分隔。

## 示例1

输入

    
    
    3
    2
    2,5,6,7,9,5,7
    1,7,4,3,4
    

输出

    
    
    2,5,6,1,7,4,7,9,5,3,4,7
    

说明

> 1、获得长度3和数组数目2  
>  2、先遍历第一行，获得2,5,6  
>  3、再遍历第二行，获得1,7,4  
>  4、再循环回到第一行，获得7,9,5  
>  5、再遍历第二行，获得3,4  
>  6、再回到第一行，获得7，按顺序拼接成最终结果

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

题目的要求是将多组整数数组合并成一个新的数组，合并的规则是从每个数组中按顺序取出指定长度的元素，然后将取出的元素拼接到新的数组中，直到所有数组中的元素全部被取完为止。

### 合并规则详解：

  1. **固定长度** ：每次从一个数组中取出的元素个数是固定的，假设为`L`。
  2. **多数组操作** ：数组的数目是`N`个，需要按顺序逐个遍历这些数组。
  3. **按序取元素** ： 
     * 如果一个数组剩余的元素不足`L`，则取出剩余的所有元素。
     * 如果一个数组的元素已经全部取完，则跳过该数组，继续处理下一个数组。
  4. **循环合并** ：每次遍历完所有数组后，若还有未取完的数组，继续从第一个数组开始按顺序取，直到所有数组都取完为止。

### 示例解释：

#### 示例1

**输入**

    
    
    3
    2
    2,5,6,7,9,5,7
    1,7,4,3,4
    

**步骤解释** ：

  1. 固定长度为`3`，数组数目为`2`。
  2. 第一轮： 
     * 从第一个数组取3个元素：`2,5,6`。
     * 从第二个数组取3个元素：`1,7,4`。
  3. 第二轮： 
     * 从第一个数组取3个元素：`7,9,5`（接着取未取完的部分）。
     * 从第二个数组取2个元素：`3,4`（该数组剩余的元素不足3个，取出剩余部分）。
  4. 第三轮： 
     * 从第一个数组取1个元素：`7`（剩余的最后一个元素）。
     * 第二个数组已取完，跳过。
  5. 合并后的新数组为：`2,5,6,1,7,4,7,9,5,3,4,7`。

**输出**

    
    
    2,5,6,1,7,4,7,9,5,3,4,7
    

## Java

    
    
    import java.util.*;
    
    public class Main {
        public static void main(String[] args) {
            // 读取固定长度和整数数组的数目
            Scanner scanner = new Scanner(System.in);
            int fixedLength = scanner.nextInt(); // 输入每次取出的固定长度
            int arrayNum = scanner.nextInt(); // 输入数组数量
            int totalCount = 0; // 记录所有数组中元素的总数
    
            // 读取需要合并的数组
            List<List<Integer>> inputArrays = new ArrayList<>(); // 用于存储所有输入的数组
            for (int i = 0; i < arrayNum; i++) { // 读取每个数组
                String inputStr = scanner.next(); // 读取一行输入
                List<Integer> v = new ArrayList<>(); // 存储当前数组
                while (inputStr.indexOf(",") != -1) { // 查找逗号分隔符
                    int found = inputStr.indexOf(","); // 找到逗号的位置
                    v.add(Integer.parseInt(inputStr.substring(0, found))); // 转换逗号前的部分为整数并添加到数组中
                    inputStr = inputStr.substring(found + 1); // 去除已经处理过的部分
                    totalCount += 1; // 更新总元素个数
                }
                v.add(Integer.parseInt(inputStr)); // 添加最后一个元素
                totalCount += 1; // 更新总元素个数
                inputArrays.add(v); // 将当前数组添加到数组集合中
            }
    
            // 合并数组
            List<Integer> result = new ArrayList<>(); // 用于存储合并后的结果
            int num = 0; // 记录已合并的元素数量
            while (num < totalCount) { // 当合并的元素数量少于总数时继续
                for (int i = 0; i < inputArrays.size(); i++) { // 遍历所有数组
                    for (int j = 0; j < fixedLength; j++) { // 每次从当前数组中取固定长度的元素
                        if (inputArrays.get(i).size() > 0) { // 如果当前数组不为空
                            num += 1; // 更新已处理的元素数量
                            result.add(inputArrays.get(i).get(0)); // 将第一个元素添加到结果中
                            inputArrays.get(i).remove(0); // 删除该元素
                        } else {
                            break; // 如果当前数组为空，则跳过
                        }
                    }
                }
            }
    
            // 输出结果
            for (int i = 0; i < result.size() - 1; i++) { // 输出结果数组，元素之间用逗号分隔
                System.out.print(result.get(i) + ",");
            }
            System.out.print(result.get(result.size() - 1)); // 输出最后一个元素时不加逗号
        }
    }
    

## Python

    
    
    # 读取固定长度和数组的数量
    fixedLength = int(input())  # 每次取出的固定长度
    arrayNum = int(input())  # 数组数量
    totalCount = 0  # 用于记录所有数组中元素的总数
    inputArrays = []  # 存储所有输入的数组
    
    # 读取输入的数组并存储
    for i in range(arrayNum):  # 读取每个数组
        inputStr = input()  # 读取输入字符串
        v = []  # 用于存储当前数组
        while ',' in inputStr:  # 查找逗号分隔符
            found = inputStr.index(",")  # 找到逗号的位置
            v.append(int(inputStr[:found]))  # 提取逗号前的部分并转换为整数
            inputStr = inputStr[found + 1:]  # 删除已经处理过的部分
            totalCount += 1  # 更新总元素个数
        v.append(int(inputStr))  # 添加最后一个元素
        totalCount += 1  # 更新总元素个数
        inputArrays.append(v)  # 将当前数组添加到数组集合中
    
    # 合并数组
    result = []  # 用于存储合并后的结果
    num = 0  # 记录已合并的元素数量
    while num < totalCount:  # 当合并的元素数量少于总数时继续
        for i in range(len(inputArrays)):  # 遍历所有数组
            for j in range(fixedLength):  # 每次从当前数组中取固定长度的元素
                if len(inputArrays[i]) > 0:  # 如果当前数组不为空
                    num += 1  # 更新已处理的元素数量
                    result.append(inputArrays[i][0])  # 将第一个元素添加到结果中
                    inputArrays[i].pop(0)  # 删除该元素
                else:
                    break  # 如果当前数组为空，则跳过
    
    # 输出结果
    for i in range(len(result) - 1):  # 输出结果数组，元素之间用逗号分隔
        print(result[i], end=',')
    print(result[-1])  # 输出最后一个元素时不加逗号
    

## JavaScript

    
    
    const readline = require("readline");  // 引入读取输入的模块
    
    const rl = readline.createInterface({
      input: process.stdin,  // 定义输入流
      output: process.stdout,  // 定义输出流
    });
    
    const input = [];  // 存储输入的所有数据
    
    rl.on("line", (line) => {  // 监听每一行的输入
      input.push(line);  // 将输入的行添加到数组中
    
      if (input.length === parseInt(input[1]) + 2) {  // 当输入完所有数据后
        const fixedLength = parseInt(input[0]);  // 获取固定长度
        const numOfArrays = parseInt(input[1]);  // 获取数组数量
        const arrays = input.slice(2).map((line) => line.split(",").map(Number));  // 将输入的字符串转换为二维数组
        const mergedArray = [];  // 用于存储合并后的数组
    
        while (arrays.length) {  // 当还有未处理的数组时继续
          for (let i = 0; i < arrays.length; i++) {  // 遍历每个数组
            const array = arrays[i];  // 获取当前数组
            if (array.length === 0) {  // 如果当前数组为空，则删除它
              arrays.splice(i, 1);
            } else {
              mergedArray.push(...array.splice(0, fixedLength));  // 否则取出固定长度的元素并添加到合并后的数组中
            }
          }
        }
    
        console.log(mergedArray.join(","));  // 输出最终合并的数组
    
        input.length = 0;  // 清空输入数组，准备下一次输入
      }
    });
    

## C++

    
    
    #include <iostream>
    #include <vector>
    using namespace std;
    
    int main() {
        // 读取固定长度和整数数组的数目
        int fixedLength, arrayNum;
        cin >> fixedLength >> arrayNum; // 输入每次取出的固定长度和数组的数量
        int totalCount = 0; // 记录所有数组中元素的总数
    
        // 读取需要合并的数组
        vector<vector<int>> inputArrays; // 创建二维数组来存储所有输入的整数数组
        for (int i = 0; i < arrayNum; i++) { // 循环读取每个数组
            string inputStr;
            cin >> inputStr; // 读取数组输入字符串
            vector<int> v; // 用于存储当前数组的整数
            while (inputStr.find(',') != string::npos) { // 查找逗号分隔符来分割字符串
                int found = inputStr.find(','); // 找到逗号的位置
                v.push_back(stoi(inputStr.substr(0, found))); // 截取逗号前的部分转换为整数并存储
                inputStr = inputStr.substr(found + 1); // 去除已经处理过的部分
                totalCount += 1; // 更新总元素个数
            }
            v.push_back(stoi(inputStr)); // 添加最后一个元素
            totalCount += 1; // 更新总元素个数
            inputArrays.push_back(v); // 将当前数组存储到数组集合中
        }
    
        // 合并数组
        vector<int> result; // 存储合并后的结果
        int num = 0; // 记录已经合并的元素数量
        while (num < totalCount) { // 当合并的元素数量少于总数时继续
            for (int i = 0; i < inputArrays.size(); i++) { // 遍历所有数组
                for (int j = 0; j < fixedLength; j++) { // 每次从当前数组中取固定长度的元素
                    if (!inputArrays[i].empty()) { // 如果数组不为空
                        num += 1; // 更新已处理的元素数量
                        result.push_back(inputArrays[i][0]); // 将第一个元素添加到结果中
                        inputArrays[i].erase(inputArrays[i].begin()); // 删除该元素
                    } else {
                        break; // 如果当前数组为空，则跳过
                    }
                }
            }
        }
    
        // 输出结果
        for (int i = 0; i < result.size() - 1; i++) { // 输出结果数组，元素之间用逗号分隔
            cout << result[i] << ",";
        }
        cout << result[result.size() - 1]; // 输出最后一个元素时不加逗号
    
        return 0; // 程序结束
    }
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    #include <string.h>
    
    int main() {
        int fixedLength, arrayNum;
        int totalCount = 0;  // 记录所有数组中元素的总数
        
        // 读取固定长度和数组数量
        scanf("%d %d", &fixedLength, &arrayNum);
        
        // 分配二维数组的内存用于存储输入的数组
        int** inputArrays = (int**)malloc(arrayNum * sizeof(int*));
        int* arrayLengths = (int*)malloc(arrayNum * sizeof(int));  // 记录每个数组的长度
    
        // 读取输入的数组
        for (int i = 0; i < arrayNum; i++) {
            char inputStr[2000];   
            scanf("%s", inputStr);  // 读取一行输入
            
            // 分配空间存储当前数组的元素 
            inputArrays[i] = (int*)malloc(2000 * sizeof(int));
            int len = 0;  // 当前数组的长度
            char* token = strtok(inputStr, ",");  // 使用逗号作为分隔符分割字符串
            
            // 分割字符串并转换为整数存入当前数组
            while (token != NULL) {
                inputArrays[i][len++] = atoi(token);  // 将字符串转换为整数并存入数组
                token = strtok(NULL, ",");  // 获取下一个逗号后的字符串
                totalCount++;  // 更新总元素个数
            }
            arrayLengths[i] = len;  // 记录当前数组的长度
        }
        
        // 合并数组
        int* result = (int*)malloc(totalCount * sizeof(int));  // 分配空间存储合并后的数组
        int num = 0;  // 已经处理的元素数量
        
        // 按顺序合并所有数组中的元素
        while (num < totalCount) {
            for (int i = 0; i < arrayNum; i++) {  // 遍历所有数组
                for (int j = 0; j < fixedLength; j++) {  // 每次取出固定长度的元素
                    if (arrayLengths[i] > 0) {  // 如果当前数组还有剩余元素
                        result[num++] = inputArrays[i][0];  // 将第一个元素加入结果数组
                        // 移动数组，将当前数组的元素向前平移
                        for (int k = 0; k < arrayLengths[i] - 1; k++) {
                            inputArrays[i][k] = inputArrays[i][k + 1];
                        }
                        arrayLengths[i]--;  // 更新当前数组的长度
                    } else {
                        break;  // 如果当前数组为空，跳出循环
                    }
                }
            }
        }
        
        // 输出合并后的结果
        for (int i = 0; i < totalCount - 1; i++) {
            printf("%d,", result[i]);  // 输出每个元素，并在元素之间加上逗号
        }
        printf("%d\n", result[totalCount - 1]);  // 输出最后一个元素，不加逗号
    
        // 释放分配的内存
        for (int i = 0; i < arrayNum; i++) {
            free(inputArrays[i]);  // 释放每个数组的内存
        }
        free(inputArrays);  // 释放存储所有数组的指针
        free(arrayLengths);  // 释放记录数组长度的内存
        free(result);  // 释放结果数组的内存
    
        return 0;
    }
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b0d8ff6d53693bfcf6e1605b507f3ae3.png)

## 完整用例

### 用例1

    
    
    3
    2
    2,5,6,7,9,5,7
    1,7,4,3,4
    

### 用例2

    
    
    4
    3
    1,2,3,4,5,6
    1,2,3
    1,2,3,4
    

### 用例3

    
    
    2
    2
    1,2,3,4
    5,6,7,8
    

### 用例4

    
    
    1
    3
    1,2,3,4,5
    6,7,8,9,10
    11,12,13,14,15
    

### 用例5

    
    
    5
    1
    1,2,3,4,5,6,7,8,9,10
    

### 用例6

    
    
    2
    4
    1,2,3,4,5,6,7,8
    9,10,11,12,13,14,15,16,17,18,19,20
    21,22,23,24,25,26,27,28,29,30
    31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50
    

### 用例7

    
    
    3
    3
    1,2,3,4,5,6,7,8,9,10
    11,12,13,14,15,16,17,18,19,20
    21,22,23,24,25,26,27,28,29,30
    

### 用例8

    
    
    4
    2
    1,2,3,4,5,6,7,8,9,10
    11,12,13,14,15,16,17,18,19,20
    

### 用例9

    
    
    5
    3
    1,2,3,4,5,6,7,8,9,10
    11,12,13,14,15,16,17,18,19,20
    21,22,23,24,25,26,27,28,29,30
    

### 用例10

    
    
    2
    4
    1,2,3,4,5,6,7,8,9,10
    11,12,13,14,15,16,17,18,19,20
    21,22,23,24,25,26,27,28,29,30
    31,32,33,34,35,36,37,38,39,40
    

