---
head:
  - - link
    - rel: stylesheet
      href: https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css

title: 逻辑回归
date: 2025-6-21 22:00:00
categories: 机器学习
cover: [/pics/logistic_regression/cover.jpg]
sticky: 0

tags: ["机器学习","AI"]

---

![封面](/pics/logistic_regression/cover.jpg)

# 逻辑回归

&emsp;&emsp;逻辑回归和朴素贝叶斯有诸多相似，并且证明贝叶斯是线性模型的方式在连续下（高斯朴素贝叶斯），可以见到逻辑回归重要的**sigmod**函数产物。原本打算放在一起写的，但是后来意识到篇幅实在太大，所以就分成了两个文章。

## 逻辑回归和朴素贝叶斯
&emsp;&emsp;朴素贝叶斯是一个生成模型，而逻辑回归是一个判别模型。在朴素贝叶斯进行 $P(x_i| y)$ 预测的时候，其对分别对 $P(x_i | y)$ 和 $P(y)$进行建模。而逻辑回归则是直接对 $P(y | x_i)$ 进行建模。

## 逻辑斯谛 (logistic distribution)

&emsp;&emsp;设$X$是连续随机变量，如果$X$服从逻辑斯谛分布，那么其具有下列分布函数和密度函数：

$$F(x) = P(x \leq x) = \frac{1}{ 1+e^{-(x- \mu)/\gamma } }$$

$$f(X) = F^{'}(x) = \frac{ e^{-(x- \mu) / \gamma} }{\gamma (1+e^{-(x- \mu)/\gamma } ) ^2} $$

&emsp;&emsp;其分布函数为 $F(x)$ 而密度函数为 $f(x)$，其图像如下所示：

![函数图像](/pics/logistic_regression/sigmod.png)


&emsp;&emsp;其图像是一条S形曲线(simoid curve)，该曲线关于点 $(\mu , \frac{1}{2})$ 中心对称，即：

$$F(-x + \mu) - \frac{1}{2} = -F(x - \mu) + \frac{1}{2}$$

&emsp;&emsp;图形两边增长慢，中心增长快，形状参数 $\gamma$ 越小，其中心点附近增长越快。

## 二项逻辑斯谛回归

&emsp;&emsp;二项逻辑回归模型是一个基础的分类模型，由条件概率分布 $P(Y | X)$ 表示，形式为参数化的逻辑斯谛分布。其仅将其仅将随机变量 $Y$ 取值为 1 或0。其中:

$$P(Y = 1 | \vec{x}) = \frac{exp(\vec{w} * \vec{x} + b)}{1+exp(\vec{w} * \vec{x} + b)}$$

$$P(Y = 0 | \vec{x}) = \frac{1}{1+exp(\vec{w} * \vec{x} + b)}$$

&emsp;&emsp;可以通过将权值向量 $\vec{w}$ 和 输入向量 $\vec{x}$ 扩充以省略参数 $b$ ，此时：

$$P(Y = 1 | \vec{x}) = \frac{exp(\vec{w} * \vec{x})}{1+exp(\vec{w} * \vec{x})}$$

$$P(Y = 0 | \vec{x}) = \frac{1}{1+exp(\vec{w} * \vec{x})}$$

&emsp;&emsp;通常来说，为了方便编程与书写，$P(Y = 1 | \vec{x})$ 一般写成：

$$\frac{1}{1+exp(-(\vec{w}*\vec{x}))}$$

&emsp;&emsp;二项分类也可以推广到多项的情况，即变量 $Y$ 的集合为 ${1, 2, ... K}$ 。此时的分布模型如下：

$$P(Y = k | \vec{x}) = \frac{exp(\vec{w}_k * \vec{x})}{1+ \sum_{k=1}^{K-1} exp(\vec{w}_k * \vec{x})}$$

## 参数估计

### 极大似然估计 (MLE)

&emsp;&emsp;极大似然估计，是一种根据已知的样本结果信息，反推最有可能得到此结果的输入值。其数学表达形式如同：

$$MLE(\theta) = \arg\max_{\theta} P(y | \theta)$$

&emsp;&emsp;极大似然估计还有一个很重要的假设，即样本之间是独立的。

&emsp;&emsp;我们采用 $y \in \{-1, 1\}$ ，并且采用维度扩充的写法，即：

$$ P(y |\vec{x}) = \frac{1}{1+exp(-y*(\vec{w}*\vec{x}))} $$

&emsp;&emsp;在逻辑回归中，我们根据统计的结果 $y$ 和输入向量 $x$，对权值向量 $\vec{w}$进行极大似然估计。即基于样本，最大化的概率函数：

$$P(y |\vec{x} ,\vec{w}) = \prod_{i = 0}^n P(y_i | \vec{x_i}, \vec{w})$$

$$P(y |\vec{x} ,\vec{w}) = \prod_{i = 0}^n \frac{1}{1+exp(-y_i*(\vec{w}*\vec{x_i}))} $$

$$log(P(y |\vec{x} ,\vec{w})) = -\sum_{i=0}^nlog(1+exp(-y_i*(\vec{w}*\vec{x_i})))$$

&emsp;&emsp;所以要估计的参数 $\vec{w}$ 即：

$$ \vec{w}_{MLE} = \arg\max_w log(-\sum_{i=0}^n(1+exp(-y_i*(\vec{w}*\vec{x_i})))) $$

$$ \vec{w}_{MLE} = \arg\min_w \sum_{i=0}^nlog(1+exp(-y_i*(\vec{w}*\vec{x_i}))) $$

&emsp;&emsp; 此时采用梯度下降对 $\vec{w}$ 进行估计即可。

### 最大后验估计（MAP）

&emsp;&emsp;最大后验估计可以视为在极大似然估计之上引入了先验分布，因为很多时候采集大量的数据是非常困难的，此时极大似然估计会容易出现过拟合这样的情况。于是引入了先验概率，确定某种数据假定条件，以进一步约束。

&emsp;&emsp;最大后验估计中，我们不仅要使得求得的 $\theta$ 的似然函数最大， $\theta$ 自己的先验概率也要最大，即：

$$\theta^{map} = \arg\max_{\theta}P(\theta|D) $$

&emsp;&emsp;回到逻辑回归，将 $\vec{w}$ 看作是一个随机变量，并且假设它服从某种先验概率。

$$P(\vec{w} | D) = P(\vec{w} | X,y) \propto P(y | X, \vec{w}) * P(\vec{w}) $$

$$\vec{w}_{MAP} = \arg\max_{ \vec{w} }log(P(y | X, \vec{w})P(\vec{w}))$$

$$\vec{w}_{MAP} = \arg\min_{ \vec{w} }\sum_{i=0}^n(log(1+exp(-y_i*(\vec{w}*\vec{x_i}))) + log(P(\vec{w})))$$