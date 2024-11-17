## 题目描述;山脉的个数(本题分值100)

攀登者喜欢寻找各种地图，并且尝试攀登到最高的山峰。

地图表示为一维数组，数组的索引代表水平位置，数组的元素代表相对海拔高度。其中数组元素0代表地面。

一个山脉可能有多座山峰(高度大于相邻位置的高度，或在地图边界且高度大于相邻的高度)。  
登山者想要知道一张地图中有多少座山峰。  
例如：[0,1,2,4,3,1,0,0,1,2,3,1,2,1,0]，代表如下图所示的地图，地图中有三个山脉位置分别为 1,2,3,4,5 和
8,9,10,11,12,13，最高峰高度分别为 4,3,2。最高峰位置分别为3,10,12。  
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/3c635b291089817065a67c34eebc2430.png)

## 输入描述

输入为一个整型数组，数组长度大于1。

## 输出描述

输出地图中山峰的数量。

## 用例1

输入

    
    
    0, 1, 2, 3, 2, 4
    

输出

    
    
    2
    

说明：

元素3和4 都是山峰，输出2.

![image-20231109223048368](https://i-blog.csdnimg.cn/blog_migrate/deb547e1ceea76b4c6e64d5270df3b18.png)

## 用例2

输入

    
    
    0,1,4,3,1,0,0,1,2,3,1,2,1,0
    

输出

    
    
    3
    

说明 山峰所在索引分别为3，10，12

## 解题思路

如果当前元素是数组的第一个元素，并且大于下一个元素，或者是数组的最后一个元素，并且大于前一个元素，或者既不是第一个也不是最后一个元素，但大于前一个元素且大于后一个元素，则将计数器`count`加一。

## C语言

    
    
    int count_peaks(int hill_map[] ){
        int size = sizeof(hill_map)  ; // 计算数组的长度
        int count = 0; // 初始化计数器为 0
        for(int i = 0; i < size; i++){ // 遍历数组 hill_map
            if(i == 0 && hill_map[i] > hill_map[i + 1]){ // 如果当前位置在数组的开头，并且当前元素大于下一个元素
                count++; // 计数器加一
            }
            if(i == size - 1 && hill_map[i] > hill_map[i - 1]){ // 如果当前位置在数组的末尾，并且当前元素大于前一个元素
                count++; // 计数器加一
            }
            if(i > 0 && i < size - 1 && hill_map[i] > hill_map[i - 1] && hill_map[i] > hill_map[i + 1]){ // 如果当前位置不在开头和末尾，并且当前元素大于前一个元素且大于后一个元素
                count++; // 计数器加一
            }
        }
        return count; // 返回计数器的值作为结果
    }
    
    
    
    #include <stdio.h>
    #include <stdlib.h>
    #include <string.h>
    
    int main() {
        char line[1024]; // 假设输入的长度不超过1023个字符
     
        fgets(line, 1024, stdin); // 读取一行输入
    
        // 计算逗号的数量以确定数字的数量
        int numCount = 1;
        for (int i = 0; line[i]; i++) {
            if (line[i] == ',') numCount++;
        }
    
        // 创建一个整型数组来存储转换后的整数
        int* hill_map = (int*)malloc(numCount * sizeof(int));
     
    
        // 使用strtok分割字符串，并将分割后的字符串转换为整型后存储到数组中
        char* token = strtok(line, ",");
        int index = 0;
        while (token != NULL) {
            hill_map[index++] = atoi(token);
            token = strtok(NULL, ",");
        }
    
        int count = 0; // 初始化计数器为 0
        for (int i = 0; i < numCount; i++) { // 遍历数组 hill_map
            if (i == 0 && hill_map[i] > hill_map[i + 1]) { // 如果当前位置在数组的开头，并且当前元素大于下一个元素
                count++; // 计数器加一
            } else if (i == numCount - 1 && hill_map[i] > hill_map[i - 1]) { // 如果当前位置在数组的末尾，并且当前元素大于前一个元素
                count++; // 计数器加一
            } else if (i > 0 && i < numCount - 1 && hill_map[i] > hill_map[i - 1] && hill_map[i] > hill_map[i + 1]) { // 如果当前位置不在开头和末尾，并且当前元素大于前一个元素且大于后一个元素
                count++; // 计数器加一
            }
        }
    
        printf("%d\n", count);
    
        free(hill_map); // 释放动态分配的内存
        return 0;
    }
    

## C++

    
    
     
    
    // 计算给定hill_map中峰值的函数
    int count_peaks(std::vector<int> hill_map) {
        int count = 0; // 初始化计数器为0
    
        // 遍历hill_map数组
        for(int i = 0; i < hill_map.size(); i++) {
    
            // 如果当前位置在数组的开始位置，并且当前元素大于下一个元素
            if(i == 0 && hill_map[i] > hill_map[i+1]) {
                count++; // 计数器加一
            }
    
            // 如果当前位置在数组的结束位置，并且当前元素大于前一个元素
            if(i == hill_map.size()-1 && hill_map[i] > hill_map[i-1]) {
                count++; // 计数器加一
            }
    
            // 如果当前位置不在数组的开始或结束位置，并且当前元素大于前一个元素和下一个元素
            if(i > 0 && i < hill_map.size()-1 && hill_map[i] > hill_map[i-1] && hill_map[i] > hill_map[i+1]) {
                count++; // 计数器加一
            }
        }
    
        // 返回计数器的值作为结果
        return count;
    }
    
     
    
    
    
    
    #include <iostream>
    #include <sstream>
    #include <vector>
    
    int main() {
        std::string line;
        std::getline(std::cin, line); // 读取一行输入
    
        std::stringstream ss(line);
        std::string number;
        std::vector<int> hill_map;
    
        // 使用逗号分割字符串，并将分割后的字符串转换为整型后存储到向量中
        while (std::getline(ss, number, ',')) {
            hill_map.push_back(std::stoi(number));
        }
    
        int count = 0; // 初始化计数器为 0
        for (size_t i = 0; i < hill_map.size(); i++) { // 遍历向量 hill_map
            if (i == 0 && hill_map[i] > hill_map[i + 1]) { // 如果当前位置在向量的开头，并且当前元素大于下一个元素
                count++; // 计数器加一
            }
            if (i == hill_map.size() - 1 && hill_map[i] > hill_map[i - 1]) { // 如果当前位置在向量的末尾，并且当前元素大于前一个元素
                count++; // 计数器加一
            }
            if (i > 0 && i < hill_map.size() - 1 && hill_map[i] > hill_map[i - 1] && hill_map[i] > hill_map[i + 1]) { // 如果当前位置不在开头和末尾，并且当前元素大于前一个元素且大于后一个元素
                count++; // 计数器加一
            }
        }
    
        std::cout << count << std::endl; // 输出计数器的值
    
        return 0;
    }
    

## Java

    
    
    public static int count_peaks(int[] hill_map){
        int count = 0; // 初始化计数器为 0
        for(int i = 0; i < hill_map.length; i++){ // 遍历数组 hill_map
            if(i == 0 && hill_map[i] > hill_map[i+1]){ // 如果当前位置在数组的开头，并且当前元素大于下一个元素
                count++; // 计数器加一
            }
            if(i == hill_map.length-1 && hill_map[i] > hill_map[i-1]){ // 如果当前位置在数组的末尾，并且当前元素大于前一个元素
                count++; // 计数器加一
            }
            if(i > 0 && i < hill_map.length-1 && hill_map[i] > hill_map[i-1] && hill_map[i] > hill_map[i+1]){ // 如果当前位置不在开头和末尾，并且当前元素大于前一个元素且大于后一个元素
                count++; // 计数器加一
            }
        }
        return count; // 返回计数器的值作为结果
    }
    
    
    
    
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
    
            // 读取一行输入
            String line = scanner.nextLine();
    
            // 关闭scanner
            scanner.close();
    
            // 使用逗号和空格分割字符串
            String[] numberStrings = line.split(",");
    
            // 创建一个整型数组来存储转换后的整数
            int[] hill_map = new int[numberStrings.length];
    
            // 将字符串数组转换为整型数组
            for (int i = 0; i < numberStrings.length; i++) {
                hill_map[i] = Integer.parseInt(numberStrings[i].trim());
            }
    
           int count = 0; // 初始化计数器为 0
            for(int i = 0; i < hill_map.length; i++){ // 遍历数组 hill_map
                if(i == 0 && hill_map[i] > hill_map[i+1]){ // 如果当前位置在数组的开头，并且当前元素大于下一个元素
                    count++; // 计数器加一
                }
                if(i == hill_map.length-1 && hill_map[i] > hill_map[i-1]){ // 如果当前位置在数组的末尾，并且当前元素大于前一个元素
                    count++; // 计数器加一
                }
                if(i > 0 && i < hill_map.length-1 && hill_map[i] > hill_map[i-1] && hill_map[i] > hill_map[i+1]){ // 如果当前位置不在开头和末尾，并且当前元素大于前一个元素且大于后一个元素
                    count++; // 计数器加一
                }
            }
    
            System.out.println(count);
     
        }
    }
    

## JavaScript

    
    
    function count_peaks(hill_map) {
        let count = 0; // 初始化计数器为 0
        for(let i = 0; i < hill_map.length; i++){ // 遍历数组 hill_map
            if(i === 0 && hill_map[i] > hill_map[i+1]){ // 如果当前位置在数组的开头，并且当前元素大于下一个元素
                count++; // 计数器加一
            }
            if(i === hill_map.length-1 && hill_map[i] > hill_map[i-1]){ // 如果当前位置在数组的末尾，并且当前元素大于前一个元素
                count++; // 计数器加一
            }
            if(i > 0 && i < hill_map.length-1 && hill_map[i] > hill_map[i-1] && hill_map[i] > hill_map[i+1]){ // 如果当前位置不在开头和末尾，并且当前元素大于前一个元素且大于后一个元素
                count++; // 计数器加一
            }
        }
        return count; // 返回计数器的值作为结果
    }
    
    
    
    
    const readline = require('readline');
    
    // 创建 readline 接口实例
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
     
    
    // 读取一行输入
    rl.on('line', (input) => {
      // 使用逗号分割输入字符串
      const numberStrings = input.split(",");
      
      // 将字符串数组转换为整型数组
      const hill_map = numberStrings.map(num => parseInt(num.trim(), 10));
    
      let count = 0; // 初始化计数器为 0
      for (let i = 0; i < hill_map.length; i++) { // 遍历数组 hill_map
        if (i === 0 && hill_map[i] > hill_map[i + 1] || // 如果当前位置在数组的开头，并且当前元素大于下一个元素
            i === hill_map.length - 1 && hill_map[i] > hill_map[i - 1] || // 如果当前位置在数组的末尾，并且当前元素大于前一个元素
            i > 0 && i < hill_map.length - 1 && hill_map[i] > hill_map[i - 1] && hill_map[i] > hill_map[i + 1]) { // 如果当前位置不在开头和末尾，并且当前元素大于前一个元素且大于后一个元素
          count++; // 计数器加一
        }
      }
    
      console.log(count); // 输出计数器的值
      rl.close(); // 关闭 readline 接口
    });
    

## Python

    
    
    def count_peaks(hill_map):
        count = 0  # 初始化计数器为 0
        for i in range(len(hill_map)):  # 遍历数组 hill_map
            if i == 0 and hill_map[i] > hill_map[i + 1]:  # 如果当前位置在数组的开头，并且当前元素大于下一个元素
                count += 1  # 计数器加一
            if i == len(hill_map) - 1 and hill_map[i] > hill_map[i - 1]:  # 如果当前位置在数组的末尾，并且当前元素大于前一个元素
                count += 1  # 计数器加一
            if i > 0 and i < len(hill_map) - 1 and hill_map[i] > hill_map[i - 1] and hill_map[i] > hill_map[i + 1]:  # 如果当前位置不在开头和末尾，并且当前元素大于前一个元素且大于后一个元素
                count += 1  # 计数器加一
        return count  # 返回计数器的值作为结果
    
    
    
    
     
    
    # 读取一行输入
    line = input()
    
    # 使用逗号分割输入字符串，并转换为整型数组
    hill_map = [int(num.strip()) for num in line.split(",")]
    
    count = 0  # 初始化计数器为 0
    for i in range(len(hill_map)):  # 遍历数组 hill_map
        if (i == 0 and hill_map[i] > hill_map[i + 1]) or \
           (i == len(hill_map) - 1 and hill_map[i] > hill_map[i - 1]) or \
           (0 < i < len(hill_map) - 1 and hill_map[i] > hill_map[i - 1] and hill_map[i] > hill_map[i + 1]):  # 如果当前位置不在开头和末尾，并且当前元素大于前一个元素且大于后一个元素
            count += 1  # 计数器加一
    
    print(count)  # 输出计数器的值
    

## 完整用例

### 用例1

0, 1, 2, 3, 2, 1, 0, 4, 3, 0

### 用例2

4, 1, 2, 3, 0

### 用例3

0, 1, 2, 3, 4

### 用例4

0, 0, 0, 0, 0

### 用例5

2, 2, 2, 2, 2

### 用例6

0, 1, 0, 2, 0, 3, 0

### 用例7

0, 1, 2, 5, 2, 1, 0

### 用例8

0, 1, 2, 2, 1, 0

### 用例9

0, 2, 0, 2, 1, 2, 0, 2, 0

### 用例10

0, 2, 0, 2, 1, 2, 0, 2, 2  

#### 文章目录

  * 题目描述;山脉的个数(本题分值100)
  * 输入描述
  * 输出描述
  * 用例1
  * 用例2
  * 解题思路
  * C语言
  * C++
  * Java
  * JavaScript
  * Python
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

![doutub_gif](https://i-blog.csdnimg.cn/blog_migrate/3cb8e2318f9657470932620a3ea3e1e8.png)

