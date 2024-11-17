## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

给一块n*m的地块，相当于n*m的二维数组，每个元素的值表示这个小地块的发电量；

求在这块地上建立正方形的边长为c的发电站，发电量满足目标电量k的地块数量。

##

## 输入描述

第一行为四个按空格分隔的正整数，分别表示n, m , c k

后面n行整数，表示每个地块的发电量

## 输出描述

出满足条件的地块数量

## 示例1

输入

    
    
    2 5 2 6
    1 3 4 5 8
    2 3 6 7 1
    

输出

    
    
    4
    

## 解题思路

本题可以使用动态规划前缀和思想解题。

解题思路如下：

首先，将每一行在水平方向上选取c个相邻地块进行发电量合并，用例中是2块相邻的地合并

![image-20230305111354484](https://i-blog.csdnimg.cn/blog_migrate/43e6e3eaa96d54b65fbd8924437968e9.png)

行合并完后，接下来对列进行合并

![image-20230305111520836](https://i-blog.csdnimg.cn/blog_migrate/48cad2abf74ff2ab0eef0d75b2021435.png)

这样的话，最终得到【9，16，22，21】

其中9，起始就是下图中绿色部分，是一个c*c的区域，9是这个区域的发电量总和。其他的16，22，21也同理。

![image-20230305111558836](https://i-blog.csdnimg.cn/blog_migrate/4eb6d2d4287771051c5dc62d9ed256d5.png)

因此，9，16，22，21每一个都是符合要求发电站发电量>6的区域，因此结果输出4个

## Java

    
    
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            
            // 读取第一行输入，并使用 split 分割
            // numRows: 地块的行数
            // numCols: 地块的列数
            // squareSize: 正方形边长
            // minRequiredPower: 目标电量
            String[] initialInput = scanner.nextLine().split(" ");
            int numRows = Integer.parseInt(initialInput[0]);
            int numCols = Integer.parseInt(initialInput[1]);
            int squareSize = Integer.parseInt(initialInput[2]);
            int minRequiredPower = Integer.parseInt(initialInput[3]);
    
            // 定义地块发电量矩阵 field
            int[][] field = new int[numRows][numCols];
    
            // 读取地块发电量
            // 每一行用空格分隔，并将值转换为整数存储在 field 矩阵中
            for (int row = 0; row < numRows; row++) {
                String[] powerData = scanner.nextLine().split(" ");
                for (int col = 0; col < numCols; col++) {
                    field[row][col] = Integer.parseInt(powerData[col]);
                }
            }
    
            // 定义前缀和矩阵 prefixSum，用于快速计算正方形区域的发电量总和
            // prefixSum[i][j] 表示从 (0,0) 到 (i-1,j-1) 的矩形区域的电量和
            int[][] prefixSum = new int[numRows + 1][numCols + 1];
    
            // 计算前缀和矩阵
            // 前缀和公式: prefixSum[i][j] = 上 + 左 - 左上 + 当前
            for (int row = 1; row <= numRows; row++) {
                for (int col = 1; col <= numCols; col++) {
                    prefixSum[row][col] = prefixSum[row - 1][col] 
                                          + prefixSum[row][col - 1] 
                                          - prefixSum[row - 1][col - 1] 
                                          + field[row - 1][col - 1];
                }
            }
    
            // 统计满足条件的正方形区域数量
            int validSquareCount = 0;
    
            // 遍历所有可能的正方形区域的右下角坐标
            // i 和 j 分别表示正方形的右下角位置
            for (int bottomRow = squareSize; bottomRow <= numRows; bottomRow++) {
                for (int rightCol = squareSize; rightCol <= numCols; rightCol++) {
                    // 计算以 (bottomRow, rightCol) 为右下角的正方形区域的发电量总和
                    int totalPower = prefixSum[bottomRow][rightCol] 
                                   - prefixSum[bottomRow - squareSize][rightCol] 
                                   - prefixSum[bottomRow][rightCol - squareSize] 
                                   + prefixSum[bottomRow - squareSize][rightCol - squareSize];
                    
                    // 判断是否满足目标电量
                    if (totalPower >= minRequiredPower) {
                        validSquareCount++;
                    }
                }
            }
    
            // 输出满足条件的正方形区域数量
            System.out.println(validSquareCount);
        }
    }
    
    

## Python

    
    
    # Python 代码实现
    
    # 读取输入并初始化数据
    # 第一行输入包括: numRows, numCols, squareSize, minRequiredPower
    initial_input = input().split()
    num_rows = int(initial_input[0])  # 地块行数
    num_cols = int(initial_input[1])  # 地块列数
    square_size = int(initial_input[2])  # 正方形边长
    min_required_power = int(initial_input[3])  # 最小目标电量
    
    # 定义地块发电量矩阵
    field = []
    for _ in range(num_rows):
        field.append(list(map(int, input().split())))
    
    # 定义前缀和矩阵
    prefix_sum = [[0] * (num_cols + 1) for _ in range(num_rows + 1)]
    
    # 计算前缀和矩阵
    # prefix_sum[i][j] 表示从 (0,0) 到 (i-1,j-1) 的区域电量总和
    for row in range(1, num_rows + 1):
        for col in range(1, num_cols + 1):
            prefix_sum[row][col] = (
                prefix_sum[row - 1][col] +
                prefix_sum[row][col - 1] -
                prefix_sum[row - 1][col - 1] +
                field[row - 1][col - 1]
            )
    
    # 统计满足条件的正方形区域数量
    valid_square_count = 0
    
    # 遍历所有可能的正方形区域的右下角坐标
    for bottom_row in range(square_size, num_rows + 1):
        for right_col in range(square_size, num_cols + 1):
            total_power = (
                prefix_sum[bottom_row][right_col]
                - prefix_sum[bottom_row - square_size][right_col]
                - prefix_sum[bottom_row][right_col - square_size]
                + prefix_sum[bottom_row - square_size][right_col - square_size]
            )
            # 判断是否满足目标电量
            if total_power >= min_required_power:
                valid_square_count += 1
    
    # 输出结果
    print(valid_square_count)
    
    

## JavaScript

    
    
    // Node.js 代码实现
    
    // 读取输入数据
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    let input = [];
    rl.on('line', (line) => {
        input.push(line);
    }).on('close', () => {
        // 解析第一行输入数据
        const [numRows, numCols, squareSize, minRequiredPower] = input[0].split(' ').map(Number);
    
        // 初始化地块发电量矩阵
        const field = [];
        for (let i = 1; i <= numRows; i++) {
            field.push(input[i].split(' ').map(Number));
        }
    
        // 定义前缀和矩阵
        const prefixSum = Array.from({ length: numRows + 1 }, () => Array(numCols + 1).fill(0));
    
        // 计算前缀和矩阵
        for (let row = 1; row <= numRows; row++) {
            for (let col = 1; col <= numCols; col++) {
                prefixSum[row][col] = prefixSum[row - 1][col]
                                    + prefixSum[row][col - 1]
                                    - prefixSum[row - 1][col - 1]
                                    + field[row - 1][col - 1];
            }
        }
    
        // 统计满足条件的正方形区域数量
        let validSquareCount = 0;
    
        // 遍历所有可能的正方形区域的右下角坐标
        for (let bottomRow = squareSize; bottomRow <= numRows; bottomRow++) {
            for (let rightCol = squareSize; rightCol <= numCols; rightCol++) {
                const totalPower = prefixSum[bottomRow][rightCol]
                                 - prefixSum[bottomRow - squareSize][rightCol]
                                 - prefixSum[bottomRow][rightCol - squareSize]
                                 + prefixSum[bottomRow - squareSize][rightCol - squareSize];
                if (totalPower >= minRequiredPower) {
                    validSquareCount++;
                }
            }
        }
    
        // 输出结果
        console.log(validSquareCount);
    });
    
    

## C++

    
    
    #include <iostream>
    #include <vector>
    using namespace std;
    
    int main() {
        // 读取输入
        int numRows, numCols, squareSize, minRequiredPower;
        cin >> numRows >> numCols >> squareSize >> minRequiredPower;
    
        // 定义地块发电量矩阵
        vector<vector<int>> field(numRows, vector<int>(numCols));
        for (int i = 0; i < numRows; i++) {
            for (int j = 0; j < numCols; j++) {
                cin >> field[i][j];
            }
        }
    
        // 定义前缀和矩阵
        vector<vector<int>> prefixSum(numRows + 1, vector<int>(numCols + 1, 0));
    
        // 计算前缀和矩阵
        for (int row = 1; row <= numRows; row++) {
            for (int col = 1; col <= numCols; col++) {
                prefixSum[row][col] = prefixSum[row - 1][col]
                                    + prefixSum[row][col - 1]
                                    - prefixSum[row - 1][col - 1]
                                    + field[row - 1][col - 1];
            }
        }
    
        // 统计满足条件的正方形区域数量
        int validSquareCount = 0;
        for (int bottomRow = squareSize; bottomRow <= numRows; bottomRow++) {
            for (int rightCol = squareSize; rightCol <= numCols; rightCol++) {
                int totalPower = prefixSum[bottomRow][rightCol]
                               - prefixSum[bottomRow - squareSize][rightCol]
                               - prefixSum[bottomRow][rightCol - squareSize]
                               + prefixSum[bottomRow - squareSize][rightCol - squareSize];
                if (totalPower >= minRequiredPower) {
                    validSquareCount++;
                }
            }
        }
    
        // 输出结果
        cout << validSquareCount << endl;
    
        return 0;
    }
    
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    
    int main() {
        int numRows, numCols, squareSize, minRequiredPower;
    
        // 读取第一行输入
        scanf("%d %d %d %d", &numRows, &numCols, &squareSize, &minRequiredPower);
    
        // 定义地块发电量矩阵
        int field[numRows][numCols];
        for (int i = 0; i < numRows; i++) {
            for (int j = 0; j < numCols; j++) {
                scanf("%d", &field[i][j]);
            }
        }
    
        // 定义前缀和矩阵
        int prefixSum[numRows + 1][numCols + 1];
        for (int i = 0; i <= numRows; i++) {
            for (int j = 0; j <= numCols; j++) {
                prefixSum[i][j] = 0;
            }
        }
    
        // 计算前缀和矩阵
        for (int row = 1; row <= numRows; row++) {
            for (int col = 1; col <= numCols; col++) {
                prefixSum[row][col] = prefixSum[row - 1][col]
                                    + prefixSum[row][col - 1]
                                    - prefixSum[row - 1][col - 1]
                                    + field[row - 1][col - 1];
            }
        }
    
        // 统计满足条件的正方形区域数量
        int validSquareCount = 0;
        for (int bottomRow = squareSize; bottomRow <= numRows; bottomRow++) {
            for (int rightCol = squareSize; rightCol <= numCols; rightCol++) {
                int totalPower = prefixSum[bottomRow][rightCol]
                               - prefixSum[bottomRow - squareSize][rightCol]
                               - prefixSum[bottomRow][rightCol - squareSize]
                               + prefixSum[bottomRow - squareSize][rightCol - squareSize];
                if (totalPower >= minRequiredPower) {
                    validSquareCount++;
                }
            }
        }
    
        // 输出结果
        printf("%d\n", validSquareCount);
    
        return 0;
    }
    
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

