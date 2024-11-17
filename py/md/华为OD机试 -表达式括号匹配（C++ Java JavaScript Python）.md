#### 题目描述

(1+(2+3)*(3+(8+0))+1-2)这是一个简单的数学表达式,今天不是计算它的值,而是比较它的括号匹配是否正确。

前面这个式子可以简化为(()(()))这样的括号我们认为它是匹配正确的,

而((())这样的我们就说他是错误的。注意括号里面的表达式可能是错的,也可能有多个空格，对于这些我们是不用去管的，

我们只关心括号是否使用正确。

#### 输入描述

给出一行表达式(长度不超过 100)。

#### 输出描述

如果匹配正确输出括号的对数，否则输出-1。

#### 用例

输入| (1+(2+3)*(3+(8+0))+1-2)  
---|---  
输出| 4  
说明| 无  
  
#### C++

    
    
    #include <iostream>
    #include <stack>
    #include <string>
    
    int main() {
        std::string expression;
        std::getline(std::cin, expression); // 读入一行表达式
    
        int count = 0; // 记录匹配的括号对数
        std::stack<char> st; // 使用栈来匹配括号
    
        for (char c : expression) {
            if (c == '(') { // 如果字符是左括号，将其压入栈中
                st.push(c);
            } else if (c == ')') { // 如果字符是右括号
                if (st.empty() || st.top() != '(') { // 如果栈为空或栈顶的左括号不匹配当前的右括号
                    std::cout << -1 << std::endl; // 输出-1
                    return 0; // 退出程序
                }
                st.pop(); // 弹出栈顶元素
                count++; // 记录匹配的括号对数
            }
        }
    
        if (!st.empty()) { // 如果栈非空，说明还有未匹配的左括号
            std::cout << -1 << std::endl; // 输出-1
        } else {
            std::cout << count << std::endl; // 输出匹配的括号对数
        }
    
        return 0;
    }
    
    
    

#### JavaScript

    
    
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    readline.on('line', expression => { // 读入一行表达式
        let count = 0; // 记录匹配的括号对数
        let st = []; // 使用栈来匹配括号
    
        for (let c of expression) {
            if (c === '(') { // 如果字符是左括号，将其压入栈中
                st.push(c);
            } else if (c === ')') { // 如果字符是右括号
                if (st.length === 0 || st.pop() !== '(') { // 如果栈为空或栈顶的左括号不匹配当前的右括号
                    console.log(-1); // 输出-1
                    process.exit(0); // 退出程序
                }
                count++; // 记录匹配的括号对数
            }
        }
    
        if (st.length !== 0) { // 如果栈非空，说明还有未匹配的左括号
            console.log(-1); // 输出-1
        } else {
            console.log(count); // 输出匹配的括号对数
        }
    
        readline.close();
    });
    
    

#### Java

    
    
    import java.util.*;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            String expression = scanner.nextLine(); // 读入一行表达式
    
            int count = 0; // 记录匹配的括号对数
            Stack<Character> st = new Stack<>(); // 使用栈来匹配括号
    
            for (char c : expression.toCharArray()) {
                if (c == '(') { // 如果字符是左括号，将其压入栈中
                    st.push(c);
                } else if (c == ')') { // 如果字符是右括号
                    if (st.empty() || st.pop() != '(') { // 如果栈为空或栈顶的左括号不匹配当前的右括号
                        System.out.println(-1); // 输出-1
                        return; // 退出程序
                    }
                    count++; // 记录匹配的括号对数
                }
            }
    
            if (!st.empty()) { // 如果栈非空，说明还有未匹配的左括号
                System.out.println(-1); // 输出-1
            } else {
                System.out.println(count); // 输出匹配的括号对数
            }
        }
    }
    
    

#### Python

    
    
    expression = input() # 读入一行表达式
    
    count = 0 # 记录匹配的括号对数
    st = [] # 使用栈来匹配括号
    
    for c in expression:
        if c == '(': # 如果字符是左括号，将其压入栈中
            st.append(c)
        elif c == ')': # 如果字符是右括号
            if len(st) == 0 or st.pop() != '(': # 如果栈为空或栈顶的左括号不匹配当前的右括号
                print(-1) # 输出-1
                exit(0) # 退出程序
            count += 1 # 记录匹配的括号对数
    
    if len(st) != 0: # 如果栈非空，说明还有未匹配的左括号
        print(-1) # 输出-1
    else:
        print(count) # 输出匹配的括号对数
    
    

#### 完整用例

##### 用例1

    
    
    (1+(2+3)*(3+(8+0))+1-2)
    

##### 用例2

    
    
    ((1+2)*3)
    

##### 用例3

    
    
    (1+2)*3)
    

##### 用例4

    
    
    (1+(2+3)*(3+(8+0))+1-2)()))((
    

##### 用例5

    
    
    (1+(2+3)*(3+(8+0))+1-2)()(())
    

##### 用例6

    
    
    (((()))
    

##### 用例7

    
    
    ((())
    

##### 用例8

    
    
    (1+2+3)
    

##### 用例9

    
    
    ()()()
    

##### 用例10

    
    
    (1+(2+3)*(3+(8+0))+1-2))
    

#### 文章目录

  *     *       * 题目描述
      * 输入描述
      * 输出描述
      * 用例
      * C++
      * JavaScript
      * Java
      * Python
      * 完整用例
      *         * 用例1
        * 用例2
        * 用例3
        * 用例4
        * 用例5
        * 用例6
        * 用例7
        * 用例8
        * 用例9
        * 用例10

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

