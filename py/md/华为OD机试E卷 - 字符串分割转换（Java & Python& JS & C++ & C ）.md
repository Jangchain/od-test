## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

给定一个非空字符串S，其被N个‘-’分隔成N+1的子串，给定正整数K，要求除第一个子串外，其余的子串每K个字符组成新的子串，并用‘-’分隔。

对于新组成的每一个子串，如果它含有的小写字母比大写字母多，则将这个子串的所有大写字母转换为小写字母；

反之，如果它含有的大写字母比小写字母多，则将这个子串的所有小写字母转换为大写字母；大小写字母的数量相等时，不做转换。

## 输入描述

输入为两行，第一行为参数K，第二行为字符串S。

## 输出描述

输出转换后的字符串。

## 示例1

输入

    
    
    3
    12abc-abCABc-4aB@
    

输出

    
    
    12abc-abc-ABC-4aB-@
    

说明

> 子串为12abc、abCABc、4aB@，第一个子串保留，  
>  后面的子串每3个字符一组为abC、ABc、4aB、@，  
>  abC中小写字母较多，转换为abc，  
>  ABc中大写字母较多，转换为ABC，  
>  4aB中大小写字母都为1个，不做转换，  
>  @中没有字母，连起来即12abc-abc-ABC-4aB-@

## 示例2

输入

    
    
    12
    12abc-abCABc-4aB@
    

输出

    
    
    12abc-abCABc4aB@
    
    

说明

> 子串为12abc、abCABc、4aB@，第一个子串保留，  
>  后面的子串每12个字符一组为abCABc4aB@，  
>  这个子串中大小写字母都为4个，不做转换，  
>  连起来即12abc-abCABc4aB@

## 解题思路

这个题目的目标是对字符串进行重新分组和大小写转换。题目的关键点和步骤如下：

  1. **字符串分组** ：

     * 给定一个字符串 `S`，这个字符串用 `'-'` 分隔成了多个子串。假设有 `N` 个 `'-'`，那么 `S` 被分隔成 `N+1` 个子串。
     * 给定一个正整数 `K`，要求除第一个子串外，其余的子串按照每 `K` 个字符重新分组。
  2. **大小写转换** ：

     * 对于新分组后的每个子串，如果小写字母的数量比大写字母多，就将这个子串的所有大写字母转换为小写字母；
     * 如果大写字母的数量比小写字母多，就将这个子串的所有小写字母转换为大写字母；
     * 如果大小写字母数量相等，则保持不变。
  3. **输出要求** ：

     * 第一个子串保持不变。
     * 后面的子串根据重新分组和大小写转换后的结果，再次用 `'-'` 分隔，形成最终的输出字符串。

#### 示例1解析：

  * 输入：`K=3`，字符串为 `12abc-abCABc-4aB@`
  * 初始子串分割结果：`12abc`、`abCABc`、`4aB@`
  * 分组处理： 
    * 第一个子串 `12abc` 保持不变。
    * 第二个子串 `abCABc` 按照每 `3` 个字符重新分组：`abC`、`ABc`。分别统计大小写字母数量，`abC` 中小写字母较多，因此将 `abC` 转换为 `abc`；`ABc` 中大写字母较多，因此将 `ABc` 转换为 `ABC`。
    * 第三个子串 `4aB@` 按照每 `3` 个字符重新分组：`4aB`、`@`。`4aB` 中大小写字母数量相等，因此保持不变。
  * 最终输出：`12abc-abc-ABC-4aB-@`

#### 示例2解析：

  * 输入：`K=12`，字符串为 `12abc-abCABc-4aB@`
  * 初始子串分割结果：`12abc`、`abCABc`、`4aB@`
  * 分组处理： 
    * 第一个子串 `12abc` 保持不变。
    * 第二个子串 `abCABc` 和 `4aB@` 加起来不超过 `12` 个字符，所以它们合并为一个子串：`abCABc4aB@`，大小写字母数量相等，因此保持不变。
  * 最终输出：`12abc-abCABc4aB@`

## Java

    
    
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            int k = Integer.parseInt(scanner.nextLine()); // 输入正整数K
            String s = scanner.nextLine(); // 输入字符串S
            String[] sArr = s.split("-"); // 将S按照“-”分隔成N+1个子串
            String prefix = sArr[0]; // 第一个子串
            StringBuilder postfixSb = new StringBuilder(); // 除第一个子串外的所有子串
            for (int i = 1; i < sArr.length; i++) {
                postfixSb.append(sArr[i]);
            }
            char[] postfixChars = postfixSb.toString().toCharArray(); // 将除第一个子串外的所有子串拼接成字符数组
            StringBuilder newSb = new StringBuilder();
            for (int i = 0; i < postfixChars.length; i++) { // 将除第一个子串外的所有子串每K个字符组成新的子串，并用‘-’分隔
                if ((i + 1) % k == 0 && i + 1 != postfixChars.length) {
                    newSb.append(postfixChars[i]).append("-");
                } else {
                    newSb.append(postfixChars[i]);
                }
            }
            String[] newSArr = newSb.toString().split("-"); // 将新组成的每一个子串按照“-”分隔
            StringBuilder resultSb = new StringBuilder();
            for (String str : newSArr) { // 对于新组成的每一个子串，如果它含有的小写字母比大写字母多，则将这个子串的所有大写字母转换为小写字母；反之，如果它含有的大写字母比小写字母多，则将这个子串的所有小写字母转换为大写字母；大小写字母的数量相等时，不做转换
              
                long upperCase = str.chars().filter(Character::isUpperCase).count();
    
                long lowerCase = str.chars().filter(Character::isLowerCase).count();
                if (upperCase > lowerCase) {
                    resultSb.append(str.toUpperCase()).append("-");
                } else if (lowerCase > upperCase) {
                    resultSb.append(str.toLowerCase()).append("-");
                } else {
                    resultSb.append(str).append("-");
                }
            }
            String postfix = resultSb.toString().substring(0, resultSb.length() - 1); // 将处理后的新组成的每一个子串按照“-”拼接成字符串
            System.out.println(prefix + "-" + postfix); // 输出转换后的字符串
        }
    }
    
    

## Python

    
    
    k = int(input()) # 输入正整数K
    s = input() # 输入字符串S
    sArr = s.split("-") # 将S按照“-”分隔成N+1个子串
    prefix = sArr[0] # 第一个子串
    postfixSb = "" # 除第一个子串外的所有子串
    for i in range(1, len(sArr)):
        postfixSb += sArr[i]
    postfixChars = list(postfixSb) # 将除第一个子串外的所有子串拼接成字符数组
    newSb = ""
    for i in range(len(postfixChars)): # 将除第一个子串外的所有子串每K个字符组成新的子串，并用‘-’分隔
        if (i + 1) % k == 0 and i + 1 != len(postfixChars):
            newSb += postfixChars[i] + "-"
        else:
            newSb += postfixChars[i]
    newSArr = newSb.split("-") # 将新组成的每一个子串按照“-”分隔
    resultSb = ""
    for str in newSArr: # 对于新组成的每一个子串，如果它含有的小写字母比大写字母多，则将这个子串的所有大写字母转换为小写字母；反之，如果它含有的大写字母比小写字母多，则将这个子串的所有小写字母转换为大写字母；大小写字母的数量相等时，不做转换
        upperCase = sum(1 for c in str if c.isupper())
        lowerCase = sum(1 for c in str if c.islower())
        if upperCase > lowerCase:
            resultSb += str.upper() + "-"
        elif lowerCase > upperCase:
            resultSb += str.lower() + "-"
        else:
            resultSb += str + "-"
    postfix = resultSb[:-1] # 将处理后的新组成的每一个子串按照“-”拼接成字符串
    print(prefix + "-" + postfix) # 输出转换后的字符串
     
    
    
    

## JavaScript

    
    
    const readline = require("readline");
     
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
     
    const lines = [];
    rl.on("line", (line) => {
      lines.push(line);
     
      if (lines.length === 2) {
        const k = parseInt(lines[0]);
        const s = lines[1];
         const arr = s.split("-");
      const prefix = arr.shift();
      const postfix = arr
        .join("")
        .match(new RegExp(`.{1,${k}}`, "g"))
        .map((str) => {
          let upperCase = 0;
          let lowerCase = 0;
          [...str].forEach((char) => {
            if (/[a-z]/.test(char)) lowerCase++;
            if (/[A-Z]/.test(char)) upperCase++;
          });
          if (upperCase > lowerCase) {
            return str.toUpperCase();
          }
          if (lowerCase > upperCase) {
            return str.toLowerCase();
          }
          return str;
        })
        .join("-");
     
      
        console.log(prefix + "-" + postfix);
      }
    });
     
    
    
    

## C++

    
    
    #include <iostream>
    #include <sstream>
    #include <vector>
    #include <algorithm>
    
    using namespace std;
    
    int main() {
        int k; // 用于存储输入的正整数K
        string s; // 用于存储输入的字符串S
        getline(cin, s); // 读取第一行输入，即正整数K
        k = stoi(s); // 将字符串转换为整数K
        getline(cin, s); // 读取第二行输入，即字符串S
    
        vector<string> sArr; // 用于存储分割后的子串
        size_t pos = 0;
        while ((pos = s.find("-")) != string::npos) { // 将字符串S按照“-”分隔成多个子串
            string token = s.substr(0, pos); // 获取当前子串
            sArr.push_back(token); // 将子串添加到数组中
            s.erase(0, pos + 1); // 从原字符串中移除已处理的部分
        }
        sArr.push_back(s); // 添加最后一个子串（没有“-”的部分）
    
        string prefix = sArr[0]; // 第一个子串，按照题目要求保留
        string postfix; // 用于存储除第一个子串外的所有子串
    
        for (int i = 1; i < sArr.size(); i++) {
            postfix += sArr[i]; // 将所有其他子串拼接成一个字符串
        }
    
        vector<char> postfixChars(postfix.begin(), postfix.end()); // 将拼接后的字符串转换为字符数组
    
        string newS = ""; // 用于存储重新分组后的字符串
        for (int i = 0; i < postfixChars.size(); i++) {
            if ((i + 1) % k == 0 && i + 1 != postfixChars.size()) {
                newS += postfixChars[i]; // 添加当前字符
                newS += '-'; // 在每K个字符后添加一个“-”作为分隔符
            } else {
                newS += postfixChars[i]; // 否则只添加当前字符
            }
        }
    
        vector<string> newSArr; // 用于存储重新分组后的子串
        pos = 0;
        while ((pos = newS.find("-")) != string::npos) { // 将重新分组后的字符串按照“-”分隔
            string token = newS.substr(0, pos); // 获取每个新子串
            newSArr.push_back(token); // 将子串添加到数组中
            newS.erase(0, pos + 1); // 从原字符串中移除已处理的部分
        }
        newSArr.push_back(newS); // 添加最后一个子串
    
        string result = ""; // 用于存储最终的结果字符串
        for (string str : newSArr) {
            int upperCase = count_if(str.begin(), str.end(), [](char c) { return isupper(c); }); // 统计大写字母的数量
            int lowerCase = count_if(str.begin(), str.end(), [](char c) { return islower(c); }); // 统计小写字母的数量
    
            // 根据大写字母和小写字母的数量决定是否进行大小写转换
            if (upperCase > lowerCase) {
                transform(str.begin(), str.end(), str.begin(), ::toupper); // 大写字母多，全部转换为大写
                result += str; // 将转换后的子串添加到结果字符串中
                result += '-'; // 添加“-”作为分隔符
            } else if (lowerCase > upperCase) {
                transform(str.begin(), str.end(), str.begin(), ::tolower); // 小写字母多，全部转换为小写
                result += str; // 将转换后的子串添加到结果字符串中
                result += '-'; // 添加“-”作为分隔符
            } else {
                result += str; // 大小写字母数量相等，不做转换，直接添加子串
                result += '-'; // 添加“-”作为分隔符
            }
        }
    
        result = result.substr(0, result.length() - 1); // 移除最后一个多余的“-”
    
        cout << prefix << "-" << result << endl; // 输出最终的结果字符串
    
        return 0;
    }
    

## C语言

    
    
    #include <stdio.h>
    #include <string.h>
    #include <ctype.h>
    
    #define MAX_LEN 500001 // 假设字符串的最大长度不超过500000
    
    // 函数：将子串中的字母根据大小写字母数量转换为全大写或全小写
    void convert(char *str) {
        int upper = 0, lower = 0;
        for (int i = 0; str[i] != '\0'; i++) {
            if (isupper(str[i])) upper++;
            if (islower(str[i])) lower++;
        }
        for (int i = 0; str[i] != '\0'; i++) {
            if (upper > lower) str[i] = toupper(str[i]);
            if (lower > upper) str[i] = tolower(str[i]);
        }
    }
    
    int main() {
        int k; // 输入正整数K
        scanf("%d\n", &k);
        
        char s[MAX_LEN]; // 输入字符串S
        fgets(s, MAX_LEN, stdin);
        s[strcspn(s, "\n")] = 0; // 去除换行符
        
        char *token = strtok(s, "-"); // 第一个子串
        printf("%s", token); // 输出第一个子串
        
        char postfix[MAX_LEN] = ""; // 除第一个子串外的所有子串
        while ((token = strtok(NULL, "-")) != NULL) {
            strcat(postfix, token);
        }
        
        char newStr[MAX_LEN] = ""; // 新组成的字符串
        int len = strlen(postfix);
        for (int i = 0; i < len; i++) {
            strncat(newStr, &postfix[i], 1); // 逐个字符拼接到新字符串中
            if ((i + 1) % k == 0 && i + 1 != len) {
                strcat(newStr, "-"); // 每K个字符后添加分隔符
            }
        }
        
        char *newToken = strtok(newStr, "-"); // 按照“-”分隔新组成的字符串
        while (newToken != NULL) {
            convert(newToken); // 转换子串中的字母
            printf("-%s", newToken); // 输出转换后的子串
            newToken = strtok(NULL, "-"); // 继续获取下一个子串
        }
        
        return 0;
    }
    
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/a8293733ddcdfd1d6e116f576836db46.png)

## 完整用例

### 用例1

    
    
    3
    12abc-abCABc-4aB@
    

### 用例2

    
    
    2
    aBcDe-FgHiJ-KlMnO
    

### 用例3

    
    
    4
    aBcDe-FgHiJ-KlMnO
    

### 用例4

    
    
    5
    aBcDe-FgHiJ-KlMnO
    

### 用例5

    
    
    1
    aBcDe-FgHiJ-KlMnO
    

### 用例6

    
    
    6
    aBcDe-FgHiJ-KlMnO
    

### 用例7

    
    
    3
    aBcDe-FgHiJ-KlMnO
    

### 用例8

    
    
    2
    aBcDe-FgHiJ-KlMnO
    

### 用例9

    
    
    4
    aBcDe-FgHiJ-KlMnO
    

### 用例10

    
    
    5
    aBcDe-FgHiJ-KlMnO
    

