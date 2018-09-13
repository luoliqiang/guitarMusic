var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var multer = require('multer');
var db_config = require('../config/db');
var pool = mysql.createPool(db_config);
var sql = require('../config/sql');
var upload = multer({ dest: 'upload/' });


function doQuery(s, cb) {
	pool.getConnection(function(err, con) {
		console.log(con)
  	con.query(s, function(err,res_db) {
			con.release();
			if(err){
			  cb('error', {code: 1,status: false,msg: err.message});
			}
			else {
			  cb('succ', {code: 0,status: true,msg: 'success', data: res_db});
			}
		});
  });
}

/* 获取曲谱列表 */
router.get('/musicList', function(req, res, next) {
  doQuery(sql.getMusiclist, function(type, res_db) {
	    if(type === 'succ') {
	    	for (var i = 0; i < res_db.data.length; i++) {
	    		res_db.data[i].poster = res_db.data[i].poster.replace(/\\/g, '\/');
	    	}
			res.json(res_db);
	    }
	});
});

/* 获取曲谱详情 */
router.get('/musicDetail', function(req, res, next) {
    doQuery(sql.getMusicDetail(req.query.id), function(type, res_db) {
	    if(type === 'succ') {
	    	res_db.data = res_db.data[0];
    		res_db.data.imgSrc = res_db.data.imgSrc.replace(/\\/g, '\/').split(',');
			res.json(res_db);
	    }
	});
});

/* 设置曲谱熟悉度star */
router.get('/setStar', function(req, res, next) {
    doQuery(sql.setMusicStar(req.query.id, req.query.star), function(type, res_db) {
	    if(type === 'succ') {
	    	res.json({
			  	code: 0,
			  	msg: 'success',
			  	status: true
			});
	    }
	});
});

/* 删除曲谱 */
router.get('/deleteMusic', function(req, res, next) {
    doQuery(sql.deleteMusic(req.query.id), function(type, res_db) {
	    if(type === 'succ') {
	    	res.json({
			  	code: 0,
			  	msg: 'success',
			  	status: true
			});
	    }
	});
});

/* 保存曲谱 */
router.post('/saveMusic', upload.any(), function(req, res, next) {
	var imgArr = [];
	var poster = '';

	if(req.files && req.files.length) {
		for (var file of req.files) {
			var path_str = ('\\'+file.path).replace(/\\/g, '\\\\');
			file.fieldname === 'filePoster'? poster = path_str : imgArr.push(path_str);
		}
	}

	var _sql = sql.saveMusiclist(0, req.body.musicName, (imgArr.join(',')), poster);

	doQuery(_sql, function(type, res_db) {
	  res.json({
	  	code: 0,
	  	msg: 'success',
	  	status: true
	  });
	});
});

module.exports = router;
