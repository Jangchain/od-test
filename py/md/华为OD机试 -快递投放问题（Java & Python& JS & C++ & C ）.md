## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

有N个快递站点用字符串标识，某些站点之间有道路连接。
每个站点有一些包裹要运输，每个站点间的包裹不重复，路上有检查站会导致部分货物无法通行，计算哪些货物无法正常投递？

## 输入描述

  * 第一行输入M N，M个包裹N个道路信息.
  * 后面M行分别输入包裹名、包裹起点、包裹终点
  * 后面N行分别表示两个站点之间不能通过的包裹名。检查站禁止通行的包裹如果有多个以空格分开
  * 检查站禁止通行的包裹如果有多个以空格分开、
  * 0<=M,N<=100

## 输出描述

  * 输出不能送达的包裹，如：package2 package4，
  * 如果所有包裹都可以送达则输出：none，
  * 输出结果按照升序排列。

## 示例1

输入

    
    
    4 2
    package1 A C
    package2 A C
    package3 B C
    package4 A C
    A B package1
    A C package2
    

输出

    
    
    package2
    

说明

> > ## 解题思路

我的理解：

前M行是货物需要走的路径。

包裹1 需要走A-C

包裹2 需要走A-C

包裹3 需要走B-C

包裹4 需要走A-C

但是现在

A-B之间不允许出现包裹1

A-C之间不允许出现包裹2

**根据用例中的输出结果，我们可以得到每条路是独立的，不会出现A-B-C这样的路。**

不然的话，包裹2 可以通过A-B-C 运输。

## Java

    
    
    import java.util.*;
    
    public class Main {
        public static void main(String[] args) {
            Scanner in = new Scanner(System.in);
            Integer[] tmp =
                Arrays.stream(in.nextLine().split(" ")).map(Integer::parseInt).toArray(Integer[]::new);
            int m = tmp[0];
            int n = tmp[1];
    
    
            // 存储包裹的起点和终点信息
            Map<String, String[]> pkgRoutes = new HashMap<>();
            for (int i = 0; i < m; i++) {
                String[] pkgInfo = in.nextLine().split(" ");
                pkgRoutes.put(pkgInfo[0], new String[]{pkgInfo[1], pkgInfo[2]});
            }
    
            // 存储检查站禁止通行的包裹信息
            Map<String, Set<String>> restrictedRoutes = new HashMap<>();
            for (int i = 0; i < n; i++) {
                String[] restriction = in.nextLine().split(" ");
                String route = restriction[0] + "-" + restriction[1];
                restrictedRoutes.putIfAbsent(route, new HashSet<>());
                for (int j = 2; j < restriction.length; j++) {
                    restrictedRoutes.get(route).add(restriction[j]);
                }
            }
    
            // 结果存储无法送达的包裹
            List<String> undeliverables = new ArrayList<>();
            for (Map.Entry<String, String[]> entry : pkgRoutes.entrySet()) {
                String pkg = entry.getKey();
                String start = entry.getValue()[0];
                String end = entry.getValue()[1];
                String route = start + "-" + end;
    
                // 检查该包裹是否在该路线的禁止通行列表中
                if (restrictedRoutes.containsKey(route) && restrictedRoutes.get(route).contains(pkg)) {
                    undeliverables.add(pkg);
                }
            }
    
            // 输出结果
            if (undeliverables.isEmpty()) {
                System.out.println("none");
            } else {
                Collections.sort(undeliverables); // 按字典序排序
                System.out.println(String.join(" ", undeliverables));
            }
        }
    }
    

## Python

    
    
    # 导入所需的库
    import sys
    
    # 读取第一行数据，m 表示包裹数量，n 表示禁止通行规则数量
    m, n = map(int, input().split())
    
    # 存储包裹的起点和终点信息
    pkg_routes = {}
    for _ in range(m):
        pkg_info = input().split()  # 读取每行的包裹信息
        pkg_routes[pkg_info[0]] = (pkg_info[1], pkg_info[2])  # 将起点和终点作为包裹信息存储
    
    # 存储检查站禁止通行的包裹信息
    restricted_routes = {}
    for _ in range(n):
        restriction = input().split()  # 读取每行的禁止通行信息
        route = f"{restriction[0]}-{restriction[1]}"  # 构建路线标识符
        if route not in restricted_routes:
            restricted_routes[route] = set()  # 如果路线不存在，初始化为一个集合
        for pkg in restriction[2:]:
            restricted_routes[route].add(pkg)  # 将包裹添加到禁止通行集合中
    
    # 结果存储无法送达的包裹
    undeliverables = []
    for pkg, (start, end) in pkg_routes.items():
        route = f"{start}-{end}"  # 构建该包裹的路线标识符
        if route in restricted_routes and pkg in restricted_routes[route]:  # 检查该包裹是否在禁止通行列表
            undeliverables.append(pkg)  # 如果禁止通行，则添加到无法送达列表
    
    # 输出结果
    if not undeliverables:
        print("none")
    else:
        undeliverables.sort()  # 按字典序排序
        print(" ".join(undeliverables))  # 输出无法送达的包裹
    

## JavaScript

    
    
    const readline = require("readline");
    
    // 创建输入读取接口
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    // 定义读取数据的函数
    let inputLines = [];
    rl.on("line", (line) => {
        inputLines.push(line);
    });
    
    // 等待输入完毕后处理数据
    rl.on("close", () => {
        // 第一行解析包裹数量和禁止通行规则数量
        let [m, n] = inputLines[0].split(" ").map(Number);
        
        // 存储包裹的起点和终点信息
        let pkgRoutes = new Map();
        for (let i = 1; i <= m; i++) {
            let [pkg, start, end] = inputLines[i].split(" ");
            pkgRoutes.set(pkg, [start, end]);
        }
    
        // 存储检查站禁止通行的包裹信息
        let restrictedRoutes = new Map();
        for (let i = m + 1; i <= m + n; i++) {
            let restriction = inputLines[i].split(" ");
            let route = `${restriction[0]}-${restriction[1]}`;
            
            if (!restrictedRoutes.has(route)) {
                restrictedRoutes.set(route, new Set());
            }
            
            for (let j = 2; j < restriction.length; j++) {
                restrictedRoutes.get(route).add(restriction[j]);
            }
        }
    
        // 结果存储无法送达的包裹
        let undeliverables = [];
        for (let [pkg, [start, end]] of pkgRoutes.entries()) {
            let route = `${start}-${end}`;
            if (restrictedRoutes.has(route) && restrictedRoutes.get(route).has(pkg)) {
                undeliverables.push(pkg);
            }
        }
    
        // 输出结果
        if (undeliverables.length === 0) {
            console.log("none");
        } else {
            undeliverables.sort(); // 按字典序排序
            console.log(undeliverables.join(" ")); // 输出无法送达的包裹
        }
    });
    

## C++

    
    
    #include <iostream>
    #include <sstream>
    #include <vector>
    #include <map>
    #include <set>
    #include <algorithm>
    
    using namespace std;
    
    int main() {
        int m, n;
        cin >> m >> n;
        cin.ignore(); // 忽略换行符
    
        // 存储包裹的起点和终点信息
        map<string, pair<string, string>> pkgRoutes;
        for (int i = 0; i < m; i++) {
            string line;
            getline(cin, line);
            istringstream ss(line);
            string pkg, start, end;
            ss >> pkg >> start >> end;
            pkgRoutes[pkg] = {start, end};
        }
    
        // 存储检查站禁止通行的包裹信息
        map<string, set<string>> restrictedRoutes;
        for (int i = 0; i < n; i++) {
            string line;
            getline(cin, line);
            istringstream ss(line);
            string start, end, pkg;
            ss >> start >> end;
            string route = start + "-" + end;
    
            while (ss >> pkg) {
                restrictedRoutes[route].insert(pkg);
            }
        }
    
        // 结果存储无法送达的包裹
        vector<string> undeliverables;
        for (const auto& entry : pkgRoutes) {
            string pkg = entry.first;
            string start = entry.second.first;
            string end = entry.second.second;
            string route = start + "-" + end;
    
            // 检查该包裹是否在该路线的禁止通行列表中
            if (restrictedRoutes.count(route) && restrictedRoutes[route].count(pkg)) {
                undeliverables.push_back(pkg);
            }
        }
    
        // 输出结果
        if (undeliverables.empty()) {
            cout << "none" << endl;
        } else {
            sort(undeliverables.begin(), undeliverables.end()); // 按字典序排序
            for (const string& pkg : undeliverables) {
                cout << pkg << " ";
            }
            cout << endl;
        }
    
        return 0;
    }
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    #include <string.h>
    
    #define MAX_PKG 100
    #define MAX_ROUTE 100
    #define MAX_STR_LEN 50
    
    typedef struct {
        char pkg[MAX_STR_LEN];
        char start[MAX_STR_LEN];
        char end[MAX_STR_LEN];
    } Package;
    
    typedef struct {
        char route[MAX_STR_LEN];
        char restrictedPkgs[MAX_PKG][MAX_STR_LEN];
        int restrictedCount;
    } RouteRestriction;
    
    int compareStrings(const void *a, const void *b) {
        return strcmp((char *)a, (char *)b);
    }
    
    int main() {
        int m, n;
        scanf("%d %d", &m, &n);
        getchar(); // 忽略换行符
    
        // 存储包裹的起点和终点信息
        Package packages[MAX_PKG];
        for (int i = 0; i < m; i++) {
            scanf("%s %s %s", packages[i].pkg, packages[i].start, packages[i].end);
        }
    
        // 存储检查站禁止通行的包裹信息
        RouteRestriction routeRestrictions[MAX_ROUTE];
        int routeRestrictionCount = 0;
    
        for (int i = 0; i < n; i++) {
            char start[MAX_STR_LEN], end[MAX_STR_LEN];
            scanf("%s %s", start, end);
    
            char route[MAX_STR_LEN];
            snprintf(route, sizeof(route), "%s-%s", start, end);
    
            int found = -1;
            for (int j = 0; j < routeRestrictionCount; j++) {
                if (strcmp(routeRestrictions[j].route, route) == 0) {
                    found = j;
                    break;
                }
            }
    
            if (found == -1) {
                strcpy(routeRestrictions[routeRestrictionCount].route, route);
                routeRestrictions[routeRestrictionCount].restrictedCount = 0;
                found = routeRestrictionCount;
                routeRestrictionCount++;
            }
    
            char pkg[MAX_STR_LEN];
            while (scanf("%s", pkg) == 1 && getchar() != '\n') {
                strcpy(routeRestrictions[found].restrictedPkgs[routeRestrictions[found].restrictedCount++], pkg);
            }
        }
    
        // 结果存储无法送达的包裹
        char undeliverables[MAX_PKG][MAX_STR_LEN];
        int undeliverableCount = 0;
    
        for (int i = 0; i < m; i++) {
            char route[MAX_STR_LEN];
            snprintf(route, sizeof(route), "%s-%s", packages[i].start, packages[i].end);
    
            int found = -1;
            for (int j = 0; j < routeRestrictionCount; j++) {
                if (strcmp(routeRestrictions[j].route, route) == 0) {
                    found = j;
                    break;
                }
            }
    
            if (found != -1) {
                for (int j = 0; j < routeRestrictions[found].restrictedCount; j++) {
                    if (strcmp(routeRestrictions[found].restrictedPkgs[j], packages[i].pkg) == 0) {
                        strcpy(undeliverables[undeliverableCount++], packages[i].pkg);
                        break;
                    }
                }
            }
        }
    
        // 输出结果
        if (undeliverableCount == 0) {
            printf("none\n");
        } else {
            qsort(undeliverables, undeliverableCount, sizeof(undeliverables[0]), compareStrings);
            for (int i = 0; i < undeliverableCount; i++) {
                printf("%s ", undeliverables[i]);
            }
            printf("\n");
        }
    
        return 0;
    }
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/51fb84c70e90dd490feab8f30875fbd0.png)

