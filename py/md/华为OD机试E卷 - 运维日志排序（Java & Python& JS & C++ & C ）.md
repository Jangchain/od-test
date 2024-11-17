## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

[运维工程师]采集到某产品线网运行一天产生的日志n条，现需根据日志时间先后顺序对日志进行排序，日志时间格式为H:M:S.N。

  * H表示小时(0~23)
  * M表示分钟(0~59)
  * S表示秒(0~59)
  * N表示毫秒(0~999)

时间可能并没有补全，也就是说，01:01:01.001也可能表示为1:1:1.1。

## 输入描述

第一行输入一个整数n表示日志条数，1<=n<=100000，接下来n行输入n个时间。

## 输出描述

按时间升序排序之后的时间，如果有两个时间表示的时间相同，则保持输入顺序。

## 示例1

输入

    
    
    2
    01:41:8.9
    1:1:09.211
    

输出

    
    
    1:1:09.211
    01:41:8.9
    

说明

> ## 示例2

输入

    
    
    3
    23:41:08.023
    1:1:09.211
    08:01:22.0
    

输出

    
    
    1:1:09.211
    08:01:22.0
    23:41:08.023
    

说明

> ## 示例3

输入

    
    
    2
    22:41:08.023
    22:41:08.23
    

输出

    
    
    22:41:08.023
    22:41:08.23
    

说明

> 说明 两个时间表示的时间相同，保持输入顺序

## 解题思路

## Java

    
    
    import java.util.*;
    import java.util.regex.*;
    
    public class Main {
        
        /* 将时间字符串转换为毫秒数 */
    public static int convertToMillisecond(String timeStr) {
        Pattern pattern = Pattern.compile("(\\d+):(\\d+):(\\d+).(\\d+)");
        Matcher matcher = pattern.matcher(timeStr);
        return matcher.find() ? ((Integer.parseInt(matcher.group(1)) * 60 + Integer.parseInt(matcher.group(2))) * 60 + Integer.parseInt(matcher.group(3))) * 1000 + Integer.parseInt(matcher.group(4)) : 0;
    }
        
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            List<String> logs = new ArrayList<>();
            int n = scanner.nextInt();
            scanner.nextLine(); // 忽略换行符
            for (int i = 0; i < n; i++) {
                String log = scanner.nextLine();
                logs.add(log);
            }
            /* 日志排序 */
            Collections.sort(logs, new Comparator<String>() {
                public int compare(String log1, String log2) {
                    int time1 = convertToMillisecond(log1);
                    int time2 = convertToMillisecond(log2);
                    return time1 - time2;
                }
            });
            for (String log : logs) {
                System.out.println(log);
            }
        }
    }
    
    
    

## Python

    
    
    import re
    
    def convertToMillisecond(timeStr):
        hour, minute, second, millisecond = map(int, re.findall(r'\d+', timeStr))
        return hour * 60 * 60 * 1000 + minute * 60 * 1000 + second * 1000 + millisecond
    logs = []
    n = int(input())
    
    for i in range(n):
        log = input()
        logs.append(log)
    
    # 日志排序
    logs.sort(key=lambda log: convertToMillisecond(log))
    
    for log in logs:
        print(log)
    
    
    

## JavaScript

    
    
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    const logs = [];
    let n;
    
    rl.on('line', (input) => {
      if (!n) {
        n = parseInt(input);
      } else {
        logs.push(input);
      }
    
      if (logs.length === n) {
        /* 日志排序 */
        logs.sort((log1, log2) => {
          const time1 = convertToMillisecond(log1);
          const time2 = convertToMillisecond(log2);
          return time1 < time2 ? -1 : 1;
        });
    
        for (const log of logs) {
          console.log(log);
        }
    
        rl.close();
      }
    });
    
    function convertToMillisecond(timeStr) {
      const match = timeStr.match(/(\d+):(\d+):(\d+).(\d+)/);
      return (parseInt(match[1]) * 3600000) + (parseInt(match[2]) * 60000) + (parseInt(match[3]) * 1000) + parseInt(match[4]);
    }
    
    
    

## C++

    
    
    #include <iostream>
    #include <vector>
    #include <regex>
    #include <algorithm>
    
    using namespace std;
    
    int convertToMillisecond(string timeStr) {
        regex pattern("(\\d+):(\\d+):(\\d+).(\\d+)");
        smatch matcher;
        return regex_search(timeStr, matcher, pattern) ? ((stoi(matcher[1]) * 60 + stoi(matcher[2])) * 60 + stoi(matcher[3])) * 1000 + stoi(matcher[4]) : 0;
    }
    int main() {
        vector<string> logs;
        int n;
        cin >> n;
        cin.ignore(); // 忽略换行符
        for (int i = 0; i < n; i++) {
            string log;
            getline(cin, log);
            logs.push_back(log);
        }
        /* 日志排序 */
        sort(logs.begin(), logs.end(), [](const string& log1, const string& log2) {
            int time1 = convertToMillisecond(log1);
            int time2 = convertToMillisecond(log2);
            return time1 < time2;
        });
        for (const string& log : logs) {
            cout << log << endl;
        }
        return 0;
    }
    
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    #include <string.h>
    
    /* 将时间字符串转换为毫秒数 */
    int convertToMillisecond(const char *timeStr) {
        int hours = 0, minutes = 0, seconds = 0, milliseconds = 0;
        sscanf(timeStr, "%d:%d:%d.%d", &hours, &minutes, &seconds, &milliseconds);
        return ((hours * 60 + minutes) * 60 + seconds) * 1000 + milliseconds;
    }
    
    /* 比较函数，用于qsort */
    int compare(const void *a, const void *b) {
        const char **log1 = (const char **)a;
        const char **log2 = (const char **)b;
        
        int time1 = convertToMillisecond(*log1);
        int time2 = convertToMillisecond(*log2);
        
        return time1 - time2;
    }
    
    int main() {
        int n;
        scanf("%d", &n);
        getchar(); // 忽略换行符
    
        char **logs = (char **)malloc(n * sizeof(char *));
        for (int i = 0; i < n; i++) {
            logs[i] = (char *)malloc(50 * sizeof(char)); // 假设每个时间字符串长度不超过50
            fgets(logs[i], 50, stdin);
            
            // 去除fgets输入中的换行符
            logs[i][strcspn(logs[i], "\n")] = '\0';
        }
    
        /* 对日志进行排序 */
        qsort(logs, n, sizeof(char *), compare);
    
        /* 输出排序后的日志 */
        for (int i = 0; i < n; i++) {
            printf("%s\n", logs[i]);
            free(logs[i]); // 释放每个日志字符串的内存
        }
        free(logs); // 释放日志指针数组的内存
    
        return 0;
    }
    
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/7c5da060cc4cd6b9f685225189797a99.png)

#### 完整用例

##### 用例1

    
    
    2
    01:41:8.9
    1:1:09.211
    

##### 用例2

    
    
    3
    23:41:08.023
    1:1:09.211
    08:01:22.0
    

##### 用例3

    
    
    2
    22:41:08.023
    22:41:08.23
    

##### 用例4

    
    
    5
    10:00:00.001
    11:00:00.002
    12:00:00.003
    13:00:00.004
    14:00:00.005
    

##### 用例5

    
    
    4
    12:30:00.001
    15:45:00.002
    09:00:00.003
    18:20:00.004
    

##### 用例6

    
    
    6
    01:01:01.001
    02:02:02.002
    03:03:03.003
    04:04:04.004
    05:05:05.005
    06:06:06.006
    

##### 用例7

    
    
    10
    23:59:59.999
    00:00:00.001
    12:00:00.000
    01:01:01.001
    02:02:02.002
    03:03:03.003
    04:04:04.004
    05:05:05.005
    06:06:06.006
    07:07:07.007
    

##### 用例8

    
    
    7
    12:30:00.001
    15:45:00.002
    09:00:00.003
    18:20:00.004
    01:01:01.001
    02:02:02.002
    03:03:03.003
    

##### 用例9

    
    
    6
    1:1:09.211
    01:41:8.9
    08:01:22.0
    23:41:08.023
    00:00:00.001
    12:00:00.000
    

##### 用例10

    
    
    4
    12:00:00.000
    00:00:00.001
    23:59:59.999
    06:30:45.123
    

