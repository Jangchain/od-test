#### 题目描述

现有一字符串仅由 ‘(‘，’)’，‘{‘，’}’，’[‘，’]’六种括号组成。

若字符串满足以下条件之一，则为无效字符串：

①任一类型的左右括号数量不相等；

②存在未按正确顺序（先左后右）闭合的括号。

输出括号的最大嵌套深度，若字符串无效则输出0。

0≤字符串长度≤100000

#### 输入描述

一个只包括 ‘(‘，’)’，‘{‘，’}’，’[‘，’]’的字符串

#### 输出描述

一个整数，最大的括号深度

#### 用例

输入| ([]{()})  
---|---  
输出| 3  
说明| 有效字符串，最大嵌套深度为3  
输入| (]  
---|---  
输出| 0  
说明| 无效字符串，有两种类型的左右括号数量不相等  
输入| ([)]  
---|---  
输出| 0  
说明| 无效字符串，存在未按正确顺序闭合的括号  
输入| )(  
---|---  
输出| 0  
说明| 无效字符串，存在未按正确顺序闭合的括号。  
  
#### C++

    
    
    #include <iostream>
    #include <unordered_map>
    #include <deque>
    using namespace std;
    
    int main() {
        string s;
        getline(cin, s);
        unordered_map<char, char> map = {{')', '('}, {']', '['}, {'}', '{'}};
        deque<char> stack;
        stack.push_back(s[0]);
        int maxDepth = 0, depth = 0;
        for (int i = 1; i < s.size(); i++) {
            char c = s[i];
            if (map[c] == stack.back()) {
                stack.pop_back();
                depth++;
                maxDepth = max(maxDepth, depth);
            } else {
                depth = 0;
                stack.push_back(c);
            }
        }
        if (!stack.empty()) {
            cout << 0 << endl;
            return 0;
        }
        cout << maxDepth << endl;
        return 0;
    }
    
    

#### JavaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.on('line', (input) => {
      const s = input;
      const map = {')': '(', ']': '[', '}': '{'};
      const stack = [s[0]];
      let maxDepth = 0, depth = 0;
      for (let i = 1; i < s.length; i++) {
        const c = s[i];
        if (map[c] === stack[stack.length - 1]) {
          stack.pop();
          depth++;
          maxDepth = Math.max(maxDepth, depth);
        } else {
          depth = 0;
          stack.push(c);
        }
      }
      if (stack.length !== 0) {
        console.log(0);
        return;
      }
      console.log(maxDepth);
    });
    

#### Java

    
    
    import java.util.*;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            String s = scanner.nextLine();
            Map<Character, Character> map = new HashMap<Character, Character>() {{
                put(')', '(');
                put(']', '[');
                put('}', '{');
            }};
            Deque<Character> stack = new ArrayDeque<>();
            stack.push(s.charAt(0));
            int maxDepth = 0, depth = 0;
            for (int i = 1; i < s.length(); i++) {
                char c = s.charAt(i);
                if (map.get(c) == stack.peek()) {
                    stack.pop();
                    depth++;
                    maxDepth = Math.max(maxDepth, depth);
                } else {
                    depth = 0;
                    stack.push(c);
                }
            }
            if (!stack.isEmpty()) {
                System.out.println(0);
                return;
            }
            System.out.println(maxDepth);
        }
    }
    

#### Python

    
    
    import sys
    from collections import deque
    
    s = sys.stdin.readline().strip()
    map = {')': '(', ']': '[', '}': '{'}
    stack = deque()
    stack.append(s[0])
    maxDepth, depth = 0, 0
    for i in range(1, len(s)):
        c = s[i]
        if map.get(c) == stack[-1]:
            stack.pop()
            depth += 1
            maxDepth = max(maxDepth, depth)
        else:
            depth = 0
            stack.append(c)
    if stack:
        print(0)
    else:
        print(maxDepth)
    

#### 文章目录

  *     *       * 题目描述
      * 输入描述
      * 输出描述
      * 用例
      * C++
      * JavaScript
      * Java
      * Python

![fengmian](https://img-
blog.csdnimg.cn/img_convert/1d2f33ed8cf2fb1b9a4fe09513f7aa94.png)

