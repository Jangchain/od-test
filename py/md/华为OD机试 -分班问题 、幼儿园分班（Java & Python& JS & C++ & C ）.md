## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

儿园两个班的小朋友在排队时混在了一起，每位小朋友都知道自己是否与前面一位小朋友同班，请你帮忙把同班的小朋友找出来。

小朋友的编号是整数，与前一位小朋友同班用Y表示，不同班用N表示。

## 输入描述

输入为空格分开的小朋友编号和是否同班标志。

比如：6/N 2/Y 3/N 4/Y，表示4位小朋友，2和6同班，3和2不同班，4和3同班。

其中，小朋友总数不超过999，每个小朋友编号大于0，小于等于999。

不考虑输入格式错误问题。

## 输出描述

输出为两行，每一行记录一个班小朋友的编号，编号用空格分开，且：

  1. 编号需按照大小升序排列，分班记录中第一个编号小的排在第一行。
  2. 若只有一个班的小朋友，第二行为空行。
  3. 若输入不符合要求，则直接输出字符串ERROR。

## 示例1

输入

    
    
    1/N 2/Y 3/N 4/Y
    

输出

    
    
    1 2
    3 4
    

说明

> 2的同班标记为Y，因此和1同班。  
>  3的同班标记为N，因此和1、2不同班。  
>  4的同班标记为Y，因此和3同班。  
>  所以1、2同班，3、4同班，输出为  
>  1 2  
>  3 4

## 示例2

输入

    
    
    1/N 2/Y 3/N 4/Y 5/Y
    

输出

    
    
    1 2
    3 4 5
    

说明

> 无

## 解题思路

题目的要求是将一组小朋友按班级进行分类。输入由小朋友的编号和他们是否与前一位小朋友同班的标志组成。任务是根据这些标志将同班的小朋友归类并输出，遵循以下规则：

  1. 输入是小朋友编号与他们是否与前一位小朋友同班的标志，用空格分隔。编号后面跟随一个标志：

     * **Y** ：表示与前一个小朋友同班。
     * **N** ：表示与前一个小朋友不同班。
  2. 根据这些标志，小朋友们要被分成不同的班级。

#### 示例分析

##### 示例 1

输入：

    
    
    1/N 2/Y 3/N 4/Y
    

解释：

  * 小朋友1是第一个，所以他是班级1的第一个成员。
  * 小朋友2与小朋友1同班（因为标志是Y），因此小朋友1和2同班，形成班级1。
  * 小朋友3与小朋友2不同班（标志是N），因此小朋友3在另一个班级，形成班级2。
  * 小朋友4与小朋友3同班（标志是Y），所以小朋友3和4同班，属于班级2。

输出：

    
    
    1 2
    3 4
    

##### 示例 2

输入：

    
    
    1/N 2/Y 3/N 4/Y 5/Y
    

解释：

  * 小朋友1和2同班，属于班级1。
  * 小朋友3和4同班，属于班级2。
  * 小朋友5与4同班，属于班级2。

输出：

    
    
    1 2
    3 4 5
    

## Java

    
    
    import java.util.ArrayList;
    import java.util.Collections;
    import java.util.List;
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            String[] nums = scanner.nextLine().split(" ");
    
            String[] start = nums[0].split("/");
            List<String> class_A = new ArrayList<>();
            class_A.add(start[0]);
            List<String> class_B = new ArrayList<>();
    
            List<List<String>> temp = new ArrayList<>();
            temp.add(class_A);
            temp.add(class_B);
    
            for (int i = 1; i < nums.length; i++) {
                String[] current = nums[i].split("/");
                String id_ = current[0];
                String f = current[1];
    
                if (f.equals("Y")) {
                    temp = temp;
                } else {
                    Collections.reverse(temp);
                }
    
                temp.get(0).add(id_);
            }
    
            if (!class_A.isEmpty()) {
                Collections.sort(class_A, (a, b) -> Integer.parseInt(a) - Integer.parseInt(b));
                System.out.println(String.join(" ", class_A));
            }
    
            if (!class_B.isEmpty()) {
                Collections.sort(class_B, (a, b) -> Integer.parseInt(a) - Integer.parseInt(b));
                System.out.println(String.join(" ", class_B));
            }
        }
    }
    
    

## Python

    
    
    nums = input().split()
    
    # 将第一个元素以'/'分隔成两部分，第一部分表示小朋友的编号，第二部分表示是否与前一位小朋友同班
    start = nums[0].split('/')
    # 创建一个列表class_A，用于存放同班的小朋友的编号
    class_A = [start[0]]
    # 创建一个列表class_B，用于存放不同班的小朋友的编号
    class_B = []
    
    # 创建一个临时列表temp，用于存放两个班级的小朋友编号列表
    temp = [class_A, class_B]   
    
    # 遍历nums列表中的每一个元素
    for n in nums[1:]:
        # 将当前元素以'/'分隔成两部分，第一部分表示小朋友的编号，第二部分表示是否与前一位小朋友同班
        id_, f = n.split("/")
    
        # 如果与前一位小朋友同班，则temp不变
        if f == "Y":
            temp = temp
        else:
            # 如果与前一位小朋友不同班，则将temp列表中的两个班级的小朋友编号列表颠倒顺序
            temp = temp[::-1]
    
        # 将当前小朋友的编号添加到temp列表的第一个班级的小朋友编号列表中
        temp[0].append(id_)
    
    # 如果class_A列表不为空，则按照编号的大小升序排列，并用空格分隔成字符串输出
    if class_A:
        print(" ".join(sorted(class_A, key=lambda x: int(x))))
    # 如果class_B列表不为空，则按照编号的大小升序排列，并用空格分隔成字符串输出
    if class_B:
        print(" ".join(sorted(class_B, key=lambda x: int(x))))
    
    

## JavaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.on('line', (nums) => {
      nums = nums.split(' ');
    
      let start = nums[0].split('/');
      let class_A = [start[0]];
      let class_B = [];
      let temp = [class_A, class_B];
    
      for (let i = 1; i < nums.length; i++) {
        let [id_, f] = nums[i].split('/');
    
        if (f === 'Y') {
          temp = temp;
        } else {
          temp = temp.reverse();
        }
    
        temp[0].push(id_);
      }
    
      if (class_A.length > 0) {
        console.log(class_A.sort((a, b) => parseInt(a) - parseInt(b)).join(' '));
      }
      if (class_B.length > 0) {
        console.log(class_B.sort((a, b) => parseInt(a) - parseInt(b)).join(' '));
      }
    
      rl.close();
    });
    
    
    

## C++

    
    
    #include <iostream>
    #include <vector>
    #include <algorithm>
    #include <sstream>
    using namespace std;
    
    vector<string> split(const string& s, char delimiter) {
        vector<string> tokens;
        string token;
        istringstream tokenStream(s);
        while (getline(tokenStream, token, delimiter)) {
            tokens.push_back(token);
        }
        return tokens;
    }
    
    int main() {
        string nums;
        getline(cin, nums);
    
        vector<string> nums_vec = split(nums, ' ');
    
        vector<string> start = split(nums_vec[0], '/');
        vector<string> class_A = {start[0]};
        vector<string> class_B;
        vector<vector<string>> temp = {class_A, class_B};
    
        for (int i = 1; i < nums_vec.size(); i++) {
            vector<string> temp_vec = split(nums_vec[i], '/');
    
            string id_ = temp_vec[0];
            string f = temp_vec[1];
    
            if (f == "Y") {
                temp = temp;
            } else {
                reverse(temp.begin(), temp.end());
            }
    
            temp[0].push_back(id_);
        }
    
        class_A = temp[0];
        class_B = temp[1];
      if (class_B.size() > 0) {
            sort(class_B.begin(), class_B.end(), [](string a, string b) { return stoi(a) < stoi(b); });
            for (string s : class_B) {
                cout << s << " ";
            }
            cout << endl;
        }
        if (class_A.size() > 0) {
            sort(class_A.begin(), class_A.end(), [](string a, string b) { return stoi(a) < stoi(b); });
            for (string s : class_A) {
                cout << s << " ";
            }
            cout << endl;
        }
      
    
        return 0;
    }
    
    
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    #include <string.h>
    
    // 定义最大小朋友数量
    #define MAX_KIDS 1000
    
    // 辅助函数，用于比较两个字符串表示的数字
    int cmp(const void *a, const void *b) {
        return atoi(*(const char **)a) - atoi(*(const char **)b);
    }
    
    // 主函数
    int main() {
        char input[5000];  // 假设输入不超过5000字符
        fgets(input, sizeof(input), stdin);  // 读取整行输入
    
        char *nums[MAX_KIDS];  // 保存小朋友编号和同班标志
        int count = 0;  // 输入的条目数量
    
        // 分割输入的每个小朋友编号和同班标志
        char *token = strtok(input, " ");
        while (token != NULL) {
            nums[count++] = token;
            token = strtok(NULL, " ");
        }
    
        // 定义两个班级的数组
        char *class_A[MAX_KIDS];
        int class_A_count = 0;
        char *class_B[MAX_KIDS];
        int class_B_count = 0;
    
        // 初始化第一个小朋友
        char *start = strtok(nums[0], "/");
        class_A[class_A_count++] = start;
    
        // 定义指向两个班级的数组
        char ***temp[2] = { &class_A, &class_B };  // 指向class_A和class_B的指针
        int temp_index = 0;  // 当前处理的班级
    
        // 遍历输入的每个小朋友，从第二个开始
        for (int i = 1; i < count; i++) {
            char *id_ = strtok(nums[i], "/");  // 小朋友编号
            char *f = strtok(NULL, "/");  // 同班标志
    
            if (strcmp(f, "N") == 0) {
                temp_index = 1 - temp_index;  // 切换到另一个班
            }
    
            // 将当前小朋友编号添加到当前班级
            if (temp_index == 0) {
                class_A[class_A_count++] = id_;
            } else {
                class_B[class_B_count++] = id_;
            }
        }
    
        // 输出班级A的编号，升序排列
        if (class_A_count > 0) {
            qsort(class_A, class_A_count, sizeof(char *), cmp);
            for (int i = 0; i < class_A_count; i++) {
                if (i > 0) printf(" ");
                printf("%s", class_A[i]);
            }
            printf("\n");
        }
    
        // 输出班级B的编号，升序排列
        if (class_B_count > 0) {
            qsort(class_B, class_B_count, sizeof(char *), cmp);
            for (int i = 0; i < class_B_count; i++) {
                if (i > 0) printf(" ");
                printf("%s", class_B[i]);
            }
            printf("\n");
        }
    
        return 0;
    }
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/7e0ec2e8b5c9dbf3a911bc87288ec7e8.png)

#### 完整用例

##### 用例1

    
    
    1/N 2/Y 3/N 4/Y
    

##### 用例2

    
    
    1/N 2/Y 3/N 4/Y 5/Y
    

##### 用例3

    
    
    6/N 7/Y
    

##### 用例4

    
    
    1/N 2/N 3/N 4/Y 5/Y 6/Y 7/N 8/Y 9/Y 10/Y
    

##### 用例5

    
    
    1/N 2/Y 3/N 4/Y 5/N 6/Y 7/N 8/Y 9/N 10/Y 11/N 12/Y 13/N 14/Y 15/N 16/Y 17/N 18/Y 19/N 20/Y
    

##### 用例6

    
    
    1/N 2/N 3/N 4/N 5/N
    

##### 用例7

    
    
    1/N 2/Y 3/N 4/Y 5/Y 100/Y 101/N 102/Y 103/N 104/Y 105/Y
    

##### 用例8

    
    
    1/N
    

##### 用例9

    
    
    6/N 7/Y 8/N 9/Y
    

##### 用例10

    
    
    10/N 11/Y 12/N 13/Y 14/N
    

