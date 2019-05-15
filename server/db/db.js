const sha1 = require('sha1');
const axios = require('axios');

const className = 'todo';

const request = axios.create({
    baseURL: 'https://d.apicloud.com/mcm/api'
});

const handleRequest = ({status, data, error}) => {
    if (status === 200) {
        return data
    } else {
        throw createError(status, error)
    }
};

const createError = (code, resp) => {
    const err = new Error(resp.message);
    err.code = code;
    return err;
}

module.exports = (appId, appKey) => {
    const getHeaders = () => {
        const now = Date.now();
        console.log(typeof now);
        return {
            'X-APICloud-AppId': appId,
            'X-APICloud-AppKey': `${sha1(`${appId}UZ${appKey}UZ${now}`)}.${now}`
        }
    };
    return {
        async getAllTodos() {
            return handleRequest(
                await request.get(`/${className}`, {
                    headers: getHeaders()
                })
            );
        },
        async addTodo(todo){
            // console.log('请求参数：',todo);
            todo = {'content':'first todo','completed':false};
            return handleRequest(
                // 传递参数
                await request.post(`/${className}`,todo,{
                    headers: getHeaders()
                })
            );
        },
        async updateTodo(todo){
            return handleRequest(
                await request.put(`/${className}/${id}`,todo,{
                    headers: getHeaders()
                })
            )
        }
    }
}