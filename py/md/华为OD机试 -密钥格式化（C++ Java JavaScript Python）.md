#### 题目描述

> 给定一个非空字符串 S，其被 N 个’-‘分隔成 N+1 的子串，给定正整数 K，要求除第一个子串外，其余的串每 K  
>  个用’-‘分隔，并将小写字母转换为大写。

#### 输入描述

> 正整数 K 和‘-’分割的字符串，如：
>

>> 2  
>  25G3C-abc-d

#### 输出描述

> 转换后的字符串

##### ACM输入输出模式

如果你经常使用**Leetcode** ,会知道**letcode** 是不需要编写输入输出函数的。但是华为OD机考使用的是 **ACM 模式**
，需要手动编写输入和输出。

所以最好在牛-
客上提前熟悉这种模式。例如C++使用`cin/cout`,python使用`input()/print()`。JavaScript使用node的`readline()`和`console.log()`。Java
使用`sacnner/system.out.print()`

#### 用例

输入| 4  
5F3Z-2e-9-w  
---|---  
输出| 5F3Z-2E9W  
说明| 字符串 S 被分成了两个部分，每部分 4 个字符；注意，两个额外的破折号需要删掉。  
输入| 2  
2-5g-3-J  
---|---  
输出| 2-5G-3J  
说明| 字符串 S 被分成了 3 个部分，按照前面的规则描述，第一部分的字符可以少于给定的数量，其余部分皆为 2 个字符。  
  
#### 机考代码查重

华为OD机考完成之后，官方会进行代码查重。**华为 od 机考确实有很大的概率抽到原题**
。如果碰到了题库中的原题，一定不要直接使用题解中的代码，尤其是变量名，一定要修改，可以改成毫无意义的单词。除了变量名之外，代码的组织结构和逻辑一定要进行改变，这就要求在日常的刷题中，提前编写好属于自己的代码。

#### C++

    
    
    #include <iostream>
    #include <string>
    #include <vector>
    using namespace std;
    
    int main() {
        int k;
        string s;
        cin >> k >> s;
    
        vector<string> arr;
        string temp;
        for (int i = 0; i < s.length(); i++) {
            if (s[i] == '-') {
                arr.push_back(temp);
                temp = "";
            } else {
                temp += s[i];
            }
        }
        arr.push_back(temp);
    
        vector<string> ans;
        ans.push_back(arr[0]);
    
        string tmp = "";
        for (int i = 0; i < arr.size() - 1; i++) {
            tmp += arr[i+1];
        }
        for (int i = 0; i < tmp.length(); i++) {
            string v(1, toupper(tmp[i]));
            if (i % k == 0) {
                v = "-" + v;
            }
            ans.push_back(v);
        }
    
        for (int i = 0; i < ans.size(); i++) {
            cout << ans[i];
        }
        cout << endl;
    
        return 0;
    }
    

#### javaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    
    rl.on('line', (k) => {
    rl.on('line', (s) => {
    const arr = [];
      let temp = '';
      for (let i = 0; i < s.length; i++) {
        if (s[i] === '-') {
          arr.push(temp);
          temp = '';
        } else {
          temp += s[i];
        }
      }
      arr.push(temp);
    
      const ans = [arr[0]];
    
      let tmp = '';
      for (let i = 0; i < arr.length - 1; i++) {
        tmp += arr[i + 1];
      }
      for (let i = 0; i < tmp.length; i++) {
        let v = tmp[i].toUpperCase();
        if (i % k === 0) {
          v = `-${v}`;
        }
        ans.push(v);
      }
    
      console.log(ans.join(''));
    })
      
    });
    

#### Java

    
    
    import java.util.Scanner;
    import java.util.ArrayList;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            int k = scanner.nextInt();
            String s = scanner.next();
    
            ArrayList<String> arr = new ArrayList<String>();
            String temp = "";
            for (int i = 0; i < s.length(); i++) {
                if (s.charAt(i) == '-') {
                    arr.add(temp);
                    temp = "";
                } else {
                    temp += s.charAt(i);
                }
            }
            arr.add(temp);
    
            ArrayList<String> ans = new ArrayList<String>();
            ans.add(arr.get(0));
    
            String tmp = "";
            for (int i = 0; i < arr.size() - 1; i++) {
                tmp += arr.get(i+1);
            }
            for (int i = 0; i < tmp.length(); i++) {
                String v = String.valueOf(tmp.charAt(i)).toUpperCase();
                if (i % k == 0) {
                    v = "-" + v;
                }
                ans.add(v);
            }
    
            for (int i = 0; i < ans.size(); i++) {
                System.out.print(ans.get(i));
            }
            System.out.println();
        }
    }
    

#### Python

    
    
    import string
    
    k = int(input())
    s = input()
    
    arr = []
    temp = ""
    for i in range(len(s)):
        if s[i] == "-":
            arr.append(temp)
            temp = ""
        else:
            temp += s[i]
    arr.append(temp)
    
    ans = [arr[0]]
    
    tmp = ""
    for i in range(len(arr) - 1):
        tmp += arr[i+1]
    for i in range(len(tmp)):
        v = tmp[i].upper()
        if i % k == 0:
            v = "-" + v
        ans.append(v)
    
    print("".join(ans))
    

#### 完整用例

##### 用例1

    
    
    4
    5F3Z-2e-9-w
    

##### 用例2

    
    
    2
    2-5g-3-J
    

##### 用例3

    
    
    3
    abc-def-ghi-jkl
    

##### 用例4

    
    
    1
    a-b-c-d-e-f-g-h-i-j
    

##### 用例5

    
    
    5
    1-2-3-4-5-6-7-8-9-0
    

##### 用例6

    
    
    2
    Z-Y-X-W-V-U-T-S-R-Q
    

##### 用例7

    
    
    3
    AAA-BBB-CCC-DDD-EEE-FFF
    

##### 用例8

    
    
    4
    1111-2222-3333-4444-5555-6666
    

##### 用例9

    
    
    5
    aaaaa-bbbbb-ccccc-ddddd-eeeee
    

##### 用例10

    
    
    1
    Z-a-b-c-d-e-f-g-h-i-j
    

#### 文章目录

  *     *       * 题目描述
      * 输入描述
      * 输出描述
      *         * ACM输入输出模式
      * 用例
      * 机考代码查重
      * C++
      * javaScript
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

![fengmian](https://img-
blog.csdnimg.cn/img_convert/1d2f33ed8cf2fb1b9a4fe09513f7aa94.png)

