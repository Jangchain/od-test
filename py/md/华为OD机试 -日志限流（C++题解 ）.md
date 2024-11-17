#### 题目描述

某软件系统会在运行过程中持续产生日志，系统每天运行N单位时间，运行期间每单位时间产生的日志条数保行在数组records中。records[i]表示第i单位时间内产生日志条数。  
由于系统磁盘空间限制，每天可记录保存的日志总数上限为total条。  
如果一天产生的日志总条数大于total，则需要对当天内每单位时间产生的日志条数进行限流后保存，请计算每单位时间最大可保存日志条数limit，以确保当天保存的总日志条数不超过total。  
对于单位时间内产生日志条数不超过limit的日志全部记录保存;  
对于单位时间内产生日志条数超过limit的日志，则只记录保存limit条日志；  
如果一天产生的日志条数总和小于等于total，则不需要启动限流机制．result为-1。  
请返回result的最大值或者-1。

#### 输入描述

第一行为系统某一天运行的单位时间数N,1<=N<=10^5  
第二行为表示这一天每单位时间产生的日志数量的数组records[]，0 <= records[i] <= 10^5  
第三行为系统一天可以保存的总日志条数total。1 <= total <= 10^9

#### 输出描述

每单位时间内最大可保存的日志条数limit，如果不需要启动限流机制，返回-1。

#### 用例

输入| 6  
3 3 8 7 10 15  
40  
---|---  
输出| 9  
说明| 无  
  
#### C++

    
    
    #include <iostream>
    #include <vector>
    #include <algorithm>
    #include <numeric>
    
    using namespace std;
    
    int main() {
        int n;
        cin >> n;
    
        vector<int> logs(n);
        for (int i = 0; i < n; i++) {
            cin >> logs[i];
        }
    
        int total;
        cin >> total;
    
        int sum = accumulate(logs.begin(), logs.end(), 0);
    
        if (sum <= total) {
            cout << -1 << endl;
        } else {
            int maxLimit = *max_element(logs.begin(), logs.end());
            int minLimit = 0;
    
            while (maxLimit - minLimit > 1) {
                int limit = (maxLimit + minLimit) / 2;
    
                int tmp = 0;
                for (int log : logs) {
                    tmp += min(log, limit);
                }
    
                if (tmp > total) {
                    maxLimit = limit;
                } else {
                    minLimit = limit;
                }
            }
    
            cout << minLimit << endl;
        }
    
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

