#### 题目描述

给一个无向图染色，可以填红黑两种颜色，必须保证相邻两个节点不能同时为红色，输出有多少种不同的染色方案？

#### 输入描述

第一行输入M(图中节点数) N(边数)

后续N行格式为：V1 V2表示一个V1到V2的边。

数据范围：1 <= M <= 15,0 <= N <= M * 3，不能保证所有节点都是连通的。

#### 输出描述

输出一个数字表示染色方案的个数。

### 说明

0 < n < 15  
0 <= m <= n * 3  
0 <= s, t < n  
不保证图连通  
保证没有重边和自环

示例一

输入

    
    
    4 4
    1 2
    2 4
    3 4
    1 3
    

输出

    
    
    7
    

> 4个节点，4条边，1号节点和2号节点相连，  
>  2号节点和4号节点相连，3号节点和4号节点相连，  
>  1号节点和3号节点相连，  
>  若想必须保证相邻两个节点不能同时为红色，总共7种方案。

示例二  
输入

    
    
    3 3
    1 2
    1 3
    2 3
    

输出

    
    
    4
    

#### C++

    
    
    #include <iostream>
    #include <vector>
    
    using namespace std;
    
    int dfs(vector<vector<bool>>& edges, int nodeNum, int index, int redCount) {
        if (index > nodeNum) {
            return 1;
        }
    
        int count = 0;
    
        // 当前节点染黑色
        count += dfs(edges, nodeNum, index + 1, redCount);
    
        // 检查当前节点是否可以染红色
        bool canBeRed = true;
        for (int i = 1; i < index; i++) {
            if (edges[index][i] && (redCount & (1 << i)) != 0) {
                canBeRed = false;
                break;
            }
        }
    
        // 当前节点染红色
        if (canBeRed) {
            count += dfs(edges, nodeNum, index + 1, redCount | (1 << index));
        }
    
        return count;
    }
    
    int main() {
        int nodeNum, edgeNum;
        cin >> nodeNum >> edgeNum;
    
        vector<vector<bool>> edges(nodeNum + 1, vector<bool>(nodeNum + 1, false));
        for (int i = 0; i < edgeNum; i++) {
            int node1, node2;
            cin >> node1 >> node2;
            edges[node1][node2] = true;
            edges[node2][node1] = true;
        }
    
        cout << dfs(edges, nodeNum, 1, 0) << endl;
    
        return 0;
    }
    
    

#### JavaScrip

    
    
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    const inputLines = [];
    
    rl.on('line', (line) => {
      inputLines.push(line);
    
      if (inputLines.length === parseInt(inputLines[0].split(' ')[1]) + 1) {
        const [nodeNum, edgeNum] = inputLines.shift().split(' ').map(Number);
        const edges = Array.from({ length: nodeNum + 1 }, () => Array(nodeNum + 1).fill(false));
    
        for (let i = 0; i < edgeNum; i++) {
          const [node1, node2] = inputLines[i].split(' ').map(Number);
          edges[node1][node2] = true;
          edges[node2][node1] = true;
        }
    
        console.log(dfs(edges, nodeNum, 1, 0));
        inputLines.length = 0;
      }
    });
    
    function dfs(edges, nodeNum, index, redCount) {
      if (index > nodeNum) {
        return 1;
      }
    
      let count = 0;
    
      // 当前节点染黑色
      count += dfs(edges, nodeNum, index + 1, redCount);
    
      // 检查当前节点是否可以染红色
      let canBeRed = true;
      for (let i = 1; i < index; i++) {
        if (edges[index][i] && (redCount & (1 << i)) !== 0) {
          canBeRed = false;
          break;
        }
      }
    
      // 当前节点染红色
      if (canBeRed) {
        count += dfs(edges, nodeNum, index + 1, redCount | (1 << index));
      }
    
      return count;
    }
    
    

#### Java

    
    
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            Scanner sc = new Scanner(System.in);
    
            int nodeNum = sc.nextInt();
            int edgeNum = sc.nextInt();
    
            boolean[][] edges = new boolean[nodeNum + 1][nodeNum + 1];
            for (int i = 0; i < edgeNum; i++) {
                int node1 = sc.nextInt();
                int node2 = sc.nextInt();
                edges[node1][node2] = true;
                edges[node2][node1] = true;
            }
    
            System.out.println(dfs(edges, nodeNum, 1, 0));
        }
    
        public static int dfs(boolean[][] edges, int nodeNum, int index, int redCount) {
            if (index > nodeNum) {
                return 1;
            }
    
            int count = 0;
    
            // 当前节点染黑色
            count += dfs(edges, nodeNum, index + 1, redCount);
    
            // 检查当前节点是否可以染红色
            boolean canBeRed = true;
            for (int i = 1; i < index; i++) {
                if (edges[index][i] && (redCount & (1 << i)) != 0) {
                    canBeRed = false;
                    break;
                }
            }
    
            // 当前节点染红色
            if (canBeRed) {
                count += dfs(edges, nodeNum, index + 1, redCount | (1 << index));
            }
    
            return count;
        }
    }
    
    
    

#### Python

    
    
    def main():
        node_num, edge_num = map(int, input().split())
        edges = [[False] * (node_num + 1) for _ in range(node_num + 1)]
    
        for _ in range(edge_num):
            node1, node2 = map(int, input().split())
            edges[node1][node2] = True
            edges[node2][node1] = True
    
        print(dfs(edges, node_num, 1, 0))
    
    def dfs(edges, node_num, index, red_count):
        if index > node_num:
            return 1
    
        count = 0
    
        # 当前节点染黑色
        count += dfs(edges, node_num, index + 1, red_count)
    
        # 检查当前节点是否可以染红色
        can_be_red = True
        for i in range(1, index):
            if edges[index][i] and (red_count & (1 << i)) != 0:
                can_be_red = False
                break
    
        # 当前节点染红色
        if can_be_red:
            count += dfs(edges, node_num, index + 1, red_count | (1 << index))
    
        return count
    
    if __name__ == "__main__":
        main()
    
    

#### 文章目录

  *     *       * 题目描述
      * 输入描述
      * 输出描述
    * 说明
    *       * C++
      * JavaScrip
      * Java
      * Python

![fengmian](https://img-
blog.csdnimg.cn/img_convert/1d2f33ed8cf2fb1b9a4fe09513f7aa94.png)

