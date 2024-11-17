#### 题目描述

小华和小薇一起通过玩积木游戏学习数学。  
他们有很多积木，每个积木块上都有一个数字，积木块上的数字可能相同。  
小华随机拿一些积木挨着排成一排，请小薇找到这排积木中数字相同且所处位置最远的2块积木块，计算他们的距离，小薇请你帮忙替她解决这个问题。

#### 输入描述

第一行输入为N，表示小华排成一排的积木总数。  
接下来N行每行一个数字，表示小华排成一排的积木上数字。

#### 输出描述

相同数字的积木的位置最远距离；如果所有积木数字都不相同，请返回-1。

#### 备注

  * 0<=积木上的数字<10^9
  * 1<=积木长度<=10^5

#### 用例

输入| 5  
1  
2  
3  
1  
4  
---|---  
输出| 3  
说明| 共有5个积木，第1个积木和第4个积木数字相同，其距离为3。  
输入| 2  
1  
2  
---|---  
输出| -1  
说明| 一共有两个积木，没有积木数字相同，返回-1。  
  
####

#### C++

    
    
    #include <iostream>
    #include <vector>
    #include <map>
    
    using namespace std;
    
    int main() {
        int n;
        cin >> n; // 输入小华排成一排的积木总数
    
        vector<int> nums;
        for (int i = 0; i < n; i++) {
            int num;
            cin >> num; // 输入小华排成一排的积木上数字
            nums.push_back(num);
        }
    
        map<int, int> numIdx; // 记录每个数字出现的最远位置
    
        int ans = -1;
        for (int i = 0; i < nums.size(); i++) {
            int num = nums[i];
            if (numIdx.count(num)) {
                ans = max(ans, i - numIdx[num]); // 更新最大距离
            } else {
                numIdx[num] = i;
            }
        }
    
        cout << ans << endl; // 输出相同数字的积木的位置最远距离；如果所有积木数字都不相同，请返回-1。
    
        return 0;
    }
    

#### JavaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    let n = 0; // 初始化n
    let nums = []; // 初始化nums数组
    
    // 监听line事件，每当有一行输入时触发回调函数
    rl.on('line', (input) => {
      if (n === 0) { // 如果n还未被赋值
        n = parseInt(input); // 将输入的第一行作为n的值
      } else { // 如果n已经被赋值
        nums.push(parseInt(input)); // 将输入的数字加入nums数组
        if (nums.length === n) { // 如果nums数组已经有n个数字
          const numIdx = new Map(); // 记录每个数字出现的最远位置
    
          let ans = -1;
          for (let i = 0; i < nums.length; i++) {
            const num = nums[i];
            if (numIdx.has(num)) {
              ans = Math.max(ans, i - numIdx.get(num)); // 更新最大距离
            } else {
              numIdx.set(num, i);
            }
          }
    
          console.log(ans); // 输出相同数字的积木的位置最远距离；如果所有积木数字都不相同，请返回-1。
        }
      }
    });
    

#### Java

    
    
    import java.util.*;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            int n = scanner.nextInt(); // 输入小华排成一排的积木总数
    
            List<Integer> nums = new ArrayList<>();
            for (int i = 0; i < n; i++) {
                nums.add(scanner.nextInt()); // 输入小华排成一排的积木上数字
            }
    
            Map<Integer, Integer> numIdx = new HashMap<>(); // 记录每个数字出现的最远位置
    
            int ans = -1;
            for (int i = 0; i < nums.size(); i++) {
                int num = nums.get(i);
                if (numIdx.containsKey(num)) {
                    ans = Math.max(ans, i - numIdx.get(num)); // 更新最大距离
                } else {
                    numIdx.put(num, i);
                }
            }
    
            System.out.println(ans); // 输出相同数字的积木的位置最远距离；如果所有积木数字都不相同，请返回-1。
        }
    }
    

#### Python

    
    
    import sys
    
    n = int(input()) # 输入小华排成一排的积木总数
    
    nums = []
    for i in range(n):
        nums.append(int(input())) # 输入小华排成一排的积木上数字
    
    numIdx = {} # 记录每个数字出现的最远位置
    
    ans = -1
    for i in range(len(nums)):
        num = nums[i]
        if num in numIdx:
            ans = max(ans, i - numIdx[num]) # 更新最大距离
        else:
            numIdx[num] = i
    
    print(ans) # 输出相同数字的积木的位置最远距离；如果所有积木数字都不相同，请返回-1。
    

#### 文章目录

  *     *       * 题目描述
      * 输入描述
      * 输出描述
      * 备注
      * 用例
      *       * C++
      * JavaScript
      * Java
      * Python

![fengmian](https://img-
blog.csdnimg.cn/img_convert/1d2f33ed8cf2fb1b9a4fe09513f7aa94.png)

