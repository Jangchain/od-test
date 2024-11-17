## 题目描述

给你一个整数数组nums，请计算数组的中心位置，数组的中心位置是数组的一个下标，其左侧所有元素相乘的积等于右侧所有元素相乘的积。数组第一个元素的左侧积为1，最后一个元素的右侧积为1。

如果数组有多个中心位置，应该返回最靠近左边的那一个，如果数组不存在中心位置，返回**-1**。

## 输入描述

输入只有一行，给出N个正整数用空格分隔：nums = 2 5 3 6 5 6

1 <= nums.length <= 1024

1 <= nums[i] <= 10

## 输出描述

输出：3

解释：中心位置是3

## 用例

输入 2 5 3 6 5 6  
输出 3  
说明 无

## 题目解析

题目挺简单的，不过需要注意数据类型的范围。

## 代码思路

这道题的解题思路是先计算整个数组的乘积，然后从第二个数开始遍历数组，每次更新左右乘积，并判断左右乘积是否相等。如果左右乘积相等，说明当前数为中心位置，返回下标。如果遍历完整个数组都没有找到中心位置，返回-1。

## C++

    
    
    #include <iostream>
    #include <vector>
    #include <string>
    #include <sstream>
    #include <algorithm>
    #include <numeric>
    #include <iterator>
    using namespace std;
    int main() {
        string input;
        getline(cin, input);
    
        istringstream iss(input);
        vector<string> inputArr(istream_iterator<string>{iss}, istream_iterator<string>());
    
        int length = inputArr.size();
    
        vector<long long> nums(length);
        transform(inputArr.begin(), inputArr.end(), nums.begin(), [](const string& s) { return stoll(s); });
    
        long long leftProduct = 1;
        long long rightProduct = accumulate(nums.begin(), nums.end(), 1LL, multiplies<long long>());
    
        bool foundCenter = false;
    
        for (int i = 0; i < length; i++) {
            if (i != 0) {
                leftProduct *= nums[i - 1];
            }
    
            rightProduct /= nums[i];
    
            if (leftProduct == rightProduct) {
                cout << i << endl;
                foundCenter = true;
                break;
            }
        }
    
        if (!foundCenter) {
            cout << -1 << endl;
        }
    
        return 0;
    }
    
    

#### 文章目录

  * 题目描述
  * 输入描述
  * 输出描述
  * 用例
  * 题目解析
  * 代码思路
  * C++

![fengmian](https://img-
blog.csdnimg.cn/img_convert/1d2f33ed8cf2fb1b9a4fe09513f7aa94.png)

