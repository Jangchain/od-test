## 题目描述

某个开源社区希望将最近热度比较高的开源项目出一个榜单，推荐给社区里面的开发者。对于每个开源项目，开发者可以进行关注(watch)、收藏(star)、fork、提issue、提交合并请求(MR)等。

数据库里面统计了每个开源项目关注、收藏、fork、issue、MR的数量，开源项目的热度根据这5个维度的加权求和进行排序。

    
    
    H = (Wwatch * #watch) + (Wstar * #star) + (Wfork * #fork) +  (Wissue * #issue) + (Wmr * #mr)
    

H表示热度值

Wwatch、Wstar、Wfork、Wissue、Wmr分别表示5个统计维度的权重。

#watch、#star、#fork、#issue、#mr分别表示5个统计维度的统计值。

榜单按照热度值降序排序，对于热度值相等的，按照项目名字转换为全小写字母后的字典序排序（‘a’,‘b’,‘c’,…,‘x’,‘y’,‘z’)。

## 输入描述

第一行输入为N，表示开源项目的个数，0 ＜ N ＜100。

第二行输入为权重值列表，一共 5 个整型值，分别对应关注、收藏、fork、issue、MR的权重，权重取值 0 < W ≤ 50。

第三行开始接下来的 N 行为开源项目的统计维度，每一行的格式为：

    
    
    name nr_watch nr_start nr_fork nr_issue nr_mr
    

其中 name 为开源项目的名字，由英文字母组成，长度 ≤ 50，其余 5 个整型值分别为该开源项目关注、收藏、fork、issue、MR的数量，数量取值
0 < nr ≤ 1000。

## 输出描述

按照热度降序，输出开源项目的名字，对于热度值相等的，按照项目名字转换为全小写后的字典序排序（‘a’ > ‘b’ > ‘c’ > … > ‘x’ > ‘y’
> ‘z’）。

## 用例1

输入

    
    
    4
    8 6 2 8 6
    camila 66 70 46 158 80
    victoria 94 76 86 189 211
    anthony 29 17 83 21 48
    emily 53 97 1 19 218
    

输出

    
    
    victoria
    camila
    emily
    anthony
    

说明

> 排序热度值计算：  
>  camila: 66*8 + 70*6 + 46*2 + 158*8 + 80*6 = 2784  
>  victoria: 94*8 + 76*6 + 86*2 + 189*8 + 211*6 = 4158  
>  anthony: 29*8 + 17*6 + 83*2 + 21*8 + 48*6 = 956  
>  emily: 53*8 + 97*6 + 1*2 + 19*8 + 218*6 = 2468

## 用例2

输入

    
    
    5
    5 6 6 1 2
    camila 13 88 46 26 169
    grace 64 38 87 23 103
    lucas 91 79 98 154 79
    leo 29 27 36 43 178
    ava 29 27 36 43 178
    

输出

    
    
    lucas
    grace
    camila
    ava
    leo
    

说明

> 排序热度值计算：  
>  camila: 13*5 + 88*6 + 46*6 + 26*1 + 169*2 = 1233  
>  grace: 64*5 + 38*6 + 87*6 + 23*1 + 103*2 = 1299  
>  lucas: 91*5 + 79*6 + 98*6 + 154*1 + 79*2 = 1829  
>  leo: 29*5 + 27*6 + 36*6 + 43*1 + 178*2 = 922  
>  ava: 29*5 + 27*6 + 36*6 + 43*1 + 178*2 = 922

## 解题思路

  2. 读取其名称和评分。然后，我们使用权重和评分来计算项目的"热度"。这是通过将每个评分与其对应的权重相乘，然后将所有的乘积相加来完成的。

  3. 排序首先是根据热度进行的，热度高的项目排在前面。如果两个项目的热度相同，那么我们就根据项目名称进行排序，名称按字母顺序排列。

## C++

    
    
    #include <iostream>
    #include <vector>
    #include <algorithm>
    #include <string>
    
    using namespace std;
    
    // 定义一个结构体来存储项目的名称和热度
    struct Project {
        string name;
        int hotness;
    };
    
    // 自定义比较函数，用于排序
    bool compare(Project a, Project b) {
        if (a.hotness != b.hotness) {
            return a.hotness > b.hotness; // 热度高的项目排在前面
        } else {
            return a.name < b.name; // 名称相同的项目按字母顺序排列
        }
    }
    
    int main() {
        int n;
        cin >> n;
    
        vector<int> weights(5);
        for (int i = 0; i < 5; i++) {
            cin >> weights[i]; // 读取每个权重并存储到数组中
        }
    
        vector<Project> projects(n);
        for (int i = 0; i < n; i++) {
            cin >> projects[i].name; // 存储项目名称
    
            int hot = 0;
            for (int j = 0; j < 5; j++) {
                int score;
                cin >> score;
                hot += score * weights[j]; // 计算热度
            }
            projects[i].hotness = hot;
        }
    
        sort(projects.begin(), projects.end(), compare); // 使用自定义比较函数进行排序
    
        for (Project project : projects) {
            cout << project.name << endl; // 打印项目名称
        }
    
        return 0;
    }
    

## Java

    
    
    import java.util.Arrays;
    import java.util.Comparator;
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            // 创建Scanner对象用于获取用户输入
            Scanner sc = new Scanner(System.in);
    
            // 读取项目数量n
            int n = sc.nextInt();
    
            // 创建并填充权重数组weights
            int[] weights = new int[5];
            for (int i = 0; i < 5; i++) {
                weights[i] = sc.nextInt(); // 读取每个权重并存储到数组中
            }
    
            // 创建一个二维数组projects来存储项目的名称和热度值
            // 其中projects[i][0]存储项目名称，projects[i][1]存储项目热度
            String[][] projects = new String[n][2];
    
            // 读取项目信息并计算每个项目的热度
            for (int i = 0; i < n; i++) {
                projects[i][0] = sc.next(); // 存储项目名称
    
                int hot = 0; // 初始化项目热度为0
                // 读取项目的5个评分并计算热度
                for (int j = 0; j < 5; j++) {
                    hot += sc.nextInt() * weights[j]; // 计算热度
                }
                projects[i][1] = String.valueOf(hot); // 将热度值转换为字符串并存储
            }
    
            // 使用自定义比较器对项目数组进行排序
            Arrays.sort(projects, new Comparator<String[]>() {
                @Override
                public int compare(String[] a, String[] b) {
                    // 解析字符串热度为整数
                    int hotA = Integer.parseInt(a[1]);
                    int hotB = Integer.parseInt(b[1]);
                    // 首先根据热度值降序排序
                    if (hotA != hotB) {
                        return hotB - hotA; // 热度高的项目排在前面
                    } else {
                        // 如果热度相同，则根据项目名称字母顺序升序排序
                        return a[0].toLowerCase().compareTo(b[0].toLowerCase()); // 名称相同的项目按字母顺序排列
                    }
                }
            });
    
            // 遍历排序后的项目数组并打印项目名称
            for (String[] project : projects) {
                System.out.println(project[0]); // 打印项目名称
            }
    
            // 关闭Scanner对象，释放资源
            sc.close();
        }
    }
    

## javaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    // 创建一个数组用于存储用户的输入
    let input = [];
    // 当接收到一行输入时，将其去除首尾空格后添加到input数组中
    rl.on('line', (line) => {
        input.push(line.trim());
    }).on('close', () => { // 当输入结束时，执行以下代码
        // 读取项目数量n
        const n = parseInt(input[0]);
        // 读取权重数组，将其转换为数字数组
        const weights = input[1].split(' ').map(Number);
    
        // 创建一个数组用于存储项目信息
        let projects = [];
        // 读取每个项目的信息
        for (let i = 2; i < 2 + n; i++) {
            // 将项目信息分割为名称和评分数组
            const project = input[i].split(' ');
            const name = project[0];
            const scores = project.slice(1).map(Number);
    
            // 计算项目的热度
            let hotness = 0;
            for (let j = 0; j < 5; j++) {
                hotness += scores[j] * weights[j];
            }
    
            // 将项目的名称和热度添加到projects数组中
            projects.push({ name, hotness });
        }
    
        // 对项目数组进行排序，首先根据热度降序排序，如果热度相同则根据名称升序排序
        projects.sort((a, b) => {
            if (a.hotness !== b.hotness) {
                return b.hotness - a.hotness;
            } else {
                return a.name.localeCompare(b.name);
            }
        });
    
        // 遍历排序后的项目数组并打印项目名称
        for (let project of projects) {
            console.log(project.name);
        }
    });
    

## Python

    
    
    # 读取第一行输入，转换为整数，表示项目的数量
    n = int(input())
    # 读取第二行输入，分割字符串并将每个元素转换为整数，得到权重列表
    weights = list(map(int, input().split()))
    
    # 初始化一个空列表，用于存储项目的名称和计算出的热度
    projects = []
    # 循环n次，对应于n个项目
    for _ in range(n):
        # 读取每个项目的输入，分割字符串得到项目名称和评分
        project = input().split()
        name = project[0]  # 第一个元素是项目名称
        scores = list(map(int, project[1:]))  # 剩余元素是项目的评分，转换为整数列表
    
        # 使用列表推导式和zip函数计算项目的热度
        # zip函数将评分和权重配对，列表推导式计算乘积并求和
        hotness = sum(score * weight for score, weight in zip(scores, weights))
    
        # 将项目名称和热度作为元组添加到projects列表中
        projects.append((name, hotness))
    
    # 对projects列表进行排序
    # 使用lambda函数作为排序的关键字，首先根据热度降序(-x[1])排序，
    # 如果热度相同，则根据项目名称升序(x[0])排序
    projects.sort(key=lambda x: (-x[1], x[0]))
    
    # 遍历排序后的项目列表
    for project in projects:
        print(project[0])  # 打印每个项目的名称
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    #include <string.h>
    
    // 定义一个结构体来存储项目的名称和热度
    typedef struct {
        char name[51];  
        int hotness;
    } Project;
    
    // 自定义比较函数，用于排序
    int compare(const void *a, const void *b) {
        Project *projectA = (Project *)a;
        Project *projectB = (Project *)b;
        if (projectA->hotness != projectB->hotness) {
            return projectB->hotness - projectA->hotness; // 热度高的项目排在前面
        } else {
            return strcmp(projectA->name, projectB->name); // 名称相同的项目按字母顺序排列
        }
    }
    
    int main() {
        int n;
        scanf("%d", &n);
    
        int weights[5];
        for (int i = 0; i < 5; i++) {
            scanf("%d", &weights[i]); // 读取每个权重
        }
    
        Project projects[n];
        for (int i = 0; i < n; i++) {
            scanf("%s", projects[i].name); // 存储项目名称
    
            int hot = 0;
            for (int j = 0; j < 5; j++) {
                int score;
                scanf("%d", &score);
                hot += score * weights[j]; // 计算热度
            }
            projects[i].hotness = hot;
        }
    
        qsort(projects, n, sizeof(Project), compare); // 使用自定义比较函数进行排序
    
        for (int i = 0; i < n; i++) {
            printf("%s\n", projects[i].name); // 打印项目名称
        }
    
        return 0;
    }
    

## 完整用例

### 用例1

    
    
    3
    10 20 30 40 50
    Alpha 10 20 30 40 50
    Beta 20 30 10 50 40
    Gamma 20 10 40 30 50
    

### 用例2

    
    
    4
    5 5 5 5 5
    ProjectX 100 200 300 400 500
    ProjectY 500 400 300 200 100
    ProjectZ 250 250 250 250 250
    Delta 300 400 200 100 500
    

### 用例3

    
    
    6
    1 1 1 1 1
    RepoA 1 2 3 4 5
    RepoB 5 4 3 2 1
    RepoC 2 3 4 5 6
    RepoD 6 5 4 3 2
    RepoE 3 3 3 3 3
    RepoF 4 4 4 4 4
    

### 用例4

    
    
    5
    15 25 35 20 10
    LibOne 10 10 10 10 10
    LibTwo 20 20 20 20 20
    LibThree 5 5 5 5 5
    LibFour 15 15 15 15 15
    LibFive 25 25 25 25 25
    

### 用例5

    
    
    3
    50 40 30 20 10
    ModuleA 50 40 30 20 10
    ModuleB 40 30 20 10 50
    ModuleC 10 20 30 40 50
    

### 用例6

    
    
    4
    7 8 9 10 11
    ToolX 9 8 7 6 5
    ToolY 5 6 7 8 9
    ToolZ 8 9 10 11 12
    ToolA 12 11 10 9 8
    

### 用例7

    
    
    2
    50 1 50 1 50
    CodeBase 100 100 100 100 100
    CodePeak 100 100 100 100 100
    

### 用例8

    
    
    7
    10 20 30 40 50
    Query 1 2 3 4 5
    Search 2 3 4 5 1
    Find 3 4 5 1 2
    Locate 4 5 1 2 3
    Discover 5 1 2 3 4
    Explore 1 3 5 2 4
    Investigate 2 4 1 3 5
    

### 用例9

    
    
    5
    8 6 4 2 1
    FrameworkA 88 77 66 55 44
    FrameworkB 77 88 99 11 22
    FrameworkC 66 55 44 33 11
    FrameworkD 55 44 33 22 11
    FrameworkE 44 33 22 11 99
    

### 用例10

    
    
    6
    45 35 25 15 5
    PackageOne 10 9 8 7 6
    PackageTwo 9 8 7 6 5
    PackageThree 8 7 6 5 4
    PackageFour 7 6 5 4 3
    PackageFive 6 5 4 3 2
    PackageSix 5 4 3 2 1
    

#### 文章目录

  * 题目描述
  * 输入描述
  * 输出描述
  * 用例1
  * 用例2
  * 解题思路
  * C++
  * Java
  * javaScript
  * Python
  * C语言
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

![fengmian](https://i-blog.csdnimg.cn/blog_migrate/822aedfb7d6c1ab842a4bae2cd6cf4cb.png)

