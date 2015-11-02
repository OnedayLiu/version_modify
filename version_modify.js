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
				if (item == "test.js") {
					return;
				}
				var reg1 = /\.js"/g,
					reg2 = /\.js(\?)v=(\d*)/g,
					reg3 = /\.css"/g,
					reg4 = /\.css(\?)v=(\d*)/g;
				var isModified = false;
				if (reg1.test(data)) {
					data = data.replace(reg1, ".js?v=" + (new Date() / 1) + '"');
					isModified = true;
				} 
				if (reg2.test(data)) {
					data = data.replace(reg2, ".js?v=" + (new Date() / 1));
					isModified = true;
				}
				if (reg3.test(data)) {
					data = data.replace(reg3, ".css?v=" + (new Date() / 1) + '"');
					isModified = true;
				} 
				if (reg4.test(data)) {
					data = data.replace(reg4, ".css?v=" + (new Date() / 1));
					isModified = true;
				}
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
