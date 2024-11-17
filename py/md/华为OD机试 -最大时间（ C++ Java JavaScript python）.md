#### 题目描述

给定一个数组，里面有 6 个整数，求这个数组能够表示的最大 24 进制的时间是多少，输出这个时间，无法表示输出 invalid。

#### 输入描述

输入为一个整数数组，数组内有六个整数。

输入整数数组长度为 6，不需要考虑其它长度，元素值为 0 或者正整数，6 个数字每个数字只能使用一次。

#### 输出描述

输出为一个 24 进制格式的时间，或者字符串”invalid“。

#### 用例

输入

    
    
    [0,2,3,0,5,6]
    

输出

    
    
    23:56:00
    

#### 机考代码查重

华为OD机考完成之后，官方会进行代码查重。**华为 od 机考确实有很大的概率抽到原题**
。如果碰到了题库中的原题，一定不要直接使用题解中的代码，尤其是变量名，一定要修改，可以改成毫无意义的单词。除了变量名之外，代码的组织结构和逻辑一定要进行改变，这就要求在日常的刷题中，提前编写好属于自己的代码。

##### 解题思路

  1. 首先，读取输入数据，包括一个长度为6的整数数组。数组中的每个元素表示一个数字，范围为0到正整数。

  2. 使用深度优先搜索（DFS）算法遍历所有可能的数字组合。在DFS过程中，维护一个路径列表，用于存储当前的数字组合。同时，使用一个布尔数组来记录每个数字是否已经被使用。

  3. 当路径长度等于数组长度时，尝试生成一个时间字符串。将路径中的数字按顺序组合成一个格式为`HH:mm:ss`的时间字符串。

  4. 使用`isValidTime`函数检查生成的时间字符串是否有效。有效的时间字符串需要满足以下条件：

     * 小时（HH）的范围为0到23
     * 分钟（mm）的范围为0到59
     * 秒钟（ss）的范围为0到59
  5. 在DFS过程中，不断更新最大有效时间字符串。如果当前时间字符串有效且大于已找到的最大有效时间字符串，则更新最大有效时间字符串。

  6. DFS遍历完成后，返回找到的最大有效时间字符串。如果没有找到有效的时间字符串，则输出"invalid"。

#### C++

    
    
    #include <iostream>
    #include <sstream>
    #include <vector>
    #include <string>
    #include <list>
    #include <algorithm>
    
    std::string dfs(const std::vector<int> &arr, std::vector<bool> &used, std::list<int> &path);
    bool isValidTime(int hour, int minute, int second);
    
    int main() {
        // 读取一行输入并去掉首尾的方括号，然后按逗号分割
        std::string s;
        std::getline(std::cin, s);
        s = s.substr(1, s.length() - 2);
        std::istringstream iss(s);
        std::string token;
        std::vector<int> arr;
    
        // 将分割后的字符串转换为整数数组
        while (std::getline(iss, token, ',')) {
            arr.push_back(std::stoi(token));
        }
    
        // 调用 dfs 函数找到最大的有效时间
        std::vector<bool> used(arr.size(), false);
        std::list<int> path;
        std::string maxTime = dfs(arr, used, path);
    
        // 如果 maxTime 为 null，则输出 "invalid"，否则输出 maxTime
        std::cout << (maxTime.empty() ? "invalid" : maxTime) << std::endl;
        return 0;
    }
    
    // dfs 函数用于递归地搜索所有可能的时间组合，并返回最大的有效时间
    std::string dfs(const std::vector<int> &arr, std::vector<bool> &used, std::list<int> &path) {
        // 当路径长度等于数组长度时，尝试生成一个时间字符串
        if (path.size() == arr.size()) {
            int hour = path.front() * 10 + *(++path.begin());
            int minute = path.back() * 10 + *(--(--path.end()));
            int second = *(--(--(--path.end()))) * 10 + *(--(--(--(--path.end()))));
            // 如果时间有效，则返回该时间字符串，否则返回空字符串
            if (isValidTime(hour, minute, second)) {
                char buffer[9];
                snprintf(buffer, sizeof(buffer), "%02d:%02d:%02d", hour, minute, second);
                return std::string(buffer);
            } else {
                return "";
            }
        }
    
        std::string maxTime;
        // 遍历数组中的每个元素
        for (size_t i = 0; i < arr.size(); i++) {
            // 如果当前元素未被使用过，则将其添加到路径中，并标记为已使用
            if (!used[i]) {
                path.push_back(arr[i]);
                used[i] = true;
                // 递归调用 dfs 函数
                std::string currentTime = dfs(arr, used, path);
                // 如果当前时间字符串有效且大于 maxTime，则更新 maxTime
                if (!currentTime.empty() && (maxTime.empty() || currentTime > maxTime)) {
                    maxTime = currentTime;
                }
                // 回溯，将当前元素从路径中移除，并标记为未使用
                used[i] = false;
                path.pop_back();
            }
        }
    
        // 返回找到的最大有效时间
        return maxTime;
    }
    
    // isValidTime 函数用于检查给定的小时、分钟和秒是否构成有效的 24 小时制时间
    bool isValidTime(int hour, int minute, int second) {
        return hour >= 0 && hour <= 23 && minute >= 0 && minute <= 59 && second >= 0 && second <= 59;
    }
    
    

#### JavaScript

    
    
    const readline = require('readline');
    
    function dfs(arr, used, path) {
        if (path.length === arr.length) {
            const hour = path[0] * 10 + path[1];
            const minute = path[2] * 10 + path[3];
            const second = path[4] * 10 + path[5];
            return isValidTime(hour, minute, second) ? `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}` : null;
        }
    
        let maxTime = null;
        for (let i = 0; i < arr.length; i++) {
            if (!used[i]) {
                path.push(arr[i]);
                used[i] = true;
                const currentTime = dfs(arr, used, path);
                if (currentTime !== null && (maxTime === null || currentTime > maxTime)) {
                    maxTime = currentTime;
                }
                used[i] = false;
                path.pop();
            }
        }
    
        return maxTime;
    }
    
    function isValidTime(hour, minute, second) {
        return hour >= 0 && hour <= 23 && minute >= 0 && minute <= 59 && second >= 0 && second <= 59;
    }
    
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    rl.on('line', (input) => {
        const arr = input.slice(1, -1).split(',').map(x => parseInt(x.trim()));
        const maxTime = dfs(arr, new Array(arr.length).fill(false), []);
        console.log(maxTime === null ? 'invalid' : maxTime);
        rl.close();
    });
    
    
    
    

#### Java

    
    
    import java.util.LinkedList;
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            // 创建一个 Scanner 对象用于读取输入
            Scanner sc = new Scanner(System.in);
            // 读取一行输入并去掉首尾的方括号，然后按逗号分割
            String s = sc.nextLine();
            String[] input = s.substring(1, s.length() - 1).split(",");
            // 将分割后的字符串数组转换为整数数组
            Integer[] arr = new Integer[input.length];
            for (int i = 0; i < input.length; i++) {
                arr[i] = Integer.parseInt(input[i].trim());
            }
    
            // 调用 dfs 函数找到最大的有效时间
            String maxTime = dfs(arr, new boolean[arr.length], new LinkedList<>());
            // 如果 maxTime 为 null，则输出 "invalid"，否则输出 maxTime
            System.out.println(maxTime == null ? "invalid" : maxTime);
        }
    
        // dfs 函数用于递归地搜索所有可能的时间组合，并返回最大的有效时间
        public static String dfs(Integer[] arr, boolean[] used, LinkedList<Integer> path) {
            // 当路径长度等于数组长度时，尝试生成一个时间字符串
            if (path.size() == arr.length) {
                int hour = path.get(0) * 10 + path.get(1);
                int minute = path.get(2) * 10 + path.get(3);
                int second = path.get(4) * 10 + path.get(5);
                // 如果时间有效，则返回该时间字符串，否则返回 null
                return isValidTime(hour, minute, second) ? String.format("%02d:%02d:%02d", hour, minute, second) : null;
            }
    
            String maxTime = null;
            // 遍历数组中的每个元素
            for (int i = 0; i < arr.length; i++) {
                // 如果当前元素未被使用过，则将其添加到路径中，并标记为已使用
                if (!used[i]) {
                    path.add(arr[i]);
                    used[i] = true;
                    // 递归调用 dfs 函数
                    String currentTime = dfs(arr, used, path);
                    // 如果当前时间字符串有效且大于 maxTime，则更新 maxTime
                    if (currentTime != null && (maxTime == null || currentTime.compareTo(maxTime) > 0)) {
                        maxTime = currentTime;
                    }
                    // 回溯，将当前元素从路径中移除，并标记为未使用
                    used[i] = false;
                    path.removeLast();
                }
            }
    
            // 返回找到的最大有效时间
            return maxTime;
        }
    
        // isValidTime 函数用于检查给定的小时、分钟和秒是否构成有效的 24 小时制时间
        public static boolean isValidTime(int hour, int minute, int second) {
            return hour >= 0 && hour <= 23 && minute >= 0 && minute <= 59 && second >= 0 && second <= 59;
        }
    }
    
    
    

#### Python

    
    
    def is_valid_time(hour, minute, second):
        # isValidTime 函数用于检查给定的小时、分钟和秒是否构成有效的 24 小时制时间
        return 0 <= hour <= 23 and 0 <= minute <= 59 and 0 <= second <= 59
    
    def dfs(arr, used, path):
        # 当路径长度等于数组长度时，尝试生成一个时间字符串
        if len(path) == len(arr):
            hour, minute, second = path[0] * 10 + path[1], path[2] * 10 + path[3], path[4] * 10 + path[5]
            # 如果时间有效，则返回该时间字符串，否则返回 None
            return f"{hour:02d}:{minute:02d}:{second:02d}" if is_valid_time(hour, minute, second) else None
    
        max_time = None
        # 遍历数组中的每个元素
        for i in range(len(arr)):
            # 如果当前元素未被使用过，则将其添加到路径中，并标记为已使用
            if not used[i]:
                path.append(arr[i])
                used[i] = True
                # 递归调用 dfs 函数
                current_time = dfs(arr, used, path)
                # 如果当前时间字符串有效且大于 maxTime，则更新 maxTime
                if current_time is not None and (max_time is None or current_time > max_time):
                    max_time = current_time
                # 回溯，将当前元素从路径中移除，并标记为未使用
                used[i] = False
                path.pop()
    
        # 返回找到的最大有效时间
        return max_time
    
    # 读取一行输入并去掉首尾的方括号，然后按逗号分割
    s = input().strip()[1:-1]
    input_arr = list(map(int, s.split(",")))
    
    # 调用 dfs 函数找到最大的有效时间
    max_time = dfs(input_arr, [False] * len(input_arr), [])
    
    # 如果 maxTime 为 None，则输出 "invalid"，否则输出 maxTime
    print("invalid" if max_time is None else max_time)
    
    
    

#### 完整用例

##### 用例1

[0,0,0,0,0,0]

##### 用例2

[1,2,3,4,5,6]

##### 用例3

[0,0,0,1,2,3]

##### 用例4

[2,4,6,8,10,12]

##### 用例5

[5,4,3,2,1,0]

##### 用例6

[1,1,2,2,3,3]

##### 用例7

[0,1,2,3,4,5]

##### 用例8

[9,8,7,6,5,4]

##### 用例9

[4,3,2,1,0,0]

##### 用例10

[1,2,3,4,5,0]

#### 文章目录

  *     *       * 题目描述
      * 输入描述
      * 输出描述
      * 用例
      * 机考代码查重
      *         * 解题思路
      * C++
      * JavaScript
      * Java
      * Python
      * 完整用例
      *         * 用例1
        * 用例2
        * 用例3
        * 用例4
        * 用例5
        * 用例6
        * 用例7
        * 用例8
        * 用例9
        * 用例10

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

