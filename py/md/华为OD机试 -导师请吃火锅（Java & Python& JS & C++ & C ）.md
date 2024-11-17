## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

入职后，导师会请你吃饭，你选择了火锅。

火锅里会在不同时间下很多菜。

不同食材要煮不同的时间，才能变得刚好合适。

你希望吃到最多的刚好合适的菜，但你的手速不够快，用m代表手速，每次下手捞菜后至少要过m秒才能再捞（每次只能捞一个）。

那么用最合理的策略，最多能吃到多少刚好合适的菜？

## 输入描述

第一行两个整数n，m，其中n代表往锅里下的菜的个数，m代表手速。（1 < n, m < 1000）

接下来有n行，每行有两个数x，y代表第x秒下的菜过y秒才能变得刚好合适。（1 < x, y < 1000）

## 输出描述

输出一个整数代表用最合理的策略，最多能吃到刚好合适的菜的数量。

## 示例1

输入

    
    
    2 1
    1 2
    2 1
    

输出

    
    
    1
    

说明

> ## 解题思路

题目的核心是在多个可能的捞菜时刻中，通过合理安排选择，尽可能多地吃到“刚好合适”的菜。考虑到每次捞菜后的冷却时间，需要设计一个策略，尽量避开同时煮熟的菜以最大化收益。

  1. **菜的描述** ：

     * 有 `n` 个菜依次被放入火锅，每个菜放入的时间和煮熟的时间不同。
     * 每个菜从放入到煮熟需要特定的时间，具体描述为：在第 `x` 秒放入的菜需要煮 `y` 秒后才能达到刚好合适的状态。
  2. **手速限制** ：

     * 你每次只能捞一个菜，捞完一个菜后由于手速限制，需要等待 `m` 秒后才能再次捞下一个菜。
  3. **目标** ：

     * 在限制条件下（每次捞菜需要等待 `m` 秒），最大化吃到刚好合适的菜的数量。

### 用例解释

**输入** ：

    
    
    2 1
    1 2
    2 1
    

**解析** ：

  * 总共有 `2` 个菜（`n = 2`），你的手速需要 `1` 秒的冷却时间（`m = 1`）。
  * 第一个菜在第 `1` 秒放入，需要 `2` 秒才能煮熟，所以这个菜在第 `3` 秒刚好煮熟。
  * 第二个菜在第 `2` 秒放入，需要 `1` 秒煮熟，所以在第 `3` 秒刚好煮熟。

**输出** ：

    
    
    1
    

**解释** ：

  * 两个菜都在第 `3` 秒刚好煮熟，但你在第 `3` 秒只能捞一个，因为你捞完一个菜后要等 `1` 秒才能捞下一个菜。
  * 因此，你最多只能捞到其中一个刚好合适的菜，所以输出 `1`。

## 以下是DFS解决，比较复杂！

### Java 代码

    
    
    import java.util.ArrayList;
    import java.util.List;
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);  // 创建Scanner对象用于获取用户输入
            int n = scanner.nextInt();  // 读取菜的个数n
            int m = scanner.nextInt();  // 读取手速m，即每次捞菜后必须等待的时间
    
            List<Integer> times = new ArrayList<>();  // 用于存储每道菜煮熟的时间点
            for (int i = 0; i < n; i++) {
                int start = scanner.nextInt();  // 读取开始时间
                int duration = scanner.nextInt();  // 读取持续时间
                times.add(start + duration);  // 计算并存储每道菜的煮熟时间
            }
    
            int[] nums = new int[getMax(times) + 1];  // 创建一个数组，用于标记每个时间点是否有菜
            for (int t : times) {
                nums[t] = 1;  // 将有菜的时间点标记为1
            }
    
            List<Integer> dp = new ArrayList<>();  // 用于存储不同策略下吃到的菜的数量
    
            dfs(1, new ArrayList<>(), nums, dp, m);  // 从时间点1开始，使用深度优先搜索
    
            int max = 0;
            for (int count : dp) {
                max = Math.max(max, count);  // 找出能吃到最多菜的策略
            }
    
            System.out.println(max);  // 输出最多能吃到的菜的数量
        }
    
        private static void dfs(int t, List<Integer> data, int[] nums, List<Integer> dp, int m) {
            if (t >= nums.length) {  // 如果时间点超出范围，计算当前策略的总菜数
                int sum = 0;
                for (int count : data) {
                    sum += count;  // 统计吃到的菜的总数
                }
                dp.add(sum);  // 将结果加入dp列表
                return;
            }
    
            if (nums[t] == 1) {  // 当前时间点有菜
                List<Integer> newData = new ArrayList<>(data);  // 创建一个新的策略列表
                newData.add(1);  // 添加吃到的菜
                dfs(t + m, newData, nums, dp, m);  // 选择捞菜后跳过m个时间点继续搜索
                dfs(t + 1, data, nums, dp, m);  // 不捞菜，继续搜索下一个时间点
            } else {
                dfs(t + 1, data, nums, dp, m);  // 如果当前时间点没有菜，直接搜索下一个时间点
            }
        }
    
        private static int getMax(List<Integer> list) {
            int max = Integer.MIN_VALUE;
            for (int num : list) {
                max = Math.max(max, num);  // 找出列表中的最大值
            }
            return max;
        }
    }
    

### Python 代码

    
    
    n, m = list(map(int, input().split()))  # 输入n和m，n代表菜的个数，m代表手速
    
    times = []  # 用来存储每个菜的时间
    for _ in range(n):
        start, duration = list(map(int, input().split()))  # 输入每个菜的开始时间和需要的时间
        times.append(start + duration)  # 将每个菜的结束时间存入times列表中
    
    nums = [0] * (max(times) + 1)  # 用来记录每个时间点是否有菜，初始化为0
    for t in times:
        nums[t] = 1  # 将有菜的时间点置为1
    
    dp = []  # 用来存储每种策略下能吃到的刚好合适的菜的数量
    
    def dfs(t, data):  # 深度优先搜索函数，t表示当前时间点，data表示当前策略下已经吃到的菜的数量
        if t >= len(nums):  # 如果当前时间点超过了最大时间点，说明已经搜索完所有时间点
            dp.append(sum(data))  # 将当前策略下吃到的菜的数量加入dp列表中
            return
        if nums[t] == 1:  # 如果当前时间点有菜
            dfs(t + m, data + [1])  # 选择捞菜，并将捞到的菜的数量加入data列表中
            dfs(t + 1, data)  # 不捞菜，继续搜索下一个时间点
        else:  # 如果当前时间点没有菜
            dfs(t + 1, data)  # 直接搜索下一个时间点
    
    dfs(1, [])  # 从第一个时间点开始搜索，初始策略下没有吃到任何菜
    
    print(max(dp))  # 输出最多能吃到的刚好合适的菜的数量
    

### JavaScript 代码

    
    
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    const lines = [];
    let n = 0, m = 0;
    
    rl.on('line', (line) => {
      lines.push(line);
      if (lines.length === 1) {
        const [nStr, mStr] = line.split(' ');  // 读取n和m，n代表菜的个数，m代表手速
        n = parseInt(nStr);
        m = parseInt(mStr);
      }
      if (n > 0 && lines.length === n + 1) {  // 当读取的行数等于n+1时，开始处理数据
        lines.shift();  // 移除第一行，因为已经读取了n和m
        const times = [];
        for (let i = 0; i < n; i++) {
          const [startStr, durationStr] = lines[i].split(' ');  // 读取每道菜的开始时间和持续时间
          const start = parseInt(startStr);
          const duration = parseInt(durationStr);
          times.push(start + duration);  // 计算每道菜的煮熟时间并存入times数组
        }
        const nums = new Array(Math.max(...times) + 1).fill(0);  // 创建一个数组标记时间点是否有菜
        for (let t of times) {
          nums[t] = 1;  // 将有菜的时间点标记为1
        }
        const dp = [];  // 用于存储不同策略下吃到的菜的数量
    
        function dfs(t, data) {  // 深度优先搜索函数
          if (t >= nums.length) {  // 如果时间点超出范围，计算当前策略的总菜数
            dp.push(data.reduce((a, b) => a + b, 0));  // 统计吃到的菜的总数并加入dp
            return;
          }
          if (nums[t] === 1) {  // 如果当前时间点有菜
            dfs(t + m, [...data, 1]);  // 选择捞菜后跳过m个时间点继续搜索
            dfs(t + 1, data);  // 不捞菜，继续搜索下一个时间点
          } else {
            dfs(t + 1, data);  // 当前时间点没有菜，直接搜索下一个时间点
          }
        }
    
        dfs(1, []);  // 从时间点1开始搜索
    
        console.log(Math.max(...dp));  // 输出最多能吃到的菜的数量
        rl.close();  // 关闭输入流
      }
    });
    

### C++ 代码

    
    
    #include <iostream>
    #include <vector>
    #include <algorithm>
    #include <numeric>
    
    using namespace std;
    
    void dfs(int t, vector<int>& nums, vector<int>& dp, vector<int>& data, int m) {
        if (t >= nums.size()) {  // 如果时间点超出范围
            dp.push_back(accumulate(data.begin(), data.end(), 0));  // 统计当前策略下吃到的菜的总数并加入dp
            return;
        }
        if (nums[t] == 1) {  // 如果当前时间点有菜
            data.push_back(1);  // 记录捞到的菜
            dfs(t + m, nums, dp, data, m);  // 选择捞菜后跳过m个时间点继续搜索
            data.pop_back();  // 撤销选择
        }
        dfs(t + 1, nums, dp, data, m);  // 不论是否捞菜，都继续搜索下一个时间点
    }
    
    int main() {
        int n, m;
        cin >> n >> m;  // 输入菜的个数n和手速m
        
        vector<int> times;
        for (int i = 0; i < n; i++) {
            int start, duration;
            cin >> start >> duration;  // 输入每道菜的开始时间和持续时间
            times.push_back(start + duration);  // 计算每道菜的煮熟时间并存入times数组
        }
        
        int maxTime = *max_element(times.begin(), times.end());  // 找到最大时间点
        vector<int> nums(maxTime + 1, 0);  // 创建一个数组标记时间点是否有菜
        for (int t : times) {
            nums[t] = 1;  // 将有菜的时间点标记为1
        }
        
        vector<int> dp;  // 用于存储不同策略下吃到的菜的数量
        vector<int> data;  // 用于存储当前策略
        dfs(1, nums, dp, data, m);  // 从时间点1开始搜索
        
        cout << *max_element(dp.begin(), dp.end()) << endl;  // 输出最多能吃到的菜的数量
        
        return 0;
    }
    

### C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    
    #define MAX_SIZE 1000  // 假定最多有1000个菜，可以根据实际需求调整
    
    // 用于获取数组中的最大值
    int getMax(int* array, int size) {
        int max = array[0];  // 假设第一个元素为最大值
        for (int i = 1; i < size; i++) {
            if (array[i] > max) {
                max = array[i];  // 更新最大值
            }
        }
        return max;
    }
    
    // 深度优先搜索函数
    void dfs(int t, int* data, int data_size, int* nums, int nums_size, int* dp, int* dp_size, int m) {
        if (t >= nums_size) {  // 如果当前时间点超出范围
            int sum = 0;
            for (int i = 0; i < data_size; i++) {
                sum += data[i];  // 统计当前策略下吃到的菜的数量
            }
            dp[(*dp_size)++] = sum;  // 将结果存储在dp数组中
            return;
        }
    
        if (nums[t] == 1) {  // 如果当前时间点有菜
            int* newData = (int*)malloc((data_size + 1) * sizeof(int));  // 创建新的策略数组
            for (int i = 0; i < data_size; i++) {
                newData[i] = data[i];  // 复制原来的策略
            }
            newData[data_size] = 1;  // 在当前策略中增加捞到的一道菜
            dfs(t + m, newData, data_size + 1, nums, nums_size, dp, dp_size, m);  // 选择捞菜后跳过m个时间点继续搜索
            free(newData);  // 释放动态分配的内存
            dfs(t + 1, data, data_size, nums, nums_size, dp, dp_size, m);  // 不捞菜，继续搜索下一个时间点
        } else {
            dfs(t + 1, data, data_size, nums, nums_size, dp, dp_size, m);  // 如果当前时间点没有菜，直接搜索下一个时间点
        }
    }
    
    int main() {
        int n, m;
        scanf("%d %d", &n, &m);  // 读取菜的个数n和手速m
    
        int times[MAX_SIZE];  // 用于存储每道菜煮熟的时间点
        for (int i = 0; i < n; i++) {
            int start, duration;
            scanf("%d %d", &start, &duration);  // 读取每道菜的开始时间和持续时间
            times[i] = start + duration;  // 计算并存储每道菜的煮熟时间
        }
    
        int max_time = getMax(times, n);  // 获取所有菜中最大的煮熟时间
        int nums[MAX_SIZE] = {0};  // 创建并初始化标记数组，用于标记每个时间点是否有菜
        for (int i = 0; i < n; i++) {
            nums[times[i]] = 1;  // 将有菜的时间点标记为1
        }
    
        int dp[MAX_SIZE] = {0};  // 用于存储不同策略下吃到的菜的数量
        int dp_size = 0;  // 当前存储的策略数
    
        int data[MAX_SIZE] = {0};  // 初始策略为空
        dfs(1, data, 0, nums, max_time + 1, dp, &dp_size, m);  // 从时间点1开始搜索
    
        int max = 0;
        for (int i = 0; i < dp_size; i++) {
            if (dp[i] > max) {
                max = dp[i];  // 找出能吃到最多菜的策略
            }
        }
    
        printf("%d\n", max);  // 输出最多能吃到的菜的数量
    
        return 0;
    }
    

## 以下是贪心的策略，比较简单

可以利用贪心算法的思想。由于每次捞菜后需要等待至少 `m` 秒，因此我们应尽可能选择合适的时间点捞菜。

实际上可以通过排序和简单的循环来直接计算最优解。将所有合适吃的菜按照时间排序，然后从第一个菜开始，逐步遍历，只要满足时间间隔，就可以直接计数，不需要额外的复杂状态维护。

  * 我们首先对所有菜按它们刚好合适吃的时间点进行升序排序。这种排序保证了我们可以从最早的合适的菜开始考虑，这样后续的每次捞菜都能够最大限度地利用前面的时间，从而不浪费任何一个合适的菜。
  * 因为菜的合适时间点是固定的，且捞菜后需要等待 `m` 秒才能捞下一道菜，因此，如果第一个合适的菜和第二个合适的菜之间的时间间隔小于 `m`，那么无论你选择先捞哪个菜，都无法在规定的时间内同时捞到两个菜。这意味着，如果我们不先捞第一个合适的菜，就有可能错过它，而开始从第二个菜捞起，这样并不会增加捞菜的数量，反而可能浪费机会。
  * 为了简化操作，我们直接选择第一个合适的必捞。如果不捞第一个合适的菜，那么后续的决策会变得复杂，因为要考虑什么时候开始捞，可能会错失一些机会。为了简化操作且保证不浪费任何机会，直接从第一个合适的菜开始捞是最优的策略。

### Java 代码

    
    
    import java.util.Arrays;
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            Scanner sc = new Scanner(System.in);
    
            int n = sc.nextInt();
            int m = sc.nextInt();
    
            int[] readyTimes = new int[n];
            for (int i = 0; i < n; i++) {
                readyTimes[i] = sc.nextInt() + sc.nextInt();
            }
    
            Arrays.sort(readyTimes); // 对所有菜的合适时间排序
    
            int count = 1;
            int lastTime = readyTimes[0];
    
            for (int i = 1; i < n; i++) {
                if (readyTimes[i] >= lastTime + m) { // 如果当前菜的合适时间满足时间间隔要求
                    count++;
                    lastTime = readyTimes[i]; // 更新最后捞菜时间
                }
            }
    
            System.out.println(count);
        }
    }
    

### Python 代码

    
    
    # 读取输入并计算最多能捞到的菜数
    
    n, m = map(int, input().split()) # 读取菜的数量n和手速m
    
    ready_times = []
    for _ in range(n):
        x, y = map(int, input().split()) # 读取每道菜的下锅时间x和煮熟时间y
        ready_times.append(x + y) # 计算并存储合适的时间
    
    ready_times.sort() # 对所有菜的合适时间进行排序
    
    count = 1 # 记录最多能捞到的菜数，第一个菜必捞
    last_time = ready_times[0] # 记录上次捞菜的时间
    
    for i in range(1, n):
        if ready_times[i] >= last_time + m: # 检查当前菜的合适时间是否满足时间间隔
            count += 1
            last_time = ready_times[i] # 更新最后捞菜时间
    
    print(count) # 输出最多能捞到的菜数
    

### JavaScript 代码

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    let input = [];
    
    rl.on('line', function (line) {
        input.push(line);
    }).on('close', function () {
        // 读取菜的数量n和手速m
        const [n, m] = input[0].split(' ').map(Number);
    
        const readyTimes = [];
        for (let i = 1; i <= n; i++) {
            const [x, y] = input[i].split(' ').map(Number); // 读取每道菜的下锅时间x和煮熟时间y
            readyTimes.push(x + y); // 计算并存储合适的时间
        }
    
        readyTimes.sort((a, b) => a - b); // 对所有菜的合适时间进行排序
    
        let count = 1; // 记录最多能捞到的菜数，第一个菜必捞
        let lastTime = readyTimes[0]; // 记录上次捞菜的时间
    
        for (let i = 1; i < n; i++) {
            if (readyTimes[i] >= lastTime + m) { // 检查当前菜的合适时间是否满足时间间隔
                count++;
                lastTime = readyTimes[i]; // 更新最后捞菜时间
            }
        }
    
        console.log(count); // 输出最多能捞到的菜数
    });
    

### C++ 代码

    
    
    #include <iostream>
    #include <algorithm> // 用于std::sort
    
    using namespace std;
    
    int main() {
        int n, m;
        cin >> n >> m; // 读取菜的数量n和手速m
    
        int readyTimes[n]; // 用于存储每道菜合适的时间
        for (int i = 0; i < n; i++) {
            int x, y;
            cin >> x >> y; // 读取每道菜的下锅时间x和煮熟时间y
            readyTimes[i] = x + y; // 计算并存储合适的时间
        }
    
        sort(readyTimes, readyTimes + n); // 对所有菜的合适时间进行排序
    
        int count = 1; // 记录最多能捞到的菜数，第一个菜必捞
        int lastTime = readyTimes[0]; // 记录上次捞菜的时间
    
        for (int i = 1; i < n; i++) {
            if (readyTimes[i] >= lastTime + m) { // 检查当前菜的合适时间是否满足时间间隔
                count++;
                lastTime = readyTimes[i]; // 更新最后捞菜时间
            }
        }
    
        cout << count << endl; // 输出最多能捞到的菜数
        return 0;
    }
    

### C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    
    int compare(const void *a, const void *b) {
        return (*(int *)a - *(int *)b); // 比较函数用于qsort排序
    }
    
    int main() {
        int n, m;
        scanf("%d %d", &n, &m); // 读取菜的数量n和手速m
    
        int readyTimes[n]; // 用于存储每道菜合适的时间
        for (int i = 0; i < n; i++) {
            int x, y;
            scanf("%d %d", &x, &y); // 读取每道菜的下锅时间x和煮熟时间y
            readyTimes[i] = x + y; // 计算并存储合适的时间
        }
    
        qsort(readyTimes, n, sizeof(int), compare); // 对所有菜的合适时间进行排序
    
        int count = 1; // 记录最多能捞到的菜数，第一个菜必捞
        int lastTime = readyTimes[0]; // 记录上次捞菜的时间
    
        for (int i = 1; i < n; i++) {
            if (readyTimes[i] >= lastTime + m) { // 检查当前菜的合适时间是否满足时间间隔
                count++;
                lastTime = readyTimes[i]; // 更新最后捞菜时间
            }
        }
    
        printf("%d\n", count); // 输出最多能捞到的菜数
        return 0;
    } 
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/1d6a7f8ceb6e79bba7c69f89ea1121b7.png)

#### 完整用例

##### 用例1

    
    
    2 1
    1 2
    2 1
    

##### 用例2

    
    
    3 2
    1 3
    2 2
    3 1
    

##### 用例3

    
    
    4 3
    1 2
    2 3
    3 4
    4 5
    

##### 用例4

    
    
    5 4
    1 1
    2 2
    3 3
    4 4
    5 5
    

##### 用例5

    
    
    6 5
    1 6
    2 5
    3 4
    4 3
    5 2
    6 1
    

##### 用例6

    
    
    10 5
    1 5
    2 10
    3 15
    4 20
    5 25
    6 30
    7 35
    8 40
    9 45
    10 50
    

##### 用例7

    
    
    10 10
    1 1
    2 2
    3 3
    4 4
    5 5
    6 6
    7 7
    8 8
    9 9
    10 10
    

##### 用例8

    
    
    10 8
    1 2
    2 4
    3 6
    4 8
    5 10
    6 12
    7 14
    8 16
    9 18
    10 20
    

##### 用例9

    
    
    15 3
    1 5
    2 10
    3 15
    4 20
    5 25
    6 30
    7 35
    8 40
    9 45
    10 50
    11 55
    12 60
    13 65
    14 70
    15 75
    

##### 用例10

    
    
    15 20
    1 1
    2 2
    3 3
    4 4
    5 5
    6 6
    7 7
    8 8
    9 9
    10 10
    11 11
    12 12
    13 13
    14 14
    15 15
    

