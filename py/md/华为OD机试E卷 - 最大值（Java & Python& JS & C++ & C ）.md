## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

给定一组整数（非负），重排顺序后输出一个最大的整数。

示例1

输入：[10,9]

输出：910

说明:输出结果可能非常大，所以你需要返回一个字符串而不是整数。

## 输入描述

数字组合

## 输出描述

最大的整数

## 示例1

输入

    
    
    10 9
    

输出

    
    
    910
    

说明

> ## 解题思路

**题目要求** 是：给定一组非负整数，通过重新排列这些整数的顺序，拼接成一个最大的整数，并返回该结果。

由于输出的结果可能非常大，题目要求返回的结果是一个字符串，而不是整数类型。

### 原题

跟这道题一致：<https://leetcode.cn/problems/largest-number/description/>

## Java

    
    
    import java.util.Arrays;
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            // 读取输入
            Scanner sc = new Scanner(System.in);
            String[] input = sc.nextLine().split(" ");  // 读取并拆分输入
            int[] nums = new int[input.length];
            
            // 将输入的字符串数组转换为整数数组
            for (int i = 0; i < input.length; i++) {
                nums[i] = Integer.parseInt(input[i]);
            }
            
           
            int n = nums.length;
            String[] ss = new String[n];
            
            // 将整数数组转换为字符串数组
            for (int i = 0; i < n; i++) {
                ss[i] = String.valueOf(nums[i]);
            }
    
            // 自定义排序规则，比较两个字符串拼接后的大小
            Arrays.sort(ss, (a, b) -> {
                String sa = a + b, sb = b + a;
                return sb.compareTo(sa);  // 按照拼接后的字符串从大到小排序
            });
    
            // 拼接排序后的字符串
            StringBuilder sb = new StringBuilder();
            for (String s : ss) {
                sb.append(s);
            }
    
            // 去除多余的前导零
            int len = sb.length();
            int k = 0;
            while (k < len - 1 && sb.charAt(k) == '0') {
                k++;
            }
    
            // 输出最终的结果字符串
            System.out.println(sb.substring(k));
        }
    }
    

## Python

    
    
    # 导入需要的模块
    import functools
    
    # 读取输入并分割
    input_str = input().split()
    
    # 将字符串数组转换为整数数组
    nums = [int(i) for i in input_str]
    
    # 将整数数组转换为字符串数组
    str_nums = [str(num) for num in nums]
    
    # 定义自定义排序规则，比较两个字符串拼接后的大小
    def compare(a, b):
        if a + b > b + a:
            return -1
        elif a + b < b + a:
            return 1
        else:
            return 0
    
    # 对字符串数组进行排序
    str_nums.sort(key=functools.cmp_to_key(compare))
    
    # 拼接排序后的字符串
    result = ''.join(str_nums)
    
    # 去除前导零，如果全是零，则只返回一个零
    result = result.lstrip('0') or '0'
    
    # 输出最终结果
    print(result)
    

## JavaScript

    
    
    const readline = require("readline");
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    
    rl.on("line", (line) => {
     
    
      // 将后续的输入处理为整数数组
      const nums = line.split(" ").map(Number);
    
      // 将整数数组转换为字符串数组
      let str_nums = nums.map(num => num.toString());
    
      // 自定义排序规则，比较两个字符串拼接后的大小
      str_nums.sort((a, b) => (b + a).localeCompare(a + b));
    
      // 拼接排序后的字符串
      let result = str_nums.join("");
    
      // 去除前导零，如果全是零，则只返回一个零
      result = result.replace(/^0+/, "") || "0";
    
      // 输出最终结果
      console.log(result);
    });
     
     
    

## C++

    
    
    #include <iostream>
    #include <vector>
    #include <algorithm>
    #include <string>
    using namespace std;
    
    // 自定义比较函数，比较拼接后的字符串
    bool compare(const string &a, const string &b) {
        return a + b > b + a;
    }
    
    int main() {
        // 读取输入
        string input;
        getline(cin, input);
        
        vector<string> nums;
        string temp = "";
        
        // 将输入的字符串分割为单独的数字
        for (char c : input) {
            if (c == ' ') {
                nums.push_back(temp);
                temp = "";
            } else {
                temp += c;
            }
        }
        nums.push_back(temp);
        
        // 对字符串数组进行排序
        sort(nums.begin(), nums.end(), compare);
        
        // 拼接排序后的字符串
        string result = "";
        for (const string &num : nums) {
            result += num;
        }
        
        // 去除前导零
        int k = 0;
        while (k < result.size() - 1 && result[k] == '0') {
            k++;
        }
        
        // 输出最终结果
        cout << result.substr(k) << endl;
    
        return 0;
    }
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    #include <string.h>
    
    // 自定义比较函数，比较拼接后的字符串
    int compare(const void *a, const void *b) {
        char sa[40], sb[40];
        strcpy(sa, *(const char **)a);
        strcat(sa, *(const char **)b);
        strcpy(sb, *(const char **)b);
        strcat(sb, *(const char **)a);
        return strcmp(sb, sa);
    }
    
    int main() {
        char input[1000];
        char *nums[500];
        int n = 0;
    
        // 读取输入
        fgets(input, sizeof(input), stdin);
    
        // 使用 strtok 分割输入的字符串
        char *token = strtok(input, " \n");
        while (token != NULL) {
            nums[n++] = token;
            token = strtok(NULL, " \n");
        }
    
        // 使用 qsort 排序
        qsort(nums, n, sizeof(char *), compare);
    
        // 拼接排序后的字符串
        char result[1000] = "";
        for (int i = 0; i < n; i++) {
            strcat(result, nums[i]);
        }
    
        // 去除前导零
        int k = 0;
        while (result[k] == '0' && result[k + 1] != '\0') {
            k++;
        }
    
        // 输出最终结果
        printf("%s\n", result + k);
    
        return 0;
    }
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

## 完整用例

### 用例1

    
    
    10 2
    

### 用例2

    
    
    121 12
    

### 用例3

    
    
    111 111
    

### 用例4

    
    
    3 30 34 5 9
    

### 用例5

    
    
    10 2 9 39 17
    

### 用例6

    
    
    4
    

### 用例7

    
    
    0 0 0 0
    

### 用例8

    
    
    987 9876 98765
    

### 用例9

    
    
    1 2 3 4 5 6 7 8 9
    

### 用例10

    
    
    0 12 120
    

