## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

存在一种虚拟IPv4地址，由4小节组成，每节的范围为0~255，以#号间隔，虚拟IPv4地址可以转换为一个32位的整数，例如：

  * 128#0#255#255，转换为32位整数的结果为2147549183（0x8000FFFF）

  * 1#0#0#0，转换为32位整数的结果为16777216（0x01000000）

现以字符串形式给出一个虚拟IPv4地址，限制第1小节的范围为1128，即每一节范围分别为(1128)#(0255)#(0255)#(0~255)，要求每个IPv4地址只能对应到唯一的整数上。如果是非法IPv4，返回invalid
IP

## 输入描述

输入一行，虚拟IPv4地址格式字符串

## 输出描述

输出一行，按照要求输出整型或者特定字符

## 示例1

输入

    
    
    100#101#1#5
    

输出

    
    
    1684340997
    

说明

> ## 示例2

输入

    
    
    1#2#3
    

输出

    
    
    invalid IP
    

说明

> ## 解题思路

虚拟IPv4地址由四个小节组成，每个小节用`#`号分隔。在这个虚拟版本中用`#`替代。每个小节代表一个整数，范围从0到255，但题目中特别指出第一小节的范围应为1到128。地址的正确形式应该是四部分，例如
`1#2#3#4`。如果格式不正确或数值不在指定范围内，则视为非法IPv4，输出“invalid IP”。

## 解题注意事项

  1. **异常处理** ：

     * 确保输入的每一部分（小节）都是数字。
     * 确保没有空的小节，例如`1##3#4`。
     * 处理任何非数字字符，例如`a#b#c#d`。
     * 检查是否每个部分都严格为数字，并且没有前导零（除了单独的0），例如`01#01#01#01`应被视为非法。
  2. **范围验证** ：

     * 第一小节必须在1到128之间。
     * 其余三小节必须在0到255之间。
     * 任何超出这些范围的值都应该导致输出“invalid IP”。
  3. **格式正确性** ：

     * 确保地址严格由四个数字小节组成，多于或少于四部分都应视为无效。

### 备注

下面代码有些判断条件可以合并，为了看的更清晰，没有合并

## Java

    
    
    import java.util.Scanner;
    
    public class Main {
      public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine();
        String[] ipSections = input.split("#"); // 将输入的字符串按照"#"分割成4个小节
        
        if (ipSections.length != 4) { // 如果分割后的小节数量不等于4，则说明输入的IPv4地址格式不正确
          System.out.println("invalid IP");
          return; // 结束程序
        }
    
        for (String section : ipSections) {
          if (!isNumeric(section)) { // 检查是否每部分都是数字
            System.out.println("invalid IP");
            return; // 结束程序
          }
           if (section.length() == 0) { // 检查是否有空字符
            System.out.println("invalid IP");
            return; // 结束程序
          }
    
                
          // 检查前导零的情况
          if (section.length() > 1 && section.charAt(0) == '0') {
            System.out.println("invalid IP");
            return; // 结束程序
          }
        }
        
        int firstSection = Integer.parseInt(ipSections[0]); // 将第一个小节转换为整数
        if (firstSection < 1 || firstSection > 128) { // 如果第一个小节的值不在1~128的范围内，则说明输入的IPv4地址格式不正确
          System.out.println("invalid IP");
          return; // 结束程序
        }
        
        for (int i = 1; i < 4; i++) { // 遍历后面的3个小节
          int sectionValue = Integer.parseInt(ipSections[i]); // 将当前小节转换为整数
          if (sectionValue < 0 || sectionValue > 255) { // 如果当前小节的值不在0~255的范围内，则说明输入的IPv4地址格式不正确
            System.out.println("invalid IP");
            return; // 结束程序
          }
        }
        
        long ipValue = 0; // 用于计算32位整数值
        for (int i = 0; i < 4; i++) {
          ipValue = ipValue * 256 + Integer.parseInt(ipSections[i]); // 每个小节对应一个字节，计算最终的整数值
        }
        
        System.out.println(ipValue); // 输出最终计算得到的32位整数
      }
    
      // 判断字符串是否为数字
      public static boolean isNumeric(String str) {
        for (int i = 0; i < str.length(); i++) {
          if (!Character.isDigit(str.charAt(i))) {
            return false; // 如果有非数字字符则返回false
          }
        }
        return true; // 全部为数字则返回true
      }
    }
    

## Python

    
    
    # 判断字符串是否为数字
    def is_numeric(s):
        return s.isdigit()
    
    # 获取输入的字符串
    input_str = input()
    
    # 将输入的字符串按照"#"分割成4个小节
    ip_sections = input_str.split("#")
    
    # 如果分割后的小节数量不等于4，则说明输入的IPv4地址格式不正确
    if len(ip_sections) != 4:
        print("invalid IP")
    else:
        valid = True
        # 遍历每个部分进行检查
        for section in ip_sections:
            if len(section) == 0 or not is_numeric(section):  # 检查是否为空或者是否每部分都是数字
                valid = False
                break
            if len(section) > 1 and section[0] == '0':  # 检查前导零的情况
                valid = False
                break
        
        if not valid:
            print("invalid IP")
        else:
            # 检查第一个小节的范围
            first_section = int(ip_sections[0])  # 将第一个小节转换为整数
            if first_section < 1 or first_section > 128:  # 如果第一个小节的值不在1~128的范围内
                print("invalid IP")
            else:
                # 检查其余3个小节的范围
                for i in range(1, 4):
                    section_value = int(ip_sections[i])  # 将当前小节转换为整数
                    if section_value < 0 or section_value > 255:  # 如果不在0~255范围内
                        print("invalid IP")
                        break
                else:
                    # 计算最终的32位整数
                    ip_value = 0
                    for i in range(4):
                        ip_value = ip_value * 256 + int(ip_sections[i])  # 每个小节对应一个字节，计算最终的整数值
                    print(ip_value)  # 输出最终的32位整数
    

## JavaScript

    
    
    const readline = require('readline');
    
    // 判断字符串是否为数字
    function isNumeric(str) {
      for (let i = 0; i < str.length; i++) {
        if (!/\d/.test(str[i])) {
          return false; // 如果有非数字字符则返回false
        }
      }
      return true; // 全部为数字则返回true
    }
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.on('line', function (input) {
      const ipSections = input.split('#'); // 将输入的字符串按照"#"分割成4个小节
    
      if (ipSections.length !== 4) { // 如果分割后的小节数量不等于4，则说明输入的IPv4地址格式不正确
        console.log("invalid IP");
        rl.close();
        return;
      }
    
      // 遍历每个部分进行检查
      for (const section of ipSections) {
        if (section.length === 0 || !isNumeric(section)) { // 检查是否为空或者是否每部分都是数字
          console.log("invalid IP");
          rl.close();
          return;
        }
    
        // 检查前导零的情况
        if (section.length > 1 && section[0] === '0') {
          console.log("invalid IP");
          rl.close();
          return;
        }
      }
    
      const firstSection = parseInt(ipSections[0], 10); // 将第一个小节转换为整数
      if (firstSection < 1 || firstSection > 128) { // 如果第一个小节的值不在1~128的范围内
        console.log("invalid IP");
        rl.close();
        return;
      }
    
      // 检查其余3个小节的范围
      for (let i = 1; i < 4; i++) {
        const sectionValue = parseInt(ipSections[i], 10); // 将当前小节转换为整数
        if (sectionValue < 0 || sectionValue > 255) { // 如果不在0~255范围内
          console.log("invalid IP");
          rl.close();
          return;
        }
      }
    
      // 计算最终的32位整数
      let ipValue = 0;
      for (let i = 0; i < 4; i++) {
        ipValue = ipValue * 256 + parseInt(ipSections[i], 10); // 每个小节对应一个字节，计算最终的整数值
      }
    
      console.log(ipValue); // 输出最终的32位整数
      rl.close();
    });
    

## C++

    
    
    #include <iostream>
    #include <sstream>
    #include <vector>
    
    using namespace std;
    
    // 判断字符串是否为数字
    bool isNumeric(const string& str) {
        for (char c : str) {
            if (!isdigit(c)) {
                return false; // 如果有非数字字符则返回false
            }
        }
        return true; // 全部为数字则返回true
    }
    
    int main() {
        string input;
        getline(cin, input); // 获取输入的字符串
    
        // 将输入的字符串按照"#"分割成4个小节
        stringstream ss(input);
        vector<string> ipSections;
        string section;
        while (getline(ss, section, '#')) {
            ipSections.push_back(section);
        }
    
        if (ipSections.size() != 4) { // 如果分割后的小节数量不等于4，则说明输入的IPv4地址格式不正确
            cout << "invalid IP" << endl;
            return 0; // 结束程序
        }
    
        // 遍历每个部分进行检查
        for (const string& section : ipSections) {
            if (section.empty() || !isNumeric(section)) { // 检查是否为空或者是否每部分都是数字
                cout << "invalid IP" << endl;
                return 0; // 结束程序
            }
    
            // 检查前导零的情况
            if (section.length() > 1 && section[0] == '0') {
                cout << "invalid IP" << endl;
                return 0; // 结束程序
            }
        }
    
        // 检查第一个小节的范围
        int firstSection = stoi(ipSections[0]); // 将第一个小节转换为整数
        if (firstSection < 1 || firstSection > 128) { // 如果第一个小节的值不在1~128的范围内
            cout << "invalid IP" << endl;
            return 0; // 结束程序
        }
    
        // 检查其余3个小节的范围
        for (int i = 1; i < 4; i++) {
            int sectionValue = stoi(ipSections[i]); // 将当前小节转换为整数
            if (sectionValue < 0 || sectionValue > 255) { // 如果不在0~255范围内
                cout << "invalid IP" << endl;
                return 0; // 结束程序
            }
        }
    
        // 计算最终的32位整数
        long ipValue = 0;
        for (int i = 0; i < 4; i++) {
            ipValue = ipValue * 256 + stoi(ipSections[i]); // 每个小节对应一个字节，计算最终的整数值
        }
    
        cout << ipValue << endl; // 输出最终的32位整数
        return 0;
    }
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    #include <string.h>
    #include <ctype.h>
    
    // 判断字符串是否为数字
    int is_numeric(const char* str) {
        for (int i = 0; str[i] != '\0'; i++) {
            if (!isdigit(str[i])) {
                return 0; // 如果有非数字字符则返回0
            }
        }
        return 1; // 全部为数字则返回1
    }
    
    int main() {
        char input[256];
        fgets(input, sizeof(input), stdin); // 获取输入的字符串
    
        char* ipSections[4];
        char* token = strtok(input, "#"); // 将输入的字符串按照"#"分割成4个小节
        int sectionCount = 0;
    
        while (token != NULL && sectionCount < 4) {
            ipSections[sectionCount++] = token;
            token = strtok(NULL, "#");
        }
    
        if (sectionCount != 4) { // 如果分割后的小节数量不等于4
            printf("invalid IP\n");
            return 0; // 结束程序
        }
    
        // 遍历每个部分进行检查
        for (int i = 0; i < 4; i++) {
            char* section = ipSections[i];
    
            // 去除末尾换行符
            section[strcspn(section, "\n")] = '\0';
    
            if (strlen(section) == 0 || !is_numeric(section)) { // 检查是否为空或者是否每部分都是数字
                printf("invalid IP\n");
                return 0; // 结束程序
            }
    
            // 检查前导零的情况
            if (strlen(section) > 1 && section[0] == '0') {
                printf("invalid IP\n");
                return 0; // 结束程序
            }
        }
    
        // 检查第一个小节的范围
        int firstSection = atoi(ipSections[0]); // 将第一个小节转换为整数
        if (firstSection < 1 || firstSection > 128) { // 如果第一个小节的值不在1~128的范围内
            printf("invalid IP\n");
            return 0; // 结束程序
        }
    
        // 检查其余3个小节的范围
        for (int i = 1; i < 4; i++) {
            int sectionValue = atoi(ipSections[i]); // 将当前小节转换为整数
            if (sectionValue < 0 || sectionValue > 255) { // 如果不在0~255范围内
                printf("invalid IP\n");
                return 0; // 结束程序
            }
        }
    
        // 计算最终的32位整数
        long ipValue = 0;
        for (int i = 0; i < 4; i++) {
            ipValue = ipValue * 256 + atoi(ipSections[i]); // 每个小节对应一个字节，计算最终的整数值
        }
    
        printf("%ld\n", ipValue); // 输出最终的32位整数
        return 0;
    }
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/d40a8149a8aaf5d305203324ee620f66.png)

## 完整用例

### 1

    
    
    100#101#1#5
    

### 2

    
    
    128#128#128#128
    

### 3

    
    
    1#1#1#256
    

### 4

    
    
    1#1#1#0
    

### 5

    
    
    1#1#1#16777215
    

### 6

    
    
    1#1#256#1
    

### 7

    
    
    10#20#30#40
    

### 8

    
    
    1#2#3
    

### 9

    
    
    128#0#0#255
    

### 10

    
    
    1.2.3.4
    

