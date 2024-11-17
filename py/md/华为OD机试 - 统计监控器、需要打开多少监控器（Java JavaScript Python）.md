### 题目描述：统计监控、需要打开多少监控器

在一长方形停车场内，每个车位上方都有对应监控器，当且仅当在当前车位或者前后左右四个方向任意一个车位范围停车时，监控器才需要打开，给出某一时刻停车场的停车分布，请统计最少需要打开多少个监控器。

### 输入

第一行输入m，n表示长宽，满足1 < m,n <= 20；

后面输入m行，每行有n个0或1的整数，整数间使用一个空格隔开，表示该行已停车情况，其中0表示空位，1表示已停；

### 输出

最少需要打开监控器的数量。

##### ACM输入输出模式

如果你经常使用**Leetcode** ,会知道**letcode** 是不需要编写输入输出函数的。但是华为OD机考使用的是 **ACM 模式**
，需要手动编写输入和输出。

所以最好在牛-
客上提前熟悉这种模式。例如C++使用`cin/cout`,python使用`input()/print()`。JavaScript使用node的`readline()`和`console.log()`。Java
使用`sacnner/system.out.print()`

### 用例一

#### 输入

    
    
    3 3
    0 0 0
    0 1 0
    0 0 0
    

#### 输出

    
    
    5
    

### 用例二

#### 输入

    
    
    3 3
    1 0 0
    0 1 0
    0 0 0
    

#### 输出

    
    
    6
    

#### 机考代码查重

华为OD机考完成之后，官方会进行代码查重。**华为 od 机考确实有很大的概率抽到原题**
。如果碰到了题库中的原题，一定不要直接使用题解中的代码，尤其是变量名，一定要修改，可以改成毫无意义的单词。除了变量名之外，代码的组织结构和逻辑一定要进行改变，这就要求在日常的刷题中，提前编写好属于自己的代码。

### C++

    
    
    #include <iostream>
    using namespace std;
    
    int main() {
      int rows, cols;
      cin >> rows >> cols;
    
      int** parkingLot = new int*[rows];
      for (int i = 0; i < rows; i++) {
        parkingLot[i] = new int[cols];
        for (int j = 0; j < cols; j++) {
          cin >> parkingLot[i][j];
        }
      }
    
      int count = 0;
    
      for (int x = 0; x < rows; x++) {
        for (int y = 0; y < cols; y++) {
          if (parkingLot[x][y] == 1) {
            count++;
            continue;
          }
    
          bool hasNeighbor = false;
          if (x - 1 >= 0 && parkingLot[x - 1][y] == 1) {
            hasNeighbor = true;
          } else if (x + 1 < rows && parkingLot[x + 1][y] == 1) {
            hasNeighbor = true;
          } else if (y - 1 >= 0 && parkingLot[x][y - 1] == 1) {
            hasNeighbor = true;
          } else if (y + 1 < cols && parkingLot[x][y + 1] == 1) {
            hasNeighbor = true;
          }
    
          if (hasNeighbor) {
            count++;
          }
        }
      }
    
      cout << count << endl;
    
      for (int i = 0; i < rows; i++) {
        delete[] parkingLot[i];
      }
      delete[] parkingLot;
    
      return 0;
    }
    

### Java

    
    
    import java.util.Scanner;
    
    public class Main {
      public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
    
        int rows = sc.nextInt();
        int cols = sc.nextInt();
    
        int[][] parkingLot = new int[rows][cols];
        for (int i = 0; i < rows; i++) {
          for (int j = 0; j < cols; j++) {
            parkingLot[i][j] = sc.nextInt();
          }
        }
    
        int count = 0;
    
        for (int x = 0; x < rows; x++) {
          for (int y = 0; y < cols; y++) {
            if (parkingLot[x][y] == 1) {
              count++;
              continue;
            }
    
            boolean hasNeighbor = false;
            if (x - 1 >= 0 && parkingLot[x - 1][y] == 1) {
              hasNeighbor = true;
            } else if (x + 1 < rows && parkingLot[x + 1][y] == 1) {
              hasNeighbor = true;
            } else if (y - 1 >= 0 && parkingLot[x][y - 1] == 1) {
              hasNeighbor = true;
            } else if (y + 1 < cols && parkingLot[x][y + 1] == 1) {
              hasNeighbor = true;
            }
    
            if (hasNeighbor) {
              count++;
            }
          }
        }
    
        System.out.println(count);
      }
    }
    

### JavaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    let m, n;
    let parkingLot = [];
    
    rl.on('line', (line) => {
      if (!m) {
        [m, n] = line.trim().split(' ').map(Number);
      } else {
        parkingLot.push(line.trim().split(' ').map(Number));
      }
    });
    
    rl.on('close', () => {
      let count = 0;
    
      for (let x = 0; x < m; x++) {
        for (let y = 0; y < n; y++) {
          if (parkingLot[x][y] === 1) {
            count++;
            continue;
          }
    
          let hasNeighbor = false;
          if (x - 1 >= 0 && parkingLot[x - 1][y] === 1) {
            hasNeighbor = true;
          } else if (x + 1 < m && parkingLot[x + 1][y] === 1) {
            hasNeighbor = true;
          } else if (y - 1 >= 0 && parkingLot[x][y - 1] === 1) {
            hasNeighbor = true;
          } else if (y + 1 < n && parkingLot[x][y + 1] === 1) {
            hasNeighbor = true;
          }
    
          if (hasNeighbor) {
            count++;
          }
        }
      }
    
      console.log(count);
    });
    
    

### python

    
    
    rows , cols  = map(int, input().split())
    
    parkingLot = []
    for i in range(rows):
        row = list(map(int, input().split()))
        parkingLot.append(row)
    
    count = 0
    
    for x in range(rows):
        for y in range(cols):
            if parkingLot[x][y] == 1:
                count += 1
                continue
    
            hasNeighbor = False
            if x - 1 >= 0 and parkingLot[x - 1][y] == 1:
                hasNeighbor = True
            elif x + 1 < rows and parkingLot[x + 1][y] == 1:
                hasNeighbor = True
            elif y - 1 >= 0 and parkingLot[x][y - 1] == 1:
                hasNeighbor = True
            elif y + 1 < cols and parkingLot[x][y + 1] == 1:
                hasNeighbor = True
    
            if hasNeighbor:
                count += 1
    
    print(count)
    

> #### 文章目录
>
>   *     * 题目描述：统计监控、需要打开多少监控器
>     * 输入
>     * 输出
>     *       *         * ACM输入输出模式
>     * 用例一
>     *       * 输入
>       * 输出
>     * 用例二
>     *       * 输入
>       * 输出
>       * 机考代码查重
>     * C++
>     * Java
>     * JavaScript
>     * python
>     *       * 完整用例
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

    
    
    3 3
    0 0 0
    0 1 0
    0 0 0
    

##### 用例2

    
    
    4 4
    0 0 0 0
    0 1 0 0
    0 0 0 0
    0 0 1 0
    

##### 用例3

    
    
    2 2
    0 1
    0 0
    

##### 用例4

    
    
    5 5
    0 0 0 0 0
    0 1 0 0 0
    0 0 0 0 0
    0 0 1 0 0
    0 0 0 0 0
    

##### 用例5

    
    
    3 4
    0 0 0 0
    0 1 0 0
    0 0 0 0
    

##### 用例6

    
    
    6 6
    0 0 0 0 0 0
    0 1 0 0 0 0
    0 0 0 0 0 0
    0 0 0 0 0 0
    0 0 1 0 0 0
    0 0 0 0 0 0
    

##### 用例7

    
    
    5 8
    0 0 0 0 0 0 0 0
    0 1 0 0 0 0 0 0
    0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0
    0 0 1 0 0 0 0 0
    

##### 用例8

    
    
    4 4
    0 0 0 0
    0 1 0 0
    0 0 0 0
    0 0 1 0
    

##### 用例9

    
    
    5 5
    0 0 0 0 0
    0 1 0 0 0
    0 0 0 0 0
    0 0 1 0 0
    0 0 0 0 0
    

##### 用例10

    
    
    6 6
    0 0 0 0 0 0
    0 1 0 0 0 0
    0 0 0 0 0 0
    0 0 0 0 0 0
    0 0 1 0 0 0
    0 0 0 0 0 0
    

