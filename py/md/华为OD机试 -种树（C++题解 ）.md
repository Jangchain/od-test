#### 题目描述

小明在直线的公路上种树，现在给定可以种树的坑位的数量和位置，以及需要种多少棵树苗，问树苗之间的最小间距是多少时，可以保证种的最均匀（两棵树苗之间的最小间距最大）？

#### 输入描述

输入三行：

  * 第一行：坑位的数量
  * 第二行：坑位的位置
  * 第三行：需要种植树苗的数量

#### 输出描述

树苗之间的最小间距

#### 用例

输入| 7  
1 3 6 7 8 11 13  
3  
---|---  
输出| 6  
说明| 3棵树苗分别种植在1，7，13位置的坑位时，树苗种植的最均匀，最小间距为6  
  
#### C++

    
    
    #include<iostream>
    #include<vector>
    #include<algorithm>
    using namespace std;
    
    // 计算最小间距
    int calcMinDistance(vector<int>& positions, int target) {
        // 将坑位位置排序
        sort(positions.begin(), positions.end());
        // 初始化左右边界和最小间距
        int left = 1, right = positions.back() - positions[0], ans = -1;
        // 二分查找
        while (left <= right) {
            int mid = (left + right) / 2;
            int pre = positions[0], cnt = 1;
            // 遍历坑位位置，计算当前间距下最多可以种多少棵树苗
            for (int i = 1; i < positions.size(); ++i) {
                if (positions[i] - pre >= mid) {
                    pre = positions[i];
                    cnt += 1;
                }
            }
            // 如果可以种的树苗数量大于等于目标数量，则更新最小间距并调整左边界
            if (cnt >= target) {
                ans = mid;
                left = mid + 1;
            } else {
                // 否则调整右边界
                right = mid - 1;
            }
        }
        return ans;
    }
    
    int main() {
        int n;
        cin >> n;
    
        vector<int> positions;
        // 读入坑位位置
        for (int i = 0; i < n; i++) {
            int a;
            cin >> a;
            positions.push_back(a);
        }
        int target;
        cin >> target; // 读入需要种植的树苗数量
    
        cout << calcMinDistance(positions, target); // 输出最小间距
        return 0;
    }
    
    

#### 文章目录

  *     *       * 题目描述
      * 输入描述
      * 输出描述
      * 用例
      * C++

![fengmian](https://img-
blog.csdnimg.cn/img_convert/1d2f33ed8cf2fb1b9a4fe09513f7aa94.png)

