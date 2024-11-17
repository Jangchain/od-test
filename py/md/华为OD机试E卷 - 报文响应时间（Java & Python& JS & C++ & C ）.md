## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

IGMP 协议中，有一个字段称作最大响应时间 (Max Response Time) ，HOST收到查询报文，解折出 MaxResponsetime
字段后，需要在 (0，MaxResponseTime] 时间 (s)
内选取随机时间回应一个响应报文，如果在随机时间内收到一个新的查询报文，则会根据两者时间的大小，选取小的一方刷新回应时间。

最大响应时间有如下计算方式：

  * 当 Max Resp Code < 128, Max Resp Time = Max Resp Code；
  * 当 Max Resp Code ≥ 128, Max Resp Time = (mant | 0x10) << (exp + 3)；

![img](https://i-blog.csdnimg.cn/blog_migrate/259e40bdbb88164df4c0c6a955721da5.png)

注: exp最大响应时间的高5~7位: mant 为最大响应时间的低4位。

其中接收到的MaxRespCode 最大值为 255，以上出现所有字段均为无符号数。

现在我们认为 HOST收到查询报文时，选取的随机时间必定为最大值，现给出 HOST 收到查询报文个数 C，HOST
收到该报文的时间T，以及查询报文的最大响应时间字段值 M，请计算出HOST 发送响应报文的时间。

## 输入描述

第一行为查询报文个数 C，后续每行分别为 HOST 收到报文时间 T，及最大响应时间M，以空格分割。

## 输出描述

HOST 发送响应报文的时间。

## 备注

用例确定只会发送一个响应报文， 不存在计时结束后依然收到查询报文的情况。

## 示例1

输入

    
    
    3
    0 20
    1 10
    8 20
    

输出

    
    
    11
    

说明

> 收到3个报文，  
>  第0秒收到第1个报文，响应时间为20秒，则要到0+20=20秒响应；  
>  第1秒收到第2个报文，响应时间为10秒，则要到1+10=11秒响应，与上面的报文的响应时间比较获得响应时间最小为11秒；
>
> 第8秒收到第3个报文，响应时间为20秒，则要到8+20=28秒响应，与第上面的报文的响应时间比较获得响应时间最小为11秒；
>
> 最终得到最小响应报文时间为11秒

## 示例2

输入

    
    
    2
    0 255
    200 60
    

输出

    
    
    260
    

说明

> 收到2个报文，  
>  第0秒收到第1个报文，响应时间为255秒，则要到(15 | 0x10) << (7 + 3)= 31744秒响应; (mant = 15，exp =7)
>
> 第200秒收到第2个报文，响应时间为60秒，则要到200+60-260秒响应，与第上面的报文的响应时间比较获得响应时间最小为260秒:
>
> 最终得到最小响应报文时间为260秒

## 解题思路

这道题目要求计算在IGMP协议下，HOST在收到多个查询报文后，确定的最早发送响应报文的时间点。HOST需要根据每个报文的最大响应时间字段`MaxRespCode`来计算其最大响应时间，并在计算出所有可能的响应时间后选取最早的那个时间点。

核心是：

  * 当 `m < 128` 时，`m` 直接作为 `MaxResponseTime`。

  * 当 `m >= 128` 时，需要将 `m` 转换为8位二进制字符串，将第1至第3位提取为 `exp`，第4至第7位提取为 `mant`。接着，将 `exp` 和 `mant` 转换为十进制值，并代入公式 `(mant | 0x10) << (exp + 3)` 进行计算，即可得到 `MaxResponseTime`。

#### 示例解释

  * **示例1** :

    * 报文1: 在 `0` 秒收到，`M=20`，最大响应时间是 `20` 秒，因此最迟在 `0 + 20 = 20` 秒响应。
    * 报文2: 在 `1` 秒收到，`M=10`，最大响应时间是 `10` 秒，因此最迟在 `1 + 10 = 11` 秒响应。
    * 报文3: 在 `8` 秒收到，`M=20`，最大响应时间是 `20` 秒，因此最迟在 `8 + 20 = 28` 秒响应。
    * 最早的响应时间是 `11` 秒。
  * **示例2** :

    * 报文1: 在 `0` 秒收到，`M=255`，因为 `M >= 128`，需要计算 `(mant | 0x10) << (exp + 3)`: 
      * `mant = 15`, `exp = 7`。计算得 `MaxRespTime = (15 | 0x10) << (7 + 3) = 31744` 秒。
    * 报文2: 在 `200` 秒收到，`M=60`，最大响应时间是 `60` 秒，因此最迟在 `200 + 60 = 260` 秒响应。
    * 最早的响应时间是 `260` 秒。

## Java

    
    
    import java.util.Scanner;
    
    public class Main{
        public static void main(String[] args) {
            Scanner in = new Scanner(System.in);
            int numQueries = in.nextInt(); // 查询报文个数
            int[] arrivalTime = new int[numQueries]; // HOST收到报文时间
            int[] maxRespCode = new int[numQueries]; // 最大响应时间字段值
    
            for (int i = 0; i < numQueries; i++) {
                arrivalTime[i] = in.nextInt();
                maxRespCode[i] = in.nextInt();
            }
    
            int minResponseTime = Integer.MAX_VALUE; // HOST发送响应报文的时间
            for (int i = 0; i < numQueries; i++) {
                int maxRespTime = 0;
                if (maxRespCode[i] < 128) { // 当MaxRespCode < 128 ,MaxRespTime = MaxRespCode
                    maxRespTime = maxRespCode[i];
                } else { // 当MaxRespCode >= 128 ,MaxRespTime = (mant | 0x10) << (exp + 3)
                    int exp = (maxRespCode[i] & 0x70) >> 4; // exp 最大响应时间的 高5~7位
                    int mant = maxRespCode[i] & 0x0F; // mant 为最大响应时间的 低4位
                    maxRespTime = (mant | 0x10) << (exp + 3);
                }
                int responseTime = arrivalTime[i] + maxRespTime; // HOST发送响应报文的时间
                minResponseTime = Math.min(minResponseTime, responseTime); // 更新最小的 HOST发送响应报文的时间
            }
            System.out.println(minResponseTime);    
        }
    }
    
    

## Python

    
    
    import sys
    
    numQueries = int(input()) # 查询报文个数
    arrivalTime = [0] * numQueries # HOST收到报文时间
    maxRespCode = [0] * numQueries # 最大响应时间字段值
    
    for i in range(numQueries):
        arrivalTime[i], maxRespCode[i] = map(int, input().split())
    
    minResponseTime = sys.maxsize # HOST发送响应报文的时间
    for i in range(numQueries):
        maxRespTime = 0
        if maxRespCode[i] < 128: # 当MaxRespCode < 128 ,MaxRespTime = MaxRespCode
            maxRespTime = maxRespCode[i]
        else: # 当MaxRespCode >= 128 ,MaxRespTime = (mant | 0x10) << (exp + 3)
            exp = (maxRespCode[i] & 0x70) >> 4 # exp 最大响应时间的 高5~7位
            mant = maxRespCode[i] & 0x0F # mant 为最大响应时间的 低4位
            maxRespTime = (mant | 0x10) << (exp + 3)
        responseTime = arrivalTime[i] + maxRespTime # HOST发送响应报文的时间
        minResponseTime = min(minResponseTime, responseTime) # 更新最小的 HOST发送响应报文的时间
    
    print(minResponseTime)
    
    

## JavaScript

    
    
    const readline = require('readline');  
    
     
    const rl = readline.createInterface({
      input: process.stdin,  
      output: process.stdout  
    });
    
    let numQueries; // 存储查询的数量
    let arrivalTime = []; // 存储每次查询的到达时间
    let maxRespCode = []; // 存储每次查询的最大响应码
    
     
    rl.on('line', (input) => {
      // 首次输入，用于获取查询的数量
      if (!numQueries) {
        numQueries = parseInt(input); // 解析输入为整数，并存储到 numQueries
      } else {
        // 分割输入的两个数值，并将其转换为数字类型
        const [a, b] = input.split(' ').map(Number);
        arrivalTime.push(a); // 将到达时间存入 arrivalTime 数组
        maxRespCode.push(b); // 将最大响应码存入 maxRespCode 数组
    
        // 当输入的查询数达到指定的数量时，开始处理计算
        if (arrivalTime.length === numQueries) {
          let minResponseTime = Number.MAX_SAFE_INTEGER; // 初始化最小响应时间为一个很大的值
          for (let i = 0; i < numQueries; i++) { // 遍历每个查询
            let maxRespTime = 0; // 用于存储当前查询的最大响应时间
    
            // 根据 maxRespCode 的值决定计算方式
            if (maxRespCode[i] < 128) {
              maxRespTime = maxRespCode[i]; // 如果 maxRespCode 小于 128，直接使用其值作为 maxRespTime
            } else {
              // 如果 maxRespCode 大于等于 128，进行复杂计算
              const exp = (maxRespCode[i] & 0x70) >> 4; // 提取 maxRespCode 的第 4 至 6 位作为 exp
              const mant = maxRespCode[i] & 0x0F; // 提取 maxRespCode 的第 1 至 3 位作为 mant
              maxRespTime = (mant | 0x10) << (exp + 3); // 计算 maxRespTime 的实际值
            }
    
            // 计算当前查询的响应时间
            const responseTime = arrivalTime[i] + maxRespTime;
            // 更新最小响应时间
            minResponseTime = Math.min(minResponseTime, responseTime);
          }
          console.log(minResponseTime); // 输出最小响应时间
          rl.close(); // 关闭 readline 接口
        }
      }
    });
    

## C++

    
    
    #include <iostream>
    #include <climits>
    
    using namespace std;
    
    int main() {
        int numQueries;
        cin >> numQueries; // 查询报文个数
        int arrivalTime[numQueries]; // HOST收到报文时间
        int maxRespCode[numQueries]; // 最大响应时间字段值
    
        for (int i = 0; i < numQueries; i++) {
            cin >> arrivalTime[i];
            cin >> maxRespCode[i];
        }
    
        int minResponseTime = INT_MAX; // HOST发送响应报文的时间
        for (int i = 0; i < numQueries; i++) {
            int maxRespTime = 0;
            if (maxRespCode[i] < 128) { // 当MaxRespCode < 128 ,MaxRespTime = MaxRespCode
                maxRespTime = maxRespCode[i];
            } else { // 当MaxRespCode >= 128 ,MaxRespTime = (mant | 0x10) << (exp + 3)
                int exp = (maxRespCode[i] & 0x70) >> 4; // exp 最大响应时间的 高5~7位
                int mant = maxRespCode[i] & 0x0F; // mant 为最大响应时间的 低4位
                maxRespTime = (mant | 0x10) << (exp + 3);
            }
            int responseTime = arrivalTime[i] + maxRespTime; // HOST发送响应报文的时间
            minResponseTime = min(minResponseTime, responseTime); // 更新最小的 HOST发送响应报文的时间
        }
        cout << minResponseTime << endl;
        return 0;
    }
    
    

## C语言

    
    
    #include <stdio.h>
    #include <limits.h> 
    
    int main() {
        int numQueries;
        scanf("%d", &numQueries);  
    
        int arrivalTime[numQueries]; // 定义数组存储 HOST 收到报文的时间
        int maxRespCode[numQueries]; // 定义数组存储最大响应时间字段值
    
        // 读取每个查询的到达时间和最大响应码
        for (int i = 0; i < numQueries; i++) {
            scanf("%d", &arrivalTime[i]); // 读取到达时间
            scanf("%d", &maxRespCode[i]); // 读取最大响应码
        }
    
        int minResponseTime = INT_MAX; // 初始化最小响应时间为最大整数值
    
        // 遍历所有查询，计算最小的响应时间
        for (int i = 0; i < numQueries; i++) {
            int maxRespTime = 0; // 初始化最大响应时间为0
    
            // 判断 maxRespCode 的值以决定如何计算最大响应时间
            if (maxRespCode[i] < 128) {
                // 如果 maxRespCode 小于 128，直接将其作为 maxRespTime
                maxRespTime = maxRespCode[i];
            } else {
                // 如果 maxRespCode 大于等于 128，根据给定的公式计算 maxRespTime
                int exp = (maxRespCode[i] & 0x70) >> 4; // 提取 maxRespCode 的第 4 至 6 位作为 exp
                int mant = maxRespCode[i] & 0x0F; // 提取 maxRespCode 的第 1 至 3 位作为 mant
                maxRespTime = (mant | 0x10) << (exp + 3); // 计算 maxRespTime 的实际值
            }
    
            // 计算当前查询的响应时间
            int responseTime = arrivalTime[i] + maxRespTime;
    
            // 更新最小的响应时间
            if (responseTime < minResponseTime) {
                minResponseTime = responseTime;
            }
        }
    
        // 输出最小的响应时间
        printf("%d\n", minResponseTime);
    
        return 0; // 程序正常结束
    }
    

![fengmian](https://i-blog.csdnimg.cn/blog_migrate/1db590fa7be31f141fcf28199aab5f8d.png)

#### 完整用例

##### 用例1

    
    
    3
    0 20
    1 10
    8 20
    

##### 用例2

    
    
    2
    0 255
    200 60
    

##### 用例3

    
    
    1
    5 100
    

##### 用例4

    
    
    4
    0 50
    10 30
    20 70
    30 90
    

##### 用例5

    
    
    2
    0 128
    10 200
    

##### 用例6

    
    
    5
    0 100
    50 150
    100 200
    150 250
    200 300
    

##### 用例7

    
    
    3
    0 255
    100 100
    200 50
    

##### 用例8

    
    
    4
    0 200
    50 150
    100 100
    150 50
    

##### 用例9

    
    
    2
    0 200
    100 100
    

##### 用例10

    
    
    1
    0 255
    

