## 题目描述

孙悟空爱吃蟠桃，有一天趁着蟠桃园守卫不在来偷吃。已知蟠桃园有 N 棵桃树，每颗树上都有桃子，守卫将在 H 小时后回来。

孙悟空可以决定他吃蟠桃的速度K（个/小时），每个小时选一颗桃树，并从树上吃掉 K 个，如果树上的桃子少于 K
个，则全部吃掉，并且这一小时剩余的时间里不再吃桃。

孙悟空喜欢慢慢吃，但又想在守卫回来前吃完桃子。

请返回孙悟空可以在 H 小时内吃掉所有桃子的最小速度 K（K为整数）。如果以任何速度都吃不完所有桃子，则返回0。

## 输入描述

第一行输入为 N 个数字，N 表示桃树的数量，这 N 个数字表示每颗桃树上蟠桃的数量。

第二行输入为一个数字，表示守卫离开的时间 H。

其中数字通过空格分割，N、H为正整数，每颗树上都有蟠桃，且 0 < N < 10000，0 < H < 10000。

## 输出描述

吃掉所有蟠桃的最小速度 K，无解或输入异常时输出 0。

## 用例1

输入| 2 3 4 5  
4  
---|---  
输出| 5  
说明| 无  
  
## 用例2

输入| 2 3 4 5  
3  
---|---  
输出| 0  
说明| 无  
  
## 解题思路

本题22年考过！！！  
本题原题：<https://leetcode.cn/problems/koko-eating-bananas/>

## Java

    
    
    import java.util.*;
    
    public class Main {
        public static void main(String[] args) {
            // 创建一个Scanner对象用于读取输入
            Scanner cin = new Scanner(System.in);
            // 读取一行输入并转换为整数数组，代表每棵桃树上的桃子数量
            int[] peachCounts = Arrays.stream(cin.nextLine().split(" ")).mapToInt(Integer::parseInt).toArray();
            // 读取下一行输入，转换为整数，代表可用的小时数
            int h = Integer.parseInt(cin.nextLine());
            // 获取桃树的数量
            int n = peachCounts.length;
     
            // 输入验证：如果桃树数量为0，或小时数不合法，或桃树数量大于小时数，则输出0并返回
            if (n == 0 || h <= 0 || n >= 10000 || h >= 10000 || n > h) {
                System.out.println(0);
                return;
            }
    
            // 初始化二分查找的左右边界
            int left = 1, right = (int)1e9; // 假设最大的吃桃速度不会超过1e9
            // 当左边界小于右边界时，执行二分查找
            while (left < right) {
                // 计算中间值
                int mid = left + (right - left) / 2;
                // 如果以mid的速度可以在h小时内吃完桃子，则尝试更小的速度
                if (canFinish(peachCounts, h, mid)) {
                    right = mid;
                } else {
                    // 否则尝试更大的速度
                    left = mid + 1;
                }
            }
    
            // 输出最小吃桃速度，此时left是满足条件的最小速度
            System.out.println(left);
        }
    
        // 定义一个方法，判断以速度k是否能在h小时内吃完所有桃子
        static boolean canFinish(int[] p, int h, int k) {
            // 初始化所需的总小时数
            int ans = 0;
            // 遍历每棵桃树
            for (int x : p) {
                // 计算吃完这棵桃树上桃子所需的小时数，向上取整
                ans += Math.ceil(x * 1.0 / k);
            }
            // 如果所需总小时数小于等于h，则返回true，表示可以完成
            return ans <= h;
        }
    }
    

#### 文章目录

  * 题目描述
  * 输入描述
  * 输出描述
  * 用例1
  * 用例2
  * 解题思路
  * Java

![fengmian](https://i-blog.csdnimg.cn/blog_migrate/e854b2b06ee4bbdea787384c4ba4805f.png)

