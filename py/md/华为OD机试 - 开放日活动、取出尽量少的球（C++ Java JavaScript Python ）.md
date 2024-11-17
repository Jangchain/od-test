#### 题目描述

某部门开展**Family Day** 开放日活动，其中有个从桶里取球的游戏，游戏规则如下：

有N个容量一样的小桶等距排开，

且每个小桶都默认装了数量不等的小球，

每个小桶装的小球数量记录在数组 bucketBallNums 中，

游戏开始时，要求所有桶的小球总数不能超过SUM，

如果小球总数超过SUM，则需对所有的小桶统一设置一个容量最大值 maxCapacity，

并需将超过容量最大值的小球拿出来，直至小桶里的小球数量小于 maxCapacity;

请您根据输入的数据，计算从每个小桶里拿出的小球数量。

限制规则一：

所有小桶的小球总和小于SUM，则无需设置容量值maxCapacity，并且无需从小桶中拿球出来，返回结果[]

限制规则二：

如果所有小桶的小球总和大于SUM，则需设置容量最大值maxCapacity，并且需从小桶中拿球出来，返回从每个小桶拿出的小球数量组成的数组；

#### 输入描述

第一行输入2个正整数，数字之间使用空格隔开，其中第一个数字表示SUM，第二个数字表示bucketBallNums数组长度；  
第二行输入N个正整数，数字之间使用空格隔开，表示bucketBallNums的每一项；

#### 输出描述

找到一个maxCapacity，来保证取出尽量少的球，并返回从每个小桶拿出的小球数量组成的数组。

#### 用例

输入| 14 7  
2 3 2 5 5 1 4  
---|---  
输出| [0,1,0,3,3,0,2]  
说明| 小球总数为22，SUM=14，超出范围了，需从小桶取球，  
maxCapacity=1，取出球后，桶里剩余小球总和为7，远小于14  
maxCapacity=2，取出球后，桶里剩余小球总和为13，  
maxCapacity=3，取出球后，桶里剩余小球总和为16，大于14  
因此maxCapacity为2 ，每个小桶小球数量大于2的都需要拿出来；  
输入| 3 3  
1 2 3  
---|---  
输出| [0,1,2]  
说明| 小球总数为6，SUM=3，超出范围了，需从小桶中取球，maxCapacity=1，则小球总数为3，从1号桶取0个球，2号桶取1个球，3号桶取2个球；  
输入| 6 2  
3 2  
---|---  
输出| []  
说明| 小球总数为5，SUM=6，在范围内，无需从小桶取球；  
  
#### 题目解析

这个问题的解题思路是通过二分查找来确定每个桶中保留的最大球数，以便使得保留的球数之和不超过目标和。以下是详细的解题方法：

  1. 首先，从输入中获取目标和（`targetSum`）和桶的数量（`numBuckets`）。
  2. 接下来，从输入中获取每个桶中的球数（`ballsInBuckets`）。
  3. 计算桶中球数的最大值（`maxBalls`）和总和（`totalBalls`）。
  4. 如果`totalBalls`大于`targetSum`，则开始寻找解决方案。否则，输出空列表，因为不需要移除任何球。
  5. 初始化二分查找的边界，`left`设置为1，`right`设置为`maxBalls`。
  6. 当`left`小于等于`right`时，执行以下操作：  
a. 计算`mid`，即`(left + right) / 2`的向下取整。  
b. 计算每个桶中保留的球数，即`ballsInBuckets`中的每个元素与`mid`的较小值。  
c. 计算保留球数的总和（`tempTotal`）。  
d. 如果`tempTotal`小于等于`targetSum`，则更新`maxCapacity`为`mid`，并将`left`设置为`mid +
1`。这意味着我们可以尝试保留更多的球，以便更接近目标和。  
e. 否则，将`right`设置为`mid - 1`。这意味着我们需要减少保留的球数，以使保留球数之和不超过目标和。

  7. 当二分查找完成后，我们找到了每个桶中保留的最大球数（`maxCapacity`）。
  8. 计算每个桶需要移除的球数，即`ballsInBuckets`中的每个元素减去`maxCapacity`的较大值。
  9. 输出结果，即每个桶需要移除的球数。

通过这种方法，我们可以在保证保留球数之和不超过目标和的前提下，找到每个桶需要移除的最小球数。

#### C++

    
    
     #include <iostream>
    #include <vector>
    #include <algorithm>
    #include <sstream>
    #include <iterator>
    #include <numeric>
    int main() {
        // 读取输入，获取目标和桶的数量
        int targetSum, numBuckets;
        std::cin >> targetSum >> numBuckets;
    
        // 读取输入，获取每个桶中的球数
        std::vector<int> ballsInBuckets(numBuckets);
        for (int i = 0; i < numBuckets; ++i) {
            std::cin >> ballsInBuckets[i];
        }
    
        // 计算桶中球数的最大值和总和
        int maxBalls = *std::max_element(ballsInBuckets.begin(), ballsInBuckets.end());
        int totalBalls = std::accumulate(ballsInBuckets.begin(), ballsInBuckets.end(), 0);
    
        // 如果总球数大于目标和，开始寻找解决方案
        if (totalBalls > targetSum) {
            // 初始化二分查找的边界
            int left = 1, right = maxBalls;
            int maxCapacity = 0;
            std::vector<int> result(numBuckets);
    
            // 当左边界小于等于右边界时，继续二分查找
            while (left <= right) {
                int mid = (left + right) / 2;
    
                // 计算每个桶中保留的球数
                std::vector<int> retainedBalls(numBuckets);
                std::transform(ballsInBuckets.begin(), ballsInBuckets.end(), retainedBalls.begin(),
                               [mid](int ball) { return std::min(ball, mid); });
    
                // 计算保留球数的总和
                int tempTotal = std::accumulate(retainedBalls.begin(), retainedBalls.end(), 0);
    
                // 如果保留球数的总和小于等于目标和，更新maxCapacity并向右移动左边界
                if (tempTotal <= targetSum) {
                    maxCapacity = mid;
                    left = mid + 1;
                } else {
                    // 否则，向左移动右边界
                    right = mid - 1;
                }
            }
    
            // 计算每个桶需要移除的球数
            std::transform(ballsInBuckets.begin(), ballsInBuckets.end(), result.begin(),
                           [maxCapacity](int ball) { return std::max(0, ball - maxCapacity); });
    
            // 输出结果
            std::cout << "[";
            for (size_t i = 0; i < result.size(); ++i) {
                std::cout << result[i];
                if (i < result.size() - 1) {
                    std::cout << ",";
                }
            }
            std::cout << "]" << std::endl;
        } else {
            // 如果总球数小于等于目标和，输出空列表
            std::cout << "[]" << std::endl;
        }
    
        return 0;
    }
    
    
    
    

#### JavaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    // 读取输入，获取目标和桶的数量
    rl.on('line', (input) => {
      const [targetSum, numBuckets] = input.split(' ').map(Number);
    
      // 读取输入，获取每个桶中的球数
      rl.on('line', (bucketsInput) => {
        const ballsInBuckets = bucketsInput.split(' ').map(Number);
    
        // 计算桶中球数的最大值和总和
        const maxBalls = Math.max(...ballsInBuckets);
        const totalBalls = ballsInBuckets.reduce((a, b) => a + b, 0);
    
        // 如果总球数大于目标和，开始寻找解决方案
        if (totalBalls > targetSum) {
          // 初始化二分查找的边界
          let left = 1, right = maxBalls;
          let maxCapacity = 0;
          const result = new Array(numBuckets);
    
          // 当左边界小于等于右边界时，继续二分查找
          while (left <= right) {
            const mid = Math.floor((left + right) / 2);
    
            // 计算每个桶中保留的球数
            const retainedBalls = ballsInBuckets.map(ball => Math.min(ball, mid));
    
            // 计算保留球数的总和
            const tempTotal = retainedBalls.reduce((a, b) => a + b, 0);
    
            // 如果保留球数的总和小于等于目标和，更新maxCapacity并向右移动左边界
            if (tempTotal <= targetSum) {
              maxCapacity = mid;
              left = mid + 1;
            } else {
              // 否则，向左移动右边界
              right = mid - 1;
            }
          }
    
          // 计算每个桶需要移除的球数
          for (let i = 0; i < numBuckets; i++) {
            result[i] = Math.max(0, ballsInBuckets[i] - maxCapacity);
          }
    
          // 输出结果
          console.log(`[${result.join(',')}]`);
        } else {
          // 如果总球数小于等于目标和，输出空列表
          console.log('[]');
        }
    
        rl.close();
      });
    });
    
    
    

#### Java

    
    
    import java.util.Scanner;
    import java.util.Arrays;
    import java.util.stream.Collectors;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
    
            // 读取输入，获取目标和桶的数量
            int targetSum = scanner.nextInt();
            int numBuckets = scanner.nextInt();
            scanner.nextLine();
    
            // 读取输入，获取每个桶中的球数
            int[] ballsInBuckets = Arrays.stream(scanner.nextLine().split(" "))
                    .mapToInt(Integer::parseInt)
                    .toArray();
    
            // 计算桶中球数的最大值和总和
            int maxBalls = Arrays.stream(ballsInBuckets).max().getAsInt();
            int totalBalls = Arrays.stream(ballsInBuckets).sum();
    
            // 如果总球数大于目标和，开始寻找解决方案
            if (totalBalls > targetSum) {
                // 初始化二分查找的边界
                int left = 1, right = maxBalls;
                int maxCapacity = 0;
                int[] result = new int[numBuckets];
    
                // 当左边界小于等于右边界时，继续二分查找
                while (left <= right) {
                    int mid = (left + right) / 2;
    
                    // 计算每个桶中保留的球数
                    int[] retainedBalls = Arrays.stream(ballsInBuckets)
                            .map(ball -> Math.min(ball, mid))
                            .toArray();
    
                    // 计算保留球数的总和
                    int tempTotal = Arrays.stream(retainedBalls).sum();
    
                    // 如果保留球数的总和小于等于目标和，更新maxCapacity并向右移动左边界
                    if (tempTotal <= targetSum) {
                        maxCapacity = mid;
                        left = mid + 1;
                    } else {
                        // 否则，向左移动右边界
                        right = mid - 1;
                    }
                }
    
                // 计算每个桶需要移除的球数
                for (int i = 0; i < numBuckets; i++) {
                    result[i] = Math.max(0, ballsInBuckets[i] - maxCapacity);
                }
    
                // 输出结果
                System.out.println(Arrays.stream(result)
                        .mapToObj(Integer::toString)
                        .collect(Collectors.joining(",", "[", "]")));
            } else {
                // 如果总球数小于等于目标和，输出空列表
                System.out.println("[]");
            }
        }
    }
    
    

#### Python

    
    
    # 读取输入，获取目标和桶的数量
    target_sum, num_buckets = map(int, input().strip().split(" "))
    # 读取输入，获取每个桶中的球数
    balls_in_buckets = list(map(int, input().strip().split(" ")))
    
    # 计算桶中球数的最大值和总和
    max_balls = max(balls_in_buckets)
    total_balls = sum(balls_in_buckets)
    
    # 如果总球数大于目标和，开始寻找解决方案
    if total_balls > target_sum:
        # 初始化二分查找的边界
        left, right = 1, max_balls
        max_capacity = 0
        result = []
    
        # 当左边界小于等于右边界时，继续二分查找
        while left <= right:
            mid = (left + right) // 2
            # 计算每个桶中保留的球数
            retained_balls = [min(ball, mid) for ball in balls_in_buckets]
            # 计算保留球数的总和
            temp_total = sum(retained_balls)
    
            # 如果保留球数的总和小于等于目标和，更新max_capacity并向右移动左边界
            if temp_total <= target_sum:
                max_capacity = mid
                left = mid + 1
            else:
                # 否则，向左移动右边界
                right = mid - 1
    
        # 计算每个桶需要移除的球数
        result = [max(0, ball - max_capacity) for ball in balls_in_buckets]
        # 输出结果
        print("[" + ",".join(map(str, result)) + "]")
    else:
        # 如果总球数小于等于目标和，输出空列表
        print("[]")
    
    
    
    

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

