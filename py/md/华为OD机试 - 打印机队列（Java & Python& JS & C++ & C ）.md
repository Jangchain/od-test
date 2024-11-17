## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

有5台打印机打印文件，每台打印机有自己的待打印队列。

因为打印的文件内容有轻重缓急之分，所以队列中的文件有1~10不同的代先级，其中**数字越大优先级越高** 。

打印机会从自己的待打印队列中选择_**优先级最高** _的文件来打印。

如果存在两个优先级一样的文件，则选择_**最早进入队列** _的那个文件。

现在请你来模拟这5台打印机的打印过程。

## 输入描述

每个输入包含1个测试用例，

每个测试用例第一行给出发生事件的数量N（0 < N < 1000）。

接下来有 N 行，分别表示发生的事件。共有如下两种事件：

  1. “IN P NUM”，表示有一个拥有优先级 NUM 的文件放到了打印机 P 的待打印队列中。（0< P <= 5, 0 < NUM <= 10)；
  2. “OUT P”，表示打印机 P 进行了一次文件打印，同时该文件从待打印队列中取出。（0 < P <= 5）。

###

## 输出描述

对于每个测试用例，每次”OUT P”事件，请在一行中**输出文件的编号** 。

如果此时没有文件可以打印，请输出”**NULL** “。

文件的编号定义为”IN P NUM”事件发生第 x 次，此处待打印文件的编号为x。编号从**1** 开始。

## 示例1

输入

    
    
    7
    IN 1 1
    IN 1 2
    IN 1 3
    IN 2 1
    OUT 1
    OUT 2
    OUT 2
    

输出

    
    
    3
    4
    NULL
    

说明

> ## 示例2

输入

    
    
    5
    IN 1 1
    IN 1 3
    IN 1 1
    IN 1 3
    OUT 1
    

输出

    
    
    2
    

说明

> ## Java
    
    
    import java.util.Scanner;
    import java.util.PriorityQueue;
    import java.util.Comparator;
    import java.util.List;
    import java.util.ArrayList;
    
    class File {
        int priority;
        int id;
    
        public File(int priority, int id) {
            this.priority = priority;
            this.id = id;
        }
    }
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            int count = scanner.nextInt();
            scanner.nextLine();
    
            // 创建5台打印机的打印队列
            List<PriorityQueue<File>> printMachines = new ArrayList<>();
            for (int i = 0; i < 5; i++) {
                PriorityQueue<File> printQueue = new PriorityQueue<>(new Comparator<File>() {
                    @Override
                    public int compare(File f1, File f2) {
                        if (f2.priority != f1.priority) {
                            return f2.priority - f1.priority;
                        } else {
                            return f1.id - f2.id;
                        }
                    }
                });
                printMachines.add(printQueue);
            }
    
            int fileCount = 0;
            for (int i = 0; i < count; i++) {
                String[] operationInfo = scanner.nextLine().split(" ");
    
                if (operationInfo[0].equals("IN")) {
                    fileCount++;
                    int printerIndex = Integer.parseInt(operationInfo[1]) - 1;
                    int priority = Integer.parseInt(operationInfo[2]);
                    File file = new File(priority, fileCount);
                    // 将文件放入对应打印机的打印队列
                    printMachines.get(printerIndex).add(file);
                } else if (operationInfo[0].equals("OUT")) {
                    int printerIndex = Integer.parseInt(operationInfo[1]) - 1;
                    PriorityQueue<File> printQueue = printMachines.get(printerIndex);
                    if (!printQueue.isEmpty()) {
                        System.out.println(printQueue.poll().id);
                    } else {
                        System.out.println("NULL");
                    }
                }
            }
            scanner.close();
        }
    }
    
    

## Python

    
    
    import sys
    import heapq
    
    class File:
        def __init__(self, priority, id):
            self.priority = priority
            self.id = id
        
        def __lt__(self, other):
            if self.priority != other.priority:
                return self.priority > other.priority  # Invert the comparison to simulate max-heap
            else:
                return self.id < other.id
    
    def main():
        input = sys.stdin.read
        data = input().splitlines()
        
        count = int(data[0])
        printMachines = [[] for _ in range(5)]  # List of heaps for each printer
        
        fileCount = 0
    
        for i in range(1, count + 1):
            operationInfo = data[i].split()
            command = operationInfo[0]
            printerIndex = int(operationInfo[1]) - 1
            
            if command == "IN":
                priority = int(operationInfo[2])
                fileCount += 1
                file = File(priority, fileCount)
                heapq.heappush(printMachines[printerIndex], file)
            elif command == "OUT":
                if printMachines[printerIndex]:
                    file = heapq.heappop(printMachines[printerIndex])
                    print(file.id)
                else:
                    print("NULL")
    
    if __name__ == "__main__":
        main()
    
    

## JavaScript

    
    
    const readline = require("readline");
    
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    let input = [];
    rl.on("line", (line) => {
        input.push(line);
    });
    
    rl.on("close", () => {
        const count = parseInt(input[0]);
        const printMachines = [[], [], [], [], []]; // 5个打印机队列
    
        let fileCount = 0;
    
        for (let i = 1; i <= count; i++) {
            const operationInfo = input[i].split(" ");
            const operation = operationInfo[0];
            const printerIndex = parseInt(operationInfo[1]) - 1;
    
            if (operation === "IN") {
                fileCount++;
                const priority = parseInt(operationInfo[2]);
                const file = { priority: priority, id: fileCount };
                printMachines[printerIndex].push(file);
    
                // 按优先级和文件编号排序
                printMachines[printerIndex].sort((a, b) => {
                    if (b.priority !== a.priority) {
                        return b.priority - a.priority;
                    } else {
                        return a.id - b.id;
                    }
                });
            } else if (operation === "OUT") {
                if (printMachines[printerIndex].length > 0) {
                    console.log(printMachines[printerIndex].shift().id);
                } else {
                    console.log("NULL");
                }
            }
        }
    });
    
    

## C++

    
    
    #include <iostream>
    #include <vector>
    #include <queue>
    #include <functional>
    #include <string>
    using namespace std;
    struct File {
        int priority;
        int id;
        
        File(int priority, int id) : priority(priority), id(id) {}
    };
    
    struct Compare {
        bool operator()(const File& f1, const File& f2) {
            if (f1.priority != f2.priority)
                return f1.priority < f2.priority;
            else
                return f1.id > f2.id;
        }
    };
    
    int main() {
        int count;
        cin >> count;
        
        vector<priority_queue<File, vector<File>, Compare>> printMachines(5);
        
        int fileCount = 0;
        for (int i = 0; i < count; i++) {
            string command;
            int printerIndex, priority;
            cin >> command;
            cin >> printerIndex;
            printerIndex--; // Adjust index to 0-based
            
            if (command == "IN") {
                cin >> priority;
                fileCount++;
                printMachines[printerIndex].emplace(priority, fileCount);
            } else if (command == "OUT") {
                if (!printMachines[printerIndex].empty()) {
                    cout << printMachines[printerIndex].top().id << endl;
                    printMachines[printerIndex].pop();
                } else {
                    cout << "NULL" << endl;
                }
            }
        }
        return 0;
    }
    
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    
    #define MAX_FILES 1000 // 假设最大文件数量
    #define MAX_PRINTERS 5
    
    typedef struct {
        int priority;
        int id;
    } File;
    
    typedef struct {
        File queue[MAX_FILES];
        int size;
    } PrinterQueue;
    
    // 比较函数用于排序文件，按优先级降序，若优先级相同则按文件编号升序
    int compareFiles(const void *a, const void *b) {
        File *file1 = (File *)a;
        File *file2 = (File *)b;
        if (file1->priority != file2->priority) {
            return file2->priority - file1->priority;
        } else {
            return file1->id - file2->id;
        }
    }
    
    // 初始化打印机队列
    void initPrinterQueues(PrinterQueue printers[]) {
        for (int i = 0; i < MAX_PRINTERS; i++) {
            printers[i].size = 0;
        }
    }
    
    void addFile(PrinterQueue *printer, int priority, int id) {
        printer->queue[printer->size].priority = priority;
        printer->queue[printer->size].id = id;
        printer->size++;
    
        // 排序队列
        qsort(printer->queue, printer->size, sizeof(File), compareFiles);
    }
    
    int removeFile(PrinterQueue *printer) {
        if (printer->size == 0) {
            return -1; // 表示队列为空
        }
        int fileId = printer->queue[0].id;
        // 移动队列中的文件
        for (int i = 1; i < printer->size; i++) {
            printer->queue[i - 1] = printer->queue[i];
        }
        printer->size--;
        return fileId;
    }
    
    int main() {
        int count;
        scanf("%d", &count);
    
        PrinterQueue printers[MAX_PRINTERS];
        initPrinterQueues(printers);
    
        int fileCount = 0;
    
        for (int i = 0; i < count; i++) {
            char operation[4];
            int printerIndex, priority;
    
            scanf("%s %d", operation, &printerIndex);
            printerIndex--; // 转为0索引
    
            if (operation[0] == 'I') { // "IN" 操作
                scanf("%d", &priority);
                fileCount++;
                addFile(&printers[printerIndex], priority, fileCount);
            } else if (operation[0] == 'O') { // "OUT" 操作
                int fileId = removeFile(&printers[printerIndex]);
                if (fileId == -1) {
                    printf("NULL\n");
                } else {
                    printf("%d\n", fileId);
                }
            }
        }
    
        return 0;
    }
    
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

