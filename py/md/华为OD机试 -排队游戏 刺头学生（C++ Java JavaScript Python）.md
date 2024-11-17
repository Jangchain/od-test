#### 题目描述

新来的老师给班里的同学排一个队。

每个学生有一个影力值。

一些学生是刺头，不会听老师的话，自己选位置，非刺头同学在剩下的位置按照能力值从小到大排。

对于非刺头同学，如果发现他前面有能力值比自己高的同学，他不满程度就增加，增加的数量等于前面能力值比他大的同学的个数。

刺头不会产生不满。

如果整个班级累计的不满程度超过k，那么老师就没有办法教这个班级了。

#### 输入描述

输入有三行：

第一行为n,m,k,空格隔开，分别表示班级总人数，刺头人数，最大不满程度k。

第二行为刺头所在位置(从0开始，即排队数组的下标，比如1代表队伍中第2个同学是刺头)，位置的数组也是排序的。

第三行有n个数，空格隔开，表示老师排好的队中每个人的能力值，其中非刺头同学一定按照能力值从小到大排好序的。

#### 输出描述

0 表示老师可以继续教这个班级

1 表示老师无法继续教这个班级

#### 备注

  * n 范围是[1,100000]
  * m 范围是 [1,n]
  * k 范国是[1,1000000000]
  * 每位同学的能力值范围是[1000,100000]

#### 用例

输入| 4 2 3  
0 1  
1810 1809 1801 1802  
---|---  
输出| 1  
说明| 刺头在0,1位置，2号同学不满程度2(前面两个刺头能力值都比他大)，3号同学不满程度2，总不满程度4，大于3。输出不能教这班(1)。  
输入| 4 2 4  
0 1  
1810 1809 1801 1802  
---|---  
输出| 0  
说明| 同前，4不大于4，输出能教这个班 (0)  
  
#### 解题思路：

解题思路：

  1. 首先，从输入中解析出总人数、刺头人数、最大不满程度、刺头位置和每个同学的能力值。
  2. 初始化一个布尔数组，用于标记刺头同学的位置。
  3. 初始化一个变量用于存储总的不满程度，以及一个集合用于存储刺头同学的能力值。
  4. 遍历所有同学的能力值，对于刺头同学，将其能力值添加到刺头能力值集合中；对于非刺头同学，计算其不满程度，即刺头能力值集合中小于等于该同学能力值的个数。
  5. 最后，判断总的不满程度是否超过最大不满程度，如果超过则输出1，表示老师无法教这个班级；否则输出0，表示老师可以继续教这个班级。

#### java

    
    
    import java.util.Scanner;
    import java.util.TreeSet;
    
    public class Main {
    
       public static void main(String[] args) {
           Scanner sc = new Scanner(System.in);
    
           // 读取班级总人数，刺头人数和最大不满程度
           int totalStudents = sc.nextInt();
           int numPricks = sc.nextInt();
           int maxUnhappiness = sc.nextInt();
    
           // 存储刺头同学的位置
           boolean[] isPrick = new boolean[totalStudents];
           for (int i = 0; i < numPricks; i++) {
               isPrick[sc.nextInt()] = true;
           }
    
           // 初始化不满程度和刺头同学能力值列表
           int unhappiness = 0;
           TreeSet<Integer> prickAbilities = new TreeSet<>();
    
           // 获取所有同学能力值
           for (int i = 0; i < totalStudents; i++) {
               int ability = sc.nextInt();
               // 如果是刺头学生，则放到刺头列表中去
               if (isPrick[i]) {
                   prickAbilities.add(ability);
               } else {
                   // 如果不是刺头，计算不满程度，
                   // 获取 prickAbilities 集合中小于等于 ability 的元素个数
                   int numGreater = prickAbilities.headSet(ability, true).size();
                   // 总数减去小于他的就是不满程度
                   unhappiness += prickAbilities.size() - numGreater;
               }
           }
    
           // 输出结果：如果不满程度超过最大值，则输出1，否则输出0
           System.out.println(unhappiness > maxUnhappiness ? 1 : 0);
       }
    }
    
    
    

#### C++

    
    
    #include <iostream>
    #include <vector>
    #include <set>
    #include <algorithm>
    
    int main() {
        // 从控制台读取输入
        int total_students, num_pricks, max_unhappiness;
        std::cin >> total_students >> num_pricks >> max_unhappiness;
    
        std::vector<int> prick_positions(num_pricks);
        for (int i = 0; i < num_pricks; ++i) {
            std::cin >> prick_positions[i];
        }
    
        std::vector<int> abilities(total_students);
        for (int i = 0; i < total_students; ++i) {
            std::cin >> abilities[i];
        }
    
        // 存储刺头同学的位置
        std::vector<bool> is_prick(total_students, false);
        for (int position : prick_positions) {
            is_prick[position] = true;
        }
    
        // 初始化不满程度和刺头同学能力值列表
        int unhappiness = 0;
        std::set<int> prick_abilities;
    
        // 获取所有同学能力值
        for (int i = 0; i < total_students; ++i) {
            int ability = abilities[i];
            // 如果是刺头学生，则放到刺头列表中去
            if (is_prick[i]) {
                prick_abilities.insert(ability);
            } else {
                // 如果不是刺头，计算不满程度
                int num_greater = std::distance(prick_abilities.lower_bound(ability), prick_abilities.end());
                // 总数减去小于他的就是不满程度
                unhappiness += num_greater;
            }
        }
    
        // 输出结果：如果不满程度超过最大值，则输出1，否则输出0
        std::cout << (unhappiness > max_unhappiness ? 1 : 0) << std::endl;
    
        return 0;
    }
    
    
    

#### python

    
    
    import sys
    
    # 从控制台读取输入
    input_lines = sys.stdin.readlines()
    
    # 解析输入
    total_students, num_pricks, max_unhappiness = map(int, input_lines[0].strip().split())
    prick_positions = list(map(int, input_lines[1].strip().split()))
    abilities = list(map(int, input_lines[2].strip().split()))
    
    # 存储刺头同学的位置
    is_prick = [False] * total_students
    for position in prick_positions:
        is_prick[position] = True
    
    # 初始化不满程度和刺头同学能力值列表
    unhappiness = 0
    prick_abilities = set()
    
    # 获取所有同学能力值
    for i in range(total_students):
        ability = abilities[i]
        # 如果是刺头学生，则放到刺头列表中去
        if is_prick[i]:
            prick_abilities.add(ability)
        else:
            # 如果不是刺头，计算不满程度
            num_greater = len([x for x in prick_abilities if x <= ability])
            # 总数减去小于他的就是不满程度
            unhappiness += len(prick_abilities) - num_greater
    
    # 输出结果：如果不满程度超过最大值，则输出1，否则输出0
    print(1 if unhappiness > max_unhappiness else 0)
    
    

#### javaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    // 从控制台读取输入
    rl.on('line', (input) => {
        const [totalStudents, numPricks, maxUnhappiness] = input.split(' ').map(Number);
    
        rl.on('line', (prickPositionsInput) => {
            const prickPositions = prickPositionsInput.split(' ').map(Number);
    
            // 存储刺头同学的位置
            const isPrick = new Array(totalStudents).fill(false);
            prickPositions.forEach((position) => {
                isPrick[position] = true;
            });
    
            rl.on('line', (abilitiesInput) => {
                const abilities = abilitiesInput.split(' ').map(Number);
    
                // 初始化不满程度和刺头同学能力值列表
                let unhappiness = 0;
                const prickAbilities = new Set();
    
                // 获取所有同学能力值
                for (let i = 0; i < totalStudents; i++) {
                    const ability = abilities[i];
                    // 如果是刺头学生，则放到刺头列表中去
                    if (isPrick[i]) {
                        prickAbilities.add(ability);
                    } else {
                        // 如果不是刺头，计算不满程度
                        const numGreater = Array.from(prickAbilities).filter((x) => x <= ability).length;
                        // 总数减去小于他的就是不满程度
                        unhappiness += prickAbilities.size - numGreater;
                    }
                }
    
                // 输出结果：如果不满程度超过最大值，则输出1，否则输出0
                console.log(unhappiness > maxUnhappiness ? 1 : 0);
    
                rl.close();
            });
        });
    });
    
    

#### 文章目录

  *     *       * 题目描述
      * 输入描述
      * 输出描述
      * 备注
      * 用例
      * 解题思路：
      * java
      * C++
      * python
      * javaScript
      * 完整用例
      *         * 用例1
        * 用例2
        * 用例3
        * 用例4
        * 用例5
        * 用例6
        * 用例7
        * 用例8
        * 用例9
        * 用例10
      * 完整用

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

#### 完整用例

##### 用例1

    
    
    5 2 3
    0 3
    1000 2000 3000 4000 5000
    

##### 用例2

    
    
    5 2 1
    0 3
    1000 2000 3000 4000 5000
    

##### 用例3

    
    
    4 1 2
    1
    1000 2000 3000 4000
    

##### 用例4

    
    
    4 1 1
    1
    1000 2000 3000 4000
    

##### 用例5

    
    
    1 1 1
    0
    2
    

##### 用例6

    
    
    10 3 10
    1 3 5
    1 1 1 1 1 1 1 1 1 1
    

##### 用例7

    
    
    4 2 3
    0 1
    1810 1809 1801 1802
    

##### 用例8

    
    
    4 2 4
    0 1
    1810 1809 1801 1802
    

##### 用例9

    
    
    5 1 2
    0
    1801 1802 1803 1804 1805
    

##### 用例10

    
    
    5 1 5
    0
    1801 1802 1803 1804 1805
    

#### 完整用

