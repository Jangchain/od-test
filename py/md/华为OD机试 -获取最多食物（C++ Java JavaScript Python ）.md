### 题目描述

主办方设计了一个获取食物的游戏。

游戏的地图由 N N N 个方格组成，每个方格上至多 2 2 2 个传送门，通过传送门可将参与者传送至指定的其它方格。  
同时，每个方格上标注了三个数字：

  1. 第一个数字 i d id id：代表方格的编号，从 0 0 0 到 N − 1 N-1 N−1，每个方格各不相同；
  2. 第二个数字 p a r e n t − i d parent-id parent−id：代表从编号为 p a r e n t − i d parent-id parent−id 的方格可以通过传送门传送到当前方格( − 1 -1 −1 则表示没有任何方格可以通过传送门传送到此方格，这样的方格在地图中有且仅有一个)；
  3. 第三个数字 v a l u e value value：取值在 [ 100 ， 100 ] [100，100] [100，100] 的整数值，正整数代表参与者得到相应取值单位的食物，负整数代表失去相应数值单位的食物(参与者可能存在临时持有食物为负数的情况)， 0 0 0 则代表无变化。

此外，地图设计时保证了参与者不可能到达相同的方格两次，并且至少有一个方格的value 是正整数。

游戏开始后，参与者任意选择一个方格作为出发点，当遇到下列情况之一退出游戏：

  * 参与者当前所处的方格无传送门；
  * 参与者在任意方格上主动宣布退出游戏。

请计算参与者退出游戏后，最多可以获得多少单位的食物。

### 输入描述

第一行: 方块个数N (N <10000)  
接下来输入N行(id<Nparent-id < N,)，每行记录了相应方格上标注的3个数字，即id (0 <= id < 10000) 、parent-id
(0 <= parent-id < 10000和value (-100<= value <= 100)  
特殊的 parent-id 可以取-1， 则表示没有任何方格可以通过传送门传送到此方格，这样的方格在地图中有且仅有一个。

### 输出描述

输出为一个整数，表示参与者退出游戏后最多可以获得多少单位的食物。

示例一  
输入

    
    
    7
    0 1 8
    1 -1 -2
    2 1 9
    4 0 -2
    5 4 3
    3 0 -3
    6 2 -3
    

输出

    
    
    9
    

说明

> 参与者从方格 0 0 0 出发，通过传送门到达方格 4 4 4，再通过传送门到达方格 5 5 5。一共获得 8 + ( − 2 ) + 3 = 9
> 8+(-2) +3=9 8+(−2)+3=9 个单位食物，得到食物最多  
>  或者参与者在游戏开始时处于方格 2 2 2，直接主动宣布退出游戏，也可以获得 9 9 9 个单位食物。

示例二

输入

    
    
    3
    0 -1 3
    1 0 1
    2 0 2
    

输出

    
    
    5
    

说明

> 参与者从方格 0 0 0 出发，通过传送门到达方格 2 2 2，一共可以获得 3 + 2 = 5 3+2=5 3+2=5 个单位食物，此时得到食物最多。

### 思路

题目要求我们计算参与者退出游戏后，最多可以获得多少单位的食物。因此，我们需要找到从某个方块出发，遍历到某个方块可以获得的最大食物单位数。具体实现思路如下：

  1. 读入方块信息，构建图。将每个方块看做一个节点，节点之间的边表示传送门。对于每个方块，记录其编号、父节点编号、value值。如果父节点编号为-1，则该方块为根节点。

  2. 从根节点开始进行深度优先搜索（DFS），递归遍历每个节点的子节点，并计算从该节点出发到达子节点可以获得的最大食物单位数。具体实现时，可以定义一个辅助函数dfs，其中参数id表示当前节点编号，graph表示图的邻接表表示，values表示每个节点的value值，maxValues表示从该节点出发到达子节点可以获得的最大食物单位数。

  3. 在dfs函数中，首先遍历当前节点的所有子节点，并递归调用dfs函数。然后，计算当前节点到达子节点可以获得的最大食物单位数。具体实现时，定义一个变量idMax表示当前节点到达所有子节点可以获得的最大食物单位数，然后遍历当前节点的所有子节点j，计算从子节点j出发到达其他子节点可以获得的最大食物单位数，并取最大值更新idMax。最后，将当前节点的value值加上idMax，得到从该节点出发到达子节点可以获得的最大食物单位数，并更新maxValues数组。

  4. 在主函数中，调用dfs函数从根节点开始遍历整个图，得到每个节点的maxValues值。然后，找到maxValues数组中的最大值，即为参与者退出游戏后可以获得的最大食物单位数。

  5. 输出最大食物单位数。

### C++

    
    
    #include <iostream>
    #include <vector>
    #include <algorithm>
    
    using namespace std;
    
    int dfs(int id, const vector<vector<int>>& graph, const vector<int>& values) {
        int idMax = 0;
        for (int j : graph[id]) {
            idMax = max(dfs(j, graph, values), idMax);
        }
        return values[id] + idMax;
    }
    
    int main() {
        int n;
        cin >> n;
    
        vector<vector<int>> graph(n);
        vector<int> values(n);
    
        for (int i = 0; i < n; i++) {
            int id, parentId, value;
            cin >> id >> parentId >> value;
            values[id] = value;
            if (parentId != -1) {
                graph[parentId].push_back(id);
            }
        }
    
        int maxFood = dfs(0, graph, values);
        cout << maxFood << endl;
    
        return 0;
    }
    
    

### python

    
    
    def main():
        n = int(input())
        graph = [[] for _ in range(n)]
        values = [0] * n
    
        for i in range(n):
            id, parent_id, value = map(int, input().split())
            values[id] = value
            if parent_id != -1:
                graph[parent_id].append(id)
    
        max_food = dfs(0, graph, values)
        print(max_food)
    
    def dfs(id, graph, values):
        id_max = 0
        for j in graph[id]:
            id_max = max(dfs(j, graph, values), id_max)
        return values[id] + id_max
    
    if __name__ == "__main__":
        main()
    
    

### javaScript

    
    
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    const inputLines = [];
    
    rl.on('line', (line) => {
      inputLines.push(line);
    
      if (inputLines.length === parseInt(inputLines[0]) + 1) {
        const n = parseInt(inputLines.shift());
        const graph = Array.from({ length: n }, () => []);
        const values = new Array(n);
    
        for (let i = 0; i < n; i++) {
          const [id, parentId, value] = inputLines[i].split(' ').map(Number);
          values[id] = value;
          if (parentId !== -1) {
            graph[parentId].push(id);
          }
        }
    
        const maxFood = dfs(0, graph, values);
        console.log(maxFood);
        inputLines.length = 0;
      }
    });
    
    function dfs(id, graph, values) {
      let idMax = 0;
      for (const j of graph[id]) {
        idMax = Math.max(dfs(j, graph, values), idMax);
      }
      return values[id] + idMax;
    }
    
    

### java

    
    
    import java.util.*;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            int n = scanner.nextInt(); // 方块个数
            List<List<Integer>> graph = new ArrayList<>(); // graph[i]是编号为i的节点的子节点（i方块所能进入的方块）
            int[] values = new int[n];
    
            for (int i = 0; i < n; i++) {
                graph.add(new ArrayList<>());
            }
    
            for (int i = 0; i < n; i++) {
                int id = scanner.nextInt();
                int parentId = scanner.nextInt();
                int value = scanner.nextInt();
                values[id] = value;
                if (parentId != -1) {
                    graph.get(parentId).add(id);
                }
            }
    
            int maxFood = dfs(0, graph, values);
            System.out.println(maxFood);
        }
    
        // dfs搜索，返回以id为初始位置遍历时的最大路径加权
        private static int dfs(int id, List<List<Integer>> graph, int[] values) {
            int idMax = 0; // 遍历id节点的所有子节点
            for (int j : graph.get(id)) {
                idMax = Math.max(dfs(j, graph, values), idMax); // 递归搜索子节点
            }
            return values[id] + idMax; // 返回以id为初始位置遍历时的最大路径加权
        }
    }
    
    

#### 文章目录

  *     * 题目描述
    * 输入描述
    * 输出描述
    * 思路
    * C++
    * python
    * javaScript
    * java

![fengmian](https://img-
blog.csdnimg.cn/img_convert/1d2f33ed8cf2fb1b9a4fe09513f7aa94.png)

