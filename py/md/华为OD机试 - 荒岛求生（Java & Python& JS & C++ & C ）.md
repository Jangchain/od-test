## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

一个荒岛上有若干人，岛上只有一条路通往岛屿两端的港口，大家需要逃往两端的港口才可逃生。

假定每个人移动的速度一样，且只可选择向左或向右逃生。

若两个人相遇，则进行决斗，战斗力强的能够活下来，并损失掉与对方相同的战斗力；若战斗力相同，则两人同归于尽。

## 输入描述

给定一行非 0 整数数组，元素个数不超过30000；

正负表示逃生方向（正表示向右逃生，负表示向左逃生），绝对值表示战斗力，越左边的[数字表示](https://so.csdn.net/so/search?q=%E6%95%B0%E5%AD%97%E8%A1%A8%E7%A4%BA&spm=1001.2101.3001.7020)里左边港口越近，逃生方向相同的人永远不会发生决斗。

## 输出描述

能够逃生的人总数，没有人逃生输出0，输入异常时输出-1。

## 示例1

输入

    
    
    5 10 8 -8 -5
    

输出

    
    
    2
    

说明

> 第3个人和第4个人同归于尽，第2个人杀死第5个人并剩余5战斗力，第1个人没有遇到敌人。

## 解题思路

原题：[[735\. 行星碰撞](https://leetcode.cn/problems/asteroid-
collision/)](https://leetcode.cn/problems/asteroid-collision/)  
唯一的区别，就是本题会自减对方的战斗力。

## Java

    
    
    import java.util.ArrayList;
    import java.util.List;
    import java.util.Scanner;
    
    public class Main {
        // 定义一个名为asteroidCollision的方法，接受一个整数列表作为参数
        public static int asteroidCollision(List<Integer> people) {
            // 创建一个新的ArrayList，用于存储幸存者
            List<Integer> survivors = new ArrayList<>();
            
            // 遍历输入的整数列表
            for (int person : people) {
                // 如果person等于0，则返回-1
                if (person == 0) {
                    return -1;
                }
                
                // 初始化一个布尔变量alive为true
                boolean alive = true;
                
                // 当alive为true且person小于0，且survivors不为空，且survivors列表中最后一个元素大于0时，执行循环
                while (alive && person < 0 && !survivors.isEmpty() && survivors.get(survivors.size() - 1) > 0) {
                    // 更新alive的值，判断当前person是否比survivors列表中最后一个元素的相反数大
                    alive = survivors.get(survivors.size() - 1) < -person;
                    
                    // 如果survivors列表中最后一个元素小于等于person的相反数，则移除该元素
                    if (survivors.get(survivors.size() - 1) <= -person) {
                    	person = person + 	 survivors.get(survivors.size() - 1);
                        survivors.remove(survivors.size() - 1);
                    }
                }
                
                // 如果alive为true，则将person添加到survivors列表中
                if (alive) {
                    survivors.add(person);
                }
            }
            
            // 返回survivors列表的大小
            return survivors.size();
        }
    
         public static void main(String[] args) {
             Scanner scanner = new Scanner(System.in);
            
            // 读取一行输入，并使用空格分隔字符串
            String[] input = scanner.nextLine().split(" ");
            
            // 创建一个整数列表，用于存储输入的整数
            List<Integer> people = new ArrayList<>();
            
            // 将输入的字符串数组转换为整数，并添加到people列表中
            for (String s : input) {
                people.add(Integer.parseInt(s));
            }
    
            // 如果people列表的大小大于30000，则输出-1
            if (people.size() > 30000) {
                System.out.println(-1);
            } else {
                // 调用asteroidCollision方法，并将结果输出
                int result = asteroidCollision(people);
                System.out.println(result);
            }
        }
    }
    
    
    

## Python

    
    
    def asteroidCollision(people: list[int]) -> int:
        survivors = []
        for person in people:
            if person == 0:
                return -1
            alive = True
            # 当前人向左逃生，且有人向右逃生时进行决斗
            while alive and person < 0 and survivors and survivors[-1] > 0:
                # 决斗结果：当前人战斗力大于对手
                alive = survivors[-1] < - person
                 # 如果战斗力相等或当前人战斗力更大，移除对手
                if survivors[-1] <= -person:
                    person = person + survivors[-1] 
    
                    survivors.pop()
                else:
                    survivors[-1] = survivors[-1] + person
                    print(survivors[-1])
            # 如果当前人仍然存活，将其添加到逃生者列表
            if alive:
                survivors.append(person)
        return len(survivors)
    
    try:
        # 从输入获取人员列表
        people = list(map(int, input().split()))
    
        # 检查输入是否异常
        if len(people) > 30000:
            raise ValueError("输入异常")
    
        # 调用函数并输出结果
        result = asteroidCollision(people)
        print(result)
    except ValueError as e:
        print(-1)
    
    
    
    
    

## JavaScript

    
    
    function asteroidCollision(people) {
        // 创建一个空数组，用于存储幸存者
        const survivors = [];
        
        // 遍历输入的整数数组
        for (let person of people) {
            // 如果person等于0，则返回-1
            if (person === 0) {
                return -1;
            }
            
            // 初始化一个布尔变量alive为true
            let alive = true;
            
            // 当alive为true且person小于0，且survivors长度大于0，且survivors数组中最后一个元素大于0时，执行循环
            while (alive && person < 0 && survivors.length > 0 && survivors[survivors.length - 1] > 0) {
                // 更新alive的值，判断当前person是否比survivors数组中最后一个元素的相反数大
                alive = survivors[survivors.length - 1] < -person;
                
                // 如果survivors数组中最后一个元素小于等于person的相反数，则移除该元素
                if (survivors[survivors.length - 1] <= -person) {
                person =  person + survivors[survivors.length - 1]
                    survivors.pop();
                }
            }
            
            // 如果alive为true，则将person添加到survivors数组中
            if (alive) {
                survivors.push(person);
            }
        }
        
        // 返回survivors数组的长度
        return survivors.length;
    }
    
    // 导入readline模块
    const readline = require('readline');
    // 创建一个readline接口实例
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    // 当接收到一行输入时，执行以下操作
    rl.on('line', (input) => {
        // 将输入的字符串以空格分隔，并将每个子字符串转换为数字，存储在people数组中
        const people = input.split(' ').map(Number);
    
        // 如果people数组的长度大于30000，则输出-1
        if (people.length > 30000) {
            console.log(-1);
        } else {
            // 调用asteroidCollision函数，并将结果输出
            const result = asteroidCollision(people);
            console.log(result);
        }
    
        // 关闭readline接口
        rl.close();
    });
    
    
    

## C++

    
    
    #include <iostream>
    #include <vector>
    #include <string>
    #include <sstream>
    
    using namespace std;
    
    // 定义一个名为asteroidCollision的函数，接受一个整数向量作为参数
    int asteroidCollision(vector<int>& people) {
        // 创建一个新的vector，用于存储幸存者
        vector<int> survivors;
    
        // 遍历输入的整数向量
        for (int person : people) {
            // 如果person等于0，则返回-1
            if (person == 0) {
                return -1;
            }
    
            // 初始化一个布尔变量alive为true
            bool alive = true;
    
            // 当alive为true且person小于0，且survivors不为空，且survivors向量中最后一个元素大于0时，执行循环
            while (alive && person < 0 && !survivors.empty() && survivors.back() > 0) {
                // 更新alive的值，判断当前person是否比survivors向量中最后一个元素的相反数大
                alive = survivors.back() < -person;
    
                // 如果survivors向量中最后一个元素小于等于person的相反数，则移除该元素
                if (survivors.back() <= -person) {
                    person = person + survivors.back();
                    survivors.pop_back();
                }
            }
    
            // 如果alive为true，则将person添加到survivors向量中
            if (alive) {
                survivors.push_back(person);
            }
        }
    
        // 返回survivors向量的大小
        return survivors.size();
    }
    
    int main() {
        string input;
        getline(cin, input);
        stringstream ss(input);
    
        // 创建一个整数向量，用于存储输入的整数
        vector<int> people;
        int num;
    
        // 将输入的字符串转换为整数，并添加到people向量中
        while (ss >> num) {
            people.push_back(num);
        }
    
        // 如果people向量的大小大于30000，则输出-1
        if (people.size() > 30000) {
            cout << -1 << endl;
        } else {
            // 调用asteroidCollision函数，并将结果输出
            int result = asteroidCollision(people);
            cout << result << endl;
        }
    
        return 0;
    }
    
    
    
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    #include <stdbool.h>
    #include <string.h>
    
    #define MAX_PEOPLE 30000
    
    // 定义一个方法 asteroidCollision，接受一个整数数组 people 及其大小 n 作为参数
    int asteroidCollision(int *people, int n) {
        // 定义一个数组 survivors 来存储幸存者
        int survivors[MAX_PEOPLE];
        int survivors_size = 0; // 幸存者列表的大小
    
        // 遍历输入的整数数组
        for (int i = 0; i < n; i++) {
            int person = people[i];
    
            // 如果 person 等于 0，返回 -1，表示输入异常
            if (person == 0) {
                return -1;
            }
    
            bool alive = true;
    
            // 当 alive 为 true 且 person 小于 0 且 survivors 不为空且 survivors 列表中最后一个元素大于 0 时，执行循环
            while (alive && person < 0 && survivors_size > 0 && survivors[survivors_size - 1] > 0) {
                // 更新 alive 的值，判断当前 person 是否比 survivors 列表中最后一个元素的相反数大
                alive = survivors[survivors_size - 1] < -person;
    
                // 如果 survivors 列表中最后一个元素小于等于 person 的相反数，则移除该元素
                if (survivors[survivors_size - 1] <= -person) {
                    person += survivors[survivors_size - 1]; // 更新 person 的战斗力
                    survivors_size--; // 移除最后一个幸存者
                }
            }
    
            // 如果 alive 为 true，则将 person 添加到 survivors 列表中
            if (alive) {
                survivors[survivors_size++] = person;
            }
        }
    
        // 返回 survivors 列表的大小
        return survivors_size;
    }
    
    int main() {
        char input[500000]; // 假设输入的最大长度不超过 500000 个字符
        int people[MAX_PEOPLE];
        int count = 0;
    
        // 读取一行输入
        if (fgets(input, sizeof(input), stdin) == NULL) {
            printf("-1\n");
            return 0;
        }
    
        // 将输入字符串分割为整数并存储在 people 数组中
        char *token = strtok(input, " ");
        while (token != NULL && count < MAX_PEOPLE) {
            people[count++] = atoi(token);
            token = strtok(NULL, " ");
        }
    
        // 如果输入的数量超过 30000，输出 -1
        if (count > MAX_PEOPLE) {
            printf("-1\n");
        } else {
            // 调用 asteroidCollision 方法，并将结果输出
            int result = asteroidCollision(people, count);
            printf("%d\n", result);
        }
    
        return 0;
    }
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

## 完整用例

### 用例1

    
    
    1 5
    

### 用例2

    
    
    1 -5
    

### 用例3

    
    
    2 5 -5
    

### 用例4

    
    
    3 5 10 -5
    

### 用例5

    
    
    3 5 -10 5
    

### 用例6

    
    
    4 5 -10 5 -5
    

### 用例7

    
    
    5 5 -10 5 -5 10
    

### 用例8

    
    
    5 5 -10 5 -5 10 -10
    

### 用例9

    
    
    6 5 -10 5 -5 10 -10 5
    

### 用例10

    
    
    0
    `
    

