var query_sens = {
	saveMusiclist: function(star, musicName, imgSrc, poster) {
		return 'INSERT INTO musiclist '+
				'( star,musicName,imgSrc, poster) '+
				'VALUES'+
				"( "+star+',\''+musicName+'\',\''+imgSrc+'\',\''+ poster+ "\' );";
	},
	getMusicDetail: function(id) {
		return 'SELECT star,musicName,imgSrc FROM musiclist WHERE id='+ id + ';'
	},
	getMusiclist: 'SELECT * FROM musiclist;',
	setMusicStar: function(id, star) {
		return 'UPDATE musiclist SET star=\''+ star +'\' WHERE id='+ id +';';
	},
	deleteMusic: function(id) {
		return 'DELETE FROM musiclist WHERE id='+ id +';';
	}
}

module.exports = query_sens;