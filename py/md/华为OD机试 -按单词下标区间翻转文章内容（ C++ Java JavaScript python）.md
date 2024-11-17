#### 题目描述

给定一段英文文章片段，由若干单词组成，单词间以空格间隔，单词下标从0开始。  
请翻转片段中指定区间的单词顺序并返回翻转后的内容。

例如给定的英文文章片段为"I am a developer"，翻转区间为[0,3]，则输出“developer a am I”。

String reverseWords(String s, int start, int end)

#### 输入描述

使用换行隔开三个参数

  * 第一个参数为英文文章内容即英文字符串
  * 第二个参数为待翻转内容起始单词下标
  * 第三个参数为待翻转内容最后一个单词下标

#### 输出描述

翻转后的英文文章片段所有单词之间以一个半角空格分隔进行输出。

#### 备注

英文文章内容首尾无空格

#### 用例1

输入

    
    
    I am a developer.
    1
    2
    

输出

    
    
    I a am developer.
    

#### 用例2

输入

    
    
    hello world
    -1
    1
    

输出

    
    
    world hello
    

说明

> 下标小于0时，从第一个单词开始

#### 用例3

输入

    
    
    I am a developer
    0
    5
    

输出

    
    
    developer a am I
    

说明

> 下标大于实际单词个数，则按最大下标算

#### 用例4

输入

    
    
    I am a developer
    -2
    -1
    

输出

    
    
    I am a developer
    

说明

> 翻转区间无效时，不做翻转

#### 解题思路

这个题目的解题思路如下：

  1. 读取用户输入的英文文章片段、待翻转内容的起始单词下标和最后一个单词下标。
  2. 将英文文章片段拆分为单词数组。
  3. 对起始下标和结束下标进行边界检查，确保它们在有效范围内。
  4. 使用双指针法翻转指定区间的单词顺序： 
     * 初始化两个指针，一个指向待翻转区间的起始位置（`i`），另一个指向待翻转区间的结束位置（`j`）。
     * 当 `i` 小于 `j` 时，交换 `words[i]` 和 `words[j]` 的值，然后将 `i` 向右移动一位，将 `j` 向左移动一位。重复此过程，直到 `i` 大于等于 `j`。
  5. 将翻转后的单词数组连接为字符串，并输出。

这个解题思路可以确保在给定的英文文章片段中，指定区间的单词顺序被正确翻转。

#### C++

    
    
    #include <iostream>
    #include <string>
    #include <vector>
    #include <sstream>
    #include <algorithm>
    using namespace std;
    int main() {
        // 创建一个字符串用于读取用户输入
        string input;
    
        // 读取输入的英文文章片段
        getline(cin, input);
    
        // 读取待翻转内容的起始单词下标
        int startIndex;
        cin >> startIndex;
    
        // 读取待翻转内容的最后一个单词下标
        int endIndex;
        cin >> endIndex;
    
        // 将英文文章片段拆分为单词数组
        istringstream iss(input);
        vector<string> words;
        string word;
        while (iss >> word) {
            words.push_back(word);
        }
    
        // 确保起始下标在有效范围内
        if (startIndex < 0) {
            startIndex = 0;
        } else if (startIndex > static_cast<int>(words.size()) - 1) {
            startIndex = words.size() - 1;
        }
    
        // 确保结束下标在有效范围内
        if (endIndex < 0) {
            endIndex = 0;
        } else if (endIndex > static_cast<int>(words.size()) - 1) {
            endIndex = words.size() - 1;
        }
    
        // 如果起始下标小于结束下标，则执行翻转操作
        if (startIndex < endIndex) {
            // 使用双指针法交换单词顺序
            for (int i = startIndex, j = endIndex; i < j; i++, j--) {
                swap(words[i], words[j]);
            }
        }
    
        // 将翻转后的单词数组连接为字符串，并输出
        for (size_t i = 0; i < words.size(); i++) {
            cout << words[i];
            if (i < words.size() - 1) {
                cout << " ";
            }
        }
        cout << endl;
    
        return 0;
    }
    
    

#### JavaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    // 创建一个数组用于存储用户输入的数据
    const inputs = [];
    
    // 读取用户输入
    rl.on('line', (input) => {
        inputs.push(input);
        if (inputs.length === 3) {
            rl.close();
        }
    });
    
    // 当用户输入结束时，执行翻转单词顺序的操作
    rl.on('close', () => {
        // 获取输入的英文文章片段
        const s = inputs[0];
    
        // 获取待翻转内容的起始单词下标
        let startIndex = parseInt(inputs[1], 10);
    
        // 获取待翻转内容的最后一个单词下标
        let endIndex = parseInt(inputs[2], 10);
    
        // 将英文文章片段拆分为单词数组
        const words = s.split(' ');
    
        // 确保起始下标在有效范围内
        if (startIndex < 0) {
            startIndex = 0;
        } else if (startIndex > words.length - 1) {
            startIndex = words.length - 1;
        }
    
        // 确保结束下标在有效范围内
        if (endIndex < 0) {
            endIndex = 0;
        } else if (endIndex > words.length - 1) {
            endIndex = words.length - 1;
        }
        // 如果起始下标小于结束下标，则执行翻转操作
        if (startIndex < endIndex) {
            // 使用双指针法交换单词顺序
            for (let i = startIndex, j = endIndex; i < j; i++ , j--) {
                const temp = words[i];
                words[i] = words[j];
                words[j] = temp;
            }
        }
    
        // 将翻转后的单词数组连接为字符串，并输出
        console.log(words.join(' '));
    });
    
    

#### Java

    
    
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            // 创建一个 Scanner 对象用于读取用户输入
            Scanner sc = new Scanner(System.in);
    
            // 读取输入的英文文章片段
            String s = sc.nextLine();
    
            // 读取待翻转内容的起始单词下标
            int startIndex = Integer.parseInt(sc.nextLine());
    
            // 读取待翻转内容的最后一个单词下标
            int endIndex = Integer.parseInt(sc.nextLine());
    
            // 将英文文章片段拆分为单词数组
            String[] words = s.split(" ");
    
         	// 确保起始下标在有效范围内
            if (startIndex < 0) {
                startIndex = 0;
            } else if (startIndex > words.length - 1) {
                startIndex = words.length - 1;
            }
    
            // 确保结束下标在有效范围内
            if (endIndex < 0) {
                endIndex = 0;
            } else if (endIndex > words.length - 1) {
                endIndex = words.length - 1;
            }
    
    
            // 如果起始下标小于结束下标，则执行翻转操作
            if (startIndex < endIndex) {
                // 使用双指针法交换单词顺序
                for (int i = startIndex, j = endIndex; i < j; i++, j--) {
                    String temp = words[i];
                    words[i] = words[j];
                    words[j] = temp;
                }
            }
    
            // 将翻转后的单词数组连接为字符串，并输出
            System.out.println(String.join(" ", words));
        }
    }
    
    

#### Python

    
    
    def main():
        # 读取输入的英文文章片段
        s = input()
    
        # 读取待翻转内容的起始单词下标
        start_index = int(input())
    
        # 读取待翻转内容的最后一个单词下标
        end_index = int(input())
    
        # 将英文文章片段拆分为单词列表
        words = s.split()
    
        # 确保起始下标在有效范围内
        if start_index < 0:
            start_index = 0
        elif start_index > len(words) - 1:
            start_index = len(words) - 1
    
        # 确保结束下标在有效范围内
        if end_index < 0:
            end_index = 0
        elif end_index > len(words) - 1:
            end_index = len(words) - 1
    
        # 如果起始下标小于结束下标，则执行翻转操作
        if start_index < end_index:
            # 使用双指针法交换单词顺序
            i, j = start_index, end_index
            while i < j:
                words[i], words[j] = words[j], words[i]
                i += 1
                j -= 1
    
        # 将翻转后的单词列表连接为字符串，并输出
        print(" ".join(words))
    
    if __name__ == "__main__":
        main()
    
    

#### 文章目录

  *     *       * 题目描述
      * 输入描述
      * 输出描述
      * 备注
      * 用例1
      * 用例2
      * 用例3
      * 用例4
      * 解题思路
      * C++
      * JavaScript
      * Java
      * Python

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

