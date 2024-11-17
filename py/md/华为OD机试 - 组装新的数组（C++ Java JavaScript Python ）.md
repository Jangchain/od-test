#### 题目描述

给你一个整数M和数组N，N中的元素为连续整数，要求根据N中的元素组装成新的数组R，组装规则：

  1. R中元素总和加起来等于M
  2. R中的元素可以从N中重复选取
  3. R中的元素最多只能有1个不在N中，且比N中的数字都要小（不能为负数）

#### 输入描述

第一行输入是连续数组N，采用空格分隔  
第二行输入数字M

#### 输出描述

输出的是组装办法数量，int类型

#### 备注

  * 1 ≤ M ≤ 30
  * 1 ≤ N.length ≤ 1000

#### 用例

输入| 2  
5  
---|---  
输出| 1  
说明| 只有1种组装办法，就是[2,2,1]  
输入| 2 3  
5  
---|---  
输出| 2  
说明| 一共两种组装办法，分别是[2,2,1]，[2,3]  
  
#### C++

    
    
    #include <iostream>
    #include <vector>
    #include <sstream>
    #include <algorithm>
    using namespace std;
    int main() {
        string line;
        getline(cin, line);
        vector<int> arr;
        istringstream iss(line);
        int num;
        while (iss >> num) {
            arr.push_back(num);
        }
        int m;
        cin >> m;
    
        // 获取数组中的最小值
        int min_num = *min_element(arr.begin(), arr.end());
    
        // 动态规划
        vector<int> dp(m + 1, 0);
        dp[0] = 1;
        for (int num : arr) {
            for (int i = num; i <= m; i++) {
                dp[i] += dp[i - num];
            }
        }
    
        int count = dp[m];
        for (int i = 1; i < min_num; i++) {
            count += dp[m - i];
        }
    
        cout << count << endl;
        return 0;
    }
    
    

#### JavaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.on('line', (line) => {
      const arr = line.split(' ').map(Number);
      rl.on('line', (mInput) => {
        const m = parseInt(mInput, 10);
    
        // 获取数组中的最小值
        const minNum = Math.min(...arr);
    
        // 动态规划
        const dp = new Array(m + 1).fill(0);
        dp[0] = 1;
        for (const num of arr) {
          for (let i = num; i <= m; i++) {
            dp[i] += dp[i - num];
          }
        }
    
        let count = dp[m];
        for (let i = 1; i < minNum; i++) {
          count += dp[m - i];
        }
    
        console.log(count);
        rl.close();
      });
    });
    
    
    

#### Java

    
    
    import java.util.*;
    
    public class Main {
        public static void main(String[] args) {
            Scanner sc = new Scanner(System.in);
            String line = sc.nextLine();
            List<Integer> arr = new ArrayList<>();
            String[] nums = line.split(" ");
            for (String num : nums) {
                arr.add(Integer.parseInt(num));
            }
            int m = sc.nextInt();
    
            // 获取数组中的最小值
            int min_num = Collections.min(arr);
    
            // 动态规划
            int[] dp = new int[m + 1];
            dp[0] = 1;
            for (int num : arr) {
                for (int i = num; i <= m; i++) {
                    dp[i] += dp[i - num];
                }
            }
    
            int count = dp[m];
            for (int i = 1; i < min_num; i++) {
                count += dp[m - i];
            }
    
            System.out.println(count);
        }
    }
    
    

#### Python

    
    
    def main():
        line = input().strip()
        arr = list(map(int, line.split()))
        m = int(input())
    
        # 获取数组中的最小值
        min_num = min(arr)
    
        # 动态规划
        dp = [0] * (m + 1)
        dp[0] = 1
        for num in arr:
            for i in range(num, m + 1):
                dp[i] += dp[i - num]
    
        count = dp[m]
        for i in range(1, min_num):
            count += dp[m - i]
    
        print(count)
    
    if __name__ == "__main__":
        main()
    
    

#### 文章目录

  *     *       * 题目描述
      * 输入描述
      * 输出描述
      * 备注
      * 用例
      * C++
      * JavaScript
      * Java
      * Python

![fengmian](https://img-
blog.csdnimg.cn/img_convert/1d2f33ed8cf2fb1b9a4fe09513f7aa94.png)

