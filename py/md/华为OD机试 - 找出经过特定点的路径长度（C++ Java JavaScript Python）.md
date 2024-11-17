#### 题目描述

无

#### 输入描述

输入一个字符串，都是以大写字母组成，每个相邻的距离是 1，

第二行输入一个字符串，表示必过的点。

说明每个点可过多次。

#### 输出描述

经过这些必过点的最小距离是多少

#### 用例

输入| ANTSEDXQOKPUVGIFWHJLYMCRZB  
ABC  
---|---  
输出| 28  
说明| 无  
  
#### 题目解析

这个题目是一个路径搜索问题，具体来说，是在一个字符串中寻找一条经过特定字符的最短路径。

输入包括两行字符串。第一行字符串由大写字母组成，每个字符可以看作是一个点，相邻字符之间的距离为1。第二行字符串指定了一些必须经过的点（字符）。

题目要求找出一条路径，这条路径必须经过所有在第二行字符串中指定的点，而且总距离要尽可能的小。注意，每个点可以经过多次，但在计算总距离时，每次经过都会计算其距离。  
例如，输入为：

    
    
    ANTSEDXQOKPUVGIFWHJLYMCRZB
    ABC
    

输出为：

    
    
    28
    

解释：在第一个字符串中，字母A的位置是0，字母B的位置是25，字母C的位置是24。所以，经过这些必过点的最小距离是 |0-25| + |25-24| =
28。

DFS (深度优先搜索)
是一种用于遍历或搜索图或树的算法。它通过从起始节点开始，沿着一条路径尽可能深入地探索，直到无法继续为止，然后回溯到前一步选择其他路径继续探索，直到遍历完所有可能的路径。

对于题目，我们需要找到经过指定的必过点的最小距离。下面是解题思路：

  1. 首先，我们需要构建一个映射表 `mustCharIdx`，用于存储每个必过点在字符串 `all` 中的索引位置。映射表的键是必过点的字符，值是一个列表，存储该字符在 `all` 中出现的索引位置。

  2. 接下来，我们定义一个递归函数 `dfs`，它接受以下参数：

     * `index`：当前需要处理的必过点的索引。
     * `must`：必过点的字符串。
     * `mustCharIdx`：必过点的映射表。
     * `path`：当前已经选择的路径。
     * `ans`：用于存储最小距离的数组。
  3. 在 `dfs` 函数中，我们首先检查是否已经遍历完所有的必过点。如果是，则计算当前路径的距离，并更新 `ans` 中的最小距离。

  4. 如果当前路径的长度大于0，我们还需要检查当前路径的距离是否已经超过了当前的最小距离 `ans[0]`。如果是，则可以提前终止当前路径的探索。

  5. 接下来，我们获取当前需要处理的必过点的字符 `c`，以及该字符在 `all` 中出现的索引位置列表 `idxs`。

  6. 对于每个索引位置 `idx`，我们将其添加到路径 `path` 中，然后递归调用 `dfs` 函数处理下一个必过点。

  7. 在递归调用返回后，我们需要将最后添加的索引位置从路径 `path` 中移除，以便尝试其他的索引位置。

  8. 最后，在主函数中，我们初始化最小距离 `ans` 为一个较大的值，创建一个空的路径 `path`，并调用 `dfs` 函数开始搜索。

  9. 最终，输出 `ans[0]`，即为经过这些必过点的最小距离。

#### c++

    
    
    #include <iostream>
    #include <vector>
    #include <unordered_map>
    #include <algorithm>
    #include <climits>
    using namespace std;
    
    // 定义一个深度优先搜索的函数
    void dfs(int index, string must, unordered_map<char, vector<int>>& mustCharIdx, vector<int>& path, int& ans) {
        // 如果路径长度等于必经点的长度，计算路径的距离
        if (path.size() == must.length()) {
            int dis = path[0];
            for (int i = 1; i < path.size(); i++) {
                dis += abs(path[i] - path[i - 1]);
            }
            // 更新最小距离
            ans = min(ans, dis);
            return;
        }
    
        // 获取当前必经点的字符，然后获取该字符的所有索引
        char c = must[index];
        vector<int>& idxs = mustCharIdx[c];
        // 对于每个索引，添加到路径中，然后进行深度优先搜索，最后从路径中移除
        for (int idx : idxs) {
            path.push_back(idx);
            dfs(index + 1, must, mustCharIdx, path, ans);
            path.pop_back();
        }
    }
    
    int main() {
        string all, must;
        cin >> all >> must;
        // 创建一个映射，用于存储每个必经点字符的所有索引
        unordered_map<char, vector<int>> mustCharIdx;
    
        // 初始化映射
        for (char c : must) {
            mustCharIdx[c] = vector<int>();
        }
    
        // 遍历所有字符，如果字符是必经点，将其索引添加到映射中
        for (int i = 0; i < all.length(); i++) {
            char c = all[i];
            if (mustCharIdx.count(c)) {
                mustCharIdx[c].push_back(i);
            }
        }
    
        // 初始化最小距离为最大值
        int ans = INT_MAX;
        // 创建一个列表，用于存储路径
        vector<int> path;
        // 进行深度优先搜索
        dfs(0, must, mustCharIdx, path, ans);
        // 输出最小距离
        cout << ans << endl;
    
        return 0;
    }
    
    
    
    

#### java

    
    
    import java.util.*;
    
    public class Main {
        // 定义一个深度优先搜索的方法
        static void dfs(int index, String must, Map<Character, List<Integer>> mustCharIdx, List<Integer> path, int[] ans) {
            // 如果路径长度等于必经点的长度，计算路径的距离
            if (path.size() == must.length()) {
                int dis = path.get(0);
                for (int i = 1; i < path.size(); i++) {
                    dis += Math.abs(path.get(i) - path.get(i - 1));
                }
                // 更新最小距离
                ans[0] = Math.min(ans[0], dis);
                return;
            }
    
            // 如果路径长度大于0，计算路径的距离，如果大于等于当前最小距离，返回
            if (path.size() > 0) {
                int dis = path.get(0);
                for (int i = 1; i < path.size(); i++) {
                    dis += Math.abs(path.get(i) - path.get(i - 1));
                }
                if (dis >= ans[0]) { 
                    return;
                }
            }
    
            // 获取当前必经点的字符，然后获取该字符的所有索引
            char c = must.charAt(index);
            List<Integer> idxs = mustCharIdx.get(c);
            // 对于每个索引，添加到路径中，然后进行深度优先搜索，最后从路径中移除
            for (int idx : idxs) {
                path.add(idx);
                dfs(index + 1, must, mustCharIdx, path, ans);
                path.remove(path.size() - 1);
            }
        }
    
        public static void main(String[] args) {
            Scanner sc = new Scanner(System.in);
            // 读取输入的两个字符串
            String all = sc.next();
            String must = sc.next();
            // 创建一个映射，用于存储每个必经点字符的所有索引
            Map<Character, List<Integer>> mustCharIdx = new HashMap<>();
    
            // 初始化映射
            for (char c : must.toCharArray()) {
                mustCharIdx.putIfAbsent(c, new ArrayList<>());
            }
    
            // 遍历所有字符，如果字符是必经点，将其索引添加到映射中
            for (int i = 0; i < all.length(); i++) {
                char c = all.charAt(i);
                if (mustCharIdx.containsKey(c)) {
                    mustCharIdx.get(c).add(i);
                }
            }
    
            // 初始化最小距离为最大值
            int[] ans = {Integer.MAX_VALUE};
            // 创建一个列表，用于存储路径
            List<Integer> path = new ArrayList<>();
            // 进行深度优先搜索
            dfs(0, must, mustCharIdx, path, ans);
            // 输出最小距离
            System.out.println(ans[0]);
        }
    }
    
    
    

#### javaScript

    
    
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    // 定义一个深度优先搜索的函数
    function dfs(index, must, mustCharIdx, path, ans) {
        // 如果路径长度等于必经点的长度，计算路径的距离
        if (path.length === must.length) {
            let dis = path[0];
            for (let i = 1; i < path.length; i++) {
                dis += Math.abs(path[i] - path[i - 1]);
            }
            // 更新最小距离
            ans[0] = Math.min(ans[0], dis);
            return;
        }
    
        // 获取当前必经点的字符，然后获取该字符的所有索引
        let c = must[index];
        let idxs = mustCharIdx.get(c);
        // 对于每个索引，添加到路径中，然后进行深度优先搜索，最后从路径中移除
        for (let idx of idxs) {
            path.push(idx);
            dfs(index + 1, must, mustCharIdx, path, ans);
            path.pop();
        }
    }
    
    readline.on("line", all => {
        readline.on("line", must => {
            // 创建一个映射，用于存储每个必经点字符的所有索引
            let mustCharIdx = new Map();
    
            // 初始化映射
            for (let c of must) {
                mustCharIdx.set(c, []);
            }
    
            // 遍历所有字符，如果字符是必经点，将其索引添加到映射中
            for (let i = 0; i < all.length; i++) {
                let c = all[i];
                if (mustCharIdx.has(c)) {
                    mustCharIdx.get(c).push(i);
                }
            }
    
            // 初始化最小距离为最大值
            let ans = [Number.MAX_SAFE_INTEGER];
            // 创建一个列表，用于存储路径
            let path = [];
            // 进行深度优先搜索
            dfs(0, must, mustCharIdx, path, ans);
            // 输出最小距离
            console.log(ans[0]);
    
            readline.close();
        });
    });
    
    

#### python

    
    
    # 定义一个深度优先搜索的函数
    def dfs(index, must, mustCharIdx, path, ans):
        # 如果路径长度等于必经点的长度，计算路径的距离
        if len(path) == len(must):
            dis = path[0]
            for i in range(1, len(path)):
                dis += abs(path[i] - path[i - 1])
            # 更新最小距离
            ans[0] = min(ans[0], dis)
            return
    
        # 获取当前必经点的字符，然后获取该字符的所有索引
        c = must[index]
        idxs = mustCharIdx[c]
        # 对于每个索引，添加到路径中，然后进行深度优先搜索，最后从路径中移除
        for idx in idxs:
            path.append(idx)
            dfs(index + 1, must, mustCharIdx, path, ans)
            path.pop()
    
    all = input()
    must = input()
    # 创建一个映射，用于存储每个必经点字符的所有索引
    mustCharIdx = {c: [] for c in must}
    
    # 遍历所有字符，如果字符是必经点，将其索引添加到映射中
    for i in range(len(all)):
        c = all[i]
        if c in mustCharIdx:
            mustCharIdx[c].append(i)
    
    # 初始化最小距离为最大值
    ans = [float('inf')]
    # 创建一个列表，用于存储路径
    path = []
    # 进行深度优先搜索
    dfs(0, must, mustCharIdx, path, ans)
    # 输出最小距离
    print(ans[0])
    
    

#### 文章目录

  *     *       * 题目描述
      * 输入描述
      * 输出描述
      * 用例
      * 题目解析
      * c++
      * java
      * javaScript
      * python

![fengmian](https://img-
blog.csdnimg.cn/img_convert/1d2f33ed8cf2fb1b9a4fe09513f7aa94.png)

