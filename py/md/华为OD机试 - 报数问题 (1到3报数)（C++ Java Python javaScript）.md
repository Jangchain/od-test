#### 题目描述

有n个人围成一圈，顺序排号为1-n。

从第一个人开始报数(从1到3报数)，凡报到3的人退出圈子，问最后留下的是原来第几号的那位。

#### 输入描述

输入人数n（n < 1000）

#### 输出描述

输出最后留下的是原来第几号

#### 用例

输入| 2  
---|---  
输出| 2  
说明| 报数序号为1的人最终报3，因此序号1的人退出圈子，最后剩下序号为2的那位  
  
#### 解题思路

  1. 从用户输入中读取人数 `n`。
  2. 创建一个列表 `nums`，用于存储编号为 1 到 n 的人。
  3. 使用一个循环将编号为 1 到 n 的人添加到 `nums` 列表中。
  4. 初始化一个名为 `count` 的整数变量，用于计数报数，初始值为 3。
  5. 使用一个 `while` 循环，当 `nums` 列表的大小大于 1 时，继续进行报数和移除操作。 
    1. 使用一个内部 `while` 循环，当 `nums` 列表的大小大于 1 且 `count` 大于 1 时，将报数的人移动到队尾。这可以通过将列表中的第一个元素添加到列表末尾，然后从列表中移除第一个元素来实现。同时，将 `count` 减 1。
    2. 如果 `nums` 列表的大小小于等于 1，跳出循环。
    3. 如果 `count` 等于 1，从列表中移除报数为 3 的人，并将 `count` 重置为 3。
  6. 输出最后留下的人的原始编号。

#### C++

    
    
    #include <iostream>
    #include <vector>
    using namespace std;
    
    int main() {
        int n;
        // 读取输入的人数n
        cin >> n;
        vector<int> nums;
        // 初始化编号为1到n的人的向量
        for (int i = 1; i <= n; i++) {
            nums.push_back(i);
        }
        // 初始化报数计数器，从3开始
        int count = 3;
        // 当向量中的人数大于1时，继续循环
        while (nums.size() > 1) {
            // 当向量中的人数大于1且报数计数器大于1时，将当前人移到向量末尾，并减小报数计数器
            while (nums.size() > 1 && count > 1) {
                nums.push_back(nums[0]);
                nums.erase(nums.begin());
                count--;
            }
            // 如果向量中的人数小于等于1，跳出循环
            if (nums.size() <= 1) {
                break;
            }
            // 当报数计数器为1时，将当前人移出向量，并重置报数计数器为3
            if (count == 1) {
                nums.erase(nums.begin());
                count = 3;
            }
        }
        // 输出最后留下的人的原始编号
        cout << nums[0] << endl;
        return 0;
    }
    
    

#### javaScript

    
    
    // 引入 readline 模块，用于从命令行读取输入
    const readline = require('readline');
    
    // 创建 readline 接口，用于处理输入和输出
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    // 当接收到一行输入时，执行以下回调函数
    rl.on('line', (n) => {
      // 初始化一个数组 nums，用于存储编号为 1 到 n 的人
      const nums = [];
      for (let i = 1; i <= n; i++) {
        nums.push(i);
      }
    
      // 初始化报数计数器 count 为 3
      let count = 3;
    
      // 当 nums 中剩余人数大于 1 时，继续执行循环
      while (nums.length > 1) {
        // 当 nums 中剩余人数大于 1 且 count 大于 1 时，将第一个人移到队尾，并将 count 减 1
        while (nums.length > 1 && count > 1) {
          nums.push(nums[0]);
          nums.shift();
          count--;
        }
    
        // 如果 nums 中剩余人数小于等于 1，跳出循环
        if (nums.length <= 1) {
          break;
        }
    
        // 如果 count 等于 1，将第一个人移出队列，并将 count 重置为 3
        if (count === 1) {
          nums.shift();
          count = 3;
        }
      }
    
      // 输出最后留下的人的原始编号
      console.log(nums[0]);
    
      // 关闭 readline 接口
      rl.close();
    });
    
    

#### Java

    
    
    import java.util.ArrayList;
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            // 创建一个Scanner对象用于读取用户输入
            Scanner scanner = new Scanner(System.in);
            // 读取输入的人数n
            int n = scanner.nextInt();
            // 创建一个ArrayList用于存储编号为1到n的人
            ArrayList<Integer> nums = new ArrayList<>();
            // 将编号为1到n的人添加到ArrayList中
            for (int i = 1; i <= n; i++) {
                nums.add(i);
            }
            // 初始化报数计数器，从3开始
            int count = 3;
            // 当圈子中的人数大于1时，继续报数和移除人
            while (nums.size() > 1) {
                // 当圈子中的人数大于1且报数计数器大于1时，将报数的人移到圈子的末尾
                while (nums.size() > 1 && count > 1) {
                    nums.add(nums.get(0));
                    nums.remove(0);
                    count--;
                }
                // 当圈子中的人数小于等于1时，跳出循环
                if (nums.size() <= 1) {
                    break;
                }
                // 当报数计数器为1时，移除报数为3的人，并重置报数计数器为3
                if (count == 1) {
                    nums.remove(0);
                    count = 3;
                }
            }
            // 输出最后留下的人的原始编号
            System.out.println(nums.get(0));
        }
    }
    
    

#### Python

    
    
    # 读取输入的人数 n
    n = int(input())
    # 创建一个列表用于存储编号为 1 到 n 的人
    nums = []
    # 将编号为 1 到 n 的人添加到列表中
    for i in range(1, n+1):
        nums.append(i)
    # 初始化报数计数器为 3
    count = 3
    # 当圈子中剩余人数大于 1 时，继续进行报数和移除操作
    while len(nums) > 1:
        # 当圈子中剩余人数大于 1 且报数计数器大于 1 时，将报数的人移动到队尾
        while len(nums) > 1 and count > 1:
            nums.append(nums[0])
            nums.pop(0)
            count -= 1
        # 当圈子中剩余人数小于等于 1 时，跳出循环
        if len(nums) <= 1:
            break
        # 当报数计数器等于 1 时，移除报数为 3 的人，并重置报数计数器为 3
        if count == 1:
            nums.pop(0)
            count = 3
    # 输出最后留下的人的原始编号
    print(nums[0])
    
    

#### 文章目录

  *     *       * 题目描述
      * 输入描述
      * 输出描述
      * 用例
      * 解题思路
      * C++
      * javaScript
      * Java
      * Python

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

