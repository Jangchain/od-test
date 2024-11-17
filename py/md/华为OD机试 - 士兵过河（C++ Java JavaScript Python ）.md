#### 题目描述

一支N个士兵的军队正在趁夜色逃亡，途中遇到一条湍急的大河。  
敌军在T的时长后到达河面，没到过对岸的士兵都会被消灭。  
现在军队只找到了1只小船，这船最多能同时坐上2个士兵。

  1. 当1个士兵划船过河，用时为 a[i]；0 <= i < N
  2. 当2个士兵坐船同时划船过河时，用时为max(a[j],a[i])两士兵中用时最长的。
  3. 当2个士兵坐船1个士兵划船时，用时为 a[i]*10；a[i]为划船士兵用时。
  4. 如果士兵下河游泳，则会被湍急水流直接带走，算作死亡。

请帮忙给出一种解决方案，保证存活的士兵最多，且过河用时最短。

#### 输入描述

第一行：N 表示士兵数(0<N<1,000,000)  
第二行：T 表示敌军到达时长(0 < T < 100,000,000)  
第三行：a[0] a[1] … a[i]… a[N- 1]  
a[i]表示每个士兵的过河时长。  
(10 < a[i]< 100; 0<= i< N）

#### 输出描述

第一行：”最多存活士兵数” “最短用时”

#### 备注

1）两个士兵的同时划船时，如果划速不同则会导致船原地转圈圈；所以为保持两个士兵划速相同，则需要向划的慢的士兵看齐。  
2）两个士兵坐船时，重量增加吃水加深，水的阻力增大；同样的力量划船速度会变慢；  
3）由于河水湍急大量的力用来抵消水流的阻力，所以2）中过河用时不是a[i] *2，  
而是a[i] * 10。

#### 用例

输入| 5  
43  
12 13 15 20 50  
---|---  
输出| 3 40  
说明| 可以达到或小于43的一种方案：  
第一步：a[0] a[1] 过河用时：13  
第二步：a[0] 返回用时：12  
第三步：a[0] a[2] 过河用时：15  
输入| 5  
130  
50 12 13 15 20  
---|---  
输出| 5 128  
说明| 可以达到或小于130的一种方案：  
第一步：a[1] a[2] 过河用时：13  
第二步：a[1] 返回用时：12  
第三步：a[0] a[4] 过河用时：50  
第四步：a[2] 返回用时：13  
第五步：a[1] a[2] 过河用时：13  
第六步：a[1] 返回用时：12  
第七步：a[1] a[3] 过河用时：15  
所以输出为：  
`5 128`  
输入| 7  
171  
25 12 13 15 20 35 20  
---|---  
输出| 7 171  
说明| 可以达到或小于171的一种方案：  
第一步：a[1] a[2] 过桥用时：13  
第二步：a[1] 带火把返回用时：12  
第三步：a[0] a[5] 过桥用时：35  
第四步：a[2] 带火把返回用时：13  
第五步：a[1] a[2] 过桥用时：13  
第六步：a[1] 带火把返回用时：12  
第七步：a[4] a[6] 过桥用时：20  
第八步：a[2] 带火把返回用时：13  
第九步：a[1] a[3] 过桥用时：15  
第十步：a[1] 带火把返回用时：12  
第十一步：a[1] a[2] 过桥用时：13所以输出为：`7 171`  
  
#### 题目解析

这道题是一道动态规划题。首先将输入的士兵过河时间排序，然后定义一个dp数组，长度为N，初始值为0。dp[i]表示前i个士兵过河所需的最短时间。接下来考虑状态转移方程。

对于第i个士兵，有两种选择：

第i个士兵和第1个士兵一起划船过河。此时需要加上dp[i-1]和前两个士兵的时间，即dp[i] = dp[i-1] + nums[0] +
get_shorter_time(nums[0], nums[i])。

第i个士兵不和第1个士兵一起划船过河。此时需要加上dp[i-2]和前两个士兵的时间，即dp[i] = dp[i-2] + nums[0] +
get_shorter_time(nums[i-1], nums[i]) + nums[1] + get_shorter_time(nums[0],
nums[1])。

在以上两种选择中，选择时间最短的那个作为dp[i]的值。如果dp[i]的值已经超过了限制时间T，则输出i和dp[i-1]，表示前i-1个士兵过河所需的最短时间。如果循环结束了还没有超过限制时间T，则输出N和dp[N-1]，表示所有士兵过河所需的最短时间。

#### 代码思路

这道题是一道动态规划的问题。首先按照给定的时间数组对所有士兵的过河时间进行排序，然后定义一个长度为n的dp数组，dp[i]表示前i个士兵过河所需要的最短时间。然后对于每一个士兵，有三种情况：自己划船过河、和另一个士兵一起划船过河、和另一个士兵一起坐船但只有一个人划船过河。这三种情况的时间分别为a[i]、max(a[j],a[i])、a[i]*10，其中j<i。因为要保证存活的士兵最多，且过河用时最短，所以对于第i个士兵，dp[i]等于前i-1个士兵过河的最短时间加上第i个士兵过河的时间和第一个士兵过河的时间（因为只有一个小船），和前i-2个士兵过河的最短时间加上两个士兵一起过河的时间（因为只有一个小船）。最后输出n和dp[n-1]即可。需要注意的是，如果dp[i]大于限制时间，就需要输出i和dp[i-1]并结束程序

#### C++

    
    
    #include <iostream>
    #include <algorithm>
    using namespace std;
    
    int main() {
        int n, limit;
        // 输入n和限制时间
        cin >> n >> limit;
        // 定义一个长度为n的数组time
        int time[n];
        // 输入n个时间值
        for (int i = 0; i < n; i++) {
            cin >> time[i];
        }
        // 对时间数组进行排序
        sort(time, time + n);
        // 定义一个长度为n的数组dp
        int dp[n];
        // 遍历时间数组
        for (int i = 0; i < n; i++) {
            // 如果是第一个时间值
            if (i == 0) {
                // dp[0]等于第一个时间值
                dp[0] = time[0];
                // 如果dp[0]大于限制时间，输出0 0并结束程序
                if (dp[0] > limit) {
                    cout << "0 0" << endl;
                    return 0;
                }
            } else if (i == 1) {
                // 如果是第二个时间值，dp[1]等于第二个时间值
                dp[1] = time[1];
            } else {
                // 如果是第三个及以后的时间值
                // t1表示只有一个士兵划船的时间，t2表示有两个士兵划船的时间
                int t1 = dp[i - 1] + time[i] + time[0]; // 1个士兵划船
                int t2 = dp[i - 2] + time[0] + time[i] + time[1] + time[1]; // 2个士兵划船
                // dp[i]等于t1和t2中的最小值
                dp[i] = min(t1, t2);
            }
            // 如果dp[i]大于限制时间，输出i和dp[i-1]并结束程序
            if (dp[i] > limit) {
                cout << i << " " << dp[i - 1] << endl;
                return 0;
            }
        }
        // 输出n和dp[n-1]
        cout << n << " " << dp[n - 1] << endl;
        return 0;
    }
    
    

#### JavaScript

    
    
    const readline = require('readline');
    // 创建readline实例
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    // 定义变量
    let n, limit, time, dp;
    
    // 监听输入事件
    rl.on('line', (line) => {
      // 如果n没有值，将输入的值赋给n
      if (!n) {
        n = parseInt(line.trim());
      } 
      // 如果limit没有值，将输入的值赋给limit
      else if (!limit) {
        limit = parseInt(line.trim());
      } 
      // 如果time没有值，将输入的值赋给time
      else {
        time = line.trim().split(' ').map(Number);
        // 将time数组从小到大排序
        time.sort();
        // 初始化dp数组
        dp = new Array(n).fill(0);
        // 遍历time数组
        for (let i = 0; i < n; i++) {
          // 如果是第一个元素，将dp[0]赋值为time[0]
          if (i === 0) {
            dp[0] = time[0];
            // 如果dp[0]大于limit，输出0 0并退出程序
            if (dp[0] > limit) {
              console.log('0 0');
              return ;
            }
          } 
          // 如果是第二个元素，将dp[1]赋值为time[1]
          else if (i === 1) {
            dp[1] = time[1];
          } 
          // 如果是后面的元素，根据状态转移方程计算dp[i]
          else {
            const t1 = dp[i - 1] + time[i] + time[0];
            const t2 = dp[i - 2] + time[0] + time[i] + time[1] + time[1];
            dp[i] = Math.min(t1, t2);
          }
          // 如果dp[i]大于limit，输出i和dp[i-1]并退出程序
          if (dp[i] > limit) {
            console.log(`${i} ${dp[i - 1]}`);
              return ;
          }
        }
        // 输出n和dp[n-1]
        console.log(`${n} ${dp[n - 1]}`);
              return ;
      }
    });
    

#### JAVA

    
    
    import java.util.Scanner;
    import java.util.Arrays;
    
    public class Main {
        public static void main(String[] args) {
            // 创建Scanner对象
            Scanner sc = new Scanner(System.in);
            // 读取输入的n和limit
            int n = sc.nextInt();
            int limit = sc.nextInt();
            // 创建长度为n的整型数组time
            int[] time = new int[n];
            // 循环读取n个时间并存入数组time中
            for (int i = 0; i < n; i++) {
                time[i] = sc.nextInt();
            }
            // 对数组time进行排序
            Arrays.sort(time);
            // 创建长度为n的整型数组dp
            int[] dp = new int[n];
            // 循环计算dp数组的值
            for (int i = 0; i < n; i++) {
                if (i == 0) {
                    // 如果i等于0，将dp[0]赋值为time[0]
                    dp[0] = time[0];
                    // 如果dp[0]大于limit，输出"0 0"并结束程序
                    if (dp[0] > limit) {
                        System.out.println("0 0");
                        return;
                    }
                } else if (i == 1) {
                    // 如果i等于1，将dp[1]赋值为time[1]
                    dp[1] = time[1];
                } else {
                    // 如果i大于1，计算t1和t2的值并将较小值赋给dp[i]
                    int t1 = dp[i - 1] + time[i] + time[0];
                    int t2 = dp[i - 2] + time[0] + time[i] + time[1] + time[1];
                    dp[i] = Math.min(t1, t2);
                }
                // 如果dp[i]大于limit，输出i和dp[i-1]的值并结束程序
                if (dp[i] > limit) {
                    System.out.println(i + " " + dp[i - 1]);
                    return;
                }
            }
            // 输出n和dp[n-1]的值
            System.out.println(n + " " + dp[n - 1]);
        }
    }
    
    

#### Python

    
    
    n = int(input())
    limit = int(input())
    time = list(map(int, input().split()))
    
    # 对时间列表进行排序
    time.sort()
    
    # 初始化dp数组
    dp = [0] * n
    
    # 动态规划
    for i in range(n):
        if i == 0: # 当i=0时，dp[0]为time[0]
            dp[0] = time[0]
            if dp[0] > limit: # 如果dp[0]已经超过了限制，则输出0 0并退出程序
                print("0 0")
                exit()
        elif i == 1: # 当i=1时，dp[1]为time[1]
            dp[1] = time[1]
        else: # 当i>=2时，dp[i]为t1和t2中的最小值
            t1 = dp[i - 1] + time[i] + time[0]
            t2 = dp[i - 2] + time[0] + time[i] + time[1] + time[1]
            dp[i] = min(t1, t2)
        if dp[i] > limit: # 如果dp[i]已经超过了限制，则输出i和dp[i-1]并退出程序
            print(i, dp[i - 1])
            exit()
    
    # 输出n和dp[n-1]
    print(n, dp[n - 1])
    

#### 文章目录

  *     *       * 题目描述
      * 输入描述
      * 输出描述
      * 备注
      * 用例
      * 题目解析
      * 代码思路
      * C++
      * JavaScript
      * JAVA
      * Python

![doutub![fengmian](https://img-
blog.csdnimg.cn/img_convert/1d2f33ed8cf2fb1b9a4fe09513f7aa94.png)

