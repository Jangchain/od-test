## 题目描述

公司用一个字符串来表示员工的出勤信息

  * absent：缺勤
  * late：迟到
  * leaveearly：早退
  * present：正常上班

现需根据员工出勤信息，判断本次是否能获得出勤奖，能获得出勤奖的条件如下：

  * 缺勤不超过一次；
  * 没有连续的迟到/早退；
  * 任意连续7次考勤，缺勤/迟到/早退不超过3次。

## 输入描述

用户的考勤数据字符串

  * 记录条数 >= 1；
  * 输入字符串长度 < 10000；
  * 不存在非法输入；

如：

> 2  
>  present  
>  present absent present present leaveearly present absent

## 输出描述

根据考勤数据字符串，如果能得到考勤奖，输出”true”；否则输出”false”，  
对于输入示例的结果应为：

> true false

## 用例

输入| 2  
present  
present present  
---|---  
输出| true true  
说明| 无  
输入| 2  
present  
present absent present present leaveearly present absent  
---|---  
输出| true false  
说明| 无  
  
## C++

    
    
    #include <iostream>
    #include <vector>
    #include <string>
    using namespace std;
    
    // 定义一个函数用于判断是否能获得考勤奖
    bool can_receive_award(const vector<string>& records) {
        int absent_count = 0; // 用于记录缺勤的次数
        for (size_t i = 0; i < records.size(); ++i) { // 遍历考勤记录
            if (records[i] == "absent") { // 如果记录为缺勤
                ++absent_count; // 缺勤次数加1
                if (absent_count > 1) return false; // 如果缺勤超过1次，返回false
            }
            if (records[i] == "late" || records[i] == "leaveearly") { // 如果记录为迟到或早退
                // 如果前一天也是迟到或早退，则不能获得考勤奖
                if (i > 0 && (records[i - 1] == "late" || records[i - 1] == "leaveearly")) {
                    return false;
                }
            }
            if (i >= 6) { // 如果记录长度大于等于7，检查任意连续7天的考勤记录
                int count_in_7_days = 0; // 计算连续7天内非出勤的天数
                for (int j = i - 6; j <= i; ++j) {
                    if (records[j] != "present") ++count_in_7_days;
                }
                if (count_in_7_days > 3) return false; // 如果连续7天内非出勤天数超过3天，返回false
            }
        }
        return true; // 所有条件都满足，返回true
    }
    
    int main() {
        int test_cases;
        cin >> test_cases; // 读取测试用例的数量
        cin.ignore(); // 忽略换行符
        for (int i = 0; i < test_cases; ++i) {
            string line;
            getline(cin, line); // 读取一行考勤记录
            vector<string> records;
            size_t pos = 0;
            while ((pos = line.find(' ')) != string::npos) {
                records.push_back(line.substr(0, pos));
                line.erase(0, pos + 1);
            }
            records.push_back(line); // 添加最后一个记录
            cout << (can_receive_award(records) ? "true" : "false") << " ";
        }
        cout << endl;
        return 0;
    }
    

## java

    
    
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            // 创建Scanner对象读取输入
            Scanner scanner = new Scanner(System.in);
            // 读取测试用例数量
            int testCases = Integer.parseInt(scanner.nextLine().trim());
            // 使用StringBuilder来构建所有测试用例的输出结果
            StringBuilder results = new StringBuilder();
            // 遍历处理每个测试用例
            while (testCases-- > 0) {
                // 读取并分割每个测试用例的考勤记录
                String[] attendanceRecords = scanner.nextLine().trim().split(" ");
                // 判断是否能获得考勤奖，并追加结果到results
                results.append(canReceiveAward(attendanceRecords) ? "true" : "false");
                // 如果还有剩余测试用例，追加一个空格分隔
                if (testCases > 0) {
                    results.append(" ");
                }
            }
            // 输出所有测试用例的结果
            System.out.println(results.toString());
            // 关闭Scanner
            scanner.close();
        }
    
        // 判断是否能获得考勤奖的方法
        private static boolean canReceiveAward(String[] records) {
            // 缺勤次数计数器
            int absentCount = 0;
            // 遍历考勤记录
            for (int i = 0; i < records.length; i++) {
                // 如果记录为缺勤，增加缺勤计数
                if ("absent".equals(records[i])) {
                    absentCount++;
                    // 如果缺勤超过1次，返回false
                    if (absentCount > 1) return false;
                }
                // 如果记录为迟到或早退，且前一天也是迟到或早退，返回false
                if ("late".equals(records[i]) || "leaveearly".equals(records[i])) {
                    if (i > 0 && ("late".equals(records[i - 1]) || "leaveearly".equals(records[i - 1]))) {
                        return false;
                    }
                }
                // 检查任意连续7天的考勤记录
                if (i >= 6) {
                    int countIn7Days = 0;
                    // 计算连续7天内非正常上班的天数
                    for (int j = i - 6; j <= i; j++) {
                        if (!"present".equals(records[j])) {
                            countIn7Days++;
                        }
                    }
                    // 如果连续7天内非正常上班超过3天，返回false
                    if (countIn7Days > 3) return false;
                }
            }
            // 如果所有条件都满足，返回true
            return true;
        }
    }
    

## javaScript

    
    
    // 引入readline模块用于读取命令行输入
    const readline = require('readline');
    
    // 创建readline接口实例
    const rl = readline.createInterface({
        input: process.stdin, // 标准输入流
        output: process.stdout // 标准输出流
    });
    
    // 定义函数判断是否能获得考勤奖
    const canReceiveAward = (records) => {
        let absentCount = 0; // 缺勤次数计数器
        for (let i = 0; i < records.length; i++) {
            if (records[i] === 'absent') { // 如果记录为缺勤
                absentCount++; // 缺勤次数加1
                if (absentCount > 1) return false; // 缺勤超过1次，返回false
            }
            if (records[i] === 'late' || records[i] === 'leaveearly') { // 如果记录为迟到或早退
                // 如果前一天也是迟到或早退，返回false
                if (i > 0 && (records[i - 1] === 'late' || records[i - 1] === 'leaveearly')) {
                    return false;
                }
            }
            if (i >= 6) { // 检查任意连续7天的考勤记录
                let countIn7Days = 0; // 连续7天内非正常上班的天数
                for (let j = i - 6; j <= i; j++) {
                    if (records[j] !== 'present') { // 如果这7天内有非出勤记录
                        countIn7Days++;
                    }
                }
                if (countIn7Days > 3) return false; // 如果连续7天内非正常上班超过3天，返回false
            }
        }
        return true; // 所有条件都满足，返回true
    };
    
    let lines = []; // 存储输入行的数组
    
    // 监听命令行输入
    rl.on('line', (line) => {
        lines.push(line); // 将每行输入存储到lines数组中
    }).on('close', () => { // 输入结束时触发
        const testCases = parseInt(lines[0], 10); // 解析测试用例数量
        for (let i = 1; i <= testCases; i++) { // 遍历每个测试用例
            const attendanceRecords = lines[i].trim().split(" "); // 分割考勤记录
            // 输出每个测试用例的结果，并根据条件添加空格分隔
            process.stdout.write(canReceiveAward(attendanceRecords) ? "true" : "false");
            if (i < testCases) {
                process.stdout.write(" ");
            }
        }
        process.exit(0); // 执行完毕后退出程序
    });
    

## python

    
    
    # 定义一个函数用于判断是否能获得考勤奖
    def can_receive_award(records):
        absent_count = 0  # 用于记录缺勤的次数
        for i in range(len(records)):  # 遍历考勤记录
            if records[i] == "absent":  # 如果记录为缺勤
                absent_count += 1  # 缺勤次数加1
                if absent_count > 1:  # 如果缺勤超过1次
                    return False  # 返回False，表示不能获得考勤奖
            if records[i] in ["late", "leaveearly"]:  # 如果记录为迟到或早退
                # 如果前一天也是迟到或早退，则不能获得考勤奖
                if i > 0 and records[i - 1] in ["late", "leaveearly"]:
                    return False
            if i >= 6:  # 如果记录长度大于等于7，检查任意连续7天的考勤记录
                # 计算连续7天内非出勤的天数
                count_in_7_days = sum(1 for j in range(i - 6, i + 1) if records[j] != "present")
                if count_in_7_days > 3:  # 如果连续7天内非出勤天数超过3天
                    return False  # 返回False，表示不能获得考勤奖
        return True  # 所有条件都满足，返回True，表示可以获得考勤奖
    
    # 读取测试用例的数量
    test_cases = int(input().strip())
    results = []  # 用于存储每个测试用例的结果
    for _ in range(test_cases):  # 遍历每个测试用例
        # 读取并分割每个测试用例的考勤记录
        attendance_records = input().strip().split()
        # 判断是否能获得考勤奖，并将结果添加到results列表中
        results.append("true" if can_receive_award(attendance_records) else "false")
    # 输出所有测试用例的结果，结果之间用空格分隔
    print(" ".join(results))
    

## C语言

    
    
    #include <stdio.h>
    #include <string.h>
    #include <stdlib.h>
    
    #define MAX_RECORDS 100 // 定义最大记录数
    #define MAX_LENGTH 100  // 定义每条记录的最大长度
    
    // 检查是否可以根据出勤记录获得奖励的函数
    int can_receive_award(char records[][MAX_LENGTH], int count) {
        int absent_count = 0; // 缺席计数
        for (int i = 0; i < count; ++i) {
            // 如果记录为"absent"，增加缺席计数
            if (strcmp(records[i], "absent") == 0) {
                ++absent_count;
                // 如果缺席超过一次，则不符合条件
                if (absent_count > 1) return 0; // false
            }
            // 如果记录为"late"或"leaveearly"，检查前一天是否也为"late"或"leaveearly"
            if (strcmp(records[i], "late") == 0 || strcmp(records[i], "leaveearly") == 0) {
                if (i > 0 && (strcmp(records[i - 1], "late") == 0 || strcmp(records[i - 1], "leaveearly") == 0)) {
                    return 0; // false
                }
            }
            // 检查连续7天内，非"present"的记录是否超过3次
            if (i >= 6) {
                int count_in_7_days = 0;
                for (int j = i - 6; j <= i; ++j) {
                    if (strcmp(records[j], "present") != 0) ++count_in_7_days;
                }
                if (count_in_7_days > 3) return 0; // false
            }
        }
        return 1; // true，符合条件
    }
    
    int main() {
        int test_cases;
        scanf("%d", &test_cases); // 读取测试用例的数量
    
        for (int t = 0; t < test_cases; ++t) {
            char records[MAX_RECORDS][MAX_LENGTH]; // 存储记录的数组
            int records_size = 0; // 记录的实际数量
    
            // 循环读取每条记录，直到检测到换行符
            while (scanf("%s", records[records_size]) == 1) {
                records_size++;
                if (getchar() == '\n') break; // 如果检测到换行符，跳出循环
            }
    
            // 输出结果，如果符合条件输出"true"，否则输出"false"
            printf("%s ", can_receive_award(records, records_size) ? "true" : "false");
        }
        printf("\n");
        return 0;
    }
    

## 完整用例

### 用例1

    
    
    1
    present absent present late present leaveearly present absent
    

### 用例2

    
    
    1
    absent present present present present present present
    

### 用例3

    
    
    1
    present late present late present late present late present late present
    

### 用例4

    
    
    1
    present present present present absent present present present present present present present present present present present
    

### 用例5

    
    
    1
    present present present present present present present present present present present present present present present absent
    

### 用例6

    
    
    1
    present present late present present late present present late present present late present present present late
    

### 用例7

    
    
    1
    present absent leaveearly present present present absent
    

### 用例8

    
    
    2
    absent present leaveearly present present present absent
    present absent present present leaveearly leaveearly absent
    

### 用例9

    
    
    1
    absent present leaveearly present present present absent
    present absent present present leaveearly leaveearly absent
    

### 用例10

    
    
    1
    absent present present present leaveearly present present
    

#### 文章目录

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

![doutub_gif](https://i-blog.csdnimg.cn/blog_migrate/b5e21aa6bd7b2acf00ccb3c17fd72013.png)

