## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

实现一种整数编码方法，使得待编码的数字越小，编码后所占用的字节数越小。

编码规则如下:

  1. 编码时7位一组，每个字节的低7位用于存储待编码数字的补码
  2. 字节的最高位表示后续是否还有字节，置1表示后面还有更多的字节，置0表示当前字节为最后一个字节。
  3. 采用小端序编码，低位和低字节放在低地址上。
  4. 编码结果按16进制数的字符格式输出，小写字母需转换为大写字母

​

## 输入描述

输入的为一个字符串表示的非负整数  
待编码的数字取值范围为[0，1<<64 - 1]

## 输出描述

输出一个字符串，表示整数编码的16进制码流

## 示例1

输入

    
    
    0
    

输出

    
    
    00
    

说明

> 输出的16进制字符，不足两位的前面补0，如00、01、02。

## 示例2

输入

    
    
    100
    

输出

    
    
    64
    

说明

>
>     100的二进制表示为0110 0100，只需要一个字节进行编码;
>  
>     字节的最高位置0，剩余7位存储数字100的低7位 (110 0100) ，所以编码后的输出为64。
>  

## 示例3

输入

    
    
    1000
    

输出

    
    
    E807
    

说明

>
>     1000的二进制表示为0011 1110 1000，至少需要两个字节进行编码;
>  
>     第一个字节最高位置1，剩余的7位存储数字1000的第一个低7位 (1101000)，所以第一个字节的二进制为1110 1000，即E8;
>  
>     第二个字节最高位置0，剩余的7位存储数字1000的第二个低7位 (0000111)，所以第一个字节的二进制为0000 0111，即07;
>  
>     采用小端序编码，所以低字节E8输出在前，高字节07输出在后。
>  

## 解题思路

#### 编码规则：

  1. **7位分组** ：

     * 将待编码的数字每7位作为一组。每一组的7位信息用一个字节的低7位来存储。
     * 如果数字需要多个字节进行编码（因为数字较大），则每个字节的最高位用来指示后续是否还有更多字节。如果最高位为1，表示后面还有更多字节；如果为0，表示当前字节是最后一个字节。
  2. **小端序** ：

     * 小端序表示低位字节在前，高位字节在后。编码后的字节顺序按小端序输出，即字节顺序与通常从高位到低位的顺序相反。
  3. **输出格式** ：

     * 最终输出结果为16进制格式的字符串，字母需要大写，并且不足两位的数字要补0，例如 `00`、`01` 等。

#### 示例分析：

##### 示例1：

输入：`0`

  * 二进制表示为：`00000000`
  * 只需要一个字节就能表示，因为最高位为0，所以输出为 `00`。

##### 示例2：

输入：`100`

  * 二进制表示为：`0110 0100`
  * 由于数字小，只需要一个字节存储： 
    * 最高位为0，表示这是最后一个字节。
    * 剩余的7位存储数字100的低7位，即 `110 0100`。
    * 所以编码后为：`64`。

##### 示例3：

输入：`1000`

  * 二进制表示为：`0011 1110 1000`
  * 需要两个字节来存储： 
    * 第一个字节存储数字的低7位，即 `110 1000`。最高位为1，表示后面还有字节，所以第一个字节为 `1110 1000`，即 `E8`。
    * 第二个字节存储数字的高7位（剩下的部分），即 `0000 0111`。最高位为0，表示这是最后一个字节，得到 `07`。
    * 因为是小端序，低字节（`E8`）输出在前，高字节（`07`）输出在后。
    * 最终输出为 `E807`。

### 代码

  1. **输入处理** ： 
     * 将输入数字转换成其二进制表示的字符串形式，存储在 `binaryStr` 中。
  2. **每7位一组进行编码** ： 
     * 为了遵循题目的编码规则，每7位为一组进行编码。循环处理 `binaryStr`，从字符串的末尾开始，每次截取7位进行编码。
     * 在每一轮循环中，计算当前组的二进制字符串 `currentBinaryStr`。如果不足7位，则取剩下的位数（比如最左侧的那一部分）。
  3. **处理字节的最高位** ： 
     * 根据编码规则，字节的最高位用来标记后续是否还有字节。 
       * 如果当前组不是最后一组，设置 `flag` 为 ‘1’，表示后续还有字节；
       * 否则，设置 `flag` 为 ‘0’，表示当前字节是最后一字节。
     * 最高位 `flag` 加上当前的7位二进制数字组合，形成一个8位的二进制字符串。
  4. **将当前字节转换成16进制** ： 
     * 将这一字节的二进制字符串转换成对应的十进制数。
     * 然后将其转换成16进制的字符串形式。
     * 由于编码结果要求每个字节占两位，因此如果转换后的16进制字符串只有一位，则在前面补0。
  5. **大写转换与结果拼接** ： 
     * 将得到的16进制字符串全部转换为大写字母 。

#### 示例流程分析：

##### 输入 `1000`：

  1. 将 `1000` 转换成二进制表示：`1111101000`。
  2. 从右往左，先取低7位：`1101000`，加上标志位1：`11101000`，即为 `E8`。
  3. 剩余部分：`111`，加上标志位0：`00000111`，即为 `07`。
  4. 输出结果按小端序拼接为 `E807`。

## Java

    
    
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            long num = scanner.nextLong();
            // 将待编码数字转换成二进制字符串
            String binaryStr = Long.toBinaryString(num);
            StringBuilder result = new StringBuilder();
    
            // 每7位一组进行编码
            for (int end = binaryStr.length(); end > 0; end -= 7) {
                // 取出当前组需要编码的二进制字符串
                String currentBinaryStr = binaryStr.substring(Math.max(end - 7, 0), end);
                // 判断当前字节是否为最后一个字节，设置最高位
                char flag = (end - 7 > 0) ? '1' : '0';
                // 将当前字节转换成十进制数
                int decimal = Integer.parseInt(flag + currentBinaryStr, 2);
                // 将当前字节的十六进制字符串形式添加到结果中
                String hexStr = Integer.toHexString(decimal);
                // 如果十六进制字符串长度为1，需要在前面补0
                hexStr = (hexStr.length() == 1) ? "0" + hexStr : hexStr;
                // 将小写字母转换为大写字母，并将当前字节的十六进制字符串形式添加到结果中
                result.append(hexStr.toUpperCase());
            }
    
            // 返回编码结果的十六进制字符串形式
            System.out.println( result.toString());
        }
    
    }
    
    
    

## Python

    
    
    num = int(input())
    # 将待编码数字转换成二进制字符串
    binaryStr = bin(num)[2:]
    result = ''
    
    # 每7位一组进行编码
    for end in range(len(binaryStr), 0, -7):
        # 取出当前组需要编码的二进制字符串
        currentBinaryStr = binaryStr[max(end - 7, 0):end]
        # 判断当前字节是否为最后一个字节，设置最高位
        flag = '1' if end - 7 > 0 else '0'
        # 将当前字节转换成十进制数
        decimal = int(flag + currentBinaryStr, 2)
        # 将当前字节的十六进制字符串形式添加到结果中
        hexStr = hex(decimal)[2:].upper()
        # 如果十六进制字符串长度为1，需要在前面补0
        hexStr = '0' + hexStr if len(hexStr) == 1 else hexStr
        # 将当前字节的十六进制字符串形式添加到结果中
        result += hexStr
    
    # 返回编码结果的十六进制字符串形式
    print(result)
    
    

## JavaScript

    
    
    const readline = require("readline");
     
    // 创建readline接口实例
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
     
    // 监听line事件，当输入数据时触发回调函数
    rl.on("line", (line) => {
      // 将输入的非负整数转换为二进制字符串
      const binStr = BigInt(line).toString(2);
     
      // 定义一个数组来存储编码结果
      const ans = [];
      // 从二进制字符串的末尾开始，每七位一组进行编码
      let end = binStr.length;
      while (end - 7 > 0) {
        // 将每一组转换为十六进制字符串，并添加到结果数组中
        ans.push(parseInt("1" + binStr.substring(end - 7, end), 2).toString(16).padStart(2, '0').toUpperCase());
        // 更新末尾位置
        end -= 7;
      }
     
      // 处理最后一组，如果有剩余的位数不足七位，则直接编码
      if (end >= 0) {
        ans.push(parseInt(binStr.substring(0, end), 2).toString(16).padStart(2, '0').toUpperCase());
      }
     
      // 将编码结果数组拼接为一个字符串，并输出
      console.log(ans.join(""));
    });
    
    

## C++

    
    
    #include <iostream>
    #include <string>
    #include <bitset>
    #include <sstream>
    #include <algorithm>
    using namespace std;
    
    int main() {
        long num;
        cin >> num;
        // 将待编码数字转换成二进制字符串
        string binaryStr = bitset<64>(num).to_string();
        size_t start = binaryStr.find_first_not_of('0');
        if (start != string::npos) {
            binaryStr = binaryStr.substr(start);
        } else {
            binaryStr = "0";
        }
        stringstream result;
    
        // 每7位一组进行编码
        for (int end = binaryStr.length(); end > 0; end -= 7) {
            // 取出当前组需要编码的二进制字符串
            string currentBinaryStr = binaryStr.substr(max(end - 7, 0), end - max(end - 7, 0));
            // 判断当前字节是否为最后一个字节，设置最高位
            char flag = (end - 7 > 0) ? '1' : '0';
            // 将当前字节转换成十进制数
            int decimal = stoi(string(1, flag) + currentBinaryStr, nullptr, 2);
            // 将当前字节的十六进制字符串形式添加到结果中
            stringstream hexStr;
            hexStr << hex << decimal;
            // 如果十六进制字符串长度为1，需要在前面补0
            if (hexStr.str().length() == 1) {
                result << "0";
            }
            // 将小写字母转换为大写字母，并将当前字节的十六进制字符串形式添加到结果中
            result << hexStr.str();
        }
    
        string rt = result.str();
        transform(rt.begin(), rt.end(), rt.begin(), ::toupper);
        // 返回编码结果的十六进制字符串形式
        cout <<  rt   << endl;
        return 0;
    }
    
    
    

## C语言

    
    
    #include <stdio.h>
    #include <string.h>
    #include <stdlib.h>
    
    // 辅助函数：将二进制字符串转换为十进制整数
    int binaryStringToDecimal(const char* binaryStr) {
        int decimal = 0;
        while (*binaryStr != '\0') {
            decimal = decimal * 2 + (*binaryStr - '0');
            binaryStr++;
        }
        return decimal;
    }
    
    // 辅助函数：将整数转换为大写的十六进制字符串
    void toHexString(int decimal, char* hexStr) {
        sprintf(hexStr, "%X", decimal); // 使用 %X 转换为大写的16进制
    }
    
    int main() {
        long num;
        scanf("%ld", &num); // 输入一个长整型数
    
        // 将待编码数字转换成二进制字符串
        char binaryStr[65] = {0}; // 64位加一个终止符
        for (int i = 63; i >= 0; i--) {
            binaryStr[63 - i] = (num & (1L << i)) ? '1' : '0';
        }
        binaryStr[64] = '\0';
    
        // 去掉前导的'0'
        char* binaryStart = binaryStr;
        while (*binaryStart == '0' && *(binaryStart + 1) != '\0') {
            binaryStart++;
        }
    
        // 最终结果字符串
        char result[128] = {0}; // 假设最终结果最多是128个字符
        char hexStr[3];         // 存储单个字节的十六进制字符串
    
        // 每7位一组进行编码
        int len = strlen(binaryStart);
        for (int end = len; end > 0; end -= 7) {
            // 取出当前组需要编码的二进制字符串
            int start = (end - 7 > 0) ? end - 7 : 0;
            char currentBinaryStr[8] = {0}; // 存储当前的7位二进制字符串
            strncpy(currentBinaryStr, binaryStart + start, end - start);
            currentBinaryStr[end - start] = '\0';
    
            // 判断当前字节是否为最后一个字节，设置最高位
            char flag = (end - 7 > 0) ? '1' : '0';
            char fullBinaryStr[9] = {0}; // 最高位 + 7位
            sprintf(fullBinaryStr, "%c%s", flag, currentBinaryStr);
    
            // 将当前字节转换成十进制数
            int decimal = binaryStringToDecimal(fullBinaryStr);
    
            // 将当前字节的十六进制字符串形式添加到结果中
            toHexString(decimal, hexStr);
            if (strlen(hexStr) == 1) {
                strcat(result, "0");
            }
            strcat(result, hexStr);
        }
    
        // 输出编码结果的十六进制字符串形式
        printf("%s\n", result);
    
        return 0;
    }
    
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

#### 完整用例

##### 用例1

    
    
    0
    

##### 用例2

    
    
    100
    

##### 用例3

    
    
    1000
    

##### 用例4

    
    
    127
    

##### 用例5

    
    
    128
    

##### 用例6

    
    
    255
    

##### 用例7

    
    
    1000000
    

##### 用例8

    
    
    9876543210
    

##### 用例9

    
    
    9223372036854775807
    

##### 用例10

    
    
    123456789
    

