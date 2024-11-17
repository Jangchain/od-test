#### 题目描述

某公司研发了一款高性能AI处理器。每台物理设备具备8颗**AI** 处理器，编号分别为0、1、2、3、4、5、6、7。

编号0-3的处理器处于同一个链路中，编号4-7的处理器处于另外一个链路中，不通链路中的处理器不能通信。

如下图所示。现给定服务器可用的处理器编号数组array，以及任务申请的处理器数量num，找出符合下列亲和性调度原则的芯片组合。

如果不存在符合要求的组合，则返回**空列表** 。

亲和性调度原则：

-如果申请处理器个数为1，则选择同一链路，剩余可用的处理器数量为1个的最佳，其次是剩余3个的为次佳，然后是剩余2个，最后是剩余4个。

-如果申请处理器个数为2，则选择同一链路剩余可用的处理器数量2个的为最佳，其次是剩余4个，最后是剩余3个。

-如果申请处理器个数为4，则必须选择同一链路剩余可用的处理器数量为4个。

-如果申请处理器个数为8，则申请节点所有8个处理器。

提示：

  1. 任务申请的处理器数量只能是1、2、4、8。
  2. 编号0-3的处理器处于一个链路，编号4-7的处理器处于另外一个链路。
  3. 处理器编号唯一，且不存在相同编号处理器。

#### 输入描述

输入包含可用的处理器编号数组array，以及任务申请的处理器数量num两个部分。

第一行为array，第二行为num。例如：

> [0, 1, 4, 5, 6, 7]  
>  1

表示当前编号为0、1、4、5、6、7的处理器可用。任务申请1个处理器。

  * `0 <= array.length <= 8`
  * `0 <= array[i] <= 7`
  * `num in [1, 2, 4, 8]`

#### 输出描述

输出为组合列表，当array=[0，1，4，5，6，7]，num=1 时，输出为[[0], [1]]。

#### 用例

输入| [0, 1, 4, 5, 6, 7]  
1  
---|---  
输出| [[0], [1]]  
说明| 根据第一条亲和性调度原则，在剩余两个处理器的链路（0, 1, 2, 3）中选择处理器。由于只有0和1可用，则返回任意一颗处理器即可。  
输入| [0, 1, 4, 5, 6, 7]  
4  
---|---  
输出| [[4, 5, 6, 7]]  
说明| 根据第三条亲和性调度原则，必须选择同一链路剩余可用的处理器数量为4个的环  
  
#### 题目解析

用例中，链路link1=[0,1]，链路link2=[4,5,6,7]

现在要选1个处理器，则需要按照亲和性调度原则

如果申请处理器个数为1，则选择同一链路，剩余可用的处理器数量为1个的最佳，其次是剩余3个的为次佳，然后是剩余2个，最后是剩余4个。

最佳的是，找剩余可用1个处理器的链路，发现没有，link1剩余可用2，link2剩余可用4

其次的是，找剩余可用3个处理器的链路，发现没有

再次的是，找剩余可用2个处理器的链路，link1符合要求，即从0和1处理器中任选一个，有两种选择，可以使用dfs找对应组合。

#### C++

    
    
    #include <iostream>
    #include <vector>
    #include <string>
    #include <algorithm>
    
    using namespace std;
    
    vector<vector<int>> getResult(vector<int> arr, int num);
    
    void dfs(vector<int> arr, int index, int level, vector<int> path, vector<vector<int>>& res);
    
    int main() {
        vector<int> arr;
        int num = 0;
    
        string input;
        getline(cin, input);
    
        if (arr.empty()) {
            string temp = input.substr(1, input.size() - 2);
            string delimiter = ",";
            size_t pos = 0;
            string token;
            while ((pos = temp.find(delimiter)) != string::npos) {
                token = temp.substr(0, pos);
                arr.push_back(stoi(token));
                temp.erase(0, pos + delimiter.length());
            }
            arr.push_back(stoi(temp));
        }
    
        while (getline(cin, input)) {
            num = stoi(input);
            vector<vector<int>> result = getResult(arr, num);
           cout << "["; 
           for (auto res : result) {
               
                cout << "[";
                for (int i = 0; i < res.size(); i++) {
                    cout << res[i];
                     cout << "]";
                   
                }
                if(res != result.back()){
                              cout << " ," ;
                    }
            }cout << "]" ;
        }
    
        return 0;
    }
    
    vector<vector<int>> getResult(vector<int> arr, int num) {
        vector<int> link1;
        vector<int> link2;
    
        sort(arr.begin(), arr.end());
    
        for (const auto& e : arr) {
            if (e < 4) {
                link1.push_back(e);
            }
            else {
                link2.push_back(e);
            }
        }
    
        vector<vector<int>> ans;
        int len1 = link1.size();
        int len2 = link2.size();
    
        if (num == 1) {
            if (len1 == 1 || len2 == 1) {
                if (len1 == 1) {
                    dfs(link1, 0, 1, {}, ans);
                }
                if (len2 == 1) {
                    dfs(link2, 0, 1, {}, ans);
                }
            }
            else if (len1 == 3 || len2 == 3) {
                if (len1 == 3) {
                    dfs(link1, 0, 1, {}, ans);
                }
                if (len2 == 3) {
                    dfs(link2, 0, 1, {}, ans);
                }
            }
            else if (len1 == 2 || len2 == 2) {
                if (len1 == 2) {
                    dfs(link1, 0, 1, {}, ans);
                }
                if (len2 == 2) {
                    dfs(link2, 0, 1, {}, ans);
                }
            }
            else if (len1 == 4 || len2 == 4) {
                if (len1 == 4) {
                    dfs(link1, 0, 1, {}, ans);
                }
                if (len2 == 4) {
                    dfs(link2, 0, 1, {}, ans);
                }
            }
        }
        else if (num == 2) {
            if (len1 == 2 || len2 == 2) {
                if (len1 == 2) {
                    dfs(link1, 0, 2, {}, ans);
                }
                if (len2 == 2) {
                    dfs(link2, 0, 2, {}, ans);
                }
            }
            else if (len1 == 4 || len2 == 4) {
                if (len1 == 4) {
                    dfs(link1, 0, 2, {}, ans);
                }
                if (len2 == 4) {
                    dfs(link2, 0, 2, {}, ans);
                }
            }
            else if (len1 == 3 || len2 == 3) {
                if (len1 == 3) {
                    dfs(link1, 0, 2, {}, ans);
                }
                if (len2 == 3) {
                    dfs(link2, 0, 2, {}, ans);
                }
            }
        }
        else if (num == 4) {
            if (len1 == 4 || len2 == 4) {
                if (len1 == 4) {
                    ans.push_back(link1);
                }
                if (len2 == 4) {
                    ans.push_back(link2);
                }
            }
        }
        else if (num == 8) {
            if (len1 == 4 && len2 == 4) {
                vector<int> tmp(link1);
                tmp.insert(tmp.end(), link2.begin(), link2.end());
                ans.push_back(tmp);
            }
        }
    
        return ans;
    }
    
    void dfs(vector<int> arr, int index, int level, vector<int> path, vector<vector<int>>& res) {
        if (path.size() == level) {
            res.push_back(path);
            return;
        }
    
        for (int i = index; i < arr.size(); i++) {
            path.push_back(arr[i]);
            dfs(arr, i + 1, level, path, res);
            path.pop_back();
        }
    }
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/1d2f33ed8cf2fb1b9a4fe09513f7aa94.png)

