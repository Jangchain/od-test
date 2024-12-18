## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

有一种特殊的加密算法，明文为一段数字串，经过密码本查找转换，生成另一段密文数字串。

规则如下：

  1. 明文为一段数字串由 0~9 组成

  2. 密码本为数字 0~9 组成的二维数组

  3. 需要按明文串的数字顺序在密码本里找到同样的数字串，密码本里的数字串是由相邻的单元格数字组成，上下和左右是相邻的，注意：对角线不相邻，同一个单元格的数字不能重复使用。

  4. 每一位明文对应密文即为密码本中找到的单元格所在的行和列序号（序号从0开始）组成的两个数宇。

如明文第 i 位 Data[i] 对应密码本单元格为 Book[x][y]，则明文第 i 位对应的密文为X Y，X和Y之间用空格隔开。

如果有多条密文，返回字符序最小的密文。

如果密码本无法匹配，返回"error"。

请你设计这个加密程序。

示例1：

密码本：

> 0 0 2
>
> 1 3 4
>
> 6 6 4

明文：“3”，密文：“1 1”

示例2：

密码本：

> 0 0 2
>
> 1 3 4
>
> 6 6 4

明文：“0 3”，密文：“0 1 1 1”

示例3：

密码本：

> 0 0 2 4
>
> 1 3 4 6
>
> 3 4 1 5
>
> 6 6 6 5

明文：“0 0 2 4”，密文：“0 0 0 1 0 2 0 3” 和 “0 0 0 1 0 2 1 2”，返回字典序最小的"0 0 0 1 0 2 0
3"

明文：“8 2 2 3”，密文：“error”，密码本中无法匹配

## 输入描述

第一行输入 1 个正整数 N，代表明文的长度（1 ≤ N ≤ 200）

第二行输入 N 个明文组成的序列 Data[i]（0 ≤ Data[i] ≤ 9）

第三行输入 1 个正整数 M，代表密文的长度

接下来 M 行，每行 M 个数，代表密文矩阵

## 输出描述

输出字典序最小密文，如果无法匹配，输出"error"

## 用例1

输入

    
    
    2
    0 3
    3
    0 0 2
    1 3 4
    6 6 4
    

输出

    
    
    0 1 1 1
    

## 用例2

输入

    
    
    2
    0 5
    3
    0 0 2
    1 3 4
    6 6 4
    

输出

    
    
    error
    

说明

> 找不到 0 5 的序列，返回error

## 解题思路

核心解题思路是通过深度优先搜索（DFS）在一个给定的密码本（二维数组）中找到一条路径，使得这条路径上的数字序列与给定的明文数字序列相匹配，并且在所有可能的匹配路径中选择一条字典序最小的作为密文路径输出。具体步骤如下：

  1. **初始化变量** ： 
     * `n` 和 `m` 分别存储明文的长度和密码本的尺寸。
     * `book` 二维数组存储密码本内容。
     * `directions` 数组表示搜索的四个方向（右、下、左、上）。
     * `minPath` 字符串用于存储找到的字典序最小的密文路径。
     * `found` 布尔变量标记是否找到至少一种加密方式。
  2. **搜索准备** ： 
     * 创建一个 `visited` 布尔二维数组来标记密码本中的数字是否已被访问，以避免重复搜索。
  3. **开始搜索** ： 
     * 遍历密码本的每个数字，当找到一个数字与明文的第一个数字相匹配时，从该位置开始使用深度优先搜索（DFS）。
  4. **深度优先搜索（DFS）** ： 
     * 递归地搜索所有可能的路径。对于当前位置，如果满足以下条件之一，则继续搜索： 
       * 当前位置的数字与明文的当前索引指向的数字相匹配。
       * 已到达明文的末尾，且路径符合条件（字典序最小或找到的第一条路径）。
     * 在每个位置，尝试向四个方向移动，并递归调用 `dfs` 方法继续搜索。
     * 搜索过程中，使用 `visited` 数组标记当前位置已访问，以避免循环访问。
  5. **回溯与更新** ： 
     * 每当找到一条完整的匹配路径时，比较并更新 `minPath` 为字典序最小的路径。
     * 完成当前路径的搜索后，回溯（撤销当前位置的访问标记），尝试其他可能的路径。
  6. **输出结果** ： 
     * 如果找到至少一条匹配的路径（即 `found` 为 `true`），则输出字典序最小的密文路径。
     * 否则，输出 `"error"` 表示无法在密码本中找到与明文完全匹配的路径。

## C++

    
    
    #include <iostream>
    #include <vector>
    #include <string>
    using namespace std;
    
    // 全局变量定义
    static int n, m; // 分别用于存储明文的长度和密码本的尺寸
    vector<vector<int>> book; // 用于存储密码本，是一个二维向量
    vector<vector<int>> directions = {{0, 1}, {1, 0}, {-1, 0}, {0, -1}}; // 表示四个搜索方向：右、下、左、上
    string minPath = ""; // 用于存储找到的字典序最小的密文路径
    bool found = false; // 标记是否找到了至少一种加密方式
    
    // 深度优先搜索函数声明
    void dfs(const vector<int>& data, int index, int x, int y, vector<vector<bool>>& visited, string path);
    
    int main() {
        cin >> n; // 读取明文的长度
        vector<int> data(n); // 创建向量存储明文数字
        for (int i = 0; i < n; ++i) {
            cin >> data[i]; // 读取每个明文数字
        }
    
        cin >> m; // 读取密码本的尺寸
        book.resize(m, vector<int>(m)); // 初始化密码本向量
        for (int i = 0; i < m; ++i) {
            for (int j = 0; j < m; ++j) {
                cin >> book[i][j]; // 填充密码本内容
            }
        }
    
        vector<vector<bool>> visited(m, vector<bool>(m, false)); // 标记密码本中的数字是否已经被访问过
        for (int i = 0; i < m; ++i) {
            for (int j = 0; j < m; ++j) {
                if (book[i][j] == data[0]) { // 从找到的第一个数字开始搜索
                    dfs(data, 0, i, j, visited, ""); // 使用深度优先搜索找到所有可能的加密路径
                }
            }
        }
    
        cout << (found ? minPath : "error") << endl; // 如果找到至少一种加密方式，输出最小字典序的密文；否则，输出"error"
        return 0;
    }
    
    void dfs(const vector<int>& data, int index, int x, int y, vector<vector<bool>>& visited, string path) {
        if (index == n) { // 如果已经处理完所有明文数字
            if (!found || path < minPath) { // 如果找到的是第一种加密方式，或者字典序比之前的小
                minPath = path; // 更新最小字典序密文路径
            }
            found = true; // 标记找到了加密方式
            return;
        }
    
        if (x < 0 || y < 0 || x >= m || y >= m || visited[x][y] || book[x][y] != data[index]) {
            // 如果坐标越界，或该位置已访问，或该位置数字与明文不匹配，则返回
            return;
        }
    
        visited[x][y] = true; // 标记当前位置已访问
        string newPath = path + to_string(x) + " " + to_string(y) + " "; // 更新路径字符串
    
        // 遍历四个方向
        for (const auto& dir : directions) {
            int newX = x + dir[0];
            int newY = y + dir[1];
            dfs(data, index + 1, newX, newY, visited, newPath); // 在新方向上搜索下一个明文数字
        }
    
        visited[x][y] = false; // 回溯，撤销当前位置的访问标记
    }
    

## Java

    
    
    import java.util.*;
    
    public class Main {
        static int n, m; // 分别用于存储明文的长度和密码本的尺寸
        static int[][] book; // 用于存储密码本，是一个二维数组
        static int[][] directions = {{0, 1}, {1, 0}, {-1, 0}, {0, -1}}; // 表示四个搜索方向：右、下、左、上
        static String minPath = ""; // 用于存储找到的字典序最小的密文路径
        static boolean found = false; // 标记是否找到了至少一种加密方式
    
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            n = scanner.nextInt(); // 读取明文的长度
            int[] data = new int[n]; // 创建数组存储明文数字
            for (int i = 0; i < n; i++) {
                data[i] = scanner.nextInt(); // 读取每个明文数字
            }
    
            m = scanner.nextInt(); // 读取密码本的尺寸
            book = new int[m][m]; // 初始化密码本数组
            for (int i = 0; i < m; i++) {
                for (int j = 0; j < m; j++) {
                    book[i][j] = scanner.nextInt(); // 填充密码本内容
                }
            }
    
            boolean[][] visited = new boolean[m][m]; // 标记密码本中的数字是否已经被访问过
            for (int i = 0; i < m; i++) {
                for (int j = 0; j < m; j++) {
                    if (book[i][j] == data[0]) { // 从找到的第一个数字开始搜索
                        dfs(data, 0, i, j, visited, ""); // 使用深度优先搜索找到所有可能的加密路径
                    }
                }
            }
    
            System.out.println(found ? minPath.trim() : "error"); // 如果找到至少一种加密方式，输出最小字典序的密文；否则，输出"error"
        }
    
        public static void dfs(int[] data, int index, int x, int y, boolean[][] visited, String path) {
            if (index == n) { // 如果已经处理完所有明文数字
                if (!found || path.compareTo(minPath) < 0) { // 如果找到的是第一种加密方式，或者字典序比之前的小
                    minPath = path; // 更新最小字典序密文路径
                }
                found = true; // 标记找到了加密方式
                return;
            }
    
            if (x < 0 || y < 0 || x >= m || y >= m || visited[x][y] || book[x][y] != data[index]) {
                // 如果坐标越界，或该位置已访问，或该位置数字与明文不匹配，则返回
                return;
            }
    
            visited[x][y] = true; // 标记当前位置已访问
            String newPath = path + x + " " + y + " "; // 更新路径字符串
    
            if (index == n - 1 || book[x][y] == data[index]) {
                dfs(data, index + 1, x, y, visited, newPath); // 继续搜索下一个明文数字
            }
    
            for (int[] dir : directions) { // 遍历四个方向
                int newX = x + dir[0];
                int newY = y + dir[1];
                dfs(data, index + 1, newX, newY, visited, newPath); // 在新方向上搜索下一个明文数字
            }
    
            visited[x][y] = false; // 回溯，撤销当前位置的访问标记
        }
    }
    

## javaScript

    
    
    // 引入 readline 模块以从命令行读取输入
    const readline = require('readline');
    
    // 创建 readline 接口实例
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    // 定义全局变量
    let n, m; // 分别存储明文长度和密码本尺寸
    let book; // 存储密码本的二维数组
    const directions = [[0, 1], [1, 0], [-1, 0], [0, -1]]; // 搜索方向：右、下、左、上
    let minPath = ""; // 存储字典序最小的密文路径
    let found = false; // 标记是否找到至少一种加密方式
    let inputLines = []; // 用于存储用户输入的行
    
    // 读取用户输入
    rl.on('line', function(line) {
      inputLines.push(line);
    }).on('close', function() {
      // 解析输入数据
      n = parseInt(inputLines[0]); // 明文长度
      const data = inputLines[1].split(' ').map(Number); // 明文数组
      m = parseInt(inputLines[2]); // 密码本尺寸
      book = inputLines.slice(3, 3 + m).map(row => row.split(' ').map(Number)); // 密码本二维数组
    
      // 初始化访问标记数组
      const visited = Array.from({length: m}, () => Array(m).fill(false));
    
      // 从找到的第一个数字开始搜索
      for (let i = 0; i < m; i++) {
        for (let j = 0; j < m; j++) {
          if (book[i][j] === data[0]) {
            dfs(data, 0, i, j, visited, "");
          }
        }
      }
    
      // 输出结果
      console.log(found ? minPath.trim() : "error");
    });
    
    // 深度优先搜索函数
    function dfs(data, index, x, y, visited, path) {
      // 检查是否已处理完所有明文数字
      if (index === n) {
        // 检查是否找到第一种加密方式或找到更小的字典序路径
        if (!found || path < minPath) {
          minPath = path; // 更新最小字典序密文路径
        }
        found = true; // 标记找到了加密方式
        return;
      }
    
      // 检查坐标是否越界或该位置已访问或不匹配
      if (x < 0 || y < 0 || x >= m || y >= m || visited[x][y] || book[x][y] !== data[index]) {
        return; // 如果是，则返回
      }
    
      visited[x][y] = true; // 标记当前位置已访问
      const newPath = path + `${x} ${y} `; // 更新路径字符串
    
      // 遍历四个方向
      for (const [dx, dy] of directions) {
        dfs(data, index + 1, x + dx, y + dy, visited, newPath); // 在新方向上搜索下一个明文数字
      }
    
      visited[x][y] = false; // 回溯，撤销当前位置的访问标记
    }
    
     
    

## Python

    
    
    import sys
    
    # 读取输入
    n = int(input())
    data = list(map(int, input().split()))
    m = int(input())
    book = [list(map(int, input().split())) for _ in range(m)]
    
    directions = [(0, 1), (1, 0), (-1, 0), (0, -1)]  # 四个搜索方向：右、下、左、上
    min_path = None  # 存储找到的字典序最小的密文路径
    found = False  # 标记是否找到至少一种加密方式
    
    def dfs(data, index, x, y, visited, path):
        global min_path, found
        if index == len(data):  # 如果已经处理完所有明文数字
            if not found or path < min_path:  # 如果找到的是第一种加密方式，或者字典序比之前的小
                min_path = path  # 更新最小字典序密文路径
            found = True
            return
    
        if x < 0 or y < 0 or x >= m or y >= m or visited[x][y] or book[x][y] != data[index]:
            # 如果坐标越界，或该位置已访问，或该位置数字与明文不匹配，则返回
            return
    
        visited[x][y] = True  # 标记当前位置已访问
        new_path = path + f"{x} {y} "  # 更新路径字符串
    
        for dir in directions:  # 遍历四个方向
            newX, newY = x + dir[0], y + dir[1]
            dfs(data, index + 1, newX, newY, visited, new_path)  # 在新方向上搜索下一个明文数字
    
        visited[x][y] = False  # 回溯，撤销当前位置的访问标记
    
    visited = [[False for _ in range(m)] for _ in range(m)]  # 标记密码本中的数字是否已经被访问过
    for i in range(m):
        for j in range(m):
            if book[i][j] == data[0]:  # 从找到的第一个数字开始搜索
                dfs(data, 0, i, j, visited, "")  # 使用深度优先搜索找到所有可能的加密路径
    
    print(min_path.strip() if found else "error")  # 如果找到至少一种加密方式，输出最小字典序的密文；否则，输出"error"
    

## C语言

    
    
    #include <stdio.h>
    #include <stdbool.h>
    #include <string.h>
    #include <stdlib.h>
    
    #define MAX_SIZE 100 //  密码本的最大尺寸
    #define PATH_LEN 1000 //  路径字符串的最大长度
    
    int n, m; // 明文长度和密码本尺寸
    int book[MAX_SIZE][MAX_SIZE]; // 密码本
    int directions[4][2] = {{0, 1}, {1, 0}, {-1, 0}, {0, -1}}; // 搜索方向：右、下、左、上
    char minPath[PATH_LEN] = ""; // 最小字典序密文路径
    bool found = false; // 是否找到至少一种加密方式
    
    void dfs(int data[], int index, int x, int y, bool visited[MAX_SIZE][MAX_SIZE], char path[PATH_LEN]) {
        if (index == n) { // 处理完所有明文数字
            if (!found || strcmp(path, minPath) < 0) {
                strcpy(minPath, path); // 更新最小字典序密文路径
            }
            found = true;
            return;
        }
    
        if (x < 0 || y < 0 || x >= m || y >= m || visited[x][y] || book[x][y] != data[index]) {
            return; // 坐标越界或位置已访问或数字不匹配
        }
    
        visited[x][y] = true;
        char newPath[PATH_LEN];
        strcpy(newPath, path); // 复制当前路径
        char temp[20]; // 临时字符串存储当前位置
        sprintf(temp, "%d %d ", x, y);
        strcat(newPath, temp); // 更新路径
    
        for (int i = 0; i < 4; i++) { // 遍历四个方向
            int newX = x + directions[i][0];
            int newY = y + directions[i][1];
            dfs(data, index + 1, newX, newY, visited, newPath);
        }
    
        visited[x][y] = false; // 回溯
    }
    
    int main() {
        scanf("%d", &n);
        int data[n];
        for (int i = 0; i < n; i++) {
            scanf("%d", &data[i]);
        }
    
        scanf("%d", &m);
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < m; j++) {
                scanf("%d", &book[i][j]);
            }
        }
    
        bool visited[MAX_SIZE][MAX_SIZE] = {false};
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < m; j++) {
                if (book[i][j] == data[0]) {
                    char path[PATH_LEN] = "";
                    dfs(data, 0, i, j, visited, path);
                }
            }
        }
    
        if (found) {
            printf("%s\n", minPath);
        } else {
            printf("error\n");
        }
    
        return 0;
    }
    

![fengmian](https://i-blog.csdnimg.cn/blog_migrate/adf68745c69dcfa9f23f9a854c6a94e0.png)

## 完整用例

### 用例1

    
    
    2
    0 3
    3
    0 0 2
    1 3 4
    6 6 4
    

### 用例2

    
    
    2
    0 5
    3
    0 0 2
    1 3 4
    6 6 4
    

### 用例3

    
    
    6
    6 3 8 4 7 6
    11
    4 0 2 5 2 2 7 8 2 7 4
    8 2 5 1 1 4 2 5 5 3 1
    5 6 6 6 4 8 3 7 0 3 8
    8 8 7 6 8 1 0 8 7 0 3
    7 0 4 1 1 3 3 6 7 4 6
    6 6 3 7 2 4 0 6 1 2 7
    5 0 4 4 8 1 2 5 1 2 8
    0 6 0 3 8 8 5 2 8 6 5
    5 2 5 8 2 0 7 8 3 6 7
    3 0 1 7 2 6 7 4 6 0 7
    3 8 2 2 3 4 0 2 1 2 0
    

### 用例4

    
    
    3
    1 2 3
    4
    1 0 0 0
    2 0 0 0
    3 4 5 6
    7 8 9 0
    

### 用例5

    
    
    3
    4 5 6
    4
    1 2 3 4
    5 6 7 8
    0 0 0 0
    9 0 0 0
    

### 用例6

    
    
    2
    0 1
    3
    0 1 2
    0 3 4
    1 5 6
    

### 用例7

    
    
    4
    6 7 8 9
    5
    0 0 0 0 0
    0 6 7 8 9
    0 0 0 0 0
    0 0 0 0 0
    0 0 0 0 0
    

### 用例8

    
    
    4
    1 1 1 1
    5
    1 1 0 0 0
    0 0 0 0 0
    0 0 1 1 0
    0 0 0 0 1
    0 0 0 0 0
    

### 用例9

    
    
    4
    4 0 0 0
    6
    0 4 1 0 2 0
    3 0 0 4 3 0
    1 4 0 3 4 4
    0 0 1 1 4 3
    1 2 1 0 0 1
    0 0 2 3 4 0
    

### 用例10

    
    
    2
    8 9
    3
    0 1 2
    3 4 5
    6 7 0
    

