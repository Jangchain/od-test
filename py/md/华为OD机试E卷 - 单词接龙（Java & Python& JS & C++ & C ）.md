## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

单词接龙的规则是：

  * 可用于接龙的单词首字母必须要前一个单词的尾字母相同；

  * 当存在多个首字母相同的单词时，取长度最长的单词，如果长度也相等，则取字典序最小的单词；已经参与接龙的单词不能重复使用。

现给定一组全部由小写字母组成单词数组，并指定其中的一个单词作为起始单词，进行单词接龙，

请输出最长的单词串，单词串是单词拼接而成，中间没有空格。

## 输入描述

输入的第一行为一个非负整数，表示起始单词在数组中的索引K，0 <= K < N ；

输入的第二行为一个非负整数，表示单词的个数N；

接下来的N行，分别表示单词数组中的单词。

备注：

  * 单词个数N的取值范围为[1, 20]；
  * 单个单词的长度的取值范围为[1, 30]；

## 输出描述

输出一个字符串，表示最终拼接的单词串。

## 示例1

输入

    
    
    0
    6
    word
    dd
    da
    dc
    dword
    d
    

输出

    
    
    worddwordda
    

说明

>
> 先确定起始单词word，再接以d开头的且长度最长的单词dword，剩余以d开头且长度最长的有dd、da、dc，则取字典序最小的da，所以最后输出worddwordda。

## 示例2

输入

    
    
    4
    6
    word
    dd
    da
    dc
    dword
    d
    

输出

    
    
    dwordda
    

说明

> 先确定起始单词dword，剩余以d开头且长度最长的有dd、da、dc，则取字典序最小的da，所以最后输出dwordda。

## 解题思路

  1. **接龙规则** ： 
     * 下一个接龙的单词必须以前一个单词的**尾字母** 开头。
     * 当有多个符合条件的单词时： 
       * 优先选择**长度最长的单词** ；
       * 如果长度相等，选择**字典序最小的单词** 。
     * **已经使用的单词不能重复使用** 。

#### 解题步骤

  1. **确定起始单词** ：从输入的 `K` 索引中找到起始单词。
  2. **根据接龙规则选择后续单词** ： 
     * 选择以当前单词尾字母开头的单词。
     * 先选长度最长的单词；若长度相等，选字典序最小的单词。
     * 将这个单词接到当前的结果串中，重复这个过程，直到没有可以接龙的单词为止。
  3. **输出结果** ：将最终拼接的单词串输出。

#### 示例解析

**示例1** ：

  * 输入：
    
        0
    6
    word
    dd
    da
    dc
    dword
    d
    

  * 步骤： 
    * 起始单词为 `word`，其尾字母是 `d`。
    * 从剩下的单词中，选择以 `d` 开头的且长度最长的单词，得到 `dword`。
    * 再次寻找以 `d` 开头的单词，此时剩下的有 `dd`、`da`、`dc`，长度相等，选字典序最小的 `da`。
  * 最终输出为：`worddwordda`。

**示例2** ：

  * 输入：
    
        4
    6
    word
    dd
    da
    dc
    dword
    d
    

  * 步骤： 
    * 起始单词为 `dword`，尾字母是 `d`。
    * 以 `d` 开头且长度最长的单词中，选 `da`（字典序最小）。
  * 最终输出为：`dwordda`。

## Java

    
    
    import java.util.*;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            
            // 输入起始单词的索引
            int startIndex = Integer.parseInt(scanner.nextLine());
            
            // 输入单词的个数
            int number = Integer.parseInt(scanner.nextLine());
            
            // 创建一个存储单词的列表
            List<String> wordList = new ArrayList<>();
            
            // 循环读取单词并添加到列表中
            for (int i = 0; i < number; i++) {
                wordList.add(scanner.nextLine());
            }
            
            // 初始化结果字符串为起始单词
            String result = wordList.get(startIndex);
            
            // 从列表中移除起始单词
            wordList.remove(startIndex);
            
            // 获取下一个符合条件的单词
            String nextWord = getNextWord(wordList, result.charAt(result.length() - 1));
            
            // 循环直到没有符合条件的单词为止
            while (nextWord != null) {
                // 拼接下一个单词到结果字符串
                result += nextWord;
                
                // 从列表中移除已使用的单词
                wordList.remove(nextWord);
                
                // 获取下一个符合条件的单词
                nextWord = getNextWord(wordList, result.charAt(result.length() - 1));
            }
            
            // 输出最终拼接的单词串
            System.out.println(result);
        }
    
        public static String getNextWord(List<String> wordList, char suffix) {
            // 创建一个映射表，键为单词的首字母，值为以该首字母开头的单词列表
            Map<Character, List<String>> map = new HashMap<>();
            
            // 遍历单词列表，将单词按首字母分类存储到映射表中
            for (String word : wordList) {
                char firstChar = word.charAt(0);
                List<String> tempList = map.getOrDefault(firstChar, new ArrayList<>());
                tempList.add(word);
                map.put(firstChar, tempList);
            }
            
            // 初始化最长长度和字典序最小的单词
            int maxLength = 0;
            String minWord = "";
            
            // 获取以suffix为首字母的单词列表
            List<String> tempList = map.get(suffix);
            
            // 如果列表为空，则没有符合条件的单词，返回null
            if (tempList == null || tempList.isEmpty()) {
                return null;
            }
            
            // 遍历单词列表，找到最长长度和字典序最小的单词
            for (String word : tempList) {
                if (word.length() > maxLength || (word.length() == maxLength && word.compareTo(minWord) < 0)) {
                    maxLength = word.length();
                    minWord = word;
                }
            }
            
            // 如果最小单词为空，则没有符合条件的单词，返回null
            return minWord.isEmpty() ? null : minWord;
        }
    }
    
    

## Python

    
    
    import sys
    
    def getNextWord(wordList, suffix):
        # 创建一个映射表，键为单词的首字母，值为以该首字母开头的单词列表
        map = {}
        
        # 遍历单词列表，将单词按首字母分类存储到映射表中
        for word in wordList:
            firstChar = word[0]
            tempList = map.get(firstChar, [])
            tempList.append(word)
            map[firstChar] = tempList
        
        # 初始化最长长度和字典序最小的单词
        maxLength = 0
        minWord = ""
        
        # 获取以suffix为首字母的单词列表
        tempList = map.get(suffix)
        
        # 如果列表为空，则没有符合条件的单词，返回None
        if not tempList:
            return None
        
        # 遍历单词列表，找到最长长度和字典序最小的单词
        for word in tempList:
            if len(word) > maxLength or (len(word) == maxLength and word < minWord):
                maxLength = len(word)
                minWord = word
        
        # 如果最小单词为空，则没有符合条件的单词，返回None
        return minWord if minWord else None
    
    if __name__ == "__main__":
        # 输入起始单词的索引
        startIndex = int(input())
        
        # 输入单词的个数
        number = int(input())
        
        # 创建一个存储单词的列表
        wordList = [input().strip() for _ in range(number)]
    
        
        # 初始化结果字符串为起始单词
        result = wordList[startIndex]
        
        # 从列表中移除起始单词
        wordList.pop(startIndex)
        
        # 获取下一个符合条件的单词
        nextWord = getNextWord(wordList, result[-1])
        
        # 循环直到没有符合条件的单词为止
        while nextWord:
            # 拼接下一个单词到结果字符串
            result += nextWord
            
            # 从列表中移除已使用的单词
            wordList.remove(nextWord)
            
            # 获取下一个符合条件的单词
            nextWord = getNextWord(wordList, result[-1])
        
        # 输出最终拼接的单词串
        print(result)
    
    

## JavaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    // 根据当前单词列表和后缀字母获取下一个单词
    function getNextWord(wordList, suffix) {
        let map = {};
        
        // 将单词按首字母分组存储在map中
        for (let word of wordList) {
            let firstChar = word[0];
            let tempList = map[firstChar] || [];
            tempList.push(word);
            map[firstChar] = tempList;
        }
        
        let maxLength = 0;
        let minWord = "";
        
        // 获取与后缀字母相同的单词列表
        let tempList = map[suffix];
        
        if (!tempList) {
            return null;
        }
        
        // 遍历单词列表，找到长度最长且字典序最小的单词
        for (let word of tempList) {
            if (word.length > maxLength || (word.length === maxLength && word < minWord)) {
                maxLength = word.length;
                minWord = word;
            }
        }
        
        return minWord || null;
    }
    
    let startIndex = -1;
    let number = -1;
    let wordList = [];
    let count = 0;
    
    rl.on("line", (line) => {
        // 读取输入的起始单词索引
        if(startIndex ===-1){
            startIndex = parseInt(line);
        }
        // 读取输入的单词个数
        else if(number ===-1 ){
            number = parseInt(line);
        }
        // 读取输入的单词列表
        else{
            wordList.push(line.trim());
            count++;
    
            // 当读取完所有单词时，开始进行单词接龙
            if (count === number) {
                rl.close();
    
                let result = wordList[startIndex];
                wordList.splice(startIndex, 1);
    
                let nextWord = getNextWord(wordList, result[result.length - 1]);
    
                // 循环找到下一个单词并拼接到结果中，直到找不到下一个单词为止
                while (nextWord) {
                    result += nextWord;
                    wordList.splice(wordList.indexOf(nextWord), 1);
                    nextWord = getNextWord(wordList, result[result.length - 1]);
                }
    
                console.log(result);
            }
        }
    });
    
    

## C++

    
    
    #include <iostream>
    #include <vector>
    #include <map>
    #include <algorithm>
    using namespace std;
    
    string getNextWord(vector<string>& wordList, char suffix) {
        // 创建一个映射表，键为单词的首字母，值为以该首字母开头的单词列表
        map<char, vector<string>> wordMap;
        
        // 遍历单词列表，将单词按首字母分类存储到映射表中
        for (string word : wordList) {
            char firstChar = word[0];
            vector<string>& tempList = wordMap[firstChar];
            tempList.push_back(word);
        }
        
        // 初始化最长长度和字典序最小的单词
        int maxLength = 0;
        string minWord = "";
        
        // 获取以suffix为首字母的单词列表
        vector<string>& tempList = wordMap[suffix];
        
        // 如果列表为空，则没有符合条件的单词，返回空字符串
        if (tempList.empty()) {
            return "";
        }
        
        // 遍历单词列表，找到最长长度和字典序最小的单词
        for (string word : tempList) {
            if (word.length() > maxLength || (word.length() == maxLength && word.compare(minWord) < 0)) {
                maxLength = word.length();
                minWord = word;
            }
        }
        
        // 如果最小单词为空，则没有符合条件的单词，返回空字符串
        return minWord.empty() ? "" : minWord;
    }
    
    int main() {
        // 输入起始单词的索引
        int startIndex;
        cin >> startIndex;
        
        // 输入单词的个数
        int number;
        cin >> number;
        
        // 创建一个存储单词的列表
        vector<string> wordList;
        
        // 循环读取单词并添加到列表中
        for (int i = 0; i < number; i++) {
            string word;
            cin >> word;
            wordList.push_back(word);
        }
        
        // 初始化结果字符串为起始单词
        string result = wordList[startIndex];
        
        // 从列表中移除起始单词
        wordList.erase(wordList.begin() + startIndex);
        
        // 获取下一个符合条件的单词
        string nextWord = getNextWord(wordList, result[result.length() - 1]);
        
        // 循环直到没有符合条件的单词为止
        while (!nextWord.empty()) {
            // 拼接下一个单词到结果字符串
            result += nextWord;
            
            // 从列表中移除已使用的单词
            wordList.erase(remove(wordList.begin(), wordList.end(), nextWord), wordList.end());
            
            // 获取下一个符合条件的单词
            nextWord = getNextWord(wordList, result[result.length() - 1]);
        }
        
        // 输出最终拼接的单词串
        cout << result << endl;
        
        return 0;
    }
    
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    #include <string.h>
    
    // 定义一个宏来表示最大单词数量
    #define MAX_WORDS 20
    // 定义一个宏来表示最大单词长度
    #define MAX_WORD_LENGTH 30
    
    // 函数声明
    char* getNextWord(char** wordList, int* wordCount, char suffix);
    
    int main() {
        // 定义变量来存储起始索引和单词数量
        int startIndex, number;
        
        // 输入起始单词的索引
        scanf("%d", &startIndex);
        
        // 输入单词的个数
        scanf("%d", &number);
        
        // 创建一个存储单词的数组
        char* wordList[MAX_WORDS];
        for (int i = 0; i < number; i++) {
            // 为每个单词分配空间
            wordList[i] = (char*)malloc((MAX_WORD_LENGTH + 1) * sizeof(char));
            // 读取每个单词
            scanf("%s", wordList[i]);
        }
        
        // 初始化结果字符串为起始单词
        char result[MAX_WORDS * (MAX_WORD_LENGTH + 1)] = ""; // 最大可能长度
        strcpy(result, wordList[startIndex]);
        
        // 将起始单词从数组中移除
        free(wordList[startIndex]);
        for (int i = startIndex; i < number - 1; i++) {
            wordList[i] = wordList[i + 1];
        }
        number--; // 减少单词计数
        
        // 获取下一个符合条件的单词
        char nextWord[MAX_WORD_LENGTH + 1];
        char* nextWordPtr = getNextWord(wordList, &number, result[strlen(result) - 1]);
        
        // 循环直到没有符合条件的单词为止
        while (nextWordPtr != NULL) {
            // 拼接下一个单词到结果字符串
            strcat(result, nextWordPtr);
            
            // 从数组中移除已使用的单词
            for (int i = 0; i < number; i++) {
                if (strcmp(wordList[i], nextWordPtr) == 0) {
                    free(wordList[i]);
                    for (int j = i; j < number - 1; j++) {
                        wordList[j] = wordList[j + 1];
                    }
                    number--; // 减少单词计数
                    break;
                }
            }
            
            // 获取下一个符合条件的单词
            nextWordPtr = getNextWord(wordList, &number, result[strlen(result) - 1]);
        }
        
        // 输出最终拼接的单词串
        printf("%s\n", result);
        
        // 释放所有剩余单词的内存
        for (int i = 0; i < number; i++) {
            free(wordList[i]);
        }
        
        return 0;
    }
    
    // 获取下一个符合条件的单词
    char* getNextWord(char** wordList, int* wordCount, char suffix) {
        int maxLength = 0; // 用于存储最长的单词长度
        char* minWord = NULL; // 用于存储字典序最小的单词
        
        // 遍历单词列表
        for (int i = 0; i < *wordCount; i++) {
            if (wordList[i][0] == suffix) { // 如果单词的首字母与给定的suffix相同
                int wordLength = strlen(wordList[i]);
                // 找到最长长度和字典序最小的单词
                if (wordLength > maxLength || 
                    (wordLength == maxLength && (minWord == NULL || strcmp(wordList[i], minWord) < 0))) {
                    maxLength = wordLength;
                    minWord = wordList[i];
                }
            }
        }
        
        // 返回找到的符合条件的单词或NULL
        return minWord;
    }
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b0d8ff6d53693bfcf6e1605b507f3ae3.png)

#### 完整用例

##### 用例1

    
    
    0
    6
    word
    dd
    da
    dc
    dword
    d
    

##### 用例2

    
    
    2
    4
    abc
    bcd
    cde
    def
    

##### 用例3

    
    
    1
    3
    apple
    elephant
    tiger
    

##### 用例4

    
    
    0
    5
    cat
    dog
    goat
    tiger
    rat
    

##### 用例5

    
    
    3
    6
    banana
    apple
    elephant
    tiger
    rat
    goat
    

##### 用例6

    
    
    0
    7
    word
    dd
    da
    dc
    dword
    d
    ddd
    

##### 用例7

    
    
    2
    5
    abc
    bcd
    cde
    def
    efg
    

##### 用例8

    
    
    1
    4
    apple
    elephant
    tiger
    rat
    

##### 用例9

    
    
    0
    6
    cat
    dog
    goat
    tiger
    rat
    car
    

##### 用例10

    
    
    3
    7
    banana
    apple
    elephant
    tiger
    rat
    goat
    car
    

