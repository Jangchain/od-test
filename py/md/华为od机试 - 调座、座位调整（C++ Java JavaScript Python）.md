### 题目描述：座位调整

疫情期间课堂的座位进行了特殊的调整，不能出现两个同学紧挨着，必须隔至少一个空位。

给你一个整数数组 desk表示当前座位的占座情况，由若干 0 和 1 组成，其中 0 表示没有占位，1
表示占位。在不改变原有座位秩序情况下，还能安排坐几个人？

### 输入描述：

第一行是个子数组表示作为占座情况，由若干 0 和 1 组成，其中 0 表示没有占位，1 表示占位

1 <= desk.length <= 2 * 10^4

### 输出描述：

输出数值表示还能坐几个人

##### ACM输入输出模式

如果你经常使用**Leetcode** ,会知道**letcode** 是不需要编写输入输出函数的。但是华为OD机考使用的是 **ACM 模式**
，需要手动编写输入和输出。

所以最好在牛-
客上提前熟悉这种模式。例如C++使用`cin/cout`,python使用`input()/print()`。JavaScript使用node的`readline()`和`console.log()`。Java
使用`sacnner/system.out.print()`

### 用例1

输入：

    
    
    1,0,0,0,1
    

输出：

    
    
    1
    

说明：

> 只有desk[2]的位置可以坐一个人

### 用例2

输入：

    
    
    0,0,0,0,0
    

输出：

    
    
    3
    

#### 机考代码查重

华为OD机考完成之后，官方会进行代码查重。**华为 od 机考确实有很大的概率抽到原题**
。如果碰到了题库中的原题，一定不要直接使用题解中的代码，尤其是变量名，一定要修改，可以改成毫无意义的单词。除了变量名之外，代码的组织结构和逻辑一定要进行改变，这就要求在日常的刷题中，提前编写好属于自己的代码。

### java

    
    
    import java.util.Scanner;
    import java.util.List;
    import java.util.ArrayList;
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            // 读入座位情况
            String input = scanner.nextLine();
            // 将座位情况存入列表中
            List<String> seatList = new ArrayList<>();
            String[] tokens = input.split(",");
            for (String token : tokens) {
                seatList.add(token);
            }
    
            // 调用方法计算可以坐的人数
            int result = calculate(seatList);
    
            // 输出可以坐的人数
            System.out.println(result);
        }
    
        // 计算可以坐的人数
        private static int calculate(List<String> seatList) {
            int len = seatList.size();
            // 计数器，记录连续空座位的数量
            double count = 0;
            // 记录可以坐的人数
            int result = 0;
            for (int i = 0; i < len; i++) {
                String seat = seatList.get(i);
                if (seat.equals("1")) {
                    // 如果遇到有人坐的位置
                    if (count > 1) {
                        // 如果前面有连续的空座位，则计算可以坐的人数
                        result += Math.ceil((count - 2) / 2);
                    }
                    // 重置计数器
                    count = 0;
                } else {
                    // 如果遇到空座位
                    if (i == 0 || i == len - 1) {
                        // 如果是首尾位置，则直接计数
                        count++;
                    }
                    // 计数器加一
                    count++;
                }
            }
            // 最后再检查一遍是否有连续的空座位
            if (count > 1) {
                result += Math.ceil((count - 2) / 2);
            }
            return result;
        }
    }
    

### C++

    
    
    #include <iostream>
    #include <vector>
    #include <string>
    #include <cmath>
    using namespace std;
    
    int calculate(vector<string> seatList);
    
    int main() {
        string input;
        getline(cin, input);
        // 读入座位情况
        vector<string> seatList;
        string token;
        size_t pos = 0;
        while ((pos = input.find(",")) != string::npos) {
            token = input.substr(0, pos);
            seatList.push_back(token);
            input.erase(0, pos + 1);
        }
        seatList.push_back(input);
    
        // 调用方法计算可以坐的人数
        int result = calculate(seatList);
    
        // 输出可以坐的人数
        cout << result << endl;
        return 0;
    }
    
    // 计算可以坐的人数
    int calculate(vector<string> seatList) {
        int len = seatList.size();
        // 计数器，记录连续空座位的数量
        double count = 0;
        // 记录可以坐的人数
        int result = 0;
        for (int i = 0; i < len; i++) {
            string seat = seatList[i];
            if (seat == "1") {
                // 如果遇到有人坐的位置
                if (count > 1) {
                    // 如果前面有连续的空座位，则计算可以坐的人数
                    result += ceil((count - 2) / 2);
                }
                // 重置计数器
                count = 0;
            } else {
                // 如果遇到空座位
                if (i == 0 || i == len - 1) {
                    // 如果是首尾位置，则直接计数
                    count++;
                }
                // 计数器加一
                count++;
            }
        }
        // 最后再检查一遍是否有连续的空座位
        if (count > 1) {
            result += ceil((count - 2) / 2);
        }
        return result;
    }
    
    

### javaScript

    
    
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.on('line', (input) => {
      // 将座位情况存入列表中
      const seatList = input.split(',');
    
      // 调用方法计算可以坐的人数
      const result = calculate(seatList);
    
      // 输出可以坐的人数
      console.log(result);
    });
    
    // 计算可以坐的人数
    function calculate(seatList) {
      const len = seatList.length;
      // 计数器，记录连续空座位的数量
      let count = 0;
      // 记录可以坐的人数
      let result = 0;
      for (let i = 0; i < len; i++) {
        const seat = seatList[i];
        if (seat === '1') {
          // 如果遇到有人坐的位置
          if (count > 1) {
            // 如果前面有连续的空座位，则计算可以坐的人数
            result += Math.ceil((count - 2) / 2);
          }
          // 重置计数器
          count = 0;
        } else {
          // 如果遇到空座位
          if (i === 0 || i === len - 1) {
            // 如果是首尾位置，则直接计数
            count++;
          }
          // 计数器加一
          count++;
        }
      }
      // 最后再检查一遍是否有连续的空座位
      if (count > 1) {
        result += Math.ceil((count - 2) / 2);
      }
      return result;
    }
    

### python

    
    
    import math
    seatList = input().split(",")
    len = len(seatList)
    count = 0
    result = 0
    for i in range(len):
        seat = seatList[i]
        if seat == "1":
            if count > 1:
                result += math.ceil((count - 2) / 2)
            count = 0
        else:
            if i == 0 or i == len - 1:
                count += 1
            count += 1
    if count > 1:
        result += math.ceil((count - 2) / 2)
    print(result)
    
    

> #### 文章目录
>
>   *     * 题目描述：座位调整
>     * 输入描述：
>     * 输出描述：
>     *       *         * ACM输入输出模式
>     * 用例1
>     * 用例2
>     *       * 机考代码查重
>     * java
>     * C++
>     * javaScript
>     * python
>     *       * 完整用例
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

1,0,0,0,1

##### 用例2

1,0,0,0,0,1

##### 用例3

0,0,0,0,0,0

##### 用例4

0,1,0,1,0,1

##### 用例5

0,0,1,0,0,1,0,0

##### 用例6

1,0,0,0,0,0,0,1

##### 用例7

1,0,0,0,0,0,0,0

##### 用例8

1,1,1,0,0,0,1,1,1

##### 用例9

1,0,1,0,1,0,1,0,1

##### 用例10

1,1,1,1,1

