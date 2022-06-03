const express = require('express');
const line = require('@line/bot-sdk');
const app = express();

const config = {
    channelAccessToken: 'yd6NYM9Hria1mALtfouqv2sEAaJfnlSx3Kq0SJYiMpO25ia8CzD6SfEXJGkLUREdAxXleifv/zpP0qeKOMHYS23+mCOs/uZ8J9r49WA3KQpccEd9KPr/SXhRXit3glKtOTlKiTjZbqShSVPOu8szaAdB04t89/1O/w1cDnyilFU=',
    channelSecret: 'f42d0ad79fa44efa630bcf43fc74fbe8'
};
const client = new line.Client(config);

// webhook callback
app.post('/', line.middleware(config), (req, res) => {
  if (req.body.destination) {
  }

  // req.body.events should be an array of events
  if (!Array.isArray(req.body.events)) {
    return res.status(500).end();
  }

  // handle events separately
  Promise.all(req.body.events.map(handleEvent))
    .then(() => res.end())
    .catch((err) => {
      console.error("An handle error appened : " + err);
      res.status(500).end();
    });
});

// simple getmembers function
function GetGroupMembers(GroupId) {
  console.log('group id : ' + GroupId)
  client.getGroupMemberProfile(GroupId)
  .then((members) => console.log('ids : ' + members))
  .catch((err) => {
    console.log("An getmembers error appened : " + err)
  });
};

function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  };

  if (event.source.type == 'group' && event.message.text == '.tagall') {
    return handleGroup(event.source.groupId, event.replyToken);
  };

  return Promise.resolve(null);
};

function handleGroup(GroupId, replyToken) {
  memberIds = GetGroupMembers(GroupId);
};

app.listen(3000);