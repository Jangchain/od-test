#### 题目描述

有一个数列a[N] (N=60)，从a[0]开始，每一项都是一个数字。数列中a[n+1]都是a[n]的描述。其中a[0]=1。

规则如下：

a[0]:1

a[1]:11(含义：其前一项a[0]=1是1个1，即“11”。表示a[0]从左到右，连续出现了1次“1”）

a[2]:21(含义：其前一项a[1]=11，从左到右：是由两个1组成，即“21”。表示a[1]从左到右，连续出现了两次“1”)

a[3]:1211(含义：其前一项a[2]=21，从左到右：是由一个2和一个1组成，即“1211”。表示a[2]从左到右，连续出现了1次“2”，然后又连续出现了1次“1”)

a[4]:111221(含义：其前一项a[3]=1211，从左到右：是由一个1、一个2、两个1组成，即“111221”。表示a[3]从左到右，连续出现了1次“1”，连续出现了1次“2”，连续出现了两次“1”)

请输出这个数列的第n项结果（a[n]，0≤n≤59）。

#### 输入描述

数列的第n项(0≤n≤59)

4

#### 输出描述

数列的内容

111221

#### 用例

#### C++

    
    
    #include <iostream>
    #include <vector>
    using namespace std;
    
    int main() {
        int n;
        cin >> n;
        vector<string> dp(n + 1);
        dp[0] = "1";
        for (int i = 1; i <= n; i++) {
            dp[i] = "";
            int count = 1;
            char val = dp[i-1][0];
            for (int j = 1; j < dp[i-1].length(); j++) {
                if (dp[i-1][j] == val) {
                    count++;
                } else {
                    dp[i] += to_string(count) + val;
                    count = 1;
                    val = dp[i-1][j];
                }
            }
            dp[i] += to_string(count) + val;
        }
        cout << dp[n] << endl;
        return 0;
    }
    

#### java

    
    
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            int n = scanner.nextInt();
            StringBuilder[] dp = new StringBuilder[n + 1];
            dp[0] = new StringBuilder("1");
            for (int i = 1; i <= n; i++) {
                dp[i] = new StringBuilder();
                int count = 1;
                char val = dp[i-1].charAt(0);
                for (int j = 1; j < dp[i-1].length(); j++) {
                    if (dp[i-1].charAt(j) == val) {
                        count++;
                    } else {
                        dp[i].append(count).append(val);
                        count = 1;
                        val = dp[i-1].charAt(j);
                    }
                }
                dp[i].append(count).append(val);
            }
            System.out.println(dp[n].toString());
            scanner.close();
        }
    }
    

#### python

    
    
    n = int(input())
    dp = [""] * (n + 1)
    dp[0] = "1"
    for i in range(1, n + 1):
        dp[i] = ""
        count = 1
        val = dp[i-1][0]
        for j in range(1, len(dp[i-1])):
            if dp[i-1][j] == val:
                count += 1
            else:
                dp[i] += str(count) + val
                count = 1
                val = dp[i-1][j]
        dp[i] += str(count) + val
    print(dp[n])
    

#### javaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.on('line', (n) => {
      let dp = [];
      dp[0] = '1';
      for (let i = 1; i <= n; i++) {
        dp[i] = '';
        let count = 1;
        let val = dp[i-1][0];
        for (let j = 1; j < dp[i-1].length; j++) {
          if (dp[i-1][j] === val) {
            count++;
          } else {
            dp[i] += count + val;
            count = 1;
            val = dp[i-1][j];
          }
        }
        dp[i] += count + val;
      }
      console.log(dp[n]);
      rl.close();
    });
    

> #### 文章目录
>
>   *     *       * 题目描述
>       * 输入描述
>       * 输出描述
>       * 用例
>       * C++
>       * java
>       * python
>       * javaScript
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

    
    
    0
    

##### 用例2

    
    
    1
    

##### 用例3

    
    
    2
    

##### 用例4

    
    
    3
    

##### 用例5

    
    
    5
    

##### 用例6

    
    
    10
    

##### 用例7

    
    
    15
    

##### 用例8

    
    
    20
    

##### 用例9

    
    
    8
    

##### 用例10

    
    
    9
    

