const axios = require('axios')

 const axiosIns = axios.create({
    baseURL: "http://localhost:4000",

})

export default axiosIns;