## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

输入N个互不相同的二维整数坐标，求这N个坐标可以构成的正方形数量。[内积为零的的两个向量垂直]

## 输入描述

第一行输入为N，N代表坐标数量，N为正整数。N <= 100

之后的 K 行输入为坐标x y以空格分隔，x，y为整数，-10<=x, y<=10

## 输出描述

输出可以构成的正方形数量。

## 示例1

输入

    
    
    3
    1 3
    2 4
    3 1
    

输出

    
    
    0
    

说明

> （3个点不足以构成正方形）

## 示例2

输入

    
    
    4
    0 0
    1 2
    3 1
    2 -1
    

输出

    
    
    1
    

说明

> ## 解题思路

#### 内积的定义

内积（Dot Product）是向量代数中的一个重要概念。给定两个向量  a = ( a 1 , a 2 ) \mathbf{a} = (a_1, a_2)
a=(a1​,a2​) 和  b = ( b 1 , b 2 ) \mathbf{b} = (b_1, b_2) b=(b1​,b2​)，它们的内积定义为：

a ⋅ b = a 1 × b 1 \+ a 2 × b 2 \mathbf{a} \cdot \mathbf{b} = a_1 \times b_1 +
a_2 \times b_2 a⋅b=a1​×b1​+a2​×b2​

如果两个向量的内积为零，即  a ⋅ b = 0 \mathbf{a} \cdot \mathbf{b} = 0
a⋅b=0，那么这两个向量互相垂直（即成90度角）。

#### 解题思路

  1. **遍历所有点对，寻找可能的正方形** ：

     * 对于每一对点  ( A , B ) (A, B) (A,B)，我们假设这两个点为正方形的对角线的两个端点。
     * 通过计算向量  A B → \overrightarrow{AB} AB 的垂直向量，可以找到另外两个点的坐标。
     * 检查这两个点是否都在集合中，如果在，则构成一个正方形。
  2. **避免重复计算** ：

     * 在统计正方形时，每个正方形会被计算四次（每个顶点都可能作为起始点），所以最终的正方形数量应该除以4。

### 用例解释

##### 输入

    
    
    4
    0 0
    1 2
    3 1
    2 -1
    

##### 坐标点

  * A (0, 0)
  * B (1, 2)
  * C (3, 1)
  * D (2, -1)

##### 计算过程

  1. **遍历点对** ：

     * 遍历所有的点对，检查是否能构成正方形。
     * 共有 6 对点组合：`(A, B)`, `(A, C)`, `(A, D)`, `(B, C)`, `(B, D)`, `(C, D)`。
  2. **判断正方形** ：

     * 以点对 `(A, B)` 为例： 
       * 计算可能的两个正方形对角点： 
         1. `(x3, y3) = (-2, 1)` 和 `(x4, y4) = (3, 1)`。
         2. `(x5, y5) = (-2, -1)` 和 `(x6, y6) = (-1, 1)`。
       * 检查这些点是否存在于输入的坐标集合中： 
         * `(x3, y3)` 不存在，但 `(x4, y4)` 即 C 存在。
         * `(x5, y5)` 即 D 存在，但 `(x6, y6)` 不存在。
       * 因此，通过 `(A, B)` 这一对，找到了一个正方形 ABCD。
  3. **结果** ：

     * 通过遍历所有点对，只找到一个正方形 ABCD，最终正方形数量为 1。

## Java

    
    
    import java.util.ArrayList;
    import java.util.Scanner;
    
    
    
    public class Main {
        static class Point {
            int x, y;
    
            Point(int x, int y) {
                this.x = x;
                this.y = y;
            }
    
            // 判断两个点是否相等
            boolean equals(Point p) {
                return this.x == p.x && this.y == p.y;
            }
        }
        // 检查点是否存在于点列表中
        static boolean pointExists(ArrayList<Point> points, Point p) {
            for (Point point : points) {
                if (point.equals(p)) {
                    return true;
                }
            }
            return false;
        }
    
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            int n = scanner.nextInt();
            ArrayList<Point> points = new ArrayList<>();
    
            // 读取所有点的坐标
            for (int i = 0; i < n; i++) {
                int x = scanner.nextInt();
                int y = scanner.nextInt();
                points.add(new Point(x, y));
            }
    
            int squareCount = 0;
    
            // 遍历所有点对，检查是否能构成正方形
            for (int i = 0; i < n; i++) {
                Point p1 = points.get(i);
    
                for (int j = i + 1; j < n; j++) {
                    Point p2 = points.get(j);
    
                    // 计算两个可能的对角点
                    Point p3 = new Point(p1.x - (p1.y - p2.y), p1.y + (p1.x - p2.x));
                    Point p4 = new Point(p2.x - (p1.y - p2.y), p2.y + (p1.x - p2.x));
    
                    if (pointExists(points, p3) && pointExists(points, p4)) {
                        squareCount++;
                    }
    
                    // 计算另外两个可能的对角点
                    Point p5 = new Point(p1.x + (p1.y - p2.y), p1.y - (p1.x - p2.x));
                    Point p6 = new Point(p2.x + (p1.y - p2.y), p2.y - (p1.x - p2.x));
    
                    if (pointExists(points, p5) && pointExists(points, p6)) {
                        squareCount++;
                    }
                }
            }
    
            // 每个正方形被计算了4次，因此结果需要除以4
            System.out.println(squareCount / 4);
    
            scanner.close();
        }
    }
    // 代码2
    import java.util.Scanner;
    import java.util.Vector;
    import java.util.HashSet;
    
    public class Main {
        public static void main(String[] args) {
            // 创建Scanner对象，用于从控制台读取输入
            Scanner scanner = new Scanner(System.in);
            
            // 读取第一个输入的整数，表示坐标数量
            int n = scanner.nextInt();
            // 读取整行输入并忽略换行符
            scanner.nextLine();
    
            // 创建一个Vector来存储坐标点的字符串形式
            Vector<String> coordinates = new Vector<>(n);
            for (int i = 0; i < n; i++) {
                // 逐行读取坐标点，并存储到Vector中
                coordinates.add(scanner.nextLine());
            }
    
            // 初始化正方形计数器
            int squareCount = 0;
            // 使用HashSet存储坐标点，便于快速查找
            HashSet<String> set = new HashSet<>(coordinates);
    
            // 遍历所有坐标点对
            for (int i = 0; i < n; i++) {
                // 将第一个坐标点分割为x1和y1
                String[] coordinate1 = coordinates.get(i).split(" ");
                int x1 = Integer.parseInt(coordinate1[0]);
                int y1 = Integer.parseInt(coordinate1[1]);
    
                for (int j = i + 1; j < n; j++) {
                    // 将第二个坐标点分割为x2和y2
                    String[] coordinate2 = coordinates.get(j).split(" ");
                    int x2 = Integer.parseInt(coordinate2[0]);
                    int y2 = Integer.parseInt(coordinate2[1]);
    
                    // 计算两个可能的对角点
                    int x3 = x1 - (y1 - y2), y3 = y1 + (x1 - x2);
                    int x4 = x2 - (y1 - y2), y4 = y2 + (x1 - x2);
    
                    // 检查这两个对角点是否存在于坐标集合中
                    if (set.contains(x3 + " " + y3) && set.contains(x4 + " " + y4)) {
                        squareCount++;
                    }
    
                    // 计算另外两个可能的对角点
                    int x5 = x1 + (y1 - y2), y5 = y1 - (x1 - x2);
                    int x6 = x2 + (y1 - y2), y6 = y2 - (x1 - x2);
    
                    // 检查这两个对角点是否存在于坐标集合中
                    if (set.contains(x5 + " " + y5) && set.contains(x6 + " " + y6)) {
                        squareCount++;
                    }
                }
            }
    
            // 每个正方形被计算了4次，因此结果需要除以4
            System.out.println(squareCount / 4);
    
            // 关闭Scanner对象，释放资源
            scanner.close();
        }
    }
    

## Python

    
    
    # 定义一个函数来判断两个点是否相等
    def are_points_equal(p1, p2):
        return p1[0] == p2[0] and p1[1] == p2[1]
    
    # 定义一个函数来检查一个点是否存在于点列表中
    def point_exists(points, p):
        for point in points:
            if are_points_equal(point, p):
                return True
        return False
    
    # 读取坐标数量
    n = int(input())
    coordinates = []
    
    # 读取坐标并存入列表
    for _ in range(n):
        x, y = map(int, input().split())
        coordinates.append((x, y))
    
    square_count = 0
    
    # 遍历所有点对，检查是否能构成正方形
    for i in range(n):
        x1, y1 = coordinates[i]
    
        for j in range(i + 1, n):
            x2, y2 = coordinates[j]
    
            # 计算两个可能的对角点
            x3, y3 = x1 - (y1 - y2), y1 + (x1 - x2)
            x4, y4 = x2 - (y1 - y2), y2 + (x1 - x2)
            p3 = (x3, y3)
            p4 = (x4, y4)
    
            if point_exists(coordinates, p3) and point_exists(coordinates, p4):
                square_count += 1
    
            # 计算另外两个可能的对角点
            x5, y5 = x1 + (y1 - y2), y1 - (x1 - x2)
            x6, y6 = x2 + (y1 - y2), y2 - (x1 - x2)
            p5 = (x5, y5)
            p6 = (x6, y6)
    
            if point_exists(coordinates, p5) and point_exists(coordinates, p6):
                square_count += 1
    
    # 每个正方形被计算了4次，因此结果需要除以4
    print(square_count // 4)
    
    
    
    # 代码2
    
    import sys
    
    # 读取第一个输入的整数，表示坐标数量
    n = int(input())
    
    # 存储坐标的字符串形式的列表
    coordinates = []
    for i in range(n):
        # 读取坐标点的字符串，并去掉两端的空白字符
        coordinates.append(input().strip())
    
    # 初始化正方形计数器
    squareCount = 0
    # 使用集合存储坐标点，便于快速查找
    coordinate_set = set(coordinates)
    
    # 遍历所有坐标点对
    for i in range(n):
        # 将第一个坐标点分割为x1和y1
        x1, y1 = map(int, coordinates[i].split())
    
        for j in range(i + 1, n):
            # 将第二个坐标点分割为x2和y2
            x2, y2 = map(int, coordinates[j].split())
    
            # 计算两个可能的对角点
            x3, y3 = x1 - (y1 - y2), y1 + (x1 - x2)
            x4, y4 = x2 - (y1 - y2), y2 + (x1 - x2)
    
            # 检查这两个对角点是否存在于坐标集合中
            if f"{x3} {y3}" in coordinate_set and f"{x4} {y4}" in coordinate_set:
                squareCount += 1
    
            # 计算另外两个可能的对角点
            x5, y5 = x1 + (y1 - y2), y1 - (x1 - x2)
            x6, y6 = x2 + (y1 - y2), y2 - (x1 - x2)
    
            # 检查这两个对角点是否存在于坐标集合中
            if f"{x5} {y5}" in coordinate_set and f"{x6} {y6}" in coordinate_set:
                squareCount += 1
    
    # 每个正方形被计算了4次，因此结果需要除以4
    print(squareCount // 4)
    

## JavaScript

    
    
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    let n;
    let coordinates = [];
    
    // 判断两个点是否相等
    function arePointsEqual(p1, p2) {
      return p1[0] === p2[0] && p1[1] === p2[1];
    }
    
    // 检查一个点是否存在于点数组中
    function pointExists(points, p) {
      for (let point of points) {
        if (arePointsEqual(point, p)) {
          return true;
        }
      }
      return false;
    }
    
    rl.on('line', (line) => {
      if (n === undefined) {
        n = parseInt(line);
      } else {
        coordinates.push(line.split(' ').map(Number));
        if (coordinates.length === n) rl.close();
      }
    });
    
    rl.on('close', () => {
      let squareCount = 0;
    
      // 遍历所有点对，检查是否能构成正方形
      for (let i = 0; i < n; i++) {
        let [x1, y1] = coordinates[i];
    
        for (let j = i + 1; j < n; j++) {
          let [x2, y2] = coordinates[j];
    
          // 计算两个可能的对角点
          let x3 = x1 - (y1 - y2), y3 = y1 + (x1 - x2);
          let x4 = x2 - (y1 - y2), y4 = y2 + (x1 - x2);
    
          if (pointExists(coordinates, [x3, y3]) && pointExists(coordinates, [x4, y4])) {
            squareCount++;
          }
    
          // 计算另外两个可能的对角点
          let x5 = x1 + (y1 - y2), y5 = y1 - (x1 - x2);
          let x6 = x2 + (y1 - y2), y6 = y2 - (x1 - x2);
    
          if (pointExists(coordinates, [x5, y5]) && pointExists(coordinates, [x6, y6])) {
            squareCount++;
          }
        }
      }
    
      // 每个正方形被计算了4次，因此结果需要除以4
      console.log(Math.floor(squareCount / 4));
    });
    
    // 代码2
    const readline = require('readline');
    
    // 创建接口读取标准输入输出
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    let n; // 用于存储坐标数量
    let coordinates = []; // 存储坐标的数组
    
    // 监听每行输入
    rl.on('line', (line) => {
      if (!n) {
        // 第一行输入是坐标数量
        n = parseInt(line);
        return;
      }
    
      // 其余的行是坐标点
      coordinates.push(line);
    
      // 当输入的坐标数达到n时，关闭输入流
      if (coordinates.length === n) {
        rl.close();
      }
    });
    
    // 当输入完成时
    rl.on('close', () => {
      let squareCount = 0; // 记录正方形数量
      let set = new Set(coordinates); // 用集合存储坐标点，便于快速查找
    
      // 遍历所有坐标点对
      for (let i = 0; i < n; i++) {
        // 将第一个坐标点分割为x1和y1
        let [x1, y1] = coordinates[i].split(' ').map(Number);
    
        for (let j = i + 1; j < n; j++) {
          // 将第二个坐标点分割为x2和y2
          let [x2, y2] = coordinates[j].split(' ').map(Number);
    
          // 计算两个可能的对角点
          let x3 = x1 - (y1 - y2), y3 = y1 + (x1 - x2);
          let x4 = x2 - (y1 - y2), y4 = y2 + (x1 - x2);
    
          // 检查这两个对角点是否存在于坐标集合中
          if (set.has(`${x3} ${y3}`) && set.has(`${x4} ${y4}`)) {
            squareCount++;
          }
    
          // 计算另外两个可能的对角点
          let x5 = x1 + (y1 - y2), y5 = y1 - (x1 - x2);
          let x6 = x2 + (y1 - y2), y6 = y2 - (x1 - x2);
    
          // 检查这两个对角点是否存在于坐标集合中
          if (set.has(`${x5} ${y5}`) && set.has(`${x6} ${y6}`)) {
            squareCount++;
          }
        }
      }
    
      // 每个正方形被计算了4次，因此结果需要除以4
      console.log(Math.floor(squareCount / 4));
    });
    

## C++

    
    
    #include <iostream>
    #include <vector>
    using namespace std;
    
    // 定义一个点结构体
    struct Point {
        int x, y;
    };
    
    // 判断两个点是否相等
    bool arePointsEqual(Point a, Point b) {
        return a.x == b.x && a.y == b.y;
    }
    
    // 检查数组中是否存在某点
    bool pointExists(vector<Point>& points, Point p) {
        for (auto& point : points) {
            if (arePointsEqual(point, p)) {
                return true;
            }
        }
        return false;
    }
    
    int main() {
        int n;
        cin >> n;
    
        vector<Point> points(n);
    
        // 读取坐标并存入数组
        for (int i = 0; i < n; i++) {
            cin >> points[i].x >> points[i].y;
        }
    
        int squareCount = 0;
    
        // 遍历所有点对，检查是否能构成正方形
        for (int i = 0; i < n; i++) {
            int x1 = points[i].x;
            int y1 = points[i].y;
    
            for (int j = i + 1; j < n; j++) {
                int x2 = points[j].x;
                int y2 = points[j].y;
    
                // 计算两个可能的对角点
                Point p3 = {x1 - (y1 - y2), y1 + (x1 - x2)};
                Point p4 = {x2 - (y1 - y2), y2 + (x1 - x2)};
    
                if (pointExists(points, p3) && pointExists(points, p4)) {
                    squareCount++;
                }
    
                // 计算另外两个可能的对角点
                Point p5 = {x1 + (y1 - y2), y1 - (x1 - x2)};
                Point p6 = {x2 + (y1 - y2), y2 - (x1 - x2)};
    
                if (pointExists(points, p5) && pointExists(points, p6)) {
                    squareCount++;
                }
            }
        }
    
        // 每个正方形被计算了4次，因此结果需要除以4
        cout << squareCount / 4 << endl;
    
        return 0;
    }
    
    // 代码2
    #include <iostream>
    #include <vector>
    #include <unordered_set>
    using namespace std;
    
    int main() {
        int n;
        // 读取坐标数量
        cin >> n;
        // 忽略换行符
        cin.ignore();
    
        // 创建一个二维数组来存储坐标
        vector<vector<int>> coordinates(n, vector<int>(2));
        for (int i = 0; i < n; i++) {
            // 读取坐标并存储到数组中
            cin >> coordinates[i][0] >> coordinates[i][1];
        }
    
        int squareCount = 0; // 记录正方形数量
        unordered_set<string> set;
        // 将坐标转换为字符串形式并存入哈希集合
        for (int i = 0; i < n; i++) {
            set.insert(to_string(coordinates[i][0]) + " " + to_string(coordinates[i][1]));
        }
    
        // 遍历所有坐标点对
        for (int i = 0; i < n; i++) {
            int x1 = coordinates[i][0];
            int y1 = coordinates[i][1];
    
            for (int j = i + 1; j < n; j++) {
                int x2 = coordinates[j][0];
                int y2 = coordinates[j][1];
    
                // 计算两个可能的对角点
                int x3 = x1 - (y1 - y2), y3 = y1 + (x1 - x2);
                int x4 = x2 - (y1 - y2), y4 = y2 + (x1 - x2);
    
                // 检查这两个对角点是否存在于坐标集合中
                if (set.count(to_string(x3) + " " + to_string(y3)) && set.count(to_string(x4) + " " + to_string(y4))) {
                    squareCount++;
                }
    
                // 计算另外两个可能的对角点
                int x5 = x1 + (y1 - y2), y5 = y1 - (x1 - x2);
                int x6 = x2 + (y1 - y2), y6 = y2 - (x1 - x2);
    
                // 检查这两个对角点是否存在于坐标集合中
                if (set.count(to_string(x5) + " " + to_string(y5)) && set.count(to_string(x6) + " " + to_string(y6))) {
                    squareCount++;
                }
            }
        }
    
        // 每个正方形被计算了4次，因此结果需要除以4
        cout << squareCount / 4 << endl;
    
        return 0;
    }
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    #include <string.h>
    
    typedef struct {
        int x, y;
    } Point;
    
    // 判断两个点是否相等
    int arePointsEqual(Point a, Point b) {
        return a.x == b.x && a.y == b.y;
    }
    
    // 检查数组中是否存在某点
    int pointExists(Point points[], int n, Point p) {
        for (int i = 0; i < n; i++) {
            if (arePointsEqual(points[i], p)) {
                return 1;
            }
        }
        return 0;
    }
    
    int main() {
        int n;
        scanf("%d", &n);
    
        Point points[n];
    
        // 读取坐标并存入数组
        for (int i = 0; i < n; i++) {
            scanf("%d %d", &points[i].x, &points[i].y);
        }
    
        int squareCount = 0;
    
        // 遍历所有点对，检查是否能构成正方形
        for (int i = 0; i < n; i++) {
            int x1 = points[i].x;
            int y1 = points[i].y;
    
            for (int j = i + 1; j < n; j++) {
                int x2 = points[j].x;
                int y2 = points[j].y;
    
                // 计算两个可能的对角点
                Point p3 = {x1 - (y1 - y2), y1 + (x1 - x2)};
                Point p4 = {x2 - (y1 - y2), y2 + (x1 - x2)};
    
                if (pointExists(points, n, p3) && pointExists(points, n, p4)) {
                    squareCount++;
                }
    
                // 计算另外两个可能的对角点
                Point p5 = {x1 + (y1 - y2), y1 - (x1 - x2)};
                Point p6 = {x2 + (y1 - y2), y2 - (x1 - x2)};
    
                if (pointExists(points, n, p5) && pointExists(points, n, p6)) {
                    squareCount++;
                }
            }
        }
    
        // 每个正方形被计算了4次，因此结果需要除以4
        printf("%d\n", squareCount / 4);
    
        return 0;
    }
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/3fd0239d0dfe2e5031a4be94dce5bcee.png)

#### 完整用例

##### 用例1

3  
1 1  
2 2  
3 3

##### 用例2

4  
0 0  
1 1  
1 0  
0 1

##### 用例3

5  
-1 0  
0 1  
1 0  
0 -1  
1 2

##### 用例4

4  
0 0  
1 0  
1 1  
0 1

##### 用例5

6  
0 0  
1 0  
1 1  
0 1  
2 0  
2 1

##### 用例6

8  
0 0  
1 1  
2 2  
3 3  
0 1  
1 2  
2 3  
3 0

##### 用例7

10  
-1 0  
0 1  
1 0  
0 -1  
1 2  
2 1  
0 2  
2 0  
-2 0  
0 -2

##### 用例8

6  
0 0  
1 1  
2 2  
3 3  
4 4  
5 5

##### 用例9

7  
0 0  
1 1  
2 2  
3 3  
0 1  
1 2  
2 3

##### 用例10

9  
-1 0  
0 1  
1 0  
0 -1  
1 2  
2 1  
0 2  
2 0  
-2 0

