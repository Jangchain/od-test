## 题目描述

某业务需要根据终端的IP地址获取该终端归属的城市，可以根据公开的IP地址池信息查询归属城市。

地址池格式如下：

    
    
    城市名=起始IP,结束IP
    

起始和结束地址按照英文逗号分隔，多个地址段采用英文分号分隔。比如：

    
    
    City1=1.1.1.1,1.1.1.2;City1=1.1.1.11,1.1.1.16;City2=3.3.3.3,4.4.4.4;City3=2.2.2.2,6.6.6.6
    

一个城市可以有多个IP段，比如City1有2个IP段。

城市间也可能存在包含关系，如City3的IP段包含City2的IP段范围。

现在要根据输入的IP列表，返回最佳匹配的城市列表。

注：最佳匹配即包含待查询IP且长度最小的IP段，比如例子中3.4.4.4最佳匹配是City2=3.3.3.3,4.4.4.4，5.5.5.5的最佳匹配是City3=2.2.2.2,6.6.6.6

## 输入描述

输入共2行。

第一行为城市的IP段列表，多个IP段采用英文分号 ‘;’
分隔，IP段列表最大不超过500000。城市名称只包含英文字母、数字和下划线。最多不超过100000个。IP段包含关系可能有多层，但不超过100层。

第二行为查询的IP列表，多个IP采用英文逗号 ‘,’ 分隔，最多不超过10000条。

## 输出描述

最佳匹配的城市名列表，采用英文逗号 ‘,’ 分隔，城市列表长度应该跟查询的IP列表长度一致。

**备注**

  * 无论是否查到匹配正常都要输出分隔符。举例：假如输入IP列表为IPa,IPb，两个IP均未有匹配城市，此时输出为","，即只有一个逗号分隔符，两个城市均为空；
  * 可以假定用例中的所有输入均合法，IP地址均为合法的ipv4地址，满足 (1255).(0255).(0255).(0255) 的格式，且可以假定用例中不会出现组播和广播地址；

## 解题思路

  1. 解析输入的IP地址池字符串，将其转换为每个城市对应的IP范围列表的映射。
  2. 解析输入的查询IP字符串，将其分割成单独的IP地址。
  3. 对于每个查询IP地址，将其转换为长整型数值以便比较。
  4. 遍历每个城市的IP范围列表，检查查询IP是否落在某个范围内。
  5. 如果查询IP落在某个范围内，计算该范围的大小，并与当前已知的最小范围进行比较。
  6. 如果当前范围更小，更新最佳匹配城市和最小范围。
  7. 将最佳匹配城市添加到结果字符串中。

将IP地址转换成长整型数值（通常是64位的整数）是为了方便比较和计算。IP地址通常以点分十进制格式呈现，如
`192.168.1.1`，这种格式不便于直接进行数学运算或比较。转换成长整型数值后，IP地址就变成了一个数值，可以轻松地进行比较和范围检查。

例如，对于IP地址 `192.168.1.1`：

  * 将每个十进制块转换为二进制形式：`11000000.10101000.00000001.00000001`
  * 将这些二进制块拼接成一个32位的二进制数：`11000000101010000000000100000001`
  * 将这个二进制数转换为长整型数值：`3232235777`

这样，IP地址就可以像普通的整数一样参与计算和比较操作，使得IP范围匹配变得简单高效。

## C++

    
    
    #include <iostream>
    #include <sstream>
    #include <vector>
    #include <map>
    #include <string>
    #include <climits>
    using namespace std;
    
    // IP范围结构体
    struct IpRange {
        long start; // 起始IP的长整型数
        long end;   // 结束IP的长整型数
    
        // 构造函数
        IpRange(long s, long e) : start(s), end(e) {}
    };
    
    // 将字符串形式的IP地址转换为长整型数
    long ipToLong(const string& ip) {
        long result = 0;
        istringstream ss(ip);
        string block;
    
        while (getline(ss, block, '.')) {
            result = (result << 8) + stoi(block);
        }
    
        return result;
    }
    
    // 解析IP地址池字符串，返回城市名到IP范围列表的映射
    map<string, vector<IpRange>> parseIpPool(const string& ipPool) {
        map<string, vector<IpRange>> cityIpRanges;
        istringstream ss(ipPool);
        string cityRange;
    
        while (getline(ss, cityRange, ';')) {
            auto pos = cityRange.find('=');
            string city = cityRange.substr(0, pos);
            string ranges = cityRange.substr(pos + 1);
            auto rangePos = ranges.find(',');
    
            long start = ipToLong(ranges.substr(0, rangePos));
            long end = ipToLong(ranges.substr(rangePos + 1));
    
            cityIpRanges[city].emplace_back(start, end);
        }
    
        return cityIpRanges;
    }
    
    // 根据IP地址池和查询IP列表，返回最佳匹配城市列表的字符串
    string matchCities(const string& ipPool, const string& queryIPs) {
        auto cityIpRanges = parseIpPool(ipPool);
        istringstream ss(queryIPs);
        string ip;
        string result;
    
        while (getline(ss, ip, ',')) {
            long ipNum = ipToLong(ip);
            string bestMatchCity;
            long smallestRange = LONG_MAX;
    
            for (const auto& entry : cityIpRanges) {
                for (const auto& range : entry.second) {
                    if (ipNum >= range.start && ipNum <= range.end) {
                        long rangeSize = range.end - range.start;
                        if (rangeSize < smallestRange) {
                            bestMatchCity = entry.first;
                            smallestRange = rangeSize;
                        }
                    }
                }
            }
    
            result += bestMatchCity + ",";
        }
    
        if (!result.empty()) {
            result.pop_back(); // 删除最后一个逗号
        }
    
        return result;
    }
    
    int main() {
        string ipPool, queryIPs;
    
        // 读取IP地址池和查询IP列表
        getline(cin, ipPool);
        getline(cin, queryIPs);
    
        // 输出匹配的城市列表
        cout << matchCities(ipPool, queryIPs) << endl;
    
        return 0;
    }
    

## Java

    
    
    import java.util.*;
    
    public class Main {
    
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            String ipPool = scanner.nextLine(); // 读取IP地址池
            String queryIPs = scanner.nextLine(); // 读取查询IP列表
     
            // 输出匹配的城市列表
            System.out.println(matchCities(ipPool, queryIPs));
        }
    
        // 匹配城市的方法
        private static String matchCities(String ipPool, String queryIPs) {
            // 解析IP地址池，将其转换为城市与IP范围列表的映射
            Map<String, List<IpRange>> cityIpRanges = parseIpPool(ipPool);
            // 将查询IP列表按逗号分隔
            String[] ipsToQuery = queryIPs.split(",");
            StringBuilder result = new StringBuilder(); // 用于构建结果字符串
    
            // 遍历每个查询IP
            for (String ip : ipsToQuery) {
                long ipNum = ipToLong(ip); // 将IP地址转换为长整型数
                String bestMatchCity = ""; // 最佳匹配城市
                long smallestRange = Long.MAX_VALUE; // 最小的IP范围
    
                // 遍历每个城市的IP范围
                for (Map.Entry<String, List<IpRange>> entry : cityIpRanges.entrySet()) {
                    for (IpRange range : entry.getValue()) {
                        // 如果IP在当前范围内
                        if (ipNum >= range.start && ipNum <= range.end) {
                            long rangeSize = range.end - range.start; // 计算当前IP范围的大小
                            // 如果当前范围更小，则更新最佳匹配城市和最小范围
                            if (rangeSize < smallestRange) {
                                bestMatchCity = entry.getKey();
                                smallestRange = rangeSize;
                            }
                        }
                    }
                }
    
                // 将最佳匹配城市添加到结果中
                result.append(bestMatchCity).append(",");
            }
    
            // 返回结果字符串，去除最后一个逗号
            return result.length() > 0 ? result.substring(0, result.length() - 1) : result.toString();
        }
    
        // 解析IP地址池的方法
        private static Map<String, List<IpRange>> parseIpPool(String ipPool) {
            Map<String, List<IpRange>> cityIpRanges = new HashMap<>();
            String[] cityRanges = ipPool.split(";"); // 按分号分隔城市IP范围
    
            // 遍历每个城市的IP范围
            for (String cityRange : cityRanges) {
                String[] parts = cityRange.split("="); // 按等号分隔城市名和IP范围
                String city = parts[0];
                String[] ranges = parts[1].split(","); // 按逗号分隔起始和结束IP
    
                long start = ipToLong(ranges[0]); // 将起始IP转换为长整型数
                long end = ipToLong(ranges[1]); // 将结束IP转换为长整型数
    
                // 将城市和对应的IP范围添加到映射中
                cityIpRanges.putIfAbsent(city, new ArrayList<>());
                cityIpRanges.get(city).add(new IpRange(start, end));
            }
    
            return cityIpRanges;
        }
    
        // 将IP地址转换为长整型数的方法
        private static long ipToLong(String ip) {
            String[] octets = ip.split("\\."); // 按点分隔IP地址
            long result = 0;
            for (String octet : octets) {
                result = result << 8; // 每个八位数左移8位
                result |= Integer.parseInt(octet); // 将当前八位数添加到结果中
            }
            return result;
        }
    
        // 内部类，表示IP范围
        static class IpRange {
            long start; // 起始IP的长整型数
            long end; // 结束IP的长整型数
    
            // 构造函数
            IpRange(long start, long end) {
                this.start = start;
                this.end = end;
            }
        }
    }
    

## javaScript

    
    
    const readline = require('readline');
    
    // 创建readline接口实例
    const rl = readline.createInterface({
      input: process.stdin, // 设置标准输入
      output: process.stdout // 设置标准输出
    });
    
    // 将IP地址转换为长整型数的函数
    function ipToLong(ip) {
      // 使用split('.')将IP地址分割为四部分，然后使用reduce方法累加每部分
      return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0);
    }
    
    // 解析IP地址池的函数
    function parseIpPool(ipPool) {
      const cityIpRanges = {}; // 创建一个对象用于存储城市和对应的IP范围
      ipPool.split(';').forEach(cityRange => {
        const [city, range] = cityRange.split('='); // 分割字符串获取城市名和IP范围
        const [startIp, endIp] = range.split(','); // 分割字符串获取起始IP和结束IP
        const start = ipToLong(startIp); // 将起始IP转换为长整型数
        const end = ipToLong(endIp); // 将结束IP转换为长整型数
        if (!cityIpRanges[city]) cityIpRanges[city] = []; // 如果对象中不存在该城市，则初始化一个空数组
        cityIpRanges[city].push({ start, end }); // 将IP范围对象添加到对应城市的数组中
      });
      return cityIpRanges; // 返回解析后的城市IP范围对象
    }
    
    // 匹配城市的函数
    function matchCities(ipPool, queryIPs) {
      const cityIpRanges = parseIpPool(ipPool); // 调用parseIpPool函数解析IP池
      return queryIPs.split(',').map(ip => {
        const ipNum = ipToLong(ip); // 将查询的IP地址转换为长整型数
        let bestMatchCity = ''; // 初始化最佳匹配城市为空字符串
        let smallestRange = Number.MAX_SAFE_INTEGER; // 初始化最小范围为最大安全整数
        for (const city in cityIpRanges) { // 遍历城市IP范围对象
          cityIpRanges[city].forEach(range => {
            if (ipNum >= range.start && ipNum <= range.end) { // 判断IP是否在当前范围内
              const rangeSize = range.end - range.start; // 计算当前范围的大小
              if (rangeSize < smallestRange) { // 如果当前范围小于已知的最小范围
                bestMatchCity = city; // 更新最佳匹配城市
                smallestRange = rangeSize; // 更新最小范围
              }
            }
          });
        }
        return bestMatchCity; // 返回最佳匹配城市
      }).join(','); // 将匹配结果数组转换为字符串，并用逗号分隔
    }
    
    // 读取输入
    let lines = []; // 初始化一个数组用于存储输入的每一行
    rl.on('line', line => {
      lines.push(line); // 将每一行输入添加到数组中
    }).on('close', () => {
      // 当输入结束时，调用matchCities函数并输出匹配的城市列表
      console.log(matchCities(lines[0], lines[1]));
    });
    

## Python

    
    
    import sys
    
    # 将IP地址转换为长整型数的函数
    def ip_to_long(ip):
        # 分割IP地址为四个八位字节，并转换为整型
        octets = map(int, ip.split('.'))
        # 将四个八位字节转换为一个长整型数
        return sum(octet << (8 * (3 - index)) for index, octet in enumerate(octets))
    
    # 解析IP地址池的函数
    def parse_ip_pool(ip_pool):
        # 创建一个字典，用于存储城市及其对应的IP范围
        city_ip_ranges = {}
        # 分割IP池字符串，获取每个城市及其IP范围
        for city_range in ip_pool.split(';'):
            # 分割得到城市名和IP范围
            city, ranges = city_range.split('=')
            # 分割得到起始IP和结束IP
            start_ip, end_ip = ranges.split(',')
            # 将起始IP和结束IP转换为长整型数
            start = ip_to_long(start_ip)
            end = ip_to_long(end_ip)
            # 如果城市不在字典中，则添加城市并初始化IP范围列表
            if city not in city_ip_ranges:
                city_ip_ranges[city] = []
            # 将IP范围添加到城市的IP范围列表中
            city_ip_ranges[city].append((start, end))
        # 返回城市及其IP范围的字典
        return city_ip_ranges
    
    # 匹配城市的函数
    def match_cities(ip_pool, query_ips):
        # 解析IP池，获取城市及其IP范围的字典
        city_ip_ranges = parse_ip_pool(ip_pool)
        # 创建一个列表，用于存储查询结果
        result = []
        # 分割查询IP列表，逐个处理
        for ip in query_ips.split(','):
            # 将IP地址转换为长整型数
            ip_num = ip_to_long(ip)
            # 初始化最佳匹配城市为空字符串
            best_match_city = ''
            # 初始化最小范围为系统最大整数
            smallest_range = sys.maxsize
            # 遍历所有城市及其IP范围
            for city, ranges in city_ip_ranges.items():
                # 遍历城市的IP范围
                for start, end in ranges:
                    # 判断当前IP是否在范围内
                    if start <= ip_num <= end:
                        # 计算当前范围的大小
                        range_size = end - start
                        # 如果当前范围小于已知的最小范围，则更新最佳匹配城市和最小范围
                        if range_size < smallest_range:
                            best_match_city = city
                            smallest_range = range_size
            # 将最佳匹配城市添加到结果列表中
            result.append(best_match_city)
        # 将结果列表转换为字符串，并用逗号分隔
        return ','.join(result)
    
    # 读取输入
    ip_pool = input()  # 读取IP地址池
    query_ips = input()  # 读取查询IP列表
    
    # 输出匹配的城市列表
    print(match_cities(ip_pool, query_ips))
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    #include <string.h>
    #include <limits.h> // 为了使用LONG_MAX
    
    #define CITY_NAME_LENGTH 100
    #define MAX_RANGES 1024
    #define MAX_IP_LEN 15
    #define MAX_LINE_LEN 10000
    
    // 声明ipToLong函数
    long ipToLong(const char *ip);
    
    // 定义IP范围结构体
    typedef struct {
        char city[CITY_NAME_LENGTH];
        long startIpDec;
        long endIpDec;
        long ipLen;
    } Range;
    
    // 创建新的Range实例
    Range new_Range(const char* city, const char* startIpStr, const char* endIpStr) {
        Range range;
        strncpy(range.city, city, CITY_NAME_LENGTH);
        range.startIpDec = ipToLong(startIpStr);
        range.endIpDec = ipToLong(endIpStr);
        range.ipLen = range.endIpDec - range.startIpDec;
        return range;
    }
    
    // 将IP地址转换为长整数的函数
    long ipToLong(const char *ip) {
        long result = 0;
        int part;
        while (*ip) {
            part = strtol(ip, (char **)&ip, 10);
            result = (result << 8) + part;
            if (*ip == '.') ip++;
        }
        return result;
    }
    
    // 匹配查询IP并返回对应城市的函数
    void matchCities(Range ranges[], int rangeSize, const char* queryIPs, char* result) {
        char queryIPsCopy[MAX_LINE_LEN];
        strncpy(queryIPsCopy, queryIPs, MAX_LINE_LEN);
        queryIPsCopy[MAX_LINE_LEN - 1] = '\0';
    
        char* token = strtok(queryIPsCopy, ",");
        char bestMatchCity[CITY_NAME_LENGTH];
        while (token) {
            long ipNum = ipToLong(token);
            bestMatchCity[0] = '\0'; // 初始化最佳匹配城市为空字符串
            long smallestRange = LONG_MAX;
    
            for (int i = 0; i < rangeSize; i++) {
                if (ipNum >= ranges[i].startIpDec && ipNum <= ranges[i].endIpDec) {
                    long rangeSize = ranges[i].ipLen;
                    if (rangeSize < smallestRange) {
                        strncpy(bestMatchCity, ranges[i].city, CITY_NAME_LENGTH);
                        smallestRange = rangeSize;
                    }
                }
            }
    
            if (bestMatchCity[0] != '\0') {
                strcat(result, bestMatchCity);
            }
            strcat(result, ",");
            token = strtok(NULL, ",");
        }
    
        // 移除结果字符串末尾的逗号
        if (strlen(result) > 0) {
            result[strlen(result) - 1] = '\0';
        }
    }
    
    // main函数：读取输入，解析IP池和查询IP，输出匹配的城市列表
    int main() {
        char ipPool[MAX_LINE_LEN];
        char queryIPs[MAX_LINE_LEN];
        char result[MAX_LINE_LEN] = "";
    
        // 读取IP地址池和查询IP列表
        fgets(ipPool, MAX_LINE_LEN, stdin);
        fgets(queryIPs, MAX_LINE_LEN, stdin);
        ipPool[strcspn(ipPool, "\n")] = '\0';
        queryIPs[strcspn(queryIPs, "\n")] = '\0';
    
        // 解析IP地址池
        Range ranges[MAX_RANGES];
        int ranges_size = 0;
        char* token1 = strtok(ipPool, ";");
        while (token1) {
            char city[CITY_NAME_LENGTH] = {'\0'};
            char startIpStr[MAX_IP_LEN] = {'\0'};
            char endIpStr[MAX_IP_LEN] = {'\0'};
            
            sscanf(token1, "%[^=]=%[^,],%[^,]", city, startIpStr, endIpStr);
            ranges[ranges_size++] = new_Range(city, startIpStr, endIpStr);
            
            token1 = strtok(NULL, ";");
        }
    
        // 匹配查询IP并输出结果
        matchCities(ranges, ranges_size, queryIPs, result);
        printf("%s\n", result);
    
        return 0;
    }
    

## 完整用例

### 用例1

    
    
    City1=1.1.1.1,1.1.1.10;City2=1.1.1.5,1.1.1.15;City3=1.1.1.20,1.1.1.25
    1.1.1.7,1.1.1.22
    

### 用例2

    
    
    City1=10.0.0.1,10.0.0.10;City2=10.0.0.5,10.0.0.15;City3=10.0.0.20,10.0.0.25;City4=10.0.0.1,10.0.0.25
    10.0.0.2,10.0.0.21
    

### 用例3

    
    
    City1=1.1.1.1,9.9.9.9;City2=2.2.2.2,8.8.8.8;City3=3.3.3.3,7.7.7.7;City4=4.4.4.4,6.6.6.6;City6=6.6.6.6,4.4.4.4;City7=7.7.7.7,3.3.3.3;City8=8.8.8.8,2.2.2.2;City9=9.9.9.9,1.1.1.1
    7.2.6.10,7.8.2.6,5.7.3.10,10.3.2.6,3.9.7.3
    

### 用例4

    
    
    City1=17.17.17.1,17.17.17.10;City2=18.18.18.1,18.18.18.10
    19.19.19.1,20.20.20.1
    

### 用例5

    
    
    City1=16.16.16.1,16.16.16.200;City2=16.16.16.100,16.16.16.110
    16.16.16.105
    

### 用例6

    
    
    City1=15.15.15.1,15.15.15.50;City2=15.15.15.50,15.15.15.100
    15.15.15.50
    

### 用例7

    
    
    City1=14.14.14.1,14.14.14.100;City2=14.14.14.50,14.14.14.60;City3=14.14.14.60,14.14.14.70
    14.14.14.60
    

### 用例8

    
    
    City1=11.11.11.1,11.11.11.10;City2=12.12.12.1,12.12.12.10
    11.11.11.5,12.12.12.5,13.13.13.5
    

### 用例9

    
    
    City1=7.7.7.1,7.7.7.100;City2=7.7.7.10,7.7.7.90;City3=7.7.7.20,7.7.7.80
    7.7.7.25,7.7.7.85
    

### 用例10

    
    
    city_1=1.1.1.1,3.3.3.100;city_2=2.2.2.2,3.3.3.200
    2.3.4.5,5.4.3.2,5.4.4.5
    

#### 文章目录

  * 题目描述
  * 输入描述
  * 输出描述
  * 解题思路
  * C++
  * Java
  * javaScript
  * Python
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

![fengmian](https://i-blog.csdnimg.cn/blog_migrate/da46f0f2c8e433613f650051862accc4.png)

