## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

给出一个二叉树如下图所示：

![image-20240219094626190](https://i-blog.csdnimg.cn/blog_migrate/e899db1af92a3e9322b4e82b478339c1.png)

请由该二叉树生成一个新的二叉树，它满足其树中的每个节点将包含原始树中的左子树和右子树的和。

![image-20240219094722295](https://i-blog.csdnimg.cn/blog_migrate/4224171f6a2711c1716bfd92ad39359d.png)

左子树表示该节点左侧叶子节点为根节点的一颗新树；右子树表示该节点右侧叶子节点为根节点的一颗新树。

## 输入描述

2行整数，第1行表示二叉树的中序遍历，第2行表示二叉树的前序遍历，以空格分割。

## 输出描述

1行整数，表示求和树的中序遍历，以空格分割

## 示例1

输入

    
    
    -3 12 6 8 9 -10 -7
    8 12 -3 6 -10 9 -7
    

输出

    
    
    0 3 0 7 0 2 0
    

说明

> ## 解题思路

本题主要考察二叉树的还原：根据中序和前序遍历还原。

请注意：根据中序和前序遍历还原，二叉树可能并不是唯一的，因为如果一个树的节点值不是唯一的，那么可能存在多个有效的二叉树。

在本题中，并没有说明存在多个值的处理方式，我们默认节点值是唯一的，也就是最终会还原出唯一的二叉树。

## Java

    
    
    import java.util.*;
    import java.util.stream.*;
    
    public class Main {
    
        // 方法：根据中序和前序遍历构造二叉树
        // 参数：preorder 前序遍历的结果，inorder 中序遍历的结果
        public static TreeNode buildTree(int[] preorder, int[] inorder) {
            // 调用辅助方法，传入遍历结果和对应的开始结束索引
            return build(preorder, 0, preorder.length - 1, inorder, 0, inorder.length - 1);
        }
    
        // 定义树的节点结构
        private static class TreeNode {
            int val;  // 节点的值
            TreeNode left;  // 左子节点
            TreeNode right;  // 右子节点
            TreeNode(int x) { val = x; }  // 构造方法
        }
    
        // 辅助方法：根据中序和前序遍历的一部分构造子树
        private static TreeNode build(int[] preorder, int preStart, int preEnd, int[] inorder, int inStart, int inEnd) {
            // 如果前序遍历的开始索引大于结束索引，说明这部分遍历结果为空，返回null
            if (preStart > preEnd) return null;
            
            // 创建根节点，值为前序遍历的第一个元素
            TreeNode root = new TreeNode(preorder[preStart]);
            int inIndex = 0; // 初始化中序遍历中根节点的索引
            // 在中序遍历中找到根节点的位置
            for (int i = inStart; i <= inEnd; i++) {
                if (inorder[i] == root.val) {
                    inIndex = i;
                    break;
                }
            }
            
            // 计算左子树的大小
            int leftTreeSize = inIndex - inStart;
            
            // 递归构造左子树和右子树
            root.left = build(preorder, preStart + 1, preStart + leftTreeSize, inorder, inStart, inIndex - 1);
            root.right = build(preorder, preStart + leftTreeSize + 1, preEnd, inorder, inIndex + 1, inEnd);
            
            // 返回构造好的根节点
            return root;
        }
    
        // 方法：更新节点值为其所有子节点的和
        // 参数：node 需要更新的节点
        private static int updateTree(TreeNode node) {
            // 如果节点为空，返回0
            if (node == null) return 0;
            // 递归更新左子树和右子树，并计算子树的和
            int leftSum = updateTree(node.left);
            int rightSum = updateTree(node.right);
            // 保存当前节点的值
            int oldVal = node.val;
            // 更新当前节点的值为子树的和
            node.val = leftSum + rightSum;
            // 返回当前子树的和（包括当前节点原来的值）
            return node.val + oldVal;
        }
    
        // 方法：中序遍历
        // 参数：node 需要遍历的节点，result 保存遍历结果的列表
        private static void inorderTraversal(TreeNode node, ArrayList<Integer> result) {
            // 如果节点为空，直接返回
            if (node == null) return;
            // 递归遍历左子树
            inorderTraversal(node.left, result);
            // 将当前节点的值添加到结果列表
            result.add(node.val);
            // 递归遍历右子树
            inorderTraversal(node.right, result);
        }
    
        // 主方法
        public static void main(String[] args) {
            
            Scanner sc = new Scanner(System.in);
            // 读取一行输入，分割成字符串数组，转换为整数数组，作为中序遍历的结果
            int[] inorder = Arrays.stream(sc.nextLine().split(" ")).mapToInt(Integer::parseInt).toArray();
            // 同样处理前序遍历的结果
            int[] preorder = Arrays.stream(sc.nextLine().split(" ")).mapToInt(Integer::parseInt).toArray();
            // 根据中序和前序遍历的结果构造二叉树
            TreeNode root = buildTree(preorder, inorder);
            // 更新二叉树的节点值
            updateTree(root);
            // 创建列表，保存中序遍历的结果
            ArrayList<Integer> result = new ArrayList<>();
            // 中序遍历二叉树，保存结果
            inorderTraversal(root, result);
            // 打印遍历结果
            result.forEach(value -> System.out.print(value + " "));
        }
    }
    
    

## Python

    
    
    class TreeNode:
        def __init__(self, x):
            self.val = x  # 节点的值
            self.left = None  # 左子节点
            self.right = None  # 右子节点
    
    def build_tree(preorder, inorder):
        # 根据前序和中序遍历结果构造二叉树
        if not preorder or not inorder:
            return None
        # 前序遍历的第一个值是根节点
        root = TreeNode(preorder[0])
        # 在中序遍历中找到根节点的索引
        mid = inorder.index(preorder[0])
        # 递归构造左子树和右子树
        root.left = build_tree(preorder[1:mid+1], inorder[:mid])
        root.right = build_tree(preorder[mid+1:], inorder[mid+1:])
        return root
    
    def update_tree(node):
        # 更新节点值为其所有子节点的和
        if not node:
            return 0
        left_sum = update_tree(node.left)
        right_sum = update_tree(node.right)
        old_val = node.val
        node.val = left_sum + right_sum
        return node.val + old_val
    
    def inorder_traversal(node):
        # 中序遍历
        if not node:
            return []
        return inorder_traversal(node.left) + [node.val] + inorder_traversal(node.right)
    
    if __name__ == '__main__':
        # 输入中序和前序遍历的结果
        inorder = list(map(int, input().split()))
        preorder = list(map(int, input().split()))
        # 构造二叉树
        root = build_tree(preorder, inorder)
        # 更新二叉树的节点值
        update_tree(root)
        # 进行中序遍历并打印结果
        print(' '.join(map(str, inorder_traversal(root))))
    
    

## JavaScript

    
    
    class TreeNode {
        constructor(x) {
            this.val = x;  // 节点的值
            this.left = null;  // 左子节点
            this.right = null;  // 右子节点
        }
    }
    
    function buildTree(preorder, inorder) {
        // 根据前序和中序遍历结果构造二叉树
        if (!preorder.length || !inorder.length) {
            return null;
        }
        let root = new TreeNode(preorder[0]);
        let mid = inorder.indexOf(preorder[0]);
        root.left = buildTree(preorder.slice(1, mid + 1), inorder.slice(0, mid));
        root.right = buildTree(preorder.slice(mid + 1), inorder.slice(mid + 1));
        return root;
    }
    
    function updateTree(node) {
        // 更新节点值为其所有子节点的和
        if (!node) {
            return 0;
        }
        let leftSum = updateTree(node.left);
        let rightSum = updateTree(node.right);
        let oldVal = node.val;
        node.val = leftSum + rightSum;
        return node.val + oldVal;
    }
    
    function inorderTraversal(node) {
        // 中序遍历
        if (!node) {
            return [];
        }
        return inorderTraversal(node.left).concat([node.val]).concat(inorderTraversal(node.right));
    }
    
    let readline = require('readline');
    let rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    let lines = [];
    rl.on('line', function (line) {
        lines.push(line);
        if (lines.length === 2) {
            rl.close();
        }
    });
    
    rl.on('close', function () {
        let inorder = lines[0].split(' ').map(Number);
        let preorder = lines[1].split(' ').map(Number);
        let root = buildTree(preorder, inorder);
        updateTree(root);
        console.log(inorderTraversal(root).join(' '));
    });
    
    

## C++

    
    
    #include <iostream>
    #include <vector>
    #include <sstream>
    
    using namespace std;
    // 定义树的节点结构
    struct TreeNode {
        int val;  // 节点的值
        TreeNode* left;  // 左子节点
        TreeNode* right;  // 右子节点
        TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}  // 构造方法
    };
    
    // 辅助函数：根据中序和前序遍历的一部分构造子树
    TreeNode* build(vector<int>& preorder, int preStart, int preEnd, vector<int>& inorder, int inStart, int inEnd) {
        // 如果前序遍历的开始索引大于结束索引，说明这部分遍历结果为空，返回null
        if (preStart > preEnd) return nullptr;
        
        // 创建根节点，值为前序遍历的第一个元素
        TreeNode* root = new TreeNode(preorder[preStart]);
        int inIndex = 0; // 初始化中序遍历中根节点的索引
        // 在中序遍历中找到根节点的位置
        for (int i = inStart; i <= inEnd; i++) {
            if (inorder[i] == root->val) {
                inIndex = i;
                break;
            }
        }
        
        // 计算左子树的大小
        int leftTreeSize = inIndex - inStart;
        
        // 递归构造左子树和右子树
        root->left = build(preorder, preStart + 1, preStart + leftTreeSize, inorder, inStart, inIndex - 1);
        root->right = build(preorder, preStart + leftTreeSize + 1, preEnd, inorder, inIndex + 1, inEnd);
        
        // 返回构造好的根节点
        return root;
    }
    
    // 方法：根据中序和前序遍历构造二叉树
    // 参数：preorder 前序遍历的结果，inorder 中序遍历的结果
    TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {
        // 调用辅助方法，传入遍历结果和对应的开始结束索引
        return build(preorder, 0, preorder.size() - 1, inorder, 0, inorder.size() - 1);
    }
    
    // 方法：更新节点值为其所有子节点的和
    // 参数：node 需要更新的节点
    int updateTree(TreeNode* node) {
        // 如果节点为空，返回0
        if (node == nullptr) return 0;
        // 递归更新左子树和右子树，并计算子树的和
        int leftSum = updateTree(node->left);
        int rightSum = updateTree(node->right);
        // 保存当前节点的值
        int oldVal = node->val;
        // 更新当前节点的值为子树的和
        node->val = leftSum + rightSum;
        // 返回当前子树的和（包括当前节点原来的值）
        return node->val + oldVal;
    }
    
    // 方法：中序遍历
    // 参数：node 需要遍历的节点，result 保存遍历结果的列表
    void inorderTraversal(TreeNode* node, vector<int>& result) {
        // 如果节点为空，直接返回
        if (node == nullptr) return;
        // 递归遍历左子树
        inorderTraversal(node->left, result);
        // 将当前节点的值添加到结果列表
        result.push_back(node->val);
        // 递归遍历右子树
        inorderTraversal(node->right, result);
    }
    
    // 主函数
    int main() {
        string line;
        vector<int> inorder;
        vector<int> preorder;
    
        // 读取一行输入，分割成字符串数组，转换为整数数组，作为中序遍历的结果
        getline(cin, line);
        istringstream iss(line);
        int num;
        while (iss >> num) {
            inorder.push_back(num);
        }
    
        // 同样处理前序遍历的结果
        getline(cin, line);
        istringstream iss2(line);
        while (iss2 >> num) {
            preorder.push_back(num);
        }
    
        // 根据中序和前序遍历的结果构造二叉树
        TreeNode* root = buildTree(preorder, inorder);
        // 更新二叉树的节点值
        updateTree(root);
        // 创建列表，保存中序遍历的结果
        vector<int> result;
        // 中序遍历二叉树，保存结果
        inorderTraversal(root, result);
        // 打印遍历结果
        for (int i : result) {
            cout << i << " ";
        }
        return 0;
    }
    
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    
    // 定义树的节点结构体
    typedef struct TreeNode {
        int val;  // 节点的值
        struct TreeNode* left;  // 左子节点
        struct TreeNode* right;  // 右子节点
    } TreeNode;
    
    // 创建一个新的树节点
    TreeNode* newTreeNode(int x) {
        TreeNode* node = (TreeNode*)malloc(sizeof(TreeNode));  // 分配内存
        node->val = x;  // 设置节点的值
        node->left = NULL;  // 设置左子节点为空
        node->right = NULL;  // 设置右子节点为空
        return node;  // 返回新创建的节点
    }
    
    // 根据前序和中序遍历结果构建子树
    TreeNode* build(int* preorder, int preStart, int preEnd, int* inorder, int inStart, int inEnd) {
        if (preStart > preEnd) return NULL;  // 如果前序遍历的开始位置大于结束位置，说明子树为空，返回NULL
        
        // 创建根节点，根节点的值就是前序遍历的第一个元素
        TreeNode* root = newTreeNode(preorder[preStart]);
        int inIndex = 0;  // 初始化中序遍历中根节点的位置
        // 在中序遍历中找到根节点的位置
        for (int i = inStart; i <= inEnd; i++) {
            if (inorder[i] == root->val) {
                inIndex = i;
                break;
            }
        }
        
        // 计算左子树的大小
        int leftTreeSize = inIndex - inStart;
        // 递归构建左子树和右子树
        root->left = build(preorder, preStart + 1, preStart + leftTreeSize, inorder, inStart, inIndex - 1);
        root->right = build(preorder, preStart + leftTreeSize + 1, preEnd, inorder, inIndex + 1, inEnd);
        
        return root;  // 返回构建好的子树
    }
    
    // 根据前序和中序遍历结果构建二叉树
    TreeNode* buildTree(int* preorder, int preorderSize, int* inorder, int inorderSize) {
        return build(preorder, 0, preorderSize - 1, inorder, 0, inorderSize - 1);  // 调用build函数
    }
    
    // 更新树的节点值为其子树之和
    int updateTree(TreeNode* node) {
        if (node == NULL) return 0;  // 如果节点为空，返回0
        // 递归更新左子树和右子树，并计算子树的和
        int leftSum = updateTree(node->left);
        int rightSum = updateTree(node->right);
        // 保存当前节点的值
        int oldVal = node->val;
        // 更新当前节点的值为子树的和
        node->val = leftSum + rightSum;
        // 返回当前子树的和（包括当前节点原来的值）
        return node->val + oldVal;
    }
    
    // 中序遍历
    void inorderTraversal(TreeNode* node, int* result, int* resultSize) {
        if (node == NULL) return;  // 如果节点为空，直接返回
        // 递归遍历左子树
        inorderTraversal(node->left, result, resultSize);
        // 将当前节点的值添加到结果数组
        result[(*resultSize)++] = node->val;
        // 递归遍历右子树
        inorderTraversal(node->right, result, resultSize);
    }
    
    // 主函数
    int main() {
        int preorderSize = 0, inorderSize = 0;  // 初始化前序和中序遍历结果的大小
        int preorder[10000], inorder[10000];  // 前序和中序遍历结果数组
    
        // 读取中序遍历结果
        while (scanf("%d", &inorder[inorderSize++])) {
            if (getchar() != ' ') break;  // 如果读取到的不是空格，说明输入结束，跳出循环
        }
    
        // 读取前序遍历结果
        while (scanf("%d", &preorder[preorderSize++])) {
            if (getchar() != ' ') break;  // 如果读取到的不是空格，说明输入结束，跳出循环
        }
    
        // 根据前序和中序遍历结果构建二叉树
        TreeNode* root = buildTree(preorder, preorderSize, inorder, inorderSize);
        // 更新二叉树的节点值
        updateTree(root);
        // 创建数组，保存中序遍历的结果
        int result[10000];
        int resultSize = 0;
        // 中序遍历二叉树，保存结果
        inorderTraversal(root, result, &resultSize);
        // 打印遍历结果
        for (int i = 0; i < resultSize; i++) {
            printf("%d ", result[i]);
        }
    
        // 释放分配的内存（在实际应用中应递归释放整个树的节点）
        return 0;
    }
    
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/30b55b74a15fa05fa42d3dbc3bdf8032.png)

## 完整用例

### 用例1

    
    
    2 1 3
    1 2 3
    

### 用例2

    
    
    4 2 5 1 6 3 7
    1 2 4 5 3 6 7
    

### 用例3

    
    
    -5 -10 0 -3 5
    0 -10 -5 -3 5
    

### 用例4

    
    
    30 20 40 10 50 60
    10 20 30 40 50 60
    

### 用例5

    
    
    9 3 15 20 7
    20 3 9 15 7
    

### 用例6

    
    
    3 2 1 4 5
    1 2 3 4 5
    

### 用例7

    
    
    -8 -4 -2 0 2 4 8
    0 -4 -8 -2 4 2 8
    

### 用例8

    
    
    -7 -3 -1 0 1 3 7
    0 -3 -7 -1 3 1 7
    

### 用例9

    
    
    10 20 30 40 50 60 70
    40 20 10 30 60 50 70
    

### 用例10

    
    
    100 200 300 400 500 600 700
    400 200 100 300 600 500 700
    

