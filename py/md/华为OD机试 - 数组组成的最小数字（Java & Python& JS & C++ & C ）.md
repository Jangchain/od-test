## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

给定一个整型数组，请从该数组中选择3个元素组成最小数字并输出

（如果数组长度小于3，则选择数组中所有元素来组成最小数字）。

​

## 输入描述

一行用半角逗号分割的字符串记录的整型数组，0 < 数组长度 <= 100，0 < 整数的取值范围 <= 10000。

## 输出描述

由3个元素组成的最小数字，如果数组长度小于3，则选择数组中所有元素来组成最小数字。

## 示例1

输入

    
    
    21,30,62,5,31
    

输出

    
    
    21305
    

说明

> 数组长度超过3，需要选3个元素组成最小数字，21305由21,30,5三个元素组成的数字，为所有组合中最小的数字。

## 示例2

输入

    
    
    5,21
    

输出

    
    
    215
    

说明

>
>     数组长度小于3， 选择所有元素来组成最小值，215为最小值。
>  

## 解题思路

#### 1\. **最小数字组合的核心思想：字典序排列**

  * 我们要从给定的数字列表中选择三个数字，并将它们拼接成一个字符串，要求这个字符串尽可能小。
  * 直接按数值大小排序只能确保我们选择的是数值最小的数字，但这并不能保证拼接后的数字最小。原因是字符串拼接顺序对最终的结果有很大影响。 
    * 例如，`"30"` 和 `"3"`，虽然数值上 `"3"` 小于 `"30"`，但拼接时，`"303"` 比 `"330"` 小。因此，不能简单依赖数值大小。

**字典序比较** 则是为了解决这个问题。通过将两个数字的所有可能拼接顺序进行比较，例如比较 `a + b` 和 `b +
a`，来确定哪种拼接顺序能产生更小的数字。这种比较方式确保最终拼接的数字是最小的。

#### 2\. **两次排序保证了最优选择** ：

  * **第一步：按数值大小排序** ：

    * 首先，我们需要确定要从哪些数字中选择三个。为了尽量选择数值小的数字，我们先按数值大小对输入的字符串数组进行排序。这样确保我们选取的三个数字在数值上是最小的。
    * 这一步骤减少了拼接组合的候选集，因为数值大的数字无论怎么拼接，都会比数值小的数字拼接出的结果大。
  * **第二步：字典序排序** ：

    * 接下来，为了确保选择的数字在拼接后能产生最小的数字，我们使用字典序排序的策略。这种排序会比较 `(a + b)` 和 `(b + a)` 的字典顺序，选择拼接后形成的字符串较小的排列方式。
    * 通过这样比较字典序，可以确保数字的排列方式最优。

#### 3\. **选择前3个数字的合理性** ：

  * 题目要求拼接三个数字来得到最小值。通过先对整个列表按数值大小排序，再取前3个数字，我们保证了选取的数字是数值上最小的，从而为之后的字典序拼接提供了最好的起点。

  * 如果输入的数字不足3个，代码逻辑也能处理这种情况：会直接将所有的数字拼接在一起。对于这种情况，少于3个的数字直接拼接，字典序依然保证了最小的拼接结果。

## Java

    
    
    import java.util.*;
    
    public class Main {
        public static void main(String[] args) {
            Scanner sc = new Scanner(System.in);
            String input = sc.nextLine();
    
            // 将输入的字符串按逗号分隔成字符串数组
            List<String> nums = new ArrayList<>();
            int pos = 0;
            while ((pos = input.indexOf(",")) != -1) {
                String num = input.substring(0, pos);
                nums.add(num);
                input = input.substring(pos + 1);
            }
            nums.add(input);
    
            // 对字符串数组进行排序，按照数字大小排序
            Collections.sort(nums, new Comparator<String>() {
                @Override
                public int compare(String a, String b) {
                    return Integer.parseInt(a) - Integer.parseInt(b);
                }
            });
    
            // 取出前三个数字组成最小数字
            List<String> min_nums = nums.subList(0, Math.min(3, nums.size()));
            Collections.sort(min_nums, new Comparator<String>() {
                @Override
                public int compare(String a, String b) {
                    return (a + b).compareTo(b + a);
                }
            });
    
            // 将最小数字拼接成字符串
            StringBuilder res = new StringBuilder();
            for (String num : min_nums) {
                res.append(num);
            }
    
            System.out.println(res.toString());
        }
    }
    

## Python

    
    
    import sys
    
    input = sys.stdin.readline().strip()
    
    # 将输入的字符串按逗号分隔成字符串数组
    nums = input.split(",")
    
    # 对字符串数组进行排序，按照数字大小排序
    nums.sort(key=int)
    
    # 取出前三个数字组成最小数字
    min_nums = nums[:min(3, len(nums))]
    min_nums.sort(key=lambda x: x+x)
    
    # 将最小数字拼接成字符串
    res = "".join(min_nums)
    
    print(res)
    

## JavaScript

    
    
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.on('line', (input) => {
      // 将输入的字符串按逗号分隔成字符串数组
      const nums = input.trim().split(",");
    
      // 对字符串数组进行排序，按照数字大小排序
      nums.sort((a, b) => parseInt(a) - parseInt(b));
    
      // 取出前三个数字组成最小数字
      const minNums = nums.slice(0, Math.min(3, nums.length)).sort((a, b) => (a + b) - (b + a));
    
      // 将最小数字拼接成字符串
      const res = minNums.join("");
    
      console.log(res);
    });
    

## C++

    
    
    #include <iostream>
    #include <algorithm>
    #include <string>
    #include <vector>
    
    using namespace std;
    
    int main() {
        string input;
        getline(cin, input);
    
        // 将输入的字符串按逗号分隔成字符串数组
        vector<string> nums;
        size_t pos = 0;
        while ((pos = input.find(",")) != string::npos) {
            string num = input.substr(0, pos);
            nums.push_back(num);
            input.erase(0, pos + 1);
        }
        nums.push_back(input);
    
        // 对字符串数组进行排序，按照数字大小排序
        sort(nums.begin(), nums.end(), [](string a, string b) { return stoi(a) < stoi(b); });
    
        // 取出前三个数字组成最小数字
        vector<string> min_nums(nums.begin(), nums.begin() + min(3, (int)nums.size()));
        sort(min_nums.begin(), min_nums.end(), [](string a, string b) { return (a + b) < (b + a); });
    
        // 将最小数字拼接成字符串
        string res;
        for (string num : min_nums) {
            res += num;
        }
    
        cout << res << endl;
    
        return 0;
    }
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    #include <string.h>
    
    // 字符串比较函数，用于按数字拼接结果的字典序比较
    int compare_by_concat(const void *a, const void *b) {
        char ab[32], ba[32];
        sprintf(ab, "%s%s", *(const char **)a, *(const char **)b);
        sprintf(ba, "%s%s", *(const char **)b, *(const char **)a);
        return strcmp(ab, ba);
    }
    
    // 按数值大小排序的比较函数
    int compare_by_value(const void *a, const void *b) {
        return atoi(*(const char **)a) - atoi(*(const char **)b);
    }
    
    // 分割输入字符串
    void split_string(const char *input, char **nums, int *size) {
        char *token;
        char *input_copy = strdup(input);  // 复制输入字符串，防止修改原字符串
        *size = 0;
        token = strtok(input_copy, ",");
        while (token != NULL) {
            nums[(*size)++] = strdup(token);  // 复制每个分割出来的子字符串
            token = strtok(NULL, ",");
        }
        free(input_copy);
    }
    
    int main() {
        char input[256];
        char *nums[256];
        int size = 0;
    
     
        fgets(input, sizeof(input), stdin);
        input[strcspn(input, "\n")] = '\0';  // 去掉换行符
    
        // 分割输入字符串成数字数组
        split_string(input, nums, &size);
    
        // 对字符串数组进行按数值大小排序
        qsort(nums, size, sizeof(char *), compare_by_value);
    
        // 取出前三个最小数字
        int min_size = size < 3 ? size : 3;
    
        // 对前三个数字按拼接结果的字典序排序
        qsort(nums, min_size, sizeof(char *), compare_by_concat);
    
        // 拼接结果
        char result[256] = "";
        for (int i = 0; i < min_size; i++) {
            strcat(result, nums[i]);
            free(nums[i]);  // 释放分配的内存
        }
    
        // 输出结果
        printf("%s\n", result);
    
        return 0;
    }
    
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

#### 完整用例

##### 用例1

    
    
    5,2,3,1
    

##### 用例2

    
    
    10,20,30
    

##### 用例3

    
    
    100,200,300,400,500
    

##### 用例4

    
    
    7,6
    

##### 用例5

    
    
    9
    

##### 用例6

    
    
    100,200,300,400,500,600,700,800,900,1000
    

##### 用例7

    
    
    1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20
    

##### 用例8

    
    
    10000,20000,30000,40000,50000,60000,70000,80000,90000,100000
    

##### 用例9

    
    
    9999,8888,7777,6666,5555,4444,3333,2222,1111,1000
    

##### 用例10

    
    
    100,200,300,400,500,600,700,800,900,1000,1100,1200,1300
    

