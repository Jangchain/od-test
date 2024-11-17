## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

某云短信厂商，为庆祝国庆，推出充值优惠活动。  
现在给出客户预算，和优惠售价序列，求最多可获得的短信总条数。

## 输入描述

第一行客户预算M，其中 0 ≤ M ≤ 10^6

第二行给出售价表， P1, P2, … Pn , 其中 1 ≤ n ≤ 100 ,

Pi为充值 i 元获得的短信条数。1 ≤ Pi ≤ 1000 , 1 ≤ n ≤ 100

## 输出描述

最多获得的短信条数

## 示例1

输入

    
    
    6
    10 20 30 40 60
    

输出

    
    
    70
    

说明

> 分两次充值最优， 1 元、 5 元各充一次。总条数 10 + 60 = 70

## 示例2

输入

    
    
    15
    10 20 30 40 60 60 70 80 90 150  
    

输出

    
    
    210
    

说明

> 分两次充值最优， 10 元 5 元各充一次，总条数 150 + 60 = 210

## 解题思路

本题是完全背包问题。

  * 客户预算M相当于背包的承重，
  * 出售价表：

  1. i 元相当于物品的重量，
  2. Pi 短信条数相当于物品的价值

## Java

    
    
    import java.util.*;
    
    public class Main {
        public static void main(String[] args) {
            // 处理输入
            Scanner in = new Scanner(System.in);
            int money = Integer.parseInt(in.nextLine());
            int[] topupInfo = Arrays.stream(in.nextLine().split(" "))
                    .mapToInt(Integer::parseInt)
                    .toArray();
    
            int[] dp = new int[money + 1];
    
            for (int i = 0; i < topupInfo.length; i++) {
                for (int j = i + 1; j <= money; j++) {
                    dp[j] = Math.max(dp[j], dp[j - (i + 1)] + topupInfo[i]);
                }
            }
            System.out.println(dp[money]);
        }
    }
    
    
    

## Python

    
    
    def main():
        # 处理输入
        money = int(input())
        topup_info = list(map(int, input().split()))
    
        dp = [0] * (money + 1)
    
        for i in range(len(topup_info)):
            for j in range(i + 1, money + 1):
                dp[j] = max(dp[j], dp[j - (i + 1)] + topup_info[i])
    
        print(dp[money])
    
    if __name__ == "__main__":
        main()
    
    
    

## JavaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.on('line', (line) => {
      const inputs = line.split(' ');
      if (inputs.length === 1) {
        const money = parseInt(inputs[0]);
        rl.on('line', (line) => {
          const topupInfo = line.split(' ').map(Number);
          const dp = new Array(money + 1).fill(0);
    
          for (let i = 0; i < topupInfo.length; i++) {
            for (let j = i + 1; j <= money; j++) {
              dp[j] = Math.max(dp[j], dp[j - (i + 1)] + topupInfo[i]);
            }
          }
          console.log(dp[money]);
          rl.close();
        });
      }
    });
    
    
    

## C++

    
    
    #include <iostream>
    #include <vector>
    #include <string>
    #include <sstream>
    #include <algorithm>
    
    using namespace std;
    int main() {
        // 处理输入
        int money;
        cin >> money;
        cin.ignore();
    
        string line;
        getline(cin, line);
        istringstream iss(line);
        vector<int> topup_info;
        int value;
    
        while (iss >> value) {
            topup_info.push_back(value);
        }
    
        vector<int> dp(money + 1, 0);
    
        for (size_t i = 0; i < topup_info.size(); i++) {
            for (int j = static_cast<int>(i) + 1; j <= money; j++) {
                dp[j] = max(dp[j], dp[j - (i + 1)] + topup_info[i]);
            }
        }
        cout << dp[money] << endl;
    
        return 0;
    }
    
    
    

## C语言

    
    
    #include <stdio.h>
    #include <string.h>
    #include <stdlib.h>
    
     
    int main() {
        int money;
      
        scanf("%d", &money);
    
        // 定义售价表数组，并读取售价表
        int topupInfo[100];
        int n = 0;
        while (scanf("%d", &topupInfo[n]) != EOF) {
            n++;
        }
     
        int dp[1001] = {0};
    
        // 遍历每一个充值选项
        for (int i = 0; i < n; i++) {
            // 从当前预算开始，向后更新 dp 数组
            for (int j = i + 1; j <= money; j++) {
                // 更新 dp[j] 为在充值 i+1 元的情况下获得的最大短信数
                dp[j] = dp[j] > dp[j - (i + 1)] + topupInfo[i] ? dp[j] : dp[j - (i + 1)] + topupInfo[i];
            }
        }
    
        // 输出在预算 money 下最多可获得的短信条数
        printf("%d\n", dp[money]);
    
        return 0;
    }
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/f57c27755c29cca21a54ab099faf8694.png)

