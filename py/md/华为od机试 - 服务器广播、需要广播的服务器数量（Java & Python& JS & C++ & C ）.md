## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

服务器连接方式包括直接相连，间接连接。

`A`和`B`直接连接，`B`和`C`直接连接，则`A`和`C`间接连接。

直接连接和间接连接都可以发送广播。

给出一个`N*N`数组，代表`N`个服务器，

`matrix[i][j] == 1`，  
则代表`i`和`j`直接连接；不等于 1 时，代表`i`和`j`不直接连接。

`matrix[i][i] == 1`，

即自己和自己直接连接。`matrix[i][j] == matrix[j][i]`。

计算初始需要给几台服务器广播， 才可以使每个服务器都收到广播。

## 输入描述

输入为`N`行，每行有`N`个数字，为`0`或`1`，由空格分隔，

构成`N*N`的数组，`N`的范围为 `1 <= N <= 40`

## 输出描述

输出一个数字，为需要广播的服务器的数量

## 示例1

输入

    
    
    1 0 0
    0 1 0
    0 0 1
    

输出

    
    
    3
    

说明

> 3 台服务器互不连接，所以需要分别广播这 3 台服务器

## 示例2

输入

    
    
    1 1
    1 1
    

输出

    
    
    1
    

说明

> 2 台服务器相互连接，所以只需要广播其中一台服务器

## 解题思路

这道题可以理解为在一组服务器之间进行广播传播。服务器之间既可以直接相连，也可以通过其他服务器间接相连。题目的目的是计算最少需要对几台服务器进行广播，才能保证所有服务器都能收到广播信号。

#### 题目要点：

  1. **服务器的直接连接与间接连接** ：

     * 如果服务器 `A` 和服务器 `B` 直接连接，或者服务器 `A` 可以通过其他服务器间接连接到 `B`，则广播信号可以通过这些连接传播。

     * 如果服务器 `A` 和服务器 `B` 不存在直接或间接的连接，说明它们属于不同的独立网络，广播信号无法在这些网络间传播。

  2. **矩阵描述** ：

     * 给定的 `N*N` 矩阵 `matrix` 描述了服务器的连接状态： 
       * `matrix[i][j] == 1` 表示服务器 `i` 和服务器 `j` 直接相连。
       * `matrix[i][j] == 0` 表示服务器 `i` 和服务器 `j` 之间没有直接连接。
       * `matrix[i][i] == 1`，表示每台服务器都和自己直接相连。
       * 矩阵是对称的，即 `matrix[i][j] == matrix[j][i]`，意味着连接是双向的。
  3. **广播的最小台数** ：

     * 要使每一台服务器都能接收到广播，需要确保每一个相互不连通的服务器组至少有一台服务器接收到初始广播。
     * 题目中需要计算最少要对多少台服务器发起广播，才能使所有服务器都能通过直接或间接连接接收到广播。

#### 示例分析：

##### 示例 1：

输入：

    
    
    1 0 0
    0 1 0
    0 0 1
    

解释：

  * 这 3 台服务器互相之间都没有连接，表示它们是完全独立的 3 个部分。
  * 为了使所有服务器都能接收到广播，需要分别对每台服务器进行广播，因此结果是 `3`。

##### 示例 2：

输入：

    
    
    1 1
    1 1
    

解释：

  * 这 2 台服务器相互直接连接，只需要对其中一台服务器进行广播，信号就会传递到另一台服务器，因此只需要一次广播，结果是 `1`。

#### 问题转化：

实际上，这道题可以转化为图论中的 **连通分量** 问题：

  * 矩阵中的每个服务器可以看作是图中的一个节点；
  * 如果两个服务器之间存在直接连接（即 `matrix[i][j] == 1`），则它们之间存在一条边；
  * 题目要求的是图中的连通分量的个数。每个连通分量中只需要选择一个服务器发起广播即可，所以连通分量的数量就是答案。

## Java

    
    
    import java.util.*;
    
    public class Main {
        public static void main(String[] args) {
        
            Scanner in = new Scanner(System.in);
    
            // 首先读取第一行，并将其通过空格拆分成字符串数组
            String[] str = in.nextLine().split(" ");
            int n = str.length;  // 服务器的数量，n 为矩阵的维度
    
            // 创建 n*n 的二维数组来存储服务器连接状态
            int[][] arr = new int[n][n];
    
            // 将第一行的连接状态转换为整数并存入数组 arr
            for(int i = 0; i < n; i++) {   
                arr[0][i] = Integer.parseInt(str[i]);
            }
    
            // 读取剩下的 n-1 行，并逐行存入 arr 矩阵
            for(int i = 1; i < n; i++) {   
                String[] s = in.nextLine().split(" ");
                for(int j = 0; j < n; j++) {
                    arr[i][j] = Integer.parseInt(s[j]);
                }
            }
    
            int count = 0;  // 计数器，记录连通分量的数量（即需要广播的服务器数量）
    
            // 使用队列来记录访问过的节点（服务器）
            Queue<Integer> queue = new LinkedList<>();
    
            // 遍历每个服务器，如果该服务器没有被访问过，就执行 DFS，找到其所有连通的服务器
            for(int i = 0; i < n; i++) {
                if(!queue.contains(i)) {  // 如果该服务器不在已访问队列中
                    dfs(arr, queue, i);  // 执行深度优先搜索
                    count++;  // 每次找到一个新的连通分量，计数器加1
                }
            }
    
            // 输出需要广播的服务器数量
            System.out.println(count);
        }
        
        // 深度优先搜索函数，递归查找服务器的所有连通节点
        public static void dfs(int[][] arr, Queue<Integer> queue, int index) {
            queue.offer(index);  // 将当前服务器加入已访问队列
    
            // 从当前服务器开始，查找所有直接相连的服务器
            for (int i = index + 1; i < arr.length; i++) {
                // 如果服务器 i 和当前服务器相连且还没有访问过，则继续递归搜索
                if (arr[index][i] == 1 && !queue.contains(i)) {
                    dfs(arr, queue, i);
                }
            }
        }
    }
    

## Python

    
    
    import sys
    
    # 深度优先搜索函数，递归遍历图中与当前服务器相连的所有服务器
    def dfs(arr, visited, index):
        visited[index] = True  # 标记当前服务器为已访问
        flag = True  # 标记是否存在相连的服务器
        for i in range(index + 1, len(arr)):  # 遍历所有服务器
            if arr[index][i] == 1:  # 如果当前服务器与服务器 i 相连
                flag = False  # 发现相连的服务器，设置 flag 为 False
                dfs(arr, visited, i)  # 递归搜索与服务器 i 相连的所有服务器
        if flag:  # 如果没有发现相连的服务器，即 flag 仍为 True
            global count  # 使用全局变量 count 计数
            count += 1  # 说明这是一个新的连通分量，计数加 1
    
    # 初始化计数器
    count = 0
    
    # 读取输入的第一行，表示服务器的连接矩阵的第一行
    str = input().split(" ")
    n = len(str)  # 服务器的数量，也就是矩阵的维度
    
    # 初始化 n*n 的二维数组 arr 来存储服务器连接状态
    arr = [[0]*n for _ in range(n)]
    
    # 将第一行数据存入 arr 的第一行
    for i in range(n):
        arr[0][i] = int(str[i])
    
    # 读取剩下的行并存入 arr 中
    for i in range(1, n):
        s = input().split(" ")
        for j in range(n):
            arr[i][j] = int(s[j])
    
    # 初始化 visited 数组，用来标记每个服务器是否已经被访问
    visited = [False] * n
    
    # 遍历每个服务器，执行 DFS 查找连通分量
    for i in range(n):
        if not visited[i]:  # 如果该服务器没有被访问
            dfs(arr, visited, i)  # 递归查找所有与该服务器相连的服务器
    
    # 输出连通分量的数量，即需要广播的服务器数量
    print(count)
    

## JavaScript

    
    
    const readline = require('readline');
    
     
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    // 深度优先搜索函数，递归查找与当前服务器相连的所有服务器
    function dfs(arr, visited, index) {
      visited[index] = true;  // 标记当前服务器为已访问
      let flag = true;  // 标记是否发现相连的服务器
      for (let i = index + 1; i < arr.length; i++) {  // 遍历服务器
        if (arr[index][i] === 1) {  // 如果服务器 i 和当前服务器相连
          flag = false;  // 发现相连的服务器，设置 flag 为 false
          dfs(arr, visited, i);  // 递归搜索与服务器 i 相连的服务器
        }
      }
      if (flag) {  // 如果 flag 仍为 true，表示该服务器为单独的连通分量
        count++;  // 增加连通分量计数
      }
    }
    
    // 初始化计数器
    let count = 0;
    let input = '';
    
     
    rl.on('line', (line) => {
      input += line + '\n';  // 收集每一行输入
    }).on('close', () => {
      const lines = input.trim().split('\n');  // 将输入按行拆分
      const str = lines[0].split(' ');  // 读取第一行
      const n = str.length;  // 获取服务器数量
      const arr = Array(n).fill(0).map(() => Array(n).fill(0));  // 初始化二维数组
      
      // 将第一行输入转换为二维数组的第一行
      for (let i = 0; i < n; i++) {
        arr[0][i] = parseInt(str[i]);
      }
      
      // 读取剩余行并存入二维数组
      for (let i = 1; i < n; i++) {
        const s = lines[i].split(' ');
        for (let j = 0; j < n; j++) {
          arr[i][j] = parseInt(s[j]);
        }
      }
      
      // 初始化访问数组，记录每个服务器是否已访问
      const visited = Array(n).fill(false);
      
      // 遍历每个服务器，查找未访问过的服务器并进行 DFS
      for (let i = 0; i < n; i++) {
        if (!visited[i]) {
          dfs(arr, visited, i);
        }
      }
    
      // 输出连通分量的数量
      console.log(count);
    });
    

## C++

    
    
    #include <iostream>
    #include <vector>
    using namespace std;
    
    int count = 0;  // 全局变量，用于记录连通分量的数量
    
    // 深度优先搜索函数，递归查找与当前服务器相连的服务器
    void dfs(vector<vector<int>>& arr, vector<bool>& visited, int index) {
        visited[index] = true;  // 标记当前服务器为已访问
        bool flag = true;  // 标记是否发现相连的服务器
    
        // 遍历当前服务器的所有可能相连的服务器
        for (int i = index + 1; i < arr.size(); i++) {
            if (arr[index][i] == 1) {  // 如果服务器 i 和当前服务器直接相连
                flag = false;  // 发现相连服务器，设置 flag 为 false
                dfs(arr, visited, i);  // 递归查找与服务器 i 相连的服务器
            }
        }
    
        if (flag) {  // 如果 flag 仍然为 true，表示这是一个新的连通分量
            count++;  // 增加连通分量计数
        }
    }
    
    int main() {
        string input;
        getline(cin, input);  // 读取输入的第一行
        vector<string> str;  // 用于存储拆分后的字符串
        size_t pos = 0;
    
        // 将输入按空格拆分存入 str
        while ((pos = input.find(" ")) != string::npos) {
            str.push_back(input.substr(0, pos));
            input.erase(0, pos + 1);
        }
        str.push_back(input);  // 最后一个元素也存入 str
    
        int n = str.size();  // 服务器数量
        vector<vector<int>> arr(n, vector<int>(n, 0));  // 初始化 n*n 的二维数组
    
        // 将第一行输入数据存入 arr 的第一行
        for (int i = 0; i < n; i++) {
            arr[0][i] = stoi(str[i]);
        }
    
        // 读取剩余行并存入 arr
        for (int i = 1; i < n; i++) {
            getline(cin, input);
            pos = 0;
            vector<string> s;
            while ((pos = input.find(" ")) != string::npos) {
                s.push_back(input.substr(0, pos));
                input.erase(0, pos + 1);
            }
            s.push_back(input);  // 最后一个元素也存入 s
    
            // 将该行数据存入 arr
            for (int j = 0; j < n; j++) {
                arr[i][j] = stoi(s[j]);
            }
        }
    
        vector<bool> visited(n, false);  // 初始化 visited 数组，标记服务器是否已访问
    
        // 遍历每个服务器，查找未访问过的服务器并进行 DFS
        for (int i = 0; i < n; i++) {
            if (!visited[i]) {
                dfs(arr, visited, i);
            }
        }
    
        // 输出连通分量的数量
        cout << count << endl;
    
        return 0;
    }
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    #include <string.h>
    #include <stdbool.h>
    
    int count = 0;  // 全局变量，用于记录连通分量的数量
    
    // 深度优先搜索函数，递归查找与当前服务器相连的服务器
    void dfs(int** arr, bool* visited, int n, int index) {
        visited[index] = true;  // 标记当前服务器为已访问
        bool flag = true;  // 标记是否发现相连的服务器
    
        // 遍历当前服务器的所有可能相连的服务器
        for (int i = index + 1; i < n; i++) {
            if (arr[index][i] == 1) {  // 如果服务器 i 和当前服务器直接相连
                flag = false;  // 发现相连服务器，设置 flag 为 false
                dfs(arr, visited, n, i);  // 递归查找与服务器 i 相连的服务器
            }
        }
    
        if (flag) {  // 如果 flag 仍然为 true，表示这是一个新的连通分量
            count++;  // 增加连通分量计数
        }
    }
    
    int main() {
        char input[1024];
        
        // 读取输入的第一行
        fgets(input, sizeof(input), stdin);
    
        // 按空格拆分输入的字符串，计算服务器数量
        int n = 0;
        char* token = strtok(input, " ");
        int* str = (int*)malloc(sizeof(int) * 100);  // 假设最多100个服务器
    
        while (token != NULL) {
            str[n++] = atoi(token);
            token = strtok(NULL, " ");
        }
    
        // 初始化 n*n 的二维数组
        int** arr = (int**)malloc(n * sizeof(int*));
        for (int i = 0; i < n; i++) {
            arr[i] = (int*)malloc(n * sizeof(int));
            for (int j = 0; j < n; j++) {
                arr[i][j] = 0;
            }
        }
    
        // 将第一行输入数据存入 arr 的第一行
        for (int i = 0; i < n; i++) {
            arr[0][i] = str[i];
        }
    
        // 读取剩余行并存入 arr
        for (int i = 1; i < n; i++) {
            fgets(input, sizeof(input), stdin);
            token = strtok(input, " ");
            for (int j = 0; j < n; j++) {
                arr[i][j] = atoi(token);
                token = strtok(NULL, " ");
            }
        }
    
        // 初始化 visited 数组，标记服务器是否已访问
        bool* visited = (bool*)malloc(n * sizeof(bool));
        for (int i = 0; i < n; i++) {
            visited[i] = false;
        }
    
        // 遍历每个服务器，查找未访问过的服务器并进行 DFS
        for (int i = 0; i < n; i++) {
            if (!visited[i]) {
                dfs(arr, visited, n, i);
            }
        }
    
        // 输出连通分量的数量
        printf("%d\n", count);
    
        return 0;
    }
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

