#### 题目描述

小明玩一个游戏。

系统发1+n张牌，每张牌上有一个整数。

第一张给小明，后n张按照发牌顺序排成连续的一行。

需要小明判断，后n张牌中，是否存在连续的若干张牌，其和可以整除小明手中牌上的数字。

#### 输入描述

输入数据有多组，每组输入数据有两行，输入到文件结尾结束。

第一行有两个整数n和m，空格隔开。m代表发给小明牌上的数字。

第二行有n个数，代表后续发的n张牌上的数字，以空格隔开。

#### 输出描述

对每组输入，如果存在满足条件的连续若干张牌，则输出1;否则，输出0

#### 备注

  * 1 ≤ n ≤ 1000
  * 1 ≤ 牌上的整数 ≤ 400000
  * 输入的组数，不多于1000
  * 用例确保输入都正确，不需要考虑非法情况。

#### 用例

输入| 6 7  
2 12 6 3 5 5  
10 11  
1 1 1 1 1 1 1 1 1 1  
---|---  
输出| 10  
说明|
两组输入。第一组小明牌的数字为7，再发了6张牌。第1、2两张牌教字和为14，可以整除7，输出1，第二组小明牌的教字为11，再发了10张牌，这10张牌数字和为10，无法整除11，输出0。  
  
#### 解题思路

总体思路是使用累加和的余数来判断是否存在连续的若干张牌和可以整除m。通过遍历后续发的牌的数字，累加到`sum`中，并计算当前和的余数。如果之前已经存在相同的余数，说明存在连续的若干张牌和可以整除m，将`found`标记为`true`。最后根据`found`的值输出1或0，表示是否存在满足条件的连续若干张牌。

  1. 首先，逐行读取输入数据。
  2. 对于每组输入数据，第一行包含两个整数n和m，分别表示牌的数量和小明手中牌上的数字。
  3. 第二行包含n个数，表示后续发的n张牌上的数字。
  4. 创建一个长度为m的布尔数组`remainderExists`，用于记录余数的出现情况。初始时，所有元素都设置为`false`。
  5. 初始化变量`sum`为0，用于累加牌的数字的和。
  6. 初始化变量`found`为`false`，表示是否找到满足条件的连续若干张牌。
  7. 遍历后续发的n张牌的数字：  
a. 将当前牌的数字累加到`sum`中。  
b. 计算当前和的余数，即`remainder = sum % m`。  
c.
如果之前已经存在相同的余数（即`remainderExists[remainder]`为`true`），说明存在连续的若干张牌和可以整除m，将`found`标记为`true`，并跳出循环。  
d. 否则，将当前余数标记为已存在，即`remainderExists[remainder] = true`。

  8. 根据`found`的值输出1或0，表示是否存在满足条件的连续若干张牌。
  9. 重置`isFirstLine`为`true`，以准备读取下一组输入。

#### C++

    
    
    #include <iostream>
    #include <sstream>
    #include <vector>
    
    int main() {
        std::string line;
        while (std::getline(std::cin, line)) {
            std::istringstream iss(line);
    
            // 读取输入的n和m，n代表牌的数量，m代表小明手中牌上的数字
            int n, m;
            iss >> n >> m;
    
            // 读取后续发的n张牌的数字
            std::vector<int> cardNumbers(n);
            std::getline(std::cin, line);
            iss.str(line);
            iss.clear();
            for (int i = 0; i < n; i++) {
                iss >> cardNumbers[i];
            }
    
            // 使用bool数组来记录余数的出现情况
            std::vector<bool> remainderExists(m, false);
    
            int sum = 0;
            bool found = false;
            for (int cardNumber : cardNumbers) {
                sum += cardNumber; // 将当前牌的数字累加到sum中
                int remainder = sum % m; // 计算当前和的余数
                if (remainderExists[remainder]) { // 如果之前已经存在相同的余数，说明存在连续的若干张牌和可以整除m
                    found = true;
                    break;
                } else {
                    remainderExists[remainder] = true; // 将当前余数标记为已存在
                }
            }
    
            std::cout << (found ? 1 : 0) << std::endl;
        }
    
        return 0;
    }
    
    

#### 完整用例

##### 用例1

    
    
    6 7
    2 12 6 3 5 5
    10 11
    1 1 1 1 1 1 1 1 1 1
    

##### 用例2

    
    
    4 5
    2 3 5 7
    

##### 用例3

    
    
    6 7
    2 12 6 3 5 5
    

##### 用例4

    
    
    10 11
    1 1 1 1 1 1 1 1 1 1
    

##### 用例5

    
    
    5 10
    5 5 5 5 5
    

##### 用例6

    
    
    3 6
    4 5 6
    

##### 用例7

    
    
    4 8
    2 4 6 8
    

##### 用例8

    
    
    5 9
    1 2 3 4 5
    

##### 用例9

    
    
    7 14
    2 4 6 8 10 12 14
    

##### 用例10

    
    
    6 12
    2 4 6 8 10 12
    

#### 文章目录

  *     *       * 题目描述
      * 输入描述
      * 输出描述
      * 备注
      * 用例
      * 解题思路
      * C++
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
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

