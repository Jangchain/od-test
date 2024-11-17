## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

华为商城举办了一个促销活动，如果某顾客是某一秒内最早时刻下单的顾客（可能是多个人），则可以获取免单。

请你编程计算有多少顾客可以获取免单。

####

## 输入描述

输入为 n 行数据，每一行表示一位顾客的下单时间

以（年-月-日时-分-秒.毫秒） yyyy-MM-ddHH:mm:ss.fff 形式给出。

  * `0<n<50000`
  * `2000<yyyy<2020`
  * `0<MM<=12`
  * `0<dd<=28`
  * `0<=HH<=23`
  * `0<=mm<=59`
  * `0<=ss<=59`
  * `0<=fff<=999`

所有输入保证合法。

## 输出描述

输出一个整数，表示有多少顾客可以获取免单。

## 示例1

输入

    
    
    3
    2019-01-01 00:00:00.001
    2019-01-01 00:00:00.002
    2019-01-01 00:00:00.003
    

输出

    
    
    1
    

说明

> 样例 1 中，三个订单都是同一秒内下单，只有第一个订单最早下单，可以免单。

## 示例2

输入

    
    
    3
    2019-01-01 08:59:00.123
    2019-01-01 08:59:00.123
    2018-12-28 10:08:00.999
    

输出

    
    
    3
    

说明

> 样例 2 中，前两个订单是同一秒内同一时刻（也是最早）下单，都可免单，第三个订单是当前秒内唯一一个订单（也是最早），也可免单。

## 示例3

输入

    
    
    5
    2019-01-01 00:00:00.004
    2019-01-01 00:00:00.004
    2019-01-01 00:00:01.006
    2019-01-01 00:00:01.006
    2019-01-01 00:00:01.005
    

输出

    
    
    3
    

说明

> 样例 3 中，前两个订单是同一秒内同一时刻（也是最早）下单，第三第四个订单不是当前秒内最早下单，不可免单，第五个订单可以免单。

## 解题思路

## Java

    
    
    import java.util.Scanner;
    import java.util.TreeMap;
    
    public class Main {
        public static void main(String[] args) {
            // 创建 Scanner 对象用于读取输入
            Scanner input = new Scanner(System.in);
            // 读取顾客数量
            int n = Integer.parseInt(input.nextLine());
     
            // 使用 TreeMap 存储订单时间，保证有序
            TreeMap<String, Integer> orderTime = new TreeMap<>();
    
            // 读取顾客订单时间并存入 TreeMap
            for (int i = 0; i < n; i++) {
                String time = input.nextLine();
                // 将订单时间作为键，值为该时间出现的次数
                orderTime.put(time, orderTime.getOrDefault(time, 0) + 1);
            }
    
            // 初始化免单顾客数量
            int freeOrders = 0;
            // 用于存储上一个订单的秒数
            String prevSecond = "";
    
            // 遍历 TreeMap 中的订单时间
            for (String time : orderTime.keySet()) {
                // 获取当前订单时间的秒数
                String currentSecond = time.substring(0, 19);
                // 如果当前订单秒数与上一个订单秒数不同，则将当前订单的数量加入免单顾客数
                if (!currentSecond.equals(prevSecond)) {
                    freeOrders += orderTime.get(time);
                    prevSecond = currentSecond;
                }
            }
    
            // 输出免单顾客数量
            System.out.println(freeOrders);
        }
    }
    
    
    

## Python

    
    
    from collections import OrderedDict
    
    # 创建函数用于读取输入
    def read_input():
        return input().strip()
    
    # 读取顾客数量
    n = int(read_input())
    
    # 使用 OrderedDict 存储订单时间，保证有序
    order_time = OrderedDict()
    
    # 读取顾客订单时间并存入 OrderedDict
    for _ in range(n):
        time = read_input()
        # 将订单时间作为键，值为该时间出现的次数
        order_time[time] = order_time.get(time, 0) + 1
    
    # 初始化免单顾客数量
    free_orders = 0
    # 用于存储上一个订单的秒数
    prev_second = ""
    
    # 遍历 OrderedDict 中的订单时间
    for time, count in order_time.items():
        # 获取当前订单时间的秒数
        current_second = time[:19]
        # 如果当前订单秒数与上一个订单秒数不同，则将当前订单的数量加入免单顾客数
        if current_second != prev_second:
            free_orders += count
            prev_second = current_second
    
    # 输出免单顾客数量
    print(free_orders)
    
    
    

## JavaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    // 创建数组用于存储输入行
    const lines = [];
    
    // 读取输入行
    rl.on('line', (line) => {
        lines.push(line);
    });
    
    // 当输入结束时，处理输入数据
    rl.on('close', () => {
        // 读取顾客数量
        const n = parseInt(lines.shift());
    
        // 使用 Map 存储订单时间，保证有序
        const orderTime = new Map();
    
        // 读取顾客订单时间并存入 Map
        for (let i = 0; i < n; i++) {
            const time = lines.shift();
            // 将订单时间作为键，值为该时间出现的次数
            orderTime.set(time, (orderTime.get(time) || 0) + 1);
        }
    
        // 初始化免单顾客数量
        let freeOrders = 0;
        // 用于存储上一个订单的秒数
        let prevSecond = "";
    
        // 遍历 Map 中的订单时间
        for (const [time, count] of orderTime) {
            // 获取当前订单时间的秒数
            const currentSecond = time.substring(0, 19);
            // 如果当前订单秒数与上一个订单秒数不同，则将当前订单的数量加入免单顾客数
            if (currentSecond !== prevSecond) {
                freeOrders += count;
                prevSecond = currentSecond;
            }
        }
    
        // 输出免单顾客数量
        console.log(freeOrders);
    });
    
    
    
    
    

## C++

    
    
    #include <iostream>
    #include <string>
    #include <map>
    
    // 创建函数用于读取输入
    std::string read_input() {
        std::string input;
        std::getline(std::cin, input);
        return input;
    }
    
    int main() {
        // 读取顾客数量
        int n;
        std::cin >> n;
        std::cin.ignore();
    
        // 使用 std::map 存储订单时间，保证有序
        std::map<std::string, int> order_time;
    
        // 读取顾客订单时间并存入 std::map
        for (int i = 0; i < n; ++i) {
            std::string time = read_input();
            // 将订单时间作为键，值为该时间出现的次数
            order_time[time]++;
        }
    
        // 初始化免单顾客数量
        int free_orders = 0;
        // 用于存储上一个订单的秒数
        std::string prev_second = "";
    
        // 遍历 std::map 中的订单时间
        for (const auto& kv : order_time) {
            std::string time = kv.first;
            int count = kv.second;
            // 获取当前订单时间的秒数
            std::string current_second = time.substr(0, 19);
            // 如果当前订单秒数与上一个订单秒数不同，则将当前订单的数量加入免单顾客数
            if (current_second != prev_second) {
                free_orders += count;
                prev_second = current_second;
            }
        }
    
        // 输出免单顾客数量
        std::cout << free_orders << std::endl;
    
        return 0;
    }
    
    

## C语言

    
    
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/c622ced6423fcdea4c48f00d3d0bf21d.png)

#### 完整用例

##### 用例1

    
    
    3
    2019-01-01 00:00:00.001
    2019-01-01 00:00:00.002
    2019-01-01 00:00:00.003
    

##### 用例2

    
    
    4
    2019-01-01 00:00:00.001
    2019-01-01 00:00:00.001
    2019-01-01 00:00:01.001
    2019-01-01 00:00:01.002
    

##### 用例3

    
    
    2
    2019-01-01 00:00:00.001
    2019-01-01 00:00:01.001
    

##### 用例4

    
    
    5
    2019-01-01 00:00:00.001
    2019-01-01 00:00:00.002
    2019-01-01 00:00:00.003
    2019-01-01 00:00:01.001
    2019-01-01 00:00:01.002
    

##### 用例5

    
    
    3
    2019-01-01 00:00:00.001
    2019-01-01 00:00:00.001
    2019-01-01 00:00:00.001
    

##### 用例6

    
    
    4
    2019-01-01 00:00:00.001
    2019-01-01 00:00:00.002
    2019-01-01 00:00:00.003
    2019-01-01 00:00:00.004
    

##### 用例7

    
    
    5
    2019-01-01 00:00:00.001
    2019-01-01 00:00:00.001
    2019-01-01 00:00:00.002
    2019-01-01 00:00:00.003
    2019-01-01 00:00:00.004
    

##### 用例8

    
    
    6
    2019-01-01 00:00:00.001
    2019-01-01 00:00:00.001
    2019-01-01 00:00:00.002
    2019-01-01 00:00:00.003
    2019-01-01 00:00:00.004
    2019-01-01 00:00:00.005v
    

##### 用例9

    
    
    3
    2019-01-01 00:00:00.001
    2019-01-01 00:00:00.002
    2019-01-01 00:00:01.001
    

##### 用例10

    
    
    4
    2019-01-01 00:00:00.001
    2019-01-01 00:00:00.002
    2019-01-01 00:00:01.001
    2019-01-01 00:00:01.002
    

