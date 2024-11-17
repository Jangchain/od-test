## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

#### 题目描述

给定一个随机的整数（可能存在正整数和负整数）数组
nums，请你在该数组中找出两个数，其和的绝对值(|nums[x]+nums[y]|)为最小值，并返回这个两个数（按从小到大返回）以及绝对值。

每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。

#### 输入描述

一个通过空格分割的有序整数序列字符串，最多1000个整数，且整数数值范围是 [-65535, 65535]。

#### 输出描述

两数之和绝对值最小值

#### 用例

输入

    
    
    -1 -3 7 5 11 15
    

输出

    
    
    2
    

说明

> 因为 |nums[0] + nums[2]| = |-3 + 5| = 2 最小，所以返回 2。

#### 解题思路

为了找到两个数之和的绝对值最小，我们可以使用双指针方法。首先对数组进行排序，然后设置两个指针，一个从数组的起始位置开始，另一个从数组的末尾开始。在遍历过程中，我们计算两个指针所指向的元素之和的绝对值，并更新最小绝对值和对应的指针位置。当两个指针相遇时，遍历结束。最后，我们返回最小绝对值和对应的两个元素。

解题方法：

  1. 对输入的整数数组进行排序。
  2. 初始化两个指针，一个指向数组的起始位置，另一个指向数组的末尾。
  3. 初始化最小绝对值为整数最大值。
  4. 使用 while 循环遍历数组，直到左指针大于或等于右指针。
  5. 计算两个指针所指向的元素之和的绝对值。
  6. 如果当前绝对值小于最小绝对值，更新最小绝对值和对应的指针位置。
  7. 根据两数之和的正负性，移动左指针或右指针。
  8. 输出最小绝对值和对应的两个元素。

这个解法的时间复杂度为 O(n)，其中 n 为数组的长度。这是因为我们只需要遍历一次数组，并在遍历过程中更新最小绝对值和对应的指针位置。

#### C++

    
    
    #include <iostream>
    #include <vector>
    #include <sstream>
    #include <algorithm>
    #include <string>
    #include <limits>
    
    using namespace std;
    
    int main() {
        // 从输入中读取整数数组
        string input;
        getline(cin, input);
        stringstream ss(input);
        int num;
        vector<int> nums;
        while (ss >> num) {
            nums.push_back(num);
        }
    
        // 对整数数组进行排序
        sort(nums.begin(), nums.end());
    
        // 初始化左右指针
        int left = 0;
        int right = nums.size() - 1;
    
        // 初始化最小绝对值和对应的指针位置
        int min = numeric_limits<int>::max();
        int minLeft = left;
        int minRight = right;
    
        // 遍历数组，直到左指针大于或等于右指针
        while (left < right) {
            // 计算两个指针所指向的元素之和
            int sum = nums[left] + nums[right];
    
            // 计算绝对值
            int absSum = abs(sum);
    
            // 如果当前绝对值小于最小绝对值，更新最小绝对值和对应的指针位置
            if (absSum < min) {
                min = absSum;
                minLeft = left;
                minRight = right;
            }
    
            // 根据两数之和的正负性，移动左指针或右指针
            if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    
        // 输出最小绝对值和对应的两个元素
        cout << nums[minLeft] << " " << nums[minRight] << " " << min << endl;
    
        return 0;
    }
    
    

#### java

    
    
    import java.util.Arrays;
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            // 从输入中读取整数数组
            Scanner sc = new Scanner(System.in);
            int[] nums = Arrays.stream(sc.nextLine().split(" ")).mapToInt(Integer::parseInt).toArray();
    
            // 对整数数组进行排序
            Arrays.sort(nums);
    
            // 初始化左右指针
            int left = 0;
            int right = nums.length - 1;
    
            // 初始化最小绝对值和对应的指针位置
            int min = Integer.MAX_VALUE;
            int minLeft = left;
            int minRight = right;
    
            // 遍历数组，直到左指针大于或等于右指针
            while (left < right) {
                // 计算两个指针所指向的元素之和
                int sum = nums[left] + nums[right];
    
                // 计算绝对值
                int absSum = Math.abs(sum);
    
                // 如果当前绝对值小于最小绝对值，更新最小绝对值和对应的指针位置
                if (absSum < min) {
                    min = absSum;
                    minLeft = left;
                    minRight = right;
                }
    
                // 根据两数之和的正负性，移动左指针或右指针
                if (sum < 0) {
                    left++;
                } else {
                    right--;
                }
            }
    
            // 输出最小绝对值和对应的两个元素
            System.out.println(nums[minLeft] + " " + nums[minRight] + " " + min);
        }
    }
    
    

#### javascript

    
    
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.on('line', (input) => {
      // 从输入中读取整数数组
      const nums = input.split(' ').map(Number);
    
      // 对整数数组进行排序
      nums.sort((a, b) => a - b);
    
      // 初始化左右指针
      let left = 0;
      let right = nums.length - 1;
    
      // 初始化最小绝对值和对应的指针位置
      let min = Number.MAX_VALUE;
      let minLeft = left;
      let minRight = right;
    
      // 遍历数组，直到左指针大于或等于右指针
      while (left < right) {
        // 计算两个指针所指向的元素之和
        const sum = nums[left] + nums[right];
    
        // 计算绝对值
        const absSum = Math.abs(sum);
    
        // 如果当前绝对值小于最小绝对值，更新最小绝对值和对应的指针位置
        if (absSum < min) {
          min = absSum;
          minLeft = left;
          minRight = right;
        }
    
        // 根据两数之和的正负性，移动左指针或右指针
        if (sum < 0) {
          left++;
        } else {
          right--;
        }
      }
    
      // 输出最小绝对值和对应的两个元素
      console.log(`${nums[minLeft]} ${nums[minRight]} ${min}`);
    });
    
    

#### python

    
    
    def main():
        # 从输入中读取整数数组
        nums = list(map(int, input().split()))
    
        # 对整数数组进行排序
        nums.sort()
    
        # 初始化左右指针
        left = 0
        right = len(nums) - 1
    
        # 初始化最小绝对值和对应的指针位置
        min_abs_sum = float('inf')
        min_left = left
        min_right = right
    
        # 遍历数组，直到左指针大于或等于右指针
        while left < right:
            # 计算两个指针所指向的元素之和
            sum = nums[left] + nums[right]
    
            # 计算绝对值
            abs_sum = abs(sum)
    
            # 如果当前绝对值小于最小绝对值，更新最小绝对值和对应的指针位置
            if abs_sum < min_abs_sum:
                min_abs_sum = abs_sum
                min_left = left
                min_right = right
    
            # 根据两数之和的正负性，移动左指针或右指针
            if sum < 0:
                left += 1
            else:
                right -= 1
    
        # 输出最小绝对值和对应的两个元素
        print(nums[min_left], nums[min_right], min_abs_sum)
    
    
    if __name__ == "__main__":
        main()
    
    

#### 文章目录

  * 最新华为OD机试
  *     *       * 题目描述
      * 输入描述
      * 输出描述
      * 用例
      * 解题思路
      * C++
      * java
      * javascript
      * python
      * 完整用例
      *         * 用例1
        * 用例2
        * 用例3
        * 用例4
        * 用例5
        * 用例6
        * 用例7
        * 用例8
        * 用例9
        * 用例10

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

#### 完整用例

##### 用例1

-1 -3 7 5 11 15

##### 用例2

2 4 6 8 10

##### 用例3

-5 -10 -15 -2

##### 用例4

1 3 5 7 9

##### 用例5

-2 -4 -6 -8 -10

##### 用例6

-1 -2 -3 4 5 6

##### 用例7

-5 -10 -15 -20 25 30

##### 用例8

-10 0 10 20 30

##### 用例9

-3 -6 -9 -12 -15 -18

##### 用例10

-10 -5 10000

