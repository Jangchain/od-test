#### 题目描述

[幻方](https://so.csdn.net/so/search?q=%E5%B9%BB%E6%96%B9&spm=1001.2101.3001.7020)（Magic
Square）是一个由1~N²，共N²个整数构成的N*N矩阵，满足每行、列和对角线上的数字和相等。

上回你已经帮助小明将写错一个数字的幻方进行了修复，小明在感谢之余也想进一步试试你的水平，于是他准备了有两个数字发生了位置交换的幻方。

你可以把这两个交换的数字找出来并且改正吗？

#### 输入描述

第一行输入一个整数N，代表带校验幻方的阶数（3 ≤ N ＜ 50）

接下来的N行，每行N个整数，空格隔开（1 ≤ 每个整数 ≤ N²）

#### 输出描述

输出两行，代表两条纠正信息，注意先输出行号小的，若行号相同则先输出列好小的

每行输出空格隔开的三个整数，分别是：出错行号、出错列号、应填入的数字（末尾无空格）

#### 用例

输入| 3  
8 1 9  
3 5 7  
4 6 2  
---|---  
输出| 1 3 6  
3 2 9  
说明| 无  
  
#### 题目解析

本题是一个矩阵操作题，需要读入一个  n n n 阶矩阵，判断其中哪两个数字位置交换了，并将其交换回来。

首先，需要计算每一行和每一列的和，并将其存储下来。由于幻方的特殊性质，每一行、每一列和对角线上的数字和相等，因此可以计算出每行、每列、每条对角线上数字之和的目标值
t a r g e t target target，判断每行、每列的和是否等于  t a r g e t target
target，如果不等于则说明该行或该列有数字位置交换了。

接下来，需要找到交换位置的两个数字。如果有两行的和不等于  t a r g e t target
target，则需要找到两个数字，分别在这两行中交换位置。如果有两列的和不等于  t a r g e t target
target，则需要找到两个数字，分别在这两列中交换位置。

由于需要找到两个数字，因此需要使用双重循环，遍历整个矩阵，找到符合条件的两个数字。具体来说，对于两行的情况，需要遍历第一行中的每一个数字，同时在第二行中查找一个数字，使得将第一个数字和第二个数字交换位置后，第一行和第二行的数字之和都等于
t a r g e t target
target；对于两列的情况，需要遍历第一列中的每一个数字，同时在第二列中查找一个数字，使得将第一个数字和第二个数字交换位置后，第一列和第二列的数字之和都等于
t a r g e t target target。

找到两个数字后，将其交换位置即可。输出时需要注意，先输出行号小的，若行号相同则先输出列号小的。每行输出空格隔开的三个整数，分别是：出错行号、出错列号、应填入的数字。

#### C++

    
    
    #include <iostream>
    #include <vector>
    #include <algorithm>
    using namespace std;
    
    int main() {
        // 处理输入
        int n;
        cin >> n;
        int matrix[n][n]; // 定义一个n行n列的矩阵
        int line_sum[n]; // 定义一个长度为n的一维数组，存储每一行的和
        int col_sum[n]; // 定义一个长度为n的一维数组，存储每一列的和
        // 初始化
        for (int i = 0; i < n; i++) {
            line_sum[i]=0;
            col_sum[i]=0;
        }
        // 读入矩阵并计算行列和
        for (int i = 0; i < n; i++) { // 循环n次，读入每一行的n个数
            for (int j = 0; j < n; j++) { // 循环n次，读入每一列的数
                int num;
                cin >> num;
                matrix[i][j] = num; // 将读入的数存储到矩阵中
                line_sum[i] += num; // 将读入的数加入到该行的和中
                col_sum[j] += num; // 将读入的数加入到该列的和中
            }
        }
     
        // 必然只有两行或者两列的和不等于target
        vector<int> error_lines; // 定义一个vector，存储和不等于target的行的索引
        vector<int> error_cols; // 定义一个vector，存储和不等于target的列的索引
        int target = n*(n*n+1)/2; // 计算出每行每列的和应该是多少
        for (int i=0;i<n;i++) { // 循环n次，判断每一行每一列的和是否等于target
            if (line_sum[i] != target) { // 如果不等于target，将该行的索引存入error_lines中
                error_lines.push_back(i);
            }
            if (col_sum[i] != target) { // 如果不等于target，将该列的索引存入error_cols中
                error_cols.push_back(i);
            }
        }
     
        if (error_lines.size()==2){ // 如果有两行的和不等于target
            for (int i=0;i<n;i++){ // 循环n^2次，找到符合条件的两个数
                for (int j=0;j<n;j++) {
                    if(line_sum[error_lines[0]]-matrix[error_lines[0]][i] + matrix[error_lines[1]][j] == target) {
                        cout<<(error_lines[0] + 1) << " " << (i + 1) << " " << matrix[error_lines[1]][j]<<endl;
                        cout<<(error_lines[1] + 1) << " " << (j + 1) << " " << matrix[error_lines[0]][i]<<endl;
                        return 0;
                    }
                }
            }
        } else if (error_cols.size()==2){ // 如果有两列的和不等于target
            for (int i=0;i<n;i++){ // 循环n^2次，找到符合条件的两个数
                for (int j=0;j<n;j++) {
                    if(col_sum[error_cols[0]]-matrix[i][error_cols[0]] + matrix[j][error_cols[1]] == target) {
                        cout<<(i + 1) << " " << (error_cols[0] + 1) << " " << matrix[j][error_cols[1]]<<endl;
                        cout<<(j + 1) << " " << (error_cols[1] + 1) << " " << matrix[i][error_cols[0]]<<endl;
                        return 0;
                    }
                }
            }
        }
        
        return 0;
    }
    

#### JavaScript

    
    
    const readline = require("readline");
     
    // 创建readline接口实例
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    
    // 存储输入的数据
    const lines = [];
    let n, matrix;
    
    // 监听输入的每一行数据
    rl.on("line", (line) => {
      lines.push(line);
     
      // 如果是第一行，获取阶数n
      if (lines.length == 1) {
        n = parseInt(lines[0]);
      }
     
      // 如果已经获取了阶数n且输入的数据行数等于n，处理数据
      if (n && lines.length == n + 1) {
        lines.shift(); // 去除第一行的阶数n
        matrix = lines.map((line) => line.split(" ").map(Number)); // 将输入的字符串数字转为数字类型
    
        const lineSum = new Array(n).fill(0); // 存储每行的数字和
        const colSum = new Array(n).fill(0); // 存储每列的数字和
        const target = n * (n * n + 1) / 2; // 幻方每行、每列、每个对角线的数字和都相等，计算出这个数字和
        let linesT = []; // 存储和不等于target的行号
        let cols = []; // 存储和不等于target的列号
    
        // 计算每行、每列的数字和
        for (let i = 0; i < n; i++) {
          for (let j = 0; j < n; j++) {
            lineSum[i] += matrix[i][j];
            colSum[j] += matrix[i][j];
          }
        }
    
        // 找出和不等于target的行和列
        for (let i = 0; i < n; i++) {
          if (lineSum[i] != target) {
            linesT.push(i);
          }
          if (colSum[i] != target) {
            cols.push(i);
          }
        }
    
        // 如果有两行的和不等于target，说明两个数字交换的位置在同一行，需要在该行中找出这两个数字并输出纠正信息
        if (linesT.length === 2){
          for (let i = 0; i < n; i++){
            for (let j = 0; j < n; j++) {
              if (lineSum[linesT[0]] - matrix[linesT[0]][i] + matrix[linesT[1]][j] === target) {
                console.log(`${linesT[0] + 1} ${i + 1} ${matrix[linesT[1]][j]}`);
                console.log(`${linesT[1] + 1} ${j + 1} ${matrix[linesT[0]][i]}`);
                return;
              }
            }
          }
        } 
        // 如果有两列的和不等于target，说明两个数字交换的位置在同一列，需要在该列中找出这两个数字并输出纠正信息
        else if (cols.length === 2) {
          for (let i = 0; i < n; i++){
            for (let j = 0; j < n; j++) {
              if (colSum[cols[0]] - matrix[i][cols[0]] + matrix[j][cols[1]] === target) {
                console.log(`${i + 1} ${cols[0] + 1} ${matrix[j][cols[1]]}`);
                console.log(`${j + 1} ${cols[1] + 1} ${matrix[i][cols[0]]}`);
                return;
              }
            }
          }
        }
    
        // 重置lines数组，等待下一次输入
        lines.length = 0;
      }
    });
    
    

#### Java

    
    
    import java.util.Scanner;
    import java.util.Vector;
    
    public class Main {
        public static void main(String[] args) {
            Scanner input = new Scanner(System.in);
            int n = input.nextInt();
            int[][] matrix = new int[n][n];
            int[] line_sum = new int[n];
            int[] col_sum = new int[n];
            for (int i = 0; i < n; i++) {
                line_sum[i] = 0;
                col_sum[i] = 0;
            }
            for (int i = 0; i < n; i++) {
                for (int j = 0; j < n; j++) {
                    int num = input.nextInt();
                    matrix[i][j] = num;
                    line_sum[i] += num;
                    col_sum[j] += num;
                }
            }
            Vector<Integer> error_lines = new Vector<Integer>();
            Vector<Integer> error_cols = new Vector<Integer>();
            int target = n * (n * n + 1) / 2;
            for (int i = 0; i < n; i++) {
                if (line_sum[i] != target) {
                    error_lines.add(i);
                }
                if (col_sum[i] != target) {
                    error_cols.add(i);
                }
            }
            if (error_lines.size() == 2) {
                for (int i = 0; i < n; i++) {
                    for (int j = 0; j < n; j++) {
                        if (line_sum[error_lines.get(0)] - matrix[error_lines.get(0)][i]
                                + matrix[error_lines.get(1)][j] == target) {
                            System.out.println((error_lines.get(0) + 1) + " " + (i + 1) + " " + matrix[error_lines.get(1)][j]);
                            System.out.println((error_lines.get(1) + 1) + " " + (j + 1) + " " + matrix[error_lines.get(0)][i]);
                            return;
                        }
                    }
                }
            } else if (error_cols.size() == 2) {
                for (int i = 0; i < n; i++) {
                    for (int j = 0; j < n; j++) {
                        if (col_sum[error_cols.get(0)] - matrix[i][error_cols.get(0)]
                                + matrix[j][error_cols.get(1)] == target) {
                            System.out.println((i + 1) + " " + (error_cols.get(0) + 1) + " " + matrix[j][error_cols.get(1)]);
                            System.out.println((j + 1) + " " + (error_cols.get(1) + 1) + " " + matrix[i][error_cols.get(0)]);
                            return;
                        }
                    }
                }
            }
        }
    }
    

#### Python

    
    
    n = int(input())
    matrix = [[0]*n for i in range(n)]
    line_sum = [0]*n
    col_sum = [0]*n
    
    # 读入矩阵并计算行列和
    for i in range(n):
        line = input().split()
        for j in range(n):
            matrix[i][j] = int(line[j])
            line_sum[i] += matrix[i][j]
            col_sum[j] += matrix[i][j]
    
    # 必然只有两行或者两列的和不等于target
    error_lines = []
    error_cols = []
    target = n*(n*n+1)//2
    for i in range(n):
        if line_sum[i] != target:
            error_lines.append(i)
        if col_sum[i] != target:
            error_cols.append(i)
    
    if len(error_lines) == 2:
        for i in range(n):
            for j in range(n):
                if line_sum[error_lines[0]]-matrix[error_lines[0]][i] + matrix[error_lines[1]][j] == target:
                    print(error_lines[0]+1, i+1, matrix[error_lines[1]][j])
                    print(error_lines[1]+1, j+1, matrix[error_lines[0]][i])
                    exit()
    elif len(error_cols) == 2:
        for i in range(n):
            for j in range(n):
                if col_sum[error_cols[0]]-matrix[i][error_cols[0]] + matrix[j][error_cols[1]] == target:
                    print(i+1, error_cols[0]+1, matrix[j][error_cols[1]])
                    print(j+1, error_cols[1]+1, matrix[i][error_cols[0]])
                    exit()
    
    

#### 文章目录

  *     *       * 题目描述
      * 输入描述
      * 输出描述
      * 用例
      * 题目解析
      * C++
      * JavaScript
      * Java
      * Python

![fengmian](https://img-
blog.csdnimg.cn/img_convert/1d2f33ed8cf2fb1b9a4fe09513f7aa94.png)

