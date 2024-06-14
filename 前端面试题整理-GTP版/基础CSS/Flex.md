

一、Flex

* 容器属性
    * flex-driection
    * 定义排列方向
        * row 左对齐
        * row-reverse  右对齐
        * column 上对齐
        * column-reverse 下对齐
    * flex-wrap
    * 定义多行排列方式
        * wrap 正序换行
        * nowrap 不换行
        * wrap-reverse 倒序换行
    * flex-flow
    * 以上两个属性的缩写
        *  默认值为 now nowrap
    * justify-content
    * 主轴上面的对齐方式
        * flex-start
        * flex-end
        * baseline
        * center
        * space-between 两者之间存在间隔
        * space-around 项目两边存在间隔
    * align-items
    * 纵轴上面的对齐方式
        * flex-start
        * flex-end
        * baseline
        * center
        * stretch 默认 占满整个容器的高度
    * align-content
    * 定义多跟横轴的对齐方式
        * flex-start 多行左上对齐
        * flex-end 多行左下对其
        * center 居中对齐
        * stretch 占满
        * space-between 多行上下之间存在间隔
        * space-around 多行每行上下存在间隔
* 项目属性
    * order 排序
    * flex-grow 放大比例
    * flex-shrink 缩小比例
    * flex-basis 在分配多余空间之前项目占据的主轴空间
    * flex
        * flex-grow flex-shrink flex-basis 三者的缩写
        * 快捷属性 auto (1 1 auto)
        * 快捷属性 none(0 0 auto)
    * align-self 自身的排列方式、在当前行的纵轴上排列顺序
        * auto
        * flex-start
        * flex-end
        * baseline
        * center
        * stretch
