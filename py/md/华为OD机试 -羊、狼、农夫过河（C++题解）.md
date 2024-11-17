#### 题目描述

羊、狼、农夫都在岸边，当羊的数量小于狼的数量时，狼会攻击羊，农夫则会损失羊。农夫有一艘容量固定的船，能够承载固定数量的动物。

要求求出不损失羊情况下将全部羊和狼运到对岸需要的最小次数。

只计算农夫去对岸的次数，回程时农夫不会运送羊和狼。

备注：农夫在或农夫离开后羊的数量大于狼的数量时狼不会攻击羊。

#### 输入描述

第一行输入为M，N，X， 分别代表羊的数量，狼的数量，小船的容量。

#### 输出描述

输出不损失羊情况下将全部羊和狼运到对岸需要的最小次数（若无法满足条件则输出0）。

#### 用例

输入| 5 3 3  
---|---  
输出| 3  
说明| 第一次运2只狼第二次运3只羊第三次运2只羊和1只狼  
输入| 5 4 1  
---|---  
输出| 0  
说明| 如果找不到不损失羊的运送方案，输出0  
  
#### 题目解析

首先需要明确几个边界条件：

第一，羊的数量不能少于狼的数量。

第二，农夫本身不占用船的容量。

第三，农夫回程时不会带上羊或狼。

本题通过暴力枚举可以解决;

  * 农夫离开后，本岸羊 > 本岸狼
  * 农夫离开后，对岸羊 > 对岸狼
  * 船上由于农夫始终在，因此羊、狼什么数量都可以，只要不超过船载量

#### 代码思路

这道题是一道典型的深度优先搜索的应用题。题目描述了一群人和动物需要过河，其中有一些限制条件，比如羊的数量小于狼的数量时，狼会攻击羊，农夫则会损失羊；农夫有一艘容量固定的船，能够承载固定数量的动物等等。我们需要求出不损失羊情况下将全部羊和狼运到对岸需要的最小次数。

解题思路：

  1. 首先需要明确一点：本题只需要考虑农夫去对岸的次数，回程时农夫不会运送羊和狼。

  2. 采用深度优先搜索的方式，每次搜索的过程中，需要考虑当前岸边的羊和狼的数量，以及对岸的羊和狼的数量，以及船的容量等等。

  3. 如果当前岸边的羊和狼的数量总和小于等于船的容量，则只需要一次过河，这时候记录当前步数并返回。

  4. 如果羊和狼都在对岸，则记录步数并返回。

  5. 如果羊的数量小于狼的数量，则跳过。

  6. 如果对岸的羊的数量小于对岸的狼的数量，则跳过。

  7. 如果对岸没有羊，但是对岸的狼的数量大于等于船的容量，则跳过。

  8. 进行下一步搜索，搜索过程中需要更新岸边和对岸的羊和狼的数量，以及船的容量等等。

  9. 最后统计所有记录的步数，取最小值即为不损失羊情况下将全部羊和狼运到对岸需要的最小次数。

#### C++

    
    
    #include <iostream>
    #include <vector>
    #include <algorithm>
    using namespace std;
    
    /**
     * 深度优先搜索
     * @param sheep 羊的数量
     * @param wolf 狼的数量
     * @param boat 船的容量
     * @param oppo_sheep 对岸的羊的数量
     * @param oppo_wolf 对岸的狼的数量
     * @param count 当前步数
     * @param ans 存储最小步数的数组
     */
    void dfs(int sheep, int wolf, int boat, int oppo_sheep, int oppo_wolf, int count, vector<int>& ans) {
        if (sheep == 0 && wolf == 0) { // 如果羊和狼都在对岸，则记录步数
            ans.push_back(count);
            return;
        }
        if (sheep + wolf <= boat) { // 如果羊和狼的数量总和小于等于船的容量，则只需要一次过河
            ans.push_back(count + 1);
            return;
        }
    
        for (int i = 0; i <= min(boat, sheep); i++) {
            for (int j = 0; j <= min(boat, wolf); j++) {
                if (i + j == 0) continue; // 如果没有动物上船，则跳过
                if (i + j > boat) break; // 如果上船的动物数量超过船的容量，则跳过
                if (sheep - i <= wolf - j && sheep - i != 0) continue; // 如果羊的数量小于狼的数量，则跳过
                if (oppo_sheep + i <= oppo_wolf + j && oppo_sheep + i != 0) break; // 如果对岸的羊的数量小于对岸的狼的数量，则跳过
                if (oppo_sheep + i == 0 && oppo_wolf + j >= boat) break; // 如果对岸没有羊，但是对岸的狼的数量大于等于船的容量，则跳过
                dfs(sheep - i, wolf - j, boat, oppo_sheep + i, oppo_wolf + j, count + 1, ans); // 进行下一步搜索
            }
        }
    }
    
    int main() {
        int sheep, wolf, boat;
        cin >> sheep >> wolf >> boat;
    
        vector<int> ans;
        dfs(sheep, wolf, boat, 0, 0, 0, ans);
    
        if (ans.size() > 0) {
            cout << *min_element(ans.begin(), ans.end()) << endl; 
        } else {
            cout << 0 << endl;
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

