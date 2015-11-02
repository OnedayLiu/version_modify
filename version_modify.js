var fs = require('fs');

function scanFolder(path) {
	var files = fs.readdirSync(path);
	files.forEach(function(item) {
		var tmpPath = path + '/' + item,
			stats = fs.statSync(tmpPath);

		if (stats.isDirectory()) {
			scanFolder(tmpPath);
		} else {
			fs.readFile(tmpPath, 'utf8', function(err, data) {
				if (err) throw err;
				var reg = /\.(js|css).*"/g,
					isModified = false,
					version = new Date()/1;
				data = data.replace(reg,function(arg){
					isModified = true;
					if(arg.indexOf(".js")>-1){
						return ".js?v=" + version + '"';
					}else if(arg.indexOf(".css")>-1){
						return ".css?v=" + version + '"';
					}
				});
				if (!isModified) {
					return;
				}
				fs.writeFile(tmpPath, data, function(err) {
					if (err) throw err;
					console.log(tmpPath + " is modified");
				});
			});
		}
	});
};
console.log("******************log***********************");
// scanFolder("D:\\workspaces\\bgm\\src\\main\\webapp\\WEB-INF\\jsp\\jst\\bgm")
// scanFolder("D:\\workspaces\\bgm\\src\\main\\webapp\\WEB-INF\\jsp\\common")
scanFolder("C:\\Users\\liuyitian\\Desktop\\aa");
