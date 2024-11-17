#### 题目描述

  * 请实现一个简易内存池,根据请求命令完成内存分配和释放。
  * 内存池支持两种操作命令，REQUEST和RELEASE，其格式为：
  * REQUEST=请求的内存大小 表示请求分配指定大小内存，如果分配成功，返回分配到的内存首地址；如果内存不足，或指定的大小为0，则输出error。
  * RELEASE=释放的内存首地址 表示释放掉之前分配的内存，释放成功无需输出，如果释放不存在的首地址则输出error。

**注意：**

  1. 内存池总大小为100字节。
  2. 内存池地址分配必须是连续内存，并优先从低地址分配。
  3. 内存释放后可被再次分配，已释放的内存在空闲时不能被二次释放。
  4. 不会释放已申请的内存块的中间地址。
  5. 释放操作只是针对首地址所对应的单个内存块进行操作，不会影响其它内存块。

#### 输入描述

首行为整数 N , 表示操作命令的个数，取值范围：0 < N <= 100。

接下来的N行, 每行将给出一个操作命令，操作命令和参数之间用 “=”分割。

#### 输出描述

请求分配指定大小内存时，如果分配成功，返回分配到的内存首地址；如果内存不足，或指定的大小为0，则输出error

释放掉之前分配的内存时，释放成功无需输出，如果释放不存在的首地址则输出error。

##### ACM输入输出模式

如果你经常使用**Leetcode** ,会知道**letcode** 是不需要编写输入输出函数的。但是华为OD机考使用的是 **ACM 模式**
，需要手动编写输入和输出。

所以最好在牛-
客上提前熟悉这种模式。例如C++使用`cin/cout`,python使用`input()/print()`。JavaScript使用node的`readline()`和`console.log()`。Java
使用`sacnner/system.out.print()`

#### 用例

输入| 2  
REQUEST=10  
REQUEST=20  
---|---  
输出| 0  
10  
说明| 无  
输入| 5  
REQUEST=10  
REQUEST=20  
RELEASE=0  
REQUEST=20  
REQUEST=10  
---|---  
输出| 0  
10  
30  
0  
说明|
第一条指令，申请地址0~9的10个字节内存，返回首地址0第二条指令，申请地址10~29的20字节内存，返回首地址10第三条指令，释放首地址为0的内存申请，0~9地址内存被释放，变为空闲，释放成功，无需输出第四条指令，申请20字节内存，09地址内存连续空间不足20字节，往后查找到3049地址，返回首地址30第五条指令，申请10字节，0~9地址内存空间足够，返回首地址0  
  
#### 机考代码查重

华为OD机考完成之后，官方会进行代码查重。**华为 od 机考确实有很大的概率抽到原题**
。如果碰到了题库中的原题，一定不要直接使用题解中的代码，尤其是变量名，一定要修改，可以改成毫无意义的单词。除了变量名之外，代码的组织结构和逻辑一定要进行改变，这就要求在日常的刷题中，提前编写好属于自己的代码。

#### C++

    
    
    #include<iostream>
    #include<vector>
    #include<map>
    using namespace std;
     
    class MemoryPool{
    public:
        MemoryPool(){
            //初始化内存池中每个地址的状态都是未分配状态
            m_status = vector<bool>(kTotalSize, false); 
        }
        int Request(int size){ 
            int ans = -1;
            if(size <= 0){
                return ans;
            }
            for (int i = 0; i <= kTotalSize - size; ++i) {
                int j = 0;
                while (j < size){
                    if(m_status[i + j]){ //如果当前地址已经被分配，跳出循环
                        break;
                    }
                    j++;
                }
                if(j == size){ //如果循环到了size，说明可以分配地址
                    ans = i;
                    break;
                }
            }
            
            if(ans == -1){ //如果没有找到合适的地址，返回-1
                return ans;
            }
     
            //将找到的地址标记为已分配状态
            m_used[ans] = size;
            for (int i = 0; i < size; ++i) {
                m_status[i + ans] = true;
            }
     
            return ans;
        }
     
        bool Release(int startAddr){
            if(m_used.count(startAddr) == 0){ //如果该地址没有被分配，返回false
                return false;
            }
     
            //将该地址标记为未分配状态
            int size = m_used[startAddr];
            for (int i = startAddr; i < startAddr + size; ++i) {
                m_status[i] = false;
            }
     
            //从m_used中删除该地址
            m_used.erase(startAddr);
     
            return true;
        }
    private:
        vector<bool> m_status; // true时表示已被分配
        map<int, int> m_used; // key为分配的首地址， value为分配的长度
        static constexpr int kTotalSize = 100; // 内存池总大小
    };
     
    int main() {
        int n;
        cin >> n;
     
        MemoryPool pool; //创建内存池对象
     
        for (int i = 0; i < n; ++i) {
            string str;
            cin >> str;
     
            string cmd = str.substr(0, str.find_first_of('=')); //获取命令
            int num = stoi(str.substr(str.find_first_of('=') + 1)); //获取数字参数
     
            if(cmd == "REQUEST"){ //如果是请求内存的命令
                int size = num; //获取请求的内存大小
                int result = pool.Request(size); //调用内存池对象的Request方法
                if (result != -1) { //如果成功分配到内存
                    cout << result << endl; //输出分配到的内存地址
                } else { //如果没有分配到内存
                    cout << "error" << endl; //输出错误信息
                }
            }else{ //如果是释放内存的命令
                int addr = num; //获取要释放的内存地址
                if (!pool.Release(addr)) { //调用内存池对象的Release方法，并检查是否释放成功
                    cout << "error" << endl; //如果释放失败，输出错误信息
                }
            }
        }
     
        return 0;
    }
    

#### java

    
    
    import java.util.*;
    
    public class Main {
        static class MemoryPool {
            private final int kTotalSize = 100; // 内存池总大小
            private final List<Boolean> m_status; // true时表示已被分配
            private final Map<Integer, Integer> m_used; // key为分配的首地址， value为分配的长度
    
            public MemoryPool() {
                // 初始化内存池中每个地址的状态都是未分配状态
                m_status = new ArrayList<>(Collections.nCopies(kTotalSize, false));
                m_used = new HashMap<>();
            }
    
            public int request(int size) {
                int ans = -1;
                if (size <= 0) {
                    return ans;
                }
                for (int i = 0; i <= kTotalSize - size; ++i) {
                    int j = 0;
                    while (j < size) {
                        if (m_status.get(i + j)) { // 如果当前地址已经被分配，跳出循环
                            break;
                        }
                        j++;
                    }
                    if (j == size) { // 如果循环到了size，说明可以分配地址
                        ans = i;
                        break;
                    }
                }
    
                if (ans == -1) { // 如果没有找到合适的地址，返回-1
                    return ans;
                }
    
                // 将找到的地址标记为已分配状态
                m_used.put(ans, size);
                for (int i = 0; i < size; ++i) {
                    m_status.set(i + ans, true);
                }
    
                return ans;
            }
    
            public boolean release(int startAddr) {
                if (!m_used.containsKey(startAddr)) { // 如果该地址没有被分配，返回false
                    return false;
                }
    
                // 将该地址标记为未分配状态
                int size = m_used.get(startAddr);
                for (int i = startAddr; i < startAddr + size; ++i) {
                    m_status.set(i, false);
                }
    
                // 从m_used中删除该地址
                m_used.remove(startAddr);
    
                return true;
            }
        }
    
        public static void main(String[] args) {
            Scanner sc = new Scanner(System.in);
            int n = sc.nextInt();
            sc.nextLine(); // 读取换行符
    
            MemoryPool pool = new MemoryPool(); // 创建内存池对象
    
            for (int i = 0; i < n; ++i) {
                String str = sc.nextLine();
    
                String cmd = str.substring(0, str.indexOf('=')); // 获取命令
                int num = Integer.parseInt(str.substring(str.indexOf('=') + 1)); // 获取数字参数
    
                if (cmd.equals("REQUEST")) { // 如果是请求内存的命令
                    int size = num; // 获取请求的内存大小
                    int result = pool.request(size); // 调用内存池对象的request方法
                    if (result != -1) { // 如果成功分配到内存
                        System.out.println(result); // 输出分配到的内存地址
                    } else { // 如果没有分配到内存
                        System.out.println("error"); // 输出错误信息
                    }
                } else { // 如果是释放内存的命令
                    int addr = num; // 获取要释放的内存地址
                    if (!pool.release(addr)) { // 调用内存池对象的release方法，并检查是否释放成功
                        System.out.println("error"); // 如果释放失败，输出错误信息
                    }
                }
            }
    
            sc.close();
        }
    }
    
    
    

#### python

    
    
    class MemoryPool:
        def __init__(self):
            self.m_status = [False] * kTotalSize # 初始化内存池中每个地址的状态都是未分配状态
            self.m_used = {} # 用字典记录已经分配的地址和长度
     
        def Request(self, size):
            ans = -1
            if size <= 0:
                return ans
            for i in range(kTotalSize - size + 1):
                j = 0
                while j < size:
                    if self.m_status[i + j]: # 如果当前地址已经被分配，跳出循环
                        break
                    j += 1
                if j == size: # 如果循环到了size，说明可以分配地址
                    ans = i
                    break
     
            if ans == -1: # 如果没有找到合适的地址，返回-1
                return ans
     
            # 将找到的地址标记为已分配状态
            self.m_used[ans] = size
            for i in range(size):
                self.m_status[i + ans] = True
     
            return ans
     
        def Release(self, startAddr):
            if startAddr not in self.m_used: # 如果该地址没有被分配，返回false
                return False
     
            # 将该地址标记为未分配状态
            size = self.m_used[startAddr]
            for i in range(startAddr, startAddr + size):
                self.m_status[i] = False
     
            # 从m_used中删除该地址
            del self.m_used[startAddr]
     
            return True
     
    kTotalSize = 100 # 内存池总大小
    pool = MemoryPool() # 创建内存池对象
     
    n = int(input())
    for i in range(n):
        cmd, num = input().split('=')
        num = int(num)
     
        if cmd == "REQUEST": # 如果是请求内存的命令
            size = num # 获取请求的内存大小
            result = pool.Request(size) # 调用内存池对象的Request方法
            if result != -1: # 如果成功分配到内存
                print(result) # 输出分配到的内存地址
            else: # 如果没有分配到内存
                print("error") # 输出错误信息
        else: # 如果是释放内存的命令
            addr = num # 获取要释放的内存地址
            if not pool.Release(addr): # 调用内存池对象的Release方法，并检查是否释放成功
                print("error") # 如果释放失败，输出错误信息
    

#### javaScript

    
    
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    class MemoryPool{
        constructor(){
            //初始化内存池中每个地址的状态都是未分配状态
            this.m_status = new Array(MemoryPool.kTotalSize).fill(false);
            this.m_used = new Map();
        }
        static get kTotalSize(){
            return 100;
        }
        Request(size){ 
            let ans = -1;
            if(size <= 0){
                return ans;
            }
            for (let i = 0; i <= MemoryPool.kTotalSize - size; ++i) {
                let j = 0;
                while (j < size){
                    if(this.m_status[i + j]){ //如果当前地址已经被分配，跳出循环
                        break;
                    }
                    j++;
                }
                if(j === size){ //如果循环到了size，说明可以分配地址
                    ans = i;
                    break;
                }
            }
            
            if(ans === -1){ //如果没有找到合适的地址，返回-1
                return ans;
            }
     
            //将找到的地址标记为已分配状态
            this.m_used.set(ans, size);
            for (let i = 0; i < size; ++i) {
                this.m_status[i + ans] = true;
            }
     
            return ans;
        }
     
        Release(startAddr){
            if(!this.m_used.has(startAddr)){ //如果该地址没有被分配，返回false
                return false;
            }
     
            //将该地址标记为未分配状态
            let size = this.m_used.get(startAddr);
            for (let i = startAddr; i < startAddr + size; ++i) {
                this.m_status[i] = false;
            }
     
            //从m_used中删除该地址
            this.m_used.delete(startAddr);
     
            return true;
        }
    }
    
    let n = 0;
    let pool = new MemoryPool();
    rl.on('line', (line) => {
        if(n === 0){
            n = parseInt(line);
        }else{
            let [cmd, num] = line.split('=');
            num = parseInt(num);
            if(cmd === "REQUEST"){ //如果是请求内存的命令
                let size = num; //获取请求的内存大小
                let result = pool.Request(size); //调用内存池对象的Request方法
                if (result !== -1) { //如果成功分配到内存
                    console.log(result); //输出分配到的内存地址
                } else { //如果没有分配到内存
                    console.log("error"); //输出错误信息
                }
            }else{ //如果是释放内存的命令
                let addr = num; //获取要释放的内存地址
                if (!pool.Release(addr)) { //调用内存池对象的Release方法，并检查是否释放成功
                    console.log("error"); //如果释放失败，输出错误信息
                }
            }
        }
    });
    

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
>       * python
>       * javaScript
>

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

