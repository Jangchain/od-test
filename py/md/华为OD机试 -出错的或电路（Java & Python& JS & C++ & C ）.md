## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

某生产门电路的厂商发现某一批次的或门电路不稳定，具体现象为计算两个二进制数的或操作时，第一个二进制数中某两个比特位会出现交换，交换的比特位置是随机的，但只交换这两个位，其他位不变。

很明显，这个交换可能会影响最终的或结果，也可能不会有影响。

为了评估影响和定位出错的根因，工程师需要研究在各种交换的可能下，最终的或结果发生改变的情况有多少种。

## 输入描述

第一行有一个正整数N; 其中1≤N≤1000000。  
第二行有一个长为N的二进制数，表示与电路的第一个输入数，即会发生比特交换的输入数。  
第三行有一个长为N的二进制数，表示与电路的第二个输入数。注意第二个输入数不会发生比特交换。

## 输出描述

输出只有一个整数，表示会影响或结果的交换方案个数。

## 示例1

输入

    
    
    3
    010
    110
    

输出

    
    
    1
    

说明

> 原本010和110的或结果是110，但第一个输入数可能会发生如下三种交换：
>
> 1、交换第1个比特和第2个比特，第一个输入数变为100，计算结果为110，计算结果不变  
>  2、交换第1个比特和第3个比特，第一个输入数变为010，计算结果为110，计算结果不变  
>  3、交换第2个比特和第3个比特，第一个输入数变为001，计算结果为111，计算结果改变  
>  故只有一种交换会改变计算结果。

## 示例2

输入

    
    
    6
    011011
    110110 
    

输出

    
    
    4
    

说明

> 原本011011和110110的或结果是111111，但是第一个输入数发生如下比特交换会影响最终计算结果：
>
> 1、交换第1个比特和第3个比特，第一个输入数变为110011，计算结果变为110111
>
> 2、交换第1个比特和第6个比特，第一个输入数变为111010，计算结果变为111110
>
> 3、交换第3个比特和第4个比特，第一个输入数变为010111，计算结果变为110111
>
> 4、交换第4个比特和第6个比特，第一个输入数变为011110，计算结果变为111100
>
> 其他交换都不会影响计算结果，故输出4.

## 解题思路

#### 题目中的“或”运算

在二进制中，“或”运算的规则是：如果两个对应位置的位中有一个为1，结果就是1；如果两个都为0，结果才是0。

#### 示例解释

##### 示例1

  * 输入：
    
        N = 3
    第一个输入数 = 010
    第二个输入数 = 110
    

  * 不做交换时，“或”结果是 `110`。
  * 考虑所有可能的交换： 
    1. 交换第1和第2位，得到第一个输入数 `100`，结果仍然是 `110`。
    2. 交换第1和第3位，得到第一个输入数 `010`，结果仍然是 `110`。
    3. 交换第2和第3位，得到第一个输入数 `001`，结果变为 `111`，与原始结果不同。
  * 只有第三种交换会改变结果，因此输出 `1`。

##### 示例2

  * 输入：
    
        N = 6
    第一个输入数 = 011011
    第二个输入数 = 110110
    

  * 原始“或”运算结果是 `111111`。
  * 列出所有可能导致不同结果的交换方案，共4种，因此输出 `4`。

#### 关键点

  * 枚举第一个输入数的所有比特位对（组合），假设它们进行了交换，检查是否导致“或”运算结果变化。
  * 如果变化，则计入总数。

### 思路

在给定两个二进制字符串时，我们需要统计四种不同位的组合来简化逻辑判断。可以使用以下步骤来实现：

  1. 遍历两个字符串，并分别统计以下位数：

     * `count_01`：第一个字符串在该位为 `0` 且第二个字符串在该位为 `1` 的数量。
     * `count_10`：第一个字符串在该位为 `1` 且第二个字符串在该位为 `0` 的数量。
     * `count_00`：第一个字符串在该位为 `0` 且第二个字符串在该位为 `0` 的数量。
     * `count_11`：第一个字符串在该位为 `1` 且第二个字符串在该位为 `1` 的数量。
  2. 根据统计的结果，我们可以得出交换导致结果变化的方案数量公式：

     * `count_01 * count_10`：第一个字符串为 `0` 且第二个字符串为 `1` 的位，与第一个字符串为 `1` 且第二个字符串为 `0` 的位交换会导致结果变化。
     * `count_00 * (count_10 + count_11)`：第一个字符串为 `0` 且第二个字符串为 `0` 的位，与其他任何为 `1` 的位交换会导致结果变化。
  3. 最终表达式为：  
total_result = count_01 × count_10 \+ count_00 × ( count_10 \+ count_11 )
\text{total\\_result} = \text{count\\_01} \times \text{count\\_10} +
\text{count\\_00} \times (\text{count\\_10} + \text{count\\_11})
total_result=count_01×count_10+count_00×(count_10+count_11)

这样设计逻辑不仅简化了复杂判断，还避免了重复计数。公式本身清晰直观，不需要进一步去重或复杂处理。

#### 示例

    
    
    6
    011011
    110110
    

其中：

  * `n = 6`，表示二进制数的位数。
  * `bin1 = "011011"` 是第一个二进制字符串。
  * `bin2 = "110110"` 是第二个二进制字符串。

#### 逐步解析

  1. **变量初始化** ：

     * `count_01`：统计 `bin1` 为 `0` 且 `bin2` 为 `1` 的位数。
     * `count_10`：统计 `bin1` 为 `1` 且 `bin2` 为 `0` 的位数。
     * `count_00`：统计 `bin1` 为 `0` 且 `bin2` 为 `0` 的位数。
     * `count_11`：统计 `bin1` 为 `1` 且 `bin2` 为 `1` 的位数。
  2. **统计每种情况的位数** ：

     * 逐位遍历 `bin1` 和 `bin2`。
     * 根据当前位的组合情况 (`00`, `01`, `10`, `11`)，对应增加相应的计数器。

##### 遍历结果（逐位分析）：

     * 第 1 位：`bin1` 为 `0`，`bin2` 为 `1`，因此 `count_01++`，得到 `count_01 = 1`。
     * 第 2 位：`bin1` 为 `1`，`bin2` 为 `1`，因此 `count_11++`，得到 `count_11 = 1`。
     * 第 3 位：`bin1` 为 `1`，`bin2` 为 `0`，因此 `count_10++`，得到 `count_10 = 1`。
     * 第 4 位：`bin1` 为 `0`，`bin2` 为 `1`，因此 `count_01++`，得到 `count_01 = 2`。
     * 第 5 位：`bin1` 为 `1`，`bin2` 为 `1`，因此 `count_11++`，得到 `count_11 = 2`。
     * 第 6 位：`bin1` 为 `1`，`bin2` 为 `0`，因此 `count_10++`，得到 `count_10 = 2`。

最终统计结果：

     * `count_01 = 2`
     * `count_10 = 2`
     * `count_00 = 0`
     * `count_11 = 2`
  3. **计算最终结果** ：

     * 根据公式：  
result = count_01 × count_10 \+ count_00 × ( count_10 \+ count_11 )
\text{result} = \text{count\\_01} \times \text{count\\_10} + \text{count\\_00}
\times (\text{count\\_10} + \text{count\\_11})
result=count_01×count_10+count_00×(count_10+count_11)

     * 代入统计结果：  
result = 2 × 2 \+ 0 × ( 2 \+ 2 ) = 4 \+ 0 = 4 \text{result} = 2 \times 2 + 0
\times (2 + 2) = 4 + 0 = 4 result=2×2+0×(2+2)=4+0=4

  4. **输出结果** ：

     * `System.out.println(result);` 输出 `4`。

#### 总结

该代码的运行结果为 `4`，代表在满足题意的交换条件下可以导致结果变化的交换方案数为 4。

## Java

    
    
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            int n = scanner.nextInt(); // 输入的二进制数的位数
            String bin1 = scanner.next(); // 第一个二进制数
            String bin2 = scanner.next(); // 第二个二进制数
    
            // 定义四种统计计数器
            int count_01 = 0; // bin1 为 0 且 bin2 为 1 的位数量
            int count_10 = 0; // bin1 为 1 且 bin2 为 0 的位数量
            int count_00 = 0; // bin1 为 0 且 bin2 为 0 的位数量
            int count_11 = 0; // bin1 为 1 且 bin2 为 1 的位数量
    
            // 遍历每一位，根据 bin1 和 bin2 的情况进行分类统计
            for (int i = 0; i < n; i++) {
                char b1 = bin1.charAt(i);
                char b2 = bin2.charAt(i);
    
                if (b1 == '0' && b2 == '1') {
                    count_01++;
                } else if (b1 == '1' && b2 == '0') {
                    count_10++;
                } else if (b1 == '0' && b2 == '0') {
                    count_00++;
                } else if (b1 == '1' && b2 == '1') {
                    count_11++;
                }
            }
    
            // 根据公式计算最终结果
            int result = count_01 * count_10 + count_00 * (count_10 + count_11);
            System.out.println(result);
        }
    }
    
    

## Python

    
    
     
    n = int(input())  # 输入的二进制数的位数
    bin1 = input()  # 第一个二进制数
    bin2 = input()  # 第二个二进制数
    
    # 定义四种统计计数器
    count_01 = 0  # bin1 为 0 且 bin2 为 1 的位数量
    count_10 = 0  # bin1 为 1 且 bin2 为 0 的位数量
    count_00 = 0  # bin1 为 0 且 bin2 为 0 的位数量
    count_11 = 0  # bin1 为 1 且 bin2 为 1 的位数量
    
    # 遍历每一位，根据 bin1 和 bin2 的情况进行分类统计
    for i in range(n):
        b1 = bin1[i]
        b2 = bin2[i]
    
        if b1 == '0' and b2 == '1':
            count_01 += 1
        elif b1 == '1' and b2 == '0':
            count_10 += 1
        elif b1 == '0' and b2 == '0':
            count_00 += 1
        elif b1 == '1' and b2 == '1':
            count_11 += 1
    
    # 根据公式计算最终结果
    result = count_01 * count_10 + count_00 * (count_10 + count_11)
    print(result)  # 输出结果
    
    

## JavaScript

    
    
    const readline = require('readline');
    
    // 创建接口用于用户输入
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    rl.on("line", function(n) {
        rl.on("line", function(bin1) {
            rl.on("line", function(bin2) {
                n = parseInt(n); // 转换输入的位数为整数
    
                // 定义四种统计计数器
                let count_01 = 0; // bin1 为 0 且 bin2 为 1 的位数量
                let count_10 = 0; // bin1 为 1 且 bin2 为 0 的位数量
                let count_00 = 0; // bin1 为 0 且 bin2 为 0 的位数量
                let count_11 = 0; // bin1 为 1 且 bin2 为 1 的位数量
    
                // 遍历每一位，根据 bin1 和 bin2 的情况进行分类统计
                for (let i = 0; i < n; i++) {
                    const b1 = bin1[i];
                    const b2 = bin2[i];
    
                    if (b1 === '0' && b2 === '1') {
                        count_01++;
                    } else if (b1 === '1' && b2 === '0') {
                        count_10++;
                    } else if (b1 === '0' && b2 === '0') {
                        count_00++;
                    } else if (b1 === '1' && b2 === '1') {
                        count_11++;
                    }
                }
    
                // 根据公式计算最终结果
                const result = count_01 * count_10 + count_00 * (count_10 + count_11);
                console.log(result); // 输出结果
                rl.close();
            });
        });
    });
    
    

## C++

    
    
    #include <iostream>
    #include <string>
    using namespace std;
    
    int main() {
        int n;
      
        cin >> n; // 输入的二进制数的位数
        string bin1, bin2;
      
        cin >> bin1; // 第一个二进制数
     
        cin >> bin2; // 第二个二进制数
    
        // 定义四种统计计数器
        int count_01 = 0; // bin1 为 0 且 bin2 为 1 的位数量
        int count_10 = 0; // bin1 为 1 且 bin2 为 0 的位数量
        int count_00 = 0; // bin1 为 0 且 bin2 为 0 的位数量
        int count_11 = 0; // bin1 为 1 且 bin2 为 1 的位数量
    
        // 遍历每一位，根据 bin1 和 bin2 的情况进行分类统计
        for (int i = 0; i < n; i++) {
            char b1 = bin1[i];
            char b2 = bin2[i];
    
            if (b1 == '0' && b2 == '1') {
                count_01++;
            } else if (b1 == '1' && b2 == '0') {
                count_10++;
            } else if (b1 == '0' && b2 == '0') {
                count_00++;
            } else if (b1 == '1' && b2 == '1') {
                count_11++;
            }
        }
    
        // 根据公式计算最终结果
        int result = count_01 * count_10 + count_00 * (count_10 + count_11);
        cout << result << endl; // 输出结果
    
        return 0;
    }
    
    

## C语言

    
    
    #include <stdio.h>
    #include <string.h>
    
    int main() {
        int n;
     
        scanf("%d", &n); // 输入的二进制数的位数
        char bin1[100], bin2[100];
      
        scanf("%s", bin1); // 第一个二进制数
     
        scanf("%s", bin2); // 第二个二进制数
    
        // 定义四种统计计数器
        int count_01 = 0; // bin1 为 0 且 bin2 为 1 的位数量
        int count_10 = 0; // bin1 为 1 且 bin2 为 0 的位数量
        int count_00 = 0; // bin1 为 0 且 bin2 为 0 的位数量
        int count_11 = 0; // bin1 为 1 且 bin2 为 1 的位数量
    
        // 遍历每一位，根据 bin1 和 bin2 的情况进行分类统计
        for (int i = 0; i < n; i++) {
            char b1 = bin1[i];
            char b2 = bin2[i];
    
            if (b1 == '0' && b2 == '1') {
                count_01++;
            } else if (b1 == '1' && b2 == '0') {
                count_10++;
            } else if (b1 == '0' && b2 == '0') {
                count_00++;
            } else if (b1 == '1' && b2 == '1') {
                count_11++;
            }
        }
    
        // 根据公式计算最终结果
        int result = count_01 * count_10 + count_00 * (count_10 + count_11);
        printf("%d\n", result); // 输出结果
    
        return 0;
    }
    
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

#### 完整用例

##### 用例1

    
    
    3
    010
    110
    

##### 用例2

    
    
    4
    1010
    1111
    

##### 用例3

    
    
    5
    01101
    10010
    

##### 用例4

    
    
    6
    110011
    101010
    

##### 用例5

    
    
    7
    1010101
    1111111
    

##### 用例6

    
    
    10
    1101100101
    1011010101
    

##### 用例7

    
    
    8
    11111111
    00000000
    

##### 用例8

    
    
    12
    110011001100
    101010101010
    

##### 用例9

    
    
    16
    1010101010101010
    0101010101010101
    

##### 用例10

    
    
    20
    10101010101010101010
    01010101010101010101
    

