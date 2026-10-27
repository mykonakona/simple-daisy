# simple-daisy

基于 **Hexo、Tailwind CSS 4 和 daisyUI 5** 的个人博客主题。支持响应式布局、明暗切换、文章目录、代码高亮、归档/分类/标签和 Giscus 评论。

## 安装

在 Hexo 博客根目录执行：

```sh
git clone https://github.com/mykonakona/simple-daisy.git themes/simple-daisy
npm install hexo-renderer-ejs@^2 postcss-load-config@^5
npm install -D tailwindcss@4.3.3 @tailwindcss/postcss@4.3.3 @tailwindcss/typography@0.5.20 daisyui@5.7.46 postcss@^8.4.38
```

修改站点 `_config.yml`：

```yml
theme: simple-daisy
syntax_highlighter: prismjs
```

在博客根目录添加 `postcss.config.js`，已有配置则合并插件：

```js
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```

构建和部署环境也需安装上述开发依赖。

## 配置

导航、配色、个人链接和评论配置见主题 [_config.yml](_config.yml)。

| 项目 | 设置位置 |
| --- | --- |
| 博客信息 | 站点 `_config.yml` 中的 `title`、`author`、`subtitle` |
| 导航 | 主题 `menu`，按配置顺序展示；关于页需自行创建 |
| 配色与高亮 | 主题 `appearance.light` / `dark` 设置明暗配色，`prism.theme` 设置代码高亮样式 |
| 个人链接 | 主题 `social_links`，设为 `[]` 隐藏；`icon` 使用 [本地 SVG 文件名](source/images/lucide)，不含扩展名 |
| 评论 | 主题 `giscus`，从 [Giscus 配置页面](https://giscus.app/zh-CN) 获取自己的仓库、分类及 ID |
| 头像 | 自行提供博客 `source/images/icons/` 下的 `icon-284x284.png` 和 `icon-152x152.png` |
| 页脚 | [footer.ejs](layout/_partial/footer.ejs)，图标为 `source/images/site-logo.svg` |

### 配色

在主题 `_config.yml` 中配置明暗配色与 Prism 高亮：

```yml
appearance:
  light: corporate
  dark: black
prism:
  theme: okaidia
```

`light`、`dark` 填写已安装 daisyUI 的内置主题名。默认跟随系统，太阳／月亮按钮切换明暗；手动选择保存在浏览器中，清除后恢复跟随系统。

`prism.theme` 可选 `default`、`dark`、`funky`、`okaidia`、`solarizedlight`、`tomorrow`、`twilight`、`coy`，独立于明暗模式。

修改配置后重新生成网站，无需手动修改模板或样式。

### 个人链接与图标

在主题 `_config.yml` 中修改 `social_links`，可增删条目或调整顺序：

```yml
social_links:
  - name: GitHub
    url: https://github.com/your-name
    icon: github
  - name: 邮箱
    url: mailto:hello@example.com
    icon: mail
```

`name` 是链接名称，`url` 是目标地址，`icon` 对应 [本地图标目录](source/images/lucide) 中不带 `.svg` 的文件名。设为 `social_links: []` 可隐藏整组链接。

RSS 订阅文件需由 Feed 插件生成。

### Giscus 评论

在主题 `_config.yml` 中修改 `giscus`。先从 [Giscus 配置页面](https://giscus.app/zh-CN) 获取自己的仓库、分类及 ID，再替换示例中的对应值：

```yml
giscus:
  enable: true
  repo: your-name/your-repo
  repo_id: YOUR_REPO_ID
  category: Announcements
  category_id: YOUR_CATEGORY_ID
  mapping: url
  strict: false
  reactions_enabled: true
  emit_metadata: false
  input_position: top
  lang: zh-CN
  loading: lazy
```

`enable: false` 关闭全站评论；文章或页面的 Front-matter 中设置 `comments: false` 可单独关闭评论。缺少仓库或分类 ID 时不加载评论，配色自动跟随明暗模式。

## 样式维护

组件外观优先使用 daisyUI，布局和间距使用模板中的 Tailwind 工具类。[main.css](source/css/main.css) 保留字体、图标、安全区及文章内容适配，配色由 `appearance` 自动注入。
