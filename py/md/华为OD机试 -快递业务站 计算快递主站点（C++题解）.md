#### 题目描述

快递业务范围有N个站点，A站点与B站点可以中转快递，则认为A-B站可达，如果A-B可达，B-C可达，则A-C可达。  
现在给N个站点编号0、1、…n-1，用s[i][j]表示i-j是否可达，s[i][j]=1表示i-j可达，s[i][j]=0表示i-j不可达。

现用二维数组给定N个站点的可达关系，请计算至少选择从几个主站点出发，才能可达所有站点（覆盖所有站点业务）。

说明：s[i][j]与s[j][i]取值相同。

#### 输入描述

第一行输入为N（1 < N < 10000），N表示站点个数。  
之后N行表示站点之间的可达关系，第i行第j个数值表示编号为i和j之间是否可达。

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
说明| 选择0号站点作为主站点，0站点可达其他所有站点，  
所以至少选择1个站点作为主站才能覆盖所有站点业务。  
输入| 4  
1 1 0 0  
1 1 0 0  
0 0 1 0  
0 0 0 1  
---|---  
输出| 3  
说明| 选择0号站点可以覆盖0、1站点，选择2号站点可以覆盖2号站点，选择3号站点可以覆盖3号站点，所以至少选择3个站点作为主站才能覆盖所有站点业务  
  
#### 题目解析

求解图中连通分量个数。

#### C++

    
    
    #include <iostream>
    #include <vector>
    
    using namespace std;
    
    int find(vector<int>& parent, int x) {
        if (x != parent[x]) {
            parent[x] = find(parent, parent[x]); // 路径压缩，将x的父节点设为x的根节点
        }
        return parent[x]; // 返回x的根节点
    }
    
    int main() {
        int n;
        cin >> n; // 输入站点个数
        vector<vector<int>> sites(n, vector<int>(n)); // 二维数组表示站点之间的可达关系
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                cin >> sites[i][j]; // 输入站点之间的可达关系
            }
        }
    
        vector<int> parent(n); // 用于存储每个站点的父节点
        for (int i = 0; i < n; i++) {
            parent[i] = i; // 初始化每个站点的父节点为自身
        }
        int count = n; // 初始站点个数为n
    
        // 遍历每对站点，如果两个站点可达，则将它们的父节点合并
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (sites[i][j] == 1) { // 如果站点i和站点j可达
                    int rootX = find(parent, i); // 查找站点i的根节点
                    int rootY = find(parent, j); // 查找站点j的根节点
                    if (rootX != rootY) { // 如果两个站点的根节点不同，说明它们属于不同的连通分量
                        parent[rootX] = rootY; // 将站点i的根节点的父节点设为站点j的根节点，合并两个连通分量
                        count--; // 合并连通分量后，站点个数减少1
                    }
                }
            }
        }
    
        cout << count << endl; // 输出至少需要多少个主站点
        return 0;
    }
    
    

#### 文章目录

  *     *       * 题目描述
      * 输入描述
      * 输出描述
      * 用例
      * 题目解析
      * C++

![fengmian](https://img-
blog.csdnimg.cn/img_convert/1d2f33ed8cf2fb1b9a4fe09513f7aa94.png)

