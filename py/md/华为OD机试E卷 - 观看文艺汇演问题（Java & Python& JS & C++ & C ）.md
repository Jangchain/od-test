## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

为了庆祝中国共产党成立100周年，某公园将举行多场文艺表演，很多演出都是同时进行，一个人只能同时观看一场演出，且不能迟到早退，由于演出分布在不同的演出场地，所以连续观看的演出最少有15分钟的时间间隔，

小明是一个狂热的文艺迷，想观看尽可能多的演出， 现给出演出时间表，请帮小明计算他最多能观看几场演出。

## 输入描述

第一行为一个数 N，表示演出场数

  * 1 ≤ N ≤ 1000

接下来 N 行，每行有被空格分割的整数，第一个整数 T 表示演出的开始时间，第二个整数 L 表示演出的持续时间

  * T 和 L 的单位为分钟
  * 0 ≤ T ≤ 1440
  * 0 < L ≤ 180

## 输出描述

输出最多能观看的演出场数。

## 示例1

输入

    
    
    2
    720 120
    840 120
    

输出

    
    
    1
    

说明

> ## 示例2

输入

    
    
    2
    0 60
    90 60
    

输出

    
    
    2
    

说明

> ## 解题思路

#### 题目理解：

这道题目要求我们帮小明计算他最多可以观看的文艺演出场数，给定多个演出时间表，每个演出有开始时间和持续时间，但小明有两个限制条件：

  1. 小明不能迟到或早退，意味着他必须完整观看演出。
  2. 连续观看的演出之间至少需要有 15 分钟的间隔，因为演出场地分布在不同地方，前往下一个演出场地需要时间。

这道题本质上是一个「区间调度问题」，需要我们在多个重叠的区间中，尽可能选择最多的不冲突区间。

#### 示例解析：

##### 示例1：

    
    
    输入:
    2
    720 120
    840 120
    

两场演出：

  * 第一场：720 分钟开始 ，持续 120 分钟，到 840 分钟结束 。
  * 第二场：840 分钟开始 ），持续 120 分钟，到 960 分钟结束 。

问题是：小明观看完第一场演出是 2:00 PM，但第二场演出也是 2:00 PM 开始，所以没有足够的时间移动到下一个场地（需要至少 15
分钟的间隔）。因此，小明只能观看 1 场演出。

##### 示例2：

    
    
    输入:
    2
    0 60
    90 60
    

两场演出：

  * 第一场：0 分钟开始（即 0:00 AM），持续 60 分钟，到 60 分钟结束（即 1:00 AM）。
  * 第二场：90 分钟开始（即 1:30 AM），持续 60 分钟，到 150 分钟结束（即 2:30 AM）。

小明可以观看第一场演出结束后（1:00 AM），在 1:30 AM 前往下一个场地（刚好有 30 分钟的间隔）。因此，小明可以观看两场演出。

## Java

    
    
    import java.util.ArrayList;
    import java.util.Comparator;
    import java.util.List;
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            Scanner in = new Scanner(System.in);
            
            // 输入演出场数
            int n = in.nextInt();
    
            // 创建一个列表来存储演出时间表
            List<List<Integer>> schedule = new ArrayList<>();
            
            // 循环读取每个演出的开始时间和持续时间，并将其添加到演出时间表中
            for (int i = 0; i < n; i++) {
                int startTime = in.nextInt();
                int endTime = startTime + in.nextInt();
                schedule.add(List.of(startTime, endTime));
            }
            
            // 将演出时间表按照结束时间进行排序
            schedule.sort(Comparator.comparingInt(a -> a.get(1)));
    
            // 获取第一个演出的结束时间和初始化观看的演出场数
            int firstEndTime = schedule.get(0).get(1);
            int numShows = 1;
    
            // 遍历演出时间表中的每个演出时间段
            for (List<Integer> interval : schedule) {
                int startTime = interval.get(0);
                int endTime = interval.get(1);
    
                // 如果当前演出的开始时间与前一个演出的结束时间间隔大于等于15分钟，则可以观看该演出
                if (startTime - firstEndTime >= 15) {
                    numShows++;
                    firstEndTime = endTime;
                }
            }
    
            // 输出最多能观看的演出场数
            System.out.println(numShows);
        }
    }
    
    
    

## Python

    
    
    import sys
    
    # 输入演出场数
    n = int(input())
    
    # 创建一个列表来存储演出时间表
    schedule = []
    
    # 循环读取每个演出的开始时间和持续时间，并将其添加到演出时间表中
    for i in range(n):
        time = input()
        startTime = int(time.split()[0])
        endTime = startTime + int(time.split()[1])
        schedule.append([startTime, endTime])
    
    # 将演出时间表按照结束时间进行排序
    schedule.sort(key=lambda x: x[1])
    
    # 获取第一个演出的结束时间和初始化观看的演出场数
    firstEndTime = schedule[0][1]
    numShows = 1
    
    # 遍历演出时间表中的每个演出时间段
    for interval in schedule:
        startTime = interval[0]
        endTime = interval[1]
    
        # 如果当前演出的开始时间与前一个演出的结束时间间隔大于等于15分钟，则可以观看该演出
        if startTime - firstEndTime >= 15:
            numShows += 1
            firstEndTime = endTime
    
    # 输出最多能观看的演出场数
    print(numShows)
    
    
    
    

## JavaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    let n;
      let schedule = [];
     
    
    rl.on('line', (input) => {
      if (!n) {
        n = parseInt(input);
      } else {
        let [start, end] = input.split(' ').map(Number);
        schedule.push([start, start + end]);
        if (schedule.length === n) {
              // 将演出时间表按照结束时间进行排序
          schedule.sort((a, b) => a[1] - b[1]);
    
          // 获取第一个演出的结束时间和初始化观看的演出场数
          let firstEndTime = schedule[0][1];
          let numShows = 1;
    
          // 遍历演出时间表中的每个演出时间段
          for (let i = 1; i < n; i++) {
            const [startTime, endTime] = schedule[i];
    
            // 如果当前演出的开始时间与前一个演出的结束时间间隔大于等于15分钟，则可以观看该演出
            if (startTime - firstEndTime >= 15) {
              numShows++;
              firstEndTime = endTime;
            }
          }
        console.log(numShows);
        }
      }
    });
    
    
    
    
    

## C++

    
    
    #include <iostream>
    #include <vector>
    #include <algorithm>
    
    using namespace std;
    
    int main() {
        int n;
        // 读取演出场次的数量
        cin >> n;
    
        // 定义一个二维向量，用于存储每场演出的开始时间和结束时间
        vector<vector<int>> schedule;
    
        // 读取每场演出的开始时间和持续时间，并计算结束时间
        for (int i = 0; i < n; i++) {
            int startTime, duration;
            // 读取每场演出的开始时间和持续时间
            cin >> startTime >> duration;
            // 计算演出的结束时间
            int endTime = startTime + duration;
            // 将开始时间和结束时间存入schedule向量中
            schedule.push_back({startTime, endTime});
        }
    
        // 对所有演出按照结束时间进行排序，确保优先选择结束时间较早的演出
        sort(schedule.begin(), schedule.end(), [](const vector<int>& a, const vector<int>& b) {
            return a[1] < b[1];
        });
    
        // 记录第一场选择的演出的结束时间
        int firstEndTime = schedule[0][1];
        // 记录小明可以观看的演出场次，初始为1（选择了第一场）
        int numShows = 1;
    
        // 遍历每一场演出，判断能否在当前时间后观看
        for (const vector<int>& interval : schedule) {
            int startTime = interval[0];  // 当前演出的开始时间
            int endTime = interval[1];    // 当前演出的结束时间
    
            // 如果当前演出的开始时间与上一个观看的演出结束时间之间有至少15分钟的间隔
            if (startTime - firstEndTime >= 15) {
                numShows++;  // 小明可以观看这场演出，增加计数
                firstEndTime = endTime;  // 更新为当前演出的结束时间，作为下次判断的依据
            }
        }
    
        // 输出小明最多可以观看的演出场次
        cout << numShows << endl;
    
        return 0;
    }
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    
    #define MAX_N 1000
    
    // 定义一个结构体，用于存储每场演出的开始时间和结束时间
    typedef struct {
        int startTime;  // 演出的开始时间
        int endTime;    // 演出的结束时间
    } Show;
    
    // 比较函数，用于qsort对演出按结束时间进行排序
    int compare(const void *a, const void *b) {
        Show *showA = (Show *)a;
        Show *showB = (Show *)b;
        return showA->endTime - showB->endTime;  // 按结束时间升序排列
    }
    
    int main() {
        int n;
        // 读取演出场次的数量
        scanf("%d", &n);
    
        // 定义一个数组，用于存储每场演出的开始时间和结束时间
        Show schedule[MAX_N];
    
        // 读取每场演出的开始时间和持续时间，并计算结束时间
        for (int i = 0; i < n; i++) {
            int startTime, duration;
            // 读取每场演出的开始时间和持续时间
            scanf("%d %d", &startTime, &duration);
            // 计算演出的结束时间，并存储在结构体数组中
            schedule[i].startTime = startTime;
            schedule[i].endTime = startTime + duration;
        }
    
        // 使用qsort函数对所有演出按照结束时间进行排序
        qsort(schedule, n, sizeof(Show), compare);
    
        // 记录第一场选择的演出的结束时间
        int firstEndTime = schedule[0].endTime;
        // 记录小明可以观看的演出场次，初始为1（选择了第一场）
        int numShows = 1;
    
        // 遍历剩下的每一场演出，判断能否在当前时间后观看
        for (int i = 1; i < n; i++) {
            int startTime = schedule[i].startTime;  // 当前演出的开始时间
            int endTime = schedule[i].endTime;      // 当前演出的结束时间
    
            // 如果当前演出的开始时间与上一个观看的演出结束时间之间有至少15分钟的间隔
            if (startTime - firstEndTime >= 15) {
                numShows++;  // 小明可以观看这场演出，增加计数
                firstEndTime = endTime;  // 更新为当前演出的结束时间，作为下次判断的依据
            }
        }
    
        // 输出小明最多可以观看的演出场次
        printf("%d\n", numShows);
    
        return 0;
    }
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

#### 完整用例

##### 用例1

2  
720 120  
840 120

##### 用例2

2  
0 60  
90 60

##### 用例3

3  
600 60  
660 60  
720 60

##### 用例4

4  
600 60  
660 60  
720 60  
780 60

##### 用例5

5  
600 60  
660 60  
720 60  
780 60  
840 60

##### 用例6

10  
0 60  
75 60  
150 60  
225 60  
300 60  
375 60  
450 60  
525 60  
600 60  
675 60

##### 用例7

10  
0 60  
75 60  
150 60  
225 60  
300 60  
375 60  
450 60  
525 60  
600 60  
675 30

##### 用例8

10  
0 60  
75 60  
150 60  
225 60  
300 60  
375 60  
450 60  
525 60  
600 60  
660 60

##### 用例9

1  
720 120

##### 用例10

2  
0 60  
90 60

