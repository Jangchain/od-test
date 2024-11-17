#### 题目描述: 组成最大数

小组中每位都有一张卡片，卡片上是6位内的正整数，将卡片连起来可以组成多种数字，计算组成的最大数字。

#### 输入描述

“,”号分割的多个正整数字符串，不需要考虑非数字异常情况，小组最多25个人。

#### 输出描述

最大的数字字符串

##### ACM输入输出模式

如果你经常使用**Leetcode** ,会知道**letcode** 是不需要编写输入输出函数的。但是华为OD机考使用的是 **ACM 模式**
，需要手动编写输入和输出。

所以最好在牛-
客上提前熟悉这种模式。例如C++使用`cin/cout`,python使用`input()/print()`。JavaScript使用node的`readline()`和`console.log()`。Java
使用`sacnner/system.out.print()`

#### 用例1

输入

    
    
    22,221
    

输出

    
    
    22221
    

#### 用例2

输入

    
    
    4589,101,41425,9999
    

输出

    
    
    9999458941425101
    

#### 机考代码查重

华为OD机考完成之后，官方会进行代码查重。**华为 od 机考确实有很大的概率抽到原题**
。如果碰到了题库中的原题，一定不要直接使用题解中的代码，尤其是变量名，一定要修改，可以改成毫无意义的单词。除了变量名之外，代码的组织结构和逻辑一定要进行改变，这就要求在日常的刷题中，提前编写好属于自己的代码。

#### C++

    
    
    #include <iostream>
    #include <algorithm>
    #include <vector>
    using namespace std;
    
    int main() {
        string input;
        cin >> input;
        vector<string> arr;
        string temp = "";
        for (int i = 0; i < input.length(); i++) {
            if (input[i] == ',') {
                arr.push_back(temp);
                temp = "";
            }
            else {
                temp += input[i];
            }
        }
        arr.push_back(temp);
        sort(arr.begin(), arr.end(), [](string a, string b){
            return (b + a) < (a + b);
        });
        string res = "";
        for (int i = 0; i < arr.size(); i++) {
            res += arr[i];
        }
        cout << res << endl;
        return 0;
    }
    
    

#### JavaScript

    
    
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.on('line', (input) => {
      const arr = input.split(",");
      arr.sort((a, b) => (b + a).localeCompare(a + b));
      console.log(arr.join(""));
      rl.close();
    });
    

#### Java

    
    
    import java.util.*;
    import java.util.function.*;
    
    public class Main {
        public static void main(String[] args) {
            Scanner input = new Scanner(System.in);
            String[] cards = input.nextLine().split(",");
            
            Arrays.sort(cards, (a, b) -> {
                // 将两个字符串拼接起来，比较大小
                return (b + a).compareTo(a + b);
            });
            
            for (String card : cards) {
                System.out.print(card);
            }
        }
    }
    
    

#### Python

    
    
    import functools
    
    def compare(a, b):
        return int(b+a) - int(a+b)
    
    numbers = input().split(',')
    numbers.sort(key=functools.cmp_to_key(compare))
    
    result = "".join(numbers)
    print(result)
    

> #### 文章目录
>
>   *     *       * 题目描述: 组成最大数
>       * 输入描述
>       * 输出描述
>       *         * ACM输入输出模式
>       * 用例1
>       * 用例2
>       * 机考代码查重
>       * C++
>       * JavaScript
>       * Java
>       * Python
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

1,2,3,4,5

##### 用例2

10,20,30,40,50

##### 用例3

123,456,789,321,654,987,741,852,963,159

##### 用例4

22,221

##### 用例5

22,223

##### 用例6

4589,101,41425,9999

##### 用例7

123,456,789,321,654

##### 用例8

12345,67890,54321,98765,43210,67890,54321,98765,43210,67890,54321,98765,43210,67890,54321,98765,43210,67890,54321,98765,43210,67890,54321,98765,43210,67890

##### 用例9

123,456,78

##### 用例10

98765432,12345678,54321

