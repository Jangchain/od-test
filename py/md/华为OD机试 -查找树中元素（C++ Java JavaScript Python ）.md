#### 题目描述

已知树形结构的所有节点信息，现要求根据输入坐标（x,y）找到该节点保存的内容值，其中x表示节点所在的层数，根节点位于第0层，根节点的子节点位于第1层，依次类推；y表示节点在该层内的相对偏移，从左至右，第一个节点偏移0，第二个节点偏移1，依次类推；

![image-20230311180130273](https://i-blog.csdnimg.cn/blog_migrate/081713124ddb81008dc552cce50e309d.png)

举例：上图中，假定圆圈内的数字表示节点保存的**内容值** ，则根据坐标(1,1)查到的内容值是23。

#### 输入描述

每个节点以一维数组（int[]）表示，所有节点信息构成二维数组（int[][]），二维数组的0位置存放根节点；  
表示单节点的一维数组中，0位置保存**内容值** ，后续位置保存子节点在二维数组中的**索引位置** 。  
对于上图中：

  * 根节点的可以表示为{10，1，2}，
  * 树的整体表示为{{10,1,2},{-21,3,4},{23,5},{14},{35},{66}}

查询条件以长度为2的一维数组表示，上图查询坐标为(1,1)时表示为{1,1}

使用Java标准IO键盘输入进行录入时，

  1. 先录入节点数量
  2. 然后逐行录入节点
  3. 最后录入查询的位置

对于上述示例为：

> 6  
>  10 1 2  
>  -21 3 4  
>  23 5  
>  14  
>  35  
>  66  
>  1 1

#### 输出描述

查询到内容时，输出{内容值}，查询不到时输出{}  
上图中根据坐标(1,1)查询输出{23}，根据坐标(1,2)查询输出{}

#### 用例

输入| 6  
10 1 2  
-21 3 4  
23 5  
14  
35  
66  
1 1  
---|---  
输出| {23}  
说明| 无  
输入| 14  
0 1 2 3 4  
-11 5 6 7 8  
113 9 10 11  
24 12  
35  
66 13  
77  
88  
99  
101  
102  
103  
25  
104  
2 5  
---|---  
输出| {102}  
说明| 无  
输入| 14  
0 1 2 3 4  
-11 5 6 7 8  
113 9 10 11  
24 12  
35  
66 13  
77  
88  
99  
101  
102  
103  
25  
104  
3 2  
---|---  
输出| {}  
说明| 无  
  
#### 题目解析

题目要求我们根据坐标(x,
y)查找节点保存的内容值，其中x表示节点所在的层数，y表示节点在该层内的相对偏移。我们可以使用深度优先搜索（DFS）来解决这个问题。

首先，我们需要编写一个方法 parseOneLine，用于将一行字符串转换为整数数组。该方法使用 stringstream
将字符串按空格分割为字符串流，然后遍历字符串流，将每个字符串转换为整数，并存储到 res 数组中。最后，返回转换后的整数数组。

接下来，我们需要编写一个方法 dfs，用于递归地遍历树的节点。该方法有四个参数：nodes 表示节点信息的二维数组，idx 表示当前节点的索引，x
表示当前节点所在的层数，res 表示保存结果的集合。如果 x 等于 0，则将 nodes[idx][0] 加入 res 集合中，并返回。如果
nodes[idx] 只有一个元素，则返回。否则，遍历 nodes[idx] 中除第一个元素外的所有元素，递归调用 dfs 方法。

最后，我们需要编写一个方法 query，用于查询节点的值。该方法有三个参数：nodes 表示节点信息的二维数组，x 表示节点所在的层数，y
表示节点在该层内的相对偏移。如果 x 或 y 小于 0，则返回空集合。创建一个 vector 集合 res，用于存储所求层的所有数据。调用 dfs
方法，求出第 x 层所有数据并加入 res 集合中。如果 y 大于等于 res 集合的大小，则返回空集合。否则，返回包含 res 集合中第 y
个元素的字符串。

最后，我们在主函数中读取输入的节点信息和坐标信息，调用 query 方法查询节点的值，并将结果输出到控制台。

#### C++

    
    
    #include <iostream>
    #include <vector>
    #include <string>
    #include <sstream>
    
    using namespace std;
    
    void dfs(const vector<vector<int>>& nodes, int idx, int x, vector<int>& res) {
        if (x == 0) {
            res.push_back(nodes[idx][0]);
            return;
        }
    
        if (nodes[idx].size() == 1) {
            return;
        }
    
        for (size_t i = 1; i < nodes[idx].size(); i++) {
            dfs(nodes, nodes[idx][i], x - 1, res);
        }
    }
    
    int main() {
        int size;
        cin >> size;
        cin.ignore();
    
        vector<vector<int>> nodes(size);
    
        for (int i = 0; i < size; i++) {
            string line;
            getline(cin, line);
            stringstream ss(line);
            int value;
            vector<int> node;
    
            while (ss >> value) {
                node.push_back(value);
            }
    
            nodes[i] = node;
        }
    
        int x, y;
        cin >> x >> y;
    
        if (x < 0 || y < 0) {
            cout << "{}" << endl;
        } else {
            vector<int> res;
            dfs(nodes, 0, x, res);
    
            if (y >= static_cast<int>(res.size())) {
                cout << "{}" << endl;
            } else {
                cout << "{" << res[y] << "}" << endl;
            }
        }
    
        return 0;
    }
    
    

#### JavaScript

    
    
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    
    const inputLines = [];
    
    rl.on('line', (line) => {
      inputLines.push(line.trim());
      if (inputLines.length === 2 + parseInt(inputLines[0])) {
        rl.close();
      }
    });
    
    rl.on('close', () => {
      const size = parseInt(inputLines[0]);
      const nodes = inputLines.slice(1, size + 1).map((line) => line.split(' ').map(Number));
      const [x, y] = inputLines[size + 1].split(' ').map(Number);
    
      if (x < 0 || y < 0) {
        console.log('{}');
      } else {
        const res = [];
        dfs(nodes, 0, x, res);
    
        if (y >= res.length) {
          console.log('{}');
        } else {
          console.log('{' + res[y] + '}');
        }
      }
    });
    
    function dfs(nodes, idx, x, res) {
      if (x === 0) {
        res.push(nodes[idx][0]);
        return;
      }
    
      if (nodes[idx].length === 1) {
        return;
      }
    
      for (let i = 1; i < nodes[idx].length; i++) {
        dfs(nodes, nodes[idx][i], x - 1, res);
      }
    }
    
    

#### Java

    
    
    import java.util.Scanner;
    import java.util.List;
    import java.util.ArrayList;
    
    public class Main {
        public static void main(String[] args) {
            // 创建Scanner对象用于读取输入
            Scanner scanner = new Scanner(System.in);
            // 读取节点数量
            int size = Integer.parseInt(scanner.nextLine());
            // 初始化节点数组
            int[][] nodes = new int[size][];
    
            // 逐行读取节点信息
            for (int i = 0; i < size; i++) {
                // 将输入的字符串分割为整数数组
                String[] tokens = scanner.nextLine().split("\\s+");
                int[] node = new int[tokens.length];
                for (int j = 0; j < tokens.length; j++) {
                    node[j] = Integer.parseInt(tokens[j]);
                }
                nodes[i] = node;
            }
    
            // 读取查询坐标
            String[] coordinatesTokens = scanner.nextLine().split("\\s+");
            int x = Integer.parseInt(coordinatesTokens[0]);
            int y = Integer.parseInt(coordinatesTokens[1]);
    
            // 判断坐标是否有效
            if (x < 0 || y < 0) {
                System.out.println("{}");
            } else {
                // 使用深度优先搜索找到指定层次的节点
                List<Integer> res = new ArrayList<>();
                dfs(nodes, 0, x, res);
    
                // 输出查询结果
                if (y >= res.size()) {
                    System.out.println("{}");
                } else {
                    System.out.println("{" + res.get(y) + "}");
                }
            }
        }
    
        /**
         * 使用深度优先搜索遍历树结构，找到指定层次的节点
         *
         * @param nodes 二维数组表示的树结构
         * @param idx 当前节点在二维数组中的索引
         * @param x 目标层次
         * @param res 存储目标层次节点的列表
         */
        private static void dfs(int[][] nodes, int idx, int x, List<Integer> res) {
            // 如果当前层次等于目标层次，将节点值添加到结果列表中
            if (x == 0) {
                res.add(nodes[idx][0]);
                return;
            }
    
            // 如果当前节点没有子节点，直接返回
            if (nodes[idx].length == 1) {
                return;
            }
    
            // 遍历子节点，递归调用dfs方法
            for (int i = 1; i < nodes[idx].length; i++) {
                dfs(nodes, nodes[idx][i], x - 1, res);
            }
        }
    }
    
    
    
    

#### Python

    
    
    def dfs(nodes, idx, x, res):
        if x == 0:
            res.append(nodes[idx][0])
            return
    
        if len(nodes[idx]) == 1:
            return
    
        for i in range(1, len(nodes[idx])):
            dfs(nodes, nodes[idx][i], x - 1, res)
    
    
    def main():
        size = int(input().strip())
        nodes = []
    
        for _ in range(size):
            node = list(map(int, input().strip().split()))
            nodes.append(node)
    
        x, y = map(int, input().strip().split())
    
        if x < 0 or y < 0:
            print("{}")
        else:
            res = []
            dfs(nodes, 0, x, res)
    
            if y >= len(res):
                print("{}")
            else:
                print("{" + str(res[y]) + "}")
    
    
    if __name__ == "__main__":
        main()
    
    

#### 文章目录

  *     *       * 题目描述
      * 输入描述
      * 输出描述
      * 用例
      * 题目解析
      * C++
      * JavaScript
      * Java
      * Python

![fengmian](https://img-
blog.csdnimg.cn/img_convert/1d2f33ed8cf2fb1b9a4fe09513f7aa94.png)

