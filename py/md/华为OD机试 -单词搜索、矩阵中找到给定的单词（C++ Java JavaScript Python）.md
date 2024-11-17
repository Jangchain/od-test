#### 题目描述

找到它是一个小游戏，你需要在一个矩阵中找到给定的单词。

假设给定单词 HELLOWORD，在矩阵中只要能找到 H->E->L->L->O->W->O->R->L->D连成的单词，就算通过。

注意区分英文字母大小写，并且您只能上下左右行走，不能走回头路。

#### 输入描述

输入第 1 行包含两个整数 n、m (0 < n,m < 21) 分别表示 n 行 m 列的矩阵，

第 2 行是长度不超过100的单词 W (在整个矩阵中给定单词 W 只会出现一次)，

从第 3 行到第 n+2 行是指包含大小写英文字母的长度为 m 的字符串矩阵。

#### 输出描述

如果能在矩阵中连成给定的单词，则输出给定单词首字母在矩阵中的位置(第几行 第几列)，

否则输出“NO”。

##### ACM输入输出模式

如果你经常使用**Leetcode** ,会知道**letcode** 是不需要编写输入输出函数的。但是华为OD机考使用的是 **ACM 模式**
，需要手动编写输入和输出。

所以最好在牛-
客上提前熟悉这种模式。例如C++使用`cin/cout`,python使用`input()/print()`。JavaScript使用node的`readline()`和`console.log()`。Java
使用`sacnner/system.out.print()`

#### 用例

输入| 5 5  
HELLOWORLD  
CPUCY  
EKLQH  
CHELL  
LROWO  
DGRBC  
---|---  
输出| 3 2  
说明| 无  
输入| 5 5  
HELLOWORLD  
CPUCY  
EKLQH  
CHELL  
LROWO  
AGRBC  
---|---  
输出| NO  
说明| 无  
  
#### 题目解析

原题：[79\. 单词搜索](https://leetcode.cn/problems/word-search/)

题目描述了一个在矩阵中查找给定单词的问题。在矩阵中，需要找到一个由给定单词的字母组成的路径，路径上的字母顺序与给定单词相同。路径中的字母可以在矩阵中上下左右移动，但不能重复访问已经走过的位置。

解题思路和方法如下：

  1. 首先，从输入中读取矩阵的行数`n`、列数`m`、待查找的单词`w`以及矩阵`g`。

  2. 初始化一个布尔矩阵`st`，用于记录矩阵中的位置是否已经访问过。

  3. 定义一个深度优先搜索（DFS）函数`dfs(x, y, k)`，其中`x`和`y`表示当前位置的行和列，`k`表示当前查找的单词字符的索引。

     * 如果当前位置的字符与给定单词的第`k`个字符不匹配，则返回`False`。
     * 如果已经找到给定单词的最后一个字符，则返回`True`。
     * 标记当前位置为已访问。
     * 定义四个方向的移动向量`dx`和`dy`，分别表示上下左右移动。
     * 遍历四个方向，计算下一个位置`a`和`b`。如果下一个位置在矩阵范围内且未访问过，则递归调用`dfs(a, b, k + 1)`。如果返回`True`，则表示找到了路径，返回`True`。
     * 回溯：将当前位置标记为未访问。
     * 如果没有找到路径，返回`False`。
  4. 遍历矩阵中的每个位置，从该位置开始调用`dfs`函数搜索给定单词。

     * 如果找到了路径，输出单词首字母在矩阵中的位置（行和列），并结束搜索。
     * 如果遍历完整个矩阵仍然没有找到路径，输出"NO"。

#### C++

    
    
    #include <iostream>
    #include <cstring>
    using namespace std;
    
    const int N = 105;
    string g[N]; // 存储矩阵
    string w; // 存储待查找的单词
    int n, m; // 存储矩阵的行数和列数
    bool st[N][N]; // 存储已访问过的位置
    
    // 深度优先搜索函数，用于在矩阵中查找给定单词
    bool dfs(int x, int y, int k)
    {
        if (g[x][y] != w[k]) return false; // 当前字符不匹配
    
        if (k == w.size() - 1) return true; // 找到了最后一个字符
    
        st[x][y] = true; // 标记当前点已经走过
    
        int dx[4] = {-1, 0, 1, 0}, dy[4] = {0, 1, 0, -1};
        for (int i = 0; i < 4; i ++ )
        {
            int a = x + dx[i], b = y + dy[i];
            if (a >= 0 && a < n && b >= 0 && b < m && !st[a][b])
                if (dfs(a, b, k + 1)) return true; // 向四个方向继续搜索
        }
    
        st[x][y] = false; // 回溯
    
        return false;
    }
    
    int main()
    {
        cin >> n >> m >> w; // 读取矩阵行数、列数和待查找的单词
    
        for (int i = 0; i < n; i ++ ) cin >> g[i]; // 读取矩阵
    
        // 遍历矩阵中的每个位置，从该位置开始搜索单词
        for (int i = 0; i < n; i ++ )
            for (int j = 0; j < m; j ++ )
                if (dfs(i, j, 0))
                {
                    cout << i + 1 << ' ' << j + 1 << endl; // 输出单词首字母在矩阵中的位置
                    return 0;
                }
    
        cout << "NO" << endl; // 如果无法找到单词，输出"NO"
    
        return 0;
    }
    
    

#### java

    
    
    import java.util.Scanner;
    
    public class Main {
        static String[] g = new String[105]; // 存储矩阵
        static String w; // 存储待查找的单词
        static int n, m; // 存储矩阵的行数和列数
        static boolean[][] st = new boolean[105][105]; // 存储已访问过的位置
    
        // 深度优先搜索函数，用于在矩阵中查找给定单词
        public static boolean dfs(int x, int y, int k) {
            // 如果当前位置的字符与单词中对应位置的字符不匹配，返回false
            if (g[x].charAt(y) != w.charAt(k)) return false;
            // 如果已经找到单词的最后一个字符，返回true
            if (k == w.length() - 1) return true;
    
            // 标记当前位置为已访问
            st[x][y] = true;
    
            // 定义上下左右四个方向的移动向量
            int[] dx = {-1, 0, 1, 0}, dy = {0, 1, 0, -1};
            // 遍历四个方向
            for (int i = 0; i < 4; i++) {
                int a = x + dx[i], b = y + dy[i];
                // 如果新位置在矩阵范围内且未被访问过，继续搜索
                if (a >= 0 && a < n && b >= 0 && b < m && !st[a][b]) {
                    if (dfs(a, b, k + 1)) return true;
                }
            }
    
            // 回溯，将当前位置标记为未访问
            st[x][y] = false;
    
            return false;
        }
    
        public static void main(String[] args) {
            Scanner sc = new Scanner(System.in);
            n = sc.nextInt(); // 读取矩阵行数
            m = sc.nextInt(); // 读取矩阵列数
            w = sc.next(); // 读取待查找的单词
    
            // 读取矩阵
            for (int i = 0; i < n; i++) {
                g[i] = sc.next();
            }
    
            // 遍历矩阵中的每个位置，从该位置开始搜索单词
            for (int i = 0; i < n; i++) {
                for (int j = 0; j < m; j++) {
                    // 如果从当前位置开始可以找到单词，输出位置并结束程序
                    if (dfs(i, j, 0)) {
                        System.out.println((i + 1) + " " + (j + 1));
                        return;
                    }
                }
            }
    
            // 如果无法找到单词，输出"NO"
            System.out.println("NO");
        }
    }
    
    

#### javaScript

    
    
    const readline = require("readline");
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    
    const lines = []; // 存储输入的每一行
    let n, m; // 存储矩阵的行数和列数
    let w; // 存储待查找的单词
    
    rl.on("line", (line) => {
      lines.push(line); // 将输入的每一行添加到lines数组中
    
      // 当lines数组长度为2时，读取矩阵的行数、列数和待查找的单词
      if (lines.length === 2) {
        [n, m] = lines[0].split(" ").map(Number);
        w = lines[1];
      }
    
      // 当输入完整时，开始处理矩阵和搜索逻辑
      if (n && lines.length === n + 2) {
        const g = lines.slice(2).map((line) => line); // 读取矩阵
        const st = new Array(n).fill(false).map(() => new Array(m).fill(false)); // 初始化已访问过的位置矩阵
    
        // 深度优先搜索函数，用于在矩阵中查找给定单词
        function dfs(x, y, k) {
          if (g[x][y] !== w[k]) {
            return false; // 当前字符不匹配
          }
    
          if (k === w.length - 1) {
            return true; // 找到了最后一个字符
          }
    
          st[x][y] = true; // 标记当前点已经走过
    
          const dx = [-1, 0, 1, 0]; // 定义上下左右四个方向的移动向量
          const dy = [0, 1, 0, -1];
          for (let i = 0; i < 4; i++) {
            const a = x + dx[i];
            const b = y + dy[i];
            if (a >= 0 && a < n && b >= 0 && b < m && !st[a][b]) {
              if (dfs(a, b, k + 1)) {
                return true; // 向四个方向继续搜索
              }
            }
          }
    
          st[x][y] = false; // 回溯
    
          return false;
        }
    
        // 遍历矩阵中的每个位置，从该位置开始搜索单词
        for (let i = 0; i < n; i++) {
          for (let j = 0; j < m; j++) {
            if (dfs(i, j, 0)) {
              console.log(i + 1, j + 1); // 输出单词首字母在矩阵中的位置
              process.exit();
            }
          }
        }
    
        console.log("NO"); // 如果无法找到单词，输出"NO"
        process.exit();
      }
    });
    
    

#### python

    
    
    import sys
    
    def dfs(x, y, k, g, st, w, n, m):
        if g[x][y] != w[k]:
            return False  # 当前字符不匹配
    
        if k == len(w) - 1:
            return True  # 找到了最后一个字符
    
        st[x][y] = True  # 标记当前点已经走过
    
        dx = [-1, 0, 1, 0]  # 定义上下左右四个方向的移动向量
        dy = [0, 1, 0, -1]
        for i in range(4):
            a = x + dx[i]
            b = y + dy[i]
            if a >= 0 and a < n and b >= 0 and b < m and not st[a][b]:
                if dfs(a, b, k + 1, g, st, w, n, m):
                    return True  # 向四个方向继续搜索
    
        st[x][y] = False  # 回溯
    
        return False
    
    if __name__ == "__main__":
        
        n, m = map(int, input().split())  # 读取矩阵的行数和列数
        w = input()  # 读取待查找的单词
        g = [input() for _ in range(n)]  # 读取矩阵
    
        st = [[False] * m for _ in range(n)]  # 初始化已访问过的位置矩阵
    
        found = False
        for i in range(n):
            for j in range(m):
                if dfs(i, j, 0, g, st, w, n, m):
                    print(i + 1, j + 1)  # 输出单词首字母在矩阵中的位置
                    found = True
                    break
            if found:
                break
    
        if not found:
            print("NO")  # 如果无法找到单词，输出"NO"
    
    
    
    

#### 文章目录

  *     *       * 题目描述
      * 输入描述
      * 输出描述
      *         * ACM输入输出模式
      * 用例
      * 题目解析
      * C++
      * java
      * javaScript
      * python

![fengmian](https://img-
blog.csdnimg.cn/img_convert/1d2f33ed8cf2fb1b9a4fe09513f7aa94.png)

