#### 题目描述

Excel工作表中对选定区域的数值进行统计的功能非常实用。

仿照Excel的这个功能，请对给定表格中选中区域中的单元格进行求和统计，并输出统计结果。

为简化计算，假设当前输入中每个单元格内容仅为数字或公式两种。

如果为数字，则是一个非负整数，形如3、77

如果为公式，则固定以=开头，且仅包含下面三种情况：

  * 等于某单元格的值，例如=B12
  * 两个单元格的双目运算（仅为+或-），形如=C1-C2、C3+B2
  * 单元格和数字的双目运算（仅为+或-），形如=B1+1、100-B2

注意：

  1. 公式内容都是合法的，例如不存在，=C+1、=C1-C2+B3,=5、=3+5
  2. 不存在循环引用，例如A1=B1+C1、C1=A1+B2
  3. 内容中不存在空格、括号

#### 输入描述

第一行两个整数rows cols，表示给定表格区域的行数和列数，1<=rows<=20，1<=cols<=26。  
接下来rows行，每行cols个以空格分隔的字符串，表示给定表格values的单元格内容。  
最后一行输入的字符串，表示给定的选中区域，形如A1:C2。

#### 输出描述

一个整数，表示给定选中区域各单元格中数字的累加总和，范围-2,147,483,648 ~ 2,147,483,647

#### 备注

表格的行号120，列号AZ，例如单元格B3对应values[2][1]。

#### 用例

输入| 1 3  
1 =A1+C1 3  
A1:C1  
---|---  
输出| 8  
输入| 5 3  
10 12 =C5  
15 5 6  
7 8 =3+C2  
6 =B2-A1 =C2  
7 5 3  
B2:C4  
---|---  
输出| 29  
说明| 无  
  
#### 题目解析

首先，我们需要搞清楚Excel表格坐标和输入矩阵的索引之间的对应关系。例如，在上面的用例中，输入矩阵为：[[“1”, “=A1+C1”,
“3”]]。其中，值为“1”的元素对应矩阵matrix[0][0]，而对应的Excel表格坐标是A1，其中A表示列号，1表示行号。

因此，我们可以得到Excel表格坐标和输入矩阵的索引之间的对应关系：

  * 行对应关系：String(‘A’).charCodeAt() - 65 = 0（PS：“A”的ASCII码值为65）
  * 列对应关系：1 - 1 = 0

接下来，我们需要解析Excel表格坐标中的列号和行号。只有解析出来，才能方便地对应到输入矩阵的索引。

在这里，我们使用正则表达式的捕获组来解析Excel表格坐标。正则表达式为：/^(A-Z)(\d+)$/。

接下来，我们就可以实现根据Excel表格坐标获取输入矩阵元素的逻辑了。我们定义一个方法getCell，其入参为Excel表格坐标。然后，通过上面的正则表达式解析出对应的列号和行号，再根据Excel表格列号和行号转化为对应的输入矩阵行索引和列索引，从而得到对应索引位置的值。

此时，我们可以得到两种类型的值：

  1. 非公式的值，例如1
  2. 公式，以等号（=）开头

对于非公式的值，我们直接将其转换为数值后返回；对于公式，我们需要分为三种情况：

  * =A1+B1，即两个Excel表格坐标之间的运算
  * =A1-2，即一个Excel表格坐标和一个数值之间的运算
  * =A1，即一个Excel表格坐标

我们可以通过getCell方法获取到Excel表格坐标对应的值，然后进行相应的运算。

#### C++

    
    
    #include <iostream>
    #include <vector>
    #include <algorithm>
    #include <regex>
    
    using namespace std;
    
    // 将字符串按空格分割成整数数组
    vector<int> splitToInt(string params_str) {
        vector<int> p;
        while (params_str.find(" ") != string::npos) {
            int found = params_str.find(" ");
            p.push_back(stoi(params_str.substr(0, found)));
            params_str = params_str.substr(found + 1);
        }
        p.push_back(stoi(params_str));
        return p;
    }
    
    // 将字符串按指定分隔符分割成字符串数组
    vector<string> splitToStr(string params_str, string op) {
        vector<string> p;
        while (params_str.find(op) != string::npos) {
            int found = params_str.find(op);
            p.push_back(params_str.substr(0, found));
            params_str = params_str.substr(found + 1);
        }
        p.push_back(params_str);
        return p;
    }
    
    int main() {
        string param_str;
        getline(cin, param_str);
        vector<int> params = splitToInt(param_str);
        int rows = params[0];
        int cols = params[1];
    
        vector<vector<string>> matrix;
        for (int i = 0; i < rows; i++) {
            string op_str;
            getline(cin, op_str);
            matrix.push_back(splitToStr(op_str, " "));
        }
    
        // 先将表达式都转为数字字符串
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                string& element = matrix[i][j];
                if (element[0] == '=') {
                    if (element.find("+") != string::npos) {
                        int found = element.find("+");
                        string op1 = element.substr(1, found - 1);
                        string op2 = element.substr(found + 1);
                        int num1, num2;
                        // 假如是纯数字,就直接用
                        if (regex_match(op1, regex("-?\\d+(\\.\\d+)?"))) {
                            num1 = stoi(op1);
                        } else {
                            // 到matrix中找到对应的数字
                            num1 = stoi(matrix[stoi(op1.substr(1)) - 1][op1[0] - 'A']);
                        }
    
                        if (regex_match(op2, regex("-?\\d+(\\.\\d+)?"))) {
                            num2 = stoi(op2);
                        } else {
                            num2 = stoi(matrix[stoi(op2.substr(1)) - 1][op2[0] - 'A']);
                        }
                        element = to_string(num1 + num2);
                    } else if (element.find("-") != string::npos) {
                        int found = element.find("-");
                        string op1 = element.substr(1, found - 1);
                        string op2 = element.substr(found + 1);
    
                        int num1, num2;
                        // 假如是纯数字,就直接用
                        if (regex_match(op1, regex("-?\\d+(\\.\\d+)?"))) {
                            num1 = stoi(op1);
                        } else {
                            // 到matrix中找到对应的数字
                            num1 = stoi(matrix[stoi(op1.substr(1)) - 1][op1[0] - 'A']);
                        }
    
                        if (regex_match(op2, regex("-?\\d+(\\.\\d+)?"))) {
                            num2 = stoi(op2);
                        } else {
                            num2 = stoi(matrix[stoi(op2.substr(1)) - 1][op2[0] - 'A']);
                        }
                        element = to_string(num1 - num2);
                    } else {
                        element = matrix[stoi(element.substr(2)) - 1][element[1] - 'A'];
                    }
                }
            }
        }
    
        // 输出表达式解析
        string op_str1;
        getline(cin, op_str1);
        vector<string> output = splitToStr(op_str1, ":");
    
        int res = 0;
        for (int i = stoi(output[0].substr(1)) - 1; i < stoi(output[1].substr(1)); i++) {
            for (int j = output[0][0] - 'A'; j <= output[1][0] - 'A'; j++) {
                res += stoi(matrix[i][j]);
            }
        }
    
        cout << res;
        return 0;
    }
    
    

#### JavaScript

    
    
    const readline = require("readline");
    
    const interface = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    
    const lines = [];
    let rows, cols;
    
    interface.on("line", (line) => {
      lines.push(line);
    
      // 第一行为表格的行数和列数
      if (lines.length === 1) {
        [rows, cols] = lines[0].split(" ").map(Number);
      }
    
      // 读取完整个表格后，计算选中区域的和
      if (rows && lines.length === rows + 2) {
        lines.shift();
        const [start, end] = lines.pop().split(":");
        const matrix = lines.map((line) => line.split(" "));
        console.log(getSelectedSum(matrix, rows, cols, start, end));
        lines.length = 0;
      }
    });
    
    /**
     * 计算选中区域所有数的和
     * @param {*} matrix 给定表格区域
     * @param {*} rows 给定表格区域的行数
     * @param {*} cols 给定表格区域的列数
     * @param {*} start 选中区域的左上角位置
     * @param {*} end 选中区域的右下角位置
     */
    function getSelectedSum(matrix, rows, cols, start, end) {
      // 正则表达式用于解析Excel单元格位置坐标
      const regExp = /^([A-Z])(\d+)$/;
    
      // 获取指定坐标pos的单元格内的值，pos形式如A1，B2，C3
      function getCellValue(pos) {
        let [_, col, row] = regExp.exec(pos);
        col = String(col).charCodeAt() - 65; // 列号A对应的码值为65，A列等价于matrix矩阵的第0列
        row -= 1; // 行号从1开始，等价于matrix矩阵的第0行
    
        // 如果单元格内容以=开头，则为公式
        if (String(matrix[row][col]).startsWith("=")) {
          // 公式有三种情况
          // 等于某单元格的值，例如=B12
          // 两个单元格的双目运算（仅为+或-），形如=C1-C2、C3+B2
          // 单元格和数字的双目运算（仅为+或-），形如=B1+1、100-B2
          let [_, cell1, cell2] = matrix[row][col].split(/[\=\+\-]/);
          if (!cell2) cell2 = 0; // 对于 =A1 这种情况，cell2结构出来是undefined，我们需要考虑这种情况将其置为0
    
          // 如果cell解析出来是值，则直接使用
          if (/^\d+$/.test(cell1)) {
            cell1 -= 0;
          }
          // 如果cell解析出来不是值，那就是Excel坐标
          else {
            cell1 = getCellValue(cell1);
          }
    
          // 同上
          if (/^\d+$/.test(cell2)) {
            cell2 -= 0;
          } else {
            cell2 = getCellValue(cell2);
          }
    
          // 如果cell1和cell2是相加
          if (matrix[row][col].includes("+")) {
            matrix[row][col] = cell1 + cell2;
          }
          // 如果cell1和cell2是相减
          else if (matrix[row][col].includes("-")) {
            matrix[row][col] = cell1 - cell2;
          }
          // 如果没有运算，那就只可能是单值，直接使用
          else {
            matrix[row][col] = cell1;
          }
        }
        // 如果单元格内容不以=开头，则为可以直接使用的数值
        else {
          matrix[row][col] -= 0;
        }
    
        return matrix[row][col];
      }
    
      // 解析选中区域的左上角坐标
      let [_1, col_start, row_start] = regExp.exec(start);
      // 解析选中区域的右下角坐标
      let [_2, col_end, row_end] = regExp.exec(end);
    
      // 列坐标处理
      col_start = String(col_start).charCodeAt();
      col_end = String(col_end).charCodeAt();
      // 行坐标处理
      row_start -= 0;
      row_end -= 0;
    
      let sum = 0;
      for (let j = col_start; j <= col_end; j++) {
        for (let i = row_start; i <= row_end; i++) {
          sum += getCellValue(`${String.fromCharCode(j)}${i}`);
        }
      }
    
      return sum;
    }
    
    

#### Java

    
    
    import java.util.Scanner;
    
    public class Main {
        public static String[][] sheet;
    
        // 给每一行增加注释
        public static void main(String[] args) {
            Scanner sc = new Scanner(System.in);
    
            // 输入行数和列数
            int row = sc.nextInt();
            int col = sc.nextInt();
            sc.nextLine();
    
            // 读取表格数据
            sheet = new String[row][col];
            for (int i = 0; i < row; i++) {
                sheet[i] = sc.nextLine().split(" ");
            }
    
            // 读取计算区域
            String[] nums = sc.nextLine().split(":");
            int[] start = toCoordinate(nums[0]);
            int[] end = toCoordinate(nums[1]);
    
            // 计算表达式的值
            int sum = 0;
            for (int i = start[0]; i <= end[0]; i++) {
                for (int j = start[1]; j <= end[1]; j++) {
                    String temp = sheet[i][j];
                    if (temp.contains("=")) {
                        sum += evaluate(temp);
                    } else {
                        sum += Integer.valueOf(temp);
                    }
                }
            }
    
            System.out.println(sum);
        }
    
        // 计算表达式的值
        public static int evaluate(String s) {
            s = s.replace("=", "");
            boolean isAddition = true; // 是否为加法运算
            boolean isDigit = true; // 是否为纯数字
            int num1 = 0;
            int num2 = 0;
            String temp = "";
            for (int i = 0; i < s.length(); i++) {
                char c = s.charAt(i);
                if (c == '-' || c == '+') {
                    if (c == '-') {
                        isAddition = false;
                    }
                    if (isDigit) { // 纯数字
                        num1 = Integer.valueOf(temp);
                    } else {
                        int[] coordinate = toCoordinate(temp); // 先求出其坐标位置
                        String str = sheet[coordinate[0]][coordinate[1]];
                        if (str.contains("=")) { // 如果此坐标位置还是一个算式需要继续求值
                            num1 = evaluate(str);
                        } else {
                            num1 = Integer.valueOf(str);
                        }
                    }
                    temp = "";
                    isDigit = true;
                } else {
                    if (Character.isLetter(c)) {
                        isDigit = false; // 包含字母则非纯数字
                    }
                    temp += c;
                }
                if (i == s.length() - 1) {
                    if (isDigit) { // 纯数字
                        num2 = Integer.valueOf(temp);
                    } else {
                        int[] coordinate = toCoordinate(temp); // 先求出其坐标位置
                        String str = sheet[coordinate[0]][coordinate[1]];
                        if (str.contains("=")) { // 如果此坐标位置还是一个算式需要继续求值
                            num2 = evaluate(str);
                        } else {
                            num2 = Integer.valueOf(str);
                        }
                    }
                }
            }
            return isAddition ? num1 + num2 : num1 - num2;
        }
    
        // 将坐标字符串转换为坐标数组
        public static int[] toCoordinate(String s) {
            int y = s.charAt(0) - 'A';
            String num = "";
            for (int i = 1; i < s.length(); i++) {
                num += s.charAt(i);
            }
            return new int[]{Integer.valueOf(num) - 1, y};
        }
    }
    

#### Python

    
    
    import re
    input_params = input().split()
    num_rows = int(input_params[0])
    num_cols = int(input_params[1])
    
    # 初始化矩阵
    matrix = [[0] * num_cols for _ in range(num_rows)]
    
    # 读入矩阵元素
    for i in range(num_rows):
        matrix[i] = input().split()
    
    # 遍历矩阵元素，对于以'='开头的元素进行计算
    for i in range(num_rows):
        for j in range(num_cols):
            if matrix[i][j][0] == '=':
                if '+' in matrix[i][j]:
                    # 如果是加法表达式，则将表达式拆分为两个操作数
                    operands = matrix[i][j].split('+')
                    operand1 = operands[0]
                    operand2 = operands[1]
    
                    # 对操作数进行解析，如果是数字，则直接使用；如果是单元格，则从矩阵中获取值
                    if re.match(r'^-?\d+(\.\d+)?$', operand1[1:]):
                        num1 = int(operand1[1:])
                    else:
                        num1 = int(matrix[int(operand1[2:]) - 1][ord(operand1[1]) - 65])
    
                    if re.match(r'^-?\d+(\.\d+)?$', operand2):
                        num2 = int(operand2)
                    else:
                        num2 = int(matrix[int(operand2[1:]) - 1][ord(operand2[0]) - 65])
    
                    # 将计算结果写入矩阵
                    matrix[i][j] = str(num1 + num2)
                elif '-' in matrix[i][j]:
                    # 如果是减法表达式，同样拆分为两个操作数，解析后进行计算
                    operands = matrix[i][j].split('-')
                    operand1 = operands[0]
                    operand2 = operands[1]
    
                    if re.match(r'^-?\d+(\.\d+)?$', operand1[1:]):
                        num1 = int(operand1[1:])
                    else:
                        num1 = int(matrix[int(operand1[2:]) - 1][ord(operand1[1]) - 65])
    
                    if re.match(r'^-?\d+(\.\d+)?$', operand2):
                        num2 = int(operand2)
                    else:
                        num2 = int(matrix[int(operand2[1:]) - 1][ord(operand2[0]) - 65])
    
                    matrix[i][j] = str(num1 - num2)
                else:
                    # 如果是单元格引用，直接从矩阵中获取值
                    matrix[i][j] = str(int(matrix[int(matrix[i][j][2:]) - 1][ord(matrix[i][j][1]) - 65]))
    
    if __name__ == '__main__':
        # 读入输出参数，格式为"A1:B2"
        output_params = input().split(':')
    
        # 遍历指定范围内的单元格，将值累加
        result = 0
        for i in range(int(output_params[0][1:]) - 1, int(output_params[1][1:])):
            for j in range(ord(output_params[0][0]) - 65, ord(output_params[1][0]) - 64):
                result += int(matrix[i][j])
    
        # 输出结果
        print(result)
    

#### 文章目录

  *     *       * 题目描述
      * 输入描述
      * 输出描述
      * 备注
      * 用例
      * 题目解析
      * C++
      * JavaScript
      * Java
      * Python

![fengmian](https://img-
blog.csdnimg.cn/img_convert/1d2f33ed8cf2fb1b9a4fe09513f7aa94.png)

