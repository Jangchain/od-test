### 题目描述：阿里巴巴找黄金宝箱

一贫如洗的樵夫阿里巴巴在去砍柴的路上，无意中发现了强盗集团的藏宝地，藏宝地有编号从0~N的箱子，每个箱子上面贴有一个数字，箱子中可能有一个黄金宝箱。

黄金宝箱满足排在它之前的所有箱子数字和等于排在它之后的所有箱子数字和；第一个箱子左边部分的数字和定义为0；最后一个宝箱右边部分的数字和定义为0。

请帮阿里巴巴找到黄金宝箱，输出第一个满足条件的黄金宝箱编号，如果不存在黄金宝箱，请返回-1。

### 输入描述：

箱子上贴的数字列表，使用逗号分隔，例如1，-1，0。

宝箱的数量不小于1个，不超过10000

宝箱上贴的数值范围不低于-1000，不超过1000

### 输出描述：

第一个黄金宝箱的编号

##### ACM输入输出模式

如果你经常使用**Leetcode** ,会知道**letcode** 是不需要编写输入输出函数的。但是华为OD机考使用的是 **ACM 模式**
，需要手动编写输入和输出。

所以最好在牛-
客上提前熟悉这种模式。例如C++使用`cin/cout`,python使用`input()/print()`。JavaScript使用node的`readline()`和`console.log()`。Java
使用`sacnner/system.out.print()`

### 用例1

输入

    
    
    2,5,-1,8,6
    

输出

    
    
    3
    

说明：

> 下标3之前的数字和为：2 + 5 + -1 = 6  
>  下标3之后的数字和为：6 = 6

### 用例2

输入：

    
    
    8,9
    

输出：

    
    
    -1
    

说明：

> 不存在符合要求的位置

### 用例3

输入：

    
    
    11
    

输出：

    
    
    0
    

说明：

> 下标0之前的数字和为：0

> 下标0之后的数字和为：0

#### 机考代码查重

华为OD机考完成之后，官方会进行代码查重。**华为 od 机考确实有很大的概率抽到原题**
。如果碰到了题库中的原题，一定不要直接使用题解中的代码，尤其是变量名，一定要修改，可以改成毫无意义的单词。除了变量名之外，代码的组织结构和逻辑一定要进行改变，这就要求在日常的刷题中，提前编写好属于自己的代码。

### 解题思路：

题目要求找到第一个满足条件的黄金宝箱，即排在它之前的所有箱子数字和等于排在它之后的所有箱子数字和。因此，可以遍历每个箱子，计算它前面所有数字的和作为左部分的和，计算它后面所有数字的和作为右部分的和，判断左部分的和是否等于右部分的和，如果相等就是黄金宝箱，输出它的编号即可。如果遍历完所有箱子都没有找到黄金宝箱，则输出-1。

### C++

    
    
    #include <iostream>
    #include <string>
    #include <sstream>
    #include <vector>
    using namespace std;
    
    int main() {
        // 输入
        string input;
        getline(cin, input);  // 获取一行输入
        stringstream ss(input);  // 将输入转换成stringstream对象，便于逐个获取数字
        vector<int> nums;  // 存储输入的数字
        string temp;  // 用于逐个获取数字的临时变量
        while (getline(ss, temp, ',')) {  // 逐个获取数字，以逗号为分隔符
            nums.push_back(stoi(temp));  // 将字符串转换成整数并存入nums中
        }
        int n = nums.size();  // 数字个数
        // 初始化左右两部分的和
        int left_sum = 0, right_sum = 0;
        for (int num : nums) {  // 计算所有数字的和，作为右部分的和
            right_sum += num;
        }
        // 遍历每个箱子，判断是否为黄金宝箱
        bool flag = false;  // 是否找到黄金宝箱的标志
        for (int i = 0; i < n; i++) {
            if (i != 0) {  // 左部分的和不包括第一个数字
                left_sum += nums[i - 1];
            }
            right_sum -= nums[i];  // 右部分的和不包括当前数字
            if (left_sum == right_sum) {  // 判断是否为黄金宝箱
                cout << i;  // 输出黄金宝箱的编号
                flag = true;  // 找到了黄金宝箱
                break;  // 直接退出循环
            }
        }
        // 输出结果
        if (!flag) {  // 如果没有找到黄金宝箱
            cout << -1;  // 输出-1
        }
        return 0;
    }
    

### python

    
    
    import sys
    
    # 输入
    input = sys.stdin.readline().strip()
    nums = list(map(int, input.split(',')))
    n = len(nums)
    
    # 初始化左右两部分的和
    left_sum = 0
    right_sum = sum(nums)
    
    # 遍历每个箱子，判断是否为黄金宝箱
    flag = False  # 是否找到黄金宝箱的标志
    for i in range(n):
        if i != 0:  # 左部分的和不包括第一个数字
            left_sum += nums[i - 1]
        right_sum -= nums[i]  # 右部分的和不包括当前数字
        if left_sum == right_sum:  # 判断是否为黄金宝箱
            print(i)  # 输出黄金宝箱的编号
            flag = True  # 找到了黄金宝箱
            break  # 直接退出循环
    
    # 输出结果
    if not flag:  # 如果没有找到黄金宝箱
        print(-1)  # 输出-1
    

### javaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.on('line', function (line) {
      // 输入
      const input = line.trim();
      const nums = input.split(',').map(Number);
      const n = nums.length;
      // 初始化左右两部分的和
      let left_sum = 0, right_sum = nums.reduce((sum, num) => sum + num, 0);
      // 遍历每个箱子，判断是否为黄金宝箱
      let flag = false;  // 是否找到黄金宝箱的标志
      for (let i = 0; i < n; i++) {
        if (i !== 0) {  // 左部分的和不包括第一个数字
          left_sum += nums[i - 1];
        }
        right_sum -= nums[i];  // 右部分的和不包括当前数字
        if (left_sum === right_sum) {  // 判断是否为黄金宝箱
          console.log(i);  // 输出黄金宝箱的编号
          flag = true;  // 找到了黄金宝箱
          break;  // 直接退出循环
        }
      }
      // 输出结果
      if (!flag) {  // 如果没有找到黄金宝箱
        console.log(-1);  // 输出-1
      }
    });
    

### java

    
    
    import java.util.Scanner;
    import java.util.ArrayList;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            // 输入
            String input = scanner.nextLine();
            String[] numsStr = input.split(",");  // 以逗号为分隔符，分割数字字符串
            ArrayList<Integer> nums = new ArrayList<>();  // 存储输入的数字
            for (String numStr : numsStr) {
                nums.add(Integer.parseInt(numStr));  // 将字符串转换成整数并存入nums中
            }
            int n = nums.size();  // 数字个数
            // 初始化左右两部分的和
            int left_sum = 0, right_sum = 0;
            for (int num : nums) {  // 计算所有数字的和，作为右部分的和
                right_sum += num;
            }
            // 遍历每个箱子，判断是否为黄金宝箱
            boolean flag = false;  // 是否找到黄金宝箱的标志
            for (int i = 0; i < n; i++) {
                if (i != 0) {  // 左部分的和不包括第一个数字
                    left_sum += nums.get(i - 1);
                }
                right_sum -= nums.get(i);  // 右部分的和不包括当前数字
                if (left_sum == right_sum) {  // 判断是否为黄金宝箱
                    System.out.println(i);  // 输出黄金宝箱的编号
                    flag = true;  // 找到了黄金宝箱
                    break;  // 直接退出循环
                }
            }
            // 输出结果
            if (!flag) {  // 如果没有找到黄金宝箱
                System.out.println(-1);  // 输出-1
            }
        }
    }
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

#### 完整用例

##### 用例1

    
    
    1,2,3,4,5
    

##### 用例2

    
    
    2,5,-1,8,6
    

##### 用例3

    
    
    8,9
    

##### 用例4

    
    
    11
    

##### 用例5

    
    
    10,20,-30,40
    

##### 用例6

    
    
    -1,-2,-3,-4,-5
    

##### 用例7

    
    
    1000,2000,3000,4000,5000,6000,7000,8000,9000,10000
    

##### 用例8

    
    
    -1000,1000,-500,500,-250,250,-125,125,-62,62
    

##### 用例9

    
    
    -1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1
    

##### 用例10

    
    
    -1,0,1,2,3,4,5,4,3,2,1,0,-1
    

