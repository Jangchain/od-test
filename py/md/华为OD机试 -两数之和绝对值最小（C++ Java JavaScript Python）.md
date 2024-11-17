#### 题目描述

给定一个从小到大的有序整数序列（存在正整数和负整数）数组 nums
，请你在该数组中找出两个数，其和的绝对值(|nums[x]+nums[y]|)为最小值，并返回这个绝对值。  
每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。

#### 输入描述

一个通过空格分割的有序整数序列字符串，最多1000个整数，且整数数值范围是 -65535~65535。

#### 输出描述

两数之和绝对值最小值

#### 用例

输入

    
    
    -3 -1 5 7 11 15
    

输出

    
    
    -3 5 2
    

说明

> 因为 |nums[0] + nums[2]| = |-3 + 5| = 2 最小，所以返回 -3 5 2。

#### 解题思路

为了找到两个数之和的绝对值最小，我们可以使用双指针方法。
设置两个指针，一个从数组的起始位置开始，另一个从数组的末尾开始。在遍历过程中，我们计算两个指针所指向的元素之和的绝对值，并更新最小绝对值和对应的指针位置。当两个指针相遇时，遍历结束。最后，我们返回最小绝对值和对应的两个元素。

解题方法：

  1. 输入整个数组
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
    
    rl.on('line', (line) => {
      const arr = line.split(' ').map(num => parseInt(num));
      
      // 如果第一个数大于第二个数，则交换两个数的位置
      if (arr[0] > arr[1]) {
        arr.reverse();
      }
    
      let cursor = 0;
      // 找到第一个非负数的位置
      while (arr[cursor] < 0) {
        cursor++;
      }
    
      const len = arr.length;
      // 如果整个数组都是负数，则返回最后两个数的和的绝对值
      if (cursor === len) {
        console.log(Math.abs(arr[len - 1] + arr[len - 2]));
      } else if (cursor === 0) {
        // 如果整个数组都是非负数，则返回前两个数的和
        console.log(arr[0] + arr[1]);
      } else {
        // 分别计算正数和负数的最小绝对值和
        const positiveMinAbsSum = arr[cursor] + arr[cursor + 1];
        const negativeMinAbsSum = Math.abs(arr[cursor - 1] + arr[cursor - 2]);
    
        let result = Math.min(positiveMinAbsSum, negativeMinAbsSum);
    
        // 遍历所有可能的组合，找到绝对值和最小的组合
        for (let i = 0; i < cursor; i++) {
          for (let j = cursor; j < len; j++) {
            const sum = Math.abs(arr[i] + arr[j]);
            result = Math.min(result, sum);
          }
        }
    
        console.log(result);
      }
    });
    

#### python

    
    
    import sys
    
    line = sys.stdin.readline().strip()
    
    arr = []
    pos = 0
    while True:
        space_pos = line.find(' ', pos)
        if space_pos == -1:
            num = int(line[pos:])
            arr.append(num)
            break
        num = int(line[pos:space_pos])
        arr.append(num)
        pos = space_pos + 1
    
    if arr[0] > arr[1]:
        arr.reverse()
    
    cursor = 0
    while arr[cursor] < 0:
        cursor += 1
    
    if cursor == len(arr):
        print(abs(arr[-1] + arr[-2]))
    elif cursor == 0:
        print(arr[0] + arr[1])
    else:
        positive_min_abs_sum = arr[cursor] + arr[cursor + 1]
        negative_min_abs_sum = abs(arr[cursor - 1] + arr[cursor - 2])
    
        result = min(positive_min_abs_sum, negative_min_abs_sum)
    
        for i in range(cursor):
            for j in range(cursor, len(arr)):
                sum = abs(arr[i] + arr[j])
                result = min(result, sum)
    
        print(result)
    

#### 文章目录

  *     *       * 题目描述
      * 输入描述
      * 输出描述
      * 用例
      * 解题思路
      * C++
      * java
      * javascript
      * python

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

