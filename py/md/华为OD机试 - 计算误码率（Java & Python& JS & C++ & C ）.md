## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

误码率是最常用的数据通信传输质量指标。它可以理解为“在多少位数据中出现一位差错”。

移动通信网络中的误码率主要是指比特误码率，其计算公式如下: 比特误码率=错误比特数/传输总比特数，

为了简单，我们使用字符串来标识通信的信息，一个字符错误了，就认为出现了一个误码

输入一个标准的字符串，和一个传输后的字符串，计算误码率

字符串会被压缩，  
例:“2A3B4D5X1Z”表示"AABBBDDDDXXXXXZ"  
用例会保证两个输入字符串解压后长度一致，解压前的长度不一定一致

每个生成后的字符串长度<100000000。

## 备注

注意：展开后的字符串不含数字

## 输入描述

两行，分别为两种字符串的压缩形式。

每行字符串 (压缩后的) 长度<100000

## 输出描述

一行，错误的字等数量/展开后的总长度

## 示例1

输入

    
    
    3A3B
    2A4B
    

输出

    
    
    1/6
    

## 示例2

输入

    
    
    5Y5Z
    5Y5Z
    

输出

    
    
    0/10
    

## 示例3

输入

    
    
    4Y5Z
    9Y
    

输出

    
    
    5/9
    

## 解题思路

  1. **误码率定义** ：误码率指的是在解压后相同位置上的字符不同的数量（即错误的字符数），与解压后的总字符数的比值，用“错误字符数/总字符数”的形式表示。

  2. **输入字符串的压缩格式** ：输入的字符串是压缩形式，例如 `"2A3B"` 表示 `"AABB"`，其中数字表示字符的重复次数。

  3. **解压缩字符串** ：每个压缩字符串需要解压得到完整的字符序列。例如：

     * 输入 `"3A3B"` 代表的解压字符串为 `"AAABBB"`。
     * 输入 `"2A4B"` 代表的解压字符串为 `"AABBBB"`。
  4. **误码率计算** ：

     * 解压后，对比两个字符串在相同位置的字符是否一致。
     * 统计解压后两个字符串中不同字符的数量（误码数）。
     * 输出误码数与解压后的总字符数的比值。
  5. **注意事项** ：

     * 输入保证解压后两个字符串的长度相等。
     * 解压后的字符串不含数字，且每个生成后的字符串长度小于 100,000,000。

#### 示例说明

**示例 1**

  * 输入：
    
        3A3B
    2A4B
    

  * 解压： 
    * 第一个字符串解压为 `"AAABBB"`
    * 第二个字符串解压为 `"AABBBB"`
  * 比较得到 1 处字符不同（位置 2），总长度为 6。
  * 输出为：`1/6`

**示例 2**

  * 输入：
    
        5Y5Z
    5Y5Z
    

  * 解压： 
    * 两个字符串均解压为 `"YYYYYZZZZZ"`
  * 比较得到 0 处字符不同，误码数为 0，字符串总长度为 10。
  * 输出为：`0/10`

**示例 3**

  * 输入：
    
        4Y5Z
    9Y
    

  * 解压： 
    * 第一个字符串解压为 `"YYYYZZZZZ"`
    * 第二个字符串解压为 `"YYYYYYYYY"`
  * 比较得到 5 处字符不同（位置 4-8），总长度为 9。
  * 输出为：`5/9`

## Java

    
    
    import java.util.ArrayList;
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            Scanner sc = new Scanner(System.in);
    
            // 读取两个压缩字符串
            String s1 = sc.nextLine();
            String s2 = sc.nextLine();
    
            // 创建两个列表，用于存储解压后的字符和对应的数量
            ArrayList<Long> cnt1 = new ArrayList<>();
            ArrayList<Character> ch1 = new ArrayList<>();
            ArrayList<Long> cnt2 = new ArrayList<>();
            ArrayList<Character> ch2 = new ArrayList<>();
    
            // 解析压缩字符串
            parseZipStr(s1, cnt1, ch1);
            parseZipStr(s2, cnt2, ch2);
    
            // 初始化差异和相同的数量
            long diff = 0;
            long same = 0;
            int index1 = 0, index2 = 0;
    
            // 当两个列表中还有未比较的字符时继续
            while (index1 < cnt1.size() && index2 < cnt2.size()) {
                long n1 = cnt1.get(index1);
                char c1 = ch1.get(index1);
                long n2 = cnt2.get(index2);
                char c2 = ch2.get(index2);
    
                // 计算当前需要比较的字符数
                long cmpCnt = Math.min(n1, n2);
    
                // 根据字符是否相同更新差异和相同数量
                if (c1 != c2) {
                    diff += cmpCnt;
                } else {
                    same += cmpCnt;
                }
    
                // 更新数量，减少当前已经比较过的字符数
                if (n1 > cmpCnt) {
                    cnt1.set(index1, n1 - cmpCnt);
                } else {
                    index1++;
                }
    
                if (n2 > cmpCnt) {
                    cnt2.set(index2, n2 - cmpCnt);
                } else {
                    index2++;
                }
            }
    
            // 输出差异数量和总数量
            System.out.println(diff + "/" + (diff + same));
        }
    
        // 解析压缩字符串的函数
        public static void parseZipStr(String s, ArrayList<Long> cnt, ArrayList<Character> ch) {
            // 使用StringBuilder来存储数字部分
            StringBuilder num = new StringBuilder();
    
            // 遍历压缩字符串的每个字符
            for (int i = 0; i < s.length(); i++) {
                char c = s.charAt(i);
    
                // 如果字符是数字，添加到StringBuilder中
                if (Character.isDigit(c)) {
                    num.append(c);
                } else {
                    // 如果字符不是数字，将StringBuilder转换为数字并添加到数量列表
                    cnt.add(Long.parseLong(num.toString()));
                    ch.add(c);  // 添加字符到字符列表
                    num.setLength(0); // 清空StringBuilder以处理下一个数字
                }
            }
        }
    }
    
    

## Python

    
    
    def parse_zip_str(s, cnt, ch):
        # 初始化一个空字符串用于存储数字
        num = ""
        # 遍历压缩字符串的每个字符
        for c in s:
            if c.isdigit():  # 如果字符是数字
                num += c     # 累加数字字符
            else:
                # 将数字转换为整数并加入数量列表
                cnt.append(int(num))
                ch.append(c)  # 将字符加入字符列表
                num = ""      # 重置数字字符串
    
    def main():
        # 读取两个压缩字符串
        s1 = input()
        s2 = input()
    
        # 用于存储解压后的字符和数量的列表
        cnt1, ch1 = [], []
        cnt2, ch2 = [], []
    
        # 解析压缩字符串
        parse_zip_str(s1, cnt1, ch1)
        parse_zip_str(s2, cnt2, ch2)
    
        # 初始化差异和相同的数量
        diff = same = 0
        index1 = index2 = 0
    
        # 当两个列表中还有未比较的字符时继续
        while index1 < len(cnt1) and index2 < len(cnt2):
            n1 = cnt1[index1]
            c1 = ch1[index1]
            n2 = cnt2[index2]
            c2 = ch2[index2]
    
            # 计算当前要比较的字符数
            cmp_cnt = min(n1, n2)
    
            # 更新差异和相同数量
            if c1 != c2:
                diff += cmp_cnt
            else:
                same += cmp_cnt
    
            # 更新计数列表
            if n1 > cmp_cnt:
                cnt1[index1] -= cmp_cnt
            else:
                index1 += 1
            if n2 > cmp_cnt:
                cnt2[index2] -= cmp_cnt
            else:
                index2 += 1
    
        # 输出差异数量和总数量
        print(f"{diff}/{diff + same}")
    
    if __name__ == "__main__":
        main()
    
    

## JavaScript

    
    
    function parseZipStr(s, cnt, ch) {
        // 用于存储数字的临时字符串
        let num = '';
        for (let i = 0; i < s.length; i++) {
            let c = s[i];
            if (/\d/.test(c)) {  // 判断字符是否是数字
                num += c;        // 累加数字字符
            } else {
                cnt.push(parseInt(num));  // 将数字加入数量列表
                ch.push(c);               // 加入字符列表
                num = '';                 // 清空数字字符串
            }
        }
    }
    
    
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    let lines = [];
    rl.on('line', (line) => {
        lines.push(line);
        if (lines.length === 2) {
            let s1 = lines[0];
            let s2 = lines[1];
    
            // 用于存储字符数量和字符的列表
            let cnt1 = [], ch1 = [], cnt2 = [], ch2 = [];
            parseZipStr(s1, cnt1, ch1);
            parseZipStr(s2, cnt2, ch2);
    
            let diff = 0, same = 0;
            let index1 = 0, index2 = 0;
    
            while (index1 < cnt1.length && index2 < cnt2.length) {
                let n1 = cnt1[index1];
                let c1 = ch1[index1];
                let n2 = cnt2[index2];
                let c2 = ch2[index2];
    
                let cmpCnt = Math.min(n1, n2);
    
                if (c1 !== c2) {
                    diff += cmpCnt;
                } else {
                    same += cmpCnt;
                }
    
                if (n1 > cmpCnt) {
                    cnt1[index1] -= cmpCnt;
                } else {
                    index1++;
                }
                if (n2 > cmpCnt) {
                    cnt2[index2] -= cmpCnt;
                } else {
                    index2++;
                }
            }
    
            console.log(`${diff}/${diff + same}`);
            rl.close();
        }
    });
    
    
    

## C++

    
    
    #include <iostream>
    #include <vector>
    #include <string>
    using namespace std;
    
    // 解析压缩字符串
    void parseZipStr(const string &s, vector<long> &cnt, vector<char> &ch) {
        string num; // 用于存储数字
        for (char c : s) {
            if (isdigit(c)) {
                num += c;  // 如果是数字，累加
            } else {
                cnt.push_back(stol(num));  // 数字加入数量列表
                ch.push_back(c);           // 字符加入字符列表
                num.clear();               // 清空数字字符串
            }
        }
    }
    
    int main() {
        // 读取两个压缩字符串
        string s1, s2;
        getline(cin, s1);
        getline(cin, s2);
    
        // 创建列表存储解压后的字符和数量
        vector<long> cnt1, cnt2;
        vector<char> ch1, ch2;
    
        // 解析压缩字符串
        parseZipStr(s1, cnt1, ch1);
        parseZipStr(s2, cnt2, ch2);
    
        long diff = 0, same = 0;
        size_t index1 = 0, index2 = 0;
    
        // 比较两个列表
        while (index1 < cnt1.size() && index2 < cnt2.size()) {
            long n1 = cnt1[index1];
            char c1 = ch1[index1];
            long n2 = cnt2[index2];
            char c2 = ch2[index2];
    
            long cmpCnt = min(n1, n2);
    
            if (c1 != c2) {
                diff += cmpCnt;
            } else {
                same += cmpCnt;
            }
    
            if (n1 > cmpCnt) {
                cnt1[index1] -= cmpCnt;
            } else {
                index1++;
            }
            if (n2 > cmpCnt) {
                cnt2[index2] -= cmpCnt;
            } else {
                index2++;
            }
        }
    
        // 输出结果
        cout << diff << "/" << (diff + same) << endl;
        return 0;
    }
    
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    #include <ctype.h>
    #include <string.h>
    
    #define MAX_SIZE 100000
    
    // 解析压缩字符串
    void parseZipStr(const char *s, long *cnt, char *ch, int *size) {
        char num[20];
        int numIndex = 0;
        int count = 0;
        for (int i = 0; s[i] != '\0'; i++) {
            if (isdigit(s[i])) {
                num[numIndex++] = s[i]; // 如果是数字，累加
            } else {
                num[numIndex] = '\0';   // 结束数字字符串
                cnt[count] = atol(num); // 数字加入数量数组
                ch[count++] = s[i];     // 字符加入字符数组
                numIndex = 0;           // 清空数字缓存
            }
        }
        *size = count; // 设置数组大小
    }
    
    int main() {
        char s1[MAX_SIZE], s2[MAX_SIZE];
        long cnt1[MAX_SIZE], cnt2[MAX_SIZE];
        char ch1[MAX_SIZE], ch2[MAX_SIZE];
        int size1, size2;
    
        // 读取两个压缩字符串
        fgets(s1, MAX_SIZE, stdin);
        fgets(s2, MAX_SIZE, stdin);
    
        parseZipStr(s1, cnt1, ch1, &size1);
        parseZipStr(s2, cnt2, ch2, &size2);
    
        long diff = 0, same = 0;
        int index1 = 0, index2 = 0;
    
        // 比较两个数组
        while (index1 < size1 && index2 < size2) {
            long n1 = cnt1[index1];
            char c1 = ch1[index1];
            long n2 = cnt2[index2];
            char c2 = ch2[index2];
    
            long cmpCnt = (n1 < n2) ? n1 : n2;
    
            if (c1 != c2) {
                diff += cmpCnt;
            } else {
                same += cmpCnt;
            }
    
            if (n1 > cmpCnt) {
                cnt1[index1] -= cmpCnt;
            } else {
                index1++;
            }
            if (n2 > cmpCnt) {
                cnt2[index2] -= cmpCnt;
            } else {
                index2++;
            }
        }
    
        printf("%ld/%ld\n", diff, diff + same);
        return 0;
    }
    
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

