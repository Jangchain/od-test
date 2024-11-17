#### 题目描述

有M(1<=M<=10)个端口组，  
每个端口组是长度为N(1<=N<=100)的整数数组，  
如果端口组间存在2个及以上不同端口相同，则认为这2个端口组互相关联，可以合并。  
第一行输入端口组个数M，再输入M行，每行逗号分隔，代表端口组。  
输出合并后的端口组，用二维数组表示。

#### 输入描述

第一行输入一个数字M  
第二行开始输入M行，每行是长度为N的整数数组，用逗号分割

#### 输出描述

合并后的二维数组

#### 用例

输入| 4  
4  
2,3,2  
1,2  
5  
---|---  
输出| [[4],[2,3,2],[1,2],[5]]  
说明| 仅有一个端口2相同，不可以合并。  
输入| 3  
2,3,1  
4,3,2  
5  
---|---  
输出| [[1,2,3,4],[5]]  
说明| 无  
输入| 6  
10  
4,2,1  
9  
3,6,9,2  
6,3,4  
8  
---|---  
输出| [[10],[1,2,3,4,6,9],[9],[8]]  
说明| 无  
  
#### 题目解析

通过用例解释这道题目：

在用例2 中：

2,3,1

4,3,2

5

【2，3，1】与【4，3，2】存在2和3是相同的，所以可以合并。

在用例3中

10

4,2,1

9

3,6,9,2

6,3,4

8

【6,3,4】与【3,6,9,2】存在3和6是相同的，可以合并成为【2，3，4，6，9】

然后发现【4,2,1】与【2，3，4，6，9】存在2和4 相同，最后合并成【1,2,3,4,6,9】

双重for循环可能不足以解决这个问题，因为一次循环可能会出现新的数组。因此，建议使用while循环，并将初始条件设置为true，只要有任何一次合并，就将flag设为true。如果循环结束时flag仍然为false，则说明不再有可以合并的端口组。

#### C++

    
    
    #include <iostream>
    #include <vector>
    #include <set>
    #include <algorithm>
    
    int main() {
        int groupCount;
        std::cin >> groupCount;
    
        std::vector<std::set<int>> portGroups;
    
        if (groupCount > 10 || groupCount < 1) {
            std::cout << "[[]]" << std::endl;
            return 0;
        }
    
        for (int i = 0; i < groupCount; i++) {
            std::string input;
            std::cin >> input;
            std::vector<std::string> ports;
            size_t pos = 0;
            std::string delimiter = ",";
            
            while ((pos = input.find(delimiter)) != std::string::npos) {
                std::string port = input.substr(0, pos);
                ports.push_back(port);
                input.erase(0, pos + delimiter.length());
            }
            ports.push_back(input);
    
            std::set<int> portSet;
            for (const std::string& port : ports) {
                portSet.insert(std::stoi(port));
            }
            portGroups.push_back(portSet);
        }
    
        bool merged = true;
        while (merged) {
            merged = false;
    
            for (size_t i = 0; i < portGroups.size(); i++) {
                for (size_t j = i + 1; j < portGroups.size(); j++) {
                    std::set<int>& group1 = portGroups[i];
                    std::set<int>& group2 = portGroups[j];
                    int count = 0;
    
                    for (const int port : group1) {
                        if (group2.count(port) > 0) {
                            count++;
                        }
                        if (count >= 2) {
                            group1.insert(group2.begin(), group2.end());
                            portGroups.erase(portGroups.begin() + j);
                            merged = true;
                            break;
                        }
                    }
                    if (merged) {
                        break;
                    }
                }
                if (merged) {
                    break;
                }
            }
        }
    
        std::vector<std::vector<int>> mergedPortGroups;
        for (const std::set<int>& portGroup : portGroups) {
            std::vector<int> mergedPortGroup(portGroup.begin(), portGroup.end());
            std::sort(mergedPortGroup.begin(), mergedPortGroup.end());
            mergedPortGroups.push_back(mergedPortGroup);
        }
    
        std::cout << "[";
        for (int i = 0; i < mergedPortGroups.size(); i++) {
            std::cout << "[";
            for (int j = 0; j < mergedPortGroups[i].size(); j++) {
                std::cout << mergedPortGroups[i][j];
                if (j != mergedPortGroups[i].size() - 1) {
                    std::cout << ",";
                }
            }
            std::cout << "]";
            if (i != mergedPortGroups.size() - 1) {
                std::cout << ",";
            }
        }
        std::cout << "]" << std::endl;
    
        return 0;
    }
    
    

#### 文章目录

  *     *       * 题目描述
      * 输入描述
      * 输出描述
      * 用例
      * 题目解析
      * C++

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

