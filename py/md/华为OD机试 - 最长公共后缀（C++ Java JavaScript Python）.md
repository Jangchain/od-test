### 题目描述：最长公共后缀

> 编写一个函数来查找字符串数组中的最长公共后缀；
>
> 如果不存在公共后缀，返回固定字符串： @Zero。
>
> 补充说明：
>
> 1、字符串长度范围：[2, 1000]；
>
> 2、字符串中字符取值范围为[1, 126]。

### 输入描述

[“abc”,“bbc”,“c”]

### 输出描述

“c”

##### ACM输入输出模式

如果你经常使用**Leetcode** ,会知道**letcode** 是不需要编写输入输出函数的。但是华为OD机考使用的是 **ACM 模式**
，需要手动编写输入和输出。

所以最好在牛-
客上提前熟悉这种模式。例如C++使用`cin/cout`,python使用`input()/print()`。JavaScript使用node的`readline()`和`console.log()`。Java
使用`sacnner/system.out.print()`

### 用例1

输入：

    
    
    ["abc","bbc","c"]
    

输出：

    
    
    "c"
    

说明：

> 返回公共后缀：c

### 用例2

输入：

    
    
    ["aa","bb","cc"]
    

输出：

    
    
    "@Zero"
    

说明：

> 不存在公共后缀，返回固定结果：@Zero

#### 机考代码查重

华为OD机考完成之后，官方会进行代码查重。**华为 od 机考确实有很大的概率抽到原题**
。如果碰到了题库中的原题，一定不要直接使用题解中的代码，尤其是变量名，一定要修改，可以改成毫无意义的单词。除了变量名之外，代码的组织结构和逻辑一定要进行改变，这就要求在日常的刷题中，提前编写好属于自己的代码。

### java

    
    
    import java.util.*;
    import java.io.*;
    
    public class Main{
    
        public static void main(String[] args) {
    
            Scanner sc = new Scanner(System.in);
    
            // 输入字符串数组，去除多余符号并分割
            String[] strArr = sc.nextLine().replace("[","")
                                            .replace("]","")
                                            .replace("\"","")
                                            .split(",");
    
            String commonSuffix = strArr[0]; // 初始化公共后缀为第一个字符串
            for(int i = 1; i < strArr.length ; i ++){
                int length1 = commonSuffix.length();
                int length2 = strArr[i].length();
                int j = 1;
                // 从后往前比较，找到第一个不同的字符位置j
                while(length1 -j >=0 && length2 - j >= 0 && commonSuffix.charAt(length1 -j) == strArr[i].charAt(length2 - j)){
                    j++;
                }
                if(j==1){ // 如果j=1，说明不存在公共后缀
                    System.out.print("@Zero");
                    return ;
                }
                commonSuffix = commonSuffix.substring(length1-j+1); // 更新公共后缀
            }
            System.out.print(commonSuffix);
        }
    }
    
    

### C++

    
    
    #include <iostream>
    #include <vector>
    #include <string>
    
    using namespace std;
    
    int main() {
        string input;
        getline(cin, input); // 读入字符串数组
        input = input.substr(1, input.size() - 2); // 去除首尾的方括号
        vector<string> strArr;
        string temp = "";
        for (char c : input) {
            if (c == ',') { // 遇到逗号，将temp加入strArr
                strArr.push_back(temp);
                temp = "";
            } else if (c != '\"') { // 去除双引号
                temp += c;
            }
        }
        strArr.push_back(temp); // 将最后一个字符串加入strArr
    
        string commonSuffix = strArr[0]; // 初始化公共后缀为第一个字符串
        for (int i = 1; i < strArr.size(); i++) {
            int length1 = commonSuffix.size();
            int length2 = strArr[i].size();
            int j = 1;
            // 从后往前比较，找到第一个不同的字符位置j
            while (length1 - j >= 0 && length2 - j >= 0 && commonSuffix[length1 - j] == strArr[i][length2 - j]) {
                j++;
            }
            if (j == 1) { // 如果j=1，说明不存在公共后缀
                cout << "@Zero" << endl;
                return 0;
            }
            commonSuffix = commonSuffix.substr(length1 - j + 1); // 更新公共后缀
        }
    
        cout << commonSuffix << endl;
    
        return 0;
    }
    

### python

    
    
    import sys
    
    # 输入字符串数组，去除多余符号并分割
    strArr = input().replace("[","").replace("]","").replace("\"","").split(",")
    
    commonSuffix = strArr[0] # 初始化公共后缀为第一个字符串
    for i in range(1, len(strArr)):
        length1 = len(commonSuffix)
        length2 = len(strArr[i])
        j = 1
        # 从后往前比较，找到第一个不同的字符位置j
        while length1 - j >= 0 and length2 - j >= 0 and commonSuffix[length1 - j] == strArr[i][length2 - j]:
            j += 1
        if j == 1: # 如果j=1，说明不存在公共后缀
            print("@Zero")
            sys.exit()
        commonSuffix = commonSuffix[length1-j+1:] # 更新公共后缀
    
    print(commonSuffix)
    

### javaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.on('line', (input) => {
      // 输入字符串数组，去除多余符号并分割
      const strArr = input.replace("[","")
                          .replace("]","")
                          .replace(/"/g,"")
                          .split(",");
    
      let commonSuffix = strArr[0]; // 初始化公共后缀为第一个字符串
      for(let i = 1; i < strArr.length ; i ++){
          let length1 = commonSuffix.length;
          let length2 = strArr[i].length;
          let j = 1;
          // 从后往前比较，找到第一个不同的字符位置j
          while(length1 -j >=0 && length2 - j >= 0 && commonSuffix.charAt(length1 -j) == strArr[i].charAt(length2 - j)){
              j++;
          }
          if(j==1){ // 如果j=1，说明不存在公共后缀
              console.log("@Zero");
              return ;
          }
          commonSuffix = commonSuffix.substring(length1-j+1); // 更新公共后缀
      }
      console.log(commonSuffix);
    });
    

> #### 文章目录
>
>   *     * 题目描述：最长公共后缀
>     * 输入描述
>     * 输出描述
>     *       *         * ACM输入输出模式
>     * 用例1
>     * 用例2
>     *       * 机考代码查重
>     * java
>     * C++
>     * python
>     * javaScript
>     *       * 完整用例
>       *         * 用例1
>         * 用例2
>         * 用例3
>         * 用例4
>         * 用例5
>         * 用例6
>         * 用例7
>         * 用例8
>         * 用例9
>         * 用例10
>

![fengmian](https://img-
blog.csdnimg.cn/img_convert/1d2f33ed8cf2fb1b9a4fe09513f7aa94.png)

#### 完整用例

##### 用例1

    
    
    ["abc","bbc","c"]
    

##### 用例2

    
    
    ["aa","bb","cc"]
    

##### 用例3

    
    
    ["hello","world","ld"]
    

##### 用例4

    
    
    ["apple","banana",""]
    

##### 用例5

    
    
    ["abc","def","ghi"]
    

##### 用例6

    
    
    ["abcdefg","bcdefg","cdefg"]
    

##### 用例7

    
    
    ["abcd","abcd","abcd"]
    

##### 用例8

    
    
    ["abc","abcd","abcde"]
    

##### 用例9

    
    
    ["abcde","fghij","klmno"]
    

##### 用例10

    
    
    ["a","b","c"
    

