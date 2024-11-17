## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

幼儿园里有一个放倒的圆桶，它是一个线性结构，允许在桶的右边将篮球放入，可以在桶的左边和右边将篮球取出。

每个篮球有单独的编号，老师可以连续放入一个或多个篮球，小朋友可以在桶左边或右边将篮球取出，当桶只有一个篮球的情况下，必须从左边取出。

如老师按顺序放入1、2、3、4、5 共有 5 个编号的篮球，那么小朋友可以依次取出编号为1、2、3、4、5 或者 3、1、2、4、5 编号的篮球，无法取出
5、1、3、2、4 编号的篮球。

其中 3、1、2、4、5 的取出场景为：

  * 连续放入1、2、3号
  * 从右边取出3号
  * 从左边取出1号
  * 从左边取出2号
  * 放入4号
  * 从左边取出4号
  * 放入5号
  * 从左边取出5号

简答起见，我们以 L 表示左，R表示右，此时取出篮球的依次取出序列为“RLLLL”。

## 输入描述

每次输入包含一个测试用例：

  1. 第一行的数字作为老师依次放入的篮球编号
  2. 第二行的数字作为要检查是否能够按照放入的顺序取出给定的篮球的编号，其中篮球的编号用逗号进行分隔。

其中篮球编号用逗号进行分隔。

备注

  * 1 ≤ 篮球编号，篮球个数 ≤ 200
  * 篮球上的数字不重复
  * 输出的结果中 LR 必须为大写

## 输出描述

对于每个篮球的取出序列，如果确实可以获取，请打印出其按照左右方向的操作取出顺序，如果无法获取则打印“NO”。

## 用例

输入

    
    
    4,5,6,7,0,1,2
    6,4,0,1,2,5,7
    

输出

    
    
    RLRRRLL
    

说明

> 篮球的取出顺序依次为“右、左、右、右、右、左、左”

## 用例2

输入

    
    
    4,5,6,7,0,1,2
    6,0,5,1,2,4,7
    

输出

    
    
    NO
    

说明

> 无法取出对应序列的篮球

## 用例3

输入

    
    
    1,2,3,4
    1,2,3,5
    

输出

    
    
    NO
    

说明

> 不存在编号为5的篮球，所以无法取出对应编号的数据

## 解题思路

  1. 使用队列来模拟篮球的放入和取出过程。

  2. 遍历放入顺序，将每个篮球编号放入队列的末尾。

  3. 每放入一个篮球后，检查队列的两端是否有与取出顺序当前编号相同的篮球。

如果队列首部的篮球可以取出，则记录操作并从首部取出，继续下一次检查。

如果队列尾部的篮球可以取出，则记录操作并从尾部取出，继续下一次检查。

如果两端都不可取出，则继续放入下一个篮球。

  4. 如果所有篮球都能按取出顺序被取出，则输出记录的操作序列。如果无法按取出顺序取出所有篮球，则输出"NO"。

## C++

    
    
    #include <iostream>
    #include <deque>
    #include <sstream>
    #include <string>
    #include <vector>
    
    using namespace std;
    
    // 将字符串按照分隔符切分，返回整数数组
    vector<int> splitStringToInt(const string& str, char delim) {
        vector<int> tokens;
        stringstream ss(str);
        string token;
        while (getline(ss, token, delim)) {
            tokens.push_back(stoi(token));
        }
        return tokens;
    }
    
    int main() {
        string inputLine;
    
        // 读取第一行输入，分割字符串得到放入篮球的编号数组
        getline(cin, inputLine);
        vector<int> inputNumbers = splitStringToInt(inputLine, ',');
    
        // 读取第二行输入，分割字符串得到要检查的取出篮球的顺序数组
        getline(cin, inputLine);
        vector<int> outputSequence = splitStringToInt(inputLine, ',');
    
        // 创建双端队列用于模拟篮球的放入和取出
        deque<int> deque;
    
        // 用于构建输出的取球顺序
        string result;
        // 初始化输出序列的索引
        int outputIndex = 0;
    
        // 遍历放入篮球的编号
        for (int number : inputNumbers) {
            // 将篮球编号放入双端队列的末尾（右边放入）
            deque.push_back(number);
    
            // 当双端队列不为空且输出序列索引小于输出序列长度时
            while (!deque.empty() && outputIndex < outputSequence.size()) {
                // 获取输出序列中当前要取出的篮球编号
                int outputNumber = outputSequence[outputIndex];
    
                // 如果双端队列的首部（左边）的篮球编号与当前要取出的编号相同
                if (deque.front() == outputNumber) {
                    // 从双端队列首部取出篮球
                    deque.pop_front();
                    // 添加取球操作"L"
                    result += 'L';
                    // 输出序列索引递增
                    outputIndex++;
                } else if (deque.back() == outputNumber) {
                    // 如果双端队列的尾部（右边）的篮球编号与当前要取出的编号相同
                    // 从双端队列尾部取出篮球
                    deque.pop_back();
                    // 添加取球操作"R"
                    result += 'R';
                    // 输出序列索引递增
                    outputIndex++;
                } else {
                    // 如果两边的篮球编号都不匹配，则停止当前循环
                    break;
                }
            }
        }
    
        // 如果输出序列索引没有达到输出序列的长度，说明无法按照要求取出所有篮球
        if (outputIndex != outputSequence.size()) {
            cout << "NO" << endl;
        } else {
            // 如果可以取出所有篮球，打印取球操作序列
            cout << result << endl;
        }
    
        return 0;
    }
    

## Java

    
    
    import java.util.ArrayDeque;
    import java.util.Deque;
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            // 创建Scanner对象用于获取用户输入
            Scanner sc = new Scanner(System.in);
    
            // 读取第一行输入，分割字符串得到放入篮球的编号数组
            String[] inputNumbers = sc.nextLine().split(",");
            // 读取第二行输入，分割字符串得到要检查的取出篮球的顺序数组
            String[] outputSequence = sc.nextLine().split(",");
            // 创建双端队列用于模拟篮球的放入和取出
            Deque<Integer> deque = new ArrayDeque<>();
            // 创建StringBuilder用于构建输出的取球顺序
            StringBuilder sb = new StringBuilder();
            // 初始化输出序列的索引
            int outputIndex = 0;
    
            // 遍历放入篮球的编号
            for (String inputNumber : inputNumbers) {
                // 将字符串转换为整数
                int number = Integer.parseInt(inputNumber);
                // 将篮球编号放入双端队列的末尾（右边放入）
                deque.offerLast(number);
    
                // 当双端队列不为空且输出序列索引小于输出序列长度时
                while (!deque.isEmpty() && outputIndex < outputSequence.length) {
                    // 获取输出序列中当前要取出的篮球编号
                    int outputNumber = Integer.parseInt(outputSequence[outputIndex]);
                    // 如果双端队列的首部（左边）的篮球编号与当前要取出的编号相同
                    if (deque.peekFirst() == outputNumber) {
                        // 从双端队列首部取出篮球
                        deque.pollFirst();
                        // 在StringBuilder中添加取球操作"L"
                        sb.append("L");
                        // 输出序列索引递增
                        outputIndex++;
                    } else if (deque.peekLast() == outputNumber) {
                        // 如果双端队列的尾部（右边）的篮球编号与当前要取出的编号相同
                        // 从双端队列尾部取出篮球
                        deque.pollLast();
                        // 在StringBuilder中添加取球操作"R"
                        sb.append("R");
                        // 输出序列索引递增
                        outputIndex++;
                    } else {
                        // 如果两边的篮球编号都不匹配，则停止当前循环
                        break;
                    }
                }
            }
    
            // 如果输出序列索引没有达到输出序列的长度，说明无法按照要求取出所有篮球
            if (outputIndex != outputSequence.length) {
                System.out.println("NO");
            } else {
                // 如果可以取出所有篮球，打印取球操作序列
                System.out.println(sb.toString());
            }
        }
    }
    

## javaScript

    
    
    const readline = require('readline');
    
    // 创建readline接口实例
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    // 函数用于读取输入并处理逻辑
    const processInput = (inputNumbers, outputSequence) => {
        // 创建双端队列用于模拟篮球的放入和取出
        const deque = [];
        // 创建数组用于构建输出的取球顺序
        const result = [];
        // 初始化输出序列的索引
        let outputIndex = 0;
    
        // 遍历放入篮球的编号
        for (const inputNumber of inputNumbers) {
            // 将字符串转换为整数
            const number = parseInt(inputNumber);
            // 将篮球编号放入双端队列的末尾（右边放入）
            deque.push(number);
    
            // 当双端队列不为空且输出序列索引小于输出序列长度时
            while (deque.length > 0 && outputIndex < outputSequence.length) {
                // 获取输出序列中当前要取出的篮球编号
                const outputNumber = parseInt(outputSequence[outputIndex]);
                // 如果双端队列的首部（左边）的篮球编号与当前要取出的编号相同
                if (deque[0] === outputNumber) {
                    // 从双端队列首部取出篮球
                    deque.shift();
                    // 添加取球操作"L"
                    result.push('L');
                    // 输出序列索引递增
                    outputIndex++;
                } else if (deque[deque.length - 1] === outputNumber) {
                    // 如果双端队列的尾部（右边）的篮球编号与当前要取出的编号相同
                    // 从双端队列尾部取出篮球
                    deque.pop();
                    // 添加取球操作"R"
                    result.push('R');
                    // 输出序列索引递增
                    outputIndex++;
                } else {
                    // 如果两边的篮球编号都不匹配，则停止当前循环
                    break;
                }
            }
        }
    
        // 如果输出序列索引没有达到输出序列的长度，说明无法按照要求取出所有篮球
        if (outputIndex !== outputSequence.length) {
            console.log('NO');
        } else {
            // 如果可以取出所有篮球，打印取球操作序列
            console.log(result.join(''));
        }
    };
    
    // 开始读取输入数据
    rl.on('line', (input) => {
        // 根据输入行数判断处理逻辑
        if (!this.inputNumbers) {
            // 读取第一行输入，分割字符串得到放入篮球的编号数组
            this.inputNumbers = input.split(',');
        } else {
            // 读取第二行输入，分割字符串得到要检查的取出篮球的顺序数组
            const outputSequence = input.split(',');
            // 处理输入数据
            processInput(this.inputNumbers, outputSequence);
            // 关闭输入流
            rl.close();
        }
    });
    

## Python

    
    
    from collections import deque
    
    
    # 创建Deque对象用于模拟篮球的放入和取出
    dq = deque()
    
    # 读取第一行输入，分割字符串得到放入篮球的编号列表
    input_numbers = input().split(",")
    # 读取第二行输入，分割字符串得到要检查的取出篮球的顺序列表
    output_sequence = input().split(",")
    
    # 创建列表用于存储输出的取球顺序
    output = []
    # 初始化输出序列的索引
    output_index = 0
    
    # 遍历放入篮球的编号
    for input_number in input_numbers:
        # 将字符串转换为整数
        number = int(input_number)
        # 将篮球编号放入双端队列的末尾（右边放入）
        dq.append(number)
    
        # 当双端队列不为空且输出序列索引小于输出序列长度时
        while dq and output_index < len(output_sequence):
            # 获取输出序列中当前要取出的篮球编号
            output_number = int(output_sequence[output_index])
            # 如果双端队列的首部（左边）的篮球编号与当前要取出的编号相同
            if dq[0] == output_number:
                # 从双端队列首部取出篮球
                dq.popleft()
                # 在输出列表中添加取球操作 "L"
                output.append("L")
                # 输出序列索引递增
                output_index += 1
            elif dq[-1] == output_number:
                # 如果双端队列的尾部（右边）的篮球编号与当前要取出的编号相同
                # 从双端队列尾部取出篮球
                dq.pop()
                # 在输出列表中添加取球操作 "R"
                output.append("R")
                # 输出序列索引递增
                output_index += 1
            else:
                # 如果两边的篮球编号都不匹配，则停止当前循环
                break
    
    # 如果输出序列索引没有达到输出序列的长度，说明无法按照要求取出所有篮球
    if output_index != len(output_sequence):
        print("NO")
    else:
        # 如果可以取出所有篮球，打印取球操作序列
        print("".join(output))
    
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    #include <string.h>
    
    #define MAX_SIZE 1000 // 定义队列的最大大小
    
    // 定义双端队列结构
    typedef struct {
        int data[MAX_SIZE];
        int front;
        int rear;
    } Deque;
    
    // 初始化双端队列
    void initDeque(Deque *deque) {
        deque->front = deque->rear = 0;
    }
    
    // 在队列尾部添加元素
    void offerLast(Deque *deque, int value) {
        deque->data[deque->rear] = value;
        deque->rear = (deque->rear + 1) % MAX_SIZE;
    }
    
    // 在队列头部删除元素
    int pollFirst(Deque *deque) {
        int value = deque->data[deque->front];
        deque->front = (deque->front + 1) % MAX_SIZE;
        return value;
    }
    
    // 在队列尾部删除元素
    int pollLast(Deque *deque) {
        deque->rear = (deque->rear - 1 + MAX_SIZE) % MAX_SIZE;
        return deque->data[deque->rear];
    }
    
    // 获取队列头部元素
    int peekFirst(Deque *deque) {
        return deque->data[deque->front];
    }
    
    // 获取队列尾部元素
    int peekLast(Deque *deque) {
        return deque->data[(deque->rear - 1 + MAX_SIZE) % MAX_SIZE];
    }
    
    // 判断队列是否为空
    int isEmpty(Deque *deque) {
        return deque->front == deque->rear;
    }
    
    // 主函数
    int main() {
        char inputStr[MAX_SIZE];
        int inputNumbers[MAX_SIZE], outputSequence[MAX_SIZE];
        int inputSize = 0, outputSize = 0;
    
        // 读取并分割第一行输入
        fgets(inputStr, MAX_SIZE, stdin);
        char *token = strtok(inputStr, ",\n");
        while (token != NULL) {
            inputNumbers[inputSize++] = atoi(token);
            token = strtok(NULL, ",\n");
        }
    
        // 读取并分割第二行输入
        fgets(inputStr, MAX_SIZE, stdin);
        token = strtok(inputStr, ",\n");
        while (token != NULL) {
            outputSequence[outputSize++] = atoi(token);
            token = strtok(NULL, ",\n");
        }
    
        Deque deque;
        initDeque(&deque);
        char output[MAX_SIZE];
        int outputIndex = 0, outputCharIndex = 0;
    
        // 遍历放入篮球的编号
        for (int i = 0; i < inputSize; i++) {
            offerLast(&deque, inputNumbers[i]);
    
            // 当双端队列不为空且输出序列索引小于输出序列长度时
            while (!isEmpty(&deque) && outputIndex < outputSize) {
                if (peekFirst(&deque) == outputSequence[outputIndex]) {
                    pollFirst(&deque);
                    output[outputCharIndex++] = 'L';
                    outputIndex++;
                } else if (peekLast(&deque) == outputSequence[outputIndex]) {
                    pollLast(&deque);
                    output[outputCharIndex++] = 'R';
                    outputIndex++;
                } else {
                    break;
                }
            }
        }
    
        // 判断是否可以按顺序取出所有篮球
        output[outputCharIndex] = '\0'; // 结束字符串
        if (outputIndex != outputSize) {
            printf("NO\n");
        } else {
            printf("%s\n", output);
        }
    
        return 0;
    }
    

![fengmian](https://i-blog.csdnimg.cn/blog_migrate/87e0c94913bd9e6ea2f4454c856a684e.png)

## 完整用例

### 用例1

    
    
    1,2,3,4,5
    1,2,3,4,5
    

### 用例2

    
    
    1,2,3,4,5
    5,4,3,2,1
    

### 用例3

    
    
    1,2,3,4,5
    3,1,2,4,5
    

### 用例4

    
    
    1,2,3,4,5
    2,3,1,4,5
    

### 用例5

    
    
    1,2,3,4,5
    1,3,5,2,4
    

### 用例6

    
    
    1
    1
    

### 用例7

    
    
    1,2,3,4,5
    5,3,1,2,4
    

### 用例8

    
    
    1,2,3,4,5
    3,4,5,1,2
    

### 用例9

    
    
    2,4,6,8,10
    2,4,6,8,10
    

### 用例10

    
    
    1,2,3,4,5,6
    1,2,3,6,5,4
    

