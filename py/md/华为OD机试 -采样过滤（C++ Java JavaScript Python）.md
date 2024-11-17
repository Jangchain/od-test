#### 题目描述

在做物理实验时，为了计算物体移动的速率，通过相机等工具周期性的采样物体移动距离。  
由于工具故障，采样数据存在误差甚至相误的情况。  
需要通过一个算法过滤掉不正确的采样值，不同工具的故意模式存在差异，算法的各关门限会根据工具类型做相应的调整。

请实现一个算法，计算出给定一组采样值中正常值的最长连续周期。

* * *

判断第1个周期的采样数据S0是否正确的规则如下(假定物体移动速率不超过10个单元前一个采样周期S[i-1]):

`S[i]<=0，即为错误值`  
`S[i]<S[i-1]，即为错误值`  
`S[i]-S[i-1]>=10，即为错误值。`

`其它情况为正常值`

* * *

判断工具是否故障的规则如下：

在**M** 个周期内，采样数据为错误值的次数为**T**(次数可以不连续)，则工具故障。

* * *

判断故障恢复的条件如下：

产生故障后的**P** 个周期内，采样数据一直为正常值，则故障恢复

* * *

错误采样数据的处理方式：

检测到故障后，丢弃从故障开始到故障恢复的采样数据  
在检测到工具故障之前，错误的采样数据，则由最近一个正常值代替;如果前面没有正常的采样值，则丢弃此采样数据

* * *

给定一段周期的采样数据列表**S** ，计算正常值的最长连续周期。

#### 输入描述

故障确认周期数和故障次数门限分别为M和T，故障恢复周期数为P。

第i个周期，检测点的状态为S[i]。

输入为两行，格式如下:

`M T P`  
`s1 s2 s3 ...`  
`M、t 和 e的取值范围为[1，100000]`  
`s1取值范围为[0，100000]，从0开始编号`

#### 输出描述

一行，输出正常值的最长连续周期。

#### 用例

输入| 10 6 3  
-1 1 2 3 100 10 13 9 10  
---|---  
输出| 8  
说明| 无  
  
#### 题目解析

  1. 异常的情况

数据异常的三个条件：

`S[i]<=0，即为错误值`  
`S[i]<S[i-1]，即为错误值`  
`S[i]-S[i-1]>=10，即为错误值。`

工具故障： 数据异常错误T次

故障恢复：故障后，然后数据开始正常，故障恢复。

2：错误数据有两种处理方式：

丢弃故障开始到故障恢复的采样数据

故障开启之前的数据如果故障数据它之前有正常值，则替代，若无正常值，则丢弃。

#### C++

    
    
    // Online C++ compiler to run C++ program online
    #include<iostream>
    #include<vector>
    #include<stdlib.h>
    #include<algorithm>
    #include<string.h>
    #include<exception> 
    #include<map>
    #include<cmath>
    #include<unordered_map>
    #include<set>
    #include<climits>
    #include<ctype.h>
    #include<queue>
    #include<stack>
    #include<list>
    using namespace std;
     
    int main(){
        // 处理输入
        string param_input_str;
        getline(cin, param_input_str);
        
        //空格分割
        vector<string> v;
        while (param_input_str.find(" ") != string::npos) {
            int found = param_input_str.find(" ");
            v.push_back(param_input_str.substr(0, found));
            param_input_str = param_input_str.substr(found + 1);
        }    
        v.push_back(param_input_str);
        
        int m = stoi(v[0]);
        int t = stoi(v[1]);
        int p = stoi(v[2]);
        
        // data
        string data_input_str;
        getline(cin, data_input_str);
        
        vector<int> sample_data;
        while (data_input_str.find(" ") != string::npos) {
            int found = data_input_str.find(" ");
            sample_data.push_back(stoi(data_input_str.substr(0, found)));
            data_input_str = data_input_str.substr(found + 1);
        }    
        sample_data.push_back(stoi(data_input_str));
        
        // 判断数据异常
        vector<int> items(sample_data.size(), 0);
        for (int i=0;i<sample_data.size();i++) {
            if (sample_data[i] <= 0) {
                items[i] = 0;
            } else if (i > 0 && ((sample_data[i] - sample_data[i - 1] >= 10) || sample_data[i] < sample_data[i - 1])) {
                items[i] = 0;
            } else {
                items[i] = 1;
            }
        }
        
        //
        int i = 0;
        while (i < sample_data.size()) {
            //可以用之前数据替代的情况
            if (items[i] == 0 && i > 0 && items[i - 1] == 1) {
                sample_data[i] = sample_data[i - 1];
                items[i] = 1;
            }
            int error_num=0;
            int corrent =0;
            int j = i;
            
            //求得采样错误总数量
            while (m > 0 && j < sample_data.size()) {
                if (items[j] == 0) {
                    error_num += 1;
                    if (error_num >= t) {
                        if (j > 0) {
                            corrent = j - 1;
                        } else {
                            corrent = 0;
                        }
                    }
                }
                j += 1;
            }
            
            // 大于故障次数门限 T
            if (error_num >= t) {
                bool pos= false;
                int k = 0;
                while (k < i && items[k] != 1) {
                    k += 1;
                }
                pos = true;
                
                if (i + t == sample_data.size() - 1) {
                    k = i;
                    while (k < corrent + 1) {
                        sample_data[k] = sample_data[i - 1];
                        items[k] = 1;
                        k += 1;
                    }
                    break;
                } else if (i + m <= sample_data.size()) {
                    for (int l = i;l<sample_data.size(); l++) {
                        if (l < corrent +1) {
                            if (i > 0) {
                                sample_data[l] = sample_data[i-1];
                            } else {
                                sample_data[0];
                            }
                            items[l] = 1;
                        } else {
                            items[l] = 0;
                        }
                    }
                } else {
                    for (int q = i; q < i+m;q++) {
                        if (q < corrent + 1) {
                            sample_data[q] = sample_data[i -1];
                            items[q] = 1;
                        } else {
                            items[q] = 0;
                        }
                    }
                    if (i + m + p >= sample_data.size() + 1) {
                        for (int k = i;k<sample_data.size(); k++) {
                            items[k] = 0;
                        } 
                        items[k] = 0;
                        i = k +p;
                    }
                }
            } else {
                i += 1;
            }
        }
        
        int res = 0;
        int location = 0;
        for (auto item : items) {
            if (item != 1) {
                if (location > res) {
                    res = location;
                }
                location = 0;
            } else {
                location += 1;
            }
        }
        cout << max(res, location) <<endl;
     
        return 0;
    }
    

#### JavaScript

    
    
    /* JavaScript Node ACM模式 控制台输入获取 */
    const readline = require("readline");
     
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
     
    const lines = [];
    let m, t, p;
    rl.on("line", (line) => {
      lines.push(line);
     
      if (lines.length === 2) {
        [m, t, p] = lines[0].split(" ").map(Number);
        const s = lines[1].split(" ").map(Number);
     
        console.log(getResult(s, m, t, p));
        lines.length = 0;
      }
    });
     
    /**
     *
     * @param {*} s 数组，元素是每个周期的采样数据
     * @param {*} m 故障确认周期数
     * @param {*} t 故障次数门限值
     * @param {*} p 故障恢复周期数
     */
    function getResult(s, m, t, p) {
      let i = 0; // 连续正常周期的起始位置
      let fault = 0; // m个周期内错误数据的个数
      let cycle = 0; // 处于m个周期内第几个周期
      let ans = 0; // 最终结果，即最长连续正常周期长度
     
      function isFault(j) {
        return s[j] <= 0 || (j >= 1 && (s[j] < s[j - 1] || s[j] - s[j - 1] >= 10));
      }
     
      // 如果采样数据一开始就是错误的，则直接丢弃
      while (s[i] <= 0) {
        // i指针后移，表示前面区间不属于连续正常周期范围
        i++;
        // 虽然错误数据被丢弃，但是仍然属于m周期内的出现的错误数据，因此需要计数
        fault++;
        cycle++;
     
        // 如果在m周期范围内，错误数据数量达到门限t，则工具故障，并进入故障恢复检测阶段
        if (cycle <= m) {
          if (cycle === m) {
            cycle = 0;
            fault = 0;
          }
          if (fault === t) {
            cycle = 0;
            fault = 0;
            let p1 = p;
            while (i < s.length && p1 > 0) {
              // 故障恢复条件是，p个周期内一直都是正常数据，并要求连续，如果不连续，则重新计数
              isFault(i) ? (p1 = p) : p1--;
              i++;
            }
          }
        }
      }
     
      cycle++; // 这个cycle计数对应第i周期的
      let j = i + 1;
     
      while (j < s.length) {
        cycle++; // 这个cycle计数对应第j周期的
        if (isFault(j)) {
          s[j] = s[j - 1];
          fault++;
        }
     
        j++;
     
        if (cycle <= m) {
          if (cycle === m) {
            cycle = 0;
            fault = 0;
          }
          if (fault === t) {
            cycle = 0;
            fault = 0;
            ans = Math.max(ans, j - i); // 注意此时的j必然是故障开始的j，因此不计入正常连续周期中，因此求长度时不需要+1
            // 发现故障，故障开始，进行故障恢复判断
            let p1 = p;
            while (j < s.length && p1 > 0) {
              isFault(j) ? (p1 = p) : p1--; // 故障恢复条件是，p个周期内一直都是正常数据，要求连续
              j++;
            }
            i = j;
          }
        }
      }
     
      ans = Math.max(ans, j - i); // 注意这里的j必然是越界的j，因此求长度时不需要+1
     
      return ans;
    }
    

#### Java

    
    
    import java.util.Arrays;
    import java.util.Scanner;
     
    public class Main {
      public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
     
        Integer[] mtp =
            Arrays.stream(sc.nextLine().split(" ")).map(Integer::parseInt).toArray(Integer[]::new);
        Integer[] s =
            Arrays.stream(sc.nextLine().split(" ")).map(Integer::parseInt).toArray(Integer[]::new);
     
        System.out.println(getResult(mtp[0], mtp[1], mtp[2], s));
      }
     
      /**
       * @param m 故障确认周期数
       * @param t 故障次数门限值
       * @param p 故障恢复周期数
       * @param s 数组，元素是每个周期的采样数据
       * @return 最长连续周期的长度
       */
      public static int getResult(Integer m, Integer t, Integer p, Integer[] s) {
        int i = 0; // 连续正常周期的起始位置
        int fault = 0; // m个周期内错误数据的个数
        int cycle = 0; // 处于m个周期内第几个周期
        int ans = 0; // 最终结果，即最长连续正常周期长度
     
        // 如果采样数据一开始就是错误的，则直接丢弃
        while (s[i] <= 0) {
          // i指针后移，表示前面区间不属于连续正常周期范围
          i++;
          // 虽然错误数据被丢弃，但是仍然属于m周期内的出现的错误数据，因此需要计数
          fault++;
          cycle++;
     
          // 如果在m周期范围内，错误数据数量达到门限t，则工具故障，并进入故障恢复检测阶段
          if (cycle <= m) {
            if (cycle == m) {
              cycle = 0;
              fault = 0;
            }
     
            if (fault == t) {
              cycle = 0;
              fault = 0;
              int p1 = p;
              while (i < s.length && p1 > 0) {
                // 故障恢复条件是，p个周期内一直都是正常数据，并要求连续，如果不连续，则重新计数
                if (isFault(s, i)) {
                  p1 = p;
                } else {
                  p1--;
                }
                i++;
              }
            }
          }
        }
     
        // 这个cycle计数对应第i周期的
        cycle++;
        int j = i + 1;
     
        while (j < s.length) {
          cycle++; // 这个cycle计数对应第j周期的
          if (isFault(s, j)) {
            s[j] = s[j - 1];
            fault++;
          }
     
          j++;
     
          if (cycle <= m) {
            if (cycle == m) {
              cycle = 0;
              fault = 0;
            }
     
            if (fault == t) {
              cycle = 0;
              fault = 0;
              ans = Math.max(ans, j - i); // 注意此时的j必然是故障开始的j，因此不计入正常连续周期中，因此求长度时不需要+1
              // 发现故障，故障开始，进行故障恢复判断
              int p1 = p;
              while (j < s.length && p1 > 0) {
                // 故障恢复条件是，p个周期内一直都是正常数据，要求连续
                if (isFault(s, j)) {
                  p1 = p;
                } else {
                  p1--;
                }
                i = j;
              }
            }
          }
        }
     
        ans = Math.max(ans, j - i); // 注意这里的j必然是越界的j，因此求长度时不需要+1
        return ans;
      }
     
      // 该方法用于判断数据是否错误
      public static boolean isFault(Integer[] s, int j) {
        return s[j] <= 0 || (j >= 1 && (s[j] < s[j - 1] || s[j] - s[j - 1] >= 10));
      }
    }
    

#### Python

    
    
    # 输入获取
    m, t, p = map(int, input().split())
    s = list(map(int, input().split()))
     
     
    # 算法入口
    def getResult(m, t, p, s):
        """
        :param m: 故障确认周期数
        :param t: 故障次数门限值
        :param p: 故障恢复周期数
        :param s: 列表，元素是每个周期的采样数据
        :return: 最长连续周期的长度
        """
        i = 0 # 连续正常周期的起始位置
        fault = 0 # m个周期内错误数据的个数
        cycle = 0 # 处于m个周期内第几个周期
        ans = 0 # 最终结果，即最长连续正常周期长度
     
        #  如果采样数据一开始就是错误的，则直接丢弃
        while s[i] <= 0:
            i += 1 # i指针后移，表示前面区间不属于连续正常周期范围
            fault += 1 # 虽然错误数据被丢弃，但是仍然属于m周期内的出现的错误数据，因此需要计数
            cycle += 1
     
            # 如果在m周期范围内，错误数据数量达到门限t，则工具故障，并进入故障恢复检测阶段
            if cycle <= m:
                if cycle == m:
                    cycle = 0
                    fault = 0
     
                if fault == t:
                    cycle = 0
                    fault = 0
                    p1 = p
                    while i < len(s) and p1 > 0:
                        # 故障恢复条件是，p个周期内一直都是正常数据，并要求连续，如果不连续，则重新计数
                        if isFault(s, i):
                            p1 = p
                        else:
                            p1 -= 1
                        i += 1
     
        # 这个cycle计数对应第i周期的
        cycle += 1
        j = i + 1
     
        while j < len(s):
            cycle += 1 # 这个cycle计数对应第j周期的
            if isFault(s, j):
                s[j] = s[j - 1]
                fault += 1
     
            j += 1
     
            if cycle <= m:
                if cycle == m:
                    cycle = 0
                    fault = 0
                if fault == t:
                    cycle = 0
                    fault = 0
                    ans = max(ans, j - i) # 注意此时的j必然是故障开始的j，因此不计入正常连续周期中，因此求长度时不需要+1
                    p1 = p # 发现故障，故障开始，进行故障恢复判断
                    while j < len(s) and p1 > 0:
                        # 故障恢复条件是，p个周期内一直都是正常数据，要求连续
                        if isFault(s, j):
                            p1 = p
                        else:
                            p1 -= 1
                        i = j
     
        ans = max(ans, j - i) # 注意这里的j必然是越界的j，因此求长度时不需要+1
        return ans
     
     
    # 该方法用于判断数据是否错误
    def isFault(s, j):
        return s[j] <= 0 or (j >= 1 and (s[j] < s[j - 1] or s[j] - s[j - 1] >= 10))
     
     
    # 算法调用
    print(getResult(m, t, p, s))
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/1d2f33ed8cf2fb1b9a4fe09513f7aa94.png)

