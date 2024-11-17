## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

#### 题目描述

给定一个整数数组 nums、一个数字k，一个整数目标值
target，请问nums中是否存在k个元素使得其相加结果为target，请输出所有符合条件且不重复的k元组的个数

数据范围

  * 2 ≤ nums.length ≤ 200
  * -10^9 ≤ nums[i] ≤ 10^9
  * -10^9 ≤ target ≤ 10^9
  * 2 ≤ k ≤ 100

#### 输入描述

第一行是nums取值：2 7 11 15

第二行是k的取值：2

第三行是target取值：9

#### 输出描述

输出第一行是符合要求的元组个数：1

补充说明：[2,7]满足，输出个数是1

#### 用例

输入| -1 0 1 2 -1 -4  
3  
0  
---|---  
输出| 2  
说明| [-1,0,1]，[-1,-1,2]满足条件  
输入| 2 7 11 15  
2  
9  
---|---  
输出| 1  
说明| [2,7]符合条件  
  
#### 解题思路

这段代码的目标是计算一个整数数组中，元素个数为k且总和等于目标值target的不重复元组的数量。

主要思路是使用深度优先搜索（DFS）来遍历数组中的元素，构建可能的元组。在搜索的过程中，通过递归调用dfs函数，记录当前元组的累加和和元素个数。

具体的解题思路如下：

  1. 首先，通过`readline`模块逐行读取输入，将输入存储在`input`数组中。

  2. 定义一个`dfs`函数，该函数用于进行深度优先搜索。`dfs`函数接受三个参数：`index`表示当前元素的索引，`total`表示当前元组的累加和，`count`表示当前元组中元素的个数。

  3. 在`dfs`函数中，使用一个循环遍历数组中从`index`开始的元素。在遍历过程中，使用条件判断语句进行去重操作，避免重复计算相同的元组。

  4. 在循环中，更新当前累加和和元素个数，分别赋值给`newTotal`和`newCount`。

  5. 如果`newCount`等于`k`，表示当前元组中元素的个数等于目标值`k`。在这种情况下，如果`newTotal`等于目标值`target`，则说明找到了一个符合条件的元组，将答案`ans`加1。

  6. 如果`newCount`不等于`k`，说明当前元组中元素的个数还不足`k`，则继续递归调用`dfs`函数，将索引`i + 1`作为参数传递给下一层递归。

  7. 在主程序中，首先将输入的字符串转换为整数数组`nums`，并将`k`和`target`转换为整数。

  8. 对整数数组`nums`进行排序，以便后续的遍历和去重操作。

  9. 调用`dfs`函数，初始时的索引为0，累加和为0，元素个数为0。

  10. 最后，输出符合条件的元组个数`ans`。

#### JavaScript

    
    
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    let nums, k, target, ans;
    
    let input = [];
    rl.on('line', (line) => {
      input.push(line.trim());
      if (input.length === 3) {
        rl.close();
        nums = input[0].split(' ').map(Number);
        k = Number(input[1]);
        target = Number(input[2]);
        ans = 0;
    
        nums.sort(); // 对整数数组进行排序，方便后续的遍历和去重
        dfs(0, 0, 0); // 调用深度优先搜索函数进行遍历和计数
        console.log(ans); // 输出符合条件的元组个数
      }
    });
    
    function dfs(index, total, count) {
      for (let i = index; i < nums.length; i++) {
        if (i > index && nums[i] === nums[i - 1]) continue; // 去重，避免重复计算相同的元组
    
        const newTotal = total + nums[i]; // 更新当前累加和
        const newCount = count + 1; // 更新当前元组中元素的个数
    
        if (newCount === k) { // 如果当前元组中元素的个数等于k
          if (newTotal === target) { // 并且当前累加和等于目标值
            ans += 1; // 则符合条件的元组个数加1
          }
        } else {
          dfs(i + 1, newTotal, newCount); // 继续递归遍历下一个元素
        }
      }
    }
    
    
     
    

#### C++

    
    
    #include <iostream>
    #include <vector>
    #include <algorithm>
    #include <sstream>
    
    std::vector<int> nums; // 存储输入的整数数组
    int k; // 存储k的值
    int target; // 存储目标值
    int ans = 0; // 存储符合条件的元组个数
    
    void dfs(int index, long long total, int count) {
      for (int i = index; i < nums.size(); i++) {
        if (i > index && nums[i] == nums[i - 1]) continue; // 去重，避免重复计算相同的元组
    
        long long newTotal = total + nums[i]; // 更新当前累加和
        int newCount = count + 1; // 更新当前元组中元素的个数
    
        if (newCount == k) { // 如果当前元组中元素的个数等于k
          if (newTotal == target) { // 并且当前累加和等于目标值
            ans += 1; // 则符合条件的元组个数加1
          }
        } else {
          dfs(i + 1, newTotal, newCount); // 继续递归遍历下一个元素
        }
      }
    }
    
    int main() {
      std::string numsInput;
      std::getline(std::cin, numsInput);
      std::stringstream ss(numsInput);
      int num;
      while (ss >> num) {
        nums.push_back(num);
      }
    
      std::cin >> k;
    
      std::cin >> target;
    
      std::sort(nums.begin(), nums.end()); // 对整数数组进行排序，方便后续的遍历和去重
      dfs(0, 0, 0); // 调用深度优先搜索函数进行遍历和计数
      std::cout << ans << std::endl; // 输出符合条件的元组个数
    
      return 0;
    }
    
    

#### Java

    
    
    import java.util.Arrays;
    import java.util.Scanner;
    
    public class Main {
        static int[] nums; // 存储输入的整数数组
        static int k; // 存储k的值
        static int target; // 存储目标值
        static int ans = 0; // 存储符合条件的元组个数
    
        public static void main(String[] args) {
            Scanner sc = new Scanner(System.in);
    
            nums = Arrays.stream(sc.nextLine().split(" ")).mapToInt(Integer::parseInt).toArray(); // 读取并解析输入的整数数组
            k = Integer.parseInt(sc.nextLine()); // 读取k的值
            target = Integer.parseInt(sc.nextLine()); // 读取目标值
    
            Arrays.sort(nums); // 对整数数组进行排序，方便后续的遍历和去重
            dfs(0, 0, 0); // 调用深度优先搜索函数进行遍历和计数
            System.out.println(ans); // 输出符合条件的元组个数
        }
     
        public static void dfs(int index, long total, int count) {
            for (int i = index; i < nums.length; i++) {
                if (i > index && nums[i] == nums[i - 1]) continue; // 去重，避免重复计算相同的元组
    
                long newTotal = total + nums[i]; // 更新当前累加和
                int newCount = count + 1; // 更新当前元组中元素的个数
    
                if (newCount == k) { // 如果当前元组中元素的个数等于k
                    if (newTotal == target) { // 并且当前累加和等于目标值
                        ans += 1; // 则符合条件的元组个数加1
                    }
                } else {
                    dfs(i + 1, newTotal, newCount); // 继续递归遍历下一个元素
                }
            }
        }
    }
    
    

#### Python

    
    
    def dfs(index, total, count):
      global ans
      for i in range(index, len(nums)):
        if i > index and nums[i] == nums[i - 1]:
          continue  # 去重，避免重复计算相同的元组
    
        newTotal = total + nums[i]  # 更新当前累加和
        newCount = count + 1  # 更新当前元组中元素的个数
    
        if newCount == k:  # 如果当前元组中元素的个数等于k
          if newTotal == target:  # 并且当前累加和等于目标值
            ans += 1  # 则符合条件的元组个数加1
        else:
          dfs(i + 1, newTotal, newCount)  # 继续递归遍历下一个元素
    
    nums = list(map(int, input().split()))
    k = int(input())
    target = int(input())
    ans = 0
    
    nums.sort()  # 对整数数组进行排序，方便后续的遍历和去重
    dfs(0, 0, 0)  # 调用深度优先搜索函数进行遍历和计数
    print(ans)  # 输出符合条件的元组个数
    
    

#### 完整用例

##### 用例1

    
    
    -1 0 1 2 -1 -4
    3
    0
    

##### 用例2

    
    
    2 7 11 15
    2
    9
    

##### 用例3

    
    
    1 2 3 4 5
    3
    6
    

##### 用例4

    
    
    -2 0 1 1 2
    4
    0
    

##### 用例5

    
    
    1 1 1 2 2 3 4 4
    3
    6
    

##### 用例6

    
    
    -3 -2 -1 0 1 2 3
    3
    0
    

##### 用例7

    
    
    1 1 2 2 2 3 3 4
    4
    8
    

##### 用例8

    
    
    -5 -4 -3 -2 -1 0 1 2 3 4 5
    5
    0
    

##### 用例9

    
    
    1 2 3 4 5 6 7 8 9
    3
    15
    

##### 用例10

    
    
    -10 0 10 20 30 40 50
    4
    60
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

