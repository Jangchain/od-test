#### 题目描述

给定一个小写字母组成的字符串 s，请找出字符串中两个不同位置的字符作为分割点，使得字符串分成三个连续子串且子串权重相等，注意子串不包含分割点。

若能找到满足条件的两个分割点，请输出这两个分割点在字符串中的位置下标，若不能找到满足条件的分割点请返回0,0。

子串权重计算方式为:子串所有字符的ASCII码数值之和。

#### 输入描述

输入为一个字符串，字符串由a~z，26个小写字母组成，5 ≤ 字符串长度 ≤ 200。

#### 输出描述

输出为两个分割点在字符串中的位置下标，以逗号分隔

#### 备注

只考虑唯一解，不存在一个输入多种输出解的情况

#### 用例

输入| acdbbbca  
---|---  
输出| 2,5  
说明| 以位置2和5作为分割点，将字符串分割为ac，bb，ca三个子串，每一个的子串权重都为196，输出为：2,5  
输入| abcabc  
---|---  
输出| 0,0  
说明| 找不到符合条件的分割点，输出为：0,0  
  
#### 解题思路

  1. 读取输入字符串

  2. 计算前缀和数组：为了方便计算子串的权重，我们创建一个前缀和数组，数组的每个元素表示从输入字符串的起始位置到当前位置的字符权重之和。权重可以是字符的 ASCII 码值。这样，我们可以通过前缀和数组快速计算任意子串的权重。

  3. 初始化结果和分割点：我们初始化结果为 “0,0”，表示没有找到满足条件的分割点。同时，我们初始化两个分割点，第一个分割点为 1，第二个分割点为 3。

  4. 遍历分割点：我们使用一个循环来遍历所有可能的分割点组合。在每次循环中，我们计算三个子串的权重，然后根据子串权重来调整分割点。

a.
计算三个子串的权重：我们使用前缀和数组来计算三个子串的权重。具体来说，我们分别计算从起始位置到第一个分割点、从第一个分割点到第二个分割点、从第二个分割点到字符串末尾的子串权重。

b. 判断是否满足条件：如果三个子串的权重相等，说明我们找到了满足条件的分割点。此时，我们更新结果为当前分割点组合，并跳出循环。

c.
调整分割点：如果三个子串的权重不相等，我们需要调整分割点。具体来说，如果第一个子串的权重小于等于第二个子串的权重，我们将第一个分割点向右移动一位；否则，我们将第二个分割点向右移动一位。这样，我们可以保证在尽可能短的时间内找到满足条件的分割点。

  5. 输出结果：最后，我们输出结果，即满足条件的分割点组合。如果没有找到满足条件的分割点，结果将保持为 “0,0”。

#### C++

    
    
    #include <iostream>
    #include <string>
    #include <vector>
    
    int main() {
        // 读取输入字符串
        std::string inputStr;
        std::getline(std::cin, inputStr);
    
        // 获取字符串长度
        int strLength = inputStr.length();
    
        // 创建前缀和数组，用于存储子串权重
        std::vector<int> prefixSum(strLength + 1, 0);
        // 计算前缀和数组
        for (int i = 1; i <= strLength; i++) {
            prefixSum[i] = prefixSum[i - 1] + inputStr[i - 1];
        }
    
        // 初始化结果为 "0,0"
        std::string result = "0,0";
        // 初始化两个分割点
        int firstSplit = 1, secondSplit = 3;
        // 当分割点在字符串范围内时，继续循环
        while (firstSplit < strLength && secondSplit < strLength) {
            // 计算三个子串的权重
            int sum1 = prefixSum[firstSplit] - prefixSum[0];
            int sum2 = prefixSum[secondSplit] - prefixSum[firstSplit + 1];
            int sum3 = prefixSum[strLength] - prefixSum[secondSplit + 1];
    
            // 如果三个子串的权重相等，则找到满足条件的分割点
            if (sum1 == sum2 && sum2 == sum3) {
                result = std::to_string(firstSplit) + "," + std::to_string(secondSplit);
                break;
            }
    
            // 根据子串权重调整分割点
            if (sum1 <= sum2) {
                firstSplit++;
            } else {
                secondSplit++;
            }
        }
    
        // 输出结果
        std::cout << result << std::endl;
    
        return 0;
    }
    
    

#### Java

    
    
    import java.util.Scanner;
    
    public class Main {
    
        public static void main(String[] args) {
            // 创建 Scanner 对象以读取输入
            Scanner sc = new Scanner(System.in);
            // 读取输入字符串
            String inputStr = sc.nextLine();
            // 将输入字符串转换为字符数组
            char[] chars = inputStr.toCharArray();
            // 获取字符串长度
            int strLength = chars.length;
    
            // 创建前缀和数组，用于存储子串权重
            int[] prefixSum = new int[strLength + 1];
            // 计算前缀和数组
            for (int i = 1; i <= strLength; i++) {
                prefixSum[i] = prefixSum[i - 1] + chars[i - 1];
            }
    
            // 初始化结果为 "0,0"
            String result = "0,0";
            // 初始化两个分割点
            int firstSplit = 1, secondSplit = 3;
            // 当分割点在字符串范围内时，继续循环
            while (firstSplit < strLength && secondSplit < strLength) {
                // 计算三个子串的权重
                int sum1 = prefixSum[firstSplit] - prefixSum[0];
                int sum2 = prefixSum[secondSplit] - prefixSum[firstSplit + 1];
                int sum3 = prefixSum[strLength] - prefixSum[secondSplit + 1];
    
                // 如果三个子串的权重相等，则找到满足条件的分割点
                if (sum1 == sum2 && sum2 == sum3) {
                    result = firstSplit + "," + secondSplit;
                    break;
                }
    
                // 根据子串权重调整分割点
                if (sum1 <= sum2) {
                    firstSplit++;
                } else {
                    secondSplit++;
                }
            }
    
            // 输出结果
            System.out.println(result);
        }
    }
    
    

#### javaScript

    
    
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    // 读取输入字符串
    readline.on('line', inputStr => {
        // 获取字符串长度
        const strLength = inputStr.length;
    
        // 创建前缀和数组，用于存储子串权重
        const prefixSum = new Array(strLength + 1).fill(0);
        // 计算前缀和数组
        for (let i = 1; i <= strLength; i++) {
            prefixSum[i] = prefixSum[i - 1] + inputStr.charCodeAt(i - 1);
        }
    
        // 初始化结果为 "0,0"
        let result = "0,0";
        // 初始化两个分割点
        let firstSplit = 1, secondSplit = 3;
        // 当分割点在字符串范围内时，继续循环
        while (firstSplit < strLength && secondSplit < strLength) {
            // 计算三个子串的权重
            const sum1 = prefixSum[firstSplit] - prefixSum[0];
            const sum2 = prefixSum[secondSplit] - prefixSum[firstSplit + 1];
            const sum3 = prefixSum[strLength] - prefixSum[secondSplit + 1];
    
            // 如果三个子串的权重相等，则找到满足条件的分割点
            if (sum1 === sum2 && sum2 === sum3) {
                result = `${firstSplit},${secondSplit}`;
                break;
            }
    
            // 根据子串权重调整分割点
            if (sum1 <= sum2) {
                firstSplit++;
            } else {
                secondSplit++;
            }
        }
    
        // 输出结果
        console.log(result);
    
        readline.close();
    });
    
    

#### Python

    
    
    # 读取输入字符串
    inputStr = input()
    
    # 获取字符串长度
    strLength = len(inputStr)
    
    # 创建前缀和数组，用于存储子串权重
    prefixSum = [0] * (strLength + 1)
    # 计算前缀和数组
    for i in range(1, strLength + 1):
        prefixSum[i] = prefixSum[i - 1] + ord(inputStr[i - 1])
    
    # 初始化结果为 "0,0"
    result = "0,0"
    # 初始化两个分割点
    firstSplit, secondSplit = 1, 3
    # 当分割点在字符串范围内时，继续循环
    while firstSplit < strLength and secondSplit < strLength:
        # 计算三个子串的权重
        sum1 = prefixSum[firstSplit] - prefixSum[0]
        sum2 = prefixSum[secondSplit] - prefixSum[firstSplit + 1]
        sum3 = prefixSum[strLength] - prefixSum[secondSplit + 1]
    
        # 如果三个子串的权重相等，则找到满足条件的分割点
        if sum1 == sum2 and sum2 == sum3:
            result = f"{firstSplit},{secondSplit}"
            break
    
        # 根据子串权重调整分割点
        if sum1 <= sum2:
            firstSplit += 1
        else:
            secondSplit += 1
    
    # 输出结果
    print(result)
    
    

#### 完整用例

##### 用例1

    
    
    acdbbbca
    

##### 用例2

    
    
    abcabc
    

##### 用例3

    
    
    abcde
    

##### 用例4

    
    
    aaaaaa
    

##### 用例5

    
    
    abcdef
    

##### 用例6

    
    
    uvwxyuvwxzuvwx
    

##### 用例7

    
    
    uvwxyuvwxzuvwxuvwx
    

##### 用例8

    
    
    abcdcbadabc
    

##### 用例9

    
    
    xyzxyzxyz
    

##### 用例10

    
    
    abccbaabccba
    

#### 文章目录

  *     *       * 题目描述
      * 输入描述
      * 输出描述
      * 备注
      * 用例
      * 解题思路
      * C++
      * Java
      * javaScript
      * Python
      * 完整用例
      *         * 用例1
        * 用例2
        * 用例3
        * 用例4
        * 用例5
        * 用例6
        * 用例7
        * 用例8
        * 用例9
        * 用例10

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

