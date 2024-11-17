#### 题目描述

小明和朋友玩跳格子游戏，有 n 个连续格子，每个格子有不同的分数，小朋友可以选择以任意格子起跳，但是不能跳连续的格子，也不能回头跳；

给定一个代表每个格子得分的非负整数数组，计算能够得到的最高分数。

#### 输入描述

给定一个数列，如：1 2 3 1

#### 输出描述

输出能够得到的最高分，如：4

#### 备注

1 ≤ nums.length ≤ 100  
0 ≤ nums[i] ≤ 1000

#### 用例1

输入

    
    
    1 2 3 1
    

输出

    
    
    4
    

说明

> 选择跳第一个格子和第三个格子

#### 用例2

输入

    
    
    2 7 9 3 1
    

输出

    
    
    12
    

说明

> 2+9+1=12

#### C++

    
    
    #include <iostream>
    #include <vector>
    #include <algorithm>
    #include <sstream>
    
    int main() {
        std::vector<int> scores;
        std::string input;
        std::getline(std::cin, input);
        std::istringstream iss(input);
        int num;
        while (iss >> num) {
            scores.push_back(num);
        }
    
        int n = scores.size();
    
        int currMax = scores[0];
        int prevMax = std::max(scores[0], scores[1]);
    
        for (int i = 2; i < n; i++) {
            int temp = std::max(prevMax, currMax + scores[i]);
            currMax = prevMax;
            prevMax = temp;
        }
    
        std::cout << prevMax << std::endl;
    
        return 0;
    }```
    
    
    
    ### JavaScript
    
    ```js
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.on('line', (input) => {
      const scores = input.split(" ").map(Number);
      const n = scores.length;
    
      let currMax = scores[0];
      let prevMax = Math.max(scores[0], scores[1]);
    
      for (let i = 2; i < n; i++) {
        let temp = Math.max(prevMax, currMax + scores[i]);
        currMax = prevMax;
        prevMax = temp;
      }
    
      console.log(prevMax);
    
      rl.close();
    });
    

#### Java

    
    
    import java.util.Arrays;
    import java.util.Scanner;
    
    public class Main {
      public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
    
        // 输入数列
        int[] scores = Arrays.stream(sc.nextLine().split(" ")).mapToInt(Integer::parseInt).toArray();
    
        int n = scores.length;
    
        // 记录当前位置的最高分数
        int currMax = scores[0];
        // 记录上一个位置的最高分数
        int prevMax = Math.max(scores[0], scores[1]);
    
        for (int i = 2; i < n; i++) {
          // 计算当前位置的最高分数
          int temp = Math.max(prevMax, currMax + scores[i]);
          // 更新currMax和prevMax
          currMax = prevMax;
          prevMax = temp;
        }
    
        // 输出最后一个位置的最高分数
        System.out.println(prevMax);
      }
    }
    
    

#### Python

    
    
    # 输入数列
    scores = list(map(int, input().split()))
    
    n = len(scores)
    
    # 记录当前位置的最高分数
    currMax = scores[0]
    # 记录上一个位置的最高分数
    prevMax = max(scores[0], scores[1])
    
    for i in range(2, n):
        # 计算当前位置的最高分数
        temp = max(prevMax, currMax + scores[i])
        # 更新currMax和prevMax
        currMax = prevMax
        prevMax = temp
    
    # 输出最后一个位置的最高分数
    print(prevMax)
    

> #### 文章目录
>
>   *     *       * 题目描述
>       * 输入描述
>       * 输出描述
>       * 备注
>       * 用例1
>       * 用例2
>       * C++
>       * Java
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

1 2 3 1

##### 用例2

2 7 9 3 1

##### 用例3

5 1 2 3 4 5

##### 用例4

3 5 2 1 8 4

##### 用例5

4 3 2 1 5 6

##### 用例6

2 7 1 8 2 9 1 4 5

##### 用例7

3 5 2 1 4 7 9 3 2 6

##### 用例8

9 8 7 6 5 4 3 2 1 0

##### 用例9

1 3 5 7 9 11 13 15 17 19

##### 用例10

1 2 3 4 5 6 7 8 9 10

