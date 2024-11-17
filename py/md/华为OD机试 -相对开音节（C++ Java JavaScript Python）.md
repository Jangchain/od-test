## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

#### 题目描述

相对开音节构成的结构为辅音+元音（aeiou）+辅音(r除外)+e，常见的单词有bike、cake等。

给定一个字符串，以空格为分隔符，反转每个单词中的字母，若单词中包含如数字等其他非字母时不进行反转。

反转后计算其中含有相对开音节结构的子串个数（连续的子串中部分字符可以重复）。

#### 输入描述

字符串，以空格分割的多个单词，字符串长度<10000，字母只考虑小写

#### 输出描述

含有相对开音节结构的子串个数，注：个数<10000

#### 用例

输入| ekam a ekac  
---|---  
输出| 2  
说明| 反转后为 make a cake 其中make、cake为相对开音节子串，返回2。  
输入| !ekam a ekekac  
---|---  
输出| 2  
说明| 反转后为!ekam a cakeke 因!ekam含非英文字符所以未反转，其中 cake、keke为相对开音节子串，返回2。  
  
#### C++

    
    
    #include <iostream>
    #include <vector>
    #include <string>
    #include <algorithm>
    
    using namespace std;
    
    // 检查是否满足相对开音节结构
    bool checkStructure(char c1, char c2, char c3, char c4) {
        string vowel("aeiou"); // 元音字母
        string vowel1("aeiour"); // 元音字母+辅音字母r
        return (c4 == 'e') && (vowel.find(c2) != string::npos) && (vowel.find(c1) == string::npos) && isalpha(c1) && (vowel1.find(c3) == string::npos) && ('a' <= c3 && c3 <= 'z');
    }
    
    // 检查字符串是否只包含字母
    bool isAlpha(const string& str) {
        return all_of(str.begin(), str.end(), [](char c) { return isalpha(c); });
    }
    
    int main() {
        string line;
        getline(cin, line); // 输入字符串
        
        vector<string> words; // 存储分割后的单词
        string word;
        for (char c : line) { // 遍历输入字符串的每个字符
            if (c == ' ') { // 遇到空格，表示一个单词结束
                words.push_back(word); // 将单词加入到单词列表中
                word = ""; // 重置单词字符串
            } else {
                word += c; // 组合单词字符串
            }
        }
        words.push_back(word); // 将最后一个单词加入到单词列表中
    
        int result = 0; // 记录含有相对开音节结构的子串个数
        for (auto &w: words) { // 遍历每个单词
            if (w.length() < 4) // 如果单词长度小于4，不可能包含相对开音节结构
                continue;
            if (!isAlpha(w)) { // 如果单词中包含非字母字符
                for (int i = 0; i <= w.length() - 4; i++) { // 遍历单词中的每个字符
                    if (checkStructure(w[i], w[i + 1], w[i + 2], w[i + 3])) { // 检查是否满足相对开音节结构
                        result++; // 如果满足，子串个数加1
                    }
                }
            } else { // 如果单词只包含字母字符
                for (int i = (int) w.length() - 1; i > 2; i--) { // 从后往前遍历单词中的每个字符
                    if (checkStructure(w[i], w[i - 1], w[i - 2], w[i - 3])) { // 检查是否满足相对开音节结构
                        result++; // 如果满足，子串个数加1
                    }
                }
            }
        }
        cout << result; // 输出含有相对开音节结构的子串个数
    
        return 0;
    }
    

#### java

    
    
    import java.util.Scanner;
    import java.util.regex.Matcher;
    import java.util.regex.Pattern;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            String line = scanner.nextLine();
            String[] arr = line.split(" ");
    
            int count = 0;
    
            Pattern notEng = Pattern.compile("[^a-zA-Z]");
            for (String item : arr) {
                Matcher regExp = notEng.matcher(item);
                if (regExp.find()) {
                    regExp = Pattern.compile("[^aeiou][aeiou][^aeiour]e").matcher(item);
                } else {
                    regExp = Pattern.compile("e[^aeiour][aeiou][^aeiou]").matcher(item);
                }
    
                for (int i = 0; i < item.length() - 3; i++) {
                    if (regExp.find(i) && regExp.start() == i) {
                        count++;
                    }
                }
            }
            System.out.println(count);
        }
    }
    

#### python

    
    
    import re
    
    line = input()
    arr = line.split(" ")
    
    
    count = 0
    
    notEng = re.compile(r'[^a-zA-Z]')
    for item in arr:
        regExp = notEng.search(item)
        if regExp:
            regExp = re.compile(r'[^aeiou][aeiou][^aeiour]e')
        else:
            regExp = re.compile(r'e[^aeiour][aeiou][^aeiou]')
        
        for i in range(len(item)-3):
            if regExp.search(item[i:i+4]):
                count += 1
    print(count)
        
    

#### javaScript

    
    
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.on('line', (line) => {
      const arr = line.split(" ");
    
      let count = 0;
    
      const notEng = /[^a-zA-Z]/;
      for (const item of arr) {
        let regExp;
        if (notEng.test(item)) {
          regExp = /[^aeiou][aeiou][^aeiour]e/;
        } else {
          regExp = /e[^aeiour][aeiou][^aeiou]/;
        }
    
        for (let i = 0; i < item.length - 3; i++) {
          if (regExp.test(item.slice(i)) && regExp.exec(item.slice(i)).index === 0) {
            count++;
          }
        }
      }
      console.log(count);
    });
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

#### 完整用例

##### 用例1

    
    
    ekam a ekac
    

##### 用例2

    
    
    !ekam a ekekac
    

##### 用例3

    
    
    elephant tiger
    

##### 用例4

    
    
    a ekekac
    

##### 用例5

    
    
    ekam
    

##### 用例6

    
    
    ekam a ekekac
    

##### 用例7

    
    
    ekam a ekekac ekam
    

##### 用例8

    
    
    ekam a ekekac!
    

##### 用例9

    
    
    !ekam a ekekac
    

##### 用例10

    
    
    ekam a ekekac ekam
    

