#### 题目描述

小明和朋友玩跳格子游戏，有 n 个连续格子组成的圆圈，每个格子有不同的分数，小朋友可以选择以任意格子起跳，但是不能跳连续的格子，不能回头跳，也不能超过一圈;

给定一个代表每个格子得分的非负整数数组，计算能够得到的最高分数。

#### 输入描述

给定一个数例，第一个格子和最后一个格子首尾相连，如: 2 3 2

#### 输出描述

输出能够得到的最高分，如: 3

#### 备注

  * 1 ≤ nums.length ≤ 100
  * 1 ≤ nums[i] ≤ 1000

#### 用例

输入| 2 3 2  
---|---  
输出| 3  
说明| 只能跳3这个格子，因为第一个格子和第三个格子首尾相连  
输入| 1 2 3 1  
---|---  
输出| 4  
说明| 1 + 3 = 4  
  
#### 解题思路

在这个问题中，我们需要计算在不跳连续格子的情况下，能够得到的最高分数。

题目中的格子是首尾相连的，因此我们需要考虑两种情况：

  1. 不包含最后一个元素的最大分数：在这种情况下，我们可以从第一个格子开始跳，但不能跳到最后一个格子。我们使用动态规划数组 `dp` 来存储每个状态的最大分数。对于每个状态，我们可以选择跳过当前格子（保持前一个状态的最大分数）或跳到当前格子（前一个状态的最大分数加上当前格子的分数）。我们从第一个格子开始，直到倒数第二个格子，计算这种情况下的最大分数 `max1`。

  2. 不包含第一个元素的最大分数：在这种情况下，我们不能从第一个格子开始跳，而是从第二个格子开始。我们同样使用动态规划数组 `dp` 来存储每个状态的最大分数。对于每个状态，我们可以选择跳过当前格子（保持前一个状态的最大分数）或跳到当前格子（前一个状态的最大分数加上当前格子的分数）。我们从第二个格子开始，直到最后一个格子，计算这种情况下的最大分数 `max2`。

最后，我们比较这两种情况下的最大分数，输出较大值作为结果。

之所以要分两种情况计算，是因为题目中的格子是首尾相连的，这意味着我们不能同时跳到第一个格子和最后一个格子。因此，我们需要分别计算不包含第一个元素和不包含最后一个元素的最大分数，然后取较大值作为结果。

#### C++

    
    
    #include <iostream>
    #include <vector>
    #include <sstream>
    #include <algorithm>
    #include <string>
    
    using namespace std;
    
    int main() {
        // 从控制台读取输入的一行
        string input;
        getline(cin, input);
    
        // 将输入的字符串分割为整数数组
        stringstream ss(input);
        int num;
        vector<int> nums;
        while (ss >> num) {
            nums.push_back(num);
        }
        int n = nums.size();
    
        // 如果只有一个格子，直接输出该格子的分数
        if (n == 1) {
            cout << nums[0] << endl;
        } else {
            // 创建动态规划数组 dp，用于存储每个状态的最大分数
            vector<int> dp(n);
    
            // 计算不包含最后一个元素的最大分数
            dp[0] = nums[0];
            dp[1] = max(nums[0], nums[1]);
            for (int i = 2; i < n - 1; i++) {
                // 对于每个状态，选择跳过当前格子或跳到当前格子的最大分数
                dp[i] = max(dp[i - 1], dp[i - 2] + nums[i]);
            }
            int max1 = dp[n - 2];
    
            // 计算不包含第一个元素的最大分数
            dp[0] = 0;
            dp[1] = nums[1];
            for (int i = 2; i < n; i++) {
                // 对于每个状态，选择跳过当前格子或跳到当前格子的最大分数
                dp[i] = max(dp[i - 1], dp[i - 2] + nums[i]);
            }
            int max2 = dp[n - 1];
    
            // 比较两种情况下的最大分数，输出较大值
            int result = max(max1, max2);
            cout << result << endl;
        }
    
        return 0;
    }
    
    

#### Java

    
    
    import java.util.Arrays;
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            // 创建 Scanner 对象以从控制台读取输入
            Scanner sc = new Scanner(System.in);
    
            // 读取输入的一行，并将其分割为整数数组
            int[] nums = Arrays.stream(sc.nextLine().split(" ")).mapToInt(Integer::parseInt).toArray();
            int n = nums.length;
    
            // 如果只有一个格子，直接输出该格子的分数
            if (n == 1) {
                System.out.println(nums[0]);
            } else {
                // 创建动态规划数组 dp，用于存储每个状态的最大分数
                int[] dp = new int[n];
    
                // 计算不包含最后一个元素的最大分数
                dp[0] = nums[0];
                dp[1] = Math.max(nums[0], nums[1]);
                for (int i = 2; i < n - 1; i++) {
                    // 对于每个状态，选择跳过当前格子或跳到当前格子的最大分数
                    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
                }
                int max1 = dp[n - 2];
    
                // 计算不包含第一个元素的最大分数
                dp[0] = 0;
                dp[1] = nums[1];
                for (int i = 2; i < n; i++) {
                    // 对于每个状态，选择跳过当前格子或跳到当前格子的最大分数
                    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
                }
                int max2 = dp[n - 1];
    
                // 比较两种情况下的最大分数，输出较大值
                int result = Math.max(max1, max2);
                System.out.println(result);
            }
        }
    }
    
    
    

#### javaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    // 从控制台读取输入
    rl.on('line', (input) => {
      // 将输入的字符串分割为整数数组
      const nums = input.split(' ').map(Number);
      const n = nums.length;
    
      // 如果只有一个格子，直接输出该格子的分数
      if (n === 1) {
        console.log(nums[0]);
      } else {
        // 创建动态规划数组 dp，用于存储每个状态的最大分数
        const dp = new Array(n);
    
        // 计算不包含最后一个元素的最大分数
        dp[0] = nums[0];
        dp[1] = Math.max(nums[0], nums[1]);
        for (let i = 2; i < n - 1; i++) {
          // 对于每个状态，选择跳过当前格子或跳到当前格子的最大分数
          dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
        }
        const max1 = dp[n - 2];
    
        // 计算不包含第一个元素的最大分数
        dp[0] = 0;
        dp[1] = nums[1];
        for (let i = 2; i < n; i++) {
          // 对于每个状态，选择跳过当前格子或跳到当前格子的最大分数
          dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
        }
        const max2 = dp[n - 1];
    
        // 比较两种情况下的最大分数，输出较大值
        const result = Math.max(max1, max2);
        console.log(result);
      }
    
      rl.close();
    });
    
    

#### Python

    
    
    def main():
        # 从输入中读取一行，并将其转换为整数列表
        nums = list(map(int, input().split()))
        n = len(nums)
    
        # 如果只有一个格子，直接输出该格子的分数
        if n == 1:
            print(nums[0])
        else:
            # 创建动态规划数组 dp，用于存储每个状态的最大分数
            dp = [0] * n
    
            # 计算不包含最后一个元素的最大分数
            dp[0] = nums[0]
            dp[1] = max(nums[0], nums[1])
            for i in range(2, n - 1):
                # 对于每个状态，选择跳过当前格子或跳到当前格子的最大分数
                dp[i] = max(dp[i - 1], dp[i - 2] + nums[i])
            max1 = dp[n - 2]
    
            # 计算不包含第一个元素的最大分数
            dp[0] = 0
            dp[1] = nums[1]
            for i in range(2, n):
                # 对于每个状态，选择跳过当前格子或跳到当前格子的最大分数
                dp[i] = max(dp[i - 1], dp[i - 2] + nums[i])
            max2 = dp[n - 1]
    
            # 比较两种情况下的最大分数，输出较大值
            result = max(max1, max2)
            print(result)
    
    if __name__ == "__main__":
        main()
    
    
    

#### 文章目录

  *     *       * 题目描述
      * 输入描述
      * 输出描述
      * 备注
      * 用例
      * 解题思路
      * C++
      * Java
      * javaScript
      * Python

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

