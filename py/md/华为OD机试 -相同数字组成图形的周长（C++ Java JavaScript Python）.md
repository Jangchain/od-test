#### 题目描述

有一个64×64的矩阵，每个元素的默认值为0，现在向里面填充数字，相同的数字组成一个实心图形，如下图所示是矩阵的局部（空白表示填充0）：

![image-20230422185118701](https://i-blog.csdnimg.cn/blog_migrate/8d438cba2fae6cb388b6a8444c195499.png)

数字1组成了蓝色边框的实心图形，数字2组成了红色边框的实心图形。

单元格的边长规定为1个单位。

请根据输入，计算每个非0值填充出来的实心圆形的周长。

#### 输入描述

  1. 第一行输入N，表示N个图形，N > 0 且 N < 64 × 64
  2. 矩阵左上角单元格坐标记作(0, 0)，第一个数字表示行号，第二个数字表示列号
  3. 接下来是N行，每行第一个数是矩阵单元格填充的数字，后续每两个一组，表示填充该数字的单元格坐标
  4. 答题者无需考虑数据格式非法的场景，题目用例不考察数据格式
  5. 题目用例保证同一个填充值只会有一行输入数据

#### 输出描述

  * 一共输出N个数值，每个数值表示某一行输入表示图形的周长
  * 输出顺序需和输入的隔行顺序保持一致，即第1个数是输入的第1个图形的周长，第2个数是输入的第2个图形的周长，以此类推。

#### 用例

输入| 2  
1 1 3 2 2 2 3 2 4 3 2 3 3 3 4 4 1 4 2 4 3 4 4 5 2 5 3  
2 3 7 3 8 4 5 4 6 4 7 4 8 5 4 5 5 5 6 5 7 5 8 6 4 6 5 6 6 6 7 6 8 7 4 7 5 7 6
7 7 7 8  
---|---  
输出| 18 20  
说明| 无  
  
#### 解题思路：

主要利用了矩阵来表示图形，通过遍历矩阵并检查每个填充单元格的上下左右，计算出每个实心图形的周长

  1. 读取输入的图形个数 N。
  2. 初始化一个 64x64 的矩阵，所有元素默认值为 0。
  3. 读取 N 个图形的填充数据，将输入的坐标填充到矩阵中。
  4. 初始化一个列表，用于存储每个图形的周长。
  5. 遍历矩阵，计算每个图形的周长。对于每个填充的单元格，检查其上下左右是否为空或填充了不同的数字。如果是，则周长加 1。这样可以确保计算出每个实心图形的正确周长。 
     * 如果当前单元格上方为空或不同数字，周长加 1。
     * 如果当前单元格下方为空或不同数字，周长加 1。
     * 如果当前单元格左侧为空或不同数字，周长加 1。
     * 如果当前单元格右侧为空或不同数字，周长加 1。
  6. 输出每个图形的周长，按照输入的顺序输出。

#### C++

    
    
    #include <iostream>
    #include <vector>
    #include <sstream>
    
    using namespace std;
    
    int main() {
      // 读取输入的N，表示N个图形
      int N;
      cin >> N;
      cin.ignore();
    
      // 创建一个64×64的矩阵，每个元素的默认值为0
      vector<vector<int>> matrix(64, vector<int>(64, 0));
    
      // 循环读取N个图形的输入
      for (int i = 0; i < N; i++) {
        // 将每行的输入按空格分割，并转换为整数数组
        string line;
        getline(cin, line);
        istringstream iss(line);
        vector<int> split;
        int value;
        while (iss >> value) {
          split.push_back(value);
        }
    
        // 第一个数是填充的数字
        value = split[0];
        // 后续每两个一组，表示填充该数字的单元格坐标
        for (int j = 1; j < split.size(); j += 2) {
          int row = split[j];
          int col = split[j + 1];
          // 将矩阵中对应的单元格填充为指定的数字
          matrix[row][col] = value;
        }
      }
    
      // 创建一个数组，用于存储每个图形的周长
      vector<int> perimeters(N);
      // 循环计算每个图形的周长
      for (int i = 1; i <= N; i++) {
        int perimeter = 0;
        // 遍历整个矩阵
        for (int j = 0; j < 64; j++) {
          for (int k = 0; k < 64; k++) {
            // 如果当前单元格的值等于当前图形的数字
            if (matrix[j][k] == i) {
              // 判断当前单元格的上、下、左、右是否与当前图形的数字不同
              // 如果是，则周长加1
              if (j == 0 || matrix[j - 1][k] != i) perimeter++;
              if (j == 63 || matrix[j + 1][k] != i) perimeter++;
              if (k == 0 || matrix[j][k - 1] != i) perimeter++;
              if (k == 63 || matrix[j][k + 1] != i) perimeter++;
            }
          }
        }
        // 将当前图形的周长存入数组
        perimeters[i-1] = perimeter;
      }
      
      // 输出每个图形的周长
      for (int i = 0; i < N; i++) {
        cout << perimeters[i];
        if (i != N-1) {
          cout << " ";
        }
      }
    
      return 0;
    }
    

#### JavaScript

    
    
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    // 定义变量n和shapes数组，用于存储输入的图形数量和图形信息
    let n;
    let shapes = [];
    
    // 当从标准输入读取到一行时，处理输入数据
    rl.on('line', (input) => {
      if (!n) {
        // 如果n未定义，设置n为输入的图形数量
        n = parseInt(input.trim());
        return;
      }
    
      // 解析输入的图形信息，并将其添加到shapes数组中
      const shape = {
        num: parseInt(input.trim().split(' ')[0]),
        coords: input.trim().split(' ').slice(1).map(coordStr => parseInt(coordStr))
      };
      shapes.push(shape);
    
      // 当读取到所有图形信息时，关闭readline接口并开始处理数据
      if (shapes.length === n) {
        rl.close();
    
        // 定义64x64矩阵并初始化为0
        const matrix = Array.from({ length: 64 }, () => Array(64).fill(0));
    
        // 将输入的图形信息填充到矩阵中
        shapes.forEach(shape => {
          const value = shape.num;
          for (let i = 0; i < shape.coords.length; i += 2) {
            const row = shape.coords[i];
            const col = shape.coords[i + 1];
            matrix[row][col] = value;
          }
        });
    
        // 初始化周长数组
        const perimeters = Array(n).fill(0);
    
        // 遍历矩阵，计算每个图形的周长
        for (let i = 1; i <= n; i++) {
          let perimeter = 0;
          for (let j = 0; j < 64; j++) {
            for (let k = 0; k < 64; k++) {
              if (matrix[j][k] === i) {
                // 如果当前单元格的上、下、左、右邻居不存在或与当前单元格的值不同，则增加周长
                if (j === 0 || matrix[j - 1][k] !== i) {
                  perimeter += 1;
                }
                if (j === 63 || matrix[j + 1][k] !== i) {
                  perimeter += 1;
                }
                if (k === 0 || matrix[j][k - 1] !== i) {
                  perimeter += 1;
                }
                if (k === 63 || matrix[j][k + 1] !== i) {
                  perimeter += 1;
                }
              }
            }
          }
          // 将计算得到的周长存储到perimeters数组中
          perimeters[i - 1] = perimeter;
        }
    
        // 输出每个图形的周长
        console.log(perimeters.join(" "));
      }
    });
    
    

#### Java

    
    
    import java.util.Arrays;
    import java.util.Scanner;
    
    public class Main {
      public static void main(String[] args) {
        try (Scanner scanner = new Scanner(System.in)) {
          // 读取输入的N，表示N个图形
          int N = Integer.parseInt(scanner.nextLine());
          // 创建一个64×64的矩阵，每个元素的默认值为0
          int[][] matrix = new int[64][64];
    
          // 循环读取N个图形的输入
          for (int i = 0; i < N; i++) {
            // 将每行的输入按空格分割，并转换为整数数组
            Integer[] split = Arrays.stream(scanner.nextLine().split(" "))
                .map(Integer::parseInt)
                .toArray(Integer[]::new);
    
            // 第一个数是填充的数字
            int value = split[0];
            // 后续每两个一组，表示填充该数字的单元格坐标
            for (int j = 1; j < split.length; j += 2) {
              int row = split[j];
              int col = split[j + 1];
              // 将矩阵中对应的单元格填充为指定的数字
              matrix[row][col] = value;
            }
          }
    
          scanner.close();
    
          // 创建一个数组，用于存储每个图形的周长
          int[] perimeters = new int[N];
          // 循环计算每个图形的周长
          for (int i = 1; i <= N; i++) {
            int perimeter = 0;
            // 遍历整个矩阵
            for (int j = 0; j < 64; j++) {
              for (int k = 0; k < 64; k++) {
                // 如果当前单元格的值等于当前图形的数字
                if (matrix[j][k] == i) {
                  // 判断当前单元格的上、下、左、右是否与当前图形的数字不同
                  // 如果是，则周长加1
                  if (j == 0 || matrix[j - 1][k] != i) perimeter++;
                  if (j == 63 || matrix[j + 1][k] != i) perimeter++;
                  if (k == 0 || matrix[j][k - 1] != i) perimeter++;
                  if (k == 63 || matrix[j][k + 1] != i) perimeter++;
                }
              }
            }
            // 将当前图形的周长存入数组
            perimeters[i-1] = perimeter;
          }
          
          // 输出每个图形的周长
          for (int i = 0; i < N; i++) {
            System.out.print(perimeters[i]);
            if (i != N-1) {
              System.out.print(" ");
            }
          }
        }
    
      }
    }
    

#### Python

    
    
    # 读取输入的图形个数 N
    N = int(input())
    
    # 初始化一个 64x64 的矩阵，所有元素默认值为 0
    matrix = [[0] * 64 for _ in range(64)]
    
    # 读取 N 个图形的填充数据
    for _ in range(N):
        split = list(map(int, input().split()))
        value = split[0]
        # 将输入的坐标填充到矩阵中
        for j in range(1, len(split), 2):
            row = split[j]
            col = split[j + 1]
            matrix[row][col] = value
    
    # 初始化一个列表，用于存储每个图形的周长
    perimeters = [0] * N
    
    # 计算每个图形的周长
    for i in range(1, N + 1):
        perimeter = 0
        for j in range(64):
            for k in range(64):
                if matrix[j][k] == i:
                    # 如果当前单元格上方为空或不同数字，周长加 1
                    if j == 0 or matrix[j - 1][k] != i:
                        perimeter += 1
                    # 如果当前单元格下方为空或不同数字，周长加 1
                    if j == 63 or matrix[j + 1][k] != i:
                        perimeter += 1
                    # 如果当前单元格左侧为空或不同数字，周长加 1
                    if k == 0 or matrix[j][k - 1] != i:
                        perimeter += 1
                    # 如果当前单元格右侧为空或不同数字，周长加 1
                    if k == 63 or matrix[j][k + 1] != i:
                        perimeter += 1
        perimeters[i - 1] = perimeter
    
    # 输出每个图形的周长
    for i in range(N):
        print(perimeters[i], end="")
        if i != N - 1:
            print(" ", end="")
    
    

#### 文章目录

  *     *       * 题目描述
      * 输入描述
      * 输出描述
      * 用例
      * 解题思路：
      * C++
      * JavaScript
      * Java
      * Python

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

