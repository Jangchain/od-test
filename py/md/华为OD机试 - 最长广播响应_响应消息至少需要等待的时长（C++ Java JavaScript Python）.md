#### 题目描述

某通信网络中有N个网络结点，用1到N进行标识。

网络中的结点互联互通，且结点之间的消息传递有时延，相连结点的时延均为一个时间单位。

现给定网络结点的连接关系link[i]={u，v}，其中u和v表示网络结点。

当指定一个结点向其他结点进行广播，所有被广播结点收到消息后都会在原路径上回复一条响应消息，请计算发送结点至少需要等待几个时间单位才能收到所有被广播结点的响应消息。

**注：**

  1. N的取值范围为[1，100];
  2. 连接关系link的长度不超过3000，且1 <= u,v <= N;
  3. 网络中任意结点间均是可达的;

#### 输入描述

输入的第一行为两个正整数，分别表示网络结点的个数N，以及时延列表的长度T；

接下来的T行输入，表示结点间的连接关系列表；

最后一行的输入为一个正整数，表示指定的广播结点序号；

#### 输出描述

输出一个整数，表示发送结点接收到所有响应消息至少需要等待的时长。

##### ACM输入输出模式

如果你经常使用**Leetcode** ,会知道**letcode** 是不需要编写输入输出函数的。但是华为OD机考使用的是 **ACM 模式**
，需要手动编写输入和输出。

所以最好在牛-
客上提前熟悉这种模式。例如C++使用`cin/cout`,python使用`input()/print()`。JavaScript使用node的`readline()`和`console.log()`。Java
使用`sacnner/system.out.print()`

#### 用例

输入

    
    
    5 7
    1 4
    2 1
    2 3
    2 4
    3 4
    3 5
    4 5
    2
    

输出

    
    
    4
    

说明

> 结点2到5的最小时延为2，到剩余结点的最小时延均为1，所以至少要等待2*2=4s。

#### 机考代码查重

华为OD机考完成之后，官方会进行代码查重。**华为 od 机考确实有很大的概率抽到原题**
。如果碰到了题库中的原题，一定不要直接使用题解中的代码，尤其是变量名，一定要修改，可以改成毫无意义的单词。除了变量名之外，代码的组织结构和逻辑一定要进行改变，这就要求在日常的刷题中，提前编写好属于自己的代码。

#### C++

    
    
    #include <iostream>
    #include <queue>
    #include <map>
    #include <vector>
    using namespace std;
    
    int main() {
        int N, T;
        cin >> N >> T;
        
        map<int, vector<int>> table;
        for (int i = 0; i < T; i++) {
            int u, v;
            cin >> u >> v;
            if (table.find(u) == table.end()) {
                table[u] = vector<int>();
            }
            if (table.find(v) == table.end()) {
                table[v] = vector<int>();
            }
            table[u].push_back(v);
            table[v].push_back(u);
        }
        
        int start;
        cin >> start;
        
        vector<int> checkList(N+1, 0);
        checkList[start] = 1;
        
        queue<int> q;
        q.push(start);
        
        int level = 0;
        
        while (!q.empty()) {
            level++;
            int qSize = q.size();
            for (int i = 0; i < qSize; i++) {
                int cur = q.front();
                q.pop();
                vector<int> neighbors = table[cur];
                for (int nxt : neighbors) {
                    if (checkList[nxt] == 0) {
                        checkList[nxt] = 1;
                        q.push(nxt);
                    }
                }
            }
        }
        
        cout << (level-1)*2 << endl;
        
        return 0;
    }
    
    

#### JavaScript

    
    
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    let N = 0;
    let T = 0;
    let links = [];
    
    rl.on('line', (line) => {
      if (!N && !T) {
        [N, T] = line.split(' ').map(Number);
      } else if (links.length < T) {
        links.push(line.split(' ').map(Number));
      } else {
        const start = Number(line);
        const table = {};
        for (let i = 0; i < T; i++) {
          const [u, v] = links[i];
          if (!table[u]) {
            table[u] = [];
          }
          if (!table[v]) {
            table[v] = [];
          }
          table[u].push(v);
          table[v].push(u);
        }
    
        const checkList = new Array(N + 1).fill(0);
        checkList[start] = 1;
    
        const q = [];
        q.push(start);
    
        let level = 0;
    
        while (q.length > 0) {
          level++;
          const qSize = q.length;
          for (let i = 0; i < qSize; i++) {
            const cur = q.shift();
            const neighbors = table[cur];
            for (let j = 0; j < neighbors.length; j++) {
              const nxt = neighbors[j];
              if (checkList[nxt] === 0) {
                checkList[nxt] = 1;
                q.push(nxt);
              }
            }
          }
        }
    
        console.log((level - 1) * 2);
        rl.close();
      }
    });
    
    
    

#### Java

    
    
    import java.util.*;
    import java.util.Map.Entry;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            
            // 输入网络结点的个数N和时延列表的长度T
            int N = scanner.nextInt();
            int T = scanner.nextInt();
            
            // 构建连接关系表
            Map<Integer, List<Integer>> table = new HashMap<>();
            for (int i = 0; i < T; i++) {
                int u = scanner.nextInt();
                int v = scanner.nextInt();
                if (!table.containsKey(u)) {
                    table.put(u, new ArrayList<>());
                }
                if (!table.containsKey(v)) {
                    table.put(v, new ArrayList<>());
                }
                table.get(u).add(v);
                table.get(v).add(u);
            }
            
            // 输入指定的广播结点序号
            int start = scanner.nextInt();
            
            // 初始化检查列表
            int[] checkList = new int[N+1];
            checkList[start] = 1;
            
            // 使用队列进行广度优先搜索
            Queue<Integer> q = new LinkedList<>();
            q.add(start);
            
            // 初始化层数和时间单位
            int level = 0;
            
            while (!q.isEmpty()) {
                level++;
                int qSize = q.size();
                for (int i = 0; i < qSize; i++) {
                    int cur = q.poll();
                    List<Integer> neighbors = table.get(cur);
                    for (int nxt : neighbors) {
                        if (checkList[nxt] == 0) {
                            checkList[nxt] = 1;
                            q.add(nxt);
                        }
                    }
                }
            }
            
            // 计算发送结点接收到所有响应消息至少需要等待的时长
            System.out.println((level-1)*2);
            
            scanner.close();
        }
    }
    
    

#### python

    
    
    from collections import deque, defaultdict
    
    # 输入网络结点的个数N和时延列表的长度T
    N, T = map(int, input().split())
    
    # 构建连接关系表
    table = defaultdict(list)
    for _ in range(T):
        u, v = map(int, input().split())
        table[u].append(v)
        table[v].append(u)
    
    # 输入指定的广播结点序号
    start = int(input())
    
    # 初始化检查列表
    checkList = [0] * (N+1)
    checkList[start] = 1
    
    # 使用队列进行广度优先搜索
    q = deque()
    q.append(start)
    
    # 初始化层数和时间单位
    level = 0
    
    while q:
        level += 1
        qSize = len(q)
        for _ in range(qSize):
            cur = q.popleft()
            for nxt in table[cur]:
                if not checkList[nxt]:
                    checkList[nxt] = 1
                    q.append(nxt)
    
    # 计算发送结点接收到所有响应消息至少需要等待的时长
    print((level-1)*2)
    

> #### 文章目录
>
>   *     *       * 题目描述
>       * 输入描述
>       * 输出描述
>       *         * ACM输入输出模式
>       * 用例
>       * 机考代码查重
>       * C++
>       * JavaScript
>       * Java
>       * python
>

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

