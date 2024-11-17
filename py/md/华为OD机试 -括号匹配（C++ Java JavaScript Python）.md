#### 题目描述

给定一个字符串，里边可能包含“()”、“[]”、“{}”三种括号，请编写程序检查该字符串中的括号是否成对出现，且嵌套关系正确。  
若括号成对出现且嵌套关系正确，或该字符串中无括号字符，输出：true；  
若未正确使用括号字符，输出：false。  
实现时，无需考虑非法输入。

#### 输入描述

无

#### 输出描述

无

#### 用例

输入| (1+2)/(0.5+1)  
---|---  
输出| true  
说明| 无  
  
#### C++

    
    
    #include <iostream>
    #include <stack>
    #include <map>
    
    int main() {
        // 创建一个映射，将每个右括号映射到对应的左括号
        std::map<char, char> brackets = {{')', '('}, {']', '['}, {'}', '{'}};
    
        // 创建一个栈来存储左括号
        std::stack<char> s;
    
        // 读取一行输入
        std::string input;
        std::getline(std::cin, input);
    
        // 遍历输入字符串中的每个字符
        for (char& c : input) {
            // 如果字符是左括号，将其压入栈中
            if (c == '(' || c == '[' || c == '{') {
                s.push(c);
            } 
            // 如果字符是右括号
            else if (c == ')' || c == ']' || c == '}') {
                // 如果栈为空或栈顶的左括号不匹配当前的右括号
                if (s.empty() || s.top() != brackets[c]) {
                    std::cout << "false\n";
                    return 0;
                }
                s.pop();
            }
        }
    
        // 如果所有的括号都匹配，栈应该为空
        // 所以，如果栈为空，输出true，否则输出false
        std::cout << (s.empty() ? "true" : "false") << "\n";
    
        return 0;
    }
    
    

#### JavaScript

    
    
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    readline.on('line', input => {
        // 创建一个映射，将每个右括号映射到对应的左括号
        const brackets = {')': '(', ']': '[', '}': '{'};
    
        // 创建一个栈来存储左括号
        const stack = [];
    
        // 遍历输入字符串中的每个字符
        for (let c of input) {
            // 如果字符是左括号，将其压入栈中
            if (c === '(' || c === '[' || c === '{') {
                stack.push(c);
            } 
            // 如果字符是右括号
            else if (c === ')' || c === ']' || c === '}') {
                // 如果栈为空或栈顶的左括号不匹配当前的右括号
                if (!stack.length || stack.pop() !== brackets[c]) {
                    console.log('false');
                    process.exit(0);
                }
            }
        }
    
        // 如果所有的括号都匹配，栈应该为空
        // 所以，如果栈为空，输出true，否则输出false
        console.log(stack.length ? 'false' : 'true');
    
        readline.close();
    });
    
    
    
    
    

#### Java

    
    
    import java.util.*;
    
    public class Main {
        public static void main(String[] args) {
            // 创建一个Scanner对象来读取用户的输入
            Scanner scanner = new Scanner(System.in);
            // 读取一行输入
            String s = scanner.nextLine();
    
            // 创建一个映射，将每个右括号映射到对应的左括号
            Map<Character, Character> map = new HashMap<>();
            map.put(')', '(');
            map.put(']', '[');
            map.put('}', '{');
    
            // 创建一个栈来存储左括号
            Stack<Character> stack = new Stack<>();
    
            // 遍历输入字符串中的每个字符
            for (char c : s.toCharArray()) {
                // 如果字符是左括号，将其压入栈中
                if (c == '(' || c == '[' || c == '{') {
                    stack.push(c);
                } 
                // 如果字符是右括号
                else if (c == ')' || c == ']' || c == '}') {
                    // 如果栈为空或栈顶的左括号不匹配当前的右括号
                    if (stack.empty() || stack.pop() != map.get(c)) {
                        // 输出false并结束程序
                        System.out.println(false);
                        return;
                    }
                }
            }
    
            // 如果所有的括号都匹配，栈应该为空
            // 所以，如果栈为空，输出true，否则输出false
            System.out.println(stack.empty());
        }
    }
    
    

#### Python

    
    
    # 创建一个映射，将每个右括号映射到对应的左括号
    brackets = {')': '(', ']': '[', '}': '{'}
    
    # 创建一个栈来存储左括号
    stack = []
    
    # 读取一行输入
    input_str = input()
    
    # 遍历输入字符串中的每个字符
    for c in input_str:
        # 如果字符是左括号，将其压入栈中
        if c in '([{':
            stack.append(c)
        # 如果字符是右括号
        elif c in ')]}':
            # 如果栈为空或栈顶的左括号不匹配当前的右括号
            if not stack or stack.pop() != brackets[c]:
                print('false')
                exit(0)
    
    # 如果所有的括号都匹配，栈应该为空
    # 所以，如果栈为空，输出true，否则输出false
    print('false' if stack else 'true')
    
    

#### 完整用例

##### 用例1

    
    
    (1+2)/(0.5+1)
    

##### 用例2

    
    
    {[(1+2)]}/(0.5+1)
    

##### 用例3

    
    
    (1+2)/(0.5+1
    

##### 用例4

    
    
    (1+2)/(0.5+1})
    

##### 用例5

    
    
    (1+2)/(0.5+1)]
    

##### 用例6

    
    
    (1+2)/(0.5+1)
    

##### 用例7

    
    
    (1+2)/[(0.5+1)]
    

##### 用例8

    
    
    (1+2)/[{(0.5+1)}]
    

##### 用例9

    
    
    (1+2)/(0.5+1)
    

##### 用例10

    
    
    (1+2)/(0.5+1)
    

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

