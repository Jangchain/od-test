## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

给定一个单链表 L，请编写程序输出 L 中间结点保存的数据。

如果有两个中间结点，则输出第二个中间结点保存的数据。

例如：

  * 给定 L 为 1→7→5，则输出应该为 7；
  * 给定 L 为 1→2→3→4，则输出应该为 3。

## 输入描述

每个输入包含 1 个测试用例。每个测试用例:

第 1 行给出链表首结点的地址、结点总个数正整数 N (≤105)。

结点的地址是 5 位非负整数，NULL 地址用 −1 表示。

接下来有 N 行，每行格式为：

    
    
    Address Data Next 
    

其中 Address 是结点地址，Data 是该结点保存的整数数据(0 ≤ Data ≤ 108)，Next 是下一结点的地址。

## 输出描述

对每个测试用例，在一行中输出 L 中间结点保存的数据。

如果有两个中间结点，则输出第二个中间结点保存的数据。

( 如果奇数个节点取中间，偶数个取偏右边的那个值)

## 示例1

输入

    
    
    00010 4
    00000 3 -1
    00010 5 12309
    11451 6 00000
    12309 7 11451
    

输出

    
    
    6
    

说明

> 无

## 示例2

输入

    
    
    10000 3
    76892 7 12309
    12309 5 -1
    10000 1 76892
    

输出

    
    
    7
    

说明

> ## 示例3

输入

    
    
    00100 4
    00000 4 -1
    00100 1 12309
    33218 3 00000
    12309 2 33218
    

输出

    
    
    3
    

说明

> ## 解题思路

  * **示例 1** ：

链表为：`5 -> 7 -> 6 -> 3`，长度为 4，偶数节点，因此中间两个节点是 `7` 和 `6`，输出第二个中间结点的值：`6`。

  * **示例 2** ：

链表为：`1 -> 7 -> 5`，长度为 3，奇数节点，中间结点是 `7`，输出 `7`。

  * **示例 3** ：

链表为：`1 -> 2 -> 3 -> 4`，长度为 4，偶数节点，中间两个节点是 `2` 和 `3`，输出第二个中间结点的值：`3`。

这道题的要求是给定一个单链表，输出它的**中间结点** 的数据。如果链表长度是奇数，那么中间结点就是第 $\frac{n+1}{2} $
个结点（第一个结点为第 1 个）；如果链表长度是偶数，则中间结点是第 $ \frac{n}{2} + 1 $ 个结点，也就是偏右的那个结点。

通过输入中的 `Address`、`Data`、`Next` 信息，首先建立链表的结构。，使用**快慢指针法**
，一个指针每次移动两步，另一个指针每次移动一步，当快指针到达链表末尾时，慢指针刚好位于中间节点。对于偶数长度的链表，这样的算法能自动返回偏右的那个节点。

## Java

    
    
    import java.util.HashMap;
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            Scanner sc = new Scanner(System.in);
    
            // 输入链表头节点地址和节点数
            String[] firstLine = sc.nextLine().split(" ");
            String headAddress = firstLine[0];
            int n = Integer.parseInt(firstLine[1]);
    
            // 创建 HashMap 存储每个节点的值和下一个节点的地址
            HashMap<String, String[]> nodeMap = new HashMap<>();
            for (int i = 0; i < n; i++) {
                String[] nodeData = sc.nextLine().split(" ");
                String address = nodeData[0];
                String value = nodeData[1];
                String nextAddress = nodeData[2];
                nodeMap.put(address, new String[]{value, nextAddress});
            }
    
            // 初始化慢指针和快指针，均指向头节点
            String slow = headAddress;
            String fast = headAddress;
    
            // 快指针每次走两步，慢指针每次走一步，直到快指针到达链表末尾
            while (fast != null && nodeMap.containsKey(fast)) {
                fast = nodeMap.get(fast)[1]; // 快指针走一步
                if (fast == null || !nodeMap.containsKey(fast)) {
                    break; // 如果快指针到达链表末尾，结束
                }
                fast = nodeMap.get(fast)[1]; // 快指针再走一步
                slow = nodeMap.get(slow)[1]; // 慢指针走一步
            }
    
            // 输出慢指针指向的节点的值
            System.out.println(nodeMap.get(slow)[0]);
        }
    }
    

## Python

    
    
    # 使用字典模拟链表
    node_map = {}
    
    # 读取输入
    head_address, n = input().split()
    n = int(n)
    
    # 读取每个节点的信息并存储在字典中
    for _ in range(n):
        address, value, next_address = input().split()
        node_map[address] = (value, next_address)
    
    
    # 初始化慢指针和快指针，均指向头节点
    slow = head_address
    fast = head_address
    
    # 快指针每次走两步，慢指针每次走一步，直到快指针到达链表末尾
    while fast != '-1' and fast in node_map:
        fast = node_map[fast][1]  # 快指针走一步
        if fast == '-1' or fast not in node_map:
            break  # 快指针到达链表末尾，结束循环
        fast = node_map[fast][1]  # 快指针再走一步
        slow = node_map[slow][1]  # 慢指针走一步
    
    # 输出慢指针指向的节点的值
    print(node_map[slow][0])
    

## JavaScript

    
    
    const readline = require('readline');
    
    // 创建接口读取输入
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    // 保存链表数据的Map
    let nodeMap = new Map();
    let headAddress = '';
    let n = 0;
    let lineCount = 0;
    
    // 读取输入的每一行
    rl.on('line', (line) => {
        lineCount++;
        let data = line.split(' ');
        
        if (lineCount === 1) {
            // 读取头节点地址和节点数
            headAddress = data[0];
            n = parseInt(data[1]);
        } else {
            // 存储节点信息
            nodeMap.set(data[0], [data[1], data[2]]);
            if (lineCount - 1 === n) {
                rl.close(); // 读取完毕后关闭输入
            }
        }
    });
    
    // 处理逻辑
    rl.on('close', () => {
    
        let slow = headAddress;
        let fast = headAddress;
    
        // 快指针每次走两步，慢指针每次走一步
        while (fast !== '-1' && nodeMap.has(fast)) {
            fast = nodeMap.get(fast)[1];
            if (fast === '-1' || !nodeMap.has(fast)) break;
            fast = nodeMap.get(fast)[1];
            slow = nodeMap.get(slow)[1];
        }
    
        // 输出慢指针指向的节点的值
        console.log(nodeMap.get(slow)[0]);
    });
    

## C++

    
    
    #include <iostream>
    #include <unordered_map>
    #include <string>
    using namespace std;
    
    int main() {
        int n;
        string headAddress;
        cin >> headAddress >> n;
    
        // 使用unordered_map存储每个节点的值和下一个节点的地址
        unordered_map<string, pair<string, string>> nodeMap;
        for (int i = 0; i < n; i++) {
            string address, value, nextAddress;
            cin >> address >> value >> nextAddress;
            nodeMap[address] = {value, nextAddress}; // 将数据存入哈希表
        }
    
        // 如果头节点不存在，直接退出
        if (nodeMap.find(headAddress) == nodeMap.end()) {
            return 0;
        }
    
        // 初始化慢指针和快指针，均指向头节点
        string slow = headAddress, fast = headAddress;
    
        // 快指针每次走两步，慢指针每次走一步，直到快指针到达链表末尾
        while (fast != "-1" && nodeMap.find(fast) != nodeMap.end()) {
            fast = nodeMap[fast].second; // 快指针走一步
            if (fast == "-1" || nodeMap.find(fast) == nodeMap.end()) {
                break; // 快指针到达链表末尾，退出循环
            }
            fast = nodeMap[fast].second; // 快指针再走一步
            slow = nodeMap[slow].second; // 慢指针走一步
        }
    
        // 输出慢指针指向的节点的值
        cout << nodeMap[slow].first << endl;
    
        return 0;
    }
    

## C语言

    
    
    #include <stdio.h>
    #include <string.h>
    
    // 定义节点结构
    typedef struct Node {
        char address[6];   // 节点地址
        char data[9];      // 节点保存的数据
        char nextAddress[6]; // 下一节点的地址
    } Node;
    
    int main() {
        int n;
        char headAddress[6];
        
        // 读取头节点地址和节点数
        scanf("%s %d", headAddress, &n);
        
        Node nodes[n]; // 使用数组存储节点信息
        
        // 读取每个节点的信息
        for (int i = 0; i < n; i++) {
            scanf("%s %s %s", nodes[i].address, nodes[i].data, nodes[i].nextAddress);
        }
    
        // 初始化指针，慢指针和快指针均指向头节点
        char slow[6], fast[6];
        strcpy(slow, headAddress);
        strcpy(fast, headAddress);
    
        // 快慢指针的逻辑
        while (strcmp(fast, "-1") != 0) {
            int fastIndex = findNodeIndex(fast, nodes, n);
            if (fastIndex == -1) break;
            
            strcpy(fast, nodes[fastIndex].nextAddress); // 快指针走一步
            if (strcmp(fast, "-1") == 0) break;
            
            fastIndex = findNodeIndex(fast, nodes, n);
            if (fastIndex == -1) break;
            
            strcpy(fast, nodes[fastIndex].nextAddress); // 快指针再走一步
            int slowIndex = findNodeIndex(slow, nodes, n);
            strcpy(slow, nodes[slowIndex].nextAddress); // 慢指针走一步
        }
    
        // 输出慢指针指向的节点的值
        int slowIndex = findNodeIndex(slow, nodes, n);
        printf("%s\n", nodes[slowIndex].data);
    
        return 0;
    }
    

## 完整用例

### 用例1

    
    
    00010 4
    00000 3 -1
    00010 5 12309
    11451 6 00000
    12309 7 11451
    

### 用例2

    
    
    10000 3
    76892 7 12309
    12309 5 -1
    10000 1 76892
    

### 用例3

    
    
    00000 1
    00000 1 -1
    

### 用例4

    
    
    00000 2
    00000 1 00001
    00001 2 -1
    

### 用例5

    
    
    00000 3
    00000 1 00001
    00001 2 00002
    00002 3 -1
    

### 用例6

    
    
    00000 4
    00000 1 00001
    00001 2 00002
    00002 3 00003
    00003 4 -1
    

### 用例7

    
    
    00000 4
    00000 1 00001
    00001 2 00002
    00002 3 -1
    00003 4 00004
    

### 用例8

    
    
    00000 3
    00000 1 00001
    00001 1 00002
    00002 1 -1
    

### 用例9

    
    
    00000 3
    00000 -1 00001
    00001 -2 00002
    00002 -3 -1
    

### 用例10

    
    
    00000 3
    00000 0 00001
    00001 0 00002
    00002 0 -1
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

