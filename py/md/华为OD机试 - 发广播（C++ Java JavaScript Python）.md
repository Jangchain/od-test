#### 题目描述

> 某地有N个广播站，站点之间有些有连接，有些没有。有连接的站点在接受到广播后会互相发送。
>
> 给定一个N*N的二维数组matrix,数组的元素都是字符’0’或者’1’。
>
> matrix[i][j] = ‘1’, 代表i和j站点之间有连接，
>
> matrix[i][j] = ‘0’, 代表没连接，
>
> 现在要发一条广播，问初始最少给几个广播站发送，才能保证所有的广播站都收到消息。

#### 输入描述

> 从stdin输入，共一行数据，表示二维数组的各行，用逗号分隔行。保证每行字符串所含的字符数一样的。
>
> 比如：110,110,001。

#### 输出描述

> 返回初始最少需要发送广播站个数

##### ACM输入输出模式

如果你经常使用**Leetcode** ,会知道**letcode** 是不需要编写输入输出函数的。但是华为OD机考使用的是 **ACM 模式**
，需要手动编写输入和输出。

所以最好在牛-
客上提前熟悉这种模式。例如C++使用`cin/cout`,python使用`input()/print()`。JavaScript使用node的`readline()`和`console.log()`。Java
使用`sacnner/system.out.print()`

#### 用例

输入| 110,110,001  
---|---  
输出| 2  
说明| 站点1和站点2直接有连接，站点3和其他的都没连接，所以开始至少需要给两个站点发送广播。  
输入| 100,010,001  
---|---  
输出| 3  
说明| 3台服务器互不连接，所以需要分别广播这3台服务器。  
输入| 11,11  
---|---  
输出| 1  
说明| 2台服务器相互连接，所以只需要广播其中一台服务器  
  
#### 解题思路：

  1. 读取输入的二维数组`matrix`，其中`matrix[i][j]`表示站点i和站点j之间是否有连接。
  2. 初始化一个长度为N的数组`visited`，用于记录每个站点是否已被访问。初始时，所有站点都未被访问，即`visited[i] = 0`。
  3. 初始化计数器`count`为0，用于记录最少需要发送广播站的个数。
  4. 遍历所有站点，对于每个未被访问的站点i：  
a. 使用深度优先搜索（DFS）遍历与站点i直接或间接连接的所有站点，并将这些站点标记为已访问。  
b. 将计数器`count`加1，表示需要给站点i发送广播。

  5. 遍历完所有站点后，计数器`count`的值即为初始最少需要发送广播站的个数。

#### C++

    
    
    #include <iostream>
    #include <vector>
    using namespace std;
    
    // 深度优先搜索（DFS）函数
    void dfs(vector<string>& matrix, vector<int>& visited, int index) {
        // 将站点 index 标记为已访问
        visited[index] = 1;
        // 获取站点 index 的连接情况
        string row = matrix[index];
        // 遍历站点 index 的所有连接
        for (int i = 0; i < row.length(); i++) {
            // 如果站点 i 与站点 index 有连接且未被访问
            if (row[i] == '1' && visited[i] == 0) {
                // 对站点 i 进行深度优先搜索（DFS）
                dfs(matrix, visited, i);
            }
        }
    }
    
    int main() {
        // 读取输入字符串
        string input;
        getline(cin, input);
    
        // 将输入字符串转换为 vector<string> 类型的 matrix
        vector<string> matrix;
        string temp = "";
        for (char c : input) {
            if (c == ',') {
                matrix.push_back(temp);
                temp = "";
            } else {
                temp += c;
            }
        }
        matrix.push_back(temp);
        int n = matrix.size();
    
        // 初始化一个长度为 n 的 vector<int> 类型的 visited，用于记录每个站点是否已被访问
        vector<int> visited(n, 0);
        // 初始化计数器 count 为 0，用于记录需要发送广播的站点数量
        int count = 0;
    
        // 遍历所有站点
        for (int i = 0; i < n; i++) {
            // 如果站点 i 未被访问
            if (visited[i] == 0) {
                // 对站点 i 进行深度优先搜索（DFS），将与站点 i 直接或间接连接的所有站点标记为已访问
                dfs(matrix, visited, i);
                // 将计数器 count 加 1，表示需要给站点 i 发送广播
                count++;
            }
        }
    
        // 输出计数器 count 的值，即初始最少需要发送广播站个数
        cout << count << endl;
    
        return 0;
    }
    
    
    

#### java

    
    
    import java.util.Scanner;
    import java.util.ArrayList;
    
    public class Main {
        public static void main(String[] args) {
            // 创建一个 Scanner 对象用于读取输入
            Scanner scanner = new Scanner(System.in);
            String input = scanner.nextLine();
    
            // 将输入字符串转换为 ArrayList<String> 类型的 matrix
            ArrayList<String> matrix = new ArrayList<>();
            String temp = "";
            for (char c : input.toCharArray()) {
                if (c == ',') {
                    matrix.add(temp);
                    temp = "";
                } else {
                    temp += c;
                }
            }
            matrix.add(temp);
            int n = matrix.size();
    
            // 初始化一个长度为 n 的数组 visited，用于记录每个站点是否已被访问
            int[] visited = new int[n];
            // 初始化计数器 count 为 0，用于记录需要发送广播的站点数量
            int count = 0;
    
            // 遍历所有站点
            for (int i = 0; i < n; i++) {
                // 如果站点 i 未被访问
                if (visited[i] == 0) {
                    // 对站点 i 进行深度优先搜索（DFS），将与站点 i 直接或间接连接的所有站点标记为已访问
                    dfs(matrix, visited, i);
                    // 将计数器 count 加 1，表示需要给站点 i 发送广播
                    count++;
                }
            }
    
            // 输出计数器 count 的值，即初始最少需要发送广播站个数
            System.out.println(count);
        }
    
        // 深度优先搜索（DFS）函数
        private static void dfs(ArrayList<String> matrix, int[] visited, int index) {
            // 将站点 index 标记为已访问
            visited[index] = 1;
            // 获取站点 index 的连接情况
            String row = matrix.get(index);
            // 遍历站点 index 的所有连接
            for (int i = 0; i < row.length(); i++) {
                // 如果站点 i 与站点 index 有连接且未被访问
                if (row.charAt(i) == '1' && visited[i] == 0) {
                    // 对站点 i 进行深度优先搜索（DFS）
                    dfs(matrix, visited, i);
                }
            }
        }
    }
    
    

#### javaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    // 当从标准输入读取到一行时，执行以下操作
    rl.on('line', (input) => {
      rl.close();
    
      const matrix = [];
      let temp = '';
    
      // 将输入字符串转换为表示站点连接关系的数组 matrix
      for (const c of input) {
        if (c === ',') {
          matrix.push(temp);
          temp = '';
        } else {
          temp += c;
        }
      }
    
      matrix.push(temp);
      const n = matrix.length;
    
      // 初始化一个长度为 n 的数组 visited，用于记录每个站点是否已被访问
      const visited = new Array(n).fill(0);
      // 初始化计数器 count 为 0，用于记录需要发送广播的站点数量
      let count = 0;
    
      // 遍历所有站点
      for (let i = 0; i < n; i++) {
        // 如果站点 i 未被访问
        if (visited[i] === 0) {
          // 对站点 i 进行深度优先搜索（DFS），将与站点 i 直接或间接连接的所有站点标记为已访问
          dfs(matrix, visited, i);
          // 将计数器 count 加 1，表示需要给站点 i 发送广播
          count++;
        }
      }
    
      // 输出计数器 count 的值，即初始最少需要发送广播站个数
      console.log(count);
    });
    
    // 深度优先搜索（DFS）函数
    function dfs(matrix, visited, index) {
      // 将站点 index 标记为已访问
      visited[index] = 1;
      // 获取站点 index 的连接情况
      const row = matrix[index];
    
      // 遍历站点 index 的所有连接
      for (let i = 0; i < row.length; i++) {
        // 如果站点 i 与站点 index 有连接且未被访问
        if (row.charAt(i) === '1' && visited[i] === 0) {
          // 对站点 i 进行深度优先搜索（DFS）
          dfs(matrix, visited, i);
        }
      }
    }
    
    
     
    

#### python

    
    
    import sys
    
    # 深度优先搜索（DFS）函数
    def dfs(matrix, visited, index):
        # 将站点 index 标记为已访问
        visited[index] = 1
        # 获取站点 index 的连接情况
        row = matrix[index]
        # 遍历站点 index 的所有连接
        for i in range(len(row)):
            # 如果站点 i 与站点 index 有连接且未被访问
            if row[i] == '1' and visited[i] == 0:
                # 对站点 i 进行深度优先搜索（DFS）
                dfs(matrix, visited, i)
    
    if __name__ == "__main__":
        # 读取输入字符串
        input = input()
        # 将输入字符串转换为表示站点连接关系的数组 matrix
        matrix = input.split(',')
    
        # 获取站点数量
        n = len(matrix)
    
        # 初始化一个长度为 n 的列表 visited，用于记录每个站点是否已被访问
        visited = [0] * n
        # 初始化计数器 count 为 0，用于记录需要发送广播的站点数量
        count = 0
    
        # 遍历所有站点
        for i in range(n):
            # 如果站点 i 未被访问
            if visited[i] == 0:
                # 对站点 i 进行深度优先搜索（DFS），将与站点 i 直接或间接连接的所有站点标记为已访问
                dfs(matrix, visited, i)
                # 将计数器 count 加 1，表示需要给站点 i 发送广播
                count += 1
    
        # 输出计数器 count 的值，即初始最少需要发送广播站个数
        print(count)
    
    

> #### 文章目录
>
>   *     *       * 题目描述
>       * 输入描述
>       * 输出描述
>       *         * ACM输入输出模式
>       * 用例
>       * 解题思路：
>       * C++
>       * java
>       * javaScript
>       * python
>

![fengmian](https://img-
blog.csdnimg.cn/img_convert/1d2f33ed8cf2fb1b9a4fe09513f7aa94.png)

