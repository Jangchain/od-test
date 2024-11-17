## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

所谓水仙花数，是指一个n位的正整数，其各位数字的n次方和等于该数本身。

例如153是水仙花数，153是一个3位数，并且153 = 1^3 + 5^3 + 3^3。

## 输入描述

第一行输入一个整数n，表示一个n位的正整数。n在3到7之间，包含3和7。

第二行输入一个正整数m，表示需要返回第m个水仙花数。

## 输出描述

返回长度是n的第m个水仙花数。个数从0开始编号。

若m大于水仙花数的个数，返回最后一个水仙花数和m的乘积。

若输入不合法，返回-1。

## 示例1

输入

    
    
    3
    0
    

输出

    
    
    153
    

说明

> 153是第一个水仙花数

## 示例2

输入

    
    
    9
    1
    

输出

    
    
    -1
    

说明

> 9超出范围

## 解题思路

## Java

    
    
    import java.util.*;
    
    public class Main {
         public static void main(String[] args) {
            Scanner sc = new Scanner(System.in);
            
            // 输入n和m
            int n = sc.nextInt();
            int m = sc.nextInt();
            
            // 判断输入是否合法
            if (n < 3 || n > 7) {
                System.out.println("-1");
                return;
            }
            
            // 计算水仙花数的范围
            int start = (int) Math.pow(10, n - 1);
            int end = (int) Math.pow(10, n);
            
            // 存储水仙花数的列表
            List<Integer> narcissusList = new ArrayList<>();
            
            // 遍历范围内的数，判断是否为水仙花数并加入列表
            for (int i = start; i < end; i++) {
                if (isNarcissusNumber(i, n)) {
                    narcissusList.add(i);
                }
            }
            
            // 获取水仙花数列表的长度
            int size = narcissusList.size();
            
            // 若列表为空，输出-1
            if (size == 0) {
                System.out.println("-1");
                return;
            }
            
            // 输出第m个水仙花数，若m大于列表长度，则输出最后一个水仙花数乘以m
            System.out.println(m >= size ? m * narcissusList.get(size - 1) : narcissusList.get(m));
        }
        
        // 判断一个数是否为水仙花数
        public static boolean isNarcissusNumber(int num, int n) {
            int sum = 0;
            String numStr = String.valueOf(num);
            
            // 计算各位数字的n次方和
            for (int i = 0; i < n; i++) {
                sum += Math.pow(Integer.parseInt(numStr.substring(i, i + 1)), n);
            }
            
            // 判断是否为水仙花数
            return sum == num;
        }
    }
    
    
    

## Python

    
    
    def isNarcissusNumber(num, n):
        sum = 0
        numStr = str(num)
    
        for i in range(n):
            sum += int(numStr[i]) ** n
    
        return sum == num
    n = int(input())
    m = int(input())
    
    if n < 3 or n > 7:
        print("-1")
        exit()
    
    start = 10 ** (n - 1)
    end = 10 ** n
    
    narcissusList = []
    
    for i in range(start, end):
        if isNarcissusNumber(i, n):
            narcissusList.append(i)
    
    size = len(narcissusList)
    
    if size == 0:
        print("-1")
        exit()
    
    print(m * narcissusList[size - 1] if m >= size else narcissusList[m])
    
    
    
    

## JavaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.on('line', (n) => {
      rl.on('line', (m) => {
        n= parseInt(n);
        m= parseInt(m);
     // 判断输入是否合法
      if (n < 3 || n > 7) {
        console.log("-1");
        rl.close();
        return;
      }
      
      // 计算水仙花数的范围
      const start = Math.pow(10, n - 1);
      const end = Math.pow(10, n);
      
      // 存储水仙花数的列表
      const narcissusList = [];
      
      // 遍历范围内的数，判断是否为水仙花数并加入列表
      for (let i = start; i < end; i++) {
        if (isNarcissusNumber(i, n)) {
          narcissusList.push(i);
        }
      }
      
      // 获取水仙花数列表的长度
      const size = narcissusList.length;
      
      // 若列表为空，输出-1
      if (size === 0) {
        console.log("-1");
        rl.close();
        return;
      }
      
      // 输出第m个水仙花数，若m大于列表长度，则输出最后一个水仙花数乘以m
      console.log(m >= size ? m * narcissusList[size - 1] : narcissusList[m]);
      
      rl.close();
    });
    });
     
    
    // 判断一个数是否为水仙花数
    function isNarcissusNumber(num, n) {
      let sum = 0;
      const numStr = String(num);
      
      // 计算各位数字的n次方和
      for (let i = 0; i < n; i++) {
        sum += Math.pow(parseInt(numStr.substring(i, i + 1)), n);
      }
      
      // 判断是否为水仙花数
      return sum === num;
    }
    
    

## C++

    
    
    #include <iostream>
    #include <vector>
    #include <cmath>
    using namespace std;
    
    bool isNarcissusNumber(int num, int n) {
        int sum = 0;
        string numStr = to_string(num);
        
        for (int i = 0; i < n; i++) {
            sum += pow(stoi(numStr.substr(i, 1)), n);
        }
        
        return sum == num;
    }
    
    int main() {
        int n, m;
        cin >> n >> m;
        
        if (n < 3 || n > 7) {
            cout << "-1" << endl;
            return 0;
        }
        
        int start = pow(10, n - 1);
        int end = pow(10, n);
        
        vector<int> narcissusList;
        
        for (int i = start; i < end; i++) {
            if (isNarcissusNumber(i, n)) {
                narcissusList.push_back(i);
            }
        }
        
        int size = narcissusList.size();
        
        if (size == 0) {
            cout << "-1" << endl;
            return 0;
        }
        
        cout << (m >= size ? m * narcissusList[size - 1] : narcissusList[m]) << endl;
        
        return 0;
    }
    

## C语言

    
    
    #include <stdio.h>
    #include <math.h>
    #include <stdlib.h>
    
    // 判断一个数是否为水仙花数的函数声明
    int isNarcissusNumber(int num, int n);
    
    int main() {
        int n, m;
        
        // 输入n和m
        if (scanf("%d %d", &n, &m) != 2) {
            printf("-1\n");
            return -1;
        }
    
        // 判断输入是否合法，n必须在3到7之间
        if (n < 3 || n > 7) {
            printf("-1\n");
            return -1;
        }
        
        // 计算n位数的范围
        int start = pow(10, n - 1); // n位数的起始值，例如3位数从100开始
        int end = pow(10, n);       // n位数的结束值，例如3位数到999结束
    
        // 存储水仙花数的数组，最大长度为end - start
        int narcissusList[end - start];
        int count = 0; // 用于记录找到的水仙花数数量
    
        // 遍历范围内的数，判断是否为水仙花数
        for (int i = start; i < end; i++) {
            if (isNarcissusNumber(i, n)) {
                narcissusList[count++] = i; // 将水仙花数加入数组
            }
        }
    
        // 若没有找到任何水仙花数，输出-1
        if (count == 0) {
            printf("-1\n");
            return 0;
        }
    
        // 判断m的值是否超出找到的水仙花数的数量
        if (m >= count) {
            // m大于或等于水仙花数的数量时，返回最后一个水仙花数乘以m
            printf("%ld\n", narcissusList[count - 1] * m);
        } else {
            // 否则，返回第m个水仙花数
            printf("%ld\n", narcissusList[m]);
        }
    
        return 0;
    }
    
    // 判断一个数是否为水仙花数
    int isNarcissusNumber(int num, int n) {
        int sum = 0;          // 用于存储各位数字的n次方和
        int original_num = num; // 保留原始数值用于最后比较
    
        // 逐位提取数字并计算n次方和
        while (num > 0) {
            int digit = num % 10;           // 获取当前数的最后一位数字
            sum += pow(digit, n);           // 计算该数字的n次方并加到总和中
            num /= 10;                      // 移除最后一位数字，继续处理剩下的数字
        }
    
        // 若n次方和等于原始数值，则该数为水仙花数
        return sum == original_num;
    }
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b0d8ff6d53693bfcf6e1605b507f3ae3.png)

#### 完整用例

##### 用例1

3  
0

##### 用例2

4  
1

##### 用例3

5  
2

##### 用例4

3  
10

##### 用例5

4  
5

##### 用例6

5  
0

##### 用例7

4  
2

##### 用例8

4  
7

##### 用例9

4  
4

##### 用例10

5  
10

