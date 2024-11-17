## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

#### 题目描述

  * 游戏规则：输入一个只包含英文字母的字符串，字符串中的两个字母如果相邻且相同，就可以消除。
  * 在字符串上反复执行消除的动作，直到无法继续消除为止，此时游戏结束。
  * 输出最终得到的字符串长度。

#### 输入描述

  * 输入原始字符串 str ，只能包含大小写英文字母，字母的大小写敏感， str 长度不超过100。

#### 输出描述

  * 输出游戏结束后，最终得到的字符串长度。

##### ACM输入输出模式

如果你经常使用**Leetcode** ,会知道**letcode** 是不需要编写输入输出函数的。但是华为OD机考使用的是 **ACM 模式**
，需要手动编写输入和输出。

所以最好在牛-
客上提前熟悉这种模式。例如C++使用`cin/cout`,python使用`input()/print()`。JavaScript使用node的`readline()`和`console.log()`。Java
使用`sacnner/system.out.print()`

#### 用例

输入| gg  
---|---  
输出| 0  
说明| gg 可以直接消除，得到空串，长度为0。  
输入| mMbccbc  
---|---  
输出| 3  
说明| 在 mMbccbc 中，可以先消除 cc ；此时字符串变成 mMbbc ，可以再消除 bb ；此时字符串变成
[mMc](https://so.csdn.net/so/search?q=mMc&spm=1001.2101.3001.7020)
，此时没有相邻且相同的字符，无法继续消除。最终得到的字符串为 mMc ，长度为3。  
  
备注：输入中包含 非大小写英文字母 时，均为异常输入，直接返回 0。

#### 机考代码查重

华为OD机考完成之后，官方会进行代码查重。**华为 od 机考确实有很大的概率抽到原题**
。如果碰到了题库中的原题，一定不要直接使用题解中的代码，尤其是变量名，一定要修改，可以改成毫无意义的单词。除了变量名之外，代码的组织结构和逻辑一定要进行改变，这就要求在日常的刷题中，提前编写好属于自己的代码。

#### C++

    
    
    #include <iostream>
    #include <regex>
    using namespace std;
    
    int main() {
        string str;
        getline(cin, str);
    
        // 判断输入是否符合要求，即只包含大小写英文字母
        if (!regex_match(str, regex("^[a-zA-Z]+$"))) {
            cout << 0 << endl;
            return 0;
        }
    
        string sb;
    
        // 遍历输入的字符串
        for (char c : str) {
            // 判断是否可以消除
            if (!sb.empty() && c == sb.back()) {
                sb.pop_back(); // 如果可以消除，则移除最后一个字符
            } else {
                sb.push_back(c); // 如果不能消除，则将当前字符加入字符串中
            }
        }
    
        cout << sb.length() << endl; // 输出最终得到的字符串长度
    
        return 0;
    }
    

#### java

    
    
    import java.util.Scanner;
    import java.util.regex.Pattern;
    
    public class Main {
      public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String str = sc.nextLine();
        
        // 判断输入是否符合要求，即只包含大小写英文字母
        if(!Pattern.matches("^[a-zA-Z]+$", str)){
            System.out.println(0);
            return ;
        }
        
        StringBuilder sb = new StringBuilder();
    
        // 遍历输入的字符串
        for (char c : str.toCharArray()) {
          // 判断是否可以消除
          if (sb.length() > 0 && c == sb.charAt(sb.length() - 1)) {
            sb.deleteCharAt(sb.length() - 1); // 如果可以消除，则移除最后一个字符
          } else {
            sb.append(c); // 如果不能消除，则将当前字符加入字符串中
          }
        }
    
        System.out.println(sb.length()); // 输出最终得到的字符串长度
      }
    }
    
    

#### python

    
    
    import re
    
    str = input()
    
    # 判断输入是否符合要求，即只包含大小写英文字母
    if not re.match("^[a-zA-Z]+$", str):
        print(0)
        exit()
    
    sb = []
    
    # 遍历输入的字符串
    for c in str:
        # 判断是否可以消除
        if len(sb) > 0 and c == sb[-1]:
            sb.pop() # 如果可以消除，则移除最后一个字符
        else:
            sb.append(c) # 如果不能消除，则将当前字符加入字符串中
    
    print(len(sb)) # 输出最终得到的字符串长度
    

#### javascript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.on('line', (str) => {
      // 判断输入是否符合要求，即只包含大小写英文字母
      if (!/^[a-zA-Z]+$/.test(str)) {
        console.log(0);
        rl.close();
        return;
      }
    
      let sb = '';
    
      // 遍历输入的字符串
      for (let i = 0; i < str.length; i++) {
        const c = str.charAt(i);
        // 判断是否可以消除
        if (sb.length > 0 && c === sb.charAt(sb.length - 1)) {
          sb = sb.slice(0, sb.length - 1); // 如果可以消除，则移除最后一个字符
        } else {
          sb += c; // 如果不能消除，则将当前字符加入字符串中
        }
      }
    
      console.log(sb.length); // 输出最终得到的字符串长度
      rl.close();
    });
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

#### 完整用例

##### 用例1

gg

##### 用例2

mMbccbc

##### 用例3

AaAa

##### 用例4

abcde

##### 用例5

aabbcc

##### 用例6

ABAB

##### 用例7

XYZxyz

##### 用例8

aAaAaAa

##### 用例9

Abcdefg

##### 用例10

aaabbbccc

