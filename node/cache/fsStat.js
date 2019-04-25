const fs = require('fs');

fs.stat(`./www/1.html`, (err, stat) => {
    if (err) {
        console.log('文件读取失败');
    } else {
        console.log(stat);
        // atime指access time，即文件被读取或者执行的时间，修改文件是不会改变access time的
        console.log(stat.atime);
        // mtime指modify time，即文件内容被修改的时间
        console.log(stat.mtime);
        console.log(stat.mtime.toGMTString());
        // ctime指change time，即文件状态改变时间，指文件的i结点被修改的时间
        console.log(stat.ctime);
        // birthtime指文件创建时间
        console.log(stat.birthtime);

    }
})
// Stats {
//     dev: 16777217,
//     mode: 33188,
//     nlink: 1,
//     uid: 503,
//     gid: 20,
//     rdev: 0,
//     blksize: 4096,
//     ino: 7317450,
//     size: 218,
//     blocks: 8,
//     atimeMs: 1556160198000,
//     mtimeMs: 1555557633000,
//     ctimeMs: 1556160195000,
//     birthtimeMs: 1555557633000,
//     atime: 2019 - 04 - 25 T02: 43: 18.000 Z,
//     mtime: 2019 - 04 - 18 T03: 20: 33.000 Z,
//     ctime: 2019 - 04 - 25 T02: 43: 15.000 Z,
//     birthtime: 2019 - 04 - 18 T03: 20: 33.000 Z
// }