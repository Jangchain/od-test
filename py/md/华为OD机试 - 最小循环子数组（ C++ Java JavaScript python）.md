#### 题目描述

给定一个由若干整数组成的数组nums，请检查数组是否是由某个子数组重复循环拼接而成，请输出这个最小的子数组。

#### 输入描述

第一行输入数组中元素个数n，1 ≤ n ≤ 100000

第二行输入数组的数字序列nums，以空格分割，0 ≤ nums[i] < 10

#### 输出描述

输出最小的子数组的数字序列，以空格分割；

#### 备注

数组本身是其最大的子数组，循环1次可生成的自身；

#### 用例

输入

    
    
    9
    1 2 1 1 2 1 1 2 1
    

输出

    
    
    1 2 1
    

说明

> 数组[1,2,1,1,2,1,1,2,1] 可由子数组[1,2,1]重复循环3次拼接而成

#### 解题思路 ：

题目要求找到一个最小的子数组，使得原数组可以由这个子数组重复循环拼接而成。为了解决这个问题，我们可以借鉴KMP算法中的next数组的构建思想。

  1. 首先，读取输入数据，包括数组长度和数组元素。
  2. 初始化一个next数组，用于存储KMP算法中的前缀信息。同时初始化两个索引，一个是前缀索引（prefixIndex），另一个是当前索引（currentIndex）。
  3. 使用KMP算法的思想构建next数组： 
     * 如果当前元素与前缀元素相等，更新next数组，并将当前索引和前缀索引同时向前移动。
     * 如果前缀索引大于0，但当前元素与前缀元素不相等，将前缀索引回退到前一个前缀。
     * 如果前缀索引为0，但当前元素与前缀元素不相等，将当前索引向前移动。
  4. 当next数组构建完成后，获取next数组的最后一个值（lastNextValue）。根据这个值，我们可以计算子数组的长度（subArrayLength）。 
     * 如果原数组长度减去lastNextValue能被原数组长度整除，那么子数组长度为原数组长度减去lastNextValue。
     * 否则，子数组长度就是原数组长度。
  5. 最后，使用StringJoiner构建输出字符串，将子数组的元素添加到输出字符串中，并输出结果。

#### C++

    
    
    #include <iostream>
    #include <vector>
    #include <sstream>
    #include <string>
    using namespace std;
    int main() {
        // 创建输入流对象以读取用户输入
        string line;
        // 读取数组长度
        int arrayLength;
        getline(cin, line);
        arrayLength = stoi(line);
    
        // 读取数组元素并将其转换为整数数组
        getline(cin, line);
        istringstream iss(line);
        vector<int> nums(arrayLength);
        for (int i = 0; i < arrayLength; ++i) {
            iss >> nums[i];
        }
    
        // 初始化next数组，用于存储KMP算法中的前缀信息
        vector<int> next(arrayLength, 0);
        // 初始化前缀索引
        int prefixIndex = 0;
        // 初始化当前索引
        int currentIndex = 1;
    
        // 使用KMP算法的思想构建next数组
        while (currentIndex < arrayLength) {
            // 如果当前元素与前缀元素相等，则更新next数组
            if (nums[currentIndex] == nums[prefixIndex]) {
                next[currentIndex++] = ++prefixIndex;
            } else if (prefixIndex > 0) {
                // 如果前缀索引大于0，则回退到前一个前缀
                prefixIndex = next[prefixIndex - 1];
            } else {
                // 如果前缀索引为0，则移动到下一个元素
                currentIndex++;
            }
        }
    
        // 获取next数组的最后一个值
        int lastNextValue = next[arrayLength - 1];
        // 计算子数组长度
        int subArrayLength = arrayLength % (arrayLength - lastNextValue) == 0 ? arrayLength - lastNextValue : arrayLength;
    
        // 使用ostringstream构建输出字符串
        ostringstream oss;
        // 将子数组的元素添加到输出字符串中
        for (int i = 0; i < subArrayLength; i++) {
            oss << nums[i];
            if (i < subArrayLength - 1) {
                oss << " ";
            }
        }
        // 输出结果
        cout << oss.str() << endl;
    
        return 0;
    }
    
    

#### JavaScript

    
    
    const readline = require('readline');
    
     
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    // 读取用户输入
    rl.on('line', arrayLength => {
      rl.on('line', arrayElements => {
        // 将输入的字符串转换为整数数组
        const nums = arrayElements.split(' ').map(Number);
        const next = new Array(parseInt(arrayLength)).fill(0);
    
        let prefixIndex = 0;
        let currentIndex = 1;
    
        // 使用KMP算法的思想构建next数组
        while (currentIndex < nums.length) {
          if (nums[currentIndex] === nums[prefixIndex]) {
            next[currentIndex++] = ++prefixIndex;
          } else if (prefixIndex > 0) {
            prefixIndex = next[prefixIndex - 1];
          } else {
            currentIndex++;
          }
        }
    
        // 获取next数组的最后一个值
        const lastNextValue = next[nums.length - 1];
        // 计算子数组长度
        const subArrayLength = nums.length % (nums.length - lastNextValue) === 0 ? nums.length - lastNextValue : nums.length;
    
        // 构建输出字符串
        const output = nums.slice(0, subArrayLength).join(' ');
        console.log(output);
    
        rl.close();
      });
    }) 
    

#### Java

    
    
    import java.util.Arrays;
    import java.util.Scanner;
    import java.util.StringJoiner;
    
    public class Main {
        public static void main(String[] args) {
            // 创建Scanner对象以读取用户输入
            Scanner sc = new Scanner(System.in);
            // 读取数组长度
            int arrayLength = Integer.parseInt(sc.nextLine());
            // 读取数组元素并将其转换为整数数组
            int[] nums = Arrays.stream(sc.nextLine().split(" ")).mapToInt(Integer::parseInt).toArray();
    
            // 初始化next数组，用于存储KMP算法中的前缀信息
            int[] next = new int[arrayLength];
            // 初始化前缀索引
            int prefixIndex = 0;
            // 初始化当前索引
            int currentIndex = 1;
    
            // 使用KMP算法的思想构建next数组
            while (currentIndex < arrayLength) {
                // 如果当前元素与前缀元素相等，则更新next数组
                if (nums[currentIndex] == nums[prefixIndex]) {
                    next[currentIndex++] = ++prefixIndex;
                } else if (prefixIndex > 0) {
                    // 如果前缀索引大于0，则回退到前一个前缀
                    prefixIndex = next[prefixIndex - 1];
                } else {
                    // 如果前缀索引为0，则移动到下一个元素
                    currentIndex++;
                }
            }
    
            // 获取next数组的最后一个值
            int lastNextValue = next[arrayLength - 1];
            // 计算子数组长度
            int subArrayLength = arrayLength % (arrayLength - lastNextValue) == 0 ? arrayLength - lastNextValue : arrayLength;
    
            // 使用StringJoiner构建输出字符串
            StringJoiner sj = new StringJoiner(" ");
            // 将子数组的元素添加到输出字符串中
            for (int i = 0; i < subArrayLength; i++) sj.add(nums[i] + "");
            // 输出结果
            System.out.println(sj.toString());
        }
    }
    
    

#### Python

    
    
    import sys
    
    # 从控制台读取输入
    input_lines = sys.stdin.readlines()
    # 读取数组长度
    array_length = int(input_lines[0].strip())
    # 读取数组元素并将其转换为整数数组
    nums = list(map(int, input_lines[1].strip().split()))
    
    # 初始化next数组，用于存储KMP算法中的前缀信息
    next = [0] * array_length
    # 初始化前缀索引
    prefix_index = 0
    # 初始化当前索引
    current_index = 1
    
    # 使用KMP算法的思想构建next数组
    while current_index < array_length:
        # 如果当前元素与前缀元素相等，则更新next数组
        if nums[current_index] == nums[prefix_index]:
            prefix_index += 1
            next[current_index] = prefix_index
            current_index += 1
        elif prefix_index > 0:
            # 如果前缀索引大于0，则回退到前一个前缀
            prefix_index = next[prefix_index - 1]
        else:
            # 如果前缀索引为0，则移动到下一个元素
            current_index += 1
    
    # 获取next数组的最后一个值
    last_next_value = next[array_length - 1]
    # 计算子数组长度
    sub_array_length = array_length - last_next_value if array_length % (array_length - last_next_value) == 0 else array_length
    
    # 使用列表构建输出字符串
    output = ' '.join(str(nums[i]) for i in range(sub_array_length))
    # 输出结果
    print(output)
    
    
    

#### 文章目录

  *     *       * 题目描述
      * 输入描述
      * 输出描述
      * 备注
      * 用例
      * 解题思路 ：
      * C++
      * JavaScript
      * Java
      * Python

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

