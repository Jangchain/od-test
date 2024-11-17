#### 题目描述:文件目录大小

一个文件目录的数据格式为：目录id，本目录中文件大小，(子目录id列表）。

其中目录id全局唯一，取值范围[1, 200]，本目录中文件大小范围[1, 1000]，子目录id列表个数[0,10]例如 : 1 20 (2,3)
表示目录1中文件总大小是20，有两个子目录，id分别是2和3

现在输入一个文件系统中所有目录信息，以及待查询的目录 id ，返回这个目录和及该目录所有子目录的大小之和。

#### 输入描述

第一行为两个数字M，N，分别表示目录的个数和待查询的目录id,

  * 1 ≤ M ≤ 100
  * 1 ≤ N ≤ 200

接下来M行，每行为1个目录的数据：

> 目录id 本目录中文件大小 (子目录id列表)

子目录列表中的子目录id以逗号分隔。

#### 输出描述

待查询目录及其子目录的大小之和

#### 用例1

输入

    
    
    3 1
    3 15 ()
    1 20 (2)
    2 10 (3)
    

输出

    
    
    45
    

说明

> 目录1大小为20，包含一个子目录2 (大小为10)，子目录2包含一个子目录3(大小为15)，总的大小为20+10+15=45

#### 用例2

输入

    
    
    4 2
    4 20 ()
    5 30 ()
    2 10 (4,5)
    1 40 ()
    

输出

    
    
    60
    

说明

> 目录2包含2个子目录4和5，总的大小为10+20+30 = 60

####

#### Java

    
    
    import java.util.*;
    import java.util.stream.Collectors;
    
    public class Main {
      public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
    
        int directoryCount = sc.nextInt();
        int queryDirectoryId = sc.nextInt();
    
        HashMap<Integer, ArrayList<Integer>> children = new HashMap<>();
        HashMap<Integer, Integer> directorySize = new HashMap<>();
        readInput(sc, directoryCount, children, directorySize);
    
        int totalSize = calculateTotalSize(children, directorySize, queryDirectoryId);
    
        System.out.println(totalSize);
      }
    
      public static void readInput(Scanner sc, int directoryCount, HashMap<Integer, ArrayList<Integer>> children, HashMap<Integer, Integer> directorySize) {
        for (int i = 0; i < directoryCount; i++) {
          int directoryId = sc.nextInt();
          int size = sc.nextInt();
    
          children.putIfAbsent(directoryId, new ArrayList<>());
          directorySize.putIfAbsent(directoryId, size);
    
          String childrenString = sc.next();
          if (childrenString.length() > 2) {
            children
                .get(directoryId)
                .addAll(
                    Arrays.stream(childrenString.substring(1, childrenString.length() - 1).split(","))
                        .map(Integer::parseInt)
                        .collect(Collectors.toList()));
          }
        }
      }
    
      public static int calculateTotalSize(HashMap<Integer, ArrayList<Integer>> children, HashMap<Integer, Integer> directorySize, int queryDirectoryId) {
        int totalSize = 0;
    
        LinkedList<Integer> stack = new LinkedList<>();
        stack.add(queryDirectoryId);
    
        while (!stack.isEmpty()) {
          Integer id = stack.pop();
          if (!directorySize.containsKey(id)) continue;
          totalSize += directorySize.get(id);
          stack.addAll(children.get(id));
        }
    
        return totalSize;
      }
    }
    

#### C++

    
    
    #include <iostream>
    #include <vector>
    #include <unordered_map>
    #include <sstream>
    
    using namespace std;
    
    void readInput(int directoryCount, unordered_map<int, vector<int>>& children, unordered_map<int, int>& directorySize) {
        for (int i = 0; i < directoryCount; i++) {
            int directoryId, size;
            cin >> directoryId >> size;
    
            children[directoryId] = vector<int>();
            directorySize[directoryId] = size;
    
            string childrenString;
            cin >> childrenString;
            if (childrenString.length() > 2) {
                stringstream ss(childrenString.substr(1, childrenString.length() - 2));
                string child;
                while (getline(ss, child, ',')) {
                    children[directoryId].push_back(stoi(child));
                }
            }
        }
    }
    
    int calculateTotalSize(unordered_map<int, vector<int>>& children, unordered_map<int, int>& directorySize, int queryDirectoryId) {
        int totalSize = 0;
    
        vector<int> stack;
        stack.push_back(queryDirectoryId);
    
        while (!stack.empty()) {
            int id = stack.back();
            stack.pop_back();
            if (directorySize.find(id) == directorySize.end()) continue;
            totalSize += directorySize[id];
            for (int child : children[id]) {
                stack.push_back(child);
            }
        }
    
        return totalSize;
    }
    
    int main() {
        int directoryCount, queryDirectoryId;
        cin >> directoryCount >> queryDirectoryId;
    
        unordered_map<int, vector<int>> children;
        unordered_map<int, int> directorySize;
        readInput(directoryCount, children, directorySize);
    
        int totalSize = calculateTotalSize(children, directorySize, queryDirectoryId);
    
        cout << totalSize << endl;
    
        return 0;
    }
    
    

#### JavaScript

    
    
    const readline = require("readline");
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    
    const lines = [];
    let directoryCount, targetDirectoryId;
    
    rl.on("line", (line) => {
      lines.push(line);
    
      if (lines.length == 1) {
        [directoryCount, targetDirectoryId] = lines[0].split(" ").map(Number);
      }
    
      if (directoryCount && lines.length == directoryCount + 1) {
        lines.shift();
    
        const childrenMap = new Map();
        const sizeMap = new Map();
    
        lines.forEach((s) => {
          let [directoryId, size, childListStr] = s.split(" ");
    
          directoryId = Number(directoryId);
          size = Number(size);
    
          childrenMap.set(directoryId, []);
          sizeMap.set(directoryId, size);
    
          if (childListStr.length > 2) {
            childrenMap.get(directoryId).push(
              ...childListStr
                .substring(1, childListStr.length - 1)
                .split(",")
                .map(Number)
            );
          }
        });
    
        let totalSize = 0;
    
        const stack = [];
        stack.push(targetDirectoryId);
    
        while (stack.length > 0) {
          const id = stack.pop();
          if (sizeMap.get(id) === undefined) continue;
          totalSize += sizeMap.get(id);
          stack.push(...childrenMap.get(id));
        }
    
        console.log(totalSize);
        lines.length = 0;
      }
    });
    

#### Python

    
    
    # 输入目录个数和待查询目录id
    m, n = map(int, input().split())
    
    # 存储子目录关系和目录大小的字典
    children = {}
    cap = {}
    
    # 输入目录信息
    for _ in range(m):
        fa_id, fa_cap, ch_str = input().split()
        children[fa_id] = []
        cap[fa_id] = int(fa_cap)
    
        if len(ch_str) > 2:
            children[fa_id].extend(ch_str[1:-1].split(","))
    
    # 初始化结果变量
    ans = 0
    
    # 使用栈进行深度优先搜索
    stack = [str(n)]
    
    while len(stack) > 0:
        id = stack.pop()
        if cap.get(id) is None:
            continue
        ans += cap[id]
        stack.extend(children[id])
    
    # 输出结果
    print(ans)
    

> #### 文章目录
>
>   *     *       * 题目描述:文件目录大小
>       * 输入描述
>       * 输出描述
>       * 用例1
>       * 用例2
>       *       * Java
>       * C++
>       * JavaScript
>       * Python
>

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

