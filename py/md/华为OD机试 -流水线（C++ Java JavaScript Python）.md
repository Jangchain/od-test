#### 题目描述

一个工厂有m条[流水线](https://so.csdn.net/so/search?q=%E6%B5%81%E6%B0%B4%E7%BA%BF&spm=1001.2101.3001.7020)，来并行完成n个独立的作业，该工厂设置了一个调度系统，在安排作业时，总是优先执行处理时间最短的作业。

现给定流水线个数m，需要完成的作业数n, 每个作业的处理时间分别为t1,t2…tn。请你编程计算处理完所有作业的耗时为多少？

当n>m时，首先处理时间短的m个作业进入流水线，其他的等待，当某个作业完成时，依次从剩余作业中取处理时间最短的进入处理。

#### 输入描述

第一行为2个整数（采用空格分隔），分别表示流水线个数m和作业数n；

第二行输入n个整数（采用空格分隔），表示每个作业的处理时长t1,t2…tn。

0< m,n<100，0<t1,t2…tn<100。

注：保证输入都是合法的。

#### 输出描述

输出处理完所有作业的总时长。

##### ACM输入输出模式

如果你经常使用**Leetcode** ,会知道**letcode** 是不需要编写输入输出函数的。但是华为OD机考使用的是 **ACM 模式**
，需要手动编写输入和输出。

所以最好在牛-
客上提前熟悉这种模式。例如C++使用`cin/cout`,python使用`input()/print()`。JavaScript使用node的`readline()`和`console.log()`。Java
使用`sacnner/system.out.print()`

#### 用例

输入

    
    
    3 5
    8 4 3 2 10
    

输出

    
    
    13
    

说明

> 1、先安排时间为2、3、4的3个作业。  
>  2、第一条流水线先完成作业，然后调度剩余时间最短的作业8。  
>  3、第二条流水线完成作业，然后调度剩余时间最短的作业10。  
>  4、总工耗时就是第二条流水线完成作业的时间13（3+10）。

#### 机考代码查重

华为OD机考完成之后，官方会进行代码查重。**华为 od 机考确实有很大的概率抽到原题**
。如果碰到了题库中的原题，一定不要直接使用题解中的代码，尤其是变量名，一定要修改，可以改成毫无意义的单词。除了变量名之外，代码的组织结构和逻辑一定要进行改变，这就要求在日常的刷题中，提前编写好属于自己的代码。

#### C++

    
    
    #include <iostream>
    #include <vector>
    #include <algorithm>
    
    int main() {
        int num_of_pipelines, num_of_jobs;
        std::cin >> num_of_pipelines >> num_of_jobs;
    
        std::vector<int> job_times(num_of_jobs);
        for (int i = 0; i < num_of_jobs; i++) {
            std::cin >> job_times[i];
        }
    
        std::sort(job_times.begin(), job_times.end());
    
        std::vector<int> total_time(num_of_pipelines);
    
        if (num_of_jobs <= num_of_pipelines) {
            total_time = job_times;
        } else {
            total_time.assign(job_times.begin(), job_times.begin() + num_of_pipelines);
            for (int i = num_of_pipelines; i < num_of_jobs; i++) {
                int min_time = *std::min_element(total_time.begin(), total_time.end());
                int index = std::distance(total_time.begin(), std::find(total_time.begin(), total_time.end(), min_time));
                total_time[index] += job_times[i];
            }
        }
    
        std::cout << *std::max_element(total_time.begin(), total_time.end()) << std::endl;
    
        return 0;
    }
    

#### java

    
    
    import java.util.Arrays;
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            
            // 输入流水线个数m和作业数n
            int num_of_pipelines = scanner.nextInt();
            int num_of_jobs = scanner.nextInt();
            
            // 输入每个作业的处理时长t1,t2...tn
            int[] job_times = new int[num_of_jobs];
            for (int i = 0; i < num_of_jobs; i++) {
                job_times[i] = scanner.nextInt();
            }
            
            // 对作业处理时长进行排序
            Arrays.sort(job_times);
            
            // 创建一个长度为流水线个数的数组，用于存储每条流水线的总时长
            int[] total_time = new int[num_of_pipelines];
            
            // 如果作业数小于等于流水线个数，直接将作业分配到每条流水线上
            if (num_of_jobs <= num_of_pipelines) {
                total_time = job_times;
            } else {
                // 将处理时长最短的m个作业分配到每条流水线上
                total_time = Arrays.copyOfRange(job_times, 0, num_of_pipelines);
                
                // 处理剩余的作业
                for (int i = num_of_pipelines; i < num_of_jobs; i++) {
                    int min_time = Integer.MAX_VALUE;
                    int index = -1;
                    // 找到处理时长最短的流水线
                    for (int j = 0; j < num_of_pipelines; j++) {
                        if (total_time[j] < min_time) {
                            min_time = total_time[j];
                            index = j;
                        }
                    }
                    // 将作业分配到处理时长最短的流水线上
                    total_time[index] += job_times[i];
                }
            }
            
            // 找到处理时长最长的流水线
            int max_time = Integer.MIN_VALUE;
            for (int i = 0; i < num_of_pipelines; i++) {
                if (total_time[i] > max_time) {
                    max_time = total_time[i];
                }
            }
            
            // 输出处理完所有作业的总时长
            System.out.println(max_time);
        }
    }
    
    

#### javaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    let m, n;
    let times = [];
    
    rl.on('line', (line) => {
      if (!m && !n) {
        [m, n] = line.trim().split(' ').map(Number);
      } else if (times.length < n) {
        times.push(...line.trim().split(' ').map(Number));
      }
    
      if (m && n && times.length === n) {
        rl.close();
        const num_of_pipelines = m;
        const num_of_jobs = n;
        const job_times = times;
    
        job_times.sort((a,b)=> a - b);
    
        let total_time = new Array(num_of_pipelines).fill(0);
    
        if (num_of_jobs <= num_of_pipelines) {
          total_time = job_times;
        } else {
          total_time = job_times.slice(0, num_of_pipelines);
          for (let i = num_of_pipelines; i < num_of_jobs; i++) {
            let min_time = Infinity;
            let index = -1;
            for (let j = 0; j < num_of_pipelines; j++) {
              if (total_time[j] < min_time) {
                min_time = total_time[j];
                index = j;
              }
            }
            total_time[index] += job_times[i];
          }
        }
    
        let max_time = -Infinity;
        for (let i = 0; i < num_of_pipelines; i++) {
          if (total_time[i] > max_time) {
            max_time = total_time[i];
          }
        }
    
        console.log(max_time);
      }
    });
    

#### python

    
    
    num_of_pipelines, num_of_jobs = map(int, input().split())  # 流水线个数，作业数
    job_times = list(map(int, input().split()))  # 每个作业的处理时间
    
    job_times.sort()  # 按处理时间从小到大排序
    
    total_time = []  # 记录每个流水线的总耗时
    
    if num_of_jobs <= num_of_pipelines:  # 如果作业数小于等于流水线个数
        total_time = job_times  # 每个作业都分配到一个流水线
    else:
        total_time = job_times[:num_of_pipelines]  # 先将处理时间最短的m个作业分配到流水线
        for i in range(num_of_pipelines, num_of_jobs):  # 处理剩余的作业
            min_time = min(total_time)  # 找到当前总耗时最小的流水线
            index = total_time.index(min_time)  # 找到最小耗时的流水线的索引
            total_time[index] += job_times[i]  # 将当前作业分配到最小耗时的流水线
    
    print(max(total_time))  # 输出处理完所有作业的总耗时
    

> #### 文章目录
>
>   *     *       * 题目描述
>       * 输入描述
>       * 输出描述
>       *         * ACM输入输出模式
>       * 用例
>       * 机考代码查重
>       * C++
>       * java
>       * javaScript
>       * python
>       * 完整用例
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

    
    
    3 5
    8 4 3 2 10
    

##### 用例2

    
    
    2 4
    5 6 7 8
    

##### 用例3

    
    
    4 6
    1 2 3 4 5 6
    

##### 用例4

    
    
    1 3
    10 20 30
    

##### 用例5

    
    
    5 5
    1 2 3 4 5
    

##### 用例6

    
    
    10 20
    1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20
    

##### 用例7

    
    
    6 10
    10 9 8 7 6 5 4 3 2 1
    

##### 用例8

    
    
    7 8
    1 2 3 4 5 6 7 8
    

##### 用例9

    
    
    4 15
    5 10 15 20 25 30 35 40 45 50 55 60 65 70 75
    

##### 用例10

    
    
    8 12
    2 4 6 8 10 12 14 16 18 20 22 24
    

