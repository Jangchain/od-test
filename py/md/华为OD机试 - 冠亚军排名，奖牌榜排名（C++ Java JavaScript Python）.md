## 最新华为OD机试

真题目录：[点击查看目录](https://blog.csdn.net/banxia_frontend/article/details/129640773)  
华为OD面试真题精选：[点击立即查看](https://blog.csdn.net/banxia_frontend/category_12436481.html)

#### 题目描述

2012伦敦奥运会即将到来，大家都非常关注奖牌榜的情况，现在我们假设奖牌榜的排名规则如下:

  1. 首先gold medal数量多的排在前面
  2. 其次silver medal数量多的排在前面
  3. 然后bronze medal数量多的排在前面
  4. 若以上三个条件仍无法区分名次，则以国家名称的字典顺序排定。

我们假设国家名称不超过二十个字符，各类奖牌数不超过100，且大于0.

#### 输入描述

第一行输入一个整数N（0<N<21），代表国家数量，

然后接下来的N行，每行包含：

一个字符串Name表示各个国家的名称和三个整数Gi,Si,Bi。表示每个获得的gold medal,silver medal,bronze
medal的数量，以空格隔开，如(China 51 20 21),

具体见样例输入。

> 5  
>  China 32 28 34  
>  England 12 34 22  
>  France 23 33 2  
>  Japan 12 34 25  
>  Rusia 23 43 0

#### 输出描述

输出奖牌榜的依次顺序，只输出国家名称，各占一行，具体见样例输出。

> China  
>  Rusia  
>  France  
>  Japan  
>  England

#### 用例

输入| 5  
China 32 28 34  
England 12 34 22  
France 23 33 2  
Japan 12 34 25  
Rusia 23 43 0  
---|---  
输出| China  
Rusia  
France  
Japan  
England  
说明| 无  
  
#### c++

    
    
    #include <iostream>
    #include <vector>
    #include <string>
    #include <algorithm>
    #include <sstream>
    
    class Country {
    public:
        Country(std::string name, int gold, int silver, int bronze)
            : name(name), gold(gold), silver(silver), bronze(bronze) {}
    
        std::string getName() const {
            return name;
        }
    
        bool operator<(const Country& other) const {
            if (gold != other.gold) {
                return gold > other.gold;
            } else if (silver != other.silver) {
                return silver > other.silver;
            } else if (bronze != other.bronze) {
                return bronze > other.bronze;
            } else {
                return name < other.name;
            }
        }
    
    private:
        std::string name;
        int gold;
        int silver;
        int bronze;
    };
    
    void sortCountriesByMedals() {
        int numCountries;
        std::cin >> numCountries;
        std::cin.ignore();
    
        std::vector<Country> countries;
    
        for (int i = 0; i < numCountries; i++) {
            std::string input;
            std::getline(std::cin, input);
            std::istringstream iss(input);
    
            std::string name;
            int gold, silver, bronze;
            iss >> name >> gold >> silver >> bronze;
    
            Country country(name, gold, silver, bronze);
            countries.push_back(country);
        }
    
        std::sort(countries.begin(), countries.end());
    
        for (const Country& country : countries) {
            std::cout << country.getName() << std::endl;
        }
    }
    
    int main() {
        sortCountriesByMedals();
        return 0;
    }
    
    
    

#### JavaScript

    
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    const countries = [];
    let numCountries;
    let inputCount = 0;
    
    rl.on('line', line => {
        if (!numCountries) {
            numCountries = parseInt(line);
        } else {
            const [name, gold, silver, bronze] = line.split(' ');
            const countryTuple = [-parseInt(gold), -parseInt(silver), -parseInt(bronze), name];
            insertSorted(countries, countryTuple);
    
            inputCount++;
            if (inputCount === numCountries) {
                countries.forEach(country => console.log(country[3]));
                rl.close();
            }
        }
    });
    
    function insertSorted(arr, item) {
        let low = 0;
        let high = arr.length;
    
        while (low < high) {
            const mid = (low + high) >>> 1;
            if (compareTuples(arr[mid], item) < 0) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }
        arr.splice(low, 0, item);
    }
    
    function compareTuples(a, b) {
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) {
                return a[i] - b[i];
            }
        }
        return 0;
    }
    
    

#### Java

    
    
    import java.util.ArrayList;
    import java.util.Collections;
    import java.util.List;
    import java.util.Scanner;
    
    public class Main {
        public static void main(String[] args) {
            sortCountriesByMedals();
        }
    
        public static void sortCountriesByMedals() {
            Scanner scanner = new Scanner(System.in);
            int numCountries = Integer.parseInt(scanner.nextLine());
            List<Country> countries = new ArrayList<>();
    
            for (int i = 0; i < numCountries; i++) {
                String[] input = scanner.nextLine().split(" ");
                String name = input[0];
                int gold = -Integer.parseInt(input[1]);
                int silver = -Integer.parseInt(input[2]);
                int bronze = -Integer.parseInt(input[3]);
    
                Country country = new Country(name, gold, silver, bronze);
                countries.add(country);
            }
    
            Collections.sort(countries);
    
            for (Country country : countries) {
                System.out.println(country.getName());
            }
        }
    
        static class Country implements Comparable<Country> {
            private String name;
            private int gold;
            private int silver;
            private int bronze;
    
            public Country(String name, int gold, int silver, int bronze) {
                this.name = name;
                this.gold = gold;
                this.silver = silver;
                this.bronze = bronze;
            }
    
            public String getName() {
                return name;
            }
    
            @Override
            public int compareTo(Country other) {
                if (gold != other.gold) {
                    return Integer.compare(gold, other.gold);
                } else if (silver != other.silver) {
                    return Integer.compare(silver, other.silver);
                } else if (bronze != other.bronze) {
                    return Integer.compare(bronze, other.bronze);
                } else {
                    return name.compareTo(other.name);
                }
            }
        }
    }
    
    

#### Python

    
    
    import bisect
     
     
    def sort_countries_by_medals():
        num_countries = int(input().strip())
        countries = []
        for i in range(num_countries):
            name, gold, silver, bronze = input().strip().split()  # 获取每个国家的名称和奖牌数
            gold, silver, bronze = -int(gold), -int(silver), -int(bronze)  # 将奖牌数变为负数以便排序
            country_tuple = tuple((gold, silver, bronze, name))  # 将需要排序的奖牌数和国家名称加入到元组中
            bisect.insort(countries, country_tuple)  # 使用bisect方法对每个国家进行排序
        for country in countries:
            print(country[3])  # 打印排序后的国家名称
     
     
    if __name__ == "__main__":
        sort_countries_by_medals()  # 调用函数
    

![fengmian](https://img-
blog.csdnimg.cn/img_convert/b98429f56d7b21e9abb6e238d4c69d08.png)

