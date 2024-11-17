## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

小华负责公司知识图谱产品，现在要通过新词挖掘完善知识图谱。

新词挖掘：给出一个待挖掘问题内容字符串Content和一个词的字符串word，找到content中所有word的新词。

新词：使用词word的字符排列形成的字符串。

请帮小华实现新词挖掘，返回发现的新词的数量。

## 输入描述

第一行输入为待挖掘的文本内容content；

第二行输入为词word；

##### 备注

  * 0 ≤ content的长度 ≤ 10000000
  * 1 ≤ word的长度 ≤ 2000

## 输出描述

在content中找到的所有word的新词的数量。

## 示例1

输入

    
    
    qweebaewqd
    qwe
    

输出

    
    
    2
    

说明

> 起始索引等于0的子串是“qwe”，它是word的新词。
>
> 起始索引等于6的子串是“ewq”，它是word的新词。

## 示例2

输入

    
    
    abab
    ab
    

输出

    
    
    3
    

## 示例3

说明

> 起始索引等于0的子串是”ab“，它是word的新词。
>
> 起始索引等于1的子串是”ba“，它是word的新词。
>
> 起始索引等于2的子串是”ab“，它是word的新词。

## 解题思路

#### 题目解析

  1. **新词的定义** ：

     * 一个新词是 `content` 中的子串，该子串包含 `word` 的所有字符，且字符排列顺序可以不同。
     * 换句话说，`content` 中的一个子串如果是 `word` 的一个排列组合，那么它就是一个新词。
  2. **题目要求** ：

     * 找到 `content` 中所有满足新词定义的子串，并返回其数量。
  3. **如何判断新词** ：

     * 可以通过检查子串的字符组成是否与 `word` 相同来判断。

#### 示例解释

  * **示例 1** ：

    * 输入：`content = "qweebaewqd"`，`word = "qwe"`
    * `word` 的字符有 `q, w, e`，可以组成 `qwe` 和 `ewq` 等排列。
    * 在 `content` 中找到两处符合条件的子串：“qwe”（起始索引 0）和 “ewq”（起始索引 6），所以输出 `2`。
  * **示例 2** ：

    * 输入：`content = "abab"`，`word = "ab"`
    * `word` 的字符有 `a, b`，可以组成 `ab` 和 `ba`。
    * 在 `content` 中找到三处符合条件的子串：“ab”（起始索引 0）、“ba”（起始索引 1）、“ab”（起始索引 2），所以输出 `3`。

## Java

    
    
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
    
            // 读取待挖掘的文本内容
            String content = scanner.next();
            // 读取目标词
            String word = scanner.next();
    
            if (content.length() < word.length()) {
                System.out.println(0);
                return;
            }
    
            int wordLength = word.length();
            int contentLength = content.length();
    
            // 统计目标词的字符频次
            int[] targetFrequency = new int[26];
            for (char c : word.toCharArray()) {
                targetFrequency[c - 'a']++;
            }
    
            // 滑动窗口的字符频次
            int[] windowFrequency = new int[26];
    
            // 初始化窗口的字符频次
            for (int i = 0; i < wordLength; i++) {
                windowFrequency[content.charAt(i) - 'a']++;
            }
    
            int newWordCount = 0;
    
            // 检查初始窗口是否匹配
            if (matches(targetFrequency, windowFrequency)) {
                newWordCount++;
            }
    
            // 滑动窗口
            for (int i = wordLength; i < contentLength; i++) {
                // 移出窗口的字符
                windowFrequency[content.charAt(i - wordLength) - 'a']--;
                // 加入窗口的新字符
                windowFrequency[content.charAt(i) - 'a']++;
    
                // 检查窗口是否匹配
                if (matches(targetFrequency, windowFrequency)) {
                    newWordCount++;
                }
            }
    
            // 输出新词的数量
            System.out.println(newWordCount);
        }
    
        // 判断两个频次数组是否匹配
        private static boolean matches(int[] targetFrequency, int[] windowFrequency) {
            for (int i = 0; i < 26; i++) {
                if (targetFrequency[i] != windowFrequency[i]) {
                    return false;
                }
            }
            return true;
        }
    }
    
    
    import java.util.Arrays;
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
    
            // 读取待挖掘的文本内容
            String content = scanner.next();
            // 读取目标词
            String word = scanner.next();
    
            if (content.length() < word.length()) {
                System.out.println(0);
                return;
            }
    
            // 对目标词的字符进行排序
            char[] sortedWordChars = word.toCharArray();
            Arrays.sort(sortedWordChars);
            String sortedWord = new String(sortedWordChars);
    
            // 初始化计数器
            int matchCount = 0;
            int wordLength = word.length();
    
            // 遍历待挖掘文本的所有子串
            for (int i = 0; i <= content.length() - wordLength; i++) {
                // 提取并排序子串
                char[] subChars = content.substring(i, i + wordLength).toCharArray();
                Arrays.sort(subChars);
                String sortedSub = new String(subChars);
    
                // 如果排序后的子串与目标词匹配，则计数器加一
                if (sortedWord.equals(sortedSub)) {
                    matchCount++;
                }
            }
    
            // 输出匹配次数
            System.out.println(matchCount);
        }
    }
    

## Python

    
    
    def matches(target_frequency, window_frequency):
        """
        判断两个频次数组是否匹配
        """
        for i in range(26):
            if target_frequency[i] != window_frequency[i]:
                return False
        return True
    
    # 读取待挖掘的文本内容
    content = input()
    # 读取目标词
    word = input()
    
    if len(content) < len(word):
        print(0)
    else:
        word_length = len(word)
        content_length = len(content)
    
        # 统计目标词的字符频次
        target_frequency = [0] * 26
        for c in word:
            target_frequency[ord(c) - ord('a')] += 1
    
        # 滑动窗口的字符频次
        window_frequency = [0] * 26
    
        # 初始化窗口的字符频次
        for i in range(word_length):
            window_frequency[ord(content[i]) - ord('a')] += 1
    
        new_word_count = 0
    
        # 检查初始窗口是否匹配
        if matches(target_frequency, window_frequency):
            new_word_count += 1
    
        # 滑动窗口
        for i in range(word_length, content_length):
            # 移出窗口的字符
            window_frequency[ord(content[i - word_length]) - ord('a')] -= 1
            # 加入窗口的新字符
            window_frequency[ord(content[i]) - ord('a')] += 1
    
            # 检查窗口是否匹配
            if matches(target_frequency, window_frequency):
                new_word_count += 1
    
        # 输出新词的数量
        print(new_word_count)
        
        
        
        
    # 导入 itertools 中的 permutations 用于排列组合
    from itertools import permutations
    
    # 读取待挖掘的文本内容
    content = input()
    # 读取目标词
    word = input()
    
    # 如果待挖掘文本长度小于目标词长度，直接输出0
    if len(content) < len(word):
        print(0)
    else:
        # 对目标词的字符进行排序
        sorted_word = ''.join(sorted(word))
        
        # 初始化计数器
        match_count = 0
        word_length = len(word)
        
        # 遍历待挖掘文本的所有子串
        for i in range(len(content) - word_length + 1):
            # 提取并排序子串
            sorted_sub = ''.join(sorted(content[i:i + word_length]))
            
            # 如果排序后的子串与目标词匹配，则计数器加一
            if sorted_word == sorted_sub:
                match_count += 1
        
        # 输出匹配次数
        print(match_count)
    

## JavaScript

    
    
    // 判断两个频次数组是否匹配
    function matches(targetFrequency, windowFrequency) {
        for (let i = 0; i < 26; i++) {
            if (targetFrequency[i] !== windowFrequency[i]) {
                return false;
            }
        }
        return true;
    }
    
    // 读取输入模块
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    // 读取文本和目标词
    readline.on("line", (content) => {
        readline.on("line", (word) => {
            if (content.length < word.length) {
                console.log(0);
            } else {
                const wordLength = word.length;
                const contentLength = content.length;
    
                // 统计目标词的字符频次
                const targetFrequency = Array(26).fill(0);
                for (const c of word) {
                    targetFrequency[c.charCodeAt(0) - 'a'.charCodeAt(0)]++;
                }
    
                // 滑动窗口的字符频次
                const windowFrequency = Array(26).fill(0);
    
                // 初始化窗口的字符频次
                for (let i = 0; i < wordLength; i++) {
                    windowFrequency[content.charCodeAt(i) - 'a'.charCodeAt(0)]++;
                }
    
                let newWordCount = 0;
    
                // 检查初始窗口是否匹配
                if (matches(targetFrequency, windowFrequency)) {
                    newWordCount++;
                }
    
                // 滑动窗口
                for (let i = wordLength; i < contentLength; i++) {
                    // 移出窗口的字符
                    windowFrequency[content.charCodeAt(i - wordLength) - 'a'.charCodeAt(0)]--;
                    // 加入窗口的新字符
                    windowFrequency[content.charCodeAt(i) - 'a'.charCodeAt(0)]++;
    
                    // 检查窗口是否匹配
                    if (matches(targetFrequency, windowFrequency)) {
                        newWordCount++;
                    }
                }
    
                // 输出新词的数量
                console.log(newWordCount);
            }
            readline.close();
        });
    });
    
    // 读取输入模块
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    // 读取待挖掘的文本内容
    readline.on("line", (content) => {
        // 读取目标词
        readline.on("line", (word) => {
            // 如果待挖掘文本长度小于目标词长度，直接输出0
            if (content.length < word.length) {
                console.log(0);
            } else {
                // 对目标词的字符进行排序
                const sortedWord = word.split('').sort().join('');
                
                // 初始化计数器
                let matchCount = 0;
                const wordLength = word.length;
                
                // 遍历待挖掘文本的所有子串
                for (let i = 0; i <= content.length - wordLength; i++) {
                    // 提取并排序子串
                    const sortedSub = content.substr(i, wordLength).split('').sort().join('');
                    
                    // 如果排序后的子串与目标词匹配，则计数器加一
                    if (sortedWord === sortedSub) {
                        matchCount++;
                    }
                }
                
                // 输出匹配次数
                console.log(matchCount);
            }
            
            // 关闭输入
            readline.close();
        });
    });
    

## C++

    
    
    #include <iostream>
    #include <string>
    #include <vector>
    using namespace std;
    
    // 判断两个频次数组是否匹配
    bool matches(const vector<int>& targetFrequency, const vector<int>& windowFrequency) {
        for (int i = 0; i < 26; i++) {
            if (targetFrequency[i] != windowFrequency[i]) {
                return false;
            }
        }
        return true;
    }
    
    int main() {
        // 读取文本和目标词
        string content, word;
      
        cin >> content;
         
        cin >> word;
    
        if (content.length() < word.length()) {
            cout << 0 << endl;
            return 0;
        }
    
        int wordLength = word.length();
        int contentLength = content.length();
    
        // 统计目标词的字符频次
        vector<int> targetFrequency(26, 0);
        for (char c : word) {
            targetFrequency[c - 'a']++;
        }
    
        // 滑动窗口的字符频次
        vector<int> windowFrequency(26, 0);
    
        // 初始化窗口的字符频次
        for (int i = 0; i < wordLength; i++) {
            windowFrequency[content[i] - 'a']++;
        }
    
        int newWordCount = 0;
    
        // 检查初始窗口是否匹配
        if (matches(targetFrequency, windowFrequency)) {
            newWordCount++;
        }
    
        // 滑动窗口
        for (int i = wordLength; i < contentLength; i++) {
            // 移出窗口的字符
            windowFrequency[content[i - wordLength] - 'a']--;
            // 加入窗口的新字符
            windowFrequency[content[i] - 'a']++;
    
            // 检查窗口是否匹配
            if (matches(targetFrequency, windowFrequency)) {
                newWordCount++;
            }
        }
    
        // 输出新词的数量
        cout << newWordCount << endl;
        return 0;
    }
    
    #include <iostream>
    #include <string>
    #include <algorithm> // 引入算法库用于排序
    using namespace std;
    
    int main() {
        // 读取待挖掘的文本内容
        string content;
     
        cin >> content;
        
        // 读取目标词
        string word;
     
        cin >> word;
        
        // 如果待挖掘文本长度小于目标词长度，直接输出0
        if (content.length() < word.length()) {
            cout << 0 << endl;
            return 0;
        }
        
        // 对目标词的字符进行排序
        string sortedWord = word;
        sort(sortedWord.begin(), sortedWord.end());
        
        // 初始化计数器
        int matchCount = 0;
        int wordLength = word.length();
        
        // 遍历待挖掘文本的所有子串
        for (int i = 0; i <= content.length() - wordLength; i++) {
            // 提取并排序子串
            string sortedSub = content.substr(i, wordLength);
            sort(sortedSub.begin(), sortedSub.end());
            
            // 如果排序后的子串与目标词匹配，则计数器加一
            if (sortedWord == sortedSub) {
                matchCount++;
            }
        }
        
        // 输出匹配次数
        cout << matchCount << endl;
        return 0;
    }
    

## C语言

    
    
    #include <stdio.h>
    #include <string.h>
    #include <stdbool.h>
    
    // 判断两个频次数组是否匹配
    bool matches(int targetFrequency[], int windowFrequency[]) {
        for (int i = 0; i < 26; i++) {
            if (targetFrequency[i] != windowFrequency[i]) {
                return false;
            }
        }
        return true;
    }
    
    int main() {
        char content[100], word[100];
        
        // 读取文本和目标词
     
        scanf("%s", content);
     
        scanf("%s", word);
    
        int contentLength = strlen(content);
        int wordLength = strlen(word);
    
        if (contentLength < wordLength) {
            printf("0\n");
            return 0;
        }
    
        // 统计目标词的字符频次
        int targetFrequency[26] = {0};
        for (int i = 0; i < wordLength; i++) {
            targetFrequency[word[i] - 'a']++;
        }
    
        // 滑动窗口的字符频次
        int windowFrequency[26] = {0};
    
        // 初始化窗口的字符频次
        for (int i = 0; i < wordLength; i++) {
            windowFrequency[content[i] - 'a']++;
        }
    
        int newWordCount = 0;
    
        // 检查初始窗口是否匹配
        if (matches(targetFrequency, windowFrequency)) {
            newWordCount++;
        }
    
        // 滑动窗口
        for (int i = wordLength; i < contentLength; i++) {
            // 移出窗口的字符
            windowFrequency[content[i - wordLength] - 'a']--;
            // 加入窗口的新字符
            windowFrequency[content[i] - 'a']++;
    
            // 检查窗口是否匹配
            if (matches(targetFrequency, windowFrequency)) {
                newWordCount++;
            }
        }
    
        // 输出新词的数量
        printf("%d\n", newWordCount);
        return 0;
    }
    
    
    
    #include <stdio.h>
    #include <string.h>
    #include <stdlib.h> // 引入标准库用于排序
    
    // 自定义比较函数用于 qsort 排序
    int cmp(const void *a, const void *b) {
        return *(char *)a - *(char *)b;
    }
    
    int main() {
        char content[100];
        char word[100];
        
     
        scanf("%s", content);
        
     
        scanf("%s", word);
        
        // 获取文本和词的长度
        int contentLength = strlen(content);
        int wordLength = strlen(word);
        
        // 如果待挖掘文本长度小于目标词长度，直接输出0
        if (contentLength < wordLength) {
            printf("0\n");
            return 0;
        }
        
        // 对目标词的字符进行排序
        char sortedWord[100];
        strcpy(sortedWord, word);  // 复制目标词到新的数组
        qsort(sortedWord, wordLength, sizeof(char), cmp);
        
        // 初始化计数器
        int matchCount = 0;
        
        // 遍历待挖掘文本的所有子串
        for (int i = 0; i <= contentLength - wordLength; i++) {
            // 提取子串并排序
            char sub[100];
            strncpy(sub, content + i, wordLength);  // 提取子串
            sub[wordLength] = '\0'; // 手动添加字符串结束符
            qsort(sub, wordLength, sizeof(char), cmp);
            
            // 如果排序后的子串与目标词匹配，则计数器加一
            if (strcmp(sortedWord, sub) == 0) {
                matchCount++;
            }
        }
        
        // 输出匹配次数
        printf("%d\n", matchCount);
        return 0;
    }
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/8cb41efb63ffe7c778546ef526cbbc3e.png)

