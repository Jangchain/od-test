#### 题目描述

从一个长度为N的正数数组numbers中找出长度至少为L且几何平均值最大子数组，并输出其位置和大小。（K个数的几何平均值为K个数的乘积的K次方根）

若有多个子数组的几何平均值均为最大值，则输出长度最小的子数组。

若有多个长度相同的子数组的几何平均值均为最大值，则输出最前面的子数组。

#### 输入描述

第一行输入为N、L

  * N表示numbers的大小（1 ≤ N ≤ 100000）
  * L表示子数组的最小长度（1 ≤ L ≤ N）

之后N行表示numbers中的N个数，每个一行（10^-9 ≤ numbers[i] ≤ 10^9）

#### 输出描述

输出子数组的位置（从0开始计数）和大小，中间用一个空格隔开。

#### 备注

用例保证除几何平均值为最大值的子数组外，其他子数组的几何平均值至少比最大值小10^-10倍

#### 用例

输入| 3 2  
2  
2  
3  
---|---  
输出| 1 2  
说明| 长度至少为2的子数组共三个，分别是{2,2}、{2,3}、{2,2,3}，其中{2,3}的几何平均值最大，故输出其位置1和长度2  
输入| 10 2  
0.2  
0.1  
0.2  
0.2  
0.2  
0.1  
0.2  
0.2  
0.2  
0.2  
---|---  
输出| 2 2  
说明|
有多个长度至少为2的子数组的几何平均值为0.2，其中长度最短的为2，也有多个，长度为2且几何平均值为0.2的子数组最前面的那个为从第二个数开始的两个0.2组成的子数组  
  
#### 题目解析

本题需要找到一个长度至少为 L
的子数组，使得它的几何平均值最大。可以利用二分法来找到这个几何平均值，然后再根据这个几何平均值来判断是否存在符合要求的子数组。

具体来说，二分法的上下界分别是数组中的最大值和最小值，然后每次取中间值 mid_num，计算以 mid_num
为几何平均值的子数组是否存在，并且长度是否大于等于 L。如果存在，说明当前的 mid_num 可以作为几何平均值，需要将最小值更新为
mid_num，否则需要将最大值更新为 mid_num。

计算以 mid_num 为几何平均值的子数组是否存在，可以利用前缀和的方式来计算，同时可以利用一个临时变量 min_pre_result
来记录前缀和的最小值，以及它的位置 min_pre_result_pos，这样可以避免每次重新计算前缀和。

#### C++

    
    
    #include<iostream>
    #include<vector>
    #include<algorithm>
    #include<cmath>
    #include<cfloat>
    using namespace std;
    
    int main() {
        int sub_arr_pos = 0; // 最大几何平均值子数组的起始位置
        int sub_arr_size = 0; // 最大几何平均值子数组的长度
        int N, L;
        cin >> N >> L; // 输入数组大小和子数组最小长度
    
        double min_num = DBL_MAX; // 数组中的最小值
        double max_num = DBL_MIN; // 数组中的最大值
        double result = 1; // 数组前L个数的乘积
    
        vector<double> nums(N); // 数组
        for (int i = 0; i < N; i++) {
            cin >> nums[i];
            min_num = min(min_num, nums[i]); // 更新最小值
            max_num = max(max_num, nums[i]); // 更新最大值
            if (i < L) {
                result *= nums[i]; // 计算前L个数的乘积
            }
        }
    
        // 二分法查找最大几何平均值
        while (max_num - min_num >= pow(10, -10)) {
            double mid_num = (min_num + max_num) / 2; // 计算中间值
    
            double temp_result = result; // 临时乘积
            bool flag = false; // 是否找到最大几何平均值子数组的标志位
    
            // 从前往后遍历数组，计算每个子数组的几何平均值
            for (int i = L; i <= N; i++) {
                if (temp_result >= pow(mid_num, L)) { // 如果临时乘积大于等于当前中间值的L次方，说明当前子数组的几何平均值大于等于中间值
                    sub_arr_pos = i - L; // 更新最大几何平均值子数组的起始位置
                    sub_arr_size = L; // 更新最大几何平均值子数组的长度
                    flag = true; // 找到最大几何平均值子数组
                    break;
                }
                if (i == N) { // 如果遍历到数组末尾，结束循环
                    break;
                }
                temp_result /= nums[i - L]; // 除去子数组的第一个数
                temp_result *= nums[i]; // 加上子数组的最后一个数
            }
    
            if (flag) { // 如果找到最大几何平均值子数组，更新最小值为中间值
                min_num = mid_num;
            } else { // 如果没找到，更新最大值为中间值
                max_num = mid_num;
            }
        }
    
        cout << sub_arr_pos << " " << sub_arr_size; // 输出最大几何平均值子数组的起始位置和长度
        return 0;
    }
    
    

#### JavaScript

    
    
    const readline = require("readline");
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    
    const inputLines = [];
    let n, l;
    
    rl.on("line", (line) => {
      inputLines.push(line);
     
      if (inputLines.length === 1) {
        [n, l] = inputLines[0].split(" ").map(Number);
      }
     
      if (n && inputLines.length === n + 1) {
        const numbers = inputLines.slice(1).map((line) => Number(line));
        console.log(getResult(n, l, numbers));
        inputLines.length = 0;
      }
    });
    
    function getResult(n, l, numbers) {
      const sortedNumbers = numbers.slice().sort((a, b) => a - b);
      let minAvg = sortedNumbers[0];
      let maxAvg = sortedNumbers[sortedNumbers.length - 1];
      const diff = maxAvg / Math.pow(10, 10);
     
      const result = [];
      while (maxAvg - minAvg >= diff) {
        let midAvg = (minAvg + maxAvg) / 2;
     
        if (check(n, l, numbers, midAvg, result)) {
          minAvg = midAvg;
        } else {
          maxAvg = midAvg;
        }
      }
     
      return result.join(" ");
    }
    
    function check(n, l, numbers, avg, result) {
      let product = 1;
     
      for (let i = 0; i < l; i++) {
        product *= numbers[i] / avg;
      }
     
      if (product >= 1) {
        result[0] = 0;
        result[1] = l;
        return true;
      }
     
      let preProduct = 1;
      let minPreProduct = Infinity;
      let minPreProductEnd = 0;
     
      for (let i = l; i < n; i++) {
        product *= numbers[i] / avg;
        preProduct *= numbers[i - l] / avg;
     
        if (preProduct < minPreProduct) {
          minPreProduct = preProduct;
          minPreProductEnd = i - l;
        }
     
        if (product / minPreProduct >= 1) {
          result[0] = minPreProductEnd + 1;
          result[1] = i - minPreProductEnd;
          return true;
        }
      }
     
      return false;
    }
    
    

#### Java

    
    
    import java.util.*;
    
    public class Main {
        public static void main(String[] args) {
            int sub_arr_pos = 0; // 最大几何平均值子数组的起始位置
            int sub_arr_size = 0; // 最大几何平均值子数组的长度
            int N, L;
            Scanner sc = new Scanner(System.in);
            N = sc.nextInt();
            L = sc.nextInt(); // 输入数组大小和子数组最小长度
    
            double min_num = Double.MAX_VALUE; // 数组中的最小值
            double max_num = Double.MIN_VALUE; // 数组中的最大值
            double result = 1; // 数组前L个数的乘积
    
            List<Double> nums = new ArrayList<>(); // 数组
            for (int i = 0; i < N; i++) {
                nums.add(sc.nextDouble());
                min_num = Math.min(min_num, nums.get(i)); // 更新最小值
                max_num = Math.max(max_num, nums.get(i)); // 更新最大值
                if (i < L) {
                    result *= nums.get(i); // 计算前L个数的乘积
                }
            }
    
            // 二分法查找最大几何平均值
            while (max_num - min_num >= Math.pow(10, -10)) {
                double mid_num = (min_num + max_num) / 2; // 计算中间值
    
                double temp_result = result; // 临时乘积
                boolean flag = false; // 是否找到最大几何平均值子数组的标志位
    
                // 从前往后遍历数组，计算每个子数组的几何平均值
                for (int i = L; i <= N; i++) {
                    if (temp_result >= Math.pow(mid_num, L)) { // 如果临时乘积大于等于当前中间值的L次方，说明当前子数组的几何平均值大于等于中间值
                        sub_arr_pos = i - L; // 更新最大几何平均值子数组的起始位置
                        sub_arr_size = L; // 更新最大几何平均值子数组的长度
                        flag = true; // 找到最大几何平均值子数组
                        break;
                    }
                    if (i == N) { // 如果遍历到数组末尾，结束循环
                        break;
                    }
                    temp_result /= nums.get(i - L); // 除去子数组的第一个数
                    temp_result *= nums.get(i); // 加上子数组的最后一个数
                }
    
                if (flag) { // 如果找到最大几何平均值子数组，更新最小值为中间值
                    min_num = mid_num;
                } else { // 如果没找到，更新最大值为中间值
                    max_num = mid_num;
                }
            }
    
            System.out.println(sub_arr_pos + " " + sub_arr_size); // 输出最大几何平均值子数组的起始位置和长度
        }
    }
    

#### Python

    
    
    import math
    
    sub_arr_pos = 0 # 最大几何平均值子数组的起始位置
    sub_arr_size = 0 # 最大几何平均值子数组的长度
    N, L = map(int, input().split()) # 输入数组大小和子数组最小长度
    
    min_num = float("inf") # 数组中的最小值
    max_num = float("-inf") # 数组中的最大值
    result = 1 # 数组前L个数的乘积
    
    nums = [] # 数组
    for i in range(N):
        num = float(input())
        nums.append(num)
        min_num = min(min_num, num) # 更新最小值
        max_num = max(max_num, num) # 更新最大值
        if i < L:
            result *= num # 计算前L个数的乘积
    
    # 二分法查找最大几何平均值
    while max_num - min_num >= pow(10, -10):
        mid_num = (min_num + max_num) / 2 # 计算中间值
    
        temp_result = result # 临时乘积
        flag = False # 是否找到最大几何平均值子数组的标志位
    
        # 从前往后遍历数组，计算每个子数组的几何平均值
        for i in range(L, N+1):
            if temp_result >= pow(mid_num, L): # 如果临时乘积大于等于当前中间值的L次方，说明当前子数组的几何平均值大于等于中间值
                sub_arr_pos = i - L # 更新最大几何平均值子数组的起始位置
                sub_arr_size = L # 更新最大几何平均值子数组的长度
                flag = True # 找到最大几何平均值子数组
                break
            if i == N: # 如果遍历到数组末尾，结束循环
                break
            temp_result /= nums[i - L] # 除去子数组的第一个数
            temp_result *= nums[i] # 加上子数组的最后一个数
    
        if flag: # 如果找到最大几何平均值子数组，更新最小值为中间值
            min_num = mid_num
        else: # 如果没找到，更新最大值为中间值
            max_num = mid_num
    
    print(sub_arr_pos, sub_arr_size) # 输出最大几何平均值子数组的起始位置和长度
    

#### 文章目录

  *     *       * 题目描述
      * 输入描述
      * 输出描述
      * 备注
      * 用例
      * 题目解析
      * C++
      * JavaScript
      * Java
      * Python

![fengmian](https://img-
blog.csdnimg.cn/img_convert/1d2f33ed8cf2fb1b9a4fe09513f7aa94.png)

