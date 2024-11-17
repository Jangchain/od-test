## 题目描述

警察在侦破一个案件时，得到了线人给出的可能犯罪时间，形如 “HH:MM” 表示的时刻。

根据警察和线人的约定，为了隐蔽，该时间是修改过的，

解密规则为：利用当前出现过的数字，构造下一个距离当前时间最近的时刻，则该时间为可能的犯罪时间。

每个出现数字都可以被无限次使用。

## 输入描述

形如HH:SS字符串，表示原始输入。

## 输出描述

形如HH:SS的字符串，表示推理处理的犯罪时间。

### 备注

1.可以保证现任给定的字符串一定是合法的。

例如，“01:35”和“11:08”是合法的，“1:35”和“11:8”是不合法的。

2.最近的时刻可能在第二天。

## 用例

输入| 输出  
---|---  
20:12| 20:20  
23:59| 22:22  
12:58| 15:11  
18:52| 18:55  
23:52| 23:53  
09:17| 09:19  
07:08| 08:00  
  
## C++

    
    
    # 代码1
    #include <iostream>
    #include <string>
    #include <vector>
    #include <algorithm>
    #include <cstdio>
    
    // 检查给定的小时和分钟是否有效，基于“available”数组中的可用数字
    bool isValid(int hours, int minutes, const std::vector<bool>& available) {
        // 将小时和分钟分解为单个数字
        std::vector<int> digits = {hours / 10, hours % 10, minutes / 10, minutes % 10};
        for (int digit : digits) {
            if (!available[digit]) return false; // 如果数字不可用，则返回false
        }
        return true; // 所有数字都可用，返回true
    }
    
    // 根据输入的时间找到下一个可用时间
    std::string findNextTime(const std::string& time) {
        // 从字符串中提取小时和分钟
        int hours = std::stoi(time.substr(0, 2));
        int minutes = std::stoi(time.substr(3, 5));
        // 初始化一个布尔数组，标记哪些数字是可用的
        std::vector<bool> available(10, false);
        for (char c : time) {
            if (c != ':') available[c - '0'] = true; // 标记非冒号字符对应的数字为可用
        }
    
        // 初始化下一个可能的小时和分钟数
        int nextHours = hours, nextMinutes = minutes;
        do {
            nextMinutes++; // 递增分钟
            if (nextMinutes == 60) { // 如果分钟数到达60，小时数递增，分钟数归零
                nextMinutes = 0;
                nextHours++;
                nextHours %= 24; // 如果小时数到达24，归零
            }
        } while (!isValid(nextHours, nextMinutes, available)); // 循环直到找到有效的时间
    
        char buffer[6];
        sprintf(buffer, "%02d:%02d", nextHours, nextMinutes); // 格式化字符串
        return std::string(buffer); // 返回下一个可能的时间
    }
    
    int main() {
        std::string input;
        std::cin >> input; // 读取输入
        std::cout << findNextTime(input) << std::endl; // 打印下一个可能的时间
        return 0;
    }
    
    # 代码2
    #include <iostream>
    #include <string>
    #include <vector>
    #include <map>
    #include <algorithm>
    
    int main() {
        std::string timeStr;
        std::getline(std::cin, timeStr); // 读取一行输入
        // 删除输入字符串中的所有冒号
        timeStr.erase(std::remove(timeStr.begin(), timeStr.end(), ':'), timeStr.end());
    
        std::vector<int> numArr; // 存储时间数字
        // 将时间字符串转换为数字数组
        for (char c : timeStr) {
            numArr.push_back(c - '0');
        }
    
        // 计算输入时间的总分钟数
        int inputMins = (numArr[0] * 10 + numArr[1]) * 60 + numArr[2] * 10 + numArr[3];
    
        std::map<int, int> numMap; // 用于存储时间数字及其出现次数
        for (int num : numArr) {
            numMap[num] = 0; // 初始化数字映射
        }
    
        std::vector<int> ints; // 存储不重复的时间数字
        for (auto& kv : numMap) {
            ints.push_back(kv.first); // 收集不重复的数字
        }
    
        std::map<int, std::string> resultMap; // 存储所有可能的时间及其对应的分钟数
        // 遍历所有可能的时间组合
        for (int a : ints) {
            if (a > 2) continue; // 小时的十位数不能大于2
            for (int b : ints) {
                if (a == 2 && b > 3) continue; // 小时的个位数在十位数为2时不能大于3
                for (int c : ints) {
                    if (c > 5) continue; // 分钟的十位数不能大于5
                    for (int d : ints) {
                        int mins = (a * 10 + b) * 60 + c * 10 + d; // 计算分钟数
                        if (mins <= inputMins) mins += 24 * 60; // 如果时间小于等于输入时间，则加上一天的分钟数
                        // 保存结果
                        resultMap[mins] = std::to_string(a) + std::to_string(b) + ":" + std::to_string(c) + std::to_string(d);
                    }
                }
            }
        }
    
        // 查找结果映射中最接近输入时间的时间
        auto minIt = std::min_element(resultMap.begin(), resultMap.end(),
                                      [](const std::pair<int, std::string>& a, const std::pair<int, std::string>& b) {
                                          return a.first < b.first; // 比较函数
                                      });
    
        // 如果找到有效结果，则输出
        if (minIt != resultMap.end()) {
            std::cout << minIt->second << std::endl;
        }
    
        return 0;
    }
    

## java

    
    
    # 代码1
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            // 创建Scanner对象用于读取输入
            Scanner scanner = new Scanner(System.in);
            // 读取一行输入作为原始时间
            String input = scanner.next();
            // 打印出经过处理的下一个可能的犯罪时间
            System.out.println(findNextTime(input));
        }
    
        public static String findNextTime(String time) {
            // 解析字符串时间为小时和分钟
            int hours = Integer.parseInt(time.substring(0, 2));
            int minutes = Integer.parseInt(time.substring(3, 5));
            // 创建一个布尔数组，用于标记哪些数字是可用的
            boolean[] available = new boolean[10];
            // 遍历时间字符串中的每个字符，如果不是':'，则标记对应的数字为可用
            for (char c : time.toCharArray()) {
                if (c != ':') {
                    available[c - '0'] = true;
                }
            }
    
            // 初始化下一个可能的小时和分钟数为当前时间
            int nextHours = hours;
            int nextMinutes = minutes;
            // 循环直到找到一个符合条件的时间
            do {
                nextMinutes++; // 尝试下一个分钟数
                if (nextMinutes == 60) { // 如果分钟数达到60，归零并小时数加一
                    nextMinutes = 0;
                    nextHours++;
                    nextHours %= 24; // 小时数达到24时归零
                }
            } while (!isValid(nextHours, nextMinutes, available)); // 检查当前尝试的时间是否有效
    
            // 返回格式化后的时间字符串
            return String.format("%02d:%02d", nextHours, nextMinutes);
        }
    
        private static boolean isValid(int hours, int minutes, boolean[] available) {
            // 将小时和分钟数分解为单独的数字
            int[] digits = {hours / 10, hours % 10, minutes / 10, minutes % 10};
            // 遍历每个数字，检查是否都是可用的
            for (int digit : digits) {
                if (!available[digit]) {
                    return false; // 如果有任何一个数字不可用，返回false
                }
            }
            return true; // 所有数字都可用，返回true
        }
    }
    # 代码2
    import java.util.*;
    
    public class Main {
        public static void main(String[] args) {
            // 创建Scanner对象用于读取控制台输入
            Scanner scanner = new Scanner(System.in);
            String timeStr = null;
            // 判断是否还有输入的下一行
            if (scanner.hasNextLine()) {
                // 读取输入的时间字符串
                timeStr = scanner.nextLine();
            }
            // 关闭scanner对象
            scanner.close();
            // 使用StringBuilder删除时间中的冒号，方便处理
            StringBuilder builder = new StringBuilder(timeStr);
            builder.deleteCharAt(builder.indexOf(":"));
            // 将处理后的字符串转换为字符数组
            char[] charArray = builder.toString().toCharArray();
            // 将字符数组转换为数字数组
            int[] numArr = new int[charArray.length];
            for (int i = 0; i < charArray.length; i++) {
                numArr[i] = charArray[i] - '0';
            }
            // 计算输入时间的总分钟数
            int inputMins = (numArr[0] * 10 + numArr[1]) * 60 + numArr[2] * 10 + numArr[3];
            // 使用Map去重并存储每个数字
            Map<Integer, Integer> numMap = new HashMap<Integer, Integer>();
            for (int c : numArr) {
                numMap.put(c, 0);
            }
            // 将Map中的键（即数字）转换为数组
            int[] ints = numMap.keySet().stream().mapToInt(Integer::intValue).toArray();
            // 创建一个Map来存储可能的时间和它们对应的分钟数
            Map<Integer, String> resultMap = new HashMap<>();
            // 通过四层循环遍历所有可能的时间组合
            for (int anInt : ints) {
                // 如果小时的十位数大于2，则跳过
                if (anInt > 2) {
                    continue;
                }
                for (int i : ints) {
                    // 如果小时的十位数为2且个位数大于3，则跳过（24小时制）
                    if (anInt == 2 && i > 3) {
                        continue;
                    }
                    for (int j : ints) {
                        // 如果分钟的十位数大于5，则跳过
                        if (j > 5) {
                            continue;
                        }
                        for (int k : ints) {
                            // 计算当前遍历到的时间的总分钟数
                            int mins = (anInt * 10 + i) * 60 + j * 10 + k;
                            // 如果计算出的时间小于等于输入时间，则认为是第二天的时间，加上一天的总分钟数
                            if (mins <= inputMins) {
                                mins += 24 * 60;
                            }
                            // 将当前时间格式化为字符串并存入结果Map中
                            String str = anInt + "" + i + ":" + j + k;
                            resultMap.put(mins, str);
                        }
                    }
                }
            }
            // 从结果Map中找出最小的分钟数，即最接近输入时间的下一个时间
            Integer min = resultMap.keySet().stream().min(Integer::compareTo).get();
            // 打印出对应的时间字符串
            System.out.println(resultMap.get(min));
        }
    }
    

## javaScript

    
    
    # 代码1
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    // 读取一行输入作为原始时间，并处理
    readline.on('line', (input) => {
        console.log(findNextTime(input)); // 打印处理后的时间
        readline.close();
    });
    
    function findNextTime(time) {
        // 解析字符串时间为小时和分钟
        let hours = parseInt(time.substring(0, 2));
        let minutes = parseInt(time.substring(3, 5));
        // 创建一个布尔数组，用于标记哪些数字是可用的
        let available = new Array(10).fill(false);
        // 遍历时间字符串中的每个字符，如果不是':'，则标记对应的数字为可用
        for (let c of time) {
            if (c !== ':') {
                available[c - '0'] = true;
            }
        }
    
        // 初始化下一个可能的小时和分钟数为当前时间
        let nextHours = hours;
        let nextMinutes = minutes;
        // 循环直到找到一个符合条件的时间
        do {
            nextMinutes++; // 尝试下一个分钟数
            if (nextMinutes === 60) { // 如果分钟数达到60，归零并小时数加一
                nextMinutes = 0;
                nextHours++;
                nextHours %= 24; // 小时数达到24时归零
            }
        } while (!isValid(nextHours, nextMinutes, available)); // 检查当前尝试的时间是否有效
    
        // 返回格式化后的时间字符串
        return `${nextHours.toString().padStart(2, '0')}:${nextMinutes.toString().padStart(2, '0')}`;
    }
    
    function isValid(hours, minutes, available) {
        // 将小时和分钟数分解为单独的数字
        let digits = [Math.floor(hours / 10), hours % 10, Math.floor(minutes / 10), minutes % 10];
        // 遍历每个数字，检查是否都是可用的
        for (let digit of digits) {
            if (!available[digit]) {
                return false; // 如果有任何一个数字不可用，返回false
            }
        }
        return true; // 所有数字都可用，返回true
    }
    
    # 代码2
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    // 读取输入的时间字符串，并处理
    readline.on('line', (timeStr) => {
        findNextClosestTime(timeStr); // 找到并打印最接近的下一个可能时间
        readline.close();
    });
    
    function findNextClosestTime(timeStr) {
        // 删除时间中的冒号，方便处理
        timeStr = timeStr.replace(':', '');
        // 将时间字符串转换为数字数组
        let numArr = timeStr.split('').map(c => parseInt(c));
    
        // 计算输入时间的总分钟数
        let inputMins = (numArr[0] * 10 + numArr[1]) * 60 + numArr[2] * 10 + numArr[3];
    
        // 使用Set去重并存储每个数字
        let uniqueNums = new Set(numArr);
    
        // 创建一个Map来存储可能的时间和它们对应的分钟数
        let resultMap = new Map();
        for (let a of uniqueNums) {
            if (a > 2) continue;
            for (let b of uniqueNums) {
                if (a == 2 && b > 3) continue;
                for (let c of uniqueNums) {
                    if (c > 5) continue;
                    for (let d of uniqueNums) {
                        let mins = (a * 10 + b) * 60 + c * 10 + d;
                        if (mins <= inputMins) {
                            mins += 24 * 60;
                        }
                        resultMap.set(mins, `${a}${b}:${c}${d}`);
                    }
                }
            }
        }
    
        // 从结果Map中找出最小的分钟数，即最接近输入时间的下一个时间
        let min = Math.min(...resultMap.keys());
        console.log(resultMap.get(min));
    }
    

## python

    
    
    #代码1
    def find_next_time(time):
        """
        根据输入的时间找到下一个可能的时间，使用可用数字组合。
        """
        # 解析小时和分钟
        hours, minutes = int(time[:2]), int(time[3:5])
        # 创建一个布尔列表，用于标记哪些数字是可用的
        available = [False] * 10
        for c in time:
            if c != ':':
                available[int(c)] = True
    
        # 初始化下一个可能的小时和分钟
        next_hours, next_minutes = hours, minutes
        while True:
            next_minutes += 1
            if next_minutes == 60:
                next_minutes = 0
                next_hours += 1
                next_hours %= 24
    
            if is_valid(next_hours, next_minutes, available):
                break
    
        return f'{next_hours:02d}:{next_minutes:02d}'
    
    def is_valid(hours, minutes, available):
        """
        检查给定的小时和分钟是否使用了可用的数字。
        """
        for digit in [hours // 10, hours % 10, minutes // 10, minutes % 10]:
            if not available[digit]:
                return False
        return True
    
    # 主程序
    if __name__ == '__main__':
        input_time = input()  # 读取输入
        print(find_next_time(input_time))  # 打印下一个可能的时间
        
        
        
    # 代码2
        
    def find_next_closest_time(time_str):
        """
        根据输入的时间字符串，找到并打印最接近的下一个可能时间。
        """
        # 删除时间字符串中的冒号
        time_str = time_str.replace(':', '')
        # 将时间字符串转换为数字数组
        num_arr = [int(c) for c in time_str]
    
        # 计算输入时间的总分钟数
        input_mins = (num_arr[0] * 10 + num_arr[1]) * 60 + num_arr[2] * 10 + num_arr[3]
    
        # 使用集合去重并存储每个数字
        unique_nums = set(num_arr)
    
        # 创建一个字典来存储可能的时间和它们对应的分钟数
        result_map = {}
        for a in unique_nums:
            if a > 2: continue
            for b in unique_nums:
                if a == 2 and b > 3: continue
                for c in unique_nums:
                    if c > 5: continue
                    for d in unique_nums:
                        mins = (a * 10 + b) * 60 + c * 10 + d
                        if mins <= input_mins:
                            mins += 24 * 60
                        result_map[mins] = f'{a}{b}:{c}{d}'
    
        # 找到最小的分钟数，即最接近输入时间的下一个时间
        next_time = result_map[min(result_map)]
        print(next_time)
    
    # 主程序
    if __name__ == '__main__':
        time_str = input()  # 读取输入的时间字符串
        find_next_closest_time(time_str)
    

## C语言

    
    
    # 代码1
    #include <stdio.h>
    #include <stdbool.h>
    #include <string.h>
    
     
    
    // 检查时间是否有效的函数实现
    bool isValid(int hours, int minutes, bool available[]) {
        int digits[4] = {hours / 10, hours % 10, minutes / 10, minutes % 10};
        for (int i = 0; i < 4; i++) {
            if (!available[digits[i]]) {
                return false;
            }
        }
        return true;
    }
    // 查找并返回下一个可能的时间的函数
    char* findNextTime(char* time) {
        static char result[6]; // 存储结果时间的字符串
        int hours, minutes;
        sscanf(time, "%2d:%2d", &hours, &minutes); // 解析小时和分钟
    
        bool available[10] = {false}; // 标记可用数字
        for (int i = 0; i < strlen(time); i++) {
            if (time[i] != ':') {
                available[time[i] - '0'] = true;
            }
        }
    
        // 寻找下一个可能的时间
        do {
            minutes++;
            if (minutes == 60) {
                minutes = 0;
                hours++;
                hours %= 24;
            }
        } while (!isValid(hours, minutes, available));
    
        // 格式化结果字符串
        sprintf(result, "%02d:%02d", hours, minutes);
        return result;
    }
    
    // 主函数
    int main() {
        char input[6]; // 存储输入的时间字符串
     
        scanf("%s", input); // 读取时间
    
        // 调用函数处理并打印下一个可能的时间
        char nextTime[6];
        strcpy(nextTime, findNextTime(input));
        printf("%s\n", nextTime);
        
        return 0;
    }
    
    
    
    # 代码2
    #include <stdio.h>
    #include <stdlib.h>
    #include <string.h>
    
    // 定义一个结构体，用于存储时间和对应的分钟数
    typedef struct {
        int mins;
        char timeStr[6];
    } TimeMap;
    
    // 比较函数，用于排序
    int compareTimeMap(const void *a, const void *b) {
        TimeMap *timeMapA = (TimeMap *)a;
        TimeMap *timeMapB = (TimeMap *)b;
        return timeMapA->mins - timeMapB->mins;
    }
    
    int main() {
        char timeStr[6]; // 存储输入的时间字符串
      
        scanf("%5s", timeStr); // 读取输入的时间字符串
    
        // 删除冒号，方便处理
        char timeNoColon[5];
        int j = 0;
        for (int i = 0; i < 5; i++) {
            if (timeStr[i] != ':') {
                timeNoColon[j++] = timeStr[i];
            }
        }
        timeNoColon[4] = '\0';
    
        // 转换为数字数组
        int numArr[4];
        for (int i = 0; i < 4; i++) {
            numArr[i] = timeNoColon[i] - '0';
        }
    
        // 计算输入时间的总分钟数
        int inputMins = (numArr[0] * 10 + numArr[1]) * 60 + numArr[2] * 10 + numArr[3];
    
        // 数字去重
        int uniqueNums[10] = {0};
        int uniqueCount = 0;
        for (int i = 0; i < 4; i++) {
            if (!uniqueNums[numArr[i]]) {
                uniqueNums[numArr[i]] = 1;
                uniqueCount++;
            }
        }
    
        // 存储所有可能的时间和对应分钟数
        TimeMap timeMaps[256];
        int timeMapCount = 0;
    
        // 遍历所有可能的时间组合
        for (int a = 0; a < 10; a++) {
            if (!uniqueNums[a]) continue;
            for (int b = 0; b < 10; b++) {
                if (!uniqueNums[b]) continue;
                for (int c = 0; c < 10; c++) {
                    if (!uniqueNums[c]) continue;
                    for (int d = 0; d < 10; d++) {
                        if (!uniqueNums[d]) continue;
                        // 计算小时和分钟
                        int hour = a * 10 + b;
                        int minute = c * 10 + d;
                        if (hour < 24 && minute < 60) {
                            int totalMins = hour * 60 + minute;
                            if (totalMins <= inputMins) {
                                totalMins += 24 * 60;
                            }
                            timeMaps[timeMapCount].mins = totalMins;
                            sprintf(timeMaps[timeMapCount].timeStr, "%02d:%02d", hour, minute);
                            timeMapCount++;
                        }
                    }
                }
            }
        }
    
        // 对时间进行排序
        qsort(timeMaps, timeMapCount, sizeof(TimeMap), compareTimeMap);
    
        // 找到最接近的时间
        printf("%s", timeMaps[0].timeStr);
    
        return 0;
    }
    

## 完整用例

### 用例1

    
    
    00:00
    

### 用例2

    
    
    22:49
    

### 用例3

    
    
    23:49
    

### 用例4

    
    
    18:55
    

### 用例5

    
    
    09:13
    

### 用例6

    
    
    18:50
    

### 用例7

    
    
    23:52
    

### 用例8

    
    
    07:06
    

### 用例9

    
    
    09:15
    

### 用例10

    
    
    09:55
    

![fengmian](https://i-blog.csdnimg.cn/blog_migrate/cdd9ff2d0a58ebf801a5e4651eb58442.png)

