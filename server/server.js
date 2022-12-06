const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const server = new grpc.Server();
const SERVER_ADDRESS = "node_grpc:8080";

let proto = grpc.loadPackageDefinition(
  protoLoader.loadSync("./protos/chat.proto", {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  })
);

const users = [];

function join(call, callback) {
  console.log(call)
  users.push(call);
  notifyChat({ user: "Server", text: "new user joined ..." });
}

function send(call, callback) {
  console.log(call.request);

  notifyChat(call.request);
  console.log(callback)
  return callback(null,{text:call.request.text})
}

function notifyChat(message) {
  users.forEach(user => {
    user.write(message);
  });
}


server.addService(proto.example.Chat.service, { join: join, send: send });

server.bindAsync(SERVER_ADDRESS, grpc.ServerCredentials.createInsecure(), () => {
  console.log("Start Server!");
  server.start();
});
