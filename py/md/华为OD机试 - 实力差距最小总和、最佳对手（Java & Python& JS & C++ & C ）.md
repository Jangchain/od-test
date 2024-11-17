## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

游戏里面，队伍通过匹配实力相近的对手进行对战。但是如果匹配的队伍实力相差太大，对于双方游戏体验都不会太好。

给定n个队伍的实力值，对其进行两两实力匹配，两支队伍实例差距在允许的最大差距d内，则可以匹配。  
要求在匹配队伍最多的情况下匹配出的各组实力差距的总和最小。

## 输入描述

第一行，n，d。队伍个数n。允许的最大实力差距d。

  * 2<=n <=50
  * 0<=d<=100

第二行，n个队伍的实力值空格分割。

  * 0<=各队伍实力值<=100

## 输出描述

匹配后，各组对战的实力差值的总和。若没有队伍可以匹配，则输出-1。

## 示例1

输入

    
    
    6 30
    81 87 47 59 81 18
    

输出

    
    
    57
    

说明

> 18与47配对，实力差距29  
>  59与81配对，实力差距22  
>  81与87配对，实力差距6  
>  总实力差距29+22+6=57

## 示例2

输入

    
    
    6 20
    81 87 47 59 81 18
    

输出

    
    
    12
    

说明

> 最多能匹配成功4支队伍。  
>  47与59配对，实力差距12，  
>  81与81配对，实力差距0。  
>  总实力差距12+0=12

## 示例3

输入

    
    
    4 10
    40 51 62 73
    

输出

    
    
    -1
    

说明

> 实力差距都在10以上，  
>  没有队伍可以匹配成功。

## 解题思路

给定 `n` 个队伍的实力值和一个允许的最大实力差距 `d`，要求将队伍进行两两配对，满足每对队伍的实力差距不超过
`d`，并且在尽可能多的匹配情况下，使所有匹配的实力差距的总和最小。如果没有符合条件的匹配，则输出 `-1`。

#### 动态规划思路

  1. **状态定义** ： 
     * `pairs[i]`：前 `i` 个队伍中最多能匹配的队伍对数。
     * `min_sum[i]`：前 `i` 个队伍的最小实力差距总和。
  2. **状态转移** ： 
     * 对于每一个队伍 `i`，考虑是否将第 `i` 和第 `i-1` 个队伍配对。
     * 如果配对成立（差距在允许范围内），则更新 `pairs[i]` 和 `min_sum[i]`，确保匹配数最多且差距总和最小。
  3. **转移规则** ： 
     * 对每一组队伍，从第 2 组开始遍历，尝试将相邻的队伍进行配对。如果配对后能增加匹配数量或使差距总和更小，则更新状态。
  4. **边界处理** ： 
     * 如果最终没有任何队伍能匹配，则输出 `-1`。否则输出 `min_sum[n]`，即最小的实力差距总和。

## Java

    
    
    import java.util.*;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            
            // 读取队伍数量 n 和最大允许差距 d
            int n = scanner.nextInt();  
            int d = scanner.nextInt();  
            
            // 用来存储各队伍的实力值
            List<Integer> nums = new ArrayList<>();  
            
            // 读取每个队伍的实力值并添加到 nums 列表中
            for (int i = 0; i < n; i++) {  
                int num = scanner.nextInt();
                nums.add(num);
            }
            
            // 对队伍实力值进行升序排序，方便后续贪心和动态规划处理
            Collections.sort(nums);  
    
            // 初始化 pairs 列表，存储能匹配的对的数量，n+1个元素，初始值为 0
            List<Integer> pairs = new ArrayList<>(Collections.nCopies(n+1, 0));  
            
            // 初始化 min_sum 列表，存储最小的差值总和，n+1个元素，初始值为 0
            List<Integer> min_sum = new ArrayList<>(Collections.nCopies(n+1, 0));  
    
            // 从第3个元素开始考虑配对（因为要两两配对，所以从2开始）
            for (int i = 2; i < n+1; i++) {
                int tmp = 0;
                
                // 如果当前两支队伍的实力差距在允许范围内，tmp置为1，表示可以匹配
                if (nums.get(i-1) - nums.get(i-2) <= d) {
                    tmp += 1;
                }
    
                // 比较是否选择配对前两支队伍能获得更多的匹配数量
                if (pairs.get(i-2) + tmp > pairs.get(i-1)) {
                    // 如果配对前两支队伍能得到更多的配对数量，更新 pairs 和 min_sum
                    pairs.set(i, pairs.get(i-2) + tmp);  
                    min_sum.set(i, min_sum.get(i-2) + nums.get(i-1) - nums.get(i-2));  
                }
                // 如果不配对前两支队伍能保持或增加匹配数量，则选择不配对
                else if (pairs.get(i-2) + tmp < pairs.get(i-1)) {
                    // 配对数量不增加，保持原有的状态
                    pairs.set(i, pairs.get(i-1));  
                    min_sum.set(i, min_sum.get(i-1));  
                }
                // 如果配对数量相同，则选择差距更小的配对策略
                else {
                    if (tmp == 1) {
                        // 如果配对，选择较小的差值总和
                        min_sum.set(i, Math.min(min_sum.get(i-1), min_sum.get(i-2) + nums.get(i-1) - nums.get(i-2)));  
                    }
                    else {
                        // 如果不配对，选择保持原有的差值总和
                        min_sum.set(i, Math.min(min_sum.get(i-1), min_sum.get(i-2)));  
                    }
                    pairs.set(i, pairs.get(i-1));  // 匹配数量保持不变
                }
            }
    
            // 最终结果：如果没有任何队伍配对成功，输出 -1，否则输出最小的差值总和
            if (pairs.get(n) == 0) {
                System.out.println(-1);  // 无法配对
            } else {
                System.out.println(min_sum.get(n));  // 输出最小的差值总和
            }
        }
    }
    
    

## Python

    
    
    n, d = map(int, input().split())
    nums = list(map(int, input().split()))
    nums.sort()
    
    pairs = [0] * (n+1)
    min_sum = [0] * (n+1)
    
    for i in range(2, n+1):
        tmp = 0
        if nums[i-1] - nums[i-2] <= d:
            tmp += 1
        if pairs[i-2] + tmp > pairs[i-1]:
            pairs[i] = pairs[i-2] + tmp
            min_sum[i] = min_sum[i-2] + nums[i-1] - nums[i-2]
        elif pairs[i-2] + tmp < pairs[i-1]:
            pairs[i] = pairs[i-1]
            min_sum[i] = min_sum[i-1]
        else:
            if tmp == 1:
                min_sum[i] = min(min_sum[i-1], min_sum[i-2] + nums[i-1] - nums[i-2])
            else:
                min_sum[i] = min(min_sum[i-1], min_sum[i-2])
            pairs[i] = pairs[i-1]
    
    if pairs[n] == 0:
        print(-1)
    else:
        print(min_sum[n])
    
    

## JavaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    let input = [];
    rl.on('line', (line) => {
      input.push(line);
      if(input.length === 2){
        const [n, d] = input[0].split(' ').map(Number);
        const nums = input[1].split(' ').map(Number).sort((a, b) => a - b);
    
        //pair个数
        const pairs = new Array(n+1).fill(0);
        //最小和
        const min_sum = new Array(n+1).fill(0);
    
        // 动态规划求解最小和
        for (let i = 2; i < n+1; i++){
            let tmp = 0;
            // 如果两个队伍之间的实力差距小于等于d，则它们可以匹配
            if (nums[i-1] - nums[i-2] <= d)
                tmp += 1;
    
            // 如果匹配i-1个队伍的最小和小于匹配i-2个队伍的最小和，那么匹配i个队伍的最小和就是匹配i-2个队伍的最小和加上i-1和i队伍的实力差距
            if (pairs[i-2] + tmp > pairs[i-1]){
                pairs[i] = pairs[i-2] + tmp;
                min_sum[i] = min_sum[i-2] + nums[i-1] - nums[i-2];
            }
            // 如果匹配i-1个队伍的最小和大于匹配i-2个队伍的最小和，那么匹配i个队伍的最小和就是匹配i-1个队伍的最小和
            else if (pairs[i-2] + tmp < pairs[i-1]){
                pairs[i] = pairs[i-1];
                min_sum[i] = min_sum[i-1];
            }
            // 如果匹配i-1个队伍的最小和等于匹配i-2个队伍的最小和，那么匹配i个队伍的最小和就是匹配i-1个队伍的最小和和匹配i-2个队伍的最小和加上i-1和i队伍的实力差距的最小值
            else{
                if (tmp == 1)
                    min_sum[i] = Math.min(min_sum[i-1], min_sum[i-2] + nums[i-1] - nums[i-2]);
                else
                    min_sum[i] = Math.min(min_sum[i-1], min_sum[i-2]);
                pairs[i] = pairs[i-1];
            }
        }
    
        // 如果没有队伍可以匹配，则输出-1
        if (pairs[n] == 0)
            console.log(-1);
        else
            console.log(min_sum[n]);
    
        rl.close();
      }
    });
    
    

## C++

    
    
    #include<iostream>
    #include<vector>
    #include<algorithm>
    using namespace std;
    
    int main() {
        // 处理输入
        int n, d; 
        cin >> n >> d;
        vector<int> nums;
        for(int i = 0; i < n; i++){
            int num;
            cin >> num;
            nums.push_back(num);
        }
        // 按照大小排序
        sort(nums.begin(), nums.end());
    
        //pair个数
        vector<int> pairs (n+1, 0);
        //最小和
        vector<int> min_sum (n+1, 0);
    
        // 动态规划求解最小和
        for (int i = 2; i < n+1; i++){
            int tmp = 0;
            // 如果两个队伍之间的实力差距小于等于d，则它们可以匹配
            if (nums[i-1] - nums[i-2] <= d)
                tmp += 1;
    
            // 如果匹配i-1个队伍的最小和小于匹配i-2个队伍的最小和，那么匹配i个队伍的最小和就是匹配i-2个队伍的最小和加上i-1和i队伍的实力差距
            if (pairs[i-2] + tmp > pairs[i-1]){
                pairs[i] = pairs[i-2] + tmp;
                min_sum[i] = min_sum[i-2] + nums[i-1] - nums[i-2];
            }
            // 如果匹配i-1个队伍的最小和大于匹配i-2个队伍的最小和，那么匹配i个队伍的最小和就是匹配i-1个队伍的最小和
            else if (pairs[i-2] + tmp < pairs[i-1]){
                pairs[i] = pairs[i-1];
                min_sum[i] = min_sum[i-1];
            }
            // 如果匹配i-1个队伍的最小和等于匹配i-2个队伍的最小和，那么匹配i个队伍的最小和就是匹配i-1个队伍的最小和和匹配i-2个队伍的最小和加上i-1和i队伍的实力差距的最小值
            else{
                if (tmp == 1)
                    min_sum[i] = min(min_sum[i-1], min_sum[i-2] + nums[i-1] - nums[i-2]);
                else
                    min_sum[i] = min(min_sum[i-1], min_sum[i-2]);
                pairs[i] = pairs[i-1];
            }
        }
    
        // 如果没有队伍可以匹配，则输出-1
        if (pairs[n] == 0)
            cout << -1;
        else
            cout << min_sum[n];
        return 0;
    }
    
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    
    // 比较函数，用于升序排序
    int compare(const void *a, const void *b) {
        return (*(int *)a - *(int *)b);
    }
    
    int main() {
        int n, d;
        
        // 读取队伍数量 n 和最大允许差距 d
        scanf("%d %d", &n, &d);
        
        // 动态分配数组 nums，用于存储队伍的实力值
        int *nums = (int *)malloc(n * sizeof(int));
        
        // 读取每个队伍的实力值并存储到 nums 数组中
        for (int i = 0; i < n; i++) {
            scanf("%d", &nums[i]);
        }
        
        // 对队伍实力值进行升序排序
        qsort(nums, n, sizeof(int), compare);
        
        // 动态分配数组 pairs，用于存储能匹配的对的数量，初始化为 0
        int *pairs = (int *)calloc(n + 1, sizeof(int));
        
        // 动态分配数组 min_sum，用于存储最小的差值总和，初始化为 0
        int *min_sum = (int *)calloc(n + 1, sizeof(int));
    
        // 从第3个元素开始考虑配对（因为要两两配对，所以从 i = 2 开始）
        for (int i = 2; i <= n; i++) {
            int tmp = 0;
    
            // 如果当前两支队伍的实力差距在允许范围内，tmp 置为 1，表示可以匹配
            if (nums[i - 1] - nums[i - 2] <= d) {
                tmp = 1;
            }
    
            // 如果配对前两支队伍的匹配数加上 tmp 比上一支队伍的匹配数更多
            if (pairs[i - 2] + tmp > pairs[i - 1]) {
                // 更新 pairs 和 min_sum，记录新的匹配数量和最小差值总和
                pairs[i] = pairs[i - 2] + tmp;
                min_sum[i] = min_sum[i - 2] + (nums[i - 1] - nums[i - 2]);
            }
            // 如果不配对前两支队伍能保持或增加匹配数量，则选择不配对
            else if (pairs[i - 2] + tmp < pairs[i - 1]) {
                pairs[i] = pairs[i - 1];
                min_sum[i] = min_sum[i - 1];
            }
            // 如果配对数量相同，则选择差距更小的配对策略
            else {
                if (tmp == 1) {
                    // 如果配对，选择较小的差值总和
                    min_sum[i] = (min_sum[i - 1] < min_sum[i - 2] + (nums[i - 1] - nums[i - 2])) ? min_sum[i - 1] : (min_sum[i - 2] + (nums[i - 1] - nums[i - 2]));
                } else {
                    // 如果不配对，选择保持原有的差值总和
                    min_sum[i] = (min_sum[i - 1] < min_sum[i - 2]) ? min_sum[i - 1] : min_sum[i - 2];
                }
                pairs[i] = pairs[i - 1];
            }
        }
    
        // 最终结果：如果没有任何队伍配对成功，输出 -1，否则输出最小的差值总和
        if (pairs[n] == 0) {
            printf("-1\n");  // 无法配对
        } else {
            printf("%d\n", min_sum[n]);  // 输出最小的差值总和
        }
    
        // 释放动态分配的内存
        free(nums);
        free(pairs);
        free(min_sum);
    
        return 0;
    }
    
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

