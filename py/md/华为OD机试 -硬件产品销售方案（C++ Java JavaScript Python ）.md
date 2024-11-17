## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

某公司目前推出了AI开发者套件，AI加速卡，AI加速模块，AI服务器，智能边缘多种硬件产品，每种产品包含若干个型号。  
现某合作厂商要采购金额为_amount_元的硬件产品搭建自己的AI基座。  
例如当前库存有_N_种产品，每种产品的库存量充足，给定每种产品的价格，记为price（不存在价格相同的产品型号）。  
请为合作厂商列出所有可能的产品组合。

## 输入描述

输入包含采购金额amount和产品价格列表price。第一行为amount，第二行为price，例如：

500  
[100, 200, 300, 500]

## 输出描述

输出为组合列表。例如：

[[100, 100, 100, 100, 100], [100, 100, 100, 200], [100, 100, 300], [100, 200,
200], [200, 300], [500]]

## 示例1

输入

    
    
    500
    [100, 200, 300, 500, 500]
    

输出

    
    
    [[100, 100, 100, 100, 100], [100, 100, 100, 200], [100, 100, 300], [100, 200, 200], [200, 300], [500], [500]]
    
    

说明

## 解题思路

题目描述要求我们实现一个**优先级队列** ，该队列具有以下特性：

  1. **优先级排序** ：当元素入队后，输出时会按照优先级从高到低排序。优先级高的元素先出队。

  2. **先进先出** ：当优先级相同的元素出现时，它们按照进入队列的顺序出队。

  3. **去重** ：如果两个元素的数据内容和优先级都相同，则后一个重复的元素不会进入队列，而是被丢弃。

#### 示例分析

##### 示例1

输入：

    
    
    (10,1),(20,1),(30,2),(40,3)
    

  * 将四个数据依次入队。其优先级分别是 `1,1,2,3`。
  * 输出顺序按优先级排序：`40`（优先级3），`30`（优先级2），`10`和`20`（优先级1，按输入顺序）。
  * 输出结果：`40,30,10,20`

##### 示例2

输入：

    
    
    (10,1),(10,1),(30,2),(40,3)
    

  * 将数据入队时，发现两个 `(10,1)` 内容和优先级都相同，丢弃后一个。
  * 按优先级排序后：`40`（优先级3），`30`（优先级2），`10`（优先级1）。
  * 输出结果：`40,30,10`

  3. 

## Java

    
    
    import java.util.*;
    
    public class Main {
        public static void dfs(int total, List<Integer> prices, int index, int sum, List<Integer> path, List<List<Integer>> res) {
            // 如果当前组合的和等于目标金额，将其加入结果集
            if (sum == total) {
                res.add(new ArrayList<>(path));
                return;
            }
    
            // 如果当前和超过目标金额，直接返回
            if (sum > total) {
                return;
            }
    
            // 从当前索引开始遍历价格列表
            for (int i = index; i < prices.size(); i++) {
                // 剪枝：如果当前价格加上现有和超过目标金额，则不再考虑后面的价格
                if (sum + prices.get(i) > total) {
                    break;
                }
                // 添加当前价格到组合路径中
                path.add(prices.get(i));
                // 递归调用，允许重复使用当前价格
                dfs(total, prices, i, sum + prices.get(i), path, res);
                // 回溯，移除最后添加的价格
                path.remove(path.size() - 1);
            }
        }
    
        public static void main(String[] args) {
            Scanner sc = new Scanner(System.in);
            int amount = sc.nextInt();
            sc.nextLine(); // 读取换行符
    
            // 读取价格列表并解析为整数列表
            String str = sc.nextLine();
            String[] pricesStr = str.substring(1, str.length() - 1).split(", ");
            List<Integer> prices = new ArrayList<>();
            for (String priceStr : pricesStr) {
                prices.add(Integer.parseInt(priceStr));
            }
    
            // 排序价格列表以便剪枝
            Collections.sort(prices);
    
            List<List<Integer>> res = new ArrayList<>();
            List<Integer> path = new ArrayList<>();
    
            // 开始深度优先搜索
            dfs(amount, prices, 0, 0, path, res);
    
            // 输出所有符合条件的组合
            System.out.println(res);
        }
    }
    
    

## Python

    
    
    def dfs(total, prices, index, current_sum, path, res):
        # 如果当前组合的和等于目标金额，将其加入结果集
        if current_sum == total:
            res.append(list(path))
            return
        
        # 如果当前和超过目标金额，直接返回
        if current_sum > total:
            return
        
        # 从当前索引开始遍历价格列表
        for i in range(index, len(prices)):
            # 剪枝：如果当前价格加上现有和超过目标金额，则不再考虑后面的价格
            if current_sum + prices[i] > total:
                break
            # 添加当前价格到组合路径中
            path.append(prices[i])
            # 递归调用，允许重复使用当前价格
            dfs(total, prices, i, current_sum + prices[i], path, res)
            # 回溯，移除最后添加的价格
            path.pop()
    
    def main():
        # 输入目标金额
        amount = int(input().strip())
        
        # 读取价格列表
        prices = list(map(int, input().strip()[1:-1].split(", ")))
        
        # 排序价格列表以便剪枝
        prices.sort()
        
        res = []
        dfs(amount, prices, 0, 0, [], res)
        
        # 输出所有符合条件的组合
        print(res)
    
    if __name__ == "__main__":
        main()
    
    

## JavaScript

    
    
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    
    const inputLines = [];
    
    // 深度优先搜索函数，寻找所有符合条件的组合
    function dfs(total, prices, index, sum, path, res) {
      // 如果当前组合的和等于目标金额，将其加入结果集
      if (sum === total) {
        res.push([...path]);  // 将当前路径的拷贝添加到结果集中
        return;
      }
    
      // 如果当前和超过目标金额，停止递归
      if (sum > total) return;
    
      // 从当前索引开始遍历价格列表
      for (let i = index; i < prices.length; i++) {
        // 剪枝：如果当前价格加上现有和超过目标金额，则不再考虑后面的价格
        if (sum + prices[i] > total) break;
    
        // 添加当前价格到组合路径中
        path.push(prices[i]);
    
        // 递归调用，允许重复使用当前价格
        dfs(total, prices, i, sum + prices[i], path, res);
    
        // 回溯，移除最后添加的价格以探索其他组合
        path.pop();
      }
    }
    
    rl.on('line', (line) => {
      inputLines.push(line);
    
      // 当收集到两行输入后，处理数据
      if (inputLines.length === 2) {
        const amount = parseInt(inputLines[0], 10);  // 读取目标金额
        const pricesStr = inputLines[1].slice(1, -1).split(', ');  // 去除方括号并分割为字符串数组
        const prices = pricesStr.map(Number);  // 将字符串数组转换为数字数组
    
        // 排序价格列表，以便在DFS过程中进行剪枝
        prices.sort((a, b) => a - b);
    
        // 初始化结果集并调用DFS
        const res = [];
        dfs(amount, prices, 0, 0, [], res);
    
        // 输出所有符合条件的组合
        console.log(JSON.stringify(res));
    
     
        rl.close();
      }
    });
    
    

## C++

    
    
    #include <iostream>
    #include <vector>
    #include <algorithm>
    
    using namespace std;
    
    void dfs(int total, const vector<int>& prices, int index, int sum, vector<int>& path, vector<vector<int>>& res) {
        // 如果当前组合的和等于目标金额，将其加入结果集
        if (sum == total) {
            res.push_back(path);
            return;
        }
        
        // 如果当前和超过目标金额，直接返回
        if (sum > total) return;
        
        // 从当前索引开始遍历价格列表
        for (int i = index; i < prices.size(); i++) {
            // 剪枝：如果当前价格加上现有和超过目标金额，则不再考虑后面的价格
            if (sum + prices[i] > total) break;
            // 添加当前价格到组合路径中
            path.push_back(prices[i]);
            // 递归调用，允许重复使用当前价格
            dfs(total, prices, i, sum + prices[i], path, res);
            // 回溯，移除最后添加的价格
            path.pop_back();
        }
    }
    
    int main() {
        int amount;
        cin >> amount;
        cin.ignore(); // 忽略换行符
    
        string str;
        getline(cin, str);
        
        // 去除方括号并分割字符串为整数
        str = str.substr(1, str.size() - 2);
        vector<int> prices;
        size_t pos = 0;
        while ((pos = str.find(", ")) != string::npos) {
            prices.push_back(stoi(str.substr(0, pos)));
            str.erase(0, pos + 2);
        }
        prices.push_back(stoi(str));
        
        sort(prices.begin(), prices.end()); // 排序以便剪枝
        
        vector<vector<int>> res;
        vector<int> path;
        
        dfs(amount, prices, 0, 0, path, res);
        
        // 输出所有符合条件的组合
        cout << "[";
        for (size_t i = 0; i < res.size(); ++i) {
            cout << "[";
            for (size_t j = 0; j < res[i].size(); ++j) {
                cout << res[i][j];
                if (j < res[i].size() - 1) cout << ", ";
            }
            cout << "]";
            if (i < res.size() - 1) cout << ", ";
        }
        cout << "]" << endl;
        
        return 0;
    }
    
    

## C语言

    
    
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

#### 完整用例

##### 用例1

    
    
    (10,1),(20,1),(30,2),(40,3)
    

##### 用例2

    
    
    (1,1),(2,1),(3,1),(4,1),(5,1),(6,1),(7,1),(8,1),(9,1),(10,1)
    

##### 用例3

    
    
    (100,2),(200,2),(300,2),(400,2),(500,2),(600,2),(700,2),(800,2),(900,2),(1000,2)
    

##### 用例4

    
    
    (1,3),(2,2),(3,1),(4,2),(5,3),(6,1),(7,2),(8,3),(9,1),(10,2)
    

##### 用例5

    
    
    (1,1),(1,1),(1,1),(1,1),(1,1),(1,1),(1,1),(1,1),(1,1),(1,1)
    

##### 用例6

    
    
    (1,1),(2,2),(3,3),(4,4),(5,5),(6,6),(7,7),(8,8),(9,9),(10,10)
    

##### 用例7

    
    
    (1,3),(2,2),(3,1),(4,2),(5,3),(6,1),(7,2),(8,3),(9,1),(10,1)
    

##### 用例8

    
    
    (1,10),(2,9),(3,8),(4,7),(5,6),(6,5),(7,4),(8,3),(9,2),(10,1)
    

##### 用例9

    
    
    (1,1),(2,3),(3,2),(4,1),(5,2)
    

##### 用例10

    
    
    (10,1),(20,1),(30,2),(40,2)
    

