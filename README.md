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
    a. 安裝：`npm install leaflet`
    b. 匯入：`import L from "leaflet"`
    c. 匯入：`import "leaflet/dist/leaflet.css"`
`
5. 選取城市後，地圖也會改變中心點
6. 加入腳踏車marker
7. 點擊左方列表，右方地圖會到那個位置



## 氣象
> 需求： 使用氣象局的Open data來做即時氣象地圖
> 介面： 當滑鼠Hover縣市及可以顯示該縣市36 小時天氣預報

### HOW:
1. 使用氣象資料開放平臺API獲得一般天氣預報-今明 36 小時天氣預報
2. 放置台灣SVG地圖
3. 點擊縣市可以知道是哪一個

資料與組件關係
| Views            | components       | Featrue                           |
| ---------------- | ---------------- | --------------------------------- |
| WeatherView.vue  |                  | AxiosFunc: 取得觀測資料             |
|                  | HelloWorld.vue   | Link: 放開放平台連結                |
|                  | TaiwanWeather.vue| targetLocation & Click event & SVG|


4. 將**點擊結果targetLocation**放到父層WeatherView，方便組件之間溝通
    a. 可以將上一個頁面的Weather(觀測列表)放入WeatherView確認API串接方式
    b. 將API response的資料透過Array.find的function找到點擊的該縣市資料
    c. 將該縣市資料放在DIV#forecast中
5. 將Weather.vue中的List排版（之後補上按鈕篩選時間區段功能)
6. 把forecast中裡面的資料並浮誇一點，使用unicode
7. 點擊的縣市，將SVG中的g tag設定active


