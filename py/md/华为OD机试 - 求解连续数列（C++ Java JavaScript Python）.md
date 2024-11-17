## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

#### 题目描述

已知连续正整数数列{K}=K1,K2,K3…Ki的各个数相加之和为S，i=N (0<S<100000, 0<N<100000), 求此数列K。

#### 输入描述

输入包含两个参数，1）连续正整数数列和S，2）数列里数的个数N。

#### 输出描述

如果有解输出数列K，如果无解输出-1。

#### 用例

输入| 525 6  
---|---  
输出| 85 86 87 88 89 90  
说明| 无  
  
#### 题目解析

解题方法：  
这个问题可以使用双指针方法解决。双指针方法是一种在数组或序列中查找特定条件的高效算法。在这个问题中，我们使用两个指针`left`和`right`来表示当前连续整数序列的起始和结束位置。通过移动这两个指针，我们可以在O(n)的时间复杂度内找到满足条件的序列。

具体来说，我们首先将左右指针初始化为1，表示当前序列只包含整数1。然后，我们根据当前和与目标和的关系来移动指针。如果当前和小于目标和，说明我们需要增加序列中的整数和，因此将右指针右移。如果当前和大于目标和，说明我们需要减少序列中的整数和，因此将左指针右移。如果当前和等于目标和，我们需要检查序列的长度是否满足条件。如果满足条件，输出序列并结束循环；否则，继续移动右指针。

代码过程：

  1. 首先，检查给定的序列长度`n`是否大于目标和`sum`。如果是，则输出-1，因为不可能存在这样的序列。
  2. 初始化左右指针（`left`和`right`）和当前和（`currentSum`）为1。
  3. 当右指针`right`小于等于目标和`sum`的一半加1时，继续循环。
  4. 在循环中，根据当前和`currentSum`与目标和`sum`的关系，进行以下操作： 
     * 如果当前和小于目标和，右指针右移并更新当前和。
     * 如果当前和大于目标和，左指针右移并更新当前和。
     * 如果当前和等于目标和，检查序列长度是否等于给定的长度`n`： 
       * 如果序列长度等于`n`，构建输出字符串并输出，然后跳出循环。
       * 如果序列长度不等于`n`，右指针右移并更新当前和。
  5. 如果循环结束后仍未找到满足条件的序列，输出-1。

#### C++

    
    
    #include <iostream>
    #include <sstream>
    #include <string>
    
    int main() {
        // 创建输入流对象以获取用户输入
        std::cin.sync_with_stdio(false);
    
        // 读取目标和与序列长度
        int sum, n;
        std::cin >> sum >> n;
    
        // 如果序列长度大于目标和，则输出-1
        if (n > sum) {
            std::cout << "-1" << std::endl;
        } else {
            // 初始化左右指针和当前和
            int left = 1;
            int right = 1;
            int currentSum = 1;
    
            // 创建字符串流对象以构建输出字符串
            std::ostringstream oss;
    
            // 当右指针小于等于目标和的一半加1时，继续循环
            while (right <= sum / 2 + 1) {
                // 如果当前和小于目标和，右指针右移并更新当前和
                if (currentSum < sum) {
                    right++;
                    currentSum += right;
                }
                // 如果当前和大于目标和，左指针右移并更新当前和
                else if (currentSum > sum) {
                    currentSum -= left;
                    left++;
                }
                // 如果当前和等于目标和
                else {
                    // 如果序列长度等于n，构建输出字符串并输出
                    if (right - left + 1 == n) {
                        for (int i = left; i <= right; i++) {
                            oss << i << " ";
                        }
                        std::cout << oss.str() << std::endl;
                        break;
                    }
                    // 如果序列长度不等于n，右指针右移并更新当前和
                    else {
                        right++;
                        currentSum += right;
                    }
                }
            }
    
            // 如果循环结束后仍未找到满足条件的序列，输出-1
            if (right > sum / 2 + 1) {
                std::cout << "-1" << std::endl;
            }
        }
    
        return 0;
    }
    
    
    

#### JavaScript

    
    
    const readline = require("readline");
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    
    // 读取目标和与序列长度
    rl.on("line", (input) => {
      const [sum, n] = input.split(" ").map(Number);
    
      // 如果序列长度大于目标和，则输出-1
      if (n > sum) {
        console.log("-1");
      } else {
        // 初始化左右指针和当前和
        let left = 1;
        let right = 1;
        let currentSum = 1;
    
        // 当右指针小于等于目标和的一半加1时，继续循环
        while (right <= Math.floor(sum / 2) + 1) {
          // 如果当前和小于目标和，右指针右移并更新当前和
          if (currentSum < sum) {
            right++;
            currentSum += right;
          }
          // 如果当前和大于目标和，左指针右移并更新当前和
          else if (currentSum > sum) {
            currentSum -= left;
            left++;
          }
          // 如果当前和等于目标和
          else {
            // 如果序列长度等于n，构建输出字符串并输出
            if (right - left + 1 === n) {
              console.log(Array.from({ length: n }, (_, i) => left + i).join(" "));
              break;
            }
            // 如果序列长度不等于n，右指针右移并更新当前和
            else {
              right++;
              currentSum += right;
            }
          }
        }
    
        // 如果循环结束后仍未找到满足条件的序列，输出-1
        if (right > Math.floor(sum / 2) + 1) {
          console.log("-1");
        }
      }
    
      rl.close();
    });
    
    
    

#### Java

    
    
    import java.util.Scanner;
    import java.util.StringJoiner;
    
    public class Main {
        public static void main(String[] args) {
            // 创建Scanner对象以获取用户输入
            Scanner sc = new Scanner(System.in);
    
            // 读取目标和与序列长度
            int sum = sc.nextInt();
            int n = sc.nextInt();
    
            // 如果序列长度大于目标和，则输出-1
            if (n > sum) {
                System.out.println("-1");
            } else {
                // 初始化左右指针和当前和
                int left = 1;
                int right = 1;
                int currentSum = 1;
    
                // 创建StringJoiner对象以构建输出字符串
                StringJoiner sj = new StringJoiner(" ");
    
                // 当右指针小于等于目标和的一半加1时，继续循环
                while (right <= sum / 2 + 1) {
                    // 如果当前和小于目标和，右指针右移并更新当前和
                    if (currentSum < sum) {
                        right++;
                        currentSum += right;
                    }
                    // 如果当前和大于目标和，左指针右移并更新当前和
                    else if (currentSum > sum) {
                        currentSum -= left;
                        left++;
                    }
                    // 如果当前和等于目标和
                    else {
                        // 如果序列长度等于n，构建输出字符串并输出
                        if (right - left + 1 == n) {
                            for (int i = left; i <= right; i++) {
                                sj.add(Integer.toString(i));
                            }
                            System.out.println(sj.toString());
                            break;
                        }
                        // 如果序列长度不等于n，右指针右移并更新当前和
                        else {
                            right++;
                            currentSum += right;
                        }
                    }
                }
    
                // 如果循环结束后仍未找到满足条件的序列，输出-1
                if (right > sum / 2 + 1) {
                    System.out.println("-1");
                }
            }
        }
    }
    
    

#### Python

    
    
    def main():
        # 读取目标和与序列长度
        sum, n = map(int, input().split())
    
        # 如果序列长度大于目标和，则输出-1
        if n > sum:
            print("-1")
        else:
            # 初始化左右指针和当前和
            left = 1
            right = 1
            current_sum = 1
    
            # 当右指针小于等于目标和的一半加1时，继续循环
            while right <= sum // 2 + 1:
                # 如果当前和小于目标和，右指针右移并更新当前和
                if current_sum < sum:
                    right += 1
                    current_sum += right
                # 如果当前和大于目标和，左指针右移并更新当前和
                elif current_sum > sum:
                    current_sum -= left
                    left += 1
                # 如果当前和等于目标和
                else:
                    # 如果序列长度等于n，构建输出字符串并输出
                    if right - left + 1 == n:
                        print(" ".join(str(i) for i in range(left, right + 1)))
                        break
                    # 如果序列长度不等于n，右指针右移并更新当前和
                    else:
                        right += 1
                        current_sum += right
            else:
                # 如果循环结束后仍未找到满足条件的序列，输出-1
                print("-1")
    
    
    if __name__ == "__main__":
        main()
    
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

