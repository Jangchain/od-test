## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

M（1<=M<=20）辆车需要在一条不能超车的单行道到达终点，起点到终点的距离为N（1<=N<=400）。速度快的车追上前车后，只能以前车的速度继续行驶。求最后一车辆到达目的地花费的时间。

注：每辆车固定间隔一小时出发，比如第一辆车0时出发，第二辆车1时出发，以此类推

## 输入描述

第一行两个数字：M N分别代表车辆数和到终点的距离，以空格分隔。

接下来M行，每行1个数字S，代表每辆车的速度。0<S<30。

## 输出描述

最后一辆车到达目的地花费的时间

## 用例

输入

    
    
    2 11
    3
    2
    

输出

    
    
    5.5
    

## 解题思路

参考代码注释

## ！！！

请注意，本题的答案可能是小数。由于题目未指定保留小数点后几位，**我的代码就只根据用例1的格式四舍五入输出1位小数。**
实际考试中，请根据情况以及具体要求调整。

## C++

    
    
    #include <iostream>
    #include <vector>
    #include <algorithm>
    #include <iomanip> // 包含对输出格式控制的函数
    
    using namespace std;
    
    int main() {
        // 获取车辆数M和终点距离N
        int M, N;
        cin >> M >> N;
    
        // 获取每辆车的速度并存储在vector speeds中
        vector<int> speeds(M);
        for (int index = 0; index < M; index++) {
            cin >> speeds[index];
        }
    
        // 初始化arrivalTimes vector，其中存储第一辆车到达目的地的时间
        vector<double> arrivalTimes(M);
        arrivalTimes[0] = (double) N / speeds[0];
    
        // 对于剩余的车辆，循环计算每辆车到达目的地的时间
        // 如果当前车辆比前一辆车更晚到达或与前一辆车同时到达，则更新时间并添加到arrivalTimes
        for (int index = 1; index < M; index++) {
            // 计算第index辆车单独行驶到目的地的时间，即终点距离N除以车速speeds[index]
            // 由于车辆是依次出发的，所以还需要加上车辆的出发延迟时间index
            double estimatedTime = (double) N / speeds[index] + index;
    
            // 比较当前车辆计算出的到达时间estimatedTime和前一辆车的到达时间arrivalTimes[index - 1]
            // 使用max函数确保当前车辆的到达时间不会早于前一辆车
            double adjustedTime = max(estimatedTime, arrivalTimes[index - 1]);
            arrivalTimes[index] = adjustedTime;
        }
    
        // 输出最后一辆车到达目的地的时间，但减去M再加1（这是因为车辆从0开始计数，而时间是从1开始计数）
        cout << fixed << setprecision(1) << arrivalTimes[M - 1] - M + 1 << endl;
    
    
        return 0;
    }
    

## Java

    
    
    import java.util.*;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            String[] inputLine = scanner.nextLine().split(" ");
            // 获取车辆数M和终点距离N
            int M = Integer.parseInt(inputLine[0]);
            int N = Integer.parseInt(inputLine[1]);
    
            // 获取每辆车的速度并存储在数组speeds中
            int[] speeds = new int[M];
            for (int index = 0; index < M; index++) {
                speeds[index] = Integer.parseInt(scanner.nextLine());
            }
    
            // 初始化arrivalTimes数组，其中存储第一辆车到达目的地的时间
            double[] arrivalTimes = new double[M];
            arrivalTimes[0] = (double) N / speeds[0];
    
            // 对于剩余的车辆，循环计算每辆车到达目的地的时间
            // 如果当前车辆比前一辆车更晚到达或与前一辆车同时到达，则更新时间并添加到arrivalTimes
            for (int index = 1; index < M; index++) {
                double estimatedTime = (double) N / speeds[index] + index;
                double adjustedTime = Math.max(estimatedTime, arrivalTimes[index - 1]);
                arrivalTimes[index] = adjustedTime;
            }
    
            // 输出最后一辆车到达目的地的时间，但减去M再加1（这是因为车辆从0开始计数，而时间是从1开始计数）
            // 使用printf方法输出一位小数，四舍五入
            System.out.printf("%.1f\n", arrivalTimes[M - 1] - M + 1);
        }
    }
    

## javaScript

    
    
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    let lines = [];
    rl.on('line', (line) => {
      lines.push(line);
    }).on('close', () => {
      // 解析输入数据
      const [M, N] = lines[0].split(" ").map(Number);
      
      // 获取每辆车的速度并存储在数组speeds中
      const speeds = lines.slice(1, M + 1).map(Number);
    
      // 初始化arrivalTimes数组，其中存储第一辆车到达目的地的时间
      const arrivalTimes = new Array(M);
      arrivalTimes[0] = N / speeds[0];
    
      // 对于剩余的车辆，循环计算每辆车到达目的地的时间
      for (let index = 1; index < M; index++) {
        // 计算第index辆车单独行驶到目的地的时间
        const estimatedTime = N / speeds[index] + index;
    
        // 比较当前车辆计算出的到达时间和前一辆车的到达时间
        const adjustedTime = Math.max(estimatedTime, arrivalTimes[index - 1]);
        arrivalTimes[index] = adjustedTime;
      }
    
      // 输出最后一辆车到达目的地的时间，减去M再加1
      console.log((arrivalTimes[M - 1] - M + 1).toFixed(1));
    });
    

## Python

    
    
    # 导入必要的库
    import sys
    
    def main():
        # 读取输入：车辆数M和终点距离N
        M, N = map(int, input().split())
    
        # 获取每辆车的速度并存储在列表speeds中
        speeds = [int(input()) for _ in range(M)]
    
        # 初始化arrivalTimes列表，其中存储第一辆车到达目的地的时间
        arrivalTimes = [0] * M
        arrivalTimes[0] = N / speeds[0]
    
        # 对于剩余的车辆，计算每辆车到达目的地的时间
        for index in range(1, M):
            # 计算第index辆车单独行驶到目的地的时间
            estimatedTime = N / speeds[index] + index
    
            # 比较当前车辆计算出的到达时间和前一辆车的到达时间
            adjustedTime = max(estimatedTime, arrivalTimes[index - 1])
            arrivalTimes[index] = adjustedTime
    
        # 输出最后一辆车到达目的地的时间，减去M再加1
        print(f"{arrivalTimes[M - 1] - M + 1:.1f}")
    
    if __name__ == "__main__":
        main()
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    
    int main() {
        int M, N;
    
        // 读取输入：车辆数M和终点距离N
        scanf("%d %d", &M, &N);
    
        // 获取每辆车的速度并存储在数组speeds中
        int speeds[M];
        for (int index = 0; index < M; index++) {
            scanf("%d", &speeds[index]);
        }
    
        // 初始化arrivalTimes数组，其中存储第一辆车到达目的地的时间
        double arrivalTimes[M];
        arrivalTimes[0] = (double) N / speeds[0];
    
        // 对于剩余的车辆，计算每辆车到达目的地的时间
        for (int index = 1; index < M; index++) {
            // 计算第index辆车单独行驶到目的地的时间
            double estimatedTime = (double) N / speeds[index] + index;
    
            // 比较当前车辆计算出的到达时间和前一辆车的到达时间
            double adjustedTime = estimatedTime > arrivalTimes[index - 1] ? estimatedTime : arrivalTimes[index - 1];
            arrivalTimes[index] = adjustedTime;
        }
    
        // 输出最后一辆车到达目的地的时间，减去M再加1
        printf("%.1f\n", arrivalTimes[M - 1] - M + 1);
    
        return 0;
    }
    

![fengmian](https://i-blog.csdnimg.cn/blog_migrate/c5a74cc06a78a9908446a89ec6a92097.png)

## 完整用例

### 用例1

    
    
    3 100
    10
    10
    10
    

### 用例2

    
    
    4 120
    5
    10
    15
    20
    

### 用例3

    
    
    4 120
    20
    15
    10
    5
    

### 用例4

    
    
    5 400
    1
    1
    1
    1
    1
    

### 用例5

    
    
    5 400
    29
    29
    29
    29
    29
    

### 用例6

    
    
    5 200
    5
    20
    10
    15
    25
    

### 用例7

    
    
    10 10
    1
    2
    3
    4
    5
    6
    7
    8
    9
    10
    

### 用例8

    
    
    3 90
    2
    3
    30
    

### 用例9

    
    
    4 80
    8
    7
    6
    5
    

### 用例10

    
    
    9 10
    8
    18
    9
    12
    27
    17
    9
    25
    27
    

