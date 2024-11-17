#### 题目描述

公元2919年，人类终于发现了一颗宜居星球——X星。  
现想在X星一片连绵起伏的山脉间建一个天热蓄水库，如何选取水库边界，使蓄水量最大？

要求：

  * 山脉用正整数数组s表示，每个元素代表山脉的高度。
  * 选取山脉上两个点作为蓄水库的边界，则边界内的区域可以蓄水，蓄水量需排除山脉占用的空间
  * 蓄水量的高度为两边界的最小值。
  * 如果出现多个满足条件的边界，应选取距离最近的一组边界。

输出边界下标（从0开始）和最大蓄水量；如果无法蓄水，则返回0，此时不返回边界。  
例如，当山脉为s=[3,1,2]时，则选取s[0]和s[2]作为水库边界，则蓄水量为1，此时输出：0 2:1  
当山脉s=[3,2,1]时，不存在合理的边界，此时输出：0。

#### 输入描述

一行正整数，用空格隔开，例如输入

> 1 2 3

表示s=[1,2,3]

#### 输出描述

当存在合理的水库边界时，输出左边界、空格、右边界、英文冒号、蓄水量；例如

> 0 2:1

当不存在合理的书库边界时，输出0；例如

> 0

#### 备注

  * 1 ≤ length(s) ≤ 10000
  * 0 ≤ s[i] ≤ 10000

#### 用例

输入| 1 9 6 2 5 4 9 3 7  
---|---  
输出| 1 6:19  
说明| 经过分析，选取s[1]和s[6]，水库蓄水量为19（3+7+4+5）  
输入| 1 8 6 2 5 4 8 3 7  
---|---  
输出| 1 6:15  
说明| 经过分析，选取s[1]和s[8]时，水库蓄水量为15；同样选取s[1]和s[6]时，水库蓄水量也为15。由于后者下标距离小（为5），故应选取后者。  
  
#### C++

    
    
    #include <iostream>
    #include <vector>
    #include <sstream>
    #include <algorithm>
    using namespace std;
    int main() {
        string input;
        getline(cin, input);
        istringstream iss(input);
        vector<int> heights;
        int height;
    
        while (iss >> height) {
            heights.push_back(height);
        }
    
        int maxWater = 0;
        int leftIndex = 0;
        int rightIndex = 0;
    
        for (size_t i = 0; i < heights.size(); i++) {
            for (size_t j = i + 1; j < heights.size(); j++) {
                int minHeight = min(heights[i], heights[j]);
                int water = minHeight * (j - i - 1);
                for (size_t k = i + 1; k < j; k++) {
                    water -= min(heights[k], minHeight);
                }
                if (water > maxWater) {
                    maxWater = water;
                    leftIndex = i;
                    rightIndex = j;
                }
            }
        }
    
        if (maxWater == 0) {
            cout << "0" << endl;
        } else {
            cout << leftIndex << " " << rightIndex << ":" << maxWater << endl;
        }
    
        return 0;
    }
    
    

#### 文章目录

  *     *       * 题目描述
      * 输入描述
      * 输出描述
      * 备注
      * 用例
      * C++

![fengmian](https://img-
blog.csdnimg.cn/img_convert/1d2f33ed8cf2fb1b9a4fe09513f7aa94.png)

