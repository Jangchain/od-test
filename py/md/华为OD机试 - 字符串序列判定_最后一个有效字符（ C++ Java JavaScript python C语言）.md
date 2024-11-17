## 题目描述：字符串序列判定/最后一个有效字符（本题分值100）

输入两个字符串S和L，都只包含英文小写字母。S长度<=100，L长度<=500,000。判定S是否是L的有效子串。

判定规则：

S中的每个字符在L中都能找到（可以不连续），

且S在Ｌ中字符的前后顺序与S中顺序要保持一致。

（例如，S=”[ace](https://so.csdn.net/so/search?q=ace&spm=1001.2101.3001.7020)”是L=”abcde”的一个子序列且有效字符是a、c、e，而”aec”不是有效子序列，且有效字符只有a、e）

## 输入描述

输入两个字符串S和L，都只包含英文小写字母。S长度<=100，L长度<=500,000。

先输入S，再输入L，每个字符串占一行。

## 输出描述

输出S串最后一个有效字符在L中的位置。（首位从0开始计算，无有效字符返回-1）

## 用例

### 用例1

输入

    
    
    ace
    abcde
    

输出

    
    
    4
    

### 用例2

输入

    
    
    fgh
    abcde
    

输出

    
    
    -1
    

## 解题思路

**注意： 本题在C卷中和B卷中都有。机考可能会存在变形，请注意审题** 。  
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/52e7bbd53dfb845d256c05bce226e2fc.png)  
我们初始化两个指针i和j，分别用于遍历S和L。

接下来，我们使用双指针法进行遍历，当i小于S的长度且j小于L的长度时，进行循环。

在循环中，我们判断S中的当前字符是否与L中的当前字符相等，如果相等，则将i指针向后移动一位。

无论字符是否相等，我们都将j指针向后移动一位。

当循环结束后，我们判断i是否等于S的长度，如果等于，则说明S的所有字符都在L中找到了，打印L中最后一个有效字符的位置（即j的值减1）；否则，说明S还有字符没有在L中找到，打印-1。

最后，我们得到了S串最后一个有效字符在L中的位置。

## 用例解析

在上面的用例中，indexS和indexL是通过循环逐步变化的。下面是它们的具体变化过程：

  1. 初始化索引：  
indexS = 0, indexL = 0

![image-20231108222225962](https://i-blog.csdnimg.cn/blog_migrate/88045a36fe0156c97341867adb478632.png)

  2. 第一次循环：

     * 检查S中的第一个字符’a’与L中的第一个字符’a’是否相同，相同则indexS加1，indexL加1。

     * indexS = 1, indexL = 1

![image-20231108222311611](https://i-blog.csdnimg.cn/blog_migrate/28c16f608e8a0b3c2fb9420199f89c81.png)

  3. 第二次循环：

     * 检查S中的第二个字符’c’与L中的第二个字符’b’是否相同，不同则indexS不变，indexL加1。

     * indexS = 1, indexL = 2

![image-20231108222353467](https://i-blog.csdnimg.cn/blog_migrate/d0ff72b6f079290ecd6e06bbac2c1c48.png)

  4. 第三次循环：

     * 检查S中的第二个字符’c’与L中的第三个字符’c’是否相同，相同则则indexS加1，indexL加1。

     * indexS = 2, indexL = 3

![image-20231108222456300](https://i-blog.csdnimg.cn/blog_migrate/990d4771202e7e125e1a629ab7e926d9.png)

  5. 第四次循环：

     * 检查S中的第三个字符’e’与L中的第四个字符’d’是否相同，不同则indexS不变，indexL加1。

     * indexS = 2, indexL = 4

![image-20231108222541147](https://i-blog.csdnimg.cn/blog_migrate/059a6f5de960b4be2e124c4ca351f38c.png)

  6. 第五次循环：

     * S已经遍历完，循环结束。

在循环结束后，判断indexS是否等于S的长度，即判断S的所有字符是否都在L中找到了。在这个用例中，indexS等于S的长度，表示S中的字符都在L中找到了。

最后，打印L中最后一个有效字符的位置（即L的当前索引减1），即输出为4。

## C语言

    
    
    #include <stdio.h>
    #include <string.h>  // 引入字符串处理函数
    
    #define MAX_LENGTH 1000  // 定义字符串最大长度常量
    
    int main() {
        char stringS[MAX_LENGTH], stringL[MAX_LENGTH];  // 定义两个字符数组
    
        // 读取两个字符串，使用 fgets 来读取每一行
        fgets(stringS, MAX_LENGTH, stdin);
        fgets(stringL, MAX_LENGTH, stdin);
    
        // 去除末尾的换行符
        stringS[strcspn(stringS, "\n")] = 0;
        stringL[strcspn(stringL, "\n")] = 0;
    
        int indexS = 0, indexL = 0;  // 初始化两个索引，分别用于遍历S和L
        int lengthS = strlen(stringS), lengthL = strlen(stringL);  // 获取字符串的实际长度
    
        // 当S和L都没有遍历完时，继续遍历
        while (indexS < lengthS && indexL < lengthL) {
            // 如果S中的当前字符与L中的当前字符相同，则S的索引加1
            if (stringS[indexS] == stringL[indexL]) {
                indexS++;
            }
            // 无论字符是否相同，L的索引都加1
            indexL++;
        }
    
        // 如果S的所有字符都在L中找到了（即S已经遍历完了），则打印L中最后一个有效字符的位置（即L的当前索引减1）
        if (indexS == lengthS) printf("%d\n", indexL - 1);
        // 如果S还有字符没有在L中找到，则打印-1
        else printf("-1\n");
    
        return 0;
    }
    
    

## C++

    
    
    #include <iostream>
    #include <string>
    using namespace std;
    
    int main() {
      string stringS, stringL;
      getline(cin, stringS);
      getline(cin, stringL);
    
      // 初始化两个索引，分别用于遍历S和L
      int indexS = 0;
      int indexL = 0;
    
      // 当S和L都没有遍历完时，继续遍历
      while (indexS < stringS.length() && indexL < stringL.length()) {
        // 如果S中的当前字符与L中的当前字符相同，则S的索引加1
        if (stringS[indexS] == stringL[indexL]) {
          indexS++;
        }
        // 无论字符是否相同，L的索引都加1
        indexL++;
      }
    
      // 如果S的所有字符都在L中找到了（即S已经遍历完了），则打印L中最后一个有效字符的位置（即L的当前索引减1）
      if (indexS == stringS.length()) cout << indexL - 1 << endl;
      // 如果S还有字符没有在L中找到，则打印-1
      else cout << -1 << endl;
    
      return 0;
    }
    
    

## Java

    
    
    import java.util.Scanner;
    
    public class Main {
      public static void main(String[] args) {
        // 创建一个Scanner对象来读取用户的输入
        Scanner scanner = new Scanner(System.in);
    
        // 读取第一个字符串S
        String stringS = scanner.nextLine();
        // 读取第二个字符串L
        String stringL = scanner.nextLine();a
    
        // 初始化两个索引，分别用于遍历S和L
        int indexS = 0;
        int indexL = 0;
    
        // 当S和L都没有遍历完时，继续遍历
        while (indexS < stringS.length() && indexL < stringL.length()) {
          // 如果S中的当前字符与L中的当前字符相同，则S的索引加1
          if (stringS.charAt(indexS) == stringL.charAt(indexL)) {
            indexS++;
          }
          // 无论字符是否相同，L的索引都加1
          indexL++;
        }
    
        // 如果S的所有字符都在L中找到了（即S已经遍历完了），则打印L中最后一个有效字符的位置（即L的当前索引减1）
        if (indexS == stringS.length()) System.out.println(indexL - 1);
        // 如果S还有字符没有在L中找到，则打印-1
        else System.out.println(-1);
      }
    }
    
    

## JavaScript

    
    
    const readline = require('readline');
    
    // 创建一个readline接口对象来读取用户的输入
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    // 读取第一个字符串S
    rl.on('line', (stringS) => {
      // 读取第二个字符串L
      rl.on('line', (stringL) => {
        // 初始化两个索引，分别用于遍历S和L
        let indexS = 0;
        let indexL = 0;
    
        // 当S和L都没有遍历完时，继续遍历
        while (indexS < stringS.length && indexL < stringL.length) {
          // 如果S中的当前字符与L中的当前字符相同，则S的索引加1
          if (stringS.charAt(indexS) === stringL.charAt(indexL)) {
            indexS++;
          }
          // 无论字符是否相同，L的索引都加1
          indexL++;
        }
    
        // 如果S的所有字符都在L中找到了（即S已经遍历完了），则打印L中最后一个有效字符的位置（即L的当前索引减1）
        if (indexS === stringS.length) console.log(indexL - 1);
        // 如果S还有字符没有在L中找到，则打印-1
        else console.log(-1);
    
        rl.close();
      });
    });
    
    

## Python

    
    
    # 创建一个Scanner对象来读取用户的输入
    stringS = input("")
    stringL = input("")
    
    # 初始化两个索引，分别用于遍历S和L
    indexS = 0
    indexL = 0
    
    # 当S和L都没有遍历完时，继续遍历
    while indexS < len(stringS) and indexL < len(stringL):
        # 如果S中的当前字符与L中的当前字符相同，则S的索引加1
        if stringS[indexS] == stringL[indexL]:
            indexS += 1
        # 无论字符是否相同，L的索引都加1
        indexL += 1
    
    # 如果S的所有字符都在L中找到了（即S已经遍历完了），则打印L中最后一个有效字符的位置（即L的当前索引减1）
    if indexS == len(stringS):
        print(indexL - 1)
    # 如果S还有字符没有在L中找到，则打印-1
    else:
        print(-1)
    
    

## 完整用例

### 用例1

    
    
    ace
    abcde
    

### 用例2

    
    
    fgh
    abcde
    

### 用例3

    
    
    abc
    abcde
    

### 用例4

    
    
    abcd
    abcde
    

### 用例5

    
    
    a
    abcde
    

### 用例6

    
    
    abcd
    abcdef
    

### 用例7

    
    
    aaa
    aaabaaa
    

### 用例8

    
    
    aaa
    baaa
    

### 用例9

    
    
    aaa
    baabaaa
    

### 用例10

    
    
    aaa
    baabbaaa
    

#### 文章目录

  * 题目描述：字符串序列判定/最后一个有效字符（本题分值100）
  * 输入描述
  * 输出描述
  * 用例
  *     * 用例1
    * 用例2
  * 解题思路
  * 用例解析
  * C语言
  * C++
  * Java
  * JavaScript
  * Python
  * 完整用例
  *     * 用例1
    * 用例2
    * 用例3
    * 用例4
    * 用例5
    * 用例6
    * 用例7
    * 用例8
    * 用例9
    * 用例10

![doutub_gif](https://i-blog.csdnimg.cn/blog_migrate/1dad80e2fd697ae1a897ef58ff83f399.png)

