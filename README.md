# vodserver
Video on demand demo server in node.js

Desription : Have used restify framework to create rest apis.

Have used firebase as nosql database.

Get history of user :
API url : {server_url}/history/{userId}
Method : post

Add new video in history :
API url : {server_url}/history
method : post
post data : {"title":"video title" , "video_url":"url of the video" , "poster_url":"poster url", "userId":"3", "id" : "video_id"}

Database logic : For each user one bucket is created. Inside that bucket, data of watched video is stored in another bucket named by video_id


API is hosted on ubuntu 16.04 LTS (Microsoft Azure cloud)

Install pm2 on ubuntu server. Run app.js using pm2 (pm2 start app.js)

Install Nginx and set it as a reverse proxy server

For more refer to https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-04