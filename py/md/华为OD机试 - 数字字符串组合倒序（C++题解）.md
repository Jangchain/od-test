#### 题目描述

对数字，字符，数字串，字符串，以及数字与字符串组合进行倒序排列。

字符范围：由 a 到 z， A 到 Z，

数字范围：由 0 到 9

符号的定义：

  * “-”作为连接符使用时作为字符串的一部分，例如“20-years”作为一个整体字符串呈现；
  * 连续出现 2 个 “-” 及以上时视为字符串间隔符，如“out–standing”中的”–“视为间隔符，是 2 个独立整体字符串”out”和”standing”；
  * 除了 1，2 里面定义的字符以外其他的所有字符，都是非法字符，作为字符串的间隔符处理，倒序后间隔符作为空格处理；
  * 要求倒排后的单词间隔符以一个空格表示；如果有多个间隔符时，倒排转换后也只允许出现一个字格间隔符；

#### 输入描述

无

#### 输出描述

无

#### 用例

输入| I am an 20-years out--standing @ * -stu- dent  
---|---  
输出| dent stu standing out 20-years an am I  
说明| 无  
  
#### C++

    
    
    #include <iostream>
    #include <vector>
    #include <algorithm>
    
    // 判断字符是否为合法字符（字母或数字）
    bool isValidCharacter(char ch) {
        return std::isalnum(ch);
    }
    
    int main() {
        std::string inputString;
        std::getline(std::cin, inputString);
    
        std::string processedString;
        for (int i = 0; i < inputString.length(); ++i) {
            char currentChar = inputString[i];
    
            // 如果当前字符是合法字符（字母或数字），则将其添加到处理后的字符串中
            if (isValidCharacter(currentChar)) {
                processedString += currentChar;
            }
            // 如果当前字符是连字符，并且前一个字符和后一个字符都是合法字符，则将连字符添加到处理后的字符串中
            else if (currentChar == '-' && i > 0 && isValidCharacter(inputString[i - 1]) && i < inputString.length() - 1 && isValidCharacter(inputString[i + 1])) {
                processedString += '-';
            }
            // 否则，将一个空格添加到处理后的字符串中
            else {
                processedString += ' ';
            }
        }
    
        std::vector<std::string> wordsList;
        std::string word;
        for (char ch : processedString) {
            // 如果字符是空格，则将当前单词添加到单词列表中，并重置单词变量
            if (ch == ' ') {
                if (!word.empty()) {
                    wordsList.push_back(word);
                    word.clear();
                }
            }
            // 如果字符不是空格，则将其添加到当前单词中
            else {
                word += ch;
            }
        }
    
        // 如果最后一个单词不为空，则将其添加到单词列表中
        if (!word.empty()) {
            wordsList.push_back(word);
        }
    
        std::reverse(wordsList.begin(), wordsList.end());
    
        std::string result;
        for (const std::string& word : wordsList) {
            result += word + ' ';
        }
    
        // 删除结果字符串末尾的空格
        if (!result.empty()) {
            result.pop_back();
        }
    
        // 输出结果字符串
        std::cout << result << std::endl;
    
        return 0;
    }
    
    

#### 文章目录

  *     *       * 题目描述
      * 输入描述
      * 输出描述
      * 用例
      * C++

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

