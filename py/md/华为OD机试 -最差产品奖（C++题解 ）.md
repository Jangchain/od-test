#### 题目描述

A公司准备对他下面的N个产品评选最差奖，  
评选的方式是首先对每个产品进行评分，然后根据评分区间计算相邻几个产品中最差的产品。  
评选的标准是依次找到从当前产品开始前M个产品中最差的产品，请给出最差产品的评分序列。

#### 输入描述

第一行，数字M，表示评分区间的长度，取值范围是0<M<10000  
第二行，产品的评分序列，比如[12,3,8,6,5]，产品数量N范围是-10000 < N <10000

#### 输出描述

评分区间内最差产品的评分序列

#### 用例

输入| 3  
12,3,8,6,5  
---|---  
输出| 3,3,5  
说明| 12,3,8 最差的是33,8,6 最差的是38,6,5 最差的是5  
  
#### 题目解析

两种做法：

  * 滑动窗口

  * 暴力解法

#### 代码思路

这道题目的解题思路如下：

  1. 首先输入评分区间长度和产品评分序列；
  2. 遍历产品评分序列，对于每个区间，找到其中的最小值，将其存储到最差评分序列中；
  3. 输出最差评分序列。

#### C++

    
    
    #include <iostream>
    #include <vector>
    #include <deque>
    #include <sstream>
    #include <string>
    
    using namespace std;
    
    int main() {
        // 输入评分区间长度
        int intervalLength;
        cin >> intervalLength;
        cin.ignore();
    
        // 输入产品评分序列
        vector<int> scores;
        string input;
        getline(cin, input);
        stringstream ss(input);
        string token;
        while (getline(ss, token, ',')) {
            scores.push_back(stoi(token));
        }
    
        vector<int> worstScores; // 存储最差评分序列
        deque<int> deque;
    
        for (int i = 0; i < scores.size(); i++) {
            // 移除不在当前区间的最小值
            if (!deque.empty() && deque.front() == i - intervalLength) {
                deque.pop_front();
            }
    
            // 移除队列中大于当前评分的元素
            while (!deque.empty() && scores[deque.back()] > scores[i]) {
                deque.pop_back();
            }
    
            deque.push_back(i);
    
            if (i >= intervalLength - 1) {
                worstScores.push_back(scores[deque.front()]);
            }
        }
    
        for (int i = 0; i < worstScores.size(); i++) {
            cout << worstScores[i];
            if (i != worstScores.size() - 1) {
                cout << ",";
            }
        }
    
        cout << endl; // 输出最差评分序列
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

![fengmian](https://img-
blog.csdnimg.cn/img_convert/1d2f33ed8cf2fb1b9a4fe09513f7aa94.png)

