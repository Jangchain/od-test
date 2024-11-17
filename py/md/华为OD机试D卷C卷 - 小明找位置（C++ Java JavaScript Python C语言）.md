## 题目描述

小朋友出操，按学号从小到大排成一列;小明来迟了，请你给小明出个主意，让他尽快找到他应该排的位置。

算法复杂度要求不高于nLog(n);学号为整数类型，队列规模<=10000;

## 输入描述

1、第一行:输入已排成队列的小朋友的学号 (正整数)，以”,”隔开

​ 例如: 93,95,97,100,102,123,155  
2、第二行:小明学号，如110;

## 输出描述

输出一个数字，代表队列位置 (从1开始)例如:  
6

## 用例

输入| 93,95,97,100,102,123,155  
110  
---|---  
输出| 6  
说明| 无  
  
## C++

    
    
    #include <iostream>
    #include <vector>
    #include <algorithm>
    
    int main() {
        std::string line;
        std::getline(std::cin, line);  // 读取一行输入
        int xiaoMingNumber;
        std::cin >> xiaoMingNumber;
    
        // 分割字符串并转换为整数数组
        std::vector<int> numbers;
        size_t pos = 0;
        while ((pos = line.find(',')) != std::string::npos) {
            numbers.push_back(stoi(line.substr(0, pos)));
            line.erase(0, pos + 1);
        }
        numbers.push_back(stoi(line)); // 添加最后一个元素
    
        // 对数组进行排序
        std::sort(numbers.begin(), numbers.end());
    
        // 使用二分查找找到小明的位置
        auto position = std::lower_bound(numbers.begin(), numbers.end(), xiaoMingNumber) - numbers.begin();
    
        // 输出小明应该排的位置，位置从1开始计数
        std::cout << position + 1 << std::endl;
    
        return 0;
    }
    

## Java

    
    
    import java.util.*;
    
    public class Main {
        public static void main(String[] args) {
    
            Scanner sc = new Scanner(System.in);
            String line = sc.nextLine();
            int xiaoMingNumber = Integer.parseInt(sc.nextLine());;
    
            // 将字符串分割成数组并转换为整数
            String[] numbersStr = line.split(",");
            int[] numbers = new int[numbersStr.length];
            for (int i = 0; i < numbers.length; i++) {
                numbers[i] = Integer.parseInt(numbersStr[i].trim());
            }
    
            // 对数组进行排序
            Arrays.sort(numbers);
    
            // 使用二分查找找到小明的位置
            int position = Arrays.binarySearch(numbers, xiaoMingNumber);
            // binarySearch()方法的返回值为：
            // 1、如果找到关键字，则返回值为关键字在数组中的位置索引，且索引从0开始
            // 2、如果没有找到关键字，返回值为负的插入点值，所谓插入点值就是第一个比关键字大的元素在数组中的位置索引，
            // 而且这个位置索引从1开始。
            // 如果位置是负数，转换为插入位置
            if (position < 0) {
                position = -position - 1;
            }
    
            // 输出小明应该排的位置，位置从1开始计数
            System.out.println(position + 1);
        }
    }
    

## javaScript

    
    
    const readline = require('readline');
    
    // 创建 readline 接口实例
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    
    rl.on('line', (line) => {
        // 读取小明的学号
        rl.on('line', (xiaoMingNumber) => {
            xiaoMingNumber = parseInt(xiaoMingNumber);
    
            // 分割字符串并转换为整数数组
            const numbers = line.split(',').map(num => parseInt(num.trim()));
    
            // 对数组进行排序
            numbers.sort((a, b) => a - b);
    
            // 使用二分查找算法找到小明的位置
            let left = 0, right = numbers.length, mid;
            while (left < right) {
                mid = Math.floor((left + right) / 2);
                if (numbers[mid] < xiaoMingNumber) {
                    left = mid + 1;
                } else {
                    right = mid;
                }
            }
            const position = left;
    
            // 输出小明应该排的位置，位置从1开始计数
            console.log(position + 1);
            process.exit();
        });
    });
    

## Python

    
    
    # 读取输入
    line = input()
    xiao_ming_number = int(input())
    
    # 分割字符串并转换为整数列表
    numbers = [int(num) for num in line.split(',')]
    
    # 对列表进行排序
    numbers.sort()
    
    # 使用二分查找找到小明的位置
    position = 0
    left, right = 0, len(numbers)
    while left < right:
        mid = (left + right) // 2
        if numbers[mid] < xiao_ming_number:
            left = mid + 1
        else:
            right = mid
    position = left
    
    # 输出小明应该排的位置，位置从1开始计数
    print(position + 1)
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    #include <string.h>
    
    // 字符串分割函数
    void split(const char *str, int *array, int *size) {
        char *token;
        char *strCopy = strdup(str); // 复制字符串，避免修改原字符串
    
        token = strtok(strCopy, ",");
        while (token != NULL) {
            array[*size] = atoi(token); // 将字符串转换为整数，并存储在数组中
            (*size)++;
            token = strtok(NULL, ",");
        }
    
        free(strCopy); // 释放复制的字符串
    }
    
    // 比较函数，用于qsort
    int compare(const void *a, const void *b) {
        return (*(int *)a - *(int *)b);
    }
    
    // 二分查找函数
    int binarySearch(int *array, int size, int xiaoMingNumber) {
        int low = 0, high = size - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (array[mid] == xiaoMingNumber) {
                return mid + 1; // 返回位置时加1，因为位置从1开始计数
            }
            if (array[mid] < xiaoMingNumber) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return low + 1; // 如果找不到，返回小明应插入的位置
    }
    
    int main() {
        char line[10000]; // 存储输入的字符串
        fgets(line, 10000, stdin); // 读取一行输入
        int xiaoMingNumber;
        scanf("%d", &xiaoMingNumber);
    
        int numbers[10000], size = 0;
        split(line, numbers, &size); // 分割字符串并转换为整数数组
    
        qsort(numbers, size, sizeof(int), compare); // 对数组进行排序
    
        // 使用二分查找找到小明的位置
        int position = binarySearch(numbers, size, xiaoMingNumber);
    
        // 输出小明应该排的位置
        printf("%d\n", position);
    
        return 0;
    }
    

## 完整用例

### 用例1

93,95,97,100,102,123,155  
110

### 用例2

93,95,97,100,102,123,155  
90

### 用例3

93,95,97,100,102,123,155  
160

### 用例4

93,95,97,100,102,123,155  
123

### 用例5

100  
110

### 用例6

100  
90

### 用例7

93,95,97,100,102,123,155  
93

### 用例8

93,95,97,100,102,123,155  
155

### 用例9

93,95,97,100,100,102,123,155  
110

### 用例10

93,94,95,95,96,97,98,99,100  
95  

#### 文章目录

  * 题目描述
  * 输入描述
  * 输出描述
  * 用例
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

![fengmian](https://i-blog.csdnimg.cn/blog_migrate/97b72caddf5c1641752431960b41ac95.png)

