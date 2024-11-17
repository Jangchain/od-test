## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

现在有一队小朋友，他们高矮不同，我们以正整数数组表示这一队小朋友的身高，如数组{5,3,1,2,3}。

我们现在希望小朋友排队，以“高”“矮”“高”“矮”顺序排列，每一个“高”位置的小朋友要比相邻的位置高或者相等；每一个“矮”位置的小朋友要比相邻的位置矮或者相等；

要求小朋友们移动的距离和最小，第一个从“高”位开始排，输出最小移动距离即可。

例如，在示范小队{5,3,1,2,3}中，{5, 1, 3, 2, 3}是排序结果。

{5, 2, 3, 1, 3} 虽然也满足“高”“矮”“高”“矮”顺序排列，但小朋友们的移动距离大，所以不是最优结果。

移动距离的定义如下所示：

第二位小朋友移到第三位小朋友后面，移动距离为1，若移动到第四位小朋友后面，移动距离为2；

## 输入描述

排序前的小朋友，以英文空格的正整数：

4 3 5 7 8

注：小朋友<100个

## 输出描述

排序后的小朋友，以英文空格分割的正整数：4 3 7 5 8

备注：4（高）3（矮）7（高）5（矮）8（高）， 输出结果为最小移动距离，只有5和7交换了位置，移动距离都是1。

## 示例1

输入

    
    
    4 1 3 5 2 
    

输出

    
    
     4 1 5 2 3
    

说明

> ## 示例2

输入

    
    
    1 1 1 1 1 
    

输出

    
    
    1 1 1 1 1 
    

说明

> 相邻位置可以相等

## 示例3

输入

    
    
    xxx
    

输出

    
    
    [ ]
    

说明

> 出现非法参数情况， 返回空数组。

## 解题思路

这道题看似简单，但看完题目可能会觉得不止这么简单。因为要保证移动距离最小，这意味着可能存在多种情况需要多次比较。不过，实际并没有那么复杂。

比如在用例1中，乍一看好像有点问题：直接让5和2交换位置，得到的结果是：4 1 3 2 5，这样也符合题意，而且移动距离只有1，似乎更符合要求。

然而，这样想的同学可能忽略了题目中的一句关键提示：“第一个从‘高’位开始排”。这句话的意思是，我们只需要从第一个小朋友开始排列，并在发现不符合要求的排队顺序时，就进行交换。这样大大降低了题目难度。

### 代码解释

> 为了实现将小朋友的身高按照“高矮交替”的顺序排列，代码中使用了以下判断条件：
>  
>  
>     heights[i] != heights[j] && (heights[i] > heights[j]) != (i % 2 == 0)
>  
>
> 这个条件可以分成两个部分来解释：
>
>   1. **`heights[i] != heights[j]`** ：
>
>      *
> 这个条件确保只在两个相邻的小朋友身高不相等的情况下才进行进一步的判断。如果两个小朋友的身高相等，那么无需交换位置，因为它们已经符合“高矮交替”的要求。
>   2. **`(heights[i]> heights[j]) != (i % 2 == 0)`**：
>
>      * 这个条件用于检查当前的排列是否符合“高矮交替”的要求。
>      * **`i % 2 == 0`** ：判断当前索引 `i` 是否为偶数。根据题目的要求，如果 `i` 是偶数位置，那么我们期望
> `heights[i] > heights[j]`，即当前小朋友的身高应该高于下一个小朋友的身高。如果 `i` 是奇数位置，我们期望
> `heights[i] < heights[j]`。
>      * **`(heights[i]> heights[j]) != (i % 2 == 0)`**：这一部分的意思是：
>        * 如果 `i` 是偶数，那么期望 `heights[i] > heights[j]`。如果此时 `heights[i] >
> heights[j]` 为 `true`，与 `i % 2 == 0` 的结果相同，所以条件成立，说明不需要交换。
>        * 如果 `i` 是奇数，那么期望 `heights[i] < heights[j]`。如果此时 `heights[i] >
> heights[j]` 为 `false`，与 `i % 2 == 0` 的结果相反，条件成立，说明不需要交换。
>        * 如果实际情况与期望情况不符（即 heights[i] > heights[j] 和 `i` 的奇偶性不一致），那么
> `(heights[i] > heights[j]) != (i % 2 == 0)` 结果为 `true`，表示当前排列不符合要求，需要交换
> `heights[i]` 和 `heights[j]`。
>

## Java

    
    
    import java.util.*;   
    
    public class Main {
        public static void main(String[] args) {
            Scanner sc = new Scanner(System.in);   
            String s = sc.nextLine();   
    
            // 使用正则表达式检查输入字符串是否只包含数字和空格
            // 如果字符串中包含非法字符（非数字或空格），则输出"[]"并退出程序
            if (!s.matches("[0-9\\s]+")) {
                System.out.println("[]");
                return;
            }
    
            // 将输入字符串按空格分割，并将每个部分转换为整数，存储在数组heights中
            int[] heights = Arrays.stream(s.split(" ")).mapToInt(Integer::parseInt).toArray();
    
            // 初始化两个指针i和j，分别指向相邻的两个小朋友
            int i = 0, j = 1;
    
            // 遍历数组，调整相邻小朋友的身高顺序以满足"高矮交替"的要求
            while (j < heights.length) {
                // 判断当前两个相邻小朋友的身高是否满足要求
                // 条件解释：如果heights[i] > heights[j]且i是偶数，或者heights[i] < heights[j]且i是奇数
                // 则需要交换heights[i]和heights[j]的值，以符合"高矮交替"的规则
                if (heights[i] != heights[j] && (heights[i] > heights[j]) != (i % 2 == 0)) {
                    // 交换heights[i]和heights[j]的值
                    int tmp = heights[i];
                    heights[i] = heights[j];
                    heights[j] = tmp;
                }
    
                // 移动指针，检查下一个相邻的小朋友
                i++;
                j++;
            }
    
            // 使用StringJoiner将排序后的身高数组转换为字符串，并以空格分隔
            StringJoiner sj = new StringJoiner(" ");
            for (int h : heights) {  // 遍历heights数组中的每一个元素
                sj.add(String.valueOf(h));  // 将元素转换为字符串并添加到StringJoiner中
            }
            // 输出最终排序结果
            System.out.println(sj.toString());
        }
    }
    

## Python

    
    
    import re
    
    s = input()
    if not re.match(r"[0-9\s]+", s):
        print("[]")
        exit()
    
    heights = list(map(int, s.split()))
    
    i = 0
    j = 1
    
    while j < len(heights):
        if heights[i] != heights[j] and (heights[i] > heights[j]) != (i % 2 == 0):
            heights[i], heights[j] = heights[j], heights[i]
            
        i += 1
        j += 1
    
    result = " ".join(map(str, heights))
    print(result)
    
    

## JavaScript

    
    
    const readline = require('readline');
    
     
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
     
    rl.on('line', (s) => {
        // 使用正则表达式检查输入字符串是否只包含数字和空格
        // 如果字符串中包含非法字符（非数字或空格），则输出"[]"并退出程序
        if (!/^[0-9\s]+$/.test(s)) {
            console.log("[]");
            rl.close();  // 关闭接口
            return;
        }
    
        // 将输入字符串按空格分割，并将每个部分转换为整数，存储在数组heights中
        let heights = s.split(' ').map(Number);
    
        // 初始化两个指针i和j，分别指向相邻的两个小朋友
        let i = 0, j = 1;
    
        // 遍历数组，调整相邻小朋友的身高顺序以满足"高矮交替"的要求
        while (j < heights.length) {
            // 判断当前两个相邻小朋友的身高是否满足要求
            // 条件解释：如果heights[i] > heights[j]且i是偶数，或者heights[i] < heights[j]且i是奇数
            // 则需要交换heights[i]和heights[j]的值，以符合"高矮交替"的规则
            if (heights[i] !== heights[j] && (heights[i] > heights[j]) !== (i % 2 === 0)) {
                // 交换heights[i]和heights[j]的值
                [heights[i], heights[j]] = [heights[j], heights[i]];
            }
    
            // 移动指针，检查下一个相邻的小朋友
            i++;
            j++;
        }
    
        // 将排序后的身高数组转换为字符串，并以空格分隔
        console.log(heights.join(' '));
    
        
    });
    

## C++

    
    
    #include <iostream>    // 包含输入输出流库
    #include <sstream>     // 包含字符串流库，用于处理字符串
    #include <string>      // 包含字符串库
    #include <vector>      // 包含向量库，用于动态数组
    using namespace std;
    
    int main() {
        string s;
        // 从标准输入读取一行字符串，存储在变量s中
        getline(cin, s);
    
        // 检查输入字符串中是否包含非数字或空格的字符
        // 如果发现非法字符（非数字或空格），则输出"[]"并退出程序
        if (s.find_first_not_of("0123456789 ") != string::npos) {
            cout << "[]" << endl;
            return 0;
        }
    
        // 使用字符串流将字符串s按空格分割，并依次转化为整数存入向量heights中
        istringstream iss(s);
        vector<int> heights;  // 定义一个整型向量用于存储小朋友的身高
        int height;
        while (iss >> height) {  // 从字符串流中读取一个整数，并存入heights向量
            heights.push_back(height);
        }
    
        // 初始化两个索引i和j，分别指向相邻的两个小朋友
        int i = 0, j = 1;
        while (j < heights.size()) {  // 遍历向量，直到处理完所有元素
            // 检查当前两个相邻位置是否满足"高矮高矮"的排列要求
            // 如果heights[i] > heights[j] 且 i 是偶数，或者 heights[i] < heights[j] 且 i 是奇数
            // 则说明当前排列不符合要求，需要交换两个元素的位置
            if (heights[i] != heights[j] && (heights[i] > heights[j]) != (i % 2 == 0)) {
                // 交换 heights[i] 和 heights[j] 的值
                int tmp = heights[i];
                heights[i] = heights[j];
                heights[j] = tmp;
            }
            // 移动索引i和j，继续检查下一个相邻的元素对
            i++;
            j++;
        }
    
        // 将调整后的向量heights中的元素转换为字符串，准备输出
        string result;
        for (int h : heights) {  // 遍历向量中的每一个元素
            result += to_string(h) + " ";  // 将元素转换为字符串并拼接到result中，以空格分隔
        }
        result.pop_back();  // 移除最后一个多余的空格
        cout << result << endl;  // 输出最终的排列结果
    
        return 0;  // 程序结束
    }
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    #include <string.h>
    #include <ctype.h>
    
    // 函数声明
    int is_valid_input(const char* s);
    int* split_and_convert(const char* s, int* size);
    void swap(int* a, int* b);
    
    int main() {
        char s[1024];
        fgets(s, sizeof(s), stdin);  // 读取用户输入
    
        // 检查输入字符串是否只包含数字和空格
        if (!is_valid_input(s)) {
            printf("[]\n");
            return 0;
        }
    
        int size;
        int* heights = split_and_convert(s, &size);  // 将输入字符串分割并转换为整数数组
    
        // 初始化两个指针i和j，分别指向相邻的两个小朋友
        int i = 0, j = 1;
    
        // 遍历数组，调整相邻小朋友的身高顺序以满足"高矮交替"的要求
        while (j < size) {
            // 判断当前两个相邻小朋友的身高是否满足要求
            // 条件解释：如果heights[i] > heights[j]且i是偶数，或者heights[i] < heights[j]且i是奇数
            // 则需要交换heights[i]和heights[j]的值，以符合"高矮交替"的规则
            if (heights[i] != heights[j] && (heights[i] > heights[j]) != (i % 2 == 0)) {
                // 交换heights[i]和heights[j]的值
                swap(&heights[i], &heights[j]);
            }
    
            // 移动指针，检查下一个相邻的小朋友
            i++;
            j++;
        }
    
        // 输出最终排序结果
        for (int k = 0; k < size; k++) {
            if (k > 0) {
                printf(" ");
            }
            printf("%d", heights[k]);
        }
        printf("\n");
    
        free(heights);  // 释放动态分配的内存
        return 0;
    }
    
    // 检查输入字符串是否只包含数字和空格
    int is_valid_input(const char* s) {
        while (*s) {
            if (!isdigit(*s) && !isspace(*s)) {
                return 0;  // 非法字符
            }
            s++;
        }
        return 1;
    }
    
    // 将输入字符串按空格分割并转换为整数数组
    int* split_and_convert(const char* s, int* size) {
        int* heights = malloc(1024 * sizeof(int));  // 假设数组最大长度为1024
        *size = 0;
    
        char* token = strtok(strdup(s), " ");
        while (token != NULL) {
            heights[(*size)++] = atoi(token);
            token = strtok(NULL, " ");
        }
        return heights;
    }
    
    // 交换两个整数的值
    void swap(int* a, int* b) {
        int temp = *a;
        *a = *b;
        *b = temp;
    }
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b0d8ff6d53693bfcf6e1605b507f3ae3.png)

#### 完整用例

##### 用例1

    
    
    4 3 5 7 8
    

##### 用例2

    
    
    4 1 3 5 2
    

##### 用例3

    
    
    1 1 1 1 1
    

##### 用例4

    
    
    xxx
    

##### 用例5

    
    
    5 4 3 2 1
    

##### 用例6

    
    
    1 1 1 2 2
    

##### 用例7

    
    
    10 9 8 7 6 5 4 3 2 1
    

##### 用例8

    
    
    1 3 2 4 6 5 7 9 8 10
    

##### 用例9

    
    
    5 3 1 2 3 4 6 8 7 9
    

##### 用例10

    
    
    5 1 3 2 4 6 8 7 9
    

