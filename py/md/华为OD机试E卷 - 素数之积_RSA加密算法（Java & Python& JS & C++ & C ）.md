## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

RSA加密算法在网络安全世界中无处不在，它利用了极大整数因数分解的困难度，数据越大，安全系数越高，给定一个32位正整数，请对其进行因数分解，找出是哪两个素数的乘积。

## 输入描述

一个正整数num，0 < num <= 2147483647

## 输出描述

如果成功找到，以单个空格分割，从小到大输出两个素数，分解失败，请输出-1, -1

## 用例

输入| 15  
---|---  
输出| 3 5  
输入| 27  
---|---  
输出| -1 -1  
  
## C++

    
    
    #include <iostream>
    #include <cmath>
    
    // 函数：检查一个数是否为素数
    bool isPrime(int num) {
        if (num <= 3) {
            return num > 1;
        }
        if (num % 6 != 1 && num % 6 != 5) {
            return false;
        }
        for (int i = 5; i <= sqrt(num); i += 6) {
            if (num % i == 0 || num % (i + 2) == 0) {
                return false;
            }
        }
        return true;
    }
    
    int main() {
        int num;
        std::cin >> num; // 读取输入
    
        // 如果数字本身就是素数，那么它不能被分解
        if (isPrime(num)) {
            std::cout << "-1 -1" << std::endl;
            return 0;
        }
    
        // 分解数字
        for (int i = 2; i <= sqrt(num); i++) {
            if (num % i == 0) {
                int j = num / i;
                // 检查 i 和 j 是否都是素数
                if (isPrime(i) && isPrime(j)) {
                    std::cout << (i < j ? std::to_string(i) + " " + std::to_string(j) : std::to_string(j) + " " + std::to_string(i)) << std::endl;
                    return 0;
                }
            }
        }
        std::cout << "-1 -1" << std::endl;
        return 0;
    }
    
    
    

## Java

    
    
    import java.util.Scanner;
    
    public class Main {
        public static boolean isPrime(int num) {
            if (num <= 3) {
                return num > 1;
            }
            if (num % 6 != 1 && num % 6 != 5) {
                return false;
            }
            for (int i = 5; i <= Math.sqrt(num); i += 6) {
                if (num % i == 0 || num % (i + 2) == 0) {
                    return false;
                }
            }
            return true;
        }
    
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            int num = scanner.nextInt();
            // 如果输入的数本身就是素数，无法进行因数分解
            if (isPrime(num)) {
                System.out.println("-1 -1");
                return;
            }
            // 因数分解
            for (int i = 2; i <= Math.sqrt(num); i++) {
                if (num % i == 0) {
                    int j = num / i;
                    // 判断 i 和 j 是否都是素数
                    if (isPrime(i) && isPrime(j)) {
                        System.out.println(i < j ? i + " " + j : j + " " + i);
                        return;
                    }
                }
            }
            System.out.println("-1 -1");
        }
    }
    
    
    

## javaScript

    
    
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    // 函数：检查一个数是否为素数
    function isPrime(num) {
      if (num <= 3) {
        return num > 1;
      }
      if (num % 6 != 1 && num % 6 != 5) {
        return false;
      }
      for (let i = 5; i <= Math.sqrt(num); i += 6) {
        if (num % i == 0 || num % (i + 2) == 0) {
          return false;
        }
      }
      return true;
    }
    
    readline.on('line', num => {
      num = parseInt(num);
      // 如果数字本身就是素数，那么它不能被分解
      if (isPrime(num)) {
        console.log("-1 -1");
        readline.close();
        return;
      }
    
      // 分解数字
      for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i == 0) {
          let j = num / i;
          // 检查 i 和 j 是否都是素数
          if (isPrime(i) && isPrime(j)) {
            console.log(i < j ? i + " " + j : j + " " + i);
            readline.close();
            return;
          }
        }
      }
      console.log("-1 -1");
      readline.close();
    });
    
    
    

## Python

    
    
    import math
    
    # 函数：检查一个数是否为素数
    def is_prime(num):
        if num <= 3:
            return num > 1
        if num % 6 != 1 and num % 6 != 5:
            return False
        for i in range(5, int(math.sqrt(num)) + 1, 6):
            if num % i == 0 or num % (i + 2) == 0:
                return False
        return True
    
    num = int(input())
    
    # 如果数字本身就是素数，那么它不能被分解
    if is_prime(num):
        print("-1 -1")
    else:
        # 分解数字
        for i in range(2, int(math.sqrt(num)) + 1):
            if num % i == 0:
                j = num // i
                # 检查 i 和 j 是否都是素数
                if is_prime(i) and is_prime(j):
                    print(f"{min(i, j)} {max(i, j)}")
                    break
        else:
            print("-1 -1")
    
    
    

## C语言

    
    
    #include <stdio.h>
    #include <math.h>
    
    // 函数：检查一个数是否为素数
    int isPrime(int num) {
        if (num <= 3) {
            return num > 1;
        }
        if (num % 6 != 1 && num % 6 != 5) {
            return 0;
        }
        for (int i = 5; i <= sqrt(num); i += 6) {
            if (num % i == 0 || num % (i + 2) == 0) {
                return 0;
            }
        }
        return 1;
    }
    
    int main() {
        int num;
        scanf("%d", &num); // 读取输入
    
        // 如果数字本身就是素数，那么它不能被分解
        if (isPrime(num)) {
            printf("-1 -1\n");
            return 0;
        }
    
        // 分解数字
        for (int i = 2; i <= sqrt(num); i++) {
            if (num % i == 0) {
                int j = num / i;
                // 检查 i 和 j 是否都是素数
                if (isPrime(i) && isPrime(j)) {
                    printf("%d %d\n", i < j ? i : j, i < j ? j : i);
                    return 0;
                }
            }
        }
        printf("-1 -1\n");
        return 0;
    }
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/60e2fa8d7180820413a39fea12c49e4f.png)

## 完整用例

### 用例1

13

### 用例2

49

### 用例3

77

### 用例4

35

### 用例5

1

### 用例6

2147483647

### 用例7

4

### 用例8

2999

### 用例9

38

### 用例10

589

