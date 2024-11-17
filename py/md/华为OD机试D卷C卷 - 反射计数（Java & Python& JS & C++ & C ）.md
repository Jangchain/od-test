## 题目描述

给定一个包含 0 和 1 的二维矩阵，给定一个初始位置和速度，一个物体从给定的初始位置触发, 在给定的速度下进行移动, 遇到矩阵的边缘则发生镜面反射。

无论物体经过 0 还是 1, 都不影响其速度

请计算并给出经过 t 时间单位后, 物体经过 1 点的次数

矩阵以左上角位置为[0, 0](列(x), 行(行)), 例如下面A点坐标为[2, 1] (第二列, 第一行)

    
    
    +--------------------------- 递增(x)
    | 0 0 1 0 0 0 0 1 0 0 0 0
    | 0 0 1 0 0 0 0 1 0 0 0 0
    | 0 0 1 0 0 0 0 1 0 0 0 0
    | 0 0 1 0 0 0 0 1 0 0 0 0
    | 0 0 1 0 0 0 0 1 0 0 0 0
    | 0 0 1 0 0 0 0 1 0 0 0 0
    | 0 0 1 0 0 0 0 1 0 0 0 0
    |
    递增(y)
    

注意:

  * 如果初始位置的点是 1, 也计算在内
  * 时间的最小单位为1, 不考虑小于 1 个时间单位内经过的点

## 输入描述

第一行为初始信息

> 第二行开始一共 h 行，为二维矩阵信息

其中：

  * w，h 为矩阵的宽和高

  * x，y 为起始位置

  * sx，sy 为初始速度

  * t 为经过的时间

所有输入都是有效的，数据范围如下：

  * 0 < w < 100
  * 0 < h < 100
  * 0 ≤ x < w
  * 0 ≤ y < h
  * -1 ≤ sx ≤ 1
  * -1 ≤ sy ≤ 1
  * 0 ≤ t ＜100

## 输出描述

经过 1 的个数

注意初始位置也要计算在内

## 用例

输入：

    
    
    12 7 2 1 1 -1 13
    001000010000
    001000010000
    001000010000
    001000010000
    001000010000
    001000010000
    001000010000
    

输出：

    
    
    3
    

说明：

> 初始位置为(2, 1), 速度为(1, -1), 那么13个时间单位后, 经过点1的个数为3

## 解题思路

这段Java代码的主要目标是模拟一个物体在二维矩阵中的运动，并计算在给定的时间单位内，物体经过1的次数。

解题思路如下：

  1. **模拟运动** ：首先初始化一个计数器`count`，并将物体的初始位置的值（即`matrix[y][x]`）加到计数器上。然后，进入一个循环，每次循环模拟一个时间单位的运动。

     * **移动物体** ：在每个时间单位内，根据物体的速度`(sx, sy)`移动物体，即更新物体的位置`(x, y)`。

     * **处理反射** ：如果物体移动后到达了二维矩阵的边界（即`x`等于0或`w-1`，或者`y`等于0或`h-1`），则改变物体的方向，即反转速度的相应分量。

     * **更新计数器** ：如果物体移动后的位置是1，即`matrix[y][x]`等于1，则将该值加到计数器上。

## C++

    
    
    #include <iostream>
    #include <vector>
    #include <string>
    
    using namespace std;
    
    int main() {
        // 读取初始信息
        int w, h, x, y, sx, sy, t;
        cin >> w >> h >> x >> y >> sx >> sy >> t;
        
        // 初始化矩阵并读取矩阵信息
        vector<vector<int>> matrix(h, vector<int>(w));
        for (int i = 0; i < h; ++i) {
            for (int j = 0; j < w; ++j) {
                char ch;
                cin >> ch;
                matrix[i][j] = ch - '0';
            }
        }
    
        int count = 0; // 记录经过 '1' 的个数
        t++; // 用于判断起始节点，不需要增加时间
    
        // 模拟运动过程
        while (t > 0) {
            // 记录当前节点是否为 '1'
            if (matrix[y][x] == 1) {
                count++;
            }
    
            // 判断下一个节点是否会超越边界并反弹
            if (y + sy < 0 || y + sy >= h) {
                sy = -sy; // 碰到上下边界，垂直速度取反
            }
            if (x + sx < 0 || x + sx >= w) {
                sx = -sx; // 碰到左右边界，水平速度取反
            }
    
            // 递增到下一个节点
            y += sy;
            x += sx;
    
            t--; // 减少时间单位
        }
    
        // 输出经过 '1' 的个数
        cout << count << endl;
    
        return 0;
    }
    

## Java

    
    
    import java.util.Scanner;
    
    public class Main{
    
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
    
            // 读取第一行输入，包含初始信息
            String[] initialInfo = scanner.nextLine().split(" ");
            int w = Integer.parseInt(initialInfo[0]);
            int h = Integer.parseInt(initialInfo[1]);
            int x = Integer.parseInt(initialInfo[2]);
            int y = Integer.parseInt(initialInfo[3]);
            int sx = Integer.parseInt(initialInfo[4]);
            int sy = Integer.parseInt(initialInfo[5]);
            int t = Integer.parseInt(initialInfo[6]);
    
            // 创建矩阵，并读取矩阵信息
            int[][] matrix = new int[h][w];
            for (int i = 0; i < h; i++) {
                String line = scanner.nextLine();
                for (int j = 0; j < w; j++) {
                    matrix[i][j] = Character.getNumericValue(line.charAt(j));
                }
            }
    
            int count = 0; // 记录经过 '1' 的个数
            t++; // 用于判断起始节点，不需要增加时间
    
            // 模拟运动过程
            while (t > 0) {
                // 记录当前节点是否为 '1'
                if (matrix[y][x] == 1) {
                    count++;
                }
    
                // 判断下一个节点是否会超越边界并反弹
                if (y + sy < 0 || y + sy >= h) {
                    sy = -sy; // 碰到上下边界，垂直速度取反
                }
                if (x + sx < 0 || x + sx >= w) {
                    sx = -sx; // 碰到左右边界，水平速度取反
                }
    
                // 递增到下一个节点
                y += sy;
                x += sx;
    
                t--; // 减少时间单位
            }
    
            // 输出经过 '1' 的个数
            System.out.println(count);
        }
    }
    

## javaScript

    
    
     
    const rl = require("readline").createInterface({ input: process.stdin });
    
     
    var iter = rl[Symbol.asyncIterator]();
    
    // 定义异步读取一行输入的函数
    const readline = async () => (await iter.next()).value;
    
    void (async function () {
        // 用于存储输入的数组
        let inputLines = [];
        while (line = await readline()) {
            inputLines.push(line); // 将每行输入存入数组
        }
        
        // 获取初始信息并解析成数字
        let [w, h, x, y, sx, sy, t] = inputLines.shift().split(' ').map(Number);
        
        // 获取矩阵信息并将其转换为二维数组
        let matrix = inputLines.map(line => line.split('').map(Number));
        
        let count = 0; // 记录经过 '1' 的个数
        t++; // 用于判断起始节点，不需要增加时间
        
        while (t > 0) {
            // 记录当前节点是否为 '1'
            if (matrix[y][x] === 1) {
                count++;
            }
    
            // 判断下一个节点是否会超越边界并反弹
            if (y + sy < 0 || y + sy >= h) {
                sy = -sy; // 碰到上下边界，垂直速度取反
            }
            if (x + sx < 0 || x + sx >= w) {
                sx = -sx; // 碰到左右边界，水平速度取反
            }
    
            // 递增到下一个节点
            y += sy;
            x += sx;
    
            t--; // 减少时间单位
        }
    
        // 输出经过 '1' 的个数
        console.log(count);
    })();
    

## Python

    
    
    import sys
    
    # 读取标准输入的所有行
    input_lines = sys.stdin.readlines()
    
    # 获取初始信息并解析成数字
    w, h, x, y, sx, sy, t = map(int, input_lines[0].split())
    
    # 获取矩阵信息并将其转换为二维数组
    matrix = [list(map(int, line.strip())) for line in input_lines[1:]]
    
    count = 0  # 记录经过 '1' 的个数
    t += 1  # 用于判断起始节点，不需要增加时间
    
    while t > 0:
        # 记录当前节点是否为 '1'
        if matrix[y][x] == 1:
            count += 1
    
        # 判断下一个节点是否会超越边界并反弹
        if y + sy < 0 or y + sy >= h:
            sy = -sy  # 碰到上下边界，垂直速度取反
        if x + sx < 0 or x + sx >= w:
            sx = -sx  # 碰到左右边界，水平速度取反
    
        # 递增到下一个节点
        y += sy
        x += sx
    
        t -= 1  # 减少时间单位
    
    # 输出经过 '1' 的个数
    print(count)
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    
    int main() {
        // 读取第一行输入，包含初始信息
        int w, h, x, y, sx, sy, t;
        scanf("%d %d %d %d %d %d %d", &w, &h, &x, &y, &sx, &sy, &t);
    
        // 创建矩阵，并读取矩阵信息
        int** matrix = (int**)malloc(h * sizeof(int*));
        for (int i = 0; i < h; i++) {
            matrix[i] = (int*)malloc(w * sizeof(int));
            char line[w + 1];
            scanf("%s", line);
            for (int j = 0; j < w; j++) {
                matrix[i][j] = line[j] - '0';
            }
        }
    
        int count = 0; // 记录经过 '1' 的个数
        t++; // 用于判断起始节点，不需要增加时间
    
        // 模拟运动过程
        while (t > 0) {
            // 记录当前节点是否为 '1'
            if (matrix[y][x] == 1) {
                count++;
            }
    
            // 判断下一个节点是否会超越边界并反弹
            if (y + sy < 0 || y + sy >= h) {
                sy = -sy; // 碰到上下边界，垂直速度取反
            }
            if (x + sx < 0 || x + sx >= w) {
                sx = -sx; // 碰到左右边界，水平速度取反
            }
    
            // 递增到下一个节点
            y += sy;
            x += sx;
    
            t--; // 减少时间单位
        }
    
        // 输出经过 '1' 的个数
        printf("%d\n", count);
    
        // 释放动态分配的内存
        for (int i = 0; i < h; i++) {
            free(matrix[i]);
        }
        free(matrix);
    
        return 0;
    }
    

## 完整用例

### 用例1

    
    
    3 3 0 0 1 1 2
    111
    000
    111
    

### 用例2

    
    
    5 5 2 2 -1 -1 5
    01010
    10101
    01010
    10101
    01010
    

### 用例3

    
    
    4 4 2 2 -1 -1 3
    1001
    0000
    0000
    1001
    

### 用例4

    
    
    6 6 1 1 0 1 4
    000000
    010101
    000000
    010101
    000000
    010101
    

### 用例5

    
    
    5 5 1 1 0 1 4
    10101
    01010
    10101
    01010
    10101
    

### 用例6

    
    
    3 3 1 0 1 1 3
    111
    111
    111
    

### 用例7

    
    
    8 8 0 0 1 1 16
    00000000
    00000000
    00011000
    00011000
    00000000
    00000000
    00000000
    00000000
    

### 用例8

    
    
    10 10 9 0 -1 1 19
    0000000000
    0000000000
    0000000000
    0000000000
    0000000000
    0000000000
    0000000000
    0000000000
    0000000000
    0000000001
    

### 用例9

    
    
    6 6 3 3 -1 1 5
    000000
    000000
    000100
    000000
    000000
    000000
    

### 用例10

    
    
    3 3 1 1 -1 -1 4
    000
    010
    000
    

![fengmian](https://i-blog.csdnimg.cn/blog_migrate/a6b22fe66f8fe99b1a89f227848f6bb1.png)

