#### 题目描述

地上共有N个格子，你需要跳完地上所有的格子，但是格子间是有强依赖关系的，跳完前一个格子后，后续的格子才会被开启，格子间的依赖关系由多组steps数组给出，steps[0]表示前一个格子，steps[1]表示steps[0]可以开启的格子:

比如[0,1]表示从跳完第0个格子以后第1个格子就开启了，比如[2,1]，[2,3]表示跳完第2个格子后第1个格子和第3个格子就被开启了。

请你计算是否能由给出的steps数组跳完所有的格子，如果可以输出yes，否则输出no。

**说明：**

1.你可以从一个格子跳到任意一个开启的格子

2.没有前置依赖条件的格子默认就是开启的

3.如果总数是N，则所有的格子编号为[0,1,2,3…N-1]连续的数组

#### 输入描述

输入一个整数N表示总共有多少个格子，接着输入多组二维数组steps表示所有格子之间的依赖关系。

#### 输出描述

如果能按照steps给定的依赖顺序跳完所有的格子输出yes，

否则输出no。

#### 用例

输入| 3  
0 1  
0 2  
---|---  
输出| yes  
说明|
总共有三个格子[0,1,2]，跳完0个格子后第1个格子就开启了，跳到第0个格子后第2个格子也被开启了，按照0->1->2或者0->2->1的顺序都可以跳完所有的格子  
输入| 2  
1 0  
0 1  
---|---  
输出| no  
说明| 总共有2个格子，第1个格子可以开启第0格子，但是第1个格子又需要第0个格子才能开启，相互依赖，因此无法完成  
输入| 6  
0 1  
0 2  
0 3  
0 4  
0 5  
---|---  
输出| yes  
说明| 总共有6个格子，第0个格子可以开启第1,2,3,4,5个格子，所以跳完第0个格子之后其他格子都被开启了，之后按任何顺序可以跳完剩余的格子  
输入| 5  
4 3  
0 4  
2 1  
3 2  
---|---  
输出| yes  
说明|
跳完第0个格子可以开启格子4，跳完格子4可以开启格子3，跳完格子3可以开启格子2，跳完格子2可以开启格子1，按照0->4->3->2->1这样就跳完所有的格子  
输入| 4  
1 2  
1 0  
---|---  
输出| yes  
说明|
总共4个格子[0,1,2,3]，格子1和格子3没有前置条件所以默认开启，格子1可以开启格子0和格子2，所以跳到格子1之后就可以开启所有的格子，因此可以跳完所有格子。  
  
#### C++

    
    
    #include <iostream>
    #include <vector>
    #include <sstream>
    using namespace std;
    
    enum VisitStatus { UNVISITED, VISITING, VISITED }; // 遍历状态
    
    void dfs(int node, vector<VisitStatus>& visitStatus, vector<vector<int>>& edges, bool& stepAllGrids) {
        visitStatus[node] = VISITING; // 标记节点为正在遍历
    
        for(int neighbor : edges[node]) { // 遍历邻居节点
            if(visitStatus[neighbor] == UNVISITED) { // 如果邻居节点未被遍历
                dfs(neighbor, visitStatus, edges, stepAllGrids); // 递归遍历邻居节点
    
                if(!stepAllGrids) { // 如果已经无法跳完所有格子，直接返回
                    return;
                }
            } else if(visitStatus[neighbor] == VISITING) { // 如果邻居节点已被遍历但未完成遍历（即在当前遍历路径中）
                stepAllGrids = false; // 无法跳完所有格子，标志置为false
                return;
            }
        }
    
        visitStatus[node] = VISITED; // 标记节点为遍历完成
    }
    
    int main() {
        // 输入处理
        int N;
        cin >> N;
        cin.ignore(100, '\n'); // 忽略换行符及其后面的100个字符
    
        // 初始化边
        vector<vector<int>> edges(N);
        vector<VisitStatus> visitStatus(N, UNVISITED);
    
        bool stepAllGrids = true;
        string line;
        while(getline(cin, line)) {
            if(line.empty()) { // 读到空行，停止输入
                break;
            }
            int a, b;
            stringstream ss(line);
            ss >> a >> b; // 解析输入的两个数字
            edges[b].push_back(a); // 记录边
        }
    
        for(int i = 0; i < N && stepAllGrids; i++) { // 遍历所有节点
            if(visitStatus[i] == UNVISITED) { // 如果节点未被遍历
                dfs(i, visitStatus, edges, stepAllGrids); // 从该节点开始遍历
            }
        }
    
        cout << (stepAllGrids ? "yes" : "no") << endl; // 输出结果
    
        return 0;
    }
    

#### java

    
    
    import java.util.*;
    
    public class Main {
        enum VisitStatus { UNVISITED, VISITING, VISITED }; // 遍历状态
    
        public static void dfs(int node, List<VisitStatus> visitStatus, List<List<Integer>> edges, boolean[] stepAllGrids) {
            visitStatus.set(node, VisitStatus.VISITING); // 标记节点为正在遍历
    
            for(int neighbor : edges.get(node)) { // 遍历邻居节点
                if(visitStatus.get(neighbor) == VisitStatus.UNVISITED) { // 如果邻居节点未被遍历
                    dfs(neighbor, visitStatus, edges, stepAllGrids); // 递归遍历邻居节点
    
                    if(!stepAllGrids[0]) { // 如果已经无法跳完所有格子，直接返回
                        return;
                    }
                } else if(visitStatus.get(neighbor) == VisitStatus.VISITING) { // 如果邻居节点已被遍历但未完成遍历（即在当前遍历路径中）
                    stepAllGrids[0] = false; // 无法跳完所有格子，标志置为false
                    return;
                }
            }
    
            visitStatus.set(node, VisitStatus.VISITED); // 标记节点为遍历完成
        }
    
        public static void main(String[] args) {
            Scanner sc = new Scanner(System.in);
    
            // 输入处理
            int N = sc.nextInt();
            sc.nextLine(); // 忽略换行符
    
            // 初始化边
            List<List<Integer>> edges = new ArrayList<>();
            for(int i = 0; i < N; i++) {
                edges.add(new ArrayList<>());
            }
            List<VisitStatus> visitStatus = new ArrayList<>(Collections.nCopies(N, VisitStatus.UNVISITED));
    
            boolean[] stepAllGrids = { true };
            while(sc.hasNextLine()) {
                String line = sc.nextLine();
                if(line.isEmpty()) { // 读到空行，停止输入
                    break;
                }
                String[] nums = line.split(" ");
                int a = Integer.parseInt(nums[0]);
                int b = Integer.parseInt(nums[1]);
                edges.get(b).add(a); // 记录边
            }
    
            for(int i = 0; i < N && stepAllGrids[0]; i++) { // 遍历所有节点
                if(visitStatus.get(i) == VisitStatus.UNVISITED) { // 如果节点未被遍历
                    dfs(i, visitStatus, edges, stepAllGrids); // 从该节点开始遍历
                }
            }
    
            System.out.println(stepAllGrids[0] ? "yes" : "no"); // 输出结果
        }
    }
    

#### javaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    let input = [];
    rl.on('line', function (line) {
        input.push(line);
    });
    
    rl.on('close', function () {
        const N = parseInt(input[0]);
        
        // 初始化边
        const edges = new Array(N).fill().map(() => []);
        const visitStatus = new Array(N).fill(0); // 初始值为0，即UNVISITED
    
        let stepAllGrids = true;
        for(let i = 1; i < input.length && stepAllGrids; i++) {
            const [a, b] = input[i].split(' ').map(Number);
            edges[b].push(a);
        }
    
        function dfs(node) {
            visitStatus[node] = 1; // 标记节点为正在遍历
    
            for(let neighbor of edges[node]) { // 遍历邻居节点
                if(visitStatus[neighbor] === 0) { // 如果邻居节点未被遍历
                    dfs(neighbor); // 递归遍历邻居节点
    
                    if(!stepAllGrids) { // 如果已经无法跳完所有格子，直接返回
                        return;
                    }
                } else if(visitStatus[neighbor] === 1) { // 如果邻居节点已被遍历但未完成遍历（即在当前遍历路径中）
                    stepAllGrids = false; // 无法跳完所有格子，标志置为false
                    return;
                }
            }
    
            visitStatus[node] = 2; // 标记节点为遍历完成
        }
    
        for(let i = 0; i < N && stepAllGrids; i++) {
            if(visitStatus[i] === 0) { // 如果节点未被遍历
                dfs(i); // 从该节点开始遍历
            }
        }
    
        console.log(stepAllGrids ? "yes" : "no"); // 输出结果
    });
    

#### python

    
    
    import sys
    
    input = []
    for line in sys.stdin:
        input.append(line.strip())
    
    N = int(input[0])
    
    # 初始化边
    edges = [[] for _ in range(N)]
    visitStatus = [0 for _ in range(N)] # 初始值为0，即UNVISITED
    
    stepAllGrids = True
    for i in range(1, len(input)):
        a, b = map(int, input[i].split())
        edges[b].append(a)
    
    def dfs(node):
        global stepAllGrids
        visitStatus[node] = 1 # 标记节点为正在遍历
    
        for neighbor in edges[node]: # 遍历邻居节点
            if visitStatus[neighbor] == 0: # 如果邻居节点未被遍历
                dfs(neighbor) # 递归遍历邻居节点
    
                if not stepAllGrids: # 如果已经无法跳完所有格子，直接返回
                    return
            elif visitStatus[neighbor] == 1: # 如果邻居节点已被遍历但未完成遍历（即在当前遍历路径中）
                stepAllGrids = False # 无法跳完所有格子，标志置为false
                return
    
        visitStatus[node] = 2 # 标记节点为遍历完成
    
    for i in range(N):
        if visitStatus[i] == 0: # 如果节点未被遍历
            dfs(i) # 从该节点开始遍历
    
    print("yes" if stepAllGrids else "no") # 输出结果
    

#### 文章目录

  *     *       * 题目描述
      * 输入描述
      * 输出描述
      * 用例
      * C++
      * java
      * javaScript
      * python

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

