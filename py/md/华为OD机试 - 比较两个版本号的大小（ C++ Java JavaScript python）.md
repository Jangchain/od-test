#### 题目描述

> 输入两个版本号 version1 和 version2，每个版本号由多个子版本号组成。
>
> 子版本号之间由 “.” 隔开，由大小写字母、数字组成，并且至少有一个字符。
>
> 按从左到右的顺序比较子版本号，比较规则如下：
>
>   * 子版本号前面的0不参与比较，比如 001 和 1 是相等的。
>   * 小写字母 > 大写字母 > 数字
>   * 空字符和0相等，比如 1 和 1.0 相等
>

>
> **比较结果**
>
> 如果 version1 > version2 ，返回 1
>
> 如果 version1 < version2 ，返回-1
>
> 其他情况返回0

#### 输入描述

> 第一行输入version1
>
> 第二行输入version2

#### 输出描述

> 输出version1和version2的比较结果

##### ACM输入输出模式

如果你经常使用**Leetcode** ,会知道**letcode** 是不需要编写输入输出函数的。但是华为OD机考使用的是 **ACM 模式**
，需要手动编写输入和输出。

所以最好在牛-
客上提前熟悉这种模式。例如C++使用`cin/cout`,python使用`input()/print()`。JavaScript使用node的`readline()`和`console.log()`。Java
使用`sacnner/system.out.print()`

#### 用例1

输入

    
    
    5.2
    5.1a
    

输出

    
    
    1
    

#### 用例2

输入

    
    
    5.6.1
    5.6.2a
    

输出

    
    
    -1
    

#### 用例3

输入

    
    
    5.6.8.a
    5.6.8.0a
    

输出

    
    
    0
    

#### 代码思路

题目要求比较两个版本号，每个版本号由多个子版本号组成，子版本号之间用点号隔开。比较规则包括子版本号前面的0不参与比较，小写字母大于大写字母大于数字，空字符和0相等。根据这些规则，我们需要逐个比较子版本号，得出最终结果。

解题思路如下：

  1. 读取输入的两个版本号 `version1` 和 `version2`。
  2. 使用 `split` 方法，根据点号将两个版本号分割成子版本号数组 `arr1` 和 `arr2`。
  3. 计算两个数组的最大长度 `n`，用于遍历比较。
  4. 遍历数组，从左到右比较子版本号：  
a. 如果下标 `i` 在数组范围内，取数组中的值并去除前导0，否则取0。这里使用 `removeLeadingZero` 函数去除前导0。  
b. 使用 `compareTo` 方法比较两个子版本号。如果 `tmp1` 大于 `tmp2`，结果为1并跳出循环；如果 `tmp1` 小于
`tmp2`，结果为-1并跳出循环；否则继续比较下一个子版本号。

  5. 输出最终结果。

#### C++

    
    
    #include <iostream>
    #include <string>
    #include <vector>
    #include <sstream>
    #include <algorithm>
    using namespace std;
    // 去除前导0
    string removeLeadingZero(const string &x) {
        string tmp = x;
        size_t first_non_zero = tmp.find_first_not_of('0'); // 找到第一个不是0的位置
        if (first_non_zero != string::npos) {
            tmp.erase(0, first_non_zero);
        } else {
            tmp = "0";
        }
        return tmp;
    }
    
    vector<string> split(const string &s, char delimiter) {
        vector<string> tokens;
        string token;
        istringstream tokenStream(s);
        while (getline(tokenStream, token, delimiter)) {
            tokens.push_back(token);
        }
        return tokens;
    }
    
    int main() {
        string version1, version2;
        getline(cin, version1); // 输入第一个版本号
        getline(cin, version2); // 输入第二个版本号
    
        int res = 0; // 定义结果变量
        vector<string> arr1 = split(version1, '.'); // 将第一个版本号按照"."分割
        vector<string> arr2 = split(version2, '.'); // 将第二个版本号按照"."分割
        size_t n = max(arr1.size(), arr2.size()); // 取两个数组长度的最大值
        for (size_t i = 0; i < n; i++) { // 遍历数组
            string tmp1 = (i < arr1.size()) ? removeLeadingZero(arr1[i]) : "0"; // 如果下标i在数组范围内，取数组中的值并去除前导0，否则取0
            string tmp2 = (i < arr2.size()) ? removeLeadingZero(arr2[i]) : "0"; // 如果下标i在数组范围内，取数组中的值并去除前导0，否则取0
            if (tmp1.compare(tmp2) > 0) { // 如果第一个版本号的当前位大于第二个版本号的当前位
                res = 1; // 结果为1
                break; // 跳出循环
            } else if (tmp1.compare(tmp2) < 0) { // 如果第一个版本号的当前位小于第二个版本号的当前位
                res = -1; // 结果为-1
                break; // 跳出循环
            }
        }
        cout << res << endl; // 输出结果
        return 0;
    }
    
    

#### Java

    
    
    import java.util.*;
    
    public class Main {
        // 去除前导0
        public static String removeLeadingZero(String x) {
            String tmp = x;
            tmp = tmp.replaceAll("^0+", ""); // 找到第一个不是0的位置
            return tmp.isEmpty() ? "0" : tmp; // 如果字符串为空，返回0，否则返回tmp
        }
    
        public static void main(String[] args) {
            Scanner sc = new Scanner(System.in);
            String version1 = sc.nextLine(); // 输入第一个版本号
            String version2 = sc.nextLine(); // 输入第二个版本号
    
            int res = 0; // 定义结果变量
            String[] arr1 = version1.split("\\."); // 将第一个版本号按照"."分割
            String[] arr2 = version2.split("\\."); // 将第二个版本号按照"."分割
            int n = Math.max(arr1.length, arr2.length); // 取两个数组长度的最大值
            for (int i = 0; i < n; i++) { // 遍历数组
                String tmp1 = (i < arr1.length) ? removeLeadingZero(arr1[i]) : "0"; // 如果下标i在数组范围内，取数组中的值并去除前导0，否则取0
                String tmp2 = (i < arr2.length) ? removeLeadingZero(arr2[i]) : "0"; // 如果下标i在数组范围内，取数组中的值并去除前导0，否则取0
                if (tmp1.compareTo(tmp2) > 0) { // 如果第一个版本号的当前位大于第二个版本号的当前位
                    res = 1; // 结果为1
                    break; // 跳出循环
                } else if (tmp1.compareTo(tmp2) < 0) { // 如果第一个版本号的当前位小于第二个版本号的当前位
                    res = -1; // 结果为-1
                    break; // 跳出循环
                }
            }
            System.out.println(res); // 输出结果
        }
    }
    
    

#### javaScript

    
    
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    // 去除前导0
    function removeLeadingZero(x) {
      let tmp = x;
      tmp = tmp.replace(/^0+/, ''); // 找到第一个不是0的位置
      return tmp === '' ? '0' : tmp; // 如果字符串为空，返回0，否则返回tmp
    }
    
    rl.on('line', (input) => {
      const versions = input.split(' ');
      const version1 = versions[0]; // 输入第一个版本号
      const version2 = versions[1]; // 输入第二个版本号
    
      let res = 0; // 定义结果变量
      const arr1 = version1.split('.'); // 将第一个版本号按照"."分割
      const arr2 = version2.split('.'); // 将第二个版本号按照"."分割
      const n = Math.max(arr1.length, arr2.length); // 取两个数组长度的最大值
      for (let i = 0; i < n; i++) { // 遍历数组
        const tmp1 = i < arr1.length ? removeLeadingZero(arr1[i]) : '0'; // 如果下标i在数组范围内，取数组中的值并去除前导0，否则取0
        const tmp2 = i < arr2.length ? removeLeadingZero(arr2[i]) : '0'; // 如果下标i在数组范围内，取数组中的值并去除前导0，否则取0
        if (tmp1 > tmp2) { // 如果第一个版本号的当前位大于第二个版本号的当前位
          res = 1; // 结果为1
          break; // 跳出循环
        } else if (tmp1 < tmp2) { // 如果第一个版本号的当前位小于第二个版本号的当前位
          res = -1; // 结果为-1
          break; // 跳出循环
        }
      }
      console.log(res); // 输出结果
    });
    
    

#### python

    
    
    def remove_leading_zero(x):
        # 去除前导0
        tmp = x.lstrip('0')
        return '0' if tmp == '' else tmp
    
    
    # 输入第一个版本号
    version1 = input()
    # 输入第二个版本号
    version2 = input()
    
    res = 0  # 定义结果变量
    arr1 = version1.split('.')  # 将第一个版本号按照"."分割
    arr2 = version2.split('.')  # 将第二个版本号按照"."分割
    n = max(len(arr1), len(arr2))  # 取两个数组长度的最大值
    
    # 遍历数组
    for i in range(n):
        # 如果下标i在数组范围内，取数组中的值并去除前导0，否则取0
        tmp1 = remove_leading_zero(arr1[i]) if i < len(arr1) else '0'
        # 如果下标i在数组范围内，取数组中的值并去除前导0，否则取0
        tmp2 = remove_leading_zero(arr2[i]) if i < len(arr2) else '0'
    
        if tmp1 > tmp2:  # 如果第一个版本号的当前位大于第二个版本号的当前位
            res = 1  # 结果为1
            break  # 跳出循环
        elif tmp1 < tmp2:  # 如果第一个版本号的当前位小于第二个版本号的当前位
            res = -1  # 结果为-1
            break  # 跳出循环
    
    # 输出结果
    print(res)
    
    

#### 文章目录

  *     *       * 题目描述
      * 输入描述
      * 输出描述
      *         * ACM输入输出模式
      * 用例1
      * 用例2
      * 用例3
      * 代码思路
      * C++
      * Java
      * javaScript
      * python

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

