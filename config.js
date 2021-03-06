var fs=require("fs");
fs.watchFile('config.json', function (curr, prev) {
    reload_config();
});
function reload_config(){
    var config_json=fs.readFileSync("config.json",{encoding:'utf-8'});
    try{
        var config=(eval(config_json));
    }catch(e){
        log.error(e);
        return;
    }
    for(var c in config){
        exports[c]=config[c];
    }

    config.hosts.forEach(function(host){
        exports.DNSCache[host[0]]={addresses:[host[1]]};
    });
}
exports.DNSCache={};
reload_config();
