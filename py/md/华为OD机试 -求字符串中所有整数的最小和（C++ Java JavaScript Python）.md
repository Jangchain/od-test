## 题目描述

输入字符串s，输出s中包含所有整数的最小和。  
说明：  
字符串s，只包含 a-z A-Z ± ；  
合法的整数包括

  * 正整数 一个或者多个0-9组成，如 0 2 3 002 102
  * 负整数 负号（-） 开头，数字部分由一个或者多个0-9组成，如 -0 -012 -23 -00023

## 输入描述

包含数字的字符串

## 输出描述

所有整数的最小和

## 用例1

输入

    
    
    bb1234aa
    

输出

    
    
    10
    

## 用例2

输入

    
    
    bb12-34aa
    

输出

    
    
    -31
    

说明

> 1+2+（-34） = -31

## C++

    
    
    #include <iostream>
    #include <string>
    #include <regex>
    
    using namespace std;
    
    // 计算整数各个位数之和
    int getNumSum(string num) {
        int sum = 0;
        for (char c : num) {
            sum += c - '0';
        }
        return sum;
    }
    
    int main() {
        string line;
       getline(cin, line);
            // 用正则表达式分割出所有整数
            regex reg("[^\\d-]+");
            sregex_token_iterator it(line.begin(), line.end(), reg, -1);
            sregex_token_iterator end;
            int res = 0;
            for (; it != end; ++it) {
                string num = *it;
                if (!num.empty()) {
                    if (num.find("-") == string::npos) {
                        // 处理正整数
                        res += getNumSum(num);
                    } else {
                        // 处理负整数
                        bool isNeg = num[0] == '-';
                        regex subReg("-");
                        sregex_token_iterator subIt(num.begin(), num.end(), subReg, -1);
                        int i = 0;
                        for (; subIt != end; ++subIt) {
                            string subNum = *subIt;
                            if (!subNum.empty()) {
                                int ele = stoi(subNum);
                                if (i == 0) {
                                    res += isNeg ? 0 - ele : getNumSum(subNum);
                                } else {
                                    res -= ele;
                                }
                                ++i;
                            }
                        }
                    }
                }
            }
            cout << res << endl;
        
        return 0;
    }
    

## java

    
    
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
                String line = scanner.nextLine();
                // 用正则表达式分割出所有整数
                String[] numArr = line.split("[^\\d-]+");
                int res = 0;
                for (String num : numArr) {
                    if (!num.isEmpty()) {
                        if (num.indexOf("-") == -1) {
                            // 处理正整数
                            res += getNumSum(num);
                        } else {
                            // 处理负整数
                            boolean isNeg = num.startsWith("-");
                            String[] subNumArr = num.split("-");
                            for (int i = 0; i < subNumArr.length; i++) {
                                if (!subNumArr[i].isEmpty()) {
                                    int ele = Integer.parseInt(subNumArr[i]);
                                    if (i == 0) {
                                        res += isNeg ? 0 - ele : getNumSum(subNumArr[i]);
                                    } else {
                                        res -= ele;
                                    }
                                }
                            }
                        }
                    }
                }
                System.out.println(res);
            
        }
    
        // 计算整数各个位数之和
        private static int getNumSum(String num) {
            int sum = 0;
            for (char c : num.toCharArray()) {
                sum += Character.getNumericValue(c);
            }
            return sum;
        }
    }
    

## javaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.on('line', (line) => {
      const numArr = line.split(/[^\d-]+/);
      let res = 0;
      for (const num of numArr) {
        if (num) {
          if (num.indexOf('-') === -1) {
            res += getNumSum(num);
          } else {
            const isNeg = num.startsWith('-');
            const subNumArr = num.split('-');
            for (let i = 0; i < subNumArr.length; i++) {
              if (subNumArr[i]) {
                const ele = parseInt(subNumArr[i]);
                if (i === 0) {
                  res += isNeg ? 0 - ele : getNumSum(subNumArr[i]);
                } else {
                  res -= ele;
                }
              }
            }
          }
        }
      }
      console.log(res);
    });
    
    function getNumSum(num) {
      let sum = 0;
      for (const c of num) {
        sum += parseInt(c);
      }
      return sum;
    }
    

## python

    
    
    import re
    
    def getNumSum(num):
        sum = 0
        for c in num:
            sum += int(c)
        return sum
    
    
    line = input()
    numArr = re.findall(r'-?\d+', line)
    res = 0
    for num in numArr:
        if num:
            if '-' not in num:
                res += getNumSum(num)
            else:
                isNeg = num.startswith('-')
                subNumArr = num.split('-')
                for i in range(len(subNumArr)):
                    if subNumArr[i]:
                        ele = int(subNumArr[i])
                        if i == 0:
                            res += -ele if isNeg else getNumSum(subNumArr[i])
                        else:
                            res -= ele
    print(res)
    

## C语言

    
    
    
    #include <stdio.h>
    #include <stdlib.h>
    #include <ctype.h> // 用于isdigit函数
    
    int main() {
        char s[10001]; // 假定输入字符串不超过10000个字符
        scanf("%s", s); // 读取字符串
        long long res = 0;
        for (int i = 0; s[i]; i++) {
            if (!isdigit(s[i]) && s[i] != '-') continue; // 是其他字母，直接跳过
            if (s[i] == '-') {
                int j = i + 1;
                long long num = 0;
                while (isdigit(s[j])) {
                    num = num * 10 + s[j] - '0';
                    j++;
                }
                res -= num;
                i = j - 1;
            } else {
                res += s[i] - '0';
            }
        }
        printf("%lld\n", res);
        return 0;
    }
    

## 完整用例

### 用例1

bb1234aa

### 用例2

bb12-34aa

### 用例3

a1b2c3d4

### 用例4

abc-12-34def

### 用例5

a0b0c0d0

### 用例6

a1b2c3d4e5f6g7h8i9j10k11

### 用例7

a-1b-2c-3d-4e-5f-6g-7h-8i-9j-10k-11

### 用例8

aaa123aaa456aaa789

### 用例9

a1b2c3-4d5e6f7-8g9h10i11

### 用例10

a-1b-2c-3d-4e-5f-6g-7h-8i-9j-10k11  

#### 文章目录

  * 题目描述
  * 输入描述
  * 输出描述
  * 用例1
  * 用例2
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

