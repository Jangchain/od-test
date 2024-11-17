#### 题目描述

[贪吃蛇](https://so.csdn.net/so/search?q=%E8%B4%AA%E5%90%83%E8%9B%87&spm=1001.2101.3001.7020)是一个经典游戏，蛇的身体由若干方格连接而成，身体随蛇头移动。蛇头触碰到食物时，蛇的长度会增加一格。蛇头和身体的任一方格或者游戏版图边界碰撞时，游戏结束。

下面让我们来完成贪吃蛇游戏的模拟。

给定一个N*M的数组arr，代表N*M个方格组成的版图，贪吃蛇每次移动一个方格。

若arr[i][j] == ‘H’，表示该方格为贪吃蛇的起始位置；

若arr[i][j] == ‘F’，表示该方格为食物，

若arr[i][j] == ‘E’，表示该方格为空格。

贪吃蛇初始长度为1，初始移动方向为向左。

为给定一系列贪吃蛇的移动操作，返回操作后蛇的长度，如果在操作执行完之前已经游戏结束，返回游戏结束时蛇的长度。

贪吃蛇移动、吃食物和碰撞处理的细节见下面图示：

![image-20230322190351018](https://i-blog.csdnimg.cn/blog_migrate/4c4014103be4ab7babbfcf117aae9afc.png)

图1：截取了贪吃蛇移动的一个中间状态，H表示蛇头，F表示食物，数字为蛇身体各节的编号，蛇为向左移动，此时蛇头和食物已经相邻

图2：蛇头向左移动一格，蛇头和食物重叠，注意此时食物的格子成为了新的蛇头，第1节身体移动到蛇头位置，第2节身体移动到第1节身体位置，以此类推，最后添加第4节身体到原来第3节身体的位置。

图3：蛇头继续向左移动一格，身体的各节按上述规则移动，此时蛇头已经和边界相邻，但还未碰撞。

图4：蛇头继续向左移动一格，此时蛇头已经超过边界，发生碰撞，游戏结束。

图5和图6给出一个蛇头和身体碰撞的例子，蛇为向上移动。

图5时蛇头和第7节身体相邻，但还未碰撞；

图6蛇头向上移动一格，此时蛇头和第8节身体都移动到了原来第7节身体的位置，发生碰撞，游戏结束。

#### 输入描述

输入第一行为空格分隔的字母，代表贪吃蛇的移动操作。

字母取值为U、D、L、R和G，

U、D、L、R分别表示贪吃蛇往上、下、左、右和转向，转向时贪吃蛇不移动 ，G表示贪吃蛇按当前的方向移动一格。

用例保证输入的操作正确。

第二行为空格分隔的两个数，指定N和M，为数组的行和列数。

余下N行每行是空格分隔的M个字母。字母取值为H、F和E，H表示贪吃蛇的起始位置，F表示食物，E表示该方格为空。

用例保证有且只有一个H，而F和E会有多个。

#### 输出描述

输出一个数字，为蛇的长度。

##### ACM输入输出模式

如果你经常使用**Leetcode** ,会知道**letcode** 是不需要编写输入输出函数的。但是华为OD机考使用的是 **ACM 模式**
，需要手动编写输入和输出。

所以最好在牛-
客上提前熟悉这种模式。例如C++使用`cin/cout`,python使用`input()/print()`。JavaScript使用node的`readline()`和`console.log()`。Java
使用`sacnner/system.out.print()`

#### 用例

输入| D G G  
3 3  
F F F  
F F H  
E F E  
---|---  
输出| 1  
说明| 地图表示为：

  * 蛇头 H(Head)
  * 食物 F(Food)
  * E表示该方格为空

四个方向分别表示为：

  * 向上 U(up)
  * 向下 D(down)
  * 向左 L(Left)
  * 向右 R(Right)

  
  
#### 题目解析

纯[逻辑题](https://so.csdn.net/so/search?q=%E9%80%BB%E8%BE%91%E9%A2%98&spm=1001.2101.3001.7020)，注意判断边界条件。

#### 机考代码查重

华为OD机考完成之后，官方会进行代码查重。**华为 od 机考确实有很大的概率抽到原题**
。如果碰到了题库中的原题，一定不要直接使用题解中的代码，尤其是变量名，一定要修改，可以改成毫无意义的单词。除了变量名之外，代码的组织结构和逻辑一定要进行改变，这就要求在日常的刷题中，提前编写好属于自己的代码。

#### C++

    
    
    #include <iostream>
    #include <string>
    #include <vector>
    #include <deque>
    #include <algorithm>
    using namespace std;
    
    string matrix[1000][1000];
    int n, m;
    
    // 贪吃蛇移动函数
    // [i,j]是上一次蛇头位置，snake是蛇的位置信息，direction是蛇头移动方向
    // 返回值：如果游戏结束，返回贪吃蛇长度，否则返回0
    int go(int i, int j, deque<vector<int>> &snake, string direction) {
        // [r,c]是当前蛇头位置
        int r = i, c = j;
    
        if (direction == "U") {
            r--;
        } else if (direction == "D") {
            r++;
        } else if (direction == "L") {
            c--;
        } else if (direction == "R") {
            c++;
        }
    
        if (c < 0 || c >= n || r < 0 || r >= m) {
            // 越界，游戏结束，返回贪吃蛇长度
            return snake.size();
        } else {
            if (matrix[r][c] == "E") {
                // 如果蛇头去的位置是空地
                matrix[r][c] = "H";
                snake.push_front({r, c});
                vector<int> tmp = snake.back();
                matrix[tmp[0]][tmp[1]] = "H";
                snake.pop_back();
            } else if (matrix[r][c] == "F") {
                // 如果蛇头去的位置是食物
                snake.push_front({r, c});
                matrix[r][c] = "H";
            } else {
                // 吃到自己身体，游戏结束，返回贪吃蛇长度
                return snake.size();
            }
        }
    
        // 返回0表示继续下一步移动
        return 0;
    }
    
    int main() {
        // 读入贪吃蛇移动指令
        vector<string> operates;
        string line;
        getline(cin, line);
        string operate;
        for (int i = 0; i < line.size(); i++) {
            if (line[i] == ' ') {
                operates.push_back(operate);
                operate = "";
            } else {
                operate += line[i];
            }
        }
        operates.push_back(operate);
    
        // 读入矩阵信息
        getline(cin, line);
        int pos = 0;
        vector<int> tmp;
        for (int i = 0; i < line.size(); i++) {
            if (line[i] == ' ') {
                tmp.push_back(stoi(line.substr(pos, i - pos)));
                pos = i + 1;
            }
        }
        tmp.push_back(stoi(line.substr(pos, line.size() - pos)));
        n = tmp[0];
        m = tmp[1];
    
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                cin >> matrix[i][j];
            }
        }
    
        // 找到初始蛇头位置，并使用snake[0]来维护蛇头位置
        deque<vector<int>> snake;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (matrix[i][j] == "H") {
                    snake.push_back({i, j});
                }
            }
        }
    
        // 蛇头移动方向
        string direction = "L"; // 初始默认向左
    
        // 处理贪吃蛇移动指令
        for (string operate : operates) {
            if (operate == "G") {
                // 如果为G，则表示验证direction方向移动一格
                vector<int> pos = snake.front();
                int res = go(pos[0], pos[1], snake, direction); // 具体移动逻辑
                if (res > 0) {
                    // 游戏结束，返回贪吃蛇长度
                    cout << res << endl;
                    return 0;
                }
            } else {
                direction = operate;
            }
        }
    
        // 指令执行完毕，输出贪吃蛇长度
        cout << snake.size() << endl;
    
        return 0;
    }
    

#### JavaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    let matrix = [];
    let n, m;
    
    // 贪吃蛇移动函数
    // [i,j]是上一次蛇头位置，snake是蛇的位置信息，direction是蛇头移动方向
    // 返回值：如果游戏结束，返回贪吃蛇长度，否则返回0
    function go(i, j, snake, direction) {
      // [r,c]是当前蛇头位置
      let r = i, c = j;
    
      if (direction === "U") {
        r--;
      } else if (direction === "D") {
        r++;
      } else if (direction === "L") {
        c--;
      } else if (direction === "R") {
        c++;
      }
    
      if (c < 0 || c >= n || r < 0 || r >= m) {
        // 越界，游戏结束，返回贪吃蛇长度
        return snake.length;
      } else {
        if (matrix[r][c] === "E") {
          // 如果蛇头去的位置是空地
          matrix[r][c] = "H";
          snake.unshift([r, c]);
          let tmp = snake.pop();
          matrix[tmp[0]][tmp[1]] = "E";
        } else if (matrix[r][c] === "F") {
          // 如果蛇头去的位置是食物
          snake.unshift([r, c]);
          matrix[r][c] = "H";
        } else {
          // 吃到自己身体，游戏结束，返回贪吃蛇长度
          return snake.length;
        }
      }
    
      // 返回0表示继续下一步移动
      return 0;
    }
    
    rl.on('line', (line) => {
      if (!n) {
        // 读入矩阵信息
        let pos = 0;
        let tmp = [];
        for (let i = 0; i < line.length; i++) {
          if (line[i] === ' ') {
            tmp.push(parseInt(line.substring(pos, i)));
            pos = i + 1;
          }
        }
        tmp.push(parseInt(line.substring(pos, line.length)));
        n = tmp[0];
        m = tmp[1];
      } else if (matrix.length < n) {
        matrix.push(line.split(' '));
        if (matrix.length === n) {
          // 找到初始蛇头位置，并使用snake[0]来维护蛇头位置
          let snake = [];
          for (let i = 0; i < n; i++) {
            for (let j = 0; j < m; j++) {
              if (matrix[i][j] === "H") {
                snake.push([i, j]);
              }
            }
          }
    
          // 蛇头移动方向
          let direction = "L"; // 初始默认向左
    
          // 读入贪吃蛇移动指令
          let operates = line.split(' ');
    
          // 处理贪吃蛇移动指令
          for (let i = 0; i < operates.length; i++) {
            let operate = operates[i];
            if (operate === "G") {
              // 如果为G，则表示验证direction方向移动一格
              let pos = snake[0];
              let res = go(pos[0], pos[1], snake, direction); // 具体移动逻辑
              if (res > 0) {
                // 游戏结束，返回贪吃蛇长度
                console.log(res);
                rl.close();
                return;
              }
            } else {
              direction = operate;
            }
          }
    
          // 指令执行完毕，输出贪吃蛇长度
          console.log(snake.length);
          rl.close();
        }
      }
    }).on('close', () => {
      process.exit();
    });
    
    

#### Java

    
    
    import java.util.*;
    
    public class Main {
        static String[][] matrix = new String[1000][1000];
        static int n, m;
    
        // 贪吃蛇移动函数
        // [i,j]是上一次蛇头位置，snake是蛇的位置信息，direction是蛇头移动方向
        // 返回值：如果游戏结束，返回贪吃蛇长度，否则返回0
        public static int go(int i, int j, Deque<List<Integer>> snake, String direction) {
            // [r,c]是当前蛇头位置
            int r = i, c = j;
    
            if (direction.equals("U")) {
                r--;
            } else if (direction.equals("D")) {
                r++;
            } else if (direction.equals("L")) {
                c--;
            } else if (direction.equals("R")) {
                c++;
            }
    
            if (c < 0 || c >= n || r < 0 || r >= m) {
                // 越界，游戏结束，返回贪吃蛇长度
                return snake.size();
            } else {
                if (matrix[r][c].equals("E")) {
                    // 如果蛇头去的位置是空地
                    matrix[r][c] = "H";
                    snake.addFirst(Arrays.asList(r, c));
                    List<Integer> tmp = snake.getLast();
                    matrix[tmp.get(0)][tmp.get(1)] = "H";
                    snake.removeLast();
                } else if (matrix[r][c].equals("F")) {
                    // 如果蛇头去的位置是食物
                    snake.addFirst(Arrays.asList(r, c));
                    matrix[r][c] = "H";
                } else {
                    // 吃到自己身体，游戏结束，返回贪吃蛇长度
                    return snake.size();
                }
            }
    
            // 返回0表示继续下一步移动
            return 0;
        }
    
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
    
            // 读入贪吃蛇移动指令
            List<String> operates = new ArrayList<>();
            String line = scanner.nextLine();
            String operate = "";
            for (int i = 0; i < line.length(); i++) {
                if (line.charAt(i) == ' ') {
                    operates.add(operate);
                    operate = "";
                } else {
                    operate += line.charAt(i);
                }
            }
            operates.add(operate);
    
            // 读入矩阵信息
            line = scanner.nextLine();
            int pos = 0;
            List<Integer> tmp = new ArrayList<>();
            for (int i = 0; i < line.length(); i++) {
                if (line.charAt(i) == ' ') {
                    tmp.add(Integer.parseInt(line.substring(pos, i)));
                    pos = i + 1;
                }
            }
            tmp.add(Integer.parseInt(line.substring(pos)));
            n = tmp.get(0);
            m = tmp.get(1);
    
            for (int i = 0; i < n; i++) {
                line = scanner.nextLine();
                pos = 0;
                for (int j = 0; j < m; j++) {
                    int k = line.indexOf(' ', pos);
                    if (k == -1) {
                        matrix[i][j] = line.substring(pos);
                    } else {
                        matrix[i][j] = line.substring(pos, k);
                    }
                    pos = k + 1;
                }
            }
    
            // 找到初始蛇头位置，并使用snake[0]来维护蛇头位置
            Deque<List<Integer>> snake = new LinkedList<>();
            for (int i = 0; i < n; i++) {
                for (int j = 0; j < m; j++) {
                    if (matrix[i][j].equals("H")) {
                        snake.addLast(Arrays.asList(i, j));
                    }
                }
            }
    
            // 蛇头移动方向
            String direction = "L"; // 初始默认向左
    
            // 处理贪吃蛇移动指令
            for (String op : operates) {
                if (op.equals("G")) {
                    // 如果为G，则表示验证direction方向移动一格
                    List<Integer> pos1 = snake.getFirst();
                    int res = go(pos1.get(0), pos1.get(1), snake, direction); // 具体移动逻辑
                    if (res > 0) {
                        // 游戏结束，返回贪吃蛇长度
                        System.out.println(res);
                        return;
                    }
                } else {
                    direction = op;
                }
            }
    
            // 指令执行完毕，输出贪吃蛇长度
            System.out.println(snake.size());
    
            scanner.close();
        }
    }
    

#### python

    
    
    from collections import deque
    
    matrix = [[''] * 1000 for _ in range(1000)]
    n, m = 0, 0
    
    # 贪吃蛇移动函数
    # [i,j]是上一次蛇头位置，snake是蛇的位置信息，direction是蛇头移动方向
    # 返回值：如果游戏结束，返回贪吃蛇长度，否则返回0
    def go(i, j, snake, direction):
        # [r,c]是当前蛇头位置
        r, c = i, j
    
        if direction == "U":
            r -= 1
        elif direction == "D":
            r += 1
        elif direction == "L":
            c -= 1
        elif direction == "R":
            c += 1
    
        if c < 0 or c >= n or r < 0 or r >= m:
            # 越界，游戏结束，返回贪吃蛇长度
            return len(snake)
        else:
            if matrix[r][c] == "E":
                # 如果蛇头去的位置是空地
                matrix[r][c] = "H"
                snake.appendleft([r, c])
                tmp = snake[-1]
                matrix[tmp[0]][tmp[1]] = "H"
                snake.pop()
            elif matrix[r][c] == "F":
                # 如果蛇头去的位置是食物
                snake.appendleft([r, c])
                matrix[r][c] = "H"
            else:
                # 吃到自己身体，游戏结束，返回贪吃蛇长度
                return len(snake)
    
        # 返回0表示继续下一步移动
        return 0
    
    # 读入贪吃蛇移动指令
    operates = input().split()
    
    # 读入矩阵信息
    n, m = map(int, input().split())
    for i in range(n):
        line = input().split()
        for j in range(m):
            matrix[i][j] = line[j]
    
    # 找到初始蛇头位置，并使用snake[0]来维护蛇头位置
    snake = deque()
    for i in range(n):
        for j in range(m):
            if matrix[i][j] == "H":
                snake.append([i, j])
    
    # 蛇头移动方向
    direction = "L" # 初始默认向左
    
    # 处理贪吃蛇移动指令
    for op in operates:
        if op == "G":
            # 如果为G，则表示验证direction方向移动一格
            pos1 = snake[0]
            res = go(pos1[0], pos1[1], snake, direction) # 具体移动逻辑
            if res > 0:
                # 游戏结束，返回贪吃蛇长度
                print(res)
                exit()
        else:
            direction = op
    
    # 指令执行完毕，输出贪吃蛇长度
    print(len(snake))
    

> #### 文章目录
>
>   *     *       * 题目描述
>       * 输入描述
>       * 输出描述
>       *         * ACM输入输出模式
>       * 用例
>       * 题目解析
>       * 机考代码查重
>       * C++
>       * JavaScript
>       * Java
>       * python
>

![fengmian](https://img-
blog.csdnimg.cn/img_convert/1d2f33ed8cf2fb1b9a4fe09513f7aa94.png)

