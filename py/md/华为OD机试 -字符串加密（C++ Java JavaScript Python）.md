## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

#### 题目描述

给你一串未加密的字符串str，通过对字符串的每一个字母进行改变来实现加密，加密方式是在每一个字母str[i]偏移特定数组元素a[i]的量，数组a前三位已经赋值：a[0]=1,a[1]=2,a[2]=4。

当i>=3时，数组元素a[i]=a[i-1]+a[i-2]+a[i-3]。

例如：原文 abcde 加密后 bdgkr，其中偏移量分别是1,2,4,7,13。

#### 输入描述

第一行为一个整数n（1<=n<=1000），表示有n组测试数据，每组数据包含一行，原文str（只含有小写字母，0<长度<=50）。

#### 输出描述

每组测试数据输出一行，表示字符串的密文。

#### 用例

输入| `1``xy`  
---|---  
输出| ya  
说明| 第一个字符x偏移量是1，即为y，第二个字符y偏移量是2，即为a。  
  
#### C++

    
    
    #include <iostream>
    #include <vector>
    using namespace std;
    
    // 计算数组a
    vector<long long> calculateA(int n) {
        vector<long long> a(n);
        if (n > 0) a[0] = 1;
        if (n > 1) a[1] = 2;
        if (n > 2) a[2] = 4;
        if (n > 3) {
            for (int i = 3; i < n; i++) {
                a[i] = a[i - 1] + a[i - 2] + a[i - 3];
            }
        }
        return a;
    }
    
    int main() {
        int n;
        cin >> n;
    
        // 读入n个字符串
        vector<string> strArr(n);
        for (int i = 0; i < n; i++) {
            cin >> strArr[i];
        }
    
        // 对每个字符串进行加密并输出
        for (int i = 0; i < n; i++) {
            int strLength = strArr[i].length();
            vector<long long> a = calculateA(strLength);
            string encryptedStr = "";
            for (int j = 0; j < strLength; j++) {
                encryptedStr += (char) ((a[j] + strArr[i][j] - 97) % 26 + 97);
            }
            cout << encryptedStr << endl;
        }
    
        return 0;
    }
    

#### java

    
    
    import java.util.Scanner;
    
    public class Main {
        // 计算数组a
        public static long[] calculateA(int n) {
            long[] a = new long[n];
            if (n > 0) a[0] = 1;
            if (n > 1) a[1] = 2;
            if (n > 2) a[2] = 4;
            if (n > 3) {
                for (int i = 3; i < n; i++) {
                    a[i] = a[i - 1] + a[i - 2] + a[i - 3];
                }
            }
            return a;
        }
    
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            int n = scanner.nextInt();
    
            // 读入n个字符串
            String[] strArr = new String[n];
            for (int i = 0; i < n; i++) {
                strArr[i] = scanner.next();
            }
    
            // 对每个字符串进行加密并输出
            for (int i = 0; i < n; i++) {
                int strLength = strArr[i].length();
                long[] a = calculateA(strLength);
                StringBuilder encryptedStr = new StringBuilder();
                for (int j = 0; j < strLength; j++) {
                    encryptedStr.append((char) ((a[j] + strArr[i].charAt(j) - 97) % 26 + 97));
                }
                System.out.println(encryptedStr.toString());
            }
        }
    }
    

#### javaScript

    
    
    const readline = require('readline');
    
    // 计算数组a
    function calculateA(n) {
        const a = new Array(n);
        if (n > 0) a[0] = 1;
        if (n > 1) a[1] = 2;
        if (n > 2) a[2] = 4;
        if (n > 3) {
            for (let i = 3; i < n; i++) {
                a[i] = a[i - 1] + a[i - 2] + a[i - 3];
            }
        }
        return a;
    }
    
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.on('line', (n) => {
      const strArr = [];
      let count = 0;
      rl.on('line', (line) => {
        strArr.push(line.trim());
        count++;
        if (count === n) {
          rl.close();
        }
      });
    
      rl.on('close', () => {
        // 对每个字符串进行加密并输出
           
          // 对每个字符串进行加密并输出
            for (let i = 0; i < n; i++) {
                const strLength = strArr[i].length;
                const a = calculateA(strLength);
                let encryptedStr = '';
                for (let j = 0; j < strLength; j++) {
                    encryptedStr += String.fromCharCode((a[j] + strArr[i].charCodeAt(j) - 97) % 26 + 97);
                }
                console.log(encryptedStr);
            }
        
        process.exit(0);
      });
    });
    
    

#### python

    
    
    def calculateA(n):
        a = [0] * n
        if n > 0:
            a[0] = 1
        if n > 1:
            a[1] = 2
        if n > 2:
            a[2] = 4
        if n > 3:
            for i in range(3, n):
                a[i] = a[i - 1] + a[i - 2] + a[i - 3]
        return a
    
    n = int(input())
    
    strArr = []
    for i in range(n):
        strArr.append(input())
    
    for i in range(n):
        strLength = len(strArr[i])
        a = calculateA(strLength)
        encryptedStr = ""
        for j in range(strLength):
            encryptedStr += chr((a[j] + ord(strArr[i][j]) - 97) % 26 + 97)
        print(encryptedStr)
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

#### 完整用例

##### 用例1

    
    
    1
    xy
    

##### 用例2

    
    
    1
    abc
    

##### 用例3

    
    
    1
    zzz
    

##### 用例4

    
    
    1
    def
    

##### 用例5

    
    
    1
    pqr
    

##### 用例6

    
    
    1
    abcdefghijklmnopqrstuvwxyz
    

##### 用例7

    
    
    1
    aaaaaaaabbbbbbbbcccccccc
    

##### 用例8 极端用例，用来验证代码鲁棒性

    
    
    1
    abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz
    

