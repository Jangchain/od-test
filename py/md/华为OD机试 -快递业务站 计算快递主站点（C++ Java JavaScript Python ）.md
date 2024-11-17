#### 题目描述

快递业务范围有 N 个站点，A 站点与 B 站点可以中转快递，则认为 A-B 站可达，  
如果 A-B 可达，B-C 可达，则 A-C 可达。  
现在给 N 个站点编号 0、1、…n-1，用 s[i][j]表示 i-j 是否可达，  
s[i][j] = 1表示 i-j可达，s[i][j] = 0表示 i-j 不可达。  
现用二维数组给定N个站点的可达关系，请计算至少选择从几个主站点出发，才能可达所有站点（覆盖所有站点业务）。  
说明：s[i][j]与s[j][i]取值相同。

#### 输入描述

第一行输入为 N，N表示站点个数。 1 < N < 10000  
之后 N 行表示站点之间的可达关系，第i行第j个数值表示编号为i和j之间是否可达。

#### 输出描述

输出站点个数，表示至少需要多少个主站点。

#### 用例

输入| 4  
1 1 1 1  
1 1 1 0  
1 1 1 0  
1 0 0 1  
---|---  
输出| 1  
说明| 选择 0 号站点作为主站点， 0 站点可达其他所有站点，  
所以至少选择 1 个站点作为主站才能覆盖所有站点业务。  
输入| 4  
1 1 0 0  
1 1 0 0  
0 0 1 0  
0 0 0 1  
---|---  
输出| 3  
说明| 选择 0 号站点可以覆盖 0、1 站点，  
选择 2 号站点可以覆盖 2 号站点，  
选择 3 号站点可以覆盖 3 号站点，  
所以至少选择 3 个站点作为主站才能覆盖所有站点业务。  
  
#### 题目解析

本题其实就是求解连通分量的个数

#### C++

    
    
    #include <iostream>
    #include <vector>
    
    using namespace std;
    
    int find(vector<int>& parent, int x) {
        if (x != parent[x]) {
            parent[x] = find(parent, parent[x]);
        }
        return parent[x];
    }
    
    int main() {
        int n;
        cin >> n;
    
        vector<vector<int>> sites(n, vector<int>(n));
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                cin >> sites[i][j];
            }
        }
    
        vector<int> parent(n);
        for (int i = 0; i < n; i++) {
            parent[i] = i;
        }
    
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (sites[i][j] == 1) {
                    int rootI = find(parent, i), rootJ = find(parent, j);
                    if (rootI != rootJ) {
                        parent[rootI] = rootJ;
                    }
                }
            }
        }
    
        int count = 0;
        for (int i = 0; i < n; i++) {
            if (parent[i] == i) {
                count++;
            }
        }
    
        cout << count << endl;
    
        return 0;
    }
    
    

#### JavaScript

    
    
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.question('', (input) => {
      const n = parseInt(input);
      const sites = Array.from({ length: n }, () => []);
      let linesRead = 0;
    
      rl.on('line', (line) => {
        sites[linesRead] = line.split(' ').map(Number);
        linesRead++;
    
        if (linesRead === n) {
          const parent = Array.from({ length: n }, (_, i) => i);
    
          for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
              if (sites[i][j] === 1) {
                const rootI = find(parent, i);
                const rootJ = find(parent, j);
    
                if (rootI !== rootJ) {
                  parent[rootI] = rootJ;
                }
              }
            }
          }
    
          let count = 0;
          for (let i = 0; i < n; i++) {
            if (parent[i] === i) {
              count++;
            }
          }
    
          console.log(count);
          rl.close();
        }
      });
    });
    
    function find(parent, x) {
      if (x !== parent[x]) {
        parent[x] = find(parent, parent[x]);
      }
      return parent[x];
    }
    
    
    

#### Java

    
    
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            int n = scanner.nextInt();
            int[][] sites = new int[n][n]; // 定义一个n*n的矩阵sites
            for (int i = 0; i < n; i++) {
                for (int j = 0; j < n; j++) {
                    sites[i][j] = scanner.nextInt(); // 输入矩阵sites
                }
            }
    
            int[] parent = new int[n]; // 记录每个节点的父节点
            for (int i = 0; i < n; i++) {
                parent[i] = i; // 初始时每个节点的父节点是它自己
            }
    
            for (int i = 0; i < n; i++) {
                for (int j = i + 1; j < n; j++) { // 遍历上三角矩阵
                    if (sites[i][j] == 1) { // 如果i和j可达，即sites[i][j]为1
                        int rootI = find(parent, i), rootJ = find(parent, j); // 找到i和j所在连通分量的代表
                        if (rootI != rootJ) { // 如果i和j不在同一个连通分量中
                            parent[rootI] = rootJ; // 将i所在连通分量的代表的父节点更新为j所在连通分量的代表
                        }
                    }
                }
            }
    
            int count = 0;
            for (int i = 0; i < n; i++) {
                if (parent[i] == i) { // 如果节点i是它所在连通分量的代表
                    count++; // 连通分量的个数加1
                }
            }
    
            System.out.println(count); // 输出连通分量的个数
        }
    
        private static int find(int[] parent, int x) { // 查找x所在的连通分量的代表
            if (x != parent[x]) { // 如果x不是它所在连通分量的代表
                parent[x] = find(parent, parent[x]); // 将x的父节点更新为它所在连通分量的代表
            }
            return parent[x]; // 返回x所在连通分量的代表
        }
    }
    
    

#### Python

    
    
    def find(parent, x):
        if x != parent[x]:
            parent[x] = find(parent, parent[x])
        return parent[x]
    
    def main():
        n = int(input().strip())
        sites = [list(map(int, input().strip().split())) for _ in range(n)]
    
        parent = [i for i in range(n)]
    
        for i in range(n):
            for j in range(i + 1, n):
                if sites[i][j] == 1:
                    root_i = find(parent, i)
                    root_j = find(parent, j)
                    if root_i != root_j:
                        parent[root_i] = root_j
    
        count = sum(1 for i in range(n) if parent[i] == i)
    
        print(count)
    
    if __name__ == "__main__":
        main()
    
    

#### 文章目录

  *     *       * 题目描述
      * 输入描述
      * 输出描述
      * 用例
      * 题目解析
      * C++
      * JavaScript
      * Java
      * Python

![fengmian](https://img-
blog.csdnimg.cn/img_convert/1d2f33ed8cf2fb1b9a4fe09513f7aa94.png)

