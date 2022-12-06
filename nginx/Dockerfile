FROM nginx:latest

EXPOSE 5050

COPY ./hosts/grpc.local.conf /etc/nginx/conf.d/grpc.local.conf

CMD ["nginx", "-g", "daemon off;"]
