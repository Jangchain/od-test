#### 题目描述

给定一个射击比赛成绩单，包含多个选手若干次射击的成绩分数，请对每个选手按其最高3个分数之和进行降序排名，输出降序排名后的选手ID序列。

#### 条件如下

  1. 一个选手可以有多个射击成绩的分数，且次序不固定。
  2. 如果一个选手成绩少于3个，则认为选手的所有成绩无效，排名忽略该选手。
  3. 如果选手的成绩之和相等，则成绩之和相等的选手按照其ID降序排列。

####

输入描述

  * 输入第一行，一个整数N，表示该场比赛总共进行了N次射击，产生N个成绩分数（2<=N<=100）。
  * 输入第二行，一个长度为N整数序列，表示参与每次射击的选手ID（0<=ID<=99）。
  * 输入第三行，一个长度为N整数序列，表示参与每次射击的选手对应的成绩（0<=成绩<=100）。

#### 输出描述

符合题设条件的降序排名后的选手ID序列。

#### 用例

输入

    
    
    13
    3,3,7,4,4,4,4,7,7,3,5,5,5
    53,80,68,24,39,76,66,16,100,55,53,80,55
    

输出

    
    
    5,3,7,4
    

说明

> 该场射击比赛进行了13次  
>  参赛的选手为3,4,5,7  
>  3号选手成绩：53,80,55，最高3个成绩的和为：80+55+53=188。  
>  4号选手成绩：24,39,76,66，最高3个成绩的和为：76+66+39=181。  
>  5号选手成绩：53,80,55，最高3个成绩的和为：80+55+53=188。  
>  7号选手成绩：68,16,100，最高3个成绩的和为：100+68+16=184。  
>  比较各个选手最高3个成绩的和，有3号=5号>7号>4号，由于3号和5号成绩相等且ID号5>3， 所以输出为：5,3,7,4

#### C++

    
    
    #include <iostream>
    #include <vector>
    #include <algorithm>
    
    using namespace std;
    
    int main() {
        // 读入数据
        int n;
        cin >> n;
        string idString, scoreString;
        cin.ignore();
        cin>>idString;
        cin>>scoreString;
        
        // 将字符串转换为整数数组
        vector<int> ids(n);
        vector<int> scores(n);
        size_t pos = 0;
        for (int i = 0; i < n; i++) {
            size_t commaPos = idString.find(',', pos);
            ids[i] = stoi(idString.substr(pos, commaPos - pos));
            pos = commaPos + 1;
        }
        pos = 0;
        for (int i = 0; i < n; i++) {
            size_t commaPos = scoreString.find(',', pos);
            scores[i] = stoi(scoreString.substr(pos, commaPos - pos));
            pos = commaPos + 1;
        }
        
        // 按照选手ID将成绩分组
        vector<vector<int>> scoreGroups(n + 1);
        for (int i = 0; i < n; i++) {
            int id = ids[i];
            int score = scores[i];
            scoreGroups[id].push_back(score);
        }
        
        // 计算每个选手的最高3个成绩之和
        vector<pair<int, int>> sums;
        for (int id = 0; id <= n; id++) {
            vector<int> group = scoreGroups[id];
            if (group.size() < 3) {
                continue;
            }
            sort(group.rbegin(), group.rend());
            group.resize(3);
            int sum = 0;
            for (int s : group) {
                sum += s;
            }
            sums.push_back(make_pair(id, sum));
        }
        
        // 按照成绩排序，成绩相同则按照ID排序
        sort(sums.begin(), sums.end(), [](const pair<int, int>& a, const pair<int, int>& b) {
            if (a.second != b.second) {
                return b.second < a.second;
            } else {
                return b.first < a.first;
            }
        });
        
        // 输出结果
        for (int i = 0; i < sums.size(); i++) {
            cout << sums[i].first;
            if (i == sums.size() - 1) {
                cout << endl;
            } else {
                cout << ",";
            }
        }
        
        return 0;
    }
    

#### javaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    function sortScore(lines) {
      // 读入数据
      const n = parseInt(lines[0]);
      const ids = lines[1].split(',');
      const scores = lines[2].split(',').map(score => parseInt(score));
    
      // 按照选手ID将成绩分组
      const scoreGroups = new Array(n);
      for (let i = 0; i < n; i++) {
        const id = parseInt(ids[i]);
        const score = scores[i];
        if (!scoreGroups[id]) {
          scoreGroups[id] = [];
        }
        scoreGroups[id].push(score);
      }
    
      // 计算每个选手的最高3个成绩之和
      const sums = [];
      for (let id = 0; id < scoreGroups.length; id++) {
        if (!scoreGroups[id] || scoreGroups[id].length < 3) {
          continue;
        }
    
        scoreGroups[id].sort((a, b) => b - a);
        scoreGroups[id] = scoreGroups[id].slice(0, 3);
    
        let sum = 0;
        for (let s of scoreGroups[id]) {
          sum += s;
        }
        sums.push([id, sum]);
      }
    
      // 按照成绩排序，成绩相同则按照ID排序
      sums.sort((a, b) => {
        if (a[1] !== b[1]) {
          return b[1] - a[1];
        } else {
          return b[0] - a[0];
        }
      });
    
      // 输出结果
      let result = '';
      for (let i = 0; i < sums.length; i++) {
        result += sums[i][0] + (i === sums.length - 1 ? '\n' : ',');
      }
      console.log(result);
    }
    
    let lines = [];
    rl.on('line', line => {
      lines.push(line);
      if (lines.length === 3) {
        sortScore(lines);
        lines = [];
      }
    });
    

#### java

    
    
    import java.util.ArrayList;
    import java.util.Collections;
    import java.util.Comparator;
    import java.util.List;
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            
            // 读入数据
            int n = Integer.parseInt(scanner.nextLine());
            String[] idStrings = scanner.nextLine().split(",");
            String[] scoreStrings = scanner.nextLine().split(",");
            
            // 将字符串数组转换为整数数组
            int[] ids = new int[n];
            int[] scores = new int[n];
            for (int i = 0; i < n; i++) {
                ids[i] = Integer.parseInt(idStrings[i]);
                scores[i] = Integer.parseInt(scoreStrings[i]);
            }
            
            // 按照选手ID将成绩分组
            List<List<Integer>> scoreGroups = new ArrayList<>();
            for (int i = 0; i <= n; i++) {
                scoreGroups.add(new ArrayList<>());
            }
            for (int i = 0; i < n; i++) {
                int id = ids[i];
                int score = scores[i];
                scoreGroups.get(id).add(score);
            }
            
            // 计算每个选手的最高3个成绩之和
            List<int[]> sums = new ArrayList<>();
            for (int id = 0; id <= n; id++) {
                List<Integer> group = scoreGroups.get(id);
                if (group.size() < 3) {
                    continue;
                }
                Collections.sort(group, Collections.reverseOrder());
                group = group.subList(0, 3);
                int sum = 0;
                for (int s : group) {
                    sum += s;
                }
                sums.add(new int[] {id, sum});
            }
            
            // 按照成绩排序，成绩相同则按照ID排序
            Collections.sort(sums, new Comparator<int[]>() {
                public int compare(int[] a, int[] b) {
                    if (a[1] != b[1]) {
                        return b[1] - a[1];
                    } else {
                        return b[0] - a[0];
                    }
                }
            });
            
            // 输出结果
            StringBuilder result = new StringBuilder();
            for (int i = 0; i < sums.size(); i++) {
                result.append(sums.get(i)[0]);
                if (i == sums.size() - 1) {
                    result.append("\n");
                } else {
                    result.append(",");
                }
            }
            System.out.println(result.toString());
        }
    }
    

#### python

    
    
    import sys
    
     # 读入数据
    
    n = int(input())
    ids = list(map(int, input().split(",")))
    scores = list(map(int, input().split(",")))
     
    
    
    # 按照选手ID将成绩分组
    scoreGroups = [[] for _ in range(n+1)]
    for i in range(n):
        id = int(ids[i])
        score = scores[i]
        scoreGroups[id].append(score)
    
    # 计算每个选手的最高3个成绩之和
    sums = []
    for id, group in enumerate(scoreGroups):
        if len(group) < 3:
            continue
        group.sort(reverse=True)
        group = group[:3]
        sum = 0
        for s in group:
            sum += s
        sums.append([id, sum])
    
    # 按照成绩排序，成绩相同则按照ID排序
    sums.sort(key=lambda x: (-x[1], -x[0]))
    
    # 输出结果
    result = ""
    for i in range(len(sums)):
        result += str(sums[i][0])
        if i == len(sums) - 1:
            result += "\n"
        else:
            result += ","
    print(result)
    
    
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

#### 完整用例

##### 用例1

    
    
    13
    3,3,7,4,4,4,4,7,7,3,5,5,5
    53,80,68,24,39,76,66,16,100,55,53,80,55
    

##### 用例2

    
    
    6
    1,1,1,2,2,3
    80,90,70,85,95,75
    

##### 用例3

    
    
    7
    1,1,1,2,2,3,3
    80,90,70,85,95,75,100
    

##### 用例4

    
    
    8
    1,1,1,2,2,3,3,3
    80,90,70,85,95,75,100,65
    

##### 用例5

    
    
    9
    1,1,1,2,2,3,3,3,2
    80,90,70,85,95,75,100,65,90
    

##### 用例6

    
    
    10
    1,1,1,2,2,2,3,3,3,3
    80,90,70,85,95,75,100,65,90,80
    

##### 用例7

    
    
    11
    1,1,1,2,2,2,3,3,3,3,3
    80,90,70,85,95,75,100,65,90,80,75
    

##### 用例8

    
    
    12
    1,1,1,2,2,2,3,3,3,3,3,3
    80,90,70,80,90,70,100,65,90,80,75,95
    

##### 用例9

    
    
    13
    1,1,1,2,2,2,3,3,3,3,3,3,3
    80,90,70,85,95,75,100,65,90,80,75,95,70
    

##### 用例10

    
    
    15
    1,1,1,2,2,2,3,4,3,3,5,5,3,3,5
    80,90,70,85,95,75,100,65,90,80,75,95,70,80,90
    

