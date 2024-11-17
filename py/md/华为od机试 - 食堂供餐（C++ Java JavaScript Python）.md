#### 题目描述: 食堂供餐

某公司员工食堂以盒饭方式供餐。

为将员工取餐排队时间降低为0，食堂的供餐速度必须要足够快。

现在需要根据以往员工取餐的统计信息，计算出一个刚好能达成排队时间为0的最低供餐速度。即，食堂在每个单位时间内必须至少做出多少价盒饭才能满足要求。

#### 输入描述

第1行为一个正整数N，表示食堂开餐时长。

  * 1 ≤ N ≤ 1000

第2行为一个正整数M，表示开餐前食堂已经准备好的盒饭份数。

  * P1 ≤ M ≤ 1000

第3行为N个正整数，用空格分隔，依次表示开餐时间内按时间顺序每个单位时间进入食堂取餐的人数Pi。

  * 1 ≤ i ≤ N
  * 0 ≤ Pi ≤ 100

#### 输出描述

一个整数，能满足题目要求的最低供餐速度（每个单位时间需要做出多少份盒饭）。

#### 备注

  * 每人只取一份盒饭。
  * 需要满足排队时间为0，必须保证取餐员工到达食堂时，食堂库存盒饭数量不少于本次来取餐的人数。
  * 第一个单位时间来取餐的员工只能取开餐前食堂准备好的盒饭。
  * 每个单位时间里制作的盒饭只能供应给后续单位时间来的取餐的员工。
  * 食堂在每个单位时间里制作的盒饭数量是相同的。

##### ACM输入输出模式

如果你经常使用**Leetcode** ,会知道**letcode** 是不需要编写输入输出函数的。但是华为OD机考使用的是 **ACM 模式**
，需要手动编写输入和输出。

所以最好在牛-
客上提前熟悉这种模式。例如C++使用`cin/cout`,python使用`input()/print()`。JavaScript使用node的`readline()`和`console.log()`。Java
使用`sacnner/system.out.print()`

#### 用例

输入

    
    
    3
    14
    10 4 5
    

输出

    
    
    3
    

说明

> 本样例中，总共有3批员工就餐，每批人数分别为10、4、5。
>
> 开餐前食堂库存14份。
>
> 食堂每个单位时间至少要做出3份餐饭才能达成排队时间为0的目标。具体情况如下:
>
> 第一个单位时间来的10位员工直接从库存取餐。取餐后库存剩余4份盒饭，加上第一个单位时间做出的3份，库存有7份  
>  第二个单位时间来的4员工从库存的7份中取4份。取餐后库存剩余3份盒饭，加上第二个单位时间做出的3份，库存有6份。  
>  第三个单位时间来的员工从库存的6份中取5份，库存足够。  
>  如果食堂在单位时间只能做出2份餐饭，则情况如下:
>
> 第一个单位时间来的10位员工直接从库存取餐。取餐后库存剩余4份盒饭，加上第一个单位时间做出的2份，库存有6份  
>  第二个单位时间来的4员工从库存的6份中取4份。取餐后库存剩余2份盒饭，加上第二个单位时间做出的2份，库存有4份.  
>  第三个单位时间来的员工需要取5份，但库存只有4份，库存不够。

#### 机考代码查重

华为OD机考完成之后，官方会进行代码查重。**华为 od 机考确实有很大的概率抽到原题**
。如果碰到了题库中的原题，一定不要直接使用题解中的代码，尤其是变量名，一定要修改，可以改成毫无意义的单词。除了变量名之外，代码的组织结构和逻辑一定要进行改变，这就要求在日常的刷题中，提前编写好属于自己的代码。

#### C++

    
    
    #include <iostream>
    #include <vector>
    #include <algorithm>
    
    using namespace std;
    
    bool calculate_minimum_speed(int m, int add, vector<int>& pi) {
        m -= pi[0];
        
        for (int i = 1; i < pi.size(); i++) {
            int make = max(0, pi[i] - m);
            m = max(0, m - pi[i] + add);
            if (make > add) {
                return false;
            }
        }
        
        return true;
    }
    
    int main() {
        int n, m;
        cin >> n >> m;
        
        vector<int> pi(n);
        int min = 0;
        int max = 0;
        
        for (int i = 0; i < n; i++) {
            cin >> pi[i];
            if (pi[i] > max) {
                max = pi[i];
            }
        }
        
        int ans = 0;
        
        while (min <= max) {
            int mid = (min + max) >> 1;
            if (calculate_minimum_speed(m, mid, pi)) {
                ans = mid;
                max = mid - 1;
            } else {
                min = mid + 1;
            }
        }
        
        cout << ans << endl;
        
        return 0;
    }
    

#### Java

    
    
    import java.util.Arrays;
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            Scanner sc = new Scanner(System.in);
            // 食堂开餐时长
            int n = sc.nextInt();
            // 开餐前食堂已经准备好的盒饭份数
            int m = sc.nextInt();
            // 开餐时间内按时间顺序每个单位时间进入食堂取餐的人数
            int[] pi = new int[n];
            int min = 0;
            int max = 0;
    
            // 读取每个单位时间进入食堂取餐的人数，并找到最大值
            for (int i = 0; i < n; i++) {
                pi[i] = sc.nextInt();
                if (pi[i] > max) {
                    max = pi[i];
                }
            }
            
            // 初始时，最低供餐速度为0
            int ans = 0;
            
            // 二分查找最低供餐速度
            while (min <= max) {
                int mid = (min + max) >> 1;
                if (calculate_minimum_speed(m, mid, pi)) {
                    ans = mid;
                    max = mid - 1;
                } else {
                    min = mid + 1;
                }
            }
            
            // 输出能满足题目要求的最低供餐速度
            System.out.println(ans);
        }
    
        public static boolean calculate_minimum_speed(int m, int add, int[] pi) {
            // 开餐前食堂已经准备好的盒饭份数
            m -= pi[0];
            
            // 遍历每个单位时间
            for (int i = 1; i < pi.length; i++) {
                // 计算每个单位时间需要制作的盒饭数量
                int make = Math.max(0, pi[i] - m);
                // 更新食堂库存盒饭数量
                m = Math.max(0, m - pi[i] + add);
                // 判断是否能满足要求
                if (make > add) {
                    return false;
                }
            }
            
            return true;
        }
    }
    
    

#### JavaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    let n, m, pi;
    
    rl.on('line', (line) => {
      if (!n) {
        n = parseInt(line);
      } else if (!m) {
        m = parseInt(line);
      } else {
        pi = line.split(' ').map(num => parseInt(num));
     
        main(n, m, pi);
      }
    });
    
    function main(n, m, pi) {
      let min = 0;
      let max = 0;
    
     
      for (let i = 0; i < n; i++) {
        if (pi[i] > max) {
          max = pi[i];
        }
      }
    
      let ans = 0;
    
     
      while (min <= max) {
        let mid = (min + max) >> 1;
        if (calculate_minimum_speed(m, mid, pi)) {
          ans = mid;
          max = mid - 1;
        } else {
          min = mid + 1;
        }
      }
    
      console.log(ans);
    }
    
    function calculate_minimum_speed(m, add, pi) {
      m -= pi[0];
    
      for (let i = 1; i < pi.length; i++) {
        let make = Math.max(0, pi[i] - m);
        m = Math.max(0, m - pi[i] + add);
        if (make > add) {
          return false;
        }
      }
    
      return true;
    }
    
    

#### Python

    
    
    def calculate_minimum_speed(m, add, pi):
        # 开餐前食堂已经准备好的盒饭份数
        m -= pi[0]
    
        # 遍历每个单位时间
        for i in range(1, len(pi)):
            # 计算每个单位时间需要制作的盒饭数量
            make = max(0, pi[i] - m)
            # 更新食堂库存盒饭数量
            m = max(0, m - pi[i] + add)
            # 判断是否能满足要求
            if make > add:
                return False
    
        return True
    
    n = int(input()) # 食堂开餐时长
    m = int(input()) # 开餐前食堂已经准备好的盒饭份数
    pi = list(map(int, input().split())) # 开餐时间内按时间顺序每个单位时间进入食堂取餐的人数
    
    ans = 0 # 最低供餐速度
    # 二分查找
    min_num = 0
    max_num = max(pi)
    while min_num <= max_num:
        mid = (min_num + max_num) >> 1
        if calculate_minimum_speed(m, mid, pi):
            ans = mid
            max_num = mid - 1
        else:
            min_num = mid + 1
    
    print(ans)
    
    

> #### 文章目录
>
>   *     *       * 题目描述: 食堂供餐
>       * 输入描述
>       * 输出描述
>       * 备注
>       *         * ACM输入输出模式
>       * 用例
>       * 机考代码查重
>       * C++
>       * Java
>       * JavaScript
>       * Python
>       * 完整用例
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

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

#### 完整用例

##### 用例1

    
    
    3
    14
    10 4 5
    

##### 用例2

    
    
    5
    20
    8 5 10 3 6
    

##### 用例3

    
    
    4
    10
    6 4 7 3
    

##### 用例4

    
    
    2
    5
    2 3
    

##### 用例5

    
    
    6
    30
    10 5 8 12 4 6
    

##### 用例6

    
    
    1
    5
    5
    

##### 用例7

    
    
    8
    15
    6 4 7 2 5 3 8 1
    

##### 用例8

    
    
    10
    50
    10 8 5 6 7 9 4 3 2 1
    

##### 用例9

    
    
    7
    20
    5 3 6 8 4 9 2
    

##### 用例10

    
    
    9
    25
    8 5 7 4 6 3 9 2 1
    

