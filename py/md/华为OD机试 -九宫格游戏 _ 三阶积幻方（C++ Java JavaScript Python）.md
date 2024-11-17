#### 题目描述

[九宫格](https://so.csdn.net/so/search?q=%E4%B9%9D%E5%AE%AB%E6%A0%BC&spm=1001.2101.3001.7020)是一款广为流传的游戏，起源于河图洛书。  
游戏规则是：1到9九个数字放在3×3的格子中，要求每行、每列以及两个对角线上的三数之和都等于15.  
在金麻名著《射雕英雄传》中黃蓉曾给九宫格的一种解法，口诀：戴九恩一，左三右七，二四有肩，八六为足，五居中央。解法如图所示。

4| 9| 2  
---|---|---  
3| 5| 7  
8| 1| 6  
  
现在有一种新的玩法，给九个不同的数字，将这九个数字放在3×3的格子中，要求每行、每列以及两个对角线上的三数之积相等（三阶积[幻方](https://so.csdn.net/so/search?q=%E5%B9%BB%E6%96%B9&spm=1001.2101.3001.7020)）。其中一个三阶幻方如图：

2| 9| 12  
---|---|---  
36| 6| 1  
3| 4| 18  
解释：每行、每列以及两个对角线上的三数之积相等，都为216。请设计一种算法，将给定的九个数宇重新排列后，使其满足三阶积幻方的要求。
排列后的九个数宇中：第1-3个数字为方格的第一行，第4-6个数宇为方格的第二行，第7-9个数字为方格的第三行。

#### 输入描述

九个不同的数宇，每个数字之间用空格分开。  
0＜数字<10^7。0<排列后满足要求的每行、每列以及两个对角线上的三数之积 ＜ 2^31-1。

#### 输出描述

九个数字所有满足要求的排列，每个数字之间用空格分开。每行输出一个满足要求的排列。  
要求输出的排列升序排序，即：对于排列A
(A1.A2.A3…A9)和排列B(B1,B2,B3…B9），从排列的第1个数字开始，遇到Ai<[Bi](https://so.csdn.net/so/search?q=Bi&spm=1001.2101.3001.7020)，则排列A<排列B
（1<=j<=9)。

说明：用例保证至少有一种排列组合满足条件。

#### 用例

输入| 75 36 10 4 30 225 90 25 12  
---|---  
输出| 10 36 75 225 30 4 12 25 90  
10 225 12 36 30 25 75 4 90  
12 25 90 225 30 4 10 36 75  
12 225 10 25 30 36 90 4 75  
75 4 90 36 30 25 10 225 12  
75 36 10 4 30 225 90 25 12  
90 4 75 25 30 36 12 225 10  
90 25 12 4 30 225 75 36 10  
说明| 无  
  
#### 题目解析

简单的全排列问题。

关于全排列的入门，可以看[组合与排列的区别，回溯算法求解的时候，有何不同？|
LeetCode：46.全排列_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV19v4y1S79W/?spm_id_from=333.999.0.0&vd_source=b5105a99a0628dd906e154263279c518
"组合与排列的区别，回溯算法求解的时候，有何不同？| LeetCode：46.全排列_哔哩哔哩_bilibili")

#### C++

    
    
    #include<iostream>
    #include<vector>
    #include<stdlib.h>
    #include<algorithm>
    #include<string.h>
    #include<map>
    #include<cmath>
    
    using namespace std;
    
    // 将字符串转换为整数数组
    vector<int> split(string input_str) {
        vector<int> nums;
        while (input_str.find(" ") != string::npos) {
            int found = input_str.find(" ");
            nums.push_back(stoi(input_str.substr(0, found)));
            input_str = input_str.substr(found + 1);
        }    
        nums.push_back(stoi(input_str));
        return nums;
    }
    
    // 保存结果
    vector<vector<int>> result;
    
    // 检查是否符合要求
    bool check(vector<int> nums) {
        int fixed_result = nums[0] * nums[1] * nums[2];
        // 每行
        if (fixed_result != nums[3] * nums[4] * nums[5] || fixed_result != nums[6] * nums[7] * nums[8]) {
            return false;
        } 
    
        // 每列
        if (fixed_result != nums[0] * nums[3] * nums[6] || 
            fixed_result != nums[1] * nums[4] * nums[7] ||
            fixed_result != nums[2] * nums[5] * nums[8]) {
            return false;
        } 
    
        // 对角线
        if (fixed_result != nums[0] * nums[4] * nums[8] || fixed_result != nums[2] * nums[4] * nums[6]) {
            return false;
        }
    
        return true;
    }
    
    // 交换数组中的两个元素
    void swap(vector<int> &nums, int k, int i) {
        int t = nums[k];
        nums[k] = nums[i];
        nums[i] = t;
    }
    
    // 递归实现全排列
    void permutation(vector<int> &nums, int i, int j) {
        if(i == j) { // 递归结束条件
            if (check(nums)) { // 检查是否符合要求
                result.push_back(nums); // 将符合要求的结果保存起来
            }
        } else {
            for(int k = i; k <= j; k++) {
                swap(nums, i, k); // 交换第一个i=k，即交换1和他自己；对后面的数字进行递归
                permutation(nums, i + 1, j); // 递归
                swap(nums, i, k); // 再交换回来，进行下一次交换
            }
        }
    }
    
    int main() {
        // 处理输入
        string input_str;
        getline(cin, input_str);
        vector<int> nums = split(input_str);
    
        // 全排列核心思想就是每个数字逐个与后面的数字进行交换
        permutation(nums, 0, 8);
    
        // 排序
        sort(result.begin(), result.end(), [](vector<int> a, vector<int> b){
            for (int i = 0; i < 9; i++) {
                if (a[i] != b[i]) {
                    return a[i] < b[i];
                } 
            }
        });
    
        // 输出
        for (vector<int> single_res : result) {
            for (int i = 0; i < 9; i++) {
                cout << single_res[i];
                if (i != 8) {
                    cout << " ";
                }
            }
            cout << endl;
        }
        return 0;
    }
    

#### JavaScript

    
    
    const readline = require("readline");
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    
    rl.on("line", (line) => {
      const nums = line.split(" ").map(Number); // 将输入的字符串转为数字数组
      getResult(nums);
    });
    
    function getResult(nums) {
      const res = [];
      dfs(nums, [], [], res); // 深度优先搜索
    
      res.sort((a, b) => { // 排序
        for (let i = 0; i < 9; i++) {
          if (a[i] !== b[i]) return a[i] - b[i];
        }
        return 0;
      });
    
      res.forEach((arr) => console.log(arr.join(" "))); // 输出结果
    }
    
    function dfs(nums, used, path, res) {
      if (path.length === nums.length) { // 如果路径长度等于数字个数
        if (check(path)) { // 判断是否符合条件
          res.push([...path]); // 将符合条件的路径加入结果数组
        }
        return;
      }
    
      for (let i = 0; i < nums.length; i++) { // 遍历每个数字
        if (!used[i]) { // 如果该数字没有被使用过
          path.push(nums[i]); // 将该数字加入路径
          used[i] = true; // 标记该数字已被使用
          dfs(nums, used, path, res); // 继续搜索
          used[i] = false; // 回溯，将该数字标记为未使用
          path.pop(); // 回溯，将该数字从路径中删除
        }
      }
    }
    
    function check(arr) {
      /**
       * a0 a1 a2
       * a3 a4 a5
       * a6 a7 a8
       */
    
      const r1 = arr[0] * arr[1] * arr[2]; // 第一行的乘积
    
      const r2 = arr[3] * arr[4] * arr[5]; // 第二行的乘积
      if (r1 != r2) return false; // 如果不相等，返回false
    
      const r3 = arr[6] * arr[7] * arr[8]; // 第三行的乘积
      if (r1 != r3) return false; // 如果不相等，返回false
    
      const c1 = arr[0] * arr[3] * arr[6]; // 第一列的乘积
      if (r1 != c1) return false; // 如果不相等，返回false
    
      const c2 = arr[1] * arr[4] * arr[7]; // 第二列的乘积
      if (r1 != c2) return false; // 如果不相等，返回false
    
      const c3 = arr[2] * arr[5] * arr[8]; // 第三列的乘积
      if (r1 != c3) return false; // 如果不相等，返回false
    
      const s1 = arr[0] * arr[4] * arr[8]; // 对角线1的乘积
      if (r1 != s1) return false; // 如果不相等，返回false
    
      const s2 = arr[2] * arr[4] * arr[6]; // 对角线2的乘积
      if (r1 != s2) return false; // 如果不相等，返回false
    
      return true; // 如果所有条件都符合，返回true
    }
    

#### Java

    
    
    import java.util.ArrayList;
    import java.util.Arrays;
    import java.util.Scanner;
    
    public class Main {
        public static ArrayList<Integer[]> result;
    
        public static void main(String[] args) {
            // 处理输入
            Scanner scanner = new Scanner(System.in);
            Integer[] nums = new Integer[9];
            for (int i = 0; i < 9; i++) {
                nums[i] = scanner.nextInt();
            }
            result = new ArrayList<>();
    
            // 全排列核心思想就是每个数字逐个与后面的数字进行交换
            permute(nums, 0, 8);
    
            // 排序
            result.sort((a, b) -> {
                for (int i = 0; i < 9; i++) {
                    if (a[i] != b[i]) {
                        return a[i] - b[i];
                    }
                }
                return 0;
            });
    
            // 输出
            for (Integer[] singleResult : result) {
                for (int i = 0; i < 9; i++) {
                    System.out.print(singleResult[i]);
                    if (i != 8) {
                        System.out.print(" ");
                    }
                }
                System.out.println();
            }
        }
    
        public static void permute(Integer[] a, int i, int j) {
            if (i == j) {
                if (check(a)) {
                    result.add(Arrays.copyOf(a, 9));
                }
            } else {
                for (int k = i; k <= j; k++) {
                    swap(a, i, k); // 交换第一个i=k,即交换1和他自己；对后面的数字进行递归
                    permute(a, i + 1, j); // 递归
                    swap(a, i, k); // 再交换回来，进行下一次交换
                }
            }
        }
    
        public static boolean check(Integer[] a) {
            int fixedResult = a[0] * a[1] * a[2];
            // 每行
            if (fixedResult != a[3] * a[4] * a[5] || fixedResult != a[6] * a[7] * a[8]) {
                return false;
            }
    
            // 每列
            if (fixedResult != a[0] * a[3] * a[6] || fixedResult != a[1] * a[4] * a[7] || fixedResult != a[2] * a[5] * a[8]) {
                return false;
            }
    
            // 对角线
            if (fixedResult != a[0] * a[4] * a[8] || fixedResult != a[2] * a[4] * a[6]) {
                return false;
            }
    
            return true;
        }
    
        public static void swap(Integer[] a, int k, int i) {
            int temp = a[k];
            a[k] = a[i];
            a[i] = temp;
        }
    }
    

#### Python

    
    
    # coding:utf-8
    
    import functools
    import collections
    import math
    from itertools import combinations
    from re import match
    import copy
    
    
    # 处理输入
    input_nums = [int(x) for x in input().split(" ")]
    result = []
    
    def check(nums):
        fixed_result = nums[0] * nums[1] * nums[2]
        # 每行
        if fixed_result != nums[3] * nums[4] * nums[5] or fixed_result != nums[6] * nums[7] * nums[8]:
            return False
    
        # 每列
        if fixed_result != nums[0] * nums[3] * nums[6] or fixed_result != nums[1] * nums[4] * nums[7] or fixed_result != nums[2] * nums[5] * nums[8]:
            return False
    
        # 对角线
        if fixed_result != nums[0] * nums[4] * nums[8] or fixed_result != nums[2] * nums[4] * nums[6]:
            return False
    
        return True
    
    def swap(nums, k, i):
        t = nums[k]
        nums[k] = nums[i]
        nums[i] = t
    
    def perm(nums, i, j):
        if i == j:
            if check(nums):
                result.append(copy.copy(nums))
        else:
            for k in range(i, j + 1):
                swap(nums, i, k) # 交换第一个i=k,即交换1和他自己；对后面的数字进行递归
                perm(nums, i + 1, j) # 递归
                swap(nums, i, k) # 再交换回来，进行下一次交换
    
    # 全排列核心思想就是每个数字逐个与后面的数字进行交换
    perm(input_nums, 0, 8)
    
    # 排序
    result.sort(key=lambda x: (x[0], x[1], x[2], x[3], x[4], x[5], x[6], x[7], x[8]))
    
    # 输出
    for single_res in result:
        print(" ".join([str(i) for i in single_res]))
    
    

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

