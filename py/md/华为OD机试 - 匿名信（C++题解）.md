#### 题目描述

电视剧《分界线》里面有一个片段，男主为了向警察透露案件细节，且不暴露自己，于是将报刊上的字减下来，剪拼成匿名信。  
现在又一名举报人，希望借鉴这种手段，使用英文报刊完成举报操作。  
但为了增加文章的混淆度，只需满足每个单词中字母数量一致即可，不关注每个字母的顺序。  
解释：单词on允许通过单词no进行替代。  
报纸代表newspaper，匿名信代表anonymousLetter，求报纸内容是否可以拼成匿名信。

#### 输入描述

第一行输入newspaper内容，包括1-N个字符串，用空格分开  
第二行输入anonymousLetter内容，包括1-N个字符串，用**空格** 分开。

newspaper和anonymousLetter的字符串由小写英文字母组成，且每个字母只能使用一次；  
newspaper内容中的每个字符串字母顺序可以任意调整，但必须保证字符串的完整性（每个字符串不能有多余字母）  
1 < N < 100,  
1 <= newspaper.length,anonymousLetter.length <= 10^4

#### 输出描述

如果报纸可以拼成匿名信返回true，否则返回false

#### 用例1

输入

    
    
    ab cd
    ab
    

输出

    
    
    true
    

#### 用例2

输入

    
    
    ab ef
    aef
    

输出

    
    
    false
    

#### 用例3

输入

    
    
    ab bcd ef
    cbd fe
    

输出

    
    
    true
    

#### 用例4

输入

    
    
    ab bcd ef
    cd ef
    

输出

    
    
    false
    

#### 题目解析

用例1：

报纸上有两个单词：ab、cd，而要写的匿名信需要一个单词ab，因此可以直接使用报纸上的单词ab，所以可以写出匿名信。

用例2：

报纸上有两个单词：ab、ef，而要写的匿名信需要一个aef，根据题目意思只需满足每个单词中字母数量一致即可

如果想用报纸上的单词，代替匿名信上的单词，则这两个单词的字母数量必须一致。

因此，对于匿名信单词aef，有三个字母，而报纸上没有有三个字母的单词，因此输出false。

解题思路如下：

  1. 读取输入：首先，我们需要读取两行输入，分别表示报纸上的单词（`newspaperWords`）和匿名信上的单词（`anonymousLetterWords`）。

  2. 创建HashMap：我们创建一个HashMap（`wordCount`），用于存储报纸上每个单词的字母数量。这里，我们使用`getWordCountKey`方法将单词转换为一个字符串，该字符串表示每个字母在单词中出现的次数。例如，单词"hello"将转换为"01101000000000000000000000"（h出现1次，e出现1次，l出现2次，o出现1次）。

  3. 计算报纸单词的字母数量：遍历报纸上的每个单词，将其转换为字母数量字符串（使用`getWordCountKey`方法），然后将其添加到`wordCount` HashMap中。如果该字符串已经存在于HashMap中，则将其计数加1。

  4. 检查匿名信单词是否可以由报纸单词组成：遍历匿名信上的每个单词，将其转换为字母数量字符串（使用`getWordCountKey`方法）。然后检查`wordCount` HashMap中是否包含该字符串，且其计数大于0。如果是，则将HashMap中对应的计数减1。如果不是，则返回false，表示无法使用报纸上的单词拼出匿名信。

  5. 返回结果：如果遍历完所有匿名信上的单词后，没有返回false，则表示可以使用报纸上的单词拼出匿名信，返回true。

#### C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    #include <string.h>
    #define MAX_LEN 1000
    
    // 判断是否能够用报纸上的单词拼出匿名信
    int canCreateAnonymousLetter(char newspaperLine[], char anonymousLetterLine[]) {
        char* newspaperWords[MAX_LEN];
        char* anonymousLetterWords[MAX_LEN];
        int newspaperCount[MAX_LEN] = {0};
        int anonymousLetterCount[MAX_LEN] = {0};
        int newspaperWordsNum = 0, anonymousLetterWordsNum = 0;
        char* token;
    
        // 将报纸内容和匿名信内容按照空格分割成单词，并存储在数组中
        token = strtok(newspaperLine, " ");
        while (token != NULL) {
            newspaperWords[newspaperWordsNum++] = token;
            token = strtok(NULL, " ");
        }
    
        token = strtok(anonymousLetterLine, " ");
        while (token != NULL) {
            anonymousLetterWords[anonymousLetterWordsNum++] = token;
            token = strtok(NULL, " ");
        }
    
        // 统计报纸上每个单词中每个字母出现的次数，用排序后的单词作为 key
        for (int i = 0; i < newspaperWordsNum; i++) {
            char sortedWord[MAX_LEN];
            strcpy(sortedWord, newspaperWords[i]);
            qsort(sortedWord, strlen(sortedWord), sizeof(char), strcmp); // 将单词中的字母排序
            for (int j = 0; j < strlen(sortedWord); j++) {
                newspaperCount[i] |= (1 << (sortedWord[j] - 'a')); // 统计每个单词出现的次数
            }
        }
    
        // 遍历匿名信上的单词，如果在 newspaperCount 中不存在或者已经用完了，则无法拼出匿名信
        for (int i = 0; i < anonymousLetterWordsNum; i++) {
            char sortedWord[MAX_LEN];
            strcpy(sortedWord, anonymousLetterWords[i]);
            qsort(sortedWord, strlen(sortedWord), sizeof(char), strcmp); // 将单词中的字母排序
            int index = -1;
            for (int j = 0; j < newspaperWordsNum; j++) {
                if (newspaperCount[j] != -1 && strcmp(sortedWord, newspaperWords[j]) == 0) {
                    index = j;
                    break;
                }
            }
            if (index == -1) {
                return 0;
            }
            newspaperCount[index] = -1; // 使用了一个单词，将其计数减一
        }
    
        return 1;
    }
    
    int main() {
        char newspaperLine[MAX_LEN], anonymousLetterLine[MAX_LEN];
    
        fgets(newspaperLine, MAX_LEN, stdin); // 输入报纸内容
        if (newspaperLine[strlen(newspaperLine) - 1] == '\n') {
            newspaperLine[strlen(newspaperLine) - 1] = '\0'; // 去掉换行符
        }
    
        fgets(anonymousLetterLine, MAX_LEN, stdin); // 输入匿名信内容
        if (anonymousLetterLine[strlen(anonymousLetterLine) - 1] == '\n') {
            anonymousLetterLine[strlen(anonymousLetterLine) - 1] = '\0'; // 去掉换行符
        }
    
        // 判断是否能够用报纸上的单词拼出匿名信
        printf("%s\n", canCreateAnonymousLetter(newspaperLine, anonymousLetterLine) ? "true" : "false");
    
        return 0;
    }
    

#### C++

    
    
    #include <iostream>
    #include <unordered_map>
    #include <vector>
    #include <sstream>
    
    using namespace std;
    
    // 获取单词的字母数量作为key
    string get_word_count_key(string word) {
        vector<int> count(26, 0);
        // 遍历单词中的每个字符
        for (char c : word) {
            count[c - 'a']++;
        }
        string key = "";
        for (int i : count) {
            key += to_string(i);
        }
        return key;
    }
    
    // 判断是否能够用报纸上的单词拼出匿名信
    bool can_create_anonymous_letter(vector<string>& newspaper_words, vector<string>& anonymous_letter_words) {
        unordered_map<string, int> word_count;
        // 遍历报纸上的单词
        for (string word : newspaper_words) {
            string word_count_key = get_word_count_key(word);
            word_count[word_count_key]++;
        }
    
        // 遍历匿名信上的单词
        for (string word : anonymous_letter_words) {
            string word_count_key = get_word_count_key(word);
            if (word_count[word_count_key] <= 0) {
                return false;
            }
            word_count[word_count_key]--;
        }
    
        return true;
    }
    
    int main() {
        vector<string> newspaper_words;
        vector<string> anonymous_letter_words;
        string word;
        // 从输入中读取报纸上的单词
        getline(cin, word);
        stringstream ss(word);
        while (ss >> word) {
            newspaper_words.push_back(word);
        }
    
        // 从输入中读取匿名信上的单词
        getline(cin, word);
        stringstream ss2(word);
        while (ss2 >> word) {
            anonymous_letter_words.push_back(word);
        }
    
        // 调用can_create_anonymous_letter函数，判断是否可以用报纸单词拼出匿名信，并输出结果
        if (can_create_anonymous_letter(newspaper_words, anonymous_letter_words)) {
            cout << "true" << endl;
        } else {
            cout << "false" << endl;
        }
    
        return 0;
    }
    
    

#### 文章目录

  *     *       * 题目描述
      * 输入描述
      * 输出描述
      * 用例1
      * 用例2
      * 用例3
      * 用例4
      * 题目解析
      * C语言
      * C++

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

