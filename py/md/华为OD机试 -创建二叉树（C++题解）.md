#### 题目描述

> 请按下列描述构建一颗二叉树，并返回该树的根节点：
>
> 1、先创建值为-1的根结点，根节点在第0层;
>
> 2、然后根据operations依次添加节点： operations[i] = [height, index] 表示对第  
>  height 层的第index 个节点node， 添加值为 i 的子节点：
>
>   * 若node 无「左子节点」，则添加左子节点;
>   * 若node 有「左子节点」，但无「右子节点」，则添加右子节点；
>   * 否则不作任何处理。
>

>
> height、index 均从0开始计数；
>
> index 指所在层的创建顺序。
>
> 注意：
>
>   * 输入用例保证每次操作对应的节点已存在；
>   * 控制台输出的内容是根据返回的树根节点，按照层序遍历二叉树打印的结果。
>

#### 输入描述

> operations

#### 输出描述

> 根据返回的树根节点，按照层序遍历二叉树打印的结果

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
    
    

#### 文章目录

  *     *       * 题目描述
      * 输入描述
      * 输出描述
      * 备注
      * 用例
      * 题目解析
      * C++

![doutub_gif](https://i-blog.csdnimg.cn/blog_migrate/e9413fcd109f2f3d7297192eab0c0b2a.gif)

