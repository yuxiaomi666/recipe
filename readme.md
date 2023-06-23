## terminal的
- add(这俩都是library)
    - dependency
        - yarn add express cors bcrypt jsonwebtoken mongoose
    - dev dependency
        - 程序跑起来需要的代码
        - 写代码需要的代码
        - yarn add --dev nodemon
    - node 可以理解为= python3
## info
- yuyax
- mern123
- 
## syntax
- css + html
1. html: tag有内容，有属性，如果没有内容，可以只写一个(self closing)
    - element: <> </>
    - <里面的是attribute>
    - <label htmlFor="name"> Name </label>
    - (self closing) <input type="text" id="name"/>
2. css
    - ? margin vs padding
    - framework
1. react：把js去写html
2. node: 把js去写后端
- js syntax
1. async + await
2. 写成jason  a: a可以写成a
3. event：
    - When an event is triggered, such as a ***click event or a keypress event***, the browser generates an event object that contains information about the event
    - For example, if you have a click event ***on a button element***, event.target will be that button element.
- json(javascript object notation) 不是语言是format，理解为都是txt
## style
1. html
    - 不需要空格，也不需要；（vs js）
2. js
# 1 client - 前端 -- react
## 0 prep
- yarn start
- 删文件，删保留文件(不记得是app.js还是index.js)里的相关代码，变成白网页
- yarn add react-router-dom axios react-cookie
## 1.0 index.js? 
- 看起来只是改了import
## 1.1 app.js js写html + css
0. 核心是把src里的所有东西 用path连接在一起
1. Router-Routes-Route（pages）
2. nav
3. app.css copy来的，用来做ui
## 1.2 src/pages/
1. 新建home.js 及一堆
2. 对到app.js 设置path
3. /auth: registar + login
    - 0 export auth
    - 先（左）login
        - + reponse
        - + redirect to homepage
    - 后（右）register（可能是习惯吧）,简单一些，只需要
        
    - 共性：
        - 【step1】***useState***(是react的)，setUsername这类
        - json
        - 【step2】***onSubmit***(async) + ***try(await axios + alert) catch***, 
        - 【step1】Form（return的html，页面到底长啥样在这里写）（有onsubmit；input里是***onChange***用到setUsername这类
4. /create-recipe 看看有啥共性
    - return部分的核心 form
        - label (根据Model schema) + input=框 (type, id, name)
        - label (根据Model schema) + textarea (id, name 没有type？)
        - label (根据Model schema) + map(value, idx)里的input(key, type, name, value,) + button (onclick={addIngredient})
    - useState: set a state to track
        - data format
        - setRecipe是那个刷新的func
    - form部分attribute加上onChange，写一个共用的handleChange函数
    - subimit部分：console.log(recipe) 改成onSubmit
    - 打补丁：为了userOwner加一个hook（在前端），得到userID
    - 发现一个bug，因为login 的server并没有处理 pw incorrect，这个情况下，userOwner是undefined，实际上是error
    - 最后一个功能，navigate back to homepage
        - cosnt navigate
        - onSubmit部分用 navigate
    0. 要写的函数
        1. handleChange 为了共用，简化
        2. addIngredient 必须要写。效果：点一下，加一条
            - addIngredient: button click处：所以点button，多一条数据，加一个框，
            - form里 map每一input框：输入有变化的时候（handleIChange(event, idx)），idx和value能对上（map(I, idx)）
            - handleIngredientChange： 从event.target抓到value，然后assign给当前idx的ingredient
5. 改”/“ 
    1. 显示所有recipe
        - 先让console有recipes的数据(fetch + set)
        - 再写html
    2. 还要加上save的button(把recipeID 存到user.savedRecipes)
        - html
        - js: saveRecipe
    3. （1）显示savedRecipe - S1: save过的有个标识
        - js： (fetch + set)
        - html：{}
    3. （2）save过的button给disable掉(灰色，不能点),并且button上的显示不同
6. 做/savedRecipes
    - js和html在homepage基础上删删删，唯一变化是get的endpoint不同(home是得到recipeID决定save这个button怎么做，这里要得到recipe本身来显示)
## 1.3 src/components
1. nav
    - 【step2】when authenticated, "logout" instead of "login/register"
        - empty cookie and localstorage
    - 【last step】没login的时候 不显示savedRecipe
# 2 server 先做backend
## 2.1 src
### 2.1.1 index.js 相当于main.py
新版不用syntax: const express = require("express")<p>
json: 大家都接受的协议，理解为txt
1. import
- express： service: 被call拿data
- cors: 连接前后端
- mongoose: 连接后端和数据库
2. express相关
- const
- **port**: 8443https 8080http 
3. （express相关）要在package.json改的
- type 为了import
- scripts 对应terminal -- nodemon
4. mongodb connect
### 2.1.2 models
1. Users.js
- model+schema: seems like model is the table, and scheme is the structure for that table
- 下载app mongoDB compass: database+collection
### 2.1.3 routes route是API（函数）
- users.js const+export
- index.js里
- user.js
- compass里建 fake user(写json)
## 2.2 src里的SOP总结
- 对user 和 recipe一样
    - 先model，再route
- router
    1. const router + export
    2. 在index.js里
    3. 回到router写①get（这时候db还什么都没有），然后写②post,然后就可以在insomnia里试能不能成功添加data了
    4. ③save receipt这个func把user和recipe连起来，因此需要改UsersModel，然后写这个put
    5. ④⑤ 返回特定条件(search by ID)的model的一列
## 2.3 一些用法
- 有ref  type: mongoose.Schema.Types.ObjectId, ref: "Recipes" 仿佛一定是连着用的
- ？
# 3. 最后搞token
- 后端
    1. server/user.js: const 一个verifyToken的API
        1. express middleware: (req, res, next): next middleware function can modify the request and response objects, execute additional logic, and control the flow of the application
    2. server/user.js在需要地方用 verifyToken
        - create
        - save
- 前端是和后端合作的，client要send一些东西when call api
    - 在相应的func增加 input
    - save:saveRecipe
    - create: 唯一callAPI的那个，完全一样
# 4. 修改没login的时候
- 不显示savedRecipe：navbar
- 但是home仍然需要显示recipe
# 5. deploy
- 买一个domain
- in client terminal(build application): yarn run build。会在client生成”build“文件夹
- copy到public的文件夹里，同时保持server在哪里被运行着（hostinger或者本地）。就可以在新domain上运行了

# 没搞定的问题
- insomnia换了ip就没法connect，用insomnia post之后 compass才能看到

