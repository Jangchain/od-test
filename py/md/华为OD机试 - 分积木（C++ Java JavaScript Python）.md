#### 题目描述

>
> Solo和koko是两兄弟，妈妈给了他们一大堆积木，每块积木上都有自己的重量。现在他们想要将这些积木分成两堆。哥哥Solo负责分配，弟弟koko要求两个人获得的积木总重量“相等”（根据Koko的逻辑），个数可以不同，不然就会哭，但koko只会先将两个数转成二进制再进行加法，而且总会忘记进位（每个进位都忘记）。如当25（11101）加11（01011）时，koko得到的计算结果是18（10010）：
    
    
    11001
    +01011
    --------
    10010
    

Solo想要尽可能使自己得到的积木总重量最大，且不让koko哭。

#### 输入描述

> 第一行是一个整数N(2≤N≤100)，表示有多少块积木；
>
> 第二行为空格分开的N个整数Ci(1≤Ci≤106)，表示第i块积木的重量。

#### 输出描述

> 如果能让koko不哭，输出Solo所能获得积木的最大总重量；否则输出“NO”。

#### 用例

输入 ：

    
    
    3
    3 5 6
    

输出 ：

    
    
    11
    

#### C++

    
    
    #include <iostream>
    #include <vector>
    #include <limits>
    
    int main() {
        int n;
        std::cin >> n;
        std::vector<int> a(n);
        for (int i = 0; i < n; i++) {
            std::cin >> a[i];
        }
        int sums = 0;
        int min = std::numeric_limits<int>::max();
        for (int x : a) {
            sums = sums ^ x;
            if (x < min) {
                min = x;
            }
        }
        if (sums != 0) {
            std::cout << "NO" << std::endl;
        } else {
            int sum = 0;
            for (int x : a) {
                sum += x;
            }
            std::cout << sum - min << std::endl;
        }
        return 0;
    }
    

#### JavaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    let n;
    let a;
    
    rl.on('line', (inputN) => {
      n = parseInt(inputN);
      
      rl.on('line', (inputA) => {
        a = inputA.split(' ').map(Number);
        
        let sums = 0;
        let min_val = Number.MAX_SAFE_INTEGER;
        
        a.forEach((x) => {
          sums = sums ^ x;
          if (x < min_val) {
            min_val = x;
          }
        });
        
        if (sums !== 0) {
          console.log("NO");
        } else {
          const total_sum = a.reduce((sum, x) => sum + x, 0);
          console.log(total_sum - min_val);
        }
        
        rl.close();
      });
    });
    

#### Java

    
    
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            int n = scanner.nextInt();
            int[] a = new int[n];
            for (int i = 0; i < n; i++) {
                a[i] = scanner.nextInt();
            }
            int sums = 0;
            int min = Integer.MAX_VALUE;
            for (int x : a) {
                sums = sums ^ x;
                if (x < min) {
                    min = x;
                }
            }
            if (sums != 0) {
                System.out.println("NO");
            } else {
                int sum = 0;
                for (int x : a) {
                    sum += x;
                }
                System.out.println(sum - min);
            }
        }
    }
    
    

#### Python

    
    
    import sys
    
    n = int(input())
    a = list(map(int, input().split()))
    
    sums = 0
    min_val = sys.maxsize
    for x in a:
        sums = sums ^ x
        if x < min_val:
            min_val = x
    
    if sums != 0:
        print("NO")
    else:
        total_sum = sum(a)
        print(total_sum - min_val)
    

> #### 文章目录
>
>   *     *       * 题目描述
>       * 输入描述
>       * 输出描述
>       * 用例
>       * C++
>       * JavaScript
>       * Java
>       * Python
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
blog.csdnimg.cn/img_convert/1d2f33ed8cf2fb1b9a4fe09513f7aa94.png)

#### 完整用例

##### 用例1

    
    
    3
    3 5 6
    

##### 用例2

    
    
    4
    1 2 3 4
    

##### 用例3

    
    
    5
    10 20 30 40 50
    

##### 用例4

    
    
    15
    1 2 3 4 5 6 7 8 9 10 11 12 13 14 15
    

##### 用例5

    
    
    12
    1 1 2 2 3 3 4 4 5 5 6 6
    

##### 用例6

    
    
    7
    2 4 6 8 10 12 14
    

##### 用例7

    
    
    8
    5 10 15 20 25 30 35 40
    

##### 用例8

    
    
    8
    1 3 5 7 9 11 13 15
    

##### 用例9

    
    
    9
    2 4 6 8 10 12 14 16 18
    

##### 用例10

    
    
    3
    1 2 3
    

