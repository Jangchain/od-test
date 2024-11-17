## 题目描述

现代计算机系统中通常存在多级的存储设备，针对海量 workload 的优化的一种思路是将热点内存页优先放到快速存储层级，这就需要对内存页进行冷热标记。

一种典型的方案是基于内存页的访问频次进行标记，如果统计窗口内访问次数大于等于设定阈值，则认为是热内存页，否则是冷内存页。

对于统计窗口内跟踪到的访存序列和阈值，现在需要实现基于频次的冷热标记。内存页使用页框号作为标识。

## 输入描述

第一行输入为 `N`，表示访存序列的记录条数，0 < `N` ≤ 10000

第二行为访存序列，空格分隔的 `N` 个内存页框号

第三行为阈值

## 输出描述

第一行输出标记为热内存的内存页个数，如果没有被标记的热内存页，则输出 0 。

如果第一行 > 0，则接下来按照访问频次降序输出内存页框号，一行一个，频次一样的页框号，页框号小的排前面。

## 用例1

输入| 10 1 2 1 2 1 2 1 2 1 2 5  
---|---  
输出| 2 1 2  
说明| 在这个例子中，内存页框号 1 和 2 都被访问了 5 次，达到了阈值，因此它们被标记为热内存页。输出首先是热内存页的数量
2，然后是按照访问频次降序排列的页框号 1 和 2(频次一样的页框号，页框号小的排前面)。  
  
## 用例2

输入| 5 1 2 3 4 5 3  
---|---  
输出| 0  
说明| 在这个例子中，没有任何内存页的访问次数达到阈值 3，因此没有热内存页，输出为 0。  
  
## Java

    
    
    import java.util.*;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            int N = Integer.parseInt(scanner.nextLine());
            String[] accesses = scanner.nextLine().split(" ");
            int threshold = Integer.parseInt(scanner.nextLine());
            scanner.close();
    
            // 使用 TreeMap 来存储内存页框号和对应的访问次数
            // TreeMap 默认按照 key 升序排列，这里我们需要按照访问次数降序，页框号升序排列
            Map<Integer, Integer> frequencyMap = new TreeMap<>();
            for (String access : accesses) {
                int pageFrame = Integer.parseInt(access);
                frequencyMap.put(pageFrame, frequencyMap.getOrDefault(pageFrame, 0) + 1);
            }
    
            // 使用 PriorityQueue 来对内存页框号进行排序
            PriorityQueue<Integer> hotPages = new PriorityQueue<>((a, b) -> {
                int freqCompare = frequencyMap.get(b).compareTo(frequencyMap.get(a));
                if (freqCompare == 0) {
                    return a.compareTo(b);
                }
                return freqCompare;
            });
    
            // 将达到阈值的热内存页加入到优先队列中
            for (Map.Entry<Integer, Integer> entry : frequencyMap.entrySet()) {
                if (entry.getValue() >= threshold) {
                    hotPages.offer(entry.getKey());
                }
            }
    
            // 输出结果
            int hotCount = hotPages.size();
            System.out.println(hotCount);
            while (!hotPages.isEmpty()) {
                System.out.println(hotPages.poll());
            }
        }
    }
    

#### 文章目录

  * 题目描述
  * 输入描述
  * 输出描述
  * 用例1
  * 用例2
  * Java

![fengmian](https://i-blog.csdnimg.cn/blog_migrate/758d68c7b5d4e7bf18ca3d10e5a3fe68.png)

