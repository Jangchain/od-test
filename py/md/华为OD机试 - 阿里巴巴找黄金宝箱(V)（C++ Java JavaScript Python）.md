#### 题目描述

一贫如洗的樵夫阿里巴巴在去砍柴的路上，无意中发现了强盗集团的藏宝地，藏宝地有编号从0~N的箱子，每个箱子上面贴有一个数字。

阿里巴巴念出一个咒语数字k(k<N)，找出连续k个宝箱数字和的最大值，并输出该最大值。

#### 输入描述

第一行输入一个数字字串，数字之间使用逗号分隔，例如：2,10,-3,-8,40,5

  * 1 ≤ 字串中数字的个数 ≤ 100000
  * -10000 ≤ 每个数字 ≤ 10000

第二行输入咒语数字，例如：4，咒语数字大小小于宝箱的个数

#### 输出描述

连续k个宝箱数字和的最大值，例如：39

##### ACM输入输出模式

如果你经常使用**Leetcode** ,会知道**letcode** 是不需要编写输入输出函数的。但是华为OD机考使用的是 **ACM 模式**
，需要手动编写输入和输出。

所以最好在牛-
客上提前熟悉这种模式。例如C++使用`cin/cout`,python使用`input()/print()`。JavaScript使用node的`readline()`和`console.log()`。Java
使用`sacnner/system.out.print()`

#### 用例1

输入

    
    
    2,10,-3,-8,40,5
    4
    

输出

    
    
    39
    

#### 用例2

输入

    
    
    8
    1
    

输出

    
    
    8
    

#### 代码思路；

这道题的解题思路是使用滑动窗口来求解连续k个宝箱数字和的最大值。

首先，我们需要将输入的数字字串转换成一个整数数组。

接着，我们需要获取咒语数字k。

然后，我们定义一个变量window_sum来保存当前窗口中数字的和。初始时，window_sum的值为数组中前k个数字的和。

接下来，我们定义一个变量ans来保存连续k个宝箱数字和的最大值。初始时，ans的值为window_sum。

然后，我们使用一个循环来遍历数组中剩余的数字。在每次循环中，我们需要更新窗口的和。首先，我们需要将窗口的第一个数字移除，即将window_sum减去arr[i-1]。然后，我们需要将窗口的最后一个数字添加进来，即将window_sum加上arr[i+k-1]。最后，我们需要更新ans的值，将其更新为window_sum和ans中的较大值。

最后，我们返回ans作为结果。

整个算法的时间复杂度为O(n)，其中n为数组的长度。

#### 机考代码查重

华为OD机考完成之后，官方会进行代码查重。**华为 od 机考确实有很大的概率抽到原题**
。如果碰到了题库中的原题，一定不要直接使用题解中的代码，尤其是变量名，一定要修改，可以改成毫无意义的单词。除了变量名之外，代码的组织结构和逻辑一定要进行改变，这就要求在日常的刷题中，提前编写好属于自己的代码。

#### Java

    
    
    import java.util.Scanner;
    
    public class Main {
      public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
    
        // 读入数字序列
        String[] numsStr = scanner.nextLine().split(",");
        int[] nums = new int[numsStr.length];
        for (int i = 0; i < numsStr.length; i++) {
          nums[i] = Integer.parseInt(numsStr[i]);
        }
        
        // 读入咒语数字k
        int k = Integer.parseInt(scanner.nextLine());
    
        int maxSum = Integer.MIN_VALUE; // 初始最大值为最小整数
    
        int sum = 0; // 当前子序列数字之和
        // 计算前k个数字之和
        for (int i = 0; i < k; i++) {
          sum += nums[i];
        }
        maxSum = Math.max(maxSum, sum); // 更新最大值
    
        // 滑动窗口，依次计算每个长度为k的子序列的数字之和，并更新最大值
        for (int i = k; i < nums.length; i++) {
          sum = sum - nums[i - k] + nums[i]; // 更新窗口内数字之和
          maxSum = Math.max(maxSum, sum); // 更新最大值
        }
    
        System.out.println(maxSum);
      }
    }
    

#### C++

    
    
    #include <iostream>
    #include <sstream>
    #include <vector>
    #include <climits>
    
    using namespace std;
    
    int main() {
        string input;
        getline(cin, input);
        stringstream ss(input);
    
        vector<int> nums;
        string numStr;
        while (getline(ss, numStr, ',')) {
            nums.push_back(stoi(numStr));
        }
    
        int k;
        cin >> k;
    
        int maxSum = INT_MIN;
    
        int sum = 0;
        for (int i = 0; i < k; i++) {
            sum += nums[i];
        }
        maxSum = max(maxSum, sum);
    
        for (int i = k; i < nums.size(); i++) {
            sum = sum - nums[i - k] + nums[i];
            maxSum = max(maxSum, sum);
        }
    
        cout << maxSum << endl;
    
        return 0;
    }
    

#### JavaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.on('line', (numsStr) => {
      // 读入数字序列
      const nums = numsStr.split(",").map(num => parseInt(num));
    
      rl.on('line', (k) => {
        k = parseInt(k);
    
        let maxSum = Number.MIN_SAFE_INTEGER; // 初始最大值为最小整数
    
        let sum = 0; // 当前子序列数字之和
        // 计算前k个数字之和
        for (let i = 0; i < k; i++) {
          sum += nums[i];
        }
        maxSum = Math.max(maxSum, sum); // 更新最大值
    
        // 滑动窗口，依次计算每个长度为k的子序列的数字之和，并更新最大值
        for (let i = k; i < nums.length; i++) {
          sum = sum - nums[i - k] + nums[i]; // 更新窗口内数字之和
          maxSum = Math.max(maxSum, sum); // 更新最大值
        }
    
        console.log(maxSum);
    
        rl.close();
      });
    });
    
    

#### Python

    
    
    import sys
    
    # 读入数字序列
    nums_str = input().split(",")
    nums = [int(num) for num in nums_str]
    
    # 读入咒语数字k
    k = int(input())
    
    max_sum = -sys.maxsize - 1  # 初始最大值为最小整数
    
    sum = 0  # 当前子序列数字之和
    # 计算前k个数字之和
    for i in range(k):
        sum += nums[i]
    max_sum = max(max_sum, sum)  # 更新最大值
    
    # 滑动窗口，依次计算每个长度为k的子序列的数字之和，并更新最大值
    for i in range(k, len(nums)):
        sum = sum - nums[i - k] + nums[i]  # 更新窗口内数字之和
        max_sum = max(max_sum, sum)  # 更新最大值
    
    print(max_sum)
    

> #### 文章目录
>
>   *     *       * 题目描述
>       * 输入描述
>       * 输出描述
>       *         * ACM输入输出模式
>       * 用例1
>       * 用例2
>       * 代码思路；
>       * 机考代码查重
>       * Java
>       * C++
>       * JavaScript
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

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

#### 完整用例

##### 用例1

    
    
    2,10,-3,-8,40,5
    4
    

##### 用例2

    
    
    8
    1
    

##### 用例3

    
    
    0,0,0,0,0,0,0,0,0,0
    5
    

##### 用例4

    
    
    -5,-5,-5,-5,-5,-5,-5,-5,-5,-5
    3
    

##### 用例5

    
    
    1,2,3,4,5,6,7,8,9,10
    2
    

##### 用例6

    
    
    -1,2,-3,4,-5,6,-7,8,-9,10
    5
    

##### 用例7

    
    
    -10,-5,0,5,10,15,20,25,30,35
    3
    

##### 用例8

    
    
    1,3,5,7,9,11,13,15,17,19
    4
    

##### 用例9

    
    
    -10000,10000,-10000,10000,-10000,10000,-10000,10000,-10000,10000
    2
    

##### 用例10

    
    
    1,2,3,4,5,6,7,8,9,10
    6
    

