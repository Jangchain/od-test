## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

祖国西北部有一片大片荒地，其中零星的分布着一些湖泊，保护区，矿区;  
整体上常年光照良好，但是也有一些地区光照不太好。

某电力公司希望在这里建设多个光伏电站，生产清洁能源对每平方公里的土地进行了发电评估，  
其中不能建设的区域发电量为0kw，可以发电的区域根据光照，地形等给出了每平方公里年发电量x千瓦。  
我们希望能够找到其中集中的矩形区域建设电站，能够获得良好的收益。

## 输入描述

第一行输入为调研的地区长，宽，以及准备建设的电站【长宽相等，为正方形】的边长最低要求的发电量  
之后每行为调研区域每平方公里的发电量

## 输出描述

输出为这样的区域有多少个

## 示例1

输入

    
    
    2 5 2 6
    1 3 4 5 8
    2 3 6 7 1
    

输出

    
    
    4
    

说明

> 输入含义：  
>  调研的区域大小为长2宽5的矩形，我们要建设的电站的边长为2，建设电站最低发电量为6.  
>  输出含义：  
>  长宽为2的正方形满足发电量大于等于6的区域有4个。

## 示例2

输入

    
    
    5 1 6
    1 3 4 5 8
    2 3 6 7 1
    

输出

    
    
    3
    

说明

> ## 解题思路

本题可以使用动态规划前缀和思想解题。

解题思路如下：

首先，将每一行在水平方向上选取c个相邻地块进行发电量合并，用例中是2块相邻的地合并![image-20230305113929640](https://i-blog.csdnimg.cn/blog_migrate/a2a377529540ded7f7b7961b5cb218a1.png)

行合并完后，接下来对列进行合并

![image-20230305113942246](https://i-blog.csdnimg.cn/blog_migrate/673ea59cdebb777e2616b781311342ad.png)

样的话，最终得到【9，16，22，21】

其中9，起始就是下图中绿色部分，是一个c*c的区域，9是这个区域的发电量总和。其他的16，22，21也同理。

![image-20230305111558836](https://i-blog.csdnimg.cn/blog_migrate/4eb6d2d4287771051c5dc62d9ed256d5.png)

因此，9，16，22，21每一个都是符合要求发电站发电量>6的区域，因此结果输出4个

## Java

    
    
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            // 输入地区长r，宽c，电站边长s，最低发电量min
            int r = scanner.nextInt();
            int c = scanner.nextInt();
            int s = scanner.nextInt();
            int min = scanner.nextInt();
    
            // 输入每个区域每平方公里的发电量，存入矩阵matrix中
            int[][] matrix = new int[r][c];
            for (int i = 0; i < r; i++) {
                for (int j = 0; j < c; j++) {
                    matrix[i][j] = scanner.nextInt();
                }
            }
    
            // 遍历所有可能的电站位置，计算该位置的矩形区域发电量
            int ans = 0;
            for (int i = s; i <= r; i++) {
                for (int j = s; j <= c; j++) {
                    int square = 0;
                    for (int x = i - s; x < i; x++) {
                        for (int y = j - s; y < j; y++) {
                            square += matrix[x][y];
                        }
                    }
                    if (square >= min) ans++;
                }
            }
    
            // 输出结果
            System.out.println(ans);
        }
    }
    
    

## Python

    
    
    def main():
        r, c, s, min_power = map(int, input().split())  # 输入地区长r，宽c，电站边长s，最低发电量min
    
        # 输入每个区域每平方公里的发电量，存入矩阵matrix中
        matrix = [list(map(int, input().split())) for _ in range(r)]
    
        # 遍历所有可能的电站位置，计算该位置的矩形区域发电量
        ans = 0
        for i in range(s, r + 1):
            for j in range(s, c + 1):
                square = 0
                for x in range(i - s, i):
                    for y in range(j - s, j):
                        square += matrix[x][y]
                if square >= min_power:
                    ans += 1
    
        # 输出结果
        print(ans)
    
    
    if __name__ == "__main__":
        main()
    

## JavaScript

    
    
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    
    let length, width, stationSide, minPower;
    const lines = [];
    
    rl.on("line", (line) => {
      lines.push(line);
    
      if (lines.length === 1) {
        [length, width, stationSide, minPower] = lines[0].split(" ").map(Number);
      }
    
      if (length && lines.length === length + 1) {
        const matrix = lines.slice(1).map(line => line.split(" ").map(Number));
        let ans = 0;
    
        for (let i = stationSide; i <= length; i++) {
          for (let j = stationSide; j <= width; j++) {
            let square = 0;
            for (let x = i - stationSide; x < i; x++) {
              for (let y = j - stationSide; y < j; y++) {
                square += matrix[x][y];
              }
            }
            if (square >= minPower) {
              ans += 1;
            }
          }
        }
    
        console.log(ans);
        rl.close();
      }
    });
    
    

## C++

    
    
    #include <iostream>
    #include <vector>
    using namespace std;
    int main() {
        int r, c, s, min;
        // 输入调研区域的长、宽，正方形电站的边长，以及最低发电量
        cin >> r >> c >> s >> min;
    
        // 创建一个二维矩阵存储每个区域的发电量
        vector<vector<int>> matrix(r, vector<int>(c));
        // 输入矩阵的每个元素，即每个区域的发电量
        for (int i = 0; i < r; i++) {
            for (int j = 0; j < c; j++) {
                cin >> matrix[i][j];
            }
        }
    
        int ans = 0;  // 记录满足条件的正方形区域个数
        // 遍历所有可能的正方形区域
        for (int i = s; i <= r; i++) {
            for (int j = s; j <= c; j++) {
                int square = 0;  // 记录当前正方形区域的总发电量
                // 计算以(i, j)为右下角的正方形的总发电量
                for (int x = i - s; x < i; x++) {
                    for (int y = j - s; y < j; y++) {
                        square += matrix[x][y];
                    }
                }
                // 如果当前正方形区域的总发电量满足最低要求，则计数+1
                if (square >= min) ans++;
            }
        }
    
        // 输出满足条件的正方形区域个数
        cout << ans << endl;
        return 0;
    }
    

## C语言

    
    
    #include <stdio.h>
    
    int main() {
        int r, c, s, min;
        // 输入调研区域的长、宽，正方形电站的边长，以及最低发电量
        scanf("%d %d %d %d", &r, &c, &s, &min);
    
        int matrix[r][c];
        // 输入每个区域的发电量
        for (int i = 0; i < r; i++) {
            for (int j = 0; j < c; j++) {
                scanf("%d", &matrix[i][j]);
            }
        }
    
        int ans = 0;  // 记录满足条件的正方形区域个数
        // 遍历所有可能的正方形区域
        for (int i = s; i <= r; i++) {
            for (int j = s; j <= c; j++) {
                int square = 0;  // 记录当前正方形区域的总发电量
                // 计算以(i, j)为右下角的正方形的总发电量
                for (int x = i - s; x < i; x++) {
                    for (int y = j - s; y < j; y++) {
                        square += matrix[x][y];
                    }
                }
                // 如果当前正方形区域的总发电量满足要求，则计数+1
                if (square >= min) ans++;
            }
        }
    
        // 输出满足条件的正方形区域个数
        printf("%d\n", ans);
        
        return 0;
    }
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b0d8ff6d53693bfcf6e1605b507f3ae3.png)

