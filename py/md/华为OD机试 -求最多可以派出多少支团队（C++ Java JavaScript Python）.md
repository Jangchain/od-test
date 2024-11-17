## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

用数组代表每个人的能力 一个比赛活动要求参赛团队的最低能力值为N 每个团队可以由一人或者两人组成 且一个人只能参加一个团队
计算出最多可以派出多少只符合要求的队伍。

## 输入描述

第一行代表总人数，范围1-500000  
第二行数组代表每个人的能力  
\- 数组大小，范围1-500000  
\- 元素取值，范围1-500000  
第三行数值为团队要求的最低能力值，范围1-500000

## 输出描述

最多可以派出的团队数量

## 用例1

输入

    
    
    5
    3 1 5 7 9
    8
    

输出

    
    
    3
    

说明

> 3、5组成一队 1、7一队 9自己一队 输出3

## 用例2

输入

    
    
    7
    3 1 5 7 9 2 6
    8
    

输出

    
    
    4
    

说明

> 3、5组成一队，1、7一队，9自己一队，2、6一队，输出4

## 用例3

输入

    
    
    3
    1 1 9
    8
    

输出

    
    
    1
    

说明

> 9自己一队，输出1

## C++

    
    
    #include <iostream>
    #include <vector>
    #include <algorithm>
    using namespace std;
    
    int main() {
        int n; // 总人数
        cin >> n;
        
        vector<int> vec(n); // 每个人的能力
        for (int i = 0; i < n; i++) {
            cin >> vec[i];
        }
        
        sort(vec.begin(), vec.end()); // 对能力进行排序
        
        int m; // 团队要求的最低能力值
        cin >> m;
        
        int left = 0; // 左指针
        int right = n - 1; // 右指针
        int res = 0; // 最多可以派出的团队数量
        
        while (left < right) {
            if (vec[right] >= m) { // 如果右指针指向的人的能力大于等于团队要求的最低能力值
                res += 1; // 可以派出一个团队
                right -= 1; // 右指针向左移动
            } else if (vec[right] + vec[left] >= m) { // 如果右指针和左指针指向的两个人的能力之和大于等于团队要求的最低能力值
                res += 1; // 可以派出一个团队
                right -= 1; // 右指针向左移动
                left += 1; // 左指针向右移动
            } else { // 如果右指针和左指针指向的两个人的能力之和小于团队要求的最低能力值
                left += 1; // 左指针向右移动
            }
        }
        
        if (left == right && vec[left] >= m) { // 如果左指针和右指针指向同一个人，并且该人的能力大于等于团队要求的最低能力值
            res += 1; // 可以派出一个团队
        }
        
        cout << res << endl; // 输出最多可以派出的团队数量
        
        return 0;
    }
    

## java

    
    
    import java.util.Arrays;
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            int n = scanner.nextInt(); // 总人数
            int[] vec = new int[n]; // 每个人的能力
            for (int i = 0; i < n; i++) {
                vec[i] = scanner.nextInt();
            }
            Arrays.sort(vec); // 对能力进行排序
            int m = scanner.nextInt(); // 团队要求的最低能力值
            int left = 0; // 左指针
            int right = n - 1; // 右指针
            int res = 0; // 最多可以派出的团队数量
    
            while (left < right) {
                if (vec[right] >= m) { // 如果右指针指向的人的能力大于等于团队要求的最低能力值
                    res += 1; // 可以派出一个团队
                    right -= 1; // 右指针向左移动
                } else if (vec[right] + vec[left] >= m) { // 如果右指针和左指针指向的两个人的能力之和大于等于团队要求的最低能力值
                    res += 1; // 可以派出一个团队
                    right -= 1; // 右指针向左移动
                    left += 1; // 左指针向右移动
                } else { // 如果右指针和左指针指向的两个人的能力之和小于团队要求的最低能力值
                    left += 1; // 左指针向右移动
                }
            }
    
            if (left == right && vec[left] >= m) { // 如果左指针和右指针指向同一个人，并且该人的能力大于等于团队要求的最低能力值
                res += 1; // 可以派出一个团队
            }
    
            System.out.println(res); // 输出最多可以派出的团队数量
        }
    }
    

## javaScript

    
    
     
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    let totalPeople;
    let abilities;
    let minAbility;
    
    rl.on('line', (line) => {
      if (!totalPeople) {
        totalPeople = parseInt(line);
      } else if (!abilities) {
        abilities = line.split(' ').map(Number);
      } else if (!minAbility) {
        minAbility = parseInt(line);
    
        abilities.sort((a,b)=>a -b );
    
        let left = 0;
        let right = totalPeople - 1;
        let res = 0;
    
        while (left < right) {
          if (abilities[right] >= minAbility) {
            res += 1;
            right -= 1;
          } else if (abilities[right] + abilities[left] >= minAbility) {
            res += 1;
            right -= 1;
            left += 1;
          } else {
            left += 1;
          }
        }
    
        if (left === right && abilities[left] >= minAbility) {
          res += 1;
        }
    
        console.log(res);
      }
    });
    

## python

    
    
    n = int(input()) # 总人数
    vec = list(map(int, input().split())) # 每个人的能力
    vec.sort() # 对能力进行排序
    m = int(input()) # 团队要求的最低能力值
    left = 0 # 左指针
    right = n - 1 # 右指针
    res = 0 # 最多可以派出的团队数量
    
    while left < right:
        if vec[right] >= m: # 如果右指针指向的人的能力大于等于团队要求的最低能力值
            res += 1 # 可以派出一个团队
            right -= 1 # 右指针向左移动
        elif vec[right] + vec[left] >= m: # 如果右指针和左指针指向的两个人的能力之和大于等于团队要求的最低能力值
            res += 1 # 可以派出一个团队
            right -= 1 # 右指针向左移动
            left += 1 # 左指针向右移动
        else: # 如果右指针和左指针指向的两个人的能力之和小于团队要求的最低能力值
            left += 1 # 左指针向右移动
    
    if left == right and vec[left] >= m: # 如果左指针和右指针指向同一个人，并且该人的能力大于等于团队要求的最低能力值
        res += 1 # 可以派出一个团队
    
    print(res) # 输出最多可以派出的团队数量
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    
    // 比较函数，用于qsort排序
    int cmp(const void *a, const void *b) {
        return (*(int *)a - *(int *)b);
    }
    
    int main() {
        int n; // 总人数
        scanf("%d", &n);
        
        int *vec = (int *)malloc(n * sizeof(int)); // 动态分配数组存储每个人的能力
        for (int i = 0; i < n; i++) {
            scanf("%d", &vec[i]);
        }
        
        qsort(vec, n, sizeof(int), cmp); // 使用qsort对能力进行排序
        
        int m; // 团队要求的最低能力值
        scanf("%d", &m);
        
        int left = 0; // 左指针
        int right = n - 1; // 右指针
        int res = 0; // 最多可以派出的团队数量
        
        while (left < right) {
            if (vec[right] >= m) { // 如果右指针指向的人的能力大于等于团队要求的最低能力值
                res++; // 可以派出一个团队
                right--; // 右指针向左移动
            } else if (vec[right] + vec[left] >= m) { // 如果右指针和左指针指向的两个人的能力之和大于等于团队要求的最低能力值
                res++; // 可以派出一个团队
                right--; // 右指针向左移动
                left++; // 左指针向右移动
            } else { // 如果右指针和左指针指向的两个人的能力之和小于团队要求的最低能力值
                left++; // 左指针向右移动
            }
        }
        
        if (left == right && vec[left] >= m) { // 如果左指针和右指针指向同一个人，并且该人的能力大于等于团队要求的最低能力值
            res++; // 可以派出一个团队
        }
        
        printf("%d\n", res); // 输出最多可以派出的团队数量
        
        free(vec); // 释放动态分配的内存
        return 0;
    }
    

## 完整用例

### 用例1

    
    
    5
    3 1 5 7 9
    8
    

### 用例2

    
    
    7
    3 1 5 7 9 2 6
    8
    

### 用例3

    
    
    3
    1 1 9
    8
    

### 用例4

    
    
    1
    10
    10
    

### 用例5

    
    
    4
    1 2 3 4
    5
    

### 用例6

    
    
    10
    1 2 3 4 5 6 7 8 9 10
    5
    

### 用例7

    
    
    8
    1 2 3 4 5 6 7 8
    10
    

### 用例8

    
    
    12
    1 2 3 4 5 6 7 8 9 10 11 12
    6
    

### 用例9

    
    
    6
    10 10 10 10 10 10
    5
    

### 用例10

    
    
    15
    1 2 3 4 5 6 7 8 9 10 11 12 13 14 15
    7
    

#### 文章目录

  * 最新华为OD机试
  * 题目描述
  * 输入描述
  * 输出描述
  * 用例1
  * 用例2
  * 用例3
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

![fengmian](https://i-blog.csdnimg.cn/blog_migrate/8149a5bdd0b9a422f85ed5f97e6f3fce.png)

