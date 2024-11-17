## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

有一个特异性的双端队列，该队列可以从头部或尾部添加数据，但是只能从头部移出数据。

小A依次执行2n个指令往队列中添加数据和移出数据。其中n个指令是添加数据（可能从头部添加、也可能从尾部添加），依次添加1到n；n个指令是移出数据。

现在要求移除数据的顺序为1到n。

为了满足最后输出的要求，小A可以在任何时候调整队列中数据的顺序。

请问 小A 最少需要调整几次才能够满足移除数据的顺序正好是1到n。

## 输入描述

第一行一个数据n，表示数据的范围。

接下来的2n行，其中有n行为添加数据，指令为：

  * `head add x`表示从头部添加数据 x，
  * `tail add x` 表示从尾部添加数据x，

另外 n 行为移出数据指令，指令为：`remove` 的形式，表示移出1个数据；

1 ≤ n ≤ 3 * 10^5。

所有的数据均合法。

## 输出描述

一个整数，表示 小A 要调整的最小次数。

## 示例1

输入

    
    
    5
    head add 1
    tail add 2
    remove
    head add 3
    tail add 4
    head add 5
    remove
    remove
    remove
    remove
    

输出

    
    
    1
    

说明

> ## 解题思路

## Java

    
    
    import java.util.*;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            int number = scanner.nextInt();//数据的范围
            scanner.nextLine();
    
            Queue<Integer> queue = new LinkedList<>();//模拟双端队列
            boolean in_order = true;//是否按顺序删除
            int result = 0;//最小的调整顺序次数
    
            for (int i = 0; i < 2 * number; i++) {
                String input_str = scanner.nextLine();
                String[] operation = input_str.split(" ");
                if (operation[0].equals("head")) {//从头部添加元素
                    if (!queue.isEmpty() && in_order) {//不按顺序删除
                        in_order = false;
                    }
                    queue.add(Integer.parseInt(operation[2]));
                } else if (operation[0].equals("tail")) {//从尾部添加元素
                    queue.add(Integer.parseInt(operation[2]));
                } else {//删除元素
                    if (queue.isEmpty()) {
                        continue;
                    }
                    if (!in_order) {//不按顺序删除
                        result++;
                        in_order = true;
                    }
                    queue.poll();
                }
            }
    
            System.out.println(result);//输出最小的调整顺序次数
        }
    }
    
    

## Python

    
    
    from collections import deque
    
    number = int(input()) # 数据的范围
    
    queue = deque() # 模拟双端队列
    in_order = True # 是否按顺序删除
    result = 0 # 最小的调整顺序次数
    
    for i in range(2 * number):
        input_str = input()
        operation = input_str.split(" ")
        if operation[0] == "head": # 从头部添加元素
            if len(queue) != 0 and in_order: # 不按顺序删除
                in_order = False
            queue.appendleft(int(operation[2]))
        elif operation[0] == "tail": # 从尾部添加元素
            queue.append(int(operation[2]))
        else: # 删除元素
            if len(queue) == 0:
                continue
            if not in_order: # 不按顺序删除
                result += 1
                in_order = True
            queue.pop()
    
    print(result) # 输出最小的调整顺序次数
    
    

## JavaScript

    
    
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    let number = 0;
    let operations = [];
    
    rl.on('line', (input) => {
      if (number === 0) {
        number = parseInt(input);
      } else {
        operations.push(input.split(" "));
        if (operations.length === 2 * number) {
          rl.close();
        }
      }
    });
    
    const queue = []; // 模拟双端队列
    let in_order = true; // 是否按顺序删除
    let result = 0; // 最小的调整顺序次数
    
    rl.on('close', () => {
      for (let i = 0; i < 2 * number; i++) {
        const operation = operations[i];
         if (operation[0] === "head") { // 从头部添加元素
          if (queue.length !== 0 && in_order) { // 不按顺序删除
            in_order = false;
          }
          queue.unshift(parseInt(operation[2]));
        } else if (operation[0] === "tail") { // 从尾部添加元素
          queue.push(parseInt(operation[2]));
        } else { // 删除元素
          if (queue.length === 0) {
            continue;
          }
          if (!in_order) { // 不按顺序删除
            result += 1;
            in_order = true;
          }
          queue.pop();
        }
      }
      console.log(result); // 输出最小的调整顺序次数
    });
    
    
    

## C++

    
    
    #include <iostream>
    #include <queue>
    using namespace std;
    
    int main() {
        int number;
        cin >> number;
        cin.ignore();
    
        queue<int> queue;
        bool in_order = true;
        int result = 0;
    
        for (int i = 0; i < 2 * number; i++) {
            string input_str;
            getline(cin, input_str);
            string operation[3];
            int j = 0;
            for (char c : input_str) {
                if (c == ' ') {
                    j++;
                } else {
                    operation[j] += c;
                }
            }
            if (operation[0] == "head") {
                if (!queue.empty() && in_order) {
                    in_order = false;
                }
                queue.push(stoi(operation[2]));
            } else if (operation[0] == "tail") {
                queue.push(stoi(operation[2]));
            } else {
                if (queue.empty()) {
                    continue;
                }
                if (!in_order) {
                    result++;
                    in_order = true;
                }
                queue.pop();
            }
        }
    
        cout << result << endl;
        return 0;
    }
    
    
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    #include <string.h>
    
    int main() {
        int number;
        scanf("%d\n", &number); // 读取数据范围
    
        int queue[2000]; // 假设队列足够大
        int front = 0, rear = 0; // 队列的头和尾索引
        int in_order = 1; // 是否按顺序删除
        int result = 0; // 最小的调整顺序次数
        char line[100], operation[10];
        int value;
    
        for (int i = 0; i < 2 * number; i++) {
            fgets(line, sizeof(line), stdin); // 读取一行输入
            sscanf(line, "%s %*d %d", operation, &value); // 解析操作和值
    
            if (strcmp(operation, "head") == 0) { // 从头部添加元素
                if (rear != front && in_order) { // 不按顺序删除
                    in_order = 0;
                }
                queue[front] = value; // 添加元素到队列头
                front = (front + 1) % 2000; // 更新头部索引
            } else if (strcmp(operation, "tail") == 0) { // 从尾部添加元素
                rear = (rear - 1 + 2000) % 2000; // 更新尾部索引
                queue[rear] = value; // 添加元素到队列尾
            } else { // 删除元素
                if (rear == front) { // 队列为空
                    continue;
                }
                if (!in_order) { // 不按顺序删除
                    result++;
                    in_order = 1;
                }
                rear = (rear + 1) % 2000; // 更新尾部索引
            }
        }
    
        printf("%d\n", result); // 输出最小的调整顺序次数
        return 0;
    }
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/e341a0a4306932b67ce275493854ebb1.png)

