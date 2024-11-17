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
    
    

#### JavaScript

    
    
    const readline = require('readline');
    
    // 判断字符是否为合法字符（字母或数字）
    function isValidCharacter(ch) {
        return /^[a-zA-Z0-9]$/.test(ch);
    }
    
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    rl.on('line', (inputString) => {
        let processedString = '';
        for (let i = 0; i < inputString.length; ++i) {
            const currentChar = inputString.charAt(i);
    
            // 如果当前字符是合法字符（字母或数字），则将其添加到处理后的字符串中
            if (isValidCharacter(currentChar)) {
                processedString += currentChar;
            }
            // 如果当前字符是连字符，并且前一个字符和后一个字符都是合法字符，则将连字符添加到处理后的字符串中
            else if (currentChar === '-' && i > 0 && isValidCharacter(inputString.charAt(i - 1)) && i < inputString.length - 1 && isValidCharacter(inputString.charAt(i + 1))) {
                processedString += '-';
            }
            // 否则，将一个空格添加到处理后的字符串中
            else {
                processedString += ' ';
            }
        }
    
        const wordsList = [];
        // 将处理后的字符串按空格分割为单词数组
        const words = processedString.split(/\s+/);
        // 将单词数组倒序排列
        words.reverse();
        // 将倒序排列后的单词添加到单词列表中
        wordsList.push(...words);
    
        let result = '';
        // 将单词列表中的单词逐个添加到结果字符串中，并在单词之间添加一个空格
        for (const word of wordsList) {
            result += word + ' ';
        }
        // 如果结果字符串的长度大于0，则删除最后一个字符（多余的空格）
        if (result.length > 0) {
            result = result.slice(0, -1);
        }
    
        // 输出结果字符串
        console.log(result);
    
        rl.close();
    });
    
    

#### Java

    
    
    import java.util.*;
    
    public class Main {
        // 判断字符是否为合法字符（字母或数字）
        public static boolean isValidCharacter(char ch) {
            return Character.isLetterOrDigit(ch);
        }
    
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            String inputString = scanner.nextLine();
    
            StringBuilder processedString = new StringBuilder();
            for (int i = 0; i < inputString.length(); ++i) {
                char currentChar = inputString.charAt(i);
    
                // 如果当前字符是合法字符（字母或数字），则将其添加到处理后的字符串中
                if (isValidCharacter(currentChar)) {
                    processedString.append(currentChar);
                }
                // 如果当前字符是连字符，并且前一个字符和后一个字符都是合法字符，则将连字符添加到处理后的字符串中
                else if (currentChar == '-' && i > 0 && isValidCharacter(inputString.charAt(i - 1)) && i < inputString.length() - 1 && isValidCharacter(inputString.charAt(i + 1))) {
                    processedString.append('-');
                }
                // 否则，将一个空格添加到处理后的字符串中
                else {
                    processedString.append(' ');
                }
            }
    
            List<String> wordsList = new ArrayList<>();
            // 将处理后的字符串按空格分割为单词数组
            String[] words = processedString.toString().split("\\s+");
            // 将单词数组倒序排列
            Collections.reverse(Arrays.asList(words));
            // 将倒序排列后的单词添加到单词列表中
            wordsList.addAll(Arrays.asList(words));
    
            StringBuilder result = new StringBuilder();
            // 将单词列表中的单词逐个添加到结果字符串中，并在单词之间添加一个空格
            for (String word : wordsList) {
                result.append(word).append(" ");
            }
            // 如果结果字符串的长度大于0，则删除最后一个字符（多余的空格）
            if (result.length() > 0) {
                result.deleteCharAt(result.length() - 1);
            }
    
            // 输出结果字符串
            System.out.println(result.toString());
        }
    }
    
    

#### Python

    
    
    import re
    
    # 判断字符是否为合法字符（字母或数字）
    def is_valid_character(ch):
        return re.match(r'^[a-zA-Z0-9]$', ch) is not None
    
    input_string = input('')
    
    processed_string = ''
    for i in range(len(input_string)):
        current_char = input_string[i]
    
        # 如果当前字符是合法字符（字母或数字），则将其添加到处理后的字符串中
        if is_valid_character(current_char):
            processed_string += current_char
        # 如果当前字符是连字符，并且前一个字符和后一个字符都是合法字符，则将连字符添加到处理后的字符串中
        elif current_char == '-' and i > 0 and is_valid_character(input_string[i - 1]) and i < len(input_string) - 1 and is_valid_character(input_string[i + 1]):
            processed_string += '-'
        # 否则，将一个空格添加到处理后的字符串中
        else:
            processed_string += ' '
    
    words_list = []
    # 将处理后的字符串按空格分割为单词列表
    words = re.split(r'\s+', processed_string)
    # 将单词列表倒序排列
    words.reverse()
    # 将倒序排列后的单词添加到单词列表中
    words_list.extend(words)
    
    result = ' '.join(words_list)
    # 如果结果字符串的长度大于0，则删除最后一个字符（多余的空格）
    if len(result) > 0:
        result = result[:-1]
    
    # 输出结果字符串
    print(result)
    
    

#### 文章目录

  *     *       * 题目描述
      * 输入描述
      * 输出描述
      * 用例
      * C++
      * JavaScript
      * Java
      * Python

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

