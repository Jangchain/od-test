#### 题目描述

给航天器一侧加装长方形或正方形的太阳能板（图中的红色斜线区域），需要先安装两个支柱（**图中的黑色竖条** ），再在支柱的中间部分固定太阳能板。

但航天器不同位置的支柱长度不同，太阳能板的安装面积受限于**最短一侧** 的那根支柱长度。如图：

![](https://i-blog.csdnimg.cn/blog_migrate/6c45e4ac4ec9882ae073cddf147ad3f0.png)

现提供一组整形数组的支柱高度数据，假设每根支柱间距离相等为1个单位长度，计算如何选择两根支柱可以使太阳能板的面积最大。

#### 输入描述

10,9,8,7,6,5,4,3,2,1

注：支柱至少有2根，最多10000根，能支持的高度范围1~10^9的整数。柱子的高度是无序的，例子中递减只是巧合。

#### 输出描述

可以支持的最大太阳能板面积：（10米高支柱和5米高支柱之间）

25

##### ACM输入输出模式

如果你经常使用**Leetcode** ,会知道**letcode** 是不需要编写输入输出函数的。但是华为OD机考使用的是 **ACM 模式**
，需要手动编写输入和输出。

所以最好在牛-
客上提前熟悉这种模式。例如C++使用`cin/cout`,python使用`input()/print()`。JavaScript使用node的`readline()`和`console.log()`。Java
使用`sacnner/system.out.print()`

#### 用例

输入| 10,9,8,7,6,5,4,3,2,1  
---|---  
输出| 25  
备注|

  * 10米高支柱和5米高支柱之间宽度为5，高度取小的支柱高也是5，面积为25。
  * 任取其他两根支柱所能获得的面积都小于25。
  * 所以最大的太阳能板面积为25。

  
### 机考代码查重

华为OD机考完成之后，官方会进行代码查重。**华为 od 机考确实有很大的概率抽到原题**
。如果碰到了题库中的原题，一定不要直接使用题解中的代码，尤其是变量名，一定要修改，可以改成毫无意义的单词。除了变量名之外，代码的组织结构和逻辑一定要进行改变，这就要求在日常的刷题中，提前编写好属于自己的代码。

#### C++

    
    
    #include <iostream>
    #include <vector>
    #include <algorithm>
    
    using namespace std;
    
    int main() {
        string input;
        getline(cin, input);
    
        vector<int> zhizhu_heights;
        size_t pos = 0;
        while ((pos = input.find(',')) != string::npos) {
            int height = stoi(input.substr(0, pos));
            zhizhu_heights.push_back(height);
            input.erase(0, pos + 1);
        }
        zhizhu_heights.push_back(stoi(input));
    
        int max_area = 0;
    
        for (int i = 0; i < zhizhu_heights.size() - 1; i++) {
            for (int j = i + 1; j < zhizhu_heights.size(); j++) {
                int distance = j - i;
                int height = min(zhizhu_heights[i], zhizhu_heights[j]);
                int area = distance * height;
                max_area = max(max_area, area);
            }
        }
    
        cout << max_area << endl;
    
        return 0;
    }
    

#### JavaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.on('line', (input) => {
      const zhizhu_heights = input.split(',').map(Number);
      let max_area = 0;
    
      for (let i = 0; i < zhizhu_heights.length - 1; i++) {
        for (let j = i + 1; j < zhizhu_heights.length; j++) {
          const distance = j - i;
          const height = Math.min(zhizhu_heights[i], zhizhu_heights[j]);
          const area = distance * height;
          max_area = Math.max(max_area, area);
        }
      }
    
      console.log(max_area);
    
      rl.close();
    });
    

#### Java

    
    
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            String input = scanner.nextLine();
            String[] heights = input.split(",");
            int[] zhizhu_heights = new int[heights.length];
            
            for (int i = 0; i < heights.length; i++) {
                zhizhu_heights[i] = Integer.parseInt(heights[i]);
            }
            
            int max_area = 0;
            
            for (int i = 0; i < zhizhu_heights.length - 1; i++) {
                for (int j = i + 1; j < zhizhu_heights.length; j++) {
                    int distance = j - i;
                    int height = Math.min(zhizhu_heights[i], zhizhu_heights[j]);
                    int area = distance * height;
                    max_area = Math.max(max_area, area);
                }
            }
            
            System.out.println(max_area);
        }
    }
    

#### Python

    
    
    zhizhu_heights = list(map(int, input().split(',')))  # 将输入的字符串转换为整数列表
    max_area = 0  # 初始化最大面积为0
    
    for i in range(len(zhizhu_heights)-1):
        for j in range(i+1, len(zhizhu_heights)):
            distance = j - i  # 两柱之间的距离
            height = min(zhizhu_heights[i], zhizhu_heights[j])  # 选择两柱中较小的高度作为面积计算的高度
            area = distance * height  # 计算面积
            max_area = max(max_area, area)  # 更新最大面积
    
    print(max_area)  # 输出最大面积
    

> #### 文章目录
>
>   *     *       * 题目描述
>       * 输入描述
>       * 输出描述
>       *         * ACM输入输出模式
>       * 用例
>       * C++
>       * JavaScript
>       * Java
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

>
>  
>  ![fengmian](https://img-
> blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

#### 完整用例

##### 用例1

    
    
    10,9,8,7,6,5,4,3,2,1
    

##### 用例2

    
    
    1,2,3,4,5,6,7,8,9,10
    

##### 用例3

    
    
    5,5,5,5,5,5,5,5,5,5
    

##### 用例4

    
    
    1,1,1,1,1,1,1,1,1,1
    

##### 用例5

    
    
    10,1,10,1,10,1,10,1,10,1
    

##### 用例6

    
    
    100,200,300,400,500,600,700,800,900,1000
    

##### 用例7

    
    
    50,60,70,80,90,100,110,120,130,140
    

##### 用例8

    
    
    150,250,350,450,550,650,750,850,950,1050
    

##### 用例9

    
    
    200,400,600,800,1000,1200,1400,1600,1800,2000
    

##### 用例10

    
    
    75,125,175,225,275,325,375,425,475,525
    

