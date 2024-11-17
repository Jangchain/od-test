## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

一个XX产品行销总公司，只有一个boss，其有若干一级分销，一级分销又有若干二级分销，每个分销只有唯一的上级分销。

规定，每个月，下级分销需要将自己的总收入（自己的+下级上交的）每满100元上交15元给自己的上级。

现给出一组分销的关系，和每个分销的收入，请找出boss并计算出这个boss的收入。

比如：

  * 收入100元，上交15元；
  * 收入199元（99元不够100），上交15元；
  * 收入200元，上交30元。

输入：

分销关系和收入：[[分销id 上级分销id 收入], [分销id 上级分销id 收入], [分销id 上级分销id 收入]]

  * 分销ID范围： 0…65535
  * 收入范围：0…65535，单位元

**提示： 输入的数据只存在1个boss，不存在环路**

输出：

> [boss的ID, 总收入]

## 输入描述

第一行输入关系的总数量 N  
第二行开始，输入关系信息，格式：

> 分销ID 上级分销ID 收入

比如：

    
    
    5  
    1 0 100  
    2 0 199  
    3 0 200  
    4 0 200  
    5 0 200
    

## 输出描述

输出：

> boss的ID 总收入

比如：

> 0 120

## 备注

给定的输入数据都是合法的，不存在环路，重复的

## 示例一

输入

    
    
    5
    1 0 100
    2 0 199
    3 0 200
    4 0 200
    5 0 200
    

输出

    
    
    0 120
    

说明

> 无

## 题解思路

#### 题目解释

这个题目描述了一个分销网络的收入上交机制，并要求我们找到网络中的boss节点（即没有上级的分销节点），然后计算出这个boss节点的总收入。

##### 题目细节

  * **分销网络** ：这是一个树形结构，每个分销节点都有一个唯一的上级分销。需要注意的点：**唯一没有上级分销的节点就是boss节点。**
  * **收入上交规则** ： 
    * 每个分销节点在每月需要将其总收入中每满100元上交15元给它的上级分销。
    * 如果一个分销节点有下级分销，那么下级分销上交的收入也算作该分销的收入的一部分。

##### 示例分析

**输入：**

    
    
    5
    1 0 100
    2 0 199
    3 0 200
    4 0 200
    5 0 200
    

**解释：**

  * `0`号分销是boss，因为其他分销都将收入上交给`0`。
  * `1`号分销的收入是100元，上交15元给`0`。
  * `2`号分销的收入是199元，上交15元给`0`。
  * `3`号、`4`号和`5`号分销的收入各是200元，分别上交30元给`0`。

**boss的总收入计算：**

  * 收到的上交收入：`15 + 15 + 30 + 30 + 30 = 120` 元。

**输出：**

    
    
    0 120
    

## Java

    
    
    import java.util.HashMap;
    import java.util.HashSet;
    import java.util.LinkedList;
    import java.util.Scanner;
    
    public class Main {
    
        public static void main(String[] args) {
            Scanner sc = new Scanner(System.in);
    
            // 读取分销关系的数量
            int n = Integer.parseInt(sc.nextLine().trim());
    
            // 记录每个分销商的收入
            HashMap<Integer, Long> income = new HashMap<>();
            // 记录所有的分销商 ID
            HashSet<Integer> ids = new HashSet<>();
            // 记录子分销商到父分销商的映射关系
            HashMap<Integer, Integer> childToParent = new HashMap<>();
            // 记录父分销商到其所有子分销商的映射关系
            HashMap<Integer, LinkedList<Integer>> parentToChildren = new HashMap<>();
    
            // 读取输入数据并构建映射关系
            for (int i = 0; i < n; i++) {
                // 读取当前行
                String[] parts = sc.nextLine().split(" ");
                // 解析当前子分销商的 ID
                int childId = Integer.parseInt(parts[0]);
                // 解析当前子分销商的父分销商 ID
                int parentId = Integer.parseInt(parts[1]);
                // 解析当前子分销商的收入
                long childIncome = Long.parseLong(parts[2]);
    
                // 将子分销商的收入记录在 income 映射中
                income.put(childId, childIncome);
                // 将子分销商和父分销商的 ID 添加到分销商 ID 集合中
                ids.add(childId);
                ids.add(parentId);
    
                // 记录子分销商到父分销商的映射关系
                childToParent.put(childId, parentId);
    
                // 如果父分销商还没有子分销商列表，则初始化一个新的列表
                parentToChildren.putIfAbsent(parentId, new LinkedList<>());
                // 将当前子分销商 ID 添加到父分销商的子分销商列表中
                parentToChildren.get(parentId).add(childId);
            }
    
            // 寻找顶级分销商 (即没有父分销商的分销商，即 boss)
            for (int id : ids) {
                // 如果当前分销商 ID 不在 childToParent 映射中，说明它是顶级分销商
                if (!childToParent.containsKey(id)) {
                    // 初始化顶级分销商的收入为0，因为它自身没有任何直接收入
                    income.put(id, 0L);
                    // 调用深度优先搜索算法计算该顶级分销商的总收入（包括来自下级分销商的提成）
                    calcTotalIncome(id, parentToChildren, income);
                    // 输出顶级分销商的 ID 和其计算出的总收入
                    System.out.println(id + " " + income.get(id));
                    // 一旦找到顶级分销商，结束循环
                    break;
                }
            }
        }
    
        // 使用递归的深度优先搜索算法计算分销商的总收入，包括从下级分销商获取的部分
        private static void calcTotalIncome(int parentId, 
                                            HashMap<Integer, LinkedList<Integer>> parentToChildren, 
                                            HashMap<Integer, Long> income) {
            // 获取当前父分销商的子分销商列表
            LinkedList<Integer> children = parentToChildren.get(parentId);
    
            // 如果该父分销商有子分销商
            if (children != null && !children.isEmpty()) {
                // 遍历所有子分销商
                for (int childId : children) {
                    // 递归计算子分销商的总收入
                    calcTotalIncome(childId, parentToChildren, income);
                    // 计算父分销商从该子分销商处获取的提成收入
                    long additionalIncome = income.get(childId) / 100 * 15;
                    // 将提成收入累加到父分销商的总收入中
                    income.put(parentId, income.get(parentId) + additionalIncome);
                }
            }
        }
    }
    
    

## Python

    
    
    # 导入必要的库
    from collections import defaultdict, deque
     
        
    
    def calc_total_income(parent_id, parent_to_children, income):
        """
        使用递归的深度优先搜索算法计算分销商的总收入，包括从下级分销商获取的部分
        """
        # 获取当前父分销商的子分销商列表
        children = parent_to_children[parent_id]
    
        # 如果该父分销商有子分销商
        if children:
            # 遍历所有子分销商
            for child_id in children:
                # 递归计算子分销商的总收入
                calc_total_income(child_id, parent_to_children, income)
                # 计算父分销商从该子分销商处获取的提成收入
                additional_income = income[child_id] // 100 * 15
                # 将提成收入累加到父分销商的总收入中
                income[parent_id] += additional_income
    
    # 读取输入的分销关系数量
    n = int(input().strip())
    
    # 记录每个分销商的收入
    income = {}
    # 记录所有的分销商 ID
    ids = set()
    # 记录子分销商到父分销商的映射关系
    child_to_parent = {}
    # 记录父分销商到其所有子分销商的映射关系
    parent_to_children = defaultdict(list)
    
    # 读取输入数据并构建映射关系
    for _ in range(n):
        # 读取当前行并按空格分割
        parts = input().strip().split()
        # 解析当前子分销商的 ID
        child_id = int(parts[0])
        # 解析当前子分销商的父分销商 ID
        parent_id = int(parts[1])
        # 解析当前子分销商的收入
        child_income = int(parts[2])
    
        # 将子分销商的收入记录在 income 映射中
        income[child_id] = child_income
        # 将子分销商和父分销商的 ID 添加到分销商 ID 集合中
        ids.add(child_id)
        ids.add(parent_id)
    
        # 记录子分销商到父分销商的映射关系
        child_to_parent[child_id] = parent_id
    
        # 如果父分销商还没有子分销商列表，则初始化一个新的列表（由 defaultdict 自动处理）
        # 将当前子分销商 ID 添加到父分销商的子分销商列表中
        parent_to_children[parent_id].append(child_id)
    
    # 寻找顶级分销商 (即没有父分销商的分销商，即 boss)
    for id in ids:
        # 如果当前分销商 ID 不在 child_to_parent 映射中，说明它是顶级分销商
        if id not in child_to_parent:
            # 初始化顶级分销商的收入为 0，因为它自身没有任何直接收入
            income[id] = 0
            # 调用深度优先搜索算法计算该顶级分销商的总收入（包括来自下级分销商的提成）
            calc_total_income(id, parent_to_children, income)
            # 输出顶级分销商的 ID 和其计算出的总收入
            print(f"{id} {income[id]}")
            # 一旦找到顶级分销商，结束循环
            break 
    

## JavaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    // 用于存储所有分销商信息的全局变量
    let n; // 分销关系的数量
    const income = {}; // 记录每个分销商的收入
    const ids = new Set(); // 记录所有的分销商 ID
    const childToParent = {}; // 记录子分销商到父分销商的映射关系
    const parentToChildren = {}; // 记录父分销商到其所有子分销商的映射关系
    
    // 读取输入并处理
    rl.on('line', (input) => {
        // 首次输入是分销关系的数量
        if (n === undefined) {
            n = parseInt(input.trim());
        } else {
            // 处理每一行输入
            const parts = input.trim().split(' ');
            const childId = parseInt(parts[0]);
            const parentId = parseInt(parts[1]);
            const childIncome = parseInt(parts[2]);
    
            // 将子分销商的收入记录在 income 映射中
            income[childId] = childIncome;
            // 将子分销商和父分销商的 ID 添加到分销商 ID 集合中
            ids.add(childId);
            ids.add(parentId);
    
            // 记录子分销商到父分销商的映射关系
            childToParent[childId] = parentId;
    
            // 如果父分销商还没有子分销商列表，则初始化一个新的列表
            if (!parentToChildren[parentId]) {
                parentToChildren[parentId] = [];
            }
            // 将当前子分销商 ID 添加到父分销商的子分销商列表中
            parentToChildren[parentId].push(childId);
    
            // 当所有数据读取完毕后，处理顶级分销商的收入计算
            if (--n === 0) {
                // 寻找顶级分销商 (即没有父分销商的分销商，即 boss)
                for (let id of ids) {
                    if (!childToParent.hasOwnProperty(id)) {
                        // 初始化顶级分销商的收入为 0，因为它自身没有任何直接收入
                        income[id] = 0;
                        // 调用深度优先搜索算法计算该顶级分销商的总收入（包括来自下级分销商的提成）
                        calcTotalIncome(id, parentToChildren, income);
                        // 输出顶级分销商的 ID 和其计算出的总收入
                        console.log(`${id} ${income[id]}`);
                        // 一旦找到顶级分销商，结束循环
                        break;
                    }
                }
            
                rl.close();
            }
        }
    });
    
    /**
     * 使用递归的深度优先搜索算法计算分销商的总收入，包括从下级分销商获取的部分
     * @param {number} parentId - 父分销商的 ID
     * @param {object} parentToChildren - 父分销商到其子分销商列表的映射
     * @param {object} income - 分销商的收入映射
     */
    function calcTotalIncome(parentId, parentToChildren, income) {
        // 获取当前父分销商的子分销商列表
        const children = parentToChildren[parentId] || [];
    
        // 如果该父分销商有子分销商
        for (let childId of children) {
            // 递归计算子分销商的总收入
            calcTotalIncome(childId, parentToChildren, income);
            // 计算父分销商从该子分销商处获取的提成收入
            const additionalIncome = Math.floor(income[childId] / 100)  * 15;
            // 将提成收入累加到父分销商的总收入中
            income[parentId] += additionalIncome;
        }
    }
    
    

## C++

    
    
    #include <iostream>
    #include <unordered_map>
    #include <unordered_set>
    #include <list>
    #include <vector>
    #include <string>
    #include <sstream>
    
    using namespace std;
    
    // 使用递归的深度优先搜索算法计算分销商的总收入，包括从下级分销商获取的部分
    void calcTotalIncome(int parentId, 
                         unordered_map<int, list<int>>& parentToChildren, 
                         unordered_map<int, long long>& income) {
        // 获取当前父分销商的子分销商列表
        if (parentToChildren.find(parentId) != parentToChildren.end()) {
            list<int>& children = parentToChildren[parentId];
    
            // 遍历所有子分销商
            for (int childId : children) {
                // 递归计算子分销商的总收入
                calcTotalIncome(childId, parentToChildren, income);
                // 计算父分销商从该子分销商处获取的提成收入
                long long additionalIncome = (income[childId] / 100) * 15;
                // 将提成收入累加到父分销商的总收入中
                income[parentId] += additionalIncome;
            }
        }
    }
    
    int main() {
        int n;
        // 读取分销关系的数量
        cin >> n;
        cin.ignore();
    
        // 记录每个分销商的收入
        unordered_map<int, long long> income;
        // 记录所有的分销商 ID
        unordered_set<int> ids;
        // 记录子分销商到父分销商的映射关系
        unordered_map<int, int> childToParent;
        // 记录父分销商到其所有子分销商的映射关系
        unordered_map<int, list<int>> parentToChildren;
    
        // 读取输入数据并构建映射关系
        for (int i = 0; i < n; i++) {
            string line;
            getline(cin, line);
            stringstream ss(line);
            int childId, parentId;
            long long childIncome;
    
            // 解析当前子分销商的 ID
            ss >> childId;
            // 解析当前子分销商的父分销商 ID
            ss >> parentId;
            // 解析当前子分销商的收入
            ss >> childIncome;
    
            // 将子分销商的收入记录在 income 映射中
            income[childId] = childIncome;
            // 将子分销商和父分销商的 ID 添加到分销商 ID 集合中
            ids.insert(childId);
            ids.insert(parentId);
    
            // 记录子分销商到父分销商的映射关系
            childToParent[childId] = parentId;
    
            // 如果父分销商还没有子分销商列表，则初始化一个新的列表
            if (parentToChildren.find(parentId) == parentToChildren.end()) {
                parentToChildren[parentId] = list<int>();
            }
            // 将当前子分销商 ID 添加到父分销商的子分销商列表中
            parentToChildren[parentId].push_back(childId);
        }
    
        // 寻找顶级分销商 (即没有父分销商的分销商，即 boss)
        for (int id : ids) {
            // 如果当前分销商 ID 不在 childToParent 映射中，说明它是顶级分销商
            if (childToParent.find(id) == childToParent.end()) {
                // 初始化顶级分销商的收入为0，因为它自身没有任何直接收入
                income[id] = 0;
                // 调用深度优先搜索算法计算该顶级分销商的总收入（包括来自下级分销商的提成）
                calcTotalIncome(id, parentToChildren, income);
                // 输出顶级分销商的 ID 和其计算出的总收入
                cout << id << " " << income[id] << endl;
                // 一旦找到顶级分销商，结束循环
                break;
            }
        }
    
        return 0;
    }
    
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    #include <string.h>
    
    // 定义结构体用于表示链表节点，链表用于存储子分销商ID
    typedef struct Node {
        int id;            // 子分销商的ID
        struct Node* next; // 指向下一个子分销商的指针
    } Node;
    
    // 定义结构体用于表示分销商的收入信息以及子分销商链表
    typedef struct {
        long long income; // 分销商的收入
        Node* children;   // 指向子分销商链表的头节点
    } Distributor;
    
    // 动态数组用于存储所有分销商的ID
    int ids[1000];
    int idsCount = 0;
    
    // 哈希表，用于记录分销商ID到其收入信息及子分销商链表的映射
    Distributor* distributors[1000];
    
    // 哈希表，用于记录子分销商到父分销商的映射关系
    int childToParent[1000];
    int childToParentCount = 0;
    
    // 初始化所有分销商的收入信息及子分销商链表
    void initializeDistributors() {
        for (int i = 0; i < 1000; i++) {
            distributors[i] = NULL;
            childToParent[i] = -1;
        }
    }
    
    // 创建新的链表节点
    Node* createNode(int id) {
        Node* node = (Node*)malloc(sizeof(Node));
        node->id = id;
        node->next = NULL;
        return node;
    }
    
    // 添加子分销商到父分销商的链表中
    void addChild(int parentId, int childId) {
        Node* childNode = createNode(childId);
        childNode->next = distributors[parentId]->children;
        distributors[parentId]->children = childNode;
    }
    
    // 递归计算分销商的总收入，包括从下级分销商获取的部分
    void calcTotalIncome(int parentId) {
        Node* childNode = distributors[parentId]->children;
        while (childNode != NULL) {
            calcTotalIncome(childNode->id); // 递归计算子分销商的总收入
            long long additionalIncome = (distributors[childNode->id]->income / 100) * 15;
            distributors[parentId]->income += additionalIncome; // 累加提成收入
            childNode = childNode->next;
        }
    }
    
    int main() {
        initializeDistributors();
    
        int n;
        scanf("%d", &n); // 读取分销关系的数量
    
        for (int i = 0; i < n; i++) {
            int childId, parentId;
            long long childIncome;
            scanf("%d %d %lld", &childId, &parentId, &childIncome); // 读取每个分销关系
    
            // 如果分销商尚未创建，创建新的分销商结构体
            if (distributors[childId] == NULL) {
                distributors[childId] = (Distributor*)malloc(sizeof(Distributor));
                distributors[childId]->income = 0;
                distributors[childId]->children = NULL;
            }
    
            // 记录子分销商的收入
            distributors[childId]->income = childIncome;
    
            // 记录父分销商ID到子分销商ID的映射关系
            childToParent[childId] = parentId;
    
            // 将父分销商ID和子分销商ID添加到ID列表中
            ids[idsCount++] = childId;
            ids[idsCount++] = parentId;
    
            // 如果父分销商尚未创建，创建新的分销商结构体
            if (distributors[parentId] == NULL) {
                distributors[parentId] = (Distributor*)malloc(sizeof(Distributor));
                distributors[parentId]->income = 0;
                distributors[parentId]->children = NULL;
            }
    
            // 将子分销商添加到父分销商的子分销商链表中
            addChild(parentId, childId);
        }
    
        // 寻找顶级分销商 (即没有父分销商的分销商，即 boss)
        for (int i = 0; i < idsCount; i++) {
            int id = ids[i];
            if (childToParent[id] == -1) {
                // 计算顶级分销商的总收入
                calcTotalIncome(id);
                // 输出顶级分销商的ID和总收入
                printf("%d %lld\n", id, distributors[id]->income);
                break;
            }
        }
    
        return 0;
    }
    
    

![fengmian](https://i-blog.csdnimg.cn/blog_migrate/a8f98f5f66cee521edf5b8945eab3792.png)

## 完整用例

### 用例1

    
    
    5
    1 0 100
    2 0 199
    3 0 200
    4 0 200
    5 0 200
    

### 用例2

    
    
    6
    1 0 100
    2 1 100
    3 1 200
    4 2 100
    5 2 100
    6 3 200
    

### 用例3

    
    
    3
    1 0 0
    2 1 0
    3 1 0
    

### 用例4

    
    
    1
    1 0 100
    

### 用例5

    
    
    4
    1 0 50000
    2 1 40000
    3 2 30000
    4 3 20000
    

### 用例6

    
    
    3
    1 0 65535
    2 1 65535
    3 2 65535
    

### 用例7

    
    
    7
    1 0 300
    2 1 200
    3 1 150
    4 2 100
    5 3 250
    6 3 300
    7 4 50
    

### 用例8

    
    
    5
    1 0 100
    2 1 50
    3 1 200
    4 2 100
    5 3 300
    

### 用例9

    
    
    2
    1 0 200
    2 1 199
    

### 用例10

    
    
    4
    1 0 99
    2 0 99
    3 0 99
    4 0 99
    

