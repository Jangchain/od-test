#### 题目描述

某公司组织一场公开招聘活动，假设由于人数和场地的限制，每人每次面试的时长不等，并已经安排给定，用(S1,E1)、 (S2,E2)、 (Sj,Ej)…(Si
< Ei，均为非负整数)表示每场面试的开始和结束时间。

面试采用一对一的方式，即一名面试官同时只能面试一名应试者，一名面试官完成一次面试后可以立即进行下一场面试，且每个面试官的面试人次不超过 m。

为了支撑招聘活动高效顺利进行，请你计算至少需要多少名面试官。

#### 输入描述

输入的第一行为面试官的最多面试人次 m，第二行为当天总的面试场次 n，

接下来的 n 行为每场面试的起始时间和结束时间，起始时间和结束时间用空格分隔。

其中， 1 <= n, m <= 500

#### 输出描述

输出一个整数，表示至少需要的面试官数量。

#### 用例

输入| 2  
5  
1 2  
2 3  
3 4  
4 5  
5 6  
---|---  
输出| 3  
说明| 总共有 5 场面试，且面试时间都不重叠，但每个面试官最多只能面试 2 人次，所以需要 3 名面试官。  
  
#### C++

    
    
    #include <iostream>
    #include <vector>
    #include <algorithm>
    using namespace std;
    
    int main() {
        // 输入最多面试人次max_interviews
        int max_interviews;
        cin >> max_interviews;
        // 输入总的面试场次num_interviews
        int num_interviews;
        cin >> num_interviews;
        // 输入每场面试的起始时间和结束时间
        vector<vector<int>> interviews(num_interviews, vector<int>(2));
        for (int i = 0; i < num_interviews; i++) {
            cin >> interviews[i][0] >> interviews[i][1];
        }
    
        // 按照结束时间对面试场次进行排序
        sort(interviews.begin(), interviews.end(), [](const vector<int>& a, const vector<int>& b) {
            return a[1] < b[1];
        });
    
        // 使用优先队列来存储每个面试官的面试结束时间
        vector<vector<int>> interviewers(1);
        for (int i = 0; i < num_interviews; i++) {
            bool flag = true;
            for (int j = 0; j < interviewers.size(); j++) {
                // 如果某个面试官的面试队列为空或者最后一场面试的结束时间早于当前面试的开始时间
                if (interviewers[j].empty() || interviewers[j].back() <= interviews[i][0]) {
                    interviewers[j].push_back(interviews[i][1]);
                    flag = false;
                    break;
                }
            }
            // 如果没有符合条件的面试官，则新增一个面试官
            if (flag) {
                interviewers.push_back({interviews[i][1]});
            }
        }
    
        // 计算至少需要的面试官数量
        int num_interviewers = 0;
        for (int i = 0; i < interviewers.size(); i++) {
            // 如果面试队列的长度能够被max_interviews整除，则需要的面试官数量为队列长度除以max_interviews
            // 否则，需要的面试官数量为队列长度除以max_interviews加一
            num_interviewers += interviewers[i].size() / max_interviews;
            if (interviewers[i].size() % max_interviews != 0) {
                num_interviewers++;
            }
        }
    
        // 输出结果
        cout << num_interviewers << endl;
    
        return 0;
    }
    

#### JavaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    let m, n, ranges;
    
    rl.on('line', (line) => {
      if (!m) {
        m = parseInt(line);
      } else if (!n) {
        n = parseInt(line);
        ranges = [];
      } else {
        ranges.push(line.split(' ').map(Number));
      }
    });
    
    rl.on('close', () => {
      const max_interviews = m;
      const num_interviews = n;
      const interviews = ranges.map(range => range.map(Number));
    
      interviews.sort((a, b) => a[1] - b[1]);
    
      const interviewers = [[]];
      for (let i = 0; i < interviews.length; i++) {
        let flag = 1;
        for (let j = 0; j < interviewers.length; j++) {
          if (interviewers[j].length === 0 || interviewers[j][interviewers[j].length - 1] <= interviews[i][0]) {
            interviewers[j].push(interviews[i][1]);
            flag = 0;
            break;
          }
        }
        if (flag === 1) {
          interviewers.push([interviews[i][1]]);
        }
      }
    
      let num_interviewers = 0;
      for (let i = 0; i < interviewers.length; i++) {
        num_interviewers += Math.floor(interviewers[i].length / max_interviews);
        if (interviewers[i].length % max_interviews !== 0) {
          num_interviewers++;
        }
      }
    
      console.log(num_interviewers);
    });
    

#### Java

    
    
    import java.util.ArrayList;
    import java.util.Arrays;
    import java.util.List;
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
    
            // 输入最多面试人次max_interviews
            int max_interviews = scanner.nextInt();
            // 输入总的面试场次num_interviews
            int num_interviews = scanner.nextInt();
            // 输入每场面试的起始时间和结束时间
            int[][] interviews = new int[num_interviews][2];
            for (int i = 0; i < num_interviews; i++) {
                interviews[i][0] = scanner.nextInt();
                interviews[i][1] = scanner.nextInt();
            }
    
            // 按照结束时间对面试场次进行排序
            Arrays.sort(interviews, (a, b) -> a[1] - b[1]);
    
            // 使用优先队列来存储每个面试官的面试结束时间
            List<List<Integer>> interviewers = new ArrayList<>();
            interviewers.add(new ArrayList<>());
            for (int i = 0; i < interviews.length; i++) {
                int flag = 1;
                for (int j = 0; j < interviewers.size(); j++) {
                    // 如果某个面试官的面试队列为空或者最后一场面试的结束时间早于当前面试的开始时间
                    if (interviewers.get(j).isEmpty() || interviewers.get(j).get(interviewers.get(j).size() - 1) <= interviews[i][0]) {
                        interviewers.get(j).add(interviews[i][1]);
                        flag = 0;
                        break;
                    }
                }
                // 如果没有符合条件的面试官，则新增一个面试官
                if (flag == 1) {
                    interviewers.add(new ArrayList<>(Arrays.asList(interviews[i][1])));
                }
            }
    
            // 计算至少需要的面试官数量
            int num_interviewers = 0;
            for (int i = 0; i < interviewers.size(); i++) {
                // 如果面试队列的长度能够被max_interviews整除，则需要的面试官数量为队列长度除以max_interviews
                // 否则，需要的面试官数量为队列长度除以max_interviews加一
                num_interviewers += interviewers.get(i).size() / max_interviews;
                if (interviewers.get(i).size() % max_interviews != 0) {
                    num_interviewers++;
                }
            }
    
            // 输出结果
            System.out.println(num_interviewers);
        }
    }
    

#### Python

    
    
    # 输入最多面试人次max_interviews
    max_interviews = int(input())
    # 输入总的面试场次num_interviews
    num_interviews = int(input())
    # 输入每场面试的起始时间和结束时间
    interviews = [list(map(int, input().split())) for _ in range(num_interviews)]
    
    # 按照结束时间对面试场次进行排序
    interviews.sort(key=lambda x: x[1])
    
    # 使用优先队列来存储每个面试官的面试结束时间
    interviewers = [[]]
    for i in range(len(interviews)):
        flag = 1
        for j in range(len(interviewers)):
            # 如果某个面试官的面试队列为空或者最后一场面试的结束时间早于当前面试的开始时间
            if len(interviewers[j]) == 0 or interviewers[j][-1] <= interviews[i][0]:
                interviewers[j].append(interviews[i][1])
                flag = 0
                break
        # 如果没有符合条件的面试官，则新增一个面试官
        if flag == 1:
            interviewers.append([interviews[i][1]])
    
    # 计算至少需要的面试官数量
    num_interviewers = 0
    for i in range(len(interviewers)):
        # 如果面试队列的长度能够被max_interviews整除，则需要的面试官数量为队列长度除以max_interviews
        # 否则，需要的面试官数量为队列长度除以max_interviews加一
        num_interviewers += len(interviewers[i]) // max_interviews if len(interviewers[i]) % max_interviews == 0 else len(interviewers[i]) // max_interviews + 1
    
    # 输出结果
    print(num_interviewers)
    

#### 文章目录

  *     *       * 题目描述
      * 输入描述
      * 输出描述
      * 用例
      * C++
      * JavaScript
      * Java
      * Python
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

![fengmian](https://img-
blog.csdnimg.cn/img_convert/1d2f33ed8cf2fb1b9a4fe09513f7aa94.png)

#### 完整用例

##### 用例1

    
    
    2
    5
    1 2
    2 3
    3 4
    4 5
    5 6
    

##### 用例2

    
    
    3
    3
    1 2
    2 3
    3 4
    

##### 用例3

    
    
    3
    3
    8 35
    5 10
    1 3
    

##### 用例4

    
    
    4
    8
    1 3
    2 4
    3 5
    4 6
    5 7
    6 8
    7 9
    8 10
    

##### 用例5

    
    
    3
    5
    1 3
    3 5
    5 7
    7 9
    9 11
    

##### 用例6

    
    
    1
    3
    1 2
    2 3
    3 4
    

##### 用例7

    
    
    2
    4
    1 3
    3 5
    5 7
    7 9
    

##### 用例8

    
    
    3
    6
    1 4
    2 5
    3 6
    4 7
    5 8
    6 9
    

##### 用例9

    
    
    4
    8
    1 2
    2 3
    3 4
    4 5
    5 6
    6 7
    7 8
    8 9
    

##### 用例10

    
    
    2
    5
    1 3
    3 5
    5 7
    7 9
    9 11
    

