## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

2XXX年，人类通过对火星的大气进行宜居改造分析，使得火星已在理论上具备人类宜居的条件；

由于技术原因，无法一次性将火星大气全部改造，只能通过局部处理形式；

假设将火星待改造的区域为row *  
column的网格，每个网格有3个值，宜居区、可改造区、死亡区，使用YES、NO、NA代替，YES表示该网格已经完成大气改造，NO表示该网格未进行改造，后期可进行改造，NA表示死亡区，不作为判断是否改造完的宜居，无法穿过；

初始化下，该区域可能存在多个宜居区，并目每个宜居区能同时在每个大阳日单位向上下左右四个方向的相邻格子进行扩散，自动将4个方向相邻的真空区改造成宜居区；

请计算这个待改造区域的网格中，可改造区是否能全部成宜居区，如果可以，则返回改造的大阳日天教，不可以则返回-1

## 输入描述

输入row * column个网格数据，每个网格值枚举值如下: YES，NO，NA；

样例:、

    
    
    YES YES NO
    NO NO NO
    NA NO YES
    

###### 备注

grid[i][j]只有3种情况，YES、NO、NA

  * row == grid.length
  * column == grid[i].length
  * 1 ≤ row, column ≤ 8

## 输出描述

可改造区是否能全部变成宜居区，如果可以，则返回改造的太阳日天数，不可以则返回-1。

## 示例1

输入

    
    
    YES YES NO
    NO NO NO
    YES NO NO
    

输出

    
    
    2
    

说明

> 经过 2 个太阳日，完成宜居改造。

## 示例2

输入

    
    
    YES NO NO NO
    NO NO NO NO
    NO NO NO NO
    NO NO NO NO
    

输出

    
    
    6
    

说明

> 经过 6 个太阳日，可完成改造

## 示例3

输入

    
    
    NO NA
    

输出

    
    
    -1
    

说明

> 无改造初始条件，无法进行改造

## 示例4

输入

    
    
    YES NO NO YES
    NO NO YES NO
    NO YES NA NA
    YES NO NA NO
    

输出

    
    
    -1
    

说明

> -1 ，右下角的区域，被周边三个死亡区挡住，无法实现改造

## 解题思路

## Java

    
    
    import java.util.*;
    
    public class Main {
        public static void main(String[] args) {
            Scanner sc = new Scanner(System.in);
            List<String> lines = new ArrayList<>();
            
            // 读取输入，存入列表中
            while (sc.hasNextLine()) {
                String line = sc.nextLine();
                if (line.isEmpty()) break;
                lines.add(line);
            }
            
            int rows = lines.size();
            int cols = lines.get(0).split(" ").length;
            
            String[][] grid = new String[rows][cols];
            Queue<int[]> q = new LinkedList<>();
            int toConvert = 0;  // 需要改造的区域数量
            
            // 初始化网格和队列
            for (int r = 0; r < rows; r++) {
                String[] row = lines.get(r).split(" ");
                for (int c = 0; c < cols; c++) {
                    grid[r][c] = row[c];
                    if (row[c].equals("YES")) {
                        q.add(new int[]{r, c});
                    } else if (row[c].equals("NO")) {
                        toConvert++;
                    }
                }
            }
            
            // 无初始改造点或全不可改造
            if (q.isEmpty()) {
                System.out.println(-1);
                return;
            }
            
            // 方向数组（上下左右）
            int[][] dirs = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};
            int days = 0;  // 改造天数
            
            // 广度优先搜索
            while (!q.isEmpty() && toConvert > 0) {
                int size = q.size();
                for (int i = 0; i < size; i++) {
                    int[] pos = q.poll();
                    for (int[] dir : dirs) {
                        int newRow = pos[0] + dir[0];
                        int newCol = pos[1] + dir[1];
                        
                        if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && grid[newRow][newCol].equals("NO")) {
                            grid[newRow][newCol] = "YES";
                            q.add(new int[]{newRow, newCol});
                            toConvert--;
                        }
                    }
                }
                days++;
            }
            
            System.out.println(toConvert == 0 ? days : -1);
        }
    }
    
    

## Python

    
    
    import sys
    
    grid = []  # 网格
    for line in sys.stdin:
        line = line.strip()
        if not line:
            break
        else:
            row = line.split()
            grid.append(row)
    
    rows = len(grid)
    cols = len(grid[0])
    
    q = []  # 存储已经改造的位置
    toConvert = 0  # 需要改造的位置数
    
    for r in range(rows):
        for c in range(cols):
            val = grid[r][c]
            if val == "YES":
                q.append([r, c])
            elif val == "NO":
                toConvert += 1
    
    if not q:  # 如果没有已经改造的位置，则无法继续改造
        print(-1)
        sys.exit()
    if len(q) == rows * cols:  # 如果所有位置都已经改造，则不需要继续改造
        print(0)
        sys.exit()
    
    days = 0  # 改造天数
    dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]]  # 上下左右四个方向
    
    while q and toConvert > 0:  # 只要还有需要改造的位置，就继续改造
        new_q = []  # 存储新改造的位置
    
        for pos in q:
            x, y = pos
            for dir in dirs:
                new_x = x + dir[0]
                new_y = y + dir[1]
    
                if 0 <= new_x < rows and 0 <= new_y < cols and grid[new_x][new_y] == "NO":  # 如果新位置可以改造，就改造它
                    grid[new_x][new_y] = "YES"
                    new_q.append([new_x, new_y])
                    toConvert -= 1
    
        days += 1  # 改造天数加一
        q = new_q  # 更新已经改造的位置
    
    if toConvert == 0:
        print(days)  # 如果所有位置都已经改造，则返回改造的天数
    else:
        print(-1)  # 否则返回-1
    
    

## JavaScript

    
    
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    let grid = []; // 网格
    rl.on('line', (line) => {
      if (line === '') {
        rl.close();
      } else {
        let row = [];
        let start = 0, end = 0;
        while (end !== -1) {
          end = line.indexOf(' ', start);
          row.push(line.substring(start, end !== -1 ? end : undefined));
          start = end + 1;
        }
        grid.push(row);
      }
    }).on('close', () => {
      let rows = grid.length;
      let cols = grid[0].length;
    
      let q = []; // 存储已经改造的位置
      let toConvert = 0; // 需要改造的位置数
    
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          let val = grid[r][c];
          if (val === 'YES') {
            q.push([r, c]);
          } else if (val === 'NO') {
            toConvert++;
          }
        }
      }
    
      if (q.length === 0) { // 如果没有已经改造的位置，则无法继续改造
        console.log(-1);
        process.exit(0);
      }
      if (q.length === rows * cols) { // 如果所有位置都已经改造，则不需要继续改造
        console.log(0);
        process.exit(0);
      }
    
      let days = 0; // 改造天数
      let dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]]; // 上下左右四个方向
    
      while (q.length > 0 && toConvert > 0) { // 只要还有需要改造的位置，就继续改造
        let new_q = []; // 存储新改造的位置
    
        for (let pos of q) {
          let x = pos[0], y = pos[1];
          for (let dir of dirs) {
            let new_x = x + dir[0];
            let new_y = y + dir[1];
    
            if (new_x >= 0 && new_x < rows && new_y >= 0 && new_y < cols && grid[new_x][new_y] === 'NO') { // 如果新位置可以改造，就改造它
              grid[new_x][new_y] = 'YES';
              new_q.push([new_x, new_y]);
              toConvert--;
            }
          }
        }
    
        days++; // 改造天数加一
        q = new_q; // 更新已经改造的位置
      }
    
      if (toConvert === 0) console.log(days); // 如果所有位置都已经改造，则返回改造的天数
      else console.log(-1); // 否则返回-1
    });
    
    

## C++

    
    
    #include <iostream>
    #include <vector>
    using namespace std;
    
    int main() {
        vector<vector<string>> grid; // 网格
        string line;
        while (getline(cin, line)) {
            if (line.empty()) {
                break;
            } else {
                vector<string> row;
                size_t start = 0, end = 0;
                while (end != string::npos) {
                    end = line.find(' ', start);
                    row.push_back(line.substr(start, end - start));
                    start = end + 1;
                }
                grid.push_back(row);
            }
        }
        
        int rows = grid.size();
        int cols = grid[0].size();
     
        vector<vector<int>> q; // 存储已经改造的位置
        int toConvert = 0; // 需要改造的位置数
     
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                string val = grid[r][c];
                if (val == "YES") {
                    q.push_back({r, c});
                } else if (val == "NO") {
                    toConvert++;
                }
            }
        }
     
        if (q.empty()) { // 如果没有已经改造的位置，则无法继续改造
            cout << -1 << endl;
            return 0;
        }
        if (q.size() == rows * cols) { // 如果所有位置都已经改造，则不需要继续改造
            cout << 0 << endl;
            return 0;
        }
     
        int days = 0; // 改造天数
        vector<vector<int>> dirs = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}}; // 上下左右四个方向
     
        while (!q.empty() && toConvert > 0) { // 只要还有需要改造的位置，就继续改造
            vector<vector<int>> new_q; // 存储新改造的位置
     
            for (vector<int> pos : q) {
                int x = pos[0], y = pos[1];
                for (vector<int> dir : dirs) {
                    int new_x = x + dir[0];
                    int new_y = y + dir[1];
     
                    if (new_x >= 0
                        && new_x < rows
                        && new_y >= 0
                        && new_y < cols
                        && grid[new_x][new_y] == "NO") { // 如果新位置可以改造，就改造它
                        grid[new_x][new_y] = "YES";
                        new_q.push_back({new_x, new_y});
                        toConvert--;
                    }
                }
            }
     
            days++; // 改造天数加一
            q = new_q; // 更新已经改造的位置
        }
     
        if (toConvert == 0) cout << days << endl; // 如果所有位置都已经改造，则返回改造的天数
        else cout << -1 << endl; // 否则返回-1
        return 0;
    }
    
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    #include <string.h>
    
    #define MAX_ROWS 100
    #define MAX_COLS 100
    
    // 队列数据结构
    int queue[MAX_ROWS * MAX_COLS][2];
    int front = 0, rear = 0;
    
    // 简单的方向数组（上、下、左、右）
    int dirs[4][2] = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};
    
    // 检查队列是否为空
    int isQueueEmpty() {
        return front == rear;
    }
    
    // 入队操作
    void enqueue(int row, int col) {
        queue[rear][0] = row;
        queue[rear][1] = col;
        rear++;
    }
    
    // 出队操作
    void dequeue(int* row, int* col) {
        *row = queue[front][0];
        *col = queue[front][1];
        front++;
    }
    
    int main() {
        char grid[MAX_ROWS][MAX_COLS][4]; // 网格字符串
        char line[256];
        int rows = 0, cols = 0;
        int toConvert = 0; // 需要改造的区域数量
        int days = 0;      // 改造天数
    
        // 读取输入并初始化网格
        while (fgets(line, sizeof(line), stdin)) {
            if (line[0] == '\n') break; // 结束输入
            char *token = strtok(line, " ");
            int col = 0;
            while (token) {
                strcpy(grid[rows][col], token);
                token = strtok(NULL, " ");
                col++;
            }
            cols = col; // 记录列数
            rows++;
        }
    
        // 初始化网格并查找初始的 "YES" 和 "NO" 位置
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (strcmp(grid[r][c], "YES") == 0) {
                    enqueue(r, c); // 将 "YES" 位置加入队列
                } else if (strcmp(grid[r][c], "NO") == 0) {
                    toConvert++; // 统计需要改造的 "NO" 区域数量
                }
            }
        }
    
        // 如果没有初始的 "YES" 或者没有需要改造的 "NO"，则输出 -1
        if (isQueueEmpty()) {
            printf("-1\n");
            return 0;
        }
    
        // 广度优先搜索 (BFS) 开始改造
        while (!isQueueEmpty() && toConvert > 0) {
            int size = rear - front; // 当前队列中的元素数量
            for (int i = 0; i < size; i++) {
                int row, col;
                dequeue(&row, &col);
                for (int j = 0; j < 4; j++) {
                    int newRow = row + dirs[j][0];
                    int newCol = col + dirs[j][1];
                    if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols &&
                        strcmp(grid[newRow][newCol], "NO") == 0) {
                        strcpy(grid[newRow][newCol], "YES"); // 将 "NO" 改为 "YES"
                        enqueue(newRow, newCol);             // 将新改造的点加入队列
                        toConvert--;                        // 剩余待改造的区域减1
                    }
                }
            }
            days++; // 每一轮结束，增加一天
        }
    
        // 输出结果
        printf("%d\n", toConvert == 0 ? days : -1);
    
        return 0;
    }
    
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/12f8cf9dc17385903e2fa0cb504aeb44.png)

