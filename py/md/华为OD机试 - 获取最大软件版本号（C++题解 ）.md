## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

#### 题目描述

_Maven_ 版本号定义，<主版本>.<次版本>.<增量版本>-<里程碑版本>，举例3.1.4-beta

其中，主版本和次版本都是必须的，主版本，次版本，增量版本由多位数字组成，可能包含前导零，里程碑版本由字符串组成。  
<主版本>.<次版本>.<增量版本>：基于**数字** 比较；例如

> 1.5 > 1.4 > 1.3.11 > 1.3.9

里程碑版本：基于**字符串** 比较，采用**字典序；**例如

> 1.2-beta-3 > 1.2-beta-11

比较版本号时，按从左到右的顺序依次比较。

基于数字比较， 只需比较**忽略任何前导零后的整数值** 。  
输入2个版本号，输出**最大版本号** 。

#### 输入描述

输入2个版本号，换行分割，每个版本的最大长度小于50

#### 输出描述

版本号相同时输出第一个输入版本号

#### 用例

输入| 2.5.1-C  
1.4.2-D  
---|---  
输出| 2.5.1-C  
说明| 无  
输入| 1.05.1  
1.5.01  
---|---  
输出| 1.05.1  
说明| 版本号相同，输出第一个版本号  
输入| 1.5  
1.5.0  
---|---  
输出| 1.5.0  
说明| 主次相同，存在增量版本大于不存在  
输入| 1.5.1-A  
1.5.1-a  
---|---  
输出| 1.5.1-a  
说明| 里程碑版本号，基于字典序比较，a 大于 A  
  
#### 题目解析

简单排序题，先按 ‘-’分隔，再按.分隔，把四个部分都筛选出来比较即可。

#### C++

    
    
    #include <iostream>
    #include <string>
    using namespace std;
    
    int main() {
        // 输入版本号
        string version1, version2;
        getline(cin, version1); // 获取第一个版本号
        getline(cin, version2); // 获取第二个版本号
    
        // 按照“.”分割版本号
        string version1Arr[3], version2Arr[3];
        int pos1 = 0, pos2 = 0;
        for (int i = 0; i < 3; i++) {
            int end1 = version1.find('.', pos1);
            int end2 = version2.find('.', pos2);
            if (end1 == string::npos) end1 = version1.length();
            if (end2 == string::npos) end2 = version2.length();
            version1Arr[i] = version1.substr(pos1, end1 - pos1);
            version2Arr[i] = version2.substr(pos2, end2 - pos2);
            pos1 = end1 + 1;
            pos2 = end2 + 1;
        }
    
        // 比较前两位版本号
        for (int i = 0; i < 2; i++) { // 循环前两位版本号
            int v1 = stoi(version1Arr[i]); // 将第一个版本号的当前位转换为整数
            int v2 = stoi(version2Arr[i]); // 将第二个版本号的当前位转换为整数
            if (v1 != v2) { // 如果两个版本号当前位不相等
                cout << (v1 > v2 ? version1 : version2) << endl; // 输出大的版本号
                return 0; // 结束程序
            }
        }
    
        // 比较第三位版本号
        if (version1Arr[2] != "" && version2Arr[2] != "") { // 如果第一个版本号和第二个版本号都有第三位版本号
            string version1ThirdArr[2], version2ThirdArr[2];
            int end1 = version1Arr[2].find('-');
            int end2 = version2Arr[2].find('-');
            if (end1 == string::npos) end1 = version1Arr[2].length();
            if (end2 == string::npos) end2 = version2Arr[2].length();
            version1ThirdArr[0] = version1Arr[2].substr(0, end1);
            version2ThirdArr[0] = version2Arr[2].substr(0, end2);
            if (end1 < version1Arr[2].length()) version1ThirdArr[1] = version1Arr[2].substr(end1 + 1);
            if (end2 < version2Arr[2].length()) version2ThirdArr[1] = version2Arr[2].substr(end2 + 1);
            int v1 = stoi(version1ThirdArr[0]); // 将第一个版本号的第三位转换为整数
            int v2 = stoi(version2ThirdArr[0]); // 将第二个版本号的第三位转换为整数
            if (v1 != v2) { // 如果两个版本号的第三位不相等
                cout << (v1 > v2 ? version1 : version2) << endl; // 输出大的版本号
                return 0; // 结束程序
            }
            if (version1ThirdArr[1] != "" && version2ThirdArr[1] != "") { // 如果第一个版本号和第二个版本号的第三位都包含“-”
                cout << (version1ThirdArr[1].compare(version2ThirdArr[1]) >= 0 ? version1 : version2) << endl; // 比较两个版本号的第三位后面的字符串，输出大的版本号
            } else { // 如果第一个版本号和第二个版本号的第三位不都包含“-”
                cout << (version1ThirdArr[1].length() >= version2ThirdArr[1].length() ? version1 : version2) << endl; // 比较两个版本号的第三位的长度，输出长的版本号
            }
        } else { // 如果第一个版本号和第二个版本号都没有第三位版本号
            cout << (version1Arr[2].length() >= version2Arr[2].length() ? version1 : version2) << endl; // 比较两个版本号的长度，输出长的版本号
        }
        return 0;
    }
    

#### JavaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.on('line', (input) => {
      if (!rl.version1) {
        rl.version1 = input;
      } else if (!rl.version2) {
        rl.version2 = input;
        compareVersion(rl.version1, rl.version2);
        rl.close();
      }
    });
    
    function compareVersion(version1, version2) {
      // 按照“.”分割版本号
      const version1Arr = version1.split('.');
      const version2Arr = version2.split('.');
    
      // 比较前两位版本号
      for (let i = 0; i < 2; i++) { // 循环前两位版本号
        const v1 = parseInt(version1Arr[i]); // 将第一个版本号的当前位转换为整数
        const v2 = parseInt(version2Arr[i]); // 将第二个版本号的当前位转换为整数
        if (v1 !== v2) { // 如果两个版本号当前位不相等
          console.log(v1 > v2 ? version1 : version2); // 输出大的版本号
          return; // 结束程序
        }
      }
    
      // 比较第三位版本号
      if (version1Arr[2] && version2Arr[2]) { // 如果第一个版本号和第二个版本号都有第三位版本号
        const version1ThirdArr = version1Arr[2].split('-');
        const version2ThirdArr = version2Arr[2].split('-');
        const v1 = parseInt(version1ThirdArr[0]); // 将第一个版本号的第三位转换为整数
        const v2 = parseInt(version2ThirdArr[0]); // 将第二个版本号的第三位转换为整数
        if (v1 !== v2) { // 如果两个版本号的第三位不相等
          console.log(v1 > v2 ? version1 : version2); // 输出大的版本号
          return; // 结束程序
        }
        if (version1ThirdArr[1] && version2ThirdArr[1]) { // 如果第一个版本号和第二个版本号的第三位都包含“-”
          console.log(version1ThirdArr[1].localeCompare(version2ThirdArr[1]) >= 0 ? version1 : version2); // 比较两个版本号的第三位后面的字符串，输出大的版本号
        } else { // 如果第一个版本号和第二个版本号的第三位不都包含“-”
          console.log(version1ThirdArr[1].length >= version2ThirdArr[1].length ? version1 : version2); // 比较两个版本号的第三位的长度，输出长的版本号
        }
      } else { // 如果第一个版本号和第二个版本号都没有第三位版本号
        console.log(version1Arr[2].length >= version2Arr[2].length ? version1 : version2); // 比较两个版本号的长度，输出长的版本号
      }
    }
    

#### Java

    
    
    import java.util.Scanner;
    
    public class VersionCompare {
        public static void main(String[] args) {
            // 输入版本号
            Scanner scanner = new Scanner(System.in);
            String version1 = scanner.nextLine(); // 获取第一个版本号
            String version2 = scanner.nextLine(); // 获取第二个版本号
    
            // 按照“.”分割版本号
            String[] version1Arr = version1.split("\\."); // 将第一个版本号按照“.”分割成字符串数组
            String[] version2Arr = version2.split("\\."); // 将第二个版本号按照“.”分割成字符串数组
    
            // 比较前两位版本号
            for (int i = 0; i < 2; i++) { // 循环前两位版本号
                int v1 = Integer.parseInt(version1Arr[i]); // 将第一个版本号的当前位转换为整数
                int v2 = Integer.parseInt(version2Arr[i]); // 将第二个版本号的当前位转换为整数
                if (v1 != v2) { // 如果两个版本号当前位不相等
                    System.out.println(v1 > v2 ? version1 : version2); // 输出大的版本号
                    return; // 结束程序
                }
            }
    
            // 比较第三位版本号
            if (version1Arr.length > 2 && version2Arr.length > 2) { // 如果第一个版本号和第二个版本号都有第三位版本号
                String[] version1ThirdArr = version1Arr[2].split("-"); // 将第一个版本号的第三位按照“-”分割成字符串数组
                String[] version2ThirdArr = version2Arr[2].split("-"); // 将第二个版本号的第三位按照“-”分割成字符串数组
                int v1 = Integer.parseInt(version1ThirdArr[0]); // 将第一个版本号的第三位转换为整数
                int v2 = Integer.parseInt(version2ThirdArr[0]); // 将第二个版本号的第三位转换为整数
                if (v1 != v2) { // 如果两个版本号的第三位不相等
                    System.out.println(v1 > v2 ? version1 : version2); // 输出大的版本号
                    return; // 结束程序
                }
                if (version1ThirdArr.length == 2 && version2ThirdArr.length == 2) { // 如果第一个版本号和第二个版本号的第三位都包含“-”
                    System.out.println(version1ThirdArr[1].compareTo(version2ThirdArr[1]) >= 0 ? version1 : version2); // 比较两个版本号的第三位后面的字符串，输出大的版本号
                } else { // 如果第一个版本号和第二个版本号的第三位不都包含“-”
                    System.out.println(version1ThirdArr.length >= version2ThirdArr.length ? version1 : version2); // 比较两个版本号的第三位的长度，输出长的版本号
                }
            } else { // 如果第一个版本号和第二个版本号都没有第三位版本号
                System.out.println(version1Arr.length >= version2Arr.length ? version1 : version2); // 比较两个版本号的长度，输出长的版本号
            }
        }
    }
    

#### Python

    
    
    version1 = input() # 获取第一个版本号
    version2 = input() # 获取第二个版本号
    
    # 按照“.”分割版本号
    version1Arr = version1.split(".") # 将第一个版本号按照“.”分割成字符串数组
    version2Arr = version2.split(".") # 将第二个版本号按照“.”分割成字符串数组
    
    # 比较前两位版本号
    for i in range(2): # 循环前两位版本号
        v1 = int(version1Arr[i]) # 将第一个版本号的当前位转换为整数
        v2 = int(version2Arr[i]) # 将第二个版本号的当前位转换为整数
        if v1 != v2: # 如果两个版本号当前位不相等
            print(version1 if v1 > v2 else version2) # 输出大的版本号
            exit() # 结束程序
    
    # 比较第三位版本号
    if len(version1Arr) > 2 and len(version2Arr) > 2: # 如果第一个版本号和第二个版本号都有第三位版本号
        version1ThirdArr = version1Arr[2].split("-") # 将第一个版本号的第三位按照“-”分割成字符串数组
        version2ThirdArr = version2Arr[2].split("-") # 将第二个版本号的第三位按照“-”分割成字符串数组
        v1 = int(version1ThirdArr[0]) # 将第一个版本号的第三位转换为整数
        v2 = int(version2ThirdArr[0]) # 将第二个版本号的第三位转换为整数
        if v1 != v2: # 如果两个版本号的第三位不相等
            print(version1 if v1 > v2 else version2) # 输出大的版本号
            exit() # 结束程序
        if len(version1ThirdArr) == 2 and len(version2ThirdArr) == 2: # 如果第一个版本号和第二个版本号的第三位都包含“-”
            print(version1 if version1ThirdArr[1] >= version2ThirdArr[1] else version2) # 比较两个版本号的第三位后面的字符串，输出大的版本号
        else: # 如果第一个版本号和第二个版本号的第三位不都包含“-”
            print(version1 if len(version1ThirdArr) >= len(version2ThirdArr) else version2) # 比较两个版本号的第三位的长度，输出长的版本号
    else: # 如果第一个版本号和第二个版本号都没有第三位版本号
        print(version1 if len(version1Arr) >= len(version2Arr) else version2) # 比较两个版本号的长度，输出长的版本号
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

