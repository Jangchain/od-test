#### 题目描述

给你一个整数M和数组N，N中的元素为连续整数，要求根据N中的元素组装成新的数组R，组装规则：

  1. R中元素总和加起来等于M
  2. R中的元素可以从N中重复选取
  3. R中的元素最多只能有1个不在N中，且比N中的数字都要小（不能为负数）

#### 输入描述

第一行输入是连续数组N，采用空格分隔  
第二行输入数字M

#### 输出描述

输出的是组装办法数量，int类型

#### 备注

  * 1 ≤ M ≤ 30
  * 1 ≤ N.length ≤ 1000

#### 用例

输入| 2  
5  
---|---  
输出| 1  
说明| 只有1种组装办法，就是[2,2,1]  
输入| 2 3  
5  
---|---  
输出| 2  
说明| 一共两种组装办法，分别是[2,2,1]，[2,3]  
  
#### C++

    
    
    #include <iostream>
    #include <vector>
    #include <sstream>
    #include <algorithm>
    using namespace std;
    int main() {
        string line;
        getline(cin, line);
        vector<int> arr;
        istringstream iss(line);
        int num;
        while (iss >> num) {
            arr.push_back(num);
        }
        int m;
        cin >> m;
    
        // 获取数组中的最小值
        int min_num = *min_element(arr.begin(), arr.end());
    
        // 动态规划
        vector<int> dp(m + 1, 0);
        dp[0] = 1;
        for (int num : arr) {
            for (int i = num; i <= m; i++) {
                dp[i] += dp[i - num];
            }
        }
    
        int count = dp[m];
        for (int i = 1; i < min_num; i++) {
            count += dp[m - i];
        }
    
        cout << count << endl;
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

