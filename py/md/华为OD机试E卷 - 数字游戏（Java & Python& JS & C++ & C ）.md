## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

小明玩一个游戏。

系统发1+n张牌，每张牌上有一个整数。

第一张给小明，后n张按照发牌顺序排成连续的一行。

需要小明判断，后n张牌中，是否存在连续的若干张牌，其和可以整除小明手中牌上的数字。

## 输入描述

输入数据有多组，每组输入数据有两行，输入到文件结尾结束。

第一行有两个整数n和m，空格隔开。m代表发给小明牌上的数字。

第二行有n个数，代表后续发的n张牌上的数字，以空格隔开。

##### 备注

  * 1 ≤ n ≤ 1000
  * 1 ≤ 牌上的整数 ≤ 400000
  * 输入的组数，不多于1000
  * 用例确保输入都正确，不需要考虑非法情况。

## 输出描述

对每组输入，如果存在满足条件的连续若干张牌，则输出1;否则，输出0

## 示例1

输入

    
    
    6 7
    2 12 6 3 5 5
    10 11
    1 1 1 1 1 1 1 1 1 1
    

输出

    
    
    1
    0
    

说明

>
> 第一组小明牌的数字为7，再发了6张牌。第1、2两张牌教字和为14，可以整除7，输出1，第二组小明牌的教字为11，再发了10张牌，这10张牌数字和为10，无法整除11，输出0。

## 解题思路

题目描述可以理解为，小明玩一个游戏，游戏中系统会发1+n张牌，其中第一张牌给小明，后续的n张牌排成一行。小明需要判断在这n张牌中，是否存在连续的若干张牌，其数字之和可以被小明手中牌上的数字整除。

#### 具体理解：

  * 系统发1+n张牌，第一张牌上的数字是小明手中的牌上的数字，称为`m`。
  * 剩下的n张牌按照发牌顺序排成一行，并且每张牌上也有一个整数。
  * 任务是要找到这些n张牌中的连续若干张牌，使得它们的数字之和能够被小明手中牌上的数字`m`整除。

#### 示例解释：

  * 例如，输入`6 7`表示小明手中的牌上的数字是7，后续发了6张牌，牌上的数字依次为`2 12 6 3 5 5`。 
    * 其中第1、2两张牌的数字和为14，可以被7整除，因此输出1。
  * 第二组输入`10 11`表示小明手中的牌上的数字是11，后续发了10张牌，牌上的数字均为1。 
    * 这10张牌的任何连续子数组的和都不能被11整除，因此输出0。
    * 

总体思路是使用累加和的余数来判断是否存在连续的若干张牌和可以整除m。通过遍历后续发的牌的数字，累加到sum中，并计算当前和的余数。如果之前已经存在相同的余数，说明存在连续的若干张牌和可以整除m，将found标记为true。最后根据found的值输出1或0，表示是否存在满足条件的连续若干张牌。

## Java

    
    
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
    
            while (scanner.hasNextLine()) {
                // 读取输入的n和m，n代表牌的数量，m代表小明手中牌上的数字
                String[] input = scanner.nextLine().split(" ");
                int n = Integer.parseInt(input[0]);
                int m = Integer.parseInt(input[1]);
    
                // 读取后续发的n张牌的数字
                int[] cardNumbers = new int[n];
                String[] numStrings = scanner.nextLine().split(" ");
                for (int i = 0; i < n; i++) {
                    cardNumbers[i] = Integer.parseInt(numStrings[i]);
                }
    
                
                boolean[] remainderExists = new boolean[m];
                remainderExists[0] = true; // 处理初始和为0的情况
    
                int sum = 0;
                boolean found = false;
                for (int cardNumber : cardNumbers) {
                    sum += cardNumber;
                    int remainder = sum % m;
     
                    if (remainderExists[remainder]) {
                        found = true;
                        System.out.println(1);
                        break;
                    } else {
                        remainderExists[remainder] = true;
                    }
                }
                if (!found) {
                    System.out.println(0);
                }
            }
        }
    }
    

## Python

    
    
    import sys
    
    for line in sys.stdin:
        # 读取输入的n和m，n代表牌的数量，m代表小明手中牌上的数字
        n, m = map(int, line.split())
    
        # 读取后续发的n张牌的数字
        cardNumbers = list(map(int, input().split()))
    
        # 使用列表来记录余数的出现情况
        remainderExists = [False] * m
        remainderExists[0] = True 
    
        sum = 0
        found = False
        for cardNumber in cardNumbers:
            sum += cardNumber  # 将当前牌的数字累加到sum中
            remainder = sum % m  # 计算当前和的余数
            if remainderExists[remainder]:  # 如果之前已经存在相同的余数，说明存在连续的若干张牌和可以整除m
                found = True
                break
            else:
                remainderExists[remainder] = True  # 将当前余数标记为已存在
    
        print(1 if found else 0)
    
    
    

## JavaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    let isFirstLine = true;
    let n, m, cardNumbers;
    
    rl.on('line', (line) => {
      if (isFirstLine) {
        // 读取输入的n和m，n代表牌的数量，m代表小明手中牌上的数字
        [n, m] = line.split(' ').map(Number);
        isFirstLine = false;
      } else {
        // 读取后续发的n张牌的数字
        cardNumbers = line.split(' ').map(Number);
    
        // 使用数组来记录余数的出现情况
        let remainderExists = new Array(m).fill(false);
        remainderExists[0] = true
    
        let sum = 0;
        let found = false;
        for (let i = 0; i < n; i++) {
          const cardNumber = cardNumbers[i];
          sum += cardNumber;  // 将当前牌的数字累加到sum中
          const remainder = sum % m;  // 计算当前和的余数
          if (remainderExists[remainder]) {  // 如果之前已经存在相同的余数，说明存在连续的若干张牌和可以整除m
            found = true;
            break;
          } else {
            remainderExists[remainder] = true;  // 将当前余数标记为已存在
          }
        }
    
        console.log(found ? 1 : 0);
    
        isFirstLine = true;
      }
    });
    
    
    

## C++

    
    
    #include <iostream>
    #include <sstream>
    #include <vector>
    
    int main() {
        std::string line;
        while (std::getline(std::cin, line)) {
            std::istringstream iss(line);
    
            // 读取输入的n和m，n代表牌的数量，m代表小明手中牌上的数字
            int n, m;
            iss >> n >> m;
    
            // 读取后续发的n张牌的数字
            std::vector<int> cardNumbers(n);
            std::getline(std::cin, line);
            iss.str(line);
            iss.clear();
            for (int i = 0; i < n; i++) {
                iss >> cardNumbers[i];
            }
    
            // 使用bool数组来记录余数的出现情况
            std::vector<bool> remainderExists(m, false);
    		remainderExists[0] = true;
            int sum = 0;
            bool found = false;
            for (int cardNumber : cardNumbers) {
                sum += cardNumber; // 将当前牌的数字累加到sum中
                int remainder = sum % m; // 计算当前和的余数
                if (remainderExists[remainder]) { // 如果之前已经存在相同的余数，说明存在连续的若干张牌和可以整除m
                    found = true;
                    break;
                } else {
                    remainderExists[remainder] = true; // 将当前余数标记为已存在
                }
            }
    
            std::cout << (found ? 1 : 0) << std::endl;
        }
    
        return 0;
    }
    
    
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    #include <stdbool.h>
    
    int main() {
        int n, m; // 定义两个整数变量n和m，n代表牌的数量，m代表小明手中牌上的数字
    
        // 使用while循环读取输入，当输入不是文件结束符EOF时继续执行
        while (scanf("%d %d", &n, &m) != EOF) {
            int cardNumbers[n]; // 定义一个数组来存储n张牌的数字
    
            // 读取n个牌的数字
            for (int i = 0; i < n; i++) {
                scanf("%d", &cardNumbers[i]); // 从输入中读取每个牌的数字并存入数组
            }
    
            // 定义一个布尔数组用于记录余数的出现情况，初始值全部为false
            bool remainderExists[m]; 
            for (int i = 0; i < m; i++) {
                remainderExists[i] = false; // 初始化布尔数组
            }
            remainderExists[0] = true;
    
            int sum = 0; // 用于存储牌数字的累加和
            bool found = false; // 标记是否找到满足条件的连续牌
    
            // 遍历每张牌的数字，计算累加和并求余数
            for (int i = 0; i < n; i++) {
                sum += cardNumbers[i]; // 将当前牌的数字累加到sum中
                int remainder = sum % m; // 计算当前和的余数
    
                // 如果当前余数为0，或者之前已经存在相同的余数，说明存在满足条件的连续牌
                if (remainder == 0 || remainderExists[remainder]) {
                    found = true; // 设置found为true表示找到满足条件的连续牌
                    break; // 跳出循环
                } else {
                    remainderExists[remainder] = true; // 将当前余数标记为已存在
                }
            }
    
            // 输出结果，1表示找到满足条件的连续牌，0表示没有找到
            printf("%d\n", found ? 1 : 0);
        }
    
        return 0; // 返回0表示程序正常结束
    }
    

## 完整用例

### 用例1

    
    
    6 7
    2 12 6 3 5 5
    10 11
    1 1 1 1 1 1 1 1 1 1
    

### 用例2

    
    
    1 7
    7
    

### 用例3

    
    
    6 7
    2 12 6 3 5 5
    

### 用例4

    
    
    10 11
    1 1 1 1 1 1 1 1 1 1
    

### 用例5

    
    
    5 10
    5 5 5 5 5
    

### 用例6

    
    
    3 6
    4 5 6
    

### 用例7

    
    
    4 8
    2 4 6 8
    

### 用例8

    
    
    5 9
    1 2 3 4 5
    

### 用例9

    
    
    7 14
    2 4 6 8 10 12 14
    

### 用例10

    
    
    6 12
    2 4 6 8 10 12
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/6885919214a4e403b0e064f2d9ec593f.png)

