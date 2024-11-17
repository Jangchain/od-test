## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

#### 题目描述

给你两个字符串t和p，要求从t中找到一个和p相同的连续子串，并输出该子串第一个字符的下标。

#### 输入描述

  * 输入文件包括两行 分别表示字符串t和p
  * 保证t的长度不小于p
  * 且t的长度不超过1000000
  * p的长度不超过10000

#### 输出描述

  * 如果能从t中找到一个和p相等的连续子串，则输出该子串第一个字符在t中的下标，下标从左到右依次为1,2,3,…；
  * 如果不能，则输出 “No”
  * 如果含有多个这样的子串，则输出第一个字符下标最小的

##### ACM输入输出模式

如果你经常使用**Leetcode** ,会知道**letcode** 是不需要编写输入输出函数的。但是华为OD机考使用的是 **ACM 模式**
，需要手动编写输入和输出。

所以最好在牛-
客上提前熟悉这种模式。例如C++使用`cin/cout`,python使用`input()/print()`。JavaScript使用node的`readline()`和`console.log()`。Java
使用`sacnner/system.out.print()`

#### 用例

输入：

AVERDXIVYERDIAN  
RDXI

输出：

4

#### 机考代码查重

华为OD机考完成之后，官方会进行代码查重。**华为 od 机考确实有很大的概率抽到原题**
。如果碰到了题库中的原题，一定不要直接使用题解中的代码，尤其是变量名，一定要修改，可以改成毫无意义的单词。除了变量名之外，代码的组织结构和逻辑一定要进行改变，这就要求在日常的刷题中，提前编写好属于自己的代码。

#### C++

    
    
    #include <iostream>
    #include <string>
    using namespace std;
    
    int main() {
        string t, p;
        cin >> t >> p;
    
        if (t.length() < p.length()) {
            cout << "No" << endl;
            return 0;
        }
    
        int index = -1;
        for (int i = 0; i <= t.length() - p.length(); i++) {
            if (t.substr(i, p.length()) == p) {
                index = i;
                break;
            }
        }
    
        if (index == -1) {
            cout << "No" << endl;
        } else {
            cout << index + 1 << endl;
        }
    
        return 0;
    }
    

#### java

其他: 使用String.indexOf方法

    
    
    import java.util.*;
     
    
    public class Main {
           public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            String t = scanner.next();
            String p = scanner.next();
    
            if (t.length() < p.length()) {
                System.out.println("No");
                return;
            }
    
            int index = -1;
            for (int i = 0; i <= t.length() - p.length(); i++) {
                if (t.substring(i, i + p.length()).equals(p)) {
                    index = i;
                    break;
                }
            }
    
            if (index == -1) {
                System.out.println("No");
            } else {
                System.out.println(index + 1);
            }
        }
    }
    

#### javaScript

其他：使用String.indexOf

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    rl.on('line', (t) => {
        rl.on('line', (p) => {
            if (t.length < p.length) {
                console.log("No");
                rl.close();
                return;
            }
    
            let index = -1;
            for (let i = 0; i <= t.length - p.length; i++) {
                if (t.substring(i, i + p.length) === p) {
                    index = i;
                    break;
                }
            }
    
            if (index === -1) {
                console.log("No");
            } else {
                console.log(index + 1);
            }
    
            rl.close();
        });
    });
    

#### python

其他： 使用find函数

    
    
    import sys
    
    def main():
        t = input()
        p = input()
    
        if len(t) < len(p):
            print("No")
            return
    
        index = -1
        for i in range(len(t) - len(p) + 1):
            if t[i:i+len(p)] == p:
                index = i
                break
    
        if index == -1:
            print("No")
        else:
            print(index + 1)
    
    if __name__ == "__main__":
        main()
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

#### 完整用例

##### 用例1

    
    
    AVERDXIVYERDIAN
    RDXI
    

##### 用例2

    
    
    ABABABABABABABABABABABABABABABAB
    ABABA
    

##### 用例3

    
    
    1234567890
    567
    

##### 用例4

    
    
    abcdefg
    hij
    

##### 用例5

    
    
    abcabcabcabcabc
    abcd
    

##### 用例6

    
    
    AVERDXIVYERDIAN
    DXI
    

##### 用例7

    
    
    AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
    AAA
    

##### 用例8

    
    
    abcabcabcabcabc
    abcabcabcabcabc
    

##### 用例9

    
    
    ABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCD
    ABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCD
    

##### 用例10

    
    
    ABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABAB
    BABAB
    

