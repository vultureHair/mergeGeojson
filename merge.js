var geojsonUtil = require("@mapbox/geojson-merge");
var fs = require("fs");

var fileDir = "./infiles/";
fs.readdir(fileDir, { withFileTypes: true }, function (derr, files) {
    if (derr) {
      return console.error(derr);
    }
    var datas = [];
    files.forEach(function (file) {
      // 读取每个文件
      if (file.isFile()) {
        // 注意name只能获取到文件名称
        // 注意同步读取的结果是string类型，需要转换为json对象
        datas.push(JSON.parse(fs.readFileSync(fileDir + file.name, "utf8")));
      }
    });
    // merge之后得到的是json对象，写入数据文件时需要通过stringify方法转换为string类型
    var mergedJson = geojsonUtil.merge(datas);
    fs.writeFile(
      "./outfiles/out.json", //写入合并文件
      JSON.stringify(mergedJson),
      () => {
        console.log("文件合并完成");
      }
    );
  });