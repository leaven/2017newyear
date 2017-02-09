fis.set('project.ignore', ['dist/**']);
fis.match('*.less', {
  parser: fis.plugin('less-2.x'),
  rExt: '.css'
})
/* tmpl */
fis.match('*.tmpl', {
  parser: fis.plugin('utc'),
  isJsLike: true,
  release: false
})  
// fis.media('remote').match('*', {
//    domain: 'http://bus.test.xiaojukeji.com/h5/qiandao1115'
// });

/* 设置静态文件的url对应的domain【域名后面不能加斜杠】 */
fis.media('prod').match('*', {
  domain: '//prodata.touchtrips.com',
  deploy:  fis.plugin('local-deliver', {
        to: './dist'
    })
}).match('**.js', {
    optimizer: fis.plugin('uglify-js')
});