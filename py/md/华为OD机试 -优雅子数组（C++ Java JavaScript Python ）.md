#### 题目描述

如果一个数组中出现次数最多的元素出现大于等于K次，被称为 _k-优雅数组_ ，k也可以被称为优雅阈值。  
例如，数组1，2，3，1、2，3，1，它是一个3-优雅数组，因为元素1出现次数大于等于3次，  
数组[1, 2, 3, 1, 2]就不是一个3-优雅数组，因为其中出现次数最多的元素是1和2，只出现了2次。

给定一个数组A和k，请求出A有多少子数组是k-优雅子数组。

子数组是数组中一个或多个连续元素组成的数组。

例如，数组[1,2,3,4]包含10个子数组，分别是：  
[1], [1,2], [1,2,3], [1,2,3,4], [2], [2,3], [2,3,4], [3], [3, 4], [4]。

#### 输入描述

第一行输入两个数字，以空格隔开，含义是：A数组长度 k值

第二行输入A数组元素，以空格隔开

#### 输出描述

输出A有多少子数组是k-优雅子数组

#### 用例

输入| 7 3  
1 2 3 1 2 3 1  
---|---  
输出| 1  
说明| 无  
输入| 7 2  
1 2 3 1 2 3 1  
---|---  
输出| 10  
说明| 无  
  
#### 题目解析

利用双指针（即一个双重for）找到所有子数组（有点暴力），外层 i 指针指向子数组左边界，内层 j
指针指向子数组右边界，然后统计子数组内部各数字出现个数，若有数字出现次数大于等于k，则该子数组符合要求，统计结果ans++。

上面算法逻辑中，找所有子数组的逻辑基本无法优化，但是统计每个子数组内部各数字出现次数的逻辑却可以优化。

我们可以基于动态规划前缀和的思想，对相同左边界的子数组，只统计初始子数组的内部元素个数，然后每当右边界变化，则基于上一个子数组的统计结果计算出新结果，例如：

#### C++

    
    
    #include <iostream>
    #include <vector>
    
    int main() {
        // 处理输入
        int n, k;
        std::cin >> n >> k;
        std::vector<int> nums(n);
        for (int i = 0; i < n; i++) {
            std::cin >> nums[i];
        }
    
        int result = 0;
        std::vector<int> numCount(100001, 0);
    
        for (int left = 0, right = 0; right < n; right++) {
            numCount[nums[right]]++;
    
            while (numCount[nums[right]] >= k) {
                result += n - right;
                numCount[nums[left]]--;
                left++;
            }
        }
        std::cout << result << std::endl;
        return 0;
    }
    
    

#### JavaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    let n, k, nums;
    
    rl.on('line', (line) => {
        if (!n) {
            [n, k] = line.trim().split(' ').map(Number);
    
        } else {
            nums = line.trim().split(' ').map(Number);
            let result = 0;
            const numCount = new Array(100001).fill(0);
    
            let left = 0;
            for (let right = 0; right < n; right++) {
                numCount[nums[right]]++;
    
                while (numCount[nums[right]] >= k) {
                    result += n - right;
                    numCount[nums[left]]--;
                    left++;
                }
            }
            console.log(result);
        }
    });
    
    

#### Java

    
    
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            // 处理输入
            Scanner in = new Scanner(System.in);
            int n = in.nextInt();
            int k = in.nextInt();
            int[] nums = new int[n];
            for (int i = 0; i < n; i++) {
                nums[i] = in.nextInt();
            }
    
            int result = 0;
            int[] numCount = new int[100001];
    
            for (int left = 0, right = 0; right < n; right++) {
                numCount[nums[right]]++;
    
                while (numCount[nums[right]] >= k) {
                    result += n - right;
                    numCount[nums[left]]--;
                    left++;
                }
            }
            System.out.println(result);
        }
    }
    
    

#### Python

    
    
    def main():
        # 处理输入
        n, k = map(int, input().strip().split())
        nums = list(map(int, input().strip().split()))
    
        result = 0
        num_count = [0] * 100001
    
        left = 0
        for right in range(n):
            num_count[nums[right]] += 1
    
            while num_count[nums[right]] >= k:
                result += n - right
                num_count[nums[left]] -= 1
                left += 1
    
        print(result)
    
    if __name__ == "__main__":
        main()
    
    

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

