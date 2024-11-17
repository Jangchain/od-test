#### 题目描述

给定一个元素类型为小写字符串的数组，请计算两个没有相同字符的元素长度乘积的最大值，

如果没有符合条件的两个元素，返回0。

#### 输入描述

输入为一个半角逗号分隔的小写字符串的数组，2 <= 数组长度<=100，0 < 字符串长度<= 50。

#### 输出描述

两个没有相同字符的元素 长度乘积的**最大值** 。

#### 用例

输入| iwdvpbn,hk,iuop,iikd,kadgpf  
---|---  
输出| 14  
说明|
数组中有5个元素。iwdvpbn与hk无相同的字符，满足条件，iwdvpbn的长度为7，hk的长度为2，乘积为14（7*2）。iwdvpbn与iuop、iikd、kadgpf均有相同的字符，不满足条件。iuop与iikd、kadgpf均有相同的字符，不满足条件。iikd与kadgpf有相同的字符，不满足条件。因此，输出为14。  
  
#### C++

    
    
    #include <iostream>
    #include <unordered_map>
    #include <unordered_set>
    #include <vector>
    using namespace std;
    
    int main() {
        // 读入输入字符串
        string input;
        getline(cin, input);
        // 将字符串解析为字符串数组
        vector<string> strArr;
        string temp = "";
        for (char c : input) {
            if (c == ',') {
                strArr.push_back(temp);
                temp = "";
            } else {
                temp += c;
            }
        }
        strArr.push_back(temp);
    
        // 计算每个字符串中出现的字符
        unordered_map<string, unordered_set<char>> strCharMap;
        for (string str : strArr) {
            unordered_set<char> charSet;
            for (char c : str) {
                charSet.insert(c);
            }
            strCharMap[str] = charSet;
        }
    
        // 计算最大的长度乘积
        int ans = 0;
        for (int i = 0; i < strArr.size(); i++) {
            unordered_set<char> set1 = strCharMap[strArr[i]];
            for (int j = i + 1; j < strArr.size(); j++) {
                unordered_set<char> set2 = strCharMap[strArr[j]];
                // 判断两个字符串的字符集是否有交集
                bool isDisjoint = true;
                for (char c : set1) {
                    if (set2.count(c) != 0) {
                        isDisjoint = false;
                        break;
                    }
                }
                if (isDisjoint) {
                    ans = max(ans, (int)(strArr[i].length() * strArr[j].length()));
                }
            }
        }
    
        cout << ans << endl;
    
        return 0;
    }
    

#### java

    
    
    import java.util.*;
    
    public class Main {
        public static void main(String[] args) {
            Scanner sc = new Scanner(System.in);
            String input = sc.nextLine();
            // 将字符串解析为字符串数组
            String[] strArr = input.split(",");
            // 计算每个字符串中出现的字符
            Map<String, Set<Character>> strCharMap = new HashMap<>();
            for (String str : strArr) {
                Set<Character> charSet = new HashSet<>();
                for (char c : str.toCharArray()) {
                    charSet.add(c);
                }
                strCharMap.put(str, charSet);
            }
            // 计算最大的长度乘积
            int ans = 0;
            for (int i = 0; i < strArr.length; i++) {
                Set<Character> set1 = strCharMap.get(strArr[i]);
                for (int j = i + 1; j < strArr.length; j++) {
                    Set<Character> set2 = strCharMap.get(strArr[j]);
                    // 判断两个字符串的字符集是否有交集
                    boolean isDisjoint = true;
                    for (char c : set1) {
                        if (set2.contains(c)) {
                            isDisjoint = false;
                            break;
                        }
                    }
                    if (isDisjoint) {
                        ans = Math.max(ans, strArr[i].length() * strArr[j].length());
                    }
                }
            }
            System.out.println(ans);
        }
    }
    

#### javaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.on('line', (input) => {
      // 将字符串解析为字符串数组
      const strArr = input.split(',');
    
      // 计算每个字符串中出现的字符
      const strCharMap = new Map();
      for (const str of strArr) {
        const charSet = new Set();
        for (const c of str) {
          charSet.add(c);
        }
        strCharMap.set(str, charSet);
      }
    
      // 计算最大的长度乘积
      let ans = 0;
      for (let i = 0; i < strArr.length; i++) {
        const set1 = strCharMap.get(strArr[i]);
        for (let j = i + 1; j < strArr.length; j++) {
          const set2 = strCharMap.get(strArr[j]);
          // 判断两个字符串的字符集是否有交集
          let isDisjoint = true;
          for (const c of set1) {
            if (set2.has(c)) {
              isDisjoint = false;
              break;
            }
          }
          if (isDisjoint) {
            ans = Math.max(ans, strArr[i].length * strArr[j].length);
          }
        }
      }
    
      console.log(ans);
    });
    

#### python

    
    
    import collections
    
    # 读入输入字符串
    input_str = input()
    # 将字符串解析为字符串数组
    strArr = input_str.split(',')
    
    # 计算每个字符串中出现的字符
    strCharMap = {}
    for s in strArr:
        charSet = set(s)
        strCharMap[s] = charSet
    
    # 计算最大的长度乘积
    ans = 0
    for i in range(len(strArr)):
        set1 = strCharMap[strArr[i]]
        for j in range(i+1, len(strArr)):
            set2 = strCharMap[strArr[j]]
            # 判断两个字符串的字符集是否有交集
            if set1.isdisjoint(set2):
                ans = max(ans, len(strArr[i]) * len(strArr[j]))
    
    print(ans)
    

#### 文章目录

  *     *       * 题目描述
      * 输入描述
      * 输出描述
      * 用例
      * C++
      * java
      * javaScript
      * python

![fengmian](https://img-
blog.csdnimg.cn/img_convert/1d2f33ed8cf2fb1b9a4fe09513f7aa94.png)

