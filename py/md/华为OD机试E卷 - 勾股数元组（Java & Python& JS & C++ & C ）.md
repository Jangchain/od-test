## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

如果3个正整数(a,b,c)满足a^2 + b^2 = c^2的关系，则称(a,b,c)为勾股数（著名的勾三股四弦五），

为了探索勾股数的规律，我们定义如果勾股数(a,b,c)之间两两互质（即a与b，a与c，b与c之间均互质，没有公约数），则其为勾股数元组（例如(3,4,5)是勾股数元组，(6,8,10)则不是勾股数元组）。

请求出给定范围[N,M]内，所有的勾股数元组。

## 输入描述

起始范围N，1 <= N <= 10000

结束范围M，N < M <= 10000

## 输出描述

  1. a,b,c请保证a < b < c,输出格式：a b c；

  2. 多组勾股数元组请按照a升序，b升序，最后c升序的方式排序输出；

  3. 给定范围中如果找不到勾股数元组时，输出”NA“。

## 示例1

输入

    
    
    1
    20
    

输出

    
    
    3 4 5
    5 12 13
    8 15 17
    

说明

> [1,20]范围内勾股数有：(3 4 5)，(5 12 13)，(6 8 10)，(8 15 17)，(9 12 15)，(12 16 20)；
>
> 其中，满足(a,b,c)之间两两互质的勾股数元组有：(3 4 5)，(5 12 13)，(8 15 17);
>
> 按输出描述中顺序要求输出结果。

## 示例2

输入

    
    
    5
    10
    

输出

    
    
    NA
    

说明

> [5,10]范围内勾股数有：(6 8 10)；
>
> 其中，没有满足(a,b,c)之间两两互质的勾股数元组；
>
> 给定范围中找不到勾股数元组，输出”NA“

## 解题思路

##### 勾股数的定义

如果3个正整数  ( a , b , c ) (a, b, c) (a,b,c) 满足  a 2 \+ b 2 = c 2 a^2 + b^2 = c^2
a2+b2=c2，则称  ( a , b , c ) (a, b, c) (a,b,c) 为勾股数。例如， ( 3 , 4 , 5 ) (3, 4, 5)
(3,4,5) 是一个典型的勾股数，因为  3 2 \+ 4 2 = 5 2 3^2 + 4^2 = 5^2 32+42=52。

##### 勾股数元组的定义

题目进一步要求：如果勾股数  ( a , b , c ) (a, b, c) (a,b,c) 之间任意两数互质（即  a a a 与  b b b、 a a
a 与  c c c、 b b b 与  c c c 之间都没有公约数，除了1以外），则称其为**勾股数元组** 。例如：

  * ( 3 , 4 , 5 ) (3, 4, 5) (3,4,5) 是勾股数元组，因为  g c d ( 3 , 4 ) = g c d ( 3 , 5 ) = g c d ( 4 , 5 ) = 1 gcd(3, 4) = gcd(3, 5) = gcd(4, 5) = 1 gcd(3,4)=gcd(3,5)=gcd(4,5)=1。
  * ( 6 , 8 , 10 ) (6, 8, 10) (6,8,10) 不是勾股数元组，因为  g c d ( 6 , 8 ) = 2 gcd(6, 8) = 2 gcd(6,8)=2，它们之间有公约数。

该题的关键在于：

  * 需要遍历范围内的所有三元组，检查是否满足勾股数关系  a 2 \+ b 2 = c 2 a^2 + b^2 = c^2 a2+b2=c2。
  * 对每个满足勾股数的三元组，进一步检查它们是否互质（通过 `gcd` 函数）。
  * 最后根据要求进行排序输出，或者在找不到符合条件的情况下输出 “NA”。

## Java

    
    
    import java.util.*;
    
    public class Main {
        public static boolean isCoprime(int x, int y) {
            while (y > 0) {
                int mod = x % y;
                x = y;
                y = mod;
            }
            return x == 1;
        }
    
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            int start = scanner.nextInt();
            int end = scanner.nextInt();
    
            // 将范围内的数的平方存入数组
            List<Integer> squares = new ArrayList<>();
            for (int i = start; i <= end; i++) {
                squares.add(i * i);
            }
    
            // 将数组转为 set，方便查找
            Set<Integer> squareSet = new HashSet<>(squares);
    
            // 存储勾股数元组的数组
            List<List<Integer>> pythagoreanTriples = new ArrayList<>();
            for (int i = 0; i < squares.size(); i++) {
                for (int j = i + 1; j < squares.size(); j++) {
                    int sum = squares.get(i) + squares.get(j);
                    if (squareSet.contains(sum)) {
                        pythagoreanTriples.add(Arrays.asList((int) Math.sqrt(squares.get(i)), (int) Math.sqrt(squares.get(j)), (int) Math.sqrt(sum)));
                    }
                }
            }
    
            // 存储符合条件的勾股数元组的数组
            List<List<Integer>> coprimeTriples = new ArrayList<>();
            for (List<Integer> triple : pythagoreanTriples) {
                if (isCoprime(triple.get(0), triple.get(1)) || isCoprime(triple.get(0), triple.get(2)) || isCoprime(triple.get(1), triple.get(2))) {
                    coprimeTriples.add(triple);
                }
            }
    
            // 按照题目要求排序输出
            if (coprimeTriples.isEmpty()) {
                System.out.println("NA");
            } else {
                Collections.sort(coprimeTriples, new Comparator<List<Integer>>() {
                    @Override
                    public int compare(List<Integer> a, List<Integer> b) {
                        if (!a.get(0).equals(b.get(0))) {
                            return a.get(0) - b.get(0);
                        } else if (!a.get(1).equals(b.get(1))) {
                            return a.get(1) - b.get(1);
                        } else {
                            return a.get(2) - b.get(2);
                        }
                    }
                });
                for (List<Integer> triple : coprimeTriples) {
                    System.out.println(triple.get(0) + " " + triple.get(1) + " " + triple.get(2));
                }
            }
        }
    }
    
    
    

## Python

    
    
    import math
    
    def isCoprime(x, y):
        while y > 0:
            mod = x % y
            x = y
            y = mod
        return x == 1
    
    start = int(input()) 
    end = int(input()) 
    
    # 将范围内的数的平方存入数组
    squares = [i*i for i in range(start, end+1)]
    
    # 将数组转为 set，方便查找
    squareSet = set(squares)
    
    # 存储勾股数元组的数组
    pythagoreanTriples = []
    for i in range(len(squares)):
        for j in range(i+1, len(squares)):
            s = squares[i] + squares[j]
            if s in squareSet:
                pythagoreanTriples.append([int(math.sqrt(squares[i])), int(math.sqrt(squares[j])), int(math.sqrt(s))])
    
    # 存储符合条件的勾股数元组的数组
    coprimeTriples = []
    for triple in pythagoreanTriples:
        if isCoprime(triple[0], triple[1]) or isCoprime(triple[0], triple[2]) or isCoprime(triple[1], triple[2]):
            coprimeTriples.append(triple)
    
    # 按照题目要求排序输出
    if not coprimeTriples:
        print("NA")
    else:
        coprimeTriples.sort(key=lambda x: (x[0], x[1], x[2]))
        for triple in coprimeTriples:
            print(triple[0], triple[1], triple[2])
    
    

## JavaScript

    
    
    const readline = require('readline');
    const readline = require("readline");
    
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    
    rl.on('line', (start) => {
        rl.on('line', (end) => {
    
            const ans = [];
            const k = Math.ceil(Math.sqrt(end));
    
            for (let y = 1; y < k; y++) {
                for (let x = y + 1; x < k; x++) {
                    if (isRelativePrime(x, y) && (x + y) % 2 == 1) {
                        const a = x * x - y * y;
                        const b = 2 * x * y;
                        const c = x * x + y * y;
    
                        if (a >= start && b >= start && c <= end) {
                            ans.push(a < b ? [a, b, c] : [b, a, c]);
                        }
                    }
                }
            }
    
            if (ans.length > 0) {
                ans.sort((a, b) =>
                    a[0] != b[0] ? a[0] - b[0] : a[1] != b[1] ? a[1] - b[1] : a[2] - b[2]
                );
    
                for (let arr of ans) {
                    console.log(arr.join(" "));
                }
            } else {
                console.log("NA");
            }
    
    
        });
    });
     function isRelativePrime(x, y) {
        while (y > 0) {
            let mod = x % y;
            x = y;
            y = mod;
        }
    
        return x === 1;
    }
    
    
    

## C++

    
    
    #include <iostream>
    #include <vector>
    #include <unordered_set>
    #include <cmath>
    #include <algorithm>
    
    using namespace std;
    bool isCoprime(int x, int y) {
        while (y > 0) {
            int mod = x % y;
            x = y;
            y = mod;
        }
        return x == 1;
    }
    
    int main() {
        int start, end;
        cin >> start >> end;
    
        // 将范围内的数的平方存入数组
        vector<int> squares;
        for (int i = start; i <= end; i++) {
            squares.push_back(i * i);
        }
    
        // 将数组转为 set，方便查找
        unordered_set<int> squareSet(squares.begin(), squares.end());
    
        // 存储勾股数元组的数组
        vector<vector<int>> pythagoreanTriples;
        for (int i = 0; i < squares.size(); i++) {
            for (int j = i + 1; j < squares.size(); j++) {
                int sum = squares[i] + squares[j];
                if (squareSet.count(sum)) {
                    pythagoreanTriples.push_back({(int) sqrt(squares[i]), (int) sqrt(squares[j]), (int) sqrt(sum)});
                }
            }
        }
    
        // 存储符合条件的勾股数元组的数组
        vector<vector<int>> coprimeTriples;
        for (auto &triple : pythagoreanTriples) {
            if (isCoprime(triple[0], triple[1]) || isCoprime(triple[0], triple[2]) || isCoprime(triple[1], triple[2])) {
                coprimeTriples.push_back(triple);
            }
        }
    
        // 按照题目要求排序输出
        if (coprimeTriples.empty()) {
            cout << "NA" << endl;
        } else {
            sort(coprimeTriples.begin(), coprimeTriples.end(), [](const vector<int>& a, const vector<int>& b) {
                if (a[0] != b[0]) {
                    return a[0] < b[0];
                } else if (a[1] != b[1]) {
                    return a[1] < b[1];
                } else {
                    return a[2] < b[2];
                }
            });
            for (auto &triple : coprimeTriples) {
                cout << triple[0] << " " << triple[1] << " " << triple[2] << endl;
            }
        }
        return 0;
    }
    
    
    

## C语言

    
    
    #include <stdio.h>
    #include <math.h>
    
    int isRelativePrime(int x, int y) {
        while (y > 0) {
            int mod = x % y;
            x = y;
            y = mod;
        }
        return x == 1;
    }
    
    int main() {
        int start, end;
        scanf("%d", &start);
        scanf("%d", &end);
    
        int ans[10000][3];  // 假设最多有 10000 组解
        int ansCount = 0;
    
        int k = (int)ceil(sqrt(end));
    
        for (int y = 1; y < k; y++) {
            for (int x = y + 1; x < k; x++) {
                if (isRelativePrime(x, y) && (x + y) % 2 == 1) {
                    int a = x * x - y * y;
                    int b = 2 * x * y;
                    int c = x * x + y * y;
    
                    if (a >= start && b >= start && c <= end) {
                        if (a < b) {
                            ans[ansCount][0] = a;
                            ans[ansCount][1] = b;
                        } else {
                            ans[ansCount][0] = b;
                            ans[ansCount][1] = a;
                        }
                        ans[ansCount][2] = c;
                        ansCount++;
                    }
                }
            }
        }
    
        if (ansCount > 0) {
            // 排序
            for (int i = 0; i < ansCount - 1; i++) {
                for (int j = i + 1; j < ansCount; j++) {
                    if (ans[i][0] > ans[j][0] || 
                        (ans[i][0] == ans[j][0] && ans[i][1] > ans[j][1]) || 
                        (ans[i][0] == ans[j][0] && ans[i][1] == ans[j][1] && ans[i][2] > ans[j][2])) {
                        int temp[3];
                        temp[0] = ans[i][0];
                        temp[1] = ans[i][1];
                        temp[2] = ans[i][2];
                        ans[i][0] = ans[j][0];
                        ans[i][1] = ans[j][1];
                        ans[i][2] = ans[j][2];
                        ans[j][0] = temp[0];
                        ans[j][1] = temp[1];
                        ans[j][2] = temp[2];
                    }
                }
            }
    
            // 输出结果
            for (int i = 0; i < ansCount; i++) {
                printf("%d %d %d\n", ans[i][0], ans[i][1], ans[i][2]);
            }
        } else {
            printf("NA\n");
        }
    
        return 0;
    }
    
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

#### 完整用例

##### 用例1

    
    
    1
    5
    

##### 用例2

    
    
    1
    10
    

##### 用例3

    
    
    1
    20
    

##### 用例4

    
    
    5
    10
    

##### 用例5

    
    
    5
    20
    

##### 用例6

    
    
    10
    20
    

##### 用例7

    
    
    1
    30
    

##### 用例8

    
    
    1
    40
    

##### 用例9

    
    
    10
    40
    

##### 用例10

    
    
    20
    40
    

