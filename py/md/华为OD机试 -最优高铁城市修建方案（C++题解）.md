## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

高铁城市圈对人们的出行、经济的拉动效果明显。每年都会规划新的高铁城市圈建设。

在给定城市数量、可建设高铁的两城市间的修建成本列表、以及结合城市商业价值会固定建设的两城市建高铁。

请你设计算法，达到修建城市高铁的最低成本。注意，需要满足城市圈内城市间两两互联可达(通过其他城市中转可达也属于满足条件）。

## 输入描述

输入信息包括：

  1. 第一行，包含此城市圈中城市的数量、可建设高铁的两城市间修建成本列表数量、必建高铁的城市列表。三个数字用空格间隔。
  2. 可建设高铁的两城市间的修建成本列表，为多行输入数据，格式为3个数字，用空格分隔，长度不超过1000。
  3. 固定要修建的高铁城市列表，是上面参数2的子集，可能为多行，每行输入为2个数字，以空格分隔。

城市id从1开始编号，建设成本的取值为正整数，取值范围均不会超过1000

## 输出描述

修建城市圈高铁的最低成本，正整数。如果城市圈内存在两城市之间无法互联，则返回-1。

## 示例1

输入

    
    
    3 3 0
    1 2 10
    1 3 100
    2 3 50
    

输出

    
    
    60
    

说明

> 3 3 0城市圈数量为3，表示城市id分别为1,2,3  
>  1 2 10城市1，2间的高铁修建成本为10  
>  1 3 100城市1，3间的高铁修建成本为100  
>  2 3 50城市2，3间的高铁修建成本为50  
>  满足修建成本最低，只需要建设城市1，2间，城市2，3间的高铁即可，城市1，3之间可通过城市2中转来互联。这样最低修建成本就是60。

## 示例2

输入

    
    
    3 3 1
    1 2 10
    1 3 100
    2 3 50
    1 3
    

输出

    
    
    110
    

> 3 3 1 城市圈数量为3，表示城市id分别为1，2，3
>
> 1 2 10 城市1，2间的高铁修建成本为10
>
> 1 3 100 城市1，3间的高铁修建成本为100
>
> 2 3 50 城市2，3间的高铁修建成本为50
>
> 1 3 城市1，3间的高铁必须修建
>
> 因为城市1，3间的高铁必须修建，在满足互联的条件下，再增加修建城市1，2间的高铁即可，最低成本为110

## 解题思路

#### 题目分析

该题要求设计一种算法来计算修建高铁，使所有城市互联的最低成本，并满足必建的高铁连接。满足条件的关键是保证城市间的连通性，即城市间可以通过直接或间接路径互相到达。

具体来看，这个问题可以抽象成一个带权无向图的**最小生成树问题** ，即：

  1. **城市** 作为图中的**节点** 。
  2. **高铁建设成本** 作为节点之间的**边的权重** 。
  3. **必建的高铁** 则是**必须包含的边** 。

#### 解题思路

  1. **构造最小生成树** ：

     * **Kruskal算法** 是一种适合边集存储的最小生成树算法。主要步骤是将所有边按权重排序，并依次将边加入生成树中，避免形成环，直到所有节点互联。
     * 在使用Kruskal时，可以提前将必建的高铁边加入生成树，并减少初始的连通分量（城市群）的数量。
     * 继续将最小的边加入树中，直到所有城市连通，记录总的构造成本。
  2. **连通性判断** ：

     * 若最终无法使所有城市连通，则返回 -1 表示无法构建一个连通的城市圈。
     * 否则，返回最小修建成本。

#### 算法步骤

  1. **并查集** ：使用并查集（Union-Find）管理城市连通性，用于在算法过程中判断两城市是否已经连通。
  2. **初始化必建边** ：先处理必建的边，将这些边加入并查集。
  3. **排序边权** ：对剩余的边按修建成本排序。
  4. **Kruskal算法构建最小生成树** ：按边权递增的顺序将边加入生成树，直到所有节点连通。
  5. **结果输出** ：若最终所有城市连通，则输出构建成本；否则输出-1。

## Java

    
    
    import java.util.HashMap;
    import java.util.Scanner;
    import java.util.Arrays;
    
    public class Main {
        public static void main(String[] args) {
            Scanner in = new Scanner(System.in);
    
            // 读取第一行输入：分别为城市数量、可建设高铁的城市对数量和必建高铁的城市对数量
            String[] firstLine = in.nextLine().split(" ");
            int cityCount = Integer.parseInt(firstLine[0]); // 城市总数量
            int pairCount1 = Integer.parseInt(firstLine[1]); // 可建设高铁的城市对数量
            int pairCount2 = Integer.parseInt(firstLine[2]); // 必建高铁的城市对数量
    
            // 读取可建设高铁的城市对及其代价
            int[][] cityPairs1 = new int[pairCount1][3];
            for (int i = 0; i < pairCount1; i++) {
                String[] cityData = in.nextLine().split(" ");
                cityPairs1[i][0] = Integer.parseInt(cityData[0]); // 城市1
                cityPairs1[i][1] = Integer.parseInt(cityData[1]); // 城市2
                cityPairs1[i][2] = Integer.parseInt(cityData[2]); // 建设代价
            }
    
            // 读取必建高铁的城市对（不需要代价，因为这些高铁是必须建设的）
            int[][] cityPairs2 = new int[pairCount2][2];
            for (int i = 0; i < pairCount2; i++) {
                String[] cityData = in.nextLine().split(" ");
                cityPairs2[i][0] = Integer.parseInt(cityData[0]); // 城市1
                cityPairs2[i][1] = Integer.parseInt(cityData[1]); // 城市2
            }
    
            // 初始化并查集，用于判断连通性
            UF uf = new UF(cityCount);
            
            // 创建 HashMap 用于存储可建设高铁的城市对及其代价，以便快速查找
            HashMap<String, Integer> cityMap = new HashMap<>();
            for (int[] cityPair : cityPairs1) {
                int city1 = cityPair[0], city2 = cityPair[1];
                cityMap.put(getKey(city1, city2), cityPair[2]); // 使用城市对作为键，代价作为值
            }
    
            int result = 0; // 记录总代价
    
            // 处理必建高铁的城市对，直接将它们连通，并累加代价
            for (int[] cityPair : cityPairs2) {
                int city1 = cityPair[0], city2 = cityPair[1];
                result += cityMap.getOrDefault(getKey(city1, city2), 0); // 累加已存在的代价
                uf.union(city1, city2); // 合并两个城市到同一集合
            }
    
            // 如果所有城市已连通，则输出结果并结束
            if (uf.count == 1) {
                System.out.println(result);
                return;
            }
    
            // 按代价升序排列可建设高铁的城市对，方便后续的最小生成树计算
            Arrays.sort(cityPairs1, (a, b) -> Integer.compare(a[2], b[2]));
    
            // 遍历可建设的高铁城市对，构建最小生成树
            for (int[] cityPair : cityPairs1) {
                int city1 = cityPair[0], city2 = cityPair[1];
                if (uf.union(city1, city2)) { // 若城市对未连通，则进行合并
                    result += cityPair[2]; // 累加代价
                }
                if (uf.count == 1) { // 当所有城市连通后，停止循环
                    break;
                }
            }
    
            // 输出结果，如果城市无法全部连通则返回 -1
            System.out.println(uf.count > 1 ? -1 : result);
        }
    
        // 获取唯一键，用于表示两个城市间的关系
        private static String getKey(int city1, int city2) {
            return city1 < city2 ? city1 + "-" + city2 : city2 + "-" + city1;
        }
    }
    
    // 并查集（Union-Find）类，用于管理城市的连通性
    class UF {
        int[] parent; // 存储每个城市的父节点
        int count; // 连通分量的数量
    
        // 初始化并查集，每个城市的父节点指向自己，且初始分量为城市数量
        public UF(int n) {
            parent = new int[n + 1];
            count = n;
            for (int i = 1; i <= n; i++) {
                parent[i] = i;
            }
        }
    
        // 查找操作，使用路径压缩优化
        public int find(int x) {
            if (x != parent[x]) {
                parent[x] = find(parent[x]); // 路径压缩
            }
            return parent[x];
        }
    
        // 合并操作，将两个城市的集合合并
        public boolean union(int x, int y) {
            int rootX = find(x);
            int rootY = find(y);
            if (rootX != rootY) {
                parent[rootY] = rootX; // 合并两个集合
                count--; // 减少连通分量数量
                return true;
            }
            return false; // 已经连通，无需合并
        }
    }
    

## Python

    
    
    # 导入必要的库
    import sys
    
    class UF:
        def __init__(self, n):
            # 初始化并查集，每个城市的父节点指向自己
            self.parent = list(range(n + 1))
            self.count = n  # 记录连通分量数量
        
        def find(self, x):
            # 查找操作，带路径压缩优化
            if x != self.parent[x]:
                self.parent[x] = self.find(self.parent[x])  # 路径压缩
            return self.parent[x]
        
        def union(self, x, y):
            # 合并操作，将两个城市的集合合并
            rootX = self.find(x)
            rootY = self.find(y)
            if rootX != rootY:
                self.parent[rootY] = rootX  # 合并集合
                self.count -= 1  # 连通分量减少
                return True
            return False
    
    def get_key(city1, city2):
        # 获取唯一键，用于表示两个城市间的关系
        return f"{min(city1, city2)}-{max(city1, city2)}"
    
    def main():
        # 读取输入
        cityCount, pairCount1, pairCount2 = map(int, input().split())
        
        # 读取可建设高铁的城市对及其代价
        cityPairs1 = [list(map(int, input().split())) for _ in range(pairCount1)]
        
        # 读取必建高铁的城市对
        cityPairs2 = [list(map(int, input().split())) for _ in range(pairCount2)]
        
        # 初始化并查集和记录代价的字典
        uf = UF(cityCount)
        cityMap = {}
        
        # 将可建设高铁的城市对存入字典，便于查找
        for city1, city2, cost in cityPairs1:
            cityMap[get_key(city1, city2)] = cost
    
        result = 0  # 记录总代价
    
        # 处理必建的高铁城市对，直接连通并累加代价
        for city1, city2 in cityPairs2:
            result += cityMap.get(get_key(city1, city2), 0)
            uf.union(city1, city2)
    
        # 如果所有城市已连通，输出结果
        if uf.count == 1:
            print(result)
            return
    
        # 按代价升序排列可建设高铁的城市对
        cityPairs1.sort(key=lambda x: x[2])
    
        # 遍历可建设高铁的城市对，构建最小生成树
        for city1, city2, cost in cityPairs1:
            if uf.union(city1, city2):  # 如果未连通则合并
                result += cost  # 累加代价
            if uf.count == 1:  # 所有城市连通后退出循环
                break
    
        # 输出结果，若不能完全连通则返回 -1
        print(result if uf.count == 1 else -1)
    
    if __name__ == "__main__":
        main()
    

## JavaScript

    
    
    // 定义并查集类
    class UF {
        constructor(n) {
            this.parent = Array.from({ length: n + 1 }, (_, i) => i); // 初始化父节点数组
            this.count = n; // 初始连通分量数量
        }
    
        find(x) {
            // 查找操作，带路径压缩优化
            if (x !== this.parent[x]) {
                this.parent[x] = this.find(this.parent[x]);
            }
            return this.parent[x];
        }
    
        union(x, y) {
            // 合并操作，将两个城市的集合合并
            const rootX = this.find(x);
            const rootY = this.find(y);
            if (rootX !== rootY) {
                this.parent[rootY] = rootX;
                this.count--; // 连通分量减少
                return true;
            }
            return false;
        }
    }
    
    // 获取唯一键，用于表示两个城市间的关系
    function getKey(city1, city2) {
        return `${Math.min(city1, city2)}-${Math.max(city1, city2)}`;
    }
    
    // 主程序
    function main() {
        const fs = require('fs');
        const input = fs.readFileSync(0, 'utf-8').trim().split('\n');
        
        const [cityCount, pairCount1, pairCount2] = input[0].split(' ').map(Number);
        const cityPairs1 = input.slice(1, pairCount1 + 1).map(line => line.split(' ').map(Number));
        const cityPairs2 = input.slice(pairCount1 + 1).map(line => line.split(' ').map(Number));
        
        const uf = new UF(cityCount);
        const cityMap = new Map();
    
        cityPairs1.forEach(([city1, city2, cost]) => {
            cityMap.set(getKey(city1, city2), cost);
        });
    
        let result = 0;
    
        cityPairs2.forEach(([city1, city2]) => {
            result += cityMap.get(getKey(city1, city2)) || 0;
            uf.union(city1, city2);
        });
    
        if (uf.count === 1) {
            console.log(result);
            return;
        }
    
        cityPairs1.sort((a, b) => a[2] - b[2]);
    
        for (const [city1, city2, cost] of cityPairs1) {
            if (uf.union(city1, city2)) {
                result += cost;
            }
            if (uf.count === 1) {
                break;
            }
        }
    
        console.log(uf.count > 1 ? -1 : result);
    }
    
    main();
    

## C++

    
    
    #include <iostream>
    #include <vector>
    #include <algorithm>
    #include <unordered_map>
    using namespace std;
    
    // 并查集类
    class UF {
    public:
        vector<int> parent;
        int count;
    
        UF(int n) : parent(n + 1), count(n) {
            for (int i = 1; i <= n; ++i) {
                parent[i] = i;
            }
        }
    
        int find(int x) {
            if (x != parent[x]) {
                parent[x] = find(parent[x]);
            }
            return parent[x];
        }
    
        bool union_sets(int x, int y) {
            int rootX = find(x);
            int rootY = find(y);
            if (rootX != rootY) {
                parent[rootY] = rootX;
                count--;
                return true;
            }
            return false;
        }
    };
    
    // 获取键表示两个城市间关系
    string getKey(int city1, int city2) {
        return city1 < city2 ? to_string(city1) + "-" + to_string(city2) : to_string(city2) + "-" + to_string(city1);
    }
    
    int main() {
        int cityCount, pairCount1, pairCount2;
        cin >> cityCount >> pairCount1 >> pairCount2;
    
        vector<vector<int>> cityPairs1(pairCount1, vector<int>(3));
        for (int i = 0; i < pairCount1; ++i) {
            cin >> cityPairs1[i][0] >> cityPairs1[i][1] >> cityPairs1[i][2];
        }
    
        vector<vector<int>> cityPairs2(pairCount2, vector<int>(2));
        for (int i = 0; i < pairCount2; ++i) {
            cin >> cityPairs2[i][0] >> cityPairs2[i][1];
        }
    
        UF uf(cityCount);
        unordered_map<string, int> cityMap;
        for (auto &pair : cityPairs1) {
            cityMap[getKey(pair[0], pair[1])] = pair[2];
        }
    
        int result = 0;
    
        for (auto &pair : cityPairs2) {
            result += cityMap[getKey(pair[0], pair[1])];
            uf.union_sets(pair[0], pair[1]);
        }
    
        if (uf.count == 1) {
            cout << result << endl;
            return 0;
        }
    
        sort(cityPairs1.begin(), cityPairs1.end(), [](const vector<int> &a, const vector<int> &b) {
            return a[2] < b[2];
        });
    
        for (auto &pair : cityPairs1) {
            if (uf.union_sets(pair[0], pair[1])) {
                result += pair[2];
            }
            if (uf.count == 1) {
                break;
            }
        }
    
        cout << (uf.count > 1 ? -1 : result) << endl;
        return 0;
    }
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    
    #define MAX 10001
    
    int parent[MAX];
    int count;
    
    void initUF(int n) {
        count = n;
        for (int i = 1; i <= n; i++) {
            parent[i] = i;
        }
    }
    
    int find(int x) {
        if (x != parent[x]) {
            parent[x] = find(parent[x]);
        }
        return parent[x];
    }
    
    int unionSets(int x, int y) {
        int rootX = find(x);
        int rootY = find(y);
    
        if (rootX != rootY) {
            parent[rootY] = rootX;
            count--;
            return 1;
        }
        return 0;
    }
    
    typedef struct {
        int city1, city2, cost;
    } CityPair;
    
    int cmp(const void *a, const void *b) {
        return ((CityPair *)a)->cost - ((CityPair *)b)->cost;
    }
    
    int main() {
        int cityCount, pairCount1, pairCount2;
        scanf("%d %d %d", &cityCount, &pairCount1, &pairCount2);
    
        CityPair cityPairs1[pairCount1];
        int cityPairs2[pairCount2][2];
        for (int i = 0; i < pairCount1; i++) {
            scanf("%d %d %d", &cityPairs1[i].city1, &cityPairs1[i].city2, &cityPairs1[i].cost);
        }
        for (int i = 0; i < pairCount2; i++) {
            scanf("%d %d", &cityPairs2[i][0], &cityPairs2[i][1]);
        }
    
        initUF(cityCount);
    
        int result = 0;
    
        for (int i = 0; i < pairCount2; i++) {
            int city1 = cityPairs2[i][0];
            int city2 = cityPairs2[i][1];
            for (int j = 0; j < pairCount1; j++) {
                if ((cityPairs1[j].city1 == city1 && cityPairs1[j].city2 == city2) || 
                    (cityPairs1[j].city1 == city2 && cityPairs1[j].city2 == city1)) {
                    result += cityPairs1[j].cost;
                    break;
                }
            }
            unionSets(city1, city2);
        }
    
        if (count == 1) {
            printf("%d\n", result);
            return 0;
        }
    
        qsort(cityPairs1, pairCount1, sizeof(CityPair), cmp);
    
        for (int i = 0; i < pairCount1; i++) {
            if (unionSets(cityPairs1[i].city1, cityPairs1[i].city2)) {
                result += cityPairs1[i].cost;
            }
            if (count == 1) {
                break;
            }
        }
    
        printf("%d\n", count > 1 ? -1 : result);
        return 0;
    }
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/17a7b1f4803c7c38f942d8bb7f65f981.png)

