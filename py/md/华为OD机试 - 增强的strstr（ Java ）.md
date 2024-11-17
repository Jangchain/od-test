#### 题目描述:增强的strstr

C 语言有一个库函数： char *strstr(const char *haystack, const char *needle) ，实现在字符串
haystack 中查找第一次出现字符串 needle 的位置，如果未找到则返回 null。

现要求实现一个strstr的增强函数，可以使用带可选段的字符串来模糊查询，与strstr一样返回首次查找到的字符串位置。

可选段使用“[]”标识，表示该位置是可选段中任意一个字符即可满足匹配条件。比如“a[bc]”表示可以匹配“ab”或“ac”。

注意目标字符串中可选段可能出现多次。

#### 输入描述

与strstr函数一样，输入参数是两个字符串指针，分别是源字符串和目标字符串。

#### 输出描述

与strstr函数不同，返回的是源字符串中，匹配子字符串相对于源字符串地址的偏移（从0开始算），如果没有匹配返回-1。

补充说明：源字符串中必定不包含‘[]’；目标字符串中‘[]’必定成对出现，且不会出现嵌套。

输入的字符串长度在[1,100]之间。

##### ACM输入输出模式

如果你经常使用**Leetcode** ,会知道**letcode** 是不需要编写输入输出函数的。但是华为OD机考使用的是 **ACM 模式**
，需要手动编写输入和输出。

所以最好在牛-
客上提前熟悉这种模式。例如C++使用`cin/cout`,python使用`input()/print()`。JavaScript使用node的`readline()`和`console.log()`。Java
使用`sacnner/system.out.print()`

#### 用例

输入

    
    
    abcd
    b[cd]
    

输出

    
    
    1
    

说明

> 相当于是在源字符串中查找bc或者bd，bc子字符串相对于abcd的偏移是1

#### 机考代码查重

华为OD机考完成之后，官方会进行代码查重。**华为 od 机考确实有很大的概率抽到原题**
。如果碰到了题库中的原题，一定不要直接使用题解中的代码，尤其是变量名，一定要修改，可以改成毫无意义的单词。除了变量名之外，代码的组织结构和逻辑一定要进行改变，这就要求在日常的刷题中，提前编写好属于自己的代码。

#### Java

    
    
    import java.util.Scanner;
    import java.util.regex.Matcher;
    import java.util.regex.Pattern;
    
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            
            // 读取源字符串和目标字符串
            String source = scanner.nextLine();
            String target = scanner.nextLine();
    
            // 将目标字符串中的可选段标记转换为正则表达式的可选字符
            target = target.replaceAll("\\[(.*?)\\]", "[$1]");
    
            // 编译目标字符串为正则表达式模式
            Pattern pattern = Pattern.compile(target);
            // 创建匹配器，用于在源字符串中查找匹配的子字符串
            Matcher matcher = pattern.matcher(source);
    
            // 如果找到匹配的子字符串，则输出匹配的子字符串在源字符串中的起始位置
            if (matcher.find()) {
                System.out.println(matcher.start());
            } else {
                // 如果没有找到匹配的子字符串，则输出-1
                System.out.println(-1);
            }
        }
    }
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

#### 完整用例

##### 用例1

    
    
    abcd
    b[cd]
    

##### 用例2

    
    
    abcdefg
    c[de]
    

##### 用例3

    
    
    hello world
    o[ ]w
    

##### 用例4

    
    
    123456789
    4[56]
    

##### 用例5

    
    
    abcde
    f[ghi]
    

##### 用例6

    
    
    abcdefg
    [aef]c[bd]e
    

##### 用例7

    
    
    abcde
    [ab]cd[e]
    

##### 用例8

    
    
    hello world
    h[eo]l[l ]o
    

##### 用例9

    
    
    abcdabcd
    a[bcd]a[bcd]
    

##### 用例10

    
    
    123456789
    1[23]4[56]7[89]
    

