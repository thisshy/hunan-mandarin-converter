# -*- coding: utf-8 -*-
from pathlib import Path
import os

os.environ.setdefault("MPLBACKEND", "Agg")
os.environ.setdefault("QT_QPA_PLATFORM", "offscreen")

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib import font_manager as fm


ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "相关文件" / "latex" / "images"
OUT_DIR.mkdir(parents=True, exist_ok=True)

FONT_PATH = Path(r"C:\Windows\Fonts\simsun.ttc")
FONT_PROP = fm.FontProperties(fname=str(FONT_PATH)) if FONT_PATH.exists() else None

plt.rcParams["axes.unicode_minus"] = False


def apply_fonts(ax):
    if not FONT_PROP:
        return
    for label in ax.get_xticklabels():
        label.set_fontproperties(FONT_PROP)
    for label in ax.get_yticklabels():
        label.set_fontproperties(FONT_PROP)


def text_kwargs(size=11):
    kwargs = {"fontsize": size}
    if FONT_PROP:
        kwargs["fontproperties"] = FONT_PROP
    return kwargs


def build_local_users_chart():
    labels = ["2024年常住人口", "2024年城镇人口", "湘方言使用人口"]
    values = [6539, 4059, 3085]
    colors = ["#3E5C76", "#748CAB", "#BC6C25"]

    fig, ax = plt.subplots(figsize=(9, 5.6), dpi=180)
    bars = ax.bar(labels, values, color=colors, width=0.55)
    ax.set_title("湖南本地潜在服务人群相关数据", pad=12, **text_kwargs(16))
    ax.set_ylabel("万人", **text_kwargs(12))
    ax.tick_params(axis="x", labelsize=11)
    ax.tick_params(axis="y", labelsize=10)
    apply_fonts(ax)
    for bar, value in zip(bars, values):
        ax.text(
            bar.get_x() + bar.get_width() / 2,
            value + 90,
            f"{value}万",
            ha="center",
            va="bottom",
            **text_kwargs(11),
        )
    ax.spines["top"].set_visible(False)
    ax.spines["right"].set_visible(False)
    ax.grid(axis="y", linestyle="--", alpha=0.25)
    ax.set_axisbelow(True)
    fig.text(
        0.5,
        0.01,
        "数据来源：湖南省2024年国民经济和社会发展统计公报；湖南方言概述（湖南省政府门户网站）",
        ha="center",
        **text_kwargs(9),
    )
    fig.tight_layout(rect=[0.03, 0.05, 0.98, 0.95])
    fig.savefig(OUT_DIR / "湖南本地潜在服务人群数据图.png", bbox_inches="tight")
    fig.savefig(OUT_DIR / "hunan_local_users_chart.png", bbox_inches="tight")
    plt.close(fig)


def build_mobility_chart():
    labels = ["2012年省内流动人口", "2012年流到省外\n半年以上人口", "2012年外省流入人口"]
    values = [653.61, 571.71, 75.42]
    colors = ["#2A9D8F", "#E76F51", "#E9C46A"]

    fig, ax = plt.subplots(figsize=(9.4, 5.8), dpi=180)
    bars = ax.bar(labels, values, color=colors, width=0.58)
    ax.set_title("湖南人口流动与外来人口相关数据", pad=12, **text_kwargs(16))
    ax.set_ylabel("万人", **text_kwargs(12))
    ax.tick_params(axis="x", labelsize=11)
    ax.tick_params(axis="y", labelsize=10)
    apply_fonts(ax)
    for bar, value in zip(bars, values):
        ax.text(
            bar.get_x() + bar.get_width() / 2,
            value + 10,
            f"{value:.2f}万",
            ha="center",
            va="bottom",
            **text_kwargs(11),
        )
    ax.spines["top"].set_visible(False)
    ax.spines["right"].set_visible(False)
    ax.grid(axis="y", linestyle="--", alpha=0.25)
    ax.set_axisbelow(True)
    fig.text(
        0.5,
        0.01,
        "数据来源：2012年湖南省人口结构变化及其影响（湖南省统计局）",
        ha="center",
        **text_kwargs(9),
    )
    fig.tight_layout(rect=[0.03, 0.05, 0.98, 0.95])
    fig.savefig(OUT_DIR / "湖南人口流动与外来人口数据图.png", bbox_inches="tight")
    fig.savefig(OUT_DIR / "hunan_mobile_users_chart.png", bbox_inches="tight")
    plt.close(fig)


if __name__ == "__main__":
    build_local_users_chart()
    build_mobility_chart()
    print("charts_created")
