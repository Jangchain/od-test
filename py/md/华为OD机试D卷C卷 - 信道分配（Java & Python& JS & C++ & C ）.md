## 题目描述

算法工程师小明面对着这样一个问题 ，需要将通信用的信道分配给尽量多的用户:

信道的条件及分配规则如下:

  1. 所有信道都有属性:”阶”。阶为 r的信道的容量为 2^r比特;
  2. 所有用户需要传输的数据量都一样:D比特;
  3. 一个用户可以分配多个信道，但每个信道只能分配给一个用户;
  4. 只有当分配给一个用户的所有信道的容量和>=D，用户才能传输数据;

给出一组信道资源，最多可以为多少用户传输数据?

## 输入描述

第一行，一个数字 R。R为最大阶数。

0<=R<20

第二行，R+1个数字，用空格隔开。代表每种信道的数量 Ni。按照阶的值从小到大排列。

0<=i<=R,0<=Ni<1000.

第三行，一个数字 D。D为单个用户需要传输的数据量。

0<D<1000000

## 输出描述

一个数字,代表最多可以供多少用户传输数据。

## 用例

输入

    
    
    5
    10 5 0 1 3 2
    30
    

输出

    
    
    4
    

## 解题思路

对于给定的用例，我们可以通过以下步骤模拟计算过程来理解题目的要求和解决方案：

  1. **理解输入** ：

     * 最大阶数 `R = 5`，意味着信道的阶从0到5，共有6种不同阶的信道。
     * 信道数量 `N = [10, 5, 0, 1, 3, 2]`，表示阶0的信道有10个，阶1的信道有5个，阶2的信道有0个，依此类推。
     * 单个用户需要传输的数据量 `D = 30` 比特。
  2. **计算每种阶信道的容量** ：

     * 阶0的信道容量为 `2^0 = 1` 比特。有10个这种的。
     * 阶1的信道容量为 `2^1 = 2` 比特。有5个这种的。
     * 阶2的信道容量为 `2^2 = 4` 比特。有0个这种的。
     * 阶3的信道容量为 `2^3 = 8` 比特。有1个这种的。
     * 阶4的信道容量为 `2^4 = 16` 比特。有3个这种的。
     * 阶5的信道容量为 `2^5 = 32` 比特。有2个这种的。

### 用例

每个用户需要传输的数据量为30比特。存在多种信道分配方案，例如：

  * **方案1** ：

    * 使用一个32比特信道满足一个用户（32比特）。
    * 再次使用一个32比特信道满足另一个用户（32比特）。
    * 使用两个16比特信道满足一个用户（32比特）。
    * 组合一个16比特信道、一个8比特信道和三个2比特信道满足一个用户（30比特）。
    * 剩余信道（两个2比特信道和十个1比特信道，共14比特）不足以满足另一个用户。
  * **方案2** ：

    * 组合一个16比特信道、一个8比特信道和三个2比特信道满足一个用户（30比特）。
    * 组合一个16比特信道、两个2比特信道和十个1比特信道满足一个用户（30比特）。
    * 使用一个32比特信道满足一个用户（32比特）。
    * 再次使用一个32比特信道满足另一个用户（32比特）。
    * 剩余一个16比特信道（16比特）不足以满足另一个用户。
  * **方案3** ：

    * 组合一个16比特信道、一个8比特信道和三个2比特信道满足一个用户（30比特）。
    * 组合一个16比特信道、两个2比特信道和十个1比特信道满足一个用户（30比特）。
    * 使用一个32比特信道满足一个用户（32比特）。
    * 再次使用一个32比特信道满足另一个用户（32比特）。
    * 所有信道恰好用完。

## C++

    
    
    #include <iostream>
    #include <vector>
    
    using namespace std;
    
    // 将二进制向量转换为十进制数，使用了一个更直接的方法
    int binaryToDecimal(vector<int> binary) {
        int decimal = 0; // 十进制结果
        int base = 1; // 基数，初始为1，之后每次循环翻倍
    
        // 遍历二进制向量，从最低位开始转换
        for (int i = 0; i < binary.size(); i++) {
            decimal += binary[i] * base; // 累加到十进制结果中
            base *= 2; // 基数翻倍，对应二进制的位权增加
        }
    
        return decimal;
    }
    
    // 将十进制数转换为二进制向量
    vector<int> decimalToBinary(int decimal) {
        vector<int> binary; // 二进制向量结果
    
        // 循环直到十进制数为0
        while (decimal > 0) {
            binary.emplace_back(decimal % 2); // 将十进制数除以2的余数作为二进制位
            decimal /= 2; // 十进制数除以2，向下取整
        }
    
        return binary;
    }
    
    // 根据需求分配通道
    bool allocateChannels(vector<int> &availableChannels, vector<int> &requirementBits) {
        // 从最高位向最低位遍历
        for (int i = availableChannels.size() - 1; i >= 0; i--) {
            if (availableChannels[i] >= requirementBits[i]) {
                availableChannels[i] -= requirementBits[i]; // 如果当前位的可用通道数足够，直接分配
            } else {
                // 如果当前位的可用通道数不够，需要检查是否能从更高位借用
                if (binaryToDecimal(vector<int>(availableChannels.begin(), availableChannels.begin() + i + 1)) <
                    binaryToDecimal(vector<int>(requirementBits.begin(), requirementBits.begin() + i + 1))) {
                    // 如果更高位的通道总数也不够，分配失败
                    for (int j = i + 1; j < availableChannels.size(); j++) {
                        if (availableChannels[j] > 0) {
                            availableChannels[j]--; // 从更高位借用一个通道
                            return true;
                        }
                    }
                    return false;
                } else {
                    // 如果更高位的通道总数足够，进行调整
                    availableChannels[i] -= requirementBits[i];
                    if (i > 0) {
                        availableChannels[i - 1] += availableChannels[i] * 2; // 向下一位借用通道
                    }
                    availableChannels[i] = 0;
                }
            }
        }
    
        return true;
    }
    
    int main() {
        int maxLevel; // 最大级别
        cin >> maxLevel;
    
        vector<int> channelCounts(maxLevel + 1); // 存储每个级别的通道数
        for (int i = 0; i <= maxLevel; i++) {
            cin >> channelCounts[i]; // 输入每个级别的通道数
        }
    
        int dataRequirement; // 数据需求量
        cin >> dataRequirement;
    
        vector<int> requirementBits = decimalToBinary(dataRequirement); // 将需求量转换为二进制向量
        vector<int> availableChannels(requirementBits.size(), 0); // 初始化可用通道向量
        int usersServed = 0; // 已服务的用户数
    
        // 初始化可用通道向量
        for (int i = 0; i <= maxLevel; i++) {
            if (i >= requirementBits.size()) {
                usersServed += channelCounts[i]; // 如果级别超过需求位数，直接累加到已服务的用户数
            } else {
                availableChannels[i] = channelCounts[i]; // 设置每个级别的可用通道数
            }
        }
    
        // 尝试分配通道直到不再可能
        while (allocateChannels(availableChannels, requirementBits)) {
            usersServed++; // 每成功一次，已服务的用户数增加
        }
    
        cout << usersServed << endl; // 输出已服务的用户数
    
        return 0;
    }
    

## Java

    
    
    import java.util.Scanner;
    import java.util.Arrays;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            
            // 用户输入最大信道阶数
            int maxLevel = scanner.nextInt();
            scanner.nextLine(); // 消耗换行符，避免影响下一次读取
            // 用户输入每种信道的数量，按阶数从小到大
            String[] inputCounts = scanner.nextLine().split(" ");
            // 使用流将字符串数组转换为整数数组
            int[] channelCounts = Arrays.stream(inputCounts).mapToInt(Integer::parseInt).toArray();
            // 用户输入单个用户需要的数据量
            int dataNeed = scanner.nextInt();
            
            // 将用户需求的数据量转换为二进制位数组，并反转以符合从低阶到高阶的顺序
            int[] requirementBits = toBitsArray(dataNeed);
            // 初始化能服务的用户数
            int usersServed = 0;
            
            // 对超出需求位长度的高阶信道，直接累加其数量至能服务的用户数
            for (int i = requirementBits.length; i <= maxLevel; i++) {
                usersServed += channelCounts[i];
            }
            
            // 初始化当前可用信道数组，长度与需求位相同
            int[] currentChannels = Arrays.copyOfRange(channelCounts, 0, requirementBits.length);
            // 尝试分配信道直到不再能满足任何用户的需求
            while (allocateChannels(currentChannels, requirementBits)) {
                // 成功分配则用户数加一
                usersServed++;
            }
            
            // 输出能服务的用户总数
            System.out.println(usersServed);
        }
        
        // 将十进制数转换为二进制位数组的函数
        private static int[] toBitsArray(int number) {
            // 将整数转换为二进制字符串
            String binaryString = Integer.toBinaryString(number);
            // 创建与二进制字符串长度相同的数组
            int[] bits = new int[binaryString.length()];
            // 填充数组，字符串末尾的位对应数组的开始
            for (int i = 0; i < binaryString.length(); i++) {
                bits[binaryString.length() - 1 - i] = binaryString.charAt(i) - '0';
            }
            return bits;
        }
        
        // 定义分配信道的函数
        private static boolean allocateChannels(int[] channels, int[] requirement) {
            // 从最高阶开始向下遍历，尝试分配信道以满足需求
            for (int i = channels.length - 1; i >= 0; i--) {
                if (channels[i] >= requirement[i]) {
                    channels[i] -= requirement[i];
                } else {
                    // 如果当前阶信道数量不足以满足需求
                    if (bitsToNum(Arrays.copyOfRange(channels, 0, i + 1)) < bitsToNum(Arrays.copyOfRange(requirement, 0, i + 1))) {
                        // 尝试从更高阶借用一个信道
                        for (int j = i + 1; j < channels.length; j++) {
                            if (channels[j] > 0) {
                                channels[j]--;
                                return true;
                            }
                        }
                        return false;
                    } else {
                        // 如果当前及更低阶信道总容量足够，进行分配
                        channels[i] -= requirement[i];
                        if (i > 0) {
                            // 将不足部分的需求通过倍增转移到下一低阶
                            channels[i - 1] += channels[i] * 2;
                        }
                        channels[i] = 0;
                    }
                }
            }
            return true;
        }
        
        // 将二进制位数组转换为十进制数的函数
        private static int bitsToNum(int[] bits) {
            int number = 0;
            // 遍历二进制位数组，计算十进制数值
            for (int i = 0; i < bits.length; i++) {
                number += bits[i] * Math.pow(2, i);
            }
            return number;
        }
    }
    

## javaScript

    
    
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    let inputLines = [];
    
    rl.on("line", (line) => {
      inputLines.push(line);
      if(inputLines.length === 3) {  
        rl.close();
        processInput(inputLines);
      }
    });
    
    function processInput(inputLines) {
      // 解析输入
      const maxLevel = parseInt(inputLines[0]);
      const channelCounts = inputLines[1].split(' ').map(Number);
      const dataNeed = parseInt(inputLines[2]);
    
      // 定义将二进制数组转换为十进制数的函数
      function bitsToNum(bits) {
        return bits.reduce((acc, val, idx) => acc + val * Math.pow(2, idx), 0);
      }
    
      // 定义信道分配函数
      function allocateChannels(channels, requirement) {
        for (let i = channels.length - 1; i >= 0; i--) {
          if (channels[i] >= requirement[i]) {
            channels[i] -= requirement[i];
          } else {
            if (bitsToNum(channels.slice(0, i + 1)) < bitsToNum(requirement.slice(0, i + 1))) {
              // 从更高阶尝试借用信道
              for (let j = i + 1; j < channels.length; j++) {
                if (channels[j] > 0) {
                  channels[j]--;
                  return true;
                }
              }
              return false; // 如果无法借用，则返回false
            } else {
              // 分配信道
              channels[i] -= requirement[i];
              if (i > 0) {
                channels[i - 1] += channels[i] * 2;
              }
              channels[i] = 0;
            }
          }
        }
        return true; // 返回true表示成功分配
      }
    
      // 将数据需求转换为二进制位数组，并反转以符合从低阶到高阶的顺序
      let requirementBits = [...dataNeed.toString(2)].reverse().map(Number);
      let usersServed = 0;
    
      // 对超出需求位长度的高阶信道，直接累加其数量至能服务的用户数
      for (let i = requirementBits.length; i <= maxLevel; i++) {
        usersServed += channelCounts[i] || 0;
      }
    
      // 初始化当前可用信道数组，长度与需求位相同
      let currentChannels = channelCounts.slice(0, requirementBits.length);
      while (currentChannels.length < requirementBits.length) {
        currentChannels.push(0); // 补充长度不足的部分为0
      }
    
      // 尝试分配信道直到不再能满足任何用户的需求
      while (allocateChannels(currentChannels, requirementBits)) {
        usersServed++;
      }
    
      // 输出能服务的用户总数
      console.log(usersServed);
    }
    

## Python

    
    
    # 用户输入最大信道阶数
    max_level = int(input())  
    # 用户输入每种信道的数量，按阶数从小到大
    channel_counts = list(map(int, input().split()))  
    # 用户输入单个用户需要的数据量
    data_need = int(input())  
    
    # 定义将二进制位数组转换为十进制数的函数
    def bits_to_num(bits):
        # 对二进制位数组进行遍历，每位的值乘以其对应的2的幂次求和得到十进制数
        return sum(val * (2 ** idx) for idx, val in enumerate(bits))
    
    # 定义分配信道的函数
    def allocate_channels(channel阿s, requirement):
        # 从最高阶开始向下遍历，尝试分配信道以满足需求
        for i in reversed(range(len(channels))):
            # 如果当前阶信道数量足够，直接减去需求量
            if channels[i] >= requirement[i]:
                channels[i] -= requirement[i]
            else:
                # 如果当前阶信道数量不足以满足需求，需要判断是否可以通过低阶信道组合满足需求
                # 首先判断当前及更低阶信道总容量是否小于需求的总容量
                if bits_to_num(channels[:i + 1]) < bits_to_num(requirement[:i + 1]):
                    # 如果低阶总容量不足，尝试从更高阶借用一个信道
                    for j in range(i + 1, len(channels)):
                        if channels[j] > 0:
                            channels[j] -= 1
                            return True
                    # 如果高阶也无法借用，说明无法满足当前需求，返回False
                    return False
                else:
                    # 如果当前及更低阶信道总容量足够，先尝试分配当前阶，不足部分由更低阶信道通过倍增补足
                    channels[i] -= requirement[i]
                    if i > 0:
                        # 将不足部分的需求通过倍增转移到下一低阶，即需求翻倍
                        channels[i - 1] += channels[i] * 2
                    # 将当前阶信道数量清零，因为已尽可能分配
                    channels[i] = 0
        # 如果所有需求都能满足，返回True
        return True
    
    # 将用户需求的数据量转换为二进制位数组，并反转以符合从低阶到高阶的顺序
    requirement_bits = list(map(int, str(bin(data_need))[2:]))[::-1]
    users_served = 0  # 初始化能服务的用户数
    # 对超出需求位长度的高阶信道，直接累加其数量至能服务的用户数
    for i in range(len(requirement_bits), max_level + 1):
        users_served += channel_counts[i]
    # 初始化当前可用信道数组，长度与需求位相同
    current_channels = channel_counts[:len(requirement_bits)]
    while len(current_channels) < len(requirement_bits):
        # 如果当前可用信道数组长度不足，补零以匹配需求位长度
        current_channels.append(0)
    # 尝试分配信道直到不再能满足任何用户的需求
    while allocate_channels(current_channels, requirement_bits):
        users_served += 1  # 成功分配则用户数加一
    
    # 输出能服务的用户总数
    print(users_served)
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    
    /**
     * 将十进制数转换为二进制数组
     * @param decimal 十进制输入
     * @param size 用于存储生成的二进制数组的大小
     * @return 返回二进制数组的指针
     */
    int* decimalToBinary(int decimal, int* size) {
        // 动态分配足够大的空间以存储二进制数
        int* binary = (int*)malloc(32 * sizeof(int)); 
        *size = 0; // 初始化大小为0
    
        // 循环直到十进制数被完全转换
        while (decimal > 0) {
            binary[(*size)++] = decimal % 2; // 存储余数，即当前二进制位
            decimal /= 2; // 将十进制数除以2进行下一步转换
        }
    
        return binary; // 返回二进制数组
    }
    
    /**
     * 将二进制数组转换为十进制数
     * @param binary 二进制数组指针
     * @param size 二进制数组的大小
     * @return 返回转换得到的十进制数
     */
    int binaryToDecimal(int* binary, int size) {
        int decimal = 0; // 初始化十进制结果为0
        int base = 1; // 初始化基数为1
    
        // 遍历二进制数组，从最低位开始转换
        for (int i = 0; i < size; i++) {
            decimal += binary[i] * base; // 累加计算十进制结果
            base *= 2; // 基数翻倍，准备下一个二进制位的转换
        }
    
        return decimal; // 返回十进制结果
    }
    
    /**
     * 根据需求分配通道
     * @param availableChannels 可用通道数组
     * @param requirementBits 需求位数组
     * @param size 数组的大小
     * @return 分配成功返回1，否则返回0
     */
    int allocateChannels(int* availableChannels, int* requirementBits, int size) {
        // 从最高位向最低位遍历
        for (int i = size - 1; i >= 0; i--) {
            if (availableChannels[i] >= requirementBits[i]) {
                // 如果当前位的可用通道数足够，则直接分配
                availableChannels[i] -= requirementBits[i];
            } else {
                // 计算当前位及以上位的可用通道总数与需求总数
                int availableDecimal = binaryToDecimal(availableChannels, i + 1);
                int requirementDecimal = binaryToDecimal(requirementBits, i + 1);
                if (availableDecimal < requirementDecimal) {
                    // 如果不够，则尝试从更高位借用通道
                    for (int j = i + 1; j < size; j++) {
                        if (availableChannels[j] > 0) {
                            availableChannels[j]--;
                            return 1; // 成功借用通道
                        }
                    }
                    return 0; // 无法借用通道，分配失败
                } else {
                    // 如果足够，则进行相应调整
                    availableChannels[i] -= requirementBits[i];
                    if (i > 0) {
                        availableChannels[i - 1] += availableChannels[i] * 2; // 向下一位借用通道
                    }
                    availableChannels[i] = 0;
                }
            }
        }
    
        return 1; // 成功分配通道
    }
    
    int main() {
        int maxLevel; // 存储最大级别
        scanf("%d", &maxLevel); // 输入最大级别
    
        // 根据最大级别动态分配存储通道数的数组
        int* channelCounts = (int*)malloc((maxLevel + 1) * sizeof(int));
        for (int i = 0; i <= maxLevel; i++) {
            scanf("%d", &channelCounts[i]); // 输入每个级别的通道数
        }
    
        int dataRequirement; // 存储数据需求量
        scanf("%d", &dataRequirement); // 输入数据需求量
    
        int size;  
            // 将数据需求量转换为二进制表示
        int* requirementBits = decimalToBinary(dataRequirement, &size);
    
        // 动态分配数组以存储每个级别的可用通道数，初始化为0
        int* availableChannels = (int*)malloc(size * sizeof(int));
        for (int i = 0; i < size; i++) {
            availableChannels[i] = 0;
        }
    
        // 根据输入的通道数，更新可用通道数组
        int usersServed = 0; // 初始化已服务的用户数为0
        for (int i = 0; i <= maxLevel; i++) {
            if (i >= size) {
                // 如果当前级别超过了需求的二进制表示长度，直接累加该级别的通道数到已服务用户数
                usersServed += channelCounts[i];
            } else {
                // 否则，更新对应二进制位的可用通道数
                availableChannels[i] = channelCounts[i];
            }
        }
    
        // 循环尝试分配通道直到无法再分配
        while (allocateChannels(availableChannels, requirementBits, size)) {
            usersServed++; // 成功分配则用户数增加
        }
    
        printf("%d\n", usersServed); // 输出最终可以服务的用户数
    
        // 释放之前动态分配的内存资源
        free(channelCounts);
        free(requirementBits);
        free(availableChannels);
    
        return 0; // 程序结束
    }
    

## 完整用例

### 用例1

    
    
    3
    5 3 2 1
    10
    

### 用例2

    
    
    2
    0 0 5
    2
    

### 用例3

    
    
    3
    1 1 1 1
    14
    

### 用例4

    
    
    4
    2 3 1 0 4
    16
    

### 用例5

    
    
    4
    4 5 6 7 8
    30
    

### 用例6

    
    
    3
    10 10 10 10
    100000
    

### 用例7

    
    
    10
    1 1 1 1 1 1 1 1 1 1 1
    100
    

### 用例8

    
    
    19
    999 999 999 999 999 999 999 999 999 999 999 999 999 999 999 999 999 999 999 999
    1
    

### 用例9

    
    
    5
    3 2 1 0 1 2
    1
    

### 用例10

    
    
    9
    943 868 691 837 999 585 786 979 842 835
    669785
    

![fengmian](https://i-blog.csdnimg.cn/blog_migrate/ac15ed0b49bc7a3dce026b7a6073cbfd.png)

