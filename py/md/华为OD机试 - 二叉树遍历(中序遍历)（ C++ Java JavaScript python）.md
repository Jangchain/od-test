#### 题目描述

根据给定的二叉树结构描述字符串，输出该二叉树按照中序遍历结果字符串。中序遍历顺序为：左子树，根结点，右子树。

#### 输入描述

由大小写字母、左右大括号、逗号组成的字符串:字母代表一个节点值，左右括号内包含该节点的子节点。

左右子节点使用逗号分隔，逗号前为空则表示左子节点为空，没有逗号则表示右子节点为空。

二叉树节点数最大不超过100。

注:输入字符串格式是正确的，无需考虑格式错误的情况。

#### 输出描述

输出一个字符串为二叉树中序遍历各节点值的拼接结果。

#### 用例1

输入

    
    
    a{b{d,e{g,h{,i}}},c{f}}
    

输出

    
    
    dbgehiafc
    

#### 题目解析

输入的字符串描述了一个二叉树的结构，其中字母代表节点的值，左右括号内包含该节点的子节点。左子节点使用逗号分隔，逗号前为空则表示左子节点为空，没有逗号则表示右子节点为空。

我们需要根据给定的二叉树结构描述字符串，输出该二叉树按照中序遍历结果字符串。中序遍历顺序为：左子树，根结点，右子树。

解题思路如下：

  1. 首先，我们需要来记录左括号的索引，以便后续使用。
  2. 我们还需要存储节点值。我们可以将节点值存储为字符串类型。
  3. 遍历输入的字符串，对于每个字符： 
     * 如果是右括号 ‘}’，则说明一个子树的节点值已经结束。我们需要获取上一个左括号的索引，并将右括号后面的节点值拼接起来。
     * 如果是左括号 ‘{’，则说明一个子树的节点值开始。我们需要记录左括号的索引。
     * 如果是其他字符，则说明是一个节点的值。我们将节点值加入到栈中。
  4. 最后，我们可以输出栈中的第一个元素，即为中序遍历结果。

#### C++

    
    
    #include <iostream>
    #include <vector>
    #include <string>
    #include <sstream>
    using namespace std;
    int main() {
        string str;
        cin >> str;
        vector<int> indices;
        vector<string> stack;
        for (int i = 0; i < str.length(); i++) {
            char c = str[i];
            if (c == '}') {
                int index = indices.back();
                indices.pop_back();
                stringstream ss;
                while (index + 1 < stack.size()) {
                    ss << stack[index + 1];
                    stack.erase(stack.begin() + index + 1);
                }
                string subTree = ss.str();
                stack.pop_back();
                string root = stack.back();
                stack.pop_back();
                stringstream subTreeSS(subTree);
                string left, right;
                getline(subTreeSS, left, ',');
                getline(subTreeSS, right, ',');
                stack.push_back(left + root + right);
                continue;
            }
            if (c == '{') {
                indices.push_back(stack.size());
            }
            stack.push_back(string(1, c));
        }
        cout << stack[0] << endl;
        return 0;
    }
    

#### Java

    
    
    import java.util.LinkedList;
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            Scanner sc = new Scanner(System.in);
            String str = sc.next();
            LinkedList<Integer> indices = new LinkedList<>(); // 用于记录左括号的索引
            LinkedList<String> stack = new LinkedList<>(); // 用于存储节点值
            for (int i = 0; i < str.length(); i++) {
                char c = str.charAt(i);
                if (c == '}') {
                    int index = indices.removeLast(); // 获取上一个左括号的索引
                    StringBuilder sb = new StringBuilder();
                    while (index + 1 < stack.size()) { // 将右括号后面的节点值拼接起来
                        sb.append(stack.remove(index + 1));
                    }
                    String subTree = sb.toString();
                    stack.removeLast(); // 移除右括号
                    String root = stack.removeLast(); // 移除根节点
                    String[] split = subTree.split(",");
                    String left = split[0];
                    String right = split.length > 1 ? split[1] : "";
                    stack.addLast(left + root + right); // 将左子树、根节点、右子树拼接起来
                    continue;
                }
                if (c == '{') {
                    indices.addLast(stack.size()); // 记录左括号的索引
                }
                stack.addLast(c + ""); // 将节点值加入栈中
            }
            System.out.println(stack.get(0)); // 输出中序遍历结果
        }
    }
    

#### Python

    
    
    import re
    
    str = input()
    indices = [] # 用于记录左括号的索引
    stack = [] # 用于存储节点值
    for i in range(len(str)):
        c = str[i]
        if c == '}':
            index = indices.pop() # 获取上一个左括号的索引
            sb = ''
            while index + 1 < len(stack): # 将右括号后面的节点值拼接起来
                sb += stack.pop(index + 1)
            subTree = sb
            stack.pop() # 移除右括号
            root = stack.pop() # 移除根节点
            split = subTree.split(",")
            left = split[0]
            right = split[1] if len(split) > 1 else ''
            stack.append(left + root + right) # 将左子树、根节点、右子树拼接起来
            continue
        if c == '{':
            indices.append(len(stack)) # 记录左括号的索引
        stack.append(c) # 将节点值加入栈中
    
    print(stack[0]) # 输出中序遍历结果
    

#### JavaScript

    
    
    const readline = require('readline');
    
       const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
    
      rl.on('line', (str) => {
        const indices = []; // 用于记录左括号的索引
        const stack = []; // 用于存储节点值
    
        for (let i = 0; i < str.length; i++) {
          const c = str.charAt(i);
    
          if (c === '}') {
            const index = indices.pop(); // 获取上一个左括号的索引
            const sb = [];
            
            while (index + 1 < stack.length) { // 将右括号后面的节点值拼接起来
              sb.push(stack.splice(index + 1, 1)[0]);
            }
    
            const subTree = sb.join('');
            stack.pop(); // 移除右括号
            const root = stack.pop(); // 移除根节点
            const split = subTree.split(',');
            const left = split[0];
            const right = split.length > 1 ? split[1] : '';
            stack.push(left + root + right); // 将左子树、根节点、右子树拼接起来
            continue;
          }
    
          if (c === '{') {
            indices.push(stack.length); // 记录左括号的索引
          }
    
          stack.push(c); // 将节点值加入栈中
        }
    
        console.log(stack[0]); // 输出中序遍历结果
        rl.close();
      });
     
    

> #### 文章目录
>
>   *     *       * 题目描述
>       * 输入描述
>       * 输出描述
>       * 用例1
>       * 题目解析
>       * C++
>       * Java
>       * Python
>       * JavaScript
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

![doutub_gif](https://i-blog.csdnimg.cn/blog_migrate/e9413fcd109f2f3d7297192eab0c0b2a.gif)

#### 完整用例

##### 用例1

a{b{c,d},e{f,g}}

##### 用例2

a{b{c{d{e}}}}

##### 用例3

a{b{c,d{e{f{g}}}}}

##### 用例4

a{b{,c{d{,e}}}}

##### 用例5

a{b{d,e{g,h{,i}}},c{f}}

##### 用例6

a{b{c{d{e{f{g,h}}}}},i}

##### 用例7

a{b{c{d,e},f{g,h}},i{j,k}}

##### 用例8

a{b{c,d{e,f}},g{h,i}}

##### 用例9

a{b{c,d},e{f,g{h,i}}}

##### 用例10

a{b{c{d,e{f,g}},h},i}

