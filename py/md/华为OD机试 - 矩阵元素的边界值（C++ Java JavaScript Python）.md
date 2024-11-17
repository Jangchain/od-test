## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

#### 题目描述

给定一个N*M矩阵，请先找出M个该矩阵中每列元素的最大值，然后输出这M个值中的最小值

#### 输入描述

无

#### 输出描述

无

#### 备注

N和M的取值范围均为：[0, 100]

#### 用例

输入| [[1,2],[3,4]]  
---|---  
输出| 3  
说明| 第一列元素为：1和3，最大值为3；第二列元素为：2和4，最大值为4各列最大值3和4的最小值为3  
  
#### 解题思路

这段代码的主要目标是找到一个矩阵中各列最大值中的最小值。以下是详细的解题思路：

  1. **读取输入矩阵** ：首先，代码从标准输入中读取一行字符串，表示矩阵。矩阵中的每个元素用逗号分隔，每行用方括号包围，并用逗号连接。

  2. **解析矩阵** ：接下来，代码去掉输入字符串的首尾括号，然后根据"],["分割成行。对于每一行，使用逗号分隔符将其分割成元素，并将字符串元素转换为整数。将每行的整数列表添加到矩阵中，最终得到一个二维整数列表。

  3. **检查矩阵有效性** ：如果矩阵为空或者矩阵的第一行为空，输出0并返回。这是因为在这种情况下，无法计算各列最大值中的最小值。

  4. **计算每列的最大值** ：初始化一个数组用于存储每列的最大值，初始值为矩阵的第一行。然后，遍历矩阵的每一行（从第二行开始），并在每一行中遍历每个元素。对于每个元素，更新其所在列的最大值。

  5. **找到各列最大值中的最小值** ：初始化一个变量用于存储各列最大值中的最小值，初始值为第一列的最大值。然后，遍历每列的最大值（从第二列开始），并更新各列最大值中的最小值。

  6. **输出结果** ：输出各列最大值中的最小值。

#### C++

    
    
    #include <iostream>
    #include <sstream>
    #include <vector>
    #include <string>
    #include <algorithm>
    
    using namespace std;
    
    int main() {
        // 读取一行输入，表示矩阵
        string inputLine;
        getline(cin, inputLine);
    
        // 去掉输入字符串的首尾括号，然后根据"],["分割成行
        inputLine = inputLine.substr(2, inputLine.length() - 4);
        stringstream rowStream(inputLine);
        string rowString;
        vector<vector<int>> matrix;
    
        // 遍历每一行
        while (getline(rowStream, rowString, ']')) {
            if (rowString[0] == ',') {
                rowString = rowString.substr(2);
            }
            stringstream elementStream(rowString);
            string elementString;
            vector<int> row;
    
            // 遍历当前行的每个元素
            while (getline(elementStream, elementString, ',')) {
                // 将字符串转换为整数并存储在当前行中
                row.push_back(stoi(elementString));
            }
    
            // 将当前行添加到矩阵中
            matrix.push_back(row);
        }
    
        // 如果矩阵为空或者矩阵的第一行为空，则输出0并返回
        if (matrix.empty() || matrix[0].empty()) {
            cout << 0 << endl;
            return 0;
        }
    
        // 初始化一个数组用于存储每列的最大值，初始值为矩阵的第一行
        vector<int> columnMaxValues = matrix[0];
    
        // 遍历矩阵的每一行（从第二行开始）
        for (size_t rowIndex = 1; rowIndex < matrix.size(); rowIndex++) {
            // 遍历当前行的每个元素
            for (size_t colIndex = 0; colIndex < matrix[rowIndex].size(); colIndex++) {
                // 更新每列的最大值
                columnMaxValues[colIndex] = max(columnMaxValues[colIndex], matrix[rowIndex][colIndex]);
            }
        }
    
        // 初始化一个变量用于存储各列最大值中的最小值，初始值为第一列的最大值
        int minOfMaxValues = columnMaxValues[0];
    
        // 遍历每列的最大值（从第二列开始）
        for (size_t i = 1; i < columnMaxValues.size(); i++) {
            // 更新各列最大值中的最小值
            minOfMaxValues = min(minOfMaxValues, columnMaxValues[i]);
        }
    
        // 输出各列最大值中的最小值
        cout << minOfMaxValues << endl;
    
        return 0;
    }
    
    
    

#### Java

    
    
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            // 创建一个Scanner对象用于读取用户输入
            Scanner sc = new Scanner(System.in);
            // 读取一行输入，表示矩阵
            String inputLine = sc.nextLine();
    
            // 去掉输入字符串的首尾括号，然后根据"],["分割成行
            String[] rows = inputLine.substring(2, inputLine.length() - 2).split("],\\[");
            // 创建一个二维数组表示矩阵
            int[][] matrix = new int[rows.length][];
    
            // 遍历每一行
            for (int i = 0; i < rows.length; i++) {
                // 将行中的元素按逗号分割
                String[] elements = rows[i].split(",");
                // 创建一个一维数组表示当前行
                int[] row = new int[elements.length];
                // 遍历当前行的每个元素
                for (int j = 0; j < elements.length; j++) {
                    // 将字符串转换为整数并存储在当前行中
                    row[j] = Integer.parseInt(elements[j]);
                }
                // 将当前行添加到矩阵中
                matrix[i] = row;
            }
             // 如果矩阵为空或者矩阵的第一行为空，则输出0并返回
            if (matrix.length == 0 || matrix[0].length == 0) {
                System.out.println(0);
                return;
            }
     
            // 初始化一个数组用于存储每列的最大值，初始值为矩阵的第一行
            int[] columnMaxValues = matrix[0];
    
            // 遍历矩阵的每一行（从第二行开始）
            for (int rowIndex = 1; rowIndex < matrix.length; rowIndex++) {
                // 遍历当前行的每个元素
                for (int colIndex = 0; colIndex < matrix[rowIndex].length; colIndex++) {
                    // 更新每列的最大值
                    columnMaxValues[colIndex] = Math.max(columnMaxValues[colIndex], matrix[rowIndex][colIndex]);
                }
            }
    
            // 初始化一个变量用于存储各列最大值中的最小值，初始值为第一列的最大值
            int minOfMaxValues = columnMaxValues[0];
    
            // 遍历每列的最大值（从第二列开始）
            for (int i = 1; i < columnMaxValues.length; i++) {
                // 更新各列最大值中的最小值
                minOfMaxValues = Math.min(minOfMaxValues, columnMaxValues[i]);
            }
    
            // 输出各列最大值中的最小值
            System.out.println(minOfMaxValues);
        }
    }
    
    

#### javascript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    // 读取一行输入，表示矩阵
    rl.on('line', (inputLine) => {
        // 去掉输入字符串的首尾括号，然后根据"],["分割成行
        const rows = inputLine.slice(2, -2).split('],[');
        const matrix = rows.map(row => row.split(',').map(Number));
    
        // 如果矩阵为空或者矩阵的第一行为空，则输出0并返回
        if (matrix.length === 0 || matrix[0].length === 0) {
            console.log(0);
            rl.close();
            return;
        }
    
        // 初始化一个数组用于存储每列的最大值，初始值为矩阵的第一行
        const columnMaxValues = matrix[0].slice();
    
        // 遍历矩阵的每一行（从第二行开始）
        for (let rowIndex = 1; rowIndex < matrix.length; rowIndex++) {
            // 遍历当前行的每个元素
            for (let colIndex = 0; colIndex < matrix[rowIndex].length; colIndex++) {
                // 更新每列的最大值
                columnMaxValues[colIndex] = Math.max(columnMaxValues[colIndex], matrix[rowIndex][colIndex]);
            }
        }
    
        // 初始化一个变量用于存储各列最大值中的最小值，初始值为第一列的最大值
        let minOfMaxValues = columnMaxValues[0];
    
        // 遍历每列的最大值（从第二列开始）
        for (let i = 1; i < columnMaxValues.length; i++) {
            // 更新各列最大值中的最小值
            minOfMaxValues = Math.min(minOfMaxValues, columnMaxValues[i]);
        }
    
        // 输出各列最大值中的最小值
        console.log(minOfMaxValues);
        rl.close();
    });
    
    

#### Python

    
    
    # 读取一行输入，表示矩阵
    input_line = input()
    
    # 去掉输入字符串的首尾括号，然后根据"],["分割成行
    rows = input_line[2:-2].split('],[')
    matrix = [list(map(int, row.split(','))) for row in rows]
    
    # 如果矩阵为空或者矩阵的第一行为空，则输出0并返回
    if len(matrix) == 0 or len(matrix[0]) == 0:
        print(0)
    else:
        # 初始化一个数组用于存储每列的最大值，初始值为矩阵的第一行
        column_max_values = matrix[0].copy()
    
        # 遍历矩阵的每一行（从第二行开始）
        for row_index in range(1, len(matrix)):
            # 遍历当前行的每个元素
            for col_index in range(len(matrix[row_index])):
                # 更新每列的最大值
                column_max_values[col_index] = max(column_max_values[col_index], matrix[row_index][col_index])
    
        # 初始化一个变量用于存储各列最大值中的最小值，初始值为第一列的最大值
        min_of_max_values = column_max_values[0]
    
        # 遍历每列的最大值（从第二列开始）
        for i in range(1, len(column_max_values)):
            # 更新各列最大值中的最小值
            min_of_max_values = min(min_of_max_values, column_max_values[i])
    
        # 输出各列最大值中的最小值
        print(min_of_max_values)
    
    

#### 完整用例

##### 用例1

[[1,2],[3,4]]

##### 用例2

[[1,3,5],[2,4,6]]

##### 用例3

[[5,4,3],[2,1,0]]

##### 用例4

[[1,1,1],[1,1,1]]

##### 用例5

[[0,0,0],[0,0,0]]

##### 用例6

[[1,2,3,4,5],[5,4,3,2,1]]

##### 用例7

[[1,1,1,1,1],[2,2,2,2,2],[3,3,3,3,3]]

##### 用例8

[[1,2,3],[4,5,6],[7,8,9]]

##### 用例9

[[1,4,7],[2,5,8],[3,6,9]]

##### 用例10

[[1,1,1,1,1,1,1,1,1,1],[2,2,2,2,2,2,2,2,2,2],[3,3,3,3,3,3,3,3,3,3],[4,4,4,4,4,4,4,4,4,4],[5,5,5,5,5,5,5,5,5,5]]

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

