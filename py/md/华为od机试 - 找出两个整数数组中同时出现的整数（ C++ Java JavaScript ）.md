### 题目描述：找出两个整数数组中同时出现的整数

现有两个整数数组，需要你找出两个数组中同时出现的整数，并按照如下要求输出：

1、有同时出现的整数时，先按照同时出现次数（整数在两个数组中都出现并且出现次数较少的那个）进行归类，然后按照出现次数从小到大依次按行输出。

2、没有同时出现的整数时，输出NULL。

### 输入描述：

第一行为第一个整数数组，第二行为第二个整数数组，每行数据中整数与整数之间以英文逗号分隔，整数的取值范围为[-200,200]，数组长度的范围为[1,10000]之间的整数。

### 输出描述：

按照出现次数从小到大依次按行输出，每行输出的格式为:出现次数:该出现次数下的整数升序排序的结果。

格式中的":"为英文冒号，整数间以英文逗号分隔。

##### ACM输入输出模式

如果你经常使用**Leetcode** ,会知道**letcode** 是不需要编写输入输出函数的。但是华为OD机考使用的是 **ACM 模式**
，需要手动编写输入和输出。

所以最好在牛-
客上提前熟悉这种模式。例如C++使用`cin/cout`,python使用`input()/print()`。JavaScript使用node的`readline()`和`console.log()`。Java
使用`sacnner/system.out.print()`

### 用例1

输入：

    
    
    5,3,6,-8,0,11
    2,8,8,8,-1,15
    

输出：

    
    
    NULL
    

说明：

> 两个整数数组没有同时出现的整数，输出NULL。

### 用例2

输入：

    
    
    5,8,11,3,6,8,8,-1,11,2,11,11
    11,2,11,8,6,8,8,-1,8,15,3,-9,11
    

输出：

    
    
    1:-1,2,3,6
    3:8,11
    

说明：

>
> 两个整数数组中同时出现的整数为-1、2、3、6、8、11，其中同时出现次数为1的整数为-1,2,3,6(升序排序)，同时出现次数为3的整数为8,11(升序排序)，先升序输出出现次数为1的整数，再升序输出出现次数为3的整数。

#### 机考代码查重

华为OD机考完成之后，官方会进行代码查重。**华为 od 机考确实有很大的概率抽到原题**
。如果碰到了题库中的原题，一定不要直接使用题解中的代码，尤其是变量名，一定要修改，可以改成毫无意义的单词。除了变量名之外，代码的组织结构和逻辑一定要进行改变，这就要求在日常的刷题中，提前编写好属于自己的代码。

### C++

    
    
    #include <iostream>
    #include <sstream>
    #include <vector>
    #include <map>
    #include <set>
    #include <algorithm>
    
    int main() {
        std::string nums1Input, nums2Input;
        std::getline(std::cin, nums1Input);
        std::getline(std::cin, nums2Input);
        
        std::vector<int> nums1, nums2;
        std::stringstream ss(nums1Input);
        std::string num;
        while (std::getline(ss, num, ',')) {
            if (num[0] == '-') {
                num = num.substr(1); // 去掉负号
                nums1.push_back(-std::stoi(num)); // 添加负数
            } else {
                nums1.push_back(std::stoi(num));
            }
        }
        ss = std::stringstream(nums2Input);
        while (std::getline(ss, num, ',')) {
            if (num[0] == '-') {
                num = num.substr(1); // 去掉负号
                nums2.push_back(-std::stoi(num)); // 添加负数
            } else {
                nums2.push_back(std::stoi(num));
            }
        }
        
        std::map<int, int> count1, count2;
        for (int num : nums1) {
            count1[num]++;
        }
        for (int num : nums2) {
            count2[num]++;
        }
        
        std::map<int, std::set<int>> sameNum;
        for (auto it = count1.begin(); it != count1.end(); ++it) {
            int num = it->first;
            if (count2.find(num) != count2.end()) {
                int count = std::min(count1[num], count2[num]);
                sameNum[count].insert(num);
            }
        }
        
        if (sameNum.empty()) {
            std::cout << "NULL" << std::endl;
        } else {
            for (auto it = sameNum.begin(); it != sameNum.end(); ++it) {
                int count = it->first;
                std::cout << count << ":";
                std::string separator = "";
                for (int num : it->second) {
                    std::cout << separator << num;
                    separator = ",";
                }
                std::cout << std::endl;
            }
        }
        
        return 0;
    }
    

### python

    
    
    import sys
    
    nums1Input = input()
    nums2Input = input()
    
    nums1 = list(map(int, nums1Input.split(",")))
    nums2 = list(map(int, nums2Input.split(",")))
    
    count1 = {}
    for num in nums1:
        count1[num] = count1.get(num, 0) + 1
    
    count2 = {}
    for num in nums2:
        count2[num] = count2.get(num, 0) + 1
    
    sameNum = {}
    for num in count1.keys():
        if num in count2:
            minCount = min(count1[num], count2[num])
            if minCount not in sameNum:
                sameNum[minCount] = set()
            sameNum[minCount].add(num)
    
    if len(sameNum) == 0:
        print("NULL")
    else:
        for count in sorted(sameNum.keys()):
            nums = sorted(sameNum[count])
            print(f"{count}:{','.join(map(str, nums))}")
    
    

### java

    
    
    
    import java.util.*;
    import java.util.stream.Collectors;
    
    public class Main {
        public static void main(String[] args) {
            Scanner sc = new Scanner(System.in);
            List<Integer> nums1 = Arrays.stream(sc.nextLine().split(","))
                                        .map(Integer::parseInt)
                                        .collect(Collectors.toList());
            List<Integer> nums2 = Arrays.stream(sc.nextLine().split(","))
                                        .map(Integer::parseInt)
                                        .collect(Collectors.toList());
    
            Map<Integer, Long> count1 = nums1.stream()
                                             .collect(Collectors.groupingBy(num -> num, Collectors.counting()));
            Map<Integer, Long> count2 = nums2.stream()
                                             .collect(Collectors.groupingBy(num -> num, Collectors.counting()));
    
            Map<Integer, Set<Integer>> sameNum = count1.keySet().stream()
                                                        .filter(count2::containsKey)
                                                        .collect(Collectors.groupingBy(num -> Math.min(count1.get(num).intValue(), count2.get(num).intValue()),
                                                                                       TreeMap::new,
                                                                                       Collectors.toSet()));
    
            if (sameNum.isEmpty()) {
                System.out.println("NULL");
            } else {
               for (int count : sameNum.keySet()) {
                    System.out.print(count + ":");
                    String separator = "";
                    for (int num : new TreeSet<>(sameNum.get(count))) {
                        System.out.print(separator + num);
                        separator = ",";
                    }
                    System.out.println();
                }
            }
        }
    }
    

### javascript

    
    
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.on("line", function(nums1Input) {
      rl.on("line", function(nums2Input) {
        const nums1 = nums1Input.split(",").map(Number);
        const nums2 = nums2Input.split(",").map(Number);
    
        const count1 = nums1.reduce((acc, num) => {
          acc[num] = (acc[num] || 0) + 1;
          return acc;
        }, {});
    
        const count2 = nums2.reduce((acc, num) => {
          acc[num] = (acc[num] || 0) + 1;
          return acc;
        }, {});
    
        const sameNum = Object.keys(count1).reduce((acc, num) => {
          if (count2.hasOwnProperty(num)) {
            const minCount = Math.min(count1[num], count2[num]);
            if (!acc.hasOwnProperty(minCount)) {
              acc[minCount] = new Set();
            }
            acc[minCount].add(Number(num));
          }
          return acc;
        }, {});
    
        if (Object.keys(sameNum).length === 0) {
          console.log("NULL");
        } else {
          Object.keys(sameNum).sort((a, b) => a - b).forEach(count => {
            const nums = Array.from(sameNum[count]).sort((a, b) => a - b);
            console.log(`${count}:${nums.join(",")}`);
          });
        }
    
        rl.close();
      });
    });
    

> #### 文章目录
>
>   *     * 题目描述：找出两个整数数组中同时出现的整数
>     * 输入描述：
>     * 输出描述：
>     *       *         * ACM输入输出模式
>     * 用例1
>     * 用例2
>     *       * 机考代码查重
>     * C++
>     * python
>     * java
>     * javascript
>     *       * 完整用例
>       *         * 用例1
>         * 用例2
>         * 用例3
>         * 用例4
>         * 用例5
>         * 用例6
>         * 用例7
>         * 用例8
>         * 用例9
>         * 用例10
>

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

#### 完整用例

##### 用例1

    
    
    1,2,3,4,5
    6,7,8,9,10
    

##### 用例2

    
    
    1,2,3,4,5
    5,4,3,2,1
    

##### 用例3

    
    
    1,2,3,4,5
    5,4,3,2,1,1,2,3,4,5
    

##### 用例4

    
    
    1,2,3,4,5
    6,7,8,9,10,1,2,3,4,5
    

##### 用例5

    
    
    1,2,3,4,5
    5,4,3,2,1,1,2,3,4,5,6,7,8,9,10
    

##### 用例6

    
    
    1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100
    100,99,98,97,96,95,94,93,92,91,90,89,88,87,86,85,84,83,82,81,80,79,78,77,76,75,74,73,72,71,70,69,68,67,66,65,64,63,62,61,60,59,58,57,56,55,54,53,52,51,50,49,48,47,46,45,44,43,42,41,40,39,38,37,36,35,34,33,32,31,30,29,28,27,26,25,24,23,22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1
    

##### 用例7

    
    
    -1,-2,-3,-4,-5
    -5,-4,-3,-2,-1
    

##### 用例8

    
    
    1,1,1,1,1,2,2,2,2,2,3,3,3,3,3
    1,1,1,1,1,2,2,2,2,2,3,3,3,3,3
    

##### 用例9

    
    
    1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20
    20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1
    

##### 用例10

    
    
    1,2,3,4,5
    2,4,6,8,10
    

