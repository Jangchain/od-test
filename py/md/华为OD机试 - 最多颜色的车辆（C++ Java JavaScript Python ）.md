#### 题目描述

在一个狭小的路口，每秒只能通过一辆车，假设车辆的颜色只有 3 种，找出 N 秒内经过的最多颜色的车辆数量。

三种颜色编号为0 ，1 ，2

**请注意：这里是假设3中颜色，实际考试中不止3中颜色！！！！！！**

#### 输入描述

第一行输入的是通过的车辆颜色信息

[0,1,1,2] 代表4 秒钟通过的车辆颜色分别是 0 , 1 , 1 , 2

第二行输入的是统计时间窗，整型，单位为秒

#### 输出描述

输出指定时间窗内经过的最多颜色的车辆数量。

#### 用例

输入| 0 1 2 1  
3  
---|---  
输出| 2  
说明| 在 3 秒时间窗内，每个颜色最多出现 2 次。例如：[1,2,1]  
输入| 0 1 2 1  
2  
---|---  
输出| 1  
说明| 在 2 秒时间窗内，每个颜色最多出现1 次。  
  
#### 代码思路

这道题目可以使用滑动窗口的思想来解决。首先读入车辆颜色信息，然后读入时间窗大小。接着，我们可以维护一个时间窗，从左到右滑动，统计每种颜色的数量，并记录最多颜色的车辆数量。具体来说，我们可以使用一个哈希表来存储每种颜色的数量，然后在滑动时间窗的过程中，每次新增一个车辆颜色，同时移除一个车辆颜色，更新哈希表中每种颜色的数量，最后记录最多颜色的车辆数量即可。

#### C++

    
    
    #include <iostream>
    #include <vector>
    #include <map>
    #include <sstream>
    
    using namespace std;
    
    int main() {
        string input;
        getline(cin, input);
        vector<int> colors;
        int num;
        stringstream ss(input);
        while (ss >> num) {
            colors.push_back(num);
        }
        int time_window;
        cin >> time_window;
        map<int, int> count;
        int max_count = 0;
        for (int i = 0; i < min(time_window, (int)colors.size()); i++) {
            int color = colors[i];
            count[color]++;
            max_count = max(max_count, count[color]);
        }
        for (int i = time_window; i < colors.size(); i++) {
            int add = colors[i];
            int remove = colors[i - time_window];
            count[add]++;
            count[remove]--;
            if (count[remove] == 0) {
                count.erase(remove);
            }
            max_count = max(max_count, count[add]);
        }
        cout << max_count << endl;
        return 0;
    }
    

#### JavaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.on('line', (input) => {
      const colors = input.split(' ').map(Number);
      rl.on('line', (time_window) => {
        const count = new Map();
        let max_count = 0;
        for (let i = 0; i < Math.min(time_window, colors.length); i++) {
          const color = colors[i];
          count.set(color, (count.get(color) || 0) + 1);
          max_count = Math.max(max_count, count.get(color));
        }
        for (let i = time_window; i < colors.length; i++) {
          const add = colors[i];
          const remove = colors[i - time_window];
          count.set(add, (count.get(add) || 0) + 1);
          count.set(remove, count.get(remove) - 1);
          if (count.get(remove) === 0) {
            count.delete(remove);
          }
          max_count = Math.max(max_count, count.get(add));
        }
        console.log(max_count);
        rl.close();
      });
    });
    

#### Java

    
    
    import java.util.*;
    
    public class Main {
        public static void main(String[] args) {
            Scanner sc = new Scanner(System.in);
            String input = sc.nextLine();
            Scanner ss = new Scanner(input);
            List<Integer> colors = new ArrayList<>(); // 存储车辆颜色信息
            while (ss.hasNextInt()) {
                colors.add(ss.nextInt());
            }
            int time_window = sc.nextInt(); // 读入时间窗大小
            Map<Integer, Integer> count = new HashMap<>(); // 存储每种颜色的数量
            int max_count = 0; // 最多颜色的车辆数量
            // 统计初始时间窗内的车辆颜色数量
            for (int i = 0; i < Math.min(time_window, colors.size()); i++) {
                int color = colors.get(i);
                count.put(color, count.getOrDefault(color, 0) + 1);
                max_count = Math.max(max_count, count.get(color));
            }
            // 滑动时间窗统计车辆颜色数量
            for (int i = time_window; i < colors.size(); i++) {
                int add = colors.get(i); // 新增的车辆颜色
                int remove = colors.get(i - time_window); // 移除的车辆颜色
                count.put(add, count.getOrDefault(add, 0) + 1);
                count.put(remove, count.get(remove) - 1);
                if (count.get(remove) == 0) {
                    count.remove(remove);
                }
                max_count = Math.max(max_count, count.get(add));
            }
            System.out.println(max_count); // 输出最多颜色的车辆数量
        }
    }
    

#### Python

    
    
    from collections import defaultdict
    
    colors = list(map(int, input().split()))
    time_window = int(input())
    
    count = defaultdict(int)
    max_count = 0
    
    for i in range(min(time_window, len(colors))):
        color = colors[i]
        count[color] += 1
        max_count = max(max_count, count[color])
    
    for i in range(time_window, len(colors)):
        add = colors[i]
        remove = colors[i - time_window]
        count[add] += 1
        count[remove] -= 1
        if count[remove] == 0:
            del count[remove]
        max_count = max(max_count, count[add])
    
    print(max_count)
    

#### 文章目录

  *     *       * 题目描述
      * 输入描述
      * 输出描述
      * 用例
      * 代码思路
      * C++
      * JavaScript
      * Java
      * Python

![fengmian](https://img-
blog.csdnimg.cn/img_convert/1d2f33ed8cf2fb1b9a4fe09513f7aa94.png)

