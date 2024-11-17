## 题目描述

攀登者喜欢寻找各种地图，并且尝试攀登到最高的山峰。

地图表示为一维数组，数组的索引代表水平位置，数组的元素代表相对海拔高度。其中数组元素0代表地面。

例如：[0,1,2,4,3,1,0,0,1,2,3,1,2,1,0]，代表如下图所示的地图，地图中有两个山脉位置分别为 1,2,3,4,5 和
8,9,10,11,12,13，最高峰高度分别为 4,3。最高峰位置分别为3,10。

![image-20240113223947151](https://i-blog.csdnimg.cn/blog_migrate/404e612b8b9a01eeef929a0dd227bb15.png)

一个山脉可能有多座山峰(高度大于相邻位置的高度，或在地图边界且高度大于相邻的高度)。  
登山时会消耗登山者的体力(整数)，

  * 上山时，消耗相邻高度差两倍的体力
  * 下山时，消耗相邻高度差一倍的体力
  * 平地不消耗体力
  * 登山者体力消耗到零时会有生命危险。

例如，上图所示的山峰：

  * 从索引0，走到索引1，高度差为1，需要消耗 2 * 1 = 2 的体力，
  * 从索引2，走到索引3，高度差为2，需要消耗 2 * 2 = 4 的体力。
  * 从索引3，走到索引4，高度差为1，需要消耗 1 * 1 = 1 的体力。

攀登者想要评估一张地图内有多少座山峰可以进行攀登，且可以安全返回到地面，且无生命危险。

例如上图中的数组，有3个不同的山峰，登上位置在3的山可以从位置0或者位置6开始，从位置0登到山顶需要消耗体力 1 * 2 + 1 * 2 + 2 * 2 =
8，从山顶返回到地面0需要消耗体力 2 * 1 + 1 * 1 + 1 * 1 = 4 的体力，按照登山路线 0 → 3 → 0
需要消耗体力12。攀登者至少需要12以上的体力（大于12）才能安全返回。

## 输入描述

第一行输入为地图一维数组

第二行输入为攀登者的体力

## 输出描述

确保可以安全返回地面，且无生命危险的情况下，地图中有多少山峰可以攀登。

## 用例1

输入

    
    
    0,1,4,3,1,0,0,1,2,3,1,2,1,0
    13
    

输出

    
    
    3
    

说明

> 登山者只能登上位置10和12的山峰，7 → 10 → 7，14 → 12 → 14

## 用例2

输入

    
    
    1,4,3
    999
    

输出

    
    
    1,4,3
    999
    

说明

> 没有合适的起点和终点

## 解题思路

注意本题为Lettcode，不需要处理输入。只需要实现函数。

  1. 首先，通过遍历山峰地图，找出所有的山峰，并将它们的索引存储在一个向量中。这里的山峰是指其高度大于其左右两侧的地方。
  2. 然后，对于每一个山峰，计算从该山峰向左和向右分别需要消耗多少力量才能到达山谷。这里的力量消耗是根据高度差乘以一个系数来计算的。
  3. 如果在向左或向右的过程中，消耗的力量小于给定的力量值，并且遇到了山谷（即高度为0的地方），那么就认为这个山峰是可以攀登的，于是将可攀登的山峰数量加1。

## C++

    
    
    #include <iostream>  // 引入输入输出流库
    #include <vector>  // 引入向量库
    #include <sstream>  // 引入字符串流库
    using namespace std;  // 使用标准命名空间
    
    // 定义一个函数，计算可攀登的山峰数量
    int count_climbable(vector<int>& hill_map, int strength) {
        int hills = 0;  // 初始化可攀登的山峰数量为0
        vector<int> hillsIndex;  // 创建一个向量，用于存储山峰的索引
        int size = hill_map.size();  // 获取山峰地图的大小
    
        // 判断第一个和最后一个是否是山峰
        if (hill_map[0] > hill_map[1]) {
            hillsIndex.push_back(0);  // 如果是山峰，将其索引添加到向量中
        }
        if (hill_map[size - 2] < hill_map[size - 1]) {
            hillsIndex.push_back(size - 1);  // 如果是山峰，将其索引添加到向量中
        }
    
        // 遍历山峰地图，找出所有的山峰
        for (int i = 1; i <= size - 2; i++) {
            if (hill_map[i] > hill_map[i - 1] && hill_map[i] > hill_map[i + 1]) {
                hillsIndex.push_back(i);  // 如果是山峰，将其索引添加到向量中
            }
        }
    
        // 遍历所有的山峰，计算每个山峰是否可以攀登
        for (int i = 0; i < hillsIndex.size(); i++) {
            int power = 0;  // 初始化消耗的力量为0
            int right = 1;  // 初始化是否可以继续向右检查的标志为1
            // 向左检查
            for (int j = hillsIndex[i] - 1; j >= 0; j--) {
                power += abs(hill_map[j] - hill_map[j + 1]) * 3;  // 计算消耗的力量
                if (hill_map[j] == 0) {  // 如果遇到山谷
                    if (power < strength) {  // 如果消耗的力量小于总力量
                        hills++;  // 可攀登的山峰数量加1
                        right = 0;  // 不再向右检查
                        break;  // 跳出循环
                    }
                }
            }
            if (right == 0) {  // 如果不再向右检查
                continue;  // 跳过当前循环，进行下一次循环
            }
            power = 0;  // 重置消耗的力量为0
            // 向右检查
            for (int j = hillsIndex[i] + 1; j < size; j++) {
                power += abs(hill_map[j - 1] - hill_map[j]) * 3;  // 计算消耗的力量
                if (hill_map[j] == 0) {  // 如果遇到山谷
                    if (power < strength) {  // 如果消耗的力量小于总力量
                        hills++;  // 可攀登的山峰数量加1
                        break;  // 跳出循环
                    }
                }
            }
        }
        return hills;  // 返回可攀登的山峰数量
    }
    
    int main() {
        string line;  // 定义一个字符串，用于存储输入的一行数据
        getline(cin, line);  // 从输入流中读取一行数据
        istringstream iss(line);  // 创建一个字符串流，用于处理输入的数据
        vector<int> hill_map;  // 创建一个向量，用于存储山峰地图
        // 将输入的字符串转换为整数向量
        for (string s; getline(iss, s, ','); ) {
            hill_map.push_back(stoi(s));  // 将字符串转换为整数，并添加到向量中
        }
    
        int strength;  // 定义一个整数，用于存储力量值
        cin >> strength;  // 从输入流中读取力量值
    
        // 调用函数，计算可攀登的山峰数量，并输出结果
        cout << count_climbable(hill_map, strength) << endl;
    
        return 0;  // 程序正常结束
    }
    

## Java

    
    
    import java.util.*;
    
    public class Main {
        // 定义一个函数，计算可攀登的山峰数量
        public static int count_climbable(List<Integer> hill_map, int strength) {
            int hills = 0;  // 初始化可攀登的山峰数量为0
            List<Integer> hillsIndex = new ArrayList<>();  // 创建一个列表，用于存储山峰的索引
            int size = hill_map.size();  // 获取山峰地图的大小
    
            // 判断第一个和最后一个是否是山峰
            if (hill_map.get(0) > hill_map.get(1)) {
                hillsIndex.add(0);  // 如果是山峰，将其索引添加到列表中
            }
            if (hill_map.get(size - 2) < hill_map.get(size - 1)) {
                hillsIndex.add(size - 1);  // 如果是山峰，将其索引添加到列表中
            }
    
            // 遍历山峰地图，找出所有的山峰
            for (int i = 1; i <= size - 2; i++) {
                if (hill_map.get(i) > hill_map.get(i - 1) && hill_map.get(i) > hill_map.get(i + 1)) {
                    hillsIndex.add(i);  // 如果是山峰，将其索引添加到列表中
                }
            }
    
            // 遍历所有的山峰，计算每个山峰是否可以攀登
            for (int i = 0; i < hillsIndex.size(); i++) {
                int power = 0;  // 初始化消耗的力量为0
                boolean right = true;  // 初始化是否可以继续向右检查的标志为true
                // 向左检查
                for (int j = hillsIndex.get(i) - 1; j >= 0; j--) {
                    power += Math.abs(hill_map.get(j) - hill_map.get(j + 1)) * 3;  // 计算消耗的力量
                    if (hill_map.get(j) == 0) {  // 如果遇到山谷
                        if (power < strength) {  // 如果消耗的力量小于总力量
                            hills++;  // 可攀登的山峰数量加1
                            right = false;  // 不再向右检查
                            break;  // 跳出循环
                        }
                    }
                }
                if (!right) {  // 如果不再向右检查
                    continue;  // 跳过当前循环，进行下一次循环
                }
                power = 0;  // 重置消耗的力量为0
                // 向右检查
                for (int j = hillsIndex.get(i) + 1; j < size; j++) {
                    power += Math.abs(hill_map.get(j - 1) - hill_map.get(j)) * 3;  // 计算消耗的力量
                    if (hill_map.get(j) == 0) {  // 如果遇到山谷
                        if (power < strength) {  // 如果消耗的力量小于总力量
                            hills++;  // 可攀登的山峰数量加1
                            break;  // 跳出循环
                        }
                    }
                }
            }
            return hills;  // 返回可攀登的山峰数量
        }
    
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            String line = scanner.nextLine();  // 从输入流中读取一行数据
            String[] parts = line.split(",");
            List<Integer> hill_map = new ArrayList<>();  // 创建一个列表，用于存储山峰地图
            // 将输入的字符串转换为整数列表
            for (String s : parts) {
                hill_map.add(Integer.parseInt(s));  // 将字符串转换为整数，并添加到列表中
            }
    
            int strength = scanner.nextInt();  // 从输入流中读取力量值
    
            // 调用函数，计算可攀登的山峰数量，并输出结果
            System.out.println(count_climbable(hill_map, strength));
    
            scanner.close();
        }
    }
    

## javaScript

    
    
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    // 定义一个函数，计算可攀登的山峰数量
    function count_climbable(hill_map, strength) {
        let hills = 0;  // 初始化可攀登的山峰数量为0
        let hillsIndex = [];  // 创建一个数组，用于存储山峰的索引
        let size = hill_map.length;  // 获取山峰地图的大小
    
        // 判断第一个和最后一个是否是山峰
        if (hill_map[0] > hill_map[1]) {
            hillsIndex.push(0);  // 如果是山峰，将其索引添加到数组中
        }
        if (hill_map[size - 2] < hill_map[size - 1]) {
            hillsIndex.push(size - 1);  // 如果是山峰，将其索引添加到数组中
        }
    
        // 遍历山峰地图，找出所有的山峰
        for (let i = 1; i <= size - 2; i++) {
            if (hill_map[i] > hill_map[i - 1] && hill_map[i] > hill_map[i + 1]) {
                hillsIndex.push(i);  // 如果是山峰，将其索引添加到数组中
            }
        }
    
        // 遍历所有的山峰，计算每个山峰是否可以攀登
        for (let i = 0; i < hillsIndex.length; i++) {
            let power = 0;  // 初始化消耗的力量为0
            let right = true;  // 初始化是否可以继续向右检查的标志为true
            // 向左检查
            for (let j = hillsIndex[i] - 1; j >= 0; j--) {
                power += Math.abs(hill_map[j] - hill_map[j + 1]) * 3;  // 计算消耗的力量
                if (hill_map[j] === 0) {  // 如果遇到山谷
                    if (power < strength) {  // 如果消耗的力量小于总力量
                        hills++;  // 可攀登的山峰数量加1
                        right = false;  // 不再向右检查
                        break;  // 跳出循环
                    }
                }
            }
            if (!right) {  // 如果不再向右检查
                continue;  // 跳过当前循环，进行下一次循环
            }
            power = 0;  // 重置消耗的力量为0
            // 向右检查
            for (let j = hillsIndex[i] + 1; j < size; j++) {
                power += Math.abs(hill_map[j - 1] - hill_map[j]) * 3;  // 计算消耗的力量
                if (hill_map[j] === 0) {  // 如果遇到山谷
                    if (power < strength) {  // 如果消耗的力量小于总力量
                        hills++;  // 可攀登的山峰数量加1
                        break;  // 跳出循环
                    }
                }
            }
        }
        return hills;  // 返回可攀登的山峰数量
    }
    
    readline.on('line', hill_mapT => {
        readline.on('line', strengthT => {
            const parts = hill_mapT.split(',');
            const hill_maps = parts.slice(0, parts.length).map(Number);  // 创建一个数组，用于存储山峰地图
            const strength = Number(strengthT);  // 定义一个整数，用于存储力量值
       
            // 调用函数，计算可攀登的山峰数量，并输出结果
            console.log(count_climbable(hill_maps, strength));
    
        });
    
       
    });
    

## Python

    
    
    # 定义一个函数，计算可攀登的山峰数量
    def count_climbable(hill_map, strength):
        hills = 0  # 初始化可攀登的山峰数量为0
        hillsIndex = []  # 创建一个列表，用于存储山峰的索引
        size = len(hill_map)  # 获取山峰地图的大小
    
        # 判断第一个和最后一个是否是山峰
        if hill_map[0] > hill_map[1]:
            hillsIndex.append(0)  # 如果是山峰，将其索引添加到列表中
        if hill_map[size - 2] < hill_map[size - 1]:
            hillsIndex.append(size - 1)  # 如果是山峰，将其索引添加到列表中
    
        # 遍历山峰地图，找出所有的山峰
        for i in range(1, size - 1):
            if hill_map[i] > hill_map[i - 1] and hill_map[i] > hill_map[i + 1]:
                hillsIndex.append(i)  # 如果是山峰，将其索引添加到列表中
    
        # 遍历所有的山峰，计算每个山峰是否可以攀登
        for i in range(len(hillsIndex)):
            power = 0  # 初始化消耗的力量为0
            right = True  # 初始化是否可以继续向右检查的标志为True
            # 向左检查
            for j in range(hillsIndex[i] - 1, -1, -1):
                power += abs(hill_map[j] - hill_map[j + 1]) * 3  # 计算消耗的力量
                if hill_map[j] == 0:  # 如果遇到山谷
                    if power < strength:  # 如果消耗的力量小于总力量
                        hills += 1  # 可攀登的山峰数量加1
                        right = False  # 不再向右检查
                        break  # 跳出循环
            if not right:  # 如果不再向右检查
                continue  # 跳过当前循环，进行下一次循环
            power = 0  # 重置消耗的力量为0
            # 向右检查
            for j in range(hillsIndex[i] + 1, size):
                power += abs(hill_map[j - 1] - hill_map[j]) * 3  # 计算消耗的力量
                if hill_map[j] == 0:  # 如果遇到山谷
                    if power < strength:  # 如果消耗的力量小于总力量
                        hills += 1  # 可攀登的山峰数量加1
                        break  # 跳出循环
        return hills  # 返回可攀登的山峰数量
    
    # 从输入流中读取一行数据
    line = input()
    hill_map = list(map(int, line.split(',')))  # 将输入的字符串转换为整数列表
    
    # 从输入流中读取力量值
    strength = int(input())
    
    # 调用函数，计算可攀登的山峰数量，并输出结果
    print(count_climbable(hill_map, strength))
    

## C语言

    
    
    #include <stdio.h>  // 引入标准输入输出库
    #include <stdlib.h>  // 引入标准库，包含abs函数
    #include <string.h>  // 引入字符串处理库
    
    #define MAX_SIZE 1000  // 定义最大数组大小
    
    // 定义一个函数，计算可攀登的山峰数量
    int count_climbable(int hill_map[], int size, int strength) {
        int hills = 0;  // 初始化可攀登的山峰数量为0
        int hillsIndex[MAX_SIZE];  // 创建一个数组，用于存储山峰的索引
        int hillsIndexSize = 0;  // 初始化山峰索引数组的大小为0
    
        // 判断第一个和最后一个是否是山峰
        if (hill_map[0] > hill_map[1]) {
            hillsIndex[hillsIndexSize++] = 0;  // 如果是山峰，将其索引添加到数组中
        }
        if (hill_map[size - 2] < hill_map[size - 1]) {
            hillsIndex[hillsIndexSize++] = size - 1;  // 如果是山峰，将其索引添加到数组中
        }
    
        // 遍历山峰地图，找出所有的山峰
        for (int i = 1; i <= size - 2; i++) {
            if (hill_map[i] > hill_map[i - 1] && hill_map[i] > hill_map[i + 1]) {
                hillsIndex[hillsIndexSize++] = i;  // 如果是山峰，将其索引添加到数组中
            }
        }
    
        // 遍历所有的山峰，计算每个山峰是否可以攀登
        for (int i = 0; i < hillsIndexSize; i++) {
            int power = 0;  // 初始化消耗的力量为0
            int right = 1;  // 初始化是否可以继续向右检查的标志为1
            // 向左检查
            for (int j = hillsIndex[i] - 1; j >= 0; j--) {
                power += abs(hill_map[j] - hill_map[j + 1]) * 3;  // 计算消耗的力量
                if (hill_map[j] == 0) {  // 如果遇到山谷
                    if (power < strength) {  // 如果消耗的力量小于总力量
                        hills++;  // 可攀登的山峰数量加1
                        right = 0;  // 不再向右检查
                        break;  // 跳出循环
                    }
                }
            }
            if (right == 0) {  // 如果不再向右检查
                continue;  // 跳过当前循环，进行下一次循环
            }
            power = 0;  // 重置消耗的力量为0
            // 向右检查
            for (int j = hillsIndex[i] + 1; j < size; j++) {
                power += abs(hill_map[j - 1] - hill_map[j]) * 3;  // 计算消耗的力量
                if (hill_map[j] == 0) {  // 如果遇到山谷
                    if (power < strength) {  // 如果消耗的力量小于总力量
                        hills++;  // 可攀登的山峰数量加1
                        break;  // 跳出循环
                    }
                }
            }
        }
        return hills;  // 返回可攀登的山峰数量
    }
    
    int main() {
        int hill_map[MAX_SIZE];  // 创建一个数组，用于存储山峰地图
        int size = 0;  // 初始化山峰地图的大小为0
    
        char line[MAX_SIZE];  // 定义一个字符串，用于存储输入的一行数据
        fgets(line, MAX_SIZE, stdin);  // 从输入流中读取一行数据
        char *token = strtok(line, ",");  // 使用逗号分隔字符串
        while (token != NULL) {
            hill_map[size++] = atoi(token);  // 将字符串转换为整数，并添加到数组中
            token = strtok(NULL, ",");  // 继续分隔字符串
        }
    
        int strength;  // 定义一个整数，用于存储力量值
        scanf("%d", &strength);  // 从输入流中读取力量值
    
        // 调用函数，计算可攀登的山峰数量，并输出结果
        printf("%d\n", count_climbable(hill_map, size, strength));
    
        return 0;  // 程序正常结束
    }
    

## 完整用例

### 用例1

    
    
    0,1,2,4,3,1,0,0,1,2,3,1,2,1,0
    13
    

### 用例2

    
    
    1,4,3
    999
    

### 用例3

    
    
    0,1,0
    5
    

### 用例4

    
    
    0,1,0,1,0
    10
    

### 用例5

    
    
    0,2,4,3,1,0
    20
    

### 用例6

    
    
    0,3,2,1,4,3,2,1,0
    15
    

### 用例7

    
    
    0,1,2,3,2,1,0,2,3,4,5,4,3,2,1,0
    30
    

### 用例8

    
    
    0,1,0,1,2,1,0,1,2,3,2,1,0
    20
    

### 用例9

    
    
    0,1,1,1,0
    8
    

### 用例10

    
    
    0,1,2,1,0,1,2,3,4,3,2,1,0
    28
    

#### 文章目录

  * 题目描述
  * 输入描述
  * 输出描述
  * 用例1
  * 用例2
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

![fengmian](https://i-blog.csdnimg.cn/blog_migrate/325538811e65b403c76bff5093e449df.png)

