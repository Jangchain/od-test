## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

张三要去外地出差，需要做核酸，需要在指定时间点前做完核酸，请帮他找到满足条件的[核酸检测](https://so.csdn.net/so/search?q=%E6%A0%B8%E9%85%B8%E6%A3%80%E6%B5%8B&spm=1001.2101.3001.7020)点。

  * 给出一组核酸检测点的距离和每个核酸检测点当前的人数
  * 给出张三要去做核酸的出发时间 出发时间是10分钟的倍数，同时给出张三做核酸的最晚结束时间
  * 题目中给出的距离是整数，单位是公里，时间1分钟为一基本单位

去找核酸点时，有如下的限制：

  * 去往核酸点的路上，每公里距离花费时间10分钟，费用是10元
  * 核酸点每检测一个人的时间花费是1分钟
  * 每个核酸点工作时间都是8点到20点中间不休息，核酸点准时工作，早到晚到都不检测
  * 核酸检测结果可立刻知道
  * 在张三去某个核酸点的路上花费的时间内，此核酸检测点的人数是动态变化的，变化规则是

  1. 在非核酸检测时间内，没有人排队
  2. 8点-10点每分钟增加3人
  3. 12点-14点每分钟增加10人
  4. 18点-20点每分钟增加20人。
  5. 其他时间每5分钟增加1人。

要求将所有满足条件的核酸检测点按照优选规则排序列出 ：  
优选规则：

  1. 花费时间最少的核酸检测点排在前面。
  2. 花费时间一样,花费费用最少的核酸检测点排在前面。
  3. 时间和费用一样，则ID值最小的排在前面

## 输入描述

    
    
    H1 M1
    H2 M2
    N
    ID1 D1 C1
    ID2 D2 C2
    …
    IDn Dn Cn
    

H1:
[当前时间](https://so.csdn.net/so/search?q=%E5%BD%93%E5%89%8D%E6%97%B6%E9%97%B4&spm=1001.2101.3001.7020)的小时数。  
M1：当前时间的分钟数，  
H2：指定完成核算时间的小时数。  
M2：指定完成核算时间的分钟数。  
N：所有核酸检测点个数。  
ID1：核酸点的ID值。  
D1：核酸检测点距离张三的距离。  
C1：核酸检测点当前检测的人数。

## 输出描述

    
    
    N
    I2 T2 M2
    I3 T3 M3
    

N：满足要求的核酸检测点个数  
I2:选择后的核酸检测点ID  
T2:做完核酸花费的总时间(分钟)  
M3:去该核算点花费的费用

## 示例1

输入

    
    
    10 30
    14 50
    3
    1 10 19
    2 8 20
    3 21 3
    

输出

    
    
    2
    2 80 80
    1 190 100
    

说明

> ## 解题思路

#### 题目提供的要素

  1. **当前时间** （`H1 M1`）：代表当前时间的小时和分钟。
  2. **最晚核酸结束时间** （`H2 M2`）：代表张三需要在此时间之前完成核酸检测。
  3. **核酸检测点列表** ： 
     * 每个检测点有唯一ID，距离张三的距离（单位：公里），和当前排队人数。

#### 具体限制和计算

  1. **路上花费** ：

     * 每公里需要花费10分钟，费用为10元。
  2. **核酸检测点排队规则** ：

     * 核酸检测点工作时间为 **8点至20点** 。
     * **在核酸检测点等待的排队人数** 是动态变化的： 
       * 8点-10点：每分钟增加3人
       * 12点-14点：每分钟增加10人
       * 18点-20点：每分钟增加20人
       * 其他时间：每5分钟增加1人
  3. **核酸检测** ：

     * 每检测一个人花费1分钟，因此在核酸点的总等待时间等于当前排队人数和途中动态增加人数之和。

#### 优选规则

  1. 总花费时间最少的检测点优先。
  2. 若花费时间相同，费用低的优先。
  3. 如果时间和费用都相同，ID值最小的检测点优先。

## Java

    
    
    import java.util.Arrays;
    import java.util.List;
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
    
            // 读取输入的当前时间和目标完成时间
            String[] currentTime = scanner.nextLine().split(" ");
            int currentHour = Integer.parseInt(currentTime[0]);
            int currentMinute = Integer.parseInt(currentTime[1]);
    
            String[] targetTime = scanner.nextLine().split(" ");
            int targetHour = Integer.parseInt(targetTime[0]);
            int targetMinute = Integer.parseInt(targetTime[1]);
    
            // 将时间转换成分钟数
            int start = currentHour * 60 + currentMinute;
            int end = targetHour * 60 + targetMinute;
    
            // 读取输入的核酸点信息
            int n = Integer.parseInt(scanner.nextLine());
            int[][] nucleicAcidPoints = new int[n][3];
            for (int i = 0; i < n; i++) {
                String[] pointInfo = scanner.nextLine().split(" ");
                nucleicAcidPoints[i][0] = Integer.parseInt(pointInfo[0]); // 核酸点的ID值
                nucleicAcidPoints[i][1] = Integer.parseInt(pointInfo[1]); // 核酸检测点距离张三的距离
                nucleicAcidPoints[i][2] = Integer.parseInt(pointInfo[2]); // 核酸检测点当前检测的人数
            }
    
      
            int[][] result = new int[n][3];
            int count = 0;
    
            for (int i = 0; i < n; i++) {
                int id = nucleicAcidPoints[i][0];
                int distance = nucleicAcidPoints[i][1];
                int peopleCount = nucleicAcidPoints[i][2];
    
                int money = distance * 10; // 收费金额为距离*10
                int road = distance * 10; // 花在路上的时间为距离*10
                int arrived = start + road; // 到达核酸检测点的时间
    
                // 如果在8：00之前到达，需要等待到8:00
                if (arrived < 8 * 60) {
                    arrived = 8 * 60;
                    road = arrived - start;
                }
    
                // 计算在不同时间段内排队的人数
                int[] timeRange1 = {start, arrived}; // 出发时间、到达时间
                int[] timeRange2 = {8 * 60, 10 * 60}; // 8:00-10:00
                int add1 = getIntersection(timeRange1, timeRange2); // 交集长度
                if (add1 != -1) {
                    peopleCount += 2 * add1; // 每分钟净增2人
                }
    
                int[] timeRange3 = {10 * 60, 12 * 60}; // 10:00-12:00
                int min1 = getIntersection(timeRange1, timeRange3); // 交集长度
                if (min1 != -1) {
                    peopleCount -= min1; // 每分钟净减1人
                    peopleCount = Math.max(0, peopleCount); // 注意至多减到0
                }
    
                int[] timeRange4 = {12 * 60, 14 * 60}; // 12:00-14:00
                int add2 = getIntersection(timeRange1, timeRange4); // 交集长度
                if (add2 != -1) {
                    peopleCount += 9 * add2; // 每分钟净增9人
                }
    
                int[] timeRange5 = {14 * 60, 20 * 60}; // 14:00-20:00
                int min2 = getIntersection(timeRange1, timeRange5); // 交集长度
                if (min2 != -1) {
                    peopleCount -= min2; // 每分钟净减1人
                    peopleCount = Math.max(0, peopleCount); // 注意至多减到0
                }
    
                // 总花费时间
                int totalTime = peopleCount + road;
                if (start + totalTime <= end) {
                    result[count][0] = id;
                    result[count][1] = totalTime;
                    result[count][2] = money;
                    count++;
                }
            }
    
            // 按照到达时间+花费时间、收费金额、ID的顺序排序
            Arrays.sort(result, 0, count, (a, b) -> a[1] != b[1] ? a[1] - b[1] : (a[2] != b[2] ? a[2] - b[2] : a[0] - b[0]));
    
            // 输出结果
            System.out.println(count);
            for (int i = 0; i < count; i++) {
                System.out.println(result[i][0] + " " + result[i][1] + " " + result[i][2]);
            }
        }
    
        /**
         * 获取两个时间段的交集长度
         * @param timeRange1 时间段1
         * @param timeRange2 时间段2
         * @return 交集长度，如果没有交集返回-1
         */
        public static int getIntersection(int[] timeRange1, int[] timeRange2) {
            int start1 = timeRange1[0], end1 = timeRange1[1];
            int start2 = timeRange2[0], end2 = timeRange2[1];
    
            // 如果时间段1在时间段2之前，或者时间段1在时间段2之后，则没有交集
            if (start1 < start2) {
                if (start2 >= end1) return -1;
                else return Math.min(end1, end2) - start2;
            } else if (start1 > start2) {
                if (start1 >= end2) return -1;
                else return Math.min(end1, end2) - start1;
            } else {
                return Math.min(end1, end2) - start1;
            }
        }
    }
    
    

## Python

    
    
    # 导入系统模块
    import sys
    
    def get_intersection(time_range1, time_range2):
        # 获取两个时间段的交集长度
        start1, end1 = time_range1
        start2, end2 = time_range2
    
        # 判断是否有交集并返回交集长度
        if start1 < start2:
            if start2 >= end1:
                return -1
            else:
                return min(end1, end2) - start2
        elif start1 > start2:
            if start1 >= end2:
                return -1
            else:
                return min(end1, end2) - start1
        else:
            return min(end1, end2) - start1
    
    # 读取输入的当前时间和目标完成时间
    current_hour, current_minute = map(int, input().split())
    target_hour, target_minute = map(int, input().split())
    
    # 将时间转换成分钟数
    start = current_hour * 60 + current_minute
    end = target_hour * 60 + target_minute
    
    # 读取输入的核酸点信息
    n = int(input())
    nucleic_acid_points = []
    for _ in range(n):
        nucleic_acid_points.append(list(map(int, input().split())))
    
    result = []
    for point in nucleic_acid_points:
        id, distance, people_count = point
        money = distance * 10  # 收费金额为距离*10
        road = distance * 10    # 花在路上的时间为距离*10
        arrived = start + road  # 到达核酸检测点的时间
    
        if arrived < 8 * 60:
            arrived = 8 * 60
            road = arrived - start
    
        # 计算在不同时间段内排队的人数变化
        time_range1 = [start, arrived]
        
        add1 = get_intersection(time_range1, [8 * 60, 10 * 60])
        if add1 != -1:
            people_count += 2 * add1
    
        min1 = get_intersection(time_range1, [10 * 60, 12 * 60])
        if min1 != -1:
            people_count -= min1
            people_count = max(0, people_count)
    
        add2 = get_intersection(time_range1, [12 * 60, 14 * 60])
        if add2 != -1:
            people_count += 9 * add2
    
        min2 = get_intersection(time_range1, [14 * 60, 20 * 60])
        if min2 != -1:
            people_count -= min2
            people_count = max(0, people_count)
    
        total_time = people_count + road
        if start + total_time <= end:
            result.append([id, total_time, money])
    
    # 按到达时间+花费时间、收费金额、ID顺序排序
    result.sort(key=lambda x: (x[1], x[2], x[0]))
    
    # 输出结果
    print(len(result))
    for r in result:
        print(r[0], r[1], r[2])
    
    

## JavaScript

    
    
    const readline = require('readline');
    
    function getIntersection(timeRange1, timeRange2) {
        // 计算两个时间段的交集长度
        const [start1, end1] = timeRange1;
        const [start2, end2] = timeRange2;
        
        if (start1 < start2) {
            if (start2 >= end1) return -1;
            return Math.min(end1, end2) - start2;
        } else if (start1 > start2) {
            if (start1 >= end2) return -1;
            return Math.min(end1, end2) - start1;
        } else {
            return Math.min(end1, end2) - start1;
        }
    }
    
    // 创建读取接口
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    let lines = [];
    rl.on('line', (input) => {
        lines.push(input);
    }).on('close', () => {
        const [currentHour, currentMinute] = lines[0].split(" ").map(Number);
        const [targetHour, targetMinute] = lines[1].split(" ").map(Number);
        const start = currentHour * 60 + currentMinute;
        const end = targetHour * 60 + targetMinute;
    
        const n = Number(lines[2]);
        const nucleicAcidPoints = lines.slice(3, 3 + n).map(line => line.split(" ").map(Number));
    
        const result = [];
        nucleicAcidPoints.forEach(point => {
            let [id, distance, peopleCount] = point;
            const money = distance * 10;
            let road = distance * 10;
            let arrived = start + road;
    
            if (arrived < 8 * 60) {
                arrived = 8 * 60;
                road = arrived - start;
            }
    
            const timeRange1 = [start, arrived];
            
            const add1 = getIntersection(timeRange1, [8 * 60, 10 * 60]);
            if (add1 !== -1) peopleCount += 2 * add1;
    
            const min1 = getIntersection(timeRange1, [10 * 60, 12 * 60]);
            if (min1 !== -1) peopleCount = Math.max(0, peopleCount - min1);
    
            const add2 = getIntersection(timeRange1, [12 * 60, 14 * 60]);
            if (add2 !== -1) peopleCount += 9 * add2;
    
            const min2 = getIntersection(timeRange1, [14 * 60, 20 * 60]);
            if (min2 !== -1) peopleCount = Math.max(0, peopleCount - min2);
    
            const totalTime = peopleCount + road;
            if (start + totalTime <= end) result.push([id, totalTime, money]);
        });
    
        result.sort((a, b) => a[1] - b[1] || a[2] - b[2] || a[0] - b[0]);
        console.log(result.length);
        result.forEach(r => console.log(r.join(" ")));
    });
    
    

## C++

    
    
    #include <iostream>
    #include <vector>
    #include <algorithm>
    
    using namespace std;
    
    int getIntersection(int start1, int end1, int start2, int end2) {
        // 计算两个时间段的交集长度
        if (start1 < start2) {
            if (start2 >= end1) return -1;
            return min(end1, end2) - start2;
        } else if (start1 > start2) {
            if (start1 >= end2) return -1;
            return min(end1, end2) - start1;
        } else {
            return min(end1, end2) - start1;
        }
    }
    
    int main() {
        int currentHour, currentMinute, targetHour, targetMinute;
        cin >> currentHour >> currentMinute >> targetHour >> targetMinute;
    
        int start = currentHour * 60 + currentMinute;
        int end = targetHour * 60 + targetMinute;
    
        int n;
        cin >> n;
        vector<vector<int>> nucleicAcidPoints(n, vector<int>(3));
        for (int i = 0; i < n; i++) {
            cin >> nucleicAcidPoints[i][0] >> nucleicAcidPoints[i][1] >> nucleicAcidPoints[i][2];
        }
    
        vector<vector<int>> result;
        for (const auto& point : nucleicAcidPoints) {
            int id = point[0], distance = point[1], peopleCount = point[2];
            int money = distance * 10, road = distance * 10, arrived = start + road;
    
            if (arrived < 8 * 60) {
                arrived = 8 * 60;
                road = arrived - start;
            }
    
            int add1 = getIntersection(start, arrived, 8 * 60, 10 * 60);
            if (add1 != -1) peopleCount += 2 * add1;
    
            int min1 = getIntersection(start, arrived, 10 * 60, 12 * 60);
            if (min1 != -1) peopleCount = max(0, peopleCount - min1);
    
            int add2 = getIntersection(start, arrived, 12 * 60, 14 * 60);
            if (add2 != -1) peopleCount += 9 * add2;
    
            int min2 = getIntersection(start, arrived, 14 * 60, 20 * 60);
            if (min2 != -1) peopleCount = max(0, peopleCount - min2);
    
            int totalTime = peopleCount + road;
            if (start + totalTime <= end) result.push_back({id, totalTime, money});
        }
    
        sort(result.begin(), result.end(), [](const vector<int>& a, const vector<int>& b) {
            return a[1] != b[1] ? a[1] < b[1] : (a[2] != b[2] ? a[2] < b[2] : a[0] < b[0]);
        });
    
        cout << result.size() << endl;
        for (const auto
    & r : result) cout << r[0] << " " << r[1] << " " << r[2] << endl;
        return 0;
    }
    
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    
    typedef struct {
        int id;
        int totalTime;
        int money;
    } Result;
    
    int getIntersection(int start1, int end1, int start2, int end2) {
        if (start1 < start2) {
            if (start2 >= end1) return -1;
            return (end1 < end2 ? end1 : end2) - start2;
        } else if (start1 > start2) {
            if (start1 >= end2) return -1;
            return (end1 < end2 ? end1 : end2) - start1;
        } else {
            return (end1 < end2 ? end1 : end2) - start1;
        }
    }
    
    int cmp(const void *a, const void *b) {
        Result *r1 = (Result *)a;
        Result *r2 = (Result *)b;
        if (r1->totalTime != r2->totalTime) return r1->totalTime - r2->totalTime;
        if (r1->money != r2->money) return r1->money - r2->money;
        return r1->id - r2->id;
    }
    
    int main() {
        int currentHour, currentMinute, targetHour, targetMinute;
        scanf("%d %d %d %d", &currentHour, &currentMinute, &targetHour, &targetMinute);
    
        int start = currentHour * 60 + currentMinute;
        int end = targetHour * 60 + targetMinute;
    
        int n;
        scanf("%d", &n);
        int nucleicAcidPoints[n][3];
        for (int i = 0; i < n; i++) {
            scanf("%d %d %d", &nucleicAcidPoints[i][0], &nucleicAcidPoints[i][1], &nucleicAcidPoints[i][2]);
        }
    
        Result result[n];
        int count = 0;
    
        for (int i = 0; i < n; i++) {
            int id = nucleicAcidPoints[i][0];
            int distance = nucleicAcidPoints[i][1];
            int peopleCount = nucleicAcidPoints[i][2];
    
            int money = distance * 10;
            int road = distance * 10;
            int arrived = start + road;
    
            if (arrived < 8 * 60) {
                arrived = 8 * 60;
                road = arrived - start;
            }
    
            int add1 = getIntersection(start, arrived, 8 * 60, 10 * 60);
            if (add1 != -1) peopleCount += 2 * add1;
    
            int min1 = getIntersection(start, arrived, 10 * 60, 12 * 60);
            if (min1 != -1) peopleCount = peopleCount > min1 ? peopleCount - min1 : 0;
    
            int add2 = getIntersection(start, arrived, 12 * 60, 14 * 60);
            if (add2 != -1) peopleCount += 9 * add2;
    
            int min2 = getIntersection(start, arrived, 14 * 60, 20 * 60);
            if (min2 != -1) peopleCount = peopleCount > min2 ? peopleCount - min2 : 0;
    
            int totalTime = peopleCount + road;
            if (start + totalTime <= end) {
                result[count++] = (Result){id, totalTime, money};
            }
        }
    
        qsort(result, count, sizeof(Result), cmp);
    
        printf("%d\n", count);
        for (int i = 0; i < count; i++) {
            printf("%d %d %d\n", result[i].id, result[i].totalTime, result[i].money);
        }
    
        return 0;
    }
    
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

