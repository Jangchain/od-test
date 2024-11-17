## 题目描述

给定长度为 n nn 的无序的数字数组，每个数字代表二叉树的叶子节点的权值，数字数组的值均大于等于 1 11
。请完成一个函数，根据输入的数字数组，生成哈夫曼树，并将哈夫曼树按照中序遍历输出。  
为了保证输出的二叉树中序遍历结果统一，增加以下限制:又树节点中，左节点权值小于等于右节点权值，根节点权值为左右节点权值之和。当左右节点权值相同时，左子树高度高度小于等于右子树。  
注意:所有用例保证有效，并能生成哈夫曼树提醒:哈夫曼树又称最优二叉树，是一种带权路径长度最短的一叉树。所谓树的带权路径长度，就是树中所有的叶结点的权值乘上其到根结点的路径长度(若根结点为
0 00 层，叶结点到根结点的路径长度为叶结点的层数)

## 输入描述

例如：由叶子节点 5 15 40 30 10 生成的最优二叉树如下图所示，该树的最短带权路径长度为 40 * 1 + 30 * 2 +5 * 4 + 10
* 4 = 205 。  
![image-20231218210700458](https://i-blog.csdnimg.cn/blog_migrate/2b9bfd525085fc0fa50f901973abbd59.png)

## 输出描述

输出一个哈夫曼的中序遍历数组，数值间以空格分隔

## 用例

输入

    
    
    5
    5 15 40 30 10
    

输出

    
    
    40 100 30 60 15 30 5 15 10
    

## 模拟计算

**请结合上图阅读！** 计算过程如下：

  1. 输入的5个数是：5, 15, 40, 30, 10。
  2. 将这些数作为节点值创建节点，并将节点添加到优先队列中。
  3. 构建哈夫曼树： 
     * 弹出两个最小的节点，值为5和10，合并为一个新节点值为15，将新节点添加回优先队列。
     * 弹出两个最小的节点，值为15（新合成的）和15（原始的），合并为一个新节点值为30，将新节点添加回优先队列。
     * 弹出两个最小的节点，值为30（新合成的）和30（原始的），合并为一个新节点值为60，将新节点添加回优先队列。
     * 弹出两个最小的节点，值为40和60，合并为一个新节点值为100，将新节点添加回优先队列。
     * 此时队列中只剩下一个节点，这就是树的根节点，值为100。
  4. 对哈夫曼树进行中序遍历： 
     * 访问左子树，值为40，它是一个叶子节点，输出40。
     * 访问根节点，值为100，输出100。
     * 访问右子树，值为60，它不是叶子节点，继续中序遍历： 
       * 访问左子树，值为30，它不是叶子节点，继续中序遍历： 
         * 访问左子树，值为15，它是一个叶子节点，输出15。
         * 访问根节点，值为30，输出30。
         * 访问右子树，值为15，它是一个叶子节点，输出15。
       * 访问根节点，值为60，输出60。
       * 访问右子树，值为30，它不是叶子节点，继续中序遍历： 
         * 访问左子树，值为10，它是一个叶子节点，输出10。
         * 访问根节点，值为30，输出30。
         * 右子树为空，无输出。
  5. 最终输出的结果是：40 100 15 30 60 10 30。

## 解题思路

小根堆（最小堆）：实现一个小根堆，用于在构建哈夫曼树的过程中维护节点的顺序，确保每次都能从中取出权值最小的节点。

贪心算法：构建哈夫曼树的过程本身是一个贪心算法的应用，每次选择两个权值最小的节点合并，以确保最终树的带权路径长度最短。

DFS（深度优先搜索）：在进行中序遍历时，使用了递归方法。

## C++

    
    
    #include <iostream>
    #include <vector>
    #include <queue>
    #include <functional>
    using namespace std;
    
    // Node结构用于表示哈夫曼树中的节点
    struct Node {
        int value;       // 节点存储的权值
        Node* left;      // 指向左子节点的指针
        Node* right;     // 指向右子节点的指针
        int height;      // 节点的高度，用于处理相等权值的情况
        Node(int v) : value(v), left(nullptr), right(nullptr), height(0) {}
    };
    
    // Compare结构用于定义优先队列的比较方式
    struct Compare {
        // 重载()操作符，定义比较规则
        bool operator()(Node* a, Node* b) {
            // 首先比较节点的权值，若权值相等则比较高度
            return a->value > b->value || (a->value == b->value && a->height > b->height);
        }
    };
    
    // 构建哈夫曼树的函数
    Node* buildHuffmanTree(const vector<int>& values) {
        priority_queue<Node*, vector<Node*>, Compare> pq;  // 定义优先队列存储节点
        // 遍历所有权值，为每个权值创建一个节点
        for (int value : values) {
            pq.push(new Node(value));
        }
    
        // 当队列中至少有两个节点时，执行循环
        while (pq.size() > 1) {
            Node* left = pq.top(); pq.pop();  // 弹出最小的节点作为左子节点
            Node* right = pq.top(); pq.pop(); // 弹出次小的节点作为右子节点
    
            // 创建一个新节点，其权值为左右子节点的权值之和
            Node* parent = new Node(left->value + right->value);
            // 确保左子节点权值不大于右子节点权值，若相等则比较高度
            if (left->value > right->value || (left->value == right->value && left->height > right->height)) {
                swap(left, right);  // 若需要，交换左右子节点
            }
            parent->left = left;
            parent->right = right;
            parent->height = max(left->height, right->height) + 1;  // 计算新节点的高度
            pq.push(parent);  // 将新节点加入优先队列
        }
        // 返回优先队列中剩余的最后一个节点，即哈夫曼树的根节点
        return pq.top();
    }
    
    // 中序遍历哈夫曼树，并将遍历结果保存为字符串
    void inorderTraversal(Node* root, string& result) {
        if (root) {
            inorderTraversal(root->left, result);  // 遍历左子树
            result += to_string(root->value) + " ";  // 访问当前节点
            inorderTraversal(root->right, result);  // 遍历右子树
        }
    }
    
    // 主函数
    int main() {
        int n;  // 存储节点数量
        cin >> n;
        vector<int> values(n);  // 存储所有节点的权值
        for (int i = 0; i < n; ++i) {
            cin >> values[i];  // 输入权值
        }
        Node* root = buildHuffmanTree(values);  // 构建哈夫曼树
        string result;  // 用于存储中序遍历结果
        inorderTraversal(root, result);  // 执行中序遍历
        if (!result.empty()) {
            result.pop_back();  // 移除最后的空格
        }
        cout << result << endl;  // 输出中序遍历结果
        return 0;
    }
    

## Java

    
    
    import java.util.PriorityQueue;
    import java.util.Comparator;
    import java.util.Scanner;
    import java.util.ArrayList;
    
    // 定义一个节点类来表示哈夫曼树中的节点
    class Node {
        int value;       // 节点存储的权值
        Node left;       // 指向左子节点的引用
        Node right;      // 指向右子节点的引用
        int height;      // 节点的高度，用于处理相等权值的情况
    
        // 构造函数
        public Node(int v) {
            value = v;
            left = null;
            right = null;
            height = 0;
        }
    }
    
    // 实现比较器，用于优先队列的比较逻辑
    class Compare implements Comparator<Node> {
        @Override
        public int compare(Node a, Node b) {
            // 首先比较节点的权值，若权值相等则比较高度
            if (a.value > b.value) return 1;
            if (a.value < b.value) return -1;
            if (a.height > b.height) return 1;
            if (a.height < b.height) return -1;
            return 0;
        }
    }
    
    public class Main {
        // 构建哈夫曼树的函数
        public static Node buildHuffmanTree(ArrayList<Integer> values) {
            PriorityQueue<Node> pq = new PriorityQueue<>(new Compare());  // 使用优先队列存储节点
            // 为每个权值创建一个节点并添加到优先队列中
            for (int value : values) {
                pq.add(new Node(value));
            }
    
            // 当队列中至少有两个节点时，执行循环
            while (pq.size() > 1) {
                Node left = pq.poll();  // 弹出最小的节点作为左子节点
                Node right = pq.poll(); // 弹出次小的节点作为右子节点
    
                // 创建一个新节点，其权值为左右子节点的权值之和
                Node parent = new Node(left.value + right.value);
                // 确保左子节点权值不大于右子节点权值，若相等则比较高度
                if (left.value > right.value || (left.value == right.value && left.height > right.height)) {
                    Node temp = left;
                    left = right;
                    right = temp;  // 交换左右子节点
                }
                parent.left = left;
                parent.right = right;
                parent.height = Math.max(left.height, right.height) + 1;  // 计算新节点的高度
                pq.add(parent);  // 将新节点加入优先队列
            }
            // 返回优先队列中剩余的最后一个节点，即哈夫曼树的根节点
            return pq.peek();
        }
    
        // 中序遍历哈夫曼树，并将遍历结果保存为字符串
        public static void inorderTraversal(Node root, StringBuilder result) {
            if (root != null) {
                inorderTraversal(root.left, result);  // 遍历左子树
                result.append(root.value).append(" ");  // 访问当前节点
                inorderTraversal(root.right, result);  // 遍历右子树
            }
        }
    
        // 主函数
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            int n = scanner.nextInt();  // 读取节点数量
            ArrayList<Integer> values = new ArrayList<>();  // 存储所有节点的权值
            for (int i = 0; i < n; i++) {
                values.add(scanner.nextInt());  // 读取权值
            }
            Node root = buildHuffmanTree(values);  // 构建哈夫曼树
            StringBuilder result = new StringBuilder();  // 用于存储中序遍历结果
            inorderTraversal(root, result);  // 执行中序遍历
            if (result.length() > 0) {
                result.deleteCharAt(result.length() - 1);  // 移除最后的空格
            }
            System.out.println(result.toString());  // 输出中序遍历结果
            scanner.close();
        }
    }
    

## javaScript

    
    
    const readline = require('readline');
    
    // 创建命令行读取接口实例
    const rl = readline.createInterface({
        input: process.stdin,  // 标准输入流
        output: process.stdout // 标准输出流
    });
    
    // 监听第一行输入事件，获取节点数量
    rl.on('line', (n) => {
        // 监听第二行输入事件，获取节点权值列表
        rl.on('line', (line) => {
            const values = line.split(' ').map(Number);  // 将输入的行按空格分割，并将每个元素转换为数字
            const root = buildHuffmanTree(values);  // 使用输入的值构建哈夫曼树，并获取根节点
            const result = [];  // 初始化中序遍历结果数组
            inorderTraversal(root, result);  // 对哈夫曼树进行中序遍历
            console.log(result.join(' '));  // 将中序遍历的结果数组转换为字符串并打印
            rl.close();  // 关闭读取接口
        });
    });
    
    // 定义节点类，用于构建哈夫曼树
    class Node {
        constructor(value) {
            this.value = value;  // 节点的值
            this.left = null;    // 节点的左子节点
            this.right = null;   // 节点的右子节点
        }
    }
    
    // 定义最小优先队列类
    class MinPriorityQueue {
        constructor() {
            this.elements = [];  // 存储队列元素的数组
        }
    
        // 入队操作
        enqueue(element) {
            this.elements.push(element);  // 将新元素添加到数组末尾
            this.elements.sort((a, b) => a.value - b.value);  // 对数组进行排序，确保最小元素在数组开头
        }
    
        // 出队操作
        dequeue() {
            return this.elements.shift();  // 移除并返回数组第一个元素
        }
    
        // 检查队列是否为空
        isEmpty() {
            return this.elements.length === 0;  // 队列为空时数组长度为0
        }
    }
    
    // 构建哈夫曼树的函数
    function buildHuffmanTree(values) {
        const pq = new MinPriorityQueue();  // 创建最小优先队列实例
        values.forEach(value => pq.enqueue(new Node(value)));  // 为每个权值创建一个节点并加入队列
    
        while (pq.elements.length > 1) {
            const left = pq.dequeue();  // 弹出最小的节点作为左子节点
            const right = pq.dequeue();  // 弹出次小的节点作为右子节点
    
            const parent = new Node(left.value + right.value);  // 创建新节点，其权值为左右子节点之和
            parent.left = left;  // 设置新节点的左子节点
            parent.right = right;  // 设置新节点的右子节点
            pq.enqueue(parent);  // 将新节点加入优先队列
        }
        return pq.dequeue();  // 返回队列中的最后一个节点，即哈夫曼树的根节点
    }
    
    // 中序遍历函数
    function inorderTraversal(node, result) {
        if (node) {
            inorderTraversal(node.left, result);  // 遍历左子树
            result.push(node.value);  // 访问当前节点，并加入结果数组
            inorderTraversal(node.right, result);  // 遍历右子树
        }
    }
    

## Python

    
    
    import heapq
    
    # 定义Node类，用于构建哈夫曼树的节点
    class Node:
        def __init__(self, value):
            self.value = value  # 节点存储的数值
            self.left = None  # 节点的左子节点
            self.right = None  # 节点的右子节点
            self.height = 0  # 节点的高度
    
        # 重载小于操作符，用于优先队列中比较Node对象
        def __lt__(self, other):
            # 首先比较节点的权值，如果权值相同，则比较高度
            if self.value == other.value:
                return self.height < other.height
            return self.value < other.value
    
    # 构建哈夫曼树的函数
    def build_huffman_tree(values):
        pq = [Node(value) for value in values]  # 创建Node对象列表
        heapq.heapify(pq)  # 将列表转换为最小堆
        while len(pq) > 1:  # 当堆中有多于一个节点时
            left = heapq.heappop(pq)  # 弹出两个数值最小的节点
            right = heapq.heappop(pq)
            parent = Node(left.value + right.value)  # 创建新节点，其数值为两个子节点数值之和
            parent.left = left  # 设置新节点的左子节点
            parent.right = right  # 设置新节点的右子节点
            parent.height = max(left.height, right.height) + 1  # 更新节点的高度
            heapq.heappush(pq, parent)  # 将新节点加入堆中
        return pq[0]  # 返回堆中剩下的最后一个节点，即哈夫曼树的根节点
    
    # 中序遍历哈夫曼树的函数
    def inorder_traversal(root):
        if root is not None:  # 如果当前节点不为空
            yield from inorder_traversal(root.left)  # 递归遍历左子树
            yield root.value  # 返回当前节点的值
            yield from inorder_traversal(root.right)  # 递归遍历右子树
     
    n = int(input())  # 从标准输入读取数字的个数
    values = list(map(int, input().split()))  # 从标准输入读取数字，并转换为整数列表
    root = build_huffman_tree(values)  # 构建哈夫曼树，并获取根节点
    result = ' '.join(map(str, inorder_traversal(root)))  # 对哈夫曼树进行中序遍历，并将结果转换为字符串
    print(result)  # 打印中序遍历的结果
    
    
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    
    #define MAX_SIZE 1000 // 定义最大节点数量，限制优先队列的容量
    
    // 哈夫曼树节点结构体定义
    typedef struct Node {
        int value;           // 节点存储的权值
        struct Node *left;   // 指向左子节点的指针
        struct Node *right;  // 指向右子节点的指针
        int height;          // 节点的高度，用于处理权值相同的情况
    } Node;
    
    // 优先队列结构体定义
    typedef struct {
        Node *data[MAX_SIZE];  // 存储队列元素的数组
        int size;              // 队列当前元素个数
    } PriorityQueue;
    
    // 初始化优先队列
    void initPriorityQueue(PriorityQueue *pq) {
        pq->size = 0;
    }
    
    // 创建新节点
    Node *createNode(int value) {
        Node *node = (Node *)malloc(sizeof(Node));
        node->value = value;
        node->left = NULL;
        node->right = NULL;
        node->height = 0;
        return node;
    }
    
    // 向优先队列添加元素，维持最小堆性质
    void push(PriorityQueue *pq, Node *node) {
        int i = pq->size++; // 插入新元素的位置
        while (i > 0) {
            int parent = (i - 1) / 2; // 计算父节点的位置
            if (pq->data[parent]->value < node->value ||
                (pq->data[parent]->value == node->value && pq->data[parent]->height <= node->height)) {
                break; // 如果当前节点大于父节点，或权值相等但高度不低于父节点，停止调整
            }
            pq->data[i] = pq->data[parent]; // 否则，将父节点下移
            i = parent;
        }
        pq->data[i] = node; // 插入新节点
    }
    
    // 从优先队列中弹出最小元素
    Node *pop(PriorityQueue *pq) {
        Node *min = pq->data[0];
        Node *last = pq->data[--pq->size];
        int i = 0;
        while (i * 2 + 1 < pq->size) {
            int left = i * 2 + 1;
            int right = i * 2 + 2;
            int smallest = left;
            if (right < pq->size && (pq->data[right]->value < pq->data[left]->value ||
                                     (pq->data[right]->value == pq->data[left]->value && pq->data[right]->height < pq->data[left]->height))) {
                smallest = right;
            }
            if (last->value < pq->data[smallest]->value ||
                (last->value == pq->data[smallest]->value && last->height <= pq->data[smallest]->height)) {
                break;
            }
            pq->data[i] = pq->data[smallest];
            i = smallest;
        }
        pq->data[i] = last;
        return min;
    }
    
    // 构建哈夫曼树
    Node *buildHuffmanTree(int values[], int n) {
        PriorityQueue pq;
        initPriorityQueue(&pq);
        for (int i = 0; i < n; i++) {
            push(&pq, createNode(values[i]));
        }
        while (pq.size > 1) {
            Node *left = pop(&pq);
            Node *right = pop(&pq);
            Node *parent = createNode(left->value + right->value);
            if (left->value > right->value || (left->value == right->value && left->height > right->height)) {
                Node *temp = left;
                left = right;
                right = temp;
            }
            parent->left = left;
            parent->right = right;
            parent->height = (left->height > right->height ? left->height : right->height) + 1;
            push(&pq, parent);
        }
        return pop(&pq);
    }
    
    // 中序遍历哈夫曼树
    void inorderTraversal(Node *root) {
        if (root != NULL) {
            inorderTraversal(root->left);
            printf("%d ", root->value);
            inorderTraversal(root->right);
        }
    }
    
    // 主函数
    int main() {
        int n, values[MAX_SIZE];
        scanf("%d", &n);
        for (int i = 0; i < n; i++) {
            scanf("%d", &values[i]);
        }
        Node *root = buildHuffmanTree(values, n);
        inorderTraversal(root);
       
        return 0;
    }
    

## 完整用例

### 用例1

    
    
    5
    5 15 40 30 10
    

### 用例2

    
    
    4
    2 5 3 4
    

### 用例3

    
    
    3
    7 1 6
    

### 用例4

    
    
    9
    36 122 69 94 44 10 162 157 181
    

### 用例5

    
    
    6
    36 122 94 44 10 157
    

### 用例6

    
    
    6
    5 15 45 55 13 8
    

### 用例7

    
    
    13
    78 22 4 34 22 7 95 47 85 80 15 67 19
    

### 用例8

    
    
    19
    172 33 129 47 54 35 161 143 149 13 138 119 187 112 27 117 73 4 5
    

### 用例9

    
    
    10
    36 122 69 183 94 17 44 10 162 157
    

### 用例10

    
    
    30
    86 125 43 132 165 158 114 92 10 61 231 4 171 107 109 3 112 250 179 2 121 87 10 190 167 152 93 263 97 69
    

#### 文章目录

  * 题目描述
  * 输入描述
  * 输出描述
  * 用例
  * 模拟计算
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

![fengmian](https://i-blog.csdnimg.cn/blog_migrate/a7cc3af0f572fa17b60695aa5137da2c.png)

