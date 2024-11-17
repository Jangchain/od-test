## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

有N（3 ≤ N <
10000）个运动员，他们的id为0到N-1,他们的实力由一组[整数表示](https://so.csdn.net/so/search?q=%E6%95%B4%E6%95%B0%E8%A1%A8%E7%A4%BA&spm=1001.2101.3001.7020)。他们之间进行比赛，需要决出冠亚军。比赛的规则是0号和1号比赛，2号和3号比赛，以此类推，每一轮，相邻的运动员进行比赛，获胜的进入下一轮；实力值大的获胜，实力值相等的情况，id小的情况下获胜；轮空的直接进入下一轮。

## 输入描述

输入一行N个数字代表N的运动员的实力值(0<=实力值<=10000000000)。

## 输出描述

输出冠亚季军的id，用空格隔开。

## 示例1

输入

    
    
    2 3 4 5
    

输出

    
    
    3 1 2
    

说明

> 第一轮比赛，
>
> id为0实力值为2的运动员和id为1实力值为3的运动员比赛，1号胜出进入下一轮争夺冠亚军，
>
> id为2的运动员和id为3的运动员比赛，3号胜出进入下一轮争夺冠亚军，
>
> 冠亚军比赛，3号胜1号，
>
> 故冠军为3号，亚军为1号，2号与0号，比赛进行季军的争夺，2号实力值为4，0号实力值2，故2号胜出，得季军。冠亚季军为3 1 2。

## 解题思路

给定一组整数代表运动员的实力值，运动员的ID为0到N-1。通过一系列比赛来决定最终的冠亚季军。比赛规则如下：

  1. 运动员按顺序两两比赛，获胜者进入下一轮。如果两个运动员的实力值相同，ID较小者获胜。
  2. 比赛持续进行，直到决出冠军和亚军。
  3. 其中轮空的运动员直接进入下一轮。
  4. 决出冠军和亚军后，剩下的运动员进行比赛决出季军。

**示例解释** ：  
对于输入`2 3 4 5`：

  * 第一轮比赛： 
    * ID为0和1的运动员比赛，1号实力值为3，胜出。
    * ID为2和3的运动员比赛，3号实力值为5，胜出。
  * 第二轮比赛（决出冠军和亚军）： 
    * ID为1和3的运动员比赛，3号胜出，成为冠军，1号为亚军。
  * 季军争夺战： 
    * 剩下的ID为0和2的运动员比赛，2号胜出，成为季军。

**最终输出** 为`3 1 2`，代表冠军是ID 3，亚军是ID 1，季军是ID 2。

## Java

    
    
    import java.util.ArrayList;
    import java.util.Arrays;
    import java.util.Scanner;
    
    public class Main {
    
        public static void main(String[] args) {
            Scanner sc = new Scanner(System.in);
            
            // 输入运动员的实力值
            long[] strengths = Arrays.stream(sc.nextLine().split(" ")).mapToLong(Long::parseLong).toArray();
            
            ArrayList<Integer> players = new ArrayList<>(); // 保存当前轮次的选手ID
            for (int i = 0; i < strengths.length; i++) {
                players.add(i);
            }
            
            // 进行循环比赛，直到剩余两个选手
            ArrayList<Integer> losers = new ArrayList<>(); // 存储每轮的失败者
            while (players.size() > 2) {
                ArrayList<Integer> winners = new ArrayList<>();
                losers.clear();
                
                // 每一轮比赛
                for (int i = 0; i < players.size() - 1; i += 2) {
                    int p1 = players.get(i);
                    int p2 = players.get(i + 1);
                    
                    if (strengths[p1] > strengths[p2] || (strengths[p1] == strengths[p2] && p1 < p2)) {
                        winners.add(p1);
                        losers.add(p2);
                    } else {
                        winners.add(p2);
                        losers.add(p1);
                    }
                }
                
                // 如果有轮空的选手，直接进入下一轮
                if (players.size() % 2 != 0) {
                    winners.add(players.get(players.size() - 1));
                }
                
                players = winners; // 更新为下一轮的选手
            }
            
            // 冠军和亚军
            int first, second;
            if (strengths[players.get(0)] > strengths[players.get(1)] || 
                (strengths[players.get(0)] == strengths[players.get(1)] && players.get(0) < players.get(1))) {
                first = players.get(0);
                second = players.get(1);
            } else {
                first = players.get(1);
                second = players.get(0);
            }
            
            // 从最后一轮的失败者中找到季军
            int third = losers.get(0);
            for (int i = 1; i < losers.size(); i++) {
                int candidate = losers.get(i);
                if (strengths[candidate] > strengths[third] || 
                    (strengths[candidate] == strengths[third] && candidate < third)) {
                    third = candidate;
                }
            }
            
            // 输出冠亚季军ID
            System.out.println(first + " " + second + " " + third);
        }
    }
    

## Python

    
    
    # 导入模块
    import sys
    
    # 获取输入，读取运动员的实力值并将其转为整数列表
    strengths = list(map(int, input().split()))
    
    # 初始化选手ID列表
    players = list(range(len(strengths)))  # 从0到n-1依次赋给每位运动员
    
    # 存储每轮比赛中的失败者
    losers = []
    
    # 进行循环比赛，直到剩余两个选手
    while len(players) > 2:
        winners = []  # 存储获胜者
        losers.clear()  # 清空上一轮的失败者
        
        # 每一轮比赛
        for i in range(0, len(players) - 1, 2):
            p1 = players[i]
            p2 = players[i + 1]
            
            # 比较实力值，决定获胜者和失败者
            if strengths[p1] > strengths[p2] or (strengths[p1] == strengths[p2] and p1 < p2):
                winners.append(p1)
                losers.append(p2)
            else:
                winners.append(p2)
                losers.append(p1)
        
        # 如果选手数为奇数，将最后一个选手直接晋级
        if len(players) % 2 != 0:
            winners.append(players[-1])
        
        # 更新当前轮次的选手为获胜者
        players = winners
    
    # 比较剩下两个选手，确定冠军和亚军
    if strengths[players[0]] > strengths[players[1]] or (strengths[players[0]] == strengths[players[1]] and players[0] < players[1]):
        first, second = players[0], players[1]
    else:
        first, second = players[1], players[0]
    
    # 从失败者中选出实力最高的为季军
    third = losers[0]
    for candidate in losers[1:]:
        if strengths[candidate] > strengths[third] or (strengths[candidate] == strengths[third] and candidate < third):
            third = candidate
    
    # 输出冠亚季军ID
    print(first, second, third)
    

## JavaScript

    
    
    // 从控制台读取输入
    const readline = require("readline");
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.on("line", function(line) {
      // 将输入的实力值转为整数数组
      const strengths = line.split(" ").map(Number);
    
      // 初始化选手ID
      let players = Array.from({ length: strengths.length }, (_, i) => i);
    
      // 存储失败者
      let losers = [];
    
      // 进行循环比赛，直到剩余两个选手
      while (players.length > 2) {
        let winners = [];
        losers = [];
    
        // 每一轮比赛
        for (let i = 0; i < players.length - 1; i += 2) {
          const p1 = players[i];
          const p2 = players[i + 1];
    
          // 比较实力值决定获胜者和失败者
          if (strengths[p1] > strengths[p2] || (strengths[p1] === strengths[p2] && p1 < p2)) {
            winners.push(p1);
            losers.push(p2);
          } else {
            winners.push(p2);
            losers.push(p1);
          }
        }
    
        // 如果选手数为奇数，将最后一个选手直接晋级
        if (players.length % 2 !== 0) {
          winners.push(players[players.length - 1]);
        }
    
        // 更新当前轮次的选手为获胜者
        players = winners;
      }
    
      // 比较剩下两个选手，确定冠军和亚军
      const [first, second] = strengths[players[0]] > strengths[players[1]] || 
                             (strengths[players[0]] === strengths[players[1]] && players[0] < players[1]) 
                             ? [players[0], players[1]] : [players[1], players[0]];
    
      // 从失败者中选出实力最高的为季军
      let third = losers[0];
      for (let candidate of losers.slice(1)) {
        if (strengths[candidate] > strengths[third] || 
           (strengths[candidate] === strengths[third] && candidate < third)) {
          third = candidate;
        }
      }
    
      // 输出冠亚季军ID
      console.log(first, second, third);
      rl.close();
    });
    

## C++

    
    
    #include <iostream>
    #include <vector>
    #include <algorithm>
    using namespace std;
    
    int main() {
        // 输入运动员的实力值
        vector<long> strengths;
        long input;
        while (cin >> input) {
            strengths.push_back(input);
        }
    
        // 初始化选手ID
        vector<int> players(strengths.size());
        for (int i = 0; i < strengths.size(); i++) {
            players[i] = i;
        }
    
        // 存储每轮比赛中的失败者
        vector<int> losers;
    
        // 循环比赛直到剩余两个选手
        while (players.size() > 2) {
            vector<int> winners;
            losers.clear();
    
            // 每一轮比赛
            for (size_t i = 0; i + 1 < players.size(); i += 2) {
                int p1 = players[i];
                int p2 = players[i + 1];
    
                if (strengths[p1] > strengths[p2] || (strengths[p1] == strengths[p2] && p1 < p2)) {
                    winners.push_back(p1);
                    losers.push_back(p2);
                } else {
                    winners.push_back(p2);
                    losers.push_back(p1);
                }
            }
    
            // 奇数选手时最后一个直接晋级
            if (players.size() % 2 != 0) {
                winners.push_back(players.back());
            }
    
            players = winners;
        }
    
        // 确定冠亚军
        int first, second;
        if (strengths[players[0]] > strengths[players[1]] || 
            (strengths[players[0]] == strengths[players[1]] && players[0] < players[1])) {
            first = players[0];
            second = players[1];
        } else {
            first = players[1];
            second = players[0];
        }
    
        // 找出失败者中的季军
        int third = losers[0];
        for (size_t i = 1; i < losers.size(); i++) {
            int candidate = losers[i];
            if (strengths[candidate] > strengths[third] || 
                (strengths[candidate] == strengths[third] && candidate < third)) {
                third = candidate;
            }
        }
    
        // 输出冠亚季军ID
        cout << first << " " << second << " " << third << endl;
        return 0;
    }
    

## C语言

    
    
    #include <stdio.h>
    
    int main() {
        // 读取实力值
        long strengths[100];
        int count = 0;
        while (scanf("%ld", &strengths[count]) != EOF) {
            count++;
        }
    
        // 初始化选手ID
        int players[100], playersCount = count;
        for (int i = 0; i < playersCount; i++) {
            players[i] = i;
        }
    
        int losers[100], losersCount;
    
        // 进行循环比赛
        while (playersCount > 2) {
            int winners[100], winnersCount = 0;
            losersCount = 0;
    
            for (int i = 0; i < playersCount - 1; i += 2) {
                int p1 = players[i];
                int p2 = players[i + 1];
    
                if (strengths[p1] > strengths[p2] || (strengths[p1] == strengths[p2] && p1 < p2)) {
                    winners[winnersCount++] = p1;
                    losers[losersCount++] = p2;
                } else {
                    winners[winnersCount++] = p2;
                    losers[losersCount++] = p1;
                }
            }
    
            if (playersCount % 2 != 0) {
                winners[winnersCount++] = players[playersCount - 1];
            }
    
            playersCount = winnersCount;
            for (int i = 0; i < playersCount; i++) {
                players[i] = winners[i];
            }
        }
    
        // 确定冠亚军
        int first, second;
        if (strengths[players[0]] > strengths[players[1]] || 
            (strengths[players[0]] == strengths[players[1]] && players[0] < players[1])) {
            first = players[0];
            second = players[1];
        } else {
            first = players[1];
            second = players[0];
        }
    
        // 找出季军
        int third = losers[0];
        for (int i = 1; i < losersCount; i++) {
            int candidate = losers[i];
            if (strengths[candidate] > strengths[third] || 
                (strengths[candidate] == strengths[third] && candidate < third)) {
                third = candidate;
            }
        }
    
        // 输出结果
        printf
    ("%d %d %d\n", first, second, third);
        return 0;
    }
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/8b1dd059b8ac86e5b3729bf1fc82a43a.png)

#### 完整用例

##### 用例1

5 5 5 5

##### 用例2

1 2 3 4

##### 用例3

4 3 2 1

##### 用例4

1 3 2 4

##### 用例5

1 2 3 4 5

##### 用例6

1 2 3 4 5 6 7 8

##### 用例7

1 1 2 2 3 3

##### 用例8

1 1 1 10

##### 用例9

1 1 1 1 1 10

##### 用例10

10000000000 1 2 3 4 5

