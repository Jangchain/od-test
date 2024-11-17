#### 题目描述

输入单行英文句子，里面包含英文字母，空格以及,.?三种标点符号，请将句子内每个单词进行倒序，并输出倒序后的语句。

#### 输入描述

输入字符串S，S的长度 1 ≤ N ≤ 100

#### 输出描述

输出倒序后的字符串

#### 备注

标点符号左右的空格 ≥ 0，单词间空格＞0

#### 用例

输入| yM eman si boB.  
---|---  
输出| My name is Bob.  
说明| 无  
输入| woh era uoy ? I ma enif.  
---|---  
输出| how are you ? I am fine.  
说明| 无  
  
#### 题目解析

将字符串单词转为字符数组后进行reverse。但是单词中如果有标点符号的话，则标点符号的位置不能改变，比如enif. 倒序后为 fine. 其中 .
的位置在倒序前后是一样的。

从左到右遍历每一个字符，如果字符是 , . ? 或者空格，则看成一个分界符，将分界符之间的单词片段进行倒序。

#### C++

    
    
    #include<iostream>
    #include<vector>
    #include<stdlib.h>
    #include<algorithm>
    #include<string.h>
    
    
    using namespace std;
    
    
    
    string reverse_string(string str){
        // 反转字符串
        string res =  "";
        for(int i = str.size()-1; i>=0; i--){
            res += str[i];
        }
        return res;
    }
    
    int main()
    {
        // 输入处理
        string input_str;
        getline(cin, input_str);
        string res = "";
        string temp = "";
        for(int i=0; i<input_str.size(); i++){
            char c = input_str[i];
            // 是否为字母
            if(isalpha(c)){      
                temp += c;
            // 遇到空格，对上一个字符串进行翻转
            }else if(c == ' '){
                res += reverse_string(temp) + " ";     
                temp = "";  
            // 遇到标点符号，对上一个字符串进行翻转，并加上当前字符
            }else {
                if(temp !=  ""){
                    res += reverse_string(temp);   
                    temp = "";      
                }
                res += c;       
            }
            if(i == input_str.size()-1 && temp != ""){
                res += reverse_string(temp);  
            }
        }
    
        cout << res;
        return 0;
    }
    

#### JavaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    function reverse_string(str) {
      // 反转字符串
      let res = "";
      for (let i = str.length - 1; i >= 0; i--) {
        res += str[i];
      }
      return res;
    }
    
    rl.on('line', (input_str) => {
      let res = "";
      let temp = "";
      for (let i = 0; i < input_str.length; i++) {
        let c = input_str[i];
        // 是否为字母
        if (/[a-zA-Z]/.test(c)) {
          temp += c;
          // 遇到空格，对上一个字符串进行翻转
        } else if (c === ' ') {
          res += reverse_string(temp) + " ";
          temp = "";
          // 遇到标点符号，对上一个字符串进行翻转，并加上当前字符
        } else {
          if (temp !== "") {
            res += reverse_string(temp);
            temp = "";
          }
          res += c;
        }
        if (i === input_str.length - 1 && temp !== "") {
          res += reverse_string(temp);
        }
      }
    
      console.log(res);
    });
    
    

#### Java

    
    
    import java.util.Scanner;
    
    public class Main {
        public static String reverse_string(String str) {
            // 反转字符串
            String res = "";
            for (int i = str.length() - 1; i >= 0; i--) {
                res += str.charAt(i);
            }
            return res;
        }
    
        public static void main(String[] args) {
            // 输入处理
            Scanner scanner = new Scanner(System.in);
            String input_str = scanner.nextLine();
            String res = "";
            String temp = "";
            for (int i = 0; i < input_str.length(); i++) {
                char c = input_str.charAt(i);
                // 是否为字母
                if (Character.isLetter(c)) {
                    temp += c;
                    // 遇到空格，对上一个字符串进行翻转
                } else if (c == ' ') {
                    res += reverse_string(temp) + " ";
                    temp = "";
                    // 遇到标点符号，对上一个字符串进行翻转，并加上当前字符
                } else {
                    if (!temp.equals("")) {
                        res += reverse_string(temp);
                        temp = "";
                    }
                    res += c;
                }
                if (i == input_str.length() - 1 && !temp.equals("")) {
                    res += reverse_string(temp);
                }
            }
    
            System.out.println(res);
        }
    }
    

#### Python

    
    
    def reverse_string(str):
        # 反转字符串
        res = ""
        for i in range(len(str)-1, -1, -1):
            res += str[i]
        return res
    
    # 输入处理
    input_str = input()
    res = ""
    temp = ""
    for i in range(len(input_str)):
        c = input_str[i]
        # 是否为字母
        if c.isalpha():
            temp += c
        # 遇到空格，对上一个字符串进行翻转
        elif c == ' ':
            res += reverse_string(temp) + " "
            temp = ""
        # 遇到标点符号，对上一个字符串进行翻转，并加上当前字符
        else:
            if temp != "":
                res += reverse_string(temp)
                temp = ""
            res += c
        if i == len(input_str)-1 and temp != "":
            res += reverse_string(temp)
    
    print(res)
    
    

#### 文章目录

  *     *       * 题目描述
      * 输入描述
      * 输出描述
      * 备注
      * 用例
      * 题目解析
      * C++
      * JavaScript
      * Java
      * Python

![fengmian](https://img-
blog.csdnimg.cn/img_convert/1d2f33ed8cf2fb1b9a4fe09513f7aa94.png)

