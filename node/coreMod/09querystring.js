// 查询字符串
const querystring = require('querystring')

const baiduQuery = `wd=query&rsv_spt=1&rsv_iqid=0x87a59334000031db&issp=1&f=8&rsv_bp=1&rsv_idx=2&ie=utf-8&tn=baiduhome_pg&rsv_enter=1&rsv_sug3=7&rsv_sug1=8&rsv_sug7=100&rsv_sug2=0&inputT=2930&rsv_sug4=4366`

let queryObj = querystring.parse(baiduQuery)

console.log(queryObj);

// {
//     wd: 'query',
//     rsv_spt: '1',
//     rsv_iqid: '0x87a59334000031db',
//     issp: '1',
//     f: '8',
//     rsv_bp: '1',
//     rsv_idx: '2',
//     ie: 'utf-8',
//     tn: 'baiduhome_pg',
//     rsv_enter: '1',
//     rsv_sug3: '7',
//     rsv_sug1: '8',
//     rsv_sug7: '100',
//     rsv_sug2: '0',
//     inputT: '2930',
//     rsv_sug4: '4366'
// }

// 解析整个url：这个更有用
const url = require('url')

const baiduUrl = `https://www.baidu.com:80/s?wd=query&rsv_spt=1&rsv_iqid=0x87a59334000031db&issp=1&f=8&rsv_bp=1&rsv_idx=2&ie=utf-8&tn=baiduhome_pg&rsv_enter=1&rsv_sug3=7&rsv_sug1=8&rsv_sug7=100&rsv_sug2=0&inputT=2930&rsv_sug4=4366`

let urlObj = url.parse(baiduUrl, true)

console.log(urlObj);

// Url {
//     protocol: 'https:',
//     slashes: true,
//     auth: null,
//     host: 'www.baidu.com:80',
//     port: '80',
//     hostname: 'www.baidu.com',
//     hash: null,
//     search: '?wd=query&rsv_spt=1&rsv_iqid=0x87a59334000031db&issp=1&f=8&rsv_bp=1&rsv_idx=2&ie=utf-8&tn=baiduhome_pg&rsv_enter=1&rsv_sug3=7&rsv_sug1=8&rsv_sug7=100&rsv_sug2=0&inputT=2930&rsv_sug4=4366',
//     query: {
//         wd: 'query',
//         rsv_spt: '1',
//         rsv_iqid: '0x87a59334000031db',
//         issp: '1',
//         f: '8',
//         rsv_bp: '1',
//         rsv_idx: '2',
//         ie: 'utf-8',
//         tn: 'baiduhome_pg',
//         rsv_enter: '1',
//         rsv_sug3: '7',
//         rsv_sug1: '8',
//         rsv_sug7: '100',
//         rsv_sug2: '0',
//         inputT: '2930',
//         rsv_sug4: '4366'
//     },
//     pathname: '/s',
//     path: '/s?wd=query&rsv_spt=1&rsv_iqid=0x87a59334000031db&issp=1&f=8&rsv_bp=1&rsv_idx=2&ie=utf-8&tn=baiduhome_pg&rsv_enter=1&rsv_sug3=7&rsv_sug1=8&rsv_sug7=100&rsv_sug2=0&inputT=2930&rsv_sug4=4366',
//     href: 'https://www.baidu.com:80/s?wd=query&rsv_spt=1&rsv_iqid=0x87a59334000031db&issp=1&f=8&rsv_bp=1&rsv_idx=2&ie=utf-8&tn=baiduhome_pg&rsv_enter=1&rsv_sug3=7&rsv_sug1=8&rsv_sug7=100&rsv_sug2=0&inputT=2930&rsv_sug4=4366'
// }
