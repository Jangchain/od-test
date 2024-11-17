#### 题目描述

> 给定数组[[2,1],[3 2]]，每组表示师徒关系，第一个元素是第二个元素的老师，数字代表排名，现在找出比自己强的徒弟。

#### 输入描述

无

#### 输出描述

无

##### ACM输入输出模式

如果你经常使用**Leetcode** ,会知道**letcode** 是不需要编写输入输出函数的。但是华为OD机考使用的是 **ACM 模式**
，需要手动编写输入和输出。

所以最好在牛-
客上提前熟悉这种模式。例如C++使用`cin/cout`,python使用`input()/print()`。JavaScript使用node的`readline()`和`console.log()`。Java
使用`sacnner/system.out.print()`

#### 用例

输入| [[2,1],[3,2]]  
---|---  
输出| [0,1,2]  
说明| 输入：第一行数据[2,1]表示排名第 2 的员工是排名第 1 员工的导师，后面的数据以此类推。输出：第一个元素 0
表示成绩排名第一的导师，没有徒弟考试超过他；  
第二个元素 1 表示成绩排名第二的导师，有 1 个徒弟成绩超过他  
第三个元素 2 表示成绩排名第三的导师，有 2 个徒弟成绩超过他  
  
#### 机考代码查重

华为OD机考完成之后，官方会进行代码查重。**华为 od 机考确实有很大的概率抽到原题**
。如果碰到了题库中的原题，一定不要直接使用题解中的代码，尤其是变量名，一定要修改，可以改成毫无意义的单词。除了变量名之外，代码的组织结构和逻辑一定要进行改变，这就要求在日常的刷题中，提前编写好属于自己的代码。

#### C++

    
    
    #include <iostream>
    #include <string>
    #include <vector>
    #include <map>
    #include <algorithm>
    
    using namespace std;
    
    int main() {
        string input_str;
        getline(cin, input_str);
        vector<pair<int, int>> grade_info;
    
        // 去除方括号
        string temp = "";
        for (char c : input_str) {
            if (c != '[' && c != ']') {
                temp += c;
            }
        }
    
        // 逗号分隔
        vector<int> grades;
        while (temp.find(',') != string::npos) {
            int found = temp.find(',');
            grades.push_back(stoi(temp.substr(0, found)));
            temp = temp.substr(found + 1);
        }
        grades.push_back(stoi(temp));
    
        // 两两一组
        for (int i = 0; i < grades.size(); i += 2) {
            grade_info.push_back(make_pair(grades[i], grades[i + 1]));
        }
    
        // 遍历找关系
        map<int, int> stronger_count;
        for (int i = 0; i < grade_info.size(); i++) {
            int teacher = grade_info[i].first;
            for (int j = 0; j < grade_info.size(); j++) {
                int student = grade_info[j].second;
                if (teacher > student) {
                    stronger_count[teacher]++;
                    stronger_count[student];
                }
            }
        }
    
        // 构造输出
        string result = "[";
        for (auto it = stronger_count.begin(); it != stronger_count.end(); it++) {
            result += to_string(it->second) + ",";
        }
        if (!stronger_count.empty()) {
            result.pop_back();
        }
        result += "]";
    
        cout << result << endl;
    
        return 0;
    }
    
    

#### JavaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    let input_str = '';
    
    rl.on('line', (input) => {
      input_str = input;
      rl.close();
    });
    
    rl.on('close', () => {
      let grade_info = [];
    
      // 去除方括号
      let temp = '';
      for (let char of input_str) {
        if (char !== '[' && char !== ']') {
          temp += char;
        }
      }
    
      // 逗号分隔
      let grades = [];
      while (temp.includes(',')) {
        let found = temp.indexOf(',');
        grades.push(parseInt(temp.slice(0, found)));
        temp = temp.slice(found+1);
      }
      grades.push(parseInt(temp));
    
      // 两两一组
      let i = 0;
      while (i < grades.length) {
        grade_info.push([grades[i], grades[i+1]]);
        i += 2;
      }
    
      // 遍历找关系
      let stronger_count = {};
      for (let i = 0; i < grade_info.length; i++) {
        let teacher = grade_info[i][0];
        for (let j = 0; j < grade_info.length; j++) {
          let student = grade_info[j][1];
          if (teacher > student) {
            stronger_count[teacher] = stronger_count[teacher] ? stronger_count[teacher]+1 : 1;
            stronger_count[student] = stronger_count[student] ? stronger_count[student] : 0;
          }
        }
      }
    
      // 构造输出
      let result = '[' + Object.keys(stronger_count).sort().map(k => stronger_count[k]).join(',') + ']';
      console.log(result);
    });
    

#### Java

    
    
    import java.util.Scanner;
    import java.util.ArrayList;
    import java.util.Collections;
    
    public class Main {
        public static void main(String[] args) {
            // 创建Scanner对象，从控制台读取输入
            Scanner sc = new Scanner(System.in);
            String input_str = sc.nextLine();
            sc.close(); // 关闭Scanner对象
            
            // 创建ArrayList对象grades，用于存储输入的成绩
            ArrayList<Integer> grades = new ArrayList<Integer>();
            // 将输入的字符串中的"["和"]"去掉，然后以","为分隔符，将字符串分割成字符串数组temp
            input_str = input_str.replace("[", "");
            input_str = input_str.replace("]", "");
            String[] temp = input_str.split(",");
            // 遍历字符串数组temp，将每个字符串转换成整数，并添加到grades中
            for (String s : temp) {
                grades.add(Integer.parseInt(s));
            }
            
            // 创建ArrayList对象grade_info，用于存储成绩对（教师、学生）的信息
            ArrayList<ArrayList<Integer>> grade_info = new ArrayList<ArrayList<Integer>>();
            // 遍历grades，每次取出两个整数，作为一组成绩对，添加到grade_info中
            for (int i = 0; i < grades.size(); i += 2) {
                ArrayList<Integer> pair = new ArrayList<Integer>();
                pair.add(grades.get(i));
                pair.add(grades.get(i+1));
                grade_info.add(pair);
            }
            
            // 创建ArrayList对象teachers和students，分别用于存储所有教师和学生的编号
            ArrayList<Integer> teachers = new ArrayList<Integer>();
            ArrayList<Integer> students = new ArrayList<Integer>();
            // 遍历grade_info，每次取出一组成绩对，将其中的教师和学生编号分别添加到teachers和students中
            for (ArrayList<Integer> pair : grade_info) {
                teachers.add(pair.get(0));
                students.add(pair.get(1));
            }
            
            // 创建ArrayList对象stronger_count，用于存储每个教师比多少个学生成绩高
            // 使用Collections.nCopies方法，将stronger_count初始化为0，长度为所有教师编号的最大值加1
            ArrayList<Integer> stronger_count = new ArrayList<Integer>(Collections.nCopies(Collections.max(teachers)+1, 0));
            // 遍历grade_info，每次取出一组成绩对，分别取出其中的教师和学生编号
            // 然后遍历grade_info，每次取出一组成绩对，分别取出其中的学生编号
            // 如果教师编号大于学生编号，则将该教师的stronger_count加1
            for (int i = 0; i < grade_info.size(); i++) {
                int teacher = grade_info.get(i).get(0);
                for (int j = 0; j < grade_info.size(); j++) {
                    int student = grade_info.get(j).get(1);
                    if (teacher > student) {
                        stronger_count.set(teacher, stronger_count.get(teacher)+1);
                    }
                }
            }
            
            // 将stronger_count中除了第一个元素以外的所有元素转换成字符串，然后输出
            String result = stronger_count.subList(1, stronger_count.size()).toString();
            System.out.println(result);
        }
    }
    

#### Python

    
    
    input_str = input()
    grade_info = []
    
    # 去除方括号
    temp = ''
    for char in input_str:
        if char != '[' and char != ']':
            temp += char
    
    # 逗号分隔
    grades = []
    while ',' in temp:
        found = temp.find(',')
        grades.append(int(temp[:found]))
        temp = temp[found+1:]
    grades.append(int(temp))
    
    # 两两一组
    i = 0
    while i < len(grades):
        grade_info.append((grades[i], grades[i+1]))
        i += 2
    
    # 遍历找关系
    stronger_count = {}
    for i in range(len(grade_info)):
        teacher = grade_info[i][0]
        for j in range(len(grade_info)):
            student = grade_info[j][1]
            if teacher > student:
                stronger_count[teacher] = stronger_count.get(teacher, 0) + 1
                stronger_count[student] = stronger_count.get(student, 0)
    
    # 构造输出
    result = '[' + ','.join(str(stronger_count[k]) for k in sorted(stronger_count)) + ']'
    print(result)
    

#### 文章目录

  *     *       * 题目描述
      * 输入描述
      * 输出描述
      *         * ACM输入输出模式
      * 用例
      * 机考代码查重
      * C++
      * JavaScript
      * Java
      * Python

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

