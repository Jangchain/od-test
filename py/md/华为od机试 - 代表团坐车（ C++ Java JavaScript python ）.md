#### 题目描述:代表团坐车

某组织举行会议，来了多个代表团同时到达，接待处只有一辆汽车，可以同时接待多个代表团，为了提高车辆利用率，请帮接待员计算可以坐满车的接待方案，输出方案数量。

约束:

  1. 一个团只能上一辆车，并且代表团人数 (代表团数量小于30，每个代表团人数小于30)小于汽车容量(汽车容量小于100)
  2. 需要将车辆坐满

#### 输入描述

第一行 代表团人数，英文逗号隔开，代表团数量小于30，每个代表团人数小于30  
第二行 汽车载客量，汽车容量小于100

#### 输出描述

坐满汽车的方案数量  
如果无解输出0

##### ACM输入输出模式

如果你经常使用**Leetcode** ,会知道**letcode** 是不需要编写输入输出函数的。但是华为OD机考使用的是 **ACM 模式**
，需要手动编写输入和输出。

所以最好在牛-
客上提前熟悉这种模式。例如C++使用`cin/cout`,python使用`input()/print()`。JavaScript使用node的`readline()`和`console.log()`。Java
使用`sacnner/system.out.print()`

#### 用例

输入

    
    
    5,4,2,3,2,4,9
    10
    

输出

    
    
    4
    

说明

> 解释 以下几种方式都可以坐满车，所以，优先接待输出为4
>
> [2,3,5]
>
> [2,4,4]
>
> [2,3,5]
>
> [2,4,4]

#### 代码思路

首先，从输入中读取代表团人数，并将其排序。然后，从输入中读取汽车的载客量。接下来，初始化一个动态规划数组dp，其中dp[i]表示载客量为i时的方案数。将dp[0]初始化为1，表示载客量为0时的方案数为1（即不接待任何代表团）。

然后，对代表团人数进行遍历。对于每个代表团人数group，计算group和capacity的差值diff。然后，从diff开始递减到0的循环中，更新dp[j
+ group]的值，表示加上接待当前代表团后的方案数。具体地，dp[j + group] += dp[j]，表示将接待当前代表团的方案数加到载客量为j +
group的方案数上。们需要遍历所有代表团，将状态转移方程应用到每个代表团上，最终得到载客量为汽车载客量时的方案数。

#### 机考代码查重

华为OD机考完成之后，官方会进行代码查重。**华为 od 机考确实有很大的概率抽到原题**
。如果碰到了题库中的原题，一定不要直接使用题解中的代码，尤其是变量名，一定要修改，可以改成毫无意义的单词。除了变量名之外，代码的组织结构和逻辑一定要进行改变，这就要求在日常的刷题中，提前编写好属于自己的代码。

#### java

    
    
    import java.util.Arrays;
    import java.util.Scanner;
    
    public class Main {
      public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
    
        // 读取代表团人数
        int[] groups = Arrays.stream(sc.nextLine().split(","))
                            .mapToInt(Integer::parseInt)
                            .toArray();
    
        // 读取汽车载客量
        int capacity =  sc.nextInt();
    
        // 初始化动态规划数组，dp[i]表示载客量为i时的方案数
        int[] dp = new int[capacity + 1];
        dp[0] = 1; // 载客量为0时，方案数为1（不接待任何代表团）
    
        // 代表团人数排序
        Arrays.sort(groups);
    
        // 动态规划转移
        for (int group : groups) {
           int diff = capacity - group; // group和capacity的差值
          for (int j = diff; j >= 0; j--) {
            dp[j + group] += dp[j]; // 转移方程：dp[j + group] += dp[j]，表示加上接待当前代表团后的方案数
          }
        }
    
        // 输出结果
        System.out.println(dp[capacity]);
      }
    }
    

#### C++

    
    
    #include <iostream>
    #include <vector>
    #include <algorithm>
    using namespace std;
    
    int main() {
        // 读取代表团人数
        string input;
        getline(cin, input);
        vector<int> groups;
        size_t pos = 0;
        while ((pos = input.find(',')) != string::npos) {
            groups.push_back(stoi(input.substr(0, pos)));
            input.erase(0, pos + 1);
        }
        groups.push_back(stoi(input));
    
        // 读取汽车载客量
        int capacity;
        cin >> capacity;
    
        // 初始化动态规划数组，dp[i]表示载客量为i时的方案数
        vector<int> dp(capacity + 1, 0);
        dp[0] = 1; // 载客量为0时，方案数为1（不接待任何代表团）
    
        // 代表团人数排序
        sort(groups.begin(), groups.end());
    
        // 动态规划转移
        for (int group : groups) {
            int diff = capacity - group; // group和capacity的差值
            for (int j = diff; j >= 0; j--) {
                dp[j + group] += dp[j]; // 转移方程：dp[j + group] += dp[j]，表示加上接待当前代表团后的方案数
            }
        }
    
        // 输出结果
        cout << dp[capacity] << endl;
    
        return 0;
    }
    
    

#### javascript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.on('line', (line1) => {
      const groups = line1.split(',').map(Number);
    
      rl.on('line', (line2) => {
        const capacity = parseInt(line2);
    
        const dp = new Array(capacity + 1).fill(0);
        dp[0] = 1;
    
        groups.sort((a, b) => a - b);
    
        for (const group of groups) {
          const diff = capacity - group;
          for (let j = diff; j >= 0; j--) {
            dp[j + group] += dp[j];
          }
        }
    
        console.log(dp[capacity]);
    
        rl.close();
      });
    });
    

#### python

    
    
    # 读取代表团人数
    groups = list(map(int, input().split(",")))
    
    # 读取汽车载客量
    capacity = int(input())
    
    # 初始化动态规划数组，dp[i]表示载客量为i时的方案数
    dp = [0] * (capacity + 1)
    
    
    dp[0] = 1  # 载客量为0时，方案数为1（不接待任何代表团）
    
    # 代表团人数排序
    groups.sort()
    
    # 动态规划转移
    for group in groups:
        diff = capacity - group  # group和capacity的差值
        for j in range(diff, -1, -1):
            dp[j + group] += dp[j]  # 转移方程：dp[j + group] += dp[j]，表示加上接待当前代表团后的方案数
    
    # 输出结果
    print(dp[capacity])
    

> #### 文章目录
>
>   *     *       * 题目描述:代表团坐车
>       * 输入描述
>       * 输出描述
>       *         * ACM输入输出模式
>       * 用例
>       * 代码思路
>       * 机考代码查重
>       * java
>       * C++
>       * javascript
>       * python
>       * 完整用例
>       *         * 用例1
>         * 用例2
>         * 用例3
>         * 用例4
>         * 用例5
>         * 用例6
>         * 用例7
>         * 用例8
>         * 用例9
>         * 用例10
>

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

#### 完整用例

##### 用例1

5,4,2,3,2,4,9  
10

##### 用例2

1,1,1,1,1,1,1  
5

##### 用例3

10,10,10,10,10,10  
100

##### 用例4

2,3,4,5,6  
12

##### 用例5

1,2,3,4,5,6,7  
10

##### 用例6

10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10  
100

##### 用例7

5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5  
50

##### 用例8

1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29  
30

##### 用例9

5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100,105,110,115,120,125,130,135,140,145,150  
150

##### 用例10

2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30  
50

