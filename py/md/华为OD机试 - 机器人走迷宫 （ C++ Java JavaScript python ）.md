#### 题目描述

  1. 房间由XY的方格组成，例如下图为64的大小。每一个方格以坐标(x，y)描述。
  2. 机器人固定从方格(0，0)出发，只能向东或者向北前进。出口固定为房间的最东北角，如下图的方格(5，3)。用例保证机器人可以从入口走到出口。
  3. 房间有些方格是墙壁，如(4，1)，机器人不能经过那儿。
  4. 有些地方是一旦到达就无法走到出口的，如标记为B的方格，称之为陷阱方格。
  5. 有些地方是机器人无法到达的的，如标记为A的方格，称之为不可达方格，不可达方格不包括墙壁所在的位置。
  6. 如下示例图中，陷阱方格有2个，不可达方格有3个。
  7. 请为该机器人实现路径规划功能：给定房间大小、墙壁位置，请计算出陷阱方格与不可达方格分别有多少个。

![img](https://i-blog.csdnimg.cn/blog_migrate/34317d2fe918a356149fb893b21cd65f.png)

#### 输入描述

  * 第一行为房间的X和Y（0 < X,Y <= 1000）
  * 第二行为房间中墙壁的个数N（0 <= N < X*Y）
  * 接着下面会有N行墙壁的坐标

同一行中如果有多个数据以一个空格隔开，用例保证所有的输入数据均合法。（结尾不带回车换行）

#### 输出描述

陷阱方格与不可达方格数量，两个信息在一行中输出，以一个空格隔开。（结尾不带回车换行）

#### 用例1

输入

    
    
    6 4
    5
    0 2
    1 2
    2 2
    4 1
    5 1
    

输出

    
    
    2 3
    

说明

> 该输入对应上图示例中的迷宫，陷阱方格有2个，不可达方格有3个

#### 用例2

输入

    
    
    6 4
    4
    2 0
    2 1
    3 0
    3 1
    

输出

    
    
    0 4
    

说明

> 该输入对应的迷宫如下图，没有陷阱方格，不可达方格有4个，分别是(4, 0) (4, 1) (5, 0) (5,
> 1)![img](https://i-blog.csdnimg.cn/blog_migrate/dfa718c6ebf86ccb96f54ab8b7846a15.png)

#### C++

    
    
    #include <iostream>
    #include <vector>
    using namespace std;
    
    int row; // 行数
    int col; // 列数
    int wallNum; // 墙的数量
    vector<vector<int>> walls; // 墙的位置
    vector<vector<int>> matrix; // 迷宫矩阵
    
    bool dfs(int x, int y);
    
    int main() {
        cin >> row >> col >> wallNum;
    
        walls.resize(wallNum, vector<int>(2));
        for (int i = 0; i < wallNum; i++) {
            cin >> walls[i][0] >> walls[i][1];
        }
    
        matrix.resize(row, vector<int>(col));
    
        for (vector<int> wall : walls) {
            int i = wall[0];
            int j = wall[1];
            matrix[i][j] = 1; // 标记墙
        }
    
        matrix[row - 1][col - 1] = 2; // 标记出口
    
        dfs(0, 0); // 从入口开始搜索
    
        int trapNum = 0; // 陷阱方格数量
        int unreachableNum = 0; // 不可达方格数量
    
        for (int i = 0; i < row; i++) {
            for (int j = 0; j < col; j++) {
                if (matrix[i][j] == 0) {
                    unreachableNum++;
                } else if (matrix[i][j] == -1) {
                    trapNum++;
                }
            }
        }
    
        cout << trapNum << " " << unreachableNum << endl;
    
        return 0;
    }
    
    bool dfs(int x, int y) {
        if (x >= row || y >= col || matrix[x][y] == 1 || matrix[x][y] == -1) {
            // 如果越界、是墙或陷阱，返回 false
            return false;
        }
    
        if (matrix[x][y] == 2) {
            // 如果到达出口，返回 true
            return true;
        }
    
        bool east = dfs(x + 1, y); // 搜索东边的方格
        bool north = dfs(x, y + 1); // 搜索北边的方格
    
        if (east || north) {
            matrix[x][y] = 2; // 如果能到达出口，标记为可达
        } else {
            matrix[x][y] = -1; // 如果不能到达出口，标记为陷阱
        }
    
        return matrix[x][y] == 2; // 返回当前方格是否可达
    }
    
    

#### node

    
    
    const readline = require("readline");
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    
    const lines = [];
    let roomX, roomY, wallCount, wallPositions;
    
    rl.on("line", (line) => {
      lines.push(line);
    
      if (lines.length === 2) {
        [roomX, roomY] = lines[0].split(" ").map(Number);
        wallCount = lines[1] - 0;
      }
    
      if (wallCount !== undefined && lines.length === wallCount + 2) {
        wallPositions = lines.slice(2).map((line) => line.split(" ").map(Number));
        const roomMatrix = new Array(roomX).fill(0).map(() => new Array(roomY).fill(0));
    
        for (let [i, j] of wallPositions) {
          roomMatrix[i][j] = 1;  
        }
    
        roomMatrix[roomX - 1][roomY - 1] = 2; 
    
        dfs(0, 0, roomMatrix);
    
        let trapCount = 0;  
        let unreachableCount = 0; 
    
        for (let i = 0; i < roomX; i++) {
          for (let j = 0; j < roomY; j++) {
            if (roomMatrix[i][j] == 0) unreachableCount++;
            else if (roomMatrix[i][j] == -1) trapCount++;
          }
        }
    
        console.log(`${trapCount} ${unreachableCount}`);
        lines.length = 0;
      }
    });
    
    function dfs(currentX, currentY, roomMatrix) {
      if (currentX >= roomX || currentY >= roomY) return false; 
    
      if (roomMatrix[currentX][currentY] == 1) return false;  
      if (roomMatrix[currentX][currentY] == -1) return false; 
      if (roomMatrix[currentX][currentY] == 2) return true;  
    
      if (roomMatrix[currentX][currentY] == 0) {
        const canMoveEast = dfs(currentX + 1, currentY, roomMatrix); 
        const canMoveNorth = dfs(currentX, currentY + 1, roomMatrix);
    
        if (canMoveEast || canMoveNorth) {
          roomMatrix[currentX][currentY] = 2;
        } else {
          roomMatrix[currentX][currentY] = -1; 
        }
      }
    
      return roomMatrix[currentX][currentY] == 2;
    }
    

#### Java

    
    
    import java.util.ArrayList;
    import java.util.List;
    import java.util.Scanner;
    
    public class Main {
        static int row, col, wallNum;
        static List<List<Integer>> walls, matrix;
    
        public static void main(String[] args) {
            Scanner sc = new Scanner(System.in);
    
            // 读取输入的房间大小和墙壁数量
            row = sc.nextInt();
            col = sc.nextInt();
            wallNum = sc.nextInt();
    
            // 初始化墙壁列表
            walls = new ArrayList<>();
            // 读取每个墙壁的坐标并添加到墙壁列表中
            for (int i = 0; i < wallNum; i++) {
                List<Integer> wall = new ArrayList<>();
                wall.add(sc.nextInt());
                wall.add(sc.nextInt());
                walls.add(wall);
            }
    
            // 初始化房间矩阵
            matrix = new ArrayList<>();
            // 将房间矩阵的每个元素初始化为0
            for (int i = 0; i < row; i++) {
                List<Integer> rowList = new ArrayList<>();
                for (int j = 0; j < col; j++) {
                    rowList.add(0);
                }
                matrix.add(rowList);
            }
    
            // 将墙壁的位置在房间矩阵中标记为1
            for (List<Integer> wall : walls) {
                int x = wall.get(0);
                int y = wall.get(1);
                matrix.get(x).set(y, 1);
            }
    
            // 将出口位置标记为2
            matrix.get(row - 1).set(col - 1, 2);
    
            // 调用深度优先搜索函数进行路径规划
            dfs(0, 0);
    
            // 统计陷阱方格和不可达方格的数量
            int trapNum = 0, unreachableNum = 0;
    
            for (List<Integer> rowList : matrix) {
                for (int cell : rowList) {
                    if (cell == 0) {
                        unreachableNum++;
                    } else if (cell == -1) {
                        trapNum++;
                    }
                }
            }
    
            // 输出陷阱方格和不可达方格的数量
            System.out.println(trapNum + " " + unreachableNum);
        }
    
        public static boolean dfs(int x, int y) {
            // 如果机器人越界或者当前位置是墙壁或者陷阱方格，返回false
            if (x >= row || y >= col || matrix.get(x).get(y) == 1 || matrix.get(x).get(y) == -1) {
                return false;
            }
    
            // 如果机器人到达出口，返回true
            if (matrix.get(x).get(y) == 2) {
                return true;
            }
    
            // 递归搜索机器人向东和向北的路径
            boolean east = dfs(x + 1, y);
            boolean north = dfs(x, y + 1);
    
            // 根据机器人能否到达出口，将当前位置标记为2或者-1
            matrix.get(x).set(y, east || north ? 2 : -1);
    
            // 返回当前位置是否是出口
            return matrix.get(x).get(y) == 2;
        }
    }
    
    

#### python

    
    
    import sys
    
    def dfs(x, y):
        if x >= row or y >= col or matrix[x][y] == 1 or matrix[x][y] == -1:
            return False
    
        if matrix[x][y] == 2:
            return True
    
        east = dfs(x + 1, y)
        north = dfs(x, y + 1)
    
        if east or north:
            matrix[x][y] = 2
        else:
            matrix[x][y] = -1
    
        return matrix[x][y] == 2
    
    row, col  = map(int, input().split())
    wallNum = int(input())
    walls = [list(map(int, input().split())) for _ in range(wallNum)]
    
    matrix = [[0] * col for _ in range(row)]
    
    for wall in walls:
        i = wall[0]
        j = wall[1]
        matrix[i][j] = 1
    
    matrix[row - 1][col - 1] = 2
    
    dfs(0, 0)
    
    trapNum = 0
    unreachableNum = 0
    
    for i in range(row):
        for j in range(col):
            if matrix[i][j] == 0:
                unreachableNum += 1
            elif matrix[i][j] == -1:
                trapNum += 1
    
    print(trapNum, unreachableNum)
    
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

#### 完整用例

##### 用例1

    
    
    6 4
    5
    0 2
    1 2
    2 2
    4 1
    5 1
    

##### 用例2

    
    
    6 4
    4
    2 0
    2 1
    3 0
    3 1
    

##### 用例3

    
    
    3 3
    2
    1 0
    2 1
    

##### 用例4

    
    
    5 5
    1
    3 2
    

##### 用例5

    
    
    2 2
    2
    0 1
    1 0
    

##### 用例6 不符合题意的极端案例，可忽略

    
    
    10 10
    20
    0 1
    0 3
    0 5
    0 7
    0 9
    1 0
    1 2
    1 4
    1 6
    1 8
    2 1
    2 3
    2 5
    2 7
    2 9
    3 0
    3 2
    3 4
    3 6
    3 8
    4 1
    

##### 用例7 不符合题意的极端案例，可忽略

    
    
    8 8
    10
    0 1
    1 1
    2 1
    3 1
    4 1
    5 1
    6 1
    7 1
    7 2
    7 3
    

##### 用例8

    
    
    5 5
    6
    0 1
    1 0
    2 2
    3 3
    4 4
    4 3
    

##### 用例9

    
    
    7 7
    0
    

##### 用例10

    
    
    1000 1000
    0
    

