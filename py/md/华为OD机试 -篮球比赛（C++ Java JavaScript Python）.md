#### 题目描述

> 篮球(5V5)比赛中，每个球员拥有一个战斗力，每个队伍的所有球员战斗力之和为该队伍的总体战斗力。
>
> 现有10个球员准备分为两队进行训练赛，教练希望2个队伍的战斗力差值能够尽可能的小，以达到最佳训练效果。
>
> 给出10个球员的战斗力，如果你是教练，你该如何分队，才能达到最佳训练效果?请说出该分队方案下的**最小战斗力差值。**

#### 输入描述

> 10个篮球队员的战斗力(整数，范围[1,10000]),战斗力之间用空格分隔，如:10 9 8 7 6 5 4 3 2 1
>
> 不需要考虑异常输入的场景。

#### 输出描述

> 最小的战斗力差值，如:1

##### ACM输入输出模式

如果你经常使用**Leetcode** ,会知道**letcode** 是不需要编写输入输出函数的。但是华为OD机考使用的是 **ACM 模式**
，需要手动编写输入和输出。

所以最好在牛-
客上提前熟悉这种模式。例如C++使用`cin/cout`,python使用`input()/print()`。JavaScript使用node的`readline()`和`console.log()`。Java
使用`sacnner/system.out.print()`

#### 用例

输入| `10 9 8 7 6 5 4 3 2 1`  
---|---  
输出| `1`  
说明| 1 2 5 9 10分为一队，3 4 6 7 8分为一队，两队战斗力之差最小，输出差值1。备注：球员分队方案不唯一，但最小战斗力差值固定是1  
  
#### 机考代码查重

华为OD机考完成之后，官方会进行代码查重。**华为 od 机考确实有很大的概率抽到原题**
。如果碰到了题库中的原题，一定不要直接使用题解中的代码，尤其是变量名，一定要修改，可以改成毫无意义的单词。除了变量名之外，代码的组织结构和逻辑一定要进行改变，这就要求在日常的刷题中，提前编写好属于自己的代码。

#### 代码思路

对输入的球员战斗力进行排序。然后，定义一个数组res来存储所有可能的5人小队的战斗力之和。接着，调用dfs方法，该方法用来求解去重的组合。在dfs方法中，首先判断当前层级是否达到5人小队的要求，如果达到则将当前组合的战斗力之和添加到res中。然后，使用循环遍历剩余的球员，进行递归调用dfs方法，递归的参数包括当前球员的索引、当前层级、当前组合的战斗力之和。在递归调用之前，需要进行树层去重，即判断当前球员是否和前一个球员的战斗力相同，如果相同则跳过该球员。最后，计算所有可能的分队方案的战斗力差值，选择最小的差值作为结果输出。

总结来说， 通过使用dfs算法求解10选5的去重组合，然后计算两队实力差值的最小值，从而得到最佳分队方案下的最小战斗力差值。

#### C++

    
    
    #include <iostream>
    #include <vector>
    #include <algorithm>
    #include <climits>
    #include <cmath>
    #include <numeric>
    
    using namespace std;
    
    vector<int> power;
    vector<bool> visited;
    int min_diff = INT_MAX;
    
    void dfs(int index, int level, int _sum) {
        if (level == 5) {
            int diff = abs(_sum - (accumulate(power.begin(), power.end(), 0) - _sum));
            min_diff = min(min_diff, diff);
            return;
        }
    
        for (int i = index; i < 10; i++) {
            if (i > index && power[i] == power[i - 1] && !visited[i - 1]) {
                continue;
            }
            visited[i] = true;
            dfs(i + 1, level + 1, _sum + power[i]);
            visited[i] = false;
        }
    }
    
    int main() {
        power.resize(10);
        visited.resize(10, false);
    
        for (int i = 0; i < 10; i++) {
            cin >> power[i];
        }
    
        sort(power.begin(), power.end());
    
        dfs(0, 0, 0);
    
        cout << min_diff << endl;
    
        return 0;
    }
    

#### JavaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    let power;
    let visited;
    let min_diff = Infinity;
    
    function dfs(index, level, sum) {
      if (level === 5) {
        const diff = Math.abs(sum - (power.reduce((acc, cur) => acc + cur, 0) - sum));
        min_diff = Math.min(min_diff, diff);
        return;
      }
    
      for (let i = index; i < 10; i++) {
        if (i > index && power[i] === power[i - 1] && !visited[i - 1]) continue;
        visited[i] = true;
        dfs(i + 1, level + 1, sum + power[i]);
        visited[i] = false;
      }
    }
    
    rl.on('line', (line) => {
      const input = line.split(' ').map(Number);
      power = input;
      visited = new Array(10).fill(false);
      power.sort((a, b) => a - b);
      dfs(0, 0, 0);
      console.log(min_diff);
    });
    
    rl.on('close', () => {
      process.exit(0);
    });
    

#### Java

    
    
    import java.util.*;
    
    public class Main {
        private static int[] power;
        private static boolean[] visited;
        private static int min_diff = Integer.MAX_VALUE;
    
        public static void dfs(int index, int level, int sum) {
            if (level == 5) { // 分队完成，更新最小战斗力差值
                int diff = Math.abs(sum - (Arrays.stream(power).sum() - sum));
                min_diff = Math.min(min_diff, diff);
                return;
            }
    
            for (int i = index; i < 10; i++) { // 枚举每个球员
                if (i > index && power[i] == power[i - 1] && !visited[i - 1]) continue; // 去重
                visited[i] = true;
                dfs(i + 1, level + 1, sum + power[i]); // 递归搜索下一个球员
                visited[i] = false;
            }
        }
    
        public static void main(String[] args) {
            Scanner sc = new Scanner(System.in);
    
            power = new int[10];
            visited = new boolean[10];
            for (int i = 0; i < 10; i++) {
                power[i] = sc.nextInt();
            }
            Arrays.sort(power); // 对球员战斗力进行排序
    
            dfs(0, 0, 0); // 递归搜索所有分队方案
    
            System.out.println(min_diff); // 输出最小战斗力差值
        }
    }
    

#### Python

    
    
    power = []
    visited = []
    min_diff = float('inf')
    
    def dfs(index, level, _sum):
        global min_diff
        if level == 5:
            diff = abs(_sum - (sum(power) - _sum))
            min_diff = min(min_diff, diff)
            return
    
        for i in range(index, 10):
            if i > index and power[i] == power[i - 1] and not visited[i - 1]:
                continue
            visited[i] = True
            dfs(i + 1, level + 1, _sum + power[i])
            visited[i] = False
    
    if __name__ == "__main__":
        power = [int(x) for x in input().split()]
        visited = [False] * 10
        power.sort()
    
        dfs(0, 0, 0)
    
        print(min_diff)
    

> #### 文章目录
>
>   *     *       * 题目描述
>       * 输入描述
>       * 输出描述
>       *         * ACM输入输出模式
>       * 用例
>       * 机考代码查重
>       * 代码思路
>       * C++
>       * JavaScript
>       * Java
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
blog.csdnimg.cn/img_convert/61303ac847694818888899c1e3d90907.png)

#### 完整用例

##### 用例1

    
    
    10 9 8 7 6 5 4 3 2 1
    

##### 用例2

    
    
    10000 9999 9998 9997 9996 9995 9994 9993 9992 9991
    

##### 用例3

    
    
    1 1 1 1 1 1 1 1 1 1
    

##### 用例4

    
    
    1000 2000 3000 4000 5000 6000 7000 8000 9000 10000
    

##### 用例5

    
    
    999 888 777 666 555 444 333 222 111 1
    

##### 用例6

    
    
    10000 9999 9998 9997 9996 9995 9994 9993 9992 1
    

##### 用例7

    
    
    10000 9999 9998 9997 9996 1 2 3 4 5
    

##### 用例8

    
    
    10000 9999 9998 9997 9996 9995 9994 9993 9992 9991
    

##### 用例9

    
    
    1 2 3 4 5 6 7 8 9 10
    

##### 用例10

    
    
    10000 8000 6000 4000 2000 1000 9000 7000 5000 3000
    

