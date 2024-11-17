#### 题目描述

工位由序列F1,F2…Fn组成，Fi值为0、1或2。其中0代表空置，1代表有人，2代表障碍物。

1、某一空位的友好度为左右连续老员工数之和，  
2、为方便新员工学习求助，优先安排友好度高的空位，

给出工位序列，求所有空位中**友好度的最大值** 。

#### 输入描述

第一行为工位序列：F1，F2…Fn组成，  
1<=n<=10000，Fi值为0、1或2。其中0代表空置，1代表有人，2代表障碍物。

#### 输出描述

所有空位中友好度的最大值。如果没有空位，返回0。

#### 用例

输入| 0 1 0  
---|---  
输出| 1  
说明| 第1个位置和第3个位置，友好度均为1。  
输入| 1 1 0 1 2 1 0  
---|---  
输出| 3  
说明| 第3个位置友好度为3。因障碍物隔断，左边得2分，右边只能得1分。  
  
#### 题目解析

本题最优解题思路如下：

遍历工位序列，如果当前位置是1，左边连续老员工数加1；如果当前位置是2，左边连续老员工数清零；如果当前位置是0，从当前位置往右遍历，如果右边有老员工，右边连续老员工数加1，否则停止遍历。计算当前空置位置的友好度，更新最大友好度。最后输出所有空位中友好度的最大值

#### C++

    
    
    #include <iostream>
    #include <vector>
    #include <string>
    
    using namespace std;
    
    // 分割字符串函数，将字符串按照空格分割成整数数组
    vector<int> split(const string& str) {
        vector<int> nums;
        // 使用while循环和find函数分割字符串
        size_t pos = 0;
        while (pos < str.size()) {
            size_t found = str.find(' ', pos);
            if (found == string::npos) {
                found = str.size();
            }
            int num = stoi(str.substr(pos, found - pos));  // 将字符串转换成整数
            nums.push_back(num);
            pos = found + 1;
        }
        return nums;
    }
    
    int main()
    {
        // 输入处理
        string input_str;
        getline(cin, input_str);
        vector<int> seats = split(input_str);
    
        int result = 0, left = 0, right = 0;
        for (int i = 0; i < seats.size(); i++) {
            if (seats[i] == 1) {  // 如果当前位置有人
                left++;  // 左边连续老员工数加1
            }
            else if (seats[i] == 2) {  // 如果当前位置是障碍物
                left = 0;  // 左边连续老员工数清零
            }
            else if (seats[i] == 0) {  // 如果当前位置是空置
                for (int j = i + 1; j < seats.size(); j++) {  // 从当前位置往右遍历
                    if (seats[j] == 1) {  // 如果右边有老员工
                        right++;  // 右边连续老员工数加1
                    }
                    else if (seats[j] == 0 || seats[j] == 2) {  // 如果右边是空置或障碍物
                        break;  // 停止遍历
                    }
                }
                if (result < left + right) {  // 如果当前空置位置的友好度更高
                    result = left + right;  // 更新最大友好度
                }
                right = 0;  // 右边连续老员工数清零
                left = 0;  // 左边连续老员工数清零
            }
        }
        cout << result;  // 输出所有空位中友好度的最大值
        return 0;
    }
    

#### JavaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.on('line', (input_str) => {
      const seats = input_str.split(" ").map(Number);
    
      let result = 0;
      let left = 0;
      let right = 0;
      for (let i = 0; i < seats.length; i++) {
        if (seats[i] === 1) {
          left += 1;
        } else if (seats[i] === 2) {
          left = 0;
        } else if (seats[i] === 0) {
          for (let j = i + 1; j < seats.length; j++) {
            if (seats[j] === 1) {
              right += 1;
            } else if (seats[j] === 0 || seats[j] === 2) {
              break;
            }
          }
          if (result < left + right) {
            result = left + right;
          }
          right = 0;
          left = 0;
        }
      }
      console.log(result);
    
      rl.close();
    });
    

#### Java

    
    
    import java.util.*;
    import java.util.stream.Collectors;
    
    public class Main {
     
    
        public static void main(String[] args) {
            Scanner sc = new Scanner(System.in);
            String input_str = sc.nextLine();
            List<Integer> seats =  Arrays.stream(input_str.split(" "))
                                .map(Integer::parseInt)
                                .collect(Collectors.toList());
    
            int result = 0, left = 0, right = 0;
            for (int i = 0; i < seats.size(); i++) {
                if (seats.get(i) == 1) {  // 如果当前位置有人
                    left++;  // 左边连续老员工数加1
                }
                else if (seats.get(i) == 2) {  // 如果当前位置是障碍物
                    left = 0;  // 左边连续老员工数清零
                }
                else if (seats.get(i) == 0) {  // 如果当前位置是空置
                    for (int j = i + 1; j < seats.size(); j++) {  // 从当前位置往右遍历
                        if (seats.get(j) == 1) {  // 如果右边有老员工
                            right++;  // 右边连续老员工数加1
                        }
                        else if (seats.get(j) == 0 || seats.get(j) == 2) {  // 如果右边是空置或障碍物
                            break;  // 停止遍历
                        }
                    }
                    if (result < left + right) {  // 如果当前空置位置的友好度更高
                        result = left + right;  // 更新最大友好度
                    }
                    right = 0;  // 右边连续老员工数清零
                    left = 0;  // 左边连续老员工数清零
                }
            }
            System.out.println(result);  // 输出所有空位中友好度的最大值
        }
    }
    
    

#### Python

    
    
    import sys
    
    def main():
        input_str = input()
        seats = list(map(int, input_str.split(" ")))
    
        result = 0
        left = 0
        right = 0
        for i in range(len(seats)):
            if seats[i] == 1:  # 如果当前位置有人
                left += 1  # 左边连续老员工数加1
            elif seats[i] == 2:  # 如果当前位置是障碍物
                left = 0  # 左边连续老员工数清零
            elif seats[i] == 0:  # 如果当前位置是空置
                for j in range(i + 1, len(seats)):  # 从当前位置往右遍历
                    if seats[j] == 1:  # 如果右边有老员工
                        right += 1  # 右边连续老员工数加1
                    elif seats[j] == 0 or seats[j] == 2:  # 如果右边是空置或障碍物
                        break  # 停止遍历
                if result < left + right:  # 如果当前空置位置的友好度更高
                    result = left + right  # 更新最大友好度
                right = 0  # 右边连续老员工数清零
                left = 0  # 左边连续老员工数清零
        print(result)  # 输出所有空位中友好度的最大值
    
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

