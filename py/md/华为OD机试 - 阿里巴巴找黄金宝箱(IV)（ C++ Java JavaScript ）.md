#### 题目描述

一贫如洗的樵夫阿里巴巴在去砍柴的路上，无意中发现了强盗集团的藏宝地，藏宝地有编号从0-N的箱子，每个箱子上面有一个数字，箱子排列成一个环，编号最大的箱子的下一个是编号为0的箱子。

请输出每个箱了贴的数字之后的第一个比它大的数，如果不存在则输出-1。

#### 输入描述

输入一个数字字串，数字之间使用逗号分隔，例如: 1,2,3,1

  * 1 ≤ 字串中数字个数 ≤ 10000:
  * -100000 ≤ 每个数字值 ≤ 100000

#### 输出描述

下一个大的数列表，以逗号分隔，例如: 2,3,6,-1,6

##### ACM输入输出模式

如果你经常使用**Leetcode** ,会知道**letcode** 是不需要编写输入输出函数的。但是华为OD机考使用的是 **ACM 模式**
，需要手动编写输入和输出。

所以最好在牛-
客上提前熟悉这种模式。例如C++使用`cin/cout`,python使用`input()/print()`。JavaScript使用node的`readline()`和`console.log()`。Java
使用`sacnner/system.out.print()`

#### 用例1

输入

    
    
    2,5,2
    

输出

    
    
    5,-1,5
    

说明

> 第一个2的下一个更大的数是5;
>
> 数字5找不到下一个更大的数;
>
> 第二个2的下一个最大的数需要循环搜索，结果也是 5

#### 用例2

输入

    
    
    3,4,5,6,3
    

输出

    
    
    4,5,6,-1.4
    

#### 机考代码查重

华为OD机考完成之后，官方会进行代码查重。**华为 od 机考确实有很大的概率抽到原题**
。如果碰到了题库中的原题，一定不要直接使用题解中的代码，尤其是变量名，一定要修改，可以改成毫无意义的单词。除了变量名之外，代码的组织结构和逻辑一定要进行改变，这就要求在日常的刷题中，提前编写好属于自己的代码。

#### Java

    
    
    import java.util.Arrays;
    import java.util.LinkedList;
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            Scanner in = new Scanner(System.in);
            // 将输入的数字字符串转为整型数组
            int[] nums = Arrays.stream(in.nextLine().split(",")).mapToInt(Integer::parseInt).toArray();
            LinkedList<int[]> stack = new LinkedList<>();
            int[] res = new int[nums.length];
            // 初始化结果数组为-1
            Arrays.fill(res, -1);
    
            // 遍历环形数组
            for (int i = 0; i < nums.length * 2; i++) {
                int cur = nums[i % nums.length];
                while (!stack.isEmpty() && cur > stack.getLast()[0]) {
                    int[] top = stack.removeLast();
                    res[top[1]] = cur;
                }
                stack.addLast(new int[]{cur, i % nums.length});
            }
    
            // 将结果数组转为字符串输出
            StringBuilder result = new StringBuilder();
            for (int v : res) {
                result.append(v).append(",");
            }
            System.out.println(result.substring(0, result.length() - 1));
        }
    }
    

#### C++

    
    
    #include <iostream>
    #include <vector>
    #include <sstream>
    #include <deque>
    #include <algorithm>
    
    using namespace std;
    
    int main() {
        string input;
        getline(cin, input);
        stringstream ss(input);
    
        vector<int> nums;
        string num;
        while (getline(ss, num, ',')) {
            nums.push_back(stoi(num));
        }
    
        deque<vector<int>> stack;
        vector<int> res(nums.size(), -1);
    
        for (int i = 0; i < nums.size() * 2; i++) {
            int cur = nums[i % nums.size()];
            while (!stack.empty() && cur > stack.back()[0]) {
                vector<int> top = stack.back();
                stack.pop_back();
                res[top[1]] = cur;
            }
            stack.push_back({cur, i % nums.size()});
        }
    
        string result;
        for (int v : res) {
            result += to_string(v) + ",";
        }
        result = result.substr(0, result.length() - 1);
        cout << result << endl;
    
        return 0;
    }
    
    

#### JavaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.on("line", function(input) {
      const nums = input.split(",").map(Number);
      const stack = [];
      const res = new Array(nums.length).fill(-1);
    
      for (let i = 0; i < nums.length * 2; i++) {
        const cur = nums[i % nums.length];
        while (stack.length > 0 && cur > stack[stack.length - 1][0]) {
          const top = stack.pop();
          res[top[1]] = cur;
        }
        stack.push([cur, i % nums.length]);
      }
    
      const result = res.join(",");
      console.log(result);
    })
    

#### Python

    
    
    nums = list(map(int, input().split(",")))
    stack = []
    res = [-1] * len(nums)
    
    for i in range(len(nums) * 2):
        cur = nums[i % len(nums)]
        while stack and cur > stack[-1][0]:
            top = stack.pop()
            res[top[1]] = cur
        stack.append([cur, i % len(nums)])
    
    result = ""
    for v in res:
        result += str(v) + ","
    print(result[:-1])
    

> #### 文章目录
>
>   *     *       * 题目描述
>       * 输入描述
>       * 输出描述
>       *         * ACM输入输出模式
>       * 用例1
>       * 用例2
>       * 机考代码查重
>       * Java
>       * C++
>       * JavaScript
>       * Python
>

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

