## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

输入一个由随机数组成的数列（数列中每个数均是大于 0 的整数，长度已知），和初始计数值 m。

从数列首位置开始计数，计数到 m 后，将数列该位置数值替换计数值 m，

并将数列该位置数值出列，然后从下一位置从新开始计数，直到数列所有数值出列为止。

如果计数到达数列尾段，则返回数列首位置继续计数。

请编程实现上述计数过程，同时输出数值出列的顺序。

比如：输入的随机数列为：3,1,2,4，初始计数值 m=7，从数列首位置开始计数（数值 3 所在位置）

第一轮计数出列数字为 2，计数值更新 m=2，出列后数列为 3,1,4，从数值 4 所在位置从新开始计数

第二轮计数出列数字为 3，计数值更新 m=3，出列后数列为 1,4，从数值 1 所在位置开始计数

第三轮计数出列数字为 1，计数值更新 m=1，出列后数列为 4，从数值 4 所在位置开始计数

最后一轮计数出列数字为 4，计数过程完成。输出数值出列顺序为：2,3,1,4。

要求实现函数：

_void array_iterate(int len, int input_array[], int m, int output_array[])_

## 输入描述

int len：输入数列的长度； int intput_array[]：输入的初始数列 int m：初始计数值

## 输出描述

int output_array[]：输出的数值出列顺序

## 示例1

输入

    
    
    3,1,2,4
    4
    7
    

输出

    
    
    2,3,1,4
    

说明

> ## 解题思路

题目描述了一个数列出列的过程，其逻辑如下：

  1. **输入** ：

     * 一个随机数列 `input_array`，长度为 `len`（所有数字均大于 0）。
     * 一个初始计数值 `m`。
  2. **出列规则** ：

     * 从数列的首位置开始计数，计数到 `m` 时，移除当前数值，并更新计数值为该数值。
     * 数列缩短后，从刚才被移除的数值的下一个位置继续计数。如果到达数列末尾，则循环到数列开头。
     * 重复此过程，直到所有数字出列。
  3. **输出** ：

     * 输出每轮移除的数值，按移除顺序组成的数组。

* * *

#### 过程分析

以示例输入为例：

  * **输入数据** ：

    * 数列：`3,1,2,4`
    * 初始计数值：`m = 7`
  * **步骤** ：

    1. **第一轮** ：

       * 从首位置 `3` 开始计数，共计数 7 次，按顺序循环访问数列： 
         * 第 1 次：`3`，第 2 次：`1`，第 3 次：`2`，第 4 次：`4`，第 5 次：`3`，第 6 次：`1`，第 7 次：`2`。
         * 第 7 次到达 `2`，移除该值，更新计数值 `m = 2`。
         * 数列变为：`3,1,4`。
    2. **第二轮** ：

       * 从上轮移除的 `2` 的下一个位置（即 `4`）开始计数，共计数 2 次： 
         * 第 1 次：`4`，第 2 次：`3`。
         * 第 2 次到达 `3`，移除该值，更新计数值 `m = 3`。
         * 数列变为：`1,4`。
    3. **第三轮** ：

       * 从上轮移除的 `3` 的下一个位置（即 `1`）开始计数，共计数 3 次： 
         * 第 1 次：`1`，第 2 次：`4`，第 3 次：`1`。
         * 第 3 次到达 `1`，移除该值，更新计数值 `m = 1`。
         * 数列变为：`4`。
    4. **第四轮** ：

       * 从上轮移除的 `1` 的下一个位置（即 `4`）开始计数，共计数 1 次： 
         * 第 1 次：`4`。
         * 第 1 次到达 `4`，移除该值，更新计数值 `m = 4`（此时数列为空）。
         * 数列变为空，结束计数。
  * **结果** ：  
出列顺序为：`2,3,1,4`。

* * *

#### 解决方法

可以通过以下逻辑实现：

  1. 使用一个循环来模拟计数，直到数列为空。
  2. 使用一个变量 来记录当前计数的位置。
  3. 每次计数时循环遍历数组，确保超出数组末尾时从头开始计数。
  4. 将计数到的数移除，并更新计数值。

* * *

## Java

    
    
    import java.util.*;
    
    public class Main {
        public static void main(String[] args) {
            // 创建 Scanner 对象，用于读取输入数据
            Scanner scanner = new Scanner(System.in);
    
            // 读取输入数组，将逗号分隔的字符串转换为整数数组
            int[] inputArr = Arrays.stream(scanner.nextLine().split(","))
                                   .mapToInt(Integer::parseInt)
                                   .toArray();
    
            // 读取输入长度
            int len = Integer.parseInt(scanner.nextLine());
    
            // 读取输入 m，即初始计数值
            int m = Integer.parseInt(scanner.nextLine());
    
            // 使用 ArrayList 存储数列，方便按索引操作
            List<Integer> list = new ArrayList<>();
            for (int value : inputArr) {
                list.add(value);
            }
    
            // 使用 StringJoiner 构建输出字符串，用逗号分隔
            StringJoiner sj = new StringJoiner(",");
    
            // 当前计数位置
            int currentIndex = 0;
    
            // 当列表不为空时，继续计数过程
            while (!list.isEmpty()) {
                // 计算下一次计数的位置
                currentIndex = (currentIndex + m - 1) % list.size();
    
                // 获取并移除当前计数到的元素
                int current = list.remove(currentIndex);
    
                // 添加到输出中，并更新 m 为移除的元素值
                sj.add(Integer.toString(current));
                m = current;  // 更新计数值为当前出列值
            }
    
            // 输出数值出列顺序
            System.out.println(sj.toString());
        }
    }
    

## Python

    
    
    # 导入必要的模块
    import sys
    
    # 读取输入
    input_arr = list(map(int, input().split(',')))  # 输入数组
    len_ = int(input())  # 数组长度
    m = int(input())  # 初始计数值 m
    
    # 使用列表来存储数列，方便按索引操作
    list_ = input_arr[:len_]  # 创建列表
    
    # 初始化输出字符串列表
    output = []
    
    # 当前计数位置
    current_index = 0
    
    # 当列表不为空时，继续计数过程
    while list_:
        # 计算下一次计数的位置
        current_index = (current_index + m - 1) % len(list_)
    
        # 获取并移除当前计数到的元素
        current = list_.pop(current_index)
    
        # 添加到输出中，并更新 m 为移除的元素值
        output.append(str(current))
        m = current  # 更新计数值为当前出列值
    
    # 输出数值出列顺序
    print(",".join(output))
    

## JavaScript

    
    
    // 导入 readline 模块用于读取输入
    const readline = require('readline');
    
    // 创建 readline 接口实例
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    // 用于存储输入的行
    const lines = [];
    
    // 读取输入行
    rl.on('line', (line) => {
        lines.push(line);
        if (lines.length === 3) {
            rl.close();
        }
    });
    
    // 当输入完成时，处理输入数据并执行计数过程
    rl.on('close', () => {
        // 读取输入数组，将逗号分隔的字符串转换为整数数组
        const inputArr = lines[0].split(',').map(Number);
    
        // 读取输入长度
        const len = parseInt(lines[1], 10);
    
        // 读取输入m，即初始计数值
        let m = parseInt(lines[2], 10);
    
        // 使用数组来存储数列
        let list = inputArr.slice(0, len); // 截取输入数组中的有效长度
        let output = []; // 用于存储出列顺序
    
        // 当前计数位置
        let currentIndex = 0;
    
        // 当列表不为空时，继续计数过程
        while (list.length > 0) {
            // 计算下一次计数的位置
            currentIndex = (currentIndex + m - 1) % list.length;
    
            // 获取并移除当前计数到的元素
            const current = list.splice(currentIndex, 1)[0];
    
            // 添加到输出中，并更新 m 为移除的元素值
            output.push(current);
            m = current; // 更新计数值为当前出列值
        }
    
        // 输出数值出列顺序
        console.log(output.join(','));
    
        rl.close(); // 关闭 readline 接口
    });
    
    
    

## C++

    
    
    #include <iostream>
    #include <vector>
    #include <sstream>
    using namespace std;
    int main() {
        // 读取输入数组
        string input;
        
        getline(cin, input);
        istringstream iss(input);
        vector<int> inputArr;
        string token;
        while (getline(iss, token, ',')) {
            inputArr.push_back(stoi(token));
        }
    
        // 读取数组长度和初始计数值 m
        int len, m;
     
        cin >> len;
    
        cin >> m;
    
        // 初始化数列和输出数组
        vector<int> list(inputArr.begin(), inputArr.begin() + len);
        vector<int> output;
    
        // 当前计数位置
        int currentIndex = 0;
    
        // 当列表不为空时，继续计数过程
        while (!list.empty()) {
            // 计算下一次计数的位置
            currentIndex = (currentIndex + m - 1) % list.size();
    
            // 获取并移除当前计数到的元素
            int current = list[currentIndex];
            list.erase(list.begin() + currentIndex);
    
            // 添加到输出中，并更新 m 为移除的元素值
            output.push_back(current);
            m = current; // 更新计数值为当前出列值
        }
    
        // 输出数值出列顺序
        for (size_t i = 0; i < output.size(); ++i) {
            if (i > 0) cout << ",";
            cout << output[i];
        }
        cout << endl;
    
        return 0;
    }
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    #include <string.h>
    
    int main() {
        // 读取输入数组
        char input[100];
        fgets(input, sizeof(input), stdin);
        input[strcspn(input, "\n")] = 0; // 去掉换行符
    
        int inputArr[100], len, m, i = 0;
        char *token = strtok(input, ",");
        while (token != NULL) {
            inputArr[i++] = atoi(token); // 转换为整数并存入数组
            token = strtok(NULL, ",");
        }
    
        // 读取数组长度和初始计数值 m
        scanf("%d", &len);
        scanf("%d", &m);
    
        // 初始化数列和输出数组
        int list[100], output[100], count = 0;
        memcpy(list, inputArr, len * sizeof(int)); // 复制有效长度的数据
        int currentIndex = 0; // 当前计数位置
    
        // 当列表不为空时，继续计数过程
        while (len > 0) {
            // 计算下一次计数的位置
            currentIndex = (currentIndex + m - 1) % len;
    
            // 获取并移除当前计数到的元素
            int current = list[currentIndex];
    
            // 将元素移到输出中
            output[count++] = current;
    
            // 从列表中删除当前元素，更新剩余长度
            for (int j = currentIndex; j < len - 1; j++) {
                list[j] = list[j + 1];
            }
            len--;
    
            // 更新 m 为移除的元素值
            m = current;
        }
    
        // 输出数值出列顺序
        for (int i = 0; i < count; i++) {
            if (i > 0) printf(",");
            printf("%d", output[i]);
        }
        printf("\n");
    
        return 0;
    }
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/880bbaf7120626ceeebae7ebe4f48874.png)

