/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/light");

var $root = ($protobuf.roots["default"] || ($protobuf.roots["default"] = new $protobuf.Root()))
.addJSON({
  protocol: {
    options: {
      go_package: "git.skyunion.net/game-chat/hausos/gateway/protocol/transport/grpc"
    },
    nested: {
      Transport: {
        methods: {
          Stream: {
            requestType: "Frame",
            requestStream: true,
            responseType: "Frame",
            responseStream: true
          }
        }
      },
      Frame: {
        fields: {
          header: {
            keyType: "string",
            type: "string",
            id: 1
          },
          body: {
            type: "bytes",
            id: 2
          }
        }
      }
    }
  }
});

module.exports = $root;
