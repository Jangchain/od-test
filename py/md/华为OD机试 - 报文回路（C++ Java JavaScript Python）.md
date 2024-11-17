#### 题目描述

IGMP 协议中响应报文和查询报文，是维系组播通路的两个重要报文，在一条已经建立的组播通路中两个相邻的 HOST 和 ROUTER，ROUTER 会给
HOST 发送查询报文，HOST 收到查询报文后给 ROUTER
回复一个响应报文，以维持相之间的关系，一旦这关系断裂，那么这条组播通路就异常”了。现通过某种手段，抓取到了 HOST 和 ROUTER
两者通讯的所有响应报文和查询报文，请分析该组播通路是否“正常”

#### 输入描述

第一行抓到的报文数量C (C≤100) ，后续C行依次输入设备节点D1和D2，表示从D1到D2发送了单向的报文，D1和D2用空格隔开。

#### 输出描述

组播通路是否“正常”，正常输出True， 异常输出False。

#### 用例1

输入

    
    
    5
    1 2
    2 3
    3 2
    1 2
    2 1
    

输出

    
    
    True
    

#### 用例2

输入

    
    
    3
    1 3
    3 2
    2 3
    

输出

    
    
    False
    

#### 代码思路

该题目要求判断给定的组播通路是否正常。根据题目描述，可以得到以下信息：

  1. 组播通路是由一条已经建立的通路中的相邻的HOST和ROUTER组成的。
  2. ROUTER会向HOST发送查询报文，HOST收到查询报文后会回复一个响应报文。
  3. 组播通路正常的条件是，对于通路中的每对相邻的HOST和ROUTER，HOST回复的响应报文中包含ROUTER发送的查询报文。

根据以上信息，可以得到以下解题思路：

  1. 首先，根据输入的报文数量和报文内容，构建一个 Map来表示通路中的节点和它们的相邻节点的关系。
  2. 对于每对相邻节点，判断对应的 Map中是否包含它们的关系，即判断对于节点A和节点B，节点A的相邻节点中是否包含节点B，以及节点B的相邻节点中是否包含节点A。
  3. 如果存在任意一对相邻节点，其中一个节点的相邻节点中不包含另一个节点，则说明组播通路异常，返回False；否则，返回True。

#### 机考代码查重

华为OD机考完成之后，官方会进行代码查重。**华为 od 机考确实有很大的概率抽到原题**
。如果碰到了题库中的原题，一定不要直接使用题解中的代码，尤其是变量名，一定要修改，可以改成毫无意义的单词。除了变量名之外，代码的组织结构和逻辑一定要进行改变，这就要求在日常的刷题中，提前编写好属于自己的代码。

#### C++

    
    
    #include <iostream>
    using namespace std;
    
    int main() {
        int num;
        cin >> num; // 输入报文数量
    
        bool routes[101][101] = {}; // 邻接矩阵，初始值为false
    
        // 输入每一条报文的源节点和目标节点，并将其添加到邻接矩阵中
        for (int i = 0; i < num; i++) {
            int source, destination;
            cin >> source >> destination;
            routes[source][destination] = true;
        }
    
        // 遍历邻接矩阵，检查每一个节点的邻接节点是否存在对应的反向连接
        for (int i = 1; i <= 100; i++) {
            for (int j = 1; j <= 100; j++) {
                // 如果邻接节点的反向连接不存在，则说明组播通路异常，输出False并结束程序
                if (routes[i][j] && !routes[j][i]) {
                    cout << "False" << endl;
                    return 0;
                }
            }
        }
    
        // 如果所有节点的邻接节点的反向连接都存在，则说明组播通路正常，输出True
        cout << "True" << endl;
    
        return 0;
    }
    

#### Java

    
    
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            int num = scanner.nextInt(); // 输入报文数量
    
            boolean[][] routes = new boolean[101][101]; // 邻接矩阵，初始值为false
    
            // 输入每一条报文的源节点和目标节点，并将其添加到邻接矩阵中
            for (int i = 0; i < num; i++) {
                int source = scanner.nextInt();
                int destination = scanner.nextInt();
                routes[source][destination] = true;
            }
    
            // 遍历邻接矩阵，检查每一个节点的邻接节点是否存在对应的反向连接
            for (int i = 1; i <= 100; i++) {
                for (int j = 1; j <= 100; j++) {
                    // 如果邻接节点的反向连接不存在，则说明组播通路异常，输出False并结束程序
                    if (routes[i][j] && !routes[j][i]) {
                        System.out.println("False");
                        return;
                    }
                }
            }
    
            // 如果所有节点的邻接节点的反向连接都存在，则说明组播通路正常，输出True
            System.out.println("True");
        }
    }
    
    

#### Python

    
    
    num = int(input()) # 输入报文数量
    
    routes = [[False]*101 for _ in range(101)] # 邻接矩阵，初始值为false
    
    # 输入每一条报文的源节点和目标节点，并将其添加到邻接矩阵中
    for _ in range(num):
        source, destination = map(int, input().split())
        routes[source][destination] = True
    
    # 遍历邻接矩阵，检查每一个节点的邻接节点是否存在对应的反向连接
    for i in range(1, 101):
        for j in range(1, 101):
            # 如果邻接节点的反向连接不存在，则说明组播通路异常，输出False并结束程序
            if routes[i][j] and not routes[j][i]:
                print("False")
                exit()
    
    # 如果所有节点的邻接节点的反向连接都存在，则说明组播通路正常，输出True
    print("True")
    

#### JavaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    let num;
    let routes = new Array(101).fill(0).map(() => new Array(101).fill(false));
    
    rl.on('line', (line) => {
      if (!num) {
        num = parseInt(line);
        return;
      }
      const [source, destination] = line.split(' ').map(Number);
      routes[source][destination] = true;
    }).on('close', () => {
      for (let i = 1; i <= 100; i++) {
        for (let j = 1; j <= 100; j++) {
          if (routes[i][j] && !routes[j][i]) {
            console.log("False");
            return;
          }
        }
      }
      console.log("True");
    });
    

> #### 文章目录
>
>   *     *       * 题目描述
>       * 输入描述
>       * 输出描述
>       * 用例1
>       * 用例2
>       * 代码思路
>       * 机考代码查重
>       * C++
>       * Java
>       * Python
>       * JavaScript
>       * 完整用例
>       *         * 用例1
>         * 用例2
>         * 用例3
>         * 用例4
>         * 用例5
>         * 用例6
>         * 用例7
>         * 用例8
>         * 用例9
>         * 用例10
>

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

#### 完整用例

##### 用例1

    
    
    5
    1 2
    2 3
    3 2
    1 2
    2 1
    

##### 用例2

    
    
    3
    1 3
    3 2
    2 3
    

##### 用例3

    
    
    4
    1 2
    2 3
    3 4
    4 5
    

##### 用例4

    
    
    2
    1 2
    2 3
    

##### 用例5

    
    
    1
    1 2
    

##### 用例6

    
    
    10
    1 2
    2 3
    3 4
    4 5
    5 6
    6 7
    7 8
    8 9
    9 10
    10 1
    

##### 用例7

    
    
    6
    1 2
    2 3
    3 4
    4 5
    5 6
    6 1
    

##### 用例8

    
    
    7
    1 2
    2 3
    3 4
    4 5
    5 6
    6 7
    7 2
    

##### 用例9

    
    
    4
    1 2
    2 3
    3 4
    4 1
    

##### 用例10

    
    
    8
    1 2
    2 3
    3 4
    4 5
    5 6
    6 7
    7 8
    8 1
    

