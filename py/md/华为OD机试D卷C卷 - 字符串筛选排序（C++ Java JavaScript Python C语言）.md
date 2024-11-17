## 题目描述

输入一个由N个大小写字母组成的字符串  
按照ASCII码值从小到大进行排序  
查找字符串中第K个最小ASCII码值的字母(k>=1)  
输出该字母所在字符串中的位置索引(字符串的第一个位置索引为0)  
k如果大于字符串长度则输出最大ASCII码值的字母所在字符串的位置索引  
如果有重复字母则输出字母的最小位置索引

## 输入描述

第一行输入一个由大小写字母组成的字符串  
第二行输入k ，k必须大于0 ，k可以大于输入字符串的长度

## 输出描述

输出字符串中第k个最小ASCII码值的字母所在字符串的位置索引  
k如果大于字符串长度则输出最大ASCII码值的字母所在字符串的位置索引  
如果第k个最小ASCII码值的字母存在重复 则输出该字母的最小位置索引

## 用例

输入| AbCdeFG  
3  
---|---  
输出| 5  
说明|

  * 根据ASCII码值排序，第三个ASCII码值的字母为FF在字符串中位置索引为5(0为字符串的第一个字母位置索引) 

  
  
## C++

    
    
    #include <iostream>
    #include <algorithm>
    #include <cstring>
    
    using namespace std;
    
    int main() {
        string str;
        cin >> str;
        int k;
        cin >> k;
        char chars[str.length()];
        strcpy(chars, str.c_str());
        sort(chars, chars+str.length());
    
        if (k > str.length()) {
            k = str.length();
        }
    
        char tar = chars[k - 1];
    
        cout << str.find(tar) << endl;
        return 0;
    }
    

## java

    
    
    import java.util.Arrays;
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            String str = scanner.nextLine();
            int k = scanner.nextInt();
            char[] chars = str.toCharArray();
            Arrays.sort(chars);
    
            if (k > chars.length) {
                k = chars.length;
            }
    
            char tar = chars[k - 1];
    
            System.out.println(str.indexOf(tar));
        }
    }
    

## javaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.on('line', (str) => {
      rl.on('line', (k) => {
        k = parseInt(k);
        let chars = str.split('').sort();
        if (k > str.length) {
          k = str.length;
        }
        let tar = chars[k - 1];
        console.log(str.indexOf(tar));
        rl.close();
      });
    });
    

## python

    
    
    # 导入Python的内置模块
    import sys
    
    def main():
        # 读取一行输入并去除两端的空白字符（例如换行符）
        str = input().strip()
        # 读取下一行输入，转换为整数
        k = int(input().strip())
        # 将字符串转换为字符列表
        chars = list(str)
        # 对字符列表进行排序
        chars.sort()
    
        # 如果k大于字符列表的长度，则将k设置为字符列表的长度
        if k > len(chars):
            k = len(chars)
    
        # 获取排序后的第k个字符（由于索引从0开始，所以是第k-1个位置的字符）
        tar = chars[k - 1]
    
        # 输出目标字符在原始字符串中的索引位置
        # 注意：index方法返回的是第一个找到的索引位置
        print(str.index(tar))
    
    # 调用main函数
    if __name__ == "__main__":
        main()
    

## C语言

    
    
    #include <stdio.h>
    #include <string.h>
    #include <stdlib.h>
    
    #define MAX_STR_LEN 1001
    
    int compare(const void *a, const void *b) {
        return (*(const char *)a - *(const char *)b);
    }
    
    int findFirstOccurrence(const char *str, char ch) {
        // 查找字符ch在字符串str中的第一个出现位置
        for (int i = 0; str[i] != '\0'; i++) {
            if (str[i] == ch) {
                return i; // 返回找到的位置索引
            }
        }
        return -1; // 如果字符不在字符串中，返回-1
    }
    
    int main() {
        char str[MAX_STR_LEN];
        int k;
        scanf("%s", str); // 输入一个由大小写字母组成的字符串
        scanf("%d", &k);  // 输入k
    
        int len = strlen(str);
        char sorted_str[MAX_STR_LEN];
        strcpy(sorted_str, str);
        qsort(sorted_str, len, sizeof(char), compare); // 根据ASCII码值排序
    
        if (k > len) {
            k = len;
        }
    
        char target = sorted_str[k - 1];
        int index = findFirstOccurrence(str, target);
    
        printf("%d\n", index); // 输出所求字符的位置索引
        return 0;
    }
    

## 完整用例

### 用例1

AbCdeFG  
3

### 用例2

zZyYxX  
6

### 用例3

HelloWorld  
10

### 用例4

HelloWorld  
15

### 用例5

aBcDeFgHiJkLmNoPqRsTuVwXyZ  
5

### 用例6

fAdDAkBbBq  
1

### 用例7

PythonIsFun  
4

### 用例8

QuickBrownFox  
8

### 用例9

LazyDog  
5

### 用例10

aBcDeFgHiJkLmNoPqRsTuVwXyZ  
12

#### 文章目录

  * 题目描述
  * 输入描述
  * 输出描述
  * 用例
  * C++
  * java
  * javaScript
  * python
  * C语言
  * 完整用例
  *     * 用例1
    * 用例2
    * 用例3
    * 用例4
    * 用例5
    * 用例6
    * 用例7
    * 用例8
    * 用例9
    * 用例10

![fengmian](https://i-blog.csdnimg.cn/blog_migrate/169f277a87c29b8ff13d65ef9e7eeec7.png)

