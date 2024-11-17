#### 题目描述

>
> 有M*N的节点矩阵，每个节点可以向8个方向（上、下、左、右及四个斜线方向）转发数据包，每个节点转发时会消耗固定时延，连续两个相同时延可以减少一个时延值（即当有K个相同时延的节点连续转发时可以减少K-  
>  1个时延值），
>
> 求左上角（0，0）开始转发数据包到右下角（M-1，N- 1）并转发出的最短时延。

#### 输入描述

> 第一行两个数字，M、N，接下来有M行，每行有N个数据，表示M* N的矩阵。

#### 输出描述

> 最短时延值

##### ACM输入输出模式

如果你经常使用**Leetcode** ,会知道**letcode** 是不需要编写输入输出函数的。但是华为OD机考使用的是 **ACM 模式**
，需要手动编写输入和输出。

所以最好在牛-
客上提前熟悉这种模式。例如C++使用`cin/cout`,python使用`input()/print()`。JavaScript使用node的`readline()`和`console.log()`。Java
使用`sacnner/system.out.print()`

#### 用例

输入| 3 3  
0 2 2  
1 2 1  
2 2 1  
---|---  
输出| 3  
说明| 无  
输入| 3 3  
2 2 2  
2 2 2  
2 2 2  
---|---  
输出| 4  
说明| （2 + 2 + 2 -（3-1))  
  
#### 机考代码查重

华为OD机考完成之后，官方会进行代码查重。**华为 od 机考确实有很大的概率抽到原题**
。如果碰到了题库中的原题，一定不要直接使用题解中的代码，尤其是变量名，一定要修改，可以改成毫无意义的单词。除了变量名之外，代码的组织结构和逻辑一定要进行改变，这就要求在日常的刷题中，提前编写好属于自己的代码。

#### C++

    
    
    #include <iostream>
    #include <vector>
    #include <unordered_set>
    #include <climits>
    #include <algorithm>
    
    using namespace std;
    
    int m, n; // 矩阵的行数和列数
    vector<vector<int>> matrix; // 存储矩阵的二维向量
    vector<vector<int>> offsets = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}, {-1, -1}, {-1, 1}, {1, -1}, {1, 1}}; // 存储八个方向的偏移量
    
    void dfs(int i, int j, int delay, int last, unordered_set<int>& path, vector<int>& res) {
        int cur = matrix[i][j]; // 当前位置的值
        bool flag = cur == last; // 判断是否需要等待一秒
        if (i == m - 1 && j == n - 1) { // 到达终点
            delay += cur - (flag ? 1 : 0); // 更新延迟时间
            res.push_back(delay); // 将当前的延迟时间加入结果向量
            return;
        }
        for (auto& offset : offsets) { // 遍历八个方向
            int new_i = i + offset[0]; // 新的行坐标
            int new_j = j + offset[1]; // 新的列坐标
            int pos = new_i * n + new_j; // 将二维坐标转换为一维坐标
            if (new_i >= 0 && new_i < m && new_j >= 0 && new_j < n && !path.count(pos)) { // 判断新的位置是否越界且是否已经访问过
                path.insert(pos); // 将新的位置加入路径中
                dfs(new_i, new_j, delay + cur - (flag ? 1 : 0), cur, path, res); // 递归遍历新的位置
                path.erase(pos); // 将新的位置从路径中删除，回溯到上一步
            }
        }
    }
    
    int main() {
        cin >> m >> n; // 输入矩阵的行数和列数
        matrix.resize(m, vector<int>(n)); // 初始化矩阵的二维向量
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                cin >> matrix[i][j]; // 输入矩阵的每个元素
            }
        }
        vector<int> res; // 存储所有到达终点的路径的延迟时间
        unordered_set<int> path; // 存储当前路径中已经访问过的位置
        path.insert(0); // 将起点加入路径中
        dfs(0, 0, 0, INT_MAX, path, res); // 从起点开始遍历矩阵
        cout << *min_element(res.begin(), res.end()) << endl; // 输出所有到达终点的路径中的最小延迟时间
        return 0;
    }
    

#### 文章目录

  *     *       * 题目描述
      * 输入描述
      * 输出描述
      *         * ACM输入输出模式
      * 用例
      * 机考代码查重
      * C++

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

