#### 题目描述

> 给定字符串 target和 source，判断 target是否为 source 的子序列。你可以认为target和 source  
>  中仅包含英文小写字母。
>
> 字符串 source 可能会很长（长度~=500,000），而 target是个短字符串（长度<=100)。
>
> 字符串的一个子序列是原始字符串删除一些（也可以不删除）字符而不改变剩余字符相对位置形成的新字符串。
>
> （例如，”abc”是”aebycd”的一个子序列，而”ayb”不是）。
>
> 请找出最后一个子序列的起始位置。

#### 输入描述

> 第一行为target，短字符串（长度 <=100）
>
> 第二行为source，长字符串（长度 ~= 500,000）

#### 输出描述

> 最后一个子序列的起始位置，即最后一个子序列首字母的下标

##### ACM输入输出模式

如果你经常使用**Leetcode** ,会知道**letcode** 是不需要编写输入输出函数的。但是华为OD机考使用的是 **ACM 模式**
，需要手动编写输入和输出。

所以最好在牛-
客上提前熟悉这种模式。例如C++使用`cin/cout`,python使用`input()/print()`。JavaScript使用node的`readline()`和`console.log()`。Java
使用`sacnner/system.out.print()`

#### 用例

输入

    
    
    abc
    abcaybec
    

输出

    
    
    3
    

说明

> 这里有两个abc的子序列满足，取下标较大的，故返回3。  
>  备注 若在source中找不到target，则输出-1。

#### 机考代码查重

华为OD机考完成之后，官方会进行代码查重。**华为 od 机考确实有很大的概率抽到原题**
。如果碰到了题库中的原题，一定不要直接使用题解中的代码，尤其是变量名，一定要修改，可以改成毫无意义的单词。除了变量名之外，代码的组织结构和逻辑一定要进行改变，这就要求在日常的刷题中，提前编写好属于自己的代码。

#### C++

    
    
    #include <iostream>
    #include <string>
    using namespace std;
    
    int main() {
        // 定义两个字符串变量target和source
        string target, source;
        // 从标准输入中读取两个字符串
        cin >> target;
        cin >> source;
        // 初始化游标cursor为target字符串的最后一个字符的下标
        int cursor = target.length() - 1;
        int i = source.length() - 1;
        while (i >= 0 && cursor >= 0) {
            // 如果当前字符相等，则游标cursor向前移动一位
            if (source[i] == target[cursor]) {
                cursor--;
            }
            i--;
        }
        // 如果游标已经移动到target字符串的第一个字符之前，说明已经匹配完整个target字符串，返回当前字符在source中的下标i
        if (cursor < 0) {
            cout << i + 1 << endl;
        } else {
            // 如果遍历完source字符串后仍未匹配完整个target字符串，则返回-1
            cout << -1 << endl;
        }
        return 0;
    }
    

#### java

    
    
    import java.util.Scanner;
    
    public class Main {
        // 主函数
        public static void main(String[] args) {
            // 定义两个字符串变量target和source
            String target, source;
            // 从标准输入中读取两个字符串
            Scanner scanner = new Scanner(System.in);
            target = scanner.nextLine();
            source = scanner.nextLine();
            // 初始化游标cursor为target字符串的最后一个字符的下标
            int cursor = target.length() - 1;
            int i = source.length() - 1;
            while (i >= 0 && cursor >= 0) {
                // 如果当前字符相等，则游标cursor向前移动一位
                if (source.charAt(i) == target.charAt(cursor)) {
                    cursor--;
                }
                i--;
            }
            // 如果游标已经移动到target字符串的第一个字符之前，说明已经匹配完整个target字符串，返回当前字符在source中的下标i
            if (cursor < 0) {
                System.out.println(i + 1);
            } else {
                // 如果遍历完source字符串后仍未匹配完整个target字符串，则返回-1
                System.out.println(-1);
            }
        }
    }
    }
    

#### javaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.on('line', (target) => {
      rl.on('line', (source) => {
        let cursor = target.length - 1;
        let i = source.length - 1;
        while (i >= 0 && cursor >= 0) {
          if (source.charAt(i) === target.charAt(cursor)) {
            cursor--;
          }
          i--;
        }
        if (cursor < 0) {
          console.log(i + 1);
        } else {
          console.log(-1);
        }
        rl.close();
      });
    });
    

#### python

    
    
    target = input().strip()
    source = input().strip()
    
    cursor = len(target) - 1
    i = len(source) - 1
    
    while i >= 0 and cursor >= 0:
        if source[i] == target[cursor]:
            cursor -= 1
        i -= 1
    
    if cursor < 0:
        print(i + 1)
    else:
        print(-1)
    

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
>       * javaScript
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
blog.csdnimg.cn/img_convert/1d2f33ed8cf2fb1b9a4fe09513f7aa94.png)

#### 完整用例

##### 用例1

    
    
    abc
    abcaybec
    

##### 用例2

    
    
    def
    abcdefg
    

##### 用例3

    
    
    xyz
    abcaybec
    

##### 用例4

    
    
    bcd
    aebycd
    

##### 用例5

    
    
    ab
    cdefghijklmnopqrstuvwxyz
    

##### 用例6

    
    
    def
    abcdefg
    

##### 用例7

    
    
    cde
    abcdefg
    

##### 用例8

    
    
    fg
    abcdefg
    

##### 用例9

    
    
    e
    abcdeabcde
    

##### 用例10

    
    
    abcd
    abcdeabcde
    

