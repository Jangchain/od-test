## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

给定一个由纯数字组成以字符串表示的数值，现要求字符串中的每个数字最多只能出现2次，超过的需要进行删除；

删除某个重复的数字后，其它数字相对位置保持不变。

如”34533″，数字3重复超过2次，需要删除其中一个3，删除第一个3后获得最大数值”4533″

请返回经过删除操作后的最大的数值，以字符串表示。

## 输入描述

第一行为一个纯数字组成的字符串，长度范围：[1,100000]

## 输出描述

输出经过删除操作后的最大的数值

## 示例1

输入

    
    
    34533
    

输出

    
    
    4533
    

说明

## 示例2

输入

    
    
    5445795045
    

输出

    
    
    5479504
    

说明

## 解题思路

类似题，可以参考题解：  
[316\. 去除重复字母 - 力扣（LeetCode）](https://leetcode.cn/problems/remove-duplicate-
letters/)

#### 题目解读

  1. **删除多余的数字** ：字符串中每个数字最多只能出现两次，若某个数字出现超过两次，则需要删除多余的次数。例如，字符串 `34533` 中的数字 `3` 出现了三次，超过了两次限制，需要删除一次 `3`。

  2. **保持相对位置** ：在删除多余数字后，数字的相对顺序必须保持不变。即在删除多余数字后，剩余的数字排列顺序与原字符串中相同。

  3. **最大化数值** ：题目要求删除后得到的结果应该是最大可能的数值字符串。例如，从 `34533` 中删除第一个 `3` 后得到 `4533`，这是可能的最大数值。

#### 示例解析

##### 示例1

  * 输入：`34533`
  * 过程： 
    * 数字 `3` 出现了三次，超过了限制。我们删除第一个 `3`。
    * 删除后的字符串为 `4533`，这是最大值。
  * 输出：`4533`

##### 示例2

  * 输入：`5445795045`
  * 过程： 
    * 数字 `4` 和 `5` 出现了三次，需要删除多余的 `4` 和 `5`。
    * 删除最靠前的 `4` 和 `5`，得到 `5479504`，这是可能的最大数。
  * 输出：`5479504`

## Java

    
    
    import java.util.*;
    
    public class Main {
        public static void main(String[] args) {
            // 输入一个字符串
            Scanner scanner = new Scanner(System.in);
            String numStr = scanner.next();
    
            // 使用数组记录每个数字的使用次数，索引 0-9 对应字符 '0'-'9'
            int[] usedNum = new int[10];
            int[] totalNum = new int[10];
    
            // 遍历字符串，统计每个数字的总出现次数
            for (int i = 0; i < numStr.length(); i++) {
                totalNum[numStr.charAt(i) - '0']++;
            }
    
            // 存储最终的数字序列
            LinkedList<Character> numList = new LinkedList<>();
    
            // 遍历字符串
            for (int i = 0; i < numStr.length(); i++) {
                char c = numStr.charAt(i);
                int num = c - '0';
    
                // 如果当前数字已经被使用了2次，那么就跳过
                if (usedNum[num] == 2) {
                    totalNum[num]--;  // 减少未使用的数量
                    continue;
                }
    
                // 如果当前数字比栈顶元素大，并且栈顶元素可以重新加入，则移除栈顶元素以获取更大的数值
                while (!numList.isEmpty()) {
                    char top = numList.getLast();
                    int topNum = top - '0';
    
                    if (top < c && totalNum[topNum] + usedNum[topNum] - 1 >= 2) {
                        numList.removeLast();
                        usedNum[topNum]--;
                    } else {
                        break;
                    }
                }
    
                // 将当前数字添加到栈中
                numList.addLast(c);
                // 标记当前数字已经使用了一次
                totalNum[num]--;
                usedNum[num]++;
            }
    
            // 将栈中的数字转换为字符串
            StringBuilder result = new StringBuilder();
            for (char c : numList) {
                result.append(c);
            }
            // 输出最终的数字序列
            System.out.println(result.toString());
        }
    }
    
    

## Python

    
    
    # 导入deque用于存储最终的数字序列
    from collections import deque
    
    # 输入一个字符串
    num_str = input().strip()
    
    # 使用列表记录每个数字的使用次数，索引 0-9 对应字符 '0'-'9'
    used_num = [0] * 10
    total_num = [0] * 10
    
    # 遍历字符串，统计每个数字的总出现次数
    for c in num_str:
        total_num[int(c)] += 1
    
    # 存储最终的数字序列
    num_list = deque()
    
    # 遍历字符串
    for c in num_str:
        num = int(c)
    
        # 如果当前数字已经被使用了2次，那么就跳过
        if used_num[num] == 2:
            total_num[num] -= 1  # 减少未使用的数量
            continue
    
        # 如果当前数字比队列尾部元素大，且尾部元素可以重新加入，则移除尾部元素
        while num_list and num_list[-1] < c:
            top = num_list[-1]
            top_num = int(top)
            
            # 判断栈顶元素是否可以重新加入
            if total_num[top_num] + used_num[top_num] - 1 >= 2:
                num_list.pop()
                used_num[top_num] -= 1
            else:
                break
    
        # 将当前数字添加到队列中
        num_list.append(c)
        # 标记当前数字已经使用了一次
        total_num[num] -= 1
        used_num[num] += 1
    
    # 将队列中的数字转换为字符串并输出
    result = ''.join(num_list)
    print(result)
    
    

## JavaScript

    
    
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    rl.on('line', (numStr) => {
        // 使用数组记录每个数字的使用次数，索引 0-9 对应字符 '0'-'9'
        let usedNum = Array(10).fill(0);
        let totalNum = Array(10).fill(0);
    
        // 遍历字符串，统计每个数字的总出现次数
        for (let char of numStr) {
            totalNum[parseInt(char)]++;
        }
    
        // 存储最终的数字序列
        let numList = [];
    
        // 遍历字符串
        for (let char of numStr) {
            let num = parseInt(char);
    
            // 如果当前数字已经被使用了2次，那么就跳过
            if (usedNum[num] === 2) {
                totalNum[num]--;  // 减少未使用的数量
                continue;
            }
    
            // 如果当前数字比数组最后元素大，且最后元素可以重新加入，则移除最后元素
            while (numList.length > 0 && numList[numList.length - 1] < char) {
                let top = numList[numList.length - 1];
                let topNum = parseInt(top);
    
                // 判断数组最后元素是否可以重新加入
                if (totalNum[topNum] + usedNum[topNum] - 1 >= 2) {
                    numList.pop();
                    usedNum[topNum]--;
                } else {
                    break;
                }
            }
    
            // 将当前数字添加到数组中
            numList.push(char);
            // 标记当前数字已经使用了一次
            totalNum[num]--;
            usedNum[num]++;
        }
    
        // 输出最终的数字序列
        console.log(numList.join(''));
        rl.close();
    });
    
    

## C++

    
    
    #include <iostream>
    #include <deque>
    #include <string>
    using namespace std;
    
    int main() {
        // 输入一个字符串
        string numStr;
        cin >> numStr;
    
        // 使用数组记录每个数字的使用次数，索引 0-9 对应字符 '0'-'9'
        int usedNum[10] = {0};
        int totalNum[10] = {0};
    
        // 遍历字符串，统计每个数字的总出现次数
        for (char c : numStr) {
            totalNum[c - '0']++;
        }
    
        // 存储最终的数字序列
        deque<char> numList;
    
        // 遍历字符串
        for (char c : numStr) {
            int num = c - '0';
    
            // 如果当前数字已经被使用了2次，那么就跳过
            if (usedNum[num] == 2) {
                totalNum[num]--;  // 减少未使用的数量
                continue;
            }
    
            // 如果当前数字比队列尾部元素大，且尾部元素可以重新加入，则移除尾部元素
            while (!numList.empty() && numList.back() < c) {
                char top = numList.back();
                int topNum = top - '0';
    
                if (totalNum[topNum] + usedNum[topNum] - 1 >= 2) {
                    numList.pop_back();
                    usedNum[topNum]--;
                } else {
                    break;
                }
            }
    
            // 将当前数字添加到队列中
            numList.push_back(c);
            // 标记当前数字已经使用了一次
            totalNum[num]--;
            usedNum[num]++;
        }
    
        // 输出最终的数字序列
        for (char c : numList) {
            cout << c;
        }
        cout << endl;
    
        return 0;
    }
    
    

## C语言

    
    
    #include <stdio.h>
    #include <string.h>
    
    int main() {
        // 输入一个字符串
        char numStr[100001];
        scanf("%s", numStr);
    
        // 使用数组记录每个数字的使用次数，索引 0-9 对应字符 '0'-'9'
        int usedNum[10] = {0};
        int totalNum[10] = {0};
        int len = strlen(numStr);
    
        // 遍历字符串，统计每个数字的总出现次数
        for (int i = 0; i < len; i++) {
            totalNum[numStr[i] - '0']++;
        }
    
        // 存储最终的数字序列
        char numList[100001];
        int listSize = 0;
    
        // 遍历字符串
        for (int i = 0; i < len; i++) {
            char c = numStr[i];
            int num = c - '0';
    
            // 如果当前数字已经被使用了2次，那么就跳过
            if (usedNum[num] == 2) {
                totalNum[num]--;  // 减少未使用的数量
                continue;
            }
    
            // 如果当前数字比栈顶元素大，且栈顶元素可以重新加入，则移除栈顶元素
            while (listSize > 0 && numList[listSize - 1] < c) {
                char top = numList[listSize - 1];
                int topNum = top - '0';
    
                if (totalNum[topNum] + usedNum[topNum] - 1 >= 2) {
                    listSize--;
                    usedNum[topNum]--;
                } else {
                    break;
                }
            }
    
            // 将当前数字添加到数组中
            numList[listSize++] = c;
            // 标记当前数字已经使用了一次
            totalNum[num]--;
            usedNum[num]++;
        }
    
        // 输出最终的数字序列
        numList[listSize] = '\0';  // 添加字符串结束符
        printf("%s\n", numList);
    
        return 0;
    }
    
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

