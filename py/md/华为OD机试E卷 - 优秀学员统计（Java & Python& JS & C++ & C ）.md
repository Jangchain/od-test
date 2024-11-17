## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

公司某部门软件教导团正在组织新员工每日打卡学习活动，他们开展这项学习活动已经一个月了，所以想统计下这个月优秀的打卡员工。每个员工会对应一个id，每天的打卡记录记录当天打卡员工的id集合，一共30天。

请你实现代码帮助统计出打卡次数top5的员工。加入打卡次数相同，将较早参与打卡的员工排在前面，如果开始参与打卡的时间还是一样，将id较小的员工排在前面。

注：不考虑并列的情况，按规则返回前5名员工的id即可，如果当月打卡的员工少于5个，按规则排序返回所有有打卡记录的员工id。

## 输入描述

第一行输入为新员工数量N，表示新员工编号id为0到N-1，N的范围为[1,100]

第二行输入为30个整数，表示每天打卡的员工数量，每天至少有1名员工打卡。

之后30行为每天打卡的员工id集合，id不会重复。

## 输出描述

按顺序输出打卡top5员工的id，用空格隔开。

## 示例1

输入

    
    
    11
    4 4 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 2 2
    0 1 7 10
    0 1 6 10
    10
    10
    10
    10
    10
    10
    10
    10
    10
    10
    10
    10
    10
    10
    10
    10
    10
    10
    10
    10
    10
    10
    10
    10
    10
    10
    6 10
    7 10
    

输出

    
    
    10 0 1 7 6
    

说明

>
> 员工编号范围为0~10，id为10的员工连续打卡30天，排第一，id为0,1,6,7的员工打卡都是两天，id为0,1,7的员工在第一天就打卡，比id为6的员工早，排在前面，0,1,7按id升序排列，所以输出[10,0,1,7,6]

## 示例2

输入

    
    
    7
    6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6
    0 1 2 3 4 5
    0 1 2 3 4 5
    0 1 2 3 4 5
    0 1 2 3 4 5
    0 1 2 3 4 5
    0 1 2 3 4 5
    0 1 2 3 4 5
    0 1 2 3 4 5
    0 1 2 3 4 5
    0 1 2 3 4 5
    0 1 2 3 4 5
    0 1 2 3 4 5
    0 1 2 3 4 5
    0 1 2 3 4 5
    0 1 2 3 4 5
    0 1 2 3 4 5
    0 1 2 3 4 5
    0 1 2 3 4 5
    0 1 2 3 4 5
    0 1 2 3 4 5
    0 1 2 3 4 5
    0 1 2 3 4 5
    0 1 2 3 4 5
    0 1 2 3 4 5
    0 1 2 3 4 5
    0 1 2 3 4 5
    0 1 2 3 4 5
    0 1 2 3 4 5
    0 1 2 3 4 5
    0 1 2 3 4 5
    

输出

    
    
    0 1 2 3 4
    

说明

> 员工编号范围为0-6，id为0，1，2，3，4，5的员工打卡次数相同，最早开始打卡的时间也一样，所以按id升序返回前5个id

## 示例3

输入

    
    
    2
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 2 2
    1
    1
    1
    1
    1
    1
    1
    1
    1
    1
    1
    1
    1
    1
    1
    1
    1
    1
    1
    1
    1
    1
    1
    1
    1
    1
    1
    1
    0 1
    0 1
    

输出

    
    
    1 0
    

说明

> 只有两名员工参与打卡，按规则排序输出两名员工的id

## 解题思路

典型的排序类问题。先按照打卡次数，再按照打卡时间先后进行排序即可。

## Java

    
    
    import java.util.ArrayList;
    import java.util.HashMap;
    import java.util.Scanner;
    import java.util.StringJoiner;
     
    public class Main {
      public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
     
        int monthCount = scanner.nextInt(); // 打卡月份数
     
        int[] dayCount = new int[30]; // 每个月的天数
        for (int i = 0; i < 30; i++) {
          dayCount[i] = scanner.nextInt();
        }
     
        int[][] dayIds = new int[30][]; // 每天打卡员工的id
        for (int i = 0; i < 30; i++) {
          int m = dayCount[i];
          dayIds[i] = new int[m];
          for (int j = 0; j < m; j++) {
            dayIds[i][j] = scanner.nextInt();
          }
        }
     
        System.out.println(getResult(dayIds));
      }
     
      public static String getResult(int[][] dayIds) {
        HashMap<Integer, Integer[]> employees = new HashMap<>(); // 员工id和打卡信息的映射
     
        for (int i = 0; i < dayIds.length; i++) {
          int[] ids = dayIds[i];
     
          for (int id : ids) {
            if (employees.containsKey(id)) {
              employees.get(id)[0]++; // 打卡次数+1
            } else {
              // 加入数组含义是：该id员工的 [打卡次数，第一天打卡日期]
              employees.put(id, new Integer[] {1, i});
            }
          }
        }
     
        ArrayList<Integer[]> list = new ArrayList<>(); // 存储有打卡记录的员工信息
        for (Integer id : employees.keySet()) {
          Integer[] employee = employees.get(id);
          int count = employee[0]; // 打卡次数
          int firstDay = employee[1]; // 第一天打卡日期
          list.add(new Integer[] {id, count, firstDay});
        }
     
        // 按规则排序
        list.sort(
            (a, b) ->
                a[1].equals(b[1]) ? (a[2].equals(b[2]) ? a[0] - b[0] : a[2] - b[2]) : b[1] - a[1]);
     
        StringJoiner sj = new StringJoiner(" ");
        // 不考虑并列的情况，按规则返回前5名员工的id即可，如果当月打卡的员工少于5个，按规则排序返回所有有打卡记录的员工id
        for (int i = 0; i < Math.min(5, list.size()); i++) {
          sj.add(list.get(i)[0] + "");
        }
        return sj.toString();
      }
    }
    
    
    

## Python

    
    
    import functools
    import sys
    from collections import Counter, defaultdict
    import copy
    from itertools import permutations
    import re
    import math
    import sys
    
    # 比较函数，按照打卡次数、首次打卡时间、员工ID的顺序进行排序
    def compare(a, b):
        if (a[1] == b[1]): # 如果打卡次数相同
            if (a[2] == b[2]): # 如果首次打卡时间相同
                return a[0] - b[0] # 按照员工ID升序排列
            else:
                return a[2] - b[2] # 按照首次打卡时间升序排列
        else:
            return b[1] - a[1] # 按照打卡次数降序排列
    
    # 新员工数量
    num_new_employees = int(input())
    # 每天打卡的员工数量
    employee_count_per_day = [int(x) for x in input().split(" ")]
    # 打卡记录
    employee_records = []
    for i in range(30):
        employee_records.append([int(x) for x in input().split(" ")])
    
    # key为员工ID， value为其打卡的记录信息：[打卡次数，首次打卡index]
    employee_info = {}
    for i in range(30):
        for j in employee_records[i]:
            if(j in employee_info): # 如果员工已经在字典中
                employee_info[j][0] += 1 # 打卡次数加1
            else:
                employee_info[j] = [1, i] # 否则，将员工添加到字典中，并记录打卡次数和首次打卡时间
    
    # 将map信息转到list中，以便后续排序
    employee_list = []
    for key in employee_info:
        employee_list.append([key, employee_info[key][0], employee_info[key][1]]);
    
    # 按照打卡次数、首次打卡时间、员工ID的顺序进行排序
    employee_list = sorted(employee_list, key=functools.cmp_to_key(compare));
    
    res = []
    for i in range(5):
        res.append(str(employee_list[i][0]))
    
    # 输出
    print(" ".join(res))
    
    
    

## JavaScript

    
    
    // 引入 Node.js 内置的 readline 模块
    const readline = require("readline");
    
    // 创建 readline.Interface 实例
    const rl = readline.createInterface({
      input: process.stdin, // 从标准输入流中读取数据
      output: process.stdout, // 向标准输出流中输出数据
    });
    
    // 用于存储输入的所有行
    const inputLines = [];
    
    // 当读取到新的一行时，将其添加到 inputLines 数组中
    rl.on("line", (line) => {
      inputLines.push(line);
    
      // 当输入的行数达到 32 时，进行处理并输出结果
      if (inputLines.length === 32) {
        // 获取员工总数
        const employeeCount = Number(inputLines[0]);
    
        // 获取每个员工出现的天数
        const dayCount = inputLines[1].split(" ").map(Number);
    
        // 获取每个员工在每天出现的次数和日期
        const dayIds = inputLines.slice(2).map((line) => line.split(" ").map(Number));
    
        // 输出出现次数最多的前五个员工的 ID
        console.log(getTopEmployeeIds(dayIds));
    
        // 清空 inputLines 数组，以便下一次读取数据
        inputLines.length = 0;
      }
    });
    
    // 获取出现次数最多的前五个员工的 ID
    function getTopEmployeeIds(dayIds) {
      // 用一个对象来存储每个员工的出现次数和首次出现的日期
      const employees = {};
    
      // 遍历 dayIds 数组，统计每个员工的出现次数和首次出现的日期
      for (let i = 0; i < dayIds.length; i++) {
        const ids = dayIds[i];
        for (let id of ids) {
          if (employees[id]) {
            employees[id].count++;
          } else {
            employees[id] = {
              count: 1,
              firstDay: i,
            };
          }
        }
      }
    
      // 将 employees 对象转化为数组，并按照出现次数、首次出现日期、ID 的顺序排序
      let arr = [];
      for (let id in employees) {
        const { count, firstDay } = employees[id];
        arr.push([id, count, firstDay]);
      }
      arr.sort((a, b) =>
        b[1] !== a[1] ? b[1] - a[1] : b[2] !== a[2] ? a[2] - b[2] : a[0] - b[0]
      );
    
      // 取出前五个员工的 ID，并以空格分隔返回
      return arr
        .slice(0, 5)
        .map(([id]) => id)
        .join(" ");
    }
    
    
    
    
    

## C++

    
    
    #include<iostream>
    #include<vector>
    #include<algorithm>
    #include<map>
    using namespace std;
    
    // 根据规则排序
    bool compare(vector<int> a, vector<int> b) {
        if (a[1] == b[1]) { // 如果打卡次数相同
            if (a[2] == b[2]) { // 如果首次打卡时间相同
                return b[0] > a[0]; // 返回ID大的员工
            } else {
                return b[2] > a[2]; // 返回首次打卡时间晚的员工
            }
        } else {
            return a[1] > b[1]; // 返回打卡次数多的员工
        }
    }
     
    int main()
    {
        // 输入处理
        int n; // 新员工数量
        cin >> n;
     
        vector<int> employeeCount; // 每天打卡的员工数量
        for (int i = 0; i < 30; i++) {
            int count;
            cin >> count;
            employeeCount.push_back(count);
        }
     
        vector<vector<int>> employeeIds(30, vector<int>()); // 打卡记录
        for (int i = 0; i < 30; i++) {
            for (int j = 0; j < employeeCount[i]; j++) {
                int id;
                cin >> id;
                employeeIds[i].push_back(id);
            }
        }
     
        map<int, vector<int>> employeeInfo; // key为员工ID， value为其打卡的记录信息：[打卡次数，首次打卡index]
        for (int i = 0; i < employeeIds.size(); i++) {
            for (int id : employeeIds[i]) {
                if (employeeInfo.count(id)) { // 如果员工已经在map中
                    employeeInfo[id][0]++; // 打卡次数加1
                } else {
                    vector<int> info;
                    info.push_back(1); // 打卡次数为1
                    info.push_back(i); // 首次打卡时间为i
                    employeeInfo[id] = info; // 将记录添加到map中
                }
            }
        }
     
        // 将map信息转到list中，以便后续排序
        vector<vector<int>> employeeList;
        for (auto item : employeeInfo) {
            vector<int> temp;
            temp.push_back(item.first); // 员工ID
            temp.push_back(item.second[0]); // 打卡次数
            temp.push_back(item.second[1]); // 首次打卡时间
            employeeList.push_back(temp);
        }
     
        sort(employeeList.begin(), employeeList.end(), compare); // 排序
        
        // 输出前5名员工ID
        for (int i = 0; i < 5; i++) {
            cout << employeeList[i][0];
            if (i != 4) {
                cout << " ";
            }
        }
        return 0;
    }
    
    
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    
    #define MAX_EMPLOYEES 100
    #define DAYS 30
    
    // 结构体存储员工信息
    typedef struct {
        int id;
        int count;      // 打卡次数
        int first_day;  // 首次打卡的天数
    } EmployeeInfo;
    
    // 根据规则排序的比较函数
    int compare(const void *a, const void *b) {
        EmployeeInfo *empA = (EmployeeInfo *)a;
        EmployeeInfo *empB = (EmployeeInfo *)b;
    
        if (empA->count == empB->count) {
            if (empA->first_day == empB->first_day) {
                return empA->id - empB->id; // ID小的员工排前
            } else {
                return empA->first_day - empB->first_day; // 首次打卡早的排前
            }
        } else {
            return empB->count - empA->count; // 打卡次数多的排前
        }
    }
    
    int main() {
        int n;  // 新员工数量
        scanf("%d", &n);
    
        int employeeCount[DAYS];  // 每天打卡的员工数量
        for (int i = 0; i < DAYS; i++) {
            scanf("%d", &employeeCount[i]);
        }
    
        int employeeIds[DAYS][MAX_EMPLOYEES];  // 每天打卡的员工ID
        for (int i = 0; i < DAYS; i++) {
            for (int j = 0; j < employeeCount[i]; j++) {
                scanf("%d", &employeeIds[i][j]);
            }
        }
    
        EmployeeInfo employees[MAX_EMPLOYEES];  // 存储每个员工的信息
        int isTracked[MAX_EMPLOYEES] = {0};  // 标记是否已记录该员工
        int employeeIndex = 0;
    
        // 统计打卡信息
        for (int i = 0; i < DAYS; i++) {
            for (int j = 0; j < employeeCount[i]; j++) {
                int id = employeeIds[i][j];
                if (isTracked[id]) {
                    // 如果员工已经记录过，增加打卡次数
                    for (int k = 0; k < employeeIndex; k++) {
                        if (employees[k].id == id) {
                            employees[k].count++;
                            break;
                        }
                    }
                } else {
                    // 如果员工没有记录过，新增记录
                    employees[employeeIndex].id = id;
                    employees[employeeIndex].count = 1;
                    employees[employeeIndex].first_day = i;
                    isTracked[id] = 1;
                    employeeIndex++;
                }
            }
        }
    
        // 按照规则排序
        qsort(employees, employeeIndex, sizeof(EmployeeInfo), compare);
    
        // 输出前5名员工的ID
        for (int i = 0; i < employeeIndex && i < 5; i++) {
            printf("%d", employees[i].id);
            if (i != 4 && i != employeeIndex - 1) {
                printf(" ");
            }
        }
        printf("\n");
    
        return 0;
    }
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/0dd0744bc322ed1853a5b07530a3b1e9.png)

