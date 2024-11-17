## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

#### 题目描述

  * 给定一个非空数组（列表），其元素数据类型为整型，请按照数组元素十进制最低位从小到大进行排序，十进制最低位相同的元素，相对位置保持不变。
  * 当数组元素为负值时，十进制最低位等同于去除符号位后对应十进制值最低位。

#### 输入描述

  * 给定一个非空数组，其元素数据类型为32位有符号整数，数组长度[1, 1000]

#### 输出描述

  * 输出排序后的数组

#### 用例

输入| 1,2,5,-21,22,11,55,-101,42,8,7,32  
---|---  
输出| 1,-21,11,-101,2,22,42,32,5,55,7,8  
说明| 无  
输入| 19,-31,10,57,61,27,11,28,-94  
---|---  
输出| 10,-31,61,11,-94,57,27,28,19  
说明| 无  
  
#### 题目解析

数组排序，简单题！

#### C++

    
    
    #include <iostream>
    #include <vector>
    #include <algorithm>
    
    using namespace std;
    
    int getKey(int num) {
        num = num > 0 ? num : -num;
        return num % 10;
    }
    
    int main() {
        string input;
        getline(cin, input);
        vector<int> numsList;
        size_t pos = 0;
        while ((pos = input.find(",")) != string::npos) {
            int num = stoi(input.substr(0, pos));
            numsList.push_back(num);
            input.erase(0, pos + 1);
        }
        numsList.push_back(stoi(input));
        sort(numsList.begin(), numsList.end(), [](int num1, int num2) {
            return getKey(num1) < getKey(num2);
        });
        for (int i = 0; i < numsList.size(); i++) {
            cout << numsList[i];
            if (i != numsList.size() - 1) {
                cout << ",";
            }
        }
        return 0;
    }
    

#### JavaScript

    
    
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.on('line', (input) => {
      // 处理输入
      const nums = input.split(",");
      const list = [];
      for (const num of nums) {
        list.push(parseInt(num));
      }
      list.sort((a, b) => getKey(a) - getKey(b));
    
      function getKey(i) {
        i = i > 0 ? i : -i;
        return i % 10;
      }
    
      console.log(list.join(','));
    });
    

#### Java

    
    
    import java.util.Scanner;
    import java.util.ArrayList;
    import java.util.Comparator;
    import java.util.List;
    
    class Main {
        public static void main(String[] args) {
            // 创建 Scanner 对象，处理输入
            Scanner scanner = new Scanner(System.in);
            String[] inputNums = scanner.nextLine().split(",");
            List<Integer> numsList = new ArrayList<>();
            for (String inputNum : inputNums) {
                numsList.add(Integer.parseInt(inputNum)); // 将字符串类型的数字转换成整型并添加到列表中
            }
            // 对列表进行排序
            numsList.sort(new Comparator<Integer>() {
                @Override
                public int compare(Integer num1, Integer num2) {
                    return getKey(num1) - getKey(num2); // 根据数字的个位数进行排序
                }
                public Integer getKey(int num) {
                    num = num > 0 ? num : -num; // 将数字转换成正数
                    return num % 10; // 获取数字的个位数
                }
            });
            // 输出排序后的列表
            for (int i = 0; i < numsList.size(); i++) {
                System.out.print(numsList.get(i));
                if (i != numsList.size() - 1) {
                    System.out.print(",");
                }
            }
        }
    }
    

#### Python

    
    
    nums = input().split(",")
    nums = sorted(nums, key=lambda x: str(x)[-1])
    print(",".join(nums))
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

