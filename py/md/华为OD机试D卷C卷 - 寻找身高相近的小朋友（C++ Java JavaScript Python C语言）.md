## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

小明今年升学到了小学1年级来到新班级后，发现其他小朋友身高参差不齐，然后就想基于各小朋友和自己的身高差，对他们进行排序，请帮他实现排序。

## 输入描述

第一行为正整数 h和n，0<h<200 为小明的身高，0<n<50 为新班级其他小朋友个数。

第二行为n个正整数，h1 ~ hn分别是其他小朋友的身高，取值范围0<hi<200，且n个正整数各不相同。

## 输出描述

输出排序结果，各正整数以**空格** 分割，

和小明身高差绝对值最小的小朋友排在前面，

和小明身高差绝对值最大的小朋友排在后面，

如果两个小朋友和小明身高差一样，则个子较小的小朋友排在前面。

## 用例

输入

    
    
    100 10
    95 96 97 98 99 101 102 103 104 105
    

输出

    
    
    99 101 98 102 97 103 96 104 95 105
    

说明

> 小明身高100，班级学生10个，身高分别为95 96 97 98 99 101 102 103 104 105，按身高差排序后结果为：99 101 98
> 102 97 103 96 104 95 105。

## C++

    
    
    #include <iostream>
    #include <vector>
    #include <algorithm>
    using namespace std;
    
    int main() {
        int h, n; // 定义变量h表示小明的身高，n表示新班级其他小朋友的个数
        vector<int> heights; // 创建一个int类型的vector，用于存储其他小朋友的身高
        cin >> h >> n; // 从标准输入读取小明的身高和小朋友的个数
        for (int i = 0; i < n; i++) {
            int height;
            cin >> height; // 循环读取每个小朋友的身高
            heights.push_back(height); // 将读取的身高添加到heights向量中
        }
        // 使用sort函数对heights向量进行排序
        // 传入一个自定义的比较函数，该函数使用了lambda表达式
        sort(heights.begin(), heights.end(), [h](int a, int b) {
            int diff_a = abs(a - h); // 计算a与小明身高的差的绝对值
            int diff_b = abs(b - h); // 计算b与小明身高的差的绝对值
            if (diff_a == diff_b) {
                return a < b; // 如果差的绝对值相同，则身高较小的排在前面
            }
            return diff_a < diff_b; // 否则，差的绝对值较小的排在前面
        });
        for (int i = 0; i < n; i++) {
            cout << heights[i] << " "; // 输出排序后的小朋友身高
        }
        cout << endl; // 输出换行符
        return 0; // 程序正常退出
    }
    

## java

    
    
    import java.util.Scanner;
    import java.util.ArrayList;
    import java.util.Collections;
    import java.util.Comparator;
    
    public class Main {
        public static void main(String[] args) {
            // 创建Scanner对象用于读取输入
            Scanner sc = new Scanner(System.in);
            // 读取小明的身高h和新班级其他小朋友个数n
            int h = sc.nextInt();
            int n = sc.nextInt();
            // 创建一个ArrayList用于存储其他小朋友的身高
            ArrayList<Integer> heights = new ArrayList<Integer>();
            // 读取其他小朋友的身高并添加到ArrayList中
            for (int i = 0; i < n; i++) {
                int height = sc.nextInt();
                heights.add(height);
            }
            // 对ArrayList中的身高进行排序
            Collections.sort(heights, new Comparator<Integer>() {
                // 自定义比较器，根据与小明身高差的绝对值进行排序
                public int compare(Integer a, Integer b) {
                    int diff_a = Math.abs(a - h);
                    int diff_b = Math.abs(b - h);
                    // 如果两个小朋友和小明身高差一样，则个子较小的小朋友排在前面
                    if (diff_a == diff_b) {
                        return a - b;
                    }
                    // 否则，根据与小明身高差的绝对值进行排序
                    return diff_a - diff_b;
                }
            });
            // 输出排序后的结果
            for (int i = 0; i < n; i++) {
                System.out.print(heights.get(i) + " ");
            }
            System.out.println();
        }
    }
    

## javaScript

    
    
    const readline = require('readline');
    
    // 创建readline接口，用于读取输入
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    let h, n;
    let heights = [];
    
    // 监听输入事件
    rl.on('line', (input) => {
      // 如果h和n未赋值，表示当前输入为第一行，包含小明的身高和新班级其他小朋友的个数
      if (!h && !n) {
        const inputArr = input.split(' ');
        h = parseInt(inputArr[0]);
        n = parseInt(inputArr[1]);
      } else {
        // 否则，表示当前输入为第二行，包含其他小朋友的身高
        const heightArr = input.split(' ');
        // 将输入的身高字符串转换为整数并存储在heights数组中
        heights = heightArr.map(height => parseInt(height));
        // 对heights数组进行排序
        heights.sort((a, b) => {
          const diffA = Math.abs(a - h);
          const diffB = Math.abs(b - h);
          // 如果两个小朋友和小明身高差一样，则个子较小的小朋友排在前面
          if (diffA === diffB) {
            return a - b;
          }
          // 否则，根据与小明身高差的绝对值进行排序
          return diffA - diffB;
        });
        // 输出排序后的结果
        console.log(heights.join(' '));
      }
    });
    

## python

    
    
    # 读取输入的第一行，获取小明的身高h和新班级其他小朋友的个数n
    h, n = map(int, input().split())
    # 读取输入的第二行，获取其他小朋友的身高，并将其存储在列表heights中
    heights = list(map(int,input().split()))
    
    # 对heights列表进行排序
    # 使用lambda函数作为排序的关键字，首先根据与小明身高差的绝对值进行排序，如果身高差相同，则根据身高进行排序
    heights.sort(key=lambda x: (abs(x-h), x))
    
    # 输出排序后的结果
    for height in heights:
        print(height, end=" ")
    print()
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    
    // 自定义比较函数，用于排序
    int compare(const void *a, const void *b, void *h_ptr) {
        int h = *((int *)h_ptr); // 获取小明的身高
        int height_a = *((int *)a); // 获取第一个小朋友的身高
        int height_b = *((int *)b); // 获取第二个小朋友的身高
    
        // 计算与小明身高的差的绝对值
        int diff_a = abs(height_a - h);
        int diff_b = abs(height_b - h);
    
        // 如果差的绝对值相同，则身高较小的排在前面
        if (diff_a == diff_b) {
            return height_a - height_b;
        }
        // 否则，差的绝对值较小的排在前面
        return diff_a - diff_b;
    }
    
    int main() {
        int h, n;
        scanf("%d %d", &h, &n); // 从标准输入读取小明的身高和小朋友的个数
    
        int heights[n];
        for (int i = 0; i < n; i++) {
            scanf("%d", &heights[i]); // 循环读取每个小朋友的身高
        }
    
        // 使用qsort函数对heights数组进行排序
        // 传入自定义的比较函数和小明的身高作为额外参数
        qsort_r(heights, n, sizeof(int), compare, &h);
    
        for (int i = 0; i < n; i++) {
            printf("%d ", heights[i]); // 输出排序后的小朋友身高
        }
        printf("\n"); // 输出换行符
    
        return 0; // 程序正常退出
    }
    

## 完整用例

### 用例1

    
    
    120 5
    110 130 115 125 105
    

### 用例2

    
    
    150 8
    140 160 130 170 120 180 110 190
    

### 用例3

    
    
    100 3
    99 101 98
    

### 用例4

    
    
    145 6
    150 140 135 155 130 160
    

### 用例5

    
    
    160 7
    158 162 156 164 154 166 152
    

### 用例6

    
    
    170 4
    168 172 166 174
    

### 用例7

    
    
    180 5
    181 179 182 178 183
    

### 用例8

    
    
    110 6
    100 105 115 120 95 125
    

### 用例9

    
    
    130 10
    129 131 128 132 127 133 126 134 125 135
    

### 用例10

    
    
    140 9
    138 142 136 144 134 146 132 148 130
    

#### 文章目录

  * 最新华为OD机试
  * 题目描述
  * 输入描述
  * 输出描述
  * 用例
  * C++
  * java
  * javaScript
  * python
  * C语言
  * 完整用例
  *     * 用例1
    * 用例2
    * 用例3
    * 用例4
    * 用例5
    * 用例6
    * 用例7
    * 用例8
    * 用例9
    * 用例10

![doutub_gif](https://i-blog.csdnimg.cn/blog_migrate/a15019403bcaf0f9b0921a18519cd803.png)

