#### 题目描述

考勤记录是分析和考核职工工作时间利用情况的原始依据，也是计算职工工资的原始依据，为了正确地计算职工工资和监督工资基金使用情况，公司决定对员工的手机打卡记录进行异常排查。

如果出现以下两种情况，则认为打卡异常：

  1. 实际设备号与注册设备号不一样
  2. 或者，同一个员工的两个打卡记录的时间小于60分钟并且打卡距离超过5km。

给定打卡记录的[字符串数组]clockRecords（每个打卡记录组成为：工号;时间（分钟）;打卡距离（km）;实际设备号;注册设备号），返回其中异常的打卡记录（按输入顺序输出）。

#### 输入描述

第一行输入为N，表示打卡记录数；

之后的N行为打卡记录，每一行为一条打卡记录。

#### 输出描述

输出异常的打卡记录。

#### 备注

  * clockRecords长度 ≤ 1000
  * clockRecords[i] 格式：{id},{time},{distance},{actualDeviceNumber},{registeredDeviceNumber}
  * id由6位数字组成
  * time由整数组成，范围为0~1000
  * distance由整数组成，范围为0~100
  * actualDeviceNumber与registeredDeviceNumber由思维大写字母组成

#### 用例

输入| 2  
100000,10,1,ABCD,ABCD  
100000,50,10,ABCD,ABCD  
---|---  
输出| 100000,10,1,ABCD,ABCD;100000,50,10,ABCD,ABCD  
说明| 第一条记录是异常得，因为第二题记录与它得间隔不超过60分钟，但是打卡距离超过了5km，同理第二条记录也是异常得。  
输入| 2  
100000,10,1,ABCD,ABCD  
100001,80,10,ABCE,ABCE  
---|---  
输出| null  
说明| 无异常打卡记录，所以返回null  
输入| 2  
100000,10,1,ABCD,ABCD  
100000,80,10,ABCE,ABCD  
---|---  
输出| 100000,80,10,ABCE,ABCD  
说明| 第二条记录得注册设备号与打卡设备号不一致，所以是异常记录  
  
#### 题目解析

第一步是对单条打卡记录进行比较，判断其是否异常。异常情况有两种：一是实际设备号和注册设备号不同；二是同一员工的两条打卡记录时间间隔小于60分钟但是打卡距离超过5km。

第二步是对同一员工下设备号一致的打卡记录进行两两对比，判断是否异常。如果有两个打卡记录时间间隔小于60分钟且打卡距离超过5km，则视为异常。需要注意的是，一旦有两条打卡记录对比异常了，其他打卡记录也需要和这两条异常记录对比。

在保存异常打卡记录时，需要记录其输入时的索引，以便按照输入顺序输出异常记录。

#### C++

    
    
    #include <iostream>
    #include <vector>
    #include <map>
    #include <set>
    #include <algorithm>
    using namespace std;
    
    /* 按操作符分隔字符串 */
    vector<string> split_str( string params_str, string op )
    {
    	vector<string> p;
    	while ( params_str.find( op ) != string::npos )
    	{
    		int found = params_str.find( op );
    		p.push_back( params_str.substr( 0, found ) );
    		params_str = params_str.substr( found + 1 );
    	}
    	p.push_back( params_str );
    	return(p);
    }
    
    
    /* 用于比较两个打卡记录 */
    bool comp( vector<string> & a, vector<string> & b )
    {
    	return(stoi( a[1] ) > stoi( b[1] ) );
    }
    
    
    int main()
    {
    /* 读取输入 */
    	string num_str;
    	getline( cin, num_str );
    	int			n = stoi( num_str );
    	vector<vector<string> > records; /* 存放所有打卡记录 */
    	for ( int i = 0; i < n; i++ )
    	{
    		string record_str;
    		getline( cin, record_str );
    		records.push_back( split_str( record_str, "," ) );
    	}
    
    	map<string, vector<vector<string> > >	record_map;             /* 存放每位员工的打卡记录 */
    	set<int>				result;                 /* 存放异常记录的索引 */
    
    /* 异常规则1：同一天内，进和出的门不一致 */
    	for ( int i = 0; i < records.size(); i++ )
    	{
    		records[i].push_back( to_string( i ) );                 /* 加一个索引 i，以便排序后输出原来的顺序 */
    		vector<string> single_record = records[i];
    
    		if ( single_record[3] != single_record[4] )
    		{
    			result.insert( i );                             /* 如果进和出的门不一致，则为异常记录 */
    		} else {
    			if ( record_map.count( single_record[0] ) )     /* 将相同员工的记录存放在一起 */
    			{
    				record_map[single_record[0]].push_back( single_record );
    			} else {
    				vector<vector<string> > temp;
    				temp.push_back( single_record );
    				record_map[single_record[0]] = temp;
    			}
    		}
    	}
    
    /* 异常规则2：在一小时内，距离相差超过5米 */
    	for ( auto single_records_info : record_map )
    	{
    		vector<vector<string> > single_employee_records = single_records_info.second;
    
    		/* 用打卡时间排序，以加速双层循环 */
    		sort( single_employee_records.begin(), single_employee_records.end(), comp );
    
    		for ( int i = 0; i < single_employee_records.size(); i++ )
    		{
    			int	time1	= stoi( single_employee_records[i][1] );
    			int	dist1	= stoi( single_employee_records[i][2] );
    
    			for ( int j = i + 1; j < single_employee_records.size(); j++ )
    			{
    				int	time2	= stoi( single_employee_records[j][1] );
    				int	dist2	= stoi( single_employee_records[j][2] );
    
    				/* 如果当前的两次打卡时间超过60分钟，则后续的肯定也超过60分钟了 */
    				if ( time2 - time1 >= 60 )
    				{
    					break;
    				} else {
    					if ( abs( dist2 - dist1 ) > 5 )
    					{
    						result.insert( stoi( single_employee_records[i][5] ) );
    						result.insert( stoi( single_employee_records[j][5] ) );
    					}
    				}
    			}
    		}
    	}
    
    /* 输出结果 */
    	if ( result.empty() )
    	{
    		cout << "null";
    	} else {
    		for ( int i : result ) /* 遍历异常记录的索引 */
    		{
    			for ( int j = 0; j < records[i].size() - 1; j++ )
    			{
    				cout << records[i][j];
    				if ( j != records[i].size() - 2 )
    				{
    					cout << ",";
    				}
    			}
    			cout << ":";
    		}
    	}
    
    	return(0);
    }
    

#### JavaScript

    
    
    // 引入readline模块
    const readline = require("readline");
    
    // 创建readline接口实例
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    
    // 定义全局变量
    const records = []; // 所有打卡记录
    let numEmployees; // 员工数量
    
    // 监听每一行输入
    rl.on("line", (line) => {
      // 将输入的每一行记录存入records数组中
      records.push(line);
    
      // 如果记录数量达到要求，则开始处理
      if (records.length === numEmployees + 1) {
        // 获取结果并输出
        const result = getResult(records.slice(1));
        console.log(result);
    
        // 重置记录数组和员工数量
        records.length = 0;
        numEmployees = 0;
      } else if (records.length === 1) {
        // 如果记录数量为1，则说明是员工数量，将其存入numEmployees变量中
        numEmployees = parseInt(line);
      }
    });
    
    /**
     * @param {*} clockRecords 打卡记录的字符串数组, [工号, 时间, 打卡距离, 实际设备号, 注册设备号]
     */
    function getResult(clockRecords) {
      const employees = {}; // 员工打卡记录的对象
      const ans = new Set(); // 异常打卡记录的集合
    
      // 遍历所有打卡记录，将异常记录加入ans集合，将正常记录存入employees对象中
      for (let i = 0; i < clockRecords.length; i++) {
        const clockRecord = [...clockRecords[i].split(","), i]; // 将打卡记录转为数组形式，并追加输入索引
        const [id, time, dis, actDevice, regDevice, index] = clockRecord;
    
        // 如果实际设备号与注册设备号不一致，则认为是异常打卡记录
        if (actDevice !== regDevice) {
          ans.add(index);
        } else {
          // 如果实际设备号与注册设备号一致，则将打卡记录存入employees对象中
          if (employees[id]) {
            employees[id].push(clockRecord);
          } else {
            employees[id] = [clockRecord];
          }
        }
      }
    
      // 遍历employees对象，检查每个员工的打卡记录是否存在异常
      for (let id in employees) {
        const records = employees[id]; // 该员工的所有打卡记录
        const n = records.length; // 打卡记录数量
    
        // 将该员工的打卡记录按照打卡时间升序排序
        records.sort((a, b) => a[1] - b[1]);
    
        // 遍历该员工的打卡记录，检查是否存在异常
        for (let i = 0; i < n; i++) {
          const time1 = records[i][1];
          const dis1 = records[i][2];
    
          for (let j = i + 1; j < n; j++) {
            const time2 = records[j][1];
            const dis2 = records[j][2];
    
            // 如果两次打卡时间超过60分钟，则后面的打卡记录不用再检查了
            if (time2 - time1 >= 60) {
              break;
            } else {
              // 如果两次打卡时间小于60分钟，且打卡距离超过5公里，则认为是异常打卡记录
              if (Math.abs(dis2 - dis1) > 5) {
                // 如果打卡记录已经加入ans集合，则无需再次加入，否则需要加入
                if (!ans.has(records[i][5])) {
                  ans.add(records[i][5]);
                }
    
                if (!ans.has(records[j][5])) {
                  ans.add(records[j][5]);
                }
              }
            }
          }
        }
      }
    
      // 如果没有异常打卡记录，则返回null
      if (!ans.size) {
        return "null";
      }
    
      // 将异常打卡记录按照输入顺序排序，并返回结果字符串
      return [...ans]
        .sort((a, b) => a - b)
        .map((i) => clockRecords[i])
        .join(";");
    }
    

#### Java

    
    
    import java.util.ArrayList;
    import java.util.Arrays;
    import java.util.HashMap;
    import java.util.Scanner;
    import java.util.TreeSet;
    import java.util.stream.Collectors;
     class Main {
    public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);
        // 读取输入
        int numRecords = scanner.nextInt(); // 打卡记录数目
        scanner.nextLine();
        String[][] records = new String[numRecords][];
        for (int i = 0; i < numRecords; i++) {
            records[i] = scanner.nextLine().split(",");
        }
    
        // 存放每位员工的打卡记录
        HashMap<String, ArrayList<String[]>> recordMap = new HashMap<>();
        TreeSet<Integer> result = new TreeSet<>();
    
        // 异常规则1：打卡时间不一致
        for (int i = 0; i < records.length; i++) {
            // 在打卡记录后面增加一个索引，方便后面输出时按照输入顺序排序
            String[] singleRecord = Arrays.copyOf(records[i], records[i].length + 1);
            singleRecord[singleRecord.length - 1] = i + "";
    
            if (!singleRecord[3].equals(singleRecord[4])) {
                result.add(i);
            } else {
                String id = singleRecord[0];
                if (recordMap.containsKey(id)) {
                    recordMap.get(id).add(singleRecord);
                } else {
                    ArrayList<String[]> list = new ArrayList<>();
                    list.add(singleRecord);
                    recordMap.put(id, list);
                }
            }
        }
    
        // 异常规则2：在60分钟内，两次打卡地点距离大于5米
        for (String id : recordMap.keySet()) {
            ArrayList<String[]> idRecords = recordMap.get(id);
    
            // 按照打卡时间排序，以便后面双层循环加速
            idRecords.sort((a, b) -> Integer.parseInt(a[1]) - Integer.parseInt(b[1]));
    
            for (int i = 0; i < idRecords.size(); i++) {
                int time1 = Integer.parseInt(idRecords.get(i)[1]);
                int dist1 = Integer.parseInt(idRecords.get(i)[2]);
    
                for (int j = i + 1; j < idRecords.size(); j++) {
                    int time2 = Integer.parseInt(idRecords.get(j)[1]);
                    int dist2 = Integer.parseInt(idRecords.get(j)[2]);
    
                    // 如果当前的两次打卡时间超过60分钟，后面的肯定也超过60分钟了
                    if (time2 - time1 >= 60) {
                        break;
                    } else {
                        if (Math.abs(dist2 - dist1) > 5) {
                            result.add(Integer.parseInt(idRecords.get(i)[5]));
                            result.add(Integer.parseInt(idRecords.get(j)[5]));
                        }
                    }
                }
            }
        }
    
        // 输出结果
        if (result.isEmpty()) {
            System.out.println("null");
        } else {
            String resStr = result.stream()
                                  .map(index -> join(records[index]))
                                  .collect(Collectors.joining(":"));
            System.out.println(resStr);
        }
    }
    
    // 将字符串数组拼接成一个字符串
    public static String join(String[] strs) {
        String s = "";
            for (String str : strs) {
                s+=str+",";
            }
            return s.substring(0, s.length()-1);
    
    }
     }
    

#### Python

    
    
    n = int(input())
    clock_records = [input().split(",") for i in range(n)]
     
     
    # 算法入口
    def get_result(clock_records):
        employees = {}
        ans = set()
     
        for i in range(len(clock_records)):
            id, time, dis, act_device, reg_device = clock_records[i]
     
            # 实际设备号与注册设备号不一样,则认为打卡异常
            if act_device != reg_device:
                ans.add(i)
            # 如果实际设备号和注册设备号一样，则统计到该员工名下
            else:
                # 由于异常打卡记录需要按输入顺序输出，因此这里追加一个输入索引到打卡记录中
                clock_record = [id, time, dis, act_device, reg_device, i]
                if employees.get(id) is None:
                    employees[id] = [clock_record]
                else:
                    employees[id].append(clock_record)
     
        for id in employees.keys():
            # 某id员工的所有打卡记录
            records = employees[id]
            n = len(records)
     
            # 将该员工打卡记录按照打卡时间升序
            records.sort(key=lambda x: x[1])
     
            for i in range(n):
                time1 = int(records[i][1])
                dis1 = int(records[i][2])
     
                for j in range(i + 1, n):
                    time2 = int(records[j][1])
                    dis2 = int(records[j][2])
     
                    # 如果两次打卡时间超过60分治，则不计入异常，由于已按打卡时间升序，因此后面的都不用检查了
                    if time2 - time1 >= 60:
                        break
                    else:
                        # 如果两次打开时间小于60MIN，且打卡距离超过5KM，则这两次打卡记录算作异常
                        if abs(dis2 - dis1) > 5:
                            # 如果打卡记录已经加入异常列表ans，则无需再次加入，否则需要加入
                            if records[i][5] not in ans:
                                ans.add(records[i][5])
     
                            if records[j][5] not in ans:
                                ans.add(records[j][5])
     
            if len(ans) > 0:
                tmp = list(ans)
                tmp.sort()
                return ";".join(list(map(lambda i: ",".join(clock_records[i]), tmp)))
            else:
                return "null"
     
     
    # 调用算法
    print(get_result(clock_records))
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/d702b10837509e3d8c4ec95477717bf6.png)

