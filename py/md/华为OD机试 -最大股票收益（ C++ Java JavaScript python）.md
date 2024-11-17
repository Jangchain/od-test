#### 题目描述

假设知道某段连续时间内股票价格，计算通过买入卖出可获得的最大收益。

输入一个大小为 n 的数 price(p1,p2,p3,p4…….pn),pi 是第i天的股票价格。

pi 的格式为股票价格(非负整型)加上货币单位 Y 或者 S,其中 Y 代表人民币,S 代表美元,这里规定 1 美元可以兑换 7 人民币。

Pi 样例 1：123Y 代表 123 元人民币

pi 样例 2：123S 代表 123 元美元,可兑换 861 人民币。

假设你可以在任何一天买入或者卖出股票,也可以选择放弃交易,请计其在交易周期 n 天内你能获得的最大收(以人民币计算)。

#### 输入描述

输入一个包含交易周期内各天股票价格的字符串，以**空格** 分隔。不考虑输入异常情况。

#### 输出描述

输出一个整型数代表在交易周期 n 天内你能获得的最大收益，n 不能超过 10000

备注：股票价格只会用 Y 人民币或 S 美元进行输入，不考虑其他情况。

#### 用例

输入：2Y 3S 4S 6Y 8S  
输出：76

#### 解题思路

  1. 读取输入的股票价格字符串，其中包含股票价格和货币单位（Y代表人民币，S代表美元）。
  2. 使用空格分割输入字符串，将分割后的子字符串存储在一个变量`strVec`中。
  3. 遍历`strVec`，将每个股票价格字符串转换为人民币整数值。如果货币单位是美元（S），则将股票价格乘以7（1美元兑换7人民币）。将转换后的人民币整数值存储在一个变量`numVec`中。
  4. 初始化一个变量`profit`用于存储最大收益，初始值为0。
  5. 遍历`numVec`，从第二天开始（索引为1），计算每天的收益。收益等于当天股票价格减去前一天股票价格。
  6. 如果收益为正，说明在前一天买入股票并在当天卖出可以获得收益，将收益累加到`profit`中。
  7. 遍历完`numVec`后，`profit`中存储的值即为在交易周期内可以获得的最大收益。
  8. 输出最大收益。

这个解题思路基于贪心算法，通过在每个可能的买入卖出时机累加正收益，从而实现在交易周期内获得最大收益。

#### C++

    
    
    #include <iostream>
    #include <vector>
    #include <string>
    
    using namespace std;
    
    int main() {
        string inputStr;
        getline(cin, inputStr); // 读取带空格的字符串输入
    
        vector<string> strVec;
        // 使用空格分割字符串，并将分割后的子字符串添加到strVec中
        while (inputStr.find(" ") != string::npos) {
            int found = inputStr.find(" ");
            strVec.push_back(inputStr.substr(0, found));
            inputStr = inputStr.substr(found + 1);
        }
        strVec.push_back(inputStr);
    
        vector<int> numVec;
        // 遍历strVec，将股票价格转换为人民币并添加到numVec中
        for (auto str : strVec) {
            if (str[str.length() - 1] == 'S') {
                int originNum = stoi(str.substr(0, str.length() - 1));
                numVec.push_back(originNum * 7);
            } else {
                numVec.push_back(stoi(str.substr(0, str.length() - 1)));
            }
        }
    
        int profit = 0;
        // 遍历numVec，计算每天的收益，如果收益为正，则累加到总收益中
        for (int i = 1; i < numVec.size(); i++) {
            if (numVec[i] - numVec[i - 1] > 0) {
                profit += numVec[i] - numVec[i - 1];
            }
        }
        // 输出最大收益
        cout << profit << endl;
    
        return 0;
    }
    
    

#### JavaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    let inputStr = '';
    
    // 当接收到一行输入时，将其添加到inputStr中
    rl.on('line', (line) => {
      inputStr += line;
    }).on('close', () => { // 当输入结束时，执行以下操作
      const strVec = inputStr.split(' '); // 使用空格分割输入字符串
    
      // 将股票价格字符串转换为人民币整数值
      const numVec = strVec.map(str => {
        if (str[str.length - 1] === 'S') {
          const originNum = parseInt(str.substr(0, str.length - 1));
          return originNum * 7;
        } else {
          return parseInt(str.substr(0, str.length - 1));
        }
      });
    
      let profit = 0;
      // 遍历numVec，计算每天的收益，如果收益为正，则累加到总收益中
      for (let i = 1; i < numVec.length; i++) {
        if (numVec[i] - numVec[i - 1] > 0) {
          profit += numVec[i] - numVec[i - 1];
        }
      }
      // 输出最大收益
      console.log(profit);
    });
    
    

#### Java

    
    
    import java.util.Scanner;
    import java.util.ArrayList;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            String inputStr = scanner.nextLine(); // 读取带空格的字符串输入
            scanner.close();
    
            ArrayList<String> strList = new ArrayList<>();
            // 使用空格分割字符串，并将分割后的子字符串添加到strList中
            while (inputStr.indexOf(" ") != -1) {
                int found = inputStr.indexOf(" ");
                strList.add(inputStr.substring(0, found));
                inputStr = inputStr.substring(found + 1);
            }
            strList.add(inputStr);
    
            ArrayList<Integer> numList = new ArrayList<>();
            // 遍历strList，将股票价格转换为人民币并添加到numList中
            for (String str : strList) {
                if (str.charAt(str.length() - 1) == 'S') {
                    int originNum = Integer.parseInt(str.substring(0, str.length() - 1));
                    numList.add(originNum * 7);
                } else {
                    numList.add(Integer.parseInt(str.substring(0, str.length() - 1)));
                }
            }
    
            int profit = 0;
            // 遍历numList，计算每天的收益，如果收益为正，则累加到总收益中
            for (int i = 1; i < numList.size(); i++) {
                if (numList.get(i) - numList.get(i - 1) > 0) {
                    profit += numList.get(i) - numList.get(i - 1);
                }
            }
            // 输出最大收益
            System.out.println(profit);
        }
    }
    
    
    

#### Python

    
    
    # 从输入中读取带空格的字符串，表示连续时间内的股票价格
    input_str = input()
    
    # 使用空格分割字符串，得到一个包含各天股票价格的列表
    str_list = input_str.split()
    
    # 初始化一个空列表，用于存储转换为人民币的股票价格
    num_list = []
    # 遍历原始股票价格列表
    for s in str_list:
        # 如果股票价格以 'S' 结尾，表示单位是美元
        if s[-1] == 'S':
            origin_num = int(s[:-1])
            # 将美元转换为人民币（1美元 = 7人民币），并添加到 num_list 中
            num_list.append(origin_num * 7)
        else:
            # 如果股票价格以 'Y' 结尾，表示单位是人民币，直接添加到 num_list 中
            num_list.append(int(s[:-1]))
    
    # 初始化利润为 0
    profit = 0
    # 遍历转换为人民币的股票价格列表，从第二天开始
    for i in range(1, len(num_list)):
        # 如果第 i 天的股票价格高于第 i-1 天的股票价格
        if num_list[i] - num_list[i - 1] > 0:
            # 将差值累加到利润中
            profit += num_list[i] - num_list[i - 1]
    
    # 输出计算得到的最大利润
    print(profit)
    
    

#### 完整用例

##### 用例1

1Y 2Y 3Y 4Y 5Y

##### 用例2

5Y 4Y 3Y 2Y 1Y

##### 用例3

1Y 3Y 2Y 4Y 5Y

##### 用例4

1S 2S 3S 4S 5S

##### 用例5

5S 4S 3S 2S 1S

##### 用例6

1S 3S 2S 4S 5S

##### 用例7

1Y 2S 3Y 4S 5Y

##### 用例8

5Y 4S 3Y 2S 1Y

##### 用例9

1Y 1S 2Y 2S 3Y

##### 用例10

3Y 2S 1Y 4S 5Y  

#### 文章目录

  *     *       * 题目描述
      * 输入描述
      * 输出描述
      * 用例
      * 解题思路
      * C++
      * JavaScript
      * Java
      * Python
      * 完整用例
      *         * 用例1
        * 用例2
        * 用例3
        * 用例4
        * 用例5
        * 用例6
        * 用例7
        * 用例8
        * 用例9
        * 用例10

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

