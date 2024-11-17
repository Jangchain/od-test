#### 题目描述

如果矩阵中的许多系数都为零，那么该矩阵就是稀疏的。对稀疏现象有兴趣是因为它的开发可以带来巨大的计算节省，并且在许多大的实践中都会出现矩阵稀疏的问题。

给定一个矩阵，现在需要逐行和逐列地扫描矩阵，如果某一行或者某一列内，存在连续出现的0的个数超过了行宽或者列宽的一半 [W /2] (整除)
，则认为该行或者该列是稀疏的。

扫描给定的矩阵，输出稀疏的行数和列数。

#### 输入描述

第一行输入为M和N，表示矩阵的大小M*N，0 ＜ M ≤ 100，0 ＜ N ≤ 100

接下来M行输入为矩阵的成员，每行N个成员，矩阵成员都是有符号整数，范围-32,768到32,767

#### 输出描述

输出两行，第一行表示稀疏行的个数，第二行表示稀疏列的个数

##### ACM输入输出模式

如果你经常使用**Leetcode** ,会知道**letcode** 是不需要编写输入输出函数的。但是华为OD机考使用的是 **ACM 模式**
，需要手动编写输入和输出。

所以最好在牛-
客上提前熟悉这种模式。例如C++使用`cin/cout`,python使用`input()/print()`。JavaScript使用node的`readline()`和`console.log()`。Java
使用`sacnner/system.out.print()`

#### 用例1

输入

    
    
    3 3
    1 0 0
    0 1 0
    0 0 1
    

输出

    
    
    3
    3
    

> 给定的3*3矩阵里，每一行和每一列内都存在2个0，行宽3，列宽3，[3/2] = 1，因此稀疏行有3个，稀疏列有3个。

#### 用例2

输入

    
    
    5 3
    -1 0 1
    0 0 0
    -1 0 0
    0 -1 0
    0 0 0
    

输出

    
    
    5
    3
    

> 给定的5*3矩阵，每行里面0的个数大于等于1表示稀疏行，每列里面0的个数大于等于2表示稀疏行，所以有5个稀疏行,3个稀疏列。

#### 解题思路

根据题目要求，如果某一行或某一列中连续出现的0的个数超过了行宽或列宽的一半（整除），则该行或该列被认为是稀疏的。

然而，在用例中确认稀疏行和稀疏列时，并不是基于连续0的个数。

根据已考过的同学反馈，这里以用例为准。

首先，根据输入描述，我们需要先读取矩阵的大小M和N，然后创建两个数组rowZeroCount和colZeroCount，分别用于记录每一行和每一列中0的个数。

接下来，我们需要使用两个嵌套的循环来遍历矩阵的每一个元素。对于每一个元素，如果它的值为0，就将相应的行和列的计数器加1。

在循环结束后，我们
筛选出满足条件的计数器的个数。对于rowZeroCount数组，我们要找出其中大于等于n/2的元素个数；对于colZeroCount数组，我们要找出其中大于等于m/2的元素个数。

最后，我们将得到的结果打印输出即可。

整体的代码思路如下：

  1. 读取矩阵的大小M和N；
  2. 创建两个数组rowZeroCount和colZeroCount，用于记录每一行和每一列中0的个数；
  3. 使用两个嵌套的循环遍历矩阵的每一个元素，如果元素的值为0，则将相应的行和列的计数器加1；
  4. 法筛选出满足条件的计数器的个数；
  5. 打印输出满足条件的行数和列数。

#### 机考代码查重

华为OD机考完成之后，官方会进行代码查重。**华为 od 机考确实有很大的概率抽到原题**
。如果碰到了题库中的原题，一定不要直接使用题解中的代码，尤其是变量名，一定要修改，可以改成毫无意义的单词。除了变量名之外，代码的组织结构和逻辑一定要进行改变，这就要求在日常的刷题中，提前编写好属于自己的代码。

#### Java

    
    
    import java.util.Scanner;
    
    public class Main {
      public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
    
        // 输入矩阵的大小
        int rowCount = scanner.nextInt(); // 矩阵的行数
        int colCount = scanner.nextInt(); // 矩阵的列数
    
        // 用于记录每一行和每一列中0的个数
        int[] rowZeroCount = new int[rowCount]; // 记录每一行中0的个数
        int[] colZeroCount = new int[colCount]; // 记录每一列中0的个数
    
        // 扫描矩阵，统计每一行和每一列中0的个数
        for (int i = 0; i < rowCount; i++) {
          for (int j = 0; j < colCount; j++) {
            int num = scanner.nextInt(); // 输入矩阵中的成员
            if (num == 0) {
              rowZeroCount[i]++; // 如果成员为0，则该行的0的个数加1
              colZeroCount[j]++; // 如果成员为0，则该列的0的个数加1
            }
          }
        }
    
        // 统计稀疏行的个数
        int sparseRowCount = 0; // 记录稀疏行的个数
        for (int i = 0; i < rowCount; i++) {
          if (rowZeroCount[i] >= colCount / 2) { // 如果该行的0的个数超过了列宽的一半
            sparseRowCount++; // 稀疏行的个数加1
          }
        }
    
        // 统计稀疏列的个数
        int sparseColCount = 0; // 记录稀疏列的个数
        for (int j = 0; j < colCount; j++) {
          if (colZeroCount[j] >= rowCount / 2) { // 如果该列的0的个数超过了行宽的一半
            sparseColCount++; // 稀疏列的个数加1
          }
        }
    
        // 输出稀疏行的个数和稀疏列的个数
        System.out.println(sparseRowCount); // 输出稀疏行的个数
        System.out.println(sparseColCount); // 输出稀疏列的个数
      }
    }
    
    

#### C++

    
    
    #include <iostream>
    using namespace std;
    
    int main() {
      // 输入矩阵的大小
      int rowCount, colCount;
      cin >> rowCount >> colCount;
    
      // 用于记录每一行和每一列中0的个数
      int* rowZeroCount = new int[rowCount]; // 记录每一行中0的个数
      int* colZeroCount = new int[colCount]; // 记录每一列中0的个数
    
      // 扫描矩阵，统计每一行和每一列中0的个数
      for (int i = 0; i < rowCount; i++) {
        for (int j = 0; j < colCount; j++) {
          int num;
          cin >> num; // 输入矩阵中的成员
          if (num == 0) {
            rowZeroCount[i]++; // 如果成员为0，则该行的0的个数加1
            colZeroCount[j]++; // 如果成员为0，则该列的0的个数加1
          }
        }
      }
    
      // 统计稀疏行的个数
      int sparseRowCount = 0; // 记录稀疏行的个数
      for (int i = 0; i < rowCount; i++) {
        if (rowZeroCount[i] >= colCount / 2) { // 如果该行的0的个数超过了列宽的一半
          sparseRowCount++; // 稀疏行的个数加1
        }
      }
    
      // 统计稀疏列的个数
      int sparseColCount = 0; // 记录稀疏列的个数
      for (int j = 0; j < colCount; j++) {
        if (colZeroCount[j] >= rowCount / 2) { // 如果该列的0的个数超过了行宽的一半
          sparseColCount++; // 稀疏列的个数加1
        }
      }
    
      // 输出稀疏行的个数和稀疏列的个数
      cout << sparseRowCount << endl; // 输出稀疏行的个数
      cout << sparseColCount << endl; // 输出稀疏列的个数
    
      delete[] rowZeroCount;
      delete[] colZeroCount;
    
      return 0;
    }
    

#### JavaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    let m, n;
    let matrix = [];
    
    rl.on('line', (line) => {
      if (!m) {
        [m, n] = line.split(' ').map(Number);
        return;
      }
      matrix.push(line.split(' ').map(Number));
    }).on('close', () => {
       let rowZeroCount = new Array(m).fill(0);
      let colZeroCount = new Array(n).fill(0);
    
      for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
          if (matrix[i][j] === 0) {
            rowZeroCount[i]++;
            colZeroCount[j]++;
          }
        }
      }
    
     
        let sparseRowCount = 0;
        for (let i = 0; i < m; i++) {
          if (rowZeroCount[i] >= Math.floor( n / 2)) {
            sparseRowCount++;
          }
        }
    
        let sparseColCount = 0;
        for (let j = 0; j < n; j++) {
          if (colZeroCount[j] >=  Math.floor( m / 2)) {
            sparseColCount++;
          }
        }
    
        console.log(sparseRowCount);
        console.log(sparseColCount);
    });
    

#### Python

    
    
     
    rowCount, colCount = map(int, input().split())
    matrix = []
    for i in range(rowCount):
        row = list(map(int, input().split()))
        matrix.append(row)
    
    rowZeroCount = [0] * rowCount
    colZeroCount = [0] * colCount
    
    for i in range(rowCount):
        for j in range(colCount):
            if matrix[i][j] == 0:
                rowZeroCount[i] += 1
                colZeroCount[j] += 1
    
     # 统计稀疏行的个数
    sparseRowCount = 0 # 记录稀疏行的个数
    for i in range(rowCount):
      if rowZeroCount[i] >= colCount / 2: # 如果该行的0的个数超过了列宽的一半
        sparseRowCount += 1 # 稀疏行的个数加1
    
    # 统计稀疏列的个数
    sparseColCount = 0 # 记录稀疏列的个数
    for j in range(colCount):
      if colZeroCount[j] >= rowCount / 2: # 如果该列的0的个数超过了行宽的一半
        sparseColCount += 1 # 稀疏列的个数加1
    
    # 输出稀疏行的个数和稀疏列的个数
    print(sparseRowCount) # 输出稀疏行的个数
    print(sparseColCount) # 输出稀疏列的个数
    
    
    

> #### 文章目录
>
>   *     *       * 题目描述
>       * 输入描述
>       * 输出描述
>       *         * ACM输入输出模式
>       * 用例1
>       * 用例2
>       * 解题思路
>       * 机考代码查重
>       * Java
>       * C++
>       * JavaScript
>       * Python
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

    
    
    3 3
    1 0 0
    0 1 0
    0 0 1
    

##### 用例2

    
    
    4 4
    0 0 0 0
    0 0 0 0
    0 0 0 0
    0 0 0 0
    

##### 用例3

    
    
    2 2
    1 0
    0 1
    

##### 用例4

    
    
    3 4
    1 0 0 0
    0 1 0 0
    0 0 1 0
    

##### 用例5

    
    
    4 3
    1 0 0
    0 1 0
    0 0 1
    0 0 0
    

##### 用例6

    
    
    10 10
    0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0
    

##### 用例7

    
    
    7 7
    1 0 0 0 0 0 0
    0 1 0 0 0 0 0
    0 0 1 0 0 0 0
    0 0 0 1 0 0 0
    0 0 0 0 1 0 0
    0 0 0 0 0 1 0
    0 0 0 0 0 0 1
    

##### 用例8

    
    
    5 8
    1 0 0 0 0 0 0 0
    0 1 0 0 0 0 0 0
    0 0 1 0 0 0 0 0
    0 0 0 1 0 0 0 0
    0 0 0 0 1 0 0 0
    

##### 用例9

    
    
    6 6
    1 0 0 0 0 0
    0 1 0 0 0 0
    0 0 1 0 0 0
    0 0 0 1 0 0
    0 0 0 0 1 0
    0 0 0 0 0 1
    

##### 用例10

    
    
    8 5
    1 0 0 0 0
    1 1 1 1 1
    0 0 1 0 0
    0 0 0 1 0
    0 0 0 0 0
    0 0 0 0 0
    0 0 0 0 0
    0 0 0 0 0
    

