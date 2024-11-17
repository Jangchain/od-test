#### 题目描述

停车场有一横排车位，0代表没有停车，1代表有车。至少停了一辆车在车位上，也至少有一个空位没有停车。

为了防剐蹭，需为停车人找到一个车位，使得距停车人的车最近的车辆的距离是最大的，返回此时的**最大距离** 。

#### 输入描述

  1. 一个用半角逗号分割的停车标识字符串，停车标识为0或1，0为空位，1为已停车。
  2. 停车位最多100个。

#### 输出描述

输出一个整数记录最大距离。

##### ACM输入输出模式

如果你经常使用**Leetcode** ,会知道**letcode** 是不需要编写输入输出函数的。但是华为OD机考使用的是 **ACM 模式**
，需要手动编写输入和输出。

所以最好在牛-
客上提前熟悉这种模式。例如C++使用`cin/cout`,python使用`input()/print()`。JavaScript使用node的`readline()`和`console.log()`。Java
使用`sacnner/system.out.print()`

#### 用例

输入| 1,0,0,0,0,1,0,0,1,0,1  
---|---  
输出| 2  
说明|
当车停在第3个位置上时，离其最近的的车距离为2（1到3）。当车停在第4个位置上时，离其最近的的车距离为2（4到6）。其他位置距离为1。因此最大距离为2  
### 机考代码查重

华为OD机考完成之后，官方会进行代码查重。**华为 od 机考确实有很大的概率抽到原题**
。如果碰到了题库中的原题，一定不要直接使用题解中的代码，尤其是变量名，一定要修改，可以改成毫无意义的单词。除了变量名之外，代码的组织结构和逻辑一定要进行改变，这就要求在日常的刷题中，提前编写好属于自己的代码。

#### 代码思路

  1. 读取输入的停车标识字符串并转换为整数数组。例如，输入"1,0,0,0,0,1,0,0,1,0,1"会被转换为整数数组[1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1]。

  2. 创建长度为n的数组leftFreeSpaces和rightFreeSpaces，用于存储每个位置左侧和右侧的空位数量。

  3. 遍历整数数组，计算每个位置左侧的空位数量。如果当前位置为1，则跳过；如果当前位置为0且前一个位置为0，则将当前位置的左侧空位数量设为前一个位置的左侧空位数量加1；否则，将当前位置的左侧空位数量设为0。例如，对于整数数组[1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1]，计算得到的leftFreeSpaces数组为[0, 1, 2, 3, 4, 0, 1, 2, 0, 1, 0]。

  4. 遍历整数数组，计算每个位置右侧的空位数量。如果当前位置为1，则跳过；如果当前位置为0且后一个位置为0，则将当前位置的右侧空位数量设为后一个位置的右侧空位数量加1；否则，将当前位置的右侧空位数量设为0。例如，对于整数数组[1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1]，计算得到的rightFreeSpaces数组为[4, 3, 2, 1, 0, 2, 1, 0, 1, 0, 0]。

  5. 初始化最大距离为左侧第一个位置的右侧空位数量和右侧最后一个位置的左侧空位数量中的较大值。

  6. 遍历整数数组，计算每个位置的最大距离。如果当前位置为1，则跳过；否则，将当前位置的最大距离设为左侧空位数量和右侧空位数量中的较小值。例如，对于整数数组[1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1]，计算得到的最大距离为2。

  7. 输出最大距离。对于整数数组[1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1]，输出为2。

#### C++

    
    
    #include <iostream>
    #include <vector>
    #include <algorithm>
    using namespace std;
    
    int main() {
        string inputNum;
        getline(cin, inputNum);
        vector<string> inputNumList;
        string temp = "";
        for (int i = 0; i < inputNum.length(); i++) {
            if (inputNum[i] == ',') {
                inputNumList.push_back(temp);
                temp = "";
            }
            else {
                temp += inputNum[i];
            }
        }
        inputNumList.push_back(temp);
    
        string lineNum = "";
        for (int i = 0; i < inputNumList.size(); i++) {
            lineNum += inputNumList[i];
        }
        vector<string> lineNumList;
        temp = "";
        for (int i = 0; i < lineNum.length(); i++) {
            if (lineNum[i] == '1') {
                lineNumList.push_back(temp);
                temp = "";
            }
            else {
                temp += lineNum[i];
            }
        }
        lineNumList.push_back(temp);
    
        vector<int> res;
        res.push_back(lineNumList[0].length());
        res.push_back(lineNumList[lineNumList.size() - 1].length());
        int maxLen = 0;
        for (int i = 0; i < lineNumList.size(); i++) {
            maxLen = max(maxLen, (int)lineNumList[i].length());
        }
        res.push_back((maxLen + 1) / 2);
    
        int num = *max_element(res.begin(), res.end());
    
        cout << num << endl;
    
        return 0;
    }
    
    

#### java

    
    
    import java.util.Scanner;
    import java.util.ArrayList;
    import java.util.List;
    import java.util.Collections;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            String inputNum = scanner.nextLine();
            List<String> inputNumList = new ArrayList<>();
            String temp = "";
            for (int i = 0; i < inputNum.length(); i++) {
                if (inputNum.charAt(i) == ',') {
                    inputNumList.add(temp);
                    temp = "";
                } else {
                    temp += inputNum.charAt(i);
                }
            }
            inputNumList.add(temp);
    
            String lineNum = "";
            for (int i = 0; i < inputNumList.size(); i++) {
                lineNum += inputNumList.get(i);
            }
            List<String> lineNumList = new ArrayList<>();
            temp = "";
            for (int i = 0; i < lineNum.length(); i++) {
                if (lineNum.charAt(i) == '1') {
                    lineNumList.add(temp);
                    temp = "";
                } else {
                    temp += lineNum.charAt(i);
                }
            }
            lineNumList.add(temp);
    
            List<Integer> res = new ArrayList<>();
            res.add(lineNumList.get(0).length());
            res.add(lineNumList.get(lineNumList.size() - 1).length());
            int maxLen = 0;
            for (int i = 0; i < lineNumList.size(); i++) {
                maxLen = Math.max(maxLen, lineNumList.get(i).length());
            }
            res.add((maxLen + 1) / 2);
    
            int num = Collections.max(res);
    
            System.out.println(num);
        }
    }
    

#### javaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.on('line', (input) => {
      const inputNum = input.split(",");
      const lineNum = inputNum.join("").split("1");
    
      const res = [lineNum[0].length, lineNum[lineNum.length - 1].length, (Math.max(...lineNum.map(i => i.length)) + 1) / 2];
    
      const num = Math.max(...res);
    
      console.log(Math.floor(num));
    
      rl.close();
    });
    

#### python

    
    
    inputNum = input().split(",")
    lineNum = "".join(inputNum).split("1")
    
    # 定义一个列表res，其中包含三个元素：
    # res[0]表示第一个空位之前的距离，即lineNum[0]的长度；
    # res[1]表示最后一个空位之后的距离，即lineNum[-1]的长度；
    # res[2]表示最大距离，即lineNum中最长的空位长度加1再除以2。
    res = [len(lineNum[0]), len(lineNum[-1]), (max(len(i) for i in lineNum) + 1) // 2]
    
    # 找出res中的最大值，并将其赋给变量num
    num = max(res)
    
    # 输出变量num，即最大距离
    print(num)
    

#### 文章目录

  *     *       * 题目描述
      * 输入描述
      * 输出描述
      *         * ACM输入输出模式
      * 用例
      * 代码思路
      * C++
      * java
      * javaScript
      * python
      * 完整用例
      *         * 用例1
        * 用例2
        * 用例3
        * 用例4，无效用例，已删除
        * 用例5
        * 用例6
        * 用例7
        * 用例8
        * 用例9
        * 用例10

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

#### 完整用例

##### 用例1

    
    
    1,0,0,0,0,1,0,0,1,0,1
    

##### 用例2

    
    
    0,1,0,0,0,0,0,0,0,0,1
    

##### 用例3

    
    
    1,1,1,1,1,1,1,1,1,1,0
    

##### 用例4，无效用例，已删除

    
    
     
    

##### 用例5

    
    
    1,0,1,0,1,0,1,0,1,0,1
    

##### 用例6

    
    
    0,1,0,1,0,1,0,1,0,1,0
    

##### 用例7

    
    
    1,1,1,0,0,0,0,0,0,0,0
    

##### 用例8

    
    
    0,0,0,0,0,0,0,1,1,1,1
    

##### 用例9

    
    
    1,0,0,0,1,0,0,0,1,0,0
    

##### 用例10

    
    
    0,0,0,0,1,0,0,0,0,0,0
    

