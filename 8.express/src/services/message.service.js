const {EventEmitter} = require('events');


class Message{
    construtor(id,content,client_offset){
        this.id = id;
        this.content = content;
        this.client_offset = client_offset;
    }
}

class MessageService extends EventEmitter{

    #collection = []

    create(content = ''){}

    read(){}

    update(id,content){}

    delete(id){}

}

module.exports.MessageService =  new MessageService()