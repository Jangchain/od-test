#### 题目描述

请按下列描述构建一颗二叉树，并返回该树的根节点：

1、先创建值为-1的根结点，根节点在第0层;

2、然后根据operations依次添加节点： operations[i] = [height, index] 表示对第 height 层的第index
个节点node， 添加值为 i 的子节点：

  * 若node 无「左子节点」，则添加左子节点;
  * 若node 有「左子节点」，但无「右子节点」，则添加右子节点；
  * 否则不作任何处理。

height、index 均从0开始计数；

index 指所在层的创建顺序。

注意：

  * 输入用例保证每次操作对应的节点已存在；
  * 控制台输出的内容是根据返回的树根节点，按照层序遍历二叉树打印的结果。

#### 输入描述

operations

#### 输出描述

根据返回的树根节点，按照层序遍历二叉树打印的结果

#### 备注

>   * 1 <= operations.length <= 100
>   * operations[i].length == 2
>   * 0 <= operations[i][0] < 100
>   * 0 <= operations[i][1] < 100
>

#### 用例

输入

    
    
    [[0, 0], [0, 0], [1, 1], [1, 0], [0, 0]]
    

输出

    
    
    [-1, 0, 1, 3, null, 2]
    

说明

    
    
    首个值是根节点的值，也是返回值；
    null 表示是空节点，此特殊层序遍历会遍历有值节点的 null 子节点
    

输入

    
    
    [[0, 0], [1, 0], [1, 0], [2, 1], [2, 1], [2, 1], [2, 0], [3, 1], [2, 0]]
    

输出

    
    
    [-1, 0, null, 1, 2, 6, 8, 3, 4, null, null, null, null, null, null, 7]
    

说明

    
    
    首个值是根节点的值，也是返回值；
    null 表示是空节点，此特殊层序遍历会遍历有值节点的 null 子节点
    

#### 题目解析

根据题目意思:

  1. operations[i] = [height，index] 表示对第 height 层的第 index 个节点node ，添加值为 i 的子节点】，意思就是[0， 1] 表示的就是添加第0层的第1个节点，这个节点的值就是此次operation的序号 i

  2. 输出就是二叉树的层序遍历结果

#### C++

    
    
    #include <iostream>
    #include <vector>
    #include <algorithm> // 使用 remove 函数
    using namespace std;
    
    // 将字符串按逗号分隔为整数数组
    vector<int> split(string input_str) {
        vector<int> nums;
        while (input_str.find(",") != string::npos) { // 如果字符串中还有逗号
            int found = input_str.find(","); // 找到第一个逗号的位置
            nums.push_back(stoi(input_str.substr(0, found))); // 将逗号前的字符串转为整数并加入数组
            input_str = input_str.substr(found + 1); // 更新字符串，去掉已经处理过的部分
        }    
        nums.push_back(stoi(input_str)); // 处理最后一个逗号后面的数字
        return nums;
    }
    
    
    
    // 二叉树节点定义
    struct TreeNode {
        int val;
        TreeNode *left;
        TreeNode *right;
    };
    
    int main() {
        // 输入处理
        string input_str;
        getline(cin, input_str); // 从标准输入读取一行字符串
        input_str.erase(remove(input_str.begin(), input_str.end(), '['), input_str.end()); // 去掉字符串中的左括号
        input_str.erase(remove(input_str.begin(), input_str.end(), ']'), input_str.end()); // 去掉字符串中的右括号
        vector<int> input_nums = split(input_str); // 将字符串按逗号分隔为整数数组
    
        vector<vector<int>> operations;
        for (int i = 0; i < input_nums.size(); i += 2) {      
            vector<int> temp{input_nums[i], input_nums[i+1]}; // 将每两个数字组成一个 vector
            operations.push_back(temp); // 将 vector 加入二维数组
        }
    
        // 头节点
        TreeNode* head = new TreeNode{-1, nullptr, nullptr};
    
        vector<TreeNode*> first_level{head};
        vector<vector<TreeNode*>> tree{first_level}; // 二维数组，记录每一层的节点
    
        for (int i = 0; i < operations.size(); i++) {
            int height = operations[i][0]; // 当前节点所在的层数
            int index = operations[i][1]; // 当前节点在该层的索引
    
            // 开启下一层
            if (tree.size() <= height + 1) { // 如果当前层数还没有节点
                vector<TreeNode*> temp;
                tree.push_back(temp); // 添加一层
            }
    
            TreeNode* temp_node = new TreeNode{i, nullptr, nullptr}; // 创建新节点
            tree[height + 1].push_back(temp_node); // 将新节点加入下一层
    
            if (tree[height][index]->left == nullptr) { // 如果当前节点的左子节点为空
                tree[height][index]->left = tree[height + 1].back(); // 将新节点作为当前节点的左子节点
            } else if (tree[height][index]->right == nullptr) { // 如果当前节点的右子节点为空
                tree[height][index]->right = tree[height + 1].back(); // 将新节点作为当前节点的右子节点
            }
        }
    
        vector<string> result;
        vector<TreeNode*> queue{tree[0][0]}; // 队列，用于层序遍历
    
        while (!queue.empty()) { // 如果队列不为空
            TreeNode* node = queue.front(); // 取出队首节点
            queue.erase(queue.begin()); // 删除队首节点
    
            if (node != nullptr) {
                result.push_back(to_string(node->val)); // 将节点值转为字符串并加入结果数组
                queue.push_back(node->left); // 将左子节点加入队列
                queue.push_back(node->right); // 将右子节点加入队列
            } else {
                result.push_back("null"); // 如果节点为空，将 "null" 加入结果数组
            }
        }
    
        while (!result.empty() && result.back() == "null") { // 如果结果数组最后一个元素是 "null"
            result.pop_back(); // 删除最后一个元素
        }
    
        string output_str = "["; // 输出字符串
        for (int i = 0; i < result.size(); i++) {
            output_str += result[i]; // 将结果数组中的字符串加入输出字符串
            if (i != result.size() - 1) { // 如果不是最后一个字符串
                output_str += ","; // 在字符串后面加上逗号
            }
        }
        output_str += "]"; // 在输出字符串后面加上右括号
    
        cout << output_str; // 输出结果字符串
    
        return 0;
    }
    
    

#### JavaScript

    
    
    const readline = require("readline");
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    
    // 监听输入事件
    rl.on("line", (line) => {
      const operations = JSON.parse(line);
      console.log(getResult(operations));
    });
    
    // 根据操作序列构建树并返回序列化后的结果
    function getResult(operations) {
      const tree = [[new Node(-1)]]; // 初始化根节点
      for (let i = 0; i < operations.length; i++) {
        const [height, index] = operations[i];
        if (!tree[height + 1]) tree.push([]); // 如果当前层不存在则创建
        const node = new Node(i); // 创建新节点
        const parent = tree[height][index];
        if (parent.lc == null || parent.rc == null) { // 如果父节点有空位
          tree[height + 1].push(node); // 将新节点加入下一层
        }
        if (!parent.lc) parent.lc = node; // 将新节点作为左子节点
        else if (!parent.rc) parent.rc = node; // 将新节点作为右子节点
      }
      const ans = [];
      const queue = [tree[0][0]]; // 将根节点加入队列
      while (queue.length) {
        const node = queue.shift();
        if (node) {
          ans.push(node.val);
          queue.push(node.lc);
          queue.push(node.rc);
        } else {
          ans.push(null);
        }
      }
      while (ans.at(-1) == null) ans.pop(); // 去除末尾的 null
      return JSON.stringify(ans).replace(/\,/g, ", "); // 序列化并返回结果
    }
    
    // 定义节点类
    class Node {
      constructor(val) {
        this.val = val;
        this.lc = null;
        this.rc = null;
      }
    }
    

#### Java

    
    
    import java.util.*;
    
    public class TreeBuilder {
      public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
    
        // 读取输入的字符串
        String input = scanner.nextLine();
    
        // 解析操作序列
        Integer[][] operations = parseOperations(input);
    
        // 构建树并返回结果
        String result = buildTree(operations);
    
        // 输出结果
        System.out.println(result);
      }
    
      /**
       * 解析操作序列
       */
      private static Integer[][] parseOperations(String input) {
        // 创建 Scanner 对象
        Scanner scanner = new Scanner(input);
    
        // 读取操作序列字符串
        String str = scanner.nextLine();
    
        // 解析字符串并返回操作序列
        return Arrays.stream(str.substring(1, str.length() - 1).split("(?<=]), (?=\\[)"))
                .map(s -> Arrays.stream(s.substring(1, s.length() - 1).split(", "))
                        .map(Integer::parseInt)
                        .toArray(Integer[]::new))
                .toArray(Integer[][]::new);
      }
    
      /**
       * 构建树并返回结果
       */
      private static String buildTree(Integer[][] operations) {
        // 创建根节点
        Node root = new Node(-1);
    
        // 创建树的第 0 层
        ArrayList<Node> level0 = new ArrayList<>();
        level0.add(root);
    
        // 创建树
        ArrayList<ArrayList<Node>> tree = new ArrayList<>();
        tree.add(level0);
    
        // 遍历操作序列，逐步构建树
        for (int i = 0; i < operations.length; i++) {
          int height = operations[i][0];
          int index = operations[i][1];
    
          // 如果当前高度还没有节点，则创建新的一层
          if (tree.size() <= height + 1) {
            tree.add(new ArrayList<>());
          }
    
          // 创建新节点
          Node node = new Node(i);
    
          // 添加新节点到树中
          Node parent = tree.get(height).get(index);
          if (parent.lc == null || parent.rc == null) {
            tree.get(height + 1).add(node);
          }
          if (parent.lc == null) parent.lc = node;
          else if (parent.rc == null) parent.rc = node;
        }
    
        // 层序遍历树并返回结果
        LinkedList<Integer> result = new LinkedList<>();
        LinkedList<Node> queue = new LinkedList<>();
        queue.add(root);
        while (!queue.isEmpty()) {
          Node node = queue.removeFirst();
          if (node != null) {
            result.add(node.val);
            queue.add(node.lc);
            queue.add(node.rc);
          } else {
            result.add(null);
          }
        }
        while (result.getLast() == null) {
          result.removeLast();
        }
        StringJoiner sj = new StringJoiner(", ", "[", "]");
        for (Integer value : result) {
          sj.add(value + "");
        }
        return sj.toString();
      }
    }
    
    /**
     * 树的节点类
     */
    class Node {
      int val;
      Node lc;
      Node rc;
    
      public Node(int val) {
        this.val = val;
        this.lc = null;
        this.rc = null;
      }
    }
    

#### Python

    
    
    input_operations = eval(input())
    
    # 定义节点类
    class Node:
        def __init__(self, val):
            self.val = val
            self.left_child = None
            self.right_child = None
    
    # 算法入口
    def get_result(operations):
        # 初始化树的根节点
        tree = [[Node(-1)]]
     
        for i in range(len(operations)):
            # 获取当前操作的高度和索引
            height, index = operations[i]
     
            if len(tree) <= height + 1:
                # 如果当前高度还没有节点，就添加一个新的空列表
                tree.append([])
     
            # 创建新节点
            new_node = Node(i)
     
            # 获取父节点
            parent = tree[height][index]
            # 注意，tree用于记录树中加入成功的节点是第几行第几个创建的，对于加入的失败的不应该记录
            if not parent.left_child or not parent.right_child:
                # 如果父节点还有空位，就将新节点作为其子节点
                tree[height + 1].append(new_node)
     
            if not parent.left_child:
                parent.left_child = new_node
            elif not parent.right_child:
                parent.right_child = new_node
     
        # 遍历树，将节点值存储在ans列表中
        ans = []
        queue = [tree[0][0]]
     
        while len(queue) > 0:
            node = queue.pop(0)
     
            if node is not None:
                ans.append(node.val)
                queue.append(node.left_child)
                queue.append(node.right_child)
            else:
                ans.append("null")
     
        # 去除ans列表末尾的null值
        while True:
            if ans[-1] == "null":
                ans.pop()
            else:
                break
     
        return ans
     
    # 调用算法并输出结果
    result = str(get_result(input_operations))
    print(result.replace("'", ""))
    

#### 文章目录

  *     *       * 题目描述
      * 输入描述
      * 输出描述
      * 备注
      * 用例
      * 题目解析
      * C++
      * JavaScript
      * Java
      * Python

![doutub_gif](https://i-blog.csdnimg.cn/blog_migrate/e9413fcd109f2f3d7297192eab0c0b2a.gif)

