## 题目描述

在学校中，N个小朋友站成一队， 第i个小朋友的身高为height[i]，

第i个小朋友可以看到的第一个比自己身高更高的小朋友j，那么j是i的好朋友(要求j > i)。

请重新生成一个列表，对应位置的输出是每个小朋友的好朋友位置，如果没有看到好朋友，请在该位置用0代替。

小朋友人数范围是 [0, 40000]。

## 输入描述

第一行输入N，N表示有N个小朋友

第二行输入N个小朋友的身高height[i]，都是整数

## 输出描述

输出N个小朋友的好朋友的位置

## 用例1

输入

    
    
    2
    100 95
    

输出

    
    
    0 0
    

说明

> 第一个小朋友身高100，站在队尾位置，向队首看，没有比他身高高的小朋友，所以输出第一个值为0。  
>  第二个小朋友站在队首，前面也没有比他身高高的小朋友，所以输出第二个值为0。

## 用例2

输入

    
    
    8
    123 124 125 121 119 122 126 123
    

输出

    
    
    1 2 6 5 5 6 0 0
    

说明

> 123的好朋友是1位置上的124  
>  124的好朋友是2位置上的125  
>  125的好朋友是6位置上的126  
>  以此类推

## C++

    
    
    #include <iostream>
    #include <vector>
    #include <stack>
    #include <sstream>
    
    using namespace std;
    
    int main() {
        int n;
        cin >> n;
        
        vector<int> heights(n);
        for (int i = 0; i < n; i++) {
            cin >> heights[i];
        }
        
        vector<int> friendIndexes(n);
        stack<int> stack;
        stack.push(0);
        for (int i = 1; i < n; i++) {
            while (!stack.empty() && heights[i] > heights[stack.top()]) {
                friendIndexes[stack.top()] = i;
                stack.pop();
            }
            stack.push(i);
        }
        
        stringstream result;
        for (int i = 0; i < n; i++) {
            result << friendIndexes[i] << " ";
        }
        cout << result.str().substr(0, result.str().size() - 1) << endl;
        
        return 0;
    }
    

## javaScript

    
    
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    let n = 0;
    let height = [];
    
    rl.on('line', (input) => {
      if (!n) {
        n = parseInt(input.trim());
      } else {
        height = input.trim().split(' ').map(Number);
        
        let friendIndexes = new Array(n).fill(0);
        let stack = [0];
        for (let i = 1; i < n; i++) {
            while (stack.length && height[i] > height[stack[stack.length - 1]]) {
                friendIndexes[stack.pop()] = i;
            }
            stack.push(i);
        }
        
        let result = "";
        for (let i = 0; i < n; i++) {
            result += friendIndexes[i] + " ";
        }
        console.log(result.trim());
      }
    });
    

## java

    
    
    import java.util.Scanner;
    import java.util.Stack;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            
            // 输入小朋友的数量
            int n = Integer.parseInt(scanner.nextLine());
            
            // 输入小朋友的身高
            int[] heights = new int[n];
            String[] input = scanner.nextLine().split(" ");
            for (int i = 0; i < n; i++) {
                heights[i] = Integer.parseInt(input[i]);
            }
            
            // 用于存储每个小朋友的好朋友位置
            int[] friendIndexes = new int[n];
            
            // 使用栈来记录每个小朋友的位置
            Stack<Integer> stack = new Stack<>();
            stack.push(0);
            for (int i = 1; i < n; i++) {
                while (!stack.isEmpty() && heights[i] > heights[stack.peek()]) {
                    // 如果当前小朋友的身高大于栈顶小朋友的身高，则栈顶小朋友的好朋友位置为当前小朋友的位置
                    friendIndexes[stack.pop()] = i;
                }
                stack.push(i);
            }
            
            // 输出每个小朋友的好朋友位置
            StringBuilder result = new StringBuilder();
            for (int i = 0; i < n; i++) {
                result.append(friendIndexes[i]).append(" ");
            }
            System.out.println(result.toString().trim());
        }
    }
    

## python

    
    
    import sys
    
    # 输入小朋友的数量
    n = int(input())
    
    # 输入小朋友的身高
    heights = list(map(int, input().split()))
    
    # 用于存储每个小朋友的好朋友位置
    friendIndexes = [0] * n
    
    # 使用栈来记录每个小朋友的位置
    stack = [0]
    for i in range(1, n):
        while stack and heights[i] > heights[stack[-1]]:
            # 如果当前小朋友的身高大于栈顶小朋友的身高，则栈顶小朋友的好朋友位置为当前小朋友的位置
            friendIndexes[stack.pop()] = i
        stack.append(i)
    
    # 输出每个小朋友的好朋友位置
    result = ""
    for i in range(n):
        result += str(friendIndexes[i]) + " "
    print(result.strip())
    

## C语言

    
    
    #include <stdio.h>
    
    #define MAX_N 40000
    
    int main() {
        int n;
        scanf("%d", &n); // 读取小朋友的数量
    
        int heights[MAX_N]; // 存储每个小朋友的身高
        for (int i = 0; i < n; i++) {
            scanf("%d", &heights[i]); // 读取每个小朋友的身高
        }
    
        int friendIndexes[MAX_N] = {0}; // 存储每个小朋友的好朋友的位置，初始化为0
        int stack[MAX_N]; // 存储小朋友的索引，用作栈
        int top = 0; // 栈顶指针
        stack[top] = 0; // 将第一个小朋友的索引压入栈
    
        for (int i = 1; i < n; i++) {
            // 当栈不为空且当前小朋友的身高大于栈顶小朋友的身高时
            while (top >= 0 && heights[i] > heights[stack[top]]) {
                // 更新栈顶小朋友的好朋友的位置为当前小朋友的位置
                friendIndexes[stack[top]] = i;
                // 弹出栈顶元素
                top--;
            }
            // 将当前小朋友的索引压入栈
            stack[++top] = i;
        }
    
        // 输出每个小朋友的好朋友的位置
        for (int i = 0; i < n; i++) {
            printf("%d ", friendIndexes[i]);
        }
    
        return 0;
    }
    

## 完整用例

### 用例1

    
    
    2
    100 95
    

### 用例2

    
    
    5
    120 125 130 115 110
    

### 用例3

    
    
    3
    105 100 110
    

### 用例4

    
    
    4
    115 120 125 110
    

### 用例5

    
    
    6
    130 125 120 135 140 115
    

### 用例6

    
    
    8
    123 124 125 121 119 122 126 123
    

### 用例7

    
    
    10
    130 135 140 125 120 115 110 145 150 105
    

### 用例8

    
    
    15
    120 125 130 135 140 115 110 105 100 145 150 155 160 165 170
    

### 用例9

    
    
    6
    100 95 105 90 110 85
    

### 用例10

    
    
    12
    120 125 130 135 140 115 110 105 100 145 150 155
    

#### 文章目录

  * 题目描述
  * 输入描述
  * 输出描述
  * 用例1
  * 用例2
  * C++
  * javaScript
  * java
  * python
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

![fengmian](https://i-blog.csdnimg.cn/blog_migrate/cf6c770abbbd59f15d8d79b21745fd2f.png)

