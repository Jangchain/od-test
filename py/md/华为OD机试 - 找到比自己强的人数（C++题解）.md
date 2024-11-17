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
    
    

#### 文章目录

  *     *       * 题目描述
      * 输入描述
      * 输出描述
      *         * ACM输入输出模式
      * 用例
      * 机考代码查重
      * C++

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

