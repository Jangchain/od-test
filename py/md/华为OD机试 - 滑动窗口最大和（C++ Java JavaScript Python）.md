## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

有一个N个整数的数组，和一个长度为M的窗口，窗口从数组内的第一个数开始滑动直到窗口不能滑动为止，

每次窗口滑动产生一个窗口和（窗口内所有数的和），求窗口滑动产生的所有窗口和的最大值。

## 输入描述

第一行输入一个正整数N，表示整数个数。（0<N<100000）

第二行输入N个整数，整数的取值范围为[-100,100]。

第三行输入一个正整数M，M代表窗口的大小，M<=100000，且M<=N。

## 输出描述

窗口滑动产生所有窗口和的最大值。

## 示例1

输入

    
    
    6
    10 20 30 15 23 12
    3
    

输出

    
    
    68
    

说明

> 窗口长度为3，窗口滑动产生的窗口和分别为
>
> 10+20+30=60，
>
> 20+30+15=65，
>
> 30+15+23=68，
>
> 15+23+12=50，
>
>
> 所以窗口滑动产生的所有窗口和的[最大值](https://so.csdn.net/so/search?q=%E6%9C%80%E5%A4%A7%E5%80%BC&spm=1001.2101.3001.7020)为68。

## 解题思路

题目要求找出在一个给定长度的滑动窗口内的所有窗口和的最大值。具体解释如下：

### 题目描述

  * 给定一个长度为  N N N 的数组和一个长度为  M M M 的滑动窗口。窗口从数组的第一个元素开始滑动，每次向右移动一个位置，直到窗口无法再滑动为止。
  * 每次滑动时，计算窗口内所有元素的和，称为“窗口和”。
  * 求出所有滑动窗口中产生的“窗口和”的最大值。

### 示例分析

**输入**

    
    
    6
    10 20 30 15 23 12
    3
    

**输出**

    
    
    68
    

#### 说明

  * 数组长度为 6，数组为 [10, 20, 30, 15, 23, 12]。
  * 窗口长度为 3。
  * 滑动窗口产生的窗口和为： 
    * 窗口 [10, 20, 30] 的和为  10 \+ 20 \+ 30 = 60 10 + 20 + 30 = 60 10+20+30=60。
    * 窗口 [20, 30, 15] 的和为  20 \+ 30 \+ 15 = 65 20 + 30 + 15 = 65 20+30+15=65。
    * 窗口 [30, 15, 23] 的和为  30 \+ 15 \+ 23 = 68 30 + 15 + 23 = 68 30+15+23=68。
    * 窗口 [15, 23, 12] 的和为  15 \+ 23 \+ 12 = 50 15 + 23 + 12 = 50 15+23+12=50。
  * 所有窗口和中，最大的值是 68，因此输出 68。

## Java

    
    
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            Scanner sc = new Scanner(System.in);
            int n = sc.nextInt();
    
            // 定义整数数组 nums
            int[] nums = new int[n];
            for (int i = 0; i < n; i++) {
                nums[i] = sc.nextInt();
            }
    
            // 输入窗口大小 m
            int m = sc.nextInt();
    
            // 初始化窗口和 sum 为前 m 个数之和
            int sum = 0;
            for (int i = 0; i < m; i++) {
                sum += nums[i];
            }
    
            int ans = sum; // 初始化最大窗口和 ans 为初始窗口和
    
            // 使用滑动窗口，从第 m 个元素开始遍历数组
            for (int i = m; i < n; i++) {
                // 更新窗口和：减去第 i - m 个数，加上第 i 个数
                sum = sum - nums[i - m] + nums[i];
                // 更新最大窗口和
                ans = Math.max(ans, sum);
            }
    
            System.out.println(ans); // 输出最大窗口和
            sc.close(); // 关闭 Scanner
        }
    }
    

## Python

    
    
    # 读取输入
    n = int(input())
    nums = list(map(int, input().split()))
    m = int(input())
    
    # 初始化窗口和 sum 为前 m 个数之和
    sumT = sum(nums[:m])
    
    # 初始化最大窗口和 ans 为 sum
    ans = sumT
    
    # 使用滑动窗口，从第 m 个元素开始遍历数组
    for i in range(m, n):
        # 更新窗口和：减去第 i-m 个数，加上第 i 个数
        sumT = sumT - nums[i - m] + nums[i]
        # 更新最大窗口和
        ans = max(ans, sumT)
    
    # 输出最大窗口和
    print(ans)
    

## JavaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    let input = []; // 用于存储所有输入行
    
    // 读取输入
    rl.on('line', (line) => {
      input.push(line);
    }).on('close', () => {
      // 解析输入
      const n = parseInt(input[0]);
      const nums = input[1].split(' ').map(Number);
      const m = parseInt(input[2]);
    
      // 初始化窗口和 sum 为前 m 个数之和
      let sum = 0;
      for (let i = 0; i < m; i++) {
        sum += nums[i];
      }
    
      // 初始化最大窗口和 ans 为初始窗口和
      let ans = sum;
    
      // 使用滑动窗口，从第 m 个元素开始遍历数组
      for (let i = m; i < n; i++) {
        // 更新窗口和：减去第 i - m 个数，加上第 i 个数
        sum = sum - nums[i - m] + nums[i];
        // 更新最大窗口和
        ans = Math.max(ans, sum);
      }
    
      // 输出最大窗口和
      console.log(ans);
    });
    

## C++

    
    
    #include <iostream>
    #include <vector>
    #include <algorithm>  
    using namespace std;
    
    int main() {
        int n, m;
        cin >> n; // 输入数组长度
        vector<int> nums(n); // 使用 vector 动态数组，避免使用 VLA（变长数组）
    
        // 输入数组元素
        for (int i = 0; i < n; i++) {
            cin >> nums[i];
        }
    
        cin >> m; // 输入窗口大小
    
        // 计算初始窗口的和
        int sum = 0;
        for (int i = 0; i < m; i++) {
            sum += nums[i];
        }
    
        int ans = sum; // 初始化最大窗口和为初始窗口的和
    
        // 滑动窗口：逐步更新窗口和，并更新最大值
        for (int i = m; i < n; i++) {
            sum = sum - nums[i - m] + nums[i]; // 移动窗口：减去窗口的前一个元素，添加新的元素
            ans = max(ans, sum); // 更新最大窗口和
        }
    
        cout << ans << endl; // 输出最大窗口和
        return 0;
    }
    

## C语言

    
    
    #include <stdio.h>
    
    int main() {
        int n, m;
        scanf("%d", &n); // 输入数组长度
        int nums[n]; // 使用静态数组，因为 C 不支持 vector
    
        // 输入数组元素
        for (int i = 0; i < n; i++) {
            scanf("%d", &nums[i]);
        }
    
        scanf("%d", &m); // 输入窗口大小
    
        // 计算初始窗口的和
        int sum = 0;
        for (int i = 0; i < m; i++) {
            sum += nums[i];
        }
    
        int ans = sum; // 初始化最大窗口和为初始窗口的和
    
        // 滑动窗口：逐步更新窗口和，并更新最大值
        for (int i = m; i < n; i++) {
            sum = sum - nums[i - m] + nums[i]; // 移动窗口：减去窗口的前一个元素，添加新的元素
            if (sum > ans) {
                ans = sum; // 更新最大窗口和
            }
        }
    
        printf("%d\n", ans); // 输出最大窗口和
        return 0;
    }
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/bdf5901ecfcfaa487edfb32dc350e37e.png)

#### 完整用例

##### 用例1

    
    
    5
    1 2 3 4 5
    3
    

##### 用例2

    
    
    7
    -1 -2 -3 -4 -5 6 7
    2
    

##### 用例3

    
    
    8
    -5 4 -3 9 -1 0 5 -2
    4
    

##### 用例4

    
    
    6
    0 2 0 0 0 1
    2
    

##### 用例5

    
    
    5
    100 -100 100 -100 100
    3
    

##### 用例6

    
    
    4
    1 3 5 7
    2
    

##### 用例7

    
    
    6
    -5 -4 -3 -2 -1 0
    3
    

##### 用例8

    
    
    7
    1 2 3 4 5 6 7
    4
    

##### 用例9

    
    
    5
    -2 3 -4 5 -6
    2
    

##### 用例10

    
    
    6
    1 -1 2 -2 3 -3
    3
    

