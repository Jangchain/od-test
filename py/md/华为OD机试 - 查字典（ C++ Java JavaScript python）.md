## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

输入一个单词前缀和一个字典，输出包含该前缀的单词

## 输入描述

单词前缀+字典长度+字典  
字典是一个有序单词数组  
输入输出都是小写

## 输出描述

所有包含该前缀的单词，多个[单词换行](https://so.csdn.net/so/search?q=%E5%8D%95%E8%AF%8D%E6%8D%A2%E8%A1%8C&spm=1001.2101.3001.7020)输出

若没有则返回-1

## 示例1

输入

    
    
    b 3 a b c
    

输出

    
    
    b
    

说明

## 示例2

输入

    
    
    abc 4 a ab abc abcd
    

输出

    
    
    abc
    abcd
    

说明

## 示例3

输入

    
    
    a 3 b c d
    

输出

    
    
    -1
    

说明

> ## 解题思路

####

该题要求根据给定的单词前缀，在一个有序的字典数组中找到所有包含该前缀的单词，并将其输出。

#### 输入描述

  * **输入包括三个部分** ： 
    1. **单词前缀** ：一个字符串，表示需要匹配的前缀。
    2. **字典长度** ：一个整数，表示字典中单词的数量。
    3. **字典** ：一个按照字典序排序的单词数组。
  * **输入数据格式** ： 
    * `单词前缀 字典长度 字典`

#### 示例

##### 示例1

  * 输入：
    
        b 3 a b c
    

  * 输出：
    
        b
    

  * **解释** ：字典中单词 `b` 包含前缀 `b`，所以输出 `b`。

##### 示例2

  * 输入：
    
        abc 4 a ab abc abcd
    

  * 输出：
    
        abc
    abcd
    

  * **解释** ：字典中 `abc` 和 `abcd` 均包含前缀 `abc`，按顺序输出。

##### 示例3

  * 输入：
    
        a 3 b c d
    

  * 输出：
    
        -1
    

  * **解释** ：字典中没有单词包含前缀 `a`，所以输出 `-1`。

#### 总结

  * **目的** ：在字典中找到所有包含指定前缀的单词。
  * **要求** ：按字典中的顺序输出匹配的单词，如果没有匹配项则输出 `-1`。

## Java

    
    
    import java.util.ArrayList;
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            // 创建一个 Scanner 对象用于读取输入
            Scanner sc = new Scanner(System.in);
    
            // 读取单词前缀
            String prefix = sc.next();
            // 读取字典长度
            int n = sc.nextInt();
    
            // 创建一个 ArrayList 用于存储包含前缀的单词
            ArrayList<String> wordsWithPrefix = new ArrayList<>();
    
            // 遍历字典中的单词
            for (int i = 0; i < n; i++) {
                // 读取一个单词
                String word = sc.next();
    
                // 判断单词是否以前缀开头，如果是，则将其添加到 wordsWithPrefix 列表中
                if (word.startsWith(prefix)) {
                    wordsWithPrefix.add(word);
                }
            }
    
            // 如果 wordsWithPrefix 列表为空，说明没有找到包含前缀的单词，输出 -1
            if (wordsWithPrefix.isEmpty()) {
                System.out.println(-1);
            } else {
                // 否则，遍历 wordsWithPrefix 列表，输出包含前缀的单词
                for (String word : wordsWithPrefix) {
                    System.out.println(word);
                }
            }
        }
    }
    
    

## Python

    
    
    def main():
        # 读取输入
        input_data = input().split()
        
        # 读取单词前缀
        prefix = input_data[0]
        # 读取字典长度
        n = int(input_data[1])
    
        # 创建一个列表用于存储包含前缀的单词
        words_with_prefix = []
    
        # 遍历字典中的单词
        for i in range(2, 2 + n):
            # 读取一个单词
            word = input_data[i]
    
            # 判断单词是否以前缀开头，如果是，则将其添加到 words_with_prefix 列表中
            if word.startswith(prefix):
                words_with_prefix.append(word)
    
        # 如果 words_with_prefix 列表为空，说明没有找到包含前缀的单词，输出 -1
        if not words_with_prefix:
            print(-1)
        else:
            # 否则，遍历 words_with_prefix 列表，输出包含前缀的单词
            for word in words_with_prefix:
                print(word)
    
    if __name__ == "__main__":
        main()
    
    

## JavaScript

    
    
    // 导入 readline 模块用于读取用户输入
    const readline = require('readline');
    
    // 创建一个 readline.Interface 实例
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    // 读取用户输入
    rl.on('line', (line) => {
      const input_data = line.split(' ');
    
      // 读取单词前缀
      const prefix = input_data[0];
      // 读取字典长度
      const n = parseInt(input_data[1]);
    
      // 创建一个数组用于存储包含前缀的单词
      const words_with_prefix = [];
     
      // 遍历字典中的单词
      for (let i = 2; i < 2 + n; i++) {
        // 读取一个单词
        const word = input_data[i];
         // 判断单词是否以前缀开头，如果是，则将其添加到 words_with_prefix 数组中
        if (word.startsWith(prefix)) {
          words_with_prefix.push(word);
        }
      }
    
      // 如果 words_with_prefix 数组为空，说明没有找到包含前缀的单词，输出 -1
      if (words_with_prefix.length === 0) {
        console.log(-1);
      } else {
        // 否则，遍历 words_with_prefix 数组，输出包含前缀的单词
        words_with_prefix.forEach((word) => {
          console.log(word);
        });
      }
    
      // 关闭 readline.Interface 实例
      rl.close();
    });
    
    

## C++

    
    
    #include <iostream>
    #include <string>
    #include <vector>
    using namespace std;
    int main() {
        // 读取单词前缀
        string prefix;
        cin >> prefix;
    
        // 读取字典长度
        int n;
        cin >> n;
    
        // 创建一个 vector 用于存储包含前缀的单词
        vector<string> wordsWithPrefix;
    
        // 遍历字典中的单词
        for (int i = 0; i < n; i++) {
            // 读取一个单词
            string word;
            cin >> word;
    
            // 判断单词是否以前缀开头，如果是，则将其添加到 wordsWithPrefix 列表中
            if (word.substr(0, prefix.size()) == prefix) {
                wordsWithPrefix.push_back(word);
            }
        }
    
        // 如果 wordsWithPrefix 列表为空，说明没有找到包含前缀的单词，输出 -1
        if (wordsWithPrefix.empty()) {
            cout << -1 << endl;
        } else {
            // 否则，遍历 wordsWithPrefix 列表，输出包含前缀的单词
            for (const string &word : wordsWithPrefix) {
                cout << word << endl;
            }
        }
    
        return 0;
    }
    
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    
    typedef struct {
        int id;
        int totalTime;
        int money;
    } Result;
    
    int getIntersection(int start1, int end1, int start2, int end2) {
        if (start1 < start2) {
            if (start2 >= end1) return -1;
            return (end1 < end2 ? end1 : end2) - start2;
        } else if (start1 > start2) {
            if (start1 >= end2) return -1;
            return (end1 < end2 ? end1 : end2) - start1;
        } else {
            return (end1 < end2 ? end1 : end2) - start1;
        }
    }
    
    int cmp(const void *a, const void *b) {
        Result *r1 = (Result *)a;
        Result *r2 = (Result *)b;
        if (r1->totalTime != r2->totalTime) return r1->totalTime - r2->totalTime;
        if (r1->money != r2->money) return r1->money - r2->money;
        return r1->id - r2->id;
    }
    
    int main() {
        int currentHour, currentMinute, targetHour, targetMinute;
        scanf("%d %d %d %d", &currentHour, &currentMinute, &targetHour, &targetMinute);
    
        int start = currentHour * 60 + currentMinute;
        int end = targetHour * 60 + targetMinute;
    
        int n;
        scanf("%d", &n);
        int nucleicAcidPoints[n][3];
        for (int i = 0; i < n; i++) {
            scanf("%d %d %d", &nucleicAcidPoints[i][0], &nucleicAcidPoints[i][1], &nucleicAcidPoints[i][2]);
        }
    
        Result result[n];
        int count = 0;
    
        for (int i = 0; i < n; i++) {
            int id = nucleicAcidPoints[i][0];
            int distance = nucleicAcidPoints[i][1];
            int peopleCount = nucleicAcidPoints[i][2];
    
            int money = distance * 10;
            int road = distance * 10;
            int arrived = start + road;
    
            if (arrived < 8 * 60) {
                arrived = 8 * 60;
                road = arrived - start;
            }
    
            int add1 = getIntersection(start, arrived, 8 * 60, 10 * 60);
            if (add1 != -1) peopleCount += 2 * add1;
    
            int min1 = getIntersection(start, arrived, 10 * 60, 12 * 60);
            if (min1 != -1) peopleCount = peopleCount > min1 ? peopleCount - min1 : 0;
    
            int add2 = getIntersection(start, arrived, 12 * 60, 14 * 60);
            if (add2 != -1) peopleCount += 9 * add2;
    
            int min2 = getIntersection(start, arrived, 14 * 60, 20 * 60);
            if (min2 != -1) peopleCount = peopleCount > min2 ? peopleCount - min2 : 0;
    
            int totalTime = peopleCount + road;
            if (start + totalTime <= end) {
                result[count++] = (Result){id, totalTime, money};
            }
        }
    
        qsort(result, count, sizeof(Result), cmp);
    
        printf("%d\n", count);
        for (int i = 0; i < count; i++) {
            printf("%d %d %d\n", result[i].id, result[i].totalTime, result[i].money);
        }
    
        return 0;
    }
    
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

