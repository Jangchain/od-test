## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

程序员小明打了一辆出租车去上班。出于职业敏感，他注意到这辆出租车的计费表有点问题，总是偏大。

出租车司机解释说他不喜欢数字4，所以改装了计费表，任何数字位置遇到数字4就直接跳过，其余功能都正常。

比如：

23再多一块钱就变为25；  
39再多一块钱变为50；  
399再多一块钱变为500；  
小明识破了司机的伎俩，准备利用自己的学识打败司机的阴谋。

给出计费表的表面读数，返回实际产生的费用。

## 输入描述

只有一行，数字N，表示里程表的读数。

(1<=N<=888888888)。

## 输出描述

一个数字，表示实际产生的费用。以回车结束。

## 示例1

输入

    
    
    5
    

输出

    
    
    4
    

说明

> 5表示计费表的表面读数。4表示实际产生的费用其实只有4块钱。

## 示例2

输入

    
    
    17
    

输出

    
    
    15
    

说明

> 17表示计费表的表面读数。15表示实际产生的费用其实只有15块钱。

## 示例3

输入

    
    
    100
    

输出

    
    
    81
    

说明

> 100表示计费表的表面读数。81表示实际产生的费用其实只有81块钱。

## 解题思路

我们需要理解出租车司机改装计费表的方式。司机不喜欢数字4，所以他的计费表从1开始计数，直到3，然后跳过4，继续从5计数。这意味着计费表上的每一位数字实际上只有9种可能的值：0,
1, 2, 3, 5, 6, 7, 8, 9（跳过了4）。因此，这个计费表实际上是在使用一个基数为9的数制系统。

现在，让我们用三个用例来解释这个过程：

  1. 输入：5  
输出：4  
解释：由于计费表跳过了数字4，所以表面读数5实际上是9进制中的5。在10进制中，这是4。

  2. 输入：17  
输出：15  
解释：表面读数17在9进制中表示为 1 ∗ 9 1 1 * 9^1 1∗91 \+  7 ∗ 9 0 7*9^0
7∗90。但是，因为我们跳过了4，所以实际的计算应该是 1 ∗ 9 1 \+ 6 ∗ 9 0 1*9^1 + 6*9^0
1∗91+6∗90（因为7实际上是8，但我们要减去1以补偿跳过的4），这等于9 + 6 = 15。

  3. 输入：100  
输出：81  
解释：表面读数100在9进制中表示为 1 ∗ 9 2 \+ 0 ∗ 9 1 \+ 0 ∗ 9 0 1*9^2 + 0*9^1 + 0*9^0
1∗92+0∗91+0∗90。在10进制中，这等于81。

因此，通过将表面读数视为9进制数，并将其转换为10进制数，同时考虑到跳过的4，我们可以得到实际产生的费用。这就是为什么我们使用9进制进行求解的原因。

特殊9进制数| 10进制数| 9进制展开形式  
---|---|---  
1| 1| 1*9^0  
2| 2| 2*9^0  
3| 3| 3*9^0  
5| 4| 4*9^0  
6| 5| 5*9^0  
7| 6| 6*9^0  
8| 7| 7*9^0  
9| 8| 8*9^0  
10| 9| 1 _9^1 + 0_ 9^0  
11| 10| 1 _9^1 + 1_ 9^0  
12| 11| 1 _9^1 + 2_ 9^0  
13| 12| 1 _9^1 + 3_ 9^0  
15| 13| 1 _9^1 + 4_ 9^0  
16| 14| 1 _9^1 + 5_ 9^0  
17| 15| 1 _9^1 + 6_ 9^0  
18| 16| 1 _9^1 + 7_ 9^0  
19| 17| 1 _9^1 + 8_ 9^0  
20| 18| 2 _9^1 + 0_ 9^0  
21| 19| 2 _9^1 + 1_ 9^0  
22| 20| 2 _9^1 + 2_ 9^0  
  
在这个特殊的9进制系统中，我们跳过了数字4，所以当我们看到特殊9进制数15时，实际上是指真实9进制数13，它对应于10进制中的13（1 _9^1 + 4_
9^0）。注意，在这个系统中，我们将特殊9进制数转换为真实9进制数时，需要将每个大于4的数字减去1来得到真实的9进制数，然后再将其转换为10进制数。

## Java

    
    
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            String line = scanner.nextLine();
            int correct = 0;
            for (char c : line.toCharArray()) {
                int digit = c - '0';
                if (digit > 4) {
                    digit--;
                }
                correct = correct * 9 + digit;
            }
            System.out.println(correct);
        }
    }
    
    

## Python

    
    
    import sys
    
    line = sys.stdin.readline().strip()
    correct = 0
    for c in line:
        digit = int(c)
        if digit > 4:
            digit -= 1
        correct = correct * 9 + digit
    print(correct)
    
    
    

## JavaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.on('line', (line) => {
      let correct = 0;
      for (let i = 0; i < line.length; i++) {
        let digit = parseInt(line[i]);
        if (digit > 4) {
          digit--;
        }
        correct = correct * 9 + digit;
      }
      console.log(correct);
    });
    
    
    

## C++

    
    
    #include <iostream>
    #include <string>
    using namespace std;
    
    int main() {
        string line;
        // 读取输入的表面读数
        getline(cin, line);
        // 初始化实际产生的费用
        int correct = 0;
        // 遍历读数的每一位数字
        for (char c : line) {
            int digit = c - '0'; // 将字符转换为数字
            if (digit > 4) { // 如果数字大于4，则需要减1
                digit--;
            }
            correct = correct * 9 + digit; // 将每一位数字加入到实际产生的费用中
        }
        // 输出实际产生的费用
        cout << correct << endl;
        
        return 0;
    }
    
    
    

## C语言

    
    
    #include <stdio.h>
    #include <string.h>
    
    int main() {
        char line[10];  
        scanf("%s", line); // 读取输入的表面读数
    
        int correct = 0; // 初始化实际产生的费用
        int length = strlen(line); // 获取输入字符串的长度
    
        // 遍历读数的每一位数字
        for (int i = 0; i < length; i++) {
            int digit = line[i] - '0'; // 将字符转换为数字
    
            // 如果数字大于4，则需要减1，因为跳过了数字4
            if (digit > 4) {
                digit--;
            }
    
            correct = correct * 9 + digit; // 更新实际产生的费用
        }
    
        // 输出实际产生的费用
        printf("%d\n", correct);
        
        return 0;
    }
    
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b0d8ff6d53693bfcf6e1605b507f3ae3.png)

## 完整用例

### 用例1

5

### 用例2

17

### 用例3

162

### 用例4

323

### 用例5

500

### 用例6

888888888

### 用例7

987321

### 用例8

12367

### 用例9

12367

### 用例10

777777

