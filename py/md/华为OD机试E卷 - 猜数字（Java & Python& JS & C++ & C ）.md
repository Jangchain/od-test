## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

一个人设定一组四码的数字作为谜底，另一方猜。

每猜一个数，出数者就要根据这个数字给出提示，提示以XAYB形式呈现，直到猜中位置。

其中X表示位置正确的数的个数（数字正确且位置正确），而Y表示数字正确而位置不对的数的个数。

例如，当谜底为8123，而猜谜者猜1052时，出题者必须提示0A2B。

例如，当谜底为5637，而猜谜者才4931时，出题者必须提示1A0B。

当前已知N组猜谜者猜的数字与提示，如果答案确定，请输出答案，不确定则输出NA。

## 输入描述

第一行输入一个正整数，0＜N ＜ 100。

接下来N行，每一行包含一个猜测的数字与提示结果。

## 输出描述

输出最后的答案，答案不确定则输出NA。

## 示例1

输入

    
    
    6
    4815 1A1B
    5716 0A1B
    7842 0A1B
    4901 0A0B
    8585 3A0B
    8555 2A1B
    

输出

    
    
    3585
    

## 解题思路

暴力枚举所有可能的谜底，即0000~9999，然后用每一个谜底去匹配输入的猜测。如果当前谜底与输入的猜测产生的提示符合预期，则说明该谜底是可行的。如果某个谜底可以符合所有输入的猜测，那么该谜底就是题解。如果暴力枚举出来的所有谜底中只有一个可行的谜底，那么该谜底就是题解，否则本题无解，返回NA。

由于需要验证0000~9999这一万个可能的谜底，而每个谜底最多需要验证100个输入的猜测数字，因此该算法非常容易超时。为了优化算法，我们可以对输入的猜测进行剪枝处理。例如，当输入的猜测提示为0A0B时，我们可以排除所有包含输入数字的谜底，因为这些谜底与输入数字的位置和数字都不匹配。同样地，当输入的猜测提示为0A时，我们可以排除所有包含输入数字的位置的谜底，因为这些谜底与输入数字的位置不匹配。通过对输入的猜测进行剪枝处理，我们可以大大减少需要验证的谜底数量，从而提高算法效率。

## Java

    
    
    import java.util.*;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            int n = scanner.nextInt(); // 输入猜测的次数
    
            // 存储所有猜测的数字和提示结果
            List<String[]> guessInfos = new ArrayList<>();
            for (int i = 0; i < n; i++) {
                String guessNum = scanner.next(); // 输入猜测的数字
                String guessResult = scanner.next(); // 输入猜测的结果
                guessInfos.add(new String[]{guessNum, guessResult}); // 将猜测的数字和结果存入列表中
            }
    
            int validCount = 0; // 记录符合条件的答案数量
            String validAnswer = ""; // 存储符合条件的答案
    
            // 遍历所有可能的四位数
            for (int num = 0; num <= 9999; num++) {
                String answer = String.format("%04d", num); // 将数字格式化为四位数字符串
                boolean isValid = true; // 标记当前答案是否有效
    
                // 遍历每个猜测的数字和结果
                for (String[] guessInfo : guessInfos) {
                    String guess = guessInfo[0]; // 获取猜测的数字
                    String expectResult = guessInfo[1]; // 获取猜测的结果
    
                    int countA = 0; // 记录数字和位置都正确的个数
                    int countB = 0; // 记录数字正确但位置不正确的个数
    
                    int[] answerArr = new int[10]; // 存储答案中每个数字出现的次数
                    int[] guessArr = new int[10]; // 存储猜测中每个数字出现的次数
    
                    // 遍历每个位置
                    for (int i = 0; i < guess.length(); i++) {
                        int c1Int = guess.charAt(i) - '0'; // 获取猜测中该位置上的数字
                        int c2Int = answer.charAt(i) - '0'; // 获取答案中该位置上的数字
    
                        if (c1Int == c2Int) {
                            countA++; // 如果数字和位置都正确，countA+1
                        } else {
                            guessArr[c1Int]++; // 在 guessArr 中记录该数字出现的次数
                            answerArr[c2Int]++; // 在 answerArr 中记录该数字出现的次数
                        }
                    }
    
                    for (int i = 0; i < 10; i++) {
                        countB += Math.min(answerArr[i], guessArr[i]); // 计算数字正确但位置不正确的个数
                    }
    
                    String realResult = countA + "A" + countB + "B"; // 根据猜测和答案计算真实结果
    
                    if (!realResult.equals(expectResult)) {
                        isValid = false; // 如果真实结果和猜测结果不一致，标记当前答案为无效
                        break;
                    }
                }
    
                if (isValid) {
                    validCount++; // 如果当前答案有效，更新符合条件的答案数量
                    validAnswer = answer; // 更新符合条件的答案
    
                    if (validCount > 1) {
                        break; // 如果符合条件的答案数量大于1，跳出循环
                    }
                }
            }
    
            if (validCount != 1) {
                System.out.println("NA"); // 如果符合条件的答案不唯一，输出 NA
            } else {
                System.out.println(validAnswer); // 如果符合条件的答案唯一，输出答案
            }
        }
    }
    
    
    

## Python

    
    
    from typing import List, Tuple
    
    def main():
        n = int(input())  # 输入猜测的次数
    
        # 存储所有猜测的数字和提示结果
        guess_infos = [tuple(input().split()) for _ in range(n)]
    
        valid_count = 0  # 记录符合条件的答案数量
        valid_answer = ""  # 存储符合条件的答案
    
        # 遍历所有可能的四位数
        for num in range(10000):
            answer = f"{num:04d}"  # 将数字格式化为四位数字符串
            is_valid = True  # 标记当前答案是否有效
    
            # 遍历每个猜测的数字和结果
            for guess, expect_result in guess_infos:
                count_a = 0  # 记录数字和位置都正确的个数
                count_b = 0  # 记录数字正确但位置不正确的个数
    
                answer_arr = [0] * 10  # 存储答案中每个数字出现的次数
                guess_arr = [0] * 10  # 存储猜测中每个数字出现的次数
    
                # 遍历每个位置
                for i in range(len(guess)):
                    c1_int = int(guess[i])  # 获取猜测中该位置上的数字
                    c2_int = int(answer[i])  # 获取答案中该位置上的数字
    
                    if c1_int == c2_int:
                        count_a += 1  # 如果数字和位置都正确，countA+1
                    else:
                        guess_arr[c1_int] += 1  # 在 guessArr 中记录该数字出现的次数
                        answer_arr[c2_int] += 1  # 在 answerArr 中记录该数字出现的次数
    
                count_b = sum(min(answer_arr[i], guess_arr[i]) for i in range(10))  # 计算数字正确但位置不正确的个数
    
                real_result = f"{count_a}A{count_b}B"  # 根据猜测和答案计算真实结果
    
                if real_result != expect_result:
                    is_valid = False  # 如果真实结果和猜测结果不一致，标记当前答案为无效
                    break
    
            if is_valid:
                valid_count += 1  # 如果当前答案有效，更新符合条件的答案数量
                valid_answer = answer  # 更新符合条件的答案
    
                if valid_count > 1:
                    break  # 如果符合条件的答案数量大于1，跳出循环
    
        if valid_count != 1:
            print("NA")  # 如果符合条件的答案不唯一，输出 NA
        else:
            print(valid_answer)  # 如果符合条件的答案唯一，输出答案
    
    if __name__ == "__main__":
        main()
    
    
    

## JavaScript

    
    
    // 引入readline库，用于从标准输入读取数据
    const readline = require('readline');
    // 创建readline接口实例
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    // 定义变量n来存储猜测的总数
    let n;
    // 定义数组来存储每次的猜测数字和结果
    let guessInfos = [];
    
    // 监听行输入事件
    rl.on('line', (line) => {
      if (!n) {
        // 如果n未定义，读取第一行作为猜测总数
        n = parseInt(line.trim());
      } else {
        // 否则读取猜测数字和相应的结果，并存入guessInfos数组
        const [guessNum, guessResult] = line.split(' ');
        guessInfos.push([guessNum, guessResult]);
        if (guessInfos.length === n) {
          // 当读取完所有数据后关闭接口
          rl.close();
        }
      }
    });
    
    // 监听关闭事件，开始处理数据
    rl.on('close', () => {
      // 用于记录符合条件的答案数量
      let validCount = 0;
      // 用于存储有效的答案
      let validAnswer = '';
    
      // 遍历0000到9999所有可能的答案
      for (let num = 0; num <= 9999; num++) {
        const answer = num.toString().padStart(4, '0');
        let isValid = true;
    
        // 遍历所有的猜测信息
        for (const [guess, expectResult] of guessInfos) {
          let countA = 0; // 位置和数字都正确的数量
          let countB = 0; // 数字正确但位置错误的数量
          // 初始化数字出现频次的数组
          const answerArr = new Array(10).fill(0);
          const guessArr = new Array(10).fill(0);
    
          // 对每个位置的数字进行比较
          for (let i = 0; i < guess.length; i++) {
            const c1Int = parseInt(guess[i]);
            const c2Int = parseInt(answer[i]);
    
            if (c1Int === c2Int) {
              countA++;
            } else {
              guessArr[c1Int]++;
              answerArr[c2Int]++;
            }
          }
    
          // 计算位置不正确但数字正确的数量
          for (let i = 0; i < 10; i++) {
            countB += Math.min(answerArr[i], guessArr[i]);
          }
    
          // 构造实际结果字符串
          const realResult = `${countA}A${countB}B`;
    
          // 如果实际结果与预期结果不匹配，该答案无效
          if (realResult !== expectResult) {
            isValid = false;
            break;
          }
        }
    
        // 如果该答案有效，记录下来
        if (isValid) {
          validCount++;
          validAnswer = answer;
    
          // 如果找到多于一个有效答案，则停止搜索
          if (validCount > 1) {
            break;
          }
        }
      }
    
      // 根据有效答案数量输出结果
      if (validCount !== 1) {
        console.log('NA');
      } else {
        console.log(validAnswer);
      }
    });
    
    

## C++

    
    
    #include <iostream>
    #include <vector>
    #include <string>
    #include <iomanip>
    #include <sstream>
    
    using namespace std;
    
    int main() {
        int n;
        cin >> n; // 输入猜测的次数
    
        // 存储所有猜测的数字和提示结果
        vector<pair<string, string>> guessInfos;
        for (int i = 0; i < n; i++) {
            string guessNum, guessResult;
            cin >> guessNum >> guessResult; // 输入猜测的数字和结果
            guessInfos.push_back(make_pair(guessNum, guessResult)); // 将猜测的数字和结果存入列表中
        }
    
        int validCount = 0; // 记录符合条件的答案数量
        string validAnswer = ""; // 存储符合条件的答案
    
        // 遍历所有可能的四位数
        for (int num = 0; num <= 9999; num++) {
            stringstream ss;
            ss << setw(4) << setfill('0') << num;
            string answer = ss.str(); // 将数字格式化为四位数字符串
            bool isValid = true; // 标记当前答案是否有效
    
            // 遍历每个猜测的数字和结果
            for (const auto& guessInfo : guessInfos) {
                string guess = guessInfo.first; // 获取猜测的数字
                string expectResult = guessInfo.second; // 获取猜测的结果
    
                int countA = 0; // 记录数字和位置都正确的个数
                int countB = 0; // 记录数字正确但位置不正确的个数
    
                vector<int> answerArr(10, 0); // 存储答案中每个数字出现的次数
                vector<int> guessArr(10, 0); // 存储猜测中每个数字出现的次数
    
                // 遍历每个位置
                for (int i = 0; i < guess.length(); i++) {
                    int c1Int = guess[i] - '0'; // 获取猜测中该位置上的数字
                    int c2Int = answer[i] - '0'; // 获取答案中该位置上的数字
    
                    if (c1Int == c2Int) {
                        countA++; // 如果数字和位置都正确，countA+1
                    } else {
                        guessArr[c1Int]++; // 在 guessArr 中记录该数字出现的次数
                        answerArr[c2Int]++; // 在 answerArr 中记录该数字出现的次数
                    }
                }
    
                for (int i = 0; i < 10; i++) {
                    countB += min(answerArr[i], guessArr[i]); // 计算数字正确但位置不正确的个数
                }
    
                string realResult = to_string(countA) + "A" + to_string(countB) + "B"; // 根据猜测和答案计算真实结果
    
                if (realResult != expectResult) {
                    isValid = false; // 如果真实结果和猜测结果不一致，标记当前答案为无效
                    break;
                }
            }
    
            if (isValid) {
                validCount++; // 如果当前答案有效，更新符合条件的答案数量
                validAnswer = answer; // 更新符合条件的答案
    
                if (validCount > 1) {
                    break; // 如果符合条件的答案数量大于1，跳出循环
                }
            }
        }
    
        if (validCount != 1) {
            cout << "NA" << endl; // 如果符合条件的答案不唯一，输出 NA
        } else {
            cout << validAnswer << endl; // 如果符合条件的答案唯一，输出答案
        }
    
        return 0;
    }
    
    
    

## C语言

    
    
    #include <stdio.h>
    #include <string.h>
    #include <stdlib.h>
    
    int main() {
        int n;
        scanf("%d", &n); // 读取输入的猜测次数
    
        char guessNum[5], guessResult[5];
        char guessInfos[n][10][2][5]; // 创建数组存储每次的猜测和结果
    
        for (int i = 0; i < n; i++) {
            scanf("%s %s", guessNum, guessResult); // 读取每次的猜测数字和结果
            strcpy(guessInfos[i][0], guessNum);
            strcpy(guessInfos[i][1], guessResult);
        }
    
        int validCount = 0; // 用于记录符合条件的答案数量
        char validAnswer[5]; // 用于存储有效答案
    
        // 遍历所有可能的四位数
        for (int num = 0; num <= 9999; num++) {
            char answer[5];
            sprintf(answer, "%04d", num); // 将数字格式化为四位数字符串
    
            int isValid = 1; // 假设当前答案有效
    
            // 对每组猜测信息进行验证
            for (int j = 0; j < n; j++) {
                char *guess = guessInfos[j][0];
                char *expectResult = guessInfos[j][1];
    
                int countA = 0; // 位置和数字都正确的数量
                int countB = 0; // 数字正确位置错误的数量
                int answerArr[10] = {0};
                int guessArr[10] = {0};
    
                // 比较猜测数字和答案数字
                for (int i = 0; i < 4; i++) {
                    int c1Int = guess[i] - '0';
                    int c2Int = answer[i] - '0';
    
                    if (c1Int == c2Int) {
                        countA++;
                    } else {
                        guessArr[c1Int]++;
                        answerArr[c2Int]++;
                    }
                }
    
                // 计算位置不对但数字正确的情况
                for (int i = 0; i < 10; i++) {
                    countB += (answerArr[i] < guessArr[i]) ? answerArr[i] : guessArr[i];
                }
    
                char realResult[5];
                sprintf(realResult, "%dA%dB", countA, countB); // 构造实际的结果字符串
    
                if (strcmp(realResult, expectResult) != 0) {
                    isValid = 0; // 如果实际结果和预期结果不符，标记为无效
                    break;
                }
            }
    
            // 如果当前答案有效，记录下来
            if (isValid) {
                validCount++;
                strcpy(validAnswer, answer);
    
                if (validCount > 1) {
                    break; // 如果找到多于一个有效答案，停止搜索
                }
            }
        }
    
        // 根据有效答案的数量输出结果
        if (validCount != 1) {
            printf("NA\n");
        } else {
            printf("%s\n", validAnswer);
        }
    
        return 0;
    }
    
    

![fengmian](https://i-blog.csdnimg.cn/blog_migrate/74ea0112b28479b5bd34e37e5968acdd.png)

