#### 题目描述

> 给定字符串A、B和正整数V，A的长度与B的长度相等， 请计算A中满足如下条件的最大连续子串的长度：
>
> 1、该连续子串在A和B中的位置和长度均相同。
>
> 2、该连续子串|A[i] – B[i]|之和小于等于V。其中|A[i] –  
>  B[i]|表示两个字母**ASCII码之差的绝对值** 。

#### 输入描述

>   * 输入为三行：
>   * 第一行为字符串A，仅包含小写字符，1 <= A.length <=1000。
>   * 第二行为字符串B，仅包含小写字符，1 <= B.length <=1000。
>   * 第三行为正整数V，0<= V <= 10000。
>

#### 输出描述

>   * 字符串最大连续子串的长度，要求该子串|A[i] – B[i]|之和小于等于V。
>

#### 用例

输入| `xxcdefg``cdefghi``5`  
---|---  
输出| `2`  
说明| 无  
  
####

#### C++

    
    
    #include <iostream>
    #include <vector>
    #include <algorithm>
    using namespace std;
    
    int main() {
        string strA, strB;
        int V;
        cin >> strA >> strB >> V;
    
        int N = strA.length();
    
        // 先求出差值的绝对值
        vector<int> diffList;
        for (int i = 0; i < N; ++i) {
            diffList.push_back(abs(strA[i] - strB[i]));
        }
    
        int sum = 0, result = 0;
        int left = 0, right = 0; // 滑动窗口的左右指针
        while (right < diffList.size()) {
            sum += diffList[right];
            // 滑动窗口
            if (sum > V) {
                while (left <= right && sum > V) {
                    sum -= diffList[left];
                    left++;
                }
            }
            result = max(result, right - left + 1);
            right++;
        }
    
        cout << result << endl;
    
        return 0;
    }
    

#### java

    
    
    import java.util.*;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            // 输入初始化
            String strA = scanner.next(); // 字符串A
            String strB = scanner.next(); // 字符串B
            int V = scanner.nextInt(); // 正整数V
    
            int N = strA.length(); // 字符串长度
    
            // 先求出差值的绝对值
            List<Integer> diffList = new ArrayList<>();
            for (int i = 0; i < N; ++i) {
                diffList.add(Math.abs(strA.charAt(i) - strB.charAt(i)));
            }
    
            int sum = 0, result = 0;
            int left = 0, right = 0; // 滑动窗口的左右指针
            while (right < diffList.size()) {
                sum += diffList.get(right);
                // 滑动窗口
                if (sum > V) {
                    while (left <= right && sum > V) {
                        sum -= diffList.get(left);
                        left++;
                    }
                }
                result = Math.max(result, right - left + 1);
                right++;
            }
    
            System.out.println(result);
        }
    }
    

#### javaScript

    
    
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    let strA, strB;
    let V;
    
    rl.on('line', (line) => {
      if (!strA) {
        strA = line.trim();
      } else if (!strB) {
        strB = line.trim();
      } else {
        V = parseInt(line.trim());
        rl.close();
      }
    });
    
    rl.on('close', () => {
      const N = strA.length;
    
      // 先求出差值的绝对值
      const diffList = [];
      for (let i = 0; i < N; ++i) {
        diffList.push(Math.abs(strA.charCodeAt(i) - strB.charCodeAt(i)));
      }
    
      let sum = 0, result = 0;
      let left = 0, right = 0; // 滑动窗口的左右指针
      while (right < diffList.length) {
        sum += diffList[right];
        // 滑动窗口
        if (sum > V) {
          while (left <= right && sum > V) {
            sum -= diffList[left];
            left++;
          }
        }
        result = Math.max(result, right - left + 1);
        right++;
      }
    
      console.log(result);
    });
    
    

#### python

    
    
    import math
    
    strA = input() # 字符串A
    strB = input() # 字符串B
    V = int(input()) # 正整数V
    
    N = len(strA) # 字符串长度
    
    # 先求出差值的绝对值
    diffList = []
    for i in range(N):
        diffList.append(abs(ord(strA[i]) - ord(strB[i])))
    
    sum = 0
    result = 0
    left = 0
    right = 0 # 滑动窗口的左右指针
    while right < len(diffList):
        sum += diffList[right]
        # 滑动窗口
        if sum > V:
            while left <= right and sum > V:
                sum -= diffList[left]
                left += 1
        result = max(result, right - left + 1)
        right += 1
    
    print(result)
    

> #### 文章目录
>
>   *     *       * 题目描述
>       * 输入描述
>       * 输出描述
>       * 用例
>       *       * C++
>       * java
>       * javaScript
>       * python
>       * 完整用例
>       *         * 用例1
>         * 用例2
>         * 用例3
>         * 用例4
>         * 用例5
>         * 用例6
>         * 用例7
>         * 用例8
>         * 用例9
>         * 用例10
>

![fengmian](https://img-
blog.csdnimg.cn/img_convert/1d2f33ed8cf2fb1b9a4fe09513f7aa94.png)

#### 完整用例

##### 用例1

    
    
    xxcdefg
    cdefghi
    5
    

##### 用例2

    
    
    abcdefg
    abcdefg
    0
    

##### 用例3

    
    
    abcdefg
    bcdefgh
    10
    

##### 用例4

    
    
    abcdefg
    bcdefgh
    5
    

##### 用例5

    
    
    abcdefg
    bcdefgh
    3
    

##### 用例6

    
    
    abcd
    bcde
    2
    

##### 用例7

    
    
    abcdefg
    abcdxyz
    10
    

##### 用例8

    
    
    abcd
    efgh
    10
    

##### 用例9

    
    
    abcdefg
    abcdefg
    10
    

##### 用例10

    
    
    abcdefg
    xyzwvut
    10
    

