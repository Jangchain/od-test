## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

#### 题目描述

给定一个字符串，把字符串按照大写在前小写在后排序，输出排好后的第 K 个字母在原来字符串的索引。

相同字母输出第一个出现的位置。

#### 输入描述

无

#### 输出描述

无

#### 用例

输入| hAkDAjByBq 4  
---|---  
输出| 6  
说明| 排好序后 AABBDhjkqy，第 4 个是 B，第一个出现的在原字符串 6 这个位置。（注：索引是从 0 开始）  
  
#### C++

    
    
    #include <iostream>
    #include <algorithm>
    #include <vector>
    
    using namespace std;
    
    int main() {
        string str;
        int k;
        cin >> str >> k; // 输入字符串和第k个字母
        vector<char> strArr(str.begin(), str.end()); // 将字符串转换为字符数组
        sort(strArr.begin(), strArr.end()); // 对字符数组进行排序
        char target = strArr[k - 1]; // 获取排序后的第k个字母
        cout << str.find(target) << endl; // 输出第一个出现的位置
        return 0;
    }
    
    

#### JavaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    rl.on('line', (line) => {
        const [str, k] = line.split(' '); // 分割输入行为字符串和第k个字母
        const strArr = str.split(''); // 将字符串转换为字符数组
        strArr.sort(); // 对字符数组进行排序
        const target = strArr[k - 1]; // 获取排序后的第k个字母
        console.log(str.indexOf(target)); // 输出第一个出现的位置
        rl.close();
    });
    
    

#### Java

    
    
    import java.util.*;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            String str = scanner.next(); // 输入字符串
            int k = scanner.nextInt(); // 第k个字母
            char[] strArr = str.toCharArray(); // 将字符串转换为字符数组
            Arrays.sort(strArr); // 对字符数组进行排序
            char target = strArr[k - 1]; // 获取排序后的第k个字母
            System.out.println(str.indexOf(target)); // 输出第一个出现的位置
        }
    }
    
    

#### Python

    
    
    line = input().split()
    
    str = line[0] # 输入字符串
    k = int(line[1]) # 第k个字母
    strArr = sorted(str) # 对字符串进行排序
    target = strArr[k - 1] # 获取排序后的第k个字母
    print(str.index(target)) # 输出第一个出现的位置
    
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

#### 完整用例

##### 用例1

ABCDWXYZ 3

##### 用例2

abcdwxyz 3

##### 用例3

aBcDwXyZ 4

##### 用例4

AaBbCcDd 5

##### 用例5

1a@B#2c$D%3 6

##### 用例6

A 1

##### 用例7

aBcDwXyZ 8

##### 用例8

aBcDwXyZ 1

##### 用例9

AaAaAaAa 4

##### 用例10

aBcDeFaBcDeF 2

#### 文章目录

  * 最新华为OD机试
  *     *       * 题目描述
      * 输入描述
      * 输出描述
      * 用例
      * C++
      * JavaScript
      * Java
      * Python
      * 完整用例
      *         * 用例1
        * 用例2
        * 用例3
        * 用例4
        * 用例5
        * 用例6
        * 用例7
        * 用例8
        * 用例9
        * 用例10

![doutub_gif](https://i-blog.csdnimg.cn/blog_migrate/e9413fcd109f2f3d7297192eab0c0b2a.gif)

