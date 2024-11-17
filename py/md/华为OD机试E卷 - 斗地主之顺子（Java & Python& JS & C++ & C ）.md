## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

在斗地主扑克牌游戏中，
扑克牌由小到大的顺序为：3,4,5,6,7,8,9,10,J,Q,K,A,2，玩家可以出的扑克牌阵型有：单张、对子、顺子、飞机、炸弹等。

其中顺子的出牌规则为：由至少5张由小到大连续递增的扑克牌组成，且不能包含2。

例如：{3,4,5,6,7}、{3,4,5,6,7,8,9,10,J,Q,K,A}都是有效的顺子；而{J,Q,K,A,2}、
{2,3,4,5,6}、{3,4,5,6}、{3,4,5,6,8}等都不是顺子。

给定一个包含13张牌的数组，如果有满足出牌规则的顺子，请输出顺子。

如果存在多个顺子，请每行输出一个顺子，且需要按顺子的第一张牌的大小（必须从小到大）依次输出。

如果没有满足出牌规则的顺子，请输出No。

## 输入描述

13张任意顺序的扑克牌，每张扑克牌数字用空格隔开，每张扑克牌的数字都是合法的，并且不包括大小王：

2 9 J 2 3 4 K A 7 9 A 5 6

不需要考虑输入为异常字符的情况

## 输出描述

组成的顺子，每张扑克牌数字用空格隔开：

3 4 5 6 7

## 示例1

输入

    
    
    2 9 J 2 3 4 K A 7 9 A 5 6
    

输出

    
    
    3 4 5 6 7
    

说明

> 13张牌中，可以组成的顺子只有1组：3 4 5 6 7。

## 示例2

输入：

    
    
    2 9 J 10 3 4 K A 7 Q A 5 6
    

输出：

    
    
    3 4 5 6 7
    9 10 J Q K A
    

说明

> 13张牌中，可以组成2组顺子，从小到大分别为：3 4 5 6 7 和 9 10 J Q K A

## 示例3

输入：

    
    
    2 9 9 9 3 4 K A 10 Q A 5 6
    

输出：

    
    
    No
    

说明

> 13张牌中，无法组成顺子。

## 解题思路

这个问题涉及解析一个包含13张扑克牌的数组，目的是识别出所有符合条件的有效顺子。顺子定义为至少包含5张按牌面大小顺序连续的扑克牌，不包括牌面为“2”的牌。

题目描述存在不明确之处，未具体说明是要求解最多数量的顺子，还是单个最长的顺子。

考虑以下示例：

    
    
    4 5 6 7 8 6 7 8 9 10
    

如果目标是找到数量最多的顺子，答案将是两个独立的顺子：【4 5 6 7 8】和【6 7 8 9 10】。

如果目标是找到单个最长的顺子，答案则是【4 5 6 7 8 9 10】。

此外，如果【数量最多的顺子】，尽管【5 6 7 8
9】也是一个有效顺子，但在按照第二个示例的选择规则，它不是答案。这表明题目可能更倾向于寻找最长的顺子，且实际机考按照最长的去找，通过率高于数量最多。

## Java

    
    
    import java.util.*;
    import java.util.stream.Collectors;
    
    public class Main {
        // 静态初始化一个用于映射扑克牌面到数字的HashMap，以方便后续比较大小
        private static final Map<String, Integer> CARD_TO_NUMBER;
    
        static {
            // 初始化HashMap
            CARD_TO_NUMBER = new HashMap<>();
            // 将每张扑克牌对应的面值映射到一个整数，其中2被认为是最大的牌
            CARD_TO_NUMBER.put("3", 3);
            CARD_TO_NUMBER.put("4", 4);
            CARD_TO_NUMBER.put("5", 5);
            CARD_TO_NUMBER.put("6", 6);
            CARD_TO_NUMBER.put("7", 7);
            CARD_TO_NUMBER.put("8", 8);
            CARD_TO_NUMBER.put("9", 9);
            CARD_TO_NUMBER.put("10", 10);
            CARD_TO_NUMBER.put("J", 11);
            CARD_TO_NUMBER.put("Q", 12);
            CARD_TO_NUMBER.put("K", 13);
            CARD_TO_NUMBER.put("A", 14);
            CARD_TO_NUMBER.put("2", 16);
        }
    
        public static void main(String[] args) {
            Scanner sc = new Scanner(System.in);  // 创建Scanner对象用于读取输入
            String[] cards = sc.nextLine().split(" ");  // 读取一行输入，并按空格分割成数组
            // 对输入的扑克牌按照定义的牌面大小进行排序
            Arrays.sort(cards, (a, b) -> CARD_TO_NUMBER.get(a) - CARD_TO_NUMBER.get(b));
    
            ArrayList<LinkedList<String>> straights = new ArrayList<>();  // 用于存储所有可能的顺子序列
            LinkedList<String> currentStraight = new LinkedList<>();  // 初始化当前正在检查的顺子序列
            currentStraight.add(cards[0]);  // 将排序后的第一张牌加入到当前顺子序列中
            straights.add(currentStraight);  // 将当前顺子序列加入到顺子列表中
    
            // 从第二张牌开始遍历所有牌
            for (int i = 1; i < cards.length; i++) {
                String card = cards[i];
                boolean added = false;  // 标记当前牌是否已被添加到某个顺子中
    
                // 遍历当前已存在的所有顺子序列，尝试将当前牌加入
                for (LinkedList<String> straight : straights) {
                    // 判断当前牌是否可以追加到顺子的末尾
                    if (CARD_TO_NUMBER.get(card) - CARD_TO_NUMBER.get(straight.getLast()) == 1) {
                        straight.add(card);
                        added = true;
                        break;
                    }
                }
    
                // 如果当前牌没有加入到任何顺子中，创建一个新的顺子序列
                if (!added) {
                    LinkedList<String> newStraight = new LinkedList<>();
                    newStraight.add(card);
                    straights.add(newStraight);
                }
            }
    
            // 筛选出长度至少为5的有效顺子序列
            List<LinkedList<String>> validStraights =
                straights.stream().filter(straight -> straight.size() >= 5).collect(Collectors.toList());
    
            // 如果没有找到有效的顺子序列，输出"No"
            if (validStraights.isEmpty()) {
                System.out.println("No");
            } else {
                // 将所有有效的顺子按照起始牌的大小进行排序并输出
                validStraights.stream()
                    .sorted((a, b) -> CARD_TO_NUMBER.get(a.getFirst()) - CARD_TO_NUMBER.get(b.getFirst()))
                    .forEach(straight -> System.out.println(String.join(" ", straight)));
            }
        }
    }
    

## Python

    
    
    # 导入Python标准库
    from collections import deque
    
    # 定义一个字典，用于映射扑克牌的牌面到数字，方便比较大小
    CARD_TO_NUMBER = {
        '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8,
        '9': 9, '10': 10, 'J': 11, 'Q': 12, 'K': 13,
        'A': 14, '2': 16
    }
    
     
    # 使用input函数读取一行输入，并用split方法按空格分割字符串，得到牌面数组
    cards = input().split()
    # 根据牌面大小对牌进行排序
    cards.sort(key=lambda x: CARD_TO_NUMBER[x])
    
    straights = []  # 存储所有可能的顺子序列
    current_straight = deque([cards[0]])  # 初始化当前顺子序列，使用deque提高效率
    straights.append(current_straight)  # 将当前顺子序列添加到列表中
    
    # 遍历输入的牌，从第二张牌开始
    for card in cards[1:]:
        added = False  # 标记当前牌是否已被添加到某个顺子中
    
        # 尝试将当前牌加入到已存在的顺子序列中
        for straight in straights:
            # 判断当前牌是否可以追加到顺子末尾
            if CARD_TO_NUMBER[card] - CARD_TO_NUMBER[straight[-1]] == 1:
                straight.append(card)
                added = True
                break
        
        # 如果当前牌没有加入到任何顺子中，创建一个新的顺子序列
        if not added:
            new_straight = deque([card])
            straights.append(new_straight)
    
    # 筛选出长度至少为5的有效顺子序列
    valid_straights = [list(straight) for straight in straights if len(straight) >= 5]
    
    # 如果没有找到有效的顺子序列，输出"No"
    if not valid_straights:
        print("No")
    else:
        # 对所有有效的顺子进行排序，并输出
        valid_straights.sort(key=lambda x: CARD_TO_NUMBER[x[0]])
        for straight in valid_straights:
            print(" ".join(straight))
    
     
    

## JavaScript

    
    
    // 引入 readline 模块并创建接口用于读取来自标准输入(stdin)的数据
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    // 定义一个映射扑克牌面到数字的对象，方便后续比较大小
    const CARD_TO_NUMBER = {
        '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8,
        '9': 9, '10': 10, 'J': 11, 'Q': 12, 'K': 13,
        'A': 14, '2': 16
    };
    
    // 读取一行输入
    rl.on('line', (input) => {
        // 按空格分割输入的字符串，得到牌的数组
        let cards = input.split(' ');
        // 根据牌面大小对牌进行排序
        cards.sort((a, b) => CARD_TO_NUMBER[a] - CARD_TO_NUMBER[b]);
    
        let straights = [];  // 存储所有可能的顺子序列
        let currentStraight = [cards[0]];  // 初始化当前顺子序列
        straights.push(currentStraight);  // 将当前顺子序列加入到列表中
    
        // 从第二张牌开始遍历所有牌
        for (let i = 1; i < cards.length; i++) {
            let card = cards[i];
            let added = false;  // 标记当前牌是否已被添加到某个顺子中
    
            // 尝试将当前牌加入到已存在的顺子序列中
            for (let straight of straights) {
                // 判断当前牌是否可以追加到顺子的末尾
                if (CARD_TO_NUMBER[card] - CARD_TO_NUMBER[straight[straight.length - 1]] === 1) {
                    straight.push(card);
                    added = true;
                    break;
                }
            }
    
            // 如果当前牌没有加入到任何顺子中，创建一个新的顺子序列
            if (!added) {
                let newStraight = [card];
                straights.push(newStraight);
            }
        }
    
        // 筛选出长度至少为5的有效顺子序列
        let validStraights = straights.filter(straight => straight.length >= 5);
    
        // 如果没有找到有效的顺子序列，输出"No"
        if (validStraights.length === 0) {
            console.log("No");
        } else {
            // 对所有有效的顺子进行排序，并输出
            validStraights.sort((a, b) => CARD_TO_NUMBER[a[0]] - CARD_TO_NUMBER[b[0]]);
            validStraights.forEach(straight => console.log(straight.join(' ')));
        }
    
        rl.close(); // 关闭readline接口
    });
    

## C++

    
    
    #include <iostream>
    #include <sstream>
    #include <vector>
    #include <algorithm>
    #include <map>
    #include <list>
    
    using namespace std;
    int main() {
        // 定义一个映射扑克牌面到数字的map，方便后续比较大小
        map<string, int> card_to_number = {
            {"3", 3}, {"4", 4}, {"5", 5}, {"6", 6}, {"7", 7},
            {"8", 8}, {"9", 9}, {"10", 10}, {"J", 11}, {"Q", 12},
            {"K", 13}, {"A", 14}, {"2", 16}
        };
    
        // 从标准输入读取一行数据
        string input;
        getline(cin, input);
        istringstream iss(input);
        vector<string> cards;
        string card;
    
        // 将输入的扑克牌存入vector
        while (iss >> card) {
            cards.push_back(card);
        }
    
        // 根据定义的牌面大小对牌进行排序
        sort(cards.begin(), cards.end(), [&card_to_number](const string& a, const string& b) {
            return card_to_number[a] < card_to_number[b];
        });
    
        // 用于存储所有可能的顺子序列
        vector<list<string>> straights;
        list<string> current_straight;
        current_straight.push_back(cards[0]);
        straights.push_back(current_straight);
    
        // 从第二张牌开始遍历所有牌
        for (size_t i = 1; i < cards.size(); i++) {
            bool added = false;  // 标记当前牌是否已被添加到某个顺子中
            for (auto& straight : straights) {
                // 判断当前牌是否可以追加到顺子的末尾
                if (card_to_number[cards[i]] - card_to_number[straight.back()] == 1) {
                    straight.push_back(cards[i]);
                    added = true;
                    break;
                }
            }
    
            // 如果当前牌没有加入到任何顺子中，创建一个新的顺子序列
            if (!added) {
                list<string> new_straight;
                new_straight.push_back(cards[i]);
                straights.push_back(new_straight);
            }
        }
    
        // 筛选出长度至少为5的有效顺子序列
        vector<list<string>> valid_straights;
        for (const auto& straight : straights) {
            if (straight.size() >= 5) {
                valid_straights.push_back(straight);
            }
        }
    
        // 如果没有找到有效的顺子序列，输出"No"
        if (valid_straights.empty()) {
            cout << "No\n";
        } else {
            // 输出所有有效的顺子序列
            for (const auto& straight : valid_straights) {
                for (const auto& card : straight) {
                    cout << card << " ";
                }
                cout << endl;
            }
        }
    
        return 0;
    }
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    #include <string.h>
    
    // 定义扑克牌与其数值的映射关系结构体
    typedef struct {
        char card[3];  // 扑克牌面（考虑到"10"有两个字符，所以数组大小为3）
        int value;     // 对应的数值
    } CardMap;
    
    // 扑克牌面到数值的映射表
    CardMap card_to_number[] = {
        {"3", 3}, {"4", 4}, {"5", 5}, {"6", 6}, {"7", 7}, {"8", 8}, {"9", 9}, 
        {"10", 10}, {"J", 11}, {"Q", 12}, {"K", 13}, {"A", 14}, {"2", 16}
    };
    int card_map_size = sizeof(card_to_number) / sizeof(card_to_number[0]);
    
    // 用于比较扑克牌的函数
    int compare_cards(const void *a, const void *b) {
        const char *card1 = *(const char **)a;
        const char *card2 = *(const char **)b;
        int value1 = 0, value2 = 0;
    
        for (int i = 0; i < card_map_size; ++i) {
            if (strcmp(card_to_number[i].card, card1) == 0) {
                value1 = card_to_number[i].value;
            }
            if (strcmp(card_to_number[i].card, card2) == 0) {
                value2 = card_to_number[i].value;
            }
        }
    
        return value1 - value2;
    }
    
    int main() {
        char input[100];  // 存储输入字符串
        char *cards[20];  // 存储分割后的扑克牌字符串指针
        int count = 0;    // 扑克牌数量
    
        // 读取一行输入
        fgets(input, sizeof(input), stdin);
        input[strcspn(input, "\n")] = 0;  // 移除换行符
    
        // 分割输入字符串
        char *token = strtok(input, " ");
        while (token != NULL) {
            cards[count++] = token;
            token = strtok(NULL, " ");
        }
    
        // 对扑克牌进行排序
        qsort(cards, count, sizeof(char *), compare_cards);
    
        // 动态分配二维数组来存储可能的顺子序列
        char **straights[count];
        int lengths[count];  // 存储每个顺子的长度
        for (int i = 0; i < count; ++i) {
            straights[i] = malloc(count * sizeof(char *));
            straights[i][0] = cards[i];
            lengths[i] = 1;
        }
        int num_straights = count;
    
        // 生成顺子序列
        for (int i = 0; i < count; ++i) {
            for (int j = 0; j < num_straights; ++j) {
                if (compare_cards(&cards[i], &straights[j][lengths[j] - 1]) == 1) {
                    straights[j][lengths[j]++] = cards[i];
                    break;
                }
            }
        }
    
        // 输出长度至少为5的顺子序列
        int found = 0;
        for (int i = 0; i < num_straights; ++i) {
            if (lengths[i] >= 5) {
                found = 1;
                for (int j = 0; j < lengths[i]; ++j) {
                    printf("%s ", straights[i][j]);
                }
                printf("\n");
            }
            free(straights[i]);
        }
    
        if (!found) {
            printf("No\n");
        }
    
        return 0;
    }
    

![fengmian](https://i-blog.csdnimg.cn/blog_migrate/83c8b1166777fd98d2ab42c4a27966bf.png)

