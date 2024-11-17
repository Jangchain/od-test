### 题目：最长的元音字符串

定义当一个字符串只有元音字母`(a,e,i,o,u,A,E,I,O,U)`组成,  
称为元音字符串，现给定一个字符串，请找出其中最长的元音字符串，  
并返回其长度，如果找不到请返回`0`，  
字符串中任意一个连续字符组成的子序列称为该字符串的子串

### 输入

一个字符串其长度 `0 < length` ,字符串仅由字符`a-z`或`A-Z`组成

### 输出描述

一个整数，表示最长的元音字符子串的长度

### 示例一

输入

    
    
    asdbuiodevauufgh
    

输出

    
    
    3
    

说明

最长的元音字符子串为`uio`和`auu`长度都为`3`，因此输出`3`

### C++

    
    
    #include <iostream>
    #include <vector>
    #include <algorithm>
    using namespace std;
    
    int main() {
        string input_str;
        getline(cin, input_str); // 读取输入字符串
    
        vector<char> vowels = {'a', 'e', 'i', 'o', 'u'}; // 元音字母集合
    
        int max_len = 0, cur_len = 0; // 最长元音字符串长度和当前元音字符串长度
        for (char c : input_str) {
            if (find(vowels.begin(), vowels.end(), tolower(c)) != vowels.end()) { // 判断字符是否为元音字母
                cur_len++;
            } else {
                max_len = max(max_len, cur_len); // 更新最长元音字符串长度
                cur_len = 0;
            }
        }
        max_len = max(max_len, cur_len); // 更新最长元音字符串长度
    
        cout << max_len << endl; // 输出结果
    
        return 0;
    }
    

### java

    
    
    import java.util.ArrayList;
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            String inputStr = scanner.nextLine();
    
            ArrayList<Character> vowels = new ArrayList<>(); // 元音字母
            vowels.add('a');
            vowels.add('e');
            vowels.add('i');
            vowels.add('o');
            vowels.add('u');
    
            int maxLen = 0, curLen = 0; // 最长元音字符串长度和当前元音字符串长度
            for (char c : inputStr.toCharArray()) { // 遍历字符串中的每个字符
                if (vowels.contains(Character.toLowerCase(c))) { // 如果是元音字母
                    curLen++; // 当前元音字符串长度加1
                } else { // 如果不是元音字母
                    maxLen = Math.max(maxLen, curLen); // 更新最长元音字符串长度
                    curLen = 0; // 当前元音字符串长度清零
                }
            }
            maxLen = Math.max(maxLen, curLen); // 处理最后一个元音字符串
    
            System.out.println(maxLen); // 输出最长元音字符串长度
        }
    }
    
    

### javaScript

    
    
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.on('line', (inputStr) => {
      const vowels = ['a', 'e', 'i', 'o', 'u'];
      let maxLen = 0, curLen = 0;
      for (let i = 0; i < inputStr.length; i++) {
        const c = inputStr.charAt(i);
        if (vowels.includes(c.toLowerCase())) {
          curLen++;
        } else {
          maxLen = Math.max(maxLen, curLen);
          curLen = 0;
        }
      }
      maxLen = Math.max(maxLen, curLen);
      console.log(maxLen);
    });
    

### python

    
    
    vowels = ['a', 'e', 'i', 'o', 'u']
    input_str = input()
    
    max_len = 0
    cur_len = 0
    for c in input_str:
        if c.lower() in vowels:
            cur_len += 1
        else:
            max_len = max(max_len, cur_len)
            cur_len = 0
    max_len = max(max_len, cur_len)
    
    print(max_len)
    

#### 文章目录

  *     * 题目：最长的元音字符串
    * 输入
    * 输出描述
    * 示例一
    * C++
    * java
    * javaScript
    * python

![fengmian](https://img-
blog.csdnimg.cn/img_convert/1d2f33ed8cf2fb1b9a4fe09513f7aa94.png)

