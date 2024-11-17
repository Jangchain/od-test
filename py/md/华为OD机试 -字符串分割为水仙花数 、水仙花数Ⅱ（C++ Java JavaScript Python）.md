#### 题目描述

给定非空字符串s，将该字符串分割成一些子串，使**每个子串** 的ASCII码值的和均为水仙花数。

1、若分割不成功，则返回0；

2、若分割成功且分割结果不唯一，则返回-1；

3、若分割成功且分割结果唯一，则返回分割后子串的数目。

#### 输入描述

输入字符串的最大长度为200

#### 输出描述

根据题目描述中情况，返回相应的结果。

##### ACM输入输出模式

如果你经常使用**Leetcode** ,会知道**letcode** 是不需要编写输入输出函数的。但是华为OD机考使用的是 **ACM 模式**
，需要手动编写输入和输出。

所以最好在牛-
客上提前熟悉这种模式。例如C++使用`cin/cout`,python使用`input()/print()`。JavaScript使用node的`readline()`和`console.log()`。Java
使用`sacnner/system.out.print()`

#### 用例

输入| f3@d5a8  
---|---  
输出| -1  
说明| 分割成功但分割结果不唯一，可以分割为两组，一组’f3’和’@d5a8’，另外一组’f3@d5’和’a8’  
输入| AXdddF  
---|---  
输出| 2  
说明| 分割成功且分割结果唯一，可以分割’AX’(153)和’dddF’(370)成两个子串  
  
> "水仙花数"是指一个三位数，每位上数字的立方和等于该数字本身，如 371 是’水仙花数’，因为 371=33+73+1^3

#### 机考代码查重

华为OD机考完成之后，官方会进行代码查重。**华为 od 机考确实有很大的概率抽到原题**
。如果碰到了题库中的原题，一定不要直接使用题解中的代码，尤其是变量名，一定要修改，可以改成毫无意义的单词。除了变量名之外，代码的组织结构和逻辑一定要进行改变，这就要求在日常的刷题中，提前编写好属于自己的代码。

#### C++

    
    
    #include <iostream>
    #include <string>
    #include <vector>
    using namespace std;
    
    // 递归函数，将给定字符串分割成一些子串，使每个子串的ASCII码值的和均为水仙花数
    void splitString(const vector<int>& asciiArr, int start, int count, vector<int>& res) {
        // 分割成功，将分割后子串的数目加入结果数组
        if (start == asciiArr.size()) {
            res.push_back(count);
            return;
        }
    
        // 从起始位置向后遍历，计算子串的ASCII码值的和
        int sum = 0;
        for (int i = start; i < asciiArr.size(); i++) {
            sum += asciiArr[i];
            // 如果子串的ASCII码值的和为水仙花数，则递归计算后面的子串
            if (sum >= 100 && sum <= 999 && sum == (sum % 10) * (sum % 10) * (sum % 10) + (sum / 10 % 10) * (sum / 10 % 10) * (sum / 10 % 10) + (sum / 100) * (sum / 100) * (sum / 100)) {
                splitString(asciiArr, i + 1, count + 1, res);
            }
        }
    }
    
    // 给定非空字符串s，将该字符串分割成一些子串，使每个子串的ASCII码值的和均为水仙花数
    // 若分割不成功，则返回0；若分割成功且分割结果不唯一，则返回-1；若分割成功且分割结果唯一，则返回分割后子串的数目
    int getSxhSubStr(const string& str) {
        vector<int> asciiArr;
        // 将字符串转换为ASCII码数组
        for (char c : str) {
            asciiArr.push_back((int)c);
        }
    
        vector<int> res;
        // 从第一个字符开始分割字符串
        splitString(asciiArr, 0, 0, res);
    
        if (res.empty()) {
            // 分割不成功，返回0
            return 0;
        } else if (res.size() == 1) {
            // 分割成功且分割结果唯一，返回分割后子串的数目
            return res[0];
        } else {
            // 分割成功且分割结果不唯一，返回-1
            return -1;
        }
    }
    
    int main() {
        string line;
        cin >> line;
        cout << getSxhSubStr(line) << endl;
        return 0;
    }
    

#### java

    
    
    import java.util.*;
    
    public class Main {
        // 递归函数，将给定字符串分割成一些子串，使每个子串的ASCII码值的和均为水仙花数
        public static void splitString(List<Integer> asciiArr, int start, int count, List<Integer> res) {
            // 分割成功，将分割后子串的数目加入结果数组
            if (start == asciiArr.size()) {
                res.add(count);
                return;
            }
    
            // 从起始位置向后遍历，计算子串的ASCII码值的和
            int sum = 0;
            for (int i = start; i < asciiArr.size(); i++) {
                sum += asciiArr.get(i);
                // 如果子串的ASCII码值的和为水仙花数，则递归计算后面的子串
                if (sum >= 100 && sum <= 999 && sum == (sum % 10) * (sum % 10) * (sum % 10) + (sum / 10 % 10) * (sum / 10 % 10) * (sum / 10 % 10) + (sum / 100) * (sum / 100) * (sum / 100)) {
                    splitString(asciiArr, i + 1, count + 1, res);
                }
            }
        }
    
        // 给定非空字符串s，将该字符串分割成一些子串，使每个子串的ASCII码值的和均为水仙花数
        // 若分割不成功，则返回0；若分割成功且分割结果不唯一，则返回-1；若分割成功且分割结果唯一，则返回分割后子串的数目
        public static int getSxhSubStr(String str) {
            List<Integer> asciiArr = new ArrayList<>();
            // 将字符串转换为ASCII码数组
            for (char c : str.toCharArray()) {
                asciiArr.add((int)c);
            }
    
            List<Integer> res = new ArrayList<>();
            // 从第一个字符开始分割字符串
            splitString(asciiArr, 0, 0, res);
    
            if (res.isEmpty()) {
                // 分割不成功，返回0
                return 0;
            } else if (res.size() == 1) {
                // 分割成功且分割结果唯一，返回分割后子串的数目
                return res.get(0);
            } else {
                // 分割成功且分割结果不唯一，返回-1
                return -1;
            }
        }
    
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            String line = scanner.nextLine();
            System.out.println(getSxhSubStr(line));
        }
    }
    

#### javaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    // 递归函数，将给定字符串分割成一些子串，使每个子串的ASCII码值的和均为水仙花数
    function splitString(asciiArr, start, count, res) {
      // 分割成功，将分割后子串的数目加入结果数组
      if (start === asciiArr.length) {
        res.push(count);
        return;
      }
    
      // 从起始位置向后遍历，计算子串的ASCII码值的和
      let sum = 0;
      for (let i = start; i < asciiArr.length; i++) {
        sum += asciiArr[i];
        // 如果子串的ASCII码值的和为水仙花数，则递归计算后面的子串
        if (sum >= 100 && sum <= 999 && sum === (sum % 10) * (sum % 10) * (sum % 10) + (Math.floor(sum / 10) % 10) * (Math.floor(sum / 10) % 10) * (Math.floor(sum / 10) % 10) + Math.floor(sum / 100) * Math.floor(sum / 100) * Math.floor(sum / 100)) {
          splitString(asciiArr, i + 1, count + 1, res);
        }
      }
    }
    
    // 给定非空字符串s，将该字符串分割成一些子串，使每个子串的ASCII码值的和均为水仙花数
    // 若分割不成功，则返回0；若分割成功且分割结果不唯一，则返回-1；若分割成功且分割结果唯一，则返回分割后子串的数目
    function getSxhSubStr(str) {
      const asciiArr = [];
      // 将字符串转换为ASCII码数组
      for (let i = 0; i < str.length; i++) {
        asciiArr.push(str.charCodeAt(i));
      }
    
      const res = [];
      // 从第一个字符开始分割字符串
      splitString(asciiArr, 0, 0, res);
    
      if (res.length === 0) {
        // 分割不成功，返回0
        return 0;
      } else if (res.length === 1) {
        // 分割成功且分割结果唯一，返回分割后子串的数目
        return res[0];
      } else {
        // 分割成功且分割结果不唯一，返回-1
        return -1;
      }
    }
    
    rl.on('line', (input) => {
      console.log(getSxhSubStr(input));
    });
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    // 递归函数，将给定字符串分割成一些子串，使每个子串的ASCII码值的和均为水仙花数
    function splitString(asciiArr, start, count, res) {
      // 分割成功，将分割后子串的数目加入结果数组
      if (start === asciiArr.length) {
        res.push(count);
        return;
      }
    
      // 从起始位置向后遍历，计算子串的ASCII码值的和
      let sum = 0;
      for (let i = start; i < asciiArr.length; i++) {
        sum += asciiArr[i];
        // 如果子串的ASCII码值的和为水仙花数，则递归计算后面的子串
        if (sum >= 100 && sum <= 999 && sum === (sum % 10) * (sum % 10) * (sum % 10) + (Math.floor(sum / 10) % 10) * (Math.floor(sum / 10) % 10) * (Math.floor(sum / 10) % 10) + Math.floor(sum / 100) * Math.floor(sum / 100) * Math.floor(sum / 100)) {
          splitString(asciiArr, i + 1, count + 1, res);
        }
      }
    }
    
    // 给定非空字符串s，将该字符串分割成一些子串，使每个子串的ASCII码值的和均为水仙花数
    // 若分割不成功，则返回0；若分割成功且分割结果不唯一，则返回-1；若分割成功且分割结果唯一，则返回分割后子串的数目
    function getSxhSubStr(str) {
      const asciiArr = [];
      // 将字符串转换为ASCII码数组
      for (let i = 0; i < str.length; i++) {
        asciiArr.push(str.charCodeAt(i));
      }
    
      const res = [];
      // 从第一个字符开始分割字符串
      splitString(asciiArr, 0, 0, res);
    
      if (res.length === 0) {
        // 分割不成功，返回0
        return 0;
      } else if (res.length === 1) {
        // 分割成功且分割结果唯一，返回分割后子串的数目
        return res[0];
      } else {
        // 分割成功且分割结果不唯一，返回-1
        return -1;
      }
    }
    
    rl.on('line', (input) => {
      console.log(getSxhSubStr(input));
    });
    

#### python

    
    
    def splitString(asciiArr, start, count, res):
        if start == len(asciiArr):
            res.append(count)
            return
        sum = 0
        for i in range(start, len(asciiArr)):
            sum += asciiArr[i]
            if sum >= 100 and sum <= 999 and sum == (sum % 10) * (sum % 10) * (sum % 10) + (sum // 10 % 10) * (sum // 10 % 10) * (sum // 10 % 10) + (sum // 100) * (sum // 100) * (sum // 100):
                splitString(asciiArr, i + 1, count + 1, res)
    
    def getSxhSubStr(str):
        asciiArr = []
        for c in str:
            asciiArr.append(ord(c))
        res = []
        splitString(asciiArr, 0, 0, res)
        if not res:
            return 0
        elif len(res) == 1:
            return res[0]
        else:
            return -1
    
    line = input()
    print(getSxhSubStr(line))
    

#### 文章目录

  *     *       * 题目描述
      * 输入描述
      * 输出描述
      *         * ACM输入输出模式
      * 用例
      * 机考代码查重
      * C++
      * java
      * javaScript
      * python

![fengmian](https://i-blog.csdnimg.cn/blog_migrate/169f277a87c29b8ff13d65ef9e7eeec7.png)

