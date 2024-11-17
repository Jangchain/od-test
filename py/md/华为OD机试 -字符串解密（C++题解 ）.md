#### 题目描述

给定两个字符串string1和string2。  
string1是一个被加扰的字符串。

string1由小写英文字母（’a’’z’）和数字字符（’0’’9’）组成，而加扰字符串由’0’’9’、’a’’f’组成。

string1里面可能包含0个或多个加扰子串，剩下可能有0个或多个有效子串，这些有效子串被加扰子串隔开。

string2是一个参考字符串，仅由小写英文字母（’a’~’z’）组成。

你需要在string1字符串里找到一个有效子串，这个有效子串要同时满足下面两个条件：

（1）这个有效子串里不同字母的数量不超过且最接近于string2里不同字母的数量，即小于或等于string2里不同字母的数量的同时且最大。

（2）这个有效子串是满足条件（1）里的所有子串（如果有多个的话）里字典序最大的一个。

如果没有找到合适条件的子串的话，请输出”Not Found”

#### 输入描述

input_string1  
input_string2

#### 输出描述

output_string

#### 用例

输入| 123admyffc79pt  
ssyy  
---|---  
输出| pt  
说明|
将输入字符串1里的加扰子串“123ad”、“ffc79”去除后得到有效子串序列："my"、"pt"，其中"my"里不同字母的数量为2（有‘m’和'y'两个不同字母），“pt”里不同字母的数量为2（有'p'和't'两个不同字母）；输入字符串2里不同字母的数量为2（有‘s’和'y'两个不同字母）。可得到最终输出结果为“pt”，其不同字母的数量最接近与“ssyy”里不同字母的数量的同时字典序最大。  
输入| 123admyffc79ptaagghi2222smeersst88mnrt  
ssyyfgh  
---|---  
输出| mnrt  
说明|
将输入字符串1里的加扰子串“123ad”、“ffc79”、"aa"、"2222"、"ee"、"88"去除后得到有效子串序列：“my”、“pt”、“gghi”、"sm"、“rsst”、"mnrt"；输入字符串2里不同字母的数量为5（有's'、'y'、'f'、'g'、'h'5个不同字母）。可得到最终输出结果为“mnrt”，其不同字母的数量（为4）最接近于“ssyyfgh”里不同字母的数量，其他有效子串不同字母的数量都小于“mnrt”。  
输入| abcmnq  
rt  
---|---  
输出| Not Found  
说明|
将输入字符串1里的加扰子串“abc”去除后得到有效子串序列：“mnq”；输入字符串2里不同字母的数量为2（有'r'、't'两个不同的字母）。可得到最终的输出结果为“Not
Found”，没有符合要求的有效子串，因有效子串里的不同字母的数量（为3），大于输入字符串2里的不同字母的数量。  
  
#### 代码思路

  1. 读入输入字符串inputString1和inputString2，以及用于匹配加扰子串的正则表达式regex=“[0-9a-f]+”
  2. 将inputString1按照正则表达式regex进行分割，得到一个字符串数组validSubstrings，其中每个元素为一个有效子串或一个加扰子串
  3. 对每个有效子串进行筛选，只保留不为空且不同字母数量小于等于inputString2不同字母数量的子串，得到一个新的字符串数组filteredSubstrings
  4. 如果filteredSubstrings为空，则输出"Not Found"，否则继续执行
  5. 对filteredSubstrings进行排序，排序规则如下：  
a. 按照子串中不同字母的数量从大到小排序  
b. 如果不同字母的数量相同，则按照字典序从大到小排序

  6. 输出排序后的filteredSubstrings数组的第一个元素，即为符合条件的子串

#### C++

    
    
    #include <iostream>
    #include <string>
    #include <regex>
    #include <algorithm>
    #include <unordered_set>
    
    using namespace std;
    
    // 获取字符串中不同字符的数量
    int getDistinctCount(string str) {
        unordered_set<char> charSet;
        for (char c : str) {
            charSet.insert(c);
        }
        return charSet.size();
    }
    
    int main() {
        string inputString1, inputString2;
        cin >> inputString1 >> inputString2;
    
        // 定义加扰子串的正则表达式
        string regexStr = "[0-9a-f]+";
        regex pattern(regexStr);
    
        // 使用正则表达式将字符串1分割成有效子串
        vector<string> validSubstrings(sregex_token_iterator(inputString1.begin(), inputString1.end(), pattern, -1), sregex_token_iterator());
    
        // 获取字符串2中不同字符的数量
        int count = getDistinctCount(inputString2);
    
        vector<string> ans;
        // 遍历有效子串，找到符合条件的子串
        for (string validSubstring : validSubstrings) {
            if (!validSubstring.empty() && getDistinctCount(validSubstring) <= count) {
                ans.push_back(validSubstring);
            }
        }
    
        if (ans.empty()) {
            cout << "Not Found" << endl;
            return 0;
        }
    
        // 对符合条件的子串进行排序，按照不同字符的数量和字典序的顺序排序
        sort(ans.begin(), ans.end(), [](string a, string b) {
            int c1 = getDistinctCount(a);
            int c2 = getDistinctCount(b);
            return c1 != c2 ? c2 - c1 : b.compare(a);
        });
    
        cout << ans[0] << endl;
    
        return 0;
    }
    
    

#### 文章目录

  *     *       * 题目描述
      * 输入描述
      * 输出描述
      * 用例
      * 代码思路
      * C++

![fengmian](https://img-
blog.csdnimg.cn/img_convert/1d2f33ed8cf2fb1b9a4fe09513f7aa94.png)

