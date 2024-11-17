#### 题目描述

给定一个输入字符串，字符串只可能由英文字母（ ‘a’ ~ ‘z’、‘A’ ~ ‘Z’ ）和左右小括号（ ‘(’、‘)’ ）组成。

当字符里存在小括号时，小括号是成对的，可以有一个或多个小括号对，小括号对不会嵌套，小括号对内可以包含1个或多个英文字母，也可以不包含英文字母。

当小括号对内包含多个英文字母时，这些字母之间是相互等效的关系，而且等效关系可以在不同的小括号对之间传递，即当存在 ‘a’ 和 ‘b’ 等效和存在 ‘b’ 和
‘c’ 等效时，‘a’ 和 ‘c’ 也等效，另外，同一个英文字母的大写字母和小写字母也相互等效（即使它们分布在不同的括号对里）

需要对这个输入字符串做简化，输出一个新的字符串，输出字符串里只需保留输入字符串里的没有被小括号对包含的字符（按照输入字符串里的字符顺序），并将每个字符替换为在小括号对里包含的且字典序最小的等效字符。

如果简化后的字符串为空，请输出为"0"。

示例 :  
输入字符串为"never(dont)give(run)up(f)()"，初始等效字符集合为(‘d’, ‘o’, ‘n’, ‘t’)、(‘r’, ‘u’,
‘n’)，由于等效关系可以传递，因此最终等效字符集合为(‘d’, ‘o’, ‘n’, ‘t’, ‘r’,
‘u’)，将输入字符串里的剩余部分按字典序最小的等效字符替换后得到"devedgivedp’

#### 输入描述

input_string

输入为1行，代表输入字符串

#### 输出描述

output_string

输出为1行，代表输出字符串

#### 备注

输入字符串的长度在1~100000之间

#### 用例

输入| ()abd  
---|---  
输出| abd  
说明| 输入字符串里没有被小括号包含的子字符串为"abd"，其中每个字符没有等效字符，输出为"abd"  
输入| (abd)demand(fb)()for  
---|---  
输出| aemanaaor  
说明| 等效字符集为('a', 'b', 'd',
'f')，输入字符串里没有被小括号包含的子字符串集合为'demandfor"，将其中字符替换为字典序最小的等效字符后输出为："aemanaaor"  
输入| ()happy(xyz)new(wxy)year(t)  
---|---  
输出| happwnewwear  
说明| 等效字符集为(‘x’, 'y', 'z',
'w')，输入字符串里没有被小括号包含的子字符串集合为"happynewyear"，将其中字符替换为字典序最小的等效字符后输出为："happwnewwear"  
输入| ()abcdefgAC(a)(Ab)(C)  
---|---  
输出| AAcdefgAC  
说明| 等效字符集为('a', 'A',
'b')，输入字符里没有被小括号包含的子字符串集合为"abcdefgAC"，将其中字符替换为字典序最小的等效字符后输出为："AAcdefgAC"  
  
#### 解题思路

上面的代码实现了一个字符串处理的功能。下面是代码的详细解题思路：

  1. 首先，创建一个Scanner对象用于读取用户输入的字符串。

  2. 读取用户输入的字符串。

  3. 创建一个StringBuilder对象用于存储最终的输出结果。

  4. 创建一个LinkedList对象用于存储等价集合。

  5. 创建一个标志变量`isInsideParentheses`，用于判断当前是否在括号内部，默认为false。

  6. 遍历输入字符串的每个字符：

     * 如果当前字符是左括号’('，则表示进入了括号内部，将`isInsideParentheses`设置为true，并创建一个新的等价集合，并将其添加到LinkedList中。
     * 如果当前字符是右括号’)'，则表示离开了括号内部，将`isInsideParentheses`设置为false，并检查最后一个等价集合是否为空集合，如果是空集合，则将其从LinkedList中移除。
     * 如果当前字符既不是左括号也不是右括号： 
       * 如果当前不在括号内部，则直接将字符添加到输出结果中。
       * 如果当前在括号内部，则将字符添加到最后一个等价集合中。
  7. 创建一个标志变量`merged`，用于判断是否进行了合并操作，默认为true。

  8. 循环执行合并操作，直到没有可以合并的等价集合为止：

     * 遍历等价集合LinkedList中的每个等价集合： 
       * 遍历等价集合LinkedList中的每个等价集合（从当前等价集合的下一个开始）： 
         * 创建一个标志变量`canCombine`，用于判断两个等价集合是否可以合并，默认为false。
         * 遍历字母’a’到’z’，判断两个等价集合是否可以合并： 
           * 如果两个等价集合中都包含当前字母或者对应的大写字母，则可以合并，将`canCombine`设置为true，并跳出循环。
         * 如果可以合并，则将第二个等价集合中的元素合并到第一个等价集合中，并从LinkedList中移除第二个等价集合，将`merged`设置为true，并跳出循环。
  9. 将输出结果转换为字符数组。

  10. 对每个等价集合进行处理，将等价集合中的字符替换为集合中的第一个字符。

  11. 将字符数组转换为字符串。

  12. 如果结果字符串为空，则将最终结果设置为"0"，否则将最终结果设置为结果字符串。

#### C++

    
    
    #include <iostream>
    #include <string>
    #include <vector>
    #include <set>
    #include <algorithm>
    
    using namespace std;
    
    int main() {
        // 读取用户输入的字符串
        string inputString;
        getline(cin, inputString);
    
        // 创建一个字符串，用于存储最终的输出结果
        string outputString = "";
    
        // 创建一个vector对象，用于存储等价集合
        vector<set<char>> equivalentSets;
    
        // 用于判断当前是否在括号内部的标志变量
        bool isInsideParentheses = false;
    
        // 遍历输入字符串的每个字符
        for (char currentChar : inputString) {
            // 如果当前字符是左括号'('，则表示进入了括号内部
            if (currentChar == '(') {
                isInsideParentheses = true;
                // 创建一个新的等价集合，并将其添加到vector中
                equivalentSets.push_back(set<char>());
            }
            // 如果当前字符是右括号')'，则表示离开了括号内部
            else if (currentChar == ')') {
                isInsideParentheses = false;
                // 如果最后一个等价集合为空集合，则将其从vector中移除
                if (equivalentSets.back().empty()) equivalentSets.pop_back();
            }
            // 如果当前字符既不是左括号也不是右括号
            else {
                // 如果当前不在括号内部，则直接将字符添加到输出结果中
                if (!isInsideParentheses) {
                    outputString += currentChar;
                }
                // 如果当前在括号内部，则将字符添加到最后一个等价集合中
                else {
                    equivalentSets.back().insert(currentChar);
                }
            }
        }
    
        // 用于判断是否进行了合并操作的标志变量
        bool merged = true;
        // 循环执行合并操作，直到没有可以合并的等价集合为止
        while (merged) {
            merged = false;
            // 遍历等价集合vector中的每个等价集合
            for (size_t i = 0; i < equivalentSets.size(); ++i) {
                for (size_t j = i + 1; j < equivalentSets.size(); ++j) {
                    bool canCombine = false;
                    // 遍历字母'a'到'z'，判断两个等价集合是否可以合并
                    for (char c = 'a'; c <= 'z'; ++c) {
                        char uppercaseC = static_cast<char>(c - 32);
                        if ((equivalentSets[i].count(c) || equivalentSets[i].count(uppercaseC)) && (equivalentSets[j].count(c) || equivalentSets[j].count(uppercaseC))) {
                            canCombine = true;
                            break;
                        }
                    }
                    // 如果可以合并，则将第二个等价集合中的元素合并到第一个等价集合中，并从vector中移除第二个等价集合
                    if (canCombine) {
                        equivalentSets[i].insert(equivalentSets[j].begin(), equivalentSets[j].end());
                        equivalentSets.erase(equivalentSets.begin() + j);
                        merged = true;
                        break;
                    }
                }
                if (merged) break;
            }
        }
    
        // 对每个等价集合进行处理，将等价集合中的字符替换为集合中的第一个字符
        for (const set<char>& eq : equivalentSets) {
            char firstChar = *eq.begin();
            for (char& c : outputString) {
                if (eq.count(c)) c = firstChar;
            }
        }
    
        // 如果结果字符串为空，则返回"0"，否则返回结果字符串
        string finalResult = outputString.empty() ? "0" : outputString;
        cout << finalResult << endl;
    
        return 0;
    }
    
    

#### 完整用例

##### 用例1

    
    
    ()abd
    

##### 用例2

    
    
    (abd)demand(fb)()for
    

##### 用例3

    
    
    ()happy(xyz)new(wxy)year(t)
    

##### 用例4

    
    
    ()abcdefgAC(a)(Ab)(C)
    

##### 用例5

    
    
    ()abc()def
    

##### 用例6

    
    
    (ab)cd(ef)gh
    

##### 用例7

    
    
    (Aa)BbCc(Dd)
    

##### 用例8

    
    
    (abc)def(ghi)jkl
    

##### 用例9

    
    
    ()AaBbCcDd
    

##### 用例10

    
    
    (ab)(cd)(ef)gh
    

#### 文章目录

  *     *       * 题目描述
      * 输入描述
      * 输出描述
      * 备注
      * 用例
      * 解题思路
      * C++
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

