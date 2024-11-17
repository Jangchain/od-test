#### 题目描述

小华是个对数字很敏感的小朋友，他觉得数字的不同排列方式有特殊美感。

某天，小华突发奇想，如果数字多行排列，第一行1个数，第二行2个，第三行3个，即第n行有n个数字，并且奇数行正序排列，偶数行[逆序](https://so.csdn.net/so/search?q=%E9%80%86%E5%BA%8F&spm=1001.2101.3001.7020)排列，数字依次累加。

这样排列的数字一定很有意思。聪明的你能编写代码帮助小华完成这个想法吗？

规则总结如下：

a、每个数字占据4个位置，不足四位用‘*’补位，如1打印为1***。 b、数字之间相邻4空格。
c、数字的打印顺序按照正序逆序交替打印,奇数行正序，偶数行逆序。 d、最后一行数字顶格，第n-1行相对第n行缩进四个空格

#### 输入描述

第一行输入为N，表示打印多少行; 1<=N<=30

输入：2

#### 输出描述

    
    
       1***
    3***    2***
    

##### ACM输入输出模式

如果你经常使用**Leetcode** ,会知道**letcode** 是不需要编写输入输出函数的。但是华为OD机考使用的是 **ACM 模式**
，需要手动编写输入和输出。

所以最好在牛-
客上提前熟悉这种模式。例如C++使用`cin/cout`,python使用`input()/print()`。JavaScript使用node的`readline()`和`console.log()`。Java
使用`sacnner/system.out.print()`

#### 用例

输入

    
    
    2
    

输出

    
    
       1***
    3***    2***
    

说明

> 符号*表示，数字不满4位时的补位，符号X表示数字之间的空格。注意实际编码时不需要打印X，直接打印空格即可。此处为说明题意，故此加上X。

#### 机考代码查重

华为OD机考完成之后，官方会进行代码查重。**华为 od 机考确实有很大的概率抽到原题**
。如果碰到了题库中的原题，一定不要直接使用题解中的代码，尤其是变量名，一定要修改，可以改成毫无意义的单词。除了变量名之外，代码的组织结构和逻辑一定要进行改变，这就要求在日常的刷题中，提前编写好属于自己的代码。

#### C++

    
    
    #include <iostream>
    #include <string>
    using namespace std;
    
    void print_number_line(int spaces, int number, int n) {
        for (int i = 0; i < spaces; i++) {
            cout << " ";
        }
        int coefficient = 1;
        if (n % 2 == 0) {
            coefficient = -coefficient;
        }
        else {
            number -= (n - 1);
        }
        for (int i = 0; i < n; i++) {
            cout << to_string(number).append(4 - to_string(number).length(), '*') << "    ";
            number += coefficient;
        }
        cout << '\n';
    }
    
    int main() {
        int num_rows;
        cin >> num_rows;
        for (int i = 1; i <= num_rows; i++) {
            int number = i * (i + 1) / 2;
            int spaces = 4 * (num_rows - i);
            print_number_line(spaces, number, i);
        }
        return 0;
    }
    

#### javaScript

    
    
    function print_number_line(spaces, number, n) {
      for (let i = 0; i < spaces; i++) {
        process.stdout.write(" ");
      }
      let coefficient = 1;
      if (n % 2 === 0) {
        coefficient = -coefficient;
      } else {
        number -= (n - 1);
      }
      for (let i = 0; i < n; i++) {
        process.stdout.write(String(number).padEnd(4, "*") + "    ");
        number += coefficient;
      }
      process.stdout.write('\n');
    }
    
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.on('line', (num_rows) => {
      for (let i = 1; i <= num_rows; i++) {
        const number = i * (i + 1) / 2;
        const spaces = 4 * (num_rows - i);
        print_number_line(spaces, number, i);
      }
      rl.close();
    });
    

#### java

    
    
    import java.util.Scanner;
    
    public class Main {
        public static void print_number_line(int spaces, int number, int n) {
            for (int i = 0; i < spaces; i++) {
                System.out.print(" ");
            }
            int coefficient = 1;
            if (n % 2 == 0) {
                coefficient = -coefficient;
            }
            else {
                number -= (n - 1);
            }
            for (int i = 0; i < n; i++) {
                System.out.print(String.format("%-4s", Integer.toString(number)).replace(' ', '*') + "    ");
                number += coefficient;
            }
            System.out.println();
        }
    
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            int num_rows = scanner.nextInt();
            for (int i = 1; i <= num_rows; i++) {
                int number = i * (i + 1) / 2;
                int spaces = 4 * (num_rows - i);
                print_number_line(spaces, number, i);
            }
        }
    }
    
    

#### python

    
    
    def print_number_line(spaces, number, n):
        for i in range(spaces):
            print(" ", end="")
        coefficient = 1
        if n % 2 == 0:
            coefficient = -coefficient
        else:
            number -= (n - 1)
        for i in range(n):
            print(str(number).ljust(4, "*"), end="    ")
            number += coefficient
        print('\n')
    
    num_rows = int(input())
    for i in range(1, num_rows+1):
        number = int(i * (i+1) / 2)
        spaces = 4 * (num_rows - i)
        print_number_line(spaces, number, i)
    

> #### 文章目录
>
>   *     *       * 题目描述
>       * 输入描述
>       * 输出描述
>       *         * ACM输入输出模式
>       * 用例
>       * 机考代码查重
>       * C++
>       * javaScript
>       * java
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

1

##### 用例2

3

##### 用例3

5

##### 用例4

2

##### 用例5

4

##### 用例6

6

##### 用例7

7

##### 用例8

8

##### 用例9

9

##### 用例10

10

