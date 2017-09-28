import superagent from 'superagent'
import Promise from 'bluebird'

export default{

    get: (url, params) => {
            return new Promise((resolve, reject) => {
                superagent
                .get(url)
                .query(params)
                .end((err, res) => {
                    if(err){
                        reject(err)
                        return
                    }
                    //console.log('Response: ' + JSON.stringify(res.body))
                    resolve(res.body)
                })
            })
    }

}
