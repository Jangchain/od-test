#### 题目描述

[九宫格](https://so.csdn.net/so/search?q=%E4%B9%9D%E5%AE%AB%E6%A0%BC&spm=1001.2101.3001.7020)是一款广为流传的游戏，起源于河图洛书。  
游戏规则是：1到9九个数字放在3×3的格子中，要求每行、每列以及两个对角线上的三数之和都等于15.  
在金麻名著《射雕英雄传》中黃蓉曾给九宫格的一种解法，口诀：戴九恩一，左三右七，二四有肩，八六为足，五居中央。解法如图所示。

4| 9| 2  
---|---|---  
3| 5| 7  
8| 1| 6  
  
现在有一种新的玩法，给九个不同的数字，将这九个数字放在3×3的格子中，要求每行、每列以及两个对角线上的三数之积相等（三阶积[幻方](https://so.csdn.net/so/search?q=%E5%B9%BB%E6%96%B9&spm=1001.2101.3001.7020)）。其中一个三阶幻方如图：

2| 9| 12  
---|---|---  
36| 6| 1  
3| 4| 18  
解释：每行、每列以及两个对角线上的三数之积相等，都为216。请设计一种算法，将给定的九个数宇重新排列后，使其满足三阶积幻方的要求。
排列后的九个数宇中：第1-3个数字为方格的第一行，第4-6个数宇为方格的第二行，第7-9个数字为方格的第三行。

#### 输入描述

九个不同的数宇，每个数字之间用空格分开。  
0＜数字<10^7。0<排列后满足要求的每行、每列以及两个对角线上的三数之积 ＜ 2^31-1。

#### 输出描述

九个数字所有满足要求的排列，每个数字之间用空格分开。每行输出一个满足要求的排列。  
要求输出的排列升序排序，即：对于排列A
(A1.A2.A3…A9)和排列B(B1,B2,B3…B9），从排列的第1个数字开始，遇到Ai<[Bi](https://so.csdn.net/so/search?q=Bi&spm=1001.2101.3001.7020)，则排列A<排列B
（1<=j<=9)。

说明：用例保证至少有一种排列组合满足条件。

#### 用例

输入| 75 36 10 4 30 225 90 25 12  
---|---  
输出| 10 36 75 225 30 4 12 25 90  
10 225 12 36 30 25 75 4 90  
12 25 90 225 30 4 10 36 75  
12 225 10 25 30 36 90 4 75  
75 4 90 36 30 25 10 225 12  
75 36 10 4 30 225 90 25 12  
90 4 75 25 30 36 12 225 10  
90 25 12 4 30 225 75 36 10  
说明| 无  
  
#### 题目解析

简单的全排列问题。

关于全排列的入门，可以看[组合与排列的区别，回溯算法求解的时候，有何不同？|
LeetCode：46.全排列_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV19v4y1S79W/?spm_id_from=333.999.0.0&vd_source=b5105a99a0628dd906e154263279c518
"组合与排列的区别，回溯算法求解的时候，有何不同？| LeetCode：46.全排列_哔哩哔哩_bilibili")

#### C++

    
    
    #include<iostream>
    #include<vector>
    #include<stdlib.h>
    #include<algorithm>
    #include<string.h>
    #include<map>
    #include<cmath>
    
    using namespace std;
    
    // 将字符串转换为整数数组
    vector<int> split(string input_str) {
        vector<int> nums;
        while (input_str.find(" ") != string::npos) {
            int found = input_str.find(" ");
            nums.push_back(stoi(input_str.substr(0, found)));
            input_str = input_str.substr(found + 1);
        }    
        nums.push_back(stoi(input_str));
        return nums;
    }
    
    // 保存结果
    vector<vector<int>> result;
    
    // 检查是否符合要求
    bool check(vector<int> nums) {
        int fixed_result = nums[0] * nums[1] * nums[2];
        // 每行
        if (fixed_result != nums[3] * nums[4] * nums[5] || fixed_result != nums[6] * nums[7] * nums[8]) {
            return false;
        } 
    
        // 每列
        if (fixed_result != nums[0] * nums[3] * nums[6] || 
            fixed_result != nums[1] * nums[4] * nums[7] ||
            fixed_result != nums[2] * nums[5] * nums[8]) {
            return false;
        } 
    
        // 对角线
        if (fixed_result != nums[0] * nums[4] * nums[8] || fixed_result != nums[2] * nums[4] * nums[6]) {
            return false;
        }
    
        return true;
    }
    
    // 交换数组中的两个元素
    void swap(vector<int> &nums, int k, int i) {
        int t = nums[k];
        nums[k] = nums[i];
        nums[i] = t;
    }
    
    // 递归实现全排列
    void permutation(vector<int> &nums, int i, int j) {
        if(i == j) { // 递归结束条件
            if (check(nums)) { // 检查是否符合要求
                result.push_back(nums); // 将符合要求的结果保存起来
            }
        } else {
            for(int k = i; k <= j; k++) {
                swap(nums, i, k); // 交换第一个i=k，即交换1和他自己；对后面的数字进行递归
                permutation(nums, i + 1, j); // 递归
                swap(nums, i, k); // 再交换回来，进行下一次交换
            }
        }
    }
    
    int main() {
        // 处理输入
        string input_str;
        getline(cin, input_str);
        vector<int> nums = split(input_str);
    
        // 全排列核心思想就是每个数字逐个与后面的数字进行交换
        permutation(nums, 0, 8);
    
        // 排序
        sort(result.begin(), result.end(), [](vector<int> a, vector<int> b){
            for (int i = 0; i < 9; i++) {
                if (a[i] != b[i]) {
                    return a[i] < b[i];
                } 
            }
        });
    
        // 输出
        for (vector<int> single_res : result) {
            for (int i = 0; i < 9; i++) {
                cout << single_res[i];
                if (i != 8) {
                    cout << " ";
                }
            }
            cout << endl;
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

