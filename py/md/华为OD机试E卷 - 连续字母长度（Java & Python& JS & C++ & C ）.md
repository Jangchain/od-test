## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

给定一个字符串，只包含大写字母，求在包含同一字母的子串中，长度第 k 长的子串的长度，相同字母只取最长的那个子串。

## 输入描述

第一行有一个子串(1<长度<=100)，只包含大写字母。

## 输出描述

输出连续出现次数**第k多** 的字母的次数。

## 示例1

输入

    
    
    AAAAHHHBBCDHHHH
    3
    

输出

    
    
    2
    

说明

> 同一字母连续出现的最多的是A和H，四次；  
>  第二多的是H，3次，但是H已经存在4个连续的，故不考虑；  
>  下个最长子串是BB，所以最终答案应该输出2。

## 示例2

输入

    
    
    AABAAA
    2
    

输出

    
    
    1
    

说明

> 同一字母连续出现的最多的是A，三次；  
>  第二多的还是A，两次，但A已经存在最大连续次数三次，故不考虑；  
>  下个最长子串是B，所以输出1。

## 示例3

输入

    
    
    ABC
    4
    

输出

    
    
    -1
    

说明

> 只含有3个包含同一字母的子串，小于k，输出-1

## 示例4

输入

    
    
    ABC
    2
    

输出

    
    
    1
    

说明

> 三个子串长度均为1，所以此时k = 1，k=2，k=3这三种情况均输出1。

## 解题思路

题目要求我们找到一个字符串中由相同字母连续组成的第 k
长子串的长度。需要注意的是，如果某个字母的子串出现多个，且这些子串的长度不同，则只取最长的那个。若字串数量不足 k 个，则返回 -1。

**例子解释：**

  1. **输入例子 1：**
    
        输入：
    AAAAHHHBBCDHHHH
    3
    输出：
    2
    

     * 解释：连续出现最多的字母子串是 “AAAA” 和 “HHHH”，长度为 4。
     * 第二长的子串是 “HHH” (但已经有一个长度为4的 “HHHH” 不考虑)，所以下一个考虑的最长子串是 “BB”，长度为 2。
     * 所以输出为 2。
  2. **输入例子 2：**
    
        输入：
    AABAAA
    2
    输出：
    1
    

     * 解释：最长的连续字母子串是 “AAA”，长度为 3。
     * 第二长的是 “AA” (但已经有一个长度为3的 “AAA” 不考虑)，所以下一个最长的子串是 “B”，长度为 1。
     * 所以输出为 1。
  3. **输入例子 3：**
    
        输入：
    ABC
    4
    输出：
    -1
    

     * 解释：只含有3个由相同字母组成的子串（“A”, “B”, “C”），且每个子串的长度都是 1。
     * 因为 k=4，但只存在3个子串，所以输出 -1。
  4. **输入例子 4：**
    
        输入：
    ABC
    2
    输出：
    1
    

     * 解释：三个子串长度均为 1，所以不管 k 是 1, 2, 3，只要是有效的范围，输出的最长子串的长度都为 1。

## Java

    
    
    import java.util.Scanner;            
    import java.util.HashSet;         
    import java.util.HashMap;            
    import java.util.regex.Pattern;      
    import java.util.regex.Matcher;     
    import java.util.ArrayList;       
    import java.util.Collections;      
    
    public class Main {
        public static void main(String[] args) {
            Scanner input = new Scanner(System.in);  
            String str = input.next();              // 读取字符串输入
            int k = input.nextInt();                // 读取整数k值
    
            HashSet<Character> charSet = new HashSet<>(); // 创建HashSet，用于存储字符串中不同的字符
            for (char c : str.toCharArray()) {           // 遍历字符串中的每个字符
                charSet.add(c);                          // 将字符添加到HashSet中（自动去重）
            }
    
            HashMap<Character, Integer> charMap = new HashMap<>(); // 创建HashMap，用于存储每个字符的最长子串长度
            for (char c : charSet) {                               // 遍历HashSet中的每个字符
                // 创建一个正则表达式模式，用于匹配当前字符的连续子串
                Pattern pattern = Pattern.compile(String.valueOf(c) + "+");
                // 使用Matcher在字符串中查找所有匹配的子串
                Matcher matcher = pattern.matcher(str);
                while (matcher.find()) {                         // 当找到匹配的子串时
                    int repeatTimes = matcher.group().length();  // 获取匹配子串的长度
                    // 更新HashMap中的最长子串长度
                    if (charMap.containsKey(c)) { 
                        // 如果当前字符已在Map中，比较并存储最大长度
                        charMap.put(c, Math.max(charMap.get(c), repeatTimes));
                    } else {
                        // 如果当前字符不在Map中，直接存储当前长度
                        charMap.put(c, repeatTimes);
                    }
                }
            }
    
            // 将所有字符的最长子串长度存储到ArrayList中
            ArrayList<Integer> values = new ArrayList<>(charMap.values());
            // 对ArrayList中的长度值进行降序排序
            Collections.sort(values, Collections.reverseOrder());
            // 如果k大于ArrayList中的元素数量，返回-1，否则返回第k大的长度值
            int rt = k > values.size() ? -1 : values.get(k - 1);
            System.out.println(rt); // 输出结果
        }
    }
    

## Python

    
    
    import re
    
    str = input()
    k = int(input())
    charSet = set(str)
    charMap = {}
    for c in charSet:
        reg = re.compile(c + "+")
        it = re.finditer(reg, str)
        for match in it:
            repeatTimes = len(match.group())
            if c in charMap:
                charMap[c] = max(charMap[c], repeatTimes)
            else:
                charMap[c] = repeatTimes
    values = list(charMap.values())
    values.sort(reverse=True)
    rt = -1 if k > len(values) else values[k-1]
    print(rt)
    
    

## JavaScript

    
    
    const { listeners } = require("process"); 
    const readline = require("readline");  
    const { isNumber } = require("util");  
    
     
    const rl = readline.createInterface({
      input: process.stdin,  
      output: process.stdout  
    });
    
     
    rl.on("line", (str) => {  
      rl.on("line", (k) => {  
    
        // 创建一个Set集合，用于存储字符串中的唯一字符
        let set = new Set(str);
        // 创建一个空对象，用于存储每个字符的最长连续子串长度
        let obj = {};
    
        // 遍历Set集合中的每个字符
        for (let letter of set) {
          // 创建一个正则表达式，用于匹配当前字符的连续子串
          const reg = new RegExp(`${letter}+`, "g");
    
          // 无限循环，直到正则表达式匹配结束
          while (true) {
            // 使用正则表达式在字符串中查找匹配的子串
            let res = reg.exec(str);
            if (res === null) { // 如果没有更多匹配的子串，则跳出循环
              break;
            } else {
              // 获取匹配子串的长度
              let repeatTimes = res[0].length;
              // 更新对象中当前字符的最长子串长度
              obj[letter] = obj[letter]
                ? Math.max(obj[letter], repeatTimes) // 如果已存在该字符，则取最大长度
                : repeatTimes; // 如果不存在，则直接存储当前长度
            }
          }
        }
    
        // 对对象中所有字符的最长子串长度进行降序排序，并返回第k大的值，如果k超出范围则返回-1
        let res = Object.values(obj).sort((a, b) => b - a)[k - 1] ?? -1;
        console.log(res); // 输出结果
    
      });
    });
    

## C++

    
    
    #include <iostream>       
    #include <string>        
    #include <unordered_map>  
    #include <unordered_set> 
    #include <regex>         
    using namespace std;
    
    int main() {
        string str; // 定义字符串变量，用于存储输入的字符串
        int k = 0;  // 定义整数变量，用于存储输入的k值
        cin >> str; // 从输入中读取字符串
        cin >> k;   // 从输入中读取k值
    
        unordered_set<char> charSet; // 定义无序集合，用于存储字符串中出现的不同字符
        for (char c : str) {
            charSet.insert(c); // 遍历字符串，将每个字符插入集合中（自动去重）
        }
    
        unordered_map<char, int> charMap; // 定义无序映射，用于存储每个字符对应的最长连续子串长度
        for (char c : charSet) { 
            // 对于集合中的每个字符，构造一个正则表达式，匹配该字符的连续子串
            const regex reg(string(1, c) + "+"); 
            // 使用正则表达式在字符串中查找所有匹配的子串
            sregex_iterator it(str.begin(), str.end(), reg);
            while (it != sregex_iterator()) {
                int repeatTimes = it->str().length(); // 获取匹配子串的长度
                // 更新映射中的最长子串长度，如果当前长度大于已存储的长度，则更新
                charMap[c] = charMap.count(c) ? max(charMap[c], repeatTimes) : repeatTimes;
                ++it; // 继续查找下一个匹配的子串
            }
        }
    
        vector<int> values; // 定义一个向量，用于存储所有字符的最长子串长度
        for (auto it : charMap) {
            values.push_back(it.second); // 将映射中的长度值添加到向量中
        }
        // 对向量中的长度值进行降序排序
        sort(values.begin(), values.end(), greater<int>());
        // 如果k大于向量中的元素数量，则返回-1，否则返回第k大的长度值
        int rt = k > values.size() ? -1 : values[k - 1];
        cout << rt << endl; // 输出结果
        return 0; // 程序正常结束
    }
    

## C语言

    
    
    #include <stdio.h>
    #include <string.h>
    
    int main() {
        char str[101]; // 存储输入的字符串，最大长度100
        int k, charMaxCount[26] = {0}, count = 0, maxCount = 0;
        scanf("%s", str); // 读取字符串
        scanf("%d", &k); // 读取k的值
    
        // 计算每个字符的最大连续出现次数
        int len = strlen(str);
        for (int i = 0; i < len; i++) {
            if (i == 0 || str[i] != str[i - 1]) {
                count = 1; // 如果当前字符和前一个字符不同，重置计数器
            } else {
                count++; // 如果当前字符和前一个字符相同，增加计数器
            }
    
            int index = str[i] - 'A'; // 将字符转换为索引（0-25）
            if (count > charMaxCount[index]) {
                charMaxCount[index] = count; // 更新字符的最大连续出现次数
            }
        }
    
        // 将连续出现次数存储在数组中，并排序
        int counts[26], j = 0;
        for (int i = 0; i < 26; i++) {
            if (charMaxCount[i] > 0) {
                counts[j++] = charMaxCount[i];
            }
        }
    
        // 冒泡排序
        for (int i = 0; i < j - 1; i++) {
            for (int p = 0; p < j - i - 1; p++) {
                if (counts[p] < counts[p + 1]) {
                    int temp = counts[p];
                    counts[p] = counts[p + 1];
                    counts[p + 1] = temp;
                }
            }
        }
    
        // 输出结果
        if (k > j) {
            printf("-1\n"); // 如果k大于数组长度，输出-1
        } else {
            printf("%d\n", counts[k - 1]); // 输出第k多的字符的次数
        }
    
        return 0;
    }
    
    

![fengmian](https://i-blog.csdnimg.cn/blog_migrate/8e830fb23685a4c7f5e25f4ff62f2493.png)

## 完整用例

### 用例1

    
    
    AAAAHHHBBCDHHHH
    3
    

### 用例2

    
    
    ABCDDEFG
    1
    

### 用例3

    
    
    ABC
    4
    

### 用例4

    
    
    HHHHHHHHH
    5
    

### 用例5

    
    
    AAABBBCCC
    2
    

### 用例6

    
    
    ABBBCCCCCDDDDEEEEEE
    4
    

### 用例7

    
    
    AABBCCDDEEFFGGHHIIJJKKLLMMNNOOPPQQRRSSTTUUVVWWXXYYZZ
    10
    

### 用例8

    
    
    AAABBBCCCDDDEEEFFFGGGHHHIIIIJJJKKKLLLMMMNNNNOOO
    3
    

### 用例9

    
    
    AAAABBBBCCCCDDDDDEEEEEFFFFFGGGGGHHHHHIIIIIJJJJJ
    2
    

### 用例10

    
    
    ABCDEFGHHHHHHIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII
    1
    

