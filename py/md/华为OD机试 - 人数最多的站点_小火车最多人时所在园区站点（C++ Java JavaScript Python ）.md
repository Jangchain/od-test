#### 题目描述

公园园区提供小火车单向通行，从园区站点编号最小到最大通行如12341，然后供员工在各个办公园区穿梭，通过对公司N个员工调研统计到每个员工的坐车区间，包含前后站点，请设计一个程序计算出小火车在哪个园区站点时人数最多。

#### 输入描述

第1个行，为调研员工人数

第2行开始，为每个员工的上车站点和下车站点。  
使用数字代替每个园区用空格分割，如3 5表示从第3个园区上车，在第5个园区下车

#### 输出描述

人数最多时的园区站点编号，最多人数相同时返回编号最小的园区站点

#### 用例

#### 题目解析

本题是求解最大重叠区间个数的变种题。

即，找到具有最大重叠部分的区间的起点就是本题题解。

#### C++

    
    
    #include<iostream>
    #include<vector>
    #include<algorithm>
    #include<map>
    
    using namespace std;
    
    bool compare(vector<int> a, vector<int> b) {
        //按照第二个元素从大到小排序
        if (a[1] == b[1]) {
            return a[0] < b[0];
        }
        return a[1] > b[1];
    }
    
    int main()
    {
        //输入处理
        int n; //人数
        cin >> n;
    
        vector<vector<int>> intervals; //存储区间
        int max_site = 0; //记录最大的场地编号
        for (int i = 0; i < n; i++) {
            int start, end;
            cin >> start >> end;
            max_site = max(max_site, max(start, end)); //更新最大场地编号
            intervals.push_back(vector<int>{start, end}); //将区间存入vector
        }
    
        vector<vector<int>> sites; //存储场地
        for (int i = 0; i < intervals.size(); i++) {
            if (intervals[i][0] > intervals[i][1]) { //如果起始时间晚于结束时间
                sites.push_back(vector<int>{intervals[i][0], max_site}); //将区间拆分成两部分
                sites.push_back(vector<int>{1, intervals[i][1]});
            } else {
                sites.push_back(vector<int>{intervals[i][0], intervals[i][1]});
            }
        }
    
        //创建场地的数据结构
        map<int, int> site_map;
        for (auto site : sites) { //遍历所有场地
            for (int i = site[0]; i <= site[1]; i++) { //将场地的使用时间加入map中
                if (site_map.count(i)) {
                    site_map[i] ++;
                } else {
                    site_map[i] = 1;
                }
            }
        }
    
        //将map信息转到vector中，以便后续排序
        vector<vector<int>> site_count;
        for (auto item : site_map) {
            vector<int> temp;
            temp.push_back(item.first);
            temp.push_back(item.second);
            site_count.push_back(temp);
        }
    
        //按照场地使用次数排序
        sort(site_count.begin(), site_count.end(), compare);
    
        //输出
        cout << site_count[0][0] << endl;
    
        return 0;
    }
    

#### JavaScript

    
    
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    let n; // 人数
    let intervals = []; // 存储区间
    
    rl.on('line', (line) => {
      if (!n) {
        n = parseInt(line.trim());
      } else {
        const [start, end] = line.trim().split(' ').map(Number);
        intervals.push([start, end]);
      }
    }).on('close', () => {
      let max_site = 0; // 记录最大的场地编号
      for (let i = 0; i < n; i++) {
        const [start, end] = intervals[i];
        max_site = Math.max(max_site, Math.max(start, end)); // 更新最大场地编号
      }
    
      let sites = []; // 存储场地
      for (let i = 0; i < intervals.length; i++) {
        const [start, end] = intervals[i];
        if (start > end) { // 如果起始时间晚于结束时间
          sites.push([start, max_site]); // 将区间拆分成两部分
          sites.push([1, end]);
        } else {
          sites.push([start, end]);
        }
      }
    
      // 创建场地的数据结构
      let site_map = new Map();
      for (let i = 0; i < sites.length; i++) { // 遍历所有场地
        const [start, end] = sites[i];
        for (let j = start; j <= end; j++) { // 将场地的使用时间加入map中
          site_map.set(j, (site_map.get(j) || 0) + 1);
        }
      }
    
      // 将map信息转到List中，以便后续排序
      let site_count = Array.from(site_map.entries()).map(([key, value]) => [key, value]);
    
      // 按照场地使用次数排序
      site_count.sort((a, b) => {
        // 按照第二个元素从大到小排序
        if (a[1] === b[1]) {
          return a[0] - b[0];
        }
        return b[1] - a[1];
      });
    
      // 输出
      console.log(site_count[0][0]);
    });
    
    

#### Java

    
    
    import java.util.*;
    
    public class Main {
        public static void main(String[] args) {
            //输入处理
            Scanner scanner = new Scanner(System.in);
            int n = scanner.nextInt(); //人数
    
            List<List<Integer>> intervals = new ArrayList<>(); //存储区间
            int max_site = 0; //记录最大的场地编号
            for (int i = 0; i < n; i++) {
                int start = scanner.nextInt();
                int end = scanner.nextInt();
                max_site = Math.max(max_site, Math.max(start, end)); //更新最大场地编号
                intervals.add(Arrays.asList(start, end)); //将区间存入List
            }
    
            List<List<Integer>> sites = new ArrayList<>(); //存储场地
            for (int i = 0; i < intervals.size(); i++) {
                if (intervals.get(i).get(0) > intervals.get(i).get(1)) { 
                    sites.add(Arrays.asList(intervals.get(i).get(0), max_site));
                    sites.add(Arrays.asList(1, intervals.get(i).get(1)));
                } else {
                    sites.add(Arrays.asList(intervals.get(i).get(0), intervals.get(i).get(1)));
                }
            }
    
            //创建场地的数据结构
            Map<Integer, Integer> site_map = new HashMap<>();
            for (List<Integer> site : sites) { //遍历所有场地
                for (int i = site.get(0); i <= site.get(1); i++) { //将场地的使用时间加入map中
                    site_map.put(i, site_map.getOrDefault(i, 0) + 1);
                }
            }
    
            //将map信息转到List中，以便后续排序
            List<List<Integer>> site_count = new ArrayList<>();
            for (Map.Entry<Integer, Integer> entry : site_map.entrySet()) {
                List<Integer> temp = new ArrayList<>();
                temp.add(entry.getKey());
                temp.add(entry.getValue());
                site_count.add(temp);
            }
    
            //按照场地使用次数排序
            Collections.sort(site_count, new Comparator<List<Integer>>() {
                @Override
                public int compare(List<Integer> a, List<Integer> b) {
                    //按照第二个元素从大到小排序
                    if (a.get(1).equals(b.get(1))) {
                        return a.get(0) - b.get(0);
                    }
                    return b.get(1) - a.get(1);
                }
            });
    
            //输出
            System.out.println(site_count.get(0).get(0));
        }
    }
    

#### Python

    
    
    def compare(a, b):
        # 按照第二个元素从大到小排序
        if a[1] == b[1]:
            return a[0] < b[0]
        return a[1] > b[1]
    
    n = int(input()) # 人数
    
    intervals = [] # 存储区间
    max_site = 0 # 记录最大的场地编号
    for i in range(n):
        start, end = map(int, input().split())
        max_site = max(max_site, max(start, end)) # 更新最大场地编号
        intervals.append([start, end]) # 将区间存入列表
    
    sites = [] # 存储场地
    for interval in intervals:
        if interval[0] > interval[1]: # 如果起始时间晚于结束时间
            sites.append([interval[0], max_site]) # 将区间拆分成两部分
            sites.append([1, interval[1]])
        else:
            sites.append(interval)
    
    # 创建场地的数据结构
    site_map = {}
    for site in sites: # 遍历所有场地
        for i in range(site[0], site[1]+1): # 将场地的使用时间加入字典中
            if i in site_map:
                site_map[i] += 1
            else:
                site_map[i] = 1
    
    # 将字典信息转到列表中，以便后续排序
    site_count = []
    for key, value in site_map.items():
        site_count.append([key, value])
    
    # 按照场地使用次数排序
    site_count.sort(key=lambda x: (-x[1], x[0]))
    
    # 输出
    print(site_count[0][0])
    

#### 文章目录

  *     *       * 题目描述
      * 输入描述
      * 输出描述
      * 用例
      * 题目解析
      * C++
      * JavaScript
      * Java
      * Python

![fengmian](https://img-
blog.csdnimg.cn/img_convert/1d2f33ed8cf2fb1b9a4fe09513f7aa94.png)

