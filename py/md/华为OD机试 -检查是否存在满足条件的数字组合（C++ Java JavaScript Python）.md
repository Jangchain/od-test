#### 题目描述

> 给定一个正整数数组，检查数组中是否存在满足规则的数字组合
>
> 规则：**A = B + 2C**

#### 输入描述

> 第一行输出数组的元素个数。
>
> 接下来一行输出所有数组元素，用空格隔开。

#### 输出描述

> 如果存在满足要求的数，在同一行里依次输出规则里A/B/C的取值，用空格隔开。
>
> 如果不存在，输出0。

##### ACM输入输出模式

如果你经常使用**Leetcode** ,会知道**letcode** 是不需要编写输入输出函数的。但是华为OD机考使用的是 **ACM 模式**
，需要手动编写输入和输出。

所以最好在牛-
客上提前熟悉这种模式。例如C++使用`cin/cout`,python使用`input()/print()`。JavaScript使用node的`readline()`和`console.log()`。Java
使用`sacnner/system.out.print()`

#### 用例

输入| `4``2 7 3 0`  
---|---  
输出| 7 3 2  
说明| 7 = 3 + 2 * 2  
  
> 备注:
>
>   * 数组长度在3-100之间。
>   * 数组成员为0-65535，数组成员可以重复，但每个成员只能在结果算式中使用一次。如：数组成员为[0, 0, 1,
> 5]，0出现2次是允许的，但结果0 = 0 + 2 * 0是不允许的，因为算式中使用了3个0。
>   * 用例保证每组数字里最多只有一组符合要求的解。
>

#### 机考代码查重

华为OD机考完成之后，官方会进行代码查重。**华为 od 机考确实有很大的概率抽到原题**
。如果碰到了题库中的原题，一定不要直接使用题解中的代码，尤其是变量名，一定要修改，可以改成毫无意义的单词。除了变量名之外，代码的组织结构和逻辑一定要进行改变，这就要求在日常的刷题中，提前编写好属于自己的代码。

#### C++

    
    
    #include <iostream>
    #include <algorithm>
    #include <vector>
    using namespace std;
    
    int main() {
      int n;
      cin >> n;
    
      vector<int> nums(n);
      for (int i = 0; i < n; i++) {
        cin >> nums[i];
      }
    
      sort(nums.begin(), nums.end(), greater<int>());
    
      int i = 0, j = n - 1;
      while (i < j) {
        int k = i + 1;
        while (k < j) {
          if (nums[i] == nums[k] + 2 * nums[j]) {
            cout << nums[i] << " " << nums[k] << " " << nums[j] << endl;
            return 0;
          }
          if (nums[i] == nums[j] + 2 * nums[k]) {
            cout << nums[i] << " " << nums[j] << " " << nums[k] << endl;
            return 0;
          }
          k++;
        }
        if (nums[i] > nums[j] + 2 * nums[k]) {
          j--;
        } else {
          i++;
        }
      }
    
      cout << "0" << endl;
    
      return 0;
    }
    

#### javaScript

    
    
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.on('line', (n) => {
      rl.on('line', (numsStr) => {
        const nums = numsStr.split(' ').map(num => parseInt(num));
    
        nums.sort((a, b) => b - a);
    
        let i = 0, j = n - 1;
        while (i < j) {
          let k = i + 1;
          while (k < j) {
            if (nums[i] === nums[k] + 2 * nums[j]) {
              console.log(nums[i] + ' ' + nums[k] + ' ' + nums[j]);
              rl.close();
              return;
            }
            if (nums[i] === nums[j] + 2 * nums[k]) {
              console.log(nums[i] + ' ' + nums[j] + ' ' + nums[k]);
              rl.close();
              return;
            }
            k++;
          }
          if (nums[i] > nums[j] + 2 * nums[k]) {
            j--;
          } else {
            i++;
          }
        }
    
        console.log('0');
        rl.close();
      });
    });
    

#### java

    
    
    import java.util.Arrays;
    import java.util.Scanner;
    
    public class Main {
      public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
    
        // 输入数组的元素个数
        int n = Integer.parseInt(sc.nextLine());
    
        // 输入数组元素
        Integer[] nums =
            Arrays.stream(sc.nextLine().split(" ")).map(Integer::parseInt).toArray(Integer[]::new);
    
        // 按照降序排序数组
        Arrays.sort(nums, (a, b) -> b - a);
    
        // 使用双指针遍历数组，查找满足条件的组合
        int i = 0, j = n - 1;
        while (i < j) {
          int k = i + 1;
          while (k < j) {
            // 判断是否满足条件
            if (nums[i] == nums[k] + 2 * nums[j]) {
              System.out.println(nums[i] + " " + nums[k] + " " + nums[j]);
              return;
            }
            if (nums[i] == nums[j] + 2 * nums[k]) {
              System.out.println(nums[i] + " " + nums[j] + " " + nums[k]);
              return;
            }
            k++;
          }
          if (nums[i] > nums[j] + 2 * nums[k]) {
            j--;
          } else {
            i++;
          }
        }
    
        // 不存在满足条件的组合
        System.out.println("0");
      }
    }
    
    

#### python

    
    
    def find_combination():
        # 输入数组的元素个数
        n = int(input())
    
        # 输入数组元素
        nums = list(map(int, input().split()))
    
        # 按照降序排序数组
        nums.sort(reverse=True)
    
        # 使用双指针遍历数组，查找满足条件的组合
        i = 0
        j = n - 1
        while i < j:
            k = i + 1
            while k < j:
                # 判断是否满足条件
                if nums[i] == nums[k] + 2 * nums[j]:
                    print(nums[i], nums[k], nums[j])
                    return
                if nums[i] == nums[j] + 2 * nums[k]:
                    print(nums[i], nums[j], nums[k])
                    return
                k += 1
            if nums[i] > nums[j] + 2 * nums[k]:
                j -= 1
            else:
                i += 1
    
        # 不存在满足条件的组合
        print("0")
    
    find_combination()
    
    

> #### 文章目录
>
>   *     *       * 题目描述
>       * 输入描述
>       * 输出描述
>       *         * ACM输入输出模式
>       * 用例
>       * 机考代码查重
>       * C++
>       * javaScript
>       * java
>       * python
>

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

