#### 题目描述

给定a-z，26个英文字母小写字符串组成的字符串A和B，其中A可能存在重复字母，B不会存在重复字母，现从字符串A中按规则挑选一些字母可以组成字符串B。

挑选规则如下：

  * 同一个位置的字母只能挑选一次，
  * 被挑选字母的相对先后顺序不能被改变，
  * 求最多可以同时从A中挑选多少组能组成B的字符串。

#### 输入描述

输入为2行，第一行输入字符串a,第二行输入字符串b，行首行尾**没有多余空格**

#### 输出描述

输出一行，包含一个数字，表示最多可以同时从a中挑选多少组能组成b的字符串，行末没有多余空格

#### 用例

**示例一**  
输入

badc  
bac  
输出

1

**示例二**  
输入

badc  
abc

输出

0

**示例三**  
输入

bbadcac  
bac

输出

2

#### 题目解析

挑选的规则：

  * A中的字母只能挑选一次
  * 挑出来的字母不准变顺序

思路：

以B中的每个字符在A中去找，找到了就把A的这个字符设置一个标志不准用。然后再去找下一个。直到所有字符都可以找到。然后再进行下次。直到找不到满足条件的字符位置。

#### 代码思路

这道题是一道字符串匹配问题。首先需要记录字符串B中每个字符的位置，然后遍历字符串A，如果遇到字符串B中的字符，就更新能够匹配到该字符的数量。具体实现中，首先记录字符在字符串B中的位置，使用一个数组来记录能够匹配到字符串B中字符的数量。遍历字符串A时，如果遇到字符串B中的字符，就根据该字符在字符串B中的位置和前面的字符匹配情况来更新数组中的值。最后输出数组中最后一个值即可。

#### C++

    
    
    #include <iostream>
    #include <unordered_map>
    using namespace std;
    
    int main() {
        string strA, strB;
        cin >> strA >> strB;
    
        // 记录字符串B中每个字符的位置
        unordered_map<char, int> charIndex;
        for (int i = 0; i < strB.length(); i++) {
            charIndex[strB[i]] = i;
        }
    
        // 记录字符串A中能够匹配到字符串B中字符的数量
        int matchCount[strB.length()] = {0};
        for (int i = 0; i < strA.length(); i++) {
            char c = strA[i];
            if (charIndex.count(c)) { // 如果字符串B中存在字符c
                int index = charIndex[c]; // 获取字符c在字符串B中的位置
                if (index == 0 || matchCount[index] < matchCount[index - 1]) {
                    // 如果字符c在字符串B中的位置是0或者字符c前面的位置可以匹配到更多的字符
                    matchCount[index]++;
                }
            }
        }
    
        // 输出匹配到字符串B中所有字符的数量
        cout << matchCount[strB.length() - 1] << endl;
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

