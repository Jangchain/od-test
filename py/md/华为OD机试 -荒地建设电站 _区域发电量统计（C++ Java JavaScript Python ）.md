#### 题目描述

祖国西北部有一片大片荒地，其中零星的分布着一些湖泊，保护区，矿区;  
整体上常年光照良好，但是也有一些地区光照不太好。  
某电力公司希望在这里建设多个光伏电站，生产清洁能源对每平方公里的土地进行了发电评估，  
其中不能建设的区域发电量为0kw，可以发电的区域根据光照，地形等给出了每平方公里年发电量x千瓦。  
我们希望能够找到其中集中的矩形区域建设电站，能够获得良好的收益。

#### 输入描述

第一行输入为调研的地区长，宽，以及准备建设的电站【长宽相等，为正方形】的边长最低要求的发电量  
之后每行为调研区域每平方公里的发电量

#### 输出描述

输出为这样的区域有多少个

#### 用例

输入| 2 5 2 6  
1 3 4 5 8  
2 3 6 7 1  
---|---  
输出| 4  
说明|
输入含义：调研的区域大小为长2宽5的矩形，我们要建设的电站的边长为2，建设电站最低发电量为6.输出含义：长宽为2的正方形满足发电量大于等于6的区域有4个。  
输入| 2 5 1 6  
1 3 4 5 8  
2 3 6 7 1  
---|---  
输出| 3  
说明| 无  
  
#### 题目解析

参考这篇文章

[探索地块建立](https://picker.blog.csdn.net/article/details/129764472)

![image-20230305113929640](https://i-blog.csdnimg.cn/blog_migrate/a2a377529540ded7f7b7961b5cb218a1.png)

![image-20230305113942246](https://i-blog.csdnimg.cn/blog_migrate/673ea59cdebb777e2616b781311342ad.png)

#### C++

    
    
    #include <iostream>
    #include <vector>
    
    int main() {
        int r, c, s, min;
        std::cin >> r >> c >> s >> min;
    
        std::vector<std::vector<int>> matrix(r, std::vector<int>(c));
        for (int i = 0; i < r; i++) {
            for (int j = 0; j < c; j++) {
                std::cin >> matrix[i][j];
            }
        }
    
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
    
        std::cout << ans << std::endl;
        return 0;
    }
    
    

#### JavaScript

    
    
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
    
    

#### Java

    
    
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
    
    

#### Python

    
    
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

