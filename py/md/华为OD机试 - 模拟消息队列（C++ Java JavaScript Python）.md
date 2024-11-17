#### 题目描述

让我们来模拟一个消息队列的运作，有一个发布者和若干消费者，发布者会在给定的时刻向消息队列发送消息，

  * 若此时消息队列有消费者订阅，这个消息会被发送到订阅的消费者中优先级最高（输入中消费者按优先级升序排列）的一个；
  * 若此时没有订阅的消费者，该消息被消息队列丢弃。

消费者则会在给定的时刻订阅消息队列或取消订阅。

  * 当消息发送和订阅发生在同一时刻时，先处理订阅操作，即同一时刻订阅的消费者成为消息发送的候选。
  * 当消息发送和取消订阅发生在同一时刻时，先处理取消订阅操作，即消息不会被发送到同一时刻取消订阅的消费者。

#### 输入描述

输入为两行。

第一行为2N个正整数，代表发布者发送的N个消息的时刻和内容（为方便解折，消息内容也用正整数表示）。第一个数字是第一个消息的发送时刻，第二个数字是第一个消息的内容，以此类推。用例保证发送时刻不会重复，但注意消息并没有按照发送时刻排列。

第二行为2M个正整数，代表M个消费者订阅和取消订阅的时刻。第一个数字是第一个消费者订阅的时刻，第二个数字是第一个消费者取消订阅的时刻，以此类推。用例保证每个消费者的取消订阅时刻大于订阅时刻，消费者按优先级升序排列。

两行的数字都由空格分隔。N不超过100，M不超过10，每行的长度不超过1000字符。

#### 输出描述

输出为M行，依次为M个消费者收到的消息内容，消息内容按收到的顺序排列，且由空格分隔；

若某个消费者没有收到任何消息，则对应的行输出-1.

##### ACM输入输出模式

如果你经常使用**Leetcode** ,会知道**letcode** 是不需要编写输入输出函数的。但是华为OD机考使用的是 **ACM 模式**
，需要手动编写输入和输出。

所以最好在牛-
客上提前熟悉这种模式。例如C++使用`cin/cout`,python使用`input()/print()`。JavaScript使用node的`readline()`和`console.log()`。Java
使用`sacnner/system.out.print()`

#### 用例1

输入

    
    
    2 22 1 11 4 44 5 55 3 33
    1 7 2 3
    

输出

    
    
    11 33 44 55
    22
    

说明：

> 消息11在1时刻到达，此时只有第一个消费者订阅，消息发送给它；
>
> 消息22在2时刻到达，此时两个消费者都订阅了，消息发送给优先级最高的第二个消费者；
>
> 消息33在时刻3到达，此时只有第一个消费者订阅，消息发送给它；
>
> 余下的消息按规则也是发送给第一个消费者。

#### 用例2

输入

    
    
    5 64 11 64 9 97
    9 11 4 9
    

输出

    
    
    97
    64
    

说明：

> 消息64在5时刻到达，此时只有第二个消费者订阅，消息发送给它；
>
> 消息97在9时刻到达，此时只有第一消费者订阅(因为第二个消费者刚好在9时刻取消订阅)，消息发送给它;
>
> 11时刻也到达了一个内容为64的消息，不过因为没有消费者订阅，消息被丢弃。

#### 机考代码查重

华为OD机考完成之后，官方会进行代码查重。**华为 od 机考确实有很大的概率抽到原题**
。如果碰到了题库中的原题，一定不要直接使用题解中的代码，尤其是变量名，一定要修改，可以改成毫无意义的单词。除了变量名之外，代码的组织结构和逻辑一定要进行改变，这就要求在日常的刷题中，提前编写好属于自己的代码。

#### Java

    
    
    import java.util.ArrayList;
    import java.util.Arrays;
    import java.util.List;
    import java.util.Scanner;
    import java.util.stream.Collectors;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            
            // 输入消息和消费者信息
            String[] newsInput = scanner.nextLine().split(" ");
            String[] consumersInput = scanner.nextLine().split(" ");
            
            // 将消息和消费者信息转化为列表
            List<Integer> news = new ArrayList<>();
            List<Integer> consumers = new ArrayList<>();
            for (String s : newsInput) {
                news.add(Integer.parseInt(s));
            }
            for (String s : consumersInput) {
                consumers.add(Integer.parseInt(s));
            }
            
            // 将消息和消费者信息转化为列表
            List<List<Integer>> newsList = new ArrayList<>();
            List<List<Integer>> consumersList = new ArrayList<>();
            for (int i = 0; i < news.size(); i += 2) {
                newsList.add(Arrays.asList(news.get(i), news.get(i+1)));
            }
            for (int i = 0; i < consumers.size(); i += 2) {
                consumersList.add(Arrays.asList(consumers.get(i), consumers.get(i+1)));
            }
            
            // 消息按照到达时刻排序
            newsList.sort((a, b) -> a.get(0) - b.get(0));
            
            // 定义消费者收到消息内容的列表
            List<List<Integer>> resList = new ArrayList<>();
            for (int i = 0; i < consumersList.size(); i++) {
                resList.add(new ArrayList<>());
            }
            
            // 遍历每条消息
            for (int i = 0; i < newsList.size(); i++) {
                // 查询每条消息，按照优先级顺序是否到达（反向遍历）
                for (int j = consumersList.size(); j > 0; j--) {
                    // 判断消息达到时刻是否满足消费者要求
                    if (consumersList.get(j-1).get(0) <= newsList.get(i).get(0) && newsList.get(i).get(0) < consumersList.get(j-1).get(1)) {
                        resList.get(j-1).add(newsList.get(i).get(1));
                        break;
                    }
                }
            }
            
            resList.stream().forEach(contents -> {
               if (contents.size() == 0) {
                   System.out.println("-1");
               } else {
                   String result = contents.stream().map(Object::toString).collect(Collectors.joining(" "));
                   System.out.println(result);
               }
           });
        }
    }
    

#### C++

    
    
    #include <iostream>
    #include <vector>
    #include <sstream>
    #include <algorithm>
    
    using namespace std;
    
    int main() {
        string newsInput, consumersInput;
        getline(cin, newsInput);
        getline(cin, consumersInput);
        
        // 将输入的消息和消费者信息转化为列表
        vector<int> news;
        vector<int> consumers;
        stringstream newsStream(newsInput);
        stringstream consumersStream(consumersInput);
        int num;
        while (newsStream >> num) {
            news.push_back(num);
        }
        while (consumersStream >> num) {
            consumers.push_back(num);
        }
        
        // 将消息和消费者信息转化为列表
        vector<vector<int>> newsList;
        vector<vector<int>> consumersList;
        for (int i = 0; i < news.size(); i += 2) {
            newsList.push_back({news[i], news[i+1]});
        }
        for (int i = 0; i < consumers.size(); i += 2) {
            consumersList.push_back({consumers[i], consumers[i+1]});
        }
        
        // 消息按照到达时刻排序
        sort(newsList.begin(), newsList.end(), [](const vector<int>& a, const vector<int>& b) {
            return a[0] < b[0];
        });
        
        // 定义消费者收到消息内容的列表
        vector<vector<int>> resList(consumersList.size(), vector<int>());
        
        // 遍历每条消息
        for (int i = 0; i < newsList.size(); i++) {
            // 查询每条消息，按照优先级顺序是否到达（反向遍历）
            for (int j = consumersList.size(); j > 0; j--) {
                // 判断消息达到时刻是否满足消费者要求
                if (consumersList[j-1][0] <= newsList[i][0] && newsList[i][0] < consumersList[j-1][1]) {
                    resList[j-1].push_back(newsList[i][1]);
                    break;
                }
            }
        }
        
        // 逐个打印消费者消息
        for (const vector<int>& contents : resList) {
            if (contents.size() == 0) {
                cout << "-1" << endl;
            } else {
                for (int i : contents) {
                    cout << i << " ";
                }
                cout << endl;
            }
        }
        
        return 0;
    }
    
    

#### JavaSript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    let publisherSubscriberArray, subscriberArray;
    let numPublisherSubscriber, numSubscriber;
    let publishers, subscribers, subscriberContents;
    
    rl.on('line', (line) => {
      if (!publisherSubscriberArray) {
        publisherSubscriberArray = line.split(' ').map(Number);
        numPublisherSubscriber = publisherSubscriberArray.length;
      } else if (!subscriberArray) {
        subscriberArray = line.split(' ').map(Number);
        numSubscriber = subscriberArray.length;
    
        // 将发布者的信息存储到二维数组中
        publishers = new Array(numPublisherSubscriber / 2);
        for (let i = 0, k = 0; i < numPublisherSubscriber; i += 2) {
          publishers[k++] = [publisherSubscriberArray[i], publisherSubscriberArray[i + 1]];
        }
    
        // 将订阅者的信息存储到二维数组中
        subscribers = new Array(numSubscriber / 2);
        for (let j = 0, k = 0; j < numSubscriber; j += 2) {
          subscribers[k++] = [subscriberArray[j], subscriberArray[j + 1]];
        }
    
        // 将发布者的信息按照时间升序排序
        publishers.sort((a, b) => a[0] - b[0]);
    
        // 用一个列表存储每个订阅者收到的消息
        subscriberContents = new Array(subscribers.length);
        for (let i = 0; i < subscribers.length; i++) {
          subscriberContents[i] = [];
        }
    
       
            // 遍历每条消息
        for (let i = 0; i < publishers.length; i++) {
            // 查询每条消息，按照优先级顺序是否到达（反向遍历）
            for (let j = subscribers.length; j > 0; j--) {
                // 判断消息达到时刻是否满足消费者要求
                if (subscribers[j-1][0] <= publishers[i][0] && publishers[i][0] < subscribers[j-1][1]) {
                    subscriberContents[j-1].push(publishers[i][1]);
                    break;
                }
            }
        }
    
        // 输出每个订阅者收到的消息
        for (let i = 0; i < subscriberContents.length; i++) {
          const subscriberContent = subscriberContents[i];
          if (subscriberContent.length === 0) {
            console.log('-1');
          } else {
            console.log(subscriberContent.join(' '));
          }
        }
      }
    });
    
    

#### Python

    
    
    # 输入消息和消费者信息
    news = list(map(int, input().split()))
    consumers = list(map(int, input().split()))
    
    # 将消息和消费者信息转化为列表
    news_list = []
    consumers_list = []
    for i in range(0, len(news), 2):
        news_list.append([news[i], news[i+1]])
    for i in range(0, len(consumers), 2):
        consumers_list.append([consumers[i], consumers[i+1]])
    
    # 消息按照到达时刻排序
    news_list.sort(key=lambda x: x[0])
    
    # 定义消费者收到消息内容的列表
    res_list = [[] for _ in range(len(consumers_list))]
    
    # 遍历每条消息
    for i in range(len(news_list)):
        # 查询每条消息，按照优先级顺序是否到达（反向遍历）
        for j in range(len(consumers_list), 0, -1):
            # 判断消息达到时刻是否满足消费者要求
            if consumers_list[j-1][0] <= news_list[i][0] < consumers_list[j-1][1]:
                res_list[j-1].append(news_list[i][1])
                break
    
    # 逐个打印消费者消息
    for contents in res_list:
        if len(contents) == 0:
            print("-1")
        else:
            print(" ".join(map(str, contents)))
    

> #### 文章目录
>
>   *     *       * 题目描述
>       * 输入描述
>       * 输出描述
>       *         * ACM输入输出模式
>       * 用例1
>       * 用例2
>       * 机考代码查重
>       * Java
>       * C++
>       * JavaSript
>       * Python
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

2 22 1 11 4 44 5 55 3 33  
1 7 2 3

##### 用例2

1 10 2 20 3 30 4 40 5 50  
1 3 2 4

##### 用例3

1 10 2 20 3 30 4 40 5 50  
1 3 2 4 5 6

##### 用例4

1 10 2 20 3 30 4 40 5 50  
1 3 2 4 5 6 7 8

##### 用例5

1 1 2 2 3 3 4 4 5 5  
1 2 3 4

##### 用例6

1 5 2 4 3 3 4 2 5 1  
1 5 2 4

##### 用例7

1 10 2 20 3 30 4 40 5 50  
1 5 2 3

##### 用例8

1 10 2 20 3 30 4 40 5 50  
1 5 2 3

##### 用例9

5 64 11 64 9 97  
9 11 4 9

##### 用例10

1 10 2 20 3 30 4 40 5 50  
1 5 2 4 3 4 5 6 6 7

