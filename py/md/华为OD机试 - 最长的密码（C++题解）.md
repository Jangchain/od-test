## 题目描述

小王在进行游戏大闯关，有一个关卡需要输入一个密码才能通过，密码获得的条件如下：

在一个密码本中，每一页都有一个由26个小写字母组成的若干位密码，每一页的密码不同，需要从这个密码本中寻找这样一个最长的密码，

从它的末尾开始依次去掉一位得到的新密码也在密码本中存在。

请输出符合要求的密码，如果有多个符合要求的密码，则返回**字典序最大** 的密码。

若没有符合要求的密码，则返回**空字符串** 。

## 输入描述

密码本由一个字符串数组组成，不同元素之间使用空格隔开，每一个元素代表密码本每一页的密码。

## 输出描述

一个字符串

## 用例

输入| h he hel hell hello  
---|---  
输出| hello  
说明| 无  
输入| b ereddred bw bww bwwl bwwlm bwwln  
---|---  
输出| bwwln  
说明| 无  
  
## 题目解析

与[【华为OD机试 2023】真正的密码（C++ Java JavaScript
Python）](https://blog.csdn.net/banxia_frontend/article/details/129349940)类似

## 解题思路

这个问题的解题思路可以分为以下几个步骤：

  1. **输入处理** ：首先，从输入中读取密码本，并将其分割为一个字符串列表。这个列表包含了密码本中的所有密码。

  2. **遍历密码本** ：接下来，遍历密码本中的每个密码。对于每个密码，我们需要检查它是否满足题目中的条件。

  3. **检查密码是否有效** ：为了检查一个密码是否有效，我们需要从它的末尾开始，依次去掉一位，得到一个新的密码。然后，我们需要检查这个新密码是否在密码本中存在。如果所有这些新密码都在密码本中存在，那么这个密码就是有效的。否则，这个密码是无效的。

为了实现这个检查过程，我们可以使用一个循环，从密码的末尾开始，依次去掉一位。在每次循环中，我们检查新密码是否在密码本中。如果发现新密码不在密码本中，我们可以将一个布尔变量（例如
`is_valid`）设置为 `False`，并跳出循环。这样，循环结束后，`is_valid` 变量的值就表示当前密码是否有效。

  4. **收集有效密码** ：在遍历密码本的过程中，每当我们发现一个有效的密码，就将其添加到一个新的列表（例如 `valid_passwords`）中。这个列表用于存储所有有效的密码。

  5. **排序有效密码** ：遍历密码本并收集有效密码之后，我们需要对 `valid_passwords` 列表进行排序。题目要求返回字典序最大的密码，所以我们需要对列表进行降序排序。这样，字典序最大的密码就会排在列表的第一个位置。

  6. **输出结果** ：最后，我们需要输出结果。如果 `valid_passwords` 列表非空，说明至少有一个有效的密码。此时，我们可以输出列表中的第一个密码，即字典序最大的密码。如果列表为空，说明没有符合条件的密码，此时我们需要输出空字符串。

## C++

    
    
    #include <iostream>
    #include <vector>
    #include <algorithm>
    using namespace std;
    
    int main() {
        string input;
        getline(cin, input);
        
        // 读取输入的密码本
        vector<string> passwordList;
        size_t pos = 0;
        string delimiter = " ";
        while ((pos = input.find(delimiter)) != string::npos) {
            string password = input.substr(0, pos);
            passwordList.push_back(password);
            input.erase(0, pos + delimiter.length());
        }
        passwordList.push_back(input);
    
        // 创建一个列表来存储符合条件的密码
        vector<string> validPasswords;
        
        // 遍历密码本中的每个密码
        for (string password : passwordList) {
            
            // 假设当前密码是有效的
            bool isValid = true;
            
            // 从密码的末尾开始逐位去掉，判断新密码是否在密码本中存在
            for (int i = password.length() - 1; i > 0; i--) {
                // 如果新密码不在密码本中存在，则当前密码不符合条件，退出循环
                if (find(passwordList.begin(), passwordList.end(), password.substr(0, i)) == passwordList.end()) {
                    isValid = false;
                    break;
                }
            }
            
            // 如果当前密码符合条件，则将其添加到有效密码列表中
            if (isValid) {
                validPasswords.push_back(password);
            }
        }
    
        // 对有效密码列表进行字典序降序排序
        sort(validPasswords.begin(), validPasswords.end(), greater<string>());
    
        // 输出符合条件的密码列表中的第一个密码，如果列表为空，则输出空字符串
        cout << (validPasswords.size() != 0 ? validPasswords[0] : "") << endl;
    
        return 0;
    }
    
    

#### 文章目录

  * 题目描述
  * 输入描述
  * 输出描述
  * 用例
  * 题目解析
  * 解题思路
  * C++

![fengmian](https://img-
blog.csdnimg.cn/img_convert/1d2f33ed8cf2fb1b9a4fe09513f7aa94.png)

