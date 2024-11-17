#### 题目描述

给定一个仅包含0和1的N*N二维矩阵，请计算二维矩阵的最大值，计算规则如下：

1、 每行元素按下标顺序组成一个二进制数（下标越大越排在低位），二进制数的值就是该行的值。矩阵各行值之和为矩阵的值。  
2、允许通过向左或向右整体循环移动每行元素来改变各元素在行中的位置。

比如：  
[1,0,1,1,1]向右整体循环移动2位变为[1,1,1,0,1]，二进制数为11101，值为29。  
[1,0,1,1,1]向左整体循环移动2位变为[1,1,1,1,0]，二进制数为11110，值为30。

#### 输入描述

1、输入的第一行为正整数，记录了N的大小，0 < N <= 20。  
2、输入的第2到N+1行为二维矩阵信息，行内元素边角逗号分隔。

#### 输出描述

矩阵的最大值。

##### ACM输入输出模式

如果你经常使用**Leetcode** ,会知道**letcode** 是不需要编写输入输出函数的。但是华为OD机考使用的是 **ACM 模式**
，需要手动编写输入和输出。

所以最好在牛-
客上提前熟悉这种模式。例如C++使用`cin/cout`,python使用`input()/print()`。JavaScript使用node的`readline()`和`console.log()`。Java
使用`sacnner/system.out.print()`

#### 用例

输入

    
    
    5
    1,0,0,0,1
    0,0,0,1,1
    0,1,0,1,0
    1,0,0,1,1
    1,0,1,0,1
    

输出

    
    
    122
    

说明

> 第一行向右整体循环移动1位，得到本行的最大值[1,1,0,0,0]，二进制值为11000，十进制值为24。  
>  第二行向右整体循环移动2位，得到本行的最大值[1,1,0,0,0]，二进制值为11000，十进制值为24。  
>  第三行向左整体循环移动1位，得到本行的最大值[1,0,1,0,0]，二进制值为10100，十进制值为20。  
>  第四行向右整体循环移动2位，得到本行的最大值[1,1,1,0,0]，二进制值为11100，十进制值为28。  
>  第五行向右整体循环移动1位，得到本行的最大值[1,1,0,1,0]，二进制值为11010，十进制值为26。  
>  因此，矩阵的最大值为122。

#### 机考代码查重

华为OD机考完成之后，官方会进行代码查重。**华为 od 机考确实有很大的概率抽到原题**
。如果碰到了题库中的原题，一定不要直接使用题解中的代码，尤其是变量名，一定要修改，可以改成毫无意义的单词。除了变量名之外，代码的组织结构和逻辑一定要进行改变，这就要求在日常的刷题中，提前编写好属于自己的代码。

#### C++

    
    
    #include <iostream>
    #include <sstream>
    #include <vector>
    #include <algorithm>
    using namespace std;
    
    int binarySum(vector<int> arr) {
        stringstream ss;
        for (int num : arr) {
            ss << num;
        }
        string binaryString = ss.str();
        int decimalSum = stoi(binaryString, nullptr, 2);
        return decimalSum;
    }
    
    int main() {
        int n;
        cin >> n;
        vector<string> lines(n);
        for (int i = 0; i < n; i++) {
            cin >> lines[i];
        }
        vector<vector<int>> matrix(n, vector<int>(n));
        for (int i = 0; i < n; i++) {
            vector<string> nums(n);
            size_t pos = 0;
            for (int j = 0; j < n; j++) {
                pos = lines[i].find(",", pos);
                nums[j] = lines[i].substr(pos+1, lines[i].find(",", pos+1)-pos-1);
                pos = lines[i].find(",", pos+1);
            }
            for (int j = 0; j < n; j++) {
                matrix[i][j] = stoi(nums[j]);
            }
        }
       
        int sum = 0;
        for (int i = 0; i < matrix.size(); i++) {
            int maxT = binarySum(matrix[i]);
            if (maxT != 0 && maxT != binarySum(vector<int>(matrix[i].size()))) {
                for (int j = 0; j < matrix[i].size(); j++) {
                    int temp = matrix[i][matrix[i].size()-1];
                    for (int k = matrix[i].size()-1; k > 0; k--) {
                        matrix[i][k] = matrix[i][k-1];
                    }
                    matrix[i][0] = temp;
                    maxT = max(maxT, binarySum(matrix[i]));
                }
            }
            sum += maxV;
        }
    
        cout << sum << endl;
    
        return 0;
    }
    

#### java

    
    
    import java.util.*;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            int n = Integer.parseInt(scanner.nextLine());
            String[] lines = new String[n];
            // 读入矩阵的每一行
            for (int i = 0; i < n; i++) {
                lines[i] = scanner.nextLine();
            }
    
            int[][] matrix = new int[n][n];
            // 将每一行的字符串转换为整型数组
            for (int i = 0; i < n; i++) {
                String[] nums = lines[i].split(",");
                for (int j = 0; j < n; j++) {
                    matrix[i][j] = Integer.parseInt(nums[j]);
                }
            }
    
            int sum = 0;
    
            for (int i = 0; i < matrix.length; i++) {
                // 计算当前行的最大值
                int max = binarySum(matrix[i]);
    
                // 如果当前行的最大值不为0且不为全0，则尝试循环移动每个元素，重新计算最大值
                if (max != 0 && max != binarySum(new int[matrix[i].length])) {
                    for (int j = 0; j < matrix[i].length; j++) {
                        int temp = matrix[i][matrix[i].length-1];
                        for (int k = matrix[i].length-1; k > 0; k--) {
                            matrix[i][k] = matrix[i][k-1];
                        }
                        matrix[i][0] = temp;
                        max = Math.max(max, binarySum(matrix[i]));
                    }
                }
    
                sum += max;
            }
    
            System.out.println(sum);
        }
    
        // 将二进制数组转换为十进制数
        public static int binarySum(int[] arr) {
            return Integer.parseInt(Arrays.stream(arr)
                    .collect(StringBuilder::new, StringBuilder::append, StringBuilder::append)
                    .toString(), 2);
        }
    }
    

#### javaScript

    
    
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    let n = 0;
    let lines = [];
    
    rl.on('line', (line) => {
      if (n === 0) {
        n = parseInt(line.trim());
      } else {
        lines.push(line.trim());
        if (lines.length === n) {
          const matrix = lines.map(line => line.split(',').map(num => parseInt(num)));
          console.log(maxMatrixSum(matrix));
          rl.close();
        }
      }
    });
    
    function maxMatrixSum(matrix) {
      let sum = 0;
    
      for (let i = 0; i < matrix.length; i++) {
        let maxT = binarySum(matrix[i]);
    
        if (maxT !== 0 && maxT !== binarySum(new Array(matrix[i].length).fill(0))) {
          for (let j = 0; j < matrix[i].length; j++) {
            let temp = matrix[i][matrix[i].length - 1];
            for (let k = matrix[i].length - 1; k > 0; k--) {
              matrix[i][k] = matrix[i][k - 1];
            }
            matrix[i][0] = temp;
            maxT = Math.max(maxT, binarySum(matrix[i]));
          }
        }
    
        sum += maxT;
      }
    
      return sum;
    }
    
    function binarySum(arr) {
      return parseInt(arr.join(''), 2);
    }
    
    

#### python

    
    
    def binarySum(arr):
        return int(''.join(map(str, arr)), 2)
    n = int(input())
    lines = []
    for i in range(n):
        lines.append(input())
    
    matrix = []
    for i in range(n):
        nums = lines[i].split(",")
        row = []
        for j in range(n):
            row.append(int(nums[j]))
        matrix.append(row)
    sum = 0
    for i in range(len(matrix)):
        maxT = binarySum(matrix[i])
        if maxT != 0 and maxT != binarySum([0]*len(matrix[i])):
            for j in range(len(matrix[i])):
                temp = matrix[i][len(matrix[i])-1]
                for k in range(len(matrix[i])-1, 0, -1):
                    matrix[i][k] = matrix[i][k-1]
                matrix[i][0] = temp
                maxT = max(maxT, binarySum(matrix[i]))
        sum += maxT
    
    print(sum)
    

> #### 文章目录
>
>   *     *       * 题目描述
>       * 输入描述
>       * 输出描述
>       *         * ACM输入输出模式
>       * 用例
>       * 机考代码查重
>       * C++
>       * java
>       * javaScript
>       * python
>       * 完整用例
>       *         * 用例1
>         * 用例2
>         * 用例3
>         * 用例4
>         * 用例5
>         * 用例6
>         * 用例7
>         * 用例8
>         * 用例9
>         * 用例10
>

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

#### 完整用例

##### 用例1

    
    
    5
    1,0,0,0,1
    0,0,0,1,1
    0,1,0,1,0
    1,0,0,1,1
    1,0,1,0,1
    

##### 用例2

    
    
    3
    1,0,1
    0,1,0
    1,0,1
    

##### 用例3

    
    
    4
    1,0,0,1
    0,1,1,0
    0,1,1,0
    1,0,0,1
    

##### 用例4

    
    
    2
    1,1
    0,0
    

##### 用例5

    
    
    2
    0,0
    1,1
    

##### 用例6

    
    
    6
    1,0,1,1,0,1
    0,1,0,1,0,1
    1,0,1,0,1,0
    0,1,0,1,0,1
    1,0,1,0,1,0
    0,1,0,1,0,1
    

##### 用例7

    
    
    5
    1,0,1,0,1
    0,1,0,1,0
    1,0,1,0,1
    0,1,0,1,0
    1,0,1,0,1
    

##### 用例8

    
    
    4
    1,0,1,0
    0,1,0,1
    1,0,1,0
    0,1,0,1
    

##### 用例9

    
    
    3
    1,0,1
    0,1,0
    1,0,1
    

##### 用例10

    
    
    6
    1,1,1,1,1,1
    0,0,0,0,0,0
    1,1,1,1,1,1
    0,0,0,0,0,0
    1,1,1,1,1,1
    0,0,0,0,0,0
    

