## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

给定一组不等式，判断是否成立并输出不等式的最大差(输出浮点数的整数部分)

要求:

  1. 不等式系数为 double类型，是一个二维数组

  2. 不等式的变量为 int类型，是一维数组;

  3. 不等式的目标值为 double类型，是一维数组

  4. 不等式约束为字符串数组，只能是:“>”,“>=”,“<”,“<=”,“=”，

例如，不等式组:

    
    
     a11x1 + a12x2 + a13x3 + a14x4 + a15x5 <= b1; 
     a21x1 + a22x2 + a23x3 + a24x4 + a25x5 <= b2; 
     a31x1 + a32x2 + a33x3 + a34x4 + a35x5 <= b3; 
    

最大差 = max{(a11x1+a12x2+a13x3+a14x4+a15x5-b1),(a21x1+a22x2+a23x3+a24x4+
a25x5-b2),(a31x1+a32x2+a33x3+a34x4+a35x5-b3)},

类型为整数(输出浮点数的整数部分)

## 输入描述

a11,a12,a13,a14,a15,a21,a22,a23,a24,a25,
a31,a32,a33,a34,a35,x1,x2,x3,x4,x5,b1,b2,b3,<=,<=,<=

  * 不等式组系数(double类型):

a11,a12,a13,a14,a15

a21,a22,a23,a24,a25

a31,a32,a33,a34,a35

  * 不等式变量(int类型):x1,x2,x3,x4,x5

  * 不等式目标值(double类型):b1,b2,b3

  * 不等式约束(字符串类型):<=,<=,<=

## 输出描述

true或者 false，最大差

## 示例1

输入

    
    
    2.3,3,5.6,7,6;11,3,8.6,25,1;0.3,9,5.3,66,7.8;1,3,2,7,5;340,670,80.6;<=,<=,<=
    

输出

    
    
    false 458
    

说明

> ## 示例2

输入

    
    
    2.36,3,6,7.1,6;1,30,8.6,2.5,21;0.3,69,5.3,6.6,7.8;1,13,2,17,5;340,67,300.6;<=,>=,<=
    

输出

    
    
    false 758
    

说明

> ## 解题思路

#### 题目解读

题目要求你根据一组不等式判断其是否成立，并计算这些不等式中左边表达式和目标值之间的最大差值。具体来说，每个不等式都包含如下内容：

  1. **不等式系数** ：一个二维数组，表示每个变量的系数。
  2. **不等式的变量** ：一个一维数组，表示每个变量的值。
  3. **不等式的目标值** ：一个一维数组，表示每个不等式右边的目标值。
  4. **不等式约束** ：一个字符串数组，表示不等式的关系，只能是 “>”, “>=”, “<”, “<=”, “=” 其中之一。

#### 输入和输出示例

##### 示例 1

**输入：**

    
    
    2.3,3,5.6,7.6;11,3,8.6,25,1;0.3,9,5.3,66,7.8;1,3,2,7,5;340,670,80.6;<=,<=,<=
    

**输出：**

    
    
    false 458
    

**说明：**

  1. **不等式系数** ：

     * 第一行：`2.3, 3, 5.6, 7.6`
     * 第二行：`11, 3, 8.6, 25, 1`
     * 第三行：`0.3, 9, 5.3, 66, 7.8`
  2. **变量** ：`x1=1, x2=3, x3=2, x4=7, x5=5`

  3. **目标值** ：`b1=340, b2=670, b3=80.6`

  4. **不等式关系** ：`<=, <=, <=`

  * 对应的三个不等式为：

    * 2.3 x 1 \+ 3 x 2 \+ 5.6 x 3 \+ 7.6 x 4 \+ 11 x 5 ≤ 340 2.3x_1 + 3x_2 + 5.6x_3 + 7.6x_4 + 11x_5 \leq 340 2.3x1​+3x2​+5.6x3​+7.6x4​+11x5​≤340
    * 11 x 1 \+ 3 x 2 \+ 8.6 x 3 \+ 25 x 4 \+ 1 x 5 ≤ 670 11x_1 + 3x_2 + 8.6x_3 + 25x_4 + 1x_5 \leq 670 11x1​+3x2​+8.6x3​+25x4​+1x5​≤670
    * 0.3 x 1 \+ 9 x 2 \+ 5.3 x 3 \+ 66 x 4 \+ 7.8 x 5 ≤ 80.6 0.3x_1 + 9x_2 + 5.3x_3 + 66x_4 + 7.8x_5 \leq 80.6 0.3x1​+9x2​+5.3x3​+66x4​+7.8x5​≤80.6
  * 计算每个不等式的左侧表达式，判断是否成立，并计算差值：

    * 第一个不等式的左侧值大于340，不成立。
    * 计算差值，并输出最大差值的整数部分（458）。
  * 最后输出 `false` 和最大差值 `458`。

## Java

    
    
    import java.util.Arrays;
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            Scanner sc = new Scanner(System.in);
    
            // 读入不等式
            String[][] arr = Arrays.stream(sc.nextLine().split(";"))
                    .map(s -> s.split(","))
                    .toArray(String[][]::new);
    
            // 将不等式系数转换为 Double 类型的二维数组
            Double[][] matrix = new Double[3][5];
            for (int i = 0; i < 3; i++) {
                matrix[i] = Arrays.stream(arr[i])
                        .map(Double::parseDouble)
                        .toArray(Double[]::new);
            }
    
            // 将不等式的变量转换为 Double 类型的一维数组
            Double[] x = Arrays.stream(arr[3])
                    .map(Double::parseDouble)
                    .toArray(Double[]::new);
    
            // 将不等式的目标值转换为 Double 类型的一维数组
            Double[] b = Arrays.stream(arr[4])
                    .map(Double::parseDouble)
                    .toArray(Double[]::new);
    
            // 将不等式约束转换为字符串数组
            String[] y = arr[5];
    
            // 计算每个不等式的差值
            double[] diffs = new double[3];
            for (int i = 0; i < 3; i++) {
                diffs[i] = dotProduct(matrix[i], x) - b[i];
            }
    
            // 判断所有不等式是否都成立
            boolean flag = compareWithZero(diffs[0], y[0])
                    && compareWithZero(diffs[1], y[1])
                    && compareWithZero(diffs[2], y[2]);
    
            // 计算不等式的最大差值，并输出其整数部分
            double maxDiff = Arrays.stream(diffs)
                    .map(Math::abs)
                    .max()
                    .orElse(0.0);
            System.out.println(flag + " " + (int) Math.floor(maxDiff));
        }
    
        // 计算两个一维数组的点积
        public static double dotProduct(Double[] a, Double[] b) {
            double result = 0.0;
            for (int i = 0; i < a.length; i++) {
                result += a[i] * b[i];
            }
            return result;
        }
    
        // 根据不等式约束判断一个数是否大于、大于等于、小于、小于等于、等于 0
        public static boolean compareWithZero(double val, String constraint) {
            switch (constraint) {
                case ">":
                    return val > 0;
                case ">=":
                    return val >= 0;
                case "<":
                    return val < 0;
                case "<=":
                    return val <= 0;
                case "=":
                    return val == 0;
                default:
                    return false;
            }
        }
    }
    
    
    

## Python

    
    
    import sys
    
    # 计算两个一维数组的点积
    def dotProduct(a, b):
        result = 0.0
        for i in range(len(a)):
            result += a[i] * b[i]
        return result
    
    # 根据不等式约束判断一个数是否大于、大于等于、小于、小于等于、等于 0
    def satisfiesConstraint(val, constraint):
        if constraint == '>':
            return val > 0
        elif constraint == '>=':
            return val >= 0
        elif constraint == '<':
            return val < 0
        elif constraint == '<=':
            return val <= 0
        elif constraint == '=':
            return val == 0
        else:
            return False
    
    # 读入不等式
    for line in sys.stdin:
        arr = [s.split(',') for s in line.strip().split(';')]
    
        # 将不等式系数转换为 Double 类型的二维数组
        matrix = [[float(num) for num in row] for row in arr[:3]]
    
        # 将不等式的变量转换为 Double 类型的一维数组
        x = [float(num) for num in arr[3]]
    
        # 将不等式的目标值转换为 Double 类型的一维数组
        b = [float(num) for num in arr[4]]
    
        # 将不等式约束转换为字符串数组
        y = arr[5]
    
        # 计算每个不等式的差值
        diffs = [dotProduct(matrix[i], x) - b[i] for i in range(3)]
    
        # 判断所有不等式是否都成立
        flag = satisfiesConstraint(diffs[0], y[0]) and satisfiesConstraint(diffs[1], y[1]) and satisfiesConstraint(diffs[2], y[2])
    
        # 计算不等式的最大差值，并输出其整数部分
        maxDiff = int(max([abs(num) for num in diffs]))
        print(str(flag) + ' ' + str(maxDiff))
    
    

## JavaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.on('line', (line) => {
      // 读入不等式
      const arr = line.split(';').map(s => s.split(','));
    
      // 将不等式系数转换为 Double 类型的二维数组
      const matrix = new Array(3).fill(0).map(() => new Array(5));
      for (let i = 0; i < 3; i++) {
        matrix[i] = arr[i].map(parseFloat);
      }
    
      // 将不等式的变量转换为 Double 类型的一维数组
      const x = arr[3].map(parseFloat);
    
      // 将不等式的目标值转换为 Double 类型的一维数组
      const b = arr[4].map(parseFloat);
    
      // 将不等式约束转换为字符串数组
      const y = arr[5];
    
      // 计算每个不等式的差值
      const diffs = new Array(3).fill(0);
      for (let i = 0; i < 3; i++) {
        diffs[i] = dotProduct(matrix[i], x) - b[i];
      }
    
      // 判断所有不等式是否都成立
      const flag = compareWithZero(diffs[0], y[0])
        && compareWithZero(diffs[1], y[1])
        && compareWithZero(diffs[2], y[2]);
    
      // 计算不等式的最大差值，并输出其整数部分
      const maxDiff = Math.max(...diffs.map(Math.abs));
      console.log(flag + ' ' + Math.floor(maxDiff));
    });
    
    // 计算两个一维数组的点积
    function dotProduct(a, b) {
      let result = 0.0;
      for (let i = 0; i < a.length; i++) {
        result += a[i] * b[i];
      }
      return result;
    }
    
    // 根据不等式约束判断一个数是否大于、大于等于、小于、小于等于、等于 0
    function compareWithZero(val, constraint) {
      switch (constraint) {
        case '>':
          return val > 0;
        case '>=':
          return val >= 0;
        case '<':
          return val < 0;
        case '<=':
          return val <= 0;
        case '=':
          return val === 0;
        default:
          return false;
      }
    }
    
    
    

## C++

    
    
    #include <iostream>
    #include <vector>
    #include <sstream>
    #include <algorithm>
    
    using namespace std;
    
    // 计算两个一维数组的点积
    double dotProduct(vector<double>& a, vector<double>& b) {
        double result = 0.0;
        for (int i = 0; i < a.size(); i++) {
            result += a[i] * b[i];
        }
        return result;
    }
    
    // 根据不等式约束判断一个数是否大于、大于等于、小于、小于等于、等于 0
    bool satisfiesConstraint(double val, string constraint) {
        if (constraint == ">") {
            return val > 0;
        }
        else if (constraint == ">=") {
            return val >= 0;
        }
        else if (constraint == "<") {
            return val < 0;
        }
        else if (constraint == "<=") {
            return val <= 0;
        }
        else if (constraint == "=") {
            return val == 0;
        }
        else {
            return false;
        }
    }
    
    int main() {
        string line;
        while (getline(cin, line)) {
            vector<vector<double>> matrix;
            vector<double> x;
            vector<double> b;
            vector<string> y;
            vector<string> arr;
    
            stringstream ss(line);
            string s;
            while (getline(ss, s, ';')) {
                arr.push_back(s);
            }
    
            // 将不等式系数转换为 Double 类型的二维数组
            for (int i = 0; i < 3; i++) {
                vector<double> row;
                stringstream ss2(arr[i]);
                string s2;
                while (getline(ss2, s2, ',')) {
                    row.push_back(stod(s2));
                }
                matrix.push_back(row);
            }
    
            // 将不等式的变量转换为 Double 类型的一维数组
            stringstream ss3(arr[3]);
            string s3;
            while (getline(ss3, s3, ',')) {
                x.push_back(stod(s3));
            }
    
            // 将不等式的目标值转换为 Double 类型的一维数组
            stringstream ss4(arr[4]);
            string s4;
            while (getline(ss4, s4, ',')) {
                b.push_back(stod(s4));
            }
    
            // 将不等式约束转换为字符串数组
            stringstream ss5(arr[5]);
            string s5;
            while (getline(ss5, s5, ',')) {
                y.push_back(s5);
            }
    
            // 计算每个不等式的差值
            vector<double> diffs;
            for (int i = 0; i < 3; i++) {
                diffs.push_back(dotProduct(matrix[i], x) - b[i]);
            }
    
            // 判断所有不等式是否都成立
            bool flag = satisfiesConstraint(diffs[0], y[0]) && satisfiesConstraint(diffs[1], y[1]) && satisfiesConstraint(diffs[2], y[2]);
    
            // 计算不等式的最大差值，并输出其整数部分
            int maxDiff = static_cast<int>(max({ abs(diffs[0]), abs(diffs[1]), abs(diffs[2]) }));
           string  t = (flag == 0 ? "false" : "true");
            cout << t << " " << maxDiff << endl;
        }
        return 0;
    }
    
    

## C语言

    
    
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/e2abea7e3b12b3969aaf02e470e97077.png)

