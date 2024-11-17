#### 题目描述

给一块n*m的地块，相当于n*m的二维数组，每个元素的值表示这个小地块的发电量；

求在这块地上建立正方形的边长为c的发电站，发电量满足目标电量k的地块数量。

#### 输入描述

第一行为四个按空格分隔的正整数，分别表示n, m , c k

后面n行整数，表示每个地块的发电量

#### 输出描述

输出满足条件的地块数量

#### 用例

输入| 2 5 2 6  
1 3 4 5 8  
2 3 6 7 1  
---|---  
输出| 4  
说明| 无  
  
#### 题目解析

本题可以使用[动态规划](https://so.csdn.net/so/search?q=%E5%8A%A8%E6%80%81%E8%A7%84%E5%88%92&spm=1001.2101.3001.7020)前缀和思想解题。

解题思路如下：

首先，将每一行在水平方向上选取c个相邻地块进行发电量合并，用例中是2块相邻的地合并

![image-20230305111354484](https://i-blog.csdnimg.cn/blog_migrate/43e6e3eaa96d54b65fbd8924437968e9.png)

行合并完后，接下来对列进行合并

![image-20230305111520836](https://i-blog.csdnimg.cn/blog_migrate/48cad2abf74ff2ab0eef0d75b2021435.png)

这样的话，最终得到【9，16，22，21】

其中9，起始就是下图中绿色部分，是一个c*c的区域，9是这个区域的发电量总和。其他的16，22，21也同理。

![image-20230305111558836](https://i-blog.csdnimg.cn/blog_migrate/4eb6d2d4287771051c5dc62d9ed256d5.png)

因此，9，16，22，21每一个都是符合要求发电站发电量>6的区域，因此结果输出4个

#### 代码思路

这段代码的解题思路如下：

  1. 读入地块的行数、列数、正方形边长和目标电量。

  2. 定义地块矩阵，并输入地块发电量。

  3. 定义前缀和矩阵，用于快速计算正方形内地块的发电量总和。

  4. 初始化前缀和矩阵的第一行和第一列为0。

  5. 计算前缀和矩阵。

  6. 统计满足条件的地块数量，具体方法是通过遍历每个正方形的右下角坐标，计算正方形内地块的发电量总和，判断是否大于等于目标电量。

  7. 输出满足条件的地块数量。

其中，前缀和矩阵的计算可以使用动态规划的思想，时间复杂度为O(nm)，统计满足条件的地块数量的时间复杂度为O(nm)，因此整个算法的时间复杂度为O(nm)。

#### C++

    
    
    #include <iostream>
    using namespace std;
    
    int main() {
        // 输入地块的行数、列数、正方形边长和目标电量
        int numRows, numCols, squareSideLen, targetPower;
        cin >> numRows >> numCols >> squareSideLen >> targetPower;
    
        // 定义地块矩阵
        int field[numRows][numCols];
    
        // 输入地块发电量
        for (int i = 0; i < numRows; i++) {
            for (int j = 0; j < numCols; j++) {
                cin >> field[i][j];
            }
        }
    
        // 定义前缀和矩阵，用于快速计算正方形内地块的发电量总和
        int preSum[numRows + 1][numCols + 1];
    
        // 初始化前缀和矩阵的第一行和第一列为0
        for (int i = 0; i <= numRows; i++) {
            preSum[i][0] = 0;
        }
    
        for (int j = 0; j <= numCols; j++) {
            preSum[0][j] = 0;
        }
    
        // 计算前缀和矩阵
        for (int i = 1; i <= numRows; i++) {
            for (int j = 1; j <= numCols; j++) {
                preSum[i][j] = preSum[i - 1][j] + preSum[i][j - 1] - preSum[i - 1][j - 1] + field[i - 1][j - 1];
            }
        }
    
        // 统计满足条件的地块数量
        int count = 0;
    
        for (int i = squareSideLen; i <= numRows; i++) {
            for (int j = squareSideLen; j <= numCols; j++) {
                // 计算正方形内地块的发电量总和
                int sum = preSum[i][j] - (preSum[i - squareSideLen][j] + preSum[i][j - squareSideLen]) + preSum[i - squareSideLen][j - squareSideLen];
                if (sum >= targetPower) {
                    count++;
                }
            }
        }
    
        // 输出满足条件的地块数量
        cout << count << endl;
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

