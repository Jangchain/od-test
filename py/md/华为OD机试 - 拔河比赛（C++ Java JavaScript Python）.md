## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

#### 题目描述

公司最近准备进行拔河比赛，需要在全部员工中进行挑选。  
选拔的规则如下：

  1. 按照身高优先、体重次优先的方式准备比赛阵容；
  2. 规定参赛的队伍派出10名选手。

请实现一个选拔队员的小程序。

输入为一个数组，记录了部门人员的身高、体重信息，如[身高,体重]的方式放置；

部门全部成员数量为大于10的一个数组。

要求输出一个size为10的二维数组。

#### 输入描述

输入为N行员工信息，表示部门报名参加选拔的候选人信息，每行有两个数字，使用空格分隔，表示员工的身高、体重信息  
如  
181 70  
182 70  
表示两位候选员工，第一人身高181厘米，体重70公斤;第二人身高182厘米，体重70公斤

#### 输出描述

要求输出一个10行的已经排序的参赛员工信息数据，每行有两个数字，使用空格分隔，表示员工的身高、体重信息如  
182 70  
181 70

#### 备注

输入数据范围：

  * 成员身高、体重为int数据类型:
  * 输入备选成员数量为N，10 ≤ N ≤ 100

#### 用例

输入| 181 70  
182 70  
183 70  
184 70  
185 70  
186 70  
180 71  
180 72  
180 73  
180 74  
180 75  
---|---  
输出| 186 70  
185 70  
184 70  
183 70  
182 70  
181 70  
180 75  
180 74  
180 73  
180 72  
说明| 无  
  
#### C++

    
    
    #include <iostream>
    #include <vector>
    #include <algorithm>
    #include <string>
    #include <sstream>
    
    // 自定义排序函数，根据身高和体重进行排序，身高优先，体重次优先
    bool compareEmployees(const std::pair<int, int>& a, const std::pair<int, int>& b) {
        if (a.first != b.first) {
            return a.first > b.first;
        } else {
            return a.second > b.second;
        }
    }
    
    int main() {
        std::vector<std::pair<int, int>> employees;
        std::string line;
    
        // 读取输入的员工身高和体重信息
        while (std::getline(std::cin, line)) {
            std::istringstream iss(line);
            int height, weight;
            iss >> height >> weight;
            employees.push_back(std::make_pair(height, weight));
        }
    
        // 根据身高和体重进行排序
        std::sort(employees.begin(), employees.end(), compareEmployees);
    
        // 输出前10名员工的身高和体重信息
        for (size_t i = 0; i < 10 && i < employees.size(); i++) {
            const auto& employee = employees[i];
            std::cout << employee.first << " " << employee.second << std::endl;
        }
    
        return 0;
    }
    
    

#### JavaScript

    
    
    const readline = require('readline');
    
    const employees = [];
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.on('line', (line) => {
      const employee = line.split(" ").map(Number);
      employees.push(employee);
    });
    
    rl.on('close', () => {
      // 根据身高和体重进行排序，身高优先，体重次优先
      employees.sort((a, b) => a[0] !== b[0] ? b[0] - a[0] : b[1] - a[1]);
    
      // 输出前10名员工的身高和体重信息
      for (let i = 0; i < 10 && i < employees.length; i++) {
        const employee = employees[i];
        console.log(employee[0] + " " + employee[1]);
      }
    });
    
    

#### Java

    
    
    import java.util.ArrayList;
    import java.util.Arrays;
    import java.util.Scanner;
    
    public class Main {
      public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
    
        // 创建一个ArrayList来存储员工信息
        ArrayList<int[]> employees = new ArrayList<>();
    
        // 循环读取员工信息，直到没有更多输入
        while (scanner.hasNextLine()) {
          String line = scanner.nextLine();
    
          // 将输入的字符串按空格分割，并将分割后的字符串转换为整数数组
          int[] employee = Arrays.stream(line.split(" ")).mapToInt(Integer::parseInt).toArray();
    
          // 将员工信息添加到ArrayList中
          employees.add(employee);
        }
    
        // 根据身高和体重进行排序，身高优先，体重次优先
        employees.sort((a, b) -> a[0] != b[0] ? b[0] - a[0] : b[1] - a[1]);
    
        // 输出前10名员工的身高和体重信息
        for (int i = 0; i < 10 && i < employees.size(); i++) {
          int[] employee = employees.get(i);
          System.out.println(employee[0] + " " + employee[1]);
        }
      }
    }
    
    

#### Python

    
    
    employees = []
    
    # 循环读取员工信息，直到没有更多输入
    while True:
      try:
        line = input()
        employee = list(map(int, line.split()))
        employees.append(employee)
      except EOFError:
        break
    
    # 根据身高和体重进行排序，身高优先，体重次优先
    employees.sort(key=lambda x: (x[0], x[1]), reverse=True)
    
    # 输出前10名员工的身高和体重信息
    for i in range(min(10, len(employees))):
      employee = employees[i]
      print(employee[0], employee[1])
    
    

#### 完整用例

##### 用例1

    
    
    181 70
    182 70
    183 70
    184 70
    185 70
    186 70
    180 71
    180 72
    180 73
    180 74
    180 75
    

##### 用例2

    
    
    170 60
    171 61
    172 62
    173 63
    174 64
    175 65
    176 66
    177 67
    178 68
    179 69
    180 70
    181 71
    

##### 用例3

    
    
    190 80
    191 79
    192 78
    193 77
    194 76
    195 75
    196 74
    197 73
    198 72
    199 71
    200 70
    201 69
    

##### 用例4

    
    
    160 50
    161 51
    162 52
    163 53
    164 54
    165 55
    166 56
    167 57
    168 58
    169 59
    170 60
    171 61
    

##### 用例5

    
    
    180 70
    180 71
    180 72
    180 73
    180 74
    180 75
    180 76
    180 77
    180 78
    180 79
    180 80
    180 81
    

##### 用例6

    
    
    200 90
    199 89
    198 88
    197 87
    196 86
    195 85
    194 84
    193 83
    192 82
    191 81
    190 80
    189 79
    

##### 用例7

    
    
    175 65
    176 66
    177 67
    178 68
    179 69
    180 70
    181 71
    182 72
    183 73
    184 74
    185 75
    186 76
    

##### 用例8

    
    
    165 55
    166 56
    167 57
    168 58
    169 59
    170 60
    171 61
    172 62
    173 63
    174 64
    175 65
    176 66
    

##### 用例9

    
    
    155 45
    156 46
    157 47
    158 48
    159 49
    160 50
    161 51
    162 52
    163 53
    164 54
    165 55
    166 56
    

##### 用例10

    
    
    145 35
    146 36
    147 37
    148 38
    149 39
    150 40
    151 41
    152 42
    153 43
    154 44
    155 45
    156 46
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

