## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

总共有 n 个人在机房，每个人有一个标号（1<=标号<=n），他们分成了多个团队，需要你根据收到的 m 条消息判定指定的两个人是否在一个团队中，具体的：

  1. 消息构成为 a b c，整数 a、b 分别代表两个人的标号，整数 c 代表指令
  2. c == 0 代表 a 和 b 在一个团队内
  3. c == 1 代表需要判定 a 和 b 的关系，如果 a 和 b 是一个团队，输出一行’we are a team’,如果不是，输出一行’we are not a team’
  4. c 为其他值，或当前行 a 或 b 超出 1~n 的范围，输出‘da pian zi’

## 输入描述

  1. 第一行包含两个整数 n，m(1<=n,m<100000),分别表示有 n 个人和 m 条消息
  2. 随后的 m 行，每行一条消息，消息格式为：a b c(1<=a,b<=n,0<=c<=1)

## 输出描述

  1. c ==1,根据 a 和 b 是否在一个团队中输出一行字符串，在一个团队中输出‘we are a team‘,不在一个团队中输出’we are not a team’
  2. c 为其他值，或当前行 a 或 b 的标号小于 1 或者大于 n 时，输出字符串‘da pian zi‘
  3. 如果第一行 n 和 m 的值超出约定的范围时，输出字符串”Null“。

## 示例1

输入

    
    
    5 7
    1 2 0
    4 5 0
    2 3 0
    1 2 1
    2 3 1
    4 5 1
    1 5 1
    

输出

    
    
    We are a team
    We are a team
    We are a team
    We are not a team
    

说明

> ## 示例2

输入

    
    
    5 6
    1 2 0
    1 2 1
    1 5 0
    2 3 1
    2 5 1
    1 3 2
    

输出

    
    
    we are a team
    we are not a team
    we are a team
    da pian zi
    

说明

> ## 解题思路

题目要求判断给定的两个人是否在同一个团队中。、

输入包含 n 个人和 m 条消息。

每条消息包含 a、b 和 c，其中 a 和 b 是两个人的标号，c 是指令。

  * c == 0 表示 a 和 b 在同一个团队
  * c == 1 表示需要判断 a 和 b 是否在同一个团队。

### **示例解释：**

输入：

    
    
    5 7
    1 2 0
    4 5 0
    2 3 0
    1 2 1
    2 3 1
    4 5 1
    1 5 1
    

  1. 前三条消息表示： 
     * 1 和 2 在同一个团队
     * 4 和 5 在同一个团队
     * 2 和 3 在同一个团队
  2. 因此，团队关系如下： 
     * 团队1：1, 2, 3
     * 团队2：4, 5
  3. 接下来的四条消息要求判断两个人是否在同一个团队： 
     * 1 和 2：在同一个团队（团队1），输出 “We are a team”
     * 2 和 3：在同一个团队（团队1），输出 “We are a team”
     * 4 和 5：在同一个团队（团队2），输出 “We are a team”
     * 1 和 5：不在同一个团队，输出 “We are not a team”

## Java

    
    
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            // 读取输入，获取人数和消息数量
            Scanner sc = new Scanner(System.in);
            int numPeople = sc.nextInt();
            int numMessages = sc.nextInt();
    
            // 读取消息并存储到二维数组中
            int[][] messages = new int[numMessages][3];
            for (int i = 0; i < numMessages; i++) {
                messages[i][0] = sc.nextInt();
                messages[i][1] = sc.nextInt();
                messages[i][2] = sc.nextInt();
            }
    
            // 检查输入范围，如果超出范围则输出 "Null"
            if (numPeople < 1 || numPeople >= 100000 || numMessages < 1 || numMessages >= 100000) {
                System.out.println("Null");
                return;
            }
    
            // 初始化数组，用于存储每个人的团队信息
            int[] parent = new int[numPeople + 1];
            for (int i = 0; i < numPeople + 1; i++) parent[i] = i;
    
            // 遍历消息，根据指令处理团队关系
            for (int[] message : messages) {
                int personA = message[0], personB = message[1], command = message[2];
    
                // 检查输入范围，如果超出范围则输出 "da pian zi"
                if (personA < 1 || personA > numPeople || personB < 1 || personB > numPeople) {
                    System.out.println("da pian zi");
                    continue;
                }
    
                // 如果指令为 0，则合并 personA 和 personB 所在的团队
                if (command == 0) {
                    int rootA = find(personA, parent);
                    int rootB = find(personB, parent);
    
                    if (rootA != rootB) {
                        parent[rootB] = rootA;
                    }
                }
                // 如果指令为 1，则判断 personA 和 personB 是否在同一个团队
                else if (command == 1) {
                    System.out.println(find(personA, parent) == find(personB, parent) ? "We are a team" : "We are not a team");
                }
                // 如果指令为其他值，则输出 "da pian zi"
                else {
                    System.out.println("da pian zi");
                }
            }
        }
    
        // 查找节点，用于判断两个人是否在同一个团队
        public static int find(int x, int[] parent) {
            if (parent[x] != x) {
                return parent[x] = find(parent[x], parent);
            }
            return x;
        }
    }
    
    

## Python

    
    
    def find(x, parent):
        # 查找节点，用于判断两个人是否在同一个团队
        if parent[x] != x:
            parent[x] = find(parent[x], parent)
        return parent[x]
    
    
    # 读取输入，获取人数和消息数量
    num_people, num_messages = map(int, input().split())
    
    # 读取消息并存储到二维数组中
    messages = [list(map(int, input().split())) for _ in range(num_messages)]
    
    # 检查输入范围，如果超出范围则输出 "Null"
    if num_people < 1 or num_people >= 100000 or num_messages < 1 or num_messages >= 100000:
        print("Null")
    else:
        # 初始化数组，用于存储每个人的团队信息
        parent = list(range(num_people + 1))
    
        # 遍历消息，根据指令处理团队关系
        for message in messages:
            person_a, person_b, command = message
    
            # 检查输入范围，如果超出范围则输出 "da pian zi"
            if person_a < 1 or person_a > num_people or person_b < 1 or person_b > num_people:
                print("da pian zi")
                continue
    
            # 如果指令为 0，则合并 person_a 和 person_b 所在的团队
            if command == 0:
                root_a = find(person_a, parent)
                root_b = find(person_b, parent)
    
                if root_a != root_b:
                    parent[root_b] = root_a
            # 如果指令为 1，则判断 person_a 和 person_b 是否在同一个团队
            elif command == 1:
                print("We are a team" if find(person_a, parent) == find(person_b, parent) else "We are not a team")
            # 如果指令为其他值，则输出 "da pian zi"
            else:
                print("da pian zi")
    

## JavaScript

    
    
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    // 查找节点，用于判断两个人是否在同一个团队
    function find(x, parent) {
      if (parent[x] !== x) {
        parent[x] = find(parent[x], parent);
      }
      return parent[x];
    }
    
    let inputLines = [];
    rl.on('line', (input) => {
      inputLines.push(input);
    }).on('close', () => {
      const [numPeople, numMessages] = inputLines[0].split(' ').map(Number);
      const messages = inputLines.slice(1).map(line => line.split(' ').map(Number));
    
      // 检查输入范围，如果超出范围则输出 "Null"
      if (numPeople < 1 || numPeople >= 100000 || numMessages < 1 || numMessages >= 100000) {
        console.log('Null');
        return;
      }
    
      // 初始化数组，用于存储每个人的团队信息
      const parent = Array.from({ length: numPeople + 1 }, (_, i) => i);
    
      // 遍历消息，根据指令处理团队关系
      for (const message of messages) {
        const [personA, personB, command] = message;
    
        // 检查输入范围，如果超出范围则输出 "da pian zi"
        if (personA < 1 || personA > numPeople || personB < 1 || personB > numPeople) {
          console.log('da pian zi');
          continue;
        }
    
        // 如果指令为 0，则合并 personA 和 personB 所在的团队
        if (command === 0) {
          const rootA = find(personA, parent);
          const rootB = find(personB, parent);
    
          if (rootA !== rootB) {
            parent[rootB] = rootA;
          }
        }
        // 如果指令为 1，则判断 personA 和 personB 是否在同一个团队
        else if (command === 1) {
          console.log(find(personA, parent) === find(personB, parent) ? 'We are a team' : 'We are not a team');
        }
        // 如果指令为其他值，则输出 "da pian zi"
        else {
          console.log('da pian zi');
        }
      }
    });
    
    

## C++

    
    
    #include <iostream>
    #include <vector>
    
    // 查找节点，用于判断两个人是否在同一个团队
    int find(int x, std::vector<int> &parent) {
        if (parent[x] != x) {
            parent[x] = find(parent[x], parent);
        }
        return parent[x];
    }
    
    int main() {
        // 读取输入，获取人数和消息数量
        int numPeople, numMessages;
        std::cin >> numPeople >> numMessages;
    
        // 读取消息并存储到二维数组中
        std::vector<std::vector<int>> messages(numMessages, std::vector<int>(3));
        for (int i = 0; i < numMessages; i++) {
            std::cin >> messages[i][0] >> messages[i][1] >> messages[i][2];
        }
    
        // 检查输入范围，如果超出范围则输出 "Null"
        if (numPeople < 1 || numPeople >= 100000 || numMessages < 1 || numMessages >= 100000) {
            std::cout << "Null" << std::endl;
            return 0;
        }
    
        // 初始化数组，用于存储每个人的团队信息
        std::vector<int> parent(numPeople + 1);
        for (int i = 0; i < numPeople + 1; i++) parent[i] = i;
    
        // 遍历消息，根据指令处理团队关系
        for (const auto &message : messages) {
            int personA = message[0], personB = message[1], command = message[2];
    
            // 检查输入范围，如果超出范围则输出 "da pian zi"
            if (personA < 1 || personA > numPeople || personB < 1 || personB > numPeople) {
                std::cout << "da pian zi" << std::endl;
                continue;
            }
    
            // 如果指令为 0，则合并 personA 和 personB 所在的团队
            if (command == 0) {
                int rootA = find(personA, parent);
                int rootB = find(personB, parent);
    
                if (rootA != rootB) {
                    parent[rootB] = rootA;
                }
            }
            // 如果指令为 1，则判断 personA 和 personB 是否在同一个团队
            else if (command == 1) {
                std::cout << (find(personA, parent) == find(personB, parent) ? "We are a team" : "We are not a team") << std::endl;
            }
            // 如果指令为其他值，则输出 "da pian zi"
            else {
                std::cout << "da pian zi" << std::endl;
            }
        }
    
        return 0;
    }
    
    

## C语言

    
    
    #include <stdio.h>
    
    // 查找某个节点的根节点（使用路径压缩来优化查找）
    int find(int x, int parent[]) {
        if (parent[x] != x) {
            // 递归查找父节点并压缩路径
            parent[x] = find(parent[x], parent);
        }
        return parent[x];
    }
    
    int main() {
        int n, m;
    
        // 输入 n 和 m，表示人数和消息数
        if (scanf("%d %d", &n, &m) != 2) {
            // 输入读取错误
            printf("Null\n");
            return 0;
        }
    
        // 检查人数和消息数的合法性
        if (n < 1 || n >= 100000 || m < 1 || m >= 100000) {
            // 如果超出规定范围，输出 "Null"
            printf("Null\n");
            return 0;
        }
    
        // 初始化并查集数组，每个人初始为自己的团队
        int parent[n + 1];
        for (int i = 1; i <= n; i++) {
            parent[i] = i; // 初始时，每个人的父节点是自己
        }
    
        // 处理每条消息
        for (int i = 0; i < m; i++) {
            int a, b, c;
    
            // 读取消息 a, b, c
            if (scanf("%d %d %d", &a, &b, &c) != 3) {
                // 如果输入格式有误，忽略本条消息
                continue;
            }
    
            // 检查 a 和 b 是否在合法范围内
            if (a < 1 || a > n || b < 1 || b > n) {
                printf("da pian zi\n"); // 输入不合法，输出 "da pian zi"
                continue;
            }
    
            // 处理指令
            if (c == 0) {
                // 指令为 0，表示将 a 和 b 合并到同一个团队中
                int rootA = find(a, parent); // 查找 a 的根节点
                int rootB = find(b, parent); // 查找 b 的根节点
    
                // 如果 a 和 b 不在同一个团队，合并它们
                if (rootA != rootB) {
                    parent[rootB] = rootA; // 将 b 的根节点指向 a 的根节点
                }
            } else if (c == 1) {
                // 指令为 1，表示判断 a 和 b 是否在同一个团队
                if (find(a, parent) == find(b, parent)) {
                    printf("We are a team\n"); // a 和 b 在同一个团队
                } else {
                    printf("We are not a team\n"); // a 和 b 不在同一个团队
                }
            } else {
                // 其他不合法的指令
                printf("da pian zi\n");
            }
        }
    
        return 0;
    }
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b0d8ff6d53693bfcf6e1605b507f3ae3.png)

#### 完整用例

##### 用例1

    
    
    5 7
    1 2 0
    4 5 0
    2 3 0
    1 2 1
    2 3 1
    4 5 1
    1 5 1
    

##### 用例2

    
    
    5 6
    1 2 0
    1 2 1
    1 5 0
    2 3 1
    2 5 1
    1 3 2
    

##### 用例3

    
    
    5 3
    1 2 0
    2 3 0
    1 3 1
    

##### 用例4

    
    
    4 4
    1 2 0
    2 3 0
    3 4 0
    1 4 1
    

##### 用例5

    
    
    5 5
    1 2 0
    3 4 0
    2 3 0
    4 5 0
    1 5 1
    

##### 用例6

    
    
    5 3
    1 2 0
    2 3 0
    4 5 2
    

##### 用例7

    
    
    5 4
    1 2 0
    2 3 0
    1 3 1
    4 5 2
    

##### 用例8

    
    
    5 6
    1 2 0
    2 3 0
    3 4 0
    4 5 0
    1 5 1
    2 4 1
    

##### 用例9

    
    
    100000 2
    1 2 0
    1 3 0
    1 2 1
    

##### 用例10

    
    
    -1 2
    1 2 0
    1 3 0
    1 2 2
    

