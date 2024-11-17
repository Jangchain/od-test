## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

给定一个正整数数组，设为nums，最大为100个成员，求从第一个成员开始，正好走到数组最后一个成员，所使用的最少步骤数。

**要求：**

  1. 第一步必须从第一元素开始，且1<=第一步的步长<len/2;（len为数组的长度，需要自行解析）。
  2. 从第二步开始，只能以所在成员的数字走相应的步数，不能多也不能少, 如果目标不可达返回**-1**，只输出最少的步骤数量。
  3. 只能向数组的尾部走，不能往回走。

## 输入描述

由正整数组成的数组，以空格分隔，数组长度小于100，**请自行解析数据数量** 。

## 输出描述

正整数，表示最少的步数，如果不存在输出**-1**

## 示例1

输入

    
    
    7 5 9 4 2 6 8 3 5 4 3 9
    

输出

    
    
    2
    

说明

> 第一步： 第一个可选步长选择2，从第一个成员7开始走2步，到达9；
>
> 第二步： 从9开始，经过自身数字9对应的9个成员到最后。

## 示例2

输入

    
    
    1 2 3 7 1 5 9 3 2 1
    

输出

    
    
    -1
    

说明

> 无

## 解题思路

给定一个由正整数组成的数组，要求从数组的第一个元素开始，通过逐步前进最终到达数组的最后一个元素。你需要找出最少的步骤数，并且必须满足以下条件：

  1. **第一步** ：必须从数组的第一个元素开始，步长的选择范围是1到数组长度的一半之间（即  1 ≤ 步长 < len 2 1 \leq \text{步长} < \frac{\text{len}}{2} 1≤步长<2len​）。
  2. **第二步及之后** ：从当前停留的元素开始，必须按照该元素的值走相应的步数。例如，当前停留在值为9的元素，则你只能前进9步。
  3. **只能向数组尾部前进** ，不能后退。
  4. **如果无法到达数组的最后一个元素** ，则输出 -1。

这里需要注意的是：本题是整除

## Java

    
    
    import java.util.ArrayList;
    import java.util.Arrays;
    import java.util.List;
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            String input = scanner.nextLine(); // 读取用户输入的整数字符串，以空格分隔
            String[] numberStrings = input.split(" "); // 将输入的字符串分割成字符串数组
            int[] numbers = new int[numberStrings.length]; // 创建一个与字符串数组长度相同的整型数组
            for (int i = 0; i < numberStrings.length; i++) {
                numbers[i] = Integer.parseInt(numberStrings[i]); // 将字符串数组的每个元素转换为整数，并存入整型数组
            }
            int length = numbers.length; // 获取数组的长度
            List<Integer> result = new ArrayList<>(); // 用于存储所有可能的步数结果
            for (int i = 1; i < length / 2; i++) { // 遍历所有从第一个元素开始的有效步长
                int step = 1; // 初始化步数为1，因为第一步已经走出
                int index = i; // 将索引设为当前步长
                while (index < length - 1) { // 只要没有走到数组的最后一个元素
                    index += numbers[index]; // 按照当前索引位置的数字值前进
                    step++; // 每走一步，步数加1
                }
                if (index == length - 1) { // 如果恰好到达数组的最后一个元素
                    result.add(step); // 将步数结果存入结果列表
                }
            }
            if (result.size() > 0) {
                Integer[] resultArray = result.toArray(new Integer[0]); // 将结果列表转换为数组
                Arrays.sort(resultArray); // 对步数结果进行排序
                System.out.println(resultArray[0]); // 输出最小的步数
            } else {
                System.out.println(-1); // 如果没有结果，输出-1
            }
        }
    }
    

## Python

    
    
    numbers = list(map(int, input().split())) # 将输入的字符串分割并映射为整数列表
    length = len(numbers) # 获取数组的长度
    result = [] # 用于存储所有可能的步数结果
    for i in range(1, length // 2): # 遍历所有从第一个元素开始的有效步长
        step = 1 # 初始化步数为1，因为第一步已经走出
        index = i # 将索引设为当前步长
        while index < length - 1: # 只要没有走到数组的最后一个元素
            index += numbers[index] # 按照当前索引位置的数字值前进
            step += 1 # 每走一步，步数加1
        if index == length - 1: # 如果恰好到达数组的最后一个元素
            result.append(step) # 将步数结果存入结果列表
    if len(result) > 0:
        result.sort() # 对步数结果进行排序
        print(result[0]) # 输出最小的步数
    else:
        print(-1) # 如果没有结果，输出-1
    

## JavaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.on('line', (numbersInput) => {
      const numbers = numbersInput.split(' ').map(Number); // 将输入的字符串分割并映射为整数数组
      const length = numbers.length; // 获取数组的长度
      const result = []; // 用于存储所有可能的步数结果
    
      for (let i = 1; i < Math.floor(length / 2); i++) { // 遍历所有从第一个元素开始的有效步长
        let step = 1; // 初始化步数为1，因为第一步已经走出
        let index = i; // 将索引设为当前步长
    
        while (index < length - 1) { // 只要没有走到数组的最后一个元素
          index += numbers[index]; // 按照当前索引位置的数字值前进
          step++; // 每走一步，步数加1
        }
    
        if (index === length - 1) { // 如果恰好到达数组的最后一个元素
          result.push(step); // 将步数结果存入结果列表
        }
      }
    
      if (result.length > 0) {
        result.sort(); // 对步数结果进行排序
        console.log(result[0]); // 输出最小的步数
      } else {
        console.log(-1); // 如果没有结果，输出-1
      }
    
      rl.close();
    });
    

## C++

    
    
    #include <iostream>
    #include <vector>
    #include <algorithm>
    
    int main() {
        std::vector<int> numbers; // 用于存储输入的整数
        int num;
        while(std::cin >> num) {
            numbers.push_back(num); // 将输入的整数存入向量
        }
        int length = numbers.size(); // 获取数组的长度
        std::vector<int> result; // 用于存储所有可能的步数结果
        for(int i = 1; i < length / 2; i++) { // 遍历所有从第一个元素开始的有效步长
            int step = 1; // 初始化步数为1，因为第一步已经走出
            int index = i; // 将索引设为当前步长
            while(index < length - 1) { // 只要没有走到数组的最后一个元素
                index += numbers[index]; // 按照当前索引位置的数字值前进
                step += 1; // 每走一步，步数加1
            }
            if(index == length - 1) { // 如果恰好到达数组的最后一个元素
                result.push_back(step); // 将步数结果存入结果列表
            }
        }
        if(result.size() > 0) {
            std::sort(result.begin(), result.end()); // 对步数结果进行排序
            std::cout << result[0] << std::endl; // 输出最小的步数
        } else {
            std::cout << -1 << std::endl; // 如果没有结果，输出-1
        }
        return 0;
    }
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    
    int main() {
        int numbers[100];  
        int length = 0; // 实际输入的元素个数
        int num;
    
        // 从标准输入读取一系列整数，直到遇到非数字或文件结束
        while (scanf("%d", &num) == 1) {
            numbers[length++] = num;
        }
    
        int result[100]; // 存储所有可能的步数结果
        int result_count = 0; // 记录结果数量
    
        // 遍历所有从第一个元素开始的有效步长
        for (int i = 1; i < length / 2; i++) {
            int step = 1; // 初始化步数为1，因为第一步已经走出
            int index = i; // 将索引设为当前步长
    
            // 只要没有走到数组的最后一个元素
            while (index < length - 1) {
                index += numbers[index]; // 按照当前索引位置的数字值前进
                step++; // 每走一步，步数加1
            }
    
            // 如果恰好到达数组的最后一个元素
            if (index == length - 1) {
                result[result_count++] = step; // 将步数结果存入结果数组
            }
        }
    
        // 如果有有效的步数结果
        if (result_count > 0) {
            int min_step = result[0];
            // 找出最小的步数
            for (int i = 1; i < result_count; i++) {
                if (result[i] < min_step) {
                    min_step = result[i];
                }
            }
            printf("%d\n", min_step); // 输出最小的步数
        } else {
            printf("-1\n"); // 如果没有结果，输出-1
        }
    
        return 0;
    }
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b0d8ff6d53693bfcf6e1605b507f3ae3.png)

#### 完整用例

##### 用例1

    
    
    1 2 3 4 5
    

##### 用例2

    
    
    3 2 1 4 5
    

##### 用例3

    
    
    1 1 1 1 1
    

##### 用例4

    
    
    2 4 6 8 10
    

##### 用例5

    
    
    1 3 5 7 9
    

##### 用例6

    
    
    2 1 3 2 4 3 5 4 6 5
    

##### 用例7

    
    
    1 2 3 4 5 6 7 8 9 10
    

##### 用例8

    
    
    1 3 5 7 9 11 13 15 17 19
    

##### 用例9

    
    
    1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20
    

##### 用例10

    
    
    1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 2
    

