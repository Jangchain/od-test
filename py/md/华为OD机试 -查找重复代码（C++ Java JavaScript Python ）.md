#### 题目描述

小明负责维护项目下的代码，需要查找出重复代码，用以支撑后续的代码优化，请你帮助小明找出重复的代码。  
重复代码查找方法：以字符串形式给定两行代码（字符串长度 1 < length <= 100，由英文字母、数字和空格组成），找出两行代码中的最长公共子串  
注：如果不存在公共子串，返回空字符串

#### 输入描述

输入的参数text1, text2分别表示两行代码

#### 输出描述

输出任一最长公共子串

#### 用例

输入| hello123world  
hello123abc4  
---|---  
输出| hello123  
说明| 无  
输入| private_void_method  
public_void_method  
---|---  
输出| _void_method  
说明| 无  
  
#### 解题思路

这段代码的目标是找到两个字符串（text1和text2）之间的最长公共子串。最长公共子串是指两个字符串中连续的、相同的字符序列。为了实现这个目标，代码采用了动态规划的方法。

以下是详细的解题思路和解题方法：

  1. 首先，从用户那里获取两个字符串text1和text2。

  2. 初始化两个字符串的长度n和m。

  3. 创建一个一维数组dp，用于存储最长公共子串的长度。dp[j]表示以text1的第i个字符和text2的第j个字符结尾的最长公共子串的长度。

  4. 初始化最长公共子串的长度max_len为0，以及最长公共子串在text1中的结束位置end_index为0。

  5. 使用两层循环遍历text1和text2的每个字符。外层循环遍历text1的每个字符，内层循环遍历text2的每个字符。

  6. 在内层循环中，初始化一个变量prev，用于存储dp[i-1][j-1]的值。这是因为我们在计算dp[i][j]时需要用到dp[i-1][j-1]的值。

  7. 在内层循环中，比较text1的第i个字符和text2的第j个字符。如果它们相等，那么dp[j]的值应该更新为prev + 1。这是因为我们找到了一个新的公共子串，它的长度比之前的公共子串多1。

  8. 如果text1的第i个字符和text2的第j个字符不相等，那么dp[j]的值应该设置为0。这是因为以这两个字符结尾的子串不可能是公共子串。

  9. 在内层循环中，更新prev的值为当前dp[j]的值。这样，在下一次循环中，prev就会存储dp[i-1][j-1]的值。

  10. 在内层循环中，检查dp[j]的值是否大于当前最长公共子串的长度。如果是，那么更新最长公共子串的长度max_len，以及最长公共子串在text1中的结束位置end_index。

  11. 在循环结束后，根据最长公共子串的长度max_len和结束位置end_index，截取text1中的最长公共子串。

  12. 输出最长公共子串。

通过这种动态规划的方法，我们可以在O(nm)的时间复杂度内找到两个字符串之间的最长公共子串。

#### C++

    
    
    #include <iostream>
    #include <string>
    #include <vector>
    
    int main() {
        // 使用std::cin和std::getline读取用户输入的两个字符串text1和text2
        std::string text1, text2;
        std::getline(std::cin, text1);
        std::getline(std::cin, text2);
    
        // 获取两个字符串的长度
        int n = text1.length();
        int m = text2.length();
    
        // 创建一个一维数组dp，用于存储最长公共子串的长度
        std::vector<int> dp(m + 1, 0);
    
        // 初始化最长公共子串的长度为0
        int maxLen = 0;
        // 初始化最长公共子串在text1中的结束位置为0
        int endIndex = 0;
    
        // 遍历text1的每个字符
        for (int i = 1; i <= n; i++) {
            // 初始化prev变量，用于存储dp[i-1][j-1]的值
            int prev = 0;
            // 遍历text2的每个字符
            for (int j = 1; j <= m; j++) {
                // 保存当前dp[j]的值，以便在下一次循环中使用
                int temp = dp[j];
                // 如果text1的第i个字符和text2的第j个字符相等
                if (text1[i - 1] == text2[j - 1]) {
                    // 更新dp[j]的值为prev + 1
                    dp[j] = prev + 1;
    
                    // 如果dp[j]的值大于当前最长公共子串的长度
                    if (dp[j] > maxLen) {
                        // 更新最长公共子串的长度
                        maxLen = dp[j];
                        // 更新最长公共子串在text1中的结束位置
                        endIndex = i;
                    }
                } else {
                    // 如果text1的第i个字符和text2的第j个字符不相等，将dp[j]设置为0
                    dp[j] = 0;
                }
                // 更新prev的值为temp，即dp[i-1][j-1]的值
                prev = temp;
            }
        }
    
        // 根据最长公共子串的长度和结束位置，截取text1中的最长公共子串
        std::string ans = text1.substr(endIndex - maxLen, maxLen);
    
        // 输出最长公共子串
        std::cout << ans << std::endl;
    
        return 0;
    }
    
    

#### JavaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    // 用于存储用户输入的字符串
    let input = [];
    
    // 读取用户输入的两个字符串
    rl.on('line', (line) => {
      input.push(line);
      if (input.length === 2) {
        rl.close();
      }
    });
    
    rl.on('close', () => {
      // 获取两个字符串text1和text2
      const text1 = input[0];
      const text2 = input[1];
    
      // 获取两个字符串的长度
      const n = text1.length;
      const m = text2.length;
    
      // 创建一个一维数组dp，用于存储最长公共子串的长度
      const dp = new Array(m + 1).fill(0);
    
      // 初始化最长公共子串的长度为0
      let maxLen = 0;
      // 初始化最长公共子串在text1中的结束位置为0
      let endIndex = 0;
    
      // 遍历text1的每个字符
      for (let i = 1; i <= n; i++) {
        // 初始化prev变量，用于存储dp[i-1][j-1]的值
        let prev = 0;
        // 遍历text2的每个字符
        for (let j = 1; j <= m; j++) {
          // 保存当前dp[j]的值，以便在下一次循环中使用
          const temp = dp[j];
          // 如果text1的第i个字符和text2的第j个字符相等
          if (text1.charAt(i - 1) === text2.charAt(j - 1)) {
            // 更新dp[j]的值为prev + 1
            dp[j] = prev + 1;
    
            // 如果dp[j]的值大于当前最长公共子串的长度
            if (dp[j] > maxLen) {
              // 更新最长公共子串的长度
              maxLen = dp[j];
              // 更新最长公共子串在text1中的结束位置
              endIndex = i;
            }
          } else {
            // 如果text1的第i个字符和text2的第j个字符不相等，将dp[j]设置为0
            dp[j] = 0;
          }
          // 更新prev的值为temp，即dp[i-1][j-1]的值
          prev = temp;
        }
      }
    
      // 根据最长公共子串的长度和结束位置，截取text1中的最长公共子串
      const ans = text1.slice(endIndex - maxLen, endIndex);
    
      // 输出最长公共子串
      console.log(ans);
    });
    
    

#### Java

    
    
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            // 创建一个Scanner对象，用于读取用户输入
            Scanner sc = new Scanner(System.in);
    
            // 读取两个字符串text1和text2
            String text1 = sc.nextLine();
            String text2 = sc.nextLine();
    
            // 获取两个字符串的长度
            int n = text1.length();
            int m = text2.length();
    
            // 创建一个一维数组dp，用于存储最长公共子串的长度
            int[] dp = new int[m + 1];
    
            // 初始化最长公共子串的长度为0
            int maxLen = 0;
            // 初始化最长公共子串在text1中的结束位置为0
            int endIndex = 0;
    
            // 遍历text1的每个字符
            for (int i = 1; i <= n; i++) {
                // 初始化prev变量，用于存储dp[i-1][j-1]的值
                int prev = 0;
                // 遍历text2的每个字符
                for (int j = 1; j <= m; j++) {
                    // 保存当前dp[j]的值，以便在下一次循环中使用
                    int temp = dp[j];
                    // 如果text1的第i个字符和text2的第j个字符相等
                    if (text1.charAt(i - 1) == text2.charAt(j - 1)) {
                        // 更新dp[j]的值为prev + 1
                        dp[j] = prev + 1;
    
                        // 如果dp[j]的值大于当前最长公共子串的长度
                        if (dp[j] > maxLen) {
                            // 更新最长公共子串的长度
                            maxLen = dp[j];
                            // 更新最长公共子串在text1中的结束位置
                            endIndex = i;
                        }
                    } else {
                        // 如果text1的第i个字符和text2的第j个字符不相等，将dp[j]设置为0
                        dp[j] = 0;
                    }
                    // 更新prev的值为temp，即dp[i-1][j-1]的值
                    prev = temp;
                }
            }
    
            // 根据最长公共子串的长度和结束位置，截取text1中的最长公共子串
            String ans = text1.substring(endIndex - maxLen, endIndex);
    
            // 输出最长公共子串
            System.out.println(ans);
        }
    }
    
    
    

#### Python

    
    
    # 使用input()函数读取用户输入的两个字符串text1和text2
    text1 = input()
    text2 = input()
    
    # 获取两个字符串的长度
    n = len(text1)
    m = len(text2)
    
    # 创建一个一维数组dp，用于存储最长公共子串的长度
    dp = [0] * (m + 1)
    
    # 初始化最长公共子串的长度为0
    max_len = 0
    # 初始化最长公共子串在text1中的结束位置为0
    end_index = 0
    
    # 遍历text1的每个字符
    for i in range(1, n + 1):
        # 初始化prev变量，用于存储dp[i-1][j-1]的值
        prev = 0
        # 遍历text2的每个字符
        for j in range(1, m + 1):
            # 保存当前dp[j]的值，以便在下一次循环中使用
            temp = dp[j]
            # 如果text1的第i个字符和text2的第j个字符相等
            if text1[i - 1] == text2[j - 1]:
                # 更新dp[j]的值为prev + 1
                dp[j] = prev + 1
    
                # 如果dp[j]的值大于当前最长公共子串的长度
                if dp[j] > max_len:
                    # 更新最长公共子串的长度
                    max_len = dp[j]
                    # 更新最长公共子串在text1中的结束位置
                    end_index = i
            else:
                # 如果text1的第i个字符和text2的第j个字符不相等，将dp[j]设置为0
                dp[j] = 0
            # 更新prev的值为temp，即dp[i-1][j-1]的值
            prev = temp
    
    # 根据最长公共子串的长度和结束位置，截取text1中的最长公共子串
    ans = text1[end_index - max_len:end_index]
    
    # 输出最长公共子串
    print(ans)
    
    

#### 文章目录

  *     *       * 题目描述
      * 输入描述
      * 输出描述
      * 用例
      * 解题思路
      * C++
      * JavaScript
      * Java
      * Python

![fengmian](https://img-
blog.csdnimg.cn/img_convert/1d2f33ed8cf2fb1b9a4fe09513f7aa94.png)

