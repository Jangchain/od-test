## 题目描述

有一个考古学家发现一个石碑，但是很可惜，发现时其已经断成多段，原地发现n个断口整齐的石碑碎片。为了破解石碑内容，考古学家希望有程序能帮忙计算复原后的石碑文字组合数，你能帮忙吗？

## 输入描述

第一行输入n，n表示石碑碎片的个数。

第二行依次输入石碑碎片上的文字内容s，共有n组。

## 输出描述

输出石碑文字的组合（按照升序排列），行末无多余空格。

## 用例

输入| 3  
a b c  
---|---  
输出| abc  
acb  
bac  
bca  
cab  
cba  
说明| 无  
输入| 3  
a b a  
---|---  
输出| aab  
aba  
baa  
说明| 无  
  
## 题目解析

全排列问题！！！

原题参考：[47\. 全排列 II - 力扣（LeetCode）](https://leetcode.cn/problems/permutations-
ii/solutions/)

## 解体思路

解决这个问题的方法是使用深度优先搜索（DFS）遍历所有可能的组合。以下是详细的思路：

  1. 首先，读取输入的石碑碎片个数`n`和石碑碎片上的文字内容`s`。
  2. 将输入的石碑碎片内容存入一个列表`charArray`，并对其进行排序。排序的目的是为了在遍历过程中方便地跳过重复的组合。
  3. 定义一个深度优先搜索函数`dfs`，其中包含以下参数： 
     * `charArray`：存储石碑碎片内容的列表。
     * `depth`：当前搜索的深度。
     * `path`：存储已经使用过的碎片。
     * `used`：记录每个碎片是否被使用过。
     * `result`：存储所有可能的组合。
  4. 在`dfs`函数中，首先检查当前搜索的深度是否等于石碑碎片的个数。如果是，则将当前组合加入结果列表`result`。
  5. 遍历`charArray`中的每个碎片。对于每个碎片，检查它是否已经被使用过，以及它是否与前一个碎片相同且前一个碎片未被使用。如果满足这些条件，则跳过当前碎片。
  6. 将当前碎片添加到`path`中，并标记它为已使用。然后递归地搜索下一个碎片。
  7. 在递归返回后，执行回溯操作：将当前碎片从`path`中移除，并标记它为未使用。
  8. 调用`dfs`函数，开始搜索所有可能的组合。
  9. 最后，输出所有找到的组合。

这种方法可以有效地遍历所有可能的石碑文字组合，并通过跳过重复的组合来减少搜索空间。

## C++

    
    
    #include <iostream>
    #include <vector>
    #include <algorithm>
    #include <deque>
    #include <string>
    
    using namespace std;
    
    // 深度优先搜索函数
    void dfs(vector<string>& charArray, int depth, deque<string>& path, vector<bool>& used, vector<vector<string>>& result);
    
    int main() {
        // 处理输入
        int n;
        cin >> n;
        cin.ignore(); // 忽略第一行剩余的换行符
        string inputLine;
        getline(cin, inputLine);
        vector<string> charArray;
        string tempStr = "";
        for(int i = 0; i < inputLine.size(); i++) {
            if(inputLine[i] == ' ') {
                charArray.push_back(tempStr); // 将输入的碎片存入 charArray 中
                tempStr = "";
            }
            else {
                tempStr += inputLine[i];
            }
        }
        charArray.push_back(tempStr); // 存入最后一个碎片
        vector<vector<string>> result;
    
        // 先对碎片进行排序
        sort(charArray.begin(), charArray.end()); 
        // path 中存储已经使用过的碎片
        deque<string> path; 
        // 记录每个碎片是否被使用过
        vector<bool> used(n, false); 
        dfs(charArray, 0, path, used, result); 
    
        // 输出所有组合
        for (int i = 0; i < result.size(); i++) {  
            string outputStr = "";
            for(int j = 0; j < result[i].size(); j++) {
                outputStr += result[i][j];
            }
            cout << outputStr << endl;
        }
    
        return 0;
    }
    
    // 深度优先搜索函数
    void dfs(vector<string>& charArray, int depth, deque<string>& path, vector<bool>& used, vector<vector<string>>& result) {
        // 如果碎片都已经被使用过，将当前组合加入结果中
        if (depth == charArray.size()) {
            result.push_back(vector<string>(path.begin(), path.end())); 
            return;
        }
        for (int i = 0; i < charArray.size(); i++) {
            // 如果碎片已经被使用过，则跳过
            if (used[i]) {  
                continue;
            }
            // 如果当前碎片和前一个碎片相同，并且前一个碎片还没有被使用，则跳过
            if (i > 0 && charArray[i] == charArray[i - 1] && !used[i - 1]) {
                continue;
            }
            path.push_back(charArray[i]); // 将当前碎片存入 path 中
            used[i] = true; // 标记当前碎片已被使用
            dfs(charArray, depth + 1, path, used, result); // 递归搜索下一个碎片
            path.pop_back(); // 回溯，将当前碎片从 path 中移除
            used[i] = false; // 标记当前碎片未被使用
        }
    }
    

## JavaScript

    
    
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    // 深度优先搜索函数
    function dfs(charArray, depth, path, used, result) {
        // 如果碎片都已经被使用过，将当前组合加入结果中
        if (depth === charArray.length) {
            result.push([...path]);
            return;
        }
        for (let i = 0; i < charArray.length; i++) {
            // 如果碎片已经被使用过，则跳过
            if (used[i]) {
                continue;
            }
            // 如果当前碎片和前一个碎片相同，并且前一个碎片还没有被使用，则跳过
            if (i > 0 && charArray[i] === charArray[i - 1] && !used[i - 1]) {
                continue;
            }
            path.push(charArray[i]); // 将当前碎片存入 path 中
            used[i] = true; // 标记当前碎片已被使用
            dfs(charArray, depth + 1, path, used, result); // 递归搜索下一个碎片
            path.pop(); // 回溯，将当前碎片从 path 中移除
            used[i] = false; // 标记当前碎片未被使用
        }
    }
    
    rl.on('line', function (input) {
        let n = parseInt(input);
        rl.on('line', function (input) {
            let charArray = input.split(' ');
            let result = [];
    
            // 先对碎片进行排序
            charArray.sort();
            // path 中存储已经使用过的碎片
            let path = [];
            // 记录每个碎片是否被使用过
            let used = new Array(n).fill(false);
            dfs(charArray, 0, path, used, result);
    
            // 输出所有组合
            for (let i = 0; i < result.length; i++) {
                console.log(result[i].join(''));
            }
        });
    });
    

## Java

    
    
    import java.util.*;
    
    public class Main {
        // 深度优先搜索函数
        public static void dfs(String[] charArray, int depth, StringBuilder path, boolean[] used, List<String> result) {
            // 如果碎片都已经被使用过，将当前组合加入结果中
            if (depth == charArray.length) {
                result.add(path.toString());
                return;
            }
            for (int i = 0; i < charArray.length; i++) {
                // 如果碎片已经被使用过，则跳过
                if (used[i]) {
                    continue;
                }
                // 如果当前碎片和前一个碎片相同，并且前一个碎片还没有被使用，则跳过
                if (i > 0 && charArray[i].equals(charArray[i - 1]) && !used[i - 1]) {
                    continue;
                }
                path.append(charArray[i]); // 将当前碎片存入 path 中
                used[i] = true; // 标记当前碎片已被使用
                dfs(charArray, depth + 1, path, used, result); // 递归搜索下一个碎片
                path.setLength(path.length() - 1); // 回溯，将当前碎片从 path 中移除
                used[i] = false; // 标记当前碎片未被使用
            }
        }
    
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            // 处理输入
            int n = scanner.nextInt();
            scanner.nextLine(); // 忽略第一行剩余的换行符
            String inputLine = scanner.nextLine();
            String[] charArray = inputLine.split(" ");
            List<String> result = new ArrayList<>();
    
            // 先对碎片进行排序
            Arrays.sort(charArray);
            // path 中存储已经使用过的碎片
            StringBuilder path = new StringBuilder();
            // 记录每个碎片是否被使用过
            boolean[] used = new boolean[n];
            dfs(charArray, 0, path, used, result);
    
            // 输出所有组合
            for (String s : result) {
                System.out.println(s);
            }
        }
    }
    

## Python

    
    
    import sys
    
    # 深度优先搜索函数
    def dfs(charArray, depth, path, used, result):
        # 如果碎片都已经被使用过，将当前组合加入结果中
        if depth == len(charArray):
            result.append(list(path))
            return
        for i in range(len(charArray)):
            # 如果碎片已经被使用过，则跳过
            if used[i]:
                continue
            # 如果当前碎片和前一个碎片相同，并且前一个碎片还没有被使用，则跳过
            if i > 0 and charArray[i] == charArray[i - 1] and not used[i - 1]:
                continue
            path.append(charArray[i]) # 将当前碎片存入 path 中
            used[i] = True # 标记当前碎片已被使用
            dfs(charArray, depth + 1, path, used, result) # 递归搜索下一个碎片
            path.pop() # 回溯，将当前碎片从 path 中移除
            used[i] = False # 标记当前碎片未被使用
    
    if __name__ == '__main__':
        # 处理输入
        n = int(input())
        inputLine = input()
        charArray = inputLine.split()
        result = []
    
        # 先对碎片进行排序
        charArray.sort()
        # path 中存储已经使用过的碎片
        path = []
        # 记录每个碎片是否被使用过
        used = [False] * n
        dfs(charArray, 0, path, used, result)
    
        # 输出所有组合
        for i in range(len(result)):
            outputStr = ''.join(result[i])
            print(outputStr)
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    #include <string.h>
    
    // 定义石碑碎片的最大个数
    #define MAX_N 100
    
    // 比较函数，用于qsort排序
    int compare(const void *a, const void *b) {
        return strcmp(*(const char**)a, *(const char**)b);
    }
    
    // 深度优先搜索函数
    void dfs(char *charArray[], int n, int depth, char *path, int *pathIndex, int *used, char result[][MAX_N], int *resultIndex) {
        // 如果深度等于n，将当前path存入result
        if (depth == n) {
            path[*pathIndex] = '\0';
            strcpy(result[*resultIndex], path);
            (*resultIndex)++;
            return;
        }
    
        for (int i = 0; i < n; i++) {
            // 跳过已使用的碎片
            if (used[i]) {
                continue;
            }
            // 跳过重复的碎片
            if (i > 0 && strcmp(charArray[i], charArray[i - 1]) == 0 && !used[i - 1]) {
                continue;
            }
            // 添加当前碎片到path
            path[*pathIndex] = *charArray[i];
            (*pathIndex)++;
            used[i] = 1; // 标记为已使用
            dfs(charArray, n, depth + 1, path, pathIndex, used, result, resultIndex); // 递归
            (*pathIndex)--; // 回溯
            used[i] = 0; // 标记为未使用
        }
    }
    
    int main() {
        int n;
        scanf("%d", &n); // 读取碎片个数
        char *charArray[MAX_N];
        char buffer[MAX_N];
    
        // 读取碎片
        for (int i = 0; i < n; i++) {
            charArray[i] = (char*)malloc(MAX_N * sizeof(char));
            scanf("%s", charArray[i]);
        }
    
        // 对碎片排序
        qsort(charArray, n, sizeof(char*), compare);
    
        // 结果数组，path数组，和辅助数组
        char result[MAX_N][MAX_N];
        char path[MAX_N];
        int pathIndex = 0;
        int used[MAX_N] = {0};
        int resultIndex = 0;
    
        // 执行深度优先搜索
        dfs(charArray, n, 0, path, &pathIndex, used, result, &resultIndex);
    
        // 输出所有组合
        for (int i = 0; i < resultIndex; i++) {
            printf("%s\n", result[i]);
        }
    
        // 释放内存
        for (int i = 0; i < n; i++) {
            free(charArray[i]);
        }
    
        return 0;
    }
    

## 以下代码满足用例含有字符串

输入

    
    
    3
    a b ab
    

输出

    
    
    aabb
    abab
    abba
    baab
    baba
    

## java字符串

    
    
    import java.util.*;
    
    public class Main {
        public static void main(String[] args) {
            // 创建Scanner对象用于从控制台读取输入
            Scanner scanner = new Scanner(System.in);
            // 读取石碑碎片的数量
            int numFragments = Integer.parseInt(scanner.nextLine());
            // 读取每个碎片的文字内容并存储在数组中
            String[] fragments = scanner.nextLine().split(" ");
    
            // 创建一个TreeSet用于存储所有排列结果，TreeSet会自动进行排序和去重
            TreeSet<String> resultSet = new TreeSet<>();
            // 创建一个布尔数组用于标记每个碎片是否被使用过
            boolean[] visited = new boolean[numFragments];
    
            // 调用深度优先搜索函数开始生成排列组合
            dfs(0, fragments, visited, new StringBuilder(), resultSet, numFragments);
    
            // 输出所有生成的排列组合
            for (String combination : resultSet) {
                System.out.println(combination);
            }
        }
    
        // 深度优先搜索函数，用于生成所有可能的字符串排列组合
        static void dfs(int currentLength, String[] fragments, boolean[] visited, StringBuilder currentPath, TreeSet<String> resultSet, int numFragments) {
            // 如果当前排列的长度等于碎片的数量，说明生成了一个完整的排列
            if (currentLength == numFragments) {
                resultSet.add(currentPath.toString());  // 将生成的排列添加到结果集中
                return;  // 结束当前递归
            }
            // 遍历所有碎片
            for (int i = 0; i < numFragments; i++) {
                // 如果当前碎片没有被使用
                if (!visited[i]) {
                    // 标记当前碎片为已使用
                    visited[i] = true;
                    // 将当前碎片的内容添加到当前路径中
                    currentPath.append(fragments[i]);
    
                    // 递归调用函数生成下一个碎片的排列
                    dfs(currentLength + 1, fragments, visited, currentPath, resultSet, numFragments);
    
                    // 回溯操作，撤销当前碎片的使用标记，并从路径中删除当前碎片内容
                    visited[i] = false;
                    currentPath.delete(currentPath.length() - fragments[i].length(), currentPath.length());
                }
            }
        }
    }
    
    

## python字符串

    
    
    def dfs(current_length, fragments, visited, current_path, result_set, num_fragments):
        # 如果当前排列的长度等于碎片的数量，说明生成了一个完整的排列
        if current_length == num_fragments:
            result_set.add(''.join(current_path))  # 将生成的排列添加到结果集中
            return  # 结束当前递归
    
        # 遍历所有碎片
        for i in range(num_fragments):
            # 如果当前碎片没有被使用
            if not visited[i]:
                # 标记当前碎片为已使用
                visited[i] = True
                # 将当前碎片的内容添加到当前路径中
                current_path.append(fragments[i])
    
                # 递归调用函数生成下一个碎片的排列
                dfs(current_length + 1, fragments, visited, current_path, result_set, num_fragments)
    
                # 回溯操作，撤销当前碎片的使用标记，并从路径中删除当前碎片内容
                visited[i] = False
                current_path.pop()
     
    num_fragments = int(input())
    fragments = input().split()
    
    # 使用集合存储所有排列结果，集合会自动去重
    result_set = set()
    # 创建一个布尔列表用于标记每个碎片是否被使用过
    visited = [False] * num_fragments
    
    # 调用深度优先搜索函数开始生成排列组合
    dfs(0, fragments, visited, [], result_set, num_fragments)
    
    # 输出所有生成的排列组合，并按字典序排序
    for combination in sorted(result_set):
        print(combination)
    
    

## javaScript字符串

    
    
    const readline = require('readline');
    
    // 创建接口用于从控制台读取输入
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    // 从控制台读取输入
    rl.on('line', (numFragments) => {
        rl.on('line', (fragmentString) => {
            const fragments = fragmentString.split(' ');
            const resultSet = new Set();
            const visited = new Array(Number(numFragments)).fill(false);
    
            // 调用深度优先搜索函数开始生成排列组合
            dfs(0, fragments, visited, [], resultSet, Number(numFragments));
    
            // 输出所有生成的排列组合，并按字典序排序
            Array.from(resultSet).sort().forEach(combination => {
                console.log(combination);
            });
    
            rl.close();
        });
    });
    
     
    function dfs(currentLength, fragments, visited, currentPath, resultSet, numFragments) {
        // 如果当前排列的长度等于碎片的数量，说明生成了一个完整的排列
        if (currentLength === numFragments) {
            resultSet.add(currentPath.join(''));  // 将生成的排列添加到结果集中
            return;  // 结束当前递归
        }
    
        // 遍历所有碎片
        for (let i = 0; i < numFragments; i++) {
            // 如果当前碎片没有被使用
            if (!visited[i]) {
                // 标记当前碎片为已使用
                visited[i] = true;
                // 将当前碎片的内容添加到当前路径中
                currentPath.push(fragments[i]);
    
                // 递归调用函数生成下一个碎片的排列
                dfs(currentLength + 1, fragments, visited, currentPath, resultSet, numFragments);
    
                // 回溯操作，撤销当前碎片的使用标记，并从路径中删除当前碎片内容
                visited[i] = false;
                currentPath.pop();
            }
        }
    }
    

## C++字符串

    
    
    #include <iostream>
    #include <vector>
    #include <string>
    #include <set>
    #include <algorithm>
    
    using namespace std;
    
    // 深度优先搜索函数声明
    void dfs(int currentLength, const vector<string>& fragments, vector<bool>& visited, vector<string>& currentPath, set<string>& resultSet, int numFragments);
    
    int main() {
        int n;  // 石碑碎片的数量
        vector<string> arr;  // 存储石碑碎片的数组
        cin >> n;  // 读取碎片数量
    
        // 读取每个碎片的内容
        for (int i = 0; i < n; i++) {
            string tmp;
            cin >> tmp;
            arr.emplace_back(tmp);
        }
    
        set<string> resultSet;  // 存储结果的集合
        vector<bool> visited(n, false);  // 标记每个碎片是否被使用过的布尔数组
        vector<string> currentPath;  // 当前路径
    
        // 调用深度优先搜索函数开始生成排列组合
        dfs(0, arr, visited, currentPath, resultSet, n);
    
        // 输出所有生成的排列组合，并按字典序排序
        for (const auto& combination : resultSet) {
            cout << combination << endl;
        }
    
        return 0;
    }
    
    void dfs(int currentLength, const vector<string>& fragments, vector<bool>& visited, vector<string>& currentPath, set<string>& resultSet, int numFragments) {
        // 如果当前排列的长度等于碎片的数量，说明生成了一个完整的排列
        if (currentLength == numFragments) {
            string combination;  // 存储当前组合的字符串
            for (const auto& fragment : currentPath) {
                combination += fragment;
            }
            resultSet.insert(combination);  // 将生成的排列添加到结果集中
            return;  // 结束当前递归
        }
    
        // 遍历所有碎片
        for (int i = 0; i < numFragments; i++) {
            // 如果当前碎片没有被使用
            if (!visited[i]) {
                // 标记当前碎片为已使用
                visited[i] = true;
                // 将当前碎片的内容添加到当前路径中
                currentPath.push_back(fragments[i]);
    
                // 递归调用函数生成下一个碎片的排列
                dfs(currentLength + 1, fragments, visited, currentPath, resultSet, numFragments);
    
                // 回溯操作，撤销当前碎片的使用标记，并从路径中删除当前碎片内容
                visited[i] = false;
                currentPath.pop_back();
            }
        }
    }
    
    
    

## C语言字符串

    
    
    #include <stdio.h>
    #include <stdlib.h>
    #include <string.h>
    
    #define MAX_N 100
    #define MAX_S_LEN 10
    #define MAX_RES_SIZE 100000
    
    int n;
    char arr[MAX_N][MAX_S_LEN];  // 存储石碑碎片的数组
    
    // 求全排列时，标记已使用的元素
    int used[MAX_N] = {0};
    
    // 记录题解
    char res[MAX_RES_SIZE][MAX_N * MAX_S_LEN];
    int res_size = 0;
    
    // 排列
    char path[MAX_N * MAX_S_LEN] = {'\0'};
    
    // 比较函数，用于qsort排序
    int cmp(const void *a, const void *b) {
        return strcmp((char *)a, (char *)b);
    }
    
    // 深度优先搜索函数，用于生成所有可能的字符串排列组合
    void dfs(int path_size) {
        // 如果当前排列的长度等于碎片的数量，说明生成了一个完整的排列
        if (path_size == n) {
            strcpy(res[res_size++], path);  // 将生成的排列添加到结果集中
            return;
        }
    
        // 遍历所有碎片
        for (int i = 0; i < n; i++) {
            // 如果当前碎片已经被使用，跳过
            if (used[i]) continue;
    
            // 去重：如果当前碎片与前一个碎片相同且前一个碎片未被使用，跳过
            if (i > 0 && strcmp(arr[i], arr[i - 1]) == 0 && !used[i - 1]) continue;
    
            // 标记当前碎片为已使用
            used[i] = 1;
            // 将当前碎片的内容添加到当前路径中
            strcat(path, arr[i]);
    
            // 递归调用函数生成下一个碎片的排列
            dfs(path_size + 1);
    
            // 回溯操作，撤销当前碎片的使用标记，并从路径中删除当前碎片内容
            path[strlen(path) - strlen(arr[i])] = '\0';
            used[i] = 0;
        }
    }
    
    int main() {
        // 读取碎片数量
        scanf("%d", &n);
    
        // 读取每个碎片的内容
        for (int i = 0; i < n; i++) {
            scanf("%s", arr[i]);
        }
    
        // 排序是为了让相同元素相邻，方便后面去重
        qsort(arr, n, sizeof(arr[0]), cmp);
    
        // 调用深度优先搜索函数开始生成排列组合
        dfs(0);
    
        // 排序结果集合
        qsort(res, res_size, sizeof(res[0]), cmp);
    
        // 输出石碑文字的组合（按照升序排列）
        for (int i = 0; i < res_size; i++) {
            // 去重输出
            if (i == 0 || (i > 0 && strcmp(res[i], res[i - 1]) != 0)) {
                puts(res[i]);
            }
        }
    
        return 0;
    }
    

## 完整用例

### 用例1

    
    
    3
    a b c
    

### 用例2

    
    
    3
    a b a
    

### 用例3

    
    
    4
    a a b b
    

### 用例4

    
    
    2
    x y
    

### 用例5

    
    
    3
    a a a
    

### 用例6

    
    
    4
    a b c d
    

### 用例7

    
    
    3
    z z y
    

### 用例8

    
    
    5
    a a b b c
    

### 用例9

    
    
    4
    1 2 2 3
    

### 用例10

    
    
    4
    a a a b
    

#### 文章目录

  * 题目描述
  * 输入描述
  * 输出描述
  * 用例
  * 题目解析
  * 解体思路
  * C++
  * JavaScript
  * Java
  * Python
  * C语言
  * 以下代码满足用例含有字符串
  * java字符串
  * python字符串
  * javaScript字符串
  * C++字符串
  * C语言字符串
  * 完整用例
  *     * 用例1
    * 用例2
    * 用例3
    * 用例4
    * 用例5
    * 用例6
    * 用例7
    * 用例8
    * 用例9
    * 用例10

![fengmian](https://i-blog.csdnimg.cn/blog_migrate/169f277a87c29b8ff13d65ef9e7eeec7.png)

