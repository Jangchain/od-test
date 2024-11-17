## 题目描述

将一个csv格式的数据文件中包含有单元格引用的内容替换为对应单元格内容的实际值。  
Comma seprated values（CSV）逗号分隔值，csv格式的数据文件使用逗号作为分隔符将各单位的内容进行分隔。

## 输入描述

  1. 输入只有一行数据，用逗号分隔每个单元格，行尾没有逗号。最多26个单元格，对应编号A-Z。
  2. 每个单元格的内容包含字母和数字，以及使用<>分隔的单元格引用，例如：表示引用第一个单元的值。
  3. 每个单元格的内容，在替换前和替换后均不超过100个字符。
  4. 引用单元格的位置不受限制，运行排在后面的单元格被排在前面的单元格引用。
  5. 不存在循环引用的情况，比如下面这种场景是不存在的：  
A单元格：aCd**8u  
B单元格：kAydzqo**

  6. 不存在多重<>的情况，一个单元格只能引用一个其他单元格。比如下面这种场景是不存在的：  
A单元格：aCd8u  
B单元格：kAydzqo  
C单元格：y<**> d**

## 输出描述

输出所有单元格展开的内容，单元格之间用逗号分隔。处理过程中出现错误时，输出字符串“-1”表示出错。

## 示例1

输入

    
    
    1,2<A>00
    

输出

    
    
    1，2100
    

说明  
第二个单元中有对A单元的引用，A单元格的值为1，替换时，将A单元的内容替代的位置，并和其他内容合并。

## 示例2

输入

    
    
    <B>12,1
    

输出

    
    
    112，1
    

说明  
第一个单元中有对B单元的引用，B单元格的值为1，替换时，将第二个数据单元的内容替代**的位置，并和其他内容合并。**

## 示例3

输入

    
    
    <B<12,1
    

输出

    
    
    -1
    

说明  
第一个单元中有错误的单元格引用方式，输出-1

## C++

    
    
    #include <iostream> 
    #include <sstream>   
    #include <vector>    
    #include <string>   
    #include <algorithm>  
    
    using namespace std;  
    
    // 全局变量，用于存储单元格的值、标记单元格是否正在处理中以及是否已处理完成
    vector<string> cellValues;
    vector<bool> isProcessing;
    vector<bool> hasProcessed;
    
    // 定义processCell函数，用于处理单元格内的数据，包括处理引用和检测循环引用
    bool processCell(int cellIndex) {
        // 如果该单元格已处理过，直接返回true
        if (hasProcessed[cellIndex]) return true;
        // 如果该单元格正在处理中，则存在循环引用，返回false
        if (isProcessing[cellIndex]) return false;
    
        // 标记该单元格为正在处理状态
        isProcessing[cellIndex] = true;
    
        ostringstream processedValue; // 创建一个字符串流，用于拼接处理后的单元格值
        string currentCellValue = cellValues[cellIndex]; // 获取当前单元格的值
        int cellLength = currentCellValue.length(); // 获取单元格值的长度
    
        // 遍历单元格值中的每个字符
        for (int charIndex = 0; charIndex < cellLength; ) {
            // 如果检测到引用格式（例如<A>）
            if (currentCellValue[charIndex] == '<' && charIndex + 2 < cellLength && currentCellValue[charIndex + 2] == '>') {
                char referencedCellId = currentCellValue[charIndex + 1]; // 获取被引用的单元格标识符
                int referencedIndex = referencedCellId - 'A'; // 将单元格标识符转换为索引
    
                // 检查引用的有效性
                if (referencedCellId < 'A' || referencedCellId > 'Z' || referencedIndex == cellIndex || referencedIndex >= cellValues.size() || !processCell(referencedIndex)) {
                    return false;
                }
    
                // 将引用的单元格值添加到处理后的值中
                processedValue << cellValues[referencedIndex];
                charIndex += 3; // 跳过引用格式，继续处理下一个字符
            } else {
                // 如果当前字符不是引用格式，直接添加到处理后的值中
                processedValue << currentCellValue[charIndex];
                charIndex++; // 移动到下一个字符
            }
        }
    
        // 更新当前单元格的值为处理后的值
        cellValues[cellIndex] = processedValue.str();
        // 标记该单元格为不再处理中
        isProcessing[cellIndex] = false;
        // 标记该单元格为已处理完成
        hasProcessed[cellIndex] = true;
    
        // 检查处理后的单元格值是否超过100个字符或包含非字母数字字符
        if (cellValues[cellIndex].length() > 100 || !all_of(cellValues[cellIndex].begin(), cellValues[cellIndex].end(), [](char c) {
            return isalnum(c); // 检查字符是否为字母或数字
        })) {
            return false;
        }
    
        return true; // 返回处理成功
    }
    
    int main() {
        string line;
        getline(cin, line); // 从标准输入读取一行数据
        istringstream input(line); // 使用字符串流解析读取的数据
    
        string cell;
        // 使用逗号分隔符读取单元格值，并添加到cellValues向量中
        while (getline(input, cell, ',')) {
            cellValues.push_back(cell);
        }
    
        // 如果单元格数量超过26个，输出-1并结束程序
        if (cellValues.size() > 26) {
            cout << "-1" << endl;
            return 0;
        }
    
        // 初始化isProcessing和hasProcessed向量的大小和初始值
        isProcessing.resize(cellValues.size(), false);
        hasProcessed.resize(cellValues.size(), false);
    
        ostringstream result; // 创建一个字符串流
            // 用于存储最终结果
        for (int cellIndex = 0; cellIndex < cellValues.size(); cellIndex++) {
            // 处理每个单元格，如果处理失败则输出-1并结束程序
            if (!processCell(cellIndex)) {
                cout << "-1" << endl;
                return 0;
            }
    
            // 在结果中添加处理后的单元格值，单元格之间用逗号分隔
            if (cellIndex > 0) result << ",";
            result << cellValues[cellIndex];
        }
    
        // 输出处理后的所有单元格值
        cout << result.str() << endl;
    
        return 0; // 程序正常结束
    }
    

## Java

    
    
    import java.util.Scanner;
    import java.util.StringJoiner;
    
    public class Main {
        // 存储单元格的值
        static String[] cellValues;
        // 标记单元格是否正在被处理，用于检测循环引用
        static boolean[] isProcessing;
        // 标记单元格是否已处理完成
        static boolean[] hasProcessed;
    
        public static void main(String[] args) {
            Scanner inputScanner = new Scanner(System.in);
            // 读取一行输入，并以逗号分隔，初始化单元格值数组
            cellValues = inputScanner.nextLine().split(",");
            // 如果单元格数量超过26，则直接返回-1
            if (cellValues.length > 26) {
                System.out.println("-1");
                return;
            }
    
            // 初始化isProcessing和hasProcessed数组
            isProcessing = new boolean[cellValues.length];
            hasProcessed = new boolean[cellValues.length];
    
            StringJoiner resultJoiner = new StringJoiner(",");
            for (int cellIndex = 0; cellIndex < cellValues.length; cellIndex++) {
                // 对每个单元格进行处理，如果处理失败则返回-1
                if (!processCell(cellIndex)) {
                    System.out.println("-1");
                    return;
                }
                // 将处理后的单元格值加入结果中
                resultJoiner.add(cellValues[cellIndex]);
            }
    
            // 输出最终处理后的单元格值
            System.out.println(resultJoiner.toString());
        }
    
        // 处理单元格，处理引用和检查循环引用
        public static boolean processCell(int cellIndex) {
            // 如果当前单元格已处理，直接返回true
            if (hasProcessed[cellIndex]) return true;
            // 如果当前单元格正在处理中，则存在循环引用，返回false
            if (isProcessing[cellIndex]) return false;   
    
            // 标记当前单元格为正在处理
            isProcessing[cellIndex] = true;
    
            StringBuilder processedValue = new StringBuilder();
            String currentCellValue = cellValues[cellIndex];
            int cellLength = currentCellValue.length();
    
            // 遍历当前单元格的内容，查找并处理引用
            for (int charIndex = 0; charIndex < cellLength; ) {
                // 如果找到引用格式的内容
                if (currentCellValue.charAt(charIndex) == '<' && charIndex + 2 < cellLength && currentCellValue.charAt(charIndex + 2) == '>') {
                    char referencedCellId = currentCellValue.charAt(charIndex + 1);
                    int referencedIndex = referencedCellId - 'A';
    
                    // 检查引用的有效性，如果无效则返回false
                    if (referencedCellId < 'A' || referencedCellId > 'Z' || referencedIndex == cellIndex || referencedIndex >= cellValues.length || !processCell(referencedIndex)) {
                        return false;
                    }
    
                    // 替换引用为实际值
                    processedValue.append(cellValues[referencedIndex]);
                    charIndex += 3; // 跳过引用的字符
                } else {
                    // 如果不是引用，则直接添加字符
                    processedValue.append(currentCellValue.charAt(charIndex));
                    charIndex++;
                }
            }
    
            // 更新单元格的值为处理后的内容
            cellValues[cellIndex] = processedValue.toString();
            // 更新状态，标记当前单元格为已处理
            isProcessing[cellIndex] = false;
            hasProcessed[cellIndex] = true;
    
            // 检查处理后的单元格内容是否符合要求（长度不超过100，且只包含字母和数字）
            if (cellValues[cellIndex].length() > 100 || !cellValues[cellIndex].matches("^[a-zA-Z0-9]+$")) {
                return false;
            }
    
            return true;
        }
    }
    

## javaScript

    
    
    // 引入readline模块用于处理命令行输入
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    // 存储单元格的值
    let cellValues;
    // 标记单元格是否正在被处理，用于检测循环引用
    let isProcessing;
    // 标记单元格是否已处理完成
    let hasProcessed;
    
    
    rl.on('line', (input) => {
        cellValues = input.split(",");
        // 如果单元格数量超过26，则直接返回-1并退出程序
        if (cellValues.length > 26) {
            console.log("-1");
            rl.close();
            return;
        }
    
        isProcessing = new Array(cellValues.length).fill(false);
        hasProcessed = new Array(cellValues.length).fill(false);
    
        let results = [];
        for (let cellIndex = 0; cellIndex < cellValues.length; cellIndex++) {
            // 对每个单元格进行处理，如果处理失败则返回-1
            if (!processCell(cellIndex)) {
                console.log("-1");
                rl.close();
                return;
            }
            // 将处理后的单元格值加入结果中
            results.push(cellValues[cellIndex]);
        }
    
        // 输出最终处理后的单元格值
        console.log(results.join(","));
        rl.close();
    });
    
    
    // 处理单元格，处理引用和检查循环引用
    function processCell(cellIndex) {
        // 如果当前单元格已处理，直接返回true
        if (hasProcessed[cellIndex]) return true;
        // 如果当前单元格正在处理中，则存在循环引用，返回false
        if (isProcessing[cellIndex]) return false;
    
        // 标记当前单元格为正在处理
        isProcessing[cellIndex] = true;
    
        let processedValue = "";
        let currentCellValue = cellValues[cellIndex];
    
        for (let charIndex = 0; charIndex < currentCellValue.length;) {
            // 如果找到引用格式的内容
            if (currentCellValue[charIndex] === '<' && charIndex + 2 < currentCellValue.length && currentCellValue[charIndex + 2] === '>') {
                let referencedCellId = currentCellValue[charIndex + 1];
                let referencedIndex = referencedCellId.charCodeAt(0) - 'A'.charCodeAt(0);
    
                // 检查引用的有效性，如果无效则返回false
                if (referencedCellId < 'A' || referencedCellId > 'Z' || referencedIndex === cellIndex || referencedIndex >= cellValues.length || !processCell(referencedIndex)) {
                    return false;
                }
    
                // 替换引用为实际值
                processedValue += cellValues[referencedIndex];
                charIndex += 3; // 跳过引用的字符
            } else {
                // 如果不是引用，则直接添加字符
                processedValue += currentCellValue[charIndex];
                charIndex++;
            }
        }
    
        // 更新单元格的值为处理后的内容
        cellValues[cellIndex] = processedValue;
        // 更新状态，标记当前单元格为已处理
        isProcessing[cellIndex] = false;
        hasProcessed[cellIndex] = true;
    
        // 检查处理后的单元格内容是否符合要求（长度不超过100，且只包含字母和数字）
        if (cellValues[cellIndex].length > 100 || !/^[a-zA-Z0-9]+$/.test(cellValues[cellIndex])) {
            return false;
        }
    
        return true;
    }
    
     
    

## Python

    
    
    # 导入正则表达式库，用于后续的字符串匹配
    import re
    
    # 初始化单元格值、是否正在处理、是否已处理的列表
    cell_values = []
    is_processing = []
    has_processed = []
    
    def process_cell(cell_index):
        """
        处理单个单元格，解析引用，并检查是否存在循环引用。
        :param cell_index: 当前单元格的索引
        :return: 如果处理成功返回True，如果存在循环引用或处理失败返回False
        """
        # 如果当前单元格已处理，直接返回True
        if has_processed[cell_index]:
            return True
        # 如果当前单元格正在处理中，表示存在循环引用，返回False
        if is_processing[cell_index]:
            return False
        
        # 标记当前单元格为正在处理
        is_processing[cell_index] = True
        processed_value = []  # 初始化处理后的单元格值列表
        current_cell_value = cell_values[cell_index]  # 获取当前单元格的值
        
        char_index = 0
        # 遍历当前单元格的值
        while char_index < len(current_cell_value):
            # 检查是否匹配引用格式
            if current_cell_value[char_index] == '<' and char_index + 2 < len(current_cell_value) and current_cell_value[char_index + 2] == '>':
                referenced_cell_id = current_cell_value[char_index + 1]
                referenced_index = ord(referenced_cell_id) - ord('A')
                
                # 检查引用的有效性
                if referenced_cell_id < 'A' or referenced_cell_id > 'Z' or referenced_index == cell_index or referenced_index >= len(cell_values) or not process_cell(referenced_index):
                    return False
                
                # 将引用的单元格值加入到处理后的值中
                processed_value.append(cell_values[referenced_index])
                char_index += 3  # 跳过引用格式
            else:
                # 如果不是引用格式，直接添加字符
                processed_value.append(current_cell_value[char_index])
                char_index += 1
        
        # 更新当前单元格的值为处理后的值
        cell_values[cell_index] = ''.join(processed_value)
        # 更新处理状态
        is_processing[cell_index] = False
        has_processed[cell_index] = True
        
        # 检查处理后的值是否超过100个字符或包含非字母数字字符
        if len(cell_values[cell_index]) > 100 or not re.match("^[a-zA-Z0-9]+$", cell_values[cell_index]):
            return False
        
        return True
    
    if __name__ == "__main__":
        # 读取输入，分割为单元格的初始值
        cell_values = input().split(',')
        
        # 如果单元格数量超过26个，直接输出-1
        if len(cell_values) > 26:
            print("-1")
        else:
            # 初始化处理状态列表
            is_processing = [False] * len(cell_values)
            has_processed = [False] * len(cell_values)
            
            result = []  # 初始化最终结果列表
            for cell_index in range(len(cell_values)):
                # 对每个单元格进行处理
                if not process_cell(cell_index):
                    print("-1")
                    break
                result.append(cell_values[cell_index])
            else:
                # 所有单元格处理成功，输出处理后的单元格值，用逗号连接
                print(','.join(result))
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    #include <string.h>
    #include <ctype.h>
    
    #define MAX_CELLS 26 // 定义最大单元格数量，因为一个英文字母代表一个单元格
    #define MAX_LENGTH 101 // 定义单元格内容的最大长度
    
    // 检查字符串是否只包含字母和数字
    int is_alnum_string(const char *str) {
        while (*str) {
            if (!isalnum((unsigned char)*str++)) return 0; // 如果发现非字母数字字符，返回0
        }
        return 1; // 全部字符检查通过，返回1
    }
    
    char cell_values[MAX_CELLS][MAX_LENGTH]; // 存储所有单元格的值
    int is_processing[MAX_CELLS] = {0}; // 标记单元格是否正在处理中，防止循环引用
    int has_processed[MAX_CELLS] = {0}; // 标记单元格是否已经处理完成
    
    // 处理单元格函数，cell_index是当前处理的单元格索引，cell_count是单元格总数
    int process_cell(int cell_index, int cell_count) {
        if (has_processed[cell_index]) return 1; // 如果已处理过，直接返回成功
        if (is_processing[cell_index]) return 0; // 如果正在处理中，则表示有循环引用，返回失败
    
        is_processing[cell_index] = 1; // 标记为正在处理
        char processed_value[MAX_LENGTH * MAX_CELLS] = ""; // 存储处理后的单元格内容
        char *current_cell_value = cell_values[cell_index]; // 当前单元格的原始内容
    
        for (int char_index = 0; char_index < strlen(current_cell_value);) {
            if (current_cell_value[char_index] == '<' && char_index + 2 < strlen(current_cell_value) && current_cell_value[char_index + 2] == '>') {
                // 检测到单元格引用格式
                char referenced_cell_id = current_cell_value[char_index + 1]; // 获取被引用的单元格标识
                int referenced_index = referenced_cell_id - 'A'; // 计算被引用单元格的索引
                if (referenced_cell_id < 'A' || referenced_cell_id > 'Z' || referenced_index == cell_index || referenced_index >= cell_count || !process_cell(referenced_index, cell_count)) {
                    // 检查引用有效性，如果无效或处理失败，则返回失败
                    return 0;
                }
                strcat(processed_value, cell_values[referenced_index]); // 将引用的单元格值添加到处理结果中
                char_index += 3; // 跳过引用格式的三个字符
            } else {
                // 非引用内容，直接添加到处理结果中
                char temp[2] = {current_cell_value[char_index], '\0'};
                strcat(processed_value, temp);
                char_index++;
            }
        }
    
        strcpy(cell_values[cell_index], processed_value); // 更新单元格内容为处理后的值
        is_processing[cell_index] = 0; // 取消正在处理的标记
        has_processed[cell_index] = 1; // 标记为已处理
    
        if (strlen(cell_values[cell_index]) > 100 || !is_alnum_string(cell_values[cell_index])) {
            // 检查处理后的单元格内容是否符合长度和字符类型的要求，不符合则返回失败
            return 0;
        }
    
        return 1; // 处理成功
    }
    
    int main() {
         
    
        char input[MAX_LENGTH * MAX_CELLS]; // 存储输入的字符串
        if (fgets(input, sizeof(input), stdin) == NULL) {
            printf("-1\n");
            return 1;
        }
         
    
        input[strcspn(input, "\n")] = 0; // 去除输入字符串的换行符
        int cell_count = 0; // 单元格数量计数器
        char *token = strtok(input, ","); // 使用逗号分隔输入的单元格值
        while (token != NULL) {
            if (cell_count >= MAX_CELLS) {
                printf("-1\n"); // 如果单元格数量超过最大值
                            return 0; // 直接退出程序
            }
            strcpy(cell_values[cell_count++], token); // 将分割得到的单元格内容复制到数组中，并增加单元格计数
            token = strtok(NULL, ","); // 继续分割下一个单元格内容
        }
    
        for (int i = 0; i < cell_count; i++) {
            if (!process_cell(i, cell_count)) { // 逐个处理单元格
                printf("-1\n"); // 如果处理中出现错误，打印-1并退出
                return 0;
            }
        }
    
        for (int i = 0; i < cell_count; i++) { // 所有单元格处理完成后，按顺序打印出来
            if (i > 0) printf(","); // 除了第一个单元格外，每个单元格前打印逗号分隔
            printf("%s", cell_values[i]); // 打印单元格内容
        }
        printf("\n"); // 打印完成后换行
    
        return 0; // 程序正常结束
    }
    

## 完整用例

### 用例1

    
    
    0<G>,1,2<A>,3,4<C>,5,6<B>
    

### 用例2

    
    
    0<B>,1<C>,2<D>,3<E>,4<F>,5,6<A><B><C><D><E>
    

### 用例3

    
    
    0<G>,1<C><D>,2<E>,3<F>,4,5,6<B>
    

### 用例4

    
    
    01<D>23<B>45<C>6,B,C,D
    

### 用例5

    
    
    0,1<B>,2<C>,3<D>,4,5
    

### 用例6

    
    
    0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30
    

### 用例7

    
    
    0,1,2$,3,4,5
    

### 用例8

    
    
    <B>,<C>,<D>,<E>,<F>,<G>,<H>,<I>,<J>,<K>,<L>,<M>,<N>,<O>,<P>,<Q>,<R>,<S>,<T>,<U>,<V>,<W>,<X>,<Y>,Z0123456789Z0123456789Z0123456789Z0123456789Z0123456789Z0123456789Z0123456789Z0123456789Z0123456789Z0123456789
    

### 用例9

    
    
    0,1,2<AB>,3,4,5
    

### 用例10

    
    
    0,1,2<Z>,3,4,5
    

#### 文章目录

  * 题目描述
  * 输入描述
  * 输出描述
  * 示例1
  * 示例2
  * 示例3
  * C++
  * Java
  * javaScript
  * Python
  * C语言
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

![fengmian](https://i-blog.csdnimg.cn/blog_migrate/8ed1d0675e43a760481d6f2555aab8dc.png)

