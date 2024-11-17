## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

疫情过后，希望小学终于又重新开学了，三年二班开学第一天的任务是将后面的黑板报重新制作。

黑板上已经写上了N个正整数，同学们需要给这每个数分别上一种颜色。

为了让黑板报既美观又有学习意义，老师要求同种颜色的所有数都可以被这种颜色中最小的那个数整除。

现在请你帮帮小朋友们，算算最少需要多少种颜色才能给这N个数进行上色。

## 输入描述

第一行有一个正整数N，其中。

第二行有N个int型数(保证输入数据在[1,100]范围中)，表示黑板上各个正整数的值。

## 输出描述

输出只有一个整数，为最少需要的颜色种数。

## 示例1

输入

    
    
    3
    2 4 6
    

输出

    
    
    3
    2 4 6
    

说明

> 有数都能被2整除

## 示例2

输入

    
    
    4
    2 3 4 9
    

输出

    
    
    2
    

说明

> 与4涂一种颜色，4能被2整除；3与9涂另一种颜色，9能被3整除。不能4个数涂同一个颜色，因为3与9不能被2整除。所以最少的颜色是两种。

## 解题思路

题目要求给黑板上的 **N 个正整数** 上色，具体的要求是：**同种颜色的所有数都可以被这一颜色中最小的那个数整除** 。

换句话说，如果我们为某个数字选择了一种颜色，那么所有和它涂同种颜色的数都应该是它的倍数。目标是找到最少的颜色种类来满足这个条件。

**颜色分配逻辑**
：每个数字从最小开始，尝试加入已经存在的组中，只有当它无法整除任何一个已有组的最小数时，才新建一个组。这种策略确保了所有组中，数字都满足题目要求——同组内的所有数字都可以被该组的最小数整除。

可以分为以下几个步骤：

#### 1\. **输入数据并排序**

  * 排序后的数组便于我们从最小的数字开始处理，因为最小数决定了它这一组的颜色。

#### 2\. **定义颜色数组**

  * 创建一个数组 `colors`，用来存储已经作为组最小数的数字。
  * `colorCount` 用来统计已经使用了多少种颜色，即有多少个组。

#### 3\. **遍历每个数字，决定是否可以加入现有的颜色组**

  * 遍历排序后的 `numList` 数组，对于每个数字 `numList[i]`： 
    1. **检查是否能被已有颜色组的最小数整除** ：通过 `for` 循环遍历 `colors` 数组，检查 `numList[i] % colors[j] == 0`，如果当前数字可以被某个已经存在的组的最小数整除（即 `colors[j]`），则认为这个数字可以归入该颜色组，设置 `foundColor = true`，并退出循环。
    2. 如果没有找到合适的颜色组（即 `foundColor == false`），那么当前数字 `numList[i]` 就必须作为一个新的组的最小数。因此，将它添加到 `colors` 数组中，并增加颜色计数 `colorCount`。

以示例2为例：

输入：

    
    
    4
    2 3 4 9
    

  1. 对输入数据排序：`[2, 3, 4, 9]`
  2. 遍历每个数字： 
     * `2`：没有已有组，所以新建一个组，`colors = [2]`，`colorCount = 1`
     * `3`：没有现有组能够整除 `3`，所以新建一个组，`colors = [2, 3]`，`colorCount = 2`
     * `4`：能被 `2` 整除，所以加入 `2` 所在的组，颜色数不增加。
     * `9`：能被 `3` 整除，所以加入 `3` 所在的组，颜色数不增加。
  3. 输出结果：2（需要两种颜色）。

## Java

    
    
    import java.util.*;
    
    public class Main {
     
        public static void main(String[] args) {
            Scanner input = new Scanner(System.in);   
            int N = input.nextInt();  // 读取整数N，表示黑板上数字的数量
            int[] numList = new int[N];  // 创建一个数组存储N个数字
            for (int i = 0; i < N; i++) {
                numList[i] = input.nextInt();  // 读取N个数字并存储在numList数组中
            }
            Arrays.sort(numList);  // 对numList数组进行从小到大排序
            
            int[] colors = new int[N];  // 创建一个数组colors来存储颜色组的最小数
            int colorCount = 0;  // 记录使用的颜色种数
            for (int i = 0; i < N; i++) {
                boolean foundColor = false;  // 标志位，用于检查当前数字是否找到合适的颜色组
                for (int j = 0; j < colorCount; j++) {
                    if (numList[i] % colors[j] == 0) {  // 检查当前数字能否被已有颜色组的最小数整除
                        foundColor = true;  // 如果找到合适的颜色组，标志位置为true
                        break;  // 跳出循环
                    }
                }
                if (!foundColor) {  // 如果没有找到合适的颜色组
                    colors[colorCount] = numList[i];  // 将当前数字作为一个新的颜色组的最小数
                    colorCount++;  // 增加颜色组数量
                }
            }
            
            System.out.println(colorCount);  // 输出最少需要的颜色种数
        }
    }
    

## Python

    
    
    import sys
    
    N = int(input())  # 读取整数N，表示黑板上数字的数量
    numList = list(map(int, input().split()))  # 读取N个数字并存储在列表numList中
    numList.sort()  # 对numList进行从小到大排序
    
    colors = []  # 创建一个列表colors来存储颜色组的最小数
    colorCount = 0  # 记录使用的颜色种数
    for i in range(N):
        foundColor = False  # 标志位，用于检查当前数字是否找到合适的颜色组
        for j in range(colorCount):
            if numList[i] % colors[j] == 0:  # 检查当前数字能否被已有颜色组的最小数整除
                foundColor = True  # 如果找到合适的颜色组，标志位置为True
                break  # 跳出循环
        if not foundColor:  # 如果没有找到合适的颜色组
            colors.append(numList[i])  # 将当前数字作为一个新的颜色组的最小数添加到colors列表中
            colorCount += 1  # 增加颜色组数量
    
    print(colorCount)  # 输出最少需要的颜色种数
    

## JavaScript

    
    
    const readline = require('readline');  // 导入readline模块以读取标准输入
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.on('line', (N) => {  // 读取第一行输入，表示数字数量N
      let numList = [];  // 用于存储输入的数字列表
      let colorCount = 0;  // 记录使用的颜色种数
    
      rl.on('line', (numbers) => {  // 读取第二行输入的N个数字
        numList = numbers.split(' ').map(Number);  // 将输入的字符串转化为数字数组
        numList.sort((a, b) => a - b);  // 对数字数组进行从小到大排序
    
        let colors = new Array(N).fill(0);  // 创建一个数组用于存储颜色组的最小数
    
        for (let i = 0; i < N; i++) {
          let foundColor = false;  // 标志位，用于检查当前数字是否找到合适的颜色组
          for (let j = 0; j < colorCount; j++) {
            if (numList[i] % colors[j] === 0) {  // 检查当前数字能否被已有颜色组的最小数整除
              foundColor = true;  // 如果找到合适的颜色组，标志位置为true
              break;  // 跳出循环
            }
          }
          if (!foundColor) {  // 如果没有找到合适的颜色组
            colors[colorCount] = numList[i];  // 将当前数字作为一个新的颜色组的最小数
            colorCount++;  // 增加颜色组数量
          }
        }
    
        console.log(colorCount);  // 输出最少需要的颜色种数
        rl.close();  // 关闭输入接口
      });
    });
    

## C++

    
    
    #include <iostream>
    #include <algorithm>
    using namespace std;
    
    int main() {
        int N;
        cin >> N;  // 读取整数N，表示黑板上数字的数量
        int* numList = new int[N];  // 动态分配一个数组用于存储N个数字
        for (int i = 0; i < N; i++) {
            cin >> numList[i];  // 读取N个数字并存储在numList数组中
        }
        sort(numList, numList + N);  // 对numList数组进行从小到大排序
        
        int* colors = new int[N];  // 动态分配一个数组用于存储颜色组的最小数
        int colorCount = 0;  // 记录使用的颜色种数
        for (int i = 0; i < N; i++) {
            bool foundColor = false;  // 标志位，用于检查当前数字是否找到合适的颜色组
            for (int j = 0; j < colorCount; j++) {
                if (numList[i] % colors[j] == 0) {  // 检查当前数字能否被已有颜色组的最小数整除
                    foundColor = true;  // 如果找到合适的颜色组，标志位置为true
                    break;  // 跳出循环
                }
            }
            if (!foundColor) {  // 如果没有找到合适的颜色组
                colors[colorCount] = numList[i];  // 将当前数字作为一个新的颜色组的最小数
                colorCount++;  // 增加颜色组数量
            }
        }
        
        cout << colorCount << endl;  // 输出最少需要的颜色种数
        
        delete[] numList;  // 释放动态分配的numList数组
        delete[] colors;  // 释放动态分配的colors数组
        
        return 0;
    }
    

## C语言

    
    
    #include <stdio.h>    
    #include <stdlib.h>    
    #include <stdbool.h>   
    #include <string.h>    
    
    // 定义比较函数，用于qsort的排序
    int compare(const void *a, const void *b) {
        return (*(int *)a - *(int *)b);  // 比较两个整数的大小
    }
    
    int main() {
        int N;
        scanf("%d", &N);  // 读取整数N，表示黑板上数字的数量
    
        // 动态分配一个数组用于存储N个数字
        int* numList = (int*)malloc(N * sizeof(int));
     
    
        // 读取N个数字并存储在numList数组中
        for (int i = 0; i < N; i++) {
            scanf("%d", &numList[i]);
        }
    
        // 使用qsort对numList数组进行从小到大排序
        qsort(numList, N, sizeof(int), compare);
    
        // 动态分配一个数组用于存储颜色组的最小数
        int* colors = (int*)malloc(N * sizeof(int));
     
    
        int colorCount = 0;  // 记录使用的颜色种数
    
        // 遍历numList中的每个数字，决定是否能归入已有颜色组
        for (int i = 0; i < N; i++) {
            bool foundColor = false;  // 标志位，用于检查当前数字是否找到合适的颜色组
    
            // 检查当前数字是否可以加入已有的颜色组
            for (int j = 0; j < colorCount; j++) {
                if (numList[i] % colors[j] == 0) {  // 如果能被已有颜色组的最小数整除
                    foundColor = true;  // 找到合适的颜色组，标志位设为true
                    break;  // 跳出循环，不再需要检查其他颜色组
                }
            }
    
            // 如果没有找到合适的颜色组，创建新的颜色组
            if (!foundColor) {
                colors[colorCount] = numList[i];  // 将当前数字作为一个新的颜色组的最小数
                colorCount++;  // 增加颜色组数量
            }
        }
    
        // 输出最少需要的颜色种数
        printf("%d\n", colorCount);
    
     
    
        return 0;  // 程序正常结束
    }
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

#### 完整用例

##### 用例1

    
    
    3
    2 4 6
    

##### 用例2

    
    
    4
    1 3 5 7
    

##### 用例3

    
    
    4
    2 3 4 9
    

##### 用例4

    
    
    2
    1 100
    

##### 用例5

    
    
    5
    2 3 4 5 6
    

##### 用例6

    
    
    10
    4 8 12 16 20 24 28 32 36 40
    

##### 用例7

    
    
    7
    2 3 5 7 11 13 17
    

##### 用例8

    
    
    7
    2 3 4 5 6 7 8
    

##### 用例9

    
    
    8
    3 5 7 9 11 13 15 17
    

##### 用例10

    
    
    5
    2 3 4 5 6
    

