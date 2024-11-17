#### 题目描述

同一个数轴X上有两个点的集合A={A1, A2, …, Am}和B={B1, B2, …, Bn}，Ai和Bj均为正整数，A、B已经按照从小到大排好序，

A、B均不为空，给定一个距离R(正整数)，列出同时满足如下条件的所有（Ai, Bj）数对…

1)Ai<= Bj

2)Ai, Bj之间的距离小于等于R

3)在满足1) 2)的情况下,每个Ai只需输出距离最近的Bj

4)输出结果按Ai从小到大的顺序排序

#### 输入描述

第一行三个正整数m,n,R

第二行m个正整数,表示集合A

第三行n个正整数,表示集合B

输入限制：

1<=R<=100000, 1<=n,m<=100000, 1<=Ai,Bj<=1000000000

#### 输出描述

每组数对输出一行Ai和Bj,以空格隔开

##### ACM输入输出模式

如果你经常使用**Leetcode** ,会知道**letcode** 是不需要编写输入输出函数的。但是华为OD机考使用的是 **ACM 模式**
，需要手动编写输入和输出。

所以最好在牛-
客上提前熟悉这种模式。例如C++使用`cin/cout`,python使用`input()/print()`。JavaScript使用node的`readline()`和`console.log()`。Java
使用`sacnner/system.out.print()`

#### 用例

输入

    
    
    4 5 5
    1 5 5 10
    1 3 8 8 20
    

输出

    
    
    1 1
    5 8
    5 8
    

#### 机考代码查重

华为OD机考完成之后，官方会进行代码查重。**华为 od 机考确实有很大的概率抽到原题**
。如果碰到了题库中的原题，一定不要直接使用题解中的代码，尤其是变量名，一定要修改，可以改成毫无意义的单词。除了变量名之外，代码的组织结构和逻辑一定要进行改变，这就要求在日常的刷题中，提前编写好属于自己的代码。

#### C++

    
    
    #include <iostream>
    #include <vector>
    
    using namespace std;
    
    int main() {
        int m, n, R;
        cin >> m >> n >> R;
        
        vector<int> A(m);
        for (int i = 0; i < m; i++) {
            cin >> A[i];
        }
        
        vector<int> B(n);
        for (int i = 0; i < n; i++) {
            cin >> B[i];
        }
        
        vector<vector<int>> res;
        int j = 0;
        for (int i = 0; i < m; i++) {
            while (j < n && B[j] - A[i] <= R) {
                if (A[i] <= B[j]) {
                    res.push_back({A[i], B[j]});
                    break;
                }
                j++;
            }
        }
        
        for (vector<int> pair : res) {
            cout << pair[0] << " " << pair[1] << endl;
        }
        
        return 0;
    }
    

#### java

    
    
    import java.util.Scanner;
    import java.util.ArrayList;
    import java.util.List;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            int m = scanner.nextInt();
            int n = scanner.nextInt();
            int R = scanner.nextInt();
            List<Integer> A = new ArrayList<>();
            List<Integer> B = new ArrayList<>();
            
            for (int i = 0; i < m; i++) {
                A.add(scanner.nextInt());
            }
            
            for (int i = 0; i < n; i++) {
                B.add(scanner.nextInt());
            }
            
            List<int[]> res = new ArrayList<>();
            int j = 0;
            for (int i = 0; i < m; i++) {
                while (j < n && B.get(j) - A.get(i) <= R) {
                    if (A.get(i) <= B.get(j)) {
                        res.add(new int[]{A.get(i), B.get(j)});
                        break;
                    }
                    j++;
                }
            }
            
            for (int[] pair : res) {
                System.out.println(pair[0] + " " + pair[1]);
            }
        }
    }
    

#### javaScript

    
    
     
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    let m, n, R;
    let A = [];
    let B = [];
    let res = [];
    let currentInput = 1;
    
    rl.on('line', (input) => {
      if (currentInput === 1) {
        const [mStr, nStr, RStr] = input.split(" ");
        m = parseInt(mStr);
        n = parseInt(nStr);
        R = parseInt(RStr);
        currentInput++;
      } else if (currentInput === 2) {
        A = input.split(" ").slice(0, n).map((ele) => parseInt(ele));
        currentInput++;
      } else if (currentInput === 3) {
        B = input.split(" ").slice(0, n).map((ele) => parseInt(ele));
    
        let j = 0;
        for (let i = 0; i < m; i++) {
          while (j < n && B[j] - A[i] <= R) {
            if (A[i] <= B[j]) {
              res.push([A[i], B[j]]);
              break;
            }
            j++;
          }
        }
    
        for (let pair of res) {
          console.log(pair[0], pair[1]);
        }
    
        rl.close();
      }
    });
    

#### python

    
    
    import sys
    
    line = input()
    m, n, r = map(int, line.split())
    
    a = list(map(int, input().split()))
    b = list(map(int, input().strip().split()))
    
    i = 0
    j = 0
    
    while i < len(a) and j < len(b):
        if a[i] <= b[j]:
            if b[j] - a[i] <= r:
                print(a[i], b[j])
            i += 1
        else:
            j += 1
    

> #### 文章目录
>
>   *     *       * 题目描述
>       * 输入描述
>       * 输出描述
>       *         * ACM输入输出模式
>       * 用例
>       * 机考代码查重
>       * C++
>       * java
>       * javaScript
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

    
    
    4 5 5
    1 5 5 10
    1 3 8 8 20
    

##### 用例2

    
    
    3 4 2
    2 5 7
    1 3 4 6
    

##### 用例3

    
    
    2 3 1
    1 3
    2 4 5
    

##### 用例4

    
    
    5 5 3
    1 2 3 4 5
    2 3 4 5 6
    

##### 用例5

    
    
    5 5 5
    1 3 5 7 9
    2 4 6 8 10
    

##### 用例6

    
    
    4 5 4
    1 2 3 4
    5 6 7 8 9
    

##### 用例7

    
    
    3 4 5
    1 2 3
    4 5 6 7
    

##### 用例8

    
    
    5 6 8
    1 5 10 15 20
    2 3 5 8 9 12
    

##### 用例9

    
    
    6 7 4
    2 4 6 8 10 12
    1 3 5 7 9 11 13
    

##### 用例10

    
    
    5 5 10
    10 20 30 40 50
    5 15 25 35 45
    

