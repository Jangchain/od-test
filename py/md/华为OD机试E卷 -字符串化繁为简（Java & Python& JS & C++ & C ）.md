## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

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

## 输入描述

input_string

输入为1行，代表输入字符串

##### 备注

输入字符串的长度在1~100000之间

## 输出描述

output_string

输出为1行，代表输出字符串

## 示例1

输入

    
    
    ()abd
    

输出

    
    
    abd
    

说明

> 输入字符串里没有被小括号包含的子字符串为"abd"，其中每个字符没有等效字符，输出为"abd"

## 示例2

输入

    
    
    (abd)demand(fb)()for
    

输出

    
    
    aemanaaor
    

## 示例3

输入

    
    
    ()happy(xyz)new(wxy)year(t)
    

输出

    
    
    happwnewwear
    

说明

> 等效字符集为(‘x’, ‘y’, ‘z’,
> ‘w’)，输入字符串里没有被小括号包含的子字符串集合为"happynewyear"，将其中字符替换为字典序最小的等效字符后输出为：“happwnewwear”

## 示例4

输入

    
    
    ()abcdefgAC(a)(Ab)(C)
    

输出

    
    
    AAcdefgAC
    

说明

> 等效字符集为(‘a’, ‘A’,
> ‘b’)，输入字符里没有被小括号包含的子字符串集合为"abcdefgAC"，将其中字符替换为字典序最小的等效字符后输出为：“AAcdefgAC”

## 解题思路

题目的核心要求是对字符串中的字符进行等效关系的解析和替换，其中小括号内的字符表明了字符之间的等效关系，等效关系可以跨多个小括号传递，且大小写字母也视为等效。基于这些等效关系，我们需要替换字符串中未被小括号包围的字符，使用其等效集合中字典序最小的字符进行替换。

具体如下：

  1. **等效字符集** ：当字符被包含在小括号中时，且括号内必须是多个字符，这些字符互相等效。例如在`(abd)`中，`a`、`b`、和`d`互相等效。

  2. **传递性** ：等效关系具有传递性，即如果`a`等效于`b`，且`b`等效于`c`，则`a`也等效于`c`。例如，如果`(a)(Ab)`，则由于`a`和`A`都等效，并且`A`和`b`等效，最终`a`、`A`、`b`三者互相等效。

  3. **大小写等效** ：题目规定不同大小写的同一字母也是等效的，即`A`等效于`a`。

  4. **输出字符的选择** ：对于字符串中未被小括号包含的每个字符，需要在其所有等效字符中选择字典序最小的字符进行替换。

  5. **示例解释** ：

     * `()abd`：没有括号内字符，所以`abd`不变。
     * `(abd)demand(fb)()for`：这里`abd`和`fb`中的字符互相等效，因此输出替换后的`d`、`e`、`m`、`a`、`n`、`d`、`f`、`o`、`r`为`a`、`e`、`m`、`a`、`n`、`a`、`a`、`o`、`r`。
     * `()happy(xyz)new(wxy)year(t)`：这里`xyz`和`wxy`中的字符互相等效，`t`无关系，所以替换`happynewyear`中的`x`, `y`, `w`为字典序最小的`w`。
     * `()abcdefgAC(a)(Ab)(C)`：这里`a`, `A`, `b`互相等效，所以在`abcdefgAC`中，`a`, `b`和`C`被替换为`A`。

## Java

    
    
     
    import java.util.LinkedList;
    import java.util.Scanner;
    import java.util.TreeSet;
    
    public class Main {
        public static void main(String[] args) {
            // 创建一个Scanner对象，用于读取用户输入
            Scanner scanner = new Scanner(System.in);
            // 读取用户输入的字符串
            String inputString = scanner.nextLine();
            // 创建一个StringBuilder对象，用于存储最终的输出结果
            StringBuilder outputStringBuilder = new StringBuilder();
            // 创建一个LinkedList对象，用于存储等价集合
            LinkedList<TreeSet<Character>> equivalentSets = new LinkedList<>();
    
            // 用于判断当前是否在括号内部的标志变量
            boolean isInsideParentheses = false;
    
            // 遍历输入字符串的每个字符
            for (int i = 0; i < inputString.length(); i++) {
                // 获取当前字符
                char currentChar = inputString.charAt(i);
    
                // 如果当前字符是左括号'('，则表示进入了括号内部
                if (currentChar == '(') {
                    isInsideParentheses = true;
                    // 创建一个新的等价集合，并将其添加到LinkedList中
                    equivalentSets.add(new TreeSet<>());
                }
                // 如果当前字符是右括号')'，则表示离开了括号内部
                else if (currentChar == ')') {
                    isInsideParentheses = false;
                    // 如果最后一个等价集合为空集合，则将其从LinkedList中移除
                    if (equivalentSets.getLast().size() == 0) equivalentSets.removeLast();
                }
                // 如果当前字符既不是左括号也不是右括号
                else {
                    // 如果当前不在括号内部，则直接将字符添加到输出结果中
                    if (!isInsideParentheses) {
                        outputStringBuilder.append(currentChar);
                    }
                    // 如果当前在括号内部，则将字符添加到最后一个等价集合中
                    else {
                        equivalentSets.getLast().add(currentChar);
                    }
                }
            }
    
            // 用于判断是否进行了合并操作的标志变量
            boolean merged = true;
            // 循环执行合并操作，直到没有可以合并的等价集合为止
            while (merged) {
                merged = false;
                // 遍历等价集合LinkedList中的每个等价集合
                for (int i = 0; i < equivalentSets.size(); i++) {
                    for (int j = i + 1; j < equivalentSets.size(); j++) {
                        boolean canCombine = false;
                        // 遍历字母'a'到'z'，判断两个等价集合是否可以合并
                        for (char c = 'a'; c <= 'z'; c++) {
                            char uppercaseC = (char) (c - 32);
                            if ((equivalentSets.get(i).contains(c) || equivalentSets.get(i).contains(uppercaseC)) && (equivalentSets.get(j).contains(c) || equivalentSets.get(j).contains(uppercaseC))) {
                                canCombine = true;
                                break;
                            }
                        }
                        // 如果可以合并，则将第二个等价集合中的元素合并到第一个等价集合中，并从LinkedList中移除第二个等价集合
                        if (canCombine) {
                            equivalentSets.get(i).addAll(equivalentSets.get(j));
                            equivalentSets.remove(j);
                            merged = true;
                            break;
                        }
                    }
                    if (merged) break;
                }
            }
    
            // 将输出结果转换为字符数组
            char[] outputCharArray = outputStringBuilder.toString().toCharArray();
    
            // 对每个等价集合进行处理，将等价集合中的字符替换为集合中的第一个字符
            for (TreeSet<Character> eq : equivalentSets) {
                Character firstChar = eq.first();
                for (int i = 0; i < outputCharArray.length; i++) {
                    if (eq.contains(outputCharArray[i])) outputCharArray[i] = firstChar;
                }
            }
    
            // 将字符数组转换为字符串
            String resultString = new String(outputCharArray);
    
            // 如果结果字符串为空，则返回"0"，否则返回结果字符串
            String finalResult = resultString.length() == 0 ? "0" : resultString;
            System.out.println(finalResult);
        }
    }
     
    
    

## Python

    
    
    from collections import deque
    from typing import List, Set
    
    def main():
        # 创建一个输入函数，用于读取用户输入
        input_string = input()
        # 创建一个列表，用于存储最终的输出结果
        output_string_builder = []
        # 创建一个双端队列对象，用于存储等价集合
        equivalent_sets = deque()
    
        # 用于判断当前是否在括号内部的标志变量
        is_inside_parentheses = False
    
        # 遍历输入字符串的每个字符
        for current_char in input_string:
            # 如果当前字符是左括号'('，则表示进入了括号内部
            if current_char == '(':
                is_inside_parentheses = True
                # 创建一个新的等价集合，并将其添加到双端队列中
                equivalent_sets.append(set())
            # 如果当前字符是右括号')'，则表示离开了括号内部
            elif current_char == ')':
                is_inside_parentheses = False
                # 如果最后一个等价集合为空集合，则将其从双端队列中移除
                if len(equivalent_sets[-1]) == 0:
                    equivalent_sets.pop()
            # 如果当前字符既不是左括号也不是右括号
            else:
                # 如果当前不在括号内部，则直接将字符添加到输出结果中
                if not is_inside_parentheses:
                    output_string_builder.append(current_char)
                # 如果当前在括号内部，则将字符添加到最后一个等价集合中
                else:
                    equivalent_sets[-1].add(current_char)
    
        # 用于判断是否进行了合并操作的标志变量
        merged = True
        # 循环执行合并操作，直到没有可以合并的等价集合为止
        while merged:
            merged = False
            # 遍历等价集合双端队列中的每个等价集合
            for i in range(len(equivalent_sets)):
                for j in range(i + 1, len(equivalent_sets)):
                    can_combine = False
                    # 遍历字母'a'到'z'，判断两个等价集合是否可以合并
                    for c in range(ord('a'), ord('z') + 1):
                        uppercase_c = chr(c - 32)
                        if (chr(c) in equivalent_sets[i] or uppercase_c in equivalent_sets[i]) and (chr(c) in equivalent_sets[j] or uppercase_c in equivalent_sets[j]):
                            can_combine = True
                            break
                    # 如果可以合并，则将第二个等价集合中的元素合并到第一个等价集合中，并从双端队列中移除第二个等价集合
                    if can_combine:
                        equivalent_sets[i].update(equivalent_sets[j])
                        del equivalent_sets[j]
                        merged = True
                        break
                if merged:
                    break
    
        # 对每个等价集合进行处理，将等价集合中的字符替换为集合中的第一个字符
        for eq in equivalent_sets:
            first_char = min(eq)
            for i in range(len(output_string_builder)):
                if output_string_builder[i] in eq:
                    output_string_builder[i] = first_char
    
        # 将字符列表转换为字符串
        result_string = ''.join(output_string_builder)
    
        # 如果结果字符串为空，则返回"0"，否则返回结果字符串
        final_result = "0" if len(result_string) == 0 else result_string
        print(final_result)
    
    if __name__ == "__main__":
        main()
    
    
    

## JavaScript

    
    
    // 导入readline模块，用于读取用户输入
    const readline = require('readline');
    
    // 创建readline接口实例
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    // 监听用户输入事件
    rl.on('line', (input) => {
        // 创建一个列表，用于存储最终的输出结果
        let outputString = [];
        // 创建一个数组，用于存储等价集合
        let equivalentSets = [];
    
        // 用于判断当前是否在括号内部的标志变量
        let isInsideParentheses = false;
    
        // 遍历输入字符串的每个字符
        for (let currentChar of input) {
            // 如果当前字符是左括号'('，则表示进入了括号内部
            if (currentChar === '(') {
                isInsideParentheses = true;
                // 创建一个新的等价集合，并将其添加到数组中
                equivalentSets.push(new Set());
            }
            // 如果当前字符是右括号')'，则表示离开了括号内部
            else if (currentChar === ')') {
                isInsideParentheses = false;
                // 如果最后一个等价集合为空集合，则将其从数组中移除
                if (equivalentSets[equivalentSets.length - 1].size === 0) {
                    equivalentSets.pop();
                }
            }
            // 如果当前字符既不是左括号也不是右括号
            else {
                // 如果当前不在括号内部，则直接将字符添加到输出结果中
                if (!isInsideParentheses) {
                    outputString.push(currentChar);
                }
                // 如果当前在括号内部，则将字符添加到最后一个等价集合中
                else {
                    equivalentSets[equivalentSets.length - 1].add(currentChar);
                }
            }
        }
    
        // 用于判断是否进行了合并操作的标志变量
        let merged = true;
        // 循环执行合并操作，直到没有可以合并的等价集合为止
        while (merged) {
            merged = false;
            // 遍历等价集合数组中的每个等价集合
            for (let i = 0; i < equivalentSets.length; i++) {
                for (let j = i + 1; j < equivalentSets.length; j++) {
                    let canCombine = false;
                    // 遍历字母'a'到'z'，判断两个等价集合是否可以合并
                    for (let c = 'a'.charCodeAt(0); c <= 'z'.charCodeAt(0); c++) {
                        let uppercaseC = String.fromCharCode(c - 32);
                        if ((equivalentSets[i].has(String.fromCharCode(c)) || equivalentSets[i].has(uppercaseC)) && (equivalentSets[j].has(String.fromCharCode(c)) || equivalentSets[j].has(uppercaseC))) {
                            canCombine = true;
                            break;
                        }
                    }
                    // 如果可以合并，则将第二个等价集合中的元素合并到第一个等价集合中，并从数组中移除第二个等价集合
                    if (canCombine) {
                        equivalentSets[i] = new Set([...equivalentSets[i], ...equivalentSets[j]]);
                        equivalentSets.splice(j, 1);
                        merged = true;
                        break;
                    }
                }
                if (merged) {
                    break;
                }
            }
        }
    
        // 对每个等价集合进行处理，将等价集合中的字符替换为集合中的第一个字符
        for (let eq of equivalentSets) {
            let firstChar = [...eq].sort()[0];
            outputString = outputString.map(char => eq.has(char) ? firstChar : char);
        }
    
        // 如果结果字符串为空，则返回"0"，否则返回结果字符串
        let finalResult = outputString.length === 0 ? "0" : outputString.join('');
        console.log(finalResult);
    });
    
    
    

## C++

    
    
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
    
    
    

## C语言

    
    
    #include <stdio.h>
    #include <string.h>
    #include <stdlib.h>
    #include <ctype.h>  // 用于字符大小写转换
    
    #define MAX_SIZE 1000  // 定义输入字符串的最大长度
    
    // 定义字符集合结构体，用于存储和处理字符
    typedef struct {
        char elements[256];  // 存储集合中的所有字符
        int count[256];      // 对应字符是否在集合中的标记数组
    } TreeSet;
    
    // 初始化字符集合，将所有字符的存在标记置为0
    void initTreeSet(TreeSet *set) {
        memset(set->count, 0, sizeof(set->count));  // 使用memset函数初始化计数数组为0
    }
    
    // 向字符集合中添加字符
    void addCharToSet(TreeSet *set, char c) {
        int index = (unsigned char)c;  // 将字符转换为无符号字符，避免负索引
        if (set->count[index] == 0) {
            set->elements[index] = c;  // 如果字符未存在，则添加到元素数组中
        }
        set->count[index] = 1;  // 标记字符存在
    }
    
    // 检查字符集合中是否包含指定字符
    int setContains(TreeSet *set, char c) {
        return set->count[(unsigned char)c];  // 返回字符存在的标记
    }
    
    // 将两个字符集合合并为一个
    void mergeSets(TreeSet *dest, TreeSet *src) {
        for (int i = 0; i < 256; i++) {
            if (src->count[i]) {
                addCharToSet(dest, src->elements[i]);  // 如果源集合中存在字符，则添加到目标集合中
            }
        }
    }
    
    int main() {
        char inputString[MAX_SIZE];  // 输入字符串
        char outputString[MAX_SIZE];  // 输出字符串
        int outputIndex = 0;  // 输出字符串索引
    
        TreeSet sets[MAX_SIZE];  // 等价集合数组
        int numSets = 0;  // 等价集合数量
        int isInsideParentheses = 0;  // 标记是否在括号内部
    
        fgets(inputString, MAX_SIZE, stdin);  // 读取输入字符串
        inputString[strcspn(inputString, "\n")] = 0;  // 移除字符串末尾的换行符
    
        // 遍历输入字符串中的每个字符
        for (int i = 0; i < strlen(inputString); i++) {
            char currentChar = inputString[i];  // 当前字符
            if (currentChar == '(') {
                isInsideParentheses = 1;  // 标记进入括号内部
                initTreeSet(&sets[numSets++]);  // 初始化新集合并增加集合计数
            } else if (currentChar == ')') {
                isInsideParentheses = 0;  // 标记离开括号内部
            } else {
                if (!isInsideParentheses) {
                    outputString[outputIndex++] = currentChar;  // 如果不在括号内，直接添加到输出字符串
                } else {
                    addCharToSet(&sets[numSets - 1], currentChar);  // 在括号内，添加字符到最新的集合中
                }
            }
        }
    
        // 合并可合并的集合
        int merged = 1;
        while (merged) {
            merged = 0;
            for (int i = 0; i < numSets; i++) {
                for (int j = i + 1; j < numSets; j++) {
                    for (char c = 'a'; c <= 'z'; c++) {
                        if ((setContains(&sets[i], c) || setContains(&sets[i], toupper(c))) &&
                            (setContains(&sets[j], c) || setContains(&sets[j], toupper(c)))) {
                            mergeSets(&sets[i], &sets[j]);  // 合并集合
    
                            // 移除已合并的集合
                            for (int k = j; k < numSets - 1; k++) {
                                sets[k] = sets[k + 1];
                            }
                            numSets--;
                            merged = 1;
                            break;
                        }
                    }
                    if (merged) break;
                }
                if (merged) break;
            }
        }
    
        // 应用等价集合的替换规则，将输出中的字符替换为等价集合的首字符
        for (int s = 0; s < numSets; s++) {
            char firstChar = 0;
            for (int c = 0; c < 256; c++) {
                if (sets[s].count[c]) {
                    firstChar = sets[s].elements[c];
                    break;
                }
            }
            for (int i = 0; i < outputIndex; i++) {
                if (setContains(&sets[s], outputString[i])) {
                    outputString[i] = firstChar;  // 替换字符
                }
            }
        }
    
        outputString[outputIndex] = '\0';  // 确保输出字符串正确终止
        printf("%s\n", outputIndex ? outputString : "0");  // 输出最终结果
    
        return 0;
    }
    
    

![fengmian](https://i-blog.csdnimg.cn/blog_migrate/924d600e6a8b326c819fba49f7017922.png)

