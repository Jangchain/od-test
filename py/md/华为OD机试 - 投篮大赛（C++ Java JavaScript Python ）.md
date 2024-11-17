#### 题目描述

你现在是一场采用特殊赛制投篮大赛的记录员。这场比赛由若干回合组成，过去几回合的得分可能会影响以后几回合的得分。  
比赛开始时，记录是空白的。  
你会得到一个记录操作的字符串列表
[ops](https://so.csdn.net/so/search?q=ops&spm=1001.2101.3001.7020)，其中ops[i]是你需要记录的第i项操作，ops遵循下述规则：

  * 整数x-表示本回合新获得分数x
  * “+” – 表示本回合新获得的得分是前两次得分的总和。
  * “D” – 表示本回合新获得的得分是前一次得分的两倍。
  * “C” – 表示本回合没有分数，并且前一次得分无效，将其从记录中移除。

请你返回记录中所有得分的总和。

#### 输入描述

输入为一个[字符串数组](https://so.csdn.net/so/search?q=%E5%AD%97%E7%AC%A6%E4%B8%B2%E6%95%B0%E7%BB%84&spm=1001.2101.3001.7020)

#### 输出描述

输出为一个整形数字

#### 提示

  1. 1 <= ops.length <= 1000
  2. ops[i] 为 “C”、“D”、“+”，或者一个表示整数的字符串。整数范围是 [-3 * 10^4, 3 * 10^4]
  3. 需要考虑异常的存在，如有异常情况，请返回-1
  4. 对于“+”操作，题目数据不保证记录此操作时前面总是存在两个有效的分数
  5. 对于“C”和“D”操作，题目数据不保证记录此操作时前面存在一个有效的分数
  6. 题目输出范围不会超过整型的最大范围，不超过2^63 - 1

#### 用例

输入| 5 2 C D +  
---|---  
输出| 30  
说明| “5”-记录加5，记录现在是[5]  
“2”-记录加2，记录现在是[5,2]  
“C”-使前一次得分的记录无效并将其移除，记录现在是[5].  
“D”-记录加2*5=10，记录现在是[5，10].  
“+”-记录加5+10=15，记录现在是[5，10，15].  
所有得分的总和5+10+15=30  
输入| 5 -2 4 C D 9 + +  
---|---  
输出| 27  
说明| “5”-记录加5，记录现在是[5]  
“-2”-记录加-2，记录现在是[5,-2]“4”-记录加4，记录现在是[5,-2,4]“C”-使前一次得分的记录无效并将其移除，记录现在是[5,-2].“D”-记录加2*-2=4，记录现在是[5，-2,
-4].“9”-记录加9，记录现在是[5，-2, -4, 9].“+”-记录加-4+9=5，记录现在是[5，-2, -4, 9,
5].“+”-记录加-9+5=14，记录现在是[5，-2, -4, 9, 5, 14].所以得分的总和 5 - 2 - 4 + 9 + 5 + 14 =
27  
  
#### 题目解析

简单的逻辑题

#### C++

    
    
    #include <iostream>
    #include <vector>
    #include <sstream>
    using namespace std;
    int main() {
        string input;
        getline(cin, input);
        istringstream iss(input);
        string op;
    
        vector<int> scores;
    
        while (iss >> op) {
            int n = scores.size();
            if (op == "+") {
                if (n >= 2) {
                    scores.push_back(scores[n - 1] + scores[n - 2]);
                } else {
                    cout << -1 << endl;
                    return 0;
                }
            } else if (op == "D") {
                if (n >= 1) {
                    scores.push_back(scores[n - 1] * 2);
                } else {
                    cout << -1 << endl;
                    return 0;
                }
            } else if (op == "C") {
                if (n >= 1) {
                    scores.pop_back();
                } else {
                    cout << -1 << endl;
                    return 0;
                }
            } else {
                try {
                    int score = stoi(op);
                    scores.push_back(score);
                } catch (const invalid_argument& e) {
                    cout << -1 << endl;
                    return 0;
                }
            }
        }
    
        int totalScore = 0;
        for (int score : scores) {
            totalScore += score;
        }
        cout << totalScore << endl;
    
        return 0;
    }
    
    
    

#### JavaScript

    
    
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    
    rl.on('line', (line) => {
      main(line);
    });
    
    function main(line) {
      const operations = line.split(' ');
      const scores = [];
    
      for (const op of operations) {
        const n = scores.length;
        switch (op) {
          case '+':
            if (n >= 2) {
              scores.push(scores[n - 1] + scores[n - 2]);
            } else {
              console.log(-1);
              return;
            }
            break;
          case 'D':
            if (n >= 1) {
              scores.push(scores[n - 1] * 2);
            } else {
              console.log(-1);
              return;
            }
            break;
          case 'C':
            if (n >= 1) {
              scores.pop();
            } else {
              console.log(-1);
              return;
            }
            break;
          default:
            const score = parseInt(op, 10);
            if (isNaN(score)) {
              console.log(-1);
              return;
            } else {
              scores.push(score);
            }
            break;
        }
      }
    
      const totalScore = scores.reduce((acc, val) => acc + val, 0);
      console.log(totalScore);
    }
    
    

#### Java

    
    
    import java.util.*;
    
    public class Main {
        public static void main(String[] args) {
            Scanner sc = new Scanner(System.in);
            String[] operations = sc.nextLine().split(" ");
    
            List<Integer> scores = new ArrayList<>();
    
            for (String op : operations) {
                int n = scores.size();
                switch (op) {
                    case "+":
                        if (n >= 2) {
                            scores.add(scores.get(n - 1) + scores.get(n - 2));
                        } else {
                            System.out.println(-1);
                            return;
                        }
                        break;
                    case "D":
                        if (n >= 1) {
                            scores.add(scores.get(n - 1) * 2);
                        } else {
                            System.out.println(-1);
                            return;
                        }
                        break;
                    case "C":
                        if (n >= 1) {
                            scores.remove(n - 1);
                        } else {
                            System.out.println(-1);
                            return;
                        }
                        break;
                    default:
                        try {
                            int score = Integer.parseInt(op);
                            scores.add(score);
                        } catch (NumberFormatException e) {
                            System.out.println(-1);
                            return;
                        }
                        break;
                }
            }
    
            int totalScore = 0;
            for (int score : scores) {
                totalScore += score;
            }
            System.out.println(totalScore);
        }
    }
    
    
    

#### Python

    
    
    def main():
        operations = input().split()
    
        scores = []
    
        for op in operations:
            n = len(scores)
            if op == "+":
                if n >= 2:
                    scores.append(scores[n - 1] + scores[n - 2])
                else:
                    print(-1)
                    return
            elif op == "D":
                if n >= 1:
                    scores.append(scores[n - 1] * 2)
                else:
                    print(-1)
                    return
            elif op == "C":
                if n >= 1:
                    scores.pop(n - 1)
                else:
                    print(-1)
                    return
            else:
                try:
                    score = int(op)
                    scores.append(score)
                except ValueError:
                    print(-1)
                    return
    
        total_score = sum(scores)
        print(total_score)
    
    if __name__ == "__main__":
        main()
    
    
    

#### 文章目录

  *     *       * 题目描述
      * 输入描述
      * 输出描述
      * 提示
      * 用例
      * 题目解析
      * C++
      * JavaScript
      * Java
      * Python

![fengmian](https://img-
blog.csdnimg.cn/img_convert/1d2f33ed8cf2fb1b9a4fe09513f7aa94.png)

