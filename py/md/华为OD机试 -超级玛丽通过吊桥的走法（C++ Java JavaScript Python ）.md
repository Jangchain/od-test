### 题目描述 超级玛丽通过吊桥的走法

超级玛丽好不容易来到新的一关，有一个长长的吊桥，吊桥的尽头是下水管道，其中随机的木板存在缺失，旦踩到就会死亡，**死亡后如果还有剩余的生命将在原地复活且不受木板缺失影响，但会消耗一次生命**
，如果跨过了管道，将跌入悬崖，通关失败。  
超级玛丽从起点 S 开始，可以走到下一个木板(计1) ，也可以跳着跨过一个块(计2)或两个木板(计3)，最终必须刚好走到终点 D。  
现在给定超级玛丽当前的生命数M ，吊桥的长度N ，缺失的木板数 K，以及随机缺失的木板编号数组L，请帮忙计算一下，超级玛丽有多少种方法可以通过此关。

### 输入描述：

第一行三个整数，超级玛丽当前生命数: M(1 <= M <= 5），吊桥的长度: N(1 <= N <= 32，整数)，缺失木板数: K(1 <= K <=
32，整数)  
第二行为缺失木板编号数组: L(长度及编号的内容不大于 N 的编号数组，1 <=Li<=N ，由空格分隔的整数数组)

### 输出描述：

输出通过此关的吊桥走法个数，如果不能通过此关，请输出0。

提示  
1.输入总是合法，忽略参数校验  
2.必须从起点开始走  
3.必须离开吊桥走到终点。

### 示例1：

输入：

2 2 1  
2

输出：

4

说明：

2 个生命，2 个木板，缺失 1 个木板，第 2 个木板有缺失，一共有 4 种走法  
-3  
-1 2  
-2 1  
-1 1(复活) 1

### 示例2：

输入：

1 3 2  
1 3

输出：

1

说明  
1个生命，3个木板，缺失2个木板，第1、3个木板有缺失。

只有1种走法，其他都不能通关。

### C++

    
    
    #include <iostream>
    #include <vector>
    #include <algorithm>
    #include <cmath>
    using namespace std;
    
    int main() {
        int lifeCount, bridgeLength, missingCount;
        cin >> lifeCount >> bridgeLength >> missingCount;
    
        vector<int> missingPlanks(64, 0);
        for (int i = 0; i < missingCount; i++) {
            int missingIndex;
            cin >> missingIndex;
            missingPlanks[missingIndex] = 1;
        }
    
        vector<vector<int>> dp(64, vector<int>(64, 0));
        // 起始位置只有1种走法
        dp[0][lifeCount] = 1;
        int totalWays = 0;
        for (int i = 1; i <= bridgeLength + 1; i++) {
            for (int j = 1; j <= lifeCount; j++) {
                dp[i][j] += dp[i - 1][j + missingPlanks[i]];
                if (i - 2 >= 0) {
                    dp[i][j] += dp[i - 2][j + missingPlanks[i]];
                }
                if (i - 3 >= 0) {
                    dp[i][j] += dp[i - 3][j + missingPlanks[i]];
                }
                if (i == bridgeLength + 1) {
                    totalWays += dp[i][j];
                }
            }
        }
        cout << totalWays << endl;
        return 0;
        return 0;
    }
    

### java

    
    
    import java.util.*;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            int lifeCount = scanner.nextInt();
            int bridgeLength = scanner.nextInt();
            int missingCount = scanner.nextInt();
    
            int[] missingPlanks = new int[64];
            for (int i = 0; i < missingCount; i++) {
                int missingIndex = scanner.nextInt();
                missingPlanks[missingIndex] = 1;
            }
    
            int[][] dp = new int[64][64];
            // 起始位置只有1种走法
            dp[0][lifeCount] = 1;
            int totalWays = 0;
            for (int i = 1; i <= bridgeLength + 1; i++) {
                for (int j = 1; j <= lifeCount; j++) {
                    dp[i][j] += dp[i - 1][j + missingPlanks[i]];
                    if (i - 2 >= 0) {
                        dp[i][j] += dp[i - 2][j + missingPlanks[i]];
                    }
                    if (i - 3 >= 0) {
                        dp[i][j] += dp[i - 3][j + missingPlanks[i]];
                    }
                    if (i == bridgeLength + 1) {
                        totalWays += dp[i][j];
                    }
                }
            }
            System.out.println(totalWays);
        }
    }
    
    

### javaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    let lifeCount, bridgeLength, missingCount;
    
    rl.on('line', (input) => {
      if (!lifeCount) {
        const inputArr = input.split(' ');
        lifeCount = parseInt(inputArr[0]);
        bridgeLength = parseInt(inputArr[1]);
        missingCount = parseInt(inputArr[2]);
        return;
      }
    
      const missingPlanks = Array.from({ length: 64 }, () => 0);
      const missingIndexArr = input.split(' ');
      for (let i = 0; i < missingCount; i++) {
        const missingIndex = parseInt(missingIndexArr[i]);
        missingPlanks[missingIndex] = 1;
      }
    
      const dp = Array.from({ length: 64 }, () => Array.from({ length: 64 }, () => 0));
      dp[0][lifeCount] = 1;
      let totalWays = 0;
      for (let i = 1; i <= bridgeLength + 1; i++) {
        for (let j = 1; j <= lifeCount; j++) {
          dp[i][j] += dp[i - 1][j + missingPlanks[i]];
          if (i - 2 >= 0) {
            dp[i][j] += dp[i - 2][j + missingPlanks[i]];
          }
          if (i - 3 >= 0) {
            dp[i][j] += dp[i - 3][j + missingPlanks[i]];
          }
          if (i === bridgeLength + 1) {
            totalWays += dp[i][j];
          }
        }
      }
      console.log(totalWays);
      rl.close();
    });
    

### python

    
    
    lifeCount, bridgeLength, missingCount = map(int, input().split())
    
    missingPlanks = [0] * 64
    for i in range(missingCount):
        missingIndex = int(input())
        missingPlanks[missingIndex] = 1
    
    dp = [[0] * 64 for _ in range(64)]
    dp[0][lifeCount] = 1
    totalWays = 0
    for i in range(1, bridgeLength + 2):
        for j in range(1, lifeCount + 1):
            dp[i][j] += dp[i - 1][j + missingPlanks[i]]
            if i - 2 >= 0:
                dp[i][j] += dp[i - 2][j + missingPlanks[i]]
            if i - 3 >= 0:
                dp[i][j] += dp[i - 3][j + missingPlanks[i]]
            if i == bridgeLength + 1:
                totalWays += dp[i][j]
    
    print(totalWays)
    

#### 文章目录

  *     * 题目描述 超级玛丽通过吊桥的走法
    * 输入描述：
    * 输出描述：
    * 示例1：
    * 示例2：
    * C++
    * java
    * javaScript
    * python

![fengmian](https://img-
blog.csdnimg.cn/img_convert/1d2f33ed8cf2fb1b9a4fe09513f7aa94.png)

