from pathlib import Path

import matplotlib as mpl

mpl.use("Agg")

import matplotlib.pyplot as plt


BASE = Path(r"C:\Users\admin\Desktop\hunan-mandarin-converter\相关文件\latex")
IMG_DIR = BASE / "images"
IMG_DIR.mkdir(parents=True, exist_ok=True)

mpl.rcParams["font.sans-serif"] = ["Microsoft YaHei", "SimHei", "SimSun"]
mpl.rcParams["axes.unicode_minus"] = False
mpl.rcParams["figure.dpi"] = 200
mpl.rcParams["savefig.dpi"] = 200


def chart_flow_ratio() -> None:
    labels = ["全省平均", "长株潭", "湘南", "洞庭湖", "大湘西"]
    values = [12.02, 22.24, 10.26, 9.10, 8.75]
    colors = ["#2E7D32", "#1565C0", "#6A1B9A", "#EF6C00", "#455A64"]

    fig, ax = plt.subplots(figsize=(10, 5.6))
    bars = ax.bar(labels, values, color=colors, width=0.62)
    ax.set_ylabel("占当地常住人口比重（%）")
    ax.set_title("湖南流动人口占常住人口比重（2010年第六次全国人口普查）")
    ax.set_ylim(0, 26)
    ax.grid(axis="y", linestyle="--", alpha=0.28)
    for bar, value in zip(bars, values):
        ax.text(
            bar.get_x() + bar.get_width() / 2,
            value + 0.35,
            f"{value:.2f}%",
            ha="center",
            va="bottom",
            fontsize=10,
        )
    ax.text(
        0.99,
        -0.16,
        "数据来源：湖南省统计局《湖南区域经济发展中人口要素的分析》",
        transform=ax.transAxes,
        ha="right",
        va="top",
        fontsize=9,
        color="#555555",
    )
    fig.tight_layout()
    fig.savefig(IMG_DIR / "湖南流动人口占比图.png", bbox_inches="tight")
    plt.close(fig)


def chart_dialect_distribution() -> None:
    labels = ["湘北方言", "湘中方言", "湘南方言", "湘西方言"]
    counts = [4, 6, 2, 2]
    colors = ["#00897B", "#3949AB", "#8E24AA", "#F4511E"]

    fig, ax = plt.subplots(figsize=(10, 5.6))
    bars = ax.bar(labels, counts, color=colors, width=0.62)
    ax.set_ylabel("条目数")
    ax.set_title("湖南各地方言分布条目数（按省政府门户网站列举统计）")
    ax.set_ylim(0, 7)
    ax.grid(axis="y", linestyle="--", alpha=0.28)
    for bar, value in zip(bars, counts):
        ax.text(
            bar.get_x() + bar.get_width() / 2,
            value + 0.12,
            f"{value}",
            ha="center",
            va="bottom",
            fontsize=10,
        )
    ax.text(
        0.99,
        -0.16,
        "注：此图统计的是官方页面列出的方言分布条目，不是方言使用人口。",
        transform=ax.transAxes,
        ha="right",
        va="top",
        fontsize=9,
        color="#555555",
    )
    fig.tight_layout()
    fig.savefig(IMG_DIR / "湖南方言分布条目数图.png", bbox_inches="tight")
    plt.close(fig)


def write_markdown() -> None:
    md = """# 湖南项目受益人群与语言环境补充材料

## 结论先行

这组材料主要想回答两个问题：

1. 湖南本地有多大的方言服务需求。
2. 项目是否也能覆盖来湘人员、外来务工家庭和需要跨方言沟通的人群。

从公开可核实的数据看，湖南既是一个方言覆盖面很广的省份，也是一个人口流动较明显的省份。也就是说，这个项目的受益对象不是单一的一类人，而是同时包括本地方言用户、外来人员、在湘学习和工作的人群，以及需要做方言资料整理和查询的研究者。

## 可直接引用的数据

| 指标 | 数值 | 口径/年份 | 对项目的意义 | 来源 |
| --- | ---: | --- | --- | --- |
| 全省常住人口 | 6568万人 | 2023年末 | 说明湖南有很大的本地用户基数，平台不是小众展示 | [湖南省2023年国民经济和社会发展统计公报](https://tjj.hunan.gov.cn/hntj/tjfx/tjgb/jjfzgb/202403/t20240322_33260459.html) |
| 长沙市常住总人口 | 1051.31万人 | 2023年末 | 说明核心城市用户规模大，适合做方言查询与转换试点 | [长沙市2023年国民经济和社会发展统计公报](https://tjj.hunan.gov.cn/hntj/tjfx/tjgb/szgb/zss_1/202405/t20240506_33292952.html) |
| 在长沙市就读的外来务工人员子女 | 19.63万人 | 2023年 | 直接说明外来家庭有现实语言服务需求 | [长沙市2023年国民经济和社会发展统计公报](https://tjj.hunan.gov.cn/hntj/tjfx/tjgb/szgb/zss_1/202405/t20240506_33292952.html) |
| 全省流动人口占当地常住人口比重 | 12.02% | 第六次全国人口普查 | 说明湖南全省存在明显的人口流动，跨地域沟通需求客观存在 | [湖南区域经济发展中人口要素的分析](https://tjj.hunan.gov.cn/m/jczx/201507/t20150717_3788521.html) |
| 长株潭流动人口占当地常住人口比重 | 22.24% | 第六次全国人口普查 | 省会及核心城市群的跨方言沟通需求更集中 | [湖南区域经济发展中人口要素的分析](https://tjj.hunan.gov.cn/m/jczx/201507/t20150717_3788521.html) |
| 全省常住人口与户籍人口差额 | 约510万人 | 第六次全国人口普查 | 说明湖南是人口流出大省，平台也可服务外出返乡、异地求学和跨地区交流人群 | [李新连在湖南省第六次全国人口普查新闻发布会上回答记者提问实录](https://tjj.hunan.gov.cn/tjgz/tjyw/sjyw/201507/t20150717_4330226.html) |
| 全省流动人口规模 | 700多万人 | 2014年统计分析文章引用第六次人口普查 | 说明省内流动人口基数不小，方言理解和普通话辅助需求真实存在 | [湖南区域经济发展中人口要素的分析](https://tjj.hunan.gov.cn/m/jczx/201507/t20150717_3788521.html) |

## 方言覆盖情况

湖南省政府门户网站列出的方言分布显示，湖南方言覆盖范围很广，且地区内部差异明显。

| 方言区域 | 页面列举的市州/类型数 | 说明 |
| --- | ---: | --- |
| 湘北方言 | 4 | 常德、岳阳、张家界、益阳 |
| 湘中方言 | 6 | 长沙、湘潭、株洲、娄底、衡阳、邵阳 |
| 湘南方言 | 2 | 永州、郴州 |
| 湘西方言 | 2 | 吉首、怀化 |

官方页面还直接写到：老湘语“特别难懂，古语特点明显，五里不同音”，赣语和客家话地区也存在较强的地域差异。这一点对项目很重要，因为它说明平台面对的不是单一、整齐的方言场景，而是多个差异较大的方言点。

## 图表

![湖南流动人口占常住人口比重图](./images/湖南流动人口占比图.png)

![湖南各地方言分布条目数图](./images/湖南方言分布条目数图.png)

## 对正文可以补充的判断

这组数据放进立项依据里，主要能支撑三层意思：

1. 湖南本地用户有需求。省内常住人口基数大，方言分布又广，很多人会遇到“同在湖南、说法不同”的情况。
2. 外地用户也有需求。长沙这样的核心城市里，外来务工人员子女规模不小，省内人口流动也比较明显，平台可以帮助外来者先理解、再使用。
3. 项目不是单纯做方言展示，而是可以作为跨方言沟通的工具。对本地人，它更像查询和整理工具；对外地人，它更像辅助理解和表达的入口。

## 需要谨慎表述的地方

1. 目前没有找到一个同口径、全省统一、公开可直接引用的“湖南方言使用人口总数”官方统计，所以正文里不建议直接写成某个精确数字。
2. 方言分布条目数不等于方言使用人口，只能说明覆盖范围广，不能拿来替代人口规模。
3. “流动人口占比”使用的是第六次全国人口普查口径，属于较稳的官方数据，但年份较早，适合做“结构性背景”说明，不适合写成最新现状。
4. “外来务工人员子女 19.63 万”是长沙市数据，适合说明核心城市的服务需求，不宜直接推断成全省所有外来人口规模。

## 参考来源

- [湖南省2023年国民经济和社会发展统计公报](https://tjj.hunan.gov.cn/hntj/tjfx/tjgb/jjfzgb/202403/t20240322_33260459.html)
- [长沙市2023年国民经济和社会发展统计公报](https://tjj.hunan.gov.cn/hntj/tjfx/tjgb/szgb/zss_1/202405/t20240506_33292952.html)
- [湖南区域经济发展中人口要素的分析](https://tjj.hunan.gov.cn/m/jczx/201507/t20150717_3788521.html)
- [李新连在湖南省第六次全国人口普查新闻发布会上回答记者提问实录](https://tjj.hunan.gov.cn/tjgz/tjyw/sjyw/201507/t20150717_4330226.html)
- [湖南各地方言分布](https://www.hunan.gov.cn/hnszf/jxxx/hxwh/jfy/201711/t20171111_4685265.html)
"""
    (BASE / "research-hunan-users.md").write_text(md, encoding="utf-8")


def main() -> None:
    chart_flow_ratio()
    chart_dialect_distribution()
    write_markdown()
    print("done")


if __name__ == "__main__":
    main()
