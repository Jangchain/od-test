## 题目描述

有这么一款单人卡牌游戏，牌面由颜色和数字组成，颜色为红、黄、蓝、绿中的一种，数字为0-9中的一个。游戏开始时玩家从手牌中选取一张卡牌打出，接下来如果玩家手中有和他上一次打出的手牌颜色或者数字相同的手牌，他可以继续将该手牌打出，直至手牌打光或者没有符合条件可以继续打出的手牌。

现给定一副手牌，请找到最优的出牌策略，使打出的手牌最多。

## 输入描述

输入为两行，第一行是每张手牌的数字，数字由空格分隔，第二张为对应的每张手牌的颜色，用r y b
g这4个字母分别代表4种颜色，字母也由空格分隔。手牌数量不超过10。

## 输出描述

输出一个数字，即最多能打出的手牌的数量。

## 用例

输入| 1 4 3 4 5  
r y b b r  
---|---  
输出| 3  
说明| 如果打（1, r）-> (5, r)，那么能打两张。如果打（4，y) -> (4, b) -> (3, b)，那么能打三张。  
  
## C++

    
    
    #include <iostream>
    #include <vector>
    #include <sstream>
    #include <algorithm>
    using namespace std;
    
    // dfs函数：cards表示手牌是否可用，last_num表示上一张打出的牌的数字，last_color表示上一张打出的牌的颜色
    int dfs(vector<string>& numbers, vector<string>& colors, string last_num, string last_color, vector<int>& cards) {
        int maxdepth = 0;
        for (int i = 0; i < cards.size(); i++) {
            if (cards[i] != 0) { // 如果这张牌还没被打出去
                if (numbers[i] == last_num || colors[i] == last_color) { // 如果这张牌的数字或颜色与上一张打出的牌相同
                    cards[i] = 0; // 打出这张牌
                    maxdepth = max(dfs(numbers, colors, numbers[i], colors[i], cards), maxdepth); // 继续搜索
                    cards[i] = 1; // 恢复手牌
                }
            }
        }
        return maxdepth + 1; // 返回当前搜索深度+1
    }
    
    int main() {
        string input_str;
        getline(cin, input_str);
        vector<string> numbers;
        stringstream ss(input_str);
        string temp_str;
        while (ss >> temp_str) {
            numbers.push_back(temp_str);
        }
        getline(cin, input_str);
        vector<string> colors;
        ss.clear();
        ss.str(input_str);
        while (ss >> temp_str) {
            colors.push_back(temp_str);
        }
        vector<int> cards(numbers.size(), 1); // 初始化手牌
        int maxiter = 0;
        for (int i = 0; i < numbers.size(); i++) { // 枚举每一张牌
            cards[i] = 0; // 打出这张牌
            maxiter = max(dfs(numbers, colors, numbers[i], colors[i], cards), maxiter); // 进行搜索
            cards[i] = 1; // 恢复手牌
        }
        cout << maxiter << endl; // 输出最多能打出的牌数
        return 0;
    }
    

## java

    
    
    import java.util.*;
    import java.io.*;
    
    public class Main {
        // dfs函数：cards表示手牌是否可用，last_num表示上一张打出的牌的数字，last_color表示上一张打出的牌的颜色
        public static int dfs(List<String> numbers, List<String> colors, String last_num, String last_color, List<Integer> cards) {
            int maxdepth = 0;
            for (int i = 0; i < cards.size(); i++) {
                if (cards.get(i) != 0) { // 如果这张牌还没被打出去
                    if (numbers.get(i).equals(last_num) || colors.get(i).equals(last_color)) { // 如果这张牌的数字或颜色与上一张打出的牌相同
                        cards.set(i, 0); // 打出这张牌
                        maxdepth = Math.max(dfs(numbers, colors, numbers.get(i), colors.get(i), cards), maxdepth); // 继续搜索
                        cards.set(i, 1); // 恢复手牌
                    }
                }
            }
            return maxdepth + 1; // 返回当前搜索深度+1
        }
    
        public static void main(String[] args) {
            Scanner sc = new Scanner(System.in);
            String input_str = sc.nextLine();
            List<String> numbers = new ArrayList<>();
            Scanner ss = new Scanner(input_str);
            while (ss.hasNext()) {
                String temp_str = ss.next();
                numbers.add(temp_str);
            }
            input_str = sc.nextLine();
            List<String> colors = new ArrayList<>();
            ss = new Scanner(input_str);
            while (ss.hasNext()) {
                String temp_str = ss.next();
                colors.add(temp_str);
            }
            List<Integer> cards = new ArrayList<>(Collections.nCopies(numbers.size(), 1)); // 初始化手牌
            int maxiter = 0;
            for (int i = 0; i < numbers.size(); i++) { // 枚举每一张牌
                cards.set(i, 0); // 打出这张牌
                maxiter = Math.max(dfs(numbers, colors, numbers.get(i), colors.get(i), cards), maxiter); // 进行搜索
                cards.set(i, 1); // 恢复手牌
            }
            System.out.println(maxiter); // 输出最多能打出的牌数
        }
    }
    

## javaScript

    
    
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    let numbers = [];
    let colors = [];
    
    function dfs(numbers, colors, last_num, last_color, cards) {
      let maxdepth = 0;
      for (let i = 0; i < cards.length; i++) {
        if (cards[i] !== 0) {
          if (numbers[i] === last_num || colors[i] === last_color) {
            cards[i] = 0;
            maxdepth = Math.max(dfs(numbers, colors, numbers[i], colors[i], cards), maxdepth);
            cards[i] = 1;
          }
        }
      }
      return maxdepth + 1;
    }
    
    rl.on('line', (input) => {
      if (!numbers.length) {
        numbers = input.split(' ');
      } else if (!colors.length) {
        colors = input.split(' ');
        const cards = new Array(numbers.length).fill(1);
        let maxiter = 0;
        for (let i = 0; i < numbers.length; i++) {
          cards[i] = 0;
          maxiter = Math.max(dfs(numbers, colors, numbers[i], colors[i], cards), maxiter);
          cards[i] = 1;
        }
        console.log(maxiter);
        rl.close();
      }
    });
    

## python

    
    
    import sys
    
    # dfs函数：cards表示手牌是否可用，last_num表示上一张打出的牌的数字，last_color表示上一张打出的牌的颜色
    def dfs(numbers, colors, last_num, last_color, cards):
        maxdepth = 0
        for i in range(len(cards)):
            if cards[i] != 0: # 如果这张牌还没被打出去
                if numbers[i] == last_num or colors[i] == last_color: # 如果这张牌的数字或颜色与上一张打出的牌相同
                    cards[i] = 0 # 打出这张牌
                    maxdepth = max(dfs(numbers, colors, numbers[i], colors[i], cards), maxdepth) # 继续搜索
                    cards[i] = 1 # 恢复手牌
        return maxdepth + 1 # 返回当前搜索深度+1
    
    if __name__ == '__main__':
        input_str = sys.stdin.readline().strip()
        numbers = input_str.split()
        input_str = sys.stdin.readline().strip()
        colors = input_str.split()
        cards = [1] * len(numbers) # 初始化手牌
        maxiter = 0
        for i in range(len(numbers)): # 枚举每一张牌
            cards[i] = 0 # 打出这张牌
            maxiter = max(dfs(numbers, colors, numbers[i], colors[i], cards), maxiter) # 进行搜索
            cards[i] = 1 # 恢复手牌
        print(maxiter) # 输出最多能打出的牌数
    

## C语言

    
    
    #include <stdio.h>
    #include <string.h>
    
    #define MAX_CARDS 100 // 假设最大手牌数量为100
    
    // 深度优先搜索函数
    int dfs(char numbers[MAX_CARDS][2], char colors[MAX_CARDS], char last_num[2], char last_color, int cards[MAX_CARDS], int n) {
        int maxdepth = 0, depth;
        for (int i = 0; i < n; i++) {
            if (cards[i] != 0) { // 如果这张牌还没被打出去
                if (strcmp(numbers[i], last_num) == 0 || colors[i] == last_color) { // 如果这张牌的数字或颜色与上一张打出的牌相同
                    cards[i] = 0; // 打出这张牌
                    depth = dfs(numbers, colors, numbers[i], colors[i], cards, n); // 继续搜索
                    if (depth > maxdepth) {
                        maxdepth = depth;
                    }
                    cards[i] = 1; // 恢复手牌
                }
            }
        }
        return maxdepth + 1; // 返回当前搜索深度+1
    }
    
    int main() {
        char numbers[MAX_CARDS][2], colors[MAX_CARDS];
        int cards[MAX_CARDS];
        int n = 0, maxiter = 0, iter;
        char input_str[200], *temp_str;
    
        // 读取输入的数字
        fgets(input_str, 200, stdin);
        temp_str = strtok(input_str, " \n");
        while (temp_str != NULL) {
            strcpy(numbers[n++], temp_str);
            temp_str = strtok(NULL, " \n");
        }
    
        // 读取输入的颜色
        fgets(input_str, 200, stdin);
        temp_str = strtok(input_str, " \n");
        for (int i = 0; i < n; i++) {
            colors[i] = temp_str[0];
            temp_str = strtok(NULL, " \n");
            cards[i] = 1; // 初始化手牌
        }
    
        // 枚举每一张牌
        for (int i = 0; i < n; i++) {
            cards[i] = 0; // 打出这张牌
            iter = dfs(numbers, colors, numbers[i], colors[i], cards, n); // 进行搜索
            if (iter > maxiter) {
                maxiter = iter;
            }
            cards[i] = 1; // 恢复手牌
        }
    
        printf("%d\n", maxiter); // 输出最多能打出的牌数
        return 0;
    }
    

## 完整用例

### 用例1

    
    
    2 2 2
    r y b
    

### 用例2

    
    
    1 2 3
    r r r
    

### 用例3

    
    
    0 1 2 3 4
    r y g b l
    

### 用例4

    
    
    5 5 5 5 5
    r y b g l
    

### 用例5

    
    
    1 2 3 4 5
    r y b g l
    

### 用例6

    
    
    2 3 4 5 6
    r y r y r
    

### 用例7

    
    
    0 1 0 1 0
    b g b g b
    

### 用例8

    
    
    6 6 7 7 8
    r y r y r
    

### 用例9

    
    
    7 8 9 0 1
    g g g g g
    

### 用例10

    
    
    3 3 3 4 4
    r y g r y
    

![fengmian](https://i-blog.csdnimg.cn/blog_migrate/e2d1170e056e318185300c2118650e6c.png)

