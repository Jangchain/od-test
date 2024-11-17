## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

#### 题目描述

用一个数组A代表程序员的工作能力，公司想通过结对编程的方式提高员工的能力，假设结对后的能力为两个员工的能力之和，求一共有多少种结对方式使结对后能力为N。

#### 输入描述

第一行为员工的总人数，取值范围[1,1000]

第二行为数组A的元素，每个元素的取值范围[1,1000]

第三行为N的值，取值范围[1,1000]

#### 输出描述

满足结对后能力为N的结对方式总数。

#### 用例

输入| 5  
1 2 2 2 3  
4  
---|---  
输出| 4  
说明| 满足要求的结对方式为：A[0]和A[4]，A[1]和A[2]，A[1]和A[3]，A[2]和A[3]。  
  
#### 解题思路

  1. 首先，读取员工总人数（`total`）。
  2. 接着，创建一个列表（`arr`）用于存储员工的工作能力，并读取每个员工的工作能力值。
  3. 然后，读取目标结对能力值（`n`）。
  4. 对员工工作能力列表进行排序（升序）。
  5. 初始化满足条件的结对方式总数（`ans`）为0，初始化左指针（`left`）为0，初始化右指针（`right`）为列表长度减1。
  6. 当左指针小于右指针时，执行以下操作：  
a. 计算当前左右指针指向的员工能力之和（`sum`）。  
b. 如果能力之和等于目标值N：  
i. 如果左右指针指向的员工能力相等，计算这种情况下的结对方式数，并累加到总数。然后跳出循环。  
ii.
否则，初始化左边相等员工能力的计数器（`count_left`）和右边相等员工能力的计数器（`count_right`）为1。计算左边相等员工能力的数量和右边相等员工能力的数量。计算这种情况下的结对方式数，并累加到总数。左指针右移，右指针左移。  
c. 如果能力之和小于目标值N，左指针右移。  
d. 如果能力之和大于目标值N，右指针左移。

  7. 输出满足条件的结对方式总数。

这个解题思路采用了双指针技巧，通过在排序后的员工能力列表上移动左右指针，寻找满足条件的结对方式。当找到满足条件的结对方式时，需要考虑两种情况：左右指针指向的员工能力相等，或者不相等。对于这两种情况，分别计算结对方式数，并累加到总数。最后，输出满足条件的结对方式总数。

#### C++

    
    
    #include <iostream>
    #include <vector>
    #include <algorithm>
    
    int main() {
        // 创建一个输入流对象用于读取输入
        std::ios::sync_with_stdio(false);
        std::cin.tie(nullptr);
    
        // 读取员工总人数
        int total;
        std::cin >> total;
    
        // 创建一个向量用于存储员工的工作能力
        std::vector<int> arr(total);
        // 读取每个员工的工作能力并存入向量
        for (int i = 0; i < total; i++) {
            std::cin >> arr[i];
        }
    
        // 读取目标结对能力值N
        int n;
        std::cin >> n;
    
        // 对员工工作能力向量进行排序
        std::sort(arr.begin(), arr.end());
    
        // 初始化满足条件的结对方式总数为0
        int ans = 0;
        // 初始化左指针
        int left = 0;
        // 初始化右指针
        int right = arr.size() - 1;
    
        // 当左指针小于右指针时，继续寻找满足条件的结对方式
        while (left < right) {
            // 计算当前左右指针指向的员工能力之和
            int sum = arr[left] + arr[right];
            // 如果能力之和等于目标值N
            if (sum == n) {
                // 如果左右指针指向的员工能力相等
                if (arr[left] == arr[right]) {
                    // 计算这种情况下的结对方式数，并累加到总数
                    ans += (right - left) * (right - left + 1) / 2;
                    break;
                } else {
                    // 初始化左边相等员工能力的计数器
                    int countLeft = 1;
                    // 初始化右边相等员工能力的计数器
                    int countRight = 1;
                    // 计算左边相等员工能力的数量
                    while (left + 1 < right && arr[left] == arr[left + 1]) {
                        left++;
                        countLeft++;
                    }
                    // 计算右边相等员工能力的数量
                    while (right - 1 > left && arr[right] == arr[right - 1]) {
                        right--;
                        countRight++;
                    }
                    // 计算这种情况下的结对方式数，并累加到总数
                    ans += countLeft * countRight;
                    // 左指针右移
                    left++;
                    // 右指针左移
                    right--;
                }
            } else if (sum < n) { // 如果能力之和小于目标值N
                // 左指针右移
                left++;
            } else { // 如果能力之和大于目标值N
                // 右指针左移
                right--;
            }
        }
    
        // 输出满足条件的结对方式总数
        std::cout << ans << std::endl;
    
        return 0;
    }
    
    

#### Java

    
    
    import java.util.Arrays;
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            // 创建一个Scanner对象用于读取输入
            Scanner sc = new Scanner(System.in);
    
            // 读取员工总人数
            int total = sc.nextInt();
    
            // 创建一个数组用于存储员工的工作能力
            int[] arr = new int[total];
            // 读取每个员工的工作能力并存入数组
            for (int i = 0; i < total; i++) {
                arr[i] = sc.nextInt();
            }
    
            // 读取目标结对能力值N
            int n = sc.nextInt();
    
            // 对员工工作能力数组进行排序
            Arrays.sort(arr);
    
            // 初始化满足条件的结对方式总数为0
            int ans = 0;
            // 初始化左指针
            int left = 0;
            // 初始化右指针
            int right = arr.length - 1;
    
            // 当左指针小于右指针时，继续寻找满足条件的结对方式
            while (left < right) {
                // 计算当前左右指针指向的员工能力之和
                int sum = arr[left] + arr[right];
                // 如果能力之和等于目标值N
                if (sum == n) {
                    // 如果左右指针指向的员工能力相等
                    if (arr[left] == arr[right]) {
                        // 计算这种情况下的结对方式数，并累加到总数
                        ans += (right - left) * (right - left + 1) / 2;
                        break;
                    } else {
                        // 初始化左边相等员工能力的计数器
                        int countLeft = 1;
                        // 初始化右边相等员工能力的计数器
                        int countRight = 1;
                        // 计算左边相等员工能力的数量
                        while (left + 1 < right && arr[left] == arr[left + 1]) {
                            left++;
                            countLeft++;
                        }
                        // 计算右边相等员工能力的数量
                        while (right - 1 > left && arr[right] == arr[right - 1]) {
                            right--;
                            countRight++;
                        }
                        // 计算这种情况下的结对方式数，并累加到总数
                        ans += countLeft * countRight;
                        // 左指针右移
                        left++;
                        // 右指针左移
                        right--;
                    }
                } else if (sum < n) { // 如果能力之和小于目标值N
                    // 左指针右移
                    left++;
                } else { // 如果能力之和大于目标值N
                    // 右指针左移
                    right--;
                }
            }
    
            // 输出满足条件的结对方式总数
            System.out.println(ans);
        }
    }
    
    

#### javaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    const input = [];
    
    rl.on('line', (line) => {
        input.push(line);
        if (input.length === 3) {
            main(input);
            rl.close();
        }
    });
    
    function main(input) {
        // 读取员工总人数
        const total = parseInt(input[0]);
    
        // 创建一个数组用于存储员工的工作能力
        const arr = input[1].split(' ').map(Number);
    
        // 读取目标结对能力值N
        const n = parseInt(input[2]);
    
        // 对员工工作能力数组进行排序
        arr.sort((a, b) => a - b);
    
        // 初始化满足条件的结对方式总数为0
        let ans = 0;
        // 初始化左指针
        let left = 0;
        // 初始化右指针
        let right = arr.length - 1;
    
        // 当左指针小于右指针时，继续寻找满足条件的结对方式
        while (left < right) {
            // 计算当前左右指针指向的员工能力之和
            const sum = arr[left] + arr[right];
            // 如果能力之和等于目标值N
            if (sum === n) {
                // 如果左右指针指向的员工能力相等
                if (arr[left] === arr[right]) {
                    // 计算这种情况下的结对方式数，并累加到总数
                    ans += (right - left) * (right - left + 1) / 2;
                    break;
                } else {
                    // 初始化左边相等员工能力的计数器
                    let countLeft = 1;
                    // 初始化右边相等员工能力的计数器
                    let countRight = 1;
                    // 计算左边相等员工能力的数量
                    while (left + 1 < right && arr[left] === arr[left + 1]) {
                        left++;
                        countLeft++;
                    }
                    // 计算右边相等员工能力的数量
                    while (right - 1 > left && arr[right] === arr[right - 1]) {
                        right--;
                        countRight++;
                    }
                    // 计算这种情况下的结对方式数，并累加到总数
                    ans += countLeft * countRight;
                    // 左指针右移
                    left++;
                    // 右指针左移
                    right--;
                }
            } else if (sum < n) { // 如果能力之和小于目标值N
                // 左指针右移
                left++;
            } else { // 如果能力之和大于目标值N
                // 右指针左移
                right--;
            }
        }
    
        // 输出满足条件的结对方式总数
        console.log(ans);
    }
    
    

#### Python

    
    
    def main():
        # 读取员工总人数
        total = int(input())
    
        # 创建一个列表用于存储员工的工作能力
        arr = list(map(int, input().split()))
    
        # 读取目标结对能力值N
        n = int(input())
    
        # 对员工工作能力列表进行排序
        arr.sort()
    
        # 初始化满足条件的结对方式总数为0
        ans = 0
        # 初始化左指针
        left = 0
        # 初始化右指针
        right = len(arr) - 1
    
        # 当左指针小于右指针时，继续寻找满足条件的结对方式
        while left < right:
            # 计算当前左右指针指向的员工能力之和
            sum = arr[left] + arr[right]
            # 如果能力之和等于目标值N
            if sum == n:
                # 如果左右指针指向的员工能力相等
                if arr[left] == arr[right]:
                    # 计算这种情况下的结对方式数，并累加到总数
                    ans += (right - left) * (right - left + 1) // 2
                    break
                else:
                    # 初始化左边相等员工能力的计数器
                    count_left = 1
                    # 初始化右边相等员工能力的计数器
                    count_right = 1
                    # 计算左边相等员工能力的数量
                    while left + 1 < right and arr[left] == arr[left + 1]:
                        left += 1
                        count_left += 1
                    # 计算右边相等员工能力的数量
                    while right - 1 > left and arr[right] == arr[right - 1]:
                        right -= 1
                        count_right += 1
                    # 计算这种情况下的结对方式数，并累加到总数
                    ans += count_left * count_right
                    # 左指针右移
                    left += 1
                    # 右指针左移
                    right -= 1
            elif sum < n:  # 如果能力之和小于目标值N
                # 左指针右移
                left += 1
            else:  # 如果能力之和大于目标值N
                # 右指针左移
                right -= 1
    
        # 输出满足条件的结对方式总数
        print(ans)
    
    
    if __name__ == '__main__':
        main()
    
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

