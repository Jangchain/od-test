#### 题目描述

一天一只顽猴想去从山脚爬到山顶，途中经过一个有个N个台阶的阶梯，但是这猴子有一个习惯：

每一次只能跳1步或跳3步，试问猴子通过这个阶梯有多少种不同的跳跃方式？

#### 输入描述

输入只有一个整数N（0<N<=50）此阶梯有多少个台阶。

#### 输出描述

输出有多少种跳跃方式（解决方案数）。

#### 用例

输入| 50  
---|---  
输出| 122106097  
说明| 无  
输入| 3  
---|---  
输出| 2  
说明| 无  
  
#### C++

    
    
    #include <iostream>
    #include <vector>
    using namespace std;
    
    
    int main() {
        int n;
        cin >> n;
            vector<int> dp = {1, 1, 2}; // 初始化dp数组
        for (int i = 3; i < n; i++) {
            dp.push_back(dp[i - 1] + dp[i - 3]); // 计算跳跃方式数量
        }
        cout << dp[n - 1] << endl; // 输出跳跃方式数量
        return 0;
    }
    

#### JavaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    rl.on('line', (input) => {
        const n = parseInt(input);
        const dp = [1, 1, 2]; // 初始化dp数组
        for (let i = 3; i < n; i++) {
            dp.push(dp[i - 1] + dp[i - 3]); // 计算跳跃方式数量
        }
        console.log(dp[n - 1]); // 输出跳跃方式数量
        rl.close();
    });
    

#### java

    
    
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            Scanner input = new Scanner(System.in);
            int n = input.nextInt();
            int[] dp = new int[n + 3];
            dp[1] = 1;
            dp[2] = 1;
            dp[3] = 2;
            for (int i = 4; i <= n; i++) {
                dp[i] = dp[i - 1] + dp[i - 3];
            }
            System.out.println(dp[n]);
        }
    }
    
    

#### python

    
    
    n = int(input())
    dp = [1, 1, 2] # 初始化dp数组
    for i in range(3, n):
        dp.append(dp[i - 1] + dp[i - 3]) # 计算跳跃方式数量
    print(dp[n - 1]) # 输出跳跃方式数量
    

> #### 文章目录
>
>   *     *       * 题目描述
>       * 输入描述
>       * 输出描述
>       * 用例
>       * C++
>       * JavaScript
>       * java
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

1

##### 用例2

2

##### 用例3

3

##### 用例4

4

##### 用例5

5

##### 用例6

10

##### 用例7

20

##### 用例8

30

##### 用例9

40

##### 用例10

50

