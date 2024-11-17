#### 题目描述

> 输入一个字符串仅包含大小写字母和数字，求字符串中包含的最长的非严格递增连续数字序列的长度，（比如12234属于非严格递增连续数字序列）。

#### 输入描述

> 输入一个字符串仅包含大小写字母和数字，输入的字符串最大不超过255个字符。

#### 输出描述

> 最长的非严格递增连续数字序列的长度

##### ACM输入输出模式

如果你经常使用**Leetcode** ,会知道**letcode** 是不需要编写输入输出函数的。但是华为OD机考使用的是 **ACM 模式**
，需要手动编写输入和输出。

所以最好在牛-
客上提前熟悉这种模式。例如C++使用`cin/cout`,python使用`input()/print()`。JavaScript使用node的`readline()`和`console.log()`。Java
使用`sacnner/system.out.print()`

#### 用例

输入

    
    
    abc2234019A334bc
    

输出

    
    
    4
    

说明

> 2234为最长的非严格递增连续数字序列，所以长度为4。

#### 机考代码查重

华为OD机考完成之后，官方会进行代码查重。**华为 od 机考确实有很大的概率抽到原题**
。如果碰到了题库中的原题，一定不要直接使用题解中的代码，尤其是变量名，一定要修改，可以改成毫无意义的单词。除了变量名之外，代码的组织结构和逻辑一定要进行改变，这就要求在日常的刷题中，提前编写好属于自己的代码。

#### C++

    
    
    #include <iostream>
    #include <string>
    
    using namespace std;
    
    int main() {
        string str;
        cin >> str;
        int maxLen = 0; // 最长连续数字序列的长度
        int curLen = 0; // 当前连续数字序列的长度
        int start = 0; // 当前连续数字序列的起始位置
    
        for (int i = 0; i < str.length(); i++) {
            if (isdigit(str[i])) { // 如果是数字
                int curNum = str[i] - '0'; // 当前数字
                if (i > 0 && curNum < str[i-1] - '0') { // 如果当前数字小于前一个数字
                    start = i; // 重置当前连续数字序列的起始位置
                    curLen = 1; // 重置当前连续数字序列的长度
                } else {
                    curLen = i - start + 1; // 当前连续数字序列长度加1
                }
            } else { // 如果不是数字
                start = i + 1; // 重置当前连续数字序列的起始位置
                curLen = 0; // 重置当前连续数字序列的长度
            }
    
            maxLen = max(maxLen, curLen); // 更新最长连续数字序列的长度
        }
        cout << maxLen << endl; // 输出最长连续数字序列的长度
    
        return 0;
    }
    
    

#### java

    
    
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            String str = scanner.next();
            int maxLen = 0; // 最长连续数字序列的长度
            int curLen = 0; // 当前连续数字序列的长度
            int start = 0; // 当前连续数字序列的起始位置
    
            for (int i = 0; i < str.length(); i++) {
                if (Character.isDigit(str.charAt(i))) { // 如果是数字
                    int curNum = str.charAt(i) - '0'; // 当前数字
                    if (i > 0 && curNum < str.charAt(i-1) - '0') { // 如果当前数字小于前一个数字
                        start = i; // 重置当前连续数字序列的起始位置
                        curLen = 1; // 重置当前连续数字序列的长度
                    } else {
                        curLen = i - start + 1; // 当前连续数字序列长度加1
                    }
                } else { // 如果不是数字
                    start = i + 1; // 重置当前连续数字序列的起始位置
                    curLen = 0; // 重置当前连续数字序列的长度
                }
    
                maxLen = Math.max(maxLen, curLen); // 更新最长连续数字序列的长度
            }
            System.out.println(maxLen); // 输出最长连续数字序列的长度
        }
    }
    

#### javascript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.on('line', (str) => {
      let maxLen = 0;
      let curLen = 0;
      let start = 0;
    
      for (let i = 0; i < str.length; i++) {
        if (!isNaN(str.charAt(i))) {
          let curNum = parseInt(str.charAt(i));
          if (i > 0 && curNum < parseInt(str.charAt(i-1))) {
            start = i;
            curLen = 1;
          } else {
            curLen = i - start + 1;
          }
        } else {
          start = i + 1;
          curLen = 0;
        }
    
        maxLen = Math.max(maxLen, curLen);
      }
    
      console.log(maxLen);
      rl.close();
    });
    

#### python

    
    
    str = input()
    maxLen = 0
    curLen = 0
    start = 0
    
    for i in range(len(str)):
        if str[i].isdigit()  :
            curNum = int(str[i])
            if i > 0 and str[i-1].isdigit() and curNum < int(str[i-1]):
                start = i
                curLen = 1
            else:
                curLen = i - start + 1
        else:
            start = i + 1
            curLen = 0
    
        maxLen = max(maxLen, curLen)
    
    print(maxLen)
    

> #### 文章目录
>
>   *     *       * 题目描述
>       * 输入描述
>       * 输出描述
>       *         * ACM输入输出模式
>       * 用例
>       * 机考代码查重
>       * C++
>       * java
>       * javascript
>       * python
>       * 完整用例
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
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

#### 完整用例

##### 用例1

    
    
    abc2234019A334bc
    

##### 用例2

    
    
    abc123456def
    

##### 用例3

    
    
    abc987654321def
    

##### 用例4

    
    
    abc13579def
    

##### 用例5

    
    
    abc24680def
    

##### 用例6

    
    
    abc1234567890def
    

##### 用例7

    
    
    abc0def123456789
    

##### 用例8

    
    
    abc1234567890def0987654321ghi
    

##### 用例9

    
    
    abc1234567890def0987654321ghi1234567890jkl
    

##### 用例10

    
    
    abc123def456ghi789jkl
    

