#### 题目描述

区块链底层存储是一个链式文件系统，由顺序的N个文件组成，每个文件的大小不一，依次为F1,F2,…,Fn。随着时间的推移，所占存储会越来越大。

云平台考虑将区块链按文件转储到廉价的SATA盘，只有连续的区块链文件才能转储到SATA盘上，且转储的文件之和不能超过SATA盘的容量。

假设每块SATA盘容量为M，求能转储的最大连续文件之和。

#### 输入描述

第一行为SATA盘容量M，1000 ≤ M ≤ 1000000

第二行为区块链文件大小序列F1,F2,…,Fn。其中 1 ≤ n ≤ 100000，1 ≤ Fi ≤ 500

#### 输出描述

求能转储的最大连续文件大小之和

#### 用例

输入| 1000  
100 300 500 400 400 150 100  
---|---  
输出| 950  
说明| 最大序列和为950，序列为[400,400,150]  
输入| 1000  
100 500 400 150 500 100  
---|---  
输出| 1000  
说明| 最大序列和为1000，序列为[100,500,400]  
  
#### 题目解析

本质上就是求解连续子数组的和，如果满足最接近最大值M，则输出这个连续子数组。

本题的滑动窗口的左边界l,右边界r的运动逻辑如下：

  * 如果滑动窗口内部和 < m，则r++
  * 如果滑动窗口内部和 > m，则l++
  * 如果滑动窗口内部和 = m，则已得到最大值，直接返回m即可。

#### 代码思路

这是一道滑动窗口的题目，滑动窗口的思路是维护一个窗口，窗口内的元素满足一定的条件，然后通过移动窗口的左右边界来得到满足条件的子序列/子数组。

对于这道题目，我们需要维护一个窗口，窗口内的元素的和不超过SATA盘的容量M。我们从左到右扫描整个序列，维护一个窗口，窗口的右边界不断向右移动，如果窗口内的元素的和超过了M，那么窗口的左边界向右移动，直到窗口内的元素的和小于等于M。在这个过程中，我们需要记录窗口内元素的和的最大值，最后返回这个最大值即可。

#### C++

    
    
    #include <iostream>
    #include <vector>
    #include <sstream>
    
    using namespace std;
    
    int main() {
        // 处理输入
        int M;
        cin >> M; // SATA盘容量
        cin.ignore();
        string line;
        getline(cin, line);
        stringstream ss(line);
        vector<int> F;
        int num;
        while (ss >> num) {
            F.push_back(num);
        }
        // 窗口左右边界
        int left = 0, right = 0;
        // 窗口和
        int window_sum = 0;
        // 最大窗口和
        int window_max = 0;
    
        while (right < F.size()) {
            window_sum += F[right]; // 将当前文件大小加入窗口和
    
            while (window_sum > M) { // 当窗口和大于SATA盘容量时，移动窗口左边界
                window_sum -= F[left]; // 将左边界对应的文件大小从窗口和中减去
                left++; // 移动左边界
            }
    
            if (window_sum == M) { // 如果窗口和等于SATA盘容量，直接输出并返回
                cout << M << endl;
                return 0;
            }
    
            window_max = max(window_sum, window_max); // 更新最大窗口和
            right++; // 移动右边界
        }
    
        cout << window_max << endl; // 输出最大窗口和
    
        return 0;
    }
    
    

#### JavaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    let M = 0;
    let F = [];
    
    rl.on('line', (input) => {
      if (!M) {
        M = parseInt(input);
      } else {
        F = input.split(' ').map(Number);
        
        let left = 0;
        let right = 0;
        let window_sum = 0;
        let window_max = 0;
    
        while (right < F.length) {
          window_sum += F[right];
    
          while (window_sum > M) {
            window_sum -= F[left];
            left++;
          }
    
          if (window_sum === M) {
            console.log(M);
            return;
          }
    
          window_max = Math.max(window_sum, window_max);
          right++;
        }
    
        console.log(window_max);
      }
    });
    

#### Java

    
    
    import java.util.*;
    
    public class Main {
        public static void main(String[] args) {
            // 处理输入
            Scanner in = new Scanner(System.in);
            int M =in.nextInt(); // SATA盘容量
            in.nextLine();
            Integer[] F = Arrays.stream(in.nextLine().split(" ")).map(Integer::parseInt).toArray(Integer[]::new); // 区块链文件大小序列
            // 窗口左右边界
            int left = 0, right = 0;
            // 窗口和
            int window_sum = 0;
            // 最大窗口和
            int window_max = 0;
    
            while (right < F.length) {
                window_sum += F[right]; // 将当前文件大小加入窗口和
    
                while (window_sum > M) { // 当窗口和大于SATA盘容量时，移动窗口左边界
                    window_sum -= F[left]; // 将左边界对应的文件大小从窗口和中减去
                    left++; // 移动左边界
                }
    
                if (window_sum == M) { // 如果窗口和等于SATA盘容量，直接输出并返回
                    System.out.println(M);
                    return;
                }
    
                window_max = Math.max(window_sum, window_max); // 更新最大窗口和
                right++; // 移动右边界
            }
    
            System.out.println(window_max); // 输出最大窗口和
        }
    }
    

#### Python

    
    
    import sys
    
    M = int(input()) # SATA盘容量
    F = list(map(int, input().split())) # 区块链文件大小序列
    
    # 窗口左右边界
    left = 0
    right = 0
    # 窗口和
    window_sum = 0
    # 最大窗口和
    window_max = 0
    
    while right < len(F):
        window_sum += F[right] # 将当前文件大小加入窗口和
    
        while window_sum > M: # 当窗口和大于SATA盘容量时，移动窗口左边界
            window_sum -= F[left] # 将左边界对应的文件大小从窗口和中减去
            left += 1 # 移动左边界
    
        if window_sum == M: # 如果窗口和等于SATA盘容量，直接输出并返回
            print(M)
            sys.exit()
    
        window_max = max(window_sum, window_max) # 更新最大窗口和
        right += 1 # 移动右边界
    
    print(window_max) # 输出最大窗口和
    

#### 文章目录

  *     *       * 题目描述
      * 输入描述
      * 输出描述
      * 用例
      * 题目解析
      * 代码思路
      * C++
      * JavaScript
      * Java
      * Python

![fengmian](https://img-
blog.csdnimg.cn/img_convert/1d2f33ed8cf2fb1b9a4fe09513f7aa94.png)

