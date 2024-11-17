## 题目描述

小明在玩一个游戏，游戏规则如下：在游戏开始前，小明站在坐标轴原点处（坐标值为0）.

给定一组指令和一个幸运数，每个指令都是一个整数，小明按照指令前进指定步数或者后退指定步数。前进代表朝坐标轴的正方向走，后退代表朝坐标轴的负方向走。

幸运数为一个整数，如果某个指令正好和幸运数相等，则小明行进步数+1。

例如：

幸运数为3，指令为[2,3,0,-5]

指令为2，表示前进2步；

指令为3，正好和幸运数相等，前进3+1=4步；

指令为0，表示原地不动，既不前进，也不后退。

指令为-5，表示后退5步。

请你计算小明在整个游戏过程中，小明所处的最大坐标值。

## 输入描述

第一行输入1个数字，代表指令的总个数 n（1 ≤ n ≤ 100）

第二行输入1个数字，代表幸运数m（-100 ≤ m ≤ 100）

第三行输入n个指令，每个指令的取值范围为：-100 ≤ 指令值 ≤ 100

## 输出描述

输出在整个游戏过程中，小明所处的最大坐标值。异常情况下输出：12345

## 用例1

输入

    
    
    2
    1
    -5 1
    

输出

    
    
    0
    

说明

> 总共2个指令，幸运数为1，按照指令行进，依次如下游戏开始前，站在坐标轴原点，此时坐标值为0；
>
> 指令为-5，后退5步，此时坐标值为-5；
>
> 指令为1，正好等于幸运数，前进1+1=2步，此时坐标值为-3；
>
> 整个游戏过程中，小明所处的坐标值依次为[0, -5, -3]，最大坐标值为0。

## 用例2

输入

    
    
    5
    -5
    -5 1 6 0 -7
    

输出

    
    
    1
    

说明

> 总共5个指令，幸运数为-5，依照指令行进，依次如下：
>
> 游戏开始前，站在坐标轴原点，此时坐标值为0，
>
> 指令为-5，正好等于幸运数，后退5+1=6步，此时坐标值为-6；
>
> 指令为1，前进1步，此时坐标值为-5；
>
> 指令为6，前进6步，此时坐标值为1；
>
> 指令为0，既不前进，也不后退，此时坐标值为1；
>
> 指令为-7，后退7步，此时坐标值为-6。
>
> 整个游戏过程中，小明所处的坐标值依次为：
>
> [0, -6, -5, 1, 1, -6]，最大坐标值为1。

## 解题思路

本题就模拟计算,主要注意幸运数字是0的情况.

## C++

    
    
    #include <iostream>
    #include <vector>
    #include <sstream>
    #include <algorithm>
    
    using namespace std;
    
    int main() {
        // 创建一个新的扫描器实例
        string line;
        
        // 读取用户输入的整数n和l
        getline(cin, line);
        int n = stoi(line);
        getline(cin, line);
        int lucky = stoi(line);
    
        // 检查输入的整数n和l是否在指定的范围内
        if (n < 1 || n > 100 || lucky < -100 || lucky > 100) {
            cout << "12345" << endl;
            return 0;
        }
    
        // 初始化位置变量p和最大位置变量mp
        int p = 0;
        int mp = 0;
    
        // 读取用户输入的整数cmd
        getline(cin, line);
        stringstream ss(line);
        vector<int> cmds;
        for (int i = 0; i < n; i++) {
            int cmd;
            ss >> cmd;
            cmds.push_back(cmd);
        }
    
        // 对于每一个输入的整数
        for (int i = 0; i < n; i++) {
            int cmd = cmds[i];
    
            // 检查输入的整数cmd是否在指定的范围内
            if (cmd < -100 || cmd > 100) {
                cout << "12345" << endl;
                return 0;
            }
            // 如果输入的整数cmd等于l
            if (cmd == lucky) {
                // 如果cmd大于0，那么位置p增加cmd+1
                if (cmd > 0) {
                    p += cmd + 1;
                } else if(cmd < 0){
                    // 否则，位置p减少cmd-1
                    p += cmd - 1;
                }
            } else {
                // 如果输入的整数cmd不等于l，那么位置p增加cmd
                p += cmd;
            }
            // 更新最大位置变量mp
            mp = max(mp, p);
        }
    
        // 打印最大位置变量mp
        cout << mp << endl;
    
        return 0;
    }
    

## Java

    
    
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            // 创建一个新的扫描器实例
            Scanner sc = new Scanner(System.in);
    
            // 读取用户输入的整数n和l
            int n = Integer.parseInt(sc.nextLine());
            int lucky = Integer.parseInt(sc.nextLine());
    
            // 检查输入的整数n和l是否在指定的范围内
            if (n < 1 || n > 100 || lucky < -100 || lucky > 100) {
                System.out.println("12345");
                return;
            }
    
            // 初始化位置变量p和最大位置变量mp
            int p = 0;
            int mp = 0;
    
            // 读取用户输入的整数cmd
            String[] cmds = sc.nextLine().split(" ");
    
            // 对于每一个输入的整数
            for (int i = 0; i < n; i++) {
                int cmd = Integer.parseInt(cmds[i]);
    
                // 检查输入的整数cmd是否在指定的范围内
                if (cmd < -100 || cmd > 100) {
                    System.out.println("12345");
                    return;
                }
                // 如果输入的整数cmd等于l
                if (cmd == lucky) {
                    // 如果cmd大于0，那么位置p增加cmd+1
                    if (cmd > 0) {
                        p += cmd + 1;
                    } else if(cmd < 0){
                        // 否则，位置p减少cmd-1
                        p += cmd - 1;
                    }
                } else {
                    // 如果输入的整数cmd不等于l，那么位置p增加cmd
                    p += cmd;
                }
                // 更新最大位置变量mp
                mp = Math.max(mp, p);
            }
    
            // 打印最大位置变量mp
            System.out.println(mp);
        }
    }
    

## javaScript

    
    
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    // 创建一个新的扫描器实例
    let input = [];
    
    readline.on('line', (line) => {
        input.push(line);
    });
    
    readline.on('close', () => {
        // 读取用户输入的整数n和l
        let n = parseInt(input[0]);
        let lucky = parseInt(input[1]);
    
        // 检查输入的整数n和l是否在指定的范围内
        if (n < 1 || n > 100 || lucky < -100 || lucky > 100) {
            console.log("12345");
            process.exit(0);
        }
    
        // 初始化位置变量p和最大位置变量mp
        let p = 0;
        let mp = 0;
    
        // 读取用户输入的整数cmd
        let cmds = input[2].split(" ").map(Number);
    
        // 对于每一个输入的整数
        for (let i = 0; i < n; i++) {
            let cmd = cmds[i];
    
            // 检查输入的整数cmd是否在指定的范围内
            if (cmd < -100 || cmd > 100) {
                console.log("12345");
                process.exit(0);
            }
            // 如果输入的整数cmd等于l
            if (cmd == lucky) {
                // 如果cmd大于0，那么位置p增加cmd+1
                if (cmd > 0) {
                    p += cmd + 1;
                } else if(cmd < 0){
                    // 否则，位置p减少cmd-1
                    p += cmd - 1;
                }
            } else {
                // 如果输入的整数cmd不等于l，那么位置p增加cmd
                p += cmd;
            }
            // 更新最大位置变量mp
            mp = Math.max(mp, p);
        }
    
        // 打印最大位置变量mp
        console.log(mp);
    });
    

## Python

    
    
    # 创建一个新的扫描器实例
    import sys
    
    # 读取用户输入的整数n和l
    n = int(sys.stdin.readline())
    lucky = int(sys.stdin.readline())
    
    # 检查输入的整数n和l是否在指定的范围内
    if n < 1 or n > 100 or lucky < -100 or lucky > 100:
        print("12345")
        sys.exit()
    
    # 初始化位置变量p和最大位置变量mp
    p = 0
    mp = 0
    
    # 读取用户输入的整数cmd
    cmds = list(map(int, sys.stdin.readline().split()))
    
    # 对于每一个输入的整数
    for i in range(n):
        cmd = cmds[i]
    
        # 检查输入的整数cmd是否在指定的范围内
        if cmd < -100 or cmd > 100:
            print("12345")
            sys.exit()
        # 如果输入的整数cmd等于l
        if cmd == lucky:
            # 如果cmd大于0，那么位置p增加cmd+1
            if cmd > 0:
                p += cmd + 1
            elif cmd < 0:
                # 否则，位置p减少cmd-1
                p += cmd - 1
        else:
            # 如果输入的整数cmd不等于l，那么位置p增加cmd
            p += cmd
        # 更新最大位置变量mp
        mp = max(mp, p)
    
    # 打印最大位置变量mp
    print(mp)
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    #include <string.h>
    
    int main() {
        int n, lucky;
        
        // 读取指令的总个数n和幸运数lucky
        scanf("%d", &n);
        scanf("%d", &lucky);
    
        // 检查n和lucky的值是否在指定范围内
        if (n < 1 || n > 100 || lucky < -100 || lucky > 100) {
            printf("12345\n");
            return 0;
        }
    
        int pos = 0; // 当前位置
        int maxPos = 0; // 记录最大位置
    
        // 遍历所有指令
        for (int i = 0; i < n; i++) {
            int cmd;
            scanf("%d", &cmd);
    
            // 检查指令值是否在指定范围内
            if (cmd < -100 || cmd > 100) {
                printf("12345\n");
                return 0;
            }
    
            // 如果指令值等于幸运数
            if (cmd == lucky) {
                // 根据指令正负决定如何处理步数
                if (cmd > 0) {
                    pos += cmd + 1;
                } else if (cmd < 0) {
                    pos += cmd - 1;
                }
            } else {
                // 正常处理指令
                pos += cmd;
            }
    
            // 更新最大位置
            if (pos > maxPos) {
                maxPos = pos;
            }
        }
    
        // 输出最大位置
        printf("%d\n", maxPos);
    
        return 0;
    }
    

#### 完整用例

### 用例1

    
    
    9
    -3
    3 -3 -6 -3 -3 3 -3 -3 -3
    

### 用例2

    
    
    20
    10
    5 10 -3 -10 5 10 1 2 3 -4 5 6 7 8 9 10 -1 -2 -3 -10
    

### 用例3

    
    
    15
    0
    -1 0 1 2 3 4 5 6 7 8 9 10 11 12 13
    

### 用例4

    
    
    12
    5
    1 2 3 4 -1 -2 -3 -4 1 2 3 4
    

### 用例5

    
    
    10
    2
    3 4 5 6 7 8 9 10 11 12
    

### 用例6

    
    
    20
    -2
    -2 -2 -3 -4 -5 -6 -7 -8 -9 -10 -1 -2 -3 -4 -5 -6 -7 -8 -9 -10
    

### 用例7

    
    
    7
    7
    1 7 -3 7 2 7 -1
    

### 用例8

    
    
    4
    8
    9 6 5 -7
    

### 用例9

    
    
    6
    -5
    -5 -6 0 -5 -7 -8
    

### 用例10

    
    
    5
    0
    0 0 0 0 0
    

#### 文章目录

  * 题目描述
  * 输入描述
  * 输出描述
  * 用例1
  * 用例2
  * 解题思路
  * C++
  * Java
  * javaScript
  * Python
  * C语言
  *     *       * 完整用例
    * 用例1
    * 用例2
    * 用例3
    * 用例4
    * 用例5
    * 用例6
    * 用例7
    * 用例8
    * 用例9
    * 用例10

![fengmian](https://i-blog.csdnimg.cn/blog_migrate/aad8017ecfdf926acfe723e9ca8bda7a.png)

