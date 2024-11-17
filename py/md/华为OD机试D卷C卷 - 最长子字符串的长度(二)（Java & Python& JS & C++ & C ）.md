## 题目描述

给你一个字符串 s，字符串s首尾相连成一个环形 ，请你在环中找出’l’、‘o’、‘x’ 字符都恰好出现了偶数次最长子字符串的长度。

## 输入描述

输入是一串小写的字母组成的字符串s。

1 <= s.length <= 5 x 10^5

s 只包含小写英文字母。

## 输出描述

输出是一个整数

## 用例1

输入

    
    
    alolobo
    

输出

    
    
    6
    

说明：最长子字符串之一是 “alolob”，它包含 ‘l’，'o’各 2 个，以及 0 个 ‘x’ 。

## 用例2

输入

    
    
    looxdolx
    

输出

    
    
    7
    

说明

> 最长子字符串是 “oxdolxl”，由于是首尾连接在一起的，所以最后一个 ‘x’ 和开头的 'l’是连接在一起的，此字符串包含 2 个 ‘l’ ，2个
> ‘o’ ，2个 ‘x’ 。

## 用例3

输入

    
    
    bcbcbc
    

输出

    
    
    6
    

说明

> 字符串 “bcbcbc” 本身就是最长的，因为 ‘l’、‘o’、‘x’ 都出现了 0 次。

## 解题思路

#### 思路解析

  1. **外层循环**

     * 从字符串的每个字符开始，遍历整个字符串。这个循环的目的是以每个字符作为子字符串的起始点。
  2. **内层循环**

     * 从外层循环指定的起始点开始，遍历字符串的其余部分。这个循环的目的是检查从当前起始点开始的所有可能的子字符串。
     * 对于每个可能的子字符串，计算字符 ‘l’、‘o’ 和 ‘x’ 的出现次数。
  3. **条件检查**

     * 在内层循环中，检查当前子字符串中字符 ‘l’、‘o’ 和 ‘x’ 出现的次数是否都是偶数。
     * 如果都是偶数，则计算当前子字符串的长度，并更新 `maxLength`，如果它比当前的 `maxLength` 更大。
  4. **返回结果**

     * 最后返回 `maxLength`，即满足条件的最长子字符串的长度。

#### 输入用例 “looxdolx” 的模拟

  1. **初始化**

     * `n = 8` (字符串 “looxdolx” 的长度)。
     * `maxLength = 0`。
  2. **遍历开始**

     * 以每个字符为起始点进行遍历。
  3. **以第一个字符 ‘l’ 为起始点**

     * 遍历所有以 ‘l’ 开始的子字符串，如 “l”, “lo”, “loo”, “loox”, “looxd”, “looxdo”, “looxdol”, “looxdolx”。
     * 当遍历到 “loox” 时，计数为：`countL = 1, countO = 2, countX = 1`。不满足条件，不更新 `maxLength`。
     * 继续遍历直到结束。
  4. **以其他字符为起始点**

     * 类似地遍历以 ‘o’, ‘o’, ‘x’, ‘d’, ‘o’, ‘l’, ‘x’ 为起始点的所有子字符串。
     * 关键是处理字符串如环状，使用 `(i + j) % n` 来计算当前字符的位置。
  5. **找到最长的满足条件的子字符串**

     * 当以 ‘o’（第3个字符，下标为2）为起始点时，整个字符串 “oxdolxl” 都被遍历。
     * 在这个子字符串中，‘l’、‘o’、‘x’ 的出现次数分别为 2、2、2，都是偶数。
     * 所以 `maxLength` 更新为 8。
  6. **完成遍历**

     * 遍历完成后，`maxLength` 是最长的满足条件的子字符串的长度，在这个例子中为7。

## C++

    
    
    #include <iostream>
    #include <string>
    #include <algorithm> // 用于std::max函数
    
    
    
    // 定义一个函数，用于找出满足条件的最长子字符串的长度
    int findLongestSubstringLength(const std::string &s) {
        // 获取输入字符串的长度
        int n = s.length();
        // 初始化最长子字符串长度为0
        int maxLength = 0;
    
        // 外层循环，从字符串的每一个字符开始检查
        for (int i = 0; i < n; i++) {
            // 初始化'l'、'o'和'x'的计数器
            int countL = 0, countO = 0, countX = 0;
    
            // 内层循环，从当前字符开始，遍历整个字符串
            for (int j = 0; j < n; j++) {
                // 计算当前字符的索引，处理环形字符串的情况
                int index = (i + j) % n;
                // 获取当前字符
                char ch = s[index];
    
                // 根据当前字符增加相应字符的计数
                if (ch == 'l') countL++;
                else if (ch == 'o') countO++;
                else if (ch == 'x') countX++;
    
                // 如果'l'、'o'和'x'出现的次数都是偶数
                if (countL % 2 == 0 && countO % 2 == 0 && countX % 2 == 0) {
                    // 更新最长子字符串的长度
                    maxLength = std::max(maxLength, j + 1);
                }
            }
        }
    
        // 返回最长子字符串的长度
        return maxLength;
    }
    
    // 主函数
    int main() {
        std::string s;
        // 从标准输入读取字符串
        std::cin >> s;
    
        // 调用findLongestSubstringLength函数计算并返回结果
        int result = findLongestSubstringLength(s);
        // 打印结果
        std::cout << result << std::endl;
    
        return 0;
    }
    

## Java

    
    
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            String s = scanner.next();
    
            // 调用findLongestSubstringLength方法计算并返回结果
            int result = findLongestSubstringLength(s);
            // 打印结果
            System.out.println(result);
        }
    
        // 定义一个私有静态方法，用于找出满足条件的最长子字符串的长度
        private static int findLongestSubstringLength(String s) {
            // 获取输入字符串的长度
            int n = s.length();
            // 初始化最长子字符串长度为0
            int maxLength = 0;
    
            // 外层循环，从字符串的每一个字符开始检查
            for (int i = 0; i < n; i++) {
                // 初始化'l'、'o'和'x'的计数器
                int countL = 0, countO = 0, countX = 0;
    
                // 内层循环，从当前字符开始，遍历整个字符串
                for (int j = 0; j < n; j++) {
                    // 计算当前字符的索引，处理环形字符串的情况
                    int index = (i + j) % n;
                    // 获取当前字符
                    char ch = s.charAt(index);
    
                    // 根据当前字符增加相应字符的计数
                    if (ch == 'l') countL++;
                    else if (ch == 'o') countO++;
                    else if (ch == 'x') countX++;
    
                    // 如果'l'、'o'和'x'出现的次数都是偶数
                    if (countL % 2 == 0 && countO % 2 == 0 && countX % 2 == 0) {
                        // 更新最长子字符串的长度
                        maxLength = Math.max(maxLength, j + 1);
                    }
                }
            }
    
            // 返回最长子字符串的长度
            return maxLength;
        }
    }
    

## javaScript

    
    
    // 使用 readline 模块来处理命令行输入
    const readline = require('readline');
    
    // 创建 readline 接口实例
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    // 定义一个函数，用于找出满足条件的最长子字符串的长度
    function findLongestSubstringLength(s) {
      // 获取输入字符串的长度
      const n = s.length;
      // 初始化最长子字符串长度为0
      let maxLength = 0;
    
      // 外层循环，从字符串的每一个字符开始检查
      for (let i = 0; i < n; i++) {
        // 初始化 'l'、'o' 和 'x' 的计数器
        let countL = 0, countO = 0, countX = 0;
    
        // 内层循环，从当前字符开始，遍历整个字符串
        for (let j = 0; j < n; j++) {
          // 计算当前字符的索引，处理环形字符串的情况
          const index = (i + j) % n;
          // 获取当前字符
          const ch = s[index];
    
          // 根据当前字符增加相应字符的计数
          if (ch === 'l') countL++;
          else if (ch === 'o') countO++;
          else if (ch === 'x') countX++;
    
          // 如果 'l'、'o' 和 'x' 出现的次数都是偶数
          if (countL % 2 === 0 && countO % 2 === 0 && countX % 2 === 0) {
            // 更新最长子字符串的长度
            maxLength = Math.max(maxLength, j + 1);
          }
        }
      }
    
      // 返回最长子字符串的长度
      return maxLength;
    }
    
    // 询问用户输入字符串
    rl.on('line', (s) => {
      // 调用 findLongestSubstringLength 函数计算并返回结果
      const result = findLongestSubstringLength(s);
      // 打印结果
      console.log(result);
      // 关闭 readline 接口
      rl.close();
    });
    

## Python

    
    
    # 定义一个函数，用于找出满足条件的最长子字符串的长度
    def find_longest_substring_length(s):
        # 获取输入字符串的长度
        n = len(s)
        # 初始化最长子字符串长度为 0
        max_length = 0
    
        # 外层循环，从字符串的每一个字符开始检查
        for i in range(n):
            # 初始化 'l'、'o' 和 'x' 的计数器
            count_l = 0
            count_o = 0
            count_x = 0
    
            # 内层循环，从当前字符开始，遍历整个字符串
            for j in range(n):
                # 计算当前字符的索引，处理环形字符串的情况
                index = (i + j) % n
                # 获取当前字符
                ch = s[index]
    
                # 根据当前字符增加相应字符的计数
                if ch == 'l':
                    count_l += 1
                elif ch == 'o':
                    count_o += 1
                elif ch == 'x':
                    count_x += 1
    
                # 如果 'l'、'o' 和 'x' 出现的次数都是偶数
                if count_l % 2 == 0 and count_o % 2 == 0 and count_x % 2 == 0:
                    # 更新最长子字符串的长度
                    max_length = max(max_length, j + 1)
    
        # 返回最长子字符串的长度
        return max_length
    
    # 主函数
    if __name__ == '__main__':
        # 从标准输入读取字符串
        s = input()
        # 调用 find_longest_substring_length 函数计算并返回结果
        result = find_longest_substring_length(s)
        # 打印结果
        print(result)
    

## C语言

    
    
    #include <stdio.h>
    #include <string.h> // 用于strlen函数
    
    // 定义一个函数，用于找出满足条件的最长子字符串的长度
    int findLongestSubstringLength(const char *s) {
        // 获取输入字符串的长度
        int n = strlen(s);
        // 初始化最长子字符串长度为0
        int maxLength = 0;
    
        // 外层循环，从字符串的每一个字符开始检查
        for (int i = 0; i < n; i++) {
            // 初始化'l'、'o'和'x'的计数器
            int countL = 0, countO = 0, countX = 0;
    
            // 内层循环，从当前字符开始，遍历整个字符串
            for (int j = 0; j < n; j++) {
                // 计算当前字符的索引，处理环形字符串的情况
                int index = (i + j) % n;
                // 获取当前字符
                char ch = s[index];
    
                // 根据当前字符增加相应字符的计数
                if (ch == 'l') countL++;
                else if (ch == 'o') countO++;
                else if (ch == 'x') countX++;
    
                // 如果'l'、'o'和'x'出现的次数都是偶数
                if (countL % 2 == 0 && countO % 2 == 0 && countX % 2 == 0) {
                    // 更新最长子字符串的长度
                    int currentLength = j + 1;
                    maxLength = (maxLength > currentLength) ? maxLength : currentLength;
                }
            }
        }
    
        // 返回最长子字符串的长度
        return maxLength;
    }
    
    // 主函数
    int main() {
        char s[1001]; // 假设字符串长度不超过1000
        // 从标准输入读取字符串
        scanf("%s", s);
    
        // 调用findLongestSubstringLength函数计算并返回结果
        int result = findLongestSubstringLength(s);
        // 打印结果
        printf("%d\n", result);
    
        return 0;
    }
    

## 完整用例

### 用例1

    
    
    xxoolloo
    

### 用例2

    
    
    loxxo
    

### 用例3

    
    
    l
    

### 用例4

    
    
    oxlxoxo
    

### 用例5

    
    
    llllllllll
    

### 用例6

    
    
    oxoxoxox
    

### 用例7

    
    
    loxlolox
    

### 用例8

    
    
    xolxolxol
    

### 用例9

    
    
    xoxoxo
    

### 用例10

    
    
    oxloloxl
    

![fengmian](https://i-blog.csdnimg.cn/blog_migrate/6d7088a64c33cbbd48257d1c3df107b1.png)

