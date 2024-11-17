#### 题目描述

有一个二维的天线矩阵，每根天线可以向其他天线发射信号，也能接收其他天线的信号，为了简化起见，我们约定每根天线只能向东和向南发射信号，换言之，每根天线只能接收东向或南向的信号。

每根天线有自己的高度anth，每根天线的高度存储在一个二维数组中，各个天线的位置用[r,
c]表示，r代表天线的行位置（从0开始编号），c代表天线的列位置（从0开始编号）。

在某一方向（东向或南向），某根天线可以收到多根其他天线的信号（也可能收不到任何其他天线的信号），对任一天线X和天线Y，天线X能接收到天线Y的条件是：

  1. 天线X在天线Y的东边或南边
  2. 天线X和天线Y之间的其他天线的高度都低于天线X和天线Y，或天线X和天线Y之间无其他天线，即无遮挡。

如下图示意：

![](https://i-blog.csdnimg.cn/blog_migrate/888c3af4dba7160f9f738769da849134.png)

在天线矩阵的第0行上：

  * 天线[0, 0]接收不到任何其他天线的信号，
  * 天线[0, 1]可以接收到天线[0, 0]的信号，
  * 天线[0, 2]可以接收到天线[0, 1]的信号，
  * 天线[0, 3]可以接收到天线[0, 1]和天线[0, 2]的信号，
  * 天线[0, 4]可以接收到天线[0, 3]的信号，
  * 天线[0, 5]可以接收到天线[0, 4]的信号；

在天线的第0列上：

  * 天线[0, 0]接收不到任何其他天线的信号，
  * 天线[1, 0]可以接收到天线[0, 0]的信号，
  * 天线[2, 0]可以接收到天线[1, 0]的信号，
  * 天线[3, 0]可以接收到天线[1, 0]和天线[2, 0]的信号，
  * 天线[4, 0]可以接收到天线[3, 0]的信号，
  * 天线[5, 0]可以接收到天线[3, 0]和天线[4, 0]的信号；

给一个m行n列的矩阵（二维数组），矩阵存储各根天线的高度，求出每根天线可以接收到多少根其他天线的信号，结果输出到m行n列的矩阵（二维矩阵）中。

#### 输入描述

输入为1个m行n列的矩阵（二维矩阵）anth[m][n]，矩阵存储各根天线的高度，高度值anth[r]][c]为大于0的整数。

第一行为输入矩阵的行数和列数，如：

m n

第二行为输入矩阵的元素值，按行输入，如：

anth[0][0] anth[0][1] … anth[0][n-1] anth[1][0] anth[1][1] … anth[1][n-1] …
anth[m-1][0] … anth[m-1][n-1]

#### 输出描述

输出一个m行n列的矩阵（二维数组）ret[m][n]，矩阵存储每根天线能收到多少根其他天线的信号，根数为ret[r][c]。

第一行为输出矩阵的行数和列数，如:

m n

第二行为输出矩阵的元素值，按行输出，如：

ret[0][0] ret[0][1] … ret[0][n-1] ret[1][0] ret[1][1] … ret[1][n-1] …
ret[m-1][0] … ret[m-1][n-1]

#### 备注

  * 1 ≤ m ≤ 500
  * 1 ≤ n ≤ 500
  * 0 ＜ anth[r][c] ＜ 10^5

#### 用例

输入| 1 6  
2 4 1 5 3 3  
---|---  
输出| 1 6  
0 1 1 2 1 1  
说明| 输入为1行6列的天线矩阵的高度值[2 4 1 5 3 3]输出为1行6列的结果矩阵[0 1 1 2 1 1]  
输入| 2 6  
2 5 4 3 2 8 9 7 5 10 10 3  
---|---  
输出| 2 6  
0 1 1 1 1 4 1 2 2 4 2 2  
说明| 输入为2行6列的天线矩阵高度值[2 5 4 3 2 8][9 7 5 10 10 3]输出为2行6列的结果矩阵[0 1 1 1 1 4][1 2 2
4 2 2]  
  
#### 题目解析

m,n 都不大，可以直接暴力法解决问题。

按照题目要求的东向和南向直接暴力遍历每一对天线组合，判定是否能够接收到信号即可。

#### C++

    
    
    #include<iostream>
    #include<vector>
    using namespace std;
    
    //向西遍历判断，计算东向信号接收数
    int calcEast(vector<vector<int>> antennas, int i, int j){
        //第0根天线肯定无法接收信号
        if(j == 0) return 0;
        
        int maxHeight = antennas[i][j-1]; 
        // 当前天线的西侧第一根天线必然可以接收
        int count = 1; 
     
        for(int k=j-2; k>=0; k--){
            if(maxHeight >= antennas[i][j]){ 
                break;
            }
            if(antennas[i][k] > maxHeight){  
                count++;
                maxHeight = antennas[i][k];
            }
        }
     
        return count;
    }
    
    //向北遍历判断，计算南向信号接收数
    int calcSouth(vector<vector<int>> antennas, int i, int j){
        //第0根天线肯定无法接收信号
        if(i == 0) return 0;
     
        int maxHeight = antennas[i-1][j];  
        // 当前天线的北侧第一根天线必然可以接收
        int count = 1;    
     
        for(int k=i-2; k>=0; k--){
            if(maxHeight >= antennas[i][j]){  
                break;
            }
            if(antennas[k][j] > maxHeight){   
                count++;
                maxHeight = antennas[k][j];
            }
        }
     
        return count;
    }
     
     
    int main() {
        // 处理输入
        int rowCount, colCount;
        cin >> rowCount >> colCount;
        
        vector<vector<int>> antennas;
        for (int i = 0; i < rowCount; i++) {
            vector<int> temp;
            for (int j = 0; j < colCount; j++) {
                int height;
                cin >> height;
                temp.push_back(height);
            }
            antennas.push_back(temp);
        }
     
        //遍历每一个天线
        vector<int> res;
        for(int i=0; i<rowCount; i++){
            for(int j=0; j<colCount; j++){
                res.push_back(calcSouth(antennas, i, j) + calcEast(antennas, i, j));
            }
        }
     
        // 输出
        cout << rowCount << " " << colCount << endl;
        for (int i=0; i<res.size(); i++) {
            if (i != res.size()-1) {
                cout << res[i] << " ";
            } else {
                cout << res[i];
            }
        }
        return 0;
    }
    
    

#### 文章目录

  *     *       * 题目描述
      * 输入描述
      * 输出描述
      * 备注
      * 用例
      * 题目解析
      * C++

![fengmian](https://img-
blog.csdnimg.cn/img_convert/1d2f33ed8cf2fb1b9a4fe09513f7aa94.png)

