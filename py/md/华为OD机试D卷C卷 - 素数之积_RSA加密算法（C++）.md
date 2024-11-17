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
  
## 解题思路

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
    
    
    

#### 文章目录

  * 题目描述
  * 输入描述
  * 输出描述
  * 用例
  * 解题思路
  * C++

  
![fengmian](https://i-blog.csdnimg.cn/blog_migrate/a31861be2daad823a208a03c0c9884b2.png)

