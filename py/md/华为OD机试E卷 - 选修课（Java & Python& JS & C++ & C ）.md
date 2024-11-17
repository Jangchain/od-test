## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

## 题目描述

现有两门选修课，每门选修课都有一部分学生选修，每个学生都有选修课的成绩，需要你找出同时选修了两门选修课的学生，先按照班级进行划分，班级编号小的先输出，每个班级按照两门选修课成绩和的降序排序，成绩相同时按照学生的学号升序排序。

## 输入描述

第一行为第一门选修课学生的成绩，

第二行为第二门选修课学生的成绩，每行数据中学生之间以英文分号分隔，每个学生的学号和成绩以英文逗号分隔，

学生学号的格式为8位数字(2位院系编号+入学年份后2位+院系内部1位专业编号+所在班级3位学号)，

学生成绩的取值范围为[0,100]之间的整数，

两门选修课选修学生数的取值范围为[1-2000]之间的整数。

## 输出描述

同时选修了两门选修课的学生的学号，如果没有同时选修两门选修课的学生输出NULL，

否则，先按照班级划分，班级编号小的先输出，每个班级先输出班级编号(学号前五位)，然后另起一行输出这个班级同时选修两门选修课的学生学号，学号按照要求排序(按照两门选修课成绩和的降序，成绩和相同时按照学号升序)，学生之间以英文分号分隔。

## 示例1

输入

    
    
    01202021,75;01201033,95;01202008,80;01203006,90;01203088,100
    01202008,70;01203088,85;01202111,80;01202021,75;01201100,88
    

输出

    
    
    01202
    01202008;01202021
    01203
    01203088
    

说明

>
> 同时选修了两门选修课的学生01202021、01202008、01203088，这三个学生两门选修课的成绩和分别为150、150、185，01202021、01202008属于01202班的学生，按照成绩和降序，成绩相同时按学号升序输出的结果为01202008;01202021,01203088属于01203班的学生，按照成绩和降序，成绩相同时按学号升序输出的结果为01203088，01202的班级编号小于01203的班级编号，需要先输出。

## 示例2

输入

    
    
    01201022,75;01202033,95;01202018,80;01203006,90;01202066,100
    01202008,70;01203102,85;01202111,80;01201021,75;01201100,88
    

输出

    
    
    NULL
    

说明

> 没有同时选修了两门选修课的学生，输出NULL。

## 解题思路

#### 题目理解：

题目要求我们处理两个选修课的学生成绩数据，并找出同时选修了两门选修课的学生。然后按照以下规则输出结果：

  1. **班级划分** ：学生学号的前五位代表班级编号，需要先按班级进行划分，班级编号小的先输出。
  2. **排序规则** ：每个班级内部按照两门选修课成绩之和的降序排序。如果成绩和相同，则按照学号升序排序。

#### 输入格式：

  * 第一行是第一门选修课的学生成绩，每个学生的学号和成绩用英文逗号分隔，学生之间用英文分号分隔。
  * 第二行是第二门选修课的学生成绩，格式同上。
  * 学生的学号是8位数字，表示： 
    * **前两位** 是院系编号，
    * **第3和第4位** 是入学年份，
    * **第5位** 是院系内部的专业编号，
    * **第6到第8位** 是班级学号。

本题题目不难，就是拆解用例比较烦！

## Java

    
    
    import java.util.ArrayList;
    import java.util.HashMap;
    import java.util.Scanner;
    import java.util.StringJoiner;
    
    public class Main {
        static class Student {
            String studentId; // 学生学号
            String classId; // 班级编号
            int score1 = -1; // 第一门选修课成绩
            int score2 = -1; // 第二门选修课成绩
    
            public int getSumScore() { // 计算两门选修课成绩和
                return this.score1 + this.score2;
            }
        }
    
        public static void main(String[] args) {
            Scanner sc = new Scanner(System.in);
            String scores1 = sc.nextLine(); // 第一门选修课学生的成绩
            String scores2 = sc.nextLine(); // 第二门选修课学生的成绩
            HashMap<String, Student> students = new HashMap<>(); // 存储学生信息的HashMap
            divide(scores1, 1, students); // 将第一门选修课学生成绩划分到HashMap中
            divide(scores2, 2, students); // 将第二门选修课学生成绩划分到HashMap中
            Student[] selectedStudents = students.values().stream().filter(stu -> stu.score1 != -1 && stu.score2 != -1)
                    .toArray(Student[]::new); // 选取同时选修了两门选修课的学生
            if (selectedStudents.length == 0) {
                System.out.println("NULL"); // 如果没有同时选修两门选修课的学生，则输出NULL
                return;
            }
            HashMap<String, ArrayList<Student>> ans = new HashMap<>(); // 存储按班级划分的学生信息的HashMap
            for (Student stu : selectedStudents) {
                ans.putIfAbsent(stu.classId, new ArrayList<>()); // 如果班级还没有被加入HashMap中，则加入
                ans.get(stu.classId).add(stu); // 将学生加入对应班级的ArrayList中
            }
            ans.keySet().stream().sorted(String::compareTo).forEach(classId -> {
                System.out.println(classId); // 先输出班级编号
                ArrayList<Student> studentsInClass = ans.get(classId);
                studentsInClass.sort((a, b) -> a.getSumScore() != b.getSumScore() ? b.getSumScore() - a.getSumScore()
                        : a.studentId.compareTo(b.studentId)); // 按照成绩和的降序和学号的升序排序
                StringJoiner sj = new StringJoiner(";"); // 用于拼接学生学号的StringJoiner
                for (Student student : studentsInClass)
                    sj.add(student.studentId); // 将学生学号加入StringJoiner中
                System.out.println(sj); // 输出学生学号
            });
        }
    
        public static void divide(String str, int courseId, HashMap<String, Student> students) {
            for (String sub : str.split(";")) {
                String[] tmp = sub.split(",");
                String studentId = tmp[0]; // 学生学号
                String classId = studentId.substring(0, 5); // 班级编号
                int score = Integer.parseInt(tmp[1]); // 选修课成绩
                students.putIfAbsent(studentId, new Student()); // 如果学生还没有被加入HashMap中，则加入
                Student stu = students.get(studentId);
                stu.studentId = studentId;
                stu.classId = classId;
                if (courseId == 1)
                    stu.score1 = score; // 将第一门选修课成绩加入学生对象中
                else
                    stu.score2 = score; // 将第二门选修课成绩加入学生对象中
            }
        }
    }
    
    

## Python

    
    
    class Student:
        def __init__(self):
            self.studentId = ""  # 学生学号
            self.classId = ""  # 班级编号
            self.score1 = -1  # 第一门选修课成绩
            self.score2 = -1  # 第二门选修课成绩
    
        def getSumScore(self):  # 计算两门选修课成绩和
            return self.score1 + self.score2
    
    
    def divide(str, courseId, students):
        for sub in str.split(";"):
            tmp = sub.split(",")
            studentId = tmp[0]  # 学生学号
            classId = studentId[:5]  # 班级编号
            score = int(tmp[1])  # 选修课成绩
            if studentId not in students:
                students[studentId] = Student()  # 如果学生还没有被加入HashMap中，则加入
            stu = students[studentId]
            stu.studentId = studentId
            stu.classId = classId
            if courseId == 1:
                stu.score1 = score  # 将第一门选修课成绩加入学生对象中
            else:
                stu.score2 = score  # 将第二门选修课成绩加入学生对象中
    
    
    scores1 = input()  # 第一门选修课学生的成绩
    scores2 = input()  # 第二门选修课学生的成绩
    students = {}  # 存储学生信息的字典
    divide(scores1, 1, students)  # 将第一门选修课学生成绩划分到字典中
    divide(scores2, 2, students)  # 将第二门选修课学生成绩划分到字典中
    selectedStudents = [stu for stu in students.values() if stu.score1 != -1 and stu.score2 != -1]  # 选取同时选修了两门选修课的学生
    if len(selectedStudents) == 0:
        print("NULL")  # 如果没有同时选修两门选修课的学生，则输出NULL
    else:
        ans = {}  # 存储按班级划分的学生信息的字典
        for stu in selectedStudents:
            if stu.classId not in ans:
                ans[stu.classId] = []  # 如果班级还没有被加入字典中，则加入
            ans[stu.classId].append(stu)  # 将学生加入对应班级的列表中
        for classId in sorted(ans.keys()):
            print(classId)  # 先输出班级编号
            studentsInClass = ans[classId]
            studentsInClass.sort(key=lambda stu: (-stu.getSumScore(), stu.studentId))  # 按照成绩和的降序和学号的升序排序
            studentIds = [stu.studentId for stu in studentsInClass]  # 学生学号列表
            print(";".join(studentIds))  # 输出学生学号
    
    

## JavaScript

    
    
    const readline = require('readline');
    
    class Student {
      constructor() {
        this.studentId = ""; // 学生学号
        this.classId = ""; // 班级编号
        this.score1 = -1; // 第一门选修课成绩
        this.score2 = -1; // 第二门选修课成绩
      }
    
      getSumScore() { // 计算两门选修课成绩和
        return this.score1 + this.score2;
      }
    }
    
    function divide(str, courseId, students) {
      for (let sub of str.split(";")) {
        let tmp = sub.split(",");
        let studentId = tmp[0]; // 学生学号
        let classId = studentId.slice(0, 5); // 班级编号
        let score = parseInt(tmp[1]); // 选修课成绩
        if (!(studentId in students)) {
          students[studentId] = new Student(); // 如果学生还没有被加入HashMap中，则加入
        }
        let stu = students[studentId];
        stu.studentId = studentId;
        stu.classId = classId;
        if (courseId === 1) {
          stu.score1 = score; // 将第一门选修课成绩加入学生对象中
        } else {
          stu.score2 = score; // 将第二门选修课成绩加入学生对象中
        }
      }
    }
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.on('line', (scores1) => {
      rl.on('line', (scores2) => {
        let students = {}; // 存储学生信息的字典
        divide(scores1, 1, students); // 将第一门选修课学生成绩划分到字典中
        divide(scores2, 2, students); // 将第二门选修课学生成绩划分到字典中
        let selectedStudents = Object.values(students).filter(stu => stu.score1 !== -1 && stu.score2 !== -1); // 选取同时选修了两门选修课的学生
        if (selectedStudents.length === 0) {
          console.log("NULL"); // 如果没有同时选修两门选修课的学生，则输出NULL
        } else {
          let ans = {}; // 存储按班级划分的学生信息的字典
          for (let stu of selectedStudents) {
            if (!(stu.classId in ans)) {
              ans[stu.classId] = []; // 如果班级还没有被加入字典中，则加入
            }
            ans[stu.classId].push(stu); // 将学生加入对应班级的列表中
          }
          for (let classId of Object.keys(ans).sort()) {
            console.log(classId); // 先输出班级编号
            let studentsInClass = ans[classId];
            studentsInClass.sort((a, b) => (b.getSumScore() - a.getSumScore()) || (a.studentId.localeCompare(b.studentId))); // 按照成绩和的降序和学号的升序排序
            let studentIds = studentsInClass.map(stu => stu.studentId); // 学生学号列表
            console.log(studentIds.join(";")); // 输出学生学号
          }
        }
        rl.close();
      });
    });
    
    

## C++

    
    
    #include <iostream>
    #include <map>
    #include <set>
    #include <sstream>
    #include <string>
    #include <vector>
    
    using namespace std;
    
    struct Student {
        string id;
        int score;
        Student(const string& id, int score) : id(id), score(score) {}
        bool operator<(const Student& other) const {
            return score != other.score ? score > other.score : id < other.id;
        }
    };
    
    int main() {
        string line_one, line_two;
        getline(cin, line_one);
        getline(cin, line_two);
    
        map<string, int> tIds;
        stringstream ss(line_two);
        string token;
        while (getline(ss, token, ';')) {
            vector<string> tStu;
            stringstream ss2(token);
            while (getline(ss2, token, ',')) {
                tStu.push_back(token);
            }
            tIds[tStu[0]] = stoi(tStu[1]);
        }
    
        map<string, set<Student>> map;
        stringstream ss3(line_one);
        while (getline(ss3, token, ';')) {
            vector<string> sStu;
            stringstream ss4(token);
            while (getline(ss4, token, ',')) {
                sStu.push_back(token);
            }
            const string& sId = sStu[0];
            if (tIds.count(sId)) {
                const int totalScore = stoi(sStu[1]) + tIds[sId];
                const string cls = sId.substr(0, 5);
                map[cls].emplace(sId, totalScore);
            }
        }
    
        if (map.empty()) {
            cout << "NULL\n";
        } else {
            for (const auto& [key, value] : map) {
                cout << key << "\n";
                string res;
                for (const auto& student : value) {
                    res += student.id + ";";
                }
                res.pop_back(); 
                cout << res << "\n";
            }
        }
    
        return 0;
    }
    
    
    

## C语言

    
    
    #include <stdio.h>
    #include <stdlib.h>
    #include <string.h>
    
    #define MAX_STUDENTS 2000
    #define ID_LEN 10
    #define CLASS_ID_LEN 6
    
    // 学生结构体，包含学生学号、班级编号、两门选修课的成绩
    typedef struct {
        char studentId[ID_LEN]; // 学生学号
        char classId[CLASS_ID_LEN]; // 班级编号
        int score1; // 第一门选修课成绩
        int score2; // 第二门选修课成绩
    } Student;
    
    // 用于存储学生信息的全局数组
    Student students[MAX_STUDENTS];
    int student_count = 0; // 学生数量
    
    // 按照总成绩降序，学号升序比较函数
    int compare_students(const void* a, const void* b) {
        Student* s1 = (Student*)a;
        Student* s2 = (Student*)b;
        int sum1 = s1->score1 + s1->score2;
        int sum2 = s2->score1 + s2->score2;
        if (sum1 != sum2) {
            return sum2 - sum1; // 按照总成绩降序排列
        } else {
            return strcmp(s1->studentId, s2->studentId); // 如果成绩相同则按照学号升序排列
        }
    }
    
    // 通过分割字符串，将学生成绩导入到结构体中
    void divide(const char* str, int courseId) {
        char buffer[10000];
        strcpy(buffer, str); // 复制输入字符串以便修改
        char* token = strtok(buffer, ";"); // 按分号分割字符串
    
        while (token != NULL) {
            char studentId[ID_LEN];
            int score;
            sscanf(token, "%[^,],%d", studentId, &score); // 解析学号和成绩
    
            // 查找是否已存在该学生
            int found = 0;
            for (int i = 0; i < student_count; i++) {
                if (strcmp(students[i].studentId, studentId) == 0) {
                    found = 1;
                    if (courseId == 1) {
                        students[i].score1 = score; // 记录第一门课程成绩
                    } else {
                        students[i].score2 = score; // 记录第二门课程成绩
                    }
                    break;
                }
            }
    
            // 如果没有找到该学生，则新建学生
            if (!found) {
                strcpy(students[student_count].studentId, studentId);
                strncpy(students[student_count].classId, studentId, 5); // 班级编号为学号前五位
                students[student_count].classId[5] = '\0'; // 确保字符串正确结束
                if (courseId == 1) {
                    students[student_count].score1 = score; // 设置第一门课成绩
                    students[student_count].score2 = -1;    // 第二门课成绩未设定
                } else {
                    students[student_count].score1 = -1;    // 第一门课成绩未设定
                    students[student_count].score2 = score; // 设置第二门课成绩
                }
                student_count++;
            }
    
            token = strtok(NULL, ";"); // 继续分割下一个学生记录
        }
    }
    
    int main() {
        char line_one[10000], line_two[10000];
    
        // 读取两行输入，第一行是第一门选修课成绩，第二行是第二门选修课成绩
        fgets(line_one, sizeof(line_one), stdin);
        fgets(line_two, sizeof(line_two), stdin);
    
        // 处理第一门和第二门课程的学生成绩
        divide(line_one, 1);
        divide(line_two, 2);
    
        // 创建按班级分类的数组
        Student selectedStudents[MAX_STUDENTS];
        int selected_count = 0;
    
        // 筛选出同时选修了两门课程的学生
        for (int i = 0; i < student_count; i++) {
            if (students[i].score1 != -1 && students[i].score2 != -1) {
                selectedStudents[selected_count++] = students[i];
            }
        }
    
        // 如果没有找到符合条件的学生，则输出 "NULL"
        if (selected_count == 0) {
            printf("NULL\n");
            return 0;
        }
    
        // 对筛选出的学生按照班级编号和成绩进行分类和排序
        qsort(selectedStudents, selected_count, sizeof(Student), compare_students);
    
        // 输出学生信息，按班级分组
        char current_class[CLASS_ID_LEN] = "";
        for (int i = 0; i < selected_count; i++) {
            // 如果当前学生的班级不同于上一个，则输出班级编号
            if (strcmp(current_class, selectedStudents[i].classId) != 0) {
                if (i > 0) printf("\n"); // 换行符
                strcpy(current_class, selectedStudents[i].classId);
                printf("%s\n", current_class); // 输出班级编号
            }
    
            // 输出学生学号
            if (i > 0 && strcmp(current_class, selectedStudents[i - 1].classId) == 0) {
                printf(";"); // 同一班级中的学号之间使用分号隔开
            }
            printf("%s", selectedStudents[i].studentId);
        }
    
        printf("\n");
        return 0;
    }
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

#### 完整用例

##### 用例1

    
    
    01202021,75;01201033,95;01202008,80;01203006,90;01203088,100
    01202008,70;01203088,85;01202111,80;01202021,75;01201100,88
    

##### 用例2

    
    
    01201100,88
    01202111,80
    

##### 用例3

    
    
    01202021,75;01201033,95;01202008,80;01203006,90;01203088,100
    01202008,70;01203088,85;01202111,80;01202021,75;01201100,88;01201001,95
    

##### 用例4

    
    
    01202021,75;01201033,95;01202008,80;01203006,90;01203088,100
    01202008,70;01203088,85;01202111,80;01202021,75;01201100,88;01201001,95;01203007,90
    

##### 用例5

    
    
    01202021,75
    01202008,70
    

##### 用例6

    
    
    01202021,75;01201033,95;01202008,80;01203006,90;01203088,100;01204001,85;01204002,90;01204003,95;01204004,80;01204005,100
    01202008,70;01203088,85;01202111,80;01202021,75;01201100,88;01204001,90;01204002,85;01204003,80;01204004,95;01204005,100
    

##### 用例7

    
    
    01202021,75;01201033,95;01202008,80;01203006,90;01203088,100;01204001,85;01204002,90;01204003,95;01204004,80;01204005,100
    01202008,70;01203088,85;01202111,80;01202021,75;01201100,88;01204001,90;01204002,85;01204003,80;01204004,95;01204005,100;01203088,90
    

##### 用例8

    
    
    01202021,75;01201033,95;01202008,80;01203006,90;01203088,100;01204001,85;01204002,90;01204003,95;01204004,80;01204005,100;01205001,85;01205002,90;01205003,95;01205004,80;01205005,100
    01202008,70;01203088,85;01202111,80;01202021,75;01201100,88;01204001,90;01204002,85;01204003,80;01204004,95;01204005,100;01203088,90;01205001,85;01205002,90;01205003,95;01205004,80;01205005,100
    

##### 用例9

    
    
    01202021,75;01201033,95;01202008,80;01203006,90;01203088,100;01204001,85;01204002,90;01204003,95;01204004,80;01204005,100;01205001,85;01205002,90;01205003,95;01205004,80;01205005,100
    01202008,70;01203088,85;01202111,80;01202021,75;01201100,88;01204001,90;01204002,85;01204003,80;01204004,95;01204005,100;01203088,90;01205001,85;01205002,90;01205003,95;01205004,80;01205005,100;01203006,90
    

##### 用例10

    
    
    01202021,75;01201033,95;01202008,80;01203006,90;01203088,100
    01202008,70;01203088,85;01202111,80;01202021,75;01201100,88;01201001,90
    

