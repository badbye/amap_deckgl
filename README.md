安装启动：

```bash
npm i
npm run start
```


目前遇到的核心问题：2D视角下，拖动地图后，有明显的闪烁；3D视角下，`bearing`参数发生变化时，拖动地图时数据会明显偏移，效果更差。

deck.gl与leaflet结合，deck.gl的数据图层就很稳：
https://zakjan.github.io/deck.gl-leaflet/
