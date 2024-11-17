### 题目

外卖员每天在大厦中送外卖，大厦共有L层（0<L<=10^5），当他处于第N层楼时，可以每分钟通过步行梯向上达到N+1层，或向下达到N-1层，或者乘坐[电梯](https://so.csdn.net/so/search?q=%E7%94%B5%E6%A2%AF&spm=1001.2101.3001.7020)达到2*N层。给定他所处位置N，以及外卖配送的目的楼层M，计算他送达的最短时间。

### 输入描述

当前所处楼层N和外卖配送的目的楼层M

### 输出描述

送达的最短时间

### 用例1：

输入

    
    
     5 17
    

输出

    
    
     4
    

**说明：**

当前处于5层，目标楼层17层，最快的方式是

步行下一层 - 4层

电梯 - 8层

电梯 - 16层

步行上一层 - 17层

共需要4分钟。

### 思路

1：一个比较简单的[动态规划](https://so.csdn.net/so/search?q=%E5%8A%A8%E6%80%81%E8%A7%84%E5%88%92&spm=1001.2101.3001.7020)问题。dp[i]表示到达i层需要的最短时间。

2:初始化的时候，到N层以下需要的时间，都减去相应的楼层，即步行向下

    
    
    for (int i = 0; i <= N; i++) {  
        dp[i] = N - i;
    }
    

2：转移方程：

偶数层：dp[i] = min(dp[i - 1] + 1, dp[i / 2] + 1)  
奇数层：dp[i] = min(dp[i - 1] + 1, dp[(i + 1) / 2] + 2)

### C++

    
    
    #include <iostream>
    #include <algorithm>
    using namespace std;
    
    int main() {
        int currentFloor, targetFloor;
        cin >> currentFloor >> targetFloor;
        if (currentFloor >= targetFloor) {  // 特判无需移动的情况
            cout << 0 << endl;
            return 0;
        }
        int dp[targetFloor + 1];  // dp[i]表示到达第i层的最短时间
        fill(dp, dp + targetFloor + 1, 0);  // 初始值为0
        for (int i = 0; i <= currentFloor; i++) {  // 初始化到N层以下需要的时间
            dp[i] = currentFloor - i;
        }
        for (int i = currentFloor + 1; i <= targetFloor; i++) {  // 计算从N层到M层的最短时间
            if (i % 2 == 0) {  // 偶数层可以直接到2*i，时间加1
                dp[i] = min(dp[i - 1] + 1, dp[i / 2] + 1);
            } else { // 奇数层需要先上或者先下，再到2*(i+1)，时间加2
                dp[i] = min(dp[i - 1] + 1, dp[(i + 1) / 2] + 2);
            }
        }
        cout << dp[targetFloor] << endl;  // 输出到达目标楼层的最短时间
        return 0;
    }
    
    

#### 文章目录

  *     * 题目
    * 输入描述
    * 输出描述
    * 用例1：
    * 思路
    * C++

![fengmian](https://img-
blog.csdnimg.cn/img_convert/1d2f33ed8cf2fb1b9a4fe09513f7aa94.png)

