## 题目描述

给定一个连续不包含空格的[字符串](https://so.csdn.net/so/search?q=%E5%AD%97%E7%AC%A6%E4%B8%B2&spm=1001.2101.3001.7020)，该字符串仅包含英文小写字母及英文标点符号（逗号、分号、句号），同时给定词库，对该字符串进行精确分词。

说明：

  1. 精确分词：字符串分词后，不会出现重叠。即"ilovechina"，不同词库可分割为"i,love,china"，“ilove,china”，不能分割出现重叠的"i,ilove,china"，i 出现重叠

  2. 标点符号不成词，仅用于断句

  3. 词库：根据外部知识库统计出来的常用词汇例：dictionary = [“i”, “love”, “china”, “lovechina”, “ilove”]

  4. 分词原则：采用分词顺序优先且最长匹配原则

“ilovechina”，假设分词结果 [i,ilove,lo,love,ch,china,lovechina]，则输出 [ilove,china]

错误输出：[i,lovechina]，原因：“ilove” > 优先于 “lovechina” 成词

错误输出：[i,love,china]，原因：“ilove” > "i"遵循最长匹配原则

## 输入描述

第一行输入待[分词](https://so.csdn.net/so/search?q=%E5%88%86%E8%AF%8D&spm=1001.2101.3001.7020)语句
“ilovechina”

  * 字符串长度限制：0 < length < 256

第二行输入中文词库 “i,love,china,ch,na,ve,lo,this,is,this,word”

  * 词库长度限制：1 < length < 100000

## 输出描述

按顺序输出分词结果 “i,love,china”

## 用例1

输入

    
    
    ilovechina
    i,love,china,ch,na,ve,lo,this,is,the,word
    

​

输出

    
    
    i,love,china
    

说明 无

## 用例2

输入

    
    
    iat
    i,love,china,ch,na,ve,lo,this,is,the,word,beauti,tiful,ful
    

输出

    
    
    i,a,t
    

说明

> 单个字母，不在词库中且不成词则输出单个字母

## 用例3

输入

    
    
    ilovechina,thewordisbeautiful
    i,love,china,ch,na,ve,lo,this,is,the,word,beauti,tiful,ful
    

输出

    
    
    i,love,china the,word,is,beauti,ful
    

说明

> 标点符号为英文标点符号

## 解题思路

题目的要求是给定一个连续的字符串，该字符串只包含英文小写字母和英文标点符号（逗号、分号、句号），同时给出一个词库。你需要根据这个词库将字符串进行分词。

这里的分词有两个原则：

  1. 分词顺序优先：如果一个字符串可以被分割成多种可能的词序列，那么应该优先选择在词库中出现顺序较前的词。例如，如果词库是 [“i”, “love”, “china”, “lovechina”, “ilove”]，那么字符串 “ilovechina” 应该被分割为 “ilove,china”，而不是 “i,lovechina”，因为 “ilove” 在词库中出现的顺序比 “lovechina” 要前。

  2. 最长匹配原则：如果一个字符串可以被分割成多种可能的词序列，那么应该优先选择长度较长的词。例如，如果词库是 [“i”, “love”, “china”, “lovechina”, “ilove”]，那么字符串 “ilovechina” 应该被分割为 “ilove,china”，而不是 “i,love,china”，因为 “ilove” 的长度比 “i” 要长。

注意，标点符号不会成为词的一部分，它们只用于断句。如果一个字符不在词库中，也不是标点符号，那么它会被当作一个单独的词。

### 用例模拟

    
    
    ilovechina,thewordisbeautiful
    i,love,china,ch,na,ve,lo,this,is,the,word,beauti,tiful,ful
    

在这个例子中，输入的句子是 “ilovechina,thewordisbeautiful”，字典中的单词是 “i”, “love”, “china”,
“ch”, “na”, “ve”, “lo”, “this”, “is”, “the”, “word”, “beauti”, “tiful”, “ful”。

  1. 首先，将字典中的每个单词插入到 Trie 中。这个过程中，Trie 会根据字典中的单词构建出相应的路径。

  2. 然后，开始遍历句子中的每个字符。首先遇到的字符是 ‘i’，在 Trie 中可以找到以 ‘i’ 为起点的单词 “i”，所以将 “i” 添加到结果中。

  3. 接下来的字符是 ‘l’，在 Trie 中可以找到以 ‘l’ 为起点的最长单词 “love”，所以将 “love” 添加到结果中。

  4. 然后的字符是 ‘c’，在 Trie 中可以找到以 ‘c’ 为起点的最长单词 “china”，所以将 “china” 添加到结果中。

  5. 接下来的字符是 ‘,’，这是一个非字母字符，直接将其添加到结果中。

  6. 然后的字符是 ‘t’，在 Trie 中可以找到以 ‘t’ 为起点的最长单词 “the”，所以将 “the” 添加到结果中。

  7. 接下来的字符是 ‘w’，在 Trie 中可以找到以 ‘w’ 为起点的最长单词 “word”，所以将 “word” 添加到结果中。

  8. 然后的字符是 ‘i’，在 Trie 中可以找到以 ‘i’ 为起点的最长单词 “is”，所以将 “is” 添加到结果中。

  9. 接下来的字符是 ‘b’，在 Trie 中可以找到以 ‘b’ 为起点的最长单词 “beauti”，所以将 “beauti” 添加到结果中。

  10. 最后的字符是 ‘f’，在 Trie 中可以找到以 ‘f’ 为起点的最长单词 “ful”，所以将 “ful” 添加到结果中。

  11. 遍历完句子中的所有字符后，得到的结果是 “i,love,china,the,word,is,beauti,ful”。

所以，这个程序的输出应该是 “i,love,china,the,word,is,beauti,ful”。

## C++

    
    
    #include <iostream>
    #include <vector>
    #include <string>
    #include <sstream>
    #include <algorithm> // 添加这一行
    
    using namespace std;
    
    // 定义 TrieNode 类，每个节点包含一个布尔值 isWord 和一个 TrieNode 类型的数组 children
    struct TrieNode {
        bool isWord;
        TrieNode* children[26];
    
        TrieNode() {
            isWord = false;
            for (int i = 0; i < 26; i++) {
                children[i] = nullptr;
            }
        }
    };
    
    // 创建 Trie 的根节点
    TrieNode* root = new TrieNode();
    
    // 插入方法，用于向 Trie 中插入一个单词
    void insert(string word) {
        TrieNode* node = root;
        // 遍历单词中的每个字符
        for (char c : word) {
            // 如果当前字符对应的子节点为空，则创建一个新的子节点
            if (node->children[c - 'a'] == nullptr) {
                node->children[c - 'a'] = new TrieNode();
            }
            // 移动到下一个子节点
            node = node->children[c - 'a'];
        }
        // 标记当前节点为一个单词的结束
        node->isWord = true;
    }
    
    int main() {
        // 读取输入的句子，并将其转换为小写
        string sentence;
        getline(cin, sentence);
        transform(sentence.begin(), sentence.end(), sentence.begin(), ::tolower);
    
        // 读取输入的字典，字典中的单词以逗号分隔
        string dictionary;
        getline(cin, dictionary);
        stringstream ss(dictionary);
        string word;
        while (getline(ss, word, ',')) {
            insert(word);
        }
    
        vector<string> result;
        int i = 0;
        // 遍历句子中的每个字符
        while (i < sentence.size()) {
            // 如果当前字符不是字母，则直接将其添加到结果中
            if (!isalpha(sentence[i])) {
                result.push_back(sentence.substr(i, 1));
                i++;
                continue;
            }
            int j = sentence.size();
            // 从句子的末尾开始，寻找以 i 为起点的最长的在字典中存在的单词
            while (j > i) {
                TrieNode* node = root;
                bool isWord = true;
                for (int k = i; k < j; k++) {
                    // 如果当前字符不是字母，或者在 Trie 中不存在对应的子节点，则说明当前的字符串不是一个单词
                    if (!isalpha(sentence[k]) || node->children[sentence[k] - 'a'] == nullptr) {
                        isWord = false;
                        break;
                    }
                    // 移动到下一个子节点
                    node = node->children[sentence[k] - 'a'];
                }
                // 如果找到了一个单词，则结束循环
                if (isWord && node->isWord) {
                    break;
                }
                // 如果没有找到单词，则缩短当前的字符串
                j--;
            }
            // 如果没有找到单词，则将当前字符作为一个单独的单词添加到结果中
            if (j == i) {
                result.push_back(sentence.substr(i, 1));
                i++;
            } else {
                // 如果找到了单词，则将该单词添加到结果中
                result.push_back(sentence.substr(i, j - i));
                i = j;
            }
        }
    
        // 输出结果，单词之间以逗号分隔
        for (int i = 0; i < result.size(); i++) {
            if (i > 0) {
                cout << ",";
            }
            cout << result[i];
        }
        cout << endl;
    
        return 0;
    }
    

## Java

    
    
    import java.util.*;
    
    public class Main {
        // 定义 TrieNode 类，每个节点包含一个布尔值 isWord 和一个 TrieNode 类型的数组 children
        static class TrieNode {
            boolean isWord;
            TrieNode[] children = new TrieNode[26];
        }
    
        // 创建 Trie 的根节点
        static TrieNode root = new TrieNode();
    
        // 插入方法，用于向 Trie 中插入一个单词
        public static void insert(String word) {
            TrieNode node = root;
            // 遍历单词中的每个字符
            for (int i = 0; i < word.length(); i++) {
                char c = word.charAt(i);
                // 如果当前字符对应的子节点为空，则创建一个新的子节点
                if (node.children[c - 'a'] == null) {
                    node.children[c - 'a'] = new TrieNode();
                }
                // 移动到下一个子节点
                node = node.children[c - 'a'];
            }
            // 标记当前节点为一个单词的结束
            node.isWord = true;
        }
    
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            // 读取输入的句子，并将其转换为小写
            String sentence = scanner.nextLine().toLowerCase();
            // 读取输入的字典，字典中的单词以逗号分隔
            String[] dictionary = scanner.nextLine().split(",");
            // 将字典中的每个单词插入到 Trie 中
            for (String word : dictionary) {
                insert(word.toLowerCase());
            }
    
            List<String> result = new ArrayList<>();
            int i = 0;
            // 遍历句子中的每个字符
            while (i < sentence.length()) {
                // 如果当前字符不是字母，则直接将其添加到结果中
                if (sentence.charAt(i) < 'a' || sentence.charAt(i) > 'z') {
                    result.add(sentence.substring(i, i + 1));
                    i++;
                    continue;
                }
                int j = sentence.length();
                // 从句子的末尾开始，寻找以 i 为起点的最长的在字典中存在的单词
                while (j > i) {
                    TrieNode node = root;
                    boolean isWord = true;
                    for (int k = i; k < j; k++) {
                        // 如果当前字符不是字母，或者在 Trie 中不存在对应的子节点，则说明当前的字符串不是一个单词
                        if (sentence.charAt(k) < 'a' || sentence.charAt(k) > 'z' || node.children[sentence.charAt(k) - 'a'] == null) {
                            isWord = false;
                            break;
                        }
                        // 移动到下一个子节点
                        node = node.children[sentence.charAt(k) - 'a'];
                    }
                    // 如果找到了一个单词，则结束循环
                    if (isWord && node.isWord) {
                        break;
                    }
                    // 如果没有找到单词，则缩短当前的字符串
                    j--;
                }
                // 如果没有找到单词，则将当前字符作为一个单独的单词添加到结果中
                if (j == i) {
                    result.add(sentence.substring(i, i + 1));
                    i++;
                } else {
                    // 如果找到了单词，则将该单词添加到结果中
                    result.add(sentence.substring(i, j));
                    i = j;
                }
            }
    
            // 输出结果，单词之间以逗号分隔
            System.out.println(String.join(",", result));
        }
    }
    

## javaScript

    
    
    // 定义 TrieNode 类，每个节点包含一个布尔值 isWord 和一个 TrieNode 类型的数组 children
    class TrieNode {
        constructor() {
            this.isWord = false; // 标记该节点是否为一个单词的结束
            this.children = new Array(26).fill(null); // 存储子节点的数组，每个元素对应一个字母
        }
    }
    
    // 创建 Trie 的根节点
    let root = new TrieNode();
    
    // 插入方法，用于向 Trie 中插入一个单词
    function insert(word) {
        let node = root; // 从根节点开始
        for (let i = 0; i < word.length; i++) {
            let c = word.charCodeAt(i) - 'a'.charCodeAt(0); // 计算当前字符对应的索引
            // 如果当前字符对应的子节点为空，则创建一个新的子节点
            if (node.children[c] == null) {
                node.children[c] = new TrieNode();
            }
            // 移动到下一个子节点
            node = node.children[c];
        }
        // 标记当前节点为一个单词的结束
        node.isWord = true;
    }
    
    let readline = require('readline');
    let rl = readline.createInterface({
        input: process.stdin, // 输入流
        output: process.stdout // 输出流
    });
    
    let lines = []; // 存储输入的每一行
    rl.on('line', function (line) {
        lines.push(line); // 当读取到一行时，将其添加到 lines 数组中
    }).on('close', function() { // 当读取完所有输入时
        let sentence = lines[0].toLowerCase(); // 获取句子，并将其转换为小写
        let dictionary = lines[1].split(","); // 获取字典，字典中的单词以逗号分隔
        for (let word of dictionary) {
            insert(word.toLowerCase()); // 将字典中的每个单词插入到 Trie 中
        }
    
        let result = []; // 存储结果
        let i = 0;
        // 遍历句子中的每个字符
        while (i < sentence.length) {
            // 如果当前字符不是字母，则直接将其添加到结果中
            if (sentence.charCodeAt(i) < 'a'.charCodeAt(0) || sentence.charCodeAt(i) > 'z'.charCodeAt(0)) {
                result.push(sentence.substring(i, i + 1));
                i++;
                continue;
            }
            let j = sentence.length;
            // 从句子的末尾开始，寻找以 i 为起点的最长的在字典中存在的单词
            while (j > i) {
                let node = root;
                let isWord = true;
                for (let k = i; k < j; k++) {
                    // 如果当前字符不是字母，或者在 Trie 中不存在对应的子节点，则说明当前的字符串不是一个单词
                    if (sentence.charCodeAt(k) < 'a'.charCodeAt(0) || sentence.charCodeAt(k) > 'z'.charCodeAt(0) || node.children[sentence.charCodeAt(k) - 'a'.charCodeAt(0)] == null) {
                        isWord = false;
                        break;
                    }
                    // 移动到下一个子节点
                    node = node.children[sentence.charCodeAt(k) - 'a'.charCodeAt(0)];
                }
                // 如果找到了一个单词，则结束循环
                if (isWord && node.isWord) {
                    break;
                }
                // 如果没有找到单词，则缩短当前的字符串
                j--;
            }
            // 如果没有找到单词，则将当前字符作为一个单独的单词添加到结果中
            if (j == i) {
                result.push(sentence.substring(i, i + 1));
                i++;
            } else {
                // 如果找到了单词，则将该单词添加到结果中
                result.push(sentence.substring(i, j));
                i = j;
            }
        }
    
        // 输出结果，单词之间以逗号分隔
        console.log(result.join(","));
    });
    

## Python

    
    
    # 定义 TrieNode 类，每个节点包含一个布尔值 is_word 和一个 TrieNode 类型的数组 children
    class TrieNode:
        def __init__(self):
            self.is_word = False  # 标记该节点是否为一个单词的结束
            self.children = [None] * 26  # 存储子节点的数组，每个元素对应一个字母
    
    # 创建 Trie 的根节点
    root = TrieNode()
    
    # 插入方法，用于向 Trie 中插入一个单词
    def insert(word):
        node = root  # 从根节点开始
        for c in word:
            index = ord(c) - ord('a')  # 计算当前字符对应的索引
            # 如果当前字符对应的子节点为空，则创建一个新的子节点
            if node.children[index] is None:
                node.children[index] = TrieNode()
            # 移动到下一个子节点
            node = node.children[index]
        # 标记当前节点为一个单词的结束
        node.is_word = True
    
    # 输入句子，并将其转换为小写
    sentence = input().lower()
    # 输入字典，字典中的单词以逗号分隔
    dictionary = input().split(",")
    for word in dictionary:
        insert(word.lower())  # 将字典中的每个单词插入到 Trie 中
    
    result = []  # 存储结果
    i = 0
    # 遍历句子中的每个字符
    while i < len(sentence):
        # 如果当前字符不是字母，则直接将其添加到结果中
        if not sentence[i].isalpha():
            result.append(sentence[i])
            i += 1
            continue
        j = len(sentence)
        # 从句子的末尾开始，寻找以 i 为起点的最长的在字典中存在的单词
        while j > i:
            node = root
            is_word = True
            for k in range(i, j):
                # 如果当前字符不是字母，或者在 Trie 中不存在对应的子节点，则说明当前的字符串不是一个单词
                if not sentence[k].isalpha() or node.children[ord(sentence[k]) - ord('a')] is None:
                    is_word = False
                    break
                # 移动到下一个子节点
                node = node.children[ord(sentence[k]) - ord('a')]
            # 如果找到了一个单词，则结束循环
            if is_word and node.is_word:
                break
            # 如果没有找到单词，则缩短当前的字符串
            j -= 1
        # 如果没有找到单词，则将当前字符作为一个单独的单词添加到结果中
        if j == i:
            result.append(sentence[i])
            i += 1
        else:
            # 如果找到了单词，则将该单词添加到结果中
            result.append(sentence[i:j])
            i = j
    
    # 输出结果，单词之间以逗号分隔
    print(",".join(result))
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    #include <string.h>
    #include <ctype.h>
    
    // 定义 TrieNode 结构体，每个节点包含一个布尔值 isWord 和一个 TrieNode 类型的数组 children
    struct TrieNode {
        int isWord;
        struct TrieNode* children[26];
    };
    
    // 创建 Trie 的根节点
    struct TrieNode* root;
    
    // 插入方法，用于向 Trie 中插入一个单词
    void insert(char* word) {
        struct TrieNode* node = root;
        // 遍历单词中的每个字符
        for (int i = 0; i < strlen(word); i++) {
            char c = word[i];
            // 如果当前字符对应的子节点为空，则创建一个新的子节点
            if (node->children[c - 'a'] == NULL) {
                node->children[c - 'a'] = (struct TrieNode*)calloc(1, sizeof(struct TrieNode));
            }
            // 移动到下一个子节点
            node = node->children[c - 'a'];
        }
        // 标记当前节点为一个单词的结束
        node->isWord = 1;
    }
    
    int main() {
        root = (struct TrieNode*)calloc(1, sizeof(struct TrieNode));
    
        // 读取输入的句子，并将其转换为小写
        char sentence[1000];
        fgets(sentence, 1000, stdin);
        for (int i = 0; i < strlen(sentence); i++) {
            sentence[i] = tolower(sentence[i]);
        }
    
        // 读取输入的字典，字典中的单词以逗号分隔
        char dictionary[1000];
        fgets(dictionary, 1000, stdin);
        char* word = strtok(dictionary, ",");
        while (word != NULL) {
            insert(word);
            word = strtok(NULL, ",");
        }
    
        char result[1000] = "";
        int i = 0;
        // 遍历句子中的每个字符
        while (i < strlen(sentence)) {
            // 如果当前字符不是字母，则直接将其添加到结果中
            if (!isalpha(sentence[i])) {
                strncat(result, &sentence[i], 1);
                i++;
                continue;
            }
            int j = strlen(sentence);
            // 从句子的末尾开始，寻找以 i 为起点的最长的在字典中存在的单词
            while (j > i) {
                struct TrieNode* node = root;
                int isWord = 1;
                for (int k = i; k < j; k++) {
                    // 如果当前字符不是字母，或者在 Trie 中不存在对应的子节点，则说明当前的字符串不是一个单词
                    if (!isalpha(sentence[k]) || node->children[sentence[k] - 'a'] == NULL) {
                        isWord = 0;
                        break;
                    }
                    // 移动到下一个子节点
                    node = node->children[sentence[k] - 'a'];
                }
                // 如果找到了一个单词，则结束循环
                if (isWord && node->isWord) {
                    break;
                }
                // 如果没有找到单词，则缩短当前的字符串
                j--;
            }
            // 如果没有找到单词，则将当前字符作为一个单独的单词添加到结果中
            if (j == i) {
                strncat(result, &sentence[i], 1);
                i++;
            } else {
                // 如果找到了单词，则将该单词添加到结果中
                char temp[100];
                strncpy(temp, &sentence[i], j - i);
                temp[j - i] = '\0';
                strcat(result, temp);
                i = j;
            }
            strcat(result, ",");
        }
    
        // 输出结果，单词之间以逗号分隔
        printf("%s\n", result);
    
        return 0;
    }
    

#### 文章目录

  * 题目描述
  * 输入描述
  * 输出描述
  * 用例1
  * 用例2
  * 用例3
  * 解题思路
  *     * 用例模拟
  * C++
  * Java
  * javaScript
  * Python
  * C语言

![fengmian](https://i-blog.csdnimg.cn/blog_migrate/ca89e07e19bc2f23bf042d3cf15b9ddb.png)

