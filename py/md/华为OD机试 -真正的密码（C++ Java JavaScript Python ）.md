#### 题目描述

在一行中输入一个字符串数组，如果其中一个字符串的所有以索引0开头的子串在数组中都有，那么这个字符串就是潜在密码，

在所有潜在密码中最长的是真正的密码，如果有多个长度相同的真正的密码，那么取字典序最大的为唯一的真正的密码，求唯一的真正的密码。

#### 输入描述

无

#### 输出描述

无

#### 用例

输入| h he hel hell hello o ok n ni nin ninj ninja  
---|---  
输出| ninja  
说明|
按要求，hello、ok、[ninja](https://so.csdn.net/so/search?q=ninja&spm=1001.2101.3001.7020)都是潜在密码。检查长度，hello、ninja是真正的密码。检查字典序，ninja是唯一真正密码。  
输入| a b c d f  
---|---  
输出| f  
说明| 按要求，a b c d f 都是潜在密码。检查长度，a b c d f 是真正的密码。检查字典序，f是唯一真正密码。  
  
#### 题目解析

##### 分析

我们以样例1 来分析题目：

已经知道：hello、ok、ninja是潜在密码。

这是为啥呢？其实很简单

**一个字符串的所有以索引0开头的子串在**
这句话是重点。以hello为例，他以索引0为开头的字串是？也就是以h开头的字串是？h，he,hel,hell,hell0。这五个字串。

然后这5个字串同样都在输入的数组中，所有hello是潜在的密码。

同理ok、ninja也是潜在的密码。

hello、ok、ninja最长的是hello和ninja。

然后再根据字典序判断出ninja是唯一的真正密码。

#### 解题思路

  1. **处理输入** ：首先，需要读取输入并将其拆分为单词数组。

  2. **创建哈希集合** ：为了快速检查一个子串是否在输入数组中，将输入数组中的所有字符串放入一个哈希集合。

  3. **初始化解答** ：初始化一个空字符串作为解答。在后续的循环中，将根据条件更新这个解答。

  4. **按顺序检查每一个词** ：遍历输入数组中的每一个单词，对于每一个单词，检查它是否满足以下条件：

a. **检查所有以索引 0 开头的子串** ：遍历当前单词的所有以索引 0
开头的子串，检查这些子串是否都在哈希集合中。如果所有子串都在哈希集合中，说明当前单词满足条件 1。

b. **比较解答长度** ：如果当前单词满足条件 1，接下来比较当前单词的长度与解答的长度。如果当前单词的长度大于解答的长度，将当前单词设置为新的解答。

c. **比较解答字典排序** ：如果当前单词满足条件 1
且长度与解答相同，比较当前单词与解答的字典序。如果当前单词的字典序大于解答的字典序，将当前单词设置为新的解答。

  5. **输出解答** ：遍历完输入数组后，输出最终的解答。

#### C++

    
    
    #include <iostream>
    #include <string>
    #include <vector>
    #include <unordered_set>
    #include <sstream>
    
    int main() {
        // 处理输入
        std::string input_line;
        std::getline(std::cin, input_line);
        std::istringstream iss(input_line);
        std::string word;
        std::vector<std::string> inputs;
        while (iss >> word) {
            inputs.push_back(word);
        }
    
        // 将所有字符串放入哈希集合
        std::unordered_set<std::string> wordSet(inputs.begin(), inputs.end());
    
        // 真正的解答
        std::string realAnswer = "";
    
        // 按顺序检查每一个词
        for (const std::string& input : inputs) {
            // 条件1：检查这个词所有以索引0开头的子串在数组中是否都有
            bool hasAllPrefixes = true;
            for (size_t i = 1; i < input.length(); i++) {
                // 以索引0开头的子串
                std::string prefix = input.substr(0, i);
                if (wordSet.find(prefix) == wordSet.end()) {
                    hasAllPrefixes = false;
                    break;
                }
            }
    
            if (hasAllPrefixes) {
                // 条件2：比较解答长度
                if (input.length() > realAnswer.length())
                    realAnswer = input;
                // 条件3：比较解答字典排序
                if (input.length() == realAnswer.length() && input > realAnswer) {
                    realAnswer = input;
                }
            }
        }
    
        std::cout << realAnswer << std::endl;
    }
    
    

#### JaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    rl.on('line', (input_line) => {
        // 处理输入
        const inputs = input_line.split(' ');
    
        // 将所有字符串放入哈希集合
        const wordSet = new Set(inputs);
    
        // 真正的解答
        let realAnswer = '';
    
        // 按顺序检查每一个词
        for (const input_word of inputs) {
            // 条件1：检查这个词所有以索引0开头的子串在数组中是否都有
            let hasAllPrefixes = true;
            for (let i = 1; i < input_word.length; i++) {
                // 以索引0开头的子串
                const prefix = input_word.substring(0, i);
                if (!wordSet.has(prefix)) {
                    hasAllPrefixes = false;
                    break;
                }
            }
    
            if (hasAllPrefixes) {
                // 条件2：比较解答长度
                if (input_word.length > realAnswer.length)
                    realAnswer = input_word;
                // 条件3：比较解答字典排序
                if (input_word.length === realAnswer.length && input_word > realAnswer) {
                    realAnswer = input_word;
                }
            }
        }
    
        console.log(realAnswer);
        rl.close();
    });
    
    

#### Java

    
    
    import java.util.Scanner;
    import java.util.HashSet;
    
    class Main {
        public static void main(String[] args) {
            // 处理输入
            Scanner scanner = new Scanner(System.in);
            String[] inputs = scanner.nextLine().split(" ");
    
            // 将所有字符串放入哈希集合
            HashSet<String> wordSet = new HashSet<>();
            for (String input : inputs) {
                wordSet.add(input);
            }
    
            // 真正的解答
            String realAnswer = "";
    
            // 按顺序检查每一个词
            for (String input : inputs) {
                // 条件1：检查这个词所有以索引0开头的子串在数组中是否都有
                boolean hasAllPrefixes = true;
                for (int i = 1; i < input.length(); i++) {
                    // 以索引0开头的子串
                    String prefix = input.substring(0, i);
                    if (!wordSet.contains(prefix)) {
                        hasAllPrefixes = false;
                        break;
                    }
                }
    
                if (hasAllPrefixes) {
                    // 条件2：比较解答长度
                    if (input.length() > realAnswer.length())
                        realAnswer = input;
                    // 条件3：比较解答字典排序
                    if (input.length() == realAnswer.length() && input.compareTo(realAnswer) > 0) {
                        realAnswer = input;
                    }
                }
            }
    
            System.out.println(realAnswer);
        }
    }
    
     
    

#### Python

    
    
    # 处理输入
    inputs = input().split()
    
    # 将所有字符串放入哈希集合
    word_set = set(inputs)
    
    # 真正的解答
    real_answer = ""
    
    # 按顺序检查每一个词
    for input_word in inputs:
        # 条件1：检查这个词所有以索引0开头的子串在数组中是否都有
        has_all_prefixes = True
        for i in range(1, len(input_word)):
            # 以索引0开头的子串
            prefix = input_word[:i]
            if prefix not in word_set:
                has_all_prefixes = False
                break
    
        if has_all_prefixes:
            # 条件2：比较解答长度
            if len(input_word) > len(real_answer):
                real_answer = input_word
            # 条件3：比较解答字典排序
            if len(input_word) == len(real_answer) and input_word > real_answer:
                real_answer = input_word
    
    print(real_answer)
    
    

#### 文章目录

  *     *       * 题目描述
      * 输入描述
      * 输出描述
      * 用例
      * 题目解析
      *         * 分析
      * 解题思路
      * C++
      * JaScript
      * Java
      * Python

![fengmian](https://img-
blog.csdnimg.cn/img_convert/1d2f33ed8cf2fb1b9a4fe09513f7aa94.png)

