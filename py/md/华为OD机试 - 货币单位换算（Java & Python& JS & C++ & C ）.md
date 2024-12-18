## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

记账本上记录了若干条多国货币金额，需要转换成人民币分（fen），汇总后输出。  
每行记录一条金额，金额带有货币单位，格式为数字+单位，可能是单独元，或者单独分，或者元与分的组合。  
要求将这些货币全部换算成人民币分（fen）后进行汇总，汇总结果仅保留整数，小数部分舍弃。  
元和分的换算关系都是1:100，如下：

  * 1CNY=100fen（1元=100分）
  * 1HKD=100cents（1港元=100港分）
  * 1JPY=100sen（1日元=100仙）
  * 1EUR=100eurocents（1欧元=100欧分）
  * 1GBP=100pence（1英镑=100便士）

汇率表如下：

即：100CNY = 1825JPY = 123HKD = 14EUR = 12GBP

CNY| JPY| HKD| EUR| GBP  
---|---|---|---|---  
100| 1825| 123| 14| 12  
  
## 输入描述

第一行输入为N，N表示记录数。0<N<100

之后N行，每行表示一条货币记录，且该行只会是一种货币。

## 输出描述

将每行货币转换成人民币分（fen）后汇总求和，只保留整数部分。  
输出格式只有整数数字，不带小数，不带单位。

## 示例1

输入

    
    
    1
    100CNY
    

输出

    
    
    10000
    

说明

> 100CNY转换后是10000fen，所以输出结果为10000

## 示例2

输入

    
    
    1
    3000fen
    

输出

    
    
    3000
    

说明

> 3000fen，结果就是3000

## 示例3

输入

    
    
    1
    123HKD
    

输出

    
    
    10000
    

说明

> HKD与CNY的汇率关系是123:100，所以换算后，输出结果为10000

## 示例4

输入

    
    
    2
    20CNY53fen
    53HKD87cents
    

输出

    
    
    6432
    

说明

> 20元53分 + 53港元87港分，换算成人民币分后汇总，为6432

## 解题思路

这题主要是拆解字符串，题目本身不难，按照题意写好分支判断即可。如果觉得代码复杂，可以考虑使用正则表达式来做。

## Java

    
    
    import java.util.Scanner;
    
    public class CurrencyConverter {
    
        // 方法：根据货币单位返回其转换为人民币分的汇率
        public static double exChange(String unit) {
            switch (unit) {
                case "CNY":
                    return 100.0; // 人民币
                case "JPY":
                    return 100.0 / 1825 * 100; // 日元
                case "HKD":
                    return 100.0 / 123 * 100; // 港元
                case "EUR":
                    return 100.0 / 14 * 100; // 欧元
                case "GBP":
                    return 100.0 / 12 * 100; // 英镑
                case "fen":
                    return 1.0; // 人民币分
                case "cents":
                    return 100.0 / 123; // 港元分
                case "sen":
                    return 100.0 / 1825; // 日元分
                case "eurocents":
                    return 100.0 / 14; // 欧元分
                case "pence":
                    return 100.0 / 12; // 英镑分
                default:
                    return 0.0; // 无效单位返回0
            }
        }
     
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in); // 创建Scanner对象用于读取输入
            int n = Integer.parseInt(scanner.nextLine()); // 读取记录数
           
            
            double totalFen = 0; // 汇总结果
    
            // 处理每一条货币记录
            for (int i = 0; i < n; i++) {
                String record = scanner.nextLine(); // 读取每一行的记录
                int amount = 0; // 用于保存金额
                StringBuilder unit = new StringBuilder(); // 保存单位
    
                // 遍历当前行，逐个提取金额和单位
                for (int j = 0; j < record.length(); j++) {
                    char c = record.charAt(j);
                    if (Character.isDigit(c)) {
                        amount = amount * 10 + (c - '0'); // 构建数字
                    } else {
                        unit.append(c); // 构建货币单位
                    }
    
                    // 当遇到完整的金额+单位时进行换算
                    if (j == record.length() - 1 || Character.isDigit(record.charAt(j + 1)) && unit.length() > 0) {
                        totalFen += amount * exChange(unit.toString()); // 计算并累加到总数
                        amount = 0; // 重置金额
                        unit.setLength(0); // 清空单位
                    }
                }
            }
    
            // 输出汇总结果，只保留整数部分
            System.out.println((int) totalFen);
            scanner.close(); // 关闭Scanner对象
        }
    }
    

## Python

    
    
    def exChange(unit):
        # 根据货币单位返回其转换为人民币分的汇率
        if unit == "CNY":
            return 100.0  # 人民币
        elif unit == "JPY":
            return 100.0 / 1825 * 100  # 日元
        elif unit == "HKD":
            return 100.0 / 123 * 100  # 港元
        elif unit == "EUR":
            return 100.0 / 14 * 100  # 欧元
        elif unit == "GBP":
            return 100.0 / 12 * 100  # 英镑
        elif unit == "fen":
            return 1.0  # 人民币分
        elif unit == "cents":
            return 100.0 / 123  # 港元分
        elif unit == "sen":
            return 100.0 / 1825  # 日元分
        elif unit == "eurocents":
            return 100.0 / 14  # 欧元分
        elif unit == "pence":
            return 100.0 / 12  # 英镑分
        else:
            return 0.0  # 无效单位返回0
    
    
    def main():
        n = int(input())  # 读取记录数
        totalFen = 0.0  # 汇总结果
    
        # 处理每一条货币记录
        for _ in range(n):
            record = input()  # 读取每一行的记录
            amount = 0  # 用于保存金额
            unit = ""  # 保存单位
    
            # 遍历当前行，逐个提取金额和单位
            for j, c in enumerate(record):
                if c.isdigit():
                    amount = amount * 10 + int(c)  # 构建数字
                else:
                    unit += c  # 构建货币单位
    
                # 当遇到完整的金额+单位时进行换算
                if j == len(record) - 1 or (j + 1 < len(record) and record[j + 1].isdigit() and unit):
                    totalFen += amount * exChange(unit)  # 计算并累加到总数
                    amount = 0  # 重置金额
                    unit = ""  # 清空单位
    
        # 输出汇总结果，只保留整数部分
        print(int(totalFen))
    
    
    if __name__ == "__main__":
        main()
    

## JavaScript

    
    
    const readline = require('readline');
    
    // 根据货币单位返回其转换为人民币分的汇率
    function exChange(unit) {
        switch (unit) {
            case 'CNY':
                return 100.0; // 人民币
            case 'JPY':
                return 100.0 / 1825 * 100; // 日元
            case 'HKD':
                return 100.0 / 123 * 100; // 港元
            case 'EUR':
                return 100.0 / 14 * 100; // 欧元
            case 'GBP':
                return 100.0 / 12 * 100; // 英镑
            case 'fen':
                return 1.0; // 人民币分
            case 'cents':
                return 100.0 / 123; // 港元分
            case 'sen':
                return 100.0 / 1825; // 日元分
            case 'eurocents':
                return 100.0 / 14; // 欧元分
            case 'pence':
                return 100.0 / 12; // 英镑分
            default:
                return 0.0; // 无效单位返回0
        }
    }
    
     
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
     
    let input = [];
    rl.on('line', (line) => {
        input.push(line);
    }).on('close', () => {
        const n = parseInt(input[0]); // 读取记录数
        let totalFen = 0; // 汇总结果
    
        // 处理每一条货币记录
        for (let i = 1; i <= n; i++) {
            const record = input[i];
            let amount = 0; // 用于保存金额
            let unit = ''; // 保存单位
    
            // 遍历当前行，逐个提取金额和单位
            for (let j = 0; j < record.length; j++) {
                const c = record[j];
                if (/\d/.test(c)) {
                    amount = amount * 10 + parseInt(c); // 构建数字
                } else {
                    unit += c; // 构建货币单位
                }
    
                // 当遇到完整的金额+单位时进行换算
                if (j === record.length - 1 || (/\d/.test(record[j + 1]) && unit.length > 0)) {
                    totalFen += amount * exChange(unit); // 计算并累加到总数
                    amount = 0; // 重置金额
                    unit = ''; // 清空单位
                }
            }
        }
    
        // 输出汇总结果，只保留整数部分
        console.log(Math.floor(totalFen));
    });
    

## C++

    
    
    #include <iostream>
    #include <string>
    #include <cctype> // 用于 isdigit 函数
    #include <sstream> // 用于 stringstream
    
    using namespace std;
    
    // 根据货币单位返回其转换为人民币分的汇率
    double exChange(const string &unit) {
        if (unit == "CNY") {
            return 100.0; // 人民币
        } else if (unit == "JPY") {
            return 100.0 / 1825 * 100; // 日元
        } else if (unit == "HKD") {
            return 100.0 / 123 * 100; // 港元
        } else if (unit == "EUR") {
            return 100.0 / 14 * 100; // 欧元
        } else if (unit == "GBP") {
            return 100.0 / 12 * 100; // 英镑
        } else if (unit == "fen") {
            return 1.0; // 人民币分
        } else if (unit == "cents") {
            return 100.0 / 123; // 港元分
        } else if (unit == "sen") {
            return 100.0 / 1825; // 日元分
        } else if (unit == "eurocents") {
            return 100.0 / 14; // 欧元分
        } else if (unit == "pence") {
            return 100.0 / 12; // 英镑分
        } else {
            return 0.0; // 无效单位返回0
        }
    }
    
    int main() {
        int n;
        cin >> n; // 读取记录数
        cin.ignore(); // 忽略换行符
    
        double totalFen = 0; // 汇总结果
    
        // 处理每一条货币记录
        for (int i = 0; i < n; i++) {
            string record;
            getline(cin, record); // 读取每一行的记录
            int amount = 0; // 用于保存金额
            string unit; // 保存单位
    
            // 遍历当前行，逐个提取金额和单位
            for (size_t j = 0; j < record.length(); j++) {
                char c = record[j];
                if (isdigit(c)) {
                    amount = amount * 10 + (c - '0'); // 构建数字
                } else {
                    unit += c; // 构建货币单位
                }
    
                // 当遇到完整的金额+单位时进行换算
                if (j == record.length() - 1 || (isdigit(record[j + 1]) && !unit.empty())) {
                    totalFen += amount * exChange(unit); // 计算并累加到总数
                    amount = 0; // 重置金额
                    unit.clear(); // 清空单位
                }
            }
        }
    
        // 输出汇总结果，只保留整数部分
        cout << static_cast<int>(totalFen) << endl;
    
        return 0;
    }
    

## C语言

    
    
    #include <stdio.h>
    #include <string.h>
    #include <ctype.h>
    
    // 汇率转换函数，返回转换为人民币分的汇率
    double exChange(const char* unit) {
        if (strcmp(unit, "CNY") == 0)
            return 100.0; // 人民币元
        else if (strcmp(unit, "JPY") == 0)
            return 100.0 / 1825 * 100; // 日元
        else if (strcmp(unit, "HKD") == 0)
            return 100.0 / 123 * 100; // 港元
        else if (strcmp(unit, "EUR") == 0)
            return 100.0 / 14 * 100; // 欧元
        else if (strcmp(unit, "GBP") == 0)
            return 100.0 / 12 * 100; // 英镑
        else if (strcmp(unit, "fen") == 0)
            return 1.0; // 人民币分
        else if (strcmp(unit, "cents") == 0)
            return 100.0 / 123; // 港元分
        else if (strcmp(unit, "sen") == 0)
            return 100.0 / 1825; // 日元分
        else if (strcmp(unit, "eurocents") == 0)
            return 100.0 / 14; // 欧元分
        else if (strcmp(unit, "pence") == 0)
            return 100.0 / 12; // 英镑分
        else
            return 0.0; // 无效单位
    }
    
    int main() {
        int n;  // 记录数
        scanf("%d", &n);  // 读取记录数
        getchar();  // 读取换行符，避免影响后续输入
    
        double totalFen = 0;  // 汇总结果（人民币分）
    
        // 处理每一条货币记录
        for (int i = 0; i < n; i++) {
            char record[100];  // 保存输入的记录
            fgets(record, 100, stdin);  // 读取整行记录
    
            int amount = 0;  // 保存金额
            char unit[20] = "";  // 保存货币单位
            int len = strlen(record);
    
            // 解析每一条记录
            for (int j = 0; j < len; j++) {
                char c = record[j];
                if (isdigit(c)) {
                    amount = amount * 10 + (c - '0');  // 构建数字
                } else if (isalpha(c)) {
                    int k = 0;
                    while (j < len && isalpha(record[j])) {
                        unit[k++] = record[j++];  // 构建单位
                    }
                    unit[k] = '\0';  // 添加字符串终止符
                    totalFen += amount * exChange(unit);  // 计算并累加
                    amount = 0;  // 重置金额
                    unit[0] = '\0';  // 清空单位
                    j--;  // 回到当前字符（避免跳过字符）
                }
            }
    
            
        }
    
        // 输出汇总结果，只保留整数部分
        printf("%d\n", (int)totalFen);
    
        return 0;
    }
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

## 完整用例

### 用例1

    
    
    1
    100CNY
    

### 用例2

    
    
    1
    3000fen
    

### 用例3

    
    
    1
    123HKD
    

### 用例4

    
    
    2
    20CNY53fen
    53HKD87cents
    

### 用例5

    
    
    2
    100CNY
    100JPY
    

### 用例6

    
    
    3
    50EUR
    25GBP
    1000fen
    

### 用例7

    
    
    4
    5000sen
    1000cents
    200eurocents
    300pence
    

### 用例8

    
    
    3
    100HKD
    200JPY
    50EUR
    

### 用例9

    
    
    2
    1000pence
    5000eurocents
    

### 用例10

    
    
    4
    10CNY
    20JPY
    30HKD
    40EUR
    

