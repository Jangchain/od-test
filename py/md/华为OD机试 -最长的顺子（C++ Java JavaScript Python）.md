#### 题目描述

[斗地主](https://so.csdn.net/so/search?q=%E6%96%97%E5%9C%B0%E4%B8%BB&spm=1001.2101.3001.7020)起源于湖北十堰房县，据说是一位叫吴修全的年轻人根据当地流行的扑克玩法“跑得快”改编的，如今已风靡整个中国，并流行于互联网上。

牌型：单顺，又称顺子，最少5张牌，最多12张牌(3…A)不能有2，也不能有大小王，不计花色。

例如： 3-4-5-6-7-8，7-8-9-10-J-Q，3-4-5-6-7-8-9-10-J-Q-K-A

可用的牌 3<4<5<6<7<8<9<10<J<Q<K<A<2<B(小王)<C(大王)，每种牌除大小王外有四种花色

(共有13×4+2张牌)

输入：

  1. 手上有的牌
  2. 已经出过的牌(包括对手出的和自己出的牌)

输出：

  * 对手可能构成的最长的顺子(如果有相同长度的顺子，输出牌面最大的那一个)，
  * 如果无法构成顺子，则输出 NO-CHAIN。

#### 输入描述

输入的第一行为当前手中的牌

输入的第二行为已经出过的牌

#### 输出描述

最长的顺子

#### 用例

输入| 3-3-3-3-4-4-5-5-6-7-8-9-10-J-Q-K-A  
4-5-6-7-8-8-8  
---|---  
输出| 9-10-J-Q-K-A  
说明| 无  
输入| 3-3-3-3-8-8-8-8  
K-K-K-K  
---|---  
输出| NO-CHAIN  
说明| 剩余的牌无法构成顺子  
  
####

#### C++

    
    
    #include <iostream>
    #include <vector>
    #include <string>
    #include <algorithm>
    
    using namespace std;
    
    // 将牌面映射为数字，方便处理
    string mapToNumber(string pai) {
        if (pai == "J") return "11";
        if (pai == "11") return "J";
        if (pai == "Q") return "12";
        if (pai == "12") return "Q";
        if (pai == "K") return "13";
        if (pai == "13") return "K";
        if (pai == "A") return "14";
        if (pai == "14") return "A";
        return pai;
    }
    
    string getLongestChain(vector<string> myCards, vector<string> usedCards) {
        // 统计3~A的每张牌的数量，对应数组的索引3~14
        int cardCount[] = {0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0};
    
        // 从cardCount中去除myCards，剩下的就是对手的牌及数量
        for (string card : myCards) {
            int idx = stoi(mapToNumber(card));
            cardCount[idx]--;
        }
    
        // 从cardCount中去除usedCards，剩下的就是对手的牌及数量
        for (string card : usedCards) {
            int idx = stoi(mapToNumber(card));
            cardCount[idx]--;
        }
    
        // res用于保存顺子
        vector<string> res;
        // path用于保存连续的牌
        vector<string> path;
    
        for (int i = 3; i < sizeof(cardCount) / sizeof(int); i++) {
            // 从牌面3开始遍历，如果牌数量大于0，则加入path
            if (cardCount[i] > 0) {
                path.push_back(to_string(i));
            } else {
                // 如果遇到牌数量为0的，则连续的牌被中断，若此时连续的牌数量大于等于5，则可以形成顺子，我们将顺子加入res中
                if (path.size() >= 5) {
                    string str;
                    for (string idx : path) {
                        string pai = mapToNumber(idx);
                        str += pai + "-";
                    }
                    str.pop_back(); // 去掉最后一个"-"
                    res.push_back(str);
                }
                // 清空path，为下一次连续的牌腾位置
                path.clear();
            }
        }
    
        // 如果没有顺子，则返回"NO-CHAIN"
        if (res.size() == 0) return "NO-CHAIN";
    
        // 如果有顺子，则先按照顺子长度升序，若长度相等，则按照字典序升序
        sort(res.begin(), res.end(), [](string a, string b) {
            return a.length() != b.length() ? a.length() < b.length() : a < b;
        });
    
        return res[0];
    }
    
    int main() {
        vector<string> myCards, usedCards;
        string line;
        getline(cin, line);
        size_t pos = 0;
        string token;
        while ((pos = line.find("-")) != string::npos) {
            token = line.substr(0, pos);
            myCards.push_back(token);
            line.erase(0, pos + 1);
        }
        myCards.push_back(line);
    
        getline(cin, line);
        pos = 0;
        while ((pos = line.find("-")) != string::npos) {
            token = line.substr(0, pos);
            usedCards.push_back(token);
            line.erase(0, pos + 1);
        }
        usedCards.push_back(line);
    
        cout << getLongestChain(myCards, usedCards) << endl;
    
        return 0;
    }
    

#### java

    
    
    import java.util.*;
    
    public class Main {
        // 将牌面映射为数字，方便处理
        public static String mapToNumber(String pai) {
            if (pai.equals("J")) return "11";
            if (pai.equals("11")) return "J";
            if (pai.equals("Q")) return "12";
            if (pai.equals("12")) return "Q";
            if (pai.equals("K")) return "13";
            if (pai.equals("13")) return "K";
            if (pai.equals("A")) return "14";
            if (pai.equals("14")) return "A";
            return pai;
        }
    
        public static String getLongestChain(List<String> myCards, List<String> usedCards) {
            // 统计3~A的每张牌的数量，对应数组的索引3~14
            int[] cardCount = {0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0};
    
            // 从cardCount中去除myCards，剩下的就是对手的牌及数量
            for (String card : myCards) {
                int idx = Integer.parseInt(mapToNumber(card));
                cardCount[idx]--;
            }
    
            // 从cardCount中去除usedCards，剩下的就是对手的牌及数量
            for (String card : usedCards) {
                int idx = Integer.parseInt(mapToNumber(card));
                cardCount[idx]--;
            }
    
            // res用于保存顺子
            List<String> res = new ArrayList<>();
            // path用于保存连续的牌
            List<String> path = new ArrayList<>();
    
            for (int i = 3; i < cardCount.length; i++) {
                // 从牌面3开始遍历，如果牌数量大于0，则加入path
                if (cardCount[i] > 0) {
                    path.add(String.valueOf(i));
                } else {
                    // 如果遇到牌数量为0的，则连续的牌被中断，若此时连续的牌数量大于等于5，则可以形成顺子，我们将顺子加入res中
                    if (path.size() >= 5) {
                        StringBuilder sb = new StringBuilder();
                        for (String idx : path) {
                            String pai = mapToNumber(idx);
                            sb.append(pai).append("-");
                        }
                        sb.deleteCharAt(sb.length() - 1); // 去掉最后一个"-"
                        res.add(sb.toString());
                    }
                    // 清空path，为下一次连续的牌腾位置
                    path.clear();
                }
            }
    
            // 如果没有顺子，则返回"NO-CHAIN"
            if (res.size() == 0) return "NO-CHAIN";
    
            // 如果有顺子，则先按照顺子长度升序，若长度相等，则按照字典序升序
            Collections.sort(res, new Comparator<String>() {
                @Override
                public int compare(String a, String b) {
                    return a.length() != b.length() ? a.length() - b.length() : a.compareTo(b);
                }
            });
    
            return res.get(0);
        }
    
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            List<String> myCards = new ArrayList<>();
            List<String> usedCards = new ArrayList<>();
            String line = scanner.nextLine();
            String[] tokens = line.split("-");
            for (String token : tokens) {
                myCards.add(token);
            }
    
            line = scanner.nextLine();
            tokens = line.split("-");
            for (String token : tokens) {
                usedCards.add(token);
            }
    
            System.out.println(getLongestChain(myCards, usedCards));
        }
    }
    

#### javaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    // 将牌面映射为数字，方便处理
    function mapToNumber(pai) {
      if (pai === "J") return "11";
      if (pai === "11") return "J";
      if (pai === "Q") return "12";
      if (pai === "12") return "Q";
      if (pai === "K") return "13";
      if (pai === "13") return "K";
      if (pai === "A") return "14";
      if (pai === "14") return "A";
      return pai;
    }
    
    function getLongestChain(myCards, usedCards) {
      // 统计3~A的每张牌的数量，对应数组的索引3~14
      const cardCount = [0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0];
    
      // 从cardCount中去除myCards，剩下的就是对手的牌及数量
      for (let card of myCards) {
        let idx = parseInt(mapToNumber(card));
        cardCount[idx]--;
      }
    
      // 从cardCount中去除usedCards，剩下的就是对手的牌及数量
      for (let card of usedCards) {
        let idx = parseInt(mapToNumber(card));
        cardCount[idx]--;
      }
    
      // res用于保存顺子
      let res = [];
      // path用于保存连续的牌
      let path = [];
    
      for (let i = 3; i < cardCount.length; i++) {
        // 从牌面3开始遍历，如果牌数量大于0，则加入path
        if (cardCount[i] > 0) {
          path.push(i.toString());
        } else {
          // 如果遇到牌数量为0的，则连续的牌被中断，若此时连续的牌数量大于等于5，则可以形成顺子，我们将顺子加入res中
          if (path.length >= 5) {
            let str = "";
            for (let idx of path) {
              let pai = mapToNumber(idx);
              str += pai + "-";
            }
            str = str.slice(0, -1); // 去掉最后一个"-"
            res.push(str);
          }
          // 清空path，为下一次连续的牌腾位置
          path = [];
        }
      }
    
      // 如果没有顺子，则返回"NO-CHAIN"
      if (res.length === 0) return "NO-CHAIN";
    
      // 如果有顺子，则先按照顺子长度升序，若长度相等，则按照字典序升序
      res.sort((a, b) => {
        return a.length !== b.length ? a.length - b.length : a.localeCompare(b);
      });
    
      return res[0];
    }
    
    rl.on('line', (input) => {
      let myCards = input.split('-');
      rl.once('line', (input) => {
        let usedCards = input.split('-');
        console.log(getLongestChain(myCards, usedCards));
        rl.close();
      });
    });
    

#### python

    
    
    myCards = input().split("-")
    usedCards = input().split("-")
    
    def mapToNumber(pai):
        if pai == "J":
            return "11"
        if pai == "11":
            return "J"
        if pai == "Q":
            return "12"
        if pai == "12":
            return "Q"
        if pai == "K":
            return "13"
        if pai == "13":
            return "K"
        if pai == "A":
            return "14"
        if pai == "14":
            return "A"
        return pai
    
    def getLongestChain(myCards, usedCards):
        cardCount = [0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0]
    
        for card in myCards:
            idx = int(mapToNumber(card))
            cardCount[idx] -= 1
    
        for card in usedCards:
            idx = int(mapToNumber(card))
            cardCount[idx] -= 1
    
        res = []
        path = []
    
        for i in range(3, len(cardCount)):
            if cardCount[i] > 0:
                path.append(str(i))
            else:
                if len(path) >= 5:
                    paiList = [mapToNumber(idx) for idx in path]
                    res.append("-".join(paiList))
                path.clear()
    
        if len(res) == 0:
            return "NO-CHAIN"
    
        res.sort(key=lambda x: (len(x), x))
    
        return res[0]
    
    print(getLongestChain(myCards, usedCards))
    

> #### 文章目录
>
>   *     *       * 题目描述
>       * 输入描述
>       * 输出描述
>       * 用例
>       *       * C++
>       * java
>       * javaScript
>       * python
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

![fengmian](https://i-blog.csdnimg.cn/blog_migrate/169f277a87c29b8ff13d65ef9e7eeec7.png)###
完整用例

##### 用例1

    
    
    3-3-3-3-4-4-5-5-6-7-8-9-10-J-Q-K-A
    4-5-6-7-8-8-8
    

##### 用例2

    
    
    3-3-3-3-8-8-8-8
    K-K-K-K
    

##### 用例3

    
    
    3-3-3-3-4-4-5-5-6-7-8-9-10-J-Q-K-A
    4-5-6-7-8-8-8-9-10-J-Q-K-A
    

##### 用例4

    
    
    3-3-3-3-4-4-5-5-6-7-8-9-10-J-Q-K-A
    4-5-6-7-8-8-8-9-9-9-10-J
    

##### 用例5

    
    
    3-4-5-6-7-8-9-10-J-Q-K-A
    2-3-4-5-6-7-8-9-10-J-Q-K-A
    

##### 用例6

    
    
    3-4-5-6-7-8-9-10-J-Q-K-A
    2-2-2-2-3-3-3-J-J-J
    

##### 用例7

    
    
    3-3-3-3-9-9-9-9
    K-K-K-K
    

##### 用例8

    
    
    3-4-5-6-7-8-9-10-J-Q-K-A
    3-4-5-6-7-8-9-10-J-Q-K-A
    

##### 用例9

    
    
    3-4-5-6-7-8-9-10-J-Q-K-A
    A-2-3-4-5-6-7-8-9-10-J-Q-K
    

##### 用例10

    
    
    2-3-4-5-6-7-8-9-10-J-Q-K-A
    2-3-3-3-4-5-6-7-8-9-9-9-10-J-Q-K-A-A-A
    

