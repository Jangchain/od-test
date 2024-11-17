#### 题目描述

某软件系统会在运行过程中持续产生日志，系统每天运行N单位时间，运行期间每单位时间产生的日志条数保行在数组records中。records[i]表示第i单位时间内产生日志条数。  
由于系统磁盘空间限制，每天可记录保存的日志总数上限为total条。  
如果一天产生的日志总条数大于total，则需要对当天内每单位时间产生的日志条数进行限流后保存，请计算每单位时间最大可保存日志条数limit，以确保当天保存的总日志条数不超过total。  
对于单位时间内产生日志条数不超过limit的日志全部记录保存;  
对于单位时间内产生日志条数超过limit的日志，则只记录保存limit条日志；  
如果一天产生的日志条数总和小于等于total，则不需要启动限流机制．result为-1。  
请返回result的最大值或者-1。

#### 输入描述

第一行为系统某一天运行的单位时间数N,1<=N<=10^5  
第二行为表示这一天每单位时间产生的日志数量的数组records[]，0 <= records[i] <= 10^5  
第三行为系统一天可以保存的总日志条数total。1 <= total <= 10^9

#### 输出描述

每单位时间内最大可保存的日志条数limit，如果不需要启动限流机制，返回-1。

#### 用例

输入| 6  
3 3 8 7 10 15  
40  
---|---  
输出| 9  
说明| 无  
  
#### C++

    
    
    #include <iostream>
    #include <vector>
    #include <algorithm>
    #include <numeric>
    
    using namespace std;
    
    int main() {
        int n;
        cin >> n;
    
        vector<int> logs(n);
        for (int i = 0; i < n; i++) {
            cin >> logs[i];
        }
    
        int total;
        cin >> total;
    
        int sum = accumulate(logs.begin(), logs.end(), 0);
    
        if (sum <= total) {
            cout << -1 << endl;
        } else {
            int maxLimit = *max_element(logs.begin(), logs.end());
            int minLimit = 0;
    
            while (maxLimit - minLimit > 1) {
                int limit = (maxLimit + minLimit) / 2;
    
                int tmp = 0;
                for (int log : logs) {
                    tmp += min(log, limit);
                }
    
                if (tmp > total) {
                    maxLimit = limit;
                } else {
                    minLimit = limit;
                }
            }
    
            cout << minLimit << endl;
        }
    
        return 0;
    }
    
    

#### JavaScript

    
    
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    const inputLines = [];
    
    rl.on('line', (line) => {
      inputLines.push(line);
    
      if (inputLines.length === 3) {
        const n = Number(inputLines[0]);
        const logs = inputLines[1].split(' ').map(Number);
        const total = Number(inputLines[2]);
    
        const sumLogs = logs.reduce((acc, log) => acc + log, 0);
    
        if (sumLogs <= total) {
          console.log(-1);
        } else {
          let maxLimit = Math.max(...logs);
          let minLimit = 0;
    
          while (maxLimit - minLimit > 1) {
            const limit = Math.floor((maxLimit + minLimit) / 2);
            const tmp = logs.reduce((acc, log) => acc + Math.min(log, limit), 0);
    
            if (tmp > total) {
              maxLimit = limit;
            } else {
              minLimit = limit;
            }
          }
    
          console.log(minLimit);
        }
    
        inputLines.length = 0;
      }
    });
    
    

#### Java

    
    
    import java.util.Arrays;
    import java.util.Scanner;
    
    public class LogLimiter {
        public static void main(String[] args) {
            Scanner sc = new Scanner(System.in);
    
            int n = sc.nextInt();
    
            int[] logs = new int[n];
            for (int i = 0; i < n; i++) {
                logs[i] = sc.nextInt();
            }
    
            int total = sc.nextInt();
    
            int sum = Arrays.stream(logs).sum();
    
            if (sum <= total) {
                System.out.println(-1);
            } else {
                int maxLimit = Arrays.stream(logs).max().getAsInt();
                int minLimit = 0;
    
                while (maxLimit - minLimit > 1) {
                    int limit = (maxLimit + minLimit) / 2;
    
                    int tmp = Arrays.stream(logs).map(log -> Math.min(log, limit)).sum();
    
                    if (tmp > total) {
                        maxLimit = limit;
                    } else {
                        minLimit = limit;
                    }
                }
    
                System.out.println(minLimit);
            }
        }
    }
    
    

#### Python

    
    
    def main():
        n = int(input())
        logs = list(map(int, input().split()))
        total = int(input())
    
        sum_logs = sum(logs)
    
        if sum_logs <= total:
            print(-1)
        else:
            max_limit = max(logs)
            min_limit = 0
    
            while max_limit - min_limit > 1:
                limit = (max_limit + min_limit) // 2
                tmp = sum(min(log, limit) for log in logs)
    
                if tmp > total:
                    max_limit = limit
                else:
                    min_limit = limit
    
            print(min_limit)
    
    if __name__ == "__main__":
        main()
    
    
    

#### 文章目录

  *     *       * 题目描述
      * 输入描述
      * 输出描述
      * 用例
      * C++
      * JavaScript
      * Java
      * Python

![fengmian](https://img-
blog.csdnimg.cn/img_convert/1d2f33ed8cf2fb1b9a4fe09513f7aa94.png)

