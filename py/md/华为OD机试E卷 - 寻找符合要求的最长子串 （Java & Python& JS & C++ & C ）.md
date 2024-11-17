## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

给定一个字符串s，找出这样一个子串：

  1. 该子串中任意一个字符最多出现2次
  2. 该子串不包含指定某个字符

请你找出满足该条件的最长子串的长度

## 输入描述

第一行为：要求不包含的指定字符，为单个字符，取值范围[0-9a-zA-Z]

第二行为：字符串s，每个字符范围[0-9a-zA-Z]，长度范围[1, 10000]

## 输出描述

第一行为：要求不包含的指定字符，为单个字符，取值范围[0-9a-zA-Z]

第二行为：字符串s，每个字符范围[0-9a-zA-Z]，长度范围[1, 10000]

## 示例1

输入

    
    
    D
    ABC123
    

输出

    
    
    6
    

说明

> 无

## 示例2

输入

    
    
    D
    ABACA123D
    

输出

    
    
    7
    

说明

> 无

## 解题思路

题目要求我们从给定的字符串 `s` 中找出一个满足以下两个条件的最长子串：

  1. **任意一个字符最多出现2次：** 子串中的每个字符在子串中出现的次数不能超过2次。
  2. **子串不包含指定字符：** 子串不能包含输入的指定字符。

输出的是满足以上条件的最长子串的长度。如果没有符合条件的子串，则返回0。

#### 示例分析

##### 示例 1

**输入：**

    
    
    D
    ABC123
    

**输出：**

    
    
    6
    

**分析：**

  * 排除字符为 `D`。
  * 字符串 `s` 为 `ABC123`。
  * 整个字符串 `ABC123` 不包含字符 `D`，并且每个字符都没有超过2次，因此整个字符串符合条件。
  * 满足条件的最长子串为 `ABC123`，长度为 `6`。

##### 示例 2

**输入：**

    
    
    D
    ABACA123D
    

**输出：**

    
    
    7
    

**分析：**

  * 排除字符为 `D`。

  * 字符串 `s` 为 `ABACA123D`。

  * 从 `s` 中找一个最长的子串，该子串：

    1. 不包含字符 `D`。
    2. 任意一个字符出现次数不超过2次。
  * 在字符串 `ABACA123D` 中，有多个子串不包含 `D`，但需要满足字符出现次数不超过2次的条件：

    * `BACA123` 是一个符合条件的子串，每个字符最多出现2次，并且长度为 `7`。
  * 因此，满足条件的最长子串为 `BACA123`，长度为 `7`。

## Java

    
    
    import java.util.*;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
    
            // 输入exclude和s
            String exclude = scanner.next();
            String s = scanner.next();
    
            // 获取要排除的字符
            char excludeChar = exclude.charAt(0);
    
            // 存储每个字符出现的下标
            Map<Character, List<Integer>> charIndexMap = new HashMap<>();
    
            // 定义左右指针
            int left = 0, right = 0;
    
            // 定义最长子串长度
            int maxLength = 0;
    
            // 遍历字符串
            while (right < s.length()) {
                char currentChar = s.charAt(right);
    
                // 如果当前字符是要排除的字符
                if (excludeChar == currentChar) {
                    // 如果左右指针不在同一位置，说明存在符合条件的子串
                    if (right > left) {
                        maxLength = Math.max(maxLength, right - left);
                    }
                    // 将左右指针都移动到下一个位置
                    right++;
                    left = right;
                } else {
                    // 如果当前字符不是要排除的字符
                    // 先将当前字符在map中初始化
                    charIndexMap.computeIfAbsent(currentChar, k -> new ArrayList<>());
                    List<Integer> charIndexes = charIndexMap.get(currentChar);
                    // 如果当前字符的出现次数已经超过2次
                    if (charIndexes.size() == 2) {
                        // 更新最长子串长度
                        maxLength = Math.max(maxLength, right - left);
                        // 将左指针移动到当前字符上一次出现的位置的下一个位置
                        left = charIndexes.get(0) + 1;
                        // 删除当前字符在map中的第一个下标
                        charIndexes.remove(0);
                    }
                    // 将当前字符的下标加入map中
                    charIndexes.add(right);
                    // 右指针向后移动
                    right++;
                }
            }
    
            // 检查最后一个子串是否符合条件
            maxLength = Math.max(maxLength, right - left);
    
            // 输出最长子串长度
            System.out.println(maxLength);
        }
    }
    
    

## Python

    
    
    from collections import defaultdict
    
    # 输入exclude和s
    exclude = input()
    s = input()
    # 获取要排除的字符
    excludeChar = exclude[0]
    
    # 存储每个字符出现的下标
    charIndexMap = defaultdict(list)
    
    # 定义左右指针
    left = 0
    right = 0
    
    # 定义最长子串长度
    maxLength = 0
    
    # 遍历字符串
    while right < len(s):
        currentChar = s[right]
    
        # 如果当前字符是要排除的字符
        if excludeChar == currentChar:
            # 如果左右指针不在同一位置，说明存在符合条件的子串
            if right > left:
                maxLength = max(maxLength, right - left)
            # 将左右指针都移动到下一个位置
            right += 1
            left = right
        else:
            # 如果当前字符不是要排除的字符
            # 先将当前字符在map中初始化
            charIndexMap[currentChar]
            charIndexes = charIndexMap[currentChar]
            # 如果当前字符的出现次数已经超过2次
            if len(charIndexes) == 2:
                # 更新最长子串长度
                maxLength = max(maxLength, right - left)
                # 将左指针移动到当前字符上一次出现的位置的下一个位置
                left = charIndexes[0] + 1
                # 删除当前字符在map中的第一个下标
                charIndexes.pop(0)
            # 将当前字符的下标加入map中
            charIndexes.append(right)
            # 右指针向后移动
            right += 1
    
    # 检查最后一个子串是否符合条件
    maxLength = max(maxLength, right - left)
    
    # 输出最长子串长度
    print(maxLength)
    
    

## JavaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    let exclude = '';
    let s = '';
    
    rl.on('line', (input) => {
      if (!exclude) {
        exclude = input;
      } else {
        s = input;
    
        // 获取要排除的字符
        const excludeChar = exclude[0];
    
        // 存储每个字符出现的下标
        const charIndexMap = {};
    
        // 定义左右指针
        let left = 0;
        let right = 0;
    
        // 定义最长子串长度
        let maxLength = 0;
    
        // 遍历字符串
        while (right < s.length) {
          const currentChar = s[right];
    
          // 如果当前字符是要排除的字符
          if (excludeChar === currentChar) {
            // 如果左右指针不在同一位置，说明存在符合条件的子串
            if (right > left) {
              maxLength = Math.max(maxLength, right - left);
            }
            // 将左右指针都移动到下一个位置
            right++;
            left = right;
          } else {
            // 如果当前字符不是要排除的字符
            // 先将当前字符在map中初始化
            charIndexMap[currentChar] = charIndexMap[currentChar] || [];
            const charIndexes = charIndexMap[currentChar];
            // 如果当前字符的出现次数已经超过2次
            if (charIndexes.length === 2) {
              // 更新最长子串长度
              maxLength = Math.max(maxLength, right - left);
              // 将左指针移动到当前字符上一次出现的位置的下一个位置
              left = charIndexes[0] + 1;
              // 删除当前字符在map中的第一个下标
              charIndexes.shift();
            }
            // 将当前字符的下标加入map中
            charIndexes.push(right);
            // 右指针向后移动
            right++;
          }
        }
    
        // 检查最后一个子串是否符合条件
        maxLength = Math.max(maxLength, right - left);
    
        // 输出最长子串长度
        console.log(maxLength);
    
        rl.close();
      }
    });
    
    

## C++

    
    
    #include <iostream>
    #include <vector>
    #include <unordered_map>
    using namespace std;
    
    int main() {
        // 输入exclude和s
        string exclude, s;
        cin >> exclude >> s;
        // 获取要排除的字符
        char excludeChar = exclude[0];
    
        // 存储每个字符出现的下标
        unordered_map<char, vector<int>> charIndexMap;
    
        // 定义左右指针
        int left = 0, right = 0;
    
        // 定义最长子串长度
        int maxLength = 0;
    
        // 遍历字符串
        while (right < s.length()) {
            char currentChar = s[right];
    
            // 如果当前字符是要排除的字符
            if (excludeChar == currentChar) {
                // 如果左右指针不在同一位置，说明存在符合条件的子串
                if (right > left) {
                    maxLength = max(maxLength, right - left);
                }
                // 将左右指针都移动到下一个位置
                right++;
                left = right;
            } else {
                // 如果当前字符不是要排除的字符
                // 先将当前字符在map中初始化
                charIndexMap[currentChar];
                vector<int>& charIndexes = charIndexMap[currentChar];
                // 如果当前字符的出现次数已经超过2次
                if (charIndexes.size() == 2) {
                    // 更新最长子串长度
                    maxLength = max(maxLength, right - left);
                    // 将左指针移动到当前字符上一次出现的位置的下一个位置
                    left = charIndexes[0] + 1;
                    // 删除当前字符在map中的第一个下标
                    charIndexes.erase(charIndexes.begin());
                }
                // 将当前字符的下标加入map中
                charIndexes.push_back(right);
                // 右指针向后移动
                right++;
            }
        }
    
        // 检查最后一个子串是否符合条件
        maxLength = max(maxLength, right - left);
    
        // 输出最长子串长度
        cout << maxLength << endl;
    
        return 0;
    }
    
    
    

## C语言

    
    
    #include <stdio.h>
    #include <string.h>
    
    #define MAX_LENGTH 10000
    
    // 用于存储每个字符的出现下标
    int charIndexMap[128][3];
    
    int main() {
        char excludeChar;
        char s[MAX_LENGTH + 1];
    
        // 读取排除字符和字符串
        scanf("%c", &excludeChar);
        scanf("%s", s);
    
        // 初始化存储字符下标的数组
        for (int i = 0; i < 128; i++) {
            charIndexMap[i][0] = charIndexMap[i][1] = -1;
        }
    
        int left = 0, right = 0;
        int maxLength = 0;
        int length = strlen(s);
    
        // 遍历字符串
        while (right < length) {
            char currentChar = s[right];
    
            // 如果当前字符是要排除的字符
            if (currentChar == excludeChar) {
                if (right > left) {
                    maxLength = right - left > maxLength ? right - left : maxLength;
                }
                right++;
                left = right;
            } else {
                // 如果当前字符不是要排除的字符
                int* charIndexes = charIndexMap[currentChar];
    
                // 如果当前字符的出现次数已经超过2次
                if (charIndexes[1] != -1) {
                    maxLength = right - left > maxLength ? right - left : maxLength;
                    left = charIndexes[0] + 1;
                    charIndexes[0] = charIndexes[1];
                    charIndexes[1] = -1;
                }
    
                // 将当前字符的下标加入到数组中
                if (charIndexes[0] == -1) {
                    charIndexes[0] = right;
                } else {
                    charIndexes[1] = right;
                }
    
                // 右指针向后移动
                right++;
            }
        }
    
        // 检查最后一个子串是否符合条件
        maxLength = right - left > maxLength ? right - left : maxLength;
    
        // 输出最长子串长度
        printf("%d\n", maxLength);
    
        return 0;
    }
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/4dc1f6908b9b8185cba25f0c29a5e662.png)

