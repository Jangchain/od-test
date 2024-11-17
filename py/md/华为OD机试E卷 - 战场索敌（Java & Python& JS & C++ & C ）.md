## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

有一个大小是N*M的战场地图，被墙壁 ‘#’ 分隔成大小不同的区域，上下左右四个方向相邻的空地 ‘.’ 属于同一个区域，只有空地上可能存在敌人’E”，

请求出地图上总共有多少区域里的敌人数小于K。

## 输入描述

第一行输入为N,M,K；

  * N表示地图的行数，M表示地图的列数， K表示目标敌人数量
  * N，M<=100

之后为一个NxM大小的字符数组。

## 输出描述

敌人数小于K的区域数量

## 示例1

输入

    
    
    3 5 2
    ..#EE
    E.#E.
    ###..
    

输出

    
    
    1
    

说明

> 地图被墙壁分为两个区域，左边区域有1个敌人，右边区域有3个敌人，符合条件的区域数量是1

## 解题思路

整体思路是，遍历地图中的每个位置，如果该位置未被访问过且不是墙壁，则调用dfs函数计算以该位置为起点的区域中敌人的数量，如果该数量小于目标敌人数量k，则将区域数量加1。最后，输出区域数量。

我们将地图矩阵存储在一个二维字符数组matrix中。

接下来，我们需要初始化一个二维布尔数组visited，用于标记地图中的每个位置是否已经被访问过。初始化visited为false。

然后，我们定义一个深度优先搜索函数dfs，用于计算以位置(i, j)为起点的区域中敌人的数量。在dfs函数中，我们首先将位置(i,
j)标记为已访问，并根据该位置的值判断是否为敌人，如果是，则将计数器count加1。然后，我们使用一个栈来保存待访问的位置。在每一次循环中，我们从栈中取出一个位置(pos)，并遍历其上下左右四个相邻位置。如果相邻位置在地图范围内、未被访问过且不是墙壁，则将其标记为已访问，并根据其值判断是否为敌人，如果是，则将计数器count加1，并将该位置加入到栈中。最后，返回计数器count。

接下来，我们定义主函数main。在主函数中，我们首先读取地图的行数n、列数m和目标敌人数量k。然后，根据地图的行数n和列数m初始化visited和matrix数组。接下来，我们遍历地图中的每个位置，如果该位置已经被访问过或者是墙壁，则跳过。否则，调用dfs函数计算以该位置为起点的区域中敌人的数量，如果该数量小于目标敌人数量k，则将区域数量加1。最后，输出区域数量。

## Java

    
    
    import java.util.Scanner;
    
    public class Main {
        // 定义地图的行数、列数和目标敌人数量
        private static int n, m, k;
        // 定义存储地图的二维字符数组
        private static char[][] matrix;
        // 定义标记访问状态的二维数组
        private static int[][] visited;
        // 记录当前区域的敌人数量
        private static int enemyCount;
    
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            // 读取地图的行数n、列数m和目标敌人数量k
            n = scanner.nextInt();
            m = scanner.nextInt();
            k = scanner.nextInt();
    
            // 初始化地图矩阵和访问标记数组
            matrix = new char[n][m];
            visited = new int[n][m];
    
            // 读取地图矩阵数据
            for (int i = 0; i < n; i++) {
                String row = scanner.next();
                for (int j = 0; j < m; j++) {
                    matrix[i][j] = row.charAt(j); // 逐字符读取地图
                }
            }
    
            int ans = 0; // 初始化符合条件的区域计数
    
            // 遍历地图中的每个位置
            for (int i = 0; i < n; i++) {
                for (int j = 0; j < m; j++) {
                    // 如果当前格子已经访问过或是墙壁，跳过
                    if (visited[i][j] != 0 || matrix[i][j] == '#') {
                        continue;
                    }
                    enemyCount = 0; // 初始化当前区域的敌人计数
                    dfs(i, j); // 深度优先搜索该区域
                    // 如果该区域的敌人数小于k，则该区域符合条件
                    ans += enemyCount < k ? 1 : 0;
                }
            }
    
            // 输出符合条件的区域数量
            System.out.println(ans);
        }
    
        // 深度优先搜索函数，从(i, j)位置开始计算敌人数
        public static void dfs(int i, int j) {
            visited[i][j] = 1; // 将当前位置标记为已访问
    
            // 如果当前位置是敌人，增加敌人计数
            if (matrix[i][j] == 'E') {
                enemyCount++;
            }
    
            // 定义四个方向的偏移量：上、下、左、右
            int[][] offsets = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};
    
            // 遍历四个相邻方向
            for (int[] offset : offsets) {
                int newX = i + offset[0];
                int newY = j + offset[1];
    
                // 检查相邻位置是否在地图范围内，未访问过且不是墙壁
                if (newX >= 0 && newX < n && newY >= 0 && newY < m && visited[newX][newY] == 0 && matrix[newX][newY] != '#') {
                    dfs(newX, newY); // 递归访问相邻位置
                }
            }
        }
    }
    
    

## Python

    
    
    import sys
    
    def dfs(i, j):
        visited[i][j] = 1  # 标记当前位置已访问
    
        if matrix[i][j] == 'E':  # 如果当前位置是敌人，增加敌人数量
            global enemyCount
            enemyCount += 1
    
        offsets = [[-1, 0], [1, 0], [0, -1], [0, 1]]  # 定义上下左右四个方向
    
        # 遍历四个方向，检查相邻格子
        for offset in offsets:
            newX = i + offset[0]
            newY = j + offset[1]
    
            # 检查相邻格子是否在范围内、未访问且不是墙壁
            if newX >= 0 and newX < n and newY >= 0 and newY < m and visited[newX][newY] == 0 and matrix[newX][newY] != '#':
                dfs(newX, newY)  # 递归访问相邻格子
    
    # 读取地图行数、列数和目标敌人数量
    n, m, k = map(int, input().split())
    
    matrix = []  # 初始化地图矩阵
    visited = [[0] * m for _ in range(n)]  # 初始化访问标记数组
    
    # 读取地图数据
    for _ in range(n):
        row = input()
        matrix.append(list(row))
    
    ans = 0  # 初始化符合条件的区域计数
    
    # 遍历地图的每个格子
    for i in range(n):
        for j in range(m):
            # 如果该格子已访问或是墙壁，跳过
            if visited[i][j] != 0 or matrix[i][j] == '#':
                continue
            enemyCount = 0  # 初始化敌人数量
            dfs(i, j)  # 深度优先搜索
            # 如果该区域敌人数小于k，则符合条件
            ans += 1 if enemyCount < k else 0
    
    # 输出符合条件的区域数量
    print(ans)
    
    

## JavaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    let n, m, k;
    let matrix = [];
    let visited = [];
    
    rl.on('line', (line) => {
      if (!n) {
        [n, m, k] = line.split(' ').map(Number);  // 读取地图行数、列数和敌人数量
        visited = Array.from({ length: n }, () => Array(m).fill(false));  // 初始化访问标记数组
      } else {
        matrix.push(line.split(''));  // 读取地图矩阵
      }
    }).on('close', () => {
      const enemyCount = { count: 0 };  // 用于记录敌人数量的对象
    
      // 深度优先搜索函数
      function dfs(i, j) {
        visited[i][j] = true;  // 标记为已访问
    
        if (matrix[i][j] === 'E') {
          enemyCount.count++;  // 如果是敌人，增加计数
        }
    
        const offsets = [[-1, 0], [1, 0], [0, -1], [0, 1]];  // 定义四个方向
    
        // 遍历四个相邻方向
        for (const offset of offsets) {
          const newX = i + offset[0];
          const newY = j + offset[1];
    
          // 检查是否在地图范围内且未访问
          if (newX >= 0 && newX < n && newY >= 0 && newY < m && !visited[newX][newY] && matrix[newX][newY] !== '#') {
            dfs(newX, newY);  // 递归搜索
          }
        }
      }
    
      let ans = 0;  // 记录符合条件的区域数量
    
      // 遍历地图的每个格子
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
          if (visited[i][j] || matrix[i][j] === '#') {
            continue;  // 如果已访问或是墙壁，跳过
          }
          enemyCount.count = 0;  // 初始化敌人计数
          dfs(i, j);  // 深度优先搜索
          ans += enemyCount.count < k ? 1 : 0;  // 判断是否符合条件
        }
      }
    
      console.log(ans);  // 输出结果
    });
    
    

## C++

    
    
    #include <iostream>
    #include <vector>
    using namespace std;
    
    int n, m, k;  // 地图行数、列数和目标敌人数量
    vector<vector<char>> matrix;  // 存储地图的二维数组
    vector<vector<int>> visited;  // 标记访问状态的二维数组
    int enemyCount;  // 记录当前区域敌人的数量
    
    // 深度优先搜索函数，从(i, j)开始计算该区域的敌人数
    void dfs(int i, int j) {
        visited[i][j] = 1;  // 标记当前位置为已访问
        
        if (matrix[i][j] == 'E') {
            enemyCount++;  // 如果当前位置是敌人，增加计数
        }
        
        vector<vector<int>> offsets = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};  // 定义四个方向
    
        // 遍历相邻的四个方向
        for (vector<int> offset : offsets) {
            int newX = i + offset[0];
            int newY = j + offset[1];
            
            // 检查新位置是否在地图范围内，且未访问过且不是墙壁
            if (newX >= 0 && newX < n && newY >= 0 && newY < m && visited[newX][newY] == 0 && matrix[newX][newY] != '#') {
                dfs(newX, newY);  // 递归访问相邻位置
            }
        }
    }
    
    int main() {
        cin >> n >> m >> k;  // 读取地图行数、列数和目标敌人数量
        
        matrix.resize(n, vector<char>(m));  // 初始化地图矩阵
        visited.resize(n, vector<int>(m));  // 初始化访问标记数组
        
        // 读取地图数据
        for (int i = 0; i < n; i++) {
            string row;
            cin >> row;
            for (int j = 0; j < m; j++) {
                matrix[i][j] = row[j];  // 将地图数据存入矩阵
            }
        }
        
        int ans = 0;  // 记录符合条件的区域数量
        
        // 遍历地图的每个格子
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (visited[i][j] != 0 || matrix[i][j] == '#') {
                    continue;  // 如果已经访问或是墙壁，跳过
                }
                enemyCount = 0;  // 初始化敌人计数
                dfs(i, j);  // 深度优先搜索
                ans += enemyCount < k ? 1 : 0;  // 判断该区域是否符合条件
            }
        }
        
        cout << ans << endl;  // 输出符合条件的区域数量
        
        return 0;
    }
    
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    
    int n, m, k;  // 地图行数、列数和目标敌人数量
    char **matrix;  // 存储地图的二维数组
    int **visited;  // 标记访问状态的二维数组
    int enemyCount;  // 记录当前区域敌人的数量
    
    // 深度优先搜索函数，从(i, j)开始计算该区域的敌人数
    void dfs(int i, int j) {
        visited[i][j] = 1;  // 标记当前位置为已访问
    
        if (matrix[i][j] == 'E') {
            enemyCount++;  // 如果当前位置是敌人，增加计数
        }
    
        int offsets[4][2] = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};  // 定义四个方向
    
        // 遍历相邻的四个方向
        for (int d = 0; d < 4; d++) {
            int newX = i + offsets[d][0];
            int newY = j + offsets[d][1];
    
            // 检查新位置是否在地图范围内，且未访问过且不是墙壁
            if (newX >= 0 && newX < n && newY >= 0 && newY < m && visited[newX][newY] == 0 && matrix[newX][newY] != '#') {
                dfs(newX, newY);  // 递归访问相邻位置
            }
        }
    }
    
    int main() {
        // 读取地图行数、列数和目标敌人数量
        scanf("%d %d %d", &n, &m, &k);
    
        // 初始化地图矩阵
        matrix = (char **)malloc(n * sizeof(char *));
        for (int i = 0; i < n; i++) {
            matrix[i] = (char *)malloc((m + 1) * sizeof(char));  // 额外分配1个字符存储字符串终止符
        }
    
        // 初始化访问标记数组
        visited = (int **)malloc(n * sizeof(int *));
        for (int i = 0; i < n; i++) {
            visited[i] = (int *)malloc(m * sizeof(int));
        }
    
        // 读取地图数据
        for (int i = 0; i < n; i++) {
            scanf("%s", matrix[i]);  // 直接读取一整行字符串
        }
    
        int ans = 0;  // 记录符合条件的区域数量
    
        // 遍历地图的每个格子
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (visited[i][j] != 0 || matrix[i][j] == '#') {
                    continue;  // 如果已经访问或是墙壁，跳过
                }
                enemyCount = 0;  // 初始化敌人计数
                dfs(i, j);  // 深度优先搜索
                ans += (enemyCount < k) ? 1 : 0;  // 判断该区域是否符合条件
            }
        }
    
        printf("%d\n", ans);  // 输出符合条件的区域数量
    
        // 释放动态分配的内存
        for (int i = 0; i < n; i++) {
            free(matrix[i]);
            free(visited[i]);
        }
        free(matrix);
        free(visited);
    
        return 0;
    }
    
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/7c4567a4bc67741456f78505ffa6063a.png)

#### 完整用例

##### 用例1

    
    
    3 5 2
    ..#EE
    E.#E.
    ###..
    

##### 用例2

    
    
    4 4 3
    ..#.
    E..E
    .#E.
    ..##
    

##### 用例3

    
    
    2 2 1
    E#
    .#
    

##### 用例4

    
    
    2 3 2
    E#E
    .#.
    

##### 用例5

    
    
    3 3 0
    ...
    ...
    ...
    

##### 用例6

    
    
    5 5 3
    ..#..
    E...E
    .#...
    ...#.
    ##..#
    

##### 用例7

    
    
    6 6 2
    .#....
    .#....
    .#....
    .#....
    .#....
    E######
    

##### 用例8

    
    
    4 5 4
    ...#.
    .#..#
    .#...
    .#..E
    

##### 用例9

    
    
    5 6 3
    ...##.
    .#...#
    .#.#..
    E.#...
    .#.#E#
    

##### 用例10

    
    
    3 4 1
    ..#.
    .#.E
    .#..
    

