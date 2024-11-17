#### 题目描述

> 运送的快递放在大小不等的长方体快递盒中，为了能够装载更多的快递同时不能让货车超载，需要计算最多能装多少个快递。
>
> 注：快递的体积不受限制
>
> 快递数最多1000个
>
> 货车载重最大50000

#### 输入描述

> 第一行输入每个快递的重量
>
> 用英文逗号隔开
>
> 如 5,10,2,11
>
> 第二行输入货车的载重量
>
> 如 20

#### 输出描述

> 输出最多能装多少个快递
>
> 如 3

##### ACM输入输出模式

如果你经常使用**Leetcode** ,会知道**letcode** 是不需要编写输入输出函数的。但是华为OD机考使用的是 **ACM 模式**
，需要手动编写输入和输出。

所以最好在牛-
客上提前熟悉这种模式。例如C++使用`cin/cout`,python使用`input()/print()`。JavaScript使用node的`readline()`和`console.log()`。Java
使用`sacnner/system.out.print()`

#### 用例

输入

    
    
    5,10,2,11
    20
    

输出

    
    
    3
    

#### 机考代码查重

华为OD机考完成之后，官方会进行代码查重。**华为 od 机考确实有很大的概率抽到原题**
。如果碰到了题库中的原题，一定不要直接使用题解中的代码，尤其是变量名，一定要修改，可以改成毫无意义的单词。除了变量名之外，代码的组织结构和逻辑一定要进行改变，这就要求在日常的刷题中，提前编写好属于自己的代码。

#### C++

    
    
    #include <iostream>
    #include <string>
    #include <algorithm>
    using namespace std;
    
    int main() {
        // 定义变量
        string weightsStr; // 快递重量的字符串
        int capacity; // 货车载重
        string delimiter = ","; // 分隔符
        size_t pos = 0; // 字符串查找的起始位置
        string token; // 分离出的字符串
        int count = 0; // 快递数量
        int weights[100]; // 快递重量数组
        int sum = 0; // 当前已装载的快递重量之和
        int i = 0; // 当前已装载的快递数量
    
        // 输入快递重量字符串和货车载重
        getline(cin, weightsStr);
        cin >> capacity;
    
        // 将快递重量字符串按照分隔符分离为单独的字符串，并转换为整型保存到数组中
        while ((pos = weightsStr.find(delimiter)) != string::npos) {
            token = weightsStr.substr(0, pos);
            weights[count++] = stoi(token);
            weightsStr.erase(0, pos + delimiter.length());
        }
        weights[count++] = stoi(weightsStr);
    
        // 对快递重量数组进行排序
        sort(weights, weights + count);
    
        // 循环装载快递，直到货车载重达到上限或所有快递都已装载
        while (i < count) {
            if (sum + weights[i] <= capacity) { // 如果当前快递可以装载
                sum += weights[i++]; // 累加当前快递重量到总重量中，同时已装载的快递数量加1
            } else { // 如果当前快递不能装载
                break; // 跳出循环
            }
        }
    
        // 输出已装载的快递数量
        cout << i << endl;
    
        return 0;
    }
    
    

#### javaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.on('line', (weightsStr) => {
      rl.on('line', (capacityStr) => {
        const capacity = parseInt(capacityStr);
        const weights = weightsStr.split(',').map(Number).sort((a, b) => a - b);
        let sum = 0;
        let i = 0;
        while (i < weights.length) {
          if (sum + weights[i] <= capacity) {
            sum += weights[i];
            i++;
          } else {
            break;
          }
        }
        console.log(i);
        rl.close();
      });
    });
    

#### java

    
    
    import java.util.Scanner;
    import java.util.Arrays;
    
    public class Main {
     
    
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            String weightsStr = scanner.nextLine();
            int capacity = scanner.nextInt();
             String[] weightsArr = weightsStr.split(",");
            int[] weights = new int[weightsArr.length];
            for (int i = 0; i < weightsArr.length; i++) {
                weights[i] = Integer.parseInt(weightsArr[i]);
            }
    
            Arrays.sort(weights);
            int sum = 0;
            int i = 0;
            while (i < weights.length) {
                if (sum + weights[i] <= capacity) {
                    sum += weights[i++];
                } else {
                    break;
                }
            }
                    System.out.println(i);
    
        }
    }
    
    

#### python

    
    
    weightsStr = input()  # 输入快递重量字符串
    capacity = int(input())  # 输入货车载重
    
    # 将快递重量字符串按照逗号分隔为单独的字符串，并转换为整型保存到数组中
    weights = list(map(int, weightsStr.split(',')))
    
    # 对快递重量数组进行排序
    weights.sort()
    
    # 循环装载快递，直到货车载重达到上限或所有快递都已装载
    sum = 0  # 当前已装载的快递重量之和
    i = 0  # 当前已装载的快递数量
    while i < len(weights):
        if sum + weights[i] <= capacity:  # 如果当前快递可以装载
            sum += weights[i]  # 累加当前快递重量到总重量中，同时已装载的快递数量加1
            i += 1
        else:  # 如果当前快递不能装载
            break  # 跳出循环
    
    # 输出已装载的快递数量
    print(i)
    

> #### 文章目录
>
>   *     *       * 题目描述
>       * 输入描述
>       * 输出描述
>       *         * ACM输入输出模式
>       * 用例
>       * 机考代码查重
>       * C++
>       * javaScript
>       * java
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

    
    
    5,10,2,11
    20
    

##### 用例2

    
    
    1,2,3,4,5
    10
    

##### 用例3

    
    
    10,20,30,40,50
    100
    

##### 用例4

    
    
    5,5,5,5,5
    25
    

##### 用例5

    
    
    1,1,1,1,1,1,1,1,1,1
    10
    

##### 用例6

    
    
    10,20,30,40,50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200,210,220,230,240,250,260,270,280,290,300,310,320,330,340,350,360,370,380,390,400,410,420,430,440,450,460,470,480,490,500,510,520,530,540,550,560,570,580,590,600,610,620,630,640,650,660,670,680,690,700,710,720,730,740,750,760,770,780,790,800,810,820,830,840,850,860,870,880,890,900,910,920,930,940,950,960,970,980,990,1000
    50000
    

##### 用例7

    
    
    1000,900,800,700,600,500,400,300,200,100
    50000
    

##### 用例8

    
    
    50000
    50000
    

##### 用例9

    
    
    1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100
    10000
    

##### 用例10

    
    
    100,200,300,400,500,600,700,800,900,1000,1100,1200,1300,1400,1500,1600,1700,1800,1900,2000,2100,2200,2300,2400,2500,2600,2700,2800,2900,3000,3100,3200,3300,3400,3500,3600,3700,3800,3900,4000,4100,4200,4300,4400,4500,4600,4700,4800,4900,5000,5100,5200,5300,5400,5500,5600,5700,5800,5900,6000,6100,6200,6300,6400,6500,6600,6700,6800,6900,7000,7100,7200,7300,7400,7500,7600,7700,7800,7900,8000,8100,8200,8300,8400,8500,8600,8700,8800,8900,9000,9100,9200,9300,9400,9500,9600,9700,9800,9900,10000
    100000
    

