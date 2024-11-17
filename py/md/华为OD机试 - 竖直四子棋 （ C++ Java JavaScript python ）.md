#### 题目描述

竖直四子棋的棋盘是竖立起来的，双方轮流选择棋盘的一列下子，棋子因重力落到棋盘底部或者其他棋子之上，当一列的棋子放满时，无法再在这列上下子。

一方的4个棋子横、竖或者斜方向连成一线时获胜。

现给定一个棋盘和红蓝对弈双方的下子步骤，判断红方或蓝方是否在某一步获胜。

下面以一个6×5的棋盘图示说明落子过程：

![image-20230403215715092](https://i-blog.csdnimg.cn/blog_migrate/4c314f124a5ec8d36bac1adaa8ed2400.png)

下面给出横、竖和斜方向四子连线的图示：

![image-20230403215724498](https://i-blog.csdnimg.cn/blog_migrate/6eb17cdbfa057d8c84799fcbaddbc70b.png)

#### 输入描述

输入为2行，第一行指定棋盘的宽和高，为空格分隔的两个数字；

第二行依次间隔指定红蓝双方的落子步骤，第1步为红方的落子，第2步为蓝方的落子，第3步为红方的落子，以此类推。

步骤由空格分隔的一组数字表示，每个数字为落子的列的编号（最左边的列编号为1，往右递增）。用例保证数字均为32位有符号数。

#### 输出描述

如果落子过程中红方获胜，输出 N,red ；

如果落子过程中蓝方获胜，输出 N,blue ；

如果出现非法的落子步骤，输出 N,error。

N为落子步骤的序号，从1开始。如果双方都没有获胜，输出 0,draw 。

非法落子步骤有两种，一是列的编号超过棋盘范围，二是在一个已经落满子的列上落子。

N和单词red、blue、draw、error之间是英文逗号连接。

#### 用例1

输入

    
    
    5 5
    1 1 2 2 3 3 4 4
    

输出

    
    
    7,red
    

说明

> 在第7步，红方在第4列落下一子后，红方的四个子在第一行连成一线，故红方获胜，输出 7,red。

#### 用例2

输入

    
    
    5 5
    0 1 2 2 3 3 4 4
    

输出

    
    
    1,error
    

说明

> 第1步的列序号为0，超出有效列编号的范围，故输出 1,error。

#### C++

    
    
    #include <iostream>
    #include <vector>
    #include <sstream>
    
    using namespace std;
    
    bool isWin(int row, int col, int player, vector<vector<int>>& board, int height, int width) {
        vector<vector<int>> offsets = {{-1, 0}, {0, -1}, {-1, -1}, {-1, 1}};
    
        for (auto offset : offsets) {
            int count = 1;
    
            int newRow = row + offset[0];
            int newCol = col + offset[1];
            while (newRow >= 1 && newRow <= height && newCol >= 1 && newCol <= width && board[newRow][newCol] == player) {
                count++;
                newRow += offset[0];
                newCol += offset[1];
            }
    
            newRow = row - offset[0];
            newCol = col - offset[1];
            while (newRow >= 1 && newRow <= height && newCol >= 1 && newCol <= width && board[newRow][newCol] == player) {
                count++;
                newRow -= offset[0];
                newCol -= offset[1];
            }
    
            if (count == 4) return true;
        }
    
        return false;
    }
    
    int main() {
        vector<vector<int>> board;
        int width, height;
        cin >> width >> height;
    
        for (int i = 0; i < height + 1; i++) {
            vector<int> row(width + 1, 0);
            board.push_back(row);
        }
    
        string line;
        getline(cin, line);
        getline(cin, line);
        istringstream iss(line);
        int step;
        vector<int> steps;
        while (iss >> step) {
            steps.push_back(step);
        }
    
        for (int i = 0; i < steps.size(); i++) {
            if (steps[i] < 1 || steps[i] > width) {
                cout << i + 1 << ",error" << endl;
                return 0;
            }
    
            if (board[1][steps[i]] > 0) {
                cout << i + 1 << ",error" << endl;
                return 0;
            }
    
            int player = i % 2 == 0 ? 1 : 2;
    
            int row = height;
            int col = steps[i];
            while (board[row][col] > 0) {
                row--;
                if (row < 1) {
                    cout << i + 1 << ",error" << endl;
                    return 0;
                }
            }
            board[row][col] = player;
    
            if (i >= 6 && isWin(row, col, player, board, height, width)) {
                cout << i + 1 << "," << (player == 1 ? "red" : "blue") << endl;
                return 0;
            }
        }
    
        cout << "0,draw" << endl;
    
        return 0;
    }
    
    

#### java

    
    
    import java.util.Arrays;
    import java.util.Scanner;
    
    public class Main {
      public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
    
        // 读取棋盘的宽和高
        int[] size = Arrays.stream(sc.nextLine().split(" ")).mapToInt(Integer::parseInt).toArray();
        int width = size[0];
        int height = size[1];
    
        // 读取落子步骤
        int[] steps = Arrays.stream(sc.nextLine().split(" ")).mapToInt(Integer::parseInt).toArray();
    
        // 初始化棋盘
        int[][] board = new int[height + 1][width + 1];
    
        for (int i = 0; i < steps.length; i++) {
          // 判断落子列是否合法或已满
          if (steps[i] < 1 || steps[i] > width || board[1][steps[i]] > 0) {
            System.out.println(i + 1 + ",error");
            return;
          }
    
          // 确定当前玩家
          int player = i % 2 == 0 ? 1 : 2;
    
          // 落子
          int row = height;
          int col = steps[i];
          while (row >= 1 && board[row][col] > 0) {
            row--;
          }
          if (row < 1) {
            System.out.println(i + 1 + ",error");
            return;
          }
          board[row][col] = player;
    
          // 判断是否获胜
          if (i >= 6 && isWin(row, col, player, board, height, width)) {
            System.out.println(i + 1 + "," + (player == 1 ? "red" : "blue"));
            return;
          }
        }
    
        System.out.println("0,draw");
      }
    
      // 方向数组，表示横、竖和斜方向的偏移量
      static int[][] offsets = {{-1, 0}, {0, -1}, {-1, -1}, {-1, 1}};
    
      public static boolean isWin(int row, int col, int player, int[][] board, int height, int width) {
        for (int[] offset : offsets) {
          int count = 1;
    
          // 向一个方向遍历，统计相同颜色棋子的数量
          int newRow = row + offset[0];
          int newCol = col + offset[1];
          while (newRow >= 1 && newRow <= height && newCol >= 1 && newCol <= width && board[newRow][newCol] == player) {
            count++;
            newRow += offset[0];
            newCol += offset[1];
          }
    
          // 向相反的方向遍历，统计相同颜色棋子的数量
          newRow = row - offset[0];
          newCol = col - offset[1];
          while (newRow >= 1 && newRow <= height && newCol >= 1 && newCol <= width && board[newRow][newCol] == player) {
            count++;
            newRow -= offset[0];
            newCol -= offset[1];
          }
    
          // 如果有四个连续的棋子，则获胜
          if (count == 4) return true;
        }
    
        return false;
      }
    }
    
    

#### python

    
    
    from typing import List
    
    def main():
        # 读取棋盘的宽和高
        size = list(map(int, input().split()))
        width = size[0]
        height = size[1]
    
        # 读取落子步骤
        steps = list(map(int, input().split()))
    
        # 初始化棋盘
        board = [[0] * (width + 1) for _ in range(height + 1)]
    
        for i in range(len(steps)):
            # 判断落子列是否合法或已满
            if steps[i] < 1 or steps[i] > width or board[1][steps[i]] > 0:
                print(i + 1, "error",sep=',')
                return
    
            # 确定当前玩家
            player = 1 if i % 2 == 0 else 2
    
            # 落子
            row = height
            col = steps[i]
            while row >= 1 and board[row][col] > 0:
                row -= 1
            if row < 1:
                print(i + 1, "error",sep=',')
                return
            board[row][col] = player
    
            # 判断是否获胜
            if i >= 6 and isWin(row, col, player, board, height, width):
                print(i + 1, "red" if player == 1 else "blue",sep=',')
                return
    
        print("0,draw")
    
    # 方向数组，表示横、竖和斜方向的偏移量
    offsets = [[-1, 0], [0, -1], [-1, -1], [-1, 1]]
    
    def isWin(row: int, col: int, player: int, board: List[List[int]], height: int, width: int) -> bool:
        for offset in offsets:
            count = 1
    
            # 向一个方向遍历，统计相同颜色棋子的数量
            newRow = row + offset[0]
            newCol = col + offset[1]
            while newRow >= 1 and newRow <= height and newCol >= 1 and newCol <= width and board[newRow][newCol] == player:
                count += 1
                newRow += offset[0]
                newCol += offset[1]
    
            # 向相反的方向遍历，统计相同颜色棋子的数量
            newRow = row - offset[0]
            newCol = col - offset[1]
            while newRow >= 1 and newRow <= height and newCol >= 1 and newCol <= width and board[newRow][newCol] == player:
                count += 1
                newRow -= offset[0]
                newCol -= offset[1]
    
            # 如果有四个连续的棋子，则获胜
            if count == 4:
                return True
    
        return False
    
    if __name__ == "__main__":
        main()
    
    
    
    

#### javascript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    // 读取棋盘的宽和高
    let size;
    // 读取落子步骤
    let steps = [];
    
    rl.on('line', (input) => {
      if (!size) {
        size = input.split(" ").map(Number);
      } else {
        steps = input.split(" ").map(Number);
        playGame(size, steps);
        rl.close();
      }
    });
    
    function playGame(size, steps) {
      const width = size[0];
      const height = size[1];
    
      // 初始化棋盘
      const board = new Array(height + 1).fill(0).map(() => new Array(width + 1).fill(0));
    
      for (let i = 0; i < steps.length; i++) {
        // 判断落子列是否合法或已满
        if (steps[i] < 1 || steps[i] > width || board[1][steps[i]] > 0) {
          console.log(i + 1 + ",error");
          return;
        }
    
        // 确定当前玩家
        const player = i % 2 === 0 ? 1 : 2;
    
        // 落子
        let row = height;
        let col = steps[i];
        while (row >= 1 && board[row][col] > 0) {
          row--;
        }
        if (row < 1) {
          console.log(i + 1 + ",error");
          return;
        }
        board[row][col] = player;
    
        // 判断是否获胜
        if (i >= 6 && isWin(row, col, player, board, height, width)) {
          console.log(i + 1 + "," + (player === 1 ? "red" : "blue"));
          return;
        }
      }
    
      console.log("0,draw");
    }
    
    // 方向数组，表示横、竖和斜方向的偏移量
    const offsets = [[-1, 0], [0, -1], [-1, -1], [-1, 1]];
    
    function isWin(row, col, player, board, height, width) {
      for (let offset of offsets) {
        let count = 1;
    
        // 向一个方向遍历，统计相同颜色棋子的数量
        let newRow = row + offset[0];
        let newCol = col + offset[1];
        while (newRow >= 1 && newRow <= height && newCol >= 1 && newCol <= width && board[newRow][newCol] === player) {
          count++;
          newRow += offset[0];
          newCol += offset[1];
        }
    
        // 向相反的方向遍历，统计相同颜色棋子的数量
        newRow = row - offset[0];
        newCol = col - offset[1];
        while (newRow >= 1 && newRow <= height && newCol >= 1 && newCol <= width && board[newRow][newCol] === player) {
          count++;
          newRow -= offset[0];
          newCol -= offset[1];
        }
    
        // 如果有四个连续的棋子，则获胜
        if (count === 4) return true;
      }
    
      return false;
    }
    

> #### 文章目录
>
>   *     *       * 题目描述
>       * 输入描述
>       * 输出描述
>       * 用例1
>       * 用例2
>       * C++
>       * java
>       * python
>       * javascript
>       * 完整用例
>       *         * 用例1
>         * 用例2
>         * 用例3
>         * 用例4
>         * 用例5
>         * 用例6
>         * 用例7
>         * 用例8
>         * 用例9
>         * 用例10
>

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

#### 完整用例

##### 用例1

    
    
    5 5
    1 1 2 2 3 3 4 4
    

##### 用例2

    
    
    5 5
    0 1 2 2 3 3 4 4
    

##### 用例3

    
    
    5 5
    2 2 3 3 4 4 5 5
    

##### 用例4

    
    
    4 3
    1 1 1 1 1 1 1 1
    

##### 用例5

    
    
    6 5
    3 4 5 3 4 5 3 4
    

##### 用例6

    
    
    6 7
    1 2 3 4 5 6 1 2 3 4 5 6 1 2 3 4 5 6 1 2 3 4 5 6 1 2 3 4 5 6 1 2 3 4 5 6 1 2 3 4 5 6 1 2 3 4 5 6 1 2 3 4 5 6 1 2 3 4 5 6
    

##### 用例7

    
    
    4 4
    1 2 3 4 1 2 3 4 1 2 3 4 1 2 3 4
    

##### 用例8

    
    
    10 10
    1 1 2 2 3 3 4 4 5 5 6 6 7 7 8 8 9 9 10 10
    

##### 用例9

    
    
    7 6
    1 2 3 4 5 6 7 1 2 3 4 5 6 7 1 2 3 4 5 6 7 1 2 3 4 5 6 7 1 2 3 4 5 6 7 1 2 3 4 5 6 7
    

##### 用例10

    
    
    4 4
    1 1 1 1 2 2 2 2 3 3 3 3 4 4 4 4
    

