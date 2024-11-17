#### 题目描述

给一个数组，数组里面哦都是代表非负整数的字符串，将数组里所有的数值[排列组合]拼接起来组成一个数字，输出拼接成的最小的数字。

#### 输入描述

一个数组，数组不为空，数组里面都是代表非负整数的字符串，可以是0开头，例如：[“13”, “045”, “09”, “56”]。

数组的大小范围：[1, 50]

数组中每个元素的长度范围：[1, 30]

#### 输出描述

以字符串的格式输出一个数字，

  * 如果最终结果是多位数字，要优先选择输出不是“0”开头的最小数字
  * 如果拼接出来的数字都是“0”开头，则选取值最小的，并且把开头部分的“0”都去掉再输出
  * 如果是单位数“0”，可以直接输出“0”

#### 用例

示例1  
输入:  
20 1  
输出:  
120  
示例2  
输入:  
08 10 2  
输出:  
10082

#### 题目解析

**经典的全排列算法。**

按照前面的规则将数组元素排序，排序后，检查数组头元素是否以“0”开头，如果是的话，则开始遍历数组后面的元素，直到找到一个不以“0”开头的元素x，然后将元素x取出，并插入到数组头部。如果一直找不到这样的x，则说明数组元素全部是以0开头的，此时直接拼接出组合数，然后去除前导0。

#### C++

    
    
    #include<iostream>
    #include<vector>
    #include<stdlib.h>
    #include<algorithm>
    
    
    using namespace std;
    
    
    // 将字符串 params_str 以 op 分隔成字符串数组返回
    vector<string> splitStringToStringArray(string params_str, string op) {
        vector<string> str_array;
        while (params_str.find(op) != string::npos) {
            int found = params_str.find(op);
            str_array.push_back(params_str.substr(0, found));
            params_str = params_str.substr(found + 1);
        }    
        str_array.push_back(params_str);
        return str_array;
    }
    
    // 比较两个字符串拼接起来的大小
    bool compareStrings(string str1, string str2) {
        return stoi(str1+str2) < stoi(str2+str1);
    }
    
    int main()
    {
        // 输入一行待排序的数字字符串，例如 "4 21 2"
        string input_str;
        getline(cin, input_str);
    
        // 将输入字符串以空格分隔成数字数组
        vector<string> numbers = splitStringToStringArray(input_str, " "); 
    
        // 使用自定义比较函数对字符串数组进行排序
        sort(numbers.begin(), numbers.end(), compareStrings);
    
        // 如果最小的字符串以 '0' 开头，则从剩余的字符串中找一个不以 '0' 开头的字符串将其拼接到最小的字符串前面
        if (numbers[0][0] == '0') {
            for (int i = 1; i < numbers.size(); i++) {
                if (numbers[i][0] != '0') {
                    numbers[0] = numbers[i] + numbers[0];
                    numbers[i] = "";
                    break;
                }
            }
        }
    
        // 将排序后的字符串数组拼接成一个字符串
        string result = "";
        for (auto str : numbers) {
            result += str;
        }
    
        // 去掉结果字符串开头多余的 '0' 并输出
        cout << result.erase(0, result.find_first_not_of("0"));
        
        return 0;
    }
    
    

#### JavaScript

    
    
    const readline = require("readline");
    
    // 创建接口读取标准输入和输出
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    
    // 监听每一行输入
    rl.on("line", (line) => {
      // 将输入字符串以空格分隔成字符串数组
      const strArr = line.split(" ");
    
      // 调用排序函数并输出结果
      console.log(getSortedStr(strArr));
    });
    
    /**
     * 对字符串数组进行排序并返回拼接后的字符串
     * @param {string[]} strArr - 输入的字符串数组
     * @return {string} 拼接后的字符串
     */
    function getSortedStr(strArr) {
      // 使用自定义比较函数对字符串数组进行排序
      strArr.sort((str1, str2) => {
        const concatStr1 = str1 + str2;
        const concatStr2 = str2 + str1;
    
        if (concatStr1 === concatStr2) {
          return 0;
        } else {
          return concatStr1 > concatStr2 ? 1 : -1;
        }
      });
    
      // 如果最小的字符串以 '0' 开头，则从剩余的字符串中找一个不以 '0' 开头的字符串将其拼接到最小的字符串前面
      if (strArr[0][0] === "0") {
        for (let i = 1; i < strArr.length; i++) {
          if (strArr[i][0] !== "0") {
            strArr[0] = strArr[i] + strArr[0];
            strArr[i] = "";
            break;
          }
        }
      }
    
      // 将排序后的字符串数组拼接成一个字符串并去掉开头多余的 '0'
      const sortedStr = strArr.join("").replace(/^0+/, "");
      return sortedStr;
    }
    
    

#### Java

    
    
    import java.util.*;
    import java.lang.*;
    import java.io.*;
    
    class Main
    {
    // 将字符串 params_str 以 op 分隔成字符串数组返回
    public static List<String> splitStringToStringArray(String params_str, String op) {
    List<String> str_array = new ArrayList<String>();
    while (params_str.indexOf(op) != -1) {
    int found = params_str.indexOf(op);
    str_array.add(params_str.substring(0, found));
    params_str = params_str.substring(found + 1);
    }
    
    str_array.add(params_str);
    return str_array;
    }
    
    // 比较两个字符串拼接起来的大小
    public static boolean compareStrings(String str1, String str2) {
        return Integer.parseInt(str1+str2) < Integer.parseInt(str2+str1);
    }
    
    public static void main (String[] args)
    {
        Scanner sc = new Scanner(System.in);
    
        // 输入一行待排序的数字字符串，例如 "4 21 2"
        String input_str = sc.nextLine();
    
        // 将输入字符串以空格分隔成数字数组
        List<String> numbers = splitStringToStringArray(input_str, " "); 
    
        // 使用自定义比较函数对字符串数组进行排序
        Collections.sort(numbers, new Comparator<String>() {
            @Override
            public int compare(String str1, String str2) {
                if (compareStrings(str1, str2)) {
                    return -1;
                } else {
                    return 1;
                }
            }
        });
    
        // 如果最小的字符串以 '0' 开头，则从剩余的字符串中找一个不以 '0' 开头的字符串将其拼接到最小的字符串前面
        if (numbers.get(0).charAt(0) == '0') {
            for (int i = 1; i < numbers.size(); i++) {
                if (numbers.get(i).charAt(0) != '0') {
                    numbers.set(0, numbers.get(i) + numbers.get(0));
                    numbers.set(i, "");
                    break;
                }
            }
        }
    
        // 将排序后的字符串数组拼接成一个字符串
        String result = "";
        for (String str : numbers) {
            result += str;
        }
    
        // 去掉结果字符串开头多余的 '0' 并输出
        System.out.println(result.replaceFirst("^0+(?!$)", ""));
    }
    }
    

#### Python

    
    
    import functools
    strs = input().split()
    def cmp(a, b):
        s1 = a + b
        s2 = b + a
        return 0 if s1 == s2 else 1 if s1 > s2 else -1
    def getResult(strs):
        strs.sort(key=functools.cmp_to_key(cmp))
     
        if strs[0][0] == '0':
            for i in range(1, len(strs)):
                if strs[i][0] != '0':
                    strs[0] = strs[i] + strs[0]
                    strs[i] = ""
                    break
     
        ans = "".join(strs).lstrip("0")
        return "0" if ans == "" else ans
    print(getResult(strs))
    

#### 文章目录

  *     *       * 题目描述
      * 输入描述
      * 输出描述
      * 用例
      * 题目解析
      * C++
      * JavaScript
      * Java
      * Python

![fengmian](https://img-
blog.csdnimg.cn/img_convert/1d2f33ed8cf2fb1b9a4fe09513f7aa94.png)

