#### 题目描述

小华和小薇一起通过玩积木游戏学习数学。  
他们有很多积木，每个积木块上都有一个数字，积木块上的数字可能相同。  
小华随机拿一些积木挨着排成一排，请小薇找到这排积木中数字相同且所处位置最远的2块积木块，计算他们的距离，小薇请你帮忙替她解决这个问题。

#### 输入描述

第一行输入为N，表示小华排成一排的积木总数。  
接下来N行每行一个数字，表示小华排成一排的积木上数字。

#### 输出描述

相同数字的积木的位置最远距离；如果所有积木数字都不相同，请返回-1。

#### 备注

  * 0<=积木上的数字<10^9
  * 1<=积木长度<=10^5

#### 用例

输入| 5  
1  
2  
3  
1  
4  
---|---  
输出| 3  
说明| 共有5个积木，第1个积木和第4个积木数字相同，其距离为3。  
输入| 2  
1  
2  
---|---  
输出| -1  
说明| 一共有两个积木，没有积木数字相同，返回-1。  
  
####

#### C++

    
    
    #include <iostream>
    #include <vector>
    #include <map>
    
    using namespace std;
    
    int main() {
        int n;
        cin >> n; // 输入小华排成一排的积木总数
    
        vector<int> nums;
        for (int i = 0; i < n; i++) {
            int num;
            cin >> num; // 输入小华排成一排的积木上数字
            nums.push_back(num);
        }
    
        map<int, int> numIdx; // 记录每个数字出现的最远位置
    
        int ans = -1;
        for (int i = 0; i < nums.size(); i++) {
            int num = nums[i];
            if (numIdx.count(num)) {
                ans = max(ans, i - numIdx[num]); // 更新最大距离
            } else {
                numIdx[num] = i;
            }
        }
    
        cout << ans << endl; // 输出相同数字的积木的位置最远距离；如果所有积木数字都不相同，请返回-1。
    
        return 0;
    }
    

#### 文章目录

  *     *       * 题目描述
      * 输入描述
      * 输出描述
      * 备注
      * 用例
      *       * C++

![fengmian](https://img-
blog.csdnimg.cn/img_convert/1d2f33ed8cf2fb1b9a4fe09513f7aa94.png)

