#### 题目描述

对称就是最大的美学，现有一道关于对称字符串的美学。已知：

  * 第1个字符串：R
  * 第2个字符串：BR
  * 第3个字符串：RBBR
  * 第4个字符串：BRRBRBBR
  * 第5个字符串：RBBRBRRBBRRBRBBR

相信你已经发现规律了，没错！就是第 i 个字符串 = 第 i - 1 号字符串取反 + 第 i - 1 号字符串；

取反（R->B, B->R）;

现在告诉你n和k，让你求得第n个字符串的第k个字符是多少。（k的编号从0开始）

#### 输入描述

第一行输入一个T，表示有T组用例；

解析来输入T行，每行输入两个数字，表示n，k

  * 1 ≤ T ≤ 100；
  * 1 ≤ n ≤ 64；
  * 0 ≤ k ＜ 2^(n-1)；

#### 输出描述

输出T行表示答案；

输出 “blue” 表示字符是B；

输出 “red” 表示字符是R。

备注：输出字符串区分大小写，请注意输出小写字符串，不带双引号。

#### 用例

输入| 5  
1 0  
2 1  
3 2  
4 6  
5 8  
---|---  
输出| `red`  
`red`  
`blue`  
`blue`  
`blue`  
说明| 第 1 个字符串：R -> 第 0 个字符为R  
第 2 个字符串：BR -> 第 1 个字符为R  
第 3 个字符串：RBBR -> 第 2 个字符为B  
第 4 个字符串：BRRBRBBR -> 第 6 个字符为B  
第 5 个字符串：RBBRBRRBBRRBRBBR -> 第 8 个字符为B  
输入| 1  
64 73709551616  
---|---  
输出| red  
说明| 无  
  
#### 题目解析

看不懂题目？没关系。我们先把题目中的字符串画出来。根据题目红色的是R.蓝色的是B

![image-20230307133934938](https://i-blog.csdnimg.cn/blog_migrate/3870179a712ea08b3425ebcb4d1bb930.png)

仔细观察表格你会看到：

第5个字符串的后半部分，和第4个字符串完全相同；

第4个字符串的后半部分，和第3个字符串完全相同；

第3个字符串的后半部分，和第2个字符串完全相同；

第2个字符串的后半部分，和第1个字符串完全相同；

当前字符串与前一个字符串存在依赖关系，明显跟递归有关系了啊！

在仔细观察，你会发现每个字符串的前半部分，与前一个字符串的颜色正好相反。

#### C++

    
    
    #include<iostream>
    #include<vector>
    using namespace std;
    
    // 递归函数，找到第n个字符串的第k个字符
    char find(long n, long k) {
        // 第1个字符串
        if (n == 1) {
            return 'R';
        }
        // 第2个字符串
        if (n == 2) {
            if (k == 0) return 'B'; // 如果k为0，则返回B
            else return 'R'; // 否则返回R
        }
     
        long len = 1L << (n-2); // 计算字符串长度
        // 如果 k 在后半段，则与前一个字符串相同
        if (k >= len) {
            long pos = k - len; // 计算在前一个字符串中的位置
            return find(n - 1, pos); // 递归求解前一个字符串中的字符
        } else {
            // 如果 k 在前半段，则与前一个字符串相反
            return find(n - 1, k) == 'R' ? 'B' : 'R'; // 递归求解前一个字符串中的字符，并根据结果返回相反的字符
        }
    }
     
     
    int main()
    {
        int t;
        cin >> t;
        vector<vector<long>> input_case;
        // 读入所有测试用例
        for (int i=0;i<t;i++) {
            long n, k;
            cin >> n >> k;
            vector<long> single_case = {n, k};
            input_case.push_back(single_case);
        }
     
        // 对每个测试用例进行求解
        for (int i = 0; i < t; i++) {
            long n = input_case[i][0];
            long k = input_case[i][1];
            string res = find(n, k) == 'R' ? "red" : "blue"; // 根据求解结果判断是红色还是蓝色
            cout << res << endl; // 输出结果
        }
        
        return 0;
    }
    

#### 文章目录

  *     *       * 题目描述
      * 输入描述
      * 输出描述
      * 用例
      * 题目解析
      * C++

![fengmian](https://img-
blog.csdnimg.cn/img_convert/1d2f33ed8cf2fb1b9a4fe09513f7aa94.png)

