## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

公司老板做了一笔大生意，想要给每位员工分配一些奖金，想通过游戏的方式来决定每个人分多少钱。

按照员工的工号顺序，每个人随机抽取一个数字。按照工号的顺序往后排列，遇到第一个数字比自己数字大的，那么，前面的员工就可以获得“距离*数字差值”的奖金。如果遇不到比自己数字大的，就给自己分配随机数数量的奖金。

>
> 例如，按照工号顺序的随机数字是：2,10,3。那么第2个员工的数字10比第1个员工的数字2大，所以，第1个员工可以获得1*（10-2）=8。第2个员工后面没有比他数字更大的员工，所以，他获得他分配的随机数数量的奖金，就是10。第3个员工是最后一个员工，后面也没有比他更大数字的员工，所以他得到的奖金是3。

请帮老板计算一下每位员工最终分到的奖金都是多少钱。

## 输入描述

第一行n表示员工数量（包含最后一个老板）  
第二是每位员工分配的随机数字

## 输出描述

最终每位员工分到的奖金数量

注：随机数字不重复，员工数量（包含老板）范围110000，随机数范围1100000

## 示例1

输入

    
    
    3
    2 10 3
    

输出

    
    
    8 10 3
    

说明

> ## Java
    
    
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);  
            int employeeNum = scanner.nextInt(); // 读取员工数量
            int[] randomNumbers = new int[employeeNum]; // 创建数组存储随机数字
            int[] bonuses = new int[employeeNum]; // 创建数组存储奖金
    
            // 读取随机数字
            for (int i = 0; i < employeeNum; i++) {
                randomNumbers[i] = scanner.nextInt(); // 将输入的随机数字存入数组
            }
    
            // 计算每个员工的奖金
            for (int i = 0; i < employeeNum; i++) {
                int j = i + 1; // 初始化 j 为 i 的下一个位置
                // 查找第一个比当前随机数字大的数字
                while (j < employeeNum && randomNumbers[j] <= randomNumbers[i]) {
                    j++; // 向后查找
                }
                // 计算奖金
                bonuses[i] = j < employeeNum ? (j - i) * (randomNumbers[j] - randomNumbers[i]) : randomNumbers[i];
            }
    
            // 输出所有奖金
            for (int i = 0; i < employeeNum; i++) {
                System.out.print(bonuses[i] + (i < employeeNum - 1 ? " " : "\n")); // 打印奖金，格式化输出
            }
        }
    }
    

## Python

    
    
    def main():
        employee_num = int(input())   
        random_numbers = list(map(int, input().split()))  # 读取随机数字并转换为整数列表
        bonuses = [0] * employee_num  # 初始化奖金数组
    
        # 计算每个员工的奖金
        for i in range(employee_num):
            j = i + 1  # 初始化 j 为 i 的下一个位置
            # 查找第一个比当前随机数字大的数字
            while j < employee_num and random_numbers[j] <= random_numbers[i]:
                j += 1  # 向后查找
            # 计算奖金
            bonuses[i] = (j - i) * (random_numbers[j] - random_numbers[i]) if j < employee_num else random_numbers[i]
    
        # 输出所有奖金
        print(" ".join(map(str, bonuses)))  # 格式化输出奖金
    
    if __name__ == "__main__":
        main()  # 调用主函数
    

## JavaScript

    
    
    const readline = require('readline');  
    const rl = readline.createInterface({
      input: process.stdin,  
      output: process.stdout,  
    });
    
    const inputLines = []; // 存储输入的行
    
    rl.on('line', (line) => {
      inputLines.push(line); // 收集输入行
    
      if (inputLines.length === 2) { // 当收集到两行输入时
        const employeeNum = parseInt(inputLines[0], 10); // 解析员工数量
        const randomNumbers = inputLines[1].split(' ').map(Number); // 解析随机数字
        const bonuses = new Array(employeeNum); // 初始化奖金数组
    
        // 计算每个员工的奖金
        for (let i = 0; i < employeeNum; i++) {
          let j = i + 1; // 初始化 j 为 i 的下一个位置
          // 查找第一个比当前随机数字大的数字
          while (j < employeeNum && randomNumbers[j] <= randomNumbers[i]) {
            j++; // 向后查找
          }
          // 计算奖金
          bonuses[i] = j < employeeNum ? (j - i) * (randomNumbers[j] - randomNumbers[i]) : randomNumbers[i];
        }
    
        console.log(bonuses.join(' ')); // 输出所有奖金
        rl.close(); // 关闭输入接口
      }
    });
    

## C++

    
    
    #include <iostream>
    #include <vector>
    using namespace std;
    
    int main() {
        int employeeNum; // 声明员工数量变量
        cin >> employeeNum; // 读取员工数量
    
        vector<int> randomNumbers(employeeNum); // 创建随机数字数组
        vector<int> bonuses(employeeNum); // 创建奖金数组
    
        // 读取随机数字
        for (int i = 0; i < employeeNum; i++) {
            cin >> randomNumbers[i]; // 将输入的随机数字存入数组
        }
    
        // 计算每个员工的奖金
        for (int i = 0; i < employeeNum; i++) {
            int j = i + 1; // 初始化 j 为 i 的下一个位置
            // 查找第一个比当前随机数字大的数字
            while (j < employeeNum && randomNumbers[j] <= randomNumbers[i]) {
                j++; // 向后查找
            }
            // 计算奖金
            bonuses[i] = j < employeeNum ? (j - i) * (randomNumbers[j] - randomNumbers[i]) : randomNumbers[i];
        }
    
        // 输出所有奖金
        for (int i = 0; i < employeeNum; i++) {
            cout << bonuses[i] << (i < employeeNum - 1 ? " " : "\n"); // 打印奖金，格式化输出
        }
    
        return 0; // 返回 0 表示程序正常结束
    }
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    
    int main() {
        int employeeNum; // 声明员工数量变量
        scanf("%d", &employeeNum); // 读取员工数量
    
        int *randomNumbers = (int *)malloc(employeeNum * sizeof(int)); // 动态分配随机数字数组
        int *bonuses = (int *)malloc(employeeNum * sizeof(int)); // 动态分配奖金数组
    
        // 读取随机数字
        for (int i = 0; i < employeeNum; i++) {
            scanf("%d", &randomNumbers[i]); // 将输入的随机数字存入数组
        }
    
        // 计算每个员工的奖金
        for (int i = 0; i < employeeNum; i++) {
            int j = i + 1; // 初始化 j 为 i 的下一个位置
            // 查找第一个比当前随机数字大的数字
            while (j < employeeNum && randomNumbers[j] <= randomNumbers[i]) {
                j++; // 向后查找
            }
            // 计算奖金
            bonuses[i] = (j < employeeNum) ? (j - i) * (randomNumbers[j] - randomNumbers[i]) : randomNumbers[i];
        }
    
        // 输出所有奖金
        for (int i = 0; i < employeeNum; i++) {
            printf("%d%s", bonuses[i], (i < employeeNum - 1) ? " " : "\n"); // 打印奖金，格式化输出
        }
    
        free(randomNumbers); // 释放动态分配的内存
        free(bonuses); // 释放动态分配的内存
    
        return 0; // 返回 0 表示程序正常结束
    }
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/5f89798b5c6badbeeb169937be0dfe71.png)

