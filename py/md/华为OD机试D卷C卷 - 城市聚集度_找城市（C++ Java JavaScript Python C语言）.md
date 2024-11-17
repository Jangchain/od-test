## 题目描述

一张地图上有n个城市，城市和城市之间有且只有一条道路相连：要么直接相连，要么通过其它城市中转相连（可中转一次或多次）。城市与城市之间的道路**都不会成环**
。

当切断通往某个城市 i 的所有道路后，地图上将分为多个连通的城市群，设该城市i的聚集度为DPi（Degree of Polymerization），DPi
= max（城市群1的城市个数，城市群2的城市个数，…城市群m 的城市个数）。

请找出地图上DP值最小的城市（即找到城市j，使得DPj = min(DP1,DP2 … DPn))

提示：如果有**多个城市** 都满足条件，这些城市都要找出来（**可能存在多个解** ）

提示：DPi的计算，可以理解为已知一棵树，删除某个节点后；生成的多个子树，求解多个子数节点数的问题。

## 输入描述

每个样例：第一行有一个整数N，表示有N个节点。1 <= N <= 1000。

接下来的N-1行每行有两个整数x，y，表示城市x与城市y连接。1 <= x, y <= N

## 输出描述

输出城市的编号。如果有多个，按照编号升序输出。

## 用例

输入| 5  
1 2  
2 3  
3 4  
4 5  
---|---  
输出| 3  
说明|
输入表示的是如下地图：![](https://i-blog.csdnimg.cn/blog_migrate/0c50ebddb7a227d478ae208b24fde2cf.png)对于城市3，切断通往3的所有道路后，形成2个城市群[（1，2），（4，5）]，其聚集度分别都是2。DP3
= 2。对于城市4，切断通往城市4的所有道路后，形成2个城市群[（1，2，3），（5）]，DP4 = max（3，1）=
3。依次类推，切断其它城市的所有道路后，得到的DP都会大于2，因为城市3就是满足条件的城市，输出是3。  
输入| 6  
1 2  
2 3  
2 4  
3 5  
3 6  
---|---  
输出| 2 3  
说明| 将通往2或者3的所有路径切断，最大城市群数量是3，其他任意城市切断后，最大城市群数量都比3大，所以输出2 3  
  
## C++

    
    
    #include <iostream>
    #include <vector>
    #include <unordered_map>
    #include <algorithm>
    #include <climits>
    
    using namespace std;
    
    class UnionFindSet {
    public:
        vector<int> father; // 存储每个节点的父节点
    
        UnionFindSet(int n) { // 初始化并查集，每个节点的父节点为自己
            father.resize(n);
            for (int i = 0; i < n; i++) father[i] = i;
        }
    
        int find(int x) { // 查找x的祖先节点，路径压缩优化
            if (father[x] != x) {
                return father[x] = find(father[x]);
            }
            return x;
        }
    
        void unionSet(int x, int y) { // 合并x和y所在的集合
            int x_fa = find(x);
            int y_fa = find(y);
    
            if (x_fa != y_fa) { // 如果x和y不在同一个集合中，则将y的祖先节点设为x的祖先节点
                father[y_fa] = x_fa;
            }
        }
    };
    
    int main() {
        int n;
        cin >> n;
    
        vector<vector<int>> relations(n - 1, vector<int>(2)); // 存储n-1条关系
        for (int i = 0; i < n - 1; i++) { // 输入n-1条关系
            cin >> relations[i][0] >> relations[i][1];
        }
    
        int min_dp = INT_MAX; // 最小的最大连通块大小
        vector<int> city; // 最小的最大连通块所在的城市
    
        for (int i = 1; i <= n; i++) { // 枚举每个城市作为特殊城市
            UnionFindSet ufs(n + 1); // 初始化并查集
            for (const auto& relation : relations) { // 将与特殊城市相连的边删除
                int x = relation[0], y = relation[1];
                if (x == i || y == i) continue;
                ufs.unionSet(x, y);
            }
    
            unordered_map<int, int> count; // 统计每个连通块的大小
            for (int f : ufs.father) {
                f = ufs.find(f);
                count[f]++;
            }
    
            int dp = 0; // 最大连通块大小
            for (const auto& c : count) {
                dp = max(dp, c.second);
            }
    
            if (dp < min_dp) { // 如果当前最大连通块大小比之前的最小值还小，则更新最小值和最小值所在的城市
                min_dp = dp;
                city.clear();
                city.push_back(i);
            }
            else if (dp == min_dp) { // 如果当前最大连通块大小与之前的最小值相等，则将城市加入最小值所在的城市列表
                city.push_back(i);
            }
        }
    
        for (int c : city) { // 输出最小的最大连通块所在的城市
            cout << c << " ";
        }
        cout << endl;
    
        return 0;
    }
    

## java

    
    
    import java.util.*;
    import java.lang.*;
    import java.io.*;
    
    class Main {
        static class UnionFindSet {
            private int[] father; // 存储每个节点的父节点
    
            public UnionFindSet(int n) { // 初始化并查集，每个节点的父节点为自己
                father = new int[n];
                for (int i = 0; i < n; i++) father[i] = i;
            }
    
            public int find(int x) { // 查找x的祖先节点，路径压缩优化
                if (father[x] != x) {
                    father[x] = find(father[x]);
                }
                return father[x];
            }
    
            public void unionSet(int x, int y) { // 合并x和y所在的集合
                int x_fa = find(x);
                int y_fa = find(y);
    
                if (x_fa != y_fa) { // 如果x和y不在同一个集合中，则将y的祖先节点设为x的祖先节点
                    father[y_fa] = x_fa;
                }
            }
        }
    
        public static void main(String[] args) throws java.lang.Exception {
            Scanner sc = new Scanner(System.in);
            int n = sc.nextInt();
    
            int[][] relations = new int[n - 1][2]; // 存储n-1条关系
            for (int i = 0; i < n - 1; i++) { // 输入n-1条关系
                relations[i][0] = sc.nextInt();
                relations[i][1] = sc.nextInt();
            }
    
            int min_dp = Integer.MAX_VALUE; // 最小的最大连通块大小
            List<Integer> city = new ArrayList<>(); // 最小的最大连通块所在的城市
    
            for (int i = 1; i <= n; i++) { // 枚举每个城市作为特殊城市
                UnionFindSet ufs = new UnionFindSet(n + 1); // 初始化并查集
                for (int[] relation : relations) { // 将与特殊城市相连的边删除
                    int x = relation[0], y = relation[1];
                    if (x == i || y == i) continue;
                    ufs.unionSet(x, y);
                }
    
                Map<Integer, Integer> count = new HashMap<>(); // 统计每个连通块的大小
                for (int f : ufs.father) {
                    f = ufs.find(f);
                    count.put(f, count.getOrDefault(f, 0) + 1);
                }
    
                int dp = 0; // 最大连通块大小
                for (Map.Entry<Integer, Integer> entry : count.entrySet()) {
                    dp = Math.max(dp, entry.getValue());
                }
    
                if (dp < min_dp) { // 如果当前最大连通块大小比之前的最小值还小，则更新最小值和最小值所在的城市
                    min_dp = dp;
                    city.clear();
                    city.add(i);
                }
                else if (dp == min_dp) { // 如果当前最大连通块大小与之前的最小值相等，则将城市加入最小值所在的城市列表
                    city.add(i);
                }
            }
    
            for (int c : city) { // 输出最小的最大连通块所在的城市
                System.out.print(c + " ");
            }
        }
    }
    

## javaScript

    
    
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    class UnionFindSet {
      constructor(n) {
        this.father = new Array(n);
        for (let i = 0; i < n; i++) {
          this.father[i] = i;
        }
      }
    
      find(x) {
        if (this.father[x] !== x) {
          this.father[x] = this.find(this.father[x]);
        }
        return this.father[x];
      }
    
      unionSet(x, y) {
        const x_fa = this.find(x);
        const y_fa = this.find(y);
    
        if (x_fa !== y_fa) {
          this.father[y_fa] = x_fa;
        }
      }
    }
    
    let n;
    let relations = [];
    
    rl.on('line', (line) => {
      if (!n) {
        n = parseInt(line);
      } else {
        const [x, y] = line.split(' ').map(Number);
        relations.push([x, y]);
        if (relations.length === n - 1) {
          rl.close();
        }
      }
    });
    
    rl.on('close', () => {
      let min_dp = Infinity;
      let city = [];
    
      for (let i = 1; i <= n; i++) {
        const ufs = new UnionFindSet(n + 1);
        for (const [x, y] of relations) {
          if (x === i || y === i) continue;
          ufs.unionSet(x, y);
        }
    
        const count = new Map();
        for (let f of ufs.father) {
          f = ufs.find(f);
          count.set(f, (count.get(f) || 0) + 1);
        }
    
        let dp = 0;
        for (const c of count.values()) {
          dp = Math.max(dp, c);
        }
    
        if (dp < min_dp) {
          min_dp = dp;
          city = [i];
        } else if (dp === min_dp) {
          city.push(i);
        }
      }
    
      console.log(city.join(' '));
    });
    

## python

    
    
    class UnionFindSet:
        def __init__(self, n):
            self.father = [i for i in range(n)]
    
        def find(self, x):
            if self.father[x] != x:
                self.father[x] = self.find(self.father[x])
            return self.father[x]
    
        def unionSet(self, x, y):
            x_fa = self.find(x)
            y_fa = self.find(y)
            if x_fa != y_fa:
                self.father[y_fa] = x_fa
    
    n = int(input())
    relations = [list(map(int, input().split())) for _ in range(n - 1)]
    
    min_dp = float('inf')
    city = []
    
    for i in range(1, n + 1):
        ufs = UnionFindSet(n + 1)
        for x, y in relations:
            if x == i or y == i:
                continue
            ufs.unionSet(x, y)
    
        count = {}
        for f in ufs.father:
            f = ufs.find(f)
            count[f] = count.get(f, 0) + 1
    
        dp = max(count.values())
    
        if dp < min_dp:
            min_dp = dp
            city = [i]
        elif dp == min_dp:
            city.append(i)
    
    print(*city)
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    #include <string.h>
    #include <limits.h>
    
    // 定义并查集的结构
    typedef struct {
        int* father; // 存储每个节点的父节点
        int size;    // 并查集的大小
    } UnionFindSet;
    
    // 初始化并查集
    void initUnionFindSet(UnionFindSet* ufs, int n) {
        ufs->father = (int*)malloc(n * sizeof(int));
        ufs->size = n;
        for (int i = 0; i < n; i++) {
            ufs->father[i] = i;
        }
    }
    
    // 查找x的祖先节点，路径压缩优化
    int find(UnionFindSet* ufs, int x) {
        if (ufs->father[x] != x) {
            ufs->father[x] = find(ufs, ufs->father[x]);
        }
        return ufs->father[x];
    }
    
    // 合并x和y所在的集合
    void unionSet(UnionFindSet* ufs, int x, int y) {
        int x_fa = find(ufs, x);
        int y_fa = find(ufs, y);
        if (x_fa != y_fa) {
            ufs->father[y_fa] = x_fa;
        }
    }
    
    // 主函数
    int main() {
        int n;
        scanf("%d", &n);
    
        int** relations = (int**)malloc((n - 1) * sizeof(int*));
        for (int i = 0; i < n - 1; i++) {
            relations[i] = (int*)malloc(2 * sizeof(int));
            scanf("%d %d", &relations[i][0], &relations[i][1]);
        }
    
        int min_dp = INT_MAX;
        int* city = (int*)malloc(n * sizeof(int));
        int city_count = 0;
    
        for (int i = 1; i <= n; i++) {
            UnionFindSet ufs;
            initUnionFindSet(&ufs, n + 1);
            for (int j = 0; j < n - 1; j++) {
                int x = relations[j][0], y = relations[j][1];
                if (x == i || y == i) continue;
                unionSet(&ufs, x, y);
            }
    
            int* count = (int*)calloc(n + 1, sizeof(int));
            for (int f = 0; f < n + 1; f++) {
                int root = find(&ufs, f);
                count[root]++;
            }
    
            int dp = 0;
            for (int c = 0; c < n + 1; c++) {
                if (count[c] > dp) {
                    dp = count[c];
                }
            }
    
            if (dp < min_dp) {
                min_dp = dp;
                city_count = 0;
                city[city_count++] = i;
            } else if (dp == min_dp) {
                city[city_count++] = i;
            }
    
            free(count);
            free(ufs.father);
        }
    
        for (int i = 0; i < city_count; i++) {
            printf("%d ", city[i]);
        }
        printf("\n");
    
        for (int i = 0; i < n - 1; i++) {
            free(relations[i]);
        }
        free(relations);
        free(city);
    
        return 0;
    }
    

## 完整用例

### 用例1

    
    
    4
    1 2
    2 3
    3 4
    

### 用例2

    
    
    3
    1 2
    2 3
    

### 用例3

    
    
    7
    1 2
    1 3
    1 4
    1 5
    1 6
    1 7
    

### 用例4

    
    
    8
    1 2
    2 3
    2 4
    4 5
    4 6
    6 7
    6 8
    

### 用例5

    
    
    5
    1 2
    2 3
    2 4
    4 5
    

### 用例6

    
    
    6
    1 2
    1 3
    2 4
    2 5
    3 6
    

### 用例7

    
    
    2
    1 2
    

### 用例8

    
    
    10
    1 2
    2 3
    3 4
    4 5
    5 6
    6 7
    7 8
    8 9
    9 10
    

### 用例9

    
    
    8
    1 2
    2 3
    3 4
    4 5
    5 6
    6 7
    7 8
    

### 用例10

    
    
    9
    1 2
    2 3
    3 4
    4 5
    5 6
    6 7
    7 8
    8 9
    

#### 文章目录

  * 题目描述
  * 输入描述
  * 输出描述
  * 用例
  * C++
  * java
  * javaScript
  * python
  * C语言
  * 完整用例
  *     * 用例1
    * 用例2
    * 用例3
    * 用例4
    * 用例5
    * 用例6
    * 用例7
    * 用例8
    * 用例9
    * 用例10

![fengmian](https://i-blog.csdnimg.cn/blog_migrate/169f277a87c29b8ff13d65ef9e7eeec7.png)

