## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

给定一个由多个命令字组成的命令字符串：

1、字符串长度小于等于127字节，只包含大小写字母，数字，下划线和偶数个双引号；  
2、命令字之间以一个或多个下划线`_`进行分割；  
3、可以通过两个双引号`””`来标识包含下划线`_`的命令字或空命令字（仅包含两个双引号的命令字），双引号不会在命令字内部出现；

请对指定索引的敏感字段进行加密，替换为`******`（6个*），并删除命令字前后多余的下划线`_`。

如果无法找到指定索引的命令字，输出字符串ERROR。

## 输入描述

输入为两行，第一行为命令字索引K（从0开始），第二行为命令字符串S。

## 输出描述

输出处理后的命令字符串，如果无法找到指定索引的命令字，输出字符串ERROR

## 示例1

输入

    
    
    1
    password__a12345678_timeout_100
    

输出

    
    
    password_******_timeout_100
    

说明

> ## 示例2

输入

    
    
    2
    aaa_password_"a12_45678"_timeout__100_""_
    

输出

    
    
    aaa_password_******_timeout_100_""
    

说明

> ## 解题思路

### 题意

就是查找替换的事！

**题目要求** ：

  * 读取输入中的命令字索引 `K`（从0开始计数）和命令字符串 `S`。
  * 查找命令字符串 `S` 中第 `K` 个命令字，将其替换为 `******`（6个 `*`）。
  * 去除处理后字符串中每个命令字前后的多余下划线 `_`。
  * 如果找不到指定索引的命令字，则输出字符串 `"ERROR"`。

### 示例解释

##### 示例1

输入：

    
    
    1
    password__a12345678_timeout_100
    

输出：

    
    
    password_******_timeout_100
    

解释：

  * 第 `1` 个命令字是 `a12345678`，用 `******` 替换。
  * 处理后字符串为 `password_******_timeout_100`。

##### 示例2

输入：

    
    
    2
    aaa_password_"a12_45678"_timeout__100_""_
    

输出：

    
    
    aaa_password_******_timeout_100_""
    

解释：

  * 第 `2` 个命令字是 `"a12_45678"`，用 `******` 替换。
  * 删除处理后的字符串中每个命令字前后的多余下划线 `_`。
  * 结果为 `aaa_password_******_timeout_100_""`。

### 思路

  1. **初始化变量：**

     * 定义一个空字符串 `command` 来存储当前正在解析的命令字。
     * 定义一个列表 `commandList` 来存储解析后的命令字列表。
  2. **遍历字符数组并处理每个字符：**

     * **a.** 如果当前字符是双引号且 `command` 中已经包含一个双引号： 
       * 将双引号添加到 `command` 中。
       * 将解析完毕的命令字添加到 `commandList` 中，然后重置 `command`。
     * **b.** 如果 `command` 不包含双引号且当前字符是下划线： 
       * 检查 `command` 是否为空，如果不为空： 
         * 将解析完毕的命令字添加到 `commandList` 中，然后重置 `command`。
     * **c.** 如果已经到达字符串末尾： 
       * 将当前字符添加到 `command` 中。
       * 将解析完毕的命令字添加到 `commandList` 中，然后重置 `command`。
     * **d.** 否则，将当前字符添加到 `command` 中。
  3. **检查命令字索引`K` 是否超出范围：**

     * 如果超出范围，输出 `"ERROR"`。
  4. **否则：**

     * 将指定索引的命令字替换为 `"******"`，并构建结果字符串。

## Java

    
    
    import java.util.*;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            int index = Integer.parseInt(scanner.nextLine()); // 输入命令字索引K
            String input = scanner.nextLine(); // 输入命令字符串S
            char[] charArray = input.toCharArray(); // 将命令字符串转换为字符数组
            String command = ""; // 当前正在解析的命令字
            List<String> commandList = new ArrayList<>(); // 存储解析后的命令字列表
    
            for (int i = 0; i < charArray.length; i++) {
                char ch = charArray[i];
    
                if (ch == '"' && command.contains(ch + "")) { // 如果当前字符为双引号且命令字中已经包含了一个双引号
                    command += '"'; // 将双引号添加到命令字中
                    commandList.add(command); // 将解析完毕的命令字添加到命令字列表中
                    command = ""; // 重置命令字
                } else if (!command.contains("\"") && ch == '_') { // 如果命令字不包含双引号且当前字符为下划线
                    if (!command.isEmpty()) { // 如果命令字不为空
                        commandList.add(command); // 将解析完毕的命令字添加到命令字列表中
                        command = ""; // 重置命令字
                    }
                } else if (i == charArray.length - 1) { // 如果已经到达字符串末尾
                    command += ch; // 将当前字符添加到命令字中
                    commandList.add(command); // 将解析完毕的命令字添加到命令字列表中
                    command = ""; // 重置命令字
                } else {
                    command += ch; // 将当前字符添加到命令字中
                }
            }
    
            if (index < 0 || index > commandList.size() - 1) { // 如果命令字索引超出范围
                System.out.println("ERROR");
            } else {
                commandList.set(index, "******"); // 将指定索引的命令字替换为******
                StringBuilder result = new StringBuilder();
    
                for (String item : commandList) {
                    result.append("_").append(item); // 在命令字之前添加下划线
                }
    
                result.deleteCharAt(0); // 删除第一个下划线
                System.out.println(result.toString());
            }
        }
    }
    
    

## Python

    
    
    import sys
    
    index = int(input()) # 输入命令字索引K
    input = input() # 输入命令字符串S
    charArray = list(input) # 将命令字符串转换为字符数组
    command = "" # 当前正在解析的命令字
    commandList = [] # 存储解析后的命令字列表
    
    for i in range(len(charArray)):
        ch = charArray[i]
    
        if ch == '"' and ch in command: # 如果当前字符为双引号且命令字中已经包含了一个双引号
            command += '"' # 将双引号添加到命令字中
            commandList.append(command) # 将解析完毕的命令字添加到命令字列表中
            command = "" # 重置命令字
        elif '"' not in command and ch == '_': # 如果命令字不包含双引号且当前字符为下划线
            if command: # 如果命令字不为空
                commandList.append(command) # 将解析完毕的命令字添加到命令字列表中
                command = "" # 重置命令字
        elif i == len(charArray) - 1: # 如果已经到达字符串末尾
            command += ch # 将当前字符添加到命令字中
            commandList.append(command) # 将解析完毕的命令字添加到命令字列表中
            command = "" # 重置命令字
        else:
            command += ch # 将当前字符添加到命令字中
    
    if index < 0 or index > len(commandList) - 1: # 如果命令字索引超出范围
        print("ERROR")
    else:
        commandList[index] = "******" # 将指定索引的命令字替换为******
        result = []
    
        for item in commandList:
            result.append("_" + item) # 在命令字之前添加下划线
    
        result = "".join(result)
        result = result[1:] # 删除第一个下划线
        print(result)
    
    

## JavaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.on('line', (index) => {
        rl.on('line', (input) => {
            const charArray = input.split(''); // 将命令字符串转换为字符数组
            let command = ""; // 当前正在解析的命令字
            let commandList = []; // 存储解析后的命令字列表
    
            for (let i = 0; i < charArray.length; i++) {
                const ch = charArray[i];
    
                if (ch === '"' && command.includes(ch)) { // 如果当前字符为双引号且命令字中已经包含了一个双引号
                    command += '"'; // 将双引号添加到命令字中
                    commandList.push(command); // 将解析完毕的命令字添加到命令字列表中
                    command = ""; // 重置命令字
                } else if (!command.includes('"') && ch === '_') { // 如果命令字不包含双引号且当前字符为下划线
                    if (command !== "") { // 如果命令字不为空
                        commandList.push(command); // 将解析完毕的命令字添加到命令字列表中
                        command = ""; // 重置命令字
                    }
                } else if (i === charArray.length - 1) { // 如果已经到达字符串末尾
                    command += ch; // 将当前字符添加到命令字中
                    commandList.push(command); // 将解析完毕的命令字添加到命令字列表中
                    command = ""; // 重置命令字
                } else {
                    command += ch; // 将当前字符添加到命令字中
                }
            }
    
            if (index < 0 || index > commandList.length - 1) { // 如果命令字索引超出范围
                console.log("ERROR");
            } else {
                commandList[index] = "******"; // 将指定索引的命令字替换为******
                let result = "";
    
                for (let i = 0; i < commandList.length; i++) {
                    result += "_" + commandList[i]; // 在命令字之前添加下划线
                }
    
                result = result.substring(1); // 删除第一个下划线
                console.log(result);
            }
    
            rl.close();
        });
    });
    
    

## C++

    
    
    #include <iostream>
    #include <vector>
    using namespace std;
    
    int main() {
        int index;
        cin >> index; // 输入命令字索引K
        string input;
        cin >> input; // 输入命令字符串S
        vector<char> charArray(input.begin(), input.end()); // 将命令字符串转换为字符数组
        string command = ""; // 当前正在解析的命令字
        vector<string> commandList; // 存储解析后的命令字列表
    
        for (int i = 0; i < charArray.size(); i++) {
            char ch = charArray[i];
    
            if (ch == '"' && command.find(ch) != string::npos) { // 如果当前字符为双引号且命令字中已经包含了一个双引号
                command += '"'; // 将双引号添加到命令字中
                commandList.push_back(command); // 将解析完毕的命令字添加到命令字列表中
                command = ""; // 重置命令字
            } else if (command.find('"') == string::npos && ch == '_') { // 如果命令字不包含双引号且当前字符为下划线
                if (!command.empty()) { // 如果命令字不为空
                    commandList.push_back(command); // 将解析完毕的命令字添加到命令字列表中
                    command = ""; // 重置命令字
                }
            } else if (i == charArray.size() - 1) { // 如果已经到达字符串末尾
                command += ch; // 将当前字符添加到命令字中
                commandList.push_back(command); // 将解析完毕的命令字添加到命令字列表中
                command = ""; // 重置命令字
            } else {
                command += ch; // 将当前字符添加到命令字中
            }
        }
    
        if (index < 0 || index > commandList.size() - 1) { // 如果命令字索引超出范围
            cout << "ERROR" << endl;
        } else {
            commandList[index] = "******"; // 将指定索引的命令字替换为******
            string result = "";
    
            for (string item : commandList) {
                result += "_" + item; // 在命令字之前添加下划线
            }
    
            result = result.substr(1); // 删除第一个下划线
            cout << result << endl;
        }
    
        return 0;
    }
    
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    #include <string.h>
    
    // 定义一个宏，用于最大字符串长度
    #define MAX_LEN 128
    
    // 定义一个函数来分割命令字符串
    void split_command(char *input, char commandList[][MAX_LEN], int *commandCount) {
        char command[MAX_LEN] = ""; // 当前正在解析的命令字
        int j = 0; // 用于记录命令字的字符位置
    
        for (int i = 0; i < strlen(input); i++) {
            char ch = input[i];
    
            // 如果当前字符为双引号且命令字中已经包含了一个双引号
            if (ch == '"' && strchr(command, '"') != NULL) {
                command[j++] = '"'; // 将双引号添加到命令字中
                command[j] = '\0'; // 结束当前命令字字符串
                strcpy(commandList[*commandCount], command); // 将命令字存储到命令列表中
                (*commandCount)++; // 增加命令字计数
                j = 0; // 重置命令字的字符位置
                command[0] = '\0'; // 重置命令字
            }
            // 如果命令字不包含双引号且当前字符为下划线
            else if (strchr(command, '"') == NULL && ch == '_') {
                if (j > 0) { // 如果命令字不为空
                    command[j] = '\0'; // 结束当前命令字字符串
                    strcpy(commandList[*commandCount], command); // 将命令字存储到命令列表中
                    (*commandCount)++; // 增加命令字计数
                    j = 0; // 重置命令字的字符位置
                    command[0] = '\0'; // 重置命令字
                }
            }
            // 如果已经到达字符串末尾
            else if (i == strlen(input) - 1) {
                command[j++] = ch; // 将当前字符添加到命令字中
                command[j] = '\0'; // 结束当前命令字字符串
                strcpy(commandList[*commandCount], command); // 将命令字存储到命令列表中
                (*commandCount)++; // 增加命令字计数
            }
            // 其他情况下，将当前字符添加到命令字中
            else {
                command[j++] = ch;
            }
        }
    }
    
    int main() {
        int index;
        char input[MAX_LEN];
        char commandList[MAX_LEN][MAX_LEN]; // 存储解析后的命令字列表
        int commandCount = 0; // 记录解析到的命令字数
    
        // 输入命令字索引K
        scanf("%d", &index);
        // 输入命令字符串S
        scanf("%s", input);
    
        // 将命令字符串转换为命令列表
        split_command(input, commandList, &commandCount);
    
        // 如果命令字索引超出范围
        if (index < 0 || index >= commandCount) {
            printf("ERROR\n");
        } else {
            // 将指定索引的命令字替换为******
            strcpy(commandList[index], "******");
            
            // 构建结果字符串
            for (int i = 0; i < commandCount; i++) {
                if (i > 0) {
                    printf("_"); // 在命令字之间添加下划线
                }
                printf("%s", commandList[i]); // 输出命令字
            }
            printf("\n");
        }
    
        return 0;
    }
    

![fengmian](https://i-blog.csdnimg.cn/blog_migrate/5939025e75b8807d509cbdd3ccf33d14.png)

#### 完整用例

##### 1

    
    
    2
    a_b_"c_d"_"e_f"_"g_h_i_j_k_l_m_n_o_p_q_r_s_t_u_v_w_x_y_z"_"A_B_C_D_E_F_G_H_I_J_K_L_M_N_O_P_Q_R_S_T_U_V_W_X_Y_Z"_a_b_"c_d"_"e_f"_"g_h_i_j_k_l_m_n_o_p_q_r_s_t_u_v_w_x_y_z"_"A_B_C_D_E_F_G_H_I_J_K_L_M_N_O_P_Q_R_S_T_U_V_W_X_Y_Z"
    

##### 2

    
    
    1
    a_b_"c_d"_"e_f"_"g_h_i_j_k_l_m_n_o_p_q_r_s_t_u_v_w_x_y_z"_"A_B_C_D_E_F_G_H_I_J_K_L_M_N_O_P_Q_R_S_T_U_V_W_X_Y_Z"_a_b_"c_d"_"e_f"_"g_h_i_j_k_l_m_n_o_p_q_r_s_t_u_v_w_x_y_z"_"A_B_C_D_E_F_G_H_I_J_K_L_M_N_O_P_Q_R_S_T_U_V_W_X_Y_Z"
    

##### 3

    
    
    0
    a_b_"c_d"_"e_f"_"g_h_i_j_k_l_m_n_o_p_q_r_s_t_u_v_w_x_y_z"_"A_B_C_D_E_F_G_H_I_J_K_L_M_N_O_P_Q_R_S_T_U_V_W_X_Y_Z"_a_b_"c_d"_"e_f"_"g_h_i_j_k_l_m_n_o_p_q_r_s_t_u_v_w_x_y_z"_"A_B_C_D_E_F_G_H_I_J_K_L_M_N_O_P_Q_R_S_T_U_V_W_X_Y_Z"
    

##### 4

    
    
    2
    a_b_"c_d"_"e_f"_"g_h_i_j_k_l_m_n_o_p_q_r_s_t_u_v_w_x_y_z"_"A_B_C_D_E_F_G_H_I_J_K_L_M_N_O_P_Q_R_S_T_U_V_W_X_Y_Z"
    

##### 5

    
    
    1
    a_b_"c_d"_"e_f"_"g_h_i_j_k_l_m_n_o_p_q_r_s_t_u_v_w_x_y_z"_"A_B_C_D_E_F_G_H_I_J_K_L_M_N_O_P_Q_R_S_T_U_V_W_X_Y_Z"
    

##### 6

    
    
    0
    a_b_"c_d"_"e_f"_"g_h_i_j_k_l_m_n_o_p_q_r_s_t_u_v_w_x_y_z"_"A_B_C_D_E_F_G_H_I_J_K_L_M_N_O_P_Q_R_S_T_U_V_W_X_Y_Z"
    

##### 7

    
    
    0
    a_"b_c_d_e"_"f_g_h_i"_"j_k"_"l_m"_"n_o"
    

##### 8

    
    
    0
    a_"b_c_d_e"_"f_g_h_i"_"j_k"_"l_m"
    

##### 9

    
    
    2
    a_"b_c_d_e"_"f_g_h_i"_"j_k"
    

##### 10

    
    
    1
    password__a12345678_timeout_100
    

