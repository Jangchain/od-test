#### 题目描述

给定一个可存储若干单词的字典，找出指定单词的所有相似单词，并且按照单词名称从小到大排序输出。

单词仅包括字母，但可能大小写并存（大写不一定只出现在首字母）。

相似单词说明：给定一个单词X，如果通过任意交换单词中字母的位置得到不同的单词Y，那么定义Y是X的相似单词，如abc、bca即为相似单词（大小写是不同的字母，如a和A算两个不同字母）。

[字典序排序](https://so.csdn.net/so/search?q=%E5%AD%97%E5%85%B8%E5%BA%8F%E6%8E%92%E5%BA%8F&spm=1001.2101.3001.7020)：
大写字母<小写字母。同样大小写的字母，遵循26字母顺序大小关系。

即_A<B<C<…<X<Y<Z<a<b<c<…<x<y<z_. 如_Bac<aBc<acB<cBa_.

#### 输入描述

第一行为给定的单词个数N（N为非负整数）

从第二行到地N+1行是具体的单词（每行一个单词）

最后一行是指定的待检测单词（用于检测上面给定的单词中哪些是与该指定单词是相似单词，该单词可以不是上面给定的单词）

#### 输出描述

从给定的单词组中，找出指定单词的相似单词，并且按照从小到大[字典序](https://so.csdn.net/so/search?q=%E5%AD%97%E5%85%B8%E5%BA%8F&spm=1001.2101.3001.7020)排列输出，中间以空格隔开

如果不存在，则输出null（字符串null）

#### 用例

输入| 4  
abc  
dasd  
tad  
bca  
abc  
---|---  
输出| abc bca  
说明| 在给定的输入种，与abc是兄弟单词的是abc bca，且输出按照字典序大小排序，输出的所有单词以空格隔开  
输入| 4  
abc  
dasd  
tad  
bca  
abd  
---|---  
输出| null  
说明| 给定的单词组中，没有与给定单词abd是兄弟单词，输出为null（字符串null）  
  
#### 题目解析

写一个循环，对两个[字符串排序](https://so.csdn.net/so/search?q=%E5%AD%97%E7%AC%A6%E4%B8%B2%E6%8E%92%E5%BA%8F&spm=1001.2101.3001.7020)，然后比较即可

#### 代码思路

这段代码的思路是：先对每个单词进行字典序排序，然后将待检测的单词也进行字典序排序，最后逐个比较每个单词和待检测单词的字典序是否相同，如果相同则将该单词加入到相似单词的列表中。最后将相似单词列表按照字典序从小到大排序输出即可。

#### C++

    
    
    #include <iostream>
    #include <vector>
    #include <algorithm>
    using namespace std;
    
    int main() {
        int n;
        cin >> n;
    
        // 存储所有单词
        vector<string> words;
        for (int i = 0; i < n; i++) {
            string word;
            cin >> word;
            words.push_back(word);
        }
    
        string target;
        cin >> target;
    
        vector<string> similarWords;
        for (int i = 0; i < words.size(); i++) {
            string word = words[i];
            sort(word.begin(), word.end());
            sort(target.begin(), target.end());
            if (word == target) {
                similarWords.push_back(words[i]);
            }
        }
    
        sort(similarWords.begin(), similarWords.end());
    
        if (!similarWords.empty()) {
            for (int i = 0; i < similarWords.size(); i++) {
                cout << similarWords[i] << " ";
            }
            cout << endl;
        } else {
            cout << "null" << endl;
        }
    
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

