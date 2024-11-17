#### 题目描述

某通信网络中有N个网络结点，用1到N进行标识。网络通过一个有向无环图表示，其中图的边的值表示结点之间的消息传递时延。

现给定相连节点之间的时延列表times[i]={u，v，w}，其中u表示源结点，v表示目的结点，w表示u和v之间的消息传递时延。

请计算给定源结点到目的结点的最小传输时延，如果目的结点不可达，返回**-1****。**

注：

  * N的取值范围为[1，100];
  * 时延列表times的长度不超过6000，且 1 <= u,v <= N，0 <= w <= 100;

#### 输入描述

输入的第一行为两个正整数，分别表示网络结点的个数N，以及时延列表的长度M，用空格分隔；

接下来的M行为两个结点间的时延列表[u v w];

输入的最后一行为两个正整数，分别表示源结点和目的结点。

![image-20230322212117896](https://i-blog.csdnimg.cn/blog_migrate/66f3c249d1c5f63472c637479be245c8.png)

#### 输出描述

起点到终点得最小时延，不可达则返回-1

##### ACM输入输出模式

如果你经常使用**Leetcode** ,会知道**letcode** 是不需要编写输入输出函数的。但是华为OD机考使用的是 **ACM 模式**
，需要手动编写输入和输出。

所以最好在牛-
客上提前熟悉这种模式。例如C++使用`cin/cout`,python使用`input()/print()`。JavaScript使用node的`readline()`和`console.log()`。Java
使用`sacnner/system.out.print()`

#### 用例

输入| 3 3  
1 2 11  
2 3 13  
1 3 50  
1 3  
---|---  
输出| 24  
说明| 无  
  
#### 题目解析

解题思路：

  1. 首先，我们通过读取输入，获取网络结点的个数N和时延列表的长度M。

  2. 接下来，我们读取M行时延列表的数据，并将其存储在二维数组`times`中。

  3. 创建一个邻接表表示的有向图`graph`，其中每个结点都对应一个列表，列表中存储该结点的邻接结点及其权值。

  4. 初始化源结点到各结点的距离数组`dists`，将所有结点的距离初始化为无穷大，将源结点的距离初始化为0。

  5. 初始化需要检查的结点列表`needCheck`，将源结点加入列表。

  6. 使用Dijkstra算法进行最短路径计算：

     * 选择距离最小的结点进行松弛操作。
     * 对该结点的邻接结点进行松弛操作，更新距离数组和需要检查的结点列表。
     * 重复上述步骤，直到需要检查的结点列表为空。
  7. 返回源结点到目的结点的最小传输时延，如果目的结点不可达，则返回-1。

。

#### C++

    
    
    #include <iostream>
    #include <vector>
    #include <algorithm>
    #include <climits>
    
    using namespace std;
    
    int getMinTransDelay(int n, vector<vector<int>>& times, int src, int tar) {
        vector<vector<pair<int, int>>> graph(n + 1);
    
        // 构建图
        for (auto& time : times) {
            int u = time[0], v = time[1], w = time[2];
            graph[u].push_back({v, w});
        }
    
        // 初始化距离数组
        vector<int> dist(n + 1, INT_MAX);
        dist[src] = 0;
    
        // 初始化待检查节点数组
        vector<int> toCheck;
        toCheck.push_back(src);
    
        while (!toCheck.empty()) {
            bool flag = false;
            int u = toCheck[0];
    
            // 遍历相邻节点
            for (auto& next : graph[u]) {
                int v = next.first, w = next.second;
                int newDist = dist[u] + w;
    
                // 更新最短距离
                if (newDist >= dist[v]) continue;
                dist[v] = newDist;
    
                // 将新节点加入待检查数组
                if (find(toCheck.begin(), toCheck.end(), v) == toCheck.end()) {
                    toCheck.push_back(v);
                    flag = true;
                }
            }
    
            // 移除当前节点并按距离排序
            if (!flag) toCheck.erase(toCheck.begin());
            else sort(toCheck.begin(), toCheck.end(), [&](int a, int b) { return dist[a] < dist[b]; });
        }
    
        return dist[tar] == INT_MAX ? -1 : dist[tar];
    }
    
    int main() {
        int n, m;
        vector<vector<int>> times;
        int src, tar;
    
        // 读入数据
        cin >> n >> m;
        for (int i = 0; i < m; i++) {
            int u, v, w;
            cin >> u >> v >> w;
            times.push_back({u, v, w});
        }
        cin >> src >> tar;
    
        // 计算最短传输时延
        cout << getMinTransDelay(n, times, src, tar) << endl;
    
        return 0;
    }
    

#### JavaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    // 创建一个List对象，用于存储输入的每一行数据
    const lines = [];
    // 初始化n和m的值
    let n = 0, m = 0;
    
    rl.on('line', (line) => {
      lines.push(line);
    
      // 如果读取的是第一行数据，那么将n和m的值分别赋值为输入的两个整数
      if (lines.length === 1) {
        const nm = line.split(" ");
        n = parseInt(nm[0]);
        m = parseInt(nm[1]);
      }
    
      // 如果已经读取了m行数据，那么就开始处理这些数据
      if (m > 0 && lines.length === m + 2) {
        // 移除第一行和最后一行数据，并将它们分别赋值给src和dist
        lines.shift();
        const srcDist = lines.pop().split(" ");
        const src = parseInt(srcDist[0]);
        const dist = parseInt(srcDist[1]);
    
        // 创建一个二维数组times，用于存储每条边的起点、终点和权值
        const times = new Array(m);
        for (let i = 0; i < m; i++) {
          const time = lines[i].split(" ");
          times[i] = [parseInt(time[0]), parseInt(time[1]), parseInt(time[2])];
        }
    
        // 调用getMinTransDelay方法，计算源节点src到目标节点dist的最短路径
        console.log(getMinTransDelay(n, times, src, dist));
    
        // 清空lines列表，以便下一次使用
        lines.length = 0;
      }
    });
    
    // 计算源节点src到目标节点dist的最短路径
    function getMinTransDelay(n, times, src, dist) {
      // 构建邻接表表示的有向图
      const graph = new Array(n + 1);
      for (let i = 0; i <= n; i++) {
        graph[i] = [];
      }
      for (let i = 0; i < times.length; i++) {
        const [u, v, w] = times[i];
        graph[u].push([v, w]);
      }
    
      // 初始化源节点到各节点的距离
      const dists = new Array(n + 1).fill(Number.MAX_SAFE_INTEGER);
      dists[src] = 0;
    
      // 初始化需要检查的节点列表
      const needCheck = [src];
    
      // Dijkstra算法
      while (needCheck.length > 0) {
        // 选择距离最小的节点进行松弛操作
        let u = needCheck[0];
        for (let i = 1; i < needCheck.length; i++) {
          const v = needCheck[i];
          if (dists[v] < dists[u]) {
            u = v;
          }
        }
        needCheck.splice(needCheck.indexOf(u), 1);
    
        // 对u的邻接节点进行松弛操作
        for (const [v, w] of graph[u]) {
          const newDist = dists[u] + w;
    
          if (newDist >= dists[v]) {
            continue;
          }
    
          dists[v] = newDist;
          if (!needCheck.includes(v)) {
            needCheck.push(v);
          }
        }
      }
    
      // 返回源节点src到目标节点dist的最短路径
      return dists[dist] === Number.MAX_SAFE_INTEGER ? -1 : dists[dist];
    }
    

#### Java

    
    
    import java.util.ArrayList;
    import java.util.List;
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            // 创建一个Scanner对象，用于读取输入
            Scanner scanner = new Scanner(System.in);
            // 创建一个List对象，用于存储输入的每一行数据
            List<String> lines = new ArrayList<>();
            // 初始化n和m的值
            int n = 0, m = 0;
    
            // 循环读取输入的每一行数据
            while (scanner.hasNextLine()) {
                String line = scanner.nextLine();
                lines.add(line);
    
                // 如果读取的是第一行数据，那么将n和m的值分别赋值为输入的两个整数
                if (lines.size() == 1) {
                    String[] nm = line.split(" ");
                    n = Integer.parseInt(nm[0]);
                    m = Integer.parseInt(nm[1]);
                }
    
                // 如果已经读取了m行数据，那么就开始处理这些数据
                if (m > 0 && lines.size() == m + 2) {
                    // 移除第一行和最后一行数据，并将它们分别赋值给src和dist
                    lines.remove(0);
                    String[] srcDist = lines.remove(lines.size() - 1).split(" ");
                    int src = Integer.parseInt(srcDist[0]);
                    int dist = Integer.parseInt(srcDist[1]);
    
                    // 创建一个二维数组times，用于存储每条边的起点、终点和权值
                    int[][] times = new int[m][3];
                    for (int i = 0; i < m; i++) {
                        String[] time = lines.get(i).split(" ");
                        times[i][0] = Integer.parseInt(time[0]);
                        times[i][1] = Integer.parseInt(time[1]);
                        times[i][2] = Integer.parseInt(time[2]);
                    }
    
                    // 调用getMinTransDelay方法，计算源节点src到目标节点dist的最短路径
                    System.out.println(getMinTransDelay(n, times, src, dist));
    
                    // 清空lines列表，以便下一次使用
                    lines.clear();
                }
            }
        }
    
        // 计算源节点src到目标节点dist的最短路径
        private static int getMinTransDelay(int n, int[][] times, int src, int dist) {
            // 构建邻接表表示的有向图
            List<List<int[]>> graph = new ArrayList<>();
            for (int i = 0; i <= n; i++) {
                graph.add(new ArrayList<>());
            }
            for (int[] time : times) {
                int u = time[0];
                int v = time[1];
                int w = time[2];
                graph.get(u).add(new int[]{v, w});
            }
    
            // 初始化源节点到各节点的距离
            int[] dists = new int[n + 1];
            for (int i = 1; i <= n; i++) {
                dists[i] = Integer.MAX_VALUE;
            }
            dists[src] = 0;
    
            // 初始化需要检查的节点列表
            List<Integer> needCheck = new ArrayList<>();
            needCheck.add(src);
    
            // Dijkstra算法
            while (!needCheck.isEmpty()) {
                // 选择距离最小的节点进行松弛操作
                int u = needCheck.get(0);
                for (int i = 1; i < needCheck.size(); i++) {
                    int v = needCheck.get(i);
                    if (dists[v] < dists[u]) {
                        u = v;
                    }
                }
                needCheck.remove((Integer) u);
    
                // 对u的邻接节点进行松弛操作
                for (int[] next : graph.get(u)) {
                    int v = next[0];
                    int w = next[1];
                    int newDist = dists[u] + w;
    
                    if (newDist >= dists[v]) {
                        continue;
                    }
    
                    dists[v] = newDist;
                    if (!needCheck.contains(v)) {
                        needCheck.add(v);
                    }
                }
            }
    
            // 返回源节点src到目标节点dist的最短路径
            return dists[dist] == Integer.MAX_VALUE ? -1 : dists[dist];
        }
    }
    

#### python

    
    
    import sys
    from heapq import heappush, heappop
    
    def get_min_trans_delay(n, times, src, tar):
        # 构建图
        graph = [[] for _ in range(n + 1)]
        for time in times:
            u, v, w = time
            graph[u].append((v, w))
    
        # 初始化距离数组
        dist = [sys.maxsize] * (n + 1)
        dist[src] = 0
    
        # 初始化优先队列
        pq = [(0, src)]
    
        while pq:
            cur_dist, u = heappop(pq)
    
            # 遍历相邻节点
            for v, w in graph[u]:
                new_dist = cur_dist + w
    
                # 更新最短距离
                if new_dist < dist[v]:
                    dist[v] = new_dist
                    heappush(pq, (new_dist, v))
    
        return -1 if dist[tar] == sys.maxsize else dist[tar]
    
    def main():
        # 读入数据
        n, m = map(int, input().split())
        times = [list(map(int, input().split())) for _ in range(m)]
        src, tar = map(int, input().split())
    
        # 计算最短传输时延
        print(get_min_trans_delay(n, times, src, tar))
    
    if __name__ == "__main__":
        main()
    
    

#### 文章目录

  *     *       * 题目描述
      * 输入描述
      * 输出描述
      *         * ACM输入输出模式
      * 用例
      * 题目解析
      * C++
      * JavaScript
      * Java
      * python

![fengmian](https://img-
blog.csdnimg.cn/img_convert/1d2f33ed8cf2fb1b9a4fe09513f7aa94.png)

