## 题目描述

疫情期间需要大家保证一定的社交距离，公司组织开交流会议。座位一排共 N 个座位，编号分别为[0,N-1],

要求员工一个接着一个进入会议室，并且可以在任何时候离开会议室。

满足：

  * 每当一个员工进入时，需要坐到最大社交距离（最大化自己和其他人的距离的座位）；
  * 如果有多个这样的座位，则坐到索引最小的那个座位。

## 输入描述

会议室座位总数 seatNum

  * 1 ≤ seatNum ≤ 500

员工的进出顺序 seatOrLeave 数组

  * 元素值为 1，表示进场

  * 元素值为负数，表示出场（特殊：位置 0 的员工不会离开）

例如 -4 表示坐在位置 4 的员工离开（保证有员工坐在该座位上）

## 输出描述

最后进来员工，他会坐在第几个位置，如果位置已满，则输出-1。

## 用例

输入

    
    
    10
    [1, 1, 1, 1, -4, 1]
    

输出

    
    
    5
    

说明

> seat -> 0,空在任何位置都行，但是要给他安排索引最小的位置，也就是座位 0  
>  seat -> 9,要和旁边的人距离最远，也就是座位 9  
>  seat -> 4,要和旁边的人距离最远，应该坐到中间，也就是座位 4  
>  seat -> 2,员工最后坐在 2 号座位上  
>  leave[4], 4 号座位的员工离开  
>  seat -> 5,员工最后坐在 5 号座位上

## 解题思路

动态维护一个已占用座位的列表，并在每次有员工进入时计算最佳座位，以及在有员工离开时更新座位状态 。

  1. **初始化座位状态** ：使用一个动态数组`seat`来记录当前已被占用的座位编号。

  2. **处理每个操作** ：遍历给定的操作序列`seatOrLeave`，对于每个操作：

     * 如果操作为正数（即`1`），表示有员工进入： 
       1. **会议室为空** ：如果当前`seat`数组为空，说明会议室内没有人，新员工直接坐在`0`号座位。
       2. **会议室不为空** ：遍历`seat`数组，计算每两个相邻已占座位之间的距离，以及第一个座位到`0`号座位的距离和最后一个座位到`seatNum-1`的距离。找到这些距离中的最大值对应的座位，作为新员工的座位。
     * 如果操作为负数，表示有员工离开，根据操作值的绝对值找到对应的座位编号，并从`seat`数组中移除该座位编号。
  3. **更新座位状态** ：对于进入的员工，将其座位编号添加到`seat`数组中，并对`seat`数组进行排序，以便下次操作时能快速找到最佳座位。

  4. **输出结果** ：在处理完所有操作后，输出最后一个进入的员工的座位编号。如果会议室已满，则输出`-1`。

## C++

    
    
    #include <iostream>
    #include <vector>
    #include <algorithm>
    #include <sstream>
    
    using namespace std;
    
    // 寻找最佳座位的函数
    int findBestSeat(const vector<int>& occupiedSeats, int seatNum) {
        // 如果还没有人坐，第一个人坐在0号座位
        if (occupiedSeats.empty()) return 0;
        // 如果只有一个人坐，那么下一个人坐在最后一个座位
        if (occupiedSeats.size() == 1) return seatNum - 1;
    
        int maxDistance = 0, bestSeat = -1;
        // 检查是否可以在第一个座位坐下（即第一个座位之前的空位）
        if (occupiedSeats.front() > 0) {
            maxDistance = occupiedSeats.front();
            bestSeat = 0;
        }
        // 检查是否可以在最后一个座位坐下（即最后一个座位之后的空位）
        if (seatNum - 1 - occupiedSeats.back() > maxDistance) {
            maxDistance = seatNum - 1 - occupiedSeats.back();
            bestSeat = seatNum - 1;
        }
        // 检查中间的最大间隔，寻找最佳座位
        for (int i = 1; i < occupiedSeats.size(); ++i) {
            int distance = (occupiedSeats[i] - occupiedSeats[i - 1]) / 2;
            if (distance > maxDistance) {
                maxDistance = distance;
                bestSeat = occupiedSeats[i - 1] + distance;
            }
        }
        // 返回最佳座位编号
        return bestSeat;
    }
    
    int main() {
        int seatNum; // 会议室座位总数
        cin >> seatNum;
    
        string input; // 存放员工进出顺序的字符串
        cin >> ws; // 忽略前面的空白字符
        getline(cin, input); // 读取整行作为字符串
    
        // 处理输入字符串，将其转换为int数组
        stringstream ss(input.substr(1, input.size() - 2)); // 去掉字符串的首尾括号
        vector<int> seatOrLeave;
        int num;
        while (ss >> num) {
            seatOrLeave.push_back(num);
            if (ss.peek() == ',') ss.ignore();
        }
    
        vector<int> occupiedSeats; // 存储已占用座位的数组
        int lastSeat = -1; // 存储最后一个坐下的员工的座位号
    
        // 遍历员工的进出操作
        for (int action : seatOrLeave) {
            if (action == 1) { // 进场操作
                int bestSeat = findBestSeat(occupiedSeats, seatNum);
                if (bestSeat != -1) { // 如果找到了最佳座位
                    occupiedSeats.push_back(bestSeat); // 更新已占用座位列表
                    sort(occupiedSeats.begin(), occupiedSeats.end()); // 保持座位列表排序
                    lastSeat = bestSeat; // 更新最后一个坐下的座位号
                }
            } else if (action < 0) { // 出场操作
                action = -action; // 转为正数，表示座位号
                auto it = find(occupiedSeats.begin(), occupiedSeats.end(), action);
                if (it != occupiedSeats.end()) occupiedSeats.erase(it); // 从已占用座位中移除
            }
        }
    
        cout << lastSeat << endl; // 输出最后一个进来员工的座位号
    
        return 0;
    }
    

## JavaScript

    
    
    const readline = require('readline');
    // 创建 readline 接口实例
    const rl = readline.createInterface({
        input: process.stdin,  // 标准输入流
        output: process.stdout  // 标准输出流
    });
    
    // 监听 'line' 事件，每次输入一行触发
    rl.on('line', (seatNum) => {
        // 再次监听 'line' 事件，获取座位占用和离开的操作序列
        rl.on('line', (str) => {
            // 解析输入的字符串，去掉首尾的括号，分割后转换为数字数组
            const seatOrLeave = str.slice(1, -1).split(',').map(Number);
    
            let seat = [];  // 存储已占用的座位
            let ans = -1;  // 下一个人的最佳座位号
    
            // 遍历操作序列
            for (let sol of seatOrLeave) {
                if (sol !== 1) {
                    // 如果操作不是1，表示有员工离开，移除对应座位号
                    seat = seat.filter(s => s !== -sol);
                } else {
                    // 如果操作是1，表示有员工进入，需要找到最佳座位
                    if (seat.length === 0) {
                        // 如果会议室为空，新员工坐在0号座位
                        ans = 0;
                    } else {
                        // 如果会议室不为空，找到最大的空闲区间
                        let max_distance = seat[0];  // 初始化最大距离为第一个座位号
                        ans = 0;  // 初始化最佳座位号为0
                        for (let i = 0; i < seat.length; i++) {
                            // 计算当前座位与下一个座位之间的距离
                            let distance = i === seat.length - 1 ? seatNum - 1 - seat[i] : Math.floor((seat[i + 1] - seat[i]) / 2);
                            if (distance > max_distance) {
                                // 如果当前距离大于最大距离，则更新最大距离和最佳座位号
                                max_distance = distance;
                                ans = i === seat.length - 1 ? seatNum - 1 : seat[i] + distance;
                            }
                        }
                    }
                    // 如果会议室已满，设置最佳座位号为-1
                    if (seat.length === seatNum) {
                        ans = -1;
                    } else {
                        // 将新员工的座位号加入到座位列表，并按升序排序
                        seat.push(ans);
                        seat.sort((a, b) => a - b);
                    }
                }
            }
    
            // 输出最后一个操作后的最佳座位号
            console.log(ans);
            // 关闭 readline 接口实例
            rl.close();
        });
    });
    

## Java

    
    
    import java.util.ArrayList;
    import java.util.Collections;
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
    
            // 读取输入
            int seatNum = scanner.nextInt();  // 读取座位总数
            scanner.nextLine();  // 读取换行符
            String str = scanner.nextLine();  // 读取座位占用和离开的操作序列
            // 去除字符串首尾的括号并分割成数组
            String[] parts = str.substring(1, str.length() - 1).split(",");
            ArrayList<Integer> seatOrLeave = new ArrayList<>();
            for (String part : parts) {
                seatOrLeave.add(Integer.parseInt(part.trim()));  // 转换为整数并添加到列表
            }
    
            // 初始化
            ArrayList<Integer> seat = new ArrayList<>();  // 存储已占用的座位
            int ans = -1;  // 下一个人的最佳座位号
    
            // 遍历座位占用和离开的操作序列
            for (int sol : seatOrLeave) {
                if (sol != 1) {
                    // 如果sol为负数，表示有员工离开，移除对应座位号
                    seat.remove(Integer.valueOf(-sol));
                } else {
                    // 如果sol为1，表示有员工进入，需要找到最佳座位
                    if (seat.isEmpty()) {
                        // 如果会议室为空，新员工坐在0号座位
                        ans = 0;
                    } else {
                        // 如果会议室不为空，找到最大的空闲区间
                        int maxDistance = seat.get(0);  // 初始化最大距离为第一个座位号
                        ans = 0;  // 初始化最佳座位号为0
                        for (int i = 0; i < seat.size(); i++) {
                            int distance;
                            if (i == seat.size() - 1) {
                                // 检查最后一个座位到座位总数之间的距离
                                distance = seatNum - 1 - seat.get(i);
                            } else {
                                // 检查相邻座位之间的距离
                                distance = (seat.get(i + 1) - seat.get(i)) / 2;
                            }
                            if (distance > maxDistance) {
                                // 更新最大距离和最佳座位号
                                maxDistance = distance;
                                ans = (i == seat.size() - 1) ? seatNum - 1 : seat.get(i) + distance;
                            }
                        }
                    }
    
                    // 如果会议室已满，设置最佳座位号为-1
                    if (seat.size() == seatNum) {
                        ans = -1;
                    } else {
                        // 将新员工的座位号加入到座位列表，并排序
                        seat.add(ans);
                        Collections.sort(seat);
                    }
                }
            }
    
            // 打印最后一个操作后的最佳座位号
            System.out.println(ans);
            scanner.close();
        }
    }
    

## Python

    
    
    import math
    
    # 读取输入
    seatNum = int(input())  # 座位总数
    str = input()  # 座位占用和离开的操作序列
    seatOrLeave = list(map(int, str[1:-1].split(",")))  # 将字符串转换为整数数组
    
    # 初始化
    seat = []  # 存储已占用的座位
    ans = -1  # 下一个人的最佳座位号
    
    for sol in seatOrLeave:  # 遍历座位占用和离开的操作序列
        if sol != 1:
            # 如果sol为负数，表示有员工离开，移除对应座位号
            seat.remove(-sol)
        else:
            # 如果sol为1，表示有员工进入，需要找到最佳座位
            if not seat:
                # 如果会议室为空，新员工坐在0号座位
                ans = 0
            else:
                # 如果会议室不为空，找到最大的空闲区间
                max_distance = seat[0]  # 初始化最大距离为第一个座位号
                ans = 0  # 初始化最佳座位号为0
                for i in range(len(seat)):
                    if i == len(seat) - 1:
                        # 检查最后一个座位到座位总数之间的距离
                        distance = seatNum - 1 - seat[i]
                    else:
                        # 检查相邻座位之间的距离
                        distance = (seat[i + 1] - seat[i]) // 2
                    if distance > max_distance:
                        # 更新最大距离和最佳座位号
                        max_distance = distance
                        if i == len(seat) - 1:
                            ans = seatNum - 1
                        else:
                            ans = seat[i] + distance
    
            # 如果会议室已满，输出-1
            if len(seat) == seatNum:
                ans = -1
            else:
                # 将新员工的座位号加入到座位列表，并排序
                seat.append(ans)
                seat.sort()
    
    print(ans)
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    
    #define MAX_SIZE 500 // 定义最大座位数
    
    // 比较函数，用于qsort排序
    int cmp(const void *a, const void *b) {
        return *((int *) a) - *((int *) b);
    }
    
    int main() {
        int seatNum; // 座位总数
        scanf("%d", &seatNum); // 读取座位总数
    
        getchar(); // 读取换行符
    
        int seatOrLeave[MAX_SIZE] = {0}; // 存储进出座位的数组
        int seatOrLeave_size = 0; // 进出座位数组的当前大小
    
        // 读取进出座位的序列，支持两种格式：[数字,] 或 数字,
        while (scanf("[%d", &seatOrLeave[seatOrLeave_size]) || scanf("%d", &seatOrLeave[seatOrLeave_size])) {
            seatOrLeave_size++; // 数组大小增加
            if (getchar() != ',') break; // 如果不是逗号，则停止读取
        }
    
        int seat[MAX_SIZE]; // 存储已有人的座位号
        int seat_size = 0; // 已有人的座位号数组的当前大小
        int lastSeatIdx = -1; // 最后一个坐下的座位号
    
        // 遍历所有进出记录
        for (int i = 0; i < seatOrLeave_size; i++) {
            int info = seatOrLeave[i]; // 当前记录
    
            // 如果是负数，表示有人离开
            if (info < 0) {
                int leaveIdx = -info; // 离开的座位号
                for (int j = 0; j < seat_size; j++) {
                    if (seat[j] == leaveIdx) {
                        // 移除离开的座位号
                        for (int k = j; k < seat_size - 1; k++) {
                            seat[k] = seat[k + 1];
                        }
                        seat_size--; // 座位数组大小减小
                        break;
                    }
                }
            } else {
                // 如果是第一个人，则坐在第一个位置
                if (seat_size == 0) {
                    lastSeatIdx = 0;
                    seat[seat_size++] = lastSeatIdx;
                } else {
                    int maxDist = -1; // 最大距离
                    int bestSeat = -1; // 最佳座位
    
                    // 检查第一个座位是否空闲
                    if (seat[0] > 0) {
                        maxDist = seat[0];
                        bestSeat = 0;
                    }
    
                    // 遍历已坐座位，寻找最佳座位
                    for (int j = 1; j < seat_size; j++) {
                        int dist = (seat[j] - seat[j - 1]) / 2; // 计算距离
                        if (dist > maxDist) {
                            maxDist = dist;
                            bestSeat = seat[j - 1] + dist;
                        }
                    }
    
                    // 检查最后一个座位是否空闲
                    if (seatNum - 1 - seat[seat_size - 1] > maxDist) {
                        bestSeat = seatNum - 1;
                    }
    
                    // 如果找到了最佳座位，将其加入数组
                    if (bestSeat >= 0 && seat_size < seatNum) {
                        seat[seat_size++] = bestSeat;
                        qsort(seat, seat_size, sizeof(int), cmp); // 排序座位数组
                    }
    
                    lastSeatIdx = bestSeat; // 更新最后一个坐下的座位号
                }
            }
        }
    
        printf("%d\n", lastSeatIdx); // 打印最后一个坐下的座位号
    
        return 0;
    }
    

## 完整用例

### 用例1

    
    
    1
    [1]
    

### 用例2

    
    
    5
    [1, 1, 1, -4, 1]
    

### 用例3

    
    
    3
    [1, 1, 1]
    

### 用例4

    
    
    6
    [1, 1, 1, 1]
    

### 用例5

    
    
    8
    [1, 1, 1, 1]
    

### 用例6

    
    
    5
    [1, 1, 1, 1, 1]
    

### 用例7

    
    
    7
    [1, 1, 1, 1, 1]
    

### 用例8

    
    
    5
    [1, 1, 1, 1, -1, -2, -4, 1, -4, 1, 1]
    

### 用例9

    
    
    2
    [1, 1, -1, 1]
    

### 用例10

    
    
    6
    [1, 1]
    

![fengmian](https://i-blog.csdnimg.cn/blog_migrate/2092dcc88ff6fd7d79a0baf5664f854b.png)

