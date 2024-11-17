#### 题目描述

求从坐标零点到坐标点n的最小步数，一次只能沿横坐标轴向左或向右移动 2 或 3。

注意：途径的坐标点可以为负数

#### 输入描述

坐标点n

#### 输出描述

输出从坐标零点移动到坐标点n的最小步数

#### 备注

1 <= n <= 10^9

#### 用例

输入

    
    
    4
    

输出

    
    
    2
    

> 从坐标零点移动到4，最小需要两步，即右移2，再右移2

#### 代码思路-动态规划

我们可以定义一个数组dp，其中dp[i]表示到达坐标点i所需的最小步数。初始时，dp[0]为0，表示到达坐标零点不需要移动。

然后，我们可以通过遍历数组dp来计算dp[i]的值。对于每个dp[i]，我们可以选择从dp[i-2]或dp[i-3]转移过来，因为一次只能移动2或3步。所以我们可以得到状态转移方程：

dp[i] = min(dp[i-2], dp[i-3]) + 1

其中，dp[i-2]表示从坐标点i-2移动2步到达坐标点i，dp[i-3]表示从坐标点i-3移动3步到达坐标点i。因为题目要求途径的坐标点可以为负数，所以我们需要保证i-2和i-3都是合法的坐标点。

最后，我们可以返回dp[n]作为最终的结果，即到达坐标点n所需的最小步数。

#### 机考代码查重

华为OD机考完成之后，官方会进行代码查重。**华为 od 机考确实有很大的概率抽到原题**
。如果碰到了题库中的原题，一定不要直接使用题解中的代码，尤其是变量名，一定要修改，可以改成毫无意义的单词。除了变量名之外，代码的组织结构和逻辑一定要进行改变，这就要求在日常的刷题中，提前编写好属于自己的代码。

#### C++ - 动态规划

    
    
    #include <iostream>
    #include <vector>
    #include <climits>
    
    using namespace std;
    
    int main() {
        int n;
        cin >> n;
        if(n==1){
            cout << 2 << endl;
        }else{
            vector<int> dp(n+1, INT_MAX);
            dp[0] = 0;
            for (int i = 2; i <= n; i++) {
                if (i >= 2 && dp[i-2] != INT_MAX) {
                    dp[i] = min(dp[i], dp[i-2] + 1);
                }
                if (i >= 3 && dp[i-3] != INT_MAX) {
                    dp[i] = min(dp[i], dp[i-3] + 1);
                }
            }
    
            cout << dp[n] << endl;
        }
    
        return 0;
    }
    

#### javaScript - 动态规划

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.on('line', (n) => {
      n = parseInt(n);
      if (n === 1) {
        console.log(2);
      } else {
        let dp = new Array(n+1).fill(Number.MAX_VALUE);
        dp[0] = 0;
        for (let i = 2; i <= n; i++) {
          if (i >= 2 && dp[i-2] !== Number.MAX_VALUE) {
            dp[i] = Math.min(dp[i], dp[i-2] + 1);
          }
          if (i >= 3 && dp[i-3] !== Number.MAX_VALUE) {
            dp[i] = Math.min(dp[i], dp[i-3] + 1);
          }
        }
        console.log(dp[n]);
      }
      rl.close();
    });
    
    

#### java - 动态规划

    
    
    import java.util.Scanner;
    import java.util.Vector;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            int n = scanner.nextInt();
            if (n == 1) {
                System.out.println(2);
            } else {
                Vector<Integer> dp = new Vector<>(n+1);
                for (int i = 0; i <= n; i++) {
                    dp.add(Integer.MAX_VALUE);
                }
                dp.set(0, 0);
                for (int i = 2; i <= n; i++) {
                    if (i >= 2 && dp.get(i-2) != Integer.MAX_VALUE) {
                        dp.set(i, Math.min(dp.get(i), dp.get(i-2) + 1));
                    }
                    if (i >= 3 && dp.get(i-3) != Integer.MAX_VALUE) {
                        dp.set(i, Math.min(dp.get(i), dp.get(i-3) + 1));
                    }
                }
                System.out.println(dp.get(n));
            }
            scanner.close();
        }
    }
    

#### python - 动态规划

    
    
    import sys
    
    n = int(input())
    if n == 1:
        print(2)
    else:
        dp = [sys.maxsize] * (n+1)
        dp[0] = 0
        for i in range(2, n+1):
            if i >= 2 and dp[i-2] != sys.maxsize:
                dp[i] = min(dp[i], dp[i-2] + 1)
            if i >= 3 and dp[i-3] != sys.maxsize:
                dp[i] = min(dp[i], dp[i-3] + 1)
        print(dp[n])
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

#### 完整用例

##### 用例1

4

##### 用例2

6

##### 用例3

9

##### 用例4

10

##### 用例5

12

##### 用例6

100

##### 用例7

200

##### 用例8

500

##### 用例9

1000

##### 用例10

1000000

