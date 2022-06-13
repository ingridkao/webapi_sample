# webapi_sample

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

## About
> 需求： 透過Reqres來複習三個寫法的差異
### HOW:
1. 用XMLHttpRequest
2. 用fetch API
3. 用axios
    1. 安裝：`npm install axios`
    2. 匯入：`import axios from "axios"`


## Reqres
> 需求： 透過Axios來串接Reqres APIs
1. Get all user
2. Get taget user
3. 增加分頁
4. 將user list資料整理排版
5. 加入簡易的搜尋ID功能


## TDX
> 需求： 使用TDX的Open data來取得自行車資料
### HOW:
1. 閱讀API文件-swagger
2. 確認API的必填項目
3. 可以選取城市
4. 可以渲染成地圖，用Leaflet來實作
    1. 安裝：`npm install leaflet`
    2. 匯入：`import L from "leaflet"`
    3. 匯入：`import "leaflet/dist/leaflet.css"`
`