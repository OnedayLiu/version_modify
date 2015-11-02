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
                var reg1 = /\.(js|css)\s*(?=")/g,
                    reg2 = /\.(js|css)(\?)v=.*(?=")/g;
                var isModified = false,
                	version = new Date()/1;
                data = data.replace(reg1,doIt);
                data = data.replace(reg2,doIt);
                function doIt(arg){
                	if(arg.indexOf(".js")>-1){
                		isModified = true;
                		return ".js?v=" + version;
                	}
                	if(arg.indexOf(".css")>-1){
                		isModified = true;
                		return ".css?v=" + version;
                	}
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
// scanFolder("C:\\Users\\liuyitian\\Desktop\\aa");


//opms
// scanFolder("D:\\workspaces\\opms\\src\\main\\webapp\\WEB-INF\\jsp\\common");//common
// scanFolder("D:\\workspaces\\opms\\src\\main\\webapp\\WEB-INF\\jsp\\jst\\optsys\\specialtopic");//专题管理

//bgm
// scanFolder("D:\\workspaces\\bgm\\src\\main\\webapp\\WEB-INF\\jsp\\common");//common
// scanFolder("D:\\workspaces\\bgm\\src\\main\\webapp\\WEB-INF\\jsp\\jst\\bgm");//全部


//pms
scanFolder("D:\\workspaces\\pms\\src\\main\\webapp\\WEB-INF\\jsp\\common");//common

