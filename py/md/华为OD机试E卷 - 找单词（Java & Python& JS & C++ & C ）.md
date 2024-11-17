## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

给一个字符串和一个二维字符数组，如果该字符串存在于该数组中，则按字符串的字符顺序输出字符串每个字符所在单元格的位置下标字符串，如果找不到返回字符串“N”。

  1. 需要按照字符串的字符组成顺序搜索，且搜索到的位置必须是相邻单元格，其中“相邻单元格”是指那些水平相邻或垂直相邻的单元格。

  2. 同一个单元格内的字母不允许被重复使用。

  3. 假定在数组中最多只存在一个可能的匹配。

## 输入描述

第1行为一个数字N指示二维数组在后续输入所占的行数。

第2行到第N+1行输入为一个二维大写字符数组，每行字符用半角,分割。

第N+2行为待查找的字符串，由大写字符组成。

  * 二维数组的大小为N*N，0<N<=100。

  * 单词长度K，0<K<1000。

## 输出描述

出一个位置下标字符串，拼接格式为：第1个字符行下标+”,”+第1个字符列下标+”,”+第2个字符行下标+”,”+第2个字符列下标…
+”,”+第N个字符行下标+”,”+第N个字符列下标。

## 示例1

输入

    
    
    4
    A,C,C,F
    C,D,E,D
    B,E,S,S
    F,E,C,A
    ACCESS
    

输出

    
    
    0,0,0,1,0,2,1,2,2,2,2,3
    

说明

> ACCESS分别对应二维数组的[0,0] [0,1] [0,2] [1,2] [2,2] [2,3]下标位置。

## 解题思路

该题目要求在一个二维字符数组（棋盘）中寻找一个给定的字符串，并按特定规则返回字符串每个字符在数组中的位置。题目的核心是使用深度优先搜索（DFS）方法，从二维数组的每一个字符出发，按顺序查找相邻位置的字符是否能组成目标字符串。如果找到就输出路径下标字符串，如果找不到就返回
“N”。

  1. **字符顺序和相邻性** ： 
     * 需要按照给定字符串中字符的顺序在二维字符数组中寻找匹配。
     * 字符在二维数组中的位置必须是相邻的。相邻的定义是：水平方向（左右相邻）或垂直方向（上下相邻）的单元格。
  2. **不可重复使用** ： 
     * 在寻找过程中，同一个单元格中的字母不能被重复使用。例如，如果某个位置的字母已经被用来匹配字符串的一部分，那么在匹配同一个字符串的其他部分时不能再次使用这个位置。
  3. **重要条件** ： 
     * 假设在二维数组中，最多只有一个可能的匹配路径。这意味着如果找到了一个匹配的字符串路径，就不需要考虑其他可能性。

**示例用例解析：**

  * **输入：**
    
        4
    A,C,C,F
    C,D,E,D
    B,E,S,S
    F,E,C,A
    ACCESS
    

这里二维数组是：

    
        A C C F
    C D E D
    B E S S
    F E C A
    

需要查找的字符串是 “ACCESS”。

  * **输出：**
    
        0,0,0,1,0,2,1,2,2,2,2,3
    

    * 查找过程：在二维数组中，字符串 “ACCESS” 的路径是： 
      * ‘A’ 在 [0,0]
      * ‘C’ 在 [0,1]
      * ‘C’ 在 [0,2]
      * ‘E’ 在 [1,2]
      * ‘S’ 在 [2,2]
      * ‘S’ 在 [2,3]
    * 输出按照这些位置下标拼接成字符串 “0,0,0,1,0,2,1,2,2,2,2,3”。

## Java

    
    
    import java.util.LinkedList;
    import java.util.Scanner;
    
    public class Main {
        // 定义全局变量
        private static int n;  // 二维数组的大小
        private static String[][] matrix;  // 二维数组
        private static String tar;  // 待查找的字符串
        private static boolean[][] visited;  // 记录每个单元格是否已被访问
    
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            n = scanner.nextInt();  // 读取二维数组的大小
            scanner.nextLine();  // 读取并忽略换行符
            matrix = new String[n][n];  // 初始化二维数组
            // 读取二维数组的每一行
            for (int i = 0; i < n; i++) {
                String line = scanner.nextLine();
                matrix[i] = line.split(",");  // 使用逗号分割每一行，得到每个单元格的字符
            }
            tar = scanner.nextLine();  // 读取待查找的字符串
            scanner.close();  // 关闭扫描器
    
            visited = new boolean[n][n];  // 初始化访问记录数组
            String result = findString();  // 查找字符串
            System.out.println(result);  // 输出结果
        }
    
        // 查找字符串的函数
        public static String findString() {
            LinkedList<Integer[]> path = new LinkedList<>();  // 存储路径的链表
            // 遍历二维数组的每个单元格
            for (int i = 0; i < n; i++) {
                for (int j = 0; j < n; j++) {
                    // 如果当前单元格的字符与待查找字符串的第一个字符相同
                    if (matrix[i][j].equals(tar.substring(0, 1))) {
                        // 使用深度优先搜索查找字符串
                        boolean found = dfs(i, j, 0, path);
                        // 如果找到了字符串
                        if (found) {
                            StringBuilder sb = new StringBuilder();
                            // 将路径中的每个单元格的位置添加到结果字符串中
                            for (Integer[] pos : path) {
                                sb.append(pos[0]).append(",").append(pos[1]).append(",");
                            }
                            sb.deleteCharAt(sb.length() - 1);  // 删除最后一个逗号
                            return sb.toString();  // 返回结果字符串
                        }
                    }
                }
            }
            return "N";  // 如果没有找到字符串，返回"N"
        }
    
        // 深度优先搜索的函数
        public static boolean dfs(int i, int j, int k, LinkedList<Integer[]> path) {
            // 如果当前位置越界，或已被访问，或当前位置的字符与待查找字符串的当前字符不相同
            if (i < 0 || i >= n || j < 0 || j >= n || visited[i][j] || !tar.substring(k, k + 1).equals(matrix[i][j])) {
                return false;  // 返回false
            }
            path.add(new Integer[] {i, j});  // 将当前位置添加到路径中
            visited[i][j] = true;  // 标记当前位置已被访问
            // 如果已经找到了所有的字符
            if (k == tar.length() - 1) {
                return true;  // 返回true
            }
            // 定义四个方向
            int[][] directions = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};
            // 对四个方向进行深度优先搜索
            for (int[] direction : directions) {
                int ni = i + direction[0];
                int nj = j + direction[1];
                boolean res = dfs(ni, nj, k + 1, path);
                // 如果在某个方向上找到了字符串
                if (res) {
                    return true;  // 返回true
                }
            }
            visited[i][j] = false;  // 撤销对当前位置的访问标记
            path.removeLast();  // 从路径中移除当前位置
            return false;  // 返回false
        }
    }
    
    

## Python

    
    
    n = int(input())  # 读取二维数组的大小
    matrix = []  # 初始化二维数组
    for _ in range(n):  # 读取二维数组的每一行
        line = input()
        matrix.append(line.split(","))  # 使用逗号分割每一行，得到每个单元格的字符
    tar = input()  # 读取待查找的字符串
    
    visited = [[False] * n for _ in range(n)]  # 初始化访问记录数组
    
    def findString():
        path = []  # 存储路径的列表
        for i in range(n):  # 遍历二维数组的每个单元格
            for j in range(n):
                if matrix[i][j] == tar[0]:  # 如果当前单元格的字符与待查找字符串的第一个字符相同
                    found = dfs(i, j, 0, path)  # 使用深度优先搜索查找字符串
                    if found:  # 如果找到了字符串
                        result = ""  # 初始化结果字符串
                        for pos in path:  # 将路径中的每个单元格的位置添加到结果字符串中
                            result += str(pos[0]) + "," + str(pos[1]) + ","
                        result = result[:-1]  # 删除最后一个逗号
                        return result  # 返回结果字符串
        return "N"  # 如果没有找到字符串，返回"N"
    
    def dfs(i, j, k, path):
        # 如果当前位置越界，或已被访问，或当前位置的字符与待查找字符串的当前字符不相同
        if i < 0 or i >= n or j < 0 or j >= n or visited[i][j] or tar[k] != matrix[i][j]:
            return False  # 返回false
        path.append([i, j])  # 将当前位置添加到路径中
        visited[i][j] = True  # 标记当前位置已被访问
        if k == len(tar) - 1:  # 如果已经找到了所有的字符
            return True  # 返回true
        directions = [[0, 1], [0, -1], [1, 0], [-1, 0]]  # 定义四个方向
        for direction in directions:  # 对四个方向进行深度优先搜索
            ni = i + direction[0]
            nj = j + direction[1]
            res = dfs(ni, nj, k + 1, path)
            if res:  # 如果在某个方向上找到了字符串
                return True  # 返回true
        visited[i][j] = False  # 撤销对当前位置的访问标记
        path.pop()  # 从路径中移除当前位置
        return False  # 返回false
    
    result = findString()  # 查找字符串
    print(result)  # 输出结果
    
    

## JavaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,  // 输入流为标准输入
      output: process.stdout  // 输出流为标准输出
    });
    
    // 存储输入的每一行数据
    const lines = [];
    // 存储二维数组的大小
    let n;
    
    // 监听命令行输入的每一行数据
    rl.on("line", (line) => {
      // 将每一行数据存入lines数组
      lines.push(line);
      // 如果输入的是二维数组的大小
      if (lines.length === 1) {
        n = parseInt(lines[0]);
      }
      // 如果输入的是二维数组和待查找的字符串
      if (n && lines.length === n + 2) {
        // 删除lines数组中的第一个元素，即二维数组的大小
        lines.shift();
        // 将lines数组中的最后一个元素，即待查找的字符串，存入变量str
        const str = lines.pop();
        // 将lines数组中的其余元素，即二维数组的每一行，按逗号分隔存入二维数组grid
        const grid = lines.map((line) => line.split(","));
        // 调用findString函数，输出结果
        console.log(findString(grid, n, str));
        // 清空lines数组
        lines.length = 0;
      }
    });
    
    // 查找字符串的函数
    function findString(grid, n, tar) {
      // 创建一个n*n的二维数组，所有元素初始化为false，表示没有被访问过
      const visited = Array.from(Array(n), () => Array(n).fill(false));
      // 存储路径的数组
      const path = [];
      // 遍历二维数组的每个单元格
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          // 如果当前单元格的字符与待查找字符串的第一个字符相同
          if (grid[i][j] === tar[0]) {
            // 使用深度优先搜索查找字符串
            const found = dfs(i, j, 0, path);
            // 如果找到了字符串
            if (found) {
              // 初始化结果字符串
              let result = "";
              // 将路径中的每个单元格的位置添加到结果字符串中
              for (const pos of path) {
                result += pos[0] + "," + pos[1] + ",";
              }
              // 删除最后一个逗号
              result = result.slice(0, -1);
              // 返回结果字符串
              return result;
            }
          }
        }
      }
      // 如果没有找到字符串，返回"N"
      return "N";
    
      // 深度优先搜索的函数
      function dfs(i, j, k, path) {
        // 如果当前位置越界，或已被访问，或当前位置的字符与待查找字符串的当前字符不相同
        if (
          i < 0 ||
          i >= n ||
          j < 0 ||
          j >= n ||
          visited[i][j] ||
          tar[k] !== grid[i][j]
        ) {
          // 返回false
          return false;
        }
        // 将当前位置添加到路径中
        path.push([i, j]);
        // 标记当前位置已被访问
        visited[i][j] = true;
        // 如果已经找到了所有的字符
        if (k === tar.length - 1) {
          // 返回true
          return true;
        }
        // 定义四个方向
        const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];
        // 对四个方向进行深度优先搜索
        for (const direction of directions) {
          const ni = i + direction[0];
          const nj = j + direction[1];
          const res = dfs(ni, nj, k + 1, path);
          // 如果在某个方向上找到了字符串
          if (res) {
            // 返回true
            return true;
          }
        }
        // 撤销对当前位置的访问标记
        visited[i][j] = false;
        // 从路径中移除当前位置
        path.pop();
        // 返回false
        return false;
      }
    }
    
    

## C++

    
    
    #include <iostream>
    #include <vector>
    #include <string>
    
    using namespace std;
    
    int n;  // 二维数组的大小
    vector<vector<string>> matrix;  // 二维数组
    string tar;  // 待查找的字符串
    vector<vector<bool>> visited;  // 记录每个单元格是否已被访问
    
    string findString();  // 查找字符串的函数声明
    bool dfs(int i, int j, int k, vector<vector<int>>& path);  // 深度优先搜索的函数声明
    
    int main() {
        cin >> n;  // 读取二维数组的大小
        cin.ignore();  // 忽略换行符
        matrix.resize(n, vector<string>(n));  // 初始化二维数组
        for (int i = 0; i < n; i++) {  // 读取二维数组的每一行
            string line;
            getline(cin, line);
            int pos = 0;
            for (int j = 0; j < n; j++) {  // 使用逗号分割每一行，得到每个单元格的字符
                int comma = line.find(',', pos);
                matrix[i][j] = line.substr(pos, comma - pos);
                pos = comma + 1;
            }
        }
        getline(cin, tar);  // 读取待查找的字符串
    
        visited.resize(n, vector<bool>(n));  // 初始化访问记录数组
        string result = findString();  // 查找字符串
        cout << result << endl;  // 输出结果
    
        return 0;
    }
    
    string findString() {
        vector<vector<int>> path;  // 存储路径的列表
        for (int i = 0; i < n; i++) {  // 遍历二维数组的每个单元格
            for (int j = 0; j < n; j++) {
                if (matrix[i][j] == tar.substr(0, 1)) {  // 如果当前单元格的字符与待查找字符串的第一个字符相同
                    bool found = dfs(i, j, 0, path);  // 使用深度优先搜索查找字符串
                    if (found) {  // 如果找到了字符串
                        string result;  // 初始化结果字符串
                        for (vector<int>& pos : path) {  // 将路径中的每个单元格的位置添加到结果字符串中
                            result += to_string(pos[0]) + "," + to_string(pos[1]) + ",";
                        }
                        result.pop_back();  // 删除最后一个逗号
                        return result;  // 返回结果字符串
                    }
                }
            }
        }
        return "N";  // 如果没有找到字符串，返回"N"
    }
    
    bool dfs(int i, int j, int k, vector<vector<int>>& path) {
        // 如果当前位置越界，或已被访问，或当前位置的字符与待查找字符串的当前字符不相同
        if (i < 0 || i >= n || j < 0 || j >= n || visited[i][j] || tar.substr(k, 1) != matrix[i][j]) {
            return false;  // 返回false
        }
        path.push_back({i, j});  // 将当前位置添加到路径中
        visited[i][j] = true;  // 标记当前位置已被访问
        if (k == tar.length() - 1) {  // 如果已经找到了所有的字符
            return true;  // 返回true
        }
        vector<vector<int>> directions = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};  // 定义四个方向
        for (vector<int>& direction : directions) {  // 对四个方向进行深度优先搜索
            int ni = i + direction[0];
            int nj = j + direction[1];
            bool res = dfs(ni, nj, k + 1, path);
            if (res) {  // 如果在某个方向上找到了字符串
                return true;  // 返回true
            }
        }
        visited[i][j] = false;  // 撤销对当前位置的访问标记
        path.pop_back();  // 从路径中移除当前位置
        return false;  // 返回false
    }
    
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    #include <string.h>
    #include <stdbool.h>
    
    #define MAX_SIZE 100
    
    int n;  // 二维数组的大小
    char matrix[MAX_SIZE][MAX_SIZE];  // 二维字符数组
    bool visited[MAX_SIZE][MAX_SIZE];  // 访问状态数组
    char tar[MAX_SIZE];  // 待查找的字符串
    
    // 深度优先搜索
    bool dfs(int x, int y, int index, char *path) {
        if (index == strlen(tar)) return true;  // 如果找到了字符串，返回true
    
        if (x < 0 || x >= n || y < 0 || y >= n || visited[x][y] || matrix[x][y] != tar[index]) {
            return false;  // 越界、已访问或不匹配的情况下，返回false
        }
    
        int len = strlen(path);
        sprintf(path + len, "%d,%d,", x, y);  // 记录路径
        visited[x][y] = true;  // 标记当前单元格为已访问
    
        // 四个方向的搜索
        static int dx[4] = {-1, 0, 1, 0};
        static int dy[4] = {0, 1, 0, -1};
        for (int i = 0; i < 4; i++) {
            if (dfs(x + dx[i], y + dy[i], index + 1, path)) {
                return true;  // 如果找到，返回true
            }
        }
    
        visited[x][y] = false;  // 回溯
        path[len] = '\0';  // 撤销路径记录
        return false;
    }
    
    int main() {
        scanf("%d", &n);
        char buffer[200];
        for (int i = 0; i < n; i++) {
            scanf("%s", buffer);
            char *token = strtok(buffer, ",");
            int j = 0;
            while (token != NULL) {
                matrix[i][j++] = token[0];
                token = strtok(NULL, ",");
            }
        }
        scanf("%s", tar);
    
        char path[1000] = {0};  // 存储路径的字符串
        memset(visited, 0, sizeof(visited));  // 初始化访问状态数组
    
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (dfs(i, j, 0, path)) {
                    path[strlen(path) - 1] = '\0';  // 移除最后的逗号
                    printf("%s\n", path);
                    return 0;
                }
            }
        }
    
        printf("N\n");  // 如果没有找到字符串，输出"N"
        return 0;
    }
    
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/e3dcb961b934230f37328945d6926e18.png)

## 完整用例

### 用例1

    
    
    2
    A,B
    C,D
    AB
    

### 用例2

    
    
    3
    X,Y,Z
    A,B,C
    D,E,F
    XYZ
    

### 用例3

    
    
    3
    M,N,O
    P,Q,R
    S,T,U
    NQR
    

### 用例4

    
    
    4
    A,B,C,D
    E,F,G,H
    I,J,K,L
    M,N,O,P
    FIJK
    

### 用例5

    
    
    5
    Q,W,E,R,T
    Y,U,I,O,P
    A,S,D,F,G
    H,J,K,L,Z
    X,C,V,B,N
    SDCB
    

### 用例6

    
    
    4
    O,P,Q,R
    S,T,U,V
    W,X,Y,Z
    A,B,C,D
    WXYZ
    

### 用例7

    
    
    4
    M,N,O,P
    Q,R,S,T
    U,V,W,X
    Y,Z,A,B
    MNOP
    

### 用例8

    
    
    8
    A,B,C,D,E,F,G,H
    I,J,K,L,M,N,O,P
    Q,R,S,T,U,V,W,X
    Y,Z,A,B,C,D,E,F
    G,H,I,J,K,L,M,N
    O,P,Q,R,S,T,U,V
    W,X,Y,Z,A,B,C,D
    E,F,G,H,I,J,K,L
    RSTUVWX
    

### 用例9

    
    
    7
    M,O,N,K,E,Y,S
    O,N,K,E,Y,S,M
    N,K,E,Y,S,M,O
    K,E,Y,S,M,O,N
    E,Y,S,M,O,N,K
    Y,S,M,O,N,K,E
    S,M,O,N,K,E,Y
    MONKEYS
    

### 用例10

    
    
    4
    W,A,L,L
    A,L,L,S
    W,A,L,K
    W,A,L,L
    WALLS
    

