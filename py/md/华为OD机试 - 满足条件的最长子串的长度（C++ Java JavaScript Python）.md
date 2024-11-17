#### 题目描述

给定一个字符串s，找出这样一个子串：

  1. 该子串中任意一个字符最多出现2次
  2. 该子串不包含指定某个字符

请你找出满足该条件的最长子串的长度

#### 输入描述

第一行为：要求不包含的指定字符，为单个字符，取值范围[0-9a-zA-Z]

第二行为：字符串s，每个字符范围[0-9a-zA-Z]，长度范围[1, 10000]

#### 输出描述

一个整数，满足条件的最长子串的长度；

如果不存在满足条件的子串，则返回0

#### 用例

输入| D ABC123  
---|---  
输出| 6  
说明| 无  
输入| D ABACA123D  
---|---  
输出| 7  
说明| 无  
  
#### 代码思路

  1. 读入要排除的字符和字符串s。
  2. 定义左右指针和最长子串长度maxLength，初始化为0。
  3. 遍历字符串s，对于每个字符： 
     * 如果当前字符是要排除的字符，更新最长子串长度为当前左右指针之差，将左右指针都移动到下一个位置。
     * 如果当前字符不是要排除的字符，将当前字符的下标加入一个unordered_map中，记录每个字符出现的下标。如果当前字符的出现次数已经超过2次，更新最长子串长度为当前左右指针之差，将左指针移动到当前字符上一次出现的位置的下一个位置，删除当前字符在map中的第一个下标。右指针向后移动。
  4. 检查最后一个子串是否符合条件，更新最长子串长度。
  5. 输出最长子串长度。

#### C++

    
    
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
    
    

#### JavaScript

    
    
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
    

#### Java

    
    
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
    

#### Python

    
    
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
    

#### 文章目录

  *     *       * 题目描述
      * 输入描述
      * 输出描述
      * 用例
      * 代码思路
      * C++
      * JavaScript
      * Java
      * Python

![doutub_gif](https://i-blog.csdnimg.cn/blog_migrate/e9413fcd109f2f3d7297192eab0c0b2a.gif)

