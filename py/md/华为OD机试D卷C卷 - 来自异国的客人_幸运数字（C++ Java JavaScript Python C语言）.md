## 题目描述

有位客人来自异国，在该国使用m进制计数。该客人有个幸运数字n(n<m)，每次购物时，其总是喜欢计算本次支付的花费(折算为异国的价格后)中存在多少幸运数字。问：当其购买一个在我国价值k的产品时，其中包含多少幸运数字？

## 输入描述

第一行输入为 k, n, m。

其中：

  * k 表示 该客人购买的物品价值（以十进制计算的价格）

  * n 表示 该客人的幸运数字

  * m 表示 该客人所在国度的采用的进制

## 输出描述

输出幸运数字的个数，行末无空格。**当输入非法内容时，输出0**

## 用例1

输入：

    
    
    10 2 4
    

输出：

    
    
    2
    

说明：

> 10用4进制表示时为22，同时，异国客人的幸运数字是2，故而此处输出为2，表示有2个幸运数字。

## 用例2

输入：

    
    
    10 4 4
    

输出：

    
    
    0
    

说明：

> 此时客人的幸运数字为4，但是由于该国最大为4进制，故而在该国的进制下不可能出现幸运数字，故而返回0

## 解题思路

将十进制数转换为其他进制数的基本方法是除法-取余数。以下是将十进制数转换为其他进制数的步骤：

  1. 将十进制数除以目标进制数，得到商和余数。
  2. 记录余数。
  3. 将商再除以目标进制数。
  4. 重复步骤2和3，直到商为0。
  5. 将记录的余数倒序排列，得到的就是转换后的数。

### 将十进制数13转换为二进制数：

  1. 13除以2，商为6，余数为1。
  2. 记录余数1。
  3. 6除以2，商为3，余数为0。
  4. 记录余数0。
  5. 3除以2，商为1，余数为1。
  6. 记录余数1。
  7. 1除以2，商为0，余数为1。
  8. 记录余数1。
  9. 将记录的余数倒序排列，得到1101。

所以，十进制数13转换为二进制数是1101。

在编程中，这个过程可以通过循环来实现。每次迭代，都将数除以进制数，并将余数添加到结果中。当数为0时，结束循环。最后，将结果反转，就得到了转换后的数。

### 将十进制数13转换为四进制数的步骤如下：

  1. 13除以4，商为3，余数为1。
  2. 记录余数1。
  3. 3除以4，商为0，余数为3。
  4. 记录余数3。
  5. 将记录的余数倒序排列，得到31。

所以，十进制数13转换为四进制数是31。

### 将十进制数10转换为四进制数的步骤如下：

  1. 10除以4，商为2，余数为2。
  2. 记录余数2。
  3. 2除以4，商为0，余数为2。
  4. 记录余数2。
  5. 将记录的余数倒序排列，得到22。

所以，十进制数10转换为四进制数是22。

## C++

    
    
    #include <iostream>
    using namespace std;
    int main() {
        int k, n, m;
        cin >> k >> n >> m;
    
        // 检查输入是否合法
        if (k < 0 || n < 0 || m <= 1 || n >= m) {
            cout << 0;
            return 0;
        }
    
        int count = 0;
        while (k > 0) {
            // 如果当前位是幸运数字，计数器加1
            if (k % m == n) {
                count++;
            }
            // 将k转换为m进制
            k /= m;
        }
    
        cout << count;
    
        return 0;
    }
    

## Java

    
    
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            Scanner sc = new Scanner(System.in);
            int k = sc.nextInt();
            int n = sc.nextInt();
            int m = sc.nextInt();
            sc.close();
    
            // 检查输入是否合法
            if (k < 0 || n < 0 || m <= 1 || n >= m) {
                System.out.println(0);
                return;
            }
    
            int count = 0;
            while (k > 0) {
                // 如果当前位是幸运数字，计数器加1
                if (k % m == n) {
                    count++;
                }
                // 将k转换为m进制
                k /= m;
            }
    
            System.out.println(count);
        }
    }
    

## javaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    rl.on('line', (input) => {
        let [k, n, m] = input.split(' ').map(Number);
    
        // 检查输入是否合法
        if (k < 0 || n < 0 || m <= 1 || n >= m) {
            console.log(0);
        } else {
            let count = 0;
            while (k > 0) {
                // 如果当前位是幸运数字，计数器加1
                if (k % m === n) {
                    count += 1;
                }
                // 将k转换为m进制
                k = Math.floor(k / m);
            }
    
            console.log(count);
        }
    });
    

## Python

    
    
    k, n, m = map(int, input().split())
    
    # 检查输入是否合法
    if k < 0 or n < 0 or m <= 1 or n >= m:
        print(0)
    else:
        count = 0
        while k > 0:
            # 如果当前位是幸运数字，计数器加1
            if k % m == n:
                count += 1
            # 将k转换为m进制
            k //= m
    
        print(count)
    

## C语言

    
    
    #include <stdio.h>
    
    int main() {
        int k, n, m;
        // 读取输入的k, n, m
        scanf("%d %d %d", &k, &n, &m);
    
        // 检查输入是否合法
        if (k < 0 || n < 0 || m <= 1 || n >= m) {
            printf("0");
            return 0;
        }
    
        int count = 0; // 用于计数幸运数字的出现次数
        while (k > 0) {
            // 如果当前位是幸运数字，计数器加1
            if (k % m == n) {
                count++;
            }
            // 将k转换为m进制
            k /= m;
        }
    
        // 输出幸运数字的个数
        printf("%d", count);
    
        return 0;
    }
    

## 完整用例

### 用例1

10 2 4

### 用例2

10 4 4

### 用例3

0 1 10

### 用例4

10 0 10

### 用例5

123456789 10 5

### 用例6

4 4 4

### 用例7

-1 -1 -1

### 用例8

255 15 16

### 用例9

9973 1 10

### 用例10

100 1 8  

#### 文章目录

  * 题目描述
  * 输入描述
  * 输出描述
  * 用例1
  * 用例2
  * 解题思路
  *     * 将十进制数13转换为二进制数：
    * 将十进制数13转换为四进制数的步骤如下：
    * 将十进制数10转换为四进制数的步骤如下：
  * C++
  * Java
  * javaScript
  * Python
  * C语言
  * 完整用例
  *     * 用例1
    * 用例2
    * 用例3
    * 用例4
    * 用例5
    * 用例6
    * 用例7
    * 用例8
    * 用例9
    * 用例10

![fengmian](https://i-blog.csdnimg.cn/blog_migrate/752d660e2f4355254ca3a1975679ec0e.png)

