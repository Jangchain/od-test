## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

有一名科学家想要从一台古董电脑中拷贝文件到自己的电脑中加以研究。

但此电脑除了有一个3.5寸软盘驱动器以外，没有任何手段可以将文件持贝出来，而且只有一张软盘可以使用。

因此这一张软盘是唯一可以用来拷贝文件的载体。

科学家想要尽可能多地将计算机中的信息拷贝到软盘中，做到软盘中文件内容总大小最大。

已知该软盘容量为1474560字节。文件占用的软盘空间都是按块分配的，每个块大小为512个字节。一个块只能被一个文件使用。拷贝到软盘中的文件必须是完整的，且不能采取任何压缩技术。

## 输入描述

第1行为一个整数N，表示计算机中的文件数量。1 ≤ N ≤ 1000.  
接下来的第2行到第N+1行(共N行)，每行为一个整数，表示每个文件的大小Si，单位为字节。

0 ≤ i < N,0 ≤ Si

#### 备注

为了充分利用软盘空间，将每个文件在软盘上占用的块记录到本子上。即真正占用软盘空间的只有文件内容本身。

## 输出描述

科学家最多能拷贝的文件总大小

## 示例1

输入

    
    
    3
    737270
    737272
    737288
    

输出

    
    
    1474542
    

说明

> 3个文件中，每个文件实际占用的大小分别为737280字节、737280字节、737792字节。  
>
> 只能选取前两个文件，总大小为1474542字节。虽然后两个文件总大小更大且未超过1474560字节，但因为实际占用的大小超过了1474560字节，所以不能选后两个文件。

## 示例2

输入

    
    
    6
    400000
    200000
    200000
    200000
    400000
    400000
    

输出

    
    
    1400000
    

说明

> 从6个文件中，选择3个大小为400000的文件和1个大小为200000的文件，得到最大总大小为1400000。
>
> 也可以选择2个大小为400000的文件和3个大小为200000的文件，得到的总大小也是1400000

## 解题思路

该题可以采用背包问题的思想进行求解。

首先，根据输入的文件数量和每个文件的大小，将文件大小存储在一个数组中。

然后，计算软盘可以存放的块数，即将软盘总容量除以每个块的大小。

接下来，创建一个动态规划数组dp，其中dp[i]表示容量为i的背包可以存储的最大文件大小。

对于每个文件，将文件大小转换成块数，并将文件大小作为价值存储在worth中。

然后，从背包容量为blockCount开始向前遍历，对于每个背包容量，计算选择当前文件和不选择当前文件两种情况下的最大值。

最后，输出dp[blockCount]，即可得到科学家最多能拷贝的文件总大小。

## Java

    
    
    import java.util.Scanner;
    
    public class Main {
      public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
    
        int n = scanner.nextInt();
    
        int[] fileSizeArray = new int[n];
        for (int i = 0; i < n; i++) {
            fileSizeArray[i] = scanner.nextInt();
        }
    
        // 计算软盘可以存放的块数
        int blockCount = 1474560 / 512; 
    
        // 动态规划数组，dp[i] 表示容量为 i 的背包可以存储的最大文件大小
        int[] dp = new int[blockCount + 1];
    
        for (int fileSize : fileSizeArray) {
            // 把文件大小转换成块数
            int weight = (int) Math.ceil(fileSize / 512.0);  
            int worth = fileSize; 
            for (int j = blockCount; j >= weight; j--) {
                dp[j] = Math.max(dp[j], dp[j - weight] + worth);
            }
        }
    
        System.out.println(dp[blockCount]);
      }
    }
    
    

## Python

    
    
    import math
    
    n = int(input())
    
    fileSizeArray = []
    for i in range(n):
        fileSizeArray.append(int(input()))
    
    blockCount = 1474560 // 512
    
    dp = [0] * (blockCount + 1)
    
    for fileSize in fileSizeArray:
        weight = math.ceil(fileSize / 512)
        worth = fileSize
        for j in range(blockCount, weight - 1, -1):
            dp[j] = max(dp[j], dp[j - weight] + worth)
    
    print(dp[blockCount])
    
    

## JavaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    let n;
    let fileSizeArray = [];
    
    rl.on('line', (input) => {
      if (!n) {
        n = parseInt(input);
      } else {
        fileSizeArray.push(parseInt(input));
        if (fileSizeArray.length === n) {
          rl.close();
          const blockCount = 1474560 / 512;
          const dp = new Array(blockCount + 1).fill(0);
          fileSizeArray.forEach((fileSize) => {
            const weight = Math.ceil(fileSize / 512);
            const worth = fileSize;
            for (let j = blockCount; j >= weight; j--) {
              dp[j] = Math.max(dp[j], dp[j - weight] + worth);
            }
          });
          console.log(dp[blockCount]);
        }
      }
    });
    
    

## C++

    
    
    #include <iostream>
    #include <cmath>
    using namespace std;
    
    int main() {
        int n;
        cin >> n;
    
        int fileSizeArray[n];
        for (int i = 0; i < n; i++) {
            cin >> fileSizeArray[i];
        }
    
        // 计算软盘可以存放的块数
        int blockCount = 1474560 / 512; 
    
        // 动态规划数组，dp[i] 表示容量为 i 的背包可以存储的最大文件大小
        int dp[blockCount + 1] = {0};
    
        for (int i = 0; i < n; i++) {
            // 把文件大小转换成块数
            int weight = ceil(fileSizeArray[i] / 512.0);  
            int worth = fileSizeArray[i]; 
            for (int j = blockCount; j >= weight; j--) {
                dp[j] = max(dp[j], dp[j - weight] + worth);
            }
        }
    
        cout << dp[blockCount] << endl;
    
        return 0;
    }
    
    

## C语言

    
    
    #include <stdio.h>
    #include <math.h>
    #include <stdlib.h>
    
    // 定义一个返回较大值的函数
    int max(int a, int b) {
        return (a > b) ? a : b;
    }
    
    int main() {
        int n;
        
        // 输入文件数量
        scanf("%d", &n);
    
        // 动态分配存储文件大小的数组
        int *fileSizeArray = (int *)malloc(n * sizeof(int));
        // 输入每个文件的大小
        for (int i = 0; i < n; i++) {
            scanf("%d", &fileSizeArray[i]);
        }
    
        // 计算软盘可以存放的块数
        int blockCount = 1474560 / 512;
    
        // 动态规划数组，dp[i] 表示容量为 i 的背包可以存储的最大文件大小
        int *dp = (int *)malloc((blockCount + 1) * sizeof(int));
        // 初始化 dp 数组，将其所有元素置为0
        for (int i = 0; i <= blockCount; i++) {
            dp[i] = 0;
        }
    
        // 处理每个文件，计算在给定块数内能够存储的最大文件大小
        for (int i = 0; i < n; i++) {
            // 把文件大小转换成块数
            int weight = (int)ceil(fileSizeArray[i] / 512.0);  
            int worth = fileSizeArray[i];
            
            // 从后向前遍历，更新动态规划数组
            for (int j = blockCount; j >= weight; j--) {
                dp[j] = max(dp[j], dp[j - weight] + worth);
            }
        }
    
        // 输出最大可以存储的文件大小
        printf("%d\n", dp[blockCount]);
    
        return 0;
    }
    

![fengmian](https://i-blog.csdnimg.cn/blog_migrate/c83203f0a4dd60f16adaa78521baf08a.png)

#### 完整用例

##### 用例1

    
    
    3
    737270
    737272
    737288
    

##### 用例2

    
    
    6
    400000
    200000
    200000
    200000
    400000
    400000
    

##### 用例3

    
    
    5
    100
    200
    300
    400
    500
    

##### 用例4

    
    
    1
    1000
    

##### 用例5

    
    
    4
    500
    500
    500
    500
    

##### 用例6

    
    
    10
    100000
    200000
    300000
    400000
    500000
    600000
    700000
    800000
    900000
    1000000
    

##### 用例7

    
    
    20
    5000
    10000
    15000
    20000
    25000
    30000
    35000
    40000
    45000
    50000
    55000
    60000
    65000
    70000
    75000
    80000
    85000
    90000
    95000
    100000
    

##### 用例8

    
    
    25
    5000
    10000
    15000
    20000
    25000
    30000
    35000
    40000
    45000
    50000
    55000
    60000
    65000
    70000
    75000
    80000
    85000
    90000
    95000
    100000
    50000
    50000
    50000
    50000
    50000
    

##### 用例9

    
    
    15
    1024
    2048
    4096
    8192
    16384
    32768
    65536
    131072
    262144
    524288
    1048576
    1000000
    500000
    250000
    125000
    

##### 用例10

    
    
    50
    100
    200
    300
    400
    500
    600
    700
    800
    900
    1000
    1100
    1200
    1300
    1400
    1500
    1600
    1700
    1800
    1900
    2000
    2100
    2200
    2300
    2400
    2500
    2600
    2700
    2800
    2900
    3000
    3100
    3200
    3300
    3400
    3500
    3600
    3700
    3800
    3900
    4000
    4100
    4200
    4300
    4400
    4500
    4600
    4700
    4800
    4900
    5000
    

