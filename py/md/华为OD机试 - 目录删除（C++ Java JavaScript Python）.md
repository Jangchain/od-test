## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

#### 题目描述

某文件系统中有 N 个目录，每个目录都有一个独一无二的 ID。

每个目录只有一个父目录，但每个父目录下可以有零个或者多个子目录，目录结构呈树状结构。

假设，根目录的 ID 为 0，且根目录没有父目录，其他所有目录的 ID 用唯一的正整数表示，并统一编号。

现给定目录 ID 和其父目录 ID 的对应父子关系表[子目录 ID，父目录 ID]，以及一个待删除的目录 ID，请计算并返回一个 ID
序列，表示因为删除指定目录后剩下的所有目录，返回的ID序列以递增序输出。

**注意**

1、被删除的目录或文件编号一定在输入的 ID 序列中；

2、当一个目录删除时，它所有的子目录都会被删除。

#### 输入描述

输入的第一行为父子关系表的长度 m；

接下来的 m 行为 m 个父子关系对；

最后一行为待删除的 ID。

序列中的元素以空格分割，参见样例。

#### 输出描述

输出一个序列，表示因为删除指定目录后，剩余的目录 ID。

##### ACM输入输出模式

如果你经常使用**Leetcode** ,会知道**letcode** 是不需要编写输入输出函数的。但是华为OD机考使用的是 **ACM 模式**
，需要手动编写输入和输出。

所以最好在牛-
客上提前熟悉这种模式。例如C++使用`cin/cout`,python使用`input()/print()`。JavaScript使用node的`readline()`和`console.log()`。Java
使用`sacnner/system.out.print()`

#### 用例

输入| 5  
8 6  
10 8  
6 0  
20 8  
2 6  
8  
---|---  
输出| 2 6  
说明|
![](https://i-blog.csdnimg.cn/blog_migrate/cff22efca6d505f8b350039c1ff79cb0.png)  
  
#### 机考代码查重

华为OD机考完成之后，官方会进行代码查重。**华为 od 机考确实有很大的概率抽到原题**
。如果碰到了题库中的原题，一定不要直接使用题解中的代码，尤其是变量名，一定要修改，可以改成毫无意义的单词。除了变量名之外，代码的组织结构和逻辑一定要进行改变，这就要求在日常的刷题中，提前编写好属于自己的代码。

#### 解题思路

  1. 从输入中读取父子关系表的长度 m，接下来的 m 行为 m 个父子关系对，最后一行为待删除的 ID。

  2. 使用一个数据结构（如字典或哈希表）来表示目录树。键为父目录 ID，值为一个列表，存储该父目录下的所有子目录 ID。

  3. 遍历输入的父子关系对，将它们添加到目录树中。对于每个关系对，将子目录 ID 添加到对应父目录 ID 的列表中。如果父目录 ID 在数据结构中不存在，则创建一个新的列表并将子目录 ID 添加到列表中。

  4. 如果待删除的目录 ID 为 0（根目录），直接返回空字符串，因为删除根目录时，所有子目录都会被删除。

  5. 使用深度优先搜索 (DFS) 算法遍历目录树。从根目录（ID 为 0）开始，递归地遍历每个子目录。在遍历过程中，如果遇到待删除的目录 ID，则跳过它及其所有子目录。

  6. 将遍历过程中未被删除的目录 ID 添加到结果列表中。

  7. 对结果列表进行排序，以便以递增顺序输出目录 ID。

  8. 将结果列表中的目录 ID 拼接成一个字符串，并返回。

#### C++

    
    
    #include <iostream>
    #include <vector>
    #include <map>
    #include <algorithm>
    using namespace std;
    
    void dfs(map<int, vector<int>>& tree, int node, int delId, vector<int>& res) {
        vector<int> children = tree[node]; // 获取当前节点的子节点列表
        if (!children.empty()) { // 如果子节点列表不为空
            for (int i = 0; i < children.size(); i++) { // 遍历子节点列表
                int child = children[i]; // 获取子节点
                if (child != delId) { // 如果子节点不是待删除的节点，将其加入到结果列表中，并继续向下遍历
                    res.push_back(child);
                    dfs(tree, child, delId, res);
                }
            }
        }
    }
    
    string getRemainTreeEle(vector<vector<int>>& parentChildPairs, int delId) {
        map<int, vector<int>> tree; // 创建一个 Map 用于存储目录树
        for (int i = 0; i < parentChildPairs.size(); i++) { // 遍历二维数组
            int child = parentChildPairs[i][0]; // 获取子节点
            int father = parentChildPairs[i][1]; // 获取父节点
            if (tree.count(father)) { // 如果父节点已经在 Map 中存在，将子节点加入到父节点对应的列表中
                tree[father].push_back(child);
            } else { // 如果父节点在 Map 中不存在，创建一个新的列表，将子节点加入到列表中，并将父节点和列表存储到 Map 中
                vector<int> children;
                children.push_back(child);
                tree[father] = children;
            }
        }
        if (delId == 0) { // 如果待删除的目录 ID 为 0，直接返回空字符串
            return "";
        }
        vector<int> res; // 创建一个列表用于存储结果
        dfs(tree, 0, delId, res); // 调用 dfs 方法，获取剩余的目录 ID
        sort(res.begin(), res.end()); // 对结果进行排序
        string ans; // 创建一个字符串用于拼接结果
        for (int i = 0; i < res.size(); i++) { // 遍历结果列表
            ans += to_string(res[i]); // 将每个目录 ID 加入到字符串中
            if (i != res.size() - 1) { // 如果不是最后一个目录 ID，加入一个空格
                ans += " ";
            }
        }
        return ans; // 返回拼接好的字符串
    }
    
    int main() {
        vector<string> lines; // 用于存储输入的每一行
        int m = 0; // 父子关系表的长度
        while (true) { // 循环读取输入
            string line; // 读取一行输入
            getline(cin, line);
            if (line.empty()) { // 如果输入为空，说明输入结束，退出循环
                break;
            }
            lines.push_back(line); // 将读取的输入加入到列表中
            if (lines.size() == 1) { // 如果列表中只有一行，说明这是父子关系表的长度，将其转为整数类型并赋值给 m
                m = stoi(line);
            }
            if (m > 0 && lines.size() == m + 2) { // 如果父子关系表的长度已经读取完，且输入的行数等于 m+2，说明输入结束，开始处理输入
                lines.erase(lines.begin()); // 删除列表中的第一行，即父子关系表的长度
                int delId = stoi(lines.back()); // 获取待删除的目录 ID
                lines.pop_back(); // 删除最后一行，即待删除的目录 ID
                vector<vector<int>> parentChildPairs(m, vector<int>(2)); // 创建一个二维数组用于存储父子关系
                for (int i = 0; i < m; i++) { // 遍历列表中的每一行
                    int pos = lines[i].find(' '); // 找到第一个空格的位置
                    int child = stoi(lines[i].substr(0, pos)); // 将第一个空格前的部分转为整数，作为子节点
                    int father = stoi(lines[i].substr(pos + 1)); // 将第一个空格后的部分转为整数，作为父节点
                    parentChildPairs[i][0] = child; // 将子节点存储到二维数组中
                    parentChildPairs[i][1] = father; // 将父节点存储到二维数组中
                }
                cout << getRemainTreeEle(parentChildPairs, delId) << endl; // 调用 getRemainTreeEle 方法，输出结果
                lines.clear(); // 处理完一组输入后，清空列表
            }
        }
        return 0;
    }
    

#### Java

    
    
    import java.util.*;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            List<String> lines = new ArrayList<>(); // 用于存储输入的每一行
            int m = 0; // 父子关系表的长度
            while (scanner.hasNextLine()) { // 循环读取输入
                String line = scanner.nextLine(); // 读取一行输入
                lines.add(line); // 将读取的输入加入到列表中
                if (lines.size() == 1) { // 如果列表中只有一行，说明这是父子关系表的长度，将其转为整数类型并赋值给 m
                    m = Integer.parseInt(line);
                }
                if (m > 0 && lines.size() == m + 2) { // 如果父子关系表的长度已经读取完，且输入的行数等于 m+2，说明输入结束，开始处理输入
                    lines.remove(0); // 删除列表中的第一行，即父子关系表的长度
                    int delId = Integer.parseInt(lines.remove(lines.size() - 1)); // 获取待删除的目录 ID
                    int[][] parentChildPairs = new int[m][2]; // 创建一个二维数组用于存储父子关系
                    for (int i = 0; i < m; i++) { // 遍历列表中的每一行
                        String[] nums = lines.get(i).split(" "); // 将每一行按空格分割成两个数字
                        parentChildPairs[i][0] = Integer.parseInt(nums[0]); // 将第一个数字作为子节点，存储到二维数组中
                        parentChildPairs[i][1] = Integer.parseInt(nums[1]); // 将第二个数字作为父节点，存储到二维数组中
                    }
                    System.out.println(getRemainTreeEle(parentChildPairs, delId)); // 调用 getRemainTreeEle 方法，输出结果
                    lines.clear(); // 处理完一组输入后，清空列表
                }
            }
            scanner.close(); // 关闭 Scanner
        }
    
        public static String getRemainTreeEle(int[][] parentChildPairs, int delId) {
            Map<Integer, List<Integer>> tree = new HashMap<>(); // 创建一个 Map 用于存储目录树
            for (int i = 0; i < parentChildPairs.length; i++) { // 遍历二维数组
                int child = parentChildPairs[i][0]; // 获取子节点
                int father = parentChildPairs[i][1]; // 获取父节点
                if (tree.containsKey(father)) { // 如果父节点已经在 Map 中存在，将子节点加入到父节点对应的列表中
                    tree.get(father).add(child);
                } else { // 如果父节点在 Map 中不存在，创建一个新的列表，将子节点加入到列表中，并将父节点和列表存储到 Map 中
                    List<Integer> children = new ArrayList<>();
                    children.add(child);
                    tree.put(father, children);
                }
            }
            if (delId == 0) { // 如果待删除的目录 ID 为 0，直接返回空字符串
                return "";
            }
            List<Integer> res = new ArrayList<>(); // 创建一个列表用于存储结果
            dfs(tree, 0, delId, res); // 调用 dfs 方法，获取剩余的目录 ID
            Collections.sort(res); // 对结果进行排序
            StringBuilder sb = new StringBuilder(); // 创建一个 StringBuilder 用于拼接字符串
            for (int i = 0; i < res.size(); i++) { // 遍历结果列表
                sb.append(res.get(i)); // 将每个目录 ID 加入到 StringBuilder 中
                if (i != res.size() - 1) { // 如果不是最后一个目录 ID，加入一个空格
                    sb.append(" ");
                }
            }
            return sb.toString(); // 返回拼接好的字符串
        }
    
        public static void dfs(Map<Integer, List<Integer>> tree, int node, int delId, List<Integer> res) {
            List<Integer> children = tree.get(node); // 获取当前节点的子节点列表
            if (children != null) { // 如果子节点列表不为空
                for (int i = 0; i < children.size(); i++) { // 遍历子节点列表
                    int child = children.get(i); // 获取子节点
                    if (child != delId) { // 如果子节点不是待删除的节点，将其加入到结果列表中，并继续向下遍历
                        res.add(child);
                        dfs(tree, child, delId, res);
                    }
                }
            }
        }
    }
    

#### JavaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    function getRemainTreeEle(parentChildPairs, delId) {
      const tree = new Map(); // 创建一个 Map 用于存储目录树
      for (let i = 0; i < parentChildPairs.length; i++) { // 遍历二维数组
        const child = parentChildPairs[i][0]; // 获取子节点
        const father = parentChildPairs[i][1]; // 获取父节点
        if (tree.has(father)) { // 如果父节点已经在 Map 中存在，将子节点加入到父节点对应的列表中
          tree.get(father).push(child);
        } else { // 如果父节点在 Map 中不存在，创建一个新的列表，将子节点加入到列表中，并将父节点和列表存储到 Map 中
          const children = [child];
          tree.set(father, children);
        }
      }
      if (delId === 0) { // 如果待删除的目录 ID 为 0，直接返回空字符串
        return "";
      }
      const res = []; // 创建一个列表用于存储结果
      dfs(tree, 0, delId, res); // 调用 dfs 方法，获取剩余的目录 ID
      res.sort((a, b) => a - b); // 对结果进行排序
      return res.join(' '); // 返回拼接好的字符串
    }
    
    function dfs(tree, node, delId, res) {
      const children = tree.get(node); // 获取当前节点的子节点列表
      if (children) { // 如果子节点列表不为空
        for (let i = 0; i < children.length; i++) { // 遍历子节点列表
          const child = children[i]; // 获取子节点
          if (child !== delId) { // 如果子节点不是待删除的节点，将其加入到结果列表中，并继续向下遍历
            res.push(child);
            dfs(tree, child, delId, res);
          }
        }
      }
    }
    
    let lines = []; // 用于存储输入的每一行
    let m = 0; // 父子关系表的长度
    let delId = 0; // 待删除的目录 ID
    
    rl.on('line', (line) => {
      lines.push(line); // 将读取的输入加入到列表中
      if (lines.length === 1) { // 如果列表中只有一行，说明这是父子关系表的长度，将其转为整数类型并赋值给 m
        m = parseInt(line);
      }
      if (m > 0 && lines.length === m + 2) { // 如果父子关系表的长度已经读取完，且输入的行数等于 m+2，说明输入结束，开始处理输入
        lines.shift(); // 删除列表中的第一行，即父子关系表的长度
        delId = parseInt(lines.pop()); // 获取待删除的目录 ID
        const parentChildPairs = lines.map((line) => line.split(' ').map((num) => parseInt(num))); // 创建一个二维数组用于存储父子关系
        console.log(getRemainTreeEle(parentChildPairs, delId)); // 调用 getRemainTreeEle 方法，输出结果
        lines = []; // 处理完一组输入后，清空列表
      }
    });
    
    rl.on('close', () => {
      process.exit(0);
    });
    

#### python

    
    
    import sys
    
    def getRemainTreeEle(parentChildPairs, delId):
        tree = {} # 创建一个字典用于存储目录树
        for pair in parentChildPairs: # 遍历二维列表
            child = pair[0] # 获取子节点
            father = pair[1] # 获取父节点
            if father in tree: # 如果父节点已经在字典中存在，将子节点加入到父节点对应的列表中
                tree[father].append(child)
            else: # 如果父节点在字典中不存在，创建一个新的列表，将子节点加入到列表中，并将父节点和列表存储到字典中
                children = []
                children.append(child)
                tree[father] = children
        if delId == 0: # 如果待删除的目录 ID 为 0，直接返回空字符串
            return ""
        res = [] # 创建一个列表用于存储结果
        dfs(tree, 0, delId, res) # 调用 dfs 函数，获取剩余的目录 ID
        res.sort() # 对结果进行排序
        return " ".join(map(str, res)) # 返回拼接好的字符串
    
    def dfs(tree, node, delId, res):
        children = tree.get(node, []) # 获取当前节点的子节点列表
        for child in children: # 遍历子节点列表
            if child != delId: # 如果子节点不是待删除的节点，将其加入到结果列表中，并继续向下遍历
                res.append(child)
                dfs(tree, child, delId, res)
    
    if __name__ == '__main__':
        lines = sys.stdin.readlines() # 读取输入
        i = 0
        while i < len(lines):
            m = int(lines[i]) # 父子关系表的长度
            parentChildPairs = [] # 用于存储父子关系
            for j in range(i+1, i+m+1):
                nums = list(map(int, lines[j].split())) # 将每一行按空格分割成两个数字
                parentChildPairs.append(nums) # 将父子关系加入到列表中
            delId = int(lines[i+m+1]) # 获取待删除的目录 ID
            print(getRemainTreeEle(parentChildPairs, delId)) # 调用 getRemainTreeEle 函数，输出结果
            i += m + 2 # 更新 i 的值，跳过已经处理过的行
    

## 完整用例

用例1

    
    
    5
    8 6
    10 8
    6 0
    20 8
    2 6
    8
    

用例2

    
    
    6
    1 0
    2 1
    3 1
    4 2
    5 2
    6 3
    2
    

用例3

    
    
    6
    1 0
    2 1
    3 1
    4 2
    5 2
    6 3
    3
    

用例4

    
    
    6
    1 0
    2 1
    3 1
    4 2
    5 2
    6 3
    1
    

用例5

    
    
    5
    1 0
    2 1
    3 1
    4 2
    5 2
    2
    

用例6

    
    
    6
    1 0
    2 1
    3 1
    4 2
    5 2
    6 3
    6
    

用例7

    
    
    8
    1 0
    2 1
    3 1
    4 2
    5 2
    6 3
    7 3
    8 4
    2
    

用例8

    
    
    5
    1 0
    2 1
    3 1
    4 2
    5 2
    5
    

用例9

    
    
    7
    1 0
    2 1
    3 1
    4 2
    5 2
    6 3
    7 3
    7
    

用例10

    
    
    6
    1 0
    2 1
    3 1
    4 2
    5 4
    6 3
    4
    

#### 文章目录

  * 最新华为OD机试
  *     *       * 题目描述
      * 输入描述
      * 输出描述
      *         * ACM输入输出模式
      * 用例
      * 机考代码查重
      * 解题思路
      * C++
      * Java
      * JavaScript
      * python
  * 完整用例

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

