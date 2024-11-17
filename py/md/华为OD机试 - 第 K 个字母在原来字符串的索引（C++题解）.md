#### 题目描述

给定一个字符串，把字符串按照大写在前小写在后排序，输出排好后的第 K 个字母在原来字符串的索引。

相同字母输出第一个出现的位置。

#### 输入描述

无

#### 输出描述

无

#### 用例

输入| hAkDAjByBq 4  
---|---  
输出| 6  
说明| 排好序后 AABBDhjkqy，第 4 个是 B，第一个出现的在原字符串 6 这个位置。（注：索引是从 0 开始）  
  
#### C++

    
    
    #include <iostream>
    #include <algorithm>
    #include <vector>
    
    using namespace std;
    
    int main() {
        string str;
        int k;
        cin >> str >> k; // 输入字符串和第k个字母
        vector<char> strArr(str.begin(), str.end()); // 将字符串转换为字符数组
        sort(strArr.begin(), strArr.end()); // 对字符数组进行排序
        char target = strArr[k - 1]; // 获取排序后的第k个字母
        cout << str.find(target) << endl; // 输出第一个出现的位置
        return 0;
    }
    
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

#### 完整用例

##### 用例1

ABCDWXYZ 3

##### 用例2

abcdwxyz 3

##### 用例3

aBcDwXyZ 4

##### 用例4

AaBbCcDd 5

##### 用例5

1a@B#2c$D%3 6

##### 用例6

A 1

##### 用例7

aBcDwXyZ 8

##### 用例8

aBcDwXyZ 1

##### 用例9

AaAaAaAa 4

##### 用例10

aBcDeFaBcDeF 2

