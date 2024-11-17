#### 题目描述

在系统、网络均正常的情况下组织核酸采样员和志愿者对人群进行[核酸检测]筛查。

每名采样员的效率不同，采样效率为N人/小时。

由于外界变化，采样员的效率会以M人/小时为粒度发生变化，M为采样效率浮动粒度，M=N*10%，输入保证N*10%的结果为整数。

采样员效率浮动规则：采样员需要一名志愿者协助组织才能发挥正常效率，在此基础上，每增加一名志愿者，效率提升1M，最多提升3M；如果没有志愿者协助组织，效率下降2M。

怎么安排速度最快？求**总最快检测效率** （总检查效率为各采样人员效率值相加）。

#### 输入描述

第一行：第一个值，采样员人数，取值范围[1, 100]；第二个值，志愿者人数，取值范围[1, 500]；  
第二行：各采样员基准效率值（单位人/小时），取值范围[60, 600]，保证序列中每项值计算10%为整数。

#### 输出描述

第一行：总最快检测效率（单位人/小时）

#### 用例

输入| 2 2  
200 200  
---|---  
输出| 400  
说明| 输入需要保证采样员基准效率值序列的每个值*10%为整数。  
  
#### 题目解析

用例解析：

  1. 有两个采样员和两个志愿者；

  2. 每个采样员需要配合一个志愿者才能发挥正常效率，即200；

  3. 当采样员和志愿者数量相等时，可以发挥最大效率，为400；

  4. 如果一个采样员配合两个志愿者，其效率提高为220，但另一个采样员将没有志愿者，效率降为160，此时总效率为380；

**由此可以得出，最大效率为400**

解题：

首先分两种情况：

1、志愿者数量少于采样员

2、志愿者数量不少于采样员，如果采样员：志愿者
的比例，超过了1：4，那么超出4倍采样员范围的志愿者将没有效率提升作用，因此有效志愿者数量最多是四倍的采样员数量。

情况1：

在情况1中，建议将有限数量的志愿者优先分配给高效率的采样员，并采取默认的一比一分配方式。如果高效率的采样员可以增加至少10%的效率，而剥夺低效率采样员的志愿者只会导致他们的效率下降20%以上，则应该将志愿者从低效率的采样员那里转移到高效率的采样员那里。此外，需要注意高效率采样员最多只能追加三个志愿者。

情况2：

在情况2中，建议首先按一比一的方式为每个采样员分配一个志愿者。如果有多余的志愿者，则应该优先分配给高效率的采样员，同样需要注意每个采样员最多只能追加三个志愿者。当所有的志愿者都分配完后，如果高效率的采样员可以增加至少10%的效率，而剥夺低效率采样员的志愿者只会导致他们的效率下降20%以上，则应该将志愿者从低效率的采样员那里转移到高效率的采样员那里。

#### C++

    
    
    #include <iostream>
    #include <vector>
    #include <algorithm>
    using namespace std;
    
    // 按效率从高到低排序的比较函数
    bool cmp(int a, int b) {
    return a > b;
    }
    
    int main() {
    int sample_num, volunteer_num;
    cin >> sample_num >> volunteer_num;
    
    vector<int> efficiencies;
    for (int i = 0; i < sample_num; i++) {
        int efficiency;
        cin >> efficiency;
        efficiencies.push_back(efficiency);
    }
    sort(efficiencies.begin(), efficiencies.end(), cmp);
    
    int result = 0;
    int volunteer_count = 0; // 每个采样员配备的志愿者个数
    int high_efficiency_index = 0; // 最高效率的采样员的索引
    int low_efficiency_index = sample_num - 1; // 最低效率的采样员的索引
    
    // 分支1: 志愿者人数少于采样员人数
    if (volunteer_num < sample_num) {
        for (int i = 0; i < sample_num; i++) {
            int efficiency = efficiencies[i];
            if (i < volunteer_num) {
                result += efficiency; // 每个志愿者对应效率最高的采样员
            } else {
                result += efficiency * 0.8; // 志愿者数量不足时采样员效率下降20%
            }
        }
        low_efficiency_index = volunteer_num - 1;
    }
    // 分支2: 志愿者人数多于或等于采样员人数
    else {
        // 如果志愿者人数超过采样员四倍，则多出来的志愿者无效
        if (volunteer_num >= 4 * sample_num) {
            volunteer_num = 4 * sample_num;
        }
        for (int efficiency : efficiencies) {
            result += efficiency; // 每个采样员都有一个志愿者
        }
        int remain_volunteer_num = volunteer_num - sample_num;
        high_efficiency_index = sample_num - 1;
       while (remain_volunteer_num > 0) {
                   result += efficiencies[high_efficiency_index] * 0.1;
                   remain_volunteer_num--;
                   if (++volunteer_count == 3) {
                       volunteer_count = 0;
                       high_efficiency_index++;
                   }
               }
           }
            
    	       // 剥夺低效率采样员的志愿者给高效率的采样员
    	       while (high_efficiency_index < low_efficiency_index) {
    	           // 最高效率的采样员上升10%的效率 > 最低效率的采样员下降20%的效率
    	           if (efficiencies[high_efficiency_index] * 0.1 > efficiencies[low_efficiency_index] * 0.2) {
    	               result += efficiencies[high_efficiency_index] * 0.1 - efficiencies[low_efficiency_index] * 0.2;
    	       
    	               // 最多就4个志愿者
    	               if (++volunteer_count == 3) {
    	                   volunteer_count = 0;
    	                   high_efficiency_index++;
    	               }
    	               low_efficiency_index--;
    	           } else {
    	               break;
    	           }
    	       }
    	    
    	       cout << result;
    	    
    	   	return 0;
    }
    

#### JavaScript

    
    
    const readline = require("readline");
    
    // 创建 readline 接口实例
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    
    // 存储输入数据的数组
    const inputLines = [];
    
    // 监听输入
    rl.on("line", (line) => {
      // 将每行输入保存到 inputLines 数组中
      inputLines.push(line);
    
      // 当输入达到两行时，开始计算结果并输出
      if (inputLines.length === 2) {
        const [numOfSamplers, numOfVolunteers] = inputLines[0].split(" ").map(Number);
        const samplerEfficiencies = inputLines[1].split(" ").map(Number);
    
        console.log(getResult(samplerEfficiencies, numOfSamplers, numOfVolunteers));
    
        // 清空 inputLines 数组，准备接收新一轮输入
        inputLines.length = 0;
      }
    });
    
    /**
     * 计算分配志愿者后采样员的最大效率值
     * @param {Array} effs 采样员们的正常效率
     * @param {number} numSamp 采样员人数
     * @param {number} numVolun 志愿者人数
     * @returns {number} 最大效率值
     */
    function getResult(effs, numSamp, numVolun) {
      // 按照正常效率从高到低排序
      effs.sort((a, b) => b - a);
    
      let maxEff = 0; // 最大效率值
    
      let leftIndex; // 左指针
      let rightIndex; // 右指针
      let surplusVolunteers = 0; // 多余的志愿者数量
      let counter = 0; // 计数器
    
      if (numVolun < numSamp) {
        // 若志愿者人数少于采样员人数，则优先为效率高的采样员分配志愿者
        for (let i = 0; i < numSamp; i++) {
          // 0~numVolun-1 范围内效率高的采样员获得一个志愿者，其他采样员没有志愿者，效率降低 20%
          maxEff += i < numVolun ? effs[i] : effs[i] * 0.8;
        }
    
        leftIndex = 0;
        rightIndex = numVolun - 1;
      } else {
        // 如果志愿者人数不少于采样员人数，那么默认情况下每个采样员都分配一个志愿者
        // 如果志愿者人数超过采样员人数的四倍，则多出来的志愿者就没有作用了
        if (numVolun >= 4 * numSamp) {
          numVolun = 4 * numSamp;
        }
    
        // 全部采样员发挥正常效率
        maxEff = effs.reduce((prev, curr) => prev + curr);
    
        // 记录多余的志愿者数量
        surplusVolunteers = numVolun - numSamp;
    
        leftIndex = 0;
        rightIndex = numSamp - 1;
    
        // 优先将多余的志愿者分配给效率高的采样员
        while (surplusVolunteers > 0) {
          maxEff += effs[leftIndex] * 0.1;
          surplusVolunteers--;
          if (++counter === 3) {
            counter = 0;
            leftIndex++;
          }
        }
      }
    
      // 尝试将多余的志愿者从效率低的采样员中转移到效率高的采样员中
      while (leftIndex < rightIndex) {
        // 判断如果最高效率的采样员上升 10% 的效率是否比最低效率的采样员下降 20% 的效率更加高效
        if (effs[leftIndex] * 0.1 > effs[rightIndex] * 0.2) {
            maxEff += effs[leftIndex] * 0.1 - effs[rightIndex] * 0.2;
            leftIndex++;
            rightIndex--;
          } else {
            break;
          }
        }
      
        return maxEff
      }
      
    
    

#### Java

    
    
    import java.util.*;
    
    class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            int sampleCount = scanner.nextInt();
            int volunteerCount = scanner.nextInt();
    
            Integer[] efficiencies = new Integer[sampleCount];
            for (int i = 0; i < sampleCount; i++) {
                efficiencies[i] = scanner.nextInt();
            }
    
            // 按效率从高到低排序
            Arrays.sort(efficiencies, Collections.reverseOrder());
    
            int result = 0; // 总效率值
            int volunteerIndex = 0; // 当前志愿者的下标
            int sampleIndex = 0; // 当前采样员的下标
    
            // 分支1: 志愿者<采样员，优先将志愿者分配给效率高的采样员
            if (volunteerCount < sampleCount) {
                for (int i = 0; i < sampleCount; i++) {
                    if (volunteerIndex < volunteerCount) {
                        result += efficiencies[i];
                        volunteerIndex++;
                    } else {
                        result += (int)(efficiencies[i] * 0.8);
                    }
                }
                // 分支2: 志愿者>=采样员，先给每个采样员都分配一个志愿者
            } else {
                int maxVolunteerCount = Math.min(volunteerCount, 4 * sampleCount); // 最大有效志愿者数量
                for (int i = 0; i < sampleCount; i++) {
                    result += efficiencies[i];
                    volunteerIndex++;
                }
    
                while (volunteerIndex < maxVolunteerCount) {
                    result += (int)(efficiencies[sampleIndex] * 0.1);
                    volunteerIndex++;
                    if (++sampleIndex == sampleCount) {
                        sampleIndex = 0;
                    }
                }
            }
    
            // 剥夺低效率采样员的志愿者给高效率的采样员
            while (sampleIndex < sampleCount - 1) {
                if (efficiencies[sampleIndex] * 0.1 > efficiencies[sampleCount - 1] * 0.2) {
                    result += (int)(efficiencies[sampleIndex] * 0.1 - efficiencies[sampleCount - 1] * 0.2);
                    sampleIndex++;
                    volunteerIndex--;
                } else {
                    break;
                }
            }
    
            System.out.println(result);
        }
    }
    

#### Python

    
    
    # 获取输入
    num_of_samplers, num_of_volunteers = map(int, input().split())
    efficiencies = list(map(int, input().split()))
    
    # 算法入口
    def get_max_efficiency(efficiencies, num_of_samplers, num_of_volunteers):
        # 按照效率降序排序
        efficiencies.sort(reverse=True)
    
        max_efficiency = 0
        count = 0
        i = None
        j = None
    
        # 如果志愿者少于采样员，则优先将志愿者分配给正常效率高的采样员
        if num_of_volunteers < num_of_samplers:
            # 0~num_of_volunteers-1范围内高效率的采样员优先获得一个志愿者，因此保持正常效率，而num_of_volunteers~num_of_samplers-1范围内的低效率采样员则没有志愿者，效率下降20%
            for k in range(num_of_samplers):
                max_efficiency += efficiencies[k] if k < num_of_volunteers else efficiencies[k] * 0.8
    
            i = 0
            j = num_of_volunteers - 1
        # 如果志愿者 不少于 采样员，那么默认情况下每个采样员都分配一个志愿者
        else:
            # 如果志愿者人数超过采样员四倍，则多出来的志愿者就没有作用了
            if num_of_volunteers >= 4 * num_of_samplers:
                num_of_volunteers = 4 * num_of_samplers
    
            # 每个采样员都默认发挥正常效率
            for val in efficiencies:
                max_efficiency += val
    
            # surplus记录每个采样员分配一个志愿者后，还多出来的志愿者
            surplus = num_of_volunteers - num_of_samplers
    
            i = 0
            j = num_of_samplers - 1
    
            # 优先将多出来的志愿者分配给高效率的采样员
            while surplus > 0:
                max_efficiency += efficiencies[i] * 0.1
                surplus -= 1
                count += 1
                if count == 3:
                    count = 0
                    i += 1
    
        # 志愿者分配完后，则继续考虑剥夺低效率采样员的志愿者给高效率的采样员
        while i < j:
            # 如果最高效率的采样员上升10%的效率  是否大于  最低效率的采样员下降20%的效率，那么就值得剥夺
            if efficiencies[i] * 0.1 > efficiencies[j] * 0.2:
                max_efficiency += efficiencies[i] * 0.1 - efficiencies[j] * 0.2
    
                # 由于一个采样员最多只能提升30%，即除了一个基础志愿者外，最多再配3个志愿者，多配了也没用
                count += 1
                if count == 3:
                    count = 0
                    i += 1
                j -= 1
            else:
                break
    
        return int(max_efficiency)
    
    
    # 调用算法并输出结果
    print(get_max_efficiency(efficiencies, num_of_samplers, num_of_volunteers))
    

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

