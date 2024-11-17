## 题目描述

推荐多样性需要从多个列表中选择元素，一次性要返回 N 屏数据（窗口数量），每屏展示 K 个元素（窗口大小），选择策略：

  1. 各个列表元素需要做穿插处理，即先从第一个列表中为每屏选择一个元素，再从第二个列表中为每屏选择一个元素，依次类推

  2. 每个列表的元素尽量均分为 N 份，如果不够 N 个，也要全部分配完，参考样例图：

（1）从第一个列表中选择 4 条 0 1 2 3，分别放到 4 个窗口中

（2）从第二个列表中选择 4 条 10 11 12 13，分别放到 4 个窗口中

（3）从第三个列表中选择 4 条 20 21 22 23，分别放到 4 个窗口中

（4）再从第一个列表中选择 4 条 4 5 6 7，分别放到 4 个窗口中

…

（5）再从第一个列表中选择，由于数量不足 4 条，取剩下的 2 条，放到 窗口1 和 窗口2

（6）再从第二个列表中选择，由于数量不足 4 条并且总的元素数达到窗口要求，取 18 19 放到 窗口3 和 窗口4

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/df3986634213140496a9cd3120f10f1f.png)

## 输入描述

第一行输入为 N，表示需要输出的窗口数量，取值范围 [1, 10]

第二行输入为 K，表示每个窗口需要的元素数量，取值范围 [1, 100]

之后的行数不定（行数取值范围 [1, 10]），表示每个列表输出的元素列表。元素之间以空格隔开，已经过排序处理，每个列表输出的元素数量取值范围 [1,
100]

## 输出描述

输出元素列表，元素数量 = 窗口数量 * 窗口大小，元素之间以空格分隔，多个窗口合并为一个列表输出，参考样例：

先输出窗口1的元素列表，再输出窗口2的元素列表，再输出窗口3的元素列表，最后输出窗口4的元素列表

## 备注

  1. 每个列表会保证元素数量满足窗口要求，不需要考虑元素不足情况
  2. 每个列表的元素已去重，不需要考虑元素重复情况
  3. 每个列表的元素列表均不为空，不需要考虑列表为空的情况
  4. 每个列表的元素列表已经过排序处理，输出结果要保证不改变同一个列表的元素顺序
  5. 每个列表的元素数量可能是不同的

## 用例

输入

    
    
    4
    7
    0 1 2 3 4 5 6 7 8 9
    10 11 12 13 14 15 16 17 18 19
    20 21 22 23 24 25 26 27 28 29
    

输出

    
    
    0 10 20 4 14 24 8 1 11 21 5 15 25 9 2 12 22 6 16 26 18 3 13 23 7 17 27 19
    

## 解题思路

题目描述的核心是实现一个特定的元素选择和分配策略，以确保从多个列表中选取的元素能够满足给定的输出要求。具体来说，需要从多个输入列表中选择元素，将这些元素分配到指定数量的窗口中，每个窗口展示固定数量的元素。选择和分配元素时，需要遵循以下规则：

  1. **穿插处理** ：元素的选择需要按照列表的顺序依次进行，即先从第一个列表中选择元素填充到每个窗口中，然后是第二个列表，以此类推。这样做的目的是确保输出的元素列表能够反映出输入列表的多样性。

  2. **均分元素** ：每个列表中的元素需要尽可能均匀地分配到所有窗口中。如果某个列表的元素不足以在所有窗口中均匀分配，那么这些元素仍然需要全部被分配出去，直到该列表的元素耗尽。

  3. **保持顺序** ：在选择和分配元素时，需要保持每个列表中元素的原始顺序不变。这意味着不能对列表中的元素进行排序或重新排列。

  4. **满足窗口要求** ：最终输出的元素数量等于窗口数量乘以每个窗口的大小。输出的元素列表是通过将所有窗口的元素合并成一个列表来实现的，且需要按照窗口的顺序进行合并。

首先读取窗口数量和每个窗口的大小，然后读取每个列表的元素并将其存储在队列中。接着，代码通过循环遍历队列列表，按照规定的规则从队列中选择元素并将它们分配到一个数组中。这个数组最终被用来构建和输出最终的元素列表。在选择和分配过程中，代码确保了元素的选择是穿插进行的，每个列表中的元素被均匀分配，且保持了元素的原始顺序。最终，代码输出的元素列表满足了题目的所有要求。

## C++

    
    
    #include <iostream>
    #include <vector>
    #include <queue>
    #include <sstream>
    #include <string>
    
    using namespace std;
    int main() {
        int numberOfRows, numberOfColumns;
        cin >> numberOfRows >> numberOfColumns;
        cin.ignore(); // 忽略换行符
    
        vector<queue<int>> queueList;
        string inputLine;
    
        // 循环读取输入，每次读取一行，直到输入结束
        while (getline(cin, inputLine) && !inputLine.empty()) {
            istringstream iss(inputLine);
            queue<int> numberQueue;
            int number;
    
            // 将一行中的数分割并加入到队列中
            while (iss >> number) {
                numberQueue.push(number);
            }
    
            queueList.push_back(numberQueue);
        }
    
        vector<int> matrix(numberOfColumns * numberOfRows, 0);
        int matrixIndex = 0;
        int queueIndex = 0;
    
        // 循环，直到所有元素被分配完毕
        while (matrixIndex < matrix.size()) {
            bool didRemoveQueue = false;
    
            for (int i = 0; i < numberOfRows && !queueList.empty(); ++i) {
                if (queueList[queueIndex].empty()) {
                    queueList.erase(queueList.begin() + queueIndex);
                    if (queueList.empty()) break;
                    queueIndex %= queueList.size();
                    didRemoveQueue = true;
                }
    
                if (!queueList[queueIndex].empty()) {
                    matrix[matrixIndex++] = queueList[queueIndex].front();
                    queueList[queueIndex].pop();
                    if (matrixIndex >= matrix.size()) break;
                }
            }
    
            if (!didRemoveQueue && !queueList.empty()) {
                queueIndex = (queueIndex + 1) % queueList.size();
            }
        }
    
        // 按顺序输出结果
        for (int row = 0; row < numberOfRows; ++row) {
            for (int col = 0; col < numberOfColumns; ++col) {
                cout << matrix[col * numberOfRows + row] << " ";
            }
        }
    
        return 0;
    }
    

## Java

    
    
    import java.util.*;
    import java.util.stream.Collectors;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
    
            // 读取窗口数量N
            int numberOfRows = Integer.parseInt(scanner.nextLine());
            // 读取每个窗口需要的元素数量K
            int numberOfColumns = Integer.parseInt(scanner.nextLine());
    
            // 创建队列列表，用于存储每个列表的元素
            List<Queue<Integer>> queueList = new ArrayList<>();
    
            // 循环读取输入的每个列表，并将其转换为队列存储在queueList中
            while (scanner.hasNextLine()) {
                String inputLine = scanner.nextLine();
                Queue<Integer> numberQueue = Arrays.stream(inputLine.split(" "))
                                                   .map(Integer::parseInt)
                                                   .collect(Collectors.toCollection(LinkedList::new));
    
                queueList.add(numberQueue);
            }
    
            // 创建一个数组，用于存储最终的元素排列
            int[] matrix = new int[numberOfColumns * numberOfRows];
            int matrixIndex = 0; // 用于标记当前填充到matrix数组中的位置
            int queueIndex = 0; // 用于标记当前处理的队列索引
    
            // 循环，直到matrix数组被完全填满
            while (matrixIndex < matrix.length) {
                boolean didRemoveQueue = false; // 标记本轮循环中是否有队列被移除
    
                // 遍历每个窗口，并尝试从当前队列中为每个窗口提取一个元素
                for (int i = 0; i < numberOfRows && !queueList.isEmpty(); i++) {
                    // 如果当前队列为空，则移除该队列
                    if (queueList.get(queueIndex).isEmpty()) {
                        queueList.remove(queueIndex);
                        if (queueList.isEmpty()) break; // 如果所有队列都已处理完毕，则退出循环
                        queueIndex %= queueList.size(); // 调整队列索引，防止索引越界
                        didRemoveQueue = true;
                    }
                    // 如果当前队列不为空，则从队列中取出一个元素填充到matrix数组中
                    if (!queueList.get(queueIndex).isEmpty()) {
                        matrix[matrixIndex++] = queueList.get(queueIndex).poll();
                        if (matrixIndex >= matrix.length) break; // 如果matrix数组已填满，则退出循环
                    }
                }
    
                // 如果本轮循环没有队列被移除，并且队列列表不为空，则处理下一个队列
                if (!didRemoveQueue && !queueList.isEmpty()) {
                    queueIndex = (queueIndex + 1) % queueList.size();
                }
            }
    
            // 使用StringBuilder构建最终的输出字符串
            StringBuilder sb = new StringBuilder();
            // 遍历matrix数组，按照窗口顺序构建输出字符串
            for (int row = 0; row < numberOfRows; row++) {
                for (int col = 0; col < numberOfColumns; col++) {
                    sb.append(matrix[col * numberOfRows + row]).append(" ");
                }
            }
    
            // 输出最终的元素排列，去除末尾的空格
            System.out.println(sb.toString().trim());
        }
    }
    

## javaScript

    
    
    const readline = require('readline');
    
    // 创建 readline 接口实例
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    // 定义存储输入的数组
    const inputs = [];
    
    // 读取输入
    rl.on('line', (input) => {
      inputs.push(input);
    }).on('close', () => {
      // 读取窗口数量N
      const numberOfRows = parseInt(inputs[0]);
      // 读取每个窗口需要的元素数量K
      const numberOfColumns = parseInt(inputs[1]);
    
      // 创建队列列表，用于存储每个列表的元素
      const queueList = inputs.slice(2).map(line => line.split(' ').map(Number));
    
      // 创建一个数组，用于存储最终的元素排列
      const matrix = new Array(numberOfColumns * numberOfRows).fill(0);
      let matrixIndex = 0; // 用于标记当前填充到matrix数组中的位置
      let queueIndex = 0; // 用于标记当前处理的队列索引
    
      // 循环，直到matrix数组被完全填满
      while (matrixIndex < matrix.length) {
        let didRemoveQueue = false; // 标记本轮循环中是否有队列被移除
    
        // 遍历每个窗口，并尝试从当前队列中为每个窗口提取一个元素
        for (let i = 0; i < numberOfRows; i++) {
          if (!queueList.length) { // 如果所有队列都已处理完毕，则退出循环
            break;
          }
          // 如果当前队列为空，则移除该队列
          if (!queueList[queueIndex].length) {
            queueList.splice(queueIndex, 1);
            if (!queueList.length) {
              break;
            }
            queueIndex %= queueList.length;
            didRemoveQueue = true;
          }
          // 如果当前队列不为空，则从队列中取出一个元素填充到matrix数组中
          if (queueList.length && queueList[queueIndex].length) {
            matrix[matrixIndex] = queueList[queueIndex].shift();
            matrixIndex += 1;
            if (matrixIndex >= matrix.length) {
              break;
            }
          }
        }
    
        // 如果本轮循环没有队列被移除，并且队列列表不为空，则处理下一个队列
        if (!didRemoveQueue && queueList.length) {
          queueIndex = (queueIndex + 1) % queueList.length;
        }
      }
    
      // 按照窗口顺序构建输出字符串
      const output = [];
      for (let row = 0; row < numberOfRows; row++) {
        
        for (let col = 0; col < numberOfColumns; col++) {
          output.push(matrix[col * numberOfRows + row]);
        }
      }
       console.log(output.join(' '));
    
    });
    
     
    

## Python

    
    
    import sys
    
    
    # 读取窗口数量N
    numberOfRows = int(input())
    # 读取每个窗口需要的元素数量K
    numberOfColumns = int(input())
    
    # 创建队列列表，用于存储每个列表的元素
    queueList = []
    while True:
        try:
            queueList.append(list(map(int, input().split())))
        except:
            break
     
    
    # 创建一个列表，用于存储最终的元素排列
    matrix = [0] * (numberOfColumns * numberOfRows)
    matrixIndex = 0  # 用于标记当前填充到matrix列表中的位置
    queueIndex = 0  # 用于标记当前处理的队列索引
    
    # 循环，直到matrix列表被完全填满
    while matrixIndex < len(matrix):
        didRemoveQueue = False  # 标记本轮循环中是否有队列被移除
    
        # 遍历每个窗口，并尝试从当前队列中为每个窗口提取一个元素
        for i in range(numberOfRows):
            if not queueList:  # 如果所有队列都已处理完毕，则退出循环
                break
            # 如果当前队列为空，则移除该队列
            if not queueList[queueIndex]:
                queueList.pop(queueIndex)
                if not queueList:
                    break
                queueIndex %= len(queueList)
                didRemoveQueue = True
            # 如果当前队列不为空，则从队列中取出一个元素填充到matrix列表中
            if queueList and queueList[queueIndex]:
                matrix[matrixIndex] = queueList[queueIndex].pop(0)
                matrixIndex += 1
                if matrixIndex >= len(matrix):
                    break
    
        # 如果本轮循环没有队列被移除，并且队列列表不为空，则处理下一个队列
        if not didRemoveQueue and queueList:
            queueIndex = (queueIndex + 1) % len(queueList)
    
    # 按照窗口顺序构建输出字符串
    for row in range(numberOfRows):
        for col in range(numberOfColumns):
            print(matrix[col * numberOfRows + row], end=" ")
        
    
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    #include <string.h>
    #include <limits.h> // 引入limits.h以使用INT_MIN
    
    #define MAX_QUEUE 100 // 定义最大队列数量
    #define MAX_LENGTH 1000 // 定义每行最大长度
    
    // 队列结构体定义
    typedef struct {
        int *items; // 队列元素数组
        int front, rear, size, capacity; // 队列的前端、后端、当前大小和容量
    } Queue;
    
    // 创建队列的函数，参数为队列容量
    Queue* createQueue(int capacity) {
        Queue* queue = (Queue*)malloc(sizeof(Queue)); // 动态分配队列结构体内存
        queue->capacity = capacity; // 设置队列容量
        queue->front = queue->size = 0; // 初始化队列大小和队列前端索引
        queue->rear = capacity - 1; // 初始化队列后端索引
        queue->items = (int*)malloc(queue->capacity * sizeof(int)); // 动态分配队列元素数组内存
        return queue;
    }
    
    // 检查队列是否已满
    int isFull(Queue* queue) {
        return (queue->size == queue->capacity);
    }
    
    // 检查队列是否为空
    int isEmpty(Queue* queue) {
        return (queue->size == 0);
    }
    
    // 向队列中添加元素
    void enqueue(Queue* queue, int item) {
        if (isFull(queue))
            return;
        queue->rear = (queue->rear + 1) % queue->capacity; // 循环队列中rear的更新
        queue->items[queue->rear] = item; // 在rear位置添加元素
        queue->size = queue->size + 1; // 更新队列大小
    }
    
    // 从队列中移除元素
    int dequeue(Queue* queue) {
        if (isEmpty(queue))
            return INT_MIN; // 如果队列为空，返回INT_MIN
        int item = queue->items[queue->front]; // 获取队列前端元素
        queue->front = (queue->front + 1) % queue->capacity; // 循环队列中front的更新
        queue->size = queue->size - 1; // 更新队列大小
        return item;
    }
    
    // 获取队列的前端元素
    int front(Queue* queue) {
        if (isEmpty(queue))
            return INT_MIN; // 如果队列为空，返回INT_MIN
        return queue->items[queue->front]; // 返回队列前端元素
    }
    
    int main() {
        int numberOfRows, numberOfColumns;
        scanf("%d %d", &numberOfRows, &numberOfColumns); // 读取行数和列数
    
        Queue* queueList[MAX_QUEUE]; // 队列数组
        int queueCount = 0; // 实际队列数量
        char inputLine[MAX_LENGTH]; // 输入行缓冲
    
        getchar(); // 清空输入缓冲区
    
        // 循环读取输入
        while (fgets(inputLine, MAX_LENGTH, stdin) && inputLine[0] != '\n') {
            queueList[queueCount] = createQueue(MAX_LENGTH); // 创建新队列
            char* token = strtok(inputLine, " "); // 分割输入行
            while (token != NULL) {
                enqueue(queueList[queueCount], atoi(token)); // 将数值加入队列
                token = strtok(NULL, " "); // 继续分割
            }
            queueCount++; // 更新队列数量
        }
    
        int* matrix = (int*)malloc(numberOfColumns * numberOfRows * sizeof(int)); // 分配矩阵内存
        int matrixIndex = 0; // 矩阵索引
        int queueIndex = 0; // 队列索引
    
        // 循环，直到所有元素被分配完毕
        while (matrixIndex < numberOfColumns * numberOfRows) {
            int didRemoveQueue = 0; // 标记是否移除了队列
    
            for (int i = 0; i < numberOfRows && queueCount > 0; ++i) {
                if (isEmpty(queueList[queueIndex])) { // 如果当前队列为空
                    free(queueList[queueIndex]->items); // 释放队列元素数组内存
                    free(queueList[queueIndex]); // 释放队列结构体内存
                    // 移除空队列
                    for (int j = queueIndex; j < queueCount - 1; ++j) {
                        queueList[j] = queueList[j + 1];
                    }
                    queueCount--; // 更新队列数量
                    if (queueCount == 0) break; // 如果没有队列了，退出循环
                    queueIndex %= queueCount; // 更新队列索引
                    didRemoveQueue = 1; // 标记已移除队列
                }
    
                if (!isEmpty(queueList[queueIndex])) { // 如果当前队列不为空
                    matrix[matrixIndex++] = dequeue(queueList[queueIndex]); // 从队列中取出元素并放入矩阵
                    if (matrixIndex >= numberOfColumns * numberOfRows) break; // 如果矩阵已满，退出循环
                }
            }
    
            if (!didRemoveQueue && queueCount > 0) { // 如果没有移除队列且还有队列
                queueIndex = (queueIndex + 1) % queueCount; // 循环更新队列索引
            }
        }
    
        // 按顺序输出结果
        for (int row = 0; row < numberOfRows; ++row) {
            for (int col = 0; col < numberOfColumns; ++col) {
                printf("%d ", matrix[col * numberOfRows + row]);
            }
         }
    
        // 释放内存
        for (int i = 0; i < queueCount; ++i) {
            free(queueList[i]->items); // 释放队列元素数组内存
            free(queueList[i]); // 释放队列结构体内存
        }
        free(matrix); // 释放矩阵内存
    
        return 0;
    }
    

## 完整用例

用例1

    
    
    4
    7
    0 1 2 3 4 5 6 7 8 9
    10 11 12 13 14 15 16 17 18 19
    20 21 22 23 24 25 26 27 28 29
    

用例2

    
    
    2
    3
    0 1 2 3 4 5 6 7 8 9
    10 11 12 13 14 15 16 17 18 19
    20 21 22 23 24 25 26 27 28 29
    

用例3

    
    
    3
    4
    0 1 2 3 4 5 6 7 8 9
    10 11 12 13 14 15 16 17 18 19
    20 21 22 23 24 25 26 27 28 29
    

用例4

    
    
    4
    5
    0 1 2 3 4 5 6 7 8
    9 10 11 12 13 14
    15 16 17 18 19 20 21
    22 23 24 25 26 27 28 29 30
    31 32 33 34 35
    36 37 38 39 40 41 42
    43 44 45 46 47 48 49 50 51
    52 53 54 55 56 57
    58 59 60 61 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 79 80
    

用例5

    
    
    5
    5
    0 1 2 3 4 5 6 7 8 9
    10 11 12 13 14 15 16 17 18 19
    20 21 22 23 24 25 26 27 28 29
    

用例6

    
    
    1
    9
    0 1 2 3 4 5 6 7 8 9
    10 11 12 13 14 15 16 17 18 19
    20 21 22 23 24 25 26 27 28 29
    

用例7

    
    
    3
    5
    0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60 61 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 79 80 81 82 83 84 85 86 87 88 89 90
    

用例8

    
    
    3
    5
    0 1 2 3 4 5 6 7 8 9
    10 11 12 13 14 15 16 17 18 19
    20 21 22 23 24 25 26 27 28 29
    

用例9

    
    
    4
    4
    0
    1
    2
    3
    4
    5
    6 7 8 9 10 11 12 13 14 15 16 17 18
    

用例10

    
    
    7
    8
    0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24
    25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42
    43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60
    61 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 79 80 81 82 83 84 85 86
    

#### 文章目录

  * 题目描述
  * 输入描述
  * 输出描述
  * 备注
  * 用例
  * 解题思路
  * C++
  * Java
  * javaScript
  * Python
  * C语言
  * 完整用例

![fengmian](https://i-blog.csdnimg.cn/blog_migrate/cdd9ff2d0a58ebf801a5e4651eb58442.png)

