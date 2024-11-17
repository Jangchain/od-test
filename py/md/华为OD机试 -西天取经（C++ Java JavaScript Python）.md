### 题目

唐僧师徒四人去西天取经，一路翻山越岭。一日，师徒四人途径一个mxn长方形区域，已知  
1.将取经队伍作为一个整体，4人行走相同路线。  
2.取经队伍的起点为该长方形区域的左上角，目的地为该长方形区域的右下角  
3.行走路线可以向前、后、左、右四个方向前进(不允许超出该长方形区域)  
4.输入包含该区域的长m和宽n、前后移动允许的高度差t，以及该长方形区域内各点的高度h。  
5.要求该区域内相邻两次移动的高度差在高度t范围以内。取经队伍最多有3次爆发机会，每使用一次爆发机会，可以让取经队伍一次移动突破高度差限制  
请问取经队伍通过该区域最小的移动次数是多少?返回-1表示师徒四人无法直接通过该区域。

### 输入描述

输入第一行为三个整数，分别对应为长方形场地的两条边长，和前后移动允许的高度差。三个整数之间以空格分割。  
后面是m行，每行n列个数据，表示长方形场地各点的高度。数据之间以空格分割。  
0<m，n<=200，0<t<=20  
每个点的高度hin满足0<=h[i,j]<=4000，0<=i<m 0<=j<n。

### 输出描述

一个整数表示通过该区域最小的移动次数。

### 用例1

输入：

    
    
     4 4 10  
     10 20 30 40  
     100 120 140 160  
     200 230 260 290  
     300 400 500 600  
    

输出

    
    
     6
    

### 用例2

输入

    
    
     1 10 1  
     11 12 200 14 15 16 317 18 19 20  
    

输出

    
    
     -1
    

### 思路

这道题目可以使用深度优先遍历来解决，因为它需要找到所有的路径，所以深度优先遍历比较适合。

在深度优先遍历的过程中，我们需要记录当前的位置和当前的爆发能力使用次数，以及当前的移动步数。

在移动的过程中，我们需要判断当前的位置是否越界，是否已经被遍历过，以及当前的高度差是否在允许的范围内。

如果当前的高度差不在允许的范围内，我们需要判断当前爆发能力使用次数是否超过了3次，如果超过了3次，我们就不能继续往下遍历了。

如果当前的高度差在允许的范围内，我们就可以继续往下遍历，同时更新当前的位置和当前的移动步数。

当我们遍历到终点的时候，我们需要更新最小的移动步数。

最后，我们将最小的移动步数作为结果输出即可。

### C++

    
    
    #include<iostream>
    #include<vector>
    #include<climits>
    using namespace std;
    
    // 定义四个方向
    vector<vector<int>> directions = {{0,1},{0,-1},{1,0},{-1,0}};
    // 初始化最小步数为无穷大
    int min_step = INT_MAX;
    // 记录当前步数
    int cur_step = 0;
    // 记录是否已经访问过
    vector<vector<bool>> visited;
    // 记录当前使用的爆发能力次数
    int times = 0;
    
    // 深度优先搜索
    void dfs(vector<vector<int>> matrix, int x, int y, int k) {
        int m = matrix.size();
        int n = matrix[0].size();
        // 到达右下角，更新最小步数
        if(x == m-1 && y == n-1) {
            min_step = min(min_step, cur_step);
            return;
        }
        // 当前位置已经访问过，返回
        if(visited[x][y]) {
            return;
        }
        visited[x][y] = true;
        for(auto d : directions) {
            int x1 = x + d[0];
            int y1 = y + d[1];
            // 判断是否越界
            if(x1 < 0 || x1 >= m || y1 < 0 || y1 >= n) {
                continue;
            }
            // 判断高度差是否小于等于k
            if(abs(matrix[x1][y1] - matrix[x][y]) <= k) {
                cur_step++;
                dfs(matrix, x1, y1, k);
                cur_step--;
            } else {
                // 判断是否还有爆发能力次数
                if(times > 2) {
                    continue;
                }
                times++;
                cur_step++;
                dfs(matrix, x1, y1, k);
                times--;
                cur_step--;
            }
        }
        visited[x][y] = false;
    }
    
    int main() {
        // 处理输入
        int m, n, k;
        cin >> m >> n >> k;
        // 初始化visited
        for(int i = 0; i < m; i++) {
            vector<bool> temp(n, false);
            visited.push_back(temp);
        }
        // 初始化矩阵
        vector<vector<int>> matrix(m, vector<int>(n, 0));
        for(int i = 0; i < m; i++) {
            for(int j = 0; j < n; j++) {
                int a;
                cin >> a;
                matrix[i][j] = a;
            }
        }
        // 搜索
        dfs(matrix, 0, 0, k);
        // 输出结果
        cout << (min_step == INT_MAX ? -1 : min_step);
        return 0;
    }
    
    

### Java

    
    
    import java.util.*;
    
    public class Main {
        // 定义四个方向
        static int[][] directions = {{0,1},{0,-1},{1,0},{-1,0}};
        // 初始化最小步数为无穷大
        static int min_step = Integer.MAX_VALUE;
        // 记录当前步数
        static int cur_step = 0;
        // 记录是否已经访问过
        static boolean[][] visited;
        // 记录当前使用的爆发能力次数
        static int times = 0;
    
        // 深度优先搜索
        public static void dfs(int[][] matrix, int x, int y, int k) {
            int m = matrix.length;
            int n = matrix[0].length;
            // 到达右下角，更新最小步数
            if(x == m-1 && y == n-1) {
                min_step = Math.min(min_step, cur_step);
                return;
            }
            // 当前位置已经访问过，返回
            if(visited[x][y]) {
                return;
            }
            visited[x][y] = true;
            for(int[] d : directions) {
                int x1 = x + d[0];
                int y1 = y + d[1];
                // 判断是否越界
                if(x1 < 0 || x1 >= m || y1 < 0 || y1 >= n) {
                    continue;
                }
                // 判断高度差是否小于等于k
                if(Math.abs(matrix[x1][y1] - matrix[x][y]) <= k) {
                    cur_step++;
                    dfs(matrix, x1, y1, k);
                    cur_step--;
                } else {
                    // 判断是否还有爆发能力次数
                    if(times > 2) {
                        continue;
                    }
                    times++;
                    cur_step++;
                    dfs(matrix, x1, y1, k);
                    times--;
                    cur_step--;
                }
            }
            visited[x][y] = false;
        }
    
        public static void main(String[] args) {
            // 处理输入
            Scanner scanner = new Scanner(System.in);
            int m = scanner.nextInt();
            int n = scanner.nextInt();
            int k = scanner.nextInt();
            // 初始化visited
            visited = new boolean[m][n];
            // 初始化矩阵
            int[][] matrix = new int[m][n];
            for(int i = 0; i < m; i++) {
                for(int j = 0; j < n; j++) {
                    int a = scanner.nextInt();
                    matrix[i][j] = a;
                }
            }
            // 搜索
            dfs(matrix, 0, 0, k);
            // 输出结果
            System.out.println(min_step == Integer.MAX_VALUE ? -1 : min_step);
        }
    }
    
    

### javaScript

    
    
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    // 定义四个方向
    const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];
    // 初始化最小步数为无穷大
    let min_step = Number.MAX_SAFE_INTEGER;
    // 记录当前步数
    let cur_step = 0;
    // 记录是否已经访问过
    let visited = [];
    // 记录当前使用的爆发能力次数
    let times = 0;
    
    // 深度优先搜索
    function dfs(matrix, x, y, k) {
      const m = matrix.length;
      const n = matrix[0].length;
      // 到达右下角，更新最小步数
      if (x === m - 1 && y === n - 1) {
        min_step = Math.min(min_step, cur_step);
        return;
      }
      // 当前位置已经访问过，返回
      if (visited[x][y]) {
        return;
      }
      visited[x][y] = true;
      for (const d of directions) {
        const x1 = x + d[0];
        const y1 = y + d[1];
        // 判断是否越界
        if (x1 < 0 || x1 >= m || y1 < 0 || y1 >= n) {
          continue;
        }
        // 判断高度差是否小于等于k
        if (Math.abs(matrix[x1][y1] - matrix[x][y]) <= k) {
          cur_step++;
          dfs(matrix, x1, y1, k);
          cur_step--;
        } else {
          // 判断是否还有爆发能力次数
          if (times > 2) {
            continue;
          }
          times++;
          cur_step++;
          dfs(matrix, x1, y1, k);
          times--;
          cur_step--;
        }
      }
      visited[x][y] = false;
    }
    
    rl.on('line', (input) => {
      const [m, n, k] = input.trim().split(' ').map(Number);
      // 初始化visited
      for (let i = 0; i < m; i++) {
        const temp = new Array(n).fill(false);
        visited.push(temp);
      }
      // 初始化矩阵
      const matrix = [];
      rl.on('line', (line) => {
        const row = line.trim().split(' ').map(Number);
        matrix.push(row);
        if (matrix.length === m) {
          rl.close();
          // 搜索
          dfs(matrix, 0, 0, k);
          // 输出结果
          console.log(min_step === Number.MAX_SAFE_INTEGER ? -1 : min_step);
        }
      });
    });
    

### python

    
    
    import sys
    
    # 定义四个方向
    directions = [[0, 1], [0, -1], [1, 0], [-1, 0]]
    # 初始化最小步数为无穷大
    min_step = sys.maxsize
    # 记录当前步数
    cur_step = 0
    # 记录是否已经访问过
    visited = []
    # 记录当前使用的爆发能力次数
    times = 0
    
    # 深度优先搜索
    def dfs(matrix, x, y, k):
        global min_step, cur_step, visited, times
        m = len(matrix)
        n = len(matrix[0])
        # 到达右下角，更新最小步数
        if x == m-1 and y == n-1:
            min_step = min(min_step, cur_step)
            return
        # 当前位置已经访问过，返回
        if visited[x][y]:
            return
        visited[x][y] = True
        for d in directions:
            x1 = x + d[0]
            y1 = y + d[1]
            # 判断是否越界
            if x1 < 0 or x1 >= m or y1 < 0 or y1 >= n:
                continue
            # 判断高度差是否小于等于k
            if abs(matrix[x1][y1] - matrix[x][y]) <= k:
                cur_step += 1
                dfs(matrix, x1, y1, k)
                cur_step -= 1
            else:
                # 判断是否还有爆发能力次数
                if times > 2:
                    continue
                times += 1
                cur_step += 1
                dfs(matrix, x1, y1, k)
                times -= 1
                cur_step -= 1
        visited[x][y] = False
    
    if __name__ == '__main__':
        # 处理输入
        m, n, k = map(int, input().split())
        # 初始化visited
        for i in range(m):
            temp = [False] * n
            visited.append(temp)
        # 初始化矩阵
        matrix = []
        for i in range(m):
            row = list(map(int, input().split()))
            matrix.append(row)
        # 搜索
        dfs(matrix, 0, 0, k)
        # 输出结果
        print(-1 if min_step == sys.maxsize else min_step)
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/1d2f33ed8cf2fb1b9a4fe09513f7aa94.png)

