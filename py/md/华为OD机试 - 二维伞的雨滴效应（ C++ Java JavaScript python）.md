### 题目描述

普通的伞在二维平面世界中，左右两侧均有一条边，而两侧伞边最下面各有一个伞坠子，雨滴落到伞面，逐步流到伞坠处，会将伞坠的信息携带并落到地面，随着日积月累，地面会呈现伞坠的信息。

1、为了模拟伞状雨滴效应，用二叉树来模拟二维平面伞(如下图所示)，现在输入一串正整数数组序列(不含0，数组成员至少是1个)
，若此数组序列是二叉搜索树的前序遍历的结果，那么请输出一个返回值1，否则输出0.

2、同时请将此序列构成的伞状效应携带到地面的数字信息输出来(左边伞坠信息，右边伞坠信息，详细参考示例图地面上数字)，若此树不存在左或右扇坠，则对应位置返回0。同时若非
二叉排序树那么左右伞坠信息也返回0。

![](https://i-blog.csdnimg.cn/blog_migrate/5ee90c4662580b16a33d465deedc266d.png)

### 输入描述

1个通过空格分割的整数序列字符串，数组不含0，数组成员至少1个，输入的数组的任意两个数字都互不相同，最多1000个正整数，正整数值范围1~655350

### 输出描述

输出如下三个值，以空格分隔: 是否二叉排序树，左侧地面呈现的伞坠数字值，右侧地面呈现的伞坠数字值.  
若是二叉排序树，则输出1，否则输出0 (其左右伞坠值也直接赋值0) 。  
若不存存在左侧或者右侧伞坠值，那么对应伞坠值直接赋值0。

### 用例

输入

    
    
    8 3 1 6 4 7 10 14 13
    

输出

    
    
    1 1 13 
    

说明

> 1表示是二叉搜索 树前序遍历结果，1表示左侧地面呈现的伞坠数字值，13表示右侧地面呈现的伞坠数字值

### C++

    
    
    #include <iostream>
    #include <vector>
    #include <deque>
    #include <sstream>
    using namespace std;
    
    struct TreeNode {
        int val;
        TreeNode* left;
        TreeNode* right;
    
        TreeNode() {
            left = nullptr;
            right = nullptr;
        }
    
        TreeNode(int val) {
            this->val = val;
            left = nullptr;
            right = nullptr;
        }
    };
    
    bool isBinarySearchTree(vector<int> pre_order, TreeNode* root) {
        deque<TreeNode*> stack;
        stack.push_back(root);
        TreeNode* helper = new TreeNode(-1);
        bool flag = true;
    
        for (int i = 1; i < pre_order.size(); i++) {
            TreeNode* node = stack.back();
            TreeNode* currentNode = new TreeNode(pre_order[i]);
    
            while (!stack.empty() && stack.back()->val < currentNode->val) {
                node = stack.back();
                if (!stack.empty()) {
                    helper = stack.back();
                }
                stack.pop_back();
            }
    
            if (node->val < currentNode->val) {
                node->right = currentNode;
                helper = node;
            } else {
                if (currentNode->val < helper->val) {
                    flag = false;
                    break;
                }
                node->left = currentNode;
            }
            stack.push_back(currentNode);
        }
    
        return flag;
    }
    
    int getLeftUmbrellaValue(TreeNode* root) {
        TreeNode* leftNode = root;
        while (leftNode->left != nullptr || leftNode->right != nullptr) {
            if (leftNode->left != nullptr) {
                leftNode = leftNode->left;
            } else {
                leftNode = leftNode->right;
            }
        }
        return leftNode->val == root->val ? 0 : leftNode->val;
    }
    
    int getRightUmbrellaValue(TreeNode* root) {
        TreeNode* rightNode = root;
        while (rightNode->left != nullptr || rightNode->right != nullptr) {
            if (rightNode->right != nullptr) {
                rightNode = rightNode->right;
            } else {
                rightNode = rightNode->left;
            }
        }
        return rightNode->val == root->val ? 0 : rightNode->val;
    }
    
    int main() {
        string input;
        getline(cin, input);
        istringstream iss(input);
        vector<int> pre_order;
        int num;
        while (iss >> num) {
            pre_order.push_back(num);
        }
    
        TreeNode* root = new TreeNode(pre_order[0]);
    
        if (isBinarySearchTree(pre_order, root)) {
            int leftUmbrellaValue = getLeftUmbrellaValue(root);
            int rightUmbrellaValue = getRightUmbrellaValue(root);
            cout << "1 " << leftUmbrellaValue << " " << rightUmbrellaValue << endl;
        } else {
            cout << "0 0 0" << endl;
        }
    
        return 0;
    }
    

### java

    
    
    import java.util.*;
    
    public class Main {
        public static void main(String[] args) {
            Scanner in = new Scanner(System.in);
            // 输入一串正整数数组序列
            int[] pre_order = Arrays.stream(in.nextLine().split(" ")).mapToInt(Integer::parseInt).toArray();
            // 根据前序遍历构建二叉树
            TreeNode root = new TreeNode(pre_order[0]);
    
            // 判断是否为二叉搜索树
            if (isBinarySearchTree(pre_order, root)) {
                // 获取左侧和右侧地面呈现的伞坠数字值
                int leftUmbrellaValue = getLeftUmbrellaValue(root);
                int rightUmbrellaValue = getRightUmbrellaValue(root);
                System.out.println("1 " + leftUmbrellaValue + " " + rightUmbrellaValue);
            } else {
                System.out.println("0 0 0");
            }
        }
    
        // 判断是否为二叉搜索树
        public static boolean isBinarySearchTree(int[] pre_order, TreeNode root) {
            Deque<TreeNode> stack = new ArrayDeque<>();
            stack.push(root);
            TreeNode helper = new TreeNode(-1);
            boolean flag = true;
    
            for (int i = 1; i < pre_order.length; i++) {
                TreeNode node = stack.peekLast();
                TreeNode currentNode = new TreeNode(pre_order[i]);
    
                while (!stack.isEmpty() && stack.peekLast().val < currentNode.val) {
                    node = stack.removeLast();
                    if (!stack.isEmpty()) {
                        helper = stack.peekLast();
                    }
                }
    
                if (node.val < currentNode.val) {
                    node.right = currentNode;
                    helper = node;
                } else {
                    if (currentNode.val < helper.val) {
                        flag = false;
                        break;
                    }
                    node.left = currentNode;
                }
                stack.addLast(currentNode);
            }
    
            return flag;
        }
    
        // 获取左侧地面呈现的伞坠数字值
        public static int getLeftUmbrellaValue(TreeNode root) {
            TreeNode leftNode = root;
            // 当左节点或右节点不为空时，继续向左遍历
            while (leftNode.left != null || leftNode.right != null) {
                if (leftNode.left != null) {
                    leftNode = leftNode.left;
                } else {
                    leftNode = leftNode.right;
                }
            }
            // 若左侧伞坠值与根节点值相等，则返回0；否则返回左侧伞坠值
            return leftNode.val == root.val ? 0 : leftNode.val;
        }
    
        // 获取右侧地面呈现的伞坠数字值
        public static int getRightUmbrellaValue(TreeNode root) {
            TreeNode rightNode = root;
            // 当左节点或右节点不为空时，继续向右遍历
            while (rightNode.left != null || rightNode.right != null) {
                if (rightNode.right != null) {
                    rightNode = rightNode.right;
                } else {
                    rightNode = rightNode.left;
                }
            }
            // 若右侧伞坠值与根节点值相等，则返回0；否则返回右侧伞坠值
            return rightNode.val == root.val ? 0 : rightNode.val;
        }
    
        static class TreeNode {
            int val;
            TreeNode left;
            TreeNode right;
    
            public TreeNode() {
            }
    
            public TreeNode(int val) {
                this.val = val;
            }
        }
    }
    

### python

    
    
    import re
    
    class TreeNode:
        def __init__(self, val):
            self.val = val
            self.left = None
            self.right = None
    
    def is_binary_search_tree(pre_order):
        # 创建根节点
        root = TreeNode(pre_order[0])
        stack = [root]
        # 辅助节点，用于记录当前节点的父节点
        helper = TreeNode(-1)
        # 标志变量，用于判断是否为二叉排序树
        flag = True
    
        for i in range(1, len(pre_order)):
            # 获取栈顶节点
            node = stack[-1]
            # 创建当前节点
            current_node = TreeNode(pre_order[i])
    
            # 寻找当前节点的父节点
            while stack and stack[-1].val < current_node.val:
                node = stack.pop()
                if stack:
                    helper = stack[-1]
    
            # 判断当前节点是父节点的左子节点还是右子节点
            if node.val < current_node.val:
                node.right = current_node
                helper = node
            else:
                # 如果当前节点小于父节点，但是大于辅助节点，则不是二叉排序树
                if current_node.val < helper.val:
                    flag = False
                    break
                node.left = current_node
    
            # 将当前节点入栈
            stack.append(current_node)
        
        return flag, root
    
    def get_left_ground_value(root):
        # 寻找左侧地面呈现的伞坠数字值
        left_node = root
        while left_node.left or left_node.right:
            left_node = left_node.left if left_node.left else left_node.right
        
        return 0 if left_node.val == root.val else left_node.val
    
    def get_right_ground_value(root):
        # 寻找右侧地面呈现的伞坠数字值
        right_node = root
        while right_node.left or right_node.right:
            right_node = right_node.right if right_node.right else right_node.left
        
        return 0 if right_node.val == root.val else right_node.val
    
    # 输入序列
    pre_order = list(map(int, input().split()))
    # 判断是否为二叉排序树并获取根节点
    is_bst, root = is_binary_search_tree(pre_order)
    
    if is_bst:
        # 获取左侧和右侧地面呈现的伞坠数字值
        left_ground_value = get_left_ground_value(root)
        right_ground_value = get_right_ground_value(root)
        print("1", left_ground_value, right_ground_value)
    else:
        print("0 0 0")
    

### javaScript

    
    
    class TreeNode {
      constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
      }
    }
    
    function isBinarySearchTree(preOrder) {
      const root = new TreeNode(preOrder[0]);
      const stack = [root];
      let helper = new TreeNode(-1);
      let flag = true;
    
      for (let i = 1; i < preOrder.length; i++) {
        let node = stack[stack.length - 1];
        let currentNode = new TreeNode(preOrder[i]);
    
        while (stack.length && stack[stack.length - 1].val < currentNode.val) {
          node = stack.pop();
          if (stack.length) {
            helper = stack[stack.length - 1];
          }
        }
    
        if (node.val < currentNode.val) {
          node.right = currentNode;
          helper = node;
        } else {
          if (currentNode.val < helper.val) {
            flag = false;
            break;
          }
          node.left = currentNode;
        }
    
        stack.push(currentNode);
      }
    
      return { flag, root };
    }
    
    function getLeftGroundValue(root) {
      let leftNode = root;
      while (leftNode.left || leftNode.right) {
        leftNode = leftNode.left ? leftNode.left : leftNode.right;
      }
    
      return leftNode.val === root.val ? 0 : leftNode.val;
    }
    
    function getRightGroundValue(root) {
      let rightNode = root;
      while (rightNode.left || rightNode.right) {
        rightNode = rightNode.right ? rightNode.right : rightNode.left;
      }
    
      return rightNode.val === root.val ? 0 : rightNode.val;
    }
    
    
    
    const readline = require("readline");
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    const lines = [];
    rl.on("line", (line) => {
      	const preOrder =line.split(' ').map(Number);
        const { flag, root } = isBinarySearchTree(preOrder);
    
        if (flag) {
          const leftGroundValue = getLeftGroundValue(root);
          const rightGroundValue = getRightGroundValue(root);
          console.log(`1 ${leftGroundValue} ${rightGroundValue}`);
        } else {
          console.log("0 0 0");
        }
    });
    

> #### 文章目录
>
>   *     * 题目描述
>     * 输入描述
>     * 输出描述
>     * 用例
>     * C++
>     * java
>     * python
>     * javaScript
>

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

