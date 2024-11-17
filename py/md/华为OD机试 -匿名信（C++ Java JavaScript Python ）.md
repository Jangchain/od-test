## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

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

#### 题目理解

这道题目要求模拟一种“字母剪报拼接”的过程，核心在于**匿名信中的单词是否可以通过报纸中的单词组合成** ，并且满足以下条件：

  1. **字母数量一致即可** ：匿名信中的每个单词可以通过报纸中的某个单词替换，只要两个单词中的字母组成（包括数量）一致，顺序可以不同。例如： 
     * `on` 可以通过 `no` 替代，因为字母组成一致。
  2. **每个单词只能使用一次** ：报纸中的单词在匹配到匿名信中的某个单词后，就不能再被使用。
  3. **报纸单词的完整性** ：报纸中的单词不能部分匹配匿名信中的单词，即不能拆分或拼接报纸单词。

* * *

#### 输入和输出要求

  * **输入** ： 
    1. 第一行是报纸内容 `newspaper`，由 1 到 N 个字符串组成，用空格分隔。
    2. 第二行是匿名信内容 `anonymousLetter`，由 1 到 N 个字符串组成，用空格分隔。
  * **输出** ：  
如果报纸可以拼接成匿名信，返回 `true`；否则返回 `false`。

* * *

#### 核心点与解法

##### 核心点：

  1. **字母组成一致性判断** ： 
     * 将每个单词按照字母排序后，可以快速判断两个单词的字母组成是否一致。例如： 
       * 单词 `abc` 和 `bca` 排序后都是 `abc`，表示字母组成一致。
       * 单词 `abc` 和 `abd` 排序后不同，表示字母组成不一致。
  2. **报纸单词使用限制** ： 
     * 使用一个哈希表或字典记录报纸中各单词（按字母组成分类）的出现次数。
     * 匹配匿名信时，消耗匹配到的报纸单词。

##### 解法步骤：

  1. **将报纸单词按照字母组成分类** ： 
     * 遍历 `newspaper`，对每个单词排序，存入哈希表，记录每种字母组成的单词数量。
  2. **匹配匿名信单词** ： 
     * 遍历 `anonymousLetter`，对每个单词排序，检查是否在报纸的哈希表中存在匹配的单词。
     * 如果找到匹配的单词，将其数量减 1；如果找不到，直接返回 `false`。
  3. **全部单词匹配完成后，返回`true`**。

* * *

#### 用例分析

##### 用例 1

**输入** ：

    
    
    ab cd
    ab
    

**解析** ：

  * 报纸内容：`{'ab': 1, 'cd': 1}` （按字母组成分类）
  * 匿名信：`{'ab': 1}`。
  * `ab` 可以从报纸中匹配，返回 `true`。

* * *

##### 用例 2

**输入** ：

    
    
    ab ef
    aef
    

**解析** ：

  * 报纸内容：`{'ab': 1, 'ef': 1}`。
  * 匿名信：`{'aef': 1}`。
  * `aef` 无法从报纸中匹配，返回 `false`。

* * *

##### 用例 3

**输入** ：

    
    
    ab bcd ef
    cbd fe
    

**解析** ：

  * 报纸内容：`{'ab': 1, 'bcd': 1, 'ef': 1}`。
  * 匿名信：`{'cbd': 1, 'fe': 1}`。
  * `cbd` 可以通过 `bcd` 替代，`fe` 可以通过 `ef` 替代，返回 `true`。

* * *

##### 用例 4

**输入** ：

    
    
    ab bcd ef
    cd ef
    

**解析** ：

  * 报纸内容：`{'ab': 1, 'bcd': 1, 'ef': 1}`。
  * 匿名信：`{'cd': 1, 'ef': 1}`。
  * `cd` 无法通过报纸中的任何单词替代，返回 `false`。

* * *

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
    
    

#### JavaScript

    
    
    // 导入readline模块，用于从命令行读取输入
    const readline = require('readline');
    
    // 创建readline接口，用于处理输入和输出
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    // 当接收到一行输入时，处理报纸单词
    rl.on('line', (newspaperWords) => {
      // 当接收到第二行输入时，处理匿名信单词
      rl.on('line', (anonymousLetterWords) => {
        // 调用canCreateAnonymousLetter函数，判断是否可以用报纸单词拼出匿名信，并输出结果
        console.log(canCreateAnonymousLetter(newspaperWords.split(' '), anonymousLetterWords.split(' ')));
        // 关闭readline接口
        rl.close();
      });
    });
    
    // 判断是否能够用报纸上的单词拼出匿名信
    function canCreateAnonymousLetter(newspaperWords, anonymousLetterWords) {
      // 创建一个Map用于存储报纸上每个单词的字母数量
      const wordCount = new Map();
      // 遍历报纸上的单词
      for (const word of newspaperWords) {
        // 获取单词的字母数量字符串作为Map的key
        const wordCountKey = getWordCountKey(word);
        // 将单词的字母数量字符串添加到Map中，如果已存在，则计数加1
        wordCount.set(wordCountKey, (wordCount.get(wordCountKey) || 0) + 1);
      }
    
      // 遍历匿名信上的单词
      for (const word of anonymousLetterWords) {
        // 获取单词的字母数量字符串作为Map的key
        const wordCountKey = getWordCountKey(word);
        // 如果Map中不存在该字符串，或者其计数小于等于0，则返回false
        if (!wordCount.has(wordCountKey) || wordCount.get(wordCountKey) <= 0) {
          return false;
        }
        // 否则，将Map中对应的计数减1
        wordCount.set(wordCountKey, wordCount.get(wordCountKey) - 1);
      }
    
      // 如果遍历完所有匿名信单词后没有返回false，则返回true
      return true;
    }
    
    // 获取单词的字母数量作为Map的key
    function getWordCountKey(word) {
      // 创建一个长度为26的数组，用于存储每个字母在单词中出现的次数
      const count = new Array(26).fill(0);
      // 遍历单词中的每个字符
      for (const c of word) {
        // 将字符的ASCII码减去'a'的ASCII码，得到该字符在数组中的索引，然后将对应的计数加1
        count[c.charCodeAt() - 'a'.charCodeAt()]++;
      }
      // 将计数数组连接成一个字符串，并返回
      return count.join('');
    }
    
    

#### Java

    
    
    import java.util.HashMap;
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            // 创建Scanner对象，从命令行读取输入
            Scanner scanner = new Scanner(System.in);
            // 读取报纸上的单词，并以空格分隔
            String[] newspaperWords = scanner.nextLine().split(" ");
            // 读取匿名信上的单词，并以空格分隔
            String[] anonymousLetterWords = scanner.nextLine().split(" ");
    
            // 用于存储报纸上每种字母组合的单词数量
            HashMap<String, Integer> wordCount = new HashMap<>();
    
            // 遍历报纸上的单词
            for (String word : newspaperWords) {
                // 获取单词字母组合的唯一键
                String key = getWordCountKey(word);
                // 将单词字母组合计数加1
                wordCount.put(key, wordCount.getOrDefault(key, 0) + 1);
            }
    
            // 遍历匿名信上的单词
            boolean canCreate = true;
            for (String word : anonymousLetterWords) {
                // 获取单词字母组合的唯一键
                String key = getWordCountKey(word);
                // 如果该字母组合的单词数量不足，直接返回false
                if (wordCount.getOrDefault(key, 0) <= 0) {
                    canCreate = false;
                    break;
                }
                // 否则，消耗掉一个单词
                wordCount.put(key, wordCount.get(key) - 1);
            }
    
            // 输出结果
            System.out.println(canCreate);
        }
    
        // 生成单词的字母组合唯一键
        public static String getWordCountKey(String word) {
            // 长度为26的数组，用于存储每个字母出现的次数
            int[] count = new int[26];
            for (char c : word.toCharArray()) {
                count[c - 'a']++;
            }
            // 将计数数组转为字符串，作为哈希表的键
            StringBuilder sb = new StringBuilder();
            for (int i : count) {
                sb.append(i).append("#"); // 用`#`分隔以防混淆
            }
            return sb.toString();
        }
    }
    
    

#### Python

    
    
    import sys
    
    def can_create_anonymous_letter(newspaper_words, anonymous_letter_words):
        # 创建一个字典用于存储报纸上每个单词的字母数量
        word_count = {}
    
        # 遍历报纸上的单词
        for word in newspaper_words:
            # 获取单词的字母数量字符串作为字典的key
            word_count_key = get_word_count_key(word)
            # 将单词的字母数量字符串添加到字典中，如果已存在，则计数加1
            word_count[word_count_key] = word_count.get(word_count_key, 0) + 1
    
        # 遍历匿名信上的单词
        for word in anonymous_letter_words:
            # 获取单词的字母数量字符串作为字典的key
            word_count_key = get_word_count_key(word)
            # 如果字典中不存在该字符串，或者其计数小于等于0，则返回False
            if word_count_key not in word_count or word_count[word_count_key] <= 0:
                return False
            # 否则，将字典中对应的计数减1
            word_count[word_count_key] -= 1
    
        # 如果遍历完所有匿名信单词后没有返回False，则返回True
        return True
    
    def get_word_count_key(word):
        # 创建一个长度为26的列表，用于存储每个字母在单词中出现的次数
        count = [0] * 26
    
        # 遍历单词中的每个字符
        for c in word:
            # 将字符的ASCII码减去'a'的ASCII码，得到该字符在列表中的索引，然后将对应的计数加1
            count[ord(c) - ord('a')] += 1
    
        # 将计数列表连接成一个字符串，并返回
        return ''.join(map(str, count))
    
    # 从命令行读取输入
    newspaper_words = input().split()
    anonymous_letter_words = input().split()
    
    # 调用can_create_anonymous_letter函数，判断是否可以用报纸单词拼出匿名信，并输出结果
    print("true") if can_create_anonymous_letter(newspaper_words, anonymous_letter_words)  else print("false")
    
    

#### 文章目录

  * 最新华为OD机试
  *     *       * 题目描述
      * 输入描述
      * 输出描述
      * 用例1
      * 用例2
      * 用例3
      * 用例4
      * 题目解析
      * 题目理解
      * 输入和输出要求
      * 核心点与解法
      *         * 核心点：
        * 解法步骤：
      * 用例分析
      *         * 用例 1
        * 用例 2
        * 用例 3
        * 用例 4
      * C语言
      * C++
      * JavaScript
      * Java
      * Python

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

