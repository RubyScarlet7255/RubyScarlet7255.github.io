// import { defineConfig } from 'vitepress'

// // https://vitepress.dev/reference/site-config
// export default defineConfig({
//   title: "My Awesome Project",
//   description: "A VitePress Site"
// })

import { mergeConfig, type UserConfig } from "vitepress";
import {defaultConfig , defineConfig } from "../../src/config/index";
const userConfig: UserConfig = {
    themeConfig: {
        author: "Ruby",
        user: {
            name: "Ruby",
            firstName: "Ruby",
            lastName: "Scarlet",
            email: "scarlet_7255@outlook.com",
            domain: "\u7AD9\u70B9\u57DF\u540D",
            describe: "\u7F51\u7AD9\u7B80\u4ECB\u3002",
            ruleText: "\u6682\u4E0D\u63A5\u53D7\u4E2A\u4EBA\u535A\u5BA2\u4EE5\u5916\u7684\u53CB\u94FE\u7533\u8BF7\uFF0C\u786E\u4FDD\u60A8\u7684\u7F51\u7AD9\u5185\u5BB9\u79EF\u6781\u5411\u4E0A\uFF0C\u6587\u7AE0\u81F3\u5C1130\u7BC7\uFF0C\u539F\u521B70%\u4EE5\u4E0A\uFF0C\u90E8\u7F72HTTPS\u3002"
          },
          banner: {
            type: "img",
            bannerTitle: "",
            bannerText: "欢迎来到我的小世界",
            position: "top",
            fit: "cover"
          },
          copyrightYear: void 0,
          liveTime: {
            enable: false,
            prefix: "footer.tips",
            startTime: "04/02/2025 16:00:00"
          },
          sidebar: {
            typedTextPrefix: "",
            typedText: ["庄生晓梦迷蝴蝶，望帝春心托杜鹃"],
            social: [{
              name: "Github",
              url: "https://github.com/RubyScarlet7255",
              icon: "<img src=\"./pics/social/github.png\" height=\"30px\"/ width=\"30px\"></svg>",
            }],
          },
    },
    // base: "/repo/",
}
mergeConfig(userConfig, defaultConfig);
export default defineConfig(userConfig);
