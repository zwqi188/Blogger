# my-blogger

> Blogger project

## Build Setup

``` bash
# 安装依赖
npm install

# 运行项目
npm run dev

# 打包项目为war包
npm run build

# Nginx配置
http {
    include       mime.types;
    default_type  application/octet-stream;
	add_header Access-Control-Allow-Origin *;
	add_header Access-Control-Allow-Headers X-Requested-With;
	add_header Access-Control-Allow-Methods GET,POST,OPTIONS;

    sendfile        on;
    keepalive_timeout  65;

    server {
        listen       80;
        server_name  www.qzw.ink;
		location / { 
			proxy_pass http://127.0.0.1:8080/; 
		}
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }

}

# host设置 C:\Windows\System32\drivers\etc
 127.0.0.1 www.qzw.ink

# 上线须知
 修改prod.env.js,修改BASE_API地址为线上生产接口地址


For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
