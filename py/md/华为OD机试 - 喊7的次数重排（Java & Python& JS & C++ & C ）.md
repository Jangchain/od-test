## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

喊7是一个传统的聚会游戏，N个人围成一圈，按顺时针从1到N编号。

编号为1的人从1开始喊数，下一个人喊的数字为上一个人的数字加1，但是当将要喊出来的数字是7的倍数或者数字本身含有7的话，不能把这个数字直接喊出来，而是要喊”过”。

假定玩这个游戏的N个人都没有失误地在正确的时机喊了”过”，当喊到数字K时，可以统计每个人喊”过”的次数。

现给定一个长度为N的数组，存储了打乱顺序的每个人喊”过”的次数，请把它还原成正确的顺序，即数组的第i个元素存储编号i的人喊”过”的次数。

## 输入描述

输入为一行，为空格分隔的喊”过”的次数，注意K并不提供，K不超过200，而数字的个数即为N。

## 输出描述

输出为一行，为顺序正确的喊”过”的次数，也由空格分隔。

## 示例1

输入

    
    
    0 1 0
    

输出

    
    
    1 0 0
    

说明

> 一共只有一次喊”过”，那只会发生在需要喊7时，按顺序，编号为1的人会遇到7，故输出1 0 0。

## 示例2

输入

    
    
    一共只有一次喊”过”，那只会发生在需要喊7时，按顺序，编号为1的人会遇到7，故输出1 0 0。
    

输出

    
    
    0 2 0 1 0
    

说明

> 一共有三次喊”过”，发生在7 14 17，按顺序，编号为2的人会遇到7 17，编号为4的人会遇到14，故输出0 2 0 1 0。

## 解题思路

## Java

    
    
    import java.util.Arrays;
    import java.util.Scanner;
    import java.util.StringJoiner;
    
    public class Main {
      public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
    
        // 读取输入，将喊过的次数存储在数组中
        int[] counts =
            Arrays.stream(scanner.nextLine().split(" ")).mapToInt(Integer::parseInt).toArray();
    
        // 计算总共喊过的次数
        int totalPass = Arrays.stream(counts).sum();
    
        int numberOfPeople = counts.length;
        int[] peopleCounts = new int[numberOfPeople]; // 存储每个人喊过的次数
    
        int currentNumber = 1; // 当前要喊的数字
        int currentIndex = 0; // 当前喊过的人的索引
        while (totalPass > 0) {
          if (currentNumber % 7 == 0 || (currentNumber + "").contains("7")) { // 如果当前数字是7的倍数或包含7
            totalPass--;
            peopleCounts[currentIndex]++; // 当前喊过的人喊过的次数加1
          }
          currentNumber++;
          currentIndex = (currentIndex + 1) % numberOfPeople; // 更新喊过的人的索引
        }
    
        // 构造输出字符串
        StringJoiner stringJoiner = new StringJoiner(" ");
        for (int count : peopleCounts) {
          stringJoiner.add(Integer.toString(count));
        }
        System.out.println(stringJoiner.toString());
      }
    }
    
    

## Python

    
    
    counts = list(map(int, input().split()))
    
    totalPass = sum(counts)
    
    numberOfPeople = len(counts)
    peopleCounts = [0] * numberOfPeople
    
    currentNumber = 1
    currentIndex = 0
    while totalPass > 0:
        if currentNumber % 7 == 0 or str(currentNumber).find('7') != -1:
            totalPass -= 1
            peopleCounts[currentIndex] += 1
        currentNumber += 1
        currentIndex = (currentIndex + 1) % numberOfPeople
    
    output = ' '.join(map(str, peopleCounts))
    print(output)
    
    

## JavaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.on('line', (countsStr) => {
      let counts = countsStr.split(" ").map(Number);
      let totalPass = counts.reduce((sum, count) => sum + count, 0);
      let numberOfPeople = counts.length;
      let peopleCounts = new Array(numberOfPeople).fill(0);
    
      let currentNumber = 1;
      let currentIndex = 0;
      while (totalPass > 0) {
        if (currentNumber % 7 === 0 || currentNumber.toString().includes("7")) {
          totalPass--;
          peopleCounts[currentIndex]++;
        }
        currentNumber++;
        currentIndex = (currentIndex + 1) % numberOfPeople;
      }
    
      const result = peopleCounts.join(" ");
      console.log(result);
    
      rl.close();
    });
    
    

## C++

    
    
    #include <iostream>
    #include <sstream>
    #include <vector>
    #include <algorithm>
    using namespace std;
    
    int main() {
      string line;
      getline(cin, line);
      istringstream iss(line);
      
      vector<int> counts;
      int count;
      while (iss >> count) {
        counts.push_back(count);
      }
      
      int totalPass = 0;
      for (int i = 0; i < counts.size(); i++) {
        totalPass += counts[i];
      }
      
      int numberOfPeople = counts.size();
      vector<int> peopleCounts(numberOfPeople, 0);
      
      int currentNumber = 1;
      int currentIndex = 0;
      while (totalPass > 0) {
        if (currentNumber % 7 == 0 || to_string(currentNumber).find("7") != string::npos) {
          totalPass--;
          peopleCounts[currentIndex]++;
        }
        currentNumber++;
        currentIndex = (currentIndex + 1) % numberOfPeople;
      }
      
      string output;
      for (int i = 0; i < peopleCounts.size(); i++) {
        output += to_string(peopleCounts[i]) + " ";
      }
      output = output.substr(0, output.size() - 1);
      
      cout << output << endl;
      
      return 0;
    }
    
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    #include <string.h>
    
    // 判断一个数字是否是7的倍数或包含数字7
    int isPassNumber(int number) {
        if (number % 7 == 0) return 1;
        while (number > 0) {
            if (number % 10 == 7) return 1;
            number /= 10;
        }
        return 0;
    }
    
    int main() {
        char input[1000]; // 用于存储输入行的字符数组
        fgets(input, sizeof(input), stdin); // 读取输入的整行字符串
    
        // 计算有多少人（即数字个数）
        int numberOfPeople = 0;
        for (int i = 0; input[i] != '\0'; i++) {
            if (input[i] == ' ') numberOfPeople++;
        }
        numberOfPeople++; // 数字个数等于空格数加1
    
        int counts[numberOfPeople]; // 用于存储每个人的“喊过”次数
        int peopleCounts[numberOfPeople]; // 用于存储按顺序计算的每个人“喊过”次数
        memset(peopleCounts, 0, sizeof(peopleCounts)); // 初始化peopleCounts数组为0
    
        // 将输入的字符串转换为整数数组
        char* token = strtok(input, " ");
        for (int i = 0; i < numberOfPeople; i++) {
            counts[i] = atoi(token);
            token = strtok(NULL, " ");
        }
    
        // 计算总共的“喊过”次数
        int totalPass = 0;
        for (int i = 0; i < numberOfPeople; i++) {
            totalPass += counts[i];
        }
    
        int currentNumber = 1; // 当前要喊的数字
        int currentIndex = 0; // 当前要处理的人的索引
    
        // 模拟游戏过程
        while (totalPass > 0) {
            // 检查当前数字是否是7的倍数或包含7
            if (isPassNumber(currentNumber)) {
                totalPass--; // 总的“喊过”次数减少
                peopleCounts[currentIndex]++; // 当前人的“喊过”次数增加
            }
            currentNumber++; // 增加当前数字
            currentIndex = (currentIndex + 1) % numberOfPeople; // 更新当前人的索引
        }
    
        // 输出结果
        for (int i = 0; i < numberOfPeople; i++) {
            printf("%d", peopleCounts[i]);
            if (i != numberOfPeople - 1) {
                printf(" ");
            }
        }
        printf("\n");
    
        return 0;
    }
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/e36c2d09e89bec006bf524b8b2f11a5c.png)

#### 完整用例

##### 用例1

    
    
    0 1 0
    

##### 用例2

    
    
    0 0 0 2 1
    

##### 用例3

    
    
    0 0 0 0 0 0 0 0 0 0
    

##### 用例4

    
    
    1 1 1 1 1
    

##### 用例5

    
    
    2 0 0 0 0
    

##### 用例6

    
    
    0 1 0 1 0 1
    

##### 用例7

    
    
    3 4 5 6 7 8 9
    

##### 用例8

    
    
    1 2 3 4 5 6 7 8 9 10
    

##### 用例9

    
    
    7 7 7 7 7
    

##### 用例10

    
    
    7 14 21 28 35
    

