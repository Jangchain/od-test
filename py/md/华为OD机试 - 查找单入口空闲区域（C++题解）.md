#### 题目描述

给定一个 m x n 的矩阵，由若干字符 ‘X’ 和 ‘O’构成，’X’表示该处已被占据，’O’表示该处空闲，请找到最大的单入口空闲区域。

解释：

空闲区域是由连通的’O’组成的区域，位于边界的’O’可以构成入口，

单入口空闲区域即有且只有一个位于边界的’O’作为入口的由连通的’O’组成的区域。  
如果两个元素在水平或垂直方向相邻，则称它们是“连通”的。

#### 输入描述

第一行输入为两个数字，第一个数字为行数m，第二个数字为列数n，两个数字以空格分隔，1<=m,n<=200。

剩余各行为矩阵各行元素，元素为‘X’或‘O’，各元素间以空格分隔。

#### 输出描述

若有唯一符合要求的最大单入口空闲区域，输出三个数字

  * 第一个数字为入口行坐标（0~m-1）
  * 第二个数字为入口列坐标（0~n-1）
  * 第三个数字为区域大小

三个数字以空格分隔；

若有多个符合要求，则输出区域大小最大的，若多个符合要求的单入口区域的区域大小相同，则此时只需要输出区域大小，不需要输出入口坐标。

若没有，输出NULL。

#### 用例

输入| 4 4  
X X X X  
X O O X  
X O O X  
X O X X  
---|---  
输出| 3 1 5  
说明| 存在最大单入口区域，入口坐标(3,1)，区域大小5  
输入| 4 5  
X X X X X  
O O O O X  
X O O O X  
X O X X O  
---|---  
输出| 3 4 1  
说明| 存在最大单入口区域，入口坐标（3,4），区域大小1  
输入| 5 4  
X X X X  
X O O O  
X O O O  
X O O X  
X X X X  
---|---  
输出| NULL  
说明| 不存在最大单入口区域  
输入| 5 4  
X X X X  
X O O O  
X X X X  
X O O O  
X X X X  
---|---  
输出| 3  
说明| 存在两个大小为3的最大单入口区域，两个入口坐标分别为(1,3)、(3,3)  
  
#### 题目解析

本题可以使用[深度优先搜索](https://so.csdn.net/so/search?q=%E6%B7%B1%E5%BA%A6%E4%BC%98%E5%85%88%E6%90%9C%E7%B4%A2&spm=1001.2101.3001.7020)来解题。

首先，我们可以遍历矩阵元素，当遍历到“O”时，已该“O”的坐标位置开始向其上、下、左、右方向开始深度优先搜索，每搜索到一个“O”，则该空闲区域数量+1，如果搜索到的“O”的坐标位置处于矩阵第一列，或最后一列，或者第一行，或者最后一行，那么该“O”位置就是空闲区域的入口位置，我们将其缓存到out数组中。

当所有深度优先搜索的分支都搜索完了，则判断out统计的入口数量，

  1. 如果只有1个，则该空闲区域是符合题意得单入口空闲区域，输出入口坐标位置，以及空闲区域数量。
  2. 如果有多个，则该区域不符合要求

#### 代码思路

这道题目可以使用DFS进行求解。首先，对于每个未访问过的空闲位置进行DFS搜索，找到该位置所在的连通块，并将该连通块的入口加入入口集合。在DFS搜索过程中，需要判断当前位置是否合法、是否已经访问过、是否是占据的位置，并将已经访问过的位置加入已访问集合中。如果该位置在边界上，则将其加入入口集合中。在DFS搜索结束后，如果入口集合只有一个元素，则将该连通块的入口和大小加入答案集合中。

最后，对于答案集合中的连通块，按照连通块大小从大到小排序，如果只有一个符合条件的连通块或者最大的连通块大小比次大的连通块大小大，则输出最大连通块的入口和大小，否则只输出最大连通块的大小。如果没有符合条件的连通块，则输出NULL。

#### C++

    
    
    #include <iostream>
    #include <vector>
    #include <algorithm>
    #include <string>
    #include <unordered_set>
    
    using namespace std;
    
    int rows, cols; // 矩阵的行数和列数
    string matrix[200][200]; // 存储矩阵
    int offset[4][2] = {{0, -1}, {0, 1}, {-1, 0}, {1, 0}}; // 上下左右四个方向的偏移量
    unordered_set<string> checked; // 存储已经访问过的位置
    
    // DFS搜索连通块
    int dfs(int i, int j, int count, vector<vector<int>> &enter) {
        string pos = to_string(i) + "-" + to_string(j); // 将位置转化为字符串
    
        // 如果位置不合法或者已经访问过或者是占据的位置，则退出搜索
        if (i < 0 || i >= rows || j < 0 || j >= cols || matrix[i][j] == "X" || checked.count(pos)) {
            return count;
        }
    
        checked.insert(pos); // 将该位置标记为已访问
    
        // 如果该位置在边界上，则将其加入入口集合
        if (i == 0 || i == rows - 1 || j == 0 || j == cols - 1) enter.push_back({i, j});
    
        count++; // 连通块大小加1
    
        // 在上下左右四个方向上继续搜索
        for (int k = 0; k < 4; k++) {
            int offsetX = offset[k][0];
            int offsetY = offset[k][1];
    
            int newI = i + offsetX;
            int newJ = j + offsetY;
            count = dfs(newI, newJ, count, enter);
        }
    
        return count;
    }
    
    int main() {
        cin >> rows >> cols;
    
        // 读入矩阵
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                cin >> matrix[i][j];
            }
        }
    
        vector<vector<int>> ans; // 存储符合条件的连通块的入口和大小
    
        // 对每个未访问过的空闲位置进行DFS搜索
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                if (matrix[i][j] == "O" && !checked.count(to_string(i) + "-" + to_string(j))) {
                    vector<vector<int>> enter;
                    int count = dfs(i, j, 0, enter);
                    if (enter.size() == 1) { // 如果入口只有一个，则将其加入答案集合
                        vector<int> pos = enter[0];
                        ans.push_back({pos[0], pos[1], count});
                    }
                }
            }
        }
    
        if (ans.size() == 0) { // 如果没有符合条件的连通块，则输出NULL
            cout << "NULL" << endl;
            return 0;
        }
    
        // 按照连通块大小从大到小排序
        sort(ans.begin(), ans.end(), [](vector<int> a, vector<int> b) {
            return a[2] > b[2];
        });
    
        if (ans.size() == 1 || ans[0][2] > ans[1][2]) { // 如果只有一个符合条件的连通块或者最大的连通块大小比次大的连通块大小大，则输出最大连通块的入口和大小
            for (int i = 0; i < ans[0].size(); i++) {
                cout << ans[0][i] << " ";
            }
            cout << endl;
        } else { // 否则只输出最大连通块的大小
            cout << ans[0][2] << endl;
        }
    
        return 0;
    }
    

#### 文章目录

  *     *       * 题目描述
      * 输入描述
      * 输出描述
      * 用例
      * 题目解析
      * 代码思路
      * C++

![doutub_gif](https://i-blog.csdnimg.cn/blog_migrate/e9413fcd109f2f3d7297192eab0c0b2a.gif)

